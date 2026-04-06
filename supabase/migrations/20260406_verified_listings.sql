-- ============================================================
-- SoberNation: Verified Listings Schema
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- 1. Create the listing_owners table
CREATE TABLE IF NOT EXISTS listing_owners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  email text NOT NULL,
  listing_type text NOT NULL CHECK (listing_type IN ('counsellor', 'centre')),

  -- Locations verified in (one Stripe subscription item per location)
  locations text[] NOT NULL DEFAULT '{}',

  -- Owner-editable contact info (overrides scraped data on listing pages)
  phone text,
  website text,
  contact_email text,

  -- Stripe billing
  stripe_customer_id text UNIQUE,
  stripe_subscription_id text,
  subscription_status text DEFAULT 'pending'
    CHECK (subscription_status IN ('pending', 'active', 'past_due', 'cancelled', 'trialing')),

  -- Verification (auto-approved on payment)
  verified boolean DEFAULT false,
  admin_approved boolean DEFAULT false,
  admin_notes text,

  -- Registration numbers
  registration_number text,

  -- Links to scraped records
  counsellor_id text,
  centre_slug text,

  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 2. Row-level security
ALTER TABLE listing_owners ENABLE ROW LEVEL SECURITY;

-- Owners can read/update only their own row
CREATE POLICY "owner_self_select" ON listing_owners
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "owner_self_update" ON listing_owners
  FOR UPDATE USING (auth.uid() = user_id);

-- Service role (API routes using SUPABASE_SERVICE_ROLE_KEY) has full bypass

-- 3. Indexes
CREATE INDEX IF NOT EXISTS idx_listing_owners_user      ON listing_owners(user_id);
CREATE INDEX IF NOT EXISTS idx_listing_owners_stripe    ON listing_owners(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_listing_owners_locations ON listing_owners USING GIN(locations);
CREATE INDEX IF NOT EXISTS idx_listing_owners_verified  ON listing_owners(verified);
CREATE INDEX IF NOT EXISTS idx_listing_owners_type      ON listing_owners(listing_type);

-- 4. Add claimed_by column to counsellors table (if it exists)
ALTER TABLE counsellors
  ADD COLUMN IF NOT EXISTS claimed_by uuid REFERENCES listing_owners(id),
  ADD COLUMN IF NOT EXISTS contact_override jsonb;

-- contact_override format:
-- { "phone": "0800...", "website": "https://...", "email": "..." }

-- 5. Auto-update updated_at on row changes
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER listing_owners_updated_at
  BEFORE UPDATE ON listing_owners
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

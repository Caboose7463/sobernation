-- ============================================================
-- SoberNation: All 4 Revenue Streams DB Schema
-- Run in: Supabase SQL Editor → New query → Run
-- ============================================================

-- ── 1. ENHANCED LISTINGS ──────────────────────────────────────────────────────

ALTER TABLE listing_owners
  ADD COLUMN IF NOT EXISTS is_enhanced            boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS enhanced_since         timestamptz,
  ADD COLUMN IF NOT EXISTS enhanced_stripe_sub_id text UNIQUE;

CREATE INDEX IF NOT EXISTS idx_listing_owners_enhanced ON listing_owners (is_enhanced) WHERE is_enhanced = true;

-- ── 2. CITY EXCLUSIVITY ───────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS city_exclusivity (
  id                  uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  location_slug       text NOT NULL UNIQUE,
  location_name       text NOT NULL,
  centre_name         text NOT NULL,
  centre_slug         text,
  centre_phone        text,
  centre_website      text,
  owner_email         text NOT NULL,
  tier                integer NOT NULL CHECK (tier IN (1, 2, 3)),
  monthly_fee_pence   integer NOT NULL,
  stripe_sub_id       text UNIQUE,
  stripe_customer_id  text,
  active              boolean DEFAULT true,
  created_at          timestamptz DEFAULT now(),
  expires_at          timestamptz
);

CREATE INDEX IF NOT EXISTS idx_city_exclusivity_location ON city_exclusivity (location_slug, active);

-- ── 3. REHAB MATCHING TOOL ────────────────────────────────────────────────────

-- Centres who pay to receive matched leads
CREATE TABLE IF NOT EXISTS matching_members (
  id                  uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  centre_name         text NOT NULL,
  centre_slug         text,
  location_slug       text NOT NULL,
  owner_email         text NOT NULL,
  contact_email       text NOT NULL,  -- where leads get sent
  contact_phone       text,
  stripe_sub_id       text UNIQUE,
  stripe_customer_id  text,
  active              boolean DEFAULT true,
  -- What they accept
  accepts_nhs         boolean DEFAULT true,
  accepts_private     boolean DEFAULT true,
  min_budget_pence    integer DEFAULT 0,
  addiction_types     text[] DEFAULT ARRAY['alcohol','drugs','gambling','other'],
  created_at          timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_matching_members_location ON matching_members (location_slug, active);

-- User submissions (leads)
CREATE TABLE IF NOT EXISTS matching_leads (
  id                  uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  -- User info
  first_name          text NOT NULL,
  contact_email       text,
  contact_phone       text,
  -- Answers
  location_slug       text NOT NULL,
  location_name       text NOT NULL,
  addiction_type      text NOT NULL,
  funding_type        text NOT NULL CHECK (funding_type IN ('nhs', 'private', 'unsure')),
  budget_band         text NOT NULL,  -- 'under2k', '2k-5k', '5k-10k', '10k+'
  urgency             text NOT NULL CHECK (urgency IN ('24hrs', 'this_week', 'exploring')),
  -- Routing
  matched_member_ids  uuid[],
  emails_sent         boolean DEFAULT false,
  created_at          timestamptz DEFAULT now()
);

-- ── 4. HELPLINE SPONSORSHIP ───────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS helpline_sponsors (
  id                  uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  sponsor_name        text NOT NULL,
  sponsor_logo_url    text,
  sponsor_website     text,
  owner_email         text NOT NULL,
  -- Tier
  tier                text NOT NULL CHECK (tier IN ('national', 'regional', 'county')),
  regions             text[] DEFAULT ARRAY[]::text[],  -- for regional/county tiers
  -- Stripe
  stripe_sub_id       text UNIQUE,
  stripe_customer_id  text,
  monthly_fee_pence   integer NOT NULL,
  -- Status
  active              boolean DEFAULT true,
  created_at          timestamptz DEFAULT now(),
  expires_at          timestamptz
);

CREATE INDEX IF NOT EXISTS idx_helpline_sponsors_active ON helpline_sponsors (active, tier);

-- Verify
SELECT
  (SELECT COUNT(*) FROM city_exclusivity) as city_exclusivity_rows,
  (SELECT COUNT(*) FROM matching_members) as matching_members_rows,
  (SELECT COUNT(*) FROM matching_leads) as matching_leads_rows,
  (SELECT COUNT(*) FROM helpline_sponsors) as helpline_sponsors_rows;

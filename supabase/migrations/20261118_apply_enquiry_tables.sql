-- ============================================================
-- Sober Nation: apply missing enquiry/revenue tables (prepared 18 Nov 2026)
-- The 20260407_revenue_streams migration was never applied to production,
-- so matching_leads (Find my rehab), matching_members, city_exclusivity,
-- helpline_sponsors and listing_owners.is_enhanced* do not exist.
-- This is that migration plus contact_messages, with row level security
-- switched ON for every table (the original left them open to the public key).
-- All statements are IF NOT EXISTS, safe to re-run. No data is deleted.
-- ============================================================

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

-- Contact page submissions (written by app/api/contact/route.ts with the service role key)
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  subject text,
  message text not null,
  source_page text,
  handled boolean not null default false
);

create index if not exists contact_messages_created_at_idx on public.contact_messages (created_at desc);

-- Only the service role (server) may read or write; no public access.
alter table public.contact_messages enable row level security;

-- Lock every new table to the server (service role) only.
ALTER TABLE city_exclusivity  ENABLE ROW LEVEL SECURITY;
ALTER TABLE matching_members  ENABLE ROW LEVEL SECURITY;
ALTER TABLE matching_leads    ENABLE ROW LEVEL SECURITY;
ALTER TABLE helpline_sponsors ENABLE ROW LEVEL SECURITY;

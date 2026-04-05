-- Counsellors directory
-- Run this in Supabase SQL editor

create table if not exists counsellors (
  id uuid primary key default gen_random_uuid(),

  -- Identity
  name text not null,
  title text,                      -- e.g. "BACP Accredited Counsellor"
  bio text,

  -- Location
  location_slug text not null,     -- matches existing location slugs
  location_name text not null,
  postcode text,

  -- Specialisms (addiction-relevant)
  specialisms text[] default '{}', -- ['alcohol', 'drugs', 'gambling', 'trauma']

  -- Contact
  phone text,
  email text,
  website text,

  -- Verification
  bacp_number text,
  verified boolean default false,
  verified_at timestamptz,

  -- Stripe subscription
  stripe_customer_id text,
  stripe_subscription_id text,
  subscription_status text,        -- 'active' | 'cancelled' | 'past_due'
  subscription_expires_at timestamptz,

  -- Type
  listing_type text default 'counsellor', -- 'counsellor' | 'centre'

  -- Source
  source text default 'bacp_scrape',      -- 'bacp_scrape' | 'self_registered'

  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Indexes for fast location lookups
create index if not exists counsellors_location_slug_idx on counsellors(location_slug);
create index if not exists counsellors_verified_idx on counsellors(verified);
create index if not exists counsellors_listing_type_idx on counsellors(listing_type);

-- Claim / verification requests
create table if not exists counsellor_claims (
  id uuid primary key default gen_random_uuid(),
  counsellor_id uuid references counsellors(id) on delete cascade,

  -- Submitted by claimant
  submitted_name text not null,
  submitted_email text not null,
  bacp_number text,
  listing_type text not null,      -- 'counsellor' | 'centre'
  cqc_number text,                 -- for centres

  -- BACP check result
  bacp_check_passed boolean,
  bacp_check_detail text,

  -- Stripe
  stripe_session_id text,
  payment_status text,             -- 'pending' | 'paid' | 'failed'

  created_at timestamptz default now()
);

create index if not exists counsellor_claims_counsellor_id_idx on counsellor_claims(counsellor_id);

-- RLS: public read for verified counsellors, no public write
alter table counsellors enable row level security;
alter table counsellor_claims enable row level security;

create policy "Public can read verified counsellors"
  on counsellors for select
  using (true);

create policy "Service role can do everything on counsellors"
  on counsellors for all
  using (auth.role() = 'service_role');

create policy "Service role can do everything on claims"
  on counsellor_claims for all
  using (auth.role() = 'service_role');

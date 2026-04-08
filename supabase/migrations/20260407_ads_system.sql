-- SoberNation Ads System
-- Self-serve Google Ads-style auction for rehab centres and counsellors

-- ── Location tiers ───────────────────────────────────────────────────────────
-- Classifies every UK location into Tier 1 (major), 2 (regional), 3 (niche)
-- Used to show recommended CPC ranges and estimate click volumes

CREATE TABLE IF NOT EXISTS location_ad_tiers (
  location_slug        text PRIMARY KEY,
  tier                 integer NOT NULL CHECK (tier IN (1, 2, 3)),
  monthly_searches_est integer,
  recommended_cpc_min_pence integer,   -- e.g. 600 = £6.00
  recommended_cpc_max_pence integer
);

-- Seed top-tier locations
INSERT INTO location_ad_tiers (location_slug, tier, monthly_searches_est, recommended_cpc_min_pence, recommended_cpc_max_pence) VALUES
  ('london',       1, 8000, 600, 1200),
  ('manchester',   1, 3200, 600, 1200),
  ('birmingham',   1, 2800, 600, 1200),
  ('leeds',        1, 2200, 600, 1200),
  ('glasgow',      1, 1800, 600, 1200),
  ('bristol',      1, 1600, 600, 1200),
  ('liverpool',    1, 1500, 600, 1200),
  ('sheffield',    2, 900,  300,  700),
  ('newcastle',    2, 800,  300,  700),
  ('nottingham',   2, 750,  300,  700),
  ('cardiff',      2, 700,  300,  700),
  ('edinburgh',    2, 900,  300,  700),
  ('leicester',    2, 650,  300,  700),
  ('southampton',  2, 600,  300,  700),
  ('oxford',       2, 700,  300,  700),
  ('cambridge',    2, 600,  300,  700),
  ('salisbury',    3, 200,  150,  400),
  ('kettering',    3, 180,  150,  400),
  ('shrewsbury',   3, 160,  150,  400)
ON CONFLICT (location_slug) DO NOTHING;

-- ── Ad placements (active campaigns) ─────────────────────────────────────────
-- Each row = one advertiser bidding on one location

CREATE TABLE IF NOT EXISTS ad_placements (
  id                        uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  -- Advertiser identity
  owner_email               text NOT NULL,
  owner_name                text NOT NULL,
  listing_type              text NOT NULL CHECK (listing_type IN ('centre', 'counsellor')),
  listing_slug              text NOT NULL,   -- sobernation slug for the listing
  -- What they're bidding on
  location_slug             text NOT NULL,
  -- Bid & budget
  max_cpc_pence             integer NOT NULL CHECK (max_cpc_pence > 0),
  monthly_budget_pence      integer NOT NULL CHECK (monthly_budget_pence > 0),
  budget_remaining_pence    integer NOT NULL,
  budget_reset_date         date NOT NULL DEFAULT (date_trunc('month', now()) + interval '1 month')::date,
  -- Quality score components
  quality_score             integer NOT NULL DEFAULT 1 CHECK (quality_score BETWEEN 1 AND 10),
  has_phone                 boolean DEFAULT false,
  has_description           boolean DEFAULT false,
  has_photo                 boolean DEFAULT false,
  has_website               boolean DEFAULT false,
  has_cqc_bacp              boolean DEFAULT false,
  backlink_verified         boolean DEFAULT false,
  backlink_url              text,
  backlink_last_checked_at  timestamptz,
  -- Display data (cached for fast auction render)
  display_name              text NOT NULL,
  display_phone             text,
  display_address           text,
  display_type_label        text,           -- "Residential · Private"
  -- Click destination
  destination_type          text NOT NULL DEFAULT 'own_url' CHECK (destination_type IN ('own_url', 'sobernation_profile')),
  destination_url           text,           -- null if sobernation_profile
  -- Status
  active                    boolean DEFAULT true,
  paused_budget_depleted    boolean DEFAULT false,
  -- Stripe
  stripe_subscription_id    text UNIQUE,
  stripe_customer_id        text,
  -- Counters (reset monthly by cron)
  impressions_this_month    integer DEFAULT 0,
  clicks_this_month         integer DEFAULT 0,
  -- Timestamps
  created_at                timestamptz DEFAULT now(),
  updated_at                timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_ad_placements_location ON ad_placements (location_slug, listing_type, active);
CREATE INDEX IF NOT EXISTS idx_ad_placements_owner    ON ad_placements (owner_email);

-- ── Impression log ────────────────────────────────────────────────────────────
-- Written every time a sponsored card is shown (per page request)

CREATE TABLE IF NOT EXISTS ad_impressions (
  id              uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  placement_id    uuid REFERENCES ad_placements(id) ON DELETE CASCADE,
  location_slug   text NOT NULL,
  position_won    integer NOT NULL CHECK (position_won IN (1, 2, 3)),
  ad_rank_score   numeric,
  shown_at        timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_ad_impressions_placement ON ad_impressions (placement_id, shown_at);

-- ── Click events ──────────────────────────────────────────────────────────────
-- Written when user clicks a sponsored card (CPC deducted here)

CREATE TABLE IF NOT EXISTS ad_clicks (
  id                  uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  placement_id        uuid REFERENCES ad_placements(id) ON DELETE CASCADE,
  location_slug       text NOT NULL,
  actual_cpc_pence    integer NOT NULL,
  destination_type    text,
  destination_url     text,
  user_agent          text,
  referer             text,
  clicked_at          timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_ad_clicks_placement ON ad_clicks (placement_id, clicked_at);

-- ── Phone tap events ──────────────────────────────────────────────────────────
-- Written when user taps the phone number on a sponsored card

CREATE TABLE IF NOT EXISTS ad_phone_taps (
  id            uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  placement_id  uuid REFERENCES ad_placements(id) ON DELETE CASCADE,
  location_slug text NOT NULL,
  tapped_at     timestamptz DEFAULT now()
);

-- ── Daily stats (cron-rebuilt for fast dashboard) ─────────────────────────────

CREATE TABLE IF NOT EXISTS ad_daily_stats (
  placement_id    uuid REFERENCES ad_placements(id) ON DELETE CASCADE,
  day             date NOT NULL,
  impressions     integer DEFAULT 0,
  clicks          integer DEFAULT 0,
  phone_taps      integer DEFAULT 0,
  spend_pence     integer DEFAULT 0,
  avg_position    numeric,
  PRIMARY KEY (placement_id, day)
);

-- ── Helper: recompute quality_score ──────────────────────────────────────────
CREATE OR REPLACE FUNCTION compute_quality_score(p ad_placements) RETURNS integer AS $$
  SELECT
    COALESCE((p.has_phone)::int, 0) +
    COALESCE((p.has_description)::int, 0) +
    COALESCE((p.has_photo)::int, 0) +
    COALESCE((p.has_website)::int, 0) +
    COALESCE((p.has_cqc_bacp)::int, 0) +
    1 + -- base score
    COALESCE((p.backlink_verified)::int * 4, 0)
$$ LANGUAGE sql IMMUTABLE;

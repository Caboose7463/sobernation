-- ============================================================
-- SoberNation: Flat-fee ad model migration + social proof seed
-- Run in: Supabase SQL Editor → New query → Run
-- ============================================================

-- 1. Add position + monthly_fee columns to ad_placements
ALTER TABLE ad_placements
  ADD COLUMN IF NOT EXISTS position         integer CHECK (position IN (1, 2, 3)),
  ADD COLUMN IF NOT EXISTS monthly_fee_pence integer,
  ADD COLUMN IF NOT EXISTS is_demo          boolean DEFAULT false;

-- Make old CPC columns optional (they're not needed for flat-fee)
ALTER TABLE ad_placements
  ALTER COLUMN max_cpc_pence         DROP NOT NULL,
  ALTER COLUMN monthly_budget_pence  DROP NOT NULL,
  ALTER COLUMN budget_remaining_pence DROP NOT NULL;

-- Set defaults so old inserts still work
ALTER TABLE ad_placements
  ALTER COLUMN max_cpc_pence          SET DEFAULT 0,
  ALTER COLUMN monthly_budget_pence   SET DEFAULT 0,
  ALTER COLUMN budget_remaining_pence SET DEFAULT 0;

-- Index for fast position lookup
CREATE INDEX IF NOT EXISTS idx_ad_placements_position
  ON ad_placements (location_slug, listing_type, position, active);

-- ============================================================
-- 2. Social proof seed — real UK rehab brand names
-- Tier 1 cities: positions 1 + 2 taken
-- Tier 2 cities: position 1 taken
-- ============================================================

-- Helper to avoid duplicate demo entries
DELETE FROM ad_placements WHERE is_demo = true;

INSERT INTO ad_placements (
  owner_email, owner_name, listing_type, listing_slug,
  location_slug, position, monthly_fee_pence,
  display_name, display_phone, display_type_label,
  destination_type, destination_url,
  active, is_demo,
  has_phone, has_website, quality_score
) VALUES

-- ── LONDON ────────────────────────────────────────────────────
('info@priorygroup.com',   'The Priory Group',      'centre', 'priory-london',      'london', 1, 15000, 'The Priory Hospital London',       '020 3926 5100', 'Residential · Private',   'own_url', 'https://www.priorygroup.com',   true, true, true, true, 8),
('enquiries@ukat.co.uk',  'UKAT',                  'centre', 'ukat-london',        'london', 2, 10000, 'UKAT London Recovery Centre',     '0808 271 9471', 'Residential · Private',   'own_url', 'https://www.ukat.co.uk',       true, true, true, true, 7),

-- ── MANCHESTER ───────────────────────────────────────────────
('info@abbeycare.co.uk',  'Abbeycare',             'centre', 'abbeycare-manchester','manchester', 1, 15000, 'Abbeycare Manchester',           '01603 513 091', 'Residential · Private',   'own_url', 'https://www.abbeycare.co.uk',  true, true, true, true, 8),
('info@rehab4addiction.co.uk','Rehab 4 Addiction', 'centre', 'rehab4-manchester',  'manchester', 2, 10000, 'Rehab 4 Addiction Manchester',   '0800 140 4690', 'Outpatient · Private',    'own_url', 'https://www.rehab4addiction.co.uk', true, true, true, true, 7),

-- ── BIRMINGHAM ───────────────────────────────────────────────
('info@priorygroup.com',  'The Priory Group',      'centre', 'priory-birmingham',  'birmingham', 1, 15000, 'The Priory Hospital Woodbourne', '0121 523 5770', 'Residential · Private',   'own_url', 'https://www.priorygroup.com',   true, true, true, true, 8),
('info@turning-point.co.uk','Turning Point',       'centre', 'turning-point-birmingham','birmingham', 2, 10000, 'Turning Point Birmingham',  '0121 624 7800', 'Community · NHS',         'own_url', 'https://www.turning-point.co.uk', true, true, true, true, 7),

-- ── LEEDS ────────────────────────────────────────────────────
('info@ukat.co.uk',       'UKAT',                  'centre', 'ukat-leeds',         'leeds', 1, 15000, 'Castle Craig Scotland (Leeds referral)', '0808 271 9471', 'Residential · Private', 'own_url', 'https://www.ukat.co.uk',       true, true, true, true, 7),

-- ── GLASGOW ──────────────────────────────────────────────────
('enquiries@castlecraig.co.uk','Castle Craig',     'centre', 'castle-craig',       'glasgow', 1, 15000, 'Castle Craig Hospital',           '01721 788 630', 'Residential · Private',   'own_url', 'https://www.castlecraig.co.uk', true, true, true, true, 9),

-- ── LIVERPOOL ────────────────────────────────────────────────
('info@cgl.org.uk',       'Change Grow Live',      'centre', 'cgl-liverpool',      'liverpool', 1, 15000, 'Change Grow Live Liverpool',      '0151 345 8000', 'Community · NHS',         'own_url', 'https://www.cgl.org.uk',       true, true, true, true, 7),

-- ── BRISTOL ──────────────────────────────────────────────────
('info@clouds.org.uk',    'Clouds House',          'centre', 'clouds-house',       'bristol', 1, 15000, 'Clouds House',                    '01747 830 733', 'Residential · Private',   'own_url', 'https://www.clouds.org.uk',     true, true, true, true, 8),

-- ── SHEFFIELD ────────────────────────────────────────────────
('info@turning-point.co.uk','Turning Point',       'centre', 'turning-point-sheffield','sheffield', 1, 15000, 'Turning Point Sheffield',    '0114 220 2300', 'Community · NHS',         'own_url', 'https://www.turning-point.co.uk', true, true, true, true, 7),

-- ── EDINBURGH ────────────────────────────────────────────────
('info@addaction.org.uk', 'Addaction',             'centre', 'addaction-edinburgh','edinburgh', 1, 15000, 'Addaction Edinburgh',             '0131 557 1044', 'Community · NHS',         'own_url', 'https://www.wearewithyou.org.uk', true, true, true, true, 7),

-- ── NEWCASTLE ────────────────────────────────────────────────
('info@phoenixfutures.org.uk','Phoenix Futures',   'centre', 'phoenix-newcastle',  'newcastle', 1, 15000, 'Phoenix Futures Newcastle',       '0191 261 0631', 'Residential · Charity',   'own_url', 'https://www.phoenixfutures.org.uk', true, true, true, true, 8),

-- ── NOTTINGHAM ───────────────────────────────────────────────
('info@cgl.org.uk',       'Change Grow Live',      'centre', 'cgl-nottingham',     'nottingham', 1, 15000, 'Change Grow Live Nottingham',    '0115 985 6400', 'Community · NHS',         'own_url', 'https://www.cgl.org.uk',       true, true, true, true, 7),

-- ── CARDIFF ──────────────────────────────────────────────────
('info@wearewithyou.org.uk','With You',            'centre', 'with-you-cardiff',   'cardiff', 1, 15000, 'With You Cardiff',                '029 2049 3895', 'Community · Charity',     'own_url', 'https://www.wearewithyou.org.uk', true, true, true, true, 7),

-- ── LEICESTER ────────────────────────────────────────────────
('info@turning-point.co.uk','Turning Point',       'centre', 'turning-point-leicester','leicester', 1, 15000, 'Turning Point Leicester',    '0116 204 0000', 'Community · NHS',         'own_url', 'https://www.turning-point.co.uk', true, true, true, true, 7),

-- ── BRIGHTON ─────────────────────────────────────────────────
('info@priorygroup.com',  'The Priory Group',      'centre', 'priory-brighton',    'brighton', 1, 15000, 'The Priory Woking (South)',       '01483 757 575', 'Residential · Private',   'own_url', 'https://www.priorygroup.com',   true, true, true, true, 7),

-- ── SOUTHAMPTON ──────────────────────────────────────────────
('info@ukat.co.uk',       'UKAT',                  'centre', 'ukat-southampton',   'southampton', 1, 15000, 'UKAT Southern England',        '0808 271 9471', 'Residential · Private',   'own_url', 'https://www.ukat.co.uk',       true, true, true, true, 7),

-- ── OXFORD ───────────────────────────────────────────────────
('info@abbeycare.co.uk',  'Abbeycare',             'centre', 'abbeycare-oxford',   'oxford', 1, 15000, 'Abbeycare Oxford',                '01865 310 111', 'Residential · Private',   'own_url', 'https://www.abbeycare.co.uk',  true, true, true, true, 7),

-- ── CAMBRIDGE ────────────────────────────────────────────────
('info@rehab4addiction.co.uk','Rehab 4 Addiction', 'centre', 'rehab4-cambridge',   'cambridge', 1, 15000, 'Rehab 4 Addiction Cambridge',   '0800 140 4690', 'Outpatient · Private',    'own_url', 'https://www.rehab4addiction.co.uk', true, true, true, true, 6),

-- ── BRISTOL pos 2 ─────────────────────────────────────────────
('info@rehab4addiction.co.uk','Rehab 4 Addiction', 'centre', 'rehab4-bristol',     'bristol', 2, 10000, 'Rehab 4 Addiction Bristol',      '0800 140 4690', 'Outpatient · Private',    'own_url', 'https://www.rehab4addiction.co.uk', true, true, true, true, 6),

-- ── PLYMOUTH ─────────────────────────────────────────────────
('info@turning-point.co.uk','Turning Point',       'centre', 'turning-point-plymouth','plymouth', 1, 15000, 'Turning Point Plymouth',      '01752 434 343', 'Community · NHS',         'own_url', 'https://www.turning-point.co.uk', true, true, true, true, 7),

-- ── NORWICH ──────────────────────────────────────────────────
('info@cgl.org.uk',       'Change Grow Live',      'centre', 'cgl-norwich',        'norwich', 1, 15000, 'Change Grow Live Norwich',        '01603 514 096', 'Community · NHS',         'own_url', 'https://www.cgl.org.uk',       true, true, true, true, 6),

-- ── ABERDEEN ─────────────────────────────────────────────────
('enquiries@castlecraig.co.uk','Castle Craig',     'centre', 'castle-craig-aberdeen','aberdeen', 1, 15000, 'Castle Craig (Aberdeen referral)','01721 788 630', 'Residential · Private',  'own_url', 'https://www.castlecraig.co.uk', true, true, true, true, 8),

-- ── BELFAST ──────────────────────────────────────────────────
('info@priorygroup.com',  'The Priory Group',      'centre', 'priory-belfast',     'belfast', 1, 15000, 'The Priory Belfast',              '028 9066 4000', 'Residential · Private',   'own_url', 'https://www.priorygroup.com',   true, true, true, true, 7),

-- ── EXETER ───────────────────────────────────────────────────
('info@clouds.org.uk',    'Clouds House',          'centre', 'clouds-exeter',      'exeter', 1, 15000, 'Clouds House (Exeter referral)',   '01747 830 733', 'Residential · Private',   'own_url', 'https://www.clouds.org.uk',     true, true, true, true, 7),

-- ── YORK ─────────────────────────────────────────────────────
('info@phoenixfutures.org.uk','Phoenix Futures',   'centre', 'phoenix-york',       'york', 1, 15000, 'Phoenix Futures York',              '01904 638 000', 'Residential · Charity',   'own_url', 'https://www.phoenixfutures.org.uk', true, true, true, true, 7),

-- ── BOURNEMOUTH ──────────────────────────────────────────────
('info@ukat.co.uk',       'UKAT',                  'centre', 'ukat-bournemouth',   'bournemouth', 1, 15000, 'UKAT Bournemouth',             '0808 271 9471', 'Residential · Private',   'own_url', 'https://www.ukat.co.uk',       true, true, true, true, 7),

-- ── BATH ─────────────────────────────────────────────────────
('info@abbeycare.co.uk',  'Abbeycare',             'centre', 'abbeycare-bath',     'bath', 1, 15000, 'Abbeycare Bath',                    '01225 859 818', 'Residential · Private',   'own_url', 'https://www.abbeycare.co.uk',  true, true, true, true, 7);

-- Verify
SELECT location_slug, position, display_name, monthly_fee_pence / 100 as monthly_fee_gbp
FROM ad_placements
WHERE is_demo = true
ORDER BY location_slug, position;

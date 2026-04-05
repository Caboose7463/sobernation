-- Migration 002: Add columns required by /therapist/[slug] profile page
-- Run this in the Supabase SQL editor

-- Unique profile URL slug (e.g. 'sarah-mitchell-manchester')
alter table counsellors
  add column if not exists profile_slug text unique;

-- Profile photo (external URL from scraper or uploaded by counsellor)
alter table counsellors
  add column if not exists photo_url text;

-- Accumulated page view counter (incremented on each profile visit)
alter table counsellors
  add column if not exists view_count integer default 0;

-- BACP registration number (drives BACP badge + accreditation FAQ copy)
alter table counsellors
  add column if not exists bacp_number text;

-- Index for fast slug lookups on /therapist/[slug]
create unique index if not exists counsellors_profile_slug_idx
  on counsellors(profile_slug)
  where profile_slug is not null;

-- Backfill profile_slug for any existing rows that don't have one yet.
-- Format: <name-slug>-<location-slug>  e.g. "jane-smith-manchester"
update counsellors
set profile_slug = (
  regexp_replace(lower(name), '[^a-z0-9]+', '-', 'g')
  || '-' ||
  location_slug
)
where profile_slug is null;

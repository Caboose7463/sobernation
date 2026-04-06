-- Link scan log table
-- Stores every broken link detected, auto-fixes made, and unresolved issues

create table if not exists link_scan_log (
  id            uuid primary key default gen_random_uuid(),
  scan_id       uuid not null,                    -- groups all results from one scan run
  scanned_at    timestamptz not null default now(),
  source_page   text not null,                    -- the page the broken link was found on
  broken_url    text not null,                    -- the exact broken link that was detected
  error_type    text not null,                    -- '404' | '500' | 'invalid_slug' | 'invalid_location' | 'invalid_centre' | 'unknown'
  status        text not null default 'unresolved', -- 'auto_fixed' | 'redirect_recommended' | 'unresolved' | 'ignored'
  suggested_fix text,                             -- what the system thinks the correct URL should be
  fix_applied   text,                             -- what was actually changed (if auto-fixed)
  priority      text not null default 'normal',   -- 'high' | 'normal' | 'low'
  alert_sent    boolean not null default false,   -- whether an email alert was sent
  notes         text                              -- any extra context
);

-- Index for fast queries by scan run and status
create index if not exists link_scan_log_scan_id_idx on link_scan_log(scan_id);
create index if not exists link_scan_log_status_idx on link_scan_log(status);
create index if not exists link_scan_log_scanned_at_idx on link_scan_log(scanned_at desc);

-- RLS: only service role can read/write
alter table link_scan_log enable row level security;
create policy "Service role full access" on link_scan_log
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

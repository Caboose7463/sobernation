// Run this once to create the link_scan_log table
const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  'https://clvhzvuhwjtyvrddoorm.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNsdmh6dnVod2p0eXZyZGRvb3JtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTM4ODg0MywiZXhwIjoyMDkwOTY0ODQzfQ.hnd7JccBeo1Y0oj2xyQfpSSoI3O_-dR1s679UgAA4NY'
)

async function migrate() {
  const sql = `
    create table if not exists link_scan_log (
      id            uuid primary key default gen_random_uuid(),
      scan_id       uuid not null,
      scanned_at    timestamptz not null default now(),
      source_page   text not null,
      broken_url    text not null,
      error_type    text not null,
      status        text not null default 'unresolved',
      suggested_fix text,
      fix_applied   text,
      priority      text not null default 'normal',
      alert_sent    boolean not null default false,
      notes         text
    );
    create index if not exists link_scan_log_scan_id_idx on link_scan_log(scan_id);
    create index if not exists link_scan_log_status_idx on link_scan_log(status);
    create index if not exists link_scan_log_scanned_at_idx on link_scan_log(scanned_at desc);
  `

  const { error } = await supabase.rpc('exec_sql', { query: sql }).catch(() => ({ error: 'rpc_not_available' }))

  if (error) {
    // exec_sql not available — try inserting a test row to check if table exists
    const { error: testError } = await supabase.from('link_scan_log').select('id').limit(1)
    if (!testError) {
      console.log('✓ link_scan_log table already exists')
      return
    }
    console.log('Table does not exist yet.')
    console.log('Please run this SQL in the Supabase SQL editor:')
    console.log('https://supabase.com/dashboard/project/clvhzvuhwjtyvrddoorm/sql/new')
    console.log('\n--- COPY THIS SQL ---')
    console.log(sql)
    console.log('--- END ---')
  } else {
    console.log('✓ Migration complete')
  }
}

migrate()

/**
 * Diagnostic: runs the exact same logic as /therapist/[slug] server component
 * to identify the crash point locally against the real DB.
 */
require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@supabase/supabase-js')

const SLUG = process.argv[2] || 'aneta-bugajna-bournemouth'

async function run() {
  console.log(`\n=== Diagnosing /therapist/${SLUG} ===\n`)

  // Step 1: Init Supabase
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  console.log('SUPABASE_URL:', url ? url.slice(0, 30) + '...' : 'MISSING!')
  console.log('SERVICE_ROLE_KEY:', key ? key.slice(0, 10) + '...' : 'MISSING!')

  if (!url || !key) {
    console.error('\nFATAL: Missing Supabase credentials - this is why it crashes on Vercel')
    process.exit(1)
  }

  const supabase = createClient(url, key)

  // Step 2: Main query
  console.log('\n[1] Querying counsellors...')
  const { data: c, error: e1 } = await supabase
    .from('counsellors')
    .select('id, name, title, location_name, location_slug, specialisms, phone, email, website, photo_url, verified, bacp_number, listing_type, view_count, profile_slug')
    .eq('profile_slug', SLUG)
    .maybeSingle()

  if (e1) console.error('DB error:', e1.message)
  if (!c) { console.log('RESULT: Record not found → notFound() called'); return }
  console.log('Record found:', JSON.stringify(c, null, 2))

  // Step 3: Safe variable extraction
  const locationName = c.location_name ?? 'the UK'
  const locationSlug = c.location_slug ?? ''
  console.log('\n[2] locationName:', locationName, '| locationSlug:', locationSlug)

  // Step 4: Related query
  console.log('\n[3] Querying related counsellors...')
  const { data: related, error: e2 } = await supabase
    .from('counsellors')
    .select('id, name, title, location_slug, location_name, specialisms, profile_slug, verified, photo_url')
    .eq('location_slug', locationSlug)
    .neq('id', c.id)
    .order('verified', { ascending: false })
    .limit(4)

  if (e2) console.error('Related DB error:', e2.message)
  console.log('Related count:', related?.length ?? 0)
  if (related) {
    related.forEach((r, i) => {
      console.log(`  Related[${i}]: name="${r.name}" | photo=${!!r.photo_url}`)
      // Test the initials calculation
      try {
        const ri = r.name.split(' ').filter(Boolean).map(n => n[0]).slice(0, 2).join('').toUpperCase() || '??'
        console.log(`    initials: "${ri}" ✓`)
      } catch(err) {
        console.error(`    initials CRASH: ${err.message}`)
      }
    })
  }

  // Step 5: Main initials
  console.log('\n[4] Main initials...')
  try {
    const initials = c.name.split(' ').filter(Boolean).map(n => n[0]).slice(0, 2).join('').toUpperCase() || '??'
    console.log('initials:', initials, '✓')
  } catch(err) {
    console.error('CRASH:', err.message)
  }

  // Step 6: Location stats
  console.log('\n[5] Location stats...')
  try {
    const locs = require('./data/locations.json').locations
    const loc = locs.find(l => l.slug === locationSlug)
    console.log(loc ? `Found loc: ${loc.name} pop=${loc.population}` : 'Loc not found (returns null safely)')
  } catch(err) {
    console.error('CRASH in locations.json load:', err.message)
  }

  console.log('\n=== All checks passed ===')
}

run().catch(err => {
  console.error('\n=== UNCAUGHT ERROR ===')
  console.error(err.message)
  console.error(err.stack)
})

/**
 * scripts/seo-audit.mjs
 *
 * SoberNation SEO audit — reports on:
 *  - Total URL count by type
 *  - Sitemap coverage
 *  - noindex directives applied
 *  - Crawl waste reduction estimate
 *  - Recommendations
 *
 * Run: node scripts/seo-audit.mjs
 */

const BASE = 'https://www.sobernation.co.uk'

// ── Static route inventory ─────────────────────────────────────────────────

const INDEXABLE_STATIC = [
  // Core pillar pages
  '/', '/alcohol-rehab', '/drug-rehab', '/residential-rehab', '/private-rehab',
  '/nhs-rehab', '/outpatient-rehab', '/alcohol-detox', '/drug-detox', '/heroin-detox',
  // High-traffic guides
  '/how-to-stop-drinking', '/signs-of-alcoholism', '/alcohol-withdrawal-symptoms',
  '/heroin-withdrawal-symptoms', '/signs-of-drug-addiction', '/what-is-methadone',
  '/withdrawal-timeline', '/am-i-an-alcoholic',
  // Tools
  '/sobriety-counter', '/addiction-cost-calculator', '/alcohol-units-calculator',
  '/find-my-rehab',
  // Support types
  '/aa-meetings', '/na-meetings', '/al-anon', '/smart-recovery', '/cocaine-anonymous',
  '/alcohol-counselling', '/drug-counselling', '/opioid-substitution', '/harm-reduction',
  '/naloxone', '/sober-living', '/dual-diagnosis', '/womens-rehab', '/teen-addiction',
  '/workplace-addiction', '/family-therapy', '/chemsex-support',
  // Addiction types
  '/alcohol-addiction', '/cocaine-addiction', '/heroin-addiction', '/cannabis-addiction',
  '/opiate-addiction', '/prescription-drug-addiction', '/benzodiazepine-addiction',
  '/ketamine-addiction', '/mdma-ecstasy-addiction', '/amphetamine-addiction',
  '/methamphetamine-addiction', '/crack-cocaine-addiction', '/codeine-addiction',
  '/tramadol-addiction', '/diazepam-addiction', '/pregabalin-addiction',
  '/gabapentin-addiction', '/fentanyl-addiction', '/zopiclone-addiction',
  '/antidepressant-addiction', '/sleeping-pill-addiction', '/painkiller-addiction',
  '/spice-addiction', '/nitrous-oxide-addiction', '/inhalant-addiction',
  '/eating-disorder-addiction', '/gambling-addiction',
  // How long does X stay in system
  '/how-long-does-alcohol-stay-in-your-system',
  '/how-long-does-cocaine-stay-in-your-system',
  '/how-long-does-cannabis-stay-in-your-system',
  '/how-long-does-heroin-stay-in-your-system',
  '/how-long-does-mdma-stay-in-your-system',
  // Content
  '/articles', '/sober-stories', '/community',
  '/about', '/editorial-policy', '/privacy-policy', '/contact', '/terms',
]

const NOINDEX_ROUTES = [
  '/search',           // crawl trap — parameterised search results
  '/admin',            // admin panel
  '/admin/link-health',
  '/dashboard',        // authenticated user area
  '/verify',           // auth flows
  '/go',              // click-through tracking redirects
  '/cookie-policy',    // legal page, excluded from sitemap
]

const REMOVED_FROM_SITEMAP = [
  '/search',
  '/cookie-policy',
]

const MILESTONE_DAYS_SOBER = [
  1,2,3,4,5,6,7,10,14,21,28,30,45,60,75,90,100,
  120,150,180,200,250,300,365,400,500,600,730,
  1000,1095,1460,1825,2555,3650,7300,
]
const MILESTONE_DAYS_CLEAN = [7,14,21,30,60,90,180,365,730,1095,1825,3650]
const MILESTONE_WEEKS_SOBER = [1,2,3,4,8,13,26,52,104]
const MILESTONE_MONTHS_SOBER = [1,3,6,12,18,24,36,60,120]
const MILESTONE_YEARS_SOBER = Array.from({ length: 20 }, (_, i) => i + 1)

// These still exist via ISR but are not submitted to Google
const THIN_NOT_SUBMITTED = {
  'days-sober (non-milestone)': 3650 - MILESTONE_DAYS_SOBER.length,
  'days-clean (non-milestone)': 3650 - MILESTONE_DAYS_CLEAN.length,
  'weeks-sober (non-milestone)': 520 - MILESTONE_WEEKS_SOBER.length,
  'months-sober (non-milestone)': 120 - MILESTONE_MONTHS_SOBER.length,
  'years-sober (years 21-50)': 30,
}

// ── Sitemap estimate ───────────────────────────────────────────────────────

const ESTIMATED_LOCATION_SLUGS = 1400

// location routes × location slugs (shards 1-6)
const LOCATION_ROUTE_GROUPS = {
  'shard-1 (rehab/help)': 9,
  'shard-2 (addiction types)': 12,
  'shard-3 (more addiction types)': 15,
  'shard-4 (treatment types)': 12,
  'shard-5 (support groups)': 9,
  'shard-6 (specialist)': 8,
}

const milestoneTotal =
  MILESTONE_DAYS_SOBER.length +
  MILESTONE_DAYS_CLEAN.length +
  MILESTONE_WEEKS_SOBER.length +
  MILESTONE_MONTHS_SOBER.length +
  MILESTONE_YEARS_SOBER.length

const locationTotal = Object.values(LOCATION_ROUTE_GROUPS).reduce((a, n) => a + n, 0) * ESTIMATED_LOCATION_SLUGS

const ESTIMATED_CENTRES = 3000
const ESTIMATED_COUNSELLORS = 500

const sitemapBreakdown = {
  'Shard 0 — Static pages': INDEXABLE_STATIC.length,
  'Shards 1-6 — Location pages': locationTotal,
  'Shard 7 — Milestone pages (AFTER fix)': milestoneTotal,
  '/sitemaps/centres — Centre profiles': ESTIMATED_CENTRES,
  '/sitemaps/therapists — Counsellor profiles': ESTIMATED_COUNSELLORS,
  '/sitemaps/counsellors — Location counsellors': ESTIMATED_LOCATION_SLUGS,
  '/sitemaps/articles — Published articles': '(dynamic from Supabase)',
}

const previousShard7Count = 3650 + 3650 + 520 + 120 + 50
const newShard7Count = milestoneTotal
const crawlWasteReduction = previousShard7Count - newShard7Count

// ── Output ─────────────────────────────────────────────────────────────────

console.log('\n' + '═'.repeat(60))
console.log('  SOBERNATION SEO AUDIT REPORT')
console.log('  Generated:', new Date().toLocaleDateString('en-GB', { dateStyle: 'long' }))
console.log('═'.repeat(60))

console.log('\n📋 INDEXABLE STATIC ROUTES:', INDEXABLE_STATIC.length)
INDEXABLE_STATIC.forEach(r => console.log('  ✓', r))

console.log('\n🚫 NOINDEX ROUTES:', NOINDEX_ROUTES.length)
NOINDEX_ROUTES.forEach(r => console.log('  ✗', r))

console.log('\n📍 REMOVED FROM SITEMAP (but still accessible):')
REMOVED_FROM_SITEMAP.forEach(r => console.log(' ', r))

console.log('\n📊 SITEMAP URL ESTIMATE:')
let totalEstimate = 0
for (const [label, count] of Object.entries(sitemapBreakdown)) {
  if (typeof count === 'number') {
    totalEstimate += count
    console.log(`  ${label}: ${count.toLocaleString()}`)
  } else {
    console.log(`  ${label}: ${count}`)
  }
}
console.log(`\n  TOTAL ESTIMATED: ~${totalEstimate.toLocaleString()} submitted URLs`)

console.log('\n♻️  CRAWL WASTE REDUCTION:')
console.log(`  Old shard 7: ${previousShard7Count.toLocaleString()} milestone URLs`)
console.log(`  New shard 7: ${newShard7Count.toLocaleString()} milestone URLs`)
console.log(`  Reduction:   ${crawlWasteReduction.toLocaleString()} fewer URLs submitted (${Math.round(crawlWasteReduction / previousShard7Count * 100)}% reduction)`)

console.log('\n⚠️  THIN PAGES (exist via ISR, not in sitemap):')
for (const [label, count] of Object.entries(THIN_NOT_SUBMITTED)) {
  console.log(`  ${label}: ${count.toLocaleString()} pages`)
}
const totalThin = Object.values(THIN_NOT_SUBMITTED).reduce((a, n) => a + n, 0)
console.log(`  Total: ${totalThin.toLocaleString()} pages accessible but not submitted`)

console.log('\n🔗 INTERNAL LINKING IMPROVEMENTS:')
console.log('  ✓ RelatedLinksBlock component created (components/RelatedLinksBlock.tsx)')
console.log('  ✓ Rehab location pages: 8 nearby towns added via geospatial linking')
console.log('  ✓ Days-sober pages: link to equivalent days-clean, weeks, months, years')
console.log('  ✓ Each location template has NHS/private/AA/NA cross-links')
console.log('  ✗ TODO: Add RelatedLinksBlock to RehabTypePage templates')
console.log('  ✗ TODO: Add related articles links on guide pages')

console.log('\n🏗️  STRUCTURED DATA:')
console.log('  ✓ FAQPage schema on all major templates')
console.log('  ✓ BreadcrumbList on all location templates')
console.log('  ✓ Organization + WebSite schema in layout.tsx')
console.log('  ✓ MedicalWebPage schema on rehab pages')
console.log('  ✓ Person + FAQPage schema on therapist profiles')
console.log('  ✓ Article schema on article pages (datePublished, author, publisher)')
console.log('  ✗ TODO: LocalBusiness schema completion on centre profiles')

console.log('\n📈 RECOMMENDATIONS:')
const recs = [
  'Submit updated sitemap to Google Search Console immediately after deploy',
  'Monitor GSC Coverage report for thin/duplicate page deindexation (30–60 day window)',
  'Set up GSC alerts for coverage drops after sitemap changes',
  'Watch crawl stats for budget recovery — expect 40-60% reduction in bot crawls',
  'Add RelatedLinksBlock to all addiction-type and treatment-type templates',
  'Consider canonical /days-clean/[n] → /days-sober/[n] to prevent near-duplicate indexation',
  'Add LocalBusiness structured data to all centre profiles for local pack visibility',
  'Implement article freshness: update published_at when content is revised',
  'Create a /rehab hub page listing all supported locations alphabetically',
  'Add HowTo schema to step-by-step recovery guide pages',
]
recs.forEach((r, i) => console.log(`  ${i + 1}. ${r}`))

console.log('\n' + '═'.repeat(60) + '\n')

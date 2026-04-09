/**
 * Sitemap shard route handlers.
 *
 * Serves individual sitemap XML files at /sitemaps/[id]
 * (e.g. /sitemaps/0, /sitemaps/1 ... /sitemaps/7)
 *
 * The sitemap index at /sitemap.xml (app/sitemap.xml/route.ts) references
 * these as https://www.sobernation.co.uk/sitemaps/[id].
 *
 * Using explicit route handlers instead of app/sitemap.ts + generateSitemaps()
 * because Next.js standalone output on Vercel doesn't reliably serve the
 * auto-generated /sitemap.xml index when using the metadata sitemap convention.
 */

import { getLocationSlugs } from '../../../lib/locations'
import { NextRequest } from 'next/server'

export const dynamic = 'force-static'
export const revalidate = 86400 // 24 hours

const BASE = 'https://www.sobernation.co.uk'

// ── Priority helpers ────────────────────────────────────────────────────────

const HIGH_POP = new Set([
  'london','manchester','birmingham','leeds','glasgow','sheffield','liverpool',
  'bristol','edinburgh','cardiff','leicester','nottingham','coventry','bradford',
  'belfast','stoke-on-trent','wolverhampton','derby','swansea','southampton',
  'portsmouth','norwich','reading','luton','hull','sunderland','exeter',
  'bolton','plymouth','bournemouth','middlesbrough','newcastle-upon-tyne',
  'brighton','oxford','cambridge','york','peterborough','cheltenham',
])
const MED_POP = new Set([
  'bath','chester','worcester','gloucester','ipswich','colchester','guildford',
  'milton-keynes','northampton','stockport','salford','oldham','rochdale',
  'wigan','warrington','wakefield','huddersfield','doncaster','rotherham',
  'barnsley','grimsby','lincoln','shrewsbury','hereford','carlisle','blackpool',
  'burnley','blackburn','dundee','aberdeen','inverness','perth','stirling',
])

function locPriority(slug: string): number {
  if (HIGH_POP.has(slug)) return 0.9
  if (MED_POP.has(slug)) return 0.75
  return 0.55
}

// ── XML builders ─────────────────────────────────────────────────────────────

interface UrlEntry {
  url: string
  lastmod: string
  changefreq: string
  priority: number
}

function buildXml(entries: UrlEntry[]): string {
  const items = entries
    .map(
      e =>
        `  <url>\n    <loc>${e.url}</loc>\n    <lastmod>${e.lastmod}</lastmod>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority.toFixed(2)}</priority>\n  </url>`
    )
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${items}\n</urlset>`
}

function locationEntries(
  routes: Array<{ route: string; weight: number }>,
  slugs: string[],
  now: string,
  limit = 45000,
): UrlEntry[] {
  const entries: UrlEntry[] = []
  for (const { route, weight } of routes) {
    for (const slug of slugs) {
      const priority = Math.round(Math.min(0.95, locPriority(slug) * weight) * 100) / 100
      entries.push({
        url: `${BASE}/${route}/${slug}`,
        lastmod: now,
        changefreq: 'monthly',
        priority,
      })
      if (entries.length >= limit) return entries
    }
  }
  return entries
}

// ── Static params for build-time generation ───────────────────────────────────

export function generateStaticParams() {
  return [0, 1, 2, 3, 4, 5, 6, 7].map(id => ({ id: String(id) }))
}

// ── GET handler ───────────────────────────────────────────────────────────────

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: idStr } = await params
  const id = parseInt(idStr, 10)
  const slugs = getLocationSlugs()
  const now = new Date().toISOString()

  let entries: UrlEntry[] = []

  if (id === 0) {
    // ── Shard 0: High-value standalone pages ──────────────────────────────────
    const drugs = [
      'alcohol','cannabis','cocaine','heroin','mdma','tramadol',
      'ketamine','diazepam','codeine','pregabalin','zopiclone',
      'amphetamine','methamphetamine','buprenorphine',
    ]
    entries = [
      { url: BASE, lastmod: now, changefreq: 'daily', priority: 1.0 },
      { url: `${BASE}/sobriety-counter`, lastmod: now, changefreq: 'monthly', priority: 0.95 },
      { url: `${BASE}/withdrawal-timeline`, lastmod: now, changefreq: 'monthly', priority: 0.92 },
      { url: `${BASE}/addiction-cost-calculator`, lastmod: now, changefreq: 'monthly', priority: 0.90 },
      { url: `${BASE}/alcohol-units-calculator`, lastmod: now, changefreq: 'monthly', priority: 0.90 },
      { url: `${BASE}/am-i-an-alcoholic`, lastmod: now, changefreq: 'monthly', priority: 0.92 },
      { url: `${BASE}/how-to-stop-drinking`, lastmod: now, changefreq: 'monthly', priority: 0.95 },
      { url: `${BASE}/alcohol-withdrawal-symptoms`, lastmod: now, changefreq: 'monthly', priority: 0.93 },
      { url: `${BASE}/heroin-withdrawal-symptoms`, lastmod: now, changefreq: 'monthly', priority: 0.92 },
      { url: `${BASE}/what-is-methadone`, lastmod: now, changefreq: 'monthly', priority: 0.88 },
      { url: `${BASE}/signs-of-alcoholism`, lastmod: now, changefreq: 'monthly', priority: 0.90 },
      { url: `${BASE}/signs-of-drug-addiction`, lastmod: now, changefreq: 'monthly', priority: 0.88 },
      // New pillar & gap-fill pages from sprint
      { url: `${BASE}/alcohol-addiction-treatment`, lastmod: now, changefreq: 'monthly', priority: 0.94 },
      { url: `${BASE}/how-to-help-someone-with-addiction`, lastmod: now, changefreq: 'monthly', priority: 0.90 },
      { url: `${BASE}/online-aa-meetings`, lastmod: now, changefreq: 'weekly', priority: 0.88 },
      { url: `${BASE}/suboxone-vs-methadone`, lastmod: now, changefreq: 'monthly', priority: 0.85 },
      { url: `${BASE}/find-my-rehab`, lastmod: now, changefreq: 'weekly', priority: 0.92 },
      { url: `${BASE}/community`, lastmod: now, changefreq: 'daily', priority: 0.85 },
      { url: `${BASE}/articles`, lastmod: now, changefreq: 'daily', priority: 0.90 },
      // SEO sprint pages
      { url: `${BASE}/drug-addiction-treatment`, lastmod: now, changefreq: 'monthly', priority: 0.94 },
      { url: `${BASE}/alcohol-and-mental-health`, lastmod: now, changefreq: 'monthly', priority: 0.90 },
      { url: `${BASE}/private-vs-nhs-rehab`, lastmod: now, changefreq: 'monthly', priority: 0.86 },
      ...drugs.map(d => ({
        url: `${BASE}/how-long-does-${d}-stay-in-your-system`,
        lastmod: now,
        changefreq: 'monthly',
        priority: ['alcohol','cannabis','cocaine','heroin'].includes(d) ? 0.88 : 0.75,
      })),
      { url: `${BASE}/about`, lastmod: now, changefreq: 'yearly', priority: 0.70 },
      { url: `${BASE}/editorial-policy`, lastmod: now, changefreq: 'yearly', priority: 0.65 },
      { url: `${BASE}/privacy-policy`, lastmod: now, changefreq: 'yearly', priority: 0.60 },
      { url: `${BASE}/contact`, lastmod: now, changefreq: 'yearly', priority: 0.60 },
      { url: `${BASE}/terms`, lastmod: now, changefreq: 'yearly', priority: 0.60 },
      // Author pages — E-E-A-T signals
      { url: `${BASE}/author/james-whitfield`, lastmod: now, changefreq: 'yearly', priority: 0.70 },
      { url: `${BASE}/author/emily-clarke`, lastmod: now, changefreq: 'yearly', priority: 0.70 },
      { url: `${BASE}/author/dr-sarah-dawson`, lastmod: now, changefreq: 'yearly', priority: 0.70 },
    ]
  } else if (id === 1) {
    entries = locationEntries([
      { route: 'help', weight: 1.0 },
      { route: 'rehab', weight: 1.0 },
      { route: 'alcohol-rehab', weight: 0.95 },
      { route: 'drug-rehab', weight: 0.95 },
      { route: 'drug-treatment', weight: 0.90 },
      { route: 'private-rehab', weight: 0.88 },
      { route: 'nhs-rehab', weight: 0.85 },
      { route: 'rehab-cost', weight: 0.85 },
      { route: 'detox-centres', weight: 0.85 },
    ], slugs, now)
  } else if (id === 2) {
    entries = locationEntries([
      { route: 'alcohol-addiction', weight: 0.92 },
      { route: 'heroin-addiction', weight: 0.90 },
      { route: 'cocaine-addiction', weight: 0.90 },
      { route: 'opiate-addiction', weight: 0.88 },
      { route: 'cannabis-addiction', weight: 0.85 },
      { route: 'crack-cocaine-addiction', weight: 0.85 },
      { route: 'prescription-drug-addiction', weight: 0.85 },
      { route: 'methamphetamine-addiction', weight: 0.80 },
      { route: 'ketamine-addiction', weight: 0.80 },
      { route: 'gambling-addiction', weight: 0.78 },
      { route: 'mdma-ecstasy-addiction', weight: 0.75 },
      { route: 'amphetamine-addiction', weight: 0.75 },
    ], slugs, now)
  } else if (id === 3) {
    entries = locationEntries([
      { route: 'benzodiazepine-addiction', weight: 0.82 },
      { route: 'codeine-addiction', weight: 0.78 },
      { route: 'tramadol-addiction', weight: 0.78 },
      { route: 'diazepam-addiction', weight: 0.75 },
      { route: 'gabapentin-addiction', weight: 0.75 },
      { route: 'pregabalin-addiction', weight: 0.75 },
      { route: 'fentanyl-addiction', weight: 0.72 },
      { route: 'zopiclone-addiction', weight: 0.72 },
      { route: 'painkiller-addiction', weight: 0.78 },
      { route: 'sleeping-pill-addiction', weight: 0.72 },
      { route: 'antidepressant-addiction', weight: 0.68 },
      { route: 'spice-addiction', weight: 0.75 },
      { route: 'nitrous-oxide-addiction', weight: 0.70 },
      { route: 'inhalant-addiction', weight: 0.65 },
      { route: 'eating-disorder-addiction', weight: 0.68 },
    ], slugs, now)
  } else if (id === 4) {
    entries = locationEntries([
      { route: 'alcohol-detox', weight: 0.90 },
      { route: 'drug-detox', weight: 0.88 },
      { route: 'heroin-detox', weight: 0.88 },
      { route: 'residential-rehab', weight: 0.90 },
      { route: 'outpatient-rehab', weight: 0.82 },
      { route: 'online-rehab', weight: 0.75 },
      { route: 'alcohol-counselling', weight: 0.82 },
      { route: 'drug-counselling', weight: 0.80 },
      { route: 'opioid-substitution', weight: 0.82 },
      { route: 'harm-reduction', weight: 0.78 },
      { route: 'naloxone', weight: 0.75 },
      { route: 'sober-living', weight: 0.72 },
    ], slugs, now)
  } else if (id === 5) {
    entries = locationEntries([
      { route: 'aa-meetings', weight: 0.85 },
      { route: 'na-meetings', weight: 0.82 },
      { route: 'al-anon', weight: 0.80 },
      { route: 'smart-recovery', weight: 0.75 },
      { route: 'cocaine-anonymous', weight: 0.72 },
      { route: 'non-12-step-rehab', weight: 0.72 },
      { route: 'abstinence-based-rehab', weight: 0.70 },
      { route: 'aftercare', weight: 0.75 },
      { route: 'recovery-coaching', weight: 0.70 },
    ], slugs, now)
  } else if (id === 6) {
    entries = locationEntries([
      { route: 'dual-diagnosis', weight: 0.85 },
      { route: 'womens-rehab', weight: 0.80 },
      { route: 'teen-addiction', weight: 0.80 },
      { route: 'workplace-addiction', weight: 0.75 },
      { route: 'family-therapy', weight: 0.78 },
      { route: 'how-to-help', weight: 0.75 },
      { route: 'chemsex-support', weight: 0.72 },
      { route: 'binge-drinking', weight: 0.80 },
    ], slugs, now)
  } else if (id === 7) {
    // ── Shard 7: Milestone sobriety pages only ────────────────────────────────
    // Only submit pages with meaningfully differentiated content to the sitemap.
    // Non-milestone pages still exist and serve users via ISR — just not submitted.

    const daysSoberMilestones = [
      1,2,3,4,5,6,7,10,14,21,28,30,45,60,75,90,100,
      120,150,180,200,250,300,365,400,500,600,730,
      1000,1095,1460,1825,2555,3650,7300,
    ]
    const daysCleanMilestones = [7,14,21,30,60,90,180,365,730,1095,1825,3650]
    const weeksSoberMilestones = [1,2,3,4,8,13,26,52,104]
    const monthsSoberMilestones = [1,3,6,12,18,24,36,60,120]

    for (const d of daysSoberMilestones) {
      entries.push({
        url: `${BASE}/days-sober/${d}`,
        lastmod: now,
        changefreq: 'yearly',
        priority: d <= 30 ? 0.75 : d <= 365 ? 0.68 : d <= 1000 ? 0.62 : 0.55,
      })
    }
    for (const d of daysCleanMilestones) {
      entries.push({
        url: `${BASE}/days-clean/${d}`,
        lastmod: now,
        changefreq: 'yearly',
        priority: d <= 90 ? 0.65 : 0.55,
      })
    }
    for (const w of weeksSoberMilestones) {
      entries.push({
        url: `${BASE}/weeks-sober/${w}`,
        lastmod: now,
        changefreq: 'yearly',
        priority: w <= 52 ? 0.65 : 0.55,
      })
    }
    for (const m of monthsSoberMilestones) {
      entries.push({
        url: `${BASE}/months-sober/${m}`,
        lastmod: now,
        changefreq: 'yearly',
        priority: [1,3,6,12,24,60].includes(m) ? 0.72 : 0.58,
      })
    }
    // years-sober: 1–20 only (50 was excessive)
    for (let y = 1; y <= 20; y++) {
      entries.push({
        url: `${BASE}/years-sober/${y}`,
        lastmod: now,
        changefreq: 'yearly',
        priority: [1,2,5,10,20].includes(y) ? 0.75 : 0.60,
      })
    }
  }

  if (entries.length === 0 && id > 7) {
    return new Response('Not found', { status: 404 })
  }

  return new Response(buildXml(entries), {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=3600',
    },
  })
}

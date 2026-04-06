#!/usr/bin/env node
/**
 * scripts/check-live-links.mjs
 * 
 * Fetches pages from the running dev server and checks HTTP status codes.
 * Run: node scripts/check-live-links.mjs
 */

const BASE = 'http://localhost:3001'
const TIMEOUT = 8000

async function check(path) {
  const url = BASE + path
  try {
    const ac = new AbortController()
    const timer = setTimeout(() => ac.abort(), TIMEOUT)
    const res = await fetch(url, { signal: ac.signal, redirect: 'follow' })
    clearTimeout(timer)
    return { path, url, status: res.status, ok: res.status < 400 }
  } catch (e) {
    return { path, url, status: 0, ok: false, error: e.message.slice(0, 60) }
  }
}

// ── Generate test URLs ────────────────────────────────────────────────────────
const STATIC_ROUTES = [
  '/',
  '/about',
  '/counsellors/claim',
  '/sobriety-counter',
  '/sober-stories',
  '/sober-stories/share',
  '/am-i-an-alcoholic',
  '/alcohol-units-calculator',
  '/withdrawal-timeline',
  '/signs-of-alcoholism',
  '/signs-of-drug-addiction',
  '/how-to-stop-drinking',
  '/privacy-policy',
  '/terms',
  '/editorial-policy',
  '/community',
  '/community/submit',
  '/community/support',  // [category] catch-all
  '/admin/link-health',
  '/help/salisbury',
  '/help/london',
  '/help/manchester',
]

const LOCATION_ROUTES = [
  'salisbury', 'london', 'manchester', 'birmingham', 'bristol',
  'leeds', 'liverpool', 'sheffield', 'nottingham', 'coventry',
  'leicester', 'bradford', 'edinburgh', 'glasgow', 'cardiff',
  'newcastle-upon-tyne', 'brighton', 'exeter', 'oxford', 'cambridge',
]

const DYNAMIC_ROUTES = [
  ...LOCATION_ROUTES.map(l => `/rehab/${l}`),
  ...LOCATION_ROUTES.map(l => `/counsellors/${l}`),
  ...LOCATION_ROUTES.map(l => `/centres/${l}`),
  ...LOCATION_ROUTES.map(l => `/help/${l}`),
  ...LOCATION_ROUTES.map(l => `/how-to-help/${l}`),
  ...LOCATION_ROUTES.map(l => `/alcohol-rehab/${l}`),
  ...LOCATION_ROUTES.map(l => `/drug-rehab/${l}`),
  ...LOCATION_ROUTES.map(l => `/nhs-rehab/${l}`),
  ...LOCATION_ROUTES.map(l => `/detox-centres/${l}`),
  ...LOCATION_ROUTES.map(l => `/aa-meetings/${l}`),
  ...LOCATION_ROUTES.map(l => `/na-meetings/${l}`),
  ...LOCATION_ROUTES.map(l => `/cocaine-addiction/${l}`),
  ...LOCATION_ROUTES.map(l => `/drug-treatment/${l}`),
]

// Sample centre slugs from the data
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
const __dirname = dirname(fileURLToPath(import.meta.url))
const rehabData = JSON.parse(readFileSync(join(__dirname, '../data/rehabs.json'), 'utf-8'))

function toCentreSlug(name, townSlug) {
  return name.toLowerCase().replace(/['']/g,'').replace(/[^a-z0-9\s]/g,'').replace(/\s+/g,'-').replace(/-+/g,'-').trim() + '-' + townSlug
}

const CENTRE_SAMPLES = []
for (const [townSlug, townData] of Object.entries(rehabData.byTown).slice(0, 10)) {
  for (const centre of townData.centres.slice(0, 2)) {
    CENTRE_SAMPLES.push(`/centre/${toCentreSlug(centre.name, townSlug)}`)
  }
}

const ALL_URLS = [...STATIC_ROUTES, ...DYNAMIC_ROUTES, ...CENTRE_SAMPLES]

// ── Run checks ────────────────────────────────────────────────────────────────
console.log(`Checking ${ALL_URLS.length} URLs against ${BASE}...\n`)

const BATCH = 10
const results = []
for (let i = 0; i < ALL_URLS.length; i += BATCH) {
  const batch = ALL_URLS.slice(i, i + BATCH)
  const batchResults = await Promise.all(batch.map(check))
  results.push(...batchResults)
  process.stdout.write(`\rProgress: ${Math.min(i + BATCH, ALL_URLS.length)}/${ALL_URLS.length}`)
}

console.log('\n')

const broken = results.filter(r => !r.ok)
const working = results.filter(r => r.ok)

console.log(`✓ Working: ${working.length}`)
console.log(`✗ Broken:  ${broken.length}`)

if (broken.length > 0) {
  console.log('\n=== BROKEN LINKS ===')
  for (const b of broken) {
    console.log(`  [${b.status || 'ERR'}] ${b.path}${b.error ? ` — ${b.error}` : ''}`)
  }
}

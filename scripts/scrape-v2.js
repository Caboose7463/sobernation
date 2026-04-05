/**
 * SoberNation Full-Scale Counsellor Scraper v2
 * 
 * - Covers ALL 3,835 UK locations from locations.json
 * - Paginates through ALL results per city (up to 10 pages max)
 * - Saves profile_slug for every counsellor
 * - Checkpoint/resume: skips cities already completed
 * - Estimated runtime: 6–10 hours (run overnight)
 * 
 * Run:   node scripts/scrape-v2.js
 * Resume: node scripts/scrape-v2.js  (auto-resumes from checkpoint)
 * Fresh:  node scripts/scrape-v2.js --fresh
 */

const puppeteer = require('puppeteer')
const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')
require('dotenv').config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const CHECKPOINT_FILE = path.join(__dirname, 'scrape-progress.json')
const MAX_PAGES_PER_CITY = 10
const PAGE_DELAY_MS = 2200
const CITY_DELAY_MS = 1500
const FRESH = process.argv.includes('--fresh')

// ── Load all locations ──────────────────────────────────────────────────────

const _locData = require('../data/locations.json')
const ALL_CITIES = _locData.locations.map(l => ({
  slug: l.slug,
  name: l.name,
  search: l.name,
}))

// ── Helpers ─────────────────────────────────────────────────────────────────

function sleep(ms) { return new Promise(r => setTimeout(r, ms)) }

function toProfileSlug(name, locationSlug) {
  return name
    .toLowerCase()
    .replace(/['']/g, '')
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim() + '-' + locationSlug
}

function parseSpecialisms(text) {
  const lower = (text || '').toLowerCase()
  const found = []
  const map = {
    'alcohol': 'alcohol', 'substance': 'substances', 'drug': 'drugs',
    'gambling': 'gambling', 'eating disorder': 'eating-disorders',
    'trauma': 'trauma', 'dual diagnosis': 'dual-diagnosis',
    'depression': 'depression', 'anxiety': 'anxiety',
    'addiction': 'addiction',
  }
  for (const [kw, tag] of Object.entries(map)) {
    if (lower.includes(kw) && !found.includes(tag)) found.push(tag)
  }
  return found.length ? found : ['addiction']
}

function buildSearchUrl(citySearch, pageNum = 1) {
  const params = new URLSearchParams()
  params.set('search-meta[initialiser]', 'search.advanced.standard')
  params.set('search', citySearch)
  params.append('services[]', '2') // Addiction specialism
  params.set('typeOfClient', '')
  params.set('keywords', '')
  if (pageNum > 1) params.set('page', String(pageNum))
  return `https://www.counselling-directory.org.uk/search.php?${params}`
}

// ── Checkpoint ───────────────────────────────────────────────────────────────

function loadCheckpoint() {
  if (FRESH) {
    console.log('🔄 Fresh run — ignoring existing checkpoint\n')
    return { done: new Set(), total: 0, startedAt: new Date().toISOString() }
  }
  try {
    if (fs.existsSync(CHECKPOINT_FILE)) {
      const data = JSON.parse(fs.readFileSync(CHECKPOINT_FILE, 'utf8'))
      console.log(`♻️  Resuming from checkpoint: ${data.done.length} cities already done\n`)
      return { done: new Set(data.done), total: data.total || 0, startedAt: data.startedAt }
    }
  } catch { /* ignore */ }
  return { done: new Set(), total: 0, startedAt: new Date().toISOString() }
}

function saveCheckpoint(done, total, startedAt) {
  fs.writeFileSync(CHECKPOINT_FILE, JSON.stringify({
    done: [...done],
    total,
    startedAt,
    updatedAt: new Date().toISOString(),
  }, null, 2))
}

// ── Extraction ───────────────────────────────────────────────────────────────

async function extractCounsellors(page) {
  return page.evaluate(() => {
    const results = []
    const seen = new Set()

    const cards = document.querySelectorAll(
      'article, [class*="search-result"], [class*="therapist"], [class*="profile-card"]'
    )

    // Try card-based extraction first
    for (const card of cards) {
      const nameEl = card.querySelector('h2, h3, [class*="name"]')
      if (!nameEl) continue
      const name = nameEl.textContent?.trim()
      if (!name || name.length < 3 || seen.has(name.toLowerCase())) continue

      const credential = card.querySelector('[class*="credential"], [class*="title"], [class*="qualification"]')?.textContent?.trim() || ''
      const aboutText = card.querySelector('p, [class*="about"]')?.textContent?.trim() || ''
      const imgEl = card.querySelector('img[src*="counselling-directory"], img[src*="profile"], img[src*="therapist"]')
      const photoUrl = imgEl?.src || imgEl?.dataset?.src || null

      seen.add(name.toLowerCase())
      results.push({ name, credential, aboutText, photoUrl })
    }

    // Fallback: h2 scan
    if (results.length === 0) {
      const allH2 = Array.from(document.querySelectorAll('h2'))
      for (const h2 of allH2) {
        const name = h2.textContent?.trim()
        if (!name || name.length < 3 || name.length > 80 || seen.has(name.toLowerCase())) continue
        if (/find|search|results|therapist|counsellor|addiction/i.test(name)) continue

        const parent = h2.closest('article, li, div[class*="result"]') || h2.parentElement
        const credential = parent?.querySelector('[class*="credential"], abbr, [class*="qual"]')?.textContent?.trim() || ''
        const aboutText = parent?.querySelector('p')?.textContent?.trim() || ''
        const imgEl = parent?.querySelector('img')
        const photoUrl = imgEl?.src || null

        seen.add(name.toLowerCase())
        results.push({ name, credential, aboutText, photoUrl })
      }
    }

    return results
  })
}

// ── Scrape one city ──────────────────────────────────────────────────────────

async function scrapeCity(page, city) {
  const results = []
  const seen = new Set()

  for (let pageNum = 1; pageNum <= MAX_PAGES_PER_CITY; pageNum++) {
    const url = buildSearchUrl(city.search, pageNum)

    try {
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 25000 })
      await sleep(PAGE_DELAY_MS)
    } catch {
      break // Timeout — move on
    }

    // Detect redirects (no results → redirected away)
    const currentUrl = page.url()
    if (
      currentUrl.includes('adv-search') ||
      currentUrl === 'https://www.counselling-directory.org.uk/' ||
      currentUrl.includes('/not-found')
    ) break

    const batch = await extractCounsellors(page)
    let newCount = 0

    for (const c of batch) {
      const key = c.name.toLowerCase()
      if (!seen.has(key)) {
        seen.add(key)
        results.push(c)
        newCount++
      }
    }

    // No new results on this page → stop paginating
    if (newCount === 0) break

    await sleep(800)
  }

  return results
}

// ── Save to Supabase ─────────────────────────────────────────────────────────

async function saveToSupabase(city, counsellors) {
  const rows = counsellors.map(c => ({
    name: c.name,
    title: c.credential?.slice(0, 120) || 'Registered Counsellor',
    location_slug: city.slug,
    location_name: city.name,
    profile_slug: toProfileSlug(c.name, city.slug),
    postcode: null,
    specialisms: parseSpecialisms(c.aboutText),
    phone: null,
    email: null,
    website: null,
    photo_url: c.photoUrl || null,
    bacp_number: null,
    verified: false,
    source: 'counselling_directory_scrape',
    listing_type: 'counsellor',
  }))

  // Delete existing scraped records for this city, then insert fresh
  await supabase
    .from('counsellors')
    .delete()
    .eq('location_slug', city.slug)
    .eq('source', 'counselling_directory_scrape')

  const { error } = await supabase.from('counsellors').insert(rows)
  if (error) throw new Error(error.message)
  return rows.length
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const { done, total: savedTotal, startedAt } = loadCheckpoint()

  const remaining = ALL_CITIES.filter(c => !done.has(c.slug))
  const totalCities = ALL_CITIES.length

  console.log(`SoberNation Full Scraper v2`)
  console.log(`${'='.repeat(50)}`)
  console.log(`Total locations: ${totalCities}`)
  console.log(`Already done:    ${done.size}`)
  console.log(`Remaining:       ${remaining.length}`)
  console.log(`Max pages/city:  ${MAX_PAGES_PER_CITY}`)
  console.log(`Estimated time:  ${Math.round(remaining.length * 3 * PAGE_DELAY_MS / 60000)} minutes`)
  console.log(`${'='.repeat(50)}\n`)

  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-blink-features=AutomationControlled',
      '--disable-web-security',
    ],
  })

  const page = await browser.newPage()

  await page.evaluateOnNewDocument(() => {
    Object.defineProperty(navigator, 'webdriver', { get: () => undefined })
    Object.defineProperty(navigator, 'languages', { get: () => ['en-GB', 'en'] })
    Object.defineProperty(navigator, 'platform', { get: () => 'Win32' })
  })

  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
  )
  await page.setViewport({ width: 1280, height: 900 })

  // Get session cookies
  console.log('Getting session cookies...')
  await page.goto('https://www.counselling-directory.org.uk/', {
    waitUntil: 'domcontentloaded',
    timeout: 20000,
  })
  await sleep(1500)
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'))
    const agree = btns.find(b => /agree|accept/i.test(b.textContent || ''))
    if (agree) agree.click()
  }).catch(() => {})
  await sleep(1000)
  console.log('Ready.\n')

  let grandTotal = savedTotal
  let citiesThisRun = 0

  for (const city of remaining) {
    const progress = `[${done.size + 1}/${totalCities}]`
    process.stdout.write(`${progress} 📍 ${city.name.padEnd(25)}`)

    try {
      const counsellors = await scrapeCity(page, city)

      if (counsellors.length > 0) {
        const saved = await saveToSupabase(city, counsellors)
        grandTotal += saved
        process.stdout.write(`→ ${saved} saved ✅\n`)
      } else {
        process.stdout.write(`→ 0 found\n`)
      }

      done.add(city.slug)
      citiesThisRun++

      // Save checkpoint every 10 cities
      if (citiesThisRun % 10 === 0) {
        saveCheckpoint(done, grandTotal, startedAt)
        console.log(`  💾 Checkpoint saved (${done.size} cities done, ${grandTotal} total)\n`)
      }

      await sleep(CITY_DELAY_MS)
    } catch (err) {
      process.stdout.write(`→ ❌ ${err.message.slice(0, 60)}\n`)
      // Don't mark as done — will retry on next run
      await sleep(3000)
    }
  }

  await browser.close()

  // Final checkpoint
  saveCheckpoint(done, grandTotal, startedAt)

  console.log(`\n${'='.repeat(50)}`)
  console.log(`✅ Scrape complete!`)
  console.log(`   Cities done: ${done.size} / ${totalCities}`)
  console.log(`   Total counsellors seeded: ${grandTotal}`)
  console.log(`   Started: ${startedAt}`)
  console.log(`   Finished: ${new Date().toISOString()}`)
  console.log(`${'='.repeat(50)}`)
}

main().catch(err => {
  console.error('\n💥 Fatal error:', err.message)
  process.exit(1)
})

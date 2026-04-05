/**
 * Final SoberNation Counsellor Scraper
 * - Loads homepage to get session cookies
 * - Navigates directly to search.php for each city (no form needed)
 * - Extracts name + profile photo URL
 * - Seeds into Supabase
 * 
 * Run: node scripts/scrape-final.js
 */
const puppeteer = require('puppeteer')
const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

// Top 150 UK cities by population from locations.json
const _locData = require('../data/locations.json')
const CITIES = [..._locData.locations]
  .sort((a, b) => b.population - a.population)
  .slice(0, 150)
  .map(l => ({ slug: l.slug, name: l.name, search: l.name }))

function sleep(ms) { return new Promise(r => setTimeout(r, ms)) }

function parseSpecialisms(text) {
  const lower = (text || '').toLowerCase()
  const found = []
  const map = {
    'alcohol': 'alcohol', 'substance': 'substances', 'drug': 'drugs',
    'gambling': 'gambling', 'addiction': 'addiction',
    'eating disorder': 'eating-disorders', 'trauma': 'trauma',
    'dual diagnosis': 'dual-diagnosis', 'depression': 'depression', 'anxiety': 'anxiety',
  }
  for (const [kw, tag] of Object.entries(map)) {
    if (lower.includes(kw) && !found.includes(tag)) found.push(tag)
  }
  return found.length ? found : ['addiction']
}

function buildSearchUrl(citySearch, page = 1) {
  const params = new URLSearchParams()
  params.set('search-meta[initialiser]', 'search.advanced.standard')
  params.set('search', citySearch)
  params.append('services[]', '2')  // Addiction
  params.set('typeOfClient', '')
  params.set('keywords', '')
  if (page > 1) params.set('page', String(page))
  return `https://www.counselling-directory.org.uk/search.php?${params}`
}

async function extractCounsellors(page) {
  return page.evaluate(() => {
    const results = []
    const seen = new Set()

    const allH2 = Array.from(document.querySelectorAll('h2'))
    for (const h2 of allH2) {
      const name = h2.textContent?.replace(/[✓☑]/g, '').trim()
      if (!name || name.length < 3 || name.length > 80) continue
      if (seen.has(name.toLowerCase())) continue
      if (/counsellors|therapists|result|search|narrow|please|home|page/i.test(name)) continue

      let card = h2
      for (let i = 0; i < 4; i++) {
        if (card.parentElement) card = card.parentElement
        if (card.querySelectorAll('img').length > 0) break
      }

      const imgEl = card.querySelector('img')
      const photoUrl = imgEl?.src?.startsWith('http') ? imgEl.src : null

      let credText = ''
      const credEl = h2.nextElementSibling
      if (credEl && credEl.tagName !== 'P' && credEl.textContent?.trim().length < 80) {
        credText = credEl.textContent.trim()
      }

      const aboutEl = card.querySelector('p')
      const aboutText = aboutEl?.textContent?.trim()?.slice(0, 300) || ''

      seen.add(name.toLowerCase())
      results.push({ name, photoUrl, aboutText, credential: credText })
    }

    return results.slice(0, 25)
  })
}

async function scrapeCity(page, city) {
  const results = []
  const seen = new Set()

  for (let pageNum = 1; pageNum <= 2; pageNum++) {
    const url = buildSearchUrl(city.search, pageNum)
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 })
    await sleep(2000)

    const currentUrl = page.url()
    if (currentUrl.includes('adv-search') || currentUrl === 'https://www.counselling-directory.org.uk/') {
      break
    }

    const batch = await extractCounsellors(page)
    let newCount = 0
    for (const c of batch) {
      if (!seen.has(c.name.toLowerCase())) {
        seen.add(c.name.toLowerCase())
        results.push(c)
        newCount++
      }
    }

    if (newCount === 0) break
    await sleep(1000)
  }

  return results
}

async function main() {
  console.log(`SoberNation Counsellor Scraper — ${CITIES.length} cities`)
  console.log('='.repeat(50) + '\n')

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-blink-features=AutomationControlled'],
  })

  const page = await browser.newPage()
  await page.evaluateOnNewDocument(() => {
    Object.defineProperty(navigator, 'webdriver', { get: () => undefined })
    Object.defineProperty(navigator, 'languages', { get: () => ['en-GB', 'en'] })
  })
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36')
  await page.setViewport({ width: 1280, height: 900 })

  // Get session cookies
  console.log('Getting session cookies...')
  await page.goto('https://www.counselling-directory.org.uk/', { waitUntil: 'domcontentloaded', timeout: 20000 })
  await sleep(1500)
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'))
    const agree = btns.find(b => /agree|accept/i.test(b.textContent))
    if (agree) agree.click()
  }).catch(() => {})
  await sleep(800)
  console.log('Ready.\n')

  let total = 0

  for (const city of CITIES) {
    console.log(`📍 ${city.name}`)
    try {
      const counsellors = await scrapeCity(page, city)
      process.stdout.write(`   Found: ${counsellors.length}`)

      if (counsellors.length > 0) {
        const rows = counsellors.map(c => ({
          name: c.name,
          title: c.credential || 'Registered Counsellor',
          location_slug: city.slug,
          location_name: city.name,
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

        await supabase.from('counsellors').delete().eq('location_slug', city.slug).eq('source', 'counselling_directory_scrape')
        const { error } = await supabase.from('counsellors').insert(rows)

        if (error) console.log(`  ❌ ${error.message}`)
        else { console.log(`  ✅`); total += rows.length }
      } else {
        console.log()
      }

      await sleep(2000)
    } catch (err) {
      console.log(`  ❌ ${err.message.slice(0, 80)}`)
    }
  }

  await browser.close()
  console.log(`\n${'='.repeat(50)}`)
  console.log(`✅ Total seeded: ${total} counsellors across ${CITIES.length} cities`)
}

main().catch(console.error)

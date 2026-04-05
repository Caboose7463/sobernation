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

const CITIES = [
  { slug: 'london',              name: 'London',         search: 'London' },
  { slug: 'manchester',          name: 'Manchester',     search: 'Manchester' },
  { slug: 'birmingham',          name: 'Birmingham',     search: 'Birmingham' },
  { slug: 'leeds',               name: 'Leeds',          search: 'Leeds' },
  { slug: 'sheffield',           name: 'Sheffield',      search: 'Sheffield' },
  { slug: 'liverpool',           name: 'Liverpool',      search: 'Liverpool' },
  { slug: 'bristol',             name: 'Bristol',        search: 'Bristol' },
  { slug: 'edinburgh',           name: 'Edinburgh',      search: 'Edinburgh' },
  { slug: 'cardiff',             name: 'Cardiff',        search: 'Cardiff' },
  { slug: 'leicester',           name: 'Leicester',      search: 'Leicester' },
  { slug: 'nottingham',          name: 'Nottingham',     search: 'Nottingham' },
  { slug: 'coventry',            name: 'Coventry',       search: 'Coventry' },
  { slug: 'bradford',            name: 'Bradford',       search: 'Bradford' },
  { slug: 'southampton',         name: 'Southampton',    search: 'Southampton' },
  { slug: 'reading',             name: 'Reading',        search: 'Reading' },
  { slug: 'newcastle-upon-tyne', name: 'Newcastle',      search: 'Newcastle upon Tyne' },
  { slug: 'brighton',            name: 'Brighton',       search: 'Brighton' },
  { slug: 'oxford',              name: 'Oxford',         search: 'Oxford' },
  { slug: 'cambridge',           name: 'Cambridge',      search: 'Cambridge' },
  { slug: 'york',                name: 'York',           search: 'York' },
  { slug: 'bath',                name: 'Bath',           search: 'Bath' },
  { slug: 'exeter',              name: 'Exeter',         search: 'Exeter' },
  { slug: 'bournemouth',         name: 'Bournemouth',    search: 'Bournemouth' },
  { slug: 'norwich',             name: 'Norwich',        search: 'Norwich' },
  { slug: 'northampton',         name: 'Northampton',    search: 'Northampton' },
  { slug: 'derby',               name: 'Derby',          search: 'Derby' },
  { slug: 'wolverhampton',       name: 'Wolverhampton',  search: 'Wolverhampton' },
  { slug: 'glasgow',             name: 'Glasgow',        search: 'Glasgow' },
  { slug: 'swansea',             name: 'Swansea',        search: 'Swansea' },
  { slug: 'blackpool',           name: 'Blackpool',      search: 'Blackpool' },
  { slug: 'stoke-on-trent',      name: 'Stoke-on-Trent', search: 'Stoke-on-Trent' },
  { slug: 'hull',                name: 'Hull',           search: 'Hull' },
  { slug: 'plymouth',            name: 'Plymouth',       search: 'Plymouth' },
  { slug: 'middlesbrough',       name: 'Middlesbrough',  search: 'Middlesbrough' },
  { slug: 'sunderland',          name: 'Sunderland',     search: 'Sunderland' },
]

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

    // From screenshot: each counsellor is in a div containing:
    // - circular img (profile photo)
    // - h2 with name
    // - subtitle text (credential like "PhD" or "MBACP Registered")
    // - p with bio text
    // Cards appear to be direct children of a results container

    // Strategy 1: find all h2 elements that look like person names
    // then walk up to the card container to get photo + credential
    const allH2 = Array.from(document.querySelectorAll('h2'))
    for (const h2 of allH2) {
      const name = h2.textContent?.replace(/[✓☑]/g, '').trim()
      if (!name || name.length < 3 || name.length > 80) continue
      if (seen.has(name.toLowerCase())) continue
      // Skip non-person headings
      if (/counsellors|therapists|result|search|narrow|please|home|page/i.test(name)) continue

      // Walk up to containing card (up to 4 levels)
      let card = h2
      for (let i = 0; i < 4; i++) {
        if (card.parentElement) card = card.parentElement
        const imgs = card.querySelectorAll('img')
        if (imgs.length > 0) break
      }

      // Get photo — prefer circular/profile photos
      const imgEl = card.querySelector('img')
      const photoUrl = imgEl?.src?.startsWith('http') ? imgEl.src : null

      // Get credential (element after h2 usually)
      let credText = ''
      const credEl = h2.nextElementSibling
      if (credEl && credEl.tagName !== 'P' && credEl.textContent?.trim().length < 80) {
        credText = credEl.textContent.trim()
      }

      // Get about text
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
    // Detect redirect back to homepage/search form
    if (currentUrl.includes('adv-search') || currentUrl === 'https://www.counselling-directory.org.uk/') {
      console.log(`  Redirected to ${currentUrl} — stopping`)
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
  console.log('SoberNation Counsellor Scraper')
  console.log('==============================\n')

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

  // Get session cookies from homepage
  console.log('Getting session cookies...')
  await page.goto('https://www.counselling-directory.org.uk/', { waitUntil: 'domcontentloaded', timeout: 20000 })
  await sleep(1500)
  // Accept cookies
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'))
    const agree = btns.find(b => /agree|accept/i.test(b.textContent))
    if (agree) agree.click()
  }).catch(() => {})
  await sleep(800)
  console.log('Cookies obtained.')

  // Test London
  console.log('\n📍 London (test)')
  const test = await scrapeCity(page, CITIES[0])
  console.log(`  Found: ${test.length}`)
  if (test.length > 0) {
    console.log('  Sample:', test.slice(0, 3).map(c => `${c.name}${c.photoUrl ? ' [photo]' : ''}`).join(', '))
  } else {
    // Debug: save screenshot and page text
    await page.screenshot({ path: 'scripts/debug.png' })
    const text = await page.evaluate(() => document.body.innerText.slice(0, 2000))
    console.log('\nPage text:\n', text)
    console.log('\nCheck scripts/debug.png')
    await browser.close()
    return
  }

  // Full scrape
  let total = 0
  for (const city of CITIES) {
    console.log(`\n📍 ${city.name}`)
    try {
      const counsellors = await scrapeCity(page, city)
      console.log(`  Found: ${counsellors.length}`)

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

        const { error } = await supabase
          .from('counsellors')
          .upsert(rows, { onConflict: 'name,location_slug', ignoreDuplicates: true })

        if (error) console.error(`  Supabase:`, error.message)
        else { console.log(`  ✅ Inserted ${rows.length}`); total += rows.length }
      }

      await sleep(2500)
    } catch (err) {
      console.error(`  Error:`, err.message.slice(0, 100))
    }
  }

  await browser.close()
  console.log(`\n✅ Total seeded: ${total}`)
}

main().catch(console.error)

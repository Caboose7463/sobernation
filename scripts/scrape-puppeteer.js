/**
 * Full Counselling Directory Scraper
 * - Types location → picks first autocomplete suggestion
 * - Types "Addiction" in the concern field → picks suggestion
 * - Clicks search → scrapes results page
 * - Captures API endpoint if available
 */
const puppeteer = require('puppeteer')
const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

function sleep(ms) { return new Promise(r => setTimeout(r, ms)) }

function parseSpecialisms(text) {
  const lower = (text || '').toLowerCase()
  const found = []
  const map = {
    'alcohol': 'alcohol', 'substance': 'substances', 'drug': 'drugs',
    'gambling': 'gambling', 'addiction': 'addiction',
    'eating disorder': 'eating-disorders', 'trauma': 'trauma',
  }
  for (const [kw, tag] of Object.entries(map)) {
    if (lower.includes(kw) && !found.includes(tag)) found.push(tag)
  }
  return found.length ? found : ['addiction']
}

const CITIES = [
  { slug: 'london',              name: 'London',       search: 'London' },
  { slug: 'manchester',          name: 'Manchester',   search: 'Manchester' },
  { slug: 'birmingham',          name: 'Birmingham',   search: 'Birmingham' },
  { slug: 'leeds',               name: 'Leeds',        search: 'Leeds' },
  { slug: 'sheffield',           name: 'Sheffield',    search: 'Sheffield' },
  { slug: 'liverpool',           name: 'Liverpool',    search: 'Liverpool' },
  { slug: 'bristol',             name: 'Bristol',      search: 'Bristol' },
  { slug: 'edinburgh',           name: 'Edinburgh',    search: 'Edinburgh' },
  { slug: 'cardiff',             name: 'Cardiff',      search: 'Cardiff' },
  { slug: 'leicester',           name: 'Leicester',    search: 'Leicester' },
  { slug: 'nottingham',          name: 'Nottingham',   search: 'Nottingham' },
  { slug: 'coventry',            name: 'Coventry',     search: 'Coventry' },
  { slug: 'bradford',            name: 'Bradford',     search: 'Bradford' },
  { slug: 'southampton',         name: 'Southampton',  search: 'Southampton' },
  { slug: 'reading',             name: 'Reading',      search: 'Reading' },
  { slug: 'newcastle-upon-tyne', name: 'Newcastle',    search: 'Newcastle upon Tyne' },
  { slug: 'brighton',            name: 'Brighton',     search: 'Brighton' },
  { slug: 'oxford',              name: 'Oxford',       search: 'Oxford' },
  { slug: 'cambridge',           name: 'Cambridge',    search: 'Cambridge' },
  { slug: 'york',                name: 'York',         search: 'York' },
  { slug: 'bath',                name: 'Bath',         search: 'Bath' },
  { slug: 'exeter',              name: 'Exeter',       search: 'Exeter' },
  { slug: 'bournemouth',         name: 'Bournemouth',  search: 'Bournemouth' },
  { slug: 'norwich',             name: 'Norwich',      search: 'Norwich' },
  { slug: 'northampton',         name: 'Northampton',  search: 'Northampton' },
  { slug: 'derby',               name: 'Derby',        search: 'Derby' },
  { slug: 'wolverhampton',       name: 'Wolverhampton',search: 'Wolverhampton' },
  { slug: 'glasgow',             name: 'Glasgow',      search: 'Glasgow' },
  { slug: 'swansea',             name: 'Swansea',      search: 'Swansea' },
  { slug: 'blackpool',           name: 'Blackpool',    search: 'Blackpool' },
]

async function searchAndExtract(page, city) {
  await page.goto('https://www.counselling-directory.org.uk/adv-search.html', {
    waitUntil: 'domcontentloaded', timeout: 20000
  })
  await sleep(2000)

  // Dismiss cookies if present
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'))
    const agree = btns.find(b => /agree|accept/i.test(b.textContent))
    if (agree) agree.click()
  }).catch(() => {})

  // === STEP 1: Fill location ===
  // The location field input contains "Enter your location" placeholder
  // We click it by evaluating to find the right input
  await page.evaluate(() => {
    const inputs = Array.from(document.querySelectorAll('input'))
    const locationInput = inputs.find(i =>
      i.placeholder?.toLowerCase().includes('location') ||
      i.id?.toLowerCase().includes('location') ||
      i.name?.toLowerCase().includes('location')
    )
    if (locationInput) locationInput.focus()
  })
  await sleep(300)
  await page.keyboard.type(city.search, { delay: 80 })
  await sleep(2000) // Wait for autocomplete

  // Click first autocomplete suggestion
  const clicked = await page.evaluate(() => {
    // Look for dropdown suggestions
    const selectors = [
      '[class*="suggestion"]', '[role="option"]', '[class*="autocomplete"] li',
      '[class*="dropdown"] li', '[class*="Suggestion"]', 'ul[class*="list"] li',
      'ul li[data-value]',
    ]
    for (const sel of selectors) {
      const items = document.querySelectorAll(sel)
      if (items.length > 0) {
        items[0].click()
        return { found: true, selector: sel, text: items[0].textContent.trim() }
      }
    }
    return { found: false }
  })
  console.log(`  Location autocomplete: ${JSON.stringify(clicked)}`)
  await sleep(500)

  // === STEP 2: Fill "What's worrying you?" ===
  await page.evaluate(() => {
    const inputs = Array.from(document.querySelectorAll('input'))
    const concernInput = inputs.find(i =>
      i.placeholder?.toLowerCase().includes('start typing') ||
      i.placeholder?.toLowerCase().includes('concern') ||
      i.id?.toLowerCase().includes('concern') ||
      i.id?.toLowerCase().includes('issue') ||
      i.name?.toLowerCase().includes('concern')
    )
    if (concernInput) concernInput.focus()
  })
  await sleep(300)
  await page.keyboard.type('Addiction', { delay: 80 })
  await sleep(2000)

  // Click first concern suggestion
  const concernClicked = await page.evaluate(() => {
    const selectors = ['[role="option"]', '[class*="suggestion"]', '[class*="option"]', 'ul li']
    for (const sel of selectors) {
      const items = Array.from(document.querySelectorAll(sel))
        .filter(el => el.textContent.toLowerCase().includes('addiction'))
      if (items.length > 0) { items[0].click(); return items[0].textContent.trim() }
    }
    // Click any first suggestion
    for (const sel of selectors) {
      const items = document.querySelectorAll(sel)
      if (items.length > 0) { items[0].click(); return items[0].textContent.trim() }
    }
    return null
  })
  console.log(`  Concern: ${concernClicked}`)
  await sleep(500)

  // === STEP 3: Submit the form ===
  const submitted = await page.evaluate(() => {
    // Find submit/search button
    const btns = Array.from(document.querySelectorAll('button'))
    const submit = btns.find(b =>
      b.type === 'submit' ||
      /^(search|find|go)$/i.test(b.textContent.trim())
    )
    if (submit) { submit.click(); return submit.textContent.trim() }

    // Try form submit
    const forms = document.querySelectorAll('form')
    if (forms.length > 0) { forms[0].submit(); return 'form.submit()' }
    return null
  })
  console.log(`  Submitted via: ${submitted}`)

  // Wait for navigation
  await page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 15000 }).catch(() => {})
  await sleep(3000)

  // Also wait for any lazy loading
  await page.waitForFunction(() => document.querySelectorAll('a[href]').length > 20, { timeout: 10000 }).catch(() => {})

  const resultsUrl = page.url()
  console.log(`  Results URL: ${resultsUrl.slice(0, 90)}`)

  // === STEP 4: Extract counsellors ===
  const counsellors = await page.evaluate(() => {
    const results = []
    const seen = new Set()

    // Strategy 1: Find links to counsellor profiles
    const profilePatterns = ['/profile/', '/counsellor/', '/therapist/', '/member/']
    const links = Array.from(document.querySelectorAll('a[href]'))
    const profileLinks = links.filter(a =>
      profilePatterns.some(p => a.href.includes(p)) &&
      a.textContent.trim().length > 2
    )

    for (const link of profileLinks.slice(0, 30)) {
      const name = link.textContent.trim()
      if (!name || seen.has(name.toLowerCase()) || name.length > 80) continue
      if (/view profile|read more|contact|click here/i.test(name)) continue

      seen.add(name.toLowerCase())
      const card = link.closest('li, article, section, [class*="card"], [class*="result"], [class*="profile"]')
      const aboutText = card?.innerText?.slice(0, 400) || ''
      const phoneEl = card?.querySelector('[href^="tel:"]')

      results.push({
        name,
        aboutText,
        phone: phoneEl?.href?.replace('tel:', '') || null,
      })
    }

    // Strategy 2: h2/h3 with person-like names in result containers
    if (results.length === 0) {
      const main = document.querySelector('main, [class*="results"], [id*="results"]') || document.body
      const headings = Array.from(main.querySelectorAll('h2, h3'))
        .filter(h => {
          const t = h.textContent.trim()
          return t.length > 5 && t.length < 70 &&
            /^[A-Z]/.test(t) &&
            !['Find', 'Search', 'Results', 'Filter', 'Sort', 'Counsellors near', 'Therapists'].some(w => t.startsWith(w))
        })
      for (const h of headings.slice(0, 25)) {
        const name = h.textContent.trim()
        if (!seen.has(name.toLowerCase())) {
          seen.add(name.toLowerCase())
          results.push({ name, aboutText: '', phone: null })
        }
      }
    }

    return results
  })

  return counsellors
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

  let total = 0

  // Test London first
  console.log('📍 London (test run)')
  try {
    const test = await searchAndExtract(page, CITIES[0])
    console.log(`  Found: ${test.length}`)
    if (test.length > 0) console.log('  Sample:', test.slice(0, 3).map(c => c.name).join(', '))
    else {
      await page.screenshot({ path: 'scripts/final-result.png' })
      console.log('  Screenshot: scripts/final-result.png')
      const bodyText = await page.evaluate(() => document.body.innerText.slice(0, 3000))
      console.log('\n  Page content:\n' + bodyText)
      await browser.close()
      return
    }
  } catch (err) {
    console.error('Test run error:', err.message)
    await page.screenshot({ path: 'scripts/error.png' }).catch(() => {})
    await browser.close()
    return
  }

  // Full run
  for (const city of CITIES) {
    console.log(`\n📍 ${city.name}`)
    try {
      const counsellors = await searchAndExtract(page, city)
      console.log(`  Found: ${counsellors.length}`)

      if (counsellors.length > 0) {
        const rows = counsellors.map(c => ({
          name: c.name,
          title: 'Registered Counsellor',
          location_slug: city.slug,
          location_name: city.name,
          postcode: null,
          specialisms: parseSpecialisms(c.aboutText),
          phone: c.phone || null,
          email: null,
          website: null,
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
      console.error(`  Error:`, err.message.slice(0, 80))
    }
  }

  await browser.close()
  console.log(`\n✅ Total seeded: ${total}`)
}

main().catch(console.error)

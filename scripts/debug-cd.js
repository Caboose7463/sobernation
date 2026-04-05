/**
 * Intercepts Counselling Directory's search API to find the real endpoint.
 * Then uses that API directly to scrape all cities.
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
    'dual diagnosis': 'dual-diagnosis', 'depression': 'depression', 'anxiety': 'anxiety',
  }
  for (const [kw, tag] of Object.entries(map)) {
    if (lower.includes(kw) && !found.includes(tag)) found.push(tag)
  }
  return found.length ? found : ['addiction']
}

const CITIES = [
  { slug: 'london',              name: 'London',          search: 'London, UK' },
  { slug: 'manchester',          name: 'Manchester',      search: 'Manchester, UK' },
  { slug: 'birmingham',          name: 'Birmingham',      search: 'Birmingham, UK' },
  { slug: 'leeds',               name: 'Leeds',           search: 'Leeds, UK' },
  { slug: 'sheffield',           name: 'Sheffield',       search: 'Sheffield, UK' },
  { slug: 'liverpool',           name: 'Liverpool',       search: 'Liverpool, UK' },
  { slug: 'bristol',             name: 'Bristol',         search: 'Bristol, UK' },
  { slug: 'edinburgh',           name: 'Edinburgh',       search: 'Edinburgh, UK' },
  { slug: 'cardiff',             name: 'Cardiff',         search: 'Cardiff, UK' },
  { slug: 'leicester',           name: 'Leicester',       search: 'Leicester, UK' },
  { slug: 'nottingham',          name: 'Nottingham',      search: 'Nottingham, UK' },
  { slug: 'coventry',            name: 'Coventry',        search: 'Coventry, UK' },
  { slug: 'bradford',            name: 'Bradford',        search: 'Bradford, UK' },
  { slug: 'southampton',         name: 'Southampton',     search: 'Southampton, UK' },
  { slug: 'reading',             name: 'Reading',         search: 'Reading, UK' },
  { slug: 'newcastle-upon-tyne', name: 'Newcastle',       search: 'Newcastle upon Tyne, UK' },
  { slug: 'brighton',            name: 'Brighton',        search: 'Brighton, UK' },
  { slug: 'oxford',              name: 'Oxford',          search: 'Oxford, UK' },
  { slug: 'cambridge',           name: 'Cambridge',       search: 'Cambridge, UK' },
  { slug: 'york',                name: 'York',            search: 'York, UK' },
  { slug: 'bath',                name: 'Bath',            search: 'Bath, UK' },
  { slug: 'exeter',              name: 'Exeter',          search: 'Exeter, UK' },
  { slug: 'bournemouth',         name: 'Bournemouth',     search: 'Bournemouth, UK' },
  { slug: 'norwich',             name: 'Norwich',         search: 'Norwich, UK' },
  { slug: 'northampton',         name: 'Northampton',     search: 'Northampton, UK' },
  { slug: 'derby',               name: 'Derby',           search: 'Derby, UK' },
  { slug: 'wolverhampton',       name: 'Wolverhampton',   search: 'Wolverhampton, UK' },
  { slug: 'glasgow',             name: 'Glasgow',         search: 'Glasgow, UK' },
  { slug: 'swansea',             name: 'Swansea',         search: 'Swansea, UK' },
]

async function main() {
  console.log('Discovering Counselling Directory API...')

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  const page = await browser.newPage()
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36')
  await page.setViewport({ width: 1280, height: 900 })

  // Collect all API calls the page makes
  const apiCalls = []
  let capturedData = null
  let capturedUrl = null

  await page.on('response', async (response) => {
    const url = response.url()
    const type = response.headers()['content-type'] || ''

    // Capture any JSON responses that look like search results
    if (type.includes('json') && (
      url.includes('search') || url.includes('therapist') ||
      url.includes('counsellor') || url.includes('api') ||
      url.includes('filter') || url.includes('members')
    )) {
      try {
        const text = await response.text()
        if (text.length > 100 && text.length < 500000) {
          apiCalls.push({ url, size: text.length, preview: text.slice(0, 200) })
          if (text.includes('name') && text.includes('location') && text.length > 1000) {
            capturedData = text
            capturedUrl = url
          }
        }
      } catch { /* ignore */ }
    }
  })

  // Navigate to the search page
  await page.goto('https://www.counselling-directory.org.uk/adv-search.html', {
    waitUntil: 'networkidle2', timeout: 30000
  })
  await sleep(3000)

  // Dismiss cookies
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'))
    const agree = btns.find(b => /agree|accept/i.test(b.textContent))
    if (agree) agree.click()
  }).catch(() => {})
  await sleep(500)

  // Try to type in location and trigger API call via keyboard
  const allInputs = await page.$$('input')
  console.log(`Found ${allInputs.length} input fields`)

  for (let i = 0; i < allInputs.length; i++) {
    const placeholder = await allInputs[i].evaluate(el => el.placeholder || el.name || el.id)
    console.log(`  Input ${i}: "${placeholder}"`)
  }

  // Click the location input and type
  try {
    // Focus the location field
    await page.click('input[placeholder*="location"], input[placeholder*="Location"], input[id*="location"], input[id*="Location"]')
    await sleep(300)
    await page.keyboard.type('London', { delay: 100 })
    await sleep(3000) // Wait for autocomplete API call
  } catch (err) {
    console.log('Click error:', err.message.slice(0, 60))
    // Try typing directly
    await page.keyboard.type('London', { delay: 100 })
    await sleep(2000)
  }

  // Check what API calls were made
  console.log(`\nAPI calls captured: ${apiCalls.length}`)
  apiCalls.forEach(c => {
    console.log(`  [${c.size} bytes] ${c.url.slice(0, 100)}`)
    console.log(`    Preview: ${c.preview.slice(0, 100)}`)
  })

  if (capturedUrl) {
    console.log('\n✅ Found search API:', capturedUrl)
    console.log('Data preview:', capturedData?.slice(0, 500))

    // Save for reference
    require('fs').writeFileSync('scripts/api-data.json', capturedData || '{}')
    console.log('Saved to scripts/api-data.json')
  } else {
    console.log('\nNo JSON search API found. Saving screenshot...')
    await page.screenshot({ path: 'scripts/api-debug.png' })

    // Print all network requests
    console.log('\nAll API-like requests:')
    apiCalls.slice(0, 10).forEach(c => console.log('  ', c.url))
  }

  await browser.close()
}

main().catch(console.error)

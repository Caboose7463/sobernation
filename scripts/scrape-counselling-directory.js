/**
 * Counselling Directory Scraper using discovered search URL
 * Uses search.php which is server-rendered PHP — no Puppeteer needed.
 * services[]=2 = Addiction filter
 */
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

function parseName(raw) {
  return raw.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()
}

async function fetchCityPage(city, page = 1) {
  const params = new URLSearchParams({
    'search-meta[initialiser]': 'search.advanced.standard',
    'search': city.search,
    'services[]': '2',  // Addiction
    'typeOfClient': '',
    'keywords': '',
    'page': String(page),
  })

  const url = `https://www.counselling-directory.org.uk/search.php?${params}`

  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'Accept-Language': 'en-GB,en;q=0.9',
      'Referer': 'https://www.counselling-directory.org.uk/adv-search.html',
      'Cache-Control': 'no-cache',
    },
    signal: AbortSignal.timeout(15000),
  })

  if (!res.ok) {
    console.log(`    HTTP ${res.status}`)
    return []
  }

  const html = await res.text()

  // Check for bot block
  if (html.includes('captcha') || html.includes('Cloudflare') || html.length < 1000) {
    console.log(`    Blocked or empty response (${html.length} bytes)`)
    return []
  }

  // Extract counsellor names — look for profile links
  const results = []
  const seen = new Set()

  // Pattern: <a href="/profile/...">Name</a>  or  <a href="/counsellors/...">Name</a>
  const profileLinkRe = /<a[^>]+href="\/(?:profile|counsellors|therapist)\/[^"]*"[^>]*>([\s\S]*?)<\/a>/gi
  let m
  while ((m = profileLinkRe.exec(html)) !== null) {
    const name = parseName(m[1])
    if (name && name.length > 3 && name.length < 80 && !seen.has(name.toLowerCase())) {
      if (!/view profile|read more|contact|click here|back to|home/i.test(name)) {
        seen.add(name.toLowerCase())
        results.push({ name })
      }
    }
  }

  // Fallback: extract from JSON-LD
  if (results.length === 0) {
    const jsonRe = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi
    let jm
    while ((jm = jsonRe.exec(html)) !== null) {
      try {
        const data = JSON.parse(jm[1])
        const items = Array.isArray(data) ? data : data['@graph'] || [data]
        for (const item of items) {
          const name = item.name
          if (name && name.length > 3 && name.length < 80 && !seen.has(name.toLowerCase())) {
            if (item['@type'] === 'Person' || item['@type'] === 'Physician') {
              seen.add(name.toLowerCase())
              results.push({ name, aboutText: item.description || '' })
            }
          }
        }
      } catch { /* skip */ }
    }
  }

  // Fallback: h2/h3 names near profile context
  if (results.length === 0) {
    const h2Re = /<h[23][^>]*class="[^"]*(?:name|title|heading|profile)[^"]*"[^>]*>([\s\S]*?)<\/h[23]>/gi
    let hm
    while ((hm = h2Re.exec(html)) !== null) {
      const name = parseName(hm[1])
      if (name && name.length > 3 && !seen.has(name.toLowerCase())) {
        seen.add(name.toLowerCase())
        results.push({ name })
      }
    }
  }

  return results
}

async function seedCity(city) {
  console.log(`\n📍 ${city.name}`)
  const allCounsellors = []
  const seen = new Set()

  for (let page = 1; page <= 3; page++) {
    const batch = await fetchCityPage(city, page)
    for (const c of batch) {
      if (!seen.has(c.name.toLowerCase())) {
        seen.add(c.name.toLowerCase())
        allCounsellors.push(c)
      }
    }
    if (batch.length === 0) break
    await sleep(800)
  }

  console.log(`  Found: ${allCounsellors.length}`)
  if (allCounsellors.length === 0) return 0

  const rows = allCounsellors.map(c => ({
    name: c.name,
    title: 'Registered Counsellor',
    location_slug: city.slug,
    location_name: city.name,
    postcode: null,
    specialisms: parseSpecialisms(c.aboutText || ''),
    phone: null,
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

  if (error) { console.error(`  Supabase:`, error.message); return 0 }
  console.log(`  ✅ Inserted ${rows.length}`)
  return rows.length
}

async function main() {
  console.log('SoberNation — Counselling Directory Scraper')
  console.log('============================================')
  console.log('Using search.php (server-rendered, no browser needed)\n')

  // Test London first
  const testResult = await fetchCityPage(CITIES[0], 1)
  if (testResult.length === 0) {
    console.log('❌ Test fetch returned 0 results — checking response...')
    const params = new URLSearchParams({
      'search-meta[initialiser]': 'search.advanced.standard',
      'search': 'London',
      'services[]': '2',
      'typeOfClient': '',
      'keywords': '',
    })
    const url = `https://www.counselling-directory.org.uk/search.php?${params}`
    console.log('Test URL:', url)
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 Chrome/120.0.0.0' }
    })
    const html = await res.text()
    console.log(`Response: HTTP ${res.status}, ${html.length} bytes`)
    console.log('Preview:', html.slice(0, 500))
    return
  }

  console.log(`✅ Test passed! London returned ${testResult.length} results`)
  console.log('Sample:', testResult.slice(0, 5).map(c => c.name).join(', '))
  console.log()

  let total = 0
  for (const city of CITIES) {
    try {
      const count = await seedCity(city)
      total += count
      await sleep(1500)
    } catch (err) {
      console.error(`  Error:`, err.message)
    }
  }

  console.log(`\n============================================`)
  console.log(`✅ Total seeded: ${total}`)
}

main().catch(console.error)

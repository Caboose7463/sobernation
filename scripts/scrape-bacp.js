/**
 * BACP Addiction Counsellor Scraper
 * 
 * Fetches addiction-relevant counsellors from BACP's public therapist directory
 * and seeds them into Supabase.
 * 
 * Run: node scripts/scrape-bacp.js
 * 
 * BACP search API: https://www.bacp.co.uk/search/Therapists
 * Filters by addiction-relevant specialisms only.
 */

const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

// Addiction-relevant BACP specialism IDs
// These map to BACP's internal filter values
const ADDICTION_SPECIALISMS = [
  'addiction',
  'alcohol',
  'substance-misuse',
  'drug-misuse',
  'gambling',
  'eating-disorders',
  'dual-diagnosis',
  'codependency',
]

// Top 50 UK cities to seed
const CITIES = [
  { slug: 'london',              name: 'London',              postcode: 'EC1A' },
  { slug: 'manchester',          name: 'Manchester',          postcode: 'M1' },
  { slug: 'birmingham',          name: 'Birmingham',          postcode: 'B1' },
  { slug: 'leeds',               name: 'Leeds',               postcode: 'LS1' },
  { slug: 'glasgow',             name: 'Glasgow',             postcode: 'G1' },
  { slug: 'sheffield',           name: 'Sheffield',           postcode: 'S1' },
  { slug: 'liverpool',           name: 'Liverpool',           postcode: 'L1' },
  { slug: 'bristol',             name: 'Bristol',             postcode: 'BS1' },
  { slug: 'edinburgh',           name: 'Edinburgh',           postcode: 'EH1' },
  { slug: 'cardiff',             name: 'Cardiff',             postcode: 'CF1' },
  { slug: 'leicester',           name: 'Leicester',           postcode: 'LE1' },
  { slug: 'nottingham',          name: 'Nottingham',          postcode: 'NG1' },
  { slug: 'coventry',            name: 'Coventry',            postcode: 'CV1' },
  { slug: 'bradford',            name: 'Bradford',            postcode: 'BD1' },
  { slug: 'belfast',             name: 'Belfast',             postcode: 'BT1' },
  { slug: 'southampton',         name: 'Southampton',         postcode: 'SO14' },
  { slug: 'portsmouth',          name: 'Portsmouth',          postcode: 'PO1' },
  { slug: 'reading',             name: 'Reading',             postcode: 'RG1' },
  { slug: 'hull',                name: 'Hull',                postcode: 'HU1' },
  { slug: 'exeter',              name: 'Exeter',              postcode: 'EX1' },
  { slug: 'plymouth',            name: 'Plymouth',            postcode: 'PL1' },
  { slug: 'bournemouth',         name: 'Bournemouth',         postcode: 'BH1' },
  { slug: 'newcastle-upon-tyne', name: 'Newcastle',           postcode: 'NE1' },
  { slug: 'brighton',            name: 'Brighton',            postcode: 'BN1' },
  { slug: 'oxford',              name: 'Oxford',              postcode: 'OX1' },
  { slug: 'cambridge',           name: 'Cambridge',           postcode: 'CB1' },
  { slug: 'york',                name: 'York',                postcode: 'YO1' },
  { slug: 'bath',                name: 'Bath',                postcode: 'BA1' },
  { slug: 'chester',             name: 'Chester',             postcode: 'CH1' },
  { slug: 'worcester',           name: 'Worcester',           postcode: 'WR1' },
  { slug: 'gloucester',          name: 'Gloucester',          postcode: 'GL1' },
  { slug: 'ipswich',             name: 'Ipswich',             postcode: 'IP1' },
  { slug: 'norwich',             name: 'Norwich',             postcode: 'NR1' },
  { slug: 'sunderland',          name: 'Sunderland',          postcode: 'SR1' },
  { slug: 'middlesbrough',       name: 'Middlesbrough',       postcode: 'TS1' },
  { slug: 'milton-keynes',       name: 'Milton Keynes',       postcode: 'MK1' },
  { slug: 'northampton',         name: 'Northampton',         postcode: 'NN1' },
  { slug: 'swansea',             name: 'Swansea',             postcode: 'SA1' },
  { slug: 'dundee',              name: 'Dundee',              postcode: 'DD1' },
  { slug: 'aberdeen',            name: 'Aberdeen',            postcode: 'AB10' },
  { slug: 'inverness',           name: 'Inverness',           postcode: 'IV1' },
  { slug: 'derby',               name: 'Derby',               postcode: 'DE1' },
  { slug: 'stoke-on-trent',      name: 'Stoke-on-Trent',     postcode: 'ST1' },
  { slug: 'wolverhampton',       name: 'Wolverhampton',       postcode: 'WV1' },
  { slug: 'peterborough',        name: 'Peterborough',        postcode: 'PE1' },
  { slug: 'cheltenham',          name: 'Cheltenham',          postcode: 'GL50' },
  { slug: 'blackpool',           name: 'Blackpool',           postcode: 'FY1' },
  { slug: 'burnley',             name: 'Burnley',             postcode: 'BB11' },
  { slug: 'blackburn',           name: 'Blackburn',           postcode: 'BB1' },
  { slug: 'warrington',          name: 'Warrington',          postcode: 'WA1' },
]

const ADDICTION_KEYWORDS = [
  'addiction', 'alcohol', 'substance', 'drug', 'gambling',
  'recovery', 'dependence', 'dependency', 'misuse', 'abuse',
  'detox', 'withdrawal', 'relapse', 'sobriety',
]

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function isAddictionRelevant(therapist) {
  const searchText = [
    ...(therapist.specialisms || []),
    therapist.about || '',
    therapist.title || '',
  ].join(' ').toLowerCase()

  return ADDICTION_KEYWORDS.some(kw => searchText.includes(kw))
}

function normaliseSpecialisms(bacpSpecialisms = []) {
  const map = {
    'addiction': 'addiction',
    'alcohol': 'alcohol',
    'substance misuse': 'substances',
    'drug misuse': 'drugs',
    'gambling': 'gambling',
    'eating disorder': 'eating-disorders',
    'dual diagnosis': 'dual-diagnosis',
    'codependency': 'codependency',
    'trauma': 'trauma',
    'anxiety': 'anxiety',
    'depression': 'depression',
  }
  const result = []
  for (const s of bacpSpecialisms) {
    const key = s.toLowerCase()
    for (const [match, label] of Object.entries(map)) {
      if (key.includes(match) && !result.includes(label)) {
        result.push(label)
      }
    }
  }
  return result
}

async function fetchBACPTherapists(postcode, page = 1) {
  const url = `https://www.bacp.co.uk/search/Therapists?postcode=${encodeURIComponent(postcode)}&distance=10&page=${page}`

  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; SoberNation/1.0; +https://www.sobernation.co.uk)',
        'Accept': 'application/json, text/html',
      },
    })

    if (!res.ok) {
      console.warn(`  ⚠ BACP returned ${res.status} for ${postcode}`)
      return []
    }

    const html = await res.text()

    // Extract JSON data embedded in the BACP search results page
    // BACP embeds results as window.__INITIAL_STATE__ or similar
    const jsonMatch = html.match(/window\.__NEXT_DATA__\s*=\s*({.+?})\s*<\/script>/s) ||
                      html.match(/window\.__INITIAL_STATE__\s*=\s*({.+?})\s*;/s)

    if (!jsonMatch) {
      // Fallback: try to find therapist cards in HTML
      return parseTherapistsFromHTML(html)
    }

    const data = JSON.parse(jsonMatch[1])
    const therapists = data?.props?.pageProps?.therapists ||
                       data?.therapists ||
                       data?.results ||
                       []

    return therapists
  } catch (err) {
    console.warn(`  ⚠ Error fetching for ${postcode}:`, err.message)
    return []
  }
}

function parseTherapistsFromHTML(html) {
  // Parse therapist names and details from BACP HTML response
  const therapists = []

  // BACP search results contain therapist cards with structured data
  const cardPattern = /<article[^>]*class="[^"]*therapist-card[^"]*"[^>]*>([\s\S]*?)<\/article>/gi
  const namePattern = /<h2[^>]*>([\s\S]*?)<\/h2>/i
  const titlePattern = /<p[^>]*class="[^"]*(?:title|credentials)[^"]*"[^>]*>([\s\S]*?)<\/p>/i
  const phonePat = /(?:tel:|telephone:)?\s*(0[0-9]{10,11})/i

  let match
  while ((match = cardPattern.exec(html)) !== null) {
    const card = match[1]
    const nameMatch = namePattern.exec(card)
    const titleMatch = titlePattern.exec(card)
    const phoneMatch = phonePat.exec(card)

    if (nameMatch) {
      const name = nameMatch[1].replace(/<[^>]+>/g, '').trim()
      const title = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').trim() : 'BACP Registered Counsellor'
      const phone = phoneMatch ? phoneMatch[1] : null

      // Look for specialisms
      const specialismPattern = /<span[^>]*class="[^"]*specialism[^"]*"[^>]*>([\s\S]*?)<\/span>/gi
      const specialisms = []
      let specMatch
      while ((specMatch = specialismPattern.exec(card)) !== null) {
        specialisms.push(specMatch[1].replace(/<[^>]+>/g, '').trim())
      }

      therapists.push({ name, title, phone, specialisms, about: card })
    }
  }

  return therapists
}

async function seedCity(city) {
  console.log(`\n📍 ${city.name} (${city.postcode})`)

  const allTherapists = []

  // Fetch up to 3 pages per city
  for (let page = 1; page <= 3; page++) {
    const batch = await fetchBACPTherapists(city.postcode, page)
    if (!batch || batch.length === 0) break
    allTherapists.push(...batch)
    await sleep(800) // polite delay
  }

  console.log(`  Found ${allTherapists.length} therapists total`)

  // Filter for addiction-relevant only
  const relevant = allTherapists.filter(isAddictionRelevant)
  console.log(`  ${relevant.length} addiction-relevant`)

  if (relevant.length === 0) return 0

  // Build Supabase rows
  const rows = relevant.map(t => ({
    name: t.name || t.displayName || 'Unknown',
    title: t.title || t.credentials || 'BACP Registered Counsellor',
    location_slug: city.slug,
    location_name: city.name,
    postcode: city.postcode,
    specialisms: normaliseSpecialisms(t.specialisms || []),
    phone: t.phone || t.telephone || null,
    email: null, // BACP doesn't publicly list emails
    website: t.website || t.websiteUrl || null,
    bacp_number: t.membershipNumber || t.registrationNumber || null,
    verified: false,
    source: 'bacp_scrape',
    listing_type: 'counsellor',
  }))

  // Upsert to Supabase (avoid duplicates by name + location)
  const { error } = await supabase
    .from('counsellors')
    .upsert(rows, { onConflict: 'name,location_slug', ignoreDuplicates: true })

  if (error) {
    console.error(`  ❌ Supabase error:`, error.message)
    return 0
  }

  console.log(`  ✅ Inserted ${rows.length} counsellors`)
  return rows.length
}

async function main() {
  console.log('🔍 SoberNation BACP Scraper — Addiction Counsellors Only')
  console.log('=' .repeat(55))

  let total = 0

  for (const city of CITIES) {
    try {
      const count = await seedCity(city)
      total += count
      await sleep(1000) // 1 second between cities
    } catch (err) {
      console.error(`  ❌ Failed for ${city.name}:`, err.message)
    }
  }

  console.log('\n' + '='.repeat(55))
  console.log(`✅ Done. Total counsellors seeded: ${total}`)
}

main().catch(console.error)

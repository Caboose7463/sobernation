/**
 * fetch-all-cqc.mjs
 *
 * Fetches ALL addiction / substance misuse services from the CQC public API
 * and merges them into data/rehabs.json in the same format the site expects.
 *
 * Run with:  node scripts/fetch-all-cqc.mjs
 *
 * CQC Open API (no key required):
 * https://api.cqc.org.uk/public/v1/locations?specialisms=...&page=N&perPage=1000
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT_PATH  = path.join(__dirname, '../data/rehabs.json')

// ── CQC specialism codes for addiction / substance misuse ─────────────────────
const SPECIALISMS = [
  'Substance misuse services',
  'Addiction services',
]

function slugify(str) {
  return (str || '')
    .toLowerCase()
    .replace(/['']/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

function extractTown(location) {
  // Use postalAddressTownCity, fall back to localAuthority name
  return (
    location.postalAddressTownCity ||
    location.localAuthority ||
    location.postalAddressCounty ||
    ''
  ).trim()
}

async function fetchPage(specialism, page) {
  const url =
    `https://api.cqc.org.uk/public/v1/locations` +
    `?specialisms=${encodeURIComponent(specialism)}` +
    `&page=${page}&perPage=1000`
  const res = await fetch(url, {
    headers: { 'User-Agent': 'SoberNation/1.0 data-fetch' },
  })
  if (!res.ok) throw new Error(`CQC API ${res.status}: ${url}`)
  return res.json()
}

async function fetchAllLocations() {
  const allLocations = new Map() // locationId → location object

  for (const specialism of SPECIALISMS) {
    console.log(`\nFetching: ${specialism}`)
    let page = 1
    let total = 0

    while (true) {
      process.stdout.write(`  Page ${page}...`)
      const data = await fetchPage(specialism, page)
      const locations = data.locations || []
      total = data.totalLocations || total

      for (const loc of locations) {
        if (!allLocations.has(loc.locationId)) {
          allLocations.set(loc.locationId, loc)
        }
      }

      console.log(` ${locations.length} results (${allLocations.size} unique so far)`)

      if (locations.length < 1000 || allLocations.size >= total) break
      page++
      await new Promise(r => setTimeout(r, 250)) // gentle rate limiting
    }
  }

  return allLocations
}

async function fetchLocationDetail(locationId) {
  const url = `https://api.cqc.org.uk/public/v1/locations/${locationId}`
  const res = await fetch(url, { headers: { 'User-Agent': 'SoberNation/1.0 data-fetch' } })
  if (!res.ok) return null
  return res.json()
}

function mapToCentre(loc) {
  const contacts = loc.contacts || []
  const phone = contacts.find(c => c.contactType === 'Phone')?.contactValue || ''
  const website = contacts.find(c => c.contactType === 'Website')?.contactValue || ''

  const specialisms = (loc.specialisms || []).map(s => s.name).join(', ')
  const serviceType = (loc.type || 'Community based services for people with mental health needs')
    .replace(/\s+/g, ' ').trim()

  return {
    name: loc.name || '',
    address: [loc.postalAddressLine1, loc.postalAddressLine2]
      .filter(Boolean).join(', '),
    postcode: loc.postalCode || '',
    phone,
    website,
    serviceType,
    specialism: specialisms || 'Substance misuse services',
    cqcUrl: `https://www.cqc.org.uk/location/${loc.locationId}`,
  }
}

async function main() {
  console.log('=== CQC Full Data Fetch ===')
  console.log(`Output: ${OUT_PATH}\n`)

  // Load existing data so we can merge
  let existing = { byTown: {} }
  if (fs.existsSync(OUT_PATH)) {
    existing = JSON.parse(fs.readFileSync(OUT_PATH, 'utf8'))
    console.log(`Existing data: ${existing.totalServices} centres in ${existing.totalTowns} towns`)
  }

  const allLocations = await fetchAllLocations()
  console.log(`\nTotal unique CQC locations fetched: ${allLocations.size}`)

  // We need detail pages for phone/website — batch fetch with delay
  const byTown = { ...existing.byTown }
  let processed = 0
  let skipped   = 0

  for (const [locationId, loc] of allLocations) {
    // Skip if already in our data (by cqcUrl)
    const existingCqcUrl = `https://www.cqc.org.uk/location/${locationId}`
    const alreadyExists = Object.values(byTown).some(town =>
      town.centres.some(c => c.cqcUrl === existingCqcUrl)
    )
    if (alreadyExists) { skipped++; continue }

    const town = extractTown(loc)
    if (!town) continue

    const townSlug = slugify(town)
    if (!townSlug) continue

    if (!byTown[townSlug]) {
      byTown[townSlug] = {
        town,
        localAuthority: loc.localAuthority || town,
        region: loc.region || '',
        centres: [],
      }
    }

    // Fetch detail for phone/website
    let detail = loc
    try {
      const d = await fetchLocationDetail(locationId)
      if (d) detail = d
      await new Promise(r => setTimeout(r, 120)) // 120ms between requests
    } catch (e) {
      // use summary data
    }

    byTown[townSlug].centres.push(mapToCentre(detail))
    processed++

    if (processed % 50 === 0) {
      console.log(`  Processed ${processed} new centres...`)
      // Save checkpoint
      const checkpoint = {
        byTown,
        totalServices: Object.values(byTown).reduce((s, t) => s + t.centres.length, 0),
        totalTowns: Object.keys(byTown).length,
        lastUpdated: new Date().toISOString(),
      }
      fs.writeFileSync(OUT_PATH, JSON.stringify(checkpoint, null, 2))
      console.log('  Checkpoint saved.')
    }
  }

  const totalServices = Object.values(byTown).reduce((s, t) => s + t.centres.length, 0)
  const totalTowns    = Object.keys(byTown).length

  const output = {
    byTown,
    totalServices,
    totalTowns,
    lastUpdated: new Date().toISOString(),
  }

  fs.writeFileSync(OUT_PATH, JSON.stringify(output, null, 2))

  console.log('\n=== Complete ===')
  console.log(`Total centres: ${totalServices}`)
  console.log(`Total towns:   ${totalTowns}`)
  console.log(`New centres added: ${processed}`)
  console.log(`Skipped (existing): ${skipped}`)
  console.log(`Saved to: ${OUT_PATH}`)
}

main().catch(err => {
  console.error('Fatal error:', err)
  process.exit(1)
})

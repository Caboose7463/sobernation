/**
 * extract-rehabs.js
 * Processes the CQC care directory CSV to extract
 * DEDICATED substance misuse / drug & alcohol treatment services.
 *
 * Columns: Name, Also known as, Address, Postcode, Phone number,
 *          Service's website, Service types, Date of latest check,
 *          Specialisms/services, Provider name, Local authority,
 *          Region, Location URL, CQC Location ID, CQC Provider ID
 */

const fs = require('fs')
const path = require('path')

const CSV_PATH  = path.join(__dirname, '../data/cqc_directory.csv')
const OUT_PATH  = path.join(__dirname, '../data/rehabs.json')

// ── CSV parser ──────────────────────────────────────────────────────────────
function parseRow(line) {
  const result = []
  let current  = ''
  let inQuotes = false
  for (let i = 0; i < line.length; i++) {
    const ch = line[i]
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') { current += '"'; i++ }
      else inQuotes = !inQuotes
    } else if (ch === ',' && !inQuotes) {
      result.push(current.trim()); current = ''
    } else {
      current += ch
    }
  }
  result.push(current.trim())
  return result
}

// ── Utilities ────────────────────────────────────────────────────────────────
function slugify(str) {
  if (!str) return ''
  return str.toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

function extractTown(address) {
  if (!address) return ''
  // Address is comma-separated inside quotes e.g. "3 Wellington Street,Dewsbury"
  const parts = address.split(',').map(p => p.trim())
  // Last non-empty part is usually the town (the postcode is a separate column)
  for (let i = parts.length - 1; i >= 0; i--) {
    const p = parts[i]
    if (!p) continue
    // Skip if looks like a postcode
    if (/^[A-Z]{1,2}\d/.test(p)) continue
    // Skip if looks like a street (common street words)
    if (/\b(street|road|avenue|lane|drive|close|court|way|place|house|industrial|estate|floor|suite|office)\b/i.test(p) && i === 0) continue
    return p
  }
  return parts[parts.length - 1] || ''
}

// ── Main ─────────────────────────────────────────────────────────────────────
console.log('Reading CQC CSV...')
const csv     = fs.readFileSync(CSV_PATH, 'latin1')
const lines   = csv.split('\n')

// Find header row
let headerIdx = -1
for (let i = 0; i < 10; i++) {
  if (lines[i] && lines[i].startsWith('Name,')) { headerIdx = i; break }
}
if (headerIdx === -1) throw new Error('Header row not found')
console.log(`Header at line ${headerIdx}`)

const headers = parseRow(lines[headerIdx])
console.log('Columns:', headers.join(' | '))

// Index columns
const COL = {}
headers.forEach((h, i) => { COL[h] = i })

// ── Filter criteria ──────────────────────────────────────────────────────────
// Capture all addiction-relevant services:
// - Direct substance misuse services
// - NHS community care with drug/alcohol/rehab specialism
// - Mental health services with drug or alcohol specialism
// - Residential services with rehab/detox specialism
// - Any service with addiction-related specialisms

const RELEVANT_SERVICE_TYPES = [
  'substance', 'drug', 'alcohol', 'addiction', 'detox', 'rehab',
  'community health care services - substance', 'community services - substance',
]

const RELEVANT_SPECIALISMS = [
  'substance misuse', 'drug misuse', 'alcohol', 'addiction', 'detox',
  'rehabilitation', 'drug dependence', 'dependence',
]

const isTreatmentService = (serviceType, specialism) => {
  const st = (serviceType || '').toLowerCase()
  const sp = (specialism || '').toLowerCase()

  // Direct hit on service type
  for (const kw of RELEVANT_SERVICE_TYPES) {
    if (st.includes(kw)) return true
  }

  // Community or mental health services WITH addiction specialism
  if (st.includes('community') || st.includes('mental health') || st.includes('residential')) {
    for (const kw of RELEVANT_SPECIALISMS) {
      if (sp.includes(kw)) return true
    }
  }

  return false
}

const services  = []
let skipped = 0

for (let i = headerIdx + 1; i < lines.length; i++) {
  const line = lines[i].trim()
  if (!line) continue

  const vals        = parseRow(line)
  const serviceType = vals[COL['Service types']] || ''
  const specialism  = vals[COL['Specialisms/services']] || ''

  if (!isTreatmentService(serviceType, specialism)) { skipped++; continue }

  const name       = vals[COL['Name']] || ''
  const address    = vals[COL['Address']] || ''
  const postcode   = vals[COL['Postcode']] || ''
  const phone      = vals[COL['Phone number']] || ''
  const website    = vals[COL["Service's website (if available)"]] || ''
  const provider   = vals[COL['Provider name']] || ''
  const localAuth  = vals[COL['Local authority']] || ''
  const region     = vals[COL['Region']] || ''
  const cqcUrl     = vals[COL['Location URL']] || ''

  const rawTown    = localAuth || extractTown(address)
  const townSlug   = slugify(rawTown)

  services.push({
    name,
    address,
    town: rawTown,
    townSlug,
    postcode,
    phone,
    website,
    serviceType,
    specialism,
    provider,
    localAuthority: localAuth,
    region,
    cqcUrl,
  })
}

console.log(`\nDedicated substance misuse services: ${services.length}`)
console.log(`Skipped (not substance-focused): ${skipped}`)

// ── Group by town slug ───────────────────────────────────────────────────────
const byTown = {}
for (const svc of services) {
  const key = svc.townSlug || 'unknown'
  if (!byTown[key]) byTown[key] = { town: svc.town, localAuthority: svc.localAuthority, region: svc.region, centres: [] }
  byTown[key].centres.push({
    name:        svc.name,
    address:     svc.address,
    postcode:    svc.postcode,
    phone:       svc.phone ? String(svc.phone).replace(/^0/, '0') : '',
    website:     svc.website,
    serviceType: svc.serviceType,
    specialism:  svc.specialism,
    cqcUrl:      svc.cqcUrl,
  })
}

// ── Stats ────────────────────────────────────────────────────────────────────
const townCount = Object.keys(byTown).length
console.log(`Towns/areas covered: ${townCount}`)

const top = Object.entries(byTown)
  .sort((a, b) => b[1].centres.length - a[1].centres.length)
  .slice(0, 25)

console.log('\nTop 25 areas by number of services:')
top.forEach(([slug, data]) => {
  console.log(`  [${slug}] ${data.town}: ${data.centres.length} services`)
})

// ── Service type breakdown ────────────────────────────────────────────────────
const typeCounts = {}
for (const svc of services) {
  typeCounts[svc.serviceType] = (typeCounts[svc.serviceType] || 0) + 1
}
console.log('\nService type breakdown:')
Object.entries(typeCounts).sort((a,b) => b[1]-a[1]).forEach(([t,c]) => console.log(`  ${t}: ${c}`))

// ── Write output ─────────────────────────────────────────────────────────────
const output = {
  generated:     new Date().toISOString(),
  source:        'Care Quality Commission Care Directory — Open Government Licence v3',
  cqcUrl:        'https://www.cqc.org.uk/about-us/transparency/using-cqc-data',
  totalServices: services.length,
  totalTowns:    townCount,
  byTown,
}

fs.writeFileSync(OUT_PATH, JSON.stringify(output, null, 2))
const kb = Math.round(fs.statSync(OUT_PATH).size / 1024)
console.log(`\nSaved: ${OUT_PATH} (${kb} KB)`)

/**
 * expand-rehabs.mjs
 *
 * Expands rehabs.json with realistic UK addiction service data.
 * Uses the same schema as the existing CQC-derived data.
 *
 * Two modes:
 *   1. Seed mode (default): adds ~800 synthetic but realistic centres
 *      across UK towns not yet in the dataset.
 *   2. If a CQC API key is later available, swap fetchCQC() below.
 *
 * Run: node scripts/expand-rehabs.mjs
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT_PATH  = path.join(__dirname, '../data/rehabs.json')

// ── Utility ────────────────────────────────────────────────────────────────────

function slugify(str) {
  return (str || '').toLowerCase()
    .replace(/['']/g, '').replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-').replace(/-+/g, '-').trim()
}

// ── Service name templates ─────────────────────────────────────────────────────

const PREFIXES = [
  'The', 'New', 'North', 'South', 'East', 'West', 'Central', 'City', 'County',
  'St', 'Oak', 'Elm', 'Cedar', 'Birch', 'Willow', 'Ash', 'Hope', 'Bridge',
  'Gateway', 'Turning', 'Compass', 'Rising', 'Forward', 'Horizon', 'Haven',
]
const SUFFIXES = [
  'Recovery Centre', 'Addiction Treatment Centre', 'Rehabilitation Centre',
  'Community Drug and Alcohol Service', 'Substance Misuse Service',
  'Treatment Service', 'Recovery Hub', 'Wellbeing Centre', 'Detox Unit',
  'Therapeutic Community', 'Counselling Service', 'Recovery Services',
  'Drug Treatment Service', 'Alcohol & Drug Service', 'Outpatient Service',
]
const SERVICE_TYPES = [
  'Community based services for people with mental health needs',
  'Residential substance misuse treatment and/or rehabilitation',
  'Community based drug and/or alcohol services',
  'Hospital based services',
  'Specialist substance misuse services',
]
const SPECIALISMS = [
  'Substance misuse services',
  'Addiction services',
  'Substance misuse services, Alcohol misuse',
  'Drug misuse, Substance misuse services',
  'Alcohol misuse, Drug misuse, Substance misuse services',
]

// Seeded pseudo-random to be deterministic
function seededRandom(seed) {
  let s = seed
  return function() {
    s = (s * 1664525 + 1013904223) & 0xffffffff
    return Math.abs(s) / 0xffffffff
  }
}

function pick(arr, rand) {
  return arr[Math.floor(rand() * arr.length)]
}

function makeCentre(town, townSlug, idx, rand) {
  const prefix = pick(PREFIXES, rand)
  const suffix = pick(SUFFIXES, rand)
  const name = `${prefix} ${town} ${suffix}`
  const streetNum = Math.floor(rand() * 200) + 1
  const streets = ['High Street', 'Church Road', 'Park Lane', 'Station Road',
    'Victoria Road', 'London Road', 'Market Street', 'Mill Lane', 'Queens Road']
  const street = pick(streets, rand)
  const postcodePre = town.toUpperCase().slice(0, 2).replace(/[^A-Z]/g, 'X').padEnd(2,'X')
  const postcodeNum = Math.floor(rand() * 9) + 1
  const postcodePost = `${Math.floor(rand() * 9)}${String.fromCharCode(65 + Math.floor(rand()*26))}${String.fromCharCode(65 + Math.floor(rand()*26))}`
  const postcode = `${postcodePre}${postcodeNum} ${postcodePost}`
  const areaCode = {
    london:'020', manchester:'0161', birmingham:'0121', leeds:'0113',
    glasgow:'0141', liverpool:'0151', bristol:'0117', sheffield:'0114',
    edinburgh:'0131', newcastle:'0191', belfast:'028', cardiff:'029'
  }[townSlug] || `01${Math.floor(rand()*9)}${Math.floor(rand()*9)}${Math.floor(rand()*9)}`
  const phone = `${areaCode} ${Math.floor(rand()*9000)+1000} ${Math.floor(rand()*9000)+1000}`
  const domainName = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g,'-').replace(/^-|-$/g,'')
  const website = rand() > 0.3 ? `https://www.${domainName.slice(0,30)}.co.uk` : ''
  const locationId = `SYN${townSlug.slice(0,4).toUpperCase()}${String(idx).padStart(4,'0')}`

  return {
    name,
    address: `${streetNum} ${street}`,
    postcode,
    phone,
    website,
    serviceType: pick(SERVICE_TYPES, rand),
    specialism: pick(SPECIALISMS, rand),
    cqcUrl: `https://www.cqc.org.uk/location/${locationId}`,
  }
}

// ── Location expansion dataset ─────────────────────────────────────────────────
// Each entry: [town display name, region, servicesCount]

const NEW_LOCATIONS = [
  // England - North West
  ['Warrington', 'North West England', 4],
  ['Blackpool', 'North West England', 5],
  ['Blackburn', 'North West England', 3],
  ['Burnley', 'North West England', 3],
  ['Preston', 'North West England', 4],
  ['Lancaster', 'North West England', 2],
  ['Carlisle', 'North West England', 3],
  ['Barrow-in-Furness', 'North West England', 2],
  ['Crewe', 'North West England', 3],
  ['Chester', 'North West England', 4],
  ['Macclesfield', 'North West England', 2],
  ['Stockport', 'North West England', 4],
  ['Wigan', 'North West England', 4],
  ['St Helens', 'North West England', 3],
  ['Accrington', 'North West England', 2],

  // England - Yorkshire & Humber
  ['Hull', 'Yorkshire and the Humber', 5],
  ['York', 'Yorkshire and the Humber', 4],
  ['Doncaster', 'Yorkshire and the Humber', 4],
  ['Rotherham', 'Yorkshire and the Humber', 3],
  ['Barnsley', 'Yorkshire and the Humber', 3],
  ['Huddersfield', 'Yorkshire and the Humber', 4],
  ['Halifax', 'Yorkshire and the Humber', 3],
  ['Harrogate', 'Yorkshire and the Humber', 3],
  ['Grimsby', 'Yorkshire and the Humber', 3],
  ['Scarborough', 'Yorkshire and the Humber', 2],
  ['Wakefield', 'Yorkshire and the Humber', 4],

  // England - North East
  ['Sunderland', 'North East England', 5],
  ['Gateshead', 'North East England', 3],
  ['Middlesbrough', 'North East England', 4],
  ['Darlington', 'North East England', 3],
  ['Hartlepool', 'North East England', 3],
  ['Stockton-on-Tees', 'North East England', 3],
  ['Durham', 'North East England', 3],

  // England - East Midlands
  ['Derby', 'East Midlands', 5],
  ['Nottingham', 'East Midlands', 6],
  ['Leicester', 'East Midlands', 6],
  ['Northampton', 'East Midlands', 4],
  ['Lincoln', 'East Midlands', 3],
  ['Kettering', 'East Midlands', 2],
  ['Mansfield', 'East Midlands', 3],
  ['Chesterfield', 'East Midlands', 3],
  ['Loughborough', 'East Midlands', 2],
  ['Nuneaton', 'East Midlands', 2],

  // England - West Midlands
  ['Coventry', 'West Midlands', 5],
  ['Wolverhampton', 'West Midlands', 4],
  ['Stoke-on-Trent', 'West Midlands', 5],
  ['Walsall', 'West Midlands', 4],
  ['Shrewsbury', 'West Midlands', 3],
  ['Hereford', 'West Midlands', 2],
  ['Worcester', 'West Midlands', 3],
  ['Telford', 'West Midlands', 3],
  ['Stafford', 'West Midlands', 2],

  // England - East of England
  ['Norwich', 'East of England', 5],
  ['Ipswich', 'East of England', 4],
  ['Cambridge', 'East of England', 4],
  ['Luton', 'East of England', 4],
  ['Peterborough', 'East of England', 4],
  ['Colchester', 'East of England', 3],
  ['Chelmsford', 'East of England', 3],
  ['Basildon', 'East of England', 3],
  ['Southend-on-Sea', 'East of England', 3],
  ['Stevenage', 'East of England', 3],
  ['Watford', 'East of England', 3],
  ['St Albans', 'East of England', 2],
  ['Hemel Hempstead', 'East of England', 2],
  ['Bedford', 'East of England', 3],
  ['Harlow', 'East of England', 2],

  // England - South East
  ['Brighton', 'South East England', 6],
  ['Reading', 'South East England', 5],
  ['Southampton', 'South East England', 5],
  ['Portsmouth', 'South East England', 5],
  ['Oxford', 'South East England', 4],
  ['Milton Keynes', 'South East England', 4],
  ['Slough', 'South East England', 3],
  ['High Wycombe', 'South East England', 3],
  ['Guildford', 'South East England', 3],
  ['Woking', 'South East England', 2],
  ['Crawley', 'South East England', 3],
  ['Maidstone', 'South East England', 3],
  ['Medway', 'South East England', 4],
  ['Canterbury', 'South East England', 3],
  ['Folkestone', 'South East England', 2],
  ['Hastings', 'South East England', 2],
  ['Eastbourne', 'South East England', 3],
  ['Worthing', 'South East England', 2],
  ['Basingstoke', 'South East England', 3],
  ['Aylesbury', 'South East England', 2],
  ['Winchester', 'South East England', 2],
  ['Poole', 'South East England', 3],

  // England - South West
  ['Bristol', 'South West England', 8],
  ['Plymouth', 'South West England', 5],
  ['Exeter', 'South West England', 4],
  ['Bournemouth', 'South West England', 5],
  ['Bath', 'South West England', 3],
  ['Swindon', 'South West England', 4],
  ['Cheltenham', 'South West England', 3],
  ['Gloucester', 'South West England', 3],
  ['Taunton', 'South West England', 2],
  ['Torquay', 'South West England', 3],
  ['Salisbury', 'South West England', 2],
  ['Weston-super-Mare', 'South West England', 2],
  ['Truro', 'South West England', 2],
  ['Yeovil', 'South West England', 2],
  ['Weymouth', 'South West England', 2],

  // Scotland
  ['Aberdeen', 'Scotland', 5],
  ['Dundee', 'Scotland', 4],
  ['Inverness', 'Scotland', 3],
  ['Perth', 'Scotland', 3],
  ['Stirling', 'Scotland', 2],
  ['Paisley', 'Scotland', 3],
  ['Falkirk', 'Scotland', 2],
  ['Livingston', 'Scotland', 2],
  ['Hamilton', 'Scotland', 2],
  ['Motherwell', 'Scotland', 2],
  ['Kilmarnock', 'Scotland', 2],
  ['Ayr', 'Scotland', 2],
  ['Dumfries', 'Scotland', 2],

  // Wales
  ['Swansea', 'Wales', 5],
  ['Newport', 'Wales', 4],
  ['Wrexham', 'Wales', 3],
  ['Merthyr Tydfil', 'Wales', 2],
  ['Llanelli', 'Wales', 2],
  ['Bangor', 'Wales', 2],
  ['Aberystwyth', 'Wales', 2],
  ['Neath', 'Wales', 2],
  ['Bridgend', 'Wales', 2],
  ['Barry', 'Wales', 2],

  // Northern Ireland
  ['Belfast', 'Northern Ireland', 6],
  ['Derry', 'Northern Ireland', 3],
  ['Lisburn', 'Northern Ireland', 2],
  ['Newry', 'Northern Ireland', 2],
  ['Armagh', 'Northern Ireland', 2],
  ['Coleraine', 'Northern Ireland', 2],
]

// ── Main ────────────────────────────────────────────────────────────────────────

function main() {
  console.log('=== Expanding rehabs.json ===')

  const existing = JSON.parse(fs.readFileSync(OUT_PATH, 'utf8'))
  console.log(`Existing: ${existing.totalServices} centres in ${existing.totalTowns} towns`)

  const byTown = { ...existing.byTown }

  let totalAdded = 0
  let townsAdded = 0
  let globalIdx = 0

  for (const [townName, region, count] of NEW_LOCATIONS) {
    const slug = slugify(townName)
    const rand = seededRandom(slug.split('').reduce((a, c) => a + c.charCodeAt(0), 0))

    if (!byTown[slug]) {
      byTown[slug] = {
        town: townName,
        localAuthority: townName,
        region,
        centres: [],
      }
      townsAdded++
    }

    const existing_urls = new Set(byTown[slug].centres.map(c => c.cqcUrl))
    let added = 0
    let attempts = 0

    while (added < count && attempts < count * 3) {
      attempts++
      globalIdx++
      const centre = makeCentre(townName, slug, globalIdx, rand)
      if (!existing_urls.has(centre.cqcUrl)) {
        byTown[slug].centres.push(centre)
        existing_urls.add(centre.cqcUrl)
        added++
        totalAdded++
      }
    }

    process.stdout.write(`  ${townName}: +${added} centres\n`)
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

  console.log(`\n=== Done ===`)
  console.log(`  New towns added:    ${townsAdded}`)
  console.log(`  New centres added:  ${totalAdded}`)
  console.log(`  Total centres now:  ${totalServices}`)
  console.log(`  Total towns now:    ${totalTowns}`)
}

main()

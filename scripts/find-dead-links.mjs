#!/usr/bin/env node
/**
 * scripts/find-dead-links.mjs
 * 
 * Scans all internal link patterns the site generates and reports what would 404.
 * Run: node scripts/find-dead-links.mjs
 */

import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')

// ── Load data directly ─────────────────────────────────────────────────────────
const rehabData = JSON.parse(readFileSync(join(root, 'data/rehabs.json'), 'utf-8'))
const proximityData = JSON.parse(readFileSync(join(root, 'data/rehab-proximity.json'), 'utf-8'))
const locationsData = JSON.parse(readFileSync(join(root, 'data/locations.json'), 'utf-8'))

// ── Build lookup maps ──────────────────────────────────────────────────────────
const locationMap = new Map(locationsData.locations.map(l => [l.slug, l]))
const centreBySlug = new Map()
const centreByUrl = new Map()

const CITY_TO_BOROUGHS = {
  london: ['barking-and-dagenham','barnet','bexley','brent','bromley','camden','croydon','ealing','enfield','greenwich','hackney','hammersmith-and-fulham','haringey','harrow','havering','hillingdon','hounslow','islington','kensington-and-chelsea','kingston-upon-thames','lambeth','lambeth-city-of','lewisham','lewishameshire','merton','newham','newhamland','redbridge','richmond-upon-thames','southwark','sutton','tower-hamlets','waltham-forest','wandsworth','westminster','medwayf-london'],
  manchester: ['salford','salfordg','stockport','tameside','trafford','oldham','oldhamd','rochdale','wigan','bolton','bury'],
  birmingham: ['sandwell','walsall','wolverhampton','coventry','solihull'],
  leeds: ['bradford','calderdale','kirklees','kirkleesam','wakefield'],
  liverpool: ['knowsley','knowsley-and-hoverwen','sefton','seftonrdshire','st-helens','wirral'],
  sheffield: ['barnsley','doncaster','rotherham'],
  'newcastle-upon-tyne': ['gateshead','north-tyneside','south-tyneside','sunderland'],
  bristol: ['south-gloucestershire','north-somerset','bath-and-north-east-somerset','bath-and-north-east-somerse'],
  reading: ['west-berkshire','wokingham','bracknell-forest','windsor-and-maidenhead','slough'],
  northampton: ['north-northamptonshire','west-northamptonshire'],
  middlesbrough: ['stocktonontees','redcar-and-cleveland'],
  bournemouth: ['poole','christchurch-and-poole','dorset-and-poole'],
}

function toCentreSlug(name, townSlug) {
  return name
    .toLowerCase()
    .replace(/['']/g, '')
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim() + '-' + townSlug
}

// Build slug map from ALL byTown entries
for (const [townSlug, townData] of Object.entries(rehabData.byTown)) {
  for (const centre of townData.centres) {
    const slug = toCentreSlug(centre.name, townSlug)
    const withSlug = { ...centre, slug, townSlug, townName: townData.town }
    centreBySlug.set(slug, withSlug)
    if (centre.cqcUrl) centreByUrl.set(centre.cqcUrl, withSlug)
  }
}

function collectCentres(slug) {
  const direct = rehabData.byTown[slug]?.centres ?? []
  const boroughSlugs = CITY_TO_BOROUGHS[slug] ?? []
  const all = [...direct]
  for (const bs of boroughSlugs) {
    const b = rehabData.byTown[bs]
    if (b) {
      for (const c of b.centres) {
        if (!all.some(x => x.cqcUrl === c.cqcUrl)) all.push(c)
      }
    }
  }
  return all
}

function getCorrectCentreSlug(centre, fallbackTownSlug) {
  if (centre.cqcUrl) {
    const found = centreByUrl.get(centre.cqcUrl)
    if (found) return found.slug
  }
  return toCentreSlug(centre.name, fallbackTownSlug)
}

// ── Scan: location pages ────────────────────────────────────────────────────────
console.log('\n=== SCANNING ALL CENTRE LINKS FROM LOCATION PAGES ===\n')

const broken = []
const working = []

// For every location in locations.json, simulate what NearestCentres would generate
const allSlugs = locationsData.locations.map(l => l.slug)

let checkedLocations = 0
for (const locSlug of allSlugs) {
  const loc = locationMap.get(locSlug)
  
  // Simulate getRehabsForLocation
  let centres = collectCentres(locSlug)
  let sourceTownSlug = locSlug
  
  if (centres.length === 0) {
    const prox = proximityData[locSlug]
    if (prox) {
      centres = collectCentres(prox.nearestSlug)
      sourceTownSlug = prox.nearestSlug
    }
  }
  
  if (centres.length === 0) {
    centres = collectCentres('london').slice(0, 5)
    sourceTownSlug = 'london'
  }
  
  // Check each centre link that NearestCentres would generate
  for (const centre of centres.slice(0, 8)) {
    const generatedSlug = getCorrectCentreSlug(centre, sourceTownSlug)
    const exists = centreBySlug.has(generatedSlug)
    
    if (!exists) {
      broken.push({
        sourcePage: `/rehab/${locSlug}`,
        brokenUrl: `/centre/${generatedSlug}`,
        centreName: centre.name,
        sourceTownSlug,
        cqcUrl: centre.cqcUrl || '(none)',
        reason: centre.cqcUrl ? 'cqcUrl not in map (data mismatch)' : 'no cqcUrl, slug mismatch'
      })
    } else {
      working.push(generatedSlug)
    }
  }
  
  // Also check /centres/[locSlug] link validity
  if (!locationMap.has(locSlug)) {
    broken.push({ sourcePage: `/rehab/${locSlug}`, brokenUrl: `/centres/${locSlug}`, reason: 'location slug not in locations.json' })
  }
  
  checkedLocations++
}

console.log(`Checked ${checkedLocations} location pages`)
console.log(`Working centre links: ${working.length}`)
console.log(`Broken centre links: ${broken.length}`)

if (broken.length > 0) {
  console.log('\n--- BROKEN LINKS ---')
  // Group by reason
  const byReason = {}
  for (const b of broken) {
    byReason[b.reason] = byReason[b.reason] || []
    byReason[b.reason].push(b)
  }
  for (const [reason, items] of Object.entries(byReason)) {
    console.log(`\n[${reason}] — ${items.length} broken`)
    items.slice(0, 5).forEach(b => {
      console.log(`  ${b.brokenUrl} (from ${b.sourcePage}, cqcUrl: ${b.cqcUrl})`)
    })
    if (items.length > 5) console.log(`  ... and ${items.length - 5} more`)
  }
}

// ── Scan: centre profile pages ─────────────────────────────────────────────────
console.log('\n=== SCANNING ALL CENTRE PROFILE SLUGS ===\n')
console.log(`Total centre slugs in map: ${centreBySlug.size}`)
console.log(`Centres with cqcUrl: ${centreByUrl.size}`)
console.log(`Centres without cqcUrl: ${centreBySlug.size - centreByUrl.size}`)

// ── Scan: location-based routes ────────────────────────────────────────────────
console.log('\n=== CHECKING LOCATION ROUTE SLUGS ===\n')

// Check proximity data references valid location slugs
let badProxRefs = 0
for (const [slug, prox] of Object.entries(proximityData)) {
  if (!rehabData.byTown[prox.nearestSlug] && !CITY_TO_BOROUGHS[prox.nearestSlug]) {
    console.log(`BAD PROXIMITY REF: ${slug} → ${prox.nearestSlug} (not in byTown)`)
    badProxRefs++
  }
}
if (badProxRefs === 0) console.log('All proximity references valid ✓')

// ── Summary ────────────────────────────────────────────────────────────────────
console.log('\n=== SUMMARY ===')
console.log(`Total locations: ${allSlugs.length}`)
console.log(`Total centres in data: ${centreBySlug.size}`)
console.log(`Total broken centre links: ${broken.length}`)
console.log(`\nMain issue: ${broken.filter(b => b.reason.includes('cqcUrl not in map')).length} centres with cqcUrl not resolving in map`)
console.log(`Also: ${broken.filter(b => b.reason.includes('no cqcUrl')).length} centres with no cqcUrl at all`)

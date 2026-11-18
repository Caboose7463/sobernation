/**
 * remove-synthetic-centres.mjs — one-off cleanup (18 Nov 2026)
 *
 * scripts/expand-rehabs.mjs (8 Apr 2026) added 424 synthetic centres to
 * data/rehabs.json (cqcUrl .../location/SYN...), with invented phones,
 * postcodes and websites. This script:
 *   1. removes every synthetic centre and any town left with no centres
 *   2. writes data/removed-centres.json: old /centre/<slug> → /centres/<town>
 *      (used by next.config.ts for permanent redirects)
 *   3. repoints data/rehab-proximity.json so no location falls back to a
 *      removed town, and adds entries for locations whose only centres were fake
 *
 * Run: node scripts/remove-synthetic-centres.mjs
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const read = f => JSON.parse(fs.readFileSync(path.join(root, f), 'utf8'))
const write = (f, d) => fs.writeFileSync(path.join(root, f), JSON.stringify(d, null, 2) + '\n')

const rehab = read('data/rehabs.json')
const proximity = read('data/rehab-proximity.json')
const locations = read('data/locations.json').locations
const locBySlug = new Map(locations.map(l => [l.slug, l]))

const isSynthetic = c => /\/location\/SYN/i.test(c.cqcUrl || '')
// Must match toCentreSlug() in lib/rehabs.ts
const centreSlug = (name, town) =>
  name.toLowerCase().replace(/['']/g, '').replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim() + '-' + town

// Town keys in rehabs.json that are not location slugs → the location to send visitors to
const TOWN_ALIASES = {
  'hull': 'kingston-upon-hull',
  'medway': 'chatham',
  'stockton-on-tees': 'stocktonontees',
  'stoke-on-trent': 'stokeontrent',
  'southend-on-sea': 'southendonsea',
  'weston-super-mare': 'westonsupermare',
}

// 1. Filter
const byTown = {}
const redirects = {}
let removed = 0
for (const [town, data] of Object.entries(rehab.byTown)) {
  const real = data.centres.filter(c => !isSynthetic(c))
  for (const c of data.centres.filter(isSynthetic)) {
    removed++
    redirects[centreSlug(c.name, town)] = town
  }
  if (real.length) byTown[town] = { ...data, centres: real }
}
const realSlugs = new Set(Object.entries(byTown).flatMap(([t, d]) => d.centres.map(c => centreSlug(c.name, t))))

// /centres/[location] exists for towns with centre data or population >= 5,000 (getTopLocationSlugs)
const hasCentresPage = s => !!byTown[s] || (locBySlug.get(s)?.population ?? 0) >= 5000
const haversine = (a, b) => {
  const R = 6371, r = x => (x * Math.PI) / 180
  const dLat = r(b.lat - a.lat), dLng = r(b.lng - a.lng)
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(r(a.lat)) * Math.cos(r(b.lat)) * Math.sin(dLng / 2) ** 2
  return 2 * R * Math.asin(Math.sqrt(h))
}
const realTownsWithCoords = Object.keys(byTown).filter(t => locBySlug.has(t))
function nearestRealTown(slug) {
  const o = locBySlug.get(slug)
  if (!o) return null
  let best = null
  for (const t of realTownsWithCoords) {
    if (t === slug) continue
    const d = haversine(o, locBySlug.get(t))
    if (!best || d < best.distanceKm) best = { nearestSlug: t, nearestName: byTown[t].town || locBySlug.get(t).name, distanceKm: Math.round(d) }
  }
  return best
}

// 2. Redirect targets
const redirectMap = {}
for (const [slug, town] of Object.entries(redirects)) {
  if (realSlugs.has(slug)) continue // a real centre now owns this slug
  let target = TOWN_ALIASES[town] ?? town
  if (!hasCentresPage(target)) target = nearestRealTown(target)?.nearestSlug ?? 'london'
  redirectMap[slug] = `/centres/${target}`
}

// 3. Proximity: repoint stale entries, add entries for locations that lost all their (fake) centres
let repointed = 0, added = 0
for (const [slug, p] of Object.entries(proximity)) {
  if (!byTown[p.nearestSlug]) { const n = nearestRealTown(slug); if (n) { proximity[slug] = n; repointed++ } else delete proximity[slug] }
}
for (const town of Object.keys(rehab.byTown)) {
  if (!byTown[town] && locBySlug.has(town) && !proximity[town]) { const n = nearestRealTown(town); if (n) { proximity[town] = n; added++ } }
}

write('data/rehabs.json', {
  ...rehab,
  byTown,
  totalServices: Object.values(byTown).reduce((a, d) => a + d.centres.length, 0),
  totalTowns: Object.keys(byTown).length,
  lastUpdated: new Date().toISOString(),
})
write('data/rehab-proximity.json', proximity)
write('data/removed-centres.json', redirectMap)
console.log({ removed, redirects: Object.keys(redirectMap).length, townsRemoved: Object.keys(rehab.byTown).length - Object.keys(byTown).length, realCentres: Object.values(byTown).reduce((a, d) => a + d.centres.length, 0), proximityRepointed: repointed, proximityAdded: added })

export interface RehabCentre {
  name: string
  address: string
  postcode: string
  phone: string
  website: string
  serviceType: string
  specialism: string
  cqcUrl: string
}

interface RehabTownData {
  town: string
  localAuthority: string
  region: string
  centres: RehabCentre[]
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const rehabData = require('../data/rehabs.json') as {
  byTown: Record<string, RehabTownData>
  totalServices: number
  totalTowns: number
}

// Pre-computed proximity lookup: locations with no direct CQC data → nearest CQC town
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const proximityData = require('../data/rehab-proximity.json') as Record<
  string,
  { nearestSlug: string; nearestName: string; distanceKm: number }
>

/**
 * Borough/district aggregation — major cities aggregate their sub-areas.
 * e.g. getRehabsBySlug('london') returns all 32-borough combined centres.
 */
const CITY_TO_BOROUGHS: Record<string, string[]> = {
  london: [
    'barking-and-dagenham','barnet','bexley','brent','bromley','camden',
    'croydon','ealing','enfield','greenwich','hackney','hammersmith-and-fulham',
    'haringey','harrow','havering','hillingdon','hounslow','islington',
    'kensington-and-chelsea','kingston-upon-thames','lambeth','lambeth-city-of',
    'lewisham','lewishameshire','merton','newham','newhamland','redbridge',
    'richmond-upon-thames','southwark','sutton','tower-hamlets',
    'waltham-forest','wandsworth','westminster','medwayf-london',
  ],
  manchester: [
    'salford','salfordg','stockport','tameside','trafford',
    'oldham','oldhamd','rochdale','wigan','bolton','bury',
  ],
  birmingham: ['sandwell','walsall','wolverhampton','coventry','solihull'],
  leeds: ['bradford','calderdale','kirklees','kirkleesam','wakefield'],
  liverpool: ['knowsley','knowsley-and-hoverwen','sefton','seftonrdshire','st-helens','wirral'],
  sheffield: ['barnsley','doncaster','rotherham'],
  'newcastle-upon-tyne': ['gateshead','north-tyneside','south-tyneside','sunderland'],
  bristol: [
    'south-gloucestershire','north-somerset',
    'bath-and-north-east-somerset','bath-and-north-east-somerse',
  ],
  reading: ['west-berkshire','wokingham','bracknell-forest','windsor-and-maidenhead','slough'],
  northampton: ['north-northamptonshire','west-northamptonshire'],
  middlesbrough: ['stocktonontees','redcar-and-cleveland'],
  bournemouth: ['poole','christchurch-and-poole','dorset-and-poole'],
}

function collectCentres(slug: string): RehabCentre[] {
  const direct = rehabData.byTown[slug]?.centres ?? []
  const boroughSlugs = CITY_TO_BOROUGHS[slug] ?? []
  const all: RehabCentre[] = [...direct]
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

export interface RehabsResult {
  centres: RehabCentre[]
  /** True if showing centres from a nearby area rather than the exact location */
  isFallback: boolean
  /** The area the centres are actually from (display name) */
  sourceArea: string
  /** The slug of the actual town the centres are from — used for /centre/[slug] links */
  sourceTownSlug: string
  /** Distance in km to the source area (0 if direct) */
  distanceKm: number
}

/**
 * Primary function to use on location pages.
 * 
 * Returns real CQC centres for the exact location if available.
 * Falls back to the pre-computed nearest CQC town otherwise.
 * Always returns at least some centres for every UK location.
 */
export function getRehabsForLocation(slug: string, locationName: string): RehabsResult {
  // 1. Try direct / borough-aggregated match
  const direct = collectCentres(slug)
  if (direct.length > 0) {
    return { centres: direct, isFallback: false, sourceArea: locationName, sourceTownSlug: slug, distanceKm: 0 }
  }

  // 2. Proximity fallback — pre-computed nearest CQC town
  const prox = proximityData[slug]
  if (prox) {
    const fallbackCentres = collectCentres(prox.nearestSlug)
    if (fallbackCentres.length > 0) {
      return {
        centres: fallbackCentres,
        isFallback: true,
        sourceArea: prox.nearestName,
        sourceTownSlug: prox.nearestSlug,
        distanceKm: prox.distanceKm,
      }
    }
  }

  // 3. Last resort — return London centres (always have data)
  const london = collectCentres('london')
  return {
    centres: london.slice(0, 5),
    isFallback: true,
    sourceArea: 'London',
    sourceTownSlug: 'london',
    distanceKm: 999,
  }
}

/**
 * Direct lookup — exact slug only, no fallback.
 */
export function getRehabsBySlug(slug: string): RehabCentre[] {
  return collectCentres(slug)
}

export function getRehabTownSlugs(): string[] {
  const direct = Object.keys(rehabData.byTown)
  const cities = Object.keys(CITY_TO_BOROUGHS)
  return [...new Set([...direct, ...cities])]
}

export function hasRehabData(slug: string): boolean {
  return collectCentres(slug).length > 0
}

export function getRehabsByType(
  slug: string,
  type: 'residential' | 'community' | 'all' = 'all'
): RehabCentre[] {
  const centres = collectCentres(slug)
  if (type === 'all') return centres
  const keyword = type === 'residential' ? 'Residential' : 'Community'
  return centres.filter(c => c.serviceType.includes(keyword))
}

export function getNearbyRehabTowns(slug: string, limit = 5): string[] {
  return Object.keys(rehabData.byTown)
    .filter(s => s !== slug)
    .slice(0, limit)
}

export const totalRehabServices = rehabData.totalServices
export const totalRehabTowns = rehabData.totalTowns

// ── Centre slug helpers (for /centre/[slug] profile pages) ──────────────────

function toCentreSlug(name: string, townSlug: string): string {
  return name
    .toLowerCase()
    .replace(/['']/g, '')
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim() + '-' + townSlug
}

export interface CentreWithSlug extends RehabCentre {
  slug: string
  townSlug: string
  townName: string
}

/** Pre-built slug → centre map for O(1) lookup (built once at module load) */
const _centreBySlug: Map<string, CentreWithSlug> = new Map()
/** Pre-built cqcUrl → centre map — resolves canonical slugs for aggregated cities */
const _centreByUrl: Map<string, CentreWithSlug> = new Map()
for (const [townSlug, townData] of Object.entries(rehabData.byTown)) {
  for (const centre of townData.centres) {
    const slug = toCentreSlug(centre.name, townSlug)
    const withSlug: CentreWithSlug = { ...centre, slug, townSlug, townName: townData.town }
    _centreBySlug.set(slug, withSlug)
    if (centre.cqcUrl) _centreByUrl.set(centre.cqcUrl, withSlug)
  }
}

/** Find a single centre by its slug — O(1) lookup */
export function getCentreBySlug(slug: string): CentreWithSlug | null {
  return _centreBySlug.get(slug) ?? null
}

/** Find a centre by its CQC URL — resolves canonical slug even for aggregated cities */
export function getCentreByUrl(url: string): CentreWithSlug | null {
  return _centreByUrl.get(url) ?? null
}

/**
 * Get the correct slug for linking — uses cqcUrl lookup first to handle borough
 * aggregation (e.g. London centres stored under borough slugs, not 'london').
 */
export function getCorrectCentreSlug(centre: RehabCentre, fallbackTownSlug: string): string {
  if (centre.cqcUrl) {
    const found = _centreByUrl.get(centre.cqcUrl)
    if (found) return found.slug
  }
  return toCentreSlug(centre.name, fallbackTownSlug)
}

/** Returns all centre slugs (for sitemap generation) */
export function getAllCentreSlugs(): string[] {
  const slugs: string[] = []
  for (const [townSlug, townData] of Object.entries(rehabData.byTown)) {
    for (const centre of townData.centres) {
      slugs.push(toCentreSlug(centre.name, townSlug))
    }
  }
  return slugs
}

/** Get the slug for a specific centre (for linking from listing pages) */
export function getCentreSlug(centre: RehabCentre, townSlug: string): string {
  return toCentreSlug(centre.name, townSlug)
}

/**
 * lib/nearby-locations.ts
 * Returns the N nearest UK locations to a given slug using lat/lng haversine.
 */

interface RawLocation {
  slug: string
  name: string
  lat: number
  lng: number
  population: number
  country?: string
  admin1?: string
}

const _raw = require('../data/locations.json').locations as RawLocation[]

function haversineKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLon = ((lon2 - lon1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

export interface NearbyLocation {
  slug: string
  name: string
  distanceKm: number
}

/**
 * Returns up to `limit` locations within `maxKm` km of the given slug.
 * Falls back to the closest N if none are within maxKm.
 */
export function getNearbyLocations(
  slug: string,
  limit = 6,
  maxKm = 30,
): NearbyLocation[] {
  const current = _raw.find(l => l.slug === slug)
  if (!current) return []

  const sorted = _raw
    .filter(l => l.slug !== slug)
    .map(l => ({
      slug: l.slug,
      name: l.name,
      distanceKm: haversineKm(current.lat, current.lng, l.lat, l.lng),
    }))
    .sort((a, b) => a.distanceKm - b.distanceKm)

  const within = sorted.filter(l => l.distanceKm <= maxKm)
  return (within.length >= 3 ? within : sorted).slice(0, limit)
}

/** Returns the raw location object for a slug */
export function getRawLocation(slug: string): RawLocation | undefined {
  return _raw.find(l => l.slug === slug)
}

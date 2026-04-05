/**
 * lib/profile-slugs.ts
 * Slug generation for counsellor and centre profile URLs.
 * 
 * Counsellors: /therapist/sarah-mitchell-manchester
 * Centres:     /centre/priory-hospital-london
 */

export function toProfileSlug(name: string, locationSlug: string): string {
  const nameSlug = name
    .toLowerCase()
    .replace(/['']/g, '')       // remove apostrophes
    .replace(/[^a-z0-9\s-]/g, '') // remove other special chars
    .replace(/\s+/g, '-')        // spaces to dashes
    .replace(/-+/g, '-')          // collapse multiple dashes
    .trim()
  return `${nameSlug}-${locationSlug}`
}

export function toCentreSlug(name: string, locationSlug?: string): string {
  const nameSlug = name
    .toLowerCase()
    .replace(/['']/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
  return locationSlug ? `${nameSlug}-${locationSlug}` : nameSlug
}

/** Seeded "currently viewing" counter — deterministic per hour, 3–11 range */
export function getLiveViewers(seed: string): number {
  let hash = 0
  for (let i = 0; i < seed.length; i++) {
    hash = ((hash << 5) - hash) + seed.charCodeAt(i)
    hash |= 0
  }
  const hour = Math.floor(Date.now() / 3_600_000)
  return ((Math.abs(hash) + hour) % 9) + 3
}

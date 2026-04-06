/**
 * lib/link-validator.ts
 *
 * Static-analysis link checker for SoberNation.
 *
 * Instead of making HTTP requests (slow, timeout-risky), we validate every
 * internal link against the site's own data sources in-process:
 *   - /counsellors/[location]   → locations.json
 *   - /rehab/[location]         → locations.json
 *   - /centres/[location]       → locations.json
 *   - /help/[location]          → locations.json
 *   - /centre/[slug]            → rehabs.json via _centreBySlug
 *   - /therapist/[slug]         → Supabase counsellors table
 *
 * Returns a structured report of every broken link found, with suggested fixes.
 */

import { createClient } from '@supabase/supabase-js'
import { getLocation, getAllLocations } from './locations'
import { getCentreBySlug, getAllCentreSlugs, getRehabTownSlugs } from './rehabs'

// ── Types ─────────────────────────────────────────────────────────────────────

export type ErrorType =
  | '404_location'
  | '404_centre'
  | '404_therapist'
  | '404_unknown'
  | 'invalid_slug'

export type IssueStatus = 'auto_fixed' | 'redirect_recommended' | 'unresolved'
export type Priority = 'high' | 'normal' | 'low'

export interface LinkIssue {
  sourcePage: string
  brokenUrl: string
  errorType: ErrorType
  status: IssueStatus
  suggestedFix: string | null
  priority: Priority
  notes: string
}

export interface ScanReport {
  scanId: string
  startedAt: Date
  finishedAt: Date
  totalLinksChecked: number
  totalIssues: number
  issues: LinkIssue[]
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

/** Levenshtein distance — used for fuzzy location matching */
function levenshtein(a: string, b: string): number {
  const dp: number[][] = Array.from({ length: a.length + 1 }, (_, i) =>
    Array.from({ length: b.length + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
  )
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      dp[i][j] = a[i - 1] === b[j - 1]
        ? dp[i - 1][j - 1]
        : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1])
    }
  }
  return dp[a.length][b.length]
}

/** Find the closest valid location slug for a broken one */
function findNearestLocation(badSlug: string): string | null {
  const allSlugs = getAllLocations().map(l => l.slug)
  let best: string | null = null
  let bestDist = Infinity
  for (const slug of allSlugs) {
    const d = levenshtein(badSlug, slug)
    // Only suggest if reasonably close (≤3 edits or shares a long prefix)
    if (d < bestDist && d <= 3) {
      bestDist = d
      best = slug
    }
  }
  return best
}

/** Find the closest valid centre slug for a broken one */
function findNearestCentreSlug(badSlug: string): string | null {
  const allSlugs = getAllCentreSlugs()
  let best: string | null = null
  let bestDist = Infinity
  for (const slug of allSlugs) {
    const d = levenshtein(badSlug, slug)
    if (d < bestDist && d <= 4) {
      bestDist = d
      best = slug
    }
  }
  return best
}

// ── Route pattern parsers ─────────────────────────────────────────────────────

/**
 * Classify an internal URL and validate its slug against live data.
 * Returns null if the link is valid, or a LinkIssue if broken.
 */
function checkUrl(url: string, sourcePage: string): LinkIssue | null {
  // Normalise: strip query params and hash
  const clean = url.split('?')[0].split('#')[0].replace(/\/$/, '') || '/'

  const locationRoutes = ['/counsellors/', '/rehab/', '/centres/', '/help/']
  const centreRoute = '/centre/'
  const therapistRoute = '/therapist/' // handled separately (needs DB)

  // ── Location-based routes ──────────────────────────────────────────────────
  for (const prefix of locationRoutes) {
    if (clean.startsWith(prefix)) {
      const slug = clean.slice(prefix.length).split('/')[0]
      if (!slug) return null // bare /counsellors/ — not a link we generate
      if (getLocation(slug)) return null // valid ✓

      const nearest = findNearestLocation(slug)
      return {
        sourcePage,
        brokenUrl: url,
        errorType: '404_location',
        status: nearest ? 'redirect_recommended' : 'unresolved',
        suggestedFix: nearest ? `${prefix}${nearest}` : null,
        priority: sourcePage.includes('/therapist/') || sourcePage === '/' ? 'high' : 'normal',
        notes: nearest
          ? `Location slug "${slug}" not found. Nearest match: "${nearest}"`
          : `Location slug "${slug}" not found. No close match — manual review needed.`,
      }
    }
  }

  // ── Centre profile pages ───────────────────────────────────────────────────
  if (clean.startsWith(centreRoute)) {
    const slug = clean.slice(centreRoute.length).split('/')[0]
    if (!slug) return null
    if (getCentreBySlug(slug)) return null // valid ✓

    const nearest = findNearestCentreSlug(slug)
    return {
      sourcePage,
      brokenUrl: url,
      errorType: '404_centre',
      status: nearest ? 'redirect_recommended' : 'unresolved',
      suggestedFix: nearest ? `/centre/${nearest}` : null,
      priority: 'normal',
      notes: nearest
        ? `Centre slug "${slug}" not found. Nearest match: "${nearest}"`
        : `Centre slug "${slug}" has no close match. Possibly a removed/renamed centre.`,
    }
  }

  // ── Therapist profiles — checked in batch separately ──────────────────────
  if (clean.startsWith(therapistRoute)) {
    // These are returned tagged for batch DB checking
    return {
      sourcePage,
      brokenUrl: url,
      errorType: '404_therapist',
      status: 'unresolved',
      suggestedFix: null,
      priority: 'high',
      notes: '__NEEDS_DB_CHECK__', // sentinel to trigger batch DB lookup
    }
  }

  return null // not a route we validate
}

// ── Link extraction ───────────────────────────────────────────────────────────

/**
 * Generate the universe of all internal URLs the site can produce.
 * We build this from the data sources directly rather than crawling.
 */
async function generateAllInternalLinks(): Promise<{ url: string; sourcePage: string; priority: Priority }[]> {
  const links: { url: string; sourcePage: string; priority: Priority }[] = []
  const supabase = getSupabase()

  // ── 1. All counsellor profile pages ───────────────────────────────────────
  const { data: counsellors } = await supabase
    .from('counsellors')
    .select('profile_slug, location_slug, name')
    .not('profile_slug', 'is', null)
    .limit(5000)

  for (const c of counsellors ?? []) {
    const slug = c.profile_slug
    if (!slug) continue
    const url = `/therapist/${slug}`
    // Also check the location link they embed
    const locUrl = `/counsellors/${c.location_slug}`
    links.push({ url, sourcePage: '/', priority: 'high' })
    links.push({ url: locUrl, sourcePage: url, priority: 'normal' })
  }

  // ── 2. All location pages ──────────────────────────────────────────────────
  const allLocations = getAllLocations()
  for (const loc of allLocations) {
    links.push({ url: `/rehab/${loc.slug}`, sourcePage: '/', priority: loc.population > 50000 ? 'high' : 'normal' })
    links.push({ url: `/help/${loc.slug}`, sourcePage: '/', priority: 'normal' })
    links.push({ url: `/counsellors/${loc.slug}`, sourcePage: `/rehab/${loc.slug}`, priority: 'normal' })
    links.push({ url: `/centres/${loc.slug}`, sourcePage: `/rehab/${loc.slug}`, priority: 'normal' })
  }

  // ── 3. All centre profile pages ────────────────────────────────────────────
  const townSlugs = getRehabTownSlugs()
  for (const townSlug of townSlugs) {
    links.push({ url: `/centres/${townSlug}`, sourcePage: `/rehab/${townSlug}`, priority: 'normal' })
  }

  // ── 4. Homepage links ──────────────────────────────────────────────────────
  links.push({ url: '/', sourcePage: 'root', priority: 'high' })

  return links
}

// ── DB validation for therapist slugs ─────────────────────────────────────────

async function validateTherapistSlugs(
  pendingIssues: LinkIssue[]
): Promise<LinkIssue[]> {
  const supabase = getSupabase()
  const therapistIssues = pendingIssues.filter(i => i.errorType === '404_therapist')
  if (therapistIssues.length === 0) return []

  const slugs = therapistIssues.map(i => i.brokenUrl.replace('/therapist/', ''))
  const { data: found } = await supabase
    .from('counsellors')
    .select('profile_slug')
    .in('profile_slug', slugs)

  const foundSet = new Set((found ?? []).map(r => r.profile_slug))
  const realBroken = therapistIssues.filter(i => {
    const slug = i.brokenUrl.replace('/therapist/', '')
    return !foundSet.has(slug)
  })

  // Try to find redirects for each broken slug (query by partial name match)
  const resolved: LinkIssue[] = []
  for (const issue of realBroken) {
    const brokenSlug = issue.brokenUrl.replace('/therapist/', '')
    // Extract name portion (before last hyphen-location)
    const parts = brokenSlug.split('-')
    const namePart = parts.slice(0, Math.max(2, parts.length - 1)).join(' ')

    const { data: similar } = await supabase
      .from('counsellors')
      .select('profile_slug, name, location_slug')
      .ilike('name', `%${namePart.split(' ')[0]}%`)
      .limit(3)

    const best = similar?.[0]
    resolved.push({
      ...issue,
      status: best?.profile_slug ? 'redirect_recommended' : 'unresolved',
      suggestedFix: best?.profile_slug ? `/therapist/${best.profile_slug}` : null,
      notes: best
        ? `Slug "${brokenSlug}" not found. Possible match: "${best.name}" at /therapist/${best.profile_slug}`
        : `Slug "${brokenSlug}" not found in database. Profile may have been removed.`,
    })
  }

  return resolved
}

// ── Main scan function ─────────────────────────────────────────────────────────

export async function runLinkScan(): Promise<ScanReport> {
  const scanId = crypto.randomUUID()
  const startedAt = new Date()

  const allLinks = await generateAllInternalLinks()

  // Deduplicate
  const seen = new Set<string>()
  const unique = allLinks.filter(l => {
    const key = `${l.sourcePage}::${l.url}`
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })

  const issues: LinkIssue[] = []
  const pendingTherapistCheck: LinkIssue[] = []

  // ── Static checks ─────────────────────────────────────────────────────────
  for (const link of unique) {
    const issue = checkUrl(link.url, link.sourcePage)
    if (!issue) continue

    if (issue.notes === '__NEEDS_DB_CHECK__') {
      pendingTherapistCheck.push({ ...issue, priority: link.priority })
    } else {
      issues.push({ ...issue, priority: link.priority })
    }
  }

  // ── DB-backed therapist slug validation ───────────────────────────────────
  const therapistIssues = await validateTherapistSlugs(pendingTherapistCheck)
  issues.push(...therapistIssues)

  const finishedAt = new Date()

  return {
    scanId,
    startedAt,
    finishedAt,
    totalLinksChecked: unique.length,
    totalIssues: issues.length,
    issues,
  }
}

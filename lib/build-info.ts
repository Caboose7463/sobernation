/**
 * lib/build-info.ts
 *
 * Provides build-time and data freshness information for use across all pages.
 *
 * BUILD_DATE  — set at Next.js build time (ISO string)
 * BUILD_MONTH — human-readable "Month Year" label for the "Last reviewed" badge
 * CQC_*       — CQC data freshness from the monthly GitHub Action
 *
 * Google's quality raters look for "Last reviewed/updated" dates on health content
 * as a key E-E-A-T signal. This keeps those dates accurate and auto-updating.
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const freshness = require('../data/freshness.json') as {
  cqcLastUpdated: string
  cqcLastUpdatedLabel: string
  source: string
  licence: string
}

/** ISO date string of the current Next.js build */
export const BUILD_DATE = new Date().toISOString()

/** Human-readable "Month YYYY" of the current build — e.g. "April 2026" */
export const BUILD_MONTH = new Date().toLocaleDateString('en-GB', {
  month: 'long',
  year: 'numeric',
})

/** "Month YYYY" of the last CQC data refresh */
export const CQC_DATA_DATE = freshness.cqcLastUpdatedLabel

/** Full ISO timestamp of the last CQC refresh */
export const CQC_UPDATED_ISO = freshness.cqcLastUpdated

/** CQC data attribution string */
export const CQC_ATTRIBUTION = `${freshness.source} · ${freshness.licence} · Updated ${freshness.cqcLastUpdatedLabel}`

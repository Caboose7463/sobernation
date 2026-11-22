/**
 * LastReviewed: "Last reviewed [date]" badge plus the CQC data date.
 *
 * Only pass `dataDate` when a person has actually reviewed the page on that date
 * (see REVIEWED_LABEL in lib/trust.ts). Never pass the build date: a date that
 * changes on every deploy is not a review date. Without `dataDate` the badge
 * shows only the CQC data date.
 *
 * Usage:
 *   <LastReviewed />                              // CQC data date only
 *   <LastReviewed dataDate={REVIEWED_LABEL} />    // real review date
 *   <LastReviewed compact dataDate={...} />       // small inline badge
 */

import { CQC_DATA_DATE } from '../lib/build-info'

interface Props {
  /** The real date this page was last reviewed, e.g. "22 November 2026" */
  dataDate?: string
  /** Compact single-line version for hero sections */
  compact?: boolean
}

export default function LastReviewed({ dataDate, compact }: Props) {
  const displayDate = dataDate

  if (compact) {
    if (!displayDate) return null
    return (
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          fontSize: 11,
          color: 'var(--text-light)',
          padding: '4px 10px',
          border: '1px solid var(--border)',
          borderRadius: 20,
          background: 'var(--white)',
        }}
      >
        Last reviewed {displayDate}
      </div>
    )
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '10px 14px',
        background: '#f0fdf9',
        border: '1px solid #c8e6df',
        borderRadius: 'var(--radius-sm)',
        marginBottom: 16,
      }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
        <path d="M9 12l2 2 4-4" stroke="#0f766e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="12" r="10" stroke="#0f766e" strokeWidth="2" />
      </svg>
      <div>
        {displayDate && (
          <span style={{ fontSize: 12, fontWeight: 700, color: '#0f766e', marginRight: 8 }}>
            Last reviewed {displayDate}
          </span>
        )}
        <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>
          CQC register data: {CQC_DATA_DATE}
        </span>
      </div>
    </div>
  )
}

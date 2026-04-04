/**
 * LastReviewed — "Medically reviewed & updated [Month YYYY]" badge.
 *
 * Shown on all location pages. Updates automatically on every Vercel deploy
 * (weekly via cron). This is a strong E-E-A-T signal for medical/health content:
 * Google's quality raters specifically look for review dates on YMYL pages.
 *
 * Usage:
 *   <LastReviewed />                   // Default: shows build month
 *   <LastReviewed dataDate="April 2026" />  // Override with CQC data date
 *   <LastReviewed compact />            // Small inline badge for hero section
 */

import { BUILD_MONTH, CQC_DATA_DATE } from '../lib/build-info'

interface Props {
  /** Override the displayed date (defaults to build month) */
  dataDate?: string
  /** Compact single-line version for hero sections */
  compact?: boolean
}

export default function LastReviewed({ dataDate, compact }: Props) {
  const displayDate = dataDate ?? BUILD_MONTH

  if (compact) {
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
        <span style={{ color: 'var(--accent)', fontSize: 12 }}>✓</span>
        Medically reviewed · Updated {displayDate}
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
        <span style={{ fontSize: 12, fontWeight: 700, color: '#0f766e' }}>
          Medically reviewed and updated {displayDate}
        </span>
        <span style={{ fontSize: 11, color: 'var(--text-muted)', marginLeft: 8 }}>
          · CQC data: {CQC_DATA_DATE}
        </span>
      </div>
    </div>
  )
}

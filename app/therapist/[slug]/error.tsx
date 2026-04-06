'use client'

import Link from 'next/link'

export default function TherapistError({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
      <div style={{ maxWidth: 480, textAlign: 'center' }}>
        <div style={{
          width: 56, height: 56, borderRadius: '50%',
          background: 'var(--accent-pale, #e6f4f1)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 20px',
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent, #1d6b5a)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
        </div>

        <h1 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text, #111827)', marginBottom: 8 }}>
          This page couldn&apos;t be loaded
        </h1>
        <p style={{ fontSize: 14, color: 'var(--text-muted, #6b7280)', lineHeight: 1.6, marginBottom: 28 }}>
          Something went wrong loading this profile. Please try again, or find another counsellor near you.
        </p>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={reset}
            style={{
              padding: '10px 20px', background: 'var(--accent, #1d6b5a)', color: '#fff',
              border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: 14, fontWeight: 600,
            }}
          >
            Try again
          </button>
          <Link
            href="/counsellors/london"
            style={{
              padding: '10px 20px', background: 'transparent', color: 'var(--text-muted, #6b7280)',
              border: '1px solid var(--border, #e5e7eb)', borderRadius: 8, fontSize: 14,
              textDecoration: 'none', fontWeight: 500,
            }}
          >
            Find a counsellor →
          </Link>
        </div>
      </div>
    </div>
  )
}

import Link from 'next/link'

export default function StoriesCTA() {
  return (
    <div style={{ borderTop: '1px solid var(--border)', background: 'var(--white)' }}>
      <div className="container-wide" style={{ padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
          <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>
            <strong style={{ color: 'var(--text)', fontWeight: 600 }}>Real UK recovery stories</strong> — shared by people on the same journey.
          </span>
        </div>

        <Link
          href="/sober-stories"
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: 'var(--accent)',
            border: '1px solid var(--border-mid)',
            padding: '7px 14px',
            borderRadius: 20,
            textDecoration: 'none',
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}
        >
          Read stories →
        </Link>

      </div>
    </div>
  )
}

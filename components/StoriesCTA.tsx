import Link from 'next/link'

export default function StoriesCTA() {
  return (
    <div style={{
      background: 'var(--accent-pale)',
      borderTop: '1px solid #c8e6df',
      padding: '14px 20px',
    }}>
      <div className="container-wide" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 18 }}>💬</span>
          <div>
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--accent)' }}>Read real UK recovery stories</span>
            <span style={{ fontSize: 13, color: 'var(--text-muted)', marginLeft: 6 }}>— real people, real journeys.</span>
          </div>
        </div>
        <Link
          href="/sober-stories"
          style={{
            fontSize: 12,
            fontWeight: 700,
            color: 'var(--accent)',
            background: 'var(--white)',
            border: '1px solid #c8e6df',
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

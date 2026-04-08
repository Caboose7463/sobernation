import Link from 'next/link'
import { IconMessageCircle } from '@/components/icons'

export default function CommunityCard() {
  return (
    <div style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', background: 'var(--bg-subtle)' }}>
      <div className="container-wide" style={{ padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 28, height: 28, borderRadius: 7, background: 'var(--accent-pale)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <IconMessageCircle size={14} color="var(--accent)" />
          </div>
          <div>
            <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>SoberNation Community</span>
            <span style={{ fontSize: 13, color: 'var(--text-muted)', marginLeft: 8 }}>— anonymous peer support, milestones &amp; daily check-ins.</span>
          </div>
        </div>

        <Link
          href="/community"
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: '#fff',
            background: 'var(--accent)',
            padding: '8px 18px',
            borderRadius: 20,
            textDecoration: 'none',
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}
        >
          Join the community →
        </Link>

      </div>
    </div>
  )
}

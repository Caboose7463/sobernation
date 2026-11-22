import Link from 'next/link'
import { SidebarAd } from './AdUnit'
import { HELPLINES as H } from '../lib/trust'

// Numbers and hours come from lib/trust.ts, checked on each service's own website.
const HELPLINES = [
  { ...H.frank, desc: 'Confidential drugs advice' },
  { ...H.drinkline, desc: 'National alcohol helpline' },
  { ...H.samaritans, desc: 'Free emotional support' },
  { ...H.na, desc: 'Drug recovery support' },
]

// withAd: adds the desktop only sidebar ad. The column then scrolls normally
// (not sticky) so the ad is never pinned on screen.
export default function HelplinesSidebar({ withAd = false }: { withAd?: boolean }) {
  return (
    <aside className={withAd ? 'helplines-sidebar helplines-sidebar--static' : 'helplines-sidebar'}>
      <div className="label" style={{ marginBottom: 14 }}>Helplines</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {HELPLINES.map(h => (
          <a
            key={h.tel}
            href={`tel:${h.tel}`}
            className="helpline-card"
          >
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{h.name}</div>
              <div style={{ fontSize: 11, color: 'var(--text-light)', marginTop: 1 }}>{h.desc}. {h.hours}</div>
            </div>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--accent)', whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums' }}>
              {h.number}
            </div>
          </a>
        ))}
      </div>
      <div style={{ marginTop: 16, padding: '12px 14px', background: 'var(--crisis)', borderRadius: 'var(--radius-sm)' }}>
        <div style={{ fontSize: 12, color: '#fff', fontWeight: 600, marginBottom: 4 }}>In immediate danger?</div>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.85)' }}>
          Call <a href="tel:999" style={{ color: '#fff', fontWeight: 700 }}>999</a> or go to your nearest A&E
        </div>
      </div>
      <div style={{ marginTop: 16, padding: '12px 14px', background: 'var(--bg-subtle)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)' }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>Quick links</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
          {[
            { label: 'Find rehab near you', href: '/rehab/london' },
            { label: 'AA meetings', href: '/aa-meetings/london' },
            { label: 'NA meetings', href: '/na-meetings/london' },
            { label: 'Sobriety calculator', href: '/sobriety-counter' },
            { label: 'Am I an alcoholic?', href: '/am-i-an-alcoholic' },
            { label: 'Withdrawal timeline', href: '/withdrawal-timeline' },
          ].map(l => (
            <Link key={l.href} href={l.href} style={{ fontSize: 12, color: 'var(--accent)', textDecoration: 'none', fontWeight: 500 }}>
              {l.label} →
            </Link>
          ))}
        </div>
      </div>
      {withAd && <SidebarAd />}
    </aside>
  )
}

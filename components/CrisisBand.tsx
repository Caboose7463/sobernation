/**
 * components/CrisisBand.tsx
 *
 * Compact crisis and helpline band rendered above the footer on every page (see app/layout.tsx).
 * Numbers and hours come from HELPLINES in lib/trust.ts, each checked on the service's own website.
 */
import Link from 'next/link'
import { HELPLINES, REVIEWED_LABEL } from '../lib/trust'

const SUPPORT = [HELPLINES.frank, HELPLINES.drinkline, HELPLINES.aa, HELPLINES.na, HELPLINES.ca, HELPLINES.alanon]

export default function CrisisBand() {
  return (
    <section aria-labelledby="crisis-band-title" style={{ background: '#fff7ed', borderTop: '1px solid #fed7aa', color: '#431407' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '22px 16px' }}>
        <h2 id="crisis-band-title" style={{ fontSize: 15, fontWeight: 800, margin: '0 0 10px' }}>
          Need help now?
        </h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 20px', fontSize: 14, lineHeight: 1.5, marginBottom: 12 }}>
          <span>
            <strong>Emergency:</strong> call <a href="tel:999" style={{ color: '#9a3412', fontWeight: 800 }}>999</a> if someone is in danger or has taken an overdose
          </span>
          <span>
            <strong>NHS 111:</strong> <a href="tel:111" style={{ color: '#9a3412', fontWeight: 800 }}>111</a> for urgent medical help, 24 hours
          </span>
          <span>
            <strong>Samaritans:</strong> <a href="tel:116123" style={{ color: '#9a3412', fontWeight: 800 }}>116 123</a>, free, 24 hours, every day
          </span>
        </div>
        <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: '6px 20px', fontSize: 13, lineHeight: 1.45 }}>
          {SUPPORT.map(h => (
            <li key={h.tel}>
              {h.name}:{' '}
              <a href={`tel:${h.tel}`} style={{ color: '#9a3412', fontWeight: 700, whiteSpace: 'nowrap' }}>{h.number}</a>
              <span style={{ color: '#7c2d12' }}> ({h.hours})</span>
            </li>
          ))}
        </ul>
        <p style={{ fontSize: 12, color: '#7c2d12', margin: '12px 0 0' }}>
          Numbers checked on each service&apos;s own website on {REVIEWED_LABEL}. Sober Nation is an information site, not a crisis service.{' '}
          <Link href="/editorial-policy#crisis" style={{ color: '#9a3412' }}>What to do in a crisis</Link>
        </p>
      </div>
    </section>
  )
}

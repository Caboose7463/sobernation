import Link from 'next/link'

interface LocationHeroProps {
  title: string
  subtitle?: string
  snippet: string         // 40-60 word direct answer — the featured snippet target
  locationName: string
  locationSlug: string
  pageType: 'help' | 'rehab' | 'aa-meetings' | 'na-meetings' | 'drug-treatment' | 'substance'
  hasCqcData: boolean
  centreCount?: number
}

const PAGE_LINKS = [
  { type: 'rehab', label: 'Rehab Centres', href: (s: string) => `/rehab/${s}`, icon: '🏥' },
  { type: 'aa-meetings', label: 'AA Meetings', href: (s: string) => `/aa-meetings/${s}`, icon: '🗣️' },
  { type: 'na-meetings', label: 'NA Meetings', href: (s: string) => `/na-meetings/${s}`, icon: '🤝' },
  { type: 'drug-treatment', label: 'Drug Treatment', href: (s: string) => `/drug-treatment/${s}`, icon: '💊' },
]

export default function LocationHero({
  title,
  subtitle,
  snippet,
  locationName,
  locationSlug,
  pageType,
  hasCqcData,
  centreCount,
}: LocationHeroProps) {
  return (
    <section style={{ background: 'var(--white)', borderBottom: '1px solid var(--border)', padding: '48px 20px 40px' }}>
      <div className="container-wide">
        <div style={{ maxWidth: 680 }}>
          {subtitle && <div className="label" style={{ marginBottom: 12 }}>{subtitle}</div>}

          <h1 style={{ fontSize: 'clamp(22px,4vw,36px)', fontWeight: 700, color: 'var(--text)', marginBottom: 16, lineHeight: 1.2, letterSpacing: '-0.02em' }}>
            {title}
          </h1>

          {/* SNIPPET TARGET: This paragraph is engineered to be pulled as a featured snippet */}
          <p style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 24, maxWidth: 620 }}>
            {snippet}
          </p>

          {/* CQC data badge */}
          {hasCqcData ? (
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 12px', background: '#eaf4f1', border: '1px solid #c8e6df', borderRadius: 20, fontSize: 12, color: 'var(--accent)', fontWeight: 600, marginBottom: 24 }}>
              ✓ {centreCount} CQC-registered service{centreCount !== 1 ? 's' : ''} listed
            </div>
          ) : (
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 12px', background: 'var(--bg-subtle)', border: '1px solid var(--border)', borderRadius: 20, fontSize: 12, color: 'var(--text-muted)', marginBottom: 24 }}>
              🔗 Linking to NHS & Frank local services
            </div>
          )}

          {/* Sub-page navigation (only on hub page) */}
          {pageType === 'help' && (
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {PAGE_LINKS.map(link => (
                <Link
                  key={link.type}
                  href={link.href(locationSlug)}
                  style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', background: 'var(--bg-subtle)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontSize: 13, fontWeight: 500, color: 'var(--text)', textDecoration: 'none' }}
                >
                  <span>{link.icon}</span>
                  {link.label}
                </Link>
              ))}
            </div>
          )}

          {/* Crisis bar for hub pages */}
          <div style={{ marginTop: 20, padding: '12px 16px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 'var(--radius-sm)', fontSize: 13, color: '#991b1b' }}>
            <strong>Need help now?</strong>{' '}
            <a href="tel:03001236600" style={{ color: '#991b1b', fontWeight: 700 }}>Call Frank free on 0300 123 6600</a> — available 24/7
          </div>
        </div>
      </div>
    </section>
  )
}

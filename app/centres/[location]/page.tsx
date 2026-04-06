/**
 * /centres/[location] — dedicated directory page for all treatment centres.
 * Shows every CQC-registered centre in the area + self-registered/claimed centres.
 * Mirrors /counsellors/[location] structure.
 */
import { notFound } from 'next/navigation'
import { getLocation } from '../../../lib/locations'
import { getRehabsForLocation, getCentreSlug } from '../../../lib/rehabs'
import type { Metadata } from 'next'
import Link from 'next/link'
import type { RehabCentre } from '../../../lib/rehabs'

export const revalidate = 3600

interface Props {
  params: Promise<{ location: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { location } = await params
  const loc = getLocation(location)
  if (!loc) return {}
  return {
    title: `Rehab & Addiction Treatment Centres in ${loc.name}`,
    description: `All CQC-registered rehab and drug & alcohol treatment centres in ${loc.name}. NHS and private addiction services, verified by the Care Quality Commission.`,
  }
}

function serviceTypeLabel(serviceType: string) {
  const st = serviceType.toLowerCase()
  if (st.includes('residential')) return { label: 'Residential', color: '#0f766e', bg: '#f0fdf9' }
  if (st.includes('substance') || st.includes('drug') || st.includes('alcohol'))
    return { label: 'Drug & Alcohol', color: '#1d4ed8', bg: '#eff6ff' }
  if (st.includes('mental health')) return { label: 'Mental Health', color: '#7e22ce', bg: '#faf5ff' }
  return { label: 'Addiction Service', color: '#064e3b', bg: '#f0fdf4' }
}

function isPrivate(name: string, serviceType: string): boolean {
  const n = name.toLowerCase()
  const s = serviceType.toLowerCase()
  const nhsIndicators = ['nhs', 'trust', 'change grow live', 'turning point', 'cgl', 'with you', 'forward leeds', 'swanswell']
  return !nhsIndicators.some(kw => n.includes(kw) || s.includes(kw))
}

function CentreCard({ centre, townSlug }: { centre: RehabCentre; townSlug: string }) {
  const badge = serviceTypeLabel(centre.serviceType)
  const private_ = isPrivate(centre.name, centre.serviceType)
  const slug = getCentreSlug(centre, townSlug)
  const initials = centre.name.split(' ').filter(Boolean).slice(0, 2).map(w => w[0]).join('').toUpperCase()
  const specs = centre.specialism ? centre.specialism.split('|').slice(0, 2).map(s => s.trim()).filter(Boolean) : []

  return (
    <Link
      href={`/centre/${slug}`}
      style={{
        background: '#fff',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-md)',
        padding: '18px 20px',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        textDecoration: 'none',
        color: 'inherit',
        transition: 'border-color 0.15s, box-shadow 0.15s, transform 0.15s',
        cursor: 'pointer',
      }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#1d4ed8'; (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 16px rgba(29,78,216,0.10)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)' }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; (e.currentTarget as HTMLElement).style.transform = '' }}
    >
      {/* Top row: logo + name */}
      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
        <div style={{
          width: 44, height: 44, borderRadius: 10, flexShrink: 0,
          background: 'linear-gradient(135deg, #1d4ed8, #2563eb)',
          color: '#fff', fontSize: 14, fontWeight: 700,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {initials}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', lineHeight: 1.3 }}>
            {centre.name}
          </div>
          {centre.address && (
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>
              {centre.address}{centre.postcode ? `, ${centre.postcode}` : ''}
            </div>
          )}
        </div>
      </div>

      {/* Tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
        <span style={{ fontSize: 11, padding: '3px 8px', borderRadius: 20, fontWeight: 500, background: badge.bg, color: badge.color }}>
          {badge.label}
        </span>
        <span style={{ fontSize: 11, padding: '3px 8px', borderRadius: 20, fontWeight: 500, background: private_ ? '#fef3c7' : '#f0fdf4', color: private_ ? '#92400e' : '#166534' }}>
          {private_ ? 'Private' : 'NHS'}
        </span>
        {specs.map(s => (
          <span key={s} style={{ fontSize: 11, padding: '3px 8px', borderRadius: 20, fontWeight: 500, background: '#f9fafb', color: '#4b5563' }}>{s}</span>
        ))}
      </div>

      {/* Footer */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 10, fontWeight: 700, color: '#1d4ed8', background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 20, padding: '2px 8px' }}>
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#1d4ed8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            <polyline points="9,12 11,14 15,10"/>
          </svg>
          CQC Registered
        </div>
        <span style={{ fontSize: 12, fontWeight: 600, color: '#1d4ed8' }}>View centre →</span>
      </div>
    </Link>
  )
}


export default async function CentresLocationPage({ params }: Props) {
  const { location } = await params
  const loc = getLocation(location)
  if (!loc) notFound()

  const result = getRehabsForLocation(location, loc.name)
  const centres = result.centres

  return (
    <div style={{ minHeight: '100vh', background: 'var(--white)' }}>
      <style>{`
        .ct-hero { border-bottom: 1px solid var(--border); padding: 48px 20px 40px; }
        .ct-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 12px; }
        @media (max-width: 640px) { .ct-grid { grid-template-columns: 1fr; } }
        .ct-claim {
          background: var(--accent-pale);
          border: 1px solid #c8e6df;
          border-radius: var(--radius-md);
          padding: 18px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
          margin-bottom: 32px;
        }
        .ct-cqc-badge {
          display: flex; align-items: center; gap: 8px;
          padding: 8px 12px; background: #eff6ff;
          border: 1px solid #bfdbfe; border-radius: var(--radius-sm);
          margin-bottom: 20px; width: fit-content;
          font-size: 12px; color: #1e40af; font-weight: 500;
        }
      `}</style>

      {/* Hero */}
      <div className="ct-hero">
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <nav style={{ fontSize: 12, color: 'var(--text-light)', marginBottom: 14 }}>
            <Link href="/" style={{ color: 'var(--text-light)', textDecoration: 'none' }}>Home</Link>
            {' / '}
            <Link href={`/rehab/${location}`} style={{ color: 'var(--text-light)', textDecoration: 'none' }}>Rehab in {loc.name}</Link>
            {' / '}
            <span>All centres</span>
          </nav>
          <h1 style={{ fontSize: 'clamp(22px,4vw,34px)', fontWeight: 700, color: 'var(--text)', marginBottom: 10, letterSpacing: '-0.02em' }}>
            {result.isFallback
              ? `Treatment centres near ${loc.name}`
              : `Rehab & treatment centres in ${loc.name}`}
          </h1>
          <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: 580, margin: 0 }}>
            {result.isFallback
              ? `Showing ${centres.length} CQC-registered services in ${result.sourceArea} — the nearest area with data.`
              : `${centres.length} CQC-registered NHS and private addiction treatment services.`}
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 1080, margin: '0 auto', padding: '40px 20px' }}>

        {/* Claim CTA */}
        <div className="ct-claim">
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--accent)', marginBottom: 4 }}>
              Do you operate a treatment centre in {loc.name}?
            </div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
              Claim your verified listing and manage your information — from £30/month.
            </div>
          </div>
          <Link
            href={`/counsellors/claim?location=${location}&type=centre`}
            style={{ fontSize: 13, fontWeight: 600, background: 'var(--accent)', color: '#fff', padding: '8px 16px', borderRadius: 'var(--radius-sm)', textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}
          >
            Claim your listing →
          </Link>
        </div>

        {/* CQC badge */}
        <div className="ct-cqc-badge">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1e40af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
          All centres are registered with the Care Quality Commission (CQC)
        </div>

        {/* Grid */}
        {centres.length > 0 ? (
          <div className="ct-grid">
            {centres.map((centre, i) => (
              <CentreCard key={centre.cqcUrl || i} centre={centre} townSlug={result.sourceTownSlug} />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
            <div style={{ marginBottom: 8 }}>No centres listed for {loc.name} yet.</div>
            <a href="https://www.talktofrank.com/get-help/find-support-near-you" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', fontWeight: 600 }}>
              Try the Frank NHS service finder →
            </a>
          </div>
        )}

        {/* Footer links */}
        <div style={{ marginTop: 40, paddingTop: 24, borderTop: '1px solid var(--border)', display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <Link href={`/rehab/${location}`} style={{ fontSize: 13, color: 'var(--text-muted)', textDecoration: 'none' }}>← Back to rehab in {loc.name}</Link>
          <Link href={`/counsellors/${location}`} style={{ fontSize: 13, color: 'var(--text-muted)', textDecoration: 'none' }}>Counsellors in {loc.name}</Link>
          <a href="https://www.talktofrank.com/get-help/find-support-near-you" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: 'var(--text-muted)', textDecoration: 'none' }}>Frank service finder</a>
        </div>
      </div>
    </div>
  )
}

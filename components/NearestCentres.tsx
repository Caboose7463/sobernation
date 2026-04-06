/**
 * NearestCentres — shows CQC-registered rehab/drug services on every location page.
 *
 * Uses result.sourceTownSlug (the actual data town) to generate correct /centre/[slug] links.
 * Matches the visual style of CounsellorCard.
 */

import Link from 'next/link'
import type { RehabsResult, RehabCentre } from '../lib/rehabs'
import { getCentreSlug } from '../lib/rehabs'

interface Props {
  result: RehabsResult
  locationName: string
  locationSlug: string
  /** Max number of centres to display */
  limit?: number
}

function serviceTypeLabel(serviceType: string): { label: string; color: string; bg: string } {
  const st = serviceType.toLowerCase()
  if (st.includes('residential')) return { label: 'Residential', color: '#0f766e', bg: '#f0fdf9' }
  if (st.includes('substance') || st.includes('drug') || st.includes('alcohol'))
    return { label: 'Drug & Alcohol', color: '#1d4ed8', bg: '#eff6ff' }
  if (st.includes('mental health')) return { label: 'Mental Health', color: '#7e22ce', bg: '#faf5ff' }
  if (st.includes('community')) return { label: 'Community', color: '#854d0e', bg: '#fefce8' }
  return { label: 'Addiction Service', color: '#064e3b', bg: '#f0fdf4' }
}

function isPrivate(name: string, serviceType: string): boolean {
  const n = name.toLowerCase()
  const s = serviceType.toLowerCase()
  const nhsIndicators = ['nhs', 'trust', 'change grow live', 'turning point', 'cgl', 'with you', 'forward leeds', 'swanswell']
  return !nhsIndicators.some(kw => n.includes(kw) || s.includes(kw))
}

function CentreCard({ centre, sourceTownSlug }: { centre: RehabCentre; sourceTownSlug: string }) {
  const badge = serviceTypeLabel(centre.serviceType)
  const private_ = isPrivate(centre.name, centre.serviceType)
  // Use the actual stored town slug — NOT the location slug — so the link resolves correctly
  const slug = getCentreSlug(centre, sourceTownSlug)
  const initials = centre.name.split(' ').filter(Boolean).slice(0, 2).map(w => w[0]).join('').toUpperCase()
  const specs = centre.specialism ? centre.specialism.split('|').slice(0, 3).map(s => s.trim()).filter(Boolean) : []

  return (
    <Link
      href={`/centre/${slug}`}
      style={{
        background: 'var(--white)',
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
        {specs.slice(0, 2).map(s => (
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

export default function NearestCentres({ result, locationName, locationSlug, limit = 8 }: Props) {
  const displayed = result.centres.slice(0, limit)
  const total = result.centres.length

  return (
    <div style={{ marginTop: 40 }}>
      {/* Section header */}
      <div style={{ marginBottom: 14 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>
          {result.isFallback
            ? `Nearest rehab centres to ${locationName}`
            : `Rehab & addiction centres in ${locationName}`}
        </h2>

        {/* Prominent fallback notice — makes it crystal clear these are from a different area */}
        {result.isFallback ? (
          <div style={{
            display: 'flex', alignItems: 'flex-start', gap: 10,
            padding: '10px 14px', marginBottom: 12,
            background: '#fffbeb', border: '1px solid #fcd34d',
            borderRadius: 'var(--radius-sm)',
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#92400e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}>
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
              <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
            <div style={{ fontSize: 13, color: '#92400e', lineHeight: 1.5 }}>
              <strong>No CQC-registered centres found in {locationName}.</strong>{' '}
              Showing {total} services from <strong>{result.sourceArea}</strong>
              {result.distanceKm < 999 ? ` — the nearest area with registered treatment data (${Math.round(result.distanceKm)} km away)` : ''}.
              These centres may accept referrals from {locationName}.
            </div>
          </div>
        ) : (
          <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
            {total} CQC-registered NHS and private addiction treatment services in {locationName}.
          </p>
        )}
      </div>

      {/* Centre cards grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 12 }}>
        {displayed.map((centre, i) => (
          // Pass sourceTownSlug so slug generation matches how centres are stored
          <CentreCard key={centre.cqcUrl || i} centre={centre} sourceTownSlug={result.sourceTownSlug} />
        ))}
      </div>

      {/* View all / Frank fallback */}
      <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
        {total > limit && (
          <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Showing {limit} of {total} services.</span>
        )}
        <Link
          href={`/centres/${result.sourceTownSlug}`}
          style={{ fontSize: 13, fontWeight: 600, color: 'var(--accent)', textDecoration: 'none' }}
        >
          View all {total} centres →
        </Link>
      </div>

      {/* Frank NHS fallback */}
      <div style={{
        marginTop: 20, padding: '14px 16px',
        background: 'var(--accent-pale)', border: '1px solid #c8e6df',
        borderRadius: 'var(--radius-md)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexWrap: 'wrap', gap: 12,
      }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--accent)', marginBottom: 2 }}>
            Can&apos;t find what you need?
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
            Frank&apos;s NHS service finder covers every drug &amp; alcohol service in the UK.
          </div>
        </div>
        <a
          href="https://www.talktofrank.com/get-help/find-support-near-you"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: 13, fontWeight: 700, padding: '10px 16px',
            background: 'var(--accent)', color: '#fff',
            borderRadius: 'var(--radius-sm)', textDecoration: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          Frank service finder →
        </a>
      </div>
    </div>
  )
}

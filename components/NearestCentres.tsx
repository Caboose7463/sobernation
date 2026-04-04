/**
 * NearestCentres — shows CQC-registered rehab/drug services on every location page.
 *
 * For locations with direct CQC data: "Rehab centres in [Location]"
 * For fallback locations: "Nearest rehab centres to [Location]"
 *
 * Each card links to the CQC profile + shows name/address/phone/type.
 * Private AND NHS centres are both included (CQC regulates both).
 */

import type { RehabsResult, RehabCentre } from '../lib/rehabs'

interface Props {
  result: RehabsResult
  locationName: string
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
  // NHS orgs typically mention NHS, Trust, Community Health, Change Grow Live etc.
  const nhsIndicators = ['nhs', 'trust', 'change grow live', 'turning point', 'cgl', 'with you', 'forward leeds', 'swanswell']
  return !nhsIndicators.some(kw => n.includes(kw) || s.includes(kw))
}

function CentreCard({ centre }: { centre: RehabCentre }) {
  const badge = serviceTypeLabel(centre.serviceType)
  const private_ = isPrivate(centre.name, centre.serviceType)

  return (
    <div style={{
      background: '#fff',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-md)',
      padding: '16px 18px',
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
    }}>
      {/* Name row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', lineHeight: 1.3 }}>
          {centre.name}
        </div>
        <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
          <span style={{
            fontSize: 10, fontWeight: 700, padding: '3px 7px', borderRadius: 20,
            background: badge.bg, color: badge.color, whiteSpace: 'nowrap',
          }}>
            {badge.label}
          </span>
          {private_ && (
            <span style={{
              fontSize: 10, fontWeight: 700, padding: '3px 7px', borderRadius: 20,
              background: '#fef3c7', color: '#92400e', whiteSpace: 'nowrap',
            }}>
              Private
            </span>
          )}
        </div>
      </div>

      {/* Address */}
      {centre.address && (
        <div style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.5 }}>
          📍 {centre.address}{centre.postcode ? `, ${centre.postcode}` : ''}
        </div>
      )}

      {/* Specialism */}
      {centre.specialism && (
        <div style={{ fontSize: 11, color: 'var(--text-light)', lineHeight: 1.4 }}>
          Specialisms: {centre.specialism.split('|').slice(0, 3).join(' · ')}
        </div>
      )}

      {/* Actions */}
      <div style={{ display: 'flex', gap: 8, marginTop: 4, flexWrap: 'wrap' }}>
        {centre.phone && (
          <a
            href={`tel:${centre.phone.replace(/\s/g, '')}`}
            style={{
              fontSize: 12, fontWeight: 600, color: 'var(--accent)',
              textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4,
            }}
          >
            📞 {centre.phone}
          </a>
        )}
        {centre.cqcUrl && centre.cqcUrl.includes('cqc.org.uk') && (
          <a
            href={centre.cqcUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: 11, color: 'var(--text-light)', textDecoration: 'none',
              border: '1px solid var(--border)', borderRadius: 20,
              padding: '2px 10px', display: 'inline-flex', alignItems: 'center', gap: 4,
            }}
          >
            CQC profile ↗
          </a>
        )}
        {centre.website && (
          <a
            href={centre.website.startsWith('http') ? centre.website : `https://${centre.website}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: 11, color: 'var(--text-light)', textDecoration: 'none',
              border: '1px solid var(--border)', borderRadius: 20,
              padding: '2px 10px',
            }}
          >
            Website ↗
          </a>
        )}
      </div>
    </div>
  )
}

export default function NearestCentres({ result, locationName, limit = 8 }: Props) {
  const displayed = result.centres.slice(0, limit)
  const total = result.centres.length

  return (
    <div style={{ marginTop: 40 }}>
      {/* Section header */}
      <div style={{ marginBottom: 16 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>
          {result.isFallback
            ? `Nearest rehab & addiction centres to ${locationName}`
            : `Rehab & addiction centres in ${locationName}`}
        </h2>
        {result.isFallback ? (
          <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
            Showing{' '}
            <strong>{total} CQC-registered services in {result.sourceArea}</strong>
            {result.distanceKm < 100
              ? ` — approximately ${result.distanceKm}km from ${locationName}`
              : ''}.
            {' '}Many of these services accept referrals and self-referrals from across the region.
          </p>
        ) : (
          <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
            {total} CQC-registered NHS and private addiction treatment services in {locationName}.
            All services are regulated by the Care Quality Commission.
          </p>
        )}
      </div>

      {/* CQC trust badge */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '8px 12px', background: '#eff6ff',
        border: '1px solid #bfdbfe', borderRadius: 'var(--radius-sm)',
        marginBottom: 16, width: 'fit-content',
      }}>
        <span style={{ fontSize: 12 }}>🏛️</span>
        <span style={{ fontSize: 12, color: '#1e40af', fontWeight: 500 }}>
          All centres are registered with the Care Quality Commission (CQC)
          — England's independent health & social care regulator.
        </span>
      </div>

      {/* Centre cards grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 12 }}>
        {displayed.map((centre, i) => (
          <CentreCard key={centre.cqcUrl || i} centre={centre} />
        ))}
      </div>

      {/* Show more / Frank link */}
      {total > limit && (
        <div style={{ marginTop: 16, fontSize: 13, color: 'var(--text-muted)' }}>
          Showing {limit} of {total} services.{' '}
          <a
            href={`https://www.nhs.uk/service-search/find-a-drug-or-alcohol-service/`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--accent)', fontWeight: 600, textDecoration: 'none' }}
          >
            Find all NHS services near you →
          </a>
        </div>
      )}

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
            Frank&apos;s NHS service finder includes every drug &amp; alcohol service in the UK.
            Free, confidential and available 24/7.
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

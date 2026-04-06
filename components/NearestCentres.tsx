/**
 * NearestCentres — shows CQC-registered rehab/drug services on every location page.
 */

import Link from 'next/link'
import type { RehabsResult, RehabCentre } from '../lib/rehabs'
import { getCentreSlug } from '../lib/rehabs'

interface Props {
  result: RehabsResult
  locationName: string
  locationSlug: string
  limit?: number
}

function fundingLabel(name: string, serviceType: string): string {
  const n = name.toLowerCase()
  const s = serviceType.toLowerCase()
  const nhsKw = ['nhs', 'trust', 'change grow live', 'turning point', 'cgl', 'with you', 'forward leeds', 'swanswell']
  return nhsKw.some(kw => n.includes(kw) || s.includes(kw)) ? 'NHS' : 'Private'
}

function typeLabel(serviceType: string): string {
  const s = serviceType.toLowerCase()
  if (s.includes('residential')) return 'Residential'
  if (s.includes('mental health')) return 'Mental Health'
  if (s.includes('community')) return 'Community'
  return 'Addiction Service'
}

function CentreRow({ centre, sourceTownSlug }: { centre: RehabCentre; sourceTownSlug: string }) {
  const slug = getCentreSlug(centre, sourceTownSlug)
  const funding = fundingLabel(centre.name, centre.serviceType)
  const type = typeLabel(centre.serviceType)

  return (
    <Link
      href={`/centre/${slug}`}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '14px 0',
        borderBottom: '1px solid var(--border)',
        textDecoration: 'none',
        gap: 16,
      }}
    >
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: 2, lineHeight: 1.3 }}>
          {centre.name}
        </div>
        <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
          {[type, funding, centre.address ? centre.address.split(',')[0] : null]
            .filter(Boolean).join(' · ')}
        </div>
      </div>
      <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--accent)', whiteSpace: 'nowrap', flexShrink: 0 }}>
        View →
      </span>
    </Link>
  )
}

function FeaturedPlaceholder({ locationName }: { locationName: string }) {
  return (
    <div style={{
      padding: '14px 16px',
      border: '1px solid var(--border)',
      borderLeft: '3px solid var(--accent)',
      borderRadius: 8,
      marginBottom: 8,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 16,
      background: 'var(--white)',
    }}>
      <div>
        <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--text-light)', marginBottom: 4 }}>
          Featured listing
        </div>
        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: 2 }}>
          Your centre in {locationName}
        </div>
        <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
          Appear at the top of this page for people seeking help near you
        </div>
      </div>
      <Link
        href="/counsellors/claim?type=centre"
        style={{
          fontSize: 12, fontWeight: 700,
          color: 'var(--accent)',
          border: '1.5px solid var(--accent)',
          borderRadius: 6,
          padding: '7px 14px',
          textDecoration: 'none',
          whiteSpace: 'nowrap',
          flexShrink: 0,
        }}
      >
        Get featured →
      </Link>
    </div>
  )
}

export default function NearestCentres({ result, locationName, locationSlug, limit = 8 }: Props) {
  const displayed = result.centres.slice(0, limit)
  const total = result.centres.length

  return (
    <div style={{ marginTop: 40 }}>
      {/* Section header */}
      <div style={{ marginBottom: 16 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>
          {result.isFallback
            ? `Nearest rehab centres to ${locationName}`
            : `Rehab & addiction centres in ${locationName}`}
        </h2>

        {result.isFallback ? (
          <div style={{
            display: 'flex', alignItems: 'flex-start', gap: 10,
            padding: '10px 14px', marginBottom: 4,
            background: '#fffbeb', border: '1px solid #fcd34d',
            borderRadius: 6,
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#92400e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }}>
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
              <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
            <div style={{ fontSize: 12, color: '#92400e', lineHeight: 1.5 }}>
              <strong>No CQC-registered centres in {locationName}.</strong>{' '}
              Showing {total} from <strong>{result.sourceArea}</strong>
              {result.distanceKm < 999 ? ` (${Math.round(result.distanceKm)} km away)` : ''} — these centres may accept referrals.
            </div>
          </div>
        ) : (
          <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: 0 }}>
            {total} CQC-registered services in {locationName}.
          </p>
        )}
      </div>

      {/* Featured placeholder */}
      <FeaturedPlaceholder locationName={locationName} />

      {/* Centre list */}
      <div style={{ borderTop: '1px solid var(--border)' }}>
        {displayed.map((centre, i) => (
          <CentreRow key={centre.cqcUrl || i} centre={centre} sourceTownSlug={result.sourceTownSlug} />
        ))}
      </div>

      {/* Footer */}
      <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
        {total > limit && (
          <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Showing {limit} of {total}</span>
        )}
        <Link
          href={`/centres/${locationSlug}`}
          style={{ fontSize: 13, fontWeight: 600, color: 'var(--accent)', textDecoration: 'none' }}
        >
          View all {total} centres →
        </Link>
      </div>

      {/* Frank NHS fallback */}
      <div style={{
        marginTop: 20, padding: '14px 16px',
        background: 'var(--accent-pale)', border: '1px solid #c8e6df',
        borderRadius: 6,
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
            fontSize: 13, fontWeight: 700, padding: '9px 16px',
            background: 'var(--accent)', color: '#fff',
            borderRadius: 6, textDecoration: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          Frank service finder →
        </a>
      </div>
    </div>
  )
}

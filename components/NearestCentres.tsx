/**
 * NearestCentres — shows CQC-registered rehab centres on location pages.
 *
 * Sponsored slots (from the auction engine) appear above this section.
 * This component renders only the organic flat list — no verified labels,
 * no ranking manipulation, no fold. Just a clean directory.
 */

import Link from 'next/link'
import Image from 'next/image'
import type { RehabsResult, RehabCentre } from '../lib/rehabs'
import { getCorrectCentreSlug, getCentreImage } from '../lib/rehabs'
import SponsoredSlots from './SponsoredSlots'

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

// Clean organic listing card — no verified badges, no ranking logic
function CentreRow({ centre, sourceTownSlug }: { centre: RehabCentre; sourceTownSlug: string }) {
  const slug = getCorrectCentreSlug(centre, sourceTownSlug)
  const funding = fundingLabel(centre.name, centre.serviceType)
  const type = typeLabel(centre.serviceType)
  const initials = centre.name.split(' ').filter(Boolean).slice(0, 2).map((w: string) => w[0]).join('').toUpperCase()
  const imageUrl = getCentreImage(centre.cqcUrl)

  return (
    <Link
      href={`/centre/${slug}`}
      style={{
        display: 'flex', alignItems: 'center', gap: 14,
        padding: '13px 16px', border: '1px solid var(--border)',
        borderRadius: 10, textDecoration: 'none',
        background: 'var(--white)', transition: 'border-color 0.15s',
      }}
    >
      {/* Avatar */}
      <div style={{
        width: 40, height: 40, borderRadius: 8, flexShrink: 0,
        background: 'var(--accent-pale)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 13, fontWeight: 700, color: 'var(--accent)',
        border: '1px solid var(--border)',
        overflow: 'hidden', position: 'relative',
      }}>
        {imageUrl
          ? <Image src={imageUrl} alt={centre.name} fill sizes="40px" style={{ objectFit: 'contain', padding: 3 }} />
          : initials}
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', lineHeight: 1.3, marginBottom: 2 }}>
          {centre.name}
        </div>
        <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
          {[type, funding, centre.address ? centre.address.split(',')[0] : null].filter(Boolean).join(' · ')}
        </div>
      </div>

      <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="var(--text-muted)" strokeWidth="1.5">
        <path d="M7 4l6 6-6 6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </Link>
  )
}

export default async function NearestCentres({ result, locationName, locationSlug, limit = 5 }: Props) {
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
        <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: 0 }}>
          {result.isFallback
            ? `Showing ${total} CQC-registered centres from ${result.sourceArea}${result.distanceKm < 999 ? ` (${Math.round(result.distanceKm)} km away)` : ''} — these centres may accept referrals.`
            : `${total} CQC-registered services in ${locationName}.`}
        </p>
      </div>

      {/* ── Sponsored slots — auction runs fresh on each request ── */}
      <SponsoredSlots locationSlug={locationSlug} listingType="centre" />

      {/* ── Promote CTA — above organic list ── */}
      <Link
        href="/advertise"
        style={{
          display: 'flex', alignItems: 'center', gap: 14,
          padding: '13px 16px', marginBottom: 8,
          border: '1px dashed var(--border-mid)',
          borderRadius: 10, textDecoration: 'none',
          background: 'var(--bg)', transition: 'border-color 0.15s',
        }}
      >
        <div style={{
          width: 40, height: 40, borderRadius: 8,
          background: 'var(--accent-pale)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
          </svg>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--accent)', marginBottom: 1 }}>Promote your centre here</div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Appear above organic results · Pay per click · Cancel anytime</div>
        </div>
        <span style={{ fontSize: 12, fontWeight: 700, color: '#fff', background: 'var(--accent)', padding: '5px 12px', borderRadius: 6, flexShrink: 0, whiteSpace: 'nowrap' }}>Get started →</span>
      </Link>

      {/* ── Organic list — flat, unranked ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {displayed.map((centre, i) => (
          <CentreRow key={centre.cqcUrl || i} centre={centre} sourceTownSlug={result.sourceTownSlug} />
        ))}
      </div>

      {/* Footer */}
      <div style={{ marginTop: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
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
        marginTop: 32, padding: '16px 18px',
        background: 'var(--accent-pale)', border: '1px solid #c8e6df',
        borderRadius: 8,
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

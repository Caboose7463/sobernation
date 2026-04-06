/**
 * NearestCentres — shows CQC-registered rehab/drug services on every location page.
 * - Blue verified tick on avatar overlay for CQC-registered centres
 * - 'Verified' / 'Not Verified' replaces 'View →' button
 * - Fallback orange warning box removed
 */

import Link from 'next/link'
import type { RehabsResult, RehabCentre } from '../lib/rehabs'
import { getCorrectCentreSlug, getCentreImage } from '../lib/rehabs'
import Image from 'next/image'

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

// Only the first centre per list is shown as verified
function CentreRow({ centre, sourceTownSlug, index }: { centre: RehabCentre; sourceTownSlug: string; index: number }) {
  const slug = getCorrectCentreSlug(centre, sourceTownSlug)
  const funding = fundingLabel(centre.name, centre.serviceType)
  const type = typeLabel(centre.serviceType)
  const initials = centre.name.split(' ').filter(Boolean).slice(0, 2).map((w: string) => w[0]).join('').toUpperCase()
  const imageUrl = getCentreImage(centre.cqcUrl)
  const verified = index === 0  // only first in each list

  if (verified && centre.website) {
    return (
      <a
        href={centre.website}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'flex', alignItems: 'center', gap: 14,
          padding: '14px 16px', border: '1px solid var(--border)',
          borderRadius: 10, textDecoration: 'none',
          background: 'var(--white)', transition: 'border-color 0.15s, box-shadow 0.15s',
        }}
      >
        <div style={{ position: 'relative', flexShrink: 0, width: 44, height: 44 }}>
          <div style={{ width: 44, height: 44, borderRadius: 10, background: 'var(--accent-pale, #e6f4f1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: 'var(--accent, #1d6b5a)', letterSpacing: '-0.5px', overflow: 'hidden', position: 'relative', border: '1px solid var(--border)' }}>
            {imageUrl ? (
              <Image src={imageUrl} alt={`${centre.name} logo`} fill sizes="44px" style={{ objectFit: 'contain', padding: 4 }} />
            ) : initials}
          </div>
          <span style={{ position: 'absolute', bottom: -3, right: -3, width: 16, height: 16, borderRadius: '50%', background: '#1d9bf0', border: '2px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="8" height="8" viewBox="0 0 10 10" fill="none"><polyline points="2,5 4.2,7.5 8,3" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </span>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', lineHeight: 1.3, marginBottom: 3 }}>{centre.name}</div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{[type, funding, centre.address ? centre.address.split(',')[0] : null].filter(Boolean).join(' · ')}</div>
        </div>
        <span style={{ fontSize: 12, fontWeight: 700, color: '#16a34a', whiteSpace: 'nowrap', flexShrink: 0 }}>Verified ↗</span>
      </a>
    )
  }

  return (
    <Link
      href={`/centre/${slug}`}
      style={{
        display: 'flex', alignItems: 'center', gap: 14,
        padding: '14px 16px', border: '1px solid var(--border)',
        borderRadius: 10, textDecoration: 'none',
        background: 'var(--white)', transition: 'border-color 0.15s, box-shadow 0.15s',
      }}
    >
      <div style={{ position: 'relative', flexShrink: 0, width: 44, height: 44 }}>
        <div style={{ width: 44, height: 44, borderRadius: 10, background: 'var(--accent-pale, #e6f4f1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: 'var(--accent, #1d6b5a)', letterSpacing: '-0.5px', overflow: 'hidden', position: 'relative', border: '1px solid var(--border)' }}>
          {imageUrl ? (
            <Image src={imageUrl} alt={`${centre.name} logo`} fill sizes="44px" style={{ objectFit: 'contain', padding: 4 }} />
          ) : initials}
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', lineHeight: 1.3, marginBottom: 3 }}>{centre.name}</div>
        <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{[type, funding, centre.address ? centre.address.split(',')[0] : null].filter(Boolean).join(' · ')}</div>
      </div>
      <span style={{ fontSize: 12, fontWeight: 400, color: '#9ca3af', whiteSpace: 'nowrap', flexShrink: 0 }}>Not Verified</span>
    </Link>
  )
}

export default function NearestCentres({ result, locationName, locationSlug, limit = 5 }: Props) {
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

        {/* Subtitle — just the count, no yellow warning box */}
        <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: 0 }}>
          {result.isFallback
            ? `Showing ${total} CQC-registered centres from ${result.sourceArea}${result.distanceKm < 999 ? ` (${Math.round(result.distanceKm)} km away)` : ''} — these centres may accept referrals.`
            : `${total} CQC-registered services in ${locationName}.`}
        </p>
      </div>

      {/* Centre list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {displayed.map((centre, i) => (
          <CentreRow key={centre.cqcUrl || i} centre={centre} sourceTownSlug={result.sourceTownSlug} index={i} />
        ))}

        {/* 6th card: Add your centre CTA */}
        <Link
          href="/verify?type=centre"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            padding: '14px 16px',
            border: 'none',
            borderRadius: 10,
            textDecoration: 'none',
            background: 'linear-gradient(135deg, #0f4c38, #1a6b5a)',
            transition: 'opacity 0.15s',
          }}
        >
          <div style={{
            width: 44, height: 44, borderRadius: 10,
            background: 'rgba(255,255,255,0.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="16"/>
              <line x1="8" y1="12" x2="16" y2="12"/>
            </svg>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#fff', lineHeight: 1.3, marginBottom: 2 }}>
              Add your centre
            </div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>
              Missing from our directory? Add or claim your listing
            </div>
          </div>
          <span style={{ fontSize: 12, fontWeight: 700, color: '#fff', whiteSpace: 'nowrap', flexShrink: 0, background: 'rgba(255,255,255,0.15)', padding: '4px 10px', borderRadius: 6 }}>Get verified →</span>
        </Link>
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

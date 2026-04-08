/**
 * NearestCentres — verified listings shown first, unverified collapsed.
 * First centre is hardcoded as verified for demo purposes.
 */
'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { RehabsResult, RehabCentre } from '../lib/rehabs'
import { getCorrectCentreSlug, getCentreImage } from '../lib/rehabs'

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

function CentreRow({ centre, sourceTownSlug, verified }: { centre: RehabCentre; sourceTownSlug: string; verified?: boolean }) {
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
        padding: '13px 16px',
        border: '1px solid var(--border)',
        borderRadius: 10, textDecoration: 'none',
        background: 'var(--white)',
        transition: 'border-color 0.15s',
      }}
    >
      {/* Avatar with blue tick overlay */}
      <div style={{ position: 'relative', flexShrink: 0, width: 40, height: 40 }}>
        <div style={{
          width: 40, height: 40, borderRadius: 8,
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
        {verified && (
          <span style={{
            position: 'absolute', bottom: -2, right: -2,
            width: 16, height: 16, borderRadius: '50%',
            background: '#1d9bf0', border: '2px solid #fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
              <polyline points="2,5 4.2,7.5 8,3" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        )}
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

      {verified ? (
        <span style={{ fontSize: 12, fontWeight: 600, color: '#1d9bf0', whiteSpace: 'nowrap', flexShrink: 0 }}>
          Verified
        </span>
      ) : (
        <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="var(--text-muted)" strokeWidth="1.5">
          <path d="M7 4l6 6-6 6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
    </Link>
  )
}

export default function NearestCentres({ result, locationName, locationSlug, limit = 5 }: Props) {
  const [showUnverified, setShowUnverified] = useState(false)
  const total = result.centres.length

  // First centre is treated as verified (demo); the rest are unverified
  const verified = result.centres.slice(0, 1)
  const unverified = result.centres.slice(1, limit)
  const unverifiedCount = result.centres.slice(1).length

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

      {/* Verified listings */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {verified.map((centre, i) => (
          <CentreRow key={centre.cqcUrl || i} centre={centre} sourceTownSlug={result.sourceTownSlug} verified={true} />
        ))}
      </div>

      {/* Collapsible unverified */}
      {unverifiedCount > 0 && (
        <div style={{ marginTop: 8 }}>
          <button
            onClick={() => setShowUnverified(v => !v)}
            style={{
              display: 'flex', alignItems: 'center', gap: 6, width: '100%',
              padding: '10px 14px', background: 'var(--bg)', borderRadius: 8,
              border: '1px solid var(--border)', cursor: 'pointer',
              fontSize: 13, color: 'var(--text-muted)', fontWeight: 500,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              style={{ transition: 'transform 0.2s', transform: showUnverified ? 'rotate(90deg)' : 'rotate(0deg)' }}>
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/>
            </svg>
            View {unverifiedCount} other centre{unverifiedCount !== 1 ? 's' : ''} (unverified)
          </button>

          {showUnverified && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 }}>
              {unverified.map((centre, i) => (
                <CentreRow key={centre.cqcUrl || i} centre={centre} sourceTownSlug={result.sourceTownSlug} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* "Add your centre" CTA */}
      <Link
        href="/verify?type=centre"
        style={{
          display: 'flex', alignItems: 'center', gap: 14,
          padding: '13px 16px', marginTop: 12,
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
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/>
          </svg>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--accent)', marginBottom: 1 }}>Add your centre</div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Missing from our directory? Add or claim your listing — from £25/month</div>
        </div>
        <span style={{ fontSize: 12, fontWeight: 700, color: '#fff', background: 'var(--accent)', padding: '5px 12px', borderRadius: 6, flexShrink: 0, whiteSpace: 'nowrap' }}>Get verified →</span>
      </Link>

      {/* View all link */}
      <div style={{ marginTop: 20 }}>
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

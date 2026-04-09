/**
 * CounsellorsSection — verified listings first, unverified collapsed.
 * First counsellor is hardcoded as verified for demo purposes.
 */
'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'
import CounsellorCard, { type Counsellor } from './CounsellorCard'

// ─────────────────────────────────────────────────────────────────────────────

interface Props {
  locationSlug: string
  locationName: string
}

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

const SELECT = 'id, name, title, location_name, location_slug, specialisms, phone, email, website, photo_url, verified, listing_type, profile_slug'

const CITY_SLUGS: Record<string, string[]> = {
  london: [
    'london', 'battersea', 'fulham', 'brent', 'croydon', 'city-of-westminster',
    'barking', 'becontree', 'edmonton', 'barnet', 'camden', 'hackney', 'hammersmith',
    'haringey', 'islington', 'kensington', 'lambeth', 'lewisham', 'newham',
    'southwark', 'tower-hamlets', 'waltham-forest', 'wandsworth', 'westminster',
    'enfield', 'enfield-town', 'greenwich', 'havering', 'hillingdon', 'hounslow',
    'kingston', 'merton', 'redbridge', 'richmond', 'sutton', 'dagenham',
  ],
  manchester: ['manchester', 'salford', 'stockport', 'oldham', 'rochdale', 'bolton', 'bury', 'wigan', 'tameside', 'trafford'],
  birmingham: ['birmingham', 'sandwell', 'walsall', 'wolverhampton', 'coventry', 'solihull'],
  leeds: ['leeds', 'bradford', 'wakefield', 'calderdale', 'kirklees'],
  liverpool: ['liverpool', 'knowsley', 'sefton', 'st-helens', 'wirral'],
  sheffield: ['sheffield', 'barnsley', 'doncaster', 'rotherham'],
  bristol: ['bristol', 'bath', 'north-somerset', 'south-gloucestershire'],
  edinburgh: ['edinburgh', 'glasgow', 'east-kilbride'],
  newcastle: ['newcastle', 'gateshead', 'sunderland'],
}

function expandSlugs(slug: string): string[] {
  return CITY_SLUGS[slug] ?? [slug]
}

export default function CounsellorsSection({ locationSlug, locationName }: Props) {
  const [counsellors, setCounsellors] = useState<Counsellor[]>([])
  const [nearbyCity, setNearbyCity] = useState<string | null>(null)
  const [showUnverified, setShowUnverified] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    async function load() {
      try {
        const supabase = getSupabase()
        const slugsToQuery = expandSlugs(locationSlug)

        const { data: exact } = await supabase
          .from('counsellors')
          .select(SELECT)
          .in('location_slug', slugsToQuery)
          .order('verified', { ascending: false })
          .order('name', { ascending: true })
          .limit(6)

        if (exact && exact.length > 0) {
          setCounsellors(exact)
        } else {
          // Proximity fallback
          const { data: seeded } = await supabase
            .from('counsellors')
            .select('location_slug, location_name')
            .not('location_slug', 'in', `(${slugsToQuery.join(',')})`)
            .limit(1000)

          if (seeded && seeded.length > 0) {
            try {
              // eslint-disable-next-line @typescript-eslint/no-require-imports
              const locData = require('../data/locations.json') as { locations: Array<{ slug: string; lat: number; lng: number }> }
              const current = locData.locations.find(l => l.slug === locationSlug)

              if (current) {
                const seededSlugs = [...new Set(seeded.map(s => s.location_slug))]
                const seededWithCoords = locData.locations.filter(l => seededSlugs.includes(l.slug))

                let nearest = seededWithCoords[0]
                let minDist = Infinity
                for (const loc of seededWithCoords) {
                  const d = Math.sqrt(Math.pow(loc.lat - current.lat, 2) + Math.pow(loc.lng - current.lng, 2))
                  if (d < minDist) { minDist = d; nearest = loc }
                }

                if (nearest) {
                  const nearestSlugs = expandSlugs(nearest.slug)
                  const { data: nearby } = await supabase
                    .from('counsellors')
                    .select(SELECT)
                    .in('location_slug', nearestSlugs)
                    .order('verified', { ascending: false })
                    .limit(6)

                  if (nearby && nearby.length > 0) {
                    setCounsellors(nearby)
                    setNearbyCity(seeded.find(s => s.location_slug === nearest.slug)?.location_name ?? nearest.slug)
                  }
                }
              }
            } catch { /* locations.json unavailable */ }
          }
        }
      } catch { /* ignore */ }
      setLoaded(true)
    }
    load()
  }, [locationSlug])

  if (!loaded || counsellors.length === 0) return null

  const displayName = nearbyCity ? `near ${locationName}` : `in ${locationName}`

  // First counsellor shown as verified (demo), rest unverified
  const verifiedList = counsellors.slice(0, 1)
  const unverifiedList = counsellors.slice(1)
  const unverifiedCount = unverifiedList.length

  return (
    <>
      <style>{`
        .cs-divider { border: none; border-top: 1px solid var(--border); margin: 40px 0; }
        .cs-unverified-toggle { display: flex; align-items: center; gap: 6px; width: 100%; padding: 10px 14px; background: var(--bg); border-radius: 8px; border: 1px solid var(--border); cursor: pointer; font-size: 13px; color: var(--text-muted); font-weight: 500; transition: background 0.15s; }
        .cs-unverified-toggle:hover { background: var(--border); }
        .cs-cta-btn { font-size: 13px; font-weight: 700; background: var(--accent); color: #fff; padding: 9px 18px; border-radius: var(--radius-sm); text-decoration: none; white-space: nowrap; flex-shrink: 0; transition: opacity 0.12s; }
        .cs-cta-btn:hover { opacity: 0.9; }
      `}</style>

      <hr className="cs-divider" />

      <div style={{ marginBottom: 40 }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 16, gap: 12, flexWrap: 'wrap' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.01em' }}>
            Addiction counsellors {displayName}
          </h2>
          {counsellors.length > 0 && (
            <Link href={`/counsellors/${locationSlug}`} style={{ fontSize: 13, color: 'var(--accent)', textDecoration: 'none', fontWeight: 600, whiteSpace: 'nowrap', flexShrink: 0 }}>
              See all →
            </Link>
          )}
        </div>

        {nearbyCity && (
          <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 10, fontStyle: 'italic' }}>
            Showing counsellors from {nearbyCity} — the nearest area with listings.
          </p>
        )}

        {/* Verified counsellors */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 8 }}>
          {verifiedList.map(c => (
            <CounsellorCard key={c.id} counsellor={{ ...c, verified: true }} />
          ))}
        </div>

        {/* Collapsible unverified */}
        {unverifiedCount > 0 && (
          <div style={{ marginBottom: 12 }}>
            <button
              className="cs-unverified-toggle"
              onClick={() => setShowUnverified(v => !v)}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                style={{ transition: 'transform 0.2s', transform: showUnverified ? 'rotate(90deg)' : 'rotate(0deg)' }}>
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/>
              </svg>
              View {unverifiedCount} other counsellor{unverifiedCount !== 1 ? 's' : ''} (unverified)
            </button>

            {showUnverified && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 }}>
                {unverifiedList.map(c => (
                  <CounsellorCard key={c.id} counsellor={c} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* "Add your listing" CTA */}
        <a
          href="/verify?type=counsellor"
          style={{
            display: 'flex', alignItems: 'center', gap: 14,
            padding: '13px 16px', marginBottom: 8,
            border: '1px dashed var(--border-mid)',
            borderRadius: 10, textDecoration: 'none',
            background: 'var(--bg)', transition: 'border-color 0.15s',
          }}
        >
          <div style={{
            width: 40, height: 40, borderRadius: '50%',
            background: 'var(--accent-pale)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/>
            </svg>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--accent)', marginBottom: 1 }}>Add your listing</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Missing from our directory? Get verified and receive direct enquiries — £25/month</div>
          </div>
          <span style={{ fontSize: 12, fontWeight: 700, color: '#fff', background: 'var(--accent)', padding: '5px 12px', borderRadius: 6, flexShrink: 0, whiteSpace: 'nowrap' }}>Get verified →</span>
        </a>

        {/* Bottom CTA */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: 16, padding: '16px 20px',
          background: 'linear-gradient(135deg, var(--accent-pale) 0%, #e8f5f1 100%)',
          border: '1px solid #c8e6df', borderRadius: 'var(--radius-md)',
          flexWrap: 'wrap',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent)', marginBottom: 2 }}>Are you a counsellor in {locationName}?</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Get verified · appear first in search · £25/month · cancel anytime</div>
            </div>
          </div>
          <Link href="/verify?type=counsellor" className="cs-cta-btn">
            Get verified →
          </Link>
        </div>
      </div>
    </>
  )
}

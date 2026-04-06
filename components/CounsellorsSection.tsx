/**
 * CounsellorsSection — shown on location pages BELOW rehab centres.
 * 
 * Shows up to 3 addiction counsellors for a given location.
 * Falls back to nearest city with counsellors if none found locally.
 * Paid CTA for counsellors to add their listing.
 */

import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'
import CounsellorCard, { type Counsellor } from './CounsellorCard'

interface Props {
  locationSlug: string
  locationName: string
}

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

const SELECT = 'id, name, title, location_name, location_slug, specialisms, phone, email, website, photo_url, verified, listing_type, profile_slug'

/**
 * For major cities, counsellors are stored under borough/district slugs.
 * When querying for e.g. 'london', we expand to all known sub-area slugs.
 */
const CITY_SLUGS: Record<string, string[]> = {
  london: [
    'london', 'battersea', 'fulham', 'brent', 'croydon', 'city-of-westminster',
    'barking', 'becontree', 'edmonton', 'barnet', 'camden', 'hackney', 'hammersmith',
    'haringey', 'islington', 'kensington', 'lambeth', 'lewisham', 'newham',
    'southwark', 'tower-hamlets', 'waltham-forest', 'wandsworth', 'westminster',
    'enfield', 'enfield-town', 'greenwich', 'havering', 'hillingdon', 'hounslow',
    'kingston', 'merton', 'redbridge', 'richmond', 'sutton', 'dagenham',
  ],
  manchester: [
    'manchester', 'salford', 'stockport', 'oldham', 'rochdale', 'bolton', 'bury', 'wigan', 'tameside', 'trafford',
  ],
  birmingham: [
    'birmingham', 'sandwell', 'walsall', 'wolverhampton', 'coventry', 'solihull',
  ],
  leeds: ['leeds', 'bradford', 'wakefield', 'calderdale', 'kirklees'],
  liverpool: ['liverpool', 'knowsley', 'sefton', 'st-helens', 'wirral'],
  sheffield: ['sheffield', 'barnsley', 'doncaster', 'rotherham'],
  bristol: ['bristol', 'bath', 'north-somerset', 'south-gloucestershire'],
  edinburgh: ['edinburgh', 'glasgow', 'east-kilbride'],
  newcastle: ['newcastle', 'gateshead', 'sunderland'],
}

/** Expand a city slug into all its sub-area slugs for querying */
function expandSlugs(slug: string): string[] {
  return CITY_SLUGS[slug] ?? [slug]
}

export default async function CounsellorsSection({ locationSlug, locationName }: Props) {
  let counsellors: Counsellor[] = []
  let nearbyCity: string | null = null

  try {
    const supabase = getSupabase()
    const slugsToQuery = expandSlugs(locationSlug)

    // 1. Try exact location match (or aggregated city match)
    const { data: exact } = await supabase
      .from('counsellors')
      .select(SELECT)
      .in('location_slug', slugsToQuery)
      .order('verified', { ascending: false })
      .order('name', { ascending: true })
      .limit(3)

    if (exact && exact.length > 0) {
      counsellors = exact
    } else {
      // 2. Proximity fallback — find nearest seeded city
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
              const d = Math.sqrt(
                Math.pow(loc.lat - current.lat, 2) +
                Math.pow(loc.lng - current.lng, 2)
              )
              if (d < minDist) { minDist = d; nearest = loc }
            }

            if (nearest) {
              const nearestSlugs = expandSlugs(nearest.slug)
              const { data: nearby } = await supabase
                .from('counsellors')
                .select(SELECT)
                .in('location_slug', nearestSlugs)
                .order('verified', { ascending: false })
                .limit(3)

              if (nearby && nearby.length > 0) {
                counsellors = nearby
                nearbyCity = seeded.find(s => s.location_slug === nearest.slug)?.location_name ?? nearest.slug
              }
            }
          }
        } catch { /* locations.json unavailable */ }
      }
    }
  } catch {
    return null
  }

  const displayName = nearbyCity ? `near ${locationName}` : `in ${locationName}`

  return (
    <>
      <style>{`
        .cs-wrap {
          margin-bottom: 40px;
        }
        .cs-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 16px;
          gap: 12px;
          flex-wrap: wrap;
        }
        .cs-title {
          font-size: 18px;
          font-weight: 700;
          color: var(--text);
          letter-spacing: -0.01em;
        }
        .cs-nearby-note {
          font-size: 12px;
          color: var(--text-muted);
          margin-bottom: 10px;
          font-style: italic;
        }
        .cs-view-all {
          font-size: 13px;
          color: var(--accent);
          text-decoration: none;
          font-weight: 600;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .cs-view-all:hover { text-decoration: underline; }
        .cs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 10px;
          margin-bottom: 14px;
        }
        .cs-cta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 16px 20px;
          background: linear-gradient(135deg, var(--accent-pale) 0%, #e8f5f1 100%);
          border: 1px solid #c8e6df;
          border-radius: var(--radius-md);
          flex-wrap: wrap;
        }
        .cs-cta-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .cs-cta-icon {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: var(--accent);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .cs-cta-text-title {
          font-size: 13px;
          font-weight: 700;
          color: var(--accent);
          margin-bottom: 2px;
        }
        .cs-cta-text-sub {
          font-size: 12px;
          color: var(--text-muted);
        }
        .cs-cta-btn {
          font-size: 13px;
          font-weight: 700;
          background: var(--accent);
          color: #fff;
          padding: 9px 18px;
          border-radius: var(--radius-sm);
          text-decoration: none;
          white-space: nowrap;
          flex-shrink: 0;
          transition: opacity 0.12s;
        }
        .cs-cta-btn:hover { opacity: 0.9; text-decoration: none; }
        .cs-divider {
          border: none;
          border-top: 1px solid var(--border);
          margin: 40px 0;
        }
      `}</style>

      <hr className="cs-divider" />

      <div className="cs-wrap">
        <div className="cs-header">
          <h2 className="cs-title">
            Addiction counsellors {displayName}
          </h2>
          {counsellors.length > 0 && (
            <Link href={`/counsellors/${locationSlug}`} className="cs-view-all">
              See all →
            </Link>
          )}
        </div>

        {nearbyCity && (
          <p className="cs-nearby-note">
            Showing counsellors from {nearbyCity} — the nearest area with listings.
          </p>
        )}

        <p style={{ fontSize: 12, color: 'var(--text-light)', margin: '0 0 14px', lineHeight: 1.5 }}>
          Blue tick listings have been identity-checked and verified by SoberNation.
        </p>

        {counsellors.length > 0 ? (
          <div className="cs-grid">
            {counsellors.map(c => (
              <CounsellorCard key={c.id} counsellor={c} />
            ))}
          </div>
        ) : (
          <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 14, lineHeight: 1.6 }}>
            No counsellors are listed in {locationName} yet. Be the first.
          </p>
        )}

        {/* CTA — paid verification */}
        <div className="cs-cta">
          <div className="cs-cta-left">
            <div className="cs-cta-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
            <div>
              <div className="cs-cta-text-title">Are you a counsellor in {locationName}?</div>
              <div className="cs-cta-text-sub">Get a verified listing — from £10/month</div>
            </div>
          </div>
          <Link href={`/counsellors/claim?location=${locationSlug}`} className="cs-cta-btn">
            Add your listing →
          </Link>
        </div>
      </div>
    </>
  )
}

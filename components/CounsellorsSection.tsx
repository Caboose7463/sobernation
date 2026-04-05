/**
 * CounsellorsSection — shown on location pages above rehab centres.
 * 
 * Displays up to 5 addiction counsellors for a given location,
 * then a styled CTA for counsellors to add their listing (paid verification).
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

export default async function CounsellorsSection({ locationSlug, locationName }: Props) {
  let counsellors: Counsellor[] = []

  try {
    const supabase = getSupabase()
    const { data } = await supabase
      .from('counsellors')
      .select('id, name, title, location_name, location_slug, specialisms, phone, email, website, photo_url, verified, listing_type')
      .eq('location_slug', locationSlug)
      .order('verified', { ascending: false })
      .order('name', { ascending: true })
      .limit(5)

    counsellors = data ?? []
  } catch {
    // Supabase unreachable — silently skip section
    return null
  }

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

      <div className="cs-wrap">
        <div className="cs-header">
          <h2 className="cs-title">
            Addiction counsellors in {locationName}
          </h2>
          {counsellors.length > 0 && (
            <Link href={`/counsellors/${locationSlug}`} className="cs-view-all">
              See all →
            </Link>
          )}
        </div>

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

        {/* CTA — paid verification only */}
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

      <hr className="cs-divider" />
    </>
  )
}

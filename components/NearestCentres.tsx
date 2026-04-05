/**
 * NearestCentres — shows CQC-registered rehab/drug services on every location page.
 *
 * Each card links to /centre/[slug] profile page.
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

function CentreCard({ centre, townSlug }: { centre: RehabCentre; townSlug: string }) {
  const badge = serviceTypeLabel(centre.serviceType)
  const private_ = isPrivate(centre.name, centre.serviceType)
  const slug = getCentreSlug(centre, townSlug)
  const initials = centre.name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase()
  const specs = centre.specialism ? centre.specialism.split('|').slice(0, 3).map(s => s.trim()).filter(Boolean) : []

  return (
    <>
      <style>{`
        .nc-card {
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 18px 20px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          transition: border-color 0.15s, box-shadow 0.15s, transform 0.15s;
          text-decoration: none;
          color: inherit;
          cursor: pointer;
        }
        .nc-card:hover {
          border-color: #1d4ed8;
          box-shadow: 0 4px 16px rgba(29,78,216,0.10);
          transform: translateY(-1px);
          text-decoration: none;
          color: inherit;
        }
        .nc-card__top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 12px;
        }
        .nc-card__logo {
          width: 44px;
          height: 44px;
          border-radius: 10px;
          background: linear-gradient(135deg, #1d4ed8, #2563eb);
          color: #fff;
          font-size: 14px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          letter-spacing: 0.02em;
        }
        .nc-card__info { flex: 1; min-width: 0; }
        .nc-card__name {
          font-size: 15px;
          font-weight: 700;
          color: var(--text);
          line-height: 1.3;
        }
        .nc-card__sub {
          font-size: 12px;
          color: var(--text-muted);
          margin-top: 2px;
        }
        .nc-card__tags {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
        }
        .nc-card__tag {
          font-size: 11px;
          padding: 3px 8px;
          border-radius: 20px;
          font-weight: 500;
        }
        .nc-card__footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 2px;
        }
        .nc-card__cqc-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 10px;
          font-weight: 700;
          color: #1d4ed8;
          background: #eff6ff;
          border: 1px solid #bfdbfe;
          border-radius: 20px;
          padding: 2px 8px;
        }
        .nc-card__cta {
          font-size: 12px;
          font-weight: 600;
          color: #1d4ed8;
        }
      `}</style>
      <Link href={`/centre/${slug}`} className="nc-card">
        <div className="nc-card__top">
          <div className="nc-card__logo">{initials}</div>
          <div className="nc-card__info">
            <div className="nc-card__name">{centre.name}</div>
            {centre.address && (
              <div className="nc-card__sub">{centre.address}{centre.postcode ? `, ${centre.postcode}` : ''}</div>
            )}
          </div>
        </div>

        {/* Type + funding tags */}
        <div className="nc-card__tags">
          <span className="nc-card__tag" style={{ background: badge.bg, color: badge.color }}>
            {badge.label}
          </span>
          <span className="nc-card__tag" style={{ background: private_ ? '#fef3c7' : '#f0fdf4', color: private_ ? '#92400e' : '#166534' }}>
            {private_ ? 'Private' : 'NHS'}
          </span>
          {specs.slice(0, 2).map(s => (
            <span key={s} className="nc-card__tag" style={{ background: '#f9fafb', color: '#4b5563' }}>
              {s}
            </span>
          ))}
        </div>

        <div className="nc-card__footer">
          <div className="nc-card__cqc-badge">
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#1d4ed8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              <polyline points="9,12 11,14 15,10"/>
            </svg>
            CQC Registered
          </div>
          <span className="nc-card__cta">View centre →</span>
        </div>
      </Link>
    </>
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

      {/* Centre cards grid — matches counsellor card layout */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 12 }}>
        {displayed.map((centre, i) => (
          <CentreCard key={centre.cqcUrl || i} centre={centre} townSlug={locationSlug} />
        ))}
      </div>

      {/* View all / Frank fallback */}
      <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
        {total > limit && (
          <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Showing {limit} of {total} services.</span>
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

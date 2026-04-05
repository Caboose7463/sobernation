'use client'
import Link from 'next/link'
import { useState } from 'react'

// Renders an external profile photo with automatic initials fallback
function AvatarWithFallback({ name, photoUrl }: { name: string; photoUrl: string | null }) {
  const [failed, setFailed] = useState(false)
  const initials = name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()

  if (photoUrl && !failed) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={photoUrl}
        alt={name}
        className="cc__avatar"
        onError={() => setFailed(true)}
      />
    )
  }
  return (
    <div className="cc__avatar-initials" aria-hidden="true">{initials}</div>
  )
}

export interface Counsellor {
  id: string
  name: string
  title?: string | null
  location_name: string
  location_slug: string
  specialisms?: string[] | null
  phone?: string | null
  email?: string | null
  website?: string | null
  photo_url?: string | null
  verified: boolean
  listing_type: string
  profile_slug?: string | null
}

const SPECIALISM_LABELS: Record<string, string> = {
  'addiction':       'Addiction',
  'alcohol':         'Alcohol',
  'substances':      'Substances',
  'drugs':           'Drugs',
  'gambling':        'Gambling',
  'eating-disorders':'Eating Disorders',
  'dual-diagnosis':  'Dual Diagnosis',
  'codependency':    'Codependency',
  'trauma':          'Trauma',
  'anxiety':         'Anxiety',
  'depression':      'Depression',
}

interface Props {
  counsellor: Counsellor
}

export default function CounsellorCard({ counsellor }: Props) {
  const specialisms = (counsellor.specialisms || []).slice(0, 3)
  const profileHref = counsellor.profile_slug
    ? `/therapist/${counsellor.profile_slug}`
    : `/counsellors/${counsellor.location_slug}`

  return (
    <>
      <style>{`
        .cc {
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
          opacity: ${counsellor.verified ? '1' : '0.85'};
          cursor: pointer;
        }
        .cc:hover {
          border-color: var(--accent);
          box-shadow: 0 4px 16px rgba(26,107,90,0.10);
          transform: translateY(-1px);
          text-decoration: none;
          color: inherit;
        }
        .cc__top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 12px;
        }
        .cc__avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          object-fit: cover;
          flex-shrink: 0;
          border: 2px solid var(--border);
          background: var(--bg-subtle);
        }
        .cc__avatar-initials {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: var(--accent);
          color: #fff;
          font-size: 15px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          letter-spacing: 0.02em;
        }
        .cc__info { flex: 1; min-width: 0; }
        .cc__name {
          font-size: 15px;
          font-weight: 700;
          color: var(--text);
          line-height: 1.3;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .cc__tick {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 16px;
          height: 16px;
          background: #1d9bf0;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .cc__tick svg { width: 9px; height: 9px; }
        .cc__title {
          font-size: 12px;
          color: var(--text-muted);
          margin-top: 2px;
        }
        .cc__tags {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
        }
        .cc__tag {
          font-size: 11px;
          padding: 3px 8px;
          background: var(--accent-pale);
          color: var(--accent);
          border-radius: 20px;
          font-weight: 500;
        }
        .cc__footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 2px;
        }
        .cc__verified-label {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 10px;
          font-weight: 700;
          color: #166534;
          background: #dcfce7;
          border: 1px solid #bbf7d0;
          border-radius: 20px;
          padding: 2px 8px;
        }
        .cc__unverified-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 10px;
          font-weight: 600;
          color: #6b7280;
          background: #f3f4f6;
          border: 1px solid #e5e7eb;
          border-radius: 20px;
          padding: 2px 8px;
        }
        .cc__cta {
          font-size: 12px;
          font-weight: 600;
          color: var(--accent);
        }
      `}</style>

      <Link href={profileHref} className="cc">
        <div className="cc__top">
          {/* Avatar */}
          <AvatarWithFallback name={counsellor.name} photoUrl={counsellor.photo_url ?? null} />
          <div className="cc__info">
            <div className="cc__name">
              {counsellor.name}
              {counsellor.verified && (
                <span className="cc__tick" title="Verified by SoberNation">
                  <svg viewBox="0 0 10 10" fill="none">
                    <polyline points="2,5 4.2,7.5 8,3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              )}
            </div>
            {counsellor.title && (
              <div className="cc__title">{counsellor.title}</div>
            )}
          </div>
        </div>

        {specialisms.length > 0 && (
          <div className="cc__tags">
            {specialisms.map(s => (
              <span key={s} className="cc__tag">
                {SPECIALISM_LABELS[s] ?? s}
              </span>
            ))}
          </div>
        )}

        <div className="cc__footer">
          {counsellor.verified ? (
            <div className="cc__verified-label">
              <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                <polyline points="2,5 4.2,7.5 8,3" stroke="#166534" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Verified by SoberNation
            </div>
          ) : (
            <div className="cc__unverified-badge">Unverified listing</div>
          )}
          <span className="cc__cta">View profile →</span>
        </div>
      </Link>
    </>
  )
}

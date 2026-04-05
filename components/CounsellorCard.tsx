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
  const [showPhone, setShowPhone] = useState(false)
  const [showEmail, setShowEmail] = useState(false)
  const specialisms = (counsellor.specialisms || []).slice(0, 3)

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
          transition: border-color 0.15s, box-shadow 0.15s;
          opacity: ${counsellor.verified ? '1' : '0.85'};
        }
        .cc:hover {
          border-color: var(--accent);
          box-shadow: 0 2px 8px rgba(26,107,90,0.08);
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
        .cc__tick svg {
          width: 9px;
          height: 9px;
        }
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
        .cc__actions {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 2px;
        }
        .cc__icon-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 11px;
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          background: none;
          cursor: pointer;
          font-size: 12px;
          color: var(--text-muted);
          font-weight: 500;
          transition: border-color 0.12s, color 0.12s;
          text-decoration: none;
          white-space: nowrap;
        }
        .cc__icon-btn:hover {
          border-color: var(--accent);
          color: var(--accent);
          text-decoration: none;
        }
        .cc__icon-btn svg {
          width: 13px;
          height: 13px;
          flex-shrink: 0;
        }
        .cc__claim {
          font-size: 11px;
          font-weight: 600;
          color: var(--text-light);
          text-decoration: none;
          transition: color 0.12s;
        }
        .cc__claim:hover { color: var(--accent); }
        .cc__unclaimed {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 10px;
          border: 1px dashed #d1d5db;
          border-radius: 6px;
          cursor: pointer;
          text-decoration: none;
          transition: border-color 0.12s;
        }
        .cc__unclaimed:hover { border-color: var(--accent); }
        .cc__unclaimed-num {
          font-size: 13px;
          font-weight: 600;
          color: var(--text-muted);
          filter: blur(4px);
          user-select: none;
          letter-spacing: 0.05em;
        }
        .cc__unclaimed-label {
          font-size: 11px;
          color: var(--text-light);
          white-space: nowrap;
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
          margin-top: 3px;
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
          margin-top: 3px;
        }
      `}</style>

      <div className="cc">
        <div className="cc__top">
          {/* Avatar — with fallback to initials if external image fails */}
          <AvatarWithFallback name={counsellor.name} photoUrl={counsellor.photo_url ?? null} />
          <div className="cc__info">
            <div className="cc__name">
              {counsellor.profile_slug ? (
                <Link href={`/therapist/${counsellor.profile_slug}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                  {counsellor.name}
                </Link>
              ) : counsellor.name}
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
            {/* Verified / unverified status label */}
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

        <div className="cc__actions">
          {/* Blurred phone teaser for unverified listings */}
          {!counsellor.verified && (
            <Link
              href={`/counsellors/claim?id=${counsellor.id}&name=${encodeURIComponent(counsellor.name)}&location=${counsellor.location_slug}`}
              className="cc__unclaimed"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 13, height: 13, color: '#9ca3af', flexShrink: 0 }}>
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.81a16 16 0 0 0 6 6l.86-.86a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16"/>
              </svg>
              <span className="cc__unclaimed-num">07### ######</span>
              <span className="cc__unclaimed-label">Unclaimed — reveal</span>
            </Link>
          )}

          {/* Verified contact actions */}
          {counsellor.verified && counsellor.phone?.trim() && (
            showPhone ? (
              <a href={`tel:${counsellor.phone.replace(/\s/g, '')}`} className="cc__icon-btn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.81a16 16 0 0 0 6 6l.86-.86a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16"/>
                </svg>
                {counsellor.phone}
              </a>
            ) : (
              <button className="cc__icon-btn" onClick={() => setShowPhone(true)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.81a16 16 0 0 0 6 6l.86-.86a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16"/>
                </svg>
                Show number
              </button>
            )
          )}

          {/* Only show email if it's a real non-empty value with @ */}
          {counsellor.verified && counsellor.email?.trim() && counsellor.email.includes('@') && (
            showEmail ? (
              <a href={`mailto:${counsellor.email}`} className="cc__icon-btn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
                {counsellor.email}
              </a>
            ) : (
              <button className="cc__icon-btn" onClick={() => setShowEmail(true)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
                Show email
              </button>
            )
          )}

          {counsellor.verified && counsellor.website?.trim() && (
            <a href={counsellor.website} target="_blank" rel="noopener noreferrer" className="cc__icon-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
              Website
            </a>
          )}

          {!counsellor.verified && (
            <Link
              href={`/counsellors/claim?id=${counsellor.id}&name=${encodeURIComponent(counsellor.name)}&location=${counsellor.location_slug}`}
              className="cc__claim"
            >
              Claim listing →
            </Link>
          )}
        </div>

      </div>
    </>
  )
}

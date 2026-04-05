'use client'
import Link from 'next/link'
import { useState } from 'react'

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
          color: var(--text-light);
          text-decoration: none;
          margin-left: auto;
        }
        .cc__claim:hover {
          color: var(--accent);
        }
      `}</style>

      <div className="cc">
        <div className="cc__top">
          {/* Avatar */}
          {counsellor.photo_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={counsellor.photo_url} alt={counsellor.name} className="cc__avatar" />
          ) : (
            <div className="cc__avatar-initials" aria-hidden="true">
              {counsellor.name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()}
            </div>
          )}
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

        <div className="cc__actions">
          {counsellor.phone && (
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

          {counsellor.email && (
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

          {counsellor.website && (
            <a href={counsellor.website} target="_blank" rel="noopener noreferrer" className="cc__icon-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
              Website
            </a>
          )}

          {!counsellor.verified && (
            <Link
              href={`/counsellors/claim?id=${counsellor.id}`}
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

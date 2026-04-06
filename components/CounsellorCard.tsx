'use client'
import Link from 'next/link'
import { useState } from 'react'

// Renders an external profile photo with automatic initials fallback
function AvatarWithFallback({ name, photoUrl }: { name: string; photoUrl: string | null }) {
  const [failed, setFailed] = useState(false)
  const initials = name.split(' ').filter(Boolean).map(n => n[0]).slice(0, 2).join('').toUpperCase()

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

/** Mirror of the scraper's toProfileSlug — used as client-side fallback when DB slug is null */
function toProfileSlug(name: string, locationSlug: string): string {
  return name
    .toLowerCase()
    .replace(/['']/g, '')
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim() + '-' + locationSlug
}

/** Strip Material Icon glyph names that sometimes get scraped as text */
const ICON_GLYPHS = /\b(task_alt|check_circle|verified|person|star|thumb_up|favorite|info|warning|error|home|settings|close|menu|search|add|delete|edit|visibility)\b/gi

function cleanTitle(title: string | null | undefined): string {
  if (!title) return 'Registered Counsellor'
  const cleaned = title.replace(ICON_GLYPHS, '').replace(/\s{2,}/g, ' ').trim()
  return cleaned || 'Registered Counsellor'
}

export default function CounsellorCard({ counsellor }: Props) {
  const specialisms = (counsellor.specialisms || []).slice(0, 3)
  // Use DB slug if set; otherwise generate it on the fly using the same formula as the scraper
  const slug = counsellor.profile_slug || toProfileSlug(counsellor.name, counsellor.location_slug)
  const profileHref = `/therapist/${slug}`

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
          opacity: 1;
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
          position: relative;
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
          width: 18px;
          height: 18px;
          border-radius: 50%;
          flex-shrink: 0;
          position: absolute;
          top: 0;
          right: 0;
        }
        .cc__tick--verified { background: #1d9bf0; }
        .cc__tick--unverified { background: #d1d5db; }
        .cc__tick svg { width: 10px; height: 10px; }
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
            </div>
            {(() => { const t = cleanTitle(counsellor.title); return t !== 'Registered Counsellor' ? <div className="cc__title">{t}</div> : null })()}
          </div>
          {/* Verification tick — top right */}
          <span
            className={`cc__tick ${counsellor.verified ? 'cc__tick--verified' : 'cc__tick--unverified'}`}
            title={counsellor.verified ? 'Verified by SoberNation' : 'Listing not yet verified'}
          >
            <svg viewBox="0 0 10 10" fill="none">
              <polyline points="2,5 4.2,7.5 8,3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
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
          <span className="cc__cta">View profile →</span>
        </div>
      </Link>
    </>
  )
}

'use client'

import Link from 'next/link'
import { useState } from 'react'

// Renders a profile photo with automatic initials fallback
function AvatarWithFallback({ name, photoUrl }: { name: string; photoUrl: string | null }) {
  const [failed, setFailed] = useState(false)
  const initials = name.split(' ').filter(Boolean).map(n => n[0]).slice(0, 2).join('').toUpperCase()

  return (
    <div style={{
      width: 44, height: 44, borderRadius: '50%', overflow: 'hidden',
      background: 'var(--accent)', flexShrink: 0,
      border: '1px solid var(--border)', position: 'relative',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      {photoUrl && !failed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={photoUrl}
          alt={name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onError={() => setFailed(true)}
        />
      ) : (
        <div style={{
          width: '100%', height: '100%', display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          color: '#fff', fontSize: 15, fontWeight: 700, letterSpacing: '0.02em',
        }}>
          {initials}
        </div>
      )}
    </div>
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
  'addiction':        'Addiction',
  'alcohol':          'Alcohol',
  'substances':       'Substances',
  'drugs':            'Drugs',
  'gambling':         'Gambling',
  'eating-disorders': 'Eating Disorders',
  'dual-diagnosis':   'Dual Diagnosis',
  'codependency':     'Codependency',
  'trauma':           'Trauma',
  'anxiety':          'Anxiety',
  'depression':       'Depression',
}

interface Props {
  counsellor: Counsellor
}

/** Mirror of the scraper's toProfileSlug */
function toProfileSlug(name: string, locationSlug: string): string {
  return name
    .toLowerCase()
    .replace(/['']/g, '')
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim() + '-' + locationSlug
}

const ICON_GLYPHS = /\b(task_alt|check_circle|verified|person|star|thumb_up|favorite|info|warning|error|home|settings|close|menu|search|add|delete|edit|visibility)\b/gi

function cleanTitle(title: string | null | undefined): string {
  if (!title) return 'Registered Counsellor'
  const cleaned = title.replace(ICON_GLYPHS, '').replace(/\s{2,}/g, ' ').trim()
  return cleaned || 'Registered Counsellor'
}

export default function CounsellorCard({ counsellor }: Props) {
  const specialisms = (counsellor.specialisms || []).slice(0, 2)
  const slug = counsellor.profile_slug || toProfileSlug(counsellor.name, counsellor.location_slug)
  const profileHref = `/therapist/${slug}`
  const title = cleanTitle(counsellor.title)
  const subtitle = [
    title !== 'Registered Counsellor' ? title : null,
    specialisms.map(s => SPECIALISM_LABELS[s] ?? s).join(', ') || null,
  ].filter(Boolean).join(' · ')

  return (
    <Link
      href={profileHref}
      style={{
        display: 'flex', alignItems: 'center', gap: 14,
        padding: '13px 16px',
        border: '1px solid var(--border)',
        borderRadius: 10, textDecoration: 'none',
        background: 'var(--white)',
        transition: 'border-color 0.15s',
        color: 'inherit',
      }}
    >
      <AvatarWithFallback name={counsellor.name} photoUrl={counsellor.photo_url ?? null} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', lineHeight: 1.3, marginBottom: 3 }}>
          {counsellor.name}
        </div>
        {subtitle && (
          <div style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.4 }}>{subtitle}</div>
        )}
      </div>
      {counsellor.verified ? (
        <span style={{ fontSize: 12, fontWeight: 700, color: '#1d9bf0', whiteSpace: 'nowrap', flexShrink: 0, display: 'flex', alignItems: 'center', gap: 4 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#1d9bf0"><path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/></svg>
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

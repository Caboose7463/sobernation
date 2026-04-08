'use client'

/**
 * SponsoredCard — the amber "Sponsored" listing card shown above organic results.
 * Tracks clicks via /go/[type]/[slug] and phone taps via /api/ads/phone-tap.
 */

import type { AuctionWinner } from '../lib/ads'

interface Props {
  winner: AuctionWinner
}

export default function SponsoredCard({ winner }: Props) {
  const initials = winner.display_name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w: string) => w[0])
    .join('')
    .toUpperCase()

  const clickHref = `/go/${winner.listing_type}/${winner.listing_slug}?p=${winner.id}`

  function handlePhoneTap(e: React.MouseEvent) {
    e.stopPropagation()
    fetch('/api/ads/phone-tap', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        placement_id: winner.id,
        location_slug: winner.location_slug,
      }),
    }).catch(() => {})
  }

  return (
    <div style={{ position: 'relative' }}>
      {/* Sponsored pill — sits on top border */}
      <div style={{
        position: 'absolute', top: -11, left: 14,
        background: '#fef3c7', border: '1px solid #fde68a',
        borderRadius: 4, padding: '1px 8px',
        fontSize: 10, fontWeight: 700, color: '#92400e',
        letterSpacing: '0.08em', textTransform: 'uppercase',
      }}>
        Sponsored
      </div>

      <a
        href={clickHref}
        style={{
          display: 'flex', alignItems: 'center', gap: 14,
          padding: '16px 16px 14px',
          border: '1.5px solid #f59e0b',
          borderRadius: 10, textDecoration: 'none',
          background: '#fffbeb',
          transition: 'border-color 0.15s, box-shadow 0.15s',
          boxShadow: '0 1px 4px rgba(245,158,11,0.12)',
        }}
      >
        {/* Avatar + blue tick */}
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <div style={{
            width: 44, height: 44, borderRadius: 10,
            background: '#fde68a',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 14, fontWeight: 700, color: '#78350f',
          }}>
            {initials}
          </div>
          {/* Blue verified tick */}
          <div style={{
            position: 'absolute', bottom: -4, right: -4,
            width: 18, height: 18, borderRadius: '50%',
            background: '#2563eb', border: '2px solid #fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="9" height="9" viewBox="0 0 20 20" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="4,10 8,14 16,6"/>
            </svg>
          </div>
        </div>

        {/* Info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontSize: 14, fontWeight: 700, color: 'var(--text)',
            lineHeight: 1.3, marginBottom: 4,
          }}>
            {winner.display_name}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            {winner.display_type_label && (
              <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                {winner.display_type_label}
              </span>
            )}
            {winner.display_phone && (
              <a
                href={`tel:${winner.display_phone.replace(/\s/g, '')}`}
                onClick={handlePhoneTap}
                style={{
                  fontSize: 12, fontWeight: 600, color: '#1d6b5a',
                  textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4,
                }}
              >
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.19 2 2 0 012 .01h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.16 6.16l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                </svg>
                {winner.display_phone}
              </a>
            )}
          </div>
        </div>

        {/* CTA */}
        <span style={{
          fontSize: 12, fontWeight: 700, color: '#92400e',
          whiteSpace: 'nowrap', flexShrink: 0,
          background: '#fde68a', padding: '4px 10px', borderRadius: 6,
        }}>
          Visit website ↗
        </span>
      </a>
    </div>
  )
}

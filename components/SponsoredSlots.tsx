/**
 * SponsoredSlots — server component that runs the auction and renders 0–3 sponsored cards.
 * Renders nothing if no active bidders. Called from NearestCentres and CounsellorsSection.
 *
 * IMPORTANT: This component must NOT be cached — it reads from the DB on every request
 * so each page load runs a fresh auction and impression count is accurate.
 * The parent page's ISR revalidation does NOT affect this because it's a server component
 * that Suspense-streams in — but we ensure fresh data by using no-store fetch.
 */

import { runAuction } from '../lib/ads'
import SponsoredCard from './SponsoredCard'

interface Props {
  locationSlug: string
  listingType: 'centre' | 'counsellor'
}

export default async function SponsoredSlots({ locationSlug, listingType }: Props) {
  const winners = await runAuction(locationSlug, listingType)

  if (winners.length === 0) return null

  return (
    <div style={{ marginBottom: 20 }}>
      {/* Section label */}
      <div style={{
        fontSize: 11, fontWeight: 600, color: 'var(--text-muted)',
        letterSpacing: '0.06em', textTransform: 'uppercase',
        marginBottom: 10, paddingLeft: 2,
      }}>
        Sponsored
      </div>

      {/* Auction winners */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {winners.map((winner) => (
          <SponsoredCard key={winner.id} winner={winner} />
        ))}
      </div>

      {/* Separator before organic */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        marginTop: 24, marginBottom: 4,
      }}>
        <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
        <span style={{ fontSize: 11, color: 'var(--text-light)', whiteSpace: 'nowrap' }}>
          {listingType === 'centre' ? 'All centres' : 'All counsellors'}
        </span>
        <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
      </div>
    </div>
  )
}

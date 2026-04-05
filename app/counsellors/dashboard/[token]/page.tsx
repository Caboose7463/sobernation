/**
 * /counsellors/dashboard/[token]
 * 
 * Private dashboard for verified counsellors/centres.
 * Accessed via unique token URL emailed on verification.
 * Shows subscription status, listing preview, view count, and actions.
 */

import { createClient } from '@supabase/supabase-js'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Your Listing Dashboard | SoberNation',
  robots: { index: false, follow: false }, // Never index dashboard pages
}

export const revalidate = 0 // Always fresh

interface Props {
  params: Promise<{ token: string }>
}

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

const SPECIALISM_LABELS: Record<string, string> = {
  alcohol: 'Alcohol', drugs: 'Drug addiction', substances: 'Substance misuse',
  gambling: 'Gambling', 'eating-disorders': 'Eating disorders',
  'dual-diagnosis': 'Dual diagnosis', codependency: 'Codependency',
  trauma: 'Trauma & PTSD', anxiety: 'Anxiety', depression: 'Depression',
  addiction: 'Addiction',
}

export default async function DashboardPage({ params }: Props) {
  const { token } = await params

  if (!token || token.length < 10) notFound()

  const supabase = getSupabase()

  const { data: listing } = await supabase
    .from('counsellors')
    .select('id, name, title, location_name, location_slug, specialisms, phone, email, website, verified, listing_type, subscription_status, source, view_count')
    .eq('dashboard_token', token)
    .maybeSingle()

  if (!listing) notFound()

  const isActive = listing.verified && listing.subscription_status === 'active'
  const isPastDue = listing.subscription_status === 'past_due'
  const isCancelled = listing.subscription_status === 'cancelled'

  const viewCount = listing.view_count ?? 0
  const listingUrl = listing.listing_type === 'centre'
    ? `/centres/${listing.location_slug}`
    : `/counsellors/${listing.location_slug}`

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg, #f7f8fa)' }}>
      <style>{`
        .db-wrap { max-width: 720px; margin: 0 auto; padding: 48px 20px; }
        .db-card { background: var(--white, #fff); border: 1px solid var(--border); border-radius: 12px; padding: 24px 28px; margin-bottom: 16px; }
        .db-label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-light, #9ca3af); margin-bottom: 8px; }
        .db-stat { font-size: 36px; font-weight: 800; color: var(--text); letter-spacing: -0.02em; }
        .db-stat-sub { font-size: 13px; color: var(--text-muted); margin-top: 2px; }
        .db-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px; }
        @media (max-width: 500px) { .db-grid { grid-template-columns: 1fr; } }
        .db-badge-active { display: inline-flex; align-items: center; gap: 6px; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 700; background: #dcfce7; color: #166534; }
        .db-badge-pastdue { display: inline-flex; align-items: center; gap: 6px; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 700; background: #fef9c3; color: #92400e; }
        .db-badge-inactive { display: inline-flex; align-items: center; gap: 6px; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 700; background: #fee2e2; color: #991b1b; }
        .db-action-btn { display: inline-flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 600; padding: 10px 18px; border-radius: 8px; text-decoration: none; transition: opacity 0.12s; }
        .db-action-btn:hover { opacity: 0.85; }
        .db-action-primary { background: var(--accent, #1d6b5a); color: #fff; }
        .db-action-secondary { background: transparent; border: 1px solid var(--border); color: var(--text-muted); }
        .db-tag { display: inline-block; font-size: 11px; font-weight: 500; padding: 3px 10px; border-radius: 20px; background: var(--accent-pale, #e8f5f1); color: var(--accent, #1d6b5a); margin: 2px; }
      `}</style>

      {/* Nav */}
      <div style={{ background: 'var(--white, #fff)', borderBottom: '1px solid var(--border)', padding: '0 20px', height: 56, display: 'flex', alignItems: 'center' }}>
        <Link href="/" style={{ fontWeight: 700, fontSize: 15, color: 'var(--text)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ width: 26, height: 26, borderRadius: '50%', background: 'var(--accent, #1d6b5a)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 12, fontWeight: 700 }}>S</span>
          SoberNation
        </Link>
        <span style={{ marginLeft: 16, fontSize: 13, color: 'var(--text-muted)', borderLeft: '1px solid var(--border)', paddingLeft: 16 }}>
          Listing Dashboard
        </span>
      </div>

      <div className="db-wrap">
        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: 'var(--text)', marginBottom: 8, letterSpacing: '-0.01em' }}>
            {listing.name}
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            {isActive && <span className="db-badge-active">● Verified & Active</span>}
            {isPastDue && <span className="db-badge-pastdue">⚠ Payment past due</span>}
            {isCancelled && <span className="db-badge-inactive">✕ Subscription cancelled</span>}
            {!listing.verified && !isCancelled && <span className="db-badge-inactive">Pending verification</span>}
            <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>
              {listing.listing_type === 'centre' ? 'Rehab Centre' : 'Counsellor'} · {listing.location_name}
            </span>
          </div>
        </div>

        {/* Alert if past due */}
        {isPastDue && (
          <div style={{ background: '#fef9c3', border: '1px solid #fde68a', borderRadius: 10, padding: '14px 18px', marginBottom: 16 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#92400e', marginBottom: 4 }}>Payment required</div>
            <div style={{ fontSize: 13, color: '#92400e' }}>
              Your last payment failed. Please update your payment method to keep your verified badge.
            </div>
          </div>
        )}
        {isCancelled && (
          <div style={{ background: '#fee2e2', border: '1px solid #fca5a5', borderRadius: 10, padding: '14px 18px', marginBottom: 16 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#991b1b', marginBottom: 4 }}>Subscription ended</div>
            <div style={{ fontSize: 13, color: '#991b1b' }}>Your listing is no longer verified. Resubscribe to restore your badge.</div>
          </div>
        )}

        {/* Stats */}
        <div className="db-grid">
          <div className="db-card">
            <div className="db-label">Listing views</div>
            <div className="db-stat">{viewCount.toLocaleString()}</div>
            <div className="db-stat-sub">Times your profile was seen</div>
          </div>
          <div className="db-card">
            <div className="db-label">Listing status</div>
            <div className="db-stat" style={{ fontSize: 22, paddingTop: 6 }}>
              {isActive ? 'Active ✓' : isPastDue ? 'Past due' : 'Inactive'}
            </div>
            <div className="db-stat-sub">
              {isActive ? 'Verified badge showing' : 'Badge not showing'}
            </div>
          </div>
        </div>

        {/* Listing preview */}
        <div className="db-card">
          <div className="db-label">Your listing</div>
          <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>{listing.name}</div>
          {listing.title && <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 8 }}>{listing.title}</div>}
          {listing.location_name && (
            <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 8 }}>{listing.location_name}</div>
          )}
          {listing.specialisms?.length > 0 && (
            <div style={{ marginBottom: 12 }}>
              {listing.specialisms.map((s: string) => (
                <span key={s} className="db-tag">{SPECIALISM_LABELS[s] ?? s}</span>
              ))}
            </div>
          )}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <a href={listingUrl} target="_blank" rel="noopener noreferrer" className="db-action-btn db-action-secondary">
              View live listing ↗
            </a>
          </div>
        </div>

        {/* Actions */}
        <div className="db-card">
          <div className="db-label">Manage</div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {isActive && (
              <a
                href="https://billing.stripe.com/p/login/test_..."
                target="_blank"
                rel="noopener noreferrer"
                className="db-action-btn db-action-secondary"
              >
                Manage subscription →
              </a>
            )}
            {!isActive && (
              <Link href={`/counsellors/claim?type=${listing.listing_type}`} className="db-action-btn db-action-primary">
                Resubscribe →
              </Link>
            )}
            <a href={`mailto:editorial@sobernation.co.uk?subject=Update my listing: ${encodeURIComponent(listing.name)}`} className="db-action-btn db-action-secondary">
              Request listing update
            </a>
          </div>
          <p style={{ fontSize: 12, color: 'var(--text-light)', marginTop: 12, lineHeight: 1.6 }}>
            To update your name, specialisms, contact details or photo, email{' '}
            <a href="mailto:editorial@sobernation.co.uk" style={{ color: 'var(--accent)' }}>editorial@sobernation.co.uk</a>{' '}
            from your registered email address.
          </p>
        </div>

        {/* Help */}
        <p style={{ fontSize: 12, color: 'var(--text-light)', textAlign: 'center', lineHeight: 1.6 }}>
          This is your private dashboard URL — do not share it publicly.{' '}
          <Link href="/privacy-policy" style={{ color: 'var(--accent)' }}>Privacy Policy</Link>
        </p>
      </div>
    </div>
  )
}

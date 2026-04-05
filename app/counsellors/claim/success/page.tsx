'use client'
import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState, Suspense } from 'react'
import Link from 'next/link'

function SuccessInner() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const sessionId = searchParams.get('session_id')
  const [listing, setListing] = useState<{ name: string; profile_slug: string | null; location_slug: string; listing_type: string; dashboard_token: string | null } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!sessionId) { setLoading(false); return }
    fetch(`/api/counsellors/success-data?session_id=${sessionId}`)
      .then(r => r.json())
      .then(data => { if (data.listing) setListing(data.listing) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [sessionId])

  const profileUrl = listing?.listing_type === 'centre'
    ? `/centres/${listing.location_slug}`
    : listing?.profile_slug ? `/therapist/${listing.profile_slug}` : `/counsellors/${listing?.location_slug}`

  return (
    <div style={{ minHeight: '100vh', background: '#f7f8fa', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{
        maxWidth: 500,
        width: '100%',
        background: 'var(--white)',
        borderRadius: 16,
        boxShadow: '0 4px 32px rgba(0,0,0,0.09)',
        padding: '52px 40px',
        textAlign: 'center',
      }}>
        {/* Animated tick */}
        <div style={{
          width: 72, height: 72, borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--accent), #1a8a6e)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 28px',
          boxShadow: '0 4px 20px rgba(29,107,90,0.3)',
        }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>

        <h1 style={{ fontSize: 26, fontWeight: 800, color: 'var(--text)', marginBottom: 10, letterSpacing: '-0.02em' }}>
          {listing ? `Welcome, ${listing.name.split(' ')[0]}!` : "You're verified!"}
        </h1>
        <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 32, maxWidth: 380, margin: '0 auto 28px' }}>
          Your listing is now live with a <strong style={{ color: 'var(--accent)' }}>verified badge</strong>.
          People searching for addiction help in your area can now find and contact you directly.
        </p>

        {/* What happens next */}
        <div style={{
          background: 'var(--accent-pale)', border: '1px solid #c8e6df',
          borderRadius: 12, padding: '18px 20px', marginBottom: 24, textAlign: 'left',
        }}>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--accent)', marginBottom: 10 }}>
            What happens next
          </div>
          <ul style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 2, margin: 0, paddingLeft: 18 }}>
            <li>Your verified badge is live immediately</li>
            <li>You&apos;ll receive a dashboard link by email shortly</li>
            <li>Billed monthly via Stripe — cancel any time</li>
            <li>To update your details, email <a href="mailto:editorial@sobernation.co.uk" style={{ color: 'var(--accent)' }}>editorial@sobernation.co.uk</a></li>
          </ul>
        </div>

        {/* CTAs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {!loading && listing && (
            <Link
              href={profileUrl}
              style={{
                display: 'block', padding: '14px 24px',
                background: 'var(--accent)', color: '#fff',
                borderRadius: 10, fontWeight: 700, fontSize: 14,
                textDecoration: 'none',
              }}
            >
              View your live listing →
            </Link>
          )}
          <Link
            href="/"
            style={{
              display: 'block', padding: '13px 24px',
              background: loading || !listing ? 'var(--accent)' : '#fff',
              color: loading || !listing ? '#fff' : 'var(--text-muted)',
              border: '1px solid var(--border)',
              borderRadius: 10, fontWeight: 600, fontSize: 14,
              textDecoration: 'none',
            }}
          >
            Back to SoberNation
          </Link>
        </div>

        <p style={{ fontSize: 11, color: 'var(--text-light)', marginTop: 20, lineHeight: 1.6 }}>
          Questions? Email{' '}
          <a href="mailto:editorial@sobernation.co.uk" style={{ color: 'var(--accent)' }}>editorial@sobernation.co.uk</a>
        </p>
      </div>
    </div>
  )
}

export default function ClaimSuccessPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', fontSize: 14 }}>
        Loading…
      </div>
    }>
      <SuccessInner />
    </Suspense>
  )
}

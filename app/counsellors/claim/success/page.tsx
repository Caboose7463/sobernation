import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Listing Verified — SoberNation',
  robots: { index: false },
}

export default function ClaimSuccessPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#f7f8fa', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{
        maxWidth: 480,
        background: 'var(--white)',
        borderRadius: 16,
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
        padding: '48px 40px',
        textAlign: 'center',
      }}>
        {/* Tick */}
        <div style={{
          width: 64,
          height: 64,
          borderRadius: '50%',
          background: '#1d9bf0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 24px',
        }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>

        <h1 style={{ fontSize: 24, fontWeight: 800, color: 'var(--text)', marginBottom: 12, letterSpacing: '-0.02em' }}>
          You&apos;re verified!
        </h1>
        <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 32 }}>
          Your listing is now live with a verified badge. Counsellors looking for help in your area will be able to find and contact you directly.
        </p>

        <div style={{
          background: 'var(--accent-pale)',
          border: '1px solid #c8e6df',
          borderRadius: 'var(--radius-md)',
          padding: '16px 20px',
          marginBottom: 28,
          textAlign: 'left',
        }}>
          <div style={{ fontSize: 12, color: 'var(--text-light)', marginBottom: 4 }}>What happens next</div>
          <ul style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.8, margin: 0, paddingLeft: 18 }}>
            <li>Your listing is live immediately</li>
            <li>You&apos;ll be billed monthly via Stripe</li>
            <li>Cancel any time from your Stripe portal</li>
            <li>Your badge is removed if you cancel</li>
          </ul>
        </div>

        <Link
          href="/"
          style={{
            display: 'block',
            padding: '13px 24px',
            background: 'var(--accent)',
            color: '#fff',
            borderRadius: 'var(--radius-md)',
            fontWeight: 700,
            fontSize: 14,
            textDecoration: 'none',
          }}
        >
          Back to SoberNation →
        </Link>
      </div>
    </div>
  )
}

import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Payment Successful | SoberNation Advertising',
  description: 'Your sponsored listing campaign is now live on SoberNation.',
  robots: 'noindex',
}

export default function ClaimSuccessPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
      <div style={{ maxWidth: 520, width: '100%', textAlign: 'center' }}>

        {/* Tick */}
        <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#dcfce7', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <h1 style={{ fontSize: 28, fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.03em', marginBottom: 12 }}>
          You&apos;re live on SoberNation
        </h1>

        <p style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 32 }}>
          Payment confirmed. Your sponsored positions are now reserved and will appear on the SoberNation directory within 1 working day.
        </p>

        <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 14, padding: '24px', marginBottom: 24, textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            { label: 'Your listing', value: 'Now reserved in your chosen locations' },
            { label: 'Blue verified tick', value: 'Will appear on your profile within 24h' },
            { label: 'Cancel anytime', value: 'Via your Stripe billing portal — no contract' },
            { label: 'Questions?', value: 'Email info@sobernation.co.uk' },
          ].map(row => (
            <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, fontSize: 13 }}>
              <span style={{ color: 'var(--text-muted)', flexShrink: 0 }}>{row.label}</span>
              <span style={{ fontWeight: 600, color: 'var(--text)', textAlign: 'right' }}>{row.value}</span>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Link
            href="/advertise"
            style={{ display: 'block', padding: '13px', borderRadius: 10, background: 'var(--accent)', color: '#fff', fontWeight: 700, fontSize: 14, textDecoration: 'none' }}>
            Back to advertising hub
          </Link>
          <a
            href="mailto:info@sobernation.co.uk"
            style={{ display: 'block', padding: '13px', borderRadius: 10, border: '1.5px solid var(--border)', color: 'var(--text)', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>
            Contact us with any questions
          </a>
        </div>

      </div>
    </div>
  )
}

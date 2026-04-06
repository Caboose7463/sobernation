import Link from 'next/link'
import { Suspense } from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Payment Successful | SoberNation',
}

export default function SuccessPage() {
  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
      <div style={{ maxWidth: 480, width: '100%', textAlign: 'center' }}>
        {/* Animated checkmark */}
        <div style={{
          width: 80,
          height: 80,
          borderRadius: '50%',
          background: 'var(--accent)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 28px',
          boxShadow: '0 8px 32px rgba(26,107,90,0.3)',
        }}>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>

        <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 12, color: 'var(--text)' }}>
          You're verified!
        </h1>
        <p style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 36 }}>
          Payment received. Your verified badge is now live on your SoberNation listing. People searching for help in your area will see you as a trusted, verified provider.
        </p>

        <div style={{
          background: '#fff',
          border: '1px solid var(--border)',
          borderRadius: 14,
          padding: '24px',
          marginBottom: 32,
          textAlign: 'left',
        }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 16, color: 'var(--text)' }}>What happens next</h3>
          {[
            'Your verified badge is live immediately on the directory',
            'You\'ll receive a confirmation email shortly',
            'Log in to your dashboard to edit contact info or manage billing',
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: i < 2 ? 12 : 0 }}>
              <div style={{
                width: 20,
                height: 20,
                borderRadius: '50%',
                background: 'var(--accent-pale)',
                color: 'var(--accent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                marginTop: 1,
              }}>
                <svg width="11" height="11" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
              </div>
              <span style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6 }}>{item}</span>
            </div>
          ))}
        </div>

        <Link
          href="/dashboard"
          style={{
            display: 'block',
            background: 'var(--accent)',
            color: '#fff',
            padding: '14px 24px',
            borderRadius: 10,
            fontWeight: 600,
            fontSize: 15,
            textDecoration: 'none',
            boxShadow: '0 4px 12px rgba(26,107,90,0.25)',
          }}
        >
          Go to your dashboard
        </Link>
      </div>
    </main>
  )
}

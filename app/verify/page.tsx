import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Get Verified | SoberNation',
  description: 'Claim your rehab centre or counsellor listing on SoberNation. Get a verified badge, manage your contact info, and reach people seeking help.',
}

export default function VerifyLandingPage() {
  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Hero */}
      <section style={{
        background: 'linear-gradient(135deg, #0f4c38 0%, #1a6b5a 50%, #2d8a72 100%)',
        padding: '80px 20px 100px',
        textAlign: 'center',
        color: '#fff',
      }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: 'rgba(255,255,255,0.15)',
            border: '1px solid rgba(255,255,255,0.25)',
            borderRadius: 100,
            padding: '6px 16px',
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: 28,
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
            </svg>
            Verified Listings
          </div>

          <h1 style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: 20 }}>
            Stand out where it matters most
          </h1>
          <p style={{ fontSize: 18, opacity: 0.85, lineHeight: 1.7, marginBottom: 40, maxWidth: 520, margin: '0 auto 40px' }}>
            Get a verified badge on your SoberNation listing. Reach thousands of people searching for addiction help across the UK.
          </p>

          <Link href="/verify/onboard" style={{
            display: 'inline-block',
            background: '#fff',
            color: '#1a6b5a',
            fontWeight: 700,
            fontSize: 16,
            padding: '16px 40px',
            borderRadius: 50,
            textDecoration: 'none',
            boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
            transition: 'transform 0.15s',
          }}>
            Get verified — from £10/month
          </Link>

          <p style={{ marginTop: 16, fontSize: 13, opacity: 0.6 }}>
            No contract. Cancel anytime.
          </p>
        </div>
      </section>

      {/* Pricing cards */}
      <section style={{ maxWidth: 760, margin: '-60px auto 0', padding: '0 20px 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          {/* Counsellor */}
          <div style={{
            background: '#fff',
            border: '1px solid var(--border)',
            borderRadius: 16,
            padding: '32px 28px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
          }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-light)', marginBottom: 12 }}>Counsellors</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 8 }}>
              <span style={{ fontSize: 40, fontWeight: 700, color: 'var(--text)' }}>£10</span>
              <span style={{ fontSize: 14, color: 'var(--text-muted)' }}>/month per location</span>
            </div>
            <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 24, lineHeight: 1.6 }}>
              Show up as a verified counsellor in every location you practise.
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
              {['Verified badge on your listing', 'Priority ranking in search', 'Edit your contact info', 'Billing portal & invoices', 'BACP registration displayed'].map(f => (
                <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14 }}>
                  <span style={{ color: 'var(--accent)', flexShrink: 0 }}>
                    <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                  </span>
                  {f}
                </li>
              ))}
            </ul>
            <Link href="/verify/onboard?type=counsellor" style={{
              display: 'block',
              textAlign: 'center',
              background: 'var(--accent)',
              color: '#fff',
              padding: '13px 20px',
              borderRadius: 10,
              fontWeight: 600,
              fontSize: 15,
              textDecoration: 'none',
            }}>
              Get verified as a counsellor
            </Link>
          </div>

          {/* Centre */}
          <div style={{
            background: '#fff',
            border: '2px solid var(--accent)',
            borderRadius: 16,
            padding: '32px 28px',
            boxShadow: '0 4px 24px rgba(26,107,90,0.12)',
            position: 'relative',
          }}>
            <div style={{
              position: 'absolute',
              top: -12,
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'var(--accent)',
              color: '#fff',
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              padding: '4px 14px',
              borderRadius: 100,
              whiteSpace: 'nowrap',
            }}>Most popular</div>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 12 }}>Rehab Centres</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 8 }}>
              <span style={{ fontSize: 40, fontWeight: 700, color: 'var(--text)' }}>£99</span>
              <span style={{ fontSize: 14, color: 'var(--text-muted)' }}>/month per location</span>
            </div>
            <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 24, lineHeight: 1.6 }}>
              Full centre verification with CQC number displayed and priority placement.
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
              {['Verified badge on your listing', 'Priority ranking in directory', 'Edit contact info & website', 'Billing portal & invoices', 'CQC registration displayed', 'Multi-location support'].map(f => (
                <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14 }}>
                  <span style={{ color: 'var(--accent)', flexShrink: 0 }}>
                    <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                  </span>
                  {f}
                </li>
              ))}
            </ul>
            <Link href="/verify/onboard?type=centre" style={{
              display: 'block',
              textAlign: 'center',
              background: 'var(--accent)',
              color: '#fff',
              padding: '13px 20px',
              borderRadius: 10,
              fontWeight: 600,
              fontSize: 15,
              textDecoration: 'none',
            }}>
              Get verified as a centre
            </Link>
          </div>
        </div>

        {/* Already have an account */}
        <p style={{ textAlign: 'center', marginTop: 32, fontSize: 14, color: 'var(--text-muted)' }}>
          Already verified?{' '}
          <Link href="/verify/login" style={{ color: 'var(--accent)', fontWeight: 600 }}>
            Log in to your dashboard
          </Link>
        </p>
      </section>

      {/* How it works */}
      <section style={{ background: '#fff', borderTop: '1px solid var(--border)', padding: '64px 20px' }}>
        <div style={{ maxWidth: 680, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 12 }}>How it works</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: 48 }}>Verified in under 5 minutes</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 32, textAlign: 'left' }}>
            {[
              { n: '1', title: 'Create account', desc: 'Sign up with your email. Takes 30 seconds.' },
              { n: '2', title: 'Choose locations', desc: 'Select every area you cover. Price updates live.' },
              { n: '3', title: 'Pay securely', desc: 'Stripe checkout. Cancel any time, no lock-in.' },
              { n: '4', title: 'Badge goes live', desc: 'Your verified badge appears instantly on your listing.' },
            ].map(s => (
              <div key={s.n}>
                <div style={{
                  width: 40, height: 40,
                  borderRadius: '50%',
                  background: 'var(--accent-pale)',
                  color: 'var(--accent)',
                  fontWeight: 700,
                  fontSize: 16,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 14,
                }}>
                  {s.n}
                </div>
                <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 6 }}>{s.title}</h3>
                <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

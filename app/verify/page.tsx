import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Get Verified on SoberNation — £25/month',
  description: 'Verify your rehab centre or counsellor listing on SoberNation. Get a verified badge, receive leads, and access your stats dashboard. £25/month. Cancel anytime.',
}

const BENEFITS = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.19 2 2 0 012 .01h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.16 6.16l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
      </svg>
    ),
    title: 'Leads sent directly to you',
    desc: 'Enquiries from people searching in your area land in your inbox.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ),
    title: 'Verified badge',
    desc: 'Your listing appears first, above all unverified results in your location.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
      </svg>
    ),
    title: 'Stats dashboard',
    desc: 'See how many people viewed your listing and clicked through each month.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    title: 'Cancel anytime',
    desc: 'No contracts, no lock-in. Cancel from your dashboard with one click.',
  },
]

const HOW_IT_WORKS = [
  { n: '1', title: 'Select your listing', desc: 'Search for your centre or name. If you\'re already in our directory, claim it instantly.' },
  { n: '2', title: 'Verify your identity', desc: 'Upload a utility bill (centres) or photo ID (counsellors). Keeps our directory trustworthy.' },
  { n: '3', title: 'Pay £25/month', desc: 'Secure Stripe checkout. Your verified badge goes live the moment payment clears.' },
]

export default function VerifyLandingPage() {
  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg)' }}>

      {/* ── Hero ── */}
      <section style={{
        background: 'linear-gradient(135deg, #0f4c38 0%, #1a6b5a 50%, #2d8a72 100%)',
        padding: '80px 20px 100px',
        textAlign: 'center',
        color: '#fff',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Subtle dot grid */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '28px 28px', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 620, margin: '0 auto', position: 'relative' }}>
          {/* Pill badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)',
            borderRadius: 100, padding: '6px 16px', fontSize: 12, fontWeight: 600,
            letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 28,
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
            </svg>
            Verified Listings
          </div>

          <h1 style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: 20 }}>
            Get verified.<br/>Get found.
          </h1>
          <p style={{ fontSize: 'clamp(16px, 2vw, 20px)', lineHeight: 1.6, marginBottom: 36, maxWidth: 480, margin: '0 auto 36px', color: 'rgba(255,255,255,0.88)' }}>
            Rehab centres and counsellors across the UK use SoberNation to reach people searching for help. One simple price.
          </p>

          {/* Price highlight */}
          <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 16, padding: '20px 36px', marginBottom: 32 }}>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', marginBottom: 4, fontWeight: 500 }}>Centres & counsellors</div>
            <div style={{ fontSize: 48, fontWeight: 800, lineHeight: 1, letterSpacing: '-0.03em' }}>
              £25<span style={{ fontSize: 18, fontWeight: 500, opacity: 0.8 }}>/month</span>
            </div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', marginTop: 6 }}>Cancel anytime · no contracts</div>
          </div>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/verify/onboard" style={{
              display: 'inline-block', background: '#fff', color: '#1a6b5a',
              fontWeight: 800, fontSize: 16, padding: '16px 36px',
              borderRadius: 50, textDecoration: 'none',
              boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
            }}>
              Get verified →
            </Link>
            <Link href="/verify/login" style={{
              display: 'inline-block',
              background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.25)',
              color: '#fff', fontWeight: 600, fontSize: 16, padding: '16px 28px',
              borderRadius: 50, textDecoration: 'none',
            }}>
              Already verified? Log in
            </Link>
          </div>
        </div>
      </section>

      {/* ── Benefits ── */}
      <section style={{ maxWidth: 860, margin: '0 auto', padding: '64px 20px 0' }}>
        <h2 style={{ textAlign: 'center', fontSize: 'clamp(22px,4vw,30px)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 8 }}>
          What you get
        </h2>
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: 15, marginBottom: 40 }}>
          Everything included in your £25/month subscription.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: 20 }}>
          {BENEFITS.map(b => (
            <div key={b.title} style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 14, padding: '24px 20px' }}>
              <div style={{ marginBottom: 12 }}>{b.icon}</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>{b.title}</div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6 }}>{b.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Listing preview mockup ── */}
      <section style={{ maxWidth: 560, margin: '0 auto', padding: '64px 20px 0' }}>
        <h2 style={{ textAlign: 'center', fontSize: 'clamp(20px,4vw,28px)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 8 }}>
          How you&apos;ll appear
        </h2>
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: 14, marginBottom: 32 }}>
          Your verified listing sits above all unverified results.
        </p>
        <div style={{ border: '1px solid var(--border)', borderRadius: 14, background: '#fff', overflow: 'hidden', boxShadow: '0 8px 40px rgba(0,0,0,0.08)' }}>
          {/* Header */}
          <div style={{ background: 'linear-gradient(135deg, #0f4c38, #1a6b5a)', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 6 }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="#4ade80"><path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/></svg>
            <span style={{ fontSize: 11, fontWeight: 600, color: '#fff', letterSpacing: '0.04em' }}>Verified listing — appears first</span>
          </div>
          {/* Verified row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px' }}>
            <div style={{ width: 42, height: 42, borderRadius: 9, background: '#1a6b5a', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 15 }}>YN</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: 2 }}>Your Name / Centre</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Addiction Service · Private · Your Location</div>
            </div>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#16a34a', display: 'flex', alignItems: 'center', gap: 4 }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              Verified →
            </span>
          </div>
          {/* Unverified ghost rows */}
          {[1, 2].map(i => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 16px', borderTop: '1px solid var(--border)', opacity: 0.3 }}>
              <div style={{ width: 42, height: 42, borderRadius: 9, background: 'var(--border)', flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ height: 12, background: 'var(--border)', borderRadius: 4, width: '55%', marginBottom: 6 }} />
                <div style={{ height: 10, background: 'var(--border)', borderRadius: 4, width: '35%' }} />
              </div>
              <span style={{ fontSize: 11, color: '#9ca3af' }}>Unverified</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── How it works ── */}
      <section style={{ maxWidth: 760, margin: '0 auto', padding: '64px 20px 0' }}>
        <h2 style={{ textAlign: 'center', fontSize: 'clamp(20px,4vw,28px)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 8 }}>
          Live in under 5 minutes
        </h2>
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: 14, marginBottom: 48 }}>
          No technical setup required.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 32, textAlign: 'left' }}>
          {HOW_IT_WORKS.map(s => (
            <div key={s.n}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--accent-pale)', color: 'var(--accent)', fontWeight: 800, fontSize: 17, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
                {s.n}
              </div>
              <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>{s.title}</h3>
              <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section style={{ padding: '64px 20px 80px' }}>
        <div style={{ maxWidth: 520, margin: '0 auto', background: 'linear-gradient(135deg, #0f4c38, #1a6b5a)', borderRadius: 20, padding: '48px 36px', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(22px,4vw,30px)', fontWeight: 800, color: '#fff', marginBottom: 12, letterSpacing: '-0.02em' }}>
            Ready to get verified?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.75)', marginBottom: 32, lineHeight: 1.6, fontSize: 15 }}>
            £25/month. Verified badge live instantly after payment. Cancel anytime.
          </p>
          <Link href="/verify/onboard" style={{ display: 'inline-block', background: '#fff', color: '#1a6b5a', fontWeight: 800, fontSize: 16, padding: '16px 40px', borderRadius: 50, textDecoration: 'none' }}>
            Get verified now →
          </Link>
        </div>
      </section>

    </main>
  )
}

import type { Metadata } from 'next'
import Link from 'next/link'
import { PositionChecker } from './components'

export const metadata: Metadata = {
  title: 'Advertise on SoberNation — Reach People Searching for Rehab',
  description: 'Promote your rehab centre or counselling service to thousands of people searching for addiction help. Reserve a sponsored position for a flat monthly fee. Cancel anytime.',
}

const HOW_IT_WORKS = [
  {
    n: '1',
    title: 'Pick your position',
    body: 'Choose position 1, 2, or 3 in your city. Position 1 is the very first result people see. Positions are reserved monthly — first come, first served.',
  },
  {
    n: '2',
    title: 'Appear above organic results',
    body: 'Your listing shows at the top of the right location pages, marked "Sponsored". Clicks go straight to your website or SoberNation profile.',
  },
  {
    n: '3',
    title: 'Pay a flat monthly fee',
    body: 'One simple price per position. No auctions, no surprise charges. Cancel anytime — your position opens back up for others.',
  },
]

const TRUST_POINTS = [
  {
    svg: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg>,
    label: 'High-intent traffic',
    sub: 'People actively searching for rehab — not general browsing',
  },
  {
    svg: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.19 2 2 0 012 .01h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.16 6.16l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>,
    label: 'Phone number shown',
    sub: 'Your number visible in every sponsored listing',
  },
  {
    svg: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
    label: 'Full analytics',
    sub: 'Track clicks, phone taps, and impressions in your dashboard',
  },
  {
    svg: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>,
    label: 'Backlink bonus',
    sub: 'Link to SoberNation from your site for an extra visibility boost',
  },
]

export default function AdvertisePage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <div style={{
        background: 'linear-gradient(135deg, #0d4a3a 0%, #0f5f4a 60%, #1a7a5e 100%)',
        padding: '72px 20px 80px',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Subtle grid pattern */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }} />

        <div style={{ maxWidth: 760, margin: '0 auto', position: 'relative', textAlign: 'center' }}>
          {/* Badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: 20, padding: '6px 14px', marginBottom: 24,
          }}>
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#4ade80' }} />
            <span style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.9)', letterSpacing: '0.04em' }}>
              SPONSORED LISTINGS — LIVE NOW
            </span>
          </div>

          <h1 style={{
            fontSize: 'clamp(28px, 5vw, 52px)', fontWeight: 800,
            color: '#fff', letterSpacing: '-0.03em', lineHeight: 1.1,
            marginBottom: 20,
          }}>
            Be the first rehab centre<br />people see in your city
          </h1>

          <p style={{
            fontSize: 'clamp(15px, 2vw, 19px)', color: 'rgba(255,255,255,0.80)',
            lineHeight: 1.6, maxWidth: 560, margin: '0 auto 36px',
          }}>
            SoberNation reaches thousands of people searching for addiction help every month.
            Reserve a sponsored position for a flat monthly fee. Cancel anytime.
          </p>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="/verify"
              style={{
                padding: '14px 28px', background: '#fff', color: '#0d4a3a',
                borderRadius: 8, fontWeight: 700, fontSize: 16, textDecoration: 'none',
                boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
              }}
            >
              Get verified — £25/mo →
            </a>
            <a
              href="#position-checker"
              style={{
                padding: '14px 28px', background: 'rgba(255,255,255,0.12)',
                border: '1px solid rgba(255,255,255,0.25)',
                color: '#fff', borderRadius: 8, fontWeight: 600, fontSize: 16,
                textDecoration: 'none',
              }}
            >
              Sponsored positions ↓
            </a>
          </div>

          {/* Social proof */}
          <div style={{ marginTop: 40, display: 'flex', justifyContent: 'center', gap: 32, flexWrap: 'wrap' }}>
            {[
              { value: '14,200+', label: 'monthly searches — London' },
              { value: '3,200+', label: 'monthly searches — Manchester' },
              { value: '£0', label: 'cost to list your centre' },
            ].map(s => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>{s.value}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 20px 80px' }}>

        {/* ── How it works ──────────────────────────────────────────────── */}
        <section id="how-it-works" style={{ padding: '64px 0 0' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <h2 style={{ fontSize: 'clamp(22px,4vw,32px)', fontWeight: 800, color: 'var(--text)', marginBottom: 10, letterSpacing: '-0.02em' }}>
              How it works
            </h2>
            <p style={{ fontSize: 15, color: 'var(--text-muted)', maxWidth: 480, margin: '0 auto' }}>
              Simple sponsored positions on the right location pages. No bidding wars.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
            {HOW_IT_WORKS.map(step => (
              <div key={step.n} style={{
                padding: '28px 24px',
                background: 'var(--white)', border: '1px solid var(--border)',
                borderRadius: 14,
              }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 10,
                  background: 'var(--accent)', color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 18, fontWeight: 800, marginBottom: 16,
                }}>
                  {step.n}
                </div>
                <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>{step.title}</div>
                <div style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6 }}>{step.body}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Position Checker ──────────────────────────────────────────── */}
        <section id="position-checker" style={{ paddingTop: 64 }}>
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <h2 style={{ fontSize: 'clamp(20px,4vw,28px)', fontWeight: 800, color: 'var(--text)', marginBottom: 8, letterSpacing: '-0.02em' }}>
              Check live positions in your city
            </h2>
            <p style={{ fontSize: 14, color: 'var(--text-muted)', margin: 0 }}>
              See which sponsored slots are taken and which are available right now.
            </p>
          </div>

          <div style={{
            background: 'var(--white)', border: '1px solid var(--border)',
            borderRadius: 16, padding: '28px 24px',
          }}>
            <PositionChecker />
          </div>
        </section>

        {/* ── Simple pricing table ───────────────────────────────────────── */}
        <section style={{ paddingTop: 64 }}>
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <h2 style={{ fontSize: 'clamp(20px,4vw,28px)', fontWeight: 800, color: 'var(--text)', marginBottom: 8, letterSpacing: '-0.02em' }}>
              Simple, transparent pricing
            </h2>
            <p style={{ fontSize: 14, color: 'var(--text-muted)', margin: 0 }}>
              One flat monthly fee per position. No hidden costs, no bidding.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
            {[
              { pos: 1, label: 'Position 1', sub: 'Top of the page — maximum visibility', centrePrice: 150, ccPrice: 15, highlight: true },
              { pos: 2, label: 'Position 2', sub: 'Second result — great value', centrePrice: 100, ccPrice: 10, highlight: false },
              { pos: 3, label: 'Position 3', sub: 'Third result — entry level', centrePrice: 50, ccPrice: 5, highlight: false },
            ].map(p => (
              <div key={p.pos} style={{
                padding: '28px 24px', borderRadius: 14, position: 'relative',
                background: p.highlight ? 'linear-gradient(135deg, #0d4a3a, #1a7a5e)' : 'var(--white)',
                border: p.highlight ? 'none' : '1px solid var(--border)',
              }}>
                {p.highlight && (
                  <div style={{ position: 'absolute', top: -10, left: '50%', transform: 'translateX(-50%)', background: '#4ade80', color: '#0d4a3a', fontSize: 10, fontWeight: 800, padding: '3px 12px', borderRadius: 20, letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>
                    MOST VISIBLE
                  </div>
                )}
                <div style={{ fontSize: 36, fontWeight: 800, marginBottom: 4, color: p.highlight ? '#fff' : 'var(--accent)' }}>{p.pos}</div>
                <div style={{ fontSize: 17, fontWeight: 700, color: p.highlight ? '#fff' : 'var(--text)', marginBottom: 4 }}>{p.label}</div>
                <div style={{ fontSize: 12, color: p.highlight ? 'rgba(255,255,255,0.7)' : 'var(--text-muted)', marginBottom: 20 }}>{p.sub}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', borderRadius: 8, background: p.highlight ? 'rgba(255,255,255,0.12)' : 'var(--accent-pale)' }}>
                    <span style={{ fontSize: 13, color: p.highlight ? 'rgba(255,255,255,0.8)' : 'var(--text-muted)' }}>Rehab centre</span>
                    <span style={{ fontSize: 18, fontWeight: 800, color: p.highlight ? '#fff' : 'var(--accent)' }}>£{p.centrePrice}<span style={{ fontSize: 11, fontWeight: 500 }}>/mo</span></span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', borderRadius: 8, background: p.highlight ? 'rgba(255,255,255,0.12)' : 'var(--bg)' }}>
                    <span style={{ fontSize: 13, color: p.highlight ? 'rgba(255,255,255,0.8)' : 'var(--text-muted)' }}>Counsellor</span>
                    <span style={{ fontSize: 18, fontWeight: 800, color: p.highlight ? '#fff' : 'var(--text)' }}>£{p.ccPrice}<span style={{ fontSize: 11, fontWeight: 500 }}>/mo</span></span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Trust points ──────────────────────────────────────────────── */}
        <section style={{ paddingTop: 64 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
            {TRUST_POINTS.map(p => (
              <div key={p.label} style={{
                padding: '20px', borderRadius: 12,
                background: 'var(--accent-pale)', border: '1px solid #c8e6df',
              }}>
                <div style={{ marginBottom: 8 }}>{p.svg}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>{p.label}</div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5 }}>{p.sub}</div>
              </div>
            ))}
          </div>
        </section>



        {/* ── Bottom CTA ────────────────────────────────────────────────── */}
        <section style={{ paddingTop: 64 }}>
          <div style={{
            background: 'linear-gradient(135deg, #0d4a3a, #1a7a5e)',
            borderRadius: 20, padding: '48px 36px', textAlign: 'center',
          }}>
            <h2 style={{ fontSize: 'clamp(22px,4vw,32px)', fontWeight: 800, color: '#fff', marginBottom: 12, letterSpacing: '-0.02em' }}>
              Ready to grow on SoberNation?
            </h2>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.78)', marginBottom: 28, maxWidth: 460, margin: '0 auto 28px' }}>
              Start with a verified listing — £25/month, badge live on payment, cancel anytime.
              Or jump straight to a sponsored position.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link
                href="/verify"
                style={{
                  padding: '14px 28px', background: '#fff', color: '#0d4a3a',
                  borderRadius: 8, fontWeight: 700, fontSize: 16, textDecoration: 'none',
                }}
              >
                Get verified — £25/mo →
              </Link>
              <a
                href="#position-checker"
                style={{
                  padding: '14px 28px', background: 'rgba(255,255,255,0.12)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  color: '#fff', borderRadius: 8, fontWeight: 600, fontSize: 16, textDecoration: 'none',
                }}
              >
                See sponsored positions
              </a>
            </div>
          </div>
        </section>

        {/* ── More ways to grow ─────────────────────────────────────────── */}
        <section style={{ paddingTop: 64 }}>
          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <h2 style={{ fontSize: 'clamp(22px,4vw,32px)', fontWeight: 800, color: 'var(--text)', marginBottom: 10, letterSpacing: '-0.02em' }}>
              More ways to grow on SoberNation
            </h2>
            <p style={{ fontSize: 15, color: 'var(--text-muted)', maxWidth: 480, margin: '0 auto' }}>
              Beyond sponsored positions — enhance your profile, own a city, or receive pre-matched enquiries directly.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>

            {/* Enhanced Listing */}
            <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 14, padding: '24px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              </div>
              <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>Enhanced Listing</div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6, flex: 1, marginBottom: 16 }}>
                Blue verified tick, priority positioning, photos, accreditation badge, and testimonials on your profile.
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent)', marginBottom: 10 }}>From £8/mo</div>
              <Link href="/advertise/enhance"
                style={{ display: 'block', textAlign: 'center', padding: '10px', borderRadius: 8, background: 'var(--accent-pale)', color: 'var(--accent)', fontWeight: 700, fontSize: 13, textDecoration: 'none' }}>
                Upgrade your listing →
              </Link>
            </div>

            {/* City Exclusivity */}
            <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 14, padding: '24px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: '#fefce8', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ca8a04" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              </div>
              <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>City Exclusive Partner</div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6, flex: 1, marginBottom: 16 }}>
                Own the top spot in your city. Full-width banner above all listings. Only one per city — forever.
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent)', marginBottom: 10 }}>From £150/mo</div>
              <Link href="/advertise/exclusivity"
                style={{ display: 'block', textAlign: 'center', padding: '10px', borderRadius: 8, background: 'var(--accent-pale)', color: 'var(--accent)', fontWeight: 700, fontSize: 13, textDecoration: 'none' }}>
                Check availability →
              </Link>
            </div>

            {/* Matching Network */}
            <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 14, padding: '24px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
              </div>
              <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>Matching Network</div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6, flex: 1, marginBottom: 16 }}>
                Receive pre-qualified enquiries from people actively looking for rehab near you. You just answer the call.
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent)', marginBottom: 10 }}>£99/mo · no commission</div>
              <Link href="/advertise/matching"
                style={{ display: 'block', textAlign: 'center', padding: '10px', borderRadius: 8, background: 'var(--accent-pale)', color: 'var(--accent)', fontWeight: 700, fontSize: 13, textDecoration: 'none' }}>
                Join the network →
              </Link>
            </div>

            {/* Helpline Sponsorship */}
            <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 14, padding: '24px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: '#fef2f2', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.19 2 2 0 012 .01h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.16 6.16l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
              </div>
              <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>Helpline Sponsorship</div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6, flex: 1, marginBottom: 16 }}>
                Your brand next to the helpline number on every page. Seen by thousands seeking help every month.
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent)', marginBottom: 10 }}>From £200/mo</div>
              <Link href="/advertise/helpline"
                style={{ display: 'block', textAlign: 'center', padding: '10px', borderRadius: 8, background: 'var(--accent-pale)', color: 'var(--accent)', fontWeight: 700, fontSize: 13, textDecoration: 'none' }}>
                View packages →
              </Link>
            </div>

          </div>
        </section>

      </div>

      {/* Footer */}
      <div style={{ borderTop: '1px solid var(--border)', padding: '24px 20px', background: 'var(--white)', marginTop: 0 }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ fontSize: 12, color: 'var(--text-light)' }}>© {new Date().getFullYear()} SoberNation · Advertising platform</div>
          <div style={{ display: 'flex', gap: 20 }}>
            {[['Home', '/'], ['Find rehab', '/rehab'], ['My dashboard', '/advertise/dashboard'], ['Privacy', '/privacy-policy']].map(([l, h]) => (
              <Link key={h} href={h} style={{ fontSize: 12, color: 'var(--text-light)', textDecoration: 'none' }}>{l}</Link>
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}

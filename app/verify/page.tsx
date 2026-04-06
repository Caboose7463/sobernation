import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Get Verified | SoberNation',
  description: 'Claim your rehab centre or counsellor listing on SoberNation. Get a verified badge, manage your contact info, and reach people seeking help.',
}

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
  </svg>
)

export default function VerifyLandingPage() {
  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg)' }}>

      {/* ── Hero ── */}
      <section style={{
        background: 'linear-gradient(135deg, #0f4c38 0%, #1a6b5a 50%, #2d8a72 100%)',
        padding: '80px 20px 120px',
        textAlign: 'center',
        color: '#fff',
      }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
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

          <h1 style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: 20, color: '#ffffff' }}>
            Add your listing &amp; get verified
          </h1>
          <p style={{ fontSize: 18, lineHeight: 1.7, marginBottom: 32, maxWidth: 520, margin: '0 auto 32px', color: 'rgba(255,255,255,0.88)' }}>
            Claim your rehab centre or counsellor listing on SoberNation. Get a verified badge, manage your contact info, and reach thousands of people searching for help.
          </p>

          {/* Live traffic stat */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 12, padding: '10px 20px', marginBottom: 32 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#4ade80', display: 'inline-block', boxShadow: '0 0 0 3px rgba(74,222,128,0.3)', animation: 'pulse 2s infinite' }} />
            <style>{`@keyframes pulse { 0%,100%{box-shadow:0 0 0 3px rgba(74,222,128,0.3)} 50%{box-shadow:0 0 0 6px rgba(74,222,128,0.1)} }`}</style>
            <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.9)', fontWeight: 500 }}>
              <strong style={{ color: '#fff' }}>3,200+</strong> people searching for rehab &amp; counselling on SoberNation this month
            </span>
          </div>

          <div>
            <Link href="/verify/onboard" style={{
              display: 'inline-block', background: '#fff', color: '#1a6b5a',
              fontWeight: 700, fontSize: 16, padding: '16px 40px',
              borderRadius: 50, textDecoration: 'none',
              boxShadow: '0 8px 32px rgba(0,0,0,0.15)', transition: 'transform 0.15s',
            }}>
              Add listing &amp; get verified — from £10/month
            </Link>
            <p style={{ marginTop: 12, fontSize: 13, color: 'rgba(255,255,255,0.55)' }}>
              No contract. Cancel anytime.
            </p>
          </div>
        </div>
      </section>

      {/* ── Social proof strip ── */}
      <section style={{ background: '#fff', borderBottom: '1px solid var(--border)', padding: '20px 20px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-light)', marginBottom: 16 }}>
            Trusted by providers across the UK
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px 24px' }}>
            {[
              'Turning Point', 'Change Grow Live', 'With You', 'Forward Leeds',
              'Swanswell', 'UKAT', 'Priory Group', 'Castle Craig',
            ].map(name => (
              <span key={name} style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-muted)', opacity: 0.7 }}>{name}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── ROI stats bar ── */}
      <section style={{ background: 'var(--accent-pale)', borderBottom: '1px solid #c8e6df', padding: '28px 20px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 24, textAlign: 'center' }}>
          {[
            { stat: '3,200+', label: 'monthly searches on SoberNation' },
            { stat: '1 patient', label: 'covers 2–3 years of your subscription' },
            { stat: '#1', label: 'position in your location — always' },
            { stat: '5 min', label: 'to set up and go live' },
          ].map(s => (
            <div key={s.stat}>
              <div style={{ fontSize: 26, fontWeight: 700, color: 'var(--accent)', lineHeight: 1 }}>{s.stat}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4, lineHeight: 1.4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Pricing cards ── */}
      <section style={{ maxWidth: 760, margin: '0 auto', padding: '60px 20px 80px' }}>
        <h2 style={{ textAlign: 'center', fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Simple, transparent pricing</h2>
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: 40, fontSize: 15 }}>One patient covers years of your subscription cost</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>

          {/* Counsellor card */}
          <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 16, padding: '32px 28px', boxShadow: '0 4px 24px rgba(0,0,0,0.07)' }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-light)', marginBottom: 12 }}>Counsellors</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 4 }}>
              <span style={{ fontSize: 40, fontWeight: 700, color: 'var(--text)' }}>£10</span>
              <span style={{ fontSize: 14, color: 'var(--text-muted)' }}>/month per location</span>
            </div>
            <p style={{ fontSize: 12, color: 'var(--accent)', fontWeight: 600, marginBottom: 16 }}>
              £120/year — covered by a single new client
            </p>
            <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 24, lineHeight: 1.6 }}>
              Show up as a verified counsellor in every location you practise.
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
              {[
                'Verified badge — appear above unverified listings',
                'Direct link to your website when clicked',
                'Competitors folded below "View all" for searchers',
                'Edit your contact info & photo',
                'BACP registration displayed',
                'Billing portal & invoices',
              ].map(f => (
                <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14 }}>
                  <span style={{ color: 'var(--accent)', flexShrink: 0, marginTop: 1 }}><CheckIcon /></span>
                  {f}
                </li>
              ))}
            </ul>
            <Link href="/verify/onboard?type=counsellor" style={{ display: 'block', textAlign: 'center', background: 'var(--accent)', color: '#fff', padding: '13px 20px', borderRadius: 10, fontWeight: 600, fontSize: 15, textDecoration: 'none' }}>
              Get verified as a counsellor
            </Link>
          </div>

          {/* Centre card */}
          <div style={{ background: '#fff', border: '2px solid var(--accent)', borderRadius: 16, padding: '32px 28px', boxShadow: '0 4px 24px rgba(26,107,90,0.12)', position: 'relative' }}>
            <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: 'var(--accent)', color: '#fff', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '4px 14px', borderRadius: 100, whiteSpace: 'nowrap' }}>Most popular</div>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 12 }}>Rehab Centres</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 4 }}>
              <span style={{ fontSize: 40, fontWeight: 700, color: 'var(--text)' }}>£99</span>
              <span style={{ fontSize: 14, color: 'var(--text-muted)' }}>/month per location</span>
            </div>
            <p style={{ fontSize: 12, color: 'var(--accent)', fontWeight: 600, marginBottom: 16 }}>
              £1,188/year — covered by a single admission
            </p>
            <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 24, lineHeight: 1.6 }}>
              Full centre verification with priority placement and direct website link.
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
              {[
                'Verified badge — appear above all unverified centres',
                'Direct link to your website when clicked',
                'Competitors folded below "View all" — you dominate the page',
                'CQC registration number displayed',
                'Edit contact info & website',
                'Multi-location support',
                'Billing portal & invoices',
              ].map(f => (
                <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14 }}>
                  <span style={{ color: 'var(--accent)', flexShrink: 0, marginTop: 1 }}><CheckIcon /></span>
                  {f}
                </li>
              ))}
            </ul>
            <Link href="/verify/onboard?type=centre" style={{ display: 'block', textAlign: 'center', background: 'var(--accent)', color: '#fff', padding: '13px 20px', borderRadius: 10, fontWeight: 600, fontSize: 15, textDecoration: 'none' }}>
              Get verified as a centre
            </Link>
          </div>
        </div>

        <p style={{ textAlign: 'center', marginTop: 32, fontSize: 14, color: 'var(--text-muted)' }}>
          Already verified?{' '}
          <Link href="/verify/login" style={{ color: 'var(--accent)', fontWeight: 600 }}>
            Log in to your dashboard
          </Link>
        </p>
      </section>

      {/* ── Testimonials ── */}
      <section style={{ background: '#fff', borderTop: '1px solid var(--border)', padding: '64px 20px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, textAlign: 'center', marginBottom: 8 }}>What providers say</h2>
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: 40, fontSize: 15 }}>From centres and counsellors across the UK</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            {[
              {
                quote: "Within the first month, we had 3 enquiries we could directly attribute to our SoberNation listing. The £99 paid for itself before the second billing date.",
                name: 'Clinical Director',
                org: 'Residential Rehab Centre, Manchester',
              },
              {
                quote: "Being the only verified counsellor in my area means when someone searches, they see my name first and click straight through to my booking page. It's effortless.",
                name: 'BACP-Accredited Counsellor',
                org: 'Private Practice, Leeds',
              },
              {
                quote: "The setup took literally 5 minutes. The badge went live the moment we paid and we immediately looked more credible than the other centres in our city.",
                name: 'Admissions Manager',
                org: 'Addiction Treatment Centre, Bristol',
              },
            ].map((t, i) => (
              <div key={i} style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 14, padding: '24px 22px' }}>
                <div style={{ fontSize: 20, color: 'var(--accent)', marginBottom: 12, lineHeight: 1 }}>&ldquo;</div>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--text)', marginBottom: 16 }}>{t.quote}</p>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{t.org}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section style={{ borderTop: '1px solid var(--border)', padding: '64px 20px' }}>
        <div style={{ maxWidth: 680, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Live in under 5 minutes</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: 48 }}>No technical setup. No waiting for approval.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 32, textAlign: 'left' }}>
            {[
              { n: '1', title: 'Create account', desc: 'Sign up with your email. Takes 30 seconds.' },
              { n: '2', title: 'Claim your listing', desc: 'Search for your centre or name and claim it — or add a new one.' },
              { n: '3', title: 'Pay securely', desc: 'Stripe checkout. Cancel any time, no lock-in.' },
              { n: '4', title: 'Badge goes live', desc: 'Your verified badge appears instantly. Competitors fold below you.' },
            ].map(s => (
              <div key={s.n}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--accent-pale)', color: 'var(--accent)', fontWeight: 700, fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
                  {s.n}
                </div>
                <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 6 }}>{s.title}</h3>
                <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section style={{ background: 'linear-gradient(135deg, #0f4c38, #1a6b5a)', padding: '60px 20px', textAlign: 'center' }}>
        <div style={{ maxWidth: 520, margin: '0 auto' }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, color: '#fff', marginBottom: 12 }}>Ready to get verified?</h2>
          <p style={{ color: 'rgba(255,255,255,0.75)', marginBottom: 32, lineHeight: 1.6 }}>Join rehab centres and counsellors across the UK who are turning searches into admissions.</p>
          <Link href="/verify/onboard" style={{ display: 'inline-block', background: '#fff', color: '#1a6b5a', fontWeight: 700, fontSize: 16, padding: '16px 40px', borderRadius: 50, textDecoration: 'none' }}>
            Start free — takes 5 minutes
          </Link>
        </div>
      </section>

    </main>
  )
}

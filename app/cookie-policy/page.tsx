import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'How SoberNation uses cookies and similar technologies on sobernation.co.uk.',
}

export default function CookiePolicyPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--white)' }}>
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '56px 20px 80px' }}>

        <nav style={{ fontSize: 12, color: 'var(--text-light)', marginBottom: 20 }}>
          <Link href="/" style={{ color: 'var(--text-light)', textDecoration: 'none' }}>Home</Link>
          {' / '}
          <span>Cookie Policy</span>
        </nav>

        <h1 style={{ fontSize: 'clamp(24px,4vw,36px)', fontWeight: 700, color: 'var(--text)', marginBottom: 8, letterSpacing: '-0.02em' }}>
          Cookie Policy
        </h1>
        <p style={{ fontSize: 13, color: 'var(--text-light)', marginBottom: 48 }}>
          Last updated: April 2026
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 32, fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.75 }}>

          <section>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)', marginBottom: 10 }}>What are cookies?</h2>
            <p>
              Cookies are small text files placed on your device when you visit a website. They help websites remember your preferences and improve your experience. This policy explains how SoberNation (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) uses cookies at <strong>sobernation.co.uk</strong>.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)', marginBottom: 10 }}>Cookies we use</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                {
                  name: 'Strictly necessary',
                  desc: 'These cookies are required for the site to function. They include session management for our community forum and authentication cookies if you are logged in. You cannot opt out of these.',
                  examples: 'Session ID, authentication token',
                },
                {
                  name: 'Analytics (Google Analytics 4)',
                  desc: 'We use Google Analytics to understand how visitors navigate our site — for example, which pages are read most and where users come from. This data is aggregated and anonymous. We operate Google Consent Mode v2; analytics cookies are only set after you have accepted them.',
                  examples: '_ga, _ga_*, _gid',
                },
                {
                  name: 'Advertising (Google AdSense)',
                  desc: 'We display Google AdSense advertisements to help fund the running of SoberNation. These may set cookies used to show relevant ads. Ad cookies are only set after you have accepted them.',
                  examples: 'IDE, test_cookie, DSID',
                },
                {
                  name: 'Preferences',
                  desc: 'We store your cookie consent choice so we don\'t ask every time you visit.',
                  examples: 'sn_cookie_consent',
                },
              ].map(item => (
                <div key={item.name} style={{ borderLeft: '3px solid var(--accent)', paddingLeft: 16 }}>
                  <div style={{ fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>{item.name}</div>
                  <p style={{ margin: '0 0 4px' }}>{item.desc}</p>
                  <p style={{ margin: 0, fontSize: 13, color: 'var(--text-light)' }}>
                    <strong>Examples:</strong> {item.examples}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)', marginBottom: 10 }}>Managing your cookies</h2>
            <p>
              You can withdraw or change your consent at any time by clicking the cookie settings button in our banner. You can also delete or block cookies through your browser settings — see your browser&apos;s help pages for instructions. Note that disabling certain cookies may affect the functionality of the site.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)', marginBottom: 10 }}>Third-party links</h2>
            <p>
              Our site contains links to external websites (e.g. the NHS, Frank, BACP). These sites have their own cookie policies and we have no control over their use of cookies.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)', marginBottom: 10 }}>Contact</h2>
            <p>
              If you have questions about our use of cookies, please contact us at{' '}
              <a href="mailto:editorial@sobernation.co.uk" style={{ color: 'var(--accent)' }}>editorial@sobernation.co.uk</a>.
            </p>
          </section>

        </div>

        <div style={{ marginTop: 48, paddingTop: 24, borderTop: '1px solid var(--border)', display: 'flex', gap: 20 }}>
          <Link href="/privacy-policy" style={{ fontSize: 13, color: 'var(--text-muted)', textDecoration: 'none' }}>Privacy Policy</Link>
          <Link href="/terms" style={{ fontSize: 13, color: 'var(--text-muted)', textDecoration: 'none' }}>Terms</Link>
          <Link href="/about" style={{ fontSize: 13, color: 'var(--text-muted)', textDecoration: 'none' }}>About</Link>
        </div>
      </div>
    </div>
  )
}

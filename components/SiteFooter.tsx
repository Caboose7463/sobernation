/**
 * components/SiteFooter.tsx
 * Shared footer with rich links, used across all pages via layout.tsx
 */
import Link from 'next/link'
import NewsletterSignup from './NewsletterSignup'

export default function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer style={{ background: '#111827', color: '#9ca3af', marginTop: 'auto' }}>

      {/* Newsletter strip */}
      <div style={{ background: '#1f2937', borderBottom: '1px solid #374151' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px' }}>
          <NewsletterSignup variant="banner" source="footer" />
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '56px 24px 32px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '36px 24px' }}>

        {/* Brand */}
        <div style={{ gridColumn: '1 / -1', maxWidth: 320 }}>
          <div style={{ fontSize: 20, fontWeight: 800, color: '#fff', marginBottom: 10, letterSpacing: '-0.02em' }}>
            SoberNation
          </div>
          <p style={{ fontSize: 13, lineHeight: 1.7, marginBottom: 16 }}>
            The UK&apos;s addiction recovery hub. Free information on rehab centres, counsellors, NHS services and recovery support.
          </p>
          <a href="tel:03001236600" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#c0392b', color: '#fff', fontSize: 13, fontWeight: 700, padding: '9px 16px', borderRadius: 8, textDecoration: 'none' }}>
            Help: 0300 123 6600
          </a>
        </div>

        {/* Find Rehab */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6b7280', marginBottom: 14 }}>Find Rehab</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
            {[
              ['/rehab/london', 'Rehab near you'],
              ['/alcohol-rehab/london', 'Alcohol rehab'],
              ['/drug-rehab/london', 'Drug rehab'],
              ['/nhs-rehab/london', 'NHS rehab (free)'],
              ['/private-rehab/london', 'Private rehab'],
              ['/residential-rehab/london', 'Residential rehab'],
              ['/detox-centres/london', 'Detox centres'],
            ].map(([href, label]) => (
              <Link key={href} href={href} style={{ fontSize: 13, color: '#9ca3af', textDecoration: 'none' }} className="footer-link">{label}</Link>
            ))}
          </div>
        </div>

        {/* Support */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6b7280', marginBottom: 14 }}>Support</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
            {[
              ['/aa-meetings/london', 'AA meetings'],
              ['/na-meetings/london', 'NA meetings'],
              ['/al-anon/london', 'Al-Anon (families)'],
              ['/smart-recovery/london', 'SMART Recovery'],
              ['/counsellors/london', 'Find a counsellor'],
              ['/community', 'Community hub'],
            ].map(([href, label]) => (
              <Link key={href} href={href} style={{ fontSize: 13, color: '#9ca3af', textDecoration: 'none' }} className="footer-link">{label}</Link>
            ))}
          </div>
        </div>

        {/* Guides */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6b7280', marginBottom: 14 }}>Guides</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
            {[
              ['/how-to-stop-drinking', 'How to stop drinking'],
              ['/signs-of-alcoholism', 'Signs of alcoholism'],
              ['/alcohol-withdrawal-symptoms', 'Alcohol withdrawal'],
              ['/heroin-withdrawal-symptoms', 'Heroin withdrawal'],
              ['/withdrawal-timeline', 'Withdrawal timeline'],
              ['/articles', 'News & articles'],
            ].map(([href, label]) => (
              <Link key={href} href={href} style={{ fontSize: 13, color: '#9ca3af', textDecoration: 'none' }} className="footer-link">{label}</Link>
            ))}
          </div>
        </div>

        {/* Tools */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6b7280', marginBottom: 14 }}>Tools</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
            {[
              ['/sobriety-counter', 'Sobriety counter'],
              ['/am-i-an-alcoholic', 'Am I an alcoholic?'],
              ['/alcohol-units-calculator', 'Units calculator'],
              ['/addiction-cost-calculator', 'Cost calculator'],
              ['/find-rehab', 'Find rehab near me'],
            ].map(([href, label]) => (
              <Link key={href} href={href} style={{ fontSize: 13, color: '#9ca3af', textDecoration: 'none' }} className="footer-link">{label}</Link>
            ))}
          </div>
        </div>

        {/* Company */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6b7280', marginBottom: 14 }}>Company</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
            {[
              ['/about', 'About us'],
              ['/editorial-policy', 'Editorial policy'],
              ['/privacy-policy', 'Privacy policy'],
              ['/cookie-policy', 'Cookie policy'],
              ['/contact', 'Contact'],
            ].map(([href, label]) => (
              <Link key={href} href={href} style={{ fontSize: 13, color: '#9ca3af', textDecoration: 'none' }} className="footer-link">{label}</Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid #1f2937', padding: '20px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 10, fontSize: 12 }}>
          <span>© {year} SoberNation · CQC data: Open Government Licence</span>
          <span>Information on this site is for educational purposes only. Always seek professional medical advice in a crisis. Call <strong style={{ color: '#fff' }}>999</strong> or go to A&amp;E.</span>
        </div>
      </div>

      <style>{`
        .footer-link:hover { color: #fff !important; }
      `}</style>
    </footer>
  )
}

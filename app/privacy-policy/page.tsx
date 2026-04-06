import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy | SoberNation',
  description: 'SoberNation privacy policy — how we handle your data, cookies, and personal information in compliance with UK GDPR.',
}

const LAST_UPDATED = '5 April 2026'

export default function PrivacyPolicyPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>

      <div className="container-wide" style={{ padding: '48px 20px', maxWidth: 720 }}>
        <div style={{ fontSize: 12, color: 'var(--text-light)', marginBottom: 8 }}>Last updated: {LAST_UPDATED}</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: 'var(--text)', marginBottom: 24, letterSpacing: '-0.02em' }}>Privacy Policy</h1>

        {[
          {
            title: '1. Who we are',
            body: 'SoberNation ("we", "us", or "our") is a UK addiction information resource. Our website is sobernation.co.uk. For privacy-related enquiries, contact us at: editorial@sobernation.co.uk',
          },
          {
            title: '2. What data we collect',
            body: 'SoberNation is an information resource that does not require users to create accounts or submit personal information. We collect: (a) anonymised analytics data via Google Analytics (page views, session duration, geographic location at country/region level) — this does not identify you personally; (b) standard server logs including IP addresses and browser information, retained for security and diagnostic purposes for 30 days. We do not collect names, email addresses, health information, or any sensitive personal data.',
          },
          {
            title: '3. Cookies',
            body: 'We use the following types of cookies: (a) Strictly necessary cookies, required for the website to function; (b) Analytics cookies (Google Analytics) to understand how our content is used — these are set with your consent; (c) Advertising cookies — we display ads through Google AdSense. Google uses cookies (including the DoubleClick cookie) to serve ads based on your prior visits to this and other websites. You can opt out of personalised advertising at any time by visiting Google\'s Ads Settings (myaccount.google.com/data-and-privacy) or by clicking "Essential only" on our cookie banner. When you decline personalised advertising, Google may still serve non-personalised ads.',
          },
          {
            title: '4. How we use data and advertising',
            body: 'Analytics data is used solely to improve the quality and relevance of our content. We display advertisements through Google AdSense to help fund the free resources we provide. Google AdSense may use your data to show relevant ads. We do not sell your data to third parties. You can manage cookie preferences at any time using our cookie banner or through your browser settings. For more information on how Google uses data, see: policies.google.com/technologies/ads',
          },
          {
            title: '5. Your rights under UK GDPR',
            body: 'Under UK GDPR, you have the right to: access your personal data; request correction of inaccurate data; request deletion of your data; object to processing of your data; and withdraw consent at any time. As we collect minimal personal data through normal site use, most of these rights are satisfied by the nature of our data collection. Contact editorial@sobernation.co.uk to exercise any of these rights.',
          },
          {
            title: '6. Third-party links',
            body: 'SoberNation contains links to third-party websites including NHS.uk, talktofrank.com, CQC.org.uk, and others. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies.',
          },
          {
            title: '7. Health information disclaimer',
            body: 'SoberNation does not store, process, or share any health or medical information you may share in communications with us. Any personal health information shared in email communications is used only to respond to your enquiry and is not retained.',
          },
          {
            title: '8. Contact',
            body: 'For privacy enquiries, contact: editorial@sobernation.co.uk. If you are not satisfied with our response, you have the right to lodge a complaint with the Information Commissioner\'s Office (ICO): ico.org.uk | 0303 123 1113.',
          },
        ].map(section => (
          <div key={section.title} style={{ marginBottom: 28 }}>
            <h2 style={{ fontSize: 17, fontWeight: 700, color: 'var(--text)', marginBottom: 10 }}>{section.title}</h2>
            <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.8 }}>{section.body}</p>
          </div>
        ))}

        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 32, paddingTop: 24, borderTop: '1px solid var(--border)' }}>
          <Link href="/about" style={{ fontSize: 13, color: 'var(--text-muted)', textDecoration: 'none' }}>About SoberNation</Link>
          <Link href="/terms" style={{ fontSize: 13, color: 'var(--text-muted)', textDecoration: 'none' }}>Terms of Use</Link>
          <Link href="/editorial-policy" style={{ fontSize: 13, color: 'var(--text-muted)', textDecoration: 'none' }}>Editorial Policy</Link>
          <Link href="/" style={{ fontSize: 13, color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
        </div>
      </div>
    </div>
  )
}

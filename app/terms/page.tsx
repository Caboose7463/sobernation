import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Use | SoberNation',
  description: 'SoberNation terms of use — conditions for using this site, medical disclaimer, and limitation of liability.',
}

export default function TermsPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <nav style={{ borderBottom: '1px solid var(--border)', background: 'var(--white)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div className="container-wide" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 56 }}>
          <Link href="/" style={{ fontWeight: 700, fontSize: 15, color: 'var(--text)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 26, height: 26, borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 700 }}>S</span>
            SoberNation
          </Link>
        </div>
      </nav>
      <div className="container-wide" style={{ padding: '48px 20px', maxWidth: 720 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: 'var(--text)', marginBottom: 24, letterSpacing: '-0.02em' }}>Terms of Use</h1>
        {[
          { title: '1. Acceptance of terms', body: 'By accessing and using sobernation.co.uk ("the Site"), you agree to these Terms of Use. If you do not agree, please do not use the Site.' },
          { title: '2. Information only — not medical advice', body: 'The content on SoberNation is provided for general informational and educational purposes only. It does not constitute medical advice, diagnosis, or treatment. Always seek the advice of your GP or other qualified health provider with any questions you may have regarding a medical condition. Never disregard professional medical advice because of something you have read on this Site.' },
          { title: '3. Emergency situations', body: 'If you are in immediate danger, experiencing a medical emergency, or at risk of serious harm, call 999 immediately or go to your nearest A&E. SoberNation is not a crisis service and cannot respond to individual emergencies.' },
          { title: '4. Treatment facility information', body: 'Information about treatment facilities on SoberNation is sourced from the CQC public register and is provided for informational purposes. We do not endorse, recommend, or warrant any specific facility. Always verify the current registration and quality rating of any facility directly with the CQC before making treatment decisions.' },
          { title: '5. Accuracy of information', body: 'We make reasonable efforts to ensure information on this Site is accurate and current. However, we cannot guarantee the accuracy, completeness, or currency of all content. Medical guidelines, drug classifications, and NHS services change over time — always verify clinical information with your healthcare provider.' },
          { title: '6. Limitation of liability', body: 'To the fullest extent permitted by law, SoberNation shall not be liable for any loss or damage arising from your use of, or reliance on, information on this Site. This includes direct, indirect, consequential, or incidental loss.' },
          { title: '7. Intellectual property', body: 'All content on SoberNation, including text, design, and structure, is owned by SoberNation unless otherwise stated. Content may not be reproduced, distributed, or republished without express written permission, except for personal, non-commercial use.' },
          { title: '8. External links', body: 'SoberNation contains links to external websites. We are not responsible for the content or practices of external sites. Links do not constitute endorsement of those sites or their content.' },
          { title: '9. Changes to terms', body: 'We may update these Terms of Use from time to time. Continued use of the Site after changes constitutes acceptance of the revised terms.' },
          { title: '10. Governing law', body: 'These Terms of Use are governed by the laws of England and Wales. Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.' },
        ].map(section => (
          <div key={section.title} style={{ marginBottom: 24 }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>{section.title}</h2>
            <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.8, margin: 0 }}>{section.body}</p>
          </div>
        ))}
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 32, paddingTop: 24, borderTop: '1px solid var(--border)' }}>
          <Link href="/about" style={{ fontSize: 13, color: 'var(--text-muted)', textDecoration: 'none' }}>About</Link>
          <Link href="/privacy-policy" style={{ fontSize: 13, color: 'var(--text-muted)', textDecoration: 'none' }}>Privacy Policy</Link>
          <Link href="/editorial-policy" style={{ fontSize: 13, color: 'var(--text-muted)', textDecoration: 'none' }}>Editorial Policy</Link>
        </div>
      </div>
    </div>
  )
}

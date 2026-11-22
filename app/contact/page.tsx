import type { Metadata } from 'next'
import type { CSSProperties } from 'react'
import Link from 'next/link'
import ContactForm from '../../components/ContactForm'
import { CONTACT_EMAIL, HELPLINES, SITE_URL } from '../../lib/trust'

// Contact details already published by the site (footer, privacy policy and organisation schema).
// The owner must confirm the phone number and postal address are current; see the editorial notes.
const PHONE_DISPLAY = '020 4634 4476'
const PHONE_TEL = '02046344476'
const PHONE_HOURS = 'Monday to Friday, 9am to 5pm'
const POSTAL_LINES = ['Office 1, 1 Coldbath Square', 'London', 'EC1R 5HL']

export const metadata: Metadata = {
  title: 'Contact Sober Nation | Email, Phone and Corrections',
  description: `Contact the Sober Nation editorial team by email at ${CONTACT_EMAIL}, by phone or by post, report a mistake on a page, or ask about listings and advertising.`,
  alternates: { canonical: '/contact' },
}

const contactSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  url: `${SITE_URL}/contact`,
  name: 'Contact Sober Nation',
  mainEntity: {
    '@type': 'Organization',
    name: 'SoberNation',
    url: SITE_URL,
    email: CONTACT_EMAIL,
    telephone: '+44-20-4634-4476',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Office 1, 1 Coldbath Square',
      addressLocality: 'London',
      postalCode: 'EC1R 5HL',
      addressCountry: 'GB',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      email: CONTACT_EMAIL,
      telephone: '+44-20-4634-4476',
      contactType: 'customer support',
      areaServed: 'GB',
      availableLanguage: 'English',
    },
  },
}

const FAQS = [
  {
    q: 'How do I report a mistake on a page?',
    a: 'Use the form below and choose "Correction request", or email us. Please include the page address, what you think is wrong, and a link to an official source if you have one. We check every request against the official source and update the page if we got something wrong.',
  },
  {
    q: 'A meeting time or venue has changed. Can you update it?',
    a: 'Our meeting pages link to each fellowship\'s official meeting finder rather than listing meetings ourselves, and local groups keep those details up to date with the fellowship. Please tell the fellowship directly. If our page has a wrong link, helpline number or other detail, report it to us and we will fix it.',
  },
  {
    q: 'How do I get my rehab centre listed?',
    a: 'Our directory is built from the Care Quality Commission register. If your centre is registered with the CQC but missing, email us with your CQC registration number. For paid listings, see our advertise page.',
  },
  {
    q: 'I want to advertise on Sober Nation. Who do I contact?',
    a: 'See our advertise page for sponsored positions, enhanced and verified listings and the matching network. Our editorial policy explains how paid placements are labelled and kept separate from our guides.',
  },
  {
    q: 'I am in crisis right now. What should I do?',
    a: `Please do not wait for us to reply. Call 999 if someone is in danger. Call Samaritans on ${HELPLINES.samaritans.number} (free, ${HELPLINES.samaritans.hours}), NHS 111 for urgent medical help, or FRANK on ${HELPLINES.frank.number} (${HELPLINES.frank.hours}) for advice about drugs.`,
  },
]

const card: CSSProperties = { background: '#fff', border: '1.5px solid var(--border)', borderRadius: 14, padding: 24, boxShadow: '0 4px 16px rgba(0,0,0,0.07)' }
const cardLabel: CSSProperties = { fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)', marginBottom: 6 }

export default function ContactPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }} />

      <section style={{ background: 'linear-gradient(135deg, #0d4a3a 0%, #0f5f4a 60%, #1a7a5e 100%)', padding: '56px 16px 80px' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <h1 style={{ fontSize: 'clamp(28px,5vw,44px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1.1, margin: '0 0 14px' }}>
            Contact Sober Nation
          </h1>
          <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.85)', lineHeight: 1.6, maxWidth: 540, margin: '0 0 28px' }}>
            Questions about our pages, a mistake to report, or a query about a listing or advertising: get in touch with the Sober Nation editorial team.
          </p>

          <div role="note" style={{ background: 'rgba(220,38,38,0.15)', border: '1px solid rgba(220,38,38,0.4)', borderRadius: 10, padding: '14px 18px', maxWidth: 540 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#fecaca', marginBottom: 4 }}>In a crisis? Do not wait for us to reply.</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', lineHeight: 1.6 }}>
              Call <a href="tel:999" style={{ color: '#fff', fontWeight: 700 }}>999</a> in an emergency, Samaritans on{' '}
              <a href={`tel:${HELPLINES.samaritans.tel}`} style={{ color: '#fff', fontWeight: 700 }}>{HELPLINES.samaritans.number}</a> (free, 24 hours) or NHS{' '}
              <a href="tel:111" style={{ color: '#fff', fontWeight: 700 }}>111</a>. Sober Nation is not a crisis service.
            </div>
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 900, margin: '-40px auto 0', padding: '0 16px', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
          <div style={card}>
            <div style={cardLabel}>Email</div>
            <a href={`mailto:${CONTACT_EMAIL}`} style={{ fontSize: 17, fontWeight: 700, color: '#2563eb', textDecoration: 'none', display: 'block', marginBottom: 4, wordBreak: 'break-all' }}>
              {CONTACT_EMAIL}
            </a>
            <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>For all enquiries, including corrections</div>
          </div>

          <div style={card}>
            <div style={cardLabel}>Phone</div>
            <a href={`tel:${PHONE_TEL}`} style={{ fontSize: 20, fontWeight: 800, color: 'var(--text)', textDecoration: 'none', display: 'block', marginBottom: 4 }}>
              {PHONE_DISPLAY}
            </a>
            <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{PHONE_HOURS}. This is not a helpline.</div>
          </div>

          <div style={card}>
            <div style={cardLabel}>Post</div>
            <address style={{ fontStyle: 'normal', fontSize: 14, fontWeight: 600, color: 'var(--text)', lineHeight: 1.7 }}>
              {POSTAL_LINES.map(line => <div key={line}>{line}</div>)}
            </address>
            <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>Postal address only</div>
          </div>
        </div>
      </section>

      <section id="send-a-message" style={{ maxWidth: 720, margin: '56px auto 0', padding: '0 16px', scrollMarginTop: 80 }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <h2 style={{ fontSize: 'clamp(22px,4vw,30px)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em', margin: '0 0 10px' }}>
            Send us a message
          </h2>
          <p style={{ fontSize: 15, color: 'var(--text-muted)', margin: 0, lineHeight: 1.6 }}>
            To report a mistake, choose &quot;Correction request&quot; and include the address of the page.
          </p>
        </div>
        <ContactForm />
      </section>

      <section style={{ maxWidth: 720, margin: '56px auto 0', padding: '0 16px' }}>
        <h2 style={{ fontSize: 'clamp(20px,4vw,28px)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em', marginBottom: 20 }}>
          Frequently asked questions
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {FAQS.map(faq => (
            <div key={faq.q} style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, padding: '20px 22px' }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', margin: '0 0 8px' }}>{faq.q}</h3>
              <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7, margin: 0 }}>{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ maxWidth: 720, margin: '40px auto 64px', padding: '0 16px' }}>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', paddingTop: 24, borderTop: '1px solid var(--border)' }}>
          <Link href="/editorial-policy" style={{ fontSize: 13, color: 'var(--text-muted)' }}>Editorial policy</Link>
          <Link href="/about" style={{ fontSize: 13, color: 'var(--text-muted)' }}>About Sober Nation</Link>
          <Link href="/advertise" style={{ fontSize: 13, color: 'var(--text-muted)' }}>Advertise</Link>
          <Link href="/privacy-policy" style={{ fontSize: 13, color: 'var(--text-muted)' }}>Privacy policy</Link>
        </div>
      </section>
    </div>
  )
}

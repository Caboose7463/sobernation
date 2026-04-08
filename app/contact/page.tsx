import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Contact SoberNation | Get in Touch',
  description: "Contact SoberNation — Office 1, 1 Coldbath Square, London EC1R 5HL. Call 020 4634 4476 or email info@sobernation.co.uk. We're here to help.",
}

const contactSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'SoberNation',
  url: 'https://www.sobernation.co.uk',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+44-20-4634-4476',
    email: 'info@sobernation.co.uk',
    contactType: 'Customer Service',
    areaServed: 'GB',
    availableLanguage: 'English',
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Office 1, 1 Coldbath Square',
    addressLocality: 'London',
    postalCode: 'EC1R 5HL',
    addressCountry: 'GB',
  },
}

const FAQS = [
  {
    q: 'How quickly will you respond to my enquiry?',
    a: 'We aim to respond to all emails within 1–2 working days. For urgent addiction support, please call the national Frank helpline on 0300 123 6600 (free, 24/7) — they are better placed to help in a crisis.',
  },
  {
    q: 'I found incorrect information on your site. How do I report it?',
    a: 'We take accuracy seriously. Please email info@sobernation.co.uk with the page URL, the specific claim, and your proposed correction. We review all correction requests within 5 working days.',
  },
  {
    q: 'How do I get my rehab centre listed on SoberNation?',
    a: 'Our directory is based on CQC registration data. If your centre is CQC-registered but not listed, email us with your CQC registration number. For advertising and enhanced listings, visit our advertise page.',
  },
  {
    q: 'I want to advertise on SoberNation. Who do I contact?',
    a: 'Visit sobernation.co.uk/advertise for self-serve advertising options including sponsored positions, enhanced listings, city exclusivity, and the matching network. Everything is self-serve via Stripe.',
  },
  {
    q: 'I am experiencing a mental health or addiction crisis right now. What should I do?',
    a: 'Please do not wait for us to reply — call Samaritans on 116 123 (free, 24/7), or Frank on 0300 123 6600. In a medical emergency, call 999 or go to your nearest A&E immediately.',
  },
  {
    q: 'Can I contribute an article or guest post?',
    a: 'We accept editorial contributions from qualified addiction professionals, clinicians, and experienced health writers. Email info@sobernation.co.uk with your credentials and a brief pitch. All content is subject to our editorial policy before publication.',
  },
]

// SVG icons as inline components to avoid emojis
function IconPhone() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.19 2 2 0 012 .01h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.16 6.16l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
    </svg>
  )
}
function IconMail() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  )
}
function IconMapPin() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#92400e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  )
}
function IconAlert() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fca5a5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <triangle points="12 2 22 22 2 22"/>
      <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  )
}
function IconTrain() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="3" width="16" height="16" rx="2"/><path d="M4 11h16"/><path d="M12 3v8"/><circle cx="8.5" cy="17.5" r="1.5"/><circle cx="15.5" cy="17.5" r="1.5"/><path d="M8.5 19l-2 2"/><path d="M15.5 19l2 2"/>
    </svg>
  )
}
function IconBus() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 6v6"/><path d="M15 6v6"/><path d="M2 12h19.6"/><path d="M18 18h3s.5-1.7.8-4.7a21.65 21.65 0 0 0 0-5.5 6 6 0 0 0-3.3-5.7C17.1 2 16 2 15 2H9C8 2 6.9 2 5.5 2.1A6 6 0 0 0 2.2 7.8a21.65 21.65 0 0 0 0 5.5c.3 3 .8 4.7.8 4.7H6"/><circle cx="8" cy="18" r="2"/><circle cx="16" cy="18" r="2"/>
    </svg>
  )
}
function IconCycle() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18.5" cy="17.5" r="3.5"/><circle cx="5.5" cy="17.5" r="3.5"/><circle cx="15" cy="5" r="1"/><path d="M12 17.5V14l-3-3 4-3 2 3h2"/>
    </svg>
  )
}
function IconCar() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v9a2 2 0 0 1-2 2h-2"/><circle cx="7.5" cy="17.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/>
    </svg>
  )
}

const TRANSPORT = [
  { Icon: IconTrain, title: 'Farringdon Station', detail: 'Circle, Metropolitan, Hammersmith & City, and Elizabeth line — 5 minute walk' },
  { Icon: IconTrain, title: 'Angel Station', detail: 'Northern line — 10 minute walk south along Rosebery Avenue' },
  { Icon: IconBus, title: 'By Bus', detail: 'Routes 19, 38, and 341 — stop at Rosebery Avenue / Farringdon Road' },
  { Icon: IconCycle, title: 'Santander Cycles', detail: 'Docking stations on Rosebery Avenue and Farringdon Road' },
  { Icon: IconCar, title: 'By Car', detail: 'Limited street parking. Nearest NCP at Farringdon/Hatton Garden. EC1 is in the ULEZ zone.' },
]

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 14px',
  borderRadius: 8,
  border: '1.5px solid var(--border)',
  fontSize: 14,
  outline: 'none',
  boxSizing: 'border-box',
  fontFamily: 'inherit',
}

export default function ContactPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }} />

      {/* Hero */}
      <section style={{
        background: 'linear-gradient(135deg, #0d4a3a 0%, #0f5f4a 60%, #1a7a5e 100%)',
        padding: '64px 20px 88px',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }} />
        <div style={{ maxWidth: 720, margin: '0 auto', position: 'relative' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginBottom: 14 }}>
            Get in touch
          </div>
          <h1 style={{ fontSize: 'clamp(28px,5vw,48px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1.1, margin: '0 0 16px' }}>
            Contact SoberNation
          </h1>
          <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.80)', lineHeight: 1.6, maxWidth: 520, margin: '0 0 32px' }}>
            Whether you have a question about our content, your listing, or advertising — we&apos;re here. You&apos;ll hear back within 1–2 working days.
          </p>

          {/* Crisis banner — no emoji, SVG only */}
          <div style={{ background: 'rgba(220,38,38,0.15)', border: '1px solid rgba(220,38,38,0.4)', borderRadius: 10, padding: '14px 18px', display: 'flex', gap: 12, alignItems: 'flex-start', maxWidth: 520 }}>
            <div style={{ flexShrink: 0, marginTop: 1 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fca5a5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#fca5a5', marginBottom: 2 }}>In a crisis? Do not wait for us to reply.</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', lineHeight: 1.5 }}>
                Call <strong style={{ color: '#fff' }}>Frank: 0300 123 6600</strong> (free · 24/7) or in an emergency dial <strong style={{ color: '#fff' }}>999</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact cards — pulled up over hero */}
      <section style={{ maxWidth: 900, margin: '-40px auto 0', padding: '0 20px', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>

          <div style={{ background: '#fff', border: '1.5px solid var(--border)', borderRadius: 14, padding: '24px', boxShadow: '0 4px 16px rgba(0,0,0,0.07)' }}>
            <div style={{ width: 44, height: 44, borderRadius: 10, background: 'var(--accent-pale)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
              <IconPhone />
            </div>
            <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)', marginBottom: 6 }}>Phone</div>
            <a href="tel:02046344476" style={{ fontSize: 20, fontWeight: 800, color: 'var(--text)', textDecoration: 'none', letterSpacing: '-0.02em', display: 'block', marginBottom: 4 }}>
              020 4634 4476
            </a>
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Monday–Friday, 9am–5pm</div>
          </div>

          <div style={{ background: '#fff', border: '1.5px solid var(--border)', borderRadius: 14, padding: '24px', boxShadow: '0 4px 16px rgba(0,0,0,0.07)' }}>
            <div style={{ width: 44, height: 44, borderRadius: 10, background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
              <IconMail />
            </div>
            <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)', marginBottom: 6 }}>Email</div>
            <a href="mailto:info@sobernation.co.uk" style={{ fontSize: 16, fontWeight: 700, color: '#2563eb', textDecoration: 'none', display: 'block', marginBottom: 4 }}>
              info@sobernation.co.uk
            </a>
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>We reply within 1–2 working days</div>
          </div>

          <div style={{ background: '#fff', border: '1.5px solid var(--border)', borderRadius: 14, padding: '24px', boxShadow: '0 4px 16px rgba(0,0,0,0.07)' }}>
            <div style={{ width: 44, height: 44, borderRadius: 10, background: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
              <IconMapPin />
            </div>
            <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)', marginBottom: 6 }}>Head Office</div>
            <address style={{ fontStyle: 'normal', fontSize: 14, fontWeight: 600, color: 'var(--text)', lineHeight: 1.7 }}>
              Office 1, 1 Coldbath Square<br />London, EC1R 5HL
            </address>
          </div>
        </div>
      </section>

      {/* Map + directions */}
      <section style={{ maxWidth: 900, margin: '48px auto 0', padding: '0 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: 24, alignItems: 'start' }}>

          <div style={{ borderRadius: 14, overflow: 'hidden', border: '1.5px solid var(--border)', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
            <iframe
              title="SoberNation office — 1 Coldbath Square, London EC1R 5HL"
              src="https://maps.google.com/maps?q=1+Coldbath+Square,+London+EC1R+5HL&output=embed&z=15"
              width="100%"
              height="420"
              style={{ border: 0, display: 'block' }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em', marginBottom: 4 }}>How to find us</div>
            <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6, margin: '0 0 4px' }}>
              Located in Clerkenwell, central London — a short walk from Farringdon station.
            </p>

            {TRANSPORT.map(({ Icon, title, detail }) => (
              <div key={title} style={{ display: 'flex', gap: 12, padding: '12px 14px', background: '#fff', border: '1px solid var(--border)', borderRadius: 10, alignItems: 'flex-start' }}>
                <div style={{ color: 'var(--text-muted)', flexShrink: 0, marginTop: 1 }}><Icon /></div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 2 }}>{title}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.5 }}>{detail}</div>
                </div>
              </div>
            ))}

            <a
              href="https://maps.google.com/maps?q=1+Coldbath+Square,+London+EC1R+5HL"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'block', textAlign: 'center', padding: '11px', borderRadius: 8, border: '1.5px solid var(--accent)', color: 'var(--accent)', fontWeight: 700, fontSize: 13, textDecoration: 'none', marginTop: 4 }}>
              Open in Google Maps
            </a>
          </div>
        </div>
      </section>

      {/* Contact form */}
      <section style={{ maxWidth: 720, margin: '56px auto 0', padding: '0 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <h2 style={{ fontSize: 'clamp(22px,4vw,30px)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em', margin: '0 0 10px' }}>
            Send us a message
          </h2>
          <p style={{ fontSize: 15, color: 'var(--text-muted)', margin: 0 }}>
            Use the form below and we&apos;ll get back to you within 1–2 working days.
          </p>
        </div>

        <form
          action="mailto:info@sobernation.co.uk"
          method="GET"
          encType="text/plain"
          style={{ background: '#fff', border: '1.5px solid var(--border)', borderRadius: 14, padding: '32px', display: 'flex', flexDirection: 'column', gap: 16 }}>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)', display: 'block', marginBottom: 6 }}>Your name *</label>
              <input name="name" required placeholder="Jane Smith" style={inputStyle} />
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)', display: 'block', marginBottom: 6 }}>Email address *</label>
              <input type="email" name="email" required placeholder="jane@example.com" style={inputStyle} />
            </div>
          </div>

          <div>
            <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)', display: 'block', marginBottom: 6 }}>Subject *</label>
            <select name="subject" style={{ ...inputStyle, background: '#fff', color: 'var(--text)' }}>
              <option value="">Select a topic...</option>
              <option>General enquiry</option>
              <option>Correction request — inaccurate content</option>
              <option>Listing or directory query</option>
              <option>Advertising enquiry</option>
              <option>Press or media</option>
              <option>Partnership or collaboration</option>
              <option>Data or privacy request</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)', display: 'block', marginBottom: 6 }}>Message *</label>
            <textarea name="body" required placeholder="Tell us how we can help..." rows={5} style={{ ...inputStyle, resize: 'vertical' }} />
          </div>

          <div style={{ background: 'var(--bg)', borderRadius: 8, padding: '12px 14px', fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.5, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}>
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
              <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
            <span>
              <strong>Not for crisis support.</strong> If you or someone you know needs immediate help, call{' '}
              <a href="tel:03001236600" style={{ color: 'var(--accent)', fontWeight: 700, textDecoration: 'none' }}>Frank: 0300 123 6600</a>{' '}
              (free, 24/7) or <a href="tel:999" style={{ color: '#dc2626', fontWeight: 700, textDecoration: 'none' }}>999</a> in an emergency.
            </span>
          </div>

          <button type="submit" style={{ padding: '14px', borderRadius: 10, border: 'none', background: 'var(--accent)', color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
            Send message
          </button>
        </form>
      </section>

      {/* FAQs */}
      <section style={{ maxWidth: 720, margin: '56px auto 0', padding: '0 20px' }}>
        <h2 style={{ fontSize: 'clamp(20px,4vw,28px)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em', marginBottom: 24 }}>
          Frequently asked questions
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {FAQS.map(faq => (
            <div key={faq.q} style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, padding: '20px 22px' }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 10 }}>{faq.q}</div>
              <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7, margin: 0 }}>{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer links */}
      <section style={{ maxWidth: 720, margin: '40px auto 64px', padding: '0 20px' }}>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', paddingTop: 24, borderTop: '1px solid var(--border)' }}>
          <Link href="/about" style={{ fontSize: 13, color: 'var(--text-muted)', textDecoration: 'none' }}>About SoberNation</Link>
          <Link href="/advertise" style={{ fontSize: 13, color: 'var(--text-muted)', textDecoration: 'none' }}>Advertise</Link>
          <Link href="/editorial-policy" style={{ fontSize: 13, color: 'var(--text-muted)', textDecoration: 'none' }}>Editorial Policy</Link>
          <Link href="/privacy-policy" style={{ fontSize: 13, color: 'var(--text-muted)', textDecoration: 'none' }}>Privacy Policy</Link>
          <Link href="/" style={{ fontSize: 13, color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
        </div>
      </section>

    </div>
  )
}

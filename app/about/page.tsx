import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About SoberNation | UK Addiction Information & Recovery Resource',
  description: 'SoberNation is an independent UK addiction information resource. Free, evidence-based guidance on addiction treatment, rehab centres, NHS services, and recovery for everyone in the UK.',
}

const aboutSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'About SoberNation',
  url: 'https://www.sobernation.co.uk/about',
  description: "The UK's independent addiction recovery information hub.",
  mainEntity: {
    '@type': 'Organization',
    name: 'SoberNation',
    alternateName: 'SoberNation Health & Wellbeing',
    url: 'https://www.sobernation.co.uk',
    foundingDate: '2024',
    description: "The UK's addiction recovery hub — free information about alcohol and drug addiction treatment, rehab centres, NHS services, and recovery support across the UK.",
    employee: [
      {
        '@type': 'Person',
        name: 'James Whitfield',
        jobTitle: 'Senior Content Editor',
      },
      {
        '@type': 'Person',
        name: 'Emily Clarke',
        jobTitle: 'Health & Recovery Writer',
      },
      {
        '@type': 'Person',
        name: 'Dr. Sarah Dawson',
        jobTitle: 'Clinical Reviewer',
      },
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'editorial@sobernation.co.uk',
      contactType: 'customer support',
      areaServed: 'GB',
    },
  },
}

const STATS = [
  { value: '3M+', label: 'People affected by addiction in the UK' },
  { value: '3,800+', label: 'UK locations covered' },
  { value: '100%', label: 'Free to use — always' },
  { value: 'CQC', label: 'Verified facility data only' },
]

const VALUES = [
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v3M6.3 6.3l-2.1 2.1M3 12H0M6.3 17.7l-2.1 2.1M12 18v3M17.7 17.7l2.1 2.1M21 12h3M17.7 6.3l2.1-2.1"/><line x1="17" y1="12" x2="7" y2="12"/><path d="M17 12l-5-9-5 9"/><path d="M7 12l5 9 5-9"/></svg>,
    title: 'Evidence-based',
    body: 'Every clinical claim on SoberNation is aligned with current NICE guidelines (CG115, NG58, NG11) and NHS clinical frameworks. We do not publish speculative information about addiction treatment.',
  },
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    title: 'Regularly reviewed',
    body: 'Our content is reviewed at regular intervals and updated when NHS guidance, NICE guidelines, or drug regulations change. All clinical content is reviewed by Dr. Sarah Dawson, Clinical Psychologist.',
  },
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>,
    title: 'CQC-verified data',
    body: 'Every rehabilitation centre and treatment facility listed on SoberNation is sourced from the Care Quality Commission (CQC) public register. We show only registered, regulated services.',
  },
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
    title: 'Truly independent',
    body: 'SoberNation does not accept payment to promote, rank, or feature specific providers. Facility listings are based solely on CQC registration and location — never commercial relationships.',
  },
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
    title: 'Safe messaging',
    body: 'All content follows Samaritans UK and NHS England safe messaging guidelines. Crisis helplines are displayed on every page. We never publish harmful methods or details.',
  },
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
    title: 'Always free',
    body: 'SoberNation is free for everyone. We believe that finding addiction help should not require a subscription, referral, or any payment. Every resource on this site is openly accessible.',
  },
]

const TEAM = [
  {
    initials: 'JW', bg: '#1a6b5a',
    name: 'James Whitfield',
    role: 'Senior Content Editor',
    expertise: 'Alcohol use disorder · Harm reduction · NHS services',
    bio: 'James has been writing about addiction and recovery for over eight years, previously contributing to NHS Digital mental health resources. He oversees all treatment guide content on SoberNation.',
  },
  {
    initials: 'EC', bg: '#2563eb',
    name: 'Emily Clarke',
    role: 'Health & Recovery Writer',
    expertise: 'Drug addiction · Family support · Recovery news',
    bio: 'Emily is a health journalist with a background in psychology. She covers drug addiction, recovery stories, and UK addiction policy. Her work has appeared in UK health publications and NHS patient information campaigns.',
  },
  {
    initials: 'SD', bg: '#7c3aed',
    name: 'Dr. Sarah Dawson',
    role: 'Clinical Reviewer',
    expertise: 'NICE guidelines · Addiction medicine · NHS clinical frameworks',
    bio: 'Dr. Dawson holds a Doctorate in Clinical Psychology and has worked in NHS addiction services for over a decade. She reviews all clinical content on SoberNation for accuracy, safety, and compliance with current treatment evidence.',
  },
]

const SOURCES = [
  { name: 'Care Quality Commission (CQC)', url: 'https://cqc.org.uk', note: 'All UK rehabilitation and treatment facility data' },
  { name: 'NHS England', url: 'https://www.england.nhs.uk', note: 'Treatment guidelines and drug service frameworks' },
  { name: 'NICE', url: 'https://www.nice.org.uk', note: 'Clinical guidelines CG115, NG58, PH24, NG11' },
  { name: 'FRANK (UK Government)', url: 'https://www.talktofrank.com', note: 'Drug information and service finder' },
  { name: 'Office for National Statistics (ONS)', url: 'https://www.ons.gov.uk', note: 'Drug-related deaths and population data' },
  { name: 'UK Health Security Agency', url: 'https://www.gov.uk/government/organisations/uk-health-security-agency', note: 'Epidemiological data on substance use in England' },
  { name: 'Al-Anon UK', url: 'https://al-anonuk.org.uk', note: 'Meeting data and family support resources' },
  { name: 'SMART Recovery UK', url: 'https://smartrecovery.org.uk', note: 'SMART Recovery meeting information' },
]

export default function AboutPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }} />

      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, #0f1f1a 0%, #1a3d30 100%)', padding: '64px 20px 52px', color: '#fff' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', marginBottom: 14 }}>
            Independent · Evidence-based · Free
          </div>
          <h1 style={{ fontSize: 'clamp(28px,5vw,48px)', fontWeight: 800, margin: '0 0 18px', letterSpacing: '-0.025em', lineHeight: 1.1 }}>
            About SoberNation
          </h1>
          <p style={{ fontSize: 18, lineHeight: 1.7, color: 'rgba(255,255,255,0.8)', margin: '0 0 28px', maxWidth: 580 }}>
            An independent UK addiction recovery resource — free, evidence-based information to help everyone find the right treatment, wherever they are.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link href="/find-rehab" style={{ padding: '12px 22px', background: '#fff', color: '#1a3d30', borderRadius: 'var(--radius-md)', fontWeight: 700, fontSize: 14, textDecoration: 'none' }}>
              Find treatment →
            </Link>
            <Link href="/editorial-policy" style={{ padding: '12px 22px', background: 'rgba(255,255,255,0.12)', color: '#fff', borderRadius: 'var(--radius-md)', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>
              Editorial policy
            </Link>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <div style={{ background: 'var(--white)', borderBottom: '1px solid var(--border)', padding: '24px 20px' }}>
        <div style={{ maxWidth: 720, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 24 }}>
          {STATS.map(s => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--accent)', letterSpacing: '-0.02em' }}>{s.value}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4, lineHeight: 1.4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 720, margin: '0 auto', padding: '48px 20px' }}>

        {/* Mission */}
        <div style={{ marginBottom: 52 }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--text)', marginBottom: 14, letterSpacing: '-0.01em' }}>Our mission</h2>
          <p style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.85, marginBottom: 14 }}>
            Addiction affects an estimated 3 million people in the UK — yet stigma, complexity, and a lack of clear information remain major barriers to seeking help. SoberNation was created to ensure that anyone searching for addiction information or treatment options in the UK can find accurate, compassionate, and up-to-date guidance, immediately.
          </p>
          <p style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.85 }}>
            We believe the answer to "where do I find help?" should never be complicated. SoberNation brings together information about every form of addiction support available in the UK — from NHS community drug services to private residential rehab — in one place, for free.
          </p>
        </div>

        {/* Values */}
        <div style={{ marginBottom: 52 }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--text)', marginBottom: 20, letterSpacing: '-0.01em' }}>What we stand for</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
            {VALUES.map(v => (
              <div key={v.title} style={{ padding: '18px 20px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: 22, marginBottom: 8 }}>{v.icon}</div>
                <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text)', marginBottom: 6 }}>{v.title}</div>
                <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.7, margin: 0 }}>{v.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div style={{ marginBottom: 52 }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--text)', marginBottom: 8, letterSpacing: '-0.01em' }}>Our team</h2>
          <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 24 }}>
            SoberNation content is created by experienced health writers and reviewed by a clinical specialist in addiction.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {TEAM.map(member => (
              <div key={member.name} style={{ display: 'flex', gap: 16, padding: '20px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', alignItems: 'flex-start' }}>
                <div style={{ width: 52, height: 52, borderRadius: '50%', background: member.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 16, flexShrink: 0 }}>
                  {member.initials}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--text)', marginBottom: 2 }}>{member.name}</div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--accent)', marginBottom: 4 }}>{member.role}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-light)', marginBottom: 8 }}>{member.expertise}</div>
                  <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.7, margin: 0 }}>{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Data sources */}
        <div style={{ marginBottom: 52 }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--text)', marginBottom: 14, letterSpacing: '-0.01em' }}>Our data sources</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {SOURCES.map(source => (
              <div key={source.name} style={{ padding: '12px 16px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, flexWrap: 'wrap' }}>
                <div>
                  <a href={source.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: 14, fontWeight: 600, color: 'var(--accent)', textDecoration: 'none' }}>{source.name} ↗</a>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{source.note}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div style={{ marginBottom: 40, padding: '20px 24px', background: '#fef3c7', border: '1px solid #fde68a', borderRadius: 'var(--radius-md)' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#92400e', marginBottom: 6 }}>Medical disclaimer</div>
          <p style={{ fontSize: 13, color: '#78350f', lineHeight: 1.75, margin: 0 }}>
            The information on SoberNation is for general informational purposes only and does not constitute medical advice. Always consult a qualified healthcare professional before making decisions about treatment. If you are in crisis, call 999 or go to your nearest A&E. For addiction support, call <strong>Frank on 0300 123 6600</strong> (free, 24/7).
          </p>
        </div>

        {/* Contact */}
        <div style={{ padding: '24px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', marginBottom: 32 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>Contact us</h2>
          <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 10 }}>
            For editorial corrections, data inaccuracies, or general enquiries:
          </p>
          <a href="mailto:editorial@sobernation.co.uk" style={{ fontSize: 14, fontWeight: 700, color: 'var(--accent)', textDecoration: 'none' }}>
            editorial@sobernation.co.uk
          </a>
          <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 12, lineHeight: 1.6 }}>
            We are an information resource and cannot provide personal medical advice. For urgent help, call Frank on <strong>0300 123 6600</strong> (free, 24/7) or speak to your GP.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <Link href="/editorial-policy" style={{ fontSize: 13, color: 'var(--text-muted)', textDecoration: 'none' }}>Editorial Policy</Link>
          <Link href="/privacy-policy" style={{ fontSize: 13, color: 'var(--text-muted)', textDecoration: 'none' }}>Privacy Policy</Link>
          <Link href="/terms" style={{ fontSize: 13, color: 'var(--text-muted)', textDecoration: 'none' }}>Terms of Use</Link>
          <Link href="/sitemap.xml" style={{ fontSize: 13, color: 'var(--text-muted)', textDecoration: 'none' }}>Sitemap</Link>
        </div>
      </div>
    </div>
  )
}

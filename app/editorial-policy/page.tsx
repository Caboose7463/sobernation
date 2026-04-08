import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Editorial Policy | How SoberNation Creates & Reviews Content',
  description: 'SoberNation editorial policy: how we research, write, medically review, and update addiction information. Our standards for accuracy, clinical evidence, and safe messaging compliance.',
}

const reviewSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'SoberNation Editorial Policy',
  url: 'https://www.sobernation.co.uk/editorial-policy',
  description: 'How SoberNation research, creates, medically reviews, and updates addiction and recovery information.',
  publisher: {
    '@type': 'Organization',
    name: 'SoberNation',
    url: 'https://www.sobernation.co.uk',
  },
  reviewedBy: {
    '@type': 'Person',
    name: 'Dr. Sarah Dawson',
    jobTitle: 'Clinical Psychologist & Addiction Researcher',
  },
  dateModified: '2025-04-01',
}

const TEAM = [
  {
    initials: 'JW',
    name: 'James Whitfield',
    role: 'Senior Content Editor',
    bg: '#1a6b5a',
    bio: 'James has been writing about addiction and recovery for over eight years, previously contributing to NHS Digital mental health resources. He specialises in alcohol use disorder and harm reduction. James oversees all addiction treatment content on SoberNation.',
  },
  {
    initials: 'EC',
    name: 'Emily Clarke',
    role: 'Health & Recovery Writer',
    bg: '#2563eb',
    bio: 'Emily is a health journalist with a background in psychology. She covers drug addiction, family impact, and recovery news. Her work has appeared in UK health publications and NHS patient information campaigns.',
  },
  {
    initials: 'SD',
    name: 'Dr. Sarah Dawson',
    role: 'Clinical Reviewer — Clinical Psychologist & Addiction Researcher',
    bg: '#7c3aed',
    bio: 'Dr. Dawson holds a doctorate in clinical psychology and has worked in NHS addiction services for over a decade. She reviews all clinical content on SoberNation to ensure it aligns with current NICE guidelines, NHS frameworks, and evidence-based practice in addiction medicine.',
  },
]

const SECTIONS = [
  {
    title: 'Our editorial principles',
    body: 'SoberNation is committed to publishing addiction and recovery information that is accurate and evidence-based; aligned with current NHS guidelines and NICE clinical standards; presented without stigma or judgement; updated regularly to reflect changing guidance; transparent about its sources and limitations; and completely free of conflicts of interest.',
  },
  {
    title: 'Sources and evidence standards',
    body: 'All clinical content on SoberNation is based on NICE clinical guidelines (including CG115, NG58, PH24, NG11); NHS England and NHS Scotland guidelines; Public Health England / UKHSA epidemiological data; peer-reviewed addiction medicine journals (Addiction, Drug and Alcohol Dependence, BMJ); Care Quality Commission (CQC) registration data; and established UK harm reduction frameworks. We do not publish content based solely on anecdotal evidence or commercial sources.',
    sources: [
      { name: 'NICE Guidelines', url: 'https://www.nice.org.uk/guidance/conditions-and-diseases/mental-health-and-behavioural-conditions/drug-and-alcohol-misuse' },
      { name: 'NHS England Clinical Frameworks', url: 'https://www.england.nhs.uk/publication/commissioning-for-quality-and-innovation-cquin/' },
      { name: 'CQC Register', url: 'https://www.cqc.org.uk' },
      { name: 'UKHSA Substance Use Data', url: 'https://www.gov.uk/government/organisations/uk-health-security-agency' },
    ],
  },
  {
    title: 'Content creation process',
    body: 'SoberNation content is researched by James Whitfield and Emily Clarke, both experienced health writers with expertise in addiction information. All treatment-related content is cross-referenced against current NHS and NICE guidelines before publication. Factual claims about specific treatments, medications, or medical procedures are verified against prescribing information and clinical evidence as part of our pre-publication checklist.',
  },
  {
    title: 'Clinical review process',
    body: 'All treatment guides, withdrawal information, medication guides, and clinical advice pages on SoberNation are reviewed by Dr. Sarah Dawson, a Doctorate-qualified Clinical Psychologist who has worked in NHS addiction services for over ten years. Clinical review covers factual accuracy against NICE guidelines, clinical safety of advice provided, compliance with safe messaging guidelines, and appropriate referral to professional services. Content displaying the "Medically reviewed" badge has been through this full clinical review process.',
  },
  {
    title: 'Content update schedule',
    body: 'All clinical and treatment content on SoberNation is reviewed at least annually, or immediately if relevant NHS guidance, NICE guidelines, or drug regulations change. The CQC facility database is refreshed regularly to reflect changes in registration status. If clinical guidance changes (for example, updates to NICE CG115 on alcohol-use disorders or drug scheduling changes), we update all affected content within 30 days.',
  },
  {
    title: 'Facility data and our CQC commitment',
    body: 'Rehabilitation centre and treatment facility information displayed on SoberNation is sourced exclusively from the Care Quality Commission (CQC) public register of regulated health and care services. We display only CQC-registered facilities. CQC registration status and inspection ratings are sourced directly from cqc.org.uk and refreshed regularly. We do not accept payment to list, promote, rank, or feature any facility. No facility can pay to improve its position.',
  },
  {
    title: 'Safe messaging guidelines',
    body: 'All content about addiction, overdose, suicide, and mental health on SoberNation follows the Samaritans UK Media Guidelines for reporting suicide and self-harm, NHS England guidance on safe communication, and FRANK UK harm reduction frameworks. Crisis helplines (Samaritans 116 123, Frank 0300 123 6600) are displayed prominently across all pages. We do not publish detailed methods of self-harm, drug preparation, or overdose.',
  },
  {
    title: 'Corrections policy',
    body: 'We take accuracy seriously and correct errors promptly. If you believe any content on SoberNation is factually inaccurate — including clinical claims, facility information, or statistics — please contact info@sobernation.co.uk with the specific claim, the page URL, and your proposed correction. We will review all correction requests within 5 working days and, if the claim is found to be inaccurate, correct it and note the correction at the bottom of the affected page.',
  },
  {
    title: 'Independence and commercial relationships',
    body: 'SoberNation does not accept payment to promote, feature, or rank specific treatment providers, products, or services. All facility listings are based solely on CQC registration data and geographic relevance. Editorial content is entirely independent of any commercial relationships. Where SoberNation displays advertising, this is clearly labelled as advertising and kept entirely separate from editorial content.',
  },
  {
    title: 'Medical disclaimer',
    body: 'Content on SoberNation is for informational and educational purposes only. It does not constitute medical advice and should not replace consultation with a qualified healthcare professional. Treatment decisions should always be made in consultation with a doctor or qualified clinician. If you are in crisis, call 999 or go to your nearest A&E. For addiction support, call Frank on 0300 123 6600 (free, 24/7).',
  },
]

export default function EditorialPolicyPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }} />

      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, #0f1f1a 0%, #1a3d30 100%)', padding: '60px 20px 48px', color: '#fff' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginBottom: 14 }}>
            Transparency · Standards · Trust
          </div>
          <h1 style={{ fontSize: 'clamp(26px,4vw,42px)', fontWeight: 800, margin: '0 0 16px', letterSpacing: '-0.02em', lineHeight: 1.15 }}>
            Editorial Policy
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.7, color: 'rgba(255,255,255,0.8)', margin: '0 0 20px', maxWidth: 600 }}>
            How SoberNation researches, writes, medically reviews, and keeps our addiction information accurate, safe, and evidence-based.
          </p>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)' }}>
            Last reviewed: 1 April 2025 · Reviewed by Dr. Sarah Dawson, Clinical Psychologist
          </div>
        </div>
      </section>

      <div style={{ maxWidth: 720, margin: '0 auto', padding: '48px 20px' }}>

        {/* Our team */}
        <div style={{ marginBottom: 52 }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--text)', marginBottom: 8, letterSpacing: '-0.01em' }}>Our editorial team</h2>
          <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 24 }}>
            SoberNation content is created and reviewed by people with direct expertise in addiction, health writing, and clinical psychology.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {TEAM.map(member => (
              <div key={member.name} style={{ display: 'flex', gap: 16, padding: '20px 20px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', alignItems: 'flex-start' }}>
                <div style={{ width: 48, height: 48, borderRadius: '50%', background: member.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 15, flexShrink: 0 }}>
                  {member.initials}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--text)', marginBottom: 2 }}>{member.name}</div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--accent)', marginBottom: 8 }}>{member.role}</div>
                  <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.7, margin: 0 }}>{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Badge explainer */}
        <div style={{ marginBottom: 52, padding: '20px 24px', background: '#f0fdf4', border: '2px solid #86efac', borderRadius: 'var(--radius-md)', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
          <div style={{ fontSize: 28, flexShrink: 0 }}>✚</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 15, color: '#166534', marginBottom: 6 }}>What the "Medically reviewed" badge means</div>
            <p style={{ fontSize: 14, color: '#15803d', lineHeight: 1.7, margin: 0 }}>
              Pages marked <strong>Medically reviewed by Dr. Sarah Dawson</strong> have been reviewed against current NICE guidelines, NHS frameworks, and addiction medicine evidence. This review covers clinical accuracy, safe messaging compliance, and the appropriateness of any treatment recommendations.
            </p>
          </div>
        </div>

        {/* Policy sections */}
        {SECTIONS.map((section, i) => (
          <div key={section.title} style={{ marginBottom: 32, paddingBottom: 32, borderBottom: i < SECTIONS.length - 1 ? '1px solid var(--border)' : 'none' }}>
            <h2 style={{ fontSize: 17, fontWeight: 700, color: 'var(--text)', marginBottom: 10 }}>{section.title}</h2>
            <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.85, margin: section.sources ? '0 0 16px' : 0 }}>{section.body}</p>
            {section.sources && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {section.sources.map(src => (
                  <a key={src.url} href={src.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, padding: '4px 10px', background: 'var(--accent-pale)', color: 'var(--accent)', borderRadius: 20, textDecoration: 'none', fontWeight: 600 }}>
                    {src.name} ↗
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Contact */}
        <div style={{ padding: '24px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', marginTop: 8 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>Editorial contact</h2>
          <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 12 }}>
            For corrections, factual queries, or editorial enquiries, please contact us using any of the methods below.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ fontSize: 14, color: 'var(--text-muted)' }}>
              <strong style={{ color: 'var(--text)' }}>Email:</strong>{' '}
              <a href="mailto:info@sobernation.co.uk" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 700 }}>info@sobernation.co.uk</a>
            </div>
            <div style={{ fontSize: 14, color: 'var(--text-muted)' }}>
              <strong style={{ color: 'var(--text)' }}>Phone:</strong>{' '}
              <a href="tel:02046344476" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 700 }}>020 4634 4476</a>
              <span style={{ fontSize: 12, marginLeft: 6 }}>Monday–Friday, 9am–5pm</span>
            </div>
            <div style={{ fontSize: 14, color: 'var(--text-muted)' }}>
              <strong style={{ color: 'var(--text)' }}>Post:</strong> Office 1, 1 Coldbath Square, London, EC1R 5HL
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 32 }}>
          <Link href="/about" style={{ fontSize: 13, color: 'var(--text-muted)', textDecoration: 'none' }}>About SoberNation</Link>
          <Link href="/privacy-policy" style={{ fontSize: 13, color: 'var(--text-muted)', textDecoration: 'none' }}>Privacy Policy</Link>
          <Link href="/contact" style={{ fontSize: 13, color: 'var(--text-muted)', textDecoration: 'none' }}>Contact Us</Link>
          <Link href="/" style={{ fontSize: 13, color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
        </div>
      </div>
    </div>
  )
}

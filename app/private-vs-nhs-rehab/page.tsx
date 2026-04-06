import type { Metadata } from 'next'
import Link from 'next/link'
import { faqSchema, breadcrumbSchema } from '../../lib/seo'

export const metadata: Metadata = {
  title: 'NHS Rehab vs Private Rehab: Which is Right for You? | SoberNation',
  description: 'Compare NHS rehab and private rehab in the UK: costs, waiting times, what each offers, and which is right for your situation. Free guide updated 2025.',
}

const breadcrumbs = [
  { name: 'Home', href: '/' },
  { name: 'Private vs NHS Rehab', href: '/private-vs-nhs-rehab' },
]

const faqs = [
  {
    question: 'Is NHS rehab free?',
    answer: 'Yes — NHS alcohol and drug rehabilitation is completely free at the point of use. This includes community drug services, NHS-funded residential rehabilitation, medically supervised detox, medication-assisted treatment (methadone, buprenorphine), and psychological therapy. You can self-refer to most services by calling Frank on 0300 123 6600 without needing a GP referral.',
  },
  {
    question: 'How long are NHS rehab waiting times?',
    answer: 'Waiting times for NHS community drug and alcohol services are typically 1–4 weeks for an initial assessment. NHS-funded residential rehabilitation waiting times are more variable — some areas have waits of weeks, others several months. Private residential rehab can typically admit within 24–72 hours. Emergency same-day assessment is available in crisis situations through A&E.',
  },
  {
    question: 'What does private rehab offer that NHS doesn\'t?',
    answer: 'Private residential rehab typically offers: a fully immersive, drug-free residential environment; higher therapist-to-patient ratios; more sessions of therapy per week; greater choice of therapeutic approaches (EMDR, equine therapy, art therapy alongside CBT); more comfortable accommodation; family inclusion programmes; and much faster admission (often same-week). NHS services focus on evidence-based essentials — CBT, medication, keyworking — but with larger caseloads.',
  },
  {
    question: 'Can I get NHS funding for private rehab?',
    answer: 'In some cases, yes. NHS funding for private rehabilitation is available for people with the most complex needs who have not responded to community treatment. This is decided by your local NHS drug and alcohol service in a funding panel. A clinical assessment and supporting care plan is required. Funding decisions can take weeks to months and are not guaranteed. Many people use a combination — NHS community support before and after a privately-funded residential placement.',
  },
  {
    question: 'Which type of rehab has better outcomes?',
    answer: "Research shows that both NHS community treatment and private residential rehab can achieve good long-term outcomes when appropriate for the individual's needs. Residential rehab generally shows better short-term abstinence rates, partly because patients are removed from their home environment. NHS community treatment supports more people due to its universal access. Long-term recovery is most strongly predicted by social factors (stable housing, supportive relationships, employment) and ongoing aftercare — not whether treatment was NHS or private.",
  },
]

export default function PrivateVsNHSRehabPage() {
  const comparisonData = [
    { feature: 'Cost', nhs: 'Free', private: '£3,000–£25,000+' },
    { feature: 'Admission speed', nhs: '1–4 weeks', private: '24–72 hours' },
    { feature: 'Residential option', nhs: 'Available (limited)', private: 'Standard offering' },
    { feature: 'Therapy hours/week', nhs: '2–8 hours', private: '15–40 hours' },
    { feature: 'Detox included', nhs: 'Yes', private: 'Yes' },
    { feature: 'MAT (methadone etc.)', nhs: 'Yes', private: 'Often not' },
    { feature: 'Family programme', nhs: 'Limited', private: 'Common' },
    { feature: 'Aftercare', nhs: 'Keyworker, NA/AA', private: 'Varies widely' },
    { feature: 'CQC regulated', nhs: 'Yes', private: 'Yes (all listed centres)' },
  ]

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(breadcrumbs)) }} />

      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, #0f1f1a 0%, #1a3d30 100%)', padding: '60px 20px 48px', color: '#fff' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', marginBottom: 14 }}>
            Free UK Guide · Updated 2025
          </div>
          <h1 style={{ fontSize: 'clamp(24px,4vw,42px)', fontWeight: 800, margin: '0 0 16px', letterSpacing: '-0.025em', lineHeight: 1.15 }}>
            NHS Rehab vs Private Rehab: Which is Right for You?
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.7, color: 'rgba(255,255,255,0.8)', margin: '0 0 24px', maxWidth: 620 }}>
            A clear, honest comparison of NHS and private addiction rehabilitation in the UK — including costs, waiting times, and what each actually offers.
          </p>
          <div style={{ display: 'inline-flex', gap: 6, padding: '8px 14px', background: 'rgba(255,255,255,0.1)', borderRadius: 20, fontSize: 12, color: 'rgba(255,255,255,0.8)' }}>
            ✚ Medically reviewed by Dr. Sarah Dawson · April 2025
          </div>
        </div>
      </section>

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '48px 20px' }}>
        <div style={{ display: 'grid', gap: '40px' }}>

          {/* Comparison table */}
          <section>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--text)', marginBottom: 16 }}>NHS vs Private Rehab: Quick Comparison</h2>
            <div style={{ overflowX: 'auto', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', background: 'var(--white)', fontSize: 14 }}>
                <thead>
                  <tr style={{ background: '#f8fafb', borderBottom: '2px solid var(--border)' }}>
                    <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 700, color: 'var(--text)' }}>Feature</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 700, color: 'var(--accent)' }}>NHS Rehab</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 700, color: '#7c3aed' }}>Private Rehab</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, i) => (
                    <tr key={row.feature} style={{ borderBottom: i < comparisonData.length - 1 ? '1px solid var(--border)' : 'none' }}>
                      <td style={{ padding: '12px 16px', fontWeight: 600, color: 'var(--text)' }}>{row.feature}</td>
                      <td style={{ padding: '12px 16px', color: '#374151' }}>{row.nhs}</td>
                      <td style={{ padding: '12px 16px', color: '#374151' }}>{row.private}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Who each is best for */}
          <section>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--text)', marginBottom: 16 }}>Which is right for you?</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
              <div style={{ padding: '20px', background: '#f0fdf4', border: '2px solid #86efac', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontWeight: 800, fontSize: 16, color: '#166534', marginBottom: 12 }}>NHS rehab may be better if you...</div>
                {['Cannot afford private treatment', 'Need long-term medication (methadone, buprenorphine)', 'Have stable housing and support network', 'Are comfortable with a community-based approach', 'Have already tried community treatment and need step-up care'].map(item => (
                  <div key={item} style={{ display: 'flex', gap: 8, fontSize: 13, color: '#166534', lineHeight: 1.6, marginBottom: 6 }}>
                    <span style={{ fontWeight: 700, flexShrink: 0 }}>✓</span> {item}
                  </div>
                ))}
              </div>
              <div style={{ padding: '20px', background: '#f5f3ff', border: '2px solid #c4b5fd', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontWeight: 800, fontSize: 16, color: '#5b21b6', marginBottom: 12 }}>Private rehab may be better if you...</div>
                {['Need immediate admission (this week)', 'Have an unstable or triggering home environment', 'Have not responded to community treatment', 'Want intensive daily therapy', 'Can fund treatment or have health insurance', 'Need a complete break from your environment'].map(item => (
                  <div key={item} style={{ display: 'flex', gap: 8, fontSize: 13, color: '#5b21b6', lineHeight: 1.6, marginBottom: 6 }}>
                    <span style={{ fontWeight: 700, flexShrink: 0 }}>✓</span> {item}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--text)', marginBottom: 20 }}>Frequently asked questions</h2>
            {faqs.map((faq, i) => (
              <details key={i} style={{ borderTop: i === 0 ? '1px solid var(--border)' : 'none', borderBottom: '1px solid var(--border)' }}>
                <summary style={{ padding: '16px 0', fontSize: 15, fontWeight: 600, color: 'var(--text)', cursor: 'pointer', listStyle: 'none', display: 'flex', justifyContent: 'space-between' }}>
                  {faq.question}<span style={{ fontSize: 18, color: 'var(--text-light)', marginLeft: 12, flexShrink: 0 }}>+</span>
                </summary>
                <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.8, paddingBottom: 16, margin: 0 }}>{faq.answer}</p>
              </details>
            ))}
          </section>

          {/* CTAs */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12 }}>
            <Link href="/nhs-rehab/london" style={{ padding: '16px 20px', background: 'var(--accent)', color: '#fff', borderRadius: 'var(--radius-md)', textDecoration: 'none', fontWeight: 700, fontSize: 14, display: 'block', textAlign: 'center' }}>
              Find NHS rehab →
            </Link>
            <Link href="/private-rehab/london" style={{ padding: '16px 20px', background: '#7c3aed', color: '#fff', borderRadius: 'var(--radius-md)', textDecoration: 'none', fontWeight: 700, fontSize: 14, display: 'block', textAlign: 'center' }}>
              Find private rehab →
            </Link>
          </div>

        </div>
      </div>
    </div>
  )
}

import type { Metadata } from 'next'
import Link from 'next/link'
import { faqSchema, breadcrumbSchema } from '../../lib/seo'
import MedicalReview from '../../components/MedicalReview'
import AuthorBio from '../../components/AuthorBio'
import NewsletterSignup from '../../components/NewsletterSignup'

export const metadata: Metadata = {
  title: 'Alcohol Addiction Treatment in the UK: The Complete Guide | SoberNation',
  description: 'Everything you need to know about alcohol addiction treatment in the UK — NHS vs private rehab, detox, medications, costs, and aftercare. Written by addiction professionals.',
  openGraph: {
    title: 'Alcohol Addiction Treatment in the UK: The Complete Guide',
    description: 'NHS vs private rehab, detox, therapy, medications and aftercare — a comprehensive guide to treating alcohol addiction in the UK.',
  },
}

const faqs = [
  { question: 'How do I get alcohol addiction treatment on the NHS?', answer: 'Start by speaking to your GP, who can refer you to your local NHS drug and alcohol service (often called a DAAT or IAPT service). You can also self-refer directly to most NHS alcohol services without a GP referral. NHS treatment is free and typically includes assessment, a structured support programme, and access to medications like Acamprosate or Naltrexone. Waiting times vary by area but are usually 2–8 weeks.' },
  { question: 'Is alcohol detox dangerous?', answer: 'For people who drink heavily and daily, stopping suddenly can cause serious withdrawal symptoms including seizures and a life-threatening condition called Delirium Tremens (DTs). If you are physically dependent on alcohol — meaning you experience shakes, sweats, anxiety or vomiting when you don\'t drink — always speak to a doctor before stopping. A medically-managed detox significantly reduces these risks.' },
  { question: 'How much does private alcohol rehab cost in the UK?', answer: 'Private residential rehab in the UK typically costs between £4,000 and £15,000 for a 28-day programme. Costs vary significantly by location, facility quality, and treatment intensity. Some private rehabs offer payment plans. If cost is a barrier, NHS residential rehab is available for those assessed as needing it, and outpatient services are free and widely effective.' },
  { question: 'What is the difference between detox and rehab?', answer: 'Detox is the physical process of removing alcohol from your body, usually lasting 5–14 days and managed medically with medications like Chlordiazepoxide (Librium) to prevent withdrawal complications. Rehab is the broader therapeutic programme that follows detox — including CBT, group therapy, 12-step work, and relapse prevention. Detox alone without rehab has a very high relapse rate.' },
  { question: 'What medications are used to treat alcohol addiction?', answer: 'Several evidence-based medications are used in the UK: Acamprosate (Campral) reduces cravings and is taken daily post-detox; Naltrexone blocks the pleasurable effects of alcohol; Disulfiram (Antabuse) causes an extremely unpleasant reaction if alcohol is consumed and works as a deterrent; Nalmefene (Selincro) is used for "as-needed" reduction of consumption. All require a prescription and should be discussed with a doctor.' },
  { question: 'What happens after alcohol rehab?', answer: 'Aftercare is the period of structured support following discharge from residential or intensive outpatient treatment. This typically includes: regular one-to-one sessions with a counsellor, group therapy or 12-step meetings (AA), relapse prevention planning, sober living options if home environment is triggering, and follow-up with your GP. The first 90 days after treatment are statistically the highest risk for relapse, making aftercare critical.' },
]

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Guides', href: '/articles' },
  { label: 'Alcohol Addiction Treatment', href: '/alcohol-addiction-treatment' },
]

export default function AlcoholAddictionTreatmentPage() {
  const schemas = [faqSchema(faqs), breadcrumbSchema(breadcrumbs)]

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      <style>{`
        .guide-hero { background: var(--white); border-bottom: 1px solid var(--border); padding: 48px 20px 40px; }
        .guide-body { max-width: 820px; margin: 0 auto; padding: 48px 20px 80px; }
        .guide-body h2 { font-size: 22px; font-weight: 700; color: var(--text); margin: 40px 0 14px; padding-top: 16px; border-top: 1px solid var(--border); letter-spacing: -0.01em; }
        .guide-body h3 { font-size: 18px; font-weight: 700; color: var(--text); margin: 28px 0 10px; }
        .guide-body p { font-size: 16px; color: var(--text-muted); line-height: 1.85; margin: 0 0 20px; }
        .guide-body ul, .guide-body ol { margin: 0 0 20px; padding-left: 24px; }
        .guide-body li { font-size: 15px; color: var(--text-muted); line-height: 1.75; margin-bottom: 8px; }
        .guide-body strong { color: var(--text); }
        .guide-callout { padding: 20px 24px; border-left: 4px solid var(--accent); background: var(--accent-pale); border-radius: 0 var(--radius-md) var(--radius-md) 0; margin: 24px 0; }
        .guide-warning { padding: 16px 20px; border-left: 4px solid #c0392b; background: #fef2f2; border-radius: 0 var(--radius-sm) var(--radius-sm) 0; margin: 24px 0; }
        @media (max-width: 640px) { .guide-hero { padding: 32px 16px; } .guide-body { padding: 32px 16px 60px; } }
      `}</style>

      {/* Hero */}
      <section className="guide-hero">
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          <nav style={{ fontSize: 12, color: 'var(--text-light)', marginBottom: 16, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            <Link href="/" style={{ color: 'var(--text-light)', textDecoration: 'none' }}>Home</Link> /
            <Link href="/articles" style={{ color: 'var(--text-light)', textDecoration: 'none' }}>Guides</Link> /
            <span>Alcohol Addiction Treatment</span>
          </nav>
          <div className="label" style={{ marginBottom: 12 }}>Complete UK Guide · 2025</div>
          <h1 style={{ fontSize: 'clamp(24px, 4vw, 38px)', fontWeight: 800, color: 'var(--text)', marginBottom: 16, lineHeight: 1.15, letterSpacing: '-0.02em' }}>
            Alcohol Addiction Treatment in the UK
          </h1>
          <p style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.8, maxWidth: 620, marginBottom: 20 }}>
            A comprehensive guide to treating alcohol use disorder in the UK — covering NHS services, private rehab, medically-managed detox, evidence-based medications, therapy approaches, and what to expect at every stage.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
            <MedicalReview reviewer="Dr. Sarah Dawson" date="2025-04-01" />
            <span style={{ fontSize: 12, color: 'var(--text-light)' }}>Last updated April 2025 · 10 min read</span>
          </div>
        </div>
      </section>

      {/* Body */}
      <div className="guide-body">
        <div style={{ marginBottom: 32 }}>
          <AuthorBio author="James Whitfield" date="2025-04-01" compact />
        </div>

        <h2>Understanding Alcohol Use Disorder (AUD)</h2>
        <p>Alcohol Use Disorder (AUD) is the clinical term that replaces older labels like &ldquo;alcoholism&rdquo; or &ldquo;alcohol dependency.&rdquo; It exists on a spectrum from mild (occasional harmful drinking) to severe (physical dependency with withdrawal symptoms). According to NHS data, approximately 1 in 10 adults in the UK drink at levels that could be harmful, and around 600,000 people are dependent on alcohol.</p>
        <p>AUD is a medical condition — not a moral failing or a character weakness. The brain&apos;s reward centres become rewired by chronic alcohol use, making it extremely difficult to stop without professional support. Treatment is effective, available on the NHS, and does not require willpower alone.</p>

        <div className="guide-callout">
          <strong>Key fact:</strong> Alcohol is the only substance where withdrawal can be medically life-threatening. Never stop drinking suddenly if you are physically dependent — speak to a doctor first.
        </div>

        <h2>NHS Alcohol Treatment: What&apos;s Available Free</h2>
        <p>The NHS provides a comprehensive range of alcohol treatment services at no cost. These are commissioned locally and may go by different names in your area (DDAT, DAAT, STAR, ROADS, etc.).</p>
        <h3>How to access NHS alcohol services</h3>
        <ul>
          <li><strong>Via your GP:</strong> Your GP can refer you to your local drug and alcohol team and prescribe medications to manage withdrawal or cravings.</li>
          <li><strong>Self-referral:</strong> Most NHS alcohol services accept self-referrals — you can call or fill in a form online without going through your GP.</li>
          <li><strong>Via A&amp;E or hospital:</strong> If you attend hospital due to alcohol-related illness, the clinical team will refer you to alcohol liaison services.</li>
        </ul>
        <h3>What NHS treatment includes</h3>
        <ul>
          <li>Clinical assessment and risk evaluation</li>
          <li>Community-based detox (at home, with medical supervision)</li>
          <li>Residential detox and rehab (for complex cases)</li>
          <li>One-to-one counselling and structured group programmes</li>
          <li>Evidence-based medications (Acamprosate, Naltrexone, Disulfiram)</li>
          <li>Relapse prevention planning and ongoing keyworker support</li>
        </ul>

        <h2>Private Alcohol Rehab: Costs and What to Expect</h2>
        <p>Private residential rehab offers faster access (often same-day or next-day admission), higher staff-to-client ratios, more comfortable facilities, and intensive therapy. Costs in the UK typically range from <strong>£4,000 to £15,000</strong> for a 28-day residential programme.</p>
        <h3>What private rehab includes</h3>
        <ul>
          <li>24/7 medically supervised detox</li>
          <li>Daily individual and group therapy</li>
          <li>Specialist programmes (trauma, dual diagnosis, CBT, DBT)</li>
          <li>Nutritional support and wellness activities</li>
          <li>Structured aftercare plan and community referrals</li>
        </ul>
        <p>When choosing a private rehab, always check that they are <strong>CQC-registered</strong> (Care Quality Commission) — this is mandatory for any residential treatment provider in England.</p>

        <div className="guide-warning">
          <strong>Warning:</strong> Be cautious of rehabs that promise guaranteed results, use high-pressure sales tactics, or cannot show their CQC registration. Legitimate providers will always be listed on the <a href="https://www.cqc.org.uk" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}>CQC website</a>.
        </div>

        <h2>Medically-Managed Alcohol Detox</h2>
        <p>Alcohol detox is the first stage of treatment for people who are physically dependent. It involves eliminating alcohol from the body under medical supervision, typically using medications to prevent dangerous withdrawal symptoms.</p>
        <h3>What happens during detox</h3>
        <p>Withdrawal symptoms typically begin within 6–24 hours of the last drink and peak at 48–72 hours. The most common symptoms are tremors, sweating, anxiety, nausea, and insomnia. In severe cases, seizures and Delirium Tremens (DTs) can occur — this is why medical supervision is essential.</p>
        <h3>Medications used in detox</h3>
        <ul>
          <li><strong>Chlordiazepoxide (Librium):</strong> The most widely used medication for alcohol detox in the UK. A benzodiazepine that manages withdrawal symptoms and reduces seizure risk.</li>
          <li><strong>Thiamine (Vitamin B1):</strong> Given to prevent Wernicke&apos;s Encephalopathy, a serious brain condition caused by alcohol-related B1 deficiency.</li>
          <li><strong>Lorazepam:</strong> Used for more severe withdrawal, particularly in hospital settings.</li>
        </ul>

        <h2>Therapy and Psychological Treatment</h2>
        <p>Effective alcohol treatment combines physical detox with psychological therapy. The most evidence-based approaches include:</p>
        <ul>
          <li><strong>Cognitive Behavioural Therapy (CBT):</strong> Identifies and changes thinking patterns and behaviours that trigger drinking.</li>
          <li><strong>Motivational Enhancement Therapy (MET):</strong> Builds internal motivation to change and reduces ambivalence.</li>
          <li><strong>12-Step Facilitation:</strong> Structured support through AA and related programmes.</li>
          <li><strong>SMART Recovery:</strong> A secular, science-based alternative to the 12-step approach.</li>
          <li><strong>Family Therapy:</strong> Addresses family dynamics that may contribute to drinking patterns.</li>
        </ul>

        <h2>Medications for Long-Term Recovery</h2>
        <p>After detox, medications can significantly increase the chances of maintaining sobriety:</p>
        <ul>
          <li><strong>Acamprosate (Campral):</strong> Reduces cravings and the discomfort of early abstinence. Taken twice daily for up to a year.</li>
          <li><strong>Naltrexone:</strong> Blocks the euphoric effects of alcohol, reducing the drive to drink.</li>
          <li><strong>Disulfiram (Antabuse):</strong> Causes a severe physical reaction (flushing, nausea, palpitations) if alcohol is consumed, acting as a powerful deterrent.</li>
          <li><strong>Nalmefene (Selincro):</strong> Used to reduce alcohol consumption rather than enforce abstinence — taken &ldquo;when needed&rdquo; before expected drinking occasions.</li>
        </ul>

        <h2>Aftercare: The Most Important Stage</h2>
        <p>Research consistently shows that long-term sobriety is dependent on structured aftercare following initial treatment. The first three months post-treatment carry the highest relapse risk. Effective aftercare includes:</p>
        <ul>
          <li>Regular one-to-one keyworker sessions</li>
          <li>AA or SMART Recovery meetings (peer support)</li>
          <li>Continued medication where prescribed</li>
          <li>Sober living accommodation if the home environment is triggering</li>
          <li>Ongoing mental health support for dual diagnosis</li>
        </ul>

        {/* FAQ */}
        <h2>Frequently Asked Questions</h2>
        {faqs.map((faq, i) => (
          <details key={i} style={{ borderTop: i === 0 ? '1px solid var(--border)' : 'none', borderBottom: '1px solid var(--border)' }}>
            <summary style={{ padding: '16px 0', fontSize: 15, fontWeight: 600, color: 'var(--text)', cursor: 'pointer', listStyle: 'none', display: 'flex', justifyContent: 'space-between', gap: 12 }}>
              {faq.question}<span style={{ fontSize: 18, color: 'var(--text-light)', flexShrink: 0 }}>+</span>
            </summary>
            <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.75, paddingBottom: 16, margin: 0 }}>{faq.answer}</p>
          </details>
        ))}

        {/* Related links */}
        <div style={{ marginTop: 48, padding: 24, background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 16 }}>Related resources</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              ['Alcohol rehab near you', '/alcohol-rehab/london'],
              ['NHS rehab (free)', '/nhs-rehab/london'],
              ['Private rehab', '/private-rehab/london'],
              ['Alcohol withdrawal symptoms', '/alcohol-withdrawal-symptoms'],
              ['Signs of alcoholism', '/signs-of-alcoholism'],
              ['Am I an alcoholic? (WHO AUDIT)', '/am-i-an-alcoholic'],
              ['How to stop drinking', '/how-to-stop-drinking'],
              ['Find a counsellor', '/counsellors/london'],
            ].map(([label, href]) => (
              <Link key={href} href={href} style={{ fontSize: 14, color: 'var(--accent)', textDecoration: 'none' }}>{label} →</Link>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div style={{ marginTop: 40 }}>
          <NewsletterSignup variant="inline" source="alcohol-treatment-guide" />
        </div>

        {/* Author */}
        <div style={{ marginTop: 32 }}>
          <AuthorBio author="James Whitfield" date="2025-04-01" />
        </div>
      </div>
    </div>
  )
}

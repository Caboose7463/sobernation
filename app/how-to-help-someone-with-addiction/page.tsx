import type { Metadata } from 'next'
import Link from 'next/link'
import { faqSchema, breadcrumbSchema } from '../../lib/seo'
import MedicalReview from '../../components/MedicalReview'
import AuthorBio from '../../components/AuthorBio'
import NewsletterSignup from '../../components/NewsletterSignup'

export const metadata: Metadata = {
  title: 'How to Help Someone with Addiction: A Family Guide | SoberNation',
  description: 'Practical, honest guide for families and loved ones of people with addiction. Covers intervention, enabling, boundaries, Al-Anon, financing treatment, and protecting your own wellbeing.',
  openGraph: {
    title: 'How to Help Someone with Addiction: A Family Guide',
    description: 'What to say, what not to do, and how to support a loved one through addiction — without losing yourself in the process.',
  },
}

const faqs = [
  { question: 'What should I say to someone who has an addiction?', answer: 'Focus on expressing concern rather than accusation. Use "I" statements — "I\'ve noticed you seem to be struggling and I\'m worried about you" rather than "You\'re an alcoholic and it\'s ruining everything." Avoid doing this when they are intoxicated. Choose a calm, private moment and be prepared that the first conversation may not go well. Your goal is to open a door, not to force them through it.' },
  { question: 'What is enabling and how do I stop doing it?', answer: 'Enabling is any behaviour that shields a person with addiction from the natural consequences of their use — paying their debts, calling in sick for them, lying to others about the situation, or continuing to allow substance use in your home. Enabling is almost always done out of love, but it removes the motivation to change. Stopping enabling does not mean abandoning the person — it means no longer removing consequences that might prompt them to seek help.' },
  { question: 'Should I give an ultimatum?', answer: 'Ultimatums can be effective but only if you are prepared to follow through — an ultimatum you do not enforce will actually reduce your credibility and the chance of change. Before delivering an ultimatum, consider whether you are genuinely ready to act on it. Professional guidance from an addiction counsellor or Al-Anon can help you decide if and how to approach this. An unplanned, emotional ultimatum made during a crisis is rarely effective.' },
  { question: 'How do I pay for a loved one\'s rehab?', answer: 'Options include: NHS referral (free, but with waiting times); private rehab with payment by savings, credit card, or personal loan; some private rehabs offer payment plans; treatment abroad (significantly cheaper); crowdfunding; employer-assisted programmes (some larger employers offer EAP support). A loved one is more likely to engage with treatment if they have some ownership of the decision and the process — involving them in choosing a rehabilitation centre can increase commitment.' },
  { question: 'What if they refuse help?', answer: 'You cannot force an adult into treatment against their will (except in very rare circumstances under the Mental Health Act). What you can do is: maintain consistent, loving boundaries; ensure they know help is available when they\'re ready; make a list of treatment options so you are prepared to act quickly when they reach a point of openness; attend Al-Anon or similar support to protect your own mental health; and, if the situation is unsafe, prioritise your own safety and that of any children involved.' },
  { question: 'How do I look after myself while supporting someone with addiction?', answer: 'This is not optional — it is essential. Carers and family members of people with addiction experience significantly elevated rates of anxiety, depression, and their own substance misuse. Al-Anon, Families Anonymous, and SMART Recovery Family & Friends all offer free support for family members. Individual therapy can help you process complex emotions. Setting clear limits on what behaviour you will and will not accept protects both of you.' },
]

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Guides', href: '/articles' },
  { label: 'How to Help Someone with Addiction', href: '/how-to-help-someone-with-addiction' },
]

export default function HowToHelpPage() {
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
        @media (max-width: 640px) { .guide-hero { padding: 32px 16px; } .guide-body { padding: 32px 16px 60px; } }
      `}</style>

      <section className="guide-hero">
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          <nav style={{ fontSize: 12, color: 'var(--text-light)', marginBottom: 16, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            <Link href="/" style={{ color: 'var(--text-light)', textDecoration: 'none' }}>Home</Link> /
            <Link href="/articles" style={{ color: 'var(--text-light)', textDecoration: 'none' }}>Guides</Link> /
            <span>How to Help Someone with Addiction</span>
          </nav>
          <div className="label" style={{ marginBottom: 12 }}>Family Guide · 2025</div>
          <h1 style={{ fontSize: 'clamp(24px, 4vw, 38px)', fontWeight: 800, color: 'var(--text)', marginBottom: 16, lineHeight: 1.15, letterSpacing: '-0.02em' }}>
            How to Help Someone with Addiction
          </h1>
          <p style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.8, maxWidth: 620, marginBottom: 20 }}>
            A practical, honest guide for families and loved ones. What to say, what not to do, how to set limits, and — crucially — how to look after yourself while supporting someone through addiction.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
            <MedicalReview reviewer="Emily Clarke" date="2025-04-01" />
            <span style={{ fontSize: 12, color: 'var(--text-light)' }}>Last updated April 2025 · 8 min read</span>
          </div>
        </div>
      </section>

      <div className="guide-body">
        <div style={{ marginBottom: 32 }}>
          <AuthorBio author="Emily Clarke" date="2025-04-01" compact />
        </div>

        <h2>First: You Are Not Alone</h2>
        <p>An estimated 1 in 3 families in the UK are directly affected by a loved one&apos;s substance use. Watching someone you love struggle with addiction is one of the most painful experiences a person can go through. The feelings of helplessness, guilt, anger, and grief are all completely normal — and you are not responsible for their addiction, nor does your love alone have the power to cure it.</p>
        <p>What you <em>can</em> do is create the conditions that make getting help more likely, and ensure you do not lose yourself in the process.</p>

        <div className="guide-callout">
          <strong>Key principle:</strong> You cannot control someone else&apos;s addiction. You can only control your own responses, and those responses — boundaries, consequences, and self-care — are more powerful than you might think.
        </div>

        <h2>Understanding Addiction as a Disease</h2>
        <p>Addiction is classified by the World Health Organization as a chronic brain disorder. Prolonged substance use rewires the brain&apos;s reward pathways, making the drive to use almost as powerful as the drive to eat or drink. This is why willpower alone is rarely sufficient — not because the person &ldquo;doesn&apos;t want to stop&rdquo; but because their brain has been changed by the substance.</p>
        <p>Understanding this does not excuse harmful behaviour — people in addiction can and do make choices that hurt others. But it does shift the frame from moral failure to illness, which changes how you respond and helps break the cycle of shame that keeps people from seeking help.</p>

        <h2>What to Say (and What Not to)</h2>
        <h3>Things that help</h3>
        <ul>
          <li>Express concern calmly, without accusation: <em>&ldquo;I&apos;ve noticed you seem to be struggling and I&apos;m worried about you.&rdquo;</em></li>
          <li>Use specific observations: <em>&ldquo;Over the last few weeks, I&apos;ve noticed you&apos;ve been drinking every evening.&rdquo;</em></li>
          <li>Be honest about the impact on you: <em>&ldquo;When this happens, I feel scared and alone.&rdquo;</em></li>
          <li>Offer support without attaching conditions: <em>&ldquo;I&apos;m here for you, and I want to help you get support if you&apos;re ready.&rdquo;</em></li>
        </ul>
        <h3>Things that tend to backfire</h3>
        <ul>
          <li>Talking to them when they are intoxicated</li>
          <li>Issuing threats you are not prepared to follow through on</li>
          <li>Blaming, shaming, or moralising</li>
          <li>Making it about yourself rather than their wellbeing</li>
          <li>Giving up and never raising it again after one difficult conversation</li>
        </ul>

        <h2>Enabling vs. Supporting: A Critical Distinction</h2>
        <p>Enabling is any action that removes the natural consequences of addiction — making it easier for someone to continue without feeling the full impact. This almost always comes from a place of love and a desire to protect, but it can inadvertently prolong the addiction.</p>
        <h3>Common enabling behaviours</h3>
        <ul>
          <li>Giving money that enables substance purchase</li>
          <li>Covering up or lying to others about their behaviour</li>
          <li>Calling in sick on their behalf</li>
          <li>Paying debts, rent, or bills they have spent on substances</li>
          <li>Allowing substance use in your home to &ldquo;keep the peace&rdquo;</li>
        </ul>
        <p>Stopping enabling is not the same as stopping caring. It is often the most loving, difficult thing you can do.</p>

        <h2>Setting Boundaries That You Will Actually Keep</h2>
        <p>Limits in addiction are about protecting yourself and defining what you will and will not participate in. They are not punishments — they are statements about your own values and mental health.</p>
        <ul>
          <li>&ldquo;I will not lend you money.&rdquo;</li>
          <li>&ldquo;I will not allow drug use in my home.&rdquo;</li>
          <li>&ldquo;I will not lie to your employer again.&rdquo;</li>
        </ul>
        <p>Only set a boundary you are willing and able to actually enforce. A limit that is crossed and overlooked teaches the person with addiction that the limits are not real.</p>

        <h2>How to Get Them into Treatment</h2>
        <p>You cannot force an adult into treatment against their will — but you can take steps that make treatment more accessible when they are ready:</p>
        <ol>
          <li>Research options in advance so you can act quickly — have phone numbers, addresses, and types of treatment ready.</li>
          <li>Consider a <strong>planned intervention</strong> — a structured, supervised conversation with a professional facilitator. This is different from a confrontational ambush.</li>
          <li>Use &ldquo;crisis windows&rdquo; — moments after a significant consequence (arrest, health scare, relationship breakdown) when someone may be most open to help.</li>
          <li>Make treatment as frictionless as possible — offer to drive to an appointment, sit with them while they call a service, stay with their children.</li>
        </ol>

        <h2>Looking After Yourself</h2>
        <p>This is not a luxury — it is a necessity. Carers and family members of people with addiction experience significantly higher rates of depression, anxiety, and burnout. Your mental health matters, and you cannot support someone from an empty cup.</p>
        <ul>
          <li><Link href="/al-anon/london" style={{ color: 'var(--accent)' }}>Al-Anon</Link> — free support groups specifically for families of people with alcohol problems</li>
          <li><strong>Families Anonymous</strong> — for families of drug users</li>
          <li><Link href="/smart-recovery/london" style={{ color: 'var(--accent)' }}>SMART Recovery Family &amp; Friends</Link> — secular, evidence-based family support</li>
          <li>Individual therapy — working with a therapist who understands addiction can be transformative</li>
        </ul>

        <h2>Frequently Asked Questions</h2>
        {faqs.map((faq, i) => (
          <details key={i} style={{ borderTop: i === 0 ? '1px solid var(--border)' : 'none', borderBottom: '1px solid var(--border)' }}>
            <summary style={{ padding: '16px 0', fontSize: 15, fontWeight: 600, color: 'var(--text)', cursor: 'pointer', listStyle: 'none', display: 'flex', justifyContent: 'space-between', gap: 12 }}>
              {faq.question}<span style={{ fontSize: 18, color: 'var(--text-light)', flexShrink: 0 }}>+</span>
            </summary>
            <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.75, paddingBottom: 16, margin: 0 }}>{faq.answer}</p>
          </details>
        ))}

        <div style={{ marginTop: 40 }}>
          <NewsletterSignup variant="inline" source="family-guide" />
        </div>
        <div style={{ marginTop: 32 }}>
          <AuthorBio author="Emily Clarke" date="2025-04-01" />
        </div>
      </div>
    </div>
  )
}

import type { Metadata } from 'next'
import Link from 'next/link'
import { faqSchema, breadcrumbSchema } from '../../lib/seo'
import MedicalReview from '../../components/MedicalReview'
import AuthorBio from '../../components/AuthorBio'
import NewsletterSignup from '../../components/NewsletterSignup'

export const metadata: Metadata = {
  title: 'Suboxone vs Methadone: Which is Right for You? | SoberNation',
  description: 'A clinical comparison of Suboxone (buprenorphine/naloxone) and methadone for opioid addiction treatment in the UK — eligibility, how each works, pros, cons, and availability on the NHS.',
}

const faqs = [
  { question: 'Is Suboxone available on the NHS in the UK?', answer: 'Yes. Buprenorphine (the active ingredient in Suboxone) is available on the NHS as part of opioid substitution therapy (OST). It is prescribed by drug treatment services and some GPs with specialist training. The naloxone component in Suboxone is added specifically to deter injection misuse. Access varies by area — your local drug treatment team can advise on what is available.' },
  { question: 'Which is better — Suboxone or methadone?', answer: 'Neither is universally "better" — the right choice depends on your situation. Methadone is typically preferred for people with severe dependency, as it is a full opioid agonist and better controls strong withdrawal symptoms. Suboxone (buprenorphine/naloxone) is often preferred for people who want to taper off OST more quickly, as it is easier to reduce doses from. Both are evidence-based and NICE-approved.' },
  { question: 'Can I switch from methadone to Suboxone?', answer: 'Yes, but the switch requires careful management. You must be in mild to moderate withdrawal (not on a full dose of methadone) before starting buprenorphine, as starting it too early can trigger precipitated withdrawal — a sudden, severe withdrawal syndrome. The switch should always be managed by a prescriber experienced in opioid substitution therapy.' },
  { question: 'How long do people usually stay on methadone or Suboxone?', answer: 'Treatment duration varies significantly. NICE guidelines recommend that treatment duration should be individualised — there is no fixed minimum or maximum. Some people remain on maintenance doses long-term as an ongoing treatment for addiction (similar to how people take antidepressants indefinitely). Others choose to gradually taper off. Research shows that premature discontinuation significantly increases relapse rates.' },
  { question: 'Do I have to attend a clinic daily for methadone?', answer: 'In the early stages of treatment, daily supervised consumption is standard for methadone — you attend a pharmacy each day to take your dose in front of a pharmacist. As your treatment stabilises, most people are granted takeaway doses (usually starting with 1–2 days, eventually up to 14 days\' supply). Buprenorphine prescriptions often move to takeaway doses more quickly.' },
]

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Guides', href: '/articles' },
  { label: 'Suboxone vs Methadone', href: '/suboxone-vs-methadone' },
]

export default function SuboxoneVsMethadonePage() {
  const schemas = [faqSchema(faqs), breadcrumbSchema(breadcrumbs)]
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {schemas.map((s, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />)}
      <style>{`
        .sv-body { max-width: 820px; margin: 0 auto; padding: 48px 20px 80px; }
        .sv-body h2 { font-size: 22px; font-weight: 700; color: var(--text); margin: 40px 0 14px; padding-top: 16px; border-top: 1px solid var(--border); }
        .sv-body h3 { font-size: 17px; font-weight: 700; color: var(--text); margin: 24px 0 8px; }
        .sv-body p { font-size: 16px; color: var(--text-muted); line-height: 1.85; margin: 0 0 20px; }
        .sv-body ul { margin: 0 0 20px; padding-left: 24px; }
        .sv-body li { font-size: 15px; color: var(--text-muted); line-height: 1.75; margin-bottom: 8px; }
        .sv-body strong { color: var(--text); }
        .sv-table { width: 100%; border-collapse: collapse; margin: 24px 0; font-size: 14px; }
        .sv-table th { background: var(--accent); color: #fff; padding: 12px 16px; text-align: left; font-weight: 600; }
        .sv-table td { padding: 12px 16px; border-bottom: 1px solid var(--border); color: var(--text-muted); vertical-align: top; }
        .sv-table tr:nth-child(even) td { background: var(--bg-subtle); }
        @media (max-width: 640px) { .sv-body { padding: 32px 16px 60px; } .sv-table { font-size: 12px; } .sv-table th, .sv-table td { padding: 8px 10px; } }
      `}</style>

      <section style={{ background: 'var(--white)', borderBottom: '1px solid var(--border)', padding: '48px 20px 40px' }}>
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          <div className="label" style={{ marginBottom: 12 }}>Clinical Comparison · UK 2025</div>
          <h1 style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 800, color: 'var(--text)', marginBottom: 16, lineHeight: 1.15, letterSpacing: '-0.02em' }}>
            Suboxone vs Methadone: Which is Right for You?
          </h1>
          <p style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.8, maxWidth: 620, marginBottom: 20 }}>
            A clinical comparison of the two main opioid substitution treatments available on the NHS — how each works, who they suit, the pros and cons, and how to access them in the UK.
          </p>
          <MedicalReview reviewer="Dr. Sarah Dawson" date="2025-04-01" />
        </div>
      </section>

      <div className="sv-body">
        <div style={{ marginBottom: 32 }}><AuthorBio author="Dr. Sarah Dawson" date="2025-04-01" compact /></div>

        <h2>Opioid Substitution Therapy: The Basics</h2>
        <p>Opioid substitution therapy (OST) — also called opioid replacement therapy (ORT) — is the use of a prescribed, longer-acting opioid to stabilise someone dependent on a shorter-acting opioid like heroin, fentanyl, or prescription opioids. It is the most evidence-based treatment for opioid use disorder, reducing illicit drug use, drug-related deaths, and criminal activity, and improving physical and mental health outcomes.</p>
        <p>The two main medications used in the UK are <strong>methadone</strong> (a full opioid agonist) and <strong>buprenorphine</strong> — most commonly prescribed as <strong>Suboxone</strong> (buprenorphine/naloxone) or Subutex (buprenorphine alone).</p>

        <h2>Side-by-Side Comparison</h2>
        <table className="sv-table">
          <thead>
            <tr>
              <th>Feature</th>
              <th>Methadone</th>
              <th>Suboxone (Buprenorphine/Naloxone)</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Type', 'Full opioid agonist', 'Partial opioid agonist + antagonist'],
              ['NHS availability', 'Widely available', 'Widely available'],
              ['Form', 'Oral liquid (usually)', 'Sublingual film or tablet'],
              ['Daily clinic visits', 'Usually required early on', 'Often less frequent'],
              ['Overdose risk', 'Higher (full agonist)', 'Lower (ceiling effect)'],
              ['Misuse potential', 'Higher', 'Lower (naloxone deters injection)'],
              ['Withdrawal coverage', 'Excellent (high dependency)', 'Good (moderate dependency)'],
              ['Tapering off', 'Slower, longer process', 'Easier to reduce doses'],
              ['Drug interactions', 'More significant', 'Fewer'],
              ['Pregnancy', 'First-line recommended', 'Used but methadone preferred'],
            ].map(([f, m, s]) => (
              <tr key={f}>
                <td><strong>{f}</strong></td>
                <td>{m}</td>
                <td>{s}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2>Methadone: When It&apos;s the Right Choice</h2>
        <p>Methadone is typically the first-line treatment for people with <strong>severe opioid dependency</strong>, particularly those who have been using heroin or fentanyl heavily for a long period. As a full agonist, it completely satisfies opioid receptors, effectively eliminating withdrawal symptoms and cravings.</p>
        <h3>Methadone may suit you if:</h3>
        <ul>
          <li>You have severe, long-standing dependency</li>
          <li>Buprenorphine hasn&apos;t worked for you previously</li>
          <li>You need maximum withdrawal symptom control</li>
          <li>You are pregnant (methadone is the recommended option in pregnancy)</li>
        </ul>

        <h2>Suboxone (Buprenorphine/Naloxone): When It&apos;s the Better Option</h2>
        <p>Buprenorphine is a <strong>partial agonist</strong> — it activates opioid receptors but has a &ldquo;ceiling effect,&rdquo; meaning higher doses do not produce proportionally greater effects. This makes it significantly safer in overdose than methadone. The naloxone component deters injection by triggering withdrawal if injected.</p>
        <h3>Suboxone may suit you if:</h3>
        <ul>
          <li>You want a lower overdose risk</li>
          <li>You have mild to moderate dependency</li>
          <li>You want to taper off OST in the medium term</li>
          <li>You want more flexibility in your dosing schedule</li>
          <li>You are concerned about methadone&apos;s interactions with other medications</li>
        </ul>

        <h2>How to Access OST in the UK</h2>
        <p>Both methadone and Suboxone are available free on the NHS. To access OST:</p>
        <ul>
          <li>Contact your local drug treatment service (search <Link href="/drug-treatment/london" style={{ color: 'var(--accent)' }}>drug treatment services near you</Link>)</li>
          <li>Self-refer — most services accept self-referrals without a GP letter</li>
          <li>Speak to your GP, who can refer you or in some cases prescribe directly</li>
        </ul>
        <p>You will have a clinical assessment to determine which medication and starting dose are appropriate for your level of dependency.</p>

        <h2>Frequently Asked Questions</h2>
        {faqs.map((faq, i) => (
          <details key={i} style={{ borderTop: i === 0 ? '1px solid var(--border)' : 'none', borderBottom: '1px solid var(--border)' }}>
            <summary style={{ padding: '16px 0', fontSize: 15, fontWeight: 600, color: 'var(--text)', cursor: 'pointer', listStyle: 'none', display: 'flex', justifyContent: 'space-between', gap: 12 }}>
              {faq.question}<span style={{ fontSize: 18, color: 'var(--text-light)', flexShrink: 0 }}>+</span>
            </summary>
            <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.75, paddingBottom: 16, margin: 0 }}>{faq.answer}</p>
          </details>
        ))}

        <div style={{ marginTop: 32, padding: 20, background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
          <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>Related resources</div>
          {[['What is methadone?', '/what-is-methadone'], ['Heroin addiction help', '/heroin-addiction/london'], ['Drug treatment services', '/drug-treatment/london'], ['Heroin detox', '/heroin-detox/london'], ['Opioid substitution therapy', '/opioid-substitution/london']].map(([l, h]) => (
            <Link key={h} href={h} style={{ display: 'block', fontSize: 13, color: 'var(--accent)', textDecoration: 'none', padding: '5px 0', borderBottom: '1px solid var(--border)' }}>{l} →</Link>
          ))}
        </div>

        <div style={{ marginTop: 32 }}><NewsletterSignup variant="inline" source="suboxone-methadone" /></div>
        <div style={{ marginTop: 24 }}><AuthorBio author="Dr. Sarah Dawson" date="2025-04-01" /></div>
      </div>
    </div>
  )
}

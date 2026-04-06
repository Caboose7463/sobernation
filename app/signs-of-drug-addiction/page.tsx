import type { Metadata } from 'next'
import Link from 'next/link'
import { faqSchema } from '../../lib/seo'

export const metadata: Metadata = {
  title: 'Signs of Drug Addiction | 12 Warning Signs to Look For | SoberNation',
  description: 'Recognise the signs of drug addiction in yourself or a loved one. 12 clinical warning signs of drug use disorder explained. Find free help across the UK.',
}

const SIGNS = [
  { n: 1, sign: 'Changes in behaviour and personality', detail: 'Noticeable shifts in mood, energy levels, and personality — particularly secrecy, defensiveness, mood swings, or uncharacteristic aggression. People often describe loved ones as seeming "like a different person."' },
  { n: 2, sign: 'Neglecting responsibilities', detail: 'Persistent absence from work, school, or family commitments. Failure to meet deadlines, maintain relationships, or fulfil parental duties. Drug use taking priority over established obligations.' },
  { n: 3, sign: 'Financial problems', detail: 'Unexplained requests for money, selling possessions, missing bill payments, or evidence of theft or borrowing from friends and family. Drug addiction is expensive and finances are often the first visible casualty.' },
  { n: 4, sign: 'Physical changes', detail: 'Significant weight change (loss or gain), poor hygiene and self-care, changes in complexion, dental deterioration ("meth mouth"), injection marks on arms, persistent sniffing, or bloodshot eyes — these vary by substance.' },
  { n: 5, sign: 'Changes in social circle', detail: 'Withdrawing from long-term friends and family, spending time with new social groups (often those also using drugs), becoming secretive about whereabouts, and avoiding family events.' },
  { n: 6, sign: 'Loss of interest in hobbies', detail: 'Abandoning sports, creative pursuits, social activities, or passions that previously gave life meaning. Drug use progressively colonises the brain\'s reward system, making previously enjoyable activities feel flat by comparison.' },
  { n: 7, sign: 'Drug paraphernalia', detail: 'Finding syringes, pipes, foil, rolled-up notes, small bags, zip-lock bags, cut drinking straws, or other drug equipment. Different drugs have different paraphernalia — what you find can indicate which substances are being used.' },
  { n: 8, sign: 'Tolerance and escalating use', detail: 'Needing increasingly larger amounts of a drug to achieve the same effect. Talking about how much more they need to "feel anything." Escalating use is a key clinical indicator of developing addiction.' },
  { n: 9, sign: 'Withdrawal symptoms', detail: 'Physical or psychological distress when not using — sweating, tremors, nausea, extreme anxiety, irritability, or depression. Withdrawal symptoms indicate physical dependency and mean that medical supervision may be needed when stopping.' },
  { n: 10, sign: 'Continuing despite consequences', detail: 'Continuing to use drugs despite visible and serious consequences — job loss, relationship breakdown, legal problems, health deterioration, or previous overdoses. This apparent irrationality is a hallmark of addiction — the brain hijacks rational decision-making.' },
  { n: 11, sign: 'Failed attempts to stop', detail: 'Expressing desire to stop and making repeated attempts that do not last. Promising to quit "after this last time." Feeling genuinely unable to stop despite knowing the harm it is causing — this is the essence of addiction.' },
  { n: 12, sign: 'Overdose or drug-related medical emergencies', detail: 'Previous overdoses, emergency department attendances, or other medical emergencies related to drug use. Multiple overdoses are a strong predictor of future fatal overdose — professional help is essential.' },
]

const faqs = [
  { question: 'What are the most obvious signs of drug addiction?', answer: 'The most visible signs of drug addiction include: significant changes in physical appearance (weight loss, poor hygiene), personality changes (secrecy, aggression, mood swings), financial problems, neglecting responsibilities, withdrawal from family and friends, finding drug paraphernalia, and continued use despite obvious harm to work, relationships, and health.' },
  { question: 'What are the signs of heroin addiction?', answer: 'Signs of heroin addiction include: constricted (pinpoint) pupils, drowsiness ("nodding off"), slurred speech, injection marks on arms or other body parts, mood swings between euphoria and severe withdrawal, weight loss, pale or itchy skin, hiding syringes or other paraphernalia, severe mood changes when unable to use, and financial problems.' },
  { question: 'What are the signs of cocaine addiction?', answer: 'Signs of cocaine addiction include: frequent nosebleeds or damage to the nasal septum, excessive talkativeness and elevated mood, followed by crashes with depression and fatigue, loss of appetite, weight loss, financial difficulties (cocaine is expensive), increased confidence or grandiosity when using, and increased risky behaviour.' },
  { question: 'How do I speak to someone about their drug use?', answer: 'Choose a calm moment when they are not under the influence. Express concern from a place of love, not accusation: "I\'ve noticed you seem different lately and I\'m worried about you" rather than "You\'re destroying your life." Avoid ultimatums you won\'t follow through on. Have information about available help ready. Frank (0300 123 6600) offers advice for families on how to approach these conversations.' },
]

export default function SignsOfDrugAddictionPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }} />

      <section style={{ background: 'var(--white)', borderBottom: '1px solid var(--border)', padding: '48px 20px 40px' }}>
        <div className="container-wide" style={{ maxWidth: 720 }}>
          <div className="label" style={{ marginBottom: 12 }}>Drug Addiction · Warning Signs</div>
          <h1 style={{ fontSize: 'clamp(22px,4vw,36px)', fontWeight: 700, color: 'var(--text)', marginBottom: 16, lineHeight: 1.2, letterSpacing: '-0.02em' }}>
            Signs of Drug Addiction: 12 Warning Signs to Look For
          </h1>
          <p style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.8, maxWidth: 640 }}>
            The key signs of drug addiction include: significant changes in behaviour, personality, and physical appearance; neglecting responsibilities; financial difficulties; withdrawal from family and friends; and continued use despite obvious harm. If you recognise these signs, free help is available across the UK — call Frank on <strong>0300 123 6600</strong> (free, 24/7).
          </p>
        </div>
      </section>

      <div className="container-wide" style={{ padding: '48px 20px', maxWidth: 760 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 40 }}>
          {SIGNS.map((s) => (
            <div key={s.n} style={{ display: 'flex', gap: 16, padding: 20, background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--accent)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14, flexShrink: 0 }}>
                {s.n}
              </div>
              <div>
                <h2 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>{s.sign}</h2>
                <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7, margin: 0 }}>{s.detail}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ padding: 24, background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', marginBottom: 40 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 10 }}>If someone you love is showing these signs</h3>
          <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.75, marginBottom: 14 }}>You cannot force someone to get help, but you can reach out. Frank (0300 123 6600, free, 24/7) provides specific advice for families of people with drug problems. Al-Anon and Adfam also offer community support for families.</p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <a href="tel:03001236600" style={{ padding: '10px 18px', background: 'var(--accent)', color: '#fff', borderRadius: 'var(--radius-md)', fontWeight: 700, fontSize: 14, textDecoration: 'none' }}>Call Frank: 0300 123 6600</a>
            <Link href="/how-to-help/london" style={{ padding: '10px 18px', background: 'var(--white)', border: '1px solid var(--border)', color: 'var(--text)', borderRadius: 'var(--radius-md)', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>How to help a loved one →</Link>
          </div>
        </div>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text)', marginBottom: 20 }}>Frequently asked questions</h2>
        {faqs.map((faq, i) => (
          <details key={i} style={{ borderTop: i === 0 ? '1px solid var(--border)' : 'none', borderBottom: '1px solid var(--border)' }}>
            <summary style={{ padding: '16px 0', fontSize: 15, fontWeight: 600, color: 'var(--text)', cursor: 'pointer', listStyle: 'none', display: 'flex', justifyContent: 'space-between' }}>
              {faq.question}<span style={{ fontSize: 18, color: 'var(--text-light)', marginLeft: 12 }}>+</span>
            </summary>
            <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.75, paddingBottom: 16, margin: 0 }}>{faq.answer}</p>
          </details>
        ))}

        {/* See also */}
        <div style={{ marginTop: 40 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 14 }}>See also</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {[
              { label: 'Heroin addiction help', href: '/heroin-addiction/london' },
              { label: 'Cocaine addiction help', href: '/cocaine-addiction/london' },
              { label: 'Cannabis addiction help', href: '/cannabis-addiction/london' },
              { label: 'Signs of alcoholism', href: '/signs-of-alcoholism' },
              { label: 'Heroin withdrawal symptoms', href: '/heroin-withdrawal-symptoms' },
              { label: 'Withdrawal timeline', href: '/withdrawal-timeline' },
              { label: 'Drug treatment near you', href: '/drug-treatment/london' },
              { label: 'Drug rehab near you', href: '/drug-rehab/london' },
              { label: 'NA meetings', href: '/na-meetings/london' },
              { label: 'Find help near you', href: '/help/london' },
            ].map(item => (
              <Link key={item.href} href={item.href} style={{ padding: '8px 16px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 20, fontSize: 13, color: 'var(--text)', textDecoration: 'none', fontWeight: 500 }}>
                {item.label} →
              </Link>
            ))}
          </div>
        </div>
      </div>

      <footer style={{ borderTop: '1px solid var(--border)', padding: '28px 20px', background: 'var(--white)' }}>
        <div className="container-wide" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ fontSize: 12, color: 'var(--text-light)' }}>© {new Date().getFullYear()} SoberNation</div>
          <div style={{ display: 'flex', gap: 20 }}>
            {[['Drug rehab', '/drug-rehab/london'], ['NA meetings', '/na-meetings/london'], ['Withdrawal timeline', '/withdrawal-timeline'], ['About', '/about'], ['Editorial policy', '/editorial-policy'], ['Privacy', '/privacy-policy']].map(([l, h]) => (
              <Link key={h} href={h} style={{ fontSize: 12, color: 'var(--text-light)', textDecoration: 'none' }}>{l}</Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}

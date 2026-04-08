import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { daysSoberMetadata, faqSchema, breadcrumbSchema, getMilestoneLabel, getSoberPhase } from '../../../lib/seo'
import HelplinesSidebar from '../../../components/HelplinesSidebar'
import FaqBlock from '../../../components/FaqBlock'
import Breadcrumb from '../../../components/Breadcrumb'

export const dynamicParams = true
export const revalidate = 604800 // ISR 7 days

const MAX_DAYS = 7300

export async function generateStaticParams() {
  // Pre-build key milestones only — all other days generate via ISR
  return [1,2,3,4,5,6,7,10,14,21,28,30,45,60,75,90,100,120,150,180,200,250,300,365,400,500,600,730,1000,1095,1460,1825,2555,3650,7300].map(n => ({ n: String(n) }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ n: string }> }
): Promise<Metadata> {
  const { n } = await params
  const days = parseInt(n, 10)
  if (isNaN(days) || days < 1 || days > MAX_DAYS) return {}
  return daysSoberMetadata(days, 'clean')
}

const MILESTONES: Record<number, { heading: string; special: string }> = {
  1: { heading: 'Your first 24 hours clean', special: 'The first 24 hours drug-free are often the hardest. Every hour that passes matters — you are already healing.' },
  3: { heading: '72 hours clean from drugs', special: 'Three days clean. For many substances, withdrawal peaks around 72 hours. The physical intensity often begins to ease from here.' },
  7: { heading: 'One week clean', special: 'One week drug-free. Your brain is slowly beginning to recalibrate its reward system. Physical withdrawal is easing for most substances.' },
  14: { heading: 'Two weeks clean', special: 'Two weeks clean. Many people notice that sleep is improving and appetite returning. The acute phase of withdrawal is passing.' },
  21: { heading: 'Three weeks clean', special: 'Three weeks drug-free. Your brain chemistry is actively rebuilding. Cravings may still visit but are becoming less overwhelming.' },
  30: { heading: 'One month clean', special: 'One month clean is a landmark. Your body has had 30 days to begin healing and your daily life is adapting to a drug-free existence.' },
  60: { heading: 'Two months clean', special: 'Two months drug-free. The neural pathways associated with drug-seeking behaviour are weakening as new healthy habits take hold.' },
  90: { heading: 'Three months — 90 days clean', special: '90 days clean is one of the most celebrated milestones in drug recovery. Many treatment programmes use 90 days as the initial goal — you\'ve reached it.' },
  100: { heading: '100 days clean', special: '100 days without drugs. A triple-digit milestone that proves your capacity for real change.' },
  180: { heading: 'Six months clean', special: 'Six months clean means your brain has had half a year to rebalance. The worst of PAWS is typically behind you at this point.' },
  365: { heading: 'One year clean', special: 'One year clean from drugs. This is one of the most significant milestones in recovery — twelve months of choosing your health and your life every single day.' },
  500: { heading: '500 days clean', special: '500 days clean. Most people at this point describe recovery as simply their way of life, not a daily battle.' },
  730: { heading: 'Two years clean', special: 'Two years drug-free. Research consistently shows relapse risk drops substantially after two years. You are firmly in long-term recovery.' },
  1000: { heading: '1,000 days clean', special: 'Nearly three years drug-free. 1,000 days is a powerful milestone that represents a complete transformation of daily life.' },
  1095: { heading: 'Three years clean', special: 'Three full years without drugs. Your recovery is deeply woven into who you are — and your story can now change other lives.' },
  1825: { heading: 'Five years clean', special: 'Five years drug-free. You have rebuilt your life from the ground up. Your resilience and strength are extraordinary.' },
  3650: { heading: 'Ten years clean', special: 'Ten years clean. A decade of clarity, health, and authentic connection — and living proof that recovery is possible for anyone.' },
  7300: { heading: 'Twenty years clean', special: 'Twenty years without drugs. Two decades of choosing life, every single day. An extraordinary achievement and an inspiration to all.' },
}

function getPhysicalChanges(days: number): string[] {
  if (days <= 3) return [
    'Withdrawal symptoms depend on the substance — seek medical advice',
    'Body beginning to clear the drug from its system',
    'Hormones and neurotransmitters starting to normalise',
    'Hydration and nutrition are important right now',
  ]
  if (days <= 7) return [
    'Acute withdrawal symptoms easing for most substances',
    'Sleep disrupted but beginning to improve',
    'Appetite slowly returning',
    'Liver and other organs beginning to recover',
  ]
  if (days <= 30) return [
    'Physical dependency reducing',
    'Brain dopamine levels beginning to normalise',
    'Energy levels stabilising as the body regulates',
    'Sleep quality measurably improving',
    'Immune system beginning to strengthen',
  ]
  if (days <= 90) return [
    'PAWS (Post-Acute Withdrawal Syndrome) may still cause fatigue and mood swings — this is normal',
    'Brain rewiring is actively occurring',
    'Sleep largely restored for most people',
    'Weight and appetite stabilised',
    'Physical health markers improving significantly',
  ]
  if (days <= 365) return [
    'Brain structure continues to recover — neuroplasticity is working for you',
    'Cardiovascular health improving',
    'Nutritional deficiencies being addressed',
    'Skin and physical appearance substantially healthier',
    'Energy and fitness improving month by month',
  ]
  return [
    'Long-term brain health substantially restored',
    'Immune system functioning optimally',
    'Life expectancy significantly extended',
    'Physical health transformed compared to using years',
    'Cognitive function largely or fully recovered',
  ]
}

function getMentalChanges(days: number): string[] {
  if (days <= 7) return [
    'Cravings can be intense — they will pass, typically in minutes',
    'Anxiety and low mood are common early withdrawal symptoms',
    'Emotional sensitivity is heightened right now',
    'Reaching out for support is essential at this stage',
  ]
  if (days <= 30) return [
    'Pink cloud effect common — a feeling of unexpected wellbeing',
    'Brain beginning to find pleasure in non-drug activities again',
    'Memory and concentration starting to improve',
    'Building a new daily routine is crucial at this stage',
  ]
  if (days <= 90) return [
    'Emotional regulation improving week by week',
    'Cravings becoming less frequent and less overwhelming',
    'Self-efficacy — belief in your ability to stay clean — growing',
    'Cognitive function noticeably sharper',
  ]
  if (days <= 365) return [
    'Identity shifting — clean and sober becoming who you are',
    'Motivation and goal-setting returning',
    'Relationships healing as trust is rebuilt',
    'Psychological cravings rare and manageable',
  ]
  return [
    'Sobriety is your natural state — not an effort',
    'Emotional intelligence and self-awareness dramatically higher',
    'Purpose, meaning, and connection are central to your life',
    'Your experience is now a tool to help others find recovery',
  ]
}

function buildFaqs(days: number, weeks: number, months: number, years: number) {
  const phase = getSoberPhase(days)
  return [
    {
      question: `What happens to your body at ${days} days clean?`,
      answer: `At ${days} days clean, you are in the ${phase.phase.toLowerCase()} phase of recovery. ${phase.description} Your brain is actively rewiring, dopamine pathways are normalising, and the physical symptoms of drug use are receding. Each day clean adds to this healing process.`,
    },
    {
      question: `Is ${days} days clean a big deal?`,
      answer: `Every single day clean matters. At ${days} days, you have demonstrated real commitment to your recovery and your life. ${days >= 30 ? 'A month or more of being clean represents a profound shift in your daily habits and brain chemistry.' : 'Even in these first days, your body and brain are already in recovery mode.'} You should be genuinely proud.`,
    },
    {
      question: `How do I deal with cravings at ${days} days clean?`,
      answer: `At ${days} days clean, ${days <= 30 ? 'cravings can be intense, especially triggered by people, places, and feelings associated with using. Try the HALT technique (Hungry, Angry, Lonely, Tired) and call NA on 0300 999 1212 or Frank on 0300 123 6600 for immediate support.' : days <= 365 ? 'cravings are becoming less frequent but can appear unexpectedly during stress or emotional triggers. Having a plan in place — a person to call, a meeting to attend — is essential.' : 'cravings are typically rare and manageable. NAA meetings and regular connection with your recovery community keep them in check.'}`,
    },
    {
      question: `How long does it take to feel normal after quitting drugs?`,
      answer: `The timeline depends on the substance. For most drugs, acute physical withdrawal passes within 1–2 weeks. Post-acute withdrawal syndrome (PAWS) — mood fluctuations, sleep issues, low energy — can last 6–18 months. ${days >= 180 ? `At ${days} days clean, you are past the worst of PAWS for most substances.` : `At ${days} days, you are in the early or middle stages of this — it will continue to improve.`}`,
    },
    {
      question: `Should I be going to NA meetings at ${days} days clean?`,
      answer: `Many people find NA meetings invaluable at every stage of recovery. In early recovery, NA offers daily structure, accountability, and connection with people who have been where you are. Many people attend daily in the first 90 days. Find meetings at ukna.org or call 0300 999 1212.`,
    },
    {
      question: `What if I use again after ${days} days clean?`,
      answer: `A relapse does not undo your ${days} days. It is not a failure — it is information. The most important thing after a relapse is to reach out for help immediately, not to wait until the using escalates. Call Frank (0300 123 6600), your keyworker, NA, or a trusted person in your support network.`,
    },
    {
      question: `How do I calculate exactly how many days clean I am?`,
      answer: `Use our free sobriety calculator at sobernation.co.uk/sobriety-counter. Enter the date you last used and it calculates your exact days, weeks, months, and hours clean. You can also generate and share a milestone badge.`,
    },
  ]
}

function getNextMilestone(days: number): { days: number; label: string } {
  const milestones = [1, 3, 7, 14, 21, 30, 60, 90, 100, 180, 365, 500, 730, 1000, 1095, 1825, 3650, 7300]
  const next = milestones.find(m => m > days)
  if (!next) return { days: days + 1, label: `${days + 1} days` }
  const named: Record<number, string> = { 7: '1 week', 14: '2 weeks', 21: '3 weeks', 30: '1 month', 60: '2 months', 90: '3 months', 100: '100 days', 180: '6 months', 365: '1 year', 500: '500 days', 730: '2 years', 1000: '1,000 days', 1095: '3 years', 1825: '5 years', 3650: '10 years', 7300: '20 years' }
  return { days: next, label: named[next] ?? `${next} days` }
}

export default async function DaysCleanPage(
  { params }: { params: Promise<{ n: string }> }
) {
  const { n } = await params
  const days = parseInt(n, 10)
  if (isNaN(days) || days < 1 || days > MAX_DAYS) notFound()

  const { weeks, months, years, label: milestoneLabel } = getMilestoneLabel(days)
  const phase = getSoberPhase(days)
  const milestone = MILESTONES[days]
  const physicalChanges = getPhysicalChanges(days)
  const mentalChanges = getMentalChanges(days)
  const faqs = buildFaqs(days, weeks, months, years)
  const nextMilestone = getNextMilestone(days)

  const title = milestone ? milestone.heading : `${days} Days Clean`
  const displayTime = milestoneLabel ?? (weeks >= 1 ? `${weeks} week${weeks === 1 ? '' : 's'}` : `${days} days`)

  const snippet = milestone
    ? milestone.special
    : `At ${days} days clean (${displayTime} drug-free), you are in the ${phase.phase.toLowerCase()} stage of drug recovery. ${phase.description} Keep going — every day clean is a victory and your brain is healing.`

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Days Clean', href: '/days-clean/1' },
    { name: `${days} Days`, href: `/days-clean/${days}` },
  ]

  const schemas = [
    faqSchema(faqs),
    breadcrumbSchema(breadcrumbs),
    {
      '@context': 'https://schema.org',
      '@type': 'MedicalWebPage',
      name: `${days} Days Clean`,
      description: snippet,
      url: `https://www.sobernation.co.uk/days-clean/${days}`,
      about: { '@type': 'MedicalCondition', name: 'Substance use disorder' },
    },
  ]

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      <div className="container-wide"><Breadcrumb items={breadcrumbs} /></div>

      <section style={{ background: 'var(--white)', borderBottom: '1px solid var(--border)', padding: '48px 20px 40px' }}>
        <div className="container-wide">
          <div style={{ maxWidth: 680 }}>
            <div className="label" style={{ marginBottom: 12 }}>Drug Recovery · Clean Time Milestone</div>
            <h1 style={{ fontSize: 'clamp(22px,4vw,36px)', fontWeight: 700, color: 'var(--text)', marginBottom: 16, lineHeight: 1.2, letterSpacing: '-0.02em' }}>
              {title}
            </h1>
            <p style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 20, maxWidth: 620 }}>
              {snippet}
            </p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 14px', background: 'var(--accent-pale)', border: '1px solid #c8e6df', borderRadius: 20, marginBottom: 20 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)' }}>{phase.phase}</span>
              <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>of drug recovery</span>
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
              {days > 1 && (
                <Link href={`/days-clean/${days - 1}`} style={{ fontSize: 12, padding: '6px 12px', border: '1px solid var(--border)', borderRadius: 20, color: 'var(--text-muted)', textDecoration: 'none', background: 'var(--white)' }}>
                  ← {days - 1} days
                </Link>
              )}
              <Link href="/sobriety-counter" style={{ fontSize: 12, padding: '6px 14px', border: '1px solid var(--accent)', borderRadius: 20, color: 'var(--accent)', textDecoration: 'none', background: 'var(--accent-pale)', fontWeight: 600 }}>
                🗓 Calculate your clean time
              </Link>
              {days < MAX_DAYS && (
                <Link href={`/days-clean/${days + 1}`} style={{ fontSize: 12, padding: '6px 12px', border: '1px solid var(--border)', borderRadius: 20, color: 'var(--text-muted)', textDecoration: 'none', background: 'var(--white)' }}>
                  {days + 1} days →
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="container-wide" style={{ padding: '48px 20px' }}>
        <div className="page-grid">
          <div>
            <div style={{ marginBottom: 36 }}>
              <h2 style={{ fontSize: 17, fontWeight: 700, color: 'var(--text)', marginBottom: 12 }}>
                What happens to your body at {days} days clean?
              </h2>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingLeft: 0, listStyle: 'none' }}>
                {physicalChanges.map((c, i) => (
                  <li key={i} style={{ display: 'flex', gap: 10, fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6 }}>
                    <span style={{ color: 'var(--accent)', fontWeight: 700, flexShrink: 0 }}>✓</span> {c}
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ marginBottom: 36 }}>
              <h2 style={{ fontSize: 17, fontWeight: 700, color: 'var(--text)', marginBottom: 12 }}>
                Mental and emotional changes at {days} days clean
              </h2>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingLeft: 0, listStyle: 'none' }}>
                {mentalChanges.map((c, i) => (
                  <li key={i} style={{ display: 'flex', gap: 10, fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6 }}>
                    <span style={{ color: '#6366f1', fontWeight: 700, flexShrink: 0 }}>✓</span> {c}
                  </li>
                ))}
              </ul>
            </div>

            {nextMilestone.days <= MAX_DAYS && (
              <div style={{ marginBottom: 36, padding: 20, background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Your next milestone</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>{nextMilestone.label} — {nextMilestone.days} days clean</div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 14 }}>{nextMilestone.days - days} more day{nextMilestone.days - days === 1 ? '' : 's'} to go.</div>
                <Link href={`/days-clean/${nextMilestone.days}`} style={{ fontSize: 13, padding: '8px 16px', background: 'var(--accent)', color: '#fff', borderRadius: 'var(--radius-sm)', textDecoration: 'none', fontWeight: 600 }}>
                  Read: {nextMilestone.label} clean →
                </Link>
              </div>
            )}

            <div style={{ marginBottom: 36, padding: 16, background: 'var(--bg-subtle)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>Quitting alcohol, not drugs?</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Read our guide to {days} days sober</div>
              </div>
              <Link href={`/days-sober/${days}`} style={{ fontSize: 13, padding: '8px 14px', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', color: 'var(--text)', textDecoration: 'none', background: 'var(--white)', fontWeight: 600 }}>
                {days} days sober →
              </Link>
            </div>

            <div style={{ marginBottom: 36, padding: 20, background: 'var(--accent)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 6 }}>Not sure how many days clean you are?</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', marginBottom: 14 }}>Enter your clean date and get your exact count — plus a shareable milestone badge.</div>
              <Link href="/sobriety-counter" style={{ display: 'inline-block', padding: '10px 18px', background: '#fff', color: 'var(--accent)', borderRadius: 'var(--radius-sm)', fontWeight: 700, fontSize: 14, textDecoration: 'none' }}>
                Use sobriety calculator →
              </Link>
            </div>

            <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)', marginBottom: 16 }}>
              Frequently asked questions about {days} days clean
            </h2>
            <FaqBlock faqs={faqs} />
          </div>
          <HelplinesSidebar />
        </div>
      </div>

      <footer style={{ borderTop: '1px solid var(--border)', padding: '28px 20px', background: 'var(--white)', marginTop: 48 }}>
        <div className="container-wide" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ fontSize: 12, color: 'var(--text-light)' }}>© {new Date().getFullYear()} SoberNation</div>
          <div style={{ display: 'flex', gap: 20 }}>
            {[['NA Meetings', '/na-meetings'], ['Drug Treatment', '/drug-treatment'], ['Sobriety Calculator', '/sobriety-counter']].map(([label, href]) => (
              <Link key={href} href={href} style={{ fontSize: 12, color: 'var(--text-light)', textDecoration: 'none' }}>{label}</Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}

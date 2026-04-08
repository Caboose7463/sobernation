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
  return daysSoberMetadata(days, 'sober')
}

// Named milestones for rich snippet targets
const MILESTONES: Record<number, { heading: string; special: string }> = {
  1: { heading: 'Your first 24 hours alcohol-free', special: 'The hardest step is the first one. Getting through day one is a genuine achievement.' },
  3: { heading: '72 hours alcohol-free', special: 'Withdrawal symptoms typically peak around 72 hours. If you\'ve made it to day 3, the worst is likely behind you.' },
  7: { heading: 'One week sober', special: 'One full week without alcohol. Your liver has already started to recover and your sleep quality is beginning to improve.' },
  14: { heading: 'Two weeks sober', special: 'Two weeks in — most acute withdrawal symptoms have passed and your energy levels are beginning to stabilise.' },
  21: { heading: 'Three weeks sober', special: 'Three weeks alcohol-free. Your brain chemistry is rebalancing and many people notice improved focus and mood at this point.' },
  30: { heading: 'One month sober', special: 'Completing your first month sober is a watershed moment. Your liver function has significantly improved and the cravings are becoming less frequent.' },
  60: { heading: 'Two months sober', special: 'Two months without alcohol. Your liver has substantially repaired, skin is clearer, and most people report much better sleep by this stage.' },
  90: { heading: 'Three months — 90 days sober', special: '90 days is one of the most celebrated milestones in recovery. Your brain\'s reward system is re-calibrating and life is beginning to feel normal without alcohol.' },
  100: { heading: '100 days sober', special: '100 days is a powerful psychological milestone. You\'ve proven to yourself that long-term sobriety is not just possible — it\'s your reality.' },
  180: { heading: 'Six months sober', special: 'Six months sober — half a year. You have built genuine new habits and your risk of relapse has dropped significantly.' },
  365: { heading: 'One year sober', special: 'One year sober is one of the most significant milestones in recovery. Your body has had 12 months to heal and your identity as a sober person is firmly established.' },
  500: { heading: '500 days sober', special: '500 days sober is a remarkable achievement. Most people at this point report that sobriety is no longer a struggle — it\'s simply life.' },
  730: { heading: 'Two years sober', special: 'Two years alcohol-free. Research shows relapse risk drops substantially after two years. You are in long-term recovery.' },
  1000: { heading: '1,000 days sober', special: 'Nearly 3 years without alcohol. 1,000 days is a monumental achievement that deserves recognition.' },
  1095: { heading: 'Three years sober', special: 'Three full years of sobriety. Your recovery is now deeply embedded in your identity and your physical health has transformed.' },
  1825: { heading: 'Five years sober', special: 'Five years sober — at this stage, sobriety is simply who you are. Your experience is now an asset that can help others.' },
  3650: { heading: 'Ten years sober', special: 'Ten years without alcohol. You have gifted yourself a decade of clarity, health, and authentic connection. A truly extraordinary achievement.' },
  7300: { heading: 'Twenty years sober', special: 'Twenty years of sobriety. You have spent two decades building a life unclouded by alcohol — an inspiration to everyone around you.' },
}

function getPhysicalChanges(days: number): string[] {
  if (days <= 3) return [
    'Blood pressure and heart rate begin to normalise',
    'Blood sugar stabilises as alcohol\'s effect on glucose fades',
    'Withdrawal symptoms may include sweating, shaking, anxiety, and nausea',
    'Hydration levels start to recover',
  ]
  if (days <= 7) return [
    'Acute withdrawal symptoms ease for most people',
    'Sleep improves slightly though still disrupted',
    'Liver starts metabolising fat normally again',
    'Appetite begins to return to normal',
  ]
  if (days <= 30) return [
    'Liver function measurably improves',
    'Skin begins to look healthier and clearer',
    'Weight may change as the body re-regulates',
    'Energy levels start to stabilise',
    'Blood pressure reduces noticeably in many people',
  ]
  if (days <= 90) return [
    'Significant liver recovery underway',
    'Sleep quality improves substantially',
    'Immune system functioning better',
    'Risk of alcohol-related cancer begins to decrease',
    'Blood pressure typically normal by this point',
  ]
  if (days <= 365) return [
    'Liver continues to regenerate (unless cirrhosis present)',
    'Brain volume and structure measurably recovering',
    'Heart attack risk decreasing month by month',
    'Nutritional deficiencies largely corrected with good diet',
    'Sexual function and libido improving for many people',
  ]
  return [
    'Long-term health trajectory fundamentally changed',
    'Cardiovascular risk dramatically reduced',
    'Cancer risk (mouth, throat, liver) significantly lower',
    'Cognitive function fully or substantially recovered',
    'Life expectancy meaningfully extended',
  ]
}

function getMentalChanges(days: number): string[] {
  if (days <= 7) return [
    'Anxiety and depression common — these will ease',
    'Brain chemistry slowly rebalancing',
    'Emotional sensitivity heightened',
    'Support from others is especially important right now',
  ]
  if (days <= 30) return [
    'Mood fluctuations are normal and expected',
    'Many people experience a \"pink cloud\" — unexpected optimism',
    'Sleep improving, which directly boosts mental health',
    'Memory and concentration starting to sharpen',
  ]
  if (days <= 90) return [
    'PAWS (Post-Acute Withdrawal Syndrome) may still cause low mood — this is normal',
    'Emotional regulation improving',
    'Cognitive function measurably improving',
    'Confidence in your ability to stay sober growing',
  ]
  if (days <= 365) return [
    'Psychological cravings becoming less frequent',
    'Emotional maturity and resilience increasing',
    'Relationships improving as trust rebuilds',
    'Sense of identity shifting — sobriety becoming part of who you are',
  ]
  return [
    'Sobriety is now your default — not an effort',
    'Emotional intelligence and self-awareness significantly higher',
    'Mental health outcomes dramatically better than drinking years',
    'Many people at this stage describe sobriety as a superpower',
  ]
}

function buildFaqs(days: number, weeks: number, months: number, years: number) {
  const phases = getSoberPhase(days)
  const soberly = days === 1 ? '1 day' : days < 7 ? `${days} days` : days < 30 ? `${weeks} week${weeks === 1 ? '' : 's'}` : days < 365 ? `${months} month${months === 1 ? '' : 's'}` : `${years} year${years === 1 ? '' : 's'}`

  return [
    {
      question: `What happens to your body at ${days} days sober?`,
      answer: `At ${days} days sober (${soberly} alcohol-free), you are in the ${phases.phase.toLowerCase()} phase of recovery. ${phases.description} Physically, your liver continues to repair, sleep quality improves, and blood pressure normalises. Mental clarity and emotional stability also continue to develop.`,
    },
    {
      question: `Is ${days} days sober a big deal?`,
      answer: `Yes — every single day sober is meaningful. At ${days} days, you have demonstrated real commitment to your recovery. ${days >= 30 ? `A month or more of sobriety represents a fundamental shift in your daily life and habits.` : `Even in these early days, your body and brain are already healing significantly.`} You should be genuinely proud of where you are.`,
    },
    {
      question: `What are common cravings like at ${days} days sober?`,
      answer: `At ${days} days sober, ${days <= 30 ? 'cravings can still be strong, particularly linked to triggers like stress, social situations, or times you typically drank. The HALT framework helps: check if you are Hungry, Angry, Lonely, or Tired.' : days <= 180 ? 'acute cravings are less frequent but can return unexpectedly, especially around stressful events or emotional triggers. Having a plan ready is important.' : 'most people find cravings significantly reduced. They may return during challenging life events but are generally manageable with the coping strategies you have developed.'} Call Frank (0300 123 6600) for support at any stage.`,
    },
    {
      question: `How long until I feel normal after quitting alcohol?`,
      answer: `Most people begin to feel physically normal within 2–4 weeks of stopping drinking. Mental and emotional recovery takes longer — typically 3–12 months for the brain chemistry to fully stabilise. ${days >= 90 ? `At ${days} days, you are well into that recovery window.` : `At ${days} days, you are in the early stages of this process — it will keep getting better.`}`,
    },
    {
      question: `Should I tell people I am ${days} days sober?`,
      answer: `That is entirely your choice. Many people in recovery find sharing their milestones helpful — it creates accountability, connects you with support, and can inspire others. Others prefer to keep their journey private. AA and NA meetings offer a safe, confidential space to share and celebrate milestones with people who understand recovery.`,
    },
    {
      question: `What if I relapse after ${days} days sober?`,
      answer: `A relapse does not erase your ${days} days. It is important to know that relapse is common in recovery — it is not a sign of failure or weakness. If you relapse, the most important thing is to seek support immediately. Call Frank on 0300 123 6600 or reach out to a keyworker, sponsor, or GP. Many people relapse several times before achieving long-term sobriety.`,
    },
    {
      question: `How do I calculate how long I have been sober?`,
      answer: `Use our free sobriety calculator at sobernation.co.uk/sobriety-counter — enter your sobriety date and it will calculate exactly how many days, weeks, months, and hours you have been sober. You can also share your result as a milestone badge.`,
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

export default async function DaysSoberPage(
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

  const title = milestone ? milestone.heading : `${days} Days Sober`
  const displayTime = milestoneLabel ?? (weeks >= 1 ? `${weeks} week${weeks === 1 ? '' : 's'}` : `${days} days`)

  const snippet = milestone
    ? milestone.special
    : `At ${days} days sober (${displayTime}), you are in the ${phase.phase.toLowerCase()} stage of alcohol recovery. ${phase.description} Your body and brain continue to heal — keep going.`

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Days Sober', href: '/days-sober/1' },
    { name: `${days} Days`, href: `/days-sober/${days}` },
  ]

  const schemas = [
    faqSchema(faqs),
    breadcrumbSchema(breadcrumbs),
    {
      '@context': 'https://schema.org',
      '@type': 'MedicalWebPage',
      name: `${days} Days Sober`,
      description: snippet,
      url: `https://www.sobernation.co.uk/days-sober/${days}`,
      about: { '@type': 'MedicalCondition', name: 'Alcohol use disorder' },
    },
  ]

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      <div className="container-wide">
        <Breadcrumb items={breadcrumbs} />
      </div>

      {/* Hero */}
      <section style={{ background: 'var(--white)', borderBottom: '1px solid var(--border)', padding: '48px 20px 40px' }}>
        <div className="container-wide">
          <div style={{ maxWidth: 680 }}>
            <div className="label" style={{ marginBottom: 12 }}>Alcohol Recovery · Sobriety Milestone</div>
            <h1 style={{ fontSize: 'clamp(22px,4vw,36px)', fontWeight: 700, color: 'var(--text)', marginBottom: 16, lineHeight: 1.2, letterSpacing: '-0.02em' }}>
              {title}
            </h1>

            {/* THE FEATURED SNIPPET TARGET */}
            <p style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 20, maxWidth: 620 }}>
              {snippet}
            </p>

            {/* Phase badge */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 14px', background: 'var(--accent-pale)', border: '1px solid #c8e6df', borderRadius: 20, marginBottom: 20 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)' }}>{phase.phase}</span>
              <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>of recovery</span>
            </div>

            {/* Milestone navigation */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
              {days > 1 && (
                <Link href={`/days-sober/${days - 1}`} style={{ fontSize: 12, padding: '6px 12px', border: '1px solid var(--border)', borderRadius: 20, color: 'var(--text-muted)', textDecoration: 'none', background: 'var(--white)' }}>
                  ← {days - 1} days
                </Link>
              )}
              <Link href="/sobriety-counter" style={{ fontSize: 12, padding: '6px 14px', border: '1px solid var(--accent)', borderRadius: 20, color: 'var(--accent)', textDecoration: 'none', background: 'var(--accent-pale)', fontWeight: 600 }}>
                🗓 Calculate your sobriety date
              </Link>
              {days < MAX_DAYS && (
                <Link href={`/days-sober/${days + 1}`} style={{ fontSize: 12, padding: '6px 12px', border: '1px solid var(--border)', borderRadius: 20, color: 'var(--text-muted)', textDecoration: 'none', background: 'var(--white)' }}>
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

            {/* Physical changes */}
            <div style={{ marginBottom: 36 }}>
              <h2 style={{ fontSize: 17, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>
                What happens to your body at {days} days sober?
              </h2>
              <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 14 }}>
                {phase.description} Here is what is happening physically at this stage:
              </p>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingLeft: 0, listStyle: 'none' }}>
                {physicalChanges.map((c, i) => (
                  <li key={i} style={{ display: 'flex', gap: 10, fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6 }}>
                    <span style={{ color: 'var(--accent)', fontWeight: 700, flexShrink: 0 }}>✓</span>
                    {c}
                  </li>
                ))}
              </ul>
            </div>

            {/* Mental changes */}
            <div style={{ marginBottom: 36 }}>
              <h2 style={{ fontSize: 17, fontWeight: 700, color: 'var(--text)', marginBottom: 14 }}>
                Mental and emotional changes at {days} days sober
              </h2>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingLeft: 0, listStyle: 'none' }}>
                {mentalChanges.map((c, i) => (
                  <li key={i} style={{ display: 'flex', gap: 10, fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6 }}>
                    <span style={{ color: '#6366f1', fontWeight: 700, flexShrink: 0 }}>✓</span>
                    {c}
                  </li>
                ))}
              </ul>
            </div>

            {/* Next milestone */}
            {nextMilestone.days <= MAX_DAYS && (
              <div style={{ marginBottom: 36, padding: 20, background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Your next milestone</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>
                  {nextMilestone.label} — {nextMilestone.days} days sober
                </div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 14 }}>
                  {nextMilestone.days - days} more day{nextMilestone.days - days === 1 ? '' : 's'} to reach this milestone.
                </div>
                <Link href={`/days-sober/${nextMilestone.days}`} style={{ fontSize: 13, padding: '8px 16px', background: 'var(--accent)', color: '#fff', borderRadius: 'var(--radius-sm)', textDecoration: 'none', fontWeight: 600 }}>
                  Read: {nextMilestone.label} sober →
                </Link>
              </div>
            )}

            {/* Also see: days clean + equivalent time formats */}
            <div style={{ marginBottom: 36, padding: 16, background: 'var(--bg-subtle)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Also see</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                <Link href={`/days-clean/${days}`} style={{ fontSize: 13, padding: '7px 14px', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', color: 'var(--text)', textDecoration: 'none', background: 'var(--white)', fontWeight: 600 }}>
                  {days} days clean from drugs
                </Link>
                {weeks >= 1 && (
                  <Link href={`/weeks-sober/${weeks}`} style={{ fontSize: 13, padding: '7px 14px', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', color: 'var(--text)', textDecoration: 'none', background: 'var(--white)', fontWeight: 600 }}>
                    {weeks} week{weeks === 1 ? '' : 's'} sober
                  </Link>
                )}
                {months >= 1 && (
                  <Link href={`/months-sober/${months}`} style={{ fontSize: 13, padding: '7px 14px', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', color: 'var(--text)', textDecoration: 'none', background: 'var(--white)', fontWeight: 600 }}>
                    {months} month{months === 1 ? '' : 's'} sober
                  </Link>
                )}
                {years >= 1 && (
                  <Link href={`/years-sober/${years}`} style={{ fontSize: 13, padding: '7px 14px', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', color: 'var(--text)', textDecoration: 'none', background: 'var(--white)', fontWeight: 600 }}>
                    {years} year{years === 1 ? '' : 's'} sober
                  </Link>
                )}
              </div>
            </div>

            {/* Calculator CTA */}
            <div style={{ marginBottom: 36, padding: 20, background: 'var(--accent)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 6 }}>Not sure how many days sober you are?</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', marginBottom: 14 }}>
                Enter your sobriety date in our free calculator and get your exact count — plus a shareable badge to celebrate your milestone.
              </div>
              <Link href="/sobriety-counter" style={{ display: 'inline-block', padding: '10px 18px', background: '#fff', color: 'var(--accent)', borderRadius: 'var(--radius-sm)', fontWeight: 700, fontSize: 14, textDecoration: 'none' }}>
                Use sobriety calculator →
              </Link>
            </div>

            {/* FAQ */}
            <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)', marginBottom: 16 }}>
              Frequently asked questions about {days} days sober
            </h2>
            <FaqBlock faqs={faqs} />

          </div>
          <HelplinesSidebar />
        </div>
      </div>

      {/* Global SiteFooter rendered by layout.tsx */}
    </div>
  )
}

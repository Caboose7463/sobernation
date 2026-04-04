import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { monthsSoberMetadata, faqSchema, breadcrumbSchema, getSoberPhase } from '../../../lib/seo'
import HelplinesSidebar from '../../../components/HelplinesSidebar'
import FaqBlock from '../../../components/FaqBlock'
import Breadcrumb from '../../../components/Breadcrumb'

export const dynamicParams = false

export async function generateStaticParams() {
  return Array.from({ length: 120 }, (_, i) => ({ n: String(i + 1) }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ n: string }> }
): Promise<Metadata> {
  const { n } = await params
  const months = parseInt(n, 10)
  if (isNaN(months) || months < 1 || months > 120) return {}
  return monthsSoberMetadata(months)
}

// Monthly milestone content
const MONTH_CONTENT: Partial<Record<number, { physical: string; mental: string }>> = {
  1: { physical: 'Liver enzymes measurably improved. Blood pressure reducing. Skin noticeably healthier. Better hydration.', mental: 'Past the acute phase. Mood fluctuations common but easing. Sleep improving significantly.' },
  2: { physical: 'Liver function substantially improved. Weight stabilising. Cardiovascular health improving.', mental: 'Cravings less intense. Energy returning. Many people report a "pink cloud" of unexpected wellbeing.' },
  3: { physical: 'Liver inflammation substantially reduced. Blood pressure typically normal. Immune system stronger.', mental: '90 days — brain chemistry significantly rebalanced. Emotional regulation improving week by week.' },
  6: { physical: 'Significant liver regeneration. Blood pressure normal. Cancer risk beginning to decrease.', mental: 'PAWS largely resolved for most people. Identity shifting. Sobriety feeling natural rather than effortful.' },
  12: { physical: 'One year of healing. Liver has recovered substantially (unless cirrhosis). Heart attack risk dropping.', mental: 'Sobriety is who you are. Psychological cravings rare. Relationships, finances, and self-esteem transformed.' },
  24: { physical: 'Cardiovascular system dramatically improved. Cancer risk significantly lower.', mental: 'Two years of long-term recovery. Relapse risk substantially reduced. Life rebuilt on a sober foundation.' },
}

function buildFaqs(months: number, days: number, years: number) {
  const phase = getSoberPhase(days)
  return [
    {
      question: `What happens to your body at ${months} month${months === 1 ? '' : 's'} sober?`,
      answer: `At ${months} month${months === 1 ? '' : 's'} sober (${days} days), you are in the ${phase.phase.toLowerCase()} phase. ${MONTH_CONTENT[months]?.physical ?? `Your liver continues to recover, blood pressure is normalising, and the cumulative health benefits of ${months} months without alcohol are compounding. Your cardiovascular risk is measurably lower.`}`,
    },
    {
      question: `How do you feel mentally after ${months} month${months === 1 ? '' : 's'} without alcohol?`,
      answer: `${MONTH_CONTENT[months]?.mental ?? `After ${months} months sober, brain chemistry is continuing to normalise. Emotional regulation is improving and cravings are becoming less frequent. ${months >= 6 ? 'Many people at this stage describe sobriety as feeling completely natural.' : 'Mood fluctuations are still possible — this is part of PAWS (post-acute withdrawal syndrome) which typically resolves within 6–12 months.'}`}`,
    },
    {
      question: `Is ${months} month${months === 1 ? '' : 's'} sober a big milestone?`,
      answer: `${months === 1 ? 'Your first month sober is one of the most significant milestones in recovery.' : months === 3 ? '3 months (90 days) is a landmark in recovery, widely celebrated in AA and other recovery programmes.' : months === 6 ? 'Six months sober is half a year — a major achievement that represents a fundamental lifestyle change.' : months === 12 ? 'One year sober is the most celebrated milestone in recovery. You\'ve proven to yourself that you can do this.' : `${months} months of sobriety represents sustained, committed recovery. Every month matters.`} Be proud of where you are.`,
    },
    {
      question: `Can I use the sobriety calculator to find my exact count?`,
      answer: `Yes — visit sobernation.co.uk/sobriety-counter, enter the date of your last drink, and you'll see your exact days, weeks, months, and hours sober. You can also share your milestone and link to your detailed day-by-day guide.`,
    },
    {
      question: `What support is available to help me stay sober?`,
      answer: `Free support: AA meetings (aa.org.uk or call 0800 9177 650), Frank helpline (0300 123 6600, 24/7), NHS drug and alcohol services (self-referral via Frank or GP), SMART Recovery meetings, and online recovery communities. Private counselling and rehab are also available.`,
    },
    {
      question: `Should I still be going to AA meetings at ${months} month${months === 1 ? '' : 's'} sober?`,
      answer: `Many people continue attending AA long after the acute recovery period — it provides community, accountability, and a framework for sustained sobriety. There is no required timeline. Some people attend for life; others reduce meetings as their recovery solidifies. The key is to maintain your support network.`,
    },
  ]
}

export default async function MonthsSoberPage(
  { params }: { params: Promise<{ n: string }> }
) {
  const { n } = await params
  const months = parseInt(n, 10)
  if (isNaN(months) || months < 1 || months > 120) notFound()

  const days = Math.round(months * 30.44)
  const weeks = Math.floor(days / 7)
  const years = Math.floor(months / 12)
  const phase = getSoberPhase(days)
  const faqs = buildFaqs(months, days, years)

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Months Sober', href: '/months-sober/1' },
    { name: `${months} Month${months === 1 ? '' : 's'}`, href: `/months-sober/${months}` },
  ]

  const namedMilestones: Record<number, string> = { 1: 'one month', 3: '3 months', 6: 'six months', 12: 'one year', 18: 'eighteen months', 24: 'two years', 36: 'three years', 60: 'five years', 120: 'ten years' }
  const namedLabel = namedMilestones[months]

  const snippet = months === 1
    ? `One month sober is a landmark milestone. After 30 days without alcohol your liver function has measurably improved, blood pressure is dropping, skin is healthier, and your brain chemistry has begun to rebalance. The hardest part — the first few weeks — is behind you.`
    : months === 3
    ? `Three months sober (90 days) is one of the most celebrated milestones in alcohol recovery. At this point, acute withdrawal is long past, your liver has significantly recovered, and brain chemistry is noticeably more balanced. Cravings are becoming less frequent.`
    : months === 6
    ? `Six months sober — half a year. Your body has had 180 days to heal from alcohol. Liver inflammation is substantially reduced, blood pressure is normal, and many people at six months describe sobriety as starting to feel natural rather than effortful.`
    : months === 12
    ? `One year sober is the most significant milestone in alcohol recovery. After 365 days without alcohol, your liver has had a full year to recover, your cardiovascular risk is markedly lower, and your identity as a sober person is firmly established.`
    : `At ${months} month${months === 1 ? '' : 's'} sober${namedLabel ? ` (${namedLabel})` : ''} — approximately ${days} days — you are in the ${phase.phase.toLowerCase()} stage of recovery. ${month_physical_snippet(months)}`

  const schemas = [faqSchema(faqs), breadcrumbSchema(breadcrumbs)]

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
      <nav style={{ borderBottom: '1px solid var(--border)', background: 'var(--white)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div className="container-wide" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 56 }}>
          <Link href="/" style={{ fontWeight: 700, fontSize: 15, color: 'var(--text)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 26, height: 26, borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13 }}>S</span>
            SoberNation
          </Link>
          <a href="/sobriety-counter" style={{ fontSize: 13, background: 'var(--accent)', color: '#fff', padding: '7px 14px', borderRadius: 'var(--radius-sm)', fontWeight: 600, textDecoration: 'none' }}>Calculate sobriety</a>
        </div>
      </nav>
      <div className="container-wide"><Breadcrumb items={breadcrumbs} /></div>

      <section style={{ background: 'var(--white)', borderBottom: '1px solid var(--border)', padding: '48px 20px 40px' }}>
        <div className="container-wide"><div style={{ maxWidth: 680 }}>
          <div className="label" style={{ marginBottom: 12 }}>Sobriety Milestone · Alcohol Recovery</div>
          <h1 style={{ fontSize: 'clamp(22px,4vw,36px)', fontWeight: 700, color: 'var(--text)', marginBottom: 16, lineHeight: 1.2, letterSpacing: '-0.02em' }}>
            {months} Month{months === 1 ? '' : 's'} Sober
          </h1>
          <p style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 20, maxWidth: 620 }}>{snippet}</p>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 14px', background: 'var(--accent-pale)', border: '1px solid #c8e6df', borderRadius: 20, marginBottom: 20 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)' }}>{phase.phase}</span>
            <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>· {days} days · {weeks} weeks</span>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {months > 1 && <Link href={`/months-sober/${months - 1}`} style={{ fontSize: 12, padding: '6px 12px', border: '1px solid var(--border)', borderRadius: 20, color: 'var(--text-muted)', textDecoration: 'none', background: 'var(--white)' }}>← {months - 1} month{months - 1 === 1 ? '' : 's'}</Link>}
            <Link href={`/days-sober/${days}`} style={{ fontSize: 12, padding: '6px 14px', border: '1px solid var(--border)', borderRadius: 20, color: 'var(--text-muted)', textDecoration: 'none', background: 'var(--white)' }}>View as {days} days</Link>
            {months < 120 && <Link href={`/months-sober/${months + 1}`} style={{ fontSize: 12, padding: '6px 12px', border: '1px solid var(--border)', borderRadius: 20, color: 'var(--text-muted)', textDecoration: 'none', background: 'var(--white)' }}>{months + 1} months →</Link>}
          </div>
        </div></div>
      </section>

      <div className="container-wide" style={{ padding: '48px 20px' }}>
        <div className="page-grid">
          <div>
            <div style={{ marginBottom: 32, padding: 20, background: 'var(--accent)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 6 }}>Know your exact count?</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', marginBottom: 14 }}>Use our sobriety calculator to get your precise number of days, weeks, and hours sober.</div>
              <Link href="/sobriety-counter" style={{ display: 'inline-block', padding: '10px 18px', background: '#fff', color: 'var(--accent)', borderRadius: 'var(--radius-sm)', fontWeight: 700, fontSize: 14, textDecoration: 'none' }}>Sobriety calculator →</Link>
            </div>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)', marginBottom: 16 }}>Frequently asked questions about {months} month{months === 1 ? '' : 's'} sober</h2>
            <FaqBlock faqs={faqs} schema={faqSchema(faqs)} />
            <div style={{ marginTop: 24, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {[
                { label: `${days} days sober`, href: `/days-sober/${days}` },
                { label: `${weeks} weeks sober`, href: `/weeks-sober/${weeks}` },
                years > 0 ? { label: `${years} year${years > 1 ? 's' : ''} sober`, href: `/years-sober/${years}` } : null,
                { label: 'Sobriety calculator', href: '/sobriety-counter' },
              ].filter(Boolean).map((l: {label: string; href: string} | null) => l && (
                <Link key={l.href} href={l.href} style={{ fontSize: 13, padding: '7px 14px', borderRadius: 20, border: '1px solid var(--border)', color: 'var(--text-muted)', textDecoration: 'none', background: 'var(--white)' }}>{l.label}</Link>
              ))}
            </div>
          </div>
          <HelplinesSidebar />
        </div>
      </div>
      <footer style={{ borderTop: '1px solid var(--border)', padding: '28px 20px', background: 'var(--white)', marginTop: 48 }}>
        <div className="container-wide" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ fontSize: 12, color: 'var(--text-light)' }}>© {new Date().getFullYear()} SoberNation</div>
          <div style={{ display: 'flex', gap: 20 }}>
            {[['Sobriety calculator', '/sobriety-counter'], ['Get help', '/help/london'], ['AA meetings', '/aa-meetings/london']].map(([label, href]) => (
              <Link key={href} href={href} style={{ fontSize: 12, color: 'var(--text-light)', textDecoration: 'none' }}>{label}</Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}

function month_physical_snippet(months: number): string {
  if (months <= 3) return 'Your liver is recovering significantly, sleep quality has improved, and the physical benefits of sobriety are compounding.'
  if (months <= 6) return 'Liver function is largely restored, blood pressure is normal, and your immune system is substantially stronger.'
  if (months <= 12) return 'Your cardiovascular health has improved significantly and your risk of alcohol-related illness is measurably lower.'
  return 'Long-term sobriety has fundamentally changed your health trajectory — your body and brain continue to benefit from every additional day alcohol-free.'
}

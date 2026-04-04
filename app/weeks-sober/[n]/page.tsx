import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { weeksSoberMetadata, faqSchema, breadcrumbSchema, getSoberPhase } from '../../../lib/seo'
import HelplinesSidebar from '../../../components/HelplinesSidebar'
import FaqBlock from '../../../components/FaqBlock'
import Breadcrumb from '../../../components/Breadcrumb'

export const dynamicParams = true
export const revalidate = 604800 // ISR 7 days

export async function generateStaticParams() {
  // Pre-build key milestones only — all other weeks generate via ISR
  return [1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 16, 20, 26, 52, 78, 104, 156, 208, 260, 520].map(n => ({ n: String(n) }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ n: string }> }
): Promise<Metadata> {
  const { n } = await params
  const weeks = parseInt(n, 10)
  if (isNaN(weeks) || weeks < 1 || weeks > 520) return {}
  return weeksSoberMetadata(weeks)
}

function buildFaqs(weeks: number, days: number) {
  const phase = getSoberPhase(days)
  return [
    {
      question: `What happens at ${weeks} week${weeks === 1 ? '' : 's'} sober?`,
      answer: `At ${weeks} week${weeks === 1 ? '' : 's'} sober (${days} days), you are in the ${phase.phase.toLowerCase()} stage of recovery. ${phase.description} Your body is continuing to heal — liver function is improving, sleep quality is getting better, and your brain chemistry is re-balancing.`,
    },
    {
      question: `Is ${weeks} week${weeks === 1 ? '' : 's'} sober an achievement?`,
      answer: `Yes — absolutely. ${weeks === 1 ? 'Your first week sober is one of the hardest milestones in recovery.' : weeks <= 4 ? `${weeks} weeks without alcohol is a significant achievement. Your body has already begun to heal in measurable ways.` : weeks <= 12 ? `${weeks} weeks of sobriety represents over two months of sustained commitment.` : `At ${weeks} weeks, sobriety is becoming a fundamental part of your new life.`} Every week counts.`,
    },
    {
      question: `How do I stay sober after ${weeks} weeks?`,
      answer: `Staying sober at ${weeks} weeks means having solid routines in place. Consider AA or SMART Recovery meetings, regular check-ins with a counsellor or keyworker, and staying connected with other people in recovery. Avoid complacency — cravings can return unexpectedly even at this stage.`,
    },
    {
      question: `What are the health benefits of ${weeks} weeks without alcohol?`,
      answer: `${weeks <= 4 ? 'After 1–4 weeks alcohol-free, your liver has measurably improved, blood pressure is reducing, sleep quality is better, and skin is beginning to look healthier.' : weeks <= 12 ? 'At 1–3 months alcohol-free, liver function has significantly improved, your immune system is stronger, and brain chemistry is noticeably more balanced.' : 'At this point, your cardiovascular risk is substantially reduced, cancer risk is decreasing, cognitive function has improved, and the long-term trajectory of your health has fundamentally changed.'}`,
    },
    {
      question: `Can I drink again after ${weeks} weeks sober?`,
      answer: `That depends on your relationship with alcohol. For people with alcohol use disorder or dependency, returning to drinking almost always leads back to problematic use — the underlying pattern does not disappear with time. If you are unsure, speak to your GP or a counsellor rather than testing this alone.`,
    },
    {
      question: `Where can I get support during my sobriety?`,
      answer: `Free support is available 24/7: call Frank on 0300 123 6600, attend AA meetings (aa.org.uk), or contact your local NHS drug and alcohol service. Many people also find online recovery communities and sober apps helpful for tracking progress and connecting with others.`,
    },
  ]
}

export default async function WeeksSoberPage(
  { params }: { params: Promise<{ n: string }> }
) {
  const { n } = await params
  const weeks = parseInt(n, 10)
  if (isNaN(weeks) || weeks < 1 || weeks > 520) notFound()

  const days = weeks * 7
  const months = Math.floor(days / 30.44)
  const years = Math.floor(days / 365.25)
  const phase = getSoberPhase(days)
  const faqs = buildFaqs(weeks, days)

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Weeks Sober', href: '/weeks-sober/1' },
    { name: `${weeks} Week${weeks === 1 ? '' : 's'}`, href: `/weeks-sober/${weeks}` },
  ]

  const snippet = weeks === 1
    ? `One week sober is a landmark achievement. In your first 7 days without alcohol, your liver begins to repair, your blood pressure drops, and your sleep quality starts to improve noticeably. Your brain chemistry is beginning to rebalance.`
    : weeks <= 4
    ? `At ${weeks} weeks sober (${days} days), you are in the early recovery phase. Your body is actively healing — liver enzymes are improving, sleep is better, and mood is beginning to stabilise. Keep going.`
    : weeks <= 13
    ? `At ${weeks} weeks sober (${days} days, about ${months} months), your recovery is progressing well. Cravings are becoming less frequent, your brain chemistry is rebalancing, and the physical benefits of not drinking are compounding.`
    : `At ${weeks} weeks sober (${years > 0 ? `${years} year${years > 1 ? 's' : ''}` : `${months} months`}, ${days} days), sobriety is a well-established part of your life. Your long-term health trajectory has fundamentally changed.`

  const schemas = [faqSchema(faqs), breadcrumbSchema(breadcrumbs)]

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
      <nav style={{ borderBottom: '1px solid var(--border)', background: 'var(--white)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div className="container-wide" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 56 }}>
          <Link href="/" style={{ fontWeight: 700, fontSize: 15, color: 'var(--text)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 26, height: 26, borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 700 }}>S</span>
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
            {weeks} Week{weeks === 1 ? '' : 's'} Sober
          </h1>
          <p style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 20, maxWidth: 620 }}>{snippet}</p>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 14px', background: 'var(--accent-pale)', border: '1px solid #c8e6df', borderRadius: 20, marginBottom: 20 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)' }}>{phase.phase}</span>
            <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>of recovery · {days} days</span>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {weeks > 1 && <Link href={`/weeks-sober/${weeks - 1}`} style={{ fontSize: 12, padding: '6px 12px', border: '1px solid var(--border)', borderRadius: 20, color: 'var(--text-muted)', textDecoration: 'none', background: 'var(--white)' }}>← {weeks - 1} week{weeks - 1 === 1 ? '' : 's'}</Link>}
            <Link href={`/days-sober/${days}`} style={{ fontSize: 12, padding: '6px 14px', border: '1px solid var(--border)', borderRadius: 20, color: 'var(--text-muted)', textDecoration: 'none', background: 'var(--white)' }}>View as {days} days</Link>
            {weeks < 520 && <Link href={`/weeks-sober/${weeks + 1}`} style={{ fontSize: 12, padding: '6px 12px', border: '1px solid var(--border)', borderRadius: 20, color: 'var(--text-muted)', textDecoration: 'none', background: 'var(--white)' }}>{weeks + 1} weeks →</Link>}
          </div>
        </div></div>
      </section>

      <div className="container-wide" style={{ padding: '48px 20px' }}>
        <div className="page-grid">
          <div>
            <div style={{ marginBottom: 32, padding: 20, background: 'var(--accent)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 6 }}>Not sure exactly how many days sober you are?</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', marginBottom: 14 }}>Use our free sobriety calculator — enter your date and see your exact count.</div>
              <Link href="/sobriety-counter" style={{ display: 'inline-block', padding: '10px 18px', background: '#fff', color: 'var(--accent)', borderRadius: 'var(--radius-sm)', fontWeight: 700, fontSize: 14, textDecoration: 'none' }}>Sobriety calculator →</Link>
            </div>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)', marginBottom: 16 }}>
              Frequently asked questions about {weeks} week{weeks === 1 ? '' : 's'} sober
            </h2>
            <FaqBlock faqs={faqs} schema={faqSchema(faqs)} />
            <div style={{ marginTop: 24, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {[
                { label: `${days} days sober`, href: `/days-sober/${days}` },
                months > 0 ? { label: `${months} month${months > 1 ? 's' : ''} sober`, href: `/months-sober/${months}` } : null,
                { label: 'Find help near me', href: '/help/london' },
                { label: 'AA meetings', href: '/aa-meetings/london' },
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
            {[['Sobriety calculator', '/sobriety-counter'], ['Get help', '/help/london'], ['About', '/about']].map(([label, href]) => (
              <Link key={href} href={href} style={{ fontSize: 12, color: 'var(--text-light)', textDecoration: 'none' }}>{label}</Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}

import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { yearsSoberMetadata, faqSchema, breadcrumbSchema } from '../../../lib/seo'
import HelplinesSidebar from '../../../components/HelplinesSidebar'
import FaqBlock from '../../../components/FaqBlock'
import Breadcrumb from '../../../components/Breadcrumb'

export const dynamicParams = true
export const revalidate = 604800 // ISR 7 days

export async function generateStaticParams() {
  // Pre-build key milestones only — all other years generate via ISR
  return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 25, 30, 40, 50].map(n => ({ n: String(n) }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ n: string }> }
): Promise<Metadata> {
  const { n } = await params
  const years = parseInt(n, 10)
  if (isNaN(years) || years < 1 || years > 20) return {}
  return yearsSoberMetadata(years)
}

const YEAR_CONTENT: Record<number, { snippet: string; physical: string; mental: string }> = {
  1: {
    snippet: 'One year sober is the most celebrated milestone in alcohol recovery. After 365 days without alcohol, your liver has had a full year to recover, your cardiovascular risk is significantly lower, and your identity as a sober person is firmly and authentically established.',
    physical: 'Your liver has undergone significant regeneration. Blood pressure has been normal for months. Cancer risk is measurably lower. Heart attack risk is decreasing. If you smoked, your lungs are also recovering.',
    mental: 'Your brain has had a year to rebalance its chemistry. Emotional regulation is strong. Psychological cravings are rare. The work of early recovery is behind you — sobriety is now who you are.',
  },
  2: {
    snippet: 'Two years sober is a powerful milestone. Research consistently shows relapse risk drops substantially after two years of sustained sobriety. You have built a life in recovery — and you know who you are without alcohol.',
    physical: 'Cardiovascular health has dramatically improved over two years. Liver recovery is substantial. Cancer risk is significantly reduced. If you were taking medication for alcohol-related conditions, many people are able to reduce or stop under medical supervision.',
    mental: 'Two years of emotional sobriety. Relationships have rebuilt. Trust has been restored — with yourself and with others. Your sober identity is now deeply established.',
  },
  3: {
    snippet: 'Three years sober. You have spent 1,095 days — over a thousand mornings — choosing your health, your clarity, and your life. The transformation from active addiction to three years of sustained recovery is profound.',
    physical: 'Three years of physical healing. Long-term health trajectory is fundamentally changed. Many of the physical harms of alcohol use have been substantially reversed.',
    mental: 'Three years of emotional development. You have navigated difficult times without alcohol. You have proved your resilience to yourself and to everyone who knows you.',
  },
  5: {
    snippet: 'Five years sober is an extraordinary achievement. At five years, sobriety is not something you are doing — it is simply who you are. You have rebuilt your life, your relationships, and your identity from the ground up.',
    physical: 'Five years of sustained recovery has fundamentally transformed your health. Cardiovascular and cancer risk are dramatically lower. Your life expectancy is meaningfully longer.',
    mental: 'Five years of emotional sobriety. You have the tools, the experience, and the wisdom to support others in their recovery. Your story is a gift.',
  },
  10: {
    snippet: 'Ten years sober. A full decade without alcohol. You have gifted yourself — and everyone who loves you — ten years of clarity, health, presence, and authentic connection. You are living proof that recovery is possible.',
    physical: 'Ten years of physical recovery. The harms of alcohol use are largely in the past. You are healthier, fitter, and more vital than you would have been.',
    mental: 'A decade of emotional and psychological growth. You have become someone unrecognisable to your former self — and that is a reason to celebrate every single day.',
  },
  20: {
    snippet: 'Twenty years sober. Two decades of choosing life, clarity, health, and connection — every single day. You are an extraordinary example of what is possible in recovery. Your story has the power to change lives.',
    physical: 'Twenty years of physical healing and sustained health. The alcohol years are a distant chapter.',
    mental: 'Twenty years of emotional sobriety, wisdom, and growth. You have earned every year.',
  },
}

function getContent(years: number) {
  if (YEAR_CONTENT[years]) return YEAR_CONTENT[years]
  // Generate for unlisted years
  const snippet = years <= 5
    ? `${years} year${years > 1 ? 's' : ''} sober — ${years * 365} days without alcohol. You have built a life in recovery that grows stronger and more embedded with every year. Your health, relationships, and sense of self have transformed beyond what you could have imagined in early recovery.`
    : `${years} years sober is a remarkable achievement. Over ${years * 365} days of sustained recovery — your body, mind, and life have been fundamentally transformed by your commitment to sobriety.`
  return {
    snippet,
    physical: `${years} years of physical recovery. Your cardiovascular health, liver function, and cancer risk have all been profoundly improved by ${years} years without alcohol.`,
    mental: `${years} years of emotional sobriety. Your resilience, self-knowledge, and ability to navigate life without alcohol are extraordinary assets.`,
  }
}

function buildFaqs(years: number, days: number, months: number) {
  return [
    {
      question: `What does ${years} year${years === 1 ? '' : 's'} sober feel like?`,
      answer: `${years === 1 ? 'Most people at one year describe sobriety as finally feeling natural — no longer a daily effort but simply their way of life.' : `At ${years} years, sobriety is deeply embedded in your identity. Most people at this stage describe drinking as simply unthinkable — not because of willpower, but because their values and life have been completely rebuilt around sobriety.`}`,
    },
    {
      question: `What are the health benefits of ${years} year${years === 1 ? '' : 's'} without alcohol?`,
      answer: `After ${years} year${years === 1 ? '' : 's'} sober: liver function has substantially recovered, blood pressure has been in the healthy range for years, cancer risk (liver, bowel, breast, mouth) is meaningfully lower, cardiovascular risk is significantly reduced, and brain function has recovered substantially. Each additional year extends these benefits further.`,
    },
    {
      question: `Is it still important to attend AA after ${years} year${years === 1 ? '' : 's'}?`,
      answer: `Many people in long-term recovery continue to attend AA, NA, or SMART Recovery indefinitely — not because they have to, but because the community, accountability, and sense of purpose are genuinely enriching. Others reduce meetings as their recovery solidifies. There is no wrong answer. Maintaining your support network in some form remains important.`,
    },
    {
      question: `Can a relapse happen after ${years} year${years === 1 ? '' : 's'} sober?`,
      answer: `Yes — relapse can occur at any stage of recovery, including after many years of sobriety. Major life stressors (bereavement, health crisis, relationship breakdown) are common triggers. Staying connected with your recovery community, being honest with trusted people about how you are feeling, and keeping your support network active are the best protections.`,
    },
    {
      question: `How do I celebrate ${years} year${years === 1 ? '' : 's'} sober?`,
      answer: `AA and NA anniversary meetings are a wonderful way to mark the occasion — sharing your story at a meeting and receiving a chip or medallion is a powerful moment. Beyond that: tell the people who matter to you, treat yourself to something meaningful, and consider sharing your story — your experience may change someone else's life.`,
    },
    {
      question: `How can sharing my recovery story help others?`,
      answer: `Sharing your story — at AA or NA meetings, online, or with people struggling in your life — is one of the most powerful tools in recovery. Research shows that peer support and lived experience are among the most effective motivators for people seeking help. At ${years} year${years === 1 ? '' : 's'} sober, your story is a powerful gift.`,
    },
  ]
}

export default async function YearsSoberPage(
  { params }: { params: Promise<{ n: string }> }
) {
  const { n } = await params
  const years = parseInt(n, 10)
  if (isNaN(years) || years < 1 || years > 20) notFound()

  const days = Math.round(years * 365.25)
  const months = Math.round(years * 12)
  const content = getContent(years)
  const faqs = buildFaqs(years, days, months)

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Years Sober', href: '/years-sober/1' },
    { name: `${years} Year${years === 1 ? '' : 's'}`, href: `/years-sober/${years}` },
  ]

  const schemas = [faqSchema(faqs), breadcrumbSchema(breadcrumbs)]

  const milestoneEmojis: Record<number, string> = { 1: '🏆', 2: '⭐', 3: '🌟', 5: '💫', 10: '👑', 20: '🌠' }
  const emoji = milestoneEmojis[years] ?? '🎖️'

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

      {/* Hero — premium treatment for year milestones */}
      <section style={{ background: 'linear-gradient(135deg, #0d4a36 0%, var(--accent) 100%)', padding: '56px 20px 48px' }}>
        <div className="container-wide"><div style={{ maxWidth: 680 }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>{emoji}</div>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 12 }}>Sobriety Milestone</div>
          <h1 style={{ fontSize: 'clamp(26px,5vw,48px)', fontWeight: 800, color: '#fff', marginBottom: 16, lineHeight: 1.1, letterSpacing: '-0.03em' }}>
            {years} Year{years === 1 ? '' : 's'} Sober
          </h1>
          <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.88)', lineHeight: 1.75, marginBottom: 20, maxWidth: 580 }}>{content.snippet}</p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <Link href="/sobriety-counter" style={{ padding: '12px 20px', background: '#fff', color: 'var(--accent)', borderRadius: 'var(--radius-md)', fontWeight: 700, fontSize: 14, textDecoration: 'none' }}>🗓 Calculate your exact count</Link>
            {years > 1 && <Link href={`/years-sober/${years - 1}`} style={{ padding: '12px 20px', background: 'rgba(255,255,255,0.15)', color: '#fff', borderRadius: 'var(--radius-md)', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>← {years - 1} year{years - 1 === 1 ? '' : 's'}</Link>}
          </div>
        </div></div>
      </section>

      <div className="container-wide" style={{ padding: '48px 20px' }}>
        <div className="page-grid">
          <div>
            {/* Physical & mental */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
              {[
                { label: 'Physical recovery', text: content.physical, icon: '💪', color: '#16a34a' },
                { label: 'Mental & emotional', text: content.mental, icon: '🧠', color: '#6366f1' },
              ].map((card, i) => (
                <div key={i} style={{ padding: 20, background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ fontSize: 20, marginBottom: 8 }}>{card.icon}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: card.color, marginBottom: 8 }}>{card.label}</div>
                  <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.7, margin: 0 }}>{card.text}</p>
                </div>
              ))}
            </div>

            {/* Conversion links */}
            <div style={{ marginBottom: 32, padding: 18, background: 'var(--bg-subtle)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
              <span style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 500 }}>Also: </span>
              {[
                { label: `${days.toLocaleString()} days sober`, href: `/days-sober/${Math.min(days, 7300)}` },
                { label: `${Math.floor(days / 7)} weeks sober`, href: `/weeks-sober/${Math.min(Math.floor(days / 7), 520)}` },
                { label: `${months} months sober`, href: `/months-sober/${Math.min(months, 120)}` },
              ].map(l => (
                <Link key={l.href} href={l.href} style={{ fontSize: 13, padding: '6px 12px', borderRadius: 20, border: '1px solid var(--border)', color: 'var(--text-muted)', textDecoration: 'none', background: 'var(--white)' }}>{l.label}</Link>
              ))}
            </div>

            <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)', marginBottom: 16 }}>
              Frequently asked questions about {years} year{years === 1 ? '' : 's'} sober
            </h2>
            <FaqBlock faqs={faqs} schema={faqSchema(faqs)} />
          </div>
          <HelplinesSidebar />
        </div>
      </div>
      <footer style={{ borderTop: '1px solid var(--border)', padding: '28px 20px', background: 'var(--white)', marginTop: 48 }}>
        <div className="container-wide" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ fontSize: 12, color: 'var(--text-light)' }}>© {new Date().getFullYear()} SoberNation</div>
          <div style={{ display: 'flex', gap: 20 }}>
            {[['Sobriety calculator', '/sobriety-counter'], ['Find help', '/help/london'], ['Withdrawal timeline', '/withdrawal-timeline']].map(([label, href]) => (
              <Link key={href} href={href} style={{ fontSize: 12, color: 'var(--text-light)', textDecoration: 'none' }}>{label}</Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}

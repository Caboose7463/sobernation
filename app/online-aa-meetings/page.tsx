import type { Metadata } from 'next'
import Link from 'next/link'
import { faqSchema, breadcrumbSchema } from '../../lib/seo'
import MedicalReview from '../../components/MedicalReview'
import AuthorBio from '../../components/AuthorBio'
import NewsletterSignup from '../../components/NewsletterSignup'

export const metadata: Metadata = {
  title: 'Online AA Meetings in the UK: How to Join | SoberNation',
  description: 'Find online AA meetings in the UK — how to join Zoom meetings, what to expect, schedules, and why virtual AA works for many people in recovery.',
}

const faqs = [
  { question: 'Are online AA meetings as effective as in-person?', answer: 'Research found that online AA meetings produce comparable outcomes to in-person meetings for many participants, particularly in early recovery. Online meetings reduce barriers such as transport, social anxiety, and caring responsibilities. For people in remote areas, they can actually be more effective.' },
  { question: 'Do I have to turn my camera on?', answer: 'No. Many people attend with camera off, especially when new. You are also welcome to simply listen. You are never obligated to speak.' },
  { question: 'Is online AA free?', answer: 'Yes — all AA meetings are free. There is no membership fee. Some meetings pass a virtual donation link to cover Zoom costs, but this is entirely voluntary.' },
  { question: 'Can I attend AA anonymously?', answer: 'Yes. You can join using only your first name. AA\'s Eleventh Tradition protects anonymity. What is shared in a meeting stays in the meeting.' },
]

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'AA Meetings', href: '/aa-meetings/london' },
  { label: 'Online AA Meetings', href: '/online-aa-meetings' },
]

export default function OnlineAAMeetingsPage() {
  const schemas = [faqSchema(faqs), breadcrumbSchema(breadcrumbs)]
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {schemas.map((s, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />)}
      <style>{`
        .og-body { max-width: 820px; margin: 0 auto; padding: 48px 20px 80px; }
        .og-body h2 { font-size: 22px; font-weight: 700; color: var(--text); margin: 40px 0 14px; padding-top: 16px; border-top: 1px solid var(--border); }
        .og-body p { font-size: 16px; color: var(--text-muted); line-height: 1.85; margin: 0 0 20px; }
        .og-body ul, .og-body ol { margin: 0 0 20px; padding-left: 24px; }
        .og-body li { font-size: 15px; color: var(--text-muted); line-height: 1.75; margin-bottom: 8px; }
        .og-body strong { color: var(--text); }
        @media (max-width: 640px) { .og-body { padding: 32px 16px 60px; } }
      `}</style>

      <section style={{ background: 'var(--white)', borderBottom: '1px solid var(--border)', padding: '48px 20px 40px' }}>
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          <div className="label" style={{ marginBottom: 12 }}>Recovery Support · UK Guide</div>
          <h1 style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 800, color: 'var(--text)', marginBottom: 16, lineHeight: 1.15, letterSpacing: '-0.02em' }}>
            Online AA Meetings in the UK
          </h1>
          <p style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.8, maxWidth: 620, marginBottom: 20 }}>
            How to join Zoom AA meetings in the UK, what to expect, finding a meeting that works for you, and why virtual AA has become a permanent part of the recovery community.
          </p>
          <MedicalReview reviewer="Emily Clarke" date="2025-04-01" />
        </div>
      </section>

      <div className="og-body">
        <div style={{ marginBottom: 32 }}><AuthorBio author="Emily Clarke" date="2025-04-01" compact /></div>

        <h2>How to Join an Online AA Meeting</h2>
        <p>Most UK online AA meetings use <strong>Zoom</strong>. Visit <a href="https://alcoholics-anonymous.org.uk/aa-meetings/find-a-meeting" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}>AA Great Britain&apos;s meeting finder</a> and filter by &ldquo;Online&rdquo; to find video meetings. Note the Zoom Meeting ID and Password, download Zoom (free), and join a few minutes before the start time.</p>
        <p>You can join with your camera off and simply listen — you do not need to speak. New attendees are always welcome.</p>

        <h2>What Happens in a Meeting</h2>
        <ul>
          <li><strong>Opening:</strong> The chairperson reads the AA Preamble and Serenity Prayer.</li>
          <li><strong>Reading:</strong> A passage from AA literature (Big Book, Daily Reflections).</li>
          <li><strong>Sharing:</strong> Attendees speak for 3–5 minutes each if they wish.</li>
          <li><strong>Close:</strong> A closing prayer or &ldquo;Keep coming back.&rdquo;</li>
        </ul>
        <p>Most meetings last 60 minutes. Types include: open meetings (anyone welcome), closed meetings (for those who identify as alcoholic), speaker meetings, step studies, and topic meetings.</p>

        <h2>Types of Online Meetings</h2>
        <ul>
          <li><strong>Open meetings</strong> — family and friends welcome</li>
          <li><strong>Closed meetings</strong> — for those who identify as alcoholic</li>
          <li><strong>Women/men only</strong> — single-gender spaces</li>
          <li><strong>LGBTQ+ meetings</strong> — inclusive recovery spaces</li>
          <li><strong>Young people&apos;s meetings</strong> — aimed at under-30s</li>
          <li><strong>Telephone bridge meetings</strong> — no video required</li>
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

        <div style={{ marginTop: 32, padding: 20, background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
          <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>Other support options</div>
          {[['AA meetings near you', '/aa-meetings/london'], ['NA meetings', '/na-meetings/london'], ['Al-Anon (families)', '/al-anon/london'], ['SMART Recovery', '/smart-recovery/london']].map(([l, h]) => (
            <Link key={h} href={h} style={{ display: 'block', fontSize: 13, color: 'var(--accent)', textDecoration: 'none', padding: '5px 0', borderBottom: '1px solid var(--border)' }}>{l} →</Link>
          ))}
        </div>

        <div style={{ marginTop: 32 }}><NewsletterSignup variant="inline" source="online-aa" /></div>
        <div style={{ marginTop: 24 }}><AuthorBio author="Emily Clarke" date="2025-04-01" /></div>
      </div>
    </div>
  )
}

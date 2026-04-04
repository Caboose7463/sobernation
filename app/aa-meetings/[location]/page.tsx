import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getLocationSlugs, getLocation } from '../../../lib/locations'
import { locationMetadata, faqSchema, breadcrumbSchema, medicalWebPageSchema } from '../../../lib/seo'
import LocationHero from '../../../components/LocationHero'
import HelplinesSidebar from '../../../components/HelplinesSidebar'
import FaqBlock from '../../../components/FaqBlock'
import Breadcrumb from '../../../components/Breadcrumb'

export const dynamicParams = false

export async function generateStaticParams() {
  return getLocationSlugs().map(location => ({ location }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ location: string }> }
): Promise<Metadata> {
  const { location } = await params
  const loc = getLocation(location)
  if (!loc) return {}
  return locationMetadata('aa-meetings', loc.name)
}

const MEETING_TYPES = [
  { type: 'Open meetings', desc: 'Anyone can attend — you do not need to identify as an alcoholic. Good for people who are unsure or exploring AA.' },
  { type: 'Closed meetings', desc: 'For people who identify as alcoholics or believe they have a problem with alcohol. More personal and confidential.' },
  { type: 'Speaker meetings', desc: 'A member shares their story of addiction and recovery. Inspiring and accessible, especially for newcomers.' },
  { type: 'Step meetings', desc: 'Work through the 12 Steps of AA together. Usually closed meetings for members actively working a recovery programme.' },
  { type: 'Big Book meetings', desc: 'Discussion based on Alcoholics Anonymous (the \"Big Book\"). Great for understanding AA philosophy and recovery principles.' },
  { type: 'Online meetings', desc: 'AA meetings available via Zoom and phone. Accessible 24/7 from anywhere in the UK.' },
]

function buildFaqs(name: string) {
  return [
    {
      question: `How do I find an AA meeting in ${name}?`,
      answer: `You can find AA meetings in ${name} at aa.org.uk or by calling the AA national helpline on 0800 9177 650 (free, 24/7). Meetings are listed by day, time, location and type. You can also search on the AA app or ask at a local GP surgery or drug and alcohol service.`,
    },
    {
      question: `What happens at my first AA meeting in ${name}?`,
      answer: `At your first AA meeting in ${name}, you simply attend and listen — there is no pressure to share or speak. Most meetings start with a reading and then open for shares. You can introduce yourself as a newcomer if you choose. Members will give you a warm welcome and may offer contact numbers for support.`,
    },
    {
      question: `Do I have to be alcoholic to attend AA meetings?`,
      answer: `Open AA meetings are open to anyone with a desire to stop drinking or who is concerned about their drinking — you do not need to identify as an alcoholic. Closed meetings are for people who identify as alcoholics. If you are unsure, start with an open meeting.`,
    },
    {
      question: `Is AA free?`,
      answer: `Yes. AA meetings are completely free to attend. There is usually a voluntary collection passed around — typically 50p–£1 — but this is optional and never obligatory. AA is self-supporting and accepts no outside funding.`,
    },
    {
      question: `How often should I attend AA meetings?`,
      answer: `AA often recommends "90 meetings in 90 days" for people new to recovery. Once established, many people attend 1–3 meetings per week. Some people attend daily during difficult periods. There is no set requirement — attend as often as feels helpful for your recovery.`,
    },
    {
      question: `What is the difference between AA and NA?`,
      answer: `AA (Alcoholics Anonymous) specifically focuses on alcohol addiction. NA (Narcotics Anonymous) covers all drug addictions and is open to anyone struggling with any substance. Both use the 12-step programme and many people attend both groups, particularly those with both alcohol and drug issues.`,
    },
    {
      question: `Is AA confidential?`,
      answer: `Yes. AA operates on a principle of anonymity — "what is shared here, stays here." Members do not share each other's names or stories outside the meeting. This confidentiality is central to how AA works and is taken very seriously by members.`,
    },
    {
      question: `Are there online AA meetings I can attend from ${name}?`,
      answer: `Yes. AA Intergroup UK offers online meetings via Zoom available 24/7 from anywhere including ${name}. Visit aa.org.uk/online-meetings or the Intergroup website to find UK-based online meetings at all hours of the day and night.`,
    },
  ]
}

export default async function AAMeetingsPage(
  { params }: { params: Promise<{ location: string }> }
) {
  const { location } = await params
  const loc = getLocation(location)
  if (!loc) notFound()

  const faqs = buildFaqs(loc.name)
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'AA Meetings', href: '/aa-meetings' },
    { name: loc.name, href: `/aa-meetings/${location}` },
  ]

  const snippet = `AA (Alcoholics Anonymous) meetings in ${loc.name} are free, confidential, and open to anyone with a desire to stop drinking. Find open and closed meetings, speaker nights, and step meetings in ${loc.name} at aa.org.uk or call the AA helpline free on 0800 9177 650.`

  const schemas = [
    faqSchema(faqs),
    breadcrumbSchema(breadcrumbs),
    medicalWebPageSchema({
      name: `AA Meetings in ${loc.name}`,
      description: `Find Alcoholics Anonymous meetings in ${loc.name}. Free alcohol recovery support groups, open and closed meetings.`,
      url: `https://www.sobernation.co.uk/aa-meetings/${location}`,
    }),
  ]

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
          <a href="tel:08009177650" style={{ fontSize: 13, background: 'var(--accent)', color: '#fff', padding: '7px 14px', borderRadius: 'var(--radius-sm)', fontWeight: 600, textDecoration: 'none' }}>
            AA helpline: 0800 9177 650
          </a>
        </div>
      </nav>

      <div className="container-wide"><Breadcrumb items={breadcrumbs} /></div>

      <LocationHero
        title={`AA Meetings in ${loc.name}`}
        subtitle={`${loc.country} · Alcoholics Anonymous`}
        snippet={snippet}
        locationName={loc.name}
        locationSlug={location}
        pageType="aa-meetings"
        hasCqcData={false}
        centreCount={0}
      />

      <div className="container-wide" style={{ padding: '48px 20px' }}>
        <div className="page-grid">
          <div>

            {/* Meeting finder CTA */}
            <div style={{ marginBottom: 32, padding: 24, background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
              <h2 style={{ fontSize: 17, fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>
                How to find AA meetings in {loc.name}
              </h2>
              <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 16 }}>
                The official AA UK meeting finder lists all meetings in {loc.name} with times, venues, and meeting types. You can also search by day of the week or find online meetings available 24/7.
              </p>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <a href="https://www.aa.org.uk/find-a-meeting/" target="_blank" rel="noopener noreferrer" style={{ padding: '10px 18px', background: 'var(--accent)', color: '#fff', borderRadius: 'var(--radius-sm)', fontSize: 14, fontWeight: 700, textDecoration: 'none' }}>
                  Find AA meetings near {loc.name} ↗
                </a>
                <a href="tel:08009177650" style={{ padding: '10px 18px', background: 'var(--white)', border: '1px solid var(--border)', color: 'var(--text)', borderRadius: 'var(--radius-sm)', fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>
                  Call AA: 0800 9177 650 (free)
                </a>
              </div>
            </div>

            {/* Meeting types */}
            <div style={{ marginBottom: 40 }}>
              <h2 style={{ fontSize: 17, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>
                Types of AA meetings in {loc.name}
              </h2>
              <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 16, lineHeight: 1.7 }}>
                AA meetings come in several formats. As a newcomer, an open or speaker meeting is the best place to start.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {MEETING_TYPES.map((mt, i) => (
                  <div key={i} style={{ padding: '14px 0', borderBottom: i < MEETING_TYPES.length - 1 ? '1px solid var(--border)' : 'none' }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: 4 }}>{mt.type}</div>
                    <div style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6 }}>{mt.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* What to expect */}
            <div style={{ marginBottom: 40, padding: 24, background: 'var(--accent-pale)', border: '1px solid #c8e6df', borderRadius: 'var(--radius-md)' }}>
              <h2 style={{ fontSize: 15, fontWeight: 700, color: 'var(--accent)', marginBottom: 10 }}>Going to your first meeting in {loc.name}?</h2>
              <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7 }}>
                You don't need to prepare anything. Just turn up — arrive a couple of minutes early and introduce yourself to anyone near the door. You don't have to share. Just listen. Many people find their first meeting is a turning point.
              </p>
            </div>

            {/* Related links */}
            <div style={{ marginBottom: 40 }}>
              <div className="section-label" style={{ marginBottom: 12 }}>Related resources in {loc.name}</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {[
                  { label: `NA Meetings in ${loc.name}`, href: `/na-meetings/${location}` },
                  { label: `Rehab in ${loc.name}`, href: `/rehab/${location}` },
                  { label: 'AA vs SMART Recovery', href: '/aa-vs-smart-recovery' },
                  { label: 'Alcohol addiction help', href: `/alcohol-addiction/${location}` },
                ].map(l => (
                  <Link key={l.href} href={l.href} style={{ fontSize: 13, padding: '7px 14px', borderRadius: 20, border: '1px solid var(--border)', color: 'var(--text-muted)', textDecoration: 'none', background: 'var(--white)' }}>
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>

            <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)', marginBottom: 16 }}>
              Frequently asked questions about AA in {loc.name}
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
            {[['Privacy', '/privacy'], ['Contact', '/contact'], ['About', '/about']].map(([label, href]) => (
              <Link key={href} href={href} style={{ fontSize: 12, color: 'var(--text-light)', textDecoration: 'none' }}>{label}</Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}

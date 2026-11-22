import type { Metadata } from 'next'
import type { CSSProperties } from 'react'
import Link from 'next/link'
import { SOURCES, HELPLINES, CONTACT_EMAIL, REVIEWED_ISO, REVIEWED_LABEL, REPORT_MISTAKE_HREF, SITE_URL } from '../../lib/trust'
import { CQC_DATA_DATE } from '../../lib/build-info'

export const metadata: Metadata = {
  title: 'Editorial Policy | How We Research, Check and Correct Our Pages',
  description: 'How the Sober Nation editorial team researches and reviews its addiction and recovery pages, checks meeting listings and helplines, handles corrections, and keeps advertising separate from editorial content.',
  alternates: { canonical: '/editorial-policy' },
}

const POLICY_UPDATED_ISO = REVIEWED_ISO
const POLICY_UPDATED_LABEL = REVIEWED_LABEL

const schema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Sober Nation editorial policy',
  url: `${SITE_URL}/editorial-policy`,
  description: 'How Sober Nation researches, checks, corrects and funds its addiction and recovery information.',
  dateModified: POLICY_UPDATED_ISO,
  lastReviewed: POLICY_UPDATED_ISO,
  publisher: { '@type': 'Organization', name: 'SoberNation', url: SITE_URL },
}

const OFFICIAL_SOURCES = [
  { name: 'NHS', url: SOURCES.nhsAddictionSupport.url },
  { name: 'NICE', url: SOURCES.niceCg115.url },
  { name: 'GOV.UK', url: SOURCES.govTreatmentGuidance.url },
  { name: 'Alcoholics Anonymous Great Britain', url: SOURCES.aaGetHelp.url },
  { name: 'Narcotics Anonymous UK', url: SOURCES.naHome.url },
  { name: 'Cocaine Anonymous UK', url: SOURCES.caHome.url },
  { name: 'Al-Anon Family Groups UK and Eire', url: SOURCES.alanonHelpline.url },
  { name: 'Drinkaware', url: SOURCES.drinkaware.url },
  { name: 'FRANK', url: SOURCES.frankContact.url },
  { name: 'Samaritans', url: SOURCES.samaritans.url },
]

const h2: CSSProperties = { fontSize: 20, fontWeight: 800, color: 'var(--text)', margin: '0 0 10px', letterSpacing: '-0.01em' }
const p: CSSProperties = { fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.8, margin: '0 0 12px' }
const li: CSSProperties = { fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 6 }
const section: CSSProperties = { marginBottom: 36, paddingBottom: 30, borderBottom: '1px solid var(--border)', scrollMarginTop: 80 }
const a: CSSProperties = { color: 'var(--accent)', fontWeight: 600 }

const CONTENTS = [
  ['who', 'Who writes and maintains the site'],
  ['research', 'How we research our pages'],
  ['meetings', 'How meeting listings are gathered and checked'],
  ['directory', 'Rehab centre and counsellor listings'],
  ['review', 'How often we review pages'],
  ['corrections', 'Corrections'],
  ['advice', 'Information, not medical advice'],
  ['crisis', 'What to do in a crisis'],
  ['money', 'Advertising, paid listings and independence'],
]

export default function EditorialPolicyPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <section style={{ background: 'linear-gradient(135deg, #0f1f1a 0%, #1a3d30 100%)', padding: '56px 16px 44px', color: '#fff' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <h1 style={{ fontSize: 'clamp(26px,4vw,40px)', fontWeight: 800, margin: '0 0 14px', letterSpacing: '-0.02em', lineHeight: 1.15 }}>
            Editorial policy
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.7, color: 'rgba(255,255,255,0.85)', margin: '0 0 16px', maxWidth: 620 }}>
            Who writes Sober Nation, where our information comes from, how we check it, how to tell us about a mistake, and how the site is paid for.
          </p>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)' }}>
            Last updated: <time dateTime={POLICY_UPDATED_ISO}>{POLICY_UPDATED_LABEL}</time>
          </div>
        </div>
      </section>

      <div style={{ maxWidth: 720, margin: '0 auto', padding: '40px 16px 56px' }}>

        <nav aria-label="On this page" style={{ marginBottom: 40, padding: '18px 20px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>On this page</div>
          <ol style={{ margin: 0, paddingLeft: 20 }}>
            {CONTENTS.map(([id, label]) => (
              <li key={id} style={{ fontSize: 14, lineHeight: 1.8 }}><a href={`#${id}`} style={{ color: 'var(--accent)' }}>{label}</a></li>
            ))}
          </ol>
        </nav>

        <section id="who" style={section}>
          <h2 style={h2}>Who writes and maintains the site</h2>
          <p style={p}>
            Sober Nation is written and maintained by the Sober Nation editorial team. We research and write plain English guides to addiction, treatment and recovery support in the UK, and we keep the site&apos;s meeting pages, listings and helpline details up to date.
          </p>
          <p style={p}>
            We are not doctors, nurses, pharmacists or counsellors, and our pages are not reviewed by a clinician. We do not publish author biographies or claim qualifications we do not have. Instead, every advice page lists the official sources it is based on, so you can check what we say against the original guidance.
          </p>
        </section>

        <section id="research" style={section}>
          <h2 style={h2}>How we research our pages</h2>
          <p style={p}>We go to official and established UK sources first, and we link to them:</p>
          <ul style={{ margin: '0 0 12px', paddingLeft: 20 }}>
            {OFFICIAL_SOURCES.map(s => (
              <li key={s.name} style={li}><a href={s.url} target="_blank" rel="noopener noreferrer" style={a}>{s.name}</a></li>
            ))}
          </ul>
          <p style={p}>
            For health information we use NHS pages and NICE guidance. For treatment services we use NHS and GOV.UK guidance and the Care Quality Commission register. For drugs we use FRANK, the national drugs advice service, and for alcohol the NHS and Drinkaware. For mutual aid meetings we use each fellowship&apos;s own website. We do not base health information on adverts, provider marketing or anecdotes.
          </p>
          <p style={p}>
            Each advice page ends with a <strong>Sources</strong> section listing the specific official pages that support it, and the date we last checked them. We only link to a source after opening it and confirming it covers the topic of the page.
          </p>
        </section>

        <section id="meetings" style={section}>
          <h2 style={h2}>How meeting listings are gathered and checked</h2>
          <p style={p}>
            Our AA, NA, Cocaine Anonymous and Al-Anon pages for each town do not host their own list of meetings. Meetings are run by local groups, and their times and venues are kept up to date by each fellowship. So instead of copying a list that could go out of date, each page:
          </p>
          <ul style={{ margin: '0 0 12px', paddingLeft: 20 }}>
            <li style={li}>links to the fellowship&apos;s official meeting finder, where you can search by town or postcode;</li>
            <li style={li}>gives the fellowship&apos;s helpline number and opening hours, as published on its own website;</li>
            <li style={li}>summarises what to expect at a first meeting, using the fellowship&apos;s own newcomer pages, and links to them;</li>
            <li style={li}>shows the date we last checked those details, and a link to report a mistake.</li>
          </ul>
          <p style={p}>
            When we check a meeting page we open the official meeting finder to confirm the link works, compare the helpline number and hours with the fellowship&apos;s website, and reread the newcomer information we summarise. The meeting pages were last checked on {REVIEWED_LABEL}. Always confirm a meeting on the official finder before you travel.
          </p>
        </section>

        <section id="directory" style={section}>
          <h2 style={h2}>Rehab centre and counsellor listings</h2>
          <p style={p}>
            Our rehab and treatment centre directory is built from the{' '}
            <a href={SOURCES.cqc.url} target="_blank" rel="noopener noreferrer" style={a}>Care Quality Commission</a> public register, published under the Open Government Licence. The register data on the site was last refreshed in {CQC_DATA_DATE}. Registration and inspection details can change, so check the provider&apos;s current entry on the CQC website before making a decision.
          </p>
          <p style={p}>
            A listing is not a recommendation. We do not inspect services, and we cannot tell you whether a particular service is right for you. Your GP or local drug and alcohol service can help you choose.
          </p>
        </section>

        <section id="review" style={section}>
          <h2 style={h2}>How often we review pages</h2>
          <p style={p}>
            We aim to review every advice and meeting page at least once a year, and sooner when NHS or NICE guidance changes, when a helpline changes its number or hours, or when someone reports a problem. Reviewed pages show a <strong>Last reviewed</strong> date. That date is the day the editorial team actually checked the page; it is never set automatically.
          </p>
          <p style={p}>
            On {REVIEWED_LABEL} we checked the sources listed on our advice pages; the meeting finder links, helpline numbers and newcomer information on our meeting pages; and every number in the helpline band at the bottom of each page, each against the service&apos;s own website.
          </p>
        </section>

        <section id="corrections" style={section}>
          <h2 style={h2}>Corrections</h2>
          <p style={p}>
            If you think something on Sober Nation is wrong or out of date, including a meeting link, a helpline number, a listing or a health claim, please tell us. Use the{' '}
            <Link href={REPORT_MISTAKE_HREF} style={a}>contact form</Link> and choose &quot;Correction request&quot;, or email{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} style={a}>{CONTACT_EMAIL}</a>. Please include the page address and what you think should change, with a link to an official source if you have one.
          </p>
          <p style={p}>
            We check every correction request against the official source. If we got something wrong we fix it and update the page&apos;s Last reviewed date. Meeting times and venues are managed by the fellowships themselves, so for a change to a specific meeting please also contact the fellowship directly.
          </p>
        </section>

        <section id="advice" style={section}>
          <h2 style={h2}>Information, not medical advice</h2>
          <p style={p}>
            Everything on Sober Nation is general information. It is not medical advice, diagnosis or treatment, and it cannot take account of your circumstances. Stopping some substances suddenly, including alcohol and some prescribed medicines, can be dangerous. Speak to your GP, a pharmacist or your local drug and alcohol service before making changes, and do not stop a prescribed medicine without talking to the person who prescribed it.
          </p>
        </section>

        <section id="crisis" style={section}>
          <h2 style={h2}>What to do in a crisis</h2>
          <p style={p}>Sober Nation is not a crisis service and we cannot respond to emergencies. If you or someone else needs help now:</p>
          <ul style={{ margin: '0 0 12px', paddingLeft: 20 }}>
            <li style={li}><strong>Call 999</strong> if someone is in immediate danger, has taken an overdose, is unconscious or cannot be woken, or has tried to end their life.</li>
            <li style={li}><strong>Call NHS 111</strong> for urgent medical help when it is not an emergency. It is open {HELPLINES.nhs111.hours}.</li>
            <li style={li}><strong>Call Samaritans on {HELPLINES.samaritans.number}</strong> to talk to someone. It is free from any phone and open {HELPLINES.samaritans.hours}.</li>
            <li style={li}><strong>Call FRANK on {HELPLINES.frank.number}</strong> for confidential advice about drugs, {HELPLINES.frank.hours}.</li>
            <li style={li}><strong>Call Drinkline on {HELPLINES.drinkline.number}</strong> for free advice about drinking ({HELPLINES.drinkline.hours.toLowerCase()}).</li>
          </ul>
          <p style={p}>
            The NHS page{' '}
            <a href={SOURCES.nhsUrgentMentalHealth.url} target="_blank" rel="noopener noreferrer" style={a}>where to get urgent help for mental health</a>{' '}
            lists more options, and FRANK explains{' '}
            <a href={SOURCES.frankEmergency.url} target="_blank" rel="noopener noreferrer" style={a}>what to do in a drug emergency</a>.
          </p>
        </section>

        <section id="money" style={{ marginBottom: 36, scrollMarginTop: 80 }}>
          <h2 style={h2}>Advertising, paid listings and independence</h2>
          <p style={p}>Sober Nation is free to use. It is paid for in the following ways, and we want you to know exactly what they are:</p>
          <ul style={{ margin: '0 0 12px', paddingLeft: 20 }}>
            <li style={li}><strong>Display advertising.</strong> Some pages show Google AdSense adverts, labelled &quot;Advertisement&quot;. Google chooses which adverts appear; we do not write them or endorse the products in them.</li>
            <li style={li}><strong>Sponsored listings.</strong> Treatment centres and counsellors can pay to appear in sponsored positions above the free listings for a location. Every paid placement is labelled &quot;Sponsored&quot;.</li>
            <li style={li}><strong>Verified listings.</strong> Providers can pay a monthly fee for a verified listing after uploading identity documents, and verified listings are shown above unverified ones. A verified badge means the provider has claimed the listing and pays for it. It is not a clinical check or a recommendation from us.</li>
            <li style={li}><strong>Enhanced profiles.</strong> Providers can pay to add extra details, such as photos, to their profile.</li>
            <li style={li}><strong>Matching network.</strong> Treatment providers can pay a flat monthly fee to join our matching network. If you use the Find my rehab form, your enquiry comes to us and may be matched to up to three network members in your area. We do not take commission on admissions.</li>
          </ul>
          <p style={p}>
            Paying us does not change what our guides say or which sources we cite. The helpline numbers in our guides and in the helpline band on every page are chosen by the editorial team and are not paid placements. We do not use affiliate links.
          </p>
        </section>

        <div style={{ padding: 22, background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)', margin: '0 0 8px' }}>Contact the editorial team</h2>
          <p style={{ ...p, fontSize: 14, margin: 0 }}>
            Email <a href={`mailto:${CONTACT_EMAIL}`} style={a}>{CONTACT_EMAIL}</a> or use our{' '}
            <Link href={REPORT_MISTAKE_HREF} style={a}>contact form</Link>. See also{' '}
            <Link href="/about" style={a}>about Sober Nation</Link> and our{' '}
            <Link href="/privacy-policy" style={a}>privacy policy</Link>.
          </p>
        </div>
      </div>
    </div>
  )
}

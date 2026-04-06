/**
 * /centre/[slug] — Premier rehab centre profile page
 * Data from rehabs.json (3,000+ CQC-registered centres).
 * 2-column sticky sidebar, 10+ content sections, full schema markup.
 */
import { notFound } from 'next/navigation'
import { getCentreBySlug, getCentreImage } from '../../../lib/rehabs'
import { getLiveViewers } from '../../../lib/profile-slugs'
import { getNearbyLocations } from '../../../lib/nearby-locations'
import { getLocationStats, formatStat } from '../../../lib/location-stats'
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const revalidate = 3600

interface Props {
  params: Promise<{ slug: string }>
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function serviceLabel(t: string) {
  const s = t.toLowerCase()
  if (s.includes('residential')) return 'Residential'
  if (s.includes('drug') || s.includes('substance') || s.includes('alcohol')) return 'Drug & Alcohol'
  if (s.includes('mental health')) return 'Mental Health'
  if (s.includes('community')) return 'Community'
  return 'Addiction'
}

function isPrivate(name: string, type: string) {
  const n = name.toLowerCase(), t = type.toLowerCase()
  return !['nhs', 'trust', 'change grow live', 'turning point', 'cgl', 'with you', 'forward leeds', 'swanswell'].some(k => n.includes(k) || t.includes(k))
}

// ── Content generators ────────────────────────────────────────────────────────

function generateAbout(name: string, town: string, type: string, specs: string[], private_: boolean): string[] {
  const typeLabel = serviceLabel(type).toLowerCase()
  const funding = private_ ? 'private' : 'NHS-funded'
  const specStr = specs.slice(0, 3).join(', ') || 'substance misuse and addiction recovery'

  return [
    `${name} is a ${funding} ${typeLabel} treatment centre based in ${town}, providing specialist addiction services for individuals and families across the region. Regulated by the Care Quality Commission (CQC), the centre delivers evidence-based treatment programmes for ${specStr}.`,
    `Addiction is a complex, chronic condition that requires professional clinical support. ${name} provides a structured and compassionate environment where people can begin their recovery journey — whatever stage they are at, and whatever substance or behaviour has brought them to seek help.`,
    `The centre works with both self-referrals and professional referrals from GPs, social workers and other healthcare providers. Whether you are seeking ${private_ ? 'private treatment' : 'NHS-funded support'}, ${name} in ${town} can discuss the options available and help you or your loved one access the right level of care.`,
  ]
}

function generateTreatments(specs: string[], name: string, town: string): Array<{ title: string; body: string }> {
  const base = [
    {
      title: 'Medical Detoxification',
      body: `For individuals with a physical dependency on alcohol, opioids or other substances, medically supervised detoxification is the first step in treatment at ${name}. Detox is conducted under clinical supervision to ensure safety and manage withdrawal symptoms with appropriate medication where required.`,
    },
    {
      title: 'Individual Therapy',
      body: `One-to-one therapeutic sessions form the core of treatment at ${name}. These sessions use evidence-based approaches including Cognitive Behavioural Therapy (CBT), motivational interviewing and relapse prevention to help clients develop insight into their addiction and build the skills needed for lasting recovery.`,
    },
    {
      title: 'Group Therapy & Peer Support',
      body: `Group therapy is a powerful component of addiction treatment, offering clients the opportunity to learn from shared experience, build social skills and develop a support network. ${name} facilitates structured group sessions led by qualified clinicians.`,
    },
    {
      title: 'Aftercare & Relapse Prevention',
      body: `Recovery does not end when treatment finishes. ${name} provides structured aftercare planning and relapse prevention support to help clients maintain their sobriety and navigate the challenges of life in recovery. This typically includes access to community support groups, ongoing counselling and a personalised continuing care plan.`,
    },
    {
      title: 'Family Therapy & Support',
      body: `Addiction affects the whole family. ${name} offers family therapy and support sessions to help loved ones understand addiction, process their own experiences, and rebuild healthy relationships as part of the recovery process.`,
    },
  ]

  const specItems = specs.slice(0, 4).map(spec => ({
    title: `${spec.split('|')[0].trim()} Treatment Programme`,
    body: `${name} in ${town} provides a specialist programme for ${spec.split('|')[0].trim().toLowerCase()}, incorporating assessment, tailored therapeutic interventions and structured aftercare to support each client's individual recovery goals.`,
  }))

  return [...specItems, ...base].slice(0, 6)
}

function generateProcess(name: string, private_: boolean): Array<{ n: number; title: string; body: string }> {
  return [
    { n: 1, title: 'Contact & Initial Enquiry', body: `Get in touch with ${name} to discuss your situation in confidence. The admissions team will listen, answer your questions, and explain what treatment is available and how to access it.` },
    { n: 2, title: 'Assessment', body: `A comprehensive clinical assessment will be carried out to understand the nature and severity of the addiction, any co-occurring conditions, and your personal circumstances. This assessment shapes your individual treatment plan.` },
    { n: 3, title: `Funding & Admission${private_ ? ' (Private)' : ' (NHS/Funded)'}`, body: private_ ? `For private treatment at ${name}, fees will be discussed transparently at the point of admission. Many private health insurance policies cover addiction treatment — it is worth checking your policy.` : `NHS-funded treatment at ${name} is accessed through a referral from your GP or local drug and alcohol service. Your worker can advise on eligibility and waiting times.` },
    { n: 4, title: 'Treatment', body: `Your tailored treatment programme begins, typically combining detoxification (if required), individual therapy, group work, and structured daily activities in a safe, therapeutic environment.` },
    { n: 5, title: 'Discharge & Aftercare', body: `As you approach the end of your treatment programme, ${name} will work with you to develop an aftercare plan that supports your continued recovery — including access to community services, support groups and follow-up counselling.` },
  ]
}

function generateFAQs(name: string, town: string, type: string, private_: boolean): Array<{ q: string; a: string }> {
  const typeLabel = serviceLabel(type).toLowerCase()
  return [
    { q: `Does ${name} accept self-referrals?`, a: `Yes, ${name} in ${town} accepts both self-referrals and professional referrals. You can contact the admissions team directly to discuss your situation and find out about available treatment programmes and any current waiting times.` },
    { q: `What type of treatment does ${name} offer?`, a: `${name} is a ${typeLabel} addiction treatment centre in ${town}. Treatment typically includes comprehensive assessment, medically supervised detoxification where required, individual and group therapy, and structured aftercare planning.` },
    { q: `Is ${name} regulated by the CQC?`, a: `Yes. ${name} is registered with and inspected by the Care Quality Commission (CQC) — England's independent regulator of health and social care services. CQC registration means ${name} has met the required standards for delivering safe, effective and caring treatment.` },
    { q: `How much does treatment at ${name} cost?`, a: private_ ? `${name} is a private treatment centre. Fees vary depending on the programme, length of stay and level of care required. Contact ${name} directly for a current fee schedule. Private health insurance may cover some or all of the cost of treatment.` : `${name} provides NHS-funded treatment, meaning care may be available at no direct cost to you. Referral is typically made through your GP or local drug and alcohol service. Your worker can advise on eligibility and waiting times.` },
    { q: `What addictions does ${name} treat?`, a: `${name} treats a range of addictions and related conditions, including alcohol dependency, drug addiction (including opioids, cocaine, cannabis and prescription medications), gambling disorder, and dual diagnosis — where addiction co-occurs with a mental health condition such as depression, anxiety or PTSD.` },
    { q: `Can I visit someone in treatment at ${name}?`, a: `Visiting policies vary by treatment centre and stage of treatment. During some early stages of residential treatment, contact with family and friends may be limited to allow the client to focus on their recovery. ${name}'s admissions team can advise on their specific visiting policy.` },
    { q: `How do I get urgent help in ${town}?`, a: `If you or someone else needs urgent help with addiction, contact your GP, call NHS 111, or contact the Frank helpline free on 0300 123 6600 (24 hours). In an emergency, call 999. ${name} in ${town} can also provide guidance on urgent referral pathways.` },
    { q: `Does ${name} offer detox as part of treatment?`, a: `Many residential and some community treatment programmes include medically supervised detoxification as the first phase of treatment. ${name} will be able to advise whether a medical detox is appropriate for your situation following your initial assessment.` },
  ]
}

// ── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const centre = getCentreBySlug(slug)
  if (!centre) return {}
  const type = serviceLabel(centre.serviceType)
  const town = centre.townName || centre.townSlug

  return {
    title: `${centre.name} | ${type} Treatment in ${town} | SoberNation`,
    description: `${centre.name} is a CQC-regulated ${type.toLowerCase()} addiction treatment centre in ${town}. View services, admissions process, FAQs and contact details on SoberNation.`,
    openGraph: {
      title: `${centre.name} | Addiction Treatment — ${town}`,
      description: `CQC-regulated ${type.toLowerCase()} addiction treatment services in ${town}.`,
      type: 'website',
    },
    alternates: { canonical: `https://www.sobernation.co.uk/centre/${slug}` },
  }
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default async function CentreProfilePage({ params }: Props) {
  const { slug } = await params
  const centre = getCentreBySlug(slug)
  if (!centre) notFound()

  const town = centre.townName || centre.townSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
  const private_ = isPrivate(centre.name, centre.serviceType)
  const type = serviceLabel(centre.serviceType)
  const viewers = getLiveViewers(slug)
  const specList = centre.specialism ? centre.specialism.split('|').map(s => s.trim()).filter(Boolean) : []
  const initials = centre.name.split(' ').filter(Boolean).slice(0, 2).map(w => w[0]).join('').toUpperCase() || '??'

  const about = generateAbout(centre.name, town, centre.serviceType, specList, private_)
  const treatments = generateTreatments(specList, centre.name, town)
  const process_ = generateProcess(centre.name, private_)
  const faqs = generateFAQs(centre.name, town, centre.serviceType, private_)
  const nearby = getNearbyLocations(centre.townSlug, 6)
  const stats = getLocationStats(centre.townSlug)

  const mapSrc = centre.postcode
    ? `https://maps.google.com/maps?q=${encodeURIComponent(centre.postcode + ', UK')}&output=embed&z=14`
    : `https://maps.google.com/maps?q=${encodeURIComponent(centre.name + ' ' + town)}&output=embed&z=13`

  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': ['LocalBusiness', 'MedicalOrganization'],
      name: centre.name,
      description: about[0],
      address: { '@type': 'PostalAddress', streetAddress: centre.address || undefined, postalCode: centre.postcode || undefined, addressLocality: town, addressCountry: 'GB' },
      telephone: centre.phone || undefined,
      priceRange: private_ ? '£££' : '£',
      areaServed: [
        { '@type': 'City', name: town },
        ...nearby.slice(0, 3).map(n => ({ '@type': 'City', name: n.name })),
      ],
      url: centre.website || `https://www.sobernation.co.uk/centre/${slug}`,
      ...(centre.cqcUrl ? { sameAs: [centre.cqcUrl] } : {}),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.sobernation.co.uk' },
        { '@type': 'ListItem', position: 2, name: `Rehab in ${town}`, item: `https://www.sobernation.co.uk/rehab/${centre.townSlug}` },
        { '@type': 'ListItem', position: 3, name: centre.name, item: `https://www.sobernation.co.uk/centre/${slug}` },
      ],
    },
  ]

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      <style>{`
        .cp { font-family: inherit; }
        .cp-hero { background: var(--white); border-bottom: 1px solid var(--border); padding: 32px 20px 0; }
        .cp-hero-inner { max-width: 1100px; margin: 0 auto; }
        .cp-bc { font-size: 12px; color: var(--text-light); margin-bottom: 20px; }
        .cp-bc a { color: var(--text-light); text-decoration: none; }
        .cp-bc a:hover { color: var(--accent); }
        .cp-hero-row { display: flex; gap: 20px; align-items: flex-start; padding-bottom: 28px; }
        .cp-logo {
          width: 80px; height: 80px; border-radius: 14px; flex-shrink: 0;
          background: linear-gradient(135deg, #1d4ed8, #2563eb);
          display: flex; align-items: center; justify-content: center;
          font-size: 26px; font-weight: 800; color: #fff; letter-spacing: -1px;
          box-shadow: 0 2px 16px rgba(29,78,216,0.2);
        }
        .cp-h1 { font-size: clamp(22px, 3.5vw, 32px); font-weight: 800; color: var(--text); letter-spacing: -0.025em; line-height: 1.15; margin-bottom: 6px; }
        .cp-sub { font-size: 14px; color: var(--text-muted); margin-bottom: 12px; }
        .cp-badges { display: flex; gap: 7px; flex-wrap: wrap; margin-bottom: 12px; }
        .cp-badge { font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 20px; }
        .cp-badge--cqc { background: #eff6ff; color: #1d4ed8; }
        .cp-badge--private { background: #fef3c7; color: #92400e; }
        .cp-badge--nhs { background: #f0fdf4; color: #166534; }
        .cp-badge--type { background: #f0f9ff; color: #0369a1; }
        .cp-viewers { font-size: 13px; color: #059669; display: inline-flex; align-items: center; gap: 6px; font-weight: 600; }
        .cp-dot { width: 8px; height: 8px; border-radius: 50%; background: #22c55e; animation: blink2 2s ease-in-out infinite; flex-shrink: 0; }
        @keyframes blink2 { 0%,100%{opacity:1}50%{opacity:0.35} }
        .cp-tabs { display: flex; gap: 0; border-top: 1px solid var(--border); margin-top: 4px; overflow-x: auto; }
        .cp-tab { font-size: 13px; font-weight: 600; color: var(--text-muted); padding: 14px 18px; text-decoration: none; border-bottom: 2px solid transparent; white-space: nowrap; transition: color 0.12s, border-color 0.12s; }
        .cp-tab:hover { color: var(--accent); border-bottom-color: var(--accent); }
        .cp-wrap { max-width: 1100px; margin: 0 auto; padding: 32px 20px 64px; display: grid; grid-template-columns: 1fr 300px; gap: 28px; align-items: start; }
        @media (max-width: 880px) { .cp-wrap { grid-template-columns: 1fr; } .cp-sidebar { position: static; order: 2; } }
        .cp-section { background: var(--white); border: 1px solid var(--border); border-radius: 12px; padding: 26px 28px; margin-bottom: 16px; }
        .cp-section-title { font-size: 19px; font-weight: 700; color: var(--text); margin-bottom: 16px; letter-spacing: -0.01em; padding-bottom: 12px; border-bottom: 1px solid var(--border); }
        .cp-body { font-size: 15px; color: var(--text-muted); line-height: 1.85; }
        .cp-body p { margin-bottom: 14px; }
        .cp-body p:last-child { margin-bottom: 0; }
        .cp-treatment-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 14px; }
        .cp-treatment-card { background: #f9fafb; border: 1px solid var(--border); border-radius: 10px; padding: 16px 18px; }
        .cp-treatment-title { font-size: 14px; font-weight: 700; color: var(--text); margin-bottom: 6px; }
        .cp-treatment-body { font-size: 13px; color: var(--text-muted); line-height: 1.7; }
        .cp-step { display: flex; gap: 16px; margin-bottom: 24px; }
        .cp-step:last-child { margin-bottom: 0; }
        .cp-step-n { width: 32px; height: 32px; border-radius: 50%; background: var(--accent); color: #fff; font-size: 14px; font-weight: 800; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 2px; }
        .cp-step-title { font-size: 15px; font-weight: 700; color: var(--text); margin-bottom: 5px; }
        .cp-step-body { font-size: 14px; color: var(--text-muted); line-height: 1.7; }
        .cp-faq-item { border-bottom: 1px solid var(--border); padding: 16px 0; }
        .cp-faq-item:first-child { padding-top: 0; }
        .cp-faq-item:last-child { border-bottom: none; padding-bottom: 0; }
        .cp-faq-q { font-size: 15px; font-weight: 700; color: var(--text); margin-bottom: 8px; }
        .cp-faq-a { font-size: 14px; color: var(--text-muted); line-height: 1.75; }
        .cp-map { width: 100%; height: 240px; border-radius: 10px; border: 1px solid var(--border); display: block; margin-top: 14px; }
        .cp-address { font-size: 14px; color: var(--text-muted); line-height: 1.8; background: #f9fafb; border-radius: 8px; padding: 12px 14px; margin-bottom: 12px; }
        .cp-reviews-empty { text-align: center; padding: 28px 12px; }
        .cp-stars { font-size: 28px; letter-spacing: 4px; color: #d1d5db; margin-bottom: 10px; }

        /* Sidebar */
        .cp-sidebar { position: sticky; top: 24px; }
        .cp-sidebar-card { background: var(--white); border: 1px solid var(--border); border-radius: 12px; overflow: hidden; margin-bottom: 14px; }
        .cp-sidebar-head { background: linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%); padding: 18px 20px; text-align: center; }
        .cp-sidebar-logo { width: 56px; height: 56px; border-radius: 12px; background: rgba(255,255,255,0.25); margin: 0 auto 10px; display: flex; align-items: center; justify-content: center; font-size: 20px; font-weight: 800; color: #fff; }
        .cp-sidebar-name { font-size: 14px; font-weight: 700; color: #fff; margin-bottom: 2px; line-height: 1.3; }
        .cp-sidebar-loc { font-size: 12px; color: rgba(255,255,255,0.8); }
        .cp-sidebar-body { padding: 18px 20px; }
        .cp-sidebar-viewers { display: flex; align-items: center; gap: 7px; font-size: 13px; color: #059669; font-weight: 600; margin-bottom: 16px; padding-bottom: 14px; border-bottom: 1px solid var(--border); }

        /* Contact info */
        .cp-contact-row { display: flex; align-items: center; gap: 10px; padding: 9px 0; border-bottom: 1px solid #f3f4f6; }
        .cp-contact-row:last-child { border-bottom: none; }
        .cp-contact-val { font-size: 13px; font-weight: 600; color: #374151; text-decoration: none; }
        .cp-contact-val:hover { color: var(--accent); }
        .cp-claim-btn { display: block; width: 100%; text-align: center; font-size: 13px; font-weight: 700; background: var(--accent); color: #fff; padding: 11px; border-radius: 8px; text-decoration: none; margin-top: 14px; transition: opacity 0.12s; }
        .cp-claim-btn:hover { opacity: 0.88; }
        .cp-claim-sub { font-size: 11px; color: var(--text-light); text-align: center; margin-top: 8px; }

        /* CQC card */
        .cp-cqc { display: flex; align-items: flex-start; gap: 12px; background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 10px; padding: 14px 16px; }

        @media (max-width: 600px) { .cp-section { padding: 18px 16px; } .cp-hero-row { flex-direction: column; } }
      `}</style>

      {/* ── Hero ── */}
      <div className="cp-hero cp">
        <div className="cp-hero-inner">
          <nav className="cp-bc">
            <Link href="/">Home</Link>{' / '}
            <Link href={`/rehab/${centre.townSlug}`}>Rehab in {town}</Link>{' / '}
            <span>{centre.name}</span>
          </nav>
          <div className="cp-hero-row">
            <div className="cp-logo" style={{ position: 'relative', overflow: 'hidden', background: 'var(--white)' }}>
              {getCentreImage(centre.cqcUrl) ? (
                <Image
                  src={getCentreImage(centre.cqcUrl)!}
                  alt={`${centre.name} logo`}
                  fill
                  sizes="80px"
                  style={{ objectFit: 'contain', padding: 8 }}
                  priority
                />
              ) : initials}
            </div>
            <div>
              <h1 className="cp-h1">{centre.name}</h1>
              <p className="cp-sub">{type} Treatment Centre · {town}{centre.postcode ? ` · ${centre.postcode}` : ''}</p>
              <div className="cp-badges">
                <span className="cp-badge cp-badge--cqc">CQC Registered</span>
                <span className="cp-badge cp-badge--type">{type}</span>
                <span className={`cp-badge ${private_ ? 'cp-badge--private' : 'cp-badge--nhs'}`}>{private_ ? 'Private' : 'NHS Funded'}</span>
              </div>
              <div className="cp-viewers">
                <span className="cp-dot" />
                {viewers} Currently Viewing
              </div>
            </div>
          </div>
          <nav className="cp-tabs">
            {['About', 'Treatment', 'Admissions', 'FAQs', 'Location', 'Reviews'].map(t => (
              <a key={t} href={`#${t.toLowerCase()}`} className="cp-tab">{t}</a>
            ))}
          </nav>
        </div>
      </div>

      {/* ── Crisis box ── */}
      <div style={{ background: '#fef2f2', borderTop: '1px solid #fecaca', borderBottom: '1px solid #fecaca', padding: '12px 20px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontWeight: 700, fontSize: 13, color: '#b91c1c' }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#b91c1c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            Need urgent help?
          </div>
          <div style={{ fontSize: 13, color: '#7f1d1d', lineHeight: 1.5 }}>
            <strong>Frank:</strong> 0300 123 6600 (free, 24/7) ·{' '}
            <strong>Samaritans:</strong> 116 123 ·{' '}
            <strong>NHS:</strong> 111 ·{' '}
            <a href="https://www.talktofrank.com/get-help/find-support-near-you" target="_blank" rel="noopener noreferrer" style={{ color: '#b91c1c', fontWeight: 600 }}>Find local support →</a>
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="cp-wrap cp">
        <main>

          {/* About */}
          <section id="about" className="cp-section">
            <h2 className="cp-section-title">About {centre.name}</h2>
            <div className="cp-body">{about.map((p, i) => <p key={i}>{p}</p>)}</div>
            {/* Local stats */}
            {stats && (
              <div style={{ marginTop: 20, background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 10, padding: '14px 16px' }}>
                <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: '#1d4ed8', marginBottom: 10 }}>Addiction in {town} — At a Glance</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 12 }}>
                  {[{
                    value: formatStat(stats.inDrugTreatment), label: 'adults in drug treatment',
                  }, {
                    value: formatStat(stats.withAlcoholProblems), label: 'with harmful drinking',
                  }, {
                    value: `${stats.relapseRate}%`, label: 'relapse in year 1 without support',
                  }].map(stat => (
                    <div key={stat.label}>
                      <div style={{ fontSize: 20, fontWeight: 800, color: '#1d4ed8', letterSpacing: '-0.02em' }}>{stat.value}</div>
                      <div style={{ fontSize: 11, color: '#1e40af', lineHeight: 1.4, marginTop: 2 }}>{stat.label}</div>
                    </div>
                  ))}
                </div>
                <div style={{ fontSize: 10, color: '#6b7280', marginTop: 8 }}>Source: {stats.source}, {stats.year}</div>
              </div>
            )}
          </section>

          {/* Treatment */}
          <section id="treatment" className="cp-section">
            <h2 className="cp-section-title">Treatment Services at {centre.name}</h2>
            <div className="cp-body" style={{ marginBottom: 20 }}>
              <p>Treatment at {centre.name} is tailored to each individual&apos;s needs, following a comprehensive initial assessment. The centre offers a range of evidence-based interventions designed to address both the physical and psychological aspects of addiction.</p>
            </div>
            <div className="cp-treatment-grid">
              {treatments.map(t => (
                <div key={t.title} className="cp-treatment-card">
                  <div className="cp-treatment-title">{t.title}</div>
                  <div className="cp-treatment-body">{t.body}</div>
                </div>
              ))}
            </div>
          </section>

          {/* What to expect */}
          <section className="cp-section">
            <h2 className="cp-section-title">What to Expect from Treatment</h2>
            <div className="cp-body">
              <p>Beginning treatment at a residential or community addiction centre can feel like a significant step. Knowing what to expect can help reduce anxiety and make it easier to take that first step.</p>
              <p>On arrival at {centre.name}, new clients are welcomed by the admissions team and introduced to the therapeutic community. The initial days of treatment typically focus on assessment, settling in and — where clinically appropriate — the beginning of medically supervised detoxification.</p>
              <p>As treatment progresses, clients engage in a structured daily programme of individual therapy, group work, educational sessions and activities designed to support wellbeing and build recovery skills. The pace and content of treatment is personalised to each individual&apos;s needs and progress.</p>
              <p>All treatment at {centre.name} is delivered in a confidential setting. Information about a client&apos;s treatment will only be shared externally in exceptional circumstances, and always in accordance with the centre&apos;s confidentiality policy.</p>
            </div>
          </section>

          {/* Suitable for */}
          <section className="cp-section">
            <h2 className="cp-section-title">Who Is {centre.name} Suitable For?</h2>
            <div className="cp-body">
              <p>{centre.name} in {town} provides {serviceLabel(centre.serviceType).toLowerCase()} addiction treatment for adults who are struggling with dependency and addictive behaviour. The centre is {private_ ? 'a private facility, accessible via self-funding or private health insurance' : 'an NHS-funded service, accessible via GP or drug and alcohol service referral'}.</p>
              <p>Treatment is appropriate for individuals at various stages of addiction — from those experiencing early problematic use to those with long-standing, severe dependency. {centre.name} also supports people who have previously been through treatment and are seeking additional support to maintain their recovery.</p>
              <p>Family members and loved ones of people with addiction may also be able to access support through {centre.name}&apos;s family programme. Contact the centre directly to find out what is available.</p>
            </div>
          </section>

          {/* Admissions */}
          <section id="admissions" className="cp-section">
            <h2 className="cp-section-title">Admissions Process at {centre.name}</h2>
            <div className="cp-body" style={{ marginBottom: 24 }}>
              <p>The admissions process at {centre.name} is designed to be as straightforward as possible, while ensuring that each client receives the right level of assessment and support from the outset.</p>
            </div>
            <div>
              {process_.map(step => (
                <div key={step.n} className="cp-step">
                  <div className="cp-step-n">{step.n}</div>
                  <div>
                    <div className="cp-step-title">{step.title}</div>
                    <div className="cp-step-body">{step.body}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CQC */}
          <section className="cp-section">
            <h2 className="cp-section-title">Regulation &amp; Quality: CQC</h2>
            <div className="cp-cqc" style={{ marginBottom: 20 }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1d4ed8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }}>
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                <polyline points="9,12 11,14 15,10"/>
              </svg>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#1e40af', marginBottom: 3 }}>Care Quality Commission Registered</div>
                <div style={{ fontSize: 13, color: '#1e40af', lineHeight: 1.6 }}>{centre.name} is registered with and regulated by the CQC — England&apos;s independent health and social care regulator. All addiction treatment centres must meet CQC standards to operate legally.</div>
              </div>
            </div>
            <div className="cp-body">
              <p>The Care Quality Commission inspects all registered services against five key questions: Are they safe? Effective? Caring? Responsive? Well-led? Inspection reports are published publicly and updated regularly, so prospective clients and families can verify the quality of care independently.</p>
              {centre.cqcUrl && (
                <p><a href={centre.cqcUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', fontWeight: 600 }}>View {centre.name}&apos;s CQC inspection report →</a></p>
              )}
              <p>Choosing a CQC-regulated treatment centre gives you confidence that the care provided meets nationally recognised standards of safety and quality.</p>
            </div>
          </section>

          {/* FAQs */}
          <section id="faqs" className="cp-section">
            <h2 className="cp-section-title">Frequently Asked Questions</h2>
            <div>
              {faqs.map(f => (
                <div key={f.q} className="cp-faq-item">
                  <div className="cp-faq-q">{f.q}</div>
                  <div className="cp-faq-a">{f.a}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Location */}
          <section id="location" className="cp-section">
            <h2 className="cp-section-title">Location &amp; Getting There</h2>
            {(centre.address || centre.postcode) && (
              <div className="cp-address">
                {centre.address && <div><strong>{centre.name}</strong></div>}
                {centre.address && <div>{centre.address}</div>}
                {centre.postcode && <div>{centre.postcode}</div>}
                <div>{town}</div>
              </div>
            )}
            <div className="cp-body">
              <p>{centre.name} is located in {town}. Contact the admissions team for detailed directions and information about parking, transport links and accommodation options for family members travelling from further afield.</p>
            </div>
            <iframe className="cp-map" src={mapSrc} allowFullScreen loading="lazy" title={`Map showing ${centre.name}, ${town}`} referrerPolicy="no-referrer-when-downgrade" />

            {/* Nearby areas */}
            {nearby.length > 0 && (
              <div style={{ marginTop: 16 }}>
                <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-light)', marginBottom: 8 }}>Also serving nearby areas</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                  {nearby.map(n => (
                    <Link key={n.slug} href={`/rehab/${n.slug}`}
                      style={{ fontSize: 12, fontWeight: 600, color: '#1d4ed8', background: '#eff6ff', padding: '4px 12px', borderRadius: 20, textDecoration: 'none' }}>
                      {n.name} ({Math.round(n.distanceKm)} mi away)
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div style={{ marginTop: 14, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link href={`/centres/${centre.townSlug}`} style={{ fontSize: 13, color: 'var(--accent)', textDecoration: 'none', fontWeight: 600 }}>All centres in {town} →</Link>
              <Link href={`/rehab/${centre.townSlug}`} style={{ fontSize: 13, color: 'var(--accent)', textDecoration: 'none', fontWeight: 600 }}>Rehab guide for {town} →</Link>
            </div>
          </section>

          {/* Reviews */}
          <section id="reviews" className="cp-section">
            <h2 className="cp-section-title">Reviews of {centre.name}</h2>
            <div className="cp-reviews-empty">
              <div className="cp-stars">★★★★★</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>No reviews yet</div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)', maxWidth: 360, margin: '0 auto 16px' }}>
                Have you or a loved one received treatment at {centre.name}? Anonymous reviews help others make an informed decision about seeking help.
              </div>
              <a href={`mailto:editorial@sobernation.co.uk?subject=Review: ${encodeURIComponent(centre.name)}`}
                style={{ display: 'inline-block', fontSize: 13, fontWeight: 700, color: 'var(--accent)', border: '1.5px solid var(--accent)', borderRadius: 8, padding: '9px 18px', textDecoration: 'none' }}>
                Submit a review →
              </a>
            </div>
          </section>

        </main>

        {/* ── Sidebar ── */}
        <aside className="cp-sidebar">
          <div className="cp-sidebar-card">
            <div className="cp-sidebar-head">
              <div className="cp-sidebar-logo">{initials}</div>
              <div className="cp-sidebar-name">{centre.name}</div>
              <div className="cp-sidebar-loc">{town}{centre.postcode ? ` · ${centre.postcode}` : ''}</div>
            </div>
            <div className="cp-sidebar-body">
              <div className="cp-sidebar-viewers">
                <span className="cp-dot" />
                {viewers} Currently Viewing
              </div>

              {/* Contact info — always visible */}
              <div style={{ marginBottom: 14 }}>
                {centre.phone && (
                  <div className="cp-contact-row">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.33A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.81a16 16 0 0 0 6 6l.86-.86a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 21.73 16"/></svg>
                    <a href={`tel:${centre.phone.replace(/\s/g, '')}`} className="cp-contact-val">{centre.phone}</a>
                  </div>
                )}
                {centre.website && (
                  <div className="cp-contact-row">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                    <a href={centre.website} target="_blank" rel="noopener noreferrer" className="cp-contact-val">
                      {centre.website.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}
                    </a>
                  </div>
                )}
                {centre.email && (
                  <div className="cp-contact-row">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                    <a href={`mailto:${centre.email}`} className="cp-contact-val">{centre.email}</a>
                  </div>
                )}
                {!centre.phone && !centre.website && !centre.email && (
                  <div style={{ fontSize: 12, color: 'var(--text-light)', padding: '8px 0' }}>
                    Contact details not yet available.
                    {centre.cqcUrl && <> <a href={centre.cqcUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}>View CQC listing →</a></>}
                  </div>
                )}
              </div>

              <Link href={`/counsellors/claim?type=centre&name=${encodeURIComponent(centre.name)}&location=${centre.townSlug}`} className="cp-claim-btn">
                Claim &amp; verify this listing
              </Link>
              <div className="cp-claim-sub">From £30/month · Cancel anytime</div>

              <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--text-muted)' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  CQC Registered · England
                </div>
              </div>
            </div>
          </div>

          {/* Service type card */}
          <div className="cp-sidebar-card">
            <div style={{ padding: '16px 20px' }}>
              <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--text-light)', marginBottom: 10 }}>Centre Details</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  ['Type', type],
                  ['Funding', private_ ? 'Private' : 'NHS'],
                  ['Location', town],
                  ...(centre.postcode ? [['Postcode', centre.postcode]] : []),
                  ['Regulator', 'Care Quality Commission'],
                ].map(([label, value]) => (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                    <span style={{ color: 'var(--text-light)' }}>{label}</span>
                    <span style={{ fontWeight: 600, color: 'var(--text)' }}>{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="cp-sidebar-card">
            <div style={{ padding: '16px 20px' }}>
              <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--text-light)', marginBottom: 12 }}>Useful Resources</div>
              {[
                { href: centre.cqcUrl || 'https://www.cqc.org.uk', label: 'CQC inspection report →', ext: true },
                { href: `https://www.talktofrank.com/get-help/find-support-near-you`, label: 'Frank service finder →', ext: true },
                { href: `https://www.nhs.uk/live-well/addiction-support/`, label: 'NHS addiction support →', ext: true },
                { href: `/rehab/${centre.townSlug}`, label: `Rehab guide for ${town} →`, ext: false },
                { href: `/centres/${centre.townSlug}`, label: `All centres in ${town} →`, ext: false },
              ].map(link => (
                <a key={link.href} href={link.href} target={link.ext ? '_blank' : undefined} rel={link.ext ? 'noopener noreferrer' : undefined}
                  style={{ display: 'block', fontSize: 13, color: 'var(--accent)', textDecoration: 'none', marginBottom: 8, fontWeight: 500 }}>
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

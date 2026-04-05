/**
 * /centre/[slug] — Individual rehab centre profile page
 * Rich SEO content, blurred contacts, "X viewing" counter, claim CTA
 * Data from rehabs.json (3,000+ CQC-registered centres)
 */
import { notFound } from 'next/navigation'
import { getCentreBySlug } from '../../../lib/rehabs'
import { getLiveViewers } from '../../../lib/profile-slugs'
import type { Metadata } from 'next'
import Link from 'next/link'

export const revalidate = 3600 // ISR — on-demand, cached 1 hour

interface Props {
  params: Promise<{ slug: string }>
}

// ── SEO content generators ───────────────────────────────────────────────────

function serviceLabel(serviceType: string): string {
  const st = serviceType.toLowerCase()
  if (st.includes('residential')) return 'Residential'
  if (st.includes('drug') || st.includes('substance') || st.includes('alcohol')) return 'Drug & Alcohol'
  if (st.includes('mental health')) return 'Mental Health'
  if (st.includes('community')) return 'Community'
  return 'Addiction'
}

function isPrivate(name: string, serviceType: string): boolean {
  const n = name.toLowerCase()
  const s = serviceType.toLowerCase()
  return !['nhs', 'trust', 'change grow live', 'turning point', 'cgl', 'with you', 'forward leeds', 'swanswell']
    .some(kw => n.includes(kw) || s.includes(kw))
}

function generateAbout(name: string, townName: string, serviceType: string, specialisms: string[]): string {
  const type = serviceLabel(serviceType).toLowerCase()
  const private_ = isPrivate(name, serviceType)
  const funding = private_ ? 'private' : 'NHS-funded'
  const specs = specialisms.slice(0, 3).join(', ') || 'substance misuse and addiction recovery'

  return `${name} is a ${funding} ${type} treatment centre based in ${townName}, providing specialist support for individuals and families affected by addiction. Regulated by the Care Quality Commission (CQC), the centre offers evidence-based treatment programmes for ${specs}.

Seeking treatment is one of the most important steps a person can take. ${name} provides a structured, supportive environment where clients can begin their recovery journey with the help of qualified clinical staff. The centre works with both self-referrals and GP referrals, and can advise on funding and payment options.

Whether you are struggling with alcohol dependency, drug addiction, gambling disorder or a related mental health condition, ${name} in ${townName} offers the professional care and therapeutic support needed to achieve lasting recovery.`
}

function generateServicesContent(specialisms: string[], name: string, townName: string): Array<{ title: string; body: string }> {
  const specs = specialisms.length > 0 ? specialisms.slice(0, 6) : ['addiction recovery', 'alcohol treatment', 'drug rehabilitation']

  return specs.map(spec => {
    const specTitle = spec.split('|')[0].trim()
    return {
      title: `${specTitle} at ${name}`,
      body: `${name} in ${townName} provides specialist ${specTitle.toLowerCase()} support as part of its comprehensive addiction treatment programme. Clinical staff work with each individual to create a personalised care plan that addresses the physical, psychological and social aspects of their condition. Treatment may include detoxification, one-to-one therapy, group work and aftercare planning to support long-term recovery.`,
    }
  })
}

function generateFAQs(name: string, townName: string, serviceType: string): Array<{ q: string; a: string }> {
  const type = serviceLabel(serviceType).toLowerCase()
  const private_ = isPrivate(name, serviceType)

  return [
    {
      q: `Does ${name} accept self-referrals?`,
      a: `Yes, ${name} in ${townName} accepts both self-referrals and GP referrals. You can contact the centre directly to discuss your situation and find out about available treatment programmes and waiting times.`,
    },
    {
      q: `What type of treatment does ${name} offer?`,
      a: `${name} is a ${type} treatment centre offering specialist addiction services in ${townName}. Programmes typically include assessment, detoxification support, therapeutic interventions (individual and group), and structured aftercare.`,
    },
    {
      q: `Is ${name} regulated?`,
      a: `Yes. ${name} is registered with and regulated by the Care Quality Commission (CQC), England's independent regulator of health and social care services. CQC inspections ensure that centres meet national standards of safety and quality.`,
    },
    {
      q: `How much does treatment at ${name} cost?`,
      a: `Costs vary depending on the programme and funding route. ${private_ ? `${name} is a private treatment centre — fees apply and vary by programme length and level of care. Some private health insurance policies cover addiction treatment.` : `${name} provides NHS-funded treatment, meaning care may be available at no cost through referral from your GP or local drug and alcohol service.`} Contact the centre directly for current fee information.`,
    },
    {
      q: `Where is ${name} located?`,
      a: `${name} is based in ${townName}. Contact the centre directly for the full address and directions. They can also advise on transport links and accommodation options for those travelling from further afield.`,
    },
    {
      q: `What addictions does ${name} treat?`,
      a: `${name} treats a range of addictions and related conditions, including alcohol dependency, drug addiction (including opioids, cocaine, cannabis and prescription medication), gambling disorder and dual diagnosis (co-occurring mental health and addiction conditions).`,
    },
  ]
}

// ── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const centre = getCentreBySlug(slug)
  if (!centre) return {}

  const townName = centre.townName || centre.townSlug
  const type = serviceLabel(centre.serviceType)

  return {
    title: `${centre.name} | ${type} Treatment Centre in ${townName} | SoberNation`,
    description: `${centre.name} is a CQC-registered ${type.toLowerCase()} addiction treatment centre in ${townName}. View contact details, services, and patient reviews on SoberNation.`,
    openGraph: {
      title: `${centre.name} | Addiction Treatment in ${townName}`,
      description: `CQC-regulated ${type.toLowerCase()} treatment and rehabilitation services in ${townName}.`,
      type: 'website',
    },
  }
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default async function CentreProfilePage({ params }: Props) {
  const { slug } = await params
  const centre = getCentreBySlug(slug)
  if (!centre) notFound()

  const townName = centre.townName || centre.townSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
  const private_ = isPrivate(centre.name, centre.serviceType)
  const type = serviceLabel(centre.serviceType)
  const viewers = getLiveViewers(slug)

  const specList = centre.specialism
    ? centre.specialism.split('|').map(s => s.trim()).filter(Boolean)
    : []

  const about = generateAbout(centre.name, townName, centre.serviceType, specList)
  const services = generateServicesContent(specList, centre.name, townName)
  const faqs = generateFAQs(centre.name, townName, centre.serviceType)

  // Structured data
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: centre.name,
    address: {
      '@type': 'PostalAddress',
      streetAddress: centre.address || undefined,
      postalCode: centre.postcode || undefined,
      addressLocality: townName,
      addressCountry: 'GB',
    },
    telephone: centre.phone || undefined,
    url: centre.website || undefined,
    description: `CQC-registered ${type.toLowerCase()} addiction treatment centre in ${townName}.`,
    ...(centre.cqcUrl ? { sameAs: [centre.cqcUrl] } : {}),
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.sobernation.co.uk' },
      { '@type': 'ListItem', position: 2, name: `Rehab in ${townName}`, item: `https://www.sobernation.co.uk/rehab/${centre.townSlug}` },
      { '@type': 'ListItem', position: 3, name: centre.name, item: `https://www.sobernation.co.uk/centre/${slug}` },
    ],
  }

  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=-2,51,2,53&layer=mapnik&marker=51.5,-1&mlat=51.5&mlon=-1`
  // Use postcode for map if available
  const mapEmbedUrl = centre.postcode
    ? `https://maps.google.com/maps?q=${encodeURIComponent(centre.postcode + ' UK')}&output=embed&z=14`
    : `https://maps.google.com/maps?q=${encodeURIComponent(centre.name + ' ' + townName)}&output=embed&z=14`

  return (
    <div style={{ minHeight: '100vh', background: 'var(--white)' }}>
      {/* Structured data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <style>{`
        .cp-wrap { max-width: 840px; margin: 0 auto; padding: 0 20px 64px; }
        .cp-hero { background: var(--white); border-bottom: 1px solid var(--border); padding: 40px 20px 36px; }
        .cp-hero-inner { max-width: 840px; margin: 0 auto; }
        .cp-breadcrumb { font-size: 12px; color: var(--text-light); margin-bottom: 16px; }
        .cp-breadcrumb a { color: var(--text-light); text-decoration: none; }
        .cp-breadcrumb a:hover { color: var(--accent); }
        .cp-name { font-size: clamp(22px,4vw,34px); font-weight: 800; color: var(--text); letter-spacing: -0.02em; line-height: 1.2; margin-bottom: 10px; }
        .cp-meta { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin-bottom: 12px; }
        .cp-badge { font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 20px; }
        .cp-badge--cqc { background: #eff6ff; color: #1d4ed8; border: 1px solid #bfdbfe; }
        .cp-badge--private { background: #fef3c7; color: #92400e; }
        .cp-badge--nhs { background: #f0fdf4; color: #166534; }
        .cp-badge--service { background: #f0f9ff; color: #0369a1; }
        .cp-viewers { font-size: 13px; color: var(--text-muted); display: flex; align-items: center; gap: 6px; margin-top: 4px; }
        .cp-viewers-dot { width: 8px; height: 8px; border-radius: 50%; background: #22c55e; animation: pulse 2s infinite; }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        .cp-section { margin-top: 40px; }
        .cp-section-title { font-size: 20px; font-weight: 700; color: var(--text); margin-bottom: 14px; letter-spacing: -0.01em; }
        .cp-body { font-size: 15px; color: var(--text-muted); line-height: 1.8; }
        .cp-body p { margin-bottom: 14px; }
        .cp-blurred-contact {
          background: #f9fafb;
          border: 1px dashed #d1d5db;
          border-radius: 10px;
          padding: 20px 22px;
          margin-top: 28px;
          position: relative;
          overflow: hidden;
        }
        .cp-blurred-row { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
        .cp-blurred-row:last-child { margin-bottom: 0; }
        .cp-blurred-val { font-size: 14px; font-weight: 600; color: #374151; filter: blur(5px); user-select: none; letter-spacing: 0.04em; }
        .cp-blurred-overlay {
          position: absolute; inset: 0;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center; gap: 8px;
          background: rgba(255,255,255,0.7);
          backdrop-filter: blur(2px);
        }
        .cp-claim-overlay-btn {
          font-size: 13px; font-weight: 700;
          background: var(--accent); color: #fff;
          padding: 9px 20px; border-radius: 8px;
          text-decoration: none;
          transition: opacity 0.12s;
        }
        .cp-claim-overlay-btn:hover { opacity: 0.88; }
        .cp-faq { margin-bottom: 16px; }
        .cp-faq-q { font-size: 15px; font-weight: 700; color: var(--text); margin-bottom: 6px; }
        .cp-faq-a { font-size: 14px; color: var(--text-muted); line-height: 1.7; }
        .cp-map { width: 100%; height: 280px; border-radius: 10px; border: 1px solid var(--border); margin-top: 12px; }
        .cp-service-item { margin-bottom: 28px; }
        .cp-service-title { font-size: 16px; font-weight: 700; color: var(--text); margin-bottom: 8px; }
        .cp-address { font-size: 14px; color: var(--text-muted); line-height: 1.6; }
        .cp-claim-cta {
          margin-top: 40px;
          background: var(--accent-pale);
          border: 1px solid #c8e6df;
          border-radius: 12px;
          padding: 24px 28px;
          display: flex; justify-content: space-between; align-items: center; gap: 16px; flex-wrap: wrap;
        }
        .cp-reviews-empty { background: #f9fafb; border: 1px solid var(--border); border-radius: 10px; padding: 32px; text-align: center; }
        .cp-stars { font-size: 24px; letter-spacing: 4px; margin-bottom: 12px; opacity: 0.3; }
        @media (max-width: 600px) { .cp-claim-cta { flex-direction: column; } }
      `}</style>

      {/* Hero */}
      <div className="cp-hero">
        <div className="cp-hero-inner">
          {/* Breadcrumb */}
          <nav className="cp-breadcrumb">
            <Link href="/">Home</Link>{' / '}
            <Link href={`/rehab/${centre.townSlug}`}>Rehab in {townName}</Link>{' / '}
            <span>{centre.name}</span>
          </nav>

          <h1 className="cp-name">{centre.name}</h1>

          <div className="cp-meta">
            <span className="cp-badge cp-badge--cqc">CQC Registered</span>
            <span className="cp-badge cp-badge--service">{type}</span>
            <span className={`cp-badge ${private_ ? 'cp-badge--private' : 'cp-badge--nhs'}`}>
              {private_ ? 'Private' : 'NHS'}
            </span>
            <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{townName}</span>
          </div>

          {/* Live viewers */}
          <div className="cp-viewers">
            <span className="cp-viewers-dot" />
            <strong>{viewers}</strong> people are viewing this centre today
          </div>
        </div>
      </div>

      <div className="cp-wrap">

        {/* Blurred contact block */}
        <div style={{ marginTop: 32 }}>
          <div className="cp-blurred-contact">
            <div className="cp-blurred-row">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.81a16 16 0 0 0 6 6l.86-.86a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16"/></svg>
              <span className="cp-blurred-val">020 #### ####</span>
            </div>
            <div className="cp-blurred-row">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
              <span className="cp-blurred-val">www.••••••••.co.uk</span>
            </div>
            <div className="cp-blurred-overlay">
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-muted)', textAlign: 'center' }}>
                Contact information is only visible for verified listings
              </div>
              <Link href={`/counsellors/claim?type=centre&name=${encodeURIComponent(centre.name)}&location=${centre.townSlug}`} className="cp-claim-overlay-btn">
                Verify this listing →
              </Link>
            </div>
          </div>
        </div>

        {/* About */}
        <div className="cp-section">
          <h2 className="cp-section-title">About {centre.name}</h2>
          <div className="cp-body">
            {about.split('\n\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>

        {/* Address */}
        {(centre.address || centre.postcode) && (
          <div className="cp-section">
            <h2 className="cp-section-title">Location & Address</h2>
            <div className="cp-address">
              {centre.address && <div>{centre.address}</div>}
              {centre.postcode && <div>{centre.postcode}</div>}
              <div>{townName}</div>
            </div>
            <iframe
              className="cp-map"
              src={mapEmbedUrl}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Map showing location of ${centre.name}`}
            />
          </div>
        )}

        {/* Services */}
        {services.length > 0 && (
          <div className="cp-section">
            <h2 className="cp-section-title">Treatment Services</h2>
            {services.map(s => (
              <div key={s.title} className="cp-service-item">
                <div className="cp-service-title">{s.title}</div>
                <div className="cp-faq-a">{s.body}</div>
              </div>
            ))}
          </div>
        )}

        {/* What to expect */}
        <div className="cp-section">
          <h2 className="cp-section-title">What to Expect From Addiction Treatment</h2>
          <div className="cp-body">
            <p>Entering treatment for addiction can feel daunting, but knowing what to expect can help. Most residential and day treatment programmes begin with a comprehensive assessment to understand the nature and severity of the addiction, any co-occurring mental health conditions, and the person&apos;s personal circumstances.</p>
            <p>Treatment typically includes a medically supported detoxification phase where required, followed by a structured programme of individual and group therapy. Evidence-based approaches include Cognitive Behavioural Therapy (CBT), Motivational Interviewing, 12-Step facilitation, and Dialectical Behaviour Therapy (DBT), depending on the individual&apos;s needs.</p>
            <p>Aftercare and relapse prevention planning are integral to all quality addiction programmes. This ensures that individuals leave treatment with the tools, support networks and coping strategies needed to maintain long-term sobriety.</p>
          </div>
        </div>

        {/* CQC section */}
        <div className="cp-section">
          <h2 className="cp-section-title">CQC Regulation & Quality Standards</h2>
          <div className="cp-body">
            <p>The Care Quality Commission (CQC) is the independent regulator of all health and social care services in England. All addiction treatment centres — both NHS and private — must register with the CQC and are subject to regular inspections to ensure they meet national standards for safety, effectiveness, care, responsiveness and leadership.</p>
            <p>{centre.name} is a CQC-registered provider, meaning it has met the necessary requirements to operate as an addiction treatment service in England. You can view the centre&apos;s latest CQC inspection reports and ratings{centre.cqcUrl ? <span> at <a href={centre.cqcUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}>their CQC profile</a></span> : ' on the CQC website'}.</p>
          </div>
        </div>

        {/* FAQ */}
        <div className="cp-section">
          <h2 className="cp-section-title">Frequently Asked Questions</h2>
          {faqs.map(f => (
            <div key={f.q} className="cp-faq">
              <div className="cp-faq-q">{f.q}</div>
              <div className="cp-faq-a">{f.a}</div>
            </div>
          ))}
        </div>

        {/* Reviews */}
        <div className="cp-section">
          <h2 className="cp-section-title">Reviews of {centre.name}</h2>
          <div className="cp-reviews-empty">
            <div className="cp-stars">★★★★★</div>
            <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)', marginBottom: 6 }}>
              No reviews yet
            </div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 16, maxWidth: 360, margin: '0 auto 16px' }}>
              Have you or a loved one received treatment at {centre.name}? Your experience can help others make an informed decision.
            </div>
            <a href={`mailto:editorial@sobernation.co.uk?subject=Review: ${encodeURIComponent(centre.name)}`}
               style={{ fontSize: 13, fontWeight: 600, color: 'var(--accent)', textDecoration: 'none' }}>
              Submit a review →
            </a>
          </div>
        </div>

        {/* Claim CTA */}
        <div className="cp-claim-cta">
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--accent)', marginBottom: 4 }}>
              Do you manage {centre.name}?
            </div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
              Verify this listing to display your real contact details, manage your profile, and get a verified badge — from £30/month.
            </div>
          </div>
          <Link
            href={`/counsellors/claim?type=centre&name=${encodeURIComponent(centre.name)}&location=${centre.townSlug}`}
            style={{ fontSize: 13, fontWeight: 700, background: 'var(--accent)', color: '#fff', padding: '10px 20px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}
          >
            Claim & verify →
          </Link>
        </div>

        {/* Back link */}
        <div style={{ marginTop: 32, paddingTop: 24, borderTop: '1px solid var(--border)' }}>
          <Link href={`/rehab/${centre.townSlug}`} style={{ fontSize: 13, color: 'var(--text-muted)', textDecoration: 'none' }}>
            ← All treatment centres in {townName}
          </Link>
        </div>
      </div>
    </div>
  )
}

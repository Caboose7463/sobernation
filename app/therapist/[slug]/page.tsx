/**
 * /therapist/[slug] — Individual counsellor profile page
 * Data from Supabase. Rich SEO content, blurred contacts, "X viewing" counter.
 * slug format: sarah-mitchell-manchester
 */
import { createClient } from '@supabase/supabase-js'
import { notFound } from 'next/navigation'
import { getLiveViewers } from '../../../lib/profile-slugs'
import type { Metadata } from 'next'
import Link from 'next/link'

export const revalidate = 3600

interface Props {
  params: Promise<{ slug: string }>
}

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

// ── Content generators ───────────────────────────────────────────────────────

const SPECIALISM_LABELS: Record<string, string> = {
  addiction: 'Addiction', alcohol: 'Alcohol Addiction', drugs: 'Drug Addiction',
  substances: 'Substance Misuse', gambling: 'Gambling Addiction',
  'eating-disorders': 'Eating Disorders', trauma: 'Trauma & PTSD',
  'dual-diagnosis': 'Dual Diagnosis', codependency: 'Codependency',
  depression: 'Depression', anxiety: 'Anxiety',
}

const SPECIALISM_DESCRIPTIONS: Record<string, string> = {
  alcohol: 'Alcohol addiction is one of the most common and complex forms of substance dependency. A specialist counsellor can help you understand the psychological triggers behind your drinking, develop healthier coping strategies, and create a sustainable plan for recovery — whether that means cutting down or achieving abstinence.',
  drugs: 'Drug addiction affects every aspect of a person\'s life, from relationships and employment to physical and mental health. Working with a trained addiction counsellor provides a safe, confidential space to explore the root causes of drug use and develop the skills needed for lasting recovery.',
  substances: 'Substance misuse covers a broad range of addictive behaviours, including dependency on prescription medications, recreational drugs and alcohol. A specialist counsellor takes a holistic approach, addressing both the addiction itself and the underlying emotional or psychological factors.',
  gambling: 'Problem gambling can have devastating consequences for individuals and their families. Addiction counselling for gambling disorder focuses on identifying triggers, breaking the cycle of compulsive behaviour, and rebuilding financial stability and relationships.',
  'eating-disorders': 'Eating disorders are serious mental health conditions that often co-occur with addiction and substance misuse. Specialist counselling addresses the complex interplay between disordered eating and addictive behaviours, supporting recovery from both.',
  trauma: 'Many people turn to substances or addictive behaviours as a way of coping with unresolved trauma. Trauma-informed addiction counselling creates a safe therapeutic environment to process past experiences and develop healthier responses.',
  'dual-diagnosis': 'Dual diagnosis refers to the presence of both a mental health condition and an addiction disorder. Specialist counsellors with dual diagnosis experience are equipped to treat both conditions simultaneously, taking an integrated approach to recovery.',
  codependency: 'Codependency is a pattern of behaviour where a person\'s sense of identity and self-worth becomes dependent on another\'s needs or addiction. Counselling helps individuals recognise and break codependent patterns, setting healthy boundaries and rebuilding their sense of self.',
  depression: 'Depression and addiction frequently occur together — each can worsen the other. Counsellors specialising in this area work to address both conditions, helping clients understand the connection between their emotional state and addictive behaviour.',
  anxiety: 'Anxiety disorders and addiction are deeply connected. Many people use alcohol or drugs to manage anxiety symptoms, which can lead to dependency. Specialist counselling explores this relationship and develops evidence-based strategies for managing anxiety without substance reliance.',
  addiction: 'Addiction counselling provides professional, confidential support for anyone affected by compulsive or addictive behaviours. Working alongside a trained counsellor, clients explore the root causes of their addiction, develop insight into their patterns of behaviour, and build practical skills for sustainable recovery.',
}

function generateAbout(name: string, locationName: string, specialisms: string[], title: string): string {
  const specs = specialisms.slice(0, 3).map(s => SPECIALISM_LABELS[s] ?? s).join(', ') || 'addiction and substance misuse'
  const credential = title && !title.toLowerCase().includes('registered') ? title : 'Registered Counsellor'

  return `${name} is a ${credential} based in ${locationName}, specialising in ${specs}. They provide professional, confidential addiction counselling to adults seeking support with substance misuse, dependency and related mental health challenges.

Working with a counsellor who specialises in addiction can make a significant difference to recovery outcomes. ${name} offers a safe, non-judgemental space where clients can explore the root causes of their addiction, develop insight into their patterns of behaviour, and build practical tools for long-term recovery.

If you are concerned about your own or a loved one's relationship with alcohol, drugs, gambling or another addictive behaviour, ${name}'s specialist experience in ${locationName} means they are well-placed to provide the support and guidance needed to begin the journey towards recovery.`
}

function generateFAQs(name: string, locationName: string, specialisms: string[], hasBACP: boolean): Array<{ q: string; a: string }> {
  const specs = specialisms.slice(0, 2).map(s => SPECIALISM_LABELS[s] ?? s).join(' and ') || 'addiction'

  return [
    {
      q: `Is ${name} currently accepting new clients in ${locationName}?`,
      a: `To find out about current availability, please contact ${name} directly using the contact details on this profile. Many counsellors offer a free initial consultation to discuss whether they are the right fit for your needs.`,
    },
    {
      q: `What does ${name} specialise in?`,
      a: `${name} is an addiction counsellor based in ${locationName} specialising in ${specs}. They work with individuals and families affected by addiction, offering evidence-based therapeutic support tailored to each client's circumstances.`,
    },
    {
      q: `How do I contact ${name}?`,
      a: `Contact details for ${name} are available on this profile to verified listings. You can request to connect via the SoberNation platform. ${name} is based in ${locationName} and may offer both in-person and online sessions.`,
    },
    {
      q: `${hasBACP ? 'Is ' + name + ' BACP registered?' : 'What qualifications does ' + name + ' hold?'}`,
      a: hasBACP
        ? `${name} is registered with the British Association for Counselling and Psychotherapy (BACP), the UK's largest professional body for counsellors and psychotherapists. BACP membership indicates that a counsellor has met professional standards of training, ethics and ongoing professional development.`
        : `${name} is a professional addiction counsellor practising in ${locationName}. For specific qualification and accreditation information, please contact them directly or visit the BACP Find a Therapist register.`,
    },
    {
      q: `Does ${name} offer online counselling?`,
      a: `Many addiction counsellors now offer sessions via video call as well as in-person appointments. Contact ${name} directly to discuss your preferences and find out what formats they currently offer in and around ${locationName}.`,
    },
    {
      q: `How much does counselling with ${name} cost?`,
      a: `Counselling fees vary depending on the therapist's experience, session length and location. Contact ${name} directly to discuss their current fee structure. Some counsellors offer reduced rates for those on low incomes, and some addiction treatment may be funded through the NHS.`,
    },
  ]
}

// ── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const supabase = getSupabase()
  const { data } = await supabase
    .from('counsellors')
    .select('name, title, location_name, specialisms')
    .eq('profile_slug', slug)
    .maybeSingle()

  if (!data) return {}
  const specs = data.specialisms?.slice(0, 2).map((s: string) => SPECIALISM_LABELS[s] ?? s).join(' & ') || 'Addiction'

  return {
    title: `${data.name} | ${specs} Counsellor in ${data.location_name} | SoberNation`,
    description: `${data.name} is an addiction counsellor based in ${data.location_name}, specialising in ${specs}. View their profile, qualifications and contact details on SoberNation.`,
    openGraph: {
      title: `${data.name} | Addiction Counsellor in ${data.location_name}`,
      type: 'website',
    },
  }
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default async function TherapistProfilePage({ params }: Props) {
  const { slug } = await params
  const supabase = getSupabase()

  const { data: counsellor } = await supabase
    .from('counsellors')
    .select('id, name, title, location_name, location_slug, specialisms, phone, email, website, photo_url, verified, bacp_number, listing_type, view_count')
    .eq('profile_slug', slug)
    .maybeSingle()

  if (!counsellor) notFound()

  // Increment view count (fire and forget)
  supabase.from('counsellors').update({ view_count: (counsellor.view_count ?? 0) + 1 }).eq('id', counsellor.id)
    .then(() => {}).catch(() => {})

  // Related counsellors in same area
  const { data: related } = await supabase
    .from('counsellors')
    .select('id, name, title, location_name, location_slug, specialisms, profile_slug, verified')
    .eq('location_slug', counsellor.location_slug)
    .neq('id', counsellor.id)
    .limit(3)

  const viewers = getLiveViewers(slug)
  const hasBACP = !!counsellor.bacp_number
  const specialisms: string[] = counsellor.specialisms ?? []
  const about = generateAbout(counsellor.name, counsellor.location_name, specialisms, counsellor.title ?? '')
  const faqs = generateFAQs(counsellor.name, counsellor.location_name, specialisms, hasBACP)
  const initials = counsellor.name.split(' ').map((n: string) => n[0]).slice(0, 2).join('').toUpperCase()

  // Structured data
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: counsellor.name,
    jobTitle: counsellor.title || 'Addiction Counsellor',
    worksFor: { '@type': 'Organization', name: 'SoberNation' },
    address: {
      '@type': 'PostalAddress',
      addressLocality: counsellor.location_name,
      addressCountry: 'GB',
    },
    url: `https://www.sobernation.co.uk/therapist/${slug}`,
    ...(counsellor.photo_url ? { image: counsellor.photo_url } : {}),
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
      { '@type': 'ListItem', position: 2, name: `Counsellors in ${counsellor.location_name}`, item: `https://www.sobernation.co.uk/counsellors/${counsellor.location_slug}` },
      { '@type': 'ListItem', position: 3, name: counsellor.name, item: `https://www.sobernation.co.uk/therapist/${slug}` },
    ],
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--white)' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <style>{`
        .tp-hero { background: var(--white); border-bottom: 1px solid var(--border); padding: 40px 20px 36px; }
        .tp-hero-inner { max-width: 840px; margin: 0 auto; }
        .tp-wrap { max-width: 840px; margin: 0 auto; padding: 0 20px 64px; }
        .tp-breadcrumb { font-size: 12px; color: var(--text-light); margin-bottom: 16px; }
        .tp-breadcrumb a { color: var(--text-light); text-decoration: none; }
        .tp-breadcrumb a:hover { color: var(--accent); }
        .tp-hero-row { display: flex; gap: 20px; align-items: flex-start; }
        .tp-avatar { width: 72px; height: 72px; border-radius: 50%; object-fit: cover; flex-shrink: 0; background: var(--accent-pale); display: flex; align-items: center; justify-content: center; font-size: 24px; font-weight: 700; color: var(--accent); }
        .tp-name { font-size: clamp(22px,4vw,32px); font-weight: 800; color: var(--text); letter-spacing: -0.02em; line-height: 1.2; margin-bottom: 4px; }
        .tp-title { font-size: 14px; color: var(--text-muted); margin-bottom: 10px; }
        .tp-meta { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 10px; }
        .tp-badge { font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 20px; }
        .tp-badge--verified { background: #dcfce7; color: #166534; border: 1px solid #bbf7d0; }
        .tp-badge--unverified { background: #f3f4f6; color: #6b7280; border: 1px solid #e5e7eb; }
        .tp-badge--bacp { background: #eff6ff; color: #1d4ed8; border: 1px solid #bfdbfe; }
        .tp-badge--spec { background: var(--accent-pale); color: var(--accent); }
        .tp-viewers { font-size: 13px; color: var(--text-muted); display: flex; align-items: center; gap: 6px; }
        .tp-viewers-dot { width: 8px; height: 8px; border-radius: 50%; background: #22c55e; animation: pulse2 2s infinite; flex-shrink: 0; }
        @keyframes pulse2 { 0%,100%{opacity:1}50%{opacity:0.4} }
        .tp-section { margin-top: 40px; }
        .tp-section-title { font-size: 20px; font-weight: 700; color: var(--text); margin-bottom: 14px; letter-spacing: -0.01em; }
        .tp-body { font-size: 15px; color: var(--text-muted); line-height: 1.8; }
        .tp-body p { margin-bottom: 14px; }
        .tp-blurred-contact { background: #f9fafb; border: 1px dashed #d1d5db; border-radius: 10px; padding: 20px 22px; margin-top: 28px; position: relative; overflow: hidden; }
        .tp-blurred-row { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
        .tp-blurred-val { font-size: 14px; font-weight: 600; color: #374151; filter: blur(5px); user-select: none; letter-spacing: 0.04em; }
        .tp-blurred-overlay { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; background: rgba(255,255,255,0.75); backdrop-filter: blur(2px); }
        .tp-claim-overlay-btn { font-size: 13px; font-weight: 700; background: var(--accent); color: #fff; padding: 9px 20px; border-radius: 8px; text-decoration: none; transition: opacity 0.12s; }
        .tp-claim-overlay-btn:hover { opacity: 0.88; }
        .tp-verified-contact { background: var(--accent-pale); border: 1px solid #c8e6df; border-radius: 10px; padding: 18px 20px; margin-top: 28px; }
        .tp-contact-row { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
        .tp-contact-row:last-child { margin-bottom: 0; }
        .tp-faq { margin-bottom: 20px; border-bottom: 1px solid var(--border); padding-bottom: 20px; }
        .tp-faq:last-child { border-bottom: none; }
        .tp-faq-q { font-size: 15px; font-weight: 700; color: var(--text); margin-bottom: 8px; }
        .tp-faq-a { font-size: 14px; color: var(--text-muted); line-height: 1.7; }
        .tp-spec-item { margin-bottom: 28px; }
        .tp-spec-title { font-size: 16px; font-weight: 700; color: var(--text); margin-bottom: 8px; }
        .tp-map { width: 100%; height: 260px; border-radius: 10px; border: 1px solid var(--border); margin-top: 12px; }
        .tp-related-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 12px; margin-top: 16px; }
        .tp-related-card { background: var(--white); border: 1px solid var(--border); border-radius: 10px; padding: 14px 16px; }
        .tp-claim-cta { margin-top: 40px; background: var(--accent-pale); border: 1px solid #c8e6df; border-radius: 12px; padding: 24px 28px; display: flex; justify-content: space-between; align-items: center; gap: 16px; flex-wrap: wrap; }
        .tp-reviews-empty { background: #f9fafb; border: 1px solid var(--border); border-radius: 10px; padding: 32px; text-align: center; }
        .tp-stars { font-size: 24px; letter-spacing: 4px; margin-bottom: 12px; opacity: 0.3; }
        @media (max-width: 600px) { .tp-hero-row { flex-direction: column; } .tp-claim-cta { flex-direction: column; } }
      `}</style>

      {/* Hero */}
      <div className="tp-hero">
        <div className="tp-hero-inner">
          <nav className="tp-breadcrumb">
            <Link href="/">Home</Link>{' / '}
            <Link href={`/counsellors/${counsellor.location_slug}`}>Counsellors in {counsellor.location_name}</Link>{' / '}
            <span>{counsellor.name}</span>
          </nav>

          <div className="tp-hero-row">
            {/* Avatar */}
            {counsellor.photo_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={counsellor.photo_url} alt={counsellor.name} className="tp-avatar" />
            ) : (
              <div className="tp-avatar">{initials}</div>
            )}

            <div style={{ flex: 1 }}>
              <h1 className="tp-name">{counsellor.name}</h1>
              {counsellor.title && <div className="tp-title">{counsellor.title}</div>}

              <div className="tp-meta">
                {counsellor.verified ? (
                  <span className="tp-badge tp-badge--verified">✓ Verified by SoberNation</span>
                ) : (
                  <span className="tp-badge tp-badge--unverified">Unverified listing</span>
                )}
                {hasBACP && <span className="tp-badge tp-badge--bacp">BACP Registered</span>}
                <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{counsellor.location_name}</span>
              </div>

              {/* Specialism chips */}
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
                {specialisms.map(s => (
                  <span key={s} className="tp-badge tp-badge--spec">{SPECIALISM_LABELS[s] ?? s}</span>
                ))}
              </div>

              {/* Live viewers */}
              <div className="tp-viewers">
                <span className="tp-viewers-dot" />
                <strong>{viewers}</strong> people are viewing this profile today
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="tp-wrap">

        {/* Contact block */}
        {counsellor.verified && (counsellor.phone || counsellor.email || counsellor.website) ? (
          <div className="tp-verified-contact">
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent)', marginBottom: 12 }}>Contact {counsellor.name}</div>
            {counsellor.phone?.trim() && (
              <div className="tp-contact-row">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.81a16 16 0 0 0 6 6l.86-.86a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16"/></svg>
                <a href={`tel:${counsellor.phone}`} style={{ fontSize: 14, fontWeight: 600, color: 'var(--accent)', textDecoration: 'none' }}>{counsellor.phone}</a>
              </div>
            )}
            {counsellor.email?.trim() && (
              <div className="tp-contact-row">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                <a href={`mailto:${counsellor.email}`} style={{ fontSize: 14, fontWeight: 600, color: 'var(--accent)', textDecoration: 'none' }}>{counsellor.email}</a>
              </div>
            )}
            {counsellor.website?.trim() && (
              <div className="tp-contact-row">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                <a href={counsellor.website} target="_blank" rel="noopener noreferrer" style={{ fontSize: 14, fontWeight: 600, color: 'var(--accent)', textDecoration: 'none' }}>Visit website ↗</a>
              </div>
            )}
          </div>
        ) : (
          <div className="tp-blurred-contact">
            <div className="tp-blurred-row">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.81a16 16 0 0 0 6 6l.86-.86a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16"/></svg>
              <span className="tp-blurred-val">07### ######</span>
            </div>
            <div className="tp-blurred-row">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              <span className="tp-blurred-val">••••••@••••••.com</span>
            </div>
            <div className="tp-blurred-overlay">
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-muted)', textAlign: 'center', maxWidth: 260 }}>
                Contact details are only visible for verified listings
              </div>
              <Link href={`/counsellors/claim?id=${counsellor.id}&name=${encodeURIComponent(counsellor.name)}&location=${counsellor.location_slug}`} className="tp-claim-overlay-btn">
                Claim this profile →
              </Link>
            </div>
          </div>
        )}

        {/* About */}
        <div className="tp-section">
          <h2 className="tp-section-title">About {counsellor.name}</h2>
          <div className="tp-body">
            {about.split('\n\n').map((para, i) => <p key={i}>{para}</p>)}
          </div>
        </div>

        {/* Specialisms */}
        {specialisms.length > 0 && (
          <div className="tp-section">
            <h2 className="tp-section-title">Specialisms & Areas of Practice</h2>
            {specialisms.map(s => (
              <div key={s} className="tp-spec-item">
                <div className="tp-spec-title">{SPECIALISM_LABELS[s] ?? s} in {counsellor.location_name}</div>
                <div className="tp-faq-a">{SPECIALISM_DESCRIPTIONS[s] ?? `${counsellor.name} provides specialist counselling support in ${counsellor.location_name} for people affected by ${SPECIALISM_LABELS[s] ?? s.toLowerCase()}.`}</div>
              </div>
            ))}
          </div>
        )}

        {/* BACP section */}
        {hasBACP && (
          <div className="tp-section">
            <h2 className="tp-section-title">Professional Accreditation</h2>
            <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 10, padding: '16px 18px' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#1e40af', marginBottom: 6 }}>BACP Registered</div>
              <div style={{ fontSize: 14, color: '#1e40af', lineHeight: 1.7 }}>
                {counsellor.name} is registered with the British Association for Counselling and Psychotherapy (BACP) — the UK&apos;s largest professional body for counsellors and psychotherapists. BACP registration confirms that a therapist has met professional standards of training, experience and ethical practice, and is committed to ongoing professional development.
              </div>
            </div>
          </div>
        )}

        {/* Location */}
        <div className="tp-section">
          <h2 className="tp-section-title">Serving Clients in {counsellor.location_name}</h2>
          <div className="tp-body">
            <p>{counsellor.name} provides addiction counselling services in {counsellor.location_name} and the surrounding area. Many counsellors now offer online sessions in addition to in-person appointments, meaning that clients can access specialist support regardless of location.</p>
          </div>
          <iframe
            className="tp-map"
            src={`https://maps.google.com/maps?q=${encodeURIComponent(counsellor.location_name + ', UK')}&output=embed&z=12`}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`Map of ${counsellor.location_name}`}
          />
        </div>

        {/* FAQ */}
        <div className="tp-section">
          <h2 className="tp-section-title">Frequently Asked Questions</h2>
          {faqs.map(f => (
            <div key={f.q} className="tp-faq">
              <div className="tp-faq-q">{f.q}</div>
              <div className="tp-faq-a">{f.a}</div>
            </div>
          ))}
        </div>

        {/* Reviews */}
        <div className="tp-section">
          <h2 className="tp-section-title">Reviews of {counsellor.name}</h2>
          <div className="tp-reviews-empty">
            <div className="tp-stars">★★★★★</div>
            <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)', marginBottom: 6 }}>No reviews yet</div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)', maxWidth: 360, margin: '0 auto 16px' }}>
              Have you worked with {counsellor.name}? Leave an anonymous review to help others find the right support.
            </div>
            <a href={`mailto:editorial@sobernation.co.uk?subject=Review: ${encodeURIComponent(counsellor.name)}`}
               style={{ fontSize: 13, fontWeight: 600, color: 'var(--accent)', textDecoration: 'none' }}>
              Submit a review →
            </a>
          </div>
        </div>

        {/* Related counsellors */}
        {related && related.length > 0 && (
          <div className="tp-section">
            <h2 className="tp-section-title">Other Counsellors in {counsellor.location_name}</h2>
            <div className="tp-related-grid">
              {related.map(r => (
                <Link key={r.id} href={r.profile_slug ? `/therapist/${r.profile_slug}` : `/counsellors/${r.location_slug}`} style={{ textDecoration: 'none' }}>
                  <div className="tp-related-card">
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>{r.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{r.title || 'Counsellor'}</div>
                    {r.verified && <div style={{ marginTop: 6, fontSize: 11, fontWeight: 700, color: '#166534' }}>✓ Verified</div>}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Claim CTA */}
        {!counsellor.verified && (
          <div className="tp-claim-cta">
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--accent)', marginBottom: 4 }}>
                Is this your profile?
              </div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                Claim and verify your listing to display your real contact details, manage your profile, and show a verified badge — from £10/month.
              </div>
            </div>
            <Link
              href={`/counsellors/claim?id=${counsellor.id}&name=${encodeURIComponent(counsellor.name)}&location=${counsellor.location_slug}`}
              style={{ fontSize: 13, fontWeight: 700, background: 'var(--accent)', color: '#fff', padding: '10px 20px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}
            >
              Claim & verify →
            </Link>
          </div>
        )}

        <div style={{ marginTop: 32, paddingTop: 24, borderTop: '1px solid var(--border)' }}>
          <Link href={`/counsellors/${counsellor.location_slug}`} style={{ fontSize: 13, color: 'var(--text-muted)', textDecoration: 'none' }}>
            ← All counsellors in {counsellor.location_name}
          </Link>
        </div>
      </div>
    </div>
  )
}

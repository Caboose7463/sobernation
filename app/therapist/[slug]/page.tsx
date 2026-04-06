/**
 * /therapist/[slug] — Premier counsellor profile page
 * The most important page type on SoberNation.
 * Each page must outrank the counsellor's own website for their name.
 * 
 * Layout: 2-column sticky sidebar (desktop), stacked (mobile)
 * Content: 10+ rich sections, Person + FAQPage + BreadcrumbList schema
 */
import { createClient } from '@supabase/supabase-js'
import { notFound } from 'next/navigation'
import { getLiveViewers } from '../../../lib/profile-slugs'
import { getNearbyLocations } from '../../../lib/nearby-locations'
import { getLocationStats, formatStat } from '../../../lib/location-stats'
import type { Metadata } from 'next'
import Link from 'next/link'

export const dynamic = 'force-dynamic'
export const revalidate = 0

interface Props {
  params: Promise<{ slug: string }>
}

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

// ── Labels ───────────────────────────────────────────────────────────────────

const SPEC_LABELS: Record<string, string> = {
  addiction: 'Addiction', alcohol: 'Alcohol Addiction', drugs: 'Drug Addiction',
  substances: 'Substance Misuse', gambling: 'Gambling Addiction',
  'eating-disorders': 'Eating Disorders', trauma: 'Trauma & PTSD',
  'dual-diagnosis': 'Dual Diagnosis', codependency: 'Codependency',
  depression: 'Depression', anxiety: 'Anxiety',
}

const SPEC_DETAIL: Record<string, { intro: string; approach: string; who: string }> = {
  alcohol: {
    intro: 'Alcohol addiction is one of the most common and serious forms of substance dependency in the UK, affecting millions of people and their families.',
    approach: 'Working with a specialist alcohol counsellor involves exploring the psychological, emotional and social drivers behind problematic drinking. Evidence-based approaches include Cognitive Behavioural Therapy (CBT), Motivational Interviewing (MI) and relapse prevention planning.',
    who: 'Anyone concerned about their relationship with alcohol — whether they drink daily, binge drink, or use alcohol to cope with stress, anxiety or trauma — can benefit from specialist support.',
  },
  drugs: {
    intro: 'Drug addiction encompasses a broad range of substances, from illegal drugs such as heroin, cocaine and cannabis to prescription medications including opioids and benzodiazepines.',
    approach: 'Specialist drug addiction counselling addresses both the physical and psychological components of dependency. Treatment may include harm reduction strategies, abstinence-based support, and structured relapse prevention programmes.',
    who: 'Drug addiction counselling is suitable for anyone affected by problematic drug use, regardless of the substance or the stage of their addiction.',
  },
  substances: {
    intro: 'Substance misuse refers to the harmful or dependent use of any psychoactive substance, including alcohol, illicit drugs or prescription medications.',
    approach: 'An integrated approach to substance misuse counselling addresses the root causes of addictive behaviour, co-occurring mental health conditions, and the practical challenges of recovery.',
    who: 'Substance misuse counselling is appropriate for those at any stage of dependency — from early problematic use through to long-term addiction and recovery maintenance.',
  },
  gambling: {
    intro: 'Problem gambling is a recognised addiction that can have devastating consequences for individuals, their finances and their relationships, yet it often goes unaddressed for years.',
    approach: 'Gambling addiction counselling uses CBT to identify and challenge distorted thinking patterns, alongside motivational work and practical strategies for managing urges and rebuilding financial stability.',
    who: 'Gambling counselling helps anyone whose gambling is causing financial, relational or emotional harm — including those who gamble online, in person, or via sports betting.',
  },
  trauma: {
    intro: 'Trauma and addiction are deeply interconnected. Many people turn to substances or addictive behaviours as a way of coping with unprocessed traumatic experiences.',
    approach: 'Trauma-informed addiction counselling creates a safe therapeutic space to work through past experiences. Approaches may include EMDR, somatic therapy, narrative therapy and trauma-focused CBT.',
    who: 'Those whose addiction is driven by, or co-occurs with, experiences of trauma — including childhood adversity, abuse, bereavement, accident or assault — benefit enormously from trauma-specialised support.',
  },
  'dual-diagnosis': {
    intro: 'Dual diagnosis refers to the co-occurrence of a mental health condition and an addiction disorder. It is more common than many people realise — approximately 50% of people with addiction also experience a mental health condition.',
    approach: 'Integrated dual diagnosis treatment addresses both conditions simultaneously rather than treating them separately. This co-occurring approach leads to significantly better outcomes compared to treating each in isolation.',
    who: 'Dual diagnosis counselling is appropriate for anyone who experiences both addiction and a mental health condition, such as depression, anxiety, bipolar disorder or PTSD.',
  },
  depression: {
    intro: 'Depression and addiction form a particularly common and damaging cycle. Low mood can drive addictive behaviour, while substance use or compulsive behaviour worsens depression over time.',
    approach: 'Counselling for co-occurring depression and addiction uses an integrated approach that addresses both the mood disorder and the addictive behaviour, exploring their interaction and developing strategies for managing both.',
    who: 'Those experiencing persistent low mood, hopelessness or loss of interest alongside addiction will benefit from a counsellor with specialist experience in both areas.',
  },
  anxiety: {
    intro: 'Anxiety disorders and addiction are strongly linked — many people use alcohol, drugs or compulsive behaviours to temporarily manage anxiety, creating a cycle that ultimately makes anxiety worse.',
    approach: 'Anxiety-informed addiction counselling helps clients understand the relationship between anxiety and their addictive behaviour, and develops alternative coping strategies using CBT, mindfulness and somatic approaches.',
    who: 'Anxiety-specialised addiction counselling benefits those who use substances or compulsive behaviours to manage worry, panic, social anxiety or phobias.',
  },
  codependency: {
    intro: 'Codependency is a relational pattern in which one person\'s sense of identity and wellbeing becomes excessively tied to another\'s needs or addiction.',
    approach: 'Counselling for codependency focuses on establishing healthy boundaries, developing a secure sense of self, and breaking the enabling patterns that perpetuate addiction within relationships.',
    who: 'Codependency counselling helps partners, family members and friends of people with addiction who find that their own life has become organised around another person\'s addictive behaviour.',
  },
  addiction: {
    intro: 'Addiction is a complex, chronic condition characterised by compulsive engagement in rewarding behaviours despite harmful consequences. It affects the brain\'s reward, motivation and memory systems.',
    approach: 'Addiction counselling takes a holistic, personalised approach that addresses the biological, psychological and social aspects of dependency. Therapeutic methods include CBT, 12-step facilitation, motivational interviewing and trauma-informed practice.',
    who: 'Addiction counselling is suitable for anyone affected by compulsive or addictive behaviour, regardless of the nature of the addiction or how long it has been problematic.',
  },
}

// ── Content generators ────────────────────────────────────────────────────────

function generateAbout(name: string, location: string, specs: string[], title: string): string[] {
  const specLabels = specs.slice(0, 3).map(s => SPEC_LABELS[s] ?? s)
  const specStr = specLabels.length > 1
    ? specLabels.slice(0, -1).join(', ') + ' and ' + specLabels[specLabels.length - 1]
    : specLabels[0] ?? 'addiction and substance misuse'
  const cred = title && !title.toLowerCase().includes('registered') ? title : 'Registered Counsellor'

  return [
    `${name} is a ${cred} based in ${location}, providing specialist addiction counselling to individuals and families affected by ${specStr}. With professional training in evidence-based therapeutic approaches, ${name} offers a confidential, compassionate and non-judgemental space for anyone seeking support with addiction and recovery.`,
    `Choosing to seek help for addiction is a courageous step, and having the right professional by your side makes a significant difference to recovery outcomes. ${name}'s specialist knowledge and person-centred approach means that each client receives support tailored to their unique circumstances — not a one-size-fits-all programme.`,
    `Whether you are at the beginning of your recovery journey, have tried to stop before, or are a family member supporting a loved one with addiction, ${name} in ${location} has the experience and expertise to provide meaningful, lasting support.`,
  ]
}

function generateApproach(name: string, location: string, specs: string[]): string[] {
  const usesTrauma = specs.includes('trauma') || specs.includes('dual-diagnosis')
  const usesCBT = true
  const usesMI = specs.includes('alcohol') || specs.includes('drugs') || specs.includes('substances')

  const methods = [
    usesCBT ? 'Cognitive Behavioural Therapy (CBT)' : null,
    usesMI ? 'Motivational Interviewing (MI)' : null,
    usesTrauma ? 'Trauma-informed practice' : null,
    specs.includes('gambling') ? 'Gambling-specific CBT protocols' : null,
    specs.includes('dual-diagnosis') ? 'Integrated dual diagnosis treatment' : null,
    'Relapse prevention planning',
    'Mindfulness-based approaches',
  ].filter(Boolean) as string[]

  return [
    `${name} works with a person-centred philosophy, meaning that therapy is led by the client's needs, goals and pace of recovery. The therapeutic relationship is built on trust, respect and genuine collaboration.`,
    `Clinical approaches drawn upon may include: ${methods.join(', ')}. The specific methods used will depend on each client's individual needs, goals and the nature of their addiction.`,
    `Sessions are typically 50 minutes in duration and may be offered weekly or at a frequency agreed between client and counsellor. ${name} may offer sessions in-person in ${location} or online via video consultation, depending on individual preference and circumstances.`,
  ]
}

function generateWhatToExpect(name: string): string[] {
  return [
    `Your first session with ${name} is typically an assessment or introductory meeting. This is an opportunity for both you and ${name} to explore whether you are a good fit, to discuss what brings you to counselling, and to outline what you hope to achieve from the work. There is no obligation to continue after a first session.`,
    `Subsequent sessions focus on deepening your understanding of your relationship with addictive behaviour, working through underlying issues, and developing practical strategies for change. Recovery is rarely linear, and ${name} will support you through both progress and setbacks with consistency and care.`,
    `Everything discussed in sessions is confidential. Information will only be shared in exceptional circumstances where there is a significant risk of harm — and even then, wherever possible, ${name} would discuss this with you first.`,
  ]
}

function generateFAQs(name: string, location: string, specs: string[], hasBACP: boolean) {
  const spec1 = specs[0] ? SPEC_LABELS[specs[0]] : 'addiction'
  const spec2 = specs[1] ? SPEC_LABELS[specs[1]] : 'substance misuse'

  return [
    {
      q: `Is ${name} currently accepting new clients in ${location}?`,
      a: `To find out about ${name}'s current availability, please use the contact details on this profile (visible after listing verification) or reach out via SoberNation. Many counsellors offer a free initial consultation to discuss whether they are the right fit for your needs.`,
    },
    {
      q: `What does ${name} specialise in?`,
      a: `${name} is an addiction counsellor based in ${location} with specialist experience in ${spec1}${specs[1] ? ` and ${spec2}` : ''}. They work with individuals ${specs.includes('codependency') ? 'and partners or family members of people with addiction ' : ''}seeking professional support with compulsive or addictive behaviour.`,
    },
    {
      q: `${hasBACP ? `Is ${name} BACP accredited?` : `What qualifications does ${name} hold?`}`,
      a: hasBACP
        ? `${name} is registered with the British Association for Counselling and Psychotherapy (BACP), the UK's leading professional body for counsellors and psychotherapists. BACP registration means ${name} has met national standards for training, ethics and ongoing professional development — giving clients confidence in the quality of care they receive.`
        : `${name} is a qualified addiction counsellor practising in ${location}. For specific qualification, accreditation and professional membership details, please contact them directly. You can also search the BACP Find a Therapist register to verify professional registrations.`,
    },
    {
      q: `How long does counselling with ${name} take?`,
      a: `The length of counselling varies significantly depending on the individual, the nature of their addiction and their personal goals. Some clients benefit from short-term focused work of 6–12 sessions; others engage in longer-term therapy over months or years. ${name} will discuss realistic timeframes and review progress with you throughout the work.`,
    },
    {
      q: `Does ${name} offer online sessions?`,
      a: `Many addiction counsellors, including those practising in ${location}, now offer online sessions via video call in addition to in-person appointments. Online therapy has been shown to be as effective as face-to-face work for most forms of addiction counselling. Please contact ${name} directly to confirm what formats they currently offer.`,
    },
    {
      q: `How much does counselling with ${name} cost per session?`,
      a: `Counsellor fees vary depending on experience, qualifications and location. In ${location}, addiction counselling typically costs between £50 and £150 per session. Contact ${name} directly for their current fee structure. Some counsellors offer concessions for those on lower incomes, and NHS-funded counselling may be available through a GP referral.`,
    },
    {
      q: `Can I see ${name} if I'm not yet ready to stop using?`,
      a: `Yes. Many addiction counsellors, including those specialising in ${spec1.toLowerCase()}, work with clients who are not yet abstinent and are not yet sure they want to be. Harm reduction — reducing the risks associated with addictive behaviour — is a valid and valuable therapeutic goal in its own right. ${name} will meet you where you are, whatever stage of change you are at.`,
    },
    {
      q: `Is it confidential if I contact ${name}?`,
      a: `Yes. Counselling is confidential. Everything you share with ${name} is held in confidence, subject to very limited exceptions where there is a risk of serious harm. ${name} will explain their confidentiality policy in full at the start of your work together, so you know exactly where you stand.`,
    },
  ]
}

// ── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const supabase = getSupabase()
  const { data } = await supabase
    .from('counsellors')
    .select('name, title, location_name, specialisms, bacp_number')
    .eq('profile_slug', slug)
    .maybeSingle()

  if (!data) return {}
  const s1 = data.specialisms?.[0] ? SPEC_LABELS[data.specialisms[0]] : 'Addiction'
  const s2 = data.specialisms?.[1] ? SPEC_LABELS[data.specialisms[1]] : null
  const loc = data.location_name ?? 'the UK'

  return {
    title: `${data.name} | ${s1} Counsellor in ${loc} | SoberNation`,
    description: `${data.name} is a${data.bacp_number ? ' BACP-registered' : ''} addiction counsellor in ${loc} specialising in ${s1}${s2 ? ` and ${s2}` : ''}. View their profile, qualifications, FAQs and contact details on SoberNation.`,
    openGraph: {
      title: `${data.name} | ${s1} Counsellor — ${loc}`,
      description: `Professional addiction counselling in ${loc}. Specialising in ${s1}${s2 ? ` and ${s2}` : ''}.`,
      type: 'profile',
    },
    alternates: {
      canonical: `https://www.sobernation.co.uk/therapist/${slug}`,
    },
  }
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default async function TherapistPage({ params }: Props) {
  const { slug } = await params
  const supabase = getSupabase()

  const { data: c } = await supabase
    .from('counsellors')
    .select('id, name, title, location_name, location_slug, specialisms, phone, email, website, photo_url, verified, bacp_number, listing_type, view_count, profile_slug')
    .eq('profile_slug', slug)
    .maybeSingle()

  if (!c) notFound()

  // Null-safe location values — some scraped rows have null location_name/slug
  const locationName: string = (c as { location_name?: string | null }).location_name ?? 'the UK'
  const locationSlug: string = (c as { location_slug?: string | null }).location_slug ?? ''

  // Increment view count async (fire-and-forget)
  void supabase.from('counsellors').update({ view_count: (c.view_count ?? 0) + 1 }).eq('id', c.id)

  const { data: related } = await supabase
    .from('counsellors')
    .select('id, name, title, location_slug, location_name, specialisms, profile_slug, verified, photo_url')
    .eq('location_slug', locationSlug)
    .neq('id', c.id)
    .order('verified', { ascending: false })
    .limit(4)

  const specs: string[] = c.specialisms ?? []
  const viewers = getLiveViewers(slug)
  const hasBACP = !!c.bacp_number
  // Guard: filter empty tokens so n[0] is never undefined
  const initials = c.name.split(' ').filter(Boolean).map((n: string) => n[0]).slice(0, 2).join('').toUpperCase() || '??'
  const nearby = getNearbyLocations(locationSlug, 6)
  const stats = getLocationStats(locationSlug)

  const aboutParas = generateAbout(c.name, locationName, specs, c.title ?? '')
  const approachParas = generateApproach(c.name, locationName, specs)
  const expectParas = generateWhatToExpect(c.name)
  const faqs = generateFAQs(c.name, locationName, specs, hasBACP)

  // Schema.org
  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': ['Person', 'ProfessionalService'],
      name: c.name,
      jobTitle: c.title ?? 'Addiction Counsellor',
      description: `${c.name} is an addiction counsellor based in ${locationName}, specialising in ${specs.map(s => SPEC_LABELS[s] ?? s).join(', ')}.`,
      address: { '@type': 'PostalAddress', addressLocality: locationName, addressCountry: 'GB' },
      areaServed: [
        { '@type': 'City', name: locationName },
        ...nearby.slice(0, 4).map(n => ({ '@type': 'City', name: n.name })),
      ],
      priceRange: '££',
      url: `https://www.sobernation.co.uk/therapist/${slug}`,
      ...(c.photo_url ? { image: c.photo_url } : {}),
      ...(c.website ? { sameAs: [c.website] } : {}),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(f => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.sobernation.co.uk' },
        { '@type': 'ListItem', position: 2, name: `Counsellors in ${locationName}`, item: `https://www.sobernation.co.uk/counsellors/${locationSlug}` },
        { '@type': 'ListItem', position: 3, name: c.name, item: `https://www.sobernation.co.uk/therapist/${slug}` },
      ],
    },
  ]

  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(locationName + ' UK')}&output=embed&z=12`

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      <style>{`
        .tp { font-family: inherit; }

        /* Layout */
        .tp-hero { background: var(--white); border-bottom: 1px solid var(--border); padding: 32px 20px 0; }
        .tp-hero-inner { max-width: 1100px; margin: 0 auto; }
        .tp-body-wrap { max-width: 1100px; margin: 0 auto; padding: 32px 20px 64px; display: grid; grid-template-columns: 1fr 300px; gap: 28px; align-items: start; }
        @media (max-width: 880px) { .tp-body-wrap { grid-template-columns: 1fr; } .tp-sidebar { order: -1; } }

        /* Breadcrumb */
        .tp-bc { font-size: 12px; color: var(--text-light); margin-bottom: 20px; }
        .tp-bc a { color: var(--text-light); text-decoration: none; }
        .tp-bc a:hover { color: var(--accent); }

        /* Hero content */
        .tp-hero-profile { display: flex; gap: 20px; align-items: flex-start; padding-bottom: 28px; }
        .tp-avatar-lg {
          width: 88px; height: 88px; border-radius: 50%; object-fit: cover; flex-shrink: 0;
          background: linear-gradient(135deg, var(--accent), #1a8a6e);
          display: flex; align-items: center; justify-content: center;
          font-size: 28px; font-weight: 800; color: #fff; letter-spacing: -1px;
          border: 3px solid var(--white); box-shadow: 0 2px 16px rgba(29,107,90,0.18);
        }
        .tp-h1 { font-size: clamp(22px, 3.5vw, 32px); font-weight: 800; color: var(--text); letter-spacing: -0.025em; line-height: 1.15; margin-bottom: 5px; }
        .tp-subtitle { font-size: 14px; color: var(--text-muted); margin-bottom: 12px; }
        .tp-badges { display: flex; gap: 7px; flex-wrap: wrap; margin-bottom: 12px; }
        .tp-badge { font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 20px; display: inline-flex; align-items: center; gap: 4px; }
        .tp-badge--verified { background: #dcfce7; color: #166534; }
        .tp-badge--unverified { background: #f3f4f6; color: #6b7280; }
        .tp-badge--bacp { background: #eff6ff; color: #1d4ed8; }
        .tp-badge--spec { background: var(--accent-pale); color: var(--accent); }
        .tp-viewers { font-size: 13px; color: #059669; display: inline-flex; align-items: center; gap: 6px; font-weight: 600; }
        .tp-dot { width: 8px; height: 8px; border-radius: 50%; background: #22c55e; animation: blink 2s ease-in-out infinite; flex-shrink: 0; }
        @keyframes blink { 0%,100%{opacity:1}50%{opacity:0.35} }

        /* Nav tabs under hero */
        .tp-tabs { display: flex; gap: 0; border-top: 1px solid var(--border); margin-top: 4px; overflow-x: auto; -webkit-overflow-scrolling: touch; }
        .tp-tab { font-size: 13px; font-weight: 600; color: var(--text-muted); padding: 14px 18px; text-decoration: none; border-bottom: 2px solid transparent; white-space: nowrap; transition: color 0.12s, border-color 0.12s; }
        .tp-tab:hover { color: var(--accent); border-bottom-color: var(--accent); }

        /* Main content sections */
        .tp-section { background: var(--white); border: 1px solid var(--border); border-radius: 12px; padding: 26px 28px; margin-bottom: 16px; }
        .tp-section-title { font-size: 19px; font-weight: 700; color: var(--text); margin-bottom: 16px; letter-spacing: -0.01em; padding-bottom: 12px; border-bottom: 1px solid var(--border); }
        .tp-body-text { font-size: 15px; color: var(--text-muted); line-height: 1.85; }
        .tp-body-text p { margin-bottom: 14px; }
        .tp-body-text p:last-child { margin-bottom: 0; }

        /* Spec grid */
        .tp-spec-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; }
        .tp-spec-card { background: #f9fafb; border: 1px solid var(--border); border-radius: 10px; padding: 16px 18px; }
        .tp-spec-card-title { font-size: 14px; font-weight: 700; color: var(--text); margin-bottom: 6px; display: flex; align-items: center; gap: 6px; }
        .tp-spec-card-body { font-size: 13px; color: var(--text-muted); line-height: 1.7; }

        /* Methods list */
        .tp-methods { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px; }
        .tp-method { font-size: 12px; font-weight: 600; color: var(--accent); background: var(--accent-pale); padding: 5px 12px; border-radius: 20px; }

        /* FAQ */
        .tp-faq-item { border-bottom: 1px solid var(--border); padding: 16px 0; }
        .tp-faq-item:first-child { padding-top: 0; }
        .tp-faq-item:last-child { border-bottom: none; padding-bottom: 0; }
        .tp-faq-q { font-size: 15px; font-weight: 700; color: var(--text); margin-bottom: 8px; }
        .tp-faq-a { font-size: 14px; color: var(--text-muted); line-height: 1.75; }

        /* Location */
        .tp-map { width: 100%; height: 240px; border-radius: 10px; border: 1px solid var(--border); display: block; margin-top: 14px; }

        /* Related */
        .tp-related-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 12px; margin-top: 4px; }
        .tp-related-card { border: 1px solid var(--border); border-radius: 10px; padding: 14px; text-decoration: none; display: block; background: #fafafa; transition: border-color 0.12s; }
        .tp-related-card:hover { border-color: var(--accent); background: var(--white); }
        .tp-related-avatar { width: 40px; height: 40px; border-radius: 50%; background: var(--accent-pale); display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 700; color: var(--accent); margin-bottom: 8px; }
        .tp-related-name { font-size: 13px; font-weight: 700; color: var(--text); margin-bottom: 2px; }
        .tp-related-spec { font-size: 11px; color: var(--text-light); }

        /* Sidebar */
        .tp-sidebar { position: sticky; top: 24px; }
        .tp-sidebar-card { background: var(--white); border: 1px solid var(--border); border-radius: 12px; overflow: hidden; margin-bottom: 14px; }
        .tp-sidebar-head { background: linear-gradient(135deg, var(--accent) 0%, #1a8a6e 100%); padding: 18px 20px; text-align: center; }
        .tp-sidebar-avatar {
          width: 64px; height: 64px; border-radius: 50%; margin: 0 auto 10px;
          background: rgba(255,255,255,0.25); display: flex; align-items: center; justify-content: center;
          font-size: 22px; font-weight: 800; color: #fff; border: 2px solid rgba(255,255,255,0.5);
          overflow: hidden;
        }
        .tp-sidebar-name { font-size: 15px; font-weight: 700; color: #fff; margin-bottom: 2px; }
        .tp-sidebar-loc { font-size: 12px; color: rgba(255,255,255,0.8); }
        .tp-sidebar-body { padding: 18px 20px; }
        .tp-sidebar-viewers { display: flex; align-items: center; gap: 7px; font-size: 13px; color: #059669; font-weight: 600; margin-bottom: 16px; padding-bottom: 14px; border-bottom: 1px solid var(--border); }

        /* Contact blurred */
        .tp-contact-blurred { position: relative; border-radius: 10px; overflow: hidden; }
        .tp-contact-row { display: flex; align-items: center; gap: 10px; padding: 9px 0; border-bottom: 1px solid #f3f4f6; }
        .tp-contact-row:last-child { border-bottom: none; }
        .tp-contact-val { font-size: 13px; font-weight: 600; color: #374151; filter: blur(5px); user-select: none; }
        .tp-contact-overlay { position: absolute; inset: 0; background: rgba(255,255,255,0.72); backdrop-filter: blur(1px); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px; }
        .tp-contact-overlay-text { font-size: 12px; color: var(--text-muted); text-align: center; font-weight: 500; max-width: 180px; line-height: 1.5; }
        .tp-claim-btn { display: block; width: 100%; text-align: center; font-size: 13px; font-weight: 700; background: var(--accent); color: #fff; padding: 11px; border-radius: 8px; text-decoration: none; margin-top: 14px; transition: opacity 0.12s; }
        .tp-claim-btn:hover { opacity: 0.88; }
        .tp-claim-sub { font-size: 11px; color: var(--text-light); text-align: center; margin-top: 8px; }

        /* Verified contact */
        .tp-contact-real { display: block; width: 100%; text-align: center; font-size: 13px; font-weight: 700; padding: 10px; border-radius: 8px; text-decoration: none; margin-bottom: 8px; transition: opacity 0.12s; }
        .tp-contact-real:hover { opacity: 0.88; }
        .tp-contact-phone { background: var(--accent); color: #fff; }
        .tp-contact-email { background: #fff; color: var(--accent); border: 1.5px solid var(--accent); }
        .tp-contact-web { background: #fff; color: var(--text-muted); border: 1px solid var(--border); font-size: 12px; }

        /* Trust signals */
        .tp-trust { display: flex; align-items: center; gap: 8px; font-size: 12px; color: var(--text-muted); padding: 10px 0; border-top: 1px solid var(--border); }

        /* Reviews */
        .tp-reviews-empty { text-align: center; padding: 28px 12px; }
        .tp-stars { font-size: 28px; letter-spacing: 4px; color: #d1d5db; margin-bottom: 10px; }

        @media (max-width: 600px) { .tp-section { padding: 18px 16px; } .tp-hero-profile { flex-direction: column; } }
      `}</style>

      {/* ── Hero ── */}
      <div className="tp-hero tp">
        <div className="tp-hero-inner">
          <nav className="tp-bc">
            <Link href="/">Home</Link>{' / '}
            <Link href={`/counsellors/${locationSlug}`}>Counsellors in {locationName}</Link>{' / '}
            <span>{c.name}</span>
          </nav>

          <div className="tp-hero-profile">
            {c.photo_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={c.photo_url} alt={`${c.name} — addiction counsellor in ${locationName}`} className="tp-avatar-lg" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
            ) : (
              <div className="tp-avatar-lg">{initials}</div>
            )}
            <div>
              <h1 className="tp-h1">{c.name}</h1>
              <p className="tp-subtitle">{c.title ?? 'Addiction Counsellor'} · {locationName}</p>
              <div className="tp-badges">
                {c.verified
                  ? <span className="tp-badge tp-badge--verified">✓ Verified by SoberNation</span>
                  : <span className="tp-badge tp-badge--unverified">Unverified listing</span>}
                {hasBACP && <span className="tp-badge tp-badge--bacp">BACP Registered</span>}
                {specs.slice(0, 3).map(s => (
                  <span key={s} className="tp-badge tp-badge--spec">{SPEC_LABELS[s] ?? s}</span>
                ))}
              </div>
              <div className="tp-viewers">
                <span className="tp-dot" />
                {viewers} people viewing this profile today
              </div>
            </div>
          </div>

          {/* Tab nav */}
          <nav className="tp-tabs">
            {['About', 'Approach', 'Specialisms', 'FAQs', 'Location', 'Reviews'].map(t => (
              <a key={t} href={`#${t.toLowerCase()}`} className="tp-tab">{t}</a>
            ))}
          </nav>
        </div>
      </div>

      {/* ── Crisis box ── */}
      <div style={{ background: '#fef2f2', borderTop: '1px solid #fecaca', borderBottom: '1px solid #fecaca', padding: '12px 20px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontWeight: 700, fontSize: 13, color: '#b91c1c' }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#b91c1c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            Need help right now?
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
      <div className="tp-body-wrap tp">

        {/* ── Main column ── */}
        <main>

          {/* About */}
          <section id="about" className="tp-section">
            <h2 className="tp-section-title">About {c.name}</h2>
            <div className="tp-body-text">
              {aboutParas.map((p, i) => <p key={i}>{p}</p>)}
            </div>
            {/* Local addiction stats */}
            {stats && (
              <div style={{ marginTop: 20, background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 10, padding: '14px 16px' }}>
                <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: '#166534', marginBottom: 10 }}>Addiction in {locationName} — At a Glance</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 12 }}>
                  {[{
                    value: formatStat(stats.inDrugTreatment),
                    label: 'adults in drug treatment',
                  }, {
                    value: formatStat(stats.withAlcoholProblems),
                    label: 'with alcohol problems',
                  }, {
                    value: `${stats.relapseRate}%`,
                    label: 'relapse in year 1 without support',
                  }].map(stat => (
                    <div key={stat.label}>
                      <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--accent)', letterSpacing: '-0.02em' }}>{stat.value}</div>
                      <div style={{ fontSize: 11, color: '#166534', lineHeight: 1.4, marginTop: 2 }}>{stat.label}</div>
                    </div>
                  ))}
                </div>
                <div style={{ fontSize: 10, color: '#6b7280', marginTop: 8 }}>Source: {stats.source}, {stats.year}</div>
              </div>
            )}
          </section>


          {/* Therapeutic approach */}
          <section id="approach" className="tp-section">
            <h2 className="tp-section-title">Therapeutic Approach</h2>
            <div className="tp-body-text">
              {approachParas.map((p, i) => <p key={i}>{p}</p>)}
            </div>
            <div className="tp-methods">
              {['Person-centred therapy', 'Cognitive Behavioural Therapy (CBT)', 'Motivational Interviewing',
                ...(specs.includes('trauma') ? ['EMDR, Trauma-informed practice'] : []),
                ...(specs.includes('dual-diagnosis') ? ['Integrated dual diagnosis'] : []),
                'Relapse prevention', 'Mindfulness'].map(m => (
                <span key={m} className="tp-method">{m}</span>
              ))}
            </div>
          </section>

          {/* Specialisms */}
          {specs.length > 0 && (
            <section id="specialisms" className="tp-section">
              <h2 className="tp-section-title">Specialisms &amp; Areas of Practice</h2>
              <div className="tp-spec-grid">
                {specs.map(s => {
                  const detail = SPEC_DETAIL[s]
                  if (!detail) return null
                  return (
                    <div key={s} className="tp-spec-card">
                      <div className="tp-spec-card-title">
                        <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block', flexShrink: 0 }} />
                        {SPEC_LABELS[s]}
                      </div>
                      <div className="tp-spec-card-body">{detail.intro}</div>
                    </div>
                  )
                })}
              </div>

              {/* Deep dives for top 3 specialisms */}
              <div style={{ marginTop: 24 }}>
                {specs.slice(0, 3).map(s => {
                  const detail = SPEC_DETAIL[s]
                  if (!detail) return null
                  return (
                    <div key={s} style={{ marginBottom: 28, paddingBottom: 28, borderBottom: '1px solid var(--border)' }}>
                      <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)', marginBottom: 10 }}>
                        {SPEC_LABELS[s]} Counselling in {locationName}
                      </h3>
                      <div className="tp-body-text">
                        <p><strong>About this specialism:</strong> {detail.intro}</p>
                        <p><strong>Therapeutic approach:</strong> {detail.approach}</p>
                        <p><strong>Who benefits:</strong> {detail.who}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </section>
          )}

          {/* What to expect */}
          <section id="whattoexpect" className="tp-section">
            <h2 className="tp-section-title">What to Expect Working With {c.name}</h2>
            <div className="tp-body-text">
              {expectParas.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </section>

          {/* BACP */}
          {hasBACP && (
            <section className="tp-section">
              <h2 className="tp-section-title">Professional Accreditation</h2>
              <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <div style={{ flexShrink: 0, width: 48, height: 48, background: '#eff6ff', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1d4ed8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    <polyline points="9,12 11,14 15,10" />
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>BACP Registered</div>
                  <div className="tp-body-text">
                    <p>{c.name} is registered with the British Association for Counselling and Psychotherapy (BACP) — the UK&apos;s largest professional body for counsellors. BACP registration confirms that {c.name} has met the national standards of training, ethics and ongoing professional development. Clients can check their registration status directly on the BACP website.</p>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* FAQs */}
          <section id="faqs" className="tp-section">
            <h2 className="tp-section-title">Frequently Asked Questions About {c.name}</h2>
            <div>
              {faqs.map(f => (
                <div key={f.q} className="tp-faq-item">
                  <div className="tp-faq-q">{f.q}</div>
                  <div className="tp-faq-a">{f.a}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Location */}
          <section id="location" className="tp-section">
            <h2 className="tp-section-title">Serving Clients in {locationName}</h2>
            <div className="tp-body-text">
              <p>{c.name} provides addiction counselling to clients in {locationName} and the surrounding area. Sessions may be available in person or online, depending on the client&apos;s circumstances and preference. Online therapy via video call has been shown to be as effective as face-to-face sessions for addiction counselling, and allows clients to work with {c.name} from the comfort of their own home.</p>
              <p>If you are based outside {locationName} and are looking for a specialist addiction counsellor, SoberNation lists qualified professionals across the UK. You can also <Link href={`/counsellors/${locationSlug}`} style={{ color: 'var(--accent)' }}>browse all counsellors in {locationName}</Link>.</p>
            </div>
            <iframe className="tp-map" src={mapSrc} allowFullScreen loading="lazy" title={`Map of ${locationName}`} referrerPolicy="no-referrer-when-downgrade" />

            {/* Nearby areas */}
            {nearby.length > 0 && (
              <div style={{ marginTop: 16 }}>
                <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-light)', marginBottom: 8 }}>Also serving nearby areas</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                  {nearby.map(n => (
                    <Link key={n.slug} href={`/counsellors/${n.slug}`}
                      style={{ fontSize: 12, fontWeight: 600, color: 'var(--accent)', background: 'var(--accent-pale)', padding: '4px 12px', borderRadius: 20, textDecoration: 'none' }}>
                      {n.name} ({Math.round(n.distanceKm)} mi away)
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div style={{ marginTop: 14, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link href={`/counsellors/${locationSlug}`} style={{ fontSize: 13, color: 'var(--accent)', textDecoration: 'none', fontWeight: 600 }}>
                All counsellors in {locationName} →
              </Link>
              <Link href={`/rehab/${locationSlug}`} style={{ fontSize: 13, color: 'var(--accent)', textDecoration: 'none', fontWeight: 600 }}>
                Rehab centres in {locationName} →
              </Link>
            </div>
          </section>

          {/* Reviews */}
          <section id="reviews" className="tp-section">
            <h2 className="tp-section-title">Reviews of {c.name}</h2>
            <div className="tp-reviews-empty">
              <div className="tp-stars">★★★★★</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>No reviews yet</div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)', maxWidth: 340, margin: '0 auto 16px' }}>
                Have you worked with {c.name}? Your anonymous review helps others find the right support. All submissions are moderated.
              </div>
              <a href={`mailto:editorial@sobernation.co.uk?subject=Review for ${encodeURIComponent(c.name)}&body=Name (optional): %0D%0AStar rating (1-5): %0D%0AReview: `}
                style={{ display: 'inline-block', fontSize: 13, fontWeight: 700, color: 'var(--accent)', border: '1.5px solid var(--accent)', borderRadius: 8, padding: '9px 18px', textDecoration: 'none' }}>
                Leave a review →
              </a>
            </div>
          </section>

          {/* Related */}
          {related && related.length > 0 && (
            <section className="tp-section">
              <h2 className="tp-section-title">Other Counsellors in {locationName}</h2>
              <div className="tp-related-grid">
                {related.map(r => {
                  const ri = r.name.split(' ').filter(Boolean).map((n: string) => n[0]).slice(0, 2).join('').toUpperCase() || '??'
                  return (
                    <Link key={r.id} href={r.profile_slug ? `/therapist/${r.profile_slug}` : `/counsellors/${r.location_slug}`} className="tp-related-card">
                      {r.photo_url
                        // eslint-disable-next-line @next/next/no-img-element
                        ? <img src={r.photo_url} alt={r.name} className="tp-related-avatar" style={{ objectFit: 'cover' }} />
                        : <div className="tp-related-avatar">{ri}</div>}
                      <div className="tp-related-name">{r.name}</div>
                      <div className="tp-related-spec">{r.title ?? 'Counsellor'}</div>
                      {r.verified && <div style={{ fontSize: 10, fontWeight: 700, color: '#166534', marginTop: 4 }}>✓ Verified</div>}
                    </Link>
                  )
                })}
              </div>
            </section>
          )}
        </main>

        {/* ── Sidebar ── */}
        <aside className="tp-sidebar">
          <div className="tp-sidebar-card">
            <div className="tp-sidebar-head">
              <div className="tp-sidebar-avatar">
                {c.photo_url
                  // eslint-disable-next-line @next/next/no-img-element
                  ? <img src={c.photo_url} alt={c.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
                  : initials}
              </div>
              <div className="tp-sidebar-name">{c.name}</div>
              <div className="tp-sidebar-loc">{locationName}</div>
            </div>
            <div className="tp-sidebar-body">
              <div className="tp-sidebar-viewers">
                <span className="tp-dot" />
                {viewers} viewing today
              </div>
              {/* Real view count */}
              {(c.view_count ?? 0) > 10 && (
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 12, marginTop: -8 }}>
                  This profile has been viewed{' '}
                  <strong style={{ color: 'var(--text)' }}>{(c.view_count ?? 0).toLocaleString()}</strong>{' '}
                  times in total
                </div>
              )}

              {/* Contact / Claim */}
              {c.verified && (c.phone?.trim() || c.email?.trim() || c.website?.trim()) ? (
                <>
                  {c.phone?.trim() && (
                    <a href={`tel:${c.phone.replace(/\s/g,'')}`} className="tp-contact-real tp-contact-phone">
                      📞 {c.phone}
                    </a>
                  )}
                  {c.email?.trim() && c.email.includes('@') && (
                    <a href={`mailto:${c.email}`} className="tp-contact-real tp-contact-email">
                      ✉ Send email
                    </a>
                  )}
                  {c.website?.trim() && (
                    <a href={c.website} target="_blank" rel="noopener noreferrer" className="tp-contact-real tp-contact-web">
                      🌐 Visit website
                    </a>
                  )}
                </>
              ) : (
                <>
                  <div className="tp-contact-blurred">
                    <div>
                      <div className="tp-contact-row">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.33A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.81a16 16 0 0 0 6 6l.86-.86a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 21.73 16"/></svg>
                        <span className="tp-contact-val">07### ######</span>
                      </div>
                      <div className="tp-contact-row">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                        <span className="tp-contact-val">••••@••••.co.uk</span>
                      </div>
                    </div>
                    <div className="tp-contact-overlay">
                      <div className="tp-contact-overlay-text">Contact details visible for verified listings only</div>
                    </div>
                  </div>
                  <Link
                    href={`/counsellors/claim?id=${c.id}&name=${encodeURIComponent(c.name)}&location=${locationSlug}`}
                    className="tp-claim-btn"
                  >
                    {c.verified ? 'Manage listing' : 'Claim this profile'}
                  </Link>
                  <div className="tp-claim-sub">From £10/month · Cancel anytime</div>
                </>
              )}

              {/* Trust */}
              <div className="tp-trust">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                Verified against BACP register
              </div>
            </div>
          </div>

          {/* Specialism sidebar card */}
          {specs.length > 0 && (
            <div className="tp-sidebar-card">
              <div style={{ padding: '16px 20px' }}>
                <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--text-light)', marginBottom: 10 }}>Specialisms</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {specs.map(s => (
                    <span key={s} className="tp-badge tp-badge--spec">{SPEC_LABELS[s] ?? s}</span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Useful links */}
          <div className="tp-sidebar-card">
            <div style={{ padding: '16px 20px' }}>
              <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--text-light)', marginBottom: 12 }}>Useful Links</div>
              {[
                { href: `https://www.bacp.co.uk/search/`, label: 'BACP Find a Therapist →', ext: true },
                { href: `/counsellors/${locationSlug}`, label: `All counsellors in ${locationName} →`, ext: false },
                { href: `/rehab/${locationSlug}`, label: `Rehab centres in ${locationName} →`, ext: false },
                { href: `https://www.talktofrank.com`, label: 'Frank helpline →', ext: true },
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

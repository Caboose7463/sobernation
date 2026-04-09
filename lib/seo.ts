import type { Metadata } from 'next'

// ── Types ────────────────────────────────────────────────────────────────────

export interface FaqItem {
  question: string
  answer: string
}

export interface BreadcrumbItem {
  name: string
  href: string
}

// ── Metadata generators ──────────────────────────────────────────────────────

export function locationMetadata(
  type: 'help' | 'rehab' | 'aa-meetings' | 'na-meetings' | 'drug-treatment',
  locationName: string
): Metadata {
  const templates: Record<typeof type, { title: string; desc: string }> = {
    'help': {
      title: `Addiction Help in ${locationName} | Drug & Alcohol Services`,
      desc: `Find addiction help in ${locationName}. Local rehab centres, AA and NA meetings, NHS drug and alcohol services, and free support resources in ${locationName}.`,
    },
    'rehab': {
      title: `Rehab Centres in ${locationName} | Drug & Alcohol Rehabilitation`,
      desc: `Rehab centres in ${locationName}: compare NHS and private treatment for alcohol and drug addiction. From free community support to private residential rehab from £3,000 — same-week admissions available.`,
    },
    'aa-meetings': {
      title: `AA Meetings in ${locationName} | Alcoholics Anonymous`,
      desc: `Find Alcoholics Anonymous (AA) meetings in ${locationName}. Open and closed meetings, times, and locations for alcohol recovery support in ${locationName}.`,
    },
    'na-meetings': {
      title: `NA Meetings in ${locationName} | Narcotics Anonymous`,
      desc: `Find Narcotics Anonymous (NA) meetings in ${locationName}. Free peer support groups for drug recovery — open to all addictions. Meeting times, formats and step-based and secular options listed.`,
    },
    'drug-treatment': {
      title: `Drug Treatment in ${locationName} | NHS & Private Services`,
      desc: `Find drug treatment services in ${locationName}. NHS and private options for heroin, cocaine, cannabis, and prescription drug addiction in ${locationName}.`,
    },
  }

  const t = templates[type]
  return {
    title: t.title,
    description: t.desc,
    openGraph: { title: t.title, description: t.desc },
  }
}

export function substanceLocationMetadata(
  substance: string,
  substanceDisplay: string,
  locationName: string
): Metadata {
  const title = `${substanceDisplay} Addiction Help in ${locationName} | Treatment & Support`
  const desc = `Find ${substanceDisplay.toLowerCase()} addiction help in ${locationName}. Local treatment services, NHS support, and recovery resources for ${substanceDisplay.toLowerCase()} addiction in ${locationName}.`
  return {
    title,
    description: desc,
    openGraph: { title, description: desc },
  }
}

export function daysSoberMetadata(days: number, type: 'sober' | 'clean'): Metadata {
  const label = type === 'sober' ? 'Sober' : 'Clean'
  const context = type === 'sober' ? 'alcohol-free' : 'drug-free'
  const { weeks, months, years, label: milestone } = getMilestoneLabel(days)

  const title = `${days} Days ${label} — What to Expect | SoberNation`
  const desc = `${days} days ${type === 'sober' ? 'sober' : 'clean'}${milestone ? ` (${milestone})` : ''}: what happens to your body and mind, what to expect, and how to keep going. A day-by-day guide to staying ${context}.`
  return {
    title,
    description: desc,
    openGraph: { title, description: desc },
  }
}

export function weeksSoberMetadata(weeks: number): Metadata {
  const days = weeks * 7
  const title = `${weeks} Week${weeks === 1 ? '' : 's'} Sober — What to Expect | SoberNation`
  const desc = `${weeks} weeks sober (${days} days): what changes physically and mentally, what to expect in recovery, and how to reach your next milestone.`
  return { title, description: desc, openGraph: { title, description: desc } }
}

export function monthsSoberMetadata(months: number): Metadata {
  const title = `${months} Month${months === 1 ? '' : 's'} Sober — What to Expect | SoberNation`
  const desc = `${months} months sober: physical and mental changes, recovery milestones, what to expect and how to stay on track with your sobriety journey.`
  return { title, description: desc, openGraph: { title, description: desc } }
}

export function yearsSoberMetadata(years: number): Metadata {
  const title = `${years} Year${years === 1 ? '' : 's'} Sober — Milestones & What to Expect | SoberNation`
  const desc = `${years} year${years === 1 ? '' : 's'} sober: celebrate your milestone, understand long-term recovery changes, and find support to keep going.`
  return { title, description: desc, openGraph: { title, description: desc } }
}

// ── JSON-LD Schema generators ────────────────────────────────────────────────

export function faqSchema(faqs: FaqItem[]): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  }
}

export function medicalWebPageSchema(opts: {
  name: string
  description: string
  url: string
  keywords?: string[]
}): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    name: opts.name,
    description: opts.description,
    url: opts.url,
    audience: {
      '@type': 'MedicalAudience',
      audienceType: 'Patient',
    },
    about: {
      '@type': 'MedicalCondition',
      name: 'Substance use disorder',
    },
    keywords: opts.keywords?.join(', '),
    publisher: {
      '@type': 'Organization',
      name: 'SoberNation',
      url: 'https://www.sobernation.co.uk',
    },
  }
}

export function breadcrumbSchema(items: BreadcrumbItem[]): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `https://www.sobernation.co.uk${item.href}`,
    })),
  }
}

export function howToSchema(opts: {
  name: string
  description?: string
  steps: Array<{ name: string; text: string }>
}): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: opts.name,
    description: opts.description,
    step: opts.steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  }
}

export function siteLinksSearchBoxSchema(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'SoberNation',
    url: 'https://www.sobernation.co.uk',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://www.sobernation.co.uk/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

export function localBusinessSchema(centre: {
  name: string
  address: string
  postcode: string
  phone?: string
  website?: string
  cqcUrl?: string
}): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalClinic',
    name: centre.name,
    address: {
      '@type': 'PostalAddress',
      streetAddress: centre.address,
      postalCode: centre.postcode,
      addressCountry: 'GB',
    },
    telephone: centre.phone,
    url: centre.website || centre.cqcUrl,
    medicalSpecialty: 'Addiction Medicine',
  }
}

// ── Milestone helpers ────────────────────────────────────────────────────────

export function getMilestoneLabel(days: number): {
  weeks: number
  months: number
  years: number
  label: string | null
} {
  const weeks = Math.floor(days / 7)
  const months = Math.floor(days / 30.44)
  const years = Math.floor(days / 365.25)

  const NAMED: Record<number, string> = {
    1: '1 day',
    3: '3 days',
    7: '1 week',
    14: '2 weeks',
    21: '3 weeks',
    30: '1 month',
    60: '2 months',
    90: '3 months',
    100: '100 days',
    180: '6 months',
    365: '1 year',
    500: '500 days',
    730: '2 years',
    1000: '1000 days',
    1095: '3 years',
    1825: '5 years',
    3650: '10 years',
    7300: '20 years',
  }

  return { weeks, months, years, label: NAMED[days] ?? null }
}

export function getSoberPhase(days: number): {
  phase: string
  description: string
} {
  if (days <= 3) return { phase: 'Acute withdrawal', description: 'The first 72 hours are the hardest — your body is adjusting rapidly.' }
  if (days <= 7) return { phase: 'Early detox', description: 'Withdrawal symptoms are peaking or beginning to ease.' }
  if (days <= 30) return { phase: 'Early recovery', description: 'Physical symptoms are settling. Sleep and mood begin to stabilise.' }
  if (days <= 90) return { phase: 'Pink cloud phase', description: 'Many people feel a wave of optimism. Stay vigilant — cravings can return.' }
  if (days <= 180) return { phase: 'Consolidation', description: 'New routines are forming. Brain chemistry is continuing to heal.' }
  if (days <= 365) return { phase: 'Foundation building', description: 'Relationships, health, and finances are starting to recover.' }
  if (days <= 730) return { phase: 'Long-term recovery', description: 'Sobriety is becoming your identity. Relapse risk is significantly lower.' }
  return { phase: 'Sustained recovery', description: 'You have built a life in recovery. Your experience can now help others.' }
}

/**
 * app/search/page.tsx
 * Site-wide search — searches locations, static guide pages, and articles.
 * Results are rendered server-side for SEO. Articles come from Supabase.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'
import { getAllLocations } from '../../lib/locations'

export const metadata: Metadata = {
  title: 'Search | SoberNation',
  description: 'Search SoberNation for rehab centres, addiction guides, sobriety tools, and support services across the UK.',
}

// Static pages that are searchable
const STATIC_PAGES = [
  { title: 'How to Stop Drinking Alcohol',      href: '/how-to-stop-drinking',               desc: 'Step-by-step guide to quitting alcohol in the UK',         tags: ['alcohol', 'guide', 'drinking'] },
  { title: 'Signs of Alcoholism',               href: '/signs-of-alcoholism',                desc: '15 warning signs of alcohol use disorder',                 tags: ['alcohol', 'signs', 'guide'] },
  { title: 'Alcohol Withdrawal Symptoms',       href: '/alcohol-withdrawal-symptoms',         desc: 'Timeline, symptoms and when to get help',                  tags: ['alcohol', 'withdrawal', 'symptoms'] },
  { title: 'Heroin Withdrawal Symptoms',        href: '/heroin-withdrawal-symptoms',          desc: 'Symptoms, timeline and detox options',                     tags: ['heroin', 'withdrawal', 'opiates'] },
  { title: 'Signs of Drug Addiction',           href: '/signs-of-drug-addiction',             desc: '12 warning signs to look out for',                        tags: ['drugs', 'addiction', 'signs'] },
  { title: 'What is Methadone?',                href: '/what-is-methadone',                   desc: 'Opioid substitution treatment explained',                  tags: ['methadone', 'treatment', 'opiates'] },
  { title: 'Withdrawal Timeline',               href: '/withdrawal-timeline',                 desc: 'What to expect when stopping different substances',        tags: ['withdrawal', 'timeline', 'detox'] },
  { title: 'Am I an Alcoholic? (WHO AUDIT)',    href: '/am-i-an-alcoholic',                   desc: 'Clinically validated 10-question alcohol screening test',  tags: ['audit', 'test', 'alcoholic', 'quiz'] },
  { title: 'Sobriety Counter',                  href: '/sobriety-counter',                    desc: 'Track your days, weeks and months sober',                  tags: ['sobriety', 'counter', 'clean', 'days'] },
  { title: 'Alcohol Units Calculator',          href: '/alcohol-units-calculator',            desc: 'Calculate your weekly alcohol units',                      tags: ['units', 'calculator', 'alcohol'] },
  { title: 'Addiction Cost Calculator',         href: '/addiction-cost-calculator',           desc: 'Calculate the financial cost of your addiction',           tags: ['cost', 'money', 'calculator'] },
  { title: 'Find Rehab',                        href: '/find-rehab',                          desc: 'Search for rehab centres near you',                        tags: ['rehab', 'find', 'centres'] },
  { title: 'AA Meetings',                       href: '/aa-meetings/london',                 desc: 'Alcoholics Anonymous meetings across the UK',               tags: ['aa', 'meetings', 'alcoholics anonymous'] },
  { title: 'NA Meetings',                       href: '/na-meetings/london',                 desc: 'Narcotics Anonymous meetings across the UK',                tags: ['na', 'meetings', 'narcotics'] },
  { title: 'Al-Anon (Family Support)',          href: '/al-anon/london',                     desc: 'Support for families and loved ones',                      tags: ['al-anon', 'family', 'support'] },
  { title: 'SMART Recovery',                    href: '/smart-recovery/london',              desc: 'Science-based alternative to the 12 steps',                tags: ['smart', 'recovery', 'meetings'] },
  { title: 'NHS Rehab (Free)',                  href: '/nhs-rehab/london',                   desc: 'Free addiction treatment through the NHS',                  tags: ['nhs', 'free', 'rehab', 'treatment'] },
  { title: 'Private Rehab',                     href: '/private-rehab/london',               desc: 'Private rehab centres with same-day admission',             tags: ['private', 'rehab', 'admission'] },
  { title: 'Residential Rehab',                 href: '/residential-rehab/london',           desc: 'Live-in addiction treatment programmes',                    tags: ['residential', 'rehab', 'live-in'] },
  { title: 'Alcohol Rehab',                     href: '/alcohol-rehab/london',               desc: 'Specialist alcohol rehab centres in the UK',               tags: ['alcohol', 'rehab', 'centres'] },
  { title: 'Drug Rehab',                        href: '/drug-rehab/london',                  desc: 'Drug treatment and rehabilitation centres',                 tags: ['drug', 'rehab', 'treatment'] },
  { title: 'Community Forum',                   href: '/community',                           desc: 'Talk to others in recovery — anonymous and free',           tags: ['community', 'forum', 'support', 'chat'] },
  { title: 'Find a Counsellor',                 href: '/counsellors/london',                 desc: 'Qualified addiction counsellors and therapists',            tags: ['counsellor', 'therapist', 'therapy'] },
  { title: 'News & Articles',                   href: '/articles',                            desc: 'Latest addiction news and recovery guides',                 tags: ['news', 'articles', 'blog'] },
]

function scoreStatic(page: typeof STATIC_PAGES[0], q: string): number {
  const lq = q.toLowerCase()
  const words = lq.split(/\s+/)
  let score = 0
  for (const w of words) {
    if (page.title.toLowerCase().includes(w)) score += 3
    if (page.desc.toLowerCase().includes(w)) score += 1
    if (page.tags.some(t => t.includes(w))) score += 2
  }
  return score
}

function scoreLocation(name: string, admin1: string, q: string): number {
  const lq = q.toLowerCase()
  const ln = name.toLowerCase()
  if (ln === lq) return 10
  if (ln.startsWith(lq)) return 8
  if (ln.includes(lq)) return 5
  if (admin1.toLowerCase().includes(lq)) return 2
  return 0
}

async function getArticleResults(q: string) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )
    const { data } = await supabase
      .from('articles')
      .select('id, title, slug, excerpt, tags')
      .or(`title.ilike.%${q}%,excerpt.ilike.%${q}%`)
      .eq('status', 'published')
      .limit(6)
    return data ?? []
  } catch {
    return []
  }
}

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const params = await searchParams
  const rawQ = params.q ?? ''
  const q = rawQ.trim()

  let locationResults: { name: string; slug: string; admin1: string }[] = []
  let staticResults: typeof STATIC_PAGES = []
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let articleResults: any[] = []

  if (q.length >= 2) {
    // Location search
    const allLocs = getAllLocations()
    locationResults = allLocs
      .map(l => ({ ...l, score: scoreLocation(l.name, l.admin1, q) }))
      .filter(l => l.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8)

    // Static pages
    staticResults = STATIC_PAGES
      .map(p => ({ ...p, score: scoreStatic(p, q) }))
      .filter(p => p.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 6)

    // Articles from Supabase
    articleResults = await getArticleResults(q)
  }

  const totalResults = locationResults.length + staticResults.length + articleResults.length
  const hasResults = totalResults > 0

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Hero */}
      <section style={{ background: 'var(--white)', borderBottom: '1px solid var(--border)', padding: '40px 20px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div className="label" style={{ marginBottom: 12 }}>Search SoberNation</div>
          <form method="GET" action="/search" style={{ display: 'flex', gap: 0, border: '1px solid var(--border-mid)', borderRadius: 'var(--radius-md)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)', marginBottom: 12 }}>
            <input
              name="q"
              type="search"
              defaultValue={q}
              autoFocus
              placeholder="Search locations, guides, tools…"
              style={{ flex: 1, padding: '14px 18px', border: 'none', outline: 'none', fontSize: 15, color: 'var(--text)', background: 'var(--white)' }}
            />
            <button type="submit" style={{ padding: '0 22px', background: 'var(--accent)', color: '#fff', border: 'none', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>
              Search
            </button>
          </form>
          {q && (
            <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: 0 }}>
              {hasResults ? `${totalResults} result${totalResults !== 1 ? 's' : ''} for "${q}"` : `No results found for "${q}"`}
            </p>
          )}
        </div>
      </section>

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '40px 20px 80px', display: 'flex', flexDirection: 'column', gap: 40 }}>

        {/* No query */}
        {!q && (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>🔍</div>
            <div style={{ fontSize: 16, color: 'var(--text-muted)' }}>Enter a search term above to find locations, guides, and resources.</div>
            <div style={{ marginTop: 24, display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
              {['London rehab', 'AA meetings Manchester', 'signs of alcoholism', 'sobriety counter', 'NHS alcohol help'].map(s => (
                <a key={s} href={`/search?q=${encodeURIComponent(s)}`} style={{ padding: '7px 14px', border: '1px solid var(--border)', borderRadius: 20, fontSize: 13, color: 'var(--text-muted)', textDecoration: 'none' }}>
                  {s}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* No results */}
        {q && !hasResults && (
          <div style={{ textAlign: 'center', padding: '40px 20px' }}>
            <p style={{ color: 'var(--text-muted)', marginBottom: 24 }}>We couldn&apos;t find anything matching &ldquo;{q}&rdquo;. Try a town name, guide topic, or service type.</p>
            <Link href="/find-rehab" style={{ padding: '12px 24px', background: 'var(--accent)', color: '#fff', borderRadius: 'var(--radius-md)', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>
              Browse all services →
            </Link>
          </div>
        )}

        {/* Location results */}
        {locationResults.length > 0 && (
          <section>
            <div className="label" style={{ marginBottom: 14 }}>Locations</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 10 }}>
              {locationResults.map(loc => (
                <Link
                  key={loc.slug}
                  href={`/rehab/${loc.slug}`}
                  style={{ display: 'flex', flexDirection: 'column', gap: 2, padding: '14px 16px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', textDecoration: 'none', transition: 'border-color 0.1s' }}
                >
                  <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>{loc.name}</span>
                  <span style={{ fontSize: 12, color: 'var(--text-light)' }}>Rehab &amp; recovery in {loc.admin1}</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Guide / static page results */}
        {staticResults.length > 0 && (
          <section>
            <div className="label" style={{ marginBottom: 14 }}>Guides &amp; Tools</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {staticResults.map(page => (
                <Link
                  key={page.href}
                  href={page.href}
                  style={{ display: 'flex', flexDirection: 'column', gap: 4, padding: '14px 16px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', textDecoration: 'none', marginBottom: 6 }}
                >
                  <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--accent)' }}>{page.title}</span>
                  <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{page.desc}</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Article results */}
        {articleResults.length > 0 && (
          <section>
            <div className="label" style={{ marginBottom: 14 }}>Articles</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {articleResults.map((a: { id: string; title: string; slug: string; excerpt: string }) => (
                <Link
                  key={a.id}
                  href={`/articles/${a.slug}`}
                  style={{ display: 'flex', flexDirection: 'column', gap: 4, padding: '14px 16px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', textDecoration: 'none' }}
                >
                  <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--accent)' }}>{a.title}</span>
                  <span style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5 }}>{a.excerpt}</span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

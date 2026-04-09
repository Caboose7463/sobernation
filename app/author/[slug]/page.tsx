/**
 * app/author/[slug]/page.tsx
 *
 * Individual author pages for E-E-A-T signals.
 * Google uses these to validate that articles are written by real,
 * credentialled people rather than anonymous content.
 *
 * Slugs match the pattern generated in the article page:
 *   author_name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
 *
 * Routes:
 *   /author/james-whitfield
 *   /author/emily-clarke
 *   /author/dr-sarah-dawson
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { AUTHORS } from '../../../components/AuthorBio'
import { getSupabase } from '../../../lib/articles'
import type { Article } from '../../../lib/articles'
import ArticleCard from '../../../components/ArticleCard'

// Build slug → author key map at import time
const SLUG_MAP: Record<string, string> = Object.fromEntries(
  Object.keys(AUTHORS).map(name => [
    name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    name,
  ])
)

export function generateStaticParams() {
  return Object.keys(SLUG_MAP).map(slug => ({ slug }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const name = SLUG_MAP[slug]
  if (!name) return {}
  const a = AUTHORS[name]
  return {
    title: `${a.name} — ${a.title} | SoberNation`,
    description: a.bio,
    openGraph: { title: `${a.name} | SoberNation`, description: a.bio },
  }
}

export default async function AuthorPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const name = SLUG_MAP[slug]
  if (!name) notFound()

  const a = AUTHORS[name]
  const initials = a.name.split(' ').map((n: string) => n[0]).join('')

  // Fetch articles by this author
  const supabase = getSupabase()
  const { data: articles } = await supabase
    .from('articles')
    .select('*')
    .eq('status', 'published')
    .eq('author_name', name)
    .order('published_at', { ascending: false })
    .limit(12)

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: a.name,
    jobTitle: a.title,
    description: a.bio,
    url: `https://www.sobernation.co.uk/author/${slug}`,
    worksFor: {
      '@type': 'Organization',
      name: 'SoberNation',
      url: 'https://www.sobernation.co.uk',
    },
    knowsAbout: [
      'Addiction recovery',
      'Drug and alcohol rehabilitation',
      'NHS addiction services',
      'Substance use disorder',
    ],
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      {/* Author hero */}
      <div style={{
        background: 'linear-gradient(135deg, #0f1f1a 0%, #1a3d30 100%)',
        padding: '56px 20px 48px',
      }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginBottom: 20 }}>
            <Link href="/" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>Home</Link>
            {' / '}
            <Link href="/articles" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>Authors</Link>
            {' / '}
            <span style={{ color: 'rgba(255,255,255,0.4)' }}>{a.name}</span>
          </div>
          <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <div style={{
              width: 80, height: 80, borderRadius: '50%',
              background: a.color, color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 28, fontWeight: 700, flexShrink: 0,
            }}>
              {initials}
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: 6 }}>
                SoberNation Author
              </div>
              <h1 style={{ fontSize: 'clamp(24px,4vw,36px)', fontWeight: 800, color: '#fff', margin: '0 0 8px', letterSpacing: '-0.02em' }}>
                {a.name}
              </h1>
              <div style={{ fontSize: 15, color: a.color, fontWeight: 600, marginBottom: 4 }}>{a.title}</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)' }}>{a.credentials}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bio + articles */}
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '40px 20px 80px' }}>

        {/* Bio */}
        <div style={{
          background: 'var(--white)', border: '1px solid var(--border)',
          borderRadius: 'var(--radius-md)', padding: '24px 28px', marginBottom: 40,
        }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-light)', marginBottom: 10 }}>
            About the author
          </div>
          <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.8, margin: 0 }}>{a.bio}</p>
        </div>

        {/* E-E-A-T credentials */}
        <div style={{
          background: 'var(--accent-pale)', border: '1px solid #c8e6df',
          borderRadius: 'var(--radius-md)', padding: '20px 24px', marginBottom: 40,
          display: 'flex', gap: 12, alignItems: 'flex-start',
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }}>
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent)', marginBottom: 4 }}>Verified credentials</div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{a.credentials}</div>
          </div>
        </div>

        {/* Articles */}
        {articles && articles.length > 0 && (
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text)', marginBottom: 20 }}>
              Articles by {a.name}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {(articles as Article[]).map(article => (
                <ArticleCard key={article.id} article={article} compact />
              ))}
            </div>
          </div>
        )}

        {(!articles || articles.length === 0) && (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)', fontSize: 14 }}>
            Articles coming soon.
          </div>
        )}
      </div>
    </div>
  )
}

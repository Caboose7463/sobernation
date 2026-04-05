import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getStoryBySlug, getApprovedStories, getInitials } from '../../../lib/stories'

export const revalidate = 3600

export async function generateStaticParams() {
  try {
    const stories = await getApprovedStories()
    return stories.map(s => ({ slug: s.slug }))
  } catch {
    return []
  }
}

export const dynamicParams = true

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const story = await getStoryBySlug(slug).catch(() => null)
  if (!story) return {}
  return {
    title: `${story.name}'s Story — ${story.daysSober} Days Sober`,
    description: `${story.name} from ${story.location} shares their personal journey recovering from ${story.substance.toLowerCase()} addiction. A real UK recovery story.`,
  }
}

function formatDaysSober(days: number): string {
  if (days >= 365) {
    const years = Math.floor(days / 365)
    const rem = days % 365
    if (rem === 0) return `${years} year${years === 1 ? '' : 's'} sober`
    return `${years} year${years === 1 ? '' : 's'} and ${Math.floor(rem / 30)} month${Math.floor(rem / 30) === 1 ? '' : 's'} sober`
  }
  if (days >= 30) {
    const months = Math.floor(days / 30)
    return `${months} month${months === 1 ? '' : 's'} sober`
  }
  return `${days} day${days === 1 ? '' : 's'} sober`
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default async function StoryPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const story = await getStoryBySlug(slug).catch(() => null)
  if (!story) notFound()

  // Get 3 other stories for "Read more" section
  let related: Awaited<ReturnType<typeof getApprovedStories>> = []
  try {
    const all = await getApprovedStories()
    related = all.filter(s => s.slug !== story.slug).slice(0, 3)
  } catch { /* silent */ }

  const paragraphs = story.story.split(/\n+/).filter(Boolean)

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Nav */}
      <nav style={{ borderBottom: '1px solid var(--border)', background: 'var(--white)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div className="container-wide" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 56 }}>
          <Link href="/" style={{ fontWeight: 700, fontSize: 15, color: 'var(--text)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 26, height: 26, borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 700 }}>S</span>
            SoberNation
          </Link>
          <Link href="/sober-stories" style={{ fontSize: 13, color: 'var(--text-muted)', textDecoration: 'none', fontWeight: 500 }}>
            ← All stories
          </Link>
        </div>
      </nav>

      <article>
        {/* Hero */}
        <section style={{ background: 'var(--white)', borderBottom: '1px solid var(--border)', padding: '48px 20px 40px' }}>
          <div className="container">
            <div className="label" style={{ marginBottom: 14 }}>Sober Story · {story.substance}</div>

            {/* Avatar */}
            <div style={{ width: 80, height: 80, borderRadius: '50%', overflow: 'hidden', marginBottom: 20, border: '3px solid var(--accent-pale)' }}>
              {story.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={story.imageUrl} alt={story.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <div style={{
                  width: '100%', height: '100%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'var(--accent)', color: '#fff',
                  fontSize: 28, fontWeight: 700,
                }}>
                  {getInitials(story.name)}
                </div>
              )}
            </div>

            <h1 style={{ fontSize: 'clamp(22px,4vw,34px)', fontWeight: 700, color: 'var(--text)', marginBottom: 10, letterSpacing: '-0.02em', lineHeight: 1.2 }}>
              {story.name}'s story
            </h1>

            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center', marginBottom: 20 }}>
              <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>📍 {story.location}</span>
              <span style={{ fontSize: 13, color: 'var(--accent)', fontWeight: 700 }}>✓ {formatDaysSober(story.daysSober)}</span>
              <span style={{ fontSize: 12, color: 'var(--text-light)' }}>Shared {formatDate(story.approvedAt ?? story.submittedAt)}</span>
            </div>
          </div>
        </section>

        {/* Story body */}
        <section style={{ padding: '40px 20px 56px' }}>
          <div className="container">
            {paragraphs.map((para, i) => (
              <p key={i} style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.9, marginBottom: 24 }}>
                {para}
              </p>
            ))}

            {/* Crisis box */}
            <div style={{ marginTop: 40, padding: 20, background: 'var(--accent-pale)', border: '1px solid #c8e6df', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--accent)', marginBottom: 6 }}>Need help right now?</div>
              <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 12 }}>
                If you or someone you love is struggling with addiction, help is available now — free and confidential.
              </p>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <a href="tel:03001236600" style={{ padding: '8px 14px', background: 'var(--accent)', color: '#fff', borderRadius: 'var(--radius-sm)', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>
                  Frank: 0300 123 6600
                </a>
                <a href="tel:116123" style={{ padding: '8px 14px', background: 'var(--white)', border: '1px solid var(--border)', color: 'var(--text)', borderRadius: 'var(--radius-sm)', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>
                  Samaritans: 116 123
                </a>
              </div>
            </div>

            {/* Share CTA */}
            <div style={{ marginTop: 32, padding: 20, background: 'var(--accent)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 6 }}>Has this story resonated with you?</div>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', marginBottom: 14, lineHeight: 1.6 }}>
                Your story could give someone else the hope they need. It takes less than 10 minutes to share.
              </p>
              <Link href="/sober-stories/share" style={{ display: 'inline-block', padding: '10px 18px', background: '#fff', color: 'var(--accent)', borderRadius: 'var(--radius-sm)', fontWeight: 700, fontSize: 13, textDecoration: 'none' }}>
                Share your story →
              </Link>
            </div>
          </div>
        </section>
      </article>

      {/* Related stories */}
      {related.length > 0 && (
        <section style={{ padding: '40px 20px 56px', background: 'var(--bg-subtle)', borderTop: '1px solid var(--border)' }}>
          <div className="container-wide">
            <div className="section-label" style={{ marginBottom: 16 }}>More stories</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
              {related.map(r => (
                <Link key={r.id} href={`/sober-stories/${r.slug}`} style={{ textDecoration: 'none' }}>
                  <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '16px 18px', transition: 'border-color 0.15s' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                      <div style={{ width: 40, height: 40, borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
                        {r.imageUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={r.imageUrl} alt={r.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                          <div style={{ width: '100%', height: '100%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 14, fontWeight: 700 }}>
                            {getInitials(r.name)}
                          </div>
                        )}
                      </div>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>{r.name}</div>
                        <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{r.location} · {r.substance}</div>
                      </div>
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--accent)', fontWeight: 600 }}>Read story →</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--border)', padding: '28px 20px', background: 'var(--white)' }}>
        <div className="container-wide" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ fontSize: 12, color: 'var(--text-light)' }}>© {new Date().getFullYear()} SoberNation</div>
          <div style={{ display: 'flex', gap: 20 }}>
            {[['Home', '/'], ['All Stories', '/sober-stories'], ['Share', '/sober-stories/share']].map(([label, href]) => (
              <Link key={href} href={href} style={{ fontSize: 12, color: 'var(--text-light)', textDecoration: 'none' }}>{label}</Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}

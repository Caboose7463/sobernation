import Link from 'next/link'
import type { Metadata } from 'next'
import { getApprovedStories, getInitials, excerptStory } from '../../lib/stories'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Sober Stories — Real UK Recovery Journeys',
  description: 'Read real stories of recovery from alcohol and drug addiction across the UK. Submitted by people who have been through it and come out the other side.',
}

const SUBSTANCE_COLOURS: Record<string, string> = {
  'Alcohol': '#1a6b5a',
  'Cocaine': '#6366f1',
  'Heroin': '#c0392b',
  'Cannabis': '#2d8a72',
  'Prescription drugs': '#d97706',
  'Alcohol & cocaine': '#7c3aed',
  'Heroin & alcohol': '#b45309',
}

function substanceColour(substance: string): string {
  for (const [key, colour] of Object.entries(SUBSTANCE_COLOURS)) {
    if (substance.toLowerCase().includes(key.toLowerCase())) return colour
  }
  return '#6b7280'
}

function formatDaysSober(days: number): string {
  if (days >= 365) {
    const years = Math.floor(days / 365)
    return `${years} year${years === 1 ? '' : 's'} sober`
  }
  if (days >= 30) {
    const months = Math.floor(days / 30)
    return `${months} month${months === 1 ? '' : 's'} sober`
  }
  return `${days} days sober`
}

export default async function SoberStoriesPage() {
  let stories: Awaited<ReturnType<typeof getApprovedStories>> = []
  try {
    stories = await getApprovedStories()
  } catch {
    // Blob may not be set up yet — show empty state
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Nav */}
      <nav style={{ borderBottom: '1px solid var(--border)', background: 'var(--white)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div className="container-wide" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 56 }}>
          <Link href="/" style={{ fontWeight: 700, fontSize: 15, color: 'var(--text)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 26, height: 26, borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 700 }}>S</span>
            SoberNation
          </Link>
          <Link href="/sober-stories/share" style={{ fontSize: 13, background: 'var(--accent)', color: '#fff', padding: '7px 14px', borderRadius: 'var(--radius-sm)', fontWeight: 600, textDecoration: 'none' }}>
            Share your story
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ background: 'var(--white)', borderBottom: '1px solid var(--border)', padding: '56px 20px 48px' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="label" style={{ marginBottom: 14 }}>Real people · Real recovery</div>
          <h1 style={{ fontSize: 'clamp(26px,4vw,40px)', fontWeight: 700, color: 'var(--text)', marginBottom: 16, letterSpacing: '-0.02em', lineHeight: 1.2 }}>
            Sober Stories
          </h1>
          <p style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.8, maxWidth: 520, margin: '0 auto 32px' }}>
            Real stories from people across the UK who have overcome alcohol and drug addiction. Every journey is different. Every one matters.
          </p>
          <Link href="/sober-stories/share" style={{ display: 'inline-block', padding: '12px 24px', background: 'var(--accent)', color: '#fff', borderRadius: 'var(--radius-md)', fontWeight: 700, fontSize: 14, textDecoration: 'none' }}>
            Share your story →
          </Link>
        </div>
      </section>

      {/* Stories grid */}
      <section style={{ padding: '48px 20px' }}>
        <div className="container-wide">
          {stories.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 20px', color: 'var(--text-muted)' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>💫</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>Stories coming soon</div>
              <p style={{ fontSize: 14, maxWidth: 400, margin: '0 auto 24px' }}>Be the first to share your recovery journey</p>
              <Link href="/sober-stories/share" style={{ padding: '10px 20px', background: 'var(--accent)', color: '#fff', borderRadius: 'var(--radius-sm)', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>
                Share your story
              </Link>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
              {stories.map(story => (
                <Link key={story.id} href={`/sober-stories/${story.slug}`} style={{ textDecoration: 'none' }}>
                  <article style={{
                    background: 'var(--white)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden',
                    transition: 'border-color 0.15s, box-shadow 0.15s',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)'
                      ;(e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-md)'
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'
                      ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
                    }}
                  >
                    {/* Avatar / photo */}
                    <div style={{ height: 180, background: 'var(--bg-subtle)', overflow: 'hidden', position: 'relative', flexShrink: 0 }}>
                      {story.imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={story.imageUrl} alt={story.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <div style={{
                          width: '100%', height: '100%',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          background: `${substanceColour(story.substance)}18`,
                          fontSize: 52, fontWeight: 700,
                          color: substanceColour(story.substance),
                          letterSpacing: '-0.02em',
                        }}>
                          {getInitials(story.name)}
                        </div>
                      )}
                      {/* Days sober badge */}
                      <div style={{
                        position: 'absolute', bottom: 10, right: 10,
                        background: substanceColour(story.substance),
                        color: '#fff', borderRadius: 20,
                        padding: '4px 10px', fontSize: 11, fontWeight: 700,
                      }}>
                        {formatDaysSober(story.daysSober)}
                      </div>
                    </div>

                    {/* Content */}
                    <div style={{ padding: '18px 18px 20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8, gap: 8 }}>
                        <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)' }}>{story.name}</span>
                        <span style={{ fontSize: 11, color: 'var(--text-light)', whiteSpace: 'nowrap' }}>{story.location}</span>
                      </div>
                      <div style={{ marginBottom: 10 }}>
                        <span style={{
                          fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em',
                          color: substanceColour(story.substance),
                          background: `${substanceColour(story.substance)}14`,
                          padding: '3px 8px', borderRadius: 10,
                        }}>
                          {story.substance}
                        </span>
                      </div>
                      <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.7, flex: 1 }}>
                        {excerptStory(story.story)}
                      </p>
                      <div style={{ marginTop: 14, fontSize: 13, color: 'var(--accent)', fontWeight: 600 }}>
                        Read full story →
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '48px 20px', background: 'var(--accent)', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 12 }}>Your story could help someone else</h2>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.85)', marginBottom: 24, lineHeight: 1.7 }}>
            You don't need to be fully recovered. You just need to be honest. Stories of all stages of recovery are welcome.
          </p>
          <Link href="/sober-stories/share" style={{ display: 'inline-block', padding: '12px 24px', background: '#fff', color: 'var(--accent)', borderRadius: 'var(--radius-md)', fontWeight: 700, fontSize: 14, textDecoration: 'none' }}>
            Share your story
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--border)', padding: '28px 20px', background: 'var(--white)' }}>
        <div className="container-wide" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ fontSize: 12, color: 'var(--text-light)' }}>© {new Date().getFullYear()} SoberNation</div>
          <div style={{ display: 'flex', gap: 20 }}>
            {[['Home', '/'], ['Privacy', '/privacy-policy'], ['About', '/about']].map(([label, href]) => (
              <Link key={href} href={href} style={{ fontSize: 12, color: 'var(--text-light)', textDecoration: 'none' }}>{label}</Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}

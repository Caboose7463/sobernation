import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { IconMessageCircle } from '@/components/icons'

async function getLatestPost() {
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('posts')
      .select('title, body, username, slug, categories(slug)')
      .eq('is_hidden', false)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()
    return data
  } catch { return null }
}

export default async function CommunityCard() {
  const post = await getLatestPost()

  return (
    <div className="container-wide" style={{ padding: '0 20px' }}>
      <div style={{
        background: '#fff',
        border: '1px solid var(--border, #e5e7eb)',
        borderRadius: 12,
        padding: '24px 28px',
        margin: '40px 0',
        display: 'flex',
        gap: 32,
        alignItems: 'center',
        flexWrap: 'wrap',
      }}>

        {/* Left — branding + post preview + CTA */}
        <div style={{ flex: 1, minWidth: 220 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 6 }}>
            <div style={{
              width: 30, height: 30, borderRadius: 8,
              background: 'var(--accent-pale, #e6f4f1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <IconMessageCircle size={15} color="var(--accent, #1d6b5a)" />
            </div>
            <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--text, #111827)' }}>
              SoberNation Community
            </span>
          </div>

          <p style={{ fontSize: 13, color: 'var(--text-muted, #6b7280)', marginBottom: 16, lineHeight: 1.5 }}>
            Real people. Real stories. Real support. Completely anonymous.
          </p>

          {post && (
            <div style={{
              background: 'var(--accent-pale, #e6f4f1)',
              borderLeft: '3px solid var(--accent, #1d6b5a)',
              borderRadius: '0 8px 8px 0',
              padding: '10px 14px',
              marginBottom: 18,
            }}>
              <p style={{ fontSize: 13, lineHeight: 1.6, margin: '0 0 4px', color: 'var(--text, #111827)', fontStyle: 'italic' }}>
                &ldquo;{post.body?.slice(0, 110)}{(post.body?.length ?? 0) > 110 ? '...' : ''}&rdquo;
              </p>
              <span style={{ fontSize: 12, color: 'var(--text-muted, #6b7280)' }}>{post.username}</span>
            </div>
          )}

          <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
            <Link
              href="/community"
              style={{
                padding: '9px 20px',
                background: 'var(--accent, #1d6b5a)',
                color: '#fff',
                borderRadius: 8,
                fontWeight: 700,
                fontSize: 13,
                textDecoration: 'none',
                display: 'inline-block',
              }}
            >
              Join the conversation
            </Link>
            <Link href="/community/support" style={{ fontSize: 13, color: 'var(--text-muted, #6b7280)', textDecoration: 'none' }}>
              Need support now?
            </Link>
          </div>
        </div>

        {/* Right — category links */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minWidth: 160 }}>
          {[
            { label: 'Daily Check-in',      href: '/community/daily'     },
            { label: 'Milestones',          href: '/community/milestones' },
            { label: 'I Need Support',      href: '/community/support'    },
            { label: 'Treatment and Rehab', href: '/community/treatment'  },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                fontSize: 13, color: 'var(--accent, #1d6b5a)',
                textDecoration: 'none', fontWeight: 500,
              }}
            >
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--accent, #1d6b5a)', flexShrink: 0, display: 'inline-block' }} />
              {item.label}
            </Link>
          ))}
        </div>

      </div>
    </div>
  )
}

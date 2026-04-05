'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/client'

const CATEGORIES = [
  { slug: 'daily',      name: 'Daily Check-in',        icon: '☀️'  },
  { slug: 'milestones', name: 'Milestones and Wins',    icon: '🏆'  },
  { slug: 'support',    name: 'I Need Support',         icon: '🆘'  },
  { slug: 'substances', name: 'Substances',             icon: '💊'  },
  { slug: 'treatment',  name: 'Treatment and Rehab',    icon: '🏥'  },
  { slug: 'family',     name: 'Family and Loved Ones',  icon: '👨‍👩‍👧' },
  { slug: 'general',    name: 'General',                icon: '💬'  },
]

export default function SubmitPage() {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [category, setCategory] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [authed, setAuthed] = useState<boolean | null>(null)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setAuthed(!!data.user))
  }, [supabase])

  if (authed === null) return null

  if (!authed) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
        <div style={{ maxWidth: 400, width: '100%', textAlign: 'center' }}>
          <div style={{ fontSize: 40, marginBottom: 16 }}>💬</div>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>Sign in to post</h1>
          <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 20 }}>You need a free account to post in the community.</p>
          <Link href="/community" style={{ padding: '12px 24px', background: 'var(--accent)', color: '#fff', borderRadius: 'var(--radius-sm)', fontWeight: 600, fontSize: 14, textDecoration: 'none', display: 'inline-block' }}>
            Join for free
          </Link>
        </div>
      </div>
    )
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim() || !body.trim() || !category) {
      setError('Please fill in all fields')
      return
    }
    setSubmitting(true)
    setError('')
    const res = await fetch('/api/community/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, body, category_slug: category }),
    })
    const data = await res.json()
    if (!res.ok) {
      setError(data.error || 'Something went wrong')
      setSubmitting(false)
      return
    }
    router.push(`/community/${category}/${data.slug}`)
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <div style={{ background: 'var(--white)', borderBottom: '1px solid var(--border)', padding: '0 20px' }}>
        <div className="container-wide" style={{ display: 'flex', alignItems: 'center', gap: 8, height: 48, fontSize: 13 }}>
          <Link href="/community" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 500 }}>Community</Link>
          <span style={{ color: 'var(--text-light)' }}>/</span>
          <span style={{ color: 'var(--text)', fontWeight: 600 }}>New Post</span>
        </div>
      </div>

      <div className="container-wide" style={{ padding: '32px 20px', maxWidth: 680 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text)', marginBottom: 24 }}>Create a post</h1>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Category */}
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', display: 'block', marginBottom: 8 }}>Category</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 8 }}>
              {CATEGORIES.map(cat => (
                <button
                  key={cat.slug}
                  type="button"
                  onClick={() => setCategory(cat.slug)}
                  style={{
                    padding: '10px 12px', border: `2px solid ${category === cat.slug ? 'var(--accent)' : 'var(--border)'}`,
                    borderRadius: 'var(--radius-sm)', background: category === cat.slug ? 'var(--accent-pale)' : 'var(--white)',
                    cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s',
                    fontSize: 13, fontWeight: 500, color: category === cat.slug ? 'var(--accent)' : 'var(--text)',
                  }}
                >
                  <span style={{ marginRight: 6 }}>{cat.icon}</span>
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', display: 'block', marginBottom: 8 }}>Title</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              maxLength={200}
              placeholder="What do you want to share or ask?"
              style={{ width: '100%', padding: '11px 14px', border: '1px solid var(--border-mid)', borderRadius: 'var(--radius-sm)', fontSize: 15, outline: 'none', boxSizing: 'border-box', color: 'var(--text)', background: 'var(--bg)', fontFamily: 'inherit' }}
            />
          </div>

          {/* Body */}
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', display: 'block', marginBottom: 8 }}>Your post</label>
            <textarea
              value={body}
              onChange={e => setBody(e.target.value)}
              placeholder="Write as much or as little as you need to..."
              rows={8}
              style={{ width: '100%', padding: '11px 14px', border: '1px solid var(--border-mid)', borderRadius: 'var(--radius-sm)', fontSize: 14, resize: 'vertical', outline: 'none', boxSizing: 'border-box', color: 'var(--text)', background: 'var(--bg)', lineHeight: 1.65, fontFamily: 'inherit' }}
            />
          </div>

          {error && <div style={{ fontSize: 13, color: '#c0392b', padding: '10px 14px', background: '#fef2f2', borderRadius: 'var(--radius-sm)' }}>{error}</div>}

          <div style={{ display: 'flex', gap: 12 }}>
            <button
              type="submit"
              disabled={submitting}
              style={{ padding: '12px 28px', background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: 'var(--radius-sm)', fontWeight: 700, fontSize: 14, cursor: submitting ? 'not-allowed' : 'pointer' }}
            >
              {submitting ? 'Posting...' : 'Post to community'}
            </button>
            <Link href="/community" style={{ padding: '12px 20px', border: '1px solid var(--border)', color: 'var(--text-muted)', borderRadius: 'var(--radius-sm)', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

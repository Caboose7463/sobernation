'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/client'
import { User } from '@supabase/supabase-js'

const CATEGORIES = [
  { slug: 'daily',      name: 'Daily Check-in',        icon: '☀️'  },
  { slug: 'milestones', name: 'Milestones and Wins',    icon: '🏆'  },
  { slug: 'support',    name: 'I Need Support',         icon: '🆘'  },
  { slug: 'substances', name: 'Substances',             icon: '💊'  },
  { slug: 'treatment',  name: 'Treatment and Rehab',    icon: '🏥'  },
  { slug: 'family',     name: 'Family and Loved Ones',  icon: '👨‍👩‍👧' },
  { slug: 'general',    name: 'General',                icon: '💬'  },
]

type Post = {
  id: string
  title: string
  slug: string
  body: string
  username: string
  upvotes: number
  comment_count: number
  created_at: string
  categories: { slug: string; name: string; icon: string }
}

function timeAgo(iso: string) {
  const secs = Math.floor((Date.now() - new Date(iso).getTime()) / 1000)
  if (secs < 60) return `${secs}s ago`
  if (secs < 3600) return `${Math.floor(secs / 60)}m ago`
  if (secs < 86400) return `${Math.floor(secs / 3600)}h ago`
  return `${Math.floor(secs / 86400)}d ago`
}

export default function CommunityPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [sort, setSort] = useState<'hot' | 'new' | 'top'>('hot')
  const [user, setUser] = useState<User | null>(null)
  const [showSignIn, setShowSignIn] = useState(false)
  const [showSignUp, setShowSignUp] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
  }, [supabase])

  useEffect(() => {
    setLoading(true)
    fetch(`/api/community/posts?sort=${sort}`)
      .then(r => r.json())
      .then(data => { setPosts(Array.isArray(data) ? data : []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [sort])

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', fontFamily: 'var(--font-body)' }}>
      {/* Header */}
      <div style={{ background: 'var(--white)', borderBottom: '1px solid var(--border)', padding: '0 20px' }}>
        <div className="container-wide" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 56 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Link href="/" style={{ fontWeight: 700, fontSize: 15, color: 'var(--text)', textDecoration: 'none' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 26, height: 26, borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 700 }}>S</span>
                SoberNation
              </span>
            </Link>
            <span style={{ color: 'var(--text-light)', fontSize: 13 }}>/</span>
            <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>Community</span>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            {user ? (
              <>
                <Link href="/community/submit" style={{ padding: '8px 16px', background: 'var(--accent)', color: '#fff', borderRadius: 'var(--radius-sm)', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>
                  + New Post
                </Link>
                <button onClick={() => supabase.auth.signOut().then(() => setUser(null))} style={{ fontSize: 12, color: 'var(--text-light)', background: 'none', border: 'none', cursor: 'pointer' }}>
                  Sign out
                </button>
              </>
            ) : (
              <>
                <button onClick={() => setShowSignIn(true)} style={{ fontSize: 13, fontWeight: 600, color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer' }}>Sign in</button>
                <button onClick={() => setShowSignUp(true)} style={{ padding: '8px 16px', background: 'var(--accent)', color: '#fff', borderRadius: 'var(--radius-sm)', fontSize: 13, fontWeight: 600, border: 'none', cursor: 'pointer' }}>Join</button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="container-wide" style={{ padding: '24px 20px', display: 'grid', gridTemplateColumns: '1fr 280px', gap: 24, alignItems: 'start' }}>
        {/* Main feed */}
        <div>
          {/* Sort tabs */}
          <div style={{ display: 'flex', gap: 4, marginBottom: 16, background: 'var(--bg-subtle)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: 4, width: 'fit-content' }}>
            {(['hot', 'new', 'top'] as const).map(s => (
              <button key={s} onClick={() => setSort(s)} style={{ padding: '6px 16px', fontSize: 13, fontWeight: 600, border: 'none', cursor: 'pointer', borderRadius: 'calc(var(--radius-md) - 2px)', background: sort === s ? 'var(--white)' : 'transparent', color: sort === s ? 'var(--text)' : 'var(--text-muted)', boxShadow: sort === s ? 'var(--shadow-sm)' : 'none', textTransform: 'capitalize', transition: 'all 0.15s' }}>
                {s === 'hot' ? '🔥 Hot' : s === 'new' ? '✨ New' : '⬆️ Top'}
              </button>
            ))}
          </div>

          {/* Crisis banner */}
          <div style={{ background: '#fef3f2', border: '1px solid #fecaca', borderRadius: 'var(--radius-md)', padding: '12px 16px', marginBottom: 16, fontSize: 13, color: '#991b1b', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span>🆘</span>
            <span>If you are in crisis please call <strong>Samaritans: 116 123</strong> or <strong>FRANK: 0300 123 6600</strong></span>
          </div>

          {loading ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[...Array(5)].map((_, i) => <div key={i} style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', height: 100, opacity: 0.5 }} />)}
            </div>
          ) : posts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>💬</div>
              <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--text)', marginBottom: 8 }}>No posts yet</div>
              <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 20 }}>Be the first to start a conversation</p>
              <button onClick={() => setShowSignUp(true)} style={{ padding: '10px 20px', background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: 'var(--radius-sm)', fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>
                Join and post
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {posts.map(post => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* About */}
          <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: 18 }}>
            <div style={{ width: 40, height: 40, borderRadius: 8, background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12, fontSize: 20 }}>💬</div>
            <h2 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>SoberNation Community</h2>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 16 }}>A place to share your story, ask questions and support others in recovery. Anonymous. No judgement. Real people.</p>
            {user ? (
              <Link href="/community/submit" style={{ display: 'block', width: '100%', padding: '10px 0', background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: 'var(--radius-sm)', fontWeight: 600, fontSize: 14, cursor: 'pointer', textAlign: 'center', textDecoration: 'none' }}>
                Create post
              </Link>
            ) : (
              <button onClick={() => setShowSignUp(true)} style={{ width: '100%', padding: '10px 0', background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: 'var(--radius-sm)', fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>
                Join the community
              </button>
            )}
          </div>

          {/* Categories */}
          <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: 18 }}>
            <h3 style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Categories</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {CATEGORIES.map(cat => (
                <Link key={cat.slug} href={`/community/${cat.slug}`} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderRadius: 'var(--radius-sm)', textDecoration: 'none', color: 'var(--text)', fontSize: 13, hover: undefined, transition: 'background 0.1s' }} className="community-cat-link">
                  <span style={{ fontSize: 16 }}>{cat.icon}</span>
                  <span style={{ fontWeight: 500 }}>{cat.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Auth modals */}
      {showSignIn && <SignInModal onClose={() => setShowSignIn(false)} onSuccess={(u) => { setUser(u); setShowSignIn(false) }} onSwitchToSignUp={() => { setShowSignIn(false); setShowSignUp(true) }} supabase={supabase} />}
      {showSignUp && <SignUpModal onClose={() => setShowSignUp(false)} onSuccess={(u) => { setUser(u); setShowSignUp(false) }} onSwitchToSignIn={() => { setShowSignUp(false); setShowSignIn(true) }} />}
    </div>
  )
}

function PostCard({ post }: { post: Post }) {
  return (
    <Link href={`/community/${post.categories?.slug}/${post.slug}`} style={{ textDecoration: 'none' }}>
      <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '16px 18px', cursor: 'pointer', transition: 'border-color 0.15s' }} className="post-card-hover">
        <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 6, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 11, background: 'var(--accent-pale)', color: 'var(--accent)', padding: '2px 8px', borderRadius: 10, fontWeight: 600, whiteSpace: 'nowrap' }}>
                {post.categories?.icon} {post.categories?.name}
              </span>
              <span style={{ fontSize: 11, color: 'var(--text-light)' }}>
                {post.username} &middot; {timeAgo(post.created_at)}
              </span>
            </div>
            <h3 style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)', margin: '0 0 6px', lineHeight: 1.4 }}>{post.title}</h3>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: 0, lineHeight: 1.5, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
              {post.body}
            </p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 16, marginTop: 12, fontSize: 12, color: 'var(--text-light)' }}>
          <span>⬆️ {post.upvotes}</span>
          <span>💬 {post.comment_count} comments</span>
        </div>
      </div>
    </Link>
  )
}

function SignInModal({ onClose, onSuccess, onSwitchToSignUp, supabase }: {
  onClose: () => void
  onSuccess: (u: User) => void
  onSwitchToSignUp: () => void
  supabase: ReturnType<typeof createClient>
}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { data, error: err } = await supabase.auth.signInWithPassword({ email, password })
    if (err) { setError(err.message); setLoading(false); return }
    if (data.user) onSuccess(data.user)
  }

  return (
    <Modal onClose={onClose}>
      <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>Welcome back</h2>
      <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 20 }}>Sign in to your SoberNation account</p>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required style={inputStyle} />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required style={inputStyle} />
        {error && <div style={{ fontSize: 13, color: '#c0392b' }}>{error}</div>}
        <button type="submit" disabled={loading} style={btnStyle}>{loading ? 'Signing in...' : 'Sign in'}</button>
      </form>
      <p style={{ fontSize: 13, textAlign: 'center', marginTop: 16, color: 'var(--text-muted)' }}>
        No account? <button onClick={onSwitchToSignUp} style={{ color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>Join for free</button>
      </p>
    </Modal>
  )
}

function SignUpModal({ onClose, onSuccess, onSwitchToSignIn }: {
  onClose: () => void
  onSuccess: (u: User) => void
  onSwitchToSignIn: () => void
}) {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const res = await fetch('/api/community/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    })
    const data = await res.json()
    if (!res.ok) { setError(data.error); setLoading(false); return }

    // Sign in after signup
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({ email, password })
    if (signInError || !signInData.user) { setError('Account created but could not sign in. Please try signing in.'); setLoading(false); return }
    onSuccess(signInData.user)
  }

  return (
    <Modal onClose={onClose}>
      <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>Join SoberNation</h2>
      <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 20 }}>Your username is the only thing others see. Your email stays private.</p>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <input type="text" placeholder="Choose a username" value={username} onChange={e => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))} required minLength={3} maxLength={20} style={inputStyle} />
        <input type="email" placeholder="Your email (kept private)" value={email} onChange={e => setEmail(e.target.value)} required style={inputStyle} />
        <input type="password" placeholder="Password (min 8 characters)" value={password} onChange={e => setPassword(e.target.value)} required minLength={8} style={inputStyle} />
        {error && <div style={{ fontSize: 13, color: '#c0392b' }}>{error}</div>}
        <button type="submit" disabled={loading} style={btnStyle}>{loading ? 'Creating account...' : 'Join for free'}</button>
      </form>
      <p style={{ fontSize: 13, textAlign: 'center', marginTop: 16, color: 'var(--text-muted)' }}>
        Already a member? <button onClick={onSwitchToSignIn} style={{ color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>Sign in</button>
      </p>
    </Modal>
  )
}

function Modal({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 20 }}>
      <div onClick={e => e.stopPropagation()} style={{ background: 'var(--white)', borderRadius: 'var(--radius-md)', padding: 28, width: '100%', maxWidth: 400, boxShadow: 'var(--shadow-lg)', position: 'relative' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 12, right: 14, background: 'none', border: 'none', fontSize: 18, cursor: 'pointer', color: 'var(--text-light)' }}>✕</button>
        {children}
      </div>
    </div>
  )
}

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '11px 14px', border: '1px solid var(--border-mid)', borderRadius: 'var(--radius-sm)',
  fontSize: 14, outline: 'none', boxSizing: 'border-box', color: 'var(--text)', background: 'var(--bg)',
}

const btnStyle: React.CSSProperties = {
  width: '100%', padding: '12px', background: 'var(--accent)', color: '#fff', border: 'none',
  borderRadius: 'var(--radius-sm)', fontWeight: 700, fontSize: 14, cursor: 'pointer',
}

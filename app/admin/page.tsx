'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import type { Story } from '../../lib/stories'

const CORRECT_PIN = process.env.NEXT_PUBLIC_ADMIN_PIN_HINT ?? ''

function getInitials(name: string) {
  return name.trim().split(/\s+/).map(w => w[0]?.toUpperCase() ?? '').slice(0, 2).join('')
}

function excerptStory(story: string, chars = 180) {
  return story.length <= chars ? story : story.slice(0, chars).replace(/\s\S*$/, '') + '…'
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

type Tab = 'pending' | 'all'

export default function AdminPage() {
  const [pin, setPin] = useState('')
  const [authed, setAuthed] = useState(false)
  const [pinError, setPinError] = useState('')
  const [stories, setStories] = useState<Story[]>([])
  const [loading, setLoading] = useState(false)
  const [tab, setTab] = useState<Tab>('pending')
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [toast, setToast] = useState('')

  function handlePinSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (pin === '7463') {
      setAuthed(true)
      sessionStorage.setItem('admin_pin', pin)
    } else {
      setPinError('Incorrect PIN')
      setPin('')
    }
  }

  // Check sessionStorage on mount
  useEffect(() => {
    const saved = sessionStorage.getItem('admin_pin')
    if (saved === '7463') setAuthed(true)
  }, [])

  // Load stories when authed
  useEffect(() => {
    if (!authed) return
    loadStories()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authed, tab])

  async function loadStories() {
    setLoading(true)
    try {
      const endpoint = tab === 'pending' ? '/api/stories/pending' : '/api/stories'
      const headers: Record<string, string> = tab === 'pending' ? { 'x-admin-pin': '7463' } : {}
      const res = await fetch(endpoint, { headers })
      const data = await res.json()
      setStories(Array.isArray(data) ? data : [])
    } catch {
      setStories([])
    } finally {
      setLoading(false)
    }
  }

  async function handleAction(id: string, status: 'approved' | 'rejected') {
    setActionLoading(id)
    try {
      const res = await fetch(`/api/stories/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, pin: '7463' }),
      })
      if (res.ok) {
        setStories(prev => prev.filter(s => s.id !== id))
        setToast(status === 'approved' ? '✓ Story approved and published' : '✗ Story rejected')
        setTimeout(() => setToast(''), 3000)
      }
    } finally {
      setActionLoading(null)
    }
  }

  // PIN screen
  if (!authed) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
        <div style={{ maxWidth: 360, width: '100%' }}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: 20 }}>🔐</div>
            <h1 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>Admin Dashboard</h1>
            <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>Enter your PIN to continue</p>
          </div>
          <form onSubmit={handlePinSubmit}>
            <input
              type="password"
              inputMode="numeric"
              value={pin}
              onChange={e => { setPin(e.target.value); setPinError('') }}
              placeholder="Enter PIN"
              maxLength={8}
              autoFocus
              style={{ width: '100%', padding: '14px 16px', border: `1px solid ${pinError ? '#c0392b' : 'var(--border-mid)'}`, borderRadius: 'var(--radius-md)', fontSize: 20, textAlign: 'center', letterSpacing: '0.3em', outline: 'none', boxSizing: 'border-box', marginBottom: pinError ? 8 : 16 }}
            />
            {pinError && <div style={{ fontSize: 13, color: '#c0392b', textAlign: 'center', marginBottom: 14 }}>{pinError}</div>}
            <button type="submit" style={{ width: '100%', padding: '13px', background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: 'var(--radius-md)', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>
              Unlock
            </button>
          </form>
          <div style={{ textAlign: 'center', marginTop: 20 }}>
            <Link href="/" style={{ fontSize: 12, color: 'var(--text-light)', textDecoration: 'none' }}>← Back to site</Link>
          </div>
        </div>
      </div>
    )
  }

  const filtered = tab === 'all' ? stories : stories
  const pendingCount = stories.length

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Toast */}
      {toast && (
        <div style={{ position: 'fixed', top: 16, right: 16, zIndex: 1000, background: 'var(--accent)', color: '#fff', padding: '12px 18px', borderRadius: 'var(--radius-md)', fontSize: 13, fontWeight: 600, boxShadow: 'var(--shadow-md)' }}>
          {toast}
        </div>
      )}

      {/* Header */}
      <div style={{ background: 'var(--white)', borderBottom: '1px solid var(--border)', padding: '0 20px' }}>
        <div className="container-wide" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 56 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <Link href="/" style={{ fontWeight: 700, fontSize: 15, color: 'var(--text)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 26, height: 26, borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 700 }}>S</span>
              SoberNation
            </Link>
            <span style={{ fontSize: 12, color: 'var(--text-light)' }}>/ Admin</span>
          </div>
          <button
            onClick={() => { sessionStorage.removeItem('admin_pin'); setAuthed(false) }}
            style={{ fontSize: 12, color: 'var(--text-light)', background: 'none', border: 'none', cursor: 'pointer', padding: '6px 10px' }}
          >
            Lock
          </button>
        </div>
      </div>

      <div className="container-wide" style={{ padding: '32px 20px' }}>
        {/* Title + stats */}
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>Story Submissions</h1>
          <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>Review and approve user-submitted sober stories</p>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 24, background: 'var(--bg-subtle)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: 4, width: 'fit-content' }}>
          {(['pending', 'all'] as Tab[]).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                padding: '7px 16px', fontSize: 13, fontWeight: 600, border: 'none', cursor: 'pointer',
                borderRadius: 'calc(var(--radius-md) - 2px)',
                background: tab === t ? 'var(--white)' : 'transparent',
                color: tab === t ? 'var(--text)' : 'var(--text-muted)',
                boxShadow: tab === t ? 'var(--shadow-sm)' : 'none',
                transition: 'all 0.15s',
              }}
            >
              {t === 'pending' ? `Pending (${loading ? '…' : pendingCount})` : 'Approved'}
            </button>
          ))}
        </div>

        {/* Stories list */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>Loading…</div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>✓</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>
              {tab === 'pending' ? 'No pending stories' : 'No approved stories yet'}
            </div>
            <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>
              {tab === 'pending' ? 'All caught up!' : 'Seed the stories to populate the site'}
            </p>
            {tab === 'all' && (
              <button
                onClick={async () => {
                  const res = await fetch('/api/stories/seed', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ pin: '7463' }) })
                  const data = await res.json()
                  if (data.success) { setToast(`✓ ${data.count} stories seeded`); setTimeout(() => setToast(''), 3000); loadStories() }
                }}
                style={{ marginTop: 16, padding: '10px 20px', background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: 'var(--radius-sm)', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}
              >
                Seed 10 stories now
              </button>
            )}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {filtered.map(story => (
              <div key={story.id} style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '18px 20px', display: 'grid', gridTemplateColumns: '48px 1fr auto', gap: 14, alignItems: 'start' }}>
                {/* Avatar */}
                <div style={{ width: 48, height: 48, borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
                  {story.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={story.imageUrl} alt={story.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ width: '100%', height: '100%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 16, fontWeight: 700 }}>
                      {getInitials(story.name)}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 4, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>{story.name}</span>
                    <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{story.location}</span>
                    <span style={{ fontSize: 11, background: 'var(--accent-pale)', color: 'var(--accent)', padding: '2px 8px', borderRadius: 10, fontWeight: 600 }}>{story.substance}</span>
                    <span style={{ fontSize: 11, color: 'var(--text-light)' }}>{story.daysSober} days sober</span>
                    <span style={{ fontSize: 11, color: 'var(--text-light)' }}>{formatDate(story.submittedAt)}</span>
                  </div>
                  <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6 }}>
                    {excerptStory(story.story)}
                  </p>
                  {story.status === 'approved' && (
                    <div style={{ marginTop: 6 }}>
                      <Link href={`/sober-stories/${story.slug}`} target="_blank" style={{ fontSize: 12, color: 'var(--accent)', fontWeight: 600 }}>
                        View live →
                      </Link>
                    </div>
                  )}
                </div>

                {/* Actions */}
                {tab === 'pending' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <button
                      onClick={() => handleAction(story.id, 'approved')}
                      disabled={actionLoading === story.id}
                      style={{ padding: '8px 14px', background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: 'var(--radius-sm)', fontWeight: 600, fontSize: 12, cursor: 'pointer', whiteSpace: 'nowrap' }}
                    >
                      {actionLoading === story.id ? '…' : '✓ Approve'}
                    </button>
                    <button
                      onClick={() => handleAction(story.id, 'rejected')}
                      disabled={actionLoading === story.id}
                      style={{ padding: '8px 14px', background: 'var(--white)', border: '1px solid var(--border)', color: 'var(--text-muted)', borderRadius: 'var(--radius-sm)', fontWeight: 600, fontSize: 12, cursor: 'pointer' }}
                    >
                      ✗ Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Seed button (always visible in pending tab if empty) */}
        {tab === 'pending' && !loading && stories.length === 0 && (
          <div style={{ marginTop: 24, textAlign: 'center' }}>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 12 }}>Want to populate the site with seed stories?</p>
            <button
              onClick={async () => {
                const res = await fetch('/api/stories/seed', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ pin: '7463' }) })
                const data = await res.json()
                if (data.success) { setToast(`✓ ${data.count} stories seeded and approved`); setTimeout(() => setToast(''), 4000); setTab('all') }
              }}
              style={{ padding: '10px 20px', background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: 'var(--radius-sm)', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}
            >
              Seed 10 stories now
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

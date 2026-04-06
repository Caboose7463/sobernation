'use client'
import { useState } from 'react'

interface Props {
  variant?: 'inline' | 'banner'
  source?: string
}

export default function NewsletterSignup({ variant = 'inline', source = 'website' }: Props) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
    setStatus('loading')
    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source }),
      })
      const data = await res.json()
      if (res.ok) {
        setStatus('success')
        setMessage(data.message ?? 'You\'re subscribed!')
        setEmail('')
      } else {
        setStatus('error')
        setMessage(data.error ?? 'Something went wrong.')
      }
    } catch {
      setStatus('error')
      setMessage('Something went wrong. Please try again.')
    }
  }

  if (variant === 'banner') {
    return (
      <div style={{
        background: 'linear-gradient(135deg, #1a6b5a 0%, #2d8a72 100%)',
        padding: '28px 24px',
        borderRadius: 'var(--radius-lg)',
        color: '#fff',
      }}>
        <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 6 }}>
          Weekly recovery insights, straight to your inbox
        </div>
        <div style={{ fontSize: 13, opacity: 0.85, marginBottom: 20, lineHeight: 1.6 }}>
          Join 1,000+ people getting practical guides, sobriety tips, and UK addiction news every week. No spam.
        </div>

        {status === 'success' ? (
          <div style={{ padding: '12px 16px', background: 'rgba(255,255,255,0.15)', borderRadius: 'var(--radius-md)', fontSize: 14, fontWeight: 600 }}>
            ✓ {message}
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              style={{
                flex: 1,
                minWidth: 200,
                padding: '11px 16px',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                fontSize: 14,
                outline: 'none',
                color: 'var(--text)',
              }}
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              style={{
                padding: '11px 20px',
                background: '#fff',
                color: '#1a6b5a',
                border: 'none',
                borderRadius: 'var(--radius-sm)',
                fontWeight: 700,
                fontSize: 14,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
            >
              {status === 'loading' ? 'Subscribing…' : 'Subscribe free'}
            </button>
          </form>
        )}
        {status === 'error' && (
          <div style={{ marginTop: 8, fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>{message}</div>
        )}
        <div style={{ marginTop: 12, fontSize: 11, opacity: 0.6 }}>
          Free. Unsubscribe any time. No spam — ever.
        </div>
      </div>
    )
  }

  // inline variant
  return (
    <div style={{
      background: 'var(--accent-pale)',
      border: '1px solid #c8e6df',
      borderRadius: 'var(--radius-md)',
      padding: '24px',
    }}>
      <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--accent)', marginBottom: 6 }}>
        Get weekly recovery insights
      </div>
      <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 16, lineHeight: 1.6 }}>
        Practical guides, sobriety milestones, and UK addiction news — straight to your inbox. Free, no spam.
      </div>

      {status === 'success' ? (
        <div style={{ padding: '12px 16px', background: '#fff', borderRadius: 'var(--radius-sm)', fontSize: 14, fontWeight: 600, color: 'var(--accent)', border: '1px solid #c8e6df' }}>
          ✓ {message}
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Your email address"
            required
            style={{
              flex: 1,
              minWidth: 180,
              padding: '10px 14px',
              border: '1px solid #c8e6df',
              borderRadius: 'var(--radius-sm)',
              fontSize: 14,
              outline: 'none',
              color: 'var(--text)',
              background: '#fff',
            }}
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            style={{
              padding: '10px 18px',
              background: 'var(--accent)',
              color: '#fff',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              fontWeight: 700,
              fontSize: 14,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
          >
            {status === 'loading' ? 'Subscribing…' : 'Subscribe'}
          </button>
        </form>
      )}
      {status === 'error' && (
        <div style={{ marginTop: 8, fontSize: 12, color: '#c0392b' }}>{message}</div>
      )}
    </div>
  )
}

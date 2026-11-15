'use client'

/**
 * Contact page form — posts to /api/contact, which saves the message to
 * Supabase and emails the site owner.
 */
import { useState } from 'react'

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 14px',
  borderRadius: 8,
  border: '1.5px solid var(--border)',
  fontSize: 14,
  outline: 'none',
  boxSizing: 'border-box',
  fontFamily: 'inherit',
}

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    setStatus('sending')
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fd.get('name'),
          email: fd.get('email'),
          subject: fd.get('subject'),
          message: fd.get('message'),
          website: fd.get('website'),
          sourcePage: window.location.pathname + (document.referrer ? ` (arrived from ${document.referrer})` : ''),
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error || 'Something went wrong. Please try again.')
      setStatus('sent')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div role="status" style={{ background: '#fff', border: '1.5px solid var(--border)', borderRadius: 14, padding: '32px', textAlign: 'center' }}>
        <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--text)', marginBottom: 8 }}>Thank you — message sent</div>
        <p style={{ fontSize: 15, color: 'var(--text-muted)', margin: 0 }}>We&apos;ll get back to you within 1–2 working days.</p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ background: '#fff', border: '1.5px solid var(--border)', borderRadius: 14, padding: '32px', display: 'flex', flexDirection: 'column', gap: 16 }}>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div>
          <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)', display: 'block', marginBottom: 6 }}>Your name *</label>
          <input name="name" required placeholder="Jane Smith" style={inputStyle} />
        </div>
        <div>
          <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)', display: 'block', marginBottom: 6 }}>Email address *</label>
          <input type="email" name="email" required placeholder="jane@example.com" style={inputStyle} />
        </div>
      </div>

      <div>
        <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)', display: 'block', marginBottom: 6 }}>Subject *</label>
        <select name="subject" required style={{ ...inputStyle, background: '#fff', color: 'var(--text)' }}>
          <option value="">Select a topic...</option>
          <option>General enquiry</option>
          <option>Correction request — inaccurate content</option>
          <option>Listing or directory query</option>
          <option>Advertising enquiry</option>
          <option>Press or media</option>
          <option>Partnership or collaboration</option>
          <option>Data or privacy request</option>
          <option>Other</option>
        </select>
      </div>

      <div>
        <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)', display: 'block', marginBottom: 6 }}>Message *</label>
        <textarea name="message" required placeholder="Tell us how we can help..." rows={5} style={{ ...inputStyle, resize: 'vertical' }} />
      </div>

      <div style={{ background: 'var(--bg)', borderRadius: 8, padding: '12px 14px', fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.5, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}>
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
          <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
        </svg>
        <span>
          <strong>Not for crisis support.</strong> If you or someone you know needs immediate help, call{' '}
          <a href="tel:03001236600" style={{ color: 'var(--accent)', fontWeight: 700, textDecoration: 'none' }}>Frank: 0300 123 6600</a>{' '}
          (free, 24/7) or <a href="tel:999" style={{ color: '#dc2626', fontWeight: 700, textDecoration: 'none' }}>999</a> in an emergency.
        </span>
      </div>

      {/* Honeypot for bots — hidden from people */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }} />

      {status === 'error' && (
        <div role="alert" style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#991b1b', borderRadius: 8, padding: '10px 14px', fontSize: 14 }}>
          {error}
        </div>
      )}

      <button type="submit" disabled={status === 'sending'} style={{ padding: '14px', borderRadius: 10, border: 'none', background: 'var(--accent)', color: '#fff', fontSize: 15, fontWeight: 700, cursor: status === 'sending' ? 'wait' : 'pointer', opacity: status === 'sending' ? 0.7 : 1 }}>
        {status === 'sending' ? 'Sending…' : 'Send message'}
      </button>
    </form>
  )
}

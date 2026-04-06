'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

function formatSlug(slug: string) {
  return slug.split('-').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
}

export default function EditContactPage() {
  const router = useRouter()
  const params = useParams()
  const locationSlug = params.locationSlug as string

  const [phone, setPhone] = useState('')
  const [website, setWebsite] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    async function load() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { router.replace('/verify/login'); return }

      const { data: owner } = await supabase
        .from('listing_owners')
        .select('phone, website, contact_email, locations')
        .eq('user_id', session.user.id)
        .single()

      if (owner) {
        // Check this location belongs to the owner
        if (!owner.locations?.includes(locationSlug)) {
          router.replace('/dashboard')
          return
        }
        setPhone(owner.phone ?? '')
        setWebsite(owner.website ?? '')
        setContactEmail(owner.contact_email ?? '')
      }
      setLoading(false)
    }
    load()
  }, [router, locationSlug])

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')
    setSaved(false)

    const { data: { session } } = await supabase.auth.getSession()
    if (!session) { router.replace('/verify/login'); return }

    const res = await fetch('/api/listings/update-contact', {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify({ phone, website, contactEmail }),
    })

    const result = await res.json()
    if (!res.ok) {
      setError(result.error || 'Failed to save.')
    } else {
      setSaved(true)
    }
    setSaving(false)
  }

  if (loading) {
    return (
      <main style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 28, height: 28, border: '3px solid var(--border)', borderTopColor: 'var(--accent)', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </main>
    )
  }

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg)', padding: '40px 20px' }}>
      <div style={{ maxWidth: 520, margin: '0 auto' }}>
        {/* Back link */}
        <Link href="/dashboard" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--text-muted)', textDecoration: 'none', marginBottom: 28 }}>
          <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd"/>
          </svg>
          Back to dashboard
        </Link>

        <h1 style={{ fontSize: 26, fontWeight: 700, marginBottom: 6 }}>Edit contact info</h1>
        <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 32 }}>
          For <strong>{formatSlug(locationSlug)}</strong> — changes apply to all your listings instantly.
        </p>

        <form onSubmit={handleSave} style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 14, padding: '28px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div>
              <label style={labelStyle}>Phone number</label>
              <input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="e.g. 0800 123 4567"
                style={inputStyle}
              />
              <p style={hintStyle}>This will appear as the primary contact number on your listing.</p>
            </div>
            <div>
              <label style={labelStyle}>Website URL</label>
              <input
                type="url"
                value={website}
                onChange={e => setWebsite(e.target.value)}
                placeholder="https://yourwebsite.com"
                style={inputStyle}
              />
              <p style={hintStyle}>Replaces any website we have on file from our directory data.</p>
            </div>
            <div>
              <label style={labelStyle}>Contact email</label>
              <input
                type="email"
                value={contactEmail}
                onChange={e => setContactEmail(e.target.value)}
                placeholder="enquiries@yourpractice.com"
                style={inputStyle}
              />
              <p style={hintStyle}>For enquiries from people on the directory page.</p>
            </div>
          </div>

          {error && (
            <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, padding: '10px 14px', fontSize: 13, color: '#991b1b', marginTop: 20 }}>
              {error}
            </div>
          )}

          {saved && (
            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 8, padding: '10px 14px', fontSize: 13, color: '#166534', marginTop: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
              <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
              Contact info saved successfully.
            </div>
          )}

          <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
            <button
              type="submit"
              disabled={saving}
              style={{
                flex: 1,
                background: saving ? 'var(--border-mid)' : 'var(--accent)',
                color: '#fff',
                border: 'none',
                borderRadius: 10,
                padding: '13px',
                fontWeight: 600,
                fontSize: 15,
                cursor: saving ? 'not-allowed' : 'pointer',
              }}
            >
              {saving ? 'Saving…' : 'Save changes'}
            </button>
            <Link
              href="/dashboard"
              style={{
                padding: '13px 20px',
                border: '1px solid var(--border)',
                borderRadius: 10,
                fontSize: 14,
                color: 'var(--text-muted)',
                textDecoration: 'none',
                fontWeight: 500,
                display: 'inline-flex',
                alignItems: 'center',
              }}
            >
              Cancel
            </Link>
          </div>
        </form>

        <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 16, lineHeight: 1.6 }}>
          Only phone, website, and email can be edited here. For name or location changes, email{' '}
          <a href="mailto:editorial@sobernation.co.uk" style={{ color: 'var(--accent)' }}>editorial@sobernation.co.uk</a>.
        </p>
      </div>
    </main>
  )
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: 13,
  fontWeight: 600,
  marginBottom: 6,
  color: 'var(--text)',
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '11px 14px',
  border: '1px solid var(--border-mid)',
  borderRadius: 8,
  fontSize: 14,
  outline: 'none',
  boxSizing: 'border-box',
  background: '#fff',
}

const hintStyle: React.CSSProperties = {
  fontSize: 12,
  color: 'var(--text-muted)',
  marginTop: 5,
}

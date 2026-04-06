'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function InvoicesPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [hasStripe, setHasStripe] = useState(false)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    async function check() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { router.replace('/verify/login'); return }

      const { data: owner } = await supabase
        .from('listing_owners')
        .select('stripe_customer_id, subscription_status')
        .eq('user_id', session.user.id)
        .single()

      setHasStripe(!!owner?.stripe_customer_id)
      setChecking(false)
    }
    check()
  }, [router])

  async function openPortal() {
    setLoading(true)
    setError('')

    const { data: { session } } = await supabase.auth.getSession()
    if (!session) { router.replace('/verify/login'); return }

    const res = await fetch('/api/stripe/portal', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ userId: session.user.id }),
    })

    const data = await res.json()
    if (!res.ok) {
      setError(data.error || 'Could not open billing portal.')
      setLoading(false)
    } else {
      window.location.href = data.url
    }
  }

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg)', padding: '40px 20px' }}>
      <div style={{ maxWidth: 520, margin: '0 auto' }}>
        <Link href="/dashboard" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--text-muted)', textDecoration: 'none', marginBottom: 28 }}>
          <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd"/>
          </svg>
          Back to dashboard
        </Link>

        <h1 style={{ fontSize: 26, fontWeight: 700, marginBottom: 6 }}>Billing & invoices</h1>
        <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 32 }}>
          Manage your subscription, download invoices, or update your payment method.
        </p>

        {checking ? (
          <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 40 }}>
            <div style={{ width: 28, height: 28, border: '3px solid var(--border)', borderTopColor: 'var(--accent)', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        ) : !hasStripe ? (
          <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 14, padding: '40px 28px', textAlign: 'center' }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>💳</div>
            <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>No subscription yet</h2>
            <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 24, lineHeight: 1.6 }}>
              You haven&apos;t completed the verification payment yet.
            </p>
            <Link href="/verify/onboard" style={{
              display: 'inline-block',
              background: 'var(--accent)',
              color: '#fff',
              padding: '12px 24px',
              borderRadius: 10,
              fontWeight: 600,
              textDecoration: 'none',
            }}>
              Complete verification
            </Link>
          </div>
        ) : (
          <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 14, padding: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 28 }}>
              <div style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: 'var(--accent-pale)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2">
                  <rect x="2" y="5" width="20" height="14" rx="2"/>
                  <path d="M2 10h20"/>
                </svg>
              </div>
              <div>
                <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>Stripe Billing Portal</h2>
                <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  View and download invoices, update your card, change your plan, or cancel your subscription — all managed securely through Stripe.
                </p>
              </div>
            </div>

            {error && (
              <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, padding: '10px 14px', fontSize: 13, color: '#991b1b', marginBottom: 16 }}>
                {error}
              </div>
            )}

            <button
              onClick={openPortal}
              disabled={loading}
              style={{
                width: '100%',
                background: loading ? 'var(--border-mid)' : 'var(--accent)',
                color: '#fff',
                border: 'none',
                borderRadius: 10,
                padding: '13px',
                fontWeight: 600,
                fontSize: 15,
                cursor: loading ? 'not-allowed' : 'pointer',
                boxShadow: loading ? 'none' : '0 4px 12px rgba(26,107,90,0.2)',
              }}
            >
              {loading ? 'Opening portal…' : 'Open Stripe billing portal →'}
            </button>

            <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 12, textAlign: 'center' }}>
              You&apos;ll be redirected to a secure Stripe-hosted page
            </p>
          </div>
        )}
      </div>
    </main>
  )
}

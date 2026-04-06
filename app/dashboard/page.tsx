'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface Owner {
  id: string
  name: string
  email: string
  listing_type: 'counsellor' | 'centre'
  locations: string[]
  subscription_status: string
  verified: boolean
  phone: string | null
  website: string | null
  contact_email: string | null
  created_at: string
}

function formatSlug(slug: string) {
  return slug.split('-').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
}

const statusColors: Record<string, { bg: string; text: string; label: string }> = {
  active:   { bg: '#dcfce7', text: '#166534', label: 'Active' },
  pending:  { bg: '#fef9c3', text: '#854d0e', label: 'Pending' },
  past_due: { bg: '#fee2e2', text: '#991b1b', label: 'Payment due' },
  cancelled:{ bg: '#f1f5f9', text: '#64748b', label: 'Cancelled' },
  trialing: { bg: '#e0f2fe', text: '#075985', label: 'Trial' },
}

export default function DashboardPage() {
  const router = useRouter()
  const [owner, setOwner] = useState<Owner | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { router.replace('/verify/login'); return }

      const { data } = await supabase
        .from('listing_owners')
        .select('*')
        .eq('user_id', session.user.id)
        .single()

      setOwner(data)
      setLoading(false)
    }
    load()
  }, [router])

  async function handleLogout() {
    await supabase.auth.signOut()
    router.replace('/verify/login')
  }

  if (loading) return <DashboardShell><LoadingSpinner /></DashboardShell>
  if (!owner) return <DashboardShell><p style={{ color: 'var(--text-muted)' }}>No listing found. <Link href="/verify/onboard">Get verified</Link></p></DashboardShell>

  const status = statusColors[owner.subscription_status] ?? statusColors.pending
  const pricePerLocation = owner.listing_type === 'centre' ? 99 : 10

  return (
    <DashboardShell owner={owner} onLogout={handleLogout}>
      {/* Welcome banner */}
      <div style={{
        background: 'linear-gradient(135deg, #0f4c38, #1a6b5a)',
        borderRadius: 14,
        padding: '28px 32px',
        color: '#fff',
        marginBottom: 24,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 16,
      }}>
        <div>
          <p style={{ fontSize: 12, opacity: 0.7, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 4 }}>
            Welcome back
          </p>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: '#fff', marginBottom: 8 }}>{owner.name}</h1>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            background: 'rgba(255,255,255,0.15)',
            border: '1px solid rgba(255,255,255,0.25)',
            borderRadius: 100,
            padding: '4px 12px',
            fontSize: 12,
            fontWeight: 600,
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/></svg>
            {owner.listing_type === 'centre' ? 'Rehab Centre' : 'Counsellor'}
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{
            background: status.bg,
            color: status.text,
            borderRadius: 100,
            padding: '6px 14px',
            fontSize: 13,
            fontWeight: 600,
          }}>
            {status.label}
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16, marginBottom: 24 }}>
        {[
          { label: 'Locations', value: owner.locations.length },
          { label: 'Monthly cost', value: `£${owner.locations.length * pricePerLocation}` },
          { label: 'Status', value: status.label },
        ].map(stat => (
          <div key={stat.label} style={{
            background: '#fff',
            border: '1px solid var(--border)',
            borderRadius: 12,
            padding: '20px',
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-light)', marginBottom: 8 }}>
              {stat.label}
            </div>
            <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--text)' }}>{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Active listings */}
      <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 14, overflow: 'hidden', marginBottom: 24 }}>
        <div style={{ padding: '18px 20px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: 15, fontWeight: 700 }}>Your listings</h2>
          <Link href="/verify/onboard" style={{ fontSize: 13, color: 'var(--accent)', fontWeight: 600, textDecoration: 'none' }}>+ Add location</Link>
        </div>
        {owner.locations.length === 0 ? (
          <div style={{ padding: '32px 20px', textAlign: 'center', color: 'var(--text-muted)', fontSize: 14 }}>
            No locations yet. <Link href="/verify/onboard" style={{ color: 'var(--accent)' }}>Add your first location</Link>
          </div>
        ) : (
          owner.locations.map((loc, i) => (
            <div key={loc} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '14px 20px',
              borderBottom: i < owner.locations.length - 1 ? '1px solid var(--border)' : 'none',
              gap: 12,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: owner.verified ? 'var(--accent)' : 'var(--text-light)',
                  flexShrink: 0,
                }} />
                <span style={{ fontWeight: 500, fontSize: 14 }}>{formatSlug(loc)}</span>
              </div>
              <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                <Link
                  href={`/dashboard/edit/${loc}`}
                  style={{ fontSize: 12, color: 'var(--accent)', fontWeight: 600, textDecoration: 'none', padding: '5px 10px', border: '1px solid var(--border)', borderRadius: 6 }}
                >
                  Edit contact
                </Link>
                <Link
                  href={owner.listing_type === 'centre' ? `/centres/${loc}` : `/counsellors/${loc}`}
                  target="_blank"
                  style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 500, textDecoration: 'none', padding: '5px 10px', border: '1px solid var(--border)', borderRadius: 6 }}
                >
                  View live ↗
                </Link>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Quick links */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
        {[
          { href: '/dashboard/invoices', label: 'Billing & invoices', desc: 'View invoices, update payment method' },
          { href: '/dashboard/settings', label: 'Account settings', desc: 'Change password, manage account' },
        ].map(link => (
          <Link key={link.href} href={link.href} style={{
            display: 'block',
            background: '#fff',
            border: '1px solid var(--border)',
            borderRadius: 12,
            padding: '18px 20px',
            textDecoration: 'none',
            transition: 'border-color 0.15s',
          }}>
            <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--text)', marginBottom: 4 }}>{link.label}</div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{link.desc}</div>
          </Link>
        ))}
      </div>
    </DashboardShell>
  )
}

// ── Shared dashboard shell ────────────────────────────────────────────────────

export function DashboardShell({ children, owner, onLogout }: {
  children: React.ReactNode
  owner?: Owner | null
  onLogout?: () => void
}) {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Dashboard nav */}
      <nav style={{
        background: '#fff',
        borderBottom: '1px solid var(--border)',
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 56,
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <Link href="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5">
              <circle cx="12" cy="12" r="10"/>
              <path d="M9 12l2 2 4-4"/>
            </svg>
            <span style={{ fontWeight: 700, color: 'var(--text)', fontSize: 14 }}>Dashboard</span>
          </Link>
          <div style={{ display: 'flex', gap: 2 }}>
            {[
              { href: '/dashboard', label: 'Home' },
              { href: '/dashboard/invoices', label: 'Billing' },
              { href: '/dashboard/settings', label: 'Settings' },
            ].map(nav => (
              <Link key={nav.href} href={nav.href} style={{
                fontSize: 13,
                fontWeight: 500,
                color: 'var(--text-muted)',
                padding: '6px 12px',
                borderRadius: 8,
                textDecoration: 'none',
                transition: 'background 0.15s',
              }}>
                {nav.label}
              </Link>
            ))}
          </div>
        </div>
        {onLogout && (
          <button onClick={onLogout} style={{
            background: 'none',
            border: '1px solid var(--border)',
            borderRadius: 8,
            padding: '6px 12px',
            fontSize: 13,
            color: 'var(--text-muted)',
            cursor: 'pointer',
          }}>
            Log out
          </button>
        )}
      </nav>

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '32px 20px' }}>
        {children}
      </div>
    </div>
  )
}

function LoadingSpinner() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 60 }}>
      <div style={{
        width: 32,
        height: 32,
        border: '3px solid var(--border)',
        borderTopColor: 'var(--accent)',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

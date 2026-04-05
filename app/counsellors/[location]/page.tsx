import { createClient } from '@supabase/supabase-js'
import { notFound } from 'next/navigation'
import { getLocation } from '../../../lib/locations'
import { getRehabsForLocation } from '../../../lib/rehabs'
import CounsellorCard, { type Counsellor } from '../../../components/CounsellorCard'
import NearestCentres from '../../../components/NearestCentres'
import type { Metadata } from 'next'
import Link from 'next/link'

export const revalidate = 3600 // 1 hour ISR

interface Props {
  params: Promise<{ location: string }>
}

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { location } = await params
  const loc = getLocation(location)
  const name = loc?.name
  if (!name) return {}
  return {
    title: `Addiction Counsellors in ${name}`,
    description: `Find verified addiction counsellors and therapists in ${name}. Browse BACP-registered specialists in alcohol, drug and substance misuse recovery.`,
  }
}

export default async function CounsellorsLocationPage({ params }: Props) {
  const { location } = await params
  const locationName = getLocation(location)?.name
  if (!locationName) notFound()

  const supabase = getSupabase()

  const { data: counsellors, error } = await supabase
    .from('counsellors')
    .select('id, name, title, location_name, location_slug, specialisms, phone, email, website, photo_url, verified, listing_type, profile_slug')
    .eq('location_slug', location)
    .order('verified', { ascending: false })
    .order('name', { ascending: true })
    .limit(50)

  if (error) {
    console.error('Supabase error:', error)
  }

  const list: Counsellor[] = counsellors ?? []
  const verified = list.filter(c => c.verified)
  const unverified = list.filter(c => !c.verified)

  // Nearby centres — used in empty state and as supplementary section
  const centresResult = getRehabsForLocation(location, locationName!)

  return (
    <div style={{ minHeight: '100vh', background: 'var(--white)' }}>
      <style>{`
        .cl-hero { background: var(--white); border-bottom: 1px solid var(--border); padding: 48px 20px 40px; }
        .cl-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 12px; }
        @media (max-width: 640px) { .cl-grid { grid-template-columns: 1fr; } }
        .cl-verify-banner {
          background: var(--accent-pale);
          border: 1px solid #c8e6df;
          border-radius: var(--radius-md);
          padding: 18px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
          margin-bottom: 32px;
        }
      `}</style>

      {/* Hero */}
      <div className="cl-hero">
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <nav style={{ fontSize: 12, color: 'var(--text-light)', marginBottom: 14 }}>
            <Link href="/" style={{ color: 'var(--text-light)', textDecoration: 'none' }}>Home</Link>
            {' / '}
            <Link href={`/help/${location}`} style={{ color: 'var(--text-light)', textDecoration: 'none' }}>Help in {locationName}</Link>
            {' / '}
            <span>Counsellors</span>
          </nav>
          <h1 style={{ fontSize: 'clamp(22px,4vw,34px)', fontWeight: 700, color: 'var(--text)', marginBottom: 10, letterSpacing: '-0.02em' }}>
            Addiction counsellors in {locationName}
          </h1>
          <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: 560 }}>
            BACP-registered specialists in alcohol, drug and substance misuse recovery.
            {list.length > 0 ? ` ${list.length} counsellors listed.` : ''}
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 960, margin: '0 auto', padding: '40px 20px' }}>
        {/* Verify banner for counsellors */}
        <div className="cl-verify-banner">
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--accent)', marginBottom: 4 }}>
              Are you a counsellor in {locationName}?
            </div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
              Claim your listing and get a verified badge for £10/month.
            </div>
          </div>
          <Link
            href={`/counsellors/claim?location=${location}`}
            style={{ fontSize: 13, fontWeight: 600, background: 'var(--accent)', color: '#fff', padding: '8px 16px', borderRadius: 'var(--radius-sm)', textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}
          >
            Get verified →
          </Link>
        </div>

        {/* Verified counsellors */}
        {verified.length > 0 && (
          <div style={{ marginBottom: 40 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 8, height: 8, background: '#1d9bf0', borderRadius: '50%', display: 'inline-block' }} />
              Verified — {verified.length}
            </div>
            <div className="cl-grid">
              {verified.map(c => <CounsellorCard key={c.id} counsellor={c} />)}
            </div>
          </div>
        )}

        {/* Unverified counsellors */}
        {unverified.length > 0 && (
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16 }}>
              Listed — {unverified.length}
            </div>
            <div className="cl-grid">
              {unverified.map(c => <CounsellorCard key={c.id} counsellor={c} />)}
            </div>
          </div>
        )}

        {list.length === 0 && (
          <div style={{ textAlign: 'center', padding: '48px 20px 32px', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', marginBottom: 40 }}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>🔍</div>
            <div style={{ fontSize: 17, fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>
              No counsellors listed in {locationName} yet
            </div>
            <div style={{ fontSize: 14, color: 'var(--text-muted)', maxWidth: 420, margin: '0 auto 20px', lineHeight: 1.65 }}>
              We&apos;re adding new listings daily. In the meantime, you can find addiction
              counsellors through the BACP public directory or contact Frank for free advice.
            </div>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a
                href={`https://www.bacp.co.uk/search/?q=${encodeURIComponent(locationName)}&cat=&type=2`}
                target="_blank" rel="noopener noreferrer"
                style={{ fontSize: 13, fontWeight: 700, background: 'var(--accent)', color: '#fff', padding: '10px 18px', borderRadius: 'var(--radius-sm)', textDecoration: 'none' }}
              >
                Search BACP directory →
              </a>
              <a
                href="https://www.talktofrank.com/get-help/find-support-near-you"
                target="_blank" rel="noopener noreferrer"
                style={{ fontSize: 13, fontWeight: 700, background: '#fff', color: 'var(--accent)', border: '1.5px solid var(--accent)', padding: '10px 18px', borderRadius: 'var(--radius-sm)', textDecoration: 'none' }}
              >
                Frank service finder →
              </a>
            </div>
            <div style={{ marginTop: 16 }}>
              <Link href={`/counsellors/claim?location=${location}`} style={{ fontSize: 13, color: 'var(--text-muted)', textDecoration: 'underline' }}>
                Are you a counsellor in {locationName}? Claim your free listing →
              </Link>
            </div>
          </div>
        )}

        {/* Nearby rehab centres — always shown */}
        <NearestCentres result={centresResult} locationName={locationName} locationSlug={location} limit={6} />
      </div>
    </div>
  )
}

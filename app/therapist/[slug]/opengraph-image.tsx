/**
 * /therapist/[slug]/opengraph-image
 * Auto-generated branded OG image for social sharing + link previews.
 * Served automatically by Next.js as og:image meta tag.
 */
import { ImageResponse } from 'next/og'

export const runtime = 'nodejs'
export const alt = 'SoberNation Counsellor Profile'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

interface Props {
  params: Promise<{ slug: string }>
}

function titleCase(words: string[]): string {
  return words
    .filter(Boolean)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

function slugToNameAndLocation(rawSlug: string): { name: string; location: string } {
  // Decode safely (malformed %-sequences throw) and keep only characters the
  // default OG font can render, so Satori never fails on odd bot-requested slugs.
  let slug = rawSlug
  try { slug = decodeURIComponent(rawSlug) } catch { /* keep raw */ }
  slug = slug.replace(/[^a-zA-Z0-9-]/g, '').slice(0, 120)

  const parts = slug.split('-').filter(Boolean)
  if (parts.length === 0) return { name: 'Addiction Counsellor', location: 'the UK' }
  if (parts.length === 1) return { name: titleCase(parts), location: 'the UK' }
  // Heuristic: last word = location, rest = name
  return { name: titleCase(parts.slice(0, -1)), location: titleCase(parts.slice(-1)) }
}

export default async function TherapistOGImage({ params }: Props) {
  try {
    const { slug } = await params
    const { name, location } = slugToNameAndLocation(slug)
    return render(name, location)
  } catch (err) {
    console.error('[therapist og-image] render failed, serving fallback', err)
    return render('Addiction Counsellor', 'the UK')
  }
}

function render(name: string, location: string) {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(135deg, #0f4c3a 0%, #1d6b5a 50%, #24856d 100%)',
          padding: '60px',
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
        }}
      >
        {/* Background pattern */}
        <div
          style={{ display: 'flex',
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundImage: 'radial-gradient(circle at 80% 20%, rgba(255,255,255,0.06) 0%, transparent 60%), radial-gradient(circle at 20% 80%, rgba(255,255,255,0.04) 0%, transparent 50%)',
          }}
        />

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '40px' }}>
          <div style={{ width: 32, height: 32, background: 'rgba(255,255,255,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ display: 'flex', fontSize: 18, color: '#fff', fontWeight: 800 }}>S</div>
          </div>
          <div style={{ display: 'flex', color: 'rgba(255,255,255,0.9)', fontSize: 18, fontWeight: 700, letterSpacing: '-0.01em' }}>
            SoberNation
          </div>
        </div>

        {/* Main content */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ display: 'flex', fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>
            Addiction Counsellor Profile
          </div>
          <div style={{ display: 'flex', fontSize: 58, fontWeight: 800, color: '#fff', lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: '20px', maxWidth: '800px' }}>
            {name}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ display: 'flex', width: 8, height: 8, borderRadius: '50%', background: '#4ade80' }} />
            <div style={{ display: 'flex', fontSize: 22, color: 'rgba(255,255,255,0.85)', fontWeight: 500 }}>
              Based in {location}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginTop: '40px', paddingTop: '24px',
          borderTop: '1px solid rgba(255,255,255,0.2)',
        }}>
          <div style={{ display: 'flex', fontSize: 16, color: 'rgba(255,255,255,0.7)' }}>
            sobernation.co.uk
          </div>
          <div style={{ display: 'flex',
            background: 'rgba(255,255,255,0.15)', borderRadius: '999px',
            padding: '8px 18px', fontSize: 14, fontWeight: 700, color: '#fff',
          }}>
            View full profile →
          </div>
        </div>
      </div>
    ),
    { ...size },
  )
}

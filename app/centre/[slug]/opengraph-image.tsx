/**
 * /centre/[slug]/opengraph-image
 * Branded OG image for rehab centre profile pages.
 */
import { ImageResponse } from 'next/og'

export const runtime = 'nodejs'
export const alt = 'SoberNation Rehab Centre Profile'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

interface Props {
  params: Promise<{ slug: string }>
}

function slugToCentreName(slug: string): { name: string; location: string } {
  const parts = slug.split('-')
  // Last word = city guess, rest = centre name
  const locationText = parts[parts.length - 1]
  const nameText = parts.slice(0, -1).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
  const location = locationText.charAt(0).toUpperCase() + locationText.slice(1)
  return { name: nameText, location }
}

export default async function CentreOGImage({ params }: Props) {
  const { slug } = await params
  const { name, location } = slugToCentreName(slug)

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 50%, #2563eb 100%)',
          padding: '60px',
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 80% 20%, rgba(255,255,255,0.07) 0%, transparent 55%)' }} />

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '40px' }}>
          <div style={{ width: 32, height: 32, background: 'rgba(255,255,255,0.2)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ fontSize: 16, color: '#fff', fontWeight: 800 }}>+</div>
          </div>
          <div style={{ color: 'rgba(255,255,255,0.9)', fontSize: 18, fontWeight: 700 }}>SoberNation</div>
        </div>

        {/* CQC badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', background: 'rgba(255,255,255,0.12)', borderRadius: '999px', width: 'fit-content', padding: '6px 14px' }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#34d399' }} />
          <div style={{ fontSize: 13, color: '#fff', fontWeight: 700 }}>CQC Registered Treatment Centre</div>
        </div>

        {/* Main content */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ fontSize: 52, fontWeight: 800, color: '#fff', lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: '20px', maxWidth: '820px' }}>
            {name}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#fbbf24' }} />
            <div style={{ fontSize: 20, color: 'rgba(255,255,255,0.85)', fontWeight: 500 }}>
              {location}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '36px', paddingTop: '22px', borderTop: '1px solid rgba(255,255,255,0.2)' }}>
          <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.65)' }}>sobernation.co.uk</div>
          <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: '999px', padding: '8px 18px', fontSize: 14, fontWeight: 700, color: '#fff' }}>
            View profile →
          </div>
        </div>
      </div>
    ),
    { ...size },
  )
}

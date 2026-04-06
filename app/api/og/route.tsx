import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const title = searchParams.get('title') ?? 'SoberNation'
  const subtitle = searchParams.get('subtitle') ?? 'UK Addiction Recovery Resource'
  const type = searchParams.get('type') ?? 'article' // 'article' | 'location' | 'tool'

  const bgGradient = type === 'location'
    ? 'linear-gradient(135deg, #1a3d30 0%, #0f2a20 100%)'
    : type === 'tool'
      ? 'linear-gradient(135deg, #1e3a5f 0%, #0f1f35 100%)'
      : 'linear-gradient(135deg, #1a2e26 0%, #0f1f1a 100%)'

  const accentColor = type === 'location' ? '#5aab7e' : type === 'tool' ? '#3b82f6' : '#4a9068'

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          background: bgGradient,
          padding: '48px 56px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          position: 'relative',
        }}
      >
        {/* Decorative circles */}
        <div style={{
          position: 'absolute', top: -40, right: -40, width: 300, height: 300,
          borderRadius: '50%', background: 'rgba(255,255,255,0.03)', display: 'flex',
        }} />
        <div style={{
          position: 'absolute', bottom: -60, left: -30, width: 200, height: 200,
          borderRadius: '50%', background: 'rgba(255,255,255,0.04)', display: 'flex',
        }} />

        {/* Leaf logo + brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
          <div style={{
            width: 40, height: 46, background: accentColor, borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }} />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: 22, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>SoberNation</span>
            <span style={{ fontSize: 10, fontWeight: 600, color: accentColor, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              Health &amp; Wellbeing
            </span>
          </div>
        </div>

        {/* Title */}
        <div style={{
          fontSize: title.length > 60 ? 36 : title.length > 40 ? 42 : 50,
          fontWeight: 800,
          color: '#fff',
          lineHeight: 1.15,
          letterSpacing: '-0.025em',
          marginBottom: 20,
          flex: 1,
          display: 'flex',
          alignItems: 'center',
        }}>
          {title}
        </div>

        {/* Subtitle + badge */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <span style={{ fontSize: 18, color: 'rgba(255,255,255,0.65)', fontWeight: 500 }}>{subtitle}</span>
          <div style={{
            padding: '8px 16px', background: accentColor, borderRadius: 24,
            fontSize: 13, color: '#fff', fontWeight: 700,
          }}>
            sobernation.co.uk
          </div>
        </div>

        {/* Bottom accent line */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 5,
          background: `linear-gradient(90deg, ${accentColor}, transparent)`,
        }} />
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}

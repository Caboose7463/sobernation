'use client'
import { useEffect, useRef, useState, type CSSProperties } from 'react'

// Google AdSense: four fixed units, each used at most once per page.
// The loader script is in the root layout <head>. No Auto ads.
export const ADSENSE_CLIENT = 'ca-pub-1914833169264702'

export const AD_SLOTS = {
  intro: '1748472497',
  mid: '4897380011',
  end: '8323995847',
  sidebar: '2271216672',
} as const

export type AdKey = keyof typeof AD_SLOTS

declare global {
  interface Window {
    adsbygoogle?: unknown[]
  }
}

function pushAd() {
  try {
    ;(window.adsbygoogle = window.adsbygoogle || []).push({})
  } catch {
    // ignore: ad blockers or a unit that was already filled
  }
}

const wrapStyle = (minHeight: number): CSSProperties => ({
  minHeight,
  margin: '32px 0',
})

const labelStyle: CSSProperties = {
  fontSize: 11,
  color: '#6b7280',
  marginBottom: 6,
  textAlign: 'center',
}

function AdIns({ slot }: { slot: string }) {
  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client={ADSENSE_CLIENT}
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  )
}

/** In-content unit (intro, mid or end). Server rendered, filled on mount. */
export default function AdUnit({ slot }: { slot: Exclude<AdKey, 'sidebar'> }) {
  const pushed = useRef(false)
  useEffect(() => {
    if (pushed.current) return
    pushed.current = true
    pushAd()
  }, [])

  return (
    <div className={`ad-wrap ad-${slot}`} style={wrapStyle(280)}>
      <div className="ad-label" style={labelStyle}>Advertisement</div>
      <AdIns slot={AD_SLOTS[slot]} />
    </div>
  )
}

/** Sidebar unit. Desktop only: never mounts or requests an ad below 1024px. */
export function SidebarAd() {
  const [desktop, setDesktop] = useState(false)
  const pushed = useRef(false)

  useEffect(() => {
    if (window.matchMedia('(min-width: 1024px)').matches) setDesktop(true)
  }, [])

  useEffect(() => {
    if (!desktop || pushed.current) return
    pushed.current = true
    pushAd()
  }, [desktop])

  if (!desktop) return null

  return (
    <div className="ad-wrap ad-sidebar" style={{ minHeight: 620, marginTop: 24 }}>
      <div className="ad-label" style={labelStyle}>Advertisement</div>
      <AdIns slot={AD_SLOTS.sidebar} />
    </div>
  )
}

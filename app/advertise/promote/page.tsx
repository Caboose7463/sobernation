'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

// ── Pricing ───────────────────────────────────────────────────────────────────
const CENTRE_PRICES: Record<1 | 2 | 3, number> = { 1: 150, 2: 100, 3: 50 }
const COUNSELLOR_PRICE = 10

const POPULAR = [
  { slug: 'london',     name: 'London',     clicks: 150 },
  { slug: 'manchester', name: 'Manchester', clicks: 120 },
  { slug: 'birmingham', name: 'Birmingham', clicks: 110 },
  { slug: 'bristol',    name: 'Bristol',    clicks:  90 },
  { slug: 'leeds',      name: 'Leeds',      clicks:  85 },
  { slug: 'liverpool',  name: 'Liverpool',  clicks:  75 },
  { slug: 'glasgow',    name: 'Glasgow',    clicks:  70 },
  { slug: 'edinburgh',  name: 'Edinburgh',  clicks:  65 },
]

const CITIES = [
  ...POPULAR,
  { slug: 'sheffield',      name: 'Sheffield',      clicks: 60 },
  { slug: 'newcastle',      name: 'Newcastle',      clicks: 58 },
  { slug: 'nottingham',     name: 'Nottingham',     clicks: 55 },
  { slug: 'cardiff',        name: 'Cardiff',        clicks: 52 },
  { slug: 'leicester',      name: 'Leicester',      clicks: 50 },
  { slug: 'southampton',    name: 'Southampton',    clicks: 48 },
  { slug: 'oxford',         name: 'Oxford',         clicks: 46 },
  { slug: 'cambridge',      name: 'Cambridge',      clicks: 44 },
  { slug: 'brighton',       name: 'Brighton',       clicks: 42 },
  { slug: 'reading',        name: 'Reading',        clicks: 40 },
  { slug: 'coventry',       name: 'Coventry',       clicks: 38 },
  { slug: 'derby',          name: 'Derby',          clicks: 36 },
  { slug: 'hull',           name: 'Hull',           clicks: 35 },
  { slug: 'portsmouth',     name: 'Portsmouth',     clicks: 33 },
  { slug: 'york',           name: 'York',           clicks: 32 },
  { slug: 'exeter',         name: 'Exeter',         clicks: 31 },
  { slug: 'plymouth',       name: 'Plymouth',       clicks: 30 },
  { slug: 'norwich',        name: 'Norwich',        clicks: 29 },
  { slug: 'bath',           name: 'Bath',           clicks: 28 },
  { slug: 'salisbury',      name: 'Salisbury',      clicks: 25 },
  { slug: 'shrewsbury',     name: 'Shrewsbury',     clicks: 25 },
  { slug: 'cheltenham',     name: 'Cheltenham',     clicks: 25 },
  { slug: 'worcester',      name: 'Worcester',      clicks: 25 },
  { slug: 'lincoln',        name: 'Lincoln',        clicks: 25 },
  { slug: 'peterborough',   name: 'Peterborough',   clicks: 25 },
  { slug: 'luton',          name: 'Luton',          clicks: 25 },
  { slug: 'ipswich',        name: 'Ipswich',        clicks: 25 },
  { slug: 'milton-keynes',  name: 'Milton Keynes',  clicks: 25 },
  { slug: 'guildford',      name: 'Guildford',      clicks: 25 },
  { slug: 'belfast',        name: 'Belfast',        clicks: 26 },
  { slug: 'swansea',        name: 'Swansea',        clicks: 27 },
  { slug: 'aberdeen',       name: 'Aberdeen',       clicks: 25 },
  { slug: 'inverness',      name: 'Inverness',      clicks: 25 },
  { slug: 'dundee',         name: 'Dundee',         clicks: 25 },
]

interface Listing {
  slug: string; name: string; town: string
  phone: string | null; website: string | null
  location_slug: string; service_type: string
  listing_type: 'centre' | 'counsellor'
}
interface City { slug: string; name: string; clicks: number }
type Avail = Record<number, string | null>

// ── Screen indices ────────────────────────────────────────────────────────────
// 0 = type  1 = find listing  2 = city  3 = spot  4 = details  5 = pay
const TOTAL_SCREENS = 6

export default function PromotePage() {
  const [screen, setScreen]   = useState(0)
  const [dir,    setDir]      = useState<1 | -1>(1) // animation direction

  // answers
  const [listingType, setListingType] = useState<'centre' | 'counsellor'>('centre')
  const [listing,     setListing]     = useState<Listing | null>(null)
  const [city,        setCity]        = useState<City | null>(null)
  const [position,    setPosition]    = useState<1 | 2 | 3 | null>(null)
  const [name,        setName]        = useState('')
  const [email,       setEmail]       = useState('')
  const [phone,       setPhone]       = useState('')
  const [website,     setWebsite]     = useState('')

  // listing search
  const [q,         setQ]         = useState('')
  const [sugg,      setSugg]      = useState<Listing[]>([])
  const [sqLoading, setSqLoading] = useState(false)
  const [dropOpen,  setDropOpen]  = useState(false)
  const debRef  = useRef<ReturnType<typeof setTimeout> | null>(null)
  const wrapRef = useRef<HTMLDivElement>(null)

  // city search
  const [cityQ, setCityQ] = useState('')

  // availability
  const [avail,       setAvail]       = useState<Avail | null>(null)
  const [availLoad,   setAvailLoad]   = useState(false)

  // timer (screen 5)
  const [timeLeft, setTimeLeft] = useState(600)
  const [timerOn,  setTimerOn]  = useState(false)
  const [paying,   setPaying]   = useState(false)
  const [payErr,   setPayErr]   = useState('')

  // animate: slide
  const [visible, setVisible] = useState(true)

  function go(next: number) {
    const d = next > screen ? 1 : -1
    setDir(d); setVisible(false)
    setTimeout(() => { setScreen(next); setVisible(true) }, 180)
  }
  function next() { go(screen + 1) }
  function back() { go(screen - 1) }

  // close listing dropdown on outside click
  useEffect(() => {
    function h(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setDropOpen(false)
    }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])

  // listing search debounce
  function handleQ(val: string) {
    setQ(val); setListing(null); setDropOpen(true)
    if (debRef.current) clearTimeout(debRef.current)
    if (val.length < 2) { setSugg([]); return }
    debRef.current = setTimeout(async () => {
      setSqLoading(true)
      try {
        const r = await fetch(`/api/ads/search-listing?q=${encodeURIComponent(val)}&type=${listingType}`)
        setSugg(await r.json())
      } catch { setSugg([]) } finally { setSqLoading(false) }
    }, 280)
  }

  function selectListing(l: Listing) {
    setListing(l); setQ(l.name); setDropOpen(false)
    setListingType(l.listing_type)
    setName(l.name); setPhone(l.phone || ''); setWebsite(l.website || '')
    const c = CITIES.find(c => c.slug === l.location_slug || c.name.toLowerCase() === l.town.toLowerCase())
    if (c) { setCity(c); loadAvail(c) }
  }

  // availability
  async function loadAvail(c: City) {
    setAvailLoad(true); setAvail(null)
    try {
      const r = await fetch(`/api/ads/auction?location=${c.slug}&type=${listingType}`)
      const d = await r.json()
      const m: Avail = { 1: null, 2: null, 3: null }
      for (const w of d.winners ?? []) m[w.position] = w.display_name
      setAvail(m)
    } catch { setAvail({ 1: null, 2: null, 3: null }) } finally { setAvailLoad(false) }
  }

  function selectCity(c: City) {
    setCity(c); setCityQ(''); setPosition(null); setAvail(null)
    loadAvail(c)
  }

  // timer countdown
  useEffect(() => {
    if (!timerOn) return
    const iv = setInterval(() => setTimeLeft(t => t > 0 ? t - 1 : 0), 1000)
    return () => clearInterval(iv)
  }, [timerOn])

  function enterPay() { setTimerOn(true); next() }

  // payment
  async function handlePay() {
    if (!name || !email) { setPayErr('Please enter your name and email.'); return }
    setPaying(true); setPayErr('')
    try {
      const pos = listingType === 'counsellor' ? 1 : position
      const r = await fetch('/api/stripe/claim-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ businessName: name, email, listingType, phone, destinationUrl: website, destinationType: 'own_url', locations: [{ slug: city!.slug, name: city!.name, position: pos }] }),
      })
      const d = await r.json()
      if (d.url) window.location.href = d.url
      else { setPayErr(d.error || 'Something went wrong.'); setPaying(false) }
    } catch { setPayErr('Network error.'); setPaying(false) }
  }

  const fee = listingType === 'counsellor' ? COUNSELLOR_PRICE : (position ? CENTRE_PRICES[position] : 0)
  const filtCities = cityQ.length > 1 ? CITIES.filter(c => c.name.toLowerCase().startsWith(cityQ.toLowerCase())) : []
  const mm = `${Math.floor(timeLeft / 60).toString().padStart(2, '0')}:${(timeLeft % 60).toString().padStart(2, '0')}`
  const isUrgent = timeLeft < 120
  const posLabels: Record<number, string> = { 1: 'Featured', 2: 'Standard', 3: 'Listed' }

  const INP: React.CSSProperties = {
    width: '100%', padding: '16px 18px', border: '2px solid var(--border)',
    borderRadius: 12, fontSize: 17, outline: 'none', boxSizing: 'border-box',
    background: '#fff', color: 'var(--text)', fontFamily: 'inherit',
    transition: 'border-color 0.15s',
  }

  // ── Screens ───────────────────────────────────────────────────────────────

  const screens: JSX.Element[] = [

    // ── 0: Centre or counsellor ───────────────────────────────────────────
    <div key="type">
      <Question n={1} total={TOTAL_SCREENS} text="What would you like to promote?" />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 28 }}>
        {([['centre', 'Rehab Centre', 'Residential or outpatient treatment facility'], ['counsellor', 'Counsellor / Therapist', 'Private practice or online therapy']] as const).map(([val, label, sub]) => (
          <button key={val}
            onClick={() => { setListingType(val); setListing(null); setQ(''); setTimeout(next, 260) }}
            style={{
              display: 'flex', alignItems: 'center', gap: 16,
              padding: '18px 20px', border: `2px solid ${listingType === val ? 'var(--accent)' : 'var(--border)'}`,
              borderRadius: 14, background: listingType === val ? 'var(--accent-pale)' : '#fff',
              cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s', width: '100%',
            }}>
            <div style={{ width: 20, height: 20, borderRadius: '50%', border: `2px solid ${listingType === val ? 'var(--accent)' : 'var(--border)'}`, background: listingType === val ? 'var(--accent)' : 'transparent', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {listingType === val && <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#fff' }} />}
            </div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)' }}>{label}</div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 2 }}>{sub}</div>
            </div>
          </button>
        ))}
      </div>
    </div>,

    // ── 1: Find your listing ──────────────────────────────────────────────
    <div key="listing">
      <Question n={2} total={TOTAL_SCREENS} text={`Are you listed on SoberNation?`} sub="Search for your listing. We'll pre-fill your details and prevent duplicates." />
      <div ref={wrapRef} style={{ position: 'relative', marginTop: 28 }}>
        <input style={{ ...INP, borderColor: listing ? 'var(--accent)' : 'var(--border)' }}
          placeholder={listingType === 'centre' ? 'e.g. Castle Craig Hospital…' : 'e.g. Jane Smith Counselling…'}
          value={q} onChange={e => handleQ(e.target.value)}
          onFocus={() => q.length >= 2 && setDropOpen(true)}
          autoFocus autoComplete="off" />
        {listing && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8, fontSize: 13, color: 'var(--accent)', fontWeight: 600 }}>
            <svg width="13" height="13" viewBox="0 0 20 20" fill="none" stroke="var(--accent)" strokeWidth="3"><polyline points="4,10 8,14 16,6" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Found — details pre-filled
          </div>
        )}

        {dropOpen && q.length >= 2 && (
          <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 50, background: '#fff', border: '1.5px solid var(--border)', borderRadius: 12, marginTop: 6, boxShadow: '0 12px 32px rgba(0,0,0,0.12)', overflow: 'hidden' }}>
            {sqLoading && <div style={{ padding: '14px 18px', fontSize: 14, color: 'var(--text-muted)' }}>Searching...</div>}
            {!sqLoading && sugg.length === 0 && <div style={{ padding: '14px 18px', fontSize: 14, color: 'var(--text-muted)' }}>Not found — continue to enter your details.</div>}
            {sugg.map(s => (
              <button key={s.slug} onMouseDown={() => selectListing(s)}
                style={{ display: 'flex', gap: 14, width: '100%', textAlign: 'left', padding: '14px 18px', background: 'none', border: 'none', borderBottom: '1px solid var(--border)', cursor: 'pointer', alignItems: 'center' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--accent-pale)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'none')}>
                <div style={{ width: 38, height: 38, borderRadius: 8, background: 'var(--accent-pale)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: 'var(--accent)', flexShrink: 0 }}>
                  {s.name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase()}
                </div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)' }}>{s.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{[s.service_type, s.town].filter(Boolean).join(' · ')}</div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {listing && (
        <div style={{ marginTop: 16, padding: '16px 18px', background: 'var(--accent-pale)', border: '1.5px solid var(--accent)', borderRadius: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)' }}>{listing.name}</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{listing.town}</div>
          </div>
          <button onClick={() => { setListing(null); setQ('') }} style={{ fontSize: 13, color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer' }}>Change</button>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 28 }}>
        <BigBtn onClick={next} label={listing ? 'Continue with this listing →' : 'Continue →'} />
        <button onClick={next} style={{ background: 'none', border: 'none', fontSize: 14, color: 'var(--text-muted)', cursor: 'pointer', padding: '8px 0' }}>
          Not listed — enter my details manually
        </button>
      </div>
    </div>,

    // ── 2: City ───────────────────────────────────────────────────────────
    <div key="city">
      <Question n={3} total={TOTAL_SCREENS} text="Which city should patients find you in?" sub="Pick the area where your listing should appear in search results." />
      <div style={{ marginTop: 28 }}>
        <input style={INP} placeholder="Search any UK city or town..."
          value={cityQ} onChange={e => setCityQ(e.target.value)} autoFocus autoComplete="off" />

        {cityQ.length > 1 && filtCities.length > 0 && (
          <div style={{ border: '1.5px solid var(--border)', borderRadius: 12, marginTop: 6, overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}>
            {filtCities.slice(0, 8).map(c => (
              <button key={c.slug} onClick={() => { selectCity(c); next() }}
                style={{ display: 'flex', justifyContent: 'space-between', width: '100%', textAlign: 'left', padding: '14px 18px', background: '#fff', border: 'none', borderBottom: '1px solid var(--border)', cursor: 'pointer', fontSize: 15, color: 'var(--text)' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--accent-pale)')}
                onMouseLeave={e => (e.currentTarget.style.background = '#fff')}>
                <span style={{ fontWeight: 500 }}>{c.name}</span>
                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>~{c.clicks} searches/mo</span>
              </button>
            ))}
          </div>
        )}

        {!cityQ && (
          <>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em', margin: '20px 0 12px' }}>Popular</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {POPULAR.map(c => (
                <button key={c.slug} onClick={() => { selectCity(c); next() }}
                  style={{ padding: '10px 16px', borderRadius: 24, border: '2px solid var(--border)', background: '#fff', fontSize: 14, fontWeight: 600, color: 'var(--text)', cursor: 'pointer', transition: 'all 0.12s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text)' }}>
                  {c.name}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>,

    // ── 3: Spot ───────────────────────────────────────────────────────────
    <div key="spot">
      <Question n={4} total={TOTAL_SCREENS}
        text={`Pick your spot in ${city?.name ?? '...'}`}
        sub={city ? `~${city.clicks} searches/month · select a position to continue` : ''} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 28 }}>
        {availLoad && <div style={{ textAlign: 'center', padding: '32px', fontSize: 14, color: 'var(--text-muted)' }}>Checking availability...</div>}
        {!availLoad && avail && (listingType === 'counsellor' ? [1] : [1, 2, 3] as const).map(pos => {
          const taken = avail[pos]
          const isTaken = !!taken
          const isPicked = position === pos
          const posPrice = listingType === 'counsellor' ? COUNSELLOR_PRICE : CENTRE_PRICES[pos as 1|2|3]
          const views = Math.round((city?.clicks ?? 40) * (pos === 1 ? 1 : pos === 2 ? 0.7 : 0.5))

          return (
            <button key={pos} disabled={isTaken}
              onClick={() => { if (!isTaken) { setPosition(pos as 1|2|3); setTimeout(next, 300) } }}
              style={{
                display: 'flex', alignItems: 'center', gap: 16, padding: '18px 20px',
                border: `2px solid ${isPicked ? 'var(--accent)' : isTaken ? '#e5e7eb' : 'var(--border)'}`,
                borderRadius: 14, background: isPicked ? 'var(--accent-pale)' : isTaken ? '#f9fafb' : '#fff',
                cursor: isTaken ? 'default' : 'pointer', opacity: isTaken ? 0.6 : 1,
                textAlign: 'left', width: '100%', transition: 'all 0.15s',
              }}>
              <div style={{ width: 44, height: 44, borderRadius: '50%', flexShrink: 0, background: isPicked ? 'var(--accent)' : isTaken ? '#e5e7eb' : pos === 1 ? '#fef3c7' : pos === 2 ? '#e0e7ff' : '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 16, color: isPicked ? '#fff' : isTaken ? '#9ca3af' : pos === 1 ? '#92400e' : pos === 2 ? '#3730a3' : '#166534' }}>
                {pos}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 3 }}>
                  <span style={{ fontSize: 16, fontWeight: 700, color: isTaken ? 'var(--text-muted)' : 'var(--text)' }}>{posLabels[pos]}</span>
                  {pos === 1 && !isTaken && <span style={{ fontSize: 10, fontWeight: 700, background: '#fef3c7', color: '#92400e', padding: '2px 7px', borderRadius: 8 }}>MOST POPULAR</span>}
                  {isTaken && <span style={{ fontSize: 10, fontWeight: 700, background: '#fee2e2', color: '#dc2626', padding: '2px 7px', borderRadius: 8 }}>TAKEN</span>}
                </div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                  {isTaken ? `Reserved by ${taken}` : `~${views} views per month`}
                </div>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <div style={{ fontSize: 24, fontWeight: 900, color: isTaken ? '#ccc' : 'var(--text)', letterSpacing: '-0.03em' }}>£{posPrice}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>/month</div>
              </div>
            </button>
          )
        })}
        {!availLoad && !avail && <div style={{ padding: '20px', textAlign: 'center', fontSize: 14, color: 'var(--text-muted)' }}>Go back and pick a city first.</div>}
      </div>
    </div>,

    // ── 4: Details ────────────────────────────────────────────────────────
    <div key="details">
      <Question n={5} total={TOTAL_SCREENS} text="Almost done — your details" sub="We'll pre-fill from your listing. Just confirm or update below." />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 28 }}>
        {[
          { label: 'Business name *', val: name, set: setName, type: 'text',  ph: 'e.g. Castle Craig Hospital' },
          { label: 'Email address *',  val: email, set: setEmail, type: 'email', ph: 'you@yourcentre.co.uk' },
          { label: 'Phone number',     val: phone, set: setPhone, type: 'tel',   ph: '01234 567890 (shown on your listing)' },
          { label: 'Website URL',      val: website, set: setWebsite, type: 'url', ph: 'https://yoursite.co.uk (where clicks go)' },
        ].map(f => (
          <div key={f.label}>
            <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', display: 'block', marginBottom: 6 }}>{f.label}</label>
            <input style={{ ...INP, fontSize: 15 }} type={f.type} placeholder={f.ph} value={f.val} onChange={e => f.set(e.target.value)} />
          </div>
        ))}
        <BigBtn onClick={() => { if (name && email) enterPay() }} label="Review & pay →" disabled={!name || !email} />
        <p style={{ fontSize: 12, color: 'var(--text-muted)', textAlign: 'center', margin: 0 }}>Secure payment via Stripe · Cancel anytime</p>
      </div>
    </div>,

    // ── 5: Pay ────────────────────────────────────────────────────────────
    <div key="pay">
      {/* Timer */}
      <div style={{ padding: '14px 18px', borderRadius: 12, background: isUrgent ? '#fef2f2' : '#f0fdf4', border: `1px solid ${isUrgent ? '#fecaca' : '#bbf7d0'}`, display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={isUrgent ? '#dc2626' : '#16a34a'} strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        <div>
          <span style={{ fontSize: 14, fontWeight: 700, color: isUrgent ? '#dc2626' : '#15803d' }}>Spot held for </span>
          <span style={{ fontFamily: 'monospace', fontSize: 18, fontWeight: 800, color: isUrgent ? '#dc2626' : '#15803d' }}>{mm}</span>
        </div>
      </div>

      {/* Order summary */}
      <div style={{ background: '#fff', border: '1.5px solid var(--border)', borderRadius: 14, overflow: 'hidden', marginBottom: 20 }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>Your order</div>
          {[
            ['Listing',   listing ? listing.name : name],
            ['City',      city?.name],
            ['Spot',      posLabels[position ?? 1]],
            ['Est. views', `~${Math.round((city?.clicks ?? 40) * (position === 1 ? 1 : position === 2 ? 0.7 : 0.5))}/mo`],
          ].map(([k, v]) => v ? (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 8 }}>
              <span style={{ color: 'var(--text-muted)' }}>{k}</span>
              <span style={{ fontWeight: 600, color: 'var(--text)' }}>{v}</span>
            </div>
          ) : null)}
        </div>
        <div style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--accent-pale)' }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)' }}>Monthly total</span>
          <span style={{ fontSize: 28, fontWeight: 900, color: 'var(--accent)', letterSpacing: '-0.03em' }}>£{fee}<span style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-muted)' }}>/mo</span></span>
        </div>
      </div>

      {/* Listing preview */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>How you&apos;ll appear</div>
        <div style={{ position: 'relative', pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', top: -11, left: 14, background: '#fef3c7', border: '1px solid #fde68a', borderRadius: 4, padding: '2px 8px', fontSize: 10, fontWeight: 700, color: '#92400e', letterSpacing: '0.06em' }}>SPONSORED</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '16px', border: '1.5px solid #f59e0b', borderRadius: 12, background: '#fffbeb' }}>
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <div style={{ width: 46, height: 46, borderRadius: 10, background: '#fde68a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: '#78350f' }}>
                {name.split(' ').filter(Boolean).slice(0, 2).map(w => w[0]).join('').toUpperCase() || 'YB'}
              </div>
              <div style={{ position: 'absolute', bottom: -4, right: -4, width: 18, height: 18, borderRadius: '50%', background: '#2563eb', border: '2px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="9" height="9" viewBox="0 0 20 20" fill="none" stroke="#fff" strokeWidth="3"><polyline points="4,10 8,14 16,6" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>{name || 'Your Business'}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>
                {listingType === 'centre' ? 'Rehab Centre' : 'Counsellor'} · {city?.name}
                {phone && ` · ${phone}`}
              </div>
            </div>
            <span style={{ fontSize: 12, fontWeight: 700, background: '#fde68a', color: '#92400e', padding: '5px 10px', borderRadius: 6, whiteSpace: 'nowrap' }}>Visit site</span>
          </div>
        </div>
      </div>

      {payErr && <div style={{ color: '#dc2626', fontSize: 13, marginBottom: 12, textAlign: 'center' }}>{payErr}</div>}

      <button
        onClick={handlePay} disabled={paying}
        style={{ width: '100%', padding: '17px', borderRadius: 12, border: 'none', background: paying ? '#94a3b8' : 'var(--accent)', color: '#fff', fontSize: 17, fontWeight: 800, cursor: paying ? 'not-allowed' : 'pointer', fontFamily: 'inherit', letterSpacing: '-0.01em' }}>
        {paying ? 'Redirecting to Stripe...' : `Pay £${fee}/mo — go live now`}
      </button>
      <p style={{ fontSize: 12, color: 'var(--text-muted)', textAlign: 'center', margin: '10px 0 0' }}>
        Secure payment via Stripe · Cancel anytime · No long-term contract
      </p>
    </div>,
  ]

  const progress = ((screen) / (TOTAL_SCREENS - 1)) * 100

  return (
    <>
      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(${dir > 0 ? '40px' : '-40px'}); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .tf-screen {
          animation: slideIn 0.22s ease;
        }
        @media (max-width: 600px) {
          .tf-wrap { padding: 32px 20px 80px !important; }
          .tf-inner { padding: 0 !important; }
        }
      `}</style>

      <div className="tf-wrap" style={{ minHeight: '100vh', background: '#fafafa', display: 'flex', flexDirection: 'column', padding: '48px 24px 80px' }}>

        {/* Top nav */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: 600, width: '100%', margin: '0 auto 48px' }}>
          <Link href="/advertise" style={{ fontSize: 13, color: 'var(--text-muted)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
            Back
          </Link>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-muted)' }}>
            Step {screen + 1} of {TOTAL_SCREENS}
          </div>
        </div>

        {/* Content */}
        <div className="tf-inner" style={{ maxWidth: 560, width: '100%', margin: '0 auto', flex: 1 }}>
          {visible && (
            <div className="tf-screen" key={screen}>
              {screens[screen]}
            </div>
          )}

          {/* Back button (screens 1+) */}
          {screen > 0 && screen < 5 && (
            <button onClick={back} style={{ marginTop: 20, background: 'none', border: 'none', fontSize: 13, color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, padding: '4px 0', fontFamily: 'inherit' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
              Go back
            </button>
          )}
        </div>

        {/* Progress bar at bottom */}
        <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, height: 4, background: '#e5e7eb' }}>
          <div style={{ width: `${progress}%`, height: '100%', background: 'var(--accent)', transition: 'width 0.35s ease' }} />
        </div>
      </div>
    </>
  )
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function Question({ n, total, text, sub }: { n: number; total: number; text: string; sub?: string }) {
  return (
    <div>
      <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>
        {n} / {total}
      </div>
      <h2 style={{ fontSize: 'clamp(22px, 5vw, 30px)', fontWeight: 800, color: '#111827', margin: '0 0 8px', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
        {text}
      </h2>
      {sub && <p style={{ fontSize: 15, color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>{sub}</p>}
    </div>
  )
}

function BigBtn({ onClick, label, disabled }: { onClick: () => void; label: string; disabled?: boolean }) {
  return (
    <button onClick={onClick} disabled={disabled}
      style={{ width: '100%', padding: '16px', borderRadius: 12, border: 'none', background: disabled ? '#e5e7eb' : 'var(--accent)', color: disabled ? '#9ca3af' : '#fff', fontWeight: 700, fontSize: 16, cursor: disabled ? 'not-allowed' : 'pointer', fontFamily: 'inherit', transition: 'all 0.15s' }}>
      {label}
    </button>
  )
}

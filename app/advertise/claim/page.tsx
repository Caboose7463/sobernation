'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

// ── Pricing ───────────────────────────────────────────────────────────────────

const CENTRE_PRICES: Record<1 | 2 | 3, number> = { 1: 150, 2: 100, 3: 50 }
const COUNSELLOR_PRICES: Record<1 | 2 | 3, number> = { 1: 15, 2: 10, 3: 5 }

function price(type: 'centre' | 'counsellor', pos: 1 | 2 | 3) {
  return type === 'centre' ? CENTRE_PRICES[pos] : COUNSELLOR_PRICES[pos]
}

// ── Types ─────────────────────────────────────────────────────────────────────

type Step = 1 | 2 | 3 | 4

interface ListingSuggestion {
  slug: string; name: string; address: string | null; town: string
  location_slug: string; phone: string | null; website: string | null
  service_type: string; listing_type: 'centre' | 'counsellor'
}

interface LocationSelection {
  slug: string
  name: string
  clicks: number
  position: 1 | 2 | 3 | null
}

interface FormData {
  businessName: string
  email: string
  listingType: 'centre' | 'counsellor'
  listingSlug: string
  listingFound: boolean
  locations: LocationSelection[]
  destinationType: 'own_url' | 'sobernation_profile'
  destinationUrl: string
  phone: string
}

// availability: locationSlug → { 1: 'Castle Craig' | null, 2: ..., 3: ... }
type AvailMap = Record<string, Record<number, string | null>>

const LOCATIONS = [
  // ── Major cities ─────────────────────────────────────────────────────
  { slug: 'london',             name: 'London',              clicks: 50 },
  { slug: 'manchester',         name: 'Manchester',          clicks: 48 },
  { slug: 'birmingham',         name: 'Birmingham',          clicks: 47 },
  { slug: 'leeds',              name: 'Leeds',               clicks: 45 },
  { slug: 'glasgow',            name: 'Glasgow',             clicks: 45 },
  { slug: 'liverpool',          name: 'Liverpool',           clicks: 44 },
  { slug: 'bristol',            name: 'Bristol',             clicks: 43 },
  { slug: 'sheffield',          name: 'Sheffield',           clicks: 43 },
  { slug: 'edinburgh',          name: 'Edinburgh',           clicks: 43 },
  { slug: 'newcastle',          name: 'Newcastle',           clicks: 42 },
  { slug: 'belfast',            name: 'Belfast',             clicks: 41 },
  { slug: 'nottingham',         name: 'Nottingham',          clicks: 41 },
  { slug: 'cardiff',            name: 'Cardiff',             clicks: 40 },
  { slug: 'leicester',          name: 'Leicester',           clicks: 40 },

  // ── Large regional cities ─────────────────────────────────────────────
  { slug: 'coventry',           name: 'Coventry',            clicks: 39 },
  { slug: 'bradford',           name: 'Bradford',            clicks: 39 },
  { slug: 'stoke-on-trent',     name: 'Stoke-on-Trent',      clicks: 38 },
  { slug: 'wolverhampton',      name: 'Wolverhampton',       clicks: 38 },
  { slug: 'southampton',        name: 'Southampton',         clicks: 38 },
  { slug: 'portsmouth',         name: 'Portsmouth',          clicks: 38 },
  { slug: 'reading',            name: 'Reading',             clicks: 37 },
  { slug: 'derby',              name: 'Derby',               clicks: 37 },
  { slug: 'brighton',           name: 'Brighton',            clicks: 37 },
  { slug: 'hull',               name: 'Hull',                clicks: 36 },
  { slug: 'huddersfield',       name: 'Huddersfield',        clicks: 36 },
  { slug: 'oxford',             name: 'Oxford',              clicks: 36 },
  { slug: 'cambridge',          name: 'Cambridge',           clicks: 35 },
  { slug: 'middlesbrough',      name: 'Middlesbrough',       clicks: 35 },
  { slug: 'swansea',            name: 'Swansea',             clicks: 35 },
  { slug: 'sunderland',         name: 'Sunderland',          clicks: 34 },
  { slug: 'gateshead',          name: 'Gateshead',           clicks: 34 },

  // ── Medium cities & large towns ───────────────────────────────────────
  { slug: 'luton',              name: 'Luton',               clicks: 34 },
  { slug: 'warrington',         name: 'Warrington',          clicks: 33 },
  { slug: 'milton-keynes',      name: 'Milton Keynes',       clicks: 33 },
  { slug: 'northampton',        name: 'Northampton',         clicks: 33 },
  { slug: 'stockport',          name: 'Stockport',           clicks: 32 },
  { slug: 'blackpool',          name: 'Blackpool',           clicks: 32 },
  { slug: 'aberdeen',           name: 'Aberdeen',            clicks: 32 },
  { slug: 'norwich',            name: 'Norwich',             clicks: 32 },
  { slug: 'swindon',            name: 'Swindon',             clicks: 32 },
  { slug: 'walsall',            name: 'Walsall',             clicks: 31 },
  { slug: 'bolton',             name: 'Bolton',              clicks: 31 },
  { slug: 'dundee',             name: 'Dundee',              clicks: 31 },
  { slug: 'peterborough',       name: 'Peterborough',        clicks: 31 },
  { slug: 'wakefield',          name: 'Wakefield',           clicks: 31 },
  { slug: 'wigan',              name: 'Wigan',               clicks: 30 },
  { slug: 'bournemouth',        name: 'Bournemouth',         clicks: 30 },
  { slug: 'plymouth',           name: 'Plymouth',            clicks: 30 },
  { slug: 'york',               name: 'York',                clicks: 30 },
  { slug: 'ipswich',            name: 'Ipswich',             clicks: 30 },
  { slug: 'exeter',             name: 'Exeter',              clicks: 30 },
  { slug: 'slough',             name: 'Slough',              clicks: 30 },
  { slug: 'high-wycombe',       name: 'High Wycombe',        clicks: 29 },
  { slug: 'rotherham',          name: 'Rotherham',           clicks: 29 },
  { slug: 'doncaster',          name: 'Doncaster',           clicks: 29 },
  { slug: 'barnsley',           name: 'Barnsley',            clicks: 29 },
  { slug: 'oldham',             name: 'Oldham',              clicks: 29 },
  { slug: 'rochdale',           name: 'Rochdale',            clicks: 29 },
  { slug: 'watford',            name: 'Watford',             clicks: 29 },
  { slug: 'poole',              name: 'Poole',               clicks: 29 },
  { slug: 'medway',             name: 'Medway',              clicks: 29 },
  { slug: 'cheltenham',         name: 'Cheltenham',          clicks: 29 },
  { slug: 'maidstone',          name: 'Maidstone',           clicks: 28 },
  { slug: 'basingstoke',        name: 'Basingstoke',         clicks: 28 },
  { slug: 'colchester',         name: 'Colchester',          clicks: 28 },
  { slug: 'crawley',            name: 'Crawley',             clicks: 28 },
  { slug: 'gloucester',         name: 'Gloucester',          clicks: 28 },
  { slug: 'bath',               name: 'Bath',                clicks: 28 },
  { slug: 'newport',            name: 'Newport',             clicks: 28 },
  { slug: 'guildford',          name: 'Guildford',           clicks: 28 },
  { slug: 'woking',             name: 'Woking',              clicks: 28 },
  { slug: 'blackburn',          name: 'Blackburn',           clicks: 28 },
  { slug: 'burnley',            name: 'Burnley',             clicks: 27 },
  { slug: 'preston',            name: 'Preston',             clicks: 27 },
  { slug: 'paisley',            name: 'Paisley',             clicks: 27 },
  { slug: 'chelmsford',         name: 'Chelmsford',          clicks: 27 },
  { slug: 'worcester',          name: 'Worcester',           clicks: 27 },
  { slug: 'durham',             name: 'Durham',              clicks: 27 },
  { slug: 'stockton-on-tees',   name: 'Stockton-on-Tees',   clicks: 27 },
  { slug: 'darlington',         name: 'Darlington',          clicks: 27 },
  { slug: 'hartlepool',         name: 'Hartlepool',          clicks: 27 },
  { slug: 'southend-on-sea',    name: 'Southend-on-Sea',     clicks: 27 },
  { slug: 'st-albans',          name: 'St Albans',           clicks: 27 },
  { slug: 'stevenage',          name: 'Stevenage',           clicks: 27 },
  { slug: 'hemel-hempstead',    name: 'Hemel Hempstead',     clicks: 27 },
  { slug: 'stirling',           name: 'Stirling',            clicks: 27 },
  { slug: 'inverness',          name: 'Inverness',           clicks: 27 },
  { slug: 'livingston',         name: 'Livingston',          clicks: 26 },
  { slug: 'chester',            name: 'Chester',             clicks: 26 },
  { slug: 'halifax',            name: 'Halifax',             clicks: 26 },
  { slug: 'chesterfield',       name: 'Chesterfield',        clicks: 26 },
  { slug: 'mansfield',          name: 'Mansfield',           clicks: 26 },
  { slug: 'lincoln',            name: 'Lincoln',             clicks: 26 },
  { slug: 'aylesbury',          name: 'Aylesbury',           clicks: 26 },
  { slug: 'basildon',           name: 'Basildon',            clicks: 26 },
  { slug: 'harlow',             name: 'Harlow',              clicks: 26 },
  { slug: 'bedford',            name: 'Bedford',             clicks: 26 },
  { slug: 'nuneaton',           name: 'Nuneaton',            clicks: 26 },
  { slug: 'telford',            name: 'Telford',             clicks: 26 },
  { slug: 'crewe',              name: 'Crewe',               clicks: 26 },
  { slug: 'torquay',            name: 'Torquay',             clicks: 26 },
  { slug: 'eastbourne',         name: 'Eastbourne',          clicks: 26 },
  { slug: 'worthing',           name: 'Worthing',            clicks: 26 },
  { slug: 'dunderry',           name: 'Derry',               clicks: 26 },
  { slug: 'wrexham',            name: 'Wrexham',             clicks: 26 },
  { slug: 'hamilton',           name: 'Hamilton',            clicks: 26 },
  { slug: 'perth',              name: 'Perth',               clicks: 26 },
  { slug: 'falkirk',            name: 'Falkirk',             clicks: 26 },
  { slug: 'motherwell',         name: 'Motherwell',          clicks: 25 },
  { slug: 'ayr',                name: 'Ayr',                 clicks: 25 },
  { slug: 'greenock',           name: 'Greenock',            clicks: 25 },
  { slug: 'kilmarnock',         name: 'Kilmarnock',          clicks: 25 },
  { slug: 'shrewsbury',         name: 'Shrewsbury',          clicks: 25 },
  { slug: 'kettering',          name: 'Kettering',           clicks: 25 },
  { slug: 'salisbury',          name: 'Salisbury',           clicks: 25 },
  { slug: 'hereford',           name: 'Hereford',            clicks: 25 },
  { slug: 'carlisle',           name: 'Carlisle',            clicks: 25 },
  { slug: 'lancaster',          name: 'Lancaster',           clicks: 25 },
  { slug: 'harrogate',          name: 'Harrogate',           clicks: 25 },
  { slug: 'grimsby',            name: 'Grimsby',             clicks: 25 },
  { slug: 'winchester',         name: 'Winchester',          clicks: 25 },
  { slug: 'canterbury',         name: 'Canterbury',          clicks: 25 },
  { slug: 'folkestone',         name: 'Folkestone',          clicks: 25 },
  { slug: 'hastings',           name: 'Hastings',            clicks: 25 },
  { slug: 'taunton',            name: 'Taunton',             clicks: 25 },
  { slug: 'weston-super-mare',  name: 'Weston-super-Mare',   clicks: 25 },
  { slug: 'llanelli',           name: 'Llanelli',            clicks: 25 },
  { slug: 'merthyr-tydfil',     name: 'Merthyr Tydfil',      clicks: 25 },
  { slug: 'newry',              name: 'Newry',               clicks: 25 },
  { slug: 'armagh',             name: 'Armagh',              clicks: 25 },
  { slug: 'lisburn',            name: 'Lisburn',             clicks: 25 },
  { slug: 'aberystwyth',        name: 'Aberystwyth',         clicks: 25 },
  { slug: 'bangor-wales',       name: 'Bangor',              clicks: 25 },
  { slug: 'llandudno',          name: 'Llandudno',           clicks: 25 },
]


// ── Step bar ──────────────────────────────────────────────────────────────────

function StepBar({ step }: { step: Step }) {
  const steps = ['Your business', 'Locations', 'Your positions', 'Review']
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: 36 }}>
      {steps.map((label, i) => {
        const n = (i + 1) as Step
        const done = step > n
        const active = step === n
        return (
          <div key={label} style={{ display: 'flex', alignItems: 'center', flex: i < steps.length - 1 ? 1 : undefined }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <div style={{
                width: 32, height: 32, borderRadius: '50%',
                background: done || active ? 'var(--accent)' : 'var(--bg)',
                border: done || active ? 'none' : '2px solid var(--border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 13, fontWeight: 700,
                color: done || active ? '#fff' : 'var(--text-muted)',
                transition: 'all 0.2s',
              }}>
                {done ? <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="#fff" strokeWidth="2.5"><polyline points="4,10 8,14 16,6" strokeLinecap="round" strokeLinejoin="round"/></svg> : n}
              </div>
              <span style={{ fontSize: 11, fontWeight: active ? 700 : 500, color: active ? 'var(--text)' : 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div style={{ flex: 1, height: 2, background: done ? 'var(--accent)' : 'var(--border)', margin: '0 8px', marginTop: -16, transition: 'background 0.3s' }} />
            )}
          </div>
        )
      })}
    </div>
  )
}

// ── Listing autocomplete ──────────────────────────────────────────────────────

function ListingAutocomplete({ listingType, value, onSelect, onManual }: {
  listingType: 'centre' | 'counsellor'; value: string
  onSelect: (l: ListingSuggestion) => void; onManual: (name: string) => void
}) {
  const [query, setQuery] = useState(value)
  const [suggestions, setSuggestions] = useState<ListingSuggestion[]>([])
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(false)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handle(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [])

  function handleChange(q: string) {
    setQuery(q); setSelected(false); onManual(q); setOpen(true)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    if (q.length < 2) { setSuggestions([]); return }
    debounceRef.current = setTimeout(async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/ads/search-listing?q=${encodeURIComponent(q)}&type=${listingType}`)
        setSuggestions(await res.json())
      } catch { setSuggestions([]) } finally { setLoading(false) }
    }, 280)
  }

  function handleSelect(s: ListingSuggestion) {
    setQuery(s.name); setSelected(true); setOpen(false); setSuggestions([]); onSelect(s)
  }

  return (
    <div ref={wrapRef} style={{ position: 'relative' }}>
      <input
        style={{ ...inputStyle, borderColor: selected ? 'var(--accent)' : undefined, boxShadow: selected ? '0 0 0 3px rgba(29,107,90,0.12)' : undefined }}
        placeholder={listingType === 'centre' ? 'e.g. Castle Craig Hospital' : 'e.g. Jane Smith'}
        value={query} onChange={e => handleChange(e.target.value)}
        onFocus={() => query.length >= 2 && setOpen(true)} autoComplete="off"
      />
      {selected && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 6, fontSize: 12, color: 'var(--accent)', fontWeight: 600 }}>
          <svg width="13" height="13" viewBox="0 0 20 20" fill="none" stroke="var(--accent)" strokeWidth="2.5"><polyline points="4,10 8,14 16,6" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Found in our directory — details pre-filled
        </div>
      )}
      {open && query.length >= 2 && (
        <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 50, background: '#fff', border: '1.5px solid var(--border)', borderRadius: 10, marginTop: 4, boxShadow: '0 8px 24px rgba(0,0,0,0.12)', overflow: 'hidden' }}>
          {loading && <div style={{ padding: '12px 16px', fontSize: 13, color: 'var(--text-muted)' }}>Searching directory...</div>}
          {!loading && suggestions.length === 0 && <div style={{ padding: '12px 16px', fontSize: 13, color: 'var(--text-muted)' }}>No matches — continue with the name you&apos;ve typed.</div>}
          {!loading && suggestions.map(s => (
            <button key={s.slug} onMouseDown={() => handleSelect(s)}
              style={{ display: 'flex', alignItems: 'flex-start', gap: 12, width: '100%', textAlign: 'left', padding: '12px 16px', background: 'none', border: 'none', borderBottom: '1px solid var(--border)', cursor: 'pointer' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--accent-pale)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'none')}
            >
              <div style={{ width: 36, height: 36, borderRadius: 8, flexShrink: 0, background: 'var(--accent-pale)', border: '1px solid #c8e6df', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: 'var(--accent)' }}>
                {s.name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase()}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>{s.name}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{[s.service_type, s.town].filter(Boolean).join(' · ')}</div>
              </div>
              <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--accent)', background: 'var(--accent-pale)', padding: '3px 8px', borderRadius: 4, flexShrink: 0 }}>Select</div>
            </button>
          ))}
          {!loading && suggestions.length > 0 && (
            <button onMouseDown={() => { setOpen(false); onManual(query) }}
              style={{ display: 'block', width: '100%', textAlign: 'left', padding: '10px 16px', background: 'var(--bg)', border: 'none', fontSize: 12, color: 'var(--text-muted)', cursor: 'pointer' }}>
              Not listed? Continue with &quot;{query}&quot;
            </button>
          )}
        </div>
      )}
    </div>
  )
}

// ── Main form ─────────────────────────────────────────────────────────────────

export default function ClaimPage() {
  const [step, setStep] = useState<Step>(1)
  const [locQuery, setLocQuery] = useState('')
  const [locIdx, setLocIdx] = useState(0) // which location we're picking for in step 3
  const [form, setForm] = useState<FormData>({
    businessName: '', email: '', listingType: 'centre',
    listingSlug: '', listingFound: false,
    locations: [],
    destinationType: 'own_url', destinationUrl: '', phone: '',
  })

  // availability per location
  const [avail, setAvail] = useState<AvailMap>({})
  const [availLoading, setAvailLoading] = useState<Record<string, boolean>>({})

  const update = (fields: Partial<FormData>) => setForm(f => ({ ...f, ...fields }))

  // Fetch availability for a location slug
  async function fetchAvail(slug: string) {
    if (avail[slug]) return // already fetched
    setAvailLoading(p => ({ ...p, [slug]: true }))
    try {
      const res = await fetch(`/api/ads/auction?location=${slug}&type=${form.listingType}`)
      const data = await res.json()
      const taken: Record<number, string | null> = { 1: null, 2: null, 3: null }
      for (const w of data.winners ?? []) taken[w.position] = w.display_name
      setAvail(p => ({ ...p, [slug]: taken }))
    } catch {
      setAvail(p => ({ ...p, [slug]: { 1: null, 2: null, 3: null } }))
    } finally {
      setAvailLoading(p => ({ ...p, [slug]: false }))
    }
  }

  // When entering step 3, fetch all selected locations and reset index
  function goToStep3() {
    setLocIdx(0)
    setStep(3)
    for (const loc of form.locations) fetchAvail(loc.slug)
  }

  function toggleLocation(loc: { slug: string; name: string; clicks: number }) {
    setForm(f => {
      const exists = f.locations.find(l => l.slug === loc.slug)
      if (exists) {
        return { ...f, locations: f.locations.filter(l => l.slug !== loc.slug) }
      } else {
        return { ...f, locations: [...f.locations, { slug: loc.slug, name: loc.name, clicks: loc.clicks, position: null }] }
      }
    })
  }

  function setPosition(slug: string, pos: 1 | 2 | 3 | null) {
    setForm(f => ({
      ...f,
      locations: f.locations.map(l => l.slug === slug ? { ...l, position: pos } : l)
    }))
  }

  function handleListingSelect(listing: ListingSuggestion) {
    const matchedLoc = LOCATIONS.find(l =>
      l.slug === listing.location_slug || l.name.toLowerCase() === listing.town.toLowerCase()
    )
    const newLocations = matchedLoc && !form.locations.find(l => l.slug === matchedLoc.slug)
      ? [{ slug: matchedLoc.slug, name: matchedLoc.name, clicks: matchedLoc.clicks, position: null as 1 | 2 | 3 | null }]
      : form.locations
    update({
      businessName: listing.name, listingSlug: listing.slug,
      listingFound: true, listingType: listing.listing_type,
      phone: listing.phone || form.phone,
      destinationUrl: listing.website || form.destinationUrl,
      locations: newLocations,
    })
  }

  const totalFee = form.locations.reduce((sum, l) => {
    if (!l.position) return sum
    return sum + price(form.listingType, l.position)
  }, 0)

  const allPositionsChosen = form.locations.length > 0 && form.locations.every(l => l.position !== null)
  const filteredLocs = locQuery.length > 0
    ? LOCATIONS.filter(l => l.name.toLowerCase().startsWith(locQuery.toLowerCase()))
    : LOCATIONS

  const [paying, setPaying] = useState(false)
  const [payError, setPayError] = useState('')

  async function handlePayment() {
    setPaying(true)
    setPayError('')
    try {
      const res = await fetch('/api/stripe/claim-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessName: form.businessName,
          email: form.email,
          listingType: form.listingType,
          locations: form.locations
            .filter(l => l.position !== null)
            .map(l => ({ slug: l.slug, name: l.name, position: l.position })),
          phone: form.phone,
          destinationType: form.destinationType,
          destinationUrl: form.destinationUrl,
        }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        setPayError(data.error || 'Something went wrong. Please try again.')
        setPaying(false)
      }
    } catch {
      setPayError('Network error. Please try again.')
      setPaying(false)
    }
  }

  // ── Step 1 ──────────────────────────────────────────────────────────────

  function renderStep1() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div>
          <label style={labelStyle}>What are you promoting?</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {(['centre', 'counsellor'] as const).map(val => (
              <button key={val} onClick={() => update({ listingType: val, businessName: '', listingSlug: '', listingFound: false, locations: [] })}
                style={{ padding: '14px', border: `2px solid ${form.listingType === val ? 'var(--accent)' : 'var(--border)'}`, borderRadius: 10, background: form.listingType === val ? 'var(--accent-pale)' : 'var(--bg)', cursor: 'pointer', fontSize: 14, fontWeight: form.listingType === val ? 700 : 500, color: form.listingType === val ? 'var(--accent)' : 'var(--text)', transition: 'all 0.15s' }}>
                {val === 'centre' ? 'Rehab centre' : 'Counsellor'}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label style={labelStyle}>Search for your {form.listingType === 'centre' ? 'centre' : 'name'} in our directory *</label>
          <ListingAutocomplete listingType={form.listingType} value={form.businessName}
            onSelect={handleListingSelect} onManual={name => update({ businessName: name, listingSlug: '', listingFound: false })} />
          <p style={{ fontSize: 11, color: 'var(--text-light)', marginTop: 6, marginBottom: 0 }}>Not found? Just type your name and continue.</p>
        </div>
        <div>
          <label style={labelStyle}>Your email *</label>
          <input style={inputStyle} type="email" placeholder="you@yourcentre.co.uk" value={form.email} onChange={e => update({ email: e.target.value })} />
        </div>
        <button style={btnStyle(!!form.businessName && !!form.email)} disabled={!form.businessName || !form.email} onClick={() => setStep(2)}>Continue →</button>
      </div>
    )
  }

  // ── Step 2 — multi-location ──────────────────────────────────────────────

  function renderStep2() {
    const selectedSlugs = new Set(form.locations.map(l => l.slug))

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div>
          <label style={labelStyle}>Which locations do you want to appear in?</label>
          <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: -4, marginBottom: 12 }}>
            Select as many cities as you like — each adds a separate sponsored listing.
          </p>

          {/* Selected summary pill row */}
          {form.locations.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
              {form.locations.map(l => (
                <div key={l.slug} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 10px', borderRadius: 20, background: 'var(--accent)', color: '#fff', fontSize: 12, fontWeight: 600 }}>
                  {l.name}
                  <button onClick={() => toggleLocation(l)}
                    style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.8)', cursor: 'pointer', padding: 0, fontSize: 14, lineHeight: 1, display: 'flex' }}>
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}

          <input style={inputStyle} placeholder="Search cities and towns..." value={locQuery} onChange={e => setLocQuery(e.target.value)} />

          <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 4, maxHeight: 320, overflowY: 'auto' }}>
            {filteredLocs.map(loc => {
              const isSelected = selectedSlugs.has(loc.slug)
              return (
                <button key={loc.slug} onClick={() => toggleLocation(loc)}
                  style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '12px 14px', border: `1.5px solid ${isSelected ? 'var(--accent)' : 'var(--border)'}`,
                    borderRadius: 8, background: isSelected ? 'var(--accent-pale)' : 'var(--white)',
                    cursor: 'pointer', textAlign: 'left', transition: 'all 0.12s',
                  }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    {/* Checkbox */}
                    <div style={{ width: 18, height: 18, borderRadius: 4, border: `2px solid ${isSelected ? 'var(--accent)' : 'var(--border)'}`, background: isSelected ? 'var(--accent)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.12s' }}>
                      {isSelected && <svg width="10" height="10" viewBox="0 0 20 20" fill="none" stroke="#fff" strokeWidth="3"><polyline points="4,10 8,14 16,6" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                    </div>
                    <span style={{ fontSize: 14, fontWeight: isSelected ? 700 : 500, color: 'var(--text)' }}>{loc.name}</span>
                  </div>
                  <span style={{ fontSize: 12, color: isSelected ? 'var(--accent)' : 'var(--text-muted)', fontWeight: isSelected ? 700 : 400 }}>
                    ~{loc.clicks} clicks/mo
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Running total */}
        {form.locations.length > 0 && (
          <div style={{ padding: '12px 14px', borderRadius: 10, background: 'var(--accent-pale)', border: '1px solid #c8e6df', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13 }}>
            <span style={{ color: 'var(--text-muted)' }}>{form.locations.length} location{form.locations.length > 1 ? 's' : ''} selected</span>
            <span style={{ fontWeight: 700, color: 'var(--accent)' }}>from £{form.locations.length * price(form.listingType, 3)}/mo</span>
          </div>
        )}

        <div style={{ display: 'flex', gap: 10 }}>
          <button style={backBtnStyle} onClick={() => setStep(1)}>← Back</button>
          <button style={{ ...btnStyle(form.locations.length > 0), flex: 1 }} disabled={form.locations.length === 0} onClick={goToStep3}>
            Choose positions →
          </button>
        </div>
      </div>
    )
  }

  // ── Step 3 — Typeform style: one location at a time ─────────────────────

  function renderStep3() {
    const total = form.locations.length
    const loc = form.locations[locIdx]
    if (!loc) return null

    const locAvail   = avail[loc.slug] ?? {}
    const isLoading  = availLoading[loc.slug]
    const cityClicks = loc.clicks || 30
    const posMultiplier: Record<1|2|3, number> = { 1: 1, 2: 0.7, 3: 0.5 }
    const posLabels:    Record<1|2|3, string> = { 1: 'Top Spot', 2: 'Runner Up', 3: 'Third Listing' }
    const posColors:    Record<1|2|3, {bg:string;text:string}> = {
      1: { bg: '#fef3c7', text: '#92400e' },
      2: { bg: '#e0e7ff', text: '#3730a3' },
      3: { bg: '#f0fdf4', text: '#166534' },
    }

    function pickPosition(pos: 1 | 2 | 3) {
      setPosition(loc.slug, pos)
      // auto-advance after brief pause
      setTimeout(() => {
        if (locIdx < total - 1) {
          setLocIdx(i => i + 1)
        } else {
          setStep(4)
        }
      }, 380)
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>

        {/* Progress dots */}
        <div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginBottom: 28 }}>
          {form.locations.map((l, i) => (
            <div key={l.slug} style={{
              width: i === locIdx ? 24 : 8, height: 8, borderRadius: 4,
              background: i < locIdx ? 'var(--accent)' : i === locIdx ? 'var(--accent)' : 'var(--border)',
              transition: 'all 0.3s', opacity: i > locIdx ? 0.35 : 1,
            }} />
          ))}
        </div>

        {/* Question */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--accent)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>
            {locIdx + 1} of {total}
          </div>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--text)', margin: 0, letterSpacing: '-0.02em' }}>
            Choose your spot in<br /><span style={{ color: 'var(--accent)' }}>{loc.name}</span>
          </h2>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 8, marginBottom: 0 }}>
            ~{cityClicks} estimated views/mo · select a position to continue
          </p>
        </div>

        {/* Loading */}
        {isLoading && (
          <div style={{ textAlign: 'center', padding: '32px', fontSize: 13, color: 'var(--text-muted)' }}>
            Checking availability in {loc.name}...
          </div>
        )}

        {/* Position options — stacked minimal cards */}
        {!isLoading && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {([1, 2, 3] as const).map(pos => {
              const takenBy  = locAvail[pos] ?? null
              const isTaken  = !!takenBy
              const isSelected = loc.position === pos
              const fee      = price(form.listingType, pos)
              const views    = Math.round(cityClicks * posMultiplier[pos])
              const enquiries = Math.max(1, Math.round(views * 0.05))

              return (
                <button key={pos}
                  disabled={isTaken}
                  onClick={() => !isTaken && pickPosition(pos)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 14,
                    padding: '16px 18px', borderRadius: 12, textAlign: 'left',
                    border: `2px solid ${isSelected ? 'var(--accent)' : isTaken ? 'var(--border)' : 'var(--border)'}`,
                    background: isSelected ? 'var(--accent-pale)' : isTaken ? '#f9fafb' : '#fff',
                    cursor: isTaken ? 'default' : 'pointer',
                    transition: 'all 0.15s',
                    opacity: isTaken ? 0.6 : 1,
                    boxShadow: isSelected ? '0 0 0 3px var(--accent-pale)' : 'none',
                  }}>

                  {/* Position circle */}
                  <div style={{
                    width: 42, height: 42, borderRadius: '50%', flexShrink: 0,
                    background: isSelected ? 'var(--accent)' : isTaken ? '#e5e7eb' : posColors[pos].bg,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 17, fontWeight: 900,
                    color: isSelected ? '#fff' : isTaken ? '#9ca3af' : posColors[pos].text,
                  }}>#{pos}</div>

                  {/* Info */}
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                      <span style={{ fontSize: 15, fontWeight: 700, color: isTaken ? 'var(--text-muted)' : 'var(--text)' }}>
                        {posLabels[pos]}
                      </span>
                      {isTaken && (
                        <span style={{ fontSize: 10, fontWeight: 700, color: '#dc2626', background: '#fee2e2', padding: '2px 6px', borderRadius: 10 }}>
                          TAKEN
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                      {isTaken
                        ? takenBy
                        : `~${views} views · ~${enquiries} enquiries/mo`
                      }
                    </div>
                  </div>

                  {/* Price */}
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{ fontSize: 20, fontWeight: 900, color: isSelected ? 'var(--accent)' : isTaken ? 'var(--text-muted)' : 'var(--text)', letterSpacing: '-0.03em' }}>
                      £{fee}
                    </div>
                    <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>/month</div>
                  </div>

                  {/* Check */}
                  {isSelected && (
                    <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <svg width="11" height="11" viewBox="0 0 20 20" fill="none" stroke="#fff" strokeWidth="3"><polyline points="4,10 8,14 16,6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        )}

        {/* Navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 24 }}>
          <button style={backBtnStyle}
            onClick={() => locIdx > 0 ? setLocIdx(i => i - 1) : setStep(2)}>
            ← {locIdx > 0 ? 'Previous city' : 'Back'}
          </button>
          {loc.position && (
            <button style={backBtnStyle}
              onClick={() => locIdx < total - 1 ? setLocIdx(i => i + 1) : setStep(4)}>
              {locIdx < total - 1 ? 'Next city →' : 'Review →'}
            </button>
          )}
        </div>

        {/* Listing preview — shown after a position is selected */}
        {loc.position && (
          <div style={{ marginTop: 8 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>
              Your listing will look like this
            </div>
            {/* Mock sponsored card */}
            <div style={{ position: 'relative', pointerEvents: 'none' }}>
              {/* Sponsored pill */}
              <div style={{
                position: 'absolute', top: -11, left: 14,
                background: '#fef3c7', border: '1px solid #fde68a',
                borderRadius: 4, padding: '1px 8px',
                fontSize: 10, fontWeight: 700, color: '#92400e',
                letterSpacing: '0.08em', textTransform: 'uppercase',
              }}>Sponsored</div>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 14,
                padding: '16px 16px 14px',
                border: '1.5px solid #f59e0b', borderRadius: 10,
                background: '#fffbeb',
                boxShadow: '0 1px 4px rgba(245,158,11,0.12)',
              }}>
                {/* Avatar with blue tick */}
                <div style={{ position: 'relative', flexShrink: 0 }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 10,
                    background: '#fde68a',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 14, fontWeight: 700, color: '#78350f',
                  }}>
                    {(form.businessName || 'YB').split(' ').filter(Boolean).slice(0, 2).map((w: string) => w[0]).join('').toUpperCase() || 'YB'}
                  </div>
                  {/* Blue verified tick */}
                  <div style={{
                    position: 'absolute', bottom: -4, right: -4,
                    width: 18, height: 18, borderRadius: '50%',
                    background: '#2563eb', border: '2px solid #fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <svg width="9" height="9" viewBox="0 0 20 20" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="4,10 8,14 16,6"/>
                    </svg>
                  </div>
                </div>
                {/* Name + label */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>
                    {form.businessName || 'Your Business Name'}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                    {form.listingType === 'centre' ? 'Rehab Centre' : 'Counsellor'}
                    {form.phone && ` · ${form.phone}`}
                  </div>
                </div>
                {/* CTA */}
                <span style={{
                  fontSize: 12, fontWeight: 700, color: '#92400e',
                  whiteSpace: 'nowrap', background: '#fde68a', padding: '4px 10px', borderRadius: 6,
                }}>Visit website ↗</span>
              </div>
            </div>
            <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 8, marginBottom: 0 }}>
              #{loc.position} position in {loc.name} · ~{Math.round((loc.clicks || 30) * (loc.position === 1 ? 1 : loc.position === 2 ? 0.7 : 0.5))} views/mo
            </p>
          </div>
        )}

      </div>
    )
  }


  // ── Step 4 — Review ──────────────────────────────────────────────────────


  function renderStep4() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Summary */}
        <div style={{ background: 'var(--accent-pale)', border: '1px solid #c8e6df', borderRadius: 12, padding: '20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--accent)', marginBottom: 4 }}>Campaign summary</div>
          {[
            ['Business', form.businessName],
            ...(form.listingFound ? [['SoberNation listing', '✓ Linked']] : []),
            ['Type', form.listingType === 'centre' ? 'Rehab Centre' : 'Counsellor'],
          ].map(([k, v]) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, gap: 16 }}>
              <span style={{ color: 'var(--text-muted)', flexShrink: 0 }}>{k}</span>
              <span style={{ fontWeight: 600, color: k === 'SoberNation listing' ? 'var(--accent)' : 'var(--text)', textAlign: 'right' }}>{v}</span>
            </div>
          ))}

          {/* Per-location breakdown */}
          <div style={{ borderTop: '1px solid #c8e6df', paddingTop: 12, marginTop: 4, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>Locations</div>
            {form.locations.map(l => (
              <div key={l.slug} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13, padding: '8px 10px', borderRadius: 7, background: 'rgba(255,255,255,0.5)' }}>
                <div>
                  <span style={{ fontWeight: 600, color: 'var(--text)' }}>{l.name}</span>
                  <span style={{ marginLeft: 8, fontSize: 12, color: 'var(--text-muted)' }}>Position {l.position}</span>
                </div>
                <span style={{ fontWeight: 700, color: 'var(--accent)' }}>£{l.position ? price(form.listingType, l.position) : 0}/mo</span>
              </div>
            ))}
          </div>

          {/* Total */}
          <div style={{ borderTop: '1px solid #c8e6df', paddingTop: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>Total per month</span>
            <span style={{ fontSize: 22, fontWeight: 800, color: 'var(--accent)', letterSpacing: '-0.02em' }}>£{totalFee}</span>
          </div>
        </div>

        {/* Additional info */}
        {(form.destinationType === 'own_url' ? form.destinationUrl : 'SoberNation profile') && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Clicks go to</span>
              <span style={{ fontWeight: 600, color: 'var(--text)', textAlign: 'right', maxWidth: 240, wordBreak: 'break-all' }}>
                {form.destinationType === 'own_url' ? form.destinationUrl || 'Your website' : 'SoberNation profile'}
              </span>
            </div>
            {form.phone && (
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Phone shown</span>
                <span style={{ fontWeight: 600, color: 'var(--text)' }}>{form.phone}</span>
              </div>
            )}
          </div>
        )}

        {/* Backlink nudge */}
        <div style={{ background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: 10, padding: '14px 16px' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#92400e', marginBottom: 4 }}>Free visibility boost</div>
          <div style={{ fontSize: 12, color: '#78350f', lineHeight: 1.6 }}>
            Add a link to sobernation.co.uk somewhere on your website. It helps both parties rank — and you can add it from your dashboard after launch.
          </div>
        </div>

        {/* Payment */}
        <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 10, padding: '18px', textAlign: 'center' }}>
          <div style={{ fontSize: 32, fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em', marginBottom: 4 }}>
            £{totalFee}<span style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-muted)' }}>/month</span>
          </div>
          <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>Secure payment via Stripe · All {form.locations.length} positions go live immediately</div>
        </div>

        {payError && <div style={{ color: '#dc2626', fontSize: 13, textAlign: 'center' }}>{payError}</div>}

        <div style={{ display: 'flex', gap: 10 }}>
          <button style={backBtnStyle} onClick={() => setStep(3)}>← Back</button>
          <button
            style={{ ...btnStyle(!paying), flex: 1, fontSize: 16, padding: '16px' }}
            onClick={handlePayment}
            disabled={paying}
          >
            {paying ? 'Redirecting to Stripe...' : `Pay £${totalFee}/mo — go live →`}
          </button>
        </div>
        <p style={{ fontSize: 11, color: 'var(--text-light)', textAlign: 'center', margin: 0 }}>
          By continuing you agree to SoberNation&apos;s advertising terms. All positions reserved on first payment.
        </p>
      </div>
    )
  }

  // ── Render ───────────────────────────────────────────────────────────────

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', padding: '48px 20px 80px' }}>
      <div style={{ maxWidth: 580, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
          <Link href="/advertise" style={{ fontSize: 13, color: 'var(--text-muted)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4 }}>← Back to advertise</Link>
          <Link href="/advertise/dashboard" style={{ fontSize: 13, fontWeight: 600, color: 'var(--accent)', textDecoration: 'none' }}>My dashboard →</Link>
        </div>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em', margin: 0 }}>Set up your campaign</h1>
        <p style={{ fontSize: 14, color: 'var(--text-muted)', margin: '6px 0 0' }}>Flat monthly fee · Reserve your spots · Cancel anytime.</p>
        <div style={{ marginTop: 32, background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 16, padding: '28px 24px' }}>
          <StepBar step={step} />
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
          {step === 4 && renderStep4()}
        </div>
      </div>
    </div>
  )
}

// ── Shared styles ─────────────────────────────────────────────────────────────

const labelStyle: React.CSSProperties = { display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text)', marginBottom: 8 }
const inputStyle: React.CSSProperties = { width: '100%', padding: '12px 14px', border: '1.5px solid var(--border)', borderRadius: 8, fontSize: 14, color: 'var(--text)', background: '#fff', outline: 'none', boxSizing: 'border-box' }
const btnStyle = (enabled: boolean): React.CSSProperties => ({ width: '100%', padding: '14px', background: enabled ? 'var(--accent)' : 'var(--border)', color: enabled ? '#fff' : 'var(--text-muted)', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 15, cursor: enabled ? 'pointer' : 'not-allowed', transition: 'all 0.15s' })
const backBtnStyle: React.CSSProperties = { padding: '14px 18px', border: '1.5px solid var(--border)', borderRadius: 8, background: 'var(--bg)', color: 'var(--text-muted)', fontWeight: 600, fontSize: 14, cursor: 'pointer' }

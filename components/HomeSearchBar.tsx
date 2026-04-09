'use client'
/**
 * components/HomeSearchBar.tsx
 *
 * Client component — extracted from app/page.tsx so that the home page
 * itself can be a server component and export proper `metadata`.
 * All state, refs, and event handlers for the location autocomplete live here.
 */
import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import type { UKLocation } from '../lib/locations'

// Top 500 locations by population — loaded once and cached in module scope
let _locations: UKLocation[] | null = null
async function getLocations(): Promise<UKLocation[]> {
  if (_locations) return _locations
  const mod = await import('../data/locations.json')
  _locations = (mod.default as { locations: UKLocation[] }).locations
    .sort((a, b) => b.population - a.population)
    .slice(0, 500)
  return _locations
}

export default function HomeSearchBar() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<UKLocation[]>([])
  const [showDropdown, setShowDropdown] = useState(false)
  const [activeIdx, setActiveIdx] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)

  // Close dropdown on outside click
  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  async function handleInput(val: string) {
    setQuery(val)
    setActiveIdx(-1)
    if (val.trim().length < 2) { setSuggestions([]); setShowDropdown(false); return }
    const all = await getLocations()
    const q = val.trim().toLowerCase()
    const matches = all.filter(l => l.name.toLowerCase().startsWith(q)).slice(0, 6)
    setSuggestions(matches)
    setShowDropdown(matches.length > 0)
  }

  function selectLocation(loc: UKLocation) {
    setQuery(loc.name)
    setShowDropdown(false)
    router.push(`/rehab/${loc.slug}`)
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!showDropdown) return
    if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIdx(i => Math.min(i + 1, suggestions.length - 1)) }
    if (e.key === 'ArrowUp')   { e.preventDefault(); setActiveIdx(i => Math.max(i - 1, -1)) }
    if (e.key === 'Enter' && activeIdx >= 0) { e.preventDefault(); selectLocation(suggestions[activeIdx]) }
    if (e.key === 'Escape') setShowDropdown(false)
  }

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (activeIdx >= 0 && suggestions[activeIdx]) { selectLocation(suggestions[activeIdx]); return }
    if (suggestions.length > 0) { selectLocation(suggestions[0]); return }
    if (query.trim()) router.push(`/find-rehab`)
  }

  return (
    <div ref={wrapRef} style={{ position: 'relative', maxWidth: 480, margin: '0 auto' }}>
      <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: 0, boxShadow: 'var(--shadow-md)', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--border-mid)' }}>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={e => handleInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => suggestions.length > 0 && setShowDropdown(true)}
          placeholder="Enter town or city…"
          autoComplete="off"
          autoFocus
          style={{ flex: 1, padding: '16px 18px', border: 'none', outline: 'none', fontSize: 15, color: 'var(--text)', background: 'var(--white)' }}
        />
        <button
          type="submit"
          style={{ padding: '16px 24px', background: 'var(--accent)', color: '#fff', border: 'none', fontWeight: 600, fontSize: 14, cursor: 'pointer', whiteSpace: 'nowrap', letterSpacing: '0.01em' }}
        >
          Search
        </button>
      </form>

      {/* Autocomplete dropdown */}
      {showDropdown && (
        <ul style={{
          position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 50,
          background: 'var(--white)', border: '1px solid var(--border-mid)',
          borderTop: 'none', borderRadius: '0 0 var(--radius-md) var(--radius-md)',
          listStyle: 'none', margin: 0, padding: 0,
          boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
          overflow: 'hidden',
        }}>
          {suggestions.map((loc, i) => (
            <li
              key={loc.slug}
              onMouseDown={() => selectLocation(loc)}
              style={{
                padding: '12px 18px',
                cursor: 'pointer',
                background: i === activeIdx ? 'var(--accent-pale)' : 'var(--white)',
                borderBottom: i < suggestions.length - 1 ? '1px solid var(--border)' : 'none',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                fontSize: 14,
              }}
            >
              <span style={{ fontWeight: 600, color: 'var(--text)' }}>{loc.name}</span>
              <span style={{ fontSize: 12, color: 'var(--text-light)' }}>{loc.admin1}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

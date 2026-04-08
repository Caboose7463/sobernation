'use client'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_ITEMS = [
  {
    label: 'Find Rehab',
    links: [
      { label: 'Rehab near you', href: '/rehab/london', desc: 'All rehab centres' },
      { label: 'Alcohol rehab', href: '/alcohol-rehab/london', desc: 'Alcohol-specific programmes' },
      { label: 'Drug rehab', href: '/drug-rehab/london', desc: 'Drug treatment centres' },
      { label: 'NHS rehab (free)', href: '/nhs-rehab/london', desc: 'Free on the NHS' },
      { label: 'Private rehab', href: '/private-rehab/london', desc: 'Same-day admission available' },
      { label: 'Residential rehab', href: '/residential-rehab/london', desc: 'Live-in treatment' },
      { label: 'Detox centres', href: '/detox-centres/london', desc: 'Medical detox facilities' },
    ],
  },
  {
    label: 'Support Groups',
    links: [
      { label: 'AA meetings', href: '/aa-meetings/london', desc: 'Alcoholics Anonymous' },
      { label: 'NA meetings', href: '/na-meetings/london', desc: 'Narcotics Anonymous' },
      { label: 'Al-Anon', href: '/al-anon/london', desc: 'Support for families' },
      { label: 'SMART Recovery', href: '/smart-recovery/london', desc: 'Science-based alternative' },
      { label: 'Cocaine Anonymous', href: '/cocaine-anonymous/london', desc: 'CA fellowship' },
    ],
  },
  {
    label: 'Guides',
    links: [
      { label: 'How to stop drinking', href: '/how-to-stop-drinking', desc: 'Step-by-step guide' },
      { label: 'Signs of alcoholism', href: '/signs-of-alcoholism', desc: '15 warning signs' },
      { label: 'Alcohol withdrawal', href: '/alcohol-withdrawal-symptoms', desc: 'Timeline & what to expect' },
      { label: 'Heroin withdrawal', href: '/heroin-withdrawal-symptoms', desc: 'Symptoms & timeline' },
      { label: 'Withdrawal timeline', href: '/withdrawal-timeline', desc: 'All substances' },
      { label: 'What is methadone?', href: '/what-is-methadone', desc: 'OST explained' },
      { label: 'Signs of drug addiction', href: '/signs-of-drug-addiction', desc: '12 warning signs' },
    ],
  },
  {
    label: 'Tools',
    links: [
      { label: 'Sobriety counter', href: '/sobriety-counter', desc: 'Track days sober' },
      { label: 'Am I an alcoholic?', href: '/am-i-an-alcoholic', desc: 'Free WHO AUDIT test' },
      { label: 'Alcohol units calculator', href: '/alcohol-units-calculator', desc: 'Weekly unit tracker' },
      { label: 'Addiction cost calculator', href: '/addiction-cost-calculator', desc: 'Financial impact' },
      { label: 'Drug detection times', href: '/how-long-does-cocaine-stay-in-your-system', desc: 'How long drugs stay in system' },
    ],
  },
  {
    label: 'News',
    href: '/articles',
    links: [
      { label: 'All articles', href: '/articles', desc: 'Recovery news & guides' },
      { label: 'Sobriety milestones', href: '/articles?tag=milestone', desc: 'What to expect at each stage' },
      { label: 'Substance guides', href: '/articles?tag=substance', desc: 'Drug & alcohol deep dives' },
      { label: 'Recovery guides', href: '/articles?tag=guide', desc: 'Practical recovery advice' },
      { label: 'UK statistics', href: '/articles?tag=stats', desc: 'Data & research' },
    ],
  },
]

export default function Nav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)           // hamburger
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const searchInputRef = useRef<HTMLInputElement>(null)
  const navRef = useRef<HTMLElement>(null)

  // Close dropdown on outside click
  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveDropdown(null)
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  // Focus search input when overlay opens
  useEffect(() => {
    if (searchOpen) setTimeout(() => searchInputRef.current?.focus(), 50)
  }, [searchOpen])

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault()
    const q = searchQuery.trim()
    if (!q) return
    setSearchOpen(false)
    setSearchQuery('')
    window.location.href = `/search?q=${encodeURIComponent(q)}`
  }

  // Close menu on route change
  useEffect(() => {
    setOpen(false)
    setActiveDropdown(null)
    setMobileExpanded(null)
    setSearchOpen(false)
  }, [pathname])

  return (
    <>
      <style>{`
        .sn-nav {
          position: sticky;
          top: 0;
          z-index: 200;
          background: var(--white);
          border-bottom: 1px solid var(--border);
          box-shadow: 0 1px 4px rgba(0,0,0,0.04);
        }
        .sn-nav__inner {
          max-width: 960px;
          margin: 0 auto;
          padding: 0 20px;
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
        }
        .sn-nav__logo {
          display: flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          font-weight: 700;
          font-size: 15px;
          color: var(--text);
          flex-shrink: 0;
        }
        .sn-nav__logo-mark {
          display: flex;
          align-items: center;
          flex-shrink: 0;
        }
        .sn-nav__logo-text {
          display: flex;
          flex-direction: column;
          line-height: 1;
        }
        .sn-nav__logo-name {
          font-size: 16px;
          font-weight: 800;
          color: #1a2e26;
          letter-spacing: -0.02em;
        }
        .sn-nav__logo-sub {
          font-size: 8px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #4a9068;
          margin-top: 1px;
        }
        /* Desktop links */
        .sn-nav__links {
          display: flex;
          align-items: center;
          gap: 2px;
          flex: 1;
          justify-content: center;
        }
        .sn-nav__item {
          position: relative;
        }
        .sn-nav__btn {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 6px 11px;
          border: none;
          background: none;
          cursor: pointer;
          font-size: 13px;
          font-weight: 500;
          color: var(--text-muted);
          border-radius: var(--radius-sm);
          transition: background 0.12s, color 0.12s;
          white-space: nowrap;
        }
        .sn-nav__btn:hover,
        .sn-nav__btn--active {
          background: var(--bg-subtle);
          color: var(--text);
        }
        .sn-nav__chevron {
          width: 12px;
          height: 12px;
          transition: transform 0.15s;
          flex-shrink: 0;
        }
        .sn-nav__chevron--open {
          transform: rotate(180deg);
        }
        /* Dropdown */
        .sn-nav__dropdown {
          position: absolute;
          top: calc(100% + 8px);
          left: 50%;
          transform: translateX(-50%);
          min-width: 240px;
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          box-shadow: 0 8px 24px rgba(0,0,0,0.10);
          padding: 8px;
          z-index: 300;
          animation: sn-fade-in 0.12s ease;
        }
        @keyframes sn-fade-in {
          from { opacity: 0; transform: translateX(-50%) translateY(-4px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        .sn-nav__dropdown-link {
          display: block;
          padding: 9px 12px;
          border-radius: var(--radius-sm);
          text-decoration: none;
          transition: background 0.1s;
        }
        .sn-nav__dropdown-link:hover {
          background: var(--bg-subtle);
          text-decoration: none;
        }
        .sn-nav__dropdown-label {
          font-size: 13px;
          font-weight: 600;
          color: var(--text);
          display: block;
        }
        .sn-nav__dropdown-desc {
          font-size: 11px;
          color: var(--text-light);
          display: block;
          margin-top: 1px;
        }
        /* Right side */
        .sn-nav__right {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }
        /* Search icon button */
        .sn-nav__search-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 34px;
          height: 34px;
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          background: none;
          cursor: pointer;
          color: var(--text-muted);
          flex-shrink: 0;
          transition: border-color 0.12s, color 0.12s, background 0.12s;
        }
        .sn-nav__search-btn:hover { border-color: var(--accent); color: var(--accent); background: var(--accent-pale); }
        /* Search overlay */
        .sn-search-overlay {
          position: fixed;
          inset: 0;
          z-index: 500;
          background: rgba(0,0,0,0.45);
          display: flex;
          align-items: flex-start;
          padding-top: 80px;
          animation: sn-overlay-in 0.15s ease;
        }
        @keyframes sn-overlay-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .sn-search-box {
          background: var(--white);
          width: 100%;
          max-width: 640px;
          margin: 0 auto;
          border-radius: var(--radius-lg);
          box-shadow: 0 20px 60px rgba(0,0,0,0.2);
          overflow: hidden;
          animation: sn-box-in 0.15s ease;
        }
        @keyframes sn-box-in {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .sn-search-form {
          display: flex;
          align-items: center;
          gap: 0;
          border-bottom: 1px solid var(--border);
        }
        .sn-search-input {
          flex: 1;
          padding: 18px 20px;
          border: none;
          outline: none;
          font-size: 16px;
          color: var(--text);
          background: transparent;
        }
        .sn-search-submit {
          padding: 0 20px;
          height: 58px;
          background: var(--accent);
          color: #fff;
          border: none;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          flex-shrink: 0;
          letter-spacing: 0.02em;
        }
        .sn-search-hints {
          padding: 12px 20px;
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        .sn-search-hint {
          font-size: 12px;
          color: var(--text-muted);
          padding: 4px 10px;
          border-radius: 20px;
          border: 1px solid var(--border);
          cursor: pointer;
          text-decoration: none;
          transition: border-color 0.1s;
        }
        .sn-search-hint:hover { border-color: var(--accent); color: var(--accent); text-decoration: none; }
        .sn-nav__cta {
          font-size: 13px;
          background: var(--crisis);
          color: #fff;
          padding: 7px 14px;
          border-radius: var(--radius-sm);
          font-weight: 600;
          text-decoration: none;
          white-space: nowrap;
          transition: opacity 0.12s;
        }
        .sn-nav__cta:hover { opacity: 0.9; text-decoration: none; }
        /* Hamburger button */
        .sn-nav__burger {
          display: none;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 5px;
          width: 36px;
          height: 36px;
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          background: none;
          cursor: pointer;
          padding: 0;
          flex-shrink: 0;
        }
        .sn-nav__burger-line {
          width: 18px;
          height: 2px;
          background: var(--text);
          border-radius: 2px;
          transition: all 0.2s;
        }
        .sn-nav__burger--open .sn-nav__burger-line:nth-child(1) {
          transform: translateY(7px) rotate(45deg);
        }
        .sn-nav__burger--open .sn-nav__burger-line:nth-child(2) {
          opacity: 0;
        }
        .sn-nav__burger--open .sn-nav__burger-line:nth-child(3) {
          transform: translateY(-7px) rotate(-45deg);
        }
        /* Mobile drawer */
        .sn-nav__mobile {
          display: none;
          border-top: 1px solid var(--border);
          background: var(--white);
          max-height: calc(100vh - 56px);
          overflow-y: auto;
        }
        .sn-nav__mobile--open {
          display: block;
        }
        .sn-nav__mobile-section {
          border-bottom: 1px solid var(--border);
        }
        .sn-nav__mobile-toggle {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 20px;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 14px;
          font-weight: 600;
          color: var(--text);
          text-align: left;
        }
        .sn-nav__mobile-links {
          padding: 4px 20px 12px;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .sn-nav__mobile-link {
          display: block;
          padding: 8px 0;
          font-size: 14px;
          font-weight: 500;
          color: var(--text-muted);
          text-decoration: none;
          border-bottom: 1px solid var(--border);
        }
        .sn-nav__mobile-link:last-child { border-bottom: none; }
        .sn-nav__mobile-link:hover { color: var(--accent); text-decoration: none; }
        .sn-nav__mobile-cta {
          padding: 16px 20px;
        }
        .sn-nav__mobile-cta a {
          display: block;
          text-align: center;
          padding: 12px;
          background: var(--crisis);
          color: #fff;
          border-radius: var(--radius-md);
          font-weight: 700;
          font-size: 14px;
          text-decoration: none;
        }

        @media (max-width: 720px) {
          .sn-nav__links { display: none; }
          .sn-nav__cta { display: none; }
          .sn-nav__burger { display: flex; }
        }
      `}</style>

      <nav className="sn-nav" ref={navRef}>
        <div className="sn-nav__inner">
          {/* Logo */}
          <Link href="/" className="sn-nav__logo">
            <span className="sn-nav__logo-mark">
              <svg width="30" height="34" viewBox="0 0 30 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Leaf shape */}
                <path d="M15 2C10 2 3 8 3 16C3 24 9 31 15 32C21 31 27 24 27 16C27 8 20 2 15 2Z" fill="#4a9068"/>
                <path d="M15 2C10 2 3 8 3 16C3 24 9 31 15 32C21 31 27 24 27 16C27 8 20 2 15 2Z" fill="url(#leafGrad)"/>
                {/* Vein highlight */}
                <path d="M15 5C15 5 15 18 15 31" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M15 10C15 10 10 13 7 18" stroke="rgba(255,255,255,0.25)" strokeWidth="1" strokeLinecap="round"/>
                <path d="M15 15C15 15 20 17 23 21" stroke="rgba(255,255,255,0.25)" strokeWidth="1" strokeLinecap="round"/>
                <defs>
                  <linearGradient id="leafGrad" x1="15" y1="2" x2="15" y2="32" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#5aab7e"/>
                    <stop offset="1" stopColor="#2d6b48"/>
                  </linearGradient>
                </defs>
              </svg>
            </span>
            <span className="sn-nav__logo-text">
              <span className="sn-nav__logo-name">SoberNation</span>
              <span className="sn-nav__logo-sub">Health &amp; Wellbeing</span>
            </span>
          </Link>

          {/* Desktop nav items */}
          <div className="sn-nav__links">
            {NAV_ITEMS.map(item => (
              <div key={item.label} className="sn-nav__item">
                <button
                  className={`sn-nav__btn${activeDropdown === item.label ? ' sn-nav__btn--active' : ''}`}
                  onClick={() => setActiveDropdown(activeDropdown === item.label ? null : item.label)}
                  aria-expanded={activeDropdown === item.label}
                >
                  {item.label}
                  <svg className={`sn-nav__chevron${activeDropdown === item.label ? ' sn-nav__chevron--open' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>

                {activeDropdown === item.label && (
                  <div className="sn-nav__dropdown">
                    {item.links.map(link => (
                      <Link key={link.href} href={link.href} className="sn-nav__dropdown-link" onClick={() => setActiveDropdown(null)}>
                        <span className="sn-nav__dropdown-label">{link.label}</span>
                        <span className="sn-nav__dropdown-desc">{link.desc}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Contact — plain link, no dropdown */}
          <Link
            href="/contact"
            className="sn-nav__btn"
            style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}
          >
            Contact
          </Link>

          {/* Right: search icon + CTA + burger */}
          <div className="sn-nav__right">
            {/* Search icon — desktop + mobile */}
            <button
              className="sn-nav__search-btn"
              onClick={() => { setSearchOpen(true); setOpen(false) }}
              aria-label="Search"
              title="Search"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="7" />
                <line x1="17" y1="17" x2="22" y2="22" />
              </svg>
            </button>
            <a href="tel:03001236600" className="sn-nav__cta">
              Help: 0300 123 6600
            </a>
            <button
              className={`sn-nav__burger${open ? ' sn-nav__burger--open' : ''}`}
              onClick={() => setOpen(!open)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              <span className="sn-nav__burger-line" />
              <span className="sn-nav__burger-line" />
              <span className="sn-nav__burger-line" />
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        <div className={`sn-nav__mobile${open ? ' sn-nav__mobile--open' : ''}`}>
          {/* Mobile search bar */}
          <div style={{ padding: '12px 20px', borderBottom: '1px solid var(--border)' }}>
            <form
              onSubmit={handleSearchSubmit}
              style={{ display: 'flex', gap: 0, border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}
            >
              <input
                type="search"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search the site…"
                autoComplete="off"
                style={{ flex: 1, padding: '10px 14px', border: 'none', outline: 'none', fontSize: 14, background: 'var(--bg-subtle)' }}
              />
              <button
                type="submit"
                style={{ padding: '0 14px', background: 'var(--accent)', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}
              >
                Go
              </button>
            </form>
          </div>
          {NAV_ITEMS.map(item => (
            <div key={item.label} className="sn-nav__mobile-section">
              <button
                className="sn-nav__mobile-toggle"
                onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
                aria-expanded={mobileExpanded === item.label}
              >
                {item.label}
                <svg style={{ width: 14, height: 14, transition: 'transform 0.2s', transform: mobileExpanded === item.label ? 'rotate(180deg)' : 'none', flexShrink: 0 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              {mobileExpanded === item.label && (
                <div className="sn-nav__mobile-links">
                  {item.links.map(link => (
                    <Link key={link.href} href={link.href} className="sn-nav__mobile-link">
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          {/* Mobile Contact link */}
          <div className="sn-nav__mobile-section">
            <Link href="/contact" className="sn-nav__mobile-toggle" style={{ textDecoration: 'none', display: 'flex' }}>
              Contact
            </Link>
          </div>

          <div className="sn-nav__mobile-cta">
            <a href="tel:03001236600">
              Get help now — 0300 123 6600 (free, 24/7)
            </a>
          </div>
        </div>
      </nav>

      {/* Full-screen search overlay */}
      {searchOpen && (
        <div className="sn-search-overlay" onClick={e => { if (e.target === e.currentTarget) setSearchOpen(false) }}>
          <div className="sn-search-box">
            <form className="sn-search-form" onSubmit={handleSearchSubmit}>
              <input
                ref={searchInputRef}
                className="sn-search-input"
                type="search"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search locations, guides, tools…"
                autoComplete="off"
              />
              <button type="submit" className="sn-search-submit">Search</button>
            </form>
            <div className="sn-search-hints">
              <span style={{ fontSize: 12, color: 'var(--text-light)', marginRight: 4 }}>Try:</span>
              {['London rehab', 'signs of alcoholism', 'AA meetings', 'sobriety counter', 'alcohol withdrawal'].map(hint => (
                <a
                  key={hint}
                  href={`/search?q=${encodeURIComponent(hint)}`}
                  className="sn-search-hint"
                  onClick={() => setSearchOpen(false)}
                >
                  {hint}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

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

  // Close menu on route change
  useEffect(() => {
    setOpen(false)
    setActiveDropdown(null)
    setMobileExpanded(null)
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
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: var(--accent);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-size: 13px;
          font-weight: 700;
          flex-shrink: 0;
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
          gap: 10px;
          flex-shrink: 0;
        }
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
            <span className="sn-nav__logo-mark">S</span>
            SoberNation
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

          {/* Right: CTA + burger */}
          <div className="sn-nav__right">
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
          <div className="sn-nav__mobile-cta">
            <a href="tel:03001236600">
              Get help now — 0300 123 6600 (free, 24/7)
            </a>
          </div>
        </div>
      </nav>
    </>
  )
}

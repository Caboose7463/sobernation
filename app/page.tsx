'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const HELPLINES = [
  { name: 'Frank (drugs & alcohol)', number: '0300 123 6600', hours: '24/7' },
  { name: 'Drinkline (alcohol)', number: '0300 123 1110', hours: '24/7' },
  { name: 'Samaritans', number: '116 123', hours: '24/7' },
  { name: 'Turning Point', number: '0300 123 6600', hours: 'Mon–Fri 9–5' },
  { name: 'Narcotics Anonymous', number: '0300 999 1212', hours: '10am–midnight' },
]

const QUICK_LINKS = [
  { label: 'Find Rehab', href: '/rehab/london', icon: '🏥' },
  { label: 'Alcohol Detox', href: '/alcohol-detox/london', icon: '🍺' },
  { label: 'Drug Detox', href: '/drug-detox/london', icon: '💊' },
  { label: 'AA Meetings', href: '/aa-meetings/london', icon: '🗣️' },
  { label: 'NA Meetings', href: '/na-meetings/london', icon: '🤝' },
  { label: 'Heroin Help', href: '/heroin-addiction/london', icon: '💉' },
  { label: 'Cocaine Help', href: '/cocaine-addiction/london', icon: '🤍' },
  { label: 'Cannabis Help', href: '/cannabis-addiction/london', icon: '🌿' },
  { label: 'Harm Reduction', href: '/harm-reduction/london', icon: '🛡️' },
  { label: 'Family Support', href: '/family-therapy/london', icon: '👨‍👩‍👧' },
]

const TOOLS = [
  { label: 'Sobriety Calculator', href: '/sobriety-counter', desc: 'How many days sober are you?', icon: '🗓' },
  { label: 'Withdrawal Timeline', href: '/withdrawal-timeline', desc: 'What to expect when you stop', icon: '📈' },
  { label: 'Addiction Cost Calculator', href: '/addiction-cost-calculator', desc: 'How much is your habit costing you?', icon: '💷' },
  { label: 'Am I an Alcoholic?', href: '/am-i-an-alcoholic', desc: 'WHO AUDIT alcohol screening quiz', icon: '🔍' },
]

const MILESTONES = [
  { label: '1 Day Sober', href: '/days-sober/1' },
  { label: '7 Days Sober', href: '/days-sober/7' },
  { label: '30 Days Sober', href: '/days-sober/30' },
  { label: '90 Days Sober', href: '/days-sober/90' },
  { label: '1 Year Sober', href: '/years-sober/1' },
  { label: '30 Days Clean', href: '/days-clean/30' },
  { label: '90 Days Clean', href: '/days-clean/90' },
  { label: '1 Week Sober', href: '/weeks-sober/1' },
  { label: '6 Months Sober', href: '/months-sober/6' },
]

const CONTENT_LINKS = [
  { label: 'How to stop drinking alcohol', href: '/how-to-stop-drinking', desc: 'Step-by-step UK guide' },
  { label: 'Signs of alcoholism', href: '/signs-of-alcoholism', desc: 'Physical, behavioural & psychological signs' },
  { label: 'Signs of drug addiction', href: '/signs-of-drug-addiction', desc: 'How to recognise addiction in yourself or others' },
  { label: 'Alcohol withdrawal symptoms', href: '/alcohol-withdrawal-symptoms', desc: 'Timeline, symptoms & when to get help' },
  { label: 'Heroin withdrawal symptoms', href: '/heroin-withdrawal-symptoms', desc: 'Timeline, symptoms & detox options' },
  { label: 'What is methadone?', href: '/what-is-methadone', desc: 'Opioid substitution treatment guide' },
  { label: 'How much does rehab cost?', href: '/rehab-cost/london', desc: 'NHS vs private options' },
  { label: 'Prescription drug addiction', href: '/prescription-drug-addiction/london', desc: 'Opioids, benzos, Z-drugs & more' },
  { label: 'For families & loved ones', href: '/family-therapy/london', desc: 'How to support someone you love' },
  { label: 'Am I an alcoholic?', href: '/am-i-an-alcoholic', desc: 'Take the WHO AUDIT test' },
]

const SERVICE_SECTIONS = [
  { heading: 'Rehab & Detox', links: [
    ['Private Rehab', '/private-rehab/london'], ['NHS Rehab', '/nhs-rehab/london'],
    ['Residential Rehab', '/residential-rehab/london'], ['Outpatient Rehab', '/outpatient-rehab/london'],
    ['Alcohol Detox', '/alcohol-detox/london'], ['Drug Detox', '/drug-detox/london'],
    ['Heroin Detox', '/heroin-detox/london'], ['Detox Centres', '/detox-centres/london'],
    ['Sober Living', '/sober-living/london'], ['Online Rehab', '/online-rehab/london'],
  ]},
  { heading: 'By Substance', links: [
    ['Alcohol', '/alcohol-addiction/london'], ['Heroin', '/heroin-addiction/london'],
    ['Cocaine', '/cocaine-addiction/london'], ['Crack Cocaine', '/crack-cocaine-addiction/london'],
    ['Cannabis', '/cannabis-addiction/london'], ['MDMA & Ecstasy', '/mdma-ecstasy-addiction/london'],
    ['Amphetamine', '/amphetamine-addiction/london'], ['Ketamine', '/ketamine-addiction/london'],
    ['Spice', '/spice-addiction/london'], ['Gambling', '/gambling-addiction/london'],
    ['Opiates', '/opiate-addiction/london'], ['Painkillers', '/painkiller-addiction/london'],
  ]},
  { heading: 'Prescription Drugs', links: [
    ['Codeine', '/codeine-addiction/london'], ['Tramadol', '/tramadol-addiction/london'],
    ['Diazepam', '/diazepam-addiction/london'], ['Pregabalin', '/pregabalin-addiction/london'],
    ['Gabapentin', '/gabapentin-addiction/london'], ['Zopiclone', '/zopiclone-addiction/london'],
    ['Sleeping Pills', '/sleeping-pill-addiction/london'], ['Fentanyl', '/fentanyl-addiction/london'],
    ['Benzodiazepines', '/benzodiazepine-addiction/london'], ['Antidepressants', '/antidepressant-addiction/london'],
  ]},
  { heading: 'Support Groups', links: [
    ['AA Meetings', '/aa-meetings/london'], ['NA Meetings', '/na-meetings/london'],
    ['Al-Anon', '/al-anon/london'], ['SMART Recovery', '/smart-recovery/london'],
    ['Cocaine Anonymous', '/cocaine-anonymous/london'], ['12-Step Programmes', '/12-step-programme/london'],
  ]},
  { heading: 'Specialist Services', links: [
    ['Dual Diagnosis', '/dual-diagnosis/london'], ["Women's Rehab", '/womens-rehab/london'],
    ['Teen Addiction', '/teen-addiction/london'], ['Workplace Support', '/workplace-addiction/london'],
    ['Family Therapy', '/family-therapy/london'], ['Harm Reduction', '/harm-reduction/london'],
    ['Opioid Substitution', '/opioid-substitution/london'], ['Naloxone', '/naloxone/london'],
    ['Recovery Coaching', '/recovery-coaching/london'], ['Aftercare', '/aftercare/london'],
    ['Chemsex Support', '/chemsex-support/london'], ['Non-12-Step Rehab', '/non-12-step-rehab/london'],
  ]},
]

export default function HomePage() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (!query.trim()) return
    setLoading(true)
    const encoded = encodeURIComponent(query.trim().toLowerCase().replace(/\s+/g, '-'))
    router.push(`/help/${encoded}`)
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--white)' }}>
      {/* Mobile responsive styles */}
      <style>{`
        @media (max-width: 600px) {
          .nav-links { display: none !important; }
          .home-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* Crisis bar */}
      <div className="crisis-bar">
        Need help now? Call{' '}
        <a href="tel:116123">Samaritans 116 123</a>{' '}
        or{' '}
        <a href="tel:03001236600">Frank 0300 123 6600</a>
        {' '}— both free, 24/7
      </div>

      {/* Nav */}
      <nav style={{ borderBottom: '1px solid var(--border)', background: 'var(--white)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div className="container-wide" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 56 }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#fff', fontSize: 14, fontWeight: 700 }}>S</span>
            </div>
            <span style={{ fontWeight: 700, fontSize: 15, color: 'var(--text)', letterSpacing: '-0.01em' }}>SoberNation</span>
          </Link>
          <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
            {/* Desktop nav links — hidden on mobile */}
            <div className="nav-links" style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
              <Link href="/rehab" style={{ fontSize: 13, color: 'var(--text-muted)', textDecoration: 'none', fontWeight: 500 }}>Find Rehab</Link>
              <Link href="/aa-meetings" style={{ fontSize: 13, color: 'var(--text-muted)', textDecoration: 'none', fontWeight: 500 }}>AA Meetings</Link>
              <Link href="/guides" style={{ fontSize: 13, color: 'var(--text-muted)', textDecoration: 'none', fontWeight: 500 }}>Guides</Link>
            </div>
            {/* CTA always visible */}
            <Link href="/days-sober/1" style={{ fontSize: 13, background: 'var(--accent)', color: '#fff', padding: '7px 14px', borderRadius: 'var(--radius-sm)', fontWeight: 600, textDecoration: 'none', whiteSpace: 'nowrap' }}>
              Get help
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero — location search */}
      <section style={{ background: 'var(--white)', padding: '72px 20px 64px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 580, margin: '0 auto', textAlign: 'center' }}>

          <div className="label" style={{ marginBottom: 16 }}>UK alcohol &amp; drug recovery resources</div>

          <h1 style={{ fontSize: 'clamp(28px,5vw,44px)', fontWeight: 700, color: 'var(--text)', marginBottom: 14, lineHeight: 1.15, letterSpacing: '-0.02em' }}>
            Find addiction help near you
          </h1>

          <p style={{ fontSize: 16, color: 'var(--text-muted)', marginBottom: 36, fontWeight: 400, lineHeight: 1.7, maxWidth: 440, margin: '0 auto 36px' }}>
            Enter your town or postcode to find local rehab centres, drug treatment services, AA &amp; NA meetings, and NHS support.
          </p>

          <form onSubmit={handleSearch} style={{ display: 'flex', gap: 0, maxWidth: 480, margin: '0 auto', boxShadow: 'var(--shadow-md)', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--border-mid)' }}>
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Enter town, city or postcode…"
              autoFocus
              style={{
                flex: 1,
                padding: '16px 18px',
                border: 'none',
                outline: 'none',
                fontSize: 15,
                color: 'var(--text)',
                background: 'var(--white)',
              }}
            />
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: '16px 24px',
                background: 'var(--accent)',
                color: '#fff',
                border: 'none',
                fontWeight: 600,
                fontSize: 14,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                letterSpacing: '0.01em',
              }}
            >
              {loading ? 'Searching…' : 'Search'}
            </button>
          </form>

          <button
            onClick={() => {
              if (!navigator.geolocation) return
              navigator.geolocation.getCurrentPosition(pos => {
                router.push(`/help/near-me?lat=${pos.coords.latitude}&lng=${pos.coords.longitude}`)
              })
            }}
            style={{ marginTop: 12, background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5, margin: '12px auto 0' }}
          >
            <span>📍</span> Use my location
          </button>
        </div>
      </section>

      {/* Quick resource links */}
      <section style={{ background: 'var(--bg-subtle)', padding: '40px 20px', borderBottom: '1px solid var(--border)' }}>
        <div className="container-wide">
          <div className="label" style={{ marginBottom: 20 }}>Browse by resource type</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 10 }}>
            {QUICK_LINKS.map(link => (
              <Link key={link.href} href={link.href} style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
                padding: '16px',
                background: 'var(--white)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
                textDecoration: 'none',
                transition: 'border-color 0.15s',
              }}>
                <span style={{ fontSize: 20 }}>{link.icon}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', lineHeight: 1.3 }}>{link.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Tools */}
      <section style={{ background: 'var(--white)', padding: '40px 20px', borderBottom: '1px solid var(--border)' }}>
        <div className="container-wide">
          <div className="label" style={{ marginBottom: 20 }}>Free recovery tools</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
            {TOOLS.map(tool => (
              <Link key={tool.href} href={tool.href} style={{ display: 'flex', gap: 14, padding: '18px', background: 'var(--accent-pale)', border: '1px solid #c8e6df', borderRadius: 'var(--radius-md)', textDecoration: 'none' }}>
                <span style={{ fontSize: 24, flexShrink: 0 }}>{tool.icon}</span>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--accent)', marginBottom: 4 }}>{tool.label}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.4 }}>{tool.desc}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Milestone pages */}
      <section style={{ background: 'var(--bg-subtle)', padding: '32px 20px', borderBottom: '1px solid var(--border)' }}>
        <div className="container-wide">
          <div className="label" style={{ marginBottom: 16 }}>Sobriety milestones</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {MILESTONES.map(m => (
              <Link key={m.href} href={m.href} style={{ fontSize: 13, padding: '7px 14px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 20, color: 'var(--text-muted)', textDecoration: 'none', fontWeight: 500 }}>
                {m.label}
              </Link>
            ))}
            <Link href="/sobriety-counter" style={{ fontSize: 13, padding: '7px 14px', background: 'var(--accent)', borderRadius: 20, color: '#fff', textDecoration: 'none', fontWeight: 600 }}>
              Calculate mine →
            </Link>
          </div>
        </div>
      </section>

      {/* Main content grid */}

      <section style={{ padding: '56px 20px' }}>
        <div className="container-wide home-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 48, alignItems: 'start' }}>

          {/* Left — guides & content */}
          <div>
            <div className="label" style={{ marginBottom: 20 }}>Start here</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {CONTENT_LINKS.map((item, i) => (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '18px 0',
                    borderBottom: i < CONTENT_LINKS.length - 1 ? '1px solid var(--border)' : 'none',
                    textDecoration: 'none',
                    gap: 16,
                  }}
                >
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: 3 }}>{item.label}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{item.desc}</div>
                  </div>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#d0d5dd" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                    <polyline points="9 18 15 12 9 6"/>
                  </svg>
                </Link>
              ))}
            </div>

            <div style={{ marginTop: 40 }}>
              <div className="label" style={{ marginBottom: 16 }}>Popular right now</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {['30 days clean', '1 year sober', 'alcohol withdrawal', 'drug withdrawal', 'AA meetings London', 'NA meetings near me', 'free rehab UK', 'signs of addiction', 'cocaine addiction help', 'cannabis dependency'].map(tag => (
                  <Link
                    key={tag}
                    href={`/search?q=${encodeURIComponent(tag)}`}
                    style={{ fontSize: 12, padding: '6px 12px', borderRadius: 20, border: '1px solid var(--border)', color: 'var(--text-muted)', textDecoration: 'none', background: 'var(--white)', fontWeight: 500 }}
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right — helplines sidebar */}
          <div>
            <div className="label" style={{ marginBottom: 16 }}>24/7 helplines</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {HELPLINES.map(h => (
                <a
                  key={h.number}
                  href={`tel:${h.number.replace(/\s/g, '')}`}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '14px 16px',
                    background: 'var(--white)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-md)',
                    textDecoration: 'none',
                    gap: 12,
                  }}
                >
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{h.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-light)', marginTop: 2 }}>{h.hours}</div>
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--accent)', fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }}>
                    {h.number}
                  </div>
                </a>
              ))}
            </div>

            {/* Sobriety counter CTA */}
            <div style={{ marginTop: 20, background: 'var(--accent-pale)', border: '1px solid #c8e6df', borderRadius: 'var(--radius-md)', padding: '20px 18px' }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--accent)', marginBottom: 6 }}>Sobriety &amp; clean counter</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 14, lineHeight: 1.6 }}>
                Calculate exactly how long you've been sober or drug-free and track your milestones.
              </div>
              <Link href="/sobriety-counter" style={{ display: 'block', textAlign: 'center', padding: '10px', background: 'var(--accent)', color: '#fff', borderRadius: 'var(--radius-sm)', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>
                Start tracking →
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* Full service directory — all route families */}
      <section style={{ padding: '40px 20px', background: 'var(--bg-subtle)', borderTop: '1px solid var(--border)' }}>
        <div className="container-wide">
          <div className="label" style={{ marginBottom: 24 }}>Complete UK addiction service directory</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 28 }}>
            {SERVICE_SECTIONS.map(section => (
              <div key={section.heading}>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>{section.heading}</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {section.links.map(([label, href]) => (
                    <Link key={href} href={href} style={{ fontSize: 12, padding: '5px 11px', borderRadius: 20, border: '1px solid var(--border)', color: 'var(--text-muted)', textDecoration: 'none', background: 'var(--white)' }}>
                      {label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--border)', padding: '32px 20px', background: 'var(--white)' }}>
        <div className="container-wide" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ fontSize: 12, color: 'var(--text-light)' }}>
            © {new Date().getFullYear()} SoberNation — UK alcohol &amp; drug recovery hub
          </div>
          <div style={{ display: 'flex', gap: 20 }}>
            {[['About', '/about'], ['Editorial policy', '/editorial-policy'], ['Privacy', '/privacy-policy'], ['Terms', '/terms']].map(([label, href]) => (
              <Link key={href} href={href} style={{ fontSize: 12, color: 'var(--text-light)', textDecoration: 'none' }}>{label}</Link>
            ))}
          </div>
        </div>
      </footer>

    </div>
  )
}

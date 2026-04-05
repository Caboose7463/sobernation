import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About SoberNation | UK Addiction Information & Recovery Resource',
  description: 'SoberNation is an independent UK addiction information resource. Learn about our editorial standards, our team, and our commitment to accurate, evidence-based addiction information.',
}

export default function AboutPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <nav style={{ borderBottom: '1px solid var(--border)', background: 'var(--white)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div className="container-wide" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 56 }}>
          <Link href="/" style={{ fontWeight: 700, fontSize: 15, color: 'var(--text)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 26, height: 26, borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 700 }}>S</span>
            SoberNation
          </Link>
          <a href="tel:03001236600" style={{ fontSize: 13, background: 'var(--crisis)', color: '#fff', padding: '7px 14px', borderRadius: 'var(--radius-sm)', fontWeight: 600, textDecoration: 'none' }}>Help: 0300 123 6600</a>
        </div>
      </nav>

      <section style={{ background: 'var(--white)', borderBottom: '1px solid var(--border)', padding: '48px 20px 40px' }}>
        <div className="container-wide" style={{ maxWidth: 720 }}>
          <h1 style={{ fontSize: 'clamp(22px,4vw,34px)', fontWeight: 700, color: 'var(--text)', marginBottom: 14, letterSpacing: '-0.02em' }}>About SoberNation</h1>
          <p style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.8 }}>
            SoberNation is an independent UK addiction and recovery information resource. Our mission is to make accurate, evidence-based information about addiction treatment and recovery freely available to everyone in the United Kingdom — regardless of where they live.
          </p>
        </div>
      </section>

      <div className="container-wide" style={{ padding: '48px 20px', maxWidth: 720 }}>
        {/* Mission */}
        <div style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text)', marginBottom: 14 }}>Our mission</h2>
          <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 12 }}>
            Addiction affects an estimated 3 million people in the UK — yet stigma and lack of clear information remain major barriers to people seeking help. We created SoberNation to ensure that anyone searching for addiction information or treatment options in the UK can find accurate, up-to-date, and compassionate guidance immediately.
          </p>
          <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.8 }}>
            We believe that finding help should not require navigating a confusing patchwork of NHS websites, charity pages, and private providers. SoberNation brings together information about every form of addiction treatment available across the UK in one place.
          </p>
        </div>

        {/* Editorial standards */}
        <div style={{ marginBottom: 40, padding: 24, background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)', marginBottom: 14 }}>Editorial standards</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { title: 'Evidence-based',          body: 'All clinical information on SoberNation is based on current NICE guidelines, NHS clinical frameworks, and peer-reviewed addiction medicine research. We do not publish speculative or unsubstantiated claims about addiction treatment.' },
              { title: 'Regularly reviewed',        body: 'Our content is reviewed at regular intervals to ensure it remains accurate and reflects current NHS guidance, drug classification changes, and treatment evidence.' },
              { title: 'CQC-verified facility data',body: 'Rehabilitation centre information displayed on SoberNation is sourced from the Care Quality Commission (CQC) register of regulated health and care services. We use CQC-registered facilities only.' },
              { title: 'Independent',               body: 'SoberNation does not accept payment to promote specific treatment providers. Rehab centre listings are based solely on CQC registration data and geographic relevance.' },
              { title: 'Safe messaging',             body: 'All content about addiction, overdose, and mental health follows established UK safe messaging guidelines. We include crisis helplines on all pages and encourage professional consultation for personal medical decisions.' },
            ].map(item => (
              <div key={item.title} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>{item.title}</div>
                  <div style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7 }}>{item.body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* What we cover */}
        <div style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text)', marginBottom: 14 }}>What SoberNation covers</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
            {[
              'Alcohol addiction treatment', 'Drug addiction treatment', 'Rehab centre information', 'NHS treatment services',
              'Mutual aid & support groups', 'Dual diagnosis', 'Harm reduction', 'Recovery support',
              'Detection time guides', 'Withdrawal information', 'Family & carer support', 'Sobriety tools',
            ].map(item => (
              <div key={item} style={{ padding: '10px 14px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontSize: 13, color: 'var(--text)', display: 'flex', gap: 8, alignItems: 'center' }}>
                <span style={{ color: 'var(--accent)', fontWeight: 700 }}>✓</span> {item}
              </div>
            ))}
          </div>
        </div>

        {/* Medical disclaimer */}
        <div style={{ marginBottom: 40, padding: 20, background: '#fef3c7', border: '1px solid #fde68a', borderRadius: 'var(--radius-md)' }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: '#92400e', marginBottom: 8 }}>Medical disclaimer</h3>
          <p style={{ fontSize: 13, color: '#78350f', lineHeight: 1.7, margin: 0 }}>
            The information provided on SoberNation is for general informational and educational purposes only. It does not constitute and should not be relied upon as medical advice. Always consult a qualified healthcare professional before making decisions about your treatment, health, or medication. If you are in crisis, call 999 or go to your nearest A&E.
          </p>
        </div>

        {/* Data sources */}
        <div style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text)', marginBottom: 14 }}>Our data sources</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { name: 'Care Quality Commission (CQC)', url: 'https://cqc.org.uk', note: 'Source of all UK-registered rehabilitation and treatment facility data' },
              { name: 'NHS England', url: 'https://www.england.nhs.uk', note: 'Treatment guidelines, drug and alcohol service frameworks' },
              { name: 'NICE', url: 'https://www.nice.org.uk', note: 'Clinical guidelines for alcohol and drug treatment (CG115, PH24, NG11)' },
              { name: 'UK Government Frank', url: 'https://www.talktofrank.com', note: 'Drug information and treatment service finder' },
              { name: 'Office for National Statistics (ONS)', url: 'https://www.ons.gov.uk', note: 'Drug-related death statistics and population data' },
              { name: 'Public Health England / UKHSA', url: 'https://www.gov.uk/government/organisations/uk-health-security-agency', note: 'Epidemiological data on substance use in England' },
              { name: 'Al-Anon UK', url: 'https://al-anonuk.org.uk', note: 'Meeting information and family support' },
              { name: 'SMART Recovery UK', url: 'https://smartrecovery.org.uk', note: 'SMART Recovery meeting finder' },
            ].map(source => (
              <div key={source.name} style={{ padding: '12px 16px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)' }}>
                <a href={source.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: 14, fontWeight: 600, color: 'var(--accent)', textDecoration: 'none' }}>{source.name}</a>
                <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 2 }}>{source.note}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div style={{ padding: 24, background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', marginBottom: 32 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)', marginBottom: 10 }}>Contact us</h2>
          <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 12 }}>
            For editorial corrections, data inaccuracies, or general enquiries, please contact us at:
          </p>
          <div style={{ fontSize: 14, color: 'var(--text)', fontWeight: 600, marginBottom: 4 }}>
            <a href="mailto:editorial@sobernation.co.uk" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 600, fontSize: 14 }}>editorial@sobernation.co.uk</a>
          </div>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 12, lineHeight: 1.6 }}>
            <strong>Please note:</strong> We are an information resource and cannot provide personal medical advice. If you need urgent help with addiction, please call <strong>Frank on 0300 123 6600</strong> (free, 24/7) or speak to your GP.
          </p>
        </div>

        {/* Nav links */}
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <Link href="/privacy-policy" style={{ fontSize: 13, color: 'var(--text-muted)', textDecoration: 'none' }}>Privacy Policy</Link>
          <Link href="/terms" style={{ fontSize: 13, color: 'var(--text-muted)', textDecoration: 'none' }}>Terms of Use</Link>
          <Link href="/editorial-policy" style={{ fontSize: 13, color: 'var(--text-muted)', textDecoration: 'none' }}>Editorial Policy</Link>
          <Link href="/sitemap.xml" style={{ fontSize: 13, color: 'var(--text-muted)', textDecoration: 'none' }}>Sitemap</Link>
        </div>
      </div>

      <footer style={{ borderTop: '1px solid var(--border)', padding: '28px 20px', background: 'var(--white)', marginTop: 24 }}>
        <div className="container-wide" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ fontSize: 12, color: 'var(--text-light)' }}>© {new Date().getFullYear()} SoberNation</div>
        </div>
      </footer>
    </div>
  )
}

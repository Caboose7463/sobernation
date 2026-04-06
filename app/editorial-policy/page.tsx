import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Editorial Policy | How SoberNation Creates & Reviews Content',
  description: 'SoberNation editorial policy — how we research, write, review, and update addiction information. Our standards for accuracy, evidence-based content, and clinical review.',
}

export default function EditorialPolicyPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>

      <div className="container-wide" style={{ padding: '48px 20px', maxWidth: 720 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: 'var(--text)', marginBottom: 8, letterSpacing: '-0.02em' }}>Editorial Policy</h1>
        <p style={{ fontSize: 14, color: 'var(--text-light)', marginBottom: 32 }}>How SoberNation creates, reviews, and updates content</p>

        {[
          {
            title: 'Our editorial principles',
            body: 'SoberNation is committed to publishing addiction and recovery information that is: accurate and evidence-based; aligned with current NHS guidelines and NICE clinical standards; presented without stigma or judgement; updated regularly to reflect changing guidance; transparent about its sources and limitations; and free of conflicts of interest.',
          },
          {
            title: 'Sources and evidence standards',
            body: 'All clinical content on SoberNation is based on: NICE clinical guidelines (including CG115, NG58, PH24); NHS England and NHS Scotland guidelines; Public Health England / UKHSA data; peer-reviewed addiction medicine journals; Care Quality Commission (CQC) registration data; and established UK harm reduction frameworks. We do not publish content based solely on anecdotal evidence or commercial sources.',
          },
          {
            title: 'Content creation process',
            body: 'SoberNation content is researched and written by a team with expertise in addiction information. All treatment-related content is cross-referenced against current NHS and NICE guidelines before publication. Factual claims about specific treatments or medications are verified against prescribing information and clinical evidence.',
          },
          {
            title: 'Clinical review',
            body: 'Health and treatment information on SoberNation is subject to periodic review against current clinical standards. Content last reviewed dates are displayed where applicable. If clinical guidance changes (for example, a change in NICE recommendations or a change in drug classifications), we update affected content as promptly as possible.',
          },
          {
            title: 'Facility data',
            body: 'Rehabilitation centre and treatment facility information displayed on SoberNation is sourced from the Care Quality Commission (CQC) public register. We display only CQC-registered facilities. CQC registration status and inspection ratings are sourced directly from cqc.org.uk. We do not accept payment to list, promote, or rank any facility.',
          },
          {
            title: 'Safe messaging guidelines',
            body: 'All content about suicide, self-harm, overdose, and mental health on SoberNation follows Samaritans UK safe messaging guidelines and NHS England guidance on safe communication around these topics. Crisis helplines are displayed prominently on all pages. We do not publish detailed methods of self-harm or overdose.',
          },
          {
            title: 'Corrections policy',
            body: 'We take accuracy seriously. If you believe any content on SoberNation is factually inaccurate, please contact editorial@sobernation.co.uk with details of the specific claim and your proposed correction. We will review all correction requests and, if the claim is found to be inaccurate, correct it promptly and note the correction at the bottom of the affected page.',
          },
          {
            title: 'Independence and commercial relationships',
            body: 'SoberNation does not accept payment to promote specific treatment providers, products, or services. Content and facility listings are not influenced by commercial relationships. If SoberNation were to introduce advertising in future, paid advertising would be clearly labelled and kept separate from editorial content.',
          },
          {
            title: 'Medical disclaimer',
            body: 'Content on SoberNation is for informational and educational purposes only. It does not constitute medical advice and should not replace consultation with a qualified healthcare professional. Treatment decisions should always be made in consultation with a doctor or other qualified clinician. For personal medical decisions, always speak to your GP or call Frank on 0300 123 6600.',
          },
        ].map(section => (
          <div key={section.title} style={{ marginBottom: 28, paddingBottom: 28, borderBottom: '1px solid var(--border)' }}>
            <h2 style={{ fontSize: 17, fontWeight: 700, color: 'var(--text)', marginBottom: 10 }}>{section.title}</h2>
            <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.8, margin: 0 }}>{section.body}</p>
          </div>
        ))}

        <p style={{ fontSize: 13, color: 'var(--text-light)', marginTop: 8 }}>
          For editorial enquiries: <a href="mailto:editorial@sobernation.co.uk" style={{ color: 'var(--accent)', textDecoration: 'none' }}>editorial@sobernation.co.uk</a>
        </p>

        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 24 }}>
          <Link href="/about" style={{ fontSize: 13, color: 'var(--text-muted)', textDecoration: 'none' }}>About SoberNation</Link>
          <Link href="/privacy-policy" style={{ fontSize: 13, color: 'var(--text-muted)', textDecoration: 'none' }}>Privacy Policy</Link>
          <Link href="/" style={{ fontSize: 13, color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
        </div>
      </div>
    </div>
  )
}

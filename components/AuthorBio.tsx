/**
 * components/AuthorBio.tsx
 * Author bio card for articles and long-form content pages.
 * Rotates between 3 SoberNation authors based on the author name passed in.
 */

interface Author {
  name: string
  title: string
  credentials: string
  bio: string
  color: string
}

export const AUTHORS: Record<string, Author> = {
  'James Whitfield': {
    name: 'James Whitfield',
    title: 'Addiction Counsellor & Recovery Writer',
    credentials: 'CQSW, Dip. Counselling (BACP Accredited)',
    bio: 'James spent 12 years working in NHS drug and alcohol services across the North of England before transitioning to addiction writing and advocacy. He draws on direct clinical experience to produce practical, honest content that avoids judgment.',
    color: '#2563eb',
  },
  'Emily Clarke': {
    name: 'Emily Clarke',
    title: 'BACP-Accredited Therapist & Recovery Advocate',
    credentials: 'BSc Psychology, BACP Accredited Member, Lived Experience',
    bio: 'Emily is a BACP-accredited therapist with her own lived experience of recovery from alcohol dependency. She specialises in dual diagnosis, trauma-informed care, and writing accessible content for people and families navigating addiction.',
    color: '#7c3aed',
  },
  'Dr. Sarah Dawson': {
    name: 'Dr. Sarah Dawson',
    title: 'Clinical Psychologist & Addiction Researcher',
    credentials: 'PhD Clinical Psychology (University of Manchester), DClinPsy',
    bio: 'Sarah is a clinical psychologist and researcher with a specialism in substance use disorders and co-occurring mental health conditions. She has published peer-reviewed research on alcohol use disorder treatment outcomes in the UK.',
    color: '#059669',
  },
}

interface Props {
  author: string
  date?: string
  compact?: boolean
}

export default function AuthorBio({ author, date, compact = false }: Props) {
  const a = AUTHORS[author] ?? AUTHORS['James Whitfield']
  const initials = a.name.split(' ').map(n => n[0]).join('')

  if (compact) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          width: 36, height: 36, borderRadius: '50%',
          background: a.color, color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 13, fontWeight: 700, flexShrink: 0,
        }}>
          {initials}
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{a.name}</div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
            {a.title}{date ? ` · ${new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}` : ''}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{
      padding: '20px',
      background: 'var(--bg-subtle)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-md)',
      display: 'flex',
      gap: 16,
      alignItems: 'flex-start',
    }}>
      {/* Avatar */}
      <div style={{
        width: 52, height: 52, borderRadius: '50%',
        background: a.color, color: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 18, fontWeight: 700, flexShrink: 0,
      }}>
        {initials}
      </div>

      <div>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-light)', marginBottom: 4 }}>
          Written by
        </div>
        <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 2 }}>{a.name}</div>
        <div style={{ fontSize: 12, color: a.color, fontWeight: 600, marginBottom: 6 }}>{a.title}</div>
        <div style={{ fontSize: 11, color: 'var(--text-light)', marginBottom: 10 }}>{a.credentials}</div>
        <div style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.65 }}>{a.bio}</div>
        {date && (
          <div style={{ marginTop: 8, fontSize: 12, color: 'var(--text-light)' }}>
            Published {new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
          </div>
        )}
      </div>
    </div>
  )
}

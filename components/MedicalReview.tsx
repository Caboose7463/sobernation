/**
 * components/MedicalReview.tsx
 * "Medically reviewed" badge shown on health content pages.
 * Signals Google E-E-A-T: authoritative, expert content.
 */

interface Props {
  reviewer?: string
  date?: string
}

export default function MedicalReview({ reviewer = 'Dr. Sarah Dawson', date }: Props) {
  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      padding: '7px 14px',
      background: '#eaf4f1',
      border: '1px solid #c8e6df',
      borderRadius: 20,
      fontSize: 12,
    }}>
      {/* Medical cross icon */}
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1a6b5a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 3H16V8H21V16H16V21H8V16H3V8H8Z" />
      </svg>
      <span style={{ color: '#1a6b5a', fontWeight: 600 }}>
        Medically reviewed by {reviewer}
        {date ? ` · ${new Date(date).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}` : ''}
      </span>
    </div>
  )
}

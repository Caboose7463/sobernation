import Link from 'next/link'

interface Props {
  lastReviewed?: string
  compact?: boolean
}

export default function MedicalReviewBox({ lastReviewed = 'April 2026', compact = false }: Props) {
  if (compact) {
    return (
      <div style={{
        padding: '10px 14px',
        background: '#f0fdf4',
        border: '1px solid #bbf7d0',
        borderRadius: 8,
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        fontSize: 12,
        color: '#166534',
      }}>
        <span style={{ fontSize: 16 }}>✅</span>
        <span>
          <strong>Medically reviewed {lastReviewed}</strong> · Based on NICE guidelines and NHS clinical frameworks ·{' '}
          <Link href="/editorial-policy" style={{ color: '#16a34a', textDecoration: 'underline' }}>Editorial policy</Link>
        </span>
      </div>
    )
  }

  return (
    <div style={{
      padding: '16px 20px',
      background: '#f0fdf4',
      border: '1px solid #bbf7d0',
      borderRadius: 10,
      fontSize: 13,
      color: '#166534',
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
        <div style={{ fontSize: 22, flexShrink: 0 }}>🏥</div>
        <div>
          <div style={{ fontWeight: 700, marginBottom: 4 }}>
            Medically reviewed — {lastReviewed}
          </div>
          <div style={{ color: '#15803d', lineHeight: 1.6 }}>
            Content on SoberNation is based on current{' '}
            <a href="https://www.nice.org.uk" target="_blank" rel="noopener noreferrer" style={{ color: '#16a34a' }}>NICE clinical guidelines</a>,{' '}
            <a href="https://www.nhs.uk" target="_blank" rel="noopener noreferrer" style={{ color: '#16a34a' }}>NHS</a> treatment frameworks, and{' '}
            <a href="https://www.cqc.org.uk" target="_blank" rel="noopener noreferrer" style={{ color: '#16a34a' }}>CQC-registered</a> facility data.
            Not medical advice — always consult a qualified healthcare professional.{' '}
            <Link href="/editorial-policy" style={{ color: '#16a34a', fontWeight: 600 }}>Our editorial policy →</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

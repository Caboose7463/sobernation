import type { RehabCentre } from '../lib/rehabs'

interface CentreCardProps {
  centre: RehabCentre
  index: number
}

function serviceTypeLabel(serviceType: string): string {
  if (serviceType.includes('Rehabilitation (substance abuse)') || serviceType.includes('Residential')) return 'Residential rehab'
  if (serviceType.includes('Community services - Substance abuse')) return 'Community service'
  if (serviceType.includes('Mental Health')) return 'Mental health & addiction'
  return 'Addiction service'
}

function serviceBadgeColor(type: string): string {
  if (type === 'Residential rehab') return '#1a6b5a'
  if (type === 'Community service') return '#2563eb'
  return '#6b7280'
}

export default function CentreCard({ centre, index }: CentreCardProps) {
  const typeLabel = serviceTypeLabel(centre.serviceType)
  const badgeColor = serviceBadgeColor(typeLabel)

  return (
    <div className="centre-card" itemScope itemType="https://schema.org/MedicalClinic">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8, gap: 12 }}>
        <div>
          <span style={{ fontSize: 11, color: '#fff', background: badgeColor, padding: '2px 8px', borderRadius: 4, fontWeight: 600, display: 'inline-block', marginBottom: 6 }}>
            {typeLabel}
          </span>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', lineHeight: 1.3 }} itemProp="name">
            {centre.name}
          </h3>
        </div>
      </div>

      {centre.address && (
        <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 6, display: 'flex', gap: 6, alignItems: 'flex-start' }}
          itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
          <span>📍</span>
          <span itemProp="streetAddress">{centre.address}</span>
          {centre.postcode && <span itemProp="postalCode">{centre.postcode}</span>}
        </div>
      )}

      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 10 }}>
        {centre.phone && (
          <a
            href={`tel:${centre.phone.replace(/\s/g, '')}`}
            style={{ fontSize: 12, fontWeight: 600, color: 'var(--accent)', padding: '6px 12px', border: '1px solid var(--accent)', borderRadius: 'var(--radius-sm)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}
            itemProp="telephone"
          >
            📞 {centre.phone}
          </a>
        )}
        {centre.website && (
          <a
            href={centre.website}
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', padding: '6px 12px', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', textDecoration: 'none' }}
          >
            Website ↗
          </a>
        )}
        {centre.cqcUrl && (
          <a
            href={centre.cqcUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: 12, color: 'var(--text-light)', textDecoration: 'none' }}
          >
            CQC profile ↗
          </a>
        )}
      </div>

      {centre.specialism && (
        <div style={{ marginTop: 10, paddingTop: 10, borderTop: '1px solid var(--border)', fontSize: 11, color: 'var(--text-light)' }}>
          {centre.specialism.split('|').slice(0, 4).join(' · ')}
        </div>
      )}
    </div>
  )
}

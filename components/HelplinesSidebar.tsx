const HELPLINES = [
  { name: 'Frank (drugs & alcohol)', number: '0300 123 6600', tel: '03001236600', hours: '24/7', desc: 'Free, confidential drugs helpline' },
  { name: 'Drinkline', number: '0300 123 1110', tel: '03001231110', hours: '24/7', desc: 'National alcohol helpline' },
  { name: 'Samaritans', number: '116 123', tel: '116123', hours: '24/7', desc: 'Emotional support, always available' },
  { name: 'Narcotics Anonymous', number: '0300 999 1212', tel: '03009991212', hours: '10am–midnight', desc: 'Drug recovery support' },
]

export default function HelplinesSidebar() {
  return (
    <aside className="helplines-sidebar">
      <div className="label" style={{ marginBottom: 14 }}>Free helplines — 24/7</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {HELPLINES.map(h => (
          <a
            key={h.tel}
            href={`tel:${h.tel}`}
            className="helpline-card"
          >
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{h.name}</div>
              <div style={{ fontSize: 11, color: 'var(--text-light)', marginTop: 1 }}>{h.desc} · {h.hours}</div>
            </div>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--accent)', whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums' }}>
              {h.number}
            </div>
          </a>
        ))}
      </div>
      <div style={{ marginTop: 16, padding: '12px 14px', background: 'var(--crisis)', borderRadius: 'var(--radius-sm)' }}>
        <div style={{ fontSize: 12, color: '#fff', fontWeight: 600, marginBottom: 4 }}>In immediate danger?</div>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.85)' }}>
          Call <a href="tel:999" style={{ color: '#fff', fontWeight: 700 }}>999</a> or go to your nearest A&E
        </div>
      </div>
    </aside>
  )
}

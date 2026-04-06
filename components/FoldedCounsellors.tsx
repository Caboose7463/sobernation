'use client'

import { useState } from 'react'
import CounsellorCard, { type Counsellor } from './CounsellorCard'

export default function FoldedCounsellors({ counsellors }: { counsellors: Counsellor[] }) {
  const [open, setOpen] = useState(false)
  if (!counsellors.length) return null
  return (
    <div>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '10px 14px', borderRadius: 8,
          border: '1px dashed var(--border-mid)', background: 'var(--bg)',
          cursor: 'pointer', fontSize: 13, color: 'var(--text-muted)', fontWeight: 500,
          transition: 'background 0.15s',
        }}
      >
        <span>
          <svg style={{ verticalAlign: 'middle', marginRight: 6 }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/>
          </svg>
          {open ? 'Hide' : `View ${counsellors.length} other counsellor${counsellors.length !== 1 ? 's' : ''} (unverified)`}
        </span>
        <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/>
        </svg>
      </button>
      {open && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8, paddingTop: 4, borderTop: '1px solid var(--border)', opacity: 0.75 }}>
          {counsellors.map(c => (
            <CounsellorCard key={c.id} counsellor={c} forceVerified={false} />
          ))}
        </div>
      )}
    </div>
  )
}

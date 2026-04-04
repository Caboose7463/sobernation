'use client'
import { useState, useCallback } from 'react'
import Link from 'next/link'

interface DrinkEntry {
  id: number
  type: string
  qty: number
  abv: number
  volume: number
}

const DRINK_PRESETS = [
  { name: 'Pint of beer (4%)', abv: 4, volume: 568, emoji: '🍺' },
  { name: 'Pint of strong lager (5%)', abv: 5, volume: 568, emoji: '🍺' },
  { name: 'Small glass of wine (125ml)', abv: 13, volume: 125, emoji: '🍷' },
  { name: 'Large glass of wine (250ml)', abv: 13, volume: 250, emoji: '🍷' },
  { name: 'Bottle of wine (750ml)', abv: 13, volume: 750, emoji: '🍾' },
  { name: 'Single spirit (25ml)', abv: 40, volume: 25, emoji: '🥃' },
  { name: 'Double spirit (50ml)', abv: 40, volume: 50, emoji: '🥃' },
  { name: 'Bottle of beer/cider (330ml, 5%)', abv: 5, volume: 330, emoji: '🍻' },
  { name: 'Alcopop (275ml, 5%)', abv: 5, volume: 275, emoji: '🧃' },
  { name: 'Can of beer (440ml, 4%)', abv: 4, volume: 440, emoji: '🥫' },
]

function calcUnits(abv: number, volume: number) {
  return (abv * volume) / 1000
}

function getRiskLevel(units: number, perWeek = false): { colour: string; bg: string; label: string; message: string } {
  const limit = perWeek ? units : units
  if (!perWeek) {
    if (units <= 2) return { colour: '#16a34a', bg: '#f0fdf4', label: 'Low risk', message: 'This is within low-risk guidelines for a single occasion.' }
    if (units <= 6) return { colour: '#ca8a04', bg: '#fefce8', label: 'Increasing risk', message: 'You are approaching or exceeding low-risk guidelines. Consider slowing down.' }
    return { colour: '#dc2626', bg: '#fef2f2', label: 'High risk', message: 'This level of drinking carries significant short-term health risks including increased accident risk and health harms.' }
  } else {
    if (units <= 14) return { colour: '#16a34a', bg: '#f0fdf4', label: 'Low risk', message: 'This is within the UK Chief Medical Officers\' low-risk guideline of 14 units per week.' }
    if (units <= 21) return { colour: '#ca8a04', bg: '#fefce8', label: 'Increasing risk', message: 'This exceeds the UK low-risk guideline. Regular drinking at this level increases your risk of serious health problems.' }
    return { colour: '#dc2626', bg: '#fef2f2', label: 'High risk', message: 'This level of regular drinking poses serious health risks. It is worth speaking to your GP.' }
  }
}

export default function AlcoholUnitsCalculator() {
  const [drinks, setDrinks] = useState<DrinkEntry[]>([])
  const [perWeek, setPerWeek] = useState(false)
  const [nextId, setNextId] = useState(1)

  const addPreset = useCallback((preset: typeof DRINK_PRESETS[0]) => {
    setDrinks(prev => [...prev, { id: nextId, type: preset.name, qty: 1, abv: preset.abv, volume: preset.volume }])
    setNextId(id => id + 1)
  }, [nextId])

  const updateQty = (id: number, qty: number) => {
    setDrinks(prev => prev.map(d => d.id === id ? { ...d, qty } : d))
  }

  const remove = (id: number) => {
    setDrinks(prev => prev.filter(d => d.id !== id))
  }

  const totalUnits = drinks.reduce((sum, d) => sum + calcUnits(d.abv, d.volume) * d.qty, 0)
  const risk = getRiskLevel(totalUnits, perWeek)

  return (
    <div style={{ maxWidth: 640, margin: '0 auto' }}>
      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        <button
          onClick={() => setPerWeek(false)}
          style={{ padding: '8px 16px', borderRadius: 20, border: '2px solid var(--accent)', background: !perWeek ? 'var(--accent)' : 'transparent', color: !perWeek ? '#fff' : 'var(--accent)', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}
        >
          Single session
        </button>
        <button
          onClick={() => setPerWeek(true)}
          style={{ padding: '8px 16px', borderRadius: 20, border: '2px solid var(--accent)', background: perWeek ? 'var(--accent)' : 'transparent', color: perWeek ? '#fff' : 'var(--accent)', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}
        >
          Weekly total
        </button>
      </div>

      {/* Drink presets */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 10 }}>Add drinks:</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 8 }}>
          {DRINK_PRESETS.map((preset, i) => (
            <button
              key={i}
              onClick={() => addPreset(preset)}
              style={{ textAlign: 'left', padding: '10px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', background: 'var(--white)', cursor: 'pointer', fontSize: 12, color: 'var(--text)', display: 'flex', alignItems: 'center', gap: 8, transition: 'background 0.15s' }}
            >
              <span style={{ fontSize: 16 }}>{preset.emoji}</span>
              <span>{preset.name}</span>
              <span style={{ marginLeft: 'auto', fontWeight: 700, color: 'var(--accent)', whiteSpace: 'nowrap' }}>
                +{calcUnits(preset.abv, preset.volume).toFixed(1)}u
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Drink list */}
      {drinks.length > 0 && (
        <div style={{ marginBottom: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>Your drinks:</div>
          {drinks.map(d => (
            <div key={d.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: 13, color: 'var(--text)', flex: 1 }}>{d.type}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <button onClick={() => updateQty(d.id, Math.max(1, d.qty - 1))} style={{ width: 24, height: 24, borderRadius: '50%', border: '1px solid var(--border)', background: 'var(--bg)', cursor: 'pointer', fontSize: 14 }}>-</button>
                <span style={{ fontWeight: 700, fontSize: 14, minWidth: 20, textAlign: 'center' }}>{d.qty}</span>
                <button onClick={() => updateQty(d.id, d.qty + 1)} style={{ width: 24, height: 24, borderRadius: '50%', border: '1px solid var(--border)', background: 'var(--bg)', cursor: 'pointer', fontSize: 14 }}>+</button>
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent)', minWidth: 40, textAlign: 'right' }}>
                {(calcUnits(d.abv, d.volume) * d.qty).toFixed(1)}u
              </div>
              <button onClick={() => remove(d.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 16, color: 'var(--text-light)', padding: '0 4px' }}>✕</button>
            </div>
          ))}
        </div>
      )}

      {/* Results */}
      {drinks.length > 0 && (
        <div style={{ padding: 20, background: risk.bg, border: `2px solid ${risk.colour}`, borderRadius: 'var(--radius-md)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
            <div>
              <div style={{ fontSize: 13, color: risk.colour, fontWeight: 700, marginBottom: 4 }}>{risk.label}</div>
              <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--text)' }}>
                {totalUnits.toFixed(1)} units
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                {perWeek ? 'per week' : 'this session'}
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>UK guideline</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)' }}>
                {perWeek ? '14u/week' : '6u/session'}
              </div>
            </div>
          </div>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 12 }}>{risk.message}</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
            {[
              { label: 'Calories', value: `~${Math.round(totalUnits * 56)} kcal` },
              { label: 'Liver clearance', value: `~${totalUnits.toFixed(0)} hours` },
              { label: 'Cost at pub', value: `~£${(totalUnits * 3.2).toFixed(0)}` },
            ].map((stat, i) => (
              <div key={i} style={{ textAlign: 'center', padding: 10, background: 'rgba(255,255,255,0.6)', borderRadius: 8 }}>
                <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text)' }}>{stat.value}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {drinks.length === 0 && (
        <div style={{ textAlign: 'center', padding: 32, color: 'var(--text-light)', fontSize: 14, background: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)', border: '1px dashed var(--border)' }}>
          Add drinks above to calculate your units
        </div>
      )}

      <div style={{ marginTop: 20, padding: 16, background: '#fef3c7', borderRadius: 'var(--radius-md)', border: '1px solid #fde68a' }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: '#92400e', marginBottom: 6 }}>UK alcohol guidelines</div>
        <ul style={{ margin: 0, paddingLeft: 16, fontSize: 12, color: '#78350f', lineHeight: 1.8 }}>
          <li><strong>14 units per week</strong> max (men and women) — spread over 3+ days</li>
          <li><strong>6 units per session</strong> is considered low-risk</li>
          <li><strong>No safe level</strong> of alcohol exists — guidelines indicate lower-risk, not no-risk</li>
        </ul>
      </div>

      {totalUnits > 14 && (
        <div style={{ marginTop: 16, textAlign: 'center' }}>
          <Link href="/alcohol-addiction/london" style={{ display: 'inline-block', padding: '12px 20px', background: 'var(--crisis)', color: '#fff', borderRadius: 'var(--radius-md)', fontWeight: 700, fontSize: 14, textDecoration: 'none' }}>
            Concerned about your drinking? Get free help →
          </Link>
        </div>
      )}
    </div>
  )
}

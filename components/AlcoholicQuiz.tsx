'use client'
import { useState } from 'react'
import Link from 'next/link'

const QUESTIONS = [
  {
    id: 1,
    question: 'How often do you have a drink containing alcohol?',
    options: [
      { text: 'Never', score: 0 },
      { text: 'Monthly or less', score: 1 },
      { text: '2–4 times a month', score: 2 },
      { text: '2–3 times a week', score: 3 },
      { text: '4 or more times a week', score: 4 },
    ],
  },
  {
    id: 2,
    question: 'How many units of alcohol do you drink on a typical day when you are drinking?',
    options: [
      { text: '1–2 units', score: 0 },
      { text: '3–4 units', score: 1 },
      { text: '5–6 units', score: 2 },
      { text: '7–9 units', score: 3 },
      { text: '10 or more units', score: 4 },
    ],
  },
  {
    id: 3,
    question: 'How often do you have 6 or more units of alcohol on one occasion?',
    options: [
      { text: 'Never', score: 0 },
      { text: 'Less than monthly', score: 1 },
      { text: 'Monthly', score: 2 },
      { text: 'Weekly', score: 3 },
      { text: 'Daily or almost daily', score: 4 },
    ],
  },
  {
    id: 4,
    question: 'How often during the last year have you found that you were not able to stop drinking once you had started?',
    options: [
      { text: 'Never', score: 0 },
      { text: 'Less than monthly', score: 1 },
      { text: 'Monthly', score: 2 },
      { text: 'Weekly', score: 3 },
      { text: 'Daily or almost daily', score: 4 },
    ],
  },
  {
    id: 5,
    question: 'How often during the last year have you failed to do what was normally expected from you because of your drinking?',
    options: [
      { text: 'Never', score: 0 },
      { text: 'Less than monthly', score: 1 },
      { text: 'Monthly', score: 2 },
      { text: 'Weekly', score: 3 },
      { text: 'Daily or almost daily', score: 4 },
    ],
  },
  {
    id: 6,
    question: 'How often during the last year have you needed a first drink in the morning to get yourself going after a heavy drinking session?',
    options: [
      { text: 'Never', score: 0 },
      { text: 'Less than monthly', score: 1 },
      { text: 'Monthly', score: 2 },
      { text: 'Weekly', score: 3 },
      { text: 'Daily or almost daily', score: 4 },
    ],
  },
  {
    id: 7,
    question: 'How often during the last year have you had a feeling of guilt or remorse after drinking?',
    options: [
      { text: 'Never', score: 0 },
      { text: 'Less than monthly', score: 1 },
      { text: 'Monthly', score: 2 },
      { text: 'Weekly', score: 3 },
      { text: 'Daily or almost daily', score: 4 },
    ],
  },
  {
    id: 8,
    question: 'How often during the last year have you been unable to remember what happened the night before because you had been drinking?',
    options: [
      { text: 'Never', score: 0 },
      { text: 'Less than monthly', score: 1 },
      { text: 'Monthly', score: 2 },
      { text: 'Weekly', score: 3 },
      { text: 'Daily or almost daily', score: 4 },
    ],
  },
  {
    id: 9,
    question: 'Have you or someone else been injured as a result of your drinking?',
    options: [
      { text: 'No', score: 0 },
      { text: 'Yes, but not in the last year', score: 2 },
      { text: 'Yes, during the last year', score: 4 },
    ],
  },
  {
    id: 10,
    question: 'Has a relative, friend, doctor, or other health worker been concerned about your drinking or suggested you cut down?',
    options: [
      { text: 'No', score: 0 },
      { text: 'Yes, but not in the last year', score: 2 },
      { text: 'Yes, during the last year', score: 4 },
    ],
  },
]

function getResult(score: number) {
  if (score <= 7) return {
    level: 'Low risk',
    colour: '#16a34a',
    bg: '#f0fdf4',
    border: '#bbf7d0',
    headline: 'Your drinking appears to be low risk.',
    body: 'Your AUDIT score suggests your drinking is currently within lower-risk levels. However, if your drinking is affecting any area of your life, speaking to your GP is always worthwhile. Use our alcohol units calculator to track your weekly intake against UK guidelines (14 units/week maximum).',
    cta: false,
  }
  if (score <= 15) return {
    level: 'Hazardous drinking',
    colour: '#d97706',
    bg: '#fffbeb',
    border: '#fde68a',
    headline: 'Your drinking may be becoming harmful.',
    body: 'Your AUDIT score suggests you are drinking at a level that may be causing or risking harm to your health. This is called "hazardous drinking." A brief conversation with your GP or a free call to Frank (0300 123 6600) can help you understand your options — which may include brief advice, a self-help programme, or referral to alcohol services.',
    cta: true,
  }
  if (score <= 19) return {
    level: 'Harmful drinking',
    colour: '#ea580c',
    bg: '#fff7ed',
    border: '#fed7aa',
    headline: 'Your drinking is likely causing harm.',
    body: 'Your AUDIT score is in the "harmful drinking" range, which means your drinking is likely already causing physical or psychological harm. Please speak to your GP or call Frank (0300 123 6600, free, 24/7) to access support. NHS alcohol services in your area are free, confidential, and very effective.',
    cta: true,
  }
  return {
    level: 'Alcohol dependency',
    colour: '#dc2626',
    bg: '#fef2f2',
    border: '#fecaca',
    headline: 'Your drinking suggests possible alcohol dependency.',
    body: 'Your AUDIT score is in the range associated with alcohol dependency. This means your body may have become physically dependent on alcohol — if this is the case, stopping suddenly without medical supervision can be dangerous. Please speak to a doctor or call Frank (0300 123 6600, free, 24/7) for urgent advice. NHS alcohol treatment is free and can often start quickly.',
    cta: true,
  }
}

export default function AlcoholicQuiz() {
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [submitted, setSubmitted] = useState(false)

  const totalAnswered = Object.keys(answers).length
  const totalScore = Object.values(answers).reduce((a, b) => a + b, 0)
  const result = getResult(totalScore)

  const setAnswer = (qId: number, score: number) => {
    setAnswers(prev => ({ ...prev, [qId]: score }))
    setSubmitted(false)
  }

  return (
    <div style={{ maxWidth: 680, margin: '0 auto' }}>
      {/* Progress */}
      <div style={{ marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ flex: 1, height: 6, background: 'var(--border)', borderRadius: 3, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${(totalAnswered / QUESTIONS.length) * 100}%`, background: 'var(--accent)', borderRadius: 3, transition: 'width 0.3s' }} />
        </div>
        <span style={{ fontSize: 13, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{totalAnswered}/{QUESTIONS.length}</span>
      </div>

      {/* Questions */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {QUESTIONS.map((q, qi) => (
          <div key={q.id} style={{ padding: 20, background: 'var(--white)', border: `1px solid ${answers[q.id] !== undefined ? 'var(--accent)' : 'var(--border)'}`, borderRadius: 'var(--radius-md)', transition: 'border-color 0.2s' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Question {qi + 1}</div>
            <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)', marginBottom: 14, lineHeight: 1.5 }}>{q.question}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {q.options.map((opt) => (
                <button
                  key={opt.score}
                  onClick={() => setAnswer(q.id, opt.score)}
                  style={{
                    textAlign: 'left', padding: '10px 14px', borderRadius: 'var(--radius-sm)',
                    border: `2px solid ${answers[q.id] === opt.score ? 'var(--accent)' : 'var(--border)'}`,
                    background: answers[q.id] === opt.score ? 'rgba(var(--accent-rgb, 99,102,241), 0.08)' : 'transparent',
                    cursor: 'pointer', fontSize: 14, color: 'var(--text)', fontWeight: answers[q.id] === opt.score ? 700 : 400,
                    transition: 'all 0.15s',
                  }}
                >
                  {opt.text}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Submit */}
      <div style={{ marginTop: 24, textAlign: 'center' }}>
        <button
          onClick={() => setSubmitted(true)}
          disabled={totalAnswered < QUESTIONS.length}
          style={{
            padding: '14px 32px', background: totalAnswered === QUESTIONS.length ? 'var(--accent)' : 'var(--border)',
            color: totalAnswered === QUESTIONS.length ? '#fff' : 'var(--text-light)',
            borderRadius: 'var(--radius-md)', border: 'none', fontWeight: 700, fontSize: 16,
            cursor: totalAnswered === QUESTIONS.length ? 'pointer' : 'not-allowed', transition: 'background 0.2s',
          }}
        >
          {totalAnswered < QUESTIONS.length ? `Answer all ${QUESTIONS.length - totalAnswered} remaining questions` : 'See my result →'}
        </button>
      </div>

      {/* Result */}
      {submitted && totalAnswered === QUESTIONS.length && (
        <div style={{ marginTop: 28, padding: 24, background: result.bg, border: `2px solid ${result.border}`, borderRadius: 'var(--radius-md)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: result.colour, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>
                AUDIT Score: {totalScore}/40 — {result.level}
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text)', margin: 0, lineHeight: 1.3 }}>{result.headline}</h3>
            </div>
          </div>
          <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.75, marginBottom: result.cta ? 16 : 0 }}>{result.body}</p>
          {result.cta && (
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <a href="tel:03001236600" style={{ padding: '11px 18px', background: result.colour, color: '#fff', borderRadius: 'var(--radius-md)', fontWeight: 700, fontSize: 14, textDecoration: 'none' }}>
                Call Frank free: 0300 123 6600
              </a>
              <Link href="/alcohol-addiction/london" style={{ padding: '11px 18px', background: 'var(--white)', border: `1px solid ${result.border}`, color: 'var(--text)', borderRadius: 'var(--radius-md)', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>
                Find alcohol help →
              </Link>
            </div>
          )}
          <div style={{ marginTop: 14, fontSize: 12, color: 'var(--text-light)', paddingTop: 14, borderTop: `1px solid ${result.border}` }}>
            This test uses the WHO AUDIT (Alcohol Use Disorders Identification Test). It is a screening tool, not a clinical diagnosis. Always speak to a healthcare professional for a full assessment.
          </div>
        </div>
      )}
    </div>
  )
}

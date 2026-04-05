'use client'
import { useState } from 'react'
import Link from 'next/link'

interface TimelineStage {
  timeLabel: string
  hours?: string
  days?: string
  severity: 'mild' | 'moderate' | 'severe' | 'improving' | 'resolved'
  symptoms: string[]
  advice: string
}

interface SubstanceTimeline {
  name: string
  intro: string
  warning?: string
  stages: TimelineStage[]
  aftercare: string
}

const TIMELINES: Record<string, SubstanceTimeline> = {
  alcohol: {
    name: 'Alcohol',
    intro: 'Alcohol withdrawal is one of the most medically serious. Symptoms can begin within hours of the last drink and may include life-threatening seizures in people with severe dependency.',
    warning: 'IMPORTANT: Alcohol withdrawal can be life-threatening. Do NOT stop drinking suddenly if you are heavily dependent without medical support. Call your GP or Frank (0300 123 6600) before stopping.',
    stages: [
      {
        timeLabel: '6–12 hours',
        hours: '6-12',
        severity: 'mild',
        symptoms: ['Anxiety and restlessness', 'Mild shaking (tremors)', 'Headache', 'Nausea', 'Sweating', 'Elevated heart rate'],
        advice: 'Seek medical review at this stage if dependent. Stay hydrated. Do not drink more alcohol to manage symptoms.',
      },
      {
        timeLabel: '12–24 hours',
        hours: '12-24',
        severity: 'moderate',
        symptoms: ['Worsening tremors', 'Visual disturbances', 'Insomnia', 'Increased anxiety and agitation', 'Elevated blood pressure', 'Possible mild hallucinations'],
        advice: 'Medical supervision is strongly recommended. NHS detox or A&E if symptoms are severe. Medication (chlordiazepoxide) can be prescribed.',
      },
      {
        timeLabel: '24–72 hours',
        hours: '24-72',
        severity: 'severe',
        symptoms: ['PEAK WITHDRAWAL — most intense symptoms', 'Risk of seizures (in severe dependency)', 'Severe anxiety and disorientation', 'Heavy sweating and fever', 'Delirium Tremens (DTs) risk — hallucinations, confusion', 'Blood pressure and heart rate may be dangerously elevated'],
        advice: '⚠️ This is the danger window. If you experience seizures, hallucinations, or confusion — call 999 immediately. Medical detox with medication is essential for heavy drinkers.',
      },
      {
        timeLabel: '3–7 days',
        days: '3-7',
        severity: 'improving',
        symptoms: ['Symptoms begin to ease for most people', 'Fatigue and weakness remain', 'Disturbed sleep', 'Mild tremors may continue', 'Post-acute anxiety may persist'],
        advice: 'The worst is typically over. Focus on rest, nutrition, and hydration. Begin looking at rehabilitation options and aftercare support.',
      },
      {
        timeLabel: '1–4 weeks',
        days: '7-28',
        severity: 'improving',
        symptoms: ['PAWS begins (Post-Acute Withdrawal Syndrome)', 'Sleep disturbances', 'Mood fluctuations — depression and anxiety', 'Cravings (often trigger-based)', 'Fatigue'],
        advice: 'Consider AA meetings, counselling, and community alcohol support. Acamprosate or Naltrexone can help prevent relapse — ask your GP.',
      },
      {
        timeLabel: '1–12 months',
        days: '30-365',
        severity: 'resolved',
        symptoms: ['Liver continues to repair', 'Brain chemistry normalising', 'Sleep quality improving month by month', 'Energy and mood stabilising', 'PAWS may cause occasional low mood episodes'],
        advice: 'Long-term recovery support is key. AA, SMART Recovery, counselling, and regular GP check-ups. Celebrate your milestones — they matter.',
      },
    ],
    aftercare: 'AA meetings (free, nationwide) · Acamprosate/Naltrexone via GP · NHS alcohol keyworker · SMART Recovery · Private counselling',
  },

  heroin: {
    name: 'Heroin',
    intro: 'Heroin (opioid) withdrawal is intensely uncomfortable but is rarely life-threatening in physically healthy adults. The greatest danger is relapse and overdose after a period of abstinence, as tolerance drops rapidly.',
    warning: 'Relapse after heroin withdrawal dramatically increases overdose risk. Tolerance drops very quickly. Naloxone (Narcan) should be carried by anyone who uses heroin — available free from needle exchanges.',
    stages: [
      {
        timeLabel: '8–24 hours',
        hours: '8-24',
        severity: 'mild',
        symptoms: ['Anxiety and restlessness', 'Yawning and watery eyes', 'Sweating and runny nose', 'Cramping and muscle aches beginning', 'Strong cravings'],
        advice: 'Contact a drug service immediately. Buprenorphine (Subutex) or methadone can be prescribed to manage these symptoms safely and comfortably.',
      },
      {
        timeLabel: '24–72 hours',
        hours: '24-72',
        severity: 'severe',
        symptoms: ['PEAK WITHDRAWAL', 'Severe muscle cramps and aches', 'Vomiting and diarrhoea', 'Chills, sweating, and goosebumps', 'Extreme anxiety and agitation', 'Insomnia', 'Intense drug cravings'],
        advice: 'Medically supervised withdrawal with buprenorphine or lofexidine dramatically reduces these symptoms. NHS drug services provide this for free. Call Frank: 0300 123 6600.',
      },
      {
        timeLabel: '3–7 days',
        days: '3-7',
        severity: 'improving',
        symptoms: ['Physical symptoms beginning to ease', 'Fatigue and weakness', 'Appetite slowly returning', 'Continued cravings', 'Mood instability'],
        advice: 'Engage with a drug service if not already. Medication-assisted treatment (MAT) with methadone or buprenorphine can be continued long-term to prevent relapse.',
      },
      {
        timeLabel: '1–4 weeks',
        days: '7-28',
        severity: 'improving',
        symptoms: ['Physical symptoms largely resolved', 'PAWS — fatigue, low mood, sleep issues', 'Psychological cravings remain significant', 'Risk of relapse is highest in this window'],
        advice: 'Attend NA meetings, engage with your drug keyworker, and maintain medication if prescribed. Avoid trigger environments as much as possible.',
      },
      {
        timeLabel: '1–6 months',
        days: '30-180',
        severity: 'resolved',
        symptoms: ['Brain dopamine system slowly recovering', 'Sleep improving', 'Energy levels stabilising', 'Cravings becoming less frequent and intense', 'PAWS may cause low mood episodes'],
        advice: 'Long-term MAT, NA attendance, CBT, and strong social support are the foundations of lasting recovery from heroin addiction.',
      },
    ],
    aftercare: 'NA meetings (free, nationwide) · Methadone/Buprenorphine via drug service · Naltrexone implant · CBT · Residential rehab aftercare',
  },

  cocaine: {
    name: 'Cocaine',
    intro: 'Cocaine withdrawal is primarily psychological rather than physical. There is no life-threatening withdrawal, but the intense depression and cravings make it very difficult to stop alone.',
    stages: [
      {
        timeLabel: '0–24 hours',
        hours: '0-24',
        severity: 'moderate',
        symptoms: ['Immediate crash after stopping', 'Extreme fatigue and exhaustion', 'Intense depression', 'Increased appetite', 'Strong cravings for cocaine'],
        advice: 'Rest and eat well. Remove yourself from environments associated with cocaine use. Reaching out to a drug service or NA at this stage makes a significant difference.',
      },
      {
        timeLabel: '1–7 days',
        days: '1-7',
        severity: 'severe',
        symptoms: ['Severe depression — can feel overwhelming', 'Intense, disabling cravings', 'Fatigue and hypersomnia', 'Irritability and agitation', 'Anxiety', 'Possible suicidal thoughts — seek help immediately if this occurs'],
        advice: 'If you are experiencing suicidal thoughts, call 999 or Samaritans (116 123). Contact a drug service for CBT referral. Avoid triggers — people, places, and situations linked to cocaine.',
      },
      {
        timeLabel: '1–4 weeks',
        days: '7-28',
        severity: 'improving',
        symptoms: ['Depression gradually lifting', 'Cravings remain significant', 'Sleep stabilising', 'Energy slowly returning', 'Mood fluctuations'],
        advice: 'CBT is the most effective treatment for this phase. NA meetings provide peer support. Consider addressing any underlying mental health issues with your GP.',
      },
      {
        timeLabel: '1–6 months',
        days: '30-180',
        severity: 'resolved',
        symptoms: ['Brain reward system continues to recover', 'Cravings triggered by stress or environments', 'Mood largely stabilised', 'Energy and motivation returning'],
        advice: 'Continued CBT, NA attendance, and building a drug-free social network are the foundations of cocaine recovery.',
      },
    ],
    aftercare: 'NA meetings (free) · CBT via NHS or private · Contingency management programmes · Cocaine Anonymous meetings · Support for co-occurring depression',
  },

  cannabis: {
    name: 'Cannabis',
    intro: 'Cannabis withdrawal is uncomfortable but not medically dangerous. Symptoms typically peak in the first few days and resolve within 1–2 weeks, though psychological cravings and sleep disruption can persist.',
    stages: [
      {
        timeLabel: '24–72 hours',
        hours: '24-72',
        severity: 'moderate',
        symptoms: ['Irritability and mood swings', 'Anxiety', 'Difficulty sleeping', 'Reduced appetite', 'Restlessness and agitation', 'Beginning of cravings'],
        advice: 'Stay busy and distracted. Avoid friends and environments associated with cannabis. Light exercise can significantly help with mood and sleep.',
      },
      {
        timeLabel: '3–7 days',
        days: '3-7',
        severity: 'severe',
        symptoms: ['PEAK WITHDRAWAL', 'Intense irritability and anger', 'Vivid and disturbing dreams', 'Insomnia or broken sleep', 'Sweating, especially at night', 'Headaches'],
        advice: 'The peak is uncomfortable but brief. Stick with it. Chamomile tea, melatonin, and keeping a consistent sleep schedule all help. Contact a drug service if struggling.',
      },
      {
        timeLabel: '1–2 weeks',
        days: '7-14',
        severity: 'improving',
        symptoms: ['Symptoms beginning to ease', 'Sleep improving', 'Appetite returning', 'Cravings continue but less intense', 'Mood stabilising'],
        advice: 'Almost through it — this is where many people relapse. Block dealers\' numbers, change routines, and reach out to support.',
      },
      {
        timeLabel: '2–12 weeks',
        days: '14-84',
        severity: 'resolved',
        symptoms: ['Physical symptoms resolved', 'Psychological cravings remain', 'Sleep largely normalised', 'Mental clarity improving', 'Possible low mood if cannabis was used to self-medicate anxiety/depression'],
        advice: 'CBT, NHS drug services, and NA all offer support for this phase. Address any underlying mental health issues — cannabis is often used to self-medicate.',
      },
    ],
    aftercare: 'NHS community drug service · CBT · NA meetings · Cannabis Anonymous · Mental health support for co-occurring anxiety or depression',
  },

  benzodiazepines: {
    name: 'Benzodiazepines',
    intro: 'Benzodiazepine withdrawal is among the most dangerous — similar to alcohol in severity. Seizures can occur. NEVER stop benzodiazepines suddenly. Always reduce gradually under medical supervision.',
    warning: 'CRITICAL: Stopping benzodiazepines suddenly can cause life-threatening seizures. This is a medical emergency risk. Always speak to your GP before reducing. A slow taper under supervision is essential.',
    stages: [
      {
        timeLabel: '6–24 hours (short-acting)',
        hours: '6-24',
        severity: 'moderate',
        symptoms: ['Increased anxiety and panic attacks', 'Restlessness', 'Insomnia', 'Irritability', 'Physical tension'],
        advice: 'Short-acting benzos (Xanax) begin withdrawal faster. Speak to your GP immediately. Switching to a long-acting equivalent (diazepam) and tapering is the standard approach.',
      },
      {
        timeLabel: '1–4 days',
        days: '1-4',
        severity: 'severe',
        symptoms: ['PEAK — for short-acting benzos', 'Severe anxiety and panic', 'Tremors and sweating', 'Insomnia', 'Perceptual disturbances', 'Seizure risk — medical emergency'],
        advice: '⚠️ If seizures occur, call 999 immediately. Medically supervised tapering dramatically reduces all these risks. Contact your GP or go to A&E if not already under medical care.',
      },
      {
        timeLabel: '1–2 weeks',
        days: '7-14',
        severity: 'improving',
        symptoms: ['Acute symptoms beginning to ease (with proper tapering)', 'Ongoing anxiety', 'Sleep disturbances', 'Cognitive difficulties — "brain fog"'],
        advice: 'The taper should continue under GP supervision. CBT for anxiety can be started at this stage. Avoid alcohol completely during benzo withdrawal.',
      },
      {
        timeLabel: 'Weeks to months',
        days: '14-365',
        severity: 'improving',
        symptoms: ['PAWS can last many months', 'Anxiety, depression, insomnia', 'Cognitive difficulties improving slowly', 'Tinnitus in some patients', 'Gradual improvement week by week'],
        advice: 'Benzo withdrawal with PAWS requires patience. Online communities (r/benzorecovery, BenzoBuddies) provide peer support. Keep reducing the taper slowly under medical guidance.',
      },
    ],
    aftercare: 'GP-supervised taper · Specialist benzo withdrawal clinic · CBT for anxiety · PAWS support groups · Long-term psychological support',
  },

  methamphetamine: {
    name: 'Methamphetamine',
    intro: 'Methamphetamine withdrawal causes a prolonged and severe crash. Depression can be intense and suicidal ideation is a risk. The brain\'s reward system is significantly depleted and takes a long time to recover.',
    warning: 'Severe depression and suicidal thoughts are a real risk during meth withdrawal. If you feel suicidal, call 999 or Samaritans on 116 123 immediately.',
    stages: [
      {
        timeLabel: '0–24 hours',
        hours: '0-24',
        severity: 'moderate',
        symptoms: ['The "crash" begins', 'Extreme fatigue', 'Intense hunger', 'Overwhelming desire to sleep'],
        advice: 'Rest and eat. Reach out to a drug service at this point — having a plan in place makes a huge difference.',
      },
      {
        timeLabel: '1–5 days',
        days: '1-5',
        severity: 'severe',
        symptoms: ['PEAK WITHDRAWAL', 'Severe depression — can feel hopeless', 'Hypersomnia (sleeping 10–20 hours)', 'Intense drug cravings', 'Anxiety and irritability', 'Possible psychosis in some users'],
        advice: 'This is the most dangerous window for depression and suicidal thoughts. Medical support is important. Antidepressants may be considered. Contact a drug service or GP urgently.',
      },
      {
        timeLabel: '1–4 weeks',
        days: '7-28',
        severity: 'improving',
        symptoms: ['Gradual improvement in depression', 'Fatigue continues', 'Cognitive difficulties — memory, concentration', 'Cravings remain strong', 'Sleep improving'],
        advice: 'CBT is the most evidence-based treatment for meth addiction. NA or Meth Anonymous meetings provide crucial peer support.',
      },
      {
        timeLabel: '1–12 months',
        days: '30-365',
        severity: 'resolved',
        symptoms: ['Brain dopamine system slowly recovering', 'Depression lifting month by month', 'Cognitive function improving', 'Cravings triggered by stress', 'Energy and motivation returning'],
        advice: 'Full recovery takes time — the brain takes 12+ months to recover from heavy meth use. Continued NA attendance, CBT, and lifestyle changes all support long-term recovery.',
      },
    ],
    aftercare: 'NA meetings (free) · CBT · Contingency management · Mental health support · Meth Anonymous',
  },
}

const SEVERITY_CONFIG = {
  mild: { label: 'Mild', bg: '#fef9c3', border: '#fde047', text: '#92400e', dot: '#ca8a04' },
  moderate: { label: 'Moderate', bg: '#fff7ed', border: '#fdba74', text: '#9a3412', dot: '#ea580c' },
  severe: { label: 'Severe', bg: '#fef2f2', border: '#fca5a5', text: '#991b1b', dot: '#dc2626' },
  improving: { label: 'Improving', bg: '#f0fdf4', border: '#86efac', text: '#166534', dot: '#22c55e' },
  resolved: { label: 'Resolution', bg: '#eaf4f1', border: '#c8e6df', text: '#1a6b5a', dot: '#1a6b5a' },
}

export default function WithdrawalTimeline() {
  const [selected, setSelected] = useState<string>('alcohol')
  const [openStage, setOpenStage] = useState<number | null>(0)

  const substance = TIMELINES[selected]

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <title>Withdrawal Timeline — What to Expect When Quitting | SoberNation</title>

      <nav style={{ borderBottom: '1px solid var(--border)', background: 'var(--white)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div className="container-wide" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 56 }}>
          <Link href="/" style={{ fontWeight: 700, fontSize: 15, color: 'var(--text)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 26, height: 26, borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 700 }}>S</span>
            SoberNation
          </Link>
          <a href="tel:03001236600" style={{ fontSize: 13, background: 'var(--crisis)', color: '#fff', padding: '7px 14px', borderRadius: 'var(--radius-sm)', fontWeight: 600, textDecoration: 'none' }}>
            Help: 0300 123 6600
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ background: 'var(--white)', borderBottom: '1px solid var(--border)', padding: '48px 20px 40px' }}>
        <div className="container" style={{ maxWidth: 700 }}>
          <div className="label" style={{ marginBottom: 12 }}>Free Tool · Withdrawal</div>
          <h1 style={{ fontSize: 'clamp(24px,5vw,38px)', fontWeight: 700, color: 'var(--text)', marginBottom: 12, letterSpacing: '-0.02em' }}>
            Withdrawal Timeline
          </h1>
          <p style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.7, maxWidth: 580, marginBottom: 28 }}>
            What to expect when you stop — a day-by-day guide to withdrawal symptoms, duration, and recovery for each substance. Select a substance below.
          </p>

          {/* Substance selector */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {Object.entries(TIMELINES).map(([key, sub]) => (
              <button
                key={key}
                onClick={() => { setSelected(key); setOpenStage(0) }}
                style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px', borderRadius: 'var(--radius-md)', border: `2px solid ${selected === key ? 'var(--accent)' : 'var(--border)'}`, background: selected === key ? 'var(--accent-pale)' : 'var(--white)', color: selected === key ? 'var(--accent)' : 'var(--text-muted)', fontWeight: selected === key ? 700 : 500, fontSize: 14, cursor: 'pointer', transition: 'all 0.15s' }}
              >
                {sub.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline content */}
      <div className="container" style={{ maxWidth: 720, padding: '40px 20px' }}>

        {/* Intro */}
        <div style={{ marginBottom: 24, padding: 20, background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)', marginBottom: 10 }}>
            {substance.name} Withdrawal
          </h2>
          <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.75, margin: 0 }}>{substance.intro}</p>
        </div>

        {/* Warning */}
        {substance.warning && (
          <div style={{ marginBottom: 24, padding: '16px 20px', background: '#fef2f2', border: '2px solid #fca5a5', borderRadius: 'var(--radius-md)' }}>
            <p style={{ fontSize: 14, color: '#991b1b', fontWeight: 600, lineHeight: 1.6, margin: 0 }}>{substance.warning}</p>
          </div>
        )}

        {/* Stage timeline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {substance.stages.map((stage, i) => {
            const cfg = SEVERITY_CONFIG[stage.severity]
            const isOpen = openStage === i
            return (
              <div key={i} style={{ display: 'flex', gap: 0 }}>
                {/* Timeline line + dot */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: 16, flexShrink: 0 }}>
                  <div style={{ width: 14, height: 14, borderRadius: '50%', background: cfg.dot, border: `2px solid ${cfg.border}`, flexShrink: 0, marginTop: 20 }} />
                  {i < substance.stages.length - 1 && (
                    <div style={{ width: 2, flex: 1, background: 'var(--border)', minHeight: 24 }} />
                  )}
                </div>

                {/* Stage card */}
                <div style={{ flex: 1, marginBottom: 12 }}>
                  <button
                    onClick={() => setOpenStage(isOpen ? null : i)}
                    style={{ width: '100%', textAlign: 'left', padding: '14px 16px', background: isOpen ? cfg.bg : 'var(--white)', border: `1px solid ${isOpen ? cfg.border : 'var(--border)'}`, borderRadius: 'var(--radius-md)', cursor: 'pointer', transition: 'all 0.15s', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}
                  >
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 700, color: cfg.dot, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>
                        {cfg.label}
                      </div>
                      <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)' }}>{stage.timeLabel}</div>
                    </div>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ flexShrink: 0, transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', color: 'var(--text-light)' }}>
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>

                  {isOpen && (
                    <div style={{ padding: '16px', background: cfg.bg, border: `1px solid ${cfg.border}`, borderTop: 'none', borderRadius: '0 0 var(--radius-md) var(--radius-md)', marginBottom: 4 }}>
                      <div style={{ marginBottom: 14 }}>
                        <div style={{ fontSize: 12, fontWeight: 700, color: cfg.text, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Symptoms</div>
                        <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
                          {stage.symptoms.map((s, j) => (
                            <li key={j} style={{ display: 'flex', gap: 8, fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5 }}>
                              <span style={{ color: cfg.dot, fontWeight: 700, flexShrink: 0 }}>•</span> {s}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div style={{ padding: '12px 14px', background: 'rgba(255,255,255,0.7)', borderRadius: 8, fontSize: 13, color: cfg.text, lineHeight: 1.6 }}>
                        <strong>Advice:</strong> {stage.advice}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Aftercare */}
        <div style={{ marginTop: 16, padding: 20, background: 'var(--accent-pale)', border: '1px solid #c8e6df', borderRadius: 'var(--radius-md)' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent)', marginBottom: 8 }}>Aftercare & ongoing support</div>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.7, margin: 0 }}>{substance.aftercare}</p>
        </div>

        {/* CTAs */}
        <div style={{ marginTop: 24, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link href="/sobriety-counter" style={{ padding: '12px 20px', background: 'var(--accent)', color: '#fff', borderRadius: 'var(--radius-md)', textDecoration: 'none', fontWeight: 700, fontSize: 14 }}>
            Calculate my sobriety →
          </Link>
          <a href="tel:03001236600" style={{ padding: '12px 20px', background: 'var(--white)', border: '1px solid var(--accent)', color: 'var(--accent)', borderRadius: 'var(--radius-md)', textDecoration: 'none', fontWeight: 700, fontSize: 14 }}>
            Call Frank: 0300 123 6600
          </a>
          <Link href={`/${selected === 'alcohol' ? 'alcohol-addiction' : selected === 'heroin' ? 'heroin-addiction' : `${selected}-addiction`}/london`} style={{ padding: '12px 20px', background: 'var(--white)', border: '1px solid var(--border)', color: 'var(--text-muted)', borderRadius: 'var(--radius-md)', textDecoration: 'none', fontWeight: 600, fontSize: 14 }}>
            Find {substance.name} treatment →
          </Link>
        </div>
      </div>

      <footer style={{ borderTop: '1px solid var(--border)', padding: '28px 20px', background: 'var(--white)', marginTop: 48 }}>
        <div className="container-wide" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ fontSize: 12, color: 'var(--text-light)' }}>© {new Date().getFullYear()} SoberNation · Medical content reviewed against NHS and NICE guidelines</div>
          <div style={{ display: 'flex', gap: 20 }}>
            {[['Sobriety calculator', '/sobriety-counter'], ['Cost calculator', '/addiction-cost-calculator'], ['Find help', '/help/london']].map(([label, href]) => (
              <Link key={href} href={href} style={{ fontSize: 12, color: 'var(--text-light)', textDecoration: 'none' }}>{label}</Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}

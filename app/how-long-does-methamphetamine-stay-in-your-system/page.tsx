import type { Metadata } from 'next'
import DrugDetectionPage from '../../components/DrugDetectionPage'
export const metadata: Metadata = {
  title: 'How Long Does Methamphetamine Stay in Your System? | Detection Times UK',
  description: 'Methamphetamine (crystal meth) stays in urine for 3–5 days. Blood: up to 3 days. Hair: 90 days. UK detection time guide.',
}
export default function Page() {
  return <DrugDetectionPage config={{
    drug: 'Methamphetamine', drugAdj: 'methamphetamine', slug: 'methamphetamine',
    headline: 'How Long Does Methamphetamine Stay in Your System?',
    snippet: 'Methamphetamine (crystal meth, Tina) is detectable in urine for 3–5 days after use — longer than regular amphetamine due to its slower clearance rate. In blood, it can be detected for up to 3 days. Hair follicle tests detect methamphetamine use for up to 90 days. Methamphetamine has a half-life of approximately 10–12 hours.',
    warning: 'Methamphetamine psychosis can cause dangerous and erratic behaviour. If someone is experiencing meth psychosis, call 999.',
    relatedSlug: 'methamphetamine-addiction',
    rows: [
      { method: 'Urine', icon: '💧', window: '3–5 days (heavy users: up to 7 days)', note: 'Tested as amphetamines on standard panels; specialised tests identify meth specifically' },
      { method: 'Blood', icon: '🩸', window: '24–72 hours', note: 'Longer than regular amphetamine due to slower metabolism' },
      { method: 'Saliva', icon: '🦷', window: '1–4 days', note: 'UK roadside testing' },
      { method: 'Hair', icon: '💇', window: 'Up to 90 days', note: 'Differentiates methamphetamine from other amphetamines' },
    ],
    faqs: [
      { question: 'How long does crystal meth stay in your urine?', answer: 'Methamphetamine is typically detectable in urine for 3–5 days after use. For heavy or chronic users (common in crystal meth addiction), this can extend to 7 days. Methamphetamine stays in the system slightly longer than regular amphetamines due to its slower rate of excretion.' },
      { question: 'Is methamphetamine use increasing in the UK?', answer: 'Yes. While methamphetamine use has historically been lower in the UK than in the US or Australia, use has been rising — particularly in urban areas, within chemsex culture, and among men who have sex with men (MSM). NHS drug services across the UK now regularly treat crystal meth addiction.' },
      { question: 'What are the long-term effects of methamphetamine?', answer: 'Long-term methamphetamine use causes severe dental decay ("meth mouth"), rapid skin ageing, significant weight loss, memory impairment, paranoia, and long-term dopamine system damage that can take years to recover from. Psychosis (hallucinations, paranoid delusions) is a major risk and can persist long after stopping.' },
      { question: 'What help is available for methamphetamine addiction in the UK?', answer: 'NHS drug treatment services across the UK treat methamphetamine addiction using CBT (cognitive behavioural therapy), contingency management, and community support. Call Frank on 0300 123 6600 (free, 24/7) to find your nearest service. NA meetings are also effective for peer support in meth recovery.' },
    ],
  }} />
}

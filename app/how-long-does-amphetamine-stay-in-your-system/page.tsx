import type { Metadata } from 'next'
import DrugDetectionPage from '../../components/DrugDetectionPage'
export const metadata: Metadata = {
  title: 'How Long Does Amphetamine Stay in Your System? | Detection Times UK',
  description: 'Amphetamines (speed, Adderall) stay in urine for 2–4 days. Blood: up to 46 hours. Hair: 90 days. UK drug testing detection guide.',
}
export default function Page() {
  return <DrugDetectionPage config={{
    drug: 'Amphetamines', drugAdj: 'amphetamine', slug: 'amphetamine',
    headline: 'How Long Does Amphetamine Stay in Your System?',
    snippet: 'Amphetamines (speed, Adderall, dexamphetamine) are detectable in urine for 2–4 days after use. In blood, they can be detected for up to 46 hours. Hair follicle tests detect amphetamine use for up to 90 days. Amphetamines are among the most commonly detected drugs in UK workplace testing.',
    warning: 'Prescription amphetamines (Adderall, Vyvanse) are not licensed in the UK — importing them is illegal without a licence.',
    relatedSlug: 'drug-treatment',
    rows: [
      { method: 'Urine', icon: '💧', window: '2–4 days (heavy users: up to 7 days)', note: 'Most common test; included in all standard drug panels' },
      { method: 'Blood', icon: '🩸', window: 'Up to 46 hours', note: 'Post-accident and medical emergency testing' },
      { method: 'Saliva', icon: '🦷', window: '24–48 hours', note: 'UK roadside testing for driving impairment' },
      { method: 'Hair', icon: '💇', window: 'Up to 90 days', note: 'Employment and probation screening' },
    ],
    faqs: [
      { question: 'How long do amphetamines stay in urine?', answer: 'Amphetamines are typically detectable in urine for 2–4 days after a single use. For heavy or chronic users, detection windows can extend to 7 days or more. The detection window is longer for methamphetamine than for regular amphetamine.' },
      { question: 'Will ADHD medication show as amphetamines on a drug test?', answer: 'In the UK, most ADHD medications are methylphenidate-based (Ritalin, Concerta) and will not trigger an amphetamine positive. However, dexamphetamine (Dexedrine), prescribed for ADHD in some cases, is an amphetamine and will test positive. Always disclose legitimate prescriptions to the testing authority before submitting a sample.' },
      { question: 'What is the difference between amphetamines and methamphetamine?', answer: 'Methamphetamine is a more potent form of amphetamine with a longer duration of action. Both are stimulants. Methamphetamine (crystal meth, Tina) produces a more intense effect and carries greater addiction risk and health consequences. Standard drug tests will detect both as "amphetamines" — specialised tests can distinguish them.' },
      { question: 'Is amphetamine use increasing in the UK?', answer: 'Yes. UK amphetamine use (speed and crystal meth) has increased in recent years, particularly in chemsex contexts and in areas with high unemployment. NHS drug treatment services across the UK treat amphetamine dependency — treatment is free and confidential.' },
    ],
  }} />
}

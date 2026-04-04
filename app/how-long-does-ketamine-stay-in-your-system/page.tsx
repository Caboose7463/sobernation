import type { Metadata } from 'next'
import DrugDetectionPage from '../../components/DrugDetectionPage'
export const metadata: Metadata = {
  title: 'How Long Does Ketamine Stay in Your System? | Detection Times UK',
  description: 'Ketamine stays in urine for 2–4 days. Blood: up to 24 hours. Hair: 90 days. UK guide to ketamine detection times for drug testing.',
}
export default function Page() {
  return <DrugDetectionPage config={{
    drug: 'Ketamine', drugAdj: 'ketamine', slug: 'ketamine',
    headline: 'How Long Does Ketamine Stay in Your System?',
    snippet: 'Ketamine is typically detectable in urine for 2–4 days after a single use. In blood, ketamine clears within 24 hours, though its metabolite norketamine is detectable for slightly longer. Hair follicle tests can detect ketamine use for up to 90 days. Ketamine is increasingly included in standard UK drug testing panels.',
    warning: 'Driving under the influence of ketamine is a criminal offence. The UK legal limit for ketamine is 20 micrograms per litre of blood.',
    relatedSlug: 'ketamine-addiction',
    rows: [
      { method: 'Urine', icon: '💧', window: '2–4 days (heavy users: up to 14 days)', note: 'Norketamine metabolite detected; used in workplace and police tests' },
      { method: 'Blood', icon: '🩸', window: 'Up to 24 hours', note: 'Rapid clearance; ketamine has a short half-life' },
      { method: 'Saliva', icon: '🦷', window: '24–48 hours', note: 'Roadside UK DrugWipe testing' },
      { method: 'Hair', icon: '💇', window: 'Up to 90 days', note: 'Used for employment and legal drug history screening' },
    ],
    faqs: [
      { question: 'How long does ketamine stay in urine?', answer: 'Ketamine and its metabolite norketamine are typically detectable in urine for 2–4 days after a single use. For heavy users, detection may extend to 7–14 days. Ketamine is now routinely included in extended drug testing panels used by UK police and many employers.' },
      { question: 'Does ketamine cause bladder damage?', answer: 'Yes. Heavy ketamine use causes ketamine-induced bladder damage (ketamine cystitis) — characterised by severe bladder pain, urinary urgency, and in serious cases, bladder shrinkage requiring surgical intervention. This is one of the most distinctive and dangerous consequences of long-term ketamine use. Stopping ketamine use can halt further deterioration.' },
      { question: 'Can ketamine be detected in a roadside test?', answer: 'Yes. The Dräger DrugTest 5000 used by UK police tests for ketamine in saliva alongside cocaine, cannabis, opiates, and other drugs. A positive result triggers a blood test for laboratory confirmation.' },
      { question: 'Is ketamine a controlled drug in the UK?', answer: 'Yes. Ketamine is a Class B controlled drug in the UK. Possession carries up to 5 years in prison and an unlimited fine. Supply carries up to 14 years. Ketamine\'s legal status was upgraded from Class C to Class B in 2014 due to concerns about its abuse potential and health harms.' },
    ],
  }} />
}

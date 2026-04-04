import type { Metadata } from 'next'
import DrugDetectionPage from '../../components/DrugDetectionPage'
export const metadata: Metadata = {
  title: 'How Long Does MDMA (Ecstasy) Stay in Your System? | Detection Times UK',
  description: 'MDMA (ecstasy) stays in urine for 2–4 days. Blood: 24 hours. Hair: 90 days. UK guide to ecstasy detection windows and drug testing.',
}
export default function Page() {
  return <DrugDetectionPage config={{
    drug: 'MDMA (Ecstasy)', drugAdj: 'MDMA', slug: 'mdma',
    headline: 'How Long Does MDMA (Ecstasy) Stay in Your System?',
    snippet: 'MDMA (ecstasy, molly) is detectable in urine for 2–4 days after use. In blood, it clears within 24 hours. Hair follicle tests can identify MDMA use for up to 90 days. Saliva tests detect MDMA for approximately 1–2 days. MDMA detection windows are shorter than cannabis but longer than cocaine.',
    relatedSlug: 'drug-treatment',
    rows: [
      { method: 'Urine', icon: '💧', window: '2–4 days', note: 'Standard workplace and police testing method' },
      { method: 'Blood', icon: '🩸', window: '12–24 hours', note: 'Detects very recent use; used post-accident' },
      { method: 'Saliva', icon: '🦷', window: '1–2 days', note: 'UK roadside DrugWipe testing' },
      { method: 'Hair', icon: '💇', window: 'Up to 90 days', note: 'Used in legal proceedings and employment screening' },
    ],
    faqs: [
      { question: 'How long does ecstasy stay in your urine?', answer: 'MDMA (ecstasy) and its metabolites are typically detectable in urine for 2–4 days after use. This window may extend to 5–7 days for heavy or frequent users.' },
      { question: 'Can MDMA be detected in a standard drug test?', answer: 'Yes. Standard UK workplace and police drug panels include amphetamine-type substances (ATS) which detect MDMA. Some older tests may show a false positive for amphetamines rather than MDMA specifically — GCMS confirmation testing differentiates them.' },
      { question: 'Is ecstasy dangerous?', answer: 'Yes. MDMA carries significant risks including overheating (hyperthermia), hyponatraemia (dangerous drop in blood sodium from drinking too much water), serotonin syndrome, heart problems, and psychological harms including anxiety and depression in the days after use.' },
      { question: 'How long does the MDMA comedown last?', answer: 'The MDMA "comedown" — characterised by low mood, fatigue, anxiety, and depression — typically lasts 2–5 days after use. This occurs because MDMA depletes serotonin reserves. Frequent MDMA use causes increasingly severe and prolonged comedowns.' },
    ],
  }} />
}

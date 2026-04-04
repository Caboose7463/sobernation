import type { Metadata } from 'next'
import DrugDetectionPage from '../../components/DrugDetectionPage'
export const metadata: Metadata = {
  title: 'How Long Does Pregabalin Stay in Your System? | Detection Times UK',
  description: 'Pregabalin (Lyrica) stays in urine for 5–6 days. Blood: 24 hours. Hair: 90 days. Complete UK guide to pregabalin detection windows for drug testing.',
}
export default function Page() {
  return <DrugDetectionPage config={{
    drug: 'Pregabalin (Lyrica)', drugAdj: 'pregabalin', slug: 'pregabalin',
    headline: 'How Long Does Pregabalin Stay in Your System?',
    snippet: 'Pregabalin (Lyrica) is detectable in urine for approximately 5–6 days after the last dose. In blood, pregabalin clears within 24–48 hours. Hair follicle tests can detect pregabalin for up to 90 days. Pregabalin is a Schedule 3 controlled drug in the UK and is included in extended drug testing panels used by probation, employers, and drug services.',
    relatedSlug: 'pregabalin-addiction',
    rows: [
      { method: 'Urine', icon: '💧', window: '5–6 days (regular users may test positive up to 10 days)', note: 'Increasingly included in extended probation and employment panels' },
      { method: 'Blood', icon: '🩸', window: '24–48 hours', note: 'Short half-life of ~6 hours; clears quickly' },
      { method: 'Saliva', icon: '🦷', window: '24–36 hours', note: 'Less commonly tested for pregabalin specifically' },
      { method: 'Hair', icon: '💇', window: 'Up to 90 days', note: 'Used in legal proceedings and probation monitoring' },
    ],
    faqs: [
      { question: 'How long does pregabalin stay in urine?', answer: 'Pregabalin is typically detectable in urine for 5–6 days after therapeutic doses. For heavy users or people taking high doses, detection may extend to 10 days. Pregabalin is not included in all standard drug panels — it requires an extended gabapentinoid test. Drug services and probation commonly test for it.' },
      { question: 'Does pregabalin show up on a standard drug test?', answer: 'Not usually. Pregabalin is not included in standard 5- or 12-panel urine drug tests. However, extended panels used by probation services, NHS drug services, and some employers specifically test for pregabalin and gabapentin since they became Class C controlled drugs in 2019.' },
      { question: 'Can I drive while taking pregabalin?', answer: 'It depends. Pregabalin can cause drowsiness, dizziness, and impaired coordination — particularly when starting treatment or increasing doses. UK law makes it illegal to drive while impaired by any drug, including prescribed medication. Your GP will advise you whether it is safe to drive on your prescription. Some driving licence holders must declare pregabalin use to the DVLA.' },
      { question: 'Is pregabalin dangerous to take with other drugs?', answer: 'Yes, extremely so when combined with opioids (heroin, methadone, tramadol) or alcohol. The combination of pregabalin with opioids significantly increases the risk of respiratory depression and fatal overdose. This combination is responsible for a significant proportion of drug-related deaths in Northern Ireland and Scotland where pregabalin misuse is particularly prevalent.' },
    ],
  }} />
}

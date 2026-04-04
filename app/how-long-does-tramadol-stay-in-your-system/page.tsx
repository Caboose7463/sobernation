import type { Metadata } from 'next'
import DrugDetectionPage from '../../components/DrugDetectionPage'
export const metadata: Metadata = {
  title: 'How Long Does Tramadol Stay in Your System? | Detection Times UK',
  description: 'Tramadol is detectable in urine for 1–4 days. Blood: up to 24 hours. Hair: 90 days. Full UK guide to tramadol detection windows and testing.',
}
export default function Page() {
  return <DrugDetectionPage config={{
    drug: 'Tramadol', drugAdj: 'tramadol', slug: 'tramadol',
    headline: 'How Long Does Tramadol Stay in Your System?',
    snippet: 'Tramadol is typically detectable in urine for 1–4 days after use. In blood, it clears within 12–24 hours. Hair follicle tests can detect tramadol for up to 90 days. Tramadol is a Class C controlled drug in the UK and its metabolites are detected by opioid drug screening panels.',
    relatedSlug: 'tramadol-addiction',
    rows: [
      { method: 'Urine', icon: '💧', window: '1–4 days (heavy users: up to 7 days)', note: 'Requires an extended opioid panel — not always in standard tests' },
      { method: 'Blood', icon: '🩸', window: '12–24 hours', note: 'Used for post-accident and medical testing' },
      { method: 'Saliva', icon: '🦷', window: '24–48 hours', note: 'Less commonly tested but detectable' },
      { method: 'Hair', icon: '💇', window: 'Up to 90 days', note: 'Documents long-term use pattern' },
    ],
    faqs: [
      { question: 'How long does tramadol stay in urine?', answer: 'Tramadol is typically detectable in urine for 1–4 days after a therapeutic dose. For heavy or chronic users, detection can extend up to 7 days. Note that tramadol requires a specific opioid panel — it may not appear on standard opiate screens that only look for morphine/codeine metabolites.' },
      { question: 'Will tramadol show up on a standard drug test?', answer: 'Not always. Standard opiate urine drug tests primarily detect morphine and codeine metabolites. Tramadol requires a specific extended panel test. However, many employers and drug services in the UK now use extended panels that include tramadol. Always inform the tester of any legitimately prescribed medications.' },
      { question: 'Is tramadol a controlled drug in the UK?', answer: 'Yes. Tramadol became a Class C controlled drug in the UK in 2014. Possession without a prescription is a criminal offence. It is also a Schedule 3 controlled drug, requiring special prescription requirements for dispensing.' },
      { question: 'Can tramadol cause a false positive for another drug?', answer: 'Yes. Tramadol can occasionally cause a false positive for phencyclidine (PCP) on some immunoassay urine screens. GC-MS confirmation testing will correctly identify the substance. If you have a legitimate tramadol prescription, inform the testing authority before providing a sample.' },
    ],
  }} />
}

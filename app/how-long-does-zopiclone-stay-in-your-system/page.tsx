import type { Metadata } from 'next'
import DrugDetectionPage from '../../components/DrugDetectionPage'
export const metadata: Metadata = {
  title: 'How Long Does Zopiclone Stay in Your System? | Detection Times UK',
  description: 'Zopiclone stays in urine for 24–48 hours. Blood: 12 hours. Hair: 90 days. UK guide to zopiclone detection windows. Important info for drug testing.',
}
export default function Page() {
  return <DrugDetectionPage config={{
    drug: 'Zopiclone', drugAdj: 'zopiclone', slug: 'zopiclone',
    headline: 'How Long Does Zopiclone Stay in Your System?',
    snippet: 'Zopiclone is typically detectable in urine for 24–48 hours after a single dose. Because zopiclone has a short half-life of approximately 3.5–6.5 hours, it clears from blood within 12–24 hours. Hair follicle tests can detect zopiclone for up to 90 days. Zopiclone is a Schedule 4 controlled substance in the UK and is included in extended drug testing panels.',
    relatedSlug: 'zopiclone-addiction',
    rows: [
      { method: 'Urine', icon: '💧', window: '24–48 hours (regular users: up to 5 days)', note: 'Not included in standard panels — requires specific extended hypnotic test' },
      { method: 'Blood', icon: '🩸', window: '12–24 hours', note: 'Short half-life; blood tests only detect very recent use' },
      { method: 'Saliva', icon: '🦷', window: '12–24 hours', note: 'Less commonly tested' },
      { method: 'Hair', icon: '💇', window: 'Up to 90 days', note: 'Used in legal and probation monitoring' },
    ],
    faqs: [
      { question: 'How long does zopiclone stay in urine?', answer: 'Zopiclone is typically detectable in urine for 24–48 hours after a single dose. For people taking zopiclone regularly, detection may extend to 3–5 days. Zopiclone is not included in standard 5- or 12-panel drug tests — it requires a specific hypnotics or benzodiazepine-type panel to be detected.' },
      { question: 'Does zopiclone show up on a benzodiazepine test?', answer: 'Sometimes. Zopiclone is not a benzodiazepine, but it acts on similar GABA receptors. Some immunoassay benzodiazepine tests may produce a cross-reactive false positive for zopiclone. GC-MS confirmatory testing will correctly identify the substance. If you have a legitimate zopiclone prescription, disclose it before any drug test.' },
      { question: 'Can I drive while taking zopiclone?', answer: 'No — not safely, and potentially illegally. Zopiclone causes residual sedation, impaired reflexes, and drowsiness that can last into the following morning after a night-time dose. UK law prohibits driving while impaired by any drug including prescribed medication. The DVLA recommends not driving for at least 12 hours after taking zopiclone, but individual reactions vary.' },
      { question: 'Is zopiclone the same as a benzodiazepine?', answer: 'No. Zopiclone is a "Z-drug" — a non-benzodiazepine hypnotic that acts on similar brain receptors but has a different chemical structure. Its effects, addiction potential, and withdrawal risks are similar to benzodiazepines. Like benzos, zopiclone should not be stopped suddenly after long-term use as withdrawal can cause seizures.' },
    ],
  }} />
}

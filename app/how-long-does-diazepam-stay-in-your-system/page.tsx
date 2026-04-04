import type { Metadata } from 'next'
import DrugDetectionPage from '../../components/DrugDetectionPage'
export const metadata: Metadata = {
  title: 'How Long Does Diazepam Stay in Your System? | Detection Times UK',
  description: 'Diazepam (Valium) has a very long half-life and can be detected in urine for up to 6 weeks in heavy users. Blood: 48 hours. Full UK guide.',
}
export default function Page() {
  return <DrugDetectionPage config={{
    drug: 'Diazepam', drugAdj: 'diazepam', slug: 'diazepam',
    headline: 'How Long Does Diazepam Stay in Your System?',
    snippet: 'Diazepam (Valium) stays in the system far longer than most drugs due to its very long half-life of 20–100 hours. Diazepam and its active metabolite desmethyldiazepam are detectable in urine for up to 6 weeks after heavy long-term use. After a single dose, urine detection is typically 5–7 days. Blood testing detects diazepam for up to 48 hours.',
    relatedSlug: 'diazepam-addiction',
    rows: [
      { method: 'Urine', icon: '💧', window: 'Single dose: 5–7 days; Heavy use: up to 6 weeks', note: 'Long half-life means it accumulates in the body' },
      { method: 'Blood', icon: '🩸', window: '24–48 hours (parent drug); up to 6 days (metabolites)', note: 'Desmethyldiazepam metabolite is long-lasting' },
      { method: 'Saliva', icon: '🦷', window: '7–9 days', note: 'Diazepam is detectable in saliva longer than many drugs' },
      { method: 'Hair', icon: '💇', window: 'Up to 90 days', note: 'Documents historical use pattern' },
    ],
    faqs: [
      { question: 'Why does diazepam stay in your system so long?', answer: 'Diazepam has an exceptionally long half-life of 20–100 hours. It is also metabolised into active metabolites — particularly desmethyldiazepam — which themselves have half-lives of 36–200 hours. This means diazepam and its breakdown products accumulate with repeated use and take weeks to fully clear.' },
      { question: 'Will diazepam show on a standard drug test?', answer: 'Yes. Benzodiazepines including diazepam are included in all standard UK drug testing panels. If you have a legitimate prescription, you must disclose this before testing — a positive benzodiazepine result with a valid prescription is generally acceptable in workplace testing.' },
      { question: 'Does prescribed diazepam affect drug testing?', answer: 'Yes. Prescribed diazepam will produce a positive benzodiazepine result on any drug test. Always inform the testing authority of your prescription. In most workplace drug testing contexts, a valid prescription explains a positive result — although some safety-critical roles may have stricter rules.' },
      { question: 'Is diazepam safe to drive on?', answer: 'No — not always. Diazepam impairs cognitive function, reaction time, and coordination. It is illegal to drive in the UK while impaired by diazepam. Even at prescribed doses, diazepam can impair driving ability. Patients are advised by their doctor not to drive until they know how diazepam affects them.' },
    ],
  }} />
}

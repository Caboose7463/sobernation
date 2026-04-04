import type { Metadata } from 'next'
import DrugDetectionPage from '../../components/DrugDetectionPage'
export const metadata: Metadata = {
  title: 'How Long Does Codeine Stay in Your System? | Detection Times UK',
  description: 'Codeine stays in urine for 24–48 hours. Blood: 4–8 hours. Hair: 90 days. UK guide to codeine detection times and drug testing.',
}
export default function Page() {
  return <DrugDetectionPage config={{
    drug: 'Codeine', drugAdj: 'codeine', slug: 'codeine',
    headline: 'How Long Does Codeine Stay in Your System?',
    snippet: 'Codeine is typically detectable in urine for 24–48 hours after a single dose (up to 4 days for heavy users). In blood, codeine clears within 4–8 hours, though its active metabolite morphine is detectable for up to 12 hours. Hair follicle tests detect codeine for up to 90 days. Codeine metabolises to morphine and will trigger a positive opiate result on standard drug tests.',
    relatedSlug: 'codeine-addiction',
    rows: [
      { method: 'Urine', icon: '💧', window: '24–48 hours (heavy users: up to 4 days)', note: 'Tests as morphine on opiate panels — codeine converts to morphine' },
      { method: 'Blood', icon: '🩸', window: '4–8 hours (morphine metabolite: up to 12 hours)', note: 'Rapidly metabolised; blood tests detect very recent use' },
      { method: 'Saliva', icon: '🦷', window: '1–4 days', note: 'Included in extended oral fluid panels' },
      { method: 'Hair', icon: '💇', window: 'Up to 90 days', note: 'Standard hair drug testing panel includes opiates' },
    ],
    faqs: [
      { question: 'How long does codeine stay in urine?', answer: 'Codeine is typically detectable in urine for 24–48 hours after a single dose. For people taking codeine regularly (even OTC doses of co-codamol), detection may extend to 3–4 days. Because codeine metabolises to morphine, it will register as a positive opiate result — not specifically as codeine — on standard drug panels.' },
      { question: 'Will co-codamol show up on a drug test?', answer: 'Yes. Co-codamol contains codeine, which metabolises to morphine. A drug test will show a positive opiate result. If you have a legitimate co-codamol prescription or bought it legally OTC, you should disclose this to the testing authority before providing a sample. Unexplained opiate positives may be investigated further by GC-MS laboratory testing.' },
      { question: 'Does codeine stay in your system longer than other opioids?', answer: 'Codeine has a relatively short detection window compared to some other opioids. Heroin (as morphine) has a similar window; longer-acting opioids like methadone can be detected for much longer. However, codeine\'s conversion to morphine means it can be detected even after codeine itself has cleared the blood.' },
      { question: 'Can I fail a drug test from Nurofen Plus?', answer: 'Yes. Nurofen Plus contains 12.8mg of codeine per tablet. Taking the OTC dose will produce a positive opiate result on a drug test. This is a legitimate medical use — always disclose OTC codeine-containing medication to the testing authority before submitting a sample. GC-MS testing can differentiate codeine/morphine from heroin metabolites.' },
    ],
  }} />
}

import type { Metadata } from 'next'
import DrugDetectionPage from '../../components/DrugDetectionPage'

export const metadata: Metadata = {
  title: 'How Long Does Cannabis Stay in Your System? | Detection Times UK',
  description: 'Cannabis (THC) stays in urine for 3–30 days — up to 30 days for heavy users. Blood: 1–7 days. Hair: 90 days. Complete UK guide to cannabis drug testing detection windows.',
}

export default function Page() {
  return <DrugDetectionPage config={{
    drug: 'Cannabis',
    drugAdj: 'cannabis',
    slug: 'cannabis',
    headline: 'How Long Does Cannabis Stay in Your System?',
    snippet: 'Cannabis (THC) is detectable in urine for 3–5 days after a single use, 10–15 days for regular users, and up to 30 days for heavy daily users. In blood, cannabis clears within 1–7 days. Hair follicle tests detect cannabis use for up to 90 days. Cannabis remains the most detected drug in UK workplace and police testing.',
    warning: 'Driving with cannabis in your system is a criminal offence. The UK legal limit is 2 micrograms of THC per litre of blood.',
    relatedSlug: 'cannabis-addiction',
    rows: [
      { method: 'Urine', icon: '💧', window: '3–30 days (occasional: 3–5 days; heavy: up to 30+ days)', note: 'Most common workplace test; THC is fat-soluble so stays longer' },
      { method: 'Blood', icon: '🩸', window: '1–7 days', note: 'Used for roadside DUI confirmation; detects recent use' },
      { method: 'Saliva', icon: '🦷', window: '24–72 hours', note: 'UK roadside DrugWipe test' },
      { method: 'Hair', icon: '💇', window: 'Up to 90 days', note: 'Cannot detect use within last 5–7 days' },
    ],
    faqs: [
      { question: 'How long does cannabis stay in your urine?', answer: 'Cannabis metabolites (THC-COOH) stay in urine for 3–5 days after a single use, 10–15 days for moderate users (a few times a week), and up to 30 days or longer for heavy daily users. Because THC is fat-soluble, it accumulates in body fat and releases slowly — making it the longest-detected recreational drug in urine.' },
      { question: 'Can you fail a drug test from passive cannabis smoke?', answer: 'This is extremely unlikely in real-world conditions. The THC levels absorbed from secondhand cannabis smoke are generally far too low to trigger a positive urine drug test. UK workplace and police drug tests use cutoff thresholds that effectively rule out passive exposure.' },
      { question: 'Does cannabis stay in your system longer if you eat edibles?', answer: 'Yes. Cannabis edibles produce a more prolonged and higher concentration of THC metabolites because the drug is absorbed through the digestive system and processed by the liver. Detection windows may be 50–100% longer compared to smoking the same amount of cannabis.' },
      { question: 'How long does cannabis stay in your system for a hair test?', answer: 'Hair follicle testing can detect cannabis use for up to 90 days. A 3.9 cm (1.5 inch) hair sample corresponds to approximately 90 days of growth. Note that hair tests cannot detect use from the last 5–7 days (the time for drug-containing hair to grow above the scalp).' },
      { question: 'How can I pass a cannabis drug test?', answer: 'The only reliable method is time — allowing your body to naturally metabolise and excrete THC. Staying well hydrated, light exercise, and good nutrition may support your metabolism. "Detox drinks" and flush products are not proven to work and may be detected by the testing laboratory. There are no guaranteed methods.' },
      { question: 'Is cannabis detectable longer in heavy users?', answer: 'Yes. Because THC is stored in body fat, heavy daily cannabis users can have THC metabolites detectable in urine for 30 days or more — sometimes even 45–60 days in extreme cases. Occasional users (once a week or less) typically clear it within 3–7 days.' },
    ],
  }} />
}

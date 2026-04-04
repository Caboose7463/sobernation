import type { Metadata } from 'next'
import DrugDetectionPage from '../../components/DrugDetectionPage'

export const metadata: Metadata = {
  title: 'How Long Does Heroin Stay in Your System? | Detection Times UK',
  description: 'Heroin clears from urine in 2–3 days but metabolites (morphine) may linger up to 7 days. Blood: 6 hours. Find full UK detection windows for heroin drug testing here.',
}

export default function Page() {
  return <DrugDetectionPage config={{
    drug: 'Heroin',
    drugAdj: 'heroin',
    slug: 'heroin',
    headline: 'How Long Does Heroin Stay in Your System?',
    snippet: 'Heroin itself clears from the blood very rapidly — within 6 hours. However, heroin metabolises into morphine, which is detectable in urine for 2–4 days after use (up to 7 days for heavy users). Hair follicle tests can detect heroin use for up to 90 days. Heroin is typically detectable by standard UK drug tests for 2–3 days after a single use.',
    warning: 'If you or someone you know has used heroin and is unresponsive — call 999 immediately. Administer Naloxone (Narcan) if available.',
    relatedSlug: 'heroin-addiction',
    rows: [
      { method: 'Urine', icon: '💧', window: '2–4 days (heavy users: up to 7 days)', note: 'Detects morphine metabolites, not heroin itself' },
      { method: 'Blood', icon: '🩸', window: '6 hours (morphine: up to 12 hours)', note: 'Heroin is converted to morphine almost immediately' },
      { method: 'Saliva', icon: '🦷', window: '24–36 hours', note: 'Used in roadside and workplace testing' },
      { method: 'Hair', icon: '💇', window: 'Up to 90 days', note: 'Detects 6-monoacetylmorphine (unique heroin marker)' },
    ],
    faqs: [
      { question: 'How long does heroin stay in your urine?', answer: 'Heroin converts almost instantly to morphine in the body. Morphine and its metabolites are detectable in urine for approximately 2–4 days after a single use. For heavy, long-term heroin users, detection can extend to 7 days or more. Standard workplace urine drug panels test for opiates, which includes heroin metabolites.' },
      { question: 'Does methadone show up on a heroin drug test?', answer: 'Methadone does not show up on standard opiate drug tests — it requires a specific methadone screening. If you are prescribed methadone by a drug service, inform the testing authority as you will have a legitimate prescription. Buprenorphine (Subutex) similarly requires a specific buprenorphine test.' },
      { question: 'How long does heroin stay in your hair?', answer: 'Hair follicle tests can detect heroin (via its unique metabolite 6-monoacetylmorphine) for up to 90 days. The advantage of hair testing is that it specifically identifies heroin use, as opposed to morphine or codeine, making it useful in legal proceedings.' },
      { question: 'Can poppy seeds cause a false positive for heroin?', answer: 'Yes — poppy seeds contain trace amounts of morphine and eating a large quantity could potentially trigger a positive result for opiates on a urine drug test. However, if a positive opiate test is confirmed by GC-MS laboratory testing, poppy seeds cannot explain the result, as GC-MS detects the specific metabolites.' },
      { question: 'Will a GP drug test detect heroin?', answer: 'Standard GP urine tests may include opiate screening. Heroin metabolites (primarily morphine) would trigger a positive. If you are seeking help for heroin addiction, be honest with your GP — this is essential for getting the correct treatment and there is legal protection for disclosing drug use to a healthcare provider.' },
    ],
  }} />
}

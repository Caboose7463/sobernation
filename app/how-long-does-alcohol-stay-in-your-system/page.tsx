import type { Metadata } from 'next'
import DrugDetectionPage from '../../components/DrugDetectionPage'

export const metadata: Metadata = {
  title: 'How Long Does Alcohol Stay in Your System? | Blood, Urine & Breath Tests',
  description: 'Alcohol leaves blood at roughly 1 unit per hour. Breath tests detect alcohol for 12–24 hours. Urine for 12–48 hours. Full UK guide to alcohol detection times and limits.',
}

export default function Page() {
  return <DrugDetectionPage config={{
    drug: 'Alcohol',
    drugAdj: 'alcohol',
    slug: 'alcohol',
    headline: 'How Long Does Alcohol Stay in Your System?',
    snippet: 'Alcohol is processed by the liver at a rate of approximately 1 unit per hour — you cannot speed this up. Alcohol is detectable in breath (breathalyser) for 12–24 hours, in blood for 6–24 hours, and in urine for 12–48 hours. An EtG urine test can detect alcohol consumption for up to 80 hours after drinking.',
    warning: 'UK drink-drive limit: 80mg alcohol per 100ml blood (England/Wales). Scotland: 50mg/100ml. Never guess — the safest choice is not to drive after drinking.',
    relatedSlug: 'alcohol-addiction',
    rows: [
      { method: 'Breath', icon: '💨', window: '12–24 hours after heavy drinking', note: 'UK roadside breathalyser; limit is 35mcg per 100ml breath' },
      { method: 'Blood', icon: '🩸', window: '6–24 hours', note: 'Most accurate; used for prosecution evidence' },
      { method: 'Urine', icon: '💧', window: '12–48 hours (standard); up to 80 hours (EtG test)', note: 'EtG tests used in probation and workplace testing' },
      { method: 'Saliva', icon: '🦷', window: '6–12 hours', note: 'Less common; used in some roadside checks' },
      { method: 'Hair', icon: '💇', window: 'Up to 90 days (EtG in hair)', note: 'Used to assess long-term drinking patterns, not single events' },
    ],
    faqs: [
      { question: 'How many units per hour does the body process?', answer: 'The liver processes approximately 1 unit of alcohol per hour. One unit is 10ml (8g) of pure alcohol — equivalent to a single 25ml measure of spirits, half a pint of 3.5% beer, or half a glass of wine. This rate does not significantly increase with food, water, coffee, or exercise.' },
      { question: 'How long after drinking can I drive?', answer: 'There is no safe formula. It depends entirely on how much you drank, when you drank, your body weight, and your metabolism. As a rough guide, allow at least 1 hour per unit — and then add several more hours of safety margin for morning-after driving. The safest approach is to not drive at all the day after a heavy session.' },
      { question: 'What is the UK drink-drive limit?', answer: 'In England and Wales: 80mg of alcohol per 100ml of blood, 35 micrograms per 100ml of breath, or 107mg per 100ml of urine. In Scotland: 50mg per 100ml of blood (lower than England). Northern Ireland follows England/Wales limits. Being caught over the limit brings a minimum 12-month ban.' },
      { question: 'What is an EtG alcohol test?', answer: 'EtG (Ethyl Glucuronide) is an alcohol metabolite that can be detected in urine for up to 80 hours after drinking — significantly longer than standard alcohol urine tests. EtG testing is used in probation, DUI monitoring, and some workplace programmes where zero alcohol tolerance is required.' },
      { question: 'Can you beat a breathalyser test?', answer: 'No. Nothing reliably reduces BAC faster than time — not mints, water, food, coffee, or vomiting. UK police use evidential breathalysers that cannot be fooled by mouthwash or breath mints. Any attempt to interfere with a breath test is a separate criminal offence.' },
    ],
  }} />
}

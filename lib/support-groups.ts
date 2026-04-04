import type { SupportGroupConfig } from '../components/SupportGroupPage'

export const ALAON_CONFIG: SupportGroupConfig = {
  slug: 'al-anon',
  name: 'Al-Anon',
  tagline: 'Support for families and friends of alcoholics',
  type: 'family',
  intro: 'Al-Anon Family Groups offer free, confidential support for anyone affected by a loved one\'s drinking in [location]. Al-Anon operates on the same 12-step principles as Alcoholics Anonymous but is specifically designed for families, partners, parents, and friends — not the person with the alcohol problem themselves. Meetings are free and no referral is needed.',
  whoFor: 'Families, partners, and friends of people with alcohol problems',
  whatHappens: 'Al-Anon meetings follow a 12-step format. Members share their experiences of living with or caring for someone with an alcohol problem — and the strategies they have found helpful. There is no therapy or advice-giving — meetings operate on the principle that members share their own experience, and attendees take what they find useful. Meetings are confidential, non-judgmental, and free. You do not need to bring the person who drinks.',
  cost: 'Free (donations welcome)',
  website: 'https://al-anonuk.org.uk',
  phone: '0800 0086 811',
  faqs: (location: string) => [
    { question: `Are there Al-Anon meetings in ${location}?`, answer: `Yes. Al-Anon UK runs meetings across ${location} and throughout the UK. You can find the current schedule at al-anonuk.org.uk or by calling the Al-Anon helpline on 0800 0086 811 (free). Meetings are held in person and online.` },
    { question: `What is Al-Anon and who is it for?`, answer: `Al-Anon Family Groups is a mutual aid organisation for anyone whose life has been affected by someone else's drinking — family members, partners, parents, children, friends, and colleagues. Al-Anon provides support, community, and practical tools for coping with the impact of someone else's alcohol use.` },
    { question: `Is Al-Anon free?`, answer: `Yes. Al-Anon meetings are free. A small collection is sometimes taken at the end of meetings to cover costs, but this is voluntary. There are no membership fees, referrals needed, or registration required.` },
    { question: `What is the difference between AA and Al-Anon?`, answer: `Alcoholics Anonymous (AA) is for people who have a problem with alcohol themselves. Al-Anon is for the families, friends, and loved ones of people who drink. Both use 12-step principles but address different people. Alateen (part of Al-Anon) is specifically for teenagers affected by a parent or loved one's drinking.` },
    { question: `Can Al-Anon help me get my loved one into treatment?`, answer: `Al-Anon does not intervene directly with the person who drinks. However, it equips you with the tools, support, and understanding to better manage the situation and look after your own wellbeing. Many people find that working with Al-Anon helps them set healthier boundaries, which can indirectly encourage their loved one to seek help.` },
    { question: `What other support is available for families in ${location}?`, answer: `Beyond Al-Anon, families in ${location} can access Frank's family helpline (0300 123 6600), Adfam (adfam.org.uk), local NHS drug and alcohol family support services, and private counselling.` },
  ],
  relatedLinks: [
    { label: 'AA meetings in [Location]', href: '/aa-meetings/[location]' },
    { label: 'Alcohol help in [Location]', href: '/alcohol-addiction/[location]' },
    { label: 'Rehab in [Location]', href: '/rehab/[location]' },
    { label: 'Help in [Location]', href: '/help/[location]' },
  ],
}

export const SMART_RECOVERY_CONFIG: SupportGroupConfig = {
  slug: 'smart-recovery',
  name: 'SMART Recovery',
  tagline: 'Science-based alternative to AA and NA',
  type: 'recovery',
  intro: 'SMART Recovery (Self-Management and Recovery Training) is a free, evidence-based mutual aid programme for people with any addiction in [location] — alcohol, drugs, gambling, or other behaviours. SMART uses cognitive behavioural principles rather than the 12-step spiritual approach of AA and NA. You do not need to identify as an addict or believe in a higher power to attend.',
  whoFor: 'Anyone with any addiction — alcohol, drugs, gambling, or other behaviours',
  whatHappens: 'SMART Recovery meetings use CBT-based tools including the ABCDE model, cost-benefit analysis, and coping strategies. A trained facilitator leads each meeting. Meetings involve discussion, skills-building exercises, and shared experience. There is no sponsor system, no steps, and no requirement for lifelong attendance. SMART also has a strong online community and app.',
  cost: 'Free',
  website: 'https://smartrecovery.org.uk',
  phone: '0330 053 6022',
  faqs: (location: string) => [
    { question: `Are there SMART Recovery meetings in ${location}?`, answer: `Yes. SMART Recovery UK runs face-to-face meetings across ${location} and a full programme of online meetings available daily. Visit smartrecovery.org.uk or call 0330 053 6022 to find meeting times and locations in ${location}.` },
    { question: `What is the difference between SMART Recovery and AA?`, answer: `AA is based on 12-step spiritual principles. SMART Recovery is based on CBT and evidence-based science. SMART does not require belief in a higher power, does not use labels like "alcoholic," and is open to any addiction. Both are effective — different people respond better to different approaches.` },
    { question: `Is SMART Recovery free?`, answer: `Yes. SMART Recovery meetings are completely free. There are no membership fees, subscriptions, or registration requirements. Donations to support the organisation are welcome but never mandatory.` },
    { question: `Can I attend SMART Recovery online?`, answer: `Yes. SMART Recovery UK offers a full schedule of online meetings alongside face-to-face meetings. Online meetings are accessible from anywhere and are particularly useful for people with limited mobility, anxiety, or those in rural areas.` },
    { question: `Is SMART Recovery effective?`, answer: `Yes. SMART Recovery is recognised by NHS England and Public Health England as an evidence-based approach. Multiple studies show it is comparable in effectiveness to 12-step approaches for alcohol addiction, and it shows particular benefits for drug addiction and non-substance behavioural addictions.` },
    { question: `Do I have to stop using to attend SMART?`, answer: `SMART Recovery is abstinence-supportive but not always abstinence-required. Some meetings accept people who are still using at the beginning of their journey. SMART's philosophy is one of meeting people where they are. Speak to your nearest meeting in ${location} for their specific approach.` },
  ],
  relatedLinks: [
    { label: 'AA meetings in [Location]', href: '/aa-meetings/[location]' },
    { label: 'NA meetings in [Location]', href: '/na-meetings/[location]' },
    { label: 'Drug treatment in [Location]', href: '/drug-treatment/[location]' },
    { label: 'Help in [Location]', href: '/help/[location]' },
  ],
}

export const COCAINE_ANONYMOUS_CONFIG: SupportGroupConfig = {
  slug: 'cocaine-anonymous',
  name: 'Cocaine Anonymous',
  tagline: '12-step support for cocaine and stimulant addiction',
  type: 'recovery',
  intro: 'Cocaine Anonymous (CA) is a free 12-step fellowship for people recovering from cocaine, crack cocaine, MDMA, or stimulant addiction. CA meetings are available in [location] and follow the same principles as Alcoholics Anonymous, adapted specifically for stimulant addiction. Meetings are free, confidential, and no referral is needed.',
  whoFor: 'People recovering from cocaine, crack, MDMA, or stimulant addiction',
  whatHappens: 'CA meetings follow the 12-step format — members share their experience, strength, and hope with each other. Meetings are chaired by a member and may include readings from CA literature, open sharing, and a short break. Many people find the CA-specific format more relatable than NA for stimulant addiction.',
  cost: 'Free (donations welcome)',
  website: 'https://cocaineanonymous.org.uk',
  phone: '0800 612 0225',
  faqs: (location: string) => [
    { question: `Are there Cocaine Anonymous meetings in ${location}?`, answer: `Cocaine Anonymous meetings are available in major UK cities including ${location}. Visit cocaineanonymous.org.uk or call 0800 612 0225 (free) to find meetings near ${location}. Online CA meetings are also available if in-person meetings are limited in your area.` },
    { question: `What is Cocaine Anonymous?`, answer: `Cocaine Anonymous (CA) is a 12-step mutual aid fellowship for people whose primary addiction is cocaine, crack cocaine, MDMA, methamphetamine, or other stimulants. It follows the same principles as Alcoholics Anonymous but with literature and experience specifically relevant to stimulant addiction.` },
    { question: `Can I attend CA if my drug was not cocaine?`, answer: `Yes. Despite the name, CA is open to anyone for whom stimulant addiction is a primary issue — including crack cocaine, MDMA, amphetamines, and methamphetamine. The CA programme also attracts people who used other drugs alongside cocaine.` },
    { question: `Is Cocaine Anonymous the same as Narcotics Anonymous?`, answer: `Both CA and NA are 12-step fellowships, but CA focuses specifically on stimulant addiction. Some people prefer CA because meetings and literature feel more directly relevant to their cocaine or stimulant addiction. NA is broader, covering all drug addiction. Both are free and effective.` },
    { question: `Is there NHS treatment for cocaine addiction in ${location}?`, answer: `Yes. NHS community drug services in ${location} offer free treatment for cocaine addiction including CBT and contingency management. CA meetings provide free peer support alongside NHS treatment. Call Frank on 0300 123 6600 to access NHS cocaine services.` },
    { question: `My partner is addicted to cocaine — where can I get help?`, answer: `Support is available for you too. Adfam (adfam.org.uk) provides support for drug-affected families. Frank's helpline (0300 123 6600) also provides guidance for families and friends in ${location}.` },
  ],
  relatedLinks: [
    { label: 'Cocaine addiction help in [Location]', href: '/cocaine-addiction/[location]' },
    { label: 'NA meetings in [Location]', href: '/na-meetings/[location]' },
    { label: 'Drug treatment in [Location]', href: '/drug-treatment/[location]' },
    { label: 'SMART Recovery in [Location]', href: '/smart-recovery/[location]' },
  ],
}

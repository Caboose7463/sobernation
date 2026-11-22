import type { SupportGroupConfig } from '../components/SupportGroupPage'

export const ALAON_CONFIG: SupportGroupConfig = {
  slug: 'al-anon',
  name: 'Al-Anon',
  tagline: 'Support for families and friends of alcoholics',
  type: 'family',
  intro: 'Al-Anon Family Groups UK and Eire is there for anyone whose life is or has been affected by someone else\'s drinking, including families, partners and friends in [location]. Al-Anon is a 12 step fellowship for the people around the drinker, not the drinker themselves. Meetings are free and confidential, and you do not need a referral.',
  whoFor: 'Families, partners, and friends of people with alcohol problems',
  whatHappens: 'Members share their own experience of being affected by someone else\'s drinking. Al-Anon says members do not advise or judge, and do not tell you how to change the drinker\'s behaviour: the meeting is for your benefit. First names only are used, and anything discussed, including your presence, is treated as confidential. You do not need to bring the person who drinks.',
  cost: 'Free (donations welcome)',
  website: 'https://al-anonuk.org.uk',
  phone: '0800 0086 811',
  fellowship: 'al-anon',
  faqs: (location: string) => [
    { question: `Are there Al-Anon meetings in ${location}?`, answer: `Use the meeting finder on the official Al-Anon UK website (al-anonuk.org.uk) to find groups near ${location}, or call the free Al-Anon helpline on 0800 0086 811, 10am to 10pm, 365 days a year. Helpline volunteers are Al-Anon members, not professionals.` },
    { question: `What is Al-Anon and who is it for?`, answer: `Al-Anon Family Groups is a mutual aid organisation for anyone whose life has been affected by someone else's drinking: family members, partners, parents, children, friends and colleagues. Al-Anon provides support, community, and practical tools for coping with the impact of someone else's alcohol use.` },
    { question: `Is Al-Anon free?`, answer: `Yes. Al-Anon meetings are free. A small collection is sometimes taken at the end of meetings to cover costs, but this is voluntary. There are no membership fees, referrals needed, or registration required.` },
    { question: `What is the difference between AA and Al-Anon?`, answer: `Alcoholics Anonymous (AA) is for people who want to stop drinking themselves. Al-Anon is for the families, friends and loved ones of people who drink. Alateen, part of Al-Anon, is for young people aged 12 to 17.` },
    { question: `Can Al-Anon help me get my loved one into treatment?`, answer: `Al-Anon does not intervene directly with the person who drinks. However, it equips you with the tools, support, and understanding to better manage the situation and look after your own wellbeing. Many people find that working with Al-Anon helps them set healthier boundaries, which can indirectly encourage their loved one to seek help.` },
    { question: `What other support is available for families in ${location}?`, answer: `Beyond Al-Anon, families in ${location} can call FRANK (0300 123 6600, 24 hours) or Drinkline (0300 123 1110) for confidential advice, and Adfam (adfam.org.uk) supports families affected by drugs and alcohol.` },
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
  tagline: '12 step support for people who want to stop using cocaine and other drugs',
  type: 'recovery',
  intro: 'Cocaine Anonymous (CA) is a free 12 step fellowship of people who share their experience, strength and hope so that they can recover from addiction. The only requirement for membership is a desire to stop using cocaine and all other mind altering substances. CA UK lists face to face and online meetings, including near [location], on its official meetings site.',
  whoFor: 'Anyone with a desire to stop using cocaine and all other mind altering substances',
  whatHappens: 'At a CA meeting members share their own experience of addiction and recovery. CA describes itself as a one day at a time programme: newcomers are encouraged to listen closely to other members\' stories and to take phone numbers so they can call someone between meetings. CA is spiritual but not religious, and there are no dues or fees.',
  cost: 'Free (no dues or fees)',
  website: 'https://cocaineanonymous.org.uk',
  phone: '0800 612 0225',
  fellowship: 'cocaine-anonymous',
  faqs: (location: string) => [
    { question: `Are there Cocaine Anonymous meetings in ${location}?`, answer: `Search the official CA UK meetings site at meetings.cocaineanonymous.org.uk for face to face meetings near ${location} and online meetings. You can also call the CA helpline free on 0800 612 0225, 10am to 10pm, 7 days a week. You can leave a message at any time and a member will call you back.` },
    { question: `What is Cocaine Anonymous?`, answer: `Cocaine Anonymous is a fellowship of people who share their experience, strength and hope with each other so that they may solve their common problem and help others to recover from their addiction. It is not allied with any sect, denomination, politics, organisation or institution.` },
    { question: `Can I go to CA if cocaine was not my main drug?`, answer: `CA's only requirement for membership is a desire to stop using cocaine and all other mind altering substances. CA UK's helpline invites anyone who thinks they have a problem with any mind altering substance to call.` },
    { question: `Is Cocaine Anonymous the same as Narcotics Anonymous?`, answer: `No, they are separate fellowships, though both are free 12 step programmes. CA focuses on cocaine and all other mind altering substances; NA is for anyone with a problem with drugs. Some people go to both.` },
    { question: `Is there NHS treatment for cocaine addiction in ${location}?`, answer: `Yes. Local drug and alcohol services offer free treatment, and you can refer yourself. The FRANK helpline (0300 123 6600, 24 hours) can help you find services near ${location}. CA meetings can be used alongside treatment.` },
    { question: `My partner uses cocaine. Where can I get help?`, answer: `Support is available for you too. Adfam (adfam.org.uk) supports families affected by drugs and alcohol, and FRANK (0300 123 6600) gives confidential advice to friends and family.` },
  ],
  relatedLinks: [
    { label: 'Cocaine addiction help in [Location]', href: '/cocaine-addiction/[location]' },
    { label: 'NA meetings in [Location]', href: '/na-meetings/[location]' },
    { label: 'Drug treatment in [Location]', href: '/drug-treatment/[location]' },
    { label: 'SMART Recovery in [Location]', href: '/smart-recovery/[location]' },
  ],
}

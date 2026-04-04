import type { RehabTypeConfig } from '../components/RehabTypePage'

export const PRIVATE_REHAB_CONFIG: RehabTypeConfig = {
  slug: 'private-rehab',
  name: 'Private Rehab',
  tagline: 'Private residential addiction treatment',
  intro: 'Private rehab in [location] offers immediate access to residential treatment for alcohol and drug addiction, typically without NHS waiting lists. Private rehab programmes in and around [location] usually last 28, 60, or 90 days and include medically supervised detox, individual and group therapy, CBT, and structured aftercare planning. Costs range from ÂÂ£3,000 to ÂÂ£15,000+ for 28 days depending on the facility.',
  keyFacts: [
    { label: 'Typical cost', value: 'ÂÂ£3,000â€"ÂÂ£15,000 for 28 days', icon: 'ðŸ'·' },
    { label: 'Wait time', value: 'Often same-week admission', icon: 'âš¡' },
    { label: 'What\'s included', value: 'Detox, therapy, meals, accommodation, aftercare', icon: 'ðŸ¥' },
    { label: 'NHS-funded places', value: 'Available in some cases â€" ask your GP', icon: 'ðŸ'™' },
  ],
  bodyParagraphs: [
    'Private rehab in [location] is the fastest route to residential treatment. Unlike NHS pathways which may have waiting lists, private facilities often admit within days or even the same week as your enquiry. This can be critical for people in acute crisis.',
    'Most private rehab programmes offered in and around [location] include medically supervised detox, individual and group therapy (CBT, motivational interviewing, 12-step), family therapy, nutritional support, aftercare planning, and continuing care support. Luxury facilities may include additional amenities.',
    'For those who cannot afford private rehab, NHS-funded residential places are sometimes available â€" speak to your GP or local drug and alcohol service. Some charities also offer funded or subsidised residential treatment places. The free Frank helpline (0300 123 6600) can advise on all options.',
  ],
  faqs: (location: string) => [
    { question: `How much does private rehab in ${location} cost?`, answer: `Private rehab near ${location} typically costs ÂÂ£3,000â€"ÂÂ£8,000 for a standard 28-day residential programme. Premium facilities can cost ÂÂ£10,000â€"ÂÂ£15,000 or more. Day treatment (attending rehab without staying overnight) is less expensive â€" typically ÂÂ£1,000â€"ÂÂ£3,000. Many private rehabs offer payment plans, and some accept NHS-funded referrals.` },
    { question: `What is included in private rehab in ${location}?`, answer: `A typical private rehab programme near ${location} includes medically supervised detox, 24/7 nursing care during withdrawal, individual therapy (CBT, EMDR, psychotherapy), group therapy, 12-step or SMART Recovery sessions, family therapy, nutritional support, fitness and wellness activities, relapse prevention planning, and a structured aftercare programme.` },
    { question: `How quickly can I get into private rehab near ${location}?`, answer: `Many private rehab centres can arrange admission within 24â€"72 hours of enquiry, and some offer same-day admission for emergency cases. This speed of access is one of the key advantages of private treatment compared to NHS pathways in ${location}, which may have waiting lists of weeks to months.` },
    { question: `Can the NHS pay for private rehab?`, answer: `Yes, in some cases. NHS clinical commissioning groups (CCGs) can fund residential rehabilitation for people who meet specific clinical criteria. Your local drug and alcohol service in ${location} can apply for NHS-funded residential treatment if community treatment has not been sufficient. This is known as a "Section 117" or "jointly commissioned" placement.` },
    { question: `Does private rehab guarantee recovery?`, answer: `No treatment can guarantee recovery, but private residential rehab gives people the best possible start. Research consistently shows that longer treatment episodes (60â€"90 days) produce better outcomes than shorter programmes. The quality of aftercare planning â€" including community support, AA/NA attendance, and counselling â€" is also crucial to long-term recovery.` },
    { question: `What happens after private rehab in ${location}?`, answer: `Good private rehab programmes include structured aftercare planning. After leaving residential treatment in or near ${location}, most people benefit from: weekly counselling or therapy, AA or NA meetings (free, nationwide), ongoing GP support, possible Naltrexone or Acamprosate prescription, 12-step fellowship, and sober social networks. Many private rehabs offer aftercare sessions for 12 months post-discharge.` },
  ],
  ctaLabel: 'Call free: 0300 123 6600',
  ctaHref: 'tel:03001236600',
  secondaryCta: { label: 'NHS rehab in [Location]', href: '/nhs-rehab/[location]' },
}

export const NHS_REHAB_CONFIG: RehabTypeConfig = {
  slug: 'nhs-rehab',
  name: 'NHS Rehab',
  tagline: 'Free NHS addiction treatment and residential rehab',
  intro: 'NHS rehab in [location] is free and available to anyone who needs it. While many people can access effective NHS community treatment (outpatient services, keyworking, medication), residential NHS rehab is also available for those who need more intensive support. Access to free NHS rehab in [location] is through your GP or by self-referring to your local drug and alcohol service via Frank (0300 123 6600).',
  keyFacts: [
    { label: 'Cost', value: 'Free on the NHS', icon: 'ðŸ'™' },
    { label: 'How to access', value: 'GP referral or self-referral via Frank', icon: 'ðŸ"ž' },
    { label: 'Community treatment', value: 'Usually available within weeks', icon: 'ðŸ˜ï¸' },
    { label: 'Residential', value: 'Available for eligible cases', icon: 'ðŸ¥' },
  ],
  bodyParagraphs: [
    'NHS drug and alcohol services in [location] provide a full range of free treatment â€" from community outpatient support to medically supervised detox and residential rehabilitation for those who need it most. All NHS treatment is free at the point of use and is completely confidential.',
    'Community NHS treatment in [location] typically includes regular appointments with a drug or alcohol keyworker, CBT and other psychological therapies, medication-assisted treatment (methadone, buprenorphine, Naltrexone, Acamprosate), harm reduction advice, and access to mutual aid groups.',
    'For people who need residential (live-in) treatment, NHS-funded residential rehab is available for those assessed as requiring this level of support. Funding decisions are made by treatment services â€" speak to your keyworker or GP about whether residential treatment is appropriate for your situation in [location].',
  ],
  faqs: (location: string) => [
    { question: `Is NHS rehab really free in ${location}?`, answer: `Yes. All NHS drug and alcohol treatment in ${location} is free at the point of use, including community keyworking, medication, psychological therapy, and â€" for those clinically assessed as needing it â€" funded residential rehabilitation. There are no charges for NHS treatment.` },
    { question: `How do I access NHS rehab in ${location}?`, answer: `You can access NHS drug and alcohol services in ${location} by: (1) self-referring directly to your local drug service â€" call Frank on 0300 123 6600 to find the right service; (2) speaking to your GP, who can refer you; or (3) going to A&E if you are in immediate crisis. No appointment is needed to self-refer.` },
    { question: `Is there a waiting list for NHS rehab in ${location}?`, answer: `Community NHS treatment (outpatient keyworking, medication) in ${location} is usually available within a few weeks. NHS-funded residential rehabilitation may have a longer wait, as it depends on assessment, funding approval, and bed availability. If your situation is urgent, tell your keyworker or GP â€" crisis provisions exist.` },
    { question: `What is the difference between NHS rehab and private rehab?`, answer: `NHS rehab in ${location} is free but may have waiting times and less choice of facility. Private rehab offers faster access, more choice of location, and often more intensive or luxury environments. Both can be very effective. Many people start with NHS community treatment and access residential rehab through NHS funding or private payment if community treatment is insufficient.` },
    { question: `What medication is available through NHS addiction services?`, answer: `NHS drug and alcohol services in ${location} can prescribe: Methadone or Buprenorphine (for opioid dependency), Chlordiazepoxide (for alcohol detox), Acamprosate or Naltrexone (for alcohol relapse prevention), Disulfiram/Antabuse (for alcohol), and Lofexidine (for heroin detox). All medication is free on NHS prescription.` },
    { question: `Can I get NHS help even if I'm not ready to stop?`, answer: `Yes. NHS services in ${location} offer harm reduction support regardless of whether you are ready to stop completely. This includes needle exchanges, Naloxone prescriptions (overdose reversal medication), contraception, hepatitis C testing and treatment, and advice on safer drug use. Harm reduction saves lives.` },
  ],
  ctaLabel: 'Call Frank free: 0300 123 6600',
  ctaHref: 'tel:03001236600',
  secondaryCta: { label: 'Private rehab in [Location]', href: '/private-rehab/[location]' },
}

export const REHAB_COST_CONFIG: RehabTypeConfig = {
  slug: 'rehab-cost',
  name: 'Rehab Cost',
  tagline: 'How much does rehab cost?',
  intro: 'The cost of rehab in [location] depends on whether you choose private treatment or access free NHS treatment. NHS rehab is completely free. Private residential rehab in and around [location] typically costs ÂÂ£3,000â€"ÂÂ£8,000 for a standard 28-day programme, rising to ÂÂ£15,000+ for premium facilities. Day programmes and community treatment are less expensive alternatives.',
  keyFacts: [
    { label: 'NHS treatment', value: 'Free â€" community and residential options', icon: 'ðŸ'™' },
    { label: 'Private 28-day', value: 'ÂÂ£3,000â€"ÂÂ£8,000 (standard)', icon: 'ðŸ'·' },
    { label: 'Premium 28-day', value: 'ÂÂ£10,000â€"ÂÂ£20,000+', icon: 'ðŸ†' },
    { label: 'Day programme', value: 'ÂÂ£1,500â€"ÂÂ£4,000 for a full programme', icon: 'ðŸ˜ï¸' },
  ],
  bodyParagraphs: [
    'Rehab does not have to cost anything. NHS drug and alcohol services in [location] provide free treatment including community keyworking, medication-assisted detox, CBT, and â€" for those who need it â€" funded residential rehabilitation. Call Frank on 0300 123 6600 to access free NHS treatment in [location].',
    'For those who choose private treatment, costs vary significantly depending on the type of facility, programme length, and location. Standard UK private rehab costs ÂÂ£3,000â€"ÂÂ£8,000 for 28 days. Luxury facilities â€" often set in country houses or rural retreats â€" can cost ÂÂ£15,000â€"ÂÂ£25,000. However, there is no direct correlation between cost and treatment quality or outcomes.',
    'Several charities offer funded or heavily subsidised residential treatment places for people who need residential support but cannot afford private fees and do not qualify for NHS-funded placements. Action on Addiction and Turning Point operate funded programmes across the UK. Your local drug service in [location] can advise on charitable funding routes.',
  ],
  faqs: (location: string) => [
    { question: `How much does rehab cost in ${location}?`, answer: `NHS rehab in ${location} is free. Private residential rehab near ${location} typically costs ÂÂ£3,000â€"ÂÂ£8,000 for a standard 28-day programme. Premium private facilities cost ÂÂ£10,000â€"ÂÂ£20,000+. Day treatment programmes (attending without staying) cost less â€" typically ÂÂ£1,500â€"ÂÂ£4,000 for a full programme. Many providers offer payment plans.` },
    { question: `Can I get free rehab in ${location}?`, answer: `Yes. NHS drug and alcohol services in ${location} are completely free. Community treatment â€" keyworking, medication, CBT â€" is available to everyone. NHS-funded residential rehabilitation is also available for those who are assessed as needing it. Call Frank on 0300 123 6600 to self-refer for free NHS treatment in ${location}.` },
    { question: `Does insurance cover rehab in the UK?`, answer: `Some private health insurance policies in the UK cover addiction treatment. Check your policy documents carefully â€" coverage varies significantly. AXA, Bupa, Vitality, and Aviva all offer some level of mental health and addiction cover in certain policies. If you have private health insurance, it is worth calling them before pursuing self-funded treatment.` },
    { question: `What is the cheapest way to get into rehab?`, answer: `The most affordable route to residential treatment in ${location} is through NHS funding â€" which is free. Self-referral via Frank (0300 123 6600) or through your GP is the starting point. If you need private treatment and cannot afford full fees, some charities (Action on Addiction, Turning Point) offer funded places. Many private rehabs also offer payment plans.` },
    { question: `Is more expensive rehab better?`, answer: `Not necessarily. Research shows that treatment quality, duration, and aftercare matter far more than cost. A well-structured 28-day NHS-funded programme with strong aftercare can produce better outcomes than an expensive short detox with no aftercare. When evaluating private options near ${location}, focus on CQC registration, programme structure, qualified staff, and aftercare provision.` },
    { question: `How long does rehab typically last?`, answer: `Residential rehab programmes in ${location} typically run for 28, 60, or 90 days. Research consistently shows that longer programmes (60â€"90 days) produce significantly better long-term outcomes than shorter ones. Community-based treatment (outpatient) continues for months or years. There is no "right" length â€" it depends on the severity of the addiction and individual circumstances.` },
  ],
  ctaLabel: 'Call Frank free: 0300 123 6600',
  ctaHref: 'tel:03001236600',
  secondaryCta: { label: 'Find private rehab in [Location]', href: '/private-rehab/[location]' },
}

export const DUAL_DIAGNOSIS_CONFIG: RehabTypeConfig = {
  slug: 'dual-diagnosis',
  name: 'Dual Diagnosis Treatment',
  tagline: 'Mental health and addiction treated together',
  intro: 'Dual diagnosis refers to the co-occurrence of a mental health condition and a substance use problem â€" for example, depression and alcohol dependency, or anxiety and cocaine addiction. Dual diagnosis treatment in [location] is available through NHS services and specialist private facilities that treat both conditions simultaneously. If you or someone you know has both a mental health issue and an addiction, integrated dual diagnosis treatment gives the best outcomes.',
  keyFacts: [
    { label: 'What it is', value: 'Mental health + addiction treated together', icon: 'ðŸ§ ' },
    { label: 'NHS access', value: 'Free â€" via GP or Frank 0300 123 6600', icon: 'ðŸ'™' },
    { label: 'Common conditions', value: 'Depression, anxiety, PTSD, bipolar, psychosis', icon: 'ðŸ'Š' },
    { label: 'Private treatment', value: 'Available â€" specialist dual diagnosis rehabs', icon: 'ðŸ¥' },
  ],
  bodyParagraphs: [
    'Research shows that around 50â€"70% of people with a serious mental illness also have a substance use problem, and a similar proportion of people accessing addiction treatment have a co-occurring mental health condition. In [location], dual diagnosis is the norm rather than the exception in drug and alcohol treatment.',
    'Historically, mental health services and addiction services operated separately â€" people would get bounced between services or fall through the gaps. NHS services in [location] increasingly offer integrated dual diagnosis treatment, where mental health and addiction are addressed in the same service by the same clinical team.',
    'For treatment to work when both a mental health condition and addiction are present, both need to be addressed simultaneously. Treating addiction without addressing the underlying mental health issue frequently leads to relapse. Treating mental health without addressing the substance use means the substance continues to undermine recovery.',
  ],
  faqs: (location: string) => [
    { question: `What is dual diagnosis?`, answer: `Dual diagnosis means having both a mental health condition and a substance use problem at the same time. Common examples include: depression and alcohol dependency, anxiety and cocaine use, PTSD and heroin addiction, bipolar disorder and drug use, or psychosis and cannabis use. Both conditions interact and both need to be treated.` },
    { question: `Where can I get dual diagnosis treatment in ${location}?`, answer: `NHS drug and alcohol services in ${location} increasingly offer integrated dual diagnosis support. Contact your local service via Frank (0300 123 6600) or speak to your GP. Some private rehabs in and around ${location} specialise in dual diagnosis treatment â€" these offer intensive assessment and simultaneous treatment of mental health and addiction.` },
    { question: `Which comes first â€" treating the addiction or the mental health?`, answer: `Both should be treated simultaneously in an integrated programme. Treating only the addiction whilst leaving an untreated mental health condition (e.g., undiagnosed PTSD or depression) leads to relapse â€" the substance was being used to cope. Treating only the mental health without addressing the addiction means the substance continues to undermine progress.` },
    { question: `Does alcohol cause depression or does depression cause alcohol problems?`, answer: `Both. Alcohol is a depressant and heavy use directly causes and worsens depression. At the same time, many people with depression drink heavily to self-medicate. This creates a self-reinforcing cycle. In dual diagnosis treatment in ${location}, both are addressed together through psychiatric assessment, medication if needed, therapy, and addiction treatment.` },
    { question: `Can I get psychiatric medication whilst in addiction treatment?`, answer: `Yes. NHS and private dual diagnosis services in ${location} include psychiatric assessment and prescribing as part of the treatment. Antidepressants, mood stabilisers, antipsychotics, and ADHD medication can all be prescribed alongside addiction treatment when clinically appropriate.` },
    { question: `Is ADHD linked to addiction?`, answer: `Yes. ADHD is significantly overrepresented in people with substance use problems â€" research suggests 20â€"30% of people in addiction treatment have ADHD. Undiagnosed ADHD often leads to self-medication with stimulants, cannabis, or alcohol. A dual diagnosis programme in ${location} can assess for ADHD and provide appropriate treatment.` },
  ],
  ctaLabel: 'Get help â€" 0300 123 6600',
  ctaHref: 'tel:03001236600',
  secondaryCta: { label: 'Find rehab in [Location]', href: '/rehab/[location]' },
}

export const SOBER_LIVING_CONFIG: RehabTypeConfig = {
  slug: 'sober-living',
  name: 'Sober Living Homes',
  tagline: 'Supported accommodation for people in recovery',
  intro: 'Sober living homes in [location] provide drug-free, supported accommodation for people in early recovery from alcohol or drug addiction. They are designed for people leaving rehab, prison, or homelessness who need a stable, substance-free environment while they rebuild their lives. Sober living homes in [location] typically require abstinence, attendance at mutual aid meetings, and contribution to house chores.',
  keyFacts: [
    { label: 'Who it\'s for', value: 'People leaving rehab or needing stable recovery housing', icon: 'ðŸ ' },
    { label: 'Average cost', value: 'ÂÂ£100â€"ÂÂ£300/week (some funded by council)', icon: 'ðŸ'·' },
    { label: 'Typical stay', value: '3â€"12 months', icon: 'ðŸ"…' },
    { label: 'Requirements', value: 'Abstinence, meetings attendance, house rules', icon: 'ðŸ"‹' },
  ],
  bodyParagraphs: [
    'Sober living homes (also called recovery housing or dry houses) in [location] provide a structured, alcohol and drug-free environment for people in recovery. They bridge the gap between residential rehab and living independently â€" providing community, accountability, and peer support during the most vulnerable stage of recovery.',
    'Most sober living homes in [location] require residents to commit to abstinence, attend AA or NA meetings regularly, contribute to house chores, seek employment or engage in activities, and adhere to house rules. Some are completely self-funded; others are supported by local councils, charities, or housing associations.',
    'The evidence for recovery housing is strong. People who live in sober housing after rehab have significantly better long-term sobriety outcomes than those who return directly to previous environments. If you are leaving residential treatment in or near [location], asking your rehab or keyworker about recovery housing options is strongly recommended.',
  ],
  faqs: (location: string) => [
    { question: `What is a sober living home?`, answer: `A sober living home is a shared, drug and alcohol-free house for people in recovery. Residents must agree to stay sober, attend mutual aid meetings, and follow house rules. Unlike rehab, there are no therapists or medical staff â€" sober living homes are peer-supported environments that provide stability and community during early recovery.` },
    { question: `Are there sober living homes in ${location}?`, answer: `Yes. Sober living and recovery housing exists across ${location} and the wider region. Your local drug and alcohol service (contact via Frank: 0300 123 6600) maintains a directory of recovery housing in ${location}. Your rehab's aftercare coordinator can also help identify suitable options on discharge.` },
    { question: `How much does sober living cost in ${location}?`, answer: `Sober living homes in ${location} typically cost between ÂÂ£100 and ÂÂ£300 per week, including accommodation and utilities. Some places are funded by local councils or charities for people who qualify. Housing Benefit may cover costs for eligible residents. Speak to your local drug service or council housing team about funding options.` },
    { question: `What are the rules in a sober living home?`, answer: `Rules vary by house but typically include: total abstinence from alcohol and all non-prescribed drugs, random drug and alcohol testing, regular attendance at AA or NA meetings, curfew (especially early in residence), employment or voluntary work requirements, chores, house meetings, and a respect policy. Being asked to leave for breaking rules is possible.` },
    { question: `How long do people stay in sober living?`, answer: `The typical stay in a sober living home is 3â€"12 months, although some people choose to stay longer. The goal is to reach a point where you are stable in recovery, employed or training, and ready to live independently. Studies show the longer someone stays in recovery housing (up to around 12 months), the better their long-term outcome.` },
    { question: `Is sober living better than going home after rehab?`, answer: `For many people, yes. Research consistently shows that people who move to recovery housing after residential rehab have significantly better outcomes than those who return directly to previous environments â€" particularly if that environment involves people who use drugs or alcohol. If your home environment is a risk to your sobriety, a sober living home in ${location} is worth considering.` },
  ],
  ctaLabel: 'Get support â€" 0300 123 6600',
  ctaHref: 'tel:03001236600',
  secondaryCta: { label: 'Find rehab in [Location]', href: '/rehab/[location]' },
}

export const DETOX_CENTRES_CONFIG: RehabTypeConfig = {
  slug: 'detox-centres',
  name: 'Detox Centres',
  tagline: 'Medically supervised drug and alcohol detox',
  intro: 'Detox centres in [location] provide medically supervised withdrawal from alcohol and drugs â€" the critical first step for people with physical dependency. A medical detox is essential for alcohol, benzodiazepines, and opioids where sudden stopping can be dangerous. Detox centres in and around [location] are available through the NHS (free) and privately (from around ÂÂ£1,500â€"ÂÂ£5,000 for 7â€"10 days).',
  keyFacts: [
    { label: 'NHS detox', value: 'Free â€" community or residential', icon: 'ðŸ'™' },
    { label: 'Private detox', value: 'From ~ÂÂ£1,500 for 7â€"10 days', icon: 'ðŸ'·' },
    { label: 'Duration', value: 'Typically 5â€"14 days depending on substance', icon: 'ðŸ"…' },
    { label: 'Who needs it', value: 'Anyone with physical alcohol or drug dependency', icon: 'ðŸ¥' },
  ],
  bodyParagraphs: [
    'Not everyone needs a medically supervised detox. Detox is essential for alcohol dependency (severe withdrawal is potentially fatal), benzodiazepine dependency (same reason), and opioid dependency (to manage withdrawal safely with medication). For substances like cocaine or cannabis, there is no dangerous physical withdrawal, but community support may still be needed.',
    'NHS detox in [location] is available free of charge through community and residential pathways. Community alcohol detox (at home, with daily pharmacy medication) is a common and effective approach for people with supportive home environments. Residential detox provides 24/7 medical supervision for more severe cases.',
    'After completing detox in [location], most people benefit from entering a rehabilitation programme to address the psychological aspects of addiction. Detox alone has high relapse rates â€" it removes the physical dependency but not the psychological and behavioural patterns that drive addiction.',
  ],
  faqs: (location: string) => [
    { question: `What is a drug or alcohol detox?`, answer: `Detox is the medically supervised process of safely removing alcohol or drugs from your body whilst managing withdrawal symptoms. For alcohol and benzodiazepines, withdrawal can be life-threatening and must be medically managed. For opioids, medication (methadone or buprenorphine) makes detox safer and more comfortable.` },
    { question: `Are there detox centres in ${location}?`, answer: `Yes. Both NHS and private detox services are available in and around ${location}. NHS detox can be arranged via your GP or by self-referring to your local drug and alcohol service (call Frank: 0300 123 6600). Private detox centres typically offer residential facilities with 24/7 medical supervision.` },
    { question: `Is detox covered by the NHS in ${location}?`, answer: `Yes. NHS drug and alcohol services in ${location} provide medically supervised detox for free. Community detox (supervised withdrawal at home with daily medication) is the most common NHS approach. Residential NHS detox is available for those with severe dependency or unsafe home situations.` },
    { question: `Do I need to detox before going to rehab?`, answer: `Usually yes. Most residential rehab programmes require you to complete a medical detox first, as the rehab programme focuses on the psychological aspects of addiction. Some rehab centres include detox as the first phase of their programme.` },
    { question: `How long does detox take?`, answer: `Detox duration varies by substance: alcohol typically 5â€"10 days; benzodiazepines can take several weeks (slow taper); heroin/opioids 7â€"14 days with medication. Cocaine and cannabis have no dangerous physical detox component. Methadone detox takes longer than heroin detox due to its long half-life.` },
    { question: `Can I detox at home?`, answer: `For mild alcohol dependency, community detox at home with daily medication (typically chlordiazepoxide) is possible and effective. However, for moderate-to-severe alcohol or benzodiazepine dependency, home detox is dangerous â€" withdrawal can cause fatal seizures. Always speak to a doctor before attempting any alcohol or benzo detox.` },
  ],
  ctaLabel: 'Find detox help â€" 0300 123 6600',
  ctaHref: 'tel:03001236600',
  secondaryCta: { label: 'Private rehab in [Location]', href: '/private-rehab/[location]' },
}

export const HOW_TO_HELP_CONFIG: RehabTypeConfig = {
  slug: 'how-to-help',
  name: 'How to Help Someone with Addiction',
  tagline: 'Advice for families, friends and loved ones',
  intro: 'Helping someone with an addiction in [location] starts with understanding, not enabling. Whether a family member, partner, or friend is struggling with alcohol or drug addiction, your support can make a life-changing difference â€" but it needs to be the right kind of support. This guide covers how to have the conversation, where to get professional help in [location], and how to look after yourself too.',
  keyFacts: [
    { label: 'Frank helpline', value: '0300 123 6600 (free, 24/7)', icon: 'ðŸ"ž' },
    { label: 'Family support', value: 'Al-Anon, Adfam, GamCare families', icon: 'ðŸ'¨â€ðŸ'©â€ðŸ'§' },
    { label: 'What helps', value: 'Clear limits, professional guidance, patience', icon: 'ðŸ'›' },
    { label: "What doesn't help", value: 'Enabling, empty ultimatums, giving money', icon: 'âš ï¸' },
  ],
  bodyParagraphs: [
    'Watching someone you love struggle with addiction is devastating. It is common to feel helpless, angry, scared, and exhausted â€" often all at once. The most important thing to understand is that addiction is a medical condition, not a moral failure. Your loved one is not choosing addiction â€" their brain has been changed by substance use in ways that make stopping extremely difficult without help.',
    'The most effective things you can do are: encourage them to seek professional help (offer to go with them to the GP or call Frank together), learn about addiction and the available support in [location], set clear and loving limits around behaviours that are harmful to you (enabling is not helping), look after your own mental health (Al-Anon, Adfam, or counselling), and be patient â€" recovery is rarely a straight line.',
    'You cannot force someone to get well, and trying to control their addiction often leads to burnout and resentment. Adfam (adfam.org.uk) and Al-Anon (al-anonuk.org.uk) offer specific support designed for families â€" they can help you navigate this incredibly difficult situation.',
  ],
  faqs: (location: string) => [
    { question: `How do I get help for someone with an addiction in ${location}?`, answer: `Encourage them to call Frank (0300 123 6600, free, 24/7) or to speak to their GP. You can call Frank yourself for advice on how to help. Offer to go with them to their first appointment. NHS drug and alcohol services in ${location} accept self-referrals.` },
    { question: `What should I not say to someone with an addiction?`, answer: `Avoid: "Just stop," "You're selfish/weak," empty threats, ultimatums without support. Instead say: "I'm worried about you," "I love you and I want to help," "Would you be open to speaking to a doctor?" â€" approach them when they are sober and relatively calm.` },
    { question: `What is enabling and how do I stop?`, answer: `Enabling means taking actions that allow someone's addiction to continue â€" giving money you know will be spent on substances, covering up their addiction, making excuses, or bailing them out repeatedly. It feels like helping but removes consequences that might motivate change. Al-Anon meetings in ${location} can help you identify enabling patterns.` },
    { question: `Should I give my addicted family member money?`, answer: `Giving money directly to someone addicted to drugs or alcohol is very likely to fund their addiction. Consider paying bills directly or buying food instead. Many families choose to stop all financial support â€" this is difficult but can be an important limit. Speak to Al-Anon or Adfam for guidance.` },
    { question: `My loved one refuses to get help â€" what can I do?`, answer: `You cannot force someone into treatment against their will. What you can do: continue to encourage treatment, model healthy limits, get your own support (Al-Anon, Adfam, counselling), reduce enabling behaviours, and keep the door open. Sometimes people need to reach their own turning point before accepting help.` },
    { question: `Where can I get support as a family member in ${location}?`, answer: `Al-Anon (0800 0086 811) offers meetings for families of people with alcohol problems. Adfam (adfam.org.uk) supports families affected by all drug and alcohol use. GamCare's helpline (0808 8020 133) supports families of gamblers. Frank (0300 123 6600) also provides family guidance. Your own GP can refer you to counselling â€" you matter too.` },
  ],
  ctaLabel: 'Call Frank for family advice: 0300 123 6600',
  ctaHref: 'tel:03001236600',
  secondaryCta: { label: 'Al-Anon meetings in [Location]', href: '/al-anon/[location]' },
}

export const ALCOHOL_REHAB_CONFIG: RehabTypeConfig = {
  slug: 'alcohol-rehab',
  name: 'Alcohol Rehab',
  tagline: 'Residential and community alcohol treatment',
  intro: 'Alcohol rehab in [location] provides specialist treatment for alcohol dependency â€” from free NHS community services to private residential rehabilitation. Alcohol rehab typically includes medically supervised detox (essential for severe dependency), residential therapy, CBT, and structured aftercare. Both free NHS and private alcohol rehab are available in and around [location].',
  keyFacts: [
    { label: 'NHS alcohol rehab', value: 'Free â€” via GP or Frank 0300 123 6600', icon: '??' },
    { label: 'Private 28-day', value: 'Â£3,000â€“Â£10,000 (includes detox)', icon: '??' },
    { label: 'Community detox', value: 'At home with medication â€” often NHS funded', icon: '???' },
    { label: 'Success rates', value: 'Best outcomes with 60â€“90 day programmes', icon: '??' },
  ],
  bodyParagraphs: [
    'Alcohol rehab in [location] addresses both the physical and psychological aspects of alcohol dependency. Physical dependency on alcohol requires a medically supervised detox â€” stopping suddenly without medical support can cause life-threatening seizures. Never stop drinking heavily without speaking to a doctor first.',
    'After completing a medically supervised detox, alcohol rehab in [location] focuses on the psychological drivers of alcohol use through CBT, motivational interviewing, group therapy, 12-step or SMART Recovery work, family therapy, and relapse prevention planning.',
    'NHS alcohol treatment in [location] is free and can be accessed by self-referral. Call Frank on 0300 123 6600 to find your local service. For those who want faster access, private alcohol rehab in and around [location] typically offers same-week admission.',
  ],
  faqs: (location: string) => [
    { question: `What is the best alcohol rehab in ${location}?`, answer: `The best alcohol rehab for you in ${location} depends on the severity of your dependency, your support network, and your finances. NHS-funded community treatment and residential rehab are both free and effective. Private residential rehab offers faster access. The most important factors are engagement with treatment and quality of aftercare.` },
    { question: `How long is alcohol rehab in ${location}?`, answer: `NHS community alcohol treatment in ${location} is typically provided over 6â€“12 months. Residential programmes run for 28, 60, or 90 days. Research shows longer residential programmes produce significantly better long-term sobriety rates.` },
    { question: `Do I need to detox before alcohol rehab in ${location}?`, answer: `If you are physically dependent on alcohol (drinking daily, getting shakes if you stop), you will need a medically supervised detox before residential rehab. Many private rehab centres include detox as the first phase. NHS community detox at home is also available.` },
    { question: `Is alcohol rehab free in ${location}?`, answer: `Yes. NHS alcohol treatment in ${location} is free, including community keyworking, medication-assisted detox, CBT, and funded residential rehab for those who need it. Self-refer via Frank (0300 123 6600) or your GP. AA meetings are always free.` },
    { question: `What happens after alcohol rehab in ${location}?`, answer: `After completing alcohol rehab in ${location}, a structured aftercare plan is essential: regular counselling, AA or SMART Recovery meetings, Acamprosate or Naltrexone medication, continued GP support, and sober social activities. Quality of aftercare is the biggest predictor of long-term recovery.` },
    { question: `Can I go to alcohol rehab without AA?`, answer: `Yes. AA is just one component of recovery and is not mandatory. Many alcohol rehab programmes in ${location} offer SMART Recovery, CBT-based therapy, secular approaches, and individual counselling as alternatives. Private rehab centres and NHS services are increasingly flexible about the recovery model.` },
  ],
  ctaLabel: 'Call free: 0300 123 6600',
  ctaHref: 'tel:03001236600',
  secondaryCta: { label: 'Private rehab in [Location]', href: '/private-rehab/[location]' },
}

export const DRUG_REHAB_CONFIG: RehabTypeConfig = {
  slug: 'drug-rehab',
  name: 'Drug Rehab',
  tagline: 'Specialist residential and community drug treatment',
  intro: 'Drug rehab in [location] provides specialist treatment for all types of drug dependency â€” heroin, cocaine, crack, cannabis, prescription drugs, and more. Free NHS drug rehab is available in [location] through self-referral. Private residential drug rehab typically offers faster access, with admission possible within days. Both approaches can be life-changing.',
  keyFacts: [
    { label: 'NHS drug rehab', value: 'Free â€” self-refer via Frank 0300 123 6600', icon: '??' },
    { label: 'Private 28-day', value: 'Â£3,000â€“Â£10,000 all-inclusive', icon: '??' },
    { label: 'Community treatment', value: 'Keyworking, medication, CBT â€” free', icon: '???' },
    { label: 'Who it helps', value: 'Heroin, cocaine, crack, cannabis, prescription drugs', icon: '??' },
  ],
  bodyParagraphs: [
    'Drug rehab in [location] is available for all types of substance dependency. NHS community drug treatment â€” including methadone or buprenorphine prescribing, CBT, keyworking, and group therapy â€” is free and can be accessed immediately through self-referral. Private residential drug rehab offers an intensive environment away from triggers.',
    'Drug rehab in [location] typically combines medically supervised detox, psychological therapy (CBT, trauma-informed care, motivational interviewing), group work, relapse prevention planning, and structured aftercare. Some programmes also address co-occurring mental health conditions (dual diagnosis).',
    'The most effective drug rehab programmes match the treatment approach to the individual needs, severity, and life circumstances. NHS services in [location] provide comprehensive assessment and tailored treatment plans.',
  ],
  faqs: (location: string) => [
    { question: `How do I get into drug rehab in ${location}?`, answer: `Call Frank on 0300 123 6600 (free, 24/7) to self-refer to NHS drug treatment services in ${location}. You can also speak to your GP. Private drug rehab near ${location} can often arrange admission within 24â€“72 hours â€” many operate 24-hour admissions lines.` },
    { question: `What drugs are treated in drug rehab in ${location}?`, answer: `Drug rehab services in ${location} treat dependency on all substances including: heroin and other opioids, cocaine and crack, cannabis, amphetamines and crystal meth, MDMA and club drugs, prescription drug misuse (codeine, tramadol, diazepam, gabapentin, pregabalin), ketamine, spice, and polydrug use.` },
    { question: `Is drug rehab free in ${location}?`, answer: `Yes. NHS community drug treatment in ${location} is completely free. This includes keyworking, medication, CBT, harm reduction, and group therapy. NHS-funded residential drug rehab is available for those assessed as needing it. Call Frank (0300 123 6600) to self-refer.` },
    { question: `How long is drug rehab?`, answer: `NHS community drug treatment is typically 6â€“18 months. Residential programmes run 28, 60, or 90 days. Longer residential programmes produce better outcomes. After residential rehab, ongoing aftercare including counselling and NA meetings is essential.` },
    { question: `What is the difference between detox and drug rehab?`, answer: `Detox is the process of safely removing drugs from your body â€” it is the first and most intense phase. Drug rehab is the longer programme that addresses psychological, behavioural, and social aspects of addiction after detox. Detox alone has very high relapse rates â€” rehab builds the skills for sustained recovery.` },
    { question: `Can I go to drug rehab while on methadone?`, answer: `Yes. Being on methadone or buprenorphine does not prevent you from accessing drug rehab. Many NHS community treatment programmes include methadone alongside therapy. Some residential rehabs also accept patients on opioid substitution therapy â€” ask when you enquire.` },
  ],
  ctaLabel: 'Call Frank free: 0300 123 6600',
  ctaHref: 'tel:03001236600',
  secondaryCta: { label: 'Find private rehab in [Location]', href: '/private-rehab/[location]' },
}

export const BINGE_DRINKING_CONFIG: RehabTypeConfig = {
  slug: 'binge-drinking',
  name: 'Binge Drinking Help',
  tagline: 'Support for binge drinking and heavy episodic alcohol use',
  intro: 'Binge drinking is defined by the NHS as drinking more than 6 units (women) or 8 units (men) in a single session. It is the most common pattern of harmful alcohol use in the UK â€” affecting an estimated 8 million adults. Free, confidential help for binge drinking is available in [location] through your GP, NHS alcohol services, and online programmes. You do not need to be physically dependent to access support.',
  keyFacts: [
    { label: 'NHS definition', value: 'More than 6 units (women) or 8 units (men) per session', icon: '??' },
    { label: 'UK prevalence', value: '~8 million UK adults binge drink regularly', icon: '??' },
    { label: 'Free help', value: 'GP or self-refer via Frank 0300 123 6600', icon: '??' },
    { label: 'Online tools', value: 'Drinkaware app, alcohol units calculator', icon: '??' },
  ],
  bodyParagraphs: [
    'Binge drinking causes significant short-term risks including accidents, alcohol poisoning, and dangerous interactions with medications. Longer-term, regular binge drinking increases risk of liver disease, cancer, cardiovascular disease, mental health problems, and can progress to physical alcohol dependency.',
    'If your binge drinking is affecting your health, relationships, work, or finances, free support is available in [location]. Your GP can offer a brief alcohol intervention and referral to alcohol services. NHS alcohol services in [location] offer group and individual support without requiring you to be physically addicted.',
    'Online and app-based tools including Drinkaware, the NHS Drink Less app, and SMART Recovery provide self-help resources for moderating or stopping binge drinking. Use our alcohol units calculator to check how many units you typically consume.',
  ],
  faqs: (location: string) => [
    { question: `What counts as binge drinking?`, answer: `The NHS defines binge drinking as drinking more than 6 units in a single session for women, or 8 units for men. This is roughly: 2 large glasses of wine (6 units), or 4 pints of standard-strength beer (8 units). Many people drink significantly more than this without realising how many units they consume.` },
    { question: `Am I a binge drinker?`, answer: `If you regularly drink more than 6 units (women) or 8 units (men) in a single session â€” even infrequently â€” you meet the NHS definition. Use our alcohol units calculator to check against guidelines. If you are concerned, speak to your GP or call Frank (0300 123 6600) for a free, confidential assessment.` },
    { question: `Where can I get help with binge drinking in ${location}?`, answer: `Help for binge drinking in ${location} is available through: your GP, NHS drug and alcohol services (via Frank: 0300 123 6600), the Drinkaware app, SMART Recovery meetings, and CBT-based therapy. You do not need to be physically addicted to access support.` },
    { question: `Is binge drinking the same as alcohol addiction?`, answer: `Not necessarily. Binge drinkers may not drink every day and may not be physically dependent. However, regular binge drinking significantly increases your risk of developing alcohol dependency. Both patterns cause serious health harm and both can be helped with support.` },
    { question: `Can I moderate my drinking or do I have to stop completely?`, answer: `For most binge drinkers who are not physically dependent, moderation is a realistic goal. Your GP or an alcohol service in ${location} can help you create a moderated drinking plan. For those with physical dependency, abstinence is usually recommended.` },
    { question: `What are the effects of binge drinking on mental health?`, answer: `Binge drinking significantly worsens anxiety and depression. Alcohol is a depressant â€” the temporary relief it provides is followed by a neurochemical hangover that amplifies anxiety and low mood. Regular binge drinking is strongly associated with depression, anxiety disorders, and increased suicide risk.` },
  ],
  ctaLabel: 'Get help â€” 0300 123 6600',
  ctaHref: 'tel:03001236600',
  secondaryCta: { label: 'Alcohol rehab in [Location]', href: '/alcohol-rehab/[location]' },
}

export const NALOXONE_CONFIG: RehabTypeConfig = {
  slug: 'naloxone',
  name: 'Naloxone (Narcan)',
  tagline: 'Free overdose reversal medication across the UK',
  intro: 'Naloxone (Narcan) is a medication that rapidly reverses opioid overdose â€” it can save a life within minutes. Naloxone is available free of charge in [location] from needle exchanges, many pharmacies, drug services, and some GP surgeries. Anyone who uses opioids, uses drugs of uncertain content, or lives with someone who uses opioids should have naloxone and know how to use it.',
  keyFacts: [
    { label: 'Cost', value: 'Free from needle exchanges and pharmacies', icon: '??' },
    { label: 'Works on', value: 'Heroin, methadone, fentanyl, codeine, tramadol', icon: '??' },
    { label: 'How to give', value: 'Nasal spray (Nyxoid) or injection', icon: '??' },
    { label: 'Response time', value: 'Works within 2â€“3 minutes', icon: '?' },
  ],
  bodyParagraphs: [
    'Opioid overdose causes breathing to slow and stop â€” naloxone works by blocking opioid receptors in the brain and restoring breathing within minutes. Without naloxone, opioid overdoses are frequently fatal. With naloxone, most people make a full recovery if treated promptly.',
    'In [location] and across the UK, naloxone is available free of charge without a prescription from NHS needle exchanges, many pharmacies, drug treatment services, and some GP surgeries. The Take Home Naloxone (THN) programme means family members, friends, and carers can collect naloxone for use in an emergency.',
    'If someone has overdosed on opioids: call 999 immediately, give naloxone if available, perform rescue breathing if safe, place in recovery position. Naloxone wears off in 30â€“90 minutes â€” stay until emergency services arrive even if the person appears to recover.',
  ],
  faqs: (location: string) => [
    { question: `Where can I get free naloxone in ${location}?`, answer: `Naloxone is available free in ${location} from: NHS needle exchange services, many pharmacies (Take Home Naloxone scheme), drug treatment services (call Frank: 0300 123 6600), and some GP surgeries. The nasal spray (Nyxoid) is the easiest form for most people to use.` },
    { question: `How do I use naloxone?`, answer: `Nasal naloxone (Nyxoid): remove cap, tilt head back, insert nozzle into one nostril, press plunger firmly. Repeat in the other nostril if no response after 2â€“3 minutes. Injectable: inject into outer thigh. Always call 999 first.` },
    { question: `Does naloxone work on fentanyl?`, answer: `Yes, but higher or repeated doses may be required. Fentanyl is extremely potent, and standard naloxone doses may wear off before the fentanyl does. Administer a second dose if there is no response after 2â€“3 minutes. Always call 999 regardless.` },
    { question: `Is it legal to carry naloxone in the UK?`, answer: `Yes. Since 2015, anyone in England, Wales, and Scotland can possess and administer naloxone legally without a prescription under the Medicines Act exemption. Family members, friends, and people who use drugs can all legally carry and use naloxone.` },
    { question: `Can naloxone harm someone who hasn't taken opioids?`, answer: `Naloxone has no effect on someone who has not taken opioids â€” it is a pure opioid antagonist. If someone is unconscious due to alcohol or another non-opioid substance, naloxone will not help them but it will not harm them either. If unsure what someone has taken, it is always safe to give naloxone.` },
    { question: `What happens after someone is given naloxone?`, answer: `After naloxone reverses an overdose, the person may experience sudden withdrawal symptoms (nausea, agitation). Naloxone effects last 30â€“90 minutes â€” there is a risk of re-overdose after it wears off. Hospital attendance is essential even when initial reversal appears complete.` },
  ],
  ctaLabel: 'Find naloxone near you â€” 0300 123 6600',
  ctaHref: 'tel:03001236600',
  secondaryCta: { label: 'Heroin help in [Location]', href: '/heroin-addiction/[location]' },
}

export const CHEMSEX_CONFIG: RehabTypeConfig = {
  slug: 'chemsex-support',
  name: 'Chemsex Support',
  tagline: 'Specialist support for chemsex and drug-facilitated sex',
  intro: 'Chemsex refers to the use of specific drugs â€” typically crystal meth, mephedrone, and GHB/GBL â€” to facilitate or enhance sexual activity, predominantly (but not exclusively) among gay and bisexual men. Specialist chemsex support is available in [location] through NHS sexual health services, drug services, and LGBT+ charities. Care is always non-judgemental and confidential.',
  keyFacts: [
    { label: 'Main drugs', value: 'Crystal meth, mephedrone, GHB/GBL', icon: '??' },
    { label: 'NHS support', value: 'Sexual health clinics + drug services', icon: '??' },
    { label: 'Specialist services', value: 'LGBT Foundation, Antidote, 56 Dean St', icon: '??????' },
    { label: 'Crisis line', value: 'Frank: 0300 123 6600 (24/7, free)', icon: '??' },
  ],
  bodyParagraphs: [
    'Chemsex presents unique clinical challenges because the drugs involved (meth, mephedrone, GHB/GBL) are used within a specific social and sexual context. Treatment that does not address both the drug use and the sexual context is rarely effective. Specialist chemsex support services in [location] understand this context and provide LGBT+-affirming care.',
    'GHB and GBL are particularly dangerous â€” the difference between a recreational dose and an overdose is very small, and GHB overdose (going under) can cause sudden loss of consciousness and death. Never use GHB/GBL alone, and always call 999 if someone becomes unresponsive.',
    'NHS sexual health clinics in [location] increasingly offer chemsex support integrated with HIV care and STI testing. The charities Antidote (LGBT+ drug service) and the national helpline Frank (0300 123 6600) can connect you with appropriate support in [location].',
  ],
  faqs: (location: string) => [
    { question: `What is chemsex?`, answer: `Chemsex is the use of specific drugs â€” primarily crystal meth, mephedrone, and GHB/GBL â€” to enhance or facilitate sexual experiences. It predominantly affects gay and bisexual men but is not exclusive to this group. Regular chemsex can lead to severe addiction, serious mental health harm, sexual risk-taking, and in some cases, sexual assault while incapacitated.` },
    { question: `Where can I get chemsex support in ${location}?`, answer: `Chemsex support in ${location} is available through: NHS sexual health clinics (many have specialist chemsex workers), local drug and alcohol services (call Frank: 0300 123 6600), the LGBT Foundation (0345 3 30 30 30), and Antidote (LGBT Foundation's drug service). Many people access chemsex support through sexual health clinics where the atmosphere is non-judgemental.` },
    { question: `Is GHB/GBL dangerous?`, answer: `Yes â€” GHB and GBL are among the most dangerous chemsex drugs. The margin between a recreational dose and an overdose is extremely small, and effects vary unpredictably between batches. GHB overdose causes sudden loss of consciousness which can rapidly become fatal. Never use GHB alone. If someone becomes unresponsive: call 999 immediately and place in recovery position.` },
    { question: `Can I get chemsex support without it going on my medical record?`, answer: `NHS sexual health clinics typically do not automatically share attendances with your GP. Speak to the clinic about their confidentiality policy. Voluntary sector organisations (LGBT Foundation, Antidote) operate entirely independently of NHS records.` },
    { question: `I'm not gay â€” can I get chemsex support in ${location}?`, answer: `Yes. Chemsex support services in ${location} are open to anyone regardless of sexual orientation or gender identity. While most services developed in response to higher prevalence among gay and bisexual men, chemsex occurs across all communities.` },
    { question: `How do I help a friend who is using chemsex drugs?`, answer: `Express concern without judgement â€” chemsex often involves shame and stigma. Encourage them to speak to a sexual health clinic or call Frank (0300 123 6600). If they have lost consciousness after GHB/GBL use, call 999 immediately. The Good Samaritan principle applies â€” you will not get in trouble for seeking emergency help.` },
  ],
  ctaLabel: 'Get help â€” Frank: 0300 123 6600',
  ctaHref: 'tel:03001236600',
  secondaryCta: { label: 'Drug treatment in [Location]', href: '/drug-treatment/[location]' },
}

export const OPIATE_ADDICTION_CONFIG: RehabTypeConfig = {
  slug: 'opiate-addiction',
  name: 'Opiate Addiction Treatment',
  tagline: 'Help for opioid dependency â€” heroin, methadone, prescription opioids',
  intro: 'Opiate (opioid) addiction covers dependency on heroin, methadone, prescription opioids (codeine, tramadol, oxycodone, fentanyl), and other opioid drugs. Free opiate addiction treatment in [location] is available through NHS drug services â€” including methadone or buprenorphine prescribing, medically supervised detox, and residential rehab. Call Frank on 0300 123 6600 (free, 24/7) to access opioid treatment in [location] without delay.',
  keyFacts: [
    { label: 'NHS treatment', value: 'Free â€” methadone, buprenorphine, detox, rehab', icon: '??' },
    { label: 'Key medications', value: 'Methadone, buprenorphine (Subutex/Suboxone)', icon: '??' },
    { label: 'Overdose reversal', value: 'Naloxone â€” free from needle exchanges', icon: '?' },
    { label: 'Self-refer', value: 'Frank: 0300 123 6600 (24/7, free)', icon: '??' },
  ],
  bodyParagraphs: [
    'Opioid addiction is one of the most serious and life-threatening forms of addiction. NHS treatment in [location] is free, highly effective, and available without needing a GP referral â€” you can self-refer by calling Frank on 0300 123 6600.',
    'The most effective evidence-based treatment for opioid addiction combines medication-assisted treatment (MAT) â€” methadone or buprenorphine â€” with psychological support, keyworking, and structured aftercare. Methadone and buprenorphine reduce withdrawal symptoms, eliminate cravings, and dramatically reduce overdose death risk. Both are free on the NHS in [location].',
    'Naloxone (Narcan) can reverse an opioid overdose in minutes and is available free from needle exchanges and pharmacies in [location] without a prescription. If you or someone you know uses opioids, please carry naloxone â€” it saves lives.',
  ],
  faqs: (location: string) => [
    { question: `What is the best treatment for opiate addiction?`, answer: `The most effective treatment combines medication-assisted treatment (MAT) â€” methadone or buprenorphine â€” with psychological support. Both medications eliminate withdrawal symptoms and cravings and dramatically reduce overdose risk. Long-term MAT is evidence-based, life-saving, and available free on the NHS in ${location}.` },
    { question: `Where can I get opiate addiction help in ${location}?`, answer: `NHS opioid treatment in ${location} is free and you can self-refer â€” call Frank on 0300 123 6600 (24/7). Treatment includes methadone or buprenorphine prescribing, keyworking, harm reduction, and access to residential rehab for those who need it.` },
    { question: `What is methadone and how does it help?`, answer: `Methadone is a long-acting opioid prescribed by NHS drug services to eliminate heroin withdrawal and cravings. It is dispensed daily from a pharmacy and is free on the NHS. Research consistently shows methadone maintenance reduces heroin use, overdose deaths, crime, and blood-borne virus transmission.` },
    { question: `What is buprenorphine and is it better than methadone?`, answer: `Buprenorphine (Subutex or Suboxone) is increasingly preferred because it has a ceiling effect reducing overdose risk, can be prescribed by GPs, and carries lower diversion risk. Both are effective; the best choice varies by individual circumstances.` },
    { question: `Is there stigma about methadone treatment?`, answer: `Unfortunately yes â€” but the evidence is clear: methadone and buprenorphine save lives. Opioid substitution therapy is not just swapping one drug for another â€” it provides a controlled dose that eliminates the need to use illicit heroin and all its risks. NHS services in ${location} treat all patients with dignity and respect.` },
    { question: `I'm addicted to prescription opioids, not heroin â€” can I still get help?`, answer: `Yes. NHS opioid treatment services in ${location} treat dependency on all opioids â€” codeine, tramadol, oxycodone, fentanyl patches, buprenorphine tablets, and any other opioid medication. Treatment is tailored to your specific situation.` },
  ],
  ctaLabel: 'Call Frank free: 0300 123 6600',
  ctaHref: 'tel:03001236600',
  secondaryCta: { label: 'Heroin help in [Location]', href: '/heroin-addiction/[location]' },
}

export const ALCOHOL_DETOX_CONFIG: RehabTypeConfig = {
  slug: 'alcohol-detox',
  name: 'Alcohol Detox',
  tagline: 'Medically supervised alcohol detoxification',
  intro: 'Alcohol detox in [location] is the medically supervised process of safely withdrawing from alcohol. If you drink heavily every day and have physical dependency symptoms (shakes, sweats, anxiety when not drinking), detox MUST be medically supervised â€” unsupervised alcohol withdrawal can cause fatal seizures. Free NHS alcohol detox is available in [location] via self-referral. Call Frank on 0300 123 6600 (free, 24/7).',
  keyFacts: [
    { label: 'NHS detox', value: 'Free â€” home or residential', icon: '??' },
    { label: 'Medication', value: 'Chlordiazepoxide (Librium)', icon: '??' },
    { label: 'Duration', value: '7â€“10 days typically', icon: '??' },
    { label: 'Risk warning', value: 'Never stop cold turkey without medical advice', icon: '??' },
  ],
  bodyParagraphs: [
    'Alcohol detox in [location] uses medication â€” typically chlordiazepoxide (Librium) on a reducing dose â€” to prevent withdrawal seizures and make withdrawal safe. Community detox (at home with daily clinical monitoring) is the most common NHS model and is completely free. Residential detox is available for those with severe dependency, previous seizures, or unsafe home situations.',
    'After completing alcohol detox in [location], the physical dependency is broken â€” but psychological rehabilitation is essential to prevent relapse. All NHS detox pathways in [location] include referral to ongoing community alcohol treatment, counselling, and relapse prevention support. Detox alone without rehab has relapse rates of up to 80% within a year.',
  ],
  faqs: (location: string) => [
    { question: `Do I need alcohol detox in ${location}?`, answer: `You need medically supervised detox if you: drink daily, experience shakes/sweats/anxiety when you stop, have had previous withdrawal seizures, or feel physically unwell when you don't drink. Never try to stop cold turkey if physically dependent â€” call Frank (0300 123 6600) or your GP first.` },
    { question: `Is alcohol detox free in ${location}?`, answer: `Yes. NHS community alcohol detox in ${location} â€” including all medication â€” is completely free. Self-refer via Frank (0300 123 6600) or your GP. Private residential detox near ${location} typically costs Â£1,500â€“Â£4,000.` },
    { question: `How long does alcohol detox take?`, answer: `Medically supervised alcohol detox typically takes 7â€“10 days with a reducing dose of chlordiazepoxide. The most dangerous phase (seizure risk) is 24â€“48 hours after the last drink. After 7â€“10 days, the physical dependency is broken.` },
    { question: `What medication is used in alcohol detox?`, answer: `The standard NHS medication is chlordiazepoxide (Librium), a benzodiazepine given on a reducing dose to prevent seizures and ease withdrawal symptoms. Thiamine (vitamin B1) supplementation is also given to prevent Wernicke's encephalopathy, a serious brain condition caused by alcohol-related vitamin deficiency.` },
    { question: `What happens after alcohol detox in ${location}?`, answer: `After completing detox, the essential next steps are: alcohol rehab or community treatment programme, CBT or motivational interviewing, Acamprosate or Naltrexone medication to reduce cravings, AA meetings, and structured aftercare. Detox alone without rehabilitation leads to very high relapse rates.` },
    { question: `Can I detox from alcohol at home in ${location}?`, answer: `Community alcohol detox â€” where you remain at home while a clinical team supervises you daily and provides medication â€” is available free from NHS services in ${location}. This is different from trying to stop drinking alone at home without support, which is dangerous.` },
  ],
  ctaLabel: 'Call Frank free: 0300 123 6600',
  ctaHref: 'tel:03001236600',
  secondaryCta: { label: 'Alcohol rehab in [Location]', href: '/alcohol-rehab/[location]' },
}

export const DRUG_DETOX_CONFIG: RehabTypeConfig = {
  slug: 'drug-detox',
  name: 'Drug Detox',
  tagline: 'Medically supervised drug detoxification',
  intro: 'Drug detox in [location] is the medically supervised process of safely withdrawing from addictive substances â€” including heroin, prescription opioids, benzodiazepines, and other drugs. Free NHS drug detox is available in [location] through self-referral. Opioid detox uses medication such as buprenorphine or lofexidine. Benzo detox requires a supervised reducing dose. Call Frank on 0300 123 6600 (free, 24/7) to find the right drug detox option in [location].',
  keyFacts: [
    { label: 'NHS drug detox', value: 'Free â€” self-refer via Frank', icon: '??' },
    { label: 'Opioid detox meds', value: 'Buprenorphine, lofexidine', icon: '??' },
    { label: 'Benzo detox', value: 'Reducing diazepam â€” very gradual', icon: '??' },
    { label: 'Duration', value: 'Varies by substance â€” days to weeks', icon: '??' },
  ],
  bodyParagraphs: [
    'Drug detox in [location] varies significantly depending on the substance. Heroin and opioid detox typically uses buprenorphine (Subutex), lofexidine, or a reducing methadone dose to manage withdrawal over 7â€“14 days. Benzodiazepine detox requires a very gradual reducing dose â€” rapid withdrawal from benzos can also cause fatal seizures. Cocaine and cannabis do not cause physical withdrawal in the same way, though psychological withdrawal can be intense.',
    'NHS drug detox services in [location] are free and can be accessed by self-referral. The process begins with a clinical assessment to determine the safest detox approach, required level of supervision (community or residential), and any medications needed. Call Frank (0300 123 6600) to be connected with the right detox service in [location] for your specific substance and situation.',
  ],
  faqs: (location: string) => [
    { question: `Is drug detox free in ${location}?`, answer: `Yes. NHS drug detox in ${location} is completely free. This includes assessment, medication, and clinical supervision. Call Frank (0300 123 6600) or your GP to self-refer. Private drug detox near ${location} typically costs Â£2,000â€“Â£6,000.` },
    { question: `What drugs require medical detox?`, answer: `Opioids (heroin, methadone, codeine, tramadol, oxycodone) and benzodiazepines (diazepam, lorazepam, alprazolam) require medically supervised detox. Alcohol also requires medical detox. Cocaine, cannabis, and MDMA do not cause life-threatening physical withdrawal, though the psychological component can still benefit from clinical support.` },
    { question: `How long does drug detox take in ${location}?`, answer: `Duration varies by substance: heroin detox 7â€“14 days; short-term benzo detox weeks to months (depending on dose and duration of use); alcohol detox 7â€“10 days; cocaine/cannabis withdrawal is primarily psychological with no fixed detox duration. Your clinical team in ${location} will create an individualised plan.` },
    { question: `What is the difference between drug detox and drug rehab?`, answer: `Detox addresses the physical withdrawal phase â€” removing the drug from your body safely with medication. Rehab addresses the psychological, behavioural, and social aspects of addiction that follow. Detox is usually the first phase of a broader treatment programme. Most people who detox without also completing rehab relapse within months.` },
    { question: `Can I detox from drugs at home in ${location}?`, answer: `Community drug detox â€” at home with daily clinical supervision and medication â€” is available free through NHS services in ${location} for appropriate candidates. Whether home or residential detox is safer depends on your substance, dependency severity, home situation, and medical history. Your clinical team will advise.` },
    { question: `What happens after drug detox?`, answer: `After completing drug detox in ${location}, the next phase is rehabilitation: psychological therapy (CBT, trauma-informed care), group work, medication-assisted treatment (MAT) if appropriate for opioid users, NA or SMART Recovery meetings, and structured aftercare. Detox alone without ongoing treatment rarely leads to sustained recovery.` },
  ],
  ctaLabel: 'Call Frank free: 0300 123 6600',
  ctaHref: 'tel:03001236600',
  secondaryCta: { label: 'Drug rehab in [Location]', href: '/drug-rehab/[location]' },
}

export const RESIDENTIAL_REHAB_CONFIG: RehabTypeConfig = {
  slug: 'residential-rehab',
  name: 'Residential Rehab',
  tagline: 'Live-in residential addiction rehabilitation',
  intro: 'Residential rehab in [location] provides intensive, live-in addiction treatment where you stay at the facility for the duration of your programme â€” typically 28, 60, or 90 days. Residential rehab removes you from your usual environment and triggers, offering round-the-clock support, medically supervised detox if needed, daily therapy, and structured recovery activities. NHS-funded residential rehab is available for those assessed as needing it. Private residential rehab near [location] offers faster admission â€” often within days.',
  keyFacts: [
    { label: 'NHS-funded', value: 'Free if assessed and approved', icon: '??' },
    { label: 'Private 28-day', value: 'Â£3,000â€“Â£12,000 all-inclusive', icon: '??' },
    { label: 'Programme length', value: '28, 60, or 90 days', icon: '??' },
    { label: 'Includes', value: 'Detox, therapy, group work, meals, accommodation', icon: '??' },
  ],
  bodyParagraphs: [
    'Residential rehab in [location] is the most intensive form of addiction treatment. Living at the facility means you are removed from the people, places, and patterns that trigger your use â€” creating the space for real change. A typical residential programme includes medically supervised detox (if physically dependent), individual therapy, group therapy, 12-step or SMART Recovery work, family sessions, and relapse prevention planning.',
    'NHS-funded residential rehab is available in [location] for those who have been assessed by a drug and alcohol team as requiring this level of intervention. The assessment process can take time â€” private residential rehab near [location] offers the same quality of care with immediate to same-week admission. Research consistently shows that 60â€“90 day residential programmes produce significantly better long-term outcomes than shorter programmes.',
  ],
  faqs: (location: string) => [
    { question: `What is residential rehab and how does it differ from outpatient?`, answer: `Residential rehab means living at the treatment facility for the duration of your programme. You receive round-the-clock support, structured therapy, and are fully removed from your usual triggers. Outpatient rehab means attending treatment sessions while continuing to live at home. Residential rehab is typically more intensive and produces better outcomes for people with severe addiction or those who have tried and relapsed from outpatient treatment.` },
    { question: `Is residential rehab free in ${location}?`, answer: `NHS-funded residential rehab in ${location} is available for those assessed as needing this level of care by a local drug and alcohol team. Access it by calling Frank (0300 123 6600) or referring through your GP. The NHS-funded route can involve waiting periods. Private residential rehab near ${location} is available immediately but at a cost of Â£3,000â€“Â£12,000 for a 28-day programme.` },
    { question: `How long is residential rehab?`, answer: `Residential rehab programmes typically run for 28 days (standard), 60 days, or 90 days. Research consistently shows that 60â€“90 day programmes produce significantly better long-term sobriety rates. The first 28 days often includes the detox phase â€” so a 28-day programme may provide limited time for psychological work.` },
    { question: `What does residential rehab include?`, answer: `A residential rehab programme in ${location} typically includes: medically supervised detox (if required), individual therapy (CBT, trauma-informed care, EMDR), group therapy, 12-step or SMART Recovery work, family therapy or family communication sessions, relapse prevention planning, nutritional support, fitness and wellness activities, and structured aftercare planning.` },
    { question: `Can I leave residential rehab early?`, answer: `In most private residential rehab programmes, you are there voluntarily and can technically leave at any time. However, leaving before completing the programme significantly reduces the chances of long-term recovery. NHS-funded residential rehab placements may have conditions attached. A professional intervention before leaving early should always be attempted.` },
    { question: `What is the success rate of residential rehab?`, answer: `Residential rehab produces better outcomes than community treatment alone, with 60â€“90 day programmes showing the highest completion and sobriety rates. Studies show around 30â€“50% of people completing residential rehab maintain abstinence at 1 year. Quality of aftercare is the single biggest predictor of long-term outcome after residential treatment.` },
  ],
  ctaLabel: 'Call Frank free: 0300 123 6600',
  ctaHref: 'tel:03001236600',
  secondaryCta: { label: 'Private rehab in [Location]', href: '/private-rehab/[location]' },
}

export const OUTPATIENT_REHAB_CONFIG: RehabTypeConfig = {
  slug: 'outpatient-rehab',
  name: 'Outpatient Rehab',
  tagline: 'Community-based and day programme addiction treatment',
  intro: 'Outpatient rehab in [location] provides structured addiction treatment while you continue to live at home â€” attending therapy sessions, group work, and clinical appointments without the need for residential admission. NHS community treatment in [location] is outpatient-based and completely free. Outpatient rehab suits those with a supportive home environment, milder dependency, work or caring responsibilities, or those transitioning from residential treatment.',
  keyFacts: [
    { label: 'NHS outpatient', value: 'Free â€” self-refer via Frank', icon: '??' },
    { label: 'Frequency', value: '1â€“5 sessions per week depending on intensity', icon: '??' },
    { label: 'IOP', value: 'Intensive outpatient: 3â€“5 days/week', icon: '??' },
    { label: 'Best for', value: 'Supportive home, mild-moderate dependency', icon: '??' },
  ],
  bodyParagraphs: [
    'Outpatient rehab in [location] ranges from standard community treatment (1â€“2 appointments per week) to intensive outpatient programmes (IOP) involving 3â€“5 days per week of structured therapy. NHS drug and alcohol services in [location] deliver community outpatient treatment free of charge, including keyworking, medication, CBT, group therapy, and harm reduction support.',
    'Outpatient rehab is appropriate for most people â€” it makes up the majority of all addiction treatment delivered in the UK. It is particularly effective when combined with medication (e.g. methadone, buprenorphine for opioids; acamprosate or naltrexone for alcohol) and social support. For people with severe dependency, a chaotic home environment, or previous failed outpatient treatment, residential rehab may be more appropriate.',
  ],
  faqs: (location: string) => [
    { question: `What is outpatient rehab?`, answer: `Outpatient rehab means receiving addiction treatment while living at home â€” attending sessions at a clinic, community centre, or NHS drug and alcohol service on a scheduled basis. This contrasts with residential (inpatient) rehab where you live at the treatment centre. Outpatient rehab can be as intensive as 5 days per week (IOP) or as light as a weekly keyworker appointment.` },
    { question: `Is outpatient rehab free in ${location}?`, answer: `Yes. NHS community drug and alcohol treatment in ${location} â€” which is outpatient-based â€” is completely free. This includes keyworking, medication, CBT, group therapy, and harm reduction. Call Frank (0300 123 6600) or your GP to self-refer to NHS outpatient services in ${location}.` },
    { question: `Is outpatient rehab effective?`, answer: `Outpatient rehab is very effective for most people, particularly when combined with medication-assisted treatment (MAT), a stable home environment, and active mutual aid participation (AA, NA, or SMART Recovery). Research shows outcomes are comparable to residential rehab for mild-to-moderate dependency when engagement is good.` },
    { question: `What is an Intensive Outpatient Programme (IOP)?`, answer: `An IOP is a structured outpatient programme typically running 3â€“5 days per week, providing a higher intensity of treatment than standard community appointments while allowing you to remain at home. IOPs are available through some NHS services and many private providers in ${location}.` },
    { question: `Who is outpatient rehab suitable for?`, answer: `Outpatient rehab is suitable for people who: have a stable, supportive home environment; have mild-to-moderate dependency; have work, family, or caring responsibilities that make residential treatment difficult; are transitioning from residential rehab into the community; or who have milder dependency that does not require residential detox.` },
    { question: `What is the difference between outpatient rehab and just seeing my GP?`, answer: `NHS drug and alcohol outpatient services in ${location} offer specialist addiction treatment beyond what GPs typically provide. This includes specialist prescribers (for methadone, buprenorphine, acamprosate), specialist addiction counsellors and CBT therapists, drug-specific group therapy, harm reduction services, and keyworkers who provide holistic case management.` },
  ],
  ctaLabel: 'Find outpatient services: 0300 123 6600',
  ctaHref: 'tel:03001236600',
  secondaryCta: { label: 'Residential rehab in [Location]', href: '/residential-rehab/[location]' },
}

export const HEROIN_DETOX_CONFIG: RehabTypeConfig = {
  slug: 'heroin-detox',
  name: 'Heroin Detox',
  tagline: 'Medically supervised heroin and opioid detoxification',
  intro: 'Heroin detox in [location] is the medically supervised process of withdrawing safely from heroin and other opioids. While heroin withdrawal is rarely directly fatal (unlike alcohol), it is severely uncomfortable and almost always leads to relapse without medical support. Free NHS heroin detox is available in [location] â€” including buprenorphine-assisted detox and lofexidine. Call Frank on 0300 123 6600 (free, 24/7) to access heroin detox services in [location] today.',
  keyFacts: [
    { label: 'Free NHS detox', value: 'Buprenorphine or lofexidine', icon: '??' },
    { label: 'Starts', value: '6â€“24 hours after last heroin use', icon: '??' },
    { label: 'Peak withdrawal', value: '36â€“72 hours', icon: '??' },
    { label: 'Duration', value: '7â€“14 days for acute withdrawal', icon: '??' },
  ],
  bodyParagraphs: [
    'Heroin withdrawal in [location] typically begins 6â€“24 hours after the last use and peaks at 36â€“72 hours. Symptoms include severe muscle cramps, nausea and vomiting, sweating, insomnia, anxiety, and intense cravings. While rarely directly fatal, untreated heroin withdrawal is so severely uncomfortable that it almost universally leads to relapse â€” usually at a lower tolerance level, dramatically increasing overdose risk.',
    'Medically supervised heroin detox in [location] uses buprenorphine (Subutex) or lofexidine to manage withdrawal symptoms. Buprenorphine is particularly effective as it directly addresses withdrawal by partially activating opioid receptors. After completing heroin detox in [location], ongoing treatment â€” either medication-assisted treatment (methadone or buprenorphine maintenance) or residential rehabilitation â€” is essential to prevent relapse and fatal overdose.',
  ],
  faqs: (location: string) => [
    { question: `What are heroin withdrawal symptoms?`, answer: `Heroin withdrawal symptoms include: muscle and bone pain, cramps, nausea and vomiting, diarrhoea, sweating, goosebumps ("cold turkey"), insomnia, anxiety, agitation, runny nose, dilated pupils, and intense cravings. Symptoms peak at 36â€“72 hours and the acute phase typically lasts 7â€“10 days, though psychological craving and sleep disruption can persist for months (PAWS).` },
    { question: `Is heroin detox free in ${location}?`, answer: `Yes. NHS heroin detox services in ${location} are completely free, including medication (buprenorphine, lofexidine) and clinical supervision. Call Frank (0300 123 6600) or your GP to self-refer. Same-day or next-day appointments are often available for people in crisis.` },
    { question: `What medication is used in heroin detox?`, answer: `The main medications used in heroin detox are: buprenorphine (Subutex) â€” a partial opioid agonist that reduces withdrawal symptoms significantly; lofexidine â€” reduces autonomic withdrawal symptoms like sweating and cramps without opioid effects; and methadone on a reducing dose. Your clinical team will advise which is most appropriate.` },
    { question: `Can I detox from heroin cold turkey?`, answer: `Technically possible but strongly inadvisable. Cold turkey heroin withdrawal is extremely painful and almost always leads to relapse. If relapse occurs at a lower tolerance (which it often does after even a few days of abstinence), the risk of fatal overdose is dramatically elevated. Medically supported detox is far safer and more likely to succeed.` },
    { question: `What is the risk of overdose after heroin detox?`, answer: `The period immediately after completing heroin detox is one of the highest-risk times for fatal overdose. Tolerance drops rapidly during detox â€” if someone relapses using their previous dose, it can easily be fatal. This is why ongoing treatment, naloxone carry, and relapse prevention planning are essential after heroin detox in ${location}.` },
    { question: `Should I choose methadone maintenance or heroin detox?`, answer: `Both are effective evidence-based treatments. Methadone maintenance (long-term prescribing) dramatically reduces heroin use, overdose deaths, and crime without the need for detox. Heroin detox followed by abstinence-based rehabilitation is an alternative. The right choice depends on your circumstances and goals. NHS services in ${location} will help you make an informed decision.` },
  ],
  ctaLabel: 'Call Frank now: 0300 123 6600',
  ctaHref: 'tel:03001236600',
  secondaryCta: { label: 'Heroin addiction help in [Location]', href: '/heroin-addiction/[location]' },
}

export const ALCOHOL_COUNSELLING_CONFIG: RehabTypeConfig = {
  slug: 'alcohol-counselling',
  name: 'Alcohol Counselling',
  tagline: 'One-to-one counselling and therapy for alcohol problems',
  intro: 'Alcohol counselling in [location] provides one-to-one psychological therapy for people with alcohol problems â€” from harmful drinking through to full alcohol dependency. Unlike rehab (which combines detox with group programmes), alcohol counselling focuses specifically on the psychological drivers of drinking through CBT, motivational interviewing, or psychodynamic therapy. Free alcohol counselling is available in [location] through NHS drug and alcohol services. Private alcohol counselling typically costs Â£50â€“Â£120 per session.',
  keyFacts: [
    { label: 'NHS counselling', value: 'Free through drug & alcohol services', icon: '??' },
    { label: 'BACP/UKCP', value: 'Register for accredited private counsellors', icon: '??' },
    { label: 'Cost (private)', value: 'Â£50â€“Â£120 per session', icon: '??' },
    { label: 'Approaches', value: 'CBT, motivational interviewing, psychodynamic', icon: '??' },
  ],
  bodyParagraphs: [
    'Alcohol counselling in [location] addresses the underlying psychological factors that drive drinking â€” anxiety, depression, trauma, relationship difficulties, workplace stress. The most evidence-based approaches are Cognitive Behavioural Therapy (CBT), which identifies and changes patterns of thinking that lead to drinking, and Motivational Interviewing (MI), which builds intrinsic motivation for change. Both are available free through NHS alcohol services in [location].',
    'If you are physically dependent on alcohol, counselling should follow or run alongside a medically supervised detox â€” it is not a replacement for it. For those with harmful or hazardous drinking (not full physical dependency), counselling alone can be highly effective. Your GP can refer you to NHS alcohol counselling in [location], or you can self-refer by calling Frank (0300 123 6600).',
  ],
  faqs: (location: string) => [
    { question: `Is alcohol counselling free in ${location}?`, answer: `Yes. NHS drug and alcohol services in ${location} offer free alcohol counselling as part of community treatment. This includes one-to-one keyworking, CBT, motivational interviewing, and group therapy. Self-refer via Frank (0300 123 6600) or ask your GP. Private alcohol counsellors typically charge Â£50â€“Â£120/session.` },
    { question: `How do I find a qualified alcohol counsellor in ${location}?`, answer: `For free alcohol counselling in ${location}, call Frank (0300 123 6600) to be connected with NHS services. For private counsellors, look for practitioners registered with BACP (British Association for Counselling and Psychotherapy) or UKCP with specific experience in addictions. Check the BACP Register at bacp.co.uk.` },
    { question: `What is the difference between alcohol counselling and alcohol rehab?`, answer: `Alcohol counselling is typically one-to-one therapy focusing on the psychological aspects of drinking. Alcohol rehab is a more intensive structured programme that usually combines detox (if needed), group work, individual therapy, and residential or intensive community support. Counselling can be a standalone treatment for non-dependent drinkers or a component of a broader rehab programme.` },
    { question: `How many sessions of alcohol counselling will I need?`, answer: `This varies significantly. Brief alcohol intervention (3â€“6 sessions) is effective for hazardous drinkers. CBT for alcohol use disorder typically runs 12â€“20 sessions. Longer-term psychotherapy for complex cases (trauma history, dual diagnosis) may continue for months or years. Your counsellor in ${location} will discuss an appropriate treatment plan at assessment.` },
    { question: `Can alcohol counselling help if I don't want to stop drinking completely?`, answer: `Yes. Alcohol counsellors in ${location} work with a range of goals â€” moderation, reduction, harm minimisation, and abstinence. Motivational interviewing is specifically designed to explore ambivalence without pressuring a particular outcome. Whether your goal is to reduce, moderate, or stop, counselling can help.` },
    { question: `Can I have alcohol counselling online?`, answer: `Yes. Online alcohol counselling (via video call) is increasingly available in ${location} through both NHS services and private counsellors. Many people find online counselling more accessible â€” particularly for those with work commitments, mobility issues, or where there are limited face-to-face options locally.` },
  ],
  ctaLabel: 'Find counselling: 0300 123 6600',
  ctaHref: 'tel:03001236600',
  secondaryCta: { label: 'Alcohol rehab in [Location]', href: '/alcohol-rehab/[location]' },
}

export const DRUG_COUNSELLING_CONFIG: RehabTypeConfig = {
  slug: 'drug-counselling',
  name: 'Drug Counselling',
  tagline: 'One-to-one therapy and counselling for drug addiction',
  intro: 'Drug counselling in [location] provides one-to-one psychological support for people affected by drug addiction â€” from cannabis and cocaine through to heroin and prescription drugs. Free drug counselling is available through NHS drug and alcohol services in [location] by self-referral. Sessions use evidence-based approaches including CBT, motivational interviewing, and trauma-informed therapy. Call Frank on 0300 123 6600 to access free drug counselling in [location] today.',
  keyFacts: [
    { label: 'Free NHS', value: 'Self-refer via Frank 0300 123 6600', icon: '??' },
    { label: 'CBT', value: 'Cognitive Behavioural Therapy â€” evidence-based', icon: '??' },
    { label: 'Private cost', value: 'Â£50â€“Â£120 per session', icon: '??' },
    { label: 'Covers', value: 'All substances â€” legal and illegal', icon: '??' },
  ],
  bodyParagraphs: [
    'Drug counselling in [location] helps people understand and change the thoughts, feelings, and situations that drive their drug use. Through CBT, counsellors work to identify thinking patterns and triggers, build coping strategies, manage cravings, address co-occurring mental health issues, and develop relapse prevention plans. Motivational interviewing helps people resolve ambivalence about change without pressure.',
    'NHS drug counselling in [location] is delivered as part of structured community drug treatment â€” usually alongside keyworking, medication if appropriate, and group support. Self-referral is available by calling Frank (0300 123 6600) or through your GP. Private drug counsellors â€” available independently of NHS services â€” typically specialise in addiction and offer more flexible appointment times.',
  ],
  faqs: (location: string) => [
    { question: `Is drug counselling free in ${location}?`, answer: `Yes. NHS drug treatment services in ${location} provide free drug counselling as part of community treatment. This includes one-to-one keyworking, CBT, motivational interviewing, and group therapy. Call Frank (0300 123 6600) to self-refer. Private drug counselling costs Â£50â€“Â£120 per session.` },
    { question: `What types of drug counselling are available in ${location}?`, answer: `Available approaches include: Cognitive Behavioural Therapy (CBT) â€” identifying and changing patterns that lead to use; Motivational Interviewing (MI) â€” building internal motivation for change; EMDR â€” for trauma underlying drug use; 12-step facilitation â€” supporting engagement with NA and other mutual aid; Contingency Management â€” positive reinforcement for abstinence.` },
    { question: `Does drug counselling work for heroin addiction?`, answer: `Drug counselling is most effective for heroin addiction when combined with medication-assisted treatment (methadone or buprenorphine). CBT and keyworking alongside MAT produce significantly better outcomes than either treatment alone. Standalone counselling without medication has lower retention and higher dropout rates for opioid addiction.` },
    { question: `Can drug counselling be done online in ${location}?`, answer: `Yes. Both NHS services and private practitioners offer online drug counselling via video call. NHS services in ${location} may offer telephone or video appointments. Online counselling can be particularly useful for people with transport difficulties, caring responsibilities, or those in rural areas around ${location}.` },
    { question: `How long does drug counselling take?`, answer: `CBT for drug addiction typically involves 12â€“20 structured weekly sessions. Brief interventions are 3â€“6 sessions. Complex cases with multiple substances or significant trauma history may benefit from longer-term therapy. NHS services offer time-limited interventions â€” private practitioners can offer longer-term work.` },
    { question: `I use cocaine â€” can I get counselling in ${location}?`, answer: `Yes. Drug counselling in ${location} covers all substances including cocaine, crack cocaine, MDMA, cannabis, ketamine, and all prescription drugs. There is no substance that disqualifies you from accessing counselling support. Cocaine Anonymous (CA) groups also provide peer support specifically for cocaine and crack users in ${location}.` },
  ],
  ctaLabel: 'Call Frank free: 0300 123 6600',
  ctaHref: 'tel:03001236600',
  secondaryCta: { label: 'Drug rehab in [Location]', href: '/drug-rehab/[location]' },
}

export const ANTIDEPRESSANT_ADDICTION_CONFIG: RehabTypeConfig = {
  slug: 'antidepressant-addiction',
  name: 'Antidepressant Dependency',
  tagline: 'Help for antidepressant dependency and discontinuation',
  intro: 'Antidepressant dependency and discontinuation syndrome affect millions of UK adults. While antidepressants (SSRIs, SNRIs, tricyclics) are not addictive in the traditional sense, stopping them abruptly or reducing too quickly can cause severe discontinuation symptoms â€” often mistaken for relapse of depression. Free support to taper antidepressants safely is available in [location] through your GP and specialist prescribing services.',
  keyFacts: [
    { label: 'Not addiction', value: 'Physical dependency â€” different from addiction', icon: '??' },
    { label: 'Discontinuation', value: 'Symptoms: dizziness, nausea, electric shocks', icon: '?' },
    { label: 'Safe tapering', value: 'Very slow dose reduction â€” weeks to months', icon: '??' },
    { label: 'Free help', value: 'GP, specialist prescribing, psychiatry', icon: '??' },
  ],
  bodyParagraphs: [
    'Antidepressant discontinuation syndrome occurs when antidepressants are reduced too rapidly. Symptoms include dizziness, nausea, "brain zaps" (electric shock sensations), flu-like symptoms, extreme irritability, insomnia, and emotional instability. These are physical withdrawal effects, not signs of returning depression, though distinguishing between the two requires clinical judgement. Paroxetine (Seroxat) and venlafaxine carry the highest discontinuation syndrome risk.',
    'Safe antidepressant tapering in [location] involves a very slow dose reduction â€” often over months rather than weeks, using liquid formulations or tablet cutting for tiny dose steps. NICE guidance recommends that tapering be led by the prescribing GP or psychiatrist and individualised to each patient. The Royal College of Psychiatrists provides detailed tapering guidance. If you are struggling to stop antidepressants in [location], speak to your GP or request specialist support.',
  ],
  faqs: (location: string) => [
    { question: `Am I addicted to antidepressants?`, answer: `Antidepressants do not cause addiction in the same way as drugs like heroin, cocaine, or alcohol. They do not cause drug-seeking behaviour, escalating tolerance, or the same dopamine-driven craving cycle. However, physical dependence does occur â€” the body adapts to the medication, and rapid reduction causes discontinuation symptoms. This is a physiological process, not a character failing.` },
    { question: `What are antidepressant withdrawal symptoms?`, answer: `Antidepressant discontinuation symptoms include: dizziness and vertigo, "brain zaps" (brief electric shock sensations), nausea and vomiting, flu-like symptoms, sweating, sleep disturbance, irritability and anxiety, and emotional detachment. Symptoms typically begin 2â€“4 days after stopping or significantly reducing the dose and can last weeks to months with paroxetine or venlafaxine.` },
    { question: `How do I safely stop taking antidepressants in ${location}?`, answer: `Speak to your GP in ${location} before reducing or stopping any antidepressant. Safe tapering involves very gradual dose reduction â€” often reducing by 10% of the current dose every 4 weeks, or even slower. Your GP may switch you to a liquid formulation of fluoxetine (which has a longer half-life, making tapering easier) before beginning reduction.` },
    { question: `What if my GP in ${location} won't help with antidepressant tapering?`, answer: `If your GP is not supporting your antidepressant tapering, ask for a referral to a psychiatrist or specialist prescribing service. The charity Withdrawal Mind offers peer support and information. NICE guidance (2022) specifically recognises that antidepressant withdrawal can be severe and prolonged, and the need for patient-led, supported tapering.` },
    { question: `Can I get therapy to help come off antidepressants?`, answer: `Yes. Psychological therapies â€” particularly CBT â€” can help address the underlying depression or anxiety that antidepressants were prescribed for, making it easier to reduce them safely. Ask your GP for a referral to IAPT (Improving Access to Psychological Therapies) services in ${location}, or access private CBT therapy.` },
    { question: `How long does antidepressant withdrawal last?`, answer: `For most antidepressants, discontinuation symptoms resolve within 1â€“4 weeks. However, for paroxetine (Seroxat) and venlafaxine, symptoms can persist for months in some individuals. Very slow tapering (using liquid formulations) significantly reduces the severity and duration of discontinuation symptoms.` },
  ],
  ctaLabel: 'Talk to Frank: 0300 123 6600',
  ctaHref: 'tel:03001236600',
  secondaryCta: { label: 'Dual diagnosis in [Location]', href: '/dual-diagnosis/[location]' },
}

export const INHALANT_ADDICTION_CONFIG: RehabTypeConfig = {
  slug: 'inhalant-addiction',
  name: 'Inhalant & Solvent Addiction',
  tagline: 'Help for volatile substance abuse (VSA)',
  intro: 'Inhalant and solvent addiction (volatile substance abuse, VSA) involves sniffing, huffing, or bagging volatile substances such as glue, butane lighter fluid, aerosols, petrol, and correction fluid. VSA is most common among young people but affects all ages. Sudden Sniffing Death Syndrome (SSDS) can cause fatal cardiac arrest on first use â€” VSA is extremely dangerous. Free support is available in [location] via Frank (0300 123 6600) and specialist drug services.',
  keyFacts: [
    { label: 'Risk', value: 'Sudden Sniffing Death Syndrome â€” first use can kill', icon: '??' },
    { label: 'Common substances', value: 'Butane, glue, aerosols, petrol, correction fluid', icon: '??' },
    { label: 'Most affected', value: 'Young people, but all ages', icon: '??' },
    { label: 'Frank (free)', value: '0300 123 6600 â€” 24/7 confidential', icon: '??' },
  ],
  bodyParagraphs: [
    'Volatile substance abuse (VSA) carries extreme risks. Sudden Sniffing Death Syndrome can cause fatal cardiac arrest even on first use â€” particularly with butane, aerosols, and other fluorinated hydrocarbons. Inhalants also cause hypoxia (oxygen deprivation to the brain), permanent neurological damage, liver and kidney damage, hearing loss, and loss of coordination. The risk of suffocation is significant, particularly when inhaling from a bag.',
    'Treatment for inhalant addiction in [location] combines psychological support (CBT, motivational interviewing) with harm reduction, family work, and addressing underlying factors (boredom, peer pressure, trauma, housing instability). NHS drug and alcohol services in [location] accept referrals for VSA and can provide specialist support. For young people, CAMHS (Child and Adolescent Mental Health Services) may also be involved.',
  ],
  faqs: (location: string) => [
    { question: `What is volatile substance abuse (VSA)?`, answer: `VSA involves deliberately inhaling chemical vapours to produce intoxication. Common substances include: butane lighter fluid, aerosol sprays (deodorant, hairspray), glue and solvents, petrol, paint thinner, correction fluid, and nitrous oxide (laughing gas â€” which has slightly different risks). VSA causes intense but brief intoxication and carries very high risks of sudden death.` },
    { question: `Why is inhalant use so dangerous?`, answer: `Inhalants are uniquely dangerous because of Sudden Sniffing Death Syndrome (SSDS) â€” a fatal cardiac arrhythmia that can occur on first use with no warning, particularly with butane and aerosols. Other risks include brain damage from oxygen deprivation, choking on vomit, suffocation from bags, and long-term damage to the brain, liver, kidneys, and hearing.` },
    { question: `How do I get help for inhalant addiction in ${location}?`, answer: `Call Frank (0300 123 6600, free, 24/7) to be connected with specialist drug services in ${location}. NHS drug and alcohol services accept referrals for VSA. For young people under 18, CAMHS, school-based counselling, and young people's drug services may be appropriate channels.` },
    { question: `Is inhalant addiction treatable?`, answer: `Yes. Treatment for inhalant addiction combines CBT (addressing triggers and cravings), harm reduction, family therapy, and addressing underlying social and psychological factors. There are no specific medications for inhalant addiction, unlike opioid or alcohol dependency. With the right support, recovery is possible.` },
    { question: `My child is sniffing solvents â€” what should I do?`, answer: `Stay calm and do not react with anger, which can drive the behaviour underground. Express concern from a place of care. Remove obvious inhalants from the home (aerosols, lighter fluid). Contact Frank (0300 123 6600) for specific advice for parents. Your GP can refer to CAMHS or young people's drug services in ${location}. Do not leave a young person alone if you suspect recent VSA use â€” cardiac risk is highest in the moments after inhaling.` },
    { question: `Is nitrous oxide (laughing gas) the same as inhalants?`, answer: `Nitrous oxide shares some characteristics with other inhalants (inhalation route, brief intoxication) but has a different risk profile. The main risks are oxygen deprivation, vitamin B12 deficiency (causing nerve damage with heavy long-term use), and falls. It does not carry the same Sudden Sniffing Death risk as butane or aerosols, but it is not safe.` },
  ],
  ctaLabel: 'Call Frank: 0300 123 6600',
  ctaHref: 'tel:03001236600',
  secondaryCta: { label: 'Drug treatment in [Location]', href: '/drug-treatment/[location]' },
}

export const AMPHETAMINE_ADDICTION_CONFIG: RehabTypeConfig = {
  slug: 'amphetamine-addiction',
  name: 'Amphetamine Addiction',
  tagline: 'Help for amphetamine (speed) addiction',
  intro: 'Amphetamine (speed) addiction is a stimulant dependency affecting thousands of UK adults. Amphetamine use causes intense euphoria, insomnia, paranoia, and cardiovascular strain â€” and regular use leads rapidly to psychological dependency and psychosis. Free NHS treatment for amphetamine addiction is available in [location] through self-referral. Call Frank on 0300 123 6600 (free, 24/7).',
  keyFacts: [
    { label: 'Street names', value: 'Speed, Billy, Whizz, Sulphate', icon: '??' },
    { label: 'Form', value: 'Powder, paste, tablets, capsules', icon: '??' },
    { label: 'Addiction type', value: 'Psychological dependency â€” no physical detox needed', icon: '??' },
    { label: 'Key risk', value: 'Amphetamine psychosis, cardiovascular collapse', icon: '??' },
  ],
  bodyParagraphs: [
    'Amphetamine addiction develops quickly because amphetamine causes a powerful dopamine release â€” significantly more intense and longer-lasting than natural rewards. Regular use leads to dopamine system depletion, making normal pleasures feel flat (anhedonia) and driving compulsive re-use. Amphetamine psychosis â€” paranoia, hallucinations, delusions â€” can occur with heavy use and often requires urgent psychiatric assessment.',
    'There are no medications specifically licensed for amphetamine addiction, making psychological treatment the primary approach. CBT and contingency management (positive reinforcement for abstinence) are the most evidence-based treatments for stimulant addiction. Free NHS treatment in [location] includes counselling, keyworking, group support, and harm reduction. Call Frank (0300 123 6600) to self-refer.',
  ],
  faqs: (location: string) => [
    { question: `Am I addicted to amphetamines?`, answer: `Signs of amphetamine addiction include: using more than intended, strong urges to use, continuing despite harm to health/relationships/work, withdrawal symptoms (extreme fatigue, depression, increased appetite) when stopping, and needing amphetamine to feel normal or function. If you recognise several of these, speaking to your GP or calling Frank (0300 123 6600) is the right next step.` },
    { question: `What are amphetamine withdrawal symptoms?`, answer: `Unlike heroin or alcohol, amphetamine does not cause dangerous physical withdrawal. However, psychological withdrawal can be severe: extreme fatigue and hypersomnia (sleeping for very long periods), intense depression, irritability, increased appetite, strong cravings, and cognitive impairment. Withdrawal symptoms peak at 2â€“4 days and resolve over 1â€“2 weeks, though depression and anhedonia can persist for months.` },
    { question: `Where can I get help for amphetamine addiction in ${location}?`, answer: `Free NHS treatment for amphetamine addiction in ${location} is available through drug and alcohol services. Self-refer by calling Frank (0300 123 6600, 24/7) or through your GP. Treatment includes CBT, motivational interviewing, keyworking, and group support. There are also Narcotics Anonymous (NA) meetings in ${location} specifically welcoming people recovering from stimulant addiction.` },
    { question: `What is amphetamine psychosis?`, answer: `Amphetamine psychosis is a severe mental health crisis caused by heavy amphetamine use. Symptoms include paranoid delusions (believing people are following you), hallucinations (seeing or hearing things that aren't there), extreme agitation, and disorganised thinking. It can be indistinguishable from schizophrenia in the acute phase. If you or someone you know experiences these symptoms after amphetamine use, call 999 immediately.` },
    { question: `Is speed (amphetamine) the same as crystal meth?`, answer: `No, though they are related. Amphetamine (speed) and methamphetamine (crystal meth) are both stimulants in the amphetamine family but methamphetamine is significantly more potent and more rapidly addictive. Speed is typically lower purity amphetamine sulphate sold as a powder or paste. The addiction profile is similar but crystal meth typically produces faster and more severe dependency.` },
    { question: `Can I use anything to help amphetamine withdrawal?`, answer: `There are no medications specifically licensed for amphetamine withdrawal in the UK. Your GP can prescribe medications to manage specific symptoms: sleep aids for insomnia, antidepressants if severe depression persists, and antipsychotics if psychosis has been present. Ensuring good sleep, nutrition, and hydration during withdrawal is important.` },
  ],
  ctaLabel: 'Call Frank free: 0300 123 6600',
  ctaHref: 'tel:03001236600',
  secondaryCta: { label: 'Drug treatment in [Location]', href: '/drug-treatment/[location]' },
}

export const MDMA_ADDICTION_CONFIG: RehabTypeConfig = {
  slug: 'mdma-ecstasy-addiction',
  name: 'MDMA & Ecstasy Addiction',
  tagline: 'Help for MDMA, ecstasy and MD dependency',
  intro: 'MDMA (ecstasy, MD, pills) addiction affects thousands of UK adults â€” particularly those in music festival and nightclub cultures. While MDMA is less addictive than heroin or crack, psychological dependency, compulsive use, and severe mental health consequences are common with regular use. Free support for MDMA addiction is available in [location] through NHS drug services. Call Frank on 0300 123 6600 (free, 24/7).',
  keyFacts: [
    { label: 'Street names', value: 'Ecstasy, MDMA, MD, pills, molly, mandy', icon: '??' },
    { label: 'Overdose risk', value: 'Hyperthermia, hyponatraemia, cardiac arrest', icon: '??' },
    { label: 'Mental health', value: 'Depression, anxiety, psychosis â€” including after stopping', icon: '??' },
    { label: 'Frank (free)', value: '0300 123 6600', icon: '??' },
  ],
  bodyParagraphs: [
    'Regular MDMA use causes significant serotonin system damage, leading to chronic depression, anxiety (including panic disorder), emotional blunting, memory impairment, and sleep disorders â€” often described as the "comedown" in the short term and "MDMA blues" in the longer term. Post-ecstasy depression can be severe and persistent, sometimes lasting weeks or months after stopping. Some people develop depersonalisation or psychosis.',
    'Treatment for MDMA dependency in [location] is primarily psychological â€” CBT, relapse prevention, and addressing co-occurring mental health conditions. MDMA does not produce physical withdrawal in the same way as opioids or alcohol, so no detox medication is required. However, the psychological withdrawal (depression, anhedonia, intense cravings particularly in nightlife settings) benefits significantly from structured counselling and peer support.',
  ],
  faqs: (location: string) => [
    { question: `Is MDMA addictive?`, answer: `MDMA is less addictive than heroin, crack, or alcohol in terms of physical dependency. However, psychological addiction is very common â€” particularly among heavy or frequent users, those in nightlife scenes, or those who use MDMA to manage social anxiety, depression, or trauma. The intense positive emotional experiences MDMA produces can trigger compulsive re-use.` },
    { question: `What are the mental health effects of regular MDMA use?`, answer: `Regular MDMA use causes lasting serotonin system damage, resulting in: chronic depression (often severe), anxiety and panic attacks, emotional numbness or blunting, memory and concentration problems, insomnia, and in some cases psychosis or depersonalisation. These effects are dose-dependent and worsen significantly with frequent use.` },
    { question: `Where can I get help for MDMA addiction in ${location}?`, answer: `Call Frank (0300 123 6600, free, 24/7) to self-refer to NHS drug treatment services in ${location}. NHS drug services treat MDMA dependency through CBT, motivational interviewing, and dual diagnosis support for co-occurring mental health conditions. SMART Recovery meetings welcoming MDMA users are available across ${location}.` },
    { question: `How do I deal with MDMA comedowns?`, answer: `MDMA comedowns (the depression following MDMA use) are caused by serotonin depletion. In the short term: rest, hydration, nutritious food, gentle exercise, and avoiding re-dosing. Some people find supplements (5-HTP, taken 24+ hours after last MDMA use) helpful for serotonin recovery. The only reliable way to prevent comedowns is to stop or significantly reduce MDMA use.` },
    { question: `Can MDMA cause permanent brain damage?`, answer: `Research indicates that frequent heavy MDMA use can cause lasting changes to serotonin transporter function, which may contribute to lasting depression, anxiety, and cognitive difficulties. The extent depends on frequency, dose, purity, and individual vulnerability. Most evidence suggests improvements after extended abstinence, though some effects may be permanent in very heavy users.` },
    { question: `Is it dangerous to take MDMA once a week?`, answer: `MDMA experts typically recommend leaving at least 3 months between uses to allow serotonin system recovery ("3 months per use" rule). Weekly use is considered high-risk for both progressive mental health damage and dependency. If you cannot observe harm reduction intervals, this suggests dependency may already be developing.` },
  ],
  ctaLabel: 'Call Frank free: 0300 123 6600',
  ctaHref: 'tel:03001236600',
  secondaryCta: { label: 'Drug treatment in [Location]', href: '/drug-treatment/[location]' },
}

export const PAINKILLER_ADDICTION_CONFIG: RehabTypeConfig = {
  slug: 'painkiller-addiction',
  name: 'Painkiller Addiction',
  tagline: 'Help for prescription and OTC opioid painkiller dependency',
  intro: 'Painkiller addiction affects hundreds of thousands of UK adults â€” both to prescribed opioids (codeine, tramadol, oxycodone, morphine) and over-the-counter products containing codeine (co-codamol, Nurofen Plus, Solpadeine). Physical dependency can develop within weeks of regular painkiller use. Free NHS treatment for painkiller addiction in [location] is available without a referral. Call Frank on 0300 123 6600 (free, 24/7) â€” there is no shame in asking for help.',
  keyFacts: [
    { label: 'UK scale', value: '500,000+ estimated dependent on prescription opioids', icon: '??' },
    { label: 'Common sources', value: 'Codeine, tramadol, co-codamol, Nurofen Plus', icon: '??' },
    { label: 'NHS treatment', value: 'Free â€” including detox and prescribing', icon: '??' },
    { label: 'Dependency time', value: 'Can develop in as little as 4 weeks', icon: '??' },
  ],
  bodyParagraphs: [
    'Painkiller addiction often begins with a legitimate prescription or OTC purchase for genuine pain. Tolerance develops rapidly â€” you need more to get the same relief. Physical dependency follows â€” stopping causes withdrawal symptoms (sweating, cramps, nausea, insomnia, anxiety) that feel like severe flu. Many people continue taking painkillers to avoid withdrawal rather than for pain, and may not recognise this as addiction.',
    'NHS treatment for painkiller addiction in [location] is free, confidential, and available without a GP referral. Treatment includes medication-assisted tapering (a supervised reducing dose of codeine or buprenorphine), one-to-one counselling, management of any underlying chronic pain, and relapse prevention. Call Frank (0300 123 6600) to self-refer to opioid treatment services in [location]. There is no need to be buying drugs on the street â€” people dependent on prescribed or OTC medications are just as deserving of help.',
  ],
  faqs: (location: string) => [
    { question: `Am I addicted to painkillers?`, answer: `Signs of painkiller addiction include: taking more than the prescribed or recommended dose, taking painkillers when you are not in pain, taking them first thing in the morning, needing them to feel normal, feeling anxious when your supply is running low, visiting multiple pharmacies or doctors for prescriptions, and experiencing withdrawal symptoms when you try to stop.` },
    { question: `Is painkiller addiction treated differently from heroin addiction?`, answer: `The treatment is essentially the same, because the drugs work on the same opioid receptors. NHS opioid treatment services in ${location} treat dependency on all opioids â€” prescribed codeine, tramadol, and oxycodone are treated identically to heroin dependency. Buprenorphine or methadone maintenance, supervised tapering, and CBT are all evidence-based options.` },
    { question: `Can I get NHS help for codeine or tramadol addiction in ${location}?`, answer: `Yes. NHS drug treatment services in ${location} treat dependency on all opioids including codeine, co-codamol, Nurofen Plus, tramadol, oxycodone, and morphine. Treatment is free and confidential. Self-refer by calling Frank (0300 123 6600) â€” you do not need a GP referral, though involving your GP is also recommended.` },
    { question: `How do I safely stop taking painkillers?`, answer: `Never stop opioid painkillers suddenly if you have been taking them regularly for more than a few weeks â€” the withdrawal is medically manageable with support but very unpleasant without it. NHS services in ${location} can prescribe a supervised reducing dose or buprenorphine to manage withdrawal safely. Call Frank (0300 123 6600) or your GP to begin the process.` },
    { question: `I buy codeine products over the counter â€” do I have a problem?`, answer: `If you regularly buy codeine-containing OTC products (co-codamol, Nurofen Plus, Solpadeine Max) from pharmacies and are taking them beyond the recommended dose or duration, you may have developed physical dependency. This is very common and not a moral failing. NHS services treat OTC codeine dependency exactly as other opioid dependency â€” help is free and confidential.` },
    { question: `Does painkiller addiction affect chronic pain?`, answer: `Often yes â€” this is one of the most complex aspects of painkiller dependency. Opioids can actually worsen pain sensitivity over time (opioid-induced hyperalgesia). NHS pain services and drug treatment services in ${location} work together to address both chronic pain management and opioid dependency. There are effective non-opioid approaches to chronic pain that can be explored.` },
  ],
  ctaLabel: 'Call Frank free: 0300 123 6600',
  ctaHref: 'tel:03001236600',
  secondaryCta: { label: 'Opiate addiction help in [Location]', href: '/opiate-addiction/[location]' },
}

export const SLEEPING_PILL_ADDICTION_CONFIG: RehabTypeConfig = {
  slug: 'sleeping-pill-addiction',
  name: 'Sleeping Pill Addiction',
  tagline: 'Help for Z-drug and sleeping pill dependency',
  intro: 'Sleeping pill addiction and dependency affects hundreds of thousands of UK adults, primarily from Z-drugs (zopiclone, zolpidem) and benzodiazepines prescribed for insomnia. Physical dependency can develop within as little as 2â€“4 weeks of nightly use. Stopping sleeping pills suddenly can cause severe withdrawal including seizures. Free NHS support for sleeping pill dependency is available in [location]. Call Frank on 0300 123 6600 or speak to your GP.',
  keyFacts: [
    { label: 'Common pills', value: 'Zopiclone, zolpidem (Z-drugs), temazepam', icon: '??' },
    { label: 'Dependency', value: 'Can develop within 2â€“4 weeks', icon: '?' },
    { label: 'Withdrawal risk', value: 'Seizures â€” never stop suddenly', icon: '??' },
    { label: 'Free NHS help', value: 'GP, prescribing services, CBT-I', icon: '??' },
  ],
  bodyParagraphs: [
    'Zopiclone and zolpidem (Z-drugs) were developed as safer alternatives to benzodiazepines for insomnia but carry similar dependency risks with prolonged use. After 2â€“4 weeks of nightly use, the brain adapts and natural sleep mechanisms are disrupted â€” stopping causes severe rebound insomnia and withdrawal symptoms including anxiety, sweating, tremors, and in severe cases, seizures. This makes stopping very difficult without support.',
    'Safe management of sleeping pill dependency in [location] involves a very gradual dose reduction â€” usually by converting to an equivalent dose of diazepam and then reducing over weeks to months. The single most effective long-term treatment for insomnia is CBTI (Cognitive Behavioural Therapy for Insomnia), which produces better long-term results than medication without the risk of dependency. Ask your GP to refer you to CBTI services in [location].',
  ],
  faqs: (location: string) => [
    { question: `Am I addicted to sleeping pills?`, answer: `If you have been taking sleeping pills most nights for more than 4 weeks, you are likely physically dependent â€” meaning your body now needs them to sleep, not just to sleep better. Signs include: inability to sleep without them, anxiety in the evening before taking them, taking them earlier or in higher doses than prescribed, and feeling physically unwell when you miss a dose.` },
    { question: `Is it dangerous to stop sleeping pills suddenly?`, answer: `Yes. Stopping Z-drugs (zopiclone, zolpidem) or benzodiazepines suddenly after prolonged use can cause severe rebound insomnia, severe anxiety, tremors, sweating, and in serious cases, seizures. Always speak to your GP before reducing or stopping sleeping pills. A very gradual supervised reduction is far safer.` },
    { question: `How do I safely come off sleeping pills in ${location}?`, answer: `Speak to your GP in ${location} about a supervised tapering plan. This typically involves converting your current sleeping pill to an equivalent dose of diazepam (which has a longer half-life and is easier to taper), then reducing by 10% of the current dose every 2â€“4 weeks. The process can take 6â€“12 months for long-term users. NHS prescribing services can support this.` },
    { question: `What is CBT-I and does it work for insomnia?`, answer: `Cognitive Behavioural Therapy for Insomnia (CBT-I) is consistently the most effective long-term treatment for insomnia â€” outperforming sleeping pills in head-to-head trials. It involves sleep restriction therapy, stimulus control, relaxation techniques, and challenging anxious thoughts about sleep. Ask your GP for a referral in ${location}, or access self-guided CBT-I through the NHS Sleepio app (free via some NHS trusts).` },
    { question: `I've been prescribed zopiclone for years â€” what are my options?`, answer: `Long-term zopiclone use is now considered inappropriate prescribing under NICE guidance (you should not take zopiclone for more than 4 weeks). Your GP in ${location} should be working with you to reduce and stop it with a slow taper. If they are not providing support for this, ask specifically for a referral to a specialist prescribing service or addiction service.` },
    { question: `Will my insomnia return when I stop sleeping pills?`, answer: `Rebound insomnia is very common when stopping sleeping pills â€” the first 2â€“4 weeks after stopping typically involve worse sleep than before you started. This is temporary. With CBT-I support and sleep hygiene improvements, most people's sleep normalises within weeks to months. Many people sleep better in the long term without sleeping pills than they did on them.` },
  ],
  ctaLabel: 'Call Frank free: 0300 123 6600',
  ctaHref: 'tel:03001236600',
  secondaryCta: { label: 'Detox centres in [Location]', href: '/detox-centres/[location]' },
}

export const WOMENS_REHAB_CONFIG: RehabTypeConfig = {
  slug: 'womens-rehab',
  name: "Women's Rehab",
  tagline: 'Female-specific addiction treatment and women-only rehab',
  intro: "Women's rehab in [location] provides addiction treatment in an environment designed specifically for women â€” addressing the distinct patterns, trauma histories, and treatment needs that affect women with alcohol and drug problems. Women-only rehab removes some of the barriers that prevent women from engaging with mixed-gender services. Both NHS-funded and private women's rehab is available near [location]. Call Frank on 0300 123 6600 (free, 24/7).",
  keyFacts: [
    { label: "Women's services", value: "Women-only and mixed-gender options", icon: '??' },
    { label: 'Trauma-informed', value: 'Addresses domestic abuse, trauma, PTSD', icon: '???' },
    { label: 'NHS-funded', value: 'Available for those assessed as needing it', icon: '??' },
    { label: 'Children', value: 'Some residential services accept mothers with children', icon: '??' },
  ],
  bodyParagraphs: [
    "Women present to addiction services with different patterns from men: higher rates of trauma (including domestic violence and sexual abuse), faster progression from first use to dependency (telescoping), more co-occurring mental health diagnoses (depression, PTSD, eating disorders), and greater stigma barriers to accessing help. Women-only rehab in [location] creates a safer space for women to address these specific experiences without the dynamic of mixed-gender group settings.",
    "Some residential women's rehab services near [location] accept mothers with young children, allowing women to maintain their caring role while receiving residential treatment. NHS-funded women's rehab is available for women assessed by drug and alcohol services as requiring this level of intensive intervention. Call Frank (0300 123 6600) to find out what women's specific services exist in and around [location].",
  ],
  faqs: (location: string) => [
    { question: `Is there women-only rehab in ${location}?`, answer: `Women-only and women-specific rehab services are available near ${location}. NHS-funded women's rehab is available through the local drug and alcohol team. Call Frank (0300 123 6600) to identify women-specific services in your area, or ask your GP or local DAAT (Drug and Alcohol Action Team) to identify appropriate options.` },
    { question: `Do women experience addiction differently?`, answer: `Yes. Women often develop dependency faster (telescoping), are more likely to have co-occurring conditions such as depression, anxiety, eating disorders, and PTSD, are more likely to have experienced domestic violence or sexual trauma driving their use, and face greater social stigma â€” particularly as mothers â€” which is a significant barrier to help-seeking.` },
    { question: `Can I take my children with me to women's rehab?`, answer: `Some women's residential rehab units specifically accommodate mothers with young children. This is an important provision that allows mothers to access residential treatment without the harrowing decision of being separated from their children. Ask Frank (0300 123 6600) specifically about mother-and-child residential services near ${location}.` },
    { question: `Is it harder for women to get addiction treatment?`, answer: `Historically yes â€” women face greater stigma, are more likely to have childcare responsibilities preventing treatment access, and were historically underrepresented in addiction treatment research. NHS services in ${location} now have specific guidance on gender-responsive treatment and should be able to accommodate the specific needs of women. Use Frank (0300 123 6600) to navigate services.` },
    { question: `What therapies are used in women's rehab?`, answer: `Women's rehab programmes typically offer: trauma-informed CBT, EMDR (for PTSD and trauma), DBT (Dialectical Behaviour Therapy â€” particularly effective for emotional regulation in women with complex trauma), relapse prevention, 12-step or SMART Recovery, body image and eating disorder work, domestic abuse safety planning, and parenting support.` },
    { question: `My drinking increased after domestic abuse â€” is there specialist help?`, answer: `Yes. Many women's addiction services in ${location} work closely with domestic abuse services and provide integrated support for both. The relationship between domestic abuse and substance use is well recognised â€” some women drink or use drugs to cope with ongoing abuse, others to manage the PTSD aftermath. Specialist services can address both simultaneously.` },
  ],
  ctaLabel: 'Call Frank: 0300 123 6600',
  ctaHref: 'tel:03001236600',
  secondaryCta: { label: 'Residential rehab in [Location]', href: '/residential-rehab/[location]' },
}

export const TEEN_ADDICTION_CONFIG: RehabTypeConfig = {
  slug: 'teen-addiction',
  name: 'Teen & Young People Addiction Help',
  tagline: 'Specialist addiction support for young people under 25',
  intro: 'Teen and young people addiction services in [location] provide specialist drug and alcohol support for under-18s and young adults up to 25. Young people\'s substance misuse services are separate from adult services, use age-appropriate approaches, and involve families where appropriate. Free specialist support is available in [location] â€” call Frank on 0300 123 6600 or ask your GP for a referral to the local young people\'s service.',
  keyFacts: [
    { label: 'Under 18s', value: 'CAMHS and young people\'s drug services', icon: '??' },
    { label: '18â€“25', value: 'Young adult services â€” bridge between youth and adult', icon: '??' },
    { label: 'Family', value: 'Parents and carers included where appropriate', icon: '????????' },
    { label: 'Free', value: 'All young people\'s services are NHS-funded', icon: '??' },
  ],
  bodyParagraphs: [
    'Teen and young people\'s addiction services in [location] take a different approach from adult services â€” recognising that adolescent brain development makes young people more vulnerable to addiction and more likely to have experimental or exploratory patterns of use. Services work with the young person themselves, their family, their school, and other agencies involved in their life. Referrals can come from GP, school, CAMHS, social care, or self-referral.',
    'For parents concerned about a young person in [location], Frank (0300 123 6600) can advise on how to approach the conversation and what services are available. Young people\'s services in [location] use motivational approaches rather than confrontation, and confidentiality is maintained (with safeguarding exceptions). The goal is to reduce harm and support healthy development, not to label or stigmatise.',
  ],
  faqs: (location: string) => [
    { question: `My teenager is using drugs â€” what should I do?`, answer: `Stay calm and do not react with anger, which typically causes young people to stop communicating. Express concern from a place of love: "I\'ve noticed X and I\'m worried about you." Contact Frank (0300 123 6600) for advice on how to talk to a young person about drug use. You can also ask your GP to refer them to young people\'s drug services in ${location} â€” or they can self-refer.` },
    { question: `What services exist for young people with drug problems in ${location}?`, answer: `In ${location}, specialist young people\'s drug and alcohol services are available separately from adult services. For under-18s, referrals can go through CAMHS, the GP, school, or direct self-referral. For 18â€“25 year olds, young adult services bridge youth and adult provision. Call Frank (0300 123 6600) to find the specific young people\'s service in ${location}.` },
    { question: `At what age can a young person access drug services without their parents\' knowledge?`, answer: `In England, a young person who is assessed as Gillick competent (able to understand and consent to treatment) can access drug services confidentially without parental consent. This is typically from around age 13â€“14, though it depends on individual circumstances. Services will keep confidential unless there are specific safeguarding concerns.` },
    { question: `Is school-based drug support available in ${location}?`, answer: `Many secondary schools in ${location} have access to school-based counselling services and pastoral support for drug and alcohol issues. Some areas have dedicated school drug liaison workers. Ask the school\'s SENCO (Special Educational Needs Coordinator) or pastoral lead what support is available.` },
    { question: `My child is 15 and drinking every weekend â€” is this an addiction?`, answer: `Regular weekend drinking or drug use at 15 is a significant concern even if it doesn\'t meet strict addiction criteria. The adolescent brain is particularly vulnerable to harm from alcohol â€” even moderate amounts have more impact than on adult brains. Early intervention is much more effective than waiting. Young people\'s services in ${location} are skilled at working with exploratory and harmful use as well as dependency.` },
    { question: `Does addiction treatment for young people involve residential rehab?`, answer: `Residential addiction treatment for under-18s is rare and only used for very severe cases. The vast majority of young people\'s treatment in ${location} is community-based â€” outpatient keyworking, family therapy, school liaison, and group work. Residential options for young people do exist and are fully NHS-funded where clinically indicated.` },
  ],
  ctaLabel: 'Call Frank: 0300 123 6600',
  ctaHref: 'tel:03001236600',
  secondaryCta: { label: 'Drug treatment in [Location]', href: '/drug-treatment/[location]' },
}

export const WORKPLACE_ADDICTION_CONFIG: RehabTypeConfig = {
  slug: 'workplace-addiction',
  name: 'Workplace Addiction Support',
  tagline: 'Addiction help for employees and employers',
  intro: 'Workplace addiction affects an estimated 1 in 5 UK employees. Alcohol and drug problems cost UK employers an estimated Â£7.3 billion per year in lost productivity, sickness absence, and accidents. Free and confidential addiction support is available to employees in [location] through NHS services, EAPs (Employee Assistance Programmes), and occupational health. Employers in [location] have both a duty of care and a legal framework for managing substance misuse at work.',
  keyFacts: [
    { label: 'EAP', value: 'Employee Assistance Programme â€” usually free & confidential', icon: '??' },
    { label: 'Occupational health', value: 'Medical support staying in employment', icon: '??' },
    { label: 'Legal duty', value: 'Employers must manage fit-for-work, not punish addiction', icon: '??' },
    { label: 'NHS', value: 'Free treatment â€” you don\'t need to tell your employer', icon: '??' },
  ],
  bodyParagraphs: [
    'If your alcohol or drug use is affecting your work in [location], you have several options that do not require telling your employer. NHS drug and alcohol services in [location] are completely confidential â€” your employer has no right to know. Many employees access their employer\'s EAP (Employee Assistance Programme) for free, confidential up to 6 sessions of counselling and referral support. EAP access details are usually in your employment contract or HR intranet.',
    'Employers in [location] have a legal and ethical duty to support employees with addiction â€” not simply to dismiss them. The Equality Act 2010 may apply if addiction is linked to an underlying condition. Many employees who access support retain their employment and improve their performance significantly. If you are an employer concerned about a member of staff\'s substance use, occupational health referral is the appropriate first step.',
  ],
  faqs: (location: string) => [
    { question: `Will my employer find out if I get addiction treatment in ${location}?`, answer: `No. NHS drug and alcohol services in ${location} are completely confidential. Your GP records are also confidential. If you access your employer\'s EAP, sessions are typically confidential (the EAP provider reports only aggregate usage data to your employer, not individual details). You have no legal obligation to disclose addiction to your employer.` },
    { question: `Can I be sacked for having a drink or drug problem?`, answer: `It is more complex than a simple yes or no. Addiction may be considered a protected characteristic under the Equality Act 2010 (if linked to an underlying mental health condition). Employers must follow a fair process and usually make reasonable adjustments before dismissal. If you are facing disciplinary action related to substance use, seek advice from your union, ACAS, or an employment solicitor.` },
    { question: `What is an Employee Assistance Programme (EAP)?`, answer: `An EAP is a confidential benefit offered by many UK employers, providing free access to counselling, addiction referrals, legal advice, and financial guidance. EAP counselling for addiction typically offers 6â€“8 sessions. Check your employment contract or HR intranet for your EAP access number. If your employer doesn\'t offer an EAP, NHS services in ${location} are free and confidential.` },
    { question: `I work in a safety-critical role (driving, healthcare). What are my obligations?`, answer: `Safety-critical roles (HGV drivers, NHS staff, pilots, engineers) have additional obligations regarding fitness to work. If addiction is affecting your ability to perform your role safely, you have a legal and professional duty to report this. Seek advice from your occupational health service immediately. Many regulated professions have specific confidential support schemes (e.g. NHS Practitioner Health Programme) that can provide treatment while protecting your registration.` },
    { question: `As an employer, how do I approach a colleague I think has an addiction problem?`, answer: `Do not confront the individual about substance use directly â€” focus on performance and attendance issues you have observed. Consult HR and your occupational health provider first. An occupational health referral is usually the appropriate first step. Approach from a supportive rather than disciplinary angle where possible. The charity Adfam has specific resources for managers dealing with employee substance use.` },
    { question: `Can I get addiction treatment while still working?`, answer: `Yes. Most NHS drug and alcohol treatment in ${location} is outpatient-based and can be scheduled around work commitments â€” many services offer evening appointments. You do not need to take time off work (in most cases) to access community treatment. Private counselling can also be scheduled flexibly.` },
  ],
  ctaLabel: 'Call Frank: 0300 123 6600',
  ctaHref: 'tel:03001236600',
  secondaryCta: { label: 'Drug counselling in [Location]', href: '/drug-counselling/[location]' },
}

export const AFTERCARE_CONFIG: RehabTypeConfig = {
  slug: 'aftercare',
  name: 'Addiction Aftercare',
  tagline: 'Post-rehab support and relapse prevention',
  intro: 'Addiction aftercare in [location] is the structured support that follows completion of residential or intensive outpatient rehab. The quality of aftercare is the single biggest predictor of long-term recovery â€” without it, relapse rates after rehab are very high. Aftercare in [location] includes ongoing counselling, NA/AA meetings, relapse prevention planning, medication review, and peer support networks. Most NHS-funded rehab mandates an aftercare plan before discharge.',
  keyFacts: [
    { label: 'Most important factor', value: 'Quality of aftercare predicts long-term recovery', icon: '??' },
    { label: 'Typical duration', value: '12 months minimum post-discharge', icon: '??' },
    { label: 'Components', value: 'Counselling, meetings, medication, peer support', icon: '??' },
    { label: 'Free', value: 'NHS community aftercare is free', icon: '??' },
  ],
  bodyParagraphs: [
    'Research consistently shows that people who engage with structured aftercare following addiction treatment have significantly better long-term outcomes than those who do not. Aftercare in [location] typically includes: regular sessions with a keyworker or counsellor, ongoing medication (acamprosate, naltrexone, methadone, or buprenorphine), active participation in AA, NA, or SMART Recovery, and regular check-ins from a care coordinator. The first 90 days after leaving residential rehab are the highest-risk period for relapse.',
    'NHS outpatient services in [location] automatically provide a period of aftercare following residential treatment. If you are leaving private rehab, ensuring a good aftercare plan is in place before discharge is essential â€” ask your rehab centre to coordinate handover to NHS community services in [location]. Most reputable private rehab centres offer ongoing telephone or video aftercare sessions as part of their programme.',
  ],
  faqs: (location: string) => [
    { question: `What is included in addiction aftercare?`, answer: `Comprehensive addiction aftercare typically includes: regular counselling sessions (CBT, relapse prevention), ongoing medication review where applicable (acamprosate, naltrexone, methadone, buprenorphine), active attendance at mutual aid groups (AA, NA, SMART Recovery), care coordinator check-ins, employment and housing support where needed, and a documented relapse prevention plan.` },
    { question: `How long should aftercare last after rehab?`, answer: `Minimum 12 months of structured aftercare is recommended for most people following rehab. Recovery is longest in the first year â€” most relapses occur in the first 90 days after discharge. Many people continue some form of aftercare support (AA, counselling, medication) for years or indefinitely, which significantly protects long-term recovery.` },
    { question: `Is aftercare free in ${location}?`, answer: `Yes. NHS community aftercare in ${location} is free following completion of either NHS or private rehab. This includes ongoing keyworking, counselling, medication review, and care coordination. AA and NA meetings in ${location} are always free. SMART Recovery meetings are free. Private aftercare counselling costs Â£50â€“Â£120/session.` },
    { question: `What if I relapse after rehab?`, answer: `Relapse is common and should be met with compassion, not shame. Relapse does not erase the progress made in rehab â€” it is a data point about what additional support is needed. Contact your keyworker or call Frank (0300 123 6600) immediately if you relapse. Early re-engagement with treatment after relapse produces much better outcomes than waiting.` },
    { question: `My aftercare plan from my rehab is minimal â€” what can I do?`, answer: `Self-refer to NHS drug and alcohol services in ${location} (call Frank: 0300 123 6600) and request a comprehensive aftercare package. Attend local AA, NA, or SMART Recovery meetings â€” these are free and available every week. Consider private counselling if financially possible. Contact your rehab centre if they offer ongoing telephone aftercare support.` },
    { question: `What is HALT and why does it matter in aftercare?`, answer: `HALT stands for Hungry, Angry, Lonely, Tired â€” the four states that most commonly trigger relapse. Relapse prevention planning in ${location} focuses on recognising HALT states early and having concrete strategies for each. Simple self-monitoring against HALT daily is one of the most effective relapse prevention tools.` },
  ],
  ctaLabel: 'Call Frank: 0300 123 6600',
  ctaHref: 'tel:03001236600',
  secondaryCta: { label: 'Residential rehab in [Location]', href: '/residential-rehab/[location]' },
}

export const HARM_REDUCTION_CONFIG: RehabTypeConfig = {
  slug: 'harm-reduction',
  name: 'Harm Reduction Services',
  tagline: 'Needle exchanges, naloxone and safer drug use services',
  intro: 'Harm reduction services in [location] help people who use drugs to stay safer while they continue using â€” reducing the risk of overdose, blood-borne viruses, and other serious harms. Services include needle and syringe exchange, free naloxone, drug checking, safer use advice, vaccinations (Hepatitis B), HIV testing, and outreach. Harm reduction is a core component of the UK drug strategy and is available free across [location] without judgement and without requiring abstinence.',
  keyFacts: [
    { label: 'Needle exchange', value: 'Free sterile equipment â€” no registration required', icon: '??' },
    { label: 'Naloxone', value: 'Free overdose reversal â€” from exchanges and pharmacies', icon: '?' },
    { label: 'Hepatitis testing', value: 'Free BBV testing and vaccination', icon: '??' },
    { label: 'No judgement', value: 'No requirement to abstain or engage with treatment', icon: '??' },
  ],
  bodyParagraphs: [
    'Harm reduction services in [location] operate on the principle that reducing drug-related harm is a legitimate goal in itself â€” not a compromise or a consolation prize for failing to achieve abstinence. Needle and syringe programmes dramatically reduce HIV and Hepatitis C transmission. Take-Home Naloxone programmes save lives by putting overdose reversal medication directly in the hands of people most at risk. Drug checking services (where available) prevent deaths from unknowingly contaminanted substances.',
    'In [location], harm reduction services are typically provided by NHS drug and alcohol services, specialist outreach teams, and some community pharmacies. You do not need to be in treatment or want treatment to access harm reduction services. Many people\'s first contact with drug services in [location] is through harm reduction â€” and this often becomes a bridge into treatment when someone is ready.',
  ],
  faqs: (location: string) => [
    { question: `Where can I get free needles in ${location}?`, answer: `Free sterile needles and syringes are available from NHS needle exchange services in ${location}. Many community pharmacies also participate in needle exchange schemes. You do not need to register, give your name, or engage with treatment to access needle exchange. Call Frank (0300 123 6600) to find your nearest exchange point in ${location}.` },
    { question: `Where can I get free naloxone in ${location}?`, answer: `Naloxone (Narcan) is available free in ${location} from needle exchanges, some pharmacies (Take Home Naloxone scheme), and drug treatment services. Frank (0300 123 6600) can direct you to the nearest supply. Naloxone is legal to possess and use without a prescription under UK law.` },
    { question: `What is drug checking and where is it available?`, answer: `Drug checking services allow people to have substances tested for dangerous adulterants â€” including fentanyl, nitazenes, and other contaminants. Drug checking is available at some UK festivals and harm reduction services, though provision in ${location} varies. The Loop provides festival drug checking. Some NHS services offer point-of-care drug testing.` },
    { question: `Can I get free HIV and Hepatitis testing in ${location}?`, answer: `Yes. Free HIV and Hepatitis B and C testing is available through NHS harm reduction services in ${location}. Many services also offer Hepatitis B vaccination. This is available to all people who inject drugs regardless of whether they are in treatment.` },
    { question: `Does using harm reduction services mean I have to go into treatment?`, answer: `No. Harm reduction services in ${location} are available without any requirement to engage with treatment or to abstain from drug use. The philosophy is to reduce harm right now, wherever someone is in their relationship with drugs. Many people use harm reduction services for years without entering formal treatment â€” and that is a legitimate choice.` },
    { question: `What is the supervised injection/consumption room debate in the UK?`, answer: `Drug consumption rooms (DCRs) â€” where people can use drugs under supervision â€” are proven to reduce overdose deaths, cut ambulance callouts, and reduce public injecting without increasing drug use in the community. They operate in over 12 countries. The UK government has not yet legalised DCRs nationally; some cities including Glasgow have made strong public health cases for their introduction.` },
  ],
  ctaLabel: 'Frank: 0300 123 6600',
  ctaHref: 'tel:03001236600',
  secondaryCta: { label: 'Naloxone in [Location]', href: '/naloxone/[location]' },
}

export const OPIOID_SUBSTITUTION_CONFIG: RehabTypeConfig = {
  slug: 'opioid-substitution',
  name: 'Opioid Substitution Therapy',
  tagline: 'Methadone and buprenorphine treatment in the UK',
  intro: 'Opioid substitution therapy (OST) â€” prescribing methadone or buprenorphine to people dependent on heroin or other opioids â€” is the most evidence-based treatment for opioid addiction. OST in [location] is free on the NHS, dramatically reduces the risk of overdose death, eliminates the need to use street heroin, and gives people stability to address the rest of their lives. Self-refer by calling Frank on 0300 123 6600 (free, 24/7).',
  keyFacts: [
    { label: 'Methadone', value: 'Full opioid agonist â€” daily dispensing', icon: '??' },
    { label: 'Buprenorphine', value: 'Partial agonist â€” safer, can be prescribed by GPs', icon: '??' },
    { label: 'Cost', value: 'Completely free on the NHS', icon: '??' },
    { label: 'Evidence', value: 'Reduces overdose death risk by up to 50%', icon: '??' },
  ],
  bodyParagraphs: [
    'Opioid substitution therapy in [location] provides a prescribed, pharmaceutical-grade opioid to replace street heroin â€” eliminating the need to inject, removing exposure to unpredictable purity, and giving people daily contact with healthcare. Methadone is a long-acting opioid dispensed daily from a pharmacy. Buprenorphine (Subutex/Suboxone) is a partial opioid agonist with a lower overdose risk and can be prescribed takeaway doses more readily. Both are free on the NHS in [location].',
    'OST is not "just swapping one drug for another" â€” this is a harmful stigma. Methadone and buprenorphine work differently from street heroin: they provide stable, consistent blood levels without the cycle of intoxication and withdrawal that drives chaotic drug use. OST patients can work, parent, and build lives. Research consistently shows that OST reduces opioid-related deaths, HIV and Hepatitis C transmission, acquisitive crime, and drug-related hospital admissions.',
  ],
  faqs: (location: string) => [
    { question: `What is methadone and how does it help with heroin addiction?`, answer: `Methadone is a long-acting synthetic opioid that occupies opioid receptors, eliminating heroin withdrawal and craving without the peaks and crashes of heroin use. Daily methadone dispensing from a pharmacy provides stability and regular contact with healthcare. Research consistently shows methadone maintenance reduces opioid-related deaths by up to 50%, cuts heroin use, reduces crime, and improves social functioning.` },
    { question: `What is the difference between methadone and buprenorphine?`, answer: `Methadone is a full opioid agonist â€” it fully activates opioid receptors. Buprenorphine is a partial agonist â€” it partially activates receptors, giving a ceiling effect that significantly reduces overdose risk. Buprenorphine (Subutex, Suboxone) is increasingly preferred because of this safety advantage, and can be prescribed in takeaway doses by GPs more readily. Both are effective; the best choice depends on individual circumstances.` },
    { question: `Is methadone or buprenorphine available in ${location}?`, answer: `Yes. Both methadone and buprenorphine are available free on the NHS through drug treatment services in ${location}. Self-refer by calling Frank (0300 123 6600) or your GP. Treatment begins with assessment, followed by induction onto the appropriate medication at the right dose.` },
    { question: `Will being on methadone affect my employment or driving?`, answer: `Being on a stable dose of methadone or buprenorphine does not automatically disqualify you from working. For driving, DVLA guidance states that stable, prescribed opioid substitution therapy does not automatically revoke your licence â€” your GP or prescriber can provide supporting documentation. This is assessed on a case-by-case basis.` },
    { question: `Is OST a long-term treatment or can I stop?`, answer: `Research shows that long-term OST (years rather than months) produces the best outcomes. Stopping OST increases mortality risk significantly. Some people do successfully taper and stop over time â€” this should be done very gradually under medical supervision. The decision to reduce and stop should be led by the patient in partnership with their clinical team in ${location}.` },
    { question: `Is stigma around methadone a problem?`, answer: `Unfortunately, yes. People on methadone often face stigma in healthcare settings, from families, and from employers. This stigma is harmful and evidence-free. Methadone therapy saves lives. NHS services in ${location} should treat OST patients with the same respect as any other patient managing a long-term condition â€” if you experience stigmatising treatment, you have the right to complain and request a different prescriber.` },
  ],
  ctaLabel: 'Call Frank free: 0300 123 6600',
  ctaHref: 'tel:03001236600',
  secondaryCta: { label: 'Heroin addiction help in [Location]', href: '/heroin-addiction/[location]' },
}

export const ONLINE_REHAB_CONFIG: RehabTypeConfig = {
  slug: 'online-rehab',
  name: 'Online Rehab & Remote Treatment',
  tagline: 'Digital and video-based addiction treatment',
  intro: 'Online rehab and remote addiction treatment in [location] provides structured therapy, group support, and clinical management via video call, app, or telephone â€” without needing to attend a facility in person. Remote addiction treatment has grown significantly since 2020 and produces outcomes comparable to face-to-face work for many people. NHS drug and alcohol services in [location] now routinely offer telephone and video appointments. Private online rehab is also available.',
  keyFacts: [
    { label: 'NHS remote', value: 'Telephone and video appointments available', icon: '??' },
    { label: 'Private online', value: 'Fully structured video rehab programmes', icon: '??' },
    { label: 'Evidence', value: 'Comparable outcomes to in-person for many presentations', icon: '??' },
    { label: 'Accessibility', value: 'No transport, no waiting rooms, flexible hours', icon: '??' },
  ],
  bodyParagraphs: [
    'Online rehab in [location] removes barriers that prevent many people from accessing treatment â€” transport, childcare, work commitments, stigma around attending in-person services, and geographic distance from services. Video-based CBT for alcohol and drug problems has been extensively validated and produces equivalent outcomes to face-to-face delivery. Many people also find the distance of online therapy easier for discussing shame-laden topics.',
    'NHS services in [location] now offer telephone and video keyworker sessions, remote prescribing reviews, and in some areas online group therapy. Private online rehab programmes deliver full structured programmes via video â€” including daily or weekly group sessions, individual therapy, medication management, and digital peer support communities. Platforms such as Clinic Care and similar providers serve UK patients.',
  ],
  faqs: (location: string) => [
    { question: `Is online rehab as effective as in-person rehab?`, answer: `For many people, yes. Research consistently shows that CBT for addiction delivered via video is as effective as face-to-face delivery. Online treatment has particular advantages for those with transport difficulties, social anxiety, childcare responsibilities, or who live in rural areas. Those with severe dependency or complex needs may benefit from residential in-person treatment.` },
    { question: `Can I get online addiction treatment through the NHS in ${location}?`, answer: `Yes. NHS drug and alcohol services in ${location} offer telephone and video appointments for keyworking, counselling, and prescribing reviews. The availability of remote options varies by service â€” ask specifically when you contact them. Self-refer via Frank (0300 123 6600).` },
    { question: `What does private online rehab include?`, answer: `Private online rehab programmes typically include: initial assessment via video, individual therapy sessions (CBT, motivational interviewing), group therapy sessions (live, via video), digital peer support community, relapse prevention planning, and some programmes include medication management. Duration ranges from 4â€“12 weeks for structured programmes.` },
    { question: `Can I detox from alcohol at home with online rehab support?`, answer: `Online support can complement home detox, but medically supervised community detox must be accessed through NHS services in ${location} for physical alcohol dependency. A remote nurse or doctor can monitor you daily via video during community detox. Online therapy alone is not a substitute for the medical supervision and medication required during alcohol detox.` },
    { question: `What technology do I need for online rehab?`, answer: `A smartphone, tablet, or computer with a camera, microphone, and internet connection is all that is typically needed. Most platforms use standard video call software (Zoom, Teams, or proprietary platforms). For NHS services in ${location}, appointments may be by telephone rather than video if preferred.` },
    { question: `Is online rehab private and confidential?`, answer: `Yes. Online addiction treatment sessions are subject to the same confidentiality obligations as in-person sessions. End-to-end encrypted video platforms are used by reputable providers. Ensure you are in a private space for sessions. NHS records are subject to the same confidentiality rules as all other NHS health records.` },
  ],
  ctaLabel: 'Call Frank: 0300 123 6600',
  ctaHref: 'tel:03001236600',
  secondaryCta: { label: 'Outpatient rehab in [Location]', href: '/outpatient-rehab/[location]' },
}

export const RECOVERY_COACHING_CONFIG: RehabTypeConfig = {
  slug: 'recovery-coaching',
  name: 'Recovery Coaching',
  tagline: 'Peer-led recovery coaching and mentoring',
  intro: 'Recovery coaching in [location] provides practical, lived-experience-based support for people in early recovery from addiction. Unlike clinical treatment, recovery coaches are typically people in long-term recovery themselves â€” offering mentoring, practical life skills, accountability, and peer connection. Recovery coaching complements clinical treatment and is increasingly available through NHS services, charities, and private providers in [location].',
  keyFacts: [
    { label: 'Lived experience', value: 'Coaches are typically in long-term recovery', icon: '??' },
    { label: 'Complements', value: 'Works alongside clinical treatment â€” not instead of', icon: '??' },
    { label: 'Free options', value: 'SMART Recovery peer mentoring, charity-led coaching', icon: '??' },
    { label: 'Focus', value: 'Practical life skills, goal-setting, accountability', icon: '??' },
  ],
  bodyParagraphs: [
    'Recovery coaching in [location] differs from clinical counselling in that it is forward-focused and practical rather than therapeutic and retrospective. A recovery coach helps you identify goals, build practical life skills (budgeting, employment, relationships), stay accountable, navigate early recovery challenges, and connect with the recovery community. The coach\'s own lived experience of addiction and recovery is a core part of what makes the relationship powerful.',
    'Recovery coaching in [location] is available through: NHS recovery support services (some areas embed recovery coaches in drug and alcohol services), charities such as Turning Point and With You, SMART Recovery peer mentors, and private recovery coaches (typically Â£50â€“Â£100/hour). If your NHS service doesn\'t offer recovery coaching, ask about peer support workers â€” these are funded staff in long-term recovery who provide similar support.',
  ],
  faqs: (location: string) => [
    { question: `What is the difference between a recovery coach and a counsellor?`, answer: `A counsellor or therapist is a clinically trained professional who helps you understand and process the psychological roots of addiction through structured therapeutic techniques. A recovery coach is typically someone in long-term recovery themselves â€” they provide practical, peer-based support focused on navigating daily recovery challenges, building life skills, and setting goals. Both are valuable; they work best together.` },
    { question: `Is recovery coaching available free in ${location}?`, answer: `Free peer support and recovery coaching is available in ${location} through: NHS recovery support services (where they exist), Turning Point, With You, and other third-sector providers, SMART Recovery peer mentors, and AA/NA sponsors. Private recovery coaching typically costs Â£50â€“Â£100/hour. Call Frank (0300 123 6600) to find peer support services in ${location}.` },
    { question: `How do I find a recovery coach in ${location}?`, answer: `Contact local drug and alcohol charities in ${location} â€” many employ peer support workers with lived experience. SMART Recovery UK lists peer mentors. The Association for Coaching and UKCP maintain directories of accredited private coaches. Some NHS services in ${location} now embed peer support workers as part of their team.` },
    { question: `Does my recovery coach need to be sober?`, answer: `Recovery coaches are typically in sustained long-term recovery themselves â€” this lived experience is what makes the relationship distinctive. Most recovery coaching programmes require coaches to have a minimum period of sustained recovery (typically 2+ years). This is not a rule about worth â€” it is about the coach having had time to develop stable recovery practices to share.` },
    { question: `Can recovery coaching replace therapy?`, answer: `Recovery coaching is not a replacement for therapy, particularly for those with significant trauma, mental health conditions, or complex addiction histories. It is complementary â€” working alongside clinical treatment. For people in sustained recovery who have completed treatment, recovery coaching can be maintained as a standalone support.` },
    { question: `Can I become a recovery coach myself?`, answer: `Yes. Many people in long-term recovery train as recovery coaches, peer support workers, or addiction counsellors. Qualifications include NCFE Level 2/3 certificates in Drug and Alcohol Awareness, SMART Recovery facilitator training, ICF-accredited coaching qualifications, and the Level 4 Diploma in Addiction Counselling. Working in recovery support is a growing field.` },
  ],
  ctaLabel: 'Call Frank free: 0300 123 6600',
  ctaHref: 'tel:03001236600',
  secondaryCta: { label: 'Aftercare in [Location]', href: '/aftercare/[location]' },
}

export const NON_12_STEP_CONFIG: RehabTypeConfig = {
  slug: 'non-12-step-rehab',
  name: 'Non-12-Step Rehab',
  tagline: 'Secular, evidence-based rehab without AA or 12-step',
  intro: 'Non-12-step rehab in [location] provides addiction treatment that does not use the 12-step (AA/NA) model â€” instead using SMART Recovery, CBT, motivational interviewing, mindfulness-based approaches, and other evidence-based secular frameworks. 12-step programmes are not suitable for everyone â€” particularly those who prefer a non-spiritual, skills-based approach. Both NHS and private non-12-step rehab options are available in and around [location].',
  keyFacts: [
    { label: 'SMART Recovery', value: 'Evidence-based secular alternative to AA', icon: '??' },
    { label: 'CBT-based', value: 'Skills over steps â€” practical relapse prevention', icon: '??' },
    { label: 'NHS', value: 'Most NHS services are not 12-step based', icon: '??' },
    { label: 'Private', value: 'Many private rehabs offer non-12-step programmes', icon: '??' },
  ],
  bodyParagraphs: [
    'Non-12-step rehab in [location] uses evidence-based psychological approaches including CBT, motivational interviewing, dialectical behaviour therapy (DBT), mindfulness-based relapse prevention (MBRP), and contingency management. These approaches do not require belief in a higher power, surrendering control, or attending lifetime meetings. They focus on building practical skills to manage cravings, thoughts, and high-risk situations.',
    'The good news is that most NHS drug and alcohol treatment in [location] is already not 12-step based â€” it uses NICE-approved evidence-based approaches. For those leaving residential rehab who do not want AA or NA, SMART Recovery offers free, secular, evidence-based group support with meetings across [location] and online. Some private rehab centres in [location] specifically offer non-12-step programmes using CBT and mindfulness frameworks.',
  ],
  faqs: (location: string) => [
    { question: `Do I have to do AA or 12-step in rehab?`, answer: `No. Most NHS treatment in ${location} is not 12-step based. Many private rehab centres also offer non-12-step programmes or are flexible about participation in 12-step groups. When contacting rehab services, ask specifically about their approach if this is important to you.` },
    { question: `What is SMART Recovery and how does it differ from AA?`, answer: `SMART Recovery (Self-Management and Recovery Training) is a secular, evidence-based mutual aid programme using CBT and motivational techniques. Unlike AA, it does not involve surrendering, a higher power, or lifelong attendance as a requirement. It is time-limited, skills-based, and science-driven. Free SMART Recovery meetings in ${location} are available in person and online at smartrecovery.org.uk.` },
    { question: `Is non-12-step rehab as effective as 12-step?`, answer: `Research shows that both 12-step and non-12-step approaches produce good outcomes. The most important factor is engagement and fit for the individual â€” a treatment approach that matches a person\'s beliefs and preferences produces better engagement and therefore better outcomes. For people who are agnostic, atheist, or who prefer a skills-based approach, non-12-step programmes produce superior results.` },
    { question: `What are the alternatives to AA in ${location}?`, answer: `In ${location}, alternatives to AA include: SMART Recovery (secular, science-based weekly meetings), SOS (Secular Organizations for Sobriety), We Are With You (charity-based support), SMART Recovery online (for those who cannot attend in person), and ongoing CBT with a private therapist. Call Frank (0300 123 6600) to find secular recovery options in ${location}.` },
    { question: `Are there non-12-step rehab centres near ${location}?`, answer: `Yes. Several private rehab centres operate non-12-step or integrated (flexible) programmes. When searching for private rehab near ${location}, ask specifically about their model. Centres using cognitive therapy, mindfulness-based approaches, or SMART Recovery foundation are good indicators of a non-12-step approach.` },
    { question: `I tried AA and it didn\'t work for me â€” what else can I try?`, answer: `Not working with AA does not mean recovery is impossible â€” it means AA\'s specific approach wasn\'t the right fit. SMART Recovery is the most widely available secular alternative and has strong evidence behind it. Individual CBT therapy is highly effective. Ask your keyworker or GP in ${location} about SMART Recovery referral or evidence-based alternatives to mutual aid.` },
  ],
  ctaLabel: 'Call Frank: 0300 123 6600',
  ctaHref: 'tel:03001236600',
  secondaryCta: { label: 'Outpatient rehab in [Location]', href: '/outpatient-rehab/[location]' },
}

export const FAMILY_THERAPY_CONFIG: RehabTypeConfig = {
  slug: 'family-therapy',
  name: 'Family Therapy for Addiction',
  tagline: 'Therapy for families affected by addiction',
  intro: 'Family therapy for addiction in [location] addresses the impact of a family member\'s addiction on the whole family system â€” and helps families understand how their patterns of interaction can support or unhelpfully enable recovery. Addiction affects the whole family, not just the person using. Free family therapy and carer support is available in [location] through NHS services, Al-Anon, Adfam, and other organisations.',
  keyFacts: [
    { label: 'Who it helps', value: 'Partners, parents, siblings, children of people with addiction', icon: '????????' },
    { label: 'Al-Anon', value: 'Free peer support for families of alcoholics', icon: '??' },
    { label: 'Adfam', value: 'National charity for families affected by addiction', icon: '??' },
    { label: 'NHS DAAT', value: 'Family support workers in most drug services', icon: '??' },
  ],
  bodyParagraphs: [
    'Family therapy for addiction in [location] recognises that addiction does not occur in isolation â€” it shapes and is shaped by family relationships, communication patterns, and systemic dynamics. Therapeutic approaches include Systemic Family Therapy, Behavioural Couples Therapy (proven to significantly improve both relationship outcomes and addiction outcomes), and Multi-Family Therapy for more complex situations. Family members often develop their own stress responses â€” anxiety, depression, PTSD â€” that benefit from their own therapeutic support.',
    'Support for families in [location] is available through: NHS drug and alcohol services (most have dedicated family support workers), Al-Anon (free, for families of alcoholics) at al-anonuk.org.uk, Adfam (national charity, helpline and online resources) at adfam.org.uk, SMART Recovery family and friends programme, and private family therapists at Â£80â€“Â£150/session. You do not need to wait for the person with addiction to want help before accessing support for yourself.',
  ],
  faqs: (location: string) => [
    { question: `Can I access support for myself as a family member, even if my loved one won\'t get help?`, answer: `Yes, absolutely. Al-Anon, Adfam, and NHS family support services in ${location} all provide support for family members regardless of whether the person with addiction is in treatment. You have your own needs and are entitled to support. Al-Anon is specifically designed for this â€” meetings focus on helping you live well regardless of the choices your loved one makes.` },
    { question: `What is Al-Anon and how is it different from AA?`, answer: `AA (Alcoholics Anonymous) is for people with alcohol problems. Al-Anon is a separate organisation for the families and friends of people with alcohol problems â€” using similar 12-step principles but focusing on the health and wellbeing of the family member, not the person drinking. Al-Anon meetings in ${location} are free and confidential. Find meetings at al-anonuk.org.uk.` },
    { question: `What is Adfam?`, answer: `Adfam is a national UK charity that supports families affected by drug and alcohol use. They provide a website (adfam.org.uk) with information, local service finder, and online forum for families. They also support and fund local family support groups across the UK. Adfam does not operate a direct helpline but their website has comprehensive guidance.` },
    { question: `Is Behavioural Couples Therapy effective for addiction?`, answer: `Yes â€” Behavioural Couples Therapy (BCT) is the most evidence-based couples intervention for addiction. Research shows BCT significantly outperforms individual therapy for both addiction outcomes and relationship satisfaction. Both partners attend together and work on communication, relationship skills, and a sobriety contract. Ask your NHS service or a private therapist in ${location} about BCT.` },
    { question: `How do I talk to my children about a parent\'s addiction?`, answer: `Age-appropriate honesty is generally better than secrecy. The charity Nacoa (National Association for Children of Alcoholics) provides specific guidance for children and parents navigating this. Key messages for children: it is not your fault; you cannot fix it; you are loved; it is okay to talk about it. Nacoa helpline: 0800 358 3456 (free).` },
    { question: `What is codependency and how does it relate to family therapy?`, answer: `Codependency describes a pattern where a family member\'s emotional wellbeing becomes excessively focused on the person with addiction â€” managing their crises, covering up consequences, and neglecting their own needs. While controversial as a clinical term, the pattern it describes is real and common. Family therapy in ${location} addresses these dynamics in a non-blaming way.` },
  ],
  ctaLabel: 'Call Frank: 0300 123 6600',
  ctaHref: 'tel:03001236600',
  secondaryCta: { label: 'Al-Anon meetings in [Location]', href: '/al-anon/[location]' },
}

export const EATING_DISORDER_ADDICTION_CONFIG: RehabTypeConfig = {
  slug: 'eating-disorder-addiction',
  name: 'Eating Disorder & Addiction',
  tagline: 'Co-occurring eating disorders and substance use treatment',
  intro: 'Eating disorders and substance addiction frequently co-occur â€” an estimated 30â€“50% of people with eating disorders also have substance use problems. Alcohol, stimulants, and diet pills are most commonly misused. This dual presentation requires specialist integrated treatment that addresses both conditions simultaneously. Specialist eating disorder and addiction services are available in and around [location] â€” call Frank (0300 123 6600) or speak to your GP for a referral.',
  keyFacts: [
    { label: 'Co-occurrence', value: '30â€“50% of people with eating disorders also have SUD', icon: '??' },
    { label: 'Most common', value: 'Alcohol, stimulants (appetite suppressants), laxatives', icon: '??' },
    { label: 'Treatment', value: 'Must address both â€” sequential treatment often fails', icon: '??' },
    { label: 'Specialist services', value: 'BEAT-affiliated services and dual diagnosis teams', icon: '??' },
  ],
  bodyParagraphs: [
    'The overlap between eating disorders and addiction is significant. Restriction eating disorders (anorexia) are associated with stimulant misuse to suppress appetite. Binge-purge presentations (bulimia) often co-occur with alcohol misuse. Many people use substances to manage the anxiety, depression, and body image distress that drive eating disorder behaviours. Treating one condition without the other rarely works â€” integrated treatment is essential.',
    'Integrated eating disorder and addiction treatment in [location] requires close coordination between eating disorder services (usually CAMHS or adult eating disorder teams) and drug and alcohol services. BEAT (the UK eating disorders charity) can help navigate available services. If you or someone you know has both presentations in [location], ask your GP specifically for a referral that addresses both â€” eating disorder services alone will often not address the substance use, and vice versa.',
  ],
  faqs: (location: string) => [
    { question: `Why do eating disorders and addiction often occur together?`, answer: `Both eating disorders and addiction involve loss of control around a behaviour or substance, are driven by underlying emotional distress and trauma, are associated with depression and anxiety, and produce similar neurobiological changes in reward circuitry. Substances are often used to manage the distress that drives eating disorder behaviours â€” particularly alcohol to manage anxiety and stimulants to suppress appetite.` },
    { question: `Where can I get help for both an eating disorder and addiction in ${location}?`, answer: `Ask your GP in ${location} for a referral that specifically addresses both presentations simultaneously. BEAT (the eating disorders charity) operates a helpline at 0808 801 0677 and can advise on integrated services. Frank (0300 123 6600) can advise on addiction services that have experience with eating disorder co-occurrence.` },
    { question: `Will addiction treatment address my eating disorder?`, answer: `Standard addiction treatment may not specifically address eating disorder presentations. It is important to flag your eating disorder to your drug and alcohol keyworker in ${location} so they can ensure appropriate referrals or consultation with eating disorder services. Ideally, both conditions should be treated concurrently by services in communication with each other.` },
    { question: `I use alcohol to cope with my body image anxiety â€” is this addiction?`, answer: `Using alcohol regularly to manage the anxiety, distress, or dissociation associated with body image concerns or eating disorder behaviours is a significant concern. Whether it meets clinical criteria for addiction depends on various factors â€” but the pattern of using alcohol to cope with emotional pain related to eating and body image warrants both addiction and eating disorder assessment.` },
    { question: `Can eating disorder medication affect addiction recovery?`, answer: `Some medications used in eating disorder treatment have interactions with addiction presentations â€” for example, antidepressants may have variable effects in the context of substance use. A specialist prescriber in ${location} who is aware of both presentations is essential. Ensure all treating clinicians are kept informed of all medications and supplements being used.` },
    { question: `I purge using laxatives and alcohol â€” is this covered by addiction services?`, answer: `Laxative misuse alongside alcohol use would typically involve both eating disorder services and addiction services in ${location}. Both presentations should be reported to your GP. Eating disorder services address laxative misuse; addiction services address alcohol use. An integrated approach or care coordinator who links both services is ideal.` },
  ],
  ctaLabel: 'Call Frank free: 0300 123 6600',
  ctaHref: 'tel:03001236600',
  secondaryCta: { label: 'Dual diagnosis in [Location]', href: '/dual-diagnosis/[location]' },
}

export const ABSTINENCE_REHAB_CONFIG: RehabTypeConfig = {
  slug: 'abstinence-based-rehab',
  name: 'Abstinence-Based Rehab',
  tagline: 'Complete abstinence-focused addiction rehabilitation',
  intro: 'Abstinence-based rehab in [location] focuses on complete abstinence from all mood-altering substances as the goal of treatment. In contrast to harm reduction or moderation approaches, abstinence-based programmes work towards a life free from all substances. Many residential rehab centres, 12-step programmes, and some NHS pathways are abstinence-based. This approach is particularly recommended for those with severe or long-standing dependency or multiple previous relapses.',
  keyFacts: [
    { label: 'Definition', value: 'Complete abstinence â€” no alcohol or drugs', icon: '??' },
    { label: '12-step', value: 'AA, NA, CA â€” all abstinence-based', icon: '??' },
    { label: 'Best for', value: 'Severe dependency, multiple relapses, those who want to stop completely', icon: '?' },
    { label: 'SMART Recovery', value: 'Also available for abstinence goals', icon: '??' },
  ],
  bodyParagraphs: [
    'Abstinence-based rehab in [location] takes the position that for many people with severe addiction, sustained recovery requires complete abstinence rather than managed use. This is supported by neuroscience â€” for those with significant neurological changes from addiction, even one drink or use episode frequently triggers the full return of compulsive use (often called the "craving cycle" or "phenomenon of craving"). Residential rehab in [location] is typically abstinence-based.',
    'Abstinence-based approaches are not the only valid approach â€” for opioid users, medication-assisted treatment (methadone or buprenorphine) may involve indefinite prescribing without abstinence from the prescribed medication. For alcohol drinkers with less severe dependency, moderation goals may be achievable. The right approach depends on individual circumstances, severity, and preference â€” and your clinical team in [location] will help you assess this honestly.',
  ],
  faqs: (location: string) => [
    { question: `Is abstinence the only route to recovery?`, answer: `No. Recovery looks different for different people. For opioid users, long-term opioid substitution therapy is an evidence-based form of recovery. For some drinkers with less severe dependency, managed moderation is achievable. However, for many people with severe or long-standing addiction â€” particularly alcohol and stimulants â€” complete abstinence produces the most stable long-term outcomes.` },
    { question: `What is abstinence-based rehab like?`, answer: `Abstinence-based residential rehab in ${location} typically involves: medically supervised detox, group therapy with others committed to abstinence, individual CBT or psychodynamic therapy, 12-step or SMART Recovery work, relapse prevention planning, and discharge into a structured aftercare plan including regular meetings and ongoing counselling.` },
    { question: `Can I go to abstinence-based rehab if I\'m on methadone?`, answer: `Some abstinence-based rehabilitation programmes do not accept residents on opioid substitution therapy. Others do. It is important to ask this question specifically when enquiring about residential rehab near ${location}. Many clinical teams would recommend ensuring stability on OST before attempting abstinence-based residential rehab.` },
    { question: `Does abstinence-based rehab mean I have to do AA?`, answer: `Not necessarily. Many abstinence-based programmes use SMART Recovery, CBT, and secular approaches. AA, while effective for many, is not the only abstinence-based mutual aid option. Non-12-step abstinence programmes exist and can be just as effective.` },
    { question: `How do I maintain abstinence after leaving rehab?`, answer: `The most effective abstinence maintenance strategies after leaving rehab in ${location} combine: regular mutual aid meetings (AA, NA, SMART), ongoing therapy or keyworking, relapse trigger identification and management, strong sober social connections, medication where appropriate (Naltrexone, Acamprosate), and a clear relapse response plan agreed in advance.` },
    { question: `Is "just one drink" really a problem in recovery?`, answer: `For many people with alcohol use disorder â€” particularly those with significant neurological changes from long-term drinking â€” a single drink frequently activates the craving response that leads to full relapse. This is the physiological basis of the AA concept "one is too many and a thousand is never enough." Not everyone experiences this, but for those who do, abstinence is the safest goal.` },
  ],
  ctaLabel: 'Call Frank free: 0300 123 6600',
  ctaHref: 'tel:03001236600',
  secondaryCta: { label: 'Residential rehab in [Location]', href: '/residential-rehab/[location]' },
}

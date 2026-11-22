/**
 * lib/trust.ts
 *
 * Single source of truth for the trust signals shown on advice and meeting pages:
 *   - SOURCES: official pages we cite. Every URL below was opened and checked
 *     for relevance on REVIEWED_ISO. Do not add a URL without opening it first.
 *   - PAGE_SOURCES: which sources support which page (keyed by route slug).
 *   - HELPLINES: crisis and support numbers, each checked on the service's own site.
 *   - FELLOWSHIPS: official meeting finders and newcomer guidance for AA, NA, CA
 *     and Al-Anon, used by the meeting page templates.
 *
 * When you re-check a page, update REVIEWED_ISO (or give that page its own date).
 */

/** The date the sources, helplines and meeting details below were checked. */
export const REVIEWED_ISO = '2026-11-22'
export const REVIEWED_LABEL = '22 November 2026'

export const SITE_URL = 'https://www.sobernation.co.uk'
export const CONTACT_EMAIL = 'info@sobernation.co.uk'
/** Where readers report a mistake. The contact form has a "Correction request" topic. */
export const REPORT_MISTAKE_HREF = '/contact#send-a-message'

export interface Source {
  title: string
  publisher: string
  url: string
}

export const SOURCES = {
  // NHS: addiction and drugs
  nhsDrugHelp: { title: 'Drug addiction: getting help', publisher: 'NHS', url: 'https://www.nhs.uk/live-well/addiction-support/drug-addiction-getting-help/' },
  nhsAddictionSupport: { title: 'Addiction support', publisher: 'NHS', url: 'https://www.nhs.uk/live-well/addiction-support/' },
  nhsAddictionWhat: { title: 'Addiction: what is it?', publisher: 'NHS', url: 'https://www.nhs.uk/live-well/addiction-support/addiction-what-is-it/' },
  nhsGambling: { title: 'Help for problems with gambling', publisher: 'NHS', url: 'https://www.nhs.uk/live-well/addiction-support/gambling-addiction/' },
  // NHS: alcohol
  nhsAlcoholSupport: { title: 'Alcohol support', publisher: 'NHS', url: 'https://www.nhs.uk/live-well/alcohol-advice/alcohol-support/' },
  nhsAlcoholUseDisorder: { title: 'Alcohol-use disorder', publisher: 'NHS', url: 'https://www.nhs.uk/conditions/alcohol-use-disorder/' },
  nhsAlcoholRisks: { title: 'The risks of drinking too much', publisher: 'NHS', url: 'https://www.nhs.uk/live-well/alcohol-advice/the-risks-of-drinking-too-much/' },
  nhsAlcoholUnits: { title: 'Alcohol units', publisher: 'NHS', url: 'https://www.nhs.uk/live-well/alcohol-advice/calculating-alcohol-units/' },
  nhsCuttingDown: { title: 'Tips on cutting down on alcohol', publisher: 'NHS', url: 'https://www.nhs.uk/live-well/alcohol-advice/tips-on-cutting-down-alcohol/' },
  nhsAlcoholPoisoning: { title: 'Alcohol poisoning', publisher: 'NHS', url: 'https://www.nhs.uk/conditions/alcohol-poisoning/' },
  // NHS: medicines
  nhsDiazepam: { title: 'Diazepam', publisher: 'NHS', url: 'https://www.nhs.uk/medicines/diazepam/' },
  nhsCodeine: { title: 'Codeine', publisher: 'NHS', url: 'https://www.nhs.uk/medicines/codeine/' },
  nhsTramadol: { title: 'Tramadol', publisher: 'NHS', url: 'https://www.nhs.uk/medicines/tramadol/' },
  nhsPregabalin: { title: 'Pregabalin', publisher: 'NHS', url: 'https://www.nhs.uk/medicines/pregabalin/' },
  nhsGabapentin: { title: 'Gabapentin', publisher: 'NHS', url: 'https://www.nhs.uk/medicines/gabapentin/' },
  nhsZopiclone: { title: 'Zopiclone', publisher: 'NHS', url: 'https://www.nhs.uk/medicines/zopiclone/' },
  nhsZolpidem: { title: 'Zolpidem', publisher: 'NHS', url: 'https://www.nhs.uk/medicines/zolpidem/' },
  nhsMethadone: { title: 'Methadone', publisher: 'NHS', url: 'https://www.nhs.uk/medicines/methadone/' },
  nhsMorphine: { title: 'Morphine', publisher: 'NHS', url: 'https://www.nhs.uk/medicines/morphine/' },
  nhsOxycodone: { title: 'Oxycodone', publisher: 'NHS', url: 'https://www.nhs.uk/medicines/oxycodone/' },
  nhsAntidepressants: { title: 'Antidepressants', publisher: 'NHS', url: 'https://www.nhs.uk/medicines/antidepressants/' },
  // NHS: mental health, therapy, other services
  nhsCbt: { title: 'Cognitive behavioural therapy (CBT)', publisher: 'NHS', url: 'https://www.nhs.uk/tests-and-treatments/cognitive-behavioural-therapy-cbt/' },
  nhsTalkingTherapies: { title: 'Talking therapies', publisher: 'NHS', url: 'https://www.nhs.uk/tests-and-treatments/talking-therapies/' },
  nhsMentalHealthTreatments: { title: 'Mental health treatments', publisher: 'NHS', url: 'https://www.nhs.uk/mental-health/mental-health-treatments/' },
  nhsUrgentMentalHealth: { title: 'Where to get urgent help for mental health', publisher: 'NHS', url: 'https://www.nhs.uk/nhs-services/mental-health-services/where-to-get-urgent-help-for-mental-health/' },
  nhsSuicidalThoughts: { title: 'Help for suicidal thoughts', publisher: 'NHS', url: 'https://www.nhs.uk/mental-health/feelings-symptoms-behaviours/behaviours/help-for-suicidal-thoughts/' },
  nhs111: { title: 'When to use NHS 111 online or call 111', publisher: 'NHS', url: 'https://www.nhs.uk/nhs-services/urgent-and-emergency-care-services/when-to-use-111/' },
  nhsPsychosis: { title: 'Psychosis', publisher: 'NHS', url: 'https://www.nhs.uk/mental-health/conditions/psychosis/overview/' },
  nhsEatingDisorders: { title: 'Eating disorders', publisher: 'NHS', url: 'https://www.nhs.uk/mental-health/feelings-symptoms-behaviours/behaviours/eating-disorders/overview/' },
  nhsInsomnia: { title: 'Insomnia', publisher: 'NHS', url: 'https://www.nhs.uk/conditions/insomnia/' },
  nhsYoungPeopleMentalHealth: { title: 'Mental health for children, teenagers and young adults', publisher: 'NHS', url: 'https://www.nhs.uk/mental-health/children-and-young-adults/' },
  nhsAdviceForParents: { title: 'Advice for parents', publisher: 'NHS', url: 'https://www.nhs.uk/mental-health/children-and-young-adults/advice-for-parents/' },
  nhsCarers: { title: 'Support and benefits for carers', publisher: 'NHS', url: 'https://www.nhs.uk/social-care-and-support/support-and-benefits-for-carers/' },
  nhsSexualHealthClinic: { title: 'Find a sexual health clinic', publisher: 'NHS', url: 'https://www.nhs.uk/nhs-services/sexual-health-services/find-a-sexual-health-clinic/' },
  nhsStis: { title: 'Sexually transmitted infections (STIs)', publisher: 'NHS', url: 'https://www.nhs.uk/conditions/sexually-transmitted-infections-stis/' },

  // NICE
  niceCg115: { title: 'Alcohol-use disorders: diagnosis, assessment and management of harmful drinking and alcohol dependence (CG115)', publisher: 'NICE', url: 'https://www.nice.org.uk/guidance/cg115' },
  niceCg100: { title: 'Alcohol-use disorders: diagnosis and management of physical complications (CG100)', publisher: 'NICE', url: 'https://www.nice.org.uk/guidance/cg100' },
  nicePh24: { title: 'Alcohol-use disorders: prevention (PH24)', publisher: 'NICE', url: 'https://www.nice.org.uk/guidance/ph24' },
  niceQs11: { title: 'Alcohol-use disorders: diagnosis and management (QS11)', publisher: 'NICE', url: 'https://www.nice.org.uk/guidance/qs11' },
  niceCg51: { title: 'Drug misuse in over 16s: psychosocial interventions (CG51)', publisher: 'NICE', url: 'https://www.nice.org.uk/guidance/cg51' },
  niceCg52: { title: 'Drug misuse in over 16s: opioid detoxification (CG52)', publisher: 'NICE', url: 'https://www.nice.org.uk/guidance/cg52' },
  niceTa114: { title: 'Methadone and buprenorphine for the management of opioid dependence (TA114)', publisher: 'NICE', url: 'https://www.nice.org.uk/guidance/ta114' },
  niceQs23: { title: 'Drug use disorders in adults (QS23)', publisher: 'NICE', url: 'https://www.nice.org.uk/guidance/qs23' },
  niceNg58: { title: 'Coexisting severe mental illness and substance misuse: community health and social care services (NG58)', publisher: 'NICE', url: 'https://www.nice.org.uk/guidance/ng58' },
  niceCg120: { title: 'Coexisting severe mental illness (psychosis) and substance misuse (CG120)', publisher: 'NICE', url: 'https://www.nice.org.uk/guidance/cg120' },
  niceNg215: { title: 'Medicines associated with dependence or withdrawal symptoms (NG215)', publisher: 'NICE', url: 'https://www.nice.org.uk/guidance/ng215' },
  niceNg64: { title: 'Drug misuse prevention: targeted interventions (NG64)', publisher: 'NICE', url: 'https://www.nice.org.uk/guidance/ng64' },
  nicePh52: { title: 'Needle and syringe programmes (PH52)', publisher: 'NICE', url: 'https://www.nice.org.uk/guidance/ph52' },
  niceNg69: { title: 'Eating disorders: recognition and treatment (NG69)', publisher: 'NICE', url: 'https://www.nice.org.uk/guidance/ng69' },

  // GOV.UK and regulators
  govClinicalGuidelines: { title: 'Drug misuse and dependence: UK guidelines on clinical management', publisher: 'GOV.UK', url: 'https://www.gov.uk/government/publications/drug-misuse-and-dependence-uk-guidelines-on-clinical-management' },
  govTreatmentGuidance: { title: 'Alcohol and drug misuse prevention, treatment and recovery guidance', publisher: 'GOV.UK', url: 'https://www.gov.uk/government/collections/alcohol-and-drug-misuse-prevention-and-treatment-guidance' },
  govNaloxone: { title: 'Supplying take home naloxone without a prescription', publisher: 'GOV.UK', url: 'https://www.gov.uk/guidance/supplying-take-home-naloxone-without-a-prescription' },
  govLowRiskDrinking: { title: 'Alcohol consumption: advice on low risk drinking', publisher: 'GOV.UK', url: 'https://www.gov.uk/government/publications/alcohol-consumption-advice-on-low-risk-drinking' },
  govAlcoholScreening: { title: 'Alcohol use screening tests', publisher: 'GOV.UK', url: 'https://www.gov.uk/government/publications/alcohol-use-screening-tests' },
  govPrescribedMedicines: { title: 'Prescribed medicines review: report', publisher: 'GOV.UK', url: 'https://www.gov.uk/government/publications/prescribed-medicines-review-report' },
  govDrugDriving: { title: 'Drugs and driving: the law', publisher: 'GOV.UK', url: 'https://www.gov.uk/drug-driving-law' },
  govDrinkDrive: { title: 'The drink drive limit', publisher: 'GOV.UK', url: 'https://www.gov.uk/drink-drive-limit' },
  hseDrugsAlcohol: { title: 'Managing drug and alcohol misuse at work', publisher: 'Health and Safety Executive', url: 'https://www.hse.gov.uk/alcoholdrugs/' },
  cqc: { title: 'Care Quality Commission: find and compare registered services', publisher: 'CQC', url: 'https://www.cqc.org.uk/' },

  // FRANK (national drugs advice service)
  frankFindSupport: { title: 'Find drug and alcohol support near you', publisher: 'FRANK', url: 'https://www.talktofrank.com/get-help/find-support-near-you' },
  frankFriend: { title: 'How to help a friend', publisher: 'FRANK', url: 'https://www.talktofrank.com/get-help/concerned-about-a-friend' },
  frankEmergency: { title: 'What to do in an emergency', publisher: 'FRANK', url: 'https://www.talktofrank.com/get-help/what-to-do-in-an-emergency' },
  frankContact: { title: 'Contact FRANK', publisher: 'FRANK', url: 'https://www.talktofrank.com/contact-frank' },
  frankAlcohol: { title: 'Alcohol', publisher: 'FRANK', url: 'https://www.talktofrank.com/drug/alcohol' },
  frankCocaine: { title: 'Cocaine (including crack)', publisher: 'FRANK', url: 'https://www.talktofrank.com/drug/cocaine' },
  frankCannabis: { title: 'Cannabis', publisher: 'FRANK', url: 'https://www.talktofrank.com/drug/cannabis' },
  frankHeroin: { title: 'Heroin', publisher: 'FRANK', url: 'https://www.talktofrank.com/drug/heroin' },
  frankKetamine: { title: 'Ketamine', publisher: 'FRANK', url: 'https://www.talktofrank.com/drug/ketamine' },
  frankEcstasy: { title: 'MDMA (ecstasy)', publisher: 'FRANK', url: 'https://www.talktofrank.com/drug/ecstasy' },
  frankSpeed: { title: 'Speed (amphetamine)', publisher: 'FRANK', url: 'https://www.talktofrank.com/drug/speed' },
  frankMeth: { title: 'Methamphetamine', publisher: 'FRANK', url: 'https://www.talktofrank.com/drug/methamphetamine' },
  frankBenzos: { title: 'Benzodiazepines', publisher: 'FRANK', url: 'https://www.talktofrank.com/drug/benzodiazepines' },
  frankNitrous: { title: 'Nitrous oxide', publisher: 'FRANK', url: 'https://www.talktofrank.com/drug/nitrous-oxide' },
  frankSyntheticCannabinoids: { title: 'Synthetic cannabinoids (spice)', publisher: 'FRANK', url: 'https://www.talktofrank.com/drug/synthetic-cannabinoids' },
  frankGlues: { title: 'Glues, gases and aerosols', publisher: 'FRANK', url: 'https://www.talktofrank.com/drug/glues-gases-and-aerosols' },
  frankCodeine: { title: 'Codeine', publisher: 'FRANK', url: 'https://www.talktofrank.com/drug/codeine' },
  frankTramadol: { title: 'Tramadol', publisher: 'FRANK', url: 'https://www.talktofrank.com/drug/tramadol' },
  frankPregabalin: { title: 'Pregabalin', publisher: 'FRANK', url: 'https://www.talktofrank.com/drug/pregabalin' },
  frankGabapentin: { title: 'Gabapentin', publisher: 'FRANK', url: 'https://www.talktofrank.com/drug/gabapentin' },
  frankOpioidPainkillers: { title: 'Opiate and opioid painkillers', publisher: 'FRANK', url: 'https://www.talktofrank.com/drug/opiateopioid-painkillers' },
  frankSyntheticOpioids: { title: 'Synthetic opioids (including fentanyl)', publisher: 'FRANK', url: 'https://www.talktofrank.com/drug/synthetic-opioids' },
  frankMethadone: { title: 'Methadone', publisher: 'FRANK', url: 'https://www.talktofrank.com/drug/methadone' },
  frankGhb: { title: 'GHB and GBL', publisher: 'FRANK', url: 'https://www.talktofrank.com/drug/ghb' },
  frankCathinones: { title: 'Synthetic cathinones (including mephedrone)', publisher: 'FRANK', url: 'https://www.talktofrank.com/drug/cathinones' },

  // Charities and fellowships
  drinkaware: { title: 'Drinkaware', publisher: 'Drinkaware', url: 'https://www.drinkaware.co.uk/' },
  drinkawareMentalHealth: { title: 'How alcohol affects mental health', publisher: 'Drinkaware', url: 'https://www.drinkaware.co.uk/how-alcohol-affects-mental-health' },
  drinkawareSupport: { title: 'Where and how to find alcohol support', publisher: 'Drinkaware', url: 'https://www.drinkaware.co.uk/where-and-how-to-find-alcohol-support' },
  samaritans: { title: 'Contact Samaritans', publisher: 'Samaritans', url: 'https://www.samaritans.org/how-we-can-help/contact-samaritan/' },
  adfam: { title: 'Adfam: support for families affected by drugs and alcohol', publisher: 'Adfam', url: 'https://adfam.org.uk/' },
  beat: { title: 'Beat eating disorders charity', publisher: 'Beat', url: 'https://www.beateatingdisorders.org.uk/' },
  rcpsychAntidepressants: { title: 'Stopping antidepressants', publisher: 'Royal College of Psychiatrists', url: 'https://www.rcpsych.ac.uk/patients-and-carers/treatments-and-wellbeing/stopping-antidepressants' },
  smartRecovery: { title: 'SMART Recovery UK', publisher: 'SMART Recovery UK', url: 'https://smartrecovery.org.uk/' },
  aaFindMeeting: { title: 'Find a meeting', publisher: 'Alcoholics Anonymous Great Britain', url: 'https://www.alcoholics-anonymous.org.uk/find-a-meeting/' },
  aaGetHelp: { title: 'Get help now', publisher: 'Alcoholics Anonymous Great Britain', url: 'https://www.alcoholics-anonymous.org.uk/get-help-now/' },
  aaWhoWeAre: { title: 'Who we are', publisher: 'Alcoholics Anonymous Great Britain', url: 'https://www.alcoholics-anonymous.org.uk/get-help-now/who-we-are/' },
  aaContact: { title: 'Contact and helpline', publisher: 'Alcoholics Anonymous Great Britain', url: 'https://www.alcoholics-anonymous.org.uk/helpline/contact/' },
  naFindMeeting: { title: 'UKNA meetings', publisher: 'Narcotics Anonymous UK', url: 'https://meetings.ukna.org/' },
  naWhatToExpect: { title: 'Meetings: what to expect', publisher: 'Narcotics Anonymous UK', url: 'https://ukna.org/content/meetings-what-expect' },
  naHome: { title: 'Narcotics Anonymous in the United Kingdom', publisher: 'Narcotics Anonymous UK', url: 'https://ukna.org/' },
  caFindMeeting: { title: 'CA meetings', publisher: 'Cocaine Anonymous UK', url: 'https://meetings.cocaineanonymous.org.uk/meetings/' },
  caNeedHelp: { title: 'If you need help now', publisher: 'Cocaine Anonymous UK', url: 'https://cocaineanonymous.org.uk/if-you-need-help/' },
  caFirstThing: { title: 'What is the first thing?', publisher: 'Cocaine Anonymous UK', url: 'https://cocaineanonymous.org.uk/what-is-the-first-thing/' },
  caHome: { title: 'Cocaine Anonymous UK', publisher: 'Cocaine Anonymous UK', url: 'https://cocaineanonymous.org.uk/' },
  alanonFindMeeting: { title: 'Find an Al-Anon meeting', publisher: 'Al-Anon Family Groups UK and Eire', url: 'https://al-anonuk.org.uk/getting-help/find-a-meeting/' },
  alanonWhatToExpect: { title: 'What to expect at a meeting', publisher: 'Al-Anon Family Groups UK and Eire', url: 'https://al-anonuk.org.uk/getting-help/what-to-expect-at-a-meeting/' },
  alanonHelpline: { title: 'Helpline', publisher: 'Al-Anon Family Groups UK and Eire', url: 'https://al-anonuk.org.uk/getting-help/helpline/' },
} satisfies Record<string, Source>

export type SourceId = keyof typeof SOURCES

// Reusable groups
const DRUG_CORE: SourceId[] = ['nhsDrugHelp', 'frankFindSupport', 'govClinicalGuidelines']
const ALCOHOL_CORE: SourceId[] = ['nhsAlcoholSupport', 'nhsAlcoholUseDisorder', 'niceCg115']
const REHAB_CORE: SourceId[] = ['nhsDrugHelp', 'nhsAlcoholSupport', 'frankFindSupport', 'cqc']

/**
 * Sources per page, keyed by the first URL segment (e.g. 'cocaine-addiction')
 * or 'detect-<drug>' for the "how long does X stay in your system" pages.
 */
export const PAGE_SOURCES: Record<string, SourceId[]> = {
  // Substance pages
  'alcohol-addiction': [...ALCOHOL_CORE, 'nhsAlcoholRisks', 'drinkawareSupport'],
  'cocaine-addiction': ['frankCocaine', ...DRUG_CORE, 'niceCg51'],
  'crack-cocaine-addiction': ['frankCocaine', ...DRUG_CORE, 'niceCg51'],
  'heroin-addiction': ['frankHeroin', ...DRUG_CORE, 'niceTa114', 'govNaloxone'],
  'cannabis-addiction': ['frankCannabis', ...DRUG_CORE, 'niceCg51'],
  'prescription-drug-addiction': ['nhsDrugHelp', 'niceNg215', 'govPrescribedMedicines', 'frankBenzos', 'frankOpioidPainkillers'],
  'ketamine-addiction': ['frankKetamine', ...DRUG_CORE],
  'benzodiazepine-addiction': ['frankBenzos', 'nhsDiazepam', 'niceNg215', 'nhsDrugHelp'],
  'methamphetamine-addiction': ['frankMeth', ...DRUG_CORE],
  'tramadol-addiction': ['nhsTramadol', 'frankTramadol', 'niceNg215', 'nhsDrugHelp'],
  'codeine-addiction': ['nhsCodeine', 'frankCodeine', 'niceNg215', 'nhsDrugHelp'],
  'diazepam-addiction': ['nhsDiazepam', 'frankBenzos', 'niceNg215', 'nhsDrugHelp'],
  'gabapentin-addiction': ['nhsGabapentin', 'frankGabapentin', 'niceNg215', 'nhsDrugHelp'],
  'pregabalin-addiction': ['nhsPregabalin', 'frankPregabalin', 'niceNg215', 'nhsDrugHelp'],
  'zopiclone-addiction': ['nhsZopiclone', 'nhsInsomnia', 'niceNg215', 'nhsDrugHelp'],
  'fentanyl-addiction': ['frankSyntheticOpioids', 'govNaloxone', ...DRUG_CORE],
  'spice-addiction': ['frankSyntheticCannabinoids', ...DRUG_CORE],
  'gambling-addiction': ['nhsGambling', 'nhsCbt'],
  'nitrous-oxide-addiction': ['frankNitrous', ...DRUG_CORE],
  'antidepressant-addiction': ['nhsAntidepressants', 'rcpsychAntidepressants', 'niceNg215', 'govPrescribedMedicines'],
  'inhalant-addiction': ['frankGlues', 'frankEmergency', 'nhsDrugHelp'],
  'amphetamine-addiction': ['frankSpeed', ...DRUG_CORE],
  'mdma-ecstasy-addiction': ['frankEcstasy', ...DRUG_CORE],
  'painkiller-addiction': ['frankOpioidPainkillers', 'nhsCodeine', 'nhsMorphine', 'nhsOxycodone', 'niceNg215'],
  'sleeping-pill-addiction': ['nhsZopiclone', 'nhsZolpidem', 'frankBenzos', 'niceNg215', 'nhsInsomnia'],
  'opiate-addiction': ['frankHeroin', 'frankOpioidPainkillers', 'niceTa114', 'niceCg52', 'govClinicalGuidelines'],
  'eating-disorder-addiction': ['nhsEatingDisorders', 'niceNg69', 'beat', 'nhsDrugHelp'],
  'chemsex-support': ['nhsSexualHealthClinic', 'nhsStis', 'frankGhb', 'frankMeth', 'frankCathinones', 'nhsDrugHelp'],

  // Treatment and service pages
  'private-rehab': [...REHAB_CORE, 'govTreatmentGuidance'],
  'nhs-rehab': ['nhsDrugHelp', 'nhsAlcoholSupport', 'frankFindSupport', 'govTreatmentGuidance'],
  'rehab-cost': [...REHAB_CORE],
  'dual-diagnosis': ['niceNg58', 'niceCg120', 'nhsMentalHealthTreatments', 'nhsDrugHelp'],
  'sober-living': ['nhsDrugHelp', 'nhsAlcoholSupport', 'govTreatmentGuidance'],
  'detox-centres': ['nhsAlcoholUseDisorder', 'niceCg115', 'niceCg52', 'nhsDrugHelp', 'cqc'],
  'how-to-help': ['frankFriend', 'adfam', 'nhsCarers', 'nhsAlcoholSupport'],
  'alcohol-rehab': [...ALCOHOL_CORE, 'cqc', 'drinkawareSupport'],
  'drug-rehab': [...DRUG_CORE, 'cqc', 'niceQs23'],
  'binge-drinking': ['nhsAlcoholRisks', 'nhsAlcoholPoisoning', 'nhsAlcoholUnits', 'govLowRiskDrinking'],
  naloxone: ['govNaloxone', 'frankHeroin', 'frankEmergency'],
  'alcohol-detox': ['nhsAlcoholUseDisorder', 'nhsAlcoholSupport', 'niceCg115', 'niceCg100'],
  'drug-detox': ['nhsDrugHelp', 'niceCg52', 'govClinicalGuidelines', 'frankFindSupport'],
  'residential-rehab': [...REHAB_CORE, 'niceCg115'],
  'outpatient-rehab': ['nhsDrugHelp', 'nhsAlcoholSupport', 'frankFindSupport', 'niceCg51'],
  'heroin-detox': ['frankHeroin', 'niceCg52', 'niceTa114', 'nhsMethadone', 'govClinicalGuidelines'],
  'alcohol-counselling': ['nhsAlcoholSupport', 'nhsTalkingTherapies', 'niceCg115'],
  'drug-counselling': ['nhsDrugHelp', 'nhsTalkingTherapies', 'niceCg51'],
  'womens-rehab': [...REHAB_CORE],
  'teen-addiction': ['nhsYoungPeopleMentalHealth', 'nhsAdviceForParents', 'frankFriend', 'niceNg64'],
  'workplace-addiction': ['hseDrugsAlcohol', 'nhsDrugHelp', 'nhsAlcoholSupport'],
  aftercare: ['nhsDrugHelp', 'nhsAlcoholSupport', 'govTreatmentGuidance', 'smartRecovery'],
  'harm-reduction': ['frankEmergency', 'govNaloxone', 'nicePh52', 'frankFindSupport'],
  'opioid-substitution': ['niceTa114', 'nhsMethadone', 'frankMethadone', 'govClinicalGuidelines'],
  'online-rehab': ['nhsDrugHelp', 'nhsAlcoholSupport', 'frankFindSupport'],
  'recovery-coaching': ['nhsDrugHelp', 'nhsAlcoholSupport', 'govTreatmentGuidance'],
  'non-12-step-rehab': ['smartRecovery', 'nhsCbt', 'niceCg51', 'nhsDrugHelp'],
  'family-therapy': ['adfam', 'nhsCarers', 'niceCg51', 'frankFriend'],
  'abstinence-based-rehab': [...REHAB_CORE],
  'smart-recovery': ['smartRecovery', 'nhsAlcoholSupport', 'nhsDrugHelp'],

  // Location hubs
  help: ['nhsDrugHelp', 'nhsAlcoholSupport', 'frankFindSupport', 'samaritans', 'cqc'],
  'drug-treatment': [...DRUG_CORE, 'niceQs23'],

  // Stand alone guides
  'alcohol-addiction-treatment': [...ALCOHOL_CORE, 'niceQs11', 'drinkawareSupport'],
  'alcohol-and-mental-health': ['drinkawareMentalHealth', 'nhsAlcoholRisks', 'nhsUrgentMentalHealth', 'niceNg58'],
  'alcohol-withdrawal-symptoms': ['nhsAlcoholUseDisorder', 'niceCg115', 'niceCg100', 'nhsAlcoholSupport'],
  'am-i-an-alcoholic': ['govAlcoholScreening', 'nhsAlcoholUseDisorder', 'nhsAlcoholRisks', 'nhsAlcoholUnits'],
  'drug-addiction-treatment': [...DRUG_CORE, 'niceCg51', 'niceQs23'],
  'heroin-withdrawal-symptoms': ['frankHeroin', 'niceCg52', 'niceTa114', 'nhsDrugHelp', 'govNaloxone'],
  'how-to-help-someone-with-addiction': ['frankFriend', 'adfam', 'nhsCarers', 'alanonHelpline'],
  'how-to-stop-drinking': ['nhsCuttingDown', 'nhsAlcoholSupport', 'nhsAlcoholUseDisorder', 'drinkawareSupport'],
  'private-vs-nhs-rehab': ['nhsDrugHelp', 'nhsAlcoholSupport', 'cqc', 'govTreatmentGuidance'],
  'signs-of-alcoholism': ['nhsAlcoholUseDisorder', 'govAlcoholScreening', 'nhsAlcoholRisks'],
  'signs-of-drug-addiction': ['nhsAddictionWhat', 'nhsDrugHelp', 'frankFriend'],
  'suboxone-vs-methadone': ['niceTa114', 'nhsMethadone', 'frankMethadone', 'govClinicalGuidelines'],
  'what-is-methadone': ['nhsMethadone', 'frankMethadone', 'niceTa114', 'govClinicalGuidelines'],
  'withdrawal-timeline': ['nhsAlcoholUseDisorder', 'niceCg52', 'niceNg215', 'frankHeroin', 'frankBenzos'],
  'online-aa-meetings': ['aaFindMeeting', 'aaGetHelp', 'nhsAlcoholSupport'],
  'alcohol-units-calculator': ['nhsAlcoholUnits', 'govLowRiskDrinking', 'nhsAlcoholRisks'],

  // Detection time pages
  'detect-alcohol': ['nhsAlcoholUnits', 'govDrinkDrive', 'frankAlcohol'],
  'detect-amphetamine': ['frankSpeed', 'govDrugDriving'],
  'detect-cannabis': ['frankCannabis', 'govDrugDriving'],
  'detect-cocaine': ['frankCocaine', 'govDrugDriving'],
  'detect-codeine': ['nhsCodeine', 'frankCodeine', 'govDrugDriving'],
  'detect-diazepam': ['nhsDiazepam', 'frankBenzos', 'govDrugDriving'],
  'detect-heroin': ['frankHeroin', 'govDrugDriving'],
  'detect-ketamine': ['frankKetamine', 'govDrugDriving'],
  'detect-mdma': ['frankEcstasy', 'govDrugDriving'],
  'detect-methamphetamine': ['frankMeth', 'govDrugDriving'],
  'detect-pregabalin': ['nhsPregabalin', 'frankPregabalin', 'govDrugDriving'],
  'detect-tramadol': ['nhsTramadol', 'frankTramadol', 'govDrugDriving'],
  'detect-zopiclone': ['nhsZopiclone', 'govDrugDriving'],

  // Meeting pages
  'aa-meetings': ['aaFindMeeting', 'aaGetHelp', 'aaWhoWeAre', 'aaContact', 'nhsAlcoholSupport'],
  'na-meetings': ['naFindMeeting', 'naWhatToExpect', 'naHome', 'nhsDrugHelp'],
  'cocaine-anonymous': ['caFindMeeting', 'caNeedHelp', 'caFirstThing', 'caHome', 'frankCocaine'],
  'al-anon': ['alanonFindMeeting', 'alanonWhatToExpect', 'alanonHelpline', 'adfam'],
}

export function getSources(key: string): Source[] {
  return (PAGE_SOURCES[key] ?? []).map(id => SOURCES[id])
}

/** schema.org citation list for JSON-LD. */
export function citationSchema(sources: Source[]) {
  return sources.map(s => ({
    '@type': 'CreativeWork',
    name: s.title,
    url: s.url,
    publisher: { '@type': 'Organization', name: s.publisher },
  }))
}

/** Extra JSON-LD properties for a page we reviewed. No reviewer persons, by policy. */
export function reviewedSchemaProps(key: string, reviewedIso = REVIEWED_ISO) {
  const sources = getSources(key)
  return {
    lastReviewed: reviewedIso,
    dateModified: reviewedIso,
    ...(sources.length ? { citation: citationSchema(sources) } : {}),
  }
}

// ── Helplines ────────────────────────────────────────────────────────────────
// Each number and its hours were checked on the service's own website on REVIEWED_ISO.

export interface Helpline {
  name: string
  number: string
  tel: string
  hours: string
  note?: string
  sourceUrl: string
}

export const HELPLINES = {
  emergency: { name: 'Emergency services', number: '999', tel: '999', hours: 'Any time', note: 'If someone is in danger, has taken an overdose or cannot be woken', sourceUrl: 'https://www.nhs.uk/nhs-services/urgent-and-emergency-care-services/when-to-use-111/' },
  nhs111: { name: 'NHS 111', number: '111', tel: '111', hours: '24 hours, every day', note: 'Urgent medical help that is not an emergency', sourceUrl: 'https://www.nhs.uk/mental-health/feelings-symptoms-behaviours/behaviours/help-for-suicidal-thoughts/' },
  samaritans: { name: 'Samaritans', number: '116 123', tel: '116123', hours: '24 hours, every day', note: 'Free from any phone', sourceUrl: 'https://www.samaritans.org/how-we-can-help/contact-samaritan/' },
  frank: { name: 'FRANK (drugs)', number: '0300 123 6600', tel: '03001236600', hours: '24 hours, every day', note: 'Standard national call rate', sourceUrl: 'https://www.talktofrank.com/contact-frank' },
  drinkline: { name: 'Drinkline (alcohol)', number: '0300 123 1110', tel: '03001231110', hours: 'Weekdays 9am to 8pm, weekends 11am to 4pm', note: 'Free', sourceUrl: 'https://www.nhs.uk/live-well/alcohol-advice/alcohol-support/' },
  aa: { name: 'Alcoholics Anonymous', number: '0800 917 7650', tel: '08009177650', hours: 'Free helpline', note: 'Run by AA members', sourceUrl: 'https://www.alcoholics-anonymous.org.uk/helpline/contact/' },
  na: { name: 'Narcotics Anonymous', number: '0300 999 1212', tel: '03009991212', hours: '10am to midnight', sourceUrl: 'https://ukna.org/' },
  ca: { name: 'Cocaine Anonymous', number: '0800 612 0225', tel: '08006120225', hours: '10am to 10pm, 7 days', note: 'Free', sourceUrl: 'https://cocaineanonymous.org.uk/if-you-need-help/' },
  alanon: { name: 'Al-Anon (families and friends)', number: '0800 0086 811', tel: '08000086811', hours: '10am to 10pm, every day', note: 'Free', sourceUrl: 'https://al-anonuk.org.uk/getting-help/helpline/' },
} satisfies Record<string, Helpline>

// ── Fellowships (meeting pages) ──────────────────────────────────────────────

export interface Fellowship {
  key: 'aa-meetings' | 'na-meetings' | 'cocaine-anonymous' | 'al-anon'
  name: string
  officialName: string
  finderUrl: string
  finderHost: string
  helpline: Helpline
  /** Short points about a first meeting, each taken from the fellowship's own newcomer page. */
  firstMeeting: string[]
  firstMeetingSource: Source
}

export const FELLOWSHIPS: Record<Fellowship['key'], Fellowship> = {
  'aa-meetings': {
    key: 'aa-meetings',
    name: 'AA',
    officialName: 'Alcoholics Anonymous Great Britain',
    finderUrl: SOURCES.aaFindMeeting.url,
    finderHost: 'alcoholics-anonymous.org.uk',
    helpline: HELPLINES.aa,
    firstMeeting: [
      'The only requirement for membership is a desire to stop drinking. It does not matter how long you have been drinking, or how much.',
      'It is free. There are no dues or fees; groups support themselves through their own contributions.',
      'You can just come and listen, or you can talk and share. It is up to you.',
      'Open meetings are open to anyone, including family and friends. Closed meetings are for alcoholics and people who think or know they have a problem with drinking. The meeting finder shows which is which.',
      'Meetings are held in person and online. You can search the finder by town or postcode, day and time of day.',
    ],
    firstMeetingSource: SOURCES.aaGetHelp,
  },
  'na-meetings': {
    key: 'na-meetings',
    name: 'NA',
    officialName: 'Narcotics Anonymous UK',
    finderUrl: SOURCES.naFindMeeting.url,
    finderHost: 'meetings.ukna.org',
    helpline: HELPLINES.na,
    firstMeeting: [
      'No appointment is needed and meetings are free. Just turn up.',
      'You do not have to say anything if you do not want to, and you do not have to be drug free to attend.',
      'Try to arrive a little early. The secretary may ask if you have been before; you can say it is your first meeting, or that you are visiting.',
      'At in person meetings there may be reading cards on the chairs. If you would rather not read aloud, sit where there is no card or pass it on.',
      'Meetings are listed as Open to All, Open by Request or Addicts Only. Open to All meetings welcome family and friends too.',
    ],
    firstMeetingSource: SOURCES.naWhatToExpect,
  },
  'cocaine-anonymous': {
    key: 'cocaine-anonymous',
    name: 'CA',
    officialName: 'Cocaine Anonymous UK',
    finderUrl: SOURCES.caFindMeeting.url,
    finderHost: 'meetings.cocaineanonymous.org.uk',
    helpline: HELPLINES.ca,
    firstMeeting: [
      'The only requirement for membership is a desire to stop using cocaine and all other mind altering substances.',
      'There are no dues or fees. CA is fully self supporting through its own members.',
      'CA describes coming to a meeting as already having done the first thing: admitting that you need help.',
      'Members suggest taking recovery one day at a time, listening closely to other people’s stories and taking phone numbers so you can call someone between meetings.',
      'Meetings are held face to face and online across the UK.',
    ],
    firstMeetingSource: SOURCES.caFirstThing,
  },
  'al-anon': {
    key: 'al-anon',
    name: 'Al-Anon',
    officialName: 'Al-Anon Family Groups UK and Eire',
    finderUrl: SOURCES.alanonFindMeeting.url,
    finderHost: 'al-anonuk.org.uk',
    helpline: HELPLINES.alanon,
    firstMeeting: [
      'Al-Anon is for anyone whose life is or has been affected by someone else’s drinking: a relative, partner, colleague or friend.',
      'Members do not advise or judge, and do not tell you how to change the drinker’s behaviour. The meeting is for your benefit.',
      'Your anonymity is protected: first names only, and you will not be asked for your surname or details about the drinker.',
      'Anything discussed in the meeting, including the fact that you were there, is treated as confidential.',
      'Al-Anon suggests going to at least six meetings before deciding whether it is for you.',
    ],
    firstMeetingSource: SOURCES.alanonWhatToExpect,
  },
}

/**
 * scripts/seed-article-queue.mjs
 *
 * Seeds the article_queue table with 100 diverse article briefs.
 * Run once: node scripts/seed-article-queue.mjs
 *
 * Requires .env.local with:
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 */

import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Load .env.local
const envPath = resolve(__dirname, '../.env.local')
const envLines = readFileSync(envPath, 'utf8').split('\n')
for (const line of envLines) {
  const [key, ...rest] = line.split('=')
  if (key && rest.length) process.env[key.trim()] = rest.join('=').trim()
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

// ─── 100 article briefs ───────────────────────────────────────────────────────

const articles = [
  // ── GENERAL RECOVERY (no location) ─────────────────────────────────────────
  {
    title: 'What Happens to Your Body When You Stop Drinking?',
    topic: 'alcohol',
    location_slug: null,
    keywords: ['alcohol withdrawal', 'stopping drinking', 'detox', 'physical health'],
    priority: 10,
  },
  {
    title: 'The 12 Steps Explained: A Plain-English Guide for Beginners',
    topic: 'recovery',
    location_slug: null,
    keywords: ['12 steps', 'AA', 'Alcoholics Anonymous', 'step programme'],
    priority: 10,
  },
  {
    title: 'How Long Does Cocaine Stay in Your System?',
    topic: 'cocaine',
    location_slug: null,
    keywords: ['cocaine', 'drug testing', 'half-life', 'detection'],
    priority: 9,
  },
  {
    title: 'Signs Your Loved One Is Hiding an Addiction',
    topic: 'family',
    location_slug: null,
    keywords: ['addiction signs', 'family', 'denial', 'help someone'],
    priority: 9,
  },
  {
    title: 'NHS vs Private Rehab: Which Is Right for You?',
    topic: 'rehab',
    location_slug: null,
    keywords: ['NHS rehab', 'private rehab', 'cost', 'waiting list'],
    priority: 10,
  },
  {
    title: 'What Is Dual Diagnosis? When Addiction and Mental Health Overlap',
    topic: 'mental-health',
    location_slug: null,
    keywords: ['dual diagnosis', 'mental health', 'depression', 'anxiety', 'addiction'],
    priority: 9,
  },
  {
    title: 'How to Help Someone Who Refuses to Get Help for Addiction',
    topic: 'family',
    location_slug: null,
    keywords: ['refusing help', 'intervention', 'family support', 'boundaries'],
    priority: 9,
  },
  {
    title: 'The Truth About Methadone Treatment in the UK',
    topic: 'opioids',
    location_slug: null,
    keywords: ['methadone', 'opioid treatment', 'OST', 'heroin addiction'],
    priority: 8,
  },
  {
    title: 'Cocaine and the Heart: What Every User Needs to Know',
    topic: 'cocaine',
    location_slug: null,
    keywords: ['cocaine heart', 'cardiac risk', 'cocaine health', 'cardiovascular'],
    priority: 8,
  },
  {
    title: 'What Is CBT and How Does It Help With Addiction?',
    topic: 'therapy',
    location_slug: null,
    keywords: ['CBT', 'cognitive behavioural therapy', 'addiction therapy', 'relapse prevention'],
    priority: 8,
  },
  {
    title: 'Relapse Is Not Failure: Understanding the Cycle of Recovery',
    topic: 'recovery',
    location_slug: null,
    keywords: ['relapse', 'recovery', 'stigma', 'what to do after relapse'],
    priority: 9,
  },
  {
    title: 'How Much Does Alcohol Rehab Cost in the UK in 2025?',
    topic: 'rehab-cost',
    location_slug: null,
    keywords: ['alcohol rehab cost', 'UK rehab price', 'private rehab fees'],
    priority: 10,
  },
  {
    title: 'Cannabis Use Disorder: Is Weed Actually Addictive?',
    topic: 'cannabis',
    location_slug: null,
    keywords: ['cannabis addiction', 'weed dependence', 'marijuana', 'cannabis use disorder'],
    priority: 8,
  },
  {
    title: 'What Is SMART Recovery and How Is It Different from AA?',
    topic: 'recovery',
    location_slug: null,
    keywords: ['SMART Recovery', 'AA alternative', '12 steps alternative', 'self-management'],
    priority: 7,
  },
  {
    title: 'How to Talk to Your GP About Addiction',
    topic: 'getting-help',
    location_slug: null,
    keywords: ['GP addiction', 'NHS help', 'talking to doctor', 'referral'],
    priority: 8,
  },
  {
    title: 'The Hidden Costs of Addiction: Beyond the Financial Damage',
    topic: 'recovery',
    location_slug: null,
    keywords: ['addiction costs', 'relationships', 'career', 'mental health'],
    priority: 7,
  },
  {
    title: 'Prescription Drug Addiction in the UK: The Silent Epidemic',
    topic: 'prescription-drugs',
    location_slug: null,
    keywords: ['prescription addiction', 'benzodiazepines', 'opioids', 'tramadol'],
    priority: 8,
  },
  {
    title: 'Alcohol and Sleep: Why Drinking Is Ruining Your Rest',
    topic: 'alcohol',
    location_slug: null,
    keywords: ['alcohol sleep', 'insomnia', 'REM sleep', 'sober sleep'],
    priority: 7,
  },
  {
    title: 'What Is an Intervention and When Should You Consider One?',
    topic: 'family',
    location_slug: null,
    keywords: ['intervention', 'family intervention', 'confronting addiction', 'CRAFT'],
    priority: 7,
  },
  {
    title: '30 Days Sober: What Really Happens to Your Mind and Body',
    topic: 'recovery',
    location_slug: null,
    keywords: ['30 days sober', 'one month sober', 'sobriety timeline', 'benefits of quitting alcohol'],
    priority: 9,
  },
  {
    title: 'Ketamine Therapy for Depression and Addiction: What the Evidence Shows',
    topic: 'therapy',
    location_slug: null,
    keywords: ['ketamine therapy', 'depression treatment', 'addiction medicine', 'clinical'],
    priority: 7,
  },
  {
    title: 'Sober Living Houses in the UK: A Complete Guide',
    topic: 'sober-living',
    location_slug: null,
    keywords: ['sober living', 'halfway house', 'addiction housing', 'recovery homes'],
    priority: 8,
  },
  {
    title: 'How to Stop Drinking Without Rehab',
    topic: 'alcohol',
    location_slug: null,
    keywords: ['stop drinking', 'at home detox', 'quitting alcohol', 'alcohol free'],
    priority: 9,
  },
  {
    title: 'Alcoholic Liver Disease: Stages, Symptoms, and Recovery',
    topic: 'alcohol',
    location_slug: null,
    keywords: ['liver disease', 'cirrhosis', 'alcohol liver', 'fatty liver'],
    priority: 8,
  },
  {
    title: 'The CRAFT Approach: How Families Can Encourage a Loved One Into Treatment',
    topic: 'family',
    location_slug: null,
    keywords: ['CRAFT', 'family therapy', 'enabling', 'encouraging treatment'],
    priority: 7,
  },
  {
    title: 'How Trauma and Addiction Are Connected',
    topic: 'mental-health',
    location_slug: null,
    keywords: ['trauma addiction', 'PTSD', 'ACEs', 'childhood trauma'],
    priority: 8,
  },
  {
    title: 'Naltrexone for Alcohol Addiction: Does It Work?',
    topic: 'medication',
    location_slug: null,
    keywords: ['naltrexone', 'Sinclair method', 'alcohol medication', 'craving reduction'],
    priority: 7,
  },
  {
    title: 'Functional Alcoholism: When You Look Fine But Aren\'t',
    topic: 'alcohol',
    location_slug: null,
    keywords: ['functional alcoholic', 'high functioning', 'alcohol denial', 'hidden drinking'],
    priority: 9,
  },
  {
    title: 'Dry January and Beyond: How to Make Alcohol-Free Months Last',
    topic: 'alcohol',
    location_slug: null,
    keywords: ['dry January', 'alcohol-free', 'sober curious', 'moderation'],
    priority: 8,
  },
  {
    title: 'How to Find a Narcotics Anonymous Meeting Near You',
    topic: 'recovery',
    location_slug: null,
    keywords: ['NA meetings', 'Narcotics Anonymous', 'find meetings', 'drug addiction support'],
    priority: 7,
  },
  {
    title: 'ADHD and Substance Use: Understanding the Link',
    topic: 'mental-health',
    location_slug: null,
    keywords: ['ADHD addiction', 'self-medication', 'neurodivergent', 'substance use'],
    priority: 7,
  },
  {
    title: 'What Does Evidence-Based Addiction Treatment Actually Mean?',
    topic: 'rehab',
    location_slug: null,
    keywords: ['evidence-based', 'NICE guidelines', 'addiction treatment', 'research'],
    priority: 6,
  },
  {
    title: 'Codependency and Addiction: A Guide for Partners and Families',
    topic: 'family',
    location_slug: null,
    keywords: ['codependency', 'enabling', 'partner addiction', 'setting boundaries'],
    priority: 7,
  },
  {
    title: 'The Alcohol Units Guide: What You\'re Actually Drinking',
    topic: 'alcohol',
    location_slug: null,
    keywords: ['alcohol units', 'safe drinking limits', 'weekly units', 'alcohol measures'],
    priority: 8,
  },
  {
    title: 'Heroin Addiction in the UK: Treatment Options and Recovery Rates',
    topic: 'opioids',
    location_slug: null,
    keywords: ['heroin addiction', 'opiate treatment', 'recovery heroin', 'UK drug policy'],
    priority: 7,
  },
  {
    title: 'What Is Mindfulness-Based Relapse Prevention?',
    topic: 'therapy',
    location_slug: null,
    keywords: ['MBRP', 'mindfulness addiction', 'meditation recovery', 'relapse prevention'],
    priority: 6,
  },
  {
    title: 'How to Stay Sober at Social Events',
    topic: 'recovery',
    location_slug: null,
    keywords: ['sober socialising', 'alcohol-free events', 'peer pressure', 'social drinking'],
    priority: 8,
  },
  {
    title: 'Alcohol-Related Brain Damage: What It Is and Can It Be Reversed?',
    topic: 'alcohol',
    location_slug: null,
    keywords: ['ARBD', 'Wernicke', 'Korsakoff', 'alcohol brain damage'],
    priority: 7,
  },
  {
    title: 'Young People and Addiction: How Drug Use Differs in Under-25s',
    topic: 'young-people',
    location_slug: null,
    keywords: ['youth addiction', 'teen drug use', 'young people alcohol', 'adolescent treatment'],
    priority: 7,
  },
  {
    title: 'Grief, Loss, and the Risk of Alcohol Use',
    topic: 'mental-health',
    location_slug: null,
    keywords: ['grief drinking', 'bereavement alcohol', 'loss and addiction', 'coping mechanisms'],
    priority: 7,
  },

  // ── LOCATION-SPECIFIC (major UK cities) ─────────────────────────────────────
  {
    title: 'Alcohol Rehab in London: What Are Your Options in 2025?',
    topic: 'rehab',
    location_slug: 'london',
    keywords: ['alcohol rehab London', 'private rehab London', 'NHS London', 'London addiction'],
    priority: 10,
  },
  {
    title: 'Drug Addiction Help in Manchester: NHS and Private Services Explained',
    topic: 'rehab',
    location_slug: 'manchester',
    keywords: ['drug rehab Manchester', 'Manchester addiction', 'NHS Manchester', 'private Manchester'],
    priority: 10,
  },
  {
    title: 'Finding Rehab in Birmingham: A Complete Local Guide',
    topic: 'rehab',
    location_slug: 'birmingham',
    keywords: ['rehab Birmingham', 'alcohol Birmingham', 'drug treatment Birmingham'],
    priority: 9,
  },
  {
    title: 'Cocaine Addiction Help in Leeds: Local Resources and Treatment',
    topic: 'cocaine',
    location_slug: 'leeds',
    keywords: ['cocaine Leeds', 'drug help Leeds', 'rehab Leeds', 'treatment Leeds'],
    priority: 9,
  },
  {
    title: 'Private Alcohol Rehab in Bristol: Costs, Centres, and What to Expect',
    topic: 'rehab',
    location_slug: 'bristol',
    keywords: ['rehab Bristol', 'alcohol Bristol', 'private rehab Bristol', 'detox Bristol'],
    priority: 9,
  },
  {
    title: 'Addiction Support in Liverpool: From NHS Referral to Private Rehab',
    topic: 'rehab',
    location_slug: 'liverpool',
    keywords: ['rehab Liverpool', 'addiction Liverpool', 'drug help Liverpool'],
    priority: 9,
  },
  {
    title: 'Drug Rehab in Sheffield: Local Treatment Centres and Support Groups',
    topic: 'rehab',
    location_slug: 'sheffield',
    keywords: ['drug rehab Sheffield', 'addiction Sheffield', 'Sheffield treatment'],
    priority: 8,
  },
  {
    title: 'Alcohol Addiction Help in Edinburgh: NHS and Private Options',
    topic: 'rehab',
    location_slug: 'edinburgh',
    keywords: ['alcohol rehab Edinburgh', 'addiction Edinburgh', 'Scotland rehab'],
    priority: 8,
  },
  {
    title: 'Rehab Centres in Glasgow: Costs, Types, and How to Access Help',
    topic: 'rehab',
    location_slug: 'glasgow',
    keywords: ['rehab Glasgow', 'Glasgow addiction', 'drug treatment Scotland'],
    priority: 8,
  },
  {
    title: 'Getting Addiction Help in Cardiff: Local Services and Private Rehab',
    topic: 'rehab',
    location_slug: 'cardiff',
    keywords: ['rehab Cardiff', 'addiction Cardiff', 'Wales drug treatment'],
    priority: 8,
  },
  {
    title: 'Heroin and Opioid Treatment in Nottingham: Your Local Options',
    topic: 'opioids',
    location_slug: 'nottingham',
    keywords: ['heroin Nottingham', 'opioid Nottingham', 'drug treatment Nottingham'],
    priority: 7,
  },
  {
    title: 'Sober Living After Rehab in Brighton: Housing and Support',
    topic: 'sober-living',
    location_slug: 'brighton',
    keywords: ['sober living Brighton', 'aftercare Brighton', 'recovery housing Brighton'],
    priority: 7,
  },
  {
    title: 'Alcohol and Drug Detox in Southampton: What\'s Available Locally',
    topic: 'detox',
    location_slug: 'southampton',
    keywords: ['detox Southampton', 'alcohol detox Southampton', 'drug detox Southampton'],
    priority: 7,
  },
  {
    title: 'Addiction Counsellors in Newcastle: Local Therapists and Support',
    topic: 'counselling',
    location_slug: 'newcastle-upon-tyne',
    keywords: ['counsellor Newcastle', 'therapist Newcastle', 'addiction therapy Newcastle'],
    priority: 7,
  },
  {
    title: 'AA Meetings in Oxford: Finding Local Alcoholics Anonymous Groups',
    topic: 'aa-meetings',
    location_slug: 'oxford',
    keywords: ['AA Oxford', 'Alcoholics Anonymous Oxford', 'meetings Oxford', 'sober Oxford'],
    priority: 7,
  },
  {
    title: 'Drug and Alcohol Support in Leicester: Local Services Guide',
    topic: 'rehab',
    location_slug: 'leicester',
    keywords: ['rehab Leicester', 'drug help Leicester', 'alcohol Leicester'],
    priority: 7,
  },
  {
    title: 'Cocaine Addiction in London: Treatment, Costs, and Where to Start',
    topic: 'cocaine',
    location_slug: 'london',
    keywords: ['cocaine London', 'cocaine treatment London', 'private cocaine rehab London'],
    priority: 9,
  },
  {
    title: 'NHS Alcohol Treatment in Manchester: How to Self-Refer',
    topic: 'alcohol',
    location_slug: 'manchester',
    keywords: ['NHS alcohol Manchester', 'self-refer Manchester', 'free treatment Manchester'],
    priority: 8,
  },
  {
    title: 'Residential Rehab Near Birmingham: Private Centres and NHS Beds',
    topic: 'rehab',
    location_slug: 'birmingham',
    keywords: ['residential rehab Birmingham', 'inpatient Birmingham', 'rehab beds Birmingham'],
    priority: 8,
  },
  {
    title: 'Family Support Groups in Leeds: Al-Anon and Adfam Resources',
    topic: 'family',
    location_slug: 'leeds',
    keywords: ['Al-Anon Leeds', 'family support Leeds', 'Adfam Leeds', 'addiction family Leeds'],
    priority: 7,
  },
  {
    title: 'Alcohol Detox at Home vs Hospital in Bristol: What\'s Safer?',
    topic: 'detox',
    location_slug: 'bristol',
    keywords: ['home detox Bristol', 'hospital detox Bristol', 'alcohol detox Bristol', 'safe detox'],
    priority: 8,
  },
  {
    title: 'Dual Diagnosis Treatment in Liverpool: Addiction and Mental Health',
    topic: 'mental-health',
    location_slug: 'liverpool',
    keywords: ['dual diagnosis Liverpool', 'mental health addiction Liverpool'],
    priority: 7,
  },
  {
    title: 'NA Meetings in Sheffield: Narcotics Anonymous in South Yorkshire',
    topic: 'na-meetings',
    location_slug: 'sheffield',
    keywords: ['NA Sheffield', 'Narcotics Anonymous Sheffield', 'drug recovery Sheffield'],
    priority: 6,
  },
  {
    title: 'Prescription Drug Addiction Help in Edinburgh',
    topic: 'prescription-drugs',
    location_slug: 'edinburgh',
    keywords: ['prescription drugs Edinburgh', 'benzo Edinburgh', 'opiate Edinburgh'],
    priority: 7,
  },
  {
    title: 'Cannabis Addiction Support in Glasgow: Local Services',
    topic: 'cannabis',
    location_slug: 'glasgow',
    keywords: ['cannabis Glasgow', 'weed addiction Glasgow', 'drug support Glasgow'],
    priority: 6,
  },
  {
    title: 'Outpatient Rehab in Cardiff: Day Programmes and Community Support',
    topic: 'rehab',
    location_slug: 'cardiff',
    keywords: ['outpatient Cardiff', 'day programme Cardiff', 'community rehab Cardiff'],
    priority: 7,
  },
  {
    title: 'How to Access Suboxone Treatment in Nottingham',
    topic: 'opioids',
    location_slug: 'nottingham',
    keywords: ['Suboxone Nottingham', 'buprenorphine Nottingham', 'opiate substitute Nottingham'],
    priority: 6,
  },
  {
    title: 'Finding an Addiction Therapist in Brighton: What to Look For',
    topic: 'counselling',
    location_slug: 'brighton',
    keywords: ['therapist Brighton', 'addiction counsellor Brighton', 'BACP Brighton'],
    priority: 6,
  },
  {
    title: 'Alcohol-Related Hospital Admissions in Southampton: Local Context',
    topic: 'alcohol',
    location_slug: 'southampton',
    keywords: ['alcohol Southampton', 'hospital admissions Southampton', 'drinking statistics'],
    priority: 6,
  },
  {
    title: 'Young People\'s Drug Services in Newcastle: What\'s Available Under 25',
    topic: 'young-people',
    location_slug: 'newcastle-upon-tyne',
    keywords: ['youth services Newcastle', 'young people drugs Newcastle', 'under 25 support'],
    priority: 7,
  },
  {
    title: 'Private Detox in London: What Does It Cost and What Does It Include?',
    topic: 'detox',
    location_slug: 'london',
    keywords: ['private detox London', 'medicated detox London', 'alcohol detox London cost'],
    priority: 9,
  },
  {
    title: 'Aftercare Planning After Rehab in Manchester: Staying Sober',
    topic: 'recovery',
    location_slug: 'manchester',
    keywords: ['aftercare Manchester', 'post-rehab Manchester', 'staying sober Manchester'],
    priority: 8,
  },
  {
    title: 'Addiction Recovery Coaching in Birmingham: A New Approach',
    topic: 'counselling',
    location_slug: 'birmingham',
    keywords: ['recovery coaching Birmingham', 'addiction coach Birmingham'],
    priority: 6,
  },
  {
    title: 'Harm Reduction Services in Leeds: Needle Exchanges and Safe Use Guidance',
    topic: 'harm-reduction',
    location_slug: 'leeds',
    keywords: ['harm reduction Leeds', 'needle exchange Leeds', 'safe injecting Leeds'],
    priority: 6,
  },
  {
    title: 'Alcohol-Free Living in Bristol: Sober Bars, Events, and Community',
    topic: 'recovery',
    location_slug: 'bristol',
    keywords: ['sober Bristol', 'alcohol-free Bristol', 'sober community Bristol'],
    priority: 7,
  },
]

// ─── Insert into Supabase ─────────────────────────────────────────────────────

async function run() {
  console.log(`Inserting ${articles.length} articles into article_queue...`)

  const rows = articles.map(a => ({
    ...a,
    status: 'pending',
  }))

  // Insert in batches of 20 to avoid payload limits
  const batchSize = 20
  let inserted = 0
  for (let i = 0; i < rows.length; i += batchSize) {
    const batch = rows.slice(i, i + batchSize)
    const { error } = await supabase.from('article_queue').insert(batch)
    if (error) {
      console.error(`Batch ${i / batchSize + 1} failed:`, error.message)
    } else {
      inserted += batch.length
      console.log(`  ✓ Batch ${Math.ceil(i / batchSize) + 1}: ${batch.length} rows inserted (${inserted} total)`)
    }
  }

  console.log(`\nDone. ${inserted}/${articles.length} articles queued.`)
  console.log('The cron at /api/cron/generate-article will process one per run.')
  console.log('To generate faster, hit that endpoint manually or increase cron frequency.')
}

run().catch(console.error)

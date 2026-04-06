/**
 * app/api/admin/seed-articles/route.ts
 *
 * One-time seeder — POSTs 300 article ideas to article_queue.
 * Call: POST /api/admin/seed-articles
 * Headers: Authorization: Bearer sobernation-link-check-2026
 */

import { NextResponse } from 'next/server'
import { getSupabase } from '../../../../lib/articles'

const CITIES = [
  { name: 'London', slug: 'london' },
  { name: 'Manchester', slug: 'manchester' },
  { name: 'Birmingham', slug: 'birmingham' },
  { name: 'Leeds', slug: 'leeds' },
  { name: 'Liverpool', slug: 'liverpool' },
  { name: 'Sheffield', slug: 'sheffield' },
  { name: 'Bristol', slug: 'bristol' },
  { name: 'Edinburgh', slug: 'edinburgh' },
  { name: 'Glasgow', slug: 'glasgow' },
  { name: 'Cardiff', slug: 'cardiff' },
  { name: 'Newcastle', slug: 'newcastle' },
  { name: 'Nottingham', slug: 'nottingham' },
  { name: 'Leicester', slug: 'leicester' },
  { name: 'Brighton', slug: 'brighton' },
  { name: 'Exeter', slug: 'exeter' },
  { name: 'Oxford', slug: 'oxford' },
  { name: 'Cambridge', slug: 'cambridge' },
  { name: 'Coventry', slug: 'coventry' },
  { name: 'Reading', slug: 'reading' },
  { name: 'Southampton', slug: 'southampton' },
]

function locationArticles() {
  const items = []
  for (const city of CITIES) {
    items.push(
      { title: `Alcohol Rehab in ${city.name}: Your Complete 2025 Guide`, topic: 'location', location_slug: city.slug, keywords: ['alcohol', 'rehab', 'detox', 'NHS', 'private', city.name], priority: 9 },
      { title: `Drug Treatment in ${city.name}: NHS and Private Options Explained`, topic: 'location', location_slug: city.slug, keywords: ['drug treatment', 'rehab', 'recovery', city.name], priority: 9 },
      { title: `Cocaine Addiction Help in ${city.name}: Where to Turn`, topic: 'location', location_slug: city.slug, keywords: ['cocaine', 'addiction', 'treatment', city.name], priority: 8 },
      { title: `Heroin and Opiate Treatment in ${city.name}`, topic: 'location', location_slug: city.slug, keywords: ['heroin', 'opiates', 'methadone', 'treatment', city.name], priority: 8 },
      { title: `Finding a Detox Centre Near ${city.name}: What to Expect`, topic: 'location', location_slug: city.slug, keywords: ['detox', 'withdrawal', 'centre', city.name], priority: 7 },
    )
  }
  return items
}

const MILESTONES = [
  { days: '24 Hours', label: '24 hours sober', keywords: ['withdrawal', 'detox', 'first day'], priority: 8 },
  { days: '3 Days', label: '3 days sober', keywords: ['alcohol withdrawal', 'detox', 'timeline'], priority: 8 },
  { days: '1 Week', label: '1 week sober', keywords: ['sober week', 'benefits', 'withdrawal ends'], priority: 9 },
  { days: '10 Days', label: '10 days sober', keywords: ['early sobriety', 'sleep', 'clarity'], priority: 7 },
  { days: '2 Weeks', label: '2 weeks sober', keywords: ['two weeks', 'physical recovery', 'liver'], priority: 8 },
  { days: '21 Days', label: '21 days sober', keywords: ['habit change', 'three weeks', 'routine'], priority: 7 },
  { days: '30 Days', label: '30 days sober', keywords: ['one month', 'mental health', 'benefits'], priority: 10 },
  { days: '60 Days', label: '60 days sober', keywords: ['two months', 'relationships', 'confidence'], priority: 8 },
  { days: '75 Days', label: '75 days sober', keywords: ['milestone', 'progress', 'recovery'], priority: 6 },
  { days: '90 Days', label: '90 days sober', keywords: ['three months', 'brain recovery', 'AA'], priority: 9 },
  { days: '100 Days', label: '100 days sober', keywords: ['100 days', 'milestone', 'maintaining sobriety'], priority: 8 },
  { days: '6 Months', label: '6 months sober', keywords: ['half year', 'liver health', 'social life'], priority: 9 },
  { days: '9 Months', label: '9 months sober', keywords: ['nine months', 'emotional sobriety'], priority: 7 },
  { days: '1 Year', label: '1 year sober', keywords: ['soberversary', 'one year', 'celebrate'], priority: 10 },
  { days: '18 Months', label: '18 months sober', keywords: ['long-term recovery', 'identity', 'PAWS'], priority: 7 },
  { days: '2 Years', label: '2 years sober', keywords: ['two years', 'sustained recovery', 'purpose'], priority: 8 },
  { days: '3 Years', label: '3 years sober', keywords: ['long term', 'life transformed', 'gratitude'], priority: 7 },
  { days: '5 Years', label: '5 years sober', keywords: ['five years', 'sobriety anniversary', 'legacy'], priority: 8 },
]

const EXPLAINERS = [
  { title: 'Am I an Alcoholic? 10 Honest Questions to Ask Yourself', keywords: ['alcoholism', 'signs', 'audit test', 'dependency'] },
  { title: 'What Is the Difference Between Detox and Rehab?', keywords: ['detox', 'rehabilitation', 'treatment stages'] },
  { title: 'How Long Does Rehab Take? NHS vs Private Timelines', keywords: ['rehab duration', '28 days', '12 weeks', 'NHS'] },
  { title: 'Can You Get Free Rehab on the NHS in the UK?', keywords: ['NHS rehab', 'free treatment', 'funding', 'referral'] },
  { title: 'What Happens on the First Day of Rehab?', keywords: ['first day', 'admission', 'assessment', 'what to bring'] },
  { title: 'How Do I Help a Family Member With Addiction?', keywords: ['family support', 'intervention', 'Al-Anon', 'codependency'] },
  { title: 'What Is Dual Diagnosis and Why Does It Matter?', keywords: ['dual diagnosis', 'mental health', 'co-occurring disorders'] },
  { title: 'Private Rehab vs NHS: Which Is Right for You?', keywords: ['private rehab', 'NHS', 'cost', 'waiting times', 'comparison'] },
  { title: 'What Is an Alcohol Intervention?', keywords: ['intervention', 'family', 'CRAFT', 'helping someone'] },
  { title: 'How to Tell Your Employer You\'re Going to Rehab', keywords: ['work', 'employment rights', 'privacy', 'sick leave'] },
  { title: 'What Is SMART Recovery?', keywords: ['SMART recovery', 'self-management', '12 steps alternative'] },
  { title: 'Alcoholics Anonymous: What to Expect at Your First Meeting', keywords: ['AA', '12 steps', 'meetings', 'anonymity'] },
  { title: 'What Is Naltrexone Implant Treatment?', keywords: ['naltrexone', 'implant', 'anti-craving', 'medication'] },
  { title: 'Can You Detox From Alcohol at Home?', keywords: ['home detox', 'risks', 'medical supervision', 'safety'] },
  { title: 'What Is PAWS (Post-Acute Withdrawal Syndrome)?', keywords: ['PAWS', 'prolonged withdrawal', 'brain recovery'] },
  { title: 'How Does Cognitive Behavioural Therapy Help Addiction?', keywords: ['CBT', 'therapy', 'relapse prevention', 'thought patterns'] },
  { title: 'What Is the 12-Step Programme? A Beginner\'s Guide', keywords: ['12 steps', 'AA', 'NA', 'higher power', 'recovery'] },
  { title: 'How Do I Know If My Drinking Is a Problem?', keywords: ['alcoholism', 'units', 'binge drinking', 'dependency'] },
  { title: 'What to Pack for Rehab: A Complete Checklist', keywords: ['what to bring', 'rehab checklist', 'clothes', 'phones'] },
  { title: 'Can Addiction Be Cured? What the Science Says', keywords: ['addiction science', 'brain disease', 'recovery', 'relapse'] },
]

const SUBSTANCES = [
  { name: 'Cocaine', slug: 'cocaine', keywords: ['cocaine addiction', 'crack', 'symptoms', 'UK treatment'] },
  { name: 'Heroin', slug: 'heroin', keywords: ['heroin addiction', 'opiates', 'methadone', 'NA'] },
  { name: 'Alcohol', slug: 'alcohol', keywords: ['alcoholism', 'physical dependency', 'liver', 'withdrawal'] },
  { name: 'Cannabis', slug: 'cannabis', keywords: ['cannabis use disorder', 'weed dependency', 'psychosis'] },
  { name: 'Ketamine', slug: 'ketamine', keywords: ['ketamine addiction', 'bladder damage', 'dissociative'] },
  { name: 'Pregabalin', slug: 'pregabalin', keywords: ['pregabalin', 'lyrica', 'gabapentin', 'prescription addiction'] },
  { name: 'MDMA', slug: 'mdma', keywords: ['MDMA', 'ecstasy', 'serotonin', 'comedowns'] },
  { name: 'Benzodiazepines', slug: 'benzodiazepines', keywords: ['benzos', 'diazepam', 'xanax', 'prescription', 'withdrawal'] },
  { name: 'Methamphetamine', slug: 'methamphetamine', keywords: ['meth', 'crystal meth', 'UK prevalence', 'treatment'] },
  { name: 'Spice', slug: 'synthetic-cannabinoids', keywords: ['spice', 'mamba', 'synthetic cannabis', 'street drug'] },
  { name: 'Crack Cocaine', slug: 'crack-cocaine', keywords: ['crack', 'freebase', 'addiction', 'treatment UK'] },
  { name: 'Opioid Painkillers', slug: 'opioid-painkillers', keywords: ['codeine', 'tramadol', 'oxycodone', 'prescription opioids'] },
]

const GUIDES = [
  { title: 'How to Tell Your Family You\'re Going to Rehab', keywords: ['family', 'honesty', 'support', 'conversation'] },
  { title: 'Relapse: What It Means, Why It Happens and What to Do', keywords: ['relapse', 'triggers', 'recovery', 'what next'] },
  { title: 'Life After Rehab: Building a Sober Routine That Sticks', keywords: ['aftercare', 'routine', 'sober living', 'structure'] },
  { title: 'How to Stay Sober at Christmas and Family Events', keywords: ['sober Christmas', 'triggers', 'social events', 'avoiding alcohol'] },
  { title: 'Sober Dating: How to Navigate Relationships in Recovery', keywords: ['dating sober', 'relationships', 'disclosure', 'loneliness'] },
  { title: 'How to Support a Loved One in Recovery Without Enabling', keywords: ['codependency', 'support', 'enabling', 'family'] },
  { title: 'Mindfulness and Meditation in Addiction Recovery', keywords: ['mindfulness', 'meditation', 'anxiety', 'cravings'] },
  { title: 'Exercise and Sobriety: How Physical Health Boosts Recovery', keywords: ['exercise', 'running', 'endorphins', 'mental health'] },
  { title: 'The Role of Nutrition in Alcohol and Drug Recovery', keywords: ['nutrition', 'diet', 'gut health', 'recovery food'] },
  { title: 'How to Handle Cravings: 8 Evidence-Based Strategies', keywords: ['cravings', 'urge surfing', 'delay tactics', 'triggers'] },
  { title: 'Returning to Work After Rehab: Your Rights and Options', keywords: ['work', 'employment', 'returning', 'confidence'] },
  { title: 'The Financial Cost of Addiction — and How to Rebuild', keywords: ['debt', 'finances', 'cost of addiction', 'budgeting sober'] },
]

const STATS = [
  { title: 'UK Drug-Related Deaths 2024: The Full Picture', keywords: ['UK statistics', 'drug deaths', 'ONS', 'opioids'] },
  { title: 'Alcohol Misuse in the UK: Key Statistics for 2025', keywords: ['alcohol statistics', 'UK', 'NHS cost', 'units'] },
  { title: 'How Many People Go to Rehab in the UK Each Year?', keywords: ['UK rehab statistics', 'NDTMS', 'treatment numbers'] },
  { title: 'Young People and Addiction: The Growing Crisis in the UK', keywords: ['youth addiction', 'teenagers', 'cannabis', 'alcohol'] },
  { title: 'The True Cost of Addiction to UK Employers', keywords: ['workplace addiction', 'productivity', 'sick days', 'cost'] },
  { title: 'NHS Addiction Services: What\'s Available in 2025', keywords: ['NHS services', 'drug treatment', 'alcohol', 'IAPT'] },
]

function buildQueue() {
  const queue = []

  // Batch 1: Location × Addiction
  queue.push(...locationArticles())

  // Batch 2: Milestones
  for (const m of MILESTONES) {
    queue.push({
      title: `${m.days} Sober: What's Happening to Your Body and Mind`,
      topic: 'milestone',
      location_slug: null,
      keywords: m.keywords,
      priority: m.priority,
    })
  }

  // Batch 3: Explainers
  for (const e of EXPLAINERS) {
    queue.push({ title: e.title, topic: 'explainer', location_slug: null, keywords: e.keywords, priority: 7 })
  }

  // Batch 4: Substance deep dives
  for (const s of SUBSTANCES) {
    queue.push({
      title: `${s.name} Addiction Explained: Signs, Risks and UK Treatment Options`,
      topic: 'substance',
      location_slug: null,
      keywords: s.keywords,
      priority: 8,
    })
  }

  // Batch 5: Recovery guides
  for (const g of GUIDES) {
    queue.push({ title: g.title, topic: 'guide', location_slug: null, keywords: g.keywords, priority: 6 })
  }

  // Batch 6: UK stats/news
  for (const s of STATS) {
    queue.push({ title: s.title, topic: 'stats', location_slug: null, keywords: s.keywords, priority: 7 })
  }

  return queue
}

export async function POST(req: Request) {
  const auth = req.headers.get('authorization')
  if (auth !== `Bearer ${process.env.NEXT_PUBLIC_ADMIN_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  }

  const supabase = getSupabase()
  const queue = buildQueue()

  // Insert in batches of 50
  const BATCH = 50
  let inserted = 0
  for (let i = 0; i < queue.length; i += BATCH) {
    const batch = queue.slice(i, i + BATCH)
    const { error } = await supabase.from('article_queue').insert(batch)
    if (error) {
      console.error('Seed batch error:', error)
    } else {
      inserted += batch.length
    }
  }

  return NextResponse.json({ success: true, inserted, total: queue.length })
}

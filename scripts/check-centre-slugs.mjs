#!/usr/bin/env node
/**
 * Check specific centre slugs that the scanner flagged.
 */
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const rehabData = JSON.parse(readFileSync(join(root, 'data/rehabs.json'), 'utf-8'))

function toCentreSlug(name, townSlug) {
  return name.toLowerCase().replace(/['']/g,'').replace(/[^a-z0-9\s]/g,'').replace(/\s+/g,'-').replace(/-+/g,'-').trim() + '-' + townSlug
}

const centreBySlug = new Map()
for (const [townSlug, townData] of Object.entries(rehabData.byTown)) {
  for (const centre of townData.centres) {
    centreBySlug.set(toCentreSlug(centre.name, townSlug), { ...centre, townSlug })
  }
}

// Test the flagged slugs
const flagged = [
  'chart-kirklees-kirklees',
  'priestley-unit-kirklees',
  'addressing-addictions-hq-worcestershire',
  'barnt-green-worcestershire',
  'yeldall-manor-wokingham',
  'cranstoun-wokingham-wokingham',
  'charis-primary-programme-tower-hamlets',
  'tower-hamlets-stop-tobacco-service-tower-hamlets',
  'complete-care-agency-ltd-leeds',
  'st-annes-community-services-alcohol-services-leeds',
  'calderdale-recovery-steps-carlton-street-calderdale',
  'the-dales-calderdale',
  'nurse-plus-uk-newton-abbot-devon',
  'together-devon-exeter-hub-devon',
  'broadway-lodge-north-somerset',
  'westcliffe-house-limited-north-somerset',
  'the-berkeley-flats-gloucestershire',
  'nelson-house-gloucestershire',
]

console.log(`Total slugs in map: ${centreBySlug.size}`)
console.log('\nChecking flagged slugs:')
for (const slug of flagged) {
  const found = centreBySlug.has(slug)
  console.log(`  [${found ? 'OK' : 'MISSING'}] ${slug}`)
}

// Find similar slugs for missing ones
console.log('\nAll kirklees slugs in map:')
for (const [k] of centreBySlug) { if (k.includes('kirklees')) console.log(' ', k) }
console.log('\nAll calderdale slugs in map:')
for (const [k] of centreBySlug) { if (k.includes('calderdale')) console.log(' ', k) }
console.log('\nAll north-somerset slugs:')
for (const [k] of centreBySlug) { if (k.includes('north-somerset')) console.log(' ', k) }
console.log('\nAll gloucestershire slugs:')
for (const [k] of centreBySlug) { if (k.includes('gloucestershire')) console.log(' ', k) }

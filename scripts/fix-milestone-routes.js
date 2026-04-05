/**
 * fix-milestone-routes.js
 *
 * Changes days-sober, days-clean, weeks-sober, months-sober, years-sober routes to:
 * 1. dynamicParams = true  (ALL pages still work via ISR)
 * 2. generateStaticParams returns only ~20 key milestones  (not 7300 pages)
 *
 * Before: 7300 + 7300 + 520 + 120 + 50 = ~15,290 generated pages at build time
 * After:  ~100 generated pages at build time
 */

const fs = require('fs');
const path = require('path');
const appDir = path.join(__dirname, '../app');

// Key milestone values to pre-build for each type
const KEY_DAYS   = [1,2,3,4,5,6,7,10,14,21,28,30,45,60,75,90,100,120,150,180,200,250,300,365,400,500,600,730,1000,1095,1460,1825,2555,3650,7300];
const KEY_WEEKS  = [1,2,3,4,5,6,7,8,10,12,16,20,26,52,78,104,156,208,260,520];
const KEY_MONTHS = [1,2,3,4,5,6,7,8,9,10,11,12,18,24,30,36,48,60,84,120];
const KEY_YEARS  = [1,2,3,4,5,6,7,8,9,10,15,20,25,30,40,50];

const routes = [
  {
    dir: 'days-sober/[n]',
    paramName: 'n',
    keys: KEY_DAYS,
    oldPattern: /export const dynamicParams = false\s*\n\s*const MAX_DAYS = \d+\s*\n\s*export async function generateStaticParams\(\) \{\s*\n\s*return Array\.from\(\{ length: MAX_DAYS \}[^}]+\}\)/s,
    replacement: `export const dynamicParams = true\nexport const revalidate = 604800 // ISR 7 days\n\n// Pre-build key milestones only — all other days generate via ISR\nexport async function generateStaticParams() {\n  return [${KEY_DAYS.join(',')}].map(n => ({ n: String(n) }))\n}`,
  },
  {
    dir: 'days-clean/[n]',
    paramName: 'n',
    keys: KEY_DAYS,
    oldPattern: /export const dynamicParams = false\s*\n\s*const MAX_DAYS = \d+\s*\n\s*export async function generateStaticParams\(\) \{\s*\n\s*return Array\.from\(\{ length: MAX_DAYS \}[^}]+\}\)/s,
    replacement: `export const dynamicParams = true\nexport const revalidate = 604800 // ISR 7 days\n\n// Pre-build key milestones only — all other days generate via ISR\nexport async function generateStaticParams() {\n  return [${KEY_DAYS.join(',')}].map(n => ({ n: String(n) }))\n}`,
  },
  {
    dir: 'weeks-sober/[n]',
    paramName: 'n',
    keys: KEY_WEEKS,
  },
  {
    dir: 'months-sober/[n]',
    paramName: 'n',
    keys: KEY_MONTHS,
  },
  {
    dir: 'years-sober/[n]',
    paramName: 'n',
    keys: KEY_YEARS,
  },
];

routes.forEach(({ dir, keys }) => {
  const file = path.join(appDir, dir, 'page.tsx');
  if (!fs.existsSync(file)) {
    console.log('SKIP (not found):', dir);
    return;
  }

  let c = fs.readFileSync(file, 'utf8');
  const orig = c;

  // 1. Replace dynamicParams = false with true
  c = c.replace('export const dynamicParams = false', 'export const dynamicParams = true');

  // 2. Add revalidate if not present
  if (!c.includes('export const revalidate')) {
    c = c.replace('export const dynamicParams = true', 'export const dynamicParams = true\nexport const revalidate = 604800 // ISR 7 days');
  }

  // 3. Replace generateStaticParams body — find the function and replace its return statement
  // Pattern: the function body contains Array.from({ length: ... }) or similar large array generation
  c = c.replace(
    /export async function generateStaticParams\(\) \{[\s\S]*?\}/,
    `export async function generateStaticParams() {\n  // Pre-build key milestones only — all ${dir.split('/')[0]} pages work via ISR\n  return [${keys.join(', ')}].map(n => ({ n: String(n) }))\n}`
  );

  if (c !== orig) {
    fs.writeFileSync(file, c, 'utf8');
    console.log('✓ Fixed:', dir, `(${keys.length} pre-built milestones)`);
  } else {
    console.log('~ No change:', dir, '(check manually)');
  }
});

console.log('\nBefore: ~15,290 milestone pages at build time');
console.log('After:  ~' + (KEY_DAYS.length * 2 + KEY_WEEKS.length + KEY_MONTHS.length + KEY_YEARS.length) + ' milestone pages pre-built');
console.log('All other milestones generate via ISR on first request');

/**
 * fix-substance-pages.js
 *
 * Fix two things:
 *
 * 1. All substance+location page.tsx files that the mass-update script mangled
 *    (merged two lines into one, left orphan `centres` / `hasCqc` refs)
 *    → rewrite them to a clean minimal template
 *
 * 2. SubstanceLocationPage.tsx
 *    → remove `centres` / `hasCqc` props, call getRehabsForLocation internally,
 *      swap CentreCard for NearestCentres
 */

const fs = require('fs');
const path = require('path');
const appDir = path.join(__dirname, '../app');

// ── 1. Rewrite broken substance page.tsx → [location]/page.tsx ────────────────

// Find substance route dirs (those that use SubstanceLocationPage)
const substanceRoutes = [];
function walk(dir) {
  fs.readdirSync(dir).forEach(f => {
    const full = path.join(dir, f);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      walk(full);
    } else if (f === 'page.tsx' && path.basename(dir) === '[location]') {
      const c = fs.readFileSync(full, 'utf8');
      if (c.includes('SubstanceLocationPage') && (c.includes('centres={centres}') || c.includes('centres={') || c.includes('notFound()  return'))) {
        substanceRoutes.push({ file: full, content: c });
      }
    }
  });
}
walk(appDir);

console.log(`Found ${substanceRoutes.length} broken substance page.tsx files`);

for (const { file, content } of substanceRoutes) {
  // Extract the important bits we need: the import for substanceLocationMetadata, the SUBSTANCE_CONFIGS key, the component name
  const substanceKeyMatch = content.match(/SUBSTANCE_CONFIGS\['([^']+)'\]/);
  const substanceKey = substanceKeyMatch ? substanceKeyMatch[1] : null;

  const metadataFnMatch = content.match(/import\s*\{([^}]+)\}\s*from\s*['"]\.\.\/\.\.\/\.\.\/lib\/seo['"]/);
  const metadataFn = metadataFnMatch
    ? (metadataFnMatch[1].includes('substanceLocationMetadata') ? 'substanceLocationMetadata' : 'locationMetadata')
    : 'substanceLocationMetadata';

  const configImportMatch = content.match(/import\s*\{([^}]+)\}\s*from\s*['"]\.\.\/\.\.\/\.\.\/lib\/substances['"]/);
  const configConst = configImportMatch ? configImportMatch[1].trim() : 'SUBSTANCE_CONFIGS';

  if (!substanceKey) {
    console.log('  ⚠ Could not extract substance key from', path.relative(appDir, file));
    continue;
  }

  const cleanPage = `import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getLocationSlugs, getLocation } from '../../../lib/locations'
import { ${metadataFn} } from '../../../lib/seo'
import { ${configConst} } from '../../../lib/substances'
import SubstanceLocationPage from '../../../components/SubstanceLocationPage'

const SUBSTANCE = SUBSTANCE_CONFIGS['${substanceKey}']

export const dynamicParams = false

export async function generateStaticParams() {
  return getLocationSlugs().map(location => ({ location }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ location: string }> }
): Promise<Metadata> {
  const { location } = await params
  const loc = getLocation(location)
  if (!loc) return {}
  return ${metadataFn}(SUBSTANCE.slug, SUBSTANCE.name, loc.name)
}

export default async function Page(
  { params }: { params: Promise<{ location: string }> }
) {
  const { location } = await params
  const loc = getLocation(location)
  if (!loc) notFound()
  return <SubstanceLocationPage substance={SUBSTANCE} loc={loc} locationSlug={location} />
}
`;

  fs.writeFileSync(file, cleanPage, 'utf8');
  console.log('  ✓ Fixed', path.relative(appDir, file));
}

console.log('\nDone fixing page.tsx files.');
console.log('\nNext: update SubstanceLocationPage.tsx to remove centres/hasCqc props');
console.log('(Do this manually or run the companion script)');

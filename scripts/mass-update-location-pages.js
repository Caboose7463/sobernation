/**
 * mass-update-location-pages.js
 *
 * For every [location]/page.tsx that still uses the OLD pattern:
 *   getRehabsBySlug / hasRehabData / CentreCard
 *
 * ... replaces the centre-listing section with NearestCentres.
 *
 * Strategy:
 * 1. Replace import lines
 * 2. Replace data fetching (getRehabsBySlug/hasRehabData calls)
 * 3. Replace the conditional {hasCqc && ...} / {!hasCqc && ...} blocks
 *    with <NearestCentres result={rehabsResult} locationName={loc.name} />
 */

const fs = require('fs');
const path = require('path');

const appDir = path.join(__dirname, '../app');

let updated = 0;
let skipped = 0;

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;

  // 1. Fix imports — replace old rehab imports with new ones
  content = content.replace(
    /import\s*\{[^}]*(?:getRehabsBySlug|hasRehabData|getRehabsByType)[^}]*\}\s*from\s*['"][^'"]*rehabs['"]/g,
    `import { getRehabsForLocation } from '../../../lib/rehabs'`
  );

  // Remove CentreCard import if present
  content = content.replace(/\nimport CentreCard from '\.\.\/\.\.\/\.\.\/components\/CentreCard'\n?/g, '\n');

  // Add NearestCentres import if not already there
  if (!content.includes("import NearestCentres from")) {
    content = content.replace(
      /import HelplinesSidebar from/,
      `import NearestCentres from '../../../components/NearestCentres'\nimport HelplinesSidebar from`
    );
  }

  // 2. Replace data fetching lines
  // Remove getRehabsBySlug, getRehabsByType, hasRehabData calls
  content = content.replace(
    /\s*const (?:allCentres|centres|residential|community|res|com) = get(?:Rehabs(?:BySlug|ByType)|RehabsByType)\([^)]+\)\n?/g,
    ''
  );
  content = content.replace(
    /\s*const hasCqc = has(?:Rehab)?Data\([^)]+\)\n?/g,
    ''
  );

  // Add the new data fetch after `const faqs = ...` or after `if (!loc) notFound()`
  if (!content.includes('getRehabsForLocation')) {
    content = content.replace(
      /(const faqs = [^\n]+\n)/,
      `$1  const rehabsResult = getRehabsForLocation(location, loc.name)\n`
    );
  }

  // Fix hasCqcData prop if used in LocationHero
  content = content.replace(
    /hasCqcData=\{hasCqc\}/g,
    'hasCqcData={rehabsResult.centres.length > 0}'
  );
  content = content.replace(
    /centreCount=\{(?:allCentres|centres)\.length\}/g,
    'centreCount={rehabsResult.centres.length}'
  );

  // 3. Replace the entire conditional CQC / !hasCqc blocks
  // Pattern A: {hasCqc && ( ... )} followed by {!hasCqc && ( ... )}
  // We use a heuristic: find from `{hasCqc &&` to end of `{!hasCqc && (...)}`
  
  const replacement = `
            {/* CQC centres — direct, borough-aggregated, or nearest-city fallback */}
            <NearestCentres result={rehabsResult} locationName={loc.name} limit={6} />
`;

  // Match {hasCqc && (...)} followed optionally by {!hasCqc && (...)}  
  const cqcBlockPattern = /\{hasCqc\s*&&\s*\([^]+?\)\s*\}\s*\n\s*\{!hasCqc\s*&&\s*\([^]+?\)\s*\}/g;
  if (cqcBlockPattern.test(content)) {
    content = content.replace(cqcBlockPattern, replacement.trim());
  } else {
    // Fallback: try to replace either block separately
    content = content.replace(
      /\{hasCqc\s*&&\s*\([^]+?\)\s*\}/g,
      replacement.trim()
    );
    content = content.replace(
      /\{!hasCqc\s*&&\s*\([^]+?\)\s*\}/g,
      ''
    );
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    updated++;
    return true;
  } else {
    skipped++;
    return false;
  }
}

function walk(dir) {
  fs.readdirSync(dir).forEach(f => {
    const full = path.join(dir, f);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) walk(full);
    else if (f === 'page.tsx' && path.basename(dir) === '[location]') {
      const c = fs.readFileSync(full, 'utf8');
      if (
        (c.includes('hasRehabData') || c.includes('getRehabsBySlug')) &&
        !c.includes('getRehabsForLocation')
      ) {
        const ok = processFile(full);
        console.log((ok ? '✓' : '~') + ' ' + path.relative(appDir, full));
      }
    }
  });
}

walk(appDir);
console.log(`\nUpdated: ${updated}, Unchanged: ${skipped}`);

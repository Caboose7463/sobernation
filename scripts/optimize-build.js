const fs = require('fs');
const path = require('path');
const appDir = path.join(__dirname, '../app');
let updated = 0;

function walk(dir) {
  fs.readdirSync(dir).forEach(f => {
    const full = path.join(dir, f);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) walk(full);
    else if (f === 'page.tsx' && path.basename(dir) === '[location]') {
      let c = fs.readFileSync(full, 'utf8');
      const orig = c;

      // 1. Switch dynamicParams false → true
      c = c.replace('export const dynamicParams = false', 'export const dynamicParams = true');

      // 2. Add getTopLocationSlugs to import line
      if (c.includes('getLocationSlugs') && !c.includes('getTopLocationSlugs')) {
        // Match: import { ..., getLocationSlugs, ... } from '...locations'
        c = c.replace(
          /(import\s*\{[^}]*)getLocationSlugs([^}]*\}\s*from\s*['"][^'"]*locations['"])/,
          '$1getLocationSlugs, getTopLocationSlugs$2'
        );
      }

      // 3. Replace usage in the return statement
      c = c.replace('return getLocationSlugs().map', 'return getTopLocationSlugs().map');

      if (c !== orig) {
        fs.writeFileSync(full, c, 'utf8');
        updated++;
        console.log('✓', path.relative(appDir, full));
      }
    }
  });
}

walk(appDir);
console.log('\nTotal updated:', updated);
console.log('Build will now pre-generate top 1,000 locations only.');
console.log('All 3,835 locations still work via ISR (dynamicParams=true).');

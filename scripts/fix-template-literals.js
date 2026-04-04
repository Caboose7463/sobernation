const fs = require('fs');
const path = require('path');
const appDir = 'C:/Users/info/.gemini/antigravity/scratch/sobernation/app';

let fixed = 0;
let skipped = 0;
let errors = [];

function walkDir(dir) {
  let items;
  try { items = fs.readdirSync(dir); } catch(e) { return; }
  for (const item of items) {
    const full = path.join(dir, item);
    let stat;
    try { stat = fs.statSync(full); } catch(e) { continue; }
    if (stat.isDirectory()) {
      walkDir(full);
    } else if (item === 'page.tsx' && path.basename(dir) === '[location]') {
      try {
        let content = fs.readFileSync(full, 'utf8');
        // The broken pattern is: ` text `$`{var} ` instead of ` text ${var} `
        // Regex: backtick-dollar-backtick-brace => dollar-brace
        const broken = '`$`{';
        if (content.includes(broken)) {
          const fixed_content = content.split(broken).join('${');
          fs.writeFileSync(full, fixed_content, 'utf8');
          fixed++;
        } else {
          skipped++;
        }
      } catch(e) {
        errors.push(full + ': ' + e.message);
      }
    }
  }
}

walkDir(appDir);
console.log('Fixed:', fixed);
console.log('Already correct:', skipped);
if (errors.length) console.log('Errors:', errors.join('\n'));

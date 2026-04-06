const fs = require('fs')
const content = fs.readFileSync('app/therapist/[slug]/page.tsx', 'utf8')

const before = (content.match(/const ri = r\.name\.split/g) || []).length
console.log('Occurrences before:', before)

const fixed = content.replace(
  "const ri = r.name.split(' ').map((n: string) => n[0]).slice(0, 2).join('').toUpperCase()",
  "const ri = r.name.split(' ').filter(Boolean).map((n: string) => n[0]).slice(0, 2).join('').toUpperCase() || '??'"
)

const after = (fixed.match(/filter\(Boolean\).*toUpperCase.*\|\| '..'/g) || []).length
console.log('Fixed:', after)
fs.writeFileSync('app/therapist/[slug]/page.tsx', fixed, 'utf8')
console.log('Done')

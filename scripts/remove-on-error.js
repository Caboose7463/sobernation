const fs = require('fs')
const file = 'app/therapist/[slug]/page.tsx'
let content = fs.readFileSync(file, 'utf8')

const before = (content.match(/onError/g) || []).length
console.log('onError occurrences before:', before)

// Remove onError handler from img tags — not allowed in Server Components
content = content.replace(/ onError=\{[^}]+\}\}/g, '}')
content = content.replace(/ onError=\{[^}]+\} \/>/g, ' />')
// More targeted: remove the specific pattern
content = content.replace(/ onError=\{\(e\) => \{ \(e\.target as HTMLImageElement\)\.style\.display = 'none' \}\}/g, '')

const after = (content.match(/onError/g) || []).length
console.log('onError occurrences after:', after)

fs.writeFileSync(file, content, 'utf8')
console.log('Done')

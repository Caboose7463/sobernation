const fs = require('fs')
const path = require('path')

function walk(dir, results = []) {
  if (!fs.existsSync(dir)) return results
  for (const f of fs.readdirSync(dir)) {
    const full = path.join(dir, f)
    const stat = fs.statSync(full)
    if (stat.isDirectory()) walk(full, results)
    else if (f.endsWith('.tsx') || f.endsWith('.ts')) results.push(full)
  }
  return results
}

const files = [...walk('app'), ...walk('components'), ...walk('lib')]
let found = 0

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8')
  const lines = content.split('\n')
  lines.forEach((l, i) => {
    // Unsafe: split(' ').map(x => x[0]) or similar without filter(Boolean)
    if (l.includes('[0]') && l.includes('split') && !l.includes('filter(Boolean)') && !l.includes('filter((')) {
      console.log(path.relative(process.cwd(), f) + ':' + (i + 1) + ': ' + l.trim())
      found++
    }
  })
})
console.log(`\nTotal suspicious lines: ${found}`)

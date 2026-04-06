/**
 * Fixes all unsafe `split(' ').map(n => n[0])` initials patterns
 * by adding `.filter(Boolean)` before the map.
 * This prevents crashes when names have double-spaces or leading/trailing spaces.
 */
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
let totalFixed = 0

// Pattern 1: .split(' ').slice(...).map(w => w[0]) — add filter after split
// Pattern 2: .split(' ').map(n => n[0])           — add filter after split
const PATTERNS = [
  {
    from: /\.split\(' '\)\.slice\((\d+), (\d+)\)\.map\((\w+) => \3\[0\]\)/g,
    to: ".split(' ').filter(Boolean).slice($1, $2).map($3 => $3[0])",
  },
  {
    from: /\.split\(' '\)\.map\((\w+): string => \1\[0\]\)/g,
    to: ".split(' ').filter(Boolean).map($1: string => $1[0])",
  },
  {
    from: /\.split\(' '\)\.map\((\w+) => \1\[0\]\)/g,
    to: ".split(' ').filter(Boolean).map($1 => $1[0])",
  },
]

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8')
  let changed = false

  for (const p of PATTERNS) {
    const newContent = content.replace(p.from, p.to)
    if (newContent !== content) {
      content = newContent
      changed = true
    }
  }

  if (changed) {
    fs.writeFileSync(f, content, 'utf8')
    console.log('Fixed: ' + path.relative(process.cwd(), f))
    totalFixed++
  }
})

console.log('\nTotal files fixed: ' + totalFixed)

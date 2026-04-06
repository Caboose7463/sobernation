/**
 * Strips ALL inline duplicate <nav> blocks from page.tsx files.
 * Matches the common pattern: sticky nav with SoberNation logo + phone/CTA link.
 * The global Nav component in layout.tsx already handles this.
 */
const fs = require('fs')
const path = require('path')

const APP_DIR = path.join(__dirname, '..', 'app')

// Pages that intentionally have their own standalone nav (not wrapped by layout)
// Dashboard is accessed directly, claim flow has a progress bar not a nav
const SKIP_PATHS = [
  path.join('counsellors', 'dashboard'),
  path.join('counsellors', 'claim'),
]

function walk(dir, files = []) {
  for (const f of fs.readdirSync(dir)) {
    const full = path.join(dir, f)
    if (fs.statSync(full).isDirectory()) {
      walk(full, files)
    } else if (f === 'page.tsx') {
      files.push(full)
    }
  }
  return files
}

function shouldSkip(filePath) {
  return SKIP_PATHS.some(s => filePath.includes(s))
}

// Matches a <nav> block with the sticky positioning + SoberNation branding
// The block may or may not be preceded by a {/* Nav */} comment
const NAV_REGEX = /[ \t]*(?:\{\/\* Nav \*\/\}\n[ \t]*)?\s*<nav\s[^>]*?position:\s*['"]?sticky['"]?[^>]*?zIndex:\s*100[^>]*>[\s\S]*?<\/nav>\n?/g

let cleaned = 0
const files = walk(APP_DIR)

for (const file of files) {
  if (shouldSkip(file)) continue

  const content = fs.readFileSync(file, 'utf8')
  if (!content.includes("zIndex: 100") || !content.includes("SoberNation")) continue
  if (!content.match(/<nav\s[^>]*?zIndex:\s*100/)) continue

  const newContent = content.replace(NAV_REGEX, '\n')

  if (newContent !== content) {
    fs.writeFileSync(file, newContent, 'utf8')
    const rel = path.relative(APP_DIR, file)
    console.log(`✅ Cleaned: ${rel}`)
    cleaned++
  }
}

console.log(`\nDone. Removed duplicate nav from ${cleaned} file(s).`)

/**
 * audit-sitemap-redirects.mjs
 * 
 * Checks every URL listed in the sitemap shards against the redirects
 * defined in next.config.ts. Flags any sitemap URL that is the SOURCE
 * of a redirect — those would cause "Page with redirect" in GSC.
 * 
 * Also checks standalone pages exist as app/ directories.
 * 
 * Run: node scripts/audit-sitemap-redirects.mjs
 */

import { readFileSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')

// ── 1. Load redirects from next.config.ts ─────────────────────────────────────
// We parse them manually since we can't import TypeScript directly.
const nextConfig = readFileSync(join(ROOT, 'next.config.ts'), 'utf8')
const redirectSources = []

// Extract source paths using a simple regex — works for our config structure
const redirectMatches = nextConfig.matchAll(/source:\s*['"]([^'"]+)['"]/g)
for (const m of redirectMatches) {
  const src = m[1]
  // Skip wildcard patterns (they match many paths, not specific sitemap URLs)
  if (!src.includes(':path') && !src.includes('*')) {
    redirectSources.push(src)
  }
}
console.log('\n📋 Redirect sources defined in next.config.ts:')
redirectSources.forEach(s => console.log('  redirect:', s))

// ── 2. Load sitemap shard file and extract all URLs ───────────────────────────
const shardFile = readFileSync(join(ROOT, 'app/sitemaps/[id]/route.ts'), 'utf8')
const urlMatches = shardFile.matchAll(/`\$\{BASE\}([^`]+)`/g)
const sitemapPaths = new Set()
for (const m of urlMatches) {
  const path = m[1]
  // Skip dynamic expressions (location loops, etc.)
  if (!path.includes('${') && path.length > 0) {
    sitemapPaths.add(path)
  }
}

// Also extract string literals like `${BASE}/find-my-rehab`  
const stringUrlMatches = shardFile.matchAll(/url:\s*`\$\{BASE\}(\/[^`$,\s]+)`/g)
for (const m of stringUrlMatches) {
  sitemapPaths.add(m[1])
}

// ── 3. Cross-reference: sitemap paths that are redirect sources ────────────────
console.log('\n🔍 Checking sitemap URLs against redirect sources...')
let issues = 0

for (const path of sitemapPaths) {
  if (redirectSources.includes(path)) {
    console.error(`  ❌ REDIRECT IN SITEMAP: ${path} — this will cause "Page with redirect" in GSC`)
    issues++
  }
}

// Also check standalone pages exist as directories
const standalonePages = [
  '/', '/sobriety-counter', '/withdrawal-timeline', '/addiction-cost-calculator',
  '/alcohol-units-calculator', '/am-i-an-alcoholic', '/how-to-stop-drinking',
  '/alcohol-withdrawal-symptoms', '/heroin-withdrawal-symptoms', '/what-is-methadone',
  '/signs-of-alcoholism', '/signs-of-drug-addiction', '/alcohol-addiction-treatment',
  '/how-to-help-someone-with-addiction', '/online-aa-meetings', '/suboxone-vs-methadone',
  '/find-my-rehab', '/community', '/articles', '/search', '/drug-addiction-treatment',
  '/alcohol-and-mental-health', '/private-vs-nhs-rehab', '/about', '/editorial-policy',
  '/privacy-policy', '/cookie-policy', '/contact', '/terms',
]

console.log('\n📁 Checking standalone pages exist as app/ directories...')
for (const page of standalonePages) {
  if (page === '/') continue
  const slug = page.replace(/^\//, '')
  // Also check drug detection pages
  const dir = join(ROOT, 'app', slug)
  if (!existsSync(dir)) {
    console.error(`  ❌ MISSING PAGE: ${page} is in the sitemap but has no app/${slug}/ directory (will 404)`)
    issues++
  }
}

// ── 4. Summary ─────────────────────────────────────────────────────────────────
console.log('\n' + '─'.repeat(60))
if (issues === 0) {
  console.log('✅ All good! No sitemap URLs are redirect sources and all standalone pages exist.')
} else {
  console.log(`⚠️  Found ${issues} issue(s) — fix before clicking "Validate Fix" in GSC.`)
}
console.log('─'.repeat(60) + '\n')

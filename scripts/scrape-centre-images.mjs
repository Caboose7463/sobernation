#!/usr/bin/env node
/**
 * scripts/scrape-centre-images.mjs
 *
 * Scrapes og:image / logo from each rehab centre's website and saves
 * images locally to public/centres/[id].jpg|png|webp.
 *
 * URLs are saved to data/centre-images.json keyed by CQC URL.
 * 
 * Usage: node scripts/scrape-centre-images.mjs
 * Safe to re-run — skips already-scraped centres.
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs'
import { createWriteStream } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join, extname } from 'path'
import { pipeline } from 'stream/promises'
import { Readable } from 'stream'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const OUTPUT_JSON = join(ROOT, 'data', 'centre-images.json')
const IMAGE_DIR = join(ROOT, 'public', 'centres')

// Ensure output directories exist
mkdirSync(IMAGE_DIR, { recursive: true })

const DELAY_MS = 600
const FETCH_TIMEOUT_MS = 10000
const MAX_IMAGE_BYTES = 4 * 1024 * 1024

// ── Load existing results ──────────────────────────────────────────────────────
let results = {}
if (existsSync(OUTPUT_JSON)) {
  try { results = JSON.parse(readFileSync(OUTPUT_JSON, 'utf-8')) } catch { results = {} }
}
const alreadyDone = Object.keys(results).length
console.log(`📁 Loaded ${alreadyDone} existing results\n`)

// ── Load centres ───────────────────────────────────────────────────────────────
const rehabData = JSON.parse(readFileSync(join(ROOT, 'data/rehabs.json'), 'utf-8'))
const centres = []
for (const [, townData] of Object.entries(rehabData.byTown)) {
  for (const c of townData.centres) {
    if (c.website && c.cqcUrl) {
      let url = c.website.trim()
      if (!url.startsWith('http')) url = 'https://' + url
      centres.push({ name: c.name, website: url, cqcUrl: c.cqcUrl })
    }
  }
}

const todo = centres.filter(c => !(c.cqcUrl in results))
console.log(`🏥 ${centres.length} centres with websites`)
console.log(`⏭  ${centres.length - todo.length} already scraped`)
console.log(`🔍 ${todo.length} remaining\n`)

if (todo.length === 0) {
  console.log('✅ Nothing to scrape!')
  process.exit(0)
}

// ── Helpers ────────────────────────────────────────────────────────────────────
function sleep(ms) { return new Promise(r => setTimeout(r, ms)) }

function safeUrl(href, base) {
  if (!href) return null
  href = href.trim()
  if (href.startsWith('data:')) return null
  if (href.startsWith('//')) return 'https:' + href
  if (href.startsWith('http')) return href
  try { return new URL(href, base).href } catch { return null }
}

function extractCandidates(html, baseUrl) {
  const c = []

  // og:image — highest quality, usually a real photo/logo
  const og1 = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"'\s>]+)/i)
  const og2 = html.match(/<meta[^>]+content=["']([^"'\s>]+)["'][^>]+property=["']og:image/i)
  const ogUrl = safeUrl((og1 || og2)?.[1], baseUrl)
  if (ogUrl) c.push({ url: ogUrl, p: 1, src: 'og:image' })

  // twitter:image
  const tw1 = html.match(/<meta[^>]+(?:name|property)=["']twitter:image(?::src)?["'][^>]+content=["']([^"'\s>]+)/i)
  const tw2 = html.match(/<meta[^>]+content=["']([^"'\s>]+)["'][^>]+(?:name|property)=["']twitter:image/i)
  const twUrl = safeUrl((tw1 || tw2)?.[1], baseUrl)
  if (twUrl) c.push({ url: twUrl, p: 2, src: 'twitter:image' })

  // apple-touch-icon — good square icon, works well at small sizes
  const apple = html.match(/<link[^>]+rel=["'][^"']*apple-touch-icon[^"']*["'][^>]+href=["']([^"'\s>]+)/i)
  const appleUrl = safeUrl(apple?.[1], baseUrl)
  if (appleUrl) c.push({ url: appleUrl, p: 3, src: 'apple-touch-icon' })

  // Logo img tag (src or class contains "logo")
  for (const m of html.matchAll(/<img[^>]+>/gi)) {
    const tag = m[0]
    const srcM = tag.match(/src=["']([^"'\s>]+)/i)
    if (!srcM) continue
    const imgUrl = safeUrl(srcM[1], baseUrl)
    if (!imgUrl) continue
    const isLogo = /logo|brand/i.test(srcM[1]) || /logo|brand|header-img/i.test(tag)
    if (isLogo) { c.push({ url: imgUrl, p: 4, src: 'logo-img' }); break }
  }

  return c.filter(x => x.url).sort((a, b) => a.p - b.p)
}

async function fetchPage(url) {
  const ac = new AbortController()
  const t = setTimeout(() => ac.abort(), FETCH_TIMEOUT_MS)
  try {
    const r = await fetch(url, {
      signal: ac.signal,
      redirect: 'follow',
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; SoberNationBot/1.0; +https://www.sobernation.co.uk)' },
    })
    clearTimeout(t)
    return r
  } catch (e) { clearTimeout(t); throw e }
}

async function downloadImage(url, destPath) {
  const ac = new AbortController()
  const t = setTimeout(() => ac.abort(), FETCH_TIMEOUT_MS)
  try {
    const r = await fetch(url, {
      signal: ac.signal,
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; SoberNationBot/1.0)' },
    })
    clearTimeout(t)
    if (!r.ok) return null

    const ct = r.headers.get('content-type') || ''
    if (!ct.startsWith('image/') && !ct.includes('svg')) return null

    const ext = ct.includes('png') ? '.png'
              : ct.includes('svg') ? '.svg'
              : ct.includes('webp') ? '.webp'
              : ct.includes('gif') ? '.gif'
              : '.jpg'

    const fullPath = destPath + ext

    // Stream to file
    const bytes = await r.arrayBuffer()
    if (bytes.byteLength < 300 || bytes.byteLength > MAX_IMAGE_BYTES) return null

    writeFileSync(fullPath, Buffer.from(bytes))
    return { path: fullPath, ext, publicUrl: '/centres/' + fullPath.split(/[\\/]/).pop() }
  } catch (e) { clearTimeout(t); return null }
}

function idFromCqc(cqcUrl) {
  return cqcUrl.replace(/[^a-z0-9]/gi, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')
}

// ── Main loop ──────────────────────────────────────────────────────────────────
let done = 0, succeeded = 0, failed = 0

function save() {
  writeFileSync(OUTPUT_JSON, JSON.stringify(results, null, 2))
}

for (const centre of todo) {
  const label = centre.name.slice(0, 50).padEnd(50)
  process.stdout.write(`[${done + 1}/${todo.length}] ${label} `)

  let outcome = '❌ no_result'

  try {
    const pageRes = await fetchPage(centre.website)
    if (!pageRes.ok) {
      outcome = `❌ HTTP ${pageRes.status}`
    } else {
      const html = await pageRes.text()
      const finalUrl = pageRes.url
      const candidates = extractCandidates(html, finalUrl)

      if (candidates.length === 0) {
        outcome = '❌ no_candidates'
      } else {
        const destBase = join(IMAGE_DIR, idFromCqc(centre.cqcUrl))
        let saved = null

        for (const cand of candidates.slice(0, 3)) {
          saved = await downloadImage(cand.url, destBase)
          if (saved) { outcome = `✅ ${cand.src}`; break }
        }

        if (saved) {
          results[centre.cqcUrl] = saved.publicUrl
          succeeded++
        } else {
          outcome = '❌ download_failed'
        }
      }
    }
  } catch (e) {
    outcome = `❌ ${e.message?.slice(0, 40) || 'error'}`
  }

  if (!results[centre.cqcUrl]) results[centre.cqcUrl] = null
  console.log(outcome)
  done++

  if (done % 10 === 0) save()
  await sleep(DELAY_MS)
}

save()

const withImages = Object.values(results).filter(Boolean).length
const total = Object.keys(results).length
console.log(`\n✅ Scrape complete!`)
console.log(`   Found: ${succeeded} new images this run`)
console.log(`   Total coverage: ${withImages}/${centres.length} centres (${Math.round(withImages / centres.length * 100)}%)`)
console.log(`   Saved to: data/centre-images.json + public/centres/`)

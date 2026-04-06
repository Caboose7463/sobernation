/**
 * lib/articles.ts
 * Shared helpers for the article system.
 */

import { createClient } from '@supabase/supabase-js'

export interface Article {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  author_name: string
  author_slug: string
  topic: string
  tags: string[]
  location_slugs: string[]
  hero_image_url: string | null
  hero_image_alt: string | null
  published_at: string
  read_time_mins: number
  status: string
}

export interface ArticleQueue {
  id: string
  title: string
  topic: string
  location_slug: string | null
  keywords: string[]
  priority: number
  status: string
}

export function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

/** The 3 rotating author profiles */
export const AUTHORS = [
  { name: 'James Whitfield', slug: 'james-whitfield' },
  { name: 'Emily Clarke', slug: 'emily-clarke' },
  { name: 'Dr. Sarah Dawson', slug: 'dr-sarah-dawson' },
]

export function pickAuthor(seed?: string) {
  const idx = seed
    ? seed.split('').reduce((a, c) => a + c.charCodeAt(0), 0) % AUTHORS.length
    : Math.floor(Math.random() * AUTHORS.length)
  return AUTHORS[idx]
}

/** Build a URL-safe slug from a title */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 80)
}

/** Estimate reading time from word count */
export function readingTime(content: string): number {
  const words = content.trim().split(/\s+/).length
  return Math.max(3, Math.round(words / 200))
}

/** Fetch a random Unsplash image for the given search query */
export async function fetchUnsplashImage(query: string): Promise<{ url: string; alt: string } | null> {
  const key = process.env.UNSPLASH_ACCESS_KEY
  if (!key) return null
  try {
    const res = await fetch(
      `https://api.unsplash.com/photos/random?query=${encodeURIComponent(query)}&orientation=landscape&content_filter=high`,
      { headers: { Authorization: `Client-ID ${key}` }, next: { revalidate: 0 } }
    )
    if (!res.ok) return null
    const data = await res.json()
    return {
      url: data.urls?.regular ?? data.urls?.full,
      alt: data.alt_description ?? data.description ?? query,
    }
  } catch {
    return null
  }
}

/** Format a date nicely */
export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric'
  })
}

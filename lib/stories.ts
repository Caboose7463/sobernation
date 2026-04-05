import { put, list } from '@vercel/blob'

// ── Types ────────────────────────────────────────────────────────────────────

export interface Story {
  id: string
  slug: string
  name: string
  location: string
  substance: string
  daysSober: number
  story: string
  imageUrl: string | null
  status: 'pending' | 'approved' | 'rejected'
  submittedAt: string
  approvedAt?: string
}

// ── Index management ─────────────────────────────────────────────────────────
// All stories are stored as a single JSON file in Vercel Blob.
// This keeps things simple and avoids needing a database.

const INDEX_PATH = 'stories/index.json'

async function readIndex(): Promise<Story[]> {
  try {
    const { blobs } = await list({ prefix: INDEX_PATH })
    if (blobs.length === 0) return []
    // Blob URLs are public — fetch with cache: no-store to always get latest
    const res = await fetch(blobs[0].url, { cache: 'no-store' })
    if (!res.ok) return []
    return await res.json() as Story[]
  } catch {
    return []
  }
}

async function writeIndex(stories: Story[]): Promise<void> {
  await put(INDEX_PATH, JSON.stringify(stories, null, 2), {
    access: 'public',
    contentType: 'application/json',
    addRandomSuffix: false,
  })
}

// ── Public API ───────────────────────────────────────────────────────────────

export async function getApprovedStories(): Promise<Story[]> {
  const all = await readIndex()
  return all
    .filter(s => s.status === 'approved')
    .sort((a, b) =>
      new Date(b.approvedAt ?? b.submittedAt).getTime() -
      new Date(a.approvedAt ?? a.submittedAt).getTime()
    )
}

export async function getPendingStories(): Promise<Story[]> {
  const all = await readIndex()
  return all.filter(s => s.status === 'pending')
}

export async function getAllStories(): Promise<Story[]> {
  return readIndex()
}

export async function getStoryBySlug(slug: string): Promise<Story | null> {
  const all = await readIndex()
  return all.find(s => s.slug === slug && s.status === 'approved') ?? null
}

export async function submitStory(
  data: Pick<Story, 'name' | 'location' | 'substance' | 'daysSober' | 'story' | 'imageUrl'>
): Promise<Story> {
  const all = await readIndex()
  const id = crypto.randomUUID()
  const baseSlug = `${data.name}-${data.location}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
  const slug = `${baseSlug}-${id.slice(0, 8)}`
  const story: Story = {
    ...data,
    id,
    slug,
    status: 'pending',
    submittedAt: new Date().toISOString(),
  }
  await writeIndex([...all, story])
  return story
}

export async function updateStoryStatus(
  id: string,
  status: 'approved' | 'rejected'
): Promise<void> {
  const all = await readIndex()
  const updated = all.map(s =>
    s.id === id
      ? { ...s, status, ...(status === 'approved' ? { approvedAt: new Date().toISOString() } : {}) }
      : s
  )
  await writeIndex(updated)
}

export async function seedStories(stories: Omit<Story, 'id' | 'slug' | 'submittedAt'>[]): Promise<void> {
  const seeded: Story[] = stories.map((s, i) => {
    const id = `seed-${i.toString().padStart(3, '0')}`
    const baseSlug = `${s.name}-${s.location}`
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
    return {
      ...s,
      id,
      slug: `${baseSlug}-${id}`,
      submittedAt: new Date(Date.now() - (10 - i) * 7 * 24 * 60 * 60 * 1000).toISOString(),
    }
  })
  await writeIndex(seeded)
}

// ── Helpers ──────────────────────────────────────────────────────────────────

export function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .map(w => w[0]?.toUpperCase() ?? '')
    .slice(0, 2)
    .join('')
}

export function excerptStory(story: string, chars = 140): string {
  if (story.length <= chars) return story
  return story.slice(0, chars).replace(/\s\S*$/, '') + '…'
}

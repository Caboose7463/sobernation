import { NextRequest, NextResponse } from 'next/server'
import { getApprovedStories, submitStory } from '../../../../lib/stories'

export const dynamic = 'force-dynamic'

// GET /api/stories — list approved stories
export async function GET() {
  try {
    const stories = await getApprovedStories()
    return NextResponse.json(stories)
  } catch (err) {
    console.error('GET /api/stories error:', err)
    return NextResponse.json({ error: 'Failed to load stories' }, { status: 500 })
  }
}

// POST /api/stories — submit a new story (status: pending)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, location, substance, daysSober, story, imageUrl } = body

    if (!name || !location || !substance || !daysSober || !story) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    if (typeof story !== 'string' || story.length < 50) {
      return NextResponse.json({ error: 'Story must be at least 50 characters' }, { status: 400 })
    }
    if (story.length > 5000) {
      return NextResponse.json({ error: 'Story must be under 5000 characters' }, { status: 400 })
    }

    const submitted = await submitStory({
      name: String(name).slice(0, 50),
      location: String(location).slice(0, 80),
      substance: String(substance).slice(0, 80),
      daysSober: Math.min(Math.max(1, parseInt(String(daysSober), 10)), 36500),
      story: String(story).slice(0, 5000),
      imageUrl: imageUrl ? String(imageUrl) : null,
    })

    return NextResponse.json({ success: true, slug: submitted.slug }, { status: 201 })
  } catch (err) {
    console.error('POST /api/stories error:', err)
    return NextResponse.json({ error: 'Failed to submit story' }, { status: 500 })
  }
}

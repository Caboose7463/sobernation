import { NextRequest, NextResponse } from 'next/server'
import { getPendingStories } from '../../../../../lib/stories'

const ADMIN_PIN = process.env.ADMIN_PIN ?? '7463'

export const dynamic = 'force-dynamic'

// GET /api/stories/pending — list pending stories (admin only)
export async function GET(req: NextRequest) {
  const pin = req.headers.get('x-admin-pin')
  if (pin !== ADMIN_PIN) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  }
  try {
    const stories = await getPendingStories()
    return NextResponse.json(stories)
  } catch (err) {
    console.error('GET /api/stories/pending error:', err)
    return NextResponse.json({ error: 'Failed to load pending stories' }, { status: 500 })
  }
}

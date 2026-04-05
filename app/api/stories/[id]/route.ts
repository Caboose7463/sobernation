import { NextRequest, NextResponse } from 'next/server'
import { updateStoryStatus } from '../../../../lib/stories'

const ADMIN_PIN = process.env.ADMIN_PIN ?? '7463'

export const dynamic = 'force-dynamic'

// PATCH /api/stories/[id] — approve or reject a story
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await req.json()
    const { status, pin } = body

    // PIN check
    if (pin !== ADMIN_PIN) {
      return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
    }

    if (status !== 'approved' && status !== 'rejected') {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
    }

    await updateStoryStatus(id, status)
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('PATCH /api/stories/[id] error:', err)
    return NextResponse.json({ error: 'Failed to update story' }, { status: 500 })
  }
}

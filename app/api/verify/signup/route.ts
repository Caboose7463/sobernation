import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase-server'

export async function POST(request: NextRequest) {
  try {
    const { email, password, name, listingType } = await request.json()

    if (!email || !password || !name || !listingType) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (!['counsellor', 'centre'].includes(listingType)) {
      return NextResponse.json({ error: 'Invalid listing type' }, { status: 400 })
    }

    const supabase = createServiceClient()

    // Create the auth user
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // auto-confirm since we're auto-approving
    })

    if (authError) {
      // Handle "user already exists" gracefully
      if (authError.message.includes('already registered')) {
        return NextResponse.json({ error: 'An account with this email already exists. Please log in.' }, { status: 409 })
      }
      return NextResponse.json({ error: authError.message }, { status: 400 })
    }

    const userId = authData.user.id

    // Create the listing_owners row
    const { data: owner, error: ownerError } = await supabase
      .from('listing_owners')
      .insert({
        user_id: userId,
        name,
        email,
        listing_type: listingType,
        locations: [],
        subscription_status: 'pending',
        verified: false,
        admin_approved: false,
      })
      .select()
      .single()

    if (ownerError) {
      // Roll back the auth user if owner creation failed
      await supabase.auth.admin.deleteUser(userId)
      return NextResponse.json({ error: ownerError.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, ownerId: owner.id, userId })
  } catch (err) {
    console.error('[verify/signup]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

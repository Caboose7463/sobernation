/**
 * GET /api/dashboard/ads/campaigns?email=owner@example.com
 *
 * Returns all ad placements for a given email address, plus 30-day
 * daily stats and current month aggregates.
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

function supabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  )
}

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get('email')?.toLowerCase().trim()
  if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 })

  const db = supabase()

  // Fetch placements for this email
  const { data: placements, error } = await db
    .from('ad_placements')
    .select('*')
    .eq('owner_email', email)
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  if (!placements || placements.length === 0) {
    return NextResponse.json({ campaigns: [] })
  }

  const ids = placements.map((p: { id: string }) => p.id)

  // Fetch last 30 days of daily stats for all placements
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
  const fromDate = thirtyDaysAgo.toISOString().split('T')[0]

  const { data: dailyStats } = await db
    .from('ad_daily_stats')
    .select('*')
    .in('placement_id', ids)
    .gte('day', fromDate)
    .order('day', { ascending: true })

  // Group stats by placement id
  const statsByPlacement: Record<string, typeof dailyStats> = {}
  for (const id of ids) {
    statsByPlacement[id] = (dailyStats ?? []).filter((s: { placement_id: string }) => s.placement_id === id)
  }

  // Build campaign objects
  const campaigns = placements.map((p: Record<string, unknown>) => {
    const stats = statsByPlacement[p.id as string] ?? []
    const totalImpressions = stats.reduce((sum: number, s: Record<string, number>) => sum + (s.impressions || 0), 0)
    const totalClicks = stats.reduce((sum: number, s: Record<string, number>) => sum + (s.clicks || 0), 0)
    const totalPhoneTaps = stats.reduce((sum: number, s: Record<string, number>) => sum + (s.phone_taps || 0), 0)
    const totalSpendPence = stats.reduce((sum: number, s: Record<string, number>) => sum + (s.spend_pence || 0), 0)
    const ctr = totalImpressions > 0 ? ((totalClicks / totalImpressions) * 100).toFixed(1) : '0.0'

    return {
      id: p.id,
      display_name: p.display_name,
      listing_type: p.listing_type,
      location_slug: p.location_slug,
      active: p.active,
      paused_budget_depleted: p.paused_budget_depleted,
      max_cpc_pence: p.max_cpc_pence,
      monthly_budget_pence: p.monthly_budget_pence,
      budget_remaining_pence: p.budget_remaining_pence,
      quality_score: p.quality_score,
      backlink_verified: p.backlink_verified,
      backlink_url: p.backlink_url,
      destination_type: p.destination_type,
      destination_url: p.destination_url,
      display_phone: p.display_phone,
      impressions_this_month: p.impressions_this_month,
      clicks_this_month: p.clicks_this_month,
      created_at: p.created_at,
      // 30-day aggregates
      impressions_30d: totalImpressions,
      clicks_30d: totalClicks,
      phone_taps_30d: totalPhoneTaps,
      spend_30d_pence: totalSpendPence,
      ctr_30d: ctr,
      // Daily sparkline data
      daily: stats.map((s: Record<string, unknown>) => ({
        day: s.day,
        impressions: s.impressions,
        clicks: s.clicks,
        spend_pence: s.spend_pence,
      })),
    }
  })

  return NextResponse.json({ campaigns })
}

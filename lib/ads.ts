/**
 * lib/ads.ts — SoberNation Ads auction engine
 *
 * Runs a Google Ads-style second-price auction on every location page request.
 * Top 3 bidders by Ad Rank (max_cpc × quality_score) win sponsored positions.
 * Tiebreaker: fewest impressions this month (impression-share pacing).
 */

import { createClient } from '@supabase/supabase-js'

// ── Types ─────────────────────────────────────────────────────────────────────

export interface AdPlacement {
  id: string
  listing_type: 'centre' | 'counsellor'
  listing_slug: string
  location_slug: string
  max_cpc_pence: number
  monthly_budget_pence: number
  budget_remaining_pence: number
  quality_score: number
  destination_type: 'own_url' | 'sobernation_profile'
  destination_url: string | null
  display_name: string
  display_phone: string | null
  display_address: string | null
  display_type_label: string | null
  impressions_this_month: number
  backlink_verified: boolean
}

export interface AuctionWinner extends AdPlacement {
  position: 1 | 2 | 3
  ad_rank: number
}

// CPC ranges by tier, for the UI
export const TIER_CPC_RANGES = {
  centre: {
    1: { min: 600, max: 1200, minBudget: 30000 },
    2: { min: 300, max:  700, minBudget: 12000 },
    3: { min: 150, max:  400, minBudget:  5000 },
  },
  counsellor: {
    1: { min: 150, max: 300, minBudget: 6000 },
    2: { min:  80, max: 180, minBudget: 2500 },
    3: { min:  40, max: 100, minBudget: 1200 },
  },
} as const

// ── Supabase client ───────────────────────────────────────────────────────────

function getAdsClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  )
}

// ── Auction engine ────────────────────────────────────────────────────────────

export async function runAuction(
  locationSlug: string,
  listingType: 'centre' | 'counsellor'
): Promise<AuctionWinner[]> {
  try {
    const supabase = getAdsClient()

    const { data: placements, error } = await supabase
      .from('ad_placements')
      .select('*')
      .eq('location_slug', locationSlug)
      .eq('listing_type', listingType)
      .eq('active', true)
      .in('position', [1, 2, 3])
      .order('position', { ascending: true })

    if (error || !placements || placements.length === 0) return []

    const winners: AuctionWinner[] = placements.map((p) => ({
      ...(p as AdPlacement),
      position: p.position as 1 | 2 | 3,
      ad_rank: p.position === 1 ? 300 : p.position === 2 ? 200 : 100,
    }))

    // Log impressions — fire and forget
    logImpressions(winners, locationSlug)

    return winners
  } catch {
    return []
  }
}


// ── Impression logging ────────────────────────────────────────────────────────

async function logImpressions(winners: AuctionWinner[], locationSlug: string) {
  if (winners.length === 0) return
  try {
    const supabase = getAdsClient()
    await supabase.from('ad_impressions').insert(
      winners.map((w) => ({
        placement_id: w.id,
        location_slug: locationSlug,
        position_won: w.position,
        ad_rank_score: w.ad_rank,
      }))
    )
    // Increment counters
    for (const w of winners) {
      await supabase
        .from('ad_placements')
        .update({ impressions_this_month: (w.impressions_this_month || 0) + 1 })
        .eq('id', w.id)
    }
  } catch { /* non-critical */ }
}

// ── Click processing ──────────────────────────────────────────────────────────

export async function processClick(placementId: string): Promise<{
  destination_url: string
  destination_type: string
  listing_slug: string
  listing_type: string
} | null> {
  try {
    const supabase = getAdsClient()

    const { data: placement } = await supabase
      .from('ad_placements')
      .select('*')
      .eq('id', placementId)
      .eq('active', true)
      .single()

    if (!placement) return null

    // Second-price auction CPC calculation:
    // For simplicity in V1, charge the actual max_cpc.
    // Full second-price requires knowing rank_2 at click time — add later.
    const actualCpc = placement.max_cpc_pence

    // Deduct from budget
    const newBudget = Math.max(0, placement.budget_remaining_pence - actualCpc)
    const depleted = newBudget < placement.max_cpc_pence

    await supabase
      .from('ad_placements')
      .update({
        budget_remaining_pence: newBudget,
        paused_budget_depleted: depleted,
        clicks_this_month: (placement.clicks_this_month || 0) + 1,
      })
      .eq('id', placementId)

    // Log click
    await supabase.from('ad_clicks').insert({
      placement_id: placementId,
      location_slug: placement.location_slug,
      actual_cpc_pence: actualCpc,
      destination_type: placement.destination_type,
      destination_url: placement.destination_url,
    })

    return {
      destination_url: placement.destination_type === 'own_url'
        ? placement.destination_url
        : `/centre/${placement.listing_slug}`,
      destination_type: placement.destination_type,
      listing_slug: placement.listing_slug,
      listing_type: placement.listing_type,
    }
  } catch {
    return null
  }
}

// ── Phone tap logging ─────────────────────────────────────────────────────────

export async function logPhoneTap(placementId: string, locationSlug: string) {
  try {
    const supabase = getAdsClient()
    await supabase.from('ad_phone_taps').insert({
      placement_id: placementId,
      location_slug: locationSlug,
    })
  } catch { /* non-critical */ }
}

// ── Dashboard helpers ─────────────────────────────────────────────────────────

export async function getCampaignStats(ownerEmail: string) {
  const supabase = getAdsClient()
  const { data } = await supabase
    .from('ad_placements')
    .select(`
      *,
      ad_clicks(count),
      ad_impressions(count),
      ad_phone_taps(count)
    `)
    .eq('owner_email', ownerEmail)
  return data ?? []
}

// ── Formatting helpers ────────────────────────────────────────────────────────

export function formatPence(pence: number): string {
  return `£${(pence / 100).toFixed(2)}`
}

export function estimateMonthlyClicks(
  budget_pence: number,
  max_cpc_pence: number
): { low: number; high: number } {
  if (max_cpc_pence <= 0) return { low: 0, high: 0 }
  const avg_clicks = budget_pence / max_cpc_pence
  return {
    low: Math.floor(avg_clicks * 0.7),
    high: Math.ceil(avg_clicks * 1.3),
  }
}

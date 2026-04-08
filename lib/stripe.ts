import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing STRIPE_SECRET_KEY')
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-02-24.acacia',
})

// ── Existing: Ad positions ──────────────────────────────────────────────────
export const PRICE_IDS = {
  counsellor: process.env.STRIPE_COUNSELLOR_PRICE_ID!,
  centre:     process.env.STRIPE_CENTRE_PRICE_ID!,
} as const

// ── Enhanced Listings ───────────────────────────────────────────────────────
export const ENHANCED_PRICE_IDS = {
  centre:     process.env.STRIPE_ENHANCED_CENTRE_PRICE_ID!,     // £49/mo
  counsellor: process.env.STRIPE_ENHANCED_COUNSELLOR_PRICE_ID!, // £8/mo
} as const

export const ENHANCED_PRICES_GBP = {
  centre: 49,
  counsellor: 8,
} as const

// ── City Exclusivity ────────────────────────────────────────────────────────
// Tier 1: major cities (London, Manchester, Birmingham...)
// Tier 2: regional cities (Leeds, Bristol, Edinburgh...)
// Tier 3: smaller towns
export const EXCLUSIVITY_PRICE_IDS = {
  1: process.env.STRIPE_EXCLUSIVITY_TIER1_PRICE_ID!, // £400/mo
  2: process.env.STRIPE_EXCLUSIVITY_TIER2_PRICE_ID!, // £200/mo
  3: process.env.STRIPE_EXCLUSIVITY_TIER3_PRICE_ID!, // £150/mo
} as const

export const EXCLUSIVITY_PRICES_GBP = {
  1: 400,
  2: 200,
  3: 150,
} as const

// Map major cities to their exclusivity tier
export const EXCLUSIVITY_TIERS: Record<string, 1 | 2 | 3> = {
  london: 1, manchester: 1, birmingham: 1, glasgow: 1, liverpool: 1,
  leeds: 2, bristol: 2, edinburgh: 2, sheffield: 2, newcastle: 2,
  nottingham: 2, cardiff: 2, leicester: 2, southampton: 2, brighton: 2,
  oxford: 2, cambridge: 2, belfast: 2, aberdeen: 2, bournemouth: 2,
}
export function getExclusivityTier(slug: string): 1 | 2 | 3 {
  return EXCLUSIVITY_TIERS[slug] ?? 3
}

// ── Rehab Matching Tool ─────────────────────────────────────────────────────
export const MATCHING_PRICE_ID = process.env.STRIPE_MATCHING_PRICE_ID! // £99/mo
export const MATCHING_PRICE_GBP = 99

// ── Helpline Sponsorship ────────────────────────────────────────────────────
export const HELPLINE_PRICE_IDS = {
  national: process.env.STRIPE_HELPLINE_NATIONAL_PRICE_ID!, // £2,000/mo
  regional: process.env.STRIPE_HELPLINE_REGIONAL_PRICE_ID!, // £500/mo
  county:   process.env.STRIPE_HELPLINE_COUNTY_PRICE_ID!,   // £200/mo
} as const

export const HELPLINE_PRICES_GBP = {
  national: 2000,
  regional: 500,
  county: 200,
} as const

// ── Legacy ──────────────────────────────────────────────────────────────────
export const PRICES_GBP = {
  counsellor: 10,
  centre: 99,
} as const


import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing STRIPE_SECRET_KEY')
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-02-24.acacia',
})

export const PRICE_IDS = {
  counsellor: process.env.STRIPE_COUNSELLOR_PRICE_ID!,
  centre: process.env.STRIPE_CENTRE_PRICE_ID!,
} as const

export const PRICES_GBP = {
  counsellor: 10,
  centre: 99,
} as const

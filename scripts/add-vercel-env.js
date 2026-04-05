// This script was used to add Stripe env vars to Vercel.
// Credentials have been removed — run via env vars instead:
// VERCEL_TOKEN=xxx STRIPE_SECRET_KEY=xxx node scripts/add-vercel-env.js
const TOKEN = process.env.VERCEL_TOKEN || ''
const PROJECT_ID = process.env.VERCEL_PROJECT_ID || 'prj_b1n5gxsZH6Dg3U45ZIPY6W0QvLXd'
const TEAM_ID = process.env.VERCEL_TEAM_ID || 'team_LMnxOLDFlzUOgFT9t9AODSAN'

const envVars = [
  { key: 'STRIPE_SECRET_KEY', value: process.env.STRIPE_SECRET_KEY || '', type: 'encrypted' },
  { key: 'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY', value: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '', type: 'plain' },
  { key: 'STRIPE_COUNSELLOR_PRICE_ID', value: process.env.STRIPE_COUNSELLOR_PRICE_ID || '', type: 'plain' },
  { key: 'STRIPE_CENTRE_PRICE_ID', value: process.env.STRIPE_CENTRE_PRICE_ID || '', type: 'plain' },
  { key: 'STRIPE_WEBHOOK_SECRET', value: process.env.STRIPE_WEBHOOK_SECRET || '', type: 'encrypted' },
]

async function main() {
  if (!TOKEN) { console.error('Set VERCEL_TOKEN env var'); process.exit(1) }
  for (const env of envVars) {
    if (!env.value) { console.log(`Skipping ${env.key} (no value)`); continue }
    const res = await fetch(`https://api.vercel.com/v10/projects/${PROJECT_ID}/env?teamId=${TEAM_ID}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ key: env.key, value: env.value, type: env.type, target: ['production', 'preview'] }),
    })
    const data = await res.json()
    if (res.ok) console.log(`✅ ${env.key}`)
    else if (data.error?.code === 'ENV_ALREADY_EXISTS' && data.error?.envVarId) {
      const pr = await fetch(`https://api.vercel.com/v10/projects/${PROJECT_ID}/env/${data.error.envVarId}?teamId=${TEAM_ID}`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ value: env.value }),
      })
      console.log(pr.ok ? `✅ ${env.key} (updated)` : `❌ ${env.key}`)
    } else {
      console.log(`❌ ${env.key}:`, data.error?.message)
    }
  }
}
main().catch(console.error)

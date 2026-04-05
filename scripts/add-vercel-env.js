const TOKEN = 'vcp_1W2LvunXLiHls9Zh5Y1YxR7lvFqW02Krv9vLIpoNtwWSEMsroX1xKF9d'
const TEAM_ID = 'team_LMnxOLDFlzUOgFT9t9AODSAN'

async function main() {
  // List projects to find correct sobernation ID
  const r = await fetch(`https://api.vercel.com/v9/projects?teamId=${TEAM_ID}&limit=50`, {
    headers: { Authorization: `Bearer ${TOKEN}` }
  })
  const d = await r.json()
  const projects = d.projects || []
  projects.forEach(p => console.log(`${p.name}: ${p.id}`))

  const sobernation = projects.find(p => p.name === 'sobernation')
  if (!sobernation) { console.log('sobernation project not found!'); return }

  const PROJECT_ID = sobernation.id
  console.log('\nUsing project ID:', PROJECT_ID)

  const envVars = [
    { key: 'STRIPE_SECRET_KEY', value: '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', type: 'encrypted' },
    { key: 'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY', value: 'pk_live_51TIu1OGxFFqc4jX6itk1VRZqFEC1gULks0JYGy7NkScZZvDy6BzNka5f8x4oUOxheHZ6rrzAJjP3F5CC9LvGBwl800o33azZGX', type: 'plain' },
    { key: 'STRIPE_COUNSELLOR_PRICE_ID', value: 'price_1TluEcGxFFqc4jX6seTj1xav', type: 'plain' },
    { key: 'STRIPE_CENTRE_PRICE_ID', value: 'price_1TluH9GxFFqc4jX6KaWp6cSs', type: 'plain' },
    { key: 'STRIPE_WEBHOOK_SECRET', value: 'whsec_6vl75Ebtcj6zVEbOSK27PWT00trOAooH', type: 'encrypted' },
  ]

  for (const env of envVars) {
    const res = await fetch(`https://api.vercel.com/v10/projects/${PROJECT_ID}/env?teamId=${TEAM_ID}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ key: env.key, value: env.value, type: env.type, target: ['production', 'preview'] }),
    })
    const data = await res.json()
    if (res.ok) {
      console.log(`✅ ${env.key}`)
    } else if (data.error?.code === 'ENV_ALREADY_EXISTS' && data.error?.envVarId) {
      const patchRes = await fetch(`https://api.vercel.com/v10/projects/${PROJECT_ID}/env/${data.error.envVarId}?teamId=${TEAM_ID}`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ value: env.value }),
      })
      console.log(patchRes.ok ? `✅ ${env.key} (updated)` : `❌ ${env.key} patch failed`)
    } else {
      console.log(`❌ ${env.key}:`, JSON.stringify(data).slice(0, 200))
    }
  }

  // Trigger redeploy via git integration (create deployment from latest commit)
  console.log('\nTriggering redeploy...')
  const latestRef = sobernation.latestDeployments?.[0]?.meta?.githubCommitSha
  if (latestRef) {
    const redeployRes = await fetch(`https://api.vercel.com/v13/deployments?teamId=${TEAM_ID}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'sobernation',
        project: PROJECT_ID,
        target: 'production',
        gitSource: {
          type: sobernation.link?.type || 'github',
          repoId: sobernation.link?.repoId,
          ref: sobernation.link?.productionBranch || 'main',
          sha: latestRef,
        },
      }),
    })
    const rd = await redeployRes.json()
    if (redeployRes.ok) {
      console.log('✅ Redeploy triggered:', rd.url || rd.id)
    } else {
      console.log('⚠ Redeploy failed:', JSON.stringify(rd).slice(0, 200))
      console.log('→ Trigger manually: Vercel dashboard → Deployments → Redeploy')
    }
  } else {
    console.log('⚠ Could not find latest SHA for redeploy — trigger manually in Vercel dashboard')
  }
}

main().catch(console.error)

import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import {  getLocationSlugs, getLocation , getTopLocationSlugs } from '../../../lib/locations'
import RehabTypePage from '../../../components/RehabTypePage'
import { WOMENS_REHAB_CONFIG } from '../../../lib/rehab-types'

export const dynamicParams = true

export async function generateStaticParams() {
  return getTopLocationSlugs().map(location => ({ location }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ location: string }> }
): Promise<Metadata> {
  const { location } = await params
  const loc = getLocation(location)
  if (!loc) return {}
  return {
    title: `Women's Rehab in ${loc.name} | SoberNation`,
    description: `Women-only addiction rehab in ${loc.name}: trauma-informed treatment in a safe, female-specific environment. NHS-funded and private residential options for women with alcohol and drug dependency.`,
  }
}

export default async function Page(
  { params }: { params: Promise<{ location: string }> }
) {
  const { location } = await params
  const loc = getLocation(location)
  if (!loc) notFound()
  return <RehabTypePage config={WOMENS_REHAB_CONFIG} location={loc.name} locationSlug={location} loc={loc} />
}
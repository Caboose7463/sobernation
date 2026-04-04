import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getLocationSlugs, getLocation } from '../../../lib/locations'
import RehabTypePage from '../../../components/RehabTypePage'
import { REHAB_COST_CONFIG } from '../../../lib/rehab-types'

export const dynamicParams = false

export async function generateStaticParams() {
  return getLocationSlugs().map(location => ({ location }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ location: string }> }
): Promise<Metadata> {
  const { location } = await params
  const loc = getLocation(location)
  if (!loc) return {}
  return {
    title: `How Much Does Rehab Cost in ${loc.name}? | Rehab Prices UK | SoberNation`,
    description: `Rehab costs in ${loc.name}: NHS is free. Private rehab from £3,000–£8,000 for 28 days. Full guide to rehab pricing, NHS funding, and how to access free treatment in ${loc.name}.`,
  }
}

export default async function Page(
  { params }: { params: Promise<{ location: string }> }
) {
  const { location } = await params
  const loc = getLocation(location)
  if (!loc) notFound()
  return <RehabTypePage config={REHAB_COST_CONFIG} location={loc.name} locationSlug={location} loc={loc} />
}
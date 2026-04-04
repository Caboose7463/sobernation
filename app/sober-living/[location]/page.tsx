import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getLocationSlugs, getLocation } from '../../../lib/locations'
import RehabTypePage from '../../../components/RehabTypePage'
import { SOBER_LIVING_CONFIG } from '../../../lib/rehab-types'

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
    title: `Sober Living Homes in ${loc.name} | Recovery Housing | SoberNation`,
    description: `Sober living and recovery housing in ${loc.name}. Drug-free supported accommodation for people in recovery from addiction. Find sober houses near ${loc.name} — some council-funded.`,
  }
}

export default async function Page(
  { params }: { params: Promise<{ location: string }> }
) {
  const { location } = await params
  const loc = getLocation(location)
  if (!loc) notFound()
  return <RehabTypePage config={SOBER_LIVING_CONFIG} location={loc.name} locationSlug={location} loc={loc} />
}
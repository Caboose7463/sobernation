import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import {  getLocationSlugs, getLocation , getTopLocationSlugs } from '../../../lib/locations'
import RehabTypePage from '../../../components/RehabTypePage'
import { ABSTINENCE_REHAB_CONFIG } from '../../../lib/rehab-types'

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
    title: `Abstinence-Based Rehab in ${loc.name} | SoberNation`,
    description: `Complete abstinence-focused addiction rehabilitation in ${loc.name}. Free NHS options. Call 0300 123 6600.`,
  }
}

export default async function Page(
  { params }: { params: Promise<{ location: string }> }
) {
  const { location } = await params
  const loc = getLocation(location)
  if (!loc) notFound()
  return <RehabTypePage config={ABSTINENCE_REHAB_CONFIG} location={loc.name} locationSlug={location} loc={loc} />
}
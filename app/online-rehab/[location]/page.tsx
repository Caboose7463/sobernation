import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import {  getLocationSlugs, getLocation , getTopLocationSlugs } from '../../../lib/locations'
import RehabTypePage from '../../../components/RehabTypePage'
import { ONLINE_REHAB_CONFIG } from '../../../lib/rehab-types'

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
    title: `Online Rehab in ${loc.name} | SoberNation`,
    description: `Online addiction treatment in ${loc.name}: video therapy, digital CBT programmes and virtual group sessions for alcohol and drug misuse. Access support from home — no waiting list.`,
  }
}

export default async function Page(
  { params }: { params: Promise<{ location: string }> }
) {
  const { location } = await params
  const loc = getLocation(location)
  if (!loc) notFound()
  return <RehabTypePage config={ONLINE_REHAB_CONFIG} location={loc.name} locationSlug={location} loc={loc} />
}
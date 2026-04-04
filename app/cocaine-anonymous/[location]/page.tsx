import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getLocationSlugs, getLocation } from '../../../lib/locations'
import SupportGroupPage from '../../../components/SupportGroupPage'
import { COCAINE_ANONYMOUS_CONFIG } from '../../../lib/support-groups'

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
    title: `Cocaine Anonymous Meetings in ${loc.name} | CA Meetings UK | SoberNation`,
    description: `Free Cocaine Anonymous (CA) meetings in ${loc.name} for cocaine, crack, and stimulant addiction. 12-step fellowship. Find meeting times near ${loc.name}. Call 0800 612 0225.`,
  }
}

export default async function Page(
  { params }: { params: Promise<{ location: string }> }
) {
  const { location } = await params
  const loc = getLocation(location)
  if (!loc) notFound()
  return <SupportGroupPage config={COCAINE_ANONYMOUS_CONFIG} location={loc.name} locationSlug={location} />
}
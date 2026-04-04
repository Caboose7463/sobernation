import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getLocationSlugs, getLocation } from '../../../lib/locations'
import SupportGroupPage from '../../../components/SupportGroupPage'
import { ALAON_CONFIG } from '../../../lib/support-groups'

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
    title: `Al-Anon Meetings in ${loc.name} | Support for Families | SoberNation`,
    description: `Free Al-Anon meetings in ${loc.name} for families and friends of people with alcohol problems. Find local meeting times, what to expect, and how Al-Anon can help. Call 0800 0086 811.`,
  }
}

export default async function Page(
  { params }: { params: Promise<{ location: string }> }
) {
  const { location } = await params
  const loc = getLocation(location)
  if (!loc) notFound()
  return <SupportGroupPage config={ALAON_CONFIG} location={loc.name} locationSlug={location} />
}
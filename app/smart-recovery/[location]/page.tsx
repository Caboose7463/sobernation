import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getLocationSlugs, getLocation } from '../../../lib/locations'
import SupportGroupPage from '../../../components/SupportGroupPage'
import { SMART_RECOVERY_CONFIG } from '../../../lib/support-groups'

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
    title: `SMART Recovery Meetings in ${loc.name} | Alternative to AA | SoberNation`,
    description: `Free SMART Recovery meetings in ${loc.name} — science-based alternative to AA and NA for alcohol and drug addiction. CBT-based tools. No 12 steps required. Find meetings near ${loc.name}.`,
  }
}

export default async function Page(
  { params }: { params: Promise<{ location: string }> }
) {
  const { location } = await params
  const loc = getLocation(location)
  if (!loc) notFound()
  return <SupportGroupPage config={SMART_RECOVERY_CONFIG} location={loc.name} locationSlug={location} />
}
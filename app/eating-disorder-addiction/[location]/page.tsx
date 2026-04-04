import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getLocationSlugs, getLocation } from '../../../lib/locations'
import RehabTypePage from '../../../components/RehabTypePage'
import { EATING_DISORDER_ADDICTION_CONFIG } from '../../../lib/rehab-types'

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
    title: `Eating Disorder & Addiction Help in ${loc.name} | SoberNation`,
    description: `Co-occurring eating disorder and addiction treatment in ${loc.name}. Free NHS options. Call 0300 123 6600.`,
  }
}

export default async function Page(
  { params }: { params: Promise<{ location: string }> }
) {
  const { location } = await params
  const loc = getLocation(location)
  if (!loc) notFound()
  return <RehabTypePage config={EATING_DISORDER_ADDICTION_CONFIG} location={loc.name} locationSlug={location} loc={loc} />
}
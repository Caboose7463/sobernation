import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getLocationSlugs, getLocation } from '../../../lib/locations'
import RehabTypePage from '../../../components/RehabTypePage'
import { NHS_REHAB_CONFIG } from '../../../lib/rehab-types'

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
    title: `Free NHS Rehab in ${loc.name} | NHS Addiction Treatment | SoberNation`,
    description: `Free NHS drug and alcohol rehab in ${loc.name}. Access community treatment, medication, and NHS-funded residential rehab via your GP or Frank (0300 123 6600). No waiting fees.`,
  }
}

export default async function Page(
  { params }: { params: Promise<{ location: string }> }
) {
  const { location } = await params
  const loc = getLocation(location)
  if (!loc) notFound()
  return <RehabTypePage config={NHS_REHAB_CONFIG} location={loc.name} locationSlug={location} loc={loc} />
}
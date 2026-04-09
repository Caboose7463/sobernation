import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import {  getLocationSlugs, getLocation , getTopLocationSlugs } from '../../../lib/locations'
import RehabTypePage from '../../../components/RehabTypePage'
import { MDMA_ADDICTION_CONFIG } from '../../../lib/rehab-types'

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
    title: `MDMA & Ecstasy Addiction Help in ${loc.name} | SoberNation`,
    description: `MDMA and ecstasy addiction treatment in ${loc.name}: NHS community support, counselling and private rehab. Free help for ecstasy dependency via Frank or your local drug and alcohol service.`,
  }
}

export default async function Page(
  { params }: { params: Promise<{ location: string }> }
) {
  const { location } = await params
  const loc = getLocation(location)
  if (!loc) notFound()
  return <RehabTypePage config={MDMA_ADDICTION_CONFIG} location={loc.name} locationSlug={location} loc={loc} />
}
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import {  getLocationSlugs, getLocation , getTopLocationSlugs } from '../../../lib/locations'
import { substanceLocationMetadata } from '../../../lib/seo'
import { SUBSTANCE_CONFIGS } from '../../../lib/substances'
import SubstanceLocationPage from '../../../components/SubstanceLocationPage'

const SUBSTANCE = SUBSTANCE_CONFIGS['pregabalin-addiction']

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
  return substanceLocationMetadata(SUBSTANCE.slug, SUBSTANCE.name, loc.name)
}

export default async function Page(
  { params }: { params: Promise<{ location: string }> }
) {
  const { location } = await params
  const loc = getLocation(location)
  if (!loc) notFound()
  return <SubstanceLocationPage substance={SUBSTANCE} loc={loc} locationSlug={location} />
}

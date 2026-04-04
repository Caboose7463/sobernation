import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import {  getLocationSlugs, getLocation , getTopLocationSlugs } from '../../../lib/locations'
import RehabTypePage from '../../../components/RehabTypePage'
import { DUAL_DIAGNOSIS_CONFIG } from '../../../lib/rehab-types'

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
    title: `Dual Diagnosis Treatment in ${loc.name} | Mental Health & Addiction | SoberNation`,
    description: `Dual diagnosis treatment in ${loc.name} — mental health and addiction treated together. Free NHS and private options. Depression, anxiety, PTSD and substance use treated simultaneously. Call 0300 123 6600.`,
  }
}

export default async function Page(
  { params }: { params: Promise<{ location: string }> }
) {
  const { location } = await params
  const loc = getLocation(location)
  if (!loc) notFound()
  return <RehabTypePage config={DUAL_DIAGNOSIS_CONFIG} location={loc.name} locationSlug={location} loc={loc} />
}
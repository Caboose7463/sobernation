import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import {  getLocationSlugs, getLocation , getTopLocationSlugs } from '../../../lib/locations'
import SupportGroupPage from '../../../components/SupportGroupPage'
import { ALAON_CONFIG } from '../../../lib/support-groups'

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
    title: `Al-Anon Meetings in ${loc.name} | Support for Families`,
    description: `How to find Al-Anon meetings in ${loc.name} for families and friends of people who drink: the official Al-Anon UK meeting finder, the free helpline 0800 0086 811 (10am to 10pm) and what to expect at a first meeting.`,
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
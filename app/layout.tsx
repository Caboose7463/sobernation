import type { Metadata } from 'next'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import StoriesCTA from '../components/StoriesCTA'
import CommunityCard from '../components/CommunityCard'
import Nav from '../components/Nav'
import CookieConsent from '../components/CookieConsent'
import SiteFooter from '../components/SiteFooter'
import CrisisBand from '../components/CrisisBand'
import { headers } from 'next/headers'
import { siteLinksSearchBoxSchema } from '../lib/seo'
import { NOT_COUNTED } from '@/lib/not-counted';

export const metadata: Metadata = {
  title: {
    default: 'SoberNation | Alcohol & Drug Addiction Help & Recovery Resources',
    template: '%s | SoberNation',
  },
  description: "The UK's addiction recovery hub. Find rehab centres, drug treatment programmes, AA & NA meetings, NHS support services and free resources near you.",
  metadataBase: new URL('https://www.sobernation.co.uk'),
  openGraph: {
    siteName: 'SoberNation',
    type: 'website',
  },
  other: {
    'article:publisher': 'https://www.sobernation.co.uk',
  },
}

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'SoberNation',
  alternateName: 'SoberNation Health & Wellbeing',
  url: 'https://www.sobernation.co.uk',
  logo: {
    '@type': 'ImageObject',
    url: 'https://www.sobernation.co.uk/logo.png',
    width: '200',
    height: '60',
  },
  description: "The UK's addiction recovery hub — free information about alcohol and drug addiction treatment, rehab centres, NHS services, and recovery support across the UK.",
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'info@sobernation.co.uk',
    contactType: 'customer support',
    areaServed: 'GB',
    availableLanguage: 'English',
  },
  foundingDate: '2024',
  knowsAbout: [
    'Alcohol addiction treatment',
    'Drug rehabilitation',
    'NHS addiction services',
    'Substance use disorder',
    'Recovery support UK',
  ],
}

const webSiteSchema = siteLinksSearchBoxSchema()

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const headersList = await headers()
  const pathname = headersList.get('x-invoke-path') || headersList.get('x-pathname') || ''
  const hideCommunityCard = pathname.startsWith('/community') || pathname.startsWith('/admin')

  return (
    <html lang="en">
      <head>
        {/* First, before any analytics: keeps bots, the owner's devices and testing out of Google Analytics */}
        <script dangerouslySetInnerHTML={{ __html: NOT_COUNTED }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://clvhzvuhwjtyvrddoorm.supabase.co" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        {/* Google AdSense (no Auto ads; units are placed by components/AdUnit) */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1914833169264702"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
        />
      </head>
      <body suppressHydrationWarning>
        <Nav />
        {children}
        {!hideCommunityCard && <CommunityCard />}
        <StoriesCTA />
        <CrisisBand />
        <SiteFooter />
        <CookieConsent />

        {/* Google Consent Mode v2 — default DENY before user chooses */}
        <Script id="google-consent" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied',
              analytics_storage: 'granted',
              wait_for_update: 500
            });
          `}
        </Script>

        {/* Google Analytics 4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-RGCKFQLVLJ"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-RGCKFQLVLJ', { page_path: window.location.pathname });
          `}
        </Script>

        <Analytics />
        <script async src="https://stats-wall-smoky.vercel.app/api/live.js" data-site="sober-nation" />
      </body>
    </html>
  )
}

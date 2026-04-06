import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import StoriesCTA from '../components/StoriesCTA'
import CommunityCard from '../components/CommunityCard'
import Nav from '../components/Nav'
import CookieConsent from '../components/CookieConsent'
import { headers } from 'next/headers'

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
  url: 'https://www.sobernation.co.uk',
  logo: 'https://www.sobernation.co.uk/logo.png',
  description: "The UK's addiction recovery hub — free information about alcohol and drug addiction treatment, rehab centres, NHS services, and recovery support across the UK.",
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'editorial@sobernation.co.uk',
    contactType: 'editorial',
    areaServed: 'GB',
    availableLanguage: 'English',
  },
  sameAs: [],
}

const webSiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'SoberNation',
  url: 'https://www.sobernation.co.uk',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://www.sobernation.co.uk/?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const headersList = await headers()
  const pathname = headersList.get('x-invoke-path') || headersList.get('x-pathname') || ''
  const hideCommunityCard = pathname.startsWith('/community') || pathname.startsWith('/admin')

  return (
    <html lang="en">
      <head>
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

        {/* Google AdSense */}
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8511236039964647"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
      </body>
    </html>
  )
}

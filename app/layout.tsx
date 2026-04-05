import type { Metadata } from 'next'
import './globals.css'
import StoriesCTA from '../components/StoriesCTA'

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
      <body>
        {children}
        <StoriesCTA />
      </body>
    </html>
  )
}

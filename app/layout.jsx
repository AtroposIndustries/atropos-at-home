import '@/styles/base.css'
import '@/styles/home-theme.css'
import '@/styles/local.css'

import { ThemeProvider }  from '@/lib/theme-context'

import { SITE_URL, PHONE_TEL } from '@/lib/site'
import { OG_IMAGE } from '@/lib/seo'

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:  'Smart Home Automation, AV & Home Theatre Tasmania | Atropos',
    template: '%s | Atropos',
  },
  description:
    'Premium smart home automation, distributed audio, and home theatre design, specification, installation and commissioning. Beautifully integrated technology for architects, builders and discerning homeowners across Tasmania.',
  keywords: [
    'smart home Hobart',
    'home automation Tasmania',
    'home theatre Hobart',
    'distributed audio Tasmania',
    'AV installation Tasmania',
    'smart lighting Hobart',
    'Crestron Tasmania',
    'Control4 Tasmania',
    'Lutron Tasmania',
    'smart home installer Hobart',
  ],
  openGraph: {
    type:     'website',
    locale:   'en_AU',
    siteName: 'Atropos',
    url:      SITE_URL,
    images: [OG_IMAGE],
  },
  twitter: {
    card:   'summary_large_image',
    images: ['/img/og-image.jpg'],
  },
  robots: {
    index:  true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: SITE_URL,
  },
}

// ── Schema.org: Atropos ───────────────────────────────────
const schemaHome = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type':             ['LocalBusiness', 'HomeAndConstructionBusiness'],
      '@id':               `${SITE_URL}/#business`,
      name:                'Atropos',
      parentOrganization:  { '@id': 'https://atropos.com.au/#organisation' },
      url:                 SITE_URL,
      description:
        'Atropos designs and installs integrated technology for Tasmanian homes and businesses — control and automation, audio, networks and acoustics. Hobart, Tasmania.',
      priceRange: '$$$',
      address: {
        '@type':          'PostalAddress',
        addressLocality:  'Hobart',
        addressRegion:    'TAS',
        postalCode:       '7000',
        addressCountry:   'AU',
      },
      geo: {
        '@type':    'GeoCoordinates',
        latitude:   -42.8821,
        longitude:  147.3272,
      },
      areaServed: [
        { '@type': 'State', name: 'Tasmania' },
        { '@type': 'City',  name: 'Hobart' },
        { '@type': 'City',  name: 'Launceston' },
        { '@type': 'City',  name: 'Devonport' },
        { '@type': 'City',  name: 'Burnie' },
      ],
      email:     'hello@atropos.com.au',
      telephone: PHONE_TEL,
      knowsAbout: [
        'Smart Home Automation',
        'Home Theatre',
        'Distributed Audio',
        'Home Networking',
        'Crestron',
        'Control4',
        'Lutron',
        'Acoustic Treatment',
        'Custom AV Integration',
        'Digital Signage',
        'Networking & Wi-Fi',
        'Conference Room AV',
        'Building Automation',
      ],
      sameAs: [
        'https://www.facebook.com/atroposptyltd',
        'https://www.instagram.com/atroposptyltd',
        SITE_URL,
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name:    'Atropos Services',
        itemListElement: [
          // Residential
          { '@type': 'Offer', itemOffered: { '@id': `${SITE_URL}/#service-smart-home`  } },
          { '@type': 'Offer', itemOffered: { '@id': `${SITE_URL}/#service-home-theatre`} },
          { '@type': 'Offer', itemOffered: { '@id': `${SITE_URL}/#service-network`     } },
          // Commercial
          { '@type': 'Offer', itemOffered: { '@id': `${SITE_URL}/#service-commercial-audio-visual` } },
          { '@type': 'Offer', itemOffered: { '@id': `${SITE_URL}/#service-commercial-control`       } },
          { '@type': 'Offer', itemOffered: { '@id': `${SITE_URL}/#service-commercial-networks`      } },
          { '@type': 'Offer', itemOffered: { '@id': `${SITE_URL}/#service-commercial-support`       } },
        ],
      },
    },
    {
      '@type':      'Service',
      '@id':        `${SITE_URL}/#service-smart-home`,
      name:         'Smart Home Automation',
      provider:     { '@id': `${SITE_URL}/#business` },
      description:  'Whole-home automation integrating lighting, climate, security, and AV into a single intuitive control system. Designed for new builds and retrofits across Tasmania.',
      serviceType:  'Smart Home Automation',
      areaServed:   { '@type': 'State', name: 'Tasmania' },
    },
    {
      '@type':      'Service',
      '@id':        `${SITE_URL}/#service-home-theatre`,
      name:         'Home Theatre',
      provider:     { '@id': `${SITE_URL}/#business` },
      description:  'Bespoke home theatre design and installation — from acoustic treatment and projection systems to immersive surround sound. Built for the discerning homeowner.',
      serviceType:  'Home Theatre Installation',
      areaServed:   { '@type': 'State', name: 'Tasmania' },
    },
    {
      '@type':      'Service',
      '@id':        `${SITE_URL}/#service-network`,
      name:         'Network & Wi-Fi',
      provider:     { '@id': `${SITE_URL}/#business` },
      description:  'Resilient, high-performance home networking infrastructure to support smart devices, streaming, and remote work — designed and installed by our team.',
      serviceType:  'Network Installation',
      areaServed:   { '@type': 'State', name: 'Tasmania' },
    },
    {
      '@type':      'Service',
      '@id':        `${SITE_URL}/#service-commercial-audio-visual`,
      name:         'Audio Visual',
      provider:     { '@id': `${SITE_URL}/#business` },
      description:  'Commercial audio visual design, installation and support: meeting rooms and video conferencing, zoned audio and paging, digital signage and displays, for Tasmanian workplaces and venues.',
      serviceType:  'Commercial Audio Visual Installation',
      areaServed:   { '@type': 'State', name: 'Tasmania' },
    },
    {
      '@type':      'Service',
      '@id':        `${SITE_URL}/#service-commercial-control`,
      name:         'Automation & Smart Lighting',
      provider:     { '@id': `${SITE_URL}/#business` },
      description:  'Scheduling and occupancy-driven automation across floors and tenancies — lighting, climate and AV governed as one system for offices, retail and hospitality.',
      serviceType:  'Building Automation',
      areaServed:   { '@type': 'State', name: 'Tasmania' },
    },
    {
      '@type':      'Service',
      '@id':        `${SITE_URL}/#service-commercial-networks`,
      name:         'Networking & Wi-Fi',
      provider:     { '@id': `${SITE_URL}/#business` },
      description:  'Business networks designed, monitored and patched on a schedule, segmented so a compromised device cannot reach the rest of the business.',
      serviceType:  'Managed Network Services',
      areaServed:   { '@type': 'State', name: 'Tasmania' },
    },
    {
      '@type':      'Service',
      '@id':        `${SITE_URL}/#service-commercial-support`,
      name:         'Managed Services',
      provider:     { '@id': `${SITE_URL}/#business` },
      description:  'Proactive monitoring and scheduled maintenance for the systems a business runs on, with response times scoped per site.',
      serviceType:  'Managed IT & AV Support',
      areaServed:   { '@type': 'State', name: 'Tasmania' },
    },
  ],
}

export default function RootLayout({ children }) {
  return (
    <html lang="en-AU">
      <head>
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-8RGK41Y2L5" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-8RGK41Y2L5');`,
          }}
        />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600&family=Lexend:wght@100..900&display=swap" rel="stylesheet"/>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaHome) }}
        />
      </head>
      <body>
        <ThemeProvider brand="home">
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

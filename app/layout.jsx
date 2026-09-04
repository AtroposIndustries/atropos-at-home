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
        'Managed Networks',
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
          { '@type': 'Offer', itemOffered: { '@id': `${SITE_URL}/#service-audio`       } },
          { '@type': 'Offer', itemOffered: { '@id': `${SITE_URL}/#service-network`     } },
          { '@type': 'Offer', itemOffered: { '@id': `${SITE_URL}/#service-acoustic`    } },
          // Commercial
          { '@type': 'Offer', itemOffered: { '@id': `${SITE_URL}/#service-commercial-control`       } },
          { '@type': 'Offer', itemOffered: { '@id': `${SITE_URL}/#service-commercial-meeting-rooms` } },
          { '@type': 'Offer', itemOffered: { '@id': `${SITE_URL}/#service-commercial-audio`         } },
          { '@type': 'Offer', itemOffered: { '@id': `${SITE_URL}/#service-commercial-networks`      } },
          { '@type': 'Offer', itemOffered: { '@id': `${SITE_URL}/#service-commercial-signage`       } },
          { '@type': 'Offer', itemOffered: { '@id': `${SITE_URL}/#service-commercial-acoustic`      } },
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
      name:         'Premium Home Theatre',
      provider:     { '@id': `${SITE_URL}/#business` },
      description:  'Bespoke home theatre design and installation — from acoustic treatment and projection systems to immersive surround sound. Built for the discerning homeowner.',
      serviceType:  'Home Theatre Installation',
      areaServed:   { '@type': 'State', name: 'Tasmania' },
    },
    {
      '@type':      'Service',
      '@id':        `${SITE_URL}/#service-audio`,
      name:         'Distributed Audio',
      provider:     { '@id': `${SITE_URL}/#business` },
      description:  'Whole-home and multi-room audio distribution — high-fidelity music delivered to every room, controlled from a single app or in-wall panel.',
      serviceType:  'Audio Installation',
      areaServed:   { '@type': 'State', name: 'Tasmania' },
    },
    {
      '@type':      'Service',
      '@id':        `${SITE_URL}/#service-network`,
      name:         'Network & Connectivity',
      provider:     { '@id': `${SITE_URL}/#business` },
      description:  'Resilient, high-performance home networking infrastructure to support smart devices, streaming, and remote work — designed and installed by our team.',
      serviceType:  'Network Installation',
      areaServed:   { '@type': 'State', name: 'Tasmania' },
    },
    {
      '@type':      'Service',
      '@id':        `${SITE_URL}/#service-acoustic`,
      name:         'Acoustic Treatment',
      provider:     { '@id': `${SITE_URL}/#business` },
      description:  'Acoustic design and treatment for dedicated home theatres and listening rooms — panel placement, room analysis, and material specification for optimal sound.',
      serviceType:  'Acoustic Treatment',
      areaServed:   { '@type': 'State', name: 'Tasmania' },
    },
    {
      '@type':      'Service',
      '@id':        `${SITE_URL}/#service-commercial-control`,
      name:         'Building & Room Control',
      provider:     { '@id': `${SITE_URL}/#business` },
      description:  'Scheduling and occupancy-driven automation across floors and tenancies — lighting, climate and AV governed as one system for offices, retail and hospitality.',
      serviceType:  'Building Automation',
      areaServed:   { '@type': 'State', name: 'Tasmania' },
    },
    {
      '@type':      'Service',
      '@id':        `${SITE_URL}/#service-commercial-meeting-rooms`,
      name:         'Meeting & Conference Rooms',
      provider:     { '@id': `${SITE_URL}/#business` },
      description:  'One-touch video conferencing and room technology for meeting and conference spaces — camera and microphone coverage designed against the room, working the moment someone walks in.',
      serviceType:  'Conference Room AV Installation',
      areaServed:   { '@type': 'State', name: 'Tasmania' },
    },
    {
      '@type':      'Service',
      '@id':        `${SITE_URL}/#service-commercial-audio`,
      name:         'Distributed Audio & Paging',
      provider:     { '@id': `${SITE_URL}/#business` },
      description:  'Zoned background music and all-call paging with emergency override, licensed and designed for commercial premises.',
      serviceType:  'Commercial Audio & Paging Installation',
      areaServed:   { '@type': 'State', name: 'Tasmania' },
    },
    {
      '@type':      'Service',
      '@id':        `${SITE_URL}/#service-commercial-networks`,
      name:         'Managed Networks',
      provider:     { '@id': `${SITE_URL}/#business` },
      description:  'Business networks designed, monitored and patched on a schedule, segmented so a compromised device cannot reach the rest of the business.',
      serviceType:  'Managed Network Services',
      areaServed:   { '@type': 'State', name: 'Tasmania' },
    },
    {
      '@type':      'Service',
      '@id':        `${SITE_URL}/#service-commercial-signage`,
      name:         'Digital Signage & Wayfinding',
      provider:     { '@id': `${SITE_URL}/#business` },
      description:  'Wayfinding, menu boards and building information on a centrally managed CMS, with content scheduled and pushed to every screen from one dashboard.',
      serviceType:  'Digital Signage Installation',
      areaServed:   { '@type': 'State', name: 'Tasmania' },
    },
    {
      '@type':      'Service',
      '@id':        `${SITE_URL}/#service-commercial-acoustic`,
      name:         'Acoustic Treatment (Commercial)',
      provider:     { '@id': `${SITE_URL}/#business` },
      description:  'Speech intelligibility and speech privacy engineered for open-plan offices, boardrooms and clinical spaces.',
      serviceType:  'Commercial Acoustic Treatment',
      areaServed:   { '@type': 'State', name: 'Tasmania' },
    },
    {
      '@type':      'Service',
      '@id':        `${SITE_URL}/#service-commercial-support`,
      name:         'Managed Services & Support',
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

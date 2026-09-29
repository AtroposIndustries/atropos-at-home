// ── Industries: Retail — page content ───────

export const HERO = {
  title: 'Retail',
  body:  'Shops, showrooms and multi-site retailers. Screens that sell, music that suits the store, and EFTPOS that doesn\'t drop out on a Saturday.',
  // image: { src, alt, width, height } — a real or illustrative photo, when there is one.
}

export const SERVICES = {
  title: 'What we do for retailers',
  items: [
    {
      name: 'Digital Signage & Audio Visual',
      desc: 'Window and in-store screens that head office or the store manager can update, and background music zoned across the floor.',
      href: '/commercial/signage-audio-visual',
    },
    {
      name: 'Network & Wi-Fi',
      desc: 'EFTPOS, point-of-sale and cameras on their own network, watched so a busy day doesn\'t bring the till down.',
      href: '/commercial/networks',
    },
    {
      name: 'Managed Services & IT Support',
      desc: 'Point-of-sale computers, back-office laptops and accounts looked after, with one number when something breaks.',
      href: '/commercial/support',
    },
    {
      name: 'Automation',
      desc: 'Lighting and screens that follow trading hours, on at open and off at close.',
      href: '/commercial/automation',
    },
  ],
}

export const STEPS = {
  title: 'A typical store fit-out',
  items: [
    { title: 'We walk the store', body: 'Before or after trading, with whoever runs it, to see the floor, the window and the back office.' },
    { title: 'We scope it in writing', body: 'Screens, speakers and network, what staff will touch, and a clear quote before anything is ordered.' },
    { title: 'We install out of hours', body: 'Before opening or after close where we can, so the store keeps trading.' },
  ],
}

// A real job, when there is one — see components/sections/CaseStudy.jsx.
// Left null, nothing renders on the site.
export const CASE_STUDY = null

export const CTA = {
  title:      'Tell us about your store.',
  body:       'Tell us what you sell, how many stores and when you trade. We\'ll work out what applies.',
  primaryCta: { label: 'Get in touch', href: '#contact' },
  backLink:   { label: 'All commercial services', href: '/commercial' },
}

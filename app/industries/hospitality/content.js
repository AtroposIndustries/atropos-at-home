// ── Industries: Hospitality & tourism — page content ───────

export const HERO = {
  title: 'Hospitality & tourism',
  body:  'Hotels, restaurants, bars, function venues and cellar doors. Technology your staff can run on a busy night, and your guests only notice when it\'s good.',
  // image: { src, alt, width, height } — a venue shot, when there is one.
}

export const SERVICES = {
  title: 'What we do for venues',
  items: [
    {
      name: 'Digital Signage & Audio Visual',
      desc: 'Menu boards and screens staff can update, music zoned by area, and paging that cuts through.',
      href: '/commercial/signage-audio-visual',
    },
    {
      name: 'Network & Wi-Fi',
      desc: 'Guest Wi-Fi kept apart from EFTPOS, cameras and staff devices, and watched so problems surface before service.',
      href: '/commercial/networks',
    },
    {
      name: 'Unified Communications',
      desc: 'Function and meeting rooms where a presenter plugs in and it works, first time.',
      href: '/commercial/unified-communications',
    },
    {
      name: 'Automation',
      desc: 'Lighting, climate and blinds that follow trading hours instead of a timer nobody\'s touched.',
      href: '/commercial/automation',
    },
    {
      name: 'Managed Services & IT Support',
      desc: 'One number when something breaks, and someone who already knows your venue.',
      href: '/commercial/support',
    },
  ],
}

export const STEPS = {
  title: 'A typical venue fit-out',
  items: [
    { title: 'We walk the venue',         body: 'At a quiet time, with whoever runs it day to day. We look at what\'s there and what staff actually use.' },
    { title: 'We scope it in writing',    body: 'What goes where, what staff will touch, and a clear quote before anything is ordered.' },
    { title: 'We install around trading', body: 'Early starts and closed days where we can, then we show your team how it works before the next service.' },
  ],
}

// A real job, when there is one — see components/sections/CaseStudy.jsx.
// Left null, nothing renders on the site.
export const CASE_STUDY = null

export const CTA = {
  title:      'Tell us about your venue.',
  body:       'Tell us what you run and when you trade. We\'ll work out what applies.',
  primaryCta: { label: 'Get in touch', href: '#contact' },
  backLink:   { label: 'All commercial services', href: '/commercial' },
}

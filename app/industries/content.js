// ── Industries — overview content ─────────────────────────

export const HERO = {
  title: 'Industries',
  body:  'The same systems look different in a restaurant, a clinic and a boardroom. Here\'s what we do for the businesses we work with most across Tasmania.',
}

// An industry without an href is listed but not linked, until its page exists.
export const INDUSTRIES = [
  {
    name: 'Hospitality & tourism',
    desc: 'Hotels, restaurants, bars, function venues and cellar doors. Music by zone, menu screens staff can update, guest Wi-Fi kept apart from EFTPOS, and function rooms that work on the night.',
    href: '/industries/hospitality',
  },
  {
    name: 'Offices & professional services',
    desc: 'Meeting rooms that join the call when you walk in, a network that stays up, and IT looked after month to month.',
  },
  {
    name: 'Health & aged care',
    desc: 'Clinics and aged care homes: dependable networks and Wi-Fi, waiting-room screens, telehealth rooms and managed IT.',
  },
  {
    name: 'Retail',
    desc: 'In-store screens and signage, background music, and EFTPOS that doesn\'t drop out on a Saturday.',
  },
  {
    name: 'Education',
    desc: 'Independent schools and training providers: classroom displays, halls and PA, and Wi-Fi that copes with every student at once.',
  },
]

export const OTHER = {
  title: 'Don\'t see your industry?',
  body:  'Most of what we do carries across. Tell us what you run and we\'ll tell you what applies.',
}

export const CTA = {
  title:      'Tell us about your business.',
  body:       'Tell us what you run and where. We\'ll scope what applies.',
  primaryCta: { label: 'Get in touch', href: '#contact' },
}

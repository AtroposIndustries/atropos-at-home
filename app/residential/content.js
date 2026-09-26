// ── Residential — Vertical Landing Page Content ─────────────

export const HERO = {
  label: 'Residential',
  title: 'Your home, seamlessly considered.',
  // Illustrative, not an Atropos job — keep the alt text descriptive and never
  // caption it as a project. Replace with a real photo when there is one.
  image: {
    src:    '/img/residential.webp',
    alt:    'An open-plan living room and kitchen at dusk, with a television set into timber joinery and a view over misty hills',
    width:  1536,
    height: 1024,
  },
  body:  'Technology that disappears into the home, planned with your builder and architect from the drawings or retrofitted into a house you already live in. Designed so that the better it works, the less you think about it.',
}

export const INTRO = {
  label: 'What We Do',
  title: 'One coordinated home.',
}

export const SERVICES = [
  {
    name:   'Home Theatre',
    desc:   'Dedicated cinemas and media rooms, and the acoustic treatment that makes them sound right.',
    href:   '/residential/home-theatre',
  },
  {
    name:   'Audio Visual',
    desc:   'Music in every room, screens where you actually watch them, sound outside, all on one app.',
    href:   '/residential/audio-visual',
  },
  {
    name:   'Network & Wi-Fi',
    desc:   'Coverage in every room and cabling in the walls before they close up. Installed once, built to keep working.',
    href:   '/residential/network',
  },
  {
    name:   'Smart Home Automation',
    desc:   'Lighting, climate, blinds and entertainment working as one system, built around how you actually live.',
    href:   '/residential/smart-home',
  },
]

export const CTA = {
  title:      'Ready for a home built around you?',
  body:       'Tell us about your home and how you want to live in it. We will design the rest.',
  primaryCta: { label: 'Get in touch', href: '#contact' },
  otherLink:  { label: 'View commercial services', href: '/commercial' },
}

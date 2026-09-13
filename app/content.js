// ── Atropos — Homepage Content ────────────────────────────

export const NAV = {
  links: [
    {
      label: 'Residential',
      href:  '/residential',
      children: [
        { label: 'Smart Home Automation', href: '/residential/smart-home',   desc: 'Lighting, climate & control, as one system' },
        { label: 'Home Theatre',          href: '/residential/home-theatre', desc: 'Cinema, whole-home sound & acoustics' },
        { label: 'Network & Wi-Fi',       href: '/residential/network',      desc: 'Reliable, invisible, fast' },
        { label: 'All residential services', href: '/residential' },
      ],
    },
    {
      label: 'Commercial',
      href:  '/commercial',
      children: [
        { label: 'Audio Visual',              href: '/commercial/audio-visual', desc: 'Meeting rooms, zoned audio & signage' },
        { label: 'Automation & Smart Lighting', href: '/commercial/control',     desc: 'Scenes, schedules & building control' },
        { label: 'Networking & Wi-Fi',         href: '/commercial/networks',    desc: 'Monitored, segmented, supported' },
        { label: 'Managed Services',           href: '/commercial/support',     desc: 'Monitoring & scheduled maintenance' },
        { label: 'All commercial services',    href: '/commercial' },
      ],
    },
    { label: 'About', href: '/about' },
  ],
  ctaLabel: 'Get in touch',
  ctaHref:  '#contact',
}

export const HERO = {
  titleMain:   'Smart technology that disappears into the space.',
  titleAccent: 'disappears',
  titleSub:  'Smart Home, audio visual, home theatre, network and Wi-Fi designed around the way you live and work.',
  primaryCta: { label: 'Choose Your Path', href: '#offerings' },
}

export const EXPERIENCE_ITEMS = [
  {
    title: 'Automation & Control',
    sub:   'Lighting · Climate · Security',
  },
  {
    title: 'Cinema & Meeting Rooms',
    sub:   'Design · Install · Calibrate',
  },
  {
    title: 'Distributed Audio',
    sub:   'Multi-zone · Premium Brands',
  },
  {
    title: 'Network & Connectivity',
    sub:   'Reliable · Invisible · Fast',
  },
]

export const OFFERINGS = {
  eyebrow: 'What We Do',
  items: [
    {
      number: '01',
      name:   'Residential',
      desc:   'Automation, home theatre, audio, networks and acoustics for homes, with builders and architects, from the plans or as a retrofit.',
      href:   '/residential/',
    },
    {
      number: '02',
      name:   'Commercial',
      desc:   'Control, conference AV, audio, managed networks, security and signage for workplaces and venues, with contracted support behind it.',
      href:   '/commercial/',
    },
  ],
}


export const TESTIMONIAL = {
  quote:       'We handed over the keys to a house. Atropos gave it back as a home that thinks.',
  attribution: 'Architect, South Hobart Residence',
}

export const ABOUT = {
  eyebrow:  'Who We Are',
  body:     'Atropos exists for people who want the technology in a building properly considered, not simply installed — homeowners, business owners, builders and architects who won\'t settle for ordinary.',
  location: 'Hobart · Servicing all of Tasmania',
  cta:      { label: 'Our Story', href: '/about' },
}

export const BRANDS = {
  label:  'Brands We Work With',
  brands: ['Bluesound', 'RTI', 'JBL Synthesis', 'Sonance', 'Epson', 'Ubiquiti', 'Samsung', 'And More'],
}

export const CTA = {
  primaryCta: { label: 'Get in touch', href: '#contact' },
  body:       'Whether it\'s a home theatre or a boardroom fit-out, begin with a conversation. We\'ll handle the rest.',
}

export const FOOTER = {
  tagline:  '"Technology that lives quietly in the background, and beautifully in the foreground."',
  location: 'Hobart · Servicing all of Tasmania',
  columns: [
    {
      heading: 'Residential Services',
      links: [
        { label: 'Smart Home Automation', href: '/residential/smart-home' },
        { label: 'Home Theatre',          href: '/residential/home-theatre' },
        { label: 'Network & Wi-Fi',       href: '/residential/network' },
      ],
    },
    {
      heading: 'Commercial Services',
      links: [
        { label: 'Audio Visual',              href: '/commercial/audio-visual' },
        { label: 'Automation & Smart Lighting', href: '/commercial/control' },
        { label: 'Networking & Wi-Fi',         href: '/commercial/networks' },
        { label: 'Managed Services',           href: '/commercial/support' },
      ],
    },
    {
      heading: 'Company',
      links: [
        { label: 'About',   href: '/about' },
        { label: 'Contact', href: '/#contact' },
      ],
    },
  ],
  copyright:   '© 2026 Atropos Pty Ltd. All rights reserved.',
}

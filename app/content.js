// ── Atropos — Homepage Content ────────────────────────────

export const NAV = {
  links: [
    {
      label: 'Residential',
      href:  '/residential',
      children: [
        { label: 'Home Theatre',          href: '/residential/home-theatre' },
        { label: 'Audio Visual',          href: '/residential/audio-visual' },
        { label: 'Network & Wi-Fi',       href: '/residential/network' },
        { label: 'Smart Home Automation', href: '/residential/smart-home' },
      ],
    },
    {
      label: 'Commercial',
      href:  '/commercial',
      children: [
        { label: 'Unified Communications',          href: '/commercial/unified-communications' },
        { label: 'Digital Signage & Audio Visual',  href: '/commercial/signage-audio-visual' },
        { label: 'Network & Wi-Fi',                 href: '/commercial/networks' },
        { label: 'Managed Services',                href: '/commercial/support' },
        { label: 'Automation',                      href: '/commercial/automation' },
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
      desc:   'Home theatre, multi-room audio visual, network and Wi-Fi, and smart home automation, with builders and architects, from the plans or as a retrofit.',
      href:   '/residential/',
    },
    {
      number: '02',
      name:   'Commercial',
      desc:   'Meeting rooms and unified communications, digital signage and audio visual, networks, automation, managed IT and support for workplaces and venues.',
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
        { label: 'Home Theatre',          href: '/residential/home-theatre' },
        { label: 'Audio Visual',          href: '/residential/audio-visual' },
        { label: 'Network & Wi-Fi',       href: '/residential/network' },
        { label: 'Smart Home Automation', href: '/residential/smart-home' },
      ],
    },
    {
      heading: 'Commercial Services',
      links: [
        { label: 'Unified Communications',         href: '/commercial/unified-communications' },
        { label: 'Digital Signage & Audio Visual', href: '/commercial/signage-audio-visual' },
        { label: 'Network & Wi-Fi',                href: '/commercial/networks' },
        { label: 'Managed Services',               href: '/commercial/support' },
        { label: 'Automation',                     href: '/commercial/automation' },
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

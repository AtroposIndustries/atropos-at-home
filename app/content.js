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
  title:      'Technology that works the way you do.',
  sub:        'Smart home, audio visual, digital signage, home theatre, network and Wi-Fi designed around the way you live and work.',
  primaryCta: { label: 'Get in touch', href: '#contact' },
  image:      { src: '/img/hero-img.jpg', alt: 'Mountains reflected in a still lake, Tasmania' },
  caption:    ['Hobart · Servicing all of Tasmania', 'Residential and commercial'],
}

export const OFFERINGS = {
  title: 'Built around how you live and work.',
  intro: 'Atropos designs, installs and supports integrated technology for homes and businesses across Tasmania: home theatre and multi-room audio visual, meeting rooms, digital signage and LED screens, automation, networks and Wi-Fi.',
  items: [
    {
      name:   'Residential',
      cta:    'Residential overview',
      desc:   'Home theatre, multi-room audio visual, network and Wi-Fi, and smart home automation, with builders and architects, from the plans or as a retrofit.',
      href:   '/residential/',
    },
    {
      name:   'Commercial',
      cta:    'Commercial overview',
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
  label:    'Who we are',
  body:     'Atropos exists for people who want the technology in a building properly considered, not simply installed — homeowners, business owners, builders and architects who won\'t settle for ordinary.',
  location: 'Hobart · Servicing all of Tasmania',
  cta:      { label: 'Our story', href: '/about' },
  image:    { src: '/img/river.jpg', alt: 'Water running over rocks in a forest creek' },
}

export const BRANDS = {
  label:  'Brands we work with',
  brands: [
    'Microsoft', 'Google', 'Ubiquiti', 'Netgear', 'Bluesound', 'Sonos', 'JBL',
    'Sonance', 'Epson', 'Samsung', 'LG', 'Q-SYS', 'Kramer', 'Xilica', 'NEC',
  ],
  more:   'and more',
}

export const CTA = {
  title: 'Begin with a conversation.',
  body:       'Whether it\'s a home theatre or a boardroom fit-out, begin with a conversation. We\'ll handle the rest.',
}

export const FOOTER = {
  tagline:  'Technology that lives quietly in the background, and beautifully in the foreground.',
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
        { label: 'About',      href: '/about' },
        { label: 'Industries', href: '/industries' },
        { label: 'Contact',    href: '/#contact' },
      ],
    },
  ],
  copyright:   '© 2026 Atropos Pty Ltd. All rights reserved.',
}

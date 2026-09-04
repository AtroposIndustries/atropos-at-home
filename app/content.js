// ── Atropos — Homepage Content ────────────────────────────

export const NAV = {
  links: [
    {
      label: 'Residential',
      href:  '/residential',
      children: [
        { label: 'Smart Home Automation',  href: '/residential/smart-home',   desc: 'Lighting, climate, security & control' },
        { label: 'Premium Home Theatre',   href: '/residential/home-theatre', desc: 'Design, acoustics & calibration' },
        { label: 'Full-home Sound',        href: '/residential/audio',        desc: 'Multi-zone distributed audio' },
        { label: 'Network & Connectivity', href: '/residential/network',      desc: 'Reliable, invisible, fast' },
        { label: 'Acoustic Treatment',     href: '/residential/acoustic',     desc: 'Panels, diffusers & room design' },
        { label: 'Ongoing Support',        href: '/residential/support',      desc: 'Remote monitoring & maintenance' },
        { label: 'All residential services', href: '/residential' },
      ],
    },
    {
      label: 'Commercial',
      href:  '/commercial',
      children: [
        { label: 'Building & Room Control',  href: '/commercial/control',       desc: 'Scheduling, occupancy & zoning' },
        { label: 'Meeting & Conference Rooms', href: '/commercial/meeting-rooms', desc: 'Video conferencing & room booking' },
        { label: 'Distributed Audio & Paging', href: '/commercial/audio',       desc: 'Zoned audio, paging & override' },
        { label: 'Managed Networks',         href: '/commercial/networks',      desc: 'Monitored, supported, under SLA' },
        { label: 'Digital Signage',          href: '/commercial/signage',       desc: 'Screens, scheduling & wayfinding' },
        { label: 'Acoustic Treatment',       href: '/commercial/acoustic',      desc: 'Speech intelligibility & privacy' },
        { label: 'Managed Services',         href: '/commercial/support',       desc: 'Contracted response & monitoring' },
        { label: 'All commercial services',  href: '/commercial' },
      ],
    },
    { label: 'About', href: '/about' },
  ],
  ctaLabel: 'Book a Consultation',
  ctaHref:  '#contact',
}

export const HERO = {
  eyebrow:   'Residential · Commercial · Hobart, Tasmania',
  titleMain: ['Technology,', 'woven into the building.'],
  titleSub:  'Automation, AV & networks for homes and businesses',
  body:      'We design and install the automation, AV and network systems that get built into a space from the studs out. Homes and businesses, new builds and retrofits, usually working alongside your builder or architect from the drawings on. Twenty-five years across audiovisual and ICT, accredited on every major control platform rather than locked to one.',
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
  location: 'Hobart, Tasmania',
  cta:      { label: 'Our Story', href: '/about' },
}

export const BRANDS = {
  label:  'Brands We Work With',
  brands: ['Bluesound', 'RTI', 'JBL Synthesis', 'Sonance', 'Epson', 'Ubiquiti', 'Samsung', 'And More'],
}

export const CTA = {
  primaryCta: { label: 'Book a Consultation', href: '#contact' },
  body:       'Whether it\'s a home theatre or a boardroom fit-out, begin with a conversation. We\'ll handle the rest.',
}

export const CONTACT_SERVICES = [
  { value: 'smart-home',   label: 'Smart Home Automation' },
  { value: 'theatre',      label: 'Home Theatre' },
  { value: 'audio',        label: 'Distributed Audio' },
  { value: 'network',      label: 'Network & Connectivity' },
  { value: 'acoustic',     label: 'Acoustic Treatment' },
  { value: 'consultation', label: 'Design Consultation' },
  { value: 'other',        label: 'Something else' },
]

export const FOOTER = {
  tagline:  '"Technology that lives quietly in the background, and beautifully in the foreground."',
  location: 'Hobart, Tasmania',
  columns: [
    {
      heading: 'Residential Services',
      links: [
        { label: 'Smart Home Automation',  href: '/residential/smart-home' },
        { label: 'Premium Home Theatre',   href: '/residential/home-theatre' },
        { label: 'Full-home Sound',        href: '/residential/audio' },
        { label: 'Network & Connectivity', href: '/residential/network' },
        { label: 'Acoustic Treatment',     href: '/residential/acoustic' },
        { label: 'Ongoing Support',        href: '/residential/support' },
      ],
    },
    {
      heading: 'Commercial Services',
      links: [
        { label: 'Building & Room Control',    href: '/commercial/control' },
        { label: 'Meeting & Conference Rooms', href: '/commercial/meeting-rooms' },
        { label: 'Distributed Audio & Paging', href: '/commercial/audio' },
        { label: 'Managed Networks',           href: '/commercial/networks' },
        { label: 'Digital Signage',            href: '/commercial/signage' },
        { label: 'Acoustic Treatment',         href: '/commercial/acoustic' },
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

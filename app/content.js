// ── Atropos — Homepage Content ────────────────────────────

export const NAV = {
  links: [
    {
      label: 'Our Services',
      children: [
        { label: 'Smart Home Automation',  href: '/smart-home',    desc: 'Lighting, climate, security & control' },
        { label: 'Premium Home Theatre',   href: '/home-theatre',  desc: 'Design, acoustics & calibration' },
        { label: 'Full-home Sound',        href: '/audio',         desc: 'Multi-zone distributed audio' },
        { label: 'Network & Connectivity', href: '/network',       desc: 'Reliable, invisible, fast' },
        { label: 'Acoustic Treatment',     href: '/acoustic',      desc: 'Panels, diffusers & room design' },
        { label: 'Ongoing Support',        href: '/support',       desc: 'Remote monitoring & maintenance' },
      ],
    },
    { label: 'About', href: '/about' },
  ],
  ctaLabel: 'Book a Consultation',
  ctaHref:  '#contact',
}

export const HERO = {
  eyebrow:   'Smart Living · Premium AV · Home Theatre',
  titleMain: ['Your home,', 'elevated.'],
  titleSub:  'Beautifully integrated technology',
  body:      'We bring the finest in smart home automation, distributed audio, and premium home theatre to architects, builders, and discerning homeowners across Tasmania and beyond.',
  primaryCta: { label: 'Explore the Experience', href: '#offerings' },
}

export const EXPERIENCE_ITEMS = [
  {
    title: 'Smart Home',
    sub:   'Lighting · Climate · Security',
  },
  {
    title: 'Home Theatre',
    sub:   'Design · Install · Calibrate',
  },
  {
    title: 'Audio Distribution',
    sub:   'Whole-home · Premium Brands',
  },
  {
    title: 'Network & Connectivity',
    sub:   'Reliable · Invisible · Fast',
  },
]

export const OFFERINGS = {
  eyebrow: 'Our Services',
  items: [
    {
      number: '01',
      name:   'Smart Home Automation',
      desc:   'Complete integration of lighting, climate, blinds, security, and entertainment. Controlled with a gesture, voice, or schedule — tailored entirely to how you live.',
      href:   '/smart-home',
    },
    {
      number: '02',
      name:   'Premium Home Theatre',
      desc:   'From intimate 2-channel listening rooms to fully immersive Dolby Atmos cinema spaces. We design, acoustic-treat, and commission experiences that move you.',
      href:   '/home-theatre',
    },
    {
      number: '03',
      name:   'Full-home Sound',
      desc:   'Music that follows you through your home — from the kitchen to the pool deck. Multi-zone, multi-source, and brilliantly clear with brands like Bluesound, Sonance, and more.',
      href:   '/audio',
    },
    {
      number: '04',
      name:   'Network & Connectivity',
      desc:   'Rock-solid, invisible networking that underpins every system in your home. Wi-Fi that actually reaches everywhere, with the bandwidth to match.',
      href:   '/network',
    },
    {
      number: '05',
      name:   'Acoustic Treatment',
      desc:   'Purpose-designed acoustic panels, diffusers, and treatments that look as good as they perform — designed to complement, not fight, your interior.',
      href:   '/acoustic',
    },
    {
      number: '06',
      name:   'Ongoing Support',
      desc:   'Technology you can actually live with. Remote monitoring, software updates, and a team that answers the phone — long after installation day.',
      href:   '/support',
    },
  ],
}


export const TESTIMONIAL = {
  quote:       'We handed over the keys to a house. Atropos gave it back as a home that thinks.',
  attribution: 'Architect, South Hobart Residence',
}

export const ABOUT = {
  eyebrow:  'Who We Are',
  location: 'Hobart, Tasmania',
  cta:      { label: 'Our Story', href: '/about' },
}

export const BRANDS = {
  label:  'Brands We Work With',
  brands: ['Bluesound', 'RTI', 'JBL Synthesis', 'Sonance', 'Epson', 'Ubiquiti', 'Samsung', 'And More'],
}

export const CTA = {
  primaryCta: { label: 'Book a Consultation', href: '#contact' },
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
      heading: 'Services',
      links: [
        { label: 'Smart Home Automation',  href: '/smart-home' },
        { label: 'Premium Home Theatre',   href: '/home-theatre' },
        { label: 'Full-home Sound',        href: '/audio' },
        { label: 'Network & Connectivity', href: '/network' },
        { label: 'Acoustic Treatment',     href: '/acoustic' },
        { label: 'Ongoing Support',        href: '/support' },
      ],
    },
    {
      heading: 'Company',
      links: [
        { label: 'About',   href: '/about' },
        { label: 'Contact', href: '/#contact' },
      ],
    },
    {
      heading: 'Connect',
      links: [
        { label: 'Facebook',  href: 'https://www.facebook.com/atroposptyltd' },
        { label: 'Instagram', href: 'https://www.instagram.com/atroposptyltd' },
      ],
    },
  ],
  copyright:   '© 2026 Atropos Pty Ltd. All rights reserved.',
}

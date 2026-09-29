// ── Industries: Health & aged care — page content ───────

export const HERO = {
  title: 'Health & aged care',
  body:  'GP, dental and allied health clinics, specialists and aged care homes. Networks and Wi-Fi you can depend on, screens in the waiting room, and IT that\'s looked after, so staff can get on with care.',
  // image: { src, alt, width, height } — a real or illustrative photo, when there is one.
}

export const SERVICES = {
  title: 'What we do for clinics and care homes',
  items: [
    {
      name: 'Network & Wi-Fi',
      desc: 'Staff, practice systems, guests and residents on separate networks, with coverage that reaches every consult room and corridor.',
      href: '/commercial/networks',
    },
    {
      name: 'Managed Services & IT Support',
      desc: 'Devices, accounts and backups managed, and a technician when something stops working mid-clinic.',
      href: '/commercial/support',
    },
    {
      name: 'Digital Signage & Audio Visual',
      desc: 'Waiting-room screens reception can update, and background music in shared spaces.',
      href: '/commercial/signage-audio-visual',
    },
    {
      name: 'Unified Communications',
      desc: 'Telehealth and meeting rooms with cameras and microphones set up for remote consults and case conferences.',
      href: '/commercial/unified-communications',
    },
    {
      name: 'Automation',
      desc: 'Lighting and climate in common areas that follow the day, not a timer.',
      href: '/commercial/automation',
    },
  ],
}

export const STEPS = {
  title: 'A typical clinic or care home job',
  items: [
    { title: 'We walk the site', body: 'With the practice or facility manager, around appointments and residents\' routines.' },
    { title: 'We scope it in writing', body: 'What goes where, what staff will use, and a clear quote before anything is ordered.' },
    { title: 'We work around care', body: 'Staged room by room or out of hours, and staff shown how it works before they need it.' },
  ],
}

// A real job, when there is one — see components/sections/CaseStudy.jsx.
// Left null, nothing renders on the site.
export const CASE_STUDY = null

export const CTA = {
  title:      'Tell us about your practice.',
  body:       'Tell us what you run, how many rooms and how many sites. We\'ll work out what applies.',
  primaryCta: { label: 'Get in touch', href: '#contact' },
  backLink:   { label: 'All commercial services', href: '/commercial' },
}

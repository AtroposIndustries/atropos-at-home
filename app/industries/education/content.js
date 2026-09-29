// ── Industries: Education — page content ───────

export const HERO = {
  title: 'Education',
  body:  'Independent schools and training providers. Displays in every classroom, halls where everyone can hear, and Wi-Fi that copes with every student at once.',
  // image: { src, alt, width, height } — a real or illustrative photo, when there is one.
}

export const SERVICES = {
  title: 'What we do for schools',
  items: [
    {
      name: 'Digital Signage & Audio Visual',
      desc: 'Classroom displays, hall and assembly sound, and foyer screens the office can update.',
      href: '/commercial/signage-audio-visual',
    },
    {
      name: 'Network & Wi-Fi',
      desc: 'Wi-Fi that holds up with a full class online, with students, staff and guests kept on separate networks.',
      href: '/commercial/networks',
    },
    {
      name: 'Unified Communications',
      desc: 'Staff and meeting rooms, and learning spaces set up for hybrid and remote lessons.',
      href: '/commercial/unified-communications',
    },
    {
      name: 'Managed Services & IT Support',
      desc: 'Staff devices, accounts and backups managed, and a technician when a classroom stops working.',
      href: '/commercial/support',
    },
    {
      name: 'Automation',
      desc: 'Lighting and climate in halls and common areas that follow the timetable.',
      href: '/commercial/automation',
    },
  ],
}

export const STEPS = {
  title: 'A typical school job',
  items: [
    { title: 'We walk the campus', body: 'With the business manager and whoever looks after IT, to see the rooms and how they\'re taught in.' },
    { title: 'We scope it in writing', body: 'Room by room, with a clear quote, and stages that can be spread across budget years.' },
    { title: 'We install between terms', body: 'Or after hours and staged by building, then we show staff how each room works before classes.' },
  ],
}

// A real job, when there is one — see components/sections/CaseStudy.jsx.
// Left null, nothing renders on the site.
export const CASE_STUDY = null

export const CTA = {
  title:      'Tell us about your school.',
  body:       'Tell us about your campus, your rooms and what isn\'t working. We\'ll work out what applies.',
  primaryCta: { label: 'Get in touch', href: '#contact' },
  backLink:   { label: 'All commercial services', href: '/commercial' },
}

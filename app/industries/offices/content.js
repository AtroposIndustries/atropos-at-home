// ── Industries: Offices & professional services — page content ───────

export const HERO = {
  title: 'Offices & professional services',
  body:  'Law firms, accountants, consultancies, not-for-profits and government offices. Meeting rooms that start on time, a network that stays up, and IT that someone is actually looking after.',
  // image: { src, alt, width, height } — a real or illustrative photo, when there is one.
}

export const SERVICES = {
  title: 'What we do for offices',
  items: [
    {
      name: 'Unified Communications',
      desc: 'Meeting rooms from huddle space to boardroom that join the call on the platform you already use, whether that\'s Teams, Zoom or something else.',
      href: '/commercial/unified-communications',
    },
    {
      name: 'Managed Services & IT Support',
      desc: 'Laptops, email, Microsoft 365 or Google Workspace, backups and new starters, handled for a monthly fee.',
      href: '/commercial/support',
    },
    {
      name: 'Network & Wi-Fi',
      desc: 'A network that\'s monitored and patched on a schedule, with guests and visitors kept off the systems that matter.',
      href: '/commercial/networks',
    },
    {
      name: 'Digital Signage & Audio Visual',
      desc: 'Reception and foyer screens that whoever runs the office can update.',
      href: '/commercial/signage-audio-visual',
    },
    {
      name: 'Automation',
      desc: 'Lighting and climate that follow the working day, and settle down when the floor empties.',
      href: '/commercial/automation',
    },
  ],
}

export const STEPS = {
  title: 'A typical office fit-out',
  items: [
    { title: 'We start with how you meet', body: 'Which rooms, how many people, which platform, and who\'s usually dialling in.' },
    { title: 'We scope it in writing', body: 'Every room, every device and any ongoing support, in one quote before anything is ordered.' },
    { title: 'We fit out around you', body: 'After hours or floor by floor, so work carries on, then we show your team how each room works.' },
  ],
}

// A real job, when there is one — see components/sections/CaseStudy.jsx.
// Left null, nothing renders on the site.
export const CASE_STUDY = null

export const CTA = {
  title:      'Tell us about your office.',
  body:       'Tell us how many people, how many rooms and what\'s giving you grief. We\'ll scope what applies.',
  primaryCta: { label: 'Get in touch', href: '#contact' },
  backLink:   { label: 'All commercial services', href: '/commercial' },
}

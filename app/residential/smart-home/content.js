// ── Smart Home Automation — Page Content ───────────────────

export const HERO = {
  label: 'Services',
  title: 'Smart Home Automation',
  body:  'Lighting, climate, security and entertainment, working as one system — so you don\'t have to think about any of it.',
}

export const INTRO = {
  label: 'What We Do',
  title: 'Your home, responding to you.',
  body:  'Automation isn\'t about gadgets. It\'s about a house that gets on with it. Walk into a room and the lights are already right. Head out and everything settles down behind you. Come home and it\'s how you like it. Powerful enough to do what you imagine. Simple enough that you forget it\'s there.',
}

export const FEATURES = [
  {
    number: '01',
    title:  'Lighting Design & Control',
    desc:   'Lighting that changes with the room and the hour. Warm and low of an evening, bright when you\'re cooking, off when you\'ve gone to bed and forgotten.',
  },
  {
    number: '02',
    title:  'Climate & Comfort',
    desc:   'HVAC that learns your habits and responds to occupancy, so each room sits at the right temperature without you touching a dial.',
  },
  {
    number: '03',
    title:  'Security & Access',
    desc:   'Cameras, smart locks, video doorbells and alarms, all from one interface. Routines that lock up, arm the alarm and settle the house for the night.',
  },
  {
    number: '04',
    title:  'Motorised Blinds & Shading',
    desc:   'Blinds that track the sun. Down when the afternoon glare hits the lounge, up again once it\'s passed, protecting furniture and keeping rooms comfortable.',
  },
  {
    number: '05',
    title:  'Unified Control',
    desc:   'One interface for everything, not the platform we happen to sell. We work across Control4, RTI, Crestron and the rest, and build custom mobile, tablet and web interfaces where a project calls for it.',
  },
  {
    number: '06',
    title:  'Scenes & Automation',
    desc:   '"Movie Night." "Good Morning." "Away." One touch, and lighting, climate, blinds and AV all move together, tuned for the moment.',
  },
]

export const PROCESS = {
  label: 'How We Work',
  title: 'Precision, from brief to handover.',
  steps: [
    {
      num:   '01',
      title: 'Discovery',
      desc:  'We learn how you live — your routines, your preferences, your wish list. This conversation shapes every decision that follows.',
    },
    {
      num:   '02',
      title: 'Design & Specification',
      desc:  'A detailed system design with zone maps, equipment schedules, and programming logic. You see exactly what you are getting before we touch a wall.',
    },
    {
      num:   '03',
      title: 'Pre-wire & Rough-in',
      desc:  'We work alongside your builder to ensure every cable, conduit, and backbox is placed precisely where the finished system demands.',
    },
    {
      num:   '04',
      title: 'Installation & Programming',
      desc:  'Every device is installed, configured, and programmed to your specification. We test every scene, every routine, every integration before you see it.',
    },
    {
      num:   '05',
      title: 'Handover & Training',
      desc:  'A relaxed walkthrough of your system so you feel completely confident. Documentation provided. Our team on call whenever you need us.',
    },
  ],
}

// FAQ_ITEMS is retained but NOT rendered. The FAQ sections were pulled on
// 2026-08-25 because several answers promised things the business cannot yet
// deliver, and they were also being published as FAQPage structured data —
// so an undeliverable promise could surface directly in a search result.
// Rework the answers against what is actually deliverable before restoring
// the <FAQ> block and its schemaFaq JSON-LD in the matching page.jsx.
export const FAQ_ITEMS = [
  {
    question: 'What control systems do you install?',
    answer:   'Control4, RTI, Crestron and the other leading professional platforms — we specialise across all of them, and that is rather the point. Because we are not tied to any single system, we can choose on the merits of your project: the size and complexity of your home, how you want to live in it, and your budget. Where a home calls for something bespoke, we design custom interfaces for mobile, tablet, and web that fit the architecture rather than dictate it.',
  },
  {
    question: 'Can you automate an existing home, or is it only for new builds?',
    answer:   'Both. New builds give us the opportunity to pre-wire for the cleanest possible installation, but we retrofit smart home systems into existing homes regularly. We assess the existing infrastructure and design the best approach with minimal disruption.',
  },
  {
    question: 'Does everything need to be the same brand?',
    answer:   'No. Our control systems integrate products from multiple manufacturers — lighting from Lutron, climate from Daikin, security from a different brand entirely. We make them all work together seamlessly through a single interface.',
  },
  {
    question: 'What happens if something stops working?',
    answer:   'We offer ongoing support plans that include remote monitoring and phone support. Many issues can be diagnosed and resolved remotely. For anything requiring a site visit, we are local and respond quickly.',
  },
  {
    question: 'Can the system be expanded later?',
    answer:   'Yes. We design systems with future expansion in mind. Adding a new room, device, or integration is straightforward — especially if we completed the original pre-wire.',
  },
]

export const CTA = {
  primaryCta: { label: 'Book a Consultation', href: '#contact' },
  ghostCta:   { label: 'View All Services',   href: '/residential/#services' },
}

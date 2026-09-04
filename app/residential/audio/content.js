// ── Distributed Audio — Page Content ───────────────────────

export const HERO = {
  label: 'Services',
  title: 'Full-home Sound',
  body:  'Music that follows you through the house — kitchen to pool deck, multi-zone, multi-source, and properly clear.',
}

export const INTRO = {
  label: 'What We Do',
  title: 'The right music. Every room. Always.',
  body:  'Distributed audio is the system you actually use every day — every morning, every dinner party, every lazy Sunday. We design whole-home audio that sounds properly good, disappears into the architecture, and is simple to use, whether you\'re streaming, spinning a record, or sending different music to different rooms at once.',
}

export const FEATURES = [
  {
    number: '01',
    title:  'Whole-home Streaming',
    desc:   'Spotify, Apple Music, Tidal and internet radio, streamed to any room, in any combination, from any device. Bluesound and Sonos both supported.',
  },
  {
    number: '02',
    title:  'Multi-zone Control',
    desc:   'Independent volume and source per zone. The kitchen plays jazz while the main bedroom gets something quieter, all from one app or an in-wall panel.',
  },
  {
    number: '03',
    title:  'High-fidelity Performance',
    desc:   'In-ceiling and in-wall speakers from Sonance, KEF and Bowers & Wilkins, chosen for how they sound, not just how neatly they disappear into the ceiling.',
  },
  {
    number: '04',
    title:  'Outdoor Audio',
    desc:   'Weatherproof speakers for alfresco areas, pool decks and gardens, specified for the acoustic challenges open space actually presents.',
  },
  {
    number: '05',
    title:  'High-resolution Sources',
    desc:   'Network audio players, turntable integration and hi-res streaming for the audiophile corners of your home, without complicating the rest of it.',
  },
  {
    number: '06',
    title:  'Automation Integration',
    desc:   'Audio as part of your scenes. "Good Morning" fades your playlist up, "Goodnight" fades it out — music woven into the rest of the smart home, not bolted on.',
  },
]

export const PROCESS = {
  label: 'How We Work',
  title: 'Designed to be heard. Not seen.',
  steps: [
    {
      num:   '01',
      title: 'Zone Planning',
      desc:  'We map every room and outdoor area, discuss how you use each space, and establish the right coverage and source requirements for each zone.',
    },
    {
      num:   '02',
      title: 'Equipment Specification',
      desc:  'Speaker selection, amplification, and streaming infrastructure chosen for your home\'s layout and your musical priorities.',
    },
    {
      num:   '03',
      title: 'Pre-wire & Rough-in',
      desc:  'Speaker cable, network drops, and control wiring placed with your builder. Backboxes positioned for optimal acoustic performance — not just convenience.',
    },
    {
      num:   '04',
      title: 'Installation & Setup',
      desc:  'Speakers mounted and aimed. Amplifiers racked and configured. Streaming services linked. Zones named and grouped to match how you think about your home.',
    },
    {
      num:   '05',
      title: 'Handover & Training',
      desc:  'A walkthrough of your control interface so using your system feels completely natural from day one.',
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
    question: 'What streaming services do you support?',
    answer:   'Our systems support all major streaming services including Spotify, Apple Music, Tidal, Amazon Music, and internet radio. Local network music libraries (NAS drives) are also supported for those with existing collections.',
  },
  {
    question: 'How many zones can I have?',
    answer:   'There is no practical limit. Most homes run between four and twelve zones. Each zone has independent volume and source control. Zones can also be grouped together when you want the whole house playing in sync.',
  },
  {
    question: 'Can I add audio to outdoor areas?',
    answer:   'Absolutely. Outdoor audio is one of our most popular additions. We specify weatherproof speakers designed for the acoustic challenges of open space — covering alfresco areas, pool decks, and gardens without compromise.',
  },
  {
    question: 'What brands do you work with?',
    answer:   'For distributed audio we primarily use Bluesound Professional, Sonance, KEF, Bowers & Wilkins, and Sonos depending on the application and budget. We will recommend the right combination for your home.',
  },
  {
    question: 'Can you integrate with my existing automation system?',
    answer:   'Yes. Our audio systems integrate with Control4, Crestron, RTI, and most major automation platforms. If you already have a system, we work within it. If you are starting fresh, we design everything together.',
  },
]

export const CTA = {
  primaryCta: { label: 'Book a Consultation', href: '#contact' },
  ghostCta:   { label: 'View All Services',   href: '/residential/#services' },
}

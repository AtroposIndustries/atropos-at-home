// ── Distributed Audio & Paging — Page Content ───────────────

export const HERO = {
  label: 'Commercial',
  title: 'Distributed Audio & Paging',
  body:  'Background music and all-call paging across every zone of your premises, separated cleanly so an emergency announcement always cuts through. Licensed the way a business needs to be, not a household.',
}

export const INTRO = {
  label: 'What We Do',
  title: 'Built to be heard when it matters, and to disappear the rest of the time.',
  body:  'A commercial audio system carries two jobs through the same speakers: background music that sets the tone, and paging that has to stay clear over conversation, machinery or a full dining room.\n\nWe design the zoning, the priority logic and the speaker layout so the second job always wins. An evacuation announcement or a fire panel signal overrides whatever\'s playing, on every affected zone, automatically. Once the event clears, the system goes back to normal.',
}

export const FEATURES = [
  {
    number: '01',
    title:  'Zoned Background Music',
    desc:   'Independent volume and source per zone: foyer, dining room, warehouse floor, back-of-house. Each set to the level that\'s right for that space, not one volume control for the whole building.',
  },
  {
    number: '02',
    title:  'All-call & Zone Paging',
    desc:   'Announce to the whole site or a single zone from a paging mic or handset. Priority logic ducks or mutes the music automatically, so the message gets heard, not talked over.',
  },
  {
    number: '03',
    title:  'Emergency Override',
    desc:   'Paging wired to take a signal from the building\'s fire alarm system. An alarm condition switches every affected zone to evacuation messaging and cuts the music, without anyone touching a control panel.',
  },
  {
    number: '04',
    title:  'Speaker Coverage Planned to the Building',
    desc:   'Speaker and amplifier zoning planned against the building\'s floor plan and fire compartments, not one loop of speakers around a floor plate. A page to one tenancy doesn\'t spill into the next.',
  },
  {
    number: '05',
    title:  'Commercial Music Licensing Awareness',
    desc:   'Playing music to customers through a commercial system is a different licensing question to a personal subscription. The licence itself sits between you and the rights holder, not us.',
  },
  {
    number: '06',
    title:  'Centralised Source & Volume Management',
    desc:   'One control point for scheduling music by time of day and checking which zones are live. Managed by your facilities team, or by us, not whichever staff member finds the dial first.',
  },
]

// FAQ_ITEMS is retained but NOT rendered. The FAQ sections were pulled on
// 2026-08-25 because several answers promised things the business cannot yet
// deliver, and they were also being published as FAQPage structured data —
// so an undeliverable promise could surface directly in a search result.
// Rework the answers against what is actually deliverable before restoring
// the <FAQ> block and its schemaFaq JSON-LD in the matching page.jsx.
export const FAQ_ITEMS = [
  {
    question: 'How does paging interact with our fire alarm system?',
    answer:   'On a correctly integrated system, a signal from the fire alarm panel takes priority automatically — background music is cut and the affected zones switch to evacuation paging without anyone needing to operate the system manually. The exact interface depends on your fire system and is designed against your fire contractor\'s documentation, not applied as a generic setting.',
  },
  {
    question: 'Do we need a licence to play background music?',
    answer:   'In most cases, yes — playing music to staff or customers in a commercial premises is treated differently to a personal streaming subscription and generally requires its own licence. We are not a licensing body and cannot advise on the specific fees or terms that apply to your business, but we design the system to work with whichever licensed service you choose and flag the requirement during design.',
  },
  {
    question: 'Can different areas of our building play different things?',
    answer:   'Yes. Each zone — a dining room, a foyer, a warehouse, a corridor — is controlled independently for volume and source. Zones can also be grouped for a single all-call announcement without merging their day-to-day music.',
  },
  {
    question: 'Can we page to one area without disturbing the rest of the building?',
    answer:   'Yes, provided the zoning was designed for it. We plan speaker and amplifier zoning against your actual floor plan and fire compartments specifically so a page to reception does not need to reach the warehouse, and vice versa.',
  },
  {
    question: 'Who manages the system day to day?',
    answer:   'Whoever you nominate — a facilities manager, front-of-house staff, or us under a support arrangement. The system is designed around one central point of control so scheduling changes and volume adjustments do not require a technician\'s visit for routine changes.',
  },
]

export const CTA = {
  primaryCta: { label: 'Book a Consultation', href: '#contact' },
  ghostCta:   { label: 'View All Services',   href: '/commercial/#services' },
}

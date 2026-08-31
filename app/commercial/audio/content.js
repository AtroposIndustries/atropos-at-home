// ── Distributed Audio & Paging — Page Content ───────────────

export const HERO = {
  label: 'Commercial',
  title: 'Distributed Audio & Paging',
  body:  'Background music and all-call paging across every zone of your premises — separated cleanly so an emergency announcement always cuts through, and licensed the way a business, not a household, is required to be.',
}

export const INTRO = {
  label: 'What We Do',
  title: 'Built to be heard when it matters, and to disappear the rest of the time.',
  body:  'A commercial audio system carries two different jobs through the same speakers: background music that sets the tone of a space, and paging that has to stay intelligible over conversation, machinery or a full dining room. We design the zoning, the priority logic and the physical speaker layout so the second job always wins — an evacuation announcement or a fire panel signal overrides whatever is playing on every affected zone automatically, and the system returns to normal once the event clears.',
}

export const FEATURES = [
  {
    number: '01',
    title:  'Zoned Background Music',
    desc:   'Independent volume and source per zone — foyer, dining room, warehouse floor, back-of-house — each set to the level appropriate for that space, rather than one volume control for the whole building.',
  },
  {
    number: '02',
    title:  'All-call & Zone Paging',
    desc:   'Announce to the whole site or a single zone from a paging microphone or handset, with priority logic that ducks or mutes background music automatically so the message is heard rather than talked over.',
  },
  {
    number: '03',
    title:  'Emergency Override',
    desc:   'Paging wired to take a signal from the building\'s fire alarm system, so an alarm condition switches every affected zone to evacuation messaging and cuts background music without anyone needing to reach a control panel first.',
  },
  {
    number: '04',
    title:  'Speaker Coverage Planned to the Building',
    desc:   'Speaker and amplifier zoning planned against the building\'s actual floor plan and fire compartments — not one loop of ceiling speakers run around a floor plate — so a page to one tenancy does not spill into the next.',
  },
  {
    number: '05',
    title:  'Commercial Music Licensing Awareness',
    desc:   'Playing music to staff or customers through a commercial system is a separate licensing question from a personal streaming subscription. We flag the obligation during design so it is not a surprise at handover — the licence itself sits between you and the rights holder, not us.',
  },
  {
    number: '06',
    title:  'Centralised Source & Volume Management',
    desc:   'One control point for scheduling background music by time of day and reviewing which zones are live — managed by your facilities team, or by us under a support arrangement, rather than by whichever staff member finds the right dial first.',
  },
]

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

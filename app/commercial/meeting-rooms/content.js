// ── Meeting & Conference Rooms — Page Content ───────────────

export const HERO = {
  label: 'Commercial',
  title: 'Meeting & Conference Rooms',
  body:  'One-touch video conferencing that works the moment someone walks in. Camera and microphone coverage designed against the room, not dropped in once the furniture\'s in place.',
}

export const INTRO = {
  label: 'What We Do',
  title: 'The far end hears the room, not the table.',
  body:  'A meeting room lives or dies in the first thirty seconds. Does the call connect when someone hits join? Can the person dialling in actually follow what\'s said?\n\nWe plan camera and microphone coverage against the room\'s real shape, its glass, its hard surfaces. We build for whichever conferencing platform your organisation runs, and hand over a booking panel and a join experience nobody needs training for.',
}

export const FEATURES = [
  {
    number: '01',
    title:  'Teams, Zoom & Google Meet Compatibility',
    desc:   'Rooms designed to run whichever conferencing platform your organisation standardises on, and reconfigured, not rebuilt, if that standard changes later.',
  },
  {
    number: '02',
    title:  'One-touch Join',
    desc:   'A calendar invite and one button on the room panel start the call. No cable to hunt for under the table, no second app, no dial-in number to read out.',
  },
  {
    number: '03',
    title:  'Coverage Planned to the Room',
    desc:   'Microphone pickup and camera framing planned against the room\'s shape and ceiling height, so a speaker at the far end is heard as clearly as one next to the mic.',
  },
  {
    number: '04',
    title:  'Room Booking Panel Integration',
    desc:   'A panel outside the door syncs to your calendar and shows real-time availability. Book or extend a meeting on the spot, so a double-booking is caught before anyone walks in.',
  },
  {
    number: '05',
    title:  'Content Sharing & Display',
    desc:   'Wireless and wired presentation from any laptop. Display and audio routed so the room in front of you and the people dialling in see and hear the same thing.',
  },
  {
    number: '06',
    title:  'A Defined AV/IT Support Boundary',
    desc:   'A written line between what we support (room hardware and the AV signal chain) and what your IT team supports, agreed before installation so a fault doesn\'t bounce between the two teams after handover.',
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
    question: 'Which conferencing platforms do you support?',
    answer:   'We design rooms for Microsoft Teams, Zoom Rooms and Google Meet hardware, selecting the room compute and peripherals to suit whichever your organisation runs. If you use more than one, a room can be configured to switch between them.',
  },
  {
    question: 'What happens if the room is an unusual shape, or has a lot of glass?',
    answer:   'That is exactly what the design stage is for. Microphone pickup and camera framing are planned against the room\'s real geometry — sightlines, table shape, ceiling height, hard and soft surfaces — rather than a standard kit installed regardless of the room. A long, narrow room and a square boardroom need different coverage even at the same headcount.',
  },
  {
    question: 'Where is the line between what you support and what our IT team supports?',
    answer:   'We set that out in writing before installation, not after a fault. Broadly, we support the room hardware and the AV signal chain — cameras, microphones, displays, the room\'s audio and video coverage — while your IT team supports the network, user identity and conferencing licensing the room hardware sits on top of. Where a fault could be either, the boundary document says who is contacted first.',
  },
  {
    question: 'Can the room booking panel integrate with our existing calendar system?',
    answer:   'Yes, provided your organisation runs a calendar platform the panel can synchronise with, most commonly Microsoft 365 or Google Workspace. We configure this during installation so availability shown outside the room matches what is actually booked.',
  },
  {
    question: 'Can you retrofit an existing meeting room, or is this only for new fit-outs?',
    answer:   'Both. A new fit-out lets us plan cabling and mounting points before the ceiling and walls close up. A retrofit means assessing the existing room, its acoustics and its cabling, and designing around what is already there rather than assuming a blank slate.',
  },
]

export const CTA = {
  primaryCta: { label: 'Book a Consultation', href: '#contact' },
  ghostCta:   { label: 'View All Services',   href: '/commercial/#services' },
}

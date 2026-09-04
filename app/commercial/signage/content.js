// ── Digital Signage — Page Content ──────────────────────────

export const HERO = {
  label: 'Commercial',
  title: 'Digital Signage & Wayfinding',
  body:  'Screens specified for the brightness and duty cycle the space actually demands. Content scheduled and updated by whoever should be updating it. Wayfinding kept current across the whole site, managed remotely, not walked to floor by floor.',
}

export const INTRO = {
  label: 'What We Do',
  title: 'A screen that runs open to close is a different brief to a television.',
  body:  'A domestic television is watched a few hours a day, then dims itself for the rest. A reception screen or directory board runs open to close, often facing a window full of ambient light, and still has to look right come four in the afternoon.\n\nWe specify panels rated for the brightness and duty cycle the space demands, and build scheduling around who\'s meant to update what. Wayfinding stays part of the same system, so a directory reflects the building as it is today, not the day it was printed.',
}

export const FEATURES = [
  {
    number: '01',
    title:  'Screen Selection for Brightness & Duty Cycle',
    desc:   'Panels specified against the ambient light and the hours a screen runs, so a display doesn\'t dim into a smear at midday, or burn in from the same slide for a year.',
  },
  {
    number: '02',
    title:  'Content Scheduling & Playlists',
    desc:   'Content organised into playlists and day-parts: a lobby screen showing one thing at 8am and another at lunch, a meeting-room panel switching to a booking display the moment the room\'s reserved.',
  },
  {
    number: '03',
    title:  'Content Ownership & Update Workflow',
    desc:   'Who updates the signage (marketing, front-of-house, a single administrator) gets decided at design stage and built into the permissions, not worked out after handover when nobody can find the login.',
  },
  {
    number: '04',
    title:  'Wayfinding & Directory Integration',
    desc:   'Building directories and wayfinding boards run from the same content platform as the rest of the signage. A tenancy change updates the directory centrally, instead of waiting on a new printed board.',
  },
  {
    number: '05',
    title:  'Remote Management of a Distributed Estate',
    desc:   'Every screen across every site reachable from one dashboard: content pushed, status checked, a frozen unit rebooted remotely. No need to drive out and find a screen switched off at the wall.',
  },
  {
    number: '06',
    title:  'Mounting, Power & Data Coordination',
    desc:   'Screen positions, power and data points coordinated with the builder or shopfitter before walls and joinery close up. No screen left stranded waiting on a power point that was never roughed in.',
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
    question: 'Who is responsible for updating the content once the screens are installed?',
    answer:   'That is decided during design, not left to work itself out afterwards. Depending on the business it might be a marketing team, front-of-house staff or a single administrator — we build the content permissions and templates around whoever that is, so updating a screen does not require calling us every time.',
  },
  {
    question: 'Can different screens show different content at the same time?',
    answer:   'Yes. Screens are organised into zones and playlists, so a reception display, a directory board and a meeting-room panel can each run their own content and schedule from the same platform, rather than all showing an identical loop.',
  },
  {
    question: 'Can the signage integrate with our existing building directory or wayfinding?',
    answer:   'In most cases the directory and wayfinding content can be brought onto the same platform as the rest of the signage, so a tenancy change updates the directory centrally instead of triggering a new printed board. The approach depends on what is already installed.',
  },
  {
    question: 'What happens if a screen goes offline or freezes?',
    answer:   'Screen status is visible from the same dashboard used to push content, so a frozen or offline unit is identified without a site visit, and many faults — a stuck playlist, a unit that needs a restart — can be resolved remotely.',
  },
  {
    question: 'Who owns the content management platform and the login once the project is finished?',
    answer:   'You do. Administrator access, content templates and the device inventory are handed over at project close, so the platform stays yours to operate rather than something only we can update.',
  },
]

export const CTA = {
  primaryCta: { label: 'Book a Consultation', href: '#contact' },
  ghostCta:   { label: 'View All Services',   href: '/commercial/#services' },
}

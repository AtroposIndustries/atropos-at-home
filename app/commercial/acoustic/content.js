// ── Acoustic Treatment — Page Content ──────────────────────

export const HERO = {
  label: 'Commercial',
  title: 'Acoustic Treatment',
  body:  'Speech intelligibility in a meeting room. Speech privacy between one room and the next. Open-plan noise brought down to a level people can actually think in. Specified alongside the architect\'s finishes, not bolted on after the fit-out\'s signed off.',
}

export const INTRO = {
  label: 'What We Do',
  title: 'Acoustics that decide whether people can hear each other.',
  body:  'A home theatre is treated so the room doesn\'t fight the front three channels. A commercial fit-out has more jobs to do: stop a meeting room turning into a guessing game, and stop a boardroom ringing every time someone raises their voice.\n\nOpen-plan floors trade walls for noise, and the fix is usually the ceiling, the partition and furniture absorbing what would otherwise bounce around. We look at the space early enough to shape the finishes schedule, not called in once the fit-out\'s done and the budget\'s gone on paint.',
}

export const FEATURES = [
  {
    number: '01',
    title:  'Speech Intelligibility in Meeting & Board Rooms',
    desc:   'Reverberation brought down to where speech stays clear and a conferencing mic doesn\'t smear voices into echo. The difference between a call people can follow, and one full of repeated questions.',
  },
  {
    number: '02',
    title:  'Speech Privacy Between Rooms & Workstations',
    desc:   'Wall, ceiling and door build-up assessed for how much of a confidential conversation carries into the corridor or the next desk. Useful wherever a conversation needs to stay put.',
  },
  {
    number: '03',
    title:  'Open-plan Noise Control',
    desc:   'Ceiling absorption, partial screens and furniture placement bring down the reflected noise that builds up across an open floor, so a desk in the middle isn\'t fighting a conversation six desks away.',
  },
  {
    number: '04',
    title:  'Meeting Room Reverberation & Conferencing Audio',
    desc:   'Reverberation addressed around where microphones sit and people speak. A room can feel comfortable and still sound poor on a call, a problem nobody in the room notices.',
  },
  {
    number: '05',
    title:  'Coordination With the Architect\'s Finishes Schedule',
    desc:   'Ceiling tile, carpet, partition build-up and joinery reviewed against what the space needs acoustically, and raised with the architect while the schedule can still change.',
  },
  {
    number: '06',
    title:  'Aesthetic Integration With the Fit-out',
    desc:   'Acoustic panels and ceiling treatment specified in finishes that sit inside the fit-out\'s material palette, so the treatment reads as part of the design, not an obvious retrofit.',
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
    question: 'Why would an open-plan office need acoustic treatment if there are no walls to soundproof?',
    answer:   'Open-plan floors trade walls for reflected noise — sound that would otherwise be stopped by a wall instead bounces off a hard ceiling and hard floor and builds up across the whole space. Treating the ceiling, adding partial screens and choosing absorbent finishes brings that reflected noise down without adding a single wall.',
  },
  {
    question: 'Our meeting rooms look fine — why would video calls sound bad?',
    answer:   'A room can look and feel comfortable while still ringing acoustically in a way a microphone picks up far more than a human ear does in normal conversation. Reverberation that is barely noticeable when you are in the room can have a remote participant asking people to repeat themselves throughout a call — treating the room addresses the cause rather than the microphone.',
  },
  {
    question: 'When should acoustic treatment be considered in a fit-out?',
    answer:   'As early as possible, ideally alongside the finishes schedule. Ceiling tile, carpet and partition build-up all affect the acoustic outcome, and it is far cheaper to specify the right ceiling tile once than to add surface-mounted treatment after the fit-out is finished and the budget has been spent elsewhere.',
  },
  {
    question: 'Can acoustic treatment address speech privacy for confidential conversations?',
    answer:   'Yes, to a degree that depends on the construction. Wall, ceiling and door build-up all affect how much sound passes between rooms, and we assess what is achievable within your fit-out\'s construction rather than promising a level of privacy the building cannot actually deliver.',
  },
  {
    question: 'Do you work directly with our architect or fit-out contractor?',
    answer:   'Yes — working alongside the architect or designer is how commercial acoustic treatment gets coordinated properly. We review the finishes schedule with them and raise the acoustic implications of ceiling, flooring and partition choices while those choices can still be adjusted, rather than being brought in once they are locked in.',
  },
]

export const CTA = {
  primaryCta: { label: 'Book a Consultation', href: '#contact' },
  ghostCta:   { label: 'View All Services',   href: '/commercial/#services' },
}

// ── Premium Home Theatre — Page Content ────────────────────

export const HERO = {
  label: 'Services',
  title: 'Premium Home Theatre',
  body:  'From an intimate two-channel listening room to a full Dolby Atmos cinema — designed, treated and commissioned to move you.',
}

export const INTRO = {
  label: 'What We Do',
  title: 'Cinema. In your home. Without compromise.',
  body:  'A great home theatre isn\'t about screen size or speaker count. It\'s about the moment the room disappears and you\'re simply somewhere else. We design for that from first principles — acoustics, sight lines, equipment and calibration, all considered together, so the finished room performs right at the edge of what home cinema can do.',
}

export const FEATURES = [
  {
    number: '01',
    title:  'Room Design & Sight Lines',
    desc:   'Seating position, screen size and projection throw, worked out for your room\'s exact dimensions — before anything is ordered.',
  },
  {
    number: '02',
    title:  'Projection & Display',
    desc:   '4K laser projection for a dedicated theatre, OLED or direct-view LED for a media room. Epson, Sony and Samsung, matched to your space.',
  },
  {
    number: '03',
    title:  'Immersive Surround Sound',
    desc:   'Dolby Atmos and DTS:X, with ceiling, wall and floor channels positioned and calibrated so the soundstage puts you inside the film, not in front of it.',
  },
  {
    number: '04',
    title:  'Acoustic Treatment',
    desc:   'First reflection control, bass trapping and diffusion, designed for your room\'s geometry. Panels that read as part of the interior, not bolted on afterwards.',
  },
  {
    number: '05',
    title:  'Theatre Lighting & Seating',
    desc:   'Scene-based LED lighting that dims itself before the film starts and lifts again after. Seating laid out for comfort and a clean sightline to the screen.',
  },
  {
    number: '06',
    title:  'Professional Calibration',
    desc:   'ISF and THX-informed display calibration, Audyssey, Dirac or manual room correction for audio. Your system gets measured, not guessed.',
  },
]

export const PROCESS = {
  label: 'How We Work',
  title: 'Every detail, considered.',
  steps: [
    {
      num:   '01',
      title: 'Consultation & Brief',
      desc:  'We discuss how you watch — films, sport, gaming, music — and what experience you are aiming for. Budget, room, and brief are established together.',
    },
    {
      num:   '02',
      title: 'Room Analysis & Design',
      desc:  'Acoustic modelling, equipment selection, and layout design. You receive a full specification before we commit to anything.',
    },
    {
      num:   '03',
      title: 'Acoustic Treatment',
      desc:  'Treatment is installed and measured before the AV equipment. Getting the room right first means the system can be calibrated to its full potential.',
    },
    {
      num:   '04',
      title: 'Equipment & Installation',
      desc:  'Every component is installed, cabled, and configured to specification. Rack builds are clean, labelled, and fully documented.',
    },
    {
      num:   '05',
      title: 'Calibration & Handover',
      desc:  'Display calibration, room correction, and a full system demonstration. You leave knowing exactly what your system is capable of.',
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
    question: 'What is the difference between a media room and a dedicated home theatre?',
    answer:   'A media room is a multipurpose space — comfortable for watching TV, but not optimised for cinema. A dedicated home theatre is a purpose-built room with controlled acoustics, optimised sight lines, and professional-grade equipment. Both are worthwhile, and the right choice depends on your space and budget.',
  },
  {
    question: 'What screen size do I need?',
    answer:   'Screen size is determined by viewing distance and the content you watch primarily. We calculate the optimal screen width for your seating arrangement during the design phase — it is more nuanced than simply "bigger is better".',
  },
  {
    question: 'Do I need Dolby Atmos?',
    answer:   'Dolby Atmos delivers a genuinely different experience for film — height channels create a three-dimensional soundstage that conventional surround cannot replicate. For a dedicated theatre, we recommend it. For a media room with ceiling constraints, there are excellent alternatives.',
  },
  {
    question: 'Can an existing room be converted into a home theatre?',
    answer:   'Yes. We assess the room\'s dimensions, existing construction, and any acoustic challenges before recommending an approach. Retrofitting a theatre is more involved than building into a new build, but excellent results are achievable.',
  },
  {
    question: 'How long does a home theatre installation take?',
    answer:   'A fully dedicated theatre typically takes two to four weeks from room-ready to calibration, depending on the complexity of the acoustic treatment and equipment involved. We provide a detailed timeline during the design phase.',
  },
]

export const CTA = {
  primaryCta: { label: 'Book a Consultation', href: '#contact' },
  ghostCta:   { label: 'View All Services',   href: '/residential/#services' },
}

// ── Acoustic Treatment — Page Content ──────────────────────

export const HERO = {
  label: 'Services',
  title: 'Acoustic Treatment',
  body:  'Panels, diffusers and bass treatment that look as good as they perform — designed to sit with your interior, not fight it.',
}

export const INTRO = {
  label: 'What We Do',
  title: 'Sound that the room doesn\'t fight.',
  body:  'Every room has an acoustic signature, and left untreated it works against your system — bass building up in corners, reflections blurring the soundstage. We measure your room, design a treatment strategy, and specify materials that perform properly and still look like they belong. The result is a room where the system finally sounds the way it was meant to.',
}

export const FEATURES = [
  {
    number: '01',
    title:  'Room Acoustic Analysis',
    desc:   'We measure your room\'s frequency response, decay times and reflection patterns, so treatment addresses real problems, not guessed-at ones.',
  },
  {
    number: '02',
    title:  'First Reflection Control',
    desc:   'Absorption at the primary reflection points on walls and ceiling, cutting comb filtering and bringing stereo imaging back into focus.',
  },
  {
    number: '03',
    title:  'Bass Trapping',
    desc:   'Corner-loaded broadband absorbers that tame low-frequency room modes, usually the biggest acoustic problem in a dedicated listening or theatre room.',
  },
  {
    number: '04',
    title:  'Diffusion Design',
    desc:   'Rear-wall and ceiling diffusers that scatter reflections instead of absorbing them, keeping the room\'s energy and naturalness while killing flutter echo.',
  },
  {
    number: '05',
    title:  'Aesthetic Integration',
    desc:   'Panels in custom fabrics, timbers and finishes, designed with your architect or stylist so the treatment enhances the room instead of dominating it.',
  },
  {
    number: '06',
    title:  'Post-treatment Calibration',
    desc:   'Once the room\'s treated, we re-measure and re-calibrate your system in its improved acoustic environment, so the treatment actually pays off.',
  },
]

export const PROCESS = {
  label: 'How We Work',
  title: 'Measured. Designed. Integrated.',
  steps: [
    {
      num:   '01',
      title: 'Room Measurement',
      desc:  'We measure your room using calibrated microphones and analysis software. Modal issues, decay times, and reflection patterns are documented before any treatment is designed.',
    },
    {
      num:   '02',
      title: 'Treatment Design',
      desc:  'A treatment strategy is developed from the measurement data — specifying placement, material, and thickness for absorption, diffusion, and bass control.',
    },
    {
      num:   '03',
      title: 'Material & Finish Specification',
      desc:  'Panel sizes, frame materials, and fabric choices are finalised in consultation with your designer or directly with you — to integrate with the room\'s aesthetic.',
    },
    {
      num:   '04',
      title: 'Installation',
      desc:  'Panels are installed to specification, precisely placed at the positions identified in the treatment design — not approximated.',
    },
    {
      num:   '05',
      title: 'Verification & Calibration',
      desc:  'The room is re-measured post-treatment to verify the results. Your audio system is then calibrated in its improved acoustic environment.',
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
    question: 'Is acoustic treatment just foam wedges?',
    answer:   'No. Consumer foam products provide minimal low-frequency absorption and are acoustically and aesthetically inadequate for a serious listening room or home theatre. We specify purpose-built broadband absorbers, diffusers, and bass traps using materials that perform across the relevant frequency range.',
  },
  {
    question: 'Can acoustic panels look good?',
    answer:   'Yes — done properly, acoustic panels are an interior design element. We work in custom timbers, fabrics, and finishes and can produce panels that complement or intentionally contrast with the room. Many clients\' guests do not realise the panels are acoustic treatment at all.',
  },
  {
    question: 'Do I need acoustic treatment if I already have carpet and soft furnishings?',
    answer:   'Soft furnishings provide high-frequency absorption, which is a starting point — but they do not address the low-frequency modal problems that cause the most damage to sound quality. A proper treatment strategy addresses the full frequency range.',
  },
  {
    question: 'Does acoustic treatment work for open-plan spaces?',
    answer:   'Open-plan spaces present different challenges to dedicated rooms but treatment is still beneficial, particularly for listening positions. We assess what is achievable in your specific space and design accordingly.',
  },
  {
    question: 'Can you treat a room that is already finished?',
    answer:   'Yes. Most of our acoustic treatment work is in finished rooms. Surface-mounted panels, freestanding absorbers, and ceiling treatment can all be installed without significant construction work.',
  },
]

export const CTA = {
  primaryCta: { label: 'Book a Consultation', href: '#contact' },
  ghostCta:   { label: 'View All Services',   href: '/residential/#services' },
}

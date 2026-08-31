// ── Structured Cabling & Comms Rooms — Page Content ─────────

export const HERO = {
  label: 'Commercial',
  title: 'Structured Cabling & Comms Rooms',
  body:  'Cat6A and fibre backbone, comms room and rack layout, sequenced with your builder from first fix through to test-and-certify — coordinated before the walls close up, not chased after the plasterers leave.',
}

export const INTRO = {
  label: 'What We Do',
  title: 'Cabling that is right before the walls close up.',
  body:  'Cabling is one of the few trades on a fit-out where a mistake is genuinely expensive to fix after the fact — a missed outlet or an undersized pathway found after sheeting means chasing a finished wall rather than adjusting a drawing. We design the cable routes, containment, outlet locations and comms room layout at the same time as the rest of the fit-out, coordinate the rough-in directly with your builder\'s trade schedule, and hand over every outlet tested, certified and labelled against an as-built drawing.',
}

export const FEATURES = [
  {
    number: '01',
    title:  'Cat6A & Fibre Backbone',
    desc:   'Copper to the outlet for standard data and voice runs, with fibre used where distance or interference rules copper out, both sized for a bandwidth ceiling higher than whatever is plugged in on day one.',
  },
  {
    number: '02',
    title:  'Rough-in Coordination',
    desc:   'Outlet locations, penetrations and containment routes locked in and marked before frame or sheeting stage, coordinated directly against your builder\'s trade schedule rather than worked around afterward.',
  },
  {
    number: '03',
    title:  'Containment & Pathways',
    desc:   'Conduit, tray and riser pathways sized for the current cable count plus a deliberate margin for what gets added later, rather than a single duct run at capacity on day one.',
  },
  {
    number: '04',
    title:  'Rack & Comms Room Layout',
    desc:   'Rack elevation, power, cooling and cable management planned before equipment arrives on site, so the comms room functions as a room with capacity to grow, not a store cupboard with a rack pushed into it.',
  },
  {
    number: '05',
    title:  'Testing & Certification, Per Port',
    desc:   'Every terminated outlet tested for continuity, wiremap and performance against the required certification criteria, with the result recorded against its port number and handed over as a report — not a verbal assurance that it is all fine.',
  },
  {
    number: '06',
    title:  'Labelling & As-built Documentation',
    desc:   'Every cable, outlet and patch panel port labelled to match an as-built drawing, so a fault found six months later starts as a lookup against documentation, not a hunt with a tone generator.',
  },
]

export const FAQ_ITEMS = [
  {
    question: 'Why does cabling need to be locked in before the walls go up?',
    answer:   'Because the cost of a mistake changes completely once the sheeting is on. An outlet moved on a drawing costs nothing; an outlet moved after the wall is finished means cutting into it. We design the cable routes, outlet locations and containment at the same time as the rest of the fit-out and coordinate the rough-in with your builder\'s schedule specifically to avoid that.',
  },
  {
    question: 'Do you install fibre as well as copper?',
    answer:   'Yes. Fibre is specified wherever distance, electrical interference or future bandwidth requirements make it the better choice — typically backbone runs between comms rooms or between buildings — while copper continues to serve individual outlets and desks.',
  },
  {
    question: 'What is actually in a "comms room" — is it just a rack in a cupboard?',
    answer:   'It should not be. A comms room needs planned power, cooling, cable management and physical access, sized for the rack equipment it holds and for growth. We design that layout before equipment arrives, rather than fitting a rack into whatever small room was left over once the rest of the floor plan was set.',
  },
  {
    question: 'What do we get at handover to prove the cabling actually works?',
    answer:   'A per-port test result for every outlet — continuity, wiremap and performance against the required certification criteria — plus an as-built drawing showing where every cable actually runs and a label on every outlet and patch panel port matching it.',
  },
  {
    question: 'Can you work with a building that already has some cabling in place?',
    answer:   'Yes. We assess what is already installed and terminated, test it against the same certification criteria as new cabling, and design around what is genuinely reusable rather than assuming everything needs to be replaced.',
  },
]

export const CTA = {
  primaryCta: { label: 'Book a Consultation', href: '#contact' },
  ghostCta:   { label: 'View All Services',   href: '/commercial/#services' },
}

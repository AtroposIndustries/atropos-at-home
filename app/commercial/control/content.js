// ── Building & Room Control — Page Content ─────────────────

export const HERO = {
  label: 'Commercial',
  title: 'Building & Room Control',
  body:  'Scheduling and occupancy-driven automation across floors and tenancies — lighting, climate and AV governed as one system, documented and handed over as something you own.',
}

export const INTRO = {
  label: 'What We Do',
  title: 'Control that scales past one office.',
  body:  'A single automated home answers to one household\'s routine. A commercial building answers to a lease schedule, a roster of casual staff, an after-hours function running in one tenancy while the floor above sits dark, and a base-building services contract that already governs half of what the control system wants to touch. We design scheduling and occupancy sensing around those constraints, integrate with the mechanical and access-control services the building already has rather than duplicating them, and hand over documentation and administrator credentials that belong to your organisation — not to us.',
}

export const FEATURES = [
  {
    number: '01',
    title:  'Scheduling by Occupancy & Hours',
    desc:   'Lighting, climate and AV run on schedules tied to trading hours, meeting bookings and after-hours access — not a fixed timer that leaves a floor lit at eleven o\'clock because nobody adjusted it for daylight saving.',
  },
  {
    number: '02',
    title:  'Occupancy-driven Automation',
    desc:   'Sensors bring a room or zone down to standby when it empties and back up before the next booking starts, so spaces are not run at full lighting and climate overnight or left cold when someone arrives unannounced.',
  },
  {
    number: '03',
    title:  'Multi-tenant & Multi-zone Separation',
    desc:   'Zone boundaries mapped to lease boundaries, not to whatever is convenient to wire. One tenancy\'s after-hours event does not override another tenancy\'s schedule two floors up.',
  },
  {
    number: '04',
    title:  'Base-building Services Integration',
    desc:   'The control system talks to the mechanical services, building management system and access control already installed, rather than adding a second thermostat and a second door schedule that quietly drift out of step with the first.',
  },
  {
    number: '05',
    title:  'Facilities-level Management',
    desc:   'One interface for the facilities team to review and adjust every floor and tenancy, in place of walking the building to check what is currently running where.',
  },
  {
    number: '06',
    title:  'Handover Documentation & Credential Ownership',
    desc:   'Full documentation of the programming logic, network configuration and device inventory at project close, with administrator-level credentials issued to your organisation in writing — so the system stays yours to operate or hand to a different contractor.',
  },
]

export const FAQ_ITEMS = [
  {
    question: 'Can the system integrate with our existing building management system?',
    answer:   'In most cases, yes — the approach depends on what protocol your BMS and mechanical services already speak. We assess the existing building services during design and integrate with them rather than duplicate them, so far as the installed equipment allows.',
  },
  {
    question: 'Who owns the programming and the credentials once the project is finished?',
    answer:   'You do. We document the programming logic, the network configuration and the device inventory, and hand over administrator-level credentials in writing at project close. If you later engage a different contractor, you are not locked out by us.',
  },
  {
    question: 'Can different tenancies or floors be controlled independently?',
    answer:   'Yes. Zoning is designed against your lease boundaries and floor plan, so each tenancy\'s schedule, lighting and climate can be managed on its own, without a flow-on effect to the level above or below.',
  },
  {
    question: 'What happens to scheduling around public holidays or one-off events?',
    answer:   'The schedule supports one-off overrides — an after-hours function, an extended trading day, a public holiday closure — without needing to reprogram the underlying weekly schedule.',
  },
  {
    question: 'Do you work directly with a body corporate or strata manager rather than a single business owner?',
    answer:   'That depends on the building. Base-building control decisions can sit with a body corporate, strata manager or head landlord rather than an individual tenant, and we scope the project and the handover documentation to whoever holds that responsibility.',
  },
]

export const CTA = {
  primaryCta: { label: 'Book a Consultation', href: '#contact' },
  ghostCta:   { label: 'View All Services',   href: '/commercial/#services' },
}

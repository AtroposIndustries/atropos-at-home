// ── Ongoing Support — Page Content ─────────────────────────

export const HERO = {
  label: 'Services',
  title: 'Ongoing Support',
  body:  'Technology you can actually live with. Remote monitoring, software updates and a team that picks up the phone, long after installation day.',
}

export const INTRO = {
  label: 'What We Do',
  title: 'A relationship, not a transaction.',
  body:  'A smart home is a living system. Platforms update, devices change, life moves on. Our support plans mean someone who actually knows your system is ready to help — when something changes, something needs adjusting, or you just want more out of what you already have. We don\'t hand over and disappear. We stay.',
}

export const FEATURES = [
  {
    number: '01',
    title:  'Remote Monitoring',
    desc:   'We monitor your system\'s health in the background, so connectivity drops, offline devices and software errors get caught before you notice them.',
  },
  {
    number: '02',
    title:  'Software & Firmware Updates',
    desc:   'Control system software, device firmware and streaming platform updates, managed and tested by us before they ever reach your home.',
  },
  {
    number: '03',
    title:  'Phone & Remote Support',
    desc:   'When something feels off, or you just want something changed, call us. We know your system and can usually sort it out remotely.',
  },
  {
    number: '04',
    title:  'Priority On-site Response',
    desc:   'For anything that can\'t be sorted remotely, support clients get priority scheduling for an on-site visit from our Hobart-based team.',
  },
  {
    number: '05',
    title:  'System Adjustments',
    desc:   'Your life changes, your system should too. Scene tweaks, new schedules, renamed zones, added devices — handled without fuss.',
  },
  {
    number: '06',
    title:  'Expansion Planning',
    desc:   'When you\'re ready to add a room, a system or a new capability, we plan it around what\'s already there. No surprises.',
  },
]

export const PROCESS = {
  label: 'How It Works',
  title: 'Simple. Proactive. Personal.',
  steps: [
    {
      num:   '01',
      title: 'System Documentation',
      desc:  'Every system we install is fully documented — device inventory, network map, programming logic, and user credentials. Your system\'s history is recorded from day one.',
    },
    {
      num:   '02',
      title: 'Remote Access Setup',
      desc:  'Secure remote access to your system is configured at handover so we can connect and assist without needing to be on site.',
    },
    {
      num:   '03',
      title: 'Monitoring Activation',
      desc:  'Background health monitoring is enabled. We receive alerts for connectivity events, device failures, and software anomalies — and act on them proactively.',
    },
    {
      num:   '04',
      title: 'Ongoing Partnership',
      desc:  'Regular update cycles, proactive check-ins, and a direct line to the people who built your system. Support the way it should be.',
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
    question: 'What is included in a support plan?',
    answer:   'Our support plans include remote monitoring, software and firmware update management, phone and remote support, and priority scheduling for on-site visits. We tailor the scope to your system during onboarding.',
  },
  {
    question: 'What are your response times?',
    answer:   'Phone and remote support is available during business hours with same-day response. Priority on-site visits are typically scheduled within 24 to 48 hours. For critical issues affecting security or access systems, we escalate accordingly.',
  },
  {
    question: 'Can you support a system you did not install?',
    answer:   'Yes — with a caveat. We need to audit the system first to understand what is installed, how it is configured, and what documentation exists. Once we know the system, we can support it.',
  },
  {
    question: 'What if I just want occasional help without a plan?',
    answer:   'Casual support is available at our standard hourly rate. Support plan clients receive priority scheduling and are billed at the plan rate. For ongoing peace of mind, the plan usually works out significantly better value.',
  },
  {
    question: 'How do software updates work?',
    answer:   'We manage updates on a controlled cycle — reviewing release notes, testing on comparable systems where possible, and deploying to your home at an agreed time. We do not apply updates automatically without review, because updates occasionally introduce regressions.',
  },
]

export const CTA = {
  primaryCta: { label: 'Book a Consultation', href: '#contact' },
  ghostCta:   { label: 'View All Services',   href: '/residential/#services' },
}

// ── Network & Connectivity — Page Content ───────────────────

export const HERO = {
  label: 'Services',
  title: 'Network & Connectivity',
  body:  'Networking that just works, underneath everything else in the house. Wi-Fi that actually reaches every room, with the bandwidth to back it up.',
}

export const INTRO = {
  label: 'What We Do',
  title: 'The infrastructure everything else depends on.',
  body:  'Every smart device, every stream, every camera and every voice command in your home runs on the network. Get the network wrong and it doesn\'t matter how good everything else is. We design and install residential networking that\'s genuinely resilient, covers the whole house, and handles whatever you throw at it, now and as your home grows.',
}

export const FEATURES = [
  {
    number: '01',
    title:  'Whole-home Wi-Fi',
    desc:   'Ubiquiti and Ruckus enterprise-grade access points, placed and configured to kill dead zones and cover every room, inside and out.',
  },
  {
    number: '02',
    title:  'Structured Cabling',
    desc:   'A wired Ethernet backbone for anything that can use one — televisions, automation controllers, NAS drives, access points. Reliability that Wi-Fi alone can\'t promise.',
  },
  {
    number: '03',
    title:  'Smart Device Infrastructure',
    desc:   'Dedicated VLANs for smart devices, IoT gear and guest access, so your network stays segmented, manageable and secure.',
  },
  {
    number: '04',
    title:  'Remote Monitoring',
    desc:   'We can monitor your network remotely and get an alert before an issue reaches you. Most problems get diagnosed and fixed without anyone setting foot on site.',
  },
  {
    number: '05',
    title:  'Network Security',
    desc:   'Firewall configuration, guest network isolation and DNS filtering — security that doesn\'t get in the way of daily use.',
  },
  {
    number: '06',
    title:  'Future-ready Infrastructure',
    desc:   'Conduit, patch panels and switching capacity sized for where your home is going, not just where it is today. Expanding later should be simple, not a rebuild.',
  },
]

export const PROCESS = {
  label: 'How We Work',
  title: 'Built right from the ground up.',
  steps: [
    {
      num:   '01',
      title: 'Site Assessment',
      desc:  'We survey your home — floor plans, construction type, device inventory, and internet connection — to understand exactly what the network needs to support.',
    },
    {
      num:   '02',
      title: 'Network Design',
      desc:  'Access point placement, switching architecture, and VLAN structure designed for your home\'s layout and your device ecosystem.',
    },
    {
      num:   '03',
      title: 'Infrastructure Installation',
      desc:  'Cabling, patch panels, and switching equipment installed with your builder during construction — or retrofit with minimal disruption to an existing home.',
    },
    {
      num:   '04',
      title: 'Configuration & Testing',
      desc:  'Every access point configured, every VLAN established, every device connected and tested. Coverage is measured, not assumed.',
    },
    {
      num:   '05',
      title: 'Handover & Documentation',
      desc:  'Full network documentation provided. Your credentials, your layout, your configuration — clearly documented and yours to keep.',
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
    question: 'Why not just use consumer Wi-Fi routers?',
    answer:   'Consumer routers are designed for simplicity, not performance. In a home with dozens of smart devices, multiple streams, and coverage demands across multiple levels and outdoor areas, enterprise-grade access points provide meaningfully better reliability, coverage, and control.',
  },
  {
    question: 'What brands do you use?',
    answer:   'We primarily use Ubiquiti UniFi for most residential projects — it offers outstanding performance and centralised management at a sensible price point. For larger or more demanding installations we also work with Ruckus and Cisco Meraki.',
  },
  {
    question: 'Can you work with our existing cabling?',
    answer:   'Often yes. We assess the existing cabling during our site survey. Older Cat5 cable is frequently reusable, and we design around what is there where it makes sense to do so.',
  },
  {
    question: 'How do you handle smart home devices on the network?',
    answer:   'Smart home devices — thermostats, cameras, voice assistants, automation controllers — are placed on dedicated network segments (VLANs) separate from your personal devices. This improves security and prevents smart home traffic from affecting your day-to-day connectivity.',
  },
  {
    question: 'Can you upgrade an existing network?',
    answer:   'Absolutely. Whether it is replacing consumer equipment with enterprise access points, adding coverage to a problem area, or restructuring the network to support a new smart home system — we assess what is there and recommend the right upgrade path.',
  },
]

export const CTA = {
  primaryCta: { label: 'Book a Consultation', href: '#contact' },
  ghostCta:   { label: 'View All Services',   href: '/residential/#services' },
}

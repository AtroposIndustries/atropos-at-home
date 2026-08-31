// ── Network & Connectivity — Page Content ───────────────────

export const HERO = {
  label: 'Services',
  title: 'Network & Connectivity',
  body:  'Rock-solid, invisible networking that underpins every system in your home. Wi-Fi that actually reaches everywhere, with the bandwidth to match.',
}

export const INTRO = {
  label: 'What We Do',
  title: 'The infrastructure everything else depends on.',
  body:  'Every smart device, every streaming session, every security camera, and every voice command in your home runs on the network. A poor network means a poor smart home — regardless of how good the rest of the system is. We design and install residential networking infrastructure that is genuinely resilient, comprehensively covered, and built to handle whatever your home throws at it — today and for years to come.',
}

export const FEATURES = [
  {
    number: '01',
    title:  'Whole-home Wi-Fi',
    desc:   'Ubiquiti and Ruckus enterprise-grade access points, placed and configured to eliminate dead zones and provide consistent coverage across every room and outdoor area.',
  },
  {
    number: '02',
    title:  'Structured Cabling',
    desc:   'A wired backbone for every device that can use one. Ethernet to televisions, automation controllers, NAS drives, and access points — reliability that Wi-Fi alone cannot guarantee.',
  },
  {
    number: '03',
    title:  'Smart Device Infrastructure',
    desc:   'Dedicated VLANs for smart home devices, IoT equipment, and guest access — keeping your network segmented, manageable, and secure.',
  },
  {
    number: '04',
    title:  'Remote Monitoring',
    desc:   'We can monitor your network remotely and receive alerts before issues affect your home. Most problems are diagnosed and resolved without a site visit.',
  },
  {
    number: '05',
    title:  'Network Security',
    desc:   'Firewall configuration, guest network isolation, and DNS filtering to keep your home network secure without adding complexity to daily use.',
  },
  {
    number: '06',
    title:  'Future-ready Infrastructure',
    desc:   'Conduit, patch panels, and switching capacity sized for where your home is going — not just where it is today. Expansion should be simple, not a rebuild.',
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

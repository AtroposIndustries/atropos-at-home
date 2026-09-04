// ── Managed Networks — Page Content ─────────────────────────

export const HERO = {
  label: 'Commercial',
  title: 'Managed Networks',
  body:  'A business network carries EFTPOS, cloud accounting, phones and security cameras. It\'s expected to be up every hour the doors are open. We design, monitor, patch and segment it under an agreed service level, not install it once and hope.',
}

export const INTRO = {
  label: 'What We Do',
  title: 'A network that gets watched, not just installed.',
  body:  'A home network gets set up once and left alone. If it drops out for an evening, someone restarts the router and life goes on.\n\nA business network doesn\'t get that grace. A dropped connection is a queue at a till that won\'t take a card, or a floor of staff who can\'t log in.\n\nSo we watch it. Patched on a schedule instead of whenever someone remembers, and segmented so a guest phone or a dodgy camera can\'t reach your point-of-sale.',
}

export const FEATURES = [
  {
    number: '01',
    title:  'Continuous Monitoring & Alerting',
    desc:   'Switches, access points, firewalls and internet links watched around the clock. An alert fires the moment one drops or starts to degrade, not when a till stops taking payments.',
  },
  {
    number: '02',
    title:  'Patch & Firmware Currency',
    desc:   'Firmware and security patches applied on a schedule agreed with you, tracked against every device on the network. Not left to pile up until an incident forces an update through.',
  },
  {
    number: '03',
    title:  'Segmentation for Guest, IoT & POS Traffic',
    desc:   'Guest Wi-Fi, IoT devices like cameras and door controllers, and your point-of-sale sit on separate segments. A compromised guest device or camera has no path to the traffic that runs the business.',
  },
  {
    number: '04',
    title:  'Redundancy & Failover',
    desc:   'A second internet connection or failover path picks up automatically when the primary link drops. Sized to what the business can actually afford to lose, not assumed unnecessary.',
  },
  {
    number: '05',
    title:  'Service Level Agreement & Response Times',
    desc:   'A response time attached to a fault, agreed before anything breaks. So what happens once an alert fires is a scoped commitment, not a queue position decided on the day.',
  },
  {
    number: '06',
    title:  'Reporting & Configuration Ownership',
    desc:   'Incident and uptime reporting reviewable on request. Network configuration and administrator credentials documented and belonging to your organisation, not locked inside a device only we can access.',
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
    question: 'How is a managed commercial network different from what you would install in a house?',
    answer:   'A residential network is designed to be installed well and then left alone. A commercial network is designed to be watched: it is monitored continuously, patched on a schedule, covered by a response-time commitment, and segmented around business functions like point-of-sale and guest Wi-Fi rather than personal devices. The hardware can look similar; what happens after installation is the difference.',
  },
  {
    question: 'What happens if the network goes down outside business hours?',
    answer:   'Monitoring runs continuously regardless of trading hours, and the response commitment in your service level agreement applies whenever the fault is raised. What actually happens next — an alert, a remote fix, a site visit before opening — is scoped into that agreement so it is agreed in advance rather than negotiated during the outage.',
  },
  {
    question: 'Can you keep our point-of-sale network separate from guest Wi-Fi?',
    answer:   'Yes — this is one of the first things we design in. Guest access, IoT devices and point-of-sale or back-office systems sit on separate network segments, so a guest device or a compromised camera has no route to the systems that take payment or hold business data.',
  },
  {
    question: 'Who owns the network configuration and the administrator credentials?',
    answer:   'You do. The configuration, the segmentation design and the device inventory are documented, and administrator-level credentials are issued to your organisation in writing, so the network is not something only we can operate or hand over to a different provider.',
  },
  {
    question: 'What response time can we expect if something goes wrong?',
    answer:   'That is set out in the service level agreement scoped to your site before work begins — it depends on the criticality of what is affected and the level of cover you choose. It is a written commitment agreed up front, not a best-effort call whenever someone is available.',
  },
]

export const CTA = {
  primaryCta: { label: 'Book a Consultation', href: '#contact' },
  ghostCta:   { label: 'View All Services',   href: '/commercial/#services' },
}

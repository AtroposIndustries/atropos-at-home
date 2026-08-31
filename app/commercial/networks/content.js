// ── Managed Networks — Page Content ─────────────────────────

export const HERO = {
  label: 'Commercial',
  title: 'Managed Networks',
  body:  'A business network carries EFTPOS, cloud accounting, phones and security cameras, and it is expected to be up every hour the doors are open. We design, monitor, patch and segment it under an agreed service level — not install it once and hope.',
}

export const INTRO = {
  label: 'What We Do',
  title: 'A network that gets watched, not just installed.',
  body:  'A home network is set up once, tuned in, and left to run — if it drops out for an evening, someone restarts the router. A business network does not get that grace period: a dropped connection can mean a queue of customers standing at a till that will not take a card, or a site of staff who cannot log in. We build the network to be monitored continuously, patched on a schedule rather than left to accumulate updates, and segmented so a guest device or a compromised camera cannot reach the point-of-sale or back-office traffic sitting on the same switch.',
}

export const FEATURES = [
  {
    number: '01',
    title:  'Continuous Monitoring & Alerting',
    desc:   'Switches, access points, firewalls and internet links polled continuously, with an alert raised the moment one goes down or starts degrading — rather than the outage being discovered when a till stops taking payments.',
  },
  {
    number: '02',
    title:  'Patch & Firmware Currency',
    desc:   'Firmware and security patches applied on a cadence agreed with you and tracked against every device on the network, rather than left to accumulate until an update is forced through by an incident.',
  },
  {
    number: '03',
    title:  'Segmentation for Guest, IoT & POS Traffic',
    desc:   'Guest Wi-Fi, IoT devices such as cameras and door controllers, and point-of-sale or back-office systems separated onto their own network segments, so a compromised guest device or camera has no path to the traffic that actually runs the business.',
  },
  {
    number: '04',
    title:  'Redundancy & Failover',
    desc:   'A second internet connection or failover path configured to pick up automatically when the primary link drops, sized to what the business can actually tolerate losing rather than assumed to be unnecessary.',
  },
  {
    number: '05',
    title:  'Service Level Agreement & Response Times',
    desc:   'A written response time attached to a fault, agreed before anything breaks — so what happens after an alert fires is a scoped commitment, not a queue position decided on the day.',
  },
  {
    number: '06',
    title:  'Reporting & Configuration Ownership',
    desc:   'Uptime and incident reporting reviewable on request, with the network configuration and administrator credentials documented and belonging to your organisation, not locked inside a device only we can access.',
  },
]

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

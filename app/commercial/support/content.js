// ── Managed Services & Support — Page Content ──────────────

export const HERO = {
  label: 'Commercial',
  title: 'Managed Services & Support',
  body:  'A contracted relationship, not a call when something breaks. Remote monitoring, scheduled preventative maintenance, an asset register that tracks what\'s installed and when it\'s due for renewal, and a response commitment agreed in writing before anything goes wrong.',
}

export const INTRO = {
  label: 'What We Do',
  title: 'Support built as a contract, not a phone call.',
  body:  'A home system is supported the way most households want: something breaks, you call, we come and fix it. A business can\'t run on that model when the system is the boardroom AV or the network the point-of-sale runs on.\n\nCommercial support works as an agreed relationship. The estate is monitored, so a fault gets caught before someone reports it. Equipment is serviced on a preventative schedule, not only after it fails, and a response commitment is written into the agreement before it\'s tested by a real fault.',
}

export const FEATURES = [
  {
    number: '01',
    title:  'Remote Monitoring',
    desc:   'We keep an eye on your control systems, network gear and AV endpoints around the clock — so we usually know a meeting room has gone down before anyone walks into it.',
  },
  {
    number: '02',
    title:  'Scheduled Preventative Maintenance',
    desc:   'Site visits booked on a recurring schedule to check firmware, clean and inspect equipment, and review system logs for early warning signs. Not the only visits being the ones after a breakdown.',
  },
  {
    number: '03',
    title:  'Contracted Response Commitments',
    desc:   'A response commitment set out in the agreement before anything breaks, scoped to how critical the fault is. What happens after it\'s raised is agreed in writing, not decided on the day.',
  },
  {
    number: '04',
    title:  'Asset Register & Lifecycle Planning',
    desc:   'Every piece of equipment logged against its install date and expected service life, so you can see what\'s approaching end of life and budget ahead of time.',
  },
  {
    number: '05',
    title:  'Change & Configuration Management',
    desc:   'Every change to programming, network configuration or device firmware recorded against the asset it affects, so a system\'s current state can always be checked against what was documented at handover.',
  },
  {
    number: '06',
    title:  'Multi-site Reporting',
    desc:   'Support activity, asset status and outstanding items reviewable across every site a business operates, instead of tracked location by location with nothing to compare against.',
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
    question: 'How is commercial support different from calling you when something breaks?',
    answer:   'Reactive support is exactly that — a phone call after a fault, the way most households use it. Commercial support is structured as an ongoing agreement: the estate is monitored continuously, maintenance is scheduled ahead of failures rather than after them, and a response commitment is written into the contract in advance, so what happens when something does go wrong is already agreed rather than negotiated on the day.',
  },
  {
    question: 'What response time can we expect if something goes wrong?',
    answer:   'That is set out in the support agreement scoped to your site, and depends on the criticality of what is affected and the level of cover you choose. It is a written commitment agreed before work begins, not a best-effort visit whenever someone is free — we are not going to quote a figure here that has not actually been agreed with you.',
  },
  {
    question: 'What does preventative maintenance actually involve?',
    answer:   'Scheduled site visits to check firmware and software currency, inspect and clean equipment, and review system logs for early warning signs — the kind of check that catches a failing component or an accumulating fault before it takes a system down, rather than only being on site to diagnose one after it has.',
  },
  {
    question: 'What is an asset register and why does it matter?',
    answer:   'It is a record of every piece of equipment in your estate, logged against its install date and expected service life. It means end-of-life replacement can be budgeted for ahead of time, instead of a control processor or a network switch failing and a business discovering it is obsolete and no longer supported on the day it is needed most.',
  },
  {
    question: 'Can you support equipment or systems you did not originally install?',
    answer:   'In many cases, yes, though we audit the system first — reviewing what is installed, how it is configured and what documentation already exists — before it can be brought onto a support agreement. Once we understand the system, it can be added to the asset register and supported the same as anything we installed ourselves.',
  },
]

export const CTA = {
  primaryCta: { label: 'Book a Consultation', href: '#contact' },
  ghostCta:   { label: 'View All Services',   href: '/commercial/#services' },
}

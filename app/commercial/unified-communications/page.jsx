import { Nav }         from '@/components/layout/Nav'
import { Footer }      from '@/components/layout/Footer'
import { PageHeader }  from '@/components/sections/PageHeader'
import { Intro, FeatureList } from '@/components/sections/ServiceBody'
import { ContactForm } from '@/components/sections/ContactForm'

import { NAV, FOOTER } from '../../content'
import { HERO, INTRO, FEATURES, CTA } from './content'
import { SITE_URL }   from '@/lib/site'
import { pageOpenGraph } from '@/lib/seo'

export const metadata = {
  title:       'Unified Communications & Meeting Rooms Tasmania',
  description: 'Unified communications for Tasmanian workplaces — Teams and Zoom meeting rooms, video conferencing, hybrid and BYOD spaces, room booking, and integration with your existing telephony platform.',
  keywords: [
    'meeting room AV Hobart',
    'Microsoft Teams Rooms Tasmania',
    'video conferencing installation Hobart',
    'unified communications Tasmania',
    'Zoom Rooms Hobart',
    'hybrid meeting room Tasmania',
  ],
  alternates: { canonical: `${SITE_URL}/commercial/unified-communications` },
  openGraph: pageOpenGraph({
    url:         `${SITE_URL}/commercial/unified-communications`,
    description: 'Unified communications for Tasmanian workplaces — Teams and Zoom meeting rooms, video conferencing, hybrid and BYOD spaces, room booking, and integration with your existing telephony platform.',
  }),
}


export default function UnifiedCommunicationsPage() {
  return (
    <>
      <Nav links={NAV.links} ctaLabel={NAV.ctaLabel} ctaHref={NAV.ctaHref} />

      <main id="main">
        <PageHeader
          crumbs={[{ label: 'Commercial', href: '/commercial' }]}
          title={HERO.title}
          body={HERO.body}
          cta={CTA.primaryCta}
        />
        <Intro title={INTRO.title} body={INTRO.body} />
        <FeatureList items={FEATURES} backLink={CTA.backLink} />
        <ContactForm title={CTA.title} intro={CTA.body} />
      </main>

      <Footer tagline={FOOTER.tagline} columns={FOOTER.columns} copyright={FOOTER.copyright} />
    </>
  )
}

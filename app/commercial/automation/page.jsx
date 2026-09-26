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
  title:       'Commercial Automation Tasmania',
  description: 'Lighting, climate and blind control that follows occupancy and trading hours across floors and tenancies, integrated with the building services and security provider you already use — documented and handed over in your name. Hobart, Tasmania.',
  keywords: [
    'commercial automation Hobart',
    'commercial lighting control Hobart',
    'occupancy sensing commercial',
    'multi-tenant automation Hobart',
    'building automation Tasmania',
    'commercial climate control Hobart',
  ],
  alternates: { canonical: `${SITE_URL}/commercial/automation` },
  openGraph: pageOpenGraph({
    url:         `${SITE_URL}/commercial/automation`,
    description: 'Lighting, climate and blind control that follows occupancy and trading hours across floors and tenancies, integrated with the building services and security provider you already use — documented and handed over in your name. Hobart, Tasmania.',
  }),
}


export default function ControlPage() {
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

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
  title:       'Smart Home Automation Hobart & Tasmania',
  description: 'Whole-home automation — lighting, climate, blinds and AV behind one intuitive interface, integrating with the security system you already have. One system across the house, with custom mobile, tablet and web control.',
  keywords: [
    'smart home Hobart',
    'home automation Tasmania',
    'smart lighting system',
    'smart home installer Tasmania',
  ],
  alternates: { canonical: `${SITE_URL}/residential/smart-home` },
  openGraph: pageOpenGraph({
    url:         `${SITE_URL}/residential/smart-home`,
    description: 'Whole-home automation — lighting, climate, blinds and AV behind one intuitive interface, integrating with the security system you already have. One system across the house, with custom mobile, tablet and web control.',
  }),
}


export default function SmartHomePage() {
  return (
    <>
      <Nav links={NAV.links} ctaLabel={NAV.ctaLabel} ctaHref={NAV.ctaHref} />

      <main id="main">
        <PageHeader
          crumbs={[{ label: 'Residential', href: '/residential' }]}
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

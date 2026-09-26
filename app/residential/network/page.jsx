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
  title:       'Home Network & Wi-Fi Installation Tasmania',
  description: 'Enterprise-grade whole-home Wi-Fi, structured cabling, and network design for smart homes in Tasmania. Ubiquiti, Ruckus. Designed and installed by Atropos, Hobart.',
  keywords: [
    'home network Hobart',
    'Wi-Fi installation Tasmania',
    'Ubiquiti installer',
    'smart home networking',
    'enterprise Wi-Fi home',
    'structured cabling Tasmania',
  ],
  alternates: { canonical: `${SITE_URL}/residential/network` },
  openGraph: pageOpenGraph({
    url:         `${SITE_URL}/residential/network`,
    description: 'Enterprise-grade whole-home Wi-Fi, structured cabling, and network design for smart homes in Tasmania. Ubiquiti, Ruckus. Designed and installed by Atropos, Hobart.',
  }),
}


export default function NetworkPage() {
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

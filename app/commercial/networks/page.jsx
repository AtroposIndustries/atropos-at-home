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
  title:       'Commercial Network & Wi-Fi Tasmania',
  description: 'Business networks monitored, patched on a schedule and segmented — guest, IoT and point-of-sale traffic kept apart, with documented failover and a response commitment agreed for your site. Hobart, Tasmania.',
  keywords: [
    'managed network services Hobart',
    'business network monitoring Tasmania',
    'network segmentation commercial',
    'business Wi-Fi Tasmania',
    'commercial network support Hobart',
    'guest network security Hobart',
  ],
  alternates: { canonical: `${SITE_URL}/commercial/networks` },
  openGraph: pageOpenGraph({
    url:         `${SITE_URL}/commercial/networks`,
    description: 'Business networks monitored, patched on a schedule and segmented — guest, IoT and point-of-sale traffic kept apart, with documented failover and a response commitment agreed for your site. Hobart, Tasmania.',
  }),
}


export default function NetworksPage() {
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

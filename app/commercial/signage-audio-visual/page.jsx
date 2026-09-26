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
  title:       'Digital Signage & Audio Visual Tasmania',
  description: 'Digital signage, video walls and content scheduling, zoned audio and paging, and the acoustics behind clear speech — designed as one system for retail, hospitality, education, healthcare and function venues. Hobart, Tasmania.',
  keywords: [
    'digital signage Tasmania',
    'digital signage installation Hobart',
    'video wall installation Hobart',
    'commercial audio paging Hobart',
    'commercial AV installation Hobart',
    'business AV integrator Tasmania',
  ],
  alternates: { canonical: `${SITE_URL}/commercial/signage-audio-visual` },
  openGraph: pageOpenGraph({
    url:         `${SITE_URL}/commercial/signage-audio-visual`,
    description: 'Digital signage, video walls and content scheduling, zoned audio and paging, and the acoustics behind clear speech — designed as one system for retail, hospitality, education, healthcare and function venues. Hobart, Tasmania.',
  }),
}


export default function SignageAudioVisualPage() {
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

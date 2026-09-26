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
  title:       'Multi-room Audio, TVs & Outdoor AV Tasmania',
  description: 'Residential audio visual design and installation — multi-room audio, living-area displays, outdoor sound and screens, streaming sources, all on one control surface. Hobart and all of Tasmania.',
  keywords: [
    'multi-room audio Hobart',
    'whole home audio Tasmania',
    'outdoor speakers Hobart',
    'TV installation Hobart',
    'in-ceiling speakers Hobart',
    'home audio visual installer Tasmania',
  ],
  alternates: { canonical: `${SITE_URL}/residential/audio-visual` },
  openGraph: pageOpenGraph({
    url:         `${SITE_URL}/residential/audio-visual`,
    description: 'Residential audio visual design and installation — multi-room audio, living-area displays, outdoor sound and screens, streaming sources, all on one control surface. Hobart and all of Tasmania.',
  }),
}


export default function ResidentialAudioVisualPage() {
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

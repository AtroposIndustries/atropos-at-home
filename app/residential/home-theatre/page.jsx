import { Nav }         from '@/components/layout/Nav'
import { Footer }      from '@/components/layout/Footer'
import { PageHeader }  from '@/components/sections/PageHeader'
import { Intro, FeatureList } from '@/components/sections/ServiceBody'
import { ContactForm } from '@/components/sections/ContactForm'

import { NAV, FOOTER } from '../../content'
import { HERO, INTRO, STEPS, FEATURES, CTA } from './content'
import { SITE_URL }   from '@/lib/site'
import { pageOpenGraph } from '@/lib/seo'

export const metadata = {
  title:       'Home Theatre, Media Rooms & Acoustic Treatment Tasmania',
  description: 'Home theatre design and installation — dedicated cinemas, media rooms and living spaces, Dolby Atmos surround sound, projection and displays, acoustic treatment, one-touch control and professional calibration. Hobart and all of Tasmania.',
  keywords: [
    'home theatre Hobart',
    'home cinema installer Tasmania',
    'media room installation Hobart',
    'Dolby Atmos installation Tasmania',
    'home theatre design Hobart',
    'acoustic treatment Tasmania',
  ],
  alternates: { canonical: `${SITE_URL}/residential/home-theatre` },
  openGraph: pageOpenGraph({
    url:         `${SITE_URL}/residential/home-theatre`,
    description: 'Home theatre design and installation — dedicated cinemas, media rooms and living spaces, Dolby Atmos surround sound, projection and displays, acoustic treatment, one-touch control and professional calibration. Hobart and all of Tasmania.',
  }),
}


export default function HomeTheatrePage() {
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
        <Intro title={INTRO.title} body={INTRO.body} steps={STEPS} />
        <FeatureList items={FEATURES} backLink={CTA.backLink} />
        <ContactForm title={CTA.title} intro={CTA.body} />
      </main>

      <Footer tagline={FOOTER.tagline} columns={FOOTER.columns} copyright={FOOTER.copyright} />
    </>
  )
}

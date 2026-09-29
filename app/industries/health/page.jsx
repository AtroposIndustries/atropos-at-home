import { Nav }          from '@/components/layout/Nav'
import { Footer }       from '@/components/layout/Footer'
import { PageHeader }   from '@/components/sections/PageHeader'
import { IndustryBody } from '@/components/sections/IndustryBody'
import { ContactForm }  from '@/components/sections/ContactForm'

import { NAV, FOOTER } from '../../content'
import { HERO, SERVICES, STEPS, CASE_STUDY, CTA } from './content'
import { SITE_URL }     from '@/lib/site'
import { pageOpenGraph } from '@/lib/seo'

export const metadata = {
  title:       'Networks, IT Support & AV for Tasmanian Clinics and Aged Care',
  description: 'Dependable networks and Wi-Fi, managed IT, waiting-room screens and telehealth rooms for Tasmanian GP, dental and allied health clinics and aged care homes.',
  keywords: [
    'medical clinic IT support Hobart',
    'clinic Wi-Fi Tasmania',
    'aged care Wi-Fi Tasmania',
    'waiting room screens Hobart',
    'telehealth room setup Tasmania',
    'dental practice IT Hobart',
  ],
  alternates: { canonical: `${SITE_URL}/industries/health` },
  openGraph: pageOpenGraph({
    url:         `${SITE_URL}/industries/health`,
    description: 'Dependable networks and Wi-Fi, managed IT, waiting-room screens and telehealth rooms for Tasmanian GP, dental and allied health clinics and aged care homes.',
  }),
}

export default function HealthPage() {
  return (
    <>
      <Nav links={NAV.links} ctaLabel={NAV.ctaLabel} ctaHref={NAV.ctaHref} />

      <main id="main">
        <PageHeader
          crumbs={[{ label: 'Industries', href: '/industries' }]}
          title={HERO.title}
          body={HERO.body}
          cta={CTA.primaryCta}
          image={HERO.image}
        />

        <IndustryBody services={SERVICES} steps={STEPS} backLink={CTA.backLink} caseStudy={CASE_STUDY} />

        <div className="section--tint">
          <ContactForm title={CTA.title} intro={CTA.body} />
        </div>
      </main>

      <Footer tagline={FOOTER.tagline} columns={FOOTER.columns} copyright={FOOTER.copyright} />
    </>
  )
}

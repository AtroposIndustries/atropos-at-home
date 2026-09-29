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
  title:       'Classroom AV, Wi-Fi & IT Support for Tasmanian Schools',
  description: 'Classroom displays, hall sound, campus Wi-Fi and managed IT for Tasmanian independent schools and training providers. Hobart-based, statewide.',
  keywords: [
    'classroom AV Tasmania',
    'school Wi-Fi Hobart',
    'school IT support Tasmania',
    'hall sound system Hobart',
    'interactive displays schools Tasmania',
    'training room AV Hobart',
  ],
  alternates: { canonical: `${SITE_URL}/industries/education` },
  openGraph: pageOpenGraph({
    url:         `${SITE_URL}/industries/education`,
    description: 'Classroom displays, hall sound, campus Wi-Fi and managed IT for Tasmanian independent schools and training providers. Hobart-based, statewide.',
  }),
}

export default function EducationPage() {
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

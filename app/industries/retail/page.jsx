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
  title:       'Digital Signage, Music & Networks for Tasmanian Retailers',
  description: 'In-store screens and signage, zoned background music, and EFTPOS networks that stay up, for Tasmanian shops, showrooms and multi-site retailers.',
  keywords: [
    'retail digital signage Hobart',
    'shop background music Tasmania',
    'EFTPOS network Hobart',
    'in-store screens Tasmania',
    'retail IT support Hobart',
    'window display screens Hobart',
  ],
  alternates: { canonical: `${SITE_URL}/industries/retail` },
  openGraph: pageOpenGraph({
    url:         `${SITE_URL}/industries/retail`,
    description: 'In-store screens and signage, zoned background music, and EFTPOS networks that stay up, for Tasmanian shops, showrooms and multi-site retailers.',
  }),
}

export default function RetailPage() {
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

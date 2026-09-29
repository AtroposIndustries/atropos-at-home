import { Nav }         from '@/components/layout/Nav'
import { Footer }      from '@/components/layout/Footer'
import { PageHeader }  from '@/components/sections/PageHeader'
import { LinkList }    from '@/components/sections/LinkList'
import { ContactForm } from '@/components/sections/ContactForm'

import { NAV, FOOTER } from '../content'
import { HERO, INDUSTRIES, OTHER, CTA } from './content'
import { SITE_URL }     from '@/lib/site'
import { pageOpenGraph } from '@/lib/seo'

export const metadata = {
  title:       'Industries — AV, Networks & IT for Tasmanian Businesses',
  description: 'Audio visual, digital signage, networks and IT support for Tasmanian hospitality venues, offices, clinics and aged care, retail and schools. Hobart-based, statewide.',
  keywords: [
    'hospitality AV Tasmania',
    'business Wi-Fi Hobart',
    'digital signage Tasmania',
    'meeting room AV Hobart',
    'IT support Tasmania',
  ],
  alternates: { canonical: `${SITE_URL}/industries` },
  openGraph: pageOpenGraph({
    url:         `${SITE_URL}/industries`,
    description: 'Audio visual, digital signage, networks and IT support for Tasmanian hospitality venues, offices, clinics and aged care, retail and schools. Hobart-based, statewide.',
  }),
}

export default function IndustriesPage() {
  return (
    <>
      <Nav links={NAV.links} ctaLabel={NAV.ctaLabel} ctaHref={NAV.ctaHref} />

      <main id="main">
        <PageHeader title={HERO.title} body={HERO.body} cta={CTA.primaryCta} />

        <section className="wrap section-tail">
          <LinkList items={INDUSTRIES.map((i) => ({ label: i.name, desc: i.desc, href: i.href }))} />
        </section>

        <section className="wrap section-tail">
          <div className="aside-note">
            <h2 className="h3">{OTHER.title}</h2>
            <p className="lead">{OTHER.body}</p>
          </div>
        </section>

        <div className="section--tint">
          <ContactForm title={CTA.title} intro={CTA.body} />
        </div>
      </main>

      <Footer tagline={FOOTER.tagline} columns={FOOTER.columns} copyright={FOOTER.copyright} />
    </>
  )
}

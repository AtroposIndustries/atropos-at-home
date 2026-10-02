import { Nav }         from '@/components/layout/Nav'
import { Footer }      from '@/components/layout/Footer'
import { PageHeader }  from '@/components/sections/PageHeader'
import { LinkList }    from '@/components/sections/LinkList'
import { ContactForm } from '@/components/sections/ContactForm'

import { NAV, FOOTER } from '../content'
import { HERO, INTRO, SERVICES, CTA } from './content'
import { SITE_URL }     from '@/lib/site'
import { pageOpenGraph } from '@/lib/seo'

export const metadata = {
  title:       'Residential Smart Home, AV & Automation Tasmania',
  description: 'Smart home automation, home theatre with whole-home audio and acoustic treatment, and home networking and Wi-Fi for homeowners, builders and architects across Tasmania. Hobart-based.',
  keywords: [
    'smart home installer Hobart',
    'home automation Tasmania',
    'home theatre installer Hobart',
    'whole home audio Tasmania',
    'acoustic treatment Tasmania',
    'home wifi installation Tasmania',
  ],
  alternates: { canonical: `${SITE_URL}/residential` },
  openGraph: pageOpenGraph({
    url:         `${SITE_URL}/residential`,
    description: 'Smart home automation, home theatre with whole-home audio and acoustic treatment, and home networking and Wi-Fi for homeowners, builders and architects across Tasmania. Hobart-based.',
  }),
}

export default function ResidentialPage() {
  return (
    <>
      <Nav links={NAV.links} ctaLabel={NAV.ctaLabel} ctaHref={NAV.ctaHref} />

      <main id="main">
        <PageHeader title={HERO.title} body={HERO.body} cta={CTA.primaryCta} image={HERO.image} />

        <section className="section" id="services">
          <div className="wrap">
            <div className="section-head">
              <h2 className="h2">{INTRO.title}</h2>
              <a href={CTA.otherLink.href} className="text-link">{CTA.otherLink.label}</a>
            </div>
            <LinkList items={SERVICES.map((s) => ({ label: s.name, desc: s.desc, href: s.href }))} />
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

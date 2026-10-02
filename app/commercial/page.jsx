import { Nav }         from '@/components/layout/Nav'
import { Footer }      from '@/components/layout/Footer'
import { PageHeader }  from '@/components/sections/PageHeader'
import { LinkList }    from '@/components/sections/LinkList'
import { ContactForm } from '@/components/sections/ContactForm'

import { NAV, FOOTER } from '../content'
import { HERO, INTRO, SERVICES, INDUSTRIES_LINK, CTA } from './content'
import { SITE_URL }     from '@/lib/site'
import { pageOpenGraph } from '@/lib/seo'

export const metadata = {
  title:       'Commercial AV, Automation & Managed Services Tasmania',
  description: 'Audio visual, automation and smart lighting, networking and Wi-Fi, and managed services for Tasmanian businesses. Hobart-based.',
  keywords: [
    'commercial AV integrator Hobart',
    'business automation Tasmania',
    'managed network provider Tasmania',
    'commercial managed services Hobart',
  ],
  alternates: { canonical: `${SITE_URL}/commercial` },
  openGraph: pageOpenGraph({
    url:         `${SITE_URL}/commercial`,
    description: 'Audio visual, automation and smart lighting, networking and Wi-Fi, and managed services for Tasmanian businesses. Hobart-based.',
  }),
}

export default function CommercialPage() {
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
            <p className="section-foot"><a href={INDUSTRIES_LINK.href} className="text-link">{INDUSTRIES_LINK.label}</a></p>
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

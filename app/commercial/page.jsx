import { Nav }           from '@/components/layout/Nav'
import { Footer }        from '@/components/layout/Footer'
import { PageHero }      from '@/components/sections/PageHero'
import { ServiceCards }  from '@/components/sections/ServiceCards'
import { CtaBand }       from '@/components/sections/Cta'
import { ContactForm }   from '@/components/sections/ContactForm'

import { NAV, CONTACT_SERVICES, FOOTER } from '../content'
import { HERO, INTRO, SERVICES, CTA }    from './content'
import { SITE_URL }      from '@/lib/site'
import { pageOpenGraph } from '@/lib/seo'

export const metadata = {
  title:       'Commercial AV, Automation & Managed Services Tasmania',
  description: 'Audio visual, automation and smart lighting, networking and Wi-Fi, and managed services for Tasmanian businesses. Accredited across every major control platform. Hobart-based.',
  keywords: [
    'commercial AV integrator Hobart',
    'business automation Tasmania',
    'managed network provider Tasmania',
    'commercial managed services Hobart',
  ],
  alternates: { canonical: `${SITE_URL}/commercial` },
  openGraph: pageOpenGraph({
    url:         `${SITE_URL}/commercial`,
    description: 'Audio visual, automation and smart lighting, networking and Wi-Fi, and managed services for Tasmanian businesses. Accredited across every major control platform. Hobart-based.',
  }),
}

export default function CommercialPage() {
  return (
    <>
      <Nav
        brand="home"
        logo="/img/atropos-hero-ash.svg"
        links={NAV.links}
        ctaLabel={NAV.ctaLabel}
        ctaHref={NAV.ctaHref}
      />

      <PageHero title={HERO.title} body={HERO.body} />

      <ServiceCards
        label={INTRO.label}
        title={INTRO.title}
        services={SERVICES}
      />

      <CtaBand
        title={<>Ready for infrastructure<br />you can <em>rely on?</em></>}
        body="Tell us about your business and your site. We'll scope the right system."
        primaryCta={CTA.primaryCta}
        ghostCta={CTA.ghostCta}
      />

      <ContactForm
        label="Get in touch"
        title={<>Tell us about<br /><em>your business.</em></>}
        services={CONTACT_SERVICES}
      />

      <Footer
        brand="home"
        logo="/img/atropos-hero-ash.svg"
        tagline={FOOTER.tagline}
        location={FOOTER.location}
        columns={FOOTER.columns}
        copyright={FOOTER.copyright}
      />
    </>
  )
}

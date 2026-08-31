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
  title:       'Commercial AV, Control & Managed Networks Tasmania',
  description: 'Building and room control, conference room AV, distributed audio and paging, managed networks, structured cabling, security, signage and managed support for Tasmanian businesses. Accredited across every major control platform. Hobart-based.',
  keywords: [
    'commercial AV integrator Hobart',
    'managed network provider Tasmania',
    'office automation Hobart',
    'conference room AV Tasmania',
    'structured cabling Hobart',
    'commercial security integrator Tasmania',
  ],
  alternates: { canonical: `${SITE_URL}/commercial` },
  openGraph: pageOpenGraph({
    url:         `${SITE_URL}/commercial`,
    description: 'Building and room control, conference room AV, distributed audio and paging, managed networks, structured cabling, security, signage and managed support for Tasmanian businesses. Accredited across every major control platform. Hobart-based.',
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
        body="Tell us about your business and your site. We will scope the right system."
        primaryCta={CTA.primaryCta}
        ghostCta={CTA.ghostCta}
      />

      <ContactForm
        label="Book a Consultation"
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

import { Nav }          from '@/components/layout/Nav'
import { Footer }       from '@/components/layout/Footer'
import { PageHero }     from '@/components/sections/PageHero'
import { ServiceCards } from '@/components/sections/ServiceCards'
import { CtaBand }      from '@/components/sections/Cta'
import { ContactForm }  from '@/components/sections/ContactForm'

import { NAV, CONTACT_SERVICES, FOOTER } from '../content'
import { HERO, INTRO, SERVICES, CTA }    from './content'
import { SITE_URL }     from '@/lib/site'
import { pageOpenGraph } from '@/lib/seo'

export const metadata = {
  title:       'Residential Smart Home, AV & Automation Tasmania',
  description: 'Smart home automation, home theatre, whole-home audio, networking, acoustic treatment and ongoing support for homeowners, builders and architects across Tasmania. Accredited across every major control platform. Hobart-based.',
  keywords: [
    'smart home installer Hobart',
    'home automation Tasmania',
    'residential AV integrator',
    'home theatre installer Hobart',
    'whole home audio Tasmania',
    'smart home company Hobart',
  ],
  alternates: { canonical: `${SITE_URL}/residential` },
  openGraph: pageOpenGraph({
    url:         `${SITE_URL}/residential`,
    description: 'Smart home automation, home theatre, whole-home audio, networking, acoustic treatment and ongoing support for homeowners, builders and architects across Tasmania. Accredited across every major control platform. Hobart-based.',
  }),
}

export default function ResidentialPage() {
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
        title={<>Ready for a home<br />built <em>around you?</em></>}
        body="Tell us about your home and how you want to live in it. We will design the rest."
        primaryCta={CTA.primaryCta}
        ghostCta={CTA.ghostCta}
      />

      <ContactForm
        label="Book a Consultation"
        title={<>Tell us about<br /><em>your home.</em></>}
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

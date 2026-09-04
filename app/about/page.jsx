export const metadata = {
  title:       'About Atropos | Hobart, Tasmania',
  description: 'Atropos believes the finest technology should be felt, not seen. Integrated technology design and installation for homes and businesses across Tasmania.',
  keywords: [
    'Atropos Hobart',
    'AV integration company Tasmania',
    'residential & commercial AV specialists Hobart',
  ],
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: pageOpenGraph({
    url:         `${SITE_URL}/about`,
    description: 'Atropos believes the finest technology should be felt, not seen. Integrated technology design and installation for homes and businesses across Tasmania.',
  }),
}

import { Nav }          from '@/components/layout/Nav'
import { Footer }       from '@/components/layout/Footer'
import { PageHero }     from '@/components/sections/PageHero'
import { SectionIntro } from '@/components/sections/PageSections'
import { AboutSplit }   from '@/components/sections/AboutSplit'
import { PullQuote }    from '@/components/sections/PageSections'
import { ContactForm }  from '@/components/sections/ContactForm'

import {
  NAV, CONTACT_SERVICES, FOOTER,
} from '../content'
import { SITE_URL }     from '@/lib/site'
import { pageOpenGraph } from '@/lib/seo'

export default function AboutPage() {
  return (
    <>
      <Nav
        brand="home"
        logo="/img/atropos-hero-ash.svg"
        links={NAV.links}
        ctaLabel={NAV.ctaLabel}
        ctaHref={NAV.ctaHref}
      />

      <PageHero
        title="About Us"
        body="We design and install the automation, AV and network systems built into Tasmanian homes and businesses."
        img="/img/hero-img.jpg"
      />

      <SectionIntro
        label="Our Story"
        title={<>Built on craft<br /><em>and conviction.</em></>}
        body="Atropos was built on the idea that engineering rigour and a real feel for how a space sounds shouldn't be separate disciplines. Bring them together and you get systems that work properly and feel right."
        labelVariant="label"
      />

      <section className="section-raised" id="who-we-are">
        <div className="section-intro" style={{ paddingBottom: 0 }}>
          <div className="section-label">Who We Are</div>
          <h2 className="section-title" style={{ marginTop: '16px' }}>
            Enthusiasts first.<br /><em>Professionals always.</em>
          </h2>
        </div>
        <div style={{
          padding: '48px var(--section-pad-h) 0',
          maxWidth: '860px',
          display: 'flex',
          flexDirection: 'column',
          gap: '28px',
        }}>
          <p style={{ fontSize: 'var(--text-md)', color: 'var(--text-secondary)', lineHeight: 1.9, fontWeight: 300, letterSpacing: '0.04em' }}>
            Twenty-five years across ICT, AV control system design and cloud infrastructure — high-availability systems where downtime gets measured in revenue, and AV control for rooms that can&apos;t afford to fall over.
          </p>
          <p style={{ fontSize: 'var(--text-md)', color: 'var(--text-secondary)', lineHeight: 1.9, fontWeight: 300, letterSpacing: '0.04em' }}>
            Engineering depth paired with real care for the craft. When an architect needs to know how a control system sits inside their design intent, when a builder asks what has to be in the walls before the plasterers arrive, or when a homeowner just wants something that works and never lets them down — we speak all three languages.
          </p>
        </div>
      </section>

      <AboutSplit
        label="Our Philosophy"
        labelVariant="label"
        quote={<>Technology that<br /><em>disappears.</em></>}
        body="The best system is the one you never have to think about. We design every installation around that principle — from the cabling behind the walls to the control interface in your hand. Invisible, reliable, and built to last."
        cta={{ label: 'Explore Our Services', href: '/#offerings' }}
        stats={[
          { num: 'TAS', label: 'Based & Proud' },
          { num: 'AV',  label: 'Design & Install' },
          { num: '25+', label: 'Years' },
        ]}
        imgMain="/img/tasmania-1.jpg"
        imgSecondary="/img/river.jpg"
      />

      <PullQuote
        quote="The best technology is invisible — felt, not seen."
        attribution="Atropos"
      />

      <ContactForm
        label="Book a Consultation"
        title={<>Tell us about<br /><em>your project.</em></>}
        intro="Whether you're mid-design, about to build, or ready to upgrade — we'd love to hear about your project."
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

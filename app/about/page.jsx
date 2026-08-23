export const metadata = {
  title:       'About Atropos at Home | Hobart, Tasmania',
  description: 'Atropos at Home was founded by Rafal Urban and Brock Pinnington — two Tasmanians who believe the finest technology should be felt, not seen. Smart home, premium AV, and acoustic design for discerning homeowners.',
  keywords: [
    'Atropos at Home Hobart',
    'smart home company Tasmania',
    'home AV specialists Hobart',
    'Rafal Urban Brock Pinnington',
  ],
  alternates: { canonical: 'https://atroposathome.com.au/about' },
  openGraph: {
    type:        'website',
    url:         'https://atroposathome.com.au/about',
    description: 'Atropos at Home was founded by Rafal Urban and Brock Pinnington — two Tasmanians who believe the finest technology should be felt, not seen. Smart home, premium AV, and acoustic design for discerning homeowners.',
  },
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

export default function AboutPage() {
  return (
    <>
      <Nav
        brand="home"
        logo="/img/atropos-at-home-ash.svg"
        links={NAV.links}
        ctaLabel={NAV.ctaLabel}
        ctaHref={NAV.ctaHref}
      />

      <PageHero
        title="About Us"
        body="Where technology meets the art of living well."
        img="/img/hero-img.jpg"
      />

      <SectionIntro
        label="Our Story"
        title={<>Built on craft<br /><em>and conviction.</em></>}
        body="Atropos at Home was founded by two mates who grew up loving both technology and music — and discovered that when you bring those worlds together thoughtfully, something extraordinary happens. We exist for the homeowner, builder, or architect who won't settle for ordinary: people who understand that the finest technology should disappear into the architecture, respond intuitively, and elevate every moment spent at home."
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
            Raf has spent years building and refining his own personal studio — experimenting with acoustic treatment, tweaking speaker placement, and tuning listening environments from the inside out. Brock&apos;s love of music and AV runs just as deep; an avid guitar player who has poured the same obsessive attention into his own home systems that he brings to every client project. For both of us, this isn&apos;t just a profession. It&apos;s how we actually live.
          </p>
          <p style={{ fontSize: 'var(--text-md)', color: 'var(--text-secondary)', lineHeight: 1.9, fontWeight: 300, letterSpacing: '0.04em' }}>
            Between us, we carry more than two decades of hands-on experience across ICT, AV control system design, and cloud infrastructure. Raf has engineered high-availability solutions at the scale of AWS, Stan, and Betfair — bringing a precision that borders on the intuitive to every system he designs. Brock has spent over a decade designing and programming AV control systems for environments where reliability isn&apos;t optional. We know these systems intimately: not just how to install them, but how they behave over years of real-world use.
          </p>
          <p style={{ fontSize: 'var(--text-md)', color: 'var(--text-secondary)', lineHeight: 1.9, fontWeight: 300, letterSpacing: '0.04em' }}>
            That combination — genuine personal investment in the craft, paired with professional-grade technical depth — is what sets us apart. When an architect needs to know how a control system integrates with their design intent, when a builder asks what infrastructure needs to go in the walls before the plasterers arrive, or when a homeowner simply wants a system that responds intuitively and never lets them down, we speak every one of those languages. We exist to give discerning homeowners, architects, and builders a rock-solid technical partner who cares about the outcome as much as they do.
          </p>
        </div>
      </section>

      <AboutSplit
        label="Our Philosophy"
        labelVariant="label"
        quote={<>Technology that<br /><em>disappears.</em></>}
        body="The best system in a home is the one you never have to think about. We design every installation around that principle — from the cabling behind the walls to the control interface in your hand. Invisible, reliable, and built to last."
        cta={{ label: 'Explore Our Services', href: '/#offerings' }}
        stats={[
          { num: 'TAS', label: 'Based & Proud' },
          { num: 'AV',  label: 'Design & Install' },
          { num: '20+', label: 'Years Combined' },
        ]}
        imgMain="/img/tasmania-1.jpg"
        imgSecondary="/img/river.jpg"
      />

      <PullQuote
        quote="The best technology is invisible — felt, not seen."
        attribution="Atropos at Home"
      />

      <ContactForm
        label="Book a Consultation"
        title={<>Tell us about<br /><em>your home.</em></>}
        intro="Whether you're mid-design, about to build, or ready to upgrade — we'd love to hear about your project."
        services={CONTACT_SERVICES}
      />

      <Footer
        brand="home"
        logo="/img/atropos-at-home-ash.svg"
        tagline={FOOTER.tagline}
        location={FOOTER.location}
        columns={FOOTER.columns}
        copyright={FOOTER.copyright}
      />
    </>
  )
}

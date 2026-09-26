import { Nav }         from '@/components/layout/Nav'
import { Footer }      from '@/components/layout/Footer'
import { PageHeader }  from '@/components/sections/PageHeader'
import { ContactForm } from '@/components/sections/ContactForm'

import { NAV, FOOTER } from '../content'
import { SITE_URL }     from '@/lib/site'
import { pageOpenGraph } from '@/lib/seo'

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

export default function AboutPage() {
  return (
    <>
      <Nav links={NAV.links} ctaLabel={NAV.ctaLabel} ctaHref={NAV.ctaHref} />

      <main id="main">
        <PageHeader
          title="About Us"
          body="We design and install the automation, AV and network systems built into Tasmanian homes and businesses."
          cta={{ label: 'Get in touch', href: '#contact' }}
        />

        {/* Illustrative, not an Atropos job's drawings. */}
        <figure className="wrap figure page-header__figure">
          <img src="/img/plans.webp" alt="Floor plans on a timber desk, marked up with speaker, data and lighting positions" width="1536" height="1024" />
        </figure>

        <section className="section">
          <div className="wrap grid prose-block">
            <h2 className="h2">Built on craft and conviction.</h2>
            <div className="prose-block__body">
              <p className="pull">
                Atropos was built on the idea that engineering rigour and a real feel for how a space sounds shouldn&apos;t be separate disciplines. Bring them together and you get systems that work properly and feel right.
              </p>
            </div>
          </div>
        </section>

        <section className="section section--tint" id="who-we-are">
          <div className="wrap grid prose-block">
            <h2 className="h2">Enthusiasts first. Professionals always.</h2>
            <div className="prose-block__body">
              <p>
                Twenty-five years across ICT, AV control system design and cloud infrastructure — high-availability systems where downtime gets measured in revenue, and AV control for rooms that can&apos;t afford to fall over.
              </p>
              <p>
                Engineering depth paired with real care for the craft. When an architect needs to know how a control system sits inside their design intent, when a builder asks what has to be in the walls before the plasterers arrive, or when a homeowner just wants something that works and never lets them down — we speak all three languages.
              </p>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="wrap grid about">
            <img src="/img/river.jpg" alt="Water running over rocks in a forest creek" width="1620" height="1080" loading="lazy" />
            <div className="about__text">
              <h2 className="h2">Technology that disappears.</h2>
              <p className="lead">
                The best system is the one you never have to think about. We design every installation around that principle — from the cabling behind the walls to the control interface in your hand. Invisible, reliable, and built to last.
              </p>
              <a href="/#offerings" className="text-link">Explore our services</a>
            </div>
          </div>
        </section>

        <div className="section--tint">
          <ContactForm
            title="Tell us about your project."
            intro="Whether you're mid-design, about to build, or ready to upgrade — we'd love to hear about your project."
          />
        </div>
      </main>

      <Footer tagline={FOOTER.tagline} columns={FOOTER.columns} copyright={FOOTER.copyright} />
    </>
  )
}

import { Nav }         from '@/components/layout/Nav'
import { Footer }      from '@/components/layout/Footer'
import { PageHero }    from '@/components/sections/PageHero'
import { CtaBand }     from '@/components/sections/Cta'
import { ContactForm } from '@/components/sections/ContactForm'

import { NAV, CONTACT_SERVICES, FOOTER } from '../../content'
import { HERO, INTRO, FEATURES, CTA } from './content'
import { SITE_URL }   from '@/lib/site'
import { pageOpenGraph } from '@/lib/seo'

export const metadata = {
  title:       'Commercial Managed Services & IT/AV Support Tasmania',
  description: 'A contracted support relationship — remote monitoring, scheduled preventative maintenance, an asset register with lifecycle planning, and a written response commitment agreed before anything breaks. Hobart, Tasmania.',
  keywords: [
    'managed services Hobart',
    'commercial AV support Tasmania',
    'preventative maintenance AV',
    'IT asset lifecycle management',
    'managed support agreement Hobart',
    'commercial support contract Tasmania',
  ],
  alternates: { canonical: `${SITE_URL}/commercial/support` },
  openGraph: pageOpenGraph({
    url:         `${SITE_URL}/commercial/support`,
    description: 'A contracted support relationship — remote monitoring, scheduled preventative maintenance, an asset register with lifecycle planning, and a written response commitment agreed before anything breaks. Hobart, Tasmania.',
  }),
}


export default function SupportPage() {
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

      <section className="section-dark" id="services">
        <div style={{ padding: '0 var(--section-pad-h)', maxWidth: '860px', marginBottom: '52px' }}>
          <div className="section-label" style={{ marginBottom: '24px' }}>{INTRO.label}</div>
          <h2 className="section-title">{INTRO.title}</h2>
          <p style={{
            fontSize: 'var(--text-md)',
            color: 'var(--text-secondary)',
            lineHeight: 1.9,
            maxWidth: '680px',
            marginTop: '24px',
            fontWeight: 300,
            letterSpacing: '0.04em',
          }}>
            {INTRO.body}
          </p>
        </div>
        <div className="threads-services-grid">
          {FEATURES.map((f) => (
            <div key={f.number} className="threads-service-item">
              <span className="threads-service-number">{f.number}</span>
              <h3 className="threads-service-title">{f.title}</h3>
              <p className="threads-service-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <CtaBand
        title={<>Ready for support<br />built as a <em>contract?</em></>}
        body="Tell us about your site and what's already installed. We'll scope the agreement."
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

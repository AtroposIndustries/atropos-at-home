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
  title:       'Commercial Audio, Paging & Background Music Tasmania',
  description: 'Zoned background music and all-call paging with emergency override into your fire alarm system, licensed correctly for a commercial premises rather than a household. Hobart, Tasmania.',
  keywords: [
    'commercial paging system Hobart',
    'background music licensing Tasmania',
    'zoned audio commercial Hobart',
    'PA system installer Tasmania',
    'emergency paging override',
    'commercial audio Hobart',
  ],
  alternates: { canonical: `${SITE_URL}/commercial/audio` },
  openGraph: pageOpenGraph({
    url:         `${SITE_URL}/commercial/audio`,
    description: 'Zoned background music and all-call paging with emergency override into your fire alarm system, licensed correctly for a commercial premises rather than a household. Hobart, Tasmania.',
  }),
}


export default function AudioPage() {
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
        title={<>Ready for audio your<br />business can <em>rely on?</em></>}
        body="Tell us about your site and how paging needs to interact with music. We'll design the zoning."
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

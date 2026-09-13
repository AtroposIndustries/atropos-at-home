import { Nav }         from '@/components/layout/Nav'
import { Footer }      from '@/components/layout/Footer'
import { PageHero }    from '@/components/sections/PageHero'
import { CtaBand }     from '@/components/sections/Cta'
import { ContactForm } from '@/components/sections/ContactForm'

import { NAV, FOOTER } from '../../content'
import { HERO, INTRO, FEATURES, CTA } from './content'
import { SITE_URL }   from '@/lib/site'
import { pageOpenGraph } from '@/lib/seo'

export const metadata = {
  title:       'Commercial Audio Visual Tasmania',
  description: 'Meeting room AV, zoned audio and paging, digital signage and the acoustics behind clear speech — designed as one system for offices, hospitality, retail, education and healthcare. Hobart, Tasmania.',
  keywords: [
    'commercial AV installation Hobart',
    'meeting room AV Tasmania',
    'conference room technology Hobart',
    'digital signage Tasmania',
    'commercial audio paging Hobart',
    'business AV integrator Tasmania',
  ],
  alternates: { canonical: `${SITE_URL}/commercial/audio-visual` },
  openGraph: pageOpenGraph({
    url:         `${SITE_URL}/commercial/audio-visual`,
    description: 'Meeting room AV, zoned audio and paging, digital signage and the acoustics behind clear speech — designed as one system for offices, hospitality, retail, education and healthcare. Hobart, Tasmania.',
  }),
}


export default function AudioVisualPage() {
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
        title={<>Ready for AV that just works<br />when someone hits <em>join?</em></>}
        body="Tell us about your space and how it's used. We'll scope the system."
        primaryCta={CTA.primaryCta}
        ghostCta={CTA.ghostCta}
      />


      <ContactForm
        label="Get in touch"
        title={<>Tell us about<br /><em>your business.</em></>}
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

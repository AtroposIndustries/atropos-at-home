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
  title:       'Home Theatre, Media Rooms & Acoustic Treatment Tasmania',
  description: 'Home theatre design and installation — dedicated cinemas, media rooms and living spaces, Dolby Atmos surround sound, projection and displays, acoustic treatment, one-touch control and professional calibration. Hobart and all of Tasmania.',
  keywords: [
    'home theatre Hobart',
    'home cinema installer Tasmania',
    'media room installation Hobart',
    'Dolby Atmos installation Tasmania',
    'home theatre design Hobart',
    'acoustic treatment Tasmania',
  ],
  alternates: { canonical: `${SITE_URL}/residential/home-theatre` },
  openGraph: pageOpenGraph({
    url:         `${SITE_URL}/residential/home-theatre`,
    description: 'Home theatre design and installation — dedicated cinemas, media rooms and living spaces, Dolby Atmos surround sound, projection and displays, acoustic treatment, one-touch control and professional calibration. Hobart and all of Tasmania.',
  }),
}


export default function HomeTheatrePage() {
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
        title={<>Start with the room.<br /><em>We&apos;ll design the rest.</em></>}
        body="Tell us about the space and what you want from it. We'll take it from there."
        primaryCta={CTA.primaryCta}
        ghostCta={CTA.ghostCta}
      />


      <ContactForm
        label="Get in touch"
        title={<>Tell us about<br /><em>your home.</em></>}
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

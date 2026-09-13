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
  title:       'Digital Signage & Audio Visual Tasmania',
  description: 'Digital signage, video walls and content scheduling, zoned audio and paging, and the acoustics behind clear speech — designed as one system for retail, hospitality, education, healthcare and function venues. Hobart, Tasmania.',
  keywords: [
    'digital signage Tasmania',
    'digital signage installation Hobart',
    'video wall installation Hobart',
    'commercial audio paging Hobart',
    'commercial AV installation Hobart',
    'business AV integrator Tasmania',
  ],
  alternates: { canonical: `${SITE_URL}/commercial/signage-audio-visual` },
  openGraph: pageOpenGraph({
    url:         `${SITE_URL}/commercial/signage-audio-visual`,
    description: 'Digital signage, video walls and content scheduling, zoned audio and paging, and the acoustics behind clear speech — designed as one system for retail, hospitality, education, healthcare and function venues. Hobart, Tasmania.',
  }),
}


export default function SignageAudioVisualPage() {
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
        title={<>Screens that stay current,<br />sound that <em>carries.</em></>}
        body="Tell us about your space and who'll be running it day to day. We'll scope the system."
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

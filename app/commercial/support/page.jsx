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
  title:       'Managed IT Services & IT Support Tasmania',
  description: 'Managed IT, ad hoc IT support and systems support for Tasmanian businesses — Microsoft 365 and Google Workspace licensing and admin, backups, device management, and the meeting rooms, network and control systems we installed kept running. Hobart, Launceston and statewide.',
  keywords: [
    'IT support Hobart',
    'managed IT services Tasmania',
    'IT support Launceston',
    'Microsoft 365 support Hobart',
    'small business IT support Tasmania',
    'outsourced IT Tasmania',
    'commercial AV support Tasmania',
  ],
  alternates: { canonical: `${SITE_URL}/commercial/support` },
  openGraph: pageOpenGraph({
    url:         `${SITE_URL}/commercial/support`,
    description: 'Managed IT, ad hoc IT support and systems support for Tasmanian businesses — Microsoft 365 and Google Workspace licensing and admin, backups, device management, and the meeting rooms, network and control systems we installed kept running. Hobart, Launceston and statewide.',
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
        title={<>One number for<br /><em>everything in the building.</em></>}
        body="Tell us what you run and what's giving you grief. We'll scope the agreement — or just send someone."
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

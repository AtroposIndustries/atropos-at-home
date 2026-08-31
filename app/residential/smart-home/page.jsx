import { Nav }         from '@/components/layout/Nav'
import { Footer }      from '@/components/layout/Footer'
import { PageHero }    from '@/components/sections/PageHero'
import { CtaBand }     from '@/components/sections/Cta'
import { FAQ }         from '@/components/sections/PageSections'
import { ContactForm } from '@/components/sections/ContactForm'

import { NAV, CONTACT_SERVICES, FOOTER } from '../../content'
import { HERO, INTRO, FEATURES, FAQ_ITEMS, CTA } from './content'
import { SITE_URL }   from '@/lib/site'

export const metadata = {
  title:       'Smart Home Automation Hobart & Tasmania',
  description: 'Whole-home automation — lighting, climate, security and AV behind one intuitive interface. Specialists across Control4, RTI and Crestron, plus custom mobile, tablet and web control.',
  keywords: [
    'smart home Hobart',
    'home automation Tasmania',
    'Control4 installer',
    'smart lighting system',
    'RTI installer Hobart',
    'Crestron Tasmania',
    'smart home installer Tasmania',
  ],
  alternates: { canonical: `${SITE_URL}/residential/smart-home` },
  openGraph: {
    type:        'website',
    url:         `${SITE_URL}/residential/smart-home`,
    description: 'Whole-home automation — lighting, climate, security and AV behind one intuitive interface. Specialists across Control4, RTI and Crestron, plus custom mobile, tablet and web control.',
  },
}

const schemaFaq = {
  '@context': 'https://schema.org',
  '@type':    'FAQPage',
  mainEntity: FAQ_ITEMS.map(({ question, answer }) => ({
    '@type':        'Question',
    name:           question,
    acceptedAnswer: { '@type': 'Answer', text: answer },
  })),
}

export default function SmartHomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFaq) }}
      />

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
        title={<>Ready to make your home <em>intelligent?</em></>}
        body="Begin with a conversation. We will design the right system for how you live."
        primaryCta={CTA.primaryCta}
        ghostCta={CTA.ghostCta}
      />

      <FAQ items={FAQ_ITEMS} />

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

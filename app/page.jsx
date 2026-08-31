import { Nav }             from '@/components/layout/Nav'
import { Footer }          from '@/components/layout/Footer'
import { HeroHome }        from '@/components/sections/HeroHome'
import { ExperienceStrip } from '@/components/sections/ExperienceStrip'
import { AboutHome }       from '@/components/sections/AboutHome'
import { CtaHome }         from '@/components/sections/Cta'
import { ContactForm }     from '@/components/sections/ContactForm'

import {
  NAV, HERO, EXPERIENCE_ITEMS, OFFERINGS,
  ABOUT,
  CTA, CONTACT_SERVICES, FOOTER,
} from './content'

export default function HomePage() {
  return (
    <>
      <Nav
        brand="home"
        logo="/img/atropos-hero-ash.svg"
        links={NAV.links}
        ctaLabel={NAV.ctaLabel}
        ctaHref={NAV.ctaHref}
      />

      <HeroHome
        eyebrow={HERO.eyebrow}
        titleMain={HERO.titleMain}
        titleSub={HERO.titleSub}
        body={HERO.body}
        primaryCta={HERO.primaryCta}
        ghostCta={HERO.ghostCta}
      />

      <ExperienceStrip items={EXPERIENCE_ITEMS} />

      <section className="section-dark" id="offerings">
        <div className="section-intro" style={{ paddingBottom: 0 }}>
          <div className="section-label">{OFFERINGS.eyebrow}</div>
          <h2 className="section-title-home" style={{ marginTop: '16px' }}>Technology that <em>disappears</em><br />into the home.</h2>
          <p style={{ fontSize: 'var(--text-md)', color: 'var(--text-secondary)', lineHeight: 1.9, maxWidth: '640px', marginTop: '20px', marginBottom: '48px', fontWeight: 300 }}>We believe the best technology is invisible — seamlessly woven into the architecture, responding intuitively, and elevating every moment spent at home.</p>
        </div>
        <div className="threads-list">
          {OFFERINGS.items.map((o) => (
            <a key={o.number} href={o.href} className="threads-row">
              <span className="threads-row-number">{o.number}</span>
              <div className="threads-row-name-wrap">
                <h3 className="threads-row-name">{o.name}</h3>
              </div>
              <p className="threads-row-desc">{o.desc}</p>
              <span className="threads-row-arrow">→</span>
            </a>
          ))}
        </div>
      </section>

      <AboutHome
        eyebrow={ABOUT.eyebrow}
        title={<>Tasmanian roots.<br /><em>Global standards.</em></>}
        body="We're two mates who grew up loving both technology and music — and found that when you bring those worlds together thoughtfully, something extraordinary happens. Atropos at Home exists for the homeowner, builder, or architect who won't settle for ordinary."
        cta={ABOUT.cta}
        location={ABOUT.location}
        imgMain="/img/tasmania-1.jpg"
      />

      <CtaHome
        title={<>Let&apos;s create something<br /><em>extraordinary.</em></>}
        body="Begin with a conversation. We'll handle the rest."
        primaryCta={CTA.primaryCta}
        ghostCta={CTA.ghostCta}
      />

      <ContactForm
        label="Book a Consultation"
        title={<>Tell us about<br /><em>your home.</em></>}
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

import { Nav }         from '@/components/layout/Nav'
import { Footer }      from '@/components/layout/Footer'
import { LinkList }    from '@/components/sections/LinkList'
import { ContactForm } from '@/components/sections/ContactForm'

import { NAV, HERO, OFFERINGS, ABOUT, BRANDS, CTA, FOOTER } from './content'

/** The nav's own service list, so the homepage lists cannot drift from it. */
const servicesFor = (href) =>
  NAV.links.find((l) => `${l.href}/` === href)?.children.map((c) => ({ label: c.label, href: c.href })) ?? []

export const metadata = {
  title:       'Smart Home & Commercial AV, Automation Tasmania',
  description:
    'Integrated technology for Tasmanian homes and businesses — smart home automation, home theatre and whole-home audio for residential, and building control, conference room AV and managed networks for commercial. Hobart-based, accredited across every major control platform.',
  keywords: [
    'smart home Hobart',
    'home automation Tasmania',
    'commercial AV integrator Hobart',
    'building automation Tasmania',
    'home theatre Hobart',
    'managed network provider Tasmania',
    'Crestron Tasmania',
    'Control4 Tasmania',
    'AV installer Tasmania',
  ],
}

export default function HomePage() {
  return (
    <>
      <Nav links={NAV.links} ctaLabel={NAV.ctaLabel} ctaHref={NAV.ctaHref} />

      <main id="main">
        <section className="wrap grid home-hero">
          <h1>{HERO.title}</h1>
          <div className="home-hero__side">
            <p>{HERO.sub}</p>
            <a href={HERO.primaryCta.href} className="btn">{HERO.primaryCta.label}</a>
          </div>
        </section>

        <figure className="wrap figure">
          <img src={HERO.image.src} alt={HERO.image.alt} width="1920" height="1080" />
          <figcaption>
            {HERO.caption.map((c) => <span key={c}>{c}</span>)}
          </figcaption>
        </figure>

        <section className="section" id="offerings">
          <div className="wrap offer">
            <div className="offer__intro">
              <h2 className="h2">{OFFERINGS.title}</h2>
              <p className="lead">{OFFERINGS.intro}</p>
            </div>
            <div className="split-2">
              {OFFERINGS.items.map((o) => (
                <div key={o.name} className="vertical">
                  <h3 className="h3">{o.name}</h3>
                  <p className="lead">{o.desc}</p>
                  <LinkList items={servicesFor(o.href)} />
                  <a href={o.href} className="text-link">{o.cta}</a>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="wrap grid about">
          <img src={ABOUT.image.src} alt={ABOUT.image.alt} width="1620" height="1080" loading="lazy" />
          <div className="about__text">
            <p className="label">{ABOUT.label}</p>
            <p className="pull">{ABOUT.body}</p>
            <p className="muted">{ABOUT.location}</p>
            <a href={ABOUT.cta.href} className="text-link">{ABOUT.cta.label}</a>
          </div>
        </section>

        <div className="wrap">
          <section className="brands">
            <p className="label">{BRANDS.label}</p>
            <p>{BRANDS.line}</p>
          </section>
        </div>

        <div className="section--tint">
          <ContactForm title={CTA.title} intro={CTA.body} />
        </div>
      </main>

      <Footer tagline={FOOTER.tagline} columns={FOOTER.columns} copyright={FOOTER.copyright} />
    </>
  )
}

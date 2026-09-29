import { Nav }         from '@/components/layout/Nav'
import { Footer }      from '@/components/layout/Footer'
import { PageHeader }  from '@/components/sections/PageHeader'
import { LinkList }    from '@/components/sections/LinkList'
import { CaseStudy }   from '@/components/sections/CaseStudy'
import { ContactForm } from '@/components/sections/ContactForm'

import { NAV, FOOTER } from '../../content'
import { HERO, SERVICES, STEPS, CASE_STUDY, CTA } from './content'
import { SITE_URL }     from '@/lib/site'
import { pageOpenGraph } from '@/lib/seo'

export const metadata = {
  title:       'AV, Wi-Fi & Signage for Hospitality Venues in Tasmania',
  description: 'Menu screens staff can update, music by zone, guest Wi-Fi kept apart from EFTPOS, and function rooms that work — for Tasmanian hotels, restaurants, bars, function venues and cellar doors.',
  keywords: [
    'hospitality AV Tasmania',
    'restaurant background music Hobart',
    'digital menu boards Hobart',
    'hotel Wi-Fi Tasmania',
    'function room AV Hobart',
    'cellar door audio Tasmania',
  ],
  alternates: { canonical: `${SITE_URL}/industries/hospitality` },
  openGraph: pageOpenGraph({
    url:         `${SITE_URL}/industries/hospitality`,
    description: 'Menu screens staff can update, music by zone, guest Wi-Fi kept apart from EFTPOS, and function rooms that work — for Tasmanian hotels, restaurants, bars, function venues and cellar doors.',
  }),
}

export default function HospitalityPage() {
  return (
    <>
      <Nav links={NAV.links} ctaLabel={NAV.ctaLabel} ctaHref={NAV.ctaHref} />

      <main id="main">
        <PageHeader
          crumbs={[{ label: 'Industries', href: '/industries' }]}
          title={HERO.title}
          body={HERO.body}
          cta={CTA.primaryCta}
          image={HERO.image}
        />

        <section className="section section--tint">
          <div className="wrap">
            <div className="section-head">
              <h2 className="h2">{SERVICES.title}</h2>
              <a href={CTA.backLink.href} className="text-link">{CTA.backLink.label}</a>
            </div>
            <LinkList items={SERVICES.items.map((s) => ({ label: s.name, desc: s.desc, href: s.href }))} />
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <h2 className="h2 section-head">{STEPS.title}</h2>
            <ol className="steps">
              {STEPS.items.map((s) => (
                <li key={s.title}>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <CaseStudy study={CASE_STUDY} />

        <div className="section--tint">
          <ContactForm title={CTA.title} intro={CTA.body} />
        </div>
      </main>

      <Footer tagline={FOOTER.tagline} columns={FOOTER.columns} copyright={FOOTER.copyright} />
    </>
  )
}

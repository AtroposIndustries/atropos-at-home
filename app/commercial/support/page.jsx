import { Nav }         from '@/components/layout/Nav'
import { Footer }      from '@/components/layout/Footer'
import { PageHeader }  from '@/components/sections/PageHeader'
import { Intro, FeatureList } from '@/components/sections/ServiceBody'
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
      <Nav links={NAV.links} ctaLabel={NAV.ctaLabel} ctaHref={NAV.ctaHref} />

      <main id="main">
        <PageHeader
          crumbs={[{ label: 'Commercial', href: '/commercial' }]}
          title={HERO.title}
          body={HERO.body}
          cta={CTA.primaryCta}
        />
        <Intro title={INTRO.title} body={INTRO.body} />
        <FeatureList items={FEATURES} backLink={CTA.backLink} />
        <ContactForm title={CTA.title} intro={CTA.body} />
      </main>

      <Footer tagline={FOOTER.tagline} columns={FOOTER.columns} copyright={FOOTER.copyright} />
    </>
  )
}

import { Nav }          from '@/components/layout/Nav'
import { Footer }       from '@/components/layout/Footer'
import { ReviewWizard } from '@/components/sections/ReviewWizard'
import { NAV, FOOTER } from '../content'
import { SITE_URL }   from '@/lib/site'

export const metadata = {
  title:       'Leave a Review',
  description: 'Share your experience with Atropos at Home. We\'ll help you put it into words.',
  alternates: {
    canonical: `${SITE_URL}/review`,
  },
  openGraph: {
    type:        'website',
    url:         `${SITE_URL}/review`,
    description: 'Share your experience with Atropos at Home. We\'ll help you put it into words.',
  },
}

// Baked in at build time by the deploy workflow — static export has no runtime env.
const GOOGLE_REVIEW_URL = process.env.NEXT_PUBLIC_GOOGLE_REVIEW_URL_HOME || '#'

export default function ReviewPage() {
  return (
    <>
      <Nav
        brand="home"
        logo="/img/atropos-hero-ash.svg"
        links={NAV.links}
        ctaLabel={NAV.ctaLabel}
        ctaHref={NAV.ctaHref}
      />

      <div style={{ paddingTop: '120px' }}>
        <div className="review-intro">
          <p className="review-intro-label">Share Your Experience</p>
          <h1 className="review-intro-title">Leave us a<br /><em>review.</em></h1>
          <p className="review-intro-body">
            Your feedback means the world to us. Tell us what you loved —
            we&apos;ll help you find the right words.
          </p>
        </div>

        <div className="review-wizard-wrap">
          <ReviewWizard googleReviewUrl={GOOGLE_REVIEW_URL} />
        </div>
      </div>

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

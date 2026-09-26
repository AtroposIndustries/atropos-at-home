import '@/styles/review.css'

import { Nav }          from '@/components/layout/Nav'
import { Footer }       from '@/components/layout/Footer'
import { ReviewWizard } from '@/components/sections/ReviewWizard'
import { NAV, FOOTER } from '../content'
import { SITE_URL }   from '@/lib/site'
import { pageOpenGraph } from '@/lib/seo'

export const metadata = {
  title:       'Leave a Review',
  description: 'Share your experience with Atropos. We\'ll help you put it into words.',
  alternates: {
    canonical: `${SITE_URL}/review`,
  },
  openGraph: pageOpenGraph({
    url:         `${SITE_URL}/review`,
    description: 'Share your experience with Atropos. We\'ll help you put it into words.',
  }),
}

// Baked in at build time by the deploy workflow — static export has no runtime env.
const GOOGLE_REVIEW_URL = process.env.NEXT_PUBLIC_GOOGLE_REVIEW_URL_HOME || '#'

export default function ReviewPage() {
  return (
    <>
      <Nav links={NAV.links} ctaLabel={NAV.ctaLabel} ctaHref="/#contact" />

      <main id="main" className="review-page">
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
      </main>

      <Footer tagline={FOOTER.tagline} columns={FOOTER.columns} copyright={FOOTER.copyright} />
    </>
  )
}

import { Nav }          from '@/components/layout/Nav'
import { Footer }       from '@/components/layout/Footer'
import { ReviewWizard } from '@/components/sections/ReviewWizard'
import { NAV, FOOTER } from '../content'

export const metadata = {
  title:       'Leave a Review',
  description: 'Share your experience with Atropos at Home. We\'ll help you put it into words.',
}

const GOOGLE_REVIEW_URL =
  process.env.NEXT_PUBLIC_GOOGLE_REVIEW_URL_HOME ||
  process.env.NEXT_PUBLIC_GOOGLE_REVIEW_URL ||
  '#'

export default function ReviewPage() {
  return (
    <>
      <Nav
        logo="/img/atropos-at-home-ash.svg"
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
        logo="/img/atropos-at-home-ash.svg"
        tagline={FOOTER.tagline}
        location={FOOTER.location}
        columns={FOOTER.columns}
        copyright={FOOTER.copyright}
        sisterLabel={FOOTER.sisterLabel}
        sisterName={FOOTER.sisterName}
        sisterHref={FOOTER.sisterHref}
      />
    </>
  )
}

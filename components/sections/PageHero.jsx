'use client'

import { useScrollReveal } from '../../hooks/useScrollReveal'

/**
 * PageHero — interior page hero (not full-viewport)
 *
 * Props:
 *   label      — eyebrow text (e.g. 'Solutions')
 *   title      — page title string
 *   body       — supporting paragraph
 *   breadcrumb — array of { label, href? } — last item is current page (no href)
 *   img        — optional background image URL
 */
export function PageHero({ title, body, img }) {
  const ref = useScrollReveal()

  return (
    <section className="page-hero" ref={ref}>
      {img && (
        <div className="page-hero-img" aria-hidden="true"
          style={{ backgroundImage: `url(${img})` }}
        />
      )}
      {/* Shared hero background treatments */}
      <div className="hero-bg"  aria-hidden="true" />
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-scan" aria-hidden="true" />

      <div className="page-hero-content">
        <h1 className="page-hero-title reveal">{title}</h1>

        {body && (
          <p className="page-hero-body reveal">{body}</p>
        )}
      </div>
    </section>
  )
}

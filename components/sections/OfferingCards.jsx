'use client'

import { useScrollReveal } from '../../hooks/useScrollReveal'
import { SectionLabel } from '../ui/SectionLabel'

/**
 * OfferingCards
 * At Home-style offering card grid with display serif typography.
 *
 * Props:
 *   eyebrow   — small label
 *   title     — JSX or string (supports <em> for italic)
 *   body      — intro paragraph
 *   offerings — array of { number, icon (JSX), name, desc, href }
 */
export function OfferingCards({ eyebrow, title, body, offerings = [] }) {
  const ref = useScrollReveal()

  return (
    <section className="offerings" id="offerings" ref={ref}>
      <div className="offerings-header reveal">
        <SectionLabel>{eyebrow}</SectionLabel>
        <h2 className="section-title-home">{title}</h2>
        {body && <p className="section-body-center">{body}</p>}
      </div>

      <div className="offerings-grid">
        {offerings.map((o) => (
          <div key={o.number} className="offering-card reveal">
            <div className="offering-num" aria-hidden="true">{o.number}</div>
            {o.icon && (
              <div className="offering-icon" aria-hidden="true">
                {o.icon}
              </div>
            )}
            <div className="offering-name">{o.name}</div>
            <p className="offering-desc">{o.desc}</p>
            {o.href && (
              <a href={o.href} className="offering-link">Explore ↗</a>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

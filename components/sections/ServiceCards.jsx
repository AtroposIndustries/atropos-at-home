'use client'

import { useScrollReveal } from '../../hooks/useScrollReveal'
import { SectionLabel } from '../ui/SectionLabel'

/**
 * ServiceCards
 * Technologies-style service card grid.
 *
 * Props:
 *   label    — eyebrow label
 *   title    — section heading
 *   services — array of { number, icon (JSX), name, desc, href }
 */
export function ServiceCards({ label, title, services = [] }) {
  const ref = useScrollReveal()

  return (
    <section className="services" id="services" ref={ref}>
      <div className="section-header reveal">
        <SectionLabel>{label}</SectionLabel>
        <h2 className="section-title">{title}</h2>
      </div>

      <div className="services-grid">
        {services.map((svc) => (
          <div key={svc.number} className="service-card reveal">
            {svc.img && (
              <div className="service-card-img">
                <img src={svc.img} alt="" aria-hidden="true" />
              </div>
            )}
            <div className="service-number">{svc.number}</div>
            {svc.icon && (
              <div className="service-icon" aria-hidden="true">
                {svc.icon}
              </div>
            )}
            <div className="service-name">{svc.name}</div>
            <p className="service-desc">{svc.desc}</p>
            {svc.href && (
              <a href={svc.href} className="service-link">Learn More</a>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

'use client'

import { useScrollReveal } from '../../hooks/useScrollReveal'
import { SectionLabel } from '../ui/SectionLabel'
import { Button } from '../ui/Button'

/**
 * PortfolioGrid
 *
 * Props:
 *   eyebrow  — label
 *   title    — heading JSX
 *   cta      — { label, href }
 *   items    — array of { slot ('p1'|'p2'|'p3'|'p4'), cat, title, imgSrc? }
 */
export function PortfolioGrid({ eyebrow, title, cta, items = [] }) {
  const ref = useScrollReveal()

  return (
    <section className="portfolio" id="portfolio" ref={ref}>
      <div className="portfolio-header reveal">
        <div>
          <SectionLabel>{eyebrow}</SectionLabel>
          <h2 className="section-title-home" style={{ marginTop: '16px' }}>
            {title}
          </h2>
        </div>
        {cta && (
          <Button variant="outline-warm" href={cta.href} style={{ color: 'var(--gold)' }}>
            {cta.label}
          </Button>
        )}
      </div>

      <div className="portfolio-grid">
        {items.map((item) => (
          <div key={item.slot} className={`portfolio-item ${item.slot}`}>
            {item.imgSrc && (
              <img
                src={item.imgSrc}
                alt={item.title}
                className="portfolio-item-bg"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            )}
            <div className="portfolio-item-overlay">
              <div className="portfolio-item-info">
                <div className="portfolio-item-cat">{item.cat}</div>
                <div className="portfolio-item-title">{item.title}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

'use client'

import { useScrollReveal } from '../../hooks/useScrollReveal'
import { SectionLabel } from '../ui/SectionLabel'
import { Button } from '../ui/Button'

/**
 * AboutTech
 *
 * Props:
 *   label   — eyebrow
 *   quote   — JSX headline (supports <em>)
 *   body    — paragraph
 *   cta     — { label, href }
 *   stats   — array of { num, label }
 */
export function AboutTech({ label, quote, body, cta, stats = [], imgMain, imgSecondary, labelVariant }) {
  const ref = useScrollReveal()

  return (
    <section className="about" id="about" ref={ref}>
      <div className="about-visual reveal" aria-hidden="true">
        <div className="about-img-main" style={imgMain ? { backgroundImage: `url(${imgMain})`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined}>
          <div className="about-label-float">
            {/* Moth SVG watermark */}
            <svg width="48" height="40" viewBox="0 0 60 50" fill="none" opacity="0.2">
              <path d="M30 25 C20 15 5 10 4 20 C3 30 15 35 30 25Z" fill="#dee0db"/>
              <path d="M30 25 C40 15 55 10 56 20 C57 30 45 35 30 25Z" fill="#dee0db"/>
              <path d="M30 25 C22 30 18 42 24 44 C28 46 30 38 30 25Z" fill="#b0b5bd"/>
              <path d="M30 25 C38 30 42 42 36 44 C32 46 30 38 30 25Z" fill="#b0b5bd"/>
            </svg>
          </div>
        </div>
        <div className="about-img-secondary" style={imgSecondary ? { backgroundImage: `url(${imgSecondary})`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined} />
      </div>

      <div className="about-text reveal">
        <SectionLabel variant={labelVariant} style={{ marginBottom: '28px' }}>{label}</SectionLabel>
        <h2 className="about-quote">{quote}</h2>
        <p className="about-body">{body}</p>
        {cta && (
          <Button variant="ghost" href={cta.href}>{cta.label}</Button>
        )}

        {stats.length > 0 && (
          <div className="about-stats">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="stat-num">{s.num}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

'use client'

import { useScrollReveal } from '../../hooks/useScrollReveal'
import { SectionLabel } from '../ui/SectionLabel'
import { Button } from '../ui/Button'

/**
 * AboutHome
 *
 * Props:
 *   eyebrow   — small label
 *   title     — JSX headline (supports <em>)
 *   body      — paragraph
 *   cta       — { label, href }
 *   location  — e.g. "Hobart, Tasmania"
 */
export function AboutHome({ eyebrow, title, body, cta, location, imgMain }) {
  const ref = useScrollReveal()

  return (
    <section className="about-home" id="about" ref={ref}>
      <div className="about-home-text reveal">
        <SectionLabel
          variant="label"
          style={{ justifyContent: 'flex-start', marginBottom: '20px' }}
        >
          {eyebrow}
        </SectionLabel>
        <h2 className="about-home-title">{title}</h2>
        <p className="about-home-body">{body}</p>
        {cta && (
          <Button variant="warm" href={cta.href}>{cta.label}</Button>
        )}
      </div>

      <div className="about-home-visual reveal">
        <div
          className="home-visual-main"
          style={imgMain ? { backgroundImage: `url(${imgMain})`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined}
        />
        {location && (
          <div className="home-visual-tag">
            <div className="home-visual-tag-label">Based In</div>
            <div className="home-visual-tag-val">{location}</div>
          </div>
        )}
      </div>
    </section>
  )
}

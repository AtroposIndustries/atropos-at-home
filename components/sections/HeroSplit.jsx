'use client'

import { useEffect, useRef } from 'react'
import { Button } from '../ui/Button'
import { initCircuitPulses } from '../../lib/circuit-pulses'

/**
 * HeroSplit
 * A split-layout homepage hero with scan line animation,
 * grid overlay, and architectural circuit pulse effect.
 *
 * Props:
 *   label       — eyebrow label text
 *   titleLines  — array of strings, last one wrapped in <em>
 *   body        — paragraph text
 *   primaryCta  — { label, href }
 *   ghostCta    — { label, href }
 */
export function HeroSplit({
  label = 'ICT Consulting & Implementation',
  titleLines = ['Sever the ties', 'of old', 'technology.'],
  body,
  primaryCta = { label: 'Explore Services', href: '#services' },
  ghostCta   = { label: 'View Our Work',    href: '#case-studies' },
}) {
  const archRef = useRef(null)

  useEffect(() => {
    if (archRef.current) {
      const cleanup = initCircuitPulses(archRef.current)
      return cleanup
    }
  }, [])

  return (
    <section className="hero" aria-label="Hero">
      <div className="hero-img"
        aria-hidden="true"
        style={{ backgroundImage: 'url(/img/hero-img.jpg)' }}
      />

      <div className="hero-bg"  aria-hidden="true" />
      <div className="hero-panel" aria-hidden="true" />

      <div className="hero-architecture" ref={archRef} aria-hidden="true">
        <div className="arch-floor" />
        <div className="arch-wall-left" />
        <div className="arch-wall-right" />
        <div className="arch-ceiling" />
      </div>

      <div className="hero-glow" aria-hidden="true" />

      <div className="hero-content">
        <div className="hero-label fade-in">{label}</div>

        <h1 className="hero-title fade-in">
          {titleLines.map((line, i) =>
            i === titleLines.length - 1
              ? <span key={i}><em>{line}</em></span>
              : <span key={i}>{line}<br /></span>
          )}
        </h1>

        {body && (
          <p className="hero-sub fade-in">{body}</p>
        )}

        <div className="hero-actions fade-in">
          <Button variant="primary" href={primaryCta.href}>
            {primaryCta.label}
          </Button>
          <Button variant="ghost" href={ghostCta.href}>
            {ghostCta.label}
          </Button>
        </div>
      </div>

      <div className="hero-scroll" aria-hidden="true">
        <div className="scroll-line" />
        <span>Scroll</span>
      </div>
    </section>
  )
}

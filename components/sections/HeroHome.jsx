'use client'

import { useEffect, useRef } from 'react'
import { Button } from '../ui/Button'
import { initCircuitPulses } from '../../lib/circuit-pulses'

/**
 * HeroHome
 * The At Home hero with architectural line overlay,
 * display serif typography, and gold circuit pulse animation.
 *
 * Props:
 *   eyebrow     — small label above the title
 *   titleMain   — main title (first line), last word wrapped in <em>
 *   titleSub    — subtitle line in condensed caps
 *   body        — paragraph text
 *   primaryCta  — { label, href }
 *   ghostCta    — { label, href }
 */
export function HeroHome({
  eyebrow    = 'Smart Living · Premium AV · Home Theatre',
  titleMain  = ['Your home,', 'elevated.'],
  titleSub   = 'Beautifully integrated technology',
  body,
  primaryCta = { label: 'Explore the Experience', href: '#offerings' },
  ghostCta   = null,
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
      
      <div className="hero-bg" aria-hidden="true" />
      <div className="hero-panel" aria-hidden="true" />

      <div className="hero-architecture" ref={archRef} aria-hidden="true">
        <div className="arch-floor" />
        <div className="arch-wall-left" />
        <div className="arch-wall-right" />
        <div className="arch-ceiling" />
      </div>

      <div className="hero-glow" aria-hidden="true" />

      <div className="hero-content">
        <div className="hero-eyebrow">{eyebrow}</div>

        <h1 className="hero-title-home">
          {titleMain.map((line, i) =>
            i === titleMain.length - 1
              ? <em key={i}>{line}</em>
              : <span key={i}>{line}<br /></span>
          )}
        </h1>

        <div className="hero-title-sub">{titleSub}</div>

        {body && <p className="hero-body">{body}</p>}

        <div className="hero-ctas">
          <Button variant="warm" href={primaryCta.href}>
            {primaryCta.label}
          </Button>
          {ghostCta && (
            <Button
              variant="outline-warm"
              href={ghostCta.href}
              style={{ color: 'var(--gold)' }}
            >
              {ghostCta.label}
            </Button>
          )}
        </div>
      </div>

      <div className="hero-scroll-home" aria-hidden="true">
        <div className="scroll-mouse">
          <div className="scroll-wheel" />
        </div>
      </div>
    </section>
  )
}

'use client'

import { useScrollReveal } from '../../hooks/useScrollReveal'
import { Button } from '../ui/Button'

/**
 * CtaBand — Technologies horizontal two-column CTA
 *
 * Props:
 *   title       — JSX (use <em> for muted emphasis)
 *   body        — supporting text
 *   primaryCta  — { label, href }
 *   ghostCta    — { label, href }
 */
export function CtaBand({ title, body, primaryCta, ghostCta }) {
  const ref = useScrollReveal()

  return (
    <section className="cta-band" id="contact" ref={ref}>
      <div className="reveal">
        <h2 className="cta-title">{title}</h2>
        {body && <p className="cta-sub">{body}</p>}
      </div>
      <div className="cta-actions reveal">
        {primaryCta && (
          <Button variant="primary" href={primaryCta.href}>
            {primaryCta.label}
          </Button>
        )}
        {ghostCta && (
          <Button
            variant="ghost"
            href={ghostCta.href}
            style={{ color: 'var(--mist)' }}
          >
            {ghostCta.label}
          </Button>
        )}
      </div>
    </section>
  )
}

/**
 * CtaHome — At Home centred CTA
 *
 * Props:
 *   title      — JSX (use <em> for italic gold emphasis)
 *   body       — supporting text
 *   primaryCta — { label, href }
 *   ghostCta   — { label, href }
 */
export function CtaHome({ title, body, primaryCta, ghostCta }) {
  const ref = useScrollReveal()

  return (
    <section className="cta-home" id="contact" ref={ref}>
      <h2 className="cta-home-title reveal">{title}</h2>
      {body && <p className="cta-home-sub reveal">{body}</p>}
      <div className="cta-home-actions reveal">
        {primaryCta && (
          <Button variant="warm" href={primaryCta.href}>
            {primaryCta.label}
          </Button>
        )}
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
    </section>
  )
}

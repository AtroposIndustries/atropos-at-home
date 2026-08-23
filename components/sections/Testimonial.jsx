'use client'

import { useScrollReveal } from '../../hooks/useScrollReveal'

/**
 * Testimonial
 *
 * Props:
 *   quote       — the quote text (without quotation marks)
 *   attribution — e.g. "Architect, South Hobart Residence"
 */
export function Testimonial({ quote, attribution }) {
  const ref = useScrollReveal()

  return (
    <div className="testimonial reveal" ref={ref}>
      <p className="testimonial-quote">&quot;{quote}&quot;</p>
      <div className="testimonial-attr">— {attribution}</div>
    </div>
  )
}

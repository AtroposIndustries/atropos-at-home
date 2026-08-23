'use client'

import { useScrollReveal } from '../../hooks/useScrollReveal'
import { SectionLabel } from '../ui/SectionLabel'

/**
 * ProcessSteps
 *
 * Props:
 *   label — eyebrow
 *   title — heading
 *   steps — array of { num, title, desc }
 */
export function ProcessSteps({ label, title, steps = [] }) {
  const ref = useScrollReveal()

  return (
    <section className="process" id="solutions" ref={ref}>
      <div className="section-header reveal">
        <SectionLabel>{label}</SectionLabel>
        <h2 className="section-title">{title}</h2>
      </div>

      <div className="process-steps">
        {steps.map((step) => (
          <div key={step.num} className="process-step reveal">
            <div className="step-dot" />
            <div className="step-num">{step.num}</div>
            <div className="step-title">{step.title}</div>
            <p className="step-desc">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

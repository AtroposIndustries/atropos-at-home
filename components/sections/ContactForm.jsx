'use client'

import { useState, useEffect, useRef } from 'react'
import { useTheme } from '../../lib/theme-context'
import { SectionLabel } from '../ui/SectionLabel'
import { Button } from '../ui/Button'
import { initCircuitPulses } from '../../lib/circuit-pulses'

/**
 * ContactForm
 *
 * Props:
 *   label       — eyebrow label
 *   title       — JSX headline (use <em> for emphasis)
 *   intro       — supporting paragraph
 *   services    — array of { value, label } for the select dropdown
 *   apiEndpoint — where to POST the form (default: '/api/contact')
 */
export function ContactForm({
  label   = 'Get in Touch',
  title,
  intro   = "Tell us about your project and we'll be in touch within one business day.",
  services = [],
  apiEndpoint = '/api/contact',
}) {
  const brand = useTheme()
  const isHome = brand === 'home'
  const archRef = useRef(null)

  useEffect(() => {
    if (archRef.current) {
      const cleanup = initCircuitPulses(archRef.current)
      return cleanup
    }
  }, [])

  const [fields, setFields] = useState({
    firstName: '', lastName: '', email: '',
    phone: '', message: '',
  })
  const [errors, setErrors]   = useState({})
  const [sending, setSending] = useState(false)
  const [sent, setSent]       = useState(false)

  const set = (key) => (e) => {
    setFields((f) => ({ ...f, [key]: e.target.value }))
    setErrors((err) => ({ ...err, [key]: false }))
  }

  function validate() {
    const e = {}
    if (!fields.firstName.trim())                                e.firstName = true
    if (!fields.lastName.trim())                                 e.lastName  = true
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))      e.email     = true
    if (!fields.message.trim())                                  e.message   = true
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!validate()) return
    setSending(true)
    try {
      await fetch(apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...fields, brand }),
      })
      setSent(true)
    } catch {
      // Keep sending state off so user can retry
    } finally {
      setSending(false)
    }
  }

  const titleEl = title ?? (
    isHome
      ? <>Let&apos;s start a<br /><em>conversation.</em></>
      : <>Let&apos;s start a<br /><em>conversation.</em></>
  )

  return (
    <section className="contact" id="contact">
      <div className="contact-bg-img" aria-hidden="true" />
      <div className="contact-bg-overlay" aria-hidden="true" />
      <div className="contact-bg-panel" aria-hidden="true" />
      <div className="contact-bg-architecture" ref={archRef} aria-hidden="true">
        <div className="arch-floor" />
        <div className="arch-wall-left" />
        <div className="arch-wall-right" />
        <div className="arch-ceiling" />
      </div>
      <div className="contact-bg-glow" aria-hidden="true" />

      <div className="contact-inner">
        <div>
          <SectionLabel style={{ marginBottom: '20px' }}>{label}</SectionLabel>
          <h2 className="contact-title">{titleEl}</h2>
          <p className="contact-intro">{intro}</p>
        </div>

        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          {sent ? (
            <div className="form-success visible">
              <div className="success-icon">✓</div>
              <div className="success-title">Message received.</div>
              <p className="success-body">
                Thanks for reaching out — we&apos;ll be in touch within one business day.
              </p>
            </div>
          ) : (
            <>
              <div className="form-row">
                <Field
                  id="firstName" label="First Name"
                  value={fields.firstName} onChange={set('firstName')}
                  invalid={errors.firstName} error="Please enter your first name."
                  autoComplete="given-name"
                />
                <Field
                  id="lastName" label="Last Name"
                  value={fields.lastName} onChange={set('lastName')}
                  invalid={errors.lastName} error="Please enter your last name."
                  autoComplete="family-name"
                />
              </div>

              <div className="form-row">
                <Field
                  id="email" label="Email Address" type="email"
                  value={fields.email} onChange={set('email')}
                  invalid={errors.email} error="Please enter a valid email address."
                  autoComplete="email"
                />
                <Field
                  id="phone" label="Phone" type="tel"
                  value={fields.phone} onChange={set('phone')}
                  optional autoComplete="tel"
                />
              </div>

<div className={`form-field ${errors.message ? 'invalid' : ''}`}>
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  rows={5}
                  value={fields.message}
                  onChange={set('message')}
                  placeholder="Tell us about your project, timeline, or any questions..."
                  required
                />
                <span className="field-error">Please enter a message.</span>
              </div>

              <div className="form-footer">
                <Button variant="submit" type="submit" loading={sending}>
                  Send Message
                </Button>
                <p className="form-privacy">
                  We respect your privacy. Your details will never be shared.
                </p>
              </div>
            </>
          )}
        </form>
      </div>
    </section>
  )
}

// Internal field helper
function Field({ id, label, type = 'text', value, onChange, invalid, error, optional, autoComplete }) {
  return (
    <div className={`form-field ${invalid ? 'invalid' : ''}`}>
      <label htmlFor={id}>
        {label}
        {optional && <span className="optional"> (optional)</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        required={!optional}
      />
      {error && <span className="field-error">{error}</span>}
    </div>
  )
}

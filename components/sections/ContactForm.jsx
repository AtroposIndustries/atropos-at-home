'use client'

import { useState, useEffect, useRef } from 'react'
import { useTheme } from '../../lib/theme-context'
import { SectionLabel } from '../ui/SectionLabel'
import { Button } from '../ui/Button'
import { initCircuitPulses } from '../../lib/circuit-pulses'
import {
  ZOHO_CONFIG,
  ZOHO_FIELD_NAMES,
  HONEYPOT_FIELD_NAME,
  isZohoConfigured,
  validateContactFields,
  nextSubmitState,
} from '../../lib/zoho-form'

/** How long to wait for the hidden iframe's `load` event before giving up. */
const SUBMIT_TIMEOUT_MS = 15000

/**
 * ContactForm
 *
 * Props:
 *   label    — eyebrow label
 *   title    — JSX headline (use <em> for emphasis)
 *   intro    — supporting paragraph
 *   services — currently unused; no <select> exists to render it into. All
 *              nine pages still pass it. Retained for an upcoming redesign —
 *              do not remove it as dead code.
 *
 * Submits natively to Zoho CRM's Web-to-Lead endpoint, into a hidden iframe.
 * The site is statically hosted with no server to proxy through, and Zoho's
 * endpoint sends no CORS headers, so fetch() would be blocked — a native form
 * POST is a navigation rather than an XHR, so it is not subject to CORS.
 */
export function ContactForm({
  label   = 'Get in Touch',
  title,
  intro   = "Tell us about your project and we'll be in touch within one business day.",
  services = [],
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
    phone: '', message: '', [HONEYPOT_FIELD_NAME]: '',
  })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [stalled, setStalled] = useState(false)
  const timeoutRef = useRef(null)

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current)
  }, [])

  useEffect(() => {
    if (process.env.NODE_ENV !== 'production' && !isZohoConfigured()) {
      console.warn(
        '[ContactForm] Zoho Web-to-Lead is not configured — formId/formSecret ' +
        'are still placeholders in lib/zoho-form.js. Submissions will not reach the CRM.'
      )
    }
  }, [])

  const sending = status === 'submitting'
  const sent    = status === 'sent'

  const set = (key) => (e) => {
    setFields((f) => ({ ...f, [key]: e.target.value }))
    setErrors((err) => ({ ...err, [key]: false }))
  }

  /**
   * Validates, then lets the browser submit the form for real. The POST is a
   * navigation targeted at the hidden iframe, which is what gets us past the
   * absence of CORS headers on Zoho's endpoint — so this handler must NOT
   * preventDefault on the success path.
   */
  function handleSubmit(e) {
    const { valid, errors: nextErrors } = validateContactFields(fields)
    setErrors(nextErrors)

    if (!valid || status !== 'idle') {
      e.preventDefault()
      return
    }
    setStalled(false)
    setStatus((s) => nextSubmitState(s, { type: 'submit' }))
    // No preventDefault — the native submit proceeds into the iframe.

    clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      setStatus((s) => nextSubmitState(s, { type: 'reset' }))
      setStalled(true)
    }, SUBMIT_TIMEOUT_MS)
  }

  function handleIframeLoad() {
    clearTimeout(timeoutRef.current)
    setStatus((s) => nextSubmitState(s, { type: 'iframe-load' }))
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

        <form
          className="contact-form"
          onSubmit={handleSubmit}
          action={ZOHO_CONFIG.endpoint}
          method="POST"
          target="zoho-sink"
          acceptCharset="UTF-8"
          noValidate
        >
          <input type="hidden" name="xnQsjsdp"   value={ZOHO_CONFIG.formId}     readOnly />
          <input type="hidden" name="xmIwtLD"    value={ZOHO_CONFIG.formSecret} readOnly />
          <input type="hidden" name="actionType" value={ZOHO_CONFIG.actionType} readOnly />
          <input type="hidden" name="returnURL"  value={ZOHO_CONFIG.returnUrl}  readOnly />
          <input
            type="hidden"
            name={ZOHO_FIELD_NAMES.leadSource}
            value={ZOHO_CONFIG.leadSource}
            readOnly
          />

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
                  id="firstName" name={ZOHO_FIELD_NAMES.firstName} label="First Name"
                  value={fields.firstName} onChange={set('firstName')}
                  invalid={errors.firstName} error="Please enter your first name."
                  autoComplete="given-name"
                />
                <Field
                  id="lastName" name={ZOHO_FIELD_NAMES.lastName} label="Last Name"
                  value={fields.lastName} onChange={set('lastName')}
                  invalid={errors.lastName} error="Please enter your last name."
                  autoComplete="family-name"
                />
              </div>

              <div className="form-row">
                <Field
                  id="email" name={ZOHO_FIELD_NAMES.email} label="Email Address" type="email"
                  value={fields.email} onChange={set('email')}
                  invalid={errors.email} error="Please enter a valid email address."
                  autoComplete="email"
                />
                <Field
                  id="phone" name={ZOHO_FIELD_NAMES.phone} label="Phone" type="tel"
                  value={fields.phone} onChange={set('phone')}
                  optional autoComplete="tel"
                />
              </div>

<div className={`form-field ${errors.message ? 'invalid' : ''}`}>
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name={ZOHO_FIELD_NAMES.message}
                  rows={5}
                  value={fields.message}
                  onChange={set('message')}
                  placeholder="Tell us about your project, timeline, or any questions..."
                  required
                />
                <span className="field-error">Please enter a message.</span>
              </div>

              <div
                aria-hidden="true"
                style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }}
              >
                <label htmlFor={HONEYPOT_FIELD_NAME}>Do not fill this in</label>
                <input
                  id={HONEYPOT_FIELD_NAME}
                  name={HONEYPOT_FIELD_NAME}
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={fields[HONEYPOT_FIELD_NAME]}
                  onChange={set(HONEYPOT_FIELD_NAME)}
                />
              </div>

              <div className="form-footer">
                <Button variant="submit" type="submit" loading={sending}>
                  Send Message
                </Button>
                {stalled ? (
                  <p className="form-privacy">
                    That&apos;s taking longer than expected. Please try again, or
                    email us directly at{' '}
                    <a href="mailto:hello@atropos.com.au">hello@atropos.com.au</a>.
                  </p>
                ) : (
                  <p className="form-privacy">
                    We respect your privacy. Your details will never be shared.
                  </p>
                )}
              </div>
            </>
          )}
        </form>

        <iframe
          name="zoho-sink"
          title="Contact form submission target"
          onLoad={handleIframeLoad}
          style={{ display: 'none' }}
        />
      </div>
    </section>
  )
}

// Internal field helper
function Field({ id, name, label, type = 'text', value, onChange, invalid, error, optional, autoComplete }) {
  return (
    <div className={`form-field ${invalid ? 'invalid' : ''}`}>
      <label htmlFor={id}>
        {label}
        {optional && <span className="optional"> (optional)</span>}
      </label>
      <input
        id={id}
        name={name}
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

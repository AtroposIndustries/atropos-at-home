import test from 'node:test'
import assert from 'node:assert/strict'

import {
  ZOHO_CONFIG,
  ZOHO_FIELD_NAMES,
  HONEYPOT_FIELD_NAME,
  isZohoConfigured,
  validateContactFields,
  nextSubmitState,
  submitDisposition,
  ZOHO_COMPAT_FIELDS,
} from './zoho-form.js'

const validFields = {
  firstName: 'Ada',
  lastName:  'Lovelace',
  email:     'ada@example.com',
  phone:     '',
  message:   'I would like a quote.',
}

// ── Configuration ────────────────────────────────────────

test('posts to the Australian Zoho data centre', () => {
  assert.equal(ZOHO_CONFIG.endpoint, 'https://crm.zoho.com.au/crm/WebToLeadForm')
})

test('actionType is the base64 encoding of Leads', () => {
  assert.equal(Buffer.from(ZOHO_CONFIG.actionType, 'base64').toString(), 'Leads')
})

test('returnUrl stays on the production domain', () => {
  assert.match(ZOHO_CONFIG.returnUrl, /^https:\/\/atropos\.com\.au\//)
})

test('lead source preserves the channel the old API route sent', () => {
  assert.equal(ZOHO_CONFIG.leadSource, 'Atropos at Home - Contact Form')
})

test('isZohoConfigured is true once real-looking credentials are supplied', () => {
  assert.equal(
    isZohoConfigured({ formId: 'abc123_xnQsjsdp', formSecret: 'def456_xmIwtLD' }),
    true
  )
})

test('isZohoConfigured is false while either value is still a placeholder', () => {
  assert.equal(
    isZohoConfigured({ formId: 'REPLACE_ME_xnQsjsdp', formSecret: 'def456_xmIwtLD' }),
    false
  )
  assert.equal(
    isZohoConfigured({ formId: 'abc123_xnQsjsdp', formSecret: 'REPLACE_ME_xmIwtLD' }),
    false
  )
})

// ── Field mapping ────────────────────────────────────────

test('maps internal keys to the Zoho field names', () => {
  assert.equal(ZOHO_FIELD_NAMES.firstName,  'First Name')
  assert.equal(ZOHO_FIELD_NAMES.lastName,   'Last Name')
  assert.equal(ZOHO_FIELD_NAMES.email,      'Email')
  assert.equal(ZOHO_FIELD_NAMES.phone,      'Phone')
  assert.equal(ZOHO_FIELD_NAMES.message,    'Description')
  assert.equal(ZOHO_FIELD_NAMES.leadSource, 'Lead Source')
})

test('the honeypot name is not a real Zoho field', () => {
  assert.equal(Object.values(ZOHO_FIELD_NAMES).includes(HONEYPOT_FIELD_NAME), false)
})

// ── Validation ───────────────────────────────────────────

test('accepts a complete submission', () => {
  assert.deepEqual(validateContactFields(validFields), { valid: true, errors: {} })
})

test('phone is optional', () => {
  const result = validateContactFields({ ...validFields, phone: '' })
  assert.equal(result.valid, true)
})

test('flags a missing first name', () => {
  const result = validateContactFields({ ...validFields, firstName: '   ' })
  assert.equal(result.valid, false)
  assert.equal(result.errors.firstName, true)
})

test('flags a missing last name', () => {
  const result = validateContactFields({ ...validFields, lastName: '' })
  assert.equal(result.valid, false)
  assert.equal(result.errors.lastName, true)
})

test('flags a missing message', () => {
  const result = validateContactFields({ ...validFields, message: '  ' })
  assert.equal(result.valid, false)
  assert.equal(result.errors.message, true)
})

test('rejects a malformed email', () => {
  for (const email of ['nope', 'a@b', 'a b@c.com', '']) {
    const result = validateContactFields({ ...validFields, email })
    assert.equal(result.valid, false, `expected ${email} to be rejected`)
    assert.equal(result.errors.email, true)
  }
})

test('a filled honeypot fails validation without naming the honeypot', () => {
  const result = validateContactFields({ ...validFields, [HONEYPOT_FIELD_NAME]: 'spam' })
  assert.equal(result.valid, false)
  assert.equal(result.errors[HONEYPOT_FIELD_NAME], undefined)
})

// ── Submit state machine ─────────────────────────────────

test('a valid submit moves idle to submitting', () => {
  assert.equal(nextSubmitState('idle', { type: 'submit' }), 'submitting')
})

test('the iframe load that fires on mount does not fake a success', () => {
  assert.equal(nextSubmitState('idle', { type: 'iframe-load' }), 'idle')
})

test('an iframe load during submission completes the send', () => {
  assert.equal(nextSubmitState('submitting', { type: 'iframe-load' }), 'sent')
})

test('a second submit while in flight is ignored', () => {
  assert.equal(nextSubmitState('submitting', { type: 'submit' }), 'submitting')
})

test('a sent form stays sent', () => {
  assert.equal(nextSubmitState('sent', { type: 'iframe-load' }), 'sent')
  assert.equal(nextSubmitState('sent', { type: 'submit' }),      'sent')
})

test('reset returns to idle', () => {
  assert.equal(nextSubmitState('sent', { type: 'reset' }), 'idle')
})

test('an unknown event leaves the state untouched', () => {
  assert.equal(nextSubmitState('submitting', { type: 'nonsense' }), 'submitting')
})

// ── Submit disposition ───────────────────────────────────

const sendable = { configured: true, valid: true, state: 'idle' }

test('a valid submit on a configured form sends', () => {
  assert.equal(submitDisposition(sendable), 'send')
})

test('an unconfigured form reports itself unavailable rather than sending', () => {
  assert.equal(submitDisposition({ ...sendable, configured: false }), 'unavailable')
})

test('invalid fields outrank an unconfigured form', () => {
  // Otherwise a visitor who forgot their surname is told to email us instead
  // of being shown the field they missed.
  assert.equal(
    submitDisposition({ configured: false, valid: false, state: 'idle' }),
    'invalid'
  )
})

test('invalid fields do not send', () => {
  assert.equal(submitDisposition({ ...sendable, valid: false }), 'invalid')
})

test('a submit that is already in flight is ignored', () => {
  assert.equal(submitDisposition({ ...sendable, state: 'submitting' }), 'ignore')
})

test('a form that has already sent ignores further submits', () => {
  assert.equal(submitDisposition({ ...sendable, state: 'sent' }), 'ignore')
})

test('an unconfigured form in flight is ignored, not re-reported', () => {
  assert.equal(
    submitDisposition({ configured: false, valid: true, state: 'submitting' }),
    'ignore'
  )
})

test('send is the only disposition that may proceed to a native POST', () => {
  // The native submit is what gets us past the absence of CORS headers, so
  // exactly one disposition must be allowed through without preventDefault.
  const all = [
    submitDisposition(sendable),
    submitDisposition({ ...sendable, configured: false }),
    submitDisposition({ ...sendable, valid: false }),
    submitDisposition({ ...sendable, state: 'submitting' }),
  ]
  assert.equal(all.filter((d) => d === 'send').length, 1)
})

// ── Live credentials ─────────────────────────────────────

test('the shipped config is no longer a placeholder', () => {
  // Guards against a revert to REPLACE_ME, which would silently take the form
  // offline behind the 'unavailable' fallback.
  assert.equal(isZohoConfigured(), true)
})

test('the credentials look like Zoho hex tokens', () => {
  assert.match(ZOHO_CONFIG.formId,     /^[0-9a-f]{64}$/)
  assert.match(ZOHO_CONFIG.formSecret, /^[0-9a-f]{96}$/)
})

// ── Zoho's own hidden inputs ─────────────────────────────

test("mirrors Zoho's honeypot field, always empty", () => {
  // aG9uZXlwb3Q is base64("honeypot"). Zoho's generated form posts it empty;
  // ours must too, or a server-side presence check could reject the lead.
  assert.equal(Object.hasOwn(ZOHO_COMPAT_FIELDS, 'aG9uZXlwb3Q'), true)
  assert.equal(ZOHO_COMPAT_FIELDS.aG9uZXlwb3Q, '')
})

test('mirrors the Google Ads click field, always empty', () => {
  assert.equal(ZOHO_COMPAT_FIELDS.zc_gad, '')
})

test('every compat field is empty', () => {
  // These exist to match Zoho's markup, not to carry data. A non-empty value
  // here would look like bot input to Zoho.
  for (const [name, value] of Object.entries(ZOHO_COMPAT_FIELDS)) {
    assert.equal(value, '', `${name} must post empty`)
  }
})

test('compat fields do not collide with real Zoho fields or the honeypot', () => {
  for (const name of Object.keys(ZOHO_COMPAT_FIELDS)) {
    assert.equal(Object.values(ZOHO_FIELD_NAMES).includes(name), false)
    assert.notEqual(name, HONEYPOT_FIELD_NAME)
  }
})

import test from 'node:test'
import assert from 'node:assert/strict'

import {
  ZOHO_CONFIG,
  ZOHO_FIELD_NAMES,
  HONEYPOT_FIELD_NAME,
  isZohoConfigured,
  validateContactFields,
  nextSubmitState,
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
  assert.match(ZOHO_CONFIG.returnUrl, /^https:\/\/atroposathome\.com\.au\//)
})

test('lead source preserves the channel the old API route sent', () => {
  assert.equal(ZOHO_CONFIG.leadSource, 'Atropos at Home - Contact Form')
})

test('isZohoConfigured is false while the placeholders are unfilled', () => {
  assert.equal(isZohoConfigured(), false)
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

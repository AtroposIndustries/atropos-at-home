/**
 * Zoho CRM Web-to-Lead configuration and submit logic.
 *
 * The site is statically hosted, so there is no server to proxy through.
 * Zoho's Web-to-Lead endpoint sends no CORS headers, which rules out fetch();
 * a native form POST is a navigation rather than an XHR, so it is not subject
 * to CORS. The form therefore submits for real, into a hidden iframe, and this
 * module holds every piece of that arrangement which can be tested without a
 * browser.
 */

const PLACEHOLDER = 'REPLACE_ME'

export const ZOHO_CONFIG = {
  // Australian data centre.
  endpoint:   'https://crm.zoho.com.au/crm/WebToLeadForm',

  // From Zoho CRM → Setup → Developer Space → Webforms → your form → Source code.
  // Both remain placeholders until the webform is created. See docs/specs.
  formId:     `${PLACEHOLDER}_xnQsjsdp`,
  formSecret: `${PLACEHOLDER}_xmIwtLD`,

  // base64("Leads") — Zoho's identifier for the target module.
  actionType: 'TGVhZHM=',

  // Zoho redirects the hidden iframe here after accepting the lead. It is never
  // seen by the visitor, so it points at a near-empty file rather than a page.
  returnUrl:  'https://atroposathome.com.au/zoho-thanks.html',

  // Preserves the channel tag the retired API route sent to Zoho.
  leadSource: 'Atropos at Home - Contact Form',
}

/** Internal field key → the `name` attribute Zoho requires on that input. */
export const ZOHO_FIELD_NAMES = {
  firstName:  'First Name',
  lastName:   'Last Name',
  email:      'Email',
  phone:      'Phone',
  message:    'Description',
  leadSource: 'Lead Source',
}

/**
 * Hidden decoy input. Zoho ignores unknown fields, so a bot that fills every
 * input costs nothing but identifies itself.
 */
export const HONEYPOT_FIELD_NAME = 'ah_company_url'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/** False while the Zoho form ID or secret is still a placeholder. */
export function isZohoConfigured(config = ZOHO_CONFIG) {
  return !config.formId.startsWith(PLACEHOLDER) &&
         !config.formSecret.startsWith(PLACEHOLDER)
}

/**
 * Validates the five fields the form renders.
 *
 * A filled honeypot returns invalid with an empty error for that key, so the
 * UI shows a bot nothing it can learn from. Phone is optional.
 */
export function validateContactFields(fields = {}) {
  if (String(fields[HONEYPOT_FIELD_NAME] ?? '').trim() !== '') {
    return { valid: false, errors: {} }
  }

  const errors = {}
  if (!String(fields.firstName ?? '').trim()) errors.firstName = true
  if (!String(fields.lastName  ?? '').trim()) errors.lastName  = true
  if (!String(fields.message   ?? '').trim()) errors.message   = true
  if (!EMAIL_PATTERN.test(String(fields.email ?? ''))) errors.email = true

  return { valid: Object.keys(errors).length === 0, errors }
}

/**
 * Submit state machine: 'idle' → 'submitting' → 'sent'.
 *
 * The 'idle' + 'iframe-load' case matters more than it looks. A hidden iframe
 * fires `load` once when it is first attached to the document, before anything
 * has been submitted. Without this guard the form would flash its success state
 * on page load.
 */
export function nextSubmitState(state, event = {}) {
  switch (event.type) {
    case 'submit':
      return state === 'idle' ? 'submitting' : state
    case 'iframe-load':
      return state === 'submitting' ? 'sent' : state
    case 'reset':
      return 'idle'
    default:
      return state
  }
}

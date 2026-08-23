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

  // From Zoho CRM → Setup → Channels → Webforms → your form → Source code.
  // Public by design: both ship in this site's page source on every route, so
  // they are identifiers rather than secrets. What actually prevents arbitrary
  // submissions is the webform's Form Location URL restriction, set in Zoho.
  formId:     'a6cbdb83e68afb87106576fe39f4627252061e321e05440ceb672d2346b511c3',
  formSecret: '5ad8738260fe02f48c07a29d583c2967eaef6557deca5b0fbedb23e2b19eb4bd874044542c07b189903c50407e103444',

  // base64("Leads") — Zoho's identifier for the target module.
  actionType: 'TGVhZHM=',

  // Zoho redirects the hidden iframe here after accepting the lead. It is never
  // seen by the visitor, so it points at a near-empty file rather than a page.
  // Must stay identical to the webform's "Action on Submission" custom URL, so
  // that which of the two Zoho honours cannot matter.
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

/**
 * Empty hidden inputs that Zoho's own generated form posts, mirrored here.
 *
 * This form is hand-built, so anything Zoho's markup includes and ours omits is
 * a difference its endpoint might notice. Neither field carries data for us:
 *
 *   aG9uZXlwb3Q — base64("honeypot"), Zoho's own spam decoy. Zoho posts it
 *                 empty for a human. Ours does the same, so a server-side
 *                 presence check cannot mistake us for a bot. This is separate
 *                 from HONEYPOT_FIELD_NAME, which is our own client-side decoy
 *                 that Zoho ignores.
 *   zc_gad      — Google Ads click identifier, empty when there is none.
 *
 * Both must post empty. A value here would read as bot input.
 */
export const ZOHO_COMPAT_FIELDS = {
  aG9uZXlwb3Q: '',
  zc_gad:      '',
}

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

/**
 * What a submit attempt is allowed to do.
 *
 *   'invalid'     — fields are wrong; show the field errors
 *   'ignore'      — a submit is already in flight, or has completed
 *   'unavailable' — the form has nowhere to post; offer the email address
 *   'send'        — proceed with the native POST
 *
 * 'send' is the ONLY disposition that may reach the browser's native submit.
 * Every other one must preventDefault, or the form navigates away.
 *
 * Field errors outrank 'unavailable' deliberately: a visitor who left their
 * surname blank needs to see that, not be told to email us instead. The
 * outage only surfaces once there is nothing else wrong with the submission.
 */
export function submitDisposition({ configured, valid, state } = {}) {
  if (!valid)            return 'invalid'
  if (state !== 'idle')  return 'ignore'
  if (!configured)       return 'unavailable'
  return 'send'
}

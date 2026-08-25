import test from 'node:test'
import assert from 'node:assert/strict'

import { SITE_URL } from './site.js'
import { ZOHO_CONFIG } from './zoho-form.js'

test('the canonical origin is the Atropos apex domain', () => {
  assert.equal(SITE_URL, 'https://atropos.com.au')
})

test('the origin has no trailing slash', () => {
  // Everything concatenates onto this, so a trailing slash here produces
  // doubled slashes in every canonical, og:url and sitemap entry.
  assert.equal(SITE_URL.endsWith('/'), false)
})

test('the origin is https', () => {
  assert.match(SITE_URL, /^https:\/\//)
})

test("Zoho's return URL derives from the shared origin", () => {
  // These drifting apart is not a visible failure: the form would post to a
  // returnURL Zoho rejects, and the iframe would never fire load.
  assert.equal(ZOHO_CONFIG.returnUrl, `${SITE_URL}/zoho-thanks.html`)
})

test('no atroposathome.com.au remains in the shared origin', () => {
  assert.equal(SITE_URL.includes('atroposathome'), false)
})

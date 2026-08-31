import test from 'node:test'
import assert from 'node:assert/strict'

import { SITE_URL } from './site.js'
import { ROUTES, routeUrl, FORM_ROUTES, REGISTERED_FORM_URLS } from './routes.js'
import sitemap from '../app/sitemap.js'

test('every route path starts with a slash and has no trailing slash', () => {
  for (const r of ROUTES) {
    if (r.path === '') continue
    assert.ok(r.path.startsWith('/'), `${r.path} must start with /`)
    assert.equal(r.path.endsWith('/'), false, `${r.path} must not end with /`)
  }
})

test('route paths are unique', () => {
  const paths = ROUTES.map((r) => r.path)
  assert.equal(new Set(paths).size, paths.length)
})

test('routeUrl produces an absolute URL with a trailing slash', () => {
  assert.equal(routeUrl(''), `${SITE_URL}/`)
  assert.equal(routeUrl('/residential/audio'), `${SITE_URL}/residential/audio/`)
})

test('every vertical is one of the three known values', () => {
  for (const r of ROUTES) {
    assert.ok(['none', 'residential', 'commercial'].includes(r.vertical), r.path)
  }
})

test('there are six residential services and nine commercial services', () => {
  const svc = (v) => ROUTES.filter((r) => r.vertical === v && r.path.split('/').length === 3)
  assert.equal(svc('residential').length, 6)
  assert.equal(svc('commercial').length, 9)
})

test('the review page carries no contact form', () => {
  assert.equal(ROUTES.find((r) => r.path === '/review').form, false)
})

test('every other route carries the contact form', () => {
  const noForm = ROUTES.filter((r) => !r.form).map((r) => r.path)
  assert.deepEqual(noForm, ['/review'])
})

test('FORM_ROUTES and REGISTERED_FORM_URLS agree exactly', () => {
  // Drift here is invisible on the site: Zoho still creates the lead but the
  // visitor never sees a confirmation.
  assert.deepEqual(
    [...REGISTERED_FORM_URLS].sort(),
    FORM_ROUTES.map(routeUrl).sort()
  )
})

test('the sitemap contains every route exactly once', () => {
  const inSitemap = sitemap().map((e) => e.url).sort()
  const expected  = ROUTES.map((r) => routeUrl(r.path)).sort()
  assert.deepEqual(inSitemap, expected)
})

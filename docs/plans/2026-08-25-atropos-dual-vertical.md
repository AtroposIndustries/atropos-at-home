# Atropos Dual-Vertical Rebrand — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restructure the site from a residential-only "Atropos at Home" into a single Atropos brand presenting residential and commercial as co-equal verticals.

**Architecture:** Next.js 14 App Router, static export to GitHub Pages. Routes move under `/residential/*` and `/commercial/*`, with generated stub pages preserving the six old URLs. A new `lib/routes.js` becomes the single source of truth for every route, consumed by the sitemap and by two new CI guards. Page copy stays in `content.js` beside each page, per the existing convention.

**Tech Stack:** Next.js 14 (App Router, `output: 'export'`), React 18, plain CSS, `node --test` for tests, pnpm, GitHub Actions → GitHub Pages.

**Spec:** `docs/specs/2026-08-25-atropos-dual-vertical-design.md`

## Global Constraints

- **Branch:** `rebrand-atropos`. Do not push to `main` — pushing to `main` deploys to production.
- **No visual redesign.** Layout, components and styling are unchanged. Structure and copy only.
- **Brand name is "Atropos"** — never "Atropos at Home", in prose, JSON-LD, `alt` text or `llms.txt`.
- **`SITE_URL` is `https://atropos.com.au`**, from `lib/site.js`. Never hardcode a domain.
- **Do not rename `public/img/atropos-hero-ash.svg`.** The Zoho welcome email template references it by that path.
- **Every command runs from the repo root**, `e:\dev\atropos\atropos-at-home`.
- **Verification triple** after every task: `pnpm test`, `pnpm lint`, `pnpm build`. All three must pass before committing.
- **Trailing slashes:** `next.config.mjs` sets `trailingSlash: true`. Canonicals and sitemap entries end in `/`. Route constants in `lib/routes.js` are written **without** a trailing slash (`/residential/audio`); helpers add it.
- **Commit style:** imperative subject, body explaining *why*, and the trailer `Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>`.

---

## File Structure

**New files:**

| Path | Responsibility |
|------|----------------|
| `lib/routes.js` | Single source of truth: every route, its vertical, whether it carries the contact form |
| `lib/routes.test.mjs` | Shape tests, sitemap coverage, form-registration guard |
| `app/residential/page.jsx` + `content.js` | Residential vertical landing |
| `app/residential/<service>/page.jsx` + `content.js` | Six moved residential services |
| `app/commercial/page.jsx` + `content.js` | Commercial vertical landing |
| `app/commercial/<service>/page.jsx` + `content.js` | Nine new commercial services |
| `scripts/build-stubs.mjs` | Generates old-URL stub pages into `public/` |

**Modified:**

| Path | Change |
|------|--------|
| `app/content.js` | `NAV` restructured into two dropdowns; brand strings |
| `app/layout.jsx` | Brand strings, JSON-LD `name`, keywords |
| `app/page.jsx` | Homepage: unified hero + two-path split |
| `app/sitemap.js` | Driven from `lib/routes.js` |
| `components/layout/Nav.jsx` | Logo `alt` only — no structural change needed |
| `components/layout/Footer.jsx` | Logo `src`, brand strings, link columns |
| `public/llms.txt` | Rewritten for two verticals |
| `docs/LAUNCH.md` | Form Location URL list, external-config checklist |

**Deleted:** `app/{smart-home,home-theatre,audio,network,acoustic,support}/` — moved, with stubs generated into `public/`.

---

## Task 1: Swap the logo to the base Atropos wordmark

**Files:**
- Modify: `components/layout/Nav.jsx` (logo `alt` text)
- Modify: `app/content.js`, `app/page.jsx`, `app/about/page.jsx`, and the six service `page.jsx` files (the `logo=` prop passed to `Nav` and `Footer`)

**Interfaces:**
- Consumes: nothing
- Produces: nothing — pure asset swap

Both SVGs already exist in `public/img/`. `atropos-hero-ash.svg` is the same 13 paths as the At Home lockup, minus a `<text>` element rendering "AT HOME" in Lexend.

- [ ] **Step 1: Confirm the current reference count**

```bash
grep -rn 'atropos-at-home-ash' app components | wc -l
```
Expected: `18`

- [ ] **Step 2: Replace every reference**

```bash
grep -rl 'atropos-at-home-ash' app components \
  | xargs sed -i 's|/img/atropos-at-home-ash\.svg|/img/atropos-hero-ash.svg|g'
```

- [ ] **Step 3: Fix the logo alt text**

In `components/layout/Nav.jsx`, the `<img>` inside `.nav-logo` currently reads `alt="Atropos logo"` — already brand-neutral, leave it. In `components/layout/Footer.jsx` the footer logo `<img>` also reads `alt="Atropos logo"`. Confirm both:

```bash
grep -rn 'alt="Atropos' components/layout/
```
Expected: two matches, both already `alt="Atropos logo"`. No edit needed.

- [ ] **Step 4: Verify no references remain**

```bash
grep -rn 'atropos-at-home-ash' app components || echo "clean"
```
Expected: `clean`

- [ ] **Step 5: Verify**

```bash
pnpm test && pnpm lint && pnpm build
```
Expected: 41 tests pass, 0 lint errors, `✓ Compiled successfully`

- [ ] **Step 6: Confirm the built output uses the new logo**

```bash
grep -o 'atropos-hero-ash.svg' out/index.html | head -1
grep -c 'atropos-at-home-ash' out/index.html || echo "0 — clean"
```
Expected: the hero filename appears; the At Home filename does not.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "$(cat <<'EOF'
feat: swap the At Home lockup for the base Atropos wordmark

The business now trades as Atropos rather than Atropos at Home, so the
lockup with "AT HOME" beneath the wordmark no longer describes it.

Both files already existed in public/img and are the same 13 paths; the
lockup adds a <text> element. Dropping it also removes a latent fragility:
that text rendered "AT HOME" in Lexend, so anywhere the font was missing it
fell back to the wrong face at the wrong spacing. The base wordmark is all
paths.

The file keeps its misleading atropos-hero-ash.svg name deliberately — the
Zoho welcome email template references it by that path, and renaming would
break the header of every welcome email.

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 2: Remove every "Atropos at Home" reference

**Files:**
- Modify: `app/layout.jsx`, `app/content.js`, `app/page.jsx`, `app/about/page.jsx`, `app/review/page.jsx`, the six service `page.jsx` files, `components/layout/Footer.jsx`, `components/sections/ReviewWizard.jsx`, `public/llms.txt`

**Interfaces:**
- Consumes: nothing
- Produces: nothing

**This is not a blind find-and-replace.** The 32 occurrences fall into three kinds, and each needs different handling:

1. **Bare brand references** ("Atropos at Home delivers…") → "Atropos"
2. **JSON-LD `name` / `alternateName`** in `app/layout.jsx` → "Atropos"; the `alternateName` field, if it holds "Atropos at Home", should be **removed** rather than duplicated — an `alternateName` equal to `name` is noise
3. **Sentences that assume residential-only scope** ("Atropos at Home delivers premium smart home automation … for discerning homeowners across Tasmania") → rewrite to name both verticals, since deleting two words leaves a sentence that still excludes commercial

- [ ] **Step 1: List every occurrence with context, and classify each**

```bash
grep -rn 'Atropos at Home' app components public
```
Expected: 32 matches across 14 files. Work through them file by file; do not script this.

- [ ] **Step 2: Rewrite `app/layout.jsx`**

The site-wide description currently reads:

```js
description:
  'Atropos at Home delivers premium smart home automation, distributed audio, and home theatre for architects, builders, and discerning homeowners across Tasmania.',
```

Replace with:

```js
description:
  'Atropos designs and installs integrated technology for Tasmanian homes and businesses — control and automation, audio, networks and acoustics. Hobart, Tasmania.',
```

Apply the same treatment to `openGraph.description`, the JSON-LD `name`, and any `keywords` entry containing the old brand.

- [ ] **Step 3: Rewrite `public/llms.txt`**

Replace the `# Atropos at Home` heading and the About paragraph:

```
# Atropos
> Integrated technology for Tasmanian homes and businesses — Hobart, Tasmania, Australia

## About
Atropos designs and installs integrated technology across residential and commercial projects in Tasmania: control and automation, home theatre and meeting spaces, distributed audio, networks, structured cabling, security, digital signage, and acoustic treatment. We work with homeowners, business owners, builders and architects. Parent company: Atropos Industries Pty Ltd, Hobart, TAS 7000.
```

- [ ] **Step 4: Work through the remaining files**

For each match in `app/content.js`, `app/page.jsx`, `app/about/page.jsx`, `app/review/page.jsx`, the service pages, `components/layout/Footer.jsx` and `components/sections/ReviewWizard.jsx`: read the surrounding sentence, then apply kind 1 or kind 3 above.

`components/sections/ReviewWizard.jsx` needs care — its three matches are strings that appear in **generated review text a customer will paste into Google**. Those must read naturally as a company name.

- [ ] **Step 5: Verify none remain**

```bash
grep -rn 'Atropos at Home' app components public || echo "clean"
```
Expected: `clean`

- [ ] **Step 6: Verify**

```bash
pnpm test && pnpm lint && pnpm build
grep -rc 'Atropos at Home' out/ | grep -v ':0' || echo "built output clean"
```
Expected: all three pass; built output clean.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "$(cat <<'EOF'
copy: drop "Atropos at Home" for "Atropos" throughout

The business trades as Atropos and now serves commercial as well as
residential, so the old name is both wrong and too narrow.

Handled by hand rather than by find-and-replace, because the 32 occurrences
were three different problems. Bare brand references simply changed. JSON-LD
name fields changed and a redundant alternateName was dropped. Sentences that
assumed a residential-only business were rewritten, since deleting two words
from "premium smart home automation for discerning homeowners" leaves a
sentence that still excludes half the business.

ReviewWizard's strings needed the most care: they end up in review text a
customer pastes into Google, so they had to read as a company name rather
than a slogan.

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 3: Add `lib/routes.js` as the single source of truth

**Files:**
- Create: `lib/routes.js`
- Create: `lib/routes.test.mjs`

**Interfaces:**
- Consumes: `SITE_URL` from `lib/site.js`
- Produces:
  - `ROUTES` — `Array<{ path: string, vertical: 'none'|'residential'|'commercial', form: boolean, changeFrequency: string, priority: number }>`. `path` has a leading slash and **no** trailing slash; the homepage is `''`.
  - `routeUrl(path: string): string` — absolute URL with trailing slash
  - `FORM_ROUTES: string[]` — paths where `form === true`
  - `REGISTERED_FORM_URLS: string[]` — absolute URLs registered in Zoho's Form Location URL list

- [ ] **Step 1: Write the failing test**

Create `lib/routes.test.mjs`:

```javascript
import test from 'node:test'
import assert from 'node:assert/strict'

import { SITE_URL } from './site.js'
import { ROUTES, routeUrl, FORM_ROUTES, REGISTERED_FORM_URLS } from './routes.js'

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
```

- [ ] **Step 2: Run it and watch it fail**

```bash
pnpm test 2>&1 | grep -E 'Cannot find|^ℹ (tests|pass|fail)'
```
Expected: `Cannot find module .../lib/routes.js`

- [ ] **Step 3: Write `lib/routes.js`**

```javascript
import { SITE_URL } from './site.js'

/**
 * Every route on the site, and what it is.
 *
 * This exists because three things must agree and none of them can see the
 * others: the pages that exist, the sitemap, and the Form Location URL list
 * registered inside Zoho. Zoho validates the submitting page's URL per page —
 * an unregistered page still creates the lead but never confirms it to the
 * visitor, and nothing on the site reveals the failure. Nineteen form-bearing
 * pages is well past what anyone can track by eye.
 *
 * `path` has a leading slash and no trailing slash. The homepage is ''.
 * `routeUrl` adds the trailing slash, matching `trailingSlash: true`.
 */
export const ROUTES = [
  { path: '',        vertical: 'none', form: true,  changeFrequency: 'weekly',  priority: 1.0 },
  { path: '/about',  vertical: 'none', form: true,  changeFrequency: 'yearly',  priority: 0.6 },
  { path: '/review', vertical: 'none', form: false, changeFrequency: 'yearly',  priority: 0.3 },

  { path: '/residential',              vertical: 'residential', form: true, changeFrequency: 'monthly', priority: 0.9 },
  { path: '/residential/smart-home',   vertical: 'residential', form: true, changeFrequency: 'monthly', priority: 0.8 },
  { path: '/residential/home-theatre', vertical: 'residential', form: true, changeFrequency: 'monthly', priority: 0.8 },
  { path: '/residential/audio',        vertical: 'residential', form: true, changeFrequency: 'monthly', priority: 0.8 },
  { path: '/residential/network',      vertical: 'residential', form: true, changeFrequency: 'monthly', priority: 0.8 },
  { path: '/residential/acoustic',     vertical: 'residential', form: true, changeFrequency: 'monthly', priority: 0.8 },
  { path: '/residential/support',      vertical: 'residential', form: true, changeFrequency: 'monthly', priority: 0.7 },

  { path: '/commercial',               vertical: 'commercial', form: true, changeFrequency: 'monthly', priority: 0.9 },
  { path: '/commercial/control',       vertical: 'commercial', form: true, changeFrequency: 'monthly', priority: 0.8 },
  { path: '/commercial/meeting-rooms', vertical: 'commercial', form: true, changeFrequency: 'monthly', priority: 0.8 },
  { path: '/commercial/audio',         vertical: 'commercial', form: true, changeFrequency: 'monthly', priority: 0.8 },
  { path: '/commercial/networks',      vertical: 'commercial', form: true, changeFrequency: 'monthly', priority: 0.8 },
  { path: '/commercial/cabling',       vertical: 'commercial', form: true, changeFrequency: 'monthly', priority: 0.8 },
  { path: '/commercial/security',      vertical: 'commercial', form: true, changeFrequency: 'monthly', priority: 0.8 },
  { path: '/commercial/signage',       vertical: 'commercial', form: true, changeFrequency: 'monthly', priority: 0.8 },
  { path: '/commercial/acoustic',      vertical: 'commercial', form: true, changeFrequency: 'monthly', priority: 0.8 },
  { path: '/commercial/support',       vertical: 'commercial', form: true, changeFrequency: 'monthly', priority: 0.7 },
]

/** Absolute URL for a route path, with the trailing slash the site serves. */
export function routeUrl(path) {
  return `${SITE_URL}${path}/`
}

/** Paths that render ContactForm. */
export const FORM_ROUTES = ROUTES.filter((r) => r.form).map((r) => r.path)

/**
 * The Form Location URLs registered in the Zoho webform.
 *
 * Derived rather than hand-listed so the two cannot drift. Kept as a named
 * export because docs/LAUNCH.md instructs a human to paste this exact list
 * into Zoho — printing it is the point.
 */
export const REGISTERED_FORM_URLS = FORM_ROUTES.map(routeUrl)
```

- [ ] **Step 4: Run the tests**

```bash
pnpm test 2>&1 | grep -E '^ℹ (tests|pass|fail)'
```
Expected: `pass 49`, `fail 0` (41 existing + 8 new)

- [ ] **Step 5: Commit**

```bash
git add lib/routes.js lib/routes.test.mjs
git commit -m "$(cat <<'EOF'
feat: add lib/routes.js as the single source of truth for routes

Three things must agree and none can see the others: the pages that exist,
the sitemap, and the Form Location URL list registered inside Zoho. Zoho
validates the submitting page's URL per page, so an unregistered page still
creates the lead but never confirms it to the visitor — a failure invisible
from the site, which cost an afternoon to diagnose the first time it happened.

Nineteen form-bearing pages is past what anyone tracks by eye, so the list is
derived rather than maintained. REGISTERED_FORM_URLS is exported because
LAUNCH.md tells a human to paste that exact list into Zoho.

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 4: Drive the sitemap from `lib/routes.js`, with a coverage guard

**Files:**
- Modify: `app/sitemap.js`
- Modify: `lib/routes.test.mjs` (append)
- Create: `scripts/check-form-pages.mjs`
- Modify: `package.json` (add the check to `test`)

**Interfaces:**
- Consumes: `ROUTES`, `routeUrl`, `FORM_ROUTES` from `lib/routes.js`
- Produces: `scripts/check-form-pages.mjs` — exits non-zero listing any page rendering `<ContactForm` whose route is absent from `FORM_ROUTES`

- [ ] **Step 1: Write the failing test — sitemap coverage**

Add the import beside the existing ones at the top of `lib/routes.test.mjs`:

```javascript
import sitemap from '../app/sitemap.js'
```

Then append the test:

```javascript
test('the sitemap contains every route exactly once', () => {
  const inSitemap = sitemap().map((e) => e.url).sort()
  const expected  = ROUTES.map((r) => routeUrl(r.path)).sort()
  assert.deepEqual(inSitemap, expected)
})
```

- [ ] **Step 2: Run it and watch it fail**

```bash
pnpm test 2>&1 | grep -A5 'sitemap contains every route'
```
Expected: FAIL — the current sitemap has eight hardcoded entries and knows nothing of the new routes.

- [ ] **Step 3: Rewrite `app/sitemap.js`**

```javascript
// Relative, not the @/ alias: lib/routes.test.mjs imports this file, and
// `node --test` cannot resolve jsconfig path aliases. Next handles relative
// imports identically.
import { ROUTES, routeUrl } from '../lib/routes.js'

const NOW = new Date().toISOString()

/**
 * Driven from lib/routes.js so a new page cannot be added without appearing
 * here. routeUrl applies the trailing slash, which must match the canonical
 * each page renders under trailingSlash: true.
 */
export default function sitemap() {
  return ROUTES.map((r) => ({
    url:             routeUrl(r.path),
    lastModified:    NOW,
    changeFrequency: r.changeFrequency,
    priority:        r.priority,
  }))
}
```

- [ ] **Step 4: Run the tests**

```bash
pnpm test 2>&1 | grep -E '^ℹ (tests|pass|fail)'
```
Expected: `fail 0`

- [ ] **Step 5: Write the form-page guard script**

Create `scripts/check-form-pages.mjs`:

```javascript
/**
 * Fails the build if a page renders ContactForm but its route is not in
 * FORM_ROUTES — which is what docs/LAUNCH.md tells a human to register in
 * Zoho. An unregistered page still creates leads; it just never confirms
 * them to the visitor, and nothing on the site says so.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative, sep } from 'node:path'

import { FORM_ROUTES } from '../lib/routes.js'

const APP = 'app'

function pageFiles(dir, found = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) pageFiles(full, found)
    else if (entry === 'page.jsx') found.push(full)
  }
  return found
}

const problems = []

for (const file of pageFiles(APP)) {
  if (!readFileSync(file, 'utf8').includes('<ContactForm')) continue
  const dir   = relative(APP, file).split(sep).slice(0, -1).join('/')
  const route = dir ? `/${dir}` : ''
  if (!FORM_ROUTES.includes(route)) problems.push({ file, route })
}

if (problems.length) {
  console.error('\nPages render ContactForm but are not in FORM_ROUTES:\n')
  for (const p of problems) console.error(`  ${p.file}  ->  route "${p.route}"`)
  console.error('\nAdd them to lib/routes.js with form: true, then register')
  console.error('their URLs in Zoho (Setup > Channels > Webforms > Form')
  console.error('Location URL). See docs/LAUNCH.md.\n')
  process.exit(1)
}

console.log(`form-page guard: ${FORM_ROUTES.length} form routes, all registered`)
```

- [ ] **Step 6: Wire it into `pnpm test`**

In `package.json`, change:

```json
"test": "node --test"
```

to:

```json
"test": "node --test && node scripts/check-form-pages.mjs"
```

- [ ] **Step 7: Prove the guard actually catches a problem**

```bash
mkdir -p app/tmp-guard-check
printf "import { ContactForm } from '@/components/sections/ContactForm'\nexport default function P(){return <ContactForm />}\n" > app/tmp-guard-check/page.jsx
pnpm test; echo "exit=$?"
```
Expected: non-zero exit, naming `app/tmp-guard-check/page.jsx -> route "/tmp-guard-check"`.

```bash
rm -rf app/tmp-guard-check
pnpm test 2>&1 | tail -2
```
Expected: passes again.

- [ ] **Step 8: Verify**

```bash
pnpm test && pnpm lint && pnpm build
```

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "$(cat <<'EOF'
feat: derive the sitemap from routes and guard form-page registration

The sitemap had eight hardcoded entries; the site is about to have twenty
routes. Deriving it means a page cannot be added without appearing in it, and
a test asserts the two agree.

The form-page guard closes the failure we hit twice: Zoho validates the
submitting page's URL per page, so a page not registered in the Form Location
URL list creates leads silently without ever confirming to the visitor.
Nothing on the site surfaces that. The guard turns it into a build failure
naming the file and the route to register.

Verified by adding a throwaway page, watching the build fail with the right
message, and removing it.

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 5: Move the six residential services under `/residential/`

**Files:**
- Move: `app/{smart-home,home-theatre,audio,network,acoustic,support}/` → `app/residential/<same>/`
- Modify: each moved `page.jsx` — `canonical`, `openGraph.url`, and the `../content` import depth

**Interfaces:**
- Consumes: `SITE_URL` from `lib/site.js` (already imported by each page)
- Produces: the six `/residential/*` routes that `lib/routes.js` already declares

Each page currently imports shared nav/footer copy with `from '../content'`. One directory deeper, that becomes `'../../content'`. Missing this is a build error, not a silent bug, so the build will catch it.

- [ ] **Step 1: Move the directories with git so history follows**

```bash
mkdir -p app/residential
for d in smart-home home-theatre audio network acoustic support; do
  git mv "app/$d" "app/residential/$d"
done
git status --short | head -20
```

- [ ] **Step 2: Fix the shared-content import depth**

```bash
sed -i "s|from '../content'|from '../../content'|" app/residential/*/page.jsx
grep -rn "from '\.\./content'" app/residential/ || echo "all import paths updated"
```

- [ ] **Step 3: Update canonical and og:url in each page**

For each of the six, the metadata currently reads (using `audio` as the example):

```js
alternates: { canonical: `${SITE_URL}/audio` },
openGraph: {
  type:        'website',
  url:         `${SITE_URL}/audio`,
```

Change both to `${SITE_URL}/residential/audio`. Apply per file with the matching slug:

```bash
for d in smart-home home-theatre audio network acoustic support; do
  sed -i "s|\${SITE_URL}/$d\`|\${SITE_URL}/residential/$d\`|g" "app/residential/$d/page.jsx"
done
grep -rn 'SITE_URL}/residential/' app/residential/*/page.jsx | wc -l
```
Expected: `12` — two per page.

- [ ] **Step 4: Verify**

```bash
pnpm test && pnpm lint && pnpm build
```
Expected: all pass. The sitemap test now agrees with reality; the form guard sees the six pages at their new routes.

- [ ] **Step 5: Confirm the built routes**

```bash
ls out/residential/
for d in smart-home audio support; do
  grep -o '<link rel="canonical" href="[^"]*"' "out/residential/$d/index.html"
done
```
Expected: six directories; canonicals reading `https://atropos.com.au/residential/<slug>/`

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "$(cat <<'EOF'
refactor: move the six residential services under /residential/

Symmetric /residential/* and /commercial/* URLs are what make the two
verticals read as co-equal. A flat residential tree with commercial nested
beneath it would have signalled residential-as-default, which is the opposite
of the intended structure.

Moved with git mv so file history follows. Each page's shared-content import
went one level deeper, and canonicals and og:urls now carry the vertical.

The old URLs are handled in the next commit; they 404 until then.

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 6: Generate stub pages for the six old URLs

**Files:**
- Create: `scripts/build-stubs.mjs`
- Modify: `package.json` (run stubs as part of `build`)
- Modify: `.gitignore` (ignore generated stub output in `public/`)

**Interfaces:**
- Consumes: `SITE_URL` from `lib/site.js`
- Produces: `public/<old-slug>/index.html` for each moved route

GitHub Pages serves a static export and cannot issue server-side redirects, so each retired path keeps a stub carrying a canonical, a meta-refresh and a visible link — the same pattern already proven on the retired domain.

- [ ] **Step 1: Write the generator**

Create `scripts/build-stubs.mjs`:

```javascript
/**
 * Generates redirect stubs for URLs that have moved.
 *
 * GitHub Pages serves a static export with no server-side redirects, so a
 * retired path needs a real file. Written into public/ before the Next build
 * so the export copies them verbatim.
 */
import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

import { SITE_URL } from '../lib/site.js'

const MOVED = {
  'smart-home':   '/residential/smart-home',
  'home-theatre': '/residential/home-theatre',
  'audio':        '/residential/audio',
  'network':      '/residential/network',
  'acoustic':     '/residential/acoustic',
  'support':      '/residential/support',
}

const page = (to) => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>This page has moved</title>
<link rel="canonical" href="${SITE_URL}${to}/">
<script>location.replace('${SITE_URL}${to}/' + location.search + location.hash)</script>
<meta http-equiv="refresh" content="0; url=${SITE_URL}${to}/">
<style>
  :root { color-scheme: dark }
  body { margin:0; min-height:100vh; display:flex; align-items:center;
         justify-content:center; background:#1f2e30; color:#dee0db;
         font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Arial,sans-serif;
         text-align:center; padding:24px; line-height:1.7 }
  a { color:#c9b89a }
</style>
</head>
<body>
  <main>
    <p>This page has moved.</p>
    <p><a href="${SITE_URL}${to}/">Continue to ${to}</a></p>
  </main>
</body>
</html>
`

for (const [from, to] of Object.entries(MOVED)) {
  const dir = join('public', from)
  mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, 'index.html'), page(to), 'utf8')
  console.log(`stub: /${from}/ -> ${to}/`)
}
```

- [ ] **Step 2: Run it and inspect one**

```bash
node scripts/build-stubs.mjs
cat public/audio/index.html | head -12
```
Expected: six lines of output; the canonical and meta-refresh both reading `https://atropos.com.au/residential/audio/`

- [ ] **Step 3: Wire into the build**

In `package.json`:

```json
"build": "node scripts/build-stubs.mjs && next build"
```

- [ ] **Step 4: Ignore the generated output**

Append to `.gitignore`:

```
# Generated by scripts/build-stubs.mjs
/public/smart-home/
/public/home-theatre/
/public/audio/
/public/network/
/public/acoustic/
/public/support/
```

- [ ] **Step 5: Verify the stubs reach the export**

```bash
pnpm build
for d in smart-home audio support; do
  printf "%-16s " "/$d/"
  grep -o 'url=https://[^"]*' "out/$d/index.html" | head -1
done
```
Expected: each old path exports a stub pointing at its `/residential/` destination.

- [ ] **Step 6: Verify**

```bash
pnpm test && pnpm lint && pnpm build
```

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "$(cat <<'EOF'
feat: generate redirect stubs for the six moved residential URLs

GitHub Pages serves a static export and cannot issue server-side redirects,
so a retired path needs a real file or it 404s. Same pattern already proven
on the retired atroposathome.com.au domain: canonical, meta refresh, and a
visible link for anyone with neither.

Generated at build time rather than committed, so the mapping lives in one
place and the stubs cannot drift from it. The output is gitignored.

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 7: Build the two vertical landing pages

**Files:**
- Create: `app/residential/page.jsx`, `app/residential/content.js`
- Create: `app/commercial/page.jsx`, `app/commercial/content.js`

**Interfaces:**
- Consumes: `SITE_URL`; `NAV`, `CONTACT_SERVICES`, `FOOTER` from `app/content.js`; the existing `PageHero`, `ServiceCards`, `CtaBand`, `ContactForm`, `Nav`, `Footer` components
- Produces: the `/residential` and `/commercial` routes declared in `lib/routes.js`

Each landing page follows the existing service-page shape. `components/sections/ServiceCards.jsx` already exists and is currently unrendered — it is the natural component for a grid of six or nine services and should be used rather than a new one written.

- [ ] **Step 1: Read the component before using it**

```bash
cat components/sections/ServiceCards.jsx
```
Note its exact prop names before writing `content.js` — the plan does not restate them because the file is the authority.

- [ ] **Step 2: Write `app/residential/content.js`**

Export `HERO`, `INTRO`, `SERVICES` (six entries: `{ title, desc, href }` pointing at `/residential/<slug>`), `CTA`. Copy must position residential as one of two verticals, not as the whole business.

- [ ] **Step 3: Write `app/residential/page.jsx`**

Mirror `app/residential/audio/page.jsx` exactly for imports, metadata shape and section order. Metadata:

```js
alternates: { canonical: `${SITE_URL}/residential` },
openGraph: { type: 'website', url: `${SITE_URL}/residential`, description: /* … */ },
```

Render: `Nav`, `PageHero`, service grid, `CtaBand`, `ContactForm`, `Footer`.

- [ ] **Step 4: Write the commercial equivalents**

Same structure, nine services, at `${SITE_URL}/commercial`. Copy is capability-led — named deliverables and coordination points, not adjectives — per the spec's Content section.

- [ ] **Step 5: Verify**

```bash
pnpm test && pnpm lint && pnpm build
ls out/residential/index.html out/commercial/index.html
```
Expected: the sitemap and form-page guards both pass, because `lib/routes.js` already declared these routes.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: add the residential and commercial landing pages

Each vertical needs a page a visitor can be sent to, and commercial needs one
that ranks for commercial intent — someone searching for a managed network in
Hobart will never find us under smart home.

Reuses ServiceCards, which was in the component library unrendered.

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>"
```

---

## Task 8: Restructure the nav

**Files:**
- Modify: `app/content.js` — the `NAV` export only

**Interfaces:**
- Consumes: nothing
- Produces: nothing — `Nav` already supports this shape

`components/layout/Nav.jsx` already renders a dropdown whose parent is itself a link when `href` is present, on both desktop and the mobile drawer. **No component change is required.** This task is data only.

- [ ] **Step 1: Replace the `NAV` export**

```javascript
export const NAV = {
  links: [
    {
      label: 'Residential',
      href:  '/residential',
      children: [
        { label: 'Smart Home Automation',  href: '/residential/smart-home',   desc: 'Lighting, climate, security & control' },
        { label: 'Premium Home Theatre',   href: '/residential/home-theatre', desc: 'Design, acoustics & calibration' },
        { label: 'Full-home Sound',        href: '/residential/audio',        desc: 'Multi-zone distributed audio' },
        { label: 'Network & Connectivity', href: '/residential/network',      desc: 'Reliable, invisible, fast' },
        { label: 'Acoustic Treatment',     href: '/residential/acoustic',     desc: 'Panels, diffusers & room design' },
        { label: 'Ongoing Support',        href: '/residential/support',      desc: 'Remote monitoring & maintenance' },
        { label: 'All residential services', href: '/residential' },
      ],
    },
    {
      label: 'Commercial',
      href:  '/commercial',
      children: [
        { label: 'Building & Room Control',  href: '/commercial/control',       desc: 'Scheduling, occupancy & zoning' },
        { label: 'Meeting & Conference Rooms', href: '/commercial/meeting-rooms', desc: 'Video conferencing & room booking' },
        { label: 'Distributed Audio & Paging', href: '/commercial/audio',       desc: 'Zoned audio, paging & override' },
        { label: 'Managed Networks',         href: '/commercial/networks',      desc: 'Monitored, supported, under SLA' },
        { label: 'Structured Cabling',       href: '/commercial/cabling',       desc: 'Comms rooms, racks & patching' },
        { label: 'Security & Access',        href: '/commercial/security',      desc: 'CCTV, access control & intercom' },
        { label: 'Digital Signage',          href: '/commercial/signage',       desc: 'Screens, scheduling & wayfinding' },
        { label: 'Acoustic Treatment',       href: '/commercial/acoustic',      desc: 'Speech intelligibility & privacy' },
        { label: 'Managed Services',         href: '/commercial/support',       desc: 'Contracted response & monitoring' },
        { label: 'All commercial services',  href: '/commercial' },
      ],
    },
    { label: 'About', href: '/about' },
  ],
  ctaLabel: 'Book a Consultation',
  ctaHref:  '#contact',
}
```

- [ ] **Step 2: Verify**

```bash
pnpm test && pnpm lint && pnpm build
grep -o 'href="/commercial/networks"' out/index.html | head -1
grep -o 'href="/residential/audio"' out/index.html | head -1
```
Expected: both present — the nav renders on every page.

- [ ] **Step 3: Check the mobile drawer renders both groups**

```bash
grep -c 'nav-drawer-group' out/index.html
```
Expected: `2`

- [ ] **Step 4: Commit**

```bash
git add app/content.js
git commit -m "feat: split the nav into Residential and Commercial

Nav already rendered a dropdown whose parent is itself a link, on desktop and
in the mobile drawer, so the split needed no component change — only data.

Each dropdown ends in an All-services link, because a visitor who wants the
overview rather than a specific service otherwise has nowhere to go from the
menu.

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>"
```

---

## Tasks 9–11: The nine commercial service pages

Three tasks of three pages each, so a reviewer can reject one group without blocking the others. Every page follows the same shape.

**Per-page files:**
- Create: `app/commercial/<slug>/content.js` — exports `HERO`, `INTRO`, `FEATURES` (six `{ number, title, desc }`), `FAQ_ITEMS` (five `{ question, answer }`), `CTA`
- Create: `app/commercial/<slug>/page.jsx` — mirrors `app/residential/audio/page.jsx` exactly: same imports, same `metadata` shape with `canonical` and `openGraph.url` at `${SITE_URL}/commercial/<slug>`, same `schemaFaq` JSON-LD block, same section order

**Interfaces:**
- Consumes: `SITE_URL`; `NAV`, `CONTACT_SERVICES`, `FOOTER` from `app/content.js`; `Nav`, `PageHero`, `CtaBand`, `FAQ`, `ContactForm`, `Footer`
- Produces: the nine `/commercial/*` routes `lib/routes.js` already declares

**Copy standard, applying to all nine.** Capability-led with no projects to cite, so credibility comes from specificity: name the deliverable, the sequencing, the standard, the coordination point. "We deliver enterprise-grade solutions" is a failure. "Cat6A to every outlet, tested and certified, with the results handed over as a PDF per port" is the target. Where a commercial page would differ from its residential sibling only by swapping "home" for "office", the page has failed and needs rethinking.

**Draft each page's copy and present it for review before committing** — these describe services the business must then deliver, so no page ships unreviewed.

### Task 9: control, meeting-rooms, audio

- [ ] **Step 1: `/commercial/control`** — building and room control. Brief: scheduling and occupancy-driven automation, multi-tenant and multi-zone, integration with base-building services, handover documentation and who holds the programming credentials afterwards.
- [ ] **Step 2: `/commercial/meeting-rooms`** — meeting and conference rooms. Brief: Teams and Zoom room compatibility, camera and microphone coverage against room geometry, one-touch join, room booking panel integration, the AV/IT boundary and who owns it.
- [ ] **Step 3: `/commercial/audio`** — distributed audio and paging. Brief: zoned audio, paging with emergency override and its interaction with fire systems, background music and the licensing obligation that comes with it commercially.
- [ ] **Step 4:** `pnpm test && pnpm lint && pnpm build`
- [ ] **Step 5:** Present all three pages' copy for review
- [ ] **Step 6:** Commit after approval

### Task 10: networks, cabling, security

- [ ] **Step 1: `/commercial/networks`** — managed networks. Brief: this is the flagship distinction from residential. Monitoring, alerting, SLAs, patching and firmware currency, segmentation for guest and IoT, and an explicit contrast with the install-and-forget residential model.
- [ ] **Step 2: `/commercial/cabling`** — structured cabling and comms rooms. Brief: Cat6A/fibre, testing and certification with per-port results, rack and comms room layout, containment and pathways, and why it must be coordinated at rough-in rather than after sheeting.
- [ ] **Step 3: `/commercial/security`** — CCTV, access control and intercom. Brief: camera coverage planning, retention periods and the storage that implies, access control credentials and integration with existing systems, plus the privacy obligations of workplace surveillance.
- [ ] **Step 4:** `pnpm test && pnpm lint && pnpm build`
- [ ] **Step 5:** Present all three pages' copy for review
- [ ] **Step 6:** Commit after approval

### Task 11: signage, acoustic, support

- [ ] **Step 1: `/commercial/signage`** — digital signage and wayfinding. Brief: screen selection for brightness and duty cycle, content scheduling and who updates it, wayfinding integration, and remote management of a distributed screen estate.
- [ ] **Step 2: `/commercial/acoustic`** — commercial acoustic treatment. Brief: speech intelligibility and speech privacy rather than music performance, open-plan office treatment, meeting room reverberation and its effect on conferencing audio, and coordination with the architect's finishes schedule.
- [ ] **Step 3: `/commercial/support`** — managed services and support. Brief: contracted response times, remote monitoring, scheduled preventative maintenance, asset registers and lifecycle planning, and an explicit contrast with residential's call-us-when-needed model.
- [ ] **Step 4:** `pnpm test && pnpm lint && pnpm build`
- [ ] **Step 5:** Present all three pages' copy for review
- [ ] **Step 6:** Commit after approval

---

## Task 12: Rework the homepage

**Files:**
- Modify: `app/page.jsx`, `app/content.js` (`HERO`, `OFFERINGS`, `ABOUT`, `CTA`)

**Interfaces:**
- Consumes: everything already imported by `app/page.jsx`
- Produces: nothing

The current hero reads *"Your home, elevated"* with the sub-line *"Beautifully integrated technology"* and body copy naming only homeowners. The `OFFERINGS` block lists the six residential services as a `threads-list`.

**Shape:** one unified Atropos hero establishing the business, then immediately two prominent paths — Residential and Commercial — before any service detail. Brand lands first, routing second.

- [ ] **Step 1: Rewrite `HERO` in `app/content.js`**

Unified across both verticals. It must not name only homes, and it must not become so abstract it says nothing — "technology, woven into the building" is the register.

- [ ] **Step 2: Replace `OFFERINGS` with a two-path split**

Two cards rather than six rows: Residential → `/residential`, Commercial → `/commercial`. Each carries a one-line description of that vertical and a sense of its scope. Reuse the existing `threads-list` / `threads-row` markup and classes rather than adding CSS — the spec forbids visual redesign.

- [ ] **Step 3: Update `ABOUT` and `CTA` copy** to cover both verticals.

- [ ] **Step 4: Verify**

```bash
pnpm test && pnpm lint && pnpm build
grep -o 'href="/residential"' out/index.html | head -1
grep -o 'href="/commercial"' out/index.html | head -1
```
Expected: both paths present on the homepage.

- [ ] **Step 5: Present the homepage copy for review, then commit after approval**

---

## Task 13: Update the docs and the external-configuration checklist

**Files:**
- Modify: `docs/LAUNCH.md`, `README.md`
- Modify (separate repo): `atroposathome-redirect`

**Interfaces:**
- Consumes: `REGISTERED_FORM_URLS` from `lib/routes.js`
- Produces: nothing

- [ ] **Step 1: Print the exact list a human must paste into Zoho**

```bash
node -e "import('./lib/routes.js').then(m => m.REGISTERED_FORM_URLS.forEach(u => console.log(u)))"
```
Expected: nineteen URLs.

- [ ] **Step 2: Replace the Form Location URL block in `docs/LAUNCH.md` section 7** with that list, and note it is generated by the command above rather than maintained by hand.

- [ ] **Step 3: Add a note to `docs/LAUNCH.md`** that `lib/routes.js` is the source of truth, that `pnpm test` fails if a form-bearing page is unregistered in it, and that **no automated check can see the Zoho side** — that step stays manual.

- [ ] **Step 4: Update `README.md`'s Structure section** for `app/residential/`, `app/commercial/`, `lib/routes.js` and `scripts/`.

- [ ] **Step 5: Update the `atroposathome-redirect` repository.** Its per-route stubs point at `atropos.com.au/audio/` and siblings, which are now themselves stubs. Re-point them at the `/residential/*` destinations so a visitor from the outreach emails takes one hop, not two.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "docs: record the dual-vertical structure and the Zoho registration list

The Form Location URL list is now generated from lib/routes.js rather than
maintained by hand, because it grew from eight entries to nineteen and each
missing one is invisible from the site.

States plainly that no automated check can see the Zoho side. The test proves
our list matches our pages; a human still has to prove Zoho matches our list.

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>"
```

---

## Post-implementation, before merging to `main`

- [ ] `pnpm build && npx serve out`, then click through: nav dropdowns on desktop and mobile, both landing pages, several service pages, and a real contact-form submission
- [ ] Confirm every old URL redirects: `/smart-home/`, `/home-theatre/`, `/audio/`, `/network/`, `/acoustic/`, `/support/`
- [ ] Register all nineteen Form Location URLs in Zoho **before** merging — merging deploys, and until they are registered the form creates leads without confirming them
- [ ] Submit the updated sitemap in Search Console

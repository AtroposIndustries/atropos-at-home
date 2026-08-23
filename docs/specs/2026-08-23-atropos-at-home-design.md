# Atropos at Home — standalone static site

**Date:** 2026-08-23
**Status:** Approved design, ready for implementation planning

## Context

Atropos is resuming after several months dormant. The business is consolidating
onto the Atropos at Home offering; Atropos Technologies is being dissolved as a
separate trading identity. Atropos Industries Pty Ltd remains the parent company
so the group can expand again later.

The existing `atropos-monorepo` holds four Next.js 14 apps (`technologies`,
`home`, `industries`, `licensing`) sharing a `packages/ui` component library,
deployed as Docker images to GCP Artifact Registry and Cloud Run, with Terraform
managing the GitHub Actions workload-identity setup.

This design forks the At Home app into its own repository as a purely static
site hosted on GitHub Pages, and retires the GCP delivery chain.

### Verified current state

Established by inspection and DNS queries on 2026-08-23:

- `atroposathome.com.au` is registered but **does not resolve**. It is delegated
  to Google Cloud DNS (`ns-cloud-c1..c4.googledomains.com`); the managed zone
  behind that delegation has been deleted, so the nameservers refuse queries —
  a lame delegation returning SERVFAIL. The site is entirely offline.
- `atropostechnologies.com.au` is in the same state on `ns-cloud-e*`.
- `atropos.com.au` resolves via `ns1/2/3.nameserver.net.au` to `34.50.153.87`, a
  Google Cloud address. TCP 443 accepts, but TLS fails and nothing serves. This
  is a **dangling DNS record pointing at a released GCP IP** — a takeover risk
  if that address is reallocated. Out of scope here, tracked as a side-item.
- The At Home app has **no static-export blockers**: no `next/image`, no dynamic
  routes, no `cookies()`/`headers()`, no `generateStaticParams`, no server-only
  APIs anywhere in the app or the UI package.
- The only server dependency is `apps/home/app/api/contact/route.js`, which
  sends mail via the Microsoft Graph API and optionally POSTs a lead to a Zoho
  endpoint held in `ZOHO_ENDPOINT`.

## Goals

1. A single-purpose repository containing only the Atropos at Home site.
2. Fully static output deployable to GitHub Pages, with no server runtime.
3. Contact-form enquiries land in Zoho CRM without a third-party form service
   and without changing the form's visual design.
4. No remaining reference to Atropos Technologies anywhere in the site or its
   git history.
5. Atropos Industries retained as the parent company in structured data and
   `llms.txt`.

## Non-goals

- Redesigning or rewriting page copy. This is a migration and a cleanup.
- Migrating the Technologies or Industries sites anywhere. They are retired.
- Rebuilding on a lighter framework. Next.js static export is sufficient.
- Restoring `atropos.com.au` to service.

## Decisions

| # | Decision | Rationale |
|---|----------|-----------|
| 1 | Flatten to a single app; dissolve the pnpm/turbo workspace | One consumer does not justify a package boundary, a second `package.json`, or `transpilePackages` |
| 2 | New repository, fresh git history, one initial commit | GitHub Pages on the Free plan requires a public repo; a preserved history would keep the Technologies site, the Graph mail code and the Terraform publicly recoverable |
| 3 | Repository under the `AtroposIndustries` org | Industries remains the parent entity |
| 4 | Next.js `output: 'export'` | Smallest change from the working site; the app is already free of export blockers |
| 5 | Zoho CRM Web-to-Lead, posted into a hidden iframe | Native to the CRM already in use, no third party, no server, no running cost, and the existing form design survives |
| 6 | Go straight to the custom domain; no `*.github.io` staging | Avoids adding then removing `basePath` and rewriting every absolute URL twice. There is no live site to keep up during cutover |
| 7 | Purge Atropos Technologies only; retain Industries | Industries is a real, continuing parent company |

## Architecture

### Repository layout

```
atropos-at-home/
├── app/
│   ├── page.jsx  layout.jsx  robots.js  sitemap.js  favicon.ico
│   ├── about/  smart-home/  home-theatre/  audio/
│   ├── network/  acoustic/  support/  review/
├── components/
│   ├── layout/     Nav, Footer
│   ├── sections/   HeroHome, AboutHome, ContactForm, ReviewWizard, …
│   └── ui/         Button, SectionLabel, Divider, CustomCursor
├── hooks/          useScrollReveal, useNavScroll
├── lib/            theme-context, circuit-pulses, zoho-form
├── styles/         base.css, home-theme.css, local.css
├── public/         img/, llms.txt, CNAME, .nojekyll
├── .github/workflows/deploy.yml
├── next.config.js  jsconfig.json  package.json
```

`app/api/` is deleted entirely. Imports move from `@atropos/ui` to the `@/`
path alias declared in `jsconfig.json`.

### Removed from the monorepo

`apps/technologies`, `apps/industries`, `apps/licensing`, `packages/` as a
directory, `Dockerfile`, `DockerfileHome`, `DockerfileTech`, `cloudbuild.yaml`,
`terraform/`, `.github/workflows/build-and-push.yaml`, `turbo.json`,
`pnpm-workspace.yaml`.

`.npmrc` (`shamefully-hoist=true`, `node-linker=hoisted`) exists to make pnpm's
symlinked store behave. **Resolved by experiment on 2026-08-23: it is still
required** even with the workspace gone — without it, `next dev`'s require-hook
fails under pnpm on Windows. The file is retained.

The `.gitignore` is rewritten for a single Next app: `node_modules`, `.next`,
`out`, `.env*`, editor and OS noise. The Terraform block goes.

### UI library

**The component library carries over intact.** A medium amount of redesign is
expected once the site is deployed, and unused source is far cheaper to keep
than to re-derive later. Components not currently rendered by any page —
`PortfolioGrid`, `ServiceCards`, `Ticker`, `Strips`, `OfferingCards`,
`ProcessSteps`, `Testimonial` — are retained deliberately, not by oversight.

Two consequences follow, since some of that library is Technologies-branded and
goal 4 says no reference to Atropos Technologies survives.

**Renamed, not deleted** — layout and palette assets worth keeping for the
redesign, with the brand name removed:

| From | To |
|------|----|
| `HeroTech` | `HeroSplit` |
| `AboutTech` | `AboutSplit` |
| `styles/tech-theme.css` | `styles/alt-theme.css` |

Renames must update `index.js` exports and any internal references. `alt-theme.css`
is not imported by any layout; it is kept as a palette reference only.

**Deleted** — the two cases where nothing is worth preserving:

- `ChatWidget` (plus `chat-widget-state.js` and its test). Its welcome copy names
  the Atropos Technologies assistant, it hardcodes `atropostechnologies.com.au`,
  and it POSTs to an `/api/chat` route that cannot exist under static export. It
  is not revivable on Pages without a backend.
- The `TECH_*` sentence banks in `ReviewWizard` (~130 lines). These are
  IT-services review copy — advisory, cloud, managed services, security — with no
  application to home AV.

`styles/coming-soon.css` is deleted; it belonged to the Industries holding page.

`lib/theme-context.jsx` is retained as a thin home-only provider. The `isHome`
branches in `Nav`, `Footer` and `Button` are left in place; removing the brand
abstraction entirely is deferred so this migration stays reviewable, and the
redesign may want those branches anyway.

### Static export configuration

```js
// next.config.js
module.exports = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
}
```

`trailingSlash: true` emits `/about/index.html` rather than `/about.html`, which
is what GitHub Pages serves correctly without rewrite rules.

Two files in `public/` are load-bearing:

- **`.nojekyll`** — without it GitHub runs Jekyll, which ignores
  underscore-prefixed directories, so `_next/` is never published and the site
  loads with no CSS or JS. This is the most common Next-on-Pages failure.
- **`CNAME`** containing `atroposathome.com.au` — keeps the custom domain
  attached across deploys. A domain set only in repository settings is wiped by
  Actions-based deploys.

`404.html` is emitted by the export automatically and picked up by Pages.

`app/robots.js` and `app/sitemap.js` are retained unchanged. **Verified in `out/`
on 2026-08-23: Next does generate both as static files under `output: 'export'`.**
`out/sitemap.xml` and `out/robots.txt` are present with correct content.

### Deployment

`.github/workflows/deploy.yml`, triggered on push to `main`:

`actions/checkout` → setup Node 20 + pnpm → `pnpm install` → `pnpm build` →
`actions/upload-pages-artifact` with `path: out` → `actions/deploy-pages`.

Permissions: `pages: write`, `id-token: write`. No GCP, no Docker, no Terraform.
The only build-time configuration is the public review URL (see below).

### DNS

Move the `atroposathome.com.au` delegation off the dead Google Cloud DNS zone to
Synergy Wholesale, then:

| Type | Name | Value |
|------|------|-------|
| A | `@` | `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` |
| AAAA | `@` | `2606:50c0:8000::153`, `8001::153`, `8002::153`, `8003::153` |
| CNAME | `www` | `atroposindustries.github.io` |

Verify the domain in the `AtroposIndustries` organisation settings **before**
attaching it to the repository, per GitHub's takeover-prevention guidance. Then
enable Enforce HTTPS once the certificate issues (up to 24 hours).

Apex A records are used rather than ALIAS/ANAME, so no special provider support
is required.

## Contact form

`ContactForm` keeps its markup, styling and step logic. Only the submit path
changes.

### Mechanism

The Zoho Web-to-Lead endpoint sends no `Access-Control-Allow-Origin` header, so
a `fetch()` from the browser is blocked. A native form submission is a
navigation rather than an XHR, so CORS does not apply. The form therefore uses:

- a real `action` pointing at the `.com.au` data-centre Web-to-Lead endpoint,
  `method="POST"`, and `target="zoho-sink"`;
- the three mandatory Zoho hidden inputs — `xnQsjsdp`, `xmIwtLD`, `actionType` —
  plus `returnURL`. Removing any of these breaks the form;
- Zoho's required field `name` attributes on the five fields the form actually
  renders: `First Name`, `Last Name`, `Email`, `Phone`, `Description`. Visible
  labels, classes and CSS are unchanged;

  **Note:** `ContactForm` accepts a `services` prop, and the homepage passes
  `CONTACT_SERVICES` to it, but the component never renders a dropdown — the
  prop is dead. No `LEADCF*` custom-field mapping is therefore needed. Adding a
  service dropdown would be a design change and is out of scope; the dead prop
  and its `CONTACT_SERVICES` constant are left in place for the redesign to pick
  up. A `Lead Source` hidden input set to `Atropos at Home - Contact Form`
  preserves the channel tagging the old API route sent to Zoho;
- a hidden `<iframe name="zoho-sink">` whose `load` event advances the UI to the
  existing success state;
- a honeypot input hidden via CSS, plus Zoho's own captcha enabled on the
  webform. The form ID and secret are public in page source, so the endpoint is
  publicly submittable and needs both.

### Accepted limitation

The browser cannot read a cross-origin response. A Zoho-side rejection is
therefore indistinguishable from success in the visitor's UI. Mitigation is on
the Zoho side: a notification rule on Lead Create means an absent email is the
signal that something has broken. If stronger guarantees are needed later, a
Cloudflare Worker calling the Zoho REST API is a drop-in replacement for the
submit path and this design stays compatible with that change.

### Moved into Zoho

- Internal enquiry notification → workflow rule on Lead Create.
- Branded acknowledgement to the enquirer → auto-response rule.

The Microsoft Graph code and the `AZURE_TENANT_ID`, `AZURE_CLIENT_ID`,
`AZURE_CLIENT_SECRET`, `MAIL_SENDER` and `ZOHO_ENDPOINT` variables are deleted.

### Scaffolding now, wiring later

Per the agreed sequencing, the full mechanism is built now with the
account-specific values as clearly-marked placeholders in a single
`lib/zoho-form.js` config export, so going live is a matter of filling in the
three values in the table below. The webform's "accept submissions from" domain
must be set to `atroposathome.com.au` in Zoho before launch.

### Configuration to supply before launch

| Value | Where |
|-------|-------|
| `xnQsjsdp` (form ID) | `lib/zoho-form.js` |
| `xmIwtLD` (form secret) | `lib/zoho-form.js` |
| Accepted domain + captcha | Zoho CRM webform settings |
| Lead Create notification + auto-response rules | Zoho CRM workflow settings |

## Brand changes

Atropos Technologies is removed. Atropos Industries is retained as parent.

| Location | Change |
|----------|--------|
| `content.js` `FOOTER.sisterName` / `sisterHref` | Removed, and removed from all nine `<Footer>` call sites. **`Footer`'s prop signature keeps them** — the props are brand-neutral (nothing in `Footer.jsx` names Atropos Technologies), the component guards on `{sisterName && ...}` so nothing renders, and the decision to retain the library intact for the redesign covers this too. Superseded the original "loses the sister props" wording, which predated that decision. |
| `layout.jsx` `sameAs` LinkedIn | `atropos-industries` → `atroposptyltd`, correcting an existing mismatch with the footer |
| `layout.jsx` `parentOrganization` | Retained |
| `layout.jsx` `email` | `hello@atropos.com.au` retained — all group mail routes to this domain |
| `llms.txt` parent-company line and email | Retained |
| UI library | Retained intact; tech-branded pieces renamed, `ChatWidget` and the `TECH_*` review banks deleted (see UI library above) |

The word "technology" appears throughout the page copy ("Technology that
disappears", "Beautifully integrated technology"). This is brand voice, not a
reference to Atropos Technologies, and is left untouched.

**Known loose end:** `parentOrganization` references
`https://atropos.com.au/#organisation`, and `atropos.com.au` currently serves
nothing. The reference is semantically correct and is retained by decision, but
will not resolve to a real organisation record until that domain serves again.

## Retained features

The `/review` wizard (At Home sentence banks only), `CustomCursor`, Google
Analytics property `G-8RGK41Y2L5`, and `llms.txt` plus the schema.org
`LocalBusiness` and `Service` graph.

`/review` reads `NEXT_PUBLIC_GOOGLE_REVIEW_URL_HOME`, which under static export
is baked in at build time and must be provided as a GitHub Actions variable.
`NEXT_PUBLIC_GOOGLE_REVIEW_URL` (the Technologies fallback) is dropped.

## Testing

No test runner is currently wired up — `chat-widget-state.test.mjs` exists but
nothing invokes it. Add `node --test` as the `test` script.

The submit-path logic is the only genuinely new logic, so it is extracted into
`lib/zoho-form.js` as pure functions and driven by tests:

- form values map to the correct Zoho field names;
- required-field and email-format validation matches current behaviour;
- a filled honeypot suppresses submission;
- the submit state machine transitions idle → submitting → success on the
  iframe `load` event, and cannot double-submit.

Manual verification before the domain is pointed:

1. `pnpm build`, then serve `out/` with a static server.
2. Walk all nine routes and confirm each renders with styles and JS intact.
3. Confirm `out/.nojekyll`, `out/CNAME`, `out/404.html`, `out/sitemap.xml` and
   `out/robots.txt` all exist.
4. Grep **the source tree, not just `out/`**, for `atropostechnologies`,
   `Atropos Technologies`, `HeroTech`, `AboutTech` and `tech-theme` — expect no
   matches. Do **not** grep for `sister`: `Footer`'s retained sister props are
   brand-neutral plumbing, so that pattern only produces a false failure. Grepping only the build would give a false pass, because
   the retained-but-unused components are tree-shaken out of it.
5. Submit the form and confirm a Lead appears in Zoho CRM.

Because the library keeps components no page renders, `next build` will not
type-check or exercise them. A lint pass over the whole `components/` tree is
the only thing standing between a broken rename and a surprise during the
redesign, so `pnpm lint` must cover the directory and pass.

## Sequencing

1. Create the new repository and migrate the tree; get it building locally.
2. Static export configuration and the Pages workflow.
3. Brand purge and UI pruning.
4. Zoho form scaffolding with placeholders, plus its tests.
5. Verification pass.
6. Zoho account configuration and DNS cutover — requires the values above.

Steps 1–5 need nothing from outside the repository. Step 6 is gated on the Zoho
form IDs and the DNS move.

## Open items

- Zoho form ID and form secret.
- Confirm `atroposptyltd` is the live LinkedIn page.
- Side-item, outside this scope: remove or repoint the dangling
  `atropos.com.au` → `34.50.153.87` A record.

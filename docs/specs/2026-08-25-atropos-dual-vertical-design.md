# Atropos — dual-vertical rebrand

**Date:** 2026-08-25
**Branch:** `rebrand-atropos`
**Status:** approved, not yet implemented
**Supersedes in part:** `2026-08-23-atropos-at-home-design.md`

## Context

The business has rebranded from Atropos at Home to a single **Atropos**
identity serving both residential and commercial clients. The domain move to
`atropos.com.au` is done (`LAUNCH.md` section 7). The site itself has not
moved: it carries 32 "Atropos at Home" mentions, uses the At Home lockup logo,
and every page speaks only to homeowners.

This document covers the site catching up with the brand.

## Goals

1. No reference to "Atropos at Home" anywhere a visitor or a machine can read.
2. Residential and commercial presented as co-equal verticals, not a core
   business with a bolt-on.
3. The distinction between verticals is substantive, reflecting genuine
   differences in delivery — not the same copy with nouns swapped.
4. No existing URL 404s.
5. The contact form cannot silently stop confirming when pages are added.

## Non-goals

- Visual redesign. Layout, components and styling are unchanged; this is
  structure and copy.
- Case studies or a portfolio. There is no commercial project to show yet, and
  inventing one is not an option. Commercial pages are capability-led.
- Renaming the repository. Deferred; GitHub redirects the old name and the
  rename belongs with a quieter moment.

## Decisions

| # | Decision | Why |
|---|----------|-----|
| 1 | Full nav split: RESIDENTIAL and COMMERCIAL | Chosen over a single nav with a commercial entry point. Commercial buyers self-select immediately, and commercial search intent gets its own pages |
| 2 | `/residential/*` and `/commercial/*` | Symmetric URLs match the co-equal structure. A flat residential tree with nested commercial would signal residential-as-default |
| 3 | Unified homepage hero, then a two-path split | Brand lands before routing. A pure chooser wastes the strongest page and gives search engines a thin homepage |
| 4 | Contact form stays on every page, guarded by CI | Removing it costs enquiries. The guard removes the failure class instead |
| 5 | Nine commercial services against six residential | Honest asymmetry. Cabling, security and signage have no residential equivalent |
| 6 | `atropos-hero-ash.svg` keeps its misleading name | The Zoho welcome email template references it by that path. Renaming breaks the header of every welcome email |

## Information architecture

```
/                            unified hero, then two-path split
/about/
/review/                     unchanged — carries no contact form

/residential/                vertical landing
  smart-home/   home-theatre/   audio/
  network/      acoustic/       support/

/commercial/                 vertical landing
  control/      meeting-rooms/  audio/
  networks/     cabling/        security/
  signage/      acoustic/       support/
```

Twenty routes, up from nine. Nineteen carry the contact form — everything
except `/review/`.

### Navigation

Replaces the single "Our Services" dropdown:

- **RESIDENTIAL** — six services, then "All residential services" → `/residential/`
- **COMMERCIAL** — nine services, then "All commercial services" → `/commercial/`
- **ABOUT**
- CTA: "Book a Consultation" → `#contact` (unchanged)

### Commercial service mapping

| Residential | Commercial | Substantive difference |
|-------------|------------|------------------------|
| Smart Home Automation | Building & room control | Scheduling, occupancy, multi-tenant zoning |
| Premium Home Theatre | Meeting & conference rooms | Video conferencing, room booking, platform compatibility |
| Full-home Sound | Distributed audio & paging | Zoned paging, emergency override, background music licensing |
| Network & Connectivity | Managed networks | **Monitoring, SLAs, an ongoing managed relationship** rather than install-and-forget |
| Acoustic Treatment | Acoustic treatment | Speech intelligibility and privacy rather than music performance |
| Ongoing Support | Managed services & support | Contracted response times rather than call-us-when-needed |
| — | Structured cabling & comms rooms | No residential equivalent |
| — | CCTV, access control & intercom | No residential equivalent |
| — | Digital signage & wayfinding | No residential equivalent |

The networks row is the model for the whole split. Where two pages would differ
only by swapping "home" for "office", the split has failed.

## URL migration

Six existing URLs move under `/residential/`. GitHub Pages serves a static
export and cannot issue server-side redirects, so each old path keeps a
generated stub carrying `<link rel="canonical">` to its new location plus a
meta-refresh and a visible link — the same pattern as the retired domain.

| Old | New |
|-----|-----|
| `/smart-home/` | `/residential/smart-home/` |
| `/home-theatre/` | `/residential/home-theatre/` |
| `/audio/` | `/residential/audio/` |
| `/network/` | `/residential/network/` |
| `/acoustic/` | `/residential/acoustic/` |
| `/support/` | `/residential/support/` |

`/about/` and `/review/` do not move.

**The `atroposathome-redirect` repository must be updated too.** Its per-route
stubs currently point at `atropos.com.au/audio/` and siblings, which will
become stubs themselves — a visitor from the 2026-08-23 outreach emails would
take two hops, or land on a dead path if the old stubs are ever removed. Point
them at the `/residential/*` destinations directly.

## Brand and logo

**32 mentions of "Atropos at Home" across 14 files.** These are not a blind
find-and-replace: they appear as prose, as JSON-LD `name` and `alternateName`
values, as `alt` text, and in `llms.txt`. Each needs reading in context —
some become "Atropos", some need the sentence rewritten because it assumes a
residential-only business.

**The logo** switches from `atropos-at-home-ash.svg` to `atropos-hero-ash.svg`
in `Nav` and `Footer` (18 references). The two files are the same 13 paths; the
At Home lockup adds a `<text>` element rendering "AT HOME" in Lexend. Dropping
it also removes a latent fragility, since that text rendered in a fallback font
wherever Lexend was unavailable.

## Content

**Residential pages move largely intact.** The copy is good and remains true.
Edits are limited to removing "at Home", and adding framing that positions the
page within a vertical rather than as the whole business.

**Nine commercial pages are written from scratch**, each mirroring the
residential structure: hero, intro, features, process, FAQ, CTA, contact form.
Drafted for review — nothing ships unreviewed, because these describe services
the business must then deliver.

Commercial copy is capability-led and must earn credibility through
specificity: named deliverables, sequencing, standards and coordination points,
rather than adjectives. With no projects to cite, vague commercial copy reads
as a company that has not done the work.

## Testing

The existing 41 tests stay. Two additions:

**Form registration guard.** Walks `app/**/page.jsx`, finds every page
rendering `<ContactForm`, and fails the build if any is absent from a
documented list of URLs registered in Zoho. Zoho validates the submitting
page's URL per page; an unregistered page still creates the lead but never
confirms it to the visitor, and nothing surfaces that. Nineteen pages makes
this untenable to track by eye. The test cannot verify the Zoho side — only
that our list and our pages agree — so the list's accuracy against Zoho remains
a manual step, called out in `LAUNCH.md`.

**Sitemap coverage.** Asserts every route appears in `app/sitemap.js`. Twenty
routes is past the point of maintaining that list reliably by hand.

## Sequencing

| Phase | Work | Ships alone |
|-------|------|-------------|
| A | Rename and logo swap | Yes |
| B | Route restructure, residential move, stub pages, nav | Yes |
| C | Nine commercial pages | Yes, once written |
| D | Homepage rework | Yes |
| E | Zoho re-registration, redirect-repo update | Follows B and C |

Phase A is mechanical and carries no structural risk, so it lands first and
independently. Phase C is the bulk of the effort.

Phase E cannot be automated from here and must follow whichever of B and C
introduced the URLs it registers.

## Risks

**Nineteen Zoho Form Location URLs, registered by hand.** The CI guard keeps
our own list honest but cannot see Zoho. Every URL change means manual
re-registration, and the failure is invisible from the site — leads arrive,
visitors see nothing.

**Commercial launches without proof.** Nine capability pages with no projects
behind them. Mitigated by specificity, not by claims.

**The homepage rework touches the strongest page on the site.** It is the only
page with meaningful inbound attention, and the current hero works.

**Twenty pages for a two-person business.** Each is a page to keep true as the
business changes. Worth stating plainly: the split doubles the maintenance
surface, and that cost recurs.

## External configuration

Outside the codebase, and silent when wrong:

- Zoho webform **Form Location URL** — one per form-bearing page, 19 after this
- Zoho **Action on Submission** — unchanged, already `atropos.com.au`
- The `atroposathome-redirect` repository's per-route stubs
- GA4 and Search Console — no change; routes are additive within one property

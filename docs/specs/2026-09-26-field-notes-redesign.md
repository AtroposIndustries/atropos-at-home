# Atropos — "Field Notes" visual redesign

**Date:** 2026-09-26
**Branch:** `redesign-field-notes`, cut from `restructure-services`
**Status:** implemented; shipped to `main` 2026-09-26
**Design source:** the canvas "Atropos Redesign Directions", direction A
(homepage desktop and phone, phone menu, Home Theatre desktop and phone)

## Context

The site read as generic generated design: uppercase tracked eyebrows over
every heading, numbered cards (`01`–`08`), two-line headlines with an
italic accent phrase, light-weight letter-spaced body text, gold on
charcoal, and the same hero → cards → CTA band → form rhythm on every page.

Three directions were drawn; A was chosen — light, editorial, serif display
over a plain sans, lists and rules instead of cards.

Copy is not being rewritten. Every string still comes from the `content.js`
beside its page; the changes below are structural.

## Decisions

| # | Decision | Why |
|---|----------|-----|
| 1 | Warm paper ground `#F3F0EA`, ink `#1B2321`, one accent (gum `#3D5759`); dark ink only for the footer | One restrained palette instead of charcoal, gold, gum and mist competing |
| 2 | Newsreader (display, headings, pull text) over Instrument Sans (UI and body). Cormorant Garamond and Lexend are dropped | A serif with real text sizes, and a sans that reads at 16–18px without letter-spacing |
| 3 | No eyebrow labels, no numbered items, no italic accent lines | These were the tells. Where a label is needed it is a plain bold line |
| 4 | Services render as ruled link lists (name + arrow), features as a two-column ruled list | Scannable on a phone, no card chrome |
| 5 | The CTA band is folded into the contact section on every page | Its only button jumped to the form directly below it. Each page's CTA title and body become the form's heading and intro |
| 6 | Desktop nav keeps plain-label dropdowns (hover and keyboard focus). The phone menu is a full-screen list with every service visible, no accordion | Nine services fit one screen; an accordion costs a tap for nothing |
| 7 | The phone number stays in the nav and the phone menu | It was there before and a trades business gets calls |
| 8 | Header is sticky, not fixed-over-hero | There is no full-bleed hero to sit on any more |
| 9 | ~~Home Theatre's intro is split into an intro and three steps~~ — **reversed 2026-10-03**: the steps were removed. Home Theatre keeps only the first half of the intro, like the other service pages. Three-step sections now appear only on industry pages | The steps read poorly, and no other residential page had them |
| 10 | No photo slot is rendered on service pages until a real install photo exists | The canvas shows a labelled placeholder; the live site shows nothing rather than a placeholder or an unrelated landscape |
| 11 | The homepage testimonial is **not** shipped | `TESTIMONIAL` has never rendered on this site and cannot be verified as a real client's words. Revisit when there is one |
| 12 | Scroll-reveal animation and the circuit-pulse canvas are not used by the new components | Nothing moves on this site now |

## Structure

- `styles/field-notes.css` — the whole stylesheet: tokens, type, layout,
  nav, footer, form. `app/layout.jsx` imports only this.
- `styles/base.css`, `home-theme.css` and `alt-theme.css`, and the previous
  design's components, hooks and theme context, were deleted on 2026-10-03.
- Rewritten in place (same names, so every page's imports and the
  `<ContactForm` guard in `scripts/check-form-pages.mjs` still hold):
  `Nav`, `Footer`, `ContactForm`. ContactForm's submit logic is unchanged —
  only the markup around the form moves.
- New in `components/sections/`: `PageHeader`, `LinkList`, and
  `ServiceBody.jsx` (`Intro` and `FeatureList`).
- Each page's CTA title and body moved from `page.jsx` into its
  `content.js` (`CTA.title`, `CTA.body`), with `CTA.backLink` / `CTA.otherLink`
  replacing the old `ghostCta`. Item numbers (`number: '01'`) are removed.
- `/review/` loads `styles/review.css`: the wizard rules lifted from
  `base.css`, with the old tokens re-declared under `.review-page`.

### Also dropped with the old design

- The homepage experience strip (`EXPERIENCE_ITEMS`).
- The About page's stat row (TAS / AV / 25+) and its self-attributed pull
  quote. The 25 years is already in the page's text.

## Outstanding

- Real photography for the service pages (decision 10). `PageHeader` takes an
  optional `image`. Home Theatre, Residential and Commercial carry
  illustrative generated images, and About's plans image replaced a landscape,
  until real photos replace them.
- A verified testimonial (decision 11).
- `/review/` keeps the old wizard styling inside the new header and footer.

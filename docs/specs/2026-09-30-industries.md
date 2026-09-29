# Atropos — Industries

**Date:** 2026-09-30
**Status:** overview and Hospitality & tourism built on `main`; four industry pages to write
**Design source:** the canvas "Atropos Redesign Directions", Industries row

## Context

Businesses search by problem and place ("menu board screens Hobart", "clinic
Wi-Fi"), not by service category. Industry pages catch those searches and
give a prospect something specific to read before they call. Research
(Tasmanian employment and business data, visitor economy, competitors'
offerings) picked five industries: hospitality & tourism, offices &
professional services, health & aged care, retail, and education.

## Decisions

| # | Decision | Why |
|---|----------|-----|
| 1 | "Industries", not "Verticals" | Nobody outside the trade says verticals |
| 2 | `/industries/` and `/industries/<slug>/`, `vertical: 'commercial'` in `lib/routes.js` | Short URLs; they are commercial audiences but not services, so the service-count test counts only paths under `/<vertical>/` |
| 3 | Not in the main nav. Linked from the Commercial landing page, the footer's Company column, and each other | The nav is fixed at three items and works on a phone |
| 4 | An industry page is: header, what we do for this industry (links to the service pages), a typical job in three steps, the case study slot, the contact form | Lean. No "where it goes wrong" section — owners already know — and no FAQ, which the site dropped elsewhere |
| 5 | The overview lists all five industries; one without a page is a plain row with no link or arrow (`LinkList` item with no `href`) | The list is honest about scope before every page is written |
| 6 | The case study slot renders nothing until a real job fills it | No placeholders or invented clients on the live site. See below |
| 7 | No photo until there is one (`HERO.image` left unset) | As for service pages, redesign spec decision 10 |

## The case study slot

`components/sections/CaseStudy.jsx` takes one object and returns `null`
without it. Each industry page renders `<CaseStudy study={CASE_STUDY} />`, and
its `content.js` exports `CASE_STUDY = null` until there is a real one:

```js
export const CASE_STUDY = {
  label:  'From a venue we have worked with',
  client: 'The venue name and suburb',        // with their permission
  body:   'What was not working, what we did, and what changed.',
  quote:  'Optional: a line from the client, in their words.',
  image:  { src, alt, width, height },        // optional, a real photo
}
```

Only a real job, with the client's permission to be named, goes in here.

## Adding an industry page

1. Copy `app/industries/hospitality/` to `app/industries/<slug>/` and rewrite
   its `content.js` and metadata.
2. Add `/industries/<slug>` to `lib/routes.js` (`vertical: 'commercial'`,
   `form: true`). The route test fails until it is there, and the sitemap
   picks it up.
3. Give the industry an `href` in `app/industries/content.js`, so its row
   becomes a link.

## Outstanding

- Pages for offices & professional services, health & aged care, retail and
  education.
- A venue photo and a real case study for Hospitality.
- Text review: the fit-out steps commit to working around trading hours and a
  written quote before ordering.

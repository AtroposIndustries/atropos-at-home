# Atropos at Home

The Atropos at Home website — a static Next.js 14 site hosted on GitHub Pages
at [atroposathome.com.au](https://atroposathome.com.au).

## Local development

```bash
pnpm install
pnpm dev          # http://localhost:3001
```

`.npmrc` (`shamefully-hoist=true`, `node-linker=hoisted`) is required for
`pnpm dev` to work on Windows — without it, Next's require-hook fails under
pnpm's default isolated `node_modules` layout. Do not remove it.

## Commands

| Command | What it does |
|---------|--------------|
| `pnpm dev` | Dev server on port 3001 |
| `pnpm build` | Static export into `out/` |
| `pnpm test` | `node --test` over `*.test.mjs` |
| `pnpm lint` | ESLint across `app`, `components`, `hooks`, `lib` |

To check the real deployable output rather than the dev server:

```bash
pnpm build && npx serve out
```

## Structure

```
app/          Routes. Page copy lives in the content.js beside each page.
components/   UI library — layout/, sections/, ui/
hooks/        useScrollReveal, useNavScroll
lib/          Theme context, circuit pulses, Zoho form config
styles/       base.css, home-theme.css, local.css, alt-theme.css
public/       Images, llms.txt, CNAME, .nojekyll, zoho-thanks.html
```

`components/` intentionally contains components no page currently renders. They
are kept for an upcoming redesign — do not remove them as dead code.
`styles/alt-theme.css` is retained but unused for the same reason.

## Editing content

Page copy lives in `content.js` next to the page that uses it, not in the
components. Start there.

## Deployment

Every push to `main` runs `.github/workflows/deploy.yml`: test, lint, build,
publish `out/` to GitHub Pages. There is no server and no container.

One file in `public/` is load-bearing:

- **`zoho-thanks.html`** — the contact form's `returnURL` target; Zoho
  redirects the hidden iframe here after accepting a lead. Deleting it breaks
  the form's success path.

Two others are kept as harmless safeguards, and are **not** what they look like:

- **`CNAME`** does nothing here. It configures the custom domain only for
  branch-based publishing. This site deploys from a GitHub Actions workflow, and
  GitHub's docs are explicit that in that case "no `CNAME` file is created, and
  any existing `CNAME` file is ignored and is not required". **The custom domain
  is set in Settings → Pages, and that setting is authoritative.** The file is
  retained only so the two cannot silently disagree if publishing ever moves to
  a branch. If you change the domain, change it in Settings — editing this file
  achieves nothing.
- **`.nojekyll`** prevents Jekyll from dropping `_next/`, which matters for
  branch-based publishing. Whether Jekyll runs at all on an artifact uploaded by
  `actions/upload-pages-artifact` is not something GitHub documents either way,
  so this is retained untested rather than removed on an assumption. It costs
  nothing; leave it.

## Contact form

The form posts directly to Zoho CRM Web-to-Lead, targeted at a hidden iframe.
Configuration lives in `lib/zoho-form.js`.

**The form ID and secret in that file are still placeholders**, so
`isZohoConfigured()` returns `false`. In that state the form does not submit: it
shows the enquirer `hello@atropos.com.au` instead of a success panel, and logs a
console warning in development. This matters because the POST is cross-origin
and its response unreadable — without the guard, an unconfigured form would show
a success panel for every enquiry and keep none of them. See `docs/LAUNCH.md`
for the two values that still need filling in.

`submitDisposition()` is what decides this. It resolves a submit attempt to
`invalid`, `ignore`, `unavailable` or `send`, and **`send` is the only one the
handler may let through without `preventDefault`** — the native POST is what
gets past the missing CORS headers, so a stray `preventDefault` on that path
silently breaks the form. Anything you add to the submit handler needs to
preserve that. Zoho's captcha must also stay off: enabling it adds a required
field to Zoho's generated form that this hand-built form does not render, which
would make every submission fail — and fail invisibly, for the same unreadable-
response reason.

## Design

`docs/specs/2026-08-23-atropos-at-home-design.md` records why this repository is
shaped the way it is.

# Launch runbook

Everything below is outside the codebase.

**Status as of 2026-08-23:** the site is live at
[atroposathome.com.au](https://atroposathome.com.au) over HTTPS. Sections 3
(GitHub settings) and 4 (DNS) are **done** — domain verified, certificate
issued, HTTPS enforced, all nine routes serving. They are kept below as a
record of the configuration, not as work outstanding.

**Outstanding:** section 1 (the Zoho webform), section 2 (the workflow rules)
and the unticked boxes in sections 5 and 6. Until section 1 is done the contact
form has nowhere to post — it detects this and shows the enquirer
`hello@atropos.com.au` rather than a false success, so enquiries reach you by
email in the meantime.

## 1. Zoho CRM webform

1. Zoho CRM → Setup → Developer Space → Webforms → create a form for the
   **Leads** module.
2. Add the fields: First Name, Last Name, Email, Phone, Description, Lead Source.
3. `Lead Source` is a picklist — Zoho drops a submitted value that is not a
   configured option, silently, with the lead still arriving but unattributed.
   Setup → Modules and Fields → Leads → Lead Source → add the picklist value
   `Atropos at Home - Contact Form` exactly.
4. Set **accept submissions from** to `atroposathome.com.au`. Leaving this
   unrestricted lets anyone post leads into the CRM. Zoho validates `returnURL`
   against this same list, so `zoho-thanks.html` fails without it.
5. **Leave Zoho's captcha off.** It adds a required field to Zoho's own
   generated form; this form is hand-built and renders no such field, so
   enabling captcha rejects every submission — invisibly, because the response
   is cross-origin. Spam is handled by the domain restriction above plus the
   honeypot input. An earlier version of this runbook and the design spec both
   called for captcha; both were wrong.
6. Publish as **HTML source code** and copy the two hidden values:
   - `xnQsjsdp` → `ZOHO_CONFIG.formId` in `lib/zoho-form.js`
   - `xmIwtLD`  → `ZOHO_CONFIG.formSecret` in `lib/zoho-form.js`

`isZohoConfigured()` returns false while either is a placeholder. In that state
the form blocks the submit and shows the enquirer `hello@atropos.com.au` instead
of a success panel, and logs a console warning in development. Replacing both
values is the whole of the code-side work — commit and push, and the deploy
carries it.

## 2. Zoho workflow rules

These replace the emails the retired Microsoft Graph API route used to send:

- **Internal notification** — workflow rule on Lead Create, emailing
  `hello@atropos.com.au`.
- **Acknowledgement to the enquirer** — auto-response rule on the webform.

Set both up. The browser cannot read Zoho's cross-origin response, so a
rejected lead still shows the visitor a success message. An absent notification
email is the only signal that something has broken — which makes rule 1 a
monitoring mechanism, not just a convenience.

## 3. GitHub settings — DONE

Note there are **two** different Settings pages, and both are needed. The
organisation one verifies a domain for the whole org; the repository one
attaches it to this specific site.

**Organisation** — `github.com/organizations/AtroposIndustries/settings/pages`:

- **Verify `atroposathome.com.au`** before attaching it to the repository, via
  the TXT record it gives you. GitHub's own guidance: verification prevents
  domain-takeover attacks. There is no "custom domain" field on this page.

**Repository** — `github.com/AtroposIndustries/atropos-at-home/settings/pages`:

- Build and deployment → Source: **GitHub Actions**. Not "Deploy from a branch",
  which runs Jekyll and will not serve the `out/` artifact.
- Custom domain: **`atroposathome.com.au`**. This is the setting that actually
  attaches the domain — the `CNAME` file in `public/` is ignored under Actions
  publishing. If the field is not visible, the site has not deployed
  successfully yet; deploy first, then set it.
- Enforce HTTPS, once the certificate has issued (up to 24 hours).

**Repository → Secrets and variables → Actions → Variables:**

- `NEXT_PUBLIC_GOOGLE_REVIEW_URL_HOME` — the Google review link. Optional; the
  review page falls back to an inert `#` without it.

### Re-deploying

The `deploy` job is gated on `github.event_name == 'push'`, so the **"Run
workflow"** button (`workflow_dispatch`) builds but does **not** deploy. To
redeploy, either push a commit, or use **"Re-run all jobs"** on a previous push
run, which preserves the original push event.

## 4. DNS — DONE

This was resolved on 2026-08-23: the delegation was moved off the deleted
Google Cloud DNS zone and the records below are live. `www` redirects to the
apex. Retained as the record of what is configured.

| Type | Name | Value |
|------|------|-------|
| A | `@` | `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` |
| AAAA | `@` | `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153` |
| CNAME | `www` | `atroposindustries.github.io` |

HTTPS is enforced and the certificate covers both `atroposathome.com.au` and
`www.atroposathome.com.au`.

## 5. Pre-launch check that has NOT been done

No browser driver was available at any point during implementation, so **nothing
interactive on this site has ever been clicked**. Every route was verified with
curl, and everything statically checkable was checked by reading — the submit
handler's branches, the iframe/target wiring, the Zoho field names, the state
machine's unit tests. What curl cannot see is client-side behaviour, and three
things here are entirely client-side:

**The contact form** — the highest stakes. Once section 1 is done it has no
failure feedback path at all; until then, the only feedback path it has is the
unconfigured fallback, which is itself untested in a browser:

- [ ] Load the page. The success panel must NOT already be showing.
- [ ] Submit the form empty. Inline field errors appear; the page does not navigate.
- [ ] Submit it validly. The success panel appears and the page does NOT navigate away.
- [ ] The Network tab shows a POST to `crm.zoho.com.au`.

While section 1 is still outstanding, the third box behaves differently and is
worth checking in its own right — it is the state the live site is in now:

- [ ] With placeholders still in place, a valid submit shows the
      `hello@atropos.com.au` message, NOT the success panel, and issues no POST.

**The review wizard** at `/review/`:

- [ ] Complete it end to end — rating, highlights, generated text — and confirm it
      produces review copy rather than hanging or erroring.

**The rest:**

- [ ] The custom cursor renders and follows the pointer.
- [ ] The browser console is clean on every route.
- [ ] Confirm whether any Adobe Fonts (Typekit) face served by
      `use.typekit.net/zjg4jao.css` (imported in `styles/home-theme.css` and
      `styles/alt-theme.css`) is actually rendering anywhere on the site. It
      looks likely to be a leftover from the shared monorepo; if nothing on
      the page actually uses one of its faces, the import can be removed.

Do this on the deployed static site, not the dev server — `output: 'export'` is
the artefact that actually ships. The live domain serves exactly that artefact,
so checking there is the real thing; `pnpm build && npx serve out` over a local
build satisfies it equally, being the same artefact served from localhost.

## 6. Post-launch checks

- [x] All nine routes load over HTTPS on the custom domain. *(Verified by curl
      2026-08-23: all nine return 200, `www` redirects to the apex.)*
- [x] `https://atroposathome.com.au/sitemap.xml` and `/robots.txt` resolve.
      *(Verified by curl 2026-08-23, along with `/llms.txt` and
      `/zoho-thanks.html`.)*
- [ ] A real form submission creates a Lead in Zoho CRM.
- [ ] The new Lead's Lead Source reads "Atropos at Home - Contact Form".
- [ ] The internal notification email arrives.
- [ ] The enquirer receives the acknowledgement.
- [ ] Google Analytics (`G-8RGK41Y2L5`) records the visit.

## Outstanding, outside this project

`atropos.com.au` has an A record to `34.50.153.87`, a Google Cloud IP that no
longer serves. That is a dangling DNS record: if the address is reallocated,
someone else can serve content on the apex domain. Repoint or remove it.

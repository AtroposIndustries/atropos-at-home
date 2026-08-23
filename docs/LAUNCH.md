# Launch runbook

Everything below is outside the codebase. The site builds and deploys without
any of it; the contact form and the custom domain do not work until it is done.

## 1. Zoho CRM webform

1. Zoho CRM → Setup → Developer Space → Webforms → create a form for the
   **Leads** module.
2. Add the fields: First Name, Last Name, Email, Phone, Description, Lead Source.
3. Set **accept submissions from** to `atroposathome.com.au`. Leaving this
   unrestricted lets anyone post leads into the CRM.
4. Enable Zoho's captcha. The form ID and secret are public in the page source,
   so the endpoint is publicly submittable.
5. Publish as **HTML source code** and copy the two hidden values:
   - `xnQsjsdp` → `ZOHO_CONFIG.formId` in `lib/zoho-form.js`
   - `xmIwtLD`  → `ZOHO_CONFIG.formSecret` in `lib/zoho-form.js`

`isZohoConfigured()` returns false while either is a placeholder, and the form
logs a console warning in development.

## 2. Zoho workflow rules

These replace the emails the retired Microsoft Graph API route used to send:

- **Internal notification** — workflow rule on Lead Create, emailing
  `hello@atropos.com.au`.
- **Acknowledgement to the enquirer** — auto-response rule on the webform.

Set both up. The browser cannot read Zoho's cross-origin response, so a
rejected lead still shows the visitor a success message. An absent notification
email is the only signal that something has broken — which makes rule 1 a
monitoring mechanism, not just a convenience.

## 3. GitHub repository settings

- Settings → Pages → Source: **GitHub Actions**.
- Settings → Secrets and variables → Actions → Variables: add
  `NEXT_PUBLIC_GOOGLE_REVIEW_URL_HOME` with the Google review link.
- Organisation settings → Pages → **verify `atroposathome.com.au`** before
  attaching it to the repository. GitHub's own guidance: verification prevents
  domain-takeover attacks.

## 4. DNS

The domain is currently delegated to a deleted Google Cloud DNS zone, so it
does not resolve at all. Move the delegation to Synergy Wholesale, then:

| Type | Name | Value |
|------|------|-------|
| A | `@` | `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` |
| AAAA | `@` | `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153` |
| CNAME | `www` | `atroposindustries.github.io` |

Then Settings → Pages → **Enforce HTTPS**, once the certificate issues (up to
24 hours).

## 5. Pre-launch check that has NOT been done

No browser driver was available at any point during implementation, so **nothing
interactive on this site has ever been clicked**. Every route was verified with
curl, and everything statically checkable was checked by reading — the submit
handler's branches, the iframe/target wiring, the Zoho field names, the state
machine's unit tests. What curl cannot see is client-side behaviour, and three
things here are entirely client-side:

**The contact form** — the highest stakes, because it has no failure feedback path:

- [ ] Load the page. The success panel must NOT already be showing.
- [ ] Submit the form empty. Inline field errors appear; the page does not navigate.
- [ ] Submit it validly. The success panel appears and the page does NOT navigate away.
- [ ] The Network tab shows a POST to `crm.zoho.com.au`.

**The review wizard** at `/review/`:

- [ ] Complete it end to end — rating, highlights, generated text — and confirm it
      produces review copy rather than hanging or erroring.

**The rest:**

- [ ] The custom cursor renders and follows the pointer.
- [ ] The browser console is clean on every route.

Do this on the deployed static site, not the dev server — `output: 'export'` is the
artefact that actually ships.

## 6. Post-launch checks

- [ ] All nine routes load over HTTPS on the custom domain.
- [ ] `https://atroposathome.com.au/sitemap.xml` and `/robots.txt` resolve.
- [ ] A real form submission creates a Lead in Zoho CRM.
- [ ] The internal notification email arrives.
- [ ] The enquirer receives the acknowledgement.
- [ ] Google Analytics (`G-8RGK41Y2L5`) records the visit.

## Outstanding, outside this project

`atropos.com.au` has an A record to `34.50.153.87`, a Google Cloud IP that no
longer serves. That is a dangling DNS record: if the address is reallocated,
someone else can serve content on the apex domain. Repoint or remove it.

# Launch runbook

Everything below is outside the codebase.

**Status as of 2026-08-23:** the site is live at
[atropos.com.au](https://atropos.com.au) over HTTPS. Sections 3
(GitHub settings) and 4 (DNS) are **done** — domain verified, certificate
issued, HTTPS enforced, all nine routes serving. They are kept below as a
record of the configuration, not as work outstanding.

**Section 1 is done** — the webform exists and its credentials are wired into
`lib/zoho-form.js`, so the form submits for real.

**Outstanding:**

1. **The Zoho webform still refers to the old domain.** See section 7 — the
   Form Location URL list and Action on Submission both need re-pointing at
   `atropos.com.au`, and neither failure is visible from the site.
2. **Enquirers receive no acknowledgement email**, deliberately — see section
   2. The inherited Technologies welcome email has been disabled; the Atropos
   at Home replacement has not been written yet.
3. The unticked boxes in sections 5 and 6, including the first real end-to-end
   submission. **Nothing here has been submitted through a browser yet.**

## 1. Zoho CRM webform

**This is Zoho CRM's own webform feature — not Zoho Forms (`forms.zoho.com.au`),
which is a separate product.** Zoho Forms builds a hosted form and syncs to CRM
through an integration; it never emits the `xnQsjsdp` / `xmIwtLD` hidden inputs
this site's form is built around. If the generated code does not post to
`crm.zoho.com.au/crm/WebToLeadForm`, you are in the wrong product.

1. Zoho CRM → **Setup → Channels → Webforms** → create a form for the **Leads**
   module. (Zoho's older docs call this Setup → Developer Space → Webforms; the
   menu moved.)
2. Add the fields: First Name, Last Name, Email, Phone, Description, Lead Source.
3. `Lead Source` is a picklist — Zoho drops a submitted value that is not a
   configured option, silently, with the lead still arriving but unattributed.
   Setup → Modules and Fields → Leads → Lead Source → add the picklist value
   `Atropos at Home - Contact Form` exactly.
4. In **Step 2, Specify Form Details**, set **Form location URL** to the
   **full URL of every page carrying the form** — this is validated per page,
   not per domain. See section 7 for the current list. Leaving it unrestricted
   lets anyone post leads into the CRM.
5. Still in Step 2, set the redirect to **redirect to a custom URL** →
   `https://atropos.com.au/zoho-thanks.html`, matching `ZOHO_CONFIG.returnUrl`. Our form also sends `returnURL` as a hidden input;
   check the generated source to see which of the two Zoho actually honours,
   and keep them identical so it cannot matter.
6. **Insert neither captcha.** Zoho offers these as *"Insert Standard Captcha"*
   and *"Insert reCAPTCHA"* — they are form fields you add, so a hand-built form
   that does not render one cannot satisfy it. Inserting either rejects every
   submission, invisibly, because the response is cross-origin. Spam is handled
   by the Form location URL restriction above plus the honeypot input. An earlier
   version of this runbook and the design spec both called for captcha; both
   were wrong.
7. Publish as **Source code** (not Embed, Link or iFrame) and copy the two
   hidden values:
   - `xnQsjsdp` → `ZOHO_CONFIG.formId` in `lib/zoho-form.js` — **done**
   - `xmIwtLD`  → `ZOHO_CONFIG.formSecret` in `lib/zoho-form.js` — **done**

   The generated source is worth reading rather than just harvesting, because
   this form is hand-built and has to match what Zoho expects. What that check
   caught on 2026-08-23:

   - Zoho posts two hidden inputs we did not have: `aG9uZXlwb3Q`
     (base64 `"honeypot"` — Zoho's own decoy) and `zc_gad` (Google Ads click
     id). Both are now mirrored, empty, as `ZOHO_COMPAT_FIELDS`.
   - Zoho's mandatory set is First Name, Last Name, Email, Description, which
     matches our client-side validation exactly, Phone optional.
   - The field names came through readable, not as `LEADCF*` custom fields, so
     no mapping was needed.
   - `Atropos at Home - Contact Form` was already present in the Lead Source
     picklist and pre-selected, so step 3 was already satisfied.
   - No captcha field was emitted, confirming step 6.

   If the form is ever regenerated, re-read the source and re-check these.

`isZohoConfigured()` returns false while either is a placeholder. In that state
the form blocks the submit and shows the enquirer `hello@atropos.com.au` instead
of a success panel, and logs a console warning in development. Replacing both
values is the whole of the code-side work — commit and push, and the deploy
carries it.

## 2. Zoho email notifications

These replace the emails the retired Microsoft Graph API route used to send.
Separate workflow rules turned out to be unnecessary: the webform's own
**Notification** section covers both natively.

- **Internal notification** — `Notify Leads Owner`, **on**. The browser cannot
  read Zoho's cross-origin response, so a rejected lead still shows the visitor
  a success message. An absent notification email is the only signal that
  something has broken, which makes this a monitoring mechanism rather than a
  convenience. Do not switch it off.
- **Acknowledgement to the enquirer** — `Acknowledge Visitor`, **off,
  deliberately**. Deferred on 2026-08-23 until a confirmation email template is
  written.

  As of 2026-08-23 an enquirer therefore receives **no email at all**. The
  site's inline "within one business day" panel is the only acknowledgement.
  That is deliberate, not a defect — but it is the one genuine remaining gap.

### Three places an email to the enquirer can come from

Worth knowing all three, because "no email is configured on the form" does not
mean "no email is sent". This cost real time to work out:

1. **The webform's `Acknowledge Visitor` toggle** — off, as above.
2. **Webform auto-response rules**, at `Setup → Channels → Webforms →
   Auto-Response Rules`. A separate tab from the form. These fire
   independently of the toggle above and several can be active at once.
   Deactivate one with its toggle rather than deleting it — deleting a rule
   associated with a webform disables that form's acknowledgement option.
3. **Zoho CRM Cadences.** These appear on neither the webform screens nor in
   Workflow Rules.

A Cadence inherited from the dissolved Atropos Technologies business was
sending every new lead a Technologies-branded welcome email. It was found and
**disabled on 2026-08-23**; Atropos at Home does not want a nurture sequence at
this stage. Check Cadences first if an unexpected email ever goes out.

Also resolved 2026-08-23: `LAUNCH10` was being written into the Discount Code
field on new leads, fixed Zoho-side.

### If the acknowledgement email is built later

Keep it at **module level** — do not attach it to the webform. Leads arrive by
phone, referral, manual entry and import as well as through the site, and all
of them should be acknowledged. Tying it to the form would make the
acknowledgement a property of one channel rather than of becoming a lead.

One open question if it is ever made unconditional: whether anything other than
Atropos at Home still creates leads in this CRM. The Lead Source picklist still
carries `Atropos Industries`, `Technologies-Zephyrus` and `Atropos Technologies
- Contact Form`. If Industries is still live, an unconditional rule sends its
enquirers an Atropos at Home email — in which case it needs a Lead Source
criterion and one template per brand.

Two other things on that screen are worth knowing:

- **Duplicates are detected on Email** and go to manual approval instead of
  creating a lead, so a returning enquirer's message waits in Leads → Actions →
  **Approve Leads**. Do not assume the owner notification fires for those.
  Meanwhile our form has already shown them a success panel.
- **Assign Owner** is set to Brock Pinnington. Double Opt-in, Cookie Consent
  Management, Visitor Tracking and Request for Approval are all off.

## 3. GitHub settings — DONE

Note there are **two** different Settings pages, and both are needed. The
organisation one verifies a domain for the whole org; the repository one
attaches it to this specific site.

**Organisation** — `github.com/organizations/AtroposIndustries/settings/pages`:

- **Verify the domain** before attaching it to the repository, via
  the TXT record it gives you. GitHub's own guidance: verification prevents
  domain-takeover attacks. There is no "custom domain" field on this page.

**Repository** — `github.com/AtroposIndustries/atropos-at-home/settings/pages`:

- Build and deployment → Source: **GitHub Actions**. Not "Deploy from a branch",
  which runs Jekyll and will not serve the `out/` artifact.
- Custom domain: **`atropos.com.au`**. This is the setting that actually
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

HTTPS is enforced. Note the DNS table above is the **`atropos.com.au`** zone
as of the 2026-08-24 domain move; see section 7.

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
- [x] `https://atropos.com.au/sitemap.xml` and `/robots.txt` resolve.
      *(Verified by curl 2026-08-23, along with `/llms.txt` and
      `/zoho-thanks.html`.)*
- [ ] A real form submission creates a Lead in Zoho CRM.
- [ ] The new Lead's Lead Source reads "Atropos at Home - Contact Form".
- [ ] The internal notification email arrives.
- [ ] The enquirer receives the acknowledgement.
- [ ] Google Analytics (`G-8RGK41Y2L5`) records the visit.

## 7. The 2026-08-24 domain move

The site moved from `atroposathome.com.au` to `atropos.com.au` when the
business rebranded to a single Atropos identity covering residential and
commercial work.

`atropos.com.au` also runs **Microsoft 365 email**. When editing that zone,
never use a bulk "reset" or template operation — the records below must
survive, and losing SPF or DKIM breaks outbound mail silently:

| Record | Value |
|--------|-------|
| `MX` | `atropos-com-au.mail.protection.outlook.com` |
| `autodiscover` CNAME | `autodiscover.outlook.com` |
| `_dmarc` TXT | `v=DMARC1; p=quarantine;` |
| apex TXT | five records: SPF, Zoho, Microsoft, and two Google verifications |

The SPF record already authorises Zoho (`one.zoho.com.au`, `transmail.net.au`),
so CRM-sent mail needs no DNS work.

### Done

- Apex `A` → the four GitHub Pages IPs, replacing a dangling `34.50.153.87`.
- Apex `AAAA` → the four GitHub Pages IPv6 addresses.
- `www` CNAME → `atroposindustries.github.io`, replacing a dangling record
  pointing at a deleted Cloud Run WordPress instance.
- Organisation-level domain verification for `atropos.com.au`.
- Every absolute URL in the codebase, now derived from `lib/site.js`.

### Outstanding

**GitHub Pages allows one custom domain per site.** The moment the repo's
custom domain becomes `atropos.com.au`, `atroposathome.com.au` stops being
served and starts failing. A redirect needs its own mechanism — registrar URL
forwarding, Cloudflare, or a second Pages repo.

**Re-register the Form Location URLs in Zoho.** Validated per page, so every
form-bearing page needs re-pointing. A missed page still creates the lead but
never confirms it to the visitor, and nothing surfaces the failure. The dual-
vertical rebrand took this list from eight entries to nineteen — residential
grew a landing page and six service pages, and commercial's landing page plus
nine service pages are new entirely.

The list below is **generated, not hand-maintained.** Hand-maintaining it is
exactly how a missing entry stays invisible; regenerate it with:

```bash
node -e "import('./lib/routes.js').then(m => m.REGISTERED_FORM_URLS.forEach(u => console.log(u)))"
```

Current output (nineteen URLs):

```
https://atropos.com.au/
https://atropos.com.au/about/
https://atropos.com.au/residential/
https://atropos.com.au/residential/smart-home/
https://atropos.com.au/residential/home-theatre/
https://atropos.com.au/residential/audio/
https://atropos.com.au/residential/network/
https://atropos.com.au/residential/acoustic/
https://atropos.com.au/residential/support/
https://atropos.com.au/commercial/
https://atropos.com.au/commercial/control/
https://atropos.com.au/commercial/meeting-rooms/
https://atropos.com.au/commercial/audio/
https://atropos.com.au/commercial/networks/
https://atropos.com.au/commercial/cabling/
https://atropos.com.au/commercial/security/
https://atropos.com.au/commercial/signage/
https://atropos.com.au/commercial/acoustic/
https://atropos.com.au/commercial/support/
```

`/review/` carries no form and is not needed here.

### What is and is not machine-checked

`lib/routes.js` is the single source of truth for every route, including
which ones carry the contact form (`form: true`). `pnpm test` fails if a page
renders `ContactForm` but its route is missing from `lib/routes.js`
(`scripts/check-form-pages.mjs`), and a filesystem-parity test
(`lib/routes.test.mjs`) fails if a page exists on disk with no declared route,
or a declared route has no page. Between them, the codebase cannot drift from
its own list.

**Nothing in this repository can verify the Zoho side.** Zoho validates the
submitting page's URL per page against the Form Location URL list above, and
that list lives entirely inside Zoho's own configuration — no test, build
step or CI check here can read it back. If a page is missing from that list
in Zoho, the form still creates the lead (the POST succeeds), but the visitor
never sees the success panel, and nothing anywhere signals the mismatch: not
the browser console, not the build, not a monitoring alert. A human must
manually confirm, after any change to the list above, that Zoho's configured
Form Location URLs match it exactly.

**Also outstanding:** Action on Submission → `https://atropos.com.au/zoho-thanks.html`;
the welcome email template's logo `src` and footer links; the GA4 data stream
URL (keep measurement ID `G-8RGK41Y2L5` for continuity); a Search Console
property for the new domain — `atropos.com.au` already carries a
`google-site-verification` TXT, so it may already be verified.

### `ZOHO_CONFIG.leadSource` still reads "Atropos at Home"

`lib/zoho-form.js` sends `leadSource: 'Atropos at Home - Contact Form'` on
every submission — the one place in the codebase the retired brand name is
deliberately still allowed to appear (see the top-level brand rule in this
repo's task instructions). It is **not** simply a naming leftover to clean up:

- `Lead Source` is a Zoho picklist. Zoho **silently drops** a submitted value
  that is not a configured option — the lead still arrives, just unattributed,
  with no error, no console warning, nothing in the Network tab distinguishing
  it from a success. A code-only rename would look like it worked and quietly
  break attribution for every lead.
- The correct order is: **add the new picklist value in Zoho first** (Setup →
  Modules and Fields → Leads → Lead Source), confirm it is selectable, **then**
  change the string in `lib/zoho-form.js` to match it exactly, then re-register
  nothing (this does not touch Form Location URLs).
- Until that Zoho-side step happens, leave the string as-is. Every form-bearing
  page's rendered source carries the old brand name in this one field, and that
  is the correct, intentional state until someone completes the Zoho side.

## Outstanding, outside this project

`atropos.com.au` has an A record to `34.50.153.87`, a Google Cloud IP that no
longer serves. That is a dangling DNS record: if the address is reallocated,
someone else can serve content on the apex domain. Repoint or remove it.

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
   `Atropos - Contact Form` exactly.
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
   - `Atropos - Contact Form` was already present in the Lead Source
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
- [ ] The new Lead's Lead Source reads "Atropos - Contact Form".
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

**Update the `atroposathome-redirect` stubs to point at the new paths.** That
separate repository is the mechanism above — a second Pages site serving
`atroposathome.com.au` — and its stub pages still forward to this site's old,
single-word paths: `/audio/`, `/smart-home/`, `/home-theatre/`, `/network/`,
`/acoustic/`, `/support/`. On this site those same paths are now themselves
thin redirect stubs (their entire body is "This page has moved.") pointing at
`/residential/audio/` and its siblings — the rebrand moved residential's
content one level deeper to sit alongside `/commercial/`. A visitor arriving
from the 2026-08-23 outreach emails, which link the old `atroposathome.com.au`
URLs, currently takes two hops to reach real content instead of one, and would
land on a dead page outright if this site's old-style stubs are ever pruned.
Re-point every stub in `atroposathome-redirect` straight at the corresponding
`/residential/*` URL. **That repository is out of scope here** — this is a
note for whoever next has it open, not a task for this codebase.

**The Form Location URL list is a wildcard.** Zoho validates the submitting
page's URL against this list, and a page that is not covered still creates the
lead while never confirming it to the visitor — the response is cross-origin
and unreadable, so the form shows its success panel either way. Nothing
surfaces the failure.

The entry is:

```
https://atropos.com.au/*
```

**Why a wildcard, and why this is worth knowing.** The list was originally
maintained per page. The dual-vertical rebrand took it from eight entries to
seventeen, and Zoho refuses more than a limited number — so the per-page
approach ran out of room. Zoho's own release notes mention `*` as the mechanism
that *preceded* the multi-URL list, and do not say whether it still works.
It does: verified on 2026-09-04 by submitting from `/commercial/signage/`, a
page never individually registered, and confirming both that the lead arrived
and that the visitor saw the inline confirmation rather than the fifteen-second
stall message.

That distinction is the test. A fast success panel means Zoho redirected the
hidden iframe, so the URL was accepted. The stall message after roughly fifteen
seconds means it was not. Checking the CRM alone proves nothing, because the
lead arrives either way.

**Consequences for this repository.** `REGISTERED_FORM_URLS` in `lib/routes.js`
and the `scripts/check-form-pages.mjs` build guard were both built to keep a
per-page list honest. They are now belt-and-braces rather than load-bearing:
adding a page no longer requires a Zoho change. They are kept because they cost
nothing and because a future Zoho change could reinstate the per-page
requirement — but a failing guard is no longer an emergency.

To regenerate the per-page list, if it is ever needed again:

```bash
node -e "import('./lib/routes.js').then(m => m.REGISTERED_FORM_URLS.forEach(u => console.log(u)))"
```

`/review/` carries no form and never needs registering.

### What is and is not machine-checked

`lib/routes.js` is the single source of truth for every route, including
which ones carry the contact form (`form: true`). `pnpm test` fails if a page
renders `ContactForm` but its route is missing from `lib/routes.js`
(`scripts/check-form-pages.mjs`), and a filesystem-parity test
(`lib/routes.test.mjs`) fails if a page exists on disk with no declared route,
or a declared route has no page. Between them, the codebase cannot drift from
its own list.

**Nothing in this repository can verify the Zoho side.** The Form Location
URL setting lives entirely inside Zoho's own configuration — no test, build
step or CI check here can read it back. If the wildcard were ever removed or
narrowed, forms would keep creating leads (the POST succeeds) while visitors
stopped seeing the success panel, and nothing anywhere would signal it: not
the browser console, not the build, not a monitoring alert.

While the wildcard holds, adding a page needs no Zoho change at all. That is
the point of using one. The thing to protect is the wildcard entry itself —
if someone replaces it with specific URLs, every page not named goes quietly
half-broken.

**The test for whether it still works** is a real submission from a page that
is not individually listed, checking that the success panel appears within a
second or two rather than the fifteen-second "taking longer than expected"
fallback. Confirming the lead reached the CRM proves nothing on its own: the
lead arrives either way, and the visitor's experience is the half that
breaks.

**Done since:** Action on Submission points at
`https://atropos.com.au/zoho-thanks.html`; the welcome email template carries
the base Atropos wordmark and the new domain in its links; the Lead Source
picklist value is `Atropos - Contact Form` and the code sends it.

**Still outstanding:**

- **GA4 data stream URL** still names the old domain. Cosmetic — the tag
  fires regardless; keep measurement ID `G-8RGK41Y2L5` for continuity.
- **GA4 data stream URL** still names the old domain. Cosmetic — the tag
  fires regardless; keep measurement ID `G-8RGK41Y2L5` for continuity.

Search Console is done — the property is verified and the sitemap submitted
(2026-09-04).

### `ZOHO_CONFIG.leadSource` and the Zoho picklist

`lib/zoho-form.js` sends `leadSource: 'Atropos - Contact Form'` on every
submission. It was the last string on the site still reading "Atropos at Home",
and it outlived the rest of the rebrand by design. The constraint that held it
there still applies to any future change:

- `Lead Source` is a Zoho picklist. Zoho **silently drops** a submitted value
  that is not a configured option — the lead still arrives, just unattributed,
  with no error, no console warning, nothing in the Network tab distinguishing
  it from a success. A code-only rename would look like it worked and quietly
  break attribution for every lead.
- The correct order is: **add the new picklist value in Zoho first** (Setup →
  Modules and Fields → Leads → Lead Source), confirm it is selectable, **then**
  change the string in `lib/zoho-form.js` to match it exactly, then re-register
  nothing (this does not touch Form Location URLs).
- This was done on 2026-09-04: the picklist gained `Atropos - Contact Form`
  first, then the code followed. Verified by a live submission whose Lead
  Source read back correctly rather than arriving blank.

## 8. `/review/` is parked, not abandoned

Decided 2026-09-04. **Do not delete this page, and do not try to fix it without
the gating item below.**

Nothing on the site links to `/review/` — not the nav, not the footer, not any
page. Only the sitemap. It is a direct-link tool: the URL is sent to a customer
after a job, the wizard helps them draft review text, and a button posts it to
Google.

**The gating item is access, not code.** That button is inert because
`NEXT_PUBLIC_GOOGLE_REVIEW_URL_HOME` has never been set, so
`app/review/page.jsx` falls back to `href="#"`. The Google review link is held
by a former business partner and is being sought. Until it arrives, no code
change makes the page work.

Because the page is invisible from the site, its brokenness only surfaces when
someone actually sends the link — which is precisely how this gets rediscovered
the hard way.

### Two things people get wrong about it

**It does not use an LLM.** That is a reasonable assumption from the outside and
it is wrong. `buildReview()` in `components/sections/ReviewWizard.jsx` picks an
opening, some middle sentences and a closing from four hardcoded arrays keyed on
the star rating, and joins them. No network calls, no API keys, no environment
variables. It never depended on anything the business has since lost, and it
works today exactly as well as the day it was written.

**Its copy is residential-only.** Every array is named `HOME_*` — the same
two-brand relic as the `_HOME` suffix on the environment variable. The generated
text says things like "the smart home system they designed" and "premium
technology for their home", so a commercial client asked for a review would be
handed a paragraph about their house.

### To revive it, in order

1. Obtain the Google review URL.
2. Set it as an Actions repository variable and redeploy.
3. Decide whether to add a parallel set of commercial arrays plus a
   project-type toggle. `buildReview()` already takes openings, sentences and
   closings as parameters, so a second set drops in without restructuring —
   whoever wrote it anticipated this.

## Outstanding, outside this project

`atropos.com.au` has an A record to `34.50.153.87`, a Google Cloud IP that no
longer serves. That is a dangling DNS record: if the address is reallocated,
someone else can serve content on the apex domain. Repoint or remove it.

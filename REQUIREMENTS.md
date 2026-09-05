# CorpDK site — requirements

**Product:** brand doorway for CorpDK, published at `https://corpdk.com`.
**Status:** v1 scope locked by the decisions in this file. This repository is the practice home. Do not implement the site in `curriculum-vitae`.
**Sibling:** the canonical CV stays at `https://cv.corpdk.com` (existing Next.js app). This site does not replace or copy it.

---

## 1. Why this exists

`corpdk.com` is already on Cloudflare. HTTPS redirects, then 302s to `/404.html` with `noindex, nofollow`. Anyone who sees CorpDK on an invoice, mailbox, GitHub org, or LinkedIn hits an empty brand.

Debraj Kundu began operating independently as CorpDK on 2026-08-28. The CV already states that. The apex must agree.

v1 is a **brand doorway**: one short page that answers who CorpDK is, what the practice does, where proof lives, and how to write.

---

## 2. Goals

A visitor who typed `corpdk.com` can, in one screen:

1. Name the practice (CorpDK) and the person (Debraj Kundu, Proprietor).
2. Understand that this is an independent software practice, not a company with a team.
3. Reach the CV, GitHub, and LinkedIn without hunting.
4. Copy or click `hello@corpdk.com` and mail a real inbox.

The apex is indexable. The From line on replies from that address already reads `CorpDK <hello@corpdk.com>` (Zoho group, send-as allowed, DKIM/SPF/DMARC pass). The page must print that same address and no other CorpDK mailbox.

---

## 3. Non-goals (v1)

| Leave out | Reason |
| --- | --- |
| Second CV | Jobs, education, certificates, skill honeycomb, and the long bio stay on `cv.corpdk.com`. |
| Contact form | Clients mail. A form needs backend, captcha, and a dashboard. `hello@` is live. |
| Services grid, “our team”, testimonials, case-study theatre | No published CorpDK client work yet. Overclaiming is worse than a thin page. |
| Redirect `corpdk.com` → `cv.corpdk.com` | Trains people that the brand *is* the résumé. |
| Blog, `/work`, notes, RSS | Ship the day there is something to show. Reserve the URLs; do not stub empty sections. |
| Published `info@`, `feedback@`, `dave.blogs@`, `acctrials@`, `dir.dave001@`, `catchall@`, `domain.contact@` | Internal or unpublished. See §8. |
| Auth, CMS, multi-locale, e-commerce | No audience for them. |
| Bengali wordmark `কর্পডিকে` | On the physical plate only, for now. Add to the site when you choose to; do not stub it. |

---

## 4. Audience

Primary: someone who already has the name CorpDK (invoice, email, spoken intro, LinkedIn headline) and is checking that the brand is real.

Secondary: a prospective client deciding whether to write.

Not primary: recruiters parsing a résumé. That is the CV’s job. Link them there.

---

## 5. Domain map

```
corpdk.com            practice home (this repo)
www.corpdk.com        canonical-redirect to the apex (or the reverse — pick one, see §11)
cv.corpdk.com         canonical CV (existing repo; do not merge)
hello@corpdk.com      only public mailbox
```

The two sites stay separate codebases and separate Vercel (or equivalent) projects. Brand tokens come from the nameplate (§9), not from the CV.

---

## 6. Information architecture

v1 is **one route**: `/`.

No site nav. No footer sitemap. No hamburger. The page *is* the IA.

### 6.1 Page blocks (top to bottom)

1. **Wordmark** — English `CorpDK` in Rochester, ink, from the nameplate (§9). Not a new crest. Not a photo of the whole 250×150 plate. Not the Bengali mark.
2. **One sentence** — who and what. See §7.1.
3. **Person line** — `Debraj Kundu · Proprietor`. Place (Kolkata, India) may sit on the same line or the next. State is optional.
4. **Proof links** — CV, GitHub, LinkedIn. Same destinations as the CV’s PDF socials.
5. **Contact** — `hello@corpdk.com` as a visible `mailto:` link. That is the whole contact block.
6. **Legal line** — `GSTIN : 19HVOPK1815H1Z7` in the footer, same characters as the plate. Quiet type, not a third of the page.
7. **Optional quiet line** — that more writing and selected work will appear here when they exist. One sentence max. Omit if it reads like an apology.

Do not add About / Services / Process / FAQ sections. Do not paste the physical nameplate as the homepage.

### 6.2 Reserved for later (do not build)

| Path | When |
| --- | --- |
| `/work` | First piece that can be shown under this brand. |
| Blog (path TBD: `/blog` or a host) | First post. Mail for readers is `blog@` or `writing@`, created that day — not `hello@`. |
| Bengali `কর্পডিকে` on the page | When you want the site to match the plate’s top tier. |

Until those exist, do not link to them.

---

## 7. Copy

Voice: first person or close third about one person. Short. No “we”. No “our team”. No “full-service”. No “synergy”.

### 7.1 Required facts

Use these facts. Wording may be edited at implementation as long as the facts stay true.

- **Brand:** CorpDK. Body copy is English. The plate’s Bengali `কর্পডিকে` is not on the site in v1.
- **Person:** Debraj Kundu
- **Role on this site:** Proprietor (nameplate). The CV’s “Independent Contractor” is the work mode; do not replace Proprietor here.
- **Place:** Kolkata, India
- **GSTIN:** `19HVOPK1815H1Z7` (letter O in `HVOPK`, not zero)
- **Focus:** full-stack and cloud software; curiosity in cyber security and AI (do not claim a security-consultancy or AI-product business)
- **CV URL:** `https://cv.corpdk.com`
- **GitHub:** `https://github.com/Dave4272-Office`
- **LinkedIn:** `https://www.linkedin.com/in/debraj-kundu/`
- **Mail:** `hello@corpdk.com`

The CV tagline (“Developer | Learner | Full Stack | Linux | Open Source”) may appear as a quiet secondary line. It must not replace the one-sentence practice description.

### 7.2 Suggested one sentence (starting point)

> CorpDK is the independent software practice of Debraj Kundu, proprietor — full-stack and cloud work, done under one name.

Implementors may tighten this. They may not widen it into services marketing.

### 7.3 What not to recopy

Do not paste Infosys / Wipro bullets, Toyota, MasterCard, education, or the skill catalog. One link to the CV is the proof of history.

### 7.4 Document title and meta

| Field | Value |
| --- | --- |
| `<title>` | `CorpDK` or `CorpDK — Debraj Kundu` |
| Meta description | One sentence: independent practice of Debraj Kundu, plus that `hello@corpdk.com` is the contact. |
| `og:title` / `og:description` | Same facts as title and description. |
| Canonical | `https://corpdk.com/` |

---

## 8. Contact and mail

### 8.1 On the page

- Print `hello@corpdk.com`.
- Use `mailto:hello@corpdk.com`.
- Visible text is the address itself (or “hello@corpdk.com”), not “Contact us”.
- No form, no Formspree, no serverless mailer, no captcha.

Obfuscation (`hello [at] …`, JS-assembled mailto) is out of scope. The address is meant to be copied.

### 8.2 Mailboxes (already decided; this repo does not create them)

| Address | Job | On the site? |
| --- | --- | --- |
| `hello@corpdk.com` | Hire / contract / “can you do this” | Yes |
| `dir.dave001@corpdk.com` | Real inbox; only member of the hello group | No |
| `acctrials@corpdk.com` | Trials and throwaway signups | No |
| `dave.blogs@corpdk.com` | Unpublished; recreate as `blog@` / `writing@` when a blog ships | No |
| Catch-all and other groups | Internal plumbing | No |

`hello@` is a Zoho **group**, access **Everyone**, member **only** `dir.dave001`, send-as **Allowed**, public From name **CorpDK**. Gmail is not a group member. If the implementor needs mail behaviour documented for QA, that is enough.

### 8.3 Reply identity

Outbound from intake must stay `CorpDK <hello@corpdk.com>`. The site does not control that; do not add a second public address to “fix” it.

---

## 9. Visual and UX

The **nameplate is the brand source**, not the CV. Physical plate: 250×150 mm, double-line frame, three tiers (Bengali | English · person · GSTIN). Installed 5 Sep 2026 (v1). The site takes **English type, ink, proprietor, and GSTIN**. It does not take the Bengali wordmark or the framed plate as a hero. Copy the tokens below into code rather than restyling toward `cv.corpdk.com`.

### 9.1 Ink and ground

| Token | Hex | Notes |
| --- | --- | --- |
| **Ink (canonical)** | `#572573` `rgb(87, 37, 115)` | v1, the installed plate. Site ink, rules, and wordmark. |
| Ink (swatch only) | `#52266D` `rgb(82, 38, 109)` | v2. Do not mix with v1 on the same page. |
| Ground (light) | `#FFFFFF` | Plate ground. A near-white paper is acceptable if it still reads as the plate. |
| Ground (dark) | ink or near-black | Invert: light paper type and marks on a dark ground. Keep one ink; do not introduce the CV rust. |

All rules, borders, and brand type on light use **ink**. Do not borrow the CV’s `#9a3f24` / `#e09268` / `#f3efe6` / `#141210` as the default palette.

### 9.2 Faces (Google Fonts)

Every English face on the plate is on Google Fonts. Load them from there (or the same files self-hosted). Do not ship BenSen Handwriting until the Bengali mark is in scope.

| Use | Face | Google Fonts | Plate size (reference only) |
| --- | --- | --- | --- |
| Wordmark `CorpDK` | Rochester Regular | [Rochester](https://fonts.google.com/specimen/Rochester) | 72 pt @ 300 dpi |
| `Debraj Kundu` | Carter One Regular | [Carter One](https://fonts.google.com/specimen/Carter+One) | 26.4 pt |
| `  ·  Proprietor` | Noto Sans SemiBold | [Noto Sans](https://fonts.google.com/specimen/Noto+Sans) | 16.8 pt (two spaces each side of `·`) |
| GSTIN line | Noto Sans Mono Bold | [Noto Sans Mono](https://fonts.google.com/specimen/Noto+Sans+Mono) | 27.36 pt |
| Body / links | Noto Sans | same | — |

Typeset `CorpDK` in Rochester. An outlined SVG of the English wordmark is acceptable if it matches that face; Google Fonts is the default.

Do not substitute Fraunces / Source Sans 3 from the CV for the wordmark or the proprietor line.

### 9.3 Wordmark on the web

- One `h1`: `CorpDK`, set in Rochester, ink.
- No Bengali, no vertical split, no second mark.

Do **not** use a PNG of the framed 250×150 plate as the hero (frame, Bengali, GSTIN, and physical scale belong on the door and on invoices). GSTIN stays a text line in the footer.

### 9.4 Theme

Light (ink on white) is the plate and the default. Dark is an invert of that system, following `prefers-color-scheme`, with an explicit toggle if it is cheap. Contrast on body text, GSTIN, and the mailto link must meet WCAG AA against the chosen ground.

### 9.5 Motion

Honor `prefers-reduced-motion`. No hero video, no particle canvas, no scroll-jacking.

### 9.6 Layout

One column. Comfortable measure (roughly 40–70 characters for the sentence). Works at 320px wide and at a wide desktop without stretching the sentence or the GSTIN across the viewport. The wordmark may be larger than the sentence; it should not feel like letterhead pasted into a browser.

### 9.7 Tone of the UI

Quiet. The `CorpDK` wordmark and `hello@` are the two things the eye hits. Proprietor and GSTIN confirm the legal person. Proof links are secondary. No stock photos, no client-logo strip, no “trusted by”.

### 9.8 Kinship with the CV

Separate products. The CV may later pick up ink or the lockup; this site does not move toward the CV’s rust paper to “match.” Do not import the CV’s section nav, honeycomb, job timeline, or PDF chrome.

---

## 10. Proof links

v1 link set (label → href):

| Label | href |
| --- | --- |
| Curriculum vitae | `https://cv.corpdk.com` |
| GitHub | `https://github.com/Dave4272-Office` |
| LinkedIn | `https://www.linkedin.com/in/debraj-kundu/` |
| hello@corpdk.com | `mailto:hello@corpdk.com` |

Optional later (only if already public and useful): Keybase, TryHackMe, Twitter/X. They are on the CV today and are not required on the doorway.

Open CV and socials in the same tab (default). Do not force `target="_blank"` unless there is a strong reason; if used, set `rel="noreferrer noopener"` and an accessible name that says a new tab opens.

---

## 11. Technical requirements

### 11.1 This repository

- GitHub: `https://github.com/CorpDK/CorpDK`
- Local path: `/workspace/Codes/CorpDK`
- This file is the spec (`REQUIREMENTS.md`).
- Do not add the site to `curriculum-vitae`.

### 11.2 Stack

Default, unless a cheaper static setup is chosen at kickoff:

- **Next.js** (App Router), **pnpm**, deploy on **Vercel** — same operations as the CV, so DNS and previews stay familiar.
- A static export or a single HTML page is acceptable if it meets §2 and §12. The stack is not the product.

If Next.js: read `node_modules/next/dist/docs/` in this repo before writing code.

### 11.3 Hosting and DNS

- Production host: Vercel (or equivalent) behind the existing Cloudflare zone for `corpdk.com`.
- Attach `corpdk.com` and `www.corpdk.com`.
- Pick one canonical host (`corpdk.com` recommended) and 301 the other.
- Replace the current Cloudflare 302 → `/404.html` + `noindex` with a real 200 at `/`.
- TLS stays on. Do not lower security headers relative to the CV (`curriculum-vitae` `next.config.ts` is the reference: CSP, `Referrer-Policy`, etc.). Adjust CSP for this app’s actual script sources, including Google Fonts (`fonts.googleapis.com` / `fonts.gstatic.com`) if loaded from there.

### 11.4 SEO and sharing

- Indexable: `200` at `/`, no `noindex` on the homepage.
- `robots.txt` allows `/`.
- Open Graph + Twitter cards with title, description, and a share image of the **English wordmark** (Rochester, ink on white), not a photo of the installed plate and not the CV mark.
- Favicon and app icons from `CorpDK`, not the CV’s “Debraj Kundu” manifest copied verbatim.
- `sitemap.xml` may be a single URL.

### 11.5 Analytics

Optional and matching the CV if enabled: GTM via `NEXT_PUBLIC_GTM_ID`. No marketing pixels beyond that. If GTM is on, Web Vitals may push to `dataLayer` the same way the CV does. If GTM is off, the page still works.

### 11.6 Privacy

v1 collects nothing itself (no form, no account). If GTM/GA runs, say so in a short privacy note (footer line or `/privacy`). Do not write a five-page policy for a mailto page.

### 11.7 Accessibility

- Valid landmark structure (`header` / `main` / `footer` is enough).
- One `h1`: `CorpDK`.
- Mailto and proof links are real `<a>` elements, keyboard reachable, with a visible focus ring.
- Theme toggle (if present) is a button with an accessible name.
- `lang="en"` on `html`. No `lang="bn"` until the Bengali mark ships.
- GSTIN is selectable text (not only in an image).

### 11.8 Quality bar

- Automated tests for whatever is not a snapshot of taste (links, mailto href, metadata, redirects).
- Lint and typecheck in CI if the stack has them.
- Manual pass: phone width, desktop, light, dark, keyboard only, and “view source” to confirm no hidden form and no extra mailboxes.

---

## 12. What “done” looks like (v1)

A reviewer can check these without reading code:

1. `https://corpdk.com` returns 200 and is indexable.
2. `www` 301s to the canonical host (or the documented reverse).
3. The page shows `CorpDK` (not the Bengali mark), states Debraj Kundu as Proprietor, and describes an independent practice.
4. The only mailbox on the page is `hello@corpdk.com`, as `mailto:hello@corpdk.com`.
5. The footer includes `GSTIN : 19HVOPK1815H1Z7` as text.
6. CV, GitHub, and LinkedIn links work and point at the URLs in §10.
7. No job list, no skill cloud, no contact form, no “services” section, no empty `/work` or `/blog` in the nav (there is no nav), no full-plate PNG as the hero.
8. Light is ink `#572573` on white (or documented near-white). Dark is readable AA.
9. Title and description in the tab and in “view source” match §7.4.
10. A mail from an external Gmail to `hello@` still arrives, and a reply still shows `CorpDK <hello@corpdk.com>` — site work must not break that (it should not touch Zoho).

---

## 13. Implementation sequence

1. ~~Create the repo. Drop this file in as the spec.~~ Done: `github.com/CorpDK/CorpDK`, this file.
2. Scaffold the chosen stack. Wire production + preview deploys.
3. Point `corpdk.com` / `www` at the deploy. Confirm the Cloudflare 404 is gone.
4. Load Rochester, Carter One, Noto Sans, and Noto Sans Mono from Google Fonts. Build the single page to §6–§10.
5. Metadata, icons, share image from the English wordmark, headers, optional GTM.
6. Tests and the §12 checklist, including a browser pass on the live (or preview) URL.

Copy and visual polish happen on that page, not by expanding scope.

---

## 14. Later (out of v1, not forgotten)

- Selected work on `/work` when there is a piece that can be shown as CorpDK.
- Writing, with a **separate** public address (`blog@` or `writing@`), never `hello@`.
- A form only if unqualified mail becomes a volume problem.
- Bengali `কর্পডিকে` on the site, using the plate’s BenSen Handwriting (licence then, not now).
- More stationery (letterhead, invoice masthead) reusing the same English wordmark and ink.

Each of those is a new requirements pass. Do not pre-build the shelves.

---

## 15. Decisions already made

Recorded so this repo does not re-litigate them:

1. Yes, build `corpdk.com`. It is a doorway, not an agency site and not a second CV.
2. Publish `hello@corpdk.com`. Do not publish a form.
3. `hello@` is a Zoho group → `dir.dave001` only. Gmail is not a member.
4. `info@` is not a public address.
5. `acctrials@` stays unpublished.
6. Blog mail is a future address, created when a blog exists.
7. Apex does not redirect to `cv.corpdk.com`.
8. The CV repo remains the résumé. This repo is the practice home.
9. Brand source is the 250×150 nameplate: ink `#572573`, Rochester wordmark, Carter One / Noto Sans proprietor line, Noto Sans Mono GSTIN — all English faces from Google Fonts. v2 `#52266D` is a swatch, not a second site theme.
10. The site uses the English wordmark and the legal lines. It does not show `কর্পডিকে` in v1 and does not reproduce the framed plate as a webpage.

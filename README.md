# Tofail Alam — Portfolio

Live at **https://tofailalamtushar.github.io/** (once published).

A fast, accessible, single-page portfolio for a .NET / ASP.NET Core software engineer.
Plain HTML, CSS and JavaScript — no frameworks, no build step, no paid services.
Designed to be hosted for free on GitHub Pages.

> **Before you publish:** work through [§9 Pre-publication checklist](#9-pre-publication-checklist)
> and [§10 Information you still need to supply](#10-information-you-still-need-to-supply).
> While you preview on `localhost`, a yellow **Setup mode** banner lists everything that is
> still a placeholder. That banner never appears on the live site.

---

## 1. What's included

| Section | Notes |
|---|---|
| Navigation | Sticky header, active-section highlight, accessible mobile menu (Esc closes, focus returns), Download CV button |
| Hero | Headline, value proposition, two CTAs, GitHub/LinkedIn links, your photo with name card, tech summary |
| About | Professional introduction + quick-facts panel |
| Skills | Grouped skill chips (no fake percentage bars). Deployment tools are marked **Learning** until you confirm them |
| Projects | **Selected work**: nine real projects from your CV (expandable feature lists, no client names or internals), then four **Open-source demos (in progress)** with case-study dialogs |
| Services | Six problem-focused services + "Discuss your project" CTA. No prices, timelines or guarantees |
| Experience | Five roles with exact dates from your CV, plus education and training |
| Contact | `mailto:` link, copy-email button, GitHub, LinkedIn, Upwork / Fiverr (optional), CV download. **No contact form** (see §7.4) |
| Extras | Back-to-top button, custom 404 page, SEO/Open Graph tags, Person structured data, social preview image, SVG favicon, robots.txt, sitemap.xml |

### Design decisions

* **Palette** — the suggested palette, with two contrast fixes: white button text sits on `#2563EB`
  (5.2:1) instead of `#3B82F6` (3.7:1, fails WCAG AA), and small blue text uses `#60A5FA` (7.4:1 on the
  page background).
* **Typography** — system fonts (Segoe UI / Cascadia Code on Windows, which suits a Microsoft-stack
  developer). No web-font downloads: faster, and no third-party requests.
* **Restraint** — one decorative element (a faint blueprint grid in the hero), no glow effects, small
  border radii, a single accent colour, and a subtle fade-in only for content below the first screen.
  All motion is disabled when the visitor prefers reduced motion.
* **Honesty by default** — any link that still contains `YOUR_` is automatically disabled and shown as
  "coming soon", so visitors never hit a broken URL.
* **No theme toggle** — the brand is designed around the dark palette; a light theme would double the
  styling to maintain for little benefit.

---

## 2. File structure

```
portfolio/
├── index.html              ← all page content (sections, projects, experience)
├── site-config.js          ← YOUR personal details: name, email, links, CV path
├── 404.html                ← self-contained "page not found" page
├── robots.txt              ← crawler rules + sitemap location
├── sitemap.xml             ← one-URL sitemap for search engines
├── README.md               ← this guide
├── .gitignore              ← keeps OS files and private drafts out of Git
└── assets/
    ├── css/style.css       ← design tokens (CSS variables) + all styles
    ├── js/main.js          ← navigation, dialogs, config, placeholder guard
    ├── icons/favicon.svg   ← browser tab icon
    ├── images/
    │   ├── og-image.png         ← 1200×630 social sharing preview
    │   └── tofail-alam-480/800.webp ← your photo (cropped, metadata removed)
    └── cv.pdf              ← web-safe CV generated from your Word CV
```

Why content lives in `index.html` and not in JavaScript: search engines and link previews read the
HTML directly, and the page still works if JavaScript fails. Only details that repeat in several places
(name, email, profile links, CV path) live in `site-config.js`.

---

## 3. Run it locally

Opening `index.html` by double-clicking mostly works, but use a local server so paths behave exactly
as on GitHub Pages. Pick **one** option:

**A. VS Code (easiest)** — install the *Live Server* extension → right-click `index.html` →
*Open with Live Server*.

**B. Python** (if installed — `python --version`):
```bash
cd portfolio
python -m http.server 8000
```
Open http://localhost:8000

**C. .NET developers without Python** — any static server works, e.g.
```bash
dotnet tool install --global dotnet-serve
cd portfolio
dotnet serve -p 8000
```

Stop the server with `Ctrl + C`.

---

## 4. Personalize the site

### 4.1 Where to edit what

| What | File | Where |
|---|---|---|
| Name, role, location, availability | `site-config.js` | `name`, `role`, `location`, `availability` (if you change the name, also update the `<head>` of `index.html`) |
| Email, GitHub, LinkedIn, Upwork, Fiverr | `site-config.js` | `email`, `github`, `linkedin`, `upwork`, `fiverr` (`""` hides a link) |
| CV | `assets/cv.pdf` | Replace the PDF (keep the name `cv.pdf`). Visitors download it as `Tofail-Alam-CV.pdf` |
| Photo | `assets/images/` | Replace both `tofail-alam-480.webp` and `tofail-alam-800.webp` (4:5 portrait), keep the names, update the `alt` text in `index.html` |
| Page title, description, social tags, canonical URL, structured data | `index.html` | `<head>` |
| Hero headline & text | `index.html` | `<section class="hero" id="home">` |
| About text & quick facts | `index.html` | `<section id="about">` |
| Skills | `index.html` | `<section id="skills">` — one `<li>` per skill |
| Real projects | `index.html` | `<div class="work">` — one `<article class="work-card">` per project |
| Demo projects & case studies | `index.html` | `<div class="projects">` (cards) and `<dialog id="case-1">` … `case-4` at the end of the file |
| Services | `index.html` | `<section id="services">` |
| Experience & education | `index.html` | `<section id="experience">` |
| Colours, spacing, fonts | `assets/css/style.css` | `:root { … }` at the top |
| 404 "home" link | `404.html` | `SITE_BASE` near the bottom (only for project sites, see §5) |
| Domain in SEO files | `robots.txt`, `sitemap.xml`, `index.html` | Already `tofailalamtushar.github.io`; change only if you add a custom domain |

Tip: in VS Code press `Ctrl + Shift + F` and search for `YOUR_` to find every placeholder.

### 4.2 Skills

To mark a deployment tool as confirmed once you have real production experience, change

```html
<li class="skill--learning">Docker <span class="tag tag--learning">Learning</span></li>
```
to
```html
<li>Docker</li>
```
Only remove the tag for tools you can discuss confidently in an interview.

### 4.3 Experience and real projects

Roles, dates, projects, technologies and features come from your Word CV. Points to note:

* **Client names are deliberately left out** — the site says "banking client" and "used by 4 banks"
  instead of naming BRAC Bank, Midland Bank and the others. Your CV is sent privately; this page is
  public and indexed by search engines. Add a bank's name only if your employer and that bank allow it.
* The employer shown on each project card is inferred from your CV (Flora Systems for the bank
  products built with ASP.NET Core and Angular). **Check BACH and IDTP PIM in particular**, as your CV
  does not name the employer or client for those two.
* Descriptions stay at the feature level. Do not add internal system names, architecture diagrams,
  endpoints, screenshots of bank systems or data volumes.
* To add a role, copy one `<li class="timeline__item">…</li>` block; to add a project, copy one
  `<article class="work-card">…</article>` block.

### 4.4 Building the open-source demos

Each project has two parts in `index.html`: a **card** (`<article class="project">`) and a
**case study** (`<dialog id="case-N">`). The card's *Read case study* button opens the dialog with the
matching `data-dialog-open="case-N"`.

1. Build the project and push it to its own public GitHub repository (sample data only).
2. Replace `YOUR_PROJECT_N_REPO_URL` and `YOUR_PROJECT_N_DEMO_URL` in **both** the card and the dialog.
   Delete the *Live demo* link if there is no hosted demo. (ASP.NET Core demos must be hosted
   elsewhere — e.g. Azure App Service free tier — GitHub Pages cannot run .NET code.)
3. Add a screenshot: save it as `assets/images/project-1.webp` (about 1280×720, under ~150 KB) and
   replace the `<svg>…</svg>` inside `.project__visual` with
   ```html
   <img src="assets/images/project-1.webp" alt="Dashboard of the business management system showing order totals and a filterable orders table" width="1280" height="720" loading="lazy" decoding="async">
   ```
   Remove the `role="img"` and `aria-label` from the `.project__visual` div and the
   `<span class="project__visual-note">Illustration</span>` line.
4. In the dialog, change "Proposed solution" / "Planned" wording to what you actually built, and replace
   the yellow *Status* note with real details (e.g. what you would do next).
5. Only add numbers (speed-ups, users, etc.) that you have measured and can reproduce.
6. Keep `<span class="tag tag--sample">Sample project</span>` for personal/demo work. For genuine
   client work you are allowed to show, replace it with e.g. `<span class="tag tag--learning">Client work</span>`.

---

## 5. Publish on GitHub Pages

### 5.1 Choose the repository name (important)

| Repository name | Site address | Notes |
|---|---|---|
| **`tofailalamtushar.github.io`** (recommended) | `https://tofailalamtushar.github.io/` | Cleanest URL. Everything works without changes. |
| anything else, e.g. `portfolio` | `https://tofailalamtushar.github.io/portfolio/` | Works, but set `SITE_BASE = "/portfolio/"` in `404.html`. |

For you: the repository is **`tofailalamtushar.github.io`** under the account **`tofailalamtushar`**,
so the site will be at **https://tofailalamtushar.github.io/**. Everything is already configured for that.

### 5.2 Create the repository

1. Sign in at https://github.com (create a free account if needed — choose a professional username).
2. Click **+** (top right) → **New repository**.
3. Repository name: `tofailalamtushar.github.io` (skip §5.2 if you have already created it).
4. Visibility: **Public** (required for free GitHub Pages).
5. Do **not** tick "Add a README", ".gitignore" or "license" — this project already has them.
6. Click **Create repository**.

### 5.3 Upload the code with Git

Install Git from https://git-scm.com if `git --version` fails. Then, in a terminal inside the
`portfolio` folder:

```bash
# one-time Git identity
git config --global user.name "Tofail Alam"
git config --global user.email "tofailalamtushar123@gmail.com"   # or your GitHub noreply address, see §9

git init
git add .
git commit -m "Initial portfolio site"
git branch -M main
git remote add origin https://github.com/tofailalamtushar/tofailalamtushar.github.io.git
git push -u origin main
```

When asked to sign in, use the browser window that opens (Git Credential Manager). If you are asked for
a password in the terminal, GitHub needs a **personal access token**, not your account password:
GitHub → Settings → Developer settings → Personal access tokens.

*No Git yet?* On the empty repository page choose **uploading an existing file**, drag in the
**contents** of the `portfolio` folder (including the `assets` folder), and commit. Note that `.gitignore`
is a hidden file on some systems; it is optional for the site to work.

### 5.4 Turn on GitHub Pages

1. In the repository: **Settings → Pages**.
2. **Source:** *Deploy from a branch*.
3. **Branch:** `main`, folder **`/ (root)`** → **Save**.
4. Wait 1–3 minutes. Refresh the page; it shows *"Your site is live at …"*.
5. Tick **Enforce HTTPS** if it is not already on.

You can watch progress in the **Actions** tab (a "pages build and deployment" run).

### 5.5 Update the site later

```bash
git add .
git commit -m "Describe what changed"
git push
```
The live site updates within a few minutes. Hard-refresh (`Ctrl + F5`) if you still see the old version.

### 5.6 Site address

`index.html`, `robots.txt` and `sitemap.xml` already use `https://tofailalamtushar.github.io/`.
Nothing to change unless you add a custom domain (§8).

---

## 6. Testing

### 6.1 Tests already run on this code

Run in headless Chromium 141 against a local server, before delivery (repeated after adding your details):

* No horizontal overflow at 360, 390, 768, 1024 and 1440 px widths.
* No JavaScript errors and no failed requests at any of those widths.
* Mobile menu opens, moves focus to the first link, closes with Esc (focus returns to the button),
  and closes after choosing a link.
* All four case-study dialogs open, close with Esc, and return focus to the button that opened them.
* Every in-page `#` link points to an existing section; every dialog button has a matching dialog.
* `assets/cv.pdf`, `404.html`, `robots.txt`, `sitemap.xml`, favicon and OG image all return HTTP 200.
* Remaining placeholder links (LinkedIn, Upwork, Fiverr, demo repos/demos) are disabled and clicking them does not navigate.
* With test values in `site-config.js`: name fills the title/brand/footer, initials appear in the logo,
  `mailto:` includes a subject, profile links become active, and `upwork: ""` hides the Upwork link.
* First Tab press focuses "Skip to main content"; the page has exactly one `<h1>`.
* Text/background contrast ratios checked: body muted text 6.4–7.3:1, blue text 6.5–7.4:1,
  button text 5.2:1.

Not tested: real phones, Safari/Firefox, screen readers, and Lighthouse on the live URL. Do those below.

### 6.2 Tests to run yourself (local)

1. Open the site and read the yellow **Setup mode** banner — fix each item it lists.
2. Browser DevTools (`F12`) → **Console**: there should be no red errors.
3. DevTools → device toolbar (`Ctrl + Shift + M`) → check 360, 390, 768, 1024, 1440 px. Scroll the whole
   page at each width; nothing should be cut off or scroll sideways.
4. Keyboard only: press Tab from the top. Every link/button should show a visible outline, the mobile
   menu should work with Enter/Esc, and case studies should close with Esc.
5. Click every nav item, both hero buttons, every *Read case study* button, *Download CV*, the email link
   and *Copy email address* (copy works on `localhost` and HTTPS only).
6. Lighthouse: DevTools → **Lighthouse** → Mobile → Analyze. Fix anything flagged in red.
7. Visit `http://localhost:8000/404.html` to see the error page.

### 6.3 Tests on the live site

1. Open `https://tofailalamtushar.github.io/` on your phone **and** a computer.
2. Visit a made-up address such as `https://tofailalamtushar.github.io/nope` → your custom 404 page appears;
   its button returns to the home page.
3. Click *Download CV* → your real CV downloads (not the placeholder).
4. Click the email link → your mail app opens with your address and the subject "Project inquiry".
5. Check GitHub / LinkedIn / Upwork links open the correct profiles.
6. Paste your URL into https://www.opengraph.xyz or a LinkedIn post draft → the preview shows the
   title, description and image.
7. Run Lighthouse again on the live URL, or https://pagespeed.web.dev.
8. Optional: add the site to Google Search Console and submit `sitemap.xml`.

---

## 7. Troubleshooting

| Symptom | Likely cause → fix |
|---|---|
| 404 at the site address | Pages not enabled, or wrong branch/folder. Settings → Pages → `main` + `/ (root)`. Make sure `index.html` is at the **top level** of the repository, not inside a `portfolio/` subfolder. |
| Page loads but has no styling | Files uploaded into a subfolder, or folder names changed. The repo root must contain `index.html` and `assets/`. Paths are **case-sensitive** on GitHub (`Assets/` ≠ `assets/`). |
| Old version still showing | Wait 2–3 minutes, check the **Actions** tab for a green run, then hard-refresh (`Ctrl + F5`). |
| Name/links still show `YOUR_…` | `site-config.js` not edited, not saved, or not pushed. Check the Console for `site-config.js did not load`. |
| CV downloads the placeholder | `assets/cv.pdf` was not replaced, or the file name differs (`CV.pdf`, `cv.PDF`). Use exactly `cv.pdf`, or update `cvFile` in `site-config.js`. |
| `git push` rejected (`fetch first`) | The repository was created with a README. Run `git pull origin main --allow-unrelated-histories`, then push again. |
| `git push` asks for a password and fails | Use the browser sign-in prompt, or a personal access token instead of your password. |
| `remote origin already exists` | `git remote set-url origin https://github.com/tofailalamtushar/tofailalamtushar.github.io.git` |
| 404 page's button goes to the wrong place | Project-site repo: set `SITE_BASE` in `404.html` to `"/repo-name/"`. |
| "Copy email" says it failed | Clipboard needs HTTPS or localhost; on the live site it works once HTTPS is enforced. The email link still works. |
| Custom domain stops working after a push | The `CNAME` file was deleted; re-enter the domain in Settings → Pages. |

### 7.4 About contact forms

GitHub Pages only serves files; it cannot receive form submissions. This site therefore uses a real
`mailto:` link and a copy-email button instead of a form that would silently fail. If you later want a
form, use an external service such as Formspree or Web3Forms (both have free tiers), follow their setup
guide, and test that messages actually arrive before publishing it.

---

## 8. Adding a custom domain later

1. Buy a domain from a registrar (e.g. Cloudflare, Namecheap, Porkbun).
2. GitHub repo → **Settings → Pages → Custom domain** → enter `www.yourdomain.com` → **Save**.
   (GitHub adds a `CNAME` file to the repo — run `git pull` before your next local change.)
3. At your registrar's DNS settings add:
   * `CNAME` record: `www` → `tofailalamtushar.github.io`
   * For the bare domain (`yourdomain.com`), four `A` records → `185.199.108.153`, `185.199.109.153`,
     `185.199.110.153`, `185.199.111.153` (check GitHub's current documentation:
     *"Managing a custom domain for your GitHub Pages site"*).
4. Wait for DNS (minutes to 24 hours) and the green check in Settings → Pages, then tick **Enforce HTTPS**.
5. Recommended: verify the domain in your GitHub account settings (Settings → Pages → Verified domains)
   to prevent takeover.
6. Replace every `tofailalamtushar.github.io` in `index.html` (head and structured data), `robots.txt`
   and `sitemap.xml` with the new domain. Keep `SITE_BASE = "/"` in `404.html`.

---

## 9. Pre-publication checklist

**Identity & contact**
- [ ] `linkedin` set in `site-config.js`; `upwork` and `fiverr` set or `""`
- [ ] Email is a professional address you are happy to have publicly visible (bots will find it)
- [ ] Every link tested and opens the correct profile
- [ ] Setup-mode banner on localhost is gone (or only lists items you chose to leave)

**CV**
- [ ] Read the generated `assets/cv.pdf` carefully and correct anything inaccurate
- [ ] If you replace it with your own PDF: no phone number, home address, date of birth, parents' names, religion, marital status or referees' phone numbers
- [ ] CV titles/dates match the Experience section and LinkedIn

**Claims & accuracy**
- [ ] Employer shown on each project card verified (especially BACH and IDTP PIM)
- [ ] No confidential employer/client details (system names, architecture, endpoints, data, screenshots)
- [ ] Banking clients named only if permitted
- [ ] Open-source demos built and linked, or removed
- [ ] No unmeasured numbers, outcomes or testimonials anywhere
- [ ] Skills marked **Learning** reviewed honestly
- [ ] Unused project demo/source links either filled in or deleted

**Technical**
- [ ] Mobile layout checked on a real phone
- [ ] Lighthouse run on the live URL; red items fixed
- [ ] Custom 404 page works on the live site
- [ ] Social preview checked

**Privacy — remember: a public repository is public forever-ish**
- [ ] Nothing private in any committed file — including Git history. If you ever commit a secret,
      deleting it in a later commit is **not** enough; rotate the secret.

### What becomes public

With a public repository, **everyone can read every file and every past commit**: `index.html`,
`site-config.js` (your email and profile links), `assets/cv.pdf` (your whole CV), images, this README
and the commit author name/email. The site contains no API keys, passwords or connection strings, and
none should ever be added — a static site cannot keep secrets. To keep your personal email out of commit
metadata, enable **Settings → Emails → Keep my email addresses private** on GitHub and use the
`…@users.noreply.github.com` address in `git config user.email`.

---

## 10. Information you still need to supply

Already filled in from your CV and messages: name, email, GitHub, site address, photo, CV,
roles and dates, projects, skills, education and training.

Still needed:

1. **LinkedIn profile URL** → `linkedin` in `site-config.js` (until then the link shows as "coming soon").
2. **Upwork and/or Fiverr profile URLs** → `upwork` / `fiverr`, or set each to `""` to hide it.
3. **Confirmation of the employer** for BACH and IDTP PIM (shown as Flora Systems).
4. **Which deployment tools** (IIS, Docker, CI/CD, Azure) you have used in production — remove the
   *Learning* tag from those.
5. **Repository and demo URLs** for each open-source demo you build (`YOUR_PROJECT_1_REPO_URL` …),
   or delete the demos you do not plan to build.
6. Optional: a more formal headshot (see note below), and permission to name any bank clients.

**About the photo:** it is cropped to a portrait and its camera metadata (EXIF, which can include
location) was removed. It works well, but for freelance clients and recruiters a photo without
sunglasses, where people can see your eyes, usually builds more trust. When you have one, replace the
two `tofail-alam-*.webp` files.

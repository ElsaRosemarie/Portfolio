# Elsa van Dam — Portfolio

Static portfolio site for illustration, research, and workshops. Built with [Next.js](https://nextjs.org/) (static export) and [Tailwind CSS](https://tailwindcss.com/).

**Live site:** [https://elsarosemarie.github.io/Portfolio/](https://elsarosemarie.github.io/Portfolio/)

---

## Updating content (no code required)

Most text and images can be edited directly on GitHub. After you commit, the site rebuilds automatically in about 2–3 minutes.

See **[content/HOW-TO-UPDATE.txt](content/HOW-TO-UPDATE.txt)** for step-by-step instructions.

| What to change | Where |
|----------------|--------|
| Page text (home, about, workshops, contact) | `content/pages/*.json` |
| Project descriptions & links | `content/projects/work.json`, `content/projects/research.json` |
| Email, Instagram, LinkedIn, navigation | `content/site.json` |
| Gallery order | `Afbeeldingen portfolio/WORK/order.txt` or `RESEARCH/order.txt` |
| Image order inside a project | `images.txt` inside the project folder |
| Images | `Afbeeldingen portfolio/` |

Text formatting in JSON: `*italic*`, `**bold**`, `[link label](https://url)` or `[page](/work)`.

---

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

To preview the production build locally (same as the static export):

```bash
npm run host
```

---

## Build

```bash
npm run build
```

This runs three steps:

1. `scripts/build-content.mjs` — merges `content/` into `src/data/content.json`
2. `scripts/generate-gallery.mjs` — copies images to `public/images/` and builds `src/data/gallery.json`
3. `next build` — outputs the static site to `out/`

---

## Deployment (GitHub Pages)

Pushing to **`main`** triggers [.github/workflows/deploy.yml](.github/workflows/deploy.yml), which builds the site and publishes `out/` to the **`gh-pages`** branch.

### One-time GitHub setup

1. Open the repo → **Settings** → **Pages**
2. Under **Build and deployment**, set **Source** to **Deploy from a branch**
3. Branch: **`gh-pages`**, folder: **`/ (root)`**
4. Save

The live URL uses `basePath` from `content/site.json` (currently `/Portfolio`).

---

## Custom domain & DNS

When you have a domain (e.g. `www.elsavandam.nl`), connect it in two places:

### 1. In this repository

Edit **`content/site.json`**:

```json
{
  "basePath": "",
  "customDomain": "www.elsavandam.nl"
}
```

- **`basePath`** — set to `""` (empty) for a custom domain. Use `"/Portfolio"` only while on `github.io/Portfolio`.
- **`customDomain`** — your domain without `https://`. The build writes `public/CNAME` for GitHub Pages.

Commit and push. Wait for the deploy to finish.

### 2. At your domain provider (DNS)

In GitHub → **Settings** → **Pages** → **Custom domain**, enter the same domain. GitHub will show the DNS records you need. Typically:

| Type | Name | Value |
|------|------|--------|
| **CNAME** | `www` | `elsarosemarie.github.io` |
| **A** | `@` (apex) | GitHub Pages IPs (shown in GitHub UI) |

DNS can take up to 24–48 hours to propagate. Enable **Enforce HTTPS** in GitHub Pages once the domain is verified.

### Switching back to github.io temporarily

Set in `content/site.json`:

```json
"basePath": "/Portfolio",
"customDomain": ""
```

---

## Project structure

```
content/                  Editable text (GitHub-friendly JSON)
  site.json               Site settings, links, basePath, customDomain
  pages/                  Home, about, workshops, contact
  projects/               Work & research project text
Afbeeldingen portfolio/   Source images & gallery folders
public/images/            Generated image copies (do not edit by hand)
src/                      Next.js app (pages, components)
scripts/                  Build scripts for content & gallery
out/                      Static export (generated, deployed to gh-pages)
```

---

## Repository

[https://github.com/ElsaRosemarie/Portfolio](https://github.com/ElsaRosemarie/Portfolio)

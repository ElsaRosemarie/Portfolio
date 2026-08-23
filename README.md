# Elsa van Dam — Portfolio

Static portfolio site for illustration, research, and workshops. Built with [Next.js](https://nextjs.org/) (static export) and [Tailwind CSS](https://tailwindcss.com/).

**Live site:** [https://elsarosemarie.com](https://elsarosemarie.com)

---

## Updating content on GitHub (tutorial)

Everything below can be done in the GitHub web editor — no code editor needed. After you **Commit changes**, the site rebuilds in about 2–3 minutes.

Open the repo: [github.com/ElsaRosemarie/Portfolio](https://github.com/ElsaRosemarie/Portfolio)

Also see **[content/HOW-TO-UPDATE.txt](content/HOW-TO-UPDATE.txt)** for a short checklist.

---

### 1. Edit page text (home, about, contact, workshops)

Page text lives in plain **`.txt`** files — no JSON commas or quote marks.

**Where:** `content/pages/`

| File | What it controls |
|------|------------------|
| `home.txt` | Text under “Hi! → Meet the Artist” |
| `about.txt` | About page body |
| `contact.txt` | Contact page text |
| `workshops.txt` | Workshops list |

**Rules:**
- Leave a **blank line** between paragraphs
- Use `*italic*` and `**bold**` for emphasis
- Use `[link text](https://url)` or `[link text](/about)` for links

**Example — editing the about page**

1. Go to `content/pages/about.txt`
2. Click the pencil icon ✏️ **Edit this file**
3. Change the text. For example:

```text
Hi! I am Elsa van Dam (they/she), a queer illustrator, graphic designer and anthropologist living in Utrecht, the Netherlands. My work centres around the complexities of more-than-human entanglement, the search for bodily softness and the joys of the whimsical.

Several of my clients include:

Toekomstboeren
Department of Industrial Design, Eindhoven University of Technology

[Full resume](/cv-july-2026.pdf)
```

4. Scroll down → **Commit changes**

Small page settings (greeting, buttons) live in matching `.meta.json` files, e.g. `home.meta.json`.

---

### 2. Change the gallery order (illustration & research)

**Method A — `order.txt` (most control)**

1. Open `Afbeeldingen portfolio/WORK/order.txt` (or `RESEARCH/order.txt`)
2. Move lines up or down — **one project name per line**
3. Commit changes

Example:

```text
# work order
Queer Zine Toekomstboeren
Spring storm
Once Upon a Time
Radboud Welcomes Newcomers
Roots
```

The grid reads left to right, then top to bottom in this order.

**Method B — number folders**

Rename a project folder with a number at the start:

```text
01 - Queer Zine Toekomstboeren
02 - Spring storm
03 - Once Upon a Time
```

Lower numbers appear first. Useful when adding new work.

**Hide a project without deleting it:** put a minus before the name in `order.txt`:

```text
- Draft project I am not ready to show
```

---

### 3. Add text under a single-image illustration

Multi-image projects (like **Queer Zine Toekomstboeren**) show a **title** and **description** in the popup. Single-image illustrations can do the same — title only until you add a description file.

**Option A — description file next to the image (easiest)**

For an image file:

```text
Afbeeldingen portfolio/WORK/Thesis cover trad.jpg
```

Create a text file with the **same name** plus `.description.txt`:

```text
Afbeeldingen portfolio/WORK/Thesis cover trad.description.txt
```

Write your description inside. Blank line = new paragraph. Same formatting as page text (`*italic*`, `[links](url)`).

Example file contents:

```text
For my thesis, I illustrated the cover using mixed media and ink.
```

After committing, the popup shows the title **Thesis cover** with this text underneath — same layout as the Queer Zine project.

**Option B — `work.json` entry**

In `content/projects/work.json`, add an entry keyed by the illustration title:

```json
"Thesis cover": {
  "paragraphs": [
    "For my thesis, I illustrated the cover using mixed media and ink."
  ]
}
```

Trailing commas and `//` comments are OK in this file.

**Option C — folder projects**

For projects with their own folder, add `description.txt` inside the folder:

```text
Afbeeldingen portfolio/WORK/Queer Zine Toekomstboeren/description.txt
```

---

### Quick reference

| What to change | Where |
|----------------|--------|
| Page text | `content/pages/*.txt` |
| Page greeting / buttons | `content/pages/*.meta.json` |
| Single-image description | `WORK/Image name.description.txt` or `content/projects/work.json` |
| Multi-image project text | `WORK/Project folder/description.txt` or `work.json` |
| Research project text | `RESEARCH/.../description.txt` or `content/projects/research.json` |
| Gallery order | `WORK/order.txt` or rename folders `01 - Name` |
| Image order inside a project | `images.txt` inside the project folder |
| Email, Instagram, LinkedIn | `content/site.json` |
| Images | `Afbeeldingen portfolio/` |

---

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

To preview the production build locally:

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

## Project structure

```
content/
  HOW-TO-UPDATE.txt     Short editing checklist
  site.json               Site name, email, Instagram, LinkedIn
  pages/
    home.txt              Home page body text
    home.meta.json        Home greeting + About button
    about.txt             About page text
    contact.txt           Contact page text
    workshops.txt         Workshops page text
    workshops.meta.json   Workshops banner alt + footer CTA
  projects/
    work.json             Optional illustration popup text
    research.json         Optional research popup text

Afbeeldingen portfolio/
  HOME/                   Homepage hero, logo, portrait
  ABOUT/                  About portrait
  WORKSHOPS/              Workshops banner
  WORK/
    order.txt             Illustration gallery order
    Project folder/       Multi-image project
      description.txt     Optional popup text
      images.txt          Optional image order inside popup
    Single image.jpg      Standalone illustration
    Single image.description.txt   Optional popup text for that image
  RESEARCH/
    order.txt             Research gallery order
    ...                   Same pattern as WORK

public/
  cv-july-2026.pdf        Resume linked from About
  images/                 Generated copies (do not edit by hand)

scripts/                  Build scripts for content & gallery
src/                      Next.js app (pages, components)
out/                      Generated static site (do not edit by hand)
```

---

## Repository

[https://github.com/ElsaRosemarie/Portfolio](https://github.com/ElsaRosemarie/Portfolio)

# Elsa van Dam — Portfolio

Static portfolio site for illustration, research, and workshops.

**Live site:** [https://elsarosemarie.com](https://elsarosemarie.com)

**Edit the site on GitHub:** [github.com/ElsaRosemarie/Portfolio](https://github.com/ElsaRosemarie/Portfolio)

After you save a change and click **Commit changes**, the site rebuilds in about 2–3 minutes.

---

## How to edit text on GitHub

Page text is stored in plain **`.txt`** files. You do **not** need JSON, quote marks, or commas around paragraphs.

### Step by step

1. Open the repo on GitHub
2. Go to **`content`** → **`pages`**
3. Click the file you want to edit (for example `about.txt`)
4. Click the pencil icon ✏️ **Edit this file**
5. Change the text
6. Scroll down → **Commit changes**

### The files

| File | What it controls on the website |
|------|----------------------------------|
| `home.txt` | Text under “Meet the Artist” |
| `about.txt` | About page |
| `contact.txt` | Contact page |
| `workshops.txt` | Workshops page |

Small settings (greeting, buttons) live in matching **`.meta.json`** files — for example `home.meta.json`. You rarely need to touch these.

### Rules for `.txt` files

- **Blank line** = new paragraph
- `*italic*` and `**bold**` for emphasis
- `[link text](https://example.com)` for external links
- `[link text](/about)` for links to another page on the site

### Example 1 — change one sentence on About

Open `content/pages/about.txt`. It might look like this:

```text
Hi! I am Elsa van Dam (they/she), a queer illustrator, graphic designer and anthropologist living in Utrecht, the Netherlands. My work centres around the complexities of more-than-human entanglement, the search for bodily softness and the joys of the whimsical. Themes that often occur in my work are climate change, social justice, and LGBTQI* liberation. With an eye for detail and a love for colours and textures, I create emotionally engaging publications, striking visual identities and poetic mixed-media paintings.

Several of my clients include:

Toekomstboeren
Department of Industrial Design, Eindhoven University of Technology

Diversity, Equity and Inclusion Office, Radboud University
Kunstloc Brabant

[Full resume](/cv-july-2026.pdf)
```

Change the words you want, keep the blank lines between paragraphs, then commit.

### Example 2 — add a link in Workshops

In `content/pages/workshops.txt`, a link looks like this:

```text
You can find out more about this workshop [here](/research#research-eden).
```

The word **here** becomes the clickable link.

### Example 3 — change the home greeting

Open `content/pages/home.meta.json`:

```json
{
  "greeting": "Meet the Artist",
  "cta": {
    "label": "About",
    "href": "/about"
  }
}
```

The main home paragraph text is still in `home.txt`.

---

## How to change gallery order

Use **`order.txt`** — one project name per line. The gallery reads **left to right, then top to bottom**.

### Step by step

1. Open **`Afbeeldingen portfolio`** → **`WORK`** (or **`RESEARCH`** for research)
2. Click **`order.txt`**
3. Click ✏️ **Edit this file**
4. Move lines up or down
5. **Commit changes**

### Example

```text
# work order
Queer Zine Toekomstboeren
Spring storm
Once Upon a Time
Radboud Welcomes Newcomers
Roots
TNI guide
```

Put the project you want first at the top. The name must match the folder name or image title in `WORK/`.

### Hide a project without deleting it

Put a **minus** before the name:

```text
- Draft project I am not ready to show
```

The project stays in the folder but disappears from the gallery.

---

## How to add text under a single-image illustration

Multi-image projects (like **Queer Zine Toekomstboeren**) show a title and description in the popup. Single-image illustrations can too.

**Add a description file next to the image** — same name as the image, plus `.description.txt`.

### Step by step

1. Find the image in **`Afbeeldingen portfolio/WORK/`**  
   Example: `Thesis cover trad.jpg`
2. Create a new file named:  
   **`Thesis cover trad.description.txt`** (in the same folder)
3. Write your text inside
4. **Commit changes**

### Example

Image file:

```text
Afbeeldingen portfolio/WORK/Thesis cover trad.jpg
```

Description file:

```text
Afbeeldingen portfolio/WORK/Thesis cover trad.description.txt
```

Contents of the description file:

```text
For my thesis, I illustrated the cover using mixed media and ink.
```

After the site rebuilds, clicking that illustration shows the title **Thesis cover** with your text underneath — the same layout as the Queer Zine project.

Use a **blank line** between paragraphs if you need more than one. Links and italic work the same as page text.

---

## Quick reference

| What to change | Where |
|----------------|--------|
| Page text | `content/pages/*.txt` |
| Page greeting / buttons | `content/pages/*.meta.json` |
| Gallery order | `Afbeeldingen portfolio/WORK/order.txt` (or `RESEARCH/order.txt`) |
| Text under a single illustration | `WORK/Image name.description.txt` next to the image |
| Text under a folder project | `WORK/Project folder/description.txt` |
| Image order inside a project popup | `images.txt` inside the project folder |
| Email, Instagram, LinkedIn | `content/site.json` |
| Images | `Afbeeldingen portfolio/` |

Short checklist: **[content/HOW-TO-UPDATE.txt](content/HOW-TO-UPDATE.txt)**

---

## Project structure

```
content/
  HOW-TO-UPDATE.txt       Short editing checklist
  site.json               Site name, email, Instagram, LinkedIn
  pages/
    home.txt              Home page body text
    home.meta.json        Home greeting + About button
    about.txt             About page text
    contact.txt           Contact page text
    workshops.txt         Workshops page text
    workshops.meta.json   Workshops footer CTA

Afbeeldingen portfolio/
  WORK/
    order.txt             Illustration gallery order
    My Project/           Multi-image project folder
      description.txt     Popup text for this project
      images.txt          Image order inside the popup
    My image.jpg          Single illustration
    My image.description.txt   Popup text for that illustration
  RESEARCH/
    order.txt             Research gallery order
    ...                   Same pattern as WORK
  HOME/                   Homepage images
  ABOUT/                  About portrait
  WORKSHOPS/              Workshops banner

public/
  cv-july-2026.pdf        Resume (linked from About)
  images/                 Generated copies — do not edit by hand

scripts/                  Build scripts
src/                      Website code
out/                      Generated site — do not edit by hand
```

---

## Repository

[https://github.com/ElsaRosemarie/Portfolio](https://github.com/ElsaRosemarie/Portfolio)

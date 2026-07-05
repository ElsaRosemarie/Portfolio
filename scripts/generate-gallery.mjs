import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const SOURCE = path.join(ROOT, "Afbeeldingen portfolio");
const PUBLIC = path.join(ROOT, "public", "images");
const OUT = path.join(ROOT, "src", "data", "gallery.json");

const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".gif", ".webp"]);

function isImage(file) {
  return IMAGE_EXT.has(path.extname(file).toLowerCase());
}

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function cleanTitle(filename) {
  return path
    .basename(filename, path.extname(filename))
    .replace(/\s*(dig,?\s*com|trad,?\s*com|trad)\s*$/i, "")
    .replace(/\s*resized\s*/i, " ")
    .trim();
}

function normalizeKey(name) {
  return name.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function copyFile(src, dest) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  if (!fs.existsSync(dest)) {
    fs.copyFileSync(src, dest);
  }
}

function collectImages(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => isImage(f))
    .map((f) => path.join(dir, f))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
}

function mirrorToPublic(relativePath, srcFile) {
  const dest = path.join(PUBLIC, relativePath);
  copyFile(srcFile, dest);
  return `/images/${relativePath.replace(/\\/g, "/")}`;
}

function buildSection(sectionName) {
  const sectionDir = path.join(SOURCE, sectionName);
  if (!fs.existsSync(sectionDir)) {
    return { projects: [], filters: [] };
  }

  const entries = fs.readdirSync(sectionDir, { withFileTypes: true });
  const projects = [];
  const filterSet = new Set();

  const rootImages = entries
    .filter((e) => e.isFile() && isImage(e.name))
    .map((e) => e.name);

  const folders = entries.filter((e) => e.isDirectory()).map((e) => e.name);

  const usedRootImages = new Set();

  for (const folder of folders) {
    const folderPath = path.join(sectionDir, folder);
    const images = collectImages(folderPath);
    if (images.length === 0) continue;

    const folderKey = normalizeKey(folder);
    let coverSrc = images[0];

    const coverCandidate = rootImages.find((img) => {
      const key = normalizeKey(cleanTitle(img));
      return key.includes(folderKey) || folderKey.includes(key.slice(0, 8));
    });

    if (coverCandidate) {
      coverSrc = path.join(sectionDir, coverCandidate);
      usedRootImages.add(coverCandidate);
    }

    const id = `${sectionName.toLowerCase()}-${slugify(folder)}`;
    const imageUrls = images.map((img, i) => {
      const rel = path.join(sectionName, folder, path.basename(img));
      return {
        src: mirrorToPublic(rel, img),
        alt: cleanTitle(path.basename(img)),
      };
    });

    if (coverCandidate && !images.some((img) => img === coverSrc)) {
      const rel = path.join(sectionName, coverCandidate);
      const coverUrl = mirrorToPublic(rel, coverSrc);
      if (!imageUrls.some((u) => u.src === coverUrl)) {
        imageUrls.unshift({
          src: coverUrl,
          alt: cleanTitle(coverCandidate),
        });
      }
    }

    filterSet.add(folder);
    projects.push({
      id,
      title: folder,
      category: folder,
      section: sectionName.toLowerCase(),
      cover: imageUrls[0].src,
      images: imageUrls,
      description: getDummyDescription(folder),
    });
  }

  for (const img of rootImages) {
    if (usedRootImages.has(img)) continue;
    const src = path.join(sectionDir, img);
    const title = cleanTitle(img);
    const rel = path.join(sectionName, img);
    const url = mirrorToPublic(rel, src);
    const id = `${sectionName.toLowerCase()}-${slugify(title)}`;

    projects.push({
      id,
      title,
      category: "Illustrations",
      section: sectionName.toLowerCase(),
      cover: url,
      images: [{ src: url, alt: title }],
      description: getDummyDescription(title),
    });
  }

  const filters = ["All", ...Array.from(filterSet).sort()];
  if (projects.some((p) => p.category === "Illustrations")) {
    filters.push("Illustrations");
  }

  return { projects, filters: [...new Set(filters)] };
}

function getDummyDescription(title) {
  return `A selection of work from the series "${title}". This piece explores narrative, colour, and composition through hand-drawn illustration. Created by Elsa van Dam as part of her ongoing visual practice.`;
}

function copyStaticAssets() {
  const mappings = [
    ["HOME/Logo.png", "HOME/Logo.png"],
    ["HOME/Welcome landscape 2-2.jpg", "HOME/hero.jpg"],
    ["HOME/DSC_9623.jpg", "HOME/portrait.jpg"],
    ["ABOUT/DSC_9623.jpg", "ABOUT/portrait.jpg"],
    ["ABOUT/IMG-20190609-WA0002-2.jpg", "ABOUT/portrait-alt.jpg"],
    ["WORKSHOPS/Workshops.jpg", "WORKSHOPS/hero.jpg"],
  ];

  for (const [src, dest] of mappings) {
    const srcPath = path.join(SOURCE, src);
    if (fs.existsSync(srcPath)) {
      mirrorToPublic(dest, srcPath);
    }
  }
}

function main() {
  fs.mkdirSync(path.join(ROOT, "src", "data"), { recursive: true });

  const work = buildSection("WORK");
  const research = buildSection("RESEARCH");

  const data = {
    work,
    research,
    generatedAt: new Date().toISOString(),
  };

  copyStaticAssets();
  fs.writeFileSync(OUT, JSON.stringify(data, null, 2));
  console.log(
    `Gallery generated: ${work.projects.length} work, ${research.projects.length} research projects`
  );
}

main();

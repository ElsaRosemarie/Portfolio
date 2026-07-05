import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const SOURCE = path.join(ROOT, "Afbeeldingen portfolio");
const PUBLIC = path.join(ROOT, "public", "images");
const OUT = path.join(ROOT, "src", "data", "gallery.json");

const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".gif", ".webp"]);
const CATEGORY_TAGS = new Set(["trad", "dig", "com", "other"]);
const CATEGORY_SUFFIX_PATTERN =
  /\s+(?:trad|dig|com|other)(?:\s*,\s*(?:trad|dig|com|other))*\s*$/i;

const WORK_FILTERS = [
  "All",
  "Commissioned",
  "Traditional",
  "Digital",
  "Other",
];

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
    .replace(/\s*resized\s*/gi, " ")
    .replace(CATEGORY_SUFFIX_PATTERN, "")
    .trim();
}

function parseCategories(filename) {
  const base = path.basename(filename, path.extname(filename));
  const match = base.match(
    /\s+((?:trad|dig|com|other)(?:\s*,\s*(?:trad|dig|com|other))*)$/i
  );
  if (!match) return [];

  return [
    ...new Set(
      match[1]
        .split(",")
        .map((tag) => tag.trim().toLowerCase())
        .filter((tag) => CATEGORY_TAGS.has(tag))
    ),
  ];
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

  const useMediumFilters = sectionName === "WORK";
  const entries = fs.readdirSync(sectionDir, { withFileTypes: true });
  const projects = [];

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
    let coverCandidate = null;

    const matchedCover = rootImages.find((img) => {
      const key = normalizeKey(cleanTitle(img));
      return key.includes(folderKey) || folderKey.includes(key.slice(0, 8));
    });

    if (matchedCover) {
      coverCandidate = matchedCover;
      coverSrc = path.join(sectionDir, matchedCover);
      usedRootImages.add(matchedCover);
    }

    const categorySource = coverCandidate ?? path.basename(coverSrc);
    const categories = parseCategories(categorySource);

    const id = `${sectionName.toLowerCase()}-${slugify(folder)}`;
    const imageUrls = images.map((img) => {
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

    projects.push({
      id,
      title: folder,
      categories,
      section: sectionName.toLowerCase(),
      cover: imageUrls[0].src,
      images: imageUrls,
      description: readProjectDescription(sectionDir, folderPath, folder),
    });
  }

  for (const img of rootImages) {
    if (usedRootImages.has(img)) continue;
    const src = path.join(sectionDir, img);
    const title = cleanTitle(img);
    const rel = path.join(sectionName, img);
    const url = mirrorToPublic(rel, src);
    const id = `${sectionName.toLowerCase()}-${slugify(title)}`;
    const categories = parseCategories(img);

    projects.push({
      id,
      title,
      categories,
      section: sectionName.toLowerCase(),
      cover: url,
      images: [{ src: url, alt: title }],
      description: readProjectDescription(sectionDir, sectionDir, title),
    });
  }

  const filters = useMediumFilters
    ? WORK_FILTERS
    : ["All"];

  const orderPath = path.join(sectionDir, "order.txt");
  const orderedProjects = applyProjectOrder(projects, orderPath, sectionName);

  return { projects: orderedProjects, filters };
}

function getDummyDescription(title) {
  return `A selection of work from the series "${title}". This piece explores narrative, colour, and composition through hand-drawn illustration. Created by Elsa van Dam as part of her ongoing visual practice.`;
}

function readProjectDescription(sectionDir, folderPath, title) {
  const candidates = [
    path.join(folderPath, "description.txt"),
    path.join(sectionDir, `${title}.description.txt`),
  ];

  for (const file of candidates) {
    if (!fs.existsSync(file)) continue;
    const text = fs.readFileSync(file, "utf8").trim();
    if (text) return text;
  }

  return getDummyDescription(title);
}

function parseOrderFile(orderPath) {
  if (!fs.existsSync(orderPath)) return null;

  const entries = [];
  for (const raw of fs.readFileSync(orderPath, "utf8").split(/\r?\n/)) {
    let line = raw.trim();
    if (!line || line.startsWith("#")) continue;

    let exclude = false;
    if (line.startsWith("-")) {
      exclude = true;
      line = line.slice(1).trim();
    }
    if (!line) continue;

    entries.push({ key: line, exclude });
  }

  return entries;
}

function projectMatchesKey(project, key) {
  const normalizedKey = key.toLowerCase();
  const title = project.title.toLowerCase();
  const id = project.id.toLowerCase();
  const slug = slugify(key).toLowerCase();
  const cleanedKey = cleanTitle(key).toLowerCase();

  return (
    title === normalizedKey ||
    id === normalizedKey ||
    id.endsWith(`-${slug}`) ||
    slugify(project.title) === slug ||
    cleanedKey === title
  );
}

function applyProjectOrder(projects, orderPath, sectionLabel) {
  const entries = parseOrderFile(orderPath);
  if (!entries) return projects;

  const ordered = [];
  const used = new Set();

  for (const { key, exclude } of entries) {
    const project = projects.find(
      (item) => !used.has(item.id) && projectMatchesKey(item, key)
    );

    if (!project) {
      console.warn(`[${sectionLabel}] order.txt: no match for "${key}"`);
      continue;
    }

    used.add(project.id);
    if (!exclude) ordered.push(project);
  }

  const remaining = projects
    .filter((project) => !used.has(project.id))
    .sort((a, b) => a.title.localeCompare(b.title, undefined, { numeric: true }));

  if (remaining.length > 0) {
    console.log(
      `[${sectionLabel}] ${remaining.length} project(s) not in order.txt — appended at end: ${remaining.map((project) => project.title).join(", ")}`
    );
  }

  return [...ordered, ...remaining];
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

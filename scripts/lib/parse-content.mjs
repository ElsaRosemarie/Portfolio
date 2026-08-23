import fs from "fs";

export function stripJsonComments(text) {
  return text.replace(/^\s*\/\/.*$/gm, "");
}

export function stripTrailingCommas(text) {
  return text.replace(/,\s*([}\]])/g, "$1");
}

export function readJsonLenient(filePath) {
  const raw = fs.readFileSync(filePath, "utf8").replace(/^\uFEFF/, "");
  const cleaned = stripTrailingCommas(stripJsonComments(raw));

  try {
    return JSON.parse(cleaned);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`Could not read ${filePath}: ${message}`);
  }
}

export function parseParagraphsFile(filePath) {
  const raw = fs.readFileSync(filePath, "utf8").replace(/^\uFEFF/, "");
  return raw
    .split(/\n\s*\n/)
    .map((part) => part.trim())
    .filter(Boolean);
}

export function loadPageContent(pageName, pagesDir) {
  const txtPath = pathJoin(pagesDir, `${pageName}.txt`);
  const metaPath = pathJoin(pagesDir, `${pageName}.meta.json`);
  const jsonPath = pathJoin(pagesDir, `${pageName}.json`);

  let page = {};

  if (fs.existsSync(metaPath)) {
    page = readJsonLenient(metaPath);
  } else if (fs.existsSync(jsonPath)) {
    page = readJsonLenient(jsonPath);
  }

  if (fs.existsSync(txtPath)) {
    page.paragraphs = parseParagraphsFile(txtPath);
  } else if (!page.paragraphs) {
    throw new Error(
      `Missing page text for "${pageName}". Add content/pages/${pageName}.txt`
    );
  }

  return page;
}

function pathJoin(dir, file) {
  return `${dir.replace(/[/\\]$/, "")}/${file}`;
}

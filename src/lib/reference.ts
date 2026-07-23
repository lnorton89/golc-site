import fs from "node:fs";
import path from "node:path";

export type ReferencePage = {
  slug: string;
  title: string;
  importPath: string;
  synopsis: string;
  body: string;
};

const CONTENT_DIR = path.join(process.cwd(), "src/content/reference");

// parsePage strips the docgen-emitted "<!-- GENERATED ... -->" marker and
// pulls apart the fixed shape internal/docgen always writes: an "# name"
// heading, a "`import/path`" line, then the doc comment body.
function parsePage(slug: string, raw: string): ReferencePage {
  const content = raw
    .split("\n")
    .filter((line) => !line.trimStart().startsWith("<!--"))
    .join("\n")
    .trimStart();

  const titleMatch = content.match(/^#\s+(.+)\n/);
  const title = titleMatch ? titleMatch[1].trim() : slug;
  const afterTitle = content.slice(titleMatch ? titleMatch[0].length : 0).trimStart();

  const importMatch = afterTitle.match(/^`([^`]+)`\n/);
  const importPath = importMatch ? importMatch[1] : "";
  const body = (importMatch ? afterTitle.slice(importMatch[0].length) : afterTitle).trim();

  const synopsisMatch = body.match(/^[\s\S]+?[.!?](\s|$)/);
  const synopsis = synopsisMatch ? synopsisMatch[0].trim() : body.split("\n")[0];

  return { slug, title, importPath, synopsis, body };
}

// getReferencePages reads every generated page from
// internal/docgen's site copy (site/src/content/reference), sorted by
// import path. It returns an empty list rather than throwing when the
// directory doesn't exist yet, since these pages are generated content
// (`golc.ps1 docs`), not something every checkout is guaranteed to have.
export function getReferencePages(): ReferencePage[] {
  let filenames: string[];
  try {
    filenames = fs.readdirSync(CONTENT_DIR).filter((name) => name.endsWith(".md"));
  } catch {
    return [];
  }

  const pages = filenames.map((filename) => {
    const slug = filename.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(CONTENT_DIR, filename), "utf8");
    return parsePage(slug, raw);
  });

  return pages.sort((a, b) => a.importPath.localeCompare(b.importPath));
}

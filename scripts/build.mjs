/* Builds the public copy of the site into dist/.
   The source files keep their comments (the data files' editing guides live
   there); the published copy has every HTML, CSS and JS comment removed, and
   only files that belong on the web are copied. Run: npm run build */

import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { minify as minifyHtml } from "html-minifier-terser";
import { minify as minifyJs } from "terser";
import CleanCSS from "clean-css";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = path.join(root, "dist");

// Only these top-level entries are published. Everything else (README,
// package.json, .gitignore, scripts/, node_modules/) stays private.
const PUBLIC_DIRS = ["css", "js", "data", "images", "videos"];
const PUBLIC_FILE = /\.(html|txt|xml)$/;

const cleanCss = new CleanCSS({ level: 1, format: "keep-breaks" });

async function transform(file, text) {
  const ext = path.extname(file);
  if (ext === ".html") {
    return minifyHtml(text, {
      removeComments: true,
      collapseWhitespace: true,
      conservativeCollapse: true,
      minifyCSS: { level: 1 },
      minifyJS: { compress: false, mangle: false, format: { comments: false } },
    });
  }
  if (ext === ".css") {
    const result = cleanCss.minify(text);
    if (result.errors.length) throw new Error(`${file}: ${result.errors.join("; ")}`);
    return result.styles;
  }
  if (ext === ".js") {
    const result = await minifyJs(text, { compress: false, mangle: false, format: { comments: false } });
    return result.code;
  }
  return null;
}

async function copy(src, dest) {
  const stat = await fs.stat(src);
  if (stat.isDirectory()) {
    await fs.mkdir(dest, { recursive: true });
    for (const name of await fs.readdir(src)) {
      if (name.startsWith(".")) continue;
      await copy(path.join(src, name), path.join(dest, name));
    }
    return;
  }
  if ([".html", ".css", ".js"].includes(path.extname(src))) {
    await fs.writeFile(dest, await transform(src, await fs.readFile(src, "utf8")));
  } else {
    await fs.copyFile(src, dest);
  }
}

await fs.rm(out, { recursive: true, force: true });
await fs.mkdir(out);
for (const name of await fs.readdir(root)) {
  if (PUBLIC_DIRS.includes(name) || PUBLIC_FILE.test(name)) {
    await copy(path.join(root, name), path.join(out, name));
  }
}

// Fail the build if anything comment-shaped survived.
const leftovers = [];
async function check(dir) {
  for (const name of await fs.readdir(dir)) {
    const p = path.join(dir, name);
    if ((await fs.stat(p)).isDirectory()) { await check(p); continue; }
    if (!/\.(html|css|js)$/.test(name)) continue;
    const text = await fs.readFile(p, "utf8");
    if (text.includes("<!--") || /\/\*[\s\S]*?\*\//.test(text)) leftovers.push(path.relative(out, p));
  }
}
await check(out);
if (leftovers.length) {
  console.error("Comments still present in:", leftovers.join(", "));
  process.exit(1);
}
console.log("Built dist/ with comments removed.");

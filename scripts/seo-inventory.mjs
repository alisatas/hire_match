// Content inventory for SEO work: crawls every URL in the sitemap and writes, per page,
// the title, meta description, H1, H2 outline, word count and hreflang languages.
//
//   node scripts/seo-inventory.mjs                       # local dev server (npm run dev)
//   BASE=https://cvxray.com node scripts/seo-inventory.mjs
//
// Output: docs/seo/content-inventory.md (English pages in full, translations summarised)
// and docs/seo/content-inventory.csv (every page, for a spreadsheet).
import { mkdirSync, writeFileSync } from "node:fs";

const BASE = (process.env.BASE ?? "http://localhost:3000").replace(/\/$/, "");
const SITE = "https://cvxray.com";

const decode = (s) => s.replace(/&amp;/g, "&").replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&nbsp;/g, " ");
const text = (html) => decode(html.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
const meta = (html, attr, key) => decode(html.match(new RegExp(`<meta[^>]+${attr}="${key}"[^>]+content="([^"]*)"`, "i"))?.[1] ?? "");

const xml = await (await fetch(`${BASE}/sitemap.xml`)).text();
const paths = [...new Set([...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(SITE, "") || "/"))];

const pages = [];
for (const path of paths) {
  const html = await (await fetch(`${BASE}${path}`)).text();
  const main = html.match(/<main[\s\S]*?<\/main>/i)?.[0] ?? html;
  pages.push({
    path,
    lang: /^\/(tr|de|es|pt|fr|zh)(\/|$)/.exec(path)?.[1] ?? "en",
    title: decode(html.match(/<title>([^<]*)<\/title>/i)?.[1] ?? ""),
    description: meta(html, "name", "description"),
    h1: [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) => text(m[1])).join(" | "),
    h2: [...main.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)].map((m) => text(m[1])),
    // Chinese has no spaces: count characters / 1.5 as words
    words: (() => { const t = text(main.replace(/<script[\s\S]*?<\/script>/gi, "")); const han = (t.match(/\p{Script=Han}/gu) ?? []).length; return t.replace(/\p{Script=Han}/gu, " ").split(" ").filter(Boolean).length + Math.round(han / 1.5); })(),
    hreflang: [...html.matchAll(/hrefLang="([^"]+)"/gi)].map((m) => m[1]).filter((v, i, a) => a.indexOf(v) === i && /<link/i.test(html)).length,
    schema: [...new Set([...html.matchAll(/"@type":"([A-Za-z]+)"/g)].map((m) => m[1]))].join(", "),
  });
}

const group = (p) => p.path === "/" || /^\/(tr|de|es|pt|fr|zh)$/.test(p.path) ? "Home page"
  : /resume-keywords\/./.test(p.path) ? "Keyword guides"
  : /resume-keywords$/.test(p.path) ? "Keyword guide index"
  : /blog\/./.test(p.path) ? "Articles"
  : /blog$/.test(p.path) ? "Article index" : "Legal";

const en = pages.filter((p) => p.lang === "en");
const byLang = Object.groupBy(pages, (p) => p.lang);
let md = `# CVXray content inventory\n\nGenerated ${new Date().toISOString().slice(0, 10)} from ${BASE}/sitemap.xml by \`scripts/seo-inventory.mjs\`. Re-run after content changes.\n\n`;
md += `## Summary\n\n- **${pages.length} indexable pages** in the sitemap: ${Object.entries(byLang).map(([l, ps]) => `${l} ${ps.length}`).join(", ")}\n`;
md += `- Every guide, article and index exists in 7 languages under the same path (\`/tr\`, \`/de\`, \`/es\`, \`/pt\`, \`/fr\`, \`/zh\` prefixes) with hreflang + x-default. Legal pages are English only.\n`;
md += `- Translated pages carry the same structure as the English ones; below, English pages are listed in full and translations by title only.\n\n`;
md += `| Page type | English pages | All languages |\n|---|---|---|\n`;
for (const g of ["Home page", "Keyword guide index", "Keyword guides", "Article index", "Articles", "Legal"]) {
  md += `| ${g} | ${en.filter((p) => group(p) === g).length} | ${pages.filter((p) => group(p) === g).length} |\n`;
}
md += `\n## English pages\n`;
for (const g of ["Home page", "Keyword guide index", "Keyword guides", "Article index", "Articles", "Legal"]) {
  md += `\n### ${g}\n`;
  for (const p of en.filter((x) => group(x) === g)) {
    md += `\n#### \`${p.path}\`\n\n- **Title** (${p.title.length}): ${p.title}\n- **Description** (${p.description.length}): ${p.description}\n- **H1:** ${p.h1}\n- **H2:** ${p.h2.join(" · ") || "—"}\n- **Words:** ~${p.words} · **Structured data:** ${p.schema || "—"}\n`;
  }
}
md += `\n## Translated pages (titles)\n`;
for (const lang of ["tr", "de", "es", "pt", "fr", "zh"]) {
  md += `\n### ${lang}\n\n| Path | Title | Words |\n|---|---|---|\n`;
  for (const p of byLang[lang] ?? []) md += `| \`${p.path}\` | ${p.title.replace(/\|/g, "\\|")} | ~${p.words} |\n`;
}
mkdirSync("docs/seo", { recursive: true });
writeFileSync("docs/seo/content-inventory.md", md);
const csv = (v) => `"${String(v).replace(/"/g, '""')}"`;
writeFileSync("docs/seo/content-inventory.csv", ["path,language,type,title,title_length,description,description_length,h1,h2,words,structured_data",
  ...pages.map((p) => [p.path, p.lang, group(p), p.title, p.title.length, p.description, p.description.length, p.h1, p.h2.join(" · "), p.words, p.schema].map(csv).join(","))].join("\n"));
console.log(`${pages.length} pages → docs/seo/content-inventory.md, .csv`);

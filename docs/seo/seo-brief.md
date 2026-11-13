# CVXray — SEO brief

For whoever works on CVXray's search visibility. The full page list with titles,
descriptions, H1/H2 and word counts is in [content-inventory.md](content-inventory.md)
(spreadsheet: [content-inventory.csv](content-inventory.csv)); regenerate it with
`node scripts/seo-inventory.mjs`.

## 1. What the site is

CVXray (https://cvxray.com) is a free web tool that compares a CV with a job posting and
returns a match score (5–95%), the skills and keywords the CV is missing ranked by priority,
where to add them, and free courses. No account, no payment, no scan limit; the CV is never
stored. The analysis runs in the browser and reads CVs and postings in English, Turkish,
German, Spanish and Chinese.

The product is the tool on the home page. All other content exists to bring searchers to it.

## 2. Site structure

123 indexable pages (sitemap: https://cvxray.com/sitemap.xml).

| Section | Path | Pages | Purpose |
|---|---|---|---|
| Home page + tool | `/` | 1 × 5 languages | Converts: the analyzer, how it works, FAQ |
| Keyword guide hub | `/resume-keywords` | 1 × 5 | Lists the role guides |
| Keyword guides | `/resume-keywords/<role>` | 18 × 5 | Long-tail: "<role> resume keywords" |
| Article hub | `/blog` | 1 × 5 | Lists the articles |
| Articles | `/blog/<slug>` | 3 × 5 | Informational: ATS, tailoring, match score |
| Legal | `/terms`, `/privacy`, `/refund-policy` | 3 (English only) | Trust |

Languages: English at the root, translations under `/tr`, `/de`, `/es`, `/zh`, same path
otherwise. Every multilingual page has a self canonical, hreflang to all five versions plus
`x-default`, and `inLanguage` in its JSON-LD.

The 18 roles: AI engineer, frontend developer, backend engineer, machine learning engineer,
software engineer, data scientist, account executive, digital marketing specialist, financial
analyst, project manager, recruiter, customer success manager, data analyst, product manager,
DevOps engineer, UX designer, registered nurse, logistics coordinator.

The 3 articles: how ATS software reads a CV; how to tailor a CV to a job description; what
a good CV match score is.

## 3. Content per page type (English)

| Type | Words | What is on the page |
|---|---|---|
| Home page | ~1,250 | H1 "Does your CV match the job?", the tool, 3-step how-it-works, score formula, 6 featured guides, 15 FAQs |
| Keyword guide | 400–500 | Keyword groups (4 × ~8 terms), CTA, intro, 3 tips, 2 FAQs, links to the other guides |
| Article | 480–660 | 5–6 sections, lists and tip boxes, CTA, related guides |

Structured data in place: WebSite, WebApplication (with featureList and free Offer),
Organization, FAQPage (home and every guide), HowTo (home), BlogPosting, CollectionPage,
BreadcrumbList.

Also published for AI crawlers: https://cvxray.com/llms.txt (product facts, how the score is
calculated, privacy, example questions, every guide).

## 4. Audience

- Job seekers about to apply for a specific job, who want to know whether their CV fits and
  what to change. Most arrive with a posting already open.
- Strongest fit: tech, data, product, sales, marketing, finance, HR, nursing and logistics
  roles (the skill engine has dedicated vocabulary for these).
- Markets: English-speaking and EU job seekers first; Turkish, German, Spanish and Chinese
  speakers through the translated pages. The owner is based in the Netherlands.
- Device: a large share is mobile; the site is tested at 375 px.

## 5. Competitors

| Competitor | Model | Where CVXray differs |
|---|---|---|
| Jobscan | Account, limited free scans, paid plans | Free, unlimited, no account, CV not stored |
| Resume Worded | Account, freemium | Same as above; job-specific match rather than general CV review |
| Teal | Account, freemium; resume builder + job tracker | Does one thing: CV-versus-job matching |
| Enhancv, Kickresume, Zety | CV builders with ATS checkers | Not a builder; no upsell |

The FAQ already targets "best free alternatives to Jobscan".

## 6. Target keywords

Primary (home page):
- free resume matcher, CV matcher, resume checker against job description
- ATS resume checker, ATS CV checker, job match score
- check if my CV matches a job description

Secondary (guides and articles):
- "<role> resume keywords" / "<role> CV keywords" for the 18 roles
- how ATS reads your CV, tailor CV to job description, good CV match score
- Jobscan alternative, free Jobscan alternative

Translated home pages (main phrase per language):
- tr: ücretsiz CV analizi, CV iş ilanı uyumu, ATS uyumlu CV
- de: Lebenslauf-Check kostenlos, Lebenslauf mit Stellenanzeige abgleichen, ATS-Check
- es: analizar CV gratis, comparar CV con oferta de empleo, CV ATS
- zh: 简历匹配, 简历关键词, 简历 ATS 检测

These are the intended targets, chosen without keyword-volume data. Validating them with
volumes is the first open question below.

## 7. Where things stand (measured)

- Google Search Console (URL-prefix property `https://cvxray.com/`): first data day
  2026-11-10 — 4 clicks, 8 impressions, average position 3; queries hidden (low volume).
- Google "Generative AI features" report: 5 impressions on 2026-11-10.
- Bing Webmaster Tools: verified, sitemap submitted; AI Performance baseline 0 citations.
- IndexNow: submits sitemap URLs after each production deploy.
- GA4: "AI assistants" channel group set up; key events not marked yet.
- The translated guides and articles went live on 2026-11-13 and are not yet submitted in
  Search Console.

Automated checks on every push (`tests/e2e/seo.spec.ts`): title 15–65 and description
70–160 characters, canonical, one H1, no noindex, html lang, OG/Twitter tags, JSON-LD parses,
no duplicate titles or descriptions, no broken internal links, every linked page in the
sitemap, hreflang on every multilingual page, AI crawlers allowed in robots.txt.

## 8. Known gaps

- Only 3 articles; no landing pages for "ATS resume checker" or "Jobscan alternative".
- Guides are 400–500 words; competitors' keyword pages often run longer with examples.
- Legal pages and the TR/DE/ES sample postings are English only.
- Chinese copy has not been reviewed by a native speaker.
- No backlinks or directory listings yet (Product Hunt and AlternativeTo copy is drafted).
- No author or "about" page (E-E-A-T signals).

## 9. Questions for the SEO manager

1. Which keywords, per language, have the volume and difficulty worth targeting? Should
   the primary term be "resume" (US) or "CV" (UK/EU)?
2. Should the home page target one main keyword, with separate landing pages for "ATS
   checker" and "Jobscan alternative"?
3. Are 400–500-word guides enough, or should they grow (sample bullets, salary-neutral
   role context, more FAQs)?
4. Which roles or articles should come next?
5. Is the `/tr`, `/de`, `/es`, `/zh` subfolder setup right, and should any market get
   localised keyword research before more translation?
6. Which off-page work first: directories, comparison sites, outreach?

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# CVXray — Agent Pre-Push Gate

**MANDATORY:** Before every `git push` or deploy, Claude must run ALL agents below in order.
A single 🔴 Critical finding BLOCKS the push. Fix it first.

---

## How to run

Claude runs each agent by reading the relevant source files and applying the agent's checklist.
Results are printed as a structured report. Push only when all agents return ✅ PASS.

---

## Agent 1 — 🔐 Security Engineer

**Checks:**
- XSS risks (dangerouslySetInnerHTML, unescaped user input)
- Exposed secrets in source code or env files committed to git
- Unvalidated user inputs at API boundaries (PDF upload, URL scrape)
- HTTP headers (X-Frame-Options, CSP, HSTS present in next.config.ts)
- OWASP Top 10 violations

**Files to read:** `src/app/api/**`, `next.config.ts`, `src/components/features/cv-analyzer.tsx`
**Blocks push on:** 🔴 Critical finding

---

## Agent 2 — 🧪 QA Engineer

**Checks:**
- Null/undefined access on optional data (results, arrays, API responses)
- Missing loading and error states in UI
- Edge cases: empty CV text, empty job text, failed scrape, invalid PDF
- All `fetch()` calls have error handling

**Files to read:** `src/components/features/cv-analyzer.tsx`, `src/app/api/scrape/route.ts`, `src/app/api/extract-pdf/route.ts`
**Blocks push on:** 🔴 Critical finding

---

## Agent 3 — 🔌 API Engineer

**Checks:**
- All API routes validate inputs before processing
- Correct HTTP status codes (400 for bad input, 500 for server errors)
- No unauthenticated endpoints that should be protected
- Response shapes are consistent

**Files to read:** `src/app/api/**`
**Blocks push on:** 🔴 Critical finding

---

## Agent 4 — 🎨 UI/UX Engineer

**Checks:**
- All interactive elements have ARIA labels or accessible text
- Loading states exist for every async action
- Mobile layout doesn't overflow at 375px
- No hardcoded colors that break dark mode

**Files to read:** `src/components/features/cv-analyzer.tsx`, `src/app/page.tsx`, `src/app/layout.tsx`
**Blocks push on:** 🔴 Critical finding

---

## Agent 5 — 🌐 Browser QA

**Checks:**
- Critical routes load without console errors
- Form validation flows work (empty, invalid, valid submission)
- Core Web Vitals risks: large unoptimized assets, layout shifts
- Keyboard navigation works on all interactive elements

**Files to read:** `src/components/features/cv-analyzer.tsx`, `src/app/page.tsx`
**Blocks push on:** 🔴 Critical finding

---

## Agent 6 — 🔍 SEO Continuous Improvement

This agent does not just check — it **improves** SEO on every push. The goal is compounding gains: each push leaves SEO better than before.

**Phase 1 — Regression Check (blocks push if broken):**
- `<title>` and `<meta description>` present, unique, keyword-rich
- Open Graph tags (`og:title`, `og:description`, `og:image`, `og:url`) all present
- JSON-LD structured data valid (WebApplication + FAQPage schemas)
- `robots.ts` allows indexing and blocks `/api/`
- `sitemap.ts` includes all public routes
- `llms.txt` exists and describes CVXray clearly for AI crawlers
- Any new pages have title + description (no blank/default metadata)

**Phase 2 — Active Improvement (implement before pushing):**
- Strengthen weak title/description copy — more specific, more keyword-rich
- Improve FAQ: rewrite vague questions as exact queries users type ("how to check if my resume matches a job description")
- Add missing FAQ entries targeting high-intent queries not yet covered
- Improve `llms.txt`: add new use cases, sharpen the product description, add new example questions
- Tighten JSON-LD: improve featureList, applicationCategory, description copy
- Improve H1 and page subheadlines for keyword density and clarity
- Add or improve `og:description` copy — should be a compelling call to action
- Check primary keywords present in copy: "CV matcher", "resume matcher", "job fit", "ATS checker", "free", "instant"

**Phase 3 — GEO (AI Engine Visibility):**
- Is CVXray described clearly enough that an AI would cite it when asked "what's the best free CV matcher"?
- Does `llms.txt` answer the top questions AI engines receive about CV tools?
- Are FAQ questions phrased as natural language queries (not generic headings)?

**Files to read:** `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/robots.ts`, `src/app/sitemap.ts`, `public/llms.txt`
**Files to improve:** `src/app/layout.tsx`, `src/app/page.tsx`, `public/llms.txt`
**Blocks push on:** 🔴 Critical finding (missing OG tags, broken JSON-LD, robots blocking indexing)
**Required before push:** At least 1 SEO improvement implemented per push cycle

---

## Pre-Push Report Format

Claude must output:

```
═══════════════════════════════════════
  PRE-PUSH AGENT REPORT
═══════════════════════════════════════
🔐 Security ........ ✅ PASS  (0 critical)
🧪 QA .............. ✅ PASS  (0 critical)
🔌 API ............. ✅ PASS  (0 critical)
🎨 UI/UX ........... ⚠️  WARN  (2 medium)
🌐 Browser QA ...... ✅ PASS  (0 critical)
🔍 SEO ............. ✅ PASS  (0 critical)
───────────────────────────────────────
VERDICT: ✅ SAFE TO PUSH
═══════════════════════════════════════
```

If any agent returns 🔴, verdict is `🔴 BLOCKED — fix before pushing`.

---

## Agent roles

Their full system prompts and file context are in `src/lib/agents-config.ts`.

| Agent | Pre-Push Gate |
|---|---|
| CEO | ❌ |
| Product Manager | ❌ |
| QA Engineer | ✅ |
| Security Engineer | ✅ |
| Pen Tester | ❌ |
| API Engineer | ✅ |
| UI/UX Engineer | ✅ |
| SEO Specialist | ✅ |
| Browser QA | ✅ |

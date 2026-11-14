# CVXray — project rules and lessons learned

The working memory of this project for AI agents (Claude Code and others). Read it before
implementing anything. **When you learn something that would have saved time, or make a
mistake worth not repeating, add it here in the same change.** Keep entries short and concrete:
the rule first, then why.

The pre-push gate (7 agents, logs, report, push procedure) is the `push-gate` skill in
`.claude/skills/push-gate/` — loaded only when pushing, so it costs nothing in other turns.
Hooks in `.claude/settings.json` enforce the mechanical rules (section 3–4).

---

## 1. Working style and budget

- **Do not fan out parallel subagents for bulk work** (translations, rewrites). Four parallel
  translation agents hit the 5-hour usage limit twice and blocked the owner's other work.
  Do it in the main session, one language or file at a time.
- **Write output to disk as soon as each piece is complete.** Agents that kept everything in
  memory until the end lost all work when the limit hit.
- **Smallest useful scope first.** Ship the part that brings value, list the rest as follow-ups,
  and say plainly what was left out and why.
- **Batch tool calls** (shell scripts, browser batches) instead of many single calls.
- **Parallel work, when it is worth it:** one agent per narrow task, each in its own git
  worktree (`isolation: "worktree"` for subagents, `claude --worktree` or a new session with a
  worktree), each with its own acceptance check (`npm run verify:quick` plus the test for its
  task). Never several writers in the same checkout. Merge their branches one at a time and run
  `npm run verify` after each.
- **One session per feature.** Long sessions resend their whole history on every turn and pay for
  compaction; everything a new session needs is in this file and the files it points to.
- Keep always-loaded files short (CLAUDE.md, AGENTS.md, this file). Long procedures belong in
  skills that load on demand.
- Reply to the owner in Turkish; code, comments, commits and docs in English.

## 2. Things that need the owner's explicit OK

- Downloads outside `npm install` (SDKs, toolchains, system images): name source and size.
- Accepting any licence or terms (Android SDK, Chrome first-run, cookie banners other than
  "reject").
- Any action in the owner's accounts: Bing Webmaster, Google Search Console, GA4, Vercel,
  Play Console (submitting sitemaps or URLs counts).
- `git push` — only after the gate. All seven agents ✅ PASS + verify green → push without
  asking (auto-push); any ⚠️/🔴 → the owner's localhost check first (see CLAUDE.md).
- Signing in, passwords, signing keys: always the owner's. Never create or store keystores.

## 3. Git and release

- **Commit subjects must be lower case** after the type: `feat(i18n): add …`, not
  `feat(i18n): Add …`. commitlint rejects sentence case; a PreToolUse hook
  (`.claude/hooks/commit-subject.mjs`) now refuses such `git commit -m` before it runs.
- **CI's semantic-release pushes a `chore(release): x.y.z [skip ci]` commit after every push.**
  Before pushing: `git fetch origin && git rebase origin/main`, then push. The pre-push hook
  (`.claude/hooks/pre-push.mjs`) refuses a push that does not contain origin/main.
- **Pushing from a worktree** (to leave someone else's uncommitted work out): run verify in
  the worktree (real `npm ci` there — Turbopack refuses a symlinked `node_modules`), then
  `cd <worktree> && git push origin HEAD:main`. The pre-push hook checks the folder named by
  a leading `cd … &&` or `git -C …`; otherwise it checks the project folder.
- lint-staged runs `eslint --fix` on staged `.ts/.tsx` at commit time.
- Commit only what the task touched; stage files by name when the tree has unrelated changes.
- Unpushed commits may be amended; pushed ones never.

## 4. Verification before saying "done"

- **`npm run verify`** runs everything: types (web + app), lint, unit tests, production build,
  browser tests on port 3100. Short output; on failure it prints the last lines. A full pass on
  a clean tree is recorded in `.claude/verify/last.json`; the pre-push hook requires it for the
  commit being pushed.
- `npm run verify:quick`: types, lint and unit tests only — run it after every change.
- **Wait ~60 s between full Playwright runs**: the rate-limit test fails if the previous run's
  requests are still counted.
- `next dev` regenerates `.next/dev/types`; after moving or deleting routes, stale types break
  `tsc` → `rm -rf .next/dev/types` (or `npx next typegen`).
- Engine changes: compare every English fixture score with the previous engine
  (`git show HEAD:src/lib/analyze.ts` into the scratchpad, import both in a throwaway test).
  English scores must not move unless that is the point of the change.
- Previewable changes: check them in the browser pane, not only in tests.

## 5. Site architecture you must keep consistent

- **Languages:** `en` at `/`, `tr`, `de`, `es`, `pt` (Brazil, `pt-BR`), `fr`, `zh` under `/<code>/…`, same path otherwise.
  Every page exists in every language: home, `/resume-keywords`, 18 guides, `/blog`,
  3 articles, `/terms`, `/privacy`, `/refund-policy`.
- **Two root layouts:** `src/app/(en)/layout.tsx` and `src/app/[lang]/layout.tsx`, both render
  `components/root-shell.tsx`, so `<html lang>` is right in static HTML. Unmatched URLs are
  served by `app/global-not-found.tsx` (`experimental.globalNotFound`; recheck on Next upgrades).
- Pages are shared components in `src/components/pages/*` and `home-page.tsx`, called with a
  `locale` by thin route files in `(en)` and `[lang]`.
- **Strings:** UI in `src/lib/i18n/{en,tr,de,es,zh}.ts` (`en.ts` defines the shape — add a key
  to every language). Page strings in `pages.<lang>.ts`. Content (guides, articles, samples, legal)
  in `src/lib/i18n/content/*.<lang>.ts(x)`, read through `content/index.ts`.
- Paths: `localePath(locale, "/blog")`; hreflang: `alternatesFor(path)`. Every page sets a
  self canonical plus `languages`; the sitemap lists every page in every language.
- Route groups add a suffix to colocated `opengraph-image` routes; old URLs are redirected in
  `next.config.ts`. Tests must follow the `og:image` URL a page advertises.
- Shared between web and app: `src/lib/analyze.ts`, `languages.ts`, `suggestions.ts`,
  `resources.ts`, `i18n/*`. No React or Next imports in these.

- **Adding a language** (done for `pt` and `fr`, Nov 2026; one language per push, owner's rule):
  1. Engine first (`languages.ts`): stop words, skill aliases per group, headings, years
     ("pelo menos 3 anos"), months, "present", education words. Add the language to
     `tests/unit/fixtures-intl.ts` (3 cases) and `languages.test.ts`, and compare all
     English pairs with the previous engine (section 4).
  2. Files: `<code>.ts`, `pages.<code>.ts`, `content/{roles,posts,samples}.<code>.ts`,
     `content/legal.<code>.tsx`; register in `i18n/index.ts` (`LOCALES`, `LOCALE_INFO`) and
     `content/index.ts`. Translate from the closest existing language (pt from es).
     Every language needs a flag: `flag` in `LOCALE_INFO` (required by its type); a new
     country also goes in `FLAG_COUNTRIES` plus an SVG in `components/flag.tsx` (30×20
     canvas, simplified, no emoji — Windows shows emoji flags as letters).
  3. Hard-coded lists: `not-found-content.tsx` (text + regex), `scripts/seo-inventory.mjs`,
     `tests/e2e/seo.spec.ts`, `tests/e2e/pages.spec.ts` (home flow + footer),
     `tests/unit/analyze.test.ts` (nurse/logistics guide test), the "which languages"
     FAQ answer in every language and `lib/faqs.ts`. `grep -rn "tr|de|es"` finds most.
  4. Nurse and logistics guide keywords must use phrases from the new aliases (unit-tested).
  5. Check all `/<code>` pages' title/description lengths in the browser before verify:
     role titles need a short last fallback ("{role}: palavras-chave para CV").
  6. Check the years pattern with the language's own phrasing: French "5 ans d'expérience"
     needed the elided "d'" in `YEARS_TAIL` (analyze.ts), not only a new unit word.
  7. While another session has uncommitted edits in the shared checkout, build the language
     commit in a worktree from HEAD and push from there (`git -C <worktree> push origin
     <branch>:main`); the pre-push hook only sees the main checkout.

## 6. SEO rules (enforced by `tests/e2e/seo.spec.ts`)

- Title 15–65 characters **including** " | CVXray" (9) — keep page titles ≤ 56. Chinese counts
  characters, so short Chinese titles fail: write e.g. "CVXray 隐私政策", not "隐私政策".
- Description 70–160 characters, unique per page and language.
- Exactly one `<h1>`, self canonical, `index, follow`, OG and Twitter tags, parseable JSON-LD.
- Every linked page must be in the sitemap; every multilingual page needs hreflang for every
  language plus `x-default`.
- New translations: run the crawl — machine-written text regularly overshoots the limits.
- `node scripts/seo-inventory.mjs` regenerates `docs/seo/content-inventory.*`;
  `docs/seo/seo-brief.md` is the hand-off for the SEO manager.

## 7. Scoring engine rules

- Every alias in `LOCALIZED_SKILL_ALIASES` applies to every language (no language detection).
  An alias must not be an everyday word in another language: German "KI" is Turkish "ki",
  Spanish "contenedores" are shipping containers, "triage"/"ACLs"/"epic" fire on tech posts.
- Trailing `*` marks a stem for Turkish/German endings ("hasta bakım*").
- Real postings name the skill between the year count and "experience" ("3 年以上 React
  开发经验"); keep year patterns tolerant and test real phrasings.
- `tests/unit/fixtures-intl.ts` holds the same CV and job in six languages; scores must stay
  within 10 points of English. Translated sample postings must each yield 3+ skills, a years
  requirement and full length (unit-tested).
- Every push needs one commented "Math Prof improvement" (AGENTS.md); describe the measured
  before → after in the comment.

## 8. Browsers and owner accounts

- The built-in browser pane has none of the owner's sign-ins. Bing Webmaster, Search Console
  and GA4 need **Claude in Chrome**, with the owner signing in there.
- If the Chrome extension does not respond, ask the owner to open Chrome and the Claude side
  panel; do not loop on retries.
- Close tabs you opened when done.

## 9. Elsewhere (read when relevant)

- `mobile/CLAUDE.md` — the Expo app, Android toolchain and emulator (loads automatically in `mobile/`)
- `docs/STATUS.md` — search visibility status, recheck dates, known gaps and follow-ups
- `.claude/skills/push-gate/` — the pre-push gate


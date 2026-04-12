# 🔥 CVXray — CV Scorer

> **Free AI resume matcher.** Upload your CV, paste a job description or LinkedIn URL, and get an instant match score with skill gap analysis and personalized course recommendations.

Built with **Next.js 16**, **React 19**, **TypeScript**, and powered by a multi-agent AI quality system.

---

## Table of Contents

- [What It Does](#what-it-does)
- [Tech Stack](#tech-stack)
- [AI Agent System](#ai-agent-system)
  - [UI Panel Agents](#ui-panel-agents)
  - [Pre-Push Gate Agents](#pre-push-gate-agents)
- [Automation Pipeline](#automation-pipeline)
  - [Git Hooks (Husky)](#git-hooks-husky)
  - [Commit Standards (Commitlint)](#commit-standards-commitlint)
  - [Staged Linting (lint-staged)](#staged-linting-lint-staged)
  - [Automated Releases (semantic-release)](#automated-releases-semantic-release)
  - [Dependency Updates (Renovate)](#dependency-updates-renovate)
- [Excalidraw Architecture Canvas](#excalidraw-architecture-canvas)
- [Claude Code Integration](#claude-code-integration)
- [Getting Started](#getting-started)

---

## What It Does

1. **Upload a PDF CV** — text extracted client-side via `unpdf`, never sent to a server
2. **Paste a job URL or description** — scraper fetches job listings from any public URL
3. **Instant analysis** — 40+ skill categories, keyword overlap, and match percentage
4. **AI Agents Panel** — 9 specialist AI agents that audit the codebase in the browser
5. **Telegram Bot** — receive match results via Telegram webhook

Your CV data never leaves your device. All analysis is local. Zero accounts required.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.2.2 (App Router) |
| UI | React 19, Tailwind CSS v4, shadcn/ui |
| AI | Vercel AI SDK v6, Anthropic Claude, Google Gemini |
| PDF | unpdf (WASM-based, client-side) |
| Fonts | Geist Sans + Geist Mono via `next/font` |
| Deploy | Vercel (Fluid Compute) |
| CI/CD | GitHub Actions + semantic-release |
| Hooks | Husky v9 |

---

## AI Agent System

CVXray ships with a **9-agent AI panel** accessible at `/agents`. Each agent reads the actual source code and performs a structured audit. Agents are defined in [`src/lib/agents-config.ts`](src/lib/agents-config.ts).

### UI Panel Agents

These agents run interactively in the browser — paste your findings, get structured reports.

| # | Agent | Emoji | What It Does |
|---|---|---|---|
| 1 | **CEO** | 👔 | Brand voice, copy quality, naming consistency (`CVXray` vs `CV Scorer`) |
| 2 | **Product Manager** | 📊 | Feature gaps, UX flows, missing functionality, scope issues |
| 3 | **QA Engineer** | 🧪 | Bugs, null/undefined risks, broken logic, edge cases |
| 4 | **Security Engineer** | 🔐 | XSS, CSRF, OWASP Top 10, exposed secrets, insecure headers |
| 5 | **Pen Tester** | 💉 | Prompt injection, path traversal, URL injection, PDF exploits |
| 6 | **API Engineer** | 🔌 | Input validation, HTTP status codes, missing rate limits, unauthenticated endpoints |
| 7 | **UI/UX Engineer** | 🎨 | ARIA labels, responsive layouts, loading/error states, mobile UX |
| 8 | **SEO Specialist** | 🔍 | Metadata, structured data, keyword strategy, Open Graph |
| 9 | **Browser QA** | 🌐 | Smoke tests, interaction flows, visual regression, accessibility (WCAG AA) |

Each agent:
- Reads the **live source files** at runtime (not a snapshot)
- Rates every finding: 🔴 Critical / 🟡 Medium / 🟢 Low
- Returns a structured report with actionable fixes

---

### Pre-Push Gate Agents

Before every `git push`, Claude runs **5 gate agents** defined in [`AGENTS.md`](AGENTS.md). A single 🔴 Critical finding **blocks the push**.

```
═══════════════════════════════════════
  PRE-PUSH AGENT REPORT
═══════════════════════════════════════
🔐 Security ........ ✅ PASS  (0 critical)
🧪 QA .............. ✅ PASS  (0 critical)
🔌 API ............. ✅ PASS  (0 critical)
🎨 UI/UX ........... ⚠️  WARN  (2 medium)
🌐 Browser QA ...... ✅ PASS  (0 critical)
───────────────────────────────────────
VERDICT: ✅ SAFE TO PUSH
═══════════════════════════════════════
```

**To trigger:** In your Claude session, say `run pre-push agent checks`.

| Agent | UI Panel | Pre-Push Gate |
|---|---|---|
| CEO | ✅ | ❌ |
| Product Manager | ✅ | ❌ |
| QA Engineer | ✅ | ✅ |
| Security Engineer | ✅ | ✅ |
| Pen Tester | ✅ | ❌ |
| API Engineer | ✅ | ✅ |
| UI/UX Engineer | ✅ | ✅ |
| SEO Specialist | ✅ | ❌ |
| Browser QA | ✅ | ✅ |

---

## Automation Pipeline

CVXray uses a full automated quality pipeline. Nothing reaches production without passing through every gate.

```
Write code
    │
    ▼
┌─────────────────────────────────────────┐
│  git add + git commit                   │
│                                         │
│  → lint-staged runs on staged files     │
│    (ESLint + auto-fix)                  │
│                                         │
│  → commitlint validates message format  │
│    (feat:, fix:, chore:, etc.)          │
└─────────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────────┐
│  git push                               │
│                                         │
│  → TypeScript type check (blocks)       │
│  → ESLint full scan (warns)             │
│  → Claude agent pre-push gate           │
└─────────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────────┐
│  GitHub Actions (main branch)           │
│                                         │
│  → semantic-release analyzes commits    │
│  → Bumps version (semver)               │
│  → Writes CHANGELOG.md                 │
│  → Creates GitHub Release + git tag     │
└─────────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────────┐
│  Renovate (every Monday before 6am)     │
│                                         │
│  → Auto-PRs for outdated dependencies   │
│  → Auto-merges patch/minor devDeps      │
│  → Flags next/react/react-dom manually  │
└─────────────────────────────────────────┘
```

---

### Git Hooks (Husky)

Three hooks run automatically via [Husky v9](https://typicode.github.io/husky):

| Hook | Trigger | Action |
|---|---|---|
| `pre-commit` | `git commit` | Runs `lint-staged` on staged `.ts`/`.tsx` files |
| `commit-msg` | `git commit` | Validates commit message format via `commitlint` |
| `pre-push` | `git push` | TypeScript full type check + ESLint scan |

The pre-push hook **blocks** on TypeScript errors. ESLint warnings allow the push but surface issues.

Hooks are skipped in CI with `HUSKY=0` to prevent infinite push loops during semantic-release.

---

### Commit Standards (Commitlint)

All commits must follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add telegram webhook support
fix: handle null response from scrape API
chore: update dependencies
docs: update README
refactor: extract skill-matching logic
perf: reduce bundle size for PDF parser
```

Commits that don't match this format are **rejected at commit time**.

This format is the input that drives semantic-release's version bumping:

| Commit type | Version bump |
|---|---|
| `fix:` | Patch (0.0.**X**) |
| `feat:` | Minor (0.**X**.0) |
| `feat!:` or `BREAKING CHANGE` | Major (**X**.0.0) |
| `chore:`, `docs:`, `refactor:` | No release |

---

### Staged Linting (lint-staged)

On every commit, lint-staged runs ESLint **only on staged files** — fast, focused, no full-repo scans on every save.

```json
{
  "lint-staged": {
    "*.{ts,tsx}": "next lint --fix"
  }
}
```

Auto-fixable issues are fixed in place and re-staged before the commit lands.

---

### Automated Releases (semantic-release)

Merges to `main` trigger the [release workflow](.github/workflows/release.yml):

1. **Commit Analyzer** — reads all commits since last release, determines version bump
2. **Release Notes Generator** — builds a human-readable changelog section
3. **Changelog** — appends to `CHANGELOG.md`
4. **Git** — commits `CHANGELOG.md` + bumped `package.json` back to `main`
5. **GitHub** — creates a GitHub Release with the release notes and a `v{version}` tag

No manual version bumping. No manual release notes. Every merge is a release candidate.

---

### Dependency Updates (Renovate)

[Renovate](https://docs.renovatebot.com/) scans for outdated packages every **Monday before 6am** and opens PRs automatically:

| Rule | Behavior |
|---|---|
| `patch` devDependencies | Auto-merge |
| `minor` devDependencies | Auto-merge |
| `next`, `react`, `react-dom` | Manual review required, labeled `major-dep` |
| All other packages | PR opened, not auto-merged |

Config: [`renovate.json`](renovate.json)

---

## Excalidraw Architecture Canvas

The app architecture is visualized on a live [Excalidraw](https://excalidraw.com/) canvas served at `http://localhost:3002`.

The canvas shows the full app flow:
- Main user journey: Upload CV → Scrape URL → Analyze → Score → Results
- Agents Panel branch (left side)
- Telegram Bot branch (right side)

**The canvas auto-updates** after every Claude Code session via a Stop hook:

```json
// cv-scorer/.claude/settings.json
{
  "hooks": {
    "Stop": [{
      "matcher": "",
      "hooks": [{
        "type": "command",
        "command": "node /Users/aliisatas/Desktop/hire-match/update-canvas.mjs 2>/dev/null || true"
      }]
    }]
  }
}
```

To start the canvas server:

```bash
cd /Users/aliisatas/tools/mcp_excalidraw
PORT=3002 npm run canvas
```

The MCP Excalidraw server is configured in [`.mcp.json`](../.mcp.json) and gives Claude direct draw access to the canvas.

---

## Claude Code Integration

CVXray is built with Claude Code as a first-class collaborator. Two config files define the AI workflow:

**[`CLAUDE.md`](CLAUDE.md)** — includes `AGENTS.md` and defines when to run each agent.

**[`AGENTS.md`](AGENTS.md)** — the pre-push gate protocol. 5 agents, structured report format, blocking rules.

**[`.claude/settings.json`](.claude/settings.json)** — Stop hook that auto-redraws the Excalidraw canvas after every session.

Workflow summary:

```
Claude writes code
    → Stop hook fires → canvas updated
    → User says "run pre-push agent checks"
    → 5 agents run in sequence
    → Report printed with SHIP / BLOCKED verdict
    → If SHIP → git push → GitHub Actions → semantic-release
```

---

## Getting Started

```bash
# Install dependencies
npm install

# Run dev server
npm run dev
# → http://localhost:3000

# Run the Excalidraw canvas server (separate terminal)
cd /Users/aliisatas/tools/mcp_excalidraw
PORT=3002 npm run canvas
# → http://localhost:3002

# Type check
npx tsc --noEmit

# Lint
npm run lint

# Build for production
npm run build
```

---

> Built by humans, quality-gated by AI.  
> Your CV data never leaves your device.


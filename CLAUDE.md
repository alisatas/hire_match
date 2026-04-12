@AGENTS.md

## Pre-Push Gate — MANDATORY (in order, no exceptions)

**BEFORE EVERY `git push`:**
1. Read AGENTS.md
2. Run all 6 gate agents in order: Security, QA, API, UI/UX, Browser QA, SEO
3. Read the relevant source files for each agent
4. Output the full PRE-PUSH AGENT REPORT
5. If any 🔴 Critical finding exists — BLOCK the push and list what must be fixed first
6. **SEO is a continuous improvement loop — not just a check:**
   - Phase 1: verify nothing is broken
   - Phase 2: implement at least 1 concrete SEO improvement (copy, FAQ, llms.txt, JSON-LD, metadata)
   - Phase 3: verify improvement was applied, then include it in the commit
7. **Show the user the localhost link and wait for approval:**
   - Make sure the dev server is running (`npm run dev` in cv-scorer/)
   - Tell the user: "Changes are live at http://localhost:3000 — please check and confirm before I push."
   - **Do NOT push until the user explicitly says to push.**
8. Only run `git push` after ✅ SAFE TO PUSH verdict, SEO improvements committed, AND user has confirmed localhost looks good

Never skip any step, even for small fixes or renames.

## Excalidraw Canvas Rule

After every feature addition or significant code change, update the Excalidraw canvas at http://localhost:3002 to reflect the current app architecture.

Run the update script:
```bash
node /Users/aliisatas/Desktop/hire-match/update-canvas.mjs
```

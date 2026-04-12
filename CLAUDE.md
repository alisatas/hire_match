@AGENTS.md

## Pre-Push Agent Gate — MANDATORY

**BEFORE EVERY `git push`, NO EXCEPTIONS:**
1. Read AGENTS.md
2. Run all 6 gate agents in order: Security, QA, API, UI/UX, Browser QA, SEO
3. Read the relevant source files for each agent
4. Output the full PRE-PUSH AGENT REPORT
5. If any 🔴 Critical finding exists — BLOCK the push and list what must be fixed first
6. **SEO is a continuous improvement loop — not just a check:**
   - Phase 1: verify nothing is broken
   - Phase 2: implement at least 1 concrete SEO improvement (copy, FAQ, llms.txt, JSON-LD, metadata)
   - Phase 3: verify improvement was applied, then include it in the commit
7. Only run `git push` after ✅ SAFE TO PUSH verdict and SEO improvements are committed

Never skip this gate, even for small fixes or renames.

## Excalidraw Canvas Rule

After every feature addition or significant code change, update the Excalidraw canvas at http://localhost:3002 to reflect the current app architecture.

Run the update script:
```bash
node /Users/aliisatas/Desktop/hire-match/update-canvas.mjs
```

@AGENTS.md
@PROJECT.md

## Project rules and lessons learned — MANDATORY

PROJECT.md is this project's working memory: architecture, rules, commands and past mistakes.
Read it before implementing. Whenever you learn something that would have saved time, hit a
problem worth not repeating, or the status in it changes, update PROJECT.md in the same change.

## Pre-Push Gate — MANDATORY

Before every `git push`, run the `push-gate` skill (`/push-gate`) and follow it to the letter:
`npm run verify`, the 7 agents with their logs, the report, then rebase and push. Never skip
it, even for small fixes or renames.

**Auto-push (owner's standing rule, 2026-11-14):** when verify passed on the commit and all
seven agents in the report are ✅ PASS, push without asking — the owner's localhost check is
not needed. Any ⚠️ WARN or 🔴 BLOCKED, or a push that would carry someone else's
uncommitted work, → stop and ask the owner as before. Hooks in
`.claude/settings.json` refuse a push when origin/main is not rebased in or verify has not
passed on the commit, and refuse commit subjects commitlint would reject.

## Excalidraw Canvas Rule

After every feature addition or significant code change, update the Excalidraw canvas at http://localhost:3002 to reflect the current app architecture.

Run the update script:
```bash
node /Users/aliisatas/Desktop/hire-match/update-canvas.mjs
```

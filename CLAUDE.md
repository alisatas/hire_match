@AGENTS.md

## Pre-Push Agent Gate

When the user says "run pre-push agent checks" or "check before push":
1. Read AGENTS.md
2. Run each of the 5 gate agents in order (Security, QA, API, UI/UX, Browser QA)
3. Read the relevant source files for each agent
4. Output the structured PRE-PUSH AGENT REPORT from AGENTS.md
5. If any 🔴 Critical finding exists — BLOCK and list what must be fixed

## Excalidraw Canvas Rule

After every feature addition or significant code change, update the Excalidraw canvas at http://localhost:3002 to reflect the current app architecture.

Run the update script:
```bash
node /Users/aliisatas/Desktop/hire-match/update-canvas.mjs
```

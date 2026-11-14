<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# CVXray — agents

- Project rules, architecture and lessons learned: `PROJECT.md` (read before implementing).
- Pre-push gate (7 review agents, logs, report, push procedure): the `push-gate` skill in
  `.claude/skills/push-gate/SKILL.md`. Load it only when pushing — it is long on purpose.
- One command for all checks: `npm run verify` (`npm run verify:quick` for types, lint, unit tests).

#!/usr/bin/env node
// One command for every check an agent must pass before saying "done" or pushing.
//
//   npm run verify          # types (web + app), lint, unit tests, production build, browser tests
//   npm run verify:quick    # types, lint, unit tests only (seconds)
//
// Each step's output is kept short; on failure the last lines are printed so an agent can act
// on them without re-running. A full pass records the commit in .claude/verify/last.json,
// which the pre-push hook (.claude/hooks/pre-push.mjs) checks.
import { spawnSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";

const quick = process.argv.includes("--quick");
const env = { ...process.env };

const steps = [
  ["types (web)", "npx", ["tsc", "--noEmit"]],
  ["types (app)", "npx", ["tsc", "--noEmit"], { cwd: "mobile" }],
  ["lint", "npx", ["eslint", "src", "tests", "scripts"]],
  ["unit tests", "npx", ["vitest", "run"]],
  ...(quick ? [] : [
    ["production build", "npm", ["run", "build"]],
    // Production server on its own port, so a running dev server is left alone
    ["browser tests", "npx", ["playwright", "test"], { env: { ...env, CI: "1", E2E_PORT: "3100" } }],
  ]),
];

const sha = spawnSync("git", ["rev-parse", "HEAD"], { encoding: "utf8" }).stdout.trim();
const dirty = spawnSync("git", ["status", "--porcelain"], { encoding: "utf8" }).stdout.trim() !== "";
const results = [];
for (const [name, cmd, args, opts = {}] of steps) {
  const started = Date.now();
  const run = spawnSync(cmd, args, { encoding: "utf8", env, maxBuffer: 64 * 1024 * 1024, ...opts });
  const seconds = ((Date.now() - started) / 1000).toFixed(0);
  const ok = run.status === 0;
  results.push({ name, ok, seconds });
  console.log(`${ok ? "✔" : "✘"} ${name} (${seconds}s)`);
  if (!ok) {
    const out = `${run.stdout ?? ""}\n${run.stderr ?? ""}`.trim().split("\n").filter(Boolean);
    console.log(out.slice(-40).map((l) => `    ${l}`).join("\n"));
    console.log(`\nverify FAILED at "${name}". Fix it and run verify again.`);
    process.exit(1);
  }
}

if (!quick) {
  mkdirSync(".claude/verify", { recursive: true });
  writeFileSync(".claude/verify/last.json", JSON.stringify({ sha, dirty, at: new Date().toISOString(), results }, null, 2));
}
console.log(`\nverify passed${quick ? " (quick)" : ""} on ${sha.slice(0, 7)}${dirty ? " with uncommitted changes" : ""}.`);

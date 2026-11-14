#!/usr/bin/env node
// PreToolUse hook (Bash): refuses `git push` unless
//   1. the branch already contains origin/main (CI's release commit is rebased in), and
//   2. `npm run verify` passed on exactly this commit with a clean tree.
// Whether the owner must approve (any ⚠️/🔴 in the gate report) is decided in CLAUDE.md; this only removes the
// mechanical mistakes that kept recurring.
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const input = JSON.parse(readFileSync(0, "utf8") || "{}");
const command = input?.tool_input?.command ?? "";
if (!/(^|[;&|]\s*|\s)git\s+push\b/.test(command)) process.exit(0);

// The repository being pushed: `git -C <dir> push` or a leading `cd <dir> &&` (a worktree,
// for example), else the project folder. Checking the project folder for a push made from a
// worktree compared the wrong HEAD and verify marker.
const unquote = (s) => s.replace(/^(["'])(.*)\1$/, "$2");
const dirArg = /\bgit\s+-C\s+("[^"]+"|'[^']+'|\S+)\s+push\b/.exec(command)?.[1]
  ?? /^\s*cd\s+("[^"]+"|'[^']+'|\S+)\s*&&/.exec(command)?.[1];
const cwd = dirArg ? unquote(dirArg) : process.cwd();

const git = (...args) => execFileSync("git", args, { encoding: "utf8", cwd }).trim();
const deny = (reason) => {
  process.stdout.write(JSON.stringify({
    hookSpecificOutput: { hookEventName: "PreToolUse", permissionDecision: "deny", permissionDecisionReason: reason },
  }));
  process.exit(0);
};

try {
  git("fetch", "-q", "origin");
} catch {
  deny("Could not fetch origin to check for CI's release commit. Check the network and retry.");
}
try {
  git("merge-base", "--is-ancestor", "origin/main", "HEAD");
} catch {
  deny("origin/main has commits this branch does not (usually CI's chore(release) commit). Run: git rebase origin/main, then push.");
}

const head = git("rev-parse", "HEAD");
const marker = join(git("rev-parse", "--show-toplevel"), ".claude/verify/last.json");
const last = existsSync(marker) ? JSON.parse(readFileSync(marker, "utf8")) : null;
if (!last || last.sha !== head || last.dirty) {
  deny(`npm run verify has not passed on ${head.slice(0, 7)} with a clean tree. Commit everything, run: npm run verify, then push.`);
}
process.exit(0);

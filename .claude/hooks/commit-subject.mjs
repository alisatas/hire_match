#!/usr/bin/env node
// PreToolUse hook (Bash): catches what commitlint would reject, before the commit runs —
// a conventional-commit subject must start in lower case after "type(scope): ".
import { readFileSync } from "node:fs";

const input = JSON.parse(readFileSync(0, "utf8") || "{}");
const command = input?.tool_input?.command ?? "";
if (!/\bgit\s+commit\b/.test(command)) process.exit(0);

const message = /\s-m\s+(["'])([\s\S]*?)\1/.exec(command)?.[2];
if (!message) process.exit(0);
const subject = message.split("\n")[0];
const conventional = /^[a-z]+(\([^)]*\))?!?:\s*(\S)/.exec(subject);
if (!conventional) {
  process.stdout.write(JSON.stringify({ hookSpecificOutput: { hookEventName: "PreToolUse", permissionDecision: "deny",
    permissionDecisionReason: `Commit subject must follow conventional commits ("type(scope): subject"): "${subject}"` } }));
  process.exit(0);
}
if (/\p{Lu}/u.test(conventional[2])) {
  process.stdout.write(JSON.stringify({ hookSpecificOutput: { hookEventName: "PreToolUse", permissionDecision: "deny",
    permissionDecisionReason: `Commit subject must start in lower case after the type (commitlint subject-case): "${subject}"` } }));
}
process.exit(0);

#!/usr/bin/env node
/**
 * Post a tweet to @cvxray on X after every push.
 * Reads TWITTER_API_KEY / SECRET / ACCESS_TOKEN / SECRET from env.
 * Run manually: npm run twitter:post
 * Auto-triggered: .husky/post-push
 */

import { execSync } from "node:child_process"
import { createHmac, randomBytes } from "node:crypto"

const CONSUMER_KEY    = process.env.TWITTER_API_KEY
const CONSUMER_SECRET = process.env.TWITTER_API_KEY_SECRET
const TOKEN           = process.env.TWITTER_ACCESS_TOKEN
const TOKEN_SECRET    = process.env.TWITTER_ACCESS_TOKEN_SECRET
const TWEET_URL       = "https://api.twitter.com/2/tweets"

// ── Guard: skip if credentials missing ────────────────────────────────────
if (!CONSUMER_KEY || !CONSUMER_SECRET || !TOKEN || !TOKEN_SECRET) {
  console.log("🐦 X: Twitter credentials not set — skipping.")
  process.exit(0)
}

// ── OAuth 1.0a helpers (ported from src/app/api/tweet/route.ts) ───────────
function pct(s) {
  return encodeURIComponent(s).replace(/[!'()*]/g, c => "%" + c.charCodeAt(0).toString(16).toUpperCase())
}

function oauthHeader(method, url) {
  const nonce     = randomBytes(16).toString("hex")
  const timestamp = Math.floor(Date.now() / 1000).toString()

  const params = {
    oauth_consumer_key:     CONSUMER_KEY,
    oauth_nonce:            nonce,
    oauth_signature_method: "HMAC-SHA1",
    oauth_timestamp:        timestamp,
    oauth_token:            TOKEN,
    oauth_version:          "1.0",
  }

  const sorted     = Object.entries(params).sort(([a], [b]) => a.localeCompare(b)).map(([k, v]) => `${pct(k)}=${pct(v)}`).join("&")
  const base       = [method.toUpperCase(), pct(url), pct(sorted)].join("&")
  const signingKey = `${pct(CONSUMER_SECRET)}&${pct(TOKEN_SECRET)}`
  params["oauth_signature"] = createHmac("sha1", signingKey).update(base).digest("base64")

  return "OAuth " + Object.entries(params).sort(([a], [b]) => a.localeCompare(b)).map(([k, v]) => `${pct(k)}="${pct(v)}"`).join(", ")
}

// ── Read git commit info ───────────────────────────────────────────────────
function git(cmd) {
  try { return execSync(cmd, { encoding: "utf8" }).trim() } catch { return "" }
}

const subject = git(`git log -1 --pretty=format:"%s"`)
const body    = git(`git log -1 --pretty=format:"%b"`)

const bodyLines = body
  .split("\n")
  .map(l => l.trim())
  .filter(l => l.length > 0 && !l.startsWith("Co-Authored"))
  .slice(0, 3)

const bullets = bodyLines.length > 0
  ? bodyLines.map(l => (l.startsWith("-") || l.startsWith("•") ? l : `• ${l}`)).join("\n")
  : `• ${subject}`

// ── Build tweet (≤280 chars) ───────────────────────────────────────────────
const HASHTAGS = "#cvxray #resumetips #jobsearch #ats"
const SUFFIX   = `\n\ncvxray.com — free ATS score, no sign-up\n\n${HASHTAGS}`

let tweetText = `🚀 CVXray updated!\n\n${bullets}${SUFFIX}`

// Truncate if over 280 chars
if (tweetText.length > 280) {
  const budget = 280 - SUFFIX.length - 6 // 6 = "…\n\n" padding
  tweetText = `🚀 CVXray updated!\n\n${bullets.slice(0, budget)}…${SUFFIX}`
}

// ── Post to X ─────────────────────────────────────────────────────────────
async function run() {
  console.log("\n🐦 Posting to X (@cvxray)...")

  try {
    const res = await fetch(TWEET_URL, {
      method: "POST",
      headers: {
        Authorization:  oauthHeader("POST", TWEET_URL),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: tweetText }),
    })

    if (!res.ok) {
      const err = await res.text()
      throw new Error(`HTTP ${res.status}: ${err}`)
    }

    const data = await res.json()
    console.log(`✅ Tweet published (${data?.data?.id})\n`)
  } catch (err) {
    console.error(`❌ Tweet failed: ${err.message}\n`)
  }
}

run()
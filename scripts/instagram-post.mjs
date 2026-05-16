#!/usr/bin/env node
/**
 * Post a feed post + story to @cvxray.ai after every push.
 * Reads INSTAGRAM_ACCESS_TOKEN and INSTAGRAM_BUSINESS_ACCOUNT_ID from env.
 * Run manually: npm run instagram:post
 * Auto-triggered: .husky/post-push
 */

import { execSync } from "node:child_process"

const IG_ID = process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID
const TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN
const TOKEN_EXPIRY = process.env.INSTAGRAM_TOKEN_EXPIRY
const BASE_URL = "https://graph.facebook.com/v22.0"
const IMAGE_URL = "https://cvxray.com/opengraph-image"
const HASHTAGS =
  "#cvxray #resumetips #jobsearch #ats #resumebuilder #aitools #careertips #jobhunting #cv #techjobs"

// ── Token expiry warning ───────────────────────────────────────────────────
if (TOKEN_EXPIRY) {
  const daysLeft = Math.floor((new Date(TOKEN_EXPIRY) - Date.now()) / 86_400_000)
  if (daysLeft < 10) {
    console.warn(`\n⚠️  Instagram token expires in ${daysLeft} day(s)! Refresh at:`)
    console.warn(
      `   https://graph.facebook.com/v22.0/oauth/access_token?grant_type=ig_exchange_token&client_id=YOUR_APP_ID&client_secret=YOUR_APP_SECRET&access_token=${TOKEN}\n`
    )
  }
}

// ── Guard: skip if credentials missing ────────────────────────────────────
if (!IG_ID || !TOKEN) {
  console.log("📸 Instagram: INSTAGRAM_ACCESS_TOKEN or INSTAGRAM_BUSINESS_ACCOUNT_ID not set — skipping.")
  process.exit(0)
}

// ── Read git commit info ───────────────────────────────────────────────────
function git(cmd) {
  try {
    return execSync(cmd, { encoding: "utf8", cwd: process.cwd() }).trim()
  } catch {
    return ""
  }
}

const subject = git(`git log -1 --pretty=format:"%s"`)
const body = git(`git log -1 --pretty=format:"%b"`)
const stats = git(`git diff HEAD~1 --shortstat`)

// Parse commit body into bullet points (lines starting with - or •, or plain lines)
const bodyLines = body
  .split("\n")
  .map((l) => l.trim())
  .filter((l) => l.length > 0 && !l.startsWith("Co-Authored"))
  .slice(0, 8)

const bullets =
  bodyLines.length > 0
    ? bodyLines.map((l) => (l.startsWith("-") || l.startsWith("•") ? l : `• ${l}`)).join("\n")
    : `• ${subject}`

// ── Build captions ─────────────────────────────────────────────────────────
const feedCaption = [
  "🚀 CVXray just shipped an update!\n",
  bullets,
  stats ? `\n📊 ${stats.trim()}` : "",
  "\nFree at cvxray.com — instant ATS match score, no sign-up 🎯\n",
  HASHTAGS,
]
  .filter(Boolean)
  .join("\n")

const topTwo = bodyLines.slice(0, 2)
const storyCaption = [
  "🛠️ New update live on CVXray!\n",
  topTwo.map((l) => (l.startsWith("-") || l.startsWith("•") ? l : `• ${l}`)).join("\n") ||
    `• ${subject}`,
  "\ncvxray.com ✨",
]
  .filter(Boolean)
  .join("\n")

// ── Instagram Graph API helpers ────────────────────────────────────────────
async function createContainer({ caption, mediaType }) {
  const body = new URLSearchParams({
    image_url: IMAGE_URL,
    caption,
    access_token: TOKEN,
  })
  if (mediaType) body.set("media_type", mediaType)

  const res = await fetch(`${BASE_URL}/${IG_ID}/media`, {
    method: "POST",
    body,
  })
  const data = await res.json()
  if (!res.ok || data.error) throw new Error(data.error?.message || `HTTP ${res.status}`)
  return data.id
}

async function publish(creationId) {
  const res = await fetch(`${BASE_URL}/${IG_ID}/media_publish`, {
    method: "POST",
    body: new URLSearchParams({
      creation_id: creationId,
      access_token: TOKEN,
    }),
  })
  const data = await res.json()
  if (!res.ok || data.error) throw new Error(data.error?.message || `HTTP ${res.status}`)
  return data.id
}

// ── Post feed + story ──────────────────────────────────────────────────────
async function run() {
  console.log("\n📸 Posting to @cvxray.ai...")

  // Feed post
  try {
    const feedId = await createContainer({ caption: feedCaption })
    const postId = await publish(feedId)
    console.log(`✅ Feed post published (${postId})`)
  } catch (err) {
    console.error(`❌ Feed post failed: ${err.message}`)
  }

  // Story
  try {
    const storyId = await createContainer({ caption: storyCaption, mediaType: "STORIES" })
    const publishedId = await publish(storyId)
    console.log(`✅ Story published (${publishedId})`)
  } catch (err) {
    console.error(`❌ Story failed: ${err.message}`)
  }

  console.log("")
}

run()

import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// ─────────────────────────────────────────────────────────────────────────────
// API edge guard: cross-site request blocking, body-size limits and rate limits.
// Runs before every /api route.
// ─────────────────────────────────────────────────────────────────────────────

// Per-route request limits (requests per minute per IP)
const LIMITS: Record<string, number> = {
    "/api/orchestrate":          5,   // Claude API — most expensive
    "/api/extract-pdf":         10,   // PDF processing
    "/api/scrape":              15,   // External URL fetch
    "/api/interview-questions": 20,
    "/api/reddit-comment":      10,
    "/api/csp-report":          10,   // browser violation reports — cheap, but cap noise
    "/api/client-error":        10,
}

// Largest request body each route accepts. Checked from Content-Length before the
// route reads anything; the routes re-check on their own as well.
const BODY_LIMITS: Record<string, number> = {
    "/api/extract-pdf": 5 * 1024 * 1024 + 64 * 1024,
}
const DEFAULT_BODY_LIMIT = 64 * 1024

const DEFAULT_LIMIT = 30
const WINDOW_MS = 60_000
// Hard cap on tracked keys so a flood of spoofed or rotating IPs cannot grow memory without bound
const MAX_TRACKED = 10_000

// Two backends:
// - Upstash Redis (when UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN are set): one
//   counter shared by every server instance, so the limit is global.
// - In-memory fixed window: per instance. Used when Upstash is not configured, and as a
//   fallback if Upstash is slow or down — the API keeps working, just with local limits.
const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL?.replace(/\/$/, "")
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN
const hits = new Map<string, { count: number; resetAt: number }>()

/** Returns the request count in the current window, or null if Upstash is unavailable. */
async function upstashCount(key: string, windowStart: number): Promise<number | null> {
    if (!UPSTASH_URL || !UPSTASH_TOKEN) return null
    const redisKey = `rl:${key}:${windowStart}`
    try {
        const res = await fetch(`${UPSTASH_URL}/pipeline`, {
            method: "POST",
            headers: { Authorization: `Bearer ${UPSTASH_TOKEN}`, "Content-Type": "application/json" },
            body: JSON.stringify([["INCR", redisKey], ["EXPIRE", redisKey, String(Math.ceil(WINDOW_MS / 1000) + 5)]]),
            signal: AbortSignal.timeout(400),
            cache: "no-store",
        })
        if (!res.ok) return null
        const data = (await res.json()) as { result?: unknown }[]
        const count = Number(data?.[0]?.result)
        return Number.isFinite(count) ? count : null
    } catch {
        return null
    }
}

function prune(now: number) {
    for (const [key, entry] of hits) {
        if (entry.resetAt < now) hits.delete(key)
    }
    if (hits.size > MAX_TRACKED) hits.clear()
}

setInterval(() => prune(Date.now()), WINDOW_MS)

function longestPrefix<T>(table: Record<string, T>, pathname: string): T | undefined {
    return Object.entries(table)
        .filter(([path]) => pathname === path || pathname.startsWith(path + "/"))
        .sort((a, b) => b[0].length - a[0].length)[0]?.[1]
}

function clientIp(req: NextRequest): string {
    // x-real-ip is set by the platform (Vercel) from the TCP connection. The first
    // x-forwarded-for entry is whatever the client sent, so it is only a fallback.
    return req.headers.get("x-real-ip")?.trim() ||
        req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
        "unknown"
}

const json = (body: object, status: number, headers: Record<string, string> = {}) =>
    NextResponse.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } })

export async function proxy(req: NextRequest) {
    const { pathname } = req.nextUrl
    const method = req.method.toUpperCase()

    // ── Cross-site request blocking ──────────────────────────────────────────
    // Browsers attach Origin / Sec-Fetch-Site to every cross-origin request. Refusing
    // cross-site writes stops other websites from using visitors' browsers to drive
    // the scraper or PDF parser. Server-to-server callers send neither header.
    if (method !== "GET" && method !== "HEAD" && method !== "OPTIONS") {
        const fetchSite = req.headers.get("sec-fetch-site")
        const origin = req.headers.get("origin")
        let crossSite = fetchSite === "cross-site"
        if (!crossSite && origin && origin !== "null") {
            try {
                crossSite = new URL(origin).host !== req.headers.get("host")
            } catch {
                crossSite = true
            }
        }
        if (crossSite || origin === "null") return json({ error: "Cross-site request blocked" }, 403)

        // ── Body size ───────────────────────────────────────────────────────
        const declared = Number(req.headers.get("content-length") || 0)
        const maxBody = longestPrefix(BODY_LIMITS, pathname) ?? DEFAULT_BODY_LIMIT
        if (declared > maxBody) return json({ error: "Request too large" }, 413)
    }

    // ── Rate limit ───────────────────────────────────────────────────────────
    const limit = longestPrefix(LIMITS, pathname) ?? DEFAULT_LIMIT
    const key = `${clientIp(req)}:${pathname}`
    const now = Date.now()

    const windowStart = Math.floor(now / WINDOW_MS) * WINDOW_MS
    const shared = await upstashCount(key, windowStart)
    if (shared !== null) {
        if (shared > limit) {
            const resetAt = windowStart + WINDOW_MS
            return json({ error: "Too many requests" }, 429, {
                "Retry-After": String(Math.ceil((resetAt - now) / 1000)),
                "X-RateLimit-Limit": String(limit),
                "X-RateLimit-Remaining": "0",
                "X-RateLimit-Reset": String(Math.ceil(resetAt / 1000)),
            })
        }
        return NextResponse.next()
    }

    const entry = hits.get(key)
    if (!entry || entry.resetAt < now) {
        if (hits.size >= MAX_TRACKED) prune(now)
        hits.set(key, { count: 1, resetAt: now + WINDOW_MS })
        return NextResponse.next()
    }

    entry.count++
    if (entry.count > limit) {
        const retryAfter = Math.ceil((entry.resetAt - now) / 1000)
        return json({ error: "Too many requests" }, 429, {
            "Retry-After": String(retryAfter),
            "X-RateLimit-Limit": String(limit),
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": String(Math.ceil(entry.resetAt / 1000)),
        })
    }

    return NextResponse.next()
}

export const config = {
    matcher: ["/api/:path*"],
}

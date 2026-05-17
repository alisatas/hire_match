import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Per-route request limits (requests per minute per IP)
const LIMITS: Record<string, number> = {
    "/api/orchestrate":          5,   // Claude API — most expensive
    "/api/extract-pdf":         10,   // PDF processing
    "/api/scrape":              15,   // External URL fetch
    "/api/interview-questions": 20,
    "/api/tweet":               10,
    "/api/reddit-comment":      10,
}

const DEFAULT_LIMIT = 30
const WINDOW_MS = 60_000

// In-memory sliding window — per Vercel function instance.
// Upgrade to Upstash Redis for multi-region consistency if needed.
const hits = new Map<string, { count: number; resetAt: number }>()

setInterval(() => {
    const now = Date.now()
    for (const [key, entry] of hits) {
        if (entry.resetAt < now) hits.delete(key)
    }
}, WINDOW_MS)

export function proxy(req: NextRequest) {
    const { pathname } = req.nextUrl

    // Longest-prefix match for per-route limit
    const limit =
        Object.entries(LIMITS)
            .filter(([path]) => pathname.startsWith(path))
            .sort((a, b) => b[0].length - a[0].length)[0]?.[1] ?? DEFAULT_LIMIT

    const ip =
        req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
        req.headers.get("x-real-ip") ||
        "unknown"

    const key = `${ip}:${pathname}`
    const now = Date.now()

    const entry = hits.get(key)
    if (!entry || entry.resetAt < now) {
        hits.set(key, { count: 1, resetAt: now + WINDOW_MS })
        return NextResponse.next()
    }

    entry.count++
    if (entry.count > limit) {
        const retryAfter = Math.ceil((entry.resetAt - now) / 1000)
        return new NextResponse("Too many requests", {
            status: 429,
            headers: {
                "Retry-After": String(retryAfter),
                "X-RateLimit-Limit": String(limit),
                "X-RateLimit-Remaining": "0",
                "X-RateLimit-Reset": String(Math.ceil(entry.resetAt / 1000)),
                "Content-Type": "text/plain",
            },
        })
    }

    return NextResponse.next()
}

export const config = {
    matcher: ["/api/:path*"],
}

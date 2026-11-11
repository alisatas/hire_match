import { createHash, timingSafeEqual } from "node:crypto"

// Shared guard for the owner-only routes (/api/orchestrate, /api/reddit-comment).
//
// Both sides are hashed before comparing, so the comparison is always over two
// 32-byte buffers: it runs in constant time regardless of input, never throws on a
// length mismatch, and does not leak the key's length the way a `length ===` check does.
export function isOwnerRequest(req: Request): boolean {
    const key = process.env.AGENT_ACTIONS_KEY
    // A missing or trivially short key must never authorise anything
    if (!key || key.length < 24) return false

    const header = req.headers.get("x-agent-key") ?? req.headers.get("authorization") ?? ""
    const provided = header.replace(/^Bearer\s+/i, "").trim()
    if (!provided || provided.length > 512) return false

    const a = createHash("sha256").update(key).digest()
    const b = createHash("sha256").update(provided).digest()
    return timingSafeEqual(a, b)
}

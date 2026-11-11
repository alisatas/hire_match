import { NextResponse } from "next/server"

// Receives Content-Security-Policy violation reports from browsers (both the legacy
// `report-uri` format and the Reporting API). Reports are logged in a compact,
// truncated form and never stored. Browser extensions generate a lot of noise, so
// only the fields needed to spot a real problem are kept.

const MAX_BODY = 16 * 1024

type Violation = { directive: string; blocked: string; page: string }

function originOnly(raw: unknown): string {
    if (typeof raw !== "string" || !raw) return ""
    try {
        const u = new URL(raw)
        return u.protocol.startsWith("http") ? u.origin : u.protocol.replace(":", "")
    } catch {
        return raw.slice(0, 40) // "inline", "eval", "data" …
    }
}

function pathOnly(raw: unknown): string {
    if (typeof raw !== "string") return ""
    try { return new URL(raw).pathname.slice(0, 120) } catch { return "" }
}

function extract(body: unknown): Violation[] {
    const items = Array.isArray(body) ? body : [body]
    const out: Violation[] = []
    for (const item of items.slice(0, 20)) {
        if (!item || typeof item !== "object") continue
        const rec = item as Record<string, unknown>
        // Reporting API: { type: "csp-violation", body: {...} }; legacy: { "csp-report": {...} }
        const r = (rec.body ?? rec["csp-report"]) as Record<string, unknown> | undefined
        if (!r || typeof r !== "object") continue
        out.push({
            directive: String(r.effectiveDirective ?? r["effective-directive"] ?? r["violated-directive"] ?? "").slice(0, 60),
            blocked: originOnly(r.blockedURL ?? r["blocked-uri"]),
            page: pathOnly(r.documentURL ?? r["document-uri"]),
        })
    }
    return out
}

export async function POST(req: Request) {
    const type = (req.headers.get("content-type") || "").toLowerCase()
    if (!type.includes("json") && !type.includes("csp-report")) {
        return new NextResponse(null, { status: 415 })
    }
    const text = await req.text()
    if (text.length > MAX_BODY) return new NextResponse(null, { status: 413 })

    try {
        for (const v of extract(JSON.parse(text))) {
            // Skip extension noise; everything else is worth a look
            if (/^(chrome|moz|safari|ms-browser)-extension$/.test(v.blocked)) continue
            console.warn("CSP violation:", v.directive, v.blocked || "(none)", v.page)
        }
    } catch {
        return new NextResponse(null, { status: 400 })
    }
    return new NextResponse(null, { status: 204 })
}

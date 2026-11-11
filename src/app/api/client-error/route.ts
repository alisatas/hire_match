import { NextResponse } from "next/server"
import { pathOf, scrub } from "@/lib/scrub"

// Receives browser errors from ErrorReporter and writes them to the platform log as
// one scrubbed line each. Nothing is stored. Rate-limited in proxy.ts.
const MAX_BODY = 8 * 1024

export async function POST(req: Request) {
    const text = await req.text()
    if (text.length > MAX_BODY) return new NextResponse(null, { status: 413 })
    let body: Record<string, unknown>
    try {
        body = JSON.parse(text)
    } catch {
        return new NextResponse(null, { status: 400 })
    }
    if (!body || typeof body !== "object") return new NextResponse(null, { status: 400 })

    console.warn(JSON.stringify({
        type: "client_error",
        kind: body.kind === "unhandledrejection" ? "unhandledrejection" : "error",
        message: scrub(body.message),
        source: pathOf(body.source),
        line: Number.isFinite(body.line) ? body.line : undefined,
        page: pathOf(body.page),
    }))
    return new NextResponse(null, { status: 204 })
}

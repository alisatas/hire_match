import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createHash } from "crypto"

function sessionToken(password: string): string {
    return createHash("sha256").update(password + (process.env.AGENTS_PASSWORD ?? "")).digest("hex")
}

export function proxy(req: NextRequest) {
    const { pathname } = req.nextUrl

    if (pathname.startsWith("/agents") && !pathname.startsWith("/agents/login")) {
        const auth = req.cookies.get("agents-auth")?.value
        const expected = sessionToken(process.env.AGENTS_PASSWORD ?? "")
        if (auth !== expected) {
            return NextResponse.redirect(new URL("/agents/login", req.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ["/agents/:path*"],
}

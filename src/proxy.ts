import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function proxy(req: NextRequest) {
    const { pathname } = req.nextUrl

    if (pathname.startsWith("/agents") && !pathname.startsWith("/agents/login")) {
        const auth = req.cookies.get("agents-auth")?.value
        if (auth !== process.env.AGENTS_PASSWORD) {
            return NextResponse.redirect(new URL("/agents/login", req.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ["/agents/:path*"],
}

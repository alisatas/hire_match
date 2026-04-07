import { NextRequest, NextResponse } from "next/server"
import { createHash, timingSafeEqual } from "crypto"

function sessionToken(password: string): string {
    return createHash("sha256").update(password + (process.env.AGENTS_PASSWORD ?? "")).digest("hex")
}

export async function POST(req: NextRequest) {
    const { password } = await req.json()
    const expected = process.env.AGENTS_PASSWORD ?? ""

    // Constant-time comparison to prevent timing attacks
    const a = Buffer.from(password ?? "")
    const b = Buffer.from(expected)
    const match = a.length === b.length && timingSafeEqual(a, b)

    if (!match) {
        return NextResponse.json({ error: "Wrong password" }, { status: 401 })
    }

    const res = NextResponse.json({ ok: true })
    res.cookies.set("agents-auth", sessionToken(expected), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
    })
    return res
}

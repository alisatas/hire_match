import { CONTACT_EMAIL, SITE_URL } from "@/lib/site"

// RFC 9116 security.txt: tells researchers how to report a vulnerability.
// Published only when a contact address is configured (NEXT_PUBLIC_CONTACT_EMAIL);
// a security.txt without a working contact is worse than none.
export const dynamic = "force-static"

export function GET() {
    if (!CONTACT_EMAIL) return new Response("Not found", { status: 404 })

    // RFC 9116 requires an expiry; regenerated on every deploy
    const expires = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
    const body = [
        `Contact: mailto:${CONTACT_EMAIL}`,
        `Expires: ${expires}`,
        "Preferred-Languages: en, nl, tr",
        `Canonical: ${SITE_URL}/.well-known/security.txt`,
        `Policy: ${SITE_URL}/terms`,
        "",
    ].join("\n")

    return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } })
}

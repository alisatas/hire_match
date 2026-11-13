// Digital Asset Links: proves to Android that cvxray.com owns the CVXray app
// (android/), so the app can show the site full screen with no browser bar and open
// cvxray.com links directly. Fingerprints come from ANDROID_CERT_SHA256 — the upload key
// and the Play App Signing key, comma-separated. Malformed values are dropped, so a typo
// can never publish a statement for some other certificate format.
export const dynamic = "force-static"

const PACKAGE = "com.cvxray.app"
const FINGERPRINT = /^([0-9A-F]{2}:){31}[0-9A-F]{2}$/

export function GET() {
    const fingerprints = (process.env.ANDROID_CERT_SHA256 ?? "")
        .split(",")
        .map((f) => f.trim().toUpperCase())
        .filter((f) => FINGERPRINT.test(f))
    if (fingerprints.length === 0) return new Response("Not found", { status: 404 })

    const statements = [{
        relation: ["delegate_permission/common.handle_all_urls"],
        target: { namespace: "android_app", package_name: PACKAGE, sha256_cert_fingerprints: fingerprints },
    }]
    return Response.json(statements, { headers: { "Cache-Control": "public, max-age=3600" } })
}

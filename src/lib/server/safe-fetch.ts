import http from "node:http"
import https from "node:https"
import { lookup as dnsLookupAsync } from "node:dns/promises"
import { isIP } from "node:net"
import zlib from "node:zlib"
import type { Readable } from "node:stream"

// ─────────────────────────────────────────────────────────────────────────────
// SSRF-safe outbound fetch for user-supplied URLs (the job-post scraper).
//
// Why not global fetch(): checking DNS first and then calling fetch() resolves the
// name twice. An attacker's DNS server can answer the check with a public IP and the
// real connection with 127.0.0.1 or 169.254.169.254 (DNS rebinding). Here the name is
// resolved once, every returned address is validated, and the socket is then pinned to
// that validated address — the connection never triggers a second DNS query. TLS still
// verifies the certificate against the hostname. Redirects are followed by hand and
// every hop is re-validated.
// ─────────────────────────────────────────────────────────────────────────────

const DNS_TIMEOUT_MS = 3000

export class BlockedUrlError extends Error {}
export class TooLargeError extends Error {}

/** True for every address a public web page must never make us connect to. */
export function isPrivateIp(ip: string): boolean {
    const version = isIP(ip)
    if (version === 4) {
        const [a, b, c] = ip.split(".").map(Number)
        return a === 0 || a === 10 || a === 127 ||
            (a === 100 && b >= 64 && b <= 127) ||    // carrier-grade NAT
            (a === 169 && b === 254) ||              // link-local + cloud metadata
            (a === 172 && b >= 16 && b <= 31) ||
            (a === 192 && b === 0 && (c === 0 || c === 2)) || // IETF protocol + TEST-NET-1
            (a === 192 && b === 88 && c === 99) ||   // 6to4 relay anycast
            (a === 192 && b === 168) ||
            (a === 198 && (b === 18 || b === 19)) || // benchmarking
            (a === 198 && b === 51 && c === 100) ||  // TEST-NET-2
            (a === 203 && b === 0 && c === 113) ||   // TEST-NET-3
            a >= 224                                 // multicast + reserved + broadcast
    }
    if (version === 6) {
        const lower = ip.toLowerCase()
        // IPv4-mapped / IPv4-compatible forms: judge the embedded IPv4 address
        const embedded = lower.match(/^(?:::ffff:|::)(\d+\.\d+\.\d+\.\d+)$/)
        if (embedded) return isPrivateIp(embedded[1])
        return lower === "::" || lower === "::1" ||
            lower.startsWith("::ffff:") ||           // mapped, hex form
            lower.startsWith("64:ff9b:") ||          // NAT64 — can reach private IPv4
            lower.startsWith("100:") ||              // discard prefix
            lower.startsWith("2001:db8") ||          // documentation
            lower.startsWith("2002:") ||             // 6to4 — embeds an IPv4 address
            /^f[cd]/.test(lower) ||                  // unique local fc00::/7
            /^fe[89ab]/.test(lower) ||               // link-local fe80::/10
            lower.startsWith("ff")                   // multicast
    }
    return true // not an IP at all — never connect
}

// Resolves a hostname once and returns a validated address to pin the socket to.
// IP literals are returned as-is (parsePublicUrl has already screened them).
async function resolvePublicAddress(hostname: string, signal: AbortSignal): Promise<{ address: string; family: number }> {
    const host = hostname.replace(/^\[|\]$/g, "")
    const literal = isIP(host)
    if (literal) return { address: host, family: literal }

    const lookup = dnsLookupAsync(host, { all: true, verbatim: true })
    // DNS gets its own short deadline: a resolver that stalls (or silently drops
    // answers pointing at private ranges) must not hold the request for the full timeout
    let timer: ReturnType<typeof setTimeout> | undefined
    const aborted = new Promise<never>((_, reject) => {
        if (signal.aborted) reject(new Error("Timed out"))
        signal.addEventListener("abort", () => reject(new Error("Timed out")), { once: true })
        timer = setTimeout(() => reject(new Error("DNS timeout")), DNS_TIMEOUT_MS)
    })
    let addresses: { address: string; family: number }[]
    try {
        addresses = await Promise.race([lookup, aborted])
    } catch {
        throw new BlockedUrlError("Host could not be resolved")
    } finally {
        clearTimeout(timer)
    }
    // Every record must be public: a mix of public and private answers is an attack
    if (addresses.length === 0 || addresses.some(a => isPrivateIp(a.address))) {
        throw new BlockedUrlError("Blocked address")
    }
    return addresses[0]
}

/** Parses and screens a URL before any connection is made. */
export function parsePublicUrl(raw: string): URL {
    if (raw.length > 2048) throw new BlockedUrlError("URL too long")
    let url: URL
    try {
        url = new URL(raw)
    } catch {
        throw new BlockedUrlError("Invalid URL")
    }
    if (url.protocol !== "http:" && url.protocol !== "https:") throw new BlockedUrlError("Unsupported protocol")
    // Credentials in the URL are never needed for a public job post
    if (url.username || url.password) throw new BlockedUrlError("Credentials not allowed")
    // Only standard web ports: stops the scraper being used as a port scanner
    if (url.port && url.port !== "80" && url.port !== "443") throw new BlockedUrlError("Port not allowed")

    const host = url.hostname.toLowerCase().replace(/^\[|\]$/g, "").replace(/\.$/, "")
    if (!host || host === "localhost" || host.endsWith(".localhost") ||
        host.endsWith(".local") || host.endsWith(".internal") || host.endsWith(".lan") ||
        host === "metadata.google.internal") {
        throw new BlockedUrlError("Host not allowed")
    }
    // IP literals skip DNS resolution, so they are checked here
    if (isIP(host) && isPrivateIp(host)) throw new BlockedUrlError("Host not allowed")
    return url
}

export interface SafeFetchResult {
    status: number
    contentType: string
    body: string
    finalUrl: string
}

interface SafeFetchOptions {
    maxBytes: number
    timeoutMs: number
    maxRedirects?: number
    headers?: Record<string, string>
}

async function requestOnce(url: URL, headers: Record<string, string>, signal: AbortSignal): Promise<http.IncomingMessage> {
    const pinned = await resolvePublicAddress(url.hostname, signal)
    // Always answers with the pre-validated address; never queries DNS again
    const pinnedLookup = (
        _hostname: string,
        options: { all?: boolean },
        callback: (err: Error | null, address: string | { address: string; family: number }[], family?: number) => void,
    ) => options.all ? callback(null, [pinned]) : callback(null, pinned.address, pinned.family)

    return new Promise((resolve, reject) => {
        const mod = url.protocol === "https:" ? https : http
        const req = mod.request(url, { method: "GET", headers, lookup: pinnedLookup as never, signal }, resolve)
        req.on("error", reject)
        req.end()
    })
}

// Reads the (possibly compressed) body, counting *decompressed* bytes so a small
// gzip bomb cannot expand past the cap.
async function readCapped(res: http.IncomingMessage, maxBytes: number, signal: AbortSignal): Promise<string> {
    const encoding = (res.headers["content-encoding"] || "").toLowerCase()
    let stream: Readable = res
    if (encoding === "gzip" || encoding === "x-gzip") stream = res.pipe(zlib.createGunzip())
    else if (encoding === "deflate") stream = res.pipe(zlib.createInflate())
    else if (encoding === "br") stream = res.pipe(zlib.createBrotliDecompress())

    const onAbort = () => { res.destroy(new Error("Timed out")); stream.destroy(new Error("Timed out")) }
    signal.addEventListener("abort", onAbort, { once: true })
    try {
        const chunks: Buffer[] = []
        let size = 0
        for await (const chunk of stream) {
            size += (chunk as Buffer).length
            if (size > maxBytes) {
                res.destroy()
                throw new TooLargeError("Response too large")
            }
            chunks.push(chunk as Buffer)
        }
        return new TextDecoder("utf-8").decode(Buffer.concat(chunks))
    } finally {
        signal.removeEventListener("abort", onAbort)
    }
}

export async function safeFetchText(rawUrl: string, opts: SafeFetchOptions): Promise<SafeFetchResult> {
    const signal = AbortSignal.timeout(opts.timeoutMs)
    const maxRedirects = opts.maxRedirects ?? 5
    const headers = { "Accept-Encoding": "gzip, deflate, br", ...opts.headers }

    let url = parsePublicUrl(rawUrl)
    for (let hop = 0; hop <= maxRedirects; hop++) {
        const res = await requestOnce(url, headers, signal)
        const status = res.statusCode ?? 0
        const location = res.headers.location

        if (status >= 300 && status < 400 && location) {
            res.resume() // discard the redirect body
            url = parsePublicUrl(new URL(location, url).toString())
            continue
        }

        const contentType = String(res.headers["content-type"] || "").toLowerCase()
        const declared = Number(res.headers["content-length"])
        if (Number.isFinite(declared) && declared > opts.maxBytes) {
            res.destroy()
            throw new TooLargeError("Response too large")
        }
        // Non-HTML bodies are never read
        if (status >= 200 && status < 300 &&
            !contentType.includes("text/html") && !contentType.includes("application/xhtml") && !contentType.includes("text/plain")) {
            res.destroy()
            return { status, contentType, body: "", finalUrl: url.toString() }
        }
        if (status < 200 || status >= 300) {
            res.resume()
            return { status, contentType, body: "", finalUrl: url.toString() }
        }
        const body = await readCapped(res, opts.maxBytes, signal)
        return { status, contentType, body, finalUrl: url.toString() }
    }
    throw new BlockedUrlError("Too many redirects")
}

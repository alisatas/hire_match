import { NextResponse } from 'next/server';
import { lookup } from 'node:dns/promises';
import { isIP } from 'node:net';

// ── SSRF guard ───────────────────────────────────────────────────────────────
// A URL is only fetched when its host resolves exclusively to public addresses.
// The check runs again on every redirect hop, so a public URL cannot bounce the
// request to localhost, a private range, or a cloud metadata endpoint.

const MAX_REDIRECTS = 5;

function isPrivateIp(ip: string): boolean {
    const version = isIP(ip);
    if (version === 4) {
        const [a, b] = ip.split('.').map(Number);
        return a === 0 || a === 10 || a === 127 ||
            (a === 169 && b === 254) ||             // link-local + cloud metadata
            (a === 172 && b >= 16 && b <= 31) ||
            (a === 192 && b === 168) ||
            (a === 100 && b >= 64 && b <= 127) ||   // carrier-grade NAT
            a >= 224;                               // multicast + reserved
    }
    if (version === 6) {
        const lower = ip.toLowerCase();
        return lower === '::' || lower === '::1' ||
            lower.startsWith('::ffff:') ||          // IPv4-mapped (any form)
            lower.startsWith('fc') || lower.startsWith('fd') || // unique local fc00::/7
            /^fe[89ab]/.test(lower);                // link-local fe80::/10
    }
    return true; // not an IP literal — treat as unsafe
}

// Returns the parsed URL when it is safe to fetch, otherwise null.
async function toPublicUrl(raw: string): Promise<URL | null> {
    let parsed: URL;
    try {
        parsed = new URL(raw);
    } catch {
        return null;
    }
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return null;

    // URL.hostname wraps IPv6 literals in brackets ("[::1]") — strip them before checking
    const host = parsed.hostname.toLowerCase().replace(/^\[|\]$/g, '').replace(/\.$/, '');
    if (!host || host === 'localhost' || host.endsWith('.localhost') ||
        host.endsWith('.local') || host.endsWith('.internal')) {
        return null;
    }

    if (isIP(host)) return isPrivateIp(host) ? null : parsed;

    // Resolve the name: a public-looking hostname can still point at a private address
    // DNS has no built-in deadline, so a slow resolver is cut off after 3s
    let timer: ReturnType<typeof setTimeout> | undefined;
    try {
        const addresses = await Promise.race([
            lookup(host, { all: true }),
            new Promise<never>((_, reject) => {
                timer = setTimeout(() => reject(new Error('DNS timeout')), 3000);
            }),
        ]);
        if (addresses.length === 0 || addresses.some(a => isPrivateIp(a.address))) return null;
    } catch {
        return null;
    } finally {
        clearTimeout(timer);
    }
    return parsed;
}

export function extractCompanyFromHtml(html: string): string {
    // LinkedIn: <title>Company Name hiring Job Title ... | LinkedIn</title>
    const titleHiringMatch = html.match(/<title[^>]*>([^<]{2,80}?)\s+(?:is\s+)?hiring\s+[^|<]+[|<]/i)
    if (titleHiringMatch) return titleHiringMatch[1].trim()

    // LinkedIn: <title>Job Title at Company Name | LinkedIn</title>
    const titleAtMatch = html.match(/<title[^>]*>[^<]*?\bat\s+([^|<]{2,60}?)\s*[|<]/i)
    if (titleAtMatch) return titleAtMatch[1].trim()

    // LinkedIn: org-name span/link
    const orgMatch = html.match(/class="[^"]*topcard__org-name[^"]*"[^>]*>\s*([^<]{2,60}?)\s*</i)
    if (orgMatch) return orgMatch[1].trim()

    // Generic: "Company:" label in structured data
    const companyMatch = html.match(/"hiringOrganization"\s*:\s*\{[^}]*"name"\s*:\s*"([^"]{2,60})"/i)
    if (companyMatch) return companyMatch[1].trim()

    // og:site_name or og:title
    const ogTitle = html.match(/<meta[^>]+property="og:title"[^>]+content="([^"]+)"/i)
    if (ogTitle) {
        const atMatch = ogTitle[1].match(/\bat\s+([^|•·\-]{2,60}?)(?:\s*[|•·\-]|$)/i)
        if (atMatch) return atMatch[1].trim()
    }

    return ""
}

function normalizeLinkedInUrl(url: string): string {
    try {
        const parsed = new URL(url);
        // ?currentJobId=XXXX → linkedin.com/jobs/view/XXXX/
        if (parsed.hostname.includes('linkedin.com')) {
            const jobId = parsed.searchParams.get('currentJobId');
            if (jobId) {
                return `https://www.linkedin.com/jobs/view/${jobId}/`;
            }
        }
    } catch { /* ignore */ }
    return url;
}

function stripHtml(html: string): string {
    // Cap input to 500KB before regex to bound backtracking on malicious HTML
    const safe = html.length > 512_000 ? html.slice(0, 512_000) : html
    // Remove script/style blocks (lazy quantifier, bounded input prevents ReDoS)
    let text = safe.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, ' ');
    text = text.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, ' ');
    // Block-level tags → newline
    text = text.replace(/<\/(p|div|li|h[1-6]|section|article|tr)[^>]*>/gi, '\n');
    // Inline elements → space
    text = text.replace(/<[^>]*>/g, ' ');
    // Decode common entities
    text = text.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
               .replace(/&nbsp;/g, ' ').replace(/&#39;/g, "'").replace(/&quot;/g, '"');
    // Collapse whitespace while preserving newlines
    text = text.split('\n').map(l => l.replace(/\s+/g, ' ').trim()).filter(Boolean).join('\n');
    return text.trim();
}

export async function POST(req: Request) {
    try {
        const { url } = await req.json();

        if (!url || typeof url !== 'string' || !url.startsWith('http')) {
            return NextResponse.json({ error: 'Invalid URL provided' }, { status: 400 });
        }

        const normalized = normalizeLinkedInUrl(url);

        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 15000);

        let response: Response | null = null;
        try {
            let current = normalized;
            for (let hop = 0; hop <= MAX_REDIRECTS; hop++) {
                const safeUrl = await toPublicUrl(current);
                if (!safeUrl) {
                    return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
                }

                // Redirects are followed by hand so each hop is validated above
                const res = await fetch(safeUrl, {
                    signal: controller.signal,
                    redirect: 'manual',
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
                        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                        'Accept-Language': 'en-US,en;q=0.9',
                    }
                });

                const location = res.headers.get('location');
                if (res.status >= 300 && res.status < 400 && location) {
                    current = new URL(location, safeUrl).toString();
                    continue;
                }
                response = res;
                break;
            }
        } finally {
            clearTimeout(timeout);
        }

        // Too many redirects
        if (!response) {
            return NextResponse.json({ requiresPaste: true }, { status: 422 });
        }

        if (!response.ok) {
            return NextResponse.json({ requiresPaste: true, error: `HTTP ${response.status}` }, { status: 422 });
        }

        // Reject non-HTML content types — prevents reading binary blobs or JSON as HTML
        const contentType = response.headers.get("content-type") || ""
        if (!contentType.includes("text/html") && !contentType.includes("text/plain") && !contentType.includes("application/xhtml")) {
            return NextResponse.json({ requiresPaste: true }, { status: 422 });
        }

        // Cap response body at 2MB before reading — prevents memory exhaustion on large pages
        const contentLength = response.headers.get("content-length")
        if (contentLength && parseInt(contentLength) > 2 * 1024 * 1024) {
            return NextResponse.json({ requiresPaste: true }, { status: 422 });
        }

        const html = await response.text();
        if (html.length > 2 * 1024 * 1024) {
            return NextResponse.json({ requiresPaste: true }, { status: 422 });
        }
        const companyName = extractCompanyFromHtml(html);
        const text = stripHtml(html);

        if (text.length < 100) {
            return NextResponse.json({ requiresPaste: true }, { status: 422 });
        }

        const noStore = { headers: { "Cache-Control": "no-store" } }
        return NextResponse.json({ text, companyName: companyName || undefined }, noStore);

    } catch (error: unknown) {
        console.error("Scraper API Error:", error instanceof Error ? error.message : error);
        return NextResponse.json({ requiresPaste: true }, { status: 500, headers: { "Cache-Control": "no-store" } });
    }
}

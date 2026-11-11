import { NextResponse } from 'next/server';
import { BlockedUrlError, TooLargeError, safeFetchText } from '@/lib/server/safe-fetch';
import { htmlToText } from '@/lib/html-text';

// The SSRF guard (private ranges, DNS rebinding, redirect re-validation, port and
// size limits) lives in safe-fetch.ts so it is enforced at connect time.

export const maxDuration = 20;

const MAX_HTML_BYTES = 2 * 1024 * 1024;
const noStore = { "Cache-Control": "no-store" };

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
        const host = parsed.hostname.toLowerCase();
        if (host === 'linkedin.com' || host.endsWith('.linkedin.com')) {
            const jobId = parsed.searchParams.get('currentJobId');
            if (jobId && /^\d{1,20}$/.test(jobId)) {
                return `https://www.linkedin.com/jobs/view/${jobId}/`;
            }
        }
    } catch { /* ignore */ }
    return url;
}

// HTML → text lives in src/lib/html-text.ts (single-pass entity decoding,
// whitespace-tolerant script/style removal, repeated tag stripping).
const stripHtml = (html: string) => htmlToText(html);

export async function POST(req: Request) {
    // A JSON content type forces a CORS preflight, so other sites cannot drive this
    // endpoint from a visitor's browser with a plain form post
    if (!(req.headers.get('content-type') || '').toLowerCase().includes('application/json')) {
        return NextResponse.json({ error: 'Expected application/json' }, { status: 415, headers: noStore });
    }

    let url: unknown;
    try {
        ({ url } = await req.json());
    } catch {
        return NextResponse.json({ error: 'Invalid JSON' }, { status: 400, headers: noStore });
    }
    if (typeof url !== 'string' || url.length > 2048 || !/^https?:\/\//i.test(url.trim())) {
        return NextResponse.json({ error: 'Invalid URL provided' }, { status: 400, headers: noStore });
    }

    try {
        const res = await safeFetchText(normalizeLinkedInUrl(url.trim()), {
            maxBytes: MAX_HTML_BYTES,
            timeoutMs: 15_000,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.9',
            },
        });

        if (res.status < 200 || res.status >= 300 || !res.body) {
            return NextResponse.json({ requiresPaste: true }, { status: 422, headers: noStore });
        }

        const html = res.body;
        const companyName = extractCompanyFromHtml(html.slice(0, 512_000));
        const text = stripHtml(html);

        if (text.length < 100) {
            return NextResponse.json({ requiresPaste: true }, { status: 422, headers: noStore });
        }

        return NextResponse.json({ text, companyName: companyName || undefined }, { headers: noStore });
    } catch (error: unknown) {
        if (error instanceof BlockedUrlError) {
            return NextResponse.json({ error: 'Invalid URL' }, { status: 400, headers: noStore });
        }
        if (error instanceof TooLargeError) {
            return NextResponse.json({ requiresPaste: true }, { status: 422, headers: noStore });
        }
        // The message only — never the stack or request data
        console.error('Scraper API Error:', error instanceof Error ? error.message : 'unknown');
        return NextResponse.json({ requiresPaste: true }, { status: 502, headers: noStore });
    }
}

import { NextResponse } from 'next/server';

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
    // Remove script/style blocks
    let text = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ' ');
    text = text.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, ' ');
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

        // Block SSRF — reject private/loopback addresses
        try {
            const parsed = new URL(normalized);
            const hostname = parsed.hostname.toLowerCase();
            // Block SSRF: private/loopback/link-local/metadata addresses
            const isPrivate =
                hostname === "localhost" ||
                hostname === "0.0.0.0" ||
                hostname === "::1" ||
                hostname.endsWith(".local") ||
                hostname.startsWith("127.") ||
                hostname.startsWith("10.") ||
                hostname.startsWith("192.168.") ||
                // Docker bridge + private range 172.16.0.0/12
                /^172\.(1[6-9]|2[0-9]|3[0-1])\./.test(hostname) ||
                // AWS/GCP/Azure metadata endpoints
                hostname === "169.254.169.254" ||
                hostname.startsWith("169.254.") ||
                hostname === "metadata.google.internal"
            if (isPrivate) {
                return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
            }
        } catch {
            return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
        }

        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 15000);

        let response: Response;
        try {
            response = await fetch(normalized, {
                signal: controller.signal,
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                    'Accept-Language': 'en-US,en;q=0.9',
                }
            });
        } finally {
            clearTimeout(timeout);
        }

        if (!response.ok) {
            return NextResponse.json({ requiresPaste: true, error: `HTTP ${response.status}` }, { status: 422 });
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

        return NextResponse.json({ text, companyName: companyName || undefined });

    } catch (error: unknown) {
        console.error("Scraper API Error:", error instanceof Error ? error.message : error);
        return NextResponse.json({ requiresPaste: true }, { status: 500 });
    }
}

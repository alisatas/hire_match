import { NextResponse } from 'next/server';

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
            if (
                hostname === "localhost" ||
                hostname.startsWith("127.") ||
                hostname.startsWith("192.168.") ||
                hostname.startsWith("10.") ||
                hostname.startsWith("172.16.") ||
                hostname === "0.0.0.0" ||
                hostname.endsWith(".local")
            ) {
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

        const html = await response.text();
        const text = stripHtml(html);

        if (text.length < 100) {
            return NextResponse.json({ requiresPaste: true }, { status: 422 });
        }

        return NextResponse.json({ text });

    } catch (error: unknown) {
        console.error("Scraper API Error:", error instanceof Error ? error.message : error);
        return NextResponse.json({ requiresPaste: true }, { status: 200 });
    }
}

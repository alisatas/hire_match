import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { url } = await req.json();

        if (!url || typeof url !== 'string' || !url.startsWith('http')) {
            return NextResponse.json({ error: 'Invalid URL provided' }, { status: 400 });
        }

        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/122.0.0.0 Safari/537.36'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const html = await response.text();

        // Very basic HTML stripping for keyword extraction
        // Removes scripts, styles, inside tags, and HTML comments
        let text = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ' ');
        text = text.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, ' ');
        text = text.replace(/<[^>]*>/g, ' '); // Remove all leftover tags
        text = text.replace(/\s+/g, ' ').trim(); // Compress whitespace

        return NextResponse.json({ text });

    } catch (error: any) {
        console.error("Scraper API Error:", error.message);
        return NextResponse.json({ error: 'Failed to fetch the URL content' }, { status: 500 });
    }
}

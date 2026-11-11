import { NextResponse } from "next/server"

const noStore = { "Cache-Control": "no-store" }

// Result links come from third-party HTML and end up in an <a href>. Only plain
// http(s) URLs to sites other than the search engine itself are passed through —
// a "javascript:" or "data:" href would run script when clicked.
// DuckDuckGo wraps results as //duckduckgo.com/l/?uddg=<encoded target>; unwrap those.
function resolveResultUrl(raw: string): string | null {
    try {
        let u = new URL(raw.replace(/&amp;/g, "&"), "https://duckduckgo.com")
        if (u.hostname.endsWith("duckduckgo.com")) {
            const target = u.searchParams.get("uddg")
            if (!target) return null
            u = new URL(target)
        }
        if (u.protocol !== "https:" && u.protocol !== "http:") return null
        if (u.hostname.endsWith("duckduckgo.com")) return null
        return u.toString()
    } catch {
        return null
    }
}

function extractQuestions(html: string): { title: string; snippet: string; url: string; source: string }[] {
    const results: { title: string; snippet: string; url: string; source: string }[] = []

    // DuckDuckGo HTML result pattern
    // Each result: <div class="result results_links..."> wrapping title link and snippet link
    const resultBlocks = html.match(/<div class="result results_links[^"]*"[\s\S]*?(?=<div class="result results_links|<div id="ads"|$)/g) ?? []

    for (const block of resultBlocks.slice(0, 10)) {
        // Extract title + URL from result__a
        const titleMatch = block.match(/<a[^>]*class="result__a"[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/i)
        const title = titleMatch ? titleMatch[2].replace(/<[^>]+>/g, "").trim() : ""
        const url = titleMatch ? titleMatch[1] : ""

        // Extract snippet from result__snippet
        const snippetMatch = block.match(/<a[^>]*class="result__snippet"[^>]*>([\s\S]*?)<\/a>/i)
        const snippet = snippetMatch
            ? snippetMatch[1].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim()
            : ""

        // Determine source label
        let source = "Web"
        if (url.includes("glassdoor")) source = "Glassdoor"
        else if (url.includes("indeed")) source = "Indeed"
        else if (url.includes("reddit")) source = "Reddit"
        else if (url.includes("linkedin")) source = "LinkedIn"
        else if (url.includes("blind")) source = "Blind"
        else if (url.includes("ambitionbox")) source = "AmbitionBox"
        else if (url.includes("interviewbit")) source = "InterviewBit"
        else if (url.includes("levels.fyi")) source = "Levels.fyi"
        else if (url.includes("igotanoffer")) source = "IGotAnOffer"
        else if (url.includes("leetcode")) source = "LeetCode"

        const target = resolveResultUrl(url)
        if (title && target) {
            results.push({ title: title.slice(0, 200), snippet: snippet.slice(0, 400), url: target, source })
        }
    }

    return results.slice(0, 6)
}

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    // Company names come from scraped job pages: bound the length and drop control characters
    const company = searchParams.get("company")?.replace(/[\u0000-\u001f\u007f]/g, " ").trim()

    if (!company || company.length < 2 || company.length > 80) {
        return NextResponse.json({ error: "Company name required" }, { status: 400, headers: noStore })
    }

    try {
        const body = new URLSearchParams({ q: `${company} interview questions`, kl: "us-en" })

        const res = await fetch("https://html.duckduckgo.com/html/", {
            method: "POST",
            headers: {
                "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
                "Accept-Language": "en-US,en;q=0.9",
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: body.toString(),
            signal: AbortSignal.timeout(10000),
        })

        if (!res.ok) {
            return NextResponse.json({ results: [] }, { headers: noStore })
        }

        const html = await res.text()
        const allResults = extractQuestions(html)

        // Only keep results that mention a distinctive part of the company name
        // Skip generic English words that appear in every interview article
        const STOP_WORDS = new Set([
            "company", "good", "great", "new", "the", "and", "for", "inc", "ltd",
            "corp", "group", "global", "digital", "solutions", "services", "tech",
            "technologies", "consulting", "agency", "studio", "labs", "ventures",
        ])
        const companyLower = company.toLowerCase()
        const distinctiveWords = companyLower
            .split(/\s+/)
            .map(w => w.replace(/[^a-z0-9]/g, ""))
            .filter(w => w.length > 3 && !STOP_WORDS.has(w))

        const relevant = distinctiveWords.length > 0
            ? allResults.filter(r => {
                const haystack = (r.title + " " + r.url).toLowerCase()
                return distinctiveWords.some(word => haystack.includes(word))
            })
            : []

        // If fewer than 2 company-specific results, return empty so UI falls back to static links
        const results = relevant.length >= 2 ? relevant : []
        return NextResponse.json({ results, company }, { headers: noStore })

    } catch {
        return NextResponse.json({ results: [] }, { headers: noStore })
    }
}

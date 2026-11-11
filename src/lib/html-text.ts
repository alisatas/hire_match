// ─────────────────────────────────────────────
// Turning third-party HTML into plain text, in one place.
// Used for scraped job pages and search-result titles. The output is only ever
// rendered as React text or analysed — never inserted as HTML — but it is still
// produced correctly so that no layer has to rely on the next one being careful.
// ─────────────────────────────────────────────

const NAMED: Record<string, string> = { lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", "#39": "'" }

/**
 * Decodes the common HTML entities in a single pass. A single pass matters:
 * decoding "&amp;" first and "&lt;" afterwards turns the literal text "&amp;lt;"
 * into "<" (double unescaping).
 */
export function decodeEntities(text: string): string {
    return text.replace(/&(amp|lt|gt|quot|apos|nbsp|#39|#\d{1,6}|#x[0-9a-f]{1,6});/gi, (_, name: string) => {
        const key = name.toLowerCase()
        if (key === "amp") return "&"
        if (key in NAMED) return NAMED[key]
        const code = key.startsWith("#x") ? parseInt(key.slice(2), 16) : parseInt(key.slice(1), 10)
        return Number.isFinite(code) && code > 0 && code <= 0x10ffff ? String.fromCodePoint(code) : ""
    })
}

/**
 * Removes markup. Tags are stripped repeatedly until nothing changes (so nested or
 * overlapping fragments like "<<b>script>" cannot reassemble into a tag), and any
 * stray angle brackets left over are dropped.
 */
export function stripTags(html: string): string {
    let out = html
    for (let i = 0; i < 5; i++) {
        const next = out.replace(/<[^<>]*>/g, " ")
        if (next === out) break
        out = next
    }
    return out.replace(/[<>]/g, " ")
}

/** Script/style blocks out, block tags → line breaks, everything else → text. */
export function htmlToText(html: string, maxInput = 512_000): string {
    // Bounded input keeps the lazy regexes below cheap even on hostile pages
    const safe = html.length > maxInput ? html.slice(0, maxInput) : html
    let text = safe
        // Closing tags may carry whitespace or junk ("</script >", "</SCRIPT foo>")
        .replace(/<script\b[^>]*>[\s\S]*?<\/script\b[^>]*>/gi, " ")
        .replace(/<style\b[^>]*>[\s\S]*?<\/style\b[^>]*>/gi, " ")
        // An unterminated <script>/<style> swallows the rest of the document
        .replace(/<(script|style)\b[\s\S]*$/i, " ")
        .replace(/<\/(p|div|li|h[1-6]|section|article|tr|br)\b[^>]*>/gi, "\n")
        .replace(/<br\b[^>]*>/gi, "\n")
    text = decodeEntities(stripTags(text))
    return text
        .split("\n")
        .map(line => line.replace(/\s+/g, " ").trim())
        .filter(Boolean)
        .join("\n")
        .trim()
}

/** Single-line plain text (titles, snippets). */
export function inlineText(html: string): string {
    return decodeEntities(stripTags(html)).replace(/\s+/g, " ").trim()
}

// Makes error text safe to log: errors can echo user input (a CV line, an email,
// a URL with tokens), so anything that could identify a person is removed and the
// message is shortened before it reaches a log.
export function scrub(raw: unknown, max = 300): string {
    const text = typeof raw === "string" ? raw : raw instanceof Error ? raw.message : String(raw ?? "")
    return text
        .replace(/[\w.+-]+@[\w-]+\.[\w.-]+/g, "[email]")
        .replace(/\b(https?:\/\/[^\s?#]+)[?#][^\s]*/g, "$1?[query]")
        .replace(/\d{6,}/g, "[number]")
        .replace(/[\r\n\t]+/g, " ")
        .slice(0, max)
}

/** Path only — query strings and fragments can carry user data. */
export function pathOf(raw: unknown): string {
    if (typeof raw !== "string" || !raw) return ""
    try {
        return new URL(raw, "https://cvxray.com").pathname.slice(0, 120)
    } catch {
        return ""
    }
}

// ─────────────────────────────────────────────
// COMPANY INSIGHTS
// Extracts company name and culture signals from job text.
// Interview questions link out to Glassdoor / Indeed / Blind.
// All client-side — no API required.
// ─────────────────────────────────────────────

// ── Company name extraction ───────────────────────────────────────────────────

export function extractCompanyName(jobText: string): string {
    const first300 = jobText.slice(0, 300)

    // "Company · Location" pattern (LinkedIn format)
    const bulletMatch = first300.match(/^([A-Z][A-Za-z0-9\s&',.-]{1,50}?)\s*[·•|]\s*[A-Z]/m)
    if (bulletMatch) return bulletMatch[1].trim()

    // "at Company Name" in job title line
    const atMatch = first300.match(/\bat\s+([A-Z][A-Za-z0-9\s&',.-]{2,50}?)(?:\s*[-–|]|\s+in\s|\s+\(|\n|$)/m)
    if (atMatch) return atMatch[1].trim()

    // "About Company" section header
    const aboutMatch = jobText.match(/\bAbout\s+([A-Z][A-Za-z0-9\s&',.-]{2,50}?)(?:\n|$)/m)
    if (aboutMatch) return aboutMatch[1].trim()

    return ""
}

// ── Interview question links ──────────────────────────────────────────────────

export function getInterviewLinks(companyName: string): { label: string; url: string; icon: string; color: string }[] {
    const qPlus = companyName.trim().replace(/\s+/g, "+")
    const qEncoded = encodeURIComponent(companyName)
    return [
        {
            label: "Glassdoor",
            url: `https://www.glassdoor.com/Search/results.htm?keyword=${qEncoded}&filterType=EMPLOYER`,
            icon: "🟢",
            color: "text-emerald-300 border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20",
        },
        {
            label: "Indeed",
            url: `https://www.indeed.com/companies/search?q=${qPlus}`,
            icon: "🔵",
            color: "text-blue-300 border-blue-500/30 bg-blue-500/10 hover:bg-blue-500/20",
        },
    ]
}

// ── Culture signals ───────────────────────────────────────────────────────────

const CULTURE_PATTERNS: { pattern: RegExp; label: string; color: string }[] = [
    { pattern: /\bremote\b|\bwork from home\b|\bfully remote\b/i,                  label: "Remote-friendly",       color: "text-cyan-300 border-cyan-500/30 bg-cyan-500/10" },
    { pattern: /\bhybrid\b/i,                                                        label: "Hybrid working",        color: "text-sky-300 border-sky-500/30 bg-sky-500/10" },
    { pattern: /\bflexible hours?\b|\bflexible working\b|\bflex time\b/i,           label: "Flexible hours",        color: "text-teal-300 border-teal-500/30 bg-teal-500/10" },
    { pattern: /\bstart.?up\b|\bfast.?paced\b|\bfast.?growing\b|\bscale.?up\b/i,   label: "Fast-paced / startup",  color: "text-amber-300 border-amber-500/30 bg-amber-500/10" },
    { pattern: /\bequity\b|\bstock options?\b|\bshare options?\b/i,                 label: "Equity / stock options",color: "text-violet-300 border-violet-500/30 bg-violet-500/10" },
    { pattern: /\blearning\b|\bgrowth\b|\bmentorship\b|\btraining budget\b/i,       label: "Learning & growth",     color: "text-emerald-300 border-emerald-500/30 bg-emerald-500/10" },
    { pattern: /\bdivers\w*\b|\binclus\w*\b|\bbelonging\b/i,                        label: "Diversity & inclusion", color: "text-pink-300 border-pink-500/30 bg-pink-500/10" },
    { pattern: /\bwork.?life balance\b|\bwellbeing\b|\bwellness\b/i,               label: "Work-life balance",     color: "text-lime-300 border-lime-500/30 bg-lime-500/10" },
    { pattern: /\bcompetitive salary\b|\bmarket rate\b|\bcompetitive compensation\b/i, label: "Competitive pay",   color: "text-yellow-300 border-yellow-500/30 bg-yellow-500/10" },
    { pattern: /\bautonomous?\b|\bown your work\b|\bhigh ownership\b/i,             label: "High ownership",        color: "text-orange-300 border-orange-500/30 bg-orange-500/10" },
    { pattern: /\bcollaborati\w+\b/i,                                                label: "Collaborative",         color: "text-blue-300 border-blue-500/30 bg-blue-500/10" },
    { pattern: /\binternational\b|\bglobal team\b|\bmulticultural\b/i,              label: "International team",    color: "text-indigo-300 border-indigo-500/30 bg-indigo-500/10" },
]

export function extractCultureSignals(jobText: string): { label: string; color: string }[] {
    return CULTURE_PATTERNS
        .filter(({ pattern }) => pattern.test(jobText))
        .map(({ label, color }) => ({ label, color }))
}

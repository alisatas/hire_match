// The analyzer's verdict in the page language. analyze() writes its headline and summary in
// English; translated pages (web and mobile) rebuild them from the numbers instead.
import type { AnalysisResult } from "@/lib/analyze"
import type { AnalyzerStrings } from "./en"
import { fmt } from "./format"

// Own keys only — labels can come from a shared link
export const lookup = (map: Record<string, string>, key: string): string =>
    Object.hasOwn(map, key) ? map[key] : key

/**
 * The headline and one-line verdict in the page language. analyze() writes them in
 * English; the translated pages rebuild the same sentences from the numbers instead.
 */
export const tierOf = (score: number) => score >= 80 ? "top" : score >= 70 ? "strong" : score >= 45 ? "emerging" : "upskilling"

export function localizePersona(r: AnalysisResult, t: AnalyzerStrings): { label: string; desc: string } {
    const p = t.persona
    const tier = tierOf(r.score)
    const label = (name: string) => lookup(t.skillLabels, name)
    const matched = r.matched.slice(0, 2).map(label).join(p.joiner)
    const missing = r.missing.filter(m => m.priority === "high").slice(0, 2).map(m => label(m.label)).join(p.joiner)
    const exp = r.yearsRequired > 0
        ? fmt(r.yearsOnCV === 0 ? p.expNotStated : r.yearsOnCV >= r.yearsRequired ? p.expMeets : p.expBelow, { r: r.yearsRequired, c: r.yearsOnCV })
        : ""
    const desc = p.intro[tier]
        + (matched ? fmt(p.matched[tier], { x: matched }) : "")
        + (missing ? fmt(p.missing[tier], { x: missing }) : "")
        + (tier === "upskilling" ? (exp || p.fallback) : exp)
    return { label: p.labels[tier], desc: desc.trim() }
}

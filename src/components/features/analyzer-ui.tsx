"use client"

import React, { useState } from "react"
import { cn } from "@/lib/utils"
import { track } from "@/lib/analytics"

// ─────────────────────────────────────────────
// Presentational primitives for the analyzer.
// One visual language: graphite surfaces, hairline borders, one teal accent,
// and three semantic tones (success / warning / danger) used only for meaning.
// ─────────────────────────────────────────────

export type Tone = "success" | "warning" | "danger" | "neutral" | "accent"

// Score tiers — must stay in step with analyze.ts personas and the FAQ (70 / 45)
export function toneForScore(score: number): Tone {
    if (score >= 70) return "success"
    if (score >= 45) return "warning"
    return "danger"
}

const TONE_TEXT: Record<Tone, string> = {
    success: "text-success",
    warning: "text-warning",
    danger: "text-danger",
    neutral: "text-muted-foreground",
    accent: "text-primary",
}

const TONE_CHIP: Record<Tone, string> = {
    success: "border-success/25 bg-success/10 text-success",
    warning: "border-warning/25 bg-warning/10 text-warning",
    danger: "border-danger/25 bg-danger/10 text-danger",
    neutral: "border-border bg-foreground/[0.03] text-foreground/85",
    accent: "border-primary/25 bg-primary/10 text-primary",
}

const TONE_DOT: Record<Tone, string> = {
    success: "bg-success",
    warning: "bg-warning",
    danger: "bg-danger",
    neutral: "bg-muted-foreground/60",
    accent: "bg-primary",
}

export function toneText(tone: Tone) { return TONE_TEXT[tone] }
export function toneDot(tone: Tone) { return TONE_DOT[tone] }

// ── Surfaces ────────────────────────────────────────────────────────────────

export function Panel({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn(
                "rounded-2xl border border-border bg-card/85 shadow-[var(--panel-shadow)] backdrop-blur-xl",
                className,
            )}
            {...props}
        >
            {children}
        </div>
    )
}

export function Section({
    icon,
    title,
    description,
    action,
    children,
    className,
}: {
    icon?: React.ReactNode
    title: string
    description?: string
    action?: React.ReactNode
    children: React.ReactNode
    className?: string
}) {
    return (
        <section className={cn("space-y-4", className)}>
            <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                    {icon && (
                        <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg border border-border bg-foreground/[0.03] text-muted-foreground [&_svg]:size-3.5">
                            {icon}
                        </span>
                    )}
                    <div>
                        <h3 className="text-sm font-semibold tracking-tight text-foreground">{title}</h3>
                        {description && <p className="mt-0.5 text-[13px] leading-relaxed text-muted-foreground text-pretty">{description}</p>}
                    </div>
                </div>
                {action}
            </div>
            {children}
        </section>
    )
}

export function Divider() {
    return <div className="h-px bg-border" />
}

// ── Chips & badges ──────────────────────────────────────────────────────────

export function Chip({ tone = "neutral", dot, children, className }: { tone?: Tone; dot?: boolean; children: React.ReactNode; className?: string }) {
    return (
        <span className={cn("inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-xs font-medium leading-none", TONE_CHIP[tone], className)}>
            {dot && <span className={cn("size-1.5 rounded-full", TONE_DOT[tone])} />}
            {children}
        </span>
    )
}

export function Badge({ tone = "neutral", children }: { tone?: Tone; children: React.ReactNode }) {
    return (
        <span className={cn("inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium", TONE_CHIP[tone])}>
            {children}
        </span>
    )
}

// ── Score ───────────────────────────────────────────────────────────────────

export function ScoreRing({ score, size = 124, label, caption = "match" }: { score: number; size?: number; label?: string; caption?: string }) {
    const tone = toneForScore(score)
    const r = 52
    const c = 2 * Math.PI * r
    const offset = c - (c * Math.max(0, Math.min(100, score))) / 100
    return (
        <div className="relative shrink-0" style={{ width: size, height: size }}>
            <svg viewBox="0 0 120 120" className="size-full -rotate-90" role="img" aria-label={label ?? `Match score: ${score}%`}>
                <circle cx="60" cy="60" r={r} fill="none" strokeWidth="8" className="stroke-foreground/[0.08]" />
                <circle
                    cx="60" cy="60" r={r} fill="none" strokeWidth="8" strokeLinecap="round"
                    strokeDasharray={c}
                    strokeDashoffset={offset}
                    className={cn("transition-[stroke-dashoffset] duration-1000 ease-out", {
                        "stroke-success": tone === "success",
                        "stroke-warning": tone === "warning",
                        "stroke-danger": tone === "danger",
                    })}
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-[34px] font-semibold leading-none tracking-tight tabular-nums text-foreground">
                    {score}<span className="text-lg text-muted-foreground">%</span>
                </span>
                <span className="mt-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">{caption}</span>
            </div>
        </div>
    )
}

export function StatTile({ label, value, hint, tone = "neutral" }: { label: string; value: React.ReactNode; hint?: string; tone?: Tone }) {
    return (
        <div className="rounded-xl border border-border bg-foreground/[0.02] px-3 py-3 sm:px-4">
            <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground sm:text-[11px]">{label}</p>
            <p className={cn("mt-1 text-base font-semibold tabular-nums tracking-tight sm:text-lg", tone === "neutral" ? "text-foreground" : TONE_TEXT[tone])}>{value}</p>
            {hint && <p className="mt-0.5 text-[11px] leading-snug text-muted-foreground sm:text-xs">{hint}</p>}
        </div>
    )
}

// ── Inputs ──────────────────────────────────────────────────────────────────

export function SegmentedControl<T extends string>({
    value,
    onChange,
    options,
    label,
}: {
    value: T
    onChange: (v: T) => void
    options: { value: T; label: string; icon?: React.ReactNode }[]
    label: string
}) {
    return (
        <div role="tablist" aria-label={label} className="grid grid-cols-2 gap-1 rounded-lg border border-border bg-inset p-1">
            {options.map(o => (
                <button
                    key={o.value}
                    type="button"
                    role="tab"
                    aria-selected={value === o.value}
                    onClick={() => onChange(o.value)}
                    className={cn(
                        "inline-flex min-h-11 items-center justify-center gap-2 rounded-md text-[13px] font-medium transition-colors [&_svg]:size-3.5",
                        value === o.value
                            ? "bg-foreground/[0.08] text-foreground shadow-[0_1px_0_0_color-mix(in_oklch,var(--foreground)_6%,transparent)_inset]"
                            : "text-muted-foreground hover:text-foreground",
                    )}
                >
                    {o.icon}
                    {o.label}
                </button>
            ))}
        </div>
    )
}

export function StepLabel({ n, children, action }: { n: number; children: React.ReactNode; action?: React.ReactNode }) {
    return (
        <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
                <span className="flex size-5 items-center justify-center rounded-full border border-border bg-foreground/[0.04] text-[11px] font-semibold tabular-nums text-muted-foreground">{n}</span>
                <span className="text-sm font-medium text-foreground">{children}</span>
            </div>
            {action}
        </div>
    )
}

// ── Feedback ────────────────────────────────────────────────────────────────

const RATING_EMOJI = ["😔", "😕", "😐", "🙂", "😍"]

type RatingStrings = { ratingQuestion: string; ratingThanks: string; ratingHint: string; ratingAria: string; ratingLabels: string[] }

export function FeedbackRating({ t }: { t: RatingStrings }) {
    const RATINGS = RATING_EMOJI.map((emoji, i) => ({ emoji, label: t.ratingLabels[i] ?? "" }))
    const [rating, setRating] = useState(0)
    const [hover, setHover] = useState(0)
    const shown = hover || rating
    return (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <p className="text-sm font-medium text-foreground">{t.ratingQuestion}</p>
                <p className="text-xs text-muted-foreground" aria-live="polite">
                    {rating
                        ? t.ratingThanks.replace("{label}", RATINGS[rating - 1].label)
                        : shown
                        ? RATINGS[shown - 1].label
                        : t.ratingHint}
                </p>
            </div>
            <div className="flex gap-1.5" role="radiogroup" aria-label={t.ratingAria} onMouseLeave={() => setHover(0)}>
                {RATINGS.map((r, i) => {
                    const value = i + 1
                    const active = shown === value
                    return (
                        <button
                            key={r.label}
                            type="button"
                            role="radio"
                            aria-checked={rating === value}
                            aria-label={r.label}
                            title={r.label}
                            onClick={() => { setRating(value); track("score_rating", { rating: value }) }}
                            onMouseEnter={() => setHover(value)}
                            onFocus={() => setHover(value)}
                            onBlur={() => setHover(0)}
                            className={cn(
                                "flex size-11 items-center justify-center rounded-xl border text-[22px] leading-none transition-all duration-200",
                                active
                                    ? "scale-110 border-primary/40 bg-primary/10 shadow-[0_4px_14px_-6px_color-mix(in_oklch,var(--primary)_60%,transparent)]"
                                    : rating === value
                                    ? "border-primary/30 bg-primary/[0.06]"
                                    : "border-border bg-foreground/[0.02] hover:border-foreground/20",
                            )}
                        >
                            <span
                                className={cn(
                                    "select-none transition-[filter,opacity] duration-200",
                                    active || rating === value ? "opacity-100 grayscale-0" : "opacity-50 grayscale",
                                )}
                                aria-hidden
                            >
                                {r.emoji}
                            </span>
                        </button>
                    )
                })}
            </div>
        </div>
    )
}

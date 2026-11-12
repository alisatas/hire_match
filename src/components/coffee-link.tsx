"use client"

import { Coffee } from "lucide-react"
import { track } from "@/lib/analytics"
import type { Dictionary } from "@/lib/i18n/en"
import { fmt } from "@/lib/i18n/format"
import { SUPPORT } from "@/lib/site"
import { cn } from "@/lib/utils"

// Small, optional "Buy me a coffee" link to the Lemon Squeezy checkout (new tab).
// Renders nothing until a checkout link is configured.
export function CoffeeLink({ where, t, variant = "inline", className }: {
    where: "report" | "footer"
    t: Dictionary["coffee"]
    variant?: "inline" | "card"
    className?: string
}) {
    const url = SUPPORT.checkoutUrl
    if (!url) return null
    const onClick = () => track("coffee_click", { where })

    if (variant === "card") {
        return (
            <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClick}
                className={cn(
                    "group flex items-center justify-between gap-3 rounded-xl border border-border bg-card/70 px-4 py-3 transition-colors hover:border-primary/40",
                    className,
                )}
            >
                <span className="flex items-center gap-3">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600">
                        <Coffee className="size-4" />
                    </span>
                    <span className="text-left">
                        <span className="block text-sm font-medium text-foreground">{t.title}</span>
                        <span className="block text-xs text-muted-foreground">{fmt(t.note, { n: SUPPORT.minimumEur })}</span>
                    </span>
                </span>
                <span className="text-xs font-medium text-primary group-hover:underline">{t.support}</span>
            </a>
        )
    }

    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClick}
            className={cn("inline-flex items-center gap-1.5 transition-colors hover:text-foreground", className)}
        >
            <Coffee className="size-3.5" />
            {t.inline}
        </a>
    )
}

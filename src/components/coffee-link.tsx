"use client"

import { Coffee } from "lucide-react"
import { track } from "@/lib/analytics"
import { SUPPORT } from "@/lib/site"
import { cn } from "@/lib/utils"

// Small, optional "Buy me a coffee" link to the Lemon Squeezy checkout (new tab).
// Renders nothing until a checkout link is configured.
export function CoffeeLink({ where, variant = "inline", className }: {
    where: "report" | "footer"
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
                        <span className="block text-sm font-medium text-foreground">Was this useful? Buy me a coffee</span>
                        <span className="block text-xs text-muted-foreground">Any amount from €{SUPPORT.minimumEur} · CVXray stays free</span>
                    </span>
                </span>
                <span className="text-xs font-medium text-primary group-hover:underline">Support</span>
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
            Buy me a coffee
        </a>
    )
}

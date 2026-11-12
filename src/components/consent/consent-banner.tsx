"use client"

import { useSyncExternalStore } from "react"
import { GTM_ID, readConsent, setConsent, subscribeConsent } from "@/lib/analytics"
import type { Dictionary } from "@/lib/i18n/en"

const readServer = () => "pending"

export function ConsentBanner({ t }: { t: Dictionary["consent"] }) {
    // "pending" on the server and during hydration, so the banner never flashes for
    // visitors who already chose
    const consent = useSyncExternalStore(subscribeConsent, readConsent, readServer)
    if (!GTM_ID || consent !== "") return null

    return (
        <div
            role="dialog"
            aria-live="polite"
            aria-label={t.label}
            className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-3xl rounded-xl border border-border bg-card/95 px-4 py-3 shadow-[var(--panel-shadow)] backdrop-blur-xl sm:inset-x-6 sm:bottom-4"
        >
            {/* A slim bar: one sentence and two equal buttons, so it never covers the upload area */}
            <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:gap-4">
                <p className="flex-1 text-[13px] leading-snug text-muted-foreground text-pretty">
                    <span className="font-medium text-foreground">{t.question}</span>{" "}
                    {t.note}
                </p>
                <div className="grid shrink-0 grid-cols-2 gap-2 sm:flex">
                    <button
                        type="button"
                        onClick={() => setConsent("denied")}
                        className="inline-flex h-11 items-center justify-center rounded-lg border sm:h-9 border-border bg-foreground/[0.03] px-4 text-[13px] font-semibold text-foreground transition-colors hover:bg-foreground/[0.07]"
                    >
                        {t.reject}
                    </button>
                    <button
                        type="button"
                        onClick={() => setConsent("granted")}
                        className="inline-flex h-11 items-center justify-center rounded-lg bg-foreground sm:h-9 px-4 text-[13px] font-semibold text-background transition-opacity hover:opacity-90"
                    >
                        {t.accept}
                    </button>
                </div>
            </div>
        </div>
    )
}

/** Footer link that reopens the banner so visitors can change their choice. */
export function CookieSettingsButton({ label }: { label: string }) {
    if (!GTM_ID) return null
    return (
        <button type="button" onClick={() => setConsent("")} className="transition-colors hover:text-foreground">
            {label}
        </button>
    )
}

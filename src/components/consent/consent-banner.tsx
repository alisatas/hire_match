"use client"

import { useSyncExternalStore } from "react"
import { Cookie } from "lucide-react"
import { GTM_ID, readConsent, setConsent, subscribeConsent } from "@/lib/analytics"

const readServer = () => "pending"

export function ConsentBanner() {
    // "pending" on the server and during hydration, so the banner never flashes for
    // visitors who already chose
    const consent = useSyncExternalStore(subscribeConsent, readConsent, readServer)
    if (!GTM_ID || consent !== "") return null

    return (
        <div
            role="dialog"
            aria-live="polite"
            aria-label="Cookie consent"
            className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-2xl rounded-2xl border border-border bg-card/95 p-4 shadow-[var(--panel-shadow)] backdrop-blur-xl sm:inset-x-6 sm:bottom-6 sm:p-5"
        >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="flex flex-1 gap-3">
                    <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg border border-border bg-foreground/[0.03] text-muted-foreground">
                        <Cookie className="size-4" />
                    </span>
                    <div>
                        <p className="text-sm font-semibold text-foreground">Help us improve CVXray</p>
                        <p className="mt-0.5 text-[13px] leading-relaxed text-muted-foreground text-pretty">
                            With your OK we use cookies for anonymous usage statistics and to measure our ads. Your CV is never stored or tracked either way.
                        </p>
                    </div>
                </div>
                <div className="grid shrink-0 grid-cols-2 gap-2 sm:flex">
                    <button
                        type="button"
                        onClick={() => setConsent("denied")}
                        className="inline-flex h-10 items-center justify-center rounded-lg border border-border bg-foreground/[0.03] px-4 text-[13px] font-semibold text-foreground transition-colors hover:bg-foreground/[0.07]"
                    >
                        Reject all
                    </button>
                    <button
                        type="button"
                        onClick={() => setConsent("granted")}
                        className="inline-flex h-10 items-center justify-center rounded-lg bg-foreground px-4 text-[13px] font-semibold text-background transition-opacity hover:opacity-90"
                    >
                        Accept all
                    </button>
                </div>
            </div>
        </div>
    )
}

/** Footer link that reopens the banner so visitors can change their choice. */
export function CookieSettingsButton() {
    if (!GTM_ID) return null
    return (
        <button type="button" onClick={() => setConsent("")} className="transition-colors hover:text-foreground">
            Cookie settings
        </button>
    )
}

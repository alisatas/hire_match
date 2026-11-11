"use client"

import { useEffect } from "react"

// Sends uncaught browser errors to /api/client-error so problems real visitors hit
// show up in the logs. At most 5 reports per page view, duplicates skipped, and only
// the message, file path and line — never page content or form values.
export function ErrorReporter() {
    useEffect(() => {
        const seen = new Set<string>()
        const send = (kind: "error" | "unhandledrejection", message: string, source?: string, line?: number) => {
            if (seen.size >= 5 || seen.has(message)) return
            // Extension and third-party script noise
            if (!message || /^Script error\.?$/.test(message) || /extension:\/\//.test(source ?? "")) return
            seen.add(message)
            const payload = JSON.stringify({ kind, message: message.slice(0, 500), source, line, page: window.location.pathname })
            const blob = new Blob([payload], { type: "application/json" })
            if (!navigator.sendBeacon?.("/api/client-error", blob)) {
                fetch("/api/client-error", { method: "POST", body: payload, headers: { "Content-Type": "application/json" }, keepalive: true }).catch(() => {})
            }
        }
        const onError = (e: ErrorEvent) => send("error", e.message, e.filename, e.lineno)
        const onRejection = (e: PromiseRejectionEvent) => {
            const reason = e.reason instanceof Error ? e.reason.message : String(e.reason ?? "")
            send("unhandledrejection", reason)
        }
        window.addEventListener("error", onError)
        window.addEventListener("unhandledrejection", onRejection)
        return () => {
            window.removeEventListener("error", onError)
            window.removeEventListener("unhandledrejection", onRejection)
        }
    }, [])
    return null
}

import type { Instrumentation } from "next"
import { pathOf, scrub } from "@/lib/scrub"

// Server-side error monitoring: every error Next.js captures (page render, route
// handler, proxy) is written to the platform log as one structured, scrubbed line.
// Request headers and bodies are never logged.
export const onRequestError: Instrumentation.onRequestError = async (err, request, context) => {
    const digest = typeof err === "object" && err !== null && "digest" in err ? String((err as { digest: unknown }).digest) : undefined
    console.error(JSON.stringify({
        type: "server_error",
        message: scrub(err),
        digest,
        method: request.method,
        path: pathOf(request.path),
        route: context.routePath,
        kind: context.routeType,
    }))
}

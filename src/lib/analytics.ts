// ─────────────────────────────────────────────
// Analytics + consent
// Google Tag Manager is loaded only when NEXT_PUBLIC_GTM_ID is set. Google
// Consent Mode v2 defaults every storage type to "denied"; tags only use
// cookies after the visitor accepts in the consent banner.
// Event parameters never include CV or job-description text.
// ─────────────────────────────────────────────

export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? ""

export type ConsentChoice = "granted" | "denied"

const CONSENT_KEY = "cvxray_consent"
const consentListeners = new Set<() => void>()

declare global {
    interface Window {
        dataLayer?: unknown[]
        gtag?: (...args: unknown[]) => void
    }
}

export function readConsent(): ConsentChoice | "" {
    try {
        const v = localStorage.getItem(CONSENT_KEY)
        return v === "granted" || v === "denied" ? v : ""
    } catch {
        return ""
    }
}

export function subscribeConsent(onChange: () => void) {
    consentListeners.add(onChange)
    return () => { consentListeners.delete(onChange) }
}

export function setConsent(choice: ConsentChoice | "") {
    try {
        if (choice) localStorage.setItem(CONSENT_KEY, choice)
        else localStorage.removeItem(CONSENT_KEY)
    } catch { /* storage blocked — choice applies to this page view only */ }
    if (choice) {
        window.gtag?.("consent", "update", {
            analytics_storage: choice,
            ad_storage: choice,
            ad_user_data: choice,
            ad_personalization: choice,
        })
    }
    consentListeners.forEach(l => l())
}

/** Push a GTM event. No-op when GTM is not configured. */
export function track(event: string, params: Record<string, string | number | boolean> = {}) {
    if (!GTM_ID || typeof window === "undefined") return
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({ event, ...params })
}

/** Runs before GTM loads: consent defaults, then any choice already stored. */
export function consentBootstrapScript() {
    return `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;` +
        `gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',wait_for_update:500});` +
        `try{var c=localStorage.getItem('${CONSENT_KEY}');if(c==='granted'){gtag('consent','update',{analytics_storage:'granted',ad_storage:'granted',ad_user_data:'granted',ad_personalization:'granted'})}}catch(e){}`
}

export function gtmLoaderScript(id: string) {
    return `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});` +
        `var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;` +
        `j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer',${JSON.stringify(id)});`
}

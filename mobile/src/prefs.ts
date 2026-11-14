import { File, Paths } from "expo-file-system"
import { isLocale, LOCALES, type Locale } from "@/lib/i18n"

// App preferences in a small JSON file. Read synchronously at start-up so the first frame
// is already in the saved language.
const file = () => new File(Paths.document, "prefs.json")

type Prefs = { locale?: Locale }

function read(): Prefs {
  try {
    const f = file()
    if (!f.exists) return {}
    const data = JSON.parse(f.textSync()) as { locale?: unknown }
    return typeof data.locale === "string" && isLocale(data.locale) ? { locale: data.locale } : {}
  } catch {
    return {} // A broken file must never stop the app from starting
  }
}

// Start in the phone's language when CVXray has it, English otherwise
function deviceLocale(): Locale {
  const code = Intl.DateTimeFormat().resolvedOptions().locale.slice(0, 2).toLowerCase()
  return (LOCALES as readonly string[]).includes(code) ? (code as Locale) : "en"
}

/** The saved language, else the phone's language. */
export const initialLocale = (): Locale => read().locale ?? deviceLocale()

export function saveLocale(locale: Locale) {
  try {
    const f = file()
    if (!f.exists) f.create()
    f.writeSync(JSON.stringify({ ...read(), locale }))
  } catch {
    // Not saved: the app still works, it just starts in the phone's language next time
  }
}

import type { Locale } from "@/lib/i18n"
import type { SampleJob } from "@/lib/i18n/content/types"
import { SAMPLE_JOBS as de } from "@/lib/i18n/content/samples.de"
import { SAMPLE_JOBS as en } from "@/lib/i18n/content/samples.en"
import { SAMPLE_JOBS as es } from "@/lib/i18n/content/samples.es"
import { SAMPLE_JOBS as fr } from "@/lib/i18n/content/samples.fr"
import { SAMPLE_JOBS as pt } from "@/lib/i18n/content/samples.pt"
import { SAMPLE_JOBS as tr } from "@/lib/i18n/content/samples.tr"
import { SAMPLE_JOBS as zh } from "@/lib/i18n/content/samples.zh"

// Not `@/lib/i18n/content`: its index also loads the web's legal pages, which import
// next/link and break the Metro bundle.
const SAMPLES: Record<Locale, SampleJob[]> = { en, tr, de, es, pt, fr, zh }
export const getSamples = (locale: Locale): SampleJob[] => SAMPLES[locale]

// Languages the site is published in. English lives at the root ("/"); every other
// language has its own home page at "/<code>" (src/app/[lang]). Server-side only: client
// components receive the strings they need as props, so a visitor downloads one language.
import { de } from "./de";
import { en, type Dictionary } from "./en";
import { es } from "./es";
import { fr } from "./fr";
import { pt } from "./pt";
import { tr } from "./tr";
import { zh } from "./zh";

export const LOCALES = ["en", "tr", "de", "es", "pt", "fr", "zh"] as const;
export type Locale = (typeof LOCALES)[number];
/** Languages served from /<code> — everything except English. */
export const TRANSLATED_LOCALES = LOCALES.filter((l): l is Exclude<Locale, "en"> => l !== "en");

export const LOCALE_INFO: Record<Locale, { name: string; htmlLang: string; ogLocale: string }> = {
  en: { name: "English", htmlLang: "en", ogLocale: "en_US" },
  tr: { name: "Türkçe", htmlLang: "tr", ogLocale: "tr_TR" },
  de: { name: "Deutsch", htmlLang: "de", ogLocale: "de_DE" },
  es: { name: "Español", htmlLang: "es", ogLocale: "es_ES" },
  pt: { name: "Português", htmlLang: "pt-BR", ogLocale: "pt_BR" },
  fr: { name: "Français", htmlLang: "fr", ogLocale: "fr_FR" },
  zh: { name: "中文", htmlLang: "zh-Hans", ogLocale: "zh_CN" },
};

const DICTIONARIES: Record<Locale, Dictionary> = { en, tr, de, es, pt, fr, zh };

export const isLocale = (value: string): value is Locale => (LOCALES as readonly string[]).includes(value);
export const getDictionary = (locale: Locale): Dictionary => DICTIONARIES[locale];
export const homePath = (locale: Locale): string => (locale === "en" ? "/" : `/${locale}`);

/**
 * A page's path in one language. Paths are written without a language ("/blog/x");
 * English serves them as they are, every other language under "/<code>".
 */
export function localePath(locale: Locale, path: string = "/"): string {
  if (locale === "en") return path;
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}

/** hreflang map for a page: every language version plus x-default (English). */
export function alternatesFor(path: string = "/"): Record<string, string> {
  return {
    ...Object.fromEntries(LOCALES.map((l) => [l, localePath(l, path)])),
    "x-default": path,
  };
}

export const homeAlternates = (): Record<string, string> => alternatesFor("/");

/** Locale for dates: British day-month order in English, the page language elsewhere. */
export const dateLocale = (locale: Locale): string => (locale === "en" ? "en-GB" : LOCALE_INFO[locale].htmlLang);

export type { Dictionary };
export { fmt } from "./format";

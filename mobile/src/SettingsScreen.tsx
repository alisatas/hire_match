import type { ReactNode } from "react"
import { Linking, Pressable, Text, View } from "react-native"
import { LOCALES, LOCALE_INFO, localePath, type Locale } from "@/lib/i18n"
import appJson from "../app.json"
import { Icon, type IconName } from "./icons"
import { colors } from "./theme"

const SITE = "https://cvxray.com"

// App-only strings; kept here so the shared web dictionaries stay untouched
type SettingsStrings = {
  title: string; back: string; general: string; language: string; legal: string
  terms: string; privacy: string; refunds: string; about: string; website: string; version: string
}
export const SETTINGS_STRINGS: Record<Locale, SettingsStrings> = {
  en: { title: "Settings", back: "Back", general: "General", language: "Language", legal: "Legal", terms: "Terms of Service", privacy: "Privacy Policy", refunds: "Refund Policy", about: "About", website: "Website", version: "Version" },
  tr: { title: "Ayarlar", back: "Geri", general: "Genel", language: "Dil", legal: "Yasal", terms: "Kullanım Koşulları", privacy: "Gizlilik Politikası", refunds: "İade Politikası", about: "Hakkında", website: "Web sitesi", version: "Sürüm" },
  de: { title: "Einstellungen", back: "Zurück", general: "Allgemein", language: "Sprache", legal: "Rechtliches", terms: "Nutzungsbedingungen", privacy: "Datenschutzerklärung", refunds: "Rückerstattung", about: "Über", website: "Website", version: "Version" },
  es: { title: "Ajustes", back: "Atrás", general: "General", language: "Idioma", legal: "Legal", terms: "Términos del servicio", privacy: "Política de privacidad", refunds: "Política de reembolso", about: "Acerca de", website: "Sitio web", version: "Versión" },
  pt: { title: "Configurações", back: "Voltar", general: "Geral", language: "Idioma", legal: "Jurídico", terms: "Termos de uso", privacy: "Política de privacidade", refunds: "Política de reembolso", about: "Sobre", website: "Site", version: "Versão" },
  fr: { title: "Réglages", back: "Retour", general: "Général", language: "Langue", legal: "Mentions légales", terms: "Conditions d'utilisation", privacy: "Politique de confidentialité", refunds: "Politique de remboursement", about: "À propos", website: "Site web", version: "Version" },
  zh: { title: "设置", back: "返回", general: "通用", language: "语言", legal: "法律信息", terms: "服务条款", privacy: "隐私政策", refunds: "退款政策", about: "关于", website: "网站", version: "版本" },
}

// Emoji flags render on Android and iOS (the web uses SVGs because of Windows)
const FLAG_EMOJI: Record<Locale, string> = { en: "🇺🇸", tr: "🇹🇷", de: "🇩🇪", es: "🇪🇸", pt: "🇧🇷", fr: "🇫🇷", zh: "🇨🇳" }

const VERSION = `${appJson.expo.version} (${appJson.expo.android.versionCode})`

// ── Grouped list building blocks (platform settings style) ─────────────────

function Section({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <View style={{ marginBottom: 26 }}>
      {title ? (
        <Text accessibilityRole="header" style={{ fontSize: 12, fontWeight: "600", letterSpacing: 0.6, textTransform: "uppercase", color: colors.muted, marginLeft: 16, marginBottom: 8 }}>
          {title}
        </Text>
      ) : null}
      <View style={{ backgroundColor: colors.card, borderRadius: 14, borderWidth: 1, borderColor: colors.border, overflow: "hidden" }}>{children}</View>
    </View>
  )
}

function Row({ icon, tint, label, value, trailing = "chevron", first, onPress, role = "button", checked, leading }: {
  icon?: IconName; tint?: string; label: string; value?: string; trailing?: "chevron" | "external" | "check" | "none"
  first?: boolean; onPress: () => void; role?: "button" | "link" | "radio"; checked?: boolean; leading?: ReactNode
}) {
  return (
    <Pressable onPress={onPress} accessibilityRole={role} accessibilityState={role === "radio" ? { checked: !!checked } : undefined}
      accessibilityLabel={value ? `${label}, ${value}` : label}
      style={({ pressed }) => ({ flexDirection: "row", alignItems: "center", minHeight: 54, paddingLeft: 14, backgroundColor: pressed ? colors.inset : colors.card })}>
      {leading ?? (icon && tint ? (
        <View style={{ width: 30, height: 30, borderRadius: 8, backgroundColor: tint, alignItems: "center", justifyContent: "center" }}>
          <Icon name={icon} size={17} color="#fff" />
        </View>
      ) : null)}
      <View style={{ flex: 1, flexDirection: "row", alignItems: "center", alignSelf: "stretch", marginLeft: 14, paddingRight: 14, borderTopWidth: first ? 0 : 1, borderTopColor: colors.border }}>
        <Text style={{ flex: 1, fontSize: 16, color: colors.text, fontWeight: checked ? "600" : "400" }} numberOfLines={1}>{label}</Text>
        {value ? <Text style={{ fontSize: 15, color: colors.muted, marginRight: 6 }}>{value}</Text> : null}
        {trailing === "chevron" && <Icon name="chevronRight" size={18} color="#a1a1aa" />}
        {trailing === "external" && <Icon name="link" size={16} color="#a1a1aa" />}
        {trailing === "check" && checked && <Icon name="check" size={20} color={colors.primary} strokeWidth={2.5} />}
      </View>
    </Pressable>
  )
}

/** Main settings list. */
export function SettingsScreen({ locale, onOpenLanguage }: { locale: Locale; onOpenLanguage: () => void }) {
  const s = SETTINGS_STRINGS[locale]
  const open = (path: string) => Linking.openURL(`${SITE}${localePath(locale, path)}`)
  return (
    <View>
      <Section title={s.general}>
        <Row first icon="globe" tint="#3b6cf6" label={s.language} value={LOCALE_INFO[locale].name} onPress={onOpenLanguage} />
      </Section>
      <Section title={s.legal}>
        <Row first icon="file" tint="#64748b" label={s.terms} trailing="external" role="link" onPress={() => open("/terms")} />
        <Row icon="shield" tint="#16a34a" label={s.privacy} trailing="external" role="link" onPress={() => open("/privacy")} />
        <Row icon="refund" tint="#ea580c" label={s.refunds} trailing="external" role="link" onPress={() => open("/refund-policy")} />
      </Section>
      <Section title={s.about}>
        <Row first icon="link" tint="#7c3aed" label={s.website} value="cvxray.com" trailing="external" role="link" onPress={() => open("/")} />
      </Section>
      <View style={{ alignItems: "center", marginTop: 4 }}>
        <Text style={{ fontSize: 15, fontWeight: "700", color: colors.text }}>CV<Text style={{ color: colors.primary }}>Xray</Text></Text>
        <Text style={{ fontSize: 13, color: colors.muted, marginTop: 4 }}>{s.version} {VERSION}</Text>
        <Text style={{ fontSize: 12, color: colors.muted, marginTop: 2 }}>© {new Date().getFullYear()} CVXray</Text>
      </View>
    </View>
  )
}

/** Language picker, one level below Settings. */
export function LanguageScreen({ locale, onChangeLocale }: { locale: Locale; onChangeLocale: (l: Locale) => void }) {
  return (
    <View accessibilityRole="radiogroup" accessibilityLabel={SETTINGS_STRINGS[locale].language}>
      <Section>
        {LOCALES.map((code, i) => (
          <Row key={code} first={i === 0} role="radio" trailing="check" checked={code === locale} label={LOCALE_INFO[code].name}
            leading={<Text style={{ fontSize: 22, width: 30, textAlign: "center" }}>{FLAG_EMOJI[code]}</Text>}
            onPress={() => onChangeLocale(code)} />
        ))}
      </Section>
    </View>
  )
}

import { useMemo, useState } from "react"
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, View } from "react-native"
import { StatusBar } from "expo-status-bar"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"
import { analyze, type AnalysisResult } from "@/lib/analyze"
import { LOCALES, LOCALE_INFO, getDictionary, type Locale } from "@/lib/i18n"
import { getSamples } from "@/lib/i18n/content"
import { localizePersona } from "@/lib/i18n/persona"
import { buildSuggestions, type KeywordSuggestion } from "@/lib/suggestions"
import { InputScreen, type Inputs } from "./src/InputScreen"
import { ResultsScreen } from "./src/ResultsScreen"
import { colors } from "./src/theme"

// Start in the phone's language when CVXray has it, English otherwise
function deviceLocale(): Locale {
  const code = Intl.DateTimeFormat().resolvedOptions().locale.slice(0, 2).toLowerCase()
  return (LOCALES as readonly string[]).includes(code) ? (code as Locale) : "en"
}

type Report = { r: AnalysisResult; suggestions: KeywordSuggestion[] }

export default function App() {
  const [locale, setLocale] = useState<Locale>(deviceLocale)
  const [report, setReport] = useState<Report | null>(null)
  const [busy, setBusy] = useState(false)
  const dict = getDictionary(locale)
  const t = dict.analyzer
  const persona = useMemo(
    () => (!report ? null : locale === "en" ? report.r.persona : localizePersona(report.r, t)),
    [report, locale, t],
  )

  const run = ({ cv, job }: Inputs) => {
    setBusy(true)
    // Let the button show its spinner before the (synchronous) analysis runs
    setTimeout(() => {
      try {
        const r = analyze(cv, job)
        setReport({ r, suggestions: buildSuggestions(cv, job, r.missing, 5, locale === "en" ? undefined : t.where) })
      } finally {
        setBusy(false)
      }
    }, 30)
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={["top", "bottom"]}>
        <StatusBar style="dark" />
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 18, paddingVertical: 10 }}>
          <Text style={{ fontSize: 20, fontWeight: "700", color: colors.text }}>
            CV<Text style={{ color: colors.primary }}>Xray</Text>
          </Text>
          <View style={{ flexDirection: "row" }} accessibilityLabel={dict.nav.language}>
            {LOCALES.map((code) => (
              <Pressable key={code} onPress={() => setLocale(code)} hitSlop={6}
                accessibilityRole="button" accessibilityState={{ selected: code === locale }} accessibilityLabel={LOCALE_INFO[code].name}
                style={{ paddingHorizontal: 7, paddingVertical: 8 }}>
                <Text style={{ fontSize: 13, fontWeight: code === locale ? "700" : "500", color: code === locale ? colors.primary : colors.muted }}>
                  {code === "zh" ? "中文" : code.toUpperCase()}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
          <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 40 }} keyboardShouldPersistTaps="handled">
            {report && persona ? (
              <ResultsScreen r={report.r} persona={persona} suggestions={report.suggestions} t={t} onBack={() => setReport(null)} />
            ) : (
              <>
                <Text style={{ fontSize: 28, fontWeight: "700", color: colors.text, marginBottom: 4 }}>{dict.home.h1a} <Text style={{ color: colors.primary }}>{dict.home.h1b}</Text></Text>
                <Text style={{ fontSize: 15, color: colors.muted, marginBottom: 18, lineHeight: 22 }}>{t.subtitle}</Text>
                <InputScreen key={locale} t={t} samples={getSamples(locale)} onAnalyze={run} busy={busy} />
              </>
            )}
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

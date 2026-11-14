import { useEffect, useMemo, useState } from "react"
import { BackHandler, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, View } from "react-native"
import { StatusBar } from "expo-status-bar"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"
import { analyze, type AnalysisResult } from "@/lib/analyze"
import { getDictionary, type Locale } from "@/lib/i18n"
import { getSamples } from "./src/samples"
import { localizePersona } from "@/lib/i18n/persona"
import { buildSuggestions, type KeywordSuggestion } from "@/lib/suggestions"
import { InputScreen, type Inputs } from "./src/InputScreen"
import { ResultsScreen } from "./src/ResultsScreen"
import { Icon } from "./src/icons"
import { LanguageScreen, SETTINGS_STRINGS, SettingsScreen } from "./src/SettingsScreen"
import { initialLocale, saveLocale } from "./src/prefs"
import { colors } from "./src/theme"

type Report = { r: AnalysisResult; suggestions: KeywordSuggestion[] }

export default function App() {
  const [locale, setLocale] = useState<Locale>(initialLocale)
  const [report, setReport] = useState<Report | null>(null)
  const [busy, setBusy] = useState(false)
  const [screen, setScreen] = useState<"main" | "settings" | "language">("main")
  const dict = getDictionary(locale)
  const t = dict.analyzer
  const settingsT = SETTINGS_STRINGS[locale]

  const changeLocale = (l: Locale) => {
    setLocale(l)
    saveLocale(l)
  }
  const goBack = () => setScreen((v) => (v === "language" ? "settings" : "main"))

  // Android Back steps back through Settings instead of leaving the app
  useEffect(() => {
    if (screen === "main") return
    const sub = BackHandler.addEventListener("hardwareBackPress", () => (goBack(), true))
    return () => sub.remove()
  }, [screen])
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
        {screen === "main" ? (
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 18, paddingVertical: 10 }}>
            <Text style={{ fontSize: 20, fontWeight: "700", color: colors.text }}>
              CV<Text style={{ color: colors.primary }}>Xray</Text>
            </Text>
            <Pressable onPress={() => setScreen("settings")} hitSlop={8} accessibilityRole="button" accessibilityLabel={settingsT.title}
              style={{ minHeight: 44, minWidth: 44, alignItems: "center", justifyContent: "center" }}>
              <Icon name="gear" size={22} color={colors.muted} />
            </Pressable>
          </View>
        ) : (
          // Standard navigation bar: back on the left, title centred
          <View style={{ flexDirection: "row", alignItems: "center", minHeight: 52, paddingHorizontal: 6, borderBottomWidth: 1, borderBottomColor: colors.border }}>
            <Pressable onPress={goBack} hitSlop={8} accessibilityRole="button" accessibilityLabel={settingsT.back}
              style={{ flexDirection: "row", alignItems: "center", minHeight: 44, paddingRight: 8, zIndex: 1 }}>
              <Icon name="chevronLeft" size={24} color={colors.primary} />
              <Text style={{ fontSize: 16, color: colors.primary }}>{screen === "language" ? settingsT.title : settingsT.back}</Text>
            </Pressable>
            <Text accessibilityRole="header" numberOfLines={1}
              style={{ position: "absolute", left: 0, right: 0, textAlign: "center", fontSize: 17, fontWeight: "600", color: colors.text }}>
              {screen === "language" ? settingsT.language : settingsT.title}
            </Text>
          </View>
        )}
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
          <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 40 }} keyboardShouldPersistTaps="handled">
            {screen === "settings" && <SettingsScreen locale={locale} onOpenLanguage={() => setScreen("language")} />}
            {screen === "language" && <LanguageScreen locale={locale} onChangeLocale={changeLocale} />}
            {/* Hidden, not unmounted, so a typed CV survives a visit to Settings */}
            <View style={screen !== "main" ? { display: "none" } : undefined}>
            {report && persona ? (
              <ResultsScreen r={report.r} persona={persona} suggestions={report.suggestions} t={t} onBack={() => setReport(null)} />
            ) : (
              <>
                <Text style={{ fontSize: 28, fontWeight: "700", color: colors.text, marginBottom: 4 }}>{dict.home.h1a} <Text style={{ color: colors.primary }}>{dict.home.h1b}</Text></Text>
                <Text style={{ fontSize: 15, color: colors.muted, marginBottom: 18, lineHeight: 22 }}>{t.subtitle}</Text>
                <InputScreen key={locale} t={t} samples={getSamples(locale)} onAnalyze={run} busy={busy} />
              </>
            )}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

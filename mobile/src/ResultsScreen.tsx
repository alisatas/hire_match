import { Linking, Pressable, Text, View } from "react-native"
import type { AnalysisResult } from "@/lib/analyze"
import type { AnalyzerStrings } from "@/lib/i18n/en"
import { fmt } from "@/lib/i18n/format"
import { lookup } from "@/lib/i18n/persona"
import { resourceFor } from "@/lib/resources"
import type { KeywordSuggestion } from "@/lib/suggestions"
import { colors, toneColor, toneForScore, type Tone } from "./theme"
import { Button, Card, Chip, ScoreRing, SectionTitle, styles } from "./ui"

const priorityTone = (p: "high" | "medium" | "low"): Tone => (p === "high" ? "danger" : p === "medium" ? "warning" : "neutral")

/** The report: same sections and wording as the website's results panel. */
export function ResultsScreen({ r, persona, suggestions, t, onBack }: {
  r: AnalysisResult; persona: { label: string; desc: string }; suggestions: KeywordSuggestion[]
  t: AnalyzerStrings; onBack: () => void
}) {
  const label = (s: string) => lookup(t.skillLabels, s)
  const tone = toneForScore(r.score)
  const high = r.missing.filter((m) => m.priority === "high")
  const total = r.matched.length + r.missing.length
  const courses = r.missing.filter((m) => resourceFor(m.key)).slice(0, Math.min(Math.max(6, high.length + 2), 10))
  const headline = tone === "success" ? t.recStrong
    : tone === "warning" ? (high.length ? fmt(Math.min(high.length, 2) !== 1 ? t.recCompetitiveGaps : t.recCompetitiveGap, { n: Math.min(high.length, 2) }) : t.recCompetitive)
    : t.recGaps
  const exp = r.yearsRequired > 0
    ? `${r.yearsOnCV || "—"}/${r.yearsRequired}${t.years}`
    : r.yearsOnCV > 0 ? `${r.yearsOnCV}${t.years}` : "—"

  return (
    <View>
      <Card style={{ alignItems: "center" }}>
        <ScoreRing score={r.score} caption={t.scoreCaption} label={fmt(t.scoreAria, { n: r.score })} />
        <Text style={{ fontSize: 22, fontWeight: "700", color: toneColor(tone), marginTop: 14 }}>{persona.label}</Text>
        {r.lowQuality && <Chip label={t.lowConfidence} tone="warning" />}
        <Text style={[styles.muted, { textAlign: "center", fontSize: 14, marginTop: 6 }]}>{persona.desc}</Text>
        <View style={{ flexDirection: "row", marginTop: 16, gap: 8 }}>
          {[
            [t.statSkills, `${r.matched.length}/${total}`],
            [t.statKeywords, `${r.rawMatched}/${r.rawTotal}`],
            [t.statExperience, exp],
          ].map(([k, v]) => (
            <View key={k} style={{ flex: 1, backgroundColor: colors.inset, borderRadius: 12, padding: 10, alignItems: "center" }}>
              <Text style={{ fontSize: 11, fontWeight: "600", color: colors.muted, textTransform: "uppercase" }} numberOfLines={1}>{k}</Text>
              <Text style={{ fontSize: 18, fontWeight: "700", color: colors.text, marginTop: 4 }}>{v}</Text>
            </View>
          ))}
        </View>
      </Card>

      <Card style={{ borderColor: toneColor(tone) }}>
        <Text style={[styles.sectionTitle, { color: toneColor(tone) }]}>{headline}</Text>
        {(tone === "danger" ? high.slice(0, 3) : high.slice(0, 2)).map((g) => (
          <Text key={g.key} style={[styles.body, { marginTop: 8 }]}>→ {fmt(tone === "danger" ? t.tipLearn : t.tipAdd, { x: label(g.label) })}</Text>
        ))}
        {tone !== "danger" && r.matched.length > 0 && (
          <Text style={[styles.body, { marginTop: 8 }]}>→ {fmt(tone === "success" ? t.tipMention : t.tipLead, { x: r.matched.slice(0, tone === "success" ? 3 : 2).map(label).join(tone === "success" ? ", " : t.and) })}</Text>
        )}
      </Card>

      {r.lowQuality && <Text style={[styles.error, { backgroundColor: colors.warningSoft, color: colors.warning }]}>{fmt(t.lowQuality, { x: fmt(t.lowQualityWords, { n: r.jobWordCount }) })}</Text>}

      <Card>
        <SectionTitle title={t.skillsTitle} description={fmt(t.skillsDesc, { a: r.matched.length, b: total })} />
        <Text style={styles.label}>{t.onCv}</Text>
        <View style={styles.row}>
          {r.matched.length ? r.matched.map((s) => <Chip key={s} label={label(s)} tone="success" />) : <Text style={styles.muted}>{t.noMatch}</Text>}
        </View>
        <Text style={[styles.label, { marginTop: 10 }]}>{t.missing}</Text>
        <View style={styles.row}>
          {r.missing.length ? r.missing.map((s) => <Chip key={s.key} label={label(s.label)} tone={priorityTone(s.priority)} />) : <Text style={styles.muted}>{t.noGaps}</Text>}
        </View>
      </Card>

      {suggestions.length > 0 && (
        <Card>
          <SectionTitle title={t.sugTitle} description={t.sugDesc} />
          {suggestions.map((s) => (
            <View key={s.key} style={{ borderTopWidth: 1, borderTopColor: colors.border, paddingTop: 12, marginTop: 4, marginBottom: 8 }}>
              <View style={styles.row}><Chip label={label(s.skill)} tone={priorityTone(s.priority)} /></View>
              {s.jobQuote && <Text style={[styles.muted, { fontStyle: "italic" }]}>“{s.jobQuote}”</Text>}
              <Text style={[styles.body, { marginTop: 6 }]}>{s.where}</Text>
              {t.showExample ? <Text style={[styles.muted, { marginTop: 6 }]}>{s.example}</Text> : null}
            </View>
          ))}
        </Card>
      )}

      {r.topJobSignals.length > 0 && (
        <Card>
          <SectionTitle title={t.kwTitle} description={t.kwDesc} />
          <View style={styles.row}>
            {r.topJobSignals.map(({ word, freq }) => <Chip key={word} label={`${word} ×${freq}`} tone={freq >= 3 ? "danger" : freq === 2 ? "warning" : "neutral"} />)}
          </View>
        </Card>
      )}

      {courses.length > 0 && (
        <Card>
          <SectionTitle title={t.trainTitle} description={t.trainDesc} />
          {courses.map((m) => {
            const c = resourceFor(m.key)!
            return (
              <Pressable key={m.key} accessibilityRole="link" onPress={() => Linking.openURL(c.url)}
                style={{ borderTopWidth: 1, borderTopColor: colors.border, paddingVertical: 12, minHeight: 48 }}>
                <Text style={[styles.body, { fontWeight: "600" }]}>{c.label}{c.free ? `  · ${t.free}` : ""}</Text>
                <Text style={styles.muted}>{label(m.label)} · {c.platform} · {c.duration}</Text>
              </Pressable>
            )
          })}
        </Card>
      )}

      <Button variant="secondary" label={t.tryAnother} onPress={onBack} />
    </View>
  )
}

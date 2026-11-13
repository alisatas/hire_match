import type { ReactNode } from "react"
import { ActivityIndicator, Pressable, StyleSheet, Text, View, type ViewStyle } from "react-native"
import Svg, { Circle } from "react-native-svg"
import { colors, toneColor, toneForScore, toneSoft, type Tone } from "./theme"

export function Card({ children, style }: { children: ReactNode; style?: ViewStyle }) {
  return <View style={[styles.card, style]}>{children}</View>
}

export function SectionTitle({ title, description }: { title: string; description?: string }) {
  return (
    <View style={{ marginBottom: 12 }}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {description ? <Text style={styles.muted}>{description}</Text> : null}
    </View>
  )
}

export function Chip({ label, tone = "neutral" }: { label: string; tone?: Tone }) {
  return (
    <View style={[styles.chip, { backgroundColor: toneSoft(tone), borderColor: tone === "neutral" ? colors.border : toneSoft(tone) }]}>
      {tone !== "neutral" && <View style={[styles.dot, { backgroundColor: toneColor(tone) }]} />}
      <Text style={styles.chipText}>{label}</Text>
    </View>
  )
}

export function Button({ label, onPress, disabled, loading, variant = "primary" }: {
  label: string; onPress: () => void; disabled?: boolean; loading?: boolean; variant?: "primary" | "secondary"
}) {
  const primary = variant === "primary"
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: !!disabled, busy: !!loading }}
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.button,
        primary ? { backgroundColor: disabled ? colors.inset : colors.primary } : { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border },
        pressed && { opacity: 0.85 },
      ]}
    >
      {loading && <ActivityIndicator color={primary ? "#fff" : colors.text} style={{ marginRight: 8 }} />}
      <Text style={[styles.buttonText, { color: primary ? (disabled ? colors.muted : "#fff") : colors.text }]}>{label}</Text>
    </Pressable>
  )
}

/** Tabs for two input modes (PDF / paste, link / paste). */
export function Segmented<T extends string>({ value, options, onChange }: {
  value: T; options: { value: T; label: string }[]; onChange: (v: T) => void
}) {
  return (
    <View style={styles.segmented} accessibilityRole="tablist">
      {options.map((o) => (
        <Pressable
          key={o.value}
          accessibilityRole="tab"
          accessibilityState={{ selected: o.value === value }}
          onPress={() => onChange(o.value)}
          style={[styles.segment, o.value === value && styles.segmentActive]}
        >
          <Text style={[styles.segmentText, o.value === value && { color: colors.text }]}>{o.label}</Text>
        </Pressable>
      ))}
    </View>
  )
}

export function ScoreRing({ score, caption, label }: { score: number; caption: string; label: string }) {
  const size = 132, r = 56, c = 2 * Math.PI * r
  const offset = c - (c * Math.max(0, Math.min(100, score))) / 100
  return (
    <View accessible accessibilityLabel={label} style={{ width: size, height: size, alignItems: "center", justifyContent: "center" }}>
      <Svg width={size} height={size} style={{ position: "absolute", transform: [{ rotate: "-90deg" }] }}>
        <Circle cx={size / 2} cy={size / 2} r={r} stroke={colors.inset} strokeWidth={9} fill="none" />
        <Circle cx={size / 2} cy={size / 2} r={r} stroke={toneColor(toneForScore(score))} strokeWidth={9} fill="none"
          strokeDasharray={c} strokeDashoffset={offset} strokeLinecap="round" />
      </Svg>
      <Text style={styles.score}>{score}%</Text>
      <Text style={styles.caption}>{caption}</Text>
    </View>
  )
}

export const styles = StyleSheet.create({
  card: { backgroundColor: colors.card, borderRadius: 16, borderWidth: 1, borderColor: colors.border, padding: 18, marginBottom: 14 },
  sectionTitle: { fontSize: 17, fontWeight: "600", color: colors.text },
  muted: { fontSize: 13, color: colors.muted, marginTop: 3, lineHeight: 19 },
  body: { fontSize: 15, color: colors.text, lineHeight: 22 },
  label: { fontSize: 13, fontWeight: "600", color: colors.muted, marginBottom: 8 },
  chip: { flexDirection: "row", alignItems: "center", borderRadius: 8, borderWidth: 1, paddingHorizontal: 10, paddingVertical: 6, marginRight: 6, marginBottom: 6 },
  chipText: { fontSize: 13, color: colors.text },
  dot: { width: 6, height: 6, borderRadius: 3, marginRight: 6 },
  button: { minHeight: 52, borderRadius: 14, flexDirection: "row", alignItems: "center", justifyContent: "center", paddingHorizontal: 18 },
  buttonText: { fontSize: 16, fontWeight: "600" },
  segmented: { flexDirection: "row", backgroundColor: colors.inset, borderRadius: 10, padding: 4, marginBottom: 12 },
  segment: { flex: 1, minHeight: 40, alignItems: "center", justifyContent: "center", borderRadius: 8 },
  segmentActive: { backgroundColor: colors.card, shadowColor: "#000", shadowOpacity: 0.06, shadowRadius: 3, elevation: 1 },
  segmentText: { fontSize: 14, fontWeight: "500", color: colors.muted },
  input: { backgroundColor: colors.inset, borderRadius: 12, borderWidth: 1, borderColor: colors.border, padding: 14, fontSize: 15, color: colors.text, textAlignVertical: "top" },
  score: { fontSize: 32, fontWeight: "700", color: colors.text },
  caption: { fontSize: 11, fontWeight: "600", letterSpacing: 1, textTransform: "uppercase", color: colors.muted },
  row: { flexDirection: "row", flexWrap: "wrap" },
  error: { backgroundColor: colors.dangerSoft, borderRadius: 10, padding: 12, color: colors.danger, fontSize: 14, marginBottom: 12 },
})

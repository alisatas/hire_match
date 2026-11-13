// The website's colours (src/app/globals.css), so the app reads as the same product.
export const colors = {
  background: "#fafafa",
  card: "#ffffff",
  inset: "#f4f4f5",
  border: "#e4e4e7",
  text: "#18181b",
  muted: "#71717a",
  primary: "#3b6cf6",
  primarySoft: "#eef2fe",
  success: "#16a34a",
  successSoft: "#ecfdf3",
  warning: "#d97706",
  warningSoft: "#fffbeb",
  danger: "#dc2626",
  dangerSoft: "#fef2f2",
}

export type Tone = "success" | "warning" | "danger" | "neutral"

export const toneForScore = (score: number): Tone => (score >= 70 ? "success" : score >= 45 ? "warning" : "danger")

export const toneColor = (tone: Tone) =>
  tone === "success" ? colors.success : tone === "warning" ? colors.warning : tone === "danger" ? colors.danger : colors.muted

export const toneSoft = (tone: Tone) =>
  tone === "success" ? colors.successSoft : tone === "warning" ? colors.warningSoft : tone === "danger" ? colors.dangerSoft : colors.inset

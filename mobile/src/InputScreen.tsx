import { useState } from "react"
import { Pressable, Text, TextInput, View } from "react-native"
import * as DocumentPicker from "expo-document-picker"
import type { AnalyzerStrings } from "@/lib/i18n/en"
import { fmt } from "@/lib/i18n/format"
import type { SampleJob } from "@/lib/i18n/content/types"
import { countWords } from "@/lib/languages"
import { ApiError, extractPdf, fetchJob } from "./api"
import { colors } from "./theme"
import { Button, Card, Segmented, styles } from "./ui"

export interface Inputs { cv: string; job: string; company: string; sample: string }

/** Step 1 (CV) and step 2 (job), then Analyze. */
export function InputScreen({ t, samples, onAnalyze, busy }: {
  t: AnalyzerStrings; samples: SampleJob[]; busy: boolean
  onAnalyze: (inputs: Inputs) => void
}) {
  const [cvMode, setCvMode] = useState<"pdf" | "paste">("pdf")
  const [cv, setCv] = useState("")
  const [cvFile, setCvFile] = useState("")
  const [cvStatus, setCvStatus] = useState<"" | "reading" | "error" | "too_large">("")
  const [jobMode, setJobMode] = useState<"url" | "paste">("url")
  const [url, setUrl] = useState("")
  const [job, setJob] = useState("")
  const [sample, setSample] = useState("")
  const [showSamples, setShowSamples] = useState(false)
  const [fetching, setFetching] = useState(false)
  const [error, setError] = useState("")

  const pickPdf = async () => {
    const res = await DocumentPicker.getDocumentAsync({ type: "application/pdf", copyToCacheDirectory: true })
    if (res.canceled || !res.assets?.[0]) return
    const file = res.assets[0]
    setCvStatus("reading")
    try {
      setCv(await extractPdf({ uri: file.uri, name: file.name, size: file.size }))
      setCvFile(file.name)
      setCvStatus("")
    } catch (e) {
      // Unreadable or too large: open the paste box, as the website does
      setCvStatus(e instanceof ApiError && e.kind === "too_large" ? "too_large" : "error")
      setCvMode("paste")
    }
  }

  const analyze = async () => {
    setError("")
    if (!cv.trim()) return setError(t.errNoCv)
    let text = job, company = ""
    if (!sample && jobMode === "url") {
      if (!/^https?:\/\/\S+\.\S+/.test(url.trim())) return setError(t.urlInvalid)
      setFetching(true)
      try {
        ;({ text, company } = await fetchJob(url.trim()))
      } catch {
        setFetching(false)
        setJobMode("paste")
        return setError(t.cantRead)
      }
      setFetching(false)
    }
    if (!text.trim()) return setError(t.errNoJob)
    onAnalyze({ cv, job: text, company, sample })
  }

  const loadSample = (s: SampleJob) => {
    setSample(s.label)
    setJob(s.text)
    setShowSamples(false)
    setError("")
  }

  return (
    <View>
      <Card>
        <Text style={styles.sectionTitle}>1  {t.step1}</Text>
        <View style={{ height: 12 }} />
        <Segmented value={cvMode} onChange={setCvMode}
          options={[{ value: "pdf", label: "PDF" }, { value: "paste", label: t.pasteText }]} />
        {cvMode === "pdf" ? (
          cv ? (
            <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: colors.successSoft, borderRadius: 12, padding: 14 }}>
              <View style={{ flex: 1 }}>
                <Text style={[styles.body, { fontWeight: "600" }]} numberOfLines={1}>{cvFile || t.cvLoaded}</Text>
                <Text style={styles.muted}>{fmt(t.wordsExtracted, { n: countWords(cv) })}</Text>
              </View>
              <Pressable onPress={() => { setCv(""); setCvFile("") }} hitSlop={12}>
                <Text style={{ color: colors.muted, fontWeight: "600" }}>{t.replace}</Text>
              </Pressable>
            </View>
          ) : (
            <Button variant="secondary" label={cvStatus === "reading" ? t.readingPdf : t.uploadAria} loading={cvStatus === "reading"} onPress={pickPdf} />
          )
        ) : (
          <TextInput multiline value={cv} onChangeText={setCv} placeholder={t.cvPlaceholder} placeholderTextColor={colors.muted}
            accessibilityLabel={t.cvAria} style={[styles.input, { minHeight: 160 }]} />
        )}
        {cvStatus === "error" || cvStatus === "too_large" ? (
          <Text style={[styles.muted, { color: colors.danger }]}>{cvStatus === "too_large" ? t.pdfTooLarge : t.pdfError}</Text>
        ) : cvMode === "pdf" && !cv ? <Text style={styles.muted}>{t.dropHint}</Text> : null}
      </Card>

      <Card>
        <Text style={styles.sectionTitle}>2  {t.step2}</Text>
        <View style={{ height: 12 }} />
        {sample ? (
          <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: colors.primarySoft, borderRadius: 12, padding: 14 }}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.body, { fontWeight: "600" }]}>{fmt(t.sampleJob, { role: sample })}</Text>
              <Text style={styles.muted}>{t.sampleNote}</Text>
            </View>
            <Pressable onPress={() => { setSample(""); setJob("") }} hitSlop={12}>
              <Text style={{ color: colors.muted, fontWeight: "600" }}>{t.remove}</Text>
            </Pressable>
          </View>
        ) : (
          <>
            <Segmented value={jobMode} onChange={(m) => { setJobMode(m); setError("") }}
              options={[{ value: "url", label: t.jobLink }, { value: "paste", label: t.pasteText }]} />
            {jobMode === "url" ? (
              <>
                <TextInput value={url} onChangeText={setUrl} placeholder="https://www.linkedin.com/jobs/view/…" placeholderTextColor={colors.muted}
                  autoCapitalize="none" autoCorrect={false} keyboardType="url" accessibilityLabel={t.urlAria} style={styles.input} />
                <Text style={styles.muted}>{t.urlHint}</Text>
              </>
            ) : (
              <TextInput multiline value={job} onChangeText={setJob} placeholder={t.jobPlaceholder} placeholderTextColor={colors.muted}
                accessibilityLabel={t.jobAria} style={[styles.input, { minHeight: 160 }]} />
            )}
            <Pressable onPress={() => setShowSamples((v) => !v)} style={{ minHeight: 44, justifyContent: "center", marginTop: 6 }}>
              <Text style={styles.muted}>{t.noJob} <Text style={{ color: colors.primary, fontWeight: "600" }}>{t.trySample}</Text></Text>
            </Pressable>
            {showSamples && (
              <View style={styles.row}>
                {samples.map((s) => (
                  <Pressable key={s.id} onPress={() => loadSample(s)} style={[styles.chip, { borderColor: colors.border, backgroundColor: colors.card, minHeight: 40 }]}>
                    <Text style={styles.chipText}>{s.emoji} {s.label}</Text>
                  </Pressable>
                ))}
              </View>
            )}
          </>
        )}
      </Card>

      {error ? <Text accessibilityRole="alert" style={styles.error}>{error}</Text> : null}
      <Button label={fetching ? t.fetching : busy ? t.analyzing : t.analyze} loading={fetching || busy} onPress={analyze}
        disabled={!cv.trim() || (!sample && (jobMode === "url" ? !url.trim() : !job.trim()))} />
      <Text style={[styles.muted, { textAlign: "center", marginTop: 10 }]}>{t.privateNote}</Text>
    </View>
  )
}

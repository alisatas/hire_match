// The website's two server routes. The analysis itself runs on the phone (shared engine);
// only reading a PDF and fetching a job page need the server.
const API = "https://cvxray.com/api"

export class ApiError extends Error {
  constructor(public kind: "too_large" | "unreadable" | "cant_fetch" | "network") {
    super(kind)
  }
}

/** Sends a picked PDF to /api/extract-pdf and returns its text. */
export async function extractPdf(file: { uri: string; name: string; size?: number }): Promise<string> {
  if (file.size && file.size > 5 * 1024 * 1024) throw new ApiError("too_large")
  const body = new FormData()
  // React Native's FormData accepts a { uri, name, type } file reference
  body.append("file", { uri: file.uri, name: file.name, type: "application/pdf" } as unknown as Blob)
  let res: Response
  try {
    res = await fetch(`${API}/extract-pdf`, { method: "POST", body })
  } catch {
    throw new ApiError("network")
  }
  const data = (await res.json().catch(() => ({}))) as { text?: string }
  if (res.status === 413) throw new ApiError("too_large")
  if (!res.ok || !data.text?.trim()) throw new ApiError("unreadable")
  return data.text
}

/** Fetches a job posting through /api/scrape. */
export async function fetchJob(url: string): Promise<{ text: string; company: string }> {
  let res: Response
  try {
    res = await fetch(`${API}/scrape`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    })
  } catch {
    throw new ApiError("network")
  }
  const data = (await res.json().catch(() => ({}))) as { text?: string; companyName?: string }
  if (!data.text || data.text.length <= 50) throw new ApiError("cant_fetch")
  return { text: data.text, company: data.companyName ?? "" }
}

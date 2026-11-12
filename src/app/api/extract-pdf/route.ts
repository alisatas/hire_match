import { NextResponse } from 'next/server'
import { extractText, getDocumentProxy } from 'unpdf'

export const maxDuration = 20

const MAX_FILE_BYTES = 5 * 1024 * 1024
// multipart framing adds a little on top of the file itself
const MAX_BODY_BYTES = MAX_FILE_BYTES + 64 * 1024
// A CV is a few pages. A tiny file can still declare thousands of pages and pin the CPU.
const MAX_PAGES = 30

const noStore = { 'Cache-Control': 'no-store' }
const fail = (error: string, status: number) => NextResponse.json({ error }, { status, headers: noStore })

export async function POST(req: Request) {
    // Reject oversized uploads from the header, before formData() buffers the body.
    // A missing length (chunked upload) is refused too — browsers always send one for a file.
    const declared = Number(req.headers.get('content-length'))
    if (!Number.isFinite(declared) || declared <= 0) return fail('Length required', 411)
    if (declared > MAX_BODY_BYTES) return fail('File too large (max 5MB)', 413)

    // A body that is not multipart form data is a bad request, not a server fault
    let formData: FormData
    try {
        formData = await req.formData()
    } catch {
        return fail('Invalid upload', 400)
    }

    let pdf: Awaited<ReturnType<typeof getDocumentProxy>> | null = null
    try {
        const file = formData.get('file')

        if (!(file instanceof File) || file.type !== 'application/pdf') return fail('Invalid file', 400)
        if (file.size > MAX_FILE_BYTES) return fail('File too large (max 5MB)', 413)

        const buffer = new Uint8Array(await file.arrayBuffer())

        // Magic bytes — the client-declared MIME type alone is trivially spoofed
        const magic = String.fromCharCode(...buffer.subarray(0, 5))
        if (magic !== '%PDF-') return fail('Invalid file', 400)

        // The bundled PDF.js (v6) never evaluates code from the document; fonts are not
        // loaded either, since only the text layer is needed
        pdf = await getDocumentProxy(buffer, { disableFontFace: true, useSystemFonts: false, enableXfa: false })
        if (pdf.numPages > MAX_PAGES) return fail(`PDF has too many pages (max ${MAX_PAGES})`, 422)

        const { text } = await extractText(pdf, { mergePages: true })

        if (!text || text.trim().length < 10) return fail('Could not extract text from PDF', 422)

        // Cap extracted text to prevent memory exhaustion from pathological PDFs
        return NextResponse.json({ text: text.trim().slice(0, 150_000) }, { headers: noStore })
    } catch (err: unknown) {
        // Past the checks above, a throw means PDF.js could not parse the document: a corrupt
        // or hostile file, i.e. bad input (422), not a server fault. Answering 500 here filled
        // the logs with false alarms that would hide a real incident. Message only, no stack,
        // no file content; the client gets a generic error.
        console.warn('PDF extract failed:', err instanceof Error ? err.message.slice(0, 200) : 'unknown')
        return fail('Could not read this PDF', 422)
    } finally {
        await pdf?.loadingTask.destroy().catch(() => {})
    }
}

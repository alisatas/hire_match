import { NextResponse } from 'next/server'
import { extractText } from 'unpdf'

export async function POST(req: Request) {
    try {
        const formData = await req.formData()
        const file = formData.get('file') as File | null

        if (!file || file.type !== 'application/pdf') {
            return NextResponse.json({ error: 'Invalid file' }, { status: 400 })
        }

        if (file.size > 5 * 1024 * 1024) {
            return NextResponse.json({ error: 'File too large (max 5MB)' }, { status: 400 })
        }

        const buffer = new Uint8Array(await file.arrayBuffer())

        // Validate PDF magic bytes — guards against MIME-type spoofing from the client
        const magic = String.fromCharCode(buffer[0], buffer[1], buffer[2], buffer[3], buffer[4])
        if (!magic.startsWith('%PDF-')) {
            return NextResponse.json({ error: 'Invalid file' }, { status: 400, headers: { "Cache-Control": "no-store" } })
        }

        const { text } = await extractText(buffer, { mergePages: true })

        if (!text || text.trim().length < 10) {
            return NextResponse.json({ error: 'Could not extract text from PDF' }, { status: 422, headers: { "Cache-Control": "no-store" } })
        }

        return NextResponse.json({ text: text.trim() }, { headers: { "Cache-Control": "no-store" } })

    } catch (err: unknown) {
        console.error('PDF extract error:', err instanceof Error ? err.message : err)
        return NextResponse.json({ error: 'Failed to read PDF' }, { status: 500 })
    }
}

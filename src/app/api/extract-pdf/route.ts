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
        const { text } = await extractText(buffer, { mergePages: true })

        if (!text || text.trim().length < 10) {
            return NextResponse.json({ error: 'Could not extract text from PDF' }, { status: 422 })
        }

        return NextResponse.json({ text: text.trim() })

    } catch (err: unknown) {
        console.error('PDF extract error:', err instanceof Error ? err.message : err)
        return NextResponse.json({ error: 'Failed to read PDF' }, { status: 500 })
    }
}

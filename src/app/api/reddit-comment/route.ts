import { NextRequest, NextResponse } from 'next/server'
import { timingSafeEqual } from 'crypto'

// ── Auth guard ────────────────────────────────────────────────────────────────

function isAuthorized(req: NextRequest): boolean {
    const key = process.env.AGENT_ACTIONS_KEY
    if (!key) return false
    const provided = req.headers.get('x-agent-key') ?? req.headers.get('authorization')?.replace('Bearer ', '')
    if (!provided) return false
    try {
        const a = Buffer.from(key.padEnd(provided.length, '\0').slice(0, provided.length))
        const b = Buffer.from(provided.padEnd(key.length, '\0').slice(0, key.length))
        return key.length === provided.length && timingSafeEqual(a, b)
    } catch { return false }
}

// ── Reddit OAuth helpers ──────────────────────────────────────────────────────

async function getRedditToken(clientId: string, clientSecret: string, username: string, password: string): Promise<string> {
    const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')

    const res = await fetch('https://www.reddit.com/api/v1/access_token', {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${credentials}`,
            'Content-Type': 'application/x-www-form-urlencoded',
            'User-Agent': 'cvxray-bot/1.0 by u/Few_Judge_219',
        },
        body: new URLSearchParams({
            grant_type: 'password',
            username,
            password,
        }).toString(),
    })

    if (!res.ok) {
        const err = await res.text()
        throw new Error(`Reddit auth failed: ${res.status} ${err}`)
    }

    const data = await res.json()
    if (!data.access_token) throw new Error('No access_token in Reddit response')
    return data.access_token
}

// ── Route handler ─────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
    if (!isAuthorized(req)) {
        return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
    }

    const clientId = process.env.REDDIT_CLIENT_ID
    const clientSecret = process.env.REDDIT_CLIENT_SECRET
    const username = process.env.REDDIT_USERNAME
    const password = process.env.REDDIT_PASSWORD

    if (!clientId || !clientSecret || !username || !password) {
        return NextResponse.json({ error: 'Reddit credentials not configured' }, { status: 500 })
    }

    let postId: string, text: string
    try {
        const body = await req.json()
        // postId: the Reddit post ID from the URL, e.g. "abc123" from reddit.com/r/sub/comments/abc123/...
        // text: the comment in Markdown
        postId = body.postId
        text = body.text
    } catch {
        return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
    }

    if (!postId || typeof postId !== 'string') {
        return NextResponse.json({ error: 'postId is required (the ID from the Reddit thread URL)' }, { status: 400 })
    }

    if (!text || typeof text !== 'string' || text.trim().length === 0) {
        return NextResponse.json({ error: 'text is required' }, { status: 400 })
    }

    if (text.length > 10000) {
        return NextResponse.json({ error: 'Comment too long (max 10000 chars)' }, { status: 400 })
    }

    // Reddit thing_id for a post is t3_{postId}
    const thingId = postId.startsWith('t') ? postId : `t3_${postId}`

    let accessToken: string
    try {
        accessToken = await getRedditToken(clientId, clientSecret, username, password)
    } catch (err) {
        console.error('Reddit auth error:', err instanceof Error ? err.message : err)
        return NextResponse.json({ error: 'Reddit authentication failed' }, { status: 502 })
    }

    const res = await fetch('https://oauth.reddit.com/api/comment', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/x-www-form-urlencoded',
            'User-Agent': 'cvxray-bot/1.0 by u/Few_Judge_219',
        },
        body: new URLSearchParams({
            api_type: 'json',
            thing_id: thingId,
            text: text.trim(),
        }).toString(),
    })

    if (!res.ok) {
        const err = await res.text()
        console.error('Reddit comment error:', res.status, err)
        return NextResponse.json({ error: 'Reddit API error', status: res.status }, { status: 502 })
    }

    const data = await res.json()
    const errors = data?.json?.errors
    if (errors?.length) {
        return NextResponse.json({ error: errors[0]?.[1] ?? 'Reddit rejected the comment' }, { status: 422 })
    }

    const commentId = data?.json?.data?.things?.[0]?.data?.id
    return NextResponse.json({ ok: true, commentId, thingId })
}

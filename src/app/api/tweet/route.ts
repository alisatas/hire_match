import { NextRequest, NextResponse } from 'next/server'
import { createHmac, timingSafeEqual, randomBytes } from 'crypto'

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

// ── OAuth 1.0a helpers ────────────────────────────────────────────────────────

function pct(s: string): string {
    return encodeURIComponent(s).replace(/[!'()*]/g, c => '%' + c.charCodeAt(0).toString(16).toUpperCase())
}

function oauthHeader(method: string, url: string, consumerKey: string, consumerSecret: string, token: string, tokenSecret: string): string {
    const nonce = randomBytes(16).toString('hex')
    const timestamp = Math.floor(Date.now() / 1000).toString()

    const params: Record<string, string> = {
        oauth_consumer_key: consumerKey,
        oauth_nonce: nonce,
        oauth_signature_method: 'HMAC-SHA1',
        oauth_timestamp: timestamp,
        oauth_token: token,
        oauth_version: '1.0',
    }

    // Signature base string
    const sorted = Object.entries(params)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([k, v]) => `${pct(k)}=${pct(v)}`)
        .join('&')

    const base = [method.toUpperCase(), pct(url), pct(sorted)].join('&')
    const signingKey = `${pct(consumerSecret)}&${pct(tokenSecret)}`
    const signature = createHmac('sha1', signingKey).update(base).digest('base64')

    params['oauth_signature'] = signature

    const headerValue = 'OAuth ' + Object.entries(params)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([k, v]) => `${pct(k)}="${pct(v)}"`)
        .join(', ')

    return headerValue
}

// ── Route handler ─────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
    if (!isAuthorized(req)) {
        return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
    }

    const consumerKey = process.env.TWITTER_API_KEY
    const consumerSecret = process.env.TWITTER_API_KEY_SECRET
    const token = process.env.TWITTER_ACCESS_TOKEN
    const tokenSecret = process.env.TWITTER_ACCESS_TOKEN_SECRET

    if (!consumerKey || !consumerSecret || !token || !tokenSecret) {
        return NextResponse.json({ error: 'Twitter credentials not configured' }, { status: 500 })
    }

    let text: string
    try {
        const body = await req.json()
        text = body.text
    } catch {
        return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
    }

    if (!text || typeof text !== 'string' || text.trim().length === 0) {
        return NextResponse.json({ error: 'text is required' }, { status: 400 })
    }

    if (text.length > 280) {
        return NextResponse.json({ error: `Tweet too long: ${text.length} chars (max 280)` }, { status: 400 })
    }

    const tweetUrl = 'https://api.twitter.com/2/tweets'
    const authHeader = oauthHeader('POST', tweetUrl, consumerKey, consumerSecret, token, tokenSecret)

    const res = await fetch(tweetUrl, {
        method: 'POST',
        headers: {
            'Authorization': authHeader,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: text.trim() }),
    })

    if (!res.ok) {
        const err = await res.text()
        console.error('Twitter API error:', res.status, err)
        return NextResponse.json({ error: 'Twitter API error', status: res.status }, { status: 502 })
    }

    const data = await res.json()
    return NextResponse.json({ ok: true, tweetId: data?.data?.id })
}

import { NextRequest, NextResponse } from "next/server"
import { after } from "next/server"
import { timingSafeEqual } from "crypto"
import { analyze } from "@/lib/analyze"

// ─── Telegram helpers ───────────────────────────────────────────────────────

const TG = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}`

type InlineKeyboard = { text: string; callback_data: string }[][]

async function sendMessage(chatId: number, text: string, keyboard?: InlineKeyboard) {
    const body: Record<string, unknown> = {
        chat_id: chatId,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
    }
    if (keyboard) {
        body.reply_markup = { inline_keyboard: keyboard }
    }
    await fetch(`${TG}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    })
}

async function editMessage(chatId: number, messageId: number, text: string) {
    await fetch(`${TG}/editMessageText`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, message_id: messageId, text, parse_mode: "HTML", disable_web_page_preview: true }),
    })
}

async function answerCallback(callbackQueryId: string, text: string) {
    await fetch(`${TG}/answerCallbackQuery`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ callback_query_id: callbackQueryId, text }),
    })
}


// ─── Vercel API helpers ─────────────────────────────────────────────────────

const VERCEL_PROJECT_ID = "prj_0aH2Iq8ts4nCHW5sqKeuHChxzzQD"
const VERCEL_TEAM_ID = "team_emjtN6XVy67qSLL6vVRUFNGv"

async function getDeployments() {
    const token = process.env.VERCEL_TOKEN
    if (!token) return null

    const res = await fetch(
        `https://api.vercel.com/v6/deployments?projectId=${VERCEL_PROJECT_ID}&teamId=${VERCEL_TEAM_ID}&limit=5&withAlias=1`,
        { headers: { Authorization: `Bearer ${token}` } }
    )
    if (!res.ok) return null
    const data = await res.json()
    return data.deployments as Array<{
        uid: string
        url: string
        alias?: string[]
        state: string
        target: string | null
        created: number
        meta?: { githubCommitMessage?: string }
    }>
}

async function triggerDeploy(hookUrl: string) {
    const res = await fetch(hookUrl, { method: "POST" })
    if (!res.ok) return null
    const data = await res.json()
    return data?.job?.id as string | undefined
}

// ─── Format helpers ─────────────────────────────────────────────────────────

function stateIcon(state: string) {
    if (state === "READY") return "✅"
    if (state === "ERROR") return "❌"
    if (state === "BUILDING") return "🔨"
    if (state === "QUEUED") return "⏳"
    if (state === "CANCELED") return "🚫"
    return "❓"
}

function formatDeployments(deployments: Awaited<ReturnType<typeof getDeployments>>) {
    if (!deployments?.length) return "No deployments found."
    return deployments.map((d, i) => {
        const env = d.target === "production" ? "🟢 prod" : "🔵 preview"
        const date = new Date(d.created).toLocaleString("en-GB", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })
        const displayUrl = d.target === "production" ? "cvxray.com" : d.url
        return `${i + 1}. ${stateIcon(d.state)} ${env} — ${date}\n   🔗 https://${displayUrl}`
    }).join("\n\n")
}

// ─── Help text ──────────────────────────────────────────────────────────────

const HELP = `<b>CVXray Bot — Project Control</b>

<b>Deploy</b>
/deploy — trigger a new preview deploy
/deploy prod — deploy to production
/status — last 5 deployments with links

<b>CV Analysis</b>
Send any message in the format:
<code>CV:
[your cv text]

JOB:
[job description]</code>

/help — show this message`

// ─── Command handlers ────────────────────────────────────────────────────────

async function handleCommand(chatId: number, text: string) {
    const lower = text.trim().toLowerCase()

    // /start or /help
    if (lower === "/start" || lower === "/help") {
        await sendMessage(chatId, HELP)
        return
    }

    // /status
    if (lower === "/status") {
        const token = process.env.VERCEL_TOKEN
        if (!token) {
            await sendMessage(chatId, "❌ VERCEL_TOKEN is not set. Add it to your env vars to use /status.")
            return
        }
        const deployments = await getDeployments()
        const msg = deployments
            ? `🌐 <b>Production:</b> https://cvxray.com\n\n<b>Recent Deployments</b>\n\n${formatDeployments(deployments)}`
            : "Failed to fetch deployments. Check VERCEL_TOKEN."
        await sendMessage(chatId, msg)
        return
    }

    // /deploy prod
    if (lower === "/deploy prod" || lower === "/deploy production") {
        await sendMessage(
            chatId,
            "⚠️ <b>Deploy to production?</b>\nThis will affect real users.",
            [[
                { text: "✅ Confirm", callback_data: "deploy_prod_confirm" },
                { text: "❌ Cancel", callback_data: "deploy_prod_cancel" },
            ]]
        )
        return
    }

    // /deploy (preview)
    if (lower === "/deploy") {
        const hookUrl = process.env.VERCEL_DEPLOY_HOOK_URL
        if (!hookUrl) {
            await sendMessage(chatId, "❌ VERCEL_DEPLOY_HOOK_URL is not set.\n\nCreate a deploy hook in Vercel Dashboard → Project Settings → Git → Deploy Hooks, then add it to your env vars.")
            return
        }
        await sendMessage(chatId, "🔨 Triggering preview deploy...")
        after(async () => {
            const jobId = await triggerDeploy(hookUrl)
            if (!jobId) {
                await sendMessage(chatId, "❌ Deploy trigger failed. Check your VERCEL_DEPLOY_HOOK_URL.")
                return
            }
            // Wait a moment then fetch latest deployment URL
            await new Promise(r => setTimeout(r, 8000))
            const deployments = await getDeployments()
            const latest = deployments?.[0]
            if (latest) {
                await sendMessage(chatId, `✅ <b>Preview deploy triggered!</b>\n\n🔗 https://${latest.url}\n📊 Status: ${latest.state}`)
            } else {
                await sendMessage(chatId, `✅ Deploy triggered. Check Vercel dashboard for the URL.`)
            }
        })
        return
    }

    // unknown command
    await sendMessage(chatId, `Unknown command. Send /help to see what I can do.`)
}

async function handleCallbackQuery(callbackQuery: {
    id: string
    message: { chat: { id: number }; message_id: number }
    data: string
}) {
    const chatId = callbackQuery.message.chat.id
    const data = callbackQuery.data

    if (data === "deploy_prod_cancel") {
        await answerCallback(callbackQuery.id, "Cancelled")
        await editMessage(chatId, callbackQuery.message.message_id, "🚫 Production deploy cancelled.")
        return
    }

    if (data === "deploy_prod_confirm") {
        await answerCallback(callbackQuery.id, "Deploying to production...")
        await editMessage(chatId, callbackQuery.message.message_id, "🔨 Deploying to production...")

        const hookUrl = process.env.VERCEL_DEPLOY_HOOK_PROD_URL || process.env.VERCEL_DEPLOY_HOOK_URL
        if (!hookUrl) {
            await sendMessage(chatId, "❌ VERCEL_DEPLOY_HOOK_PROD_URL is not set.")
            return
        }

        after(async () => {
            const jobId = await triggerDeploy(hookUrl)
            if (!jobId) {
                await sendMessage(chatId, "❌ Production deploy trigger failed.")
                return
            }
            await new Promise(r => setTimeout(r, 8000))
            const deployments = await getDeployments()
            const latest = deployments?.find(d => d.target === "production") ?? deployments?.[0]
            if (latest) {
                await sendMessage(chatId, `🚀 <b>Production deploy triggered!</b>\n\n🔗 https://${latest.url}\n📊 Status: ${latest.state}`)
            } else {
                await sendMessage(chatId, `🚀 Production deploy triggered. Check Vercel dashboard for status.`)
            }
        })
        return
    }
}

// ─── CV analysis ─────────────────────────────────────────────────────────────

function parseCvAndJob(text: string): { cvText: string; jobText: string } | null {
    const lower = text.toLowerCase()
    const cvIdx = lower.indexOf("cv:")
    const jobIdx = lower.indexOf("job:")
    if (cvIdx === -1 || jobIdx === -1) return null

    let cvText: string, jobText: string
    if (cvIdx < jobIdx) {
        cvText = text.slice(cvIdx + 3, jobIdx).trim()
        jobText = text.slice(jobIdx + 4).trim()
    } else {
        jobText = text.slice(jobIdx + 4, cvIdx).trim()
        cvText = text.slice(cvIdx + 3).trim()
    }
    if (cvText.length < 50 || jobText.length < 50) return null
    return { cvText, jobText }
}

function scoreEmoji(score: number) {
    if (score >= 78) return "🟢"
    if (score >= 58) return "🟡"
    if (score >= 38) return "🟠"
    return "🔴"
}

function formatAnalysis(result: ReturnType<typeof analyze>): string {
    const { score, persona, matched, missing, rawMatched, rawTotal, yearsRequired, yearsOnCV, topJobSignals, lowQuality, summary } = result
    const lines: string[] = []

    lines.push(`${scoreEmoji(score)} <b>Match Score: ${score}%</b> — ${persona.label}`)
    lines.push(`<i>${persona.desc.trim()}</i>`)

    if (lowQuality) {
        lines.push(`\n⚠️ <i>${summary}</i>`)
    }

    if (matched.length > 0) {
        lines.push(`\n✅ <b>Matched (${matched.length}):</b> ${matched.join(", ")}`)
    }

    const highMissing = missing.filter(m => m.priority === "high")
    const medMissing = missing.filter(m => m.priority === "medium")
    if (highMissing.length > 0) lines.push(`🔴 <b>High-priority gaps:</b> ${highMissing.map(m => m.label).join(", ")}`)
    if (medMissing.length > 0) lines.push(`🟡 <b>Medium gaps:</b> ${medMissing.map(m => m.label).join(", ")}`)

    lines.push(`\n📊 <b>Keywords:</b> ${rawMatched}/${rawTotal} matched`)
    if (yearsRequired > 0) {
        const icon = yearsOnCV >= yearsRequired ? "✅" : "⚠️"
        lines.push(`${icon} <b>Experience:</b> ${yearsOnCV}y on CV vs ${yearsRequired}y required`)
    }
    if (topJobSignals.length > 0) {
        lines.push(`\n💡 <b>ATS keywords not on CV:</b> ${topJobSignals.map(s => `${s.word} (×${s.freq})`).join(", ")}`)
    }

    return lines.join("\n")
}

// ─── Main handler ─────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
    if (!process.env.TELEGRAM_BOT_TOKEN) {
        return NextResponse.json({ error: "misconfigured" }, { status: 500 })
    }

    // Verify request is from Telegram using secret token — REQUIRED
    const secret = process.env.TELEGRAM_SECRET_TOKEN
    if (!secret) {
        console.error("TELEGRAM_SECRET_TOKEN is not set — webhook is unprotected")
        return NextResponse.json({ error: "misconfigured" }, { status: 500 })
    }
    const incoming = req.headers.get("x-telegram-bot-api-secret-token") ?? ""
    // Constant-time comparison to prevent timing attacks on the webhook secret
    const secretBuf = Buffer.from(secret)
    const incomingBuf = Buffer.from(incoming.padEnd(secret.length, "\0").slice(0, secret.length))
    const valid = secretBuf.length === incoming.length && timingSafeEqual(secretBuf, incomingBuf)
    if (!valid) {
        return NextResponse.json({ error: "unauthorized" }, { status: 401 })
    }

    let update: {
        message?: { chat: { id: number }; text?: string }
        callback_query?: { id: string; message: { chat: { id: number }; message_id: number }; data: string }
    }

    try {
        update = await req.json()
    } catch {
        return NextResponse.json({ ok: false }, { status: 400 })
    }

    // Handle inline button presses
    if (update.callback_query) {
        after(handleCallbackQuery(update.callback_query))
        return NextResponse.json({ ok: true })
    }

    const message = update.message
    if (!message?.text) return NextResponse.json({ ok: true })

    const chatId = message.chat.id
    const text = message.text.trim()

    // Commands
    if (text.startsWith("/")) {
        after(handleCommand(chatId, text))
        return NextResponse.json({ ok: true })
    }

    // CV analysis
    const parsed = parseCvAndJob(text)
    if (parsed) {
        const result = analyze(parsed.cvText, parsed.jobText)
        after(sendMessage(chatId, formatAnalysis(result)))
    } else {
        after(sendMessage(chatId, `Send /help to see what I can do.\n\nFor CV analysis, format your message as:\n<code>CV:\n[cv text]\n\nJOB:\n[job description]</code>`))
    }

    return NextResponse.json({ ok: true })
}

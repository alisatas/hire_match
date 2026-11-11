// ─────────────────────────────────────────────
// Shareable score card (1200×630 PNG), drawn client-side on a canvas.
// Contains only the score, the result label, the role and up to five matched skill
// names — never any CV or job-description text — so sharing it leaks nothing private.
// ─────────────────────────────────────────────

export interface ScoreCardData {
    score: number
    label: string
    role: string
    matched: string[]
}

const W = 1200
const H = 630

function bandColor(score: number): string {
    if (score >= 70) return "#34d399"
    if (score >= 45) return "#fbbf24"
    return "#f87171"
}

function drawMark(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
    const s = size / 32
    const g = ctx.createLinearGradient(x, y, x + size, y + size)
    g.addColorStop(0, "#3b6cf6")
    g.addColorStop(1, "#1b3a9e")
    ctx.fillStyle = g
    ctx.beginPath()
    ctx.roundRect(x, y, size, size, 8 * s)
    ctx.fill()
    ctx.strokeStyle = "#fff"
    ctx.lineWidth = 1.5 * s
    ctx.lineJoin = "round"
    ctx.lineCap = "round"
    ctx.beginPath() // page
    ctx.moveTo(x + 11.5 * s, y + 7 * s)
    ctx.lineTo(x + 17.7 * s, y + 7 * s)
    ctx.lineTo(x + 22 * s, y + 11.3 * s)
    ctx.lineTo(x + 22 * s, y + 25 * s)
    ctx.lineTo(x + 10 * s, y + 25 * s)
    ctx.lineTo(x + 10 * s, y + 7 * s)
    ctx.closePath()
    ctx.stroke()
    ctx.lineWidth = 1.9 * s // scan beam
    ctx.beginPath()
    ctx.moveTo(x + 6.5 * s, y + 16.5 * s)
    ctx.lineTo(x + 25.5 * s, y + 16.5 * s)
    ctx.stroke()
}

export async function renderScoreCard(data: ScoreCardData, fontFamily: string): Promise<Blob> {
    const canvas = document.createElement("canvas")
    canvas.width = W
    canvas.height = H
    const ctx = canvas.getContext("2d")
    if (!ctx) throw new Error("Canvas not supported")
    const font = (weight: number, size: number) => `${weight} ${size}px ${fontFamily}`

    const bg = ctx.createLinearGradient(0, 0, W, H)
    bg.addColorStop(0, "#0a1022")
    bg.addColorStop(0.55, "#101b3d")
    bg.addColorStop(1, "#0a1228")
    ctx.fillStyle = bg
    ctx.fillRect(0, 0, W, H)

    drawMark(ctx, 80, 64, 56)
    ctx.textBaseline = "middle"
    ctx.font = font(700, 32)
    ctx.fillStyle = "#fff"
    ctx.fillText("CV", 152, 93)
    ctx.fillStyle = "#7ea2ff"
    ctx.fillText("Xray", 152 + ctx.measureText("CV").width, 93)

    // Score ring
    const cx = 260, cy = 350, r = 120
    ctx.lineWidth = 22
    ctx.strokeStyle = "rgba(255,255,255,0.1)"
    ctx.beginPath()
    ctx.arc(cx, cy, r, 0, Math.PI * 2)
    ctx.stroke()
    ctx.strokeStyle = bandColor(data.score)
    ctx.lineCap = "round"
    ctx.beginPath()
    ctx.arc(cx, cy, r, -Math.PI / 2, -Math.PI / 2 + (Math.PI * 2 * data.score) / 100)
    ctx.stroke()
    ctx.textAlign = "center"
    ctx.fillStyle = "#fff"
    ctx.font = font(800, 88)
    ctx.fillText(`${data.score}%`, cx, cy + 4)
    ctx.textAlign = "left"

    // Text block
    const tx = 460
    ctx.fillStyle = "#a9c0ff"
    ctx.font = font(600, 24)
    ctx.fillText("CV MATCH SCORE", tx, 230)
    ctx.fillStyle = "#fff"
    ctx.font = font(800, 54)
    ctx.fillText(data.label, tx, 295)
    ctx.fillStyle = "rgba(255,255,255,0.75)"
    ctx.font = font(500, 28)
    ctx.fillText(data.role, tx, 350)

    // Matched skill chips
    let x = tx
    let y = 410
    ctx.font = font(500, 22)
    for (const skill of data.matched.slice(0, 5)) {
        const text = skill.length > 26 ? skill.slice(0, 25) + "…" : skill
        const w = ctx.measureText(text).width + 36
        if (x + w > W - 80) { x = tx; y += 58 }
        if (y > 500) break
        ctx.fillStyle = "rgba(52,211,153,0.14)"
        ctx.strokeStyle = "rgba(52,211,153,0.45)"
        ctx.lineWidth = 1.5
        ctx.beginPath()
        ctx.roundRect(x, y - 22, w, 44, 10)
        ctx.fill()
        ctx.stroke()
        ctx.fillStyle = "#d1fae5"
        ctx.fillText(text, x + 18, y + 1)
        x += w + 12
    }

    ctx.fillStyle = "rgba(255,255,255,0.5)"
    ctx.font = font(500, 22)
    ctx.fillText("Check your own CV free at cvxray.com", 80, H - 56)

    return new Promise((resolve, reject) =>
        canvas.toBlob(b => (b ? resolve(b) : reject(new Error("Could not create image"))), "image/png"),
    )
}

/**
 * Phones and tablets get the native share sheet (straight into LinkedIn, WhatsApp…);
 * desktops download the PNG, which is what people expect there — desktop Chrome on
 * macOS also supports file sharing, but a system share dialog is a surprise on a laptop.
 */
export async function shareOrDownloadCard(blob: Blob): Promise<"shared" | "downloaded" | "cancelled"> {
    const file = new File([blob], "cvxray-score.png", { type: "image/png" })
    const touch = typeof window !== "undefined" && window.matchMedia?.("(pointer: coarse)").matches
    if (touch && navigator.canShare?.({ files: [file] })) {
        try {
            await navigator.share({ files: [file], title: "My CV match score", text: "Checked my CV with CVXray — cvxray.com" })
            return "shared"
        } catch (err) {
            if (err instanceof DOMException && err.name === "AbortError") return "cancelled"
            // fall through to download
        }
    }
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "cvxray-score.png"
    document.body.appendChild(a)
    a.click()
    a.remove()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
    return "downloaded"
}

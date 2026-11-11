import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "CVXray — free CV and resume matcher"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OGImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "1200px",
                    height: "630px",
                    background: "linear-gradient(135deg, #0a1022 0%, #101b3d 45%, #0a1228 100%)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "sans-serif",
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                {/* Glow orb top-right */}
                <div
                    style={{
                        position: "absolute",
                        top: "-80px",
                        right: "-80px",
                        width: "400px",
                        height: "400px",
                        borderRadius: "50%",
                        background: "radial-gradient(circle, rgba(59,108,246,0.15) 0%, transparent 70%)",
                    }}
                />
                {/* Glow orb bottom-left */}
                <div
                    style={{
                        position: "absolute",
                        bottom: "-80px",
                        left: "-80px",
                        width: "350px",
                        height: "350px",
                        borderRadius: "50%",
                        background: "radial-gradient(circle, rgba(59,108,246,0.12) 0%, transparent 70%)",
                    }}
                />

                {/* Brand mark — same artwork as src/app/icon.svg */}
                <svg width="104" height="104" viewBox="0 0 32 32" style={{ marginBottom: "28px" }}>
                    <defs>
                        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0" stopColor="#3b6cf6" />
                            <stop offset="1" stopColor="#1b3a9e" />
                        </linearGradient>
                    </defs>
                    <rect width="32" height="32" rx="8" fill="url(#g)" />
                    <path d="M11.5 7h6.2L22 11.3V23.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 10 23.5v-15A1.5 1.5 0 0 1 11.5 7Z" fill="rgba(255,255,255,0.14)" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round" />
                    <path d="M17.5 7.2v4.3h4.3" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M13 21h6" stroke="rgba(255,255,255,0.65)" strokeWidth="1.4" strokeLinecap="round" />
                    <path d="M6.5 16.5h19" stroke="#fff" strokeWidth="1.9" strokeLinecap="round" />
                </svg>

                {/* Brand name */}
                <div
                    style={{
                        fontSize: "80px",
                        fontWeight: 900,
                        color: "white",
                        letterSpacing: "-3px",
                        marginBottom: "16px",
                        display: "flex",
                        alignItems: "center",
                        gap: "0px",
                    }}
                >
                    <span style={{ color: "white" }}>CV</span>
                    <span
                        style={{
                            background: "linear-gradient(90deg, #7ea2ff, #4f7dfa)",
                            backgroundClip: "text",
                            color: "transparent",
                        }}
                    >
                        Xray
                    </span>
                </div>

                {/* Tagline */}
                <div
                    style={{
                        fontSize: "28px",
                        color: "rgba(255,255,255,0.75)",
                        fontWeight: 600,
                        textAlign: "center",
                        maxWidth: "760px",
                        lineHeight: 1.4,
                        marginBottom: "40px",
                    }}
                >
                    Instant CV match score, skill gaps & courses — free, no sign-up
                </div>

                {/* Pills row */}
                <div style={{ display: "flex", gap: "16px" }}>
                    {["40+ skill categories", "Missing keyword check", "Free, no sign-up"].map((text) => (
                        <div
                            key={text}
                            style={{
                                padding: "10px 22px",
                                borderRadius: "100px",
                                border: "1px solid rgba(59,108,246,0.35)",
                                background: "rgba(59,108,246,0.08)",
                                color: "#a9c0ff",
                                fontSize: "18px",
                                fontWeight: 600,
                            }}
                        >
                            {text}
                        </div>
                    ))}
                </div>

                {/* URL badge bottom */}
                <div
                    style={{
                        position: "absolute",
                        bottom: "36px",
                        color: "rgba(255,255,255,0.3)",
                        fontSize: "20px",
                        fontWeight: 500,
                        letterSpacing: "1px",
                    }}
                >
                    cvxray.com
                </div>
            </div>
        ),
        { ...size }
    )
}

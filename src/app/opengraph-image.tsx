import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "CVXray — Free AI Resume Matcher & Job Fit Analyzer"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OGImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "1200px",
                    height: "630px",
                    background: "linear-gradient(135deg, #0a1628 0%, #0d2137 40%, #0a1a2e 100%)",
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
                        background: "radial-gradient(circle, rgba(6,182,212,0.15) 0%, transparent 70%)",
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
                        background: "radial-gradient(circle, rgba(20,184,166,0.12) 0%, transparent 70%)",
                    }}
                />

                {/* Score badge */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100px",
                        height: "100px",
                        borderRadius: "50%",
                        border: "3px solid rgba(6,182,212,0.6)",
                        background: "rgba(6,182,212,0.1)",
                        marginBottom: "28px",
                    }}
                >
                    <span style={{ fontSize: "44px" }}>📄</span>
                </div>

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
                            background: "linear-gradient(90deg, #22d3ee, #2dd4bf)",
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
                    {["✓ 40+ Skill Categories", "✓ Missing Keyword Check", "✓ Free Forever"].map((text) => (
                        <div
                            key={text}
                            style={{
                                padding: "10px 22px",
                                borderRadius: "100px",
                                border: "1px solid rgba(6,182,212,0.35)",
                                background: "rgba(6,182,212,0.08)",
                                color: "#22d3ee",
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

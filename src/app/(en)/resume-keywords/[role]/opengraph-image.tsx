import { ImageResponse } from "next/og";
import { BrandMarkSvg } from "@/lib/brand-mark";
import { ROLES, getRole } from "@/lib/roles";

// Per-guide share image: role name + its top keywords, so a shared link previews
// what the page is about instead of the generic site card.
export const alt = "Resume keywords guide — CVXray";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return ROLES.map((role) => ({ role: role.slug }));
}

export default async function Image({ params }: { params: Promise<{ role: string }> }) {
  const role = getRole((await params).role);
  const name = role?.name ?? "Resume";
  const keywords = role ? role.groups.flatMap((g) => g.keywords).slice(0, 8) : [];

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(135deg, #0a1022 0%, #101b3d 55%, #0a1228 100%)",
          fontFamily: "sans-serif",
          color: "white",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <BrandMarkSvg size={64} />
          <div style={{ display: "flex", fontSize: "34px", fontWeight: 700, letterSpacing: "-1px" }}>
            <span>CV</span>
            <span style={{ color: "#7ea2ff" }}>Xray</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: "26px", color: "#a9c0ff", fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase" }}>
            Resume keywords
          </div>
          <div style={{ marginTop: "12px", fontSize: "72px", fontWeight: 800, letterSpacing: "-2.5px", lineHeight: 1.05 }}>
            {name}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginTop: "32px", maxWidth: "1000px" }}>
            {keywords.map((kw) => (
              <div
                key={kw}
                style={{
                  padding: "8px 18px",
                  borderRadius: "10px",
                  border: "1px solid rgba(126,162,255,0.35)",
                  background: "rgba(59,108,246,0.12)",
                  color: "#dbe5ff",
                  fontSize: "22px",
                }}
              >
                {kw}
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", fontSize: "22px", color: "rgba(255,255,255,0.55)" }}>
          Free guide + CV check at cvxray.com
        </div>
      </div>
    ),
    size,
  );
}

import { ImageResponse } from "next/og";
import { BrandMarkSvg } from "@/lib/brand-mark";
import { POSTS, getPost } from "@/lib/posts";

// Per-article share card: the headline itself, so a shared guide previews as an article.
export const alt = "CVXray guide";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug);
  const title = post?.title ?? "CV and job search guides";
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px", height: "630px", display: "flex", flexDirection: "column", justifyContent: "space-between",
          padding: "72px 80px", background: "linear-gradient(135deg, #0a1022 0%, #101b3d 55%, #0a1228 100%)",
          fontFamily: "sans-serif", color: "white",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <BrandMarkSvg size={64} />
          <div style={{ display: "flex", fontSize: "34px", fontWeight: 700, letterSpacing: "-1px" }}>
            <span>CV</span><span style={{ color: "#7ea2ff" }}>Xray</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: "26px", color: "#a9c0ff", fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase" }}>
            {post ? `Guide · ${post.minutes} min read` : "Guide"}
          </div>
          <div style={{ marginTop: "16px", fontSize: title.length > 60 ? "56px" : "64px", fontWeight: 800, letterSpacing: "-2px", lineHeight: 1.1, maxWidth: "1040px" }}>
            {title}
          </div>
        </div>
        <div style={{ display: "flex", fontSize: "22px", color: "rgba(255,255,255,0.55)" }}>cvxray.com/blog</div>
      </div>
    ),
    size,
  );
}

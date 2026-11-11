import { POSTS } from "@/lib/posts"
import { SITE_URL } from "@/lib/site"

// RSS 2.0 feed of the guides — picked up by feed readers, aggregators and AI crawlers
// that discover content through feeds. Static: regenerated on each deploy.
export const dynamic = "force-static"

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")

export function GET() {
    const items = [...POSTS]
        .sort((a, b) => b.published.localeCompare(a.published))
        .map((p) => {
            const url = `${SITE_URL}/blog/${p.slug}`
            return [
                "    <item>",
                `      <title>${esc(p.title)}</title>`,
                `      <link>${url}</link>`,
                `      <guid isPermaLink="true">${url}</guid>`,
                `      <pubDate>${new Date(p.published).toUTCString()}</pubDate>`,
                `      <description>${esc(p.description)}</description>`,
                "    </item>",
            ].join("\n")
        })
        .join("\n")

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>CVXray guides</title>
    <link>${SITE_URL}/blog</link>
    <description>How CVs are screened, and what to change so the right recruiter finds yours.</description>
    <language>en</language>
    <atom:link href="${SITE_URL}/blog/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`
    return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } })
}

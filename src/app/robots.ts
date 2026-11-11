import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// AI crawlers are welcomed explicitly: training bots, and the search/fetch bots that
// decide whether CVXray can be cited in ChatGPT, Claude, Perplexity and Gemini answers.
const AI_CRAWLERS = [
  "GPTBot", "OAI-SearchBot", "ChatGPT-User",
  "ClaudeBot", "Claude-SearchBot", "Claude-User", "anthropic-ai",
  "PerplexityBot", "Perplexity-User",
  "Google-Extended", "Applebot-Extended",
  "Amazonbot", "Meta-ExternalAgent", "DuckAssistBot", "MistralAI-User", "cohere-ai",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: "/api/" },
      // A crawler obeys only its most specific group, so the /api/ block is repeated here —
      // otherwise the named bots would be free to hit the API routes.
      { userAgent: AI_CRAWLERS, allow: "/", disallow: "/api/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}

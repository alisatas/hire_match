import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

// Hosts the Google tags (GTM → GA4 / Google Ads) are allowed to send data to.
// Keeping connect-src to this list means injected script — if any ever got in —
// could not quietly post page data to an arbitrary server.
const GOOGLE_TAG_HOSTS = [
  "https://*.googletagmanager.com",
  "https://*.google-analytics.com",
  "https://*.analytics.google.com",
  "https://*.g.doubleclick.net",
  "https://googleads.g.doubleclick.net",
  "https://www.googleadservices.com",
  "https://www.google.com",
].join(" ");

const nextConfig: NextConfig = {
  devIndicators: false,
  productionBrowserSourceMaps: false,
  poweredByHeader: false,
  // One canonical host: www.cvxray.com answered 200 with a duplicate copy of every page.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.cvxray.com" }],
        destination: "https://cvxray.com/:path*",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), serial=(), hid=(), bluetooth=(), browsing-topics=()",
          },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          { key: "Reporting-Endpoints", value: 'csp-endpoint="/api/csp-report"' },
          { key: "X-Permitted-Cross-Domain-Policies", value: "none" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              // Google Tag Manager + the Google Analytics / Ads tags it loads
              // 'unsafe-inline' is still needed for the GTM bootstrap and JSON-LD blocks;
              // moving to per-request nonces would remove it (tracked in agent-logs/security.md)
              `script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://*.googletagmanager.com https://www.googleadservices.com https://googleads.g.doubleclick.net https://www.google.com${isDev ? " 'unsafe-eval'" : ""}`,
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: https:",
              `connect-src 'self' ${GOOGLE_TAG_HOSTS}`,
              "frame-src https://www.googletagmanager.com https://td.doubleclick.net",
              "frame-ancestors 'none'",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "worker-src 'self' blob:",
              "manifest-src 'self'",
              // Violations are reported to our own endpoint (logged, never stored), so a
              // blocked analytics host or an injection attempt shows up in the logs
              "report-uri /api/csp-report",
              "report-to csp-endpoint",
              // Only where the site is actually served over https (Vercel). A production
              // build served on http://localhost — CI browser tests — would break with it.
              ...(process.env.VERCEL === "1" ? ["upgrade-insecure-requests"] : []),
            ].join("; "),
          },
        ],
      },
      {
        source: "/api/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
          { key: "Cache-Control", value: "no-store" },
          // API responses are never meant to be embedded by other origins
          { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;

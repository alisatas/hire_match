import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  productionBrowserSourceMaps: false,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              // Google Tag Manager + the Google Analytics / Ads tags it loads
              `script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://*.googletagmanager.com https://www.googleadservices.com https://googleads.g.doubleclick.net https://www.google.com${process.env.NODE_ENV === "development" ? " 'unsafe-eval'" : ""}`,
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: https:",
              "connect-src 'self' https:",
              "frame-src https://www.googletagmanager.com https://td.doubleclick.net",
              "frame-ancestors 'none'",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;

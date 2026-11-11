import { ImageResponse } from "next/og";
import { BrandMarkSvg } from "@/lib/brand-mark";

// Square raster logo for the Organization structured data and the web manifest.
// Google requires a crawlable raster logo (≥ 112 px, square works best); the
// 1200×630 share image previously used there was the wrong shape.
export const dynamic = "force-static";

export function GET() {
  return new ImageResponse(<BrandMarkSvg size={512} />, { width: 512, height: 512 });
}

import { ImageResponse } from "next/og";
import { BrandMarkSvg } from "@/lib/brand-mark";

// iOS home-screen icon. iOS applies its own rounded mask, so the tile is drawn square.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(<BrandMarkSvg size={180} rounded={false} />, size);
}

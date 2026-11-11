// Brand mark for generated images (ImageResponse). Same artwork as src/app/icon.svg
// and LogoMark in site-chrome.tsx — keep the three in sync.
export function BrandMarkSvg({ size, rounded = true }: { size: number; rounded?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3b6cf6" />
          <stop offset="1" stopColor="#1b3a9e" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx={rounded ? 8 : 0} fill="url(#g)" />
      <path d="M11.5 7h6.2L22 11.3V23.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 10 23.5v-15A1.5 1.5 0 0 1 11.5 7Z" fill="rgba(255,255,255,0.14)" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M17.5 7.2v4.3h4.3" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13 21h6" stroke="rgba(255,255,255,0.65)" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M6.5 16.5h19" stroke="#fff" strokeWidth="1.9" strokeLinecap="round" />
    </svg>
  );
}

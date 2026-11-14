import type { ReactNode } from "react";
import type { FlagCountry } from "@/lib/i18n";

/**
 * Small country flags for the language menu, drawn as inline SVG (emoji flags render as
 * two letters on Windows). Every flag uses the same 30×20 canvas and is simplified for a
 * ~20px size (no coats of arms or US stars). The `Record<FlagCountry, …>` type makes a
 * missing flag a type error when a language adds a new country to `FLAG_COUNTRIES`.
 */
const FLAGS: Record<FlagCountry, ReactNode> = {
  us: (
    <>
      <rect width="30" height="20" fill="#fff" />
      {[0, 2, 4, 6, 8, 10, 12].map((i) => (
        <rect key={i} y={(i * 20) / 13} width="30" height={20 / 13} fill="#B22234" />
      ))}
      <rect width="13" height={(7 * 20) / 13} fill="#3C3B6E" />
    </>
  ),
  tr: (
    <>
      <rect width="30" height="20" fill="#E30A17" />
      <circle cx="10" cy="10" r="5" fill="#fff" />
      <circle cx="11.25" cy="10" r="4" fill="#E30A17" />
      <polygon
        fill="#fff"
        points="14.60,10.00 16.33,9.44 16.33,7.62 17.40,9.09 19.12,8.53 18.05,10.00 19.12,11.47 17.40,10.91 16.33,12.38 16.33,10.56"
      />
    </>
  ),
  de: (
    <>
      <rect width="30" height="20" fill="#000" />
      <rect y="6.67" width="30" height="6.67" fill="#DD0000" />
      <rect y="13.33" width="30" height="6.67" fill="#FFCE00" />
    </>
  ),
  es: (
    <>
      <rect width="30" height="20" fill="#AA151B" />
      <rect y="5" width="30" height="10" fill="#F1BF00" />
    </>
  ),
  br: (
    <>
      <rect width="30" height="20" fill="#009C3B" />
      <polygon points="2.5,10 15,1.7 27.5,10 15,18.3" fill="#FFDF00" />
      <circle cx="15" cy="10" r="5" fill="#002776" />
      <path d="M10.1 9 Q15 7.4 19.9 11" fill="none" stroke="#fff" strokeWidth="1" />
    </>
  ),
  fr: (
    <>
      <rect width="30" height="20" fill="#fff" />
      <rect width="10" height="20" fill="#002654" />
      <rect x="20" width="10" height="20" fill="#CE1126" />
    </>
  ),
  cn: (
    <>
      <rect width="30" height="20" fill="#EE1C25" />
      <g fill="#FFFF00">
        <polygon points="5.00,2.00 5.67,4.07 7.85,4.07 6.09,5.35 6.76,7.43 5.00,6.15 3.24,7.43 3.91,5.35 2.15,4.07 4.33,4.07" />
        <polygon points="9.14,2.51 9.62,1.97 9.25,1.34 9.91,1.63 10.39,1.08 10.33,1.80 11.00,2.09 10.29,2.25 10.22,2.97 9.85,2.35" />
        <polygon points="11.01,4.14 11.66,3.82 11.56,3.10 12.07,3.62 12.72,3.30 12.38,3.95 12.88,4.47 12.17,4.34 11.83,4.99 11.73,4.27" />
        <polygon points="11.04,6.73 11.76,6.70 11.96,6.00 12.21,6.68 12.94,6.66 12.37,7.10 12.62,7.79 12.01,7.38 11.44,7.83 11.64,7.13" />
        <polygon points="9.22,8.38 9.90,8.63 10.35,8.06 10.32,8.79 11.00,9.05 10.30,9.24 10.26,9.96 9.87,9.36 9.16,9.55 9.62,8.98" />
      </g>
    </>
  ),
};

/** Decorative: the language name next to it carries the meaning. */
export function Flag({ country, className = "h-3.5 w-[21px]" }: { country: FlagCountry; className?: string }) {
  return (
    <svg
      viewBox="0 0 30 20"
      className={`${className} shrink-0 overflow-hidden rounded-[3px] ring-1 ring-foreground/10`}
      aria-hidden="true"
      focusable="false"
    >
      {FLAGS[country]}
    </svg>
  );
}

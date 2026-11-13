import type { ReactNode } from "react";

/** A built-in demo job posting for the "Try a sample job" chooser. */
export interface SampleJob {
  /** Stable English name, used for analytics — never translated */
  id: string;
  /** Short role name shown on the button */
  label: string;
  emoji: string;
  /** One-line list of the main skills, shown as a tooltip */
  desc: string;
  /** The full posting */
  text: string;
}

/** One legal page (Terms, Privacy or Refund Policy) in one language. */
export interface LegalContent {
  title: string;
  /** meta description, 70–160 characters */
  description: string;
  intro: ReactNode;
  sections: { title: string; body: ReactNode }[];
}

export type LegalPages = Record<"privacy" | "terms" | "refunds", LegalContent>;

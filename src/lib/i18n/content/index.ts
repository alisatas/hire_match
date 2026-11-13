// Content by language: keyword guides, articles, legal pages, sample postings and the
// strings of the pages that show them. English is the source (src/lib/roles.ts,
// src/lib/posts.ts, the app/(en) legal pages); the other languages live next to this file.
// Server-side only — pages pass what a client component needs as props.
import type { Locale } from "@/lib/i18n";
import { POSTS as POSTS_EN, type Post } from "@/lib/posts";
import { ROLES as ROLES_EN, type RoleGuide } from "@/lib/roles";
import { pagesEn, type PageStrings } from "../pages.en";
import { pages as pagesDe } from "../pages.de";
import { pages as pagesEs } from "../pages.es";
import { pages as pagesTr } from "../pages.tr";
import { pages as pagesZh } from "../pages.zh";
import { POSTS as POSTS_DE } from "./posts.de";
import { POSTS as POSTS_ES } from "./posts.es";
import { POSTS as POSTS_TR } from "./posts.tr";
import { POSTS as POSTS_ZH } from "./posts.zh";
import { ROLES as ROLES_DE } from "./roles.de";
import { ROLES as ROLES_ES } from "./roles.es";
import { ROLES as ROLES_TR } from "./roles.tr";
import { ROLES as ROLES_ZH } from "./roles.zh";
import { SAMPLE_JOBS as SAMPLES_EN } from "./samples.en";
import { SAMPLE_JOBS as SAMPLES_ZH } from "./samples.zh";
import type { SampleJob } from "./types";

const ROLES: Record<Locale, RoleGuide[]> = { en: ROLES_EN, tr: ROLES_TR, de: ROLES_DE, es: ROLES_ES, zh: ROLES_ZH };
const POSTS: Record<Locale, Post[]> = { en: POSTS_EN, tr: POSTS_TR, de: POSTS_DE, es: POSTS_ES, zh: POSTS_ZH };
const PAGES: Record<Locale, PageStrings> = { en: pagesEn, tr: pagesTr, de: pagesDe, es: pagesEs, zh: pagesZh };
// Sample postings are translated for Chinese only so far; the others use the English ones.
const SAMPLES: Record<Locale, SampleJob[]> = { en: SAMPLES_EN, tr: SAMPLES_EN, de: SAMPLES_EN, es: SAMPLES_EN, zh: SAMPLES_ZH };

export const getRoles = (locale: Locale): RoleGuide[] => ROLES[locale];
export const getRole = (locale: Locale, slug: string): RoleGuide | undefined => ROLES[locale].find((r) => r.slug === slug);
export const getPosts = (locale: Locale): Post[] => POSTS[locale];
export const getPost = (locale: Locale, slug: string): Post | undefined => POSTS[locale].find((p) => p.slug === slug);
export const getPages = (locale: Locale): PageStrings => PAGES[locale];
export const getSamples = (locale: Locale): SampleJob[] => SAMPLES[locale];

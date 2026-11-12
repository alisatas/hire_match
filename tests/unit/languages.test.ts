import { describe, expect, it } from "vitest";
import { analyze, extractYearsRequired, yearsFromDateRanges } from "@/lib/analyze";
import { countWords, foldText } from "@/lib/languages";
import { cases } from "./fixtures-intl";
import { FRONTEND_CV, FRONTEND_JOB } from "./fixtures";

const LANGS = ["tr", "de", "es", "zh", "hi"] as const;

describe("scores are language-neutral", () => {
  // Before the language layer: nurse 75 (en) vs 24 (tr), 28 (es), 5 (zh), 8 (hi).
  for (const name of Object.keys(cases)) {
    const en = analyze(cases[name].en.cv, cases[name].en.job);
    it.each(LANGS)(`${name}: %s scores within 10 points of English`, (lang) => {
      const r = analyze(cases[name][lang].cv, cases[name][lang].job);
      expect(Math.abs(r.score - en.score)).toBeLessThanOrEqual(10);
      expect(r.matched.length).toBeGreaterThanOrEqual(en.matched.length - 1);
    });
    it.each(LANGS)(`${name}: %s reads the years asked for and the years on the CV`, (lang) => {
      const r = analyze(cases[name][lang].cv, cases[name][lang].job);
      expect(r.yearsRequired).toBe(en.yearsRequired);
      expect(Math.abs(r.yearsOnCV - en.yearsOnCV)).toBeLessThanOrEqual(0.5);
    });
  }

  it.each(LANGS)("an unrelated CV stays at the floor in %s", (lang) => {
    const r = analyze(cases["frontend (strong match)"][lang].cv, cases["nurse (strong match)"][lang].job);
    expect(r.score).toBeLessThanOrEqual(15);
    expect(r.missing.map(m => m.key)).toContain("healthcare");
  });

  it("does not mark a Chinese posting as too short", () => {
    const { job, cv } = cases["logistics (strong match)"].zh;
    expect(analyze(cv, job).lowQuality).toBe(false);
    expect(countWords("负责库存管理和采购")).toBe(6);
  });
});

describe("years of experience in other languages", () => {
  it.each([
    ["En az 5 yıl deneyimli geliştirici arıyoruz", 5],
    ["3-5 yıl deneyim", 3],
    ["Mindestens 4 Jahren Berufserfahrung", 4],
    ["3 bis 5 Jahre Erfahrung in der Pflege", 3],
    ["Al menos 2 años de experiencia", 2],
    ["Mínimo de 6 años en un puesto similar", 6],
    ["要求3年以上工作经验", 3],
    ["五年以上相关经验", 5],
    ["कम से कम 3 वर्ष का अनुभव", 3],
  ])("%s → %i", (text, years) => {
    expect(extractYearsRequired(text)).toBe(years);
  });

  const now = new Date(2026, 0, 15);
  it.each([
    ["Hemşire, Şehir Hastanesi — Mart 2018 - halen", 7.9],
    ["Pflegefachkraft, Klinikum — 2018 bis 2025", 7],
    ["Enfermera, Hospital Central — 2018 a 2025", 7],
    ["Coordinador — marzo 2019 a actualidad", 6.9],
    ["护士，市第一医院 — 2018年3月 至今", 7.9],
    ["物流专员 — 2019.03-2025.02", 6],
    ["स्टाफ नर्स — 2018 से वर्तमान", 7.6],
    ["Geliştirici, Acme — 2019'dan beri", 6.6],
  ])("%s → %f years", (line, years) => {
    expect(yearsFromDateRanges(line, now)).toBeCloseTo(years, 1);
  });

  it("skips education lines", () => {
    expect(yearsFromDateRanges("İstanbul Üniversitesi, Lisans — 2010 - 2014", now)).toBe(0);
    expect(yearsFromDateRanges("北京大学 本科 2010年 - 2014年", now)).toBe(0);
    expect(yearsFromDateRanges("Universidad de Madrid, Grado — 2010 a 2014", now)).toBe(0);
  });
});

describe("localised skill aliases", () => {
  const keys = (job: string) => analyze(FRONTEND_CV, job).missing.map(m => m.key);

  it("matches Turkish stems with endings attached", () => {
    expect(keys("Hemşire\nHasta bakımında ve yara bakımlarında deneyim, ilaç uygulamaları.")).toContain("healthcare");
  });

  it("matches with or without diacritics", () => {
    expect(foldText("YÖNETİMİ Straße años")).toBe("yonetimi strasse anos");
    expect(keys("Lojistik Uzmani\nTedarik zinciri yonetimi ve stok yonetimi deneyimi.")).toContain("logistics");
  });

  it("finds an English tool name inside Chinese text", () => {
    const r = analyze(FRONTEND_CV, "前端开发工程师\n熟悉React和TypeScript，有Kubernetes经验者优先。");
    expect(r.matched).toContain("React");
    // "…者优先" marks the skill as optional
    expect(r.missing.find(m => m.key === "kubernetes")?.priority).toBe("low");
  });

  it("does not read everyday words as skills", () => {
    // Turkish "ki" (that) is not German "KI"; "satış" alone is not B2B sales
    const found = keys("Mağaza Görevlisi\nBiliyoruz ki satış ekibimiz çok güçlü. Müşterilere yardımcı olacak ekip arkadaşı arıyoruz.");
    expect(found).not.toContain("ai");
    expect(found).not.toContain("sales");
  });

  it("leaves English scoring unchanged", () => {
    const { score } = analyze(FRONTEND_CV, FRONTEND_JOB);
    expect(score).toBeGreaterThanOrEqual(75);
  });
});

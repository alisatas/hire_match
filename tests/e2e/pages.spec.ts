import { test, expect } from "@playwright/test";
import { collectConsoleErrors, dismissConsent, expectAccessible } from "./helpers";

const PAGES: [string, RegExp][] = [
  ["/", /match the job/],
  ["/resume-keywords", /Resume keywords by job role/],
  ["/resume-keywords/ai-engineer", /AI Engineer resume keywords/],
  ["/resume-keywords/recruiter", /Recruiter resume keywords/],
  ["/blog", /CV and job search guides/],
  ["/blog/how-ats-reads-your-cv", /applicant tracking systems/],
  ["/terms", /Terms of Service/],
  ["/privacy", /Privacy Policy/],
];

test.describe("public pages", () => {
  test.beforeEach(async ({ page }) => dismissConsent(page));

  for (const [path, heading] of PAGES) {
    test(`${path} renders, has structured data and passes accessibility checks`, async ({ page }) => {
      const errors = collectConsoleErrors(page);
      const res = await page.goto(path);
      expect(res?.status()).toBe(200);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(heading);
      expect(await page.locator('script[type="application/ld+json"]').count()).toBeGreaterThan(0);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", /^https:\/\/cvxray\.com/);
      await expectAccessible(page);
      expect(errors).toEqual([]);
    });
  }

  test("unknown pages return a real 404 with a way back", async ({ page }) => {
    const res = await page.goto("/this-page-does-not-exist");
    expect(res?.status()).toBe(404);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(/doesn.t exist/);
    await expect(page.getByRole("link", { name: /Check my CV/ }).last()).toBeVisible();
  });

  test("cookie banner is accessible", async ({ page, context }) => {
    await context.clearCookies();
    await page.goto("/");
    const banner = page.getByRole("dialog", { name: "Cookie consent" });
    if (await banner.count()) {
      await expect(banner.getByRole("button", { name: "Reject all" })).toBeVisible();
      await expectAccessible(page);
    }
  });
});

test.describe("share images", () => {
  for (const path of [
    "/opengraph-image",
    // Pre-route-group URLs, still in links shared earlier: redirected to the current image
    "/resume-keywords/ai-engineer/opengraph-image",
    "/blog/how-ats-reads-your-cv/opengraph-image",
    "/logo.png",
    "/apple-icon",
  ]) {
    test(`${path} renders a PNG`, async ({ request }) => {
      const res = await request.get(path);
      expect(res.status()).toBe(200);
      expect(res.headers()["content-type"]).toContain("image/png");
    });
  }

  // Per-page share images: fetch the URL the page itself advertises in og:image, the way
  // a social crawler does. (The pages sit in the app/(en) route group, which gives their
  // image routes a generated suffix, so the path is read from the page, not assumed.)
  for (const path of ["/resume-keywords/ai-engineer", "/blog/how-ats-reads-your-cv", "/tr", "/zh"]) {
    test(`${path} advertises a share image that renders a PNG`, async ({ request }) => {
      const html = await (await request.get(path)).text();
      const image = html.match(/<meta property="og:image" content="([^"]+)"/)?.[1]?.replace(/&amp;/g, "&");
      expect(image, "og:image").toBeTruthy();
      const res = await request.get(new URL(image!).pathname + new URL(image!).search);
      expect(res.status()).toBe(200);
      expect(res.headers()["content-type"]).toContain("image/png");
    });
  }
});

test("blog RSS feed is valid XML listing every guide", async ({ request }) => {
  const res = await request.get("/blog/feed.xml");
  expect(res.status()).toBe(200);
  expect(res.headers()["content-type"]).toContain("application/rss+xml");
  const xml = await res.text();
  expect(xml).toContain("<rss version=\"2.0\"");
  expect((xml.match(/<item>/g) ?? []).length).toBeGreaterThanOrEqual(3);
});

test.describe("API guards", () => {
  test("scraper refuses private addresses and cross-site posts", async ({ request }) => {
    const priv = await request.post("/api/scrape", { data: { url: "http://169.254.169.254/latest/meta-data/" } });
    expect(priv.status()).toBe(400);
    const cross = await request.post("/api/scrape", {
      data: { url: "https://example.com" },
      headers: { Origin: "https://evil.example" },
    });
    expect(cross.status()).toBe(403);
  });
});

// Translated home pages: the whole flow in the page language, on a CV and a job post
// written in that language.
test.describe("translated home pages", () => {
  const cases = [
    { path: "/tr", lang: "tr", h1: /ilana uyuyor mu/, paste: "PDF yok mu? Metni yapıştırın", jobTab: "Metni yapıştır", analyze: "Uyumu analiz et", matched: "Klinik / Hasta bakımı" },
    { path: "/de", lang: "de", h1: /zur Stelle/, paste: "Kein PDF? Text einfügen", jobTab: "Text einfügen", analyze: "Jetzt analysieren", matched: "Klinik / Patientenversorgung" },
    { path: "/es", lang: "es", h1: /con la oferta/, paste: "¿Sin PDF? Pega el texto", jobTab: "Pegar texto", analyze: "Analizar ajuste", matched: "Clínica / cuidado del paciente" },
    { path: "/zh", lang: "zh-Hans", h1: /与职位匹配吗/, paste: "没有 PDF？粘贴文本", jobTab: "粘贴文本", analyze: "开始分析", matched: "临床 / 患者护理" },
  ];
  const NURSE: Record<string, { cv: string; job: string }> = {
    tr: {
      cv: "Hemşire\nDahiliye servislerinde 7 yıl deneyim.\nServis Hemşiresi, Şehir Hastanesi — 2018 - 2025\nVardiya başına 8 hastaya kadar hasta bakımı verdim. İlaç uygulama ve yaşamsal bulguların takibi.\nBakım planları hazırladım, klinik kayıtları elektronik sağlık kayıt sisteminde tuttum.\nYara bakımı, enfeksiyon kontrol denetimleri, temel yaşam desteği sertifikası.",
      job: "Hemşire — Dahiliye Servisi\nHastane servisinde en az 3 yıl deneyimli hemşire arıyoruz.\nSorumluluklar:\n- Güvenli hasta bakımı vermek ve bakım planları hazırlamak\n- İlaç uygulama ve yaşamsal bulguların takibi\n- Elektronik sağlık kayıt sisteminde klinik kayıt tutmak\n- Yara bakımı ve enfeksiyon kontrol\n- Temel yaşam desteği sertifikası zorunludur",
    },
    de: {
      cv: "Gesundheits- und Krankenpfleger\n7 Jahre Erfahrung auf internistischen Akutstationen.\nPflegefachkraft, Stadtklinikum — 2018 bis 2025\nPatientenversorgung von bis zu 8 Patienten pro Schicht. Medikamentengabe und Überwachung der Vitalzeichen.\nPflegeplanung und Pflegedokumentation in der elektronischen Patientenakte.\nWundversorgung, Hygieneaudits, Basic Life Support zertifiziert. Neue Pflegekräfte eingearbeitet, Zusammenarbeit mit Ärzten und Angehörigen.",
      job: "Pflegefachkraft (m/w/d) — Innere Medizin\nWir suchen eine Pflegefachkraft mit mindestens 3 Jahren Berufserfahrung auf einer Akutstation.\nAufgaben:\n- Sichere Patientenversorgung und Pflegeplanung\n- Medikamentengabe und Überwachung der Vitalzeichen\n- Pflegedokumentation in der elektronischen Patientenakte\n- Wundversorgung und Hygiene\n- Basic Life Support Zertifikat erforderlich\n- Zusammenarbeit mit Ärzten, Angehörigen und dem Pflegeteam",
    },
    es: {
      cv: "Enfermera\n7 años de experiencia en unidades de medicina interna.\nEnfermera de planta, Hospital Central — 2018 a 2025\nCuidado del paciente de hasta 8 pacientes por turno. Administración de medicación y control de constantes vitales.\nElaboré planes de cuidados y documentación clínica en la historia clínica electrónica.\nCura de heridas, auditorías de control de infecciones, certificada en soporte vital básico.",
      job: "Enfermera — Medicina Interna\nBuscamos una enfermera con al menos 3 años de experiencia en una unidad de hospitalización.\nResponsabilidades:\n- Cuidado del paciente seguro y planes de cuidados\n- Administración de medicación y control de constantes vitales\n- Documentación clínica en la historia clínica electrónica\n- Cura de heridas y control de infecciones\n- Certificación en soporte vital básico obligatoria",
    },
    "zh-Hans": {
      cv: "注册护士\n7年内科病房护理经验。\n病房护士，市第一医院 — 2018年 至今\n每班负责最多8名患者的患者护理。给药并监测生命体征。\n制定护理计划，在电子病历系统中书写护理记录。\n伤口护理、感染控制检查，持有基础生命支持证书。带教新护士，与医生和家属协作。",
      job: "注册护士 — 内科病房\n我们招聘一名具有3年以上病房工作经验的注册护士。\n岗位职责：\n- 提供安全的患者护理并制定护理计划\n- 给药并监测生命体征\n- 在电子病历中完成护理记录\n- 伤口护理和感染控制\n- 须持有基础生命支持证书\n- 与医生、家属和护理团队协作",
    },
  };

  for (const c of cases) {
    test(`${c.path} is in its own language and scores a CV written in it`, async ({ page }) => {
      await page.goto(c.path);
      await expect(page.locator("html")).toHaveAttribute("lang", c.lang);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(c.h1);

      await page.getByRole("button", { name: c.paste }).click();
      await page.locator("#analyzer textarea").first().fill(NURSE[c.lang].cv);
      await page.getByRole("tab", { name: c.jobTab }).click();
      await page.locator("#analyzer textarea").last().fill(NURSE[c.lang].job);
      await page.getByRole("button", { name: c.analyze }).click();

      // A fitting CV scores as a fitting CV — the engine reads this language
      const ring = page.locator('#analyzer svg[role="img"]');
      await expect(ring).toBeVisible();
      const score = Number((await ring.getAttribute("aria-label"))?.match(/\d+/)?.[0]);
      expect(score).toBeGreaterThanOrEqual(60);
      await expect(page.locator("#analyzer").getByText(c.matched).first()).toBeVisible();
      // The English-only CV quality check stays hidden for a CV that is not in English
      await expect(page.locator("#analyzer").getByText("Action Verbs")).toHaveCount(0);
    });
  }

  test("the header language menu switches language", async ({ page }) => {
    await page.goto("/es");
    await page.locator("header summary").click();
    await page.locator("header details").getByRole("link", { name: "Türkçe" }).click();
    await expect(page).toHaveURL(/\/tr$/);
    await expect(page.locator("html")).toHaveAttribute("lang", "tr");
    // also on an English-only page, and at phone width
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/resume-keywords/ai-engineer");
    await page.locator("header summary").click();
    await expect(page.locator("header details").getByRole("link", { name: "Deutsch" })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
  });

  test("every language is reachable from the footer", async ({ page }) => {
    await page.goto("/");
    for (const [name, href] of [["Türkçe", "/tr"], ["Deutsch", "/de"], ["Español", "/es"], ["中文", "/zh"]]) {
      await expect(page.locator("footer").getByRole("link", { name, exact: true })).toHaveAttribute("href", href);
    }
  });
});

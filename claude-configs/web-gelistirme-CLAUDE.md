# Web Gelistirme Projesi — Claude Code Talimatlari

Bu dosya, statik web siteleri (landing page, pazarlama sitesi, portfolyo) gelistirirken Claude Code'un uyacagi kurallari tanimlar.

---

## Teknoloji Yigini

- **Varsayilan:** Saf HTML, CSS ve JavaScript. Framework kullanma, ben istemedikce.
- **CSS:** Inline `<style>` blogu veya tek bir `styles.css` dosyasi. Tailwind, Bootstrap gibi kutuphaneler ancak ben istedigimde kullanilir.
- **JS:** Vanilla JavaScript. jQuery, React veya baska bir kutuphane ekleme. Gerekirse tek bir `main.js` dosyasi olustur.
- **Font:** Google Fonts uzerinden DM Sans (govde) + Instrument Serif (basliklar). Farkli font istedigimde belirtirim.
- **Ikon:** Lucide Icons veya inline SVG kullan. Font Awesome gibi agir kutuphaneler ekleme.

## Tasarim Kurallari

- **Tema:** Koyu arka plan (`#080808` veya `#0a0a0a`), acik metin (`#f5f5f5`).
- **Vurgu rengi:** Her proje icin farkli olabilir, varsayilan mavi (`#7990f8`). Ben belirtmedigim surece bu rengi kullan.
- **Tipografi:** Basliklar buyuk ve cesur, govde metni 16-18px arasi, satir yuksekligi 1.6.
- **Responsive:** Mobile-first yaklasim. Tum sayfalar 375px'den 1440px'e kadar duzgun gorunmeli.
- **Breakpoint'ler:** `768px` (tablet), `1024px` (desktop). Bu iki breakpoint yeterli cogu zaman.
- **Animasyonlar:** `IntersectionObserver` ile fade-in animasyonlari kullan. Asiri animasyondan kacin.
- **Bosluklar:** Section arasi `80px-120px` padding. Tutarli bosluk sistemi kullan (8px grid).
- **Butonlar:** Border-radius `8px-12px`, belirgin hover efekti, yeterli padding (`14px 28px` minimum).

## Dosya Yapisi

```
proje-adi/
  index.html          # Ana sayfa
  hakkimizda/
    index.html         # Alt sayfalar klasor icinde
  assets/
    images/            # Gorseller (WebP tercih et)
    fonts/             # Lokal fontlar (varsa)
  styles.css           # (opsiyonel, cogu zaman inline CSS yeterli)
  main.js              # (opsiyonel, gerektiginde)
```

- Her sayfa tek bir HTML dosyasi olarak kendi klasorunde olmali.
- Gorseller `assets/images/` altinda, aciklayici isimlerle (`hero-bg.webp`, `testimonial-1.jpg`).
- Gecici dosyalar `.tmp/` altinda tutulur ve git'e eklenmez.

## SEO Kurallari (Her Sayfada Uygulanacak)

- Her sayfada benzersiz `<title>` ve `<meta name="description">` etiketi olmali.
- Baslik hiyerarsisi dogru olmali: tek bir `<h1>`, altinda `<h2>`, `<h3>` sirasiyla.
- Tum gorsellerde anlamli `alt` metni olmali (Turkce).
- Semantic HTML kullan: `<header>`, `<main>`, `<section>`, `<footer>`, `<nav>`.
- `<html lang="tr">` her zaman eklenmeli.
- Open Graph etiketleri (`og:title`, `og:description`, `og:image`) her sayfada olmali.
- Canonical URL etiketi eklenmeli.
- Yapilandirilmis veri (JSON-LD) mumkunse ekle (Organization, WebPage, FAQ).

## Performans Kurallari

- **Gorseller:** WebP formatini tercih et. Genisligi 1200px'i gecmesin (hero haric). `loading="lazy"` kullan (ilk ekran haric).
- **Font yukleme:** `font-display: swap` her zaman kullan. Sadece gereken font agirliklarini yukle.
- **CSS:** Kullanilmayan CSS yazma. Tek sayfada 500 satirdan fazla CSS varsa gozden gecir.
- **JS:** Minimum JavaScript. Her script icin `defer` veya `async` kullan. Ucuncu parti script sayisini minimumda tut.
- **GTM:** Google Tag Manager varsa, container ID'yi bana sor. Kendinden ekleme.
- **Hedef:** Lighthouse skoru 90+ (Performance, Accessibility, Best Practices, SEO).

## Icerik Dili

- Tum icerik Turkce yazilir. Ingilizce terim kullanilacaksa italik yap veya parantez icinde ac.
- CTA butonlari net ve aksiyon odakli olmali: "Hemen Basla", "Ucretsiz Dene", "Simdi Kaydol".
- Uzun paragraflardan kacin. Kisa cumleler, madde isaretleri ve gorsel hiyerarsi kullan.
- Musteriye hitap: "siz" formu kullan (resmi ama yakin).

## Onemli Uyarilar

- Yeni dosya olusturmadan once mevcut dosyalari kontrol et. Gereksiz dosya uretme.
- Degisiklik yapmadan once mevcut kodu oku ve anla.
- Her sayfada favicon referansi olmali.
- HTTPS varsayilan. Tum kaynak linkleri `https://` ile baslamali.
- `.env`, `credentials.json` gibi hassas dosyalari asla commit etme.

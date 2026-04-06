# Deployment Checklist — Koddan Canli Siteye

Bu checklist'i her projede kullan. Bir adim atlama.

---

## 1. Pre-Deployment Kontrolleri

### Responsive Tasarim
- [ ] Mobil gorunum test edildi (375px — iPhone SE)
- [ ] Tablet gorunum test edildi (768px — iPad)
- [ ] Desktop gorunum test edildi (1440px)
- [ ] Genis ekran test edildi (1920px+)
- [ ] Metin tasmasi yok (overflow kontrol)
- [ ] Gorseller mobile uygun boyutlandirilmis
- [ ] Touch hedefleri yeterli buyuklukte (minimum 44x44px)
- [ ] Hamburger menu varsa duzgun calisiyor

### SEO
- [ ] Her sayfada benzersiz `<title>` tagi var
- [ ] Her sayfada `<meta name="description">` var (150-160 karakter)
- [ ] `<meta name="viewport" content="width=device-width, initial-scale=1">` var
- [ ] Baslik hiyerarsisi dogru (tek `<h1>`, sirayla `<h2>`, `<h3>`)
- [ ] Gorsellerde `alt` attribute'u var
- [ ] URL yapisi temiz ve anlamli (`/hakkimizda` vs `/page?id=3`)
- [ ] `<html lang="tr">` ayarli
- [ ] Canonical URL belirtilmis: `<link rel="canonical" href="...">`
- [ ] Open Graph taglari var (sosyal medya paylasimi icin):
  ```html
  <meta property="og:title" content="Sayfa Basligi">
  <meta property="og:description" content="Aciklama">
  <meta property="og:image" content="https://site.com/og-image.jpg">
  <meta property="og:url" content="https://site.com/sayfa">
  ```
- [ ] favicon.ico mevcut
- [ ] robots.txt dosyasi var
- [ ] sitemap.xml olusturulmus

### Performans
- [ ] Gorseller optimize edilmis (WebP format, max 200KB hero, max 100KB diger)
- [ ] Gereksiz CSS/JS kaldirildi
- [ ] Font yukleme optimize (display=swap)
- [ ] Lighthouse skoru 90+ (Performance)
- [ ] Buyuk dosyalar lazy load edilmis
- [ ] Kritik CSS inline, geri kalan async yukleniyoir
- [ ] console.log'lar temizlendi
- [ ] Kullanilmayan kodlar silindi

### Erisilebilirlik (Accessibility)
- [ ] Renk kontrasti yeterli (WCAG AA: 4.5:1 metin, 3:1 buyuk metin)
- [ ] Formlar label'li
- [ ] Klavye ile navigasyon calisiyor (Tab tusu ile gezinme)
- [ ] Focus durumu gorulebilir
- [ ] Ekran okuyucu icin aria-label'lar var (gerekli yerlerde)

### Fonksiyonel
- [ ] Tum linkler calisiyor (kirmizi link yok)
- [ ] Formlar duzgun calisiyor ve validasyon var
- [ ] Hata mesajlari kullaniciya gosteriliyor
- [ ] 404 sayfasi var
- [ ] HTTPS'e yonlendirme calisiyor
- [ ] Farkli tarayicilarda test edildi (Chrome, Safari, Firefox)

---

## 2. GitHub Kurulumu

### Repo Olusturma

```bash
# Proje dizininde
cd /proje/dizini

# Git baslat
git init

# .gitignore olustur
```

- [ ] `.gitignore` dosyasi olusturuldu:

```gitignore
# Ortam degiskenleri
.env
.env.local
.env.production

# Bagimliliklar
node_modules/
.pnp/
.pnp.js

# Build ciktilari
.next/
out/
dist/
build/

# OS dosyalari
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/

# Gecici dosyalar
*.log
.tmp/

# Credentials
credentials.json
token.json
*.pem
```

- [ ] `.gitignore` kontrol edildi — hassas dosya yok

### Ilk Commit

```bash
git add .
git commit -m "Ilk commit: proje yapisi ve temel sayfalar"
```

- [ ] Ilk commit yapildi

### GitHub'a Push

```bash
# GitHub'da yeni repo olustur (gh CLI ile)
gh repo create proje-adi --public --source=. --remote=origin

# veya manuel
git remote add origin https://github.com/kullanici/proje-adi.git
git branch -M main
git push -u origin main
```

- [ ] GitHub repo'su olusturuldu
- [ ] Kod push edildi
- [ ] README.md eklendi (isteğe bagli ama onerılir)

---

## 3. Vercel Deployment

### Ilk Kurulum

1. [ ] [vercel.com](https://vercel.com) hesabi ac (GitHub ile giris)
2. [ ] "Add New Project" tikla
3. [ ] GitHub repo'sunu sec
4. [ ] Framework ayarlarini kontrol et:
   - **Framework Preset:** Otomatik algilar (Next.js, static, vb.)
   - **Build Command:** Gerekirse ayarla (ornek: `npm run build`)
   - **Output Directory:** Gerekirse ayarla (ornek: `dist`, `out`, `build`)
   - **Root Directory:** Mono-repo'da alt dizin belirt
5. [ ] Environment Variables ekle (varsa):
   - `NEXT_PUBLIC_API_URL`
   - `DATABASE_URL`
   - Diger gerekli degiskenler
6. [ ] "Deploy" tikla

### Deployment Sonrasi

- [ ] Preview URL'de site calisiyor
- [ ] Tum sayfalar yukleniyorrmu
- [ ] Formlar calisiyor
- [ ] API baglantilari calisiyor
- [ ] Gorseller yukleniyomr
- [ ] Konsol hatasi yok

### Otomatik Deployment

Vercel varsayilan olarak her `git push` ile otomatik deploy eder.

- [ ] `main` branch'e push = Production deployment
- [ ] Diger branch'ler = Preview deployment
- [ ] Bu ayarlari Vercel Dashboard > Settings > Git'ten degistirebilirsin

---

## 4. Google AntiGravity Deployment

### Onkosulilar
- [ ] Google Cloud hesabi var
- [ ] `gcloud` CLI kurulu: `brew install google-cloud-sdk` (Mac) veya [cloud.google.com/sdk](https://cloud.google.com/sdk)
- [ ] Giris yapildi: `gcloud auth login`
- [ ] Proje secildi: `gcloud config set project PROJE-ID`

### App Engine ile Static Site

1. [ ] `app.yaml` dosyasi olustur:

```yaml
runtime: python312
app_engine_apis: false

handlers:
- url: /(.+\..+)$
  static_files: \1
  upload: .+\..+$

- url: /(.+)/?$
  static_files: \1/index.html
  upload: .+/index\.html$

- url: /
  static_files: index.html
  upload: index\.html
```

2. [ ] Deploy et:
```bash
gcloud app deploy
```

3. [ ] Ciktiyi kontrol et:
```bash
gcloud app browse
```

### Firebase Hosting Alternatifi

Firebase Hosting genelde static siteler icin daha uygun:

1. [ ] Firebase CLI kur:
```bash
npm install -g firebase-tools
firebase login
```

2. [ ] Proje baslat:
```bash
firebase init hosting
# Public directory: . (veya build/)
# Single-page app: Hayir (coklu sayfa icin)
# GitHub otomatik deploy: Evet (istege bagli)
```

3. [ ] Deploy:
```bash
firebase deploy --only hosting
```

4. [ ] Site URL: `https://proje-adi.web.app`

---

## 5. Custom Domain Kurulumu

### Domain Satin Alma
- [ ] Domain satin alindi (Onerilen: Cloudflare, Namecheap, Google Domains)

### DNS Ayarlari — Vercel

1. [ ] Vercel Dashboard > Proje > Settings > Domains
2. [ ] Domain ekle: `ornek.com`
3. [ ] DNS kayitlarini ayarla:

| Tip | Isim | Deger |
|-----|------|-------|
| A | @ | 76.76.21.21 |
| CNAME | www | cname.vercel-dns.com |

4. [ ] DNS yayilimini bekle (genelde 5-30 dakika, bazen 48 saat)
5. [ ] SSL otomatik olusturulur (Let's Encrypt)

### DNS Ayarlari — Firebase

1. [ ] Firebase Console > Hosting > Custom Domain
2. [ ] Domain ekle ve dogrulama adimlarini takip et
3. [ ] DNS kayitlarini ayarla:

| Tip | Isim | Deger |
|-----|------|-------|
| A | @ | Firebase'in verdigi IP |
| CNAME | www | proje-adi.web.app |
| TXT | @ | Dogrulama kodu |

4. [ ] SSL otomatik olusturulur

### Cloudflare DNS Kullaniyorsaniz

- [ ] Proxy durumu: DNS Only (turuncu bulut KAPALI) — Vercel/Firebase kendi SSL'ini kullansin
- [ ] SSL/TLS modu: Full (Strict)
- [ ] Always Use HTTPS: Acik
- [ ] www → @ yonlendirmesi ayarli

### Kontrol

```bash
# DNS kaydi kontrol
dig ornek.com A
dig www.ornek.com CNAME

# SSL kontrol
curl -I https://ornek.com
# "HTTP/2 200" ve "strict-transport-security" gormelisiniz
```

- [ ] `https://ornek.com` calisiyor
- [ ] `https://www.ornek.com` calisiyor (veya yonlendiriyor)
- [ ] `http://ornek.com` → `https://ornek.com` yonlendirmesi calisiyor
- [ ] SSL sertifikasi gecerli (tarayicide kilit ikonu)

---

## 6. Post-Deployment

### Google Analytics / GTM

- [ ] GTM container kodu tum sayfalara eklendi:
```html
<!-- Head icine -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-XXXXXXX');</script>

<!-- Body acilisinin hemen altina -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
```

- [ ] GTM'de gerekli taglar olusturuldu:
  - [ ] GA4 Configuration tag
  - [ ] Conversion tracking (varsa)
  - [ ] Facebook Pixel (varsa)
- [ ] GTM Preview modunda test edildi
- [ ] GTM yayinlandi (Publish)

### Google Search Console

1. [ ] [search.google.com/search-console](https://search.google.com/search-console) adresine git
2. [ ] "Add Property" → Domain veya URL prefix
3. [ ] Dogrulama yap (DNS TXT kaydi veya HTML dosyasi)
4. [ ] Sitemap gonder: `https://ornek.com/sitemap.xml`
5. [ ] URL denetimi ile ana sayfayi kontrol et

- [ ] Property eklendi ve dogrulandi
- [ ] Sitemap gonderildi
- [ ] Indexleme istegi yapildi

### Performans Testi

- [ ] [PageSpeed Insights](https://pagespeed.web.dev/) ile test et
  - Mobil skor: 90+
  - Desktop skor: 90+
- [ ] [GTmetrix](https://gtmetrix.com/) ile test et
- [ ] Sorunlari not al ve duzelt

### Son Kontroller

- [ ] Tum sayfalar production URL'de calisiyor
- [ ] Formlar production'da test edildi
- [ ] Email bildirimleri calisiyor
- [ ] Odeme sistemi calisiyor (varsa — test odemesi yap)
- [ ] 404 sayfasi calisiyor
- [ ] www ve non-www yonlendirmesi dogru
- [ ] Sosyal medya paylasim onizlemesi dogru (og:image)

---

## 7. Izleme ve Bakım

### Haftalik Kontrol

- [ ] Site yuklenme suresi normal mi?
- [ ] Search Console'da hata var mi?
- [ ] Analytics verileri geliyor mu?
- [ ] SSL sertifikasi gecerli mi?
- [ ] Broken link var mi?

### Aylik Kontrol

- [ ] Bagimliliklari guncelle (`npm update`)
- [ ] Guvenlik yamalarini kontrol et
- [ ] Lighthouse testini tekrarla
- [ ] Yedek al (kod zaten Git'te ama veritabani varsa)
- [ ] Domain yenileme tarihini kontrol et

### Acil Durum Plani

**Site cokerse:**
1. Vercel/Firebase dashboard'dan deployment durumunu kontrol et
2. Son basarili deployment'a geri don (Vercel: Deployments > uc nokta > Promote)
3. DNS sorunuysa: `dig ornek.com` ile kontrol et
4. SSL sorunuysa: Vercel/Firebase'de SSL sertifikasini yeniden olustur

**Ornek geri alma (Vercel):**
```bash
# Son basarili deployment'i listele
vercel ls

# Belirli deployment'a geri don
vercel promote [deployment-url]
```

---

## Hizli Referans: Deployment Komutlari

```bash
# Git
git add .
git commit -m "Aciklayici mesaj"
git push origin main

# Vercel
vercel                    # Preview deploy
vercel --prod             # Production deploy
vercel ls                 # Deployment listesi
vercel logs               # Loglar

# Firebase
firebase deploy           # Deploy
firebase hosting:channel:deploy preview  # Preview deploy
firebase hosting:clone SOURCE DEST       # Kopyala

# Google Cloud
gcloud app deploy         # App Engine deploy
gcloud app logs tail      # Loglar
gcloud app versions list  # Version listesi

# DNS kontrol
dig ornek.com A           # A kaydi kontrol
dig ornek.com CNAME       # CNAME kontrol
nslookup ornek.com        # Genel DNS kontrol
curl -I https://ornek.com # HTTP header kontrol
```

---

## Deployment Ozet Akisi

```
Kod yazildi
    ↓
Pre-deployment kontrol (responsive, SEO, performans)
    ↓
Git commit + push
    ↓
Vercel/Firebase otomatik deploy
    ↓
Preview URL'de test
    ↓
Custom domain bagla
    ↓
SSL aktif mi kontrol et
    ↓
GTM + Analytics ekle
    ↓
Search Console'a kaydet
    ↓
Performans testi
    ↓
CANLI!
    ↓
Haftalik/aylik izleme
```

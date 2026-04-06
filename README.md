# DOA+ Starter Kit

Claude Code ile dijital is kurma paketi. Otomasyon, SaaS ve web gelistirme projelerini hizla hayata gecirmek icin hazir sablonlar, rehberler ve is fikirleri.

Bu kit, DOA+ toplulugunun uyeleri icin hazirlanmistir. Icerideki her sey pratikte test edilmis ve gercek projelerde kullanilmistir.

---

## Paketin Icindekiler

### `/skills/` — Claude Code Slash Komutlari

Claude Code icinde `/komut-adi` yazarak calistirabilcegin hazir skill'ler:

| Dosya | Ne yapar |
|---|---|
| `saas-iskelet.md` | Sifirdan SaaS projesi iskelet olusturur (Supabase + Stripe + auth) |
| `cold-email.md` | Potansiyel musterilere soguk email taslagi yazar |
| `website.md` | Landing page / web sitesi olusturur |
| `teklif.md` | Profesyonel proje teklifi hazirlar |
| `rakip-analizi.md` | Rakip analiz raporu cikarir |
| `otomasyon.md` | n8n otomasyon akisi tasarlar |

### `/claude-configs/` — CLAUDE.md Yapilandirmalari

Proje kokune kopyalayacagin hazir CLAUDE.md dosyalari. Claude Code'un proje baglamini anlamasini saglar:

| Dosya | Ne icin |
|---|---|
| `otomasyon-CLAUDE.md` | n8n otomasyon projeleri |
| `web-gelistirme-CLAUDE.md` | Web sitesi ve landing page projeleri |
| `saas-builder-CLAUDE.md` | SaaS uygulama gelistirme projeleri |

### `/guides/` — Rehberler

| Dosya | Konu |
|---|---|
| `claude-code-rehberi.md` | Claude Code'u etkili kullanma rehberi |
| `n8n-referans.md` | n8n otomasyon platformu referans dokumani |

### `/ideas/` — Is Fikirleri & Strateji

| Dosya | Konu |
|---|---|
| `50-saas-fikri.md` | 50 B2B SaaS/uygulama fikri, sektorlere gore organize edilmis |
| `fiyatlandirma-rehberi.md` | Hizmet ve SaaS fiyatlandirma stratejileri, muşteriye sunum teknikleri |

---

## Kurulum

### Skill'leri Yukle (Slash Komutlari)

Skill dosyalarini Claude Code'un komut klasorune kopyala:

```bash
# Kullanici bazli (tum projelerden erisilebilir)
mkdir -p ~/.claude/commands
cp skills/*.md ~/.claude/commands/

# Veya proje bazli (sadece bu projede erisilebilir)
mkdir -p .claude/commands
cp skills/*.md .claude/commands/
```

Kurulumdan sonra Claude Code icinde `/saas-iskelet`, `/cold-email` gibi komutlari kullanabilirsin.

### CLAUDE.md Yapilandirmasi Yukle

Proje tipine gore uygun config dosyasini proje kokune kopyala:

```bash
# Ornek: SaaS projesi icin
cp claude-configs/saas-builder-CLAUDE.md /proje-klasorun/CLAUDE.md

# Ornek: Web sitesi projesi icin
cp claude-configs/web-gelistirme-CLAUDE.md /proje-klasorun/CLAUDE.md

# Ornek: Otomasyon projesi icin
cp claude-configs/otomasyon-CLAUDE.md /proje-klasorun/CLAUDE.md
```

Bu dosya, Claude Code'a projenin ne oldugunu, hangi teknolojileri kullandigini ve nasil calismasini istedigini anlatir.

---

## Nasil Kullanilir?

1. **Fikir sec** — `ideas/50-saas-fikri.md` dosyasina bak, sana uygun bir fikir sec
2. **Fiyatini belirle** — `ideas/fiyatlandirma-rehberi.md` ile fiyatlandirma stratejini olustur
3. **Projeyi baslat** — Uygun CLAUDE.md config'ini proje kokune kopyala
4. **Skill'leri kullan** — `/saas-iskelet` ile projeyi iskeletle, `/teklif` ile museteriye teklif hazirla
5. **Rehberleri oku** — Takildgin yerde `guides/` klasorundeki rehberlere bas vur

---

## DOA+ Toplulugu

Bu kit, DOA+ toplulugunun bir parcasidir. Toplulukta:

- Haftalik canli oturumlar
- Diger uyelerin projeleri ve deneyimleri
- Soru-cevap ve destek
- Yeni skill'ler ve guncellemeler

Topluluga katil: **[skool.com/doa](https://www.skool.com/doa)**

---

## DOA+ Hizlandirma Programi

Daha hizli ilerlemek istiyorsan, DOA+ Hizlandirma programi birebir mentorluk, detayli egitim videolari ve ileri seviye iceriklere erisim saglar.

Detaylar: **[otomasyonkur.co](https://otomasyonkur.co)**

---

## Sorularin mi var?

Toplulukta sor veya WhatsApp destek hattindan ulaş. Kodlama bilmene gerek yok — Claude Code ile birlikte her seyi adim adim yapabilirsin.

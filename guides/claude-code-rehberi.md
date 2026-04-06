# Claude Code Rehberi

## Claude Code Nedir?

Claude Code, Anthropic'in terminalde calisan AI asistanidir. Kod yazma, debug, refactor, deployment ve daha fazlasini dogrudan terminalden yapmanizi saglar. VS Code veya herhangi bir editore bagimli degildir — terminaliniz varsa calisir.

Diger AI araclariyla farki: Claude Code dosya sisteminize, Git gecmisinize ve proje yapisina dogrudan erisir. Kod kopyala-yapistir yapmaniza gerek yok. Projenizin tamamini gorup anlayabilir.

---

## Kurulum

### Gereksinimler
- Node.js 18+
- npm veya yarn
- Anthropic API anahtari

### Adim Adim Kurulum

```bash
# Global kurulum
npm install -g @anthropic-ai/claude-code

# API anahtarinizi ayarlayin
export ANTHROPIC_API_KEY="sk-ant-..."

# Proje dizinine gidin ve baslatip
cd /proje/dizini
claude
```

Ilk calistirmada Claude projenizi tarar ve yapisini anlar. Buyuk projelerde bu birkas saniye surebilir.

### VS Code Entegrasyonu

Claude Code tek basina calisir ama VS Code terminali icinde de kullanabilirsiniz. Terminali acin, `claude` yazin, hepsi bu.

---

## Temel Komutlar ve Kisayollar

### Baslatma ve Genel

| Komut | Aciklama |
|-------|----------|
| `claude` | Interaktif modu baslat |
| `claude "gorev aciklamasi"` | Tek seferlik gorev calistir |
| `claude -c` | Son konusmaya devam et |
| `claude -r` | Son konusmayi sifirdan tekrarla |
| `Ctrl+C` | Mevcut islemi iptal et |
| `/exit` veya `Ctrl+D` | Claude Code'dan cik |

### Konusma Icinde Komutlar

| Komut | Aciklama |
|-------|----------|
| `/clear` | Konusma gecmisini temizle |
| `/compact` | Konusmayi ozetle (token tasarrufu) |
| `/cost` | Mevcut konusmanin maliyet ozeti |
| `/help` | Yardim menusunu goster |
| `/init` | CLAUDE.md dosyasi olustur |
| `/model` | Kullanilan modeli degistir |
| `/permissions` | Izin ayarlarini goster/degistir |
| `/status` | Mevcut durumu goster |

### Pipe Kullanimi

Claude Code'u baska komutlarla zincirleyebilirsiniz:

```bash
# Hata logunu analiz ettir
cat error.log | claude "Bu hatalari analiz et ve cozum oner"

# Git diff'i incelet
git diff | claude "Bu degisiklikleri incele, sorun var mi?"

# Dosya icerigi hakkinda soru sor
cat package.json | claude "Bu projenin bagimliliklarini ozetle"
```

---

## CLAUDE.md Dosyalari

CLAUDE.md, Claude Code'a projeniz hakkinda kalici talimatlar vermenin yoludur. Her konusma basinda otomatik okunur.

### Hiyerarsi

```
~/.claude/CLAUDE.md              # Global (tum projeler)
/proje/CLAUDE.md                 # Proje seviyesi (Git'e commit'lenir)
/proje/.claude/CLAUDE.md         # Proje seviyesi (gitignore edilebilir)
/proje/src/CLAUDE.md             # Dizin seviyesi (o dizin icin gecerli)
```

### Etkili CLAUDE.md Ornegi

```markdown
# Proje Talimatlari

## Proje Hakkinda
- Bu bir Next.js 14 e-ticaret sitesidir
- Turkce dil destegiyle calisiyor
- Veritabani: Supabase (PostgreSQL)
- Stil: Tailwind CSS

## Kod Kurallari
- Fonksiyon isimleri camelCase
- Component isimleri PascalCase
- Her component kendi dizininde olacak: ComponentName/index.tsx
- API route'lari /app/api/ altinda

## Onemli Notlar
- .env dosyasini ASLA commit etme
- Supabase sorgularinda RLS politikalari aktif
- Resimler /public/images/ altinda, WebP formatinda

## Yaygin Gorevler
- Yeni sayfa: /app/sayfa-adi/page.tsx olustur
- Yeni API: /app/api/endpoint/route.ts olustur
- Migration: npx supabase migration new isim
```

### Ipuclari
- Kisa ve net tutun — Claude uzun metin duvarlarindan cok, madde isaretlerini iyi anlar
- Proje stack'ini, dosya yapisini ve kurallari mutlaka belirtin
- Yanlis yapmasini istemediginiz seyleri acikca yazin
- `/init` komutuyla baslangic sablonu olusturabilirsiniz

---

## Ozel Skill'ler ve Komutlar

Slash komutlariyla ozel is akislari tanimlayabilirsiniz.

### Skill Olusturma

`.claude/commands/` dizini altinda Markdown dosyalari olusturun:

```
.claude/commands/
  deploy.md
  yeni-sayfa.md
  test-yaz.md
```

### Ornek: deploy.md

```markdown
# Deploy Komutu

1. Once git status kontrol et — commit edilmemis degisiklik varsa uyar
2. npm run build calistir
3. Build basariliysa, git add ve commit yap
4. git push origin main
5. Vercel deployment durumunu kontrol et
```

### Kullanim

```
/deploy
/yeni-sayfa "Hakkimizda sayfasi"
/test-yaz "login fonksiyonu"
```

Parametreler `$ARGUMENTS` olarak skill icinde kullanilir.

### Ornek: yeni-sayfa.md

```markdown
# Yeni Sayfa Olustur

$ARGUMENTS ile belirtilen sayfa icin:

1. /app/$ARGUMENTS/page.tsx olustur
2. Sayfa basligi ve temel layout'u ekle
3. Metadata'yi ayarla (title, description)
4. Navigation'a link ekle
5. Sayfanin renderini kontrol et
```

---

## Etkili Prompt Yazma

### Kotu Prompt vs Iyi Prompt

**Kotu:**
> Bana bir form yap

**Iyi:**
> /topluluk/index.html sayfasina bir email kayit formu ekle. Form: isim ve email alanlari, yesil (#34d399) submit butonu. Form gonderildiginde verileri /api/subscribe endpoint'ine POST olarak gonder. Basarili kayitta "Basariyla kaydoldunuz" mesaji goster. Mevcut sayfa stiline uyumlu olsun.

### Prompt Yazma Kurallari

1. **Baglamla basla:** Hangi dosya, hangi bolum, hangi sayfa
2. **Ne istedigini net soyle:** "Form ekle" degil, "Email kayit formu ekle, isim + email alanlari olsun"
3. **Teknik detay ver:** Renkler, fontlar, API endpoint'leri, veri yapilari
4. **Kisitlamalari belirt:** "Mevcut stil bozulmasin", "Sadece bu dosyayi degistir"
5. **Cikti formatini belirt:** "TypeScript olsun", "Inline CSS kullan", "Tailwind class'lari kullan"

### Ileri Seviye Teknikler

**Adim adim yaptirma:**
```
Bu gorevi 3 adimda yap:
1. Once mevcut /api/users route'unu oku ve yapis anla
2. Ayni yapiyi kullanarak /api/products route'u olustur
3. Her iki route'u karsilastir, tutarlilik kontrol et
```

**Referans gosterme:**
```
/components/UserCard/index.tsx dosyasindaki yapiyi referans al.
Ayni pattern'i kullanarak ProductCard componenti olustur.
```

**Iteratif calisma:**
```
# Ilk prompt
Landing page hero section'i olustur

# Ikinci prompt (sonucu gordukten sonra)
Hero'daki basligi daha buyuk yap, alt baslik ekle, CTA butonunu turuncu yap

# Ucuncu prompt
Mobilde baslik 2 satir oluyor, tek satira sigmasi icin font boyutunu kucult
```

---

## Yaygin Is Akislari

### 1. Sifirdan Sayfa Olusturma

```
"Yeni bir landing page olustur: /kampanya/index.html

Tema: Koyu arkaplan (#080808), accent rengi mavi (#7990f8)
Font: DM Sans (Google Fonts)

Bolumler:
- Hero: Baslik + alt baslik + CTA butonu
- Ozellikler: 3 kolonlu grid, ikon + baslik + aciklama
- Testimonial: 2 musteri yorumu, isim + foto + yorum
- CTA: Son cagri, buton

Mobil uyumlu olsun. Fade-in animasyonlari ekle.
GTM container GTM-KNC6R3G3 ekle."
```

### 2. Bug Duzeltme

```
"/topluluk/index.html sayfasinda mobilde hamburger menu
acildiginda arkadaki icerik scroll oluyor. Bunu duzelt.
Menu acikken body scroll'u kitle."
```

veya

```
"Bu hatayi duzelt: TypeError: Cannot read properties of undefined
Stack trace'i su: [hata metnini yapistirun]"
```

### 3. Refactoring

```
"index.html dosyasindaki inline CSS'i analiz et.
Tekrar eden stilleri CSS custom property'lerine cevir.
Renk degerlerini degiskenlere tasi.
Hicbir gorsel degisiklik olmamali."
```

### 4. Git ve Deployment

```
"Son yaptigimiz degisiklikleri commit et.
Commit mesaji Turkce ve aciklayici olsun.
Sonra main branch'e push et."
```

---

## Daha Iyi Sonuc Alma Ipuclari

### 1. Konusmayi Temiz Tut
Uzun konusmalarda Claude baglami kaybedebilir. `/compact` ile ozetleyin veya yeni konusma baslatip.

### 2. Buyuk Gorevleri Parcala
"Tum siteyi yeniden tasarla" yerine:
- "Hero section'i guncelle"
- "Pricing tablosunu ekle"
- "Footer'i yeniden yaz"

### 3. Hata Durumunda
Claude bir hata yaptiginda:
- Hatayi acikca belirtin: "Bu yanlis, cunku X"
- Dogruyu gosterin: "Bunun yerine Y olmali"
- Tekrar deneyin: "Ayni gorevi tekrar yap, bu sefer Z'ye dikkat et"

### 4. Dosya Okutun
Claude'un projenizi anlamasi icin ilgili dosyalari okutun:
```
"Once /styles/theme.ts dosyasini oku, sonra yeni component'te
ayni tema degerlerini kullan"
```

### 5. Ciktilari Dogrulayin
Claude'un yaptigi degisikligi hemen test edin. Tarayicida acin, konsolu kontrol edin, mobilde test edin.

### 6. Izinleri Yonetin
Claude dosya yazmak, komut calistirmak icin izin ister. Guvendiginiz islemler icin `/permissions` ile kalici izin verebilirsiniz.

---

## MCP (Model Context Protocol) Temelleri

MCP, Claude Code'a disaridan arac (tool) baglamanizi saglar. Boylece Claude, sadece dosya sistemiyle degil, API'ler, veritabanlari ve diger servislerle de etkilesebilir.

### MCP Nedir?

MCP sunuculari, Claude'a yeni yetenekler kazandirir:
- Veritabani sorgulama
- Web arama
- API cagrilari
- Tarayici kontrolu
- ve daha fazlasi

### Konfigurasyonr

Proje dizininde `.claude/mcp.json` dosyasi olusturun:

```json
{
  "mcpServers": {
    "supabase": {
      "command": "npx",
      "args": ["-y", "@supabase/mcp-server"],
      "env": {
        "SUPABASE_URL": "https://xxx.supabase.co",
        "SUPABASE_SERVICE_ROLE_KEY": "ey..."
      }
    },
    "browser": {
      "command": "npx",
      "args": ["-y", "@anthropic-ai/mcp-puppeteer"]
    },
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@anthropic-ai/mcp-filesystem", "/izin/verilen/dizin"]
    }
  }
}
```

### Yaygin MCP Sunuculari

| Sunucu | Ne Yapar | Kullanim Alani |
|--------|----------|---------------|
| `@supabase/mcp-server` | Supabase veritabani islemleri | Veritabani sorgulama, tablo olusturma |
| `@anthropic-ai/mcp-puppeteer` | Tarayici kontrolu | Screenshot, web scraping, test |
| `@anthropic-ai/mcp-filesystem` | Dosya sistemi erisimi | Genis dizin erisimi |
| `@anthropic-ai/mcp-github` | GitHub API | Issue, PR, repo yonetimi |
| `@anthropic-ai/mcp-slack` | Slack API | Mesaj gonderme, kanal yonetimi |

### MCP Kullanim Ornegi

MCP sunucu bagladiktan sonra Claude otomatik olarak yeni araclari gorur:

```
"Supabase'deki users tablosundan son 10 kaydi getir"

"Bu sayfanin ekran goruntusunu al ve mobil gorunumunu kontrol et"

"GitHub'da yeni bir issue olustur: baslik 'Responsive fix gerekli'"
```

### Kendi MCP Sunucunuzu Yazmak

Basit bir MCP sunucusu Node.js ile yazilabilir:

```javascript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new McpServer({ name: "my-tools", version: "1.0.0" });

server.tool("get_weather", { city: z.string() }, async ({ city }) => {
  const data = await fetchWeather(city);
  return { content: [{ type: "text", text: JSON.stringify(data) }] };
});

const transport = new StdioServerTransport();
await server.connect(transport);
```

---

## Hizli Basvuru Tablosu

| Durum | Ne Yapmali |
|-------|-----------|
| Claude yanlis dosyayi duzenliyor | "Hayir, /dogru/dosya/yolu.html dosyasini duzenle" |
| Cok uzun cikti veriyor | "Sadece degisen kismi goster" |
| Baglami kaybetti | `/compact` calistir veya yeni konusma baslat |
| Izin hatalari aliyor | `/permissions` ile izinleri kontrol et |
| Yanlis teknoloji kullaniyor | CLAUDE.md'de stack'i ve kurallari belirt |
| Token siniri yaklasti | `/cost` ile kontrol et, `/compact` ile azalt |
| Farkli model denemek istiyorsun | `/model` ile degistir |

---

## Sonuc

Claude Code'un guclu yani, tam proje baglami ile calismasidir. Dosyalarinizi gorur, Git gecmisinizi bilir, terminalde komut calistirir. Bunu en verimli sekilde kullanmak icin:

1. CLAUDE.md ile projenizi tanitin
2. Net ve detayli promptlar yazin
3. Buyuk gorevleri kucuk adimlara bolin
4. Sonuclari her adimda dogrulayin
5. MCP ile araclari genisletin
6. Ozel skill'ler ile tekrar eden gorevleri otomatiklestirin

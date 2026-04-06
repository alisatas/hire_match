# Otomasyon Projesi — Claude Code Talimatlari

Bu dosya, otomasyon ve n8n workflow projeleri gelistirirken Claude Code'un uyacagi kurallari tanimlar.

---

## Genel Yaklasim

Bu projede **WAT mimarisi** kullanilir (Workflows, Agents, Tools):
- **Workflows:** `workflows/` klasorunde Markdown SOP dosyalari. Her otomasyon icin ne yapilacagini, hangi aracin kullanilacagini ve edge case'leri tanimlar.
- **Agents:** Claude Code (sen). Workflow'u oku, dogru tool'u calistir, hatalari yonet.
- **Tools:** `tools/` klasorunde Python scriptleri. Deterministik isler bunlarla yapilir.

AI her adimi dogrudan yapmaya kalkarsa hata orani katlanarak artar. Bu yuzden islem adimlarini Python scriptlerine delege et, sen sadece orkestrasyon yap.

## Kullanilan Araclar

| Arac | Kullanim Alani |
|------|---------------|
| **n8n** | Workflow otomasyonu, webhook dinleme, zamanlama |
| **Claude Code** | Kod yazma, veri isleme, karar verme |
| **Apify** | Web scraping, veri toplama |
| **Apollo.io** | Lead bulma, email zenginlestirme |
| **Instantly** | Soguk email gonderimi, email kampanyalari |
| **Supabase** | Veritabani, API, kullanici yonetimi |
| **Google Sheets** | Veri girdi/cikti, raporlama |
| **Slack/Discord** | Bildirimler, uyarilar |

## n8n Workflow Tasarim Prensipleri

### Temel Akis Yapisi
Her workflow su kaliplardan birini takip etmeli:

```
1. TETIKLEYICI → ISLEM → CIKTI
   Webhook → Veri isleme → Google Sheets'e yaz

2. ZAMANLAMA → TOPLAMA → ISLEM → BILDIRIM
   Cron → API'den veri cek → Filtrele → Slack'e gonder

3. WEBHOOK → DOGRULAMA → ISLEM → YANIT
   Gelen veri → Validasyon → Kaydet → HTTP Response
```

### Isimlendirme Kurallari
- Workflow adi: `[Kategori] Akis Adi` — Ornek: `[Lead Gen] Apollo Scrape to Instantly`
- Node isimleri aciklayici olmali: "Webhook - Yeni Lead", "Filter - Email Var Mi", "HTTP - Apollo API"
- Genel node isimlerini (`HTTP Request`, `Code`) birakma. Her zaman yeniden adlandir.

### Hata Yonetimi
- Her kritik node'dan sonra **Error Trigger** veya **IF node** ile hata kontrolu ekle.
- Workflow basarisiz olursa bildirim gonder (Slack, email veya Discord).
- Retry mantigi: API cagrilarinda 3 deneme, arasinda 5 saniye bekleme.
- Hata loglarini bir yere kaydet (Supabase tablosu veya Google Sheet).

```
// Hata yonetimi sablonu
1. Try: API cagrisini yap
2. Catch: Hata varsa loglama node'una yonlendir
3. Log: Hata detayini kaydet (tarih, workflow adi, hata mesaji, girdi verisi)
4. Notify: Slack'e bildirim gonder
5. Retry (opsiyonel): Belirli hata kodlarinda tekrar dene
```

### Veri Akisi Kurallari
- Her node'un ciktisini bir sonraki node'un beklentisiyle eslestir.
- Buyuk veri setlerini parcala (batch processing). Tek seferde 100'den fazla kayit isleme.
- Node'lar arasi veri aktariminda gereksiz alan tasima. Sadece gerekli alanlari gecir.

## API Anahtar Yonetimi

- Tum API anahtarlari `.env` dosyasinda tutulur. Baska bir yere ASLA yazma.
- n8n'de credential'lar n8n'in kendi credential yoneticisiyle saklanir.
- `.env` dosyasi `.gitignore`'da olmali. Her zaman kontrol et.
- Yeni bir API entegrasyonu eklerken `.env.example` dosyasini guncelle (deger olmadan, sadece anahtar adi).

```
# .env ornegi
APOLLO_API_KEY=
INSTANTLY_API_KEY=
APIFY_API_TOKEN=
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
OPENAI_API_KEY=
SLACK_WEBHOOK_URL=
```

## Python Tool Yazim Kurallari

- Her script tek bir is yapar. Buyuk scriptleri parcala.
- Dosya adi aciklayici ve snake_case: `scrape_apollo_leads.py`, `send_to_instantly.py`.
- Her scriptin basinda docstring ile ne yaptigini acikla.
- Girdi/cikti net tanimlanmali. CLI argumanlari veya `.env` uzerinden parametre al.
- Hata mesajlari aciklayici olmali. Sadece `Exception` firklatma, ne oldugunu yaz.
- Ucretli API cagirisi yapan scriptleri calistirmadan once bana sor.

```python
"""
Apollo'dan lead listesi ceker ve CSV'ye yazar.

Kullanim: python tools/scrape_apollo_leads.py --query "SaaS CEO" --limit 100
Cikti: .tmp/apollo_leads_YYYYMMDD.csv
"""
```

## Workflow Testi

Her workflow'u canli ortama almadan once test et:

1. **Birim test:** Her node'u tek basina test et. Beklenen girdi ile beklenen ciktiyi dogrula.
2. **Entegrasyon test:** Tum akisi uctan uca kucuk bir veri setiyle calistir (5-10 kayit).
3. **Hata testi:** Yanlis girdi, bos veri, API hatasi senaryolarini dene.
4. **Rate limit testi:** API limitlerini kontrol et. Bulk islemlerde bekleme suresi ekle.

Test sonuclarini workflow dokumantasyonuna yaz.

## Dokumantasyon Gereksinimleri

Her workflow icin `workflows/` klasorunde bir Markdown dosyasi olmali:

```markdown
# Workflow Adi

## Amac
Bu workflow ne yapar, neden var?

## Tetikleyici
Ne zaman calisir? (Webhook, Cron, Manuel)

## Adimlar
1. Adim 1 — Ne yapar, hangi tool'u kullanir
2. Adim 2 — ...

## Gerekli Credential'lar
- Apollo API Key
- Supabase URL + Key

## Bilinen Kisitlamalar
- Apollo gunluk 300 istek limiti var
- Instantly saatlik 50 email limiti

## Hata Senaryolari
- API limiti asildiginda: Bekleme suresi ekle, sonraki gun devam et
- Bos veri geldiginde: Loglama yap, bildirim gonder

## Son Guncelleme
Tarih ve ne degisti
```

## Dosya Yapisi

```
proje-adi/
  tools/              # Python scriptleri (deterministik islemler)
  workflows/          # Markdown SOP dosyalari (her otomasyon icin bir tane)
  .tmp/               # Gecici dosyalar (CSV, JSON export'lar). Git'e eklenmez.
  .env                # API anahtarlari. Git'e eklenmez.
  .env.example        # Hangi anahtarlarin gerektigini gosterir (degersiz)
  .gitignore          # .env, .tmp/, credentials.json, token.json
  requirements.txt    # Python bagimliliklari
```

## Kendini Gelistirme Dongusu

Her hata, sistemi daha saglam yapma firsatidir:

1. **Tespit:** Neyin kirildigini anla (hata mesajini tam oku).
2. **Duzelt:** Script'i veya workflow'u onar.
3. **Dogrula:** Duzeltmeyi test et, calistigini onayla.
4. **Belgele:** Workflow dokumantasyonunu guncelle (ne oldu, nasil cozuldu).
5. **Devam:** Daha saglam bir sistemle ilerle.

Bu dongu sayesinde ayni hata iki kez yasamaz.

## Onemli Uyarilar

- Ucretli API cagirisi yapan bir tool calistirmadan once bana sor.
- Yeni workflow olusturmadan once mevcut workflow'lari kontrol et. Belki benzer bir sey zaten var.
- `.tmp/` icindeki dosyalar gecicidir. Kalici veri cloud servislerde olmali (Google Sheets, Supabase).
- n8n workflow JSON'larini export edip repo'ya kaydet (yedekleme icin).
- Workflow'lari izinsiz silme veya degistirme. Once sor.
- Bulk islemlerde her zaman rate limit'e dikkat et. Agresif API cagrilarindan kacin.

# n8n Hizli Referans Karti

## n8n Nedir?

n8n, acik kaynakli bir otomasyon platformudur. Zapier ve Make'in alternatifidir ama onemli farklari var:

- **Self-hosted** secenegi var (kendi sunucunuzda calistirir, veri sizde kalir)
- **Code node** ile JavaScript/Python yazabilirsiniz
- **Ucretsiz** self-hosted versiyonu sinirsizddir
- **400+ entegrasyon** hazir gelir

Kisacasi: "Eger X olursa, Y yap" mantigiyla calisan is akislari kurarsiniiz.

---

## Kurulum

### Secenek 1: n8n Cloud (Kolay Baslangic)

1. [n8n.io](https://n8n.io) adresine gidin
2. Ucretsiz hesap olusturun
3. Hazir — tarayicidan kullanmaya baslayin

**Avantaj:** Kurulum yok, her yerden erisim
**Dezavantaj:** Ucretli (aylik ~$20+), veri n8n sunucularinda

### Secenek 2: Self-Hosted (Docker)

```bash
# En hizli yol
docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  -v n8n_data:/home/node/.n8n \
  docker.n8n.io/n8nio/n8n

# Tarayicida ac
# http://localhost:5678
```

### Secenek 3: Self-Hosted (VPS ile Kalici)

```bash
# docker-compose.yml
version: '3'
services:
  n8n:
    image: docker.n8n.io/n8nio/n8n
    restart: always
    ports:
      - "5678:5678"
    environment:
      - N8N_BASIC_AUTH_ACTIVE=true
      - N8N_BASIC_AUTH_USER=admin
      - N8N_BASIC_AUTH_PASSWORD=guclu-sifre-123
      - WEBHOOK_URL=https://n8n.sizindomain.com/
      - N8N_ENCRYPTION_KEY=rastgele-uzun-key
    volumes:
      - n8n_data:/home/node/.n8n

volumes:
  n8n_data:
```

```bash
docker-compose up -d
```

**Onerilen VPS:** Hetzner (3-5 EUR/ay), Railway, veya DigitalOcean.

---

## En Kullanisli Node'lar

### Webhook

**Ne yapar:** Dis dunyadan HTTP istegi alir, is akisini tetikler.

**Ne zaman kullanilir:**
- Form gonderimi yakalamak
- Stripe webhook almak
- Baska servislerden bildirim almak

**Onemli alanlar:**
| Alan | Aciklama |
|------|----------|
| HTTP Method | GET, POST, PUT, DELETE |
| Path | Webhook URL'nin son kismi (ornek: `/form-submit`) |
| Authentication | None, Basic Auth, Header Auth |
| Response Mode | Immediately (hemen cevap) veya Last Node (is akisi bittikten sonra) |

**Ornek:** Stripe odeme geldiginde tetiklenen workflow:
```
Webhook URL: https://n8n.domain.com/webhook/stripe-payment
Method: POST
```

---

### HTTP Request

**Ne yapar:** Herhangi bir API'ye istek gonderir.

**Ne zaman kullanilir:**
- API'den veri cekmek
- API'ye veri gondermek
- Web scraping (basit)

**Onemli alanlar:**
| Alan | Aciklama |
|------|----------|
| Method | GET, POST, PUT, PATCH, DELETE |
| URL | API endpoint'i |
| Authentication | Credential secimi (OAuth2, API Key, vb.) |
| Headers | Ek header'lar |
| Body | POST/PUT icin gonderilecek veri |
| Response Format | JSON, Text, File |

**Ornek — API'den veri cekme:**
```
Method: GET
URL: https://api.example.com/users
Headers: Authorization = Bearer {{$credentials.apiKey}}
```

**Ornek — Veri gonderme:**
```
Method: POST
URL: https://api.example.com/leads
Body (JSON): {
  "email": "{{ $json.email }}",
  "name": "{{ $json.name }}"
}
```

---

### Code (JavaScript/Python)

**Ne yapar:** Ozel JavaScript veya Python kodu calistirir.

**Ne zaman kullanilir:**
- Veriyi donusturmek (format degistirme, filtreleme)
- Karmasik hesaplamalar
- Mevcut node'larin yetmedigi durumlar

**Ornek — Veri donusumu:**
```javascript
// Gelen veriden sadece ihtiyaciniz olanlari alin
const items = $input.all();

return items.map(item => ({
  json: {
    fullName: `${item.json.firstName} ${item.json.lastName}`,
    email: item.json.email.toLowerCase(),
    signupDate: new Date().toISOString().split('T')[0]
  }
}));
```

**Ornek — Filtre:**
```javascript
const items = $input.all();
return items.filter(item => item.json.amount > 100);
```

**Ornek — Dis API cagrisi (Code icinden):**
```javascript
const response = await fetch('https://api.openai.com/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${$env.OPENAI_API_KEY}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: $json.prompt }]
  })
});

const data = await response.json();
return [{ json: { result: data.choices[0].message.content } }];
```

---

### IF

**Ne yapar:** Kosullu dallama. Veriyi "dogru" veya "yanlis" koluna yonlendirir.

**Ne zaman kullanilir:**
- Belirli kosullara gore farkli islemler yapmak
- Veri filtreleme
- Hata kontrolu

**Ornek kosullar:**
```
{{ $json.status }} equals "paid"          → Odeme yapildi koluna git
{{ $json.amount }} greater than 1000      → Yuksek deger koluna git
{{ $json.email }} contains "@gmail"       → Gmail koluna git
{{ $json.tags }} is not empty             → Etiketli koluna git
```

---

### Switch

**Ne yapar:** IF'in coklu versiyonu. Birden fazla kosula gore farkli kollara yonlendirir.

**Ne zaman kullanilir:**
- 3+ farkli yol gerektiginde
- Durum (status) bazli yonlendirme
- Kategori bazli islem

**Ornek:**
```
{{ $json.plan }} degeri:
  "starter"     → Kol 1 (hosgeldin emaili)
  "pro"         → Kol 2 (onboarding emaili)
  "enterprise"  → Kol 3 (AE'ye bildirim)
  Diger         → Kol 4 (standart akis)
```

---

### Merge

**Ne yapar:** Birden fazla kolu birlesirir.

**Ne zaman kullanilir:**
- Iki farkli kaynaktan gelen veriyi eslestirmek
- Paralel islemlerin sonuclarini birlesirmek

**Modlar:**
| Mod | Aciklama |
|-----|----------|
| Append | Tum verileri alt alta birlestir |
| Combine by Position | Sirayla esle (1. ile 1., 2. ile 2.) |
| Combine by Fields | Belirli alana gore esle (ornek: email'e gore) |

---

### Set

**Ne yapar:** Veri alanlari ekler, degistirir veya siler.

**Ne zaman kullanilir:**
- Yeni alan eklemek
- Mevcut alani yeniden adlandirmak
- Gereksiz alanlari silmek
- Sabit deger atamak

**Ornek:**
```
Ekle: source = "n8n-webhook"
Ekle: processedAt = {{ $now.toISO() }}
Kaldir: rawHtml, tempId, debugInfo
Degistir: email → {{ $json.email.toLowerCase() }}
```

---

### Schedule Trigger (Cron)

**Ne yapar:** Is akisini belirli zamanlarda otomatik tetikler.

**Ne zaman kullanilir:**
- Gunluk/haftalik raporlar
- Duzinli veri cekme
- Temizlik islemleri

**Ornek zamanlamalar:**
```
Her gun 09:00'da          → Cron: 0 9 * * *
Her saat basi             → Cron: 0 * * * *
Her Pazartesi 08:00'da    → Cron: 0 8 * * 1
Her 15 dakikada           → Cron: */15 * * * *
Ayin 1'i 00:00'da         → Cron: 0 0 1 * *
```

---

### Gmail

**Ne yapar:** Email gonderir, alir, etiketler, arar.

**Onemli islemler:**
| Islem | Aciklama |
|-------|----------|
| Send | Email gonder |
| Get Many | Birden fazla email getir |
| Get | Tek email getir |
| Reply | Email'e cevap ver |
| Add Label | Etiket ekle |

**Ornek — Email gonderme:**
```
To: {{ $json.email }}
Subject: Kaydunuz alindi - {{ $json.name }}
Body (HTML): <h1>Hosgeldiniz!</h1><p>Kaydunuz basariyla tamamlandi.</p>
```

---

### Slack

**Ne yapar:** Slack'e mesaj gonderir, kanallar olusturur, kullanicilarla etkilesir.

**Onemli islemler:**
| Islem | Aciklama |
|-------|----------|
| Send Message | Kanala veya DM'e mesaj gonder |
| Update Message | Mevcut mesaji guncelle |
| Get Channel | Kanal bilgisi getir |
| Upload File | Dosya yukle |

**Ornek — Bildirim gonderme:**
```
Channel: #sales-notifications
Message: :moneybag: Yeni odeme! {{ $json.customerName }} - ${{ $json.amount }}
```

---

### Google Sheets

**Ne yapar:** Google Sheets ile okuma/yazma islemleri.

**Onemli islemler:**
| Islem | Aciklama |
|-------|----------|
| Append Row | Yeni satir ekle |
| Read Rows | Satirlari oku |
| Update Row | Mevcut satiri guncelle |
| Delete Row | Satir sil |
| Clear | Sayfayi temizle |

**Ornek — Lead kaydetme:**
```
Islem: Append Row
Spreadsheet: Lead Takip
Sheet: Sayfa1
Columns:
  A (Tarih): {{ $now.format('yyyy-MM-dd HH:mm') }}
  B (Isim): {{ $json.name }}
  C (Email): {{ $json.email }}
  D (Kaynak): {{ $json.source }}
```

---

## Yaygin Workflow Kaliplari

### Kalip 1: Webhook → Islem → Gonder

Dis bir kaynak veri gonderir, siz islir, sonuc uretirsiniz.

```
[Webhook] → [Set: veri temizle] → [IF: gecerli mi?]
                                       ↓ Evet         ↓ Hayir
                                  [Google Sheets]   [Slack: hata bildir]
                                       ↓
                                  [Gmail: onay emaili]
```

**Gercek ornek:** Stripe odeme webhook'u gelir, musteri bilgisi Sheets'e yazilir, musteriye onay emaili gider, Slack'e bildirim duser.

---

### Kalip 2: Zamanlanmis Veri Cekme (Scraping)

Duzinli olarak veri cekin ve bir yere kaydedin.

```
[Schedule: her gun 09:00] → [HTTP Request: API'den veri cek]
                                ↓
                          [Code: veriyi isle]
                                ↓
                          [IF: yeni veri var mi?]
                               ↓ Evet         ↓ Hayir
                          [Google Sheets]    [Stop]
                               ↓
                          [Slack: "15 yeni lead bulundu"]
```

**Gercek ornek:** Her sabah Apollo'dan yeni leadleri cekin, Sheets'e yazin, Slack'ten bildirim alin.

---

### Kalip 3: Email Otomasyonu

Belirli olaylarda otomatik email gonderin.

```
[Webhook: yeni kayit] → [Set: template degiskenler]
                              ↓
                        [Gmail: hosgeldin emaili]
                              ↓
                        [Wait: 3 gun]
                              ↓
                        [HTTP Request: kullanici aktif mi?]
                              ↓
                        [IF: aktif degilse]
                              ↓ Evet
                        [Gmail: hatirlatma emaili]
                              ↓
                        [Wait: 7 gun]
                              ↓
                        [Gmail: son teklif emaili]
```

**Gercek ornek:** Yeni uye kaydolur, hosgeldin emaili gider, 3 gun sonra aktif degilse hatirlatma, 7 gun sonra indirim teklifi.

---

### Kalip 4: CRM Senkronizasyonu

Birden fazla sistemi senkron tutun.

```
[Schedule: her 30 dk] → [HTTP Request: CRM'den leadleri cek]
                              ↓
                        [Code: veriyi normalize et]
                              ↓
                        [Google Sheets: mevcut verileri oku]
                              ↓
                        [Merge: eslestir (email bazli)]
                              ↓
                        [IF: yeni lead mi?]
                             ↓ Evet              ↓ Hayir
                        [Sheets: yeni satir]   [IF: guncelleme var mi?]
                             ↓                       ↓ Evet
                        [Slack: bildir]         [Sheets: guncelle]
```

---

## Hata Yonetimi

### Try/Catch Mantigi

n8n'de "Error Trigger" node'u ile hatalari yakalayabilirsiniz:

```
[Ana Workflow]
      ↓ (hata olursa)
[Error Trigger] → [Slack: hata bildirimi] → [Google Sheets: hata logu]
```

### Retry Ayarlari

Her node'un ayarlarinda:
- **Retry on Fail:** Hatada tekrar dene
- **Max Tries:** Maksimum deneme sayisi (ornek: 3)
- **Wait Between Tries:** Denemeler arasi bekleme (ornek: 1000ms)

### Yaygin Hatalar ve Cozumleri

| Hata | Sebep | Cozum |
|------|-------|-------|
| 401 Unauthorized | API anahtari gecersiz | Credential'i guncelle |
| 429 Too Many Requests | Rate limit | Retry ekle + bekleme suresi artir |
| 500 Internal Server Error | Hedef API sorunu | Retry ekle, hata logla |
| Timeout | Islem cok uzun | Timeout suresini artir (Settings > Timeout) |
| Invalid JSON | Yanlis veri formati | Code node ile formati duzelt |

### Hata Bildirim Sablonu

Her onemli workflow'un sonuna ekleyin:

```
[Error Trigger] → [Set] → [Slack]

Set node:
  error_workflow = {{ $workflow.name }}
  error_node = {{ $json.execution.error.node }}
  error_message = {{ $json.execution.error.message }}
  error_time = {{ $now.format('yyyy-MM-dd HH:mm') }}

Slack message:
  :rotating_light: Workflow Hatasi
  Workflow: {{ $json.error_workflow }}
  Node: {{ $json.error_node }}
  Hata: {{ $json.error_message }}
  Zaman: {{ $json.error_time }}
```

---

## Ortam Degiskenleri ve Credential Yonetimi

### Ortam Degiskenleri

Docker ile:
```yaml
environment:
  - OPENAI_API_KEY=sk-...
  - WEBHOOK_BASE_URL=https://n8n.domain.com
  - SHEETS_ID=1abc...xyz
```

Workflow icinde kullanim:
```
{{ $env.OPENAI_API_KEY }}
{{ $env.WEBHOOK_BASE_URL }}
```

### Credential Olusturma

1. **Sol menu > Credentials** bolumune gidin
2. **Add Credential** tiklayin
3. Servis secin (Gmail, Slack, Google Sheets, vb.)
4. Yonergeleri takip edin (genelde OAuth2 ile baglanti)

### Credential Ipuclari

- Her servis icin ayri credential olusturun
- Google servisleri icin tek bir OAuth2 credential yeterli (Gmail + Sheets + Drive)
- API key'leri credential olarak saklayin, workflow icine yazmayin
- Test ve production icin ayri credentiallar kullanin

---

## Performans Ipuclari

1. **Gereksiz node calistirma:** IF node ile erken filtreleyin
2. **Batch isleme:** Buyuk veri setlerinde "Split in Batches" node kullanin (API rate limit'e takalmamak icin)
3. **Wait node dikkatli kullanin:** Uzun bekleme workflow execution'i acik tutar
4. **Execution verisini temizleyin:** Settings > Pruning ile eski execution'lari silin
5. **Webhook response hizli olsun:** Agir islemleri "Respond to Webhook" node'undan sonraya koyun

---

## Hizli Basvuru

### Expression Syntax

```
{{ $json.fieldName }}              → Mevcut node'un verisinden alan
{{ $('NodeAdi').item.json.field }} → Belirli bir node'un verisinden alan
{{ $now }}                         → Simdiki zaman
{{ $today }}                       → Bugunun tarihi
{{ $env.VARIABLE }}                → Ortam degiskeni
{{ $execution.id }}                → Execution ID
{{ $workflow.name }}               → Workflow adi
{{ $input.all() }}                 → Tum gelen itemlar (Code node icinde)
{{ $input.first() }}               → Ilk item (Code node icinde)
```

### Faydali String Islemleri

```
{{ $json.email.toLowerCase() }}
{{ $json.name.trim() }}
{{ $json.text.replace('eski', 'yeni') }}
{{ $json.url.split('/').pop() }}
{{ $json.items.join(', ') }}
```

### Tarih Islemleri

```
{{ $now.format('yyyy-MM-dd') }}              → 2026-03-26
{{ $now.format('dd/MM/yyyy HH:mm') }}        → 26/03/2026 14:30
{{ $now.minus({ days: 7 }).toISO() }}        → 7 gun once
{{ $now.plus({ hours: 24 }).toISO() }}       → 24 saat sonra
{{ $now.startOf('month').toISO() }}          → Ayin basi
```

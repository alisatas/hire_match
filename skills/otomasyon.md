# n8n Otomasyon Workflow Tasarlayici

Bu komut, verilen senaryoya gore detayli bir n8n otomasyon workflow'u tasarlar.
Kullanici ne otomatize etmek istedigini aciklar.
Kullanim: /otomasyon [ne otomatize etmek istiyorsunuz]

---

Asagidaki senaryo icin eksiksiz bir n8n otomasyon workflow'u tasarla:

**Kullanici girdisi:** $ARGUMENTS

## Talimatlar

Asagidaki formatta detayli ve uygulanabilir bir n8n workflow dokumani olustur. Cikti olarak hem aciklamali dokuman hem de n8n'e import edilebilir JSON dosyasi ver.

### Bolum 1: Workflow Ozeti

- **Workflow Adi:** (Turkce, aciklayici)
- **Amac:** 2-3 cumleyle ne yaptigini acikla
- **Tetikleyici:** Workflow'u ne baslatir (webhook, zamanlama, manuel, vb.)
- **Kullanilan Servisler:** Listele (Gmail, Google Sheets, Slack, vb.)
- **Tahmini Kurulum Suresi:** Dakika cinsinden
- **Zorluk Seviyesi:** Baslangic / Orta / Ileri

### Bolum 2: On Gereksinimler

- Hangi hesaplara/API'lara ihtiyac var
- Hangi n8n credential'lari olusturulmali
- Herhangi bir ucretsiz/ucretli plan gerekliligi
- Gerekli ortam degiskenleri veya ayarlar

### Bolum 3: Adim Adim Workflow

Her node icin su bilgileri ver:

```
Node [numara]: [Node Adi]
- Tur: [n8n node tipi, ornegin "HTTP Request", "Google Sheets", "IF", "Code"]
- Islem: [Bu node ne yapiyor, 1-2 cumle]
- Ayarlar:
  - [Parametre 1]: [Deger veya aciklama]
  - [Parametre 2]: [Deger veya aciklama]
- Baglanti: Node [sonraki numara]'ya baglanir
- Notlar: [Onemli ipuclari, dikkat edilmesi gerekenler]
```

Her node'u DETAYLI acikla. Genel ifadeler kullanma — n8n arayuzunde hangi alana ne yazilacagini tam olarak belirt.

### Bolum 4: Hata Yonetimi

- Hangi node'larda hata olusabilir
- Her potansiyel hata icin cozum stratejisi
- Error Trigger node'u ile genel hata yakalama kurulumu
- Retry (yeniden deneme) ayarlari icin onerilerin

### Bolum 5: Test Plani

- Workflow'u test etmek icin adim adim talimatlar
- Ornek test verisi (gercekci Turkce veriler)
- Beklenen ciktilar
- Yaygin hatalar ve cozumleri

### Bolum 6: Optimizasyon Onerileri

- Performans icin ipuclari
- Rate limiting'e dikkat edilmesi gereken noktalar
- Olceklendirme onerileri (veri hacmi artarsa ne yapilmali)
- Maliyet optimizasyonu (API cagri sayisini azaltma vb.)

### Bolum 7: n8n JSON Export

Son olarak, workflow'un n8n'e direkt import edilebilecek JSON dosyasini olustur.

JSON olusturma kurallari:
- Gecerli n8n workflow JSON formati kullan
- Her node icin dogru `type` degerini kullan (ornegin `n8n-nodes-base.googleSheets`, `n8n-nodes-base.httpRequest`)
- Node pozisyonlarini mantikli bir akis seklinde ayarla (soldan saga, 250px aralikla)
- Baglantilari (connections) dogru tanimla
- Credential placeholder'lari ekle (kullanici kendi credential'larini sececek)
- Gerekli parametreleri doldur, kullanicinin degistirmesi gereken yerleri `[BURAYA_YAZIN]` ile isaretle
- Workflow'un versiyonunu ve meta bilgilerini ekle

### Icerik Kurallari

- Tum aciklamalar Turkce olmali
- Teknik terimleri (node, workflow, trigger, webhook) oldugu gibi birak, parantez icinde Turkce aciklama ekle
- Ornek veriler Turkce olmali (isimler, e-postalar, sehirler vb.)
- Her adimdaki aciklamalar n8n'e yeni baslayan birinin bile anlayabilecegi netlikte olmali
- Alternatif araclari/node'lari da oner (ornegin "Gmail yerine Outlook da kullanabilirsiniz")

Ciktiyi duzgun formatlanmis Markdown olarak ver. JSON export'u ayri bir kod blogu icinde sun.

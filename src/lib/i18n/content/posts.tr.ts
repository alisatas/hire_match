import type { Post } from "@/lib/posts";

// Turkish articles. Same slugs, dates, sections and block types as src/lib/posts.ts.
export const POSTS: Post[] = [
  {
    slug: "how-ats-reads-your-cv",
    title: "Aday takip sistemleri (ATS) CV'nizi gerçekte nasıl okur?",
    seoTitle: "ATS Yazılımları CV'nizi Gerçekte Nasıl Okur?",
    description:
      "ATS CV'nizle gerçekte ne yapar, \"CV'lerin %75'i otomatik elenir\" iddiası neden bir efsanedir ve hangi biçim ile anahtar kelime alışkanlıkları sizi buldurur?",
    published: "2026-11-11",
    updated: "2026-11-11",
    minutes: 6,
    relatedRoles: ["software-engineer", "account-executive", "recruiter"],
    sections: [
      {
        heading: "ATS nedir?",
        blocks: [
          { type: "p", text: "Aday takip sistemi, bir şirketin başvuruları toplamak, adayları mülakat aşamaları arasında ilerletmek ve her işe alımın kaydını tutmak için kullandığı yazılımdır. Greenhouse, Workday, Lever, SmartRecruiters ve daha birçokları aşağı yukarı aynı işi yapar: bir CV yığınını aranabilir bir veritabanına dönüştürür." },
          { type: "p", text: "Başvurduğunuzda ATS CV'nizi saklar ve genellikle ayrıştırmaya çalışır: adınızı, iletişim bilgilerinizi, unvanlarınızı, çalıştığınız şirketleri, tarihleri, eğitiminizi ve becerilerinizi yapılandırılmış alanlara aktarır. İşe alım uzmanları ardından başvuruları inceler, filtreler ve en önemlisi, içlerinde arama yapar." },
        ],
      },
      {
        heading: "\"Otomatik eleme\" efsanesi",
        blocks: [
          { type: "p", text: "\"CV'lerin %75'i bir insan görmeden ATS tarafından reddedilir\" cümlesini sık sık okursunuz. Bu rakamın arkasında yayımlanmış bir araştırma yoktur ve çoğu sistemin nasıl çalıştığını yanlış anlatır. Çoğu şirkette ATS CV'nizi okuyup karar vermez; kararı insanlar verir." },
          { type: "p", text: "Adayları gerçekten otomatik olarak eleyen şey, işverenin tanımladığı eleme sorularıdır; örneğin \"Türkiye'de çalışma izniniz var mı?\" ya da \"Sürücü belgeniz var mı?\" Bu soruları dürüstçe ve dikkatle yanıtlayın, çünkü orada yapılan yanlış bir tıklama gerçek bir ret nedenidir." },
          { type: "tip", text: "Asıl risk bir robotun sizi reddetmesi değildir. Asıl risk, işe alım uzmanının \"Salesforce\" ya da \"React\" diye arama yapması ve o kelime CV'nizde geçmediği için sonuçlarda görünmemenizdir." },
        ],
      },
      {
        heading: "Anahtar kelimeler neden hâlâ önemli?",
        blocks: [
          { type: "p", text: "İşe alım uzmanları ATS'de, sizin internette yaptığınız gibi arama yapar: işe alım yöneticisinin istediği becerileri ve unvanları yazarak. İlanda \"Next.js\" yazıyor ve CV'nizde \"NextJS\" geçiyorsa ya da ilan \"paydaş yönetimi\" derken siz \"iş birimleriyle çalıştım\" yazdıysanız, basit bir arama sizi kaçırabilir." },
          { type: "ul", items: [
            "Araçlar, yöntemler ve sertifikalar için ilanın kullandığı adların aynısını kullanın.",
            "Bir terimi bir kez kısaltmasıyla birlikte açık haliyle yazın: \"Arama motoru optimizasyonu (SEO)\".",
            "En önemli becerilerinizi hem Beceriler bölümüne hem de onları kanıtlayan maddelere yazın.",
            "Yalnızca mülakatta üzerine konuşabileceğiniz becerileri ekleyin. Anahtar kelime bulunmanızı sağlar, mülakat ise onu sınar.",
          ] },
        ],
      },
      {
        heading: "Sorunsuz ayrıştırılan bir biçim",
        blocks: [
          { type: "p", text: "Tasarım ağırlıklı CV'ler bilgiyi ayrıştırma aşamasında kaybeder. ATS bir bölümü okuyamazsa, işe alım uzmanının araması o bölümdekileri bulamaz." },
          { type: "ul", items: [
            "Tek sütunlu bir düzen kullanın. Çok sütunlu tasarımlar yanlış sırayla okunabilir.",
            "Metni metin olarak bırakın; görsellerin, ikonların, metin kutularının ya da karmaşık tabloların içine koymayın.",
            "Standart başlıklar kullanın: Deneyim, Eğitim, Beceriler, Projeler.",
            "Word ya da Google Docs'tan metin tabanlı bir PDF alın (tarama ya da fotoğraf değil). Metni seçip kopyalayabiliyorsanız, ayrıştırıcı da genellikle okuyabilir.",
            "Tarihleri tutarlı bir biçimde yazın; örneğin \"Mart 2021 – Halen\".",
          ] },
        ],
      },
      {
        heading: "Kendi CV'nizi nasıl kontrol edersiniz?",
        blocks: [
          { type: "ol", items: [
            "PDF'inizdeki bütün metni kopyalayıp düz bir metin düzenleyicisine yapıştırın. Metin karışık ya da boş çıkıyorsa düzenin sadeleştirilmesi gerekir.",
            "İş ilanını yanına yapıştırın ve tekrar ettiği araçları, becerileri ve unvanları işaretleyin.",
            "Bunlardan hangilerinin CV'nizde aynı ifadeyle geçtiğine bakın.",
          ] },
          { type: "p", text: "CVXray ikinci ve üçüncü adımı otomatikleştirir: CV'nizi bir ayrıştırıcının okuduğu gibi okur, ilanla karşılaştırır ve eksik becerileri önceliğe göre, her birini isteyen ilan satırıyla birlikte listeler." },
        ],
      },
    ],
  },
  {
    slug: "tailor-cv-to-job-description",
    title: "CV'nizi bir iş ilanına göre 15 dakikada nasıl uyarlarsınız?",
    seoTitle: "CV'nizi İş İlanına Göre 15 Dakikada Uyarlayın",
    description:
      "CV'nizi belirli bir iş ilanına uyarlamak için adım adım, pratik bir yöntem: baştan yazmadan ve anahtar kelimeye boğmadan.",
    published: "2026-11-11",
    updated: "2026-11-11",
    minutes: 5,
    relatedRoles: ["frontend-developer", "product-manager", "digital-marketing-specialist"],
    sections: [
      {
        heading: "Uyarlamak neden işe yarar?",
        blocks: [
          { type: "p", text: "CV'nizi okuyan işe alım yöneticisi tek bir soru sorar: bu kişi, pozisyonumuzun gerektirdiği işi yapıyor mu? Genel bir CV, yanıtı ona buldurtur. Uyarlanmış bir CV ise ilk on saniyede yanıt verir: aynı deneyim, onların ilanına göre sıralanmış ve ifade edilmiş olarak." },
          { type: "p", text: "Uyarlamak, geçmişinizi yeniden yazmak değildir. Doğru olan şeylerden hangilerini öne koyacağınızı seçmek ve onları işverenin kelimeleriyle anlatmaktır." },
        ],
      },
      {
        heading: "1. adım: İlanı öncelikleri bulmak için okuyun (3 dakika)",
        blocks: [
          { type: "ul", items: [
            "Her aracın, becerinin, yöntemin ve sertifikanın altını çizin.",
            "Birden fazla kez ya da ilan başlığında geçenleri işaretleyin; öncelikler bunlardır.",
            "Kıdem işaretlerini not edin: deneyim yılı, ekip büyüklüğü, bütçe, kapsam.",
          ] },
        ],
      },
      {
        heading: "2. adım: Açıklarınızı bulun (2 dakika)",
        blocks: [
          { type: "p", text: "Bu listeyi CV'nizle karşılaştırın. Bazı beceriler, sizde olmadığı için eksik olacaktır; onları dışarıda bırakın. Bazıları ise yalnızca hiç yazmadığınız ya da farklı kelimelerle anlattığınız için eksiktir. Hızlı kazanımlar bunlardır." },
          { type: "tip", text: "CVXray bu karşılaştırmayı sizin yerinize yapar: ilanı ve CV'nizi ekleyin; eksik becerileri en yüksek öncelikliden başlayarak, her birini isteyen ilan satırıyla birlikte listeler." },
        ],
      },
      {
        heading: "3. adım: Özetinizi yeniden yazın (3 dakika)",
        blocks: [
          { type: "p", text: "İki satırlık özetiniz ilan başlığını ve en önemli iki üç önceliği yansıtmalıdır: \"React ve TypeScript ile ürün geliştirmede 5 yıllık deneyime sahip, erişilebilirlik ve performansa odaklanan frontend developer.\" İlandaki unvan sizinkinden biraz farklıysa, dürüstçe kullanılabildiği yerde onlarınkini kullanın." },
        ],
      },
      {
        heading: "4. adım: Maddelerinizi yeniden sıralayın ve ifade edin (5 dakika)",
        blocks: [
          { type: "ul", items: [
            "İlanın önceliklerini kanıtlayan maddeleri her pozisyonun en üstüne taşıyın.",
            "Araçlar ve yöntemler için ilandaki adları kullanın.",
            "Ekleyebildiğiniz her maddeye bir rakam ekleyin: ölçek, kazanılan zaman, ciro, kullanıcı sayısı, doğruluk.",
            "Bu pozisyonu desteklemeyen maddeleri çıkarın. Kısa ve ilgili olan, uzun ve eksiksiz olandan iyidir.",
          ] },
        ],
      },
      {
        heading: "5. adım: Beceriler bölümünüzü güncelleyin (2 dakika)",
        blocks: [
          { type: "p", text: "İlanın öncelik verdiği ve gerçekten sahip olduğunuz becerileri, ilanın ifadesiyle, bölümün üst kısmına yazın. Ardından son bir kontrol yapın: listedeki her beceri, yukarıdaki en az bir maddeyle desteklenmelidir." },
        ],
      },
      {
        heading: "Neleri yapmamalısınız?",
        blocks: [
          { type: "ul", items: [
            "İlan metnini CV'nize görünür biçimde ya da beyaz yazıyla yapıştırmayın. İşe alım uzmanları fark eder, güncel sistemler de metni gösterir.",
            "Uyum skorunu yükseltmek için kullanmadığınız becerileri eklemeyin; mülakatta ortaya çıkar.",
            "Aynı \"uyarlanmış\" CV'yi her ilana göndermeyin. İşin özü, başvuru başına on beş dakika ayırmaktır.",
          ] },
        ],
      },
    ],
  },
  {
    slug: "what-is-a-good-cv-match-score",
    title: "İyi bir CV uyum skoru kaçtır ve skorunuzla ne yapmalısınız?",
    seoTitle: "İyi Bir CV Uyum Skoru Kaç Olmalı?",
    description:
      "CV uyum skorları nasıl hesaplanır, %45, %70 ya da %90 gerçekte ne anlama gelir ve başvurmadan önce her düzeyde atılacak sonraki adım nedir?",
    published: "2026-11-11",
    updated: "2026-11-11",
    minutes: 4,
    relatedRoles: ["data-analyst", "ai-engineer", "financial-analyst"],
    sections: [
      {
        heading: "Uyum skoru neyi ölçer?",
        blocks: [
          { type: "p", text: "CV uyum skoru, bir iş ilanının istediklerinin ne kadarının CV'nizde göründüğünü tahmin eder. İşe alınıp alınmayacağınıza dair bir öngörü değildir; örtüşmeyi ölçer. Bir işe alım uzmanının sizi bulup kısa listeye alıp almayacağını belirleyen de bu örtüşmedir." },
          { type: "p", text: "CVXray'in skoru üç bölümden oluşan ağırlıklı bir karşılaştırmadır: ilanın andığı ve CV'nizde de geçen beceriler (%50), CV'nizin ilanın kendi ifadeleriyle örtüşmesi (%35) ve deneyim yılınızın istenenle karşılaştırması (%15). İlanın tekrar ettiği ya da başlığına koyduğu beceriler daha ağır basar." },
        ],
      },
      {
        heading: "Skorunuzu okumak",
        blocks: [
          { type: "ul", items: [
            "%70 ve üzeri: güçlü bir uyum. CV'niz pozisyonun gerektirdiklerinin çoğunu zaten gösteriyor. İlk üçte birlik bölümü cilalayın ve başvurun.",
            "%45–69: rekabetçi. Deneyiminiz büyük olasılıkla var, ama hepsini göstermiyorsunuz. Önce bir iki yüksek öncelikli açığı kapatın.",
            "%45'in altı: önemli açıklar var. Ya pozisyon sizi fazla zorluyor ya da CV'niz farklı türde bir iş için yazılmış. Kapsamlı biçimde uyarlayın ya da doğru pozisyon olup olmadığını düşünün.",
          ] },
          { type: "tip", text: "Skorlar en fazla %95 olabilir. Kusursuz bir %100, ilanı kopyalamak anlamına gelirdi; bu ne hedeftir ne de iyi bir fikir." },
        ],
      },
      {
        heading: "Skorunuz neden beklediğinizden düşük olabilir?",
        blocks: [
          { type: "ul", items: [
            "Farklı ifadeler: CV'nizde \"müşteri elde tutma\", ilanda \"churn azaltma\".",
            "Yalnızca ima edilen beceriler: Docker'ı her gün kullandınız ama kelimeyi hiç yazmadınız.",
            "Çok kısa bir CV ya da çok kısa bir ilan; bu durum her karşılaştırmayı daha az güvenilir kılar.",
            "Tarihi yazılmamış deneyim: yıllar \"5 yıl deneyim\" gibi ifadelerden ya da \"2019 – halen\" gibi tarih aralıklarından okunur.",
          ] },
        ],
      },
      {
        heading: "Skoru dürüstçe nasıl yükseltirsiniz?",
        blocks: [
          { type: "ol", items: [
            "Gerçekten sahip olduğunuz yüksek öncelikli eksik becerilerle başlayın ve onları kanıtlandıkları yere ekleyin: yalnızca beceri listesine değil, bir maddeye.",
            "Araçlar ve yöntemler için ilandaki adları kullanın.",
            "Deneyiminizin sayılabilmesi için pozisyonlarınıza tarihleri ekleyin.",
            "Kontrolü yeniden çalıştırın. Yalnızca ifadeleri değiştirerek 50'lerden 70'lere sıçramak sık görülür.",
          ] },
          { type: "p", text: "Kalan açıklar sahip olmadığınız becerilerse, çözüm daha yüksek bir skor değildir; önerilen kurslar ya da size daha uygun bir pozisyondur." },
        ],
      },
    ],
  },
];

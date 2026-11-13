import type { RoleGuide } from "@/lib/roles";

// Turkish keyword guides. Same order and slugs as src/lib/roles.ts.
export const ROLES: RoleGuide[] = [
  {
    slug: "ai-engineer",
    name: "Yapay Zeka Mühendisi",
    alsoCalled: ["AI Engineer", "LLM Mühendisi", "Üretken Yapay Zeka Mühendisi"],
    metaDescription:
      "Yapay zeka mühendisi CV anahtar kelimeleri: LLM, RAG, embedding, vektör veritabanı, evals. CV'nizi ilanla ücretsiz karşılaştırın.",
    intro:
      "Yapay zeka mühendisliği teknoloji dünyasının en hızlı büyüyen unvanı ve ilanları alışılmadık ölçüde ayrıntılı: hangi model API'leri, hangi retrieval altyapısı, kaliteyi nasıl ölçtüğünüz, ürünü nasıl canlıya aldığınız. İşe alım yöneticileri, bir LLM özelliğini prototipten canlı ortama taşıdığınızı gösteren kanıt arar; yalnızca bir notebook içinde API çağırmış olmanız yetmez.",
    groups: [
      { title: "LLM'ler ve framework'ler", keywords: ["Büyük dil modelleri (LLM)", "OpenAI API", "Anthropic API", "LangChain", "LlamaIndex", "Prompt engineering", "Function calling", "AI agent'lar"] },
      { title: "Retrieval (RAG)", keywords: ["RAG", "Embedding", "Vektör veritabanı", "pgvector", "Pinecone", "Weaviate", "Anlamsal arama", "Chunking"] },
      { title: "Kalite ve dağıtım", keywords: ["Evals", "LLM değerlendirme", "Fine-tuning", "Hugging Face", "Model dağıtımı", "MLOps", "MLflow", "Guardrails"] },
      { title: "Mühendislik temeli", keywords: ["Python", "FastAPI", "TypeScript", "Docker", "AWS", "SQL", "CI/CD", "Git"] },
    ],
    tips: [
      { title: "Canlıya aldığınız bir LLM özelliğini uçtan uca gösterin", text: "\"40 bin destek makalesi üzerinde çalışan, günde 3 bin sorguya yanıt veren bir RAG asistanı geliştirdim\" cümlesi, bir framework listesinden çok daha fazlasını kanıtlar. Modeli, retrieval altyapısını ve ölçeği yazın." },
      { title: "Kaliteyi, gecikmeyi ve maliyeti sayıyla ifade edin", text: "Yapay zeka ekipleri eval'lerle yaşar. \"500 soruluk bir eval setinde yanıt doğruluğunu %71'den %89'a çıkardım, sorgu başına maliyeti %40 düşürdüm\" tam da bir işe alım yöneticisinin aradığı cümledir." },
      { title: "Yazılım mühendisliği tarafını görünür tutun", text: "Yapay zeka mühendisi pozisyonlarının çoğu önce mühendislik pozisyonudur. API'ler, test, CI/CD ve bulut dağıtımı CV'de LLM çalışmalarının yanında yer almalıdır." },
    ],
    faqs: [
      { q: "Yapay zeka mühendisi CV'sine hangi anahtar kelimeler yazılmalı?", a: "Kullandığınız model API'leri ve framework'ler (OpenAI veya Anthropic API, LangChain, LlamaIndex), retrieval terimleri (RAG, embedding, pgvector veya Pinecone gibi bir vektör veritabanı), kalite ve dağıtım terimleri (evals, fine-tuning, MLOps, model dağıtımı) ve mühendislik temelleri: Python, FastAPI, Docker, bulut ve CI/CD." },
      { q: "Yapay zeka mühendisi CV'si ile makine öğrenmesi mühendisi CV'si arasındaki fark nedir?", a: "Makine öğrenmesi mühendisi CV'leri model eğitimine odaklanır: feature engineering, PyTorch veya TensorFlow, model performansı. Yapay zeka mühendisi CV'leri ise büyük dil modelleri üzerine ürün geliştirmeye odaklanır: prompt yazımı, RAG, evals, agent'lar ve LLM özelliklerini kullanıcıya ulaştırmak." },
    ],
  },
  {
    slug: "frontend-developer",
    name: "Frontend Developer",
    alsoCalled: ["Frontend Geliştirici", "Ön Yüz Geliştirici", "React Developer", "UI Developer"],
    metaDescription:
      "Frontend developer CV anahtar kelimeleri: React, TypeScript, Next.js, test, erişilebilirlik. CV'nizi istediğiniz ilanla ücretsiz karşılaştırın.",
    intro:
      "Frontend ilanları anahtar kelime açısından alışılmadık ölçüde yoğundur: bir framework, bir dil, bir stil yaklaşımı, bir test altyapısı ve bir teslim süreci genellikle açıkça adlandırılır. İşe alım uzmanları ve ön eleme yazılımları CV'nizde aynı terimleri arar. Bu yüzden gerçekten kullandığınız araçları ilanın kullandığı kelimelerle yazmak, bu pozisyonda çoğu pozisyona göre daha önemlidir.",
    groups: [
      { title: "Temel diller ve framework'ler", keywords: ["JavaScript", "TypeScript", "React", "Next.js", "Vue", "Angular", "HTML5", "CSS3"] },
      { title: "Stil ve arayüz", keywords: ["Tailwind CSS", "Sass", "CSS Modules", "Responsive tasarım", "Tasarım sistemi", "Storybook", "Figma"] },
      { title: "State ve veri", keywords: ["Redux", "Zustand", "React Query", "REST API", "GraphQL", "WebSocket"] },
      { title: "Kalite ve teslim", keywords: ["Jest", "Cypress", "Playwright", "React Testing Library", "Erişilebilirlik (WCAG)", "Core Web Vitals", "Git", "CI/CD", "GitHub Actions", "Agile / Scrum"] },
    ],
    tips: [
      { title: "Framework'ü sonucun yanına yazın", text: "\"Ödeme sayfasını React ve TypeScript ile yeniden geliştirdim, yüklenme süresini %40 kısalttım\" cümlesi hem anahtar kelimeyi hem kanıtı taşır. Yalın bir beceri listesi yalnızca anahtar kelimeyi taşır." },
      { title: "İlandaki yazımı birebir kullanın", text: "İlanda \"Next.js\" ve \"Tailwind CSS\" yazıyorsa siz de tam olarak öyle yazın; \"NextJS\" veya \"Tailwind\" değil. Basit eleme filtreleri metni harfi harfine eşleştirir." },
      { title: "Gösterişsiz terimleri atlamayın", text: "Erişilebilirlik, test ve CI/CD çoğu frontend ilanında geçer, çoğu frontend CV'sinde ise yoktur. Yaptıysanız yazın." },
    ],
    faqs: [
      { q: "Frontend developer CV'sine hangi anahtar kelimeler yazılmalı?", a: "İlanın adını verdiği teknolojilerle başlayın: genellikle JavaScript, TypeScript ve React ya da başka bir framework. Ardından stil (Tailwind CSS, Sass), veri (REST API, GraphQL), test (Jest, Cypress, Playwright) ve teslim terimlerini (Git, CI/CD, Agile) ekleyin. Yalnızca gerçekten kullandığınız araçları yazın." },
      { q: "Frontend developer CV'sinde kaç anahtar kelime olmalı?", a: "Hedeflenecek bir sayı yoktur. İlgili ilanın tekrar tekrar ya da başlığında andığı becerileri, her biri gerçek deneyimi anlatan bir satırla destekleyerek yazın. Tek bir ilana göre uyarlanmış CV, her framework'ün doldurulduğu CV'den iyidir." },
    ],
  },
  {
    slug: "backend-engineer",
    name: "Backend Developer",
    alsoCalled: ["Backend Geliştirici", "Arka Uç Geliştirici", "Backend Engineer", "API Developer"],
    metaDescription:
      "Backend developer CV anahtar kelimeleri: diller, veritabanları, bulut, container, API tasarımı. CV'nizi ilanla ücretsiz karşılaştırın.",
    intro:
      "Backend ilanları bir kişiyi olduğu kadar bir sistemi de tarif eder: bir dil, bir veritabanı, bir bulut sağlayıcı, bir dağıtım modeli. CV'niz bu tabloya göre okunur. En güçlü backend CV'leri, üzerinde çalışılan her katmanı adıyla yazar ve yanına bir ölçek ya da güvenilirlik rakamı ekler.",
    groups: [
      { title: "Diller ve framework'ler", keywords: ["Python", "Node.js", "Java", "Go", "C#", "Django", "FastAPI", "Express", "Spring Boot"] },
      { title: "Veri ve depolama", keywords: ["SQL", "PostgreSQL", "MySQL", "MongoDB", "Redis", "Kafka", "Elasticsearch", "Veri modelleme"] },
      { title: "Bulut ve altyapı", keywords: ["AWS", "Azure", "Google Cloud", "Docker", "Kubernetes", "Terraform", "Serverless", "CI/CD"] },
      { title: "Mimari ve uygulama", keywords: ["REST API", "GraphQL", "gRPC", "Mikroservis mimarisi", "Event-driven mimari", "Kimlik doğrulama (OAuth, JWT)", "Birim ve entegrasyon testleri", "Observability", "Ölçeklenebilirlik"] },
    ],
    tips: [
      { title: "Ölçeği rakamla yazın", text: "Saniyedeki istek sayısı, satır sayısı, gecikme, erişilebilirlik süresi. \"Günde 2 milyon sorguya hizmet veren bir PostgreSQL şeması tasarladım\" cümlesi, \"PostgreSQL ile çalıştım\" demekten çok daha fazlasını anlatır." },
      { title: "Yalnızca bulutu değil, bulut servislerini de yazın", text: "AWS isteyen ilanlar çoğunlukla belirli servisleri de anar. Lambda, S3 veya RDS kullandıysanız bunları \"AWS\" ile birlikte listeleyin." },
      { title: "Tüm yaşam döngüsünü sahiplendiğinizi gösterin", text: "Tasarım, geliştirme, dağıtım, izleme. Backend ilanları giderek daha çok nöbet (on-call) ve observability deneyimi bekliyor; varsa ekleyin." },
    ],
    faqs: [
      { q: "Backend developer CV'sine hangi anahtar kelimeler yazılmalı?", a: "İlandaki dil ve framework (örneğin Django veya FastAPI ile Python ya da Node.js), kullandığınız veritabanları (PostgreSQL, Redis, MongoDB), bulut ve container deneyiminiz (AWS, Docker, Kubernetes) ve REST API, mikroservis, test gibi mimari terimleri." },
      { q: "Bildiğim bütün programlama dillerini yazmalı mıyım?", a: "Hayır. İlanın istediği ve yarın mülakatına girebileceğiniz dilleri öne alın. Bir kez dokunduğunuz dillerden oluşan uzun bir liste, asıl önemli olanları gölgeler." },
    ],
  },
  {
    slug: "machine-learning-engineer",
    name: "Makine Öğrenmesi Mühendisi",
    alsoCalled: ["Machine Learning Engineer", "ML Engineer", "MLOps Mühendisi"],
    metaDescription:
      "Makine öğrenmesi mühendisi CV anahtar kelimeleri: Python, PyTorch, model eğitimi, MLOps, model dağıtımı. CV'nizi ilanla ücretsiz karşılaştırın.",
    intro:
      "Makine öğrenmesi mühendisi ilanları veri bilimi ile yazılım mühendisliğinin arasında durur: iyi eğitilmiş ve canlı ortamda güvenilir çalışan modeller isterler. Yalnızca notebook'ları ya da yalnızca altyapıyı gösteren CV'ler, elemede bakılanın yarısını kaçırır. En güçlü CV'ler döngünün tamamını gösterir: veri, eğitim, değerlendirme, dağıtım, izleme.",
    groups: [
      { title: "Modelleme", keywords: ["Makine öğrenmesi", "Derin öğrenme", "PyTorch", "TensorFlow", "scikit-learn", "Feature engineering", "Model değerlendirme"] },
      { title: "Veri", keywords: ["Python", "SQL", "Pandas", "Spark", "Veri pipeline'ları", "Airflow", "Feature store"] },
      { title: "MLOps ve dağıtım", keywords: ["MLOps", "Model dağıtımı", "Model serving", "MLflow", "Kubeflow", "SageMaker", "Vertex AI", "Model izleme"] },
      { title: "Mühendislik", keywords: ["Docker", "Kubernetes", "AWS", "CI/CD", "REST API", "Git", "Birim testleri"] },
    ],
    tips: [
      { title: "Canlıdaki bir modeli metriğiyle gösterin", text: "\"Günde 5 milyon tahmin üreten bir sıralama modelini canlıya aldım, tıklama oranını %8 artırdım\" cümlesi modellemeyi, ölçeği ve etkiyi tek satırda anlatır." },
      { title: "MLOps araçlarınızı adıyla yazın", text: "Deney takibi, model registry, serving ve izleme araçları çoğu ilanda açıkça geçer. MLflow, SageMaker veya Vertex AI kolay anahtar kelime eşleşmeleridir." },
      { title: "Yazılım mühendisliğini gizlemeyin", text: "Elemede makine öğrenmesi mühendislerini veri bilimcilerden ayıran şey test, CI/CD, container ve API deneyimidir." },
    ],
    faqs: [
      { q: "Makine öğrenmesi mühendisi CV'sine hangi anahtar kelimeler yazılmalı?", a: "Python ve bir derin öğrenme framework'ü (PyTorch veya TensorFlow), scikit-learn ve feature engineering, SQL ve Spark gibi veri araçları, MLOps ve dağıtım terimleri (MLflow, model serving, izleme, SageMaker veya Vertex AI) ile Docker, Kubernetes ve CI/CD gibi mühendislik temelleri." },
      { q: "Makine öğrenmesi mühendisi CV'si ile veri bilimci CV'si arasındaki fark nedir?", a: "Veri bilimci CV'leri analizi, istatistiği ve deney tasarımını öne çıkarır. Makine öğrenmesi mühendisi CV'leri ise modelleri canlı ortamda kurmayı, dağıtmayı ve işletmeyi öne çıkarır: pipeline'lar, serving, izleme ve yazılım mühendisliği pratikleri." },
    ],
  },
  {
    slug: "software-engineer",
    name: "Yazılım Mühendisi",
    alsoCalled: ["Yazılım Geliştirici", "Yazılım Geliştirme Uzmanı", "Full Stack Developer"],
    metaDescription:
      "Yazılım mühendisi CV anahtar kelimeleri: diller, framework'ler, bulut, test, sistem tasarımı. CV'nizi istediğiniz ilanla ücretsiz karşılaştırın.",
    intro:
      "\"Yazılım mühendisi\" teknoloji dünyasının en geniş unvanıdır; bu yüzden pozisyonu ilanın kendisi tanımlar: bir şirket Java backend'i kasteder, bir diğeri TypeScript ile full stack'i, bir başkası gömülü C++'ı. Genel CV'ler burada zorlanır. Önemli olan anahtar kelimeler ilandaki belirli dil, framework ve platform ile her yazılım ekibinin elemede baktığı mühendislik pratikleridir.",
    groups: [
      { title: "Diller", keywords: ["Java", "Python", "TypeScript", "JavaScript", "C#", "Go", "C++", "Kotlin"] },
      { title: "Framework'ler ve platformlar", keywords: ["React", "Node.js", "Spring Boot", ".NET", "Django", "REST API", "GraphQL", "Mikroservis mimarisi"] },
      { title: "Veri ve bulut", keywords: ["SQL", "PostgreSQL", "MongoDB", "Redis", "AWS", "Azure", "Docker", "Kubernetes"] },
      { title: "Mühendislik pratikleri", keywords: ["Sistem tasarımı", "Veri yapıları ve algoritmalar", "Birim testleri", "Code review", "CI/CD", "Git", "Agile / Scrum", "Clean code"] },
    ],
    tips: [
      { title: "İlanın ana diliyle başlayın", text: "Pozisyon bir Java pozisyonuysa Java, beceri listesinin ortasında değil, özetinizde ve en son işinizde yer almalıdır. İşe alım uzmanları çoğu zaman okudukları ilk dile göre filtreler." },
      { title: "Yalnızca teknolojiyi değil, kapsamı da gösterin", text: "\"Ayda 3 milyon işlemi yöneten ödeme servisini tasarladım\" cümlesi sistem tasarımı yetkinliğine işaret eder. Hem mülakatçılar hem eleme yapanlar bir şeyi uçtan uca geliştirdiğinize dair kanıt arar." },
      { title: "Pratikleri adıyla yazın", text: "Code review, test, CI/CD ve nöbet (on-call) çoğu yazılım mühendisliği ilanında geçer. Her biri için somut tek bir satır, bunları bir listede sıralamaktan iyidir." },
    ],
    faqs: [
      { q: "Yazılım mühendisi CV'sine hangi anahtar kelimeler yazılmalı?", a: "İlanın adını verdiği dil ve framework (örneğin Spring Boot ile Java ya da React ve Node.js ile TypeScript), kullandığınız veritabanları ve bulut platformu ile sistem tasarımı, birim testleri, code review, CI/CD ve Git gibi mühendislik pratikleri." },
      { q: "Yazılım mühendisi CV'sinde veri yapıları ve algoritmalar yazmalı mı?", a: "Tek başına bir anahtar kelime olarak nadiren. Bunu işinizle gösterin: performans iyileştirmeleri, çözdüğünüz ölçekleme sorunları. Algoritma sorularını mülakata bırakın." },
    ],
  },
  {
    slug: "data-scientist",
    name: "Veri Bilimci",
    alsoCalled: ["Data Scientist", "Veri Bilimi Uzmanı", "Makine Öğrenmesi Uzmanı"],
    metaDescription:
      "Veri bilimci CV anahtar kelimeleri: Python, makine öğrenmesi, istatistik, SQL, model dağıtımı. CV'nizi istediğiniz ilanla ücretsiz karşılaştırın.",
    intro:
      "Veri bilimci ilanları aynı anda iki şeyi sınar: modelleme derinliğini (istatistik, makine öğrenmesi, deney tasarımı) ve bir modelin kullanılır hale gelmesi için gereken mühendisliği (SQL, pipeline'lar, dağıtım). Algoritmalarla dolu ama iş etkisinden ya da canlı kullanımdan hiç söz etmeyen CV'ler ön elemede takılır.",
    groups: [
      { title: "Diller ve kütüphaneler", keywords: ["Python", "R", "SQL", "Pandas", "NumPy", "scikit-learn", "PyTorch", "TensorFlow"] },
      { title: "Modelleme ve istatistik", keywords: ["Makine öğrenmesi", "İstatistik", "Regresyon", "Sınıflandırma", "Zaman serisi tahmini", "A/B testi", "Nedensel çıkarım", "Feature engineering"] },
      { title: "Veri ve dağıtım", keywords: ["Spark", "BigQuery", "Snowflake", "Airflow", "MLflow", "Docker", "AWS SageMaker", "Model dağıtımı"] },
      { title: "Yapay zeka ve iletişim", keywords: ["Doğal dil işleme (NLP)", "Büyük dil modelleri (LLM)", "Derin öğrenme", "Veri görselleştirme", "Paydaş iletişimi", "Deney tasarımı"] },
    ],
    tips: [
      { title: "Her modeli, değiştirdiği bir metriğe bağlayın", text: "Eleme yapanların aradığı cümle \"Abonelik iptallerini %12 azaltan bir churn modeli geliştirdim\" gibidir. Model doğruluğu tek başına işin önemli olduğunu göstermez." },
      { title: "Canlıya çıktığını kanıtlayın", text: "Dağıtımdan, izlemeden ya da tahminleri sunan pipeline'dan söz edin. Birçok ilan, yalnızca notebook'ta çalışan adayları işini canlıya alanlardan ayırır." },
      { title: "İlanın ağırlık verdiği yöne uyun", text: "Deney ağırlıklı pozisyonlar A/B testi ve nedensel çıkarım ister; ML mühendisliğine yakın pozisyonlar dağıtım ve MLOps ister. CV'nizin ağırlığını önünüzdeki ilana göre ayarlayın." },
    ],
    faqs: [
      { q: "Veri bilimci CV'sine hangi anahtar kelimeler yazılmalı?", a: "Önce Python ve SQL, ardından kullandığınız kütüphaneler (Pandas, scikit-learn, PyTorch veya TensorFlow), modelleme ve istatistik terimleri (makine öğrenmesi, regresyon, A/B testi, tahminleme) ve ilanın adını verdiği veri ya da dağıtım araçları: Spark, Airflow veya MLflow gibi." },
      { q: "Veri bilimci ile veri analisti anahtar kelimeleri arasındaki fark nedir?", a: "Veri analisti ilanları SQL, dashboard'lar ve Tableau ya da Power BI gibi BI araçları etrafında şekillenir. Veri bilimci ilanları bunlara makine öğrenmesini, istatistiği, Python kütüphanelerini ve model dağıtımını ekler." },
    ],
  },
  {
    slug: "account-executive",
    name: "Satış Yöneticisi",
    alsoCalled: ["Account Executive", "Kurumsal Satış Yöneticisi", "B2B Satış Uzmanı", "Satış Temsilcisi"],
    metaDescription:
      "Satış yöneticisi CV anahtar kelimeleri: satış hedefi, pipeline, Salesforce, potansiyel müşteri, B2B SaaS satışı. CV'nizi ilanla ücretsiz karşılaştırın.",
    intro:
      "Satış ilanları bir karne gibi okunur: hedef (kota), anlaşma büyüklüğü, satış döngüsü, CRM. İşe alım uzmanları satış yöneticisi CV'lerinde aynı şeylere bakar ve bunu hızlı yapar. Rakam yerine görev tanımı anlatan ya da CRM'in adını hiç anmayan bir CV, deneyim güçlü olsa bile kısa listeye nadiren girer.",
    groups: [
      { title: "Satış süreci", keywords: ["B2B satış", "SaaS satışı", "Uçtan uca satış döngüsü", "Potansiyel müşteri bulma", "Soğuk arama", "Lead generation", "Outbound satış", "Satış kapama"] },
      { title: "Sonuçlar ve metrikler", keywords: ["Satış hedefi gerçekleştirme", "Pipeline yönetimi", "Anlaşma büyüklüğü (ACV)", "Kazanma oranı", "Satış tahmini (forecast)", "Ciro artışı", "Üst satış (upsell)", "Sözleşme yenileme"] },
      { title: "Araçlar", keywords: ["Salesforce", "HubSpot", "CRM", "LinkedIn Sales Navigator", "Gong", "Outreach", "Excel"] },
      { title: "Beceriler ve yöntemler", keywords: ["Müzakere", "Müşteri portföy yönetimi", "İş geliştirme", "İhtiyaç analizi görüşmeleri", "MEDDIC", "Çözüm satışı", "Paydaş yönetimi"] },
    ],
    tips: [
      { title: "Her pozisyonu hedef gerçekleştirme oranıyla açın", text: "\"900 bin € hedefe karşılık 1,2 milyon € satış kapadım (%133)\" bir satış müdürünün ilk aradığı şeydir. Bunu her işin sonuna gömmeyin, ilk maddesine yazın." },
      { title: "Anlaşma büyüklüğünü ve döngü süresini belirtin", text: "Orta ölçekli ve kurumsal müşteri pozisyonlarına, gerçekten yürüttüğünüz anlaşmalara bakılarak alım yapılır. Ortalama sözleşme değeri ve döngü süresi, uygun olup olmadığınızı okuyana anında söyler." },
      { title: "CRM'i ve yöntemi adıyla yazın", text: "Salesforce veya HubSpot çoğu ilanda geçer; birçoğu MEDDIC gibi bir nitelendirme yöntemini de anar. Kullanıyorsanız açıkça yazın." },
    ],
    faqs: [
      { q: "Satış yöneticisi CV'sine hangi anahtar kelimeler yazılmalı?", a: "B2B satış veya SaaS satışı, satış hedefi gerçekleştirme, pipeline yönetimi, potansiyel müşteri bulma ve satış kapama, kullandığınız CRM (genellikle Salesforce veya HubSpot), müzakere ve müşteri portföy yönetimi. Her birini kapatılan ciro ya da hedef gerçekleştirme yüzdesi gibi bir rakamla destekleyin." },
      { q: "Satış sonuçlarımı CV'de nasıl gösteririm?", a: "Yöneticinizin takip ettiği metriklerin aynısını kullanın: hedef gerçekleştirme yüzdesi, kapatılan ciro, ortalama anlaşma büyüklüğü, kazanma oranı ve ekip içindeki sıralamanız. Pozisyon başına somut tek bir rakam, bir sorumluluk listesinden iyidir." },
    ],
  },
  {
    slug: "digital-marketing-specialist",
    name: "Dijital Pazarlama Uzmanı",
    alsoCalled: ["Dijital Pazarlama Yöneticisi", "Performans Pazarlama Uzmanı", "Growth Marketing Uzmanı"],
    metaDescription:
      "Dijital pazarlama uzmanı CV anahtar kelimeleri: SEO, Google Ads, içerik, e-posta, analitik, pazarlama otomasyonu. CV'nizi ilanla ücretsiz karşılaştırın.",
    intro:
      "Dijital pazarlama ilanları kanalları ve araçları açıkça adlandırır: SEO, ücretli arama, sosyal medya, e-posta ve bunların arkasındaki analitik ile otomasyon araçları. Kanalı, bütçeyi ya da sonucu belirtmeden \"kampanya yönettim\" diyen genel CV'ler atlanan CV'lerdir.",
    groups: [
      { title: "Kanallar", keywords: ["SEO", "SEM / PPC", "Google Ads", "Meta Ads", "İçerik pazarlama", "E-posta pazarlama", "Sosyal medya pazarlama", "Affiliate pazarlama"] },
      { title: "Analitik ve test", keywords: ["Google Analytics (GA4)", "Google Tag Manager", "A/B testi", "Dönüşüm oranı optimizasyonu (CRO)", "Attribution", "KPI raporlama", "Looker Studio"] },
      { title: "Araçlar ve otomasyon", keywords: ["HubSpot", "Pazarlama otomasyonu", "Mailchimp", "Klaviyo", "Semrush", "Ahrefs", "CMS (WordPress)", "Canva"] },
      { title: "Strateji", keywords: ["Kampanya yönetimi", "Bütçe yönetimi", "Müşteri kazanımı", "Funnel optimizasyonu", "Marka pazarlaması", "Metin yazarlığı", "Growth marketing"] },
    ],
    tips: [
      { title: "Her kanala bir rakam ekleyin", text: "\"Organik trafiği 9 ayda %180 artırdım\" ya da \"Google Ads'te lead başına maliyeti 42 €'dan 19 €'ya düşürdüm\": kanal, metrik ve süre tek satırda." },
      { title: "Yönettiğiniz bütçeyi yazın", text: "Ücretli medya pozisyonlarına harcama düzeyine göre alım yapılır. \"Google ve Meta'da aylık 25 bin € bütçe yönettim\" cümlesi sizi hemen konumlandırır." },
      { title: "İlanın kullandığı araçları listeleyin", text: "GA4, Tag Manager, HubSpot, Semrush: araç adları kolay anahtar kelime eşleşmeleridir ve işe alım uzmanları bunlara göre filtreler." },
    ],
    faqs: [
      { q: "Dijital pazarlama uzmanı CV'sine hangi anahtar kelimeler yazılmalı?", a: "Çalıştığınız kanallar (SEO, Google Ads, Meta Ads, e-posta, içerik, sosyal medya), analitik araçları (GA4, Google Tag Manager), HubSpot gibi otomasyon ve CRM araçları ile dönüşüm oranı optimizasyonu, müşteri kazanımı ve bütçe yönetimi gibi sonuç odaklı terimler." },
      { q: "Pazarlama CV'sinde metrikler yer almalı mı?", a: "Evet. Trafik, dönüşüm oranı, edinme başına maliyet, reklam harcamasının getirisi ve katkı sağlanan ciro, işe alım yöneticilerinin adayları karşılaştırdığı ölçütlerdir. Her pozisyon için en az bir tane ekleyin." },
    ],
  },
  {
    slug: "financial-analyst",
    name: "Finansal Analist",
    alsoCalled: ["Finansal Planlama ve Analiz Uzmanı", "FP&A Uzmanı", "Bütçe ve Raporlama Uzmanı"],
    metaDescription:
      "Finansal analist CV anahtar kelimeleri: finansal modelleme, FP&A, bütçeleme, tahminleme, Excel, Power BI. CV'nizi ilanla ücretsiz karşılaştırın.",
    intro:
      "Finansal analist ilanları bir döngü etrafında kurulur: bütçe, tahmin, dönem kapanışı, raporlama ve bu döngüyü yürütmekte kullanılan araçlar. İşe alım uzmanları CV'nizde aynı kelimeleri ve rakamlarınızın bir kararı değiştirdiğine dair kanıt arar. Neyin, kimin için modellendiğini söylemeden yalnızca \"Excel\" yazan bir CV nadiren öne çıkar.",
    groups: [
      { title: "Planlama ve analiz", keywords: ["FP&A", "Finansal modelleme", "Bütçeleme", "Tahminleme (forecast)", "Sapma analizi", "Senaryo analizi", "Fizibilite (business case)"] },
      { title: "Raporlama ve muhasebe", keywords: ["Yönetim raporlaması", "Ay sonu kapanışı", "Mutabakat", "UFRS", "TFRS", "Gelir tablosu (P&L)", "Nakit akışı"] },
      { title: "Araçlar", keywords: ["Excel (pivot tablo, ileri düzey formüller)", "Power BI", "SQL", "SAP", "Oracle NetSuite", "Anaplan"] },
      { title: "Beceriler", keywords: ["Paydaş yönetimi", "Finansal analiz", "Veriyle hikâye anlatımı", "KPI raporlama", "Maliyet kontrolü", "Süreç iyileştirme"] },
    ],
    tips: [
      { title: "Analizinizin yönlendirdiği kararı gösterin", text: "\"1,8 milyon € değerindeki %6'lık fiyat artışına dayanak olan fiyatlandırma modelini kurdum\" cümlesi, \"finansal modellerden sorumluydum\" demekten çok daha fazlasını anlatır." },
      { title: "Sahiplendiğiniz döngüyü adıyla yazın", text: "Yıllık bütçe, rolling forecast, ay sonu kapanışı: hangilerini yürüttüğünüzü ve ne büyüklükte bir iş için yürüttüğünüzü (ciro, masraf merkezleri, şirket sayısı) belirtin." },
      { title: "Excel ve BI konusunda net olun", text: "\"Excel\" her finans CV'sinde vardır. Düzeyini yazın (finansal modeller, pivot tablolar, Power Query) ve ilanın adını verdiği BI aracını ekleyin; örneğin Power BI." },
    ],
    faqs: [
      { q: "Finansal analist CV'sine hangi anahtar kelimeler yazılmalı?", a: "FP&A, finansal modelleme, bütçeleme, tahminleme ve sapma analizi; yönetim raporlaması, ay sonu kapanışı, UFRS veya GAAP gibi raporlama terimleri; ve ilanın adını verdiği araçlar: neredeyse her zaman Excel, sıklıkla Power BI, SQL ya da SAP gibi bir ERP." },
      { q: "Finans CV'sinde etkimi nasıl gösteririm?", a: "İşinizi paraya ya da kararlara bağlayın: tespit edilen tasarruf, iyileşen tahmin doğruluğu, sahiplendiğiniz bir bütçe, onaylanan bir fizibilite çalışması. Pozisyon başına somut tek bir rakam yeterlidir." },
    ],
  },
  {
    slug: "project-manager",
    name: "Proje Yöneticisi",
    alsoCalled: ["BT Proje Yöneticisi", "Program Yöneticisi", "Proje Lideri"],
    metaDescription:
      "Proje yöneticisi CV anahtar kelimeleri: planlama, risk yönetimi, paydaş yönetimi, Agile, PMP, bütçe. CV'nizi istediğiniz ilanla ücretsiz karşılaştırın.",
    intro:
      "Proje yöneticisi ilanlarında elemede üç şeye bakılır: kullandığınız yöntemler, teslim ettiğiniz işin büyüklüğü ve insanları ve riski nasıl yönettiğiniz. İşe alım uzmanları yöntem adlarını (Agile, Scrum, PRINCE2, PMP) ve kaldırabileceğiniz ölçeği gösteren rakamları arar: bütçe, ekip büyüklüğü, takvim.",
    groups: [
      { title: "Yöntemler ve sertifikalar", keywords: ["Proje yönetimi", "Agile", "Scrum", "Waterfall", "PRINCE2", "PMP", "Kanban"] },
      { title: "Teslimat", keywords: ["Proje planlama", "Kapsam yönetimi", "Risk yönetimi", "Bütçe yönetimi", "Kaynak planlama", "Kilometre taşları", "Değişim yönetimi"] },
      { title: "İnsan yönetimi", keywords: ["Paydaş yönetimi", "Çapraz fonksiyonlu ekipler", "Tedarikçi yönetimi", "İletişim", "Durum raporlaması", "Yönlendirme komitesi"] },
      { title: "Araçlar", keywords: ["Jira", "Confluence", "MS Project", "Asana", "Smartsheet", "Excel"] },
    ],
    tips: [
      { title: "Ölçek ve sonuçla başlayın", text: "\"4 ülkeyi kapsayan 2 milyon €'luk bir ERP geçişini zamanında ve bütçenin %6 altında tamamladım\" cümlesi, bir işe alım yöneticisine neyi taşıyabileceğinizi tam olarak söyler." },
      { title: "Yöntemi ve sertifikayı adıyla yazın", text: "PRINCE2, PMP, Scrum Master: sahipseniz üst kısma yakın bir yere yazın. Birçok ilan bunlara göre filtreler." },
      { title: "Riski nasıl yönettiğinizi gösterin", text: "Erken fark ettiğiniz bir riski ve aldığınız aksiyonu anlatan tek bir satır, kıdeminizi bir araç listesinden daha iyi gösterir." },
    ],
    faqs: [
      { q: "Proje yöneticisi CV'sine hangi anahtar kelimeler yazılmalı?", a: "Proje yönetimi, kullandığınız yöntemler (Agile, Scrum, Waterfall, PRINCE2), PMP gibi sertifikalar, teslimat terimleri (planlama, kapsam, risk ve bütçe yönetimi), insan yönetimi becerileri (paydaş ve tedarikçi yönetimi) ve projeleri yürüttüğünüz araçlar: genellikle Jira, Confluence veya MS Project." },
      { q: "CV'de PMP mi PRINCE2 mi daha iyi durur?", a: "İlan hangisini anıyorsa onu kullanın. PRINCE2 Birleşik Krallık ve Avrupa'da, PMP ise ABD'de ve küresel şirketlerde daha yaygındır. İkisi de değerlidir ve işverenin istediğini yazmak doğrudan bir anahtar kelime eşleşmesi sağlar." },
    ],
  },
  {
    slug: "recruiter",
    name: "İşe Alım Uzmanı",
    alsoCalled: ["Yetenek Kazanımı Uzmanı", "Recruiter", "Teknik İşe Alım Uzmanı", "Seçme ve Yerleştirme Uzmanı"],
    metaDescription:
      "İşe alım uzmanı CV anahtar kelimeleri: aday araştırma, uçtan uca işe alım, ATS, paydaş yönetimi, işe alım süresi. CV'nizi ilanla ücretsiz karşılaştırın.",
    intro:
      "İşe alım uzmanları bütün gün ilan yazar, ama kendi CV'leri çoğu zaman yığındaki en belirsiz CV'lerdir. Yetenek kazanımı pozisyonlarında elemede şunlara bakılır: yönettiğiniz işe alım hacmi, hangi pozisyonlar için alım yaptığınız, aday bulmakta kullandığınız araçlar ve hangi metriklerle ölçüldüğünüz.",
    groups: [
      { title: "İşe alım", keywords: ["Uçtan uca işe alım", "Aday araştırma (sourcing)", "Headhunting", "Teknik işe alım", "Aday ön eleme", "Mülakat", "Teklif görüşmesi"] },
      { title: "Araçlar", keywords: ["Aday takip sistemi (ATS)", "Greenhouse", "Workday", "LinkedIn Recruiter", "Boolean arama", "Lever", "Excel"] },
      { title: "Metrikler", keywords: ["İşe alım süresi (time to hire)", "İşe alım başına maliyet", "Teklif kabul oranı", "Aday havuzu raporlaması", "İşe alım kalitesi", "İşe alım hedefleri"] },
      { title: "İş ortaklığı", keywords: ["Paydaş yönetimi", "İşe alım yöneticileriyle iş birliği", "İşveren markası", "Aday deneyimi", "Çeşitlilik odaklı işe alım", "Oryantasyon (onboarding)"] },
    ],
    tips: [
      { title: "İşe alımlarınızı sayıyla ifade edin", text: "\"12 ayda %92 teklif kabul oranıyla 45 mühendis işe aldım\" cümlesi, işe alım uzmanı için satış hedefinin karşılığıdır; en başa yazın." },
      { title: "Hangi pozisyonlar için alım yaptığınızı söyleyin", text: "Teknoloji, satış, üst düzey yönetici, toplu alım: ilanlar genellikle bir alanda uzmanlaşır, özetiniz de öyle olmalı." },
      { title: "ATS'yi ve aday araştırma araçlarını listeleyin", text: "Greenhouse, Workday, LinkedIn Recruiter ve Boolean arama, yetenek kazanımı ilanlarında doğrudan anahtar kelime eşleşmeleridir." },
    ],
    faqs: [
      { q: "İşe alım uzmanı CV'sine hangi anahtar kelimeler yazılmalı?", a: "Uçtan uca işe alım, aday araştırma ve alım yaptığınız pozisyonlar; kullandığınız aday takip sistemi ve aday araştırma araçları (Greenhouse, Workday, LinkedIn Recruiter, Boolean arama); işe alım süresi ve teklif kabul oranı gibi metrikler; paydaş yönetimi ve işveren markası gibi iş ortaklığı terimleri." },
      { q: "İşe alım uzmanı CV'sinde sonuçlarını nasıl göstermeli?", a: "İşe alım rakamlarını kullanın: kapatılan pozisyon sayısı, işe alım süresi, teklif kabul oranı, işe alım başına maliyet ya da tutturulan işe alım hedefleri. Bir sonraki yöneticiniz sizi bu metriklerle değerlendirecektir." },
    ],
  },
  {
    slug: "customer-success-manager",
    name: "Müşteri Başarı Yöneticisi",
    alsoCalled: ["Customer Success Manager", "Müşteri Yöneticisi", "Müşteri Başarı Uzmanı"],
    metaDescription:
      "Müşteri başarı yöneticisi CV anahtar kelimeleri: müşteri elde tutma, churn, onboarding, yenileme, upsell, CRM. CV'nizi ilanla ücretsiz karşılaştırın.",
    intro:
      "Müşteri başarısı ilanları elde tutma üzerinden ölçülür: churn, yenilemeler, büyüme geliri ve müşteri sağlığı. İşe alım uzmanları yönettiğiniz portföyün büyüklüğüne, yürüttüğünüz süreçlere (onboarding, QBR'lar, yenilemeler) ve bunların arkasındaki araçlara bakar. Elde tutma rakamı içermeyen bir müşteri başarı yöneticisi CV'si kolayca geçilir.",
    groups: [
      { title: "Elde tutma ve büyüme", keywords: ["Müşteri elde tutma", "Churn azaltma", "Sözleşme yenileme", "Üst satış (upsell)", "Büyüme geliri (expansion revenue)", "Net gelir elde tutma (NRR)"] },
      { title: "Müşteri yaşam döngüsü", keywords: ["Onboarding", "Ürün benimseme (adoption)", "Üç aylık iş değerlendirmeleri (QBR)", "Müşteri sağlık skoru", "Eskalasyon yönetimi", "Müşteri yolculuğu"] },
      { title: "Araçlar", keywords: ["Salesforce", "HubSpot", "Gainsight", "Zendesk", "Intercom", "CRM", "Excel"] },
      { title: "Beceriler", keywords: ["Müşteri portföy yönetimi", "Paydaş yönetimi", "SaaS", "Ürün bilgisi", "İletişim", "Müzakere"] },
    ],
    tips: [
      { title: "Elde tutmayı en başa yazın", text: "\"40 müşteriden oluşan 3 milyon €'luk bir portföyü %96 brüt elde tutma ve %118 NRR ile yönettim\" işe alım yöneticilerinin gözüyle taradığı satırdır." },
      { title: "Yürüttüğünüz süreçleri gösterin", text: "Onboarding programları, QBR'lar, sağlık skorlaması, yenileme playbook'ları: bunları ve ürettikleri sonucu adıyla yazın." },
      { title: "Müşteri başarısı araçlarınızı adıyla yazın", text: "Gainsight, Salesforce, HubSpot veya Zendesk çoğu ilanda geçer ve kolay anahtar kelime eşleşmeleridir." },
    ],
    faqs: [
      { q: "Müşteri başarı yöneticisi CV'sine hangi anahtar kelimeler yazılmalı?", a: "Müşteri elde tutma, churn azaltma, yenilemeler, upsell ve NRR; onboarding, ürün benimseme, QBR ve sağlık skoru gibi yaşam döngüsü terimleri; kullandığınız araçlar (Gainsight, Salesforce, HubSpot, Zendesk); müşteri portföy yönetimi ve paydaş yönetimi." },
      { q: "Müşteri başarısı CV'sinde hangi metrikler yer almalı?", a: "Brüt ve net gelir elde tutma, churn oranı, yenileme oranı, büyüme geliri, yönetilen müşteri sayısı ve portföy değeri ile NPS gibi müşteri memnuniyeti skorları." },
    ],
  },
  {
    slug: "data-analyst",
    name: "Veri Analisti",
    alsoCalled: ["İş Analisti", "İş Zekâsı (BI) Uzmanı", "Raporlama ve Analitik Uzmanı"],
    metaDescription:
      "Veri analisti CV anahtar kelimeleri: SQL, Python, Tableau, Power BI, A/B testi. CV'nizi istediğiniz iş ilanıyla ücretsiz karşılaştırın.",
    intro:
      "Veri analisti ilanları üç bölüme ayrılır: veriyi nasıl elde ettiğiniz (SQL, veri ambarları), nasıl analiz ettiğiniz (Python, istatistik) ve nasıl aktardığınız (dashboard'lar, paydaşlar). Yalnızca araçları anlatıp iş sonucunu atlayan CV'ler, nitelikli analistlerin elenmesinin en yaygın nedenidir.",
    groups: [
      { title: "Sorgulama ve veri ambarları", keywords: ["SQL", "PostgreSQL", "BigQuery", "Snowflake", "Redshift", "ETL", "dbt", "Veri modelleme"] },
      { title: "Analiz", keywords: ["Veri analizi", "Python", "Pandas", "NumPy", "R", "Excel", "İstatistik", "A/B testi", "Regresyon", "Tahminleme"] },
      { title: "Görselleştirme ve BI", keywords: ["Tableau", "Power BI", "Looker", "Dashboard", "Veri görselleştirme", "KPI raporlama"] },
      { title: "İş becerileri", keywords: ["Paydaş yönetimi", "Gereksinim analizi", "Veriyle hikâye anlatımı", "Ürün analitiği", "Veri kalitesi"] },
    ],
    tips: [
      { title: "Dashboard'la değil, kararla başlayın", text: "\"Tableau'da 300 bin € değerinde bir fiyat değişikliğine yol açan bir churn dashboard'u kurdum\" cümlesi, \"Tableau'da dashboard'lar hazırladım\" demekten iyidir." },
      { title: "SQL düzeyinizi somut biçimde belirtin", text: "Kullanıyorsanız window function'lardan, CTE'lerden ya da sorgu optimizasyonundan söz edin. Tek başına \"SQL\", sizi tek bir SELECT yazmış birinden ayırmaz." },
      { title: "BI aracını birebir eşleştirin", text: "Tableau, Power BI ve Looker bir anahtar kelime filtresi için birbirinin yerine geçmez. Kullandıysanız ilandaki aracı, kullanmadıysanız en yakın muadilini yazın." },
    ],
    faqs: [
      { q: "Veri analisti CV'sine hangi anahtar kelimeler yazılmalı?", a: "Önce SQL, çünkü neredeyse her ilanda geçer. Ardından kullandığınız analiz araçları (Python, Pandas, Excel, R), ilanın adını verdiği BI aracı (Tableau, Power BI veya Looker), A/B testi ve istatistik gibi yöntemler ile paydaş yönetimi ve KPI raporlama gibi iş terimleri." },
      { q: "Veri analistinin CV'sinde Python olmalı mı?", a: "Birçok ilan Python ister, bazıları yalnızca SQL ve bir BI aracı arar. İlgili ilana bakın: Python aranan nitelikler arasındaysa, onu ne için kullandığınızı gösteren bir örnekle birlikte ekleyin." },
    ],
  },
  {
    slug: "product-manager",
    name: "Ürün Yöneticisi",
    alsoCalled: ["Product Manager", "Product Owner", "Teknik Ürün Yöneticisi"],
    metaDescription:
      "Ürün yöneticisi CV anahtar kelimeleri: yol haritası, discovery, metrikler, paydaş yönetimi, Agile. CV'nizi istediğiniz ilanla ücretsiz karşılaştırın.",
    intro:
      "Ürün yöneticisi ilanlarında araç adı azdır, süreç ve sonuç dili çoktur; bu da sezgiyle eşleştirmeyi zorlaştırır. Önemli olan terimler, ekibin neyi geliştireceğine nasıl karar verdiğini, ürünü nasıl çıkardığını ve başarıyı nasıl ölçtüğünü anlatan terimlerdir. CV'nizde de aynı söz dağarcığı, yanında rakamlarla yer almalıdır.",
    groups: [
      { title: "Strateji ve keşif", keywords: ["Ürün stratejisi", "Ürün yol haritası", "Product discovery", "Kullanıcı araştırması", "Müşteri görüşmeleri", "Pazar analizi", "Önceliklendirme", "OKR"] },
      { title: "Teslimat", keywords: ["Agile", "Scrum", "Kanban", "Backlog yönetimi", "Kullanıcı hikayeleri", "Sprint planlama", "Go-to-market", "Çapraz fonksiyonlu ekipler"] },
      { title: "Veri ve metrikler", keywords: ["KPI", "A/B testi", "Ürün analitiği", "SQL", "Dönüşüm", "Elde tutma (retention)", "Deney tasarımı"] },
      { title: "Araçlar ve iş birliği", keywords: ["Jira", "Confluence", "Figma", "Amplitude", "Mixpanel", "Paydaş yönetimi", "İletişim"] },
    ],
    tips: [
      { title: "Her maddede bir metrik olsun", text: "Benimseme, ciro, elde tutma, dönüşüm, kazanılan zaman. Rakam içermeyen bir ürün yöneticisi CV'si, proje koordinatörü CV'si gibi okunur." },
      { title: "İlanın süreç kelimelerini kullanın", text: "İlanda \"discovery\", \"OKR\" ve \"deney\" geçiyorsa, dürüstçe karşılık geldiği yerlerde işinizi bu terimlerle anlatın." },
      { title: "Neyi geliştirmemeye karar verdiğinizi gösterin", text: "Önceliklendirme bu işin özüdür. Yaptığınız bir ödünleşimi ve nedenini anlatan tek bir satır, kıdeminizi bir lansman listesinden daha iyi gösterir." },
    ],
    faqs: [
      { q: "Ürün yöneticisi CV'sine hangi anahtar kelimeler yazılmalı?", a: "Yol haritası, ürün stratejisi, discovery, önceliklendirme, paydaş yönetimi, Agile veya Scrum ve sorumlu olduğunuz metrikler (elde tutma, dönüşüm, ciro). İlanın adını verdiği araçları ekleyin: çoğunlukla Jira, Figma ve Amplitude ya da Mixpanel gibi bir analitik ürünü." },
      { q: "Ürün yöneticilerinin CV'sinde teknik anahtar kelimeler olmalı mı?", a: "Teknik ürün yöneticisi pozisyonları için evet: API, SQL ve sistem tasarımı terimleri aranan nitelikler arasında sıkça yer alır. Diğer ürün yöneticisi pozisyonlarında ise analitik ve deney terimleri genellikle mühendislik terimlerinden daha önemlidir." },
    ],
  },
  {
    slug: "devops-engineer",
    name: "DevOps Mühendisi",
    alsoCalled: ["DevOps Engineer", "Site Reliability Engineer (SRE)", "Platform Mühendisi", "Bulut Mühendisi"],
    metaDescription:
      "DevOps mühendisi CV anahtar kelimeleri: Kubernetes, Terraform, AWS, CI/CD, izleme. CV'nizi istediğiniz iş ilanıyla ücretsiz karşılaştırın.",
    intro:
      "DevOps ilanları mühendislik pozisyonları içinde araç adı en yoğun olanlardır ve araçlar şirketten şirkete değişir: bir ekibin Terraform ve GitHub Actions'ı, bir başkasının Pulumi ve GitLab CI'ıdır. CV'nizin okunmasını sağlayan şey, onu ilandaki araç zincirine göre uyarlamak ve altındaki aktarılabilir pratiği de göstermektir.",
    groups: [
      { title: "Bulut ve container", keywords: ["AWS", "Azure", "Google Cloud", "Docker", "Kubernetes", "Helm", "Serverless"] },
      { title: "Infrastructure as code ve otomasyon", keywords: ["Terraform", "Ansible", "CloudFormation", "Pulumi", "Bash", "Python", "GitOps"] },
      { title: "CI/CD", keywords: ["GitHub Actions", "GitLab CI", "Jenkins", "Argo CD", "Deployment pipeline'ları", "Sürüm otomasyonu"] },
      { title: "Güvenilirlik ve güvenlik", keywords: ["Linux", "İzleme (monitoring)", "Prometheus", "Grafana", "Datadog", "Olay müdahalesi (incident response)", "SLO", "Ağ (networking)", "Güvenlik / DevSecOps"] },
    ],
    tips: [
      { title: "Güvenilirliği ve hızı sayıyla ifade edin", text: "Deployment sıklığı, lead time, erişilebilirlik süresi, kurtarma süresi, sağlanan maliyet tasarrufu. \"Deploy süresini 45 dakikadan 6 dakikaya indirdim\" mülakat getiren türden bir satırdır." },
      { title: "Muadil araçlar arasında açıkça köprü kurun", text: "İlan GitLab CI istiyor ve siz GitHub Actions biliyorsanız, kendi aracınızı yazın ve genel bir ifadeyle \"CI/CD pipeline'ları\" da deyin; böylece uyumu hem filtre hem insan görür." },
      { title: "İlan istiyorsa sertifikaları listeleyin", text: "AWS, Azure ve Kubernetes (CKA) sertifikaları aranan nitelikler arasında sıkça geçer; sahipseniz kolay anahtar kelime eşleşmeleridir." },
    ],
    faqs: [
      { q: "DevOps mühendisi CV'sine hangi anahtar kelimeler yazılmalı?", a: "Bulut platformunuz (AWS, Azure veya Google Cloud), Docker ve Kubernetes, Terraform gibi bir infrastructure as code aracı, CI/CD sisteminiz (GitHub Actions, GitLab CI veya Jenkins), Linux, Bash veya Python ile betik yazımı ve Prometheus ile Grafana gibi izleme araçları." },
      { q: "CV'de DevOps ile SRE aynı şey mi?", a: "Araç zincirleri büyük ölçüde örtüşür, ancak SRE ilanları güvenilirlik diline daha çok ağırlık verir: SLO'lar, olay müdahalesi, nöbet (on-call), kapasite planlama. Başvurduğunuz unvanın söz dağarcığını kullanın." },
    ],
  },
  {
    slug: "ux-designer",
    name: "UX Tasarımcısı",
    alsoCalled: ["UX/UI Tasarımcısı", "Ürün Tasarımcısı", "Kullanıcı Deneyimi Tasarımcısı"],
    metaDescription:
      "UX tasarımcısı CV anahtar kelimeleri: Figma, kullanıcı araştırması, prototipleme, kullanılabilirlik testi. CV'nizi ilanla ücretsiz karşılaştırın.",
    intro:
      "Bir UX tasarımcısının portfolyosu işi gösterir, ama portfolyonun açılmasını sağlayan CV'dir. İlanlar belirli yöntemleri (araştırma, test, prototipleme) ve araçları (neredeyse her zaman Figma) adıyla anar. Aynı süreci farklı kelimelerle anlatan bir CV, güçlü deneyime rağmen bunlara karşı düşük skor alabilir.",
    groups: [
      { title: "Araştırma", keywords: ["Kullanıcı araştırması", "Kullanılabilirlik testi", "Kullanıcı görüşmeleri", "Persona", "Kullanıcı yolculuğu haritalama", "Anket", "Rakip analizi"] },
      { title: "Tasarım", keywords: ["Wireframe", "Prototipleme", "Etkileşim tasarımı", "Bilgi mimarisi", "Görsel tasarım", "Responsive tasarım", "Tasarım sistemi"] },
      { title: "Araçlar", keywords: ["Figma", "Sketch", "Adobe XD", "Miro", "FigJam", "Maze"] },
      { title: "İş birliği ve standartlar", keywords: ["Erişilebilirlik (WCAG)", "Design thinking", "Agile", "Geliştiriciye teslim (handoff)", "Paydaş yönetimi", "A/B testi"] },
    ],
    tips: [
      { title: "Tasarımın sonucunu anlatın", text: "Görev tamamlama, dönüşüm, destek talepleri, memnuniyet skorları. \"Onboarding'i yeniden tasarladım, aktivasyonu %31'den %44'e çıkardım\" cümlesi yalnızca vaka çalışmasında değil, CV'de de yer almalıdır." },
      { title: "Yöntemlerinizi açık adlarıyla yazın", text: "Yalnızca \"araştırma\" demek yerine \"kullanılabilirlik testi\" ve \"kullanıcı görüşmeleri\" yazın; ilanlar bunları ayrı ayrı sayar, anahtar kelime filtreleri de öyle." },
      { title: "CV'yi metin tabanlı tutun", text: "Yoğun tasarımlı bir PDF, ayrıştırılırken metnini kaybedebilir. Başvurular için temiz, tek sütunlu bir düzen kullanın; görselliği portfolyo taşısın." },
    ],
    faqs: [
      { q: "UX tasarımcısı CV'sine hangi anahtar kelimeler yazılmalı?", a: "Figma, kullanıcı araştırması, kullanılabilirlik testi, wireframe, prototipleme, etkileşim tasarımı ve tasarım sistemi çoğu ilanı karşılar. Deneyiminiz varsa erişilebilirlik (WCAG), kullanıcı yolculuğu haritalama ve geliştiriciye teslim (handoff) ile Agile gibi iş birliği terimlerini ekleyin." },
      { q: "UX tasarımcısının CV'si görsel olarak tasarlanmış olmalı mı?", a: "Gösterişli olmasındansa temiz ve okunaklı olsun. Görsellerin içindeki metin ya da karmaşık çok sütunlu düzenler PDF ayrıştırılırken çoğu zaman kaybolur; böylece anahtar kelimeler işe alım uzmanının aramasına hiç ulaşmaz." },
    ],
  },
  // Sağlık ve lojistik: anahtar kelimeler, skor motorunun tanıdığı Türkçe ifadelerle yazıldı
  // (LOCALIZED_SKILL_ALIASES.healthcare / .logistics, src/lib/languages.ts).
  {
    slug: "registered-nurse",
    name: "Hemşire",
    alsoCalled: ["Servis Hemşiresi", "Klinik Hemşiresi", "Yataklı Servis Hemşiresi"],
    metaDescription:
      "Hemşire CV anahtar kelimeleri: hasta bakımı, ilaç uygulamaları, enfeksiyon kontrolü, temel yaşam desteği. CV'nizi ilanla ücretsiz karşılaştırın.",
    intro:
      "Hemşirelik ilanları bir çalışma ortamı ve bir dizi klinik görev etrafında yazılır: birim, hasta grubu, kayıt sistemi, sertifikalar. Hastanelerin işe alım uzmanları başvuru sistemlerinde tam bu terimleri arar. İlanın \"hasta bakımı\" ve \"ilaç uygulamaları\" dediği yerde \"hastalarla ilgilendim\" yazan bir CV, serviste geçen yıllara rağmen atlanabilir.",
    groups: [
      { title: "Klinik bakım", keywords: ["Hasta bakımı", "İlaç uygulamaları", "Yaşamsal bulgu takibi", "Yara bakımı", "Bakım planı", "Hasta değerlendirme", "IV tedavi", "Hasta eğitimi"] },
      { title: "Kayıt ve mevzuata uyum", keywords: ["Elektronik sağlık kayıtları", "Hastane bilgi yönetim sistemi (HBYS)", "Hemşirelik kayıtları", "Hasta mahremiyeti", "Enfeksiyon kontrolü", "Hasta güvenliği", "Bakım koordinasyonu"] },
      { title: "Diploma ve sertifikalar", keywords: ["Hemşirelik lisans diploması", "Hemşirelik mesleki tescili", "Temel Yaşam Desteği (BLS)", "İleri Kardiyak Yaşam Desteği (ACLS)", "Pediatrik İleri Yaşam Desteği (PALS)", "NCLEX-RN"] },
      { title: "Birimler ve ekip çalışması", keywords: ["Akut bakım", "Dahiliye-cerrahi servisi", "Yoğun bakım", "Acil servis", "Taburculuk planlaması", "Multidisipliner ekip", "Rehber hemşirelik", "Sorumlu hemşire"] },
    ],
    tips: [
      { title: "Birimi, hemşire-hasta oranını ve hasta grubunu belirtin", text: "\"32 yataklı dahiliye-cerrahi servisinde, 1:5 oranla servis hemşiresi\" ifadesi, bir sorumlu hemşireye \"deneyimli hemşire\" sözünün asla anlatamayacağını tek satırda anlatır. Önce çalışma ortamına ve hasta yüküne bakılır." },
      { title: "Sertifikaları kısaltmasıyla birlikte açık adıyla yazın", text: "\"Temel Yaşam Desteği (BLS)\" iki biçimde yapılan aramayla da eşleşir. Belgeyi veren kurumu ve geçerlilik tarihini ekleyin; süresi dolmuş bir sertifika yaygın bir ret nedenidir." },
      { title: "Kayıt sistemini adıyla yazın", text: "İlanlar çoğu zaman Epic veya Cerner gibi belirli bir elektronik kayıt sistemi ister. O sistemde kayıt tuttuysanız \"bilgisayar bilgisi\" yazmak yerine sistemin adını \"hemşirelik kayıtları\" ifadesinin yanına ekleyin." },
    ],
    faqs: [
      { q: "Hemşire CV'sine hangi anahtar kelimeler yazılmalı?", a: "Hasta bakımı, ilaç uygulamaları, yaşamsal bulgu takibi, yara bakımı, bakım planı ve hemşirelik kayıtları çoğu ilanın saydığı görevleri karşılar. Kullandığınız kayıt sistemini (elektronik sağlık kayıtları, Epic), uyum terimlerini (hasta mahremiyeti, enfeksiyon kontrolü) ve diploma ile sertifikalarınızı ekleyin: hemşirelik diploması, temel yaşam desteği ve ACLS ya da PALS gibi uzmanlık sertifikaları." },
      { q: "Hemşire CV'sinde bütün sertifikalar yazılmalı mı?", a: "Geçerliliği süren ve ilanın istediği sertifikaları, her birinin geçerlilik tarihiyle birlikte yazın. Diploma ve sertifikaları üst kısma yakın bir yere koyun: hemşirelik pozisyonlarında bunlar bir ayrıntı değil, olmazsa olmaz koşuldur." },
    ],
  },
  {
    slug: "logistics-coordinator",
    name: "Lojistik Uzmanı",
    alsoCalled: ["Lojistik Koordinatörü", "Tedarik Zinciri Uzmanı", "Lojistik Operasyon Uzmanı", "Sevkiyat Planlama Uzmanı"],
    metaDescription:
      "Lojistik uzmanı CV anahtar kelimeleri: tedarik zinciri yönetimi, stok yönetimi, WMS, navlun, satın alma. CV'nizi ilanla ücretsiz karşılaştırın.",
    intro:
      "Lojistik ve tedarik zinciri ilanları operasyonun haritası gibi okunur: hangi akışları yöneteceğiniz (giriş lojistiği, depo, nakliye), hangi sistemleri kullanacağınız (bir ERP, bir WMS, bir TMS) ve hangi rakamlarla değerlendirileceğiniz. İşe alım uzmanları CV'nizde aynı sistemleri ve aynı metrikleri arar; bu yüzden bunları bir hacim ya da maliyet rakamıyla birlikte yazmak işin büyük kısmını halleder.",
    groups: [
      { title: "Planlama ve stok", keywords: ["Tedarik zinciri yönetimi", "Stok yönetimi", "Talep planlama", "S&OP", "Satın alma", "Tahminleme", "Sipariş karşılama"] },
      { title: "Nakliye ve depolama", keywords: ["Navlun", "Depo yönetimi", "3PL", "Filo yönetimi", "Son kilometre teslimat", "Rota planlama", "Gümrükleme", "Incoterms"] },
      { title: "Sistemler", keywords: ["WMS", "SAP MM", "ERP", "TMS", "Excel", "Power BI", "EDI"] },
      { title: "Performans ve uygulama", keywords: ["Zamanında ve eksiksiz teslimat (OTIF)", "Maliyet düşürme", "KPI raporlama", "Tedarikçi yönetimi", "Taşıyıcı firmalarla pazarlık", "Yalın (Lean)", "Sürekli iyileştirme"] },
    ],
    tips: [
      { title: "Her satıra bir hacim ekleyin", text: "Haftalık sevkiyat sayısı, SKU sayısı, depo büyüklüğü, navlun harcaması. \"4 taşıyıcı firmayla haftada 120 çıkış sevkiyatını koordine ettim\" cümlesi, yönetebileceğiniz operasyonun ölçeğini gösterir." },
      { title: "Kategoriyi değil, sistemi adıyla yazın", text: "\"SAP MM\" ya da kullandığınız WMS bir ilanla eşleşir; \"ERP yazılımı\" çok daha az eşleşir. İkisi de bulunsun diye genel terimi de yanına ekleyin." },
      { title: "İyileştirdiğiniz metriği gösterin", text: "Zamanında teslimat, sevkiyat başına maliyet, stok doğruluğu, tedarik süresi. \"OTIF oranını %91'den %97'ye çıkardım\" bir lojistik müdürünün aradığı cümledir." },
    ],
    faqs: [
      { q: "Lojistik uzmanı CV'sine hangi anahtar kelimeler yazılmalı?", a: "Tedarik zinciri yönetimi, stok yönetimi, navlun, depo yönetimi ve satın alma çoğu ilanı karşılar. Kullandığınız sistemleri (bir WMS, SAP MM ya da başka bir ERP, bir TMS), talep planlama ve S&OP gibi planlama terimlerini ve ölçüldüğünüz metrikleri ekleyin: zamanında teslimat, maliyet ve stok doğruluğu." },
      { q: "Lojistik CV'si ile tedarik zinciri CV'si arasındaki fark nedir?", a: "Lojistik ilanları malların taşınması ve depolanması etrafında şekillenir: navlun, taşıyıcılar, depolama, son kilometre teslimat. Tedarik zinciri ilanları daha geniştir; planlama ve tedariki de ekler: talep planlama, S&OP, satın alma, tedarikçi yönetimi. Başvurduğunuz unvanın söz dağarcığını öne alın." },
    ],
  },
];

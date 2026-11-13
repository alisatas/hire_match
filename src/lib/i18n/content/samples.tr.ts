import type { SampleJob } from "./types";

export const SAMPLE_JOBS: SampleJob[] = [
  { id: "AI Engineer", label: "Yapay Zeka Mühendisi", emoji: "🤖", desc: "Python, LLM, RAG, embedding, vektör veritabanı, LangChain, eval, FastAPI, AWS", text: `Yapay Zeka Mühendisi (AI Engineer) — İstanbul (Hibrit)

Binlerce müşterinin kullandığı LLM tabanlı özellikler geliştirecek bir AI Engineer arıyoruz. Üretken yapay zekayı prototipten canlıya taşıyacaksınız: arama, değerlendirme, dağıtım ve izleme.

Aranan nitelikler:
- Yazılım veya makine öğrenmesi mühendisi olarak en az 3 yıl deneyim, güçlü Python
- OpenAI veya Anthropic API'leriyle LLM uygulamaları geliştirme deneyimi
- RAG: embedding, chunking ve pgvector, Pinecone ya da Weaviate gibi bir vektör veritabanı
- LangChain veya LlamaIndex; AI agents ve function calling
- Eval: LLM değerlendirme setleri tasarlamak; kalite, gecikme ve maliyeti ölçmek
- FastAPI ile model dağıtımı, Docker ve AWS
- Prompt engineering ve Hugging Face ile fine-tuning
- CI/CD, Git ve çevik ekiplerde çalışma

Tercih sebepleri:
- MLOps deneyimi (MLflow, SageMaker veya Vertex AI)
- Dahili araçlar için TypeScript
- SQL ve PostgreSQL

Rekabetçi maaş, eğitim bütçesi ve hibrit çalışma sunuyoruz.` },
  { id: "Account Executive", label: "Satış Uzmanı (AE)", emoji: "🤝", desc: "B2B SaaS satış, potansiyel müşteri bulma, satış kotası, Salesforce, HubSpot", text: `Account Executive — B2B SaaS Satış, İstanbul (Hibrit)

Orta ölçekli müşterilerde satış döngüsünün tamamından sorumlu olacak bir Account Executive arıyoruz. Potansiyel müşteri bulma ve lead generation yürütecek, satış hattınızı Salesforce'ta yönetecek ve üç aylık satış kotasına karşı anlaşmaları kapatacaksınız.

Aranan nitelikler:
- B2B satış veya SaaS satışında en az 3 yıl deneyim, tercihen account executive olarak
- Kota başarısı ve anlaşma kapatma konusunda kanıtlanmış geçmiş
- Salesforce veya HubSpot CRM deneyimi
- Güçlü pazarlık, ihtiyaç analizi ve müşteri portföyü yönetimi becerileri
- Soğuk arama ve outbound prospecting konusunda rahatlık
- İş geliştirme bakış açısı, çok iyi Türkçe ve İngilizce iletişim

Tercih sebepleri:
- Pazarlama otomasyonu ve Excel ile tahminleme deneyimi
- LinkedIn Sales Navigator bilgisi

Üst sınırı olmayan prim sistemi, hibrit çalışma ve eğitim bütçesi sunuyoruz.` },
  { id: "Frontend Dev", label: "Frontend Geliştirici", emoji: "🎨", desc: "React, TypeScript, Next.js, Tailwind, GraphQL, Jest, CI/CD", text: `Frontend Geliştirici — İstanbul (Hibrit)

Ürün ekibimize katılacak yetkin bir Frontend Geliştirici arıyoruz. Her gün binlerce kullanıcının kullandığı hızlı ve duyarlı web uygulamaları geliştireceksiniz.

Aranan nitelikler:
- React ve TypeScript ile en az 3 yıl deneyim
- Next.js, Tailwind CSS ve modern CSS konusunda güçlü bilgi
- State management deneyimi (Redux, Zustand veya benzeri)
- REST API ve GraphQL bilgisi
- Git ve CI/CD süreçleri (GitHub Actions)
- Erişilebilirlik (WCAG) ve tarayıcılar arası uyumluluk bilgisi
- Çevik / Scrum ekip deneyimi

Tercih sebepleri:
- Jest ve Cypress ile test deneyimi
- Figma ve UX tasarımcılarıyla iş birliği
- BFF için Node.js, yerel geliştirme için Docker

Rekabetçi maaş, esnek hibrit çalışma ve iş birliğine dayalı bir ekip kültürü sunuyoruz.` },
  { id: "Digital Marketer", label: "Dijital Pazarlama Uzmanı", emoji: "📣", desc: "SEO, Google Ads, içerik ve e-posta pazarlaması, GA4, HubSpot, kampanya yönetimi", text: `Dijital Pazarlama Uzmanı — Ankara (Hibrit)

Online müşteri kazanımımızı büyütecek bir Dijital Pazarlama Uzmanı arıyoruz. SEO ve ücretli aramadan sorumlu olacak, kanallar arası kampanyalar yürütecek ve sonuçları raporlayacaksınız.

Aranan nitelikler:
- Dijital pazarlamada en az 2 yıl deneyim
- Güçlü SEO becerileri: anahtar kelime araştırması, sayfa içi optimizasyon ve içerik brifleri
- Aylık bütçeyle Google Ads (PPC / SEM) kampanya yönetimi
- İçerik pazarlaması ve e-posta pazarlaması deneyimi
- LinkedIn ve Meta'da sosyal medya pazarlaması
- Raporlama için Google Analytics ve Google Tag Manager
- HubSpot veya başka bir pazarlama otomasyonu aracı
- Veriye dayalı çalışma: A/B testi ve dönüşüm oranı optimizasyonu

Tercih sebepleri:
- Büyüyen bir şirkette growth marketing deneyimi
- Temel Excel veya Looker Studio bilgisi

Deneme yapabileceğiniz bir pazarlama bütçesi, esnek saatler ve hibrit ofis sunuyoruz.` },
  { id: "Backend Engineer", label: "Backend Geliştirici", emoji: "⚙️", desc: "Node.js, Python, PostgreSQL, AWS, Docker, Kubernetes, Redis, Terraform", text: `Backend Geliştirici — Uzaktan

SaaS platformumuzu çalıştıran ölçeklenebilir backend servislerini tasarlayıp geliştirecek bir mühendis arıyoruz.

Aranan nitelikler:
- Node.js veya Python (FastAPI, Django) ile en az 4 yıl deneyim
- Güçlü SQL, tercihen PostgreSQL
- REST API ve mikroservis tasarımı deneyimi
- Docker ve Kubernetes bilgisi
- AWS veya GCP bulut altyapısı deneyimi
- CI/CD süreçleri (GitHub Actions, Jenkins)
- Önbellek ve kuyruklar için Redis
- Git ve kod inceleme pratikleri

Tercih sebepleri:
- Infrastructure as code için Terraform
- Arama için Elasticsearch
- GraphQL API tasarımı
- Mesaj kuyrukları (RabbitMQ, Kafka)

Tamamen uzaktan, asenkron öncelikli bir ekibiz.` },
  { id: "Financial Analyst", label: "Finansal Analist", emoji: "💶", desc: "Finansal modelleme, FP&A, bütçeleme, tahminleme, Excel, Power BI, UFRS", text: `Finansal Analist (FP&A) — İstanbul

Finans ekibimiz, bütçeleme, tahminleme ve şirket genelindeki iş kararlarını destekleyecek bir Finansal Analist arıyor.

Aranan nitelikler:
- FP&A, finansal analiz veya kurumsal finansta en az 3 yıl deneyim
- Excel'de güçlü finansal modelleme (pivot tablolar, ileri formüller)
- Yıllık bütçeleme döngüsünü ve aylık tahminlemeyi yürütme deneyimi
- Üst yönetim için sapma analizi ve yönetim raporlaması
- UFRS bilgisi
- Power BI ile pano hazırlama
- Güçlü paydaş yönetimi ve iletişim becerileri

Tercih sebepleri:
- Ay sonu kapanış ve mutabakat deneyimi
- Veri ambarından veri çekmek için SQL
- Hızlı büyüyen bir şirkette veya Big Four'da deneyim

Rekabetçi maaş, sertifika için eğitim bütçesi ve hibrit çalışma sunuyoruz.` },
  { id: "Data Analyst", label: "Veri Analisti", emoji: "📊", desc: "SQL, Python, Pandas, Tableau, Power BI, BigQuery, A/B testi", text: `Veri Analisti — İzmir

Karmaşık veri setlerini büyüme ve ürün ekiplerimiz için uygulanabilir içgörülere dönüştürecek bir analist arıyoruz.

Aranan nitelikler:
- Veri analizinde en az 2 yıl deneyim
- Güçlü SQL: büyük veri setlerinde karmaşık sorgular
- Veri işleme için Python, Pandas ve NumPy
- Veri görselleştirme araçları (Tableau, Power BI veya benzeri)
- İstatistik ve A/B testi metodolojisi bilgisi
- Google Analytics ve BigQuery bilgisi
- Çok iyi iletişim ve veriyle hikâye anlatma becerisi

Tercih sebepleri:
- Temel makine öğrenmesi (scikit-learn)
- Veri modelleme için dbt
- Çevik / Scrum ortam deneyimi
- KVKK ve GDPR kapsamında veri işleme bilgisi

Ürün yöneticileri, mühendisler ve pazarlama ekibiyle yakın çalışacaksınız.` },
  { id: "Product Manager", label: "Ürün Yöneticisi", emoji: "📋", desc: "Ürün stratejisi, yol haritası, çevik, Jira, analitik, paydaş yönetimi", text: `Kıdemli Ürün Yöneticisi — İstanbul (Hibrit)

Ana ürün alanımızı yönetecek ve platformumuzdaki büyümeyi sürükleyecek deneyimli bir Ürün Yöneticisi arıyoruz.

Aranan nitelikler:
- B2B veya B2C SaaS ortamında en az 4 yıl ürün yönetimi deneyimi
- Ürün vizyonu, ürün stratejisi ve yol haritası belirleme becerisi
- Çevik sprint yönetimi: Jira, Confluence ve backlog düzenleme
- Veriye dayalı bakış: SQL, Google Analytics, Mixpanel veya Amplitude
- Çok iyi paydaş yönetimi ve iletişim becerileri
- Fikirden lansmana özellik çıkarma konusunda kanıtlanmış geçmiş
- PRD, kullanıcı hikâyeleri ve kabul kriterleri yazma deneyimi
- UX tasarım ilkeleri ve Figma ile çalışma

Tercih sebepleri:
- Fintech, pazar yeri veya SaaS deneyimi
- A/B testi ve deney tasarımı
- OKR ve ürün odaklı büyüme deneyimi

Ürün kararlarının gerçek etki yarattığı hızlı bir ekibe katılın.` },
  { id: "DevOps Engineer", label: "DevOps Mühendisi", emoji: "⚙️", desc: "Kubernetes, Terraform, AWS, CI/CD, Docker, Linux, izleme, güvenlik", text: `DevOps Mühendisi — Ankara (Uzaktan çalışmaya uygun)

Altyapımızdan, dağıtım süreçlerimizden ve bulut operasyonlarımızdan sorumlu olacak bir DevOps Mühendisi arıyoruz.

Aranan nitelikler:
- DevOps veya platform mühendisliğinde en az 3 yıl deneyim
- Kubernetes (tercihen EKS veya GKE) ve Helm konusunda derin bilgi
- Infrastructure as code için güçlü Terraform
- AWS veya GCP bulut altyapısı: VPC, IAM, S3, RDS, Lambda
- Docker ile konteynerleştirme ve imaj optimizasyonu
- CI/CD süreçleri: GitHub Actions, ArgoCD veya Jenkins
- Linux sistem yönetimi ve shell scripting (Bash)
- İzleme: Prometheus, Grafana, Datadog veya benzeri
- Güvenlik: gizli bilgi yönetimi (Vault, AWS Secrets Manager), ağ politikaları

Tercih sebepleri:
- Service mesh deneyimi (Istio, Linkerd)
- Çok bölgeli dağıtım deneyimi
- Otomasyon için Python veya Go

Tamamen AWS üzerinde, büyük bir Kubernetes kümesiyle çalışıyoruz.` },
];

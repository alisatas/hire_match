// The same CV and the same posting written in six languages. A language-neutral engine
// scores each row about the same in every column (see languages.test.ts).
export type Pair = { cv: string; job: string };
export const cases: Record<string, Record<string, Pair>> = {
  "frontend (strong match)": {
    en: {
      cv: `Senior Frontend Developer
6 years of experience building web applications.
Experience
Frontend Developer, Acme — 2019 to 2025
Built the checkout in React and TypeScript with Next.js, cutting load time by 40%.
Wrote unit tests with Jest and end-to-end tests with Playwright. Set up CI/CD with GitHub Actions.
Worked with designers in Figma and built a design system with Tailwind CSS and Storybook.
Consumed REST APIs and GraphQL. Improved accessibility and Core Web Vitals. Agile team, Scrum.
Skills: JavaScript, TypeScript, React, Next.js, Tailwind CSS, Jest, Playwright, GraphQL, Git`,
      job: `Frontend Developer
We are looking for a frontend developer with at least 5 years of experience.
You will build our customer web application in React and TypeScript using Next.js.
Requirements:
- Strong experience with React, TypeScript and JavaScript
- Experience with Next.js and Tailwind CSS
- Testing with Jest and Playwright
- Experience with REST APIs and GraphQL
- Knowledge of accessibility and web performance
- CI/CD with GitHub Actions, Git
- Working in an agile team with designers using Figma
You will work closely with product, design and backend teams to ship features to customers every week.`,
    },
    tr: {
      cv: `Kıdemli Frontend Geliştirici
Web uygulamaları geliştirmede 6 yıl deneyim.
Deneyim
Frontend Geliştirici, Acme — 2019 - 2025
Ödeme sayfasını React ve TypeScript ile Next.js üzerinde geliştirdim, yüklenme süresini %40 azalttım.
Jest ile birim testleri, Playwright ile uçtan uca testler yazdım. GitHub Actions ile CI/CD kurdum.
Tasarımcılarla Figma üzerinde çalıştım, Tailwind CSS ve Storybook ile tasarım sistemi kurdum.
REST API ve GraphQL kullandım. Erişilebilirlik ve Core Web Vitals iyileştirmeleri yaptım. Çevik ekip, Scrum.
Yetenekler: JavaScript, TypeScript, React, Next.js, Tailwind CSS, Jest, Playwright, GraphQL, Git`,
      job: `Frontend Geliştirici
En az 5 yıl deneyimli bir frontend geliştirici arıyoruz.
Müşteri web uygulamamızı React ve TypeScript ile Next.js kullanarak geliştireceksiniz.
Aranan nitelikler:
- React, TypeScript ve JavaScript konusunda güçlü deneyim
- Next.js ve Tailwind CSS deneyimi
- Jest ve Playwright ile test yazma
- REST API ve GraphQL deneyimi
- Erişilebilirlik ve web performansı bilgisi
- GitHub Actions ile CI/CD, Git
- Figma kullanan tasarımcılarla çevik bir ekipte çalışma
Ürün, tasarım ve backend ekipleriyle yakın çalışarak her hafta müşterilere yeni özellikler sunacaksınız.`,
    },
    de: {
      cv: `Senior Frontend-Entwickler
6 Jahre Erfahrung in der Entwicklung von Webanwendungen.
Berufserfahrung
Frontend-Entwickler, Acme — 2019 bis 2025
Checkout in React und TypeScript mit Next.js entwickelt und die Ladezeit um 40 % gesenkt.
Unit-Tests mit Jest und End-to-End-Tests mit Playwright geschrieben. CI/CD mit GitHub Actions aufgebaut.
Mit Designern in Figma gearbeitet und ein Designsystem mit Tailwind CSS und Storybook aufgebaut.
REST APIs und GraphQL angebunden. Barrierefreiheit und Core Web Vitals verbessert. Agiles Team, Scrum.
Kenntnisse: JavaScript, TypeScript, React, Next.js, Tailwind CSS, Jest, Playwright, GraphQL, Git`,
      job: `Frontend-Entwickler (m/w/d)
Wir suchen einen Frontend-Entwickler mit mindestens 5 Jahren Berufserfahrung.
Sie entwickeln unsere Kunden-Webanwendung in React und TypeScript mit Next.js.
Anforderungen:
- Fundierte Erfahrung mit React, TypeScript und JavaScript
- Erfahrung mit Next.js und Tailwind CSS
- Testen mit Jest und Playwright
- Erfahrung mit REST APIs und GraphQL
- Kenntnisse in Barrierefreiheit und Web-Performance
- CI/CD mit GitHub Actions, Git
- Arbeit in einem agilen Team mit Designern in Figma
Sie arbeiten eng mit Produkt-, Design- und Backend-Teams zusammen und liefern jede Woche neue Funktionen aus.`,
    },
    es: {
      cv: `Desarrollador Frontend Senior
6 años de experiencia desarrollando aplicaciones web.
Experiencia
Desarrollador Frontend, Acme — 2019 a 2025
Desarrollé el checkout en React y TypeScript con Next.js, reduciendo el tiempo de carga un 40 %.
Escribí pruebas unitarias con Jest y pruebas end-to-end con Playwright. Configuré CI/CD con GitHub Actions.
Trabajé con diseñadores en Figma y construí un sistema de diseño con Tailwind CSS y Storybook.
Integré REST APIs y GraphQL. Mejoré la accesibilidad y los Core Web Vitals. Equipo ágil, Scrum.
Habilidades: JavaScript, TypeScript, React, Next.js, Tailwind CSS, Jest, Playwright, GraphQL, Git`,
      job: `Desarrollador Frontend
Buscamos un desarrollador frontend con al menos 5 años de experiencia.
Desarrollarás nuestra aplicación web para clientes en React y TypeScript con Next.js.
Requisitos:
- Sólida experiencia con React, TypeScript y JavaScript
- Experiencia con Next.js y Tailwind CSS
- Pruebas con Jest y Playwright
- Experiencia con REST APIs y GraphQL
- Conocimientos de accesibilidad y rendimiento web
- CI/CD con GitHub Actions, Git
- Trabajo en un equipo ágil con diseñadores que usan Figma
Trabajarás con los equipos de producto, diseño y backend para entregar funcionalidades a los clientes cada semana.`,
    },
  },
  "nurse (strong match)": {
    en: {
      cv: `Registered Nurse
7 years of experience in acute medical wards.
Staff Nurse, City Hospital — 2018 to 2025
Delivered patient care for up to 8 patients per shift. Medication administration and monitoring of vital signs.
Wrote care plans and clinical documentation in electronic health records (Epic EMR).
Wound care, infection control audits, basic life support certified. Trained new nurses and worked with doctors and families.`,
      job: `Registered Nurse — Medical Ward
We are looking for a registered nurse with at least 3 years of experience in an acute hospital ward.
Responsibilities:
- Deliver safe patient care and write care plans
- Medication administration and monitoring vital signs
- Clinical documentation in electronic health records
- Wound care and infection control
- Basic life support certification required
- Work with doctors, families and the wider nursing team`,
    },
    tr: {
      cv: `Hemşire
Dahiliye servislerinde 7 yıl deneyim.
Servis Hemşiresi, Şehir Hastanesi — 2018 - 2025
Vardiya başına 8 hastaya kadar hasta bakımı verdim. İlaç uygulama ve yaşamsal bulguların takibi.
Bakım planları hazırladım, klinik kayıtları elektronik sağlık kayıt sisteminde tuttum.
Yara bakımı, enfeksiyon kontrol denetimleri, temel yaşam desteği sertifikası. Yeni hemşireleri eğittim, hekimler ve ailelerle çalıştım.`,
      job: `Hemşire — Dahiliye Servisi
Hastane servisinde en az 3 yıl deneyimli hemşire arıyoruz.
Sorumluluklar:
- Güvenli hasta bakımı vermek ve bakım planları hazırlamak
- İlaç uygulama ve yaşamsal bulguların takibi
- Elektronik sağlık kayıt sisteminde klinik kayıt tutmak
- Yara bakımı ve enfeksiyon kontrol
- Temel yaşam desteği sertifikası zorunludur
- Hekimler, aileler ve hemşirelik ekibiyle birlikte çalışmak`,
    },
    de: {
      cv: `Gesundheits- und Krankenpfleger
7 Jahre Erfahrung auf internistischen Akutstationen.
Pflegefachkraft, Stadtklinikum — 2018 bis 2025
Patientenversorgung von bis zu 8 Patienten pro Schicht. Medikamentengabe und Überwachung der Vitalzeichen.
Pflegeplanung und Pflegedokumentation in der elektronischen Patientenakte.
Wundversorgung, Hygieneaudits, Basic Life Support zertifiziert. Neue Pflegekräfte eingearbeitet, Zusammenarbeit mit Ärzten und Angehörigen.`,
      job: `Pflegefachkraft (m/w/d) — Innere Medizin
Wir suchen eine Pflegefachkraft mit mindestens 3 Jahren Berufserfahrung auf einer Akutstation.
Aufgaben:
- Sichere Patientenversorgung und Pflegeplanung
- Medikamentengabe und Überwachung der Vitalzeichen
- Pflegedokumentation in der elektronischen Patientenakte
- Wundversorgung und Hygiene
- Basic Life Support Zertifikat erforderlich
- Zusammenarbeit mit Ärzten, Angehörigen und dem Pflegeteam`,
    },
    es: {
      cv: `Enfermera
7 años de experiencia en unidades de medicina interna.
Enfermera de planta, Hospital Central — 2018 a 2025
Cuidado del paciente de hasta 8 pacientes por turno. Administración de medicación y control de constantes vitales.
Elaboré planes de cuidados y documentación clínica en la historia clínica electrónica.
Cura de heridas, auditorías de control de infecciones, certificada en soporte vital básico. Formé a nuevas enfermeras y trabajé con médicos y familias.`,
      job: `Enfermera — Medicina Interna
Buscamos una enfermera con al menos 3 años de experiencia en una unidad de hospitalización.
Responsabilidades:
- Cuidado del paciente seguro y planes de cuidados
- Administración de medicación y control de constantes vitales
- Documentación clínica en la historia clínica electrónica
- Cura de heridas y control de infecciones
- Certificación en soporte vital básico obligatoria
- Trabajo con médicos, familias y el equipo de enfermería`,
    },
  },
};


cases["frontend (strong match)"].zh = {
  cv: `高级前端开发工程师
6年Web应用开发经验。
工作经历
前端开发工程师，Acme — 2019年3月 至今
使用React和TypeScript基于Next.js开发结算页面，加载时间缩短40%。
使用Jest编写单元测试，使用Playwright编写端到端测试。用GitHub Actions搭建CI/CD。
与设计师在Figma中协作，用Tailwind CSS和Storybook搭建设计系统。
对接REST API和GraphQL。改进无障碍访问和Core Web Vitals。敏捷团队，Scrum。
技能：JavaScript、TypeScript、React、Next.js、Tailwind CSS、Jest、Playwright、GraphQL、Git`,
  job: `前端开发工程师
我们正在寻找一名具有至少5年经验的前端开发工程师。
你将使用React和TypeScript基于Next.js开发我们的客户Web应用。
任职要求：
- 精通React、TypeScript和JavaScript
- 有Next.js和Tailwind CSS经验
- 使用Jest和Playwright进行测试
- 有REST API和GraphQL经验
- 了解无障碍访问和Web性能
- 使用GitHub Actions的CI/CD，Git
- 在敏捷团队中与使用Figma的设计师协作
你将与产品、设计和后端团队紧密合作，每周向客户交付新功能。`,
};
cases["frontend (strong match)"].hi = {
  cv: `वरिष्ठ फ्रंटएंड डेवलपर
वेब एप्लिकेशन बनाने का 6 वर्ष का अनुभव।
अनुभव
फ्रंटएंड डेवलपर, Acme — 2019 से वर्तमान
React और TypeScript में Next.js के साथ चेकआउट बनाया, लोड समय 40% घटाया।
Jest से यूनिट टेस्ट और Playwright से एंड-टू-एंड टेस्ट लिखे। GitHub Actions से CI/CD सेट किया।
डिज़ाइनरों के साथ Figma में काम किया, Tailwind CSS और Storybook से डिज़ाइन सिस्टम बनाया।
REST API और GraphQL का उपयोग किया। एक्सेसिबिलिटी और Core Web Vitals सुधारे। एजाइल टीम, Scrum।
कौशल: JavaScript, TypeScript, React, Next.js, Tailwind CSS, Jest, Playwright, GraphQL, Git`,
  job: `फ्रंटएंड डेवलपर
हम कम से कम 5 वर्ष के अनुभव वाले फ्रंटएंड डेवलपर की तलाश में हैं।
आप React और TypeScript में Next.js के साथ हमारा ग्राहक वेब एप्लिकेशन बनाएंगे।
आवश्यकताएं:
- React, TypeScript और JavaScript का मजबूत अनुभव
- Next.js और Tailwind CSS का अनुभव
- Jest और Playwright से टेस्टिंग
- REST API और GraphQL का अनुभव
- एक्सेसिबिलिटी और वेब परफॉर्मेंस की जानकारी
- GitHub Actions के साथ CI/CD, Git
- Figma उपयोग करने वाले डिज़ाइनरों के साथ एजाइल टीम में काम
आप प्रोडक्ट, डिज़ाइन और बैकएंड टीमों के साथ मिलकर हर सप्ताह ग्राहकों को नए फीचर देंगे।`,
};
cases["nurse (strong match)"].zh = {
  cv: `注册护士
7年内科病房护理经验。
病房护士，市第一医院 — 2018年 至今
每班负责最多8名患者的患者护理。给药并监测生命体征。
制定护理计划，在电子病历系统中书写护理记录。
伤口护理、感染控制检查，持有基础生命支持证书。带教新护士，与医生和家属协作。`,
  job: `注册护士 — 内科病房
我们招聘一名具有3年以上病房工作经验的注册护士。
岗位职责：
- 提供安全的患者护理并制定护理计划
- 给药并监测生命体征
- 在电子病历中完成护理记录
- 伤口护理和感染控制
- 须持有基础生命支持证书
- 与医生、家属和护理团队协作`,
};
cases["nurse (strong match)"].hi = {
  cv: `पंजीकृत नर्स
मेडिकल वार्ड में 7 वर्ष का अनुभव।
स्टाफ नर्स, सिटी अस्पताल — 2018 - वर्तमान
प्रति शिफ्ट 8 मरीजों तक की रोगी देखभाल की। दवा प्रशासन और महत्वपूर्ण संकेत की निगरानी।
देखभाल योजना बनाई और इलेक्ट्रॉनिक स्वास्थ्य रिकॉर्ड में दस्तावेज़ीकरण किया।
घाव की देखभाल, संक्रमण नियंत्रण ऑडिट, बेसिक लाइफ सपोर्ट प्रमाणित। नई नर्सों को प्रशिक्षित किया, डॉक्टरों और परिवारों के साथ काम किया।`,
  job: `पंजीकृत नर्स — मेडिकल वार्ड
हमें अस्पताल वार्ड में कम से कम 3 वर्ष के अनुभव वाली पंजीकृत नर्स चाहिए।
जिम्मेदारियां:
- सुरक्षित रोगी देखभाल देना और देखभाल योजना बनाना
- दवा प्रशासन और महत्वपूर्ण संकेत की निगरानी
- इलेक्ट्रॉनिक स्वास्थ्य रिकॉर्ड में दस्तावेज़ीकरण
- घाव की देखभाल और संक्रमण नियंत्रण
- बेसिक लाइफ सपोर्ट प्रमाणन आवश्यक
- डॉक्टरों, परिवारों और नर्सिंग टीम के साथ काम करना`,
};
// Held-out: written after the alias lists, in everyday posting wording
cases["logistics (strong match)"] = {
  en: {
    cv: `Logistics Coordinator
Logistics Coordinator, Northwind — Mar 2019 to present
Planned 120 outbound shipments a week across four carriers and negotiated freight rates.
Ran inventory management and cycle counts in the WMS for a 12,000 m2 warehouse.
Worked with procurement on supplier lead times and with a 3PL partner on last-mile delivery. Reported on-time delivery in Excel.`,
    job: `Logistics Coordinator
We need a logistics coordinator with at least 3 years of experience in warehousing or transport.
What you will do:
- Plan inbound and outbound freight with our carriers and 3PL partners
- Own inventory management and stock accuracy in our WMS
- Work with procurement and demand planning on stock levels
- Report on-time delivery and cost per shipment in Excel
- Improve last-mile delivery for our customers`,
  },
  tr: {
    cv: `Lojistik Uzmanı
Lojistik Uzmanı, Northwind — Mart 2019 - halen
Dört taşıyıcı ile haftada 120 sevkiyat planladım ve navlun fiyatlarını pazarlık ettim.
12.000 m2 depoda WMS üzerinde stok yönetimi ve sayım süreçlerini yürüttüm.
Tedarikçi teslim süreleri için satın alma ekibiyle, son kilometre teslimatları için 3PL iş ortağıyla çalıştım. Zamanında teslimat oranını Excel ile raporladım.`,
    job: `Lojistik Uzmanı
Depo veya nakliye alanında en az 3 yıl deneyimli lojistik uzmanı arıyoruz.
İş tanımı:
- Taşıyıcılar ve 3PL iş ortaklarımızla giriş ve çıkış navlun planlaması
- WMS üzerinde stok yönetimi ve stok doğruluğunun takibi
- Stok seviyeleri için satın alma ve talep planlama ekipleriyle çalışmak
- Zamanında teslimat ve sevkiyat başı maliyeti Excel ile raporlamak
- Müşterilerimiz için son kilometre teslimatını iyileştirmek`,
  },
  de: {
    cv: `Logistikkoordinator
Logistikkoordinator, Northwind — März 2019 bis heute
120 ausgehende Sendungen pro Woche mit vier Spediteuren geplant und Frachtraten verhandelt.
Bestandsmanagement und Inventuren im WMS für ein Lager mit 12.000 m2 verantwortet.
Mit dem Einkauf an Lieferzeiten und mit einem 3PL-Partner an der letzten Meile gearbeitet. Liefertreue in Excel berichtet.`,
    job: `Logistikkoordinator (m/w/d)
Wir suchen einen Logistikkoordinator mit mindestens 3 Jahren Berufserfahrung in Lager oder Transport.
Ihre Aufgaben:
- Planung der ein- und ausgehenden Fracht mit unseren Spediteuren und 3PL-Partnern
- Verantwortung für Bestandsmanagement und Bestandsgenauigkeit in unserem WMS
- Zusammenarbeit mit Beschaffung und Bedarfsplanung zu Lagerbeständen
- Reporting von Liefertreue und Kosten pro Sendung in Excel
- Verbesserung der Zustellung auf der letzten Meile`,
  },
  es: {
    cv: `Coordinador de Logística
Coordinador de Logística, Northwind — marzo 2019 a actualidad
Planifiqué 120 envíos semanales con cuatro transportistas y negocié tarifas de flete.
Llevé la gestión de inventario y los recuentos en el WMS de un almacén de 12.000 m2.
Trabajé con compras en los plazos de proveedores y con un socio 3PL en la última milla. Informé la entrega a tiempo en Excel.`,
    job: `Coordinador de Logística
Buscamos un coordinador de logística con al menos 3 años de experiencia en almacén o transporte.
Funciones:
- Planificar el flete de entrada y salida con nuestros transportistas y socios 3PL
- Responsable de la gestión de inventario y la exactitud de stock en nuestro WMS
- Trabajar con aprovisionamiento y planificación de la demanda en los niveles de stock
- Informar la entrega a tiempo y el coste por envío en Excel
- Mejorar la entrega de última milla para nuestros clientes`,
  },
  zh: {
    cv: `物流专员
物流专员，Northwind — 2019.03-至今
每周与四家承运商计划120票出库货运，并谈判运价。
在WMS中负责12000平米仓库的库存管理和盘点。
与采购团队跟进供应商交期，与第三方物流伙伴协作最后一公里配送。用Excel汇报准时交付率。`,
    job: `物流专员
招聘物流专员，要求3年以上仓储或运输相关工作经验。
工作内容：
- 与承运商和第三方物流伙伴计划进出库货运
- 负责WMS中的库存管理和库存准确率
- 与采购和需求计划团队协作管理库存水平
- 用Excel汇报准时交付率和单票成本
- 改善客户的最后一公里配送`,
  },
  hi: {
    cv: `लॉजिस्टिक्स समन्वयक
लॉजिस्टिक्स समन्वयक, Northwind — मार्च 2019 से वर्तमान
चार कैरियर के साथ प्रति सप्ताह 120 शिपमेंट की योजना बनाई और माल भाड़ा दरों पर बातचीत की।
12,000 वर्ग मीटर के गोदाम के लिए WMS में इन्वेंटरी प्रबंधन और गिनती संभाली।
आपूर्तिकर्ता लीड टाइम पर खरीद प्रबंधन टीम के साथ और लास्ट-माइल डिलीवरी पर 3PL पार्टनर के साथ काम किया। समय पर डिलीवरी की रिपोर्ट Excel में दी।`,
    job: `लॉजिस्टिक्स समन्वयक
हमें गोदाम या परिवहन में कम से कम 3 वर्ष के अनुभव वाला लॉजिस्टिक्स समन्वयक चाहिए।
जिम्मेदारियां:
- कैरियर और 3PL पार्टनर के साथ इनबाउंड और आउटबाउंड माल की योजना
- WMS में इन्वेंटरी प्रबंधन और स्टॉक सटीकता
- स्टॉक स्तर पर खरीद प्रबंधन और मांग योजना टीम के साथ काम
- समय पर डिलीवरी और प्रति शिपमेंट लागत की रिपोर्ट Excel में
- ग्राहकों के लिए लास्ट-माइल डिलीवरी में सुधार`,
  },
};

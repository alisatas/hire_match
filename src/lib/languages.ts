// ─────────────────────────────────────────────
// LANGUAGE LAYER FOR THE ANALYSIS ENGINE
// Turkish, German, Spanish, Portuguese, French, Hindi and Chinese on top of English and Dutch.
//
// The engine used to keep only a–z: "hasta bakımı" became "hasta bak m", Chinese and
// Hindi text vanished entirely. A nurse CV that matched a ward-nurse posting line for
// line scored 75 in English, 24 in Turkish and 28 in Spanish. Everything here is data
// plus a few text helpers; the scoring formula itself is unchanged.
//
// No language detection: every list is applied to every text. That keeps mixed postings
// working ("React Geliştirici — 5 yıl deneyim") and means there is no detector to get
// wrong. The cost is that each entry must be safe in all languages — see the notes.
//
// Math Prof improvement (Portuguese): Brazilian postings were read through the Spanish
// lists only. On the shared nurse case (English 75) a Portuguese CV and posting scored 32:
// "cuidado ao paciente", "sinais vitais" and "prontuário eletrônico" matched nothing, and
// "março 2019 até o momento" gave 0 years on the CV. With the Portuguese entries below:
// nurse 32 → 75, logistics 59 → 69 (CV years 0 → 7.8; English 67), frontend 71 → 76
// (English 70). All 105 English CV × posting pairs in the unit fixtures score the same.
//
// Math Prof improvement (French): "5 ans d'expérience" was never read — "ans" was not a
// year unit and the elided "d'" broke the years pattern (analyze.ts YEARS_TAIL), so every
// French posting fell back to the neutral experience score. With "ans", "d'", "au moins",
// French aliases, headings and dates: nurse 31 → 76 (English 75), logistics 65 → 71 (CV
// years 0 → 7.8), frontend 69 → 74 (English 70); years asked for 0 → 3/5. The 105 English
// pairs are unchanged.
// ─────────────────────────────────────────────

/**
 * Lower-cases and folds Latin diacritics so "Yönetimi", "yonetimi" and "YÖNETİMİ" compare
 * equal (people drop accents, PDFs mangle them). Only the Latin combining marks
 * U+0300–U+036F are removed: Devanagari vowel signs are marks too and must stay.
 * NFKC first turns full-width forms ("５年", "ＲＥＡＣＴ", "：") into their plain ones.
 */
export function foldText(text: string): string {
    return text
        .normalize("NFKC")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[̀-ͯ]/g, "")
        .replace(/ı/g, "i")
        .replace(/ß/g, "ss")
}

// Chinese (and Japanese kana) are written without spaces, so "熟悉React和TypeScript" has
// no word boundary around "React". These characters never count as part of a Latin word.
const CJK_CHAR = /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}]/u
const HAN_RUN = /\p{Script=Han}+/gu

export function isCjk(ch: string): boolean {
    return CJK_CHAR.test(ch)
}

/** A letter, digit or combining mark of a space-separated script. */
export function isWordChar(ch: string | undefined): boolean {
    return ch !== undefined && /[\p{L}\p{M}\p{N}]/u.test(ch) && !CJK_CHAR.test(ch)
}

const COMPOUND_LETTERS = 15

/**
 * Word count that also works without spaces. Chinese runs about 1.5 characters per
 * English word, so a 300-character posting counts as ~200 words instead of ~10 (which
 * marked every Chinese posting "too short" and cut its score by the confidence factor).
 *
 * German (and to a lesser degree Turkish) glue words together: "Patientenversorgung" is
 * "patient care", "Pflegedokumentation" is "nursing documentation". A posting that would
 * run 55 words in English came out at 45 and fell under the 50-word "too short" line, so a
 * fitting CV scored 36 instead of 68. A word of 15 or more letters therefore counts as two.
 * English text is all but unaffected: none of the English test postings changes its score.
 */
export function countWords(text: string): number {
    let han = 0
    const rest = text.replace(HAN_RUN, run => { han += run.length; return " " })
    let words = 0
    for (const token of rest.trim().split(/\s+/)) {
        if (!token) continue
        const letters = token.replace(/[^\p{L}\p{M}]/gu, "").length
        words += letters >= COMPOUND_LETTERS ? 2 : 1
    }
    return words + Math.ceil(han / 1.5)
}

// Characters that are grammar, not content. A two-character window containing one of
// them ("的工", "和团") is not a term.
const HAN_FUNCTION_CHARS = new Set("的了和与及或在是有对为等并将由其您你我们他她它者之以上下中个这那于而且也都就很更最被把给让向从到能可会需要")
const HAN_STOP_BIGRAMS = new Set([
    "负责", "具有", "具备", "经验", "工作", "能力", "相关", "熟悉", "岗位", "职责", "要求", "任职",
    "优先", "良好", "团队", "公司", "进行", "完成", "熟练", "掌握", "了解", "职位", "描述", "内容",
    "资格", "参与", "协助", "提供", "支持", "确保", "使用", "包括", "根据", "通过", "至少", "年以",
    "作经", "历者", "验者", "人员", "同事", "合作", "沟通", "学历", "本科", "专业",
])

/**
 * Chinese has no spaces to split on, so each run of Han characters is read as
 * overlapping two-character windows — the usual dictionary-free approach, and most
 * Chinese terms are two characters ("护理", "采购", "销售").
 */
export function hanBigrams(text: string): string[] {
    const out: string[] = []
    for (const run of text.match(HAN_RUN) ?? []) {
        for (let i = 0; i + 1 < run.length; i++) {
            const a = run[i], b = run[i + 1]
            if (HAN_FUNCTION_CHARS.has(a) || HAN_FUNCTION_CHARS.has(b)) continue
            const gram = a + b
            if (!HAN_STOP_BIGRAMS.has(gram)) out.push(gram)
        }
    }
    return out
}

/** Text with Han runs blanked out, for the space-separated word matcher. */
export function withoutHan(text: string): string {
    return text.replace(HAN_RUN, " ")
}

// ── Stop words ───────────────────────────────────────────────────────────────
// Folded forms (see foldText). Only words of 4+ characters matter: the keyword reader
// drops anything shorter. Same idea as the English list: grammar, plus the furniture of
// a job posting ("experience", "requirements", "we are looking for").
export const INTL_STOP_WORDS: string[] = [
    // Turkish
    "icin", "olan", "olarak", "veya", "gibi", "daha", "kadar", "ancak", "ayrica", "uzere", "sahip",
    "olmak", "olmasi", "olacak", "konusunda", "alaninda", "ilgili", "tercihen", "tercih", "sebebi",
    "deneyim", "deneyimi", "deneyimli", "tecrube", "tecrubeli", "bilgi", "bilgisi", "yetkin", "ekip",
    "ekibi", "takim", "calisma", "calisacak", "calismak", "ariyoruz", "aranan", "nitelikler",
    "sorumluluklar", "sirket", "sirketimiz", "pozisyon", "pozisyonu", "aday", "adaylar", "basvuru",
    "guclu", "gereken", "tanimi", "genel", "birlikte", "arasinda", "uzerinde", "tarafindan", "yonelik",
    "sekilde", "yakin", "hafta", "edecek", "yapmak", "etmek", "sunmak", "yeni", "derecede", "yillik",
    "zorunludur", "gereklidir", "beklenmektedir", "kullanarak", "kullanan",
    // German
    "oder", "eine", "einen", "einem", "einer", "eines", "sind", "wird", "werden", "sich", "nicht",
    "auch", "uber", "sowie", "durch", "unter", "nach", "beim", "dein", "deine", "deinen", "ihre",
    "ihren", "ihrer", "unser", "unsere", "unseren", "unserem", "haben", "hast", "bist", "sein",
    "suchen", "suchst", "bieten", "erfahrung", "erfahrungen", "berufserfahrung", "kenntnisse",
    "anforderungen", "aufgaben", "profil", "mindestens", "jahre", "jahren", "gute", "guten", "sehr",
    "sowohl", "zusammen", "zusammenarbeit", "arbeiten", "arbeit", "bereich", "unternehmen", "stelle",
    "bewerbung", "woche", "wochen", "neue", "neuen", "dich", "dabei", "dass", "diese", "dieser",
    "diesem", "fundierte", "erforderlich", "wunschenswert", "vorteil",
    // Spanish
    "para", "como", "sobre", "entre", "desde", "hasta", "pero", "tambien", "este", "esta", "estos",
    "estas", "nuestro", "nuestra", "nuestros", "nuestras", "buscamos", "experiencia", "conocimientos",
    "requisitos", "responsabilidades", "equipo", "equipos", "trabajo", "trabajar", "trabajaras",
    "empresa", "puesto", "menos", "anos", "solida", "buena", "nivel", "cada", "semana", "ofrecemos",
    "seras", "tendras", "capacidad", "habilidades", "manejo", "minimo", "deseable", "junto", "dentro",
    "mediante", "segun", "todos", "todas", "otros", "otras", "donde", "cuando", "unos", "unas",
    "tiene", "tienen", "hacer", "nuevo", "nueva", "nuevos", "nuevas", "obligatoria", "obligatorio",
    // Portuguese (Brazil) — words already listed for Spanish are not repeated
    "nosso", "nossa", "nossos", "nossas", "procuramos", "oferecemos", "conhecimento", "equipe", "equipes",
    "trabalho", "trabalhar", "vaga", "vagas", "voce", "sera", "tera", "atuar", "atuacao", "atividades",
    "desejavel", "diferencial", "diferenciais", "atraves", "outros", "outras", "onde", "quando", "fazer",
    "novo", "novos", "novas", "tambem", "pelo", "pela", "pelos", "pelas", "mais", "seja", "nivel",
    "candidato", "candidata", "candidatos", "beneficios", "clientes",
    // French
    "pour", "avec", "dans", "nous", "vous", "votre", "notre", "leur", "leurs", "sont", "etre", "avoir",
    "aussi", "ainsi", "afin", "chez", "selon", "tout", "tous", "toute", "toutes", "cette", "ces", "dont",
    "sera", "serez", "aurez", "rejoindre", "recherchons", "recrutons", "poste", "postes", "equipe",
    "equipes", "entreprise", "societe", "missions", "mission", "profil", "competences", "connaissances",
    "maitrise", "bonne", "bonnes", "solide", "solides", "niveau", "minimum", "souhaite", "souhaitee",
    "apprecie", "atout", "plus", "travail", "travailler", "semaine", "offrons", "avantages", "candidat",
    "candidate", "candidature", "nouveaux", "nouvelles", "nouvelle", "nouveau", "clients", "obligatoire",
    // Hindi
    "अनुभव", "लिए", "साथ", "करना", "करने", "करें", "करेंगे", "होना", "होगा", "होगी", "चाहिए", "हमारी",
    "हमारे", "हमारा", "आपको", "आपके", "आपकी", "कार्य", "कंपनी", "वर्ष", "वर्षों", "आवश्यक", "योग्यता",
    "ज्ञान", "क्षमता", "अच्छा", "अच्छी", "तथा", "एवं", "लेकिन", "इसके", "उनके", "जैसे", "द्वारा", "सकते",
    "किया", "गया", "वाले", "वाली", "उम्मीदवार", "आवेदन", "जिम्मेदारियां", "जिम्मेदारियाँ", "आवश्यकताएं",
]

// ── Skill aliases ────────────────────────────────────────────────────────────
// Added to the English aliases of the same group in analyze.ts (SKILL_GROUPS). Tool names
// (React, SAP, Excel) are the same in every language and need nothing here.
//
// Rules, same as for English: tool names and specific multi-word phrases only — a bare
// "satış", "Vertrieb" or "ventas" fires on almost any posting.
// A trailing "*" means "starts with": Turkish and German glue endings onto the word
// ("hasta bakımı / bakımında", "Softwaretests"), so the stem is matched instead.
// Not included on purpose: German "KI" (AI) — "ki" is one of the most common Turkish
// words; Spanish "contenedores" (Docker) — shipping containers in logistics postings.
//
// Hindi lists are shorter: postings in India are overwhelmingly written in English, and
// Hindi ones mostly use the English term in Devanagari.
export const LOCALIZED_SKILL_ALIASES: Record<string, string[]> = {
    jest: ["birim test*", "komponententest*", "pruebas unitarias", "prueba unitaria", "tests unitarios", "单元测试", "यूनिट टेस्ट*",
        "testes unitários", "teste unitário",
        "tests unitaires", "test unitaire"],
    cypress: ["uçtan uca test*", "end-to-end-test*", "pruebas end-to-end", "pruebas de extremo a extremo", "端到端测试",
        "testes end-to-end", "testes ponta a ponta",
        "tests de bout en bout"],
    testing: ["yazılım testi", "test otomasyonu", "kalite güvence*", "qualitätssicherung", "softwaretest*",
        "testautomatisierung", "aseguramiento de calidad", "pruebas de software", "automatización de pruebas",
        "软件测试", "自动化测试", "质量保证", "सॉफ्टवेयर परीक्षण", "गुणवत्ता आश्वासन",
        "garantia de qualidade", "testes de software", "automação de testes", "testes automatizados",
        "assurance qualité", "tests logiciels", "automatisation des tests", "tests automatisés"],
    git: ["sürüm kontrol*", "versiyon kontrol*", "versionskontrolle", "versionsverwaltung", "control de versiones",
        "版本控制", "संस्करण नियंत्रण",
        "controle de versão",
        "gestion de versions", "contrôle de version"],
    agile: ["çevik", "agil", "agiles", "agilen", "agiler", "agilem", "ágiles", "敏捷", "एजाइल",
        "ágeis", "metodologia ágil", "equipe ágil",
        "méthodes agiles", "méthodologie agile"],
    api: ["mikroservis*", "microservicios", "微服务", "接口开发",
        "microsserviços"],
    docker: ["containerisierung", "konteynerleştirme", "容器化",
        "conteinerização",
        "conteneurisation"],
    cicd: ["sürekli entegrasyon", "kontinuierliche integration", "integración continua", "持续集成", "持续交付",
        "integração contínua", "entrega contínua",
        "intégration continue", "déploiement continu"],
    figma: ["kullanıcı deneyimi", "arayüz tasarım*", "tasarım sistemi", "designsystem*", "experiencia de usuario",
        "diseño de interfaces", "sistema de diseño", "用户体验", "交互设计", "界面设计", "设计系统",
        "experiência do usuário", "design de interfaces", "sistema de design",
        "expérience utilisateur", "conception d'interfaces", "système de design"],
    ml: ["makine öğrenmesi", "makine öğrenimi", "derin öğrenme", "maschinelles lernen", "maschinellem lernen",
        "maschinellen lernens", "aprendizaje automático", "aprendizaje profundo", "机器学习", "深度学习", "मशीन लर्निंग",
        "aprendizado de máquina", "aprendizagem de máquina", "aprendizado profundo",
        "apprentissage automatique", "apprentissage profond"],
    data: ["veri analizi", "veri analitiği", "veri bilimi", "datenanalyse*", "análisis de datos", "ciencia de datos",
        "数据分析", "数据科学", "डेटा विश्लेषण", "डेटा एनालिसिस",
        "análise de dados", "ciência de dados",
        "analyse de données", "science des données"],
    ai: ["yapay zeka", "büyük dil model*", "künstliche intelligenz", "künstlicher intelligenz", "generative ki",
        "sprachmodell*", "inteligencia artificial", "ia generativa", "modelos de lenguaje", "人工智能", "大模型",
        "大语言模型", "生成式ai", "提示词工程", "कृत्रिम बुद्धिमत्ता", "आर्टिफिशियल इंटेलिजेंस",
        "inteligência artificial",
        "intelligence artificielle", "ia générative", "grands modèles de langage"],
    vectordb: ["vektör veritabanı", "anlamsal arama", "vektordatenbank*", "semantische suche", "base de datos vectorial",
        "bases de datos vectoriales", "búsqueda semántica", "向量数据库", "向量检索", "语义搜索",
        "banco de dados vetorial", "bancos de dados vetoriais", "busca semântica",
        "base de données vectorielle", "bases de données vectorielles", "recherche sémantique"],
    mlops: ["model dağıtımı", "modellbereitstellung", "despliegue de modelos", "模型部署",
        "implantação de modelos",
        "déploiement de modèles"],
    bi: ["veri görselleştirme", "datenvisualisierung", "visualización de datos", "数据可视化", "डेटा विज़ुअलाइज़ेशन",
        "visualização de dados",
        "visualisation de données"],
    excel: ["pivot tablo*", "düşeyara", "pivot-tabelle*", "sverweis", "tablas dinámicas", "buscarv", "数据透视表",
        "procv",
        "tableaux croisés dynamiques", "recherchev"],
    product: ["ürün yönetimi", "ürün yol haritası", "ürün stratejisi", "yol haritası", "kullanıcı hikaye*",
        "produktmanagement", "produktstrategie", "produkt-roadmap", "gestión de producto", "gestión de productos",
        "estrategia de producto", "hoja de ruta", "historias de usuario", "产品管理", "产品规划", "产品路线图",
        "产品策略", "用户故事", "उत्पाद प्रबंधन", "प्रोडक्ट मैनेजमेंट",
        "gestão de produto", "gestão de produtos", "estratégia de produto", "roadmap de produto", "histórias de usuário",
        "gestion de produit", "stratégie produit", "feuille de route produit", "roadmap produit"],
    projectmgmt: ["proje yönetimi", "paydaş yönetimi", "risk yönetimi", "projektmanagement", "projektleitung",
        "stakeholder-management", "risikomanagement", "gestión de proyectos", "dirección de proyectos",
        "gestión de riesgos", "项目管理", "风险管理", "干系人管理", "परियोजना प्रबंधन", "प्रोजेक्ट मैनेजमेंट", "जोखिम प्रबंधन",
        "gestão de projetos", "gerenciamento de projetos", "gestão de riscos", "gestão de stakeholders",
        "gestion de projet", "gestion de projets", "gestion des risques", "gestion des parties prenantes"],
    sales: ["b2b satış", "kurumsal satış", "potansiyel müşteri", "soğuk arama", "iş geliştirme", "müşteri portföy*",
        "satış hedef*", "satış kotası", "b2b-vertrieb", "neukundenakquise", "neukundengewinnung", "kaltakquise",
        "geschäftsentwicklung", "key account management", "leadgenerierung", "ventas b2b", "generación de leads",
        "prospección", "llamadas en frío", "desarrollo de negocio", "gestión de cuentas", "cierre de ventas",
        "大客户销售", "销售指标", "客户开发", "商务拓展", "销售线索", "b2b销售", "陌生拜访",
        "बिजनेस डेवलपमेंट", "लीड जनरेशन", "बी2बी बिक्री",
        "vendas b2b", "geração de leads", "prospecção de clientes", "desenvolvimento de negócios", "gestão de contas", "fechamento de vendas", "metas de vendas",
        "vente b2b", "ventes b2b", "génération de leads", "prospection commerciale", "développement commercial", "gestion de comptes", "objectifs de vente"],
    crm: ["müşteri ilişkileri yönetimi", "kundenbeziehungsmanagement", "gestión de relaciones con clientes", "客户关系管理",
        "gestão de relacionamento com o cliente",
        "gestion de la relation client"],
    marketing: ["dijital pazarlama", "içerik pazarlama*", "e-posta pazarlama*", "sosyal medya pazarlama*",
        "performans pazarlama*", "kampanya yönetimi", "pazarlama otomasyonu", "digitales marketing", "digitalmarketing",
        "online-marketing", "e-mail-marketing", "kampagnenmanagement", "marketing-automatisierung", "marketing digital",
        "marketing de contenidos", "marketing en redes sociales", "gestión de campañas", "automatización de marketing",
        "数字营销", "内容营销", "社交媒体营销", "新媒体运营", "邮件营销", "市场推广", "营销自动化",
        "डिजिटल मार्केटिंग", "कंटेंट मार्केटिंग", "सोशल मीडिया मार्केटिंग",
        "marketing de conteúdo", "marketing nas redes sociais", "gestão de campanhas", "automação de marketing", "marketing de performance",
        "marketing de contenu", "marketing sur les réseaux sociaux", "gestion de campagnes", "automatisation marketing", "acquisition payante"],
    seo: ["arama motoru optimizasyonu", "anahtar kelime araştırma*", "suchmaschinenoptimierung", "suchmaschinenmarketing",
        "keyword-recherche", "optimización de motores de búsqueda", "posicionamiento web",
        "investigación de palabras clave", "搜索引擎优化", "搜索引擎营销", "关键词研究", "सर्च इंजन ऑप्टिमाइजेशन",
        "otimização para mecanismos de busca", "pesquisa de palavras-chave",
        "référencement naturel", "recherche de mots-clés", "optimisation pour les moteurs de recherche"],
    finance: ["finansal modelleme", "finansal analiz", "bütçeleme", "mutabakat", "ufrs", "tfrs", "finanzmodellierung",
        "finanzanalyse", "budgetierung", "kreditorenbuchhaltung", "debitorenbuchhaltung", "kontenabstimmung",
        "modelización financiera", "modelado financiero", "análisis financiero", "cuentas por pagar",
        "cuentas por cobrar", "conciliación bancaria", "conciliaciones", "niif", "elaboración de presupuestos",
        "财务建模", "财务分析", "预算管理", "应付账款", "应收账款", "对账", "वित्तीय विश्लेषण", "वित्तीय मॉडलिंग", "बजटिंग",
        "modelagem financeira", "análise financeira", "contas a pagar", "contas a receber", "conciliação bancária", "conciliações bancárias", "elaboração de orçamento*",
        "modélisation financière", "analyse financière", "comptabilité fournisseurs", "comptabilité clients", "rapprochement bancaire", "rapprochements bancaires", "élaboration budgétaire", "contrôle de gestion"],
    hr: ["aday takip sistemi", "yetenek kazanımı", "işveren markası", "uçtan uca işe alım", "işe alım süreç*",
        "bewerbermanagementsystem", "bewerbermanagement", "talentakquise", "active sourcing", "direktansprache",
        "arbeitgebermarke", "adquisición de talento", "captación de talento", "reclutamiento y selección",
        "marca empleadora", "sistema de seguimiento de candidatos", "招聘全流程", "人才获取", "人才招聘", "雇主品牌",
        "招聘系统", "候选人寻访", "टैलेंट एक्विजिशन", "प्रतिभा अधिग्रहण", "भर्ती प्रक्रिया",
        "aquisição de talentos", "recrutamento e seleção", "marca empregadora", "sistema de rastreamento de candidatos",
        "acquisition de talents", "recrutement de bout en bout", "marque employeur", "logiciel de suivi des candidatures"],
    healthcare: ["hasta bakım*", "hemşirelik bakım*", "ilaç uygulama*", "yaşamsal bulgu*", "vital bulgu*", "yara bakım*",
        "enfeksiyon kontrol*", "bakım plan*", "temel yaşam desteği", "elektronik sağlık kayıt*",
        "patientenversorgung", "medikamentengabe", "medikamentenverabreichung", "vitalzeichen", "wundversorgung",
        "infektionskontrolle", "pflegeplanung", "pflegedokumentation", "elektronische patientenakte",
        "elektronischen patientenakte", "grundpflege", "behandlungspflege",
        "cuidado del paciente", "cuidado de pacientes", "atención al paciente", "atención de pacientes",
        "administración de medicación", "administración de medicamentos", "constantes vitales", "signos vitales",
        "cura de heridas", "cuidado de heridas", "control de infecciones", "planes de cuidados", "plan de cuidados",
        "soporte vital básico", "historia clínica electrónica", "documentación clínica",
        "患者护理", "病人护理", "临床护理", "给药", "生命体征", "伤口护理", "感染控制", "护理计划", "电子病历",
        "基础生命支持", "护理记录",
        "रोगी देखभाल", "मरीजों की देखभाल", "दवा प्रशासन", "महत्वपूर्ण संकेत", "घाव की देखभाल", "संक्रमण नियंत्रण",
        "देखभाल योजना", "इलेक्ट्रॉनिक स्वास्थ्य रिकॉर्ड",
        "cuidado ao paciente", "cuidados ao paciente", "assistência ao paciente", "administração de medicamentos", "sinais vitais", "curativos", "controle de infecção", "controle de infecções", "plano de cuidados", "planos de cuidados", "suporte básico de vida", "prontuário eletrônico",
        "soins aux patients", "prise en charge des patients", "administration des médicaments", "surveillance des constantes", "soins des plaies", "prévention des infections", "hygiène hospitalière", "plan de soins", "plans de soins", "dossier patient informatisé", "dossier de soins", "gestes et soins d'urgence"],
    logistics: ["tedarik zinciri yönetimi", "tedarik zinciri planlama*", "stok yönetimi", "envanter yönetimi",
        "depo yönetimi", "talep planlama*", "satın alma", "satınalma", "navlun", "filo yönetimi", "son kilometre teslimat*",
        "sevkiyat planlama*", "lieferkettenmanagement", "bestandsmanagement", "bestandsführung", "lagerverwaltung",
        "lagerlogistik", "bedarfsplanung", "beschaffung", "fracht*", "fuhrparkmanagement", "letzte meile",
        "gestión de la cadena de suministro", "gestión de inventario", "gestión de inventarios", "gestión de almacén",
        "gestión de almacenes", "planificación de la demanda", "aprovisionamiento", "gestión de flotas", "última milla",
        "供应链管理", "库存管理", "仓储管理", "仓库管理", "需求计划", "采购", "货运", "第三方物流", "车队管理", "最后一公里",
        "आपूर्ति श्रृंखला प्रबंधन", "सप्लाई चेन मैनेजमेंट", "इन्वेंटरी प्रबंधन", "वेयरहाउस प्रबंधन", "गोदाम प्रबंधन", "खरीद प्रबंधन",
        "gestão da cadeia de suprimentos", "cadeia de suprimentos", "gestão de estoque*", "gestão de armazém", "planejamento da demanda", "planejamento de demanda", "suprimentos", "frete*", "gestão de frota*",
        "gestion de la chaîne d'approvisionnement", "chaîne d'approvisionnement", "gestion des stocks", "gestion d'entrepôt", "planification de la demande", "approvisionnements", "fret", "gestion de flotte", "dernier kilomètre", "transport de marchandises"],
}

// ── Section headings ─────────────────────────────────────────────────────────
// Tested against the folded line. Latin-script entries are regex sources joined into the
// English patterns in analyze.ts (which end in \b); Chinese and Hindi have no ASCII word
// boundary, so they get their own start-anchored patterns.
export const INTL_JOB_HEADING = String.raw`aranan nitelikler|genel nitelikler|nitelikler|gereksinimler|sorumluluklar|is tanimi|gorev tanimi|gorevler|anforderungen|aufgaben|ihre aufgaben|deine aufgaben|ihr profil|dein profil|qualifikationen|das bringst du mit|das bringen sie mit|was sie mitbringen|requisitos|responsabilidades|funciones|tu perfil|que buscamos|cualificaciones|perfil buscado|requisitos e qualificacoes|qualificacoes|atribuicoes|responsabilidades e atribuicoes|principais atividades|o que buscamos|o que procuramos|perfil desejado|seu perfil|profil recherche|votre profil|vos missions|missions principales|description du poste|competences requises|responsabilites|ce que nous recherchons`
export const INTL_BOILERPLATE_HEADING = String.raw`hakkimizda|biz kimiz|neler sunuyoruz|yan haklar|sirket hakkinda|uber uns|wir bieten|das bieten wir|was wir bieten|unser angebot|sobre nosotros|quienes somos|que ofrecemos|ofrecemos|beneficios|sobre nos|quem somos|o que oferecemos|oferecemos|qui sommes-nous|qui sommes nous|a propos de nous|ce que nous offrons|nous offrons|pourquoi nous rejoindre`
export const INTL_NICE_HEADING = String.raw`tercih sebepleri|tercih sebebi|wunschenswert|von vorteil|deseable|se valorara|valorable|desejavel|diferenciais|diferencial|atouts|les plus|serait un plus|souhaite`
export const INTL_NICE_INLINE = String.raw`tercih sebebi|tercih edilir|von vorteil|wunschenswert|se valorara|es un plus|deseable|desejavel|sera um diferencial|e um diferencial|e um plus|serait un plus|est un plus|un atout|apprecie`

export const NONLATIN_JOB_HEADING = /^(岗位职责|工作职责|职位职责|任职要求|岗位要求|职位要求|任职资格|职位描述|工作内容|技能要求|आवश्यकताएं|आवश्यकताएँ|जिम्मेदारियां|जिम्मेदारियाँ|मुख्य जिम्मेदारियां|योग्यताएं|योग्यता|कार्य विवरण)/
export const NONLATIN_BOILERPLATE_HEADING = /^(公司介绍|公司简介|关于我们|福利待遇|公司福利|薪资福利|我们提供|हमारे बारे में|कंपनी के बारे में|हम क्या प्रदान करते हैं|लाभ)/
export const NONLATIN_NICE_HEADING = /^(加分项|优先条件|优先考虑|वांछनीय|अतिरिक्त योग्यता)/
export const NONLATIN_NICE_INLINE = /优先|加分|वांछनीय|प्राथमिकता दी जाएगी/

// ── Years of experience ──────────────────────────────────────────────────────
// Folded Latin-script words, spliced into the English patterns in analyze.ts.
export const INTL_YEARS_UNIT = String.raw`yil(?:lik)?|jahren?|anos?|ans`
export const INTL_EXPERIENCE_WORD = String.raw`deneyim|tecrube|berufserfahrung|erfahrung|experiencia`
export const INTL_AT_LEAST = String.raw`en\s+az|mindestens|al\s+menos|como\s+minimo|minimo(?:\s+de)?|no\s+minimo|pelo\s+menos|au\s+moins`
export const INTL_RANGE_SEP = String.raw`bis|a|ile`

const HAN_NUMERALS: Record<string, number> = { 一: 1, 二: 2, 两: 2, 三: 3, 四: 4, 五: 5, 六: 6, 七: 7, 八: 8, 九: 9, 十: 10 }
// "3年以上工作经验", "五年相关经验", "至少3年" · "5 वर्ष का अनुभव", "कम से कम 3 साल"
// Up to 30 characters between the count and "经验": postings often name the skill in
// between ("3 年以上 React 和 TypeScript 开发经验"); a comma or full stop still ends the match.
const ZH_YEARS_RE = /(\d{1,2}|[一二两三四五六七八九十])\s*\+?\s*年(?:及?以上)?[^\n。；;，,]{0,30}?(?:经验|經驗|工作经历)/g
const ZH_AT_LEAST_RE = /(?:至少|不少于|最少)\s*(\d{1,2}|[一二两三四五六七八九十])\s*年/g
const HI_YEARS_RE = /(\d{1,2})\s*\+?\s*(?:वर्षों|वर्ष|सालों|साल)[^\n।.]{0,30}?(?:अनुभव|तजुर्बा)/g
const HI_AT_LEAST_RE = /(?:कम से कम|न्यूनतम)\s*(\d{1,2})\s*(?:वर्षों|वर्ष|सालों|साल)/g

/** Year counts written in Chinese or Hindi ("3年以上工作经验", "5 वर्ष का अनुभव"). */
export function nonLatinYears(text: string): number[] {
    const found: number[] = []
    for (const re of [ZH_YEARS_RE, ZH_AT_LEAST_RE, HI_YEARS_RE, HI_AT_LEAST_RE]) {
        for (const m of text.matchAll(re)) found.push(HAN_NUMERALS[m[1]] ?? Number(m[1]))
    }
    return found
}

// ── Dates on a CV ────────────────────────────────────────────────────────────
// Month prefixes (first three folded letters) beyond English and Dutch.
export const INTL_MONTHS: Record<string, number> = {
    // Turkish: ocak şubat mart nisan mayıs haziran temmuz ağustos eylül ekim kasım aralık
    oca: 1, sub: 2, nis: 4, haz: 6, tem: 7, agu: 8, eyl: 9, eki: 10, kas: 11, ara: 12,
    // German: märz mai dezember (the rest match English or Dutch)
    mai: 5, dez: 12,
    // Spanish: enero abril agosto diciembre
    ene: 1, abr: 4, ago: 8, dic: 12,
    // Portuguese: fevereiro setembro outubro (the rest match English, German or Spanish)
    fev: 2, set: 9, out: 10,
    // French: avril août (juin and juillet share "jui" and are left out: the year still counts)
    avr: 4, aou: 8,
}
export const INTL_PRESENT = String.raw`halen|devam ediyor|devam|gunumuz|bugun|heute|aktuell|actualidad|presente|hoy|atual|atualmente|o momento|aujourd['’]hui|actuellement|a ce jour|actuel`
export const INTL_DATE_SEP = String.raw`bis|a|hasta|al|ate`
export const INTL_SINCE = String.raw`seit|desde|depuis`
export const INTL_EDUCATION = String.raw`universite|universitesi|lisans|fakulte|fakultesi|mezun|egitim|universitat|hochschule|studium|abitur|ausbildung|universidad|licenciatura|grado|educacion|bachillerato|universidade|faculdade|graduacao|bacharelado|formacao academica|ensino superior|ecole|licence|diplome|baccalaureat`
// "医学院附属医院" (a hospital attached to a medical school) is an employer, not a degree.
export const NONLATIN_EDUCATION = /大学(?!附属)|学院(?!附属)|本科|硕士|博士|学士|教育背景|教育经历|विश्वविद्यालय|कॉलेज|स्नातक|शिक्षा/

/**
 * Rewrites Chinese and Hindi date wording into the "03/2018 - present" shape the date
 * reader already understands: "2018年3月 至今", "2018.03-2025.01", "2018 से वर्तमान".
 */
export function canonicalDates(folded: string): string {
    return folded
        .replace(/(\d{4})\s*年\s*(\d{1,2})\s*月/g, " $2/$1 ")
        .replace(/(\d{4})\s*年/g, "$1 ")
        .replace(/\b((?:19|20)\d{2})[./](\d{1,2})(?!\d)/g, " $2/$1 ")
        // "至今" / "से वर्तमान" already mean "until now", with or without a dash before them
        .replace(/(?:[-–—~]|से)?\s*(?:至今|迄今|वर्तमान|अब तक)/g, " - present ")
        .replace(/现在|目前/g, " present ")
        .replace(/(\d)\s*(?:至|到|~|से)\s*(?=\d|present)/g, "$1 - ")
}

// Seniority words in a CV title, used only when no years or dates are written.
export const NONLATIN_SENIORITY: [RegExp, number][] = [
    [/总监|架构师|निदेशक/, 10],
    [/资深|高级|主管|वरिष्ठ/, 5],
    [/初级|实习|应届|कनिष्ठ|प्रशिक्षु/, 1],
]

/**
 * True when a text reads as English: at least 3% of its words are English function
 * words. None of the six is a word in Turkish, German, Spanish, Portuguese, French or Dutch, so prose in
 * those languages scores near zero; even terse English CV bullets clear the bar.
 */
export function looksEnglish(text: string): boolean {
    const words = text.toLowerCase().match(/[a-z]+/g) ?? []
    if (words.length === 0) return false
    const hits = words.filter(w => w === "the" || w === "and" || w === "of" || w === "to" || w === "for" || w === "with").length
    return hits / words.length >= 0.03
}

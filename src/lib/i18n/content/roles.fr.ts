import type { RoleGuide } from "@/lib/roles";

export const ROLES: RoleGuide[] = [
  {
    slug: "ai-engineer",
    name: "Ingénieur IA",
    alsoCalled: ["AI Engineer", "Ingénieur IA générative", "LLM Engineer", "Ingénieur en intelligence artificielle"],
    metaDescription:
      "Mots-clés pour un CV d'ingénieur IA : LLM, RAG, embeddings, bases de données vectorielles et evals. Comparez votre CV à n'importe quelle offre, gratuitement.",
    intro:
      "Ingénieur IA est le métier qui progresse le plus vite dans la tech, et les offres sont inhabituellement précises : quelle API de modèle, quelle chaîne de recherche documentaire, comment vous évaluez la qualité et comment vous mettez en production. Les recruteurs cherchent la preuve que vous avez amené une fonctionnalité LLM du prototype à la production, pas seulement que vous avez appelé une API depuis un notebook.",
    groups: [
      { title: "LLM et frameworks", keywords: ["LLM", "Grands modèles de langage", "OpenAI API", "Anthropic API", "LangChain", "LlamaIndex", "Prompt engineering", "Function calling", "Agents IA"] },
      { title: "Recherche documentaire (RAG)", keywords: ["RAG", "Embeddings", "Base de données vectorielle", "pgvector", "Pinecone", "Weaviate", "Recherche sémantique", "Chunking"] },
      { title: "Qualité et déploiement", keywords: ["Evals", "Évaluation de LLM", "Fine-tuning", "Hugging Face", "Déploiement de modèles", "MLOps", "MLflow", "Guardrails"] },
      { title: "Socle d'ingénierie", keywords: ["Python", "FastAPI", "TypeScript", "Docker", "AWS", "SQL", "CI/CD", "Git"] },
    ],
    tips: [
      { title: "Montrez une fonctionnalité LLM en production, de bout en bout", text: "« J'ai développé un assistant RAG sur 40 000 articles d'aide qui traite 3 000 demandes par jour » prouve plus qu'une liste de frameworks. Citez le modèle, la chaîne de recherche et le volume." },
      { title: "Chiffrez la qualité, la latence et le coût", text: "Les équipes IA vivent des evals. « Précision des réponses passée de 71 % à 89 % sur un jeu de 500 questions, coût par requête réduit de 40 % » est exactement ce que cherche un recruteur." },
      { title: "Gardez l'ingénierie logicielle visible", text: "La plupart des postes d'ingénieur IA sont avant tout des postes d'ingénierie. API, tests, CI/CD et déploiement cloud doivent apparaître sur le CV à côté du travail sur les LLM." },
    ],
    faqs: [
      { q: "Quels mots-clés mettre dans un CV d'ingénieur IA ?", a: "Les API de modèles et les frameworks que vous avez utilisés (API OpenAI ou Anthropic, LangChain, LlamaIndex), les termes de recherche documentaire (RAG, embeddings, une base de données vectorielle comme pgvector ou Pinecone), les termes de qualité et de déploiement (evals, fine-tuning, MLOps, déploiement de modèles) et le socle d'ingénierie : Python, FastAPI, Docker, cloud et CI/CD." },
      { q: "Quelle différence entre un CV d'ingénieur IA et un CV d'ingénieur machine learning ?", a: "Le CV d'un ingénieur machine learning tourne autour de l'entraînement de modèles : feature engineering, PyTorch ou TensorFlow, performance du modèle. Celui d'un ingénieur IA tourne autour de la création de produits sur de grands modèles de langage : prompting, RAG, evals, agents et fonctionnalités LLM livrées aux utilisateurs." },
    ],
  },
  {
    slug: "frontend-developer",
    name: "Développeur Frontend",
    alsoCalled: ["Frontend Developer", "Développeur front-end", "Développeur React", "Intégrateur web"],
    metaDescription:
      "Mots-clés pour un CV de développeur frontend : React, TypeScript, Next.js, tests et accessibilité. Comparez votre CV à n'importe quelle offre, gratuitement.",
    intro:
      "Les offres frontend sont chargées de mots-clés : elles citent souvent explicitement un framework, un langage, une façon de gérer les styles, une stack de tests et un processus de livraison. Les recruteurs et les logiciels de tri cherchent ces mêmes termes dans votre CV ; citer les outils que vous avez vraiment utilisés, avec les mots de l'offre, compte ici plus que pour presque tout autre métier.",
    groups: [
      { title: "Langages et frameworks", keywords: ["JavaScript", "TypeScript", "React", "Next.js", "Vue", "Angular", "HTML5", "CSS3"] },
      { title: "Styles et interface", keywords: ["Tailwind CSS", "Sass", "CSS Modules", "Responsive design", "Design systems", "Storybook", "Figma"] },
      { title: "État et données", keywords: ["Redux", "Zustand", "React Query", "API REST", "GraphQL", "WebSockets"] },
      { title: "Qualité et livraison", keywords: ["Jest", "Cypress", "Playwright", "React Testing Library", "Tests unitaires", "Accessibilité (WCAG)", "Core Web Vitals", "Git", "CI/CD", "GitHub Actions", "Agile / Scrum"] },
    ],
    tips: [
      { title: "Citez le framework avec le résultat", text: "« Refonte du tunnel de paiement en React et TypeScript, temps de chargement réduit de 40 % » apporte le mot-clé et la preuve. Une liste de compétences seule n'apporte que le mot-clé." },
      { title: "Écrivez les noms comme l'offre", text: "Si l'offre dit « Next.js » et « Tailwind CSS », écrivez exactement cela, pas « NextJS » ni « Tailwind ». Les filtres simples comparent le texte à la lettre." },
      { title: "N'oubliez pas les termes moins visibles", text: "Accessibilité, tests et CI/CD apparaissent dans la plupart des offres frontend et manquent dans la plupart des CV frontend. Si vous l'avez fait, dites-le." },
    ],
    faqs: [
      { q: "Quels mots-clés mettre dans un CV de développeur frontend ?", a: "Commencez par la stack citée dans l'offre, en général JavaScript, TypeScript et React ou un autre framework. Ajoutez ensuite les styles (Tailwind CSS, Sass), les données (API REST, GraphQL), les tests (Jest, Cypress, Playwright) et les termes de livraison (Git, CI/CD, Agile). N'indiquez que les outils que vous avez vraiment utilisés." },
      { q: "Combien de mots-clés dans un CV de développeur frontend ?", a: "Il n'y a pas de nombre idéal. Couvrez les compétences que cette offre précise répète ou met dans l'intitulé, chacune étayée par une ligne d'expérience réelle. Un CV ajusté à une offre vaut mieux qu'un CV rempli de tous les frameworks." },
    ],
  },
  {
    slug: "backend-engineer",
    name: "Développeur Backend",
    alsoCalled: ["Backend Developer", "Ingénieur backend", "Développeur back-end", "Développeur API"],
    metaDescription:
      "Mots-clés pour un CV de développeur backend : langages, bases de données, cloud, conteneurs et API. Comparez votre CV à n'importe quelle offre.",
    intro:
      "Les offres backend décrivent un système autant qu'une personne : un langage, une base de données, un fournisseur cloud, un mode de déploiement. Votre CV est lu avec cette image en tête. Les meilleurs CV backend citent chaque couche de la stack sur laquelle la personne a travaillé et y associent un chiffre de volume ou de fiabilité.",
    groups: [
      { title: "Langages et frameworks", keywords: ["Python", "Node.js", "Java", "Go", "C#", "Django", "FastAPI", "Express", "Spring Boot"] },
      { title: "Données et stockage", keywords: ["SQL", "PostgreSQL", "MySQL", "MongoDB", "Redis", "Kafka", "Elasticsearch", "Modélisation des données"] },
      { title: "Cloud et infrastructure", keywords: ["AWS", "Azure", "Google Cloud", "Docker", "Kubernetes", "Terraform", "Serverless", "CI/CD"] },
      { title: "Architecture et bonnes pratiques", keywords: ["API REST", "GraphQL", "gRPC", "Microservices", "Architecture orientée événements", "Authentification (OAuth, JWT)", "Tests unitaires et d'intégration", "Observabilité", "Scalabilité"] },
    ],
    tips: [
      { title: "Chiffrez le volume", text: "Requêtes par seconde, lignes, latence, disponibilité. « Conception d'un schéma PostgreSQL servant 2 millions de requêtes par jour » en dit bien plus que « travail sur PostgreSQL »." },
      { title: "Citez les services cloud, pas seulement le cloud", text: "Les offres qui demandent AWS citent souvent des services précis. Si vous avez utilisé Lambda, S3 ou RDS, mettez-les à côté d'« AWS »." },
      { title: "Montrez que vous avez porté tout le cycle", text: "Concevoir, développer, déployer, superviser. Les offres backend demandent de plus en plus d'expérience d'astreinte et d'observabilité : indiquez-la si vous l'avez." },
    ],
    faqs: [
      { q: "Quels mots-clés mettre dans un CV de développeur backend ?", a: "Le langage et le framework de l'offre (par exemple Python avec Django ou FastAPI, ou Node.js), les bases de données utilisées (PostgreSQL, Redis, MongoDB), votre expérience du cloud et des conteneurs (AWS, Docker, Kubernetes) et des termes d'architecture comme API REST, microservices et tests." },
      { q: "Faut-il lister tous les langages de programmation que je connais ?", a: "Non. Commencez par les langages demandés dans l'offre et sur lesquels vous passeriez un entretien demain. Une longue liste de langages utilisés une seule fois enlève du poids à ceux qui comptent." },
    ],
  },
  {
    slug: "machine-learning-engineer",
    name: "Ingénieur Machine Learning",
    alsoCalled: ["Machine Learning Engineer", "ML Engineer", "Ingénieur MLOps", "Ingénieur en apprentissage automatique"],
    metaDescription:
      "Mots-clés pour un CV d'ingénieur machine learning : Python, PyTorch, entraînement de modèles, MLOps et déploiement. Comparez votre CV gratuitement.",
    intro:
      "Les offres d'ingénieur machine learning se situent entre data science et ingénierie logicielle : elles veulent des modèles bien entraînés qui tournent de façon fiable en production. Les CV qui ne montrent que des notebooks, ou que de l'infrastructure, laissent de côté la moitié de ce qui est évalué. Les meilleurs montrent le cycle complet : données, entraînement, évaluation, déploiement et supervision.",
    groups: [
      { title: "Modélisation", keywords: ["Machine learning", "Apprentissage automatique", "Deep learning", "PyTorch", "TensorFlow", "scikit-learn", "Feature engineering", "Évaluation de modèles"] },
      { title: "Données", keywords: ["Python", "SQL", "Pandas", "Spark", "Pipelines de données", "Airflow", "Feature store"] },
      { title: "MLOps et déploiement", keywords: ["MLOps", "Déploiement de modèles", "Model serving", "MLflow", "Kubeflow", "SageMaker", "Vertex AI", "Supervision des modèles"] },
      { title: "Ingénierie", keywords: ["Docker", "Kubernetes", "AWS", "CI/CD", "API REST", "Git", "Tests unitaires"] },
    ],
    tips: [
      { title: "Montrez un modèle en production, avec une métrique", text: "« Déploiement d'un modèle de ranking servant 5 millions de prédictions par jour, CTR amélioré de 8 % » couvre modélisation, volume et impact en une ligne." },
      { title: "Citez votre stack MLOps", text: "Les outils de suivi d'expériences, de registre de modèles, de serving et de supervision figurent explicitement dans la plupart des offres. MLflow, SageMaker ou Vertex AI sont des correspondances de mots-clés très simples." },
      { title: "Ne cachez pas l'ingénierie logicielle", text: "Tests, CI/CD, conteneurs et API sont ce qui distingue un ingénieur ML d'un data scientist au premier tri." },
    ],
    faqs: [
      { q: "Quels mots-clés mettre dans un CV d'ingénieur machine learning ?", a: "Python et un framework de deep learning (PyTorch ou TensorFlow), scikit-learn et feature engineering, des outils de données comme SQL et Spark, des termes de MLOps et de déploiement (MLflow, model serving, supervision, SageMaker ou Vertex AI) et le socle d'ingénierie : Docker, Kubernetes et CI/CD." },
      { q: "Quelle différence entre un CV d'ingénieur ML et un CV de data scientist ?", a: "Le CV d'un data scientist met l'accent sur l'analyse, les statistiques et l'expérimentation. Celui d'un ingénieur ML, sur la construction, le déploiement et l'exploitation de modèles en production : pipelines, serving, supervision et pratiques d'ingénierie logicielle." },
    ],
  },
  {
    slug: "software-engineer",
    name: "Ingénieur Logiciel",
    alsoCalled: ["Software Engineer", "Développeur logiciel", "Développeur Full Stack", "Ingénieur développement"],
    metaDescription:
      "Mots-clés pour un CV d'ingénieur logiciel : langages, frameworks, cloud, tests et conception de systèmes. Comparez votre CV à n'importe quelle offre.",
    intro:
      "« Ingénieur logiciel » est l'intitulé le plus large de la tech, c'est donc l'offre elle-même qui définit le poste : pour une entreprise, c'est du backend Java, pour une autre du full stack TypeScript, pour une autre du C++ embarqué. Les CV génériques peinent ici. Les mots-clés qui comptent sont le langage, le framework et la plateforme précis de l'offre, plus les pratiques d'ingénierie que toute équipe logicielle apprécie.",
    groups: [
      { title: "Langages", keywords: ["Java", "Python", "TypeScript", "JavaScript", "C#", "Go", "C++", "Kotlin"] },
      { title: "Frameworks et plateformes", keywords: ["React", "Node.js", "Spring Boot", ".NET", "Django", "API REST", "GraphQL", "Microservices"] },
      { title: "Données et cloud", keywords: ["SQL", "PostgreSQL", "MongoDB", "Redis", "AWS", "Azure", "Docker", "Kubernetes"] },
      { title: "Pratiques d'ingénierie", keywords: ["Conception de systèmes", "Structures de données et algorithmes", "Tests unitaires", "Revue de code", "CI/CD", "Git", "Gestion de versions", "Agile / Scrum", "Clean code"] },
    ],
    tips: [
      { title: "Commencez par le langage principal de l'offre", text: "Si le poste est en Java, Java doit figurer dans votre accroche et votre poste le plus récent, pas au milieu de la liste de compétences. Les recruteurs filtrent souvent sur le premier langage qu'ils lisent." },
      { title: "Montrez le périmètre, pas seulement la stack", text: "« Conception du service de paiement qui traite 3 millions de transactions par mois » montre une capacité de conception de systèmes. Recruteurs comme interviewers cherchent la preuve que vous avez construit quelque chose de bout en bout." },
      { title: "Citez les pratiques", text: "Revue de code, tests, CI/CD et astreintes figurent dans la plupart des offres d'ingénierie logicielle. Une ligne concrète sur chacune vaut mieux qu'une simple liste." },
    ],
    faqs: [
      { q: "Quels mots-clés mettre dans un CV d'ingénieur logiciel ?", a: "Le langage et le framework cités dans l'offre (par exemple Java avec Spring Boot, ou TypeScript avec React et Node.js), les bases de données et la plateforme cloud utilisées, et des pratiques d'ingénierie comme la conception de systèmes, les tests unitaires, la revue de code, la CI/CD et Git." },
      { q: "Faut-il écrire « structures de données et algorithmes » dans un CV d'ingénieur logiciel ?", a: "Rarement en mot-clé isolé. Montrez-le par votre travail : gains de performance, problèmes de passage à l'échelle résolus. Gardez les questions d'algorithmique pour l'entretien." },
    ],
  },
  {
    slug: "data-scientist",
    name: "Data Scientist",
    alsoCalled: ["Scientifique des données", "Machine Learning Engineer", "Applied Scientist", "Spécialiste en science des données"],
    metaDescription:
      "Mots-clés pour un CV de data scientist : Python, machine learning, statistiques, SQL et déploiement. Comparez votre CV à n'importe quelle offre, gratuitement.",
    intro:
      "Les offres de data scientist évaluent deux choses à la fois : la profondeur en modélisation (statistiques, machine learning, expérimentation) et l'ingénierie nécessaire pour qu'un modèle soit réellement utilisé (SQL, pipelines, déploiement). Les CV remplis d'algorithmes qui ne disent rien de l'impact métier ni de l'usage en production sont ceux qui restent bloqués au tri.",
    groups: [
      { title: "Langages et bibliothèques", keywords: ["Python", "R", "SQL", "Pandas", "NumPy", "scikit-learn", "PyTorch", "TensorFlow"] },
      { title: "Modélisation et statistiques", keywords: ["Machine learning", "Apprentissage automatique", "Statistiques", "Régression", "Classification", "Séries temporelles", "Tests A/B", "Inférence causale", "Feature engineering"] },
      { title: "Données et déploiement", keywords: ["Spark", "BigQuery", "Snowflake", "Airflow", "MLflow", "Docker", "AWS SageMaker", "Déploiement de modèles"] },
      { title: "IA et communication", keywords: ["NLP", "LLM", "Deep learning", "Visualisation de données", "Communication avec les parties prenantes", "Plan d'expérience"] },
    ],
    tips: [
      { title: "Reliez chaque modèle à une métrique qui a bougé", text: "« Modèle de churn qui a réduit les résiliations de 12 % » est ce que l'on cherche au tri. La précision du modèle seule ne dit pas au lecteur que le travail a compté." },
      { title: "Montrez que c'est allé en production", text: "Citez le déploiement, la supervision ou le pipeline qui sert les prédictions. Beaucoup d'offres distinguent ceux qui restent dans les notebooks de ceux qui mettent des modèles en production." },
      { title: "Adaptez-vous au type d'offre", text: "Les postes axés sur l'expérimentation demandent tests A/B et inférence causale ; ceux d'ingénierie ML, déploiement et MLOps. Orientez votre CV vers celui que vous avez sous les yeux." },
    ],
    faqs: [
      { q: "Quels mots-clés mettre dans un CV de data scientist ?", a: "D'abord Python et SQL ; puis les bibliothèques que vous utilisez (Pandas, scikit-learn, PyTorch ou TensorFlow), des termes de modélisation et de statistiques (machine learning, régression, tests A/B, prévision) et les outils de données ou de déploiement cités dans l'offre, comme Spark, Airflow ou MLflow." },
      { q: "Quelle différence entre les mots-clés de data scientist et de data analyst ?", a: "Les offres de data analyst tournent autour de SQL, des tableaux de bord et des outils de BI comme Tableau ou Power BI. Celles de data scientist y ajoutent machine learning, statistiques, bibliothèques Python et déploiement de modèles." },
    ],
  },
  {
    slug: "account-executive",
    name: "Account Executive",
    alsoCalled: ["Commercial B2B", "Ingénieur commercial", "Business Developer", "Chargé d'affaires SaaS"],
    metaDescription:
      "Mots-clés pour un CV d'account executive : objectifs, pipeline, Salesforce, prospection et vente B2B SaaS. Comparez votre CV à n'importe quelle offre.",
    intro:
      "Les offres commerciales se lisent comme un tableau de score : objectifs, taille des contrats, cycle de vente, CRM. Les recruteurs cherchent la même chose dans les CV d'account executive, et vite : un CV qui décrit des missions plutôt que des chiffres, ou qui ne cite jamais le CRM, arrive rarement en short-list même avec une solide expérience.",
    groups: [
      { title: "Processus de vente", keywords: ["Vente B2B", "Vente SaaS", "Cycle de vente complet", "Prospection commerciale", "Cold calling", "Génération de leads", "Outbound", "Closing"] },
      { title: "Résultats et indicateurs", keywords: ["Atteinte des objectifs", "Gestion du pipeline", "Panier moyen (ACV)", "Taux de transformation", "Prévisions de ventes", "Croissance du chiffre d'affaires", "Upselling", "Renouvellements"] },
      { title: "Outils", keywords: ["Salesforce", "HubSpot", "CRM", "LinkedIn Sales Navigator", "Gong", "Outreach", "Excel"] },
      { title: "Compétences et méthodes", keywords: ["Négociation", "Gestion de comptes", "Développement commercial", "Découverte des besoins", "MEDDIC", "Vente consultative", "Gestion des parties prenantes"] },
    ],
    tips: [
      { title: "Ouvrez chaque poste sur l'atteinte des objectifs", text: "« 1,2 M€ signés pour un objectif de 900 000 € (133 %) » est la première chose que cherche un directeur commercial. Mettez-le dans la première ligne de chaque poste, pas caché à la fin." },
      { title: "Indiquez la taille des contrats et la durée du cycle", text: "Les postes mid-market et grands comptes recrutent sur les contrats que vous avez vraiment portés. La valeur moyenne des contrats et la durée du cycle disent tout de suite au lecteur si vous correspondez." },
      { title: "Citez le CRM et la méthode", text: "Salesforce ou HubSpot figurent dans la plupart des offres, et beaucoup citent une méthode de qualification comme MEDDIC. Si vous les utilisez, écrivez-les." },
    ],
    faqs: [
      { q: "Quels mots-clés mettre dans un CV d'account executive ?", a: "Vente B2B ou SaaS, atteinte des objectifs, gestion du pipeline, prospection et closing, le CRM que vous utilisez (en général Salesforce ou HubSpot), négociation et gestion de comptes, chacun étayé par un chiffre comme le chiffre d'affaires signé ou le pourcentage d'objectif." },
      { q: "Comment montrer mes résultats commerciaux sur mon CV ?", a: "Utilisez les indicateurs que suivait votre manager : pourcentage d'objectif, chiffre d'affaires signé, taille moyenne des contrats, taux de transformation et rang dans l'équipe. Un chiffre concret par poste vaut mieux qu'une liste de responsabilités." },
    ],
  },
  {
    slug: "digital-marketing-specialist",
    name: "Chargé de Marketing Digital",
    alsoCalled: ["Digital Marketing Manager", "Responsable marketing digital", "Traffic manager", "Chargé d'acquisition"],
    metaDescription:
      "Mots-clés pour un CV en marketing digital : SEO, Google Ads, contenu, e-mailing, analytics et automatisation. Comparez votre CV à n'importe quelle offre.",
    intro:
      "Les offres de marketing digital citent explicitement des canaux et des outils : référencement naturel, acquisition payante, réseaux sociaux, e-mailing, et la stack d'analytics et d'automatisation derrière. Les CV généralistes qui disent « gestion de campagnes » sans citer le canal, le budget ni le résultat sont ceux qui passent inaperçus.",
    groups: [
      { title: "Canaux", keywords: ["SEO", "SEA / PPC", "Google Ads", "Meta Ads", "Marketing de contenu", "E-mail marketing", "Marketing sur les réseaux sociaux", "Affiliation"] },
      { title: "Analytics et tests", keywords: ["Google Analytics (GA4)", "Google Tag Manager", "Tests A/B", "Optimisation de la conversion (CRO)", "Attribution", "Reporting de KPI", "Looker Studio"] },
      { title: "Outils et automatisation", keywords: ["HubSpot", "Automatisation marketing", "Brevo", "Mailchimp", "Semrush", "Ahrefs", "CMS (WordPress)", "Canva"] },
      { title: "Stratégie", keywords: ["Gestion de campagnes", "Gestion de budget", "Acquisition de clients", "Optimisation du funnel", "Marketing de marque", "Copywriting", "Growth marketing"] },
    ],
    tips: [
      { title: "Mettez un chiffre sur chaque canal", text: "« Trafic organique +180 % en 9 mois » ou « Coût par lead passé de 42 € à 19 € sur Google Ads » : canal, indicateur et délai en une ligne." },
      { title: "Indiquez le budget géré", text: "Sur les postes d'acquisition payante, on recrute selon le niveau d'investissement. « 25 000 € par mois gérés entre Google et Meta » vous situe immédiatement." },
      { title: "Reprenez la stack de l'offre", text: "GA4, Tag Manager, HubSpot, Semrush : les noms d'outils sont des correspondances de mots-clés simples et les recruteurs filtrent dessus." },
    ],
    faqs: [
      { q: "Quels mots-clés mettre dans un CV de chargé de marketing digital ?", a: "Les canaux sur lesquels vous travaillez (SEO, Google Ads, Meta Ads, e-mailing, contenu, réseaux sociaux), les outils d'analytics (GA4, Google Tag Manager), les outils d'automatisation et de CRM comme HubSpot, et des termes de résultat comme optimisation de la conversion, acquisition de clients et gestion de budget." },
      { q: "Un CV marketing doit-il contenir des chiffres ?", a: "Oui. Trafic, taux de conversion, coût d'acquisition, retour sur dépenses publicitaires (ROAS) et chiffre d'affaires attribué sont ce que les recruteurs utilisent pour comparer les candidats. Mettez-en au moins un par poste." },
    ],
  },
  {
    slug: "financial-analyst",
    name: "Analyste Financier",
    alsoCalled: ["Analyste FP&A", "Contrôleur de gestion", "Finance Business Partner", "Analyste planification financière"],
    metaDescription:
      "Mots-clés pour un CV d'analyste financier : modélisation financière, FP&A, budget, forecast, Excel et Power BI. Comparez votre CV gratuitement.",
    intro:
      "Les offres d'analyste financier sont construites autour d'un cycle (budget, prévisions, clôture, reporting) et des outils qui le pilotent. Les recruteurs cherchent ces mêmes mots dans votre CV, avec la preuve que vos chiffres ont changé une décision. Un CV qui écrit « Excel » sans dire ce qui a été modélisé, ni pour qui, se démarque rarement.",
    groups: [
      { title: "Planification et analyse", keywords: ["FP&A", "Modélisation financière", "Élaboration budgétaire", "Forecast", "Analyse des écarts", "Analyse de scénarios", "Business cases"] },
      { title: "Reporting et comptabilité", keywords: ["Reporting de gestion", "Clôture mensuelle", "Rapprochements bancaires", "IFRS", "Normes comptables françaises", "Compte de résultat", "Trésorerie"] },
      { title: "Outils", keywords: ["Excel (tableaux croisés dynamiques, RECHERCHEV, formules avancées)", "Power BI", "SQL", "SAP", "Oracle NetSuite", "Anaplan"] },
      { title: "Compétences", keywords: ["Gestion des parties prenantes", "Analyse financière", "Contrôle de gestion", "Data storytelling", "Reporting de KPI", "Maîtrise des coûts"] },
    ],
    tips: [
      { title: "Montrez la décision que votre analyse a portée", text: "« Modèle de pricing qui a justifié une hausse de 6 % valorisée à 1,8 M€ » en dit bien plus que « responsable des modèles financiers »." },
      { title: "Citez le cycle dont vous étiez responsable", text: "Budget annuel, rolling forecast, clôture mensuelle : dites lesquels vous avez pilotés et pour une activité de quelle taille (chiffre d'affaires, centres de coûts, entités)." },
      { title: "Soyez précis sur Excel et la BI", text: "« Excel » est dans tous les CV finance. Indiquez le niveau (modèles financiers, tableaux croisés dynamiques, Power Query) et l'outil de BI cité dans l'offre, comme Power BI." },
    ],
    faqs: [
      { q: "Quels mots-clés mettre dans un CV d'analyste financier ?", a: "FP&A, modélisation financière, élaboration budgétaire, forecast et analyse des écarts ; des termes de reporting comme reporting de gestion, clôture mensuelle et IFRS ; et les outils cités dans l'offre : presque toujours Excel, souvent Power BI, SQL ou un ERP comme SAP." },
      { q: "Comment montrer mon impact dans un CV finance ?", a: "Reliez votre travail à de l'argent ou à des décisions : économies identifiées, meilleure précision des prévisions, budget dont vous aviez la charge, business case validé. Un chiffre concret par poste suffit." },
    ],
  },
  {
    slug: "project-manager",
    name: "Chef de Projet",
    alsoCalled: ["Project Manager", "Chef de projet IT", "Directeur de projet", "PMO"],
    metaDescription:
      "Mots-clés pour un CV de chef de projet : planification, gestion des risques, parties prenantes, Agile, PMP et budget. Comparez votre CV gratuitement.",
    intro:
      "Les offres de chef de projet évaluent trois choses : les méthodes que vous utilisez, la taille de ce que vous avez livré et la façon dont vous gérez les personnes et les risques. Les recruteurs cherchent les noms de méthodes (Agile, Scrum, PRINCE2, PMP) et des chiffres (budget, taille d'équipe, délais) qui montrent l'échelle que vous pouvez porter.",
    groups: [
      { title: "Méthodes et certifications", keywords: ["Gestion de projet", "Agile", "Scrum", "Cycle en V", "PRINCE2", "PMP", "Kanban"] },
      { title: "Livraison", keywords: ["Planification de projet", "Gestion du périmètre", "Gestion des risques", "Gestion de budget", "Planification des ressources", "Jalons", "Conduite du changement"] },
      { title: "Personnes", keywords: ["Gestion des parties prenantes", "Équipes pluridisciplinaires", "Gestion des fournisseurs", "Communication", "Reporting d'avancement", "Comité de pilotage"] },
      { title: "Outils", keywords: ["Jira", "Confluence", "MS Project", "Asana", "Smartsheet", "Excel"] },
    ],
    tips: [
      { title: "Commencez par l'échelle et le résultat", text: "« Déploiement d'un ERP de 2 M€ dans 4 pays, livré dans les délais et 6 % sous le budget » dit au recruteur exactement ce que vous pouvez porter." },
      { title: "Citez la méthode et la certification", text: "PRINCE2, PMP, Scrum Master : si vous en avez une, placez-la près du début. Beaucoup d'offres filtrent dessus." },
      { title: "Montrez comment vous avez géré les risques", text: "Une ligne sur un risque repéré à temps et la mesure prise indique plus de séniorité qu'une liste d'outils." },
    ],
    faqs: [
      { q: "Quels mots-clés mettre dans un CV de chef de projet ?", a: "Gestion de projet, les méthodes que vous utilisez (Agile, Scrum, cycle en V, PRINCE2), des certifications comme PMP, des termes de livraison (planification, gestion du périmètre, des risques et du budget), des compétences humaines (gestion des parties prenantes et des fournisseurs) et vos outils de pilotage, en général Jira, Confluence ou MS Project." },
      { q: "PMP ou PRINCE2 : laquelle valorise le plus un CV ?", a: "Celle que cite l'offre. PRINCE2 est plus courante au Royaume-Uni et en Europe, PMP aux États-Unis et dans les groupes internationaux ; les deux sont reconnues, et mettre celle que demande l'entreprise est une correspondance directe de mot-clé." },
    ],
  },
  {
    slug: "recruiter",
    name: "Chargé de Recrutement",
    alsoCalled: ["Recruteur", "Talent Acquisition Specialist", "Tech Recruiter", "Chargé d'acquisition de talents"],
    metaDescription:
      "Mots-clés pour un CV de chargé de recrutement : sourcing, recrutement de bout en bout, ATS, parties prenantes et délai d'embauche. Comparez votre CV.",
    intro:
      "Les recruteurs rédigent des offres toute la journée, et pourtant leurs propres CV sont souvent les plus vagues de la pile. Les postes d'acquisition de talents sont évalués sur le volume de recrutements que vous avez portés, les profils que vous recrutez, les outils avec lesquels vous sourcez et les indicateurs sur lesquels vous étiez mesuré.",
    groups: [
      { title: "Recrutement", keywords: ["Recrutement de bout en bout", "Sourcing", "Chasse de têtes", "Recrutement tech", "Présélection des CV", "Entretiens", "Négociation des offres", "Recrutement en volume"] },
      { title: "Outils", keywords: ["Logiciel de suivi des candidatures (ATS)", "Workday", "Greenhouse", "Taleo", "LinkedIn Recruiter", "Recherche booléenne", "Excel"] },
      { title: "Indicateurs", keywords: ["Délai d'embauche (time to hire)", "Coût par recrutement", "Taux d'acceptation des offres", "Reporting du pipeline", "Qualité du recrutement", "Objectifs de recrutement"] },
      { title: "Partenariat avec le métier", keywords: ["Gestion des parties prenantes", "Acquisition de talents", "Partenariat avec les managers", "Marque employeur", "Expérience candidat", "Diversité et inclusion", "Onboarding"] },
    ],
    tips: [
      { title: "Chiffrez vos recrutements", text: "« 45 ingénieurs recrutés en 12 mois avec un taux d'acceptation des offres de 92 % » est pour un recruteur l'équivalent d'un objectif commercial : mettez-le en premier." },
      { title: "Dites quels profils vous recrutez", text: "Tech, commerciaux, cadres dirigeants, recrutement en volume : les offres sont souvent spécialisées, et votre accroche devrait l'être aussi." },
      { title: "Indiquez l'ATS et les outils de sourcing", text: "Workday, Greenhouse, LinkedIn Recruiter et la recherche booléenne sont des correspondances directes de mots-clés dans les offres d'acquisition de talents." },
    ],
    faqs: [
      { q: "Quels mots-clés mettre dans un CV de chargé de recrutement ?", a: "Recrutement de bout en bout, sourcing et les profils que vous recrutez ; le logiciel de suivi des candidatures et les outils de sourcing que vous utilisez (Workday, Greenhouse, LinkedIn Recruiter, recherche booléenne) ; des indicateurs comme le délai d'embauche et le taux d'acceptation des offres ; et des termes de partenariat comme gestion des parties prenantes et marque employeur." },
      { q: "Comment un recruteur doit-il montrer ses résultats sur son CV ?", a: "Avec des chiffres de recrutement : postes pourvus, délai d'embauche, taux d'acceptation des offres, coût par recrutement ou objectifs atteints. Ce sont les indicateurs sur lesquels votre prochain manager vous jugera." },
    ],
  },
  {
    slug: "customer-success-manager",
    name: "Customer Success Manager",
    alsoCalled: ["Account Manager", "Chargé de succès client", "Responsable Customer Success", "Key Account Manager"],
    metaDescription:
      "Mots-clés pour un CV de customer success manager : rétention, churn, onboarding, renouvellements, upselling et CRM. Comparez votre CV à toute offre.",
    intro:
      "Les offres de customer success se mesurent en rétention : churn, renouvellements, expansion et santé client. Les recruteurs cherchent la taille du portefeuille que vous avez géré, les processus que vous avez pilotés (onboarding, QBR, renouvellements) et les outils derrière. Un CV de CSM sans chiffre de rétention est facile à écarter.",
    groups: [
      { title: "Rétention et croissance", keywords: ["Fidélisation client", "Réduction du churn", "Renouvellements", "Upselling", "Revenu d'expansion", "Net revenue retention (NRR)"] },
      { title: "Cycle de vie client", keywords: ["Onboarding", "Adoption", "Revues trimestrielles (QBR)", "Health score", "Gestion des escalades", "Parcours client"] },
      { title: "Outils", keywords: ["Salesforce", "HubSpot", "Gainsight", "Zendesk", "Intercom", "CRM", "Excel"] },
      { title: "Compétences", keywords: ["Gestion de comptes", "Gestion des parties prenantes", "SaaS", "Connaissance produit", "Communication", "Négociation"] },
    ],
    tips: [
      { title: "Mettez la rétention en premier", text: "« Portefeuille de 3 M€ et 40 comptes, rétention brute de 96 % et NRR de 118 % » est la ligne que cherchent les recruteurs." },
      { title: "Montrez les processus que vous pilotez", text: "Programmes d'onboarding, QBR, health scoring, playbooks de renouvellement : citez chacun avec le résultat obtenu." },
      { title: "Citez votre stack customer success", text: "Gainsight, Salesforce, HubSpot ou Zendesk figurent dans la plupart des offres et sont des correspondances de mots-clés faciles." },
    ],
    faqs: [
      { q: "Quels mots-clés mettre dans un CV de customer success manager ?", a: "Fidélisation client, réduction du churn, renouvellements, upselling et NRR ; des termes de cycle de vie comme onboarding, adoption, QBR et health score ; les outils que vous utilisez (Gainsight, Salesforce, HubSpot, Zendesk) ; et la gestion de comptes et des parties prenantes." },
      { q: "Quels indicateurs mettre dans un CV de customer success ?", a: "Rétention brute et nette du revenu, taux de churn, taux de renouvellement, revenu d'expansion, nombre et valeur des comptes gérés et indicateurs de satisfaction client comme le NPS." },
    ],
  },
  {
    slug: "data-analyst",
    name: "Data Analyst",
    alsoCalled: ["Analyste de données", "Analyste BI", "Business Analyst", "Chargé d'études statistiques"],
    metaDescription:
      "Mots-clés pour un CV de data analyst : SQL, Python, Tableau, Power BI et tests A/B. Comparez votre CV à n'importe quelle offre d'emploi, gratuitement.",
    intro:
      "Les offres de data analyst se découpent en trois parties : comment vous obtenez les données (SQL, data warehouses), comment vous les analysez (Python, statistiques) et comment vous les restituez (tableaux de bord, parties prenantes). Les CV qui ne couvrent que les outils et oublient le résultat pour le métier sont la raison la plus fréquente pour laquelle des analystes qualifiés sont écartés.",
    groups: [
      { title: "Requêtes et data warehouses", keywords: ["SQL", "PostgreSQL", "BigQuery", "Snowflake", "Redshift", "ETL", "dbt", "Modélisation des données"] },
      { title: "Analyse", keywords: ["Analyse de données", "Python", "Pandas", "NumPy", "R", "Excel", "Statistiques", "Tests A/B", "Régression", "Prévision"] },
      { title: "Visualisation et BI", keywords: ["Tableau", "Power BI", "Looker", "Tableaux de bord", "Visualisation de données", "Reporting de KPI"] },
      { title: "Compétences métier", keywords: ["Gestion des parties prenantes", "Recueil des besoins", "Data storytelling", "Analytics produit", "Qualité des données"] },
    ],
    tips: [
      { title: "Commencez par la décision, pas par le tableau de bord", text: "« Tableau de bord de churn sous Tableau qui a mené à une évolution tarifaire valorisée à 300 000 € » l'emporte sur « création de tableaux de bord sous Tableau »." },
      { title: "Montrez concrètement votre niveau en SQL", text: "Citez fonctions de fenêtrage, CTE ou optimisation de requêtes si vous les utilisez. « SQL » seul ne vous distingue pas de quelqu'un qui a écrit un seul SELECT." },
      { title: "Utilisez le nom exact de l'outil de BI", text: "Tableau, Power BI et Looker ne sont pas interchangeables pour un filtre de mots-clés. Citez celui de l'offre si vous l'avez utilisé, sinon le plus proche." },
    ],
    faqs: [
      { q: "Quels mots-clés mettre dans un CV de data analyst ?", a: "D'abord SQL, présent dans presque toutes les offres ; puis vos outils d'analyse (Python, Pandas, Excel, R), l'outil de BI cité dans l'offre (Tableau, Power BI ou Looker), des méthodes comme les tests A/B et les statistiques, et des termes métier comme gestion des parties prenantes et reporting de KPI." },
      { q: "Un data analyst doit-il mettre Python sur son CV ?", a: "Beaucoup d'offres le demandent ; d'autres ne veulent que SQL et un outil de BI. Regardez l'offre précise : si Python figure dans les prérequis, indiquez-le avec un exemple de ce que vous en avez fait." },
    ],
  },
  {
    slug: "product-manager",
    name: "Product Manager",
    alsoCalled: ["Product Owner", "Chef de produit", "Responsable produit", "Technical Product Manager"],
    metaDescription:
      "Mots-clés pour un CV de product manager : roadmap, discovery, indicateurs, parties prenantes et Agile. Comparez votre CV à n'importe quelle offre.",
    intro:
      "Les offres de product manager contiennent moins de noms d'outils et plus de vocabulaire de processus et de résultats, ce qui les rend plus difficiles à couvrir à l'instinct. Les termes qui comptent décrivent comment l'équipe décide quoi construire, comment elle lance et comment elle mesure le succès. Votre CV a besoin de ce même vocabulaire, accompagné de chiffres.",
    groups: [
      { title: "Stratégie et discovery", keywords: ["Stratégie produit", "Roadmap produit", "Product discovery", "Recherche utilisateur", "Entretiens clients", "Analyse de marché", "Priorisation", "OKR"] },
      { title: "Livraison", keywords: ["Agile", "Scrum", "Kanban", "Gestion du backlog", "User stories", "Sprint planning", "Go-to-market", "Équipes pluridisciplinaires"] },
      { title: "Données et indicateurs", keywords: ["KPI", "Tests A/B", "Analytics produit", "SQL", "Conversion", "Rétention", "Expérimentation"] },
      { title: "Outils et collaboration", keywords: ["Jira", "Confluence", "Figma", "Amplitude", "Mixpanel", "Gestion des parties prenantes", "Communication"] },
    ],
    tips: [
      { title: "Chaque ligne a besoin d'un indicateur", text: "Adoption, chiffre d'affaires, rétention, conversion, temps gagné. Un CV de product manager sans chiffres se lit comme celui d'un coordinateur de projet." },
      { title: "Reprenez le vocabulaire de processus de l'offre", text: "Si l'offre parle de « discovery », d'« OKR » et d'« expérimentation », décrivez votre travail avec ces termes là où ils correspondent à la réalité." },
      { title: "Montrez ce que vous avez décidé de ne pas construire", text: "La priorisation est le cœur du métier. Une ligne sur un renoncement assumé, et pourquoi, montre plus de séniorité qu'une liste de lancements." },
    ],
    faqs: [
      { q: "Quels mots-clés mettre dans un CV de product manager ?", a: "Roadmap, stratégie produit, discovery, priorisation, gestion des parties prenantes, Agile ou Scrum et les indicateurs dont vous étiez responsable (rétention, conversion, chiffre d'affaires). Ajoutez les outils cités dans l'offre : en général Jira, Figma et un outil d'analytics comme Amplitude ou Mixpanel." },
      { q: "Un product manager a-t-il besoin de mots-clés techniques sur son CV ?", a: "Pour les postes de product manager technique, oui : API, SQL et termes de conception de systèmes figurent souvent dans les prérequis. Pour les autres, les termes d'analytics et d'expérimentation pèsent généralement plus que ceux d'ingénierie." },
    ],
  },
  {
    slug: "devops-engineer",
    name: "Ingénieur DevOps",
    alsoCalled: ["DevOps Engineer", "Site Reliability Engineer (SRE)", "Platform Engineer", "Ingénieur Cloud"],
    metaDescription:
      "Mots-clés pour un CV d'ingénieur DevOps : Kubernetes, Terraform, AWS, CI/CD et supervision. Comparez votre CV à n'importe quelle offre, gratuitement.",
    intro:
      "Les offres DevOps sont les plus chargées en outils de toute l'ingénierie, et les outils changent d'une entreprise à l'autre : ce qui est Terraform et GitHub Actions dans une équipe est Pulumi et GitLab CI dans une autre. Ajuster votre CV aux outils précis de l'offre, tout en montrant la pratique transférable derrière, est ce qui le fait lire.",
    groups: [
      { title: "Cloud et conteneurs", keywords: ["AWS", "Azure", "Google Cloud", "Docker", "Kubernetes", "Helm", "Serverless"] },
      { title: "Infrastructure as code et automatisation", keywords: ["Terraform", "Ansible", "CloudFormation", "Pulumi", "Bash", "Python", "GitOps"] },
      { title: "CI/CD", keywords: ["GitHub Actions", "GitLab CI", "Jenkins", "Argo CD", "Intégration continue", "Pipelines de déploiement", "Automatisation des releases"] },
      { title: "Fiabilité et sécurité", keywords: ["Linux", "Supervision", "Prometheus", "Grafana", "Datadog", "Gestion des incidents", "SLO", "Réseaux", "Sécurité / DevSecOps"] },
    ],
    tips: [
      { title: "Chiffrez la fiabilité et la vitesse", text: "Fréquence de déploiement, lead time, disponibilité, temps de rétablissement, coûts économisés. « Temps de déploiement réduit de 45 à 6 minutes » est le type de ligne qui décroche des entretiens." },
      { title: "Reliez explicitement les outils équivalents", text: "Si l'offre demande GitLab CI et que vous connaissez GitHub Actions, citez le vôtre et écrivez aussi « pipelines CI/CD » en termes généraux, pour qu'un filtre comme une personne voient la correspondance." },
      { title: "Indiquez les certifications demandées", text: "Les certifications AWS, Azure et Kubernetes (CKA) figurent souvent dans les prérequis et sont des correspondances faciles si vous les avez." },
    ],
    faqs: [
      { q: "Quels mots-clés mettre dans un CV d'ingénieur DevOps ?", a: "Votre plateforme cloud (AWS, Azure ou Google Cloud), Docker et Kubernetes, un outil d'infrastructure as code comme Terraform, votre système de CI/CD (GitHub Actions, GitLab CI ou Jenkins), Linux, du scripting Bash ou Python et des outils de supervision comme Prometheus et Grafana." },
      { q: "DevOps et SRE, c'est la même chose sur un CV ?", a: "Les outils se recoupent largement, mais les offres SRE donnent plus de poids au vocabulaire de la fiabilité : SLO, gestion des incidents, astreintes, planification de capacité. Utilisez le vocabulaire du poste visé." },
    ],
  },
  {
    slug: "ux-designer",
    name: "UX Designer",
    alsoCalled: ["Designer UX", "UX/UI Designer", "Product Designer", "Concepteur UX"],
    metaDescription:
      "Mots-clés pour un CV d'UX designer : Figma, recherche utilisateur, prototypage, tests utilisateurs et design systems. Comparez votre CV gratuitement.",
    intro:
      "Le portfolio d'un UX designer montre le travail, mais c'est le CV qui fait ouvrir le portfolio. Les offres citent des méthodes précises (recherche, tests, prototypage) et des outils (presque toujours Figma), et un CV qui décrit le même processus avec d'autres mots peut obtenir un score faible malgré une solide expérience.",
    groups: [
      { title: "Recherche", keywords: ["Recherche utilisateur", "Tests utilisateurs", "Entretiens utilisateurs", "Personas", "Parcours utilisateur", "Questionnaires", "Analyse concurrentielle"] },
      { title: "Design", keywords: ["Expérience utilisateur", "Wireframes", "Prototypage", "Design d'interaction", "Architecture de l'information", "Design visuel", "Conception d'interfaces", "Responsive design", "Système de design"] },
      { title: "Outils", keywords: ["Figma", "Sketch", "Adobe XD", "Miro", "FigJam", "Maze"] },
      { title: "Collaboration et standards", keywords: ["Accessibilité (WCAG / RGAA)", "Design thinking", "Agile", "Handoff aux développeurs", "Gestion des parties prenantes", "Tests A/B"] },
    ],
    tips: [
      { title: "Décrivez le résultat du design", text: "Tâches réussies, conversion, tickets de support, scores de satisfaction. « Refonte de l'onboarding, activation passée de 31 % à 44 % » doit figurer sur le CV, pas seulement dans l'étude de cas." },
      { title: "Écrivez vos méthodes en toutes lettres", text: "Écrivez « tests utilisateurs » et « entretiens utilisateurs » plutôt que seulement « recherche » : les offres les listent séparément, et les filtres de mots-clés aussi." },
      { title: "Gardez un CV au format texte", text: "Un PDF très graphique peut perdre son texte à l'analyse. Utilisez une mise en page sobre sur une colonne pour postuler et laissez le visuel au portfolio." },
    ],
    faqs: [
      { q: "Quels mots-clés mettre dans un CV d'UX designer ?", a: "Figma, recherche utilisateur, tests utilisateurs, wireframes, prototypage, design d'interaction et design systems couvrent la plupart des offres. Ajoutez l'accessibilité (WCAG, RGAA), les parcours utilisateur et des termes de collaboration comme handoff aux développeurs et Agile là où vous avez de l'expérience." },
      { q: "Le CV d'un UX designer doit-il être très graphique ?", a: "Mieux vaut sobre et lisible que sophistiqué. Le texte dans des images ou les mises en page complexes en plusieurs colonnes se perdent souvent à l'analyse d'un PDF, et les mots-clés n'arrivent alors jamais dans la recherche du recruteur." },
    ],
  },
  // Santé et logistique : les listes reprennent les expressions que reconnaît le moteur de score
  // (LOCALIZED_SKILL_ALIASES.healthcare / .logistics dans languages.ts).
  {
    slug: "registered-nurse",
    name: "Infirmier(ère)",
    alsoCalled: ["Infirmière diplômée d'État", "IDE", "Infirmier en soins généraux", "Infirmier(ère) en service hospitalier"],
    metaDescription:
      "Mots-clés pour un CV d'infirmier(ère) : soins aux patients, dossier patient informatisé, administration des médicaments et prévention des infections.",
    intro:
      "Les offres d'infirmier sont rédigées autour d'un service et d'un ensemble de missions cliniques : l'unité, le type de patients, le logiciel de soins, les attestations. Les recruteurs des établissements de santé cherchent ces termes exacts, et un CV qui dit « je m'occupais des malades » là où l'offre dit « soins aux patients » et « administration des médicaments » peut passer inaperçu malgré des années d'expérience en service.",
    groups: [
      { title: "Soins cliniques", keywords: ["Soins aux patients", "Prise en charge des patients", "Administration des médicaments", "Surveillance des constantes", "Soins des plaies", "Plan de soins", "Évaluation clinique", "Pose de perfusions", "Éducation thérapeutique"] },
      { title: "Dossiers et réglementation", keywords: ["Dossier patient informatisé", "Dossier de soins", "Transmissions ciblées", "Prévention des infections", "Hygiène hospitalière", "Sécurité du patient", "Coordination des soins"] },
      { title: "Diplômes et attestations", keywords: ["Diplôme d'État d'infirmier", "Inscription à l'Ordre des infirmiers", "Gestes et soins d'urgence (AFGSU 2)", "BLS / ACLS", "Diplôme universitaire (DU)"] },
      { title: "Services et travail d'équipe", keywords: ["Médecine", "Chirurgie", "Réanimation", "Urgences", "Préparation de la sortie", "Équipe pluridisciplinaire", "Encadrement des aides-soignants", "Tutorat des étudiants"] },
    ],
    tips: [
      { title: "Indiquez le service, le rythme et le type de patients", text: "« Infirmière en médecine interne, service de 32 lits, postes en 12 h, 10 patients par infirmière » dit à une cadre de santé en une ligne ce que « infirmière expérimentée » ne dit jamais. Le service et la charge de soins sont la première chose qu'elle regarde." },
      { title: "Écrivez les attestations en entier avec le sigle", text: "« Attestation de formation aux gestes et soins d'urgence (AFGSU 2) » correspond à une recherche sur l'une ou l'autre forme. Ajoutez la date de validité : une attestation expirée est un motif fréquent d'écart." },
      { title: "Citez le logiciel de soins", text: "Les offres demandent souvent un dossier patient informatisé précis. Si vous y avez tracé vos soins, citez-le à côté de « dossier de soins » plutôt que d'écrire « maîtrise de l'informatique »." },
    ],
    faqs: [
      { q: "Quels mots-clés mettre dans un CV d'infirmier ou d'infirmière ?", a: "Soins aux patients, administration des médicaments, surveillance des constantes, soins des plaies, plan de soins et transmissions couvrent les missions listées dans la plupart des offres. Ajoutez le logiciel utilisé (dossier patient informatisé), des termes de réglementation (prévention des infections, hygiène hospitalière) et vos diplômes et attestations : diplôme d'État, inscription à l'Ordre, AFGSU et diplômes de spécialité." },
      { q: "Faut-il indiquer chaque attestation sur un CV d'infirmier ?", a: "Indiquez celles qui sont en cours de validité et celles que demande l'offre, chacune avec sa date. Placez le diplôme d'État et les attestations près du début : pour un poste infirmier, ce sont des prérequis éliminatoires, pas des détails." },
    ],
  },
  {
    slug: "logistics-coordinator",
    name: "Coordinateur Logistique",
    alsoCalled: ["Gestionnaire logistique", "Coordinateur supply chain", "Approvisionneur", "Planificateur transport"],
    metaDescription:
      "Mots-clés pour un CV de coordinateur logistique : chaîne d'approvisionnement, stocks, WMS, transport et achats. Comparez votre CV gratuitement.",
    intro:
      "Les offres de logistique et de supply chain se lisent comme une carte de l'activité : quels flux vous piloterez (réception, entrepôt, transport), quels systèmes (un ERP, un WMS, un TMS) et sur quels chiffres vous serez évalué. Les recruteurs cherchent ces mêmes systèmes et indicateurs dans votre CV ; les citer, avec un chiffre de volume ou de coût, fait l'essentiel du travail.",
    groups: [
      { title: "Planification et stocks", keywords: ["Gestion de la chaîne d'approvisionnement", "Gestion des stocks", "Planification de la demande", "S&OP", "Approvisionnements", "Achats", "Prévision de la demande", "Préparation de commandes"] },
      { title: "Transport et entrepôt", keywords: ["Transport de marchandises", "Fret", "Gestion d'entrepôt", "Prestataire logistique (3PL)", "Gestion de flotte", "Dernier kilomètre", "Optimisation des tournées", "Dédouanement", "Incoterms"] },
      { title: "Systèmes", keywords: ["WMS", "SAP MM", "ERP", "TMS", "Excel", "Power BI", "EDI"] },
      { title: "Résultats et bonnes pratiques", keywords: ["Taux de service (OTIF)", "Réduction des coûts", "Reporting de KPI", "Gestion des fournisseurs", "Négociation avec les transporteurs", "Lean", "Amélioration continue"] },
    ],
    tips: [
      { title: "Mettez un volume sur chaque ligne", text: "Expéditions par semaine, références (SKU), surface d'entrepôt, budget transport. « Coordination de 120 expéditions par semaine avec 4 transporteurs » montre l'échelle d'activité que vous pouvez piloter." },
      { title: "Citez le système, pas la catégorie", text: "« SAP MM » ou le WMS que vous avez utilisé correspond à une offre ; « logiciel ERP » beaucoup moins. Mettez le terme générique à côté pour que l'on trouve les deux." },
      { title: "Montrez l'indicateur que vous avez amélioré", text: "Taux de service, coût par expédition, fiabilité des stocks, délai de livraison. « OTIF passé de 91 % à 97 % » est la phrase que cherche un responsable logistique." },
    ],
    faqs: [
      { q: "Quels mots-clés mettre dans un CV de coordinateur logistique ?", a: "Gestion de la chaîne d'approvisionnement, gestion des stocks, transport de marchandises, gestion d'entrepôt et approvisionnements couvrent la plupart des offres. Ajoutez les systèmes utilisés (un WMS, SAP MM ou un autre ERP, un TMS), des termes de planification comme planification de la demande et S&OP, et les indicateurs sur lesquels vous étiez mesuré : taux de service, coûts et fiabilité des stocks." },
      { q: "Quelle différence entre un CV logistique et un CV supply chain ?", a: "Les offres logistiques tournent autour du déplacement et du stockage des marchandises : transport, transporteurs, entrepôt, dernier kilomètre. Les offres supply chain sont plus larges et ajoutent planification et achats : planification de la demande, S&OP, approvisionnements, gestion des fournisseurs. Commencez par le vocabulaire du poste visé." },
    ],
  },
];

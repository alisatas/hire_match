import type { RoleGuide } from "@/lib/roles";

// German role guides (/de/resume-keywords/[role]). Same order and slugs as src/lib/roles.ts.
// Keyword lists use the wording postings in Germany, Austria and Switzerland use; for
// nursing and logistics they follow the German phrases the analyzer recognises
// (LOCALIZED_SKILL_ALIASES in src/lib/languages.ts).

export const ROLES: RoleGuide[] = [
  {
    slug: "ai-engineer",
    name: "AI Engineer",
    alsoCalled: ["KI-Entwickler", "LLM Engineer", "Generative AI Engineer", "KI-Ingenieur"],
    metaDescription:
      "Lebenslauf-Keywords für AI Engineers: LLMs, RAG, Embeddings, Vektordatenbanken, Evals, Deployment. Lebenslauf kostenlos mit der Stelle abgleichen.",
    intro:
      "AI Engineer ist der am schnellsten wachsende Jobtitel der Tech-Branche, und die Stellenanzeigen sind ungewöhnlich konkret: welche Modell-APIs, welcher Retrieval-Stack, wie Qualität gemessen und wie ausgeliefert wird. Fachvorgesetzte suchen nach Belegen dafür, dass Sie ein LLM-Feature vom Prototyp bis in den Produktivbetrieb gebracht haben, und nicht nur in einem Notebook eine API aufgerufen haben.",
    groups: [
      { title: "LLMs und Frameworks", keywords: ["LLMs", "OpenAI API", "Anthropic API", "LangChain", "LlamaIndex", "Prompt Engineering", "Function Calling", "KI-Agenten"] },
      { title: "Retrieval (RAG)", keywords: ["RAG", "Embeddings", "Vektordatenbank", "pgvector", "Pinecone", "Weaviate", "Semantische Suche", "Chunking"] },
      { title: "Qualität und Deployment", keywords: ["Evals", "LLM-Evaluierung", "Fine-Tuning", "Hugging Face", "Modellbereitstellung", "MLOps", "MLflow", "Guardrails"] },
      { title: "Engineering-Grundlagen", keywords: ["Python", "FastAPI", "TypeScript", "Docker", "AWS", "SQL", "CI/CD", "Git"] },
    ],
    tips: [
      { title: "Zeigen Sie ein ausgeliefertes LLM-Feature von Anfang bis Ende", text: "„RAG-Assistenten über 40.000 Support-Artikel gebaut, 3.000 Anfragen pro Tag“ belegt mehr als eine Liste von Frameworks. Nennen Sie das Modell, den Retrieval-Stack und die Größenordnung." },
      { title: "Beziffern Sie Qualität, Latenz und Kosten", text: "KI-Teams leben von Evals. „Antwortgenauigkeit auf einem Eval-Set mit 500 Fragen von 71 % auf 89 % gesteigert und die Kosten pro Anfrage um 40 % gesenkt“ ist genau das, wonach Fachvorgesetzte suchen." },
      { title: "Lassen Sie die Softwareentwicklung sichtbar", text: "Die meisten AI-Engineer-Stellen sind in erster Linie Entwicklerstellen. APIs, Tests, CI/CD und Cloud-Deployment gehören im Lebenslauf direkt neben die LLM-Arbeit." },
    ],
    faqs: [
      { q: "Welche Keywords gehören in den Lebenslauf eines AI Engineers?", a: "Die Modell-APIs und Frameworks, mit denen Sie gearbeitet haben (OpenAI- oder Anthropic-API, LangChain, LlamaIndex), Retrieval-Begriffe (RAG, Embeddings, eine Vektordatenbank wie pgvector oder Pinecone), Begriffe zu Qualität und Deployment (Evals, Fine-Tuning, MLOps, Modellbereitstellung) und die Engineering-Grundlagen: Python, FastAPI, Docker, Cloud und CI/CD." },
      { q: "Worin unterscheidet sich der Lebenslauf eines AI Engineers von dem eines Machine Learning Engineers?", a: "Im Lebenslauf eines ML Engineers steht das Trainieren von Modellen im Mittelpunkt: Feature Engineering, PyTorch oder TensorFlow, Modellgüte. Im Lebenslauf eines AI Engineers geht es um Produkte, die auf großen Sprachmodellen aufbauen: Prompting, RAG, Evals, Agenten und LLM-Features, die bei Nutzern ankommen." },
    ],
  },
  {
    slug: "frontend-developer",
    name: "Frontend Developer",
    alsoCalled: ["Frontend-Entwickler", "React Developer", "Webentwickler Frontend", "UI Developer"],
    metaDescription:
      "Lebenslauf-Keywords für Frontend Developer: React, TypeScript, Next.js, Testing, Barrierefreiheit. Lebenslauf kostenlos mit der Stellenanzeige abgleichen.",
    intro:
      "Stellenanzeigen im Frontend sind ungewöhnlich dicht an Keywords: Framework, Sprache, Styling-Ansatz, Test-Stack und Entwicklungsprozess werden meist ausdrücklich genannt. Recruiter und Screening-Software suchen genau diese Begriffe in Ihrem Lebenslauf. Deshalb zählt es hier mehr als in den meisten Berufen, die tatsächlich genutzten Tools zu nennen, und zwar in den Worten der Anzeige.",
    groups: [
      { title: "Sprachen und Frameworks", keywords: ["JavaScript", "TypeScript", "React", "Next.js", "Vue", "Angular", "HTML5", "CSS3"] },
      { title: "Styling und UI", keywords: ["Tailwind CSS", "Sass", "CSS Modules", "Responsive Design", "Designsysteme", "Storybook", "Figma"] },
      { title: "State und Daten", keywords: ["Redux", "Zustand", "React Query", "REST-APIs", "GraphQL", "WebSockets"] },
      { title: "Qualität und Auslieferung", keywords: ["Jest", "Cypress", "Playwright", "React Testing Library", "Barrierefreiheit (WCAG)", "Core Web Vitals", "Git", "CI/CD", "GitHub Actions", "Agile / Scrum"] },
    ],
    tips: [
      { title: "Nennen Sie das Framework zusammen mit dem Ergebnis", text: "„Checkout in React und TypeScript neu gebaut, Ladezeit um 40 % verkürzt“ liefert Keyword und Beleg zugleich. Eine reine Skill-Liste liefert nur das Keyword." },
      { title: "Übernehmen Sie die Schreibweise der Anzeige", text: "Steht in der Anzeige „Next.js“ und „Tailwind CSS“, schreiben Sie genau das, nicht „NextJS“ oder „Tailwind“. Einfache Screening-Filter vergleichen Zeichen für Zeichen." },
      { title: "Lassen Sie die unspektakulären Begriffe nicht weg", text: "Barrierefreiheit, Testing und CI/CD stehen in den meisten Frontend-Anzeigen und fehlen in den meisten Frontend-Lebensläufen. Wenn Sie damit gearbeitet haben, schreiben Sie es hin." },
    ],
    faqs: [
      { q: "Welche Keywords gehören in den Lebenslauf eines Frontend Developers?", a: "Beginnen Sie mit dem Stack aus der Anzeige, in der Regel JavaScript, TypeScript und React oder ein anderes Framework. Ergänzen Sie dann Styling (Tailwind CSS, Sass), Daten (REST-APIs, GraphQL), Testing (Jest, Cypress, Playwright) und Prozessbegriffe (Git, CI/CD, Agile). Nennen Sie nur Tools, die Sie wirklich eingesetzt haben." },
      { q: "Wie viele Keywords sollte ein Frontend-Lebenslauf enthalten?", a: "Eine Zielzahl gibt es nicht. Decken Sie die Skills ab, die die konkrete Anzeige mehrfach oder im Titel nennt, und belegen Sie jeden mit einer Zeile echter Erfahrung. Ein auf eine Stelle zugeschnittener Lebenslauf schlägt einen, der mit jedem Framework vollgestopft ist." },
    ],
  },
  {
    slug: "backend-engineer",
    name: "Backend Developer",
    alsoCalled: ["Backend-Entwickler", "Backend Engineer", "Softwareentwickler Backend", "API-Entwickler"],
    metaDescription:
      "Lebenslauf-Keywords für Backend Developer: Sprachen, Datenbanken, Cloud, Container, API-Design. Lebenslauf kostenlos mit jeder Stellenanzeige abgleichen.",
    intro:
      "Backend-Anzeigen beschreiben ein System ebenso sehr wie eine Person: eine Sprache, eine Datenbank, einen Cloud-Anbieter, ein Deployment-Modell. Ihr Lebenslauf wird an diesem Bild gemessen. Die stärksten Backend-Lebensläufe nennen jede Schicht des Stacks, an der gearbeitet wurde, und versehen sie mit einer Zahl zu Last oder Zuverlässigkeit.",
    groups: [
      { title: "Sprachen und Frameworks", keywords: ["Python", "Node.js", "Java", "Go", "C#", "Django", "FastAPI", "Express", "Spring Boot"] },
      { title: "Daten und Speicherung", keywords: ["SQL", "PostgreSQL", "MySQL", "MongoDB", "Redis", "Kafka", "Elasticsearch", "Datenmodellierung"] },
      { title: "Cloud und Infrastruktur", keywords: ["AWS", "Azure", "Google Cloud", "Docker", "Kubernetes", "Terraform", "Serverless", "CI/CD"] },
      { title: "Architektur und Praxis", keywords: ["REST-APIs", "GraphQL", "gRPC", "Microservices", "Eventgetriebene Architektur", "Authentifizierung (OAuth, JWT)", "Unit- und Integrationstests", "Observability", "Skalierbarkeit"] },
    ],
    tips: [
      { title: "Beziffern Sie die Größenordnung", text: "Requests pro Sekunde, Zeilen, Latenz, Verfügbarkeit. „PostgreSQL-Schema für 2 Mio. Abfragen pro Tag entworfen“ sagt weit mehr als „mit PostgreSQL gearbeitet“." },
      { title: "Nennen Sie die Cloud-Dienste, nicht nur die Cloud", text: "Anzeigen, die AWS verlangen, nennen meist auch einzelne Dienste. Wenn Sie Lambda, S3 oder RDS genutzt haben, führen Sie sie neben „AWS“ auf." },
      { title: "Zeigen Sie Verantwortung für den gesamten Lebenszyklus", text: "Entwerfen, bauen, deployen, überwachen. Backend-Anzeigen erwarten immer häufiger Erfahrung mit Rufbereitschaft (On-Call) und Observability. Nennen Sie sie, wenn Sie sie haben." },
    ],
    faqs: [
      { q: "Welche Keywords gehören in den Lebenslauf eines Backend Developers?", a: "Sprache und Framework aus der Anzeige (zum Beispiel Python mit Django oder FastAPI, oder Node.js), die Datenbanken, mit denen Sie gearbeitet haben (PostgreSQL, Redis, MongoDB), Ihre Cloud- und Container-Erfahrung (AWS, Docker, Kubernetes) und Architekturbegriffe wie REST-APIs, Microservices und Testing." },
      { q: "Sollte ich jede Programmiersprache aufführen, die ich kenne?", a: "Nein. Stellen Sie die Sprachen voran, die die Anzeige verlangt und zu denen Sie morgen ein Fachgespräch führen könnten. Eine lange Reihe von Sprachen, die Sie einmal angefasst haben, verwässert die entscheidenden." },
    ],
  },
  {
    slug: "machine-learning-engineer",
    name: "Machine Learning Engineer",
    alsoCalled: ["ML Engineer", "MLOps Engineer", "ML-Entwickler", "Applied ML Engineer"],
    metaDescription:
      "Lebenslauf-Keywords für Machine Learning Engineers: Python, PyTorch, Modelltraining, MLOps, Deployment. Lebenslauf kostenlos mit der Stelle abgleichen.",
    intro:
      "Stellen für Machine Learning Engineers liegen zwischen Data Science und Softwareentwicklung: Gesucht sind Modelle, die gut trainiert sind und im Produktivbetrieb zuverlässig laufen. Lebensläufe, die nur Notebooks oder nur Infrastruktur zeigen, verfehlen die Hälfte dessen, worauf geprüft wird. Die stärksten zeigen den gesamten Kreislauf: Daten, Training, Evaluierung, Deployment, Monitoring.",
    groups: [
      { title: "Modellierung", keywords: ["Machine Learning", "Deep Learning", "PyTorch", "TensorFlow", "scikit-learn", "Feature Engineering", "Modellevaluierung"] },
      { title: "Daten", keywords: ["Python", "SQL", "Pandas", "Spark", "Datenpipelines", "Airflow", "Feature Store"] },
      { title: "MLOps und Deployment", keywords: ["MLOps", "Modellbereitstellung", "Model Serving", "MLflow", "Kubeflow", "SageMaker", "Vertex AI", "Modell-Monitoring"] },
      { title: "Engineering", keywords: ["Docker", "Kubernetes", "AWS", "CI/CD", "REST-APIs", "Git", "Unit-Tests"] },
    ],
    tips: [
      { title: "Zeigen Sie ein Modell im Produktivbetrieb, mit Kennzahl", text: "„Ranking-Modell mit 5 Mio. Vorhersagen pro Tag in Produktion gebracht, Klickrate um 8 % gesteigert“ deckt Modellierung, Größenordnung und Wirkung in einer Zeile ab." },
      { title: "Nennen Sie Ihren MLOps-Stack", text: "Tools für Experiment-Tracking, Model Registry, Serving und Monitoring stehen in den meisten Anzeigen ausdrücklich. MLflow, SageMaker oder Vertex AI sind einfache Keyword-Treffer." },
      { title: "Verstecken Sie die Softwareentwicklung nicht", text: "Tests, CI/CD, Container und APIs sind das, was ML Engineers bei der Vorauswahl von Data Scientists unterscheidet." },
    ],
    faqs: [
      { q: "Welche Keywords gehören in den Lebenslauf eines Machine Learning Engineers?", a: "Python und ein Deep-Learning-Framework (PyTorch oder TensorFlow), scikit-learn und Feature Engineering, Datenwerkzeuge wie SQL und Spark, Begriffe zu MLOps und Deployment (MLflow, Model Serving, Monitoring, SageMaker oder Vertex AI) und Engineering-Grundlagen wie Docker, Kubernetes und CI/CD." },
      { q: "Worin unterscheidet sich der Lebenslauf eines ML Engineers von dem eines Data Scientists?", a: "Lebensläufe von Data Scientists betonen Analyse, Statistik und Experimente. Lebensläufe von ML Engineers betonen das Bauen, Bereitstellen und Betreiben von Modellen im Produktivbetrieb: Pipelines, Serving, Monitoring und saubere Softwareentwicklung." },
    ],
  },
  {
    slug: "software-engineer",
    name: "Softwareentwickler",
    alsoCalled: ["Software Engineer", "Software Developer", "Fullstack-Entwickler", "Anwendungsentwickler"],
    metaDescription:
      "Lebenslauf-Keywords für Softwareentwickler: Sprachen, Frameworks, Cloud, Testing, Systemdesign. Lebenslauf kostenlos mit jeder Stellenanzeige abgleichen.",
    intro:
      "„Softwareentwickler“ ist der breiteste Titel der Tech-Branche, deshalb definiert erst die Anzeige die Stelle: Das eine Unternehmen meint ein Java-Backend, das andere einen TypeScript-Fullstack, das dritte Embedded C++. Allgemein gehaltene Lebensläufe haben es hier schwer. Es zählen die konkrete Sprache, das Framework und die Plattform aus der Anzeige, dazu die Arbeitsweisen, auf die jedes Entwicklungsteam achtet.",
    groups: [
      { title: "Sprachen", keywords: ["Java", "Python", "TypeScript", "JavaScript", "C#", "Go", "C++", "Kotlin"] },
      { title: "Frameworks und Plattformen", keywords: ["React", "Node.js", "Spring Boot", ".NET", "Django", "REST-APIs", "GraphQL", "Microservices"] },
      { title: "Daten und Cloud", keywords: ["SQL", "PostgreSQL", "MongoDB", "Redis", "AWS", "Azure", "Docker", "Kubernetes"] },
      { title: "Arbeitsweise", keywords: ["Systemdesign", "Datenstrukturen und Algorithmen", "Unit-Tests", "Code-Reviews", "CI/CD", "Git", "Agile / Scrum", "Clean Code"] },
    ],
    tips: [
      { title: "Stellen Sie die Hauptsprache der Anzeige voran", text: "Ist es eine Java-Stelle, gehört Java in Ihr Kurzprofil und zu Ihrer aktuellsten Position, nicht in die Mitte einer Skill-Liste. Recruiter filtern oft nach der ersten Sprache, die sie lesen." },
      { title: "Zeigen Sie den Umfang, nicht nur den Stack", text: "„Payment-Service für 3 Mio. Transaktionen im Monat entworfen“ signalisiert Systemdesign-Kompetenz. Im Gespräch wie in der Vorauswahl wird nach Belegen gesucht, dass Sie etwas von Anfang bis Ende gebaut haben." },
      { title: "Nennen Sie die Arbeitsweisen", text: "Code-Reviews, Testing, CI/CD und Rufbereitschaft (On-Call) stehen in den meisten Anzeigen für Softwareentwickler. Je eine konkrete Zeile dazu ist mehr wert als die Aufzählung in einer Liste." },
    ],
    faqs: [
      { q: "Welche Keywords gehören in den Lebenslauf eines Softwareentwicklers?", a: "Sprache und Framework aus der Anzeige (zum Beispiel Java mit Spring Boot oder TypeScript mit React und Node.js), die Datenbanken und die Cloud-Plattform, mit denen Sie gearbeitet haben, sowie Arbeitsweisen wie Systemdesign, Unit-Tests, Code-Reviews, CI/CD und Git." },
      { q: "Sollten Datenstrukturen und Algorithmen im Lebenslauf eines Softwareentwicklers stehen?", a: "Als eigenes Keyword selten. Zeigen Sie es lieber über Ihre Arbeit, etwa über Performance-Verbesserungen oder gelöste Skalierungsprobleme, und überlassen Sie die Algorithmusfragen dem Vorstellungsgespräch." },
    ],
  },
  {
    slug: "data-scientist",
    name: "Data Scientist",
    alsoCalled: ["Datenwissenschaftler", "Machine Learning Scientist", "Applied Scientist", "Data Science Specialist"],
    metaDescription:
      "Lebenslauf-Keywords für Data Scientists: Python, Machine Learning, Statistik, SQL, Deployment. Lebenslauf kostenlos mit jeder Stellenanzeige abgleichen.",
    intro:
      "Stellenanzeigen für Data Scientists prüfen zwei Dinge gleichzeitig: Tiefe in der Modellierung (Statistik, Machine Learning, Experimente) und das Engineering, das nötig ist, damit ein Modell auch genutzt wird (SQL, Pipelines, Deployment). Lebensläufe voller Algorithmen, die zu Geschäftswirkung oder Produktiveinsatz schweigen, bleiben in der Vorauswahl hängen.",
    groups: [
      { title: "Sprachen und Bibliotheken", keywords: ["Python", "R", "SQL", "Pandas", "NumPy", "scikit-learn", "PyTorch", "TensorFlow"] },
      { title: "Modellierung und Statistik", keywords: ["Machine Learning", "Statistik", "Regression", "Klassifikation", "Zeitreihenprognosen", "A/B-Testing", "Kausalinferenz", "Feature Engineering"] },
      { title: "Daten und Deployment", keywords: ["Spark", "BigQuery", "Snowflake", "Airflow", "MLflow", "Docker", "AWS SageMaker", "Modellbereitstellung"] },
      { title: "KI und Kommunikation", keywords: ["NLP", "LLMs", "Deep Learning", "Datenvisualisierung", "Stakeholder-Kommunikation", "Versuchsplanung"] },
    ],
    tips: [
      { title: "Verknüpfen Sie jedes Modell mit einer Kennzahl, die sich bewegt hat", text: "„Churn-Modell entwickelt, das die Kündigungen um 12 % gesenkt hat“ ist das, wonach in der Vorauswahl gesucht wird. Die Modellgenauigkeit allein sagt nicht, dass die Arbeit etwas bewirkt hat." },
      { title: "Belegen Sie den Produktiveinsatz", text: "Erwähnen Sie Deployment, Monitoring oder die Pipeline, die die Vorhersagen ausliefert. Viele Anzeigen trennen Kandidaten, die nur in Notebooks arbeiten, von denen, die ausliefern." },
      { title: "Treffen Sie die Ausrichtung der Anzeige", text: "Experimentlastige Stellen verlangen A/B-Testing und Kausalinferenz, ML-Engineering-Stellen verlangen Deployment und MLOps. Gewichten Sie Ihren Lebenslauf nach der Stelle, die vor Ihnen liegt." },
    ],
    faqs: [
      { q: "Welche Keywords gehören in den Lebenslauf eines Data Scientists?", a: "Zuerst Python und SQL, dann die Bibliotheken, die Sie nutzen (Pandas, scikit-learn, PyTorch oder TensorFlow), Begriffe aus Modellierung und Statistik (Machine Learning, Regression, A/B-Testing, Prognosen) und die Daten- oder Deployment-Tools aus der Anzeige, etwa Spark, Airflow oder MLflow." },
      { q: "Worin unterscheiden sich die Keywords für Data Scientists und Data Analysts?", a: "Anzeigen für Analysten drehen sich um SQL, Dashboards und BI-Tools wie Tableau oder Power BI. Anzeigen für Data Scientists ergänzen Machine Learning, Statistik, Python-Bibliotheken und Modellbereitstellung." },
    ],
  },
  {
    slug: "account-executive",
    name: "Account Executive",
    alsoCalled: ["Sales Manager", "Vertriebsmitarbeiter B2B", "Account Manager Neukundengeschäft", "Sales Executive"],
    metaDescription:
      "Lebenslauf-Keywords für Account Executives: Zielerreichung, Pipeline, Salesforce, Neukundenakquise, B2B-SaaS-Vertrieb. Lebenslauf kostenlos prüfen.",
    intro:
      "Vertriebsanzeigen lesen sich wie eine Scorecard: Umsatzziel, Dealgröße, Sales Cycle, CRM. Recruiter prüfen die Lebensläufe von Account Executives auf dieselben Punkte, und zwar schnell. Ein Lebenslauf, der Aufgaben statt Zahlen beschreibt oder das CRM nie nennt, schafft es selten in die engere Auswahl, selbst wenn die Erfahrung stark ist.",
    groups: [
      { title: "Vertriebsprozess", keywords: ["B2B-Vertrieb", "SaaS-Vertrieb", "Gesamter Sales Cycle", "Neukundenakquise", "Kaltakquise", "Leadgenerierung", "Outbound", "Vertragsabschlüsse"] },
      { title: "Ergebnisse und Kennzahlen", keywords: ["Zielerreichung (Quota)", "Pipeline-Management", "Dealgröße (ACV)", "Abschlussquote", "Forecasting", "Umsatzwachstum", "Upselling", "Vertragsverlängerungen"] },
      { title: "Tools", keywords: ["Salesforce", "HubSpot", "CRM", "LinkedIn Sales Navigator", "Gong", "Outreach", "Excel"] },
      { title: "Fähigkeiten und Methoden", keywords: ["Verhandlungsführung", "Account Management", "Geschäftsentwicklung", "Discovery Calls", "MEDDIC", "Solution Selling", "Stakeholder-Management"] },
    ],
    tips: [
      { title: "Stellen Sie bei jeder Position die Zielerreichung voran", text: "„1,2 Mio. € Umsatz bei einem Ziel von 900.000 € abgeschlossen (133 %)“ ist das Erste, wonach eine Vertriebsleitung sucht. Setzen Sie es in den ersten Stichpunkt jeder Position, nicht ans Ende." },
      { title: "Nennen Sie Dealgröße und Sales Cycle", text: "Mid-Market- und Enterprise-Stellen werden nach den Deals besetzt, die Sie tatsächlich geführt haben. Der durchschnittliche Vertragswert und die Länge des Sales Cycle zeigen sofort, ob Sie passen." },
      { title: "Nennen Sie das CRM und die Methode", text: "Salesforce oder HubSpot steht in den meisten Anzeigen, und viele nennen eine Qualifizierungsmethode wie MEDDIC. Wenn Sie damit arbeiten, schreiben Sie es aus." },
    ],
    faqs: [
      { q: "Welche Keywords gehören in den Lebenslauf eines Account Executives?", a: "B2B- oder SaaS-Vertrieb, Zielerreichung, Pipeline-Management, Neukundenakquise und Abschluss, das CRM, mit dem Sie arbeiten (meist Salesforce oder HubSpot), Verhandlungsführung und Account Management, jeweils belegt mit einer Zahl wie abgeschlossenem Umsatz oder Zielerreichung in Prozent." },
      { q: "Wie zeige ich Vertriebsergebnisse im Lebenslauf?", a: "Verwenden Sie die Kennzahlen, an denen Ihre Führungskraft Sie gemessen hat: Zielerreichung in Prozent, abgeschlossener Umsatz, durchschnittliche Dealgröße, Abschlussquote und Platzierung im Team. Eine konkrete Zahl pro Position schlägt eine Liste von Zuständigkeiten." },
    ],
  },
  {
    slug: "digital-marketing-specialist",
    name: "Online Marketing Manager",
    alsoCalled: ["Digital Marketing Manager", "Performance Marketing Manager", "Online-Marketing-Spezialist", "Growth Marketer"],
    metaDescription:
      "Lebenslauf-Keywords für Online Marketing Manager: SEO, Google Ads, Content, E-Mail, Analytics, Marketing-Automatisierung. Lebenslauf kostenlos prüfen.",
    intro:
      "Stellenanzeigen im Online-Marketing nennen Kanäle und Tools ausdrücklich: SEO, bezahlte Suche, Social Media, E-Mail, dazu den Analytics- und Automatisierungs-Stack dahinter. Generalisten-Lebensläufe, in denen „Kampagnen betreut“ steht, ohne Kanal, Budget oder Ergebnis zu nennen, werden übergangen.",
    groups: [
      { title: "Kanäle", keywords: ["SEO", "SEA / PPC", "Google Ads", "Meta Ads", "Content-Marketing", "E-Mail-Marketing", "Social-Media-Marketing", "Affiliate-Marketing"] },
      { title: "Analytics und Testing", keywords: ["Google Analytics (GA4)", "Google Tag Manager", "A/B-Testing", "Conversion-Optimierung", "Attribution", "KPI-Reporting", "Looker Studio"] },
      { title: "Tools und Automatisierung", keywords: ["HubSpot", "Marketing-Automatisierung", "Mailchimp", "Klaviyo", "Semrush", "Ahrefs", "CMS (WordPress)", "Canva"] },
      { title: "Strategie", keywords: ["Kampagnenmanagement", "Budgetverantwortung", "Neukundengewinnung", "Funnel-Optimierung", "Markenkommunikation", "Copywriting", "Growth Marketing"] },
    ],
    tips: [
      { title: "Versehen Sie jeden Kanal mit einer Zahl", text: "„Organischen Traffic in 9 Monaten um 180 % gesteigert“ oder „Kosten pro Lead bei Google Ads von 42 € auf 19 € gesenkt“: Kanal, Kennzahl und Zeitraum in einer Zeile." },
      { title: "Nennen Sie das Budget, das Sie verantwortet haben", text: "Paid-Media-Stellen werden nach Budgethöhe besetzt. „25.000 € Monatsbudget über Google und Meta gesteuert“ ordnet Sie sofort ein." },
      { title: "Führen Sie den Stack aus der Anzeige auf", text: "GA4, Tag Manager, HubSpot, Semrush: Toolnamen sind einfache Keyword-Treffer, und Recruiter filtern danach." },
    ],
    faqs: [
      { q: "Welche Keywords gehören in den Lebenslauf eines Online Marketing Managers?", a: "Die Kanäle, in denen Sie arbeiten (SEO, Google Ads, Meta Ads, E-Mail, Content, Social Media), die Analytics-Tools (GA4, Google Tag Manager), Automatisierungs- und CRM-Tools wie HubSpot und Ergebnisbegriffe wie Conversion-Optimierung, Neukundengewinnung und Budgetverantwortung." },
      { q: "Sollten in einem Marketing-Lebenslauf Kennzahlen stehen?", a: "Ja. Traffic, Conversion-Rate, Kosten pro Akquisition, Return on Ad Spend und beeinflusster Umsatz sind die Größen, an denen Fachvorgesetzte Bewerber vergleichen. Nennen Sie mindestens eine pro Position." },
    ],
  },
  {
    slug: "financial-analyst",
    name: "Financial Analyst",
    alsoCalled: ["Controller", "FP&A Analyst", "Finanzanalyst", "Business Controller"],
    metaDescription:
      "Lebenslauf-Keywords für Financial Analysts: Finanzmodellierung, FP&A, Budgetierung, Forecasting, Excel, Power BI. Lebenslauf kostenlos prüfen.",
    intro:
      "Stellenanzeigen für Financial Analysts sind um einen Zyklus gebaut (Budget, Forecast, Abschluss, Reporting) und um die Tools, mit denen er läuft. Recruiter suchen dieselben Wörter in Ihrem Lebenslauf, dazu den Beleg, dass Ihre Zahlen eine Entscheidung verändert haben. Ein Lebenslauf, der „Excel“ nennt, ohne zu sagen, was modelliert wurde und für wen, fällt selten auf.",
    groups: [
      { title: "Planung und Analyse", keywords: ["FP&A", "Finanzmodellierung", "Budgetierung", "Forecasting", "Abweichungsanalyse", "Szenarioanalyse", "Business Cases"] },
      { title: "Reporting und Rechnungslegung", keywords: ["Management-Reporting", "Monatsabschluss", "Kontenabstimmung", "IFRS", "HGB", "GuV", "Cashflow"] },
      { title: "Tools", keywords: ["Excel (Pivot-Tabellen, komplexe Formeln)", "Power BI", "SQL", "SAP", "Oracle NetSuite", "Anaplan"] },
      { title: "Fähigkeiten", keywords: ["Stakeholder-Management", "Finanzanalyse", "Data Storytelling", "KPI-Reporting", "Kostenkontrolle", "Prozessoptimierung"] },
    ],
    tips: [
      { title: "Zeigen Sie die Entscheidung, die Ihre Analyse ausgelöst hat", text: "„Preismodell erstellt, das eine Preiserhöhung von 6 % im Wert von 1,8 Mio. € gestützt hat“ sagt weit mehr als „verantwortlich für Finanzmodelle“." },
      { title: "Nennen Sie den Zyklus, den Sie verantwortet haben", text: "Jahresbudget, rollierender Forecast, Monatsabschluss: Sagen Sie, welche davon Sie geführt haben und für ein wie großes Geschäft (Umsatz, Kostenstellen, Gesellschaften)." },
      { title: "Werden Sie bei Excel und BI konkret", text: "„Excel“ steht in jedem Finance-Lebenslauf. Nennen Sie das Niveau (Finanzmodelle, Pivot-Tabellen, Power Query) und das BI-Tool aus der Anzeige, etwa Power BI." },
    ],
    faqs: [
      { q: "Welche Keywords gehören in den Lebenslauf eines Financial Analysts?", a: "FP&A, Finanzmodellierung, Budgetierung, Forecasting und Abweichungsanalyse, Reporting-Begriffe wie Management-Reporting, Monatsabschluss und IFRS oder HGB, außerdem die Tools aus der Anzeige: fast immer Excel, häufig Power BI, SQL oder ein ERP-System wie SAP." },
      { q: "Wie zeige ich Wirkung in einem Finance-Lebenslauf?", a: "Verknüpfen Sie Ihre Arbeit mit Geld oder Entscheidungen: aufgedeckte Einsparungen, verbesserte Forecast-Genauigkeit, ein Budget, das Sie verantwortet haben, ein Business Case, der genehmigt wurde. Eine konkrete Zahl pro Position genügt." },
    ],
  },
  {
    slug: "project-manager",
    name: "Projektmanager",
    alsoCalled: ["Projektleiter", "IT-Projektmanager", "Project Manager", "Program Manager"],
    metaDescription:
      "Lebenslauf-Keywords für Projektmanager: Planung, Risikomanagement, Stakeholder-Management, Agile, PMP, Budget. Lebenslauf kostenlos prüfen.",
    intro:
      "Stellenanzeigen für Projektmanager prüfen drei Dinge: die Methoden, mit denen Sie arbeiten, die Größe dessen, was Sie geliefert haben, und Ihren Umgang mit Menschen und Risiken. Recruiter suchen nach den Methodennamen (Agile, Scrum, PRINCE2, PMP) und nach Zahlen zu Budget, Teamgröße und Laufzeit, die zeigen, welche Größenordnung Sie tragen können.",
    groups: [
      { title: "Methoden und Zertifizierungen", keywords: ["Projektmanagement", "Agile", "Scrum", "Wasserfall", "PRINCE2", "PMP", "Kanban"] },
      { title: "Umsetzung", keywords: ["Projektplanung", "Scope-Management", "Risikomanagement", "Budgetverantwortung", "Ressourcenplanung", "Meilensteine", "Change-Management"] },
      { title: "Menschen", keywords: ["Stakeholder-Management", "Funktionsübergreifende Teams", "Dienstleistersteuerung", "Kommunikation", "Statusreporting", "Lenkungsausschuss"] },
      { title: "Tools", keywords: ["Jira", "Confluence", "MS Project", "Asana", "Smartsheet", "Excel"] },
    ],
    tips: [
      { title: "Stellen Sie Größenordnung und Ergebnis voran", text: "„ERP-Rollout über 2 Mio. € in 4 Ländern geliefert, termingerecht und 6 % unter Budget“ zeigt Fachvorgesetzten genau, was Sie tragen können." },
      { title: "Nennen Sie die Methode und die Zertifizierung", text: "PRINCE2, PMP, Scrum Master: Wenn Sie eine Zertifizierung haben, setzen Sie sie weit nach oben. Viele Anzeigen filtern danach." },
      { title: "Zeigen Sie, wie Sie mit Risiken umgegangen sind", text: "Eine Zeile über ein Risiko, das Sie früh erkannt haben, und über Ihre Gegenmaßnahme signalisiert mehr Seniorität als eine Liste von Tools." },
    ],
    faqs: [
      { q: "Welche Keywords gehören in den Lebenslauf eines Projektmanagers?", a: "Projektmanagement, die Methoden, mit denen Sie arbeiten (Agile, Scrum, Wasserfall, PRINCE2), Zertifizierungen wie PMP, Umsetzungsbegriffe (Planung, Scope-, Risiko- und Budgetmanagement), Führungsthemen (Stakeholder-Management und Dienstleistersteuerung) und die Tools, in denen Sie Projekte führen, meist Jira, Confluence oder MS Project." },
      { q: "Ist PMP oder PRINCE2 im Lebenslauf besser?", a: "Nennen Sie die Zertifizierung, die in der Anzeige steht. PRINCE2 ist im Vereinigten Königreich und in Europa verbreiteter, PMP in den USA und in globalen Unternehmen. Beide sind anerkannt, und die vom Arbeitgeber verlangte ist ein direkter Keyword-Treffer." },
    ],
  },
  {
    slug: "recruiter",
    name: "Recruiter",
    alsoCalled: ["Talent Acquisition Manager", "Personalreferent Recruiting", "IT-Recruiter", "Talent Acquisition Specialist"],
    metaDescription:
      "Lebenslauf-Keywords für Recruiter: Active Sourcing, End-to-End-Recruiting, ATS, Stakeholder-Management, Time-to-Hire. Lebenslauf kostenlos prüfen.",
    intro:
      "Recruiter schreiben den ganzen Tag Stellenanzeigen, und doch sind ihre eigenen Lebensläufe oft die vagesten im Stapel. Stellen in der Talent Acquisition werden danach besetzt, wie viele Einstellungen Sie verantwortet haben, für welche Profile Sie rekrutieren, mit welchen Tools Sie suchen und an welchen Kennzahlen Sie gemessen wurden.",
    groups: [
      { title: "Recruiting", keywords: ["End-to-End-Recruiting", "Active Sourcing", "Direktansprache", "IT-Recruiting", "Bewerbervorauswahl", "Interviewführung", "Vertragsverhandlung"] },
      { title: "Tools", keywords: ["Bewerbermanagementsystem (ATS)", "Greenhouse", "Workday", "LinkedIn Recruiter", "Boolesche Suche", "Personio", "Excel"] },
      { title: "Kennzahlen", keywords: ["Time-to-Hire", "Cost-per-Hire", "Annahmequote", "Pipeline-Reporting", "Quality of Hire", "Einstellungsziele"] },
      { title: "Zusammenarbeit", keywords: ["Stakeholder-Management", "Beratung der Fachbereiche", "Employer Branding", "Candidate Experience", "Diversity Recruiting", "Onboarding"] },
    ],
    tips: [
      { title: "Beziffern Sie Ihre Einstellungen", text: "„45 Entwickler in 12 Monaten eingestellt, Annahmequote 92 %“ ist für Recruiter das, was im Vertrieb die Zielerreichung ist. Stellen Sie es an den Anfang." },
      { title: "Sagen Sie, wofür Sie rekrutieren", text: "IT, Vertrieb, Führungskräfte, Massenrecruiting: Anzeigen sind meist spezialisiert, und Ihr Kurzprofil sollte es auch sein." },
      { title: "Nennen Sie ATS und Sourcing-Tools", text: "Greenhouse, Workday, LinkedIn Recruiter und Boolesche Suche sind in Talent-Acquisition-Anzeigen direkte Keyword-Treffer." },
    ],
    faqs: [
      { q: "Welche Keywords gehören in den Lebenslauf eines Recruiters?", a: "End-to-End-Recruiting, Active Sourcing und die Profile, für die Sie einstellen, das Bewerbermanagementsystem und die Sourcing-Tools, mit denen Sie arbeiten (Greenhouse, Workday, LinkedIn Recruiter, Boolesche Suche), Kennzahlen wie Time-to-Hire und Annahmequote sowie Begriffe der Zusammenarbeit wie Stakeholder-Management und Employer Branding." },
      { q: "Wie sollte ein Recruiter Ergebnisse im Lebenslauf zeigen?", a: "Mit Einstellungszahlen: besetzte Stellen, Time-to-Hire, Annahmequote, Cost-per-Hire oder erreichte Einstellungsziele. Das sind die Kennzahlen, an denen Ihre nächste Führungskraft Sie messen wird." },
    ],
  },
  {
    slug: "customer-success-manager",
    name: "Customer Success Manager",
    alsoCalled: ["Account Manager", "Kundenbetreuer", "Client Success Manager", "Kundenerfolgsmanager"],
    metaDescription:
      "Lebenslauf-Keywords für Customer Success Manager: Kundenbindung, Churn, Onboarding, Renewals, Upselling, CRM. Lebenslauf kostenlos prüfen.",
    intro:
      "Customer-Success-Stellen werden an der Kundenbindung gemessen: Churn, Vertragsverlängerungen, Expansion und Customer Health. Recruiter achten auf die Größe des Kundenportfolios, das Sie betreut haben, auf Ihre Abläufe (Onboarding, QBRs, Verlängerungen) und auf die Tools dahinter. Ein CSM-Lebenslauf ohne Zahl zur Kundenbindung wird leicht übergangen.",
    groups: [
      { title: "Kundenbindung und Wachstum", keywords: ["Kundenbindung", "Churn-Reduzierung", "Vertragsverlängerungen (Renewals)", "Upselling", "Expansion Revenue", "Net Revenue Retention (NRR)"] },
      { title: "Kundenlebenszyklus", keywords: ["Onboarding", "Produktadoption", "Quarterly Business Reviews (QBRs)", "Customer Health Score", "Eskalationsmanagement", "Customer Journey"] },
      { title: "Tools", keywords: ["Salesforce", "HubSpot", "Gainsight", "Zendesk", "Intercom", "CRM", "Excel"] },
      { title: "Fähigkeiten", keywords: ["Account Management", "Stakeholder-Management", "SaaS", "Produktkenntnis", "Kommunikation", "Verhandlungsführung"] },
    ],
    tips: [
      { title: "Stellen Sie die Kundenbindung an den Anfang", text: "„Portfolio von 40 Kunden mit 3 Mio. € Umsatz betreut, 96 % Gross Retention und 118 % NRR“ ist die Zeile, nach der Fachvorgesetzte den Lebenslauf absuchen." },
      { title: "Zeigen Sie Ihre Abläufe", text: "Onboarding-Programme, QBRs, Health Scoring, Renewal-Playbooks: Nennen Sie sie und das Ergebnis, das sie gebracht haben." },
      { title: "Nennen Sie Ihren CS-Stack", text: "Gainsight, Salesforce, HubSpot oder Zendesk stehen in den meisten Anzeigen und sind einfache Keyword-Treffer." },
    ],
    faqs: [
      { q: "Welche Keywords gehören in den Lebenslauf eines Customer Success Managers?", a: "Kundenbindung, Churn-Reduzierung, Vertragsverlängerungen, Upselling und NRR, Begriffe aus dem Kundenlebenszyklus wie Onboarding, Adoption, QBRs und Health Scores, die Tools, mit denen Sie arbeiten (Gainsight, Salesforce, HubSpot, Zendesk), sowie Account- und Stakeholder-Management." },
      { q: "Welche Kennzahlen gehören in einen Customer-Success-Lebenslauf?", a: "Gross und Net Revenue Retention, Churn-Rate, Verlängerungsquote, Expansion Revenue, Anzahl und Wert der betreuten Kunden sowie Zufriedenheitswerte wie der NPS." },
    ],
  },
  {
    slug: "data-analyst",
    name: "Data Analyst",
    alsoCalled: ["Datenanalyst", "BI Analyst", "Business Analyst", "Business Intelligence Analyst"],
    metaDescription:
      "Lebenslauf-Keywords für Data Analysts: SQL, Python, Tableau, Power BI, A/B-Testing. Lebenslauf kostenlos mit jeder Stellenanzeige abgleichen.",
    intro:
      "Stellenanzeigen für Data Analysts bestehen aus drei Teilen: wie Sie an die Daten kommen (SQL, Data Warehouses), wie Sie sie auswerten (Python, Statistik) und wie Sie sie vermitteln (Dashboards, Stakeholder). Lebensläufe, die nur die Tools nennen und das Geschäftsergebnis auslassen, sind der häufigste Grund, warum qualifizierte Analysten aussortiert werden.",
    groups: [
      { title: "Abfragen und Data Warehouses", keywords: ["SQL", "PostgreSQL", "BigQuery", "Snowflake", "Redshift", "ETL", "dbt", "Datenmodellierung"] },
      { title: "Analyse", keywords: ["Python", "Pandas", "NumPy", "R", "Excel", "Statistik", "A/B-Testing", "Regression", "Prognosen"] },
      { title: "Visualisierung und BI", keywords: ["Tableau", "Power BI", "Looker", "Dashboards", "Datenvisualisierung", "KPI-Reporting"] },
      { title: "Business-Kompetenzen", keywords: ["Stakeholder-Management", "Anforderungsanalyse", "Data Storytelling", "Product Analytics", "Datenqualität"] },
    ],
    tips: [
      { title: "Stellen Sie die Entscheidung voran, nicht das Dashboard", text: "„Churn-Dashboard in Tableau gebaut, das zu einer Preisänderung im Wert von 300.000 € geführt hat“ schlägt „Dashboards in Tableau gebaut“." },
      { title: "Beschreiben Sie Ihr SQL-Niveau konkret", text: "Nennen Sie Window Functions, CTEs oder Query-Optimierung, wenn Sie damit arbeiten. „SQL“ allein unterscheidet Sie nicht von jemandem, der ein einziges SELECT geschrieben hat." },
      { title: "Treffen Sie das BI-Tool genau", text: "Tableau, Power BI und Looker sind für einen Keyword-Filter nicht austauschbar. Nennen Sie das Tool aus der Anzeige, wenn Sie es genutzt haben, und sonst das nächstliegende." },
    ],
    faqs: [
      { q: "Welche Keywords gehören in den Lebenslauf eines Data Analysts?", a: "Zuerst SQL, das in fast jeder Anzeige steht, dann die Analysewerkzeuge, die Sie nutzen (Python, Pandas, Excel, R), das BI-Tool aus der Anzeige (Tableau, Power BI oder Looker), Methoden wie A/B-Testing und Statistik und Business-Begriffe wie Stakeholder-Management und KPI-Reporting." },
      { q: "Brauchen Data Analysts Python im Lebenslauf?", a: "Viele Anzeigen verlangen es, manche wollen nur SQL und ein BI-Tool. Prüfen Sie die konkrete Stelle: Steht Python in den Anforderungen, nennen Sie es mit einem Beispiel dafür, wofür Sie es eingesetzt haben." },
    ],
  },
  {
    slug: "product-manager",
    name: "Product Manager",
    alsoCalled: ["Produktmanager", "Product Owner", "Technical Product Manager", "Senior Product Manager"],
    metaDescription:
      "Lebenslauf-Keywords für Product Manager: Roadmap, Discovery, Kennzahlen, Stakeholder-Management, Agile. Lebenslauf kostenlos mit der Stelle abgleichen.",
    intro:
      "Stellenanzeigen für Product Manager enthalten weniger Toolnamen und mehr Prozess- und Ergebnissprache. Das macht es schwerer, sie nach Gefühl zu treffen. Es zählen die Begriffe, die beschreiben, wie das Team entscheidet, was gebaut wird, wie es ausliefert und woran Erfolg gemessen wird. Ihr Lebenslauf braucht dasselbe Vokabular, mit Zahlen versehen.",
    groups: [
      { title: "Strategie und Discovery", keywords: ["Produktstrategie", "Roadmap", "Product Discovery", "User Research", "Kundeninterviews", "Marktanalyse", "Priorisierung", "OKRs"] },
      { title: "Umsetzung", keywords: ["Agile", "Scrum", "Kanban", "Backlog-Management", "User Stories", "Sprint-Planung", "Go-to-Market", "Funktionsübergreifende Teams"] },
      { title: "Daten und Kennzahlen", keywords: ["KPIs", "A/B-Testing", "Product Analytics", "SQL", "Conversion", "Retention", "Experimente"] },
      { title: "Tools und Zusammenarbeit", keywords: ["Jira", "Confluence", "Figma", "Amplitude", "Mixpanel", "Stakeholder-Management", "Kommunikation"] },
    ],
    tips: [
      { title: "Jeder Stichpunkt braucht eine Kennzahl", text: "Adoption, Umsatz, Retention, Conversion, eingesparte Zeit. Ein PM-Lebenslauf ohne Zahlen liest sich wie der Lebenslauf eines Projektkoordinators." },
      { title: "Verwenden Sie die Prozessbegriffe der Anzeige", text: "Stehen in der Anzeige „Discovery“, „OKRs“ und „Experimente“, beschreiben Sie Ihre Arbeit in diesen Begriffen, wo sie ehrlich zutreffen." },
      { title: "Zeigen Sie, was Sie bewusst nicht gebaut haben", text: "Priorisierung ist der Kern der Aufgabe. Eine Zeile über eine Abwägung, die Sie getroffen haben, und den Grund dafür signalisiert Seniorität besser als eine Liste von Launches." },
    ],
    faqs: [
      { q: "Welche Keywords gehören in den Lebenslauf eines Product Managers?", a: "Roadmap, Produktstrategie, Discovery, Priorisierung, Stakeholder-Management, Agile oder Scrum und die Kennzahlen, für die Sie verantwortlich waren (Retention, Conversion, Umsatz). Ergänzen Sie die Tools aus der Anzeige, üblicherweise Jira, Figma und ein Analytics-Produkt wie Amplitude oder Mixpanel." },
      { q: "Brauchen Product Manager technische Keywords im Lebenslauf?", a: "Für technische PM-Stellen ja: APIs, SQL und Begriffe aus dem Systemdesign stehen oft in den Anforderungen. Bei anderen PM-Stellen zählen Begriffe zu Analytics und Experimenten meist mehr als technische." },
    ],
  },
  {
    slug: "devops-engineer",
    name: "DevOps Engineer",
    alsoCalled: ["Site Reliability Engineer (SRE)", "Platform Engineer", "Cloud Engineer", "DevOps-Ingenieur"],
    metaDescription:
      "Lebenslauf-Keywords für DevOps Engineers: Kubernetes, Terraform, AWS, CI/CD, Monitoring. Lebenslauf kostenlos mit jeder Stellenanzeige abgleichen.",
    intro:
      "DevOps-Anzeigen sind die toollastigsten aller Engineering-Stellen, und die Tools wechseln von Unternehmen zu Unternehmen: Was beim einen Team Terraform und GitHub Actions sind, sind beim anderen Pulumi und GitLab CI. Gelesen wird Ihr Lebenslauf, wenn er zur konkreten Toolchain der Anzeige passt und zugleich die übertragbare Praxis dahinter zeigt.",
    groups: [
      { title: "Cloud und Container", keywords: ["AWS", "Azure", "Google Cloud", "Docker", "Kubernetes", "Helm", "Serverless"] },
      { title: "Infrastructure as Code und Automatisierung", keywords: ["Terraform", "Ansible", "CloudFormation", "Pulumi", "Bash", "Python", "GitOps"] },
      { title: "CI/CD", keywords: ["GitHub Actions", "GitLab CI", "Jenkins", "Argo CD", "Deployment-Pipelines", "Release-Automatisierung"] },
      { title: "Zuverlässigkeit und Sicherheit", keywords: ["Linux", "Monitoring", "Prometheus", "Grafana", "Datadog", "Incident Response", "SLOs", "Netzwerke", "Security / DevSecOps"] },
    ],
    tips: [
      { title: "Beziffern Sie Zuverlässigkeit und Geschwindigkeit", text: "Deployment-Frequenz, Lead Time, Verfügbarkeit, Wiederherstellungszeit, eingesparte Kosten. „Deployment-Dauer von 45 auf 6 Minuten verkürzt“ ist die Art Zeile, die zu Einladungen führt." },
      { title: "Schlagen Sie die Brücke zwischen gleichwertigen Tools", text: "Verlangt die Anzeige GitLab CI und Sie kennen GitHub Actions, nennen Sie Ihr Tool und schreiben Sie zusätzlich allgemein „CI/CD-Pipelines“. So erkennen Filter und Mensch gleichermaßen, dass Sie passen." },
      { title: "Nennen Sie Zertifizierungen, wo die Anzeige sie verlangt", text: "Zertifizierungen für AWS, Azure und Kubernetes (CKA) stehen häufig in den Anforderungen und sind einfache Keyword-Treffer, wenn Sie sie haben." },
    ],
    faqs: [
      { q: "Welche Keywords gehören in den Lebenslauf eines DevOps Engineers?", a: "Ihre Cloud-Plattform (AWS, Azure oder Google Cloud), Docker und Kubernetes, ein Infrastructure-as-Code-Tool wie Terraform, Ihr CI/CD-System (GitHub Actions, GitLab CI oder Jenkins), Linux, Scripting in Bash oder Python und Monitoring-Tools wie Prometheus und Grafana." },
      { q: "Ist DevOps im Lebenslauf dasselbe wie SRE?", a: "Die Toolchains überschneiden sich stark, aber SRE-Anzeigen legen mehr Gewicht auf die Sprache der Zuverlässigkeit: SLOs, Incident Response, Rufbereitschaft, Kapazitätsplanung. Verwenden Sie das Vokabular des Titels, auf den Sie sich bewerben." },
    ],
  },
  {
    slug: "ux-designer",
    name: "UX Designer",
    alsoCalled: ["UX/UI Designer", "Product Designer", "Interaction Designer", "User Experience Designer"],
    metaDescription:
      "Lebenslauf-Keywords für UX Designer: Figma, User Research, Prototyping, Usability-Tests, Designsysteme. Lebenslauf kostenlos mit der Stelle abgleichen.",
    intro:
      "Das Portfolio eines UX Designers zeigt die Arbeit, aber erst der Lebenslauf sorgt dafür, dass das Portfolio geöffnet wird. Anzeigen nennen konkrete Methoden (Research, Testing, Prototyping) und Tools (fast immer Figma). Ein Lebenslauf, der denselben Prozess in anderen Worten beschreibt, kann trotz starker Erfahrung schlecht abschneiden.",
    groups: [
      { title: "Research", keywords: ["User Research", "Usability-Tests", "Nutzerinterviews", "Personas", "Journey Mapping", "Umfragen", "Wettbewerbsanalyse"] },
      { title: "Design", keywords: ["Wireframing", "Prototyping", "Interaction Design", "Informationsarchitektur", "Visual Design", "Responsive Design", "Designsysteme"] },
      { title: "Tools", keywords: ["Figma", "Sketch", "Adobe XD", "Miro", "FigJam", "Maze"] },
      { title: "Zusammenarbeit und Standards", keywords: ["Barrierefreiheit (WCAG)", "Design Thinking", "Agile", "Übergabe an die Entwicklung", "Stakeholder-Management", "A/B-Testing"] },
    ],
    tips: [
      { title: "Beschreiben Sie das Ergebnis des Designs", text: "Abgeschlossene Aufgaben, Conversion, Support-Tickets, Zufriedenheitswerte. „Onboarding neu gestaltet, Aktivierung von 31 % auf 44 % gesteigert“ gehört in den Lebenslauf, nicht nur in die Case Study." },
      { title: "Schreiben Sie Ihre Methoden aus", text: "Schreiben Sie „Usability-Tests“ und „Nutzerinterviews“ statt nur „Research“. Anzeigen führen sie getrennt auf, und Keyword-Filter tun das auch." },
      { title: "Halten Sie den Lebenslauf textbasiert", text: "Ein stark gestaltetes PDF kann beim Auslesen seinen Text verlieren. Nutzen Sie für Bewerbungen ein klares, einspaltiges Layout und überlassen Sie das Visuelle dem Portfolio." },
    ],
    faqs: [
      { q: "Welche Keywords gehören in den Lebenslauf eines UX Designers?", a: "Figma, User Research, Usability-Tests, Wireframing, Prototyping, Interaction Design und Designsysteme decken die meisten Anzeigen ab. Ergänzen Sie Barrierefreiheit (WCAG), Journey Mapping und Begriffe der Zusammenarbeit wie die Übergabe an die Entwicklung und Agile, wo Sie die Erfahrung haben." },
      { q: "Sollte der Lebenslauf eines UX Designers visuell gestaltet sein?", a: "Halten Sie ihn klar und gut lesbar statt aufwendig. Text in Bildern oder komplexe mehrspaltige Layouts gehen beim Auslesen eines PDFs oft verloren, und die Keywords erreichen die Suche des Recruiters dann nie." },
    ],
  },
  // Pflege und Logistik: Die Keyword-Listen nutzen die deutschen Formulierungen, die die
  // Analyse erkennt (healthcare / logistics in LOCALIZED_SKILL_ALIASES).
  {
    slug: "registered-nurse",
    name: "Pflegefachkraft",
    alsoCalled: ["Pflegefachfrau / Pflegefachmann", "Gesundheits- und Krankenpfleger", "Examinierte Pflegekraft", "Diplomierte Pflegefachperson"],
    metaDescription:
      "Lebenslauf-Keywords für Pflegefachkräfte: Patientenversorgung, Pflegedokumentation, Medikamentengabe, Infektionskontrolle. Lebenslauf kostenlos prüfen.",
    intro:
      "Stellenanzeigen in der Pflege sind um einen Einsatzort und bestimmte pflegerische Aufgaben herum geschrieben: die Station, die Patientengruppe, das Dokumentationssystem, die Qualifikationen. Personalabteilungen von Kliniken durchsuchen ihre Bewerbersysteme nach genau diesen Begriffen. Ein Lebenslauf, in dem „Patienten betreut“ steht, wo die Anzeige „Patientenversorgung“ und „Medikamentengabe“ schreibt, kann trotz jahrelanger Stationserfahrung übergangen werden.",
    groups: [
      { title: "Pflege am Patienten", keywords: ["Patientenversorgung", "Grundpflege", "Behandlungspflege", "Medikamentengabe", "Vitalzeichen", "Wundversorgung", "Pflegeplanung", "Pflegeanamnese", "Infusionstherapie", "Patientenberatung"] },
      { title: "Dokumentation und Vorgaben", keywords: ["Elektronische Patientenakte", "Krankenhausinformationssystem (KIS)", "Pflegedokumentation", "Schweigepflicht und Datenschutz", "Infektionskontrolle", "Patientensicherheit", "Überleitungsmanagement"] },
      { title: "Berufszulassung und Qualifikationen", keywords: ["Erlaubnis zum Führen der Berufsbezeichnung", "Examen (3-jährige Ausbildung)", "Bachelor Pflege", "Basic Life Support (BLS)", "Advanced Life Support (ALS)", "Fachweiterbildung Intensivpflege"] },
      { title: "Einsatzbereiche und Teamarbeit", keywords: ["Akutpflege", "Chirurgische Normalstation", "Intensivstation", "Notaufnahme", "Entlassmanagement", "Interdisziplinäres Team", "Praxisanleitung", "Schichtleitung"] },
    ],
    tips: [
      { title: "Nennen Sie Station, Betreuungsschlüssel und Patientengruppe", text: "„Pflegefachkraft auf einer chirurgischen Normalstation mit 32 Betten, Betreuungsschlüssel 1:5“ sagt einer Stationsleitung in einer Zeile, was „erfahrene Pflegefachkraft“ nie sagt. Auf Einsatzbereich und Fallzahl wird zuerst geachtet." },
      { title: "Schreiben Sie Qualifikationen aus, mit Abkürzung", text: "„Basic Life Support (BLS)“ wird bei der Suche nach beiden Formen gefunden. Ergänzen Sie die ausstellende Stelle und das Ablaufdatum: Ein abgelaufenes Zertifikat ist ein häufiger Ablehnungsgrund." },
      { title: "Nennen Sie das Dokumentationssystem", text: "Anzeigen verlangen oft ein bestimmtes Krankenhausinformationssystem wie ORBIS, i.s.h.med oder Epic. Wenn Sie darin dokumentiert haben, nennen Sie es neben „Pflegedokumentation“, statt „EDV-Kenntnisse“ zu schreiben." },
    ],
    faqs: [
      { q: "Welche Keywords gehören in den Lebenslauf einer Pflegefachkraft?", a: "Patientenversorgung, Medikamentengabe, Vitalzeichen, Wundversorgung, Pflegeplanung und Pflegedokumentation decken die Aufgaben ab, die die meisten Anzeigen aufführen. Ergänzen Sie das Dokumentationssystem, mit dem Sie gearbeitet haben (elektronische Patientenakte, das jeweilige KIS), Vorgaben wie Datenschutz und Infektionskontrolle sowie Ihre Berufszulassung und Qualifikationen: Examen, BLS und fachspezifische wie ALS oder eine Fachweiterbildung." },
      { q: "Sollte im Lebenslauf einer Pflegefachkraft jede Qualifikation stehen?", a: "Führen Sie die gültigen auf und die, die in der Anzeige verlangt werden, jeweils mit Ablaufdatum. Setzen Sie Berufszulassung und Qualifikationen weit nach oben: In der Pflege sind sie eine Voraussetzung, über die sich alles entscheidet, kein Detail." },
    ],
  },
  {
    slug: "logistics-coordinator",
    name: "Logistikkoordinator",
    alsoCalled: ["Disponent", "Sachbearbeiter Logistik", "Supply Chain Coordinator", "Logistikplaner"],
    metaDescription:
      "Lebenslauf-Keywords für Logistikkoordinatoren: Lieferkettenmanagement, Bestandsführung, WMS, Fracht, Beschaffung. Lebenslauf kostenlos prüfen.",
    intro:
      "Stellenanzeigen in Logistik und Supply Chain lesen sich wie ein Plan des Betriebs: welche Warenströme Sie steuern (Wareneingang, Lager, Transport), mit welchen Systemen (ein ERP, ein WMS, ein TMS) und an welchen Kennzahlen Sie gemessen werden. Recruiter suchen dieselben Systeme und Kennzahlen in Ihrem Lebenslauf. Wer sie nennt, mit einem Volumen oder einer Kostenzahl, hat den größten Teil der Arbeit getan.",
    groups: [
      { title: "Planung und Bestand", keywords: ["Lieferkettenmanagement", "Bestandsmanagement", "Bestandsführung", "Bedarfsplanung", "S&OP", "Beschaffung", "Absatzprognosen", "Auftragsabwicklung"] },
      { title: "Transport und Lager", keywords: ["Fracht", "Lagerverwaltung", "Lagerlogistik", "3PL", "Fuhrparkmanagement", "Letzte Meile", "Tourenplanung", "Zollabwicklung", "Incoterms"] },
      { title: "Systeme", keywords: ["WMS", "SAP MM", "ERP", "TMS", "Excel", "Power BI", "EDI"] },
      { title: "Leistung und Arbeitsweise", keywords: ["Liefertreue (OTIF)", "Kostensenkung", "KPI-Reporting", "Lieferantenmanagement", "Verhandlungen mit Speditionen", "Lean", "Kontinuierliche Verbesserung (KVP)"] },
    ],
    tips: [
      { title: "Versehen Sie jede Zeile mit einem Volumen", text: "Sendungen pro Woche, Artikel (SKUs), Lagerfläche, Frachtkosten. „120 ausgehende Sendungen pro Woche über 4 Speditionen koordiniert“ zeigt, welche Größenordnung Sie steuern können." },
      { title: "Nennen Sie das System, nicht die Kategorie", text: "„SAP MM“ oder das WMS, mit dem Sie gearbeitet haben, trifft eine Anzeige. „ERP-Software“ trifft sie deutlich seltener. Setzen Sie den allgemeinen Begriff daneben, damit beides gefunden wird." },
      { title: "Zeigen Sie die Kennzahl, die Sie bewegt haben", text: "Liefertreue, Kosten pro Sendung, Bestandsgenauigkeit, Durchlaufzeit. „OTIF von 91 % auf 97 % gesteigert“ ist der Satz, nach dem eine Logistikleitung sucht." },
    ],
    faqs: [
      { q: "Welche Keywords gehören in den Lebenslauf eines Logistikkoordinators?", a: "Lieferkettenmanagement, Bestandsmanagement, Fracht, Lagerverwaltung und Beschaffung decken die meisten Anzeigen ab. Ergänzen Sie die Systeme, mit denen Sie gearbeitet haben (ein WMS, SAP MM oder ein anderes ERP, ein TMS), Planungsbegriffe wie Bedarfsplanung und S&OP und die Kennzahlen, an denen Sie gemessen wurden: Liefertreue, Kosten und Bestandsgenauigkeit." },
      { q: "Worin unterscheidet sich ein Logistik-Lebenslauf von einem Supply-Chain-Lebenslauf?", a: "Logistik-Anzeigen drehen sich um das Bewegen und Lagern von Waren: Fracht, Speditionen, Lagerhaltung, letzte Meile. Supply-Chain-Anzeigen sind breiter und ergänzen Planung und Einkauf: Bedarfsplanung, S&OP, Beschaffung, Lieferantenmanagement. Stellen Sie das Vokabular des Titels voran, auf den Sie sich bewerben." },
    ],
  },
];

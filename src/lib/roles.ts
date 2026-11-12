// Role landing pages (/resume-keywords/[role]). Each entry is hand-written so every
// page carries unique, useful copy — these target long-tail searches such as
// "frontend developer resume keywords" that the home page alone cannot rank for.

export interface RoleGuide {
  slug: string;
  /** Singular role name, e.g. "Frontend Developer" */
  name: string;
  /** Other titles the same job is advertised under */
  alsoCalled: string[];
  metaDescription: string;
  intro: string;
  groups: { title: string; keywords: string[] }[];
  tips: { title: string; text: string }[];
  faqs: { q: string; a: string }[];
}

export const ROLES: RoleGuide[] = [
  {
    slug: "ai-engineer",
    name: "AI Engineer",
    alsoCalled: ["LLM Engineer", "Generative AI Engineer", "Applied AI Engineer"],
    metaDescription:
      "Top AI engineer resume keywords: LLMs, RAG, embeddings, vector databases, evals, deployment. Check your CV against any job post, free.",
    intro:
      "AI engineer is the fastest-growing title in tech, and its postings are unusually specific: which model APIs, which retrieval stack, how you evaluate quality, how you ship. Hiring managers screen for evidence that you have taken an LLM feature from prototype to production — not just called an API in a notebook.",
    groups: [
      { title: "LLMs & frameworks", keywords: ["LLMs", "OpenAI API", "Anthropic API", "LangChain", "LlamaIndex", "Prompt engineering", "Function calling", "AI agents"] },
      { title: "Retrieval (RAG)", keywords: ["RAG", "Embeddings", "Vector database", "pgvector", "Pinecone", "Weaviate", "Semantic search", "Chunking"] },
      { title: "Quality & deployment", keywords: ["Evals", "LLM evaluation", "Fine-tuning", "Hugging Face", "Model deployment", "MLOps", "MLflow", "Guardrails"] },
      { title: "Engineering foundation", keywords: ["Python", "FastAPI", "TypeScript", "Docker", "AWS", "SQL", "CI/CD", "Git"] },
    ],
    tips: [
      { title: "Show a shipped LLM feature, end to end", text: "\"Built a RAG assistant over 40k support articles, serving 3k queries a day\" proves more than a list of frameworks. Name the model, the retrieval stack and the scale." },
      { title: "Quantify quality, latency and cost", text: "AI teams live on evals. \"Raised answer accuracy from 71% to 89% on a 500-question eval set while cutting cost per query 40%\" is exactly what a hiring manager looks for." },
      { title: "Keep the software engineering visible", text: "Most AI engineer roles are engineering roles first. APIs, testing, CI/CD and cloud deployment belong on the CV next to the LLM work." },
    ],
    faqs: [
      { q: "What keywords should an AI engineer put on a resume?", a: "The model APIs and frameworks you have used (OpenAI or Anthropic APIs, LangChain, LlamaIndex), retrieval terms (RAG, embeddings, a vector database such as pgvector or Pinecone), quality and deployment terms (evals, fine-tuning, MLOps, model deployment) and the engineering basics — Python, FastAPI, Docker, cloud and CI/CD." },
      { q: "What is the difference between an AI engineer and a machine learning engineer resume?", a: "ML engineer CVs centre on training models — feature engineering, PyTorch or TensorFlow, model performance. AI engineer CVs centre on building products on top of large language models — prompting, RAG, evals, agents and shipping LLM features to users." },
    ],
  },
  {
    slug: "frontend-developer",
    name: "Frontend Developer",
    alsoCalled: ["Front-End Engineer", "React Developer", "UI Developer"],
    metaDescription:
      "Top frontend developer resume keywords: React, TypeScript, Next.js, testing, accessibility. Check your CV against any job post, free.",
    intro:
      "Frontend job descriptions are unusually keyword-dense: a framework, a language, a styling approach, a testing stack and a delivery process are usually all named explicitly. Recruiters and screening software look for those same terms on your CV, so naming the tools you have really used — in the words the posting uses — matters more here than in most roles.",
    groups: [
      { title: "Core languages & frameworks", keywords: ["JavaScript", "TypeScript", "React", "Next.js", "Vue", "Angular", "HTML5", "CSS3"] },
      { title: "Styling & UI", keywords: ["Tailwind CSS", "Sass", "CSS Modules", "Responsive design", "Design systems", "Storybook", "Figma"] },
      { title: "State & data", keywords: ["Redux", "Zustand", "React Query", "REST APIs", "GraphQL", "WebSockets"] },
      { title: "Quality & delivery", keywords: ["Jest", "Cypress", "Playwright", "React Testing Library", "Accessibility (WCAG)", "Core Web Vitals", "Git", "CI/CD", "GitHub Actions", "Agile / Scrum"] },
    ],
    tips: [
      { title: "Name the framework next to the result", text: "\"Rebuilt checkout in React and TypeScript, cutting load time 40%\" carries both the keyword and the proof. A bare skills list carries only the keyword." },
      { title: "Mirror the posting's spelling", text: "If the job says \"Next.js\" and \"Tailwind CSS\", write exactly that — not \"NextJS\" or \"Tailwind\". Simple screening filters match literal strings." },
      { title: "Don't skip the unglamorous terms", text: "Accessibility, testing and CI/CD appear in most frontend postings and are missing from most frontend CVs. If you have done them, say so." },
    ],
    faqs: [
      { q: "What keywords should a frontend developer put on a resume?", a: "Start with the stack the posting names — typically JavaScript, TypeScript and React or another framework — then add styling (Tailwind CSS, Sass), data (REST APIs, GraphQL), testing (Jest, Cypress, Playwright) and delivery terms (Git, CI/CD, Agile). Only include tools you have actually used." },
      { q: "How many keywords should a frontend developer resume have?", a: "There is no target number. Cover the skills the specific posting mentions repeatedly or in its title, each backed by a line of real experience. A CV matched to one posting beats a CV stuffed with every framework." },
    ],
  },
  {
    slug: "backend-engineer",
    name: "Backend Engineer",
    alsoCalled: ["Backend Developer", "Server-Side Engineer", "API Developer"],
    metaDescription:
      "Top backend engineer resume keywords: languages, databases, cloud, containers, API design. Check your CV against any job post, free.",
    intro:
      "Backend postings describe a system as much as a person: a language, a database, a cloud provider, a deployment model. Your CV is read against that picture. The strongest backend CVs name each layer of the stack they have worked on and attach a scale or reliability number to it.",
    groups: [
      { title: "Languages & frameworks", keywords: ["Python", "Node.js", "Java", "Go", "C#", "Django", "FastAPI", "Express", "Spring Boot"] },
      { title: "Data & storage", keywords: ["SQL", "PostgreSQL", "MySQL", "MongoDB", "Redis", "Kafka", "Elasticsearch", "Data modelling"] },
      { title: "Cloud & infrastructure", keywords: ["AWS", "Azure", "Google Cloud", "Docker", "Kubernetes", "Terraform", "Serverless", "CI/CD"] },
      { title: "Architecture & practice", keywords: ["REST APIs", "GraphQL", "gRPC", "Microservices", "Event-driven architecture", "Authentication (OAuth, JWT)", "Unit & integration testing", "Observability", "Scalability"] },
    ],
    tips: [
      { title: "Put a number on scale", text: "Requests per second, rows, latency, uptime. \"Designed a PostgreSQL schema serving 2M daily queries\" tells a reader far more than \"worked with PostgreSQL\"." },
      { title: "Name the cloud services, not just the cloud", text: "Postings that ask for AWS usually also mention specific services. If you used Lambda, S3 or RDS, list them alongside \"AWS\"." },
      { title: "Show ownership of the full lifecycle", text: "Design, build, deploy, monitor. Backend postings increasingly expect on-call and observability experience — include it if you have it." },
    ],
    faqs: [
      { q: "What keywords should a backend engineer put on a resume?", a: "The language and framework from the posting (for example Python with Django or FastAPI, or Node.js), the databases you have used (PostgreSQL, Redis, MongoDB), your cloud and container experience (AWS, Docker, Kubernetes) and architecture terms such as REST APIs, microservices and testing." },
      { q: "Should I list every programming language I know?", a: "No. Lead with the languages the posting asks for and that you could be interviewed on tomorrow. A long tail of languages you touched once dilutes the ones that matter." },
    ],
  },
  {
    slug: "machine-learning-engineer",
    name: "Machine Learning Engineer",
    alsoCalled: ["ML Engineer", "MLOps Engineer", "Applied ML Engineer"],
    metaDescription:
      "Top machine learning engineer resume keywords: Python, PyTorch, model training, MLOps, deployment. Check your CV against any job post, free.",
    intro:
      "Machine learning engineer postings sit between data science and software engineering: they want models that are trained well and run reliably in production. CVs that show only notebooks, or only infrastructure, miss half of what is being screened for. The strongest show the full loop — data, training, evaluation, deployment, monitoring.",
    groups: [
      { title: "Modelling", keywords: ["Machine learning", "Deep learning", "PyTorch", "TensorFlow", "scikit-learn", "Feature engineering", "Model evaluation"] },
      { title: "Data", keywords: ["Python", "SQL", "Pandas", "Spark", "Data pipelines", "Airflow", "Feature store"] },
      { title: "MLOps & deployment", keywords: ["MLOps", "Model deployment", "Model serving", "MLflow", "Kubeflow", "SageMaker", "Vertex AI", "Model monitoring"] },
      { title: "Engineering", keywords: ["Docker", "Kubernetes", "AWS", "CI/CD", "REST APIs", "Git", "Unit testing"] },
    ],
    tips: [
      { title: "Show a model in production, with a metric", text: "\"Deployed a ranking model serving 5M predictions a day, lifting click-through 8%\" covers modelling, scale and impact in one line." },
      { title: "Name your MLOps stack", text: "Experiment tracking, model registry, serving and monitoring tools are explicit in most postings. MLflow, SageMaker or Vertex AI are simple keyword matches." },
      { title: "Don't hide the software engineering", text: "Testing, CI/CD, containers and APIs are what separate ML engineers from data scientists in screening." },
    ],
    faqs: [
      { q: "What keywords should a machine learning engineer put on a resume?", a: "Python and a deep learning framework (PyTorch or TensorFlow), scikit-learn and feature engineering, data tools such as SQL and Spark, MLOps and deployment terms (MLflow, model serving, monitoring, SageMaker or Vertex AI) and engineering basics like Docker, Kubernetes and CI/CD." },
      { q: "What is the difference between an ML engineer and a data scientist resume?", a: "Data scientist CVs emphasise analysis, statistics and experimentation. ML engineer CVs emphasise building, deploying and operating models in production — pipelines, serving, monitoring and software engineering practice." },
    ],
  },
  {
    slug: "software-engineer",
    name: "Software Engineer",
    alsoCalled: ["Software Developer", "Full-Stack Engineer", "Application Developer"],
    metaDescription:
      "Top software engineer resume keywords: languages, frameworks, cloud, testing, system design. Check your CV against any job post, free.",
    intro:
      "\"Software engineer\" is the broadest title in tech, so the posting itself defines the role: one company means a Java backend, another a TypeScript full stack, another embedded C++. Generic CVs struggle here. The keywords that matter are the specific language, framework and platform in the posting — plus the engineering practices that every software team screens for.",
    groups: [
      { title: "Languages", keywords: ["Java", "Python", "TypeScript", "JavaScript", "C#", "Go", "C++", "Kotlin"] },
      { title: "Frameworks & platforms", keywords: ["React", "Node.js", "Spring Boot", ".NET", "Django", "REST APIs", "GraphQL", "Microservices"] },
      { title: "Data & cloud", keywords: ["SQL", "PostgreSQL", "MongoDB", "Redis", "AWS", "Azure", "Docker", "Kubernetes"] },
      { title: "Engineering practice", keywords: ["System design", "Data structures & algorithms", "Unit testing", "Code review", "CI/CD", "Git", "Agile / Scrum", "Clean code"] },
    ],
    tips: [
      { title: "Lead with the posting's primary language", text: "If the role is a Java role, Java belongs in your summary and your most recent job, not halfway down a skills list. Recruiters often filter on the first language they read." },
      { title: "Show scope, not just stack", text: "\"Designed the payments service handling 3M transactions a month\" signals system-design ability. Interviewers and screeners both look for evidence you built something end to end." },
      { title: "Name the practices", text: "Code review, testing, CI/CD and on-call are in most software engineering postings. One concrete line on each beats claiming them in a list." },
    ],
    faqs: [
      { q: "What keywords should a software engineer put on a resume?", a: "The language and framework the posting names (for example Java with Spring Boot, or TypeScript with React and Node.js), the databases and cloud platform you have used, and engineering practices such as system design, unit testing, code review, CI/CD and Git." },
      { q: "Should a software engineer resume list data structures and algorithms?", a: "Rarely as a keyword on its own. Show it through work instead — performance improvements, scaling problems you solved — and leave the algorithm questions to the interview." },
    ],
  },
  {
    slug: "data-scientist",
    name: "Data Scientist",
    alsoCalled: ["Machine Learning Engineer", "Applied Scientist", "ML Scientist"],
    metaDescription:
      "Top data scientist resume keywords: Python, machine learning, statistics, SQL, deployment. Check your CV against any job post, free.",
    intro:
      "Data scientist postings test two things at once: modelling depth (statistics, machine learning, experimentation) and the engineering needed to get a model used (SQL, pipelines, deployment). CVs heavy on algorithms but silent on business impact or production use are the ones that stall at screening.",
    groups: [
      { title: "Languages & libraries", keywords: ["Python", "R", "SQL", "Pandas", "NumPy", "scikit-learn", "PyTorch", "TensorFlow"] },
      { title: "Modelling & statistics", keywords: ["Machine learning", "Statistics", "Regression", "Classification", "Time series forecasting", "A/B testing", "Causal inference", "Feature engineering"] },
      { title: "Data & deployment", keywords: ["Spark", "BigQuery", "Snowflake", "Airflow", "MLflow", "Docker", "AWS SageMaker", "Model deployment"] },
      { title: "AI & communication", keywords: ["NLP", "LLMs", "Deep learning", "Data visualisation", "Stakeholder communication", "Experiment design"] },
    ],
    tips: [
      { title: "Tie every model to a metric that moved", text: "\"Built a churn model that cut cancellations 12%\" is what screeners look for. Model accuracy alone doesn't tell a reader the work mattered." },
      { title: "Prove it reached production", text: "Mention deployment, monitoring or the pipeline that serves predictions. Many postings separate notebook-only candidates from those who ship." },
      { title: "Match the posting's flavour", text: "Experimentation-heavy roles want A/B testing and causal inference; ML-engineering roles want deployment and MLOps. Weight your CV toward the one in front of you." },
    ],
    faqs: [
      { q: "What keywords should a data scientist put on a resume?", a: "Python and SQL first, then the libraries you use (Pandas, scikit-learn, PyTorch or TensorFlow), modelling and statistics terms (machine learning, regression, A/B testing, forecasting) and the data or deployment tools the posting names, such as Spark, Airflow or MLflow." },
      { q: "What is the difference between data scientist and data analyst keywords?", a: "Analyst postings centre on SQL, dashboards and BI tools such as Tableau or Power BI. Data scientist postings add machine learning, statistics, Python libraries and model deployment." },
    ],
  },
  {
    slug: "account-executive",
    name: "Account Executive",
    alsoCalled: ["Sales Executive", "B2B Sales Representative", "SaaS Account Executive"],
    metaDescription:
      "Top account executive resume keywords: quota, pipeline, Salesforce, prospecting, B2B SaaS sales. Check your CV against any job post, free.",
    intro:
      "Sales postings read like a scorecard: quota, deal size, sales cycle, CRM. Recruiters screen account executive CVs for the same things, and fast — a CV that describes duties instead of numbers, or never names the CRM, rarely makes the shortlist even when the experience is strong.",
    groups: [
      { title: "Sales motion", keywords: ["B2B sales", "SaaS sales", "Full sales cycle", "Prospecting", "Cold calling", "Lead generation", "Outbound", "Closing deals"] },
      { title: "Results & metrics", keywords: ["Quota attainment", "Pipeline management", "Deal size (ACV)", "Win rate", "Forecasting", "Revenue growth", "Upselling", "Renewals"] },
      { title: "Tools", keywords: ["Salesforce", "HubSpot", "CRM", "LinkedIn Sales Navigator", "Gong", "Outreach", "Excel"] },
      { title: "Skills & methods", keywords: ["Negotiation", "Account management", "Business development", "Discovery calls", "MEDDIC", "Solution selling", "Stakeholder management"] },
    ],
    tips: [
      { title: "Lead every role with quota attainment", text: "\"Closed €1.2M against a €900k quota (133%)\" is the first thing a sales manager looks for. Put it in the first bullet of each job, not buried at the end." },
      { title: "State deal size and cycle", text: "Mid-market and enterprise roles hire for the deals you have actually run. Average contract value and cycle length tell a reader instantly whether you fit." },
      { title: "Name the CRM and the method", text: "Salesforce or HubSpot appears in most postings, and many name a qualification method such as MEDDIC. If you use them, write them out." },
    ],
    faqs: [
      { q: "What keywords should an account executive put on a resume?", a: "B2B or SaaS sales, quota attainment, pipeline management, prospecting and closing, the CRM you use (usually Salesforce or HubSpot), negotiation and account management — each backed by a number such as revenue closed or percentage of quota." },
      { q: "How do I show sales results on a resume?", a: "Use the same metrics your manager tracked: percentage of quota, revenue closed, average deal size, win rate and ranking on the team. One concrete number per role beats a list of responsibilities." },
    ],
  },
  {
    slug: "digital-marketing-specialist",
    name: "Digital Marketing Specialist",
    alsoCalled: ["Digital Marketing Manager", "Performance Marketer", "Growth Marketer"],
    metaDescription:
      "Top digital marketing resume keywords: SEO, Google Ads, content, email, analytics, marketing automation. Check your CV against any job post, free.",
    intro:
      "Digital marketing postings name channels and tools explicitly: SEO, paid search, social, email, plus the analytics and automation stack behind them. Generalist CVs that say \"managed campaigns\" without naming the channel, the budget or the result are the ones that get skipped.",
    groups: [
      { title: "Channels", keywords: ["SEO", "SEM / PPC", "Google Ads", "Meta Ads", "Content marketing", "Email marketing", "Social media marketing", "Affiliate marketing"] },
      { title: "Analytics & testing", keywords: ["Google Analytics (GA4)", "Google Tag Manager", "A/B testing", "Conversion rate optimisation", "Attribution", "KPI reporting", "Looker Studio"] },
      { title: "Tools & automation", keywords: ["HubSpot", "Marketing automation", "Mailchimp", "Klaviyo", "Semrush", "Ahrefs", "CMS (WordPress)", "Canva"] },
      { title: "Strategy", keywords: ["Campaign management", "Budget management", "Customer acquisition", "Funnel optimisation", "Brand marketing", "Copywriting", "Growth marketing"] },
    ],
    tips: [
      { title: "Put a number on every channel", text: "\"Grew organic traffic 180% in 9 months\" or \"Cut cost per lead from €42 to €19 on Google Ads\" — channel, metric and timeframe in one line." },
      { title: "Mention the budget you managed", text: "Paid-media roles are hired by spend level. \"Managed €25k/month across Google and Meta\" places you immediately." },
      { title: "List the stack the posting uses", text: "GA4, Tag Manager, HubSpot, Semrush — tool names are simple keyword matches and recruiters filter on them." },
    ],
    faqs: [
      { q: "What keywords should a digital marketing specialist put on a resume?", a: "The channels you work in (SEO, Google Ads, Meta Ads, email, content, social), the analytics tools (GA4, Google Tag Manager), automation and CRM tools such as HubSpot, and outcome terms like conversion rate optimisation, customer acquisition and budget management." },
      { q: "Should a marketing resume include metrics?", a: "Yes. Traffic, conversion rate, cost per acquisition, return on ad spend and revenue influenced are what hiring managers compare candidates on. Include at least one per role." },
    ],
  },
  {
    slug: "financial-analyst",
    name: "Financial Analyst",
    alsoCalled: ["FP&A Analyst", "Finance Business Partner", "Corporate Finance Analyst"],
    metaDescription:
      "Top financial analyst resume keywords: financial modelling, FP&A, budgeting, forecasting, Excel, Power BI. Check your CV against any job post, free.",
    intro:
      "Financial analyst postings are built around a cycle — budget, forecast, close, report — and the tools used to run it. Recruiters look for the same words on your CV, along with proof that your numbers changed a decision. A CV that lists \"Excel\" without saying what was modelled, or for whom, rarely stands out.",
    groups: [
      { title: "Planning & analysis", keywords: ["FP&A", "Financial modelling", "Budgeting", "Forecasting", "Variance analysis", "Scenario analysis", "Business cases"] },
      { title: "Reporting & accounting", keywords: ["Management reporting", "Month-end close", "Reconciliation", "IFRS", "GAAP", "P&L", "Cash flow"] },
      { title: "Tools", keywords: ["Excel (pivot tables, advanced formulas)", "Power BI", "SQL", "SAP", "Oracle NetSuite", "Anaplan"] },
      { title: "Skills", keywords: ["Stakeholder management", "Financial analysis", "Data storytelling", "KPI reporting", "Cost control", "Process improvement"] },
    ],
    tips: [
      { title: "Show the decision your analysis drove", text: "\"Built the pricing model that supported a 6% price increase worth €1.8M\" says far more than \"responsible for financial models\"." },
      { title: "Name the cycle you owned", text: "Annual budget, rolling forecast, month-end close — say which ones you ran and for how large a business (revenue, cost centres, entities)." },
      { title: "Be specific about Excel and BI", text: "\"Excel\" is on every finance CV. Mention the level — financial models, pivot tables, Power Query — and the BI tool the posting names, such as Power BI." },
    ],
    faqs: [
      { q: "What keywords should a financial analyst put on a resume?", a: "FP&A, financial modelling, budgeting, forecasting and variance analysis; reporting terms such as management reporting, month-end close and IFRS or GAAP; and the tools the posting names — almost always Excel, often Power BI, SQL or an ERP such as SAP." },
      { q: "How do I show impact on a finance resume?", a: "Tie your work to money or decisions: savings identified, forecast accuracy improved, a budget you owned, a business case that was approved. One concrete number per role is enough." },
    ],
  },
  {
    slug: "project-manager",
    name: "Project Manager",
    alsoCalled: ["IT Project Manager", "Program Manager", "Project Lead"],
    metaDescription:
      "Top project manager resume keywords: planning, risk management, stakeholder management, Agile, PMP, budgets. Check your CV against any job post, free.",
    intro:
      "Project manager postings screen for three things: the methods you use, the size of what you have delivered, and how you handle people and risk. Recruiters look for the method names (Agile, Scrum, PRINCE2, PMP) and for numbers — budget, team size, timeline — that show the scale you can handle.",
    groups: [
      { title: "Methods & certifications", keywords: ["Project management", "Agile", "Scrum", "Waterfall", "PRINCE2", "PMP", "Kanban"] },
      { title: "Delivery", keywords: ["Project planning", "Scope management", "Risk management", "Budget management", "Resource planning", "Milestones", "Change management"] },
      { title: "People", keywords: ["Stakeholder management", "Cross-functional teams", "Vendor management", "Communication", "Status reporting", "Steering committee"] },
      { title: "Tools", keywords: ["Jira", "Confluence", "MS Project", "Asana", "Smartsheet", "Excel"] },
    ],
    tips: [
      { title: "Lead with scale and outcome", text: "\"Delivered a €2M ERP rollout across 4 countries, on time and 6% under budget\" tells a hiring manager exactly what you can carry." },
      { title: "Name the method and the certification", text: "PRINCE2, PMP, Scrum Master — if you hold one, put it near the top. Many postings filter on them." },
      { title: "Show how you handled risk", text: "One line about a risk you spotted early and the action you took signals seniority more than a list of tools." },
    ],
    faqs: [
      { q: "What keywords should a project manager put on a resume?", a: "Project management, the methods you use (Agile, Scrum, Waterfall, PRINCE2), certifications such as PMP, delivery terms (planning, scope, risk and budget management), people skills (stakeholder and vendor management) and the tools you run projects in — usually Jira, Confluence or MS Project." },
      { q: "Is PMP or PRINCE2 better on a resume?", a: "Use whichever the posting names. PRINCE2 is more common in the UK and Europe, PMP in the US and global companies; both are valued, and listing the one the employer asks for is a direct keyword match." },
    ],
  },
  {
    slug: "recruiter",
    name: "Recruiter",
    alsoCalled: ["Talent Acquisition Specialist", "Technical Recruiter", "HR Recruiter"],
    metaDescription:
      "Top recruiter resume keywords: sourcing, full-cycle recruiting, ATS, stakeholder management, time to hire. Check your CV against any job post, free.",
    intro:
      "Recruiters write job posts all day, yet their own CVs are often the vaguest in the pile. Talent acquisition roles are screened on the hiring volume you have handled, the roles you recruit for, the tools you source with and the metrics you were measured on.",
    groups: [
      { title: "Recruiting", keywords: ["Full-cycle recruiting", "Sourcing", "Headhunting", "Technical recruiting", "Candidate screening", "Interviewing", "Offer negotiation"] },
      { title: "Tools", keywords: ["Applicant tracking system (ATS)", "Greenhouse", "Workday", "LinkedIn Recruiter", "Boolean search", "Lever", "Excel"] },
      { title: "Metrics", keywords: ["Time to hire", "Cost per hire", "Offer acceptance rate", "Pipeline reporting", "Quality of hire", "Hiring targets"] },
      { title: "Partnering", keywords: ["Stakeholder management", "Hiring manager partnership", "Employer branding", "Candidate experience", "Diversity hiring", "Onboarding"] },
    ],
    tips: [
      { title: "Quantify your hiring", text: "\"Hired 45 engineers in 12 months with a 92% offer acceptance rate\" is the recruiter equivalent of a sales quota — put it first." },
      { title: "Say what you recruit for", text: "Tech, sales, executive, volume — postings usually specialise, and so should your summary." },
      { title: "List the ATS and sourcing tools", text: "Greenhouse, Workday, LinkedIn Recruiter and Boolean search are direct keyword matches in talent acquisition postings." },
    ],
    faqs: [
      { q: "What keywords should a recruiter put on a resume?", a: "Full-cycle recruiting, sourcing and the roles you hire for; the applicant tracking system and sourcing tools you use (Greenhouse, Workday, LinkedIn Recruiter, Boolean search); metrics such as time to hire and offer acceptance rate; and partnering terms like stakeholder management and employer branding." },
      { q: "How should a recruiter show results on a resume?", a: "Use hiring numbers: roles filled, time to hire, offer acceptance rate, cost per hire or hiring targets met. They are the metrics your next manager will judge you on." },
    ],
  },
  {
    slug: "customer-success-manager",
    name: "Customer Success Manager",
    alsoCalled: ["Account Manager", "Client Success Manager", "Customer Success Lead"],
    metaDescription:
      "Top customer success manager resume keywords: retention, churn, onboarding, renewals, upselling, CRM. Check your CV against any job post, free.",
    intro:
      "Customer success postings are measured in retention: churn, renewals, expansion and customer health. Recruiters look for the size of the book you managed, the motions you ran — onboarding, QBRs, renewals — and the tools behind them. A CSM CV without a retention number is easy to pass over.",
    groups: [
      { title: "Retention & growth", keywords: ["Customer retention", "Churn reduction", "Renewals", "Upselling", "Expansion revenue", "Net revenue retention (NRR)"] },
      { title: "Customer lifecycle", keywords: ["Onboarding", "Adoption", "Quarterly business reviews (QBRs)", "Customer health score", "Escalation management", "Customer journey"] },
      { title: "Tools", keywords: ["Salesforce", "HubSpot", "Gainsight", "Zendesk", "Intercom", "CRM", "Excel"] },
      { title: "Skills", keywords: ["Account management", "Stakeholder management", "SaaS", "Product knowledge", "Communication", "Negotiation"] },
    ],
    tips: [
      { title: "Put retention first", text: "\"Managed a €3M book of 40 accounts with 96% gross retention and 118% NRR\" is the line hiring managers scan for." },
      { title: "Show the motions you run", text: "Onboarding programmes, QBRs, health scoring, renewal playbooks — name them and the result they produced." },
      { title: "Name your CS stack", text: "Gainsight, Salesforce, HubSpot or Zendesk appear in most postings and are easy keyword matches." },
    ],
    faqs: [
      { q: "What keywords should a customer success manager put on a resume?", a: "Customer retention, churn reduction, renewals, upselling and NRR; lifecycle terms such as onboarding, adoption, QBRs and health scores; the tools you use (Gainsight, Salesforce, HubSpot, Zendesk); and account and stakeholder management." },
      { q: "What metrics belong on a customer success resume?", a: "Gross and net revenue retention, churn rate, renewal rate, expansion revenue, number and value of accounts managed, and customer satisfaction scores such as NPS." },
    ],
  },
  {
    slug: "data-analyst",
    name: "Data Analyst",
    alsoCalled: ["Business Analyst", "BI Analyst", "Analytics Specialist"],
    metaDescription:
      "Top data analyst resume keywords: SQL, Python, Tableau, Power BI, A/B testing. Check your CV against any job post, free.",
    intro:
      "Data analyst postings split into three parts: how you get the data (SQL, warehouses), how you analyse it (Python, statistics) and how you communicate it (dashboards, stakeholders). CVs that only cover the tools and skip the business outcome are the most common reason qualified analysts get filtered out.",
    groups: [
      { title: "Querying & warehouses", keywords: ["SQL", "PostgreSQL", "BigQuery", "Snowflake", "Redshift", "ETL", "dbt", "Data modelling"] },
      { title: "Analysis", keywords: ["Python", "Pandas", "NumPy", "R", "Excel", "Statistics", "A/B testing", "Regression", "Forecasting"] },
      { title: "Visualisation & BI", keywords: ["Tableau", "Power BI", "Looker", "Dashboards", "Data visualisation", "KPI reporting"] },
      { title: "Business skills", keywords: ["Stakeholder management", "Requirements gathering", "Data storytelling", "Product analytics", "Data quality"] },
    ],
    tips: [
      { title: "Lead with the decision, not the dashboard", text: "\"Built a churn dashboard in Tableau that led to a pricing change worth €300k\" beats \"built dashboards in Tableau\"." },
      { title: "State your SQL level concretely", text: "Mention window functions, CTEs or query optimisation if you use them. \"SQL\" alone doesn't distinguish you from someone who has written one SELECT." },
      { title: "Match the BI tool exactly", text: "Tableau, Power BI and Looker are not interchangeable to a keyword filter. Name the one in the posting if you have used it, and the closest equivalent if you haven't." },
    ],
    faqs: [
      { q: "What keywords should a data analyst put on a resume?", a: "SQL first — it appears in nearly every posting — then the analysis tools you use (Python, Pandas, Excel, R), the BI tool the posting names (Tableau, Power BI or Looker), methods such as A/B testing and statistics, and business terms like stakeholder management and KPI reporting." },
      { q: "Do data analysts need Python on their resume?", a: "Many postings ask for it, some only want SQL and a BI tool. Check the specific job: if Python appears in the requirements, include it with an example of what you used it for." },
    ],
  },
  {
    slug: "product-manager",
    name: "Product Manager",
    alsoCalled: ["Product Owner", "Technical Product Manager", "Senior PM"],
    metaDescription:
      "Top product manager resume keywords: roadmap, discovery, metrics, stakeholder management, Agile. Check your CV against any job post, free.",
    intro:
      "Product manager postings contain fewer tool names and more process and outcome language, which makes them harder to match by instinct. The terms that count are the ones describing how the team decides what to build, how it ships, and how success is measured — and your CV needs the same vocabulary, with numbers attached.",
    groups: [
      { title: "Strategy & discovery", keywords: ["Product strategy", "Roadmap", "Product discovery", "User research", "Customer interviews", "Market analysis", "Prioritisation", "OKRs"] },
      { title: "Delivery", keywords: ["Agile", "Scrum", "Kanban", "Backlog management", "User stories", "Sprint planning", "Go-to-market", "Cross-functional teams"] },
      { title: "Data & metrics", keywords: ["KPIs", "A/B testing", "Product analytics", "SQL", "Conversion", "Retention", "Experimentation"] },
      { title: "Tools & collaboration", keywords: ["Jira", "Confluence", "Figma", "Amplitude", "Mixpanel", "Stakeholder management", "Communication"] },
    ],
    tips: [
      { title: "Every bullet needs a metric", text: "Adoption, revenue, retention, conversion, time saved. A PM CV without numbers reads as a project coordinator's CV." },
      { title: "Use the posting's process words", text: "If the job says \"discovery\", \"OKRs\" and \"experimentation\", describe your work in those terms where they honestly apply." },
      { title: "Show what you decided not to build", text: "Prioritisation is the core of the job. One line about a trade-off you made, and why, signals seniority better than a list of launches." },
    ],
    faqs: [
      { q: "What keywords should a product manager put on a resume?", a: "Roadmap, product strategy, discovery, prioritisation, stakeholder management, Agile or Scrum, and the metrics you were accountable for (retention, conversion, revenue). Add the tools the posting names — commonly Jira, Figma and an analytics product such as Amplitude or Mixpanel." },
      { q: "Do product managers need technical keywords on their resume?", a: "For technical PM roles, yes — APIs, SQL and system design terms often appear in the requirements. For other PM roles, analytics and experimentation terms usually matter more than engineering ones." },
    ],
  },
  {
    slug: "devops-engineer",
    name: "DevOps Engineer",
    alsoCalled: ["Site Reliability Engineer (SRE)", "Platform Engineer", "Cloud Engineer"],
    metaDescription:
      "Top DevOps engineer resume keywords: Kubernetes, Terraform, AWS, CI/CD, monitoring. Check your CV against any job post, free.",
    intro:
      "DevOps postings are the most tool-heavy of any engineering role, and the tools change from company to company: one team's Terraform and GitHub Actions is another's Pulumi and GitLab CI. Matching your CV to the specific toolchain in the posting — while showing the transferable practice underneath — is what gets it read.",
    groups: [
      { title: "Cloud & containers", keywords: ["AWS", "Azure", "Google Cloud", "Docker", "Kubernetes", "Helm", "Serverless"] },
      { title: "Infrastructure as code & automation", keywords: ["Terraform", "Ansible", "CloudFormation", "Pulumi", "Bash", "Python", "GitOps"] },
      { title: "CI/CD", keywords: ["GitHub Actions", "GitLab CI", "Jenkins", "Argo CD", "Deployment pipelines", "Release automation"] },
      { title: "Reliability & security", keywords: ["Linux", "Monitoring", "Prometheus", "Grafana", "Datadog", "Incident response", "SLOs", "Networking", "Security / DevSecOps"] },
    ],
    tips: [
      { title: "Quantify reliability and speed", text: "Deployment frequency, lead time, uptime, recovery time, cost saved. \"Cut deploy time from 45 to 6 minutes\" is the kind of line that gets interviews." },
      { title: "Bridge equivalent tools explicitly", text: "If the posting wants GitLab CI and you know GitHub Actions, name yours and say \"CI/CD pipelines\" in general terms too, so both a filter and a human see the fit." },
      { title: "List certifications where the posting asks", text: "AWS, Azure and Kubernetes (CKA) certifications are frequently named in requirements and are easy keyword matches if you hold them." },
    ],
    faqs: [
      { q: "What keywords should a DevOps engineer put on a resume?", a: "Your cloud platform (AWS, Azure or Google Cloud), Docker and Kubernetes, an infrastructure-as-code tool such as Terraform, your CI/CD system (GitHub Actions, GitLab CI or Jenkins), Linux, scripting in Bash or Python, and monitoring tools such as Prometheus and Grafana." },
      { q: "Is DevOps the same as SRE on a resume?", a: "The toolchains overlap heavily, but SRE postings put more weight on reliability language — SLOs, incident response, on-call, capacity planning. Use the vocabulary of the title you are applying for." },
    ],
  },
  {
    slug: "ux-designer",
    name: "UX Designer",
    alsoCalled: ["Product Designer", "UX/UI Designer", "Interaction Designer"],
    metaDescription:
      "Top UX designer resume keywords: Figma, user research, prototyping, usability testing, design systems. Check your CV against any job post, free.",
    intro:
      "A UX designer's portfolio shows the work, but the CV is what gets the portfolio opened. Postings name specific methods (research, testing, prototyping) and tools (almost always Figma), and a CV that describes the same process in different words can score poorly against them despite strong experience.",
    groups: [
      { title: "Research", keywords: ["User research", "Usability testing", "User interviews", "Personas", "Journey mapping", "Surveys", "Competitive analysis"] },
      { title: "Design", keywords: ["Wireframing", "Prototyping", "Interaction design", "Information architecture", "Visual design", "Responsive design", "Design systems"] },
      { title: "Tools", keywords: ["Figma", "Sketch", "Adobe XD", "Miro", "FigJam", "Maze"] },
      { title: "Collaboration & standards", keywords: ["Accessibility (WCAG)", "Design thinking", "Agile", "Developer handoff", "Stakeholder management", "A/B testing"] },
    ],
    tips: [
      { title: "Describe the outcome of the design", text: "Task completion, conversion, support tickets, satisfaction scores. \"Redesigned onboarding, lifting activation from 31% to 44%\" belongs on the CV, not only in the case study." },
      { title: "Name your methods in full", text: "Write \"usability testing\" and \"user interviews\" rather than just \"research\" — postings list them separately and so do keyword filters." },
      { title: "Keep the CV text-based", text: "A heavily designed PDF can lose its text when parsed. Use a clean, single-column layout for applications and let the portfolio carry the visuals." },
    ],
    faqs: [
      { q: "What keywords should a UX designer put on a resume?", a: "Figma, user research, usability testing, wireframing, prototyping, interaction design and design systems cover most postings. Add accessibility (WCAG), journey mapping and collaboration terms such as developer handoff and Agile where you have the experience." },
      { q: "Should a UX designer's resume be visually designed?", a: "Keep it clean and readable rather than elaborate. Text inside images or complex multi-column layouts is often lost when a PDF is parsed, so the keywords never reach the recruiter's search." },
    ],
  },
];

export function getRole(slug: string): RoleGuide | undefined {
  return ROLES.find((r) => r.slug === slug);
}

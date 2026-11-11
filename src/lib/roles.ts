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
    slug: "frontend-developer",
    name: "Frontend Developer",
    alsoCalled: ["Front-End Engineer", "React Developer", "UI Developer"],
    metaDescription:
      "The resume keywords frontend developer job posts ask for most — React, TypeScript, Next.js, testing, accessibility — and a free check of your own CV against any posting.",
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
      "The resume keywords backend engineer job posts ask for most — languages, databases, cloud, containers, API design — and a free check of your own CV against any posting.",
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
    slug: "data-analyst",
    name: "Data Analyst",
    alsoCalled: ["Business Analyst", "BI Analyst", "Analytics Specialist"],
    metaDescription:
      "The resume keywords data analyst job posts ask for most — SQL, Python, Tableau, Power BI, A/B testing — and a free check of your own CV against any posting.",
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
      "The resume keywords product manager job posts ask for most — roadmap, discovery, metrics, stakeholder management, Agile — and a free check of your own CV against any posting.",
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
      "The resume keywords DevOps engineer job posts ask for most — Kubernetes, Terraform, AWS, CI/CD, monitoring — and a free check of your own CV against any posting.",
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
      "The resume keywords UX designer job posts ask for most — Figma, user research, prototyping, usability testing, design systems — and a free check of your own CV against any posting.",
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

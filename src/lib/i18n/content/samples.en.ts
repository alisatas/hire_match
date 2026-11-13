import type { SampleJob } from "./types";

// Mixed on purpose: tech roles alternate with sales, marketing and finance so the
// samples show that CVXray is not only for IT jobs. Every role here has skill groups
// in analyze.ts, so its sample produces a meaningful score.
export const SAMPLE_JOBS: SampleJob[] = [
    {
        id: "AI Engineer",
        label: "AI Engineer",
        emoji: "🤖",
        desc: "Python, LLMs, RAG, embeddings, vector databases, LangChain, evals, FastAPI, AWS",
        text: `AI Engineer — Amsterdam (Hybrid)

We are hiring an AI Engineer to build LLM-powered features used by thousands of customers. You will take generative AI from prototype to production: retrieval, evaluation, deployment and monitoring.

Requirements:
- 3+ years of experience as a software or machine learning engineer, with strong Python
- Hands-on experience building LLM applications with the OpenAI or Anthropic APIs
- Retrieval-augmented generation (RAG): embeddings, chunking and a vector database such as pgvector, Pinecone or Weaviate
- Frameworks such as LangChain or LlamaIndex; AI agents and function calling
- Evals: designing LLM evaluation sets and measuring quality, latency and cost
- Model deployment behind APIs (FastAPI), Docker and AWS
- Prompt engineering and fine-tuning with Hugging Face
- CI/CD, Git and working in Agile teams

Nice to have:
- MLOps experience (MLflow, SageMaker or Vertex AI)
- TypeScript for internal tools
- SQL and PostgreSQL

We offer a competitive salary, a learning budget and a hybrid work culture.`,
    },
    {
        id: "Account Executive",
        label: "Account Executive",
        emoji: "🤝",
        desc: "B2B SaaS sales, prospecting, quota, Salesforce, HubSpot, negotiation",
        text: `Account Executive — B2B SaaS Sales, Rotterdam (Hybrid)

We are hiring an Account Executive to own the full sales cycle for mid-market customers across the Benelux. You will run prospecting and lead generation, manage your pipeline in Salesforce and close deals against a quarterly quota.

Requirements:
- 3+ years of experience in B2B sales or SaaS sales, ideally as an account executive
- Proven track record of quota attainment and closing deals
- Hands-on experience with Salesforce or HubSpot CRM
- Strong negotiation, discovery and account management skills
- Comfortable with cold calling and outbound prospecting
- Business development mindset and excellent communication in English and Dutch

Nice to have:
- Experience with marketing automation and Excel forecasting
- Familiarity with LinkedIn Sales Navigator

We offer an uncapped commission plan, a hybrid work culture and a training budget.`,
    },
    {
        id: "Frontend Dev",
        label: "Frontend Dev",
        emoji: "🎨",
        desc: "React, TypeScript, Next.js, Tailwind, GraphQL, Jest, CI/CD",
        text: `Frontend Developer — Amsterdam (Hybrid)

We are looking for a skilled Frontend Developer to join our product team. You will build responsive, performant web applications used by thousands of users daily.

Requirements:
- 3+ years of experience with React and TypeScript
- Strong knowledge of Next.js, Tailwind CSS, and modern CSS
- Experience with state management (Redux, Zustand, or similar)
- Familiarity with REST APIs and GraphQL
- Git version control and CI/CD pipelines (GitHub Actions)
- Understanding of accessibility (WCAG) and cross-browser compatibility
- Experience with Jest and Cypress for testing is a plus
- Agile/Scrum team experience

Nice to have:
- Figma and UX design collaboration
- Node.js for BFF patterns
- Docker for local development

We offer a competitive salary, flexible hybrid work, and a collaborative team culture.`,
    },
    {
        id: "Digital Marketer",
        label: "Digital Marketer",
        emoji: "📣",
        desc: "SEO, Google Ads, content and email marketing, GA4, HubSpot, campaign management",
        text: `Digital Marketing Specialist — Utrecht (Hybrid)

We are looking for a Digital Marketing Specialist to grow our online customer acquisition. You will own SEO and paid search, run campaigns across channels and report on what works.

Requirements:
- 2+ years of experience in digital marketing
- Strong SEO skills: keyword research, on-page optimisation and content briefs
- Hands-on Google Ads (PPC / SEM) campaign management with a monthly budget
- Content marketing and email marketing experience
- Social media marketing on LinkedIn and Meta
- Comfortable with Google Analytics and Google Tag Manager for reporting
- Experience with HubSpot or another marketing automation tool
- Data-driven: A/B testing and conversion rate optimisation

Nice to have:
- Growth marketing experience at a scale-up
- Basic Excel or Looker Studio skills

We offer a marketing budget you can experiment with, flexible hours and a hybrid office.`,
    },
    {
        id: "Backend Engineer",
        label: "Backend Engineer",
        emoji: "⚙️",
        desc: "Node.js, Python, PostgreSQL, AWS, Docker, Kubernetes, Redis, Terraform",
        text: `Backend Engineer — Remote (EU)

Join our engineering team to design and build scalable backend services powering our SaaS platform.

Requirements:
- 4+ years experience with Node.js or Python (FastAPI, Django)
- Strong SQL skills — PostgreSQL preferred
- Experience designing REST APIs and microservices
- Familiarity with Docker and Kubernetes
- AWS or GCP cloud infrastructure experience
- CI/CD pipeline experience (GitHub Actions, Jenkins)
- Redis for caching and queues
- Git and code review practices

Nice to have:
- Terraform for infrastructure as code
- Elasticsearch for search
- GraphQL API design
- Experience with message queues (RabbitMQ, Kafka)

We're a fully remote team with async-first culture and 5+ years of runway.`,
    },
    {
        id: "Financial Analyst",
        label: "Financial Analyst",
        emoji: "💶",
        desc: "Financial modelling, FP&A, budgeting, forecasting, Excel, Power BI, IFRS",
        text: `Financial Analyst (FP&A) — Amsterdam

Our finance team is looking for a Financial Analyst to support budgeting, forecasting and business decisions across the company.

Requirements:
- 3+ years of experience in FP&A, financial analysis or corporate finance
- Strong financial modelling skills in Excel (pivot tables, advanced formulas)
- Experience leading the annual budgeting cycle and monthly forecasting
- Variance analysis and management reporting for senior stakeholders
- Knowledge of IFRS; month-end close and reconciliation experience is a plus
- Comfortable building dashboards in Power BI
- Strong stakeholder management and communication skills

Nice to have:
- SQL for pulling data from the warehouse
- Experience in a fast-growing company or at a Big Four firm

We offer a competitive salary, a study budget for CFA or RA certification and a hybrid work week.`,
    },
    {
        id: "Data Analyst",
        label: "Data Analyst",
        emoji: "📊",
        desc: "SQL, Python, Pandas, Tableau, Power BI, BigQuery, Redshift, A/B Testing",
        text: `Data Analyst — Utrecht, Netherlands

We're looking for a data-driven analyst to turn complex datasets into actionable insights for our growth and product teams.

Requirements:
- 2+ years experience in data analysis
- Strong SQL — able to write complex queries across large datasets
- Python with Pandas and NumPy for data manipulation
- Experience with data visualisation tools (Tableau, Power BI, or similar)
- Understanding of statistics and A/B testing methodology
- Familiarity with Google Analytics and BigQuery or AWS Redshift
- Excellent communication and data storytelling skills

Nice to have:
- Machine learning basics (scikit-learn)
- Experience with dbt for data modelling
- Agile/Scrum environment experience
- Knowledge of GDPR data handling

You will work closely with product managers, engineers, and the marketing team in a fast-growing scale-up.`,
    },
    {
        id: "Product Manager",
        label: "Product Manager",
        emoji: "📋",
        desc: "Product strategy, roadmap, Agile, Jira, analytics, stakeholder management",
        text: `Senior Product Manager — London (Hybrid)

We are looking for an experienced Product Manager to lead our core product area and drive growth across our platform.

Requirements:
- 4+ years of product management experience in a B2B or B2C SaaS environment
- Strong ability to define product vision, strategy, and roadmap
- Experience running agile sprints — Jira, Confluence, and backlog grooming
- Data-driven mindset: comfortable with SQL, Google Analytics, Mixpanel, or Amplitude
- Excellent stakeholder management and communication skills
- Proven track record of shipping features from ideation to launch
- Experience writing PRDs, user stories, and acceptance criteria
- Understanding of UX design principles and working with Figma

Nice to have:
- Prior experience in fintech, marketplace, or SaaS
- A/B testing and experimentation experience
- Basic technical knowledge (APIs, system design)
- Experience with OKRs and product-led growth

Join a fast-moving team where product decisions have real impact.`,
    },
    {
        id: "DevOps Engineer",
        label: "DevOps Engineer",
        emoji: "⚙️",
        desc: "Kubernetes, Terraform, AWS, CI/CD, Docker, Linux, monitoring, security",
        text: `DevOps Engineer — Berlin (Remote-friendly)

We are hiring a DevOps Engineer to own our infrastructure, deployment pipelines, and cloud operations.

Requirements:
- 3+ years of DevOps or platform engineering experience
- Deep expertise with Kubernetes (EKS or GKE preferred) and Helm
- Strong Terraform skills for infrastructure as code
- AWS or GCP cloud infrastructure — VPCs, IAM, S3, RDS, Lambda
- Docker containerisation and image optimisation
- CI/CD pipelines — GitHub Actions, ArgoCD, or Jenkins
- Linux system administration and shell scripting (Bash)
- Monitoring and observability: Prometheus, Grafana, Datadog, or similar
- Security best practices: secrets management (Vault, AWS Secrets Manager), network policies

Nice to have:
- Service mesh experience (Istio, Linkerd)
- Experience with multi-region deployments
- Cost optimisation mindset (FinOps)
- Python or Go for automation scripting

We run fully on AWS with a large Kubernetes cluster and need someone who can own it end-to-end.`,
    },
]

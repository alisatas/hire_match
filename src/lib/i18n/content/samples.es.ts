import type { SampleJob } from "./types";

export const SAMPLE_JOBS: SampleJob[] = [
  { id: "AI Engineer", label: "Ingeniero de IA", emoji: "🤖", desc: "Python, LLM, RAG, embeddings, bases de datos vectoriales, LangChain, evals, FastAPI, AWS", text: `Ingeniero/a de IA (AI Engineer) — Madrid (Híbrido)

Buscamos un/a AI Engineer para crear funcionalidades basadas en LLM que usan miles de clientes. Llevarás la IA generativa del prototipo a producción: recuperación, evaluación, despliegue y monitorización.

Requisitos:
- Al menos 3 años de experiencia como ingeniero/a de software o de machine learning, con Python sólido
- Experiencia creando aplicaciones LLM con las APIs de OpenAI o Anthropic
- RAG: embeddings, chunking y una base de datos vectorial como pgvector, Pinecone o Weaviate
- Frameworks como LangChain o LlamaIndex; AI agents y function calling
- Evals: diseñar conjuntos de evaluación de LLM y medir calidad, latencia y coste
- Despliegue de modelos tras APIs (FastAPI), Docker y AWS
- Prompt engineering y fine-tuning con Hugging Face
- CI/CD, Git y trabajo en equipos ágiles

Se valorará:
- Experiencia en MLOps (MLflow, SageMaker o Vertex AI)
- TypeScript para herramientas internas
- SQL y PostgreSQL

Ofrecemos salario competitivo, presupuesto de formación y trabajo híbrido.` },
  { id: "Account Executive", label: "Account Executive", emoji: "🤝", desc: "Ventas B2B SaaS, prospección, cuota, Salesforce, HubSpot, negociación", text: `Account Executive — Ventas B2B SaaS, Barcelona (Híbrido)

Buscamos un/a Account Executive que gestione el ciclo de venta completo con clientes medianos en España y Portugal. Harás prospección y generación de leads, gestionarás tu pipeline en Salesforce y cerrarás acuerdos frente a una cuota trimestral.

Requisitos:
- Al menos 3 años de experiencia en ventas B2B o ventas SaaS, idealmente como account executive
- Historial demostrado de cumplimiento de cuota y cierre de ventas
- Experiencia práctica con Salesforce o HubSpot CRM
- Sólidas habilidades de negociación, descubrimiento y gestión de cuentas
- Soltura con las llamadas en frío y la prospección outbound
- Mentalidad de desarrollo de negocio y excelente comunicación en español e inglés

Se valorará:
- Experiencia con automatización de marketing y previsiones en Excel
- Conocimiento de LinkedIn Sales Navigator

Ofrecemos comisiones sin techo, trabajo híbrido y presupuesto de formación.` },
  { id: "Frontend Dev", label: "Desarrollador Frontend", emoji: "🎨", desc: "React, TypeScript, Next.js, Tailwind, GraphQL, Jest, CI/CD", text: `Desarrollador/a Frontend — Valencia (Híbrido)

Buscamos un/a Desarrollador/a Frontend para nuestro equipo de producto. Crearás aplicaciones web rápidas y adaptables que usan miles de personas cada día.

Requisitos:
- Al menos 3 años de experiencia con React y TypeScript
- Sólidos conocimientos de Next.js, Tailwind CSS y CSS moderno
- Experiencia con gestión de estado (Redux, Zustand o similar)
- Conocimiento de REST APIs y GraphQL
- Control de versiones con Git y pipelines de CI/CD (GitHub Actions)
- Conocimientos de accesibilidad (WCAG) y compatibilidad entre navegadores
- Experiencia en equipos ágiles / Scrum

Se valorará:
- Pruebas con Jest y Cypress
- Colaboración con diseño UX en Figma
- Node.js para patrones BFF y Docker para desarrollo local

Ofrecemos salario competitivo, trabajo híbrido flexible y una cultura de equipo colaborativa.` },
  { id: "Digital Marketer", label: "Especialista en Marketing Digital", emoji: "📣", desc: "SEO, Google Ads, marketing de contenidos y email, GA4, HubSpot, gestión de campañas", text: `Especialista en Marketing Digital — Sevilla (Híbrido)

Buscamos un/a Especialista en Marketing Digital para hacer crecer la captación de clientes online. Te encargarás del SEO y la búsqueda de pago, gestionarás campañas en varios canales e informarás de lo que funciona.

Requisitos:
- Al menos 2 años de experiencia en marketing digital
- Sólidos conocimientos de SEO: investigación de palabras clave, optimización on-page y briefs de contenido
- Gestión de campañas en Google Ads (PPC / SEM) con presupuesto mensual
- Experiencia en marketing de contenidos y email marketing
- Marketing en redes sociales en LinkedIn y Meta
- Informes con Google Analytics y Google Tag Manager
- Experiencia con HubSpot u otra herramienta de automatización de marketing
- Enfoque basado en datos: pruebas A/B y optimización de la conversión

Se valorará:
- Experiencia en growth marketing en una scale-up
- Conocimientos básicos de Excel o Looker Studio

Ofrecemos un presupuesto de marketing para experimentar, horario flexible y oficina híbrida.` },
  { id: "Backend Engineer", label: "Desarrollador Backend", emoji: "⚙️", desc: "Node.js, Python, PostgreSQL, AWS, Docker, Kubernetes, Redis, Terraform", text: `Desarrollador/a Backend — Remoto (UE)

Únete a nuestro equipo de ingeniería para diseñar y construir servicios backend escalables que dan soporte a nuestra plataforma SaaS.

Requisitos:
- Al menos 4 años de experiencia con Node.js o Python (FastAPI, Django)
- SQL sólido, preferiblemente PostgreSQL
- Experiencia diseñando REST APIs y microservicios
- Conocimientos de Docker y Kubernetes
- Experiencia con infraestructura cloud en AWS o GCP
- Pipelines de CI/CD (GitHub Actions, Jenkins)
- Redis para caché y colas
- Git y prácticas de revisión de código

Deseable:
- Terraform para infraestructura como código
- Elasticsearch para búsqueda
- Diseño de APIs GraphQL
- Colas de mensajes (RabbitMQ, Kafka)

Somos un equipo totalmente remoto con una cultura asíncrona.` },
  { id: "Financial Analyst", label: "Analista Financiero", emoji: "💶", desc: "Modelización financiera, FP&A, presupuestos, previsiones, Excel, Power BI, NIIF", text: `Analista Financiero/a (FP&A) — Madrid

Nuestro equipo de finanzas busca un/a Analista Financiero/a para apoyar la elaboración de presupuestos, las previsiones y la toma de decisiones en toda la empresa.

Requisitos:
- Al menos 3 años de experiencia en FP&A, análisis financiero o finanzas corporativas
- Sólida modelización financiera en Excel (tablas dinámicas, fórmulas avanzadas)
- Experiencia liderando el ciclo anual de presupuestos y las previsiones mensuales
- Análisis de desviaciones e informes de gestión para la dirección
- Conocimiento de las NIIF
- Elaboración de cuadros de mando en Power BI
- Excelente gestión de stakeholders y comunicación

Se valorará:
- Experiencia en cierre mensual y conciliaciones
- SQL para extraer datos del data warehouse
- Experiencia en una empresa en crecimiento o en una Big Four

Ofrecemos salario competitivo, presupuesto para certificaciones y semana híbrida.` },
  { id: "Data Analyst", label: "Analista de Datos", emoji: "📊", desc: "SQL, Python, Pandas, Tableau, Power BI, BigQuery, pruebas A/B", text: `Analista de Datos — Bilbao

Buscamos un/a analista orientado/a a los datos que convierta conjuntos de datos complejos en conclusiones accionables para nuestros equipos de crecimiento y producto.

Requisitos:
- Al menos 2 años de experiencia en análisis de datos
- SQL sólido: consultas complejas sobre grandes volúmenes de datos
- Python con Pandas y NumPy para el tratamiento de datos
- Experiencia con herramientas de visualización de datos (Tableau, Power BI o similares)
- Conocimientos de estadística y metodología de pruebas A/B
- Conocimiento de Google Analytics y BigQuery
- Excelente comunicación y capacidad de contar historias con datos

Se valorará:
- Nociones de aprendizaje automático (scikit-learn)
- Experiencia con dbt para modelado de datos
- Experiencia en entornos ágiles / Scrum
- Conocimiento del tratamiento de datos conforme al RGPD

Trabajarás con producto, ingeniería y marketing en una scale-up en pleno crecimiento.` },
  { id: "Product Manager", label: "Product Manager", emoji: "📋", desc: "Estrategia de producto, hoja de ruta, ágil, Jira, analítica, gestión de stakeholders", text: `Senior Product Manager — Madrid (Híbrido)

Buscamos un/a Product Manager con experiencia para liderar un área clave de producto e impulsar el crecimiento de nuestra plataforma.

Requisitos:
- Al menos 4 años de experiencia en gestión de producto en un entorno SaaS B2B o B2C
- Capacidad para definir la visión, la estrategia de producto y la hoja de ruta
- Experiencia gestionando sprints ágiles: Jira, Confluence y refinamiento del backlog
- Mentalidad basada en datos: SQL, Google Analytics, Mixpanel o Amplitude
- Excelente gestión de stakeholders y comunicación
- Historial demostrado lanzando funcionalidades desde la idea hasta el lanzamiento
- Experiencia redactando PRD, historias de usuario y criterios de aceptación
- Conocimiento de principios de diseño UX y trabajo con Figma

Se valorará:
- Experiencia en fintech, marketplaces o SaaS
- Pruebas A/B y experimentación
- Experiencia con OKR y crecimiento impulsado por el producto

Únete a un equipo ágil donde las decisiones de producto tienen un impacto real.` },
  { id: "DevOps Engineer", label: "Ingeniero DevOps", emoji: "⚙️", desc: "Kubernetes, Terraform, AWS, CI/CD, Docker, Linux, monitorización, seguridad", text: `Ingeniero/a DevOps — Málaga (Admite teletrabajo)

Buscamos un/a Ingeniero/a DevOps que se responsabilice de nuestra infraestructura, los pipelines de despliegue y las operaciones en la nube.

Requisitos:
- Al menos 3 años de experiencia en DevOps o ingeniería de plataforma
- Amplia experiencia con Kubernetes (preferiblemente EKS o GKE) y Helm
- Sólidos conocimientos de Terraform para infraestructura como código
- Infraestructura cloud en AWS o GCP: VPC, IAM, S3, RDS, Lambda
- Contenerización con Docker y optimización de imágenes
- Pipelines de CI/CD: GitHub Actions, ArgoCD o Jenkins
- Administración de sistemas Linux y shell scripting (Bash)
- Monitorización y observabilidad: Prometheus, Grafana, Datadog o similares
- Buenas prácticas de seguridad: gestión de secretos (Vault, AWS Secrets Manager), políticas de red

Se valorará:
- Experiencia con service mesh (Istio, Linkerd)
- Despliegues multirregión
- Python o Go para automatización

Trabajamos íntegramente en AWS con un clúster de Kubernetes de gran tamaño.` },
];

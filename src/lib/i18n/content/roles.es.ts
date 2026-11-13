import type { RoleGuide } from "@/lib/roles";

export const ROLES: RoleGuide[] = [
  {
    slug: "ai-engineer",
    name: "Ingeniero de IA",
    alsoCalled: ["AI Engineer", "Ingeniero de IA generativa", "LLM Engineer", "Ingeniero de inteligencia artificial"],
    metaDescription:
      "Palabras clave para el CV de ingeniero de IA: LLM, RAG, embeddings, bases de datos vectoriales y evals. Compara tu CV con cualquier oferta, gratis.",
    intro:
      "Ingeniero de IA es el puesto que más rápido crece en el sector tecnológico, y sus ofertas son inusualmente concretas: qué API de modelos, qué stack de recuperación, cómo evalúas la calidad y cómo lo llevas a producción. Los responsables de contratación buscan pruebas de que has llevado una funcionalidad basada en LLM del prototipo a producción, no solo de que has llamado a una API desde un notebook.",
    groups: [
      { title: "LLM y frameworks", keywords: ["LLM", "Modelos de lenguaje", "OpenAI API", "Anthropic API", "LangChain", "LlamaIndex", "Prompt engineering", "Function calling", "Agentes de IA"] },
      { title: "Recuperación (RAG)", keywords: ["RAG", "Embeddings", "Base de datos vectorial", "pgvector", "Pinecone", "Weaviate", "Búsqueda semántica", "Chunking"] },
      { title: "Calidad y despliegue", keywords: ["Evals", "Evaluación de LLM", "Fine-tuning", "Hugging Face", "Despliegue de modelos", "MLOps", "MLflow", "Guardrails"] },
      { title: "Base de ingeniería", keywords: ["Python", "FastAPI", "TypeScript", "Docker", "AWS", "SQL", "CI/CD", "Git"] },
    ],
    tips: [
      { title: "Muestra una funcionalidad con LLM en producción, de principio a fin", text: "«Desarrollé un asistente RAG sobre 40.000 artículos de soporte que atiende 3.000 consultas al día» demuestra más que una lista de frameworks. Nombra el modelo, el stack de recuperación y la escala." },
      { title: "Pon cifras a la calidad, la latencia y el coste", text: "Los equipos de IA viven de las evals. «Subí la precisión de las respuestas del 71 % al 89 % en un conjunto de evaluación de 500 preguntas y reduje un 40 % el coste por consulta» es justo lo que busca un responsable de contratación." },
      { title: "Mantén visible la ingeniería de software", text: "La mayoría de los puestos de ingeniero de IA son, ante todo, puestos de ingeniería. Las API, las pruebas, el CI/CD y el despliegue en la nube deben aparecer en el CV junto al trabajo con LLM." },
    ],
    faqs: [
      { q: "¿Qué palabras clave debe incluir el CV de un ingeniero de IA?", a: "Las API de modelos y los frameworks que has usado (las API de OpenAI o Anthropic, LangChain, LlamaIndex), términos de recuperación (RAG, embeddings, una base de datos vectorial como pgvector o Pinecone), términos de calidad y despliegue (evals, fine-tuning, MLOps, despliegue de modelos) y la base de ingeniería: Python, FastAPI, Docker, nube y CI/CD." },
      { q: "¿En qué se diferencia el CV de un ingeniero de IA del de un ingeniero de machine learning?", a: "El CV de un ingeniero de machine learning gira en torno al entrenamiento de modelos: feature engineering, PyTorch o TensorFlow, rendimiento del modelo. El de un ingeniero de IA gira en torno a crear productos sobre grandes modelos de lenguaje: prompting, RAG, evals, agentes y funcionalidades con LLM que llegan a los usuarios." },
    ],
  },
  {
    slug: "frontend-developer",
    name: "Desarrollador Frontend",
    alsoCalled: ["Frontend Developer", "Programador Frontend", "Desarrollador React", "Desarrollador web front-end"],
    metaDescription:
      "Palabras clave para el CV de desarrollador frontend: React, TypeScript, Next.js, testing y accesibilidad. Compara tu CV con cualquier oferta, gratis.",
    intro:
      "Las ofertas de frontend están muy cargadas de palabras clave: suelen nombrar de forma explícita un framework, un lenguaje, una forma de trabajar los estilos, un stack de pruebas y un proceso de entrega. Los reclutadores y el software de filtrado buscan esos mismos términos en tu CV, así que nombrar las herramientas que de verdad has usado, con las palabras de la oferta, importa aquí más que en casi cualquier otro puesto.",
    groups: [
      { title: "Lenguajes y frameworks principales", keywords: ["JavaScript", "TypeScript", "React", "Next.js", "Vue", "Angular", "HTML5", "CSS3"] },
      { title: "Estilos e interfaz", keywords: ["Tailwind CSS", "Sass", "CSS Modules", "Diseño responsive", "Sistemas de diseño", "Storybook", "Figma"] },
      { title: "Estado y datos", keywords: ["Redux", "Zustand", "React Query", "API REST", "GraphQL", "WebSockets"] },
      { title: "Calidad y entrega", keywords: ["Jest", "Cypress", "Playwright", "React Testing Library", "Pruebas unitarias", "Accesibilidad (WCAG)", "Core Web Vitals", "Git", "CI/CD", "GitHub Actions", "Agile / Scrum"] },
    ],
    tips: [
      { title: "Nombra el framework junto al resultado", text: "«Rehíce el checkout en React y TypeScript y reduje el tiempo de carga un 40 %» aporta la palabra clave y la prueba. Una lista de habilidades sin más solo aporta la palabra clave." },
      { title: "Escribe los nombres igual que la oferta", text: "Si la oferta dice «Next.js» y «Tailwind CSS», escribe exactamente eso, no «NextJS» ni «Tailwind». Los filtros sencillos comparan cadenas de texto literales." },
      { title: "No te saltes los términos menos vistosos", text: "La accesibilidad, las pruebas y el CI/CD aparecen en la mayoría de las ofertas de frontend y faltan en la mayoría de los CV de frontend. Si lo has hecho, dilo." },
    ],
    faqs: [
      { q: "¿Qué palabras clave debe incluir el CV de un desarrollador frontend?", a: "Empieza por el stack que nombra la oferta, normalmente JavaScript, TypeScript y React u otro framework. Añade después estilos (Tailwind CSS, Sass), datos (API REST, GraphQL), pruebas (Jest, Cypress, Playwright) y términos de entrega (Git, CI/CD, Agile). Incluye solo las herramientas que hayas usado de verdad." },
      { q: "¿Cuántas palabras clave debe tener el CV de un desarrollador frontend?", a: "No hay un número ideal. Cubre las habilidades que esa oferta concreta repite o pone en el título, cada una respaldada por una línea de experiencia real. Un CV ajustado a una oferta vale más que uno relleno con todos los frameworks." },
    ],
  },
  {
    slug: "backend-engineer",
    name: "Desarrollador Backend",
    alsoCalled: ["Backend Developer", "Ingeniero Backend", "Programador Backend", "Desarrollador de API"],
    metaDescription:
      "Palabras clave para el CV de desarrollador backend: lenguajes, bases de datos, nube, contenedores y diseño de API. Compara tu CV con cualquier oferta.",
    intro:
      "Las ofertas de backend describen un sistema tanto como a una persona: un lenguaje, una base de datos, un proveedor de nube, un modelo de despliegue. Tu CV se lee con esa imagen delante. Los mejores CV de backend nombran cada capa del stack en la que han trabajado y le asocian una cifra de escala o de fiabilidad.",
    groups: [
      { title: "Lenguajes y frameworks", keywords: ["Python", "Node.js", "Java", "Go", "C#", "Django", "FastAPI", "Express", "Spring Boot"] },
      { title: "Datos y almacenamiento", keywords: ["SQL", "PostgreSQL", "MySQL", "MongoDB", "Redis", "Kafka", "Elasticsearch", "Modelado de datos"] },
      { title: "Nube e infraestructura", keywords: ["AWS", "Azure", "Google Cloud", "Docker", "Kubernetes", "Terraform", "Serverless", "CI/CD"] },
      { title: "Arquitectura y buenas prácticas", keywords: ["API REST", "GraphQL", "gRPC", "Microservicios", "Arquitectura orientada a eventos", "Autenticación (OAuth, JWT)", "Pruebas unitarias y de integración", "Observabilidad", "Escalabilidad"] },
    ],
    tips: [
      { title: "Pon una cifra a la escala", text: "Peticiones por segundo, filas, latencia, disponibilidad. «Diseñé un esquema de PostgreSQL que atiende 2 millones de consultas diarias» le dice mucho más al lector que «trabajé con PostgreSQL»." },
      { title: "Nombra los servicios de la nube, no solo la nube", text: "Las ofertas que piden AWS suelen mencionar también servicios concretos. Si has usado Lambda, S3 o RDS, inclúyelos junto a «AWS»." },
      { title: "Demuestra que te has hecho cargo de todo el ciclo", text: "Diseñar, desarrollar, desplegar, monitorizar. Las ofertas de backend piden cada vez más experiencia con guardias y observabilidad: inclúyela si la tienes." },
    ],
    faqs: [
      { q: "¿Qué palabras clave debe incluir el CV de un desarrollador backend?", a: "El lenguaje y el framework de la oferta (por ejemplo, Python con Django o FastAPI, o Node.js), las bases de datos que has usado (PostgreSQL, Redis, MongoDB), tu experiencia con nube y contenedores (AWS, Docker, Kubernetes) y términos de arquitectura como API REST, microservicios y pruebas." },
      { q: "¿Debo incluir todos los lenguajes de programación que conozco?", a: "No. Empieza por los lenguajes que pide la oferta y sobre los que podrías pasar una entrevista mañana mismo. Una larga cola de lenguajes que tocaste una vez resta peso a los que importan." },
    ],
  },
  {
    slug: "machine-learning-engineer",
    name: "Ingeniero de Machine Learning",
    alsoCalled: ["Machine Learning Engineer", "ML Engineer", "Ingeniero MLOps", "Ingeniero de aprendizaje automático"],
    metaDescription:
      "Palabras clave para el CV de ingeniero de machine learning: Python, PyTorch, entrenamiento de modelos, MLOps y despliegue. Compara tu CV gratis.",
    intro:
      "Las ofertas de ingeniero de machine learning están a medio camino entre la ciencia de datos y la ingeniería de software: quieren modelos bien entrenados que funcionen de forma fiable en producción. Los CV que solo muestran notebooks, o solo infraestructura, se dejan la mitad de lo que se evalúa. Los mejores muestran el ciclo completo: datos, entrenamiento, evaluación, despliegue y monitorización.",
    groups: [
      { title: "Modelado", keywords: ["Machine learning", "Aprendizaje automático", "Deep learning", "PyTorch", "TensorFlow", "scikit-learn", "Feature engineering", "Evaluación de modelos"] },
      { title: "Datos", keywords: ["Python", "SQL", "Pandas", "Spark", "Pipelines de datos", "Airflow", "Feature store"] },
      { title: "MLOps y despliegue", keywords: ["MLOps", "Despliegue de modelos", "Model serving", "MLflow", "Kubeflow", "SageMaker", "Vertex AI", "Monitorización de modelos"] },
      { title: "Ingeniería", keywords: ["Docker", "Kubernetes", "AWS", "CI/CD", "API REST", "Git", "Pruebas unitarias"] },
    ],
    tips: [
      { title: "Muestra un modelo en producción, con una métrica", text: "«Desplegué un modelo de ranking que sirve 5 millones de predicciones al día y mejoró el CTR un 8 %» cubre modelado, escala e impacto en una sola línea." },
      { title: "Nombra tu stack de MLOps", text: "Las herramientas de seguimiento de experimentos, registro de modelos, serving y monitorización aparecen de forma explícita en la mayoría de las ofertas. MLflow, SageMaker o Vertex AI son coincidencias de palabra clave muy sencillas." },
      { title: "No escondas la ingeniería de software", text: "Las pruebas, el CI/CD, los contenedores y las API son lo que distingue a un ingeniero de ML de un data scientist en la criba." },
    ],
    faqs: [
      { q: "¿Qué palabras clave debe incluir el CV de un ingeniero de machine learning?", a: "Python y un framework de deep learning (PyTorch o TensorFlow), scikit-learn y feature engineering, herramientas de datos como SQL y Spark, términos de MLOps y despliegue (MLflow, model serving, monitorización, SageMaker o Vertex AI) y la base de ingeniería: Docker, Kubernetes y CI/CD." },
      { q: "¿En qué se diferencia el CV de un ingeniero de ML del de un data scientist?", a: "El CV de un data scientist pone el acento en el análisis, la estadística y la experimentación. El de un ingeniero de ML, en construir, desplegar y operar modelos en producción: pipelines, serving, monitorización y prácticas de ingeniería de software." },
    ],
  },
  {
    slug: "software-engineer",
    name: "Ingeniero de Software",
    alsoCalled: ["Software Engineer", "Desarrollador de software", "Desarrollador Full Stack", "Programador"],
    metaDescription:
      "Palabras clave para el CV de ingeniero de software: lenguajes, frameworks, nube, pruebas y diseño de sistemas. Compara tu CV con cualquier oferta.",
    intro:
      "«Ingeniero de software» es el título más amplio del sector tecnológico, así que es la propia oferta la que define el puesto: para una empresa significa backend en Java, para otra full stack en TypeScript y para otra C++ embebido. Aquí los CV genéricos lo tienen difícil. Las palabras clave que cuentan son el lenguaje, el framework y la plataforma concretos de la oferta, además de las prácticas de ingeniería que valora cualquier equipo de software.",
    groups: [
      { title: "Lenguajes", keywords: ["Java", "Python", "TypeScript", "JavaScript", "C#", "Go", "C++", "Kotlin"] },
      { title: "Frameworks y plataformas", keywords: ["React", "Node.js", "Spring Boot", ".NET", "Django", "API REST", "GraphQL", "Microservicios"] },
      { title: "Datos y nube", keywords: ["SQL", "PostgreSQL", "MongoDB", "Redis", "AWS", "Azure", "Docker", "Kubernetes"] },
      { title: "Prácticas de ingeniería", keywords: ["Diseño de sistemas", "Estructuras de datos y algoritmos", "Pruebas unitarias", "Code review", "CI/CD", "Git", "Control de versiones", "Agile / Scrum", "Clean code"] },
    ],
    tips: [
      { title: "Empieza por el lenguaje principal de la oferta", text: "Si el puesto es de Java, Java debe estar en tu resumen y en tu empleo más reciente, no a media lista de habilidades. Los reclutadores suelen filtrar por el primer lenguaje que leen." },
      { title: "Muestra el alcance, no solo el stack", text: "«Diseñé el servicio de pagos que gestiona 3 millones de transacciones al mes» indica capacidad de diseño de sistemas. Tanto quien entrevista como quien criba busca pruebas de que has construido algo de principio a fin." },
      { title: "Nombra las prácticas", text: "El code review, las pruebas, el CI/CD y las guardias aparecen en la mayoría de las ofertas de ingeniería de software. Una línea concreta sobre cada una vale más que enumerarlas en una lista." },
    ],
    faqs: [
      { q: "¿Qué palabras clave debe incluir el CV de un ingeniero de software?", a: "El lenguaje y el framework que nombra la oferta (por ejemplo, Java con Spring Boot, o TypeScript con React y Node.js), las bases de datos y la plataforma de nube que has usado, y prácticas de ingeniería como diseño de sistemas, pruebas unitarias, code review, CI/CD y Git." },
      { q: "¿Debe aparecer «estructuras de datos y algoritmos» en el CV de un ingeniero de software?", a: "Rara vez como palabra clave suelta. Demuéstralo con tu trabajo: mejoras de rendimiento, problemas de escalado que resolviste. Deja las preguntas de algoritmos para la entrevista." },
    ],
  },
  {
    slug: "data-scientist",
    name: "Data Scientist",
    alsoCalled: ["Científico de datos", "Machine Learning Engineer", "Applied Scientist", "Especialista en ciencia de datos"],
    metaDescription:
      "Palabras clave para el CV de data scientist: Python, machine learning, estadística, SQL y despliegue. Compara tu CV con cualquier oferta, gratis.",
    intro:
      "Las ofertas de data scientist evalúan dos cosas a la vez: la profundidad en modelado (estadística, machine learning, experimentación) y la ingeniería necesaria para que un modelo llegue a usarse (SQL, pipelines, despliegue). Los CV cargados de algoritmos que no dicen nada del impacto en el negocio ni del uso en producción son los que se quedan atascados en la criba.",
    groups: [
      { title: "Lenguajes y librerías", keywords: ["Python", "R", "SQL", "Pandas", "NumPy", "scikit-learn", "PyTorch", "TensorFlow"] },
      { title: "Modelado y estadística", keywords: ["Machine learning", "Aprendizaje automático", "Estadística", "Regresión", "Clasificación", "Series temporales", "Tests A/B", "Inferencia causal", "Feature engineering"] },
      { title: "Datos y despliegue", keywords: ["Spark", "BigQuery", "Snowflake", "Airflow", "MLflow", "Docker", "AWS SageMaker", "Despliegue de modelos"] },
      { title: "IA y comunicación", keywords: ["NLP", "LLM", "Deep learning", "Visualización de datos", "Comunicación con stakeholders", "Diseño de experimentos"] },
    ],
    tips: [
      { title: "Vincula cada modelo a una métrica que cambió", text: "«Desarrollé un modelo de churn que redujo las bajas un 12 %» es lo que se busca en la criba. La precisión del modelo, por sí sola, no le dice al lector que el trabajo importó." },
      { title: "Demuestra que llegó a producción", text: "Menciona el despliegue, la monitorización o el pipeline que sirve las predicciones. Muchas ofertas separan a quienes solo trabajan en notebooks de quienes ponen modelos en producción." },
      { title: "Ajústate al tipo de oferta", text: "Los puestos centrados en experimentación piden tests A/B e inferencia causal; los de ingeniería de ML, despliegue y MLOps. Inclina tu CV hacia el que tienes delante." },
    ],
    faqs: [
      { q: "¿Qué palabras clave debe incluir el CV de un data scientist?", a: "Primero Python y SQL; después las librerías que usas (Pandas, scikit-learn, PyTorch o TensorFlow), términos de modelado y estadística (machine learning, regresión, tests A/B, forecasting) y las herramientas de datos o de despliegue que nombre la oferta, como Spark, Airflow o MLflow." },
      { q: "¿En qué se diferencian las palabras clave de data scientist y de analista de datos?", a: "Las ofertas de analista giran en torno a SQL, dashboards y herramientas de BI como Tableau o Power BI. Las de data scientist añaden machine learning, estadística, librerías de Python y despliegue de modelos." },
    ],
  },
  {
    slug: "account-executive",
    name: "Ejecutivo de Cuentas",
    alsoCalled: ["Account Executive", "Ejecutivo comercial", "Comercial B2B", "Ejecutivo de ventas SaaS"],
    metaDescription:
      "Palabras clave para el CV de ejecutivo de cuentas: cuota, pipeline, Salesforce, prospección y ventas B2B SaaS. Compara tu CV con cualquier oferta.",
    intro:
      "Las ofertas de ventas se leen como un marcador: cuota, tamaño de las operaciones, ciclo de venta, CRM. Los reclutadores buscan lo mismo en los CV de ejecutivo de cuentas, y deprisa: un CV que describe funciones en lugar de cifras, o que nunca nombra el CRM, rara vez pasa a la lista de finalistas aunque la experiencia sea sólida.",
    groups: [
      { title: "Proceso de venta", keywords: ["Ventas B2B", "Ventas SaaS", "Ciclo de venta completo", "Prospección", "Llamadas en frío", "Generación de leads", "Outbound", "Cierre de ventas"] },
      { title: "Resultados y métricas", keywords: ["Cumplimiento de cuota", "Gestión del pipeline", "Ticket medio (ACV)", "Tasa de cierre", "Forecast de ventas", "Crecimiento de ingresos", "Upselling", "Renovaciones"] },
      { title: "Herramientas", keywords: ["Salesforce", "HubSpot", "CRM", "LinkedIn Sales Navigator", "Gong", "Outreach", "Excel"] },
      { title: "Habilidades y metodologías", keywords: ["Negociación", "Gestión de cuentas", "Desarrollo de negocio", "Reuniones de descubrimiento", "MEDDIC", "Venta consultiva", "Gestión de stakeholders"] },
    ],
    tips: [
      { title: "Abre cada puesto con el cumplimiento de cuota", text: "«Cerré 1,2 M€ frente a una cuota de 900.000 € (133 %)» es lo primero que busca un director comercial. Ponlo en la primera viñeta de cada empleo, no escondido al final." },
      { title: "Indica el tamaño de las operaciones y la duración del ciclo", text: "Los puestos de mid-market y enterprise contratan por las operaciones que de verdad has llevado. El valor medio de contrato y la duración del ciclo le dicen al lector al instante si encajas." },
      { title: "Nombra el CRM y la metodología", text: "Salesforce o HubSpot aparecen en la mayoría de las ofertas, y muchas nombran una metodología de cualificación como MEDDIC. Si los usas, escríbelos." },
    ],
    faqs: [
      { q: "¿Qué palabras clave debe incluir el CV de un ejecutivo de cuentas?", a: "Ventas B2B o SaaS, cumplimiento de cuota, gestión del pipeline, prospección y cierre de ventas, el CRM que usas (normalmente Salesforce o HubSpot), negociación y gestión de cuentas, cada una respaldada por una cifra como los ingresos cerrados o el porcentaje de cuota." },
      { q: "¿Cómo muestro mis resultados de ventas en el CV?", a: "Usa las mismas métricas que seguía tu responsable: porcentaje de cuota, ingresos cerrados, tamaño medio de las operaciones, tasa de cierre y posición en el ranking del equipo. Una cifra concreta por puesto vale más que una lista de responsabilidades." },
    ],
  },
  {
    slug: "digital-marketing-specialist",
    name: "Especialista en Marketing Digital",
    alsoCalled: ["Digital Marketing Manager", "Técnico de marketing digital", "Performance Marketing Specialist", "Analista de marketing digital"],
    metaDescription:
      "Palabras clave para el CV de marketing digital: SEO, Google Ads, contenidos, email, analítica y automatización. Compara tu CV con cualquier oferta.",
    intro:
      "Las ofertas de marketing digital nombran de forma explícita canales y herramientas: SEO, búsqueda de pago, redes sociales, email, y el stack de analítica y automatización que hay detrás. Los CV generalistas que dicen «gestioné campañas» sin nombrar el canal, el presupuesto ni el resultado son los que se pasan por alto.",
    groups: [
      { title: "Canales", keywords: ["SEO", "SEM / PPC", "Google Ads", "Meta Ads", "Marketing de contenidos", "Email marketing", "Marketing en redes sociales", "Marketing de afiliación"] },
      { title: "Analítica y pruebas", keywords: ["Google Analytics (GA4)", "Google Tag Manager", "Tests A/B", "Optimización de la conversión (CRO)", "Atribución", "Reporting de KPI", "Looker Studio"] },
      { title: "Herramientas y automatización", keywords: ["HubSpot", "Automatización de marketing", "Mailchimp", "Klaviyo", "Semrush", "Ahrefs", "CMS (WordPress)", "Canva"] },
      { title: "Estrategia", keywords: ["Gestión de campañas", "Gestión de presupuesto", "Captación de clientes", "Optimización del embudo", "Marketing de marca", "Copywriting", "Growth marketing"] },
    ],
    tips: [
      { title: "Pon una cifra a cada canal", text: "«Aumenté el tráfico orgánico un 180 % en 9 meses» o «Reduje el coste por lead de 42 € a 19 € en Google Ads»: canal, métrica y plazo en una sola línea." },
      { title: "Menciona el presupuesto que gestionaste", text: "En los puestos de medios de pago se contrata por nivel de inversión. «Gestioné 25.000 € al mes entre Google y Meta» te sitúa de inmediato." },
      { title: "Incluye el stack que usa la oferta", text: "GA4, Tag Manager, HubSpot, Semrush: los nombres de herramientas son coincidencias de palabra clave sencillas y los reclutadores filtran por ellos." },
    ],
    faqs: [
      { q: "¿Qué palabras clave debe incluir el CV de un especialista en marketing digital?", a: "Los canales en los que trabajas (SEO, Google Ads, Meta Ads, email, contenidos, redes sociales), las herramientas de analítica (GA4, Google Tag Manager), herramientas de automatización y CRM como HubSpot, y términos de resultado como optimización de la conversión, captación de clientes y gestión de presupuesto." },
      { q: "¿Debe incluir métricas un CV de marketing?", a: "Sí. El tráfico, la tasa de conversión, el coste por adquisición, el retorno de la inversión publicitaria y los ingresos atribuidos son lo que usan los responsables de contratación para comparar candidatos. Incluye al menos una por puesto." },
    ],
  },
  {
    slug: "financial-analyst",
    name: "Analista Financiero",
    alsoCalled: ["Analista FP&A", "Finance Business Partner", "Analista de planeación financiera", "Controller financiero"],
    metaDescription:
      "Palabras clave para el CV de analista financiero: modelización financiera, FP&A, presupuestos, forecasting, Excel y Power BI. Compara tu CV gratis.",
    intro:
      "Las ofertas de analista financiero se construyen en torno a un ciclo (presupuesto, previsión, cierre, reporting) y a las herramientas con las que se gestiona. Los reclutadores buscan esas mismas palabras en tu CV, junto con pruebas de que tus números cambiaron una decisión. Un CV que pone «Excel» sin decir qué se modelizó, ni para quién, rara vez destaca.",
    groups: [
      { title: "Planificación y análisis", keywords: ["FP&A", "Modelización financiera", "Elaboración de presupuestos", "Forecasting", "Análisis de desviaciones", "Análisis de escenarios", "Business cases"] },
      { title: "Reporting y contabilidad", keywords: ["Reporting de gestión", "Cierre mensual", "Conciliaciones", "NIIF", "GAAP", "Cuenta de resultados (P&L)", "Flujo de caja"] },
      { title: "Herramientas", keywords: ["Excel (tablas dinámicas, fórmulas avanzadas)", "Power BI", "SQL", "SAP", "Oracle NetSuite", "Anaplan"] },
      { title: "Habilidades", keywords: ["Gestión de stakeholders", "Análisis financiero", "Data storytelling", "Reporting de KPI", "Control de costes", "Mejora de procesos"] },
    ],
    tips: [
      { title: "Muestra la decisión que impulsó tu análisis", text: "«Elaboré el modelo de precios que respaldó una subida del 6 % valorada en 1,8 M€» dice mucho más que «responsable de modelos financieros»." },
      { title: "Nombra el ciclo del que te hiciste cargo", text: "Presupuesto anual, rolling forecast, cierre mensual: di cuáles llevaste tú y para un negocio de qué tamaño (ingresos, centros de coste, sociedades)." },
      { title: "Sé concreto con Excel y el BI", text: "«Excel» está en todos los CV de finanzas. Indica el nivel (modelos financieros, tablas dinámicas, Power Query) y la herramienta de BI que nombra la oferta, como Power BI." },
    ],
    faqs: [
      { q: "¿Qué palabras clave debe incluir el CV de un analista financiero?", a: "FP&A, modelización financiera, elaboración de presupuestos, forecasting y análisis de desviaciones; términos de reporting como reporting de gestión, cierre mensual y NIIF o GAAP; y las herramientas que nombra la oferta: casi siempre Excel, a menudo Power BI, SQL o un ERP como SAP." },
      { q: "¿Cómo muestro mi impacto en un CV de finanzas?", a: "Vincula tu trabajo a dinero o a decisiones: ahorros identificados, mejora de la precisión de las previsiones, un presupuesto del que fuiste responsable, un business case que se aprobó. Con una cifra concreta por puesto basta." },
    ],
  },
  {
    slug: "project-manager",
    name: "Project Manager",
    alsoCalled: ["Jefe de proyecto", "Gerente de proyectos", "Director de proyectos", "IT Project Manager"],
    metaDescription:
      "Palabras clave para el CV de project manager: planificación, gestión de riesgos, stakeholders, Agile, PMP y presupuestos. Compara tu CV gratis.",
    intro:
      "Las ofertas de project manager evalúan tres cosas: las metodologías que usas, el tamaño de lo que has entregado y cómo gestionas a las personas y el riesgo. Los reclutadores buscan los nombres de las metodologías (Agile, Scrum, PRINCE2, PMP) y cifras (presupuesto, tamaño del equipo, plazos) que muestren la escala que puedes asumir.",
    groups: [
      { title: "Metodologías y certificaciones", keywords: ["Gestión de proyectos", "Agile", "Scrum", "Waterfall", "PRINCE2", "PMP", "Kanban"] },
      { title: "Entrega", keywords: ["Planificación de proyectos", "Gestión del alcance", "Gestión de riesgos", "Gestión de presupuesto", "Planificación de recursos", "Hitos", "Gestión del cambio"] },
      { title: "Personas", keywords: ["Gestión de stakeholders", "Equipos multidisciplinares", "Gestión de proveedores", "Comunicación", "Informes de seguimiento", "Comité de dirección"] },
      { title: "Herramientas", keywords: ["Jira", "Confluence", "MS Project", "Asana", "Smartsheet", "Excel"] },
    ],
    tips: [
      { title: "Empieza por la escala y el resultado", text: "«Entregué la implantación de un ERP de 2 M€ en 4 países, en plazo y un 6 % por debajo del presupuesto» le dice a un responsable de contratación exactamente qué puedes asumir." },
      { title: "Nombra la metodología y la certificación", text: "PRINCE2, PMP, Scrum Master: si tienes alguna, ponla cerca del principio. Muchas ofertas filtran por ellas." },
      { title: "Muestra cómo gestionaste el riesgo", text: "Una línea sobre un riesgo que detectaste a tiempo y la medida que tomaste indica más seniority que una lista de herramientas." },
    ],
    faqs: [
      { q: "¿Qué palabras clave debe incluir el CV de un project manager?", a: "Gestión de proyectos, las metodologías que usas (Agile, Scrum, Waterfall, PRINCE2), certificaciones como PMP, términos de entrega (planificación, gestión del alcance, de riesgos y de presupuesto), habilidades con personas (gestión de stakeholders y de proveedores) y las herramientas con las que llevas los proyectos, normalmente Jira, Confluence o MS Project." },
      { q: "¿Qué queda mejor en el CV, PMP o PRINCE2?", a: "La que nombre la oferta. PRINCE2 es más habitual en el Reino Unido y Europa, y PMP en Estados Unidos y en empresas globales; ambas están valoradas, y poner la que pide la empresa es una coincidencia directa de palabra clave." },
    ],
  },
  {
    slug: "recruiter",
    name: "Reclutador",
    alsoCalled: ["Técnico de selección", "Talent Acquisition Specialist", "IT Recruiter", "Especialista en atracción de talento"],
    metaDescription:
      "Palabras clave para el CV de reclutador: sourcing, ciclo completo de selección, ATS, stakeholders y time to hire. Compara tu CV con cualquier oferta.",
    intro:
      "Los reclutadores redactan ofertas todo el día y, sin embargo, sus propios CV suelen ser los más vagos del montón. Los puestos de captación de talento se evalúan por el volumen de contratación que has gestionado, los perfiles que seleccionas, las herramientas con las que buscas candidatos y las métricas con las que te medían.",
    groups: [
      { title: "Selección", keywords: ["Reclutamiento y selección", "Ciclo completo de selección", "Sourcing", "Headhunting", "Selección de perfiles IT", "Criba curricular", "Entrevistas", "Negociación de ofertas"] },
      { title: "Herramientas", keywords: ["Sistema de seguimiento de candidatos (ATS)", "Greenhouse", "Workday", "LinkedIn Recruiter", "Búsqueda booleana", "Lever", "Excel"] },
      { title: "Métricas", keywords: ["Time to hire", "Coste por contratación", "Tasa de aceptación de ofertas", "Reporting del pipeline", "Calidad de la contratación", "Objetivos de contratación"] },
      { title: "Colaboración con el negocio", keywords: ["Gestión de stakeholders", "Captación de talento", "Colaboración con hiring managers", "Marca empleadora", "Experiencia del candidato", "Diversidad e inclusión", "Onboarding"] },
    ],
    tips: [
      { title: "Pon cifras a tus contrataciones", text: "«Contraté a 45 ingenieros en 12 meses con una tasa de aceptación de ofertas del 92 %» es, para un reclutador, el equivalente a una cuota de ventas: ponlo lo primero." },
      { title: "Di qué perfiles seleccionas", text: "Tecnología, ventas, directivos, selección masiva: las ofertas suelen estar especializadas, y tu resumen también debería estarlo." },
      { title: "Incluye el ATS y las herramientas de sourcing", text: "Greenhouse, Workday, LinkedIn Recruiter y la búsqueda booleana son coincidencias directas de palabra clave en las ofertas de captación de talento." },
    ],
    faqs: [
      { q: "¿Qué palabras clave debe incluir el CV de un reclutador?", a: "Ciclo completo de selección, sourcing y los perfiles que contratas; el sistema de seguimiento de candidatos y las herramientas de sourcing que usas (Greenhouse, Workday, LinkedIn Recruiter, búsqueda booleana); métricas como el time to hire y la tasa de aceptación de ofertas; y términos de colaboración como gestión de stakeholders y marca empleadora." },
      { q: "¿Cómo debe mostrar sus resultados un reclutador en el CV?", a: "Con cifras de contratación: vacantes cubiertas, time to hire, tasa de aceptación de ofertas, coste por contratación u objetivos de contratación cumplidos. Son las métricas por las que te juzgará tu próximo responsable." },
    ],
  },
  {
    slug: "customer-success-manager",
    name: "Customer Success Manager",
    alsoCalled: ["Account Manager", "Gestor de éxito del cliente", "Responsable de Customer Success", "Key Account Manager"],
    metaDescription:
      "Palabras clave para el CV de customer success manager: retención, churn, onboarding, renovaciones, upselling y CRM. Compara tu CV con cualquier oferta.",
    intro:
      "Las ofertas de customer success se miden en retención: churn, renovaciones, expansión y salud del cliente. Los reclutadores buscan el tamaño de la cartera que gestionaste, los procesos que llevaste (onboarding, QBR, renovaciones) y las herramientas que había detrás. Un CV de CSM sin una cifra de retención es fácil de descartar.",
    groups: [
      { title: "Retención y crecimiento", keywords: ["Retención de clientes", "Reducción del churn", "Renovaciones", "Upselling", "Ingresos por expansión", "Net revenue retention (NRR)"] },
      { title: "Ciclo de vida del cliente", keywords: ["Onboarding", "Adopción", "Revisiones trimestrales de negocio (QBR)", "Customer health score", "Gestión de escalaciones", "Customer journey"] },
      { title: "Herramientas", keywords: ["Salesforce", "HubSpot", "Gainsight", "Zendesk", "Intercom", "CRM", "Excel"] },
      { title: "Habilidades", keywords: ["Gestión de cuentas", "Gestión de stakeholders", "SaaS", "Conocimiento del producto", "Comunicación", "Negociación"] },
    ],
    tips: [
      { title: "Pon la retención lo primero", text: "«Gestioné una cartera de 3 M€ y 40 cuentas con una retención bruta del 96 % y un NRR del 118 %» es la línea que buscan los responsables de contratación." },
      { title: "Muestra los procesos que llevas", text: "Programas de onboarding, QBR, health scoring, playbooks de renovación: nómbralos junto al resultado que dieron." },
      { title: "Nombra tu stack de customer success", text: "Gainsight, Salesforce, HubSpot o Zendesk aparecen en la mayoría de las ofertas y son coincidencias de palabra clave fáciles." },
    ],
    faqs: [
      { q: "¿Qué palabras clave debe incluir el CV de un customer success manager?", a: "Retención de clientes, reducción del churn, renovaciones, upselling y NRR; términos del ciclo de vida como onboarding, adopción, QBR y health score; las herramientas que usas (Gainsight, Salesforce, HubSpot, Zendesk); y gestión de cuentas y de stakeholders." },
      { q: "¿Qué métricas deben aparecer en un CV de customer success?", a: "Retención bruta y neta de ingresos, tasa de churn, tasa de renovación, ingresos por expansión, número y valor de las cuentas gestionadas e indicadores de satisfacción del cliente como el NPS." },
    ],
  },
  {
    slug: "data-analyst",
    name: "Analista de Datos",
    alsoCalled: ["Data Analyst", "Analista de BI", "Business Analyst", "Analista de negocio"],
    metaDescription:
      "Palabras clave para el CV de analista de datos: SQL, Python, Tableau, Power BI y tests A/B. Compara tu CV con cualquier oferta de empleo, gratis.",
    intro:
      "Las ofertas de analista de datos se dividen en tres partes: cómo obtienes los datos (SQL, data warehouses), cómo los analizas (Python, estadística) y cómo los comunicas (dashboards, stakeholders). Los CV que solo cubren las herramientas y se saltan el resultado para el negocio son el motivo más frecuente por el que se descarta a analistas cualificados.",
    groups: [
      { title: "Consultas y data warehouses", keywords: ["SQL", "PostgreSQL", "BigQuery", "Snowflake", "Redshift", "ETL", "dbt", "Modelado de datos"] },
      { title: "Análisis", keywords: ["Análisis de datos", "Python", "Pandas", "NumPy", "R", "Excel", "Estadística", "Tests A/B", "Regresión", "Forecasting"] },
      { title: "Visualización y BI", keywords: ["Tableau", "Power BI", "Looker", "Dashboards", "Visualización de datos", "Reporting de KPI"] },
      { title: "Habilidades de negocio", keywords: ["Gestión de stakeholders", "Toma de requisitos", "Data storytelling", "Analítica de producto", "Calidad del dato"] },
    ],
    tips: [
      { title: "Empieza por la decisión, no por el dashboard", text: "«Creé en Tableau un dashboard de churn que llevó a un cambio de precios valorado en 300.000 €» supera a «creé dashboards en Tableau»." },
      { title: "Indica tu nivel de SQL de forma concreta", text: "Menciona funciones de ventana, CTE u optimización de consultas si las usas. «SQL» a secas no te distingue de alguien que ha escrito un único SELECT." },
      { title: "Usa el nombre exacto de la herramienta de BI", text: "Tableau, Power BI y Looker no son intercambiables para un filtro de palabras clave. Nombra la de la oferta si la has usado, y la equivalente más cercana si no." },
    ],
    faqs: [
      { q: "¿Qué palabras clave debe incluir el CV de un analista de datos?", a: "Primero SQL, que aparece en casi todas las ofertas; después las herramientas de análisis que usas (Python, Pandas, Excel, R), la herramienta de BI que nombra la oferta (Tableau, Power BI o Looker), métodos como tests A/B y estadística, y términos de negocio como gestión de stakeholders y reporting de KPI." },
      { q: "¿Necesita un analista de datos poner Python en su CV?", a: "Muchas ofertas lo piden; otras solo quieren SQL y una herramienta de BI. Revisa la oferta concreta: si Python aparece entre los requisitos, inclúyelo con un ejemplo de para qué lo usaste." },
    ],
  },
  {
    slug: "product-manager",
    name: "Product Manager",
    alsoCalled: ["Product Owner", "Gerente de producto", "Jefe de producto", "Technical Product Manager"],
    metaDescription:
      "Palabras clave para el CV de product manager: roadmap, discovery, métricas, gestión de stakeholders y Agile. Compara tu CV con cualquier oferta.",
    intro:
      "Las ofertas de product manager contienen menos nombres de herramientas y más lenguaje de proceso y de resultados, por lo que son más difíciles de cubrir por intuición. Los términos que cuentan son los que describen cómo decide el equipo qué construir, cómo lo lanza y cómo se mide el éxito. Tu CV necesita ese mismo vocabulario, acompañado de cifras.",
    groups: [
      { title: "Estrategia y discovery", keywords: ["Estrategia de producto", "Roadmap", "Hoja de ruta", "Product discovery", "Investigación de usuarios", "Entrevistas con clientes", "Análisis de mercado", "Priorización", "OKR"] },
      { title: "Entrega", keywords: ["Agile", "Scrum", "Kanban", "Gestión del backlog", "Historias de usuario", "Sprint planning", "Go-to-market", "Equipos multidisciplinares"] },
      { title: "Datos y métricas", keywords: ["KPI", "Tests A/B", "Analítica de producto", "SQL", "Conversión", "Retención", "Experimentación"] },
      { title: "Herramientas y colaboración", keywords: ["Jira", "Confluence", "Figma", "Amplitude", "Mixpanel", "Gestión de stakeholders", "Comunicación"] },
    ],
    tips: [
      { title: "Cada viñeta necesita una métrica", text: "Adopción, ingresos, retención, conversión, tiempo ahorrado. Un CV de product manager sin cifras se lee como el de un coordinador de proyectos." },
      { title: "Usa las palabras de proceso de la oferta", text: "Si la oferta dice «discovery», «OKR» y «experimentación», describe tu trabajo con esos términos allí donde se correspondan con la realidad." },
      { title: "Muestra lo que decidiste no construir", text: "La priorización es el núcleo del trabajo. Una línea sobre una renuncia que hiciste, y por qué, indica más seniority que una lista de lanzamientos." },
    ],
    faqs: [
      { q: "¿Qué palabras clave debe incluir el CV de un product manager?", a: "Roadmap, estrategia de producto, discovery, priorización, gestión de stakeholders, Agile o Scrum y las métricas de las que eras responsable (retención, conversión, ingresos). Añade las herramientas que nombre la oferta: normalmente Jira, Figma y un producto de analítica como Amplitude o Mixpanel." },
      { q: "¿Necesita un product manager palabras clave técnicas en su CV?", a: "Para puestos de product manager técnico, sí: API, SQL y términos de diseño de sistemas aparecen a menudo entre los requisitos. Para el resto, los términos de analítica y experimentación suelen pesar más que los de ingeniería." },
    ],
  },
  {
    slug: "devops-engineer",
    name: "Ingeniero DevOps",
    alsoCalled: ["DevOps Engineer", "Site Reliability Engineer (SRE)", "Platform Engineer", "Ingeniero Cloud"],
    metaDescription:
      "Palabras clave para el CV de ingeniero DevOps: Kubernetes, Terraform, AWS, CI/CD y monitorización. Compara tu CV con cualquier oferta, gratis.",
    intro:
      "Las ofertas de DevOps son las más cargadas de herramientas de toda la ingeniería, y las herramientas cambian de una empresa a otra: lo que en un equipo es Terraform y GitHub Actions en otro es Pulumi y GitLab CI. Ajustar tu CV al conjunto de herramientas concreto de la oferta, y mostrar a la vez la práctica transferible que hay debajo, es lo que consigue que lo lean.",
    groups: [
      { title: "Nube y contenedores", keywords: ["AWS", "Azure", "Google Cloud", "Docker", "Kubernetes", "Helm", "Serverless"] },
      { title: "Infraestructura como código y automatización", keywords: ["Terraform", "Ansible", "CloudFormation", "Pulumi", "Bash", "Python", "GitOps"] },
      { title: "CI/CD", keywords: ["GitHub Actions", "GitLab CI", "Jenkins", "Argo CD", "Integración continua", "Pipelines de despliegue", "Automatización de releases"] },
      { title: "Fiabilidad y seguridad", keywords: ["Linux", "Monitorización", "Prometheus", "Grafana", "Datadog", "Respuesta a incidentes", "SLO", "Redes", "Seguridad / DevSecOps"] },
    ],
    tips: [
      { title: "Pon cifras a la fiabilidad y a la velocidad", text: "Frecuencia de despliegue, lead time, disponibilidad, tiempo de recuperación, coste ahorrado. «Reduje el tiempo de despliegue de 45 a 6 minutos» es el tipo de línea que consigue entrevistas." },
      { title: "Conecta de forma explícita las herramientas equivalentes", text: "Si la oferta pide GitLab CI y tú conoces GitHub Actions, nombra la tuya y escribe también «pipelines de CI/CD» en términos generales, para que tanto un filtro como una persona vean el encaje." },
      { title: "Incluye las certificaciones que pida la oferta", text: "Las certificaciones de AWS, Azure y Kubernetes (CKA) se nombran con frecuencia entre los requisitos y son coincidencias de palabra clave fáciles si las tienes." },
    ],
    faqs: [
      { q: "¿Qué palabras clave debe incluir el CV de un ingeniero DevOps?", a: "Tu plataforma de nube (AWS, Azure o Google Cloud), Docker y Kubernetes, una herramienta de infraestructura como código como Terraform, tu sistema de CI/CD (GitHub Actions, GitLab CI o Jenkins), Linux, scripting en Bash o Python y herramientas de monitorización como Prometheus y Grafana." },
      { q: "¿DevOps y SRE son lo mismo en un CV?", a: "Las herramientas coinciden en gran parte, pero las ofertas de SRE dan más peso al lenguaje de fiabilidad: SLO, respuesta a incidentes, guardias, planificación de capacidad. Usa el vocabulario del puesto al que te presentas." },
    ],
  },
  {
    slug: "ux-designer",
    name: "Diseñador UX",
    alsoCalled: ["UX Designer", "Diseñador UX/UI", "Product Designer", "Diseñador de producto digital"],
    metaDescription:
      "Palabras clave para el CV de diseñador UX: Figma, investigación de usuarios, prototipado, tests de usabilidad y sistemas de diseño. Compara tu CV.",
    intro:
      "El portfolio de un diseñador UX enseña el trabajo, pero es el CV el que consigue que abran el portfolio. Las ofertas nombran métodos concretos (investigación, tests, prototipado) y herramientas (casi siempre Figma), y un CV que describe el mismo proceso con otras palabras puede puntuar bajo frente a ellas pese a una experiencia sólida.",
    groups: [
      { title: "Investigación", keywords: ["Investigación de usuarios", "Tests de usabilidad", "Entrevistas con usuarios", "User personas", "Customer journey map", "Encuestas", "Análisis de la competencia"] },
      { title: "Diseño", keywords: ["Experiencia de usuario", "Wireframes", "Prototipado", "Diseño de interacción", "Arquitectura de la información", "Diseño visual", "Diseño de interfaces", "Diseño responsive", "Sistema de diseño"] },
      { title: "Herramientas", keywords: ["Figma", "Sketch", "Adobe XD", "Miro", "FigJam", "Maze"] },
      { title: "Colaboración y estándares", keywords: ["Accesibilidad (WCAG)", "Design thinking", "Agile", "Handoff a desarrollo", "Gestión de stakeholders", "Tests A/B"] },
    ],
    tips: [
      { title: "Describe el resultado del diseño", text: "Tareas completadas, conversión, tickets de soporte, índices de satisfacción. «Rediseñé el onboarding y la activación pasó del 31 % al 44 %» tiene que estar en el CV, no solo en el caso de estudio." },
      { title: "Nombra tus métodos con todas las letras", text: "Escribe «tests de usabilidad» y «entrevistas con usuarios» en lugar de solo «investigación»: las ofertas los enumeran por separado, y los filtros de palabras clave también." },
      { title: "Mantén el CV en formato de texto", text: "Un PDF muy diseñado puede perder su texto al procesarse. Usa un diseño limpio de una sola columna para las candidaturas y deja que el portfolio se encargue de lo visual." },
    ],
    faqs: [
      { q: "¿Qué palabras clave debe incluir el CV de un diseñador UX?", a: "Figma, investigación de usuarios, tests de usabilidad, wireframes, prototipado, diseño de interacción y sistemas de diseño cubren la mayoría de las ofertas. Añade accesibilidad (WCAG), customer journey map y términos de colaboración como handoff a desarrollo y Agile allí donde tengas experiencia." },
      { q: "¿Debe tener un diseño visual elaborado el CV de un diseñador UX?", a: "Mejor limpio y legible que elaborado. El texto dentro de imágenes o los diseños complejos de varias columnas suelen perderse al procesar un PDF, y entonces las palabras clave nunca llegan a la búsqueda del reclutador." },
    ],
  },
  // Sanidad y logística: las listas usan las frases que reconoce el motor de puntuación
  // (LOCALIZED_SKILL_ALIASES.healthcare / .logistics en languages.ts).
  {
    slug: "registered-nurse",
    name: "Enfermero/a",
    alsoCalled: ["Enfermera", "Graduado/a en Enfermería", "DUE", "Enfermero/a de hospitalización"],
    metaDescription:
      "Palabras clave para el CV de enfermería: cuidado del paciente, historia clínica electrónica, administración de medicación y control de infecciones.",
    intro:
      "Las ofertas de enfermería se redactan en torno a un entorno y a un conjunto de funciones clínicas: la unidad, el tipo de paciente, el sistema de registro, las certificaciones. Los reclutadores de los hospitales buscan esos términos exactos en sus sistemas de candidatos, y un CV que dice «atendí a enfermos» donde la oferta dice «cuidado del paciente» y «administración de medicación» puede pasarse por alto pese a años de experiencia en planta.",
    groups: [
      { title: "Cuidados clínicos", keywords: ["Cuidado del paciente", "Atención al paciente", "Administración de medicación", "Constantes vitales", "Signos vitales", "Cura de heridas", "Planes de cuidados", "Valoración del paciente", "Terapia intravenosa", "Educación sanitaria"] },
      { title: "Registros y normativa", keywords: ["Historia clínica electrónica", "Epic", "Documentación clínica", "Protección de datos (HIPAA en EE. UU.)", "Control de infecciones", "Seguridad del paciente", "Coordinación de cuidados"] },
      { title: "Titulación y certificaciones", keywords: ["Colegiación", "Grado en Enfermería", "Soporte vital básico (SVB / BLS)", "Soporte vital avanzado (SVA / ACLS)", "Soporte vital pediátrico (PALS)", "NCLEX-RN"] },
      { title: "Entornos y trabajo en equipo", keywords: ["Cuidados agudos", "Hospitalización médico-quirúrgica", "UCI", "Urgencias", "Planificación del alta", "Equipo interdisciplinar", "Tutorización de nuevo personal", "Supervisión de enfermería"] },
    ],
    tips: [
      { title: "Indica la unidad, la ratio y el tipo de paciente", text: "«Enfermera de hospitalización médico-quirúrgica en una unidad de 32 camas, ratio 1:5» le dice a una supervisora en una línea lo que «enfermera con experiencia» no dice nunca. El entorno y la carga asistencial son lo primero que miran." },
      { title: "Escribe las certificaciones con el nombre completo y la sigla", text: "«Soporte vital básico (SVB)» coincide con una búsqueda de cualquiera de las dos formas. Añade la entidad que la emite y la fecha de caducidad: un certificado caducado es un motivo frecuente de descarte." },
      { title: "Nombra el sistema de registro", text: "Las ofertas piden a menudo una historia clínica electrónica concreta, como Epic o Cerner. Si has registrado en ella, nómbrala junto a «documentación clínica» en lugar de escribir «conocimientos de informática»." },
    ],
    faqs: [
      { q: "¿Qué palabras clave debe incluir el CV de un enfermero o una enfermera?", a: "Cuidado del paciente, administración de medicación, constantes vitales, cura de heridas, planes de cuidados y documentación clínica cubren las funciones que enumera la mayoría de las ofertas. Añade el sistema de registro que has usado (historia clínica electrónica, Epic), términos de normativa (protección de datos, control de infecciones) y tu titulación y certificaciones: colegiación, soporte vital básico y las de especialidad, como soporte vital avanzado o pediátrico." },
      { q: "¿Debe aparecer cada certificación en un CV de enfermería?", a: "Incluye las que están vigentes y las que pide la oferta, cada una con su fecha de caducidad. Pon la titulación y las certificaciones cerca del principio: en los puestos de enfermería son un requisito excluyente, no un detalle." },
    ],
  },
  {
    slug: "logistics-coordinator",
    name: "Coordinador de Logística",
    alsoCalled: ["Técnico de logística", "Coordinador de cadena de suministro", "Analista de Supply Chain", "Planificador de transporte"],
    metaDescription:
      "Palabras clave para el CV de coordinador de logística: cadena de suministro, inventario, SGA, transporte y aprovisionamiento. Compara tu CV gratis.",
    intro:
      "Las ofertas de logística y cadena de suministro se leen como un mapa de la operación: qué flujos vas a llevar (entradas, almacén, transporte), qué sistemas (un ERP, un SGA, un TMS) y con qué números te van a evaluar. Los reclutadores buscan esos mismos sistemas y esas mismas métricas en tu CV, así que nombrarlos, con una cifra de volumen o de coste, hace la mayor parte del trabajo.",
    groups: [
      { title: "Planificación e inventario", keywords: ["Gestión de la cadena de suministro", "Gestión de inventario", "Planificación de la demanda", "S&OP", "Aprovisionamiento", "Compras", "Previsión de la demanda", "Preparación de pedidos"] },
      { title: "Transporte y almacén", keywords: ["Transporte de mercancías", "Gestión de almacén", "Operador logístico (3PL)", "Gestión de flotas", "Última milla", "Planificación de rutas", "Despacho de aduanas", "Incoterms"] },
      { title: "Sistemas", keywords: ["SGA (WMS)", "SAP MM", "ERP", "TMS", "Excel", "Power BI", "EDI"] },
      { title: "Resultados y buenas prácticas", keywords: ["Entregas a tiempo (OTIF)", "Reducción de costes", "Reporting de KPI", "Gestión de proveedores", "Negociación con transportistas", "Lean", "Mejora continua"] },
    ],
    tips: [
      { title: "Pon un volumen en cada línea", text: "Envíos por semana, referencias (SKU), tamaño del almacén, gasto en transporte. «Coordiné 120 envíos de salida a la semana con 4 transportistas» muestra la escala de operación que puedes llevar." },
      { title: "Nombra el sistema, no la categoría", text: "«SAP MM» o el SGA que usaste coinciden con una oferta; «software ERP» coincide mucho menos. Añade el término genérico al lado para que encuentren los dos." },
      { title: "Muestra la métrica que mejoraste", text: "Entregas a tiempo, coste por envío, exactitud del stock, plazo de entrega. «Subí el OTIF del 91 % al 97 %» es la frase que busca un responsable de logística." },
    ],
    faqs: [
      { q: "¿Qué palabras clave debe incluir el CV de un coordinador de logística?", a: "Gestión de la cadena de suministro, gestión de inventario, transporte de mercancías, gestión de almacén y aprovisionamiento cubren la mayoría de las ofertas. Añade los sistemas que has usado (un SGA, SAP MM u otro ERP, un TMS), términos de planificación como planificación de la demanda y S&OP, y las métricas con las que te medían: entregas a tiempo, coste y exactitud del stock." },
      { q: "¿En qué se diferencia un CV de logística de uno de cadena de suministro?", a: "Las ofertas de logística giran en torno a mover y almacenar mercancías: transporte, transportistas, almacén, última milla. Las de cadena de suministro son más amplias y añaden planificación y compras: planificación de la demanda, S&OP, aprovisionamiento, gestión de proveedores. Empieza por el vocabulario del puesto al que te presentas." },
    ],
  },
];

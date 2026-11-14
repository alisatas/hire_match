import type { RoleGuide } from "@/lib/roles";

export const ROLES: RoleGuide[] = [
  {
    slug: "ai-engineer",
    name: "Engenheiro de IA",
    alsoCalled: ["AI Engineer", "Engenheiro de IA generativa", "LLM Engineer", "Engenheiro de inteligência artificial"],
    metaDescription:
      "Palavras-chave para currículo de engenheiro de IA: LLM, RAG, embeddings, bancos de dados vetoriais e evals. Compare seu currículo com qualquer vaga, grátis.",
    intro:
      "Engenheiro de IA é o cargo que mais cresce em tecnologia, e as vagas são incomumente específicas: qual API de modelo, qual stack de recuperação, como você avalia a qualidade e como coloca em produção. Os gestores procuram provas de que você levou uma funcionalidade baseada em LLM do protótipo à produção, não só de que chamou uma API em um notebook.",
    groups: [
      { title: "LLM e frameworks", keywords: ["LLM", "Modelos de linguagem", "OpenAI API", "Anthropic API", "LangChain", "LlamaIndex", "Prompt engineering", "Function calling", "Agentes de IA"] },
      { title: "Recuperação (RAG)", keywords: ["RAG", "Embeddings", "Banco de dados vetorial", "pgvector", "Pinecone", "Weaviate", "Busca semântica", "Chunking"] },
      { title: "Qualidade e implantação", keywords: ["Evals", "Avaliação de LLM", "Fine-tuning", "Hugging Face", "Implantação de modelos", "MLOps", "MLflow", "Guardrails"] },
      { title: "Base de engenharia", keywords: ["Python", "FastAPI", "TypeScript", "Docker", "AWS", "SQL", "CI/CD", "Git"] },
    ],
    tips: [
      { title: "Mostre uma funcionalidade com LLM em produção, de ponta a ponta", text: "\"Desenvolvi um assistente RAG sobre 40.000 artigos de suporte que atende 3.000 consultas por dia\" prova mais do que uma lista de frameworks. Cite o modelo, o stack de recuperação e a escala." },
      { title: "Coloque números na qualidade, na latência e no custo", text: "Times de IA vivem de evals. \"Aumentei a precisão das respostas de 71% para 89% em um conjunto de avaliação de 500 perguntas e reduzi em 40% o custo por consulta\" é exatamente o que um gestor procura." },
      { title: "Deixe a engenharia de software visível", text: "A maioria das vagas de engenheiro de IA é, antes de tudo, de engenharia. APIs, testes, CI/CD e deploy em nuvem devem aparecer no currículo junto com o trabalho com LLM." },
    ],
    faqs: [
      { q: "Quais palavras-chave o currículo de um engenheiro de IA deve ter?", a: "As APIs de modelo e os frameworks que você usou (APIs da OpenAI ou da Anthropic, LangChain, LlamaIndex), termos de recuperação (RAG, embeddings, um banco de dados vetorial como pgvector ou Pinecone), termos de qualidade e implantação (evals, fine-tuning, MLOps, implantação de modelos) e a base de engenharia: Python, FastAPI, Docker, nuvem e CI/CD." },
      { q: "Qual a diferença entre o currículo de um engenheiro de IA e o de um engenheiro de machine learning?", a: "O currículo de um engenheiro de machine learning gira em torno do treinamento de modelos: feature engineering, PyTorch ou TensorFlow, desempenho do modelo. O de um engenheiro de IA gira em torno de criar produtos sobre grandes modelos de linguagem: prompting, RAG, evals, agentes e funcionalidades com LLM que chegam aos usuários." },
    ],
  },
  {
    slug: "frontend-developer",
    name: "Desenvolvedor Frontend",
    alsoCalled: ["Frontend Developer", "Programador Frontend", "Desenvolvedor React", "Desenvolvedor web front-end"],
    metaDescription:
      "Palavras-chave para currículo de desenvolvedor frontend: React, TypeScript, Next.js, testes e acessibilidade. Compare seu currículo com qualquer vaga, grátis.",
    intro:
      "As vagas de frontend são carregadas de palavras-chave: costumam citar explicitamente um framework, uma linguagem, uma forma de estilizar, um stack de testes e um processo de entrega. Recrutadores e softwares de triagem procuram esses mesmos termos no seu currículo, então citar as ferramentas que você realmente usou, com as palavras da vaga, importa aqui mais do que em quase qualquer outro cargo.",
    groups: [
      { title: "Linguagens e frameworks principais", keywords: ["JavaScript", "TypeScript", "React", "Next.js", "Vue", "Angular", "HTML5", "CSS3"] },
      { title: "Estilos e interface", keywords: ["Tailwind CSS", "Sass", "CSS Modules", "Design responsivo", "Sistemas de design", "Storybook", "Figma"] },
      { title: "Estado e dados", keywords: ["Redux", "Zustand", "React Query", "API REST", "GraphQL", "WebSockets"] },
      { title: "Qualidade e entrega", keywords: ["Jest", "Cypress", "Playwright", "React Testing Library", "Testes unitários", "Acessibilidade (WCAG)", "Core Web Vitals", "Git", "CI/CD", "GitHub Actions", "Agile / Scrum"] },
    ],
    tips: [
      { title: "Cite o framework junto com o resultado", text: "\"Refiz o checkout em React e TypeScript e reduzi o tempo de carregamento em 40%\" traz a palavra-chave e a prova. Uma lista de habilidades sozinha traz só a palavra-chave." },
      { title: "Escreva os nomes igual à vaga", text: "Se a vaga diz \"Next.js\" e \"Tailwind CSS\", escreva exatamente isso, não \"NextJS\" nem \"Tailwind\". Filtros simples comparam o texto literal." },
      { title: "Não pule os termos menos chamativos", text: "Acessibilidade, testes e CI/CD aparecem na maioria das vagas de frontend e faltam na maioria dos currículos de frontend. Se você fez, diga." },
    ],
    faqs: [
      { q: "Quais palavras-chave o currículo de um desenvolvedor frontend deve ter?", a: "Comece pelo stack que a vaga cita, normalmente JavaScript, TypeScript e React ou outro framework. Depois adicione estilos (Tailwind CSS, Sass), dados (API REST, GraphQL), testes (Jest, Cypress, Playwright) e termos de entrega (Git, CI/CD, Agile). Inclua só as ferramentas que você realmente usou." },
      { q: "Quantas palavras-chave o currículo de um desenvolvedor frontend deve ter?", a: "Não existe um número ideal. Cubra as habilidades que aquela vaga específica repete ou coloca no título, cada uma sustentada por uma linha de experiência real. Um currículo ajustado a uma vaga vale mais do que um recheado com todos os frameworks." },
    ],
  },
  {
    slug: "backend-engineer",
    name: "Desenvolvedor Backend",
    alsoCalled: ["Backend Developer", "Engenheiro Backend", "Programador Backend", "Desenvolvedor de APIs"],
    metaDescription:
      "Palavras-chave para currículo de desenvolvedor backend: linguagens, bancos de dados, nuvem, contêineres e APIs. Compare seu currículo com qualquer vaga.",
    intro:
      "As vagas de backend descrevem um sistema tanto quanto uma pessoa: uma linguagem, um banco de dados, um provedor de nuvem, um modelo de deploy. Seu currículo é lido com essa imagem em mente. Os melhores currículos de backend citam cada camada do stack em que a pessoa trabalhou e associam a ela um número de escala ou de confiabilidade.",
    groups: [
      { title: "Linguagens e frameworks", keywords: ["Python", "Node.js", "Java", "Go", "C#", "Django", "FastAPI", "Express", "Spring Boot"] },
      { title: "Dados e armazenamento", keywords: ["SQL", "PostgreSQL", "MySQL", "MongoDB", "Redis", "Kafka", "Elasticsearch", "Modelagem de dados"] },
      { title: "Nuvem e infraestrutura", keywords: ["AWS", "Azure", "Google Cloud", "Docker", "Kubernetes", "Terraform", "Serverless", "CI/CD"] },
      { title: "Arquitetura e boas práticas", keywords: ["API REST", "GraphQL", "gRPC", "Microsserviços", "Arquitetura orientada a eventos", "Autenticação (OAuth, JWT)", "Testes unitários e de integração", "Observabilidade", "Escalabilidade"] },
    ],
    tips: [
      { title: "Coloque um número na escala", text: "Requisições por segundo, linhas, latência, disponibilidade. \"Projetei um esquema PostgreSQL que atende 2 milhões de consultas por dia\" diz muito mais ao leitor do que \"trabalhei com PostgreSQL\"." },
      { title: "Cite os serviços de nuvem, não só a nuvem", text: "As vagas que pedem AWS costumam citar também serviços específicos. Se você usou Lambda, S3 ou RDS, inclua junto com \"AWS\"." },
      { title: "Mostre que você cuidou do ciclo inteiro", text: "Projetar, desenvolver, fazer deploy, monitorar. As vagas de backend pedem cada vez mais experiência com plantões (on-call) e observabilidade: inclua se você tiver." },
    ],
    faqs: [
      { q: "Quais palavras-chave o currículo de um desenvolvedor backend deve ter?", a: "A linguagem e o framework da vaga (por exemplo, Python com Django ou FastAPI, ou Node.js), os bancos de dados que você usou (PostgreSQL, Redis, MongoDB), sua experiência com nuvem e contêineres (AWS, Docker, Kubernetes) e termos de arquitetura como API REST, microsserviços e testes." },
      { q: "Devo incluir todas as linguagens de programação que conheço?", a: "Não. Comece pelas linguagens que a vaga pede e sobre as quais você passaria numa entrevista amanhã. Uma lista longa de linguagens que você usou uma vez tira o peso das que importam." },
    ],
  },
  {
    slug: "machine-learning-engineer",
    name: "Engenheiro de Machine Learning",
    alsoCalled: ["Machine Learning Engineer", "ML Engineer", "Engenheiro de MLOps", "Engenheiro de aprendizado de máquina"],
    metaDescription:
      "Palavras-chave para currículo de engenheiro de machine learning: Python, PyTorch, treinamento de modelos, MLOps e implantação. Compare seu currículo grátis.",
    intro:
      "As vagas de engenheiro de machine learning ficam no meio do caminho entre ciência de dados e engenharia de software: querem modelos bem treinados que funcionem de forma confiável em produção. Currículos que mostram só notebooks, ou só infraestrutura, deixam de fora metade do que é avaliado. Os melhores mostram o ciclo completo: dados, treinamento, avaliação, implantação e monitoramento.",
    groups: [
      { title: "Modelagem", keywords: ["Machine learning", "Aprendizado de máquina", "Deep learning", "PyTorch", "TensorFlow", "scikit-learn", "Feature engineering", "Avaliação de modelos"] },
      { title: "Dados", keywords: ["Python", "SQL", "Pandas", "Spark", "Pipelines de dados", "Airflow", "Feature store"] },
      { title: "MLOps e implantação", keywords: ["MLOps", "Implantação de modelos", "Model serving", "MLflow", "Kubeflow", "SageMaker", "Vertex AI", "Monitoramento de modelos"] },
      { title: "Engenharia", keywords: ["Docker", "Kubernetes", "AWS", "CI/CD", "API REST", "Git", "Testes unitários"] },
    ],
    tips: [
      { title: "Mostre um modelo em produção, com uma métrica", text: "\"Implantei um modelo de ranking que serve 5 milhões de previsões por dia e melhorou o CTR em 8%\" cobre modelagem, escala e impacto em uma única linha." },
      { title: "Cite seu stack de MLOps", text: "Ferramentas de rastreamento de experimentos, registro de modelos, serving e monitoramento aparecem explicitamente na maioria das vagas. MLflow, SageMaker ou Vertex AI são correspondências de palavra-chave bem fáceis." },
      { title: "Não esconda a engenharia de software", text: "Testes, CI/CD, contêineres e APIs são o que separa um engenheiro de ML de um cientista de dados na triagem." },
    ],
    faqs: [
      { q: "Quais palavras-chave o currículo de um engenheiro de machine learning deve ter?", a: "Python e um framework de deep learning (PyTorch ou TensorFlow), scikit-learn e feature engineering, ferramentas de dados como SQL e Spark, termos de MLOps e implantação (MLflow, model serving, monitoramento, SageMaker ou Vertex AI) e a base de engenharia: Docker, Kubernetes e CI/CD." },
      { q: "Qual a diferença entre o currículo de um engenheiro de ML e o de um cientista de dados?", a: "O currículo de um cientista de dados dá ênfase a análise, estatística e experimentação. O de um engenheiro de ML, a construir, implantar e operar modelos em produção: pipelines, serving, monitoramento e práticas de engenharia de software." },
    ],
  },
  {
    slug: "software-engineer",
    name: "Engenheiro de Software",
    alsoCalled: ["Software Engineer", "Desenvolvedor de software", "Desenvolvedor Full Stack", "Programador"],
    metaDescription:
      "Palavras-chave para currículo de engenheiro de software: linguagens, frameworks, nuvem, testes e design de sistemas. Compare seu currículo com qualquer vaga.",
    intro:
      "\"Engenheiro de software\" é o título mais amplo da tecnologia, então é a própria vaga que define o cargo: para uma empresa é backend em Java, para outra é full stack em TypeScript e para outra é C++ embarcado. Currículos genéricos sofrem aqui. As palavras-chave que contam são a linguagem, o framework e a plataforma específicos da vaga, além das práticas de engenharia que qualquer time de software valoriza.",
    groups: [
      { title: "Linguagens", keywords: ["Java", "Python", "TypeScript", "JavaScript", "C#", "Go", "C++", "Kotlin"] },
      { title: "Frameworks e plataformas", keywords: ["React", "Node.js", "Spring Boot", ".NET", "Django", "API REST", "GraphQL", "Microsserviços"] },
      { title: "Dados e nuvem", keywords: ["SQL", "PostgreSQL", "MongoDB", "Redis", "AWS", "Azure", "Docker", "Kubernetes"] },
      { title: "Práticas de engenharia", keywords: ["Design de sistemas", "Estruturas de dados e algoritmos", "Testes unitários", "Code review", "CI/CD", "Git", "Controle de versão", "Agile / Scrum", "Clean code"] },
    ],
    tips: [
      { title: "Comece pela linguagem principal da vaga", text: "Se a vaga é de Java, Java deve estar no seu resumo e no seu emprego mais recente, não no meio da lista de habilidades. Recrutadores costumam filtrar pela primeira linguagem que leem." },
      { title: "Mostre o escopo, não só o stack", text: "\"Projetei o serviço de pagamentos que processa 3 milhões de transações por mês\" mostra capacidade de design de sistemas. Tanto quem entrevista quanto quem faz a triagem procura provas de que você construiu algo de ponta a ponta." },
      { title: "Cite as práticas", text: "Code review, testes, CI/CD e plantões aparecem na maioria das vagas de engenharia de software. Uma linha concreta sobre cada um vale mais do que listá-los." },
    ],
    faqs: [
      { q: "Quais palavras-chave o currículo de um engenheiro de software deve ter?", a: "A linguagem e o framework que a vaga cita (por exemplo, Java com Spring Boot, ou TypeScript com React e Node.js), os bancos de dados e a plataforma de nuvem que você usou, e práticas de engenharia como design de sistemas, testes unitários, code review, CI/CD e Git." },
      { q: "\"Estruturas de dados e algoritmos\" deve aparecer no currículo de um engenheiro de software?", a: "Raramente como palavra-chave solta. Mostre isso pelo seu trabalho: melhorias de desempenho, problemas de escala que você resolveu. Deixe as perguntas de algoritmos para a entrevista." },
    ],
  },
  {
    slug: "data-scientist",
    name: "Cientista de Dados",
    alsoCalled: ["Data Scientist", "Machine Learning Engineer", "Applied Scientist", "Especialista em ciência de dados"],
    metaDescription:
      "Palavras-chave para currículo de cientista de dados: Python, machine learning, estatística, SQL e implantação. Compare seu currículo com qualquer vaga, grátis.",
    intro:
      "As vagas de cientista de dados avaliam duas coisas ao mesmo tempo: a profundidade em modelagem (estatística, machine learning, experimentação) e a engenharia necessária para que um modelo seja de fato usado (SQL, pipelines, implantação). Currículos cheios de algoritmos que não dizem nada sobre impacto no negócio nem uso em produção são os que ficam presos na triagem.",
    groups: [
      { title: "Linguagens e bibliotecas", keywords: ["Python", "R", "SQL", "Pandas", "NumPy", "scikit-learn", "PyTorch", "TensorFlow"] },
      { title: "Modelagem e estatística", keywords: ["Machine learning", "Aprendizado de máquina", "Estatística", "Regressão", "Classificação", "Séries temporais", "Testes A/B", "Inferência causal", "Feature engineering"] },
      { title: "Dados e implantação", keywords: ["Spark", "BigQuery", "Snowflake", "Airflow", "MLflow", "Docker", "AWS SageMaker", "Implantação de modelos"] },
      { title: "IA e comunicação", keywords: ["NLP", "LLM", "Deep learning", "Visualização de dados", "Comunicação com stakeholders", "Desenho de experimentos"] },
    ],
    tips: [
      { title: "Ligue cada modelo a uma métrica que mudou", text: "\"Desenvolvi um modelo de churn que reduziu os cancelamentos em 12%\" é o que se procura na triagem. A precisão do modelo, sozinha, não diz ao leitor que o trabalho fez diferença." },
      { title: "Mostre que chegou à produção", text: "Cite a implantação, o monitoramento ou o pipeline que serve as previsões. Muitas vagas separam quem só trabalha em notebooks de quem coloca modelos em produção." },
      { title: "Ajuste ao tipo de vaga", text: "Cargos focados em experimentação pedem testes A/B e inferência causal; os de engenharia de ML, implantação e MLOps. Incline seu currículo para o que está na sua frente." },
    ],
    faqs: [
      { q: "Quais palavras-chave o currículo de um cientista de dados deve ter?", a: "Primeiro Python e SQL; depois as bibliotecas que você usa (Pandas, scikit-learn, PyTorch ou TensorFlow), termos de modelagem e estatística (machine learning, regressão, testes A/B, forecasting) e as ferramentas de dados ou de implantação que a vaga citar, como Spark, Airflow ou MLflow." },
      { q: "Qual a diferença entre as palavras-chave de cientista de dados e de analista de dados?", a: "As vagas de analista giram em torno de SQL, dashboards e ferramentas de BI como Tableau ou Power BI. As de cientista de dados acrescentam machine learning, estatística, bibliotecas de Python e implantação de modelos." },
    ],
  },
  {
    slug: "account-executive",
    name: "Executivo de Contas",
    alsoCalled: ["Account Executive", "Executivo comercial", "Vendedor B2B", "Executivo de vendas SaaS"],
    metaDescription:
      "Palavras-chave para currículo de executivo de contas: meta, pipeline, Salesforce, prospecção e vendas B2B SaaS. Compare seu currículo com qualquer vaga.",
    intro:
      "As vagas de vendas são lidas como um placar: meta, tamanho dos negócios, ciclo de vendas, CRM. Os recrutadores procuram o mesmo nos currículos de executivo de contas, e rápido: um currículo que descreve funções em vez de números, ou que nunca cita o CRM, raramente chega à lista final mesmo com uma experiência sólida.",
    groups: [
      { title: "Processo de vendas", keywords: ["Vendas B2B", "Vendas SaaS", "Ciclo de vendas completo", "Prospecção de clientes", "Cold calling", "Geração de leads", "Outbound", "Fechamento de vendas"] },
      { title: "Resultados e métricas", keywords: ["Batimento de meta", "Gestão de pipeline", "Ticket médio (ACV)", "Taxa de conversão", "Forecast de vendas", "Crescimento de receita", "Upselling", "Renovações"] },
      { title: "Ferramentas", keywords: ["Salesforce", "HubSpot", "CRM", "LinkedIn Sales Navigator", "Gong", "Outreach", "Excel"] },
      { title: "Habilidades e metodologias", keywords: ["Negociação", "Gestão de contas", "Desenvolvimento de negócios", "Reuniões de descoberta", "MEDDIC", "Venda consultiva", "Gestão de stakeholders"] },
    ],
    tips: [
      { title: "Abra cada cargo com o batimento de meta", text: "\"Fechei R$ 6 milhões frente a uma meta de R$ 4,5 milhões (133%)\" é a primeira coisa que um diretor comercial procura. Coloque no primeiro tópico de cada emprego, não escondido no final." },
      { title: "Informe o tamanho dos negócios e a duração do ciclo", text: "Vagas de mid-market e enterprise contratam pelos negócios que você realmente conduziu. O valor médio de contrato e a duração do ciclo dizem ao leitor na hora se você se encaixa." },
      { title: "Cite o CRM e a metodologia", text: "Salesforce ou HubSpot aparecem na maioria das vagas, e muitas citam uma metodologia de qualificação como MEDDIC. Se você usa, escreva." },
    ],
    faqs: [
      { q: "Quais palavras-chave o currículo de um executivo de contas deve ter?", a: "Vendas B2B ou SaaS, batimento de meta, gestão de pipeline, prospecção e fechamento de vendas, o CRM que você usa (normalmente Salesforce ou HubSpot), negociação e gestão de contas, cada uma sustentada por um número como a receita fechada ou o percentual da meta." },
      { q: "Como mostro meus resultados de vendas no currículo?", a: "Use as mesmas métricas que seu gestor acompanhava: percentual da meta, receita fechada, tamanho médio dos negócios, taxa de conversão e posição no ranking do time. Um número concreto por cargo vale mais do que uma lista de responsabilidades." },
    ],
  },
  {
    slug: "digital-marketing-specialist",
    name: "Analista de Marketing Digital",
    alsoCalled: ["Digital Marketing Manager", "Especialista em marketing digital", "Performance Marketing Specialist", "Analista de mídia paga"],
    metaDescription:
      "Palavras-chave para currículo de marketing digital: SEO, Google Ads, conteúdo, e-mail, analytics e automação. Compare seu currículo com qualquer vaga.",
    intro:
      "As vagas de marketing digital citam explicitamente canais e ferramentas: SEO, mídia paga, redes sociais, e-mail e o stack de analytics e automação por trás. Currículos generalistas que dizem \"gerenciei campanhas\" sem citar o canal, o orçamento nem o resultado são os que passam despercebidos.",
    groups: [
      { title: "Canais", keywords: ["SEO", "SEM / PPC", "Google Ads", "Meta Ads", "Marketing de conteúdo", "E-mail marketing", "Marketing nas redes sociais", "Marketing de afiliados"] },
      { title: "Analytics e testes", keywords: ["Google Analytics (GA4)", "Google Tag Manager", "Testes A/B", "Otimização de conversão (CRO)", "Atribuição", "Relatórios de KPI", "Looker Studio"] },
      { title: "Ferramentas e automação", keywords: ["HubSpot", "Automação de marketing", "RD Station", "Mailchimp", "Semrush", "Ahrefs", "CMS (WordPress)", "Canva"] },
      { title: "Estratégia", keywords: ["Gestão de campanhas", "Gestão de orçamento", "Aquisição de clientes", "Otimização de funil", "Branding", "Copywriting", "Growth marketing"] },
    ],
    tips: [
      { title: "Coloque um número em cada canal", text: "\"Aumentei o tráfego orgânico em 180% em 9 meses\" ou \"Reduzi o custo por lead de R$ 42 para R$ 19 no Google Ads\": canal, métrica e prazo em uma única linha." },
      { title: "Cite o orçamento que você gerenciou", text: "Em cargos de mídia paga, a contratação é pelo nível de investimento. \"Gerenciei R$ 150 mil por mês entre Google e Meta\" posiciona você na hora." },
      { title: "Inclua o stack que a vaga usa", text: "GA4, Tag Manager, HubSpot, RD Station, Semrush: nomes de ferramentas são correspondências de palavra-chave simples e os recrutadores filtram por eles." },
    ],
    faqs: [
      { q: "Quais palavras-chave o currículo de um analista de marketing digital deve ter?", a: "Os canais em que você trabalha (SEO, Google Ads, Meta Ads, e-mail, conteúdo, redes sociais), as ferramentas de analytics (GA4, Google Tag Manager), ferramentas de automação e CRM como HubSpot ou RD Station, e termos de resultado como otimização de conversão, aquisição de clientes e gestão de orçamento." },
      { q: "Um currículo de marketing deve ter métricas?", a: "Sim. Tráfego, taxa de conversão, custo por aquisição, retorno sobre investimento em mídia (ROAS) e receita atribuída são o que os gestores usam para comparar candidatos. Inclua pelo menos uma por cargo." },
    ],
  },
  {
    slug: "financial-analyst",
    name: "Analista Financeiro",
    alsoCalled: ["Analista de FP&A", "Finance Business Partner", "Analista de planejamento financeiro", "Analista de controladoria"],
    metaDescription:
      "Palavras-chave para currículo de analista financeiro: modelagem financeira, FP&A, orçamento, forecast, Excel e Power BI. Compare seu currículo grátis.",
    intro:
      "As vagas de analista financeiro são construídas em torno de um ciclo (orçamento, forecast, fechamento, reporte) e das ferramentas usadas para conduzi-lo. Os recrutadores procuram essas mesmas palavras no seu currículo, junto com provas de que seus números mudaram uma decisão. Um currículo que diz \"Excel\" sem dizer o que foi modelado, nem para quem, raramente se destaca.",
    groups: [
      { title: "Planejamento e análise", keywords: ["FP&A", "Modelagem financeira", "Elaboração de orçamento", "Forecast", "Análise de variações", "Análise de cenários", "Business cases"] },
      { title: "Reporte e contabilidade", keywords: ["Relatórios gerenciais", "Fechamento mensal", "Conciliações bancárias", "IFRS", "CPC", "DRE", "Fluxo de caixa"] },
      { title: "Ferramentas", keywords: ["Excel (tabelas dinâmicas, PROCV, fórmulas avançadas)", "Power BI", "SQL", "SAP", "Oracle NetSuite", "TOTVS"] },
      { title: "Habilidades", keywords: ["Gestão de stakeholders", "Análise financeira", "Data storytelling", "Relatórios de KPI", "Controle de custos", "Melhoria de processos"] },
    ],
    tips: [
      { title: "Mostre a decisão que sua análise impulsionou", text: "\"Construí o modelo de precificação que sustentou um reajuste de 6%, avaliado em R$ 9 milhões\" diz muito mais do que \"responsável por modelos financeiros\"." },
      { title: "Cite o ciclo pelo qual você respondeu", text: "Orçamento anual, rolling forecast, fechamento mensal: diga quais você conduziu e para um negócio de que tamanho (receita, centros de custo, empresas do grupo)." },
      { title: "Seja específico com Excel e BI", text: "\"Excel\" está em todo currículo de finanças. Diga o nível (modelos financeiros, tabelas dinâmicas, Power Query) e a ferramenta de BI que a vaga cita, como Power BI." },
    ],
    faqs: [
      { q: "Quais palavras-chave o currículo de um analista financeiro deve ter?", a: "FP&A, modelagem financeira, elaboração de orçamento, forecast e análise de variações; termos de reporte como relatórios gerenciais, fechamento mensal, DRE e IFRS; e as ferramentas que a vaga cita: quase sempre Excel, muitas vezes Power BI, SQL ou um ERP como SAP ou TOTVS." },
      { q: "Como mostro meu impacto em um currículo de finanças?", a: "Ligue seu trabalho a dinheiro ou a decisões: economias identificadas, melhora na precisão do forecast, um orçamento pelo qual você respondeu, um business case aprovado. Um número concreto por cargo já basta." },
    ],
  },
  {
    slug: "project-manager",
    name: "Gerente de Projetos",
    alsoCalled: ["Project Manager", "Coordenador de projetos", "Gestor de projetos", "Gerente de projetos de TI"],
    metaDescription:
      "Palavras-chave para currículo de gerente de projetos: planejamento, gestão de riscos, stakeholders, Agile, PMP e orçamento. Compare seu currículo grátis.",
    intro:
      "As vagas de gerente de projetos avaliam três coisas: as metodologias que você usa, o tamanho do que você entregou e como você lida com pessoas e riscos. Os recrutadores procuram os nomes das metodologias (Agile, Scrum, PRINCE2, PMP) e números (orçamento, tamanho do time, prazos) que mostrem a escala que você consegue assumir.",
    groups: [
      { title: "Metodologias e certificações", keywords: ["Gestão de projetos", "Agile", "Scrum", "Waterfall", "PRINCE2", "PMP", "Kanban"] },
      { title: "Entrega", keywords: ["Planejamento de projetos", "Gestão de escopo", "Gestão de riscos", "Gestão de orçamento", "Planejamento de recursos", "Marcos", "Gestão de mudanças"] },
      { title: "Pessoas", keywords: ["Gestão de stakeholders", "Times multidisciplinares", "Gestão de fornecedores", "Comunicação", "Relatórios de status", "Comitê executivo"] },
      { title: "Ferramentas", keywords: ["Jira", "Confluence", "MS Project", "Asana", "Smartsheet", "Excel"] },
    ],
    tips: [
      { title: "Comece pela escala e pelo resultado", text: "\"Entreguei a implantação de um ERP de R$ 10 milhões em 4 países, no prazo e 6% abaixo do orçamento\" diz a um gestor exatamente o que você consegue assumir." },
      { title: "Cite a metodologia e a certificação", text: "PRINCE2, PMP, Scrum Master: se você tem alguma, coloque perto do início. Muitas vagas filtram por elas." },
      { title: "Mostre como você lidou com riscos", text: "Uma linha sobre um risco que você identificou a tempo e a medida que tomou indica mais senioridade do que uma lista de ferramentas." },
    ],
    faqs: [
      { q: "Quais palavras-chave o currículo de um gerente de projetos deve ter?", a: "Gestão de projetos, as metodologias que você usa (Agile, Scrum, Waterfall, PRINCE2), certificações como PMP, termos de entrega (planejamento, gestão de escopo, de riscos e de orçamento), habilidades com pessoas (gestão de stakeholders e de fornecedores) e as ferramentas com que você conduz projetos, normalmente Jira, Confluence ou MS Project." },
      { q: "O que fica melhor no currículo, PMP ou PRINCE2?", a: "A que a vaga citar. No Brasil, a PMP é de longe a mais pedida; a PRINCE2 é mais comum no Reino Unido e na Europa. As duas são valorizadas, e colocar a que a empresa pede é uma correspondência direta de palavra-chave." },
    ],
  },
  {
    slug: "recruiter",
    name: "Recrutador",
    alsoCalled: ["Analista de recrutamento e seleção", "Talent Acquisition Specialist", "Tech Recruiter", "Especialista em atração de talentos"],
    metaDescription:
      "Palavras-chave para currículo de recrutador: sourcing, ciclo completo de seleção, ATS, stakeholders e time to hire. Compare seu currículo com qualquer vaga.",
    intro:
      "Recrutadores escrevem vagas o dia inteiro e, mesmo assim, os próprios currículos costumam ser os mais vagos da pilha. Os cargos de aquisição de talentos são avaliados pelo volume de contratações que você conduziu, os perfis que você recruta, as ferramentas com que busca candidatos e as métricas pelas quais você era medido.",
    groups: [
      { title: "Seleção", keywords: ["Recrutamento e seleção", "Ciclo completo de seleção", "Sourcing", "Headhunting", "Tech recruiting", "Triagem de currículos", "Entrevistas", "Negociação de propostas"] },
      { title: "Ferramentas", keywords: ["Sistema de rastreamento de candidatos (ATS)", "Gupy", "Greenhouse", "Workday", "LinkedIn Recruiter", "Busca booleana", "Excel"] },
      { title: "Métricas", keywords: ["Time to hire", "Custo por contratação", "Taxa de aceite de propostas", "Relatórios de pipeline", "Qualidade da contratação", "Metas de contratação"] },
      { title: "Parceria com o negócio", keywords: ["Gestão de stakeholders", "Aquisição de talentos", "Parceria com gestores", "Marca empregadora", "Experiência do candidato", "Diversidade e inclusão", "Onboarding"] },
    ],
    tips: [
      { title: "Coloque números nas suas contratações", text: "\"Contratei 45 engenheiros em 12 meses com taxa de aceite de propostas de 92%\" é, para um recrutador, o equivalente a uma meta de vendas: coloque primeiro." },
      { title: "Diga quais perfis você recruta", text: "Tecnologia, vendas, executivos, contratação em volume: as vagas costumam ser especializadas, e seu resumo também deveria ser." },
      { title: "Inclua o ATS e as ferramentas de sourcing", text: "Gupy, Greenhouse, Workday, LinkedIn Recruiter e busca booleana são correspondências diretas de palavra-chave nas vagas de aquisição de talentos." },
    ],
    faqs: [
      { q: "Quais palavras-chave o currículo de um recrutador deve ter?", a: "Ciclo completo de seleção, sourcing e os perfis que você contrata; o sistema de rastreamento de candidatos e as ferramentas de sourcing que você usa (Gupy, Greenhouse, Workday, LinkedIn Recruiter, busca booleana); métricas como time to hire e taxa de aceite de propostas; e termos de parceria como gestão de stakeholders e marca empregadora." },
      { q: "Como um recrutador deve mostrar resultados no currículo?", a: "Com números de contratação: vagas fechadas, time to hire, taxa de aceite de propostas, custo por contratação ou metas de contratação batidas. São as métricas pelas quais seu próximo gestor vai avaliar você." },
    ],
  },
  {
    slug: "customer-success-manager",
    name: "Customer Success Manager",
    alsoCalled: ["Account Manager", "Gerente de sucesso do cliente", "Analista de Customer Success", "Key Account Manager"],
    metaDescription:
      "Palavras-chave para currículo de customer success: retenção, churn, onboarding, renovações, upselling e CRM. Compare seu currículo com qualquer vaga.",
    intro:
      "As vagas de customer success são medidas em retenção: churn, renovações, expansão e saúde do cliente. Os recrutadores procuram o tamanho da carteira que você gerenciou, os processos que conduziu (onboarding, QBR, renovações) e as ferramentas por trás. Um currículo de CSM sem um número de retenção é fácil de descartar.",
    groups: [
      { title: "Retenção e crescimento", keywords: ["Retenção de clientes", "Redução de churn", "Renovações", "Upselling", "Receita de expansão", "Net revenue retention (NRR)"] },
      { title: "Ciclo de vida do cliente", keywords: ["Onboarding", "Adoção", "Revisões trimestrais de negócio (QBR)", "Health score", "Gestão de escalonamentos", "Jornada do cliente"] },
      { title: "Ferramentas", keywords: ["Salesforce", "HubSpot", "Gainsight", "Zendesk", "Intercom", "CRM", "Excel"] },
      { title: "Habilidades", keywords: ["Gestão de contas", "Gestão de stakeholders", "SaaS", "Conhecimento do produto", "Comunicação", "Negociação"] },
    ],
    tips: [
      { title: "Coloque a retenção primeiro", text: "\"Gerenciei uma carteira de R$ 15 milhões e 40 contas com retenção bruta de 96% e NRR de 118%\" é a linha que os gestores procuram." },
      { title: "Mostre os processos que você conduz", text: "Programas de onboarding, QBRs, health scoring, playbooks de renovação: cite cada um junto com o resultado que trouxe." },
      { title: "Cite seu stack de customer success", text: "Gainsight, Salesforce, HubSpot ou Zendesk aparecem na maioria das vagas e são correspondências de palavra-chave fáceis." },
    ],
    faqs: [
      { q: "Quais palavras-chave o currículo de um customer success manager deve ter?", a: "Retenção de clientes, redução de churn, renovações, upselling e NRR; termos do ciclo de vida como onboarding, adoção, QBR e health score; as ferramentas que você usa (Gainsight, Salesforce, HubSpot, Zendesk); e gestão de contas e de stakeholders." },
      { q: "Quais métricas devem aparecer em um currículo de customer success?", a: "Retenção bruta e líquida de receita, taxa de churn, taxa de renovação, receita de expansão, número e valor das contas gerenciadas e indicadores de satisfação do cliente como o NPS." },
    ],
  },
  {
    slug: "data-analyst",
    name: "Analista de Dados",
    alsoCalled: ["Data Analyst", "Analista de BI", "Business Analyst", "Analista de negócios"],
    metaDescription:
      "Palavras-chave para currículo de analista de dados: SQL, Python, Tableau, Power BI e testes A/B. Compare seu currículo com qualquer vaga, grátis.",
    intro:
      "As vagas de analista de dados se dividem em três partes: como você obtém os dados (SQL, data warehouses), como analisa (Python, estatística) e como comunica (dashboards, stakeholders). Currículos que cobrem só as ferramentas e pulam o resultado para o negócio são o motivo mais comum para analistas qualificados serem descartados.",
    groups: [
      { title: "Consultas e data warehouses", keywords: ["SQL", "PostgreSQL", "BigQuery", "Snowflake", "Redshift", "ETL", "dbt", "Modelagem de dados"] },
      { title: "Análise", keywords: ["Análise de dados", "Python", "Pandas", "NumPy", "R", "Excel", "Estatística", "Testes A/B", "Regressão", "Forecast"] },
      { title: "Visualização e BI", keywords: ["Tableau", "Power BI", "Looker", "Dashboards", "Visualização de dados", "Relatórios de KPI"] },
      { title: "Habilidades de negócio", keywords: ["Gestão de stakeholders", "Levantamento de requisitos", "Data storytelling", "Analytics de produto", "Qualidade de dados"] },
    ],
    tips: [
      { title: "Comece pela decisão, não pelo dashboard", text: "\"Criei no Tableau um dashboard de churn que levou a uma mudança de preços avaliada em R$ 1,5 milhão\" ganha de \"criei dashboards no Tableau\"." },
      { title: "Mostre seu nível de SQL de forma concreta", text: "Cite window functions, CTEs ou otimização de consultas se você usa. \"SQL\" sozinho não diferencia você de alguém que escreveu um único SELECT." },
      { title: "Use o nome exato da ferramenta de BI", text: "Tableau, Power BI e Looker não são intercambiáveis para um filtro de palavras-chave. Cite a da vaga se você já usou, e a equivalente mais próxima se não." },
    ],
    faqs: [
      { q: "Quais palavras-chave o currículo de um analista de dados deve ter?", a: "Primeiro SQL, que aparece em quase todas as vagas; depois as ferramentas de análise que você usa (Python, Pandas, Excel, R), a ferramenta de BI que a vaga cita (Tableau, Power BI ou Looker), métodos como testes A/B e estatística, e termos de negócio como gestão de stakeholders e relatórios de KPI." },
      { q: "Um analista de dados precisa colocar Python no currículo?", a: "Muitas vagas pedem; outras só querem SQL e uma ferramenta de BI. Confira a vaga específica: se Python estiver nos requisitos, inclua com um exemplo do que você fez com ele." },
    ],
  },
  {
    slug: "product-manager",
    name: "Product Manager",
    alsoCalled: ["Product Owner", "Gerente de produto", "Gestor de produto", "Technical Product Manager"],
    metaDescription:
      "Palavras-chave para currículo de product manager: roadmap, discovery, métricas, gestão de stakeholders e Agile. Compare seu currículo com qualquer vaga.",
    intro:
      "As vagas de product manager têm menos nomes de ferramentas e mais linguagem de processo e de resultado, por isso são mais difíceis de cobrir no instinto. Os termos que contam são os que descrevem como o time decide o que construir, como lança e como mede o sucesso. Seu currículo precisa desse mesmo vocabulário, acompanhado de números.",
    groups: [
      { title: "Estratégia e discovery", keywords: ["Estratégia de produto", "Roadmap de produto", "Product discovery", "Pesquisa com usuários", "Entrevistas com clientes", "Análise de mercado", "Priorização", "OKRs"] },
      { title: "Entrega", keywords: ["Agile", "Scrum", "Kanban", "Gestão de backlog", "Histórias de usuário", "Sprint planning", "Go-to-market", "Times multidisciplinares"] },
      { title: "Dados e métricas", keywords: ["KPIs", "Testes A/B", "Analytics de produto", "SQL", "Conversão", "Retenção", "Experimentação"] },
      { title: "Ferramentas e colaboração", keywords: ["Jira", "Confluence", "Figma", "Amplitude", "Mixpanel", "Gestão de stakeholders", "Comunicação"] },
    ],
    tips: [
      { title: "Todo tópico precisa de uma métrica", text: "Adoção, receita, retenção, conversão, tempo economizado. Um currículo de product manager sem números é lido como o de um coordenador de projetos." },
      { title: "Use as palavras de processo da vaga", text: "Se a vaga diz \"discovery\", \"OKRs\" e \"experimentação\", descreva seu trabalho com esses termos onde eles correspondem à realidade." },
      { title: "Mostre o que você decidiu não construir", text: "Priorização é o centro do trabalho. Uma linha sobre uma renúncia que você fez, e por quê, mostra mais senioridade do que uma lista de lançamentos." },
    ],
    faqs: [
      { q: "Quais palavras-chave o currículo de um product manager deve ter?", a: "Roadmap, estratégia de produto, discovery, priorização, gestão de stakeholders, Agile ou Scrum e as métricas pelas quais você respondia (retenção, conversão, receita). Adicione as ferramentas que a vaga citar: normalmente Jira, Figma e uma ferramenta de analytics como Amplitude ou Mixpanel." },
      { q: "Um product manager precisa de palavras-chave técnicas no currículo?", a: "Para vagas de product manager técnico, sim: APIs, SQL e termos de design de sistemas aparecem com frequência nos requisitos. Para as demais, termos de analytics e experimentação costumam pesar mais do que os de engenharia." },
    ],
  },
  {
    slug: "devops-engineer",
    name: "Engenheiro DevOps",
    alsoCalled: ["DevOps Engineer", "Site Reliability Engineer (SRE)", "Platform Engineer", "Engenheiro de Cloud"],
    metaDescription:
      "Palavras-chave para currículo de engenheiro DevOps: Kubernetes, Terraform, AWS, CI/CD e monitoramento. Compare seu currículo com qualquer vaga, grátis.",
    intro:
      "As vagas de DevOps são as mais carregadas de ferramentas de toda a engenharia, e as ferramentas mudam de uma empresa para outra: o que em um time é Terraform e GitHub Actions, em outro é Pulumi e GitLab CI. Ajustar o currículo ao conjunto específico de ferramentas da vaga, e ao mesmo tempo mostrar a prática transferível por trás, é o que faz ele ser lido.",
    groups: [
      { title: "Nuvem e contêineres", keywords: ["AWS", "Azure", "Google Cloud", "Docker", "Kubernetes", "Helm", "Serverless"] },
      { title: "Infraestrutura como código e automação", keywords: ["Terraform", "Ansible", "CloudFormation", "Pulumi", "Bash", "Python", "GitOps"] },
      { title: "CI/CD", keywords: ["GitHub Actions", "GitLab CI", "Jenkins", "Argo CD", "Integração contínua", "Pipelines de deploy", "Automação de releases"] },
      { title: "Confiabilidade e segurança", keywords: ["Linux", "Monitoramento", "Prometheus", "Grafana", "Datadog", "Resposta a incidentes", "SLOs", "Redes", "Segurança / DevSecOps"] },
    ],
    tips: [
      { title: "Coloque números na confiabilidade e na velocidade", text: "Frequência de deploy, lead time, disponibilidade, tempo de recuperação, custo economizado. \"Reduzi o tempo de deploy de 45 para 6 minutos\" é o tipo de linha que gera entrevistas." },
      { title: "Ligue explicitamente as ferramentas equivalentes", text: "Se a vaga pede GitLab CI e você conhece GitHub Actions, cite a sua e escreva também \"pipelines de CI/CD\" em termos gerais, para que tanto um filtro quanto uma pessoa vejam o encaixe." },
      { title: "Inclua as certificações que a vaga pedir", text: "Certificações de AWS, Azure e Kubernetes (CKA) aparecem com frequência nos requisitos e são correspondências fáceis de palavra-chave se você as tiver." },
    ],
    faqs: [
      { q: "Quais palavras-chave o currículo de um engenheiro DevOps deve ter?", a: "Sua plataforma de nuvem (AWS, Azure ou Google Cloud), Docker e Kubernetes, uma ferramenta de infraestrutura como código como Terraform, seu sistema de CI/CD (GitHub Actions, GitLab CI ou Jenkins), Linux, scripts em Bash ou Python e ferramentas de monitoramento como Prometheus e Grafana." },
      { q: "DevOps e SRE são a mesma coisa em um currículo?", a: "As ferramentas coincidem em grande parte, mas as vagas de SRE dão mais peso à linguagem de confiabilidade: SLOs, resposta a incidentes, plantões, planejamento de capacidade. Use o vocabulário da vaga para a qual você está se candidatando." },
    ],
  },
  {
    slug: "ux-designer",
    name: "UX Designer",
    alsoCalled: ["Designer de UX", "UX/UI Designer", "Product Designer", "Designer de produto digital"],
    metaDescription:
      "Palavras-chave para currículo de UX designer: Figma, pesquisa com usuários, prototipagem, testes de usabilidade e sistemas de design. Compare seu currículo.",
    intro:
      "O portfólio de um UX designer mostra o trabalho, mas é o currículo que faz alguém abrir o portfólio. As vagas citam métodos específicos (pesquisa, testes, prototipagem) e ferramentas (quase sempre Figma), e um currículo que descreve o mesmo processo com outras palavras pode ter nota baixa frente a elas mesmo com uma experiência sólida.",
    groups: [
      { title: "Pesquisa", keywords: ["Pesquisa com usuários", "Testes de usabilidade", "Entrevistas com usuários", "Personas", "Mapa da jornada do usuário", "Questionários", "Análise de concorrentes"] },
      { title: "Design", keywords: ["Experiência do usuário", "Wireframes", "Prototipagem", "Design de interação", "Arquitetura da informação", "Design visual", "Design de interfaces", "Design responsivo", "Sistema de design"] },
      { title: "Ferramentas", keywords: ["Figma", "Sketch", "Adobe XD", "Miro", "FigJam", "Maze"] },
      { title: "Colaboração e padrões", keywords: ["Acessibilidade (WCAG)", "Design thinking", "Agile", "Handoff para desenvolvimento", "Gestão de stakeholders", "Testes A/B"] },
    ],
    tips: [
      { title: "Descreva o resultado do design", text: "Tarefas concluídas, conversão, chamados de suporte, índices de satisfação. \"Redesenhei o onboarding e a ativação subiu de 31% para 44%\" precisa estar no currículo, não só no estudo de caso." },
      { title: "Cite seus métodos por extenso", text: "Escreva \"testes de usabilidade\" e \"entrevistas com usuários\" em vez de só \"pesquisa\": as vagas listam cada um separadamente, e os filtros de palavras-chave também." },
      { title: "Mantenha o currículo em formato de texto", text: "Um PDF muito elaborado pode perder o texto no processamento. Use um layout limpo de uma coluna para candidaturas e deixe o visual com o portfólio." },
    ],
    faqs: [
      { q: "Quais palavras-chave o currículo de um UX designer deve ter?", a: "Figma, pesquisa com usuários, testes de usabilidade, wireframes, prototipagem, design de interação e sistemas de design cobrem a maioria das vagas. Adicione acessibilidade (WCAG), mapa da jornada do usuário e termos de colaboração como handoff para desenvolvimento e Agile onde você tiver experiência." },
      { q: "O currículo de um UX designer deve ter um design visual elaborado?", a: "Melhor limpo e legível do que elaborado. Texto dentro de imagens ou layouts complexos com várias colunas costumam se perder ao processar um PDF, e aí as palavras-chave nunca chegam à busca do recrutador." },
    ],
  },
  // Saúde e logística: as listas usam as frases que o motor de pontuação reconhece
  // (LOCALIZED_SKILL_ALIASES.healthcare / .logistics em languages.ts).
  {
    slug: "registered-nurse",
    name: "Enfermeiro(a)",
    alsoCalled: ["Enfermeira", "Enfermeiro assistencial", "Bacharel em Enfermagem", "Enfermeiro(a) de internação"],
    metaDescription:
      "Palavras-chave para currículo de enfermagem: cuidado ao paciente, prontuário eletrônico, administração de medicamentos e controle de infecção.",
    intro:
      "As vagas de enfermagem são escritas em torno de um ambiente e de um conjunto de funções clínicas: o setor, o tipo de paciente, o sistema de registro, as certificações. Os recrutadores dos hospitais buscam esses termos exatos nos sistemas de candidatos, e um currículo que diz \"cuidei de pacientes\" onde a vaga diz \"cuidado ao paciente\" e \"administração de medicamentos\" pode passar despercebido mesmo com anos de experiência assistencial.",
    groups: [
      { title: "Cuidados clínicos", keywords: ["Cuidado ao paciente", "Assistência ao paciente", "Administração de medicamentos", "Sinais vitais", "Curativos", "Plano de cuidados", "Avaliação do paciente", "Terapia intravenosa", "Educação em saúde", "SAE"] },
      { title: "Registros e normas", keywords: ["Prontuário eletrônico", "Tasy", "MV", "Documentação clínica", "Controle de infecção", "Segurança do paciente", "Protocolos assistenciais", "Coordenação do cuidado"] },
      { title: "Formação e certificações", keywords: ["COREN ativo", "Bacharelado em Enfermagem", "Suporte básico de vida (BLS)", "Suporte avançado de vida (ACLS)", "Suporte de vida pediátrico (PALS)", "Pós-graduação em UTI"] },
      { title: "Ambientes e trabalho em equipe", keywords: ["Clínica médica", "Clínica cirúrgica", "UTI", "Pronto-socorro", "Planejamento de alta", "Equipe multiprofissional", "Supervisão de técnicos de enfermagem", "Educação continuada"] },
    ],
    tips: [
      { title: "Informe o setor, a escala e o tipo de paciente", text: "\"Enfermeira assistencial em clínica médica com 32 leitos, escala 12x36, 1 enfermeira para 10 pacientes\" diz a uma coordenadora em uma linha o que \"enfermeira com experiência\" nunca diz. O ambiente e a carga assistencial são a primeira coisa que ela olha." },
      { title: "Escreva as certificações por extenso e com a sigla", text: "\"Suporte básico de vida (BLS)\" corresponde a uma busca por qualquer das duas formas. Adicione a instituição e a validade: um certificado vencido é um motivo comum de eliminação. Deixe o COREN ativo bem visível." },
      { title: "Cite o sistema de registro", text: "As vagas costumam pedir um prontuário eletrônico específico, como Tasy ou MV. Se você registrou nele, cite junto com \"documentação clínica\" em vez de escrever \"conhecimentos de informática\"." },
    ],
    faqs: [
      { q: "Quais palavras-chave o currículo de um enfermeiro ou uma enfermeira deve ter?", a: "Cuidado ao paciente, administração de medicamentos, sinais vitais, curativos, plano de cuidados e documentação clínica cobrem as funções que a maioria das vagas lista. Adicione o sistema de registro que você usou (prontuário eletrônico, Tasy, MV), termos de normas (controle de infecção, segurança do paciente) e sua formação e certificações: COREN ativo, suporte básico de vida e as de especialidade, como suporte avançado de vida ou pediátrico." },
      { q: "Toda certificação deve aparecer em um currículo de enfermagem?", a: "Inclua as que estão válidas e as que a vaga pede, cada uma com a validade. Coloque a formação, o COREN e as certificações perto do início: em vagas de enfermagem elas são requisito eliminatório, não detalhe." },
    ],
  },
  {
    slug: "logistics-coordinator",
    name: "Coordenador de Logística",
    alsoCalled: ["Analista de logística", "Coordenador de supply chain", "Analista de suprimentos", "Planejador de transportes"],
    metaDescription:
      "Palavras-chave para currículo de coordenador de logística: cadeia de suprimentos, estoque, WMS, transporte e compras. Compare seu currículo grátis.",
    intro:
      "As vagas de logística e cadeia de suprimentos são lidas como um mapa da operação: quais fluxos você vai conduzir (recebimento, armazém, transporte), quais sistemas (um ERP, um WMS, um TMS) e por quais números você vai ser avaliado. Os recrutadores procuram esses mesmos sistemas e métricas no seu currículo, então citá-los, com um número de volume ou de custo, faz a maior parte do trabalho.",
    groups: [
      { title: "Planejamento e estoque", keywords: ["Gestão da cadeia de suprimentos", "Gestão de estoque", "Planejamento da demanda", "S&OP", "Suprimentos", "Compras", "Previsão de demanda", "Separação de pedidos"] },
      { title: "Transporte e armazém", keywords: ["Frete", "Gestão de armazém", "Operador logístico (3PL)", "Gestão de frota", "Última milha", "Roteirização", "Desembaraço aduaneiro", "Incoterms"] },
      { title: "Sistemas", keywords: ["WMS", "SAP MM", "ERP", "TMS", "Excel", "Power BI", "EDI"] },
      { title: "Resultados e boas práticas", keywords: ["Entregas no prazo (OTIF)", "Redução de custos", "Relatórios de KPI", "Gestão de fornecedores", "Negociação com transportadoras", "Lean", "Melhoria contínua"] },
    ],
    tips: [
      { title: "Coloque um volume em cada linha", text: "Embarques por semana, SKUs, tamanho do armazém, gasto com frete. \"Coordenei 120 embarques de saída por semana com 4 transportadoras\" mostra a escala de operação que você consegue conduzir." },
      { title: "Cite o sistema, não a categoria", text: "\"SAP MM\" ou o WMS que você usou corresponde a uma vaga; \"software de ERP\" corresponde bem menos. Coloque o termo genérico ao lado para que encontrem os dois." },
      { title: "Mostre a métrica que você melhorou", text: "Entregas no prazo, custo por embarque, acuracidade de estoque, lead time. \"Aumentei o OTIF de 91% para 97%\" é a frase que um gestor de logística procura." },
    ],
    faqs: [
      { q: "Quais palavras-chave o currículo de um coordenador de logística deve ter?", a: "Gestão da cadeia de suprimentos, gestão de estoque, frete, gestão de armazém e suprimentos cobrem a maioria das vagas. Adicione os sistemas que você usou (um WMS, SAP MM ou outro ERP, um TMS), termos de planejamento como planejamento da demanda e S&OP, e as métricas pelas quais você era medido: entregas no prazo, custo e acuracidade de estoque." },
      { q: "Qual a diferença entre um currículo de logística e um de cadeia de suprimentos?", a: "As vagas de logística giram em torno de mover e armazenar mercadorias: transporte, transportadoras, armazém, última milha. As de cadeia de suprimentos são mais amplas e acrescentam planejamento e compras: planejamento da demanda, S&OP, suprimentos, gestão de fornecedores. Comece pelo vocabulário da vaga para a qual você está se candidatando." },
    ],
  },
];

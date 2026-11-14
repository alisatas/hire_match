import type { SampleJob } from "./types";

export const SAMPLE_JOBS: SampleJob[] = [
  { id: "AI Engineer", label: "Engenheiro de IA", emoji: "🤖", desc: "Python, LLM, RAG, embeddings, bancos de dados vetoriais, LangChain, evals, FastAPI, AWS", text: `Engenheiro(a) de IA (AI Engineer) — São Paulo (Híbrido)

Procuramos um(a) AI Engineer para criar funcionalidades baseadas em LLM usadas por milhares de clientes. Você vai levar a IA generativa do protótipo à produção: recuperação, avaliação, implantação e monitoramento.

Requisitos:
- Pelo menos 3 anos de experiência como engenheiro(a) de software ou de machine learning, com Python sólido
- Experiência criando aplicações LLM com as APIs da OpenAI ou da Anthropic
- RAG: embeddings, chunking e um banco de dados vetorial como pgvector, Pinecone ou Weaviate
- Frameworks como LangChain ou LlamaIndex; AI agents e function calling
- Evals: desenhar conjuntos de avaliação de LLM e medir qualidade, latência e custo
- Implantação de modelos atrás de APIs (FastAPI), Docker e AWS
- Prompt engineering e fine-tuning com Hugging Face
- CI/CD, Git e trabalho em equipes ágeis

Diferenciais:
- Experiência em MLOps (MLflow, SageMaker ou Vertex AI)
- TypeScript para ferramentas internas
- SQL e PostgreSQL

Oferecemos salário competitivo, verba para cursos e trabalho híbrido.` },
  { id: "Account Executive", label: "Executivo de Contas", emoji: "🤝", desc: "Vendas B2B SaaS, prospecção, meta, Salesforce, HubSpot, negociação", text: `Executivo(a) de Contas (Account Executive) — Vendas B2B SaaS, São Paulo (Híbrido)

Procuramos um(a) Account Executive para conduzir o ciclo de vendas completo com clientes de médio porte no Brasil. Você vai fazer prospecção de clientes e geração de leads, gerenciar seu pipeline no Salesforce e fechar negócios frente a uma meta trimestral.

Requisitos:
- Pelo menos 3 anos de experiência em vendas B2B ou vendas SaaS, de preferência como account executive
- Histórico comprovado de batimento de metas e fechamento de vendas
- Experiência prática com Salesforce ou HubSpot CRM
- Sólidas habilidades de negociação, descoberta e gestão de contas
- Facilidade com cold calling e prospecção outbound
- Mentalidade de desenvolvimento de negócios e excelente comunicação em português e inglês

Diferenciais:
- Experiência com automação de marketing e previsões em Excel
- Conhecimento do LinkedIn Sales Navigator

Oferecemos comissão sem teto, trabalho híbrido e verba para cursos.` },
  { id: "Frontend Dev", label: "Desenvolvedor Frontend", emoji: "🎨", desc: "React, TypeScript, Next.js, Tailwind, GraphQL, Jest, CI/CD", text: `Desenvolvedor(a) Frontend — Belo Horizonte (Híbrido)

Procuramos um(a) Desenvolvedor(a) Frontend para o nosso time de produto. Você vai criar aplicações web rápidas e responsivas usadas por milhares de pessoas todos os dias.

Requisitos:
- Pelo menos 3 anos de experiência com React e TypeScript
- Sólidos conhecimentos de Next.js, Tailwind CSS e CSS moderno
- Experiência com gerenciamento de estado (Redux, Zustand ou similar)
- Conhecimento de REST APIs e GraphQL
- Controle de versão com Git e pipelines de CI/CD (GitHub Actions)
- Conhecimentos de acessibilidade (WCAG) e compatibilidade entre navegadores
- Experiência em equipes ágeis / Scrum

Diferenciais:
- Testes com Jest e Cypress
- Colaboração com design UX no Figma
- Node.js para padrões BFF e Docker para desenvolvimento local

Oferecemos salário competitivo, trabalho híbrido flexível e uma cultura de time colaborativa.` },
  { id: "Digital Marketer", label: "Analista de Marketing Digital", emoji: "📣", desc: "SEO, Google Ads, marketing de conteúdo e e-mail, GA4, HubSpot, gestão de campanhas", text: `Analista de Marketing Digital — Curitiba (Híbrido)

Procuramos um(a) Analista de Marketing Digital para aumentar a aquisição de clientes online. Você vai cuidar do SEO e da mídia paga, fazer a gestão de campanhas em vários canais e reportar o que funciona.

Requisitos:
- Pelo menos 2 anos de experiência em marketing digital
- Sólidos conhecimentos de SEO: pesquisa de palavras-chave, otimização on-page e briefings de conteúdo
- Gestão de campanhas no Google Ads (PPC / SEM) com orçamento mensal
- Experiência em marketing de conteúdo e e-mail marketing
- Marketing nas redes sociais no LinkedIn e na Meta
- Relatórios com Google Analytics e Google Tag Manager
- Experiência com HubSpot ou outra ferramenta de automação de marketing
- Foco em dados: testes A/B e otimização de conversão

Diferenciais:
- Experiência em growth marketing em uma scale-up
- Conhecimentos básicos de Excel ou Looker Studio

Oferecemos verba de marketing para experimentar, horário flexível e escritório híbrido.` },
  { id: "Backend Engineer", label: "Desenvolvedor Backend", emoji: "⚙️", desc: "Node.js, Python, PostgreSQL, AWS, Docker, Kubernetes, Redis, Terraform", text: `Desenvolvedor(a) Backend — Remoto (Brasil)

Venha para o nosso time de engenharia projetar e construir serviços backend escaláveis que sustentam nossa plataforma SaaS.

Requisitos:
- Pelo menos 4 anos de experiência com Node.js ou Python (FastAPI, Django)
- SQL sólido, de preferência PostgreSQL
- Experiência projetando REST APIs e microsserviços
- Conhecimentos de Docker e Kubernetes
- Experiência com infraestrutura em nuvem na AWS ou GCP
- Pipelines de CI/CD (GitHub Actions, Jenkins)
- Redis para cache e filas
- Git e práticas de code review

Desejável:
- Terraform para infraestrutura como código
- Elasticsearch para busca
- Design de APIs GraphQL
- Filas de mensagens (RabbitMQ, Kafka)

Somos um time 100% remoto com uma cultura assíncrona.` },
  { id: "Financial Analyst", label: "Analista Financeiro", emoji: "💰", desc: "Modelagem financeira, FP&A, orçamento, forecast, Excel, Power BI, IFRS", text: `Analista Financeiro(a) (FP&A) — São Paulo

Nosso time de finanças procura um(a) Analista Financeiro(a) para apoiar a elaboração de orçamento, o forecast e a tomada de decisões em toda a empresa.

Requisitos:
- Pelo menos 3 anos de experiência em FP&A, análise financeira ou finanças corporativas
- Sólida modelagem financeira em Excel (tabelas dinâmicas, PROCV, fórmulas avançadas)
- Experiência conduzindo o ciclo anual de orçamento e os forecasts mensais
- Análise de variações e relatórios gerenciais para a diretoria
- Conhecimento de IFRS
- Criação de dashboards no Power BI
- Excelente gestão de stakeholders e comunicação

Diferenciais:
- Experiência com fechamento mensal e conciliações bancárias
- SQL para extrair dados do data warehouse
- Experiência em empresa em crescimento ou em uma Big Four

Oferecemos salário competitivo, verba para certificações e semana híbrida.` },
  { id: "Data Analyst", label: "Analista de Dados", emoji: "📊", desc: "SQL, Python, Pandas, Tableau, Power BI, BigQuery, testes A/B", text: `Analista de Dados — Porto Alegre

Procuramos um(a) analista orientado(a) a dados para transformar conjuntos de dados complexos em insights acionáveis para os nossos times de crescimento e produto.

Requisitos:
- Pelo menos 2 anos de experiência em análise de dados
- SQL sólido: consultas complexas sobre grandes volumes de dados
- Python com Pandas e NumPy para tratamento de dados
- Experiência com ferramentas de visualização de dados (Tableau, Power BI ou similares)
- Conhecimentos de estatística e metodologia de testes A/B
- Conhecimento de Google Analytics e BigQuery
- Excelente comunicação e capacidade de contar histórias com dados

Diferenciais:
- Noções de aprendizado de máquina (scikit-learn)
- Experiência com dbt para modelagem de dados
- Experiência em ambientes ágeis / Scrum
- Conhecimento de tratamento de dados conforme a LGPD

Você vai trabalhar com produto, engenharia e marketing em uma scale-up em pleno crescimento.` },
  { id: "Product Manager", label: "Product Manager", emoji: "📋", desc: "Estratégia de produto, roadmap, ágil, Jira, analytics, gestão de stakeholders", text: `Product Manager Sênior — São Paulo (Híbrido)

Procuramos um(a) Product Manager experiente para liderar uma área-chave de produto e impulsionar o crescimento da nossa plataforma.

Requisitos:
- Pelo menos 4 anos de experiência em gestão de produto em um ambiente SaaS B2B ou B2C
- Capacidade de definir a visão, a estratégia de produto e o roadmap de produto
- Experiência conduzindo sprints ágeis: Jira, Confluence e refinamento do backlog
- Mentalidade orientada a dados: SQL, Google Analytics, Mixpanel ou Amplitude
- Excelente gestão de stakeholders e comunicação
- Histórico comprovado de entregar funcionalidades da ideia ao lançamento
- Experiência escrevendo PRDs, histórias de usuário e critérios de aceite
- Conhecimento de princípios de design UX e trabalho com Figma

Diferenciais:
- Experiência em fintech, marketplaces ou SaaS
- Testes A/B e experimentação
- Experiência com OKRs e crescimento orientado ao produto

Venha para um time ágil onde as decisões de produto têm impacto real.` },
  { id: "DevOps Engineer", label: "Engenheiro DevOps", emoji: "⚙️", desc: "Kubernetes, Terraform, AWS, CI/CD, Docker, Linux, monitoramento, segurança", text: `Engenheiro(a) DevOps — Florianópolis (Aceita remoto)

Procuramos um(a) Engenheiro(a) DevOps para cuidar da nossa infraestrutura, dos pipelines de deploy e das operações em nuvem.

Requisitos:
- Pelo menos 3 anos de experiência em DevOps ou engenharia de plataforma
- Ampla experiência com Kubernetes (de preferência EKS ou GKE) e Helm
- Sólidos conhecimentos de Terraform para infraestrutura como código
- Infraestrutura em nuvem na AWS ou GCP: VPC, IAM, S3, RDS, Lambda
- Conteinerização com Docker e otimização de imagens
- Pipelines de CI/CD: GitHub Actions, ArgoCD ou Jenkins
- Administração de sistemas Linux e shell scripting (Bash)
- Monitoramento e observabilidade: Prometheus, Grafana, Datadog ou similares
- Boas práticas de segurança: gestão de segredos (Vault, AWS Secrets Manager), políticas de rede

Diferenciais:
- Experiência com service mesh (Istio, Linkerd)
- Deploys multirregião
- Python ou Go para automação

Trabalhamos 100% na AWS com um cluster Kubernetes de grande porte.` },
];

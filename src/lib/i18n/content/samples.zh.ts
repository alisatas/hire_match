import type { SampleJob } from "./types";

// Simplified Chinese sample postings, same order as SAMPLE_JOBS in cv-analyzer.tsx.
// Headings ("任职要求", "加分项", "我们提供"), the "N 年以上…经验" phrasing and terms such as
// "B2B销售" or "生成式AI" are written the way the analyzer recognises them (src/lib/languages.ts).
export const SAMPLE_JOBS: SampleJob[] = [
  {
    id: "AI Engineer",
    label: "AI 工程师",
    emoji: "🤖",
    desc: "Python、大模型、RAG、Embedding、向量数据库、LangChain、Evals、FastAPI、AWS",
    text: `AI 工程师 — 上海（混合办公）

我们正在招聘一名 AI 工程师，负责开发服务数千家客户的大模型功能。你将把生成式AI 从原型带到生产环境：检索、评测、部署和监控。

任职要求：
- 3 年以上软件或机器学习工程经验，Python 基础扎实
- 有基于 OpenAI 或 Anthropic API 开发大模型（LLM）应用的实战经历
- 检索增强生成（RAG）：Embedding、文本切分（Chunking），以及 pgvector、Pinecone 或 Weaviate 等向量数据库
- 熟悉 LangChain 或 LlamaIndex 等框架，了解 AI Agent 和 Function Calling
- Evals：能设计大模型评测集（LLM evaluation），衡量效果、延迟和成本
- 通过 API（FastAPI）完成模型部署，熟悉 Docker 和 AWS
- 提示词工程（Prompt Engineering），以及使用 Hugging Face 进行模型微调（Fine-tuning）
- 熟悉 CI/CD 和 Git，适应敏捷团队的协作方式

加分项：
- 有 MLOps 经历（MLflow、SageMaker 或 Vertex AI）
- 会用 TypeScript 开发内部工具
- 熟悉 SQL 和 PostgreSQL

我们提供有竞争力的薪资、学习基金和混合办公的工作方式。`,
  },
  {
    id: "Account Executive",
    label: "销售经理",
    emoji: "🤝",
    desc: "B2B SaaS 销售、客户开发、销售指标、Salesforce、HubSpot、商务谈判",
    text: `销售经理（B2B SaaS 销售）— 上海（混合办公）

我们正在招聘一名销售经理，负责华东地区中型客户的完整销售周期。你将负责客户开发和销售线索挖掘，在 Salesforce 中管理自己的销售漏斗，并按季度销售指标完成签单。

任职要求：
- 3 年以上销售工作经验，有 B2B销售或 SaaS 销售背景，做过销售经理或客户经理更佳
- 有持续完成销售指标并成功签单的业绩记录
- 熟练使用 Salesforce 或 HubSpot CRM
- 出色的商务谈判、需求挖掘和客户管理能力
- 能适应陌生拜访、电话销售等主动开发客户的工作方式
- 具备商务拓展意识，中英文沟通能力出色

加分项：
- 了解营销自动化，会用 Excel 做销售预测
- 熟悉 LinkedIn Sales Navigator

我们提供上不封顶的提成方案、混合办公的工作方式和培训预算。`,
  },
  {
    id: "Frontend Dev",
    label: "前端开发",
    emoji: "🎨",
    desc: "React、TypeScript、Next.js、Tailwind、GraphQL、Jest、CI/CD",
    text: `前端开发工程师 — 杭州（混合办公）

我们正在寻找一名技术扎实的前端开发工程师加入产品团队。你将开发响应式、高性能的 Web 应用，每天有数千名用户在使用。

任职要求：
- 3 年以上 React 和 TypeScript 开发经验
- 熟练掌握 Next.js、Tailwind CSS 和现代 CSS
- 有状态管理经验（Redux、Zustand 或同类方案）
- 熟悉 REST API 和 GraphQL
- 熟悉 Git 版本控制和 CI/CD 流水线（GitHub Actions）
- 了解无障碍（WCAG）和跨浏览器兼容性
- 有 Jest 和 Cypress 测试经验者优先
- 有敏捷 / Scrum 团队协作经验

加分项：
- 会用 Figma，能与 UX 设计师协作
- 了解 Node.js 及 BFF 模式
- 会用 Docker 搭建本地开发环境

我们提供有竞争力的薪资、灵活的混合办公和注重协作的团队氛围。`,
  },
  {
    id: "Digital Marketer",
    label: "数字营销",
    emoji: "📣",
    desc: "SEO、Google Ads、内容营销与邮件营销、GA4、HubSpot、营销活动管理",
    text: `数字营销专员 — 深圳（混合办公）

我们正在寻找一名数字营销专员，负责提升线上获客。你将负责 SEO 和付费搜索，开展跨渠道的营销活动，并汇报哪些做法有效。

任职要求：
- 2 年以上数字营销工作经验
- SEO 能力扎实：关键词研究、站内优化和内容 Brief 撰写
- 有 Google Ads（PPC / SEM）投放实战经历，管理过月度预算
- 有内容营销和邮件营销经历
- 负责过 LinkedIn 和 Meta 平台的社交媒体营销
- 能熟练使用 Google Analytics 和 Google Tag Manager 制作报表
- 用过 HubSpot 或其他营销自动化工具
- 数据驱动：A/B 测试和转化率优化（CRO）

加分项：
- 有成长期公司的增长营销（Growth Marketing）经历
- 掌握基础的 Excel 或 Looker Studio 技能

我们提供可以自由试验的营销预算、弹性工作时间和混合办公。`,
  },
  {
    id: "Backend Engineer",
    label: "后端开发",
    emoji: "⚙️",
    desc: "Node.js、Python、PostgreSQL、AWS、Docker、Kubernetes、Redis、Terraform",
    text: `后端开发工程师 — 远程办公（国内）

加入我们的研发团队，设计并开发支撑 SaaS 平台的高可扩展后端服务。

任职要求：
- 4 年以上 Node.js 或 Python 开发经验（FastAPI、Django）
- SQL 能力扎实，熟悉 PostgreSQL 者优先
- 有 REST API 和微服务的设计经历
- 熟悉 Docker 和 Kubernetes
- 有 AWS 或 GCP 云基础设施的使用经历
- 搭建过 CI/CD 流水线（GitHub Actions、Jenkins）
- 使用 Redis 做缓存和队列
- 熟悉 Git 和代码评审（Code Review）流程

加分项：
- 使用 Terraform 实现基础设施即代码
- 使用 Elasticsearch 做搜索
- GraphQL API 设计
- 用过消息队列（RabbitMQ、Kafka）

我们是一支全员远程的团队，以异步协作为先，现金储备足以支撑 5 年以上的运营。`,
  },
  {
    id: "Financial Analyst",
    label: "财务分析师",
    emoji: "💶",
    desc: "财务建模、FP&A、预算管理、财务预测、Excel、Power BI、IFRS",
    text: `财务分析师（FP&A）— 北京

我们的财务团队正在寻找一名财务分析师，为全公司的预算管理、财务预测和经营决策提供支持。

任职要求：
- 3 年以上 FP&A、财务分析或公司财务工作经验
- 财务建模能力扎实，熟练使用 Excel（数据透视表、高级函数）
- 主导过年度预算（Budgeting）编制和月度滚动预测
- 能为管理层做差异分析并编制管理报表
- 熟悉 IFRS，有月结和对账经历者优先
- 能熟练使用 Power BI 搭建数据看板
- 出色的沟通能力，善于与各业务部门协作（Stakeholder Management）

加分项：
- 会用 SQL 从数据仓库取数
- 有高速成长型公司或四大会计师事务所的工作背景

我们提供有竞争力的薪资、CFA 或 CPA 考试的学习补贴和混合办公。`,
  },
  {
    id: "Data Analyst",
    label: "数据分析师",
    emoji: "📊",
    desc: "SQL、Python、Pandas、Tableau、Power BI、BigQuery、Redshift、A/B 测试",
    text: `数据分析师 — 广州

我们正在寻找一名数据驱动的分析师，把复杂的数据集转化为增长团队和产品团队可以落地的洞察。

任职要求：
- 2 年以上数据分析工作经验
- SQL 能力扎实，能针对大数据集编写复杂查询
- 会用 Python 及 Pandas、NumPy 做数据处理
- 用过数据可视化工具（Tableau、Power BI 或同类工具）
- 了解统计学和 A/B 测试方法
- 熟悉 Google Analytics，以及 BigQuery 或 AWS Redshift
- 出色的沟通能力，善于用数据讲清楚结论

加分项：
- 具备机器学习基础（scikit-learn）
- 用过 dbt 做数据建模
- 有敏捷 / Scrum 团队的工作经历
- 了解 GDPR 等数据合规要求

你将在一家快速成长的公司，与产品经理、工程师和市场团队紧密协作。`,
  },
  {
    id: "Product Manager",
    label: "产品经理",
    emoji: "📋",
    desc: "产品策略、产品路线图、敏捷、Jira、数据分析、干系人管理",
    text: `高级产品经理 — 北京（混合办公）

我们正在寻找一名经验丰富的产品经理，负责核心产品线，推动整个平台的增长。

任职要求：
- 4 年以上产品管理工作经验，有 B2B 或 B2C SaaS 背景
- 能清晰地定义产品愿景、产品策略和产品路线图
- 有敏捷迭代的实战经历：Jira、Confluence 和需求池梳理
- 数据驱动：能熟练使用 SQL、Google Analytics、Mixpanel 或 Amplitude
- 出色的干系人管理和沟通能力
- 有把功能从构想推进到上线的成功记录
- 写过 PRD、用户故事和验收标准
- 了解 UX 设计原则，能使用 Figma 协作

加分项：
- 有金融科技、交易平台或 SaaS 行业背景
- 做过 A/B 测试和产品实验
- 具备基础技术知识（API、系统设计）
- 熟悉 OKR 和产品驱动增长（PLG）

加入一支节奏很快的团队，在这里，产品决策会产生实实在在的影响。`,
  },
  {
    id: "DevOps Engineer",
    label: "DevOps 工程师",
    emoji: "⚙️",
    desc: "Kubernetes、Terraform、AWS、CI/CD、Docker、Linux、监控、安全",
    text: `DevOps 工程师 — 成都（可远程办公）

我们正在招聘一名 DevOps 工程师，全面负责基础设施、部署流水线和云上运维。

任职要求：
- 3 年以上 DevOps 或平台工程经验
- 精通 Kubernetes（熟悉 EKS 或 GKE 者优先）和 Helm
- Terraform 能力扎实，能实现基础设施即代码
- 熟悉 AWS 或 GCP 云基础设施：VPC、IAM、S3、RDS、Lambda
- 熟悉 Docker 容器化和镜像优化
- 搭建过 CI/CD 流水线：GitHub Actions、ArgoCD 或 Jenkins
- 熟悉 Linux 系统管理和 Shell 脚本（Bash）
- 监控与可观测性：Prometheus、Grafana、Datadog 或同类工具
- 安全最佳实践：密钥管理（Vault、AWS Secrets Manager）、网络策略

加分项：
- 用过服务网格（Istio、Linkerd）
- 做过多地域部署
- 有成本优化意识（FinOps）
- 会用 Python 或 Go 编写自动化脚本

我们的业务全部运行在 AWS 上，有一个大规模的 Kubernetes 集群，需要一位能端到端负责的人。`,
  },
];

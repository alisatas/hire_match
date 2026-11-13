import type { RoleGuide } from "@/lib/roles";

// Simplified Chinese role guides. Same order and slugs as src/lib/roles.ts.
// Money examples use 元 instead of € (same figures) so they read naturally in mainland China.
export const ROLES: RoleGuide[] = [
  {
    slug: "ai-engineer",
    name: "AI 工程师",
    alsoCalled: ["大模型应用工程师", "LLM 工程师", "AIGC 工程师", "AI 应用开发工程师"],
    metaDescription:
      "AI 工程师简历关键词：大模型、RAG、Embedding、向量数据库、模型评测、模型部署等招聘方最常要求的技能。对照清单自查，再用 CVXray 免费比对你的简历和任意职位描述。",
    intro:
      "AI 工程师是科技行业增长最快的岗位，招聘要求也写得格外具体：用哪家的模型 API、检索方案怎么搭、效果如何评测、怎样上线。用人经理要看的是你把一个大模型功能从原型做到生产环境的证据，而不是只在 Notebook 里调过几次 API。",
    groups: [
      { title: "大模型与框架", keywords: ["大语言模型（LLM）", "OpenAI API", "Anthropic API", "LangChain", "LlamaIndex", "提示词工程", "Function Calling", "AI Agent"] },
      { title: "检索增强（RAG）", keywords: ["RAG", "Embedding", "向量数据库", "pgvector", "Pinecone", "Weaviate", "语义搜索", "文本切分（Chunking）"] },
      { title: "质量与部署", keywords: ["Evals", "大模型评测", "模型微调（Fine-tuning）", "Hugging Face", "模型部署", "MLOps", "MLflow", "Guardrails"] },
      { title: "工程基础", keywords: ["Python", "FastAPI", "TypeScript", "Docker", "AWS", "SQL", "CI/CD", "Git"] },
    ],
    tips: [
      { title: "写一个完整上线的大模型功能", text: "“基于 4 万篇客服文档搭建 RAG 问答助手，日均处理 3000 次查询”比罗列一串框架更有说服力。把模型、检索方案和规模都写出来。" },
      { title: "量化效果、延迟和成本", text: "AI 团队靠评测说话。“在 500 道题的评测集上把回答准确率从 71% 提升到 89%，同时单次查询成本降低 40%”，正是用人经理想看到的内容。" },
      { title: "别把软件工程能力藏起来", text: "大多数 AI 工程师岗位首先是工程岗位。API、测试、CI/CD 和云上部署应该和大模型项目一起写进简历。" },
    ],
    faqs: [
      { q: "AI 工程师的简历应该写哪些关键词？", a: "你用过的模型 API 和框架（OpenAI 或 Anthropic API、LangChain、LlamaIndex），检索相关的术语（RAG、Embedding，以及 pgvector 或 Pinecone 这类向量数据库），质量与部署方面的术语（Evals、微调、MLOps、模型部署），再加上工程基础：Python、FastAPI、Docker、云平台和 CI/CD。" },
      { q: "AI 工程师和机器学习工程师的简历有什么区别？", a: "机器学习工程师的简历以训练模型为核心：特征工程、PyTorch 或 TensorFlow、模型效果。AI 工程师的简历以基于大语言模型做产品为核心：提示词、RAG、评测、Agent，以及把大模型功能交付给用户。" },
    ],
  },
  {
    slug: "frontend-developer",
    name: "前端开发工程师",
    alsoCalled: ["前端工程师", "Web 前端开发", "React 开发工程师", "H5 开发工程师"],
    metaDescription:
      "前端开发工程师简历关键词：React、TypeScript、Next.js、自动化测试、无障碍等招聘方最常要求的技能。对照清单自查，再用 CVXray 免费比对你的简历和任意职位描述。",
    intro:
      "前端岗位的职位描述关键词密度特别高：框架、语言、样式方案、测试工具和交付流程，通常都会一一点名。招聘人员和筛选软件会在你的简历里找同样的词，所以把真正用过的工具按职位描述的写法写出来，在前端岗位上比在多数岗位上都更重要。",
    groups: [
      { title: "核心语言与框架", keywords: ["JavaScript", "TypeScript", "React", "Next.js", "Vue", "Angular", "HTML5", "CSS3"] },
      { title: "样式与 UI", keywords: ["Tailwind CSS", "Sass", "CSS Modules", "响应式设计", "设计系统", "Storybook", "Figma"] },
      { title: "状态与数据", keywords: ["Redux", "Zustand", "React Query", "REST API", "GraphQL", "WebSocket"] },
      { title: "质量与交付", keywords: ["Jest", "Cypress", "Playwright", "React Testing Library", "无障碍（WCAG）", "Core Web Vitals", "Git", "CI/CD", "GitHub Actions", "敏捷开发 / Scrum"] },
    ],
    tips: [
      { title: "把框架和成果写在同一句里", text: "“用 React 和 TypeScript 重构结算流程，加载时间缩短 40%”既有关键词，又有证据。单独一份技能清单只有关键词。" },
      { title: "写法与职位描述保持一致", text: "职位描述写的是“Next.js”和“Tailwind CSS”，你就照这样写，不要写成“NextJS”或“Tailwind”。简单的筛选规则只做字面匹配。" },
      { title: "别漏掉不起眼的词", text: "无障碍、测试和 CI/CD 出现在大多数前端职位描述里，却在大多数前端简历里缺席。做过就写上。" },
    ],
    faqs: [
      { q: "前端开发工程师的简历应该写哪些关键词？", a: "先写职位描述点名的技术栈，通常是 JavaScript、TypeScript 加 React 或其他框架；再补充样式（Tailwind CSS、Sass）、数据（REST API、GraphQL）、测试（Jest、Cypress、Playwright）和交付相关的词（Git、CI/CD、敏捷开发）。只写你确实用过的工具。" },
      { q: "前端简历里要写多少个关键词才够？", a: "没有固定数量。把这份职位描述反复提到或写进标题的技能覆盖到，每一项都配一条真实经历即可。针对一个职位写的简历，胜过堆满所有框架的简历。" },
    ],
  },
  {
    slug: "backend-engineer",
    name: "后端开发工程师",
    alsoCalled: ["后端工程师", "服务端开发工程师", "后台开发工程师"],
    metaDescription:
      "后端开发工程师简历关键词：编程语言、数据库、云服务、容器、API 设计等招聘方最常要求的技能。对照清单自查，再用 CVXray 免费比对你的简历和任意职位描述。",
    intro:
      "后端的职位描述与其说在描述一个人，不如说在描述一套系统：语言、数据库、云厂商、部署方式。你的简历会被拿来和这幅图逐项对照。出色的后端简历会把自己做过的每一层技术栈都写明，并配上规模或稳定性方面的数字。",
    groups: [
      { title: "语言与框架", keywords: ["Python", "Node.js", "Java", "Go", "C#", "Django", "FastAPI", "Express", "Spring Boot"] },
      { title: "数据与存储", keywords: ["SQL", "PostgreSQL", "MySQL", "MongoDB", "Redis", "Kafka", "Elasticsearch", "数据建模"] },
      { title: "云与基础设施", keywords: ["AWS", "Azure", "Google Cloud", "Docker", "Kubernetes", "Terraform", "Serverless", "CI/CD"] },
      { title: "架构与实践", keywords: ["REST API", "GraphQL", "gRPC", "微服务", "事件驱动架构", "认证鉴权（OAuth、JWT）", "单元测试与集成测试", "可观测性", "高并发 / 可扩展性"] },
    ],
    tips: [
      { title: "用数字说明规模", text: "QPS、数据量、延迟、可用性。“设计了日均承载 200 万次查询的 PostgreSQL 表结构”比“使用过 PostgreSQL”传达的信息多得多。" },
      { title: "写出具体的云服务，而不只是云厂商", text: "要求 AWS 的职位描述通常还会提到具体服务。如果你用过 Lambda、S3 或 RDS，就把它们和“AWS”写在一起。" },
      { title: "体现你对全流程负责", text: "设计、开发、部署、监控。后端岗位越来越看重值班（on-call）和可观测性方面的经验，有的话就写上。" },
    ],
    faqs: [
      { q: "后端开发工程师的简历应该写哪些关键词？", a: "职位描述里的语言和框架（比如 Python 搭配 Django 或 FastAPI，或者 Node.js），你用过的数据库（PostgreSQL、Redis、MongoDB），云和容器方面的经验（AWS、Docker、Kubernetes），以及 REST API、微服务、测试等架构相关的词。" },
      { q: "需要把我会的编程语言全部列出来吗？", a: "不需要。把职位描述要求的、明天面试就能聊的语言放在最前面。只碰过一次的语言列一长串，反而会冲淡真正重要的那几门。" },
    ],
  },
  {
    slug: "machine-learning-engineer",
    name: "机器学习工程师",
    alsoCalled: ["算法工程师", "ML 工程师", "MLOps 工程师", "机器学习平台工程师"],
    metaDescription:
      "机器学习工程师简历关键词：Python、PyTorch、模型训练、MLOps、模型部署等招聘方最常要求的技能。对照清单自查，再用 CVXray 免费比对你的简历和任意职位描述。",
    intro:
      "机器学习工程师的岗位介于数据科学和软件工程之间：既要把模型训练好，又要让它在生产环境稳定运行。只展示 Notebook 或只展示基础设施的简历，都漏掉了一半的筛选点。出色的简历会呈现完整闭环：数据、训练、评估、部署、监控。",
    groups: [
      { title: "建模", keywords: ["机器学习", "深度学习", "PyTorch", "TensorFlow", "scikit-learn", "特征工程", "模型评估"] },
      { title: "数据", keywords: ["Python", "SQL", "Pandas", "Spark", "数据管道", "Airflow", "特征平台（Feature Store）"] },
      { title: "MLOps 与部署", keywords: ["MLOps", "模型部署", "模型服务", "MLflow", "Kubeflow", "SageMaker", "Vertex AI", "模型监控"] },
      { title: "工程能力", keywords: ["Docker", "Kubernetes", "AWS", "CI/CD", "REST API", "Git", "单元测试"] },
    ],
    tips: [
      { title: "写一个已上线的模型，并附上指标", text: "“上线排序模型，日均提供 500 万次预测，点击率提升 8%”，一句话就交代了建模、规模和业务影响。" },
      { title: "写明你的 MLOps 工具链", text: "实验跟踪、模型仓库、模型服务和监控工具，在大多数职位描述里都会点名。MLflow、SageMaker 或 Vertex AI 都是直接就能匹配上的关键词。" },
      { title: "别把软件工程能力藏起来", text: "测试、CI/CD、容器和 API，正是筛选时区分机器学习工程师和数据科学家的地方。" },
    ],
    faqs: [
      { q: "机器学习工程师的简历应该写哪些关键词？", a: "Python 和一种深度学习框架（PyTorch 或 TensorFlow），scikit-learn 和特征工程，SQL、Spark 等数据工具，MLOps 与部署相关的词（MLflow、模型服务、监控、SageMaker 或 Vertex AI），以及 Docker、Kubernetes、CI/CD 等工程基础。" },
      { q: "机器学习工程师和数据科学家的简历有什么区别？", a: "数据科学家的简历强调分析、统计和实验。机器学习工程师的简历强调在生产环境中构建、部署和运维模型：数据管道、模型服务、监控和软件工程实践。" },
    ],
  },
  {
    slug: "software-engineer",
    name: "软件工程师",
    alsoCalled: ["软件开发工程师", "全栈工程师", "研发工程师"],
    metaDescription:
      "软件工程师简历关键词：编程语言、框架、云服务、测试、系统设计等招聘方最常要求的技能。对照清单自查，再用 CVXray 免费比对你的简历和任意职位描述。",
    intro:
      "“软件工程师”是科技行业里范围最宽的职位名称，所以岗位到底做什么，要看职位描述本身：这家公司指的是 Java 后端，那家是 TypeScript 全栈，另一家则是嵌入式 C++。千篇一律的简历在这里很吃亏。真正起作用的关键词，是职位描述里具体的语言、框架和平台，再加上每个研发团队都会考察的工程实践。",
    groups: [
      { title: "编程语言", keywords: ["Java", "Python", "TypeScript", "JavaScript", "C#", "Go", "C++", "Kotlin"] },
      { title: "框架与平台", keywords: ["React", "Node.js", "Spring Boot", ".NET", "Django", "REST API", "GraphQL", "微服务"] },
      { title: "数据与云", keywords: ["SQL", "PostgreSQL", "MongoDB", "Redis", "AWS", "Azure", "Docker", "Kubernetes"] },
      { title: "工程实践", keywords: ["系统设计", "数据结构与算法", "单元测试", "代码评审（Code Review）", "CI/CD", "Git", "敏捷开发 / Scrum", "代码规范"] },
    ],
    tips: [
      { title: "把职位要求的主力语言放在最前面", text: "如果这是一个 Java 岗位，Java 就该出现在个人简介和最近一份工作里，而不是埋在技能清单的中间。招聘人员往往只按读到的第一门语言来筛选。" },
      { title: "写清楚负责的范围，而不只是技术栈", text: "“设计了每月处理 300 万笔交易的支付服务”体现的是系统设计能力。面试官和筛选人员都在找你从头到尾做成一件事的证据。" },
      { title: "把工程实践写出来", text: "代码评审、测试、CI/CD 和值班出现在大多数软件工程师的职位描述里。每一项写一条具体的经历，胜过在清单里一笔带过。" },
    ],
    faqs: [
      { q: "软件工程师的简历应该写哪些关键词？", a: "职位描述点名的语言和框架（比如 Java 搭配 Spring Boot，或 TypeScript 搭配 React 和 Node.js），你用过的数据库和云平台，以及系统设计、单元测试、代码评审、CI/CD、Git 等工程实践。" },
      { q: "软件工程师的简历需要写“数据结构与算法”吗？", a: "很少需要把它单独当作关键词来写。更好的做法是通过工作成果来体现，比如做过的性能优化、解决过的扩容问题，算法题留给面试。" },
    ],
  },
  {
    slug: "data-scientist",
    name: "数据科学家",
    alsoCalled: ["算法工程师", "数据挖掘工程师", "应用科学家"],
    metaDescription:
      "数据科学家简历关键词：Python、机器学习、统计学、SQL、模型部署等招聘方最常要求的技能。对照清单自查，再用 CVXray 免费比对你的简历和任意职位描述。",
    intro:
      "数据科学家的岗位同时考察两件事：建模的深度（统计、机器学习、实验），以及让模型真正用起来所需的工程能力（SQL、数据管道、部署）。满篇算法、却不提业务影响或线上应用的简历，最容易卡在筛选这一关。",
    groups: [
      { title: "语言与库", keywords: ["Python", "R", "SQL", "Pandas", "NumPy", "scikit-learn", "PyTorch", "TensorFlow"] },
      { title: "建模与统计", keywords: ["机器学习", "统计学", "回归分析", "分类模型", "时间序列预测", "A/B 测试", "因果推断", "特征工程"] },
      { title: "数据与部署", keywords: ["Spark", "BigQuery", "Snowflake", "Airflow", "MLflow", "Docker", "AWS SageMaker", "模型部署"] },
      { title: "AI 与沟通", keywords: ["NLP", "大语言模型（LLM）", "深度学习", "数据可视化", "跨部门沟通", "实验设计"] },
    ],
    tips: [
      { title: "每个模型都对应一个被推动的指标", text: "“搭建流失预测模型，使退订率下降 12%”才是筛选人员要找的内容。只写模型准确率，读的人看不出这项工作有什么价值。" },
      { title: "证明模型上了线", text: "提一下部署、监控，或提供预测结果的数据管道。很多岗位会把只做过 Notebook 的候选人和能交付上线的候选人区分开。" },
      { title: "贴合职位描述的侧重点", text: "偏实验的岗位看重 A/B 测试和因果推断；偏机器学习工程的岗位看重部署和 MLOps。简历的重心要向眼前这个职位倾斜。" },
    ],
    faqs: [
      { q: "数据科学家的简历应该写哪些关键词？", a: "首先是 Python 和 SQL，然后是你常用的库（Pandas、scikit-learn、PyTorch 或 TensorFlow）、建模与统计方面的词（机器学习、回归分析、A/B 测试、预测），以及职位描述点名的数据或部署工具，比如 Spark、Airflow 或 MLflow。" },
      { q: "数据科学家和数据分析师的关键词有什么区别？", a: "数据分析师的职位描述以 SQL、数据看板和 Tableau、Power BI 等 BI 工具为核心。数据科学家的职位描述在此基础上增加了机器学习、统计学、Python 库和模型部署。" },
    ],
  },
  {
    slug: "account-executive",
    name: "销售经理",
    alsoCalled: ["客户经理", "大客户销售", "销售代表", "SaaS 销售顾问"],
    metaDescription:
      "销售经理简历关键词：销售指标、销售漏斗、Salesforce、客户开发、B2B SaaS 销售等招聘方最常要求的技能。对照清单自查，再用 CVXray 免费比对你的简历和任意职位描述。",
    intro:
      "销售岗位的职位描述读起来像一张计分表：销售指标、客单价、销售周期、CRM。招聘人员筛选销售简历时看的也是这几样，而且看得很快。只写工作职责不写数字，或者从头到尾没提用什么 CRM，即使经验再扎实，也很难进入候选名单。",
    groups: [
      { title: "销售方式", keywords: ["B2B销售", "SaaS 销售", "完整销售周期", "客户开发", "陌生拜访", "销售线索", "电话销售（Outbound）", "签单成交"] },
      { title: "业绩与指标", keywords: ["销售指标完成率", "销售漏斗管理", "客单价（ACV）", "赢单率", "销售预测", "营收增长", "增购", "续约"] },
      { title: "工具", keywords: ["Salesforce", "HubSpot", "CRM", "LinkedIn Sales Navigator", "Gong", "Outreach", "Excel"] },
      { title: "技能与方法", keywords: ["商务谈判", "客户管理", "商务拓展", "需求挖掘", "MEDDIC", "解决方案式销售", "关键决策人管理"] },
    ],
    tips: [
      { title: "每段经历都以指标完成情况开头", text: "“完成 120 万元业绩，指标 90 万元（完成率 133%）”是销售负责人最先找的内容。把它放在每份工作的第一条，而不是埋在最后。" },
      { title: "写明客单价和销售周期", text: "中型客户和大客户岗位，招的是真正做过这类单子的人。平均合同金额和成交周期，能让读的人一眼判断你是否合适。" },
      { title: "写出 CRM 和销售方法论的名字", text: "Salesforce 或 HubSpot 出现在大多数职位描述里，不少还会点名 MEDDIC 这类客户评估方法。用过就写出来。" },
    ],
    faqs: [
      { q: "销售经理的简历应该写哪些关键词？", a: "B2B销售或 SaaS 销售、销售指标完成率、销售漏斗管理、客户开发与成交、你使用的 CRM（通常是 Salesforce 或 HubSpot）、商务谈判和客户管理，每一项都配一个数字，比如签单金额或指标完成率。" },
      { q: "怎样在简历上展示销售业绩？", a: "用你的上级考核你时用的那些指标：指标完成率、签单金额、平均客单价、赢单率和团队内排名。每段经历写一个具体数字，胜过罗列一串职责。" },
    ],
  },
  {
    slug: "digital-marketing-specialist",
    name: "数字营销专员",
    alsoCalled: ["数字营销经理", "市场推广专员", "效果营销经理", "增长营销经理"],
    metaDescription:
      "数字营销专员简历关键词：SEO、Google Ads、内容营销、邮件营销、数据分析、营销自动化等招聘方最常要求的技能。对照清单自查，再用 CVXray 免费比对你的简历和任意职位描述。",
    intro:
      "数字营销的职位描述会把渠道和工具写得很明确：SEO、付费搜索、社交媒体、邮件，以及背后的数据分析和自动化工具。只写“负责营销活动”，却不提渠道、预算和结果的通用型简历，最容易被跳过。",
    groups: [
      { title: "渠道", keywords: ["SEO", "SEM / PPC", "Google Ads", "Meta Ads", "内容营销", "邮件营销", "社交媒体营销", "联盟营销"] },
      { title: "数据分析与测试", keywords: ["Google Analytics（GA4）", "Google Tag Manager", "A/B 测试", "转化率优化（CRO）", "归因分析", "KPI 报表", "Looker Studio"] },
      { title: "工具与自动化", keywords: ["HubSpot", "营销自动化", "Mailchimp", "Klaviyo", "Semrush", "Ahrefs", "CMS（WordPress）", "Canva"] },
      { title: "策略", keywords: ["营销活动管理", "预算管理", "获客", "转化漏斗优化", "品牌营销", "文案撰写", "增长营销"] },
    ],
    tips: [
      { title: "每个渠道都配一个数字", text: "“9 个月内自然流量增长 180%”，或“Google Ads 单条线索成本从 42 元降到 19 元”：渠道、指标和时间范围，一句话写全。" },
      { title: "写明你管理的预算", text: "投放岗位是按预算量级招人的。“每月管理 2.5 万元的 Google 和 Meta 投放预算”能让人立刻知道你在哪个量级。" },
      { title: "列出职位描述用到的工具", text: "GA4、Tag Manager、HubSpot、Semrush，工具名都是直接就能匹配上的关键词，招聘人员也会按它们来筛选。" },
    ],
    faqs: [
      { q: "数字营销专员的简历应该写哪些关键词？", a: "你负责的渠道（SEO、Google Ads、Meta Ads、邮件、内容、社交媒体），数据分析工具（GA4、Google Tag Manager），HubSpot 等自动化和 CRM 工具，以及转化率优化、获客、预算管理等结果导向的词。" },
      { q: "营销简历需要写数据指标吗？", a: "需要。流量、转化率、获客成本、广告支出回报率（ROAS）和带来的营收，正是用人经理比较候选人时看的东西。每段经历至少写一个。" },
    ],
  },
  {
    slug: "financial-analyst",
    name: "财务分析师",
    alsoCalled: ["FP&A 分析师", "财务 BP", "经营分析师", "预算分析师"],
    metaDescription:
      "财务分析师简历关键词：财务建模、FP&A、预算管理、财务预测、Excel、Power BI 等招聘方最常要求的技能。对照清单自查，再用 CVXray 免费比对你的简历和任意职位描述。",
    intro:
      "财务分析师的职位描述围绕一个循环展开：预算、预测、结账、报告，以及支撑这个循环的工具。招聘人员会在你的简历里找同样的词，还要找你的数字影响过某项决策的证据。只写“Excel”，却不说建了什么模型、给谁用，这样的简历很难脱颖而出。",
    groups: [
      { title: "规划与分析", keywords: ["FP&A", "财务建模", "预算管理", "财务预测", "差异分析", "情景分析", "商业论证（Business Case）"] },
      { title: "报告与会计", keywords: ["管理报表", "月结", "对账", "IFRS", "GAAP", "损益表（P&L）", "现金流"] },
      { title: "工具", keywords: ["Excel（数据透视表、高级函数）", "Power BI", "SQL", "SAP", "Oracle NetSuite", "Anaplan"] },
      { title: "技能", keywords: ["业务部门沟通", "财务分析", "数据呈现", "KPI 报表", "成本控制", "流程优化"] },
    ],
    tips: [
      { title: "写出你的分析推动了什么决策", text: "“搭建定价模型，支撑了一次 6% 的提价，增收 180 万元”比“负责财务模型”有力得多。" },
      { title: "写明你负责的周期", text: "年度预算、滚动预测、月结，写清楚哪些由你主导，以及对应的业务规模（收入、成本中心、法人主体）。" },
      { title: "把 Excel 和 BI 写具体", text: "每份财务简历上都有“Excel”。写出你的水平：财务模型、数据透视表、Power Query，再加上职位描述点名的 BI 工具，比如 Power BI。" },
    ],
    faqs: [
      { q: "财务分析师的简历应该写哪些关键词？", a: "FP&A、财务建模、预算管理、财务预测和差异分析；管理报表、月结、IFRS 或 GAAP 等报告方面的词；以及职位描述点名的工具，几乎一定有 Excel，常见的还有 Power BI、SQL 或 SAP 这类 ERP。" },
      { q: "怎样在财务简历上体现工作成果？", a: "把工作和钱或决策挂钩：发现的可节省金额、预测准确率的提升、你负责的预算、获得批准的商业论证。每段经历写一个具体数字就够了。" },
    ],
  },
  {
    slug: "project-manager",
    name: "项目经理",
    alsoCalled: ["IT 项目经理", "项目群经理", "项目负责人", "PMO"],
    metaDescription:
      "项目经理简历关键词：项目计划、风险管理、干系人管理、敏捷、PMP、预算管理等招聘方最常要求的技能。对照清单自查，再用 CVXray 免费比对你的简历和任意职位描述。",
    intro:
      "项目经理的岗位筛选看三样：你用什么方法，你交付过多大的项目，你怎样处理人和风险。招聘人员会找方法论的名字（敏捷、Scrum、PRINCE2、PMP），也会找数字：预算、团队规模、周期，以此判断你能扛多大的盘子。",
    groups: [
      { title: "方法与认证", keywords: ["项目管理", "敏捷", "Scrum", "瀑布模型", "PRINCE2", "PMP", "看板（Kanban）"] },
      { title: "交付", keywords: ["项目计划", "范围管理", "风险管理", "预算管理", "资源规划", "里程碑", "变更管理"] },
      { title: "人员协作", keywords: ["干系人管理", "跨部门团队", "供应商管理", "沟通协调", "项目进度汇报", "项目指导委员会"] },
      { title: "工具", keywords: ["Jira", "Confluence", "MS Project", "Asana", "Smartsheet", "Excel"] },
    ],
    tips: [
      { title: "先写规模和结果", text: "“交付 200 万元的 ERP 上线项目，覆盖 4 个国家，按期完成且比预算节省 6%”，用人经理一眼就知道你能扛什么样的项目。" },
      { title: "写出方法论和证书的名字", text: "PRINCE2、PMP、Scrum Master，有证书就放在靠前的位置。很多岗位会直接按证书筛选。" },
      { title: "写出你是怎样应对风险的", text: "用一句话写你提前发现的一个风险和采取的措施，比罗列一串工具更能体现资深程度。" },
    ],
    faqs: [
      { q: "项目经理的简历应该写哪些关键词？", a: "项目管理、你使用的方法（敏捷、Scrum、瀑布模型、PRINCE2）、PMP 等证书、交付方面的词（项目计划、范围管理、风险管理和预算管理）、人员协作能力（干系人管理和供应商管理），以及你管理项目用的工具，通常是 Jira、Confluence 或 MS Project。" },
      { q: "简历上写 PMP 好还是 PRINCE2 好？", a: "职位描述点名哪个就写哪个。PRINCE2 在英国和欧洲更常见，PMP 在美国和跨国公司更常见；两者都受认可，写上雇主要求的那一个，就是一次直接的关键词匹配。" },
    ],
  },
  {
    slug: "recruiter",
    name: "招聘专员",
    alsoCalled: ["招聘顾问", "人才招聘专员", "技术招聘", "HR 招聘"],
    metaDescription:
      "招聘专员简历关键词：人才寻访、招聘全流程、ATS 招聘系统、用人部门沟通、招聘周期等招聘方最常要求的技能。对照清单自查，再用 CVXray 免费比对你的简历和任意职位描述。",
    intro:
      "招聘专员天天写职位描述，可自己的简历往往是一堆简历里最含糊的。招聘岗位筛选时看的是：你经手的招聘量、你招哪些岗位、你用什么工具寻访候选人，以及考核你的是哪些指标。",
    groups: [
      { title: "招聘", keywords: ["招聘全流程", "候选人寻访", "猎头", "技术招聘", "简历筛选", "面试", "Offer 谈判"] },
      { title: "工具", keywords: ["招聘系统（ATS）", "Greenhouse", "Workday", "LinkedIn Recruiter", "布尔搜索（Boolean Search）", "Lever", "Excel"] },
      { title: "指标", keywords: ["招聘周期", "单人招聘成本", "Offer 接受率", "招聘漏斗报表", "招聘质量", "招聘目标"] },
      { title: "业务协作", keywords: ["干系人管理", "用人部门沟通", "雇主品牌", "候选人体验", "多元化招聘", "入职引导"] },
    ],
    tips: [
      { title: "量化你的招聘成果", text: "“12 个月内招聘 45 名工程师，Offer 接受率 92%”，这就相当于销售的业绩指标，放在最前面。" },
      { title: "说明你招的是哪类岗位", text: "技术、销售、高管、批量招聘，职位描述通常有明确的方向，你的个人简介也应该如此。" },
      { title: "列出 ATS 和寻访工具", text: "Greenhouse、Workday、LinkedIn Recruiter 和布尔搜索，都是招聘岗位职位描述里直接就能匹配上的关键词。" },
    ],
    faqs: [
      { q: "招聘专员的简历应该写哪些关键词？", a: "招聘全流程、候选人寻访和你负责招聘的岗位类型；你使用的招聘系统和寻访工具（Greenhouse、Workday、LinkedIn Recruiter、布尔搜索）；招聘周期、Offer 接受率等指标；以及干系人管理、雇主品牌等协作方面的词。" },
      { q: "招聘专员怎样在简历上展示成果？", a: "用招聘数据：招到的岗位数、招聘周期、Offer 接受率、单人招聘成本或招聘目标完成情况。你的下一任上级也会用这些指标来衡量你。" },
    ],
  },
  {
    slug: "customer-success-manager",
    name: "客户成功经理",
    alsoCalled: ["客户成功专员", "CSM", "客户运营经理", "客户经理"],
    metaDescription:
      "客户成功经理简历关键词：客户留存、客户流失、客户上线、续约、增购、CRM 等招聘方最常要求的技能。对照清单自查，再用 CVXray 免费比对你的简历和任意职位描述。",
    intro:
      "客户成功岗位是用留存来衡量的：流失、续约、增购和客户健康度。招聘人员要看你管理的客户盘子有多大，你做哪些关键动作（客户上线、QBR、续约），以及背后用什么工具。一份没有留存数字的客户成功简历，很容易被略过。",
    groups: [
      { title: "留存与增长", keywords: ["客户留存", "降低客户流失", "续约", "增购", "扩容收入", "净收入留存率（NRR）"] },
      { title: "客户生命周期", keywords: ["客户上线（Onboarding）", "产品采用率", "季度业务回顾（QBR）", "客户健康度评分", "客户问题升级处理", "客户旅程"] },
      { title: "工具", keywords: ["Salesforce", "HubSpot", "Gainsight", "Zendesk", "Intercom", "CRM", "Excel"] },
      { title: "技能", keywords: ["客户管理", "干系人管理", "SaaS", "产品知识", "沟通能力", "商务谈判"] },
    ],
    tips: [
      { title: "把留存放在最前面", text: "“管理 40 家客户、合计 300 万元的合同盘子，总留存率 96%，NRR 118%”，这正是用人经理扫简历时要找的那一行。" },
      { title: "写出你做的关键动作", text: "客户上线计划、QBR、健康度评分、续约打法，把名字写出来，并写上它们带来的结果。" },
      { title: "写明你的客户成功工具", text: "Gainsight、Salesforce、HubSpot 或 Zendesk 出现在大多数职位描述里，都是很容易匹配上的关键词。" },
    ],
    faqs: [
      { q: "客户成功经理的简历应该写哪些关键词？", a: "客户留存、降低客户流失、续约、增购和 NRR；客户上线、产品采用率、QBR、健康度评分等生命周期方面的词；你使用的工具（Gainsight、Salesforce、HubSpot、Zendesk）；以及客户管理和干系人管理。" },
      { q: "客户成功简历上应该写哪些指标？", a: "总收入留存率和净收入留存率、流失率、续约率、扩容收入、管理的客户数量和合同金额，以及 NPS 等客户满意度指标。" },
    ],
  },
  {
    slug: "data-analyst",
    name: "数据分析师",
    alsoCalled: ["商业分析师", "BI 分析师", "业务数据分析师"],
    metaDescription:
      "数据分析师简历关键词：SQL、Python、Tableau、Power BI、A/B 测试等招聘方最常要求的技能。对照清单自查，再用 CVXray 免费比对你的简历和任意职位描述，找出缺失的关键词。",
    intro:
      "数据分析师的职位描述可以分成三部分：怎么取数（SQL、数据仓库），怎么分析（Python、统计），怎么讲清楚结论（数据看板、业务沟通）。只写工具、不提业务结果，是合格的分析师被筛掉的最常见原因。",
    groups: [
      { title: "取数与数据仓库", keywords: ["SQL", "PostgreSQL", "BigQuery", "Snowflake", "Redshift", "ETL", "dbt", "数据建模"] },
      { title: "分析", keywords: ["Python", "Pandas", "NumPy", "R", "Excel", "统计学", "A/B 测试", "回归分析", "预测"] },
      { title: "可视化与 BI", keywords: ["Tableau", "Power BI", "Looker", "数据看板", "数据可视化", "KPI 报表"] },
      { title: "业务能力", keywords: ["干系人管理", "需求梳理", "数据呈现", "产品分析", "数据质量"] },
    ],
    tips: [
      { title: "先写决策，再写看板", text: "“用 Tableau 搭建流失分析看板，推动了一次定价调整，带来 30 万元收益”胜过“用 Tableau 搭建数据看板”。" },
      { title: "把 SQL 水平写具体", text: "如果你会用窗口函数、CTE 或做过查询优化，就写出来。只写“SQL”，没法把你和只写过一条 SELECT 的人区分开。" },
      { title: "BI 工具要一字不差地对上", text: "在关键词筛选看来，Tableau、Power BI 和 Looker 不能互相替代。用过职位描述里的那个就写那个；没用过，就写最接近的那个。" },
    ],
    faqs: [
      { q: "数据分析师的简历应该写哪些关键词？", a: "首先是 SQL，它几乎出现在每一份职位描述里；然后是你使用的分析工具（Python、Pandas、Excel、R）、职位描述点名的 BI 工具（Tableau、Power BI 或 Looker）、A/B 测试和统计学等方法，以及干系人管理、KPI 报表等业务方面的词。" },
      { q: "数据分析师的简历一定要写 Python 吗？", a: "很多职位描述要求 Python，也有一些只要 SQL 和一种 BI 工具。看具体职位：如果任职要求里出现了 Python，就写上，并举一个你用它做了什么的例子。" },
    ],
  },
  {
    slug: "product-manager",
    name: "产品经理",
    alsoCalled: ["产品负责人（PO）", "技术产品经理", "高级产品经理"],
    metaDescription:
      "产品经理简历关键词：产品路线图、需求挖掘、数据指标、干系人管理、敏捷等招聘方最常要求的技能。对照清单自查，再用 CVXray 免费比对你的简历和任意职位描述，找出缺失的关键词。",
    intro:
      "产品经理的职位描述里工具名少，讲流程和结果的话多，所以更难凭感觉去匹配。真正算数的词，是描述团队怎样决定做什么、怎样交付、怎样衡量成功的那些词。你的简历需要用同一套语言，并且配上数字。",
    groups: [
      { title: "策略与需求挖掘", keywords: ["产品策略", "产品路线图", "需求挖掘（Discovery）", "用户研究", "用户访谈", "市场分析", "优先级排序", "OKR"] },
      { title: "交付", keywords: ["敏捷", "Scrum", "看板（Kanban）", "需求池管理", "用户故事", "迭代规划", "产品上市（GTM）", "跨部门团队"] },
      { title: "数据与指标", keywords: ["KPI", "A/B 测试", "产品分析", "SQL", "转化率", "留存率", "实验"] },
      { title: "工具与协作", keywords: ["Jira", "Confluence", "Figma", "Amplitude", "Mixpanel", "干系人管理", "沟通能力"] },
    ],
    tips: [
      { title: "每一条经历都要有指标", text: "采用率、营收、留存、转化、节省的时间。没有数字的产品经理简历，读起来像项目协调员的简历。" },
      { title: "使用职位描述里讲流程的词", text: "如果职位描述写了“需求挖掘”“OKR”和“实验”，在确实相符的地方，就用这些词来描述你的工作。" },
      { title: "写出你决定不做什么", text: "排优先级是这份工作的核心。用一句话写你做过的一次取舍和理由，比罗列一串上线的功能更能体现资深程度。" },
    ],
    faqs: [
      { q: "产品经理的简历应该写哪些关键词？", a: "产品路线图、产品策略、需求挖掘、优先级排序、干系人管理、敏捷或 Scrum，以及你负责的指标（留存、转化、营收）。再加上职位描述点名的工具，常见的有 Jira、Figma，以及 Amplitude 或 Mixpanel 这类分析产品。" },
      { q: "产品经理的简历需要写技术类关键词吗？", a: "技术产品经理岗位需要，任职要求里常会出现 API、SQL 和系统设计方面的词。其他产品经理岗位，数据分析和实验方面的词通常比工程方面的更重要。" },
    ],
  },
  {
    slug: "devops-engineer",
    name: "DevOps 工程师",
    alsoCalled: ["运维开发工程师", "SRE 工程师", "平台工程师", "云平台工程师"],
    metaDescription:
      "DevOps 工程师简历关键词：Kubernetes、Terraform、AWS、CI/CD、监控告警等招聘方最常要求的技能。对照清单自查，再用 CVXray 免费比对你的简历和任意职位描述，找出缺失的关键词。",
    intro:
      "在所有工程岗位里，DevOps 的职位描述最依赖工具，而且每家公司用的工具都不一样：这个团队用 Terraform 和 GitHub Actions，那个团队用 Pulumi 和 GitLab CI。让简历对上职位描述里的具体工具链，同时体现出底层可迁移的实践能力，才能让它被认真读完。",
    groups: [
      { title: "云与容器", keywords: ["AWS", "Azure", "Google Cloud", "Docker", "Kubernetes", "Helm", "Serverless"] },
      { title: "基础设施即代码与自动化", keywords: ["Terraform", "Ansible", "CloudFormation", "Pulumi", "Bash", "Python", "GitOps"] },
      { title: "CI/CD", keywords: ["GitHub Actions", "GitLab CI", "Jenkins", "Argo CD", "部署流水线", "发布自动化"] },
      { title: "稳定性与安全", keywords: ["Linux", "监控告警", "Prometheus", "Grafana", "Datadog", "故障响应", "SLO", "网络", "安全 / DevSecOps"] },
    ],
    tips: [
      { title: "量化稳定性和速度", text: "部署频率、交付周期、可用性、故障恢复时间、节省的成本。“把部署时间从 45 分钟缩短到 6 分钟”就是能换来面试的那种句子。" },
      { title: "把同类工具明确对应起来", text: "如果职位描述要 GitLab CI，而你熟悉的是 GitHub Actions，就写出你用的工具，同时用“CI/CD 流水线”这样的通用说法，让筛选规则和人都能看出你是合适的。" },
      { title: "职位描述要求证书时就写上", text: "AWS、Azure 和 Kubernetes（CKA）认证经常出现在任职要求里，有证书的话，是很容易匹配上的关键词。" },
    ],
    faqs: [
      { q: "DevOps 工程师的简历应该写哪些关键词？", a: "你使用的云平台（AWS、Azure 或 Google Cloud）、Docker 和 Kubernetes、Terraform 这类基础设施即代码工具、你的 CI/CD 系统（GitHub Actions、GitLab CI 或 Jenkins）、Linux、Bash 或 Python 脚本，以及 Prometheus、Grafana 等监控工具。" },
      { q: "在简历上，DevOps 和 SRE 是一回事吗？", a: "两者的工具链高度重合，但 SRE 的职位描述更看重稳定性方面的表述：SLO、故障响应、值班、容量规划。投哪个职位，就用哪个职位的那套词。" },
    ],
  },
  {
    slug: "ux-designer",
    name: "UX 设计师",
    alsoCalled: ["交互设计师", "产品设计师", "UI/UX 设计师", "用户体验设计师"],
    metaDescription:
      "UX 设计师简历关键词：Figma、用户研究、原型设计、可用性测试、设计系统等招聘方最常要求的技能。对照清单自查，再用 CVXray 免费比对你的简历和任意职位描述，找出缺失的关键词。",
    intro:
      "UX 设计师的作品集展示的是作品，但先得靠简历让人愿意打开作品集。职位描述会点名具体的方法（研究、测试、原型）和工具（几乎一定有 Figma）。如果简历用另一套说法描述同样的流程，即使经验很强，匹配度也可能很低。",
    groups: [
      { title: "研究", keywords: ["用户研究", "可用性测试", "用户访谈", "用户画像", "用户旅程地图", "问卷调研", "竞品分析"] },
      { title: "设计", keywords: ["线框图", "原型设计", "交互设计", "信息架构", "视觉设计", "响应式设计", "设计系统"] },
      { title: "工具", keywords: ["Figma", "Sketch", "Adobe XD", "Miro", "FigJam", "Maze"] },
      { title: "协作与规范", keywords: ["无障碍（WCAG）", "设计思维", "敏捷", "设计交付（Handoff）", "干系人管理", "A/B 测试"] },
    ],
    tips: [
      { title: "写出设计带来的结果", text: "任务完成率、转化率、客服工单量、满意度评分。“重新设计新手引导流程，激活率从 31% 提升到 44%”应该写在简历上，而不是只放在案例里。" },
      { title: "把方法的名字写全", text: "写“可用性测试”和“用户访谈”，不要只写“研究”。职位描述是把它们分开列的，关键词筛选也是分开匹配的。" },
      { title: "简历以文字为主", text: "设计感很重的 PDF 在被解析时可能丢失文字。投递时用简洁的单栏排版，视觉表现交给作品集。" },
    ],
    faqs: [
      { q: "UX 设计师的简历应该写哪些关键词？", a: "Figma、用户研究、可用性测试、线框图、原型设计、交互设计和设计系统，可以覆盖大多数职位描述。有相关经验的话，再加上无障碍（WCAG）、用户旅程地图，以及设计交付、敏捷等协作方面的词。" },
      { q: "UX 设计师的简历需要做得很有设计感吗？", a: "保持简洁易读，不必追求繁复。图片里的文字和复杂的多栏排版，在 PDF 被解析时经常丢失，关键词也就到不了招聘人员的搜索结果里。" },
    ],
  },
  // 医疗护理与物流：关键词尽量采用评分引擎能识别的写法（languages.ts 中的
  // LOCALIZED_SKILL_ALIASES.healthcare / .logistics）。
  {
    slug: "registered-nurse",
    name: "护士",
    alsoCalled: ["注册护士", "临床护士", "病房护士", "责任护士"],
    metaDescription:
      "护士简历关键词：患者护理、电子病历、给药、感染控制、基础生命支持（BLS）等招聘方最常要求的技能。对照清单自查，再用 CVXray 免费比对你的简历和任意职位描述。",
    intro:
      "护理岗位的职位描述围绕工作场景和一组临床职责来写：科室、患者群体、病历系统、资质证书。医院的招聘人员会在招聘系统里搜索这些原词。职位描述写的是“患者护理”和“给药”，简历上却写“照顾病人”，哪怕在病房干了很多年，也可能被略过。",
    groups: [
      { title: "临床护理", keywords: ["患者护理", "给药", "生命体征监测", "伤口护理", "护理计划", "护理评估", "静脉输液", "健康宣教"] },
      { title: "记录与合规", keywords: ["电子病历（EMR / EHR）", "Epic EMR", "护理记录", "患者隐私保护（HIPAA）", "感染控制", "患者安全", "护理协调"] },
      { title: "执业资格与证书", keywords: ["护士执业证书", "护理学本科", "基础生命支持（BLS）", "高级心血管生命支持（ACLS）", "儿科高级生命支持（PALS）", "护士执业资格考试"] },
      { title: "科室与团队协作", keywords: ["急症护理", "内外科病房", "ICU", "急诊科", "出院计划", "多学科团队", "临床带教", "护理组长"] },
    ],
    tips: [
      { title: "写明科室、护患比和患者群体", text: "“内外科病房责任护士，32 张床位，护患比 1:5”，一句话就把“经验丰富的护士”说不清的事告诉了护士长。科室和负责的患者数量，是他们最先筛选的内容。" },
      { title: "证书写全称，并附上缩写", text: "“基础生命支持（BLS）”两种写法都能被搜到。再加上发证机构和有效期，证书过期是常见的被拒原因。" },
      { title: "写出病历系统的名字", text: "职位描述常会要求用过某个具体的电子病历系统，比如 Epic 或 Cerner。如果你用它写过护理记录，就把系统名写在“护理记录”旁边，而不是写“熟悉电脑操作”。" },
    ],
    faqs: [
      { q: "护士的简历应该写哪些关键词？", a: "患者护理、给药、生命体征、伤口护理、护理计划和护理记录，可以覆盖大多数职位描述列出的职责。再加上你用过的病历系统（电子病历、Epic）、合规方面的词（患者隐私保护、感染控制），以及执业证书和各类证书：护士执业证书、BLS，以及 ACLS、PALS 等专科证书。" },
      { q: "护士简历需要把所有证书都列出来吗？", a: "列出仍在有效期内的，以及职位描述要求的，每一项都写上有效期。执业证书和其他证书放在靠前的位置：对护理岗位来说，它们是一票否决的硬性条件，而不是细枝末节。" },
    ],
  },
  {
    slug: "logistics-coordinator",
    name: "物流专员",
    alsoCalled: ["供应链专员", "物流协调员", "供应链分析师", "运输计划员"],
    metaDescription:
      "物流专员简历关键词：供应链管理、库存管理、WMS、货运、采购等招聘方最常要求的技能。对照清单自查，再用 CVXray 免费比对你的简历和任意职位描述，找出缺失的关键词。",
    intro:
      "物流和供应链的职位描述读起来像一张业务地图：你要负责哪些环节（入库、仓储、运输），用哪些系统（ERP、WMS、TMS），用哪些数字考核你。招聘人员会在你的简历里找同样的系统和同样的指标，所以把它们写出来，再配上业务量或成本数字，就完成了大半的工作。",
    groups: [
      { title: "计划与库存", keywords: ["供应链管理", "库存管理", "需求计划", "S&OP", "采购", "需求预测", "订单履约"] },
      { title: "运输与仓储", keywords: ["货运", "仓储管理", "第三方物流（3PL）", "车队管理", "最后一公里配送", "线路规划", "报关清关", "Incoterms"] },
      { title: "系统", keywords: ["WMS", "SAP MM", "ERP", "TMS", "Excel", "Power BI", "EDI"] },
      { title: "绩效与实践", keywords: ["准时足量交付率（OTIF）", "降本", "KPI 报表", "供应商管理", "承运商谈判", "精益（Lean）", "持续改进"] },
    ],
    tips: [
      { title: "每一条都写上业务量", text: "每周发运票数、SKU 数量、仓库面积、运费支出。“每周协调 4 家承运商、120 票出库发运”能体现你管得了多大规模的业务。" },
      { title: "写系统的名字，而不是类别", text: "“SAP MM”或你用过的 WMS 能和职位描述对上；“ERP 软件”能对上的就少得多。把通用说法写在旁边，两种都能被搜到。" },
      { title: "写出你推动的指标", text: "准时交付率、单票运输成本、库存准确率、交付周期。“把 OTIF 从 91% 提升到 97%”就是物流经理要找的那句话。" },
    ],
    faqs: [
      { q: "物流专员的简历应该写哪些关键词？", a: "供应链管理、库存管理、货运、仓储管理和采购，可以覆盖大多数职位描述。再加上你用过的系统（WMS、SAP MM 或其他 ERP、TMS）、需求计划和 S&OP 等计划方面的词，以及考核你的指标：准时交付率、成本和库存准确率。" },
      { q: "物流简历和供应链简历有什么区别？", a: "物流岗位的职位描述以货物的运输和存储为核心：货运、承运商、仓储、最后一公里配送。供应链岗位的范围更宽，增加了计划和寻源：需求计划、S&OP、采购、供应商管理。投哪个职位，就先用哪个职位的那套词。" },
    ],
  },
];

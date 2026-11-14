import type { Post } from "@/lib/posts";

export const POSTS: Post[] = [
  {
    slug: "how-ats-reads-your-cv",
    title: "Como os sistemas de rastreamento de candidatos (ATS) leem seu currículo de verdade",
    seoTitle: "Como um ATS lê seu currículo de verdade",
    description:
      "O que um ATS faz com seu currículo, por que a \"rejeição automática de 75%\" é um mito e qual formato e palavras-chave fazem você ser encontrado.",
    published: "2026-11-11",
    updated: "2026-11-11",
    minutes: 6,
    relatedRoles: ["software-engineer", "account-executive", "recruiter"],
    sections: [
      {
        heading: "O que é um ATS",
        blocks: [
          { type: "p", text: "Um sistema de rastreamento de candidatos (ATS, na sigla em inglês) é o software que a empresa usa para receber candidaturas, mover os candidatos pelas etapas do processo seletivo e manter um registro de cada contratação. Gupy, Greenhouse, Workday, Lever e muitos outros fazem, em linhas gerais, a mesma coisa: transformam uma pilha de currículos em um banco de dados pesquisável." },
          { type: "p", text: "Quando você se candidata, o ATS guarda seu currículo e normalmente tenta processá-lo: extrai seu nome, contato, cargos, empresas, datas, formação e habilidades e coloca tudo em campos estruturados. Depois, os recrutadores revisam as candidaturas, filtram e, principalmente, fazem buscas nelas." },
        ],
      },
      {
        heading: "O mito da \"rejeição automática\"",
        blocks: [
          { type: "p", text: "Você vai ler com frequência que \"75% dos currículos são rejeitados pelo ATS antes de uma pessoa vê-los\". Não existe nenhum estudo publicado que sustente esse número, e ele ainda descreve mal como a maioria dos sistemas funciona. Na maior parte das empresas, o ATS não lê seu currículo e decide; quem decide são pessoas." },
          { type: "p", text: "O que filtra candidatos automaticamente são as perguntas eliminatórias que a empresa configura, como \"Você tem disponibilidade para trabalhar presencialmente em São Paulo?\" ou \"Você possui CNH?\". Responda com sinceridade e atenção, porque um clique errado ali é, sim, um motivo real de eliminação." },
          { type: "tip", text: "O risco real não é um robô rejeitar você. É um recrutador buscar \"Salesforce\" ou \"React\" e seu currículo não aparecer nos resultados porque essa palavra não está nele." },
        ],
      },
      {
        heading: "Por que as palavras-chave ainda importam",
        blocks: [
          { type: "p", text: "Os recrutadores pesquisam no ATS como você pesquisa na internet: digitando as habilidades e os cargos que o gestor da vaga pediu. Se a vaga diz \"Next.js\" e seu currículo diz \"NextJS\", ou se a vaga diz \"gestão de stakeholders\" e você escreveu \"trabalhei com as áreas de negócio\", uma busca simples pode não encontrar você." },
          { type: "ul", items: [
            "Use os nomes exatos que a vaga usa para ferramentas, metodologias e certificações.",
            "Escreva cada termo uma vez por extenso com a sigla: \"Otimização para mecanismos de busca (SEO)\".",
            "Coloque suas habilidades mais importantes na seção de Habilidades e também nos tópicos que as comprovam.",
            "Inclua só habilidades sobre as quais você consegue falar em uma entrevista: a palavra-chave faz você ser encontrado, a entrevista confere.",
          ] },
        ],
      },
      {
        heading: "Um formato que é processado sem erros",
        blocks: [
          { type: "p", text: "É no processamento automático que currículos muito elaborados perdem informação. Se o ATS não consegue ler uma seção, a busca do recrutador não encontra o que está nela." },
          { type: "ul", items: [
            "Use um layout de uma coluna só. Layouts com várias colunas podem ser lidos na ordem errada.",
            "Mantenha o texto como texto: não dentro de imagens, ícones, caixas de texto ou tabelas complexas.",
            "Use títulos de seção padrão: Experiência, Formação, Habilidades, Projetos.",
            "Exporte um PDF com texto pelo Word ou Google Docs (não um escaneado nem uma foto). Se você consegue selecionar e copiar o texto, o normal é que o sistema também consiga ler.",
            "Escreva as datas em um formato consistente, como \"mar 2021 – atual\".",
          ] },
        ],
      },
      {
        heading: "Como testar o seu próprio currículo",
        blocks: [
          { type: "ol", items: [
            "Copie todo o texto do seu PDF e cole em um editor de texto simples. Se sair bagunçado ou vazio, é preciso simplificar o layout.",
            "Cole ao lado a descrição da vaga e destaque as ferramentas, as habilidades e os cargos que ela repete.",
            "Confira quais aparecem no seu currículo, com as mesmas palavras.",
          ] },
          { type: "p", text: "O CVXray automatiza os passos dois e três: lê seu currículo como um ATS leria, compara com a vaga e lista por prioridade as habilidades que faltam, com a linha da vaga que pede cada uma." },
        ],
      },
    ],
  },
  {
    slug: "tailor-cv-to-job-description",
    title: "Como adaptar seu currículo a uma vaga em 15 minutos",
    seoTitle: "Como adaptar seu currículo a uma vaga em 15 minutos",
    description:
      "Um método prático, passo a passo, para adaptar seu currículo a uma vaga específica sem reescrevê-lo do zero nem enchê-lo de palavras-chave.",
    published: "2026-11-11",
    updated: "2026-11-11",
    minutes: 5,
    relatedRoles: ["frontend-developer", "product-manager", "digital-marketing-specialist"],
    sections: [
      {
        heading: "Por que adaptar o currículo funciona",
        blocks: [
          { type: "p", text: "O gestor que lê seu currículo se faz uma única pergunta: essa pessoa faz o que a nossa vaga precisa? Um currículo genérico obriga ele a deduzir a resposta. Um currículo adaptado responde nos primeiros dez segundos: a mesma experiência, organizada e escrita em torno da vaga dele." },
          { type: "p", text: "Adaptar o currículo não é reescrever sua trajetória. É escolher quais coisas verdadeiras vêm primeiro e chamá-las pelas palavras da empresa." },
        ],
      },
      {
        heading: "Passo 1. Leia a vaga em busca das prioridades (3 minutos)",
        blocks: [
          { type: "ul", items: [
            "Sublinhe cada ferramenta, habilidade, metodologia e certificação.",
            "Marque as que aparecem mais de uma vez ou no título da vaga: essas são as prioridades.",
            "Anote os sinais de senioridade: anos de experiência, tamanho do time, orçamento, escopo.",
          ] },
        ],
      },
      {
        heading: "Passo 2. Encontre suas lacunas (2 minutos)",
        blocks: [
          { type: "p", text: "Compare essa lista com seu currículo. Algumas habilidades vão faltar porque você não as tem: deixe de fora. Outras vão faltar só porque você nunca as escreveu ou usou outras palavras. Essas são as melhorias rápidas." },
          { type: "tip", text: "O CVXray faz essa comparação por você: cole a vaga e seu currículo e ele lista as habilidades que faltam, primeiro as de maior prioridade, com a linha da vaga que pede cada uma." },
        ],
      },
      {
        heading: "Passo 3. Reescreva seu resumo (3 minutos)",
        blocks: [
          { type: "p", text: "Seu resumo de duas linhas deve trazer o título da vaga e as duas ou três prioridades principais: \"Desenvolvedor frontend com 5 anos criando produtos com React e TypeScript, com foco em acessibilidade e performance\". Se o título da vaga for um pouco diferente do seu, use o dela sempre que for honesto fazer isso." },
        ],
      },
      {
        heading: "Passo 4. Reordene e reescreva seus tópicos (5 minutos)",
        blocks: [
          { type: "ul", items: [
            "Suba para o início de cada cargo os tópicos que comprovam as prioridades da vaga.",
            "Use os nomes que a vaga dá às ferramentas e metodologias.",
            "Coloque um número em todos os tópicos que puder: escala, tempo economizado, receita, usuários, precisão.",
            "Corte os tópicos que não acrescentam nada para esta vaga. Melhor curto e relevante do que longo e completo.",
          ] },
        ],
      },
      {
        heading: "Passo 5. Atualize sua seção de Habilidades (2 minutos)",
        blocks: [
          { type: "p", text: "Liste perto do início da seção as habilidades prioritárias da vaga que você realmente tem, com as mesmas palavras. Depois faça uma última checagem: cada habilidade da lista deve estar comprovada por pelo menos um tópico mais acima." },
        ],
      },
      {
        heading: "O que não fazer",
        blocks: [
          { type: "ul", items: [
            "Não cole a descrição da vaga no seu currículo, nem visível nem em texto branco. Os recrutadores percebem, e os sistemas atuais mostram esse texto.",
            "Não adicione habilidades que você não usou só para aumentar a nota de compatibilidade: a entrevista vai descobrir.",
            "Não envie o mesmo currículo \"adaptado\" para todas as vagas. A ideia é dedicar quinze minutos a cada candidatura.",
          ] },
        ],
      },
    ],
  },
  {
    slug: "what-is-a-good-cv-match-score",
    title: "Qual nota de compatibilidade do currículo é boa e o que fazer com a sua",
    seoTitle: "Qual nota de compatibilidade do currículo é boa?",
    description:
      "Como a nota de compatibilidade do currículo é calculada, o que 45%, 70% ou 90% significam de verdade e o que fazer em cada faixa antes de se candidatar.",
    published: "2026-11-11",
    updated: "2026-11-11",
    minutes: 4,
    relatedRoles: ["data-analyst", "ai-engineer", "financial-analyst"],
    sections: [
      {
        heading: "O que uma nota de compatibilidade mede",
        blocks: [
          { type: "p", text: "A nota de compatibilidade de um currículo estima quanto do que a vaga pede está visível no seu currículo. Ela não prevê se você vai ser contratado: mede a correspondência, e a correspondência é o que decide se um recrutador encontra e pré-seleciona você." },
          { type: "p", text: "A nota do CVXray é uma comparação ponderada em três partes: as habilidades que a vaga cita e aparecem no seu currículo (50%), a linguagem da vaga que seu currículo compartilha (35%) e seus anos de experiência frente aos exigidos (15%). As habilidades que a vaga repete, ou que coloca no título, pesam mais." },
        ],
      },
      {
        heading: "Como interpretar sua nota",
        blocks: [
          { type: "ul", items: [
            "70% ou mais: boa compatibilidade. Seu currículo já mostra a maior parte do que o cargo precisa. Dê um polimento no terço de cima e envie sua candidatura.",
            "45–69%: competitivo. Você provavelmente tem a experiência, mas não está mostrando tudo. Feche antes uma ou duas lacunas de prioridade alta.",
            "Menos de 45%: lacunas importantes. Ou o cargo ainda está acima do seu nível, ou seu currículo foi escrito para outro tipo de trabalho. Adapte a fundo ou avalie se é a vaga certa.",
          ] },
          { type: "tip", text: "A nota máxima é 95%. Um 100% perfeito significaria copiar a vaga, o que não é o objetivo nem uma boa ideia." },
        ],
      },
      {
        heading: "Por que sua nota pode ser mais baixa do que você espera",
        blocks: [
          { type: "ul", items: [
            "Palavras diferentes: \"retenção de clientes\" no seu currículo, \"redução de churn\" na vaga.",
            "Habilidades só implícitas: você usava Docker todo dia, mas nunca escreveu a palavra.",
            "Um currículo ou uma vaga muito curtos, o que deixa qualquer comparação menos confiável.",
            "Experiência sem datas: os anos são lidos em frases como \"5 anos de experiência\" ou em períodos como \"2019 – atual\".",
          ] },
        ],
      },
      {
        heading: "Como aumentar a nota sem trapacear",
        blocks: [
          { type: "ol", items: [
            "Comece pelas habilidades de prioridade alta que faltam e que você realmente tem, e coloque-as onde ficam comprovadas: em um tópico, não só na lista de habilidades.",
            "Use os nomes que a vaga dá às ferramentas e metodologias.",
            "Coloque as datas nos seus cargos para que sua experiência possa ser contada.",
            "Analise de novo. É comum passar de cinquenta e poucos para setenta e poucos só mudando a redação.",
          ] },
          { type: "p", text: "Se as lacunas que sobram são habilidades que você não tem, a resposta não é uma nota mais alta: são os cursos recomendados, ou uma vaga que combine mais com você." },
        ],
      },
    ],
  },
];

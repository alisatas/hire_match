import Link from "next/link";
import { CONTACT_EMAIL, SUPPORT } from "@/lib/site";
import type { LegalPages } from "./types";

const contact = CONTACT_EMAIL
  ? <>escreva para <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></>
  : <>responda ao e-mail de recibo que a Lemon Squeezy enviou para você</>;

export const LEGAL: LegalPages = {
  privacy: {
    title: "Política de privacidade",
    description: "O CVXray nunca salva seu currículo. Quais dados são processados, onde e por quanto tempo, como funcionam estatísticas e pagamentos, e seus direitos.",
    intro: <p>O CVXray foi feito para que seu currículo continue sendo seu. Esta página explica exatamente o que é processado, onde e por quanto tempo. O CVXray é mantido por uma pessoa física residente na Holanda, que é a controladora dos dados do site.</p>,
    sections: [
      { title: "Seu currículo", body: <ul>
        <li><strong>O texto colado</strong> nunca sai do seu navegador. A análise roda inteiramente no seu dispositivo.</li>
        <li><strong>Os PDFs enviados</strong> vão para o nosso servidor só para extrair o texto, que volta para o seu navegador. O arquivo e o texto são descartados na hora: nunca são gravados em banco de dados, arquivo ou log.</li>
        <li>O conteúdo do currículo nunca é usado para análise de uso, publicidade ou para treinar qualquer coisa.</li>
      </ul> },
      { title: "Vagas de emprego", body: <p>Se você cola o link de uma vaga, nosso servidor busca essa página pública, extrai o texto e devolve para o seu navegador. O link e o conteúdo da página não são salvos.</p> },
      { title: "O que fica salvo no seu navegador", body: <p>Seu navegador guarda suas três últimas notas (nota, rótulo e número de habilidades, sem texto do currículo) e sua escolha sobre cookies, para que o site possa mostrá-las da próxima vez. Apague os dados do site no seu navegador para removê-los.</p> },
      { title: "Análise de uso e medição de anúncios", body: <>
        <p>Só se você clicar em &laquo;Aceitar todos&raquo; no aviso de cookies, o Google Tag Manager carrega o Google Analytics e a medição do Google Ads. Eles registram uso anônimo, como páginas vistas e se uma análise foi concluída, nunca o conteúdo do seu currículo ou da vaga. Você pode mudar sua escolha a qualquer momento em &laquo;Configurar cookies&raquo;, no rodapé.</p>
        <p>Também usamos o Vercel Web Analytics, que conta páginas vistas sem cookies e sem identificar você.</p>
      </> },
      { title: "Pagamentos", body: <p>Os pagamentos de apoio opcionais são processados pela Lemon Squeezy como vendedora registrada (merchant of record). A Lemon Squeezy coleta seus dados de pagamento conforme a política de privacidade dela; nunca vemos os dados do seu cartão. Recebemos os dados do pedido necessários para prestar o serviço e processar reembolsos: seu nome, e-mail, valor e país.</p> },
      { title: "Hospedagem e segurança", body: <p>O site é hospedado na Vercel. Para servir as páginas e proteger o site contra abusos, seu endereço IP é processado nos logs do servidor e, para limitar requisições, fica em memória por cerca de um minuto.</p> },
      { title: "Seus direitos", body: <p>Pelo Regulamento Geral sobre a Proteção de Dados (RGPD) da União Europeia, você pode pedir acesso, correção ou exclusão dos dados pessoais que tivermos sobre você, ou se opor ao uso deles. Como não guardamos dados de currículo, normalmente não há nada a apagar além dos registros de pagamento, que precisamos manter por motivos fiscais. Você também pode registrar uma reclamação na autoridade holandesa de proteção de dados (Autoriteit Persoonsgegevens).</p> },
      { title: "Contato", body: <p>Para dúvidas sobre privacidade, {contact}.</p> },
    ],
  },
  terms: {
    title: "Termos de serviço",
    description: "As condições de uso do CVXray, o analisador de currículo gratuito: uso aceitável, seus dados, responsabilidade e pagamentos de apoio via Lemon Squeezy.",
    intro: <p>Estes termos valem quando você usa o CVXray em cvxray.com. O CVXray é mantido por uma pessoa física residente na Holanda. Ao usar o site, você aceita estes termos. Se não concordar, por favor não use o site.</p>,
    sections: [
      { title: "O que o CVXray faz", body: <p>O CVXray compara um currículo com uma vaga de emprego e mostra uma nota de compatibilidade, as habilidades em comum e as que faltam, palavras-chave e sugestões de cursos. A ferramenta é gratuita, sem conta e sem limite de uso. Os resultados são orientações automáticas para ajudar você a adaptar seu currículo. Não são uma previsão nem uma garantia de entrevista, proposta de emprego ou decisão de contratação.</p> },
      { title: "Uso do site", body: <>
        <p>Você pode usar o CVXray na sua própria busca de emprego ou para ajudar outras pessoas na delas. Você se compromete a não:</p>
        <ul>
          <li>enviar conteúdo que não tem direito de usar, nem dados pessoais de outras pessoas sem a permissão delas;</li>
          <li>atacar, sobrecarregar ou extrair em massa o conteúdo do site, nem tentar burlar sua segurança ou seus limites de uso;</li>
          <li>usar a função de link para buscar algo que não seja vagas de emprego públicas;</li>
          <li>usar o site para fins ilegais.</li>
        </ul>
        <p>Podemos bloquear o acesso que descumprir essas regras.</p>
      </> },
      { title: "Seu currículo e seus dados", body: <p>Seu currículo nunca é salvo. Como o texto do currículo, as vagas e os dados de análise de uso e de pagamento são tratados está descrito na <Link href="/pt/privacy">Política de privacidade</Link>.</p> },
      { title: "Pagamentos de apoio opcionais", body: <>
        <p>O CVXray pode oferecer um pagamento de apoio voluntário e único (qualquer valor a partir de €{SUPPORT.minimumEur}). Os pagamentos de apoio não liberam funções: a ferramenta continua gratuita, pagando ou não.</p>
        <p>Os pagamentos são vendidos e processados pela <a href="https://www.lemonsqueezy.com" target="_blank" rel="noopener noreferrer">Lemon Squeezy</a>, que atua como vendedora registrada (merchant of record). A Lemon Squeezy cuida do pagamento, da segurança, das faturas e dos impostos sobre vendas ou IVA, e os termos dela se aplicam à compra. Nunca vemos os dados do seu cartão.</p>
        <p>Você pode obter reembolso integral em até {SUPPORT.refundDays} dias; veja a <Link href="/pt/refund-policy">Política de reembolso</Link>.</p>
      </> },
      { title: "Links de terceiros", body: <p>Os resultados têm links para cursos, sites de vagas e recursos de entrevista mantidos por outros. Não controlamos esses sites nem somos responsáveis pelo conteúdo, preços ou disponibilidade deles.</p> },
      { title: "Disponibilidade e mudanças", body: <p>O CVXray é oferecido no estado em que se encontra. Trabalhamos para que ele seja preciso e esteja disponível, mas não podemos prometer que esteja sempre sem erros ou no ar, e podemos mudar ou remover funções a qualquer momento.</p> },
      { title: "Responsabilidade", body: <p>Na medida permitida por lei, não somos responsáveis por perdas indiretas ou consequentes, nem pelas decisões que você tomar com base nos resultados. Nada nestes termos limita a responsabilidade que não pode ser limitada por lei nem seus direitos legais como consumidor.</p> },
      { title: "Mudanças nestes termos", body: <p>Podemos atualizar estes termos. A data acima indica a versão mais recente. Se você continuar usando o site depois de uma mudança, aceita os termos atualizados.</p> },
      { title: "Lei aplicável", body: <p>Estes termos são regidos pela lei holandesa. Se você é consumidor, também mantém a proteção das leis obrigatórias do país onde mora.</p> },
      { title: "Contato", body: <p>Para dúvidas sobre estes termos, {contact}.</p> },
    ],
  },
  refunds: {
    title: "Política de reembolso",
    description: `Os pagamentos de apoio ao CVXray são reembolsados integralmente em até ${SUPPORT.refundDays} dias, sem perguntas. Veja como pedir um reembolso.`,
    intro: <p>O CVXray é gratuito. O único pagamento que o CVXray pode oferecer é um pagamento de apoio voluntário e único (qualquer valor a partir de €{SUPPORT.minimumEur}), processado pela Lemon Squeezy. Se você pagar e mudar de ideia, devolvemos o dinheiro.</p>,
    sections: [
      { title: `Reembolso integral em ${SUPPORT.refundDays} dias`, body: <p>Você pode pedir o reembolso integral de um pagamento de apoio em até {SUPPORT.refundDays} dias após o pagamento. Não é preciso dar motivo e nada é descontado.</p> },
      { title: "Como pedir um reembolso", body: <ul>
        <li>Responda ao e-mail de recibo que você recebeu da Lemon Squeezy, ou</li>
        <li>encontre o pedido nos seus <a href="https://app.lemonsqueezy.com/my-orders" target="_blank" rel="noopener noreferrer">pedidos da Lemon Squeezy</a> e fale com o suporte por lá{CONTACT_EMAIL ? ", ou" : "."}</li>
        {CONTACT_EMAIL && <li>escreva para <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> a partir do e-mail com que você pagou.</li>}
      </ul> },
      { title: "Quando o dinheiro volta", body: <p>Os reembolsos voltam para o meio de pagamento original. A Lemon Squeezy emite o reembolso na hora; seu banco ou a operadora do cartão costuma mostrar o valor em 5 a 10 dias úteis.</p> },
      { title: `Depois de ${SUPPORT.refundDays} dias`, body: <p>Pagamentos acidentais ou duplicados são sempre reembolsados, não importa quando você perceber. Para qualquer outro caso depois de {SUPPORT.refundDays} dias, entre em contato e vamos analisar.</p> },
      { title: "Seus direitos legais", body: <p>Esta política se soma aos seus direitos legais como consumidor e não os limita. Veja também os <Link href="/pt/terms">Termos de serviço</Link>.</p> },
    ],
  },
};

import Link from "next/link";
import { CONTACT_EMAIL, SUPPORT } from "@/lib/site";
import type { LegalPages } from "./types";

const contact = CONTACT_EMAIL
  ? <>escribe a <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></>
  : <>responde al correo de recibo que te envió Lemon Squeezy</>;

export const LEGAL: LegalPages = {
  privacy: {
    title: "Política de privacidad",
    description: "CVXray nunca guarda tu CV. Qué datos se procesan, dónde y durante cuánto tiempo, cómo funcionan la analítica y los pagos, y cuáles son tus derechos.",
    intro: <p>CVXray está diseñado para que tu CV siga siendo tuyo. Esta página explica exactamente qué se procesa, dónde y durante cuánto tiempo. CVXray lo gestiona una persona física residente en los Países Bajos, que es la responsable del tratamiento de los datos del sitio.</p>,
    sections: [
      { title: "Tu CV", body: <ul>
        <li><strong>El texto pegado</strong> nunca sale de tu navegador. El análisis se ejecuta por completo en tu dispositivo.</li>
        <li><strong>Los PDF subidos</strong> se envían a nuestro servidor solo para extraer el texto, que se devuelve a tu navegador. El archivo y su texto se descartan de inmediato: nunca se escriben en una base de datos, un archivo ni un registro.</li>
        <li>El contenido del CV nunca se usa para analítica, publicidad ni para entrenar nada.</li>
      </ul> },
      { title: "Ofertas de empleo", body: <p>Si pegas el enlace de una oferta, nuestro servidor obtiene esa página pública, extrae el texto y lo devuelve a tu navegador. El enlace y el contenido de la página no se guardan.</p> },
      { title: "Lo que se guarda en tu navegador", body: <p>Tu navegador guarda tus tres últimas puntuaciones (puntuación, etiqueta y número de habilidades, sin texto del CV) y tu elección sobre las cookies, para que el sitio pueda mostrarlas la próxima vez. Borra los datos del sitio en tu navegador para eliminarlos.</p> },
      { title: "Analítica y medición publicitaria", body: <>
        <p>Solo si pulsas &laquo;Aceptar todas&raquo; en el aviso de cookies, Google Tag Manager carga Google Analytics y la medición de Google Ads. Registran un uso anónimo, como las páginas vistas y si se completó un análisis, nunca el contenido de tu CV ni de la oferta. Puedes cambiar tu elección en cualquier momento con &laquo;Configurar cookies&raquo; en el pie de página.</p>
        <p>También usamos Vercel Web Analytics, que cuenta las páginas vistas sin cookies y sin identificarte.</p>
      </> },
      { title: "Pagos", body: <p>Los pagos de apoyo opcionales los gestiona Lemon Squeezy como vendedor registrado (merchant of record). Lemon Squeezy recoge tus datos de pago conforme a su propia política de privacidad; nunca vemos los datos de tu tarjeta. Recibimos los datos del pedido necesarios para prestar el servicio y gestionar reembolsos: tu nombre, correo electrónico, importe y país.</p> },
      { title: "Alojamiento y seguridad", body: <p>El sitio está alojado en Vercel. Para servir las páginas y proteger el sitio frente a abusos, tu dirección IP se procesa en los registros del servidor y, para limitar las solicitudes, se mantiene en memoria durante aproximadamente un minuto.</p> },
      { title: "Tus derechos", body: <p>Según el RGPD, puedes solicitar el acceso, la rectificación o la supresión de los datos personales que tengamos sobre ti, u oponerte a su uso. Como no guardamos datos de CV, normalmente no hay nada que borrar aparte de los registros de pago, que debemos conservar por motivos fiscales. También puedes presentar una reclamación ante la autoridad neerlandesa de protección de datos (Autoriteit Persoonsgegevens).</p> },
      { title: "Contacto", body: <p>Para preguntas sobre privacidad, {contact}.</p> },
    ],
  },
  terms: {
    title: "Términos del servicio",
    description: "Las condiciones de uso de CVXray, el analizador de CV gratuito: uso aceptable, tus datos, responsabilidad y pagos de apoyo opcionales a través de Lemon Squeezy.",
    intro: <p>Estos términos se aplican cuando usas CVXray en cvxray.com. CVXray lo gestiona una persona física residente en los Países Bajos. Al usar el sitio aceptas estos términos. Si no estás de acuerdo, por favor no lo uses.</p>,
    sections: [
      { title: "Qué hace CVXray", body: <p>CVXray compara un CV con una oferta de empleo y muestra una puntuación de ajuste, las habilidades que coinciden y las que faltan, palabras clave y sugerencias de cursos. La herramienta es gratuita, sin cuenta y sin límite de uso. Los resultados son orientaciones automáticas para ayudarte a adaptar tu CV. No son una predicción ni una garantía de ninguna entrevista, oferta de trabajo o decisión de contratación.</p> },
      { title: "Uso del sitio", body: <>
        <p>Puedes usar CVXray para tu propia búsqueda de empleo o para ayudar a otras personas con la suya. Te comprometes a no:</p>
        <ul>
          <li>subir contenido que no tengas derecho a usar, ni datos personales de otras personas sin su permiso;</li>
          <li>atacar, sobrecargar o extraer masivamente el contenido del sitio, ni intentar eludir su seguridad o sus límites de uso;</li>
          <li>usar la función de enlace para obtener algo distinto de ofertas de empleo públicas;</li>
          <li>usar el sitio con fines ilícitos.</li>
        </ul>
        <p>Podemos bloquear el acceso que incumpla estas normas.</p>
      </> },
      { title: "Tu CV y tus datos", body: <p>Tu CV nunca se guarda. Cómo se tratan el texto del CV, las ofertas, los datos de analítica y de pago se describe en la <Link href="/es/privacy">Política de privacidad</Link>.</p> },
      { title: "Pagos de apoyo opcionales", body: <>
        <p>CVXray puede ofrecer un pago de apoyo voluntario y único (cualquier importe desde {SUPPORT.minimumEur} €). Los pagos de apoyo no desbloquean funciones: la herramienta sigue siendo gratuita pagues o no.</p>
        <p>Los pagos los vende y procesa <a href="https://www.lemonsqueezy.com" target="_blank" rel="noopener noreferrer">Lemon Squeezy</a>, que actúa como vendedor registrado (merchant of record). Lemon Squeezy gestiona el pago, su seguridad, las facturas y los impuestos sobre ventas o el IVA, y a la compra se aplican sus propios términos. Nunca vemos los datos de tu tarjeta.</p>
        <p>Puedes obtener un reembolso completo en un plazo de {SUPPORT.refundDays} días; consulta la <Link href="/es/refund-policy">Política de reembolsos</Link>.</p>
      </> },
      { title: "Enlaces a terceros", body: <p>Los resultados enlazan a cursos, portales de empleo y recursos para entrevistas gestionados por otros. No controlamos esos sitios ni somos responsables de su contenido, precios o disponibilidad.</p> },
      { title: "Disponibilidad y cambios", body: <p>CVXray se ofrece tal cual. Trabajamos para que sea preciso y esté disponible, pero no podemos prometer que siempre esté libre de errores o en línea, y podemos cambiar o retirar funciones en cualquier momento.</p> },
      { title: "Responsabilidad", body: <p>En la medida en que la ley lo permita, no somos responsables de pérdidas indirectas o consecuentes, ni de las decisiones que tomes basándote en los resultados. Nada en estos términos limita la responsabilidad que no puede limitarse por ley ni tus derechos legales como consumidor.</p> },
      { title: "Cambios en estos términos", body: <p>Podemos actualizar estos términos. La fecha de arriba indica la versión más reciente. Si sigues usando el sitio después de un cambio, aceptas los términos actualizados.</p> },
      { title: "Ley aplicable", body: <p>Estos términos se rigen por la ley neerlandesa. Si eres consumidor, conservas además la protección de las leyes imperativas del país en el que vives.</p> },
      { title: "Contacto", body: <p>Para preguntas sobre estos términos, {contact}.</p> },
    ],
  },
  refunds: {
    title: "Política de reembolsos",
    description: `Los pagos de apoyo a CVXray se reembolsan por completo en un plazo de ${SUPPORT.refundDays} días, sin preguntas. Así puedes solicitar un reembolso.`,
    intro: <p>CVXray es gratuito. El único pago que CVXray puede ofrecer es un pago de apoyo voluntario y único (cualquier importe desde {SUPPORT.minimumEur} €), procesado por Lemon Squeezy. Si pagas y cambias de opinión, te devolvemos el dinero.</p>,
    sections: [
      { title: `Reembolso completo en ${SUPPORT.refundDays} días`, body: <p>Puedes pedir el reembolso completo de un pago de apoyo en un plazo de {SUPPORT.refundDays} días desde el pago. No hace falta dar ningún motivo y no se descuenta nada.</p> },
      { title: "Cómo solicitar un reembolso", body: <ul>
        <li>Responde al correo de recibo que recibiste de Lemon Squeezy, o</li>
        <li>busca el pedido en tus <a href="https://app.lemonsqueezy.com/my-orders" target="_blank" rel="noopener noreferrer">pedidos de Lemon Squeezy</a> y contacta con el soporte desde allí{CONTACT_EMAIL ? ", o" : "."}</li>
        {CONTACT_EMAIL && <li>escribe a <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> desde la dirección con la que pagaste.</li>}
      </ul> },
      { title: "Cuándo vuelve el dinero", body: <p>Los reembolsos se hacen al método de pago original. Lemon Squeezy los emite de inmediato; tu banco o el emisor de tu tarjeta suele mostrar el importe en un plazo de 5 a 10 días hábiles.</p> },
      { title: `Después de ${SUPPORT.refundDays} días`, body: <p>Los pagos accidentales o duplicados se reembolsan siempre, los detectes cuando los detectes. Para cualquier otro caso pasados {SUPPORT.refundDays} días, ponte en contacto y lo revisaremos.</p> },
      { title: "Tus derechos legales", body: <p>Esta política se suma a tus derechos legales como consumidor y no los limita. Consulta también los <Link href="/es/terms">Términos del servicio</Link>.</p> },
    ],
  },
};

import type { Post } from "@/lib/posts";

export const POSTS: Post[] = [
  {
    slug: "how-ats-reads-your-cv",
    title: "Cómo leen de verdad tu CV los sistemas de seguimiento de candidatos (ATS)",
    seoTitle: "Cómo lee de verdad tu CV un ATS",
    description:
      "Qué hace realmente un ATS con tu CV, por qué «el 75 % de los CV se rechaza automáticamente» es un mito y qué formato y palabras clave hacen que te encuentren.",
    published: "2026-11-11",
    updated: "2026-11-11",
    minutes: 6,
    relatedRoles: ["software-engineer", "account-executive", "recruiter"],
    sections: [
      {
        heading: "Qué es un ATS",
        blocks: [
          { type: "p", text: "Un sistema de seguimiento de candidatos (ATS, por sus siglas en inglés) es el software que usa una empresa para recibir candidaturas, mover a los candidatos por las fases de entrevistas y guardar un registro de cada contratación. Greenhouse, Workday, Lever, SmartRecruiters y muchos otros hacen, a grandes rasgos, lo mismo: convierten un montón de CV en una base de datos en la que se puede buscar." },
          { type: "p", text: "Cuando envías tu candidatura, el ATS guarda tu CV y normalmente intenta procesarlo: extrae tu nombre, tus datos de contacto, tus puestos, las empresas, las fechas, la formación y las habilidades y los coloca en campos estructurados. Después, los reclutadores revisan las candidaturas, las filtran y, sobre todo, buscan en ellas." },
        ],
      },
      {
        heading: "El mito del «rechazo automático»",
        blocks: [
          { type: "p", text: "Leerás a menudo que «el 75 % de los CV los rechaza el ATS antes de que los vea una persona». No hay ningún estudio publicado que respalde esa cifra, y además describe mal cómo funciona la mayoría de los sistemas. En la mayoría de las empresas, el ATS no lee tu CV y decide; deciden las personas." },
          { type: "p", text: "Lo que sí filtra candidatos de forma automática son las preguntas eliminatorias que configura la empresa, por ejemplo «¿Tienes permiso de trabajo en España?» o «¿Tienes carné de conducir?». Respóndelas con sinceridad y con cuidado, porque un clic equivocado ahí sí es un motivo real de descarte." },
          { type: "tip", text: "El riesgo real no es que un robot te rechace. Es que un reclutador busque «Salesforce» o «React» y tu CV no aparezca en los resultados porque esa palabra no está en él." },
        ],
      },
      {
        heading: "Por qué las palabras clave siguen importando",
        blocks: [
          { type: "p", text: "Los reclutadores buscan en el ATS como tú buscas en internet: escribiendo las habilidades y los puestos que pidió el responsable de contratación. Si la oferta dice «Next.js» y tu CV dice «NextJS», o la oferta dice «gestión de stakeholders» y tú escribiste «trabajé con equipos de negocio», una búsqueda sencilla puede no encontrarte." },
          { type: "ul", items: [
            "Usa los nombres exactos que usa la oferta para herramientas, metodologías y certificaciones.",
            "Escribe cada término una vez con el nombre completo y su sigla: «Optimización de motores de búsqueda (SEO)».",
            "Pon tus habilidades más importantes en la sección de Habilidades y también en las viñetas que las demuestran.",
            "Incluye solo habilidades de las que puedas hablar en una entrevista: la palabra clave hace que te encuentren, la entrevista la comprueba.",
          ] },
        ],
      },
      {
        heading: "Un formato que se procesa sin errores",
        blocks: [
          { type: "p", text: "El procesamiento automático es donde los CV muy diseñados pierden información. Si el ATS no puede leer una sección, la búsqueda del reclutador no puede encontrar lo que hay en ella." },
          { type: "ul", items: [
            "Usa un diseño de una sola columna. Los diseños de varias columnas pueden leerse en el orden equivocado.",
            "Mantén el texto como texto: no dentro de imágenes, iconos, cuadros de texto ni tablas complejas.",
            "Usa títulos de sección estándar: Experiencia, Formación, Habilidades, Proyectos.",
            "Exporta un PDF con texto desde Word o Google Docs (no un escaneado ni una foto). Si puedes seleccionar y copiar el texto, lo normal es que el sistema también pueda leerlo.",
            "Escribe las fechas con un formato coherente, como «mar 2021 – actualidad».",
          ] },
        ],
      },
      {
        heading: "Cómo comprobar tu propio CV",
        blocks: [
          { type: "ol", items: [
            "Copia todo el texto de tu PDF y pégalo en un editor de texto sin formato. Si sale desordenado o vacío, hay que simplificar el diseño.",
            "Pega al lado la descripción del puesto y resalta las herramientas, las habilidades y los puestos que repite.",
            "Comprueba cuáles aparecen en tu CV, con las mismas palabras.",
          ] },
          { type: "p", text: "CVXray automatiza los pasos dos y tres: lee tu CV como lo haría un ATS, lo compara con la oferta y enumera por prioridad las habilidades que faltan, con la línea de la oferta que pide cada una." },
        ],
      },
    ],
  },
  {
    slug: "tailor-cv-to-job-description",
    title: "Cómo adaptar tu CV a una oferta de empleo en 15 minutos",
    seoTitle: "Cómo adaptar tu CV a una oferta en 15 minutos",
    description:
      "Un método práctico, paso a paso, para adaptar tu CV a una oferta de empleo concreta sin reescribirlo desde cero ni llenarlo de palabras clave.",
    published: "2026-11-11",
    updated: "2026-11-11",
    minutes: 5,
    relatedRoles: ["frontend-developer", "product-manager", "digital-marketing-specialist"],
    sections: [
      {
        heading: "Por qué funciona adaptar el CV",
        blocks: [
          { type: "p", text: "El responsable de contratación que lee tu CV se hace una sola pregunta: ¿hace esta persona lo que nuestro puesto necesita? Un CV genérico le obliga a deducir la respuesta. Uno adaptado la da en los primeros diez segundos: la misma experiencia, ordenada y redactada en torno a su oferta." },
          { type: "p", text: "Adaptar el CV no es reescribir tu trayectoria. Es elegir qué cosas ciertas van primero y nombrarlas con las palabras de la empresa." },
        ],
      },
      {
        heading: "Paso 1. Lee la oferta buscando prioridades (3 minutos)",
        blocks: [
          { type: "ul", items: [
            "Subraya cada herramienta, habilidad, metodología y certificación.",
            "Marca las que aparecen más de una vez o en el título del puesto: esas son las prioridades.",
            "Anota las señales de seniority: años de experiencia, tamaño del equipo, presupuesto, alcance.",
          ] },
        ],
      },
      {
        heading: "Paso 2. Encuentra tus brechas (2 minutos)",
        blocks: [
          { type: "p", text: "Compara esa lista con tu CV. Algunas habilidades faltarán porque no las tienes: déjalas fuera. Otras faltarán solo porque nunca las escribiste o porque usaste otras palabras. Esas son las mejoras rápidas." },
          { type: "tip", text: "CVXray hace esta comparación por ti: pega la oferta y tu CV y enumera las habilidades que faltan, primero las de mayor prioridad, con la línea de la oferta que pide cada una." },
        ],
      },
      {
        heading: "Paso 3. Reescribe tu resumen (3 minutos)",
        blocks: [
          { type: "p", text: "Tu resumen de dos líneas debe recoger el título del puesto y las dos o tres prioridades principales: «Desarrollador frontend con 5 años creando productos con React y TypeScript, centrado en accesibilidad y rendimiento». Si el título de la oferta difiere un poco del tuyo, usa el suyo siempre que sea honesto hacerlo." },
        ],
      },
      {
        heading: "Paso 4. Reordena y reformula tus viñetas (5 minutos)",
        blocks: [
          { type: "ul", items: [
            "Sube al principio de cada puesto las viñetas que demuestran las prioridades de la oferta.",
            "Usa los nombres que da la oferta a las herramientas y metodologías.",
            "Añade una cifra a todas las viñetas que puedas: escala, tiempo ahorrado, ingresos, usuarios, precisión.",
            "Elimina las viñetas que no aportan a este puesto. Más vale breve y relevante que largo y completo.",
          ] },
        ],
      },
      {
        heading: "Paso 5. Actualiza tu sección de Habilidades (2 minutos)",
        blocks: [
          { type: "p", text: "Enumera cerca del principio de la sección las habilidades prioritarias de la oferta que de verdad tienes, con sus mismas palabras. Después haz una última comprobación: cada habilidad de la lista debe estar respaldada por al menos una viñeta más arriba." },
        ],
      },
      {
        heading: "Qué no hacer",
        blocks: [
          { type: "ul", items: [
            "No pegues la descripción del puesto en tu CV, ni a la vista ni en texto blanco. Los reclutadores lo notan, y los sistemas actuales muestran ese texto.",
            "No añadas habilidades que no has usado para subir la puntuación de ajuste: la entrevista las descubrirá.",
            "No envíes el mismo CV «adaptado» a todas las ofertas. La idea es dedicar quince minutos a cada candidatura.",
          ] },
        ],
      },
    ],
  },
  {
    slug: "what-is-a-good-cv-match-score",
    title: "Qué puntuación de ajuste del CV es buena y qué hacer con la tuya",
    seoTitle: "¿Qué puntuación de ajuste del CV es buena?",
    description:
      "Cómo se calcula la puntuación de ajuste de un CV, qué significan de verdad un 45 %, un 70 % o un 90 % y qué hacer en cada nivel antes de enviar tu candidatura.",
    published: "2026-11-11",
    updated: "2026-11-11",
    minutes: 4,
    relatedRoles: ["data-analyst", "ai-engineer", "financial-analyst"],
    sections: [
      {
        heading: "Qué mide una puntuación de ajuste",
        blocks: [
          { type: "p", text: "La puntuación de ajuste de un CV estima qué parte de lo que pide una oferta de empleo es visible en tu CV. No predice si te van a contratar: mide la coincidencia, y la coincidencia es lo que decide si un reclutador te encuentra y te preselecciona." },
          { type: "p", text: "La puntuación de CVXray es una comparación ponderada con tres partes: las habilidades que nombra la oferta y aparecen en tu CV (50 %), la redacción de la oferta que tu CV comparte (35 %) y tus años de experiencia frente a los que se piden (15 %). Las habilidades que la oferta repite, o que pone en el título, pesan más." },
        ],
      },
      {
        heading: "Cómo interpretar tu puntuación",
        blocks: [
          { type: "ul", items: [
            "70 % o más: ajuste sólido. Tu CV ya muestra la mayor parte de lo que necesita el puesto. Pule el tercio superior y envía tu candidatura.",
            "45–69 %: competitivo. Probablemente tienes la experiencia, pero no la estás mostrando toda. Cierra antes una o dos brechas de prioridad alta.",
            "Menos del 45 %: brechas importantes. O el puesto te queda grande, o tu CV está escrito para otro tipo de trabajo. Adáptalo a fondo o plantéate si es el puesto adecuado.",
          ] },
          { type: "tip", text: "La puntuación máxima es del 95 %. Un 100 % perfecto significaría copiar la oferta, que ni es el objetivo ni es buena idea." },
        ],
      },
      {
        heading: "Por qué tu puntuación puede ser más baja de lo que esperas",
        blocks: [
          { type: "ul", items: [
            "Otras palabras: «retención de clientes» en tu CV, «reducción del churn» en la oferta.",
            "Habilidades solo implícitas: usabas Docker a diario, pero nunca escribiste la palabra.",
            "Un CV muy corto o una oferta muy corta, lo que hace menos fiable cualquier comparación.",
            "Experiencia sin fechas: los años se leen en frases como «5 años de experiencia» o en rangos de fechas como «2019 – actualidad».",
          ] },
        ],
      },
      {
        heading: "Cómo subirla sin hacer trampas",
        blocks: [
          { type: "ol", items: [
            "Empieza por las habilidades de prioridad alta que faltan y que de verdad tienes, y añádelas donde quedan demostradas: en una viñeta, no solo en la lista de habilidades.",
            "Usa los nombres que da la oferta a las herramientas y metodologías.",
            "Añade las fechas a tus puestos para que se pueda contar tu experiencia.",
            "Repite el análisis. Es habitual pasar de cincuenta y tantos a setenta y tantos solo con cambiar la redacción.",
          ] },
          { type: "p", text: "Si las brechas que quedan son habilidades que no tienes, la respuesta no es una puntuación más alta: son los cursos recomendados, o un puesto que encaje mejor." },
        ],
      },
    ],
  },
];

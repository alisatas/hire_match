import type { Post } from "@/lib/posts";

export const POSTS: Post[] = [
  {
    slug: "how-ats-reads-your-cv",
    title: "Comment les logiciels de recrutement (ATS) lisent vraiment votre CV",
    seoTitle: "Comment un ATS lit vraiment votre CV",
    description:
      "Ce qu'un ATS fait vraiment de votre CV, pourquoi le « rejet automatique de 75 % des CV » est un mythe, et quel format et quels mots-clés vous rendent visible.",
    published: "2026-11-11",
    updated: "2026-11-11",
    minutes: 6,
    relatedRoles: ["software-engineer", "account-executive", "recruiter"],
    sections: [
      {
        heading: "Qu'est-ce qu'un ATS",
        blocks: [
          { type: "p", text: "Un ATS (Applicant Tracking System, ou logiciel de suivi des candidatures) est l'outil qu'une entreprise utilise pour recevoir les candidatures, faire avancer les candidats dans les étapes du recrutement et garder une trace de chaque embauche. Workday, Taleo, Greenhouse, Lever, SmartRecruiters et bien d'autres font, dans les grandes lignes, la même chose : ils transforment une pile de CV en base de données consultable." },
          { type: "p", text: "Quand vous postulez, l'ATS enregistre votre CV et tente en général de l'analyser : il extrait votre nom, vos coordonnées, vos postes, les entreprises, les dates, vos diplômes et vos compétences, puis les range dans des champs structurés. Ensuite, les recruteurs passent les candidatures en revue, les filtrent et surtout font des recherches dedans." },
        ],
      },
      {
        heading: "Le mythe du « rejet automatique »",
        blocks: [
          { type: "p", text: "Vous lirez souvent que « 75 % des CV sont rejetés par l'ATS avant qu'un humain ne les voie ». Aucune étude publiée ne confirme ce chiffre, et il décrit mal le fonctionnement de la plupart des systèmes. Dans la majorité des entreprises, l'ATS ne lit pas votre CV pour décider à votre place ; ce sont des personnes qui décident." },
          { type: "p", text: "Ce qui écarte automatiquement des candidats, ce sont les questions éliminatoires configurées par l'entreprise, comme « Êtes-vous autorisé(e) à travailler en France ? » ou « Avez-vous le permis B ? ». Répondez-y avec sincérité et attention : un mauvais clic à cet endroit est un vrai motif d'élimination." },
          { type: "tip", text: "Le vrai risque n'est pas qu'un robot vous rejette. C'est qu'un recruteur cherche « Salesforce » ou « React » et que votre CV n'apparaisse pas dans les résultats parce que ce mot n'y figure pas." },
        ],
      },
      {
        heading: "Pourquoi les mots-clés comptent toujours",
        blocks: [
          { type: "p", text: "Les recruteurs cherchent dans l'ATS comme vous cherchez sur internet : en tapant les compétences et les intitulés de poste demandés par le manager. Si l'offre dit « Next.js » et votre CV « NextJS », ou si l'offre parle de « gestion des parties prenantes » alors que vous avez écrit « travail avec les équipes métier », une recherche simple peut ne pas vous trouver." },
          { type: "ul", items: [
            "Utilisez exactement les noms que l'offre emploie pour les outils, méthodes et certifications.",
            "Écrivez chaque terme une fois en entier avec son sigle : « Référencement naturel (SEO) ».",
            "Placez vos compétences clés dans la rubrique Compétences et aussi dans les lignes d'expérience qui les prouvent.",
            "N'indiquez que des compétences dont vous pouvez parler en entretien : le mot-clé vous rend visible, l'entretien vérifie.",
          ] },
        ],
      },
      {
        heading: "Un format lu sans erreur",
        blocks: [
          { type: "p", text: "C'est à l'analyse automatique que les CV très graphiques perdent des informations. Si l'ATS ne peut pas lire une rubrique, la recherche du recruteur ne trouvera pas ce qu'elle contient." },
          { type: "ul", items: [
            "Utilisez une mise en page sur une seule colonne. Les mises en page en plusieurs colonnes peuvent être lues dans le désordre.",
            "Gardez le texte sous forme de texte : pas dans des images, des icônes, des zones de texte ou des tableaux complexes.",
            "Utilisez des titres de rubrique standard : Expérience, Formation, Compétences, Projets.",
            "Exportez un PDF texte depuis Word ou Google Docs (pas un scan ni une photo). Si vous pouvez sélectionner et copier le texte, le système peut normalement le lire aussi.",
            "Écrivez les dates dans un format cohérent, comme « mars 2021 – aujourd'hui ».",
          ] },
        ],
      },
      {
        heading: "Comment tester votre propre CV",
        blocks: [
          { type: "ol", items: [
            "Copiez tout le texte de votre PDF et collez-le dans un éditeur de texte brut. S'il sort en désordre ou vide, il faut simplifier la mise en page.",
            "Collez la description du poste à côté et surlignez les outils, les compétences et les intitulés qu'elle répète.",
            "Vérifiez lesquels figurent dans votre CV, avec les mêmes mots.",
          ] },
          { type: "p", text: "CVXray automatise les étapes deux et trois : il lit votre CV comme le ferait un ATS, le compare à l'offre et liste par priorité les compétences manquantes, avec la ligne de l'offre qui demande chacune." },
        ],
      },
    ],
  },
  {
    slug: "tailor-cv-to-job-description",
    title: "Comment adapter votre CV à une offre d'emploi en 15 minutes",
    seoTitle: "Adapter son CV à une offre en 15 minutes",
    description:
      "Une méthode pratique, étape par étape, pour adapter votre CV à une offre d'emploi précise sans tout réécrire ni le bourrer de mots-clés.",
    published: "2026-11-11",
    updated: "2026-11-11",
    minutes: 5,
    relatedRoles: ["frontend-developer", "product-manager", "digital-marketing-specialist"],
    sections: [
      {
        heading: "Pourquoi adapter son CV fonctionne",
        blocks: [
          { type: "p", text: "Le recruteur qui lit votre CV se pose une seule question : cette personne fait-elle ce dont notre poste a besoin ? Un CV générique l'oblige à deviner la réponse. Un CV adapté la donne dans les dix premières secondes : la même expérience, organisée et formulée autour de son offre." },
          { type: "p", text: "Adapter son CV, ce n'est pas réécrire son parcours. C'est choisir quelles choses vraies passent en premier et les nommer avec les mots de l'entreprise." },
        ],
      },
      {
        heading: "Étape 1. Lisez l'offre pour repérer les priorités (3 minutes)",
        blocks: [
          { type: "ul", items: [
            "Soulignez chaque outil, compétence, méthode et certification.",
            "Marquez ceux qui reviennent plusieurs fois ou figurent dans l'intitulé du poste : ce sont les priorités.",
            "Notez les signaux de séniorité : années d'expérience, taille d'équipe, budget, périmètre.",
          ] },
        ],
      },
      {
        heading: "Étape 2. Trouvez vos écarts (2 minutes)",
        blocks: [
          { type: "p", text: "Comparez cette liste à votre CV. Certaines compétences manqueront parce que vous ne les avez pas : laissez-les de côté. D'autres manqueront seulement parce que vous ne les avez jamais écrites ou que vous avez employé d'autres mots. Ce sont les gains rapides." },
          { type: "tip", text: "CVXray fait cette comparaison pour vous : collez l'offre et votre CV, il liste les compétences manquantes, les plus prioritaires d'abord, avec la ligne de l'offre qui demande chacune." },
        ],
      },
      {
        heading: "Étape 3. Réécrivez votre accroche (3 minutes)",
        blocks: [
          { type: "p", text: "Votre accroche de deux lignes doit reprendre l'intitulé du poste et les deux ou trois priorités principales : « Développeur frontend avec 5 ans d'expérience sur des produits React et TypeScript, axé sur l'accessibilité et la performance ». Si l'intitulé de l'offre diffère un peu du vôtre, reprenez le sien tant que c'est honnête." },
        ],
      },
      {
        heading: "Étape 4. Réordonnez et reformulez vos lignes (5 minutes)",
        blocks: [
          { type: "ul", items: [
            "Remontez en tête de chaque poste les lignes qui prouvent les priorités de l'offre.",
            "Utilisez les noms que l'offre donne aux outils et aux méthodes.",
            "Ajoutez un chiffre partout où c'est possible : volume, temps gagné, chiffre d'affaires, utilisateurs, précision.",
            "Supprimez les lignes qui n'apportent rien pour ce poste. Mieux vaut court et pertinent que long et exhaustif.",
          ] },
        ],
      },
      {
        heading: "Étape 5. Mettez à jour la rubrique Compétences (2 minutes)",
        blocks: [
          { type: "p", text: "Listez en début de rubrique les compétences prioritaires de l'offre que vous avez vraiment, avec les mêmes mots. Puis faites une dernière vérification : chaque compétence de la liste doit être étayée par au moins une ligne plus haut." },
        ],
      },
      {
        heading: "Ce qu'il ne faut pas faire",
        blocks: [
          { type: "ul", items: [
            "Ne collez pas la description du poste dans votre CV, ni en clair ni en texte blanc. Les recruteurs le remarquent, et les systèmes actuels affichent ce texte.",
            "N'ajoutez pas de compétences que vous n'avez pas utilisées juste pour faire monter le score : l'entretien le révélera.",
            "N'envoyez pas le même CV « adapté » à toutes les offres. L'idée est de consacrer quinze minutes à chaque candidature.",
          ] },
        ],
      },
    ],
  },
  {
    slug: "what-is-a-good-cv-match-score",
    title: "Quel score de correspondance de CV est bon, et que faire du vôtre",
    seoTitle: "Quel est un bon score de correspondance de CV ?",
    description:
      "Comment se calcule le score de correspondance d'un CV, ce que 45 %, 70 % ou 90 % veulent vraiment dire et que faire à chaque niveau avant de postuler.",
    published: "2026-11-11",
    updated: "2026-11-11",
    minutes: 4,
    relatedRoles: ["data-analyst", "ai-engineer", "financial-analyst"],
    sections: [
      {
        heading: "Ce que mesure un score de correspondance",
        blocks: [
          { type: "p", text: "Le score de correspondance d'un CV estime quelle part de ce que demande une offre est visible dans votre CV. Il ne prédit pas si vous serez embauché : il mesure la correspondance, et c'est la correspondance qui décide si un recruteur vous trouve et vous présélectionne." },
          { type: "p", text: "Le score de CVXray est une comparaison pondérée en trois parties : les compétences citées par l'offre et présentes dans votre CV (50 %), le vocabulaire de l'offre que votre CV partage (35 %) et vos années d'expérience face à celles demandées (15 %). Les compétences que l'offre répète, ou qu'elle met dans l'intitulé, pèsent davantage." },
        ],
      },
      {
        heading: "Comment lire votre score",
        blocks: [
          { type: "ul", items: [
            "70 % ou plus : bonne correspondance. Votre CV montre déjà l'essentiel de ce que demande le poste. Peaufinez le premier tiers et postulez.",
            "45–69 % : compétitif. Vous avez probablement l'expérience, mais vous ne la montrez pas entièrement. Comblez d'abord un ou deux écarts de priorité haute.",
            "Moins de 45 % : écarts importants. Soit le poste est encore au-dessus de votre niveau, soit votre CV est écrit pour un autre type de poste. Adaptez-le en profondeur ou demandez-vous si c'est le bon poste.",
          ] },
          { type: "tip", text: "Le score maximum est de 95 %. Un 100 % parfait voudrait dire recopier l'offre, ce qui n'est ni l'objectif ni une bonne idée." },
        ],
      },
      {
        heading: "Pourquoi votre score peut être plus bas que prévu",
        blocks: [
          { type: "ul", items: [
            "Des mots différents : « fidélisation client » dans votre CV, « réduction du churn » dans l'offre.",
            "Des compétences seulement implicites : vous utilisiez Docker tous les jours, mais vous n'avez jamais écrit le mot.",
            "Un CV ou une offre très courts, ce qui rend toute comparaison moins fiable.",
            "Une expérience sans dates : les années se lisent dans des phrases comme « 5 ans d'expérience » ou dans des périodes comme « 2019 – aujourd'hui ».",
          ] },
        ],
      },
      {
        heading: "Comment l'augmenter sans tricher",
        blocks: [
          { type: "ol", items: [
            "Commencez par les compétences de priorité haute qui manquent et que vous avez vraiment, et placez-les là où elles sont prouvées : dans une ligne d'expérience, pas seulement dans la liste de compétences.",
            "Utilisez les noms que l'offre donne aux outils et aux méthodes.",
            "Ajoutez les dates à vos postes pour que votre expérience puisse être comptée.",
            "Relancez l'analyse. Passer de la cinquantaine à plus de soixante-dix rien qu'en changeant la formulation est fréquent.",
          ] },
          { type: "p", text: "Si les écarts restants sont des compétences que vous n'avez pas, la réponse n'est pas un score plus élevé : ce sont les formations conseillées, ou un poste qui vous correspond mieux." },
        ],
      },
    ],
  },
];

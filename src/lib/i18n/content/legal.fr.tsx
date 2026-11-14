import Link from "next/link";
import { CONTACT_EMAIL, SUPPORT } from "@/lib/site";
import type { LegalPages } from "./types";

const contact = CONTACT_EMAIL
  ? <>écrivez à <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></>
  : <>répondez à l&apos;e-mail de reçu que Lemon Squeezy vous a envoyé</>;

export const LEGAL: LegalPages = {
  privacy: {
    title: "Politique de confidentialité",
    description: "CVXray n'enregistre jamais votre CV. Quelles données sont traitées, où et combien de temps, comment fonctionnent statistiques et paiements, et vos droits.",
    intro: <p>CVXray est conçu pour que votre CV reste le vôtre. Cette page explique précisément ce qui est traité, où et pendant combien de temps. CVXray est exploité par une personne physique résidant aux Pays-Bas, qui est responsable du traitement des données du site.</p>,
    sections: [
      { title: "Votre CV", body: <ul>
        <li><strong>Le texte collé</strong> ne quitte jamais votre navigateur. L&apos;analyse s&apos;exécute entièrement sur votre appareil.</li>
        <li><strong>Les PDF importés</strong> sont envoyés à notre serveur uniquement pour en extraire le texte, qui est renvoyé à votre navigateur. Le fichier et son texte sont supprimés immédiatement : ils ne sont jamais écrits dans une base de données, un fichier ou un journal.</li>
        <li>Le contenu du CV n&apos;est jamais utilisé pour des statistiques, de la publicité ou pour entraîner quoi que ce soit.</li>
      </ul> },
      { title: "Offres d'emploi", body: <p>Si vous collez le lien d&apos;une offre, notre serveur récupère cette page publique, en extrait le texte et le renvoie à votre navigateur. Le lien et le contenu de la page ne sont pas conservés.</p> },
      { title: "Ce qui est conservé dans votre navigateur", body: <p>Votre navigateur conserve vos trois derniers scores (score, libellé et nombre de compétences, sans texte du CV) et votre choix concernant les cookies, pour que le site puisse les afficher la prochaine fois. Effacez les données du site dans votre navigateur pour les supprimer.</p> },
      { title: "Statistiques et mesure publicitaire", body: <>
        <p>Uniquement si vous cliquez sur &laquo;&nbsp;Tout accepter&nbsp;&raquo; dans le bandeau cookies, Google Tag Manager charge Google Analytics et la mesure Google Ads. Ils enregistrent un usage anonyme, comme les pages vues et l&apos;aboutissement d&apos;une analyse, jamais le contenu de votre CV ou de l&apos;offre. Vous pouvez modifier votre choix à tout moment via &laquo;&nbsp;Paramètres des cookies&nbsp;&raquo; en pied de page.</p>
        <p>Nous utilisons aussi Vercel Web Analytics, qui compte les pages vues sans cookies et sans vous identifier.</p>
      </> },
      { title: "Paiements", body: <p>Les paiements de soutien facultatifs sont traités par Lemon Squeezy en tant que vendeur officiel (merchant of record). Lemon Squeezy collecte vos données de paiement selon sa propre politique de confidentialité ; nous ne voyons jamais les données de votre carte. Nous recevons les données de commande nécessaires pour fournir le service et traiter les remboursements : votre nom, votre e-mail, le montant et le pays.</p> },
      { title: "Hébergement et sécurité", body: <p>Le site est hébergé par Vercel. Pour servir les pages et protéger le site contre les abus, votre adresse IP est traitée dans les journaux du serveur et, pour limiter le nombre de requêtes, conservée en mémoire pendant environ une minute.</p> },
      { title: "Vos droits", body: <p>En vertu du RGPD, vous pouvez demander l&apos;accès, la rectification ou l&apos;effacement des données personnelles que nous détenons sur vous, ou vous opposer à leur utilisation. Comme nous ne conservons aucune donnée de CV, il n&apos;y a en général rien à effacer en dehors des données de paiement, que nous devons conserver pour des raisons fiscales. Vous pouvez aussi déposer une réclamation auprès de l&apos;autorité néerlandaise de protection des données (Autoriteit Persoonsgegevens).</p> },
      { title: "Contact", body: <p>Pour toute question sur la confidentialité, {contact}.</p> },
    ],
  },
  terms: {
    title: "Conditions d'utilisation",
    description: "Les conditions d'utilisation de CVXray, l'analyseur de CV gratuit : usage acceptable, vos données, responsabilité et paiements de soutien via Lemon Squeezy.",
    intro: <p>Ces conditions s&apos;appliquent lorsque vous utilisez CVXray sur cvxray.com. CVXray est exploité par une personne physique résidant aux Pays-Bas. En utilisant le site, vous acceptez ces conditions. Si vous n&apos;êtes pas d&apos;accord, merci de ne pas l&apos;utiliser.</p>,
    sections: [
      { title: "Ce que fait CVXray", body: <p>CVXray compare un CV à une offre d&apos;emploi et affiche un score de correspondance, les compétences communes et manquantes, des mots-clés et des suggestions de formations. L&apos;outil est gratuit, sans compte et sans limite d&apos;utilisation. Les résultats sont des indications automatiques pour vous aider à adapter votre CV. Ils ne constituent ni une prédiction ni une garantie d&apos;entretien, d&apos;offre d&apos;emploi ou de décision d&apos;embauche.</p> },
      { title: "Utilisation du site", body: <>
        <p>Vous pouvez utiliser CVXray pour votre propre recherche d&apos;emploi ou pour aider d&apos;autres personnes dans la leur. Vous vous engagez à ne pas :</p>
        <ul>
          <li>importer de contenu que vous n&apos;avez pas le droit d&apos;utiliser, ni les données personnelles d&apos;autres personnes sans leur accord ;</li>
          <li>attaquer, surcharger ou extraire massivement le contenu du site, ni tenter de contourner sa sécurité ou ses limites d&apos;utilisation ;</li>
          <li>utiliser la fonction de lien pour récupérer autre chose que des offres d&apos;emploi publiques ;</li>
          <li>utiliser le site à des fins illégales.</li>
        </ul>
        <p>Nous pouvons bloquer l&apos;accès qui enfreint ces règles.</p>
      </> },
      { title: "Votre CV et vos données", body: <p>Votre CV n&apos;est jamais enregistré. Le traitement du texte du CV, des offres, des données de statistiques et de paiement est décrit dans la <Link href="/fr/privacy">Politique de confidentialité</Link>.</p> },
      { title: "Paiements de soutien facultatifs", body: <>
        <p>CVXray peut proposer un paiement de soutien volontaire et unique (n&apos;importe quel montant à partir de {SUPPORT.minimumEur} €). Les paiements de soutien ne débloquent aucune fonction : l&apos;outil reste gratuit, que vous payiez ou non.</p>
        <p>Les paiements sont vendus et traités par <a href="https://www.lemonsqueezy.com" target="_blank" rel="noopener noreferrer">Lemon Squeezy</a>, qui agit en tant que vendeur officiel (merchant of record). Lemon Squeezy gère le paiement, sa sécurité, les factures et les taxes sur les ventes ou la TVA, et ses propres conditions s&apos;appliquent à l&apos;achat. Nous ne voyons jamais les données de votre carte.</p>
        <p>Vous pouvez obtenir un remboursement intégral sous {SUPPORT.refundDays} jours ; voir la <Link href="/fr/refund-policy">Politique de remboursement</Link>.</p>
      </> },
      { title: "Liens vers des tiers", body: <p>Les résultats renvoient vers des formations, des sites d&apos;emploi et des ressources d&apos;entretien gérés par d&apos;autres. Nous ne contrôlons pas ces sites et ne sommes pas responsables de leur contenu, de leurs prix ou de leur disponibilité.</p> },
      { title: "Disponibilité et modifications", body: <p>CVXray est fourni en l&apos;état. Nous faisons en sorte qu&apos;il soit précis et disponible, mais ne pouvons pas promettre qu&apos;il soit toujours exempt d&apos;erreurs ou en ligne, et nous pouvons modifier ou retirer des fonctions à tout moment.</p> },
      { title: "Responsabilité", body: <p>Dans la mesure permise par la loi, nous ne sommes pas responsables des pertes indirectes ou consécutives, ni des décisions que vous prenez sur la base des résultats. Rien dans ces conditions ne limite une responsabilité qui ne peut l&apos;être légalement ni vos droits légaux de consommateur.</p> },
      { title: "Modifications de ces conditions", body: <p>Nous pouvons mettre à jour ces conditions. La date ci-dessus indique la version la plus récente. Si vous continuez à utiliser le site après une modification, vous acceptez les conditions mises à jour.</p> },
      { title: "Droit applicable", body: <p>Ces conditions sont régies par le droit néerlandais. Si vous êtes consommateur, vous conservez aussi la protection des dispositions impératives du pays où vous résidez.</p> },
      { title: "Contact", body: <p>Pour toute question sur ces conditions, {contact}.</p> },
    ],
  },
  refunds: {
    title: "Politique de remboursement",
    description: `Les paiements de soutien à CVXray sont remboursés intégralement sous ${SUPPORT.refundDays} jours, sans question. Voici comment demander un remboursement.`,
    intro: <p>CVXray est gratuit. Le seul paiement que CVXray peut proposer est un paiement de soutien volontaire et unique (n&apos;importe quel montant à partir de {SUPPORT.minimumEur} €), traité par Lemon Squeezy. Si vous payez puis changez d&apos;avis, nous vous remboursons.</p>,
    sections: [
      { title: `Remboursement intégral sous ${SUPPORT.refundDays} jours`, body: <p>Vous pouvez demander le remboursement intégral d&apos;un paiement de soutien dans les {SUPPORT.refundDays} jours suivant le paiement. Aucune justification n&apos;est demandée et rien n&apos;est retenu.</p> },
      { title: "Comment demander un remboursement", body: <ul>
        <li>Répondez à l&apos;e-mail de reçu envoyé par Lemon Squeezy, ou</li>
        <li>retrouvez la commande dans vos <a href="https://app.lemonsqueezy.com/my-orders" target="_blank" rel="noopener noreferrer">commandes Lemon Squeezy</a> et contactez le support depuis cette page{CONTACT_EMAIL ? ", ou" : "."}</li>
        {CONTACT_EMAIL && <li>écrivez à <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> depuis l&apos;adresse utilisée pour payer.</li>}
      </ul> },
      { title: "Quand l'argent revient", body: <p>Les remboursements sont versés sur le moyen de paiement d&apos;origine. Lemon Squeezy les émet immédiatement ; votre banque ou l&apos;émetteur de votre carte affiche généralement le montant sous 5 à 10 jours ouvrés.</p> },
      { title: `Après ${SUPPORT.refundDays} jours`, body: <p>Les paiements accidentels ou en double sont toujours remboursés, quel que soit le moment où vous vous en apercevez. Pour tout autre cas après {SUPPORT.refundDays} jours, contactez-nous et nous examinerons votre demande.</p> },
      { title: "Vos droits légaux", body: <p>Cette politique s&apos;ajoute à vos droits légaux de consommateur et ne les limite pas. Voir aussi les <Link href="/fr/terms">Conditions d&apos;utilisation</Link>.</p> },
    ],
  },
};

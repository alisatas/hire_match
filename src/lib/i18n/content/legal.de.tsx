import Link from "next/link";
import { CONTACT_EMAIL, SUPPORT } from "@/lib/site";
import type { LegalPages } from "./types";

const contact = CONTACT_EMAIL
  ? <>schreiben Sie an <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></>
  : <>antworten Sie auf die Beleg-E-Mail, die Ihnen Lemon Squeezy geschickt hat</>;

export const LEGAL: LegalPages = {
  privacy: {
    title: "Datenschutzerklärung",
    description: "CVXray speichert Ihren Lebenslauf nie. Welche Daten wo und wie lange verarbeitet werden, wie Analyse und Zahlungen laufen und welche Rechte Sie haben.",
    intro: <p>CVXray ist so gebaut, dass Ihr Lebenslauf Ihnen gehört. Diese Seite erklärt genau, was verarbeitet wird, wo und wie lange. CVXray wird von einer Privatperson mit Sitz in den Niederlanden betrieben, die für die Website datenschutzrechtlich verantwortlich ist.</p>,
    sections: [
      { title: "Ihr Lebenslauf", body: <ul>
        <li><strong>Eingefügter Text</strong> verlässt Ihren Browser nie. Die Analyse läuft vollständig auf Ihrem Gerät.</li>
        <li><strong>Hochgeladene PDFs</strong> werden nur an unseren Server geschickt, um den Text auszulesen, der an Ihren Browser zurückgeht. Datei und Text werden sofort verworfen und nie in eine Datenbank, Datei oder ein Protokoll geschrieben.</li>
        <li>Inhalte von Lebensläufen werden nie für Analysen, Werbung oder das Training von irgendetwas verwendet.</li>
      </ul> },
      { title: "Stellenanzeigen", body: <p>Wenn Sie einen Link zu einer Stelle einfügen, ruft unser Server diese öffentliche Seite ab, liest den Text aus und gibt ihn an Ihren Browser zurück. Link und Seiteninhalt werden nicht gespeichert.</p> },
      { title: "In Ihrem Browser gespeichert", body: <p>Ihr Browser speichert Ihre letzten drei Match-Scores (Score, Bezeichnung und Anzahl der Skills, kein Lebenslauf-Text) und Ihre Cookie-Auswahl, damit die Website sie beim nächsten Besuch anzeigen kann. Löschen Sie die Website-Daten Ihres Browsers, um sie zu entfernen.</p> },
      { title: "Analyse und Anzeigenmessung", body: <>
        <p>Nur wenn Sie im Cookie-Banner auf &bdquo;Alle akzeptieren&ldquo; klicken, lädt der Google Tag Manager Google Analytics und die Google-Ads-Messung. Diese erfassen anonyme Nutzung wie Seitenaufrufe und ob eine Analyse abgeschlossen wurde, niemals den Inhalt Ihres Lebenslaufs oder der Stellenanzeige. Sie können Ihre Auswahl jederzeit über &bdquo;Cookie-Einstellungen&ldquo; in der Fußzeile ändern.</p>
        <p>Außerdem nutzen wir Vercel Web Analytics, das Seitenaufrufe ohne Cookies und ohne Sie zu identifizieren zählt.</p>
      </> },
      { title: "Zahlungen", body: <p>Freiwillige Unterstützungszahlungen wickelt Lemon Squeezy als Verkäufer (Merchant of Record) ab. Lemon Squeezy erhebt Ihre Zahlungsdaten nach seiner eigenen Datenschutzerklärung; Ihre Kartendaten sehen wir nie. Wir erhalten die Bestelldaten, die wir für den Betrieb und für Erstattungen brauchen: Name, E-Mail-Adresse, Betrag und Land.</p> },
      { title: "Hosting und Sicherheit", body: <p>Die Website wird bei Vercel gehostet. Um Seiten auszuliefern und die Website vor Missbrauch zu schützen, wird Ihre IP-Adresse in Server-Protokollen verarbeitet und für die Begrenzung von Anfragen etwa eine Minute im Arbeitsspeicher gehalten.</p> },
      { title: "Ihre Rechte", body: <p>Nach der DSGVO können Sie Auskunft über Ihre bei uns gespeicherten personenbezogenen Daten, deren Berichtigung oder Löschung verlangen oder der Verwendung widersprechen. Da wir keine Lebenslaufdaten speichern, gibt es meist nichts zu löschen außer Zahlungsunterlagen, die wir aus steuerlichen Gründen aufbewahren müssen. Sie können sich auch bei der niederländischen Datenschutzbehörde (Autoriteit Persoonsgegevens) beschweren.</p> },
      { title: "Kontakt", body: <p>Bei Fragen zum Datenschutz {contact}.</p> },
    ],
  },
  terms: {
    title: "Nutzungsbedingungen",
    description: "Bedingungen für CVXray, den kostenlosen Lebenslauf-Check: zulässige Nutzung, Ihre Daten, Haftung und freiwillige Zahlungen über Lemon Squeezy.",
    intro: <p>Diese Bedingungen gelten, wenn Sie CVXray auf cvxray.com nutzen. CVXray wird von einer Privatperson mit Sitz in den Niederlanden betrieben. Mit der Nutzung der Website stimmen Sie diesen Bedingungen zu. Wenn Sie nicht zustimmen, nutzen Sie die Website bitte nicht.</p>,
    sections: [
      { title: "Was CVXray tut", body: <p>CVXray vergleicht einen Lebenslauf mit einer Stellenanzeige und zeigt einen Match-Score, passende und fehlende Skills, Keywords und Kursvorschläge. Das Tool ist kostenlos, ohne Konto und ohne Nutzungslimit. Die Ergebnisse sind automatisierte Hinweise, die Ihnen beim Anpassen Ihres Lebenslaufs helfen. Sie sind keine Vorhersage oder Garantie für ein Vorstellungsgespräch, ein Jobangebot oder eine Einstellungsentscheidung.</p> },
      { title: "Nutzung der Website", body: <>
        <p>Sie dürfen CVXray für Ihre eigene Jobsuche nutzen oder um anderen bei ihrer zu helfen. Sie verpflichten sich, Folgendes zu unterlassen:</p>
        <ul>
          <li>Inhalte hochzuladen, zu deren Nutzung Sie nicht berechtigt sind, oder personenbezogene Daten anderer ohne deren Erlaubnis;</li>
          <li>die Website anzugreifen, zu überlasten, automatisiert auszulesen oder ihre Sicherheitsmaßnahmen oder Anfragelimits zu umgehen;</li>
          <li>die Link-Funktion für etwas anderes als öffentliche Stellenanzeigen zu verwenden;</li>
          <li>die Website für rechtswidrige Zwecke zu nutzen.</li>
        </ul>
        <p>Wir können Zugriffe sperren, die gegen diese Regeln verstoßen.</p>
      </> },
      { title: "Ihr Lebenslauf und Ihre Daten", body: <p>Ihr Lebenslauf wird nie gespeichert. Wie Lebenslauf-Text, Stellenanzeigen, Analyse- und Zahlungsdaten verarbeitet werden, beschreibt die <Link href="/de/privacy">Datenschutzerklärung</Link>.</p> },
      { title: "Freiwillige Unterstützungszahlungen", body: <>
        <p>CVXray kann eine freiwillige, einmalige Unterstützungszahlung anbieten (beliebiger Betrag ab {SUPPORT.minimumEur} €). Unterstützungszahlungen schalten keine Funktionen frei; das Tool bleibt kostenlos, ob Sie zahlen oder nicht.</p>
        <p>Zahlungen werden von <a href="https://www.lemonsqueezy.com" target="_blank" rel="noopener noreferrer">Lemon Squeezy</a> als Verkäufer (Merchant of Record) verkauft und abgewickelt. Lemon Squeezy übernimmt Checkout, Zahlungssicherheit, Rechnungen sowie Umsatzsteuer, und für den Kauf gelten seine eigenen Bedingungen. Ihre Kartendaten sehen wir nie.</p>
        <p>Innerhalb von {SUPPORT.refundDays} Tagen erhalten Sie eine volle Erstattung, siehe <Link href="/de/refund-policy">Erstattungsrichtlinie</Link>.</p>
      </> },
      { title: "Links zu Dritten", body: <p>Die Ergebnisse verlinken auf Kurse, Jobportale und Ressourcen zur Bewerbung, die von anderen betrieben werden. Wir haben keinen Einfluss auf diese Websites und sind nicht für deren Inhalte, Preise oder Verfügbarkeit verantwortlich.</p> },
      { title: "Verfügbarkeit und Änderungen", body: <p>CVXray wird bereitgestellt, wie es ist. Wir bemühen uns um Richtigkeit und Verfügbarkeit, können aber nicht zusagen, dass die Website immer fehlerfrei oder erreichbar ist, und wir können Funktionen jederzeit ändern oder einstellen.</p> },
      { title: "Haftung", body: <p>Soweit gesetzlich zulässig, haften wir nicht für mittelbare oder Folgeschäden oder für Entscheidungen, die Sie auf Grundlage der Ergebnisse treffen. Nichts in diesen Bedingungen beschränkt eine Haftung, die gesetzlich nicht beschränkt werden kann, oder Ihre gesetzlichen Rechte als Verbraucher.</p> },
      { title: "Änderungen dieser Bedingungen", body: <p>Wir können diese Bedingungen aktualisieren. Das Datum oben zeigt die aktuelle Fassung. Wenn Sie die Website nach einer Änderung weiter nutzen, akzeptieren Sie die aktualisierten Bedingungen.</p> },
      { title: "Anwendbares Recht", body: <p>Diese Bedingungen unterliegen niederländischem Recht. Als Verbraucher behalten Sie zusätzlich den Schutz der zwingenden Vorschriften des Landes, in dem Sie leben.</p> },
      { title: "Kontakt", body: <p>Bei Fragen zu diesen Bedingungen {contact}.</p> },
    ],
  },
  refunds: {
    title: "Erstattungsrichtlinie",
    description: `Unterstützungszahlungen an CVXray werden innerhalb von ${SUPPORT.refundDays} Tagen ohne Angabe von Gründen voll erstattet. So beantragen Sie eine Erstattung.`,
    intro: <p>CVXray ist kostenlos. Die einzige Zahlung, die CVXray anbieten kann, ist eine freiwillige, einmalige Unterstützungszahlung (beliebiger Betrag ab {SUPPORT.minimumEur} €), abgewickelt von Lemon Squeezy. Wenn Sie zahlen und es sich anders überlegen, bekommen Sie Ihr Geld zurück.</p>,
    sections: [
      { title: `Volle Erstattung innerhalb von ${SUPPORT.refundDays} Tagen`, body: <p>Sie können innerhalb von {SUPPORT.refundDays} Tagen nach der Zahlung die volle Erstattung einer Unterstützungszahlung verlangen. Eine Begründung ist nicht nötig, und es wird nichts abgezogen.</p> },
      { title: "So beantragen Sie eine Erstattung", body: <ul>
        <li>Antworten Sie auf die Beleg-E-Mail von Lemon Squeezy, oder</li>
        <li>suchen Sie die Bestellung in Ihren <a href="https://app.lemonsqueezy.com/my-orders" target="_blank" rel="noopener noreferrer">Lemon-Squeezy-Bestellungen</a> und wenden Sie sich von dort an den Support{CONTACT_EMAIL ? ", oder" : "."}</li>
        {CONTACT_EMAIL && <li>schreiben Sie von der Adresse, mit der Sie bezahlt haben, an <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</li>}
      </ul> },
      { title: "Wann das Geld zurückkommt", body: <p>Erstattungen gehen auf die ursprüngliche Zahlungsart zurück. Lemon Squeezy veranlasst sie sofort; Ihre Bank oder Ihr Kartenanbieter zeigt den Betrag meist innerhalb von 5–10 Werktagen an.</p> },
      { title: `Nach ${SUPPORT.refundDays} Tagen`, body: <p>Versehentliche oder doppelte Zahlungen werden immer erstattet, egal wann Sie sie bemerken. Für alles andere nach {SUPPORT.refundDays} Tagen melden Sie sich bei uns, und wir sehen es uns an.</p> },
      { title: "Ihre gesetzlichen Rechte", body: <p>Diese Richtlinie gilt zusätzlich zu Ihren gesetzlichen Verbraucherrechten und schränkt sie nicht ein. Siehe auch die <Link href="/de/terms">Nutzungsbedingungen</Link>.</p> },
    ],
  },
};

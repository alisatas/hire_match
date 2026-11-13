import type { Post } from "@/lib/posts";

// German articles. Same slugs, dates, sections and block types as src/lib/posts.ts.

export const POSTS: Post[] = [
  {
    slug: "how-ats-reads-your-cv",
    title: "Wie Bewerbermanagementsysteme (ATS) Ihren Lebenslauf wirklich lesen",
    seoTitle: "Wie ein ATS Ihren Lebenslauf wirklich liest",
    description:
      "Was ein ATS tatsächlich mit Ihrem Lebenslauf macht, warum „75 % werden automatisch aussortiert“ ein Mythos ist und wie Recruiter Sie finden.",
    published: "2026-11-11",
    updated: "2026-11-11",
    minutes: 6,
    relatedRoles: ["software-engineer", "account-executive", "recruiter"],
    sections: [
      {
        heading: "Was ein ATS ist",
        blocks: [
          { type: "p", text: "Ein Bewerbermanagementsystem (englisch Applicant Tracking System, kurz ATS) ist die Software, mit der ein Unternehmen Bewerbungen sammelt, Kandidaten durch die Gesprächsrunden führt und jede Einstellung dokumentiert. Greenhouse, Workday, Lever, SmartRecruiters und viele andere erledigen im Kern dieselbe Aufgabe: Sie machen aus einem Stapel Lebensläufe eine durchsuchbare Datenbank." },
          { type: "p", text: "Wenn Sie sich bewerben, speichert das ATS Ihren Lebenslauf und versucht in der Regel, ihn auszulesen: Name, Kontaktdaten, Positionen, Arbeitgeber, Zeiträume, Ausbildung und Kenntnisse landen in strukturierten Feldern. Recruiter sichten dann die Bewerbungen, filtern sie und, das ist entscheidend, durchsuchen sie." },
        ],
      },
      {
        heading: "Der Mythos von der automatischen Absage",
        blocks: [
          { type: "p", text: "Oft ist zu lesen, „75 % der Lebensläufe werden vom ATS aussortiert, bevor ein Mensch sie sieht“. Hinter dieser Zahl steht keine veröffentlichte Studie, und sie beschreibt falsch, wie die meisten Systeme arbeiten. In den meisten Unternehmen liest nicht das ATS Ihren Lebenslauf und entscheidet. Das tun Menschen." },
          { type: "p", text: "Was Bewerber tatsächlich automatisch herausfiltert, sind Ausschlussfragen, die der Arbeitgeber einrichtet, zum Beispiel „Haben Sie eine Arbeitserlaubnis für Deutschland?“ oder „Besitzen Sie einen Führerschein?“. Beantworten Sie diese ehrlich und sorgfältig, denn ein falscher Klick an dieser Stelle ist ein echter Absagegrund." },
          { type: "tip", text: "Das eigentliche Risiko ist kein Roboter, der Sie ablehnt. Es ist ein Recruiter, der nach „Salesforce“ oder „React“ sucht, und Ihr Lebenslauf taucht in den Ergebnissen nicht auf, weil das Wort nicht darin steht." },
        ],
      },
      {
        heading: "Warum Keywords trotzdem zählen",
        blocks: [
          { type: "p", text: "Recruiter durchsuchen das ATS so, wie Sie im Web suchen: Sie tippen die Skills und Jobtitel ein, die der Fachbereich verlangt hat. Steht in der Anzeige „Next.js“ und in Ihrem Lebenslauf „NextJS“, oder steht in der Anzeige „Stakeholder-Management“ und Sie haben „Zusammenarbeit mit den Fachabteilungen“ geschrieben, kann eine einfache Suche Sie übersehen." },
          { type: "ul", items: [
            "Verwenden Sie für Tools, Methoden und Zertifikate genau die Bezeichnungen aus der Anzeige.",
            "Schreiben Sie einen Begriff einmal aus und setzen Sie die Abkürzung dazu: „Suchmaschinenoptimierung (SEO)“.",
            "Nennen Sie Ihre wichtigsten Skills sowohl im Abschnitt „Kenntnisse“ als auch in den Stichpunkten, die sie belegen.",
            "Nennen Sie nur Skills, über die Sie im Vorstellungsgespräch sprechen können. Das Keyword sorgt dafür, dass Sie gefunden werden, das Gespräch prüft es nach.",
          ] },
        ],
      },
      {
        heading: "Ein Layout, das sich sauber auslesen lässt",
        blocks: [
          { type: "p", text: "Beim Auslesen verlieren aufwendig gestaltete Lebensläufe Informationen. Kann das ATS einen Abschnitt nicht lesen, findet die Suche des Recruiters nicht, was darin steht." },
          { type: "ul", items: [
            "Nutzen Sie ein einspaltiges Layout. Mehrspaltige Designs können in der falschen Reihenfolge gelesen werden.",
            "Lassen Sie Text Text sein: nicht in Bildern, Icons, Textfeldern oder komplexen Tabellen.",
            "Verwenden Sie übliche Überschriften: Berufserfahrung, Ausbildung, Kenntnisse, Projekte.",
            "Exportieren Sie ein textbasiertes PDF aus Word oder Google Docs (keinen Scan und kein Foto). Wenn Sie den Text markieren und kopieren können, kann ihn in der Regel auch ein Parser lesen.",
            "Schreiben Sie Zeiträume einheitlich, zum Beispiel „03/2021 – heute“.",
          ] },
        ],
      },
      {
        heading: "So prüfen Sie Ihren eigenen Lebenslauf",
        blocks: [
          { type: "ol", items: [
            "Kopieren Sie den gesamten Text aus Ihrem PDF und fügen Sie ihn in einen einfachen Texteditor ein. Kommt er durcheinander oder leer an, muss das Layout einfacher werden.",
            "Legen Sie die Stellenanzeige daneben und markieren Sie die Tools, Skills und Jobtitel, die sie wiederholt.",
            "Prüfen Sie, welche davon in Ihrem Lebenslauf stehen, und zwar im selben Wortlaut.",
          ] },
          { type: "p", text: "CVXray übernimmt die Schritte zwei und drei: Es liest Ihren Lebenslauf so, wie ein Parser es tut, vergleicht ihn mit der Anzeige und listet die fehlenden Skills nach Priorität auf, jeweils mit der Zeile der Stellenanzeige, die danach verlangt." },
        ],
      },
    ],
  },
  {
    slug: "tailor-cv-to-job-description",
    title: "Lebenslauf in 15 Minuten an eine Stellenanzeige anpassen",
    seoTitle: "Lebenslauf an die Stellenanzeige anpassen",
    description:
      "Schritt für Schritt: den Lebenslauf auf eine konkrete Stellenanzeige zuschneiden, ohne ihn neu zu schreiben oder mit Keywords zu überladen.",
    published: "2026-11-11",
    updated: "2026-11-11",
    minutes: 5,
    relatedRoles: ["frontend-developer", "product-manager", "digital-marketing-specialist"],
    sections: [
      {
        heading: "Warum Anpassen wirkt",
        blocks: [
          { type: "p", text: "Wer Ihren Lebenslauf für eine Stelle liest, stellt sich eine einzige Frage: Kann diese Person, was unsere Stelle braucht? Ein allgemeiner Lebenslauf lässt die Leser die Antwort selbst herausarbeiten. Ein angepasster beantwortet sie in den ersten zehn Sekunden: dieselbe Erfahrung, nach der Anzeige geordnet und formuliert." },
          { type: "p", text: "Anpassen heißt nicht, den eigenen Werdegang umzuschreiben. Es heißt zu entscheiden, welche wahren Dinge zuerst kommen, und dafür die Worte des Arbeitgebers zu verwenden." },
        ],
      },
      {
        heading: "Schritt 1: Die Anzeige auf Prioritäten lesen (3 Minuten)",
        blocks: [
          { type: "ul", items: [
            "Unterstreichen Sie jedes Tool, jeden Skill, jede Methode und jedes Zertifikat.",
            "Markieren Sie, was mehr als einmal oder im Stellentitel vorkommt. Das sind die Prioritäten.",
            "Notieren Sie die Hinweise auf das Erfahrungsniveau: Berufsjahre, Teamgröße, Budget, Verantwortungsbereich.",
          ] },
        ],
      },
      {
        heading: "Schritt 2: Die eigenen Lücken finden (2 Minuten)",
        blocks: [
          { type: "p", text: "Vergleichen Sie diese Liste mit Ihrem Lebenslauf. Manche Skills fehlen, weil Sie sie nicht haben. Lassen Sie diese weg. Andere fehlen nur, weil Sie sie nie aufgeschrieben oder anders benannt haben. Das sind die schnellen Gewinne." },
          { type: "tip", text: "CVXray nimmt Ihnen diesen Vergleich ab: Fügen Sie die Anzeige und Ihren Lebenslauf ein, und Sie erhalten die fehlenden Skills, die wichtigsten zuerst, jeweils mit der Zeile der Anzeige, die danach verlangt." },
        ],
      },
      {
        heading: "Schritt 3: Das Kurzprofil neu schreiben (3 Minuten)",
        blocks: [
          { type: "p", text: "Ihr zweizeiliges Kurzprofil sollte den Stellentitel und die zwei oder drei wichtigsten Prioritäten aufgreifen: „Frontend Developer mit 5 Jahren Erfahrung in der Entwicklung von Produkten mit React und TypeScript, mit Schwerpunkt auf Barrierefreiheit und Performance.“ Weicht der Titel der Anzeige leicht von Ihrem ab, übernehmen Sie ihn dort, wo das ehrlich ist." },
        ],
      },
      {
        heading: "Schritt 4: Stichpunkte umsortieren und umformulieren (5 Minuten)",
        blocks: [
          { type: "ul", items: [
            "Ziehen Sie die Stichpunkte, die die Prioritäten der Anzeige belegen, bei jeder Position nach oben.",
            "Verwenden Sie für Tools und Methoden die Bezeichnungen aus der Anzeige.",
            "Ergänzen Sie in jedem Stichpunkt eine Zahl, wo es geht: Größenordnung, eingesparte Zeit, Umsatz, Nutzer, Genauigkeit.",
            "Streichen Sie Stichpunkte, die diese Stelle nicht stützen. Kurz und relevant schlägt lang und vollständig.",
          ] },
        ],
      },
      {
        heading: "Schritt 5: Den Abschnitt „Kenntnisse“ aktualisieren (2 Minuten)",
        blocks: [
          { type: "p", text: "Führen Sie die vorrangigen Skills der Anzeige, die Sie wirklich haben, in deren Wortlaut weit oben im Abschnitt auf. Machen Sie dann eine letzte Kontrolle: Jeder Skill in der Liste sollte durch mindestens einen Stichpunkt weiter oben belegt sein." },
        ],
      },
      {
        heading: "Was Sie lassen sollten",
        blocks: [
          { type: "ul", items: [
            "Kopieren Sie die Stellenanzeige nicht in Ihren Lebenslauf, weder sichtbar noch in weißer Schrift. Recruiter bemerken es, und moderne Systeme zeigen den Text an.",
            "Nehmen Sie keine Skills auf, die Sie nie eingesetzt haben, um den Match-Score zu erhöhen. Im Vorstellungsgespräch fällt es auf.",
            "Schicken Sie nicht denselben „angepassten“ Lebenslauf an jede Stelle. Fünfzehn Minuten pro Bewerbung sind genau der Punkt.",
          ] },
        ],
      },
    ],
  },
  {
    slug: "what-is-a-good-cv-match-score",
    title: "Was ist ein guter Match-Score für den Lebenslauf, und was fangen Sie damit an?",
    seoTitle: "Was ist ein guter Lebenslauf-Match-Score?",
    description:
      "Wie ein Match-Score für den Lebenslauf berechnet wird, was 45 %, 70 % oder 90 % wirklich bedeuten und welcher Schritt vor der Bewerbung jeweils sinnvoll ist.",
    published: "2026-11-11",
    updated: "2026-11-11",
    minutes: 4,
    relatedRoles: ["data-analyst", "ai-engineer", "financial-analyst"],
    sections: [
      {
        heading: "Was ein Match-Score misst",
        blocks: [
          { type: "p", text: "Ein Match-Score schätzt, wie viel von dem, was eine Stellenanzeige verlangt, in Ihrem Lebenslauf sichtbar ist. Er sagt nicht voraus, ob Sie eingestellt werden. Er misst Überschneidung, und Überschneidung entscheidet darüber, ob ein Recruiter Sie findet und in die engere Auswahl nimmt." },
          { type: "p", text: "Der Score von CVXray ist ein gewichteter Vergleich aus drei Teilen: Skills, die die Stelle nennt und die in Ihrem Lebenslauf stehen (50 %), die Wortwahl der Anzeige, die Ihr Lebenslauf teilt (35 %), und Ihre Berufsjahre im Vergleich zur Anforderung (15 %). Skills, die die Anzeige wiederholt oder im Titel nennt, wiegen schwerer." },
        ],
      },
      {
        heading: "So lesen Sie Ihren Score",
        blocks: [
          { type: "ul", items: [
            "70 % und mehr: eine starke Übereinstimmung. Ihr Lebenslauf zeigt bereits das meiste von dem, was die Stelle braucht. Feilen Sie am oberen Drittel und bewerben Sie sich.",
            "45–69 %: konkurrenzfähig. Wahrscheinlich haben Sie die Erfahrung, zeigen sie aber nicht vollständig. Schließen Sie zuerst ein oder zwei Lücken mit hoher Priorität.",
            "Unter 45 %: deutliche Lücken. Entweder ist die Stelle ein großer Sprung, oder Ihr Lebenslauf ist für eine andere Art von Stelle geschrieben. Passen Sie ihn gründlich an oder überlegen Sie, ob es die richtige Stelle ist.",
          ] },
          { type: "tip", text: "Der Score ist bei 95 % gedeckelt. Glatte 100 % hieße, die Anzeige abzuschreiben, und das ist weder das Ziel noch eine gute Idee." },
        ],
      },
      {
        heading: "Warum Ihr Score niedriger ausfallen kann als erwartet",
        blocks: [
          { type: "ul", items: [
            "Andere Wortwahl: „Kundenbindung“ in Ihrem Lebenslauf, „Churn-Reduzierung“ in der Anzeige.",
            "Skills nur indirekt erkennbar: Sie haben täglich mit Docker gearbeitet, das Wort aber nie hingeschrieben.",
            "Ein sehr kurzer Lebenslauf oder eine sehr kurze Stellenanzeige. Beides macht jeden Vergleich weniger verlässlich.",
            "Erfahrung ohne Zeitangaben: Berufsjahre werden aus Formulierungen wie „5 Jahre Berufserfahrung“ oder aus Zeiträumen wie „2019 – heute“ gelesen.",
          ] },
        ],
      },
      {
        heading: "Wie Sie ihn ehrlich erhöhen",
        blocks: [
          { type: "ol", items: [
            "Beginnen Sie mit den fehlenden Skills hoher Priorität, die Sie tatsächlich haben, und ergänzen Sie sie dort, wo sie belegt sind: in einem Stichpunkt, nicht nur in der Skill-Liste.",
            "Verwenden Sie für Tools und Methoden die Bezeichnungen aus der Anzeige.",
            "Ergänzen Sie die Zeiträume Ihrer Positionen, damit Ihre Erfahrung gezählt werden kann.",
            "Prüfen Sie erneut. Ein Sprung von den 50ern in die 70er allein durch andere Formulierungen ist häufig.",
          ] },
          { type: "p", text: "Sind die verbleibenden Lücken Skills, die Sie nicht haben, ist ein höherer Score nicht die Antwort. Die Antwort sind die empfohlenen Kurse oder eine Stelle, die besser passt." },
        ],
      },
    ],
  },
];

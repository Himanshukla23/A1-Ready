/**
 * Predefined, topic-based recommendation engine for German A1 exam readiness.
 * Converts identified weaknesses and missed questions into high-yield study actions.
 */

export const TOPIC_PRACTICE_DATABASE = {
  // Vocabulary Topics
  "Essen & Trinken (Food & Drinks)": {
    topic: "Wortschatz: Essen & Trinken",
    skill: "vocabulary",
    reason: "Fehler bei Alltagsnahrungsmitteln und Getränken.",
    practice_activity: "Lernen Sie die Goethe A1-Wortliste für 'Essen und Trinken' mit Artikeln (der Kaffee, der Tee, das Brot, der Apfel, das Wasser). Erstellen Sie 5 Sätze mit 'Ich esse gern...' und 'Ich trinke gern...'.",
    resources: "Goethe-Institut Wortliste A1, Themenbereich 3",
  },
  "Uhrzeit & Tagesablauf (Time & Daily Routine)": {
    topic: "Wortschatz & Trennbare Verben: Tagesablauf",
    skill: "vocabulary",
    reason: "Unsicherheit bei Uhrzeiten und trennbaren Verben wie 'aufhören' oder 'aufstehen'.",
    practice_activity: "Üben Sie trennbare Verben im Präsens: 'Der Kurs fängt um 9:00 Uhr an und hört um 12:30 Uhr auf.' Notieren Sie Ihren eigenen Tagesablauf mit 6 Verben.",
    resources: "A1 Grammatikübersicht: Trennbare Verben",
  },
  "Verkehr & Unterwegs (Transportation & City)": {
    topic: "Wortschatz: Unterwegs & Orientierung",
    skill: "vocabulary",
    reason: "Schwierigkeit bei städtischen Orten und Verkehrsmitteln (Bahnhof, Flughafen, Haltestelle).",
    practice_activity: "Üben Sie Wegbeschreibungen und wichtige Orte: 'Wo ist der Bahnhof / die Haltestelle / der Flughafen?'. Lernen Sie die Transportmittel mit 'mit dem Zug / mit dem Bus / mit der Bahn'.",
    resources: "Stadtplan- und Wegbeschreibungsübungen A1",
  },
  "Familie & Personen (Family & People)": {
    topic: "Wortschatz: Familie & Verwandtschaft",
    skill: "vocabulary",
    reason: "Verwechslung von Verwandtschaftsgraden (Tante, Onkel, Cousine, Großeltern).",
    practice_activity: "Zeichnen Sie einen Familienstammbaum auf Deutsch und beschreiben Sie 6 Verwandte: 'Das ist meine Tante. Sie heißt... Sie ist die Schwester meiner Mutter.'",
    resources: "Familienvokabular A1",
  },

  // Grammar Topics
  "Bestimmte & Unbestimmte Artikel (Akkusativ)": {
    topic: "Grammatik: Akkusativ & unbestimmte Artikel",
    skill: "grammar",
    reason: "Maskuline Akkusativ-Endung (ein -> einen / der -> den) nicht angewendet.",
    practice_activity: "Merksatz: Nur MASKULIN ändert sich im Akkusativ! (den / einen Tisch). Feminin (eine) und Neutral (ein) bleiben gleich. Schreiben Sie 5 Sätze mit Verben des Akkusativs: 'Ich kaufe/habe/brauche einen...'",
    resources: "Akkusativ-Tabelle A1 (der -> den, ein -> einen)",
  },
  "Unregelmäßige Verben (Vokalwechsel im Präsens)": {
    topic: "Grammatik: Vokalwechsel bei Verben (a -> ä, e -> i)",
    skill: "grammar",
    reason: "Stammvokalwechsel bei du/er/sie/es (fahren -> du fährst; sprechen -> du sprichst).",
    practice_activity: "Konjugieren Sie die wichtigsten 5 A1-Verben mit Vokalwechsel: fahren (du fährst), schlafen (du schläfst), sprechen (du sprichst), lesen (du liest), sehen (du siehst).",
    resources: "Tabelle unregelmäßiger Verben A1",
  },
  "Modalverben (können)": {
    topic: "Grammatik: Modalverben (können, müssen, möchten)",
    skill: "grammar",
    reason: "Konjugationsfehler bei der 1. und 3. Person Singular von Modalverben.",
    practice_activity: "Wichtigste Regel: 1. und 3. Person Singular sind IDENTISCH und haben keine Endung! (ich kann, er/sie/es kann). Das zweite Verb steht im Infinitiv am Satzende.",
    resources: "Modalverben Satzklammer A1",
  },
  "Präpositionen mit Dativ (Ortsangaben)": {
    topic: "Grammatik: Feste Wendungen 'zu Hause' vs 'nach Hause'",
    skill: "grammar",
    reason: "Verwechslung zwischen Aufenthaltsort (zu Hause) und Richtungsangabe (nach Hause).",
    practice_activity: "Faustregel: Wo bist du? -> 'Ich bin zu Hause.' Wohin gehst du? -> 'Ich gehe nach Hause.' Schreiben Sie je 3 Beispielsätze für beide Situationen.",
    resources: "Lokale Präpositionen A1",
  },

  // Reading Topics
  "Öffnungszeiten & Schilder (Opening Hours Notice)": {
    topic: "Leseverstehen: Schilder & Öffnungszeiten",
    skill: "reading",
    reason: "Wichtige Signalwörter wie 'Montag bis Freitag', 'geschlossen' oder 'werktags' übersehen.",
    practice_activity: "Achten Sie bei A1-Lesetexten immer zuerst auf die Wochentage und Zeitfenster: 'von ... bis ...' und Ausnahmen ('außer mittwochs', 'an Sonn- und Feiertagen geschlossen').",
    resources: "Öffentliche Schilder im Goethe-Zertifikat A1",
  },
  "Persönliche E-Mail / Einladung (Personal Invitation)": {
    topic: "Leseverstehen: Kurze private Nachrichten",
    skill: "reading",
    reason: "Informationen über Aufgaben oder Mitbringsel in Einladungen nicht präzise erfasst.",
    practice_activity: "Unterstreichen Sie bei kurzen E-Mails die 4 W-Fragen: Wer feiert? Wann? Wo? Was soll man mitbringen ('Bitte bring etwas zu trinken/essen mit')?",
    resources: "A1 Lesetexte Teil 1 (Briefe & E-Mails)",
  },
  "Wohnungsanzeige (Apartment Classifieds)": {
    topic: "Leseverstehen: Kleinanzeigen & Wohnungsanzeigen",
    skill: "reading",
    reason: "Wohnungsabkürzungen und Details (Kaltmiete, Nebenkosten, Haustiere) verwechselt.",
    practice_activity: "Lernen Sie die typischen Kleinanzeigen-Kürzel: 2-Zi.-Whg. (2-Zimmer-Wohnung), KM (Kaltmiete), NK (Nebenkosten), ab 1. Mai (Verfügbarkeit).",
    resources: "A1 Kleinanzeigen Leseverstehen",
  },
  "Durchsage / Fahrplan (Transport Notice)": {
    topic: "Leseverstehen: Bahnhofs- & Reiseinformationen",
    skill: "reading",
    reason: "Gleiswechsel ('fährt heute von Gleis 7 ab') oder Verspätungshinweise verpasst.",
    practice_activity: "Suchen Sie bei Durchsagen und Bahnhofstexten gezielt nach Signalwörtern wie: 'heute abweichend von Gleis...', 'Verspätung ca. ... Minuten', 'Zug fällt aus'.",
    resources: "Deutsche Bahn Durchsagen & Anzeigetafeln",
  },
};

/**
 * Generate a personalized study plan based on incorrect questions and weak skills.
 *
 * @param {object} results - Output from calculateAssessmentScore
 * @returns {Array} List of curated recommendation items
 */
export function generateRecommendations(results) {
  if (!results) return [];

  const recommendations = [];
  const processedTopics = new Set();

  // 1. Add recommendations for specific incorrect questions
  if (results.incorrectQuestions && results.incorrectQuestions.length > 0) {
    results.incorrectQuestions.forEach((item) => {
      const dbEntry = TOPIC_PRACTICE_DATABASE[item.topic];
      if (dbEntry && !processedTopics.has(item.topic)) {
        processedTopics.add(item.topic);
        recommendations.push({
          topic: dbEntry.topic,
          skill: dbEntry.skill,
          reason: dbEntry.reason,
          practice_activity: dbEntry.practice_activity,
          resources: dbEntry.resources,
          priority: "high",
        });
      }
    });
  }

  // 2. If learner got all right (12/12) or very high score, provide advanced exam simulation advice
  if (recommendations.length === 0) {
    recommendations.push(
      {
        topic: "Prüfungssimulation: Goethe / ÖSD Modellsätze",
        skill: "all",
        reason: "Hervorragende Leistung in Wortschatz, Grammatik und Leseverstehen!",
        practice_activity: "Bearbeiten Sie die originalen Goethe-Zertifikat A1 Modellsätze unter realen Prüfungszeitbedingungen (Lesen 25 Min, Schreiben 20 Min).",
        resources: "Offizieller Goethe A1 Übungssatz 01 & 02",
        priority: "medium",
      },
      {
        topic: "Mündliche Prüfung: Sprechen Teil 1 & 2",
        skill: "speaking",
        reason: "Stärken Sie jetzt die aktive Sprachkompetenz für den Prüfungstag.",
        practice_activity: "Üben Sie das Buchstabieren Ihres Namens, die Angabe Ihrer Telefonnummer und das Formulieren von Bitten mit Wortkarten ('Können Sie bitte das Fenster öffnen?').",
        resources: "A1 Redemittel für die mündliche Prüfung",
        priority: "medium",
      }
    );
  }

  return recommendations;
}

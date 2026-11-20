/**
 * 12 Original A1 German Assessment Questions
 * 4 Vocabulary (Wortschatz)
 * 4 Grammar (Grammatik)
 * 4 Reading Comprehension (Leseverstehen)
 * Aligned with Goethe-Zertifikat A1 (Start Deutsch 1) & ÖSD Zertifikat A1 standards.
 */

export const QUESTIONS = [
  // ==========================================
  // SKILL 1: VOCABULARY (Wortschatz) - Q1 to Q4
  // ==========================================
  {
    id: "q1",
    skill: "vocabulary",
    skillLabel: "Wortschatz",
    topic: "Essen & Trinken (Food & Drinks)",
    instruction: "Wählen Sie das passende Wort für die Lücke.",
    question: "Am Morgen trinke ich gern einen heißen ______ mit Milch und Zucker.",
    options: [
      { id: "A", text: "Kaffee" },
      { id: "B", text: "Apfel" },
      { id: "C", text: "Käse" },
      { id: "D", text: "Fisch" },
    ],
    correctOptionId: "A",
    explanation: "Kaffee ist ein heißes Getränk, das typischerweise morgens mit Milch und Zucker getrunken wird. Apfel, Käse und Fisch sind feste Nahrungsmittel.",
  },
  {
    id: "q2",
    skill: "vocabulary",
    skillLabel: "Wortschatz",
    topic: "Uhrzeit & Tagesablauf (Time & Daily Routine)",
    instruction: "Wählen Sie das passende Wort für die Lücke.",
    question: "Der Deutschkurs beginnt um 09:00 Uhr und ______ um 12:30 Uhr auf.",
    options: [
      { id: "A", text: "steht" },
      { id: "B", text: "hört" },
      { id: "C", text: "sieht" },
      { id: "D", text: "macht" },
    ],
    correctOptionId: "B",
    explanation: "Das trennbare Verb 'aufhören' bedeutet beenden oder enden ('hört ... auf'). 'Aufstehen' bezieht sich auf Personen am Morgen, nicht auf Unterricht.",
  },
  {
    id: "q3",
    skill: "vocabulary",
    skillLabel: "Wortschatz",
    topic: "Verkehr & Unterwegs (Transportation & City)",
    instruction: "Wählen Sie das passende Wort für die Lücke.",
    question: "Entschuldigung, wie komme ich zum ______? Ich möchte einen Zug nach Berlin nehmen.",
    options: [
      { id: "A", text: "Supermarkt" },
      { id: "B", text: "Bahnhof" },
      { id: "C", text: "Krankenhaus" },
      { id: "D", text: "Schwimmbad" },
    ],
    correctOptionId: "B",
    explanation: "Züge fahren am Bahnhof ab. Im Supermarkt kauft man ein, im Krankenhaus behandelt man Kranke, und im Schwimmbad schwimmt man.",
  },
  {
    id: "q4",
    skill: "vocabulary",
    skillLabel: "Wortschatz",
    topic: "Familie & Personen (Family & People)",
    instruction: "Wählen Sie das passende Wort für die Lücke.",
    question: "Die Schwester von meiner Mutter ist meine ______.",
    options: [
      { id: "A", text: "Tante" },
      { id: "B", text: "Cousine" },
      { id: "C", text: "Oma" },
      { id: "D", text: "Tochter" },
    ],
    correctOptionId: "A",
    explanation: "Die Schwester der Mutter oder des Vaters nennt man 'Tante'. Cousine ist das Kind von Onkel/Tante, Oma ist die Großmutter.",
  },

  // ==========================================
  // SKILL 2: GRAMMAR (Grammatik) - Q5 to Q8
  // ==========================================
  {
    id: "q5",
    skill: "grammar",
    skillLabel: "Grammatik",
    topic: "Bestimmte & Unbestimmte Artikel (Akkusativ)",
    instruction: "Wählen Sie den grammatikalisch richtigen Artikel.",
    question: "Herr Müller kauft heute ______ neuen Tisch (maskulin).",
    options: [
      { id: "A", text: "ein" },
      { id: "B", text: "einen" },
      { id: "C", text: "einem" },
      { id: "D", text: "einer" },
    ],
    correctOptionId: "B",
    explanation: "Das Verb 'kaufen' verlangt den Akkusativ. Maskuline Nomen (der Tisch) verändern ihren unbestimmten Artikel im Akkusativ zu 'einen'.",
  },
  {
    id: "q6",
    skill: "grammar",
    skillLabel: "Grammatik",
    topic: "Unregelmäßige Verben (Vokalwechsel im Präsens)",
    instruction: "Wählen Sie die korrekte Verbform für 'du'.",
    question: "______ du am Wochenende mit dem Fahrrad zur Universität?",
    options: [
      { id: "A", text: "Fährst" },
      { id: "B", text: "Fahrst" },
      { id: "C", text: "Fahrt" },
      { id: "D", text: "Fahre" },
    ],
    correctOptionId: "A",
    explanation: "Das Verb 'fahren' hat einen Vokalwechsel in der 2. und 3. Person Singular: a -> ä (du fährst, er/sie/es fährt).",
  },
  {
    id: "q7",
    skill: "grammar",
    skillLabel: "Grammatik",
    topic: "Modalverben (können)",
    instruction: "Wählen Sie das passende Modalverb.",
    question: "Anna ist krank. Sie ______ heute leider nicht zur Arbeit kommen.",
    options: [
      { id: "A", text: "kann" },
      { id: "B", text: "kannst" },
      { id: "C", text: "können" },
      { id: "D", text: "könnt" },
    ],
    correctOptionId: "A",
    explanation: "Die 3. Person Singular (sie = Anna) des Modalverbs 'können' heißt 'kann'. Die 1. und 3. Person Singular sind bei Modalverben immer identisch (ich kann / er, sie, es kann).",
  },
  {
    id: "q8",
    skill: "grammar",
    skillLabel: "Grammatik",
    topic: "Präpositionen mit Dativ (Ortsangaben)",
    instruction: "Wählen Sie die korrekte Präposition mit Artikel.",
    question: "Wo ist Lisa? — Sie ist gerade ______ Hause.",
    options: [
      { id: "A", text: "nach" },
      { id: "B", text: "bei" },
      { id: "C", text: "zu" },
      { id: "D", text: "in" },
    ],
    correctOptionId: "C",
    explanation: "Die feste A1-Redewendung für den Aufenthaltsort lautet 'zu Hause' (Where are you? = Wo bist du? — Zu Hause). Die Bewegung nach Hause heißt 'nach Hause'.",
  },

  // ==========================================
  // SKILL 3: READING (Leseverstehen) - Q9 to Q12
  // ==========================================
  {
    id: "q9",
    skill: "reading",
    skillLabel: "Leseverstehen",
    topic: "Öffnungszeiten & Schilder (Opening Hours Notice)",
    instruction: "Lesen Sie das Hinweisschild und beantworten Sie die Frage.",
    passage: "Bäckerei Sonnenschein\nÖffnungszeiten:\nMontag bis Freitag: 06:30 – 18:30 Uhr\nSamstag: 07:00 – 13:00 Uhr\nSonntag und Feiertage: Geschlossen",
    question: "Wann kann man am Samstag frische Brötchen kaufen?",
    options: [
      { id: "A", text: "Um 15:00 Uhr" },
      { id: "B", text: "Um 06:30 Uhr" },
      { id: "C", text: "Um 10:00 Uhr" },
      { id: "D", text: "Die Bäckerei ist samstags geschlossen." },
    ],
    correctOptionId: "C",
    explanation: "Laut Hinweisschild hat die Bäckerei samstags von 07:00 bis 13:00 Uhr geöffnet. 10:00 Uhr liegt innerhalb dieser Zeit.",
  },
  {
    id: "q10",
    skill: "reading",
    skillLabel: "Leseverstehen",
    topic: "Persönliche E-Mail / Einladung (Personal Invitation)",
    instruction: "Lesen Sie die E-Mail und wählen Sie die richtige Aussage.",
    passage: "Hallo Max,\nich feiere am Freitag meinen 25. Geburtstag! Die Party beginnt um 19:30 Uhr bei mir im Garten. Bitte bring etwas zu trinken mit. Für Essen und Musik habe ich schon gesorgt.\nViele Grüße,\nStefan",
    question: "Was soll Max zur Party mitbringen?",
    options: [
      { id: "A", text: "Einen Kuchen zum Essen" },
      { id: "B", text: "Getränke" },
      { id: "C", text: "Musik und Lautsprecher" },
      { id: "D", text: "Er muss nichts mitbringen." },
    ],
    correctOptionId: "B",
    explanation: "Stefan schreibt ausdrücklich: 'Bitte bring etwas zu trinken mit.' Um Essen und Musik kümmert sich Stefan selbst.",
  },
  {
    id: "q11",
    skill: "reading",
    skillLabel: "Leseverstehen",
    topic: "Wohnungsanzeige (Apartment Classifieds)",
    instruction: "Lesen Sie die Kleinanzeige und beantworten Sie die Frage.",
    passage: "Schöne 2-Zimmer-Wohnung in München-Pasing ab 1. Mai frei.\nGröße: 55 m², mit Balkon und Einbauküche.\nKaltmiete: 750 € + Nebenkosten 150 €.\nKeine Haustiere erlaubt.\nKontakt: immobilien-schmidt@web.de",
    question: "Welche Aussage über die Wohnung ist richtig?",
    options: [
      { id: "A", text: "Hunde und Katzen sind erlaubt." },
      { id: "B", text: "Die Wohnung hat drei Zimmer." },
      { id: "C", text: "Die Wohnung ist ab dem 1. Mai verfügbar." },
      { id: "D", text: "Die Gesamtkosten betragen 750 €." },
    ],
    correctOptionId: "C",
    explanation: "In der Anzeige steht: 'ab 1. Mai frei'. Haustiere sind verboten ('Keine Haustiere erlaubt'), sie hat 2 Zimmer und die Miete beträgt 750 € + 150 € NK.",
  },
  {
    id: "q12",
    skill: "reading",
    skillLabel: "Leseverstehen",
    topic: "Durchsage / Fahrplan (Transport Notice)",
    instruction: "Lesen Sie die Informationstafel am Hauptbahnhof.",
    passage: "Achtung Fahrgäste!\nDer ICE 582 nach Hamburg Altona, planmäßige Abfahrt 14:15 Uhr von Gleis 4, fährt heute ausnahmsweise von Gleis 7 ab.\nGrund ist eine Weichenreparatur. Bitte Gleisänderung beachten!",
    question: "Von welchem Gleis fährt der Zug nach Hamburg heute ab?",
    options: [
      { id: "A", text: "Von Gleis 4" },
      { id: "B", text: "Von Gleis 7" },
      { id: "C", text: "Der Zug fällt heute aus." },
      { id: "D", text: "Von Gleis 14" },
    ],
    correctOptionId: "B",
    explanation: "Die Anzeige meldet: 'fährt heute ausnahmsweise von Gleis 7 ab' wegen einer Weichenreparatur (geplant war Gleis 4).",
  },
];

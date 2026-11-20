/**
 * 9 Original A1 German Objective Assessment Questions
 * 3 Vocabulary (Wortschatz) - q1 to q3
 * 3 Grammar (Grammatik) - q4 to q6
 * 3 Reading Comprehension (Leseverstehen) - q7 to q9
 * Max score: 9 (3 + 3 + 3)
 * Aligned with Goethe-Zertifikat A1 (Start Deutsch 1) & ÖSD Zertifikat A1 standards.
 */

export const OBJECTIVE_QUESTIONS = [
  // ==========================================
  // SKILL 1: VOCABULARY (Wortschatz) - q1 to q3
  // ==========================================
  {
    id: "q1",
    skill: "vocabulary",
    skillLabel: "Vocabulary (Wortschatz)",
    topic: "Essen & Trinken (Food & Drinks)",
    instruction: "Choose the correct word to fill the blank.",
    question: "Am Morgen trinke ich gern einen heißen ______ mit Milch und Zucker.",
    options: [
      { id: "A", text: "Kaffee" },
      { id: "B", text: "Apfel" },
      { id: "C", text: "Käse" },
      { id: "D", text: "Fisch" },
    ],
    correctOptionId: "A",
    explanation: "Kaffee (coffee) is a hot morning beverage typically enjoyed with milk and sugar. Apfel (apple), Käse (cheese), and Fisch (fish) are solid foods.",
  },
  {
    id: "q2",
    skill: "vocabulary",
    skillLabel: "Vocabulary (Wortschatz)",
    topic: "Uhrzeit & Tagesablauf (Daily Routine)",
    instruction: "Choose the correct separable verb component.",
    question: "Der Deutschkurs beginnt um 09:00 Uhr und ______ um 12:30 Uhr auf.",
    options: [
      { id: "A", text: "steht" },
      { id: "B", text: "hört" },
      { id: "C", text: "sieht" },
      { id: "D", text: "macht" },
    ],
    correctOptionId: "B",
    explanation: "The separable verb 'aufhören' means to finish or end ('hört ... auf'). 'Aufstehen' refers to waking up/getting out of bed in the morning.",
  },
  {
    id: "q3",
    skill: "vocabulary",
    skillLabel: "Vocabulary (Wortschatz)",
    topic: "Verkehr & Unterwegs (Transportation & City)",
    instruction: "Choose the correct location word.",
    question: "Entschuldigung, wie komme ich zum ______? Ich möchte einen Zug nach Wien nehmen.",
    options: [
      { id: "A", text: "Supermarkt" },
      { id: "B", text: "Bahnhof" },
      { id: "C", text: "Krankenhaus" },
      { id: "D", text: "Schwimmbad" },
    ],
    correctOptionId: "B",
    explanation: "Trains depart from the train station (Bahnhof). Supermarkt is for groceries, Krankenhaus is for medical care, and Schwimmbad is a swimming pool.",
  },

  // ==========================================
  // SKILL 2: GRAMMAR (Grammatik) - q4 to q6
  // ==========================================
  {
    id: "q4",
    skill: "grammar",
    skillLabel: "Grammar (Grammatik)",
    topic: "Bestimmte & Unbestimmte Artikel (Akkusativ)",
    instruction: "Choose the grammatically correct accusative article.",
    question: "Herr Müller kauft heute ______ neuen Tisch (maskulin).",
    options: [
      { id: "A", text: "ein" },
      { id: "B", text: "einen" },
      { id: "C", text: "einem" },
      { id: "D", text: "einer" },
    ],
    correctOptionId: "B",
    explanation: "The verb 'kaufen' takes the accusative case. Masculine nouns (der Tisch) change their indefinite article from 'ein' to 'einen' in the accusative.",
  },
  {
    id: "q5",
    skill: "grammar",
    skillLabel: "Grammar (Grammatik)",
    topic: "Unregelmäßige Verben (Vokalwechsel im Präsens)",
    instruction: "Choose the correct 2nd person singular verb form.",
    question: "______ du am Wochenende mit dem Fahrrad zur Universität?",
    options: [
      { id: "A", text: "Fährst" },
      { id: "B", text: "Fahrst" },
      { id: "C", text: "Fahrt" },
      { id: "D", text: "Fahre" },
    ],
    correctOptionId: "A",
    explanation: "The strong verb 'fahren' undergoes a stem-vowel change in 2nd and 3rd person singular: a -> ä (du fährst, er/sie/es fährt).",
  },
  {
    id: "q6",
    skill: "grammar",
    skillLabel: "Grammar (Grammatik)",
    topic: "Modalverben (können)",
    instruction: "Choose the correct modal verb form.",
    question: "Anna ist krank. Sie ______ heute leider nicht zur Arbeit kommen.",
    options: [
      { id: "A", text: "kann" },
      { id: "B", text: "kannst" },
      { id: "C", text: "können" },
      { id: "D", text: "könnt" },
    ],
    correctOptionId: "A",
    explanation: "In German modal verbs, 1st and 3rd person singular forms are identical and have no ending: 'ich kann', 'sie kann'.",
  },

  // ==========================================
  // SKILL 3: READING (Leseverstehen) - q7 to q9
  // ==========================================
  {
    id: "q7",
    skill: "reading",
    skillLabel: "Reading (Leseverstehen)",
    topic: "Öffnungszeiten & Schilder (Store Hours Notice)",
    instruction: "Read the shop notice and answer the question.",
    passage: "Bäckerei Sonnenschein\nÖffnungszeiten:\nMontag bis Freitag: 06:30 – 18:30 Uhr\nSamstag: 07:00 – 13:00 Uhr\nSonntag und Feiertage: Geschlossen",
    question: "Wann kann man am Samstag frische Brötchen kaufen?",
    options: [
      { id: "A", text: "Um 15:00 Uhr" },
      { id: "B", text: "Um 06:30 Uhr" },
      { id: "C", text: "Um 10:00 Uhr" },
      { id: "D", text: "Die Bäckerei ist samstags geschlossen." },
    ],
    correctOptionId: "C",
    explanation: "The notice states the bakery is open Saturdays from 07:00 to 13:00. 10:00 Uhr falls within that timeframe.",
  },
  {
    id: "q8",
    skill: "reading",
    skillLabel: "Reading (Leseverstehen)",
    topic: "Persönliche E-Mail / Einladung (Party Invitation)",
    instruction: "Read the invitation email and answer the question.",
    passage: "Hallo Max,\nich feiere am Freitag meinen 25. Geburtstag! Die Party beginnt um 19:30 Uhr bei mir im Garten. Bitte bring etwas zu trinken mit. Für Essen und Musik habe ich schon gesorgt.\nViele Grüße,\nStefan",
    question: "Was soll Max zur Party mitbringen?",
    options: [
      { id: "A", text: "Einen Kuchen zum Essen" },
      { id: "B", text: "Getränke" },
      { id: "C", text: "Musik und Lautsprecher" },
      { id: "D", text: "Er muss nichts mitbringen." },
    ],
    correctOptionId: "B",
    explanation: "Stefan explicitly writes: 'Bitte bring etwas zu trinken mit' (Please bring something to drink). Food and music are already taken care of.",
  },
  {
    id: "q9",
    skill: "reading",
    skillLabel: "Reading (Leseverstehen)",
    topic: "Durchsage / Fahrplan (Transport Notice)",
    instruction: "Read the public railway announcement at the station.",
    passage: "Achtung Fahrgäste!\nDer ICE 582 nach Hamburg, planmäßige Abfahrt 14:15 Uhr von Gleis 4, fährt heute ausnahmsweise von Gleis 7 ab.\nGrund ist eine Weichenreparatur. Bitte Gleisänderung beachten!",
    question: "Von welchem Gleis fährt der Zug nach Hamburg heute ab?",
    options: [
      { id: "A", text: "Von Gleis 4" },
      { id: "B", text: "Von Gleis 7" },
      { id: "C", text: "Der Zug fällt heute aus." },
      { id: "D", text: "Von Gleis 14" },
    ],
    correctOptionId: "B",
    explanation: "The notice states: 'fährt heute ausnahmsweise von Gleis 7 ab' (departs exceptionally from platform 7 today) due to repairs.",
  },
];

// Alias for backwards compatibility
export const QUESTIONS = OBJECTIVE_QUESTIONS;

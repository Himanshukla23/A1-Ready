/**
 * Version 2.0.0 Predefined Practice Recommendations Database
 * Covers Vocabulary, Grammar, Reading, and Speaking modules.
 */

export const TOPIC_PRACTICE_DATABASE = {
  // Vocabulary Topics
  "Essen & Trinken (Food & Drinks)": {
    topic: "Wortschatz: Essen & Trinken (Food & Drinks)",
    skill: "vocabulary",
    reason: "Confusion in everyday German food/beverage vocabulary and articles.",
    practice_activity: "Study the Goethe A1 vocabulary list for 'Essen und Trinken' with articles (der Kaffee, der Tee, das Wasser, das Brot). Write 5 sentences using 'Ich esse gern...' and 'Ich trinke gern...'.",
    resources: "Goethe-Institut Wortliste A1 (Theme 3: Essen & Trinken)",
  },
  "Uhrzeit & Tagesablauf (Daily Routine)": {
    topic: "Wortschatz & Verben: Tagesablauf (Daily Routine)",
    skill: "vocabulary",
    reason: "Uncertainty with time prepositions and separable verbs (aufhören, aufstehen).",
    practice_activity: "Practice separable verbs in present tense: 'Der Kurs fängt um 9:00 Uhr an und hört um 12:30 Uhr auf.' Write your daily routine in 6 sentences.",
    resources: "A1 Grammar Guide: Separable Verbs & Clock Time",
  },
  "Verkehr & Unterwegs (Transportation & City)": {
    topic: "Wortschatz: Unterwegs & Orientierung (City Transit)",
    skill: "vocabulary",
    reason: "Difficulty with transit locations (Bahnhof, Flughafen) and direction requests.",
    practice_activity: "Practice asking for directions: 'Entschuldigung, wie komme ich zum Bahnhof / zur Haltestelle?'. Learn means of transport: 'mit dem Zug / mit dem Bus'.",
    resources: "A1 City Directions & Public Transit Drill",
  },

  // Grammar Topics
  "Bestimmte & Unbestimmte Artikel (Akkusativ)": {
    topic: "Grammatik: Akkusativ & Unbestimmte Artikel",
    skill: "grammar",
    reason: "Masculine accusative ending (ein -> einen / der -> den) was missed.",
    practice_activity: "Key Rule: ONLY masculine nouns change in accusative! (den / einen Tisch). Feminine and neuter remain unchanged. Write 5 sentences with: 'Ich kaufe/habe/brauche einen...'",
    resources: "Akkusativ Summary Chart A1",
  },
  "Unregelmäßige Verben (Vokalwechsel im Präsens)": {
    topic: "Grammatik: Vokalwechsel bei Verben (a -> ä, e -> i)",
    skill: "grammar",
    reason: "Stem vowel change in 2nd/3rd person singular (fahren -> du fährst).",
    practice_activity: "Conjugate the 5 essential A1 vowel-changing verbs: fahren (du fährst), schlafen (du schläfst), sprechen (du sprichst), lesen (du liest), sehen (du siehst).",
    resources: "Irregular Verbs Table A1",
  },
  "Modalverben (können)": {
    topic: "Grammatik: Modalverben (können, müssen, möchten)",
    skill: "grammar",
    reason: "Modal verb conjugation in singular (1st and 3rd person singular forms are identical).",
    practice_activity: "Remember: 'ich kann' and 'er/sie/es kann' have no personal ending! The second verb stays in the infinitive at the very end of the clause.",
    resources: "Modal Verbs Sentence Bracket A1",
  },

  // Reading Topics
  "Öffnungszeiten & Schilder (Store Hours Notice)": {
    topic: "Leseverstehen: Schilder & Öffnungszeiten (Store Signs)",
    skill: "reading",
    reason: "Missed time brackets or day conditions in shop notices.",
    practice_activity: "In A1 reading notices, always highlight the specific days of the week (Mo-Fr vs Sa) and time windows ('von ... bis ...') before looking at the options.",
    resources: "Public Signs Practice — Goethe & ÖSD A1",
  },
  "Persönliche E-Mail / Einladung (Party Invitation)": {
    topic: "Leseverstehen: Private E-Mails & Einladungen",
    skill: "reading",
    reason: "Overlooked specific action requests or items to bring in invitations.",
    practice_activity: "Scan short emails for the 4 core questions: Who is hosting? When? Where? What should guests bring? ('Bitte bring etwas zu trinken mit').",
    resources: "A1 Reading Part 1 (Letters & Emails)",
  },
  "Durchsage / Fahrplan (Transport Notice)": {
    topic: "Leseverstehen: Durchsagen & Gleisänderungen (Transit)",
    skill: "reading",
    reason: "Overlooked platform change exception notices ('fährt heute ausnahmsweise von Gleis 7 ab').",
    practice_activity: "Distinguish between scheduled time ('planmäßig') and current exception ('heute ausnahmsweise').",
    resources: "Railway Station Notices & Timetables",
  },

  // Speaking Topics
  "speaking_weakness": {
    topic: "Sprechen: Mündliche Kommunikation (A1 Speaking)",
    skill: "speaking",
    reason: "Hesitation in spoken self-introduction, ordering, or daily routine descriptions.",
    practice_activity: "Practice the 3 parts of the Goethe/ÖSD speaking exam aloud: 1. Introduce yourself (Name, Land, Wohnort, Sprachen). 2. Order politely ('Ich möchte bitte einen Kaffee'). 3. Describe your weekend in 2 full sentences.",
    resources: "Offizielle Redemittel für die A1 Sprechprüfung (Goethe & ÖSD)",
  },
};

/**
 * Generate a personalized 4-skill study plan based on incorrect questions and speaking evaluation.
 *
 * @param {object} results - Output from calculateAssessmentScore
 * @returns {Array} List of curated recommendation items
 */
export function generateRecommendations(results) {
  if (!results) return [];

  const recommendations = [];
  const processedTopics = new Set();

  // 1. Add recommendations for incorrect objective questions
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

  // 2. Add speaking recommendation if speaking score is below 2.5 / 3
  if (results.skills?.speaking?.correct < 2.5) {
    const spEntry = TOPIC_PRACTICE_DATABASE["speaking_weakness"];
    if (spEntry && !processedTopics.has("speaking_weakness")) {
      processedTopics.add("speaking_weakness");
      recommendations.push({
        topic: spEntry.topic,
        skill: spEntry.skill,
        reason: "Your speaking score indicates you would benefit from vocal practice drills before the oral exam.",
        practice_activity: spEntry.practice_activity,
        resources: spEntry.resources,
        priority: results.skills.speaking.correct < 1.5 ? "high" : "medium",
      });
    }
  }

  // 3. If learner scored very high, provide advanced full-length simulation advice
  if (recommendations.length === 0) {
    recommendations.push(
      {
        topic: "Exam Simulation: Full Goethe & ÖSD Sample Papers",
        skill: "all",
        reason: "Outstanding performance across Vocabulary, Grammar, Reading, and Speaking!",
        practice_activity: "Take official full-length sample papers under real exam time limits (Lesen 25 min, Schreiben 20 min, Sprechen 15 min).",
        resources: "Official Goethe / ÖSD Modellsatz 01 & 02",
        priority: "medium",
      }
    );
  }

  return recommendations;
}

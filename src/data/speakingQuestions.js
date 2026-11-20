/**
 * 2 Original A1 German Speaking Assessment Tasks
 * Aligned with Goethe-Zertifikat A1 (Sprechen Teil 1, 2) & ÖSD Zertifikat A1.
 * Evaluated via AI-assisted predefined 4-dimension rubric (0 to 3 points each).
 */

export const SPEAKING_QUESTIONS = [
  {
    id: "s1",
    skill: "speaking",
    skillLabel: "Speaking (Sprechen)",
    part: "Teil 1: Sich vorstellen (Self-Introduction)",
    topic: "Persönliche Informationen (Personal Details)",
    instruction: "Click 'Record' and introduce yourself briefly in German (2-3 sentences).",
    promptGerman: "Stellen Sie sich bitte kurz auf Deutsch vor: Nennen Sie Ihren Namen, woher Sie kommen und welche Sprachen Sie sprechen.",
    promptEnglish: "Introduce yourself briefly in German: state your name, where you come from, and which languages you speak.",
    modelResponse: "Hallo! Ich heiße Alex. Ich komme aus Indien und wohne jetzt in Deutschland. Ich spreche Englisch, Hindi und ein bisschen Deutsch.",
    targetKeywords: ["heiße", "Name", "komme", "wohne", "spreche", "Deutsch", "Englisch"],
    tips: "Use clear full sentences: 'Ich heiße...', 'Ich komme aus...', 'Ich spreche...'.",
  },
  {
    id: "s2",
    skill: "speaking",
    skillLabel: "Speaking (Sprechen)",
    part: "Teil 2: Um etwas bitten / Bestellen (Ordering in a Café)",
    instruction: "Click 'Record' and order a drink and ask for the bill politely.",
    promptGerman: "Sie sind in einem Café in Wien oder Berlin. Bestellen Sie ein Getränk und fragen Sie höflich nach der Rechnung.",
    promptEnglish: "You are in a café in Vienna or Berlin. Order a beverage and ask politely for the bill.",
    modelResponse: "Guten Tag! Ich möchte bitte einen Kaffee mit Milch bestellen. Und kann ich bitte zahlen?",
    targetKeywords: ["möchte", "hätte", "Kaffee", "Tee", "bitte", "zahlen", "Rechnung"],
    tips: "Remember polite phrasing with 'Ich möchte bitte...' or 'Ich hätte gern...'.",
  },
];

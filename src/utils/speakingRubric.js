import { SPEAKING_QUESTIONS } from '../data/speakingQuestions.js';

/**
 * Predefined CEFR A1 Speaking Rubric (4 Weighted Dimensions)
 * Task Relevance (30%)
 * Grammar (30%)
 * Vocabulary (25%)
 * Response Completeness (15%)
 */
export const SPEAKING_DIMENSIONS = [
  { id: 'task_relevance', label: 'Task Relevance', weight: 0.30 },
  { id: 'grammar', label: 'Grammar & Syntax', weight: 0.30 },
  { id: 'vocabulary', label: 'A1 Vocabulary', weight: 0.25 },
  { id: 'completeness', label: 'Completeness', weight: 0.15 },
];

/**
 * Evaluate spoken response offline using deterministic linguistic heuristics
 * when LLM endpoint is unavailable or running locally.
 *
 * @param {string} promptId - "s1", "s2", or "s3"
 * @param {string} transcript - Transcribed speech string
 * @returns {object} Structured evaluation result
 */
export function evaluateSpeakingLocally(promptId, transcript = '') {
  const prompt = SPEAKING_QUESTIONS.find((p) => p.id === promptId) || SPEAKING_QUESTIONS[0];
  const cleaned = (transcript || '').trim();
  const lower = cleaned.toLowerCase();

  // If response is empty or minimal noise
  if (!cleaned || cleaned.split(/\s+/).length < 2) {
    return {
      promptId,
      score: 0.0,
      transcript: cleaned || "(No voice captured)",
      dimensions: {
        task_relevance: { score: 0, feedback: "No response or insufficient voice evidence detected." },
        grammar: { score: 0, feedback: "No grammatical structures produced." },
        vocabulary: { score: 0, feedback: "No A1 vocabulary identified." },
        completeness: { score: 0, feedback: "Prompt was left unanswered." },
      },
      strengths: [],
      improvements: ["Please speak clearly into the microphone or use the text input option."],
      encouragement: "Don't be shy! Practice saying 2 short German sentences out loud.",
    };
  }

  const words = cleaned.split(/\s+/);
  const wordCount = words.length;

  // Calculate matches with target keywords
  const matchedKeywords = (prompt.targetKeywords || []).filter((kw) =>
    lower.includes(kw.toLowerCase())
  );
  const keywordRatio = prompt.targetKeywords?.length
    ? matchedKeywords.length / prompt.targetKeywords.length
    : 0.5;

  let relevanceScore = 1;
  let grammarScore = 1;
  let vocabScore = 1;
  let completenessScore = 1;

  // 1. Task Relevance (0 - 3)
  if (keywordRatio >= 0.4 || wordCount >= 7) {
    relevanceScore = keywordRatio >= 0.5 ? 3 : 2;
  }

  // 2. Grammar & Structure (0 - 3)
  // Check for common A1 structures like "ich heiße", "ich komme", "ich möchte", "am wochenende"
  const hasBasicSyntax =
    lower.includes('ich ') ||
    lower.includes('am ') ||
    lower.includes('wir ') ||
    lower.includes('kann ');
  if (hasBasicSyntax && wordCount >= 5) {
    grammarScore = wordCount >= 8 ? 3 : 2;
  }

  // 3. Vocabulary (0 - 3)
  if (matchedKeywords.length >= 2 || wordCount >= 6) {
    vocabScore = matchedKeywords.length >= 3 ? 3 : 2;
  }

  // 4. Completeness (0 - 3)
  if (wordCount >= 4) {
    completenessScore = wordCount >= 8 ? 3 : 2;
  }

  // Calculate weighted score (0 to 3)
  const weightedScore =
    relevanceScore * 0.30 +
    grammarScore * 0.30 +
    vocabScore * 0.25 +
    completenessScore * 0.15;

  const normalizedScore = Math.round(weightedScore * 10) / 10;

  const strengths = [];
  const improvements = [];

  if (relevanceScore >= 2) strengths.push("Directly addressed the speaking prompt.");
  if (grammarScore >= 2) strengths.push("Good basic sentence structure with conjugated verbs.");
  if (vocabScore >= 2) strengths.push(`Used relevant A1 German vocabulary (${matchedKeywords.join(', ') || 'everyday phrases'}).`);

  if (grammarScore < 3) improvements.push("Ensure the conjugated verb stays in position 2 in main clauses.");
  if (completenessScore < 3) improvements.push("Try adding one more descriptive detail to your response.");

  return {
    promptId,
    score: Math.min(3.0, Math.max(0.0, normalizedScore)),
    transcript: cleaned,
    dimensions: {
      task_relevance: {
        score: relevanceScore,
        feedback: relevanceScore >= 2 ? "Relevant to the exam prompt." : "Could relate more closely to the prompt topic.",
      },
      grammar: {
        score: grammarScore,
        feedback: grammarScore >= 2 ? "Basic word order maintained." : "Check verb conjugation and position.",
      },
      vocabulary: {
        score: vocabScore,
        feedback: vocabScore >= 2 ? "Appropriate A1 words used." : "Include more specific German vocabulary words.",
      },
      completeness: {
        score: completenessScore,
        feedback: completenessScore >= 2 ? "Sufficient communicative length." : "Try expanding to 2-3 full sentences.",
      },
    },
    strengths,
    improvements: improvements.length > 0 ? improvements : ["Continue speaking regularly to build natural fluency!"],
    encouragement: "Toll gemacht! Spoken practice is the fastest way to pass Goethe & ÖSD exams.",
  };
}

import { OBJECTIVE_QUESTIONS } from '../data/questions.js';
import { SPEAKING_QUESTIONS } from '../data/speakingQuestions.js';

/**
 * Version 2.0.0 Scoring Engine (4 Skills: Vocab, Grammar, Reading, Speaking)
 * Total Score: 12.0 (3.0 per skill)
 *
 * @param {Record<string, string>} objectiveAnswers - e.g., { q1: "A", q2: "B", ... }
 * @param {Record<string, object>} speakingEvaluations - e.g., { s1: { score: 2.5, ... }, ... }
 * @returns {object} Full four-skill diagnostic score report
 */
export function calculateAssessmentScore(objectiveAnswers = {}, speakingEvaluations = {}) {
  // 1. Evaluate Objective Questions (Vocab, Grammar, Reading)
  const skills = {
    vocabulary: { correct: 0, total: 3, percentage: 0, label: "Vocabulary (Wortschatz)" },
    grammar: { correct: 0, total: 3, percentage: 0, label: "Grammar (Grammatik)" },
    reading: { correct: 0, total: 3, percentage: 0, label: "Reading (Leseverstehen)" },
    speaking: { correct: 0, total: 3, percentage: 0, label: "Speaking (Sprechen)" },
  };

  const incorrectQuestions = [];
  const correctQuestions = [];

  OBJECTIVE_QUESTIONS.forEach((q) => {
    const selectedOptionId = objectiveAnswers[q.id];
    const isCorrect = selectedOptionId === q.correctOptionId;

    const selectedOptionObj = q.options.find((opt) => opt.id === selectedOptionId);
    const correctOptionObj = q.options.find((opt) => opt.id === q.correctOptionId);

    if (isCorrect) {
      if (skills[q.skill]) {
        skills[q.skill].correct += 1;
      }
      correctQuestions.push({
        id: q.id,
        skill: q.skill,
        topic: q.topic,
        question: q.question,
      });
    } else {
      incorrectQuestions.push({
        id: q.id,
        skill: q.skill,
        skillLabel: q.skillLabel,
        topic: q.topic,
        question: q.question,
        passage: q.passage || null,
        selectedOptionId: selectedOptionId || "Unanswered",
        selectedOptionText: selectedOptionObj ? selectedOptionObj.text : "No answer",
        correctOptionId: q.correctOptionId,
        correctOptionText: correctOptionObj ? correctOptionObj.text : "",
        explanation: q.explanation,
      });
    }
  });

  // 2. Evaluate Speaking Questions (Average of 3 speaking tasks, each 0 to 3)
  const speakingPromptScores = [];
  SPEAKING_QUESTIONS.forEach((sp) => {
    const evalData = speakingEvaluations[sp.id];
    const promptScore = evalData && typeof evalData.score === 'number' ? evalData.score : 0;
    speakingPromptScores.push(promptScore);
  });

  const rawSpeakingAverage =
    speakingPromptScores.reduce((acc, curr) => acc + curr, 0) / SPEAKING_QUESTIONS.length;
  // Normalized speaking score out of 3.0
  const normalizedSpeakingScore = Math.round(rawSpeakingAverage * 10) / 10;
  skills.speaking.correct = normalizedSpeakingScore;

  // Calculate skill percentages
  Object.keys(skills).forEach((key) => {
    const s = skills[key];
    s.percentage = Math.round((s.correct / s.total) * 100);
  });

  // Total Combined Score (out of 12.0)
  const totalCorrectPoints =
    skills.vocabulary.correct +
    skills.grammar.correct +
    skills.reading.correct +
    skills.speaking.correct;

  const roundedTotalPoints = Math.round(totalCorrectPoints * 10) / 10;
  const overallPercentage = Math.round((totalCorrectPoints / 12) * 100);

  // Identify Strengths (>= 2.5 / 3 or >= 80%) & Weaknesses (< 1.5 / 3 or < 50%)
  const identifiedStrengths = [];
  const identifiedWeaknesses = [];
  const criticalSkillGaps = []; // Skills strictly below 50%

  Object.entries(skills).forEach(([key, data]) => {
    if (data.percentage >= 75) {
      identifiedStrengths.push({
        skill: key,
        label: data.label,
        score: `${data.correct} / ${data.total}`,
        percentage: data.percentage,
      });
    } else {
      identifiedWeaknesses.push({
        skill: key,
        label: data.label,
        score: `${data.correct} / ${data.total}`,
        percentage: data.percentage,
      });
    }

    if (data.percentage < 50) {
      criticalSkillGaps.push({
        skill: key,
        label: data.label,
        score: `${data.correct} / ${data.total}`,
      });
    }
  });

  // Determine Readiness Classification (v2.0.0 rules)
  let readinessCategory;
  const hasSub50Skill = criticalSkillGaps.length > 0;

  if (overallPercentage >= 85) {
    if (!hasSub50Skill) {
      readinessCategory = {
        key: "strong",
        label: "Strong Practice Performance",
        badgeVariant: "emerald",
        headline: "Ready for Goethe / ÖSD A1 Registration",
        description:
          "Outstanding balance across Vocabulary, Grammar, Reading, and Speaking! You comfortably meet the A1 passing standard and are well positioned to book your exam date.",
        advice: "Maintain your rhythm by doing full-length official timed sample exams and practicing your self-introduction.",
      };
    } else {
      readinessCategory = {
        key: "almost_there",
        label: "Almost There (Skill Imbalance)",
        badgeVariant: "sky",
        headline: "High Score with an Isolated Skill Gap",
        description:
          "Your overall percentage is high, but at least one core skill scored below 50%. Both Goethe and ÖSD require balanced competence to avoid failing individual exam sub-tests.",
        advice: `Focus your preparation specifically on your weakest skill (${criticalSkillGaps.map((s) => s.label).join(', ')}) before booking.`,
      };
    }
  } else if (overallPercentage >= 70) {
    readinessCategory = {
      key: "almost_there",
      label: "Almost There",
      badgeVariant: "sky",
      headline: "Solid Foundation with Minor Skill Gaps",
      description:
        "You demonstrate good grasp of A1 communication, but specific grammatical rules or speaking fluidity require 1-2 weeks of focused review.",
      advice: "Dedicate 10-14 days to practicing the specific mistakes and drills listed in your study plan below.",
    };
  } else if (overallPercentage >= 50) {
    readinessCategory = {
      key: "targeted_practice",
      label: "Needs Targeted Practice",
      badgeVariant: "amber",
      headline: "Noticeable Gaps — Do Not Book Exam Yet",
      description:
        "You have basic German awareness, but inconsistent grammar, limited vocabulary, or hesitant speaking put you at significant risk of failing an official exam.",
      advice: "Review core grammar rules (accusative articles, verb conjugations) and practice spoken responses out loud before retesting in 2-3 weeks.",
    };
  } else {
    readinessCategory = {
      key: "foundations",
      label: "Build A1 Foundations",
      badgeVariant: "rose",
      headline: "Foundational Review Required",
      description:
        "You are in the early stages of German A1. Booking an official examination at this stage would likely result in lost registration fees and frustration.",
      advice: "Follow a structured A1 course (Goethe/DW Nicos Weg/Hueber) from Chapter 1. Build basic vocabulary and sentence structures steadily.",
    };
  }

  return {
    totalQuestions: 12,
    totalPoints: 12,
    correctCount: roundedTotalPoints,
    percentage: overallPercentage,
    skills,
    readinessCategory,
    identifiedStrengths,
    identifiedWeaknesses,
    criticalSkillGaps,
    incorrectQuestions,
    correctQuestions,
    speakingEvaluations,
    evaluatedAt: new Date().toISOString(),
  };
}

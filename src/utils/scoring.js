import { QUESTIONS } from '../data/questions.js';

/**
 * Deterministic scoring engine for the 12-question A1 ReadyCheck diagnostic assessment.
 * Evaluates answers against pre-defined answer keys without LLM involvement.
 *
 * @param {Record<string, string>} userAnswers - e.g., { q1: "A", q2: "B", ... }
 * @returns {object} Full evaluated score report
 */
export function calculateAssessmentScore(userAnswers = {}) {
  const totalQuestions = QUESTIONS.length; // 12
  let correctCount = 0;

  const skills = {
    vocabulary: { correct: 0, total: 0, percentage: 0, label: "Wortschatz (Vocabulary)" },
    grammar: { correct: 0, total: 0, percentage: 0, label: "Grammatik (Grammar)" },
    reading: { correct: 0, total: 0, percentage: 0, label: "Leseverstehen (Reading)" },
  };

  const incorrectQuestions = [];
  const correctQuestions = [];

  QUESTIONS.forEach((q) => {
    const skillKey = q.skill;
    if (skills[skillKey]) {
      skills[skillKey].total += 1;
    }

    const selectedOptionId = userAnswers[q.id];
    const isCorrect = selectedOptionId === q.correctOptionId;

    const selectedOptionObj = q.options.find((opt) => opt.id === selectedOptionId);
    const correctOptionObj = q.options.find((opt) => opt.id === q.correctOptionId);

    if (isCorrect) {
      correctCount += 1;
      if (skills[skillKey]) {
        skills[skillKey].correct += 1;
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
        selectedOptionText: selectedOptionObj ? selectedOptionObj.text : "Keine Antwort",
        correctOptionId: q.correctOptionId,
        correctOptionText: correctOptionObj ? correctOptionObj.text : "",
        explanation: q.explanation,
      });
    }
  });

  // Calculate percentages
  const overallPercentage = Math.round((correctCount / totalQuestions) * 100);
  Object.keys(skills).forEach((key) => {
    const s = skills[key];
    s.percentage = s.total > 0 ? Math.round((s.correct / s.total) * 100) : 0;
  });

  // Strengths and Weaknesses identification
  const identifiedStrengths = [];
  const identifiedWeaknesses = [];

  Object.entries(skills).forEach(([key, data]) => {
    if (data.correct >= 3) {
      identifiedStrengths.push({
        skill: key,
        label: data.label,
        score: `${data.correct}/${data.total}`,
      });
    } else {
      identifiedWeaknesses.push({
        skill: key,
        label: data.label,
        score: `${data.correct}/${data.total}`,
      });
    }
  });

  // Determine Readiness Category
  let readinessCategory;

  const allSkillsAtLeast3 = Object.values(skills).every((s) => s.correct >= 3);

  if (correctCount >= 10) {
    if (allSkillsAtLeast3) {
      readinessCategory = {
        key: "strong",
        label: "Strong Practice Performance",
        badgeVariant: "emerald",
        headline: "Ready for Goethe / ÖSD A1 Registration",
        description:
          "Outstanding performance across all core competencies! You demonstrate reliable A1 vocabulary, grammar, and reading comprehension. You are well positioned to book your examination.",
        advice: "Maintain your rhythm by doing full-length official timed sample exams and practicing your self-introduction for the oral exam.",
      };
    } else {
      readinessCategory = {
        key: "almost_there",
        label: "Almost There (Skill Imbalance)",
        badgeVariant: "sky",
        headline: "High Score with Isolated Skill Gap",
        description:
          "You scored high overall (10+), but at least one skill scored below 3/4. Official Goethe and ÖSD exams require balanced competence across all modules.",
        advice: "Focus your remaining preparation specifically on your lower-scoring skill before booking your test date.",
      };
    }
  } else if (correctCount >= 8) {
    readinessCategory = {
      key: "almost_there",
      label: "Almost There",
      badgeVariant: "sky",
      headline: "Solid Foundation with Minor Skill Gaps",
      description:
        "You have a firm grasp of essential A1 patterns, but a few gaps remain in specific grammar rules or vocabulary domains. A little targeted practice will get you over the line.",
      advice: "Spend 1 to 2 weeks revising your incorrect question topics and practicing everyday reading notices before booking.",
    };
  } else if (correctCount >= 5) {
    readinessCategory = {
      key: "targeted_practice",
      label: "Needs Targeted Practice",
      badgeVariant: "amber",
      headline: "Noticeable Gaps — Do Not Book Exam Yet",
      description:
        "You have acquired basic A1 awareness, but inconsistent grammar or limited vocabulary would put you at significant risk of failing an official examination.",
      advice: "Review core grammar rules (accusative articles, verb conjugations) and study everyday high-frequency word lists. Retake this assessment in 2-3 weeks.",
    };
  } else {
    readinessCategory = {
      key: "foundations",
      label: "Build A1 Foundations",
      badgeVariant: "rose",
      headline: "Foundational Review Required",
      description:
        "You are in the early stages of German A1. Booking an official examination at this stage would likely result in lost registration fees and frustration.",
      advice: "Follow a structured A1 course (Goethe/DW Nicos Weg/Hueber Menschen) from Chapter 1. Build basic sentence structures and vocabulary steadily.",
    };
  }

  return {
    totalQuestions,
    correctCount,
    percentage: overallPercentage,
    skills,
    readinessCategory,
    identifiedStrengths,
    identifiedWeaknesses,
    incorrectQuestions,
    correctQuestions,
    evaluatedAt: new Date().toISOString(),
  };
}

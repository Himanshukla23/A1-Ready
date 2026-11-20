import { QUESTIONS } from '../data/questions.js';

export function getQuestions() {
  return QUESTIONS;
}

export function getQuestionByIndex(index) {
  if (index >= 0 && index < QUESTIONS.length) {
    return QUESTIONS[index];
  }
  return null;
}

export function validateCompletion(answers = {}) {
  const totalCount = QUESTIONS.length;
  const answeredQuestionIds = Object.keys(answers).filter((id) => Boolean(answers[id]));
  const answeredCount = answeredQuestionIds.length;

  const unansweredIndices = [];
  QUESTIONS.forEach((q, idx) => {
    if (!answers[q.id]) {
      unansweredIndices.push(idx);
    }
  });

  return {
    isComplete: answeredCount === totalCount,
    answeredCount,
    totalCount,
    unansweredIndices,
  };
}

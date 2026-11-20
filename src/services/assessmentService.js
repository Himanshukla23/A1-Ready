import { OBJECTIVE_QUESTIONS } from '../data/questions.js';
import { SPEAKING_QUESTIONS } from '../data/speakingQuestions.js';

export const ALL_ASSESSMENT_TASKS = [
  ...OBJECTIVE_QUESTIONS,
  ...SPEAKING_QUESTIONS,
];

export function getAllTasks() {
  return ALL_ASSESSMENT_TASKS;
}

export function getTaskByIndex(index) {
  if (index >= 0 && index < ALL_ASSESSMENT_TASKS.length) {
    return ALL_ASSESSMENT_TASKS[index];
  }
  return null;
}

export function validateCompletion(objectiveAnswers = {}, speakingResponses = {}) {
  const totalCount = ALL_ASSESSMENT_TASKS.length; // 12
  const unansweredIndices = [];

  ALL_ASSESSMENT_TASKS.forEach((task, idx) => {
    if (task.skill === 'speaking') {
      const resp = speakingResponses[task.id];
      const hasSpoken = resp && typeof resp.transcript === 'string' && resp.transcript.trim().length > 0;
      if (!hasSpoken) {
        unansweredIndices.push(idx);
      }
    } else {
      if (!objectiveAnswers[task.id]) {
        unansweredIndices.push(idx);
      }
    }
  });

  const answeredCount = totalCount - unansweredIndices.length;

  return {
    isComplete: unansweredIndices.length === 0,
    answeredCount,
    totalCount,
    unansweredIndices,
  };
}

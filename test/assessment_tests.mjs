import assert from 'node:assert/strict';
import { QUESTIONS } from '../src/data/questions.js';
import { calculateAssessmentScore } from '../src/utils/scoring.js';
import { validateCompletion } from '../src/services/assessmentService.js';

console.log('🧪 Starting Assessment Engine Unit Tests...\n');

// 1. Verify 12 questions structure and distribution
assert.equal(QUESTIONS.length, 12, 'Must have exactly 12 questions');
const vocabCount = QUESTIONS.filter((q) => q.skill === 'vocabulary').length;
const grammarCount = QUESTIONS.filter((q) => q.skill === 'grammar').length;
const readingCount = QUESTIONS.filter((q) => q.skill === 'reading').length;

assert.equal(vocabCount, 4, 'Must have 4 vocabulary questions');
assert.equal(grammarCount, 4, 'Must have 4 grammar questions');
assert.equal(readingCount, 4, 'Must have 4 reading questions');
console.log('✅ Question distribution check passed (4 Vocab, 4 Grammar, 4 Reading).');

// 2. Test: All answers correct (12/12)
const allCorrectAnswers = {};
QUESTIONS.forEach((q) => {
  allCorrectAnswers[q.id] = q.correctOptionId;
});

const perfectResult = calculateAssessmentScore(allCorrectAnswers);
assert.equal(perfectResult.correctCount, 12, 'All correct should be 12');
assert.equal(perfectResult.percentage, 100, 'Percentage should be 100%');
assert.equal(perfectResult.readinessCategory.key, 'strong', 'Category must be strong');
assert.equal(perfectResult.readinessCategory.label, 'Strong Practice Performance');
assert.equal(perfectResult.incorrectQuestions.length, 0, 'Zero incorrect questions');
assert.equal(perfectResult.skills.vocabulary.correct, 4);
assert.equal(perfectResult.skills.grammar.correct, 4);
assert.equal(perfectResult.skills.reading.correct, 4);
console.log('✅ Test "All answers correct (12/12)" passed.');

// 3. Test: All answers incorrect (0/12)
const allWrongAnswers = {};
QUESTIONS.forEach((q) => {
  // pick an option that is not correct
  const wrongOpt = q.options.find((opt) => opt.id !== q.correctOptionId);
  allWrongAnswers[q.id] = wrongOpt.id;
});

const zeroResult = calculateAssessmentScore(allWrongAnswers);
assert.equal(zeroResult.correctCount, 0, 'Zero correct should be 0');
assert.equal(zeroResult.percentage, 0, 'Percentage should be 0%');
assert.equal(zeroResult.readinessCategory.key, 'foundations');
assert.equal(zeroResult.readinessCategory.label, 'Build A1 Foundations');
assert.equal(zeroResult.incorrectQuestions.length, 12);
console.log('✅ Test "All answers incorrect (0/12)" passed.');

// 4. Test: Mixed answers (8/12) -> Almost There
const mixedAnswers = { ...allCorrectAnswers };
mixedAnswers['q1'] = 'D'; // wrong
mixedAnswers['q2'] = 'C'; // wrong
mixedAnswers['q5'] = 'A'; // wrong
mixedAnswers['q9'] = 'A'; // wrong
// Remaining 8 are correct
const mixedResult = calculateAssessmentScore(mixedAnswers);
assert.equal(mixedResult.correctCount, 8);
assert.equal(mixedResult.readinessCategory.key, 'almost_there');
console.log('✅ Test "Mixed answers (8/12)" passed (Almost There).');

// 5. Test: Boundary condition for Strong (10/12 total, but one skill has only 2/4)
// Total 10: Vocab 4/4, Grammar 4/4, Reading 2/4 -> reading has 2 (< 3), so cannot get "Strong"
const boundaryAnswers = { ...allCorrectAnswers };
boundaryAnswers['q9'] = 'A'; // wrong
boundaryAnswers['q10'] = 'C'; // wrong
// 10 correct: Vocab 4/4, Grammar 4/4, Reading 2/4
const boundaryResult = calculateAssessmentScore(boundaryAnswers);
assert.equal(boundaryResult.correctCount, 10);
assert.equal(boundaryResult.skills.reading.correct, 2);
assert.equal(
  boundaryResult.readinessCategory.key,
  'almost_there',
  'Must downgrade to almost_there due to skill imbalance (<3 in reading)'
);
console.log('✅ Test "Boundary condition: 10/12 with skill imbalance" passed (Rule strictly enforced).');

// 6. Test: Needs Targeted Practice (6/12)
const targetedAnswers = {};
// Answer first 6 correct, next 6 wrong
QUESTIONS.forEach((q, idx) => {
  if (idx < 6) {
    targetedAnswers[q.id] = q.correctOptionId;
  } else {
    const wrongOpt = q.options.find((opt) => opt.id !== q.correctOptionId);
    targetedAnswers[q.id] = wrongOpt.id;
  }
});
const targetedResult = calculateAssessmentScore(targetedAnswers);
assert.equal(targetedResult.correctCount, 6);
assert.equal(targetedResult.readinessCategory.key, 'targeted_practice');
console.log('✅ Test "Needs Targeted Practice (6/12)" passed.');

// 7. Test: Validation for incomplete answers
const incompleteAnswers = { q1: 'A', q2: 'B', q3: 'B' };
const validation = validateCompletion(incompleteAnswers);
assert.equal(validation.isComplete, false);
assert.equal(validation.answeredCount, 3);
assert.equal(validation.totalCount, 12);
assert.equal(validation.unansweredIndices.length, 9);
console.log('✅ Test "Unanswered question validation" passed.');

console.log('\n🎉 ALL 7 ASSESSMENT ENGINE UNIT TESTS PASSED SUCCESSFULLY!\n');

import assert from 'node:assert/strict';
import { OBJECTIVE_QUESTIONS } from '../src/data/questions.js';
import { SPEAKING_QUESTIONS } from '../src/data/speakingQuestions.js';
import { calculateAssessmentScore } from '../src/utils/scoring.js';
import { validateCompletion } from '../src/services/assessmentService.js';

console.log('🧪 Starting Assessment Engine v2.0.0 Unit Tests (4 Skills)...\n');

// 1. Verify 12 questions structure (9 MCQ + 3 Speaking)
assert.equal(OBJECTIVE_QUESTIONS.length, 9, 'Must have 9 objective questions');
assert.equal(SPEAKING_QUESTIONS.length, 3, 'Must have 3 speaking questions');

const vocabCount = OBJECTIVE_QUESTIONS.filter((q) => q.skill === 'vocabulary').length;
const grammarCount = OBJECTIVE_QUESTIONS.filter((q) => q.skill === 'grammar').length;
const readingCount = OBJECTIVE_QUESTIONS.filter((q) => q.skill === 'reading').length;
const speakingCount = SPEAKING_QUESTIONS.length;

assert.equal(vocabCount, 3, 'Must have 3 vocabulary questions');
assert.equal(grammarCount, 3, 'Must have 3 grammar questions');
assert.equal(readingCount, 3, 'Must have 3 reading questions');
assert.equal(speakingCount, 3, 'Must have 3 speaking questions');
console.log('✅ Four-skill distribution check passed (3 Vocab, 3 Grammar, 3 Reading, 3 Speaking).');

// 2. Test: All answers correct + 3.0 in speaking (12/12)
const allCorrectObjective = {};
OBJECTIVE_QUESTIONS.forEach((q) => {
  allCorrectObjective[q.id] = q.correctOptionId;
});
const allPerfectSpeaking = {
  s1: { score: 3.0, transcript: "Hallo ich heiße..." },
  s2: { score: 3.0, transcript: "Ich möchte bitte..." },
  s3: { score: 3.0, transcript: "Am Wochenende..." },
};

const perfectResult = calculateAssessmentScore(allCorrectObjective, allPerfectSpeaking);
assert.equal(perfectResult.correctCount, 12);
assert.equal(perfectResult.percentage, 100);
assert.equal(perfectResult.readinessCategory.key, 'strong');
assert.equal(perfectResult.readinessCategory.label, 'Strong Practice Performance');
console.log('✅ Test "All answers correct (12/12)" passed (100% Strong).');

// 3. Test: All answers incorrect (0/12)
const allWrongObjective = {};
OBJECTIVE_QUESTIONS.forEach((q) => {
  const wrongOpt = q.options.find((opt) => opt.id !== q.correctOptionId);
  allWrongObjective[q.id] = wrongOpt.id;
});
const zeroSpeaking = {
  s1: { score: 0.0, transcript: "" },
  s2: { score: 0.0, transcript: "" },
  s3: { score: 0.0, transcript: "" },
};

const zeroResult = calculateAssessmentScore(allWrongObjective, zeroSpeaking);
assert.equal(zeroResult.correctCount, 0);
assert.equal(zeroResult.percentage, 0);
assert.equal(zeroResult.readinessCategory.key, 'foundations');
console.log('✅ Test "All answers incorrect (0/12)" passed (0% Foundations).');

// 4. Test: Mixed answers (8.5/12 = 71%) -> Almost There
const mixedObjective = { ...allCorrectObjective };
mixedObjective['q1'] = 'D'; // wrong
mixedObjective['q4'] = 'A'; // wrong
// 7 correct in objective (Vocab 2/3, Grammar 2/3, Reading 3/3)
const mixedSpeaking = {
  s1: { score: 2.0 },
  s2: { score: 2.5 },
  s3: { score: 2.0 },
}; // average: 2.2 / 3
// Total: 7 + 2.2 = 9.2 / 12 = 77%
const mixedResult = calculateAssessmentScore(mixedObjective, mixedSpeaking);
assert.ok(mixedResult.percentage >= 70 && mixedResult.percentage < 85);
assert.equal(mixedResult.readinessCategory.key, 'almost_there');
console.log('✅ Test "Mixed answers (70%-84%)" passed (Almost There).');

// 5. Test: Boundary Condition: High overall percentage (>=85%) but one skill below 50% (< 1.5/3)
// Objective: 9/9 (100%) -> 9 points
// Speaking: s1=0.5, s2=1.0, s3=1.0 -> average = 0.8 / 3 (27% < 50%!)
// Total: 9.8 / 12 = 82% (or let's test 10.4 / 12 = 87%)
// Objective: 9/9 (9 points). Speaking: s1=1.4, s2=1.4, s3=1.4 -> average = 1.4 / 3 (47% < 50%)
// Total = 10.4 / 12 = 87% (>= 85%). But speaking is < 50%!
const boundarySpeaking = {
  s1: { score: 1.4 },
  s2: { score: 1.4 },
  s3: { score: 1.4 },
};
const boundaryResult = calculateAssessmentScore(allCorrectObjective, boundarySpeaking);
assert.ok(boundaryResult.percentage >= 85, 'Percentage is >= 85%');
assert.equal(
  boundaryResult.readinessCategory.key,
  'almost_there',
  'Must downgrade to almost_there because Speaking is below 50% (< 1.5/3)'
);
assert.ok(boundaryResult.criticalSkillGaps.some((g) => g.skill === 'speaking'));
console.log('✅ Test "Skill Balance Boundary: >=85% with Sub-50% Skill" passed (Enforced rule).');

// 6. Test: Needs Targeted Practice (6.0/12 = 50%)
const targetedObjective = {};
OBJECTIVE_QUESTIONS.forEach((q, idx) => {
  targetedObjective[q.id] = idx < 4 ? q.correctOptionId : 'D';
});
const targetedSpeaking = {
  s1: { score: 2.0 },
  s2: { score: 2.0 },
  s3: { score: 2.0 },
};
const targetedResult = calculateAssessmentScore(targetedObjective, targetedSpeaking);
assert.ok(targetedResult.percentage >= 50 && targetedResult.percentage < 70);
assert.equal(targetedResult.readinessCategory.key, 'targeted_practice');
console.log('✅ Test "Needs Targeted Practice (50%-69%)" passed.');

// 7. Test: Validation catches incomplete tasks
const incompleteObjective = { q1: 'A', q2: 'B' };
const incompleteSpeaking = { s1: { transcript: 'Hallo' } };
const validation = validateCompletion(incompleteObjective, incompleteSpeaking);
assert.equal(validation.isComplete, false);
assert.equal(validation.answeredCount, 3);
assert.equal(validation.totalCount, 12);
assert.equal(validation.unansweredIndices.length, 9);
console.log('✅ Test "Validation for incomplete 4-skill assessment" passed.');

console.log('\n🎉 ALL 7 ASSESSMENT ENGINE v2.0.0 TESTS PASSED SUCCESSFULLY!\n');

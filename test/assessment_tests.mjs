import assert from 'node:assert/strict';
import { OBJECTIVE_QUESTIONS } from '../src/data/questions.js';
import { LISTENING_QUESTIONS } from '../src/data/listeningQuestions.js';
import { SPEAKING_QUESTIONS } from '../src/data/speakingQuestions.js';
import { calculateAssessmentScore } from '../src/utils/scoring.js';
import { validateCompletion, ALL_ASSESSMENT_TASKS } from '../src/services/assessmentService.js';

console.log('🧪 Starting Assessment Engine v3.0.0 Unit Tests (5 Skills)...\n');

// 1. Verify 12 questions structure (8 Objective + 2 Listening + 2 Speaking = 12)
assert.equal(ALL_ASSESSMENT_TASKS.length, 12, 'Must have exactly 12 total tasks');
assert.equal(OBJECTIVE_QUESTIONS.length, 8, 'Must have 8 objective questions (3V + 3G + 2R)');
assert.equal(LISTENING_QUESTIONS.length, 2, 'Must have 2 listening questions');
assert.equal(SPEAKING_QUESTIONS.length, 2, 'Must have 2 speaking questions');

const vocabCount = OBJECTIVE_QUESTIONS.filter((q) => q.skill === 'vocabulary').length;
const grammarCount = OBJECTIVE_QUESTIONS.filter((q) => q.skill === 'grammar').length;
const readingCount = OBJECTIVE_QUESTIONS.filter((q) => q.skill === 'reading').length;
const listeningCount = LISTENING_QUESTIONS.length;
const speakingCount = SPEAKING_QUESTIONS.length;

assert.equal(vocabCount, 3, 'Must have 3 vocabulary questions');
assert.equal(grammarCount, 3, 'Must have 3 grammar questions');
assert.equal(readingCount, 2, 'Must have 2 reading questions');
assert.equal(listeningCount, 2, 'Must have 2 listening questions');
assert.equal(speakingCount, 2, 'Must have 2 speaking questions');
console.log('✅ Five-skill distribution check passed (3 Vocab, 3 Grammar, 2 Reading, 2 Listening, 2 Speaking = 12).');

// 2. Test: All answers correct + perfect speaking (12/12)
const allCorrectObjective = {};
OBJECTIVE_QUESTIONS.forEach((q) => {
  allCorrectObjective[q.id] = q.correctOptionId;
});
LISTENING_QUESTIONS.forEach((q) => {
  allCorrectObjective[q.id] = q.correctOptionId;
});
const allPerfectSpeaking = {
  s1: { score: 3.0, transcript: "Hallo ich heiße..." },
  s2: { score: 3.0, transcript: "Ich möchte bitte..." },
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
LISTENING_QUESTIONS.forEach((q) => {
  const wrongOpt = q.options.find((opt) => opt.id !== q.correctOptionId);
  allWrongObjective[q.id] = wrongOpt.id;
});
const zeroSpeaking = {
  s1: { score: 0.0, transcript: "" },
  s2: { score: 0.0, transcript: "" },
};

const zeroResult = calculateAssessmentScore(allWrongObjective, zeroSpeaking);
assert.equal(zeroResult.correctCount, 0);
assert.equal(zeroResult.percentage, 0);
assert.equal(zeroResult.readinessCategory.key, 'foundations');
console.log('✅ Test "All answers incorrect (0/12)" passed (0% Foundations).');

// 4. Test: Mixed answers (70%-84%) -> Almost There
const mixedObjective = { ...allCorrectObjective };
mixedObjective['q1'] = 'D'; // wrong vocab (-1)
mixedObjective['q4'] = 'A'; // wrong grammar (-1)
// 8 correct out of 10 objective (8 points).
// Speaking: s1=2.5, s2=2.5 -> average=2.5 / 3 -> normalized to (2.5/3)*2 = 1.7 / 2.
// Total: 8 + 1.7 = 9.7 / 12 = 81%
const mixedSpeaking = {
  s1: { score: 2.5 },
  s2: { score: 2.5 },
};
const mixedResult = calculateAssessmentScore(mixedObjective, mixedSpeaking);
assert.ok(mixedResult.percentage >= 70 && mixedResult.percentage < 85);
assert.equal(mixedResult.readinessCategory.key, 'almost_there');
console.log('✅ Test "Mixed answers (70%-84%)" passed (Almost There).');

// 5. Test: Skill Balance Boundary: High percentage (>=85%) with sub-50% skill
// 10/10 objective = 10 pts.
// Speaking: s1=0.5, s2=0.5 -> avg=0.5 -> scaled to (0.5/3)*2 = 0.3 / 2 (15% < 50%!).
// Total: 10 + 0.3 = 10.3 / 12 = 86% (>= 85%). But speaking is < 50%!
const boundarySpeaking = {
  s1: { score: 0.5 },
  s2: { score: 0.5 },
};
const boundaryResult = calculateAssessmentScore(allCorrectObjective, boundarySpeaking);
assert.ok(boundaryResult.percentage >= 85, 'Percentage is >= 85%');
assert.equal(
  boundaryResult.readinessCategory.key,
  'almost_there',
  'Must downgrade to almost_there because Speaking is below 50%'
);
assert.ok(boundaryResult.criticalSkillGaps.some((g) => g.skill === 'speaking'));
console.log('✅ Test "Skill Balance Boundary: >=85% with Sub-50% Skill" passed (Enforced rule).');

// 6. Test: Needs Targeted Practice (50%-69%)
const targetedObjective = {};
OBJECTIVE_QUESTIONS.forEach((q, idx) => {
  targetedObjective[q.id] = idx < 4 ? q.correctOptionId : 'D';
});
LISTENING_QUESTIONS.forEach((q, idx) => {
  targetedObjective[q.id] = idx === 0 ? q.correctOptionId : 'D';
});
// 5 objective points + 1.3 speaking points = 6.3 / 12 = 53%
const targetedSpeaking = {
  s1: { score: 2.0 },
  s2: { score: 2.0 },
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
console.log('✅ Test "Validation for incomplete 5-skill assessment" passed.');

console.log('\n🎉 ALL 7 ASSESSMENT ENGINE v3.0.0 TESTS PASSED SUCCESSFULLY!\n');

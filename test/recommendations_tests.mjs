import assert from 'node:assert/strict';
import { generateRecommendations, TOPIC_PRACTICE_DATABASE } from '../src/utils/recommendations.js';
import { calculateAssessmentScore } from '../src/utils/scoring.js';
import { QUESTIONS } from '../src/data/questions.js';

console.log('🧪 Starting Results & Recommendations Engine Tests...\n');

// 1. Verify topic database covers all questions
QUESTIONS.forEach((q) => {
  assert.ok(
    TOPIC_PRACTICE_DATABASE[q.topic],
    `Topic practice database must have entry for "${q.topic}"`
  );
});
console.log('✅ Topic practice database covers all 12 question topics.');

// 2. Test: Recommendations generation on mistakes
const answersWithErrors = {};
// Correct on all except q1 (Food & Drinks) and q5 (Akkusativ)
QUESTIONS.forEach((q) => {
  if (q.id === 'q1' || q.id === 'q5') {
    const wrong = q.options.find((opt) => opt.id !== q.correctOptionId);
    answersWithErrors[q.id] = wrong.id;
  } else {
    answersWithErrors[q.id] = q.correctOptionId;
  }
});

const evalResult = calculateAssessmentScore(answersWithErrors);
assert.equal(evalResult.incorrectQuestions.length, 2);

const recs = generateRecommendations(evalResult);
assert.equal(recs.length, 2, 'Should generate 2 targeted recommendations');
assert.ok(recs.some((r) => r.topic.includes('Essen & Trinken')));
assert.ok(recs.some((r) => r.topic.includes('Akkusativ')));
console.log('✅ Targeted recommendations correctly mapped to mistakes.');

// 3. Test: Perfect score (12/12) gets Goethe Modellsätze recommendation
const allCorrect = {};
QUESTIONS.forEach((q) => {
  allCorrect[q.id] = q.correctOptionId;
});
const perfectResult = calculateAssessmentScore(allCorrect);
const perfectRecs = generateRecommendations(perfectResult);
assert.ok(perfectRecs.length > 0);
assert.ok(perfectRecs.some((r) => r.topic.includes('Modellsätze')));
console.log('✅ Perfect score recommendations successfully generated.');

console.log('\n🎉 ALL RESULTS & RECOMMENDATIONS TESTS PASSED SUCCESSFULLY!\n');

import assert from 'node:assert/strict';
import { generateRecommendations, TOPIC_PRACTICE_DATABASE } from '../src/utils/recommendations.js';
import { calculateAssessmentScore } from '../src/utils/scoring.js';
import { OBJECTIVE_QUESTIONS } from '../src/data/questions.js';

console.log('🧪 Starting Results & Recommendations Engine Tests (v2.0.0)...\n');

// 1. Verify topic database covers all objective questions
OBJECTIVE_QUESTIONS.forEach((q) => {
  assert.ok(
    TOPIC_PRACTICE_DATABASE[q.topic],
    `Topic practice database must have entry for "${q.topic}"`
  );
});
console.log('✅ Topic practice database covers all objective question topics.');

// 2. Test: Recommendations generation on mistakes
const answersWithErrors = {};
OBJECTIVE_QUESTIONS.forEach((q) => {
  if (q.id === 'q1' || q.id === 'q4') {
    const wrong = q.options.find((opt) => opt.id !== q.correctOptionId);
    answersWithErrors[q.id] = wrong.id;
  } else {
    answersWithErrors[q.id] = q.correctOptionId;
  }
});

const evalResult = calculateAssessmentScore(answersWithErrors, {
  s1: { score: 3.0 },
  s2: { score: 3.0 },
  s3: { score: 3.0 },
});
assert.equal(evalResult.incorrectQuestions.length, 2);

const recs = generateRecommendations(evalResult);
assert.equal(recs.length, 2, 'Should generate 2 targeted recommendations');
assert.ok(recs.some((r) => r.topic.includes('Essen & Trinken')));
assert.ok(recs.some((r) => r.topic.includes('Akkusativ')));
console.log('✅ Targeted recommendations correctly mapped to mistakes.');

// 3. Test: Low speaking score generates speaking recommendation
const lowSpeakingResult = calculateAssessmentScore(
  OBJECTIVE_QUESTIONS.reduce((acc, q) => ({ ...acc, [q.id]: q.correctOptionId }), {}),
  {
    s1: { score: 1.0 },
    s2: { score: 1.0 },
    s3: { score: 1.0 },
  }
);
const speakingRecs = generateRecommendations(lowSpeakingResult);
assert.ok(speakingRecs.some((r) => r.skill === 'speaking'));
console.log('✅ Speaking score < 2.5 generates targeted speaking recommendation.');

console.log('\n🎉 ALL RESULTS & RECOMMENDATIONS TESTS PASSED SUCCESSFULLY!\n');

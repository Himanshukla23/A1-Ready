import assert from 'node:assert/strict';
import { evaluateSpeakingLocally, SPEAKING_DIMENSIONS } from '../src/utils/speakingRubric.js';
import { SPEAKING_QUESTIONS } from '../src/data/speakingQuestions.js';

console.log('🧪 Starting Speaking Rubric & Voice Evaluation Unit Tests...\n');

// 1. Verify 2 speaking tasks (part of the 12-task 5-skill exam)
assert.equal(SPEAKING_QUESTIONS.length, 2, 'Must have exactly 2 speaking prompts');
assert.equal(SPEAKING_DIMENSIONS.length, 4, 'Must have 4 evaluation dimensions');

// 2. Test: High-quality A1 response for Prompt s1 (Self-Introduction)
const sampleS1 = "Hallo, ich heiße Maria. Ich komme aus Spanien und wohne jetzt in Frankfurt. Ich spreche Spanisch, Englisch und ein bisschen Deutsch.";
const resultS1 = evaluateSpeakingLocally('s1', sampleS1);
assert.ok(resultS1.score >= 2.5, `High quality response should score >= 2.5, got ${resultS1.score}`);
assert.equal(resultS1.dimensions.task_relevance.score, 3);
assert.equal(resultS1.dimensions.vocabulary.score, 3);
assert.ok(resultS1.strengths.length > 0);
console.log('✅ Test "High quality self-introduction (s1)" passed.');

// 3. Test: Good ordering response for Prompt s2 (Café)
const sampleS2 = "Guten Tag! Ich möchte bitte einen Kaffee mit Milch bestellen und ein Brötchen essen. Kann ich bitte zahlen?";
const resultS2 = evaluateSpeakingLocally('s2', sampleS2);
assert.ok(resultS2.score >= 2.5, `Ordering response should score >= 2.5, got ${resultS2.score}`);
assert.ok(resultS2.dimensions.task_relevance.score >= 2);
console.log('✅ Test "Café ordering response (s2)" passed.');

// 4. Test: Empty or silent response
const emptyResult = evaluateSpeakingLocally('s2', '');
assert.equal(emptyResult.score, 0.0, 'Empty response must score 0.0');
assert.equal(emptyResult.dimensions.task_relevance.score, 0);
assert.equal(emptyResult.dimensions.completeness.score, 0);
console.log('✅ Test "Empty voice response" passed (0.0 points).');

// 5. Test: Minimal single-word response
const minimalResult = evaluateSpeakingLocally('s1', 'Ja');
assert.equal(minimalResult.score, 0.0);
console.log('✅ Test "Minimal single word response" passed.');

console.log('\n🎉 ALL SPEAKING RUBRIC TESTS PASSED SUCCESSFULLY!\n');

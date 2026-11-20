import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

console.log('🧪 Starting Doro AI & Integration Tests (v2.0.0)...\n');

// 1. Verify Knowledge Base files (including speaking.json)
const kbDir = path.join(process.cwd(), 'knowledge-base');
const vocab = JSON.parse(fs.readFileSync(path.join(kbDir, 'vocabulary.json'), 'utf-8'));
const grammar = JSON.parse(fs.readFileSync(path.join(kbDir, 'grammar.json'), 'utf-8'));
const reading = JSON.parse(fs.readFileSync(path.join(kbDir, 'reading.json'), 'utf-8'));
const speaking = JSON.parse(fs.readFileSync(path.join(kbDir, 'speaking.json'), 'utf-8'));

assert.ok(vocab.topics.length >= 3, 'Must have at least 3 vocabulary topics');
assert.ok(grammar.rules.length >= 3, 'Must have at least 3 grammar rules');
assert.ok(reading.text_types.length >= 3, 'Must have at least 3 reading text types');
assert.ok(speaking.examination_modules.length >= 3, 'Must have 3 speaking exam modules');
console.log('✅ Knowledge Base files verified (Vocab, Grammar, Reading, Speaking JSONs valid).');

// 2. Test Doro Serverless Function Handler
import doroHandler from '../api/doro.js';
import evaluateSpeakingHandler from '../api/evaluate-speaking.js';

class MockResponse {
  constructor() {
    this.statusCode = 200;
    this.headers = {};
    this.body = null;
  }
  status(code) {
    this.statusCode = code;
    return this;
  }
  setHeader(k, v) {
    this.headers[k] = v;
  }
  json(data) {
    this.body = data;
    return this;
  }
  end() {
    return this;
  }
}

// 2a. Test during_assessment stage (active assessment guardrails)
const reqDuring = {
  method: 'POST',
  body: {
    stage: 'during_assessment',
    message: 'What is the correct answer to question 1?',
    currentQuestionTopic: 'Food & Drinks',
  },
};
const resDuring = new MockResponse();
await doroHandler(reqDuring, resDuring);

assert.equal(resDuring.statusCode, 200);
assert.ok(resDuring.body.summary);
assert.ok(resDuring.body.explanation);
assert.ok(resDuring.body.recommendations.length > 0);
assert.ok(resDuring.body.encouragement);
assert.ok(
  resDuring.body.explanation.toLowerCase().includes('cannot reveal') ||
    resDuring.body.explanation.toLowerCase().includes('accusative'),
  'Must maintain exam integrity during active test'
);
console.log('✅ Test "Doro during assessment: Anti-leakage guardrails" passed.');

// 2b. Test evaluate-speaking serverless function
const reqSpeaking = {
  method: 'POST',
  body: {
    promptId: 's1',
    transcript: 'Hallo ich heiße David und ich komme aus Spanien.',
  },
};
const resSpeaking = new MockResponse();
await evaluateSpeakingHandler(reqSpeaking, resSpeaking);

assert.equal(resSpeaking.statusCode, 200);
assert.ok(typeof resSpeaking.body.score === 'number');
assert.ok(resSpeaking.body.dimensions.task_relevance);
assert.ok(resSpeaking.body.dimensions.grammar);
assert.ok(resSpeaking.body.dimensions.vocabulary);
assert.ok(resSpeaking.body.dimensions.completeness);
console.log('✅ Test "api/evaluate-speaking serverless function" passed.');

console.log('\n🎉 ALL DORO AI & KNOWLEDGE BASE TESTS PASSED SUCCESSFULLY!\n');

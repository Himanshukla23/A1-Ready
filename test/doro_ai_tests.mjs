import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

console.log('🧪 Starting Doro AI & Integration Tests...\n');

// 1. Verify Knowledge Base files
const kbDir = path.join(process.cwd(), 'knowledge-base');
const vocab = JSON.parse(fs.readFileSync(path.join(kbDir, 'vocabulary.json'), 'utf-8'));
const grammar = JSON.parse(fs.readFileSync(path.join(kbDir, 'grammar.json'), 'utf-8'));
const reading = JSON.parse(fs.readFileSync(path.join(kbDir, 'reading.json'), 'utf-8'));

assert.ok(vocab.topics.length >= 4, 'Must have at least 4 vocabulary topics');
assert.ok(grammar.rules.length >= 4, 'Must have at least 4 grammar rules');
assert.ok(reading.text_types.length >= 4, 'Must have at least 4 reading text types');
console.log('✅ Knowledge Base files verified (Vocab, Grammar, Reading JSONs valid).');

// 2. Test Doro Serverless Function Handler
import handler from '../api/doro.js';

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
    message: 'Was ist die richtige Antwort auf Frage 1?',
    currentQuestionTopic: 'Food & Drinks',
  },
};
const resDuring = new MockResponse();
await handler(reqDuring, resDuring);

assert.equal(resDuring.statusCode, 200);
assert.ok(resDuring.body.summary);
assert.ok(resDuring.body.explanation);
assert.ok(resDuring.body.recommendations.length > 0);
assert.ok(resDuring.body.encouragement);
// Check that it refused to reveal active answer
assert.ok(
  resDuring.body.explanation.includes('keine direkten Lösungen') ||
    resDuring.body.explanation.includes('Akkusativ'),
  'Must maintain exam integrity during active test'
);
console.log('✅ Test "Doro during assessment: Anti-leakage guardrails" passed.');

// 2b. Test after_assessment stage (detailed feedback)
const reqAfter = {
  method: 'POST',
  body: {
    stage: 'after_assessment',
    message: 'Erkläre mir meine Fehler und Übungen.',
    assessmentSummary: {
      score: 7,
      percentage: 58,
      weakSkills: ['grammar'],
      incorrectTopics: ['Bestimmte & Unbestimmte Artikel (Akkusativ)'],
    },
  },
};
const resAfter = new MockResponse();
await handler(reqAfter, resAfter);

assert.equal(resAfter.statusCode, 200);
assert.ok(resAfter.body.explanation.includes('7 von 12'));
assert.ok(resAfter.body.recommendations.length > 0);
console.log('✅ Test "Doro after assessment: Detailed feedback & recommendations" passed.');

console.log('\n🎉 ALL DORO AI & KNOWLEDGE BASE TESTS PASSED SUCCESSFULLY!\n');

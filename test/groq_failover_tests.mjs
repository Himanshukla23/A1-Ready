import assert from 'node:assert/strict';
import doroHandler from '../api/doro.js';
import evaluateSpeakingHandler from '../api/evaluate-speaking.js';

console.log('🧪 Starting Dual-Provider AI (Gemini -> Groq -> Local Fallback) Tests...\n');

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

// 1. Test Doro failover when API keys are unconfigured (graceful local fallback)
const reqDoro = {
  method: 'POST',
  body: {
    stage: 'after_assessment',
    message: 'What are my main mistakes?',
    assessmentSummary: { score: 8, percentage: 67, weakSkills: ['grammar'] },
  },
};
const resDoro = new MockResponse();
await doroHandler(reqDoro, resDoro);

assert.equal(resDoro.statusCode, 200);
assert.ok(resDoro.body.summary);
assert.ok(resDoro.body.explanation);
assert.ok(resDoro.body.recommendations.length > 0);
assert.ok(resDoro.body.provider === 'local_knowledge_base' || resDoro.body.provider === 'gemini' || resDoro.body.provider === 'groq');
console.log('✅ Test "Doro AI multi-provider resilience" passed.');

// 2. Test Speaking Evaluation failover
const reqSpeaking = {
  method: 'POST',
  body: {
    promptId: 's1',
    transcript: 'Hallo ich heiße Sarah und ich komme aus Österreich.',
  },
};
const resSpeaking = new MockResponse();
await evaluateSpeakingHandler(reqSpeaking, resSpeaking);

assert.equal(resSpeaking.statusCode, 200);
assert.ok(typeof resSpeaking.body.score === 'number');
assert.ok(resSpeaking.body.dimensions.task_relevance);
assert.ok(resSpeaking.body.provider === 'local_rubric' || resSpeaking.body.provider === 'gemini' || resSpeaking.body.provider === 'groq');
console.log('✅ Test "Speaking Evaluation multi-provider resilience" passed.');

console.log('\n🎉 ALL MULTI-PROVIDER AI & GROQ FAILOVER TESTS PASSED SUCCESSFULLY!\n');

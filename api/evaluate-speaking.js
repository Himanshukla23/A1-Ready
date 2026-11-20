import { evaluateSpeakingLocally } from '../src/utils/speakingRubric.js';
import { SPEAKING_QUESTIONS } from '../src/data/speakingQuestions.js';

/**
 * Dual-Provider Speaking Evaluation with Groq Failover:
 * Primary: Google Gemini API (gemini-2.5-flash)
 * Secondary: Groq API (llama-3.3-70b-versatile)
 * Tertiary: Local CEFR A1 Rubric Engine (evaluateSpeakingLocally)
 */
async function callSpeakingAIWithGroqFallback({ systemInstruction, userPrompt, schemaDescription }) {
  const geminiApiKey = process.env.GEMINI_API_KEY;
  const groqApiKey = process.env.GROQ_API_KEY;

  // 1. Try Gemini first (Primary)
  if (geminiApiKey && geminiApiKey !== 'your_gemini_api_key_here') {
    try {
      const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${geminiApiKey}`;
      const geminiResponse = await fetch(geminiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: systemInstruction },
                { text: userPrompt }
              ]
            }
          ],
          generationConfig: {
            responseMimeType: "application/json",
            temperature: 0.2
          }
        })
      });

      if (geminiResponse.ok) {
        const data = await geminiResponse.json();
        const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (candidateText) {
          const parsed = JSON.parse(candidateText);
          return { data: parsed, provider: 'gemini' };
        }
      } else {
        console.warn(`[Speaking AI Failover] Gemini responded with status ${geminiResponse.status}. Attempting Groq...`);
      }
    } catch (err) {
      console.warn(`[Speaking AI Failover] Gemini error (${err.message}). Attempting Groq...`);
    }
  }

  // 2. Try Groq second (Secondary / Failover)
  if (groqApiKey && groqApiKey !== 'your_groq_api_key_here') {
    try {
      const groqUrl = 'https://api.groq.com/openai/v1/chat/completions';
      const groqResponse = await fetch(groqUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${groqApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'openai/gpt-oss-120b',
          messages: [
            {
              role: 'system',
              content: `${systemInstruction}\nYou MUST reply strictly in valid JSON matching this schema:\n${schemaDescription}`
            },
            {
              role: 'user',
              content: userPrompt
            }
          ],
          response_format: { type: 'json_object' },
          temperature: 0.2
        })
      });

      if (groqResponse.ok) {
        const groqData = await groqResponse.json();
        const content = groqData.choices?.[0]?.message?.content;
        if (content) {
          const parsed = JSON.parse(content);
          return { data: parsed, provider: 'groq' };
        }
      } else {
        console.warn(`[Speaking AI Failover] Groq responded with status ${groqResponse.status}.`);
      }
    } catch (err) {
      console.warn(`[Speaking AI Failover] Groq error (${err.message}).`);
    }
  }

  return null;
}

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  const { promptId = 's1', transcript = '' } = req.body || {};
  const currentPrompt = SPEAKING_QUESTIONS.find((p) => p.id === promptId) || SPEAKING_QUESTIONS[0];

  const systemInstruction = `You are a certified Goethe-Zertifikat A1 and ÖSD Zertifikat A1 speaking examiner evaluating a beginner German learner's spoken response.
Evaluate the transcribed response strictly against the CEFR A1 Speaking Rubric across 4 dimensions:
1. Task Relevance (30% weight, 0 to 3)
2. Grammar & Syntax (30% weight, 0 to 3)
3. A1 Vocabulary (25% weight, 0 to 3)
4. Response Completeness (15% weight, 0 to 3)

Score Scale per dimension:
- 0: No meaningful response or off-topic.
- 1: Significant difficulties, fragmented words.
- 2: Understandable with minor grammatical/lexical errors.
- 3: Clear, relevant, and accurate A1 response.

IMPORTANT: Do NOT penalize slight transcription artifacts or minor accent phonetic spellings. Calculate the normalized overall score between 0.0 and 3.0.`;

  const schemaDescription = `{
  "score": 2.5,
  "dimensions": {
    "task_relevance": { "score": 3, "feedback": "Brief feedback" },
    "grammar": { "score": 2, "feedback": "Brief feedback" },
    "vocabulary": { "score": 3, "feedback": "Brief feedback" },
    "completeness": { "score": 2, "feedback": "Brief feedback" }
  },
  "transcription": "${transcript.replace(/"/g, '\\"')}",
  "strengths": ["Strength 1"],
  "improvements": ["Improvement 1"],
  "encouragement": "Encouraging German closing phrase"
}`;

  const userPrompt = `
Task Prompt (German): "${currentPrompt.promptGerman}"
Task Prompt (English): "${currentPrompt.promptEnglish}"
Model Expected Answer: "${currentPrompt.modelResponse}"

Learner Transcribed Spoken Response: "${transcript || '(No speech recorded)'}"
`;

  // Multi-Provider Call with Groq Failover
  const aiResult = await callSpeakingAIWithGroqFallback({
    systemInstruction,
    userPrompt,
    schemaDescription,
  });

  if (aiResult && aiResult.data) {
    const raw = aiResult.data.evaluation || aiResult.data;

    // Calculate or extract score
    let score = raw.score ?? raw.normalized_overall_score;
    if (typeof score !== 'number' && raw.scores) {
      const s = raw.scores;
      score =
        (s.task_relevance || 0) * 0.3 +
        (s.grammar_syntax || s.grammar || 0) * 0.3 +
        (s.a1_vocabulary || s.vocabulary || 0) * 0.25 +
        (s.response_completeness || s.completeness || 0) * 0.15;
    }
    score = typeof score === 'number' ? Math.round(score * 10) / 10 : 2.5;

    // Dimensions
    const scores = raw.scores || {};
    const dims = raw.dimensions || {
      task_relevance: {
        score: scores.task_relevance ?? 3,
        feedback: 'Directly addresses the task prompt.',
      },
      grammar: {
        score: scores.grammar_syntax ?? scores.grammar ?? 3,
        feedback: 'Appropriate A1 word order.',
      },
      vocabulary: {
        score: scores.a1_vocabulary ?? scores.vocabulary ?? 3,
        feedback: 'Relevant A1 vocabulary used.',
      },
      completeness: {
        score: scores.response_completeness ?? scores.completeness ?? 3,
        feedback: 'Complete sentence structure.',
      },
    };

    const strengths =
      Array.isArray(raw.strengths) && raw.strengths.length > 0
        ? raw.strengths
        : ['Clear A1 sentence structure', 'Addressed the prompt directly'];

    const improvements =
      Array.isArray(raw.improvements) && raw.improvements.length > 0
        ? raw.improvements
        : score < 3
        ? ['Expand with an additional detail or polite particle (bitte / danke)']
        : ['Continue maintaining this strong sentence flow'];

    return res.status(200).json({
      ...raw,
      score,
      dimensions: dims,
      strengths,
      improvements,
      feedback: raw.feedback || 'Good spoken response.',
      provider: aiResult.provider,
    });
  }

  // Tertiary Fallback: Predefined deterministic local rubric
  const localEval = evaluateSpeakingLocally(promptId, transcript);
  return res.status(200).json({
    ...localEval,
    isFallback: true,
    provider: 'local_rubric',
    notice: "Evaluated using predefined local CEFR A1 rubric (Gemini/Groq unavailable).",
  });
}

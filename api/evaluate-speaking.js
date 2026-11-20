import { evaluateSpeakingLocally } from '../src/utils/speakingRubric.js';
import { SPEAKING_QUESTIONS } from '../src/data/speakingQuestions.js';

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
  const apiKey = process.env.GEMINI_API_KEY;

  const currentPrompt = SPEAKING_QUESTIONS.find((p) => p.id === promptId) || SPEAKING_QUESTIONS[0];

  // If no Gemini API key is configured or offline, evaluate via local rubric engine
  if (!apiKey || apiKey === 'your_gemini_api_key_here') {
    const localEval = evaluateSpeakingLocally(promptId, transcript);
    return res.status(200).json({
      ...localEval,
      isFallback: true,
      notice: "Evaluated using predefined local CEFR A1 rubric (GEMINI_API_KEY not configured).",
    });
  }

  try {
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

    const userPrompt = `
Task Prompt (German): "${currentPrompt.promptGerman}"
Task Prompt (English): "${currentPrompt.promptEnglish}"
Model Expected Answer: "${currentPrompt.modelResponse}"

Learner Transcribed Spoken Response: "${transcript || '(No speech recorded)'}"

Respond STRICTLY in JSON format matching this schema:
{
  "score": 2.5,
  "dimensions": {
    "task_relevance": { "score": 3, "feedback": "Brief feedback" },
    "grammar": { "score": 2, "feedback": "Brief feedback" },
    "vocabulary": { "score": 3, "feedback": "Brief feedback" },
    "completeness": { "score": 2, "feedback": "Brief feedback" }
  },
  "transcription": "${transcript.replace(/"/g, '\\"')}",
  "strengths": ["Strength 1", "Strength 2"],
  "improvements": ["Improvement 1"],
  "encouragement": "Encouraging German closing phrase"
}
`;

    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

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

    if (!geminiResponse.ok) {
      throw new Error(`Gemini API returned status ${geminiResponse.status}`);
    }

    const data = await geminiResponse.json();
    const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!candidateText) throw new Error("Empty candidate response");

    const parsed = JSON.parse(candidateText);
    return res.status(200).json(parsed);

  } catch (err) {
    console.error("Speaking evaluation API error:", err.message);
    const localEval = evaluateSpeakingLocally(promptId, transcript);
    return res.status(200).json({
      ...localEval,
      isFallback: true,
      errorNotice: "Gemini API unavailable. Predefined CEFR A1 rubric applied.",
    });
  }
}

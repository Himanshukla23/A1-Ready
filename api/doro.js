import fs from 'node:fs';
import path from 'node:path';

// Helper to safely load local knowledge base
function getKnowledgeContext(topicName = '') {
  try {
    const kbDir = path.join(process.cwd(), 'knowledge-base');
    const vocab = JSON.parse(fs.readFileSync(path.join(kbDir, 'vocabulary.json'), 'utf-8'));
    const grammar = JSON.parse(fs.readFileSync(path.join(kbDir, 'grammar.json'), 'utf-8'));
    const reading = JSON.parse(fs.readFileSync(path.join(kbDir, 'reading.json'), 'utf-8'));

    return { vocab, grammar, reading };
  } catch (err) {
    return null;
  }
}

/**
 * Fallback generator when Gemini API key is missing or unavailable.
 */
function generateFallbackResponse(stage, message, assessmentSummary) {
  if (stage === 'during_assessment') {
    return {
      summary: "Doro Guidance (Rule Explanation)",
      identified_weaknesses: [],
      explanation: `Hello! As your exam companion, I cannot reveal direct solutions (A, B, C, or D) during an active assessment. Look closely at the grammatical signals in the sentence: Masculine nouns end in '-en' in the accusative (einen / den). For strong verbs like 'fahren', the stem vowel changes for 'du' to 'ä' (du fährst).`,
      recommendations: [
        {
          topic: "Independent Problem Solving",
          reason: "Maintains diagnostic integrity during active test.",
          practice_activity: "Examine the grammatical gender (der/die/das) and determine which case the verb requires."
        }
      ],
      encouragement: "You can do this! Trust your A1 preparation and eliminate the least logical options."
    };
  }

  // After assessment fallback
  const weakTopics = assessmentSummary?.incorrectTopics || ["Accusative & Articles", "Reading Comprehension"];
  return {
    summary: "Doro Learning Advisory & Analysis",
    identified_weaknesses: weakTopics,
    explanation: `You completed the diagnostic with ${assessmentSummary?.score || 0} of 12 points (${assessmentSummary?.percentage || 0}%). Your main focus areas: ${weakTopics.join(', ')}. For CEFR A1, mastering accusative endings and scanning notices for time conditions are critical for a passing grade.`,
    recommendations: [
      {
        topic: "Accusative Training (der -> den / ein -> einen)",
        reason: "Most frequent point deduction in Goethe and ÖSD grammar tasks.",
        practice_activity: "Write 5 sentences using verbs that require accusative: kaufen, haben, brauchen, trinken."
      },
      {
        topic: "Signal Words in Reading Notices",
        reason: "Ensures accurate comprehension of signs, schedules, and emails.",
        practice_activity: "Look specifically for keywords like 'geschlossen', 'geöffnet von... bis...', and 'Samstag/Sonntag'."
      }
    ],
    encouragement: "A focused 1-2 week review of these topics will position you confidently for your official examination!"
  };
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

  const {
    stage = 'during_assessment',
    message = '',
    currentQuestionTopic = '',
    assessmentSummary = null,
  } = req.body || {};

  const apiKey = process.env.GEMINI_API_KEY;

  // If no Gemini API key is provided, use structured fallback
  if (!apiKey || apiKey === 'your_gemini_api_key_here') {
    const fallback = generateFallbackResponse(stage, message, assessmentSummary);
    return res.status(200).json({
      ...fallback,
      isFallback: true,
      notice: "Response generated from curated local knowledge base (GEMINI_API_KEY not configured)."
    });
  }

  try {
    const knowledge = getKnowledgeContext(currentQuestionTopic);

    // Build system prompt based on assessment stage
    let systemInstruction = `You are Doro, a friendly, encouraging, and highly competent German A1 tutor specializing in Goethe-Zertifikat A1 (Start Deutsch 1) and ÖSD Zertifikat A1 preparation. Answer in clear English with German examples and explanations to make learning intuitive for beginners.`;

    if (stage === 'during_assessment') {
      systemInstruction += `
CRITICAL INTEGRITY RULE: The learner is CURRENTLY taking the active 12-question diagnostic assessment.
- You MAY explain German grammar rules, vocabulary concepts, sentence structure, or word meanings in friendly, encouraging English with German examples.
- You MUST NEVER give away the direct answer to any question or tell them which letter (A, B, C, D) is correct.
- If they ask: "What is the answer to question X?", politely refuse: "I cannot give away direct test answers during the assessment, but I would be glad to explain the underlying grammar rule!"
- Active Topic Context: ${currentQuestionTopic || 'General German A1'}`;
    } else {
      systemInstruction += `
The learner has COMPLETED the diagnostic assessment.
- Assessment Score: ${assessmentSummary?.score || 0} / 12 (${assessmentSummary?.percentage || 0}%)
- Weak Skills: ${(assessmentSummary?.weakSkills || []).join(', ')}
- Missed Topics: ${(assessmentSummary?.incorrectTopics || []).join(', ')}
- Your goal: Break down mistakes pedagogically in English, explain why their chosen German answer was incorrect, reinforce the correct grammar/lexical rule with simple examples, and recommend specific study activities.`;
    }

    const promptText = `
User Query: "${message || 'Can you explain my mistakes and the most important rules to review?'}"
${currentQuestionTopic ? `Topic: ${currentQuestionTopic}` : ''}

Respond STRICTLY in valid JSON matching this schema:
{
  "summary": "Brief encouraging summary of the concept or feedback (1-2 sentences)",
  "identified_weaknesses": ["Topic 1", "Topic 2"],
  "explanation": "Clear, friendly pedagogical explanation with German examples and English translations",
  "recommendations": [
    {
      "topic": "Specific German topic",
      "reason": "Why this matters for Goethe/ÖSD A1",
      "practice_activity": "Concrete actionable drill"
    }
  ],
  "encouragement": "Warm motivational closing phrase"
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
              { text: promptText }
            ]
          }
        ],
        generationConfig: {
          responseMimeType: "application/json",
          temperature: 0.4
        }
      })
    });

    if (!geminiResponse.ok) {
      throw new Error(`Gemini API returned status ${geminiResponse.status}`);
    }

    const data = await geminiResponse.json();
    const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!candidateText) {
      throw new Error("Empty candidate response from Gemini API");
    }

    const parsedJson = JSON.parse(candidateText);
    return res.status(200).json(parsedJson);

  } catch (error) {
    console.error("Doro API error:", error.message);
    // Graceful fallback on API error
    const fallback = generateFallbackResponse(stage, message, assessmentSummary);
    return res.status(200).json({
      ...fallback,
      isFallback: true,
      errorNotice: "Gemini API temporarily unavailable. Predefined curated A1 guidance provided."
    });
  }
}

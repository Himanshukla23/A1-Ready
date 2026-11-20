import fs from 'node:fs';
import path from 'node:path';

// Helper to safely load local knowledge base
function getKnowledgeContext(topicName = '') {
  try {
    const kbDir = path.join(process.cwd(), 'knowledge-base');
    const vocab = JSON.parse(fs.readFileSync(path.join(kbDir, 'vocabulary.json'), 'utf-8'));
    const grammar = JSON.parse(fs.readFileSync(path.join(kbDir, 'grammar.json'), 'utf-8'));
    const reading = JSON.parse(fs.readFileSync(path.join(kbDir, 'reading.json'), 'utf-8'));
    let listening = null;
    try {
      listening = JSON.parse(fs.readFileSync(path.join(kbDir, 'listening.json'), 'utf-8'));
    } catch (e) {}

    return { vocab, grammar, reading, listening };
  } catch (err) {
    return null;
  }
}

/**
 * Fallback generator when both Gemini and Groq are unavailable or unconfigured.
 */
function generateFallbackResponse(stage, message, assessmentSummary) {
  if (stage === 'during_assessment') {
    const lower = (message || '').toLowerCase();
    if (lower.includes('hello') || lower.includes('hi') || lower.includes('hallo') || lower.includes('hey')) {
      return {
        summary: "Doro Greeting & Introduction",
        identified_weaknesses: [],
        explanation: "Hallo! I am Doro, your German A1 exam companion. How can I help you today? You can ask me to explain grammar rules, clarify vocabulary meanings, or guide your sentence structure. (During the active test, I guide your reasoning without revealing direct answers!)",
        recommendations: [
          {
            topic: "General A1 Test Strategy",
            reason: "Builds confidence during the diagnostic assessment.",
            practice_activity: "Identify key words (Signalwörter) in the task before selecting your option."
          }
        ],
        encouragement: "Viel Erfolg! Ask me about any rule or vocabulary item anytime."
      };
    }

    return {
      summary: "Doro Guidance (Rule Explanation)",
      identified_weaknesses: [],
      explanation: `As your exam companion, I cannot reveal direct solutions (A, B, C, or D) during an active assessment. Look closely at the grammatical signals: Masculine nouns end in '-en' in the accusative (einen / den). For strong verbs like 'fahren', the stem vowel changes for 'du' to 'ä' (du fährst).`,
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

/**
 * Calls Gemini API as primary, with automatic fallback to Groq if Gemini fails or tokens are exhausted.
 */
async function callLLMWithGroqFallback({ systemInstruction, promptText, schemaDescription }) {
  const geminiApiKey = process.env.GEMINI_API_KEY;
  const groqApiKey = process.env.GROQ_API_KEY;

  // 1. Try Gemini API first (Primary)
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
                { text: promptText }
              ]
            }
          ],
          generationConfig: {
            responseMimeType: "application/json",
            temperature: 0.3
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
        console.warn(`[AI Failover] Gemini API responded with status ${geminiResponse.status}. Attempting Groq fallback...`);
      }
    } catch (err) {
      console.warn(`[AI Failover] Gemini error (${err.message}). Attempting Groq fallback...`);
    }
  }

  // 2. Try Groq API second (Failover Provider)
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
              content: promptText
            }
          ],
          response_format: { type: 'json_object' },
          temperature: 0.3
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
        console.warn(`[AI Failover] Groq API responded with status ${groqResponse.status}.`);
      }
    } catch (err) {
      console.warn(`[AI Failover] Groq error (${err.message}).`);
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

  const {
    stage = 'during_assessment',
    message = '',
    currentQuestionTopic = '',
    assessmentSummary = null,
  } = req.body || {};

  // Build system prompt based on assessment stage
  let systemInstruction = `You are Doro, a friendly, encouraging, and highly competent German A1 tutor specializing in Goethe-Zertifikat A1 (Start Deutsch 1) and ÖSD Zertifikat A1 preparation. Answer in clear English with German examples and explanations to make learning intuitive for beginners.`;

  if (stage === 'during_assessment') {
    systemInstruction += `
CRITICAL INTEGRITY & CONVERSATIONAL RULES: The learner is CURRENTLY taking the active 12-task diagnostic assessment.
- If the user sends a greeting (e.g. "hello", "hi", "hey", "guten tag"): Respond with a warm, natural greeting (e.g., "Hallo! Schön, dich zu sehen! I'm Doro, your German A1 exam companion..."), briefly introduce how you can help, and invite them to ask about grammar rules, vocabulary, or speaking tips. For greetings, recommendations can be empty [] or a quick motivational tip.
- If the user asks about German grammar, vocabulary, pronunciation, sentence order, or test formats: Provide a dynamic, friendly pedagogical explanation tailored specifically to their query with German examples and English translations.
- If they ask for the direct test answer (e.g. "What is the answer?", "Is it A or B?"): Gently explain: "I cannot reveal direct test answers during the assessment, but I can explain the underlying rule so you can solve it yourself!"
- Do NOT repeat canned template text. Always respond directly to what the user actually said.
- Active Topic Context: ${currentQuestionTopic || 'General German A1'}`;
  } else {
    systemInstruction += `
The learner has COMPLETED the diagnostic assessment.
- Assessment Score: ${assessmentSummary?.score || 0} / 12 (${assessmentSummary?.percentage || 0}%)
- Weak Skills: ${(assessmentSummary?.weakSkills || []).join(', ')}
- Missed Topics: ${(assessmentSummary?.incorrectTopics || []).join(', ')}
- Your goal: Break down mistakes pedagogically in English, explain why their chosen German answer was incorrect, reinforce the correct grammar/lexical rule with simple examples, and recommend specific study activities.`;
  }

  const schemaDescription = `{
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
}`;

  const promptText = `
User Query: "${message || 'Can you explain my mistakes and the most important rules to review?'}"
${currentQuestionTopic ? `Topic: ${currentQuestionTopic}` : ''}
`;

  // Attempt Multi-Provider Execution (Gemini -> Groq -> Local Knowledge Base)
  const aiResult = await callLLMWithGroqFallback({
    systemInstruction,
    promptText,
    schemaDescription,
  });

  if (aiResult && aiResult.data) {
    const raw = aiResult.data;
    let explanationText =
      raw.explanation ||
      raw.doro_response ||
      raw.response ||
      raw.reply ||
      raw.message ||
      raw.content ||
      '';

    // If grammar explanation exists as an object or string, blend it in
    if (raw.grammar_explanation && typeof raw.grammar_explanation === 'object') {
      const parts = [];
      if (raw.grammar_explanation.concept) parts.push(raw.grammar_explanation.concept);
      if (raw.grammar_explanation.the_masculine_rule) parts.push(raw.grammar_explanation.the_masculine_rule);
      if (raw.grammar_explanation.unchanged_genders) parts.push(raw.grammar_explanation.unchanged_genders);
      if (raw.grammar_explanation.rule) parts.push(raw.grammar_explanation.rule);
      if (parts.length > 0) {
        explanationText += (explanationText ? '\n\n' : '') + parts.join('\n');
      }
    } else if (typeof raw.grammar_explanation === 'string') {
      explanationText += (explanationText ? '\n\n' : '') + raw.grammar_explanation;
    }

    // If structured examples array exists, format them beautifully
    if (Array.isArray(raw.examples) && raw.examples.length > 0) {
      const exStr = raw.examples
        .map((ex) => {
          if (typeof ex === 'string') return `• ${ex}`;
          return `• ${ex.german || ''} — ${ex.english || ''}${ex.note ? ` (${ex.note})` : ''}`;
        })
        .join('\n');
      explanationText += '\n\n' + exStr;
    }

    if (!explanationText) {
      explanationText = raw.summary || 'Hallo! I am Doro. How can I assist you with your German preparation today?';
    }

    const summaryText =
      raw.summary ||
      (explanationText.length > 80 ? explanationText.slice(0, 80) + '...' : explanationText);

    const normalizedRecs = Array.isArray(raw.recommendations)
      ? raw.recommendations.map((r) =>
          typeof r === 'string' ? { topic: r, practice_activity: '' } : r
        )
      : [];

    return res.status(200).json({
      ...raw,
      summary: summaryText,
      explanation: explanationText,
      recommendations: normalizedRecs,
      provider: aiResult.provider, // 'gemini' or 'groq'
    });
  }

  // Tertiary Fallback: Curated local knowledge-base
  const fallback = generateFallbackResponse(stage, message, assessmentSummary);
  return res.status(200).json({
    ...fallback,
    isFallback: true,
    provider: 'local_knowledge_base',
    notice: "Response generated from curated local knowledge base (Gemini/Groq unavailable).",
  });
}

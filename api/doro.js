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
      summary: "Doro Hinweis (Allgemeine Regelerklärung)",
      identified_weaknesses: [],
      explanation: `Hallo! Als Prüfungstutor darf ich während des laufenden Tests keine direkten Lösungen (A, B, C oder D) verraten. Achten Sie auf die grammatikalischen Signale im Satz: Maskuline Nomen enden im Akkusativ auf '-en' (einen / den). Bei unregelmäßigen Verben wie 'fahren' wechselt der Stammvokal bei 'du' zu 'ä' (du fährst).`,
      recommendations: [
        {
          topic: "Selbstständiges Erschließen",
          reason: "Prüfungsintegrität während des aktiven Tests.",
          practice_activity: "Lesen Sie die Optionen aufmerksam und prüfen Sie das Geschlecht (der/die/das) des Nomens."
        }
      ],
      encouragement: "Sie schaffen das! Vertrauen Sie auf Ihr A1-Wissen und wählen Sie die logischste Option."
    };
  }

  // After assessment fallback
  const weakTopics = assessmentSummary?.incorrectTopics || ["Akkusativ und Artikel", "Leseverstehen"];
  return {
    summary: "Doro Lernberatung & Analyse",
    identified_weaknesses: weakTopics,
    explanation: `Sie haben die Diagnose mit ${assessmentSummary?.score || 0} von 12 Punkten abgeschlossen (${assessmentSummary?.percentage || 0}%). Ihre Hauptschwerpunkte liegen in den Bereichen: ${weakTopics.join(', ')}. Im A1-Bereich sind die Artikel im Akkusativ sowie das genaue Lesen von Uhrzeiten und Ausnahmen in Schildern entscheidend.`,
    recommendations: [
      {
        topic: "Akkusativ-Training (der -> den / einen)",
        reason: "Häufigster Fehlerpunkt in A1 Grammatikprüfungen.",
        practice_activity: "Bilden Sie 5 Sätze mit Verben, die den Akkusativ fordern: kaufen, haben, brauchen, trinken."
      },
      {
        topic: "Signalwörter in Lesetexten",
        reason: "Wichtige Informationen in Schildern und E-Mails sicher erfassen.",
        practice_activity: "Achten Sie gezielt auf Wörter wie 'geschlossen', 'geöffnet von... bis...' und 'Samstag/Sonntag'."
      }
    ],
    encouragement: "Eine gezielte Wiederholung dieser Regeln bringt Sie in 1-2 Wochen auf ein sicheres Prüfungsniveau!"
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
      notice: "Antwort wurde offline über die kuratierte Wissensbasis generiert (GEMINI_API_KEY nicht konfiguriert)."
    });
  }

  try {
    const knowledge = getKnowledgeContext(currentQuestionTopic);

    // Build system prompt based on assessment stage
    let systemInstruction = `You are Doro, a friendly, encouraging, and highly competent German A1 tutor specializing in Goethe-Zertifikat A1 (Start Deutsch 1) and ÖSD Zertifikat A1 preparation.`;

    if (stage === 'during_assessment') {
      systemInstruction += `
CRITICAL INTEGRITY RULE: The learner is CURRENTLY taking the active 12-question diagnostic assessment.
- You MAY explain German grammar rules, vocabulary concepts, sentence structure, or word meanings in friendly, encouraging German and English.
- You MUST NEVER give away the direct answer to any question or tell them which letter (A, B, C, D) is correct.
- If they ask: "What is the answer to question X?", politely refuse: "Ich darf während des Tests die Lösung nicht verraten, aber ich erkläre dir gern die Grammatikregel dazu!"
- Active Topic Context: ${currentQuestionTopic || 'General German A1'}`;
    } else {
      systemInstruction += `
The learner has COMPLETED the diagnostic assessment.
- Assessment Score: ${assessmentSummary?.score || 0} / 12 (${assessmentSummary?.percentage || 0}%)
- Weak Skills: ${(assessmentSummary?.weakSkills || []).join(', ')}
- Missed Topics: ${(assessmentSummary?.incorrectTopics || []).join(', ')}
- Your goal: Break down mistakes pedagogically, explain why their chosen answer was incorrect, reinforce the correct grammar/lexical rule with simple examples, and recommend specific study activities.`;
    }

    const promptText = `
User Query: "${message || 'Kannst du mir meine Fehler und die wichtigsten Regeln erklären?'}"
${currentQuestionTopic ? `Topic: ${currentQuestionTopic}` : ''}

Respond STRICTLY in valid JSON matching this schema:
{
  "summary": "Brief encouraging summary of the concept or feedback (1-2 sentences)",
  "identified_weaknesses": ["Topic 1", "Topic 2"],
  "explanation": "Clear, friendly pedagogical explanation with German examples and English translations where helpful",
  "recommendations": [
    {
      "topic": "Specific German topic",
      "reason": "Why this matters for Goethe/ÖSD A1",
      "practice_activity": "Concrete actionable drill"
    }
  ],
  "encouragement": "Warm motivational closing phrase in German"
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

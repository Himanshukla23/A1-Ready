/**
 * Doro AI Client Service
 * Bridges client requests with the /api/doro serverless function,
 * and contains client-side fallback resilience if running in a static Vite environment.
 */

export async function askDoro({
  stage = 'during_assessment',
  message = '',
  currentQuestionTopic = '',
  assessmentSummary = null,
}) {
  try {
    const response = await fetch('/api/doro', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        stage,
        message,
        currentQuestionTopic,
        assessmentSummary,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    }
    throw new Error(`Server returned status ${response.status}`);
  } catch (err) {
    console.warn("Client fallback activated for Doro AI:", err.message);

    // Client-side fallback if serverless endpoint is not hosted locally
    if (stage === 'during_assessment') {
      return {
        summary: "Doro Guidance (Active Assessment)",
        identified_weaknesses: [],
        explanation: `Hello! As your exam companion, I cannot reveal direct test answers (A, B, C, or D) while your test is in progress.

💡 Core Grammar Tips:
- Masculine nouns take the ending '-en' in the accusative (der Tisch -> einen / den Tisch). Feminine and neuter nouns do not change!
- For strong verbs like 'fahren', the stem vowel changes for 'du' to 'ä' (du fährst).
- For separable verbs, the prefix always moves to the end of the clause (z.B. 'hört ... auf').`,
        recommendations: [
          {
            topic: currentQuestionTopic || "A1 Grammar & Vocabulary Patterns",
            reason: "Promote independent reasoning during the diagnostic.",
            practice_activity: "Identify the grammatical gender (der/die/das) and check whether the verb requires the accusative case.",
          },
        ],
        encouragement: "Stay focused! You have the foundation to solve this step by step.",
        isClientFallback: true,
      };
    }

    const weakTopics = assessmentSummary?.incorrectTopics || ["Accusative Case", "Reading Comprehension"];
    return {
      summary: "Doro Post-Assessment Review & Plan",
      identified_weaknesses: weakTopics,
      explanation: `Congratulations on completing your diagnostic! You scored ${assessmentSummary?.score || 0} of 12 points (${assessmentSummary?.percentage || 0}%).

Key focus areas for Goethe / ÖSD A1:
1. Accusative articles: Remember that ONLY masculine nouns change (der -> den, ein -> einen).
2. Reading comprehension: Look closely for signal words such as 'geschlossen' (closed), 'Werktags' (weekdays), or 'ausnahmsweise' (exceptionally).
3. Modal verbs: 'ich kann' and 'er/sie/es kann' have no personal endings in singular.`,
      recommendations: [
        {
          topic: "Accusative & Noun Genders",
          reason: "Essential for both written and speaking sections of the exam.",
          practice_activity: "Always learn German nouns with their definite article: der Kaffee, das Brot, die Suppe.",
        },
        {
          topic: "Public Signs & Schedule Reading",
          reason: "Most common area where exam candidates lose easy marks.",
          practice_activity: "Practice highlighting opening hours, days of the week, and negative rules (e.g. 'Keine Haustiere').",
        },
      ],
      encouragement: "With 1-2 weeks of focused practice on these specific areas, you will be in great shape for your exam!",
      isClientFallback: true,
    };
  }
}

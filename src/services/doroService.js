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
        summary: "Doro Hinweis (Laufender Test)",
        identified_weaknesses: [],
        explanation: `Hallo! Als Prüfungstutor darf ich während des laufenden Tests keine direkten Lösungen (A, B, C oder D) verraten. 

💡 Regel-Tipp:
- Maskuline Nomen enden im Akkusativ auf '-en' (der Tisch -> einen/den Tisch).
- Bei unregelmäßigen Verben wie 'fahren' wechselt der Vokal bei 'du' zu 'ä' (du fährst).
- Bei trennbaren Verben steht das Präfix am Satzende (hört ... auf).`,
        recommendations: [
          {
            topic: currentQuestionTopic || "A1 Grammatik- & Wortschatzregeln",
            reason: "Selbstständiges Erschließen von Prüfungsfragen.",
            practice_activity: "Achten Sie auf das grammatikalische Geschlecht und den Fall im Satz.",
          },
        ],
        encouragement: "Bleiben Sie dran! Sie schaffen das mit Ruhe und Systematik.",
        isClientFallback: true,
      };
    }

    const weakTopics = assessmentSummary?.incorrectTopics || ["Akkusativ", "Leseverstehen"];
    return {
      summary: "Doro Lernberatung & Nachbesprechung",
      identified_weaknesses: weakTopics,
      explanation: `Glückwunsch zum Abschluss der Diagnose! Sie haben ${assessmentSummary?.score || 0} von 12 Punkten (${assessmentSummary?.percentage || 0}%) erreicht.

Schwerpunkte für Goethe/ÖSD A1:
1. Akkusativ-Artikel sicher anwenden (den/einen nur bei maskulinen Nomen!).
2. Lesestrategie: Signalwörter wie 'geschlossen', 'Gleisänderung' oder Wochentage genau prüfen.
3. Modalverben: 'ich kann' und 'er kann' haben keine Personalendung im Singular.`,
      recommendations: [
        {
          topic: "Akkusativ & Nomen-Genus",
          reason: "Grundvoraussetzung für die Schreib- und Sprechteile der Prüfung.",
          practice_activity: "Lernen Sie jedes Nomen IMMER mit Artikel: der Kaffee, das Brot, die Suppe.",
        },
        {
          topic: "Leseverstehen Schilder & Hinweise",
          reason: "Häufigste Fehlerquelle bei Zeit- und Ortsangaben.",
          practice_activity: "Prüfen Sie immer die Wochentage und Ausnahmen in A1-Texten.",
        },
      ],
      encouragement: "Mit 1-2 Wochen gezieltem Üben dieser Punkte sind Sie bestens für die offizielle Prüfung vorbereitet!",
      isClientFallback: true,
    };
  }
}

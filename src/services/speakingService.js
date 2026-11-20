import { evaluateSpeakingLocally } from '../utils/speakingRubric.js';

/**
 * Speaking Evaluation Client Service
 * Dispatches spoken response transcripts to the /api/evaluate-speaking serverless function,
 * and falls back to deterministic local rubric evaluation if running offline.
 */
export async function evaluateSpeakingResponse({ promptId, transcript }) {
  try {
    const response = await fetch('/api/evaluate-speaking', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        promptId,
        transcript,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    }
    throw new Error(`Server returned status ${response.status}`);
  } catch (err) {
    console.warn("Using local speaking rubric fallback:", err.message);
    const localResult = evaluateSpeakingLocally(promptId, transcript);
    return {
      ...localResult,
      isLocalFallback: true,
    };
  }
}

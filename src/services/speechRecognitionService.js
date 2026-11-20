/**
 * Browser Speech Recognition & Synthesis Service
 * Provides STT (Speech-to-Text) using Web Speech API with microphone permission handling,
 * and TTS (Text-to-Speech) using browser SpeechSynthesis for German voice output.
 */

export function isSpeechRecognitionSupported() {
  if (typeof window === 'undefined') return false;
  return Boolean(window.SpeechRecognition || window.webkitSpeechRecognition);
}

export function isSpeechSynthesisSupported() {
  if (typeof window === 'undefined') return false;
  return Boolean(window.speechSynthesis);
}

/**
 * Start a SpeechRecognition session.
 *
 * @param {object} callbacks
 * @param {function} callbacks.onResult - Called with live and final transcript strings
 * @param {function} callbacks.onError - Called on mic or recognition errors
 * @param {function} callbacks.onEnd - Called when recognition stops
 * @returns {object} Recognition instance with stop() control
 */
export function startSpeechRecognition({ onResult, onError, onEnd, lang = 'de-DE' }) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    if (onError) onError(new Error("Web Speech API is not supported in this browser."));
    return null;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = lang;
  recognition.interimResults = true;
  recognition.continuous = true;
  recognition.maxAlternatives = 1;

  recognition.onresult = (event) => {
    let finalTranscript = '';
    let interimTranscript = '';

    for (let i = event.resultIndex; i < event.results.length; ++i) {
      const part = event.results[i][0].transcript;
      if (event.results[i].isFinal) {
        finalTranscript += part;
      } else {
        interimTranscript += part;
      }
    }

    if (onResult) {
      onResult({
        finalTranscript: finalTranscript.trim(),
        interimTranscript: interimTranscript.trim(),
        fullTranscript: (finalTranscript + ' ' + interimTranscript).trim(),
      });
    }
  };

  recognition.onerror = (event) => {
    console.warn("Speech recognition error:", event.error);
    if (onError) onError(event);
  };

  recognition.onend = () => {
    if (onEnd) onEnd();
  };

  try {
    recognition.start();
  } catch (err) {
    if (onError) onError(err);
  }

  return recognition;
}

/**
 * Speak German text using browser SpeechSynthesis.
 *
 * @param {string} text - German text to speak
 * @param {object} options
 */
export function speakGermanText(text, { onEnd, onError } = {}) {
  if (!isSpeechSynthesisSupported()) {
    if (onError) onError(new Error("Speech synthesis not supported."));
    return;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'de-DE';
  utterance.rate = 0.9; // Slightly slower, clear for A1 learners

  // Attempt to select a natural German voice if available
  const voices = window.speechSynthesis.getVoices();
  const germanVoice = voices.find((v) => v.lang.startsWith('de') || v.lang.startsWith('de-'));
  if (germanVoice) {
    utterance.voice = germanVoice;
  }

  if (onEnd) utterance.onend = onEnd;
  if (onError) utterance.onerror = onError;

  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking() {
  if (isSpeechSynthesisSupported()) {
    window.speechSynthesis.cancel();
  }
}

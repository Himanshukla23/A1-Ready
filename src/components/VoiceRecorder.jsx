import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  Square,
  RotateCcw,
  Volume2,
  Edit3,
  Check,
  AlertCircle,
  Radio,
} from 'lucide-react';
import {
  isSpeechRecognitionSupported,
  startSpeechRecognition,
} from '../services/speechRecognitionService.js';

export default function VoiceRecorder({
  questionId,
  transcript = '',
  onTranscriptChange,
  isEvaluating = false,
}) {
  const [isRecording, setIsRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [manualMode, setManualMode] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const recognitionRef = useRef(null);
  const timerRef = useRef(null);
  const isMountedRef = useRef(true);

  const supported = isSpeechRecognitionSupported();

  // Clean up any active recording session when question changes or component unmounts
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (e) {
          // ignore abort error
        }
        recognitionRef.current = null;
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [questionId]);

  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      setSeconds(0);
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRecording]);

  const startRecording = () => {
    setErrorMsg('');
    if (!supported) {
      setManualMode(true);
      setErrorMsg("Microphone voice recognition is not supported in this browser. You can type your response below.");
      return;
    }

    // Stop any existing instance first
    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch (e) {}
      recognitionRef.current = null;
    }

    try {
      const rec = startSpeechRecognition({
        lang: 'de-DE',
        onResult: ({ fullTranscript }) => {
          if (isMountedRef.current && onTranscriptChange) {
            onTranscriptChange(fullTranscript);
          }
        },
        onError: (err) => {
          console.warn("Recognition error:", err);
          if (!isMountedRef.current) return;
          if (err.error === 'not-allowed') {
            setErrorMsg("Microphone access was denied. Please allow microphone permission in your browser or type your response.");
            setManualMode(true);
          } else {
            setErrorMsg(`Voice input: ${err.error || 'Microphone error'}. You can type your response below.`);
          }
          stopRecording();
        },
        onEnd: () => {
          if (isMountedRef.current) {
            setIsRecording(false);
          }
        },
      });

      recognitionRef.current = rec;
      setIsRecording(true);
    } catch (err) {
      setErrorMsg("Could not start microphone. You can type your response below.");
      setManualMode(true);
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        // Ignore stop on stopped
      }
      recognitionRef.current = null;
    }
    if (isMountedRef.current) {
      setIsRecording(false);
    }
  };

  const clearTranscript = () => {
    stopRecording();
    if (onTranscriptChange) onTranscriptChange('');
  };

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${rem < 10 ? '0' : ''}${rem}`;
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 space-y-4">
      {/* Top Controls & Audio Visualizer */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {isRecording ? (
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={stopRecording}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm shadow-md shadow-rose-600/30 transition animate-pulse"
              >
                <Square className="w-4 h-4 fill-white" />
                <span>Stop Recording</span>
              </button>

              {/* Soundwave visualizer bars */}
              <div className="flex items-center gap-1 px-3 py-2 rounded-xl bg-rose-50 border border-rose-200">
                <span className="w-1.5 bg-rose-600 rounded-full animate-wave-1"></span>
                <span className="w-1.5 bg-rose-500 rounded-full animate-wave-2"></span>
                <span className="w-1.5 bg-rose-600 rounded-full animate-wave-3"></span>
                <span className="w-1.5 bg-rose-500 rounded-full animate-wave-4"></span>
                <span className="w-1.5 bg-rose-600 rounded-full animate-wave-5"></span>
                <span className="ml-2 font-mono text-xs font-bold text-rose-700">
                  {formatTime(seconds)} <span className="text-rose-400 font-normal">/ 00:30</span>
                </span>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={startRecording}
              disabled={isEvaluating}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 disabled:bg-slate-300 text-white font-bold text-sm shadow-md shadow-sky-600/20 transition transform active:scale-95"
            >
              <Mic className="w-4 h-4" />
              <span>{transcript ? 'Re-Record Voice' : 'Start Recording'}</span>
            </button>
          )}

          {transcript && !isRecording && (
            <button
              type="button"
              onClick={clearTranscript}
              disabled={isEvaluating}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-lg transition"
              title="Clear recording"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={() => setManualMode(!manualMode)}
          className="text-xs font-semibold text-slate-500 hover:text-slate-800 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition"
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>{manualMode ? 'Hide Text Editor' : 'Type or Edit Response'}</span>
        </button>
      </div>

      {/* Error alert if any */}
      {errorMsg && (
        <div className="flex items-start gap-2 p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Live Voice Transcript Display */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 min-h-[90px] shadow-xs">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            {isRecording ? (
              <span className="flex items-center gap-1.5 text-xs font-bold text-rose-600">
                <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping"></span>
                <span>Listening in German (de-DE)...</span>
              </span>
            ) : (
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Recorded Response Transcript
              </span>
            )}
          </div>

          {transcript && !isRecording && (
            <span className="text-xs text-emerald-700 font-semibold inline-flex items-center gap-1 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
              <Check className="w-3.5 h-3.5" />
              <span>Voice Captured</span>
            </span>
          )}
        </div>

        {manualMode ? (
          <textarea
            value={transcript}
            onChange={(e) => onTranscriptChange(e.target.value)}
            placeholder="Type your German response here (e.g. 'Hallo, ich heiße...')"
            rows={3}
            className="w-full text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-sky-500 bg-slate-50 p-2.5 rounded-lg border border-slate-200"
          />
        ) : (
          <p className="text-sm text-slate-800 leading-relaxed font-medium">
            {transcript || (
              <span className="text-slate-400 italic">
                {isRecording
                  ? 'Speak clearly in German now...'
                  : 'Click "Start Recording" or "Type or Edit Response" to provide your spoken answer.'}
              </span>
            )}
          </p>
        )}
      </div>
    </div>
  );
}

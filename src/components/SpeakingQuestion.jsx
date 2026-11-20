import React, { useState, useEffect } from 'react';
import { useAssessment } from '../context/AssessmentContext';
import VoiceRecorder from './VoiceRecorder';
import { speakGermanText, stopSpeaking } from '../services/speechRecognitionService.js';
import { evaluateSpeakingResponse } from '../services/speakingService.js';
import {
  Mic,
  Volume2,
  Sparkles,
  CheckCircle2,
  Loader2,
  Cpu,
} from 'lucide-react';

export default function SpeakingQuestion({ question }) {
  const { speakingResponses, setSpeakingResponse } = useAssessment();
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);

  // Stop any playing prompt audio if user switches questions
  useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, [question?.id]);

  if (!question) return null;

  const currentResponse = speakingResponses[question.id] || {
    transcript: '',
    evaluation: null,
  };

  const handleTranscriptChange = (newTranscript) => {
    setSpeakingResponse(question.id, {
      ...currentResponse,
      transcript: newTranscript,
    });
  };

  const handleListenPrompt = () => {
    if (isPlayingAudio) {
      stopSpeaking();
      setIsPlayingAudio(false);
      return;
    }

    setIsPlayingAudio(true);
    speakGermanText(question.promptGerman, {
      onEnd: () => setIsPlayingAudio(false),
      onError: () => setIsPlayingAudio(false),
    });
  };

  const handleEvaluateSpeaking = async () => {
    if (!currentResponse.transcript?.trim() || isEvaluating) return;

    setIsEvaluating(true);
    try {
      const evaluation = await evaluateSpeakingResponse({
        promptId: question.id,
        transcript: currentResponse.transcript,
      });

      setSpeakingResponse(question.id, {
        transcript: currentResponse.transcript,
        evaluation,
        score: evaluation.score,
      });
    } catch (err) {
      console.error("Evaluation error:", err);
    } finally {
      setIsEvaluating(false);
    }
  };

  const evalResult = currentResponse.evaluation;

  const renderProviderBadge = (provider) => {
    if (provider === 'gemini') {
      return (
        <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
          ⚡ Evaluated by Gemini Flash
        </span>
      );
    }
    if (provider === 'groq') {
      return (
        <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
          ⚡ Evaluated by Groq Cloud (Failover)
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-slate-700 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-full">
        <Cpu className="w-3 h-3 text-slate-500" />
        <span>Predefined CEFR Rubric Engine</span>
      </span>
    );
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
      {/* Header with Exam Part & Topic */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
            {question.part}
          </span>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-2">
            {question.topic}
          </h3>
        </div>

        <button
          type="button"
          onClick={handleListenPrompt}
          className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg border transition ${
            isPlayingAudio
              ? 'bg-amber-100 text-amber-900 border-amber-300 animate-pulse'
              : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
          }`}
        >
          <Volume2 className="w-4 h-4 text-amber-600" />
          <span>{isPlayingAudio ? 'Stop German Audio' : 'Listen to Prompt'}</span>
        </button>
      </div>

      {/* Prompt Card */}
      <div className="p-5 rounded-2xl bg-amber-50/50 border border-amber-200/70 space-y-2">
        <p className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
          "{question.promptGerman}"
        </p>
        <p className="text-xs sm:text-sm text-slate-600">
          <strong>English Translation: </strong>
          {question.promptEnglish}
        </p>
        <div className="pt-2 text-xs text-amber-900/80 font-medium">
          💡 <strong>Speaking Tip: </strong> {question.tips}
        </div>
      </div>

      {/* Voice Recorder Component - Isolated per questionId */}
      <VoiceRecorder
        key={question.id}
        questionId={question.id}
        transcript={currentResponse.transcript}
        onTranscriptChange={handleTranscriptChange}
        isEvaluating={isEvaluating}
      />

      {/* Action to Evaluate / Save Response */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <div className="text-xs text-slate-500">
          {evalResult ? (
            <span className="font-semibold text-emerald-700 inline-flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>Evaluated: {evalResult.score} / 3.0 points</span>
            </span>
          ) : (
            <span>Click evaluate to score against the 4 CEFR A1 dimensions.</span>
          )}
        </div>

        <button
          type="button"
          onClick={handleEvaluateSpeaking}
          disabled={!currentResponse.transcript?.trim() || isEvaluating}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm bg-amber-600 hover:bg-amber-700 disabled:bg-slate-300 text-white shadow-sm transition active:scale-95"
        >
          {isEvaluating ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Evaluating Speech...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-amber-200" />
              <span>{evalResult ? 'Re-Evaluate Response' : 'Evaluate Spoken Response'}</span>
            </>
          )}
        </button>
      </div>

      {/* Immediate Rubric Feedback Card (if evaluated) */}
      {evalResult && (
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 animate-in fade-in">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/60 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Rubric Feedback ({evalResult.score} / 3.0)
              </span>
              {renderProviderBadge(evalResult.provider)}
            </div>

            <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
              {evalResult.score >= 2.5
                ? 'Strong A1'
                : evalResult.score >= 1.5
                ? 'Developing A1'
                : 'Needs Work'}
            </span>
          </div>

          {/* 4 Dimension Pills */}
          {evalResult.dimensions && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
              {Object.entries(evalResult.dimensions).map(([key, dim]) => (
                <div key={key} className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-2xs">
                  <p className="text-[11px] font-bold text-slate-500 uppercase">{key.replace('_', ' ')}</p>
                  <p className="text-base font-extrabold text-slate-900 mt-0.5">{dim.score} / 3</p>
                  <p className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">{dim.feedback}</p>
                </div>
              ))}
            </div>
          )}

          {/* Strengths & Improvements */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {evalResult.strengths?.length > 0 && (
              <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 text-emerald-900">
                <strong className="block mb-1 font-bold">Strengths:</strong>
                <ul className="list-disc list-inside space-y-0.5">
                  {evalResult.strengths.map((str, idx) => (
                    <li key={idx}>{str}</li>
                  ))}
                </ul>
              </div>
            )}
            {evalResult.improvements?.length > 0 && (
              <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 text-amber-900">
                <strong className="block mb-1 font-bold">Key Improvement:</strong>
                <ul className="list-disc list-inside space-y-0.5">
                  {evalResult.improvements.map((imp, idx) => (
                    <li key={idx}>{imp}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

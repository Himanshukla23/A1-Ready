import React, { useState } from 'react';
import { useAssessment } from '../context/AssessmentContext';
import { speakGermanText, stopSpeaking } from '../services/speechRecognitionService.js';
import { Headphones, Volume2, Check, Compass, RotateCcw } from 'lucide-react';

export default function ListeningQuestion({ question }) {
  const { answers, selectAnswer } = useAssessment();
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);

  if (!question) return null;

  const selectedOptionId = answers[question.id] || null;

  const handlePlayAudio = () => {
    if (isPlaying) {
      stopSpeaking();
      setIsPlaying(false);
      return;
    }

    setIsPlaying(true);
    setHasPlayed(true);
    speakGermanText(question.audioText, {
      rate: 0.85,
      onEnd: () => setIsPlaying(false),
      onError: () => setIsPlaying(false),
    });
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-violet-700 bg-violet-50 px-2.5 py-1 rounded-md border border-violet-200">
            {question.skillLabel}
          </span>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-2">
            {question.topic}
          </h3>
        </div>
        <span className="text-xs font-medium text-slate-600 bg-slate-100 px-3 py-1 rounded-md">
          {question.instruction}
        </span>
      </div>

      {/* Audio Player Card */}
      <div className="p-5 rounded-2xl bg-gradient-to-br from-violet-50 to-indigo-50 border border-violet-200/70 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-violet-600 text-white flex items-center justify-center shadow-md shadow-violet-600/25">
            <Headphones className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900">German Audio Passage</p>
            <p className="text-xs text-slate-500">Click play to hear the announcement in German</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handlePlayAudio}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm shadow-sm transition active:scale-95 ${
              isPlaying
                ? 'bg-rose-600 hover:bg-rose-700 text-white animate-pulse'
                : 'bg-violet-600 hover:bg-violet-700 text-white'
            }`}
          >
            <Volume2 className="w-4 h-4" />
            <span>{isPlaying ? 'Stop Audio' : hasPlayed ? 'Replay Audio' : 'Play Audio'}</span>
          </button>

          {isPlaying && (
            <div className="flex items-center gap-1 px-3 py-2 rounded-xl bg-white border border-violet-200">
              <span className="w-1.5 bg-violet-600 rounded-full animate-wave-1"></span>
              <span className="w-1.5 bg-violet-500 rounded-full animate-wave-2"></span>
              <span className="w-1.5 bg-violet-600 rounded-full animate-wave-3"></span>
              <span className="w-1.5 bg-violet-500 rounded-full animate-wave-4"></span>
              <span className="w-1.5 bg-violet-600 rounded-full animate-wave-5"></span>
              <span className="ml-2 text-xs font-semibold text-violet-700">Playing...</span>
            </div>
          )}

          {hasPlayed && !isPlaying && (
            <span className="text-xs text-emerald-700 font-semibold inline-flex items-center gap-1 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
              <Check className="w-3.5 h-3.5" />
              Audio Played
            </span>
          )}
        </div>

        {/* Show English translation hint after first play */}
        {hasPlayed && (
          <details className="text-xs text-slate-600 bg-white/80 p-3 rounded-lg border border-violet-200/50">
            <summary className="cursor-pointer font-semibold text-violet-800 hover:text-violet-900">
              Show English Translation (Hint)
            </summary>
            <p className="mt-2 text-slate-700 leading-relaxed italic">
              {question.audioTextEnglish}
            </p>
          </details>
        )}
      </div>

      {/* Question Prompt */}
      <div>
        <p className="text-base sm:text-lg font-semibold text-slate-900 leading-snug">
          {question.question}
        </p>
      </div>

      {/* Multiple-Choice Options */}
      <div className="space-y-3">
        {question.options.map((option, idx) => {
          const isSelected = selectedOptionId === option.id;

          return (
            <button
              key={option.id}
              onClick={() => selectAnswer(question.id, option.id)}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center justify-between group ${
                isSelected
                  ? 'border-violet-600 bg-violet-50/70 shadow-sm ring-1 ring-violet-500'
                  : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/60 bg-white'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <span
                  className={`w-8 h-8 rounded-lg font-bold text-sm flex items-center justify-center transition-colors ${
                    isSelected
                      ? 'bg-violet-600 text-white'
                      : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200'
                  }`}
                >
                  {option.id}
                </span>
                <span
                  className={`text-sm sm:text-base font-medium ${
                    isSelected ? 'text-violet-950 font-semibold' : 'text-slate-800'
                  }`}
                >
                  {option.text}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="hidden sm:inline-block text-[10px] font-mono text-slate-400 opacity-60 group-hover:opacity-100 transition">
                  [{idx + 1}]
                </span>
                {isSelected ? (
                  <div className="w-6 h-6 rounded-full bg-violet-600 text-white flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4 stroke-[2.5]" />
                  </div>
                ) : (
                  <div className="w-6 h-6 rounded-full border border-slate-300 group-hover:border-slate-400 shrink-0"></div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

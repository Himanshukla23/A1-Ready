import React from 'react';
import { useAssessment } from '../context/AssessmentContext';
import { Compass, Check } from 'lucide-react';

export default function QuestionCard({ question }) {
  const { answers, selectAnswer } = useAssessment();

  if (!question) return null;

  const selectedOptionId = answers[question.id] || null;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
      {/* Category & Topic header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4 mb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Topic</span>
          <h3 className="text-sm sm:text-base font-bold text-slate-800">{question.topic}</h3>
        </div>
        <span className="text-xs font-medium text-slate-600 bg-slate-100 px-3 py-1 rounded-md">
          {question.instruction}
        </span>
      </div>

      {/* Reading Passage (if available) */}
      {question.passage && (
        <div className="mb-6 p-4 sm:p-5 rounded-xl bg-amber-50/60 border border-amber-200/80">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-800 uppercase tracking-wider mb-2">
            <Compass className="w-4 h-4 text-amber-600" />
            <span>Reading Passage / Notice (Lesetext)</span>
          </div>
          <div className="whitespace-pre-line text-sm sm:text-base font-medium text-slate-800 leading-relaxed font-sans bg-white/70 p-3.5 rounded-lg border border-amber-200/40">
            {question.passage}
          </div>
        </div>
      )}

      {/* Main Question Prompt */}
      <div className="mb-6">
        <p className="text-base sm:text-lg font-semibold text-slate-900 leading-snug">
          {question.question}
        </p>
      </div>

      {/* Multiple-Choice Options */}
      <div className="space-y-3">
        {question.options.map((option) => {
          const isSelected = selectedOptionId === option.id;

          return (
            <button
              key={option.id}
              onClick={() => selectAnswer(question.id, option.id)}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center justify-between group ${
                isSelected
                  ? 'border-sky-600 bg-sky-50/70 shadow-sm ring-1 ring-sky-500'
                  : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/60 bg-white'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <span
                  className={`w-8 h-8 rounded-lg font-bold text-sm flex items-center justify-center transition-colors ${
                    isSelected
                      ? 'bg-sky-600 text-white'
                      : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200'
                  }`}
                >
                  {option.id}
                </span>
                <span
                  className={`text-sm sm:text-base font-medium ${
                    isSelected ? 'text-sky-950 font-semibold' : 'text-slate-800'
                  }`}
                >
                  {option.text}
                </span>
              </div>

              {isSelected ? (
                <div className="w-6 h-6 rounded-full bg-sky-600 text-white flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4 stroke-[2.5]" />
                </div>
              ) : (
                <div className="w-6 h-6 rounded-full border border-slate-300 group-hover:border-slate-400 shrink-0"></div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

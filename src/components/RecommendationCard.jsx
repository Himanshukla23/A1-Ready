import React from 'react';
import { Target, BookOpen, Sparkles, ArrowRight } from 'lucide-react';
import { useAssessment } from '../context/AssessmentContext';

export default function RecommendationCard({ recommendation, index }) {
  const { toggleDoro } = useAssessment();

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs hover:border-slate-300 transition">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2.5">
          <span className="w-6 h-6 rounded-full bg-sky-100 text-sky-700 font-bold text-xs flex items-center justify-center shrink-0">
            {index + 1}
          </span>
          <h4 className="text-base font-bold text-slate-900">
            {recommendation.topic}
          </h4>
        </div>
        {recommendation.priority === 'high' && (
          <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 shrink-0">
            Hohe Priorität
          </span>
        )}
      </div>

      <div className="text-xs sm:text-sm text-slate-600 mb-3 bg-slate-50 p-3 rounded-xl border border-slate-200/70">
        <strong className="text-slate-800">Grund: </strong>
        {recommendation.reason}
      </div>

      <div className="text-xs sm:text-sm text-slate-700 space-y-1.5 mb-4">
        <div className="flex items-start gap-2">
          <Target className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
          <div>
            <strong className="text-slate-900">Konkrete Übung: </strong>
            <span>{recommendation.practice_activity}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs">
        <span className="text-slate-500 font-medium">
          📖 <strong>Quelle:</strong> {recommendation.resources}
        </span>

        <button
          onClick={toggleDoro}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 hover:text-amber-800 bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-lg border border-amber-200 transition"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Mit Doro AI vertiefen</span>
        </button>
      </div>
    </div>
  );
}

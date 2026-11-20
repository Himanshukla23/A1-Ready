import React from 'react';
import { useAssessment } from '../context/AssessmentContext';
import { BookOpen, Sparkles, CheckCircle2, RotateCcw } from 'lucide-react';

export default function Navbar() {
  const { stage, startAssessment, goToLanding, toggleDoro, doroOpen } = useAssessment();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <button
          onClick={goToLanding}
          className="flex items-center gap-3 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 rounded-lg p-1"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-600 to-sky-800 flex items-center justify-center text-white shadow-md shadow-sky-600/20 group-hover:scale-105 transition-transform">
            <span className="font-black text-sm tracking-wider">A1</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-slate-900 text-lg tracking-tight">ReadyCheck</span>
              <div className="flex h-3 w-5 rounded-sm overflow-hidden shadow-xs border border-slate-300" title="German Flag">
                <div className="w-1/3 bg-black"></div>
                <div className="w-1/3 bg-red-600"></div>
                <div className="w-1/3 bg-amber-400"></div>
              </div>
            </div>
            <p className="text-xs text-slate-500 font-medium">Goethe & ÖSD A1 Diagnostic</p>
          </div>
        </button>

        {/* Quick Nav / Actions */}
        <div className="flex items-center gap-3">
          {stage === 'landing' ? (
            <button
              onClick={startAssessment}
              className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-semibold text-sm px-4 py-2 rounded-lg shadow-sm hover:shadow transition-all"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Start Diagnostic</span>
            </button>
          ) : (
            <button
              onClick={goToLanding}
              className="text-xs sm:text-sm font-medium text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition"
            >
              Overview
            </button>
          )}

          {/* Doro Assistant Button */}
          <button
            onClick={toggleDoro}
            className={`inline-flex items-center gap-2 font-medium text-sm px-3.5 py-2 rounded-lg border transition-all ${
              doroOpen
                ? 'bg-amber-50 border-amber-300 text-amber-900 shadow-sm'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span className="hidden sm:inline">Ask</span>
            <span className="font-semibold text-amber-700">Doro AI</span>
          </button>
        </div>
      </div>
    </header>
  );
}

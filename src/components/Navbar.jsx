import React from 'react';
import { useAssessment } from '../context/AssessmentContext';
import { Sparkles, ArrowRight, Home, HelpCircle } from 'lucide-react';

export default function Navbar() {
  const { stage, startAssessment, goToLanding, toggleDoro, doroOpen } = useAssessment();

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <button
          onClick={goToLanding}
          className="flex items-center gap-2.5 text-left group focus:outline-none cursor-pointer"
        >
          <div className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center text-white font-black text-sm shadow-sm group-hover:scale-105 transition-transform">
            A1
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-slate-900 text-base tracking-tight">ReadyCheck</span>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                ÖSD & Goethe
              </span>
            </div>
          </div>
        </button>

        {/* Center Nav Pills (Mondly / Dashboard style) */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1 rounded-full border border-slate-200/60 text-xs font-semibold text-slate-600">
          <button
            onClick={goToLanding}
            className={`px-3.5 py-1.5 rounded-full transition cursor-pointer ${
              stage === 'landing' ? 'bg-white text-slate-900 shadow-2xs' : 'hover:text-slate-900'
            }`}
          >
            Overview
          </button>
          <button
            onClick={startAssessment}
            className={`px-3.5 py-1.5 rounded-full transition cursor-pointer ${
              stage === 'assessment' ? 'bg-white text-slate-900 shadow-2xs' : 'hover:text-slate-900'
            }`}
          >
            Diagnostic (12 Q)
          </button>
          <button
            onClick={toggleDoro}
            className={`px-3.5 py-1.5 rounded-full transition cursor-pointer ${
              doroOpen ? 'bg-amber-100 text-amber-900' : 'hover:text-slate-900'
            }`}
          >
            Doro AI Tutor
          </button>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          {stage === 'landing' ? (
            <button
              onClick={startAssessment}
              className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm px-4 py-2 rounded-full shadow-sm hover:shadow transition-all cursor-pointer"
            >
              <span>Start Assessment</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={goToLanding}
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-full hover:bg-slate-100 transition cursor-pointer"
            >
              Back to Overview
            </button>
          )}

          {/* Doro Companion Button */}
          <button
            onClick={toggleDoro}
            className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-full border transition-all cursor-pointer ${
              doroOpen
                ? 'bg-amber-500 text-white border-amber-600 shadow-sm'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Doro AI</span>
          </button>
        </div>
      </div>
    </header>
  );
}

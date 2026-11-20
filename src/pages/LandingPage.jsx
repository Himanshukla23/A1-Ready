import React from 'react';
import { useAssessment } from '../context/AssessmentContext';
import {
  CheckCircle2,
  BookOpen,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Clock,
  Compass,
  AlertTriangle,
  Layers,
  Mic,
} from 'lucide-react';

export default function LandingPage() {
  const { startAssessment, toggleDoro } = useAssessment();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 border-b border-slate-200 bg-gradient-to-b from-white via-sky-50/30 to-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          {/* Target Exam Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100/80 border border-sky-200 text-sky-800 text-xs sm:text-sm font-medium mb-6 shadow-xs">
            <span className="flex h-2 w-2 rounded-full bg-sky-600"></span>
            <span>Targeting Goethe-Zertifikat A1 & ÖSD Zertifikat A1</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Know If You’re Truly Exam-Ready{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-amber-600 to-rose-600">
              Across All 4 Skills.
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Thousands of German learners register for €100+ exams without objectively testing their speaking or grammar.
            Take our 12-task diagnostic across <span className="font-semibold text-slate-800">Vocabulary</span>,{' '}
            <span className="font-semibold text-slate-800">Grammar</span>,{' '}
            <span className="font-semibold text-slate-800">Reading</span>, and{' '}
            <span className="font-semibold text-rose-700">Speaking (Voice AI)</span> with deterministic evaluation and personalized tutoring from <span className="font-semibold text-amber-700">Doro AI</span>.
          </p>

          {/* Action CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={startAssessment}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white font-bold text-base px-8 py-4 rounded-xl shadow-lg shadow-sky-600/25 hover:shadow-sky-600/35 transition-all transform hover:-translate-y-0.5"
            >
              <span>Start 4-Skill Diagnostic</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={toggleDoro}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 font-semibold text-base px-6 py-4 rounded-xl shadow-xs transition"
            >
              <Sparkles className="w-5 h-5 text-amber-500" />
              <span>Meet Doro AI Companion</span>
            </button>
          </div>

          {/* Micro trust signals */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-slate-500 font-medium">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-slate-400" />
              <span>~10 Minutes</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Deterministic & Rubric Scoring</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Mic className="w-4 h-4 text-rose-600" />
              <span>Real Voice Speaking Tasks</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-sky-600" />
              <span>Free • No Signup Required</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Core Skill Pillars */}
      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Comprehensive 4-Skill Diagnostic Structure
          </h2>
          <p className="mt-3 text-slate-600 text-base max-w-2xl mx-auto">
            Official A1 exams test practical ability across both receptive and productive language. Our diagnostic tests all 4 pillars:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Vocabulary */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-sky-300 hover:shadow-md transition">
            <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-lg mb-4">
              <BookOpen className="w-6 h-6" />
            </div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-base font-bold text-slate-900">Vocabulary</h3>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-sky-50 text-sky-700 border border-sky-200">
                3 Tasks
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Everyday food & drinks, daily routines, transport, and city locations.
            </p>
          </div>

          {/* Card 2: Grammar */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-amber-300 hover:shadow-md transition">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-lg mb-4">
              <Layers className="w-6 h-6" />
            </div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-base font-bold text-slate-900">Grammar</h3>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                3 Tasks
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Accusative masculine articles (*einen/den*), stem vowel changes (*fahren*), and modal verbs (*können*).
            </p>
          </div>

          {/* Card 3: Reading */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-emerald-300 hover:shadow-md transition">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-lg mb-4">
              <Compass className="w-6 h-6" />
            </div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-base font-bold text-slate-900">Reading</h3>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                3 Tasks
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Authentic German public signs, store opening hours, email invitations, and railway announcements.
            </p>
          </div>

          {/* Card 4: Speaking */}
          <div className="bg-white p-6 rounded-2xl border border-rose-200 shadow-xs hover:border-rose-300 hover:shadow-md transition bg-gradient-to-b from-rose-50/30 to-white">
            <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-lg mb-4">
              <Mic className="w-6 h-6" />
            </div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-base font-bold text-slate-900">Speaking (Voice)</h3>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-300">
                3 Prompts
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Self-introduction, polite ordering in a café, and describing weekend hobbies using voice recording.
            </p>
          </div>
        </div>
      </section>

      {/* 4-Tier Readiness Classification */}
      <section className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Clear, Objective Readiness Feedback
            </h2>
            <p className="mt-3 text-slate-600 text-base max-w-2xl mx-auto">
              No inflated grades. Our 4-tier rubric enforces balanced competence across all four skills to prevent costly examination failure:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-xl border border-emerald-200 bg-emerald-50/50">
              <div className="flex items-center gap-2 mb-2">
                <span className="h-3 w-3 rounded-full bg-emerald-500"></span>
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">$\ge 85\%$ Score</span>
              </div>
              <h4 className="font-bold text-slate-900 text-base">Strong Practice Performance</h4>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Requires $\ge 50\%$ in every individual skill. Ready to book your Goethe or ÖSD examination with confidence.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-sky-200 bg-sky-50/50">
              <div className="flex items-center gap-2 mb-2">
                <span className="h-3 w-3 rounded-full bg-sky-500"></span>
                <span className="text-xs font-bold text-sky-800 uppercase tracking-wider">70% – 84% Score</span>
              </div>
              <h4 className="font-bold text-slate-900 text-base">Almost There</h4>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Good overall base. Requires 10–14 days of focused practice on your single weakest skill before booking.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-amber-200 bg-amber-50/50">
              <div className="flex items-center gap-2 mb-2">
                <span className="h-3 w-3 rounded-full bg-amber-500"></span>
                <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">50% – 69% Score</span>
              </div>
              <h4 className="font-bold text-slate-900 text-base">Needs Targeted Practice</h4>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Noticeable gaps in speaking fluidity or grammar. Do not book yet; follow Doro’s study plan first.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-rose-200 bg-rose-50/50">
              <div className="flex items-center gap-2 mb-2">
                <span className="h-3 w-3 rounded-full bg-rose-500"></span>
                <span className="text-xs font-bold text-rose-800 uppercase tracking-wider">&lt; 50% Score</span>
              </div>
              <h4 className="font-bold text-slate-900 text-base">Build A1 Foundations</h4>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Core curriculum review recommended before attempting exam-style tasks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Doro AI Assistant Showcase */}
      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-br from-amber-50/80 via-white to-sky-50/60 p-8 sm:p-10 rounded-3xl border border-amber-200/80 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-semibold mb-4">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>AI Learning Companion</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Meet Doro: Your Personal German Tutor
              </h3>
              <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed">
                Doro is built specifically for A1 German learners. Unlike generic chatbots, Doro understands the exact CEFR A1 requirements:
              </p>
              <ul className="mt-4 space-y-2.5 text-sm text-slate-700">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <span><strong>Explains Mistakes:</strong> Tells you why an answer was wrong without confusing jargon.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <span><strong>Voice Output & Evaluation:</strong> Listens to your speaking answers and provides feedback on pronunciation and grammar.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <span><strong>Fair Exam Integrity:</strong> Never reveals active test answers during the assessment.</span>
                </li>
              </ul>
            </div>

            {/* Doro Preview Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-3 mb-3">
                <div className="w-9 h-9 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                  D
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Doro AI</h4>
                  <p className="text-xs text-slate-400">German A1 Learning Companion</p>
                </div>
              </div>
              <div className="space-y-3 text-xs sm:text-sm">
                <div className="bg-slate-100 text-slate-700 p-3 rounded-xl rounded-tl-xs">
                  "How do I formulate a polite request in the speaking test?"
                </div>
                <div className="bg-amber-50/80 border border-amber-200/60 text-slate-800 p-3 rounded-xl rounded-tr-xs">
                  <p className="font-semibold text-amber-900 mb-1">Doro's Explanation:</p>
                  "In the Goethe and ÖSD speaking exam (Teil 2), the most reliable phrase is <strong>'Ich möchte bitte...'</strong> (I would like please...) or <strong>'Können Sie mir bitte helfen?'</strong> (Could you please help me?). Always include <em>bitte</em>!"
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Honest Disclaimer Notice */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-16">
        <div className="p-5 rounded-2xl bg-slate-100 border border-slate-200 flex items-start gap-4">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            <strong className="text-slate-800">Diagnostic Disclaimer:</strong> A1 ReadyCheck is an independent diagnostic learning platform. It is not an official examination or certification, and results do not guarantee official examination success.
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="bg-sky-900 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h3 className="text-2xl sm:text-3xl font-bold">
            Ready to test your German A1 readiness across all 4 skills?
          </h3>
          <p className="mt-2 text-sky-200 text-sm sm:text-base">
            12 tasks. Vocabulary, Grammar, Reading, and Voice Speaking. Instant results.
          </p>
          <button
            onClick={startAssessment}
            className="mt-6 inline-flex items-center gap-2 bg-white hover:bg-sky-50 text-sky-900 font-bold px-8 py-3.5 rounded-xl shadow-md transition"
          >
            <span>Start Free Diagnostic</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
}

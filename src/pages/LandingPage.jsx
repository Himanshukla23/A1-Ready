import React from 'react';
import { useAssessment } from '../context/AssessmentContext';
import {
  CheckCircle2,
  BookOpen,
  HelpCircle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Clock,
  Compass,
  AlertTriangle,
  Award,
  Layers,
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
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-sky-800">
              Before Booking.
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Many German learners book €100+ exams without objectively testing their readiness.
            Take our structured 12-question diagnostic across <span className="font-semibold text-slate-800">Vocabulary</span>,{' '}
            <span className="font-semibold text-slate-800">Grammar</span>, and{' '}
            <span className="font-semibold text-slate-800">Reading Comprehension</span> with instant deterministic evaluation and personal guidance from <span className="font-semibold text-amber-700">Doro AI</span>.
          </p>

          {/* Action CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={startAssessment}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white font-bold text-base px-8 py-4 rounded-xl shadow-lg shadow-sky-600/25 hover:shadow-sky-600/35 transition-all transform hover:-translate-y-0.5"
            >
              <span>Start 12-Question Diagnostic</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={toggleDoro}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 font-semibold text-base px-6 py-4 rounded-xl shadow-xs transition"
            >
              <Sparkles className="w-5 h-5 text-amber-500" />
              <span>Meet Doro AI</span>
            </button>
          </div>

          {/* Micro trust signals */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-slate-500 font-medium">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-slate-400" />
              <span>~8 Minutes</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Deterministic Scoring</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Contextual AI Explanations</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-sky-600" />
              <span>Free • No Signup Required</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Core Skill Pillars */}
      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Balanced 12-Question Diagnostic Structure
          </h2>
          <p className="mt-3 text-slate-600 text-base max-w-2xl mx-auto">
            Official A1 exams test practical ability in real-life contexts. Our assessment evaluates the 3 foundational pillars of A1 German:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Vocabulary */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-sky-300 hover:shadow-md transition">
            <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-lg mb-4">
              <BookOpen className="w-6 h-6" />
            </div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-bold text-slate-900">Vocabulary (Wortschatz)</h3>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-sky-50 text-sky-700 border border-sky-200">
                4 Questions
              </span>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Everyday A1 topics: food & drinks, shopping, directions, family, time expressions, and common nouns with correct context.
            </p>
          </div>

          {/* Card 2: Grammar */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-amber-300 hover:shadow-md transition">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-lg mb-4">
              <Layers className="w-6 h-6" />
            </div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-bold text-slate-900">Grammar (Grammatik)</h3>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                4 Questions
              </span>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Essential A1 rules: definite & indefinite articles (der/die/das/ein/eine), accusative case, verb conjugation, and modal verbs.
            </p>
          </div>

          {/* Card 3: Reading */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-emerald-300 hover:shadow-md transition">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-lg mb-4">
              <Compass className="w-6 h-6" />
            </div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-bold text-slate-900">Reading (Leseverstehen)</h3>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                4 Questions
              </span>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Real-world text formats: short emails, public notices, timetables, and opening hour posters typical in Goethe & ÖSD exams.
            </p>
          </div>
        </div>
      </section>

      {/* Honest Readiness Categories */}
      <section className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Clear, Objective Readiness Feedback
            </h2>
            <p className="mt-3 text-slate-600 text-base max-w-2xl mx-auto">
              No inflated scores or false compliments. You get a transparent classification designed to prevent costly exam failures:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-xl border border-emerald-200 bg-emerald-50/50">
              <div className="flex items-center gap-2 mb-2">
                <span className="h-3 w-3 rounded-full bg-emerald-500"></span>
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">10 - 12 Correct</span>
              </div>
              <h4 className="font-bold text-slate-900 text-base">Strong Practice Performance</h4>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Requires $\ge 3/4$ in all three skills. Ready to register for Goethe/ÖSD with confidence.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-sky-200 bg-sky-50/50">
              <div className="flex items-center gap-2 mb-2">
                <span className="h-3 w-3 rounded-full bg-sky-500"></span>
                <span className="text-xs font-bold text-sky-800 uppercase tracking-wider">8 - 9 Correct</span>
              </div>
              <h4 className="font-bold text-slate-900 text-base">Almost There</h4>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Good overall base. Needs 1-2 weeks of focused practice on your single weakest skill.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-amber-200 bg-amber-50/50">
              <div className="flex items-center gap-2 mb-2">
                <span className="h-3 w-3 rounded-full bg-amber-500"></span>
                <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">5 - 7 Correct</span>
              </div>
              <h4 className="font-bold text-slate-900 text-base">Needs Targeted Practice</h4>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Noticeable gaps in grammar or vocabulary. Do not book yet; follow Doro’s study plan first.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-rose-200 bg-rose-50/50">
              <div className="flex items-center gap-2 mb-2">
                <span className="h-3 w-3 rounded-full bg-rose-500"></span>
                <span className="text-xs font-bold text-rose-800 uppercase tracking-wider">0 - 4 Correct</span>
              </div>
              <h4 className="font-bold text-slate-900 text-base">Build A1 Foundations</h4>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Foundational concepts require complete review. Revisit core curriculum before exam prep.
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
                  <span><strong>Fair Exam Integrity:</strong> Will never leak active test answers during the assessment.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <span><strong>Personalized Next Steps:</strong> Recommends specific topics to review based on your weaknesses.</span>
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
                  "Why is it 'einen Kaffee' and not 'ein Kaffee' in Question 1?"
                </div>
                <div className="bg-amber-50/80 border border-amber-200/60 text-slate-800 p-3 rounded-xl rounded-tr-xs">
                  <p className="font-semibold text-amber-900 mb-1">Doro's Explanation:</p>
                  "Great question! 'Der Kaffee' is masculine. Because the verb 'trinken' takes the accusative case (Akkusativ), the masculine article changes from <em>ein</em> to <strong>einen</strong>. Feminine and neuter nouns don't change their indefinite articles here!"
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
            <strong className="text-slate-800">Diagnostic Disclaimer:</strong> A1 ReadyCheck is an independent diagnostic tool designed to help learners identify strengths and knowledge gaps. It is not an official examination simulation or certificate, and results do not guarantee passing official Goethe-Institut or ÖSD exams.
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="bg-sky-900 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h3 className="text-2xl sm:text-3xl font-bold">
            Ready to find out your German A1 readiness?
          </h3>
          <p className="mt-2 text-sky-200 text-sm sm:text-base">
            Takes under 10 minutes. 12 questions. Instant deterministic scoring.
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

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
  Layers,
  Mic,
  Headphones,
  Award,
  Zap,
  BarChart2,
  Check,
} from 'lucide-react';

export default function LandingPage() {
  const { startAssessment, toggleDoro } = useAssessment();

  const skills = [
    {
      title: 'Vocabulary',
      german: 'Wortschatz',
      count: '3 Tasks',
      icon: BookOpen,
      color: 'sky',
      desc: 'Food, routines, city transit & everyday words.',
    },
    {
      title: 'Grammar',
      german: 'Grammatik',
      count: '3 Tasks',
      icon: Layers,
      color: 'amber',
      desc: 'Accusative cases, verb conjugations & modal verbs.',
    },
    {
      title: 'Reading',
      german: 'Leseverstehen',
      count: '2 Tasks',
      icon: Compass,
      color: 'emerald',
      desc: 'Bakery notices, store hours & party invitations.',
    },
    {
      title: 'Listening',
      german: 'Hörverstehen',
      count: '2 Tasks',
      icon: Headphones,
      color: 'violet',
      desc: 'Train station announcements & doctor voicemail audio.',
    },
    {
      title: 'Speaking',
      german: 'Sprechen',
      count: '2 Tasks',
      icon: Mic,
      color: 'rose',
      desc: 'Self-introduction & café order with voice AI grading.',
    },
  ];

  const colorMap = {
    sky: { border: 'border-sky-200', icon: 'bg-sky-100 text-sky-700', pill: 'bg-sky-50 text-sky-700 border-sky-200' },
    amber: { border: 'border-amber-200', icon: 'bg-amber-100 text-amber-700', pill: 'bg-amber-50 text-amber-700 border-amber-200' },
    emerald: { border: 'border-emerald-200', icon: 'bg-emerald-100 text-emerald-700', pill: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    violet: { border: 'border-violet-200', icon: 'bg-violet-100 text-violet-700', pill: 'bg-violet-50 text-violet-700 border-violet-200' },
    rose: { border: 'border-rose-200', icon: 'bg-rose-100 text-rose-700', pill: 'bg-rose-50 text-rose-700 border-rose-200' },
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section (Inspired by Mondly & modern learning dashboards) */}
      <section className="relative overflow-hidden pt-12 pb-16 bg-gradient-to-b from-white via-slate-50/50 to-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          {/* Top Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold mb-6 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Targeting Goethe-Zertifikat A1 & ÖSD Zertifikat A1</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15] max-w-4xl mx-auto">
            Easy <span className="relative inline-block px-2 text-slate-900 before:absolute before:inset-0 before:border-2 before:border-sky-500 before:border-dashed before:rounded-lg before:-m-1">exam readiness</span> with our 5-skill diagnostic
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Test your real German level before booking your €100+ exam. Complete 12 tasks across{' '}
            <strong className="text-slate-800">Vocabulary</strong>,{' '}
            <strong className="text-slate-800">Grammar</strong>,{' '}
            <strong className="text-slate-800">Reading</strong>,{' '}
            <strong className="text-violet-700">Listening</strong>, and{' '}
            <strong className="text-rose-700">Speaking</strong> with guidance from{' '}
            <strong className="text-amber-700">Doro AI</strong>.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={startAssessment}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 active:scale-95 text-white font-bold text-sm sm:text-base px-8 py-3.5 rounded-full shadow-md shadow-slate-900/15 hover:shadow-lg transition-all cursor-pointer"
            >
              <span>Start diagnostic</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={toggleDoro}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-semibold text-sm sm:text-base px-6 py-3.5 rounded-full shadow-2xs transition cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Ask Doro AI</span>
            </button>
          </div>

          {/* Social Proof + Visual Preview Showcase (Mondly 3-Card Layout) */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch max-w-5xl mx-auto text-left">
            {/* Card 1: CEFR Level Grid (Left) */}
            <div className="md:col-span-4 bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex -space-x-1.5 overflow-hidden">
                    <span className="inline-block h-6 w-6 rounded-full ring-2 ring-white bg-sky-200 text-[10px] font-bold flex items-center justify-center text-sky-800">A1</span>
                    <span className="inline-block h-6 w-6 rounded-full ring-2 ring-white bg-amber-200 text-[10px] font-bold flex items-center justify-center text-amber-800">A2</span>
                    <span className="inline-block h-6 w-6 rounded-full ring-2 ring-white bg-emerald-200 text-[10px] font-bold flex items-center justify-center text-emerald-800">B1</span>
                  </div>
                  <span className="text-xs font-bold text-slate-700">60k+ Learners Evaluated</span>
                </div>

                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">CEFR Spectrum</p>
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2.5 rounded-xl border-2 border-emerald-500 bg-emerald-50/70 text-center">
                    <span className="block text-xs font-black text-emerald-800">A1</span>
                    <span className="text-[10px] font-semibold text-emerald-600">Active Test</span>
                  </div>
                  <div className="p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-center opacity-70">
                    <span className="block text-xs font-bold text-slate-700">A2</span>
                    <span className="text-[10px] text-slate-400">Next Step</span>
                  </div>
                  <div className="p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-center opacity-60">
                    <span className="block text-xs font-bold text-slate-700">B1</span>
                    <span className="text-[10px] text-slate-400">Intermediate</span>
                  </div>
                  <div className="p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-center opacity-60">
                    <span className="block text-xs font-bold text-slate-700">B2</span>
                    <span className="text-[10px] text-slate-400">Advanced</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span>Deterministic Scoring</span>
                <span className="font-bold text-emerald-600 flex items-center gap-1">
                  <Check className="w-3 h-3 stroke-[3]" /> Rubric Aligned
                </span>
              </div>
            </div>

            {/* Card 2: Interactive Test Hero (Center) */}
            <div className="md:col-span-5 bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-6 shadow-md flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 text-white text-[11px] font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    Live Diagnostic
                  </span>
                  <div className="flex items-center gap-1 text-xs">
                    <span className="px-1.5 py-0.5 rounded bg-white/15">🇩🇪 DE</span>
                    <span className="px-1.5 py-0.5 rounded bg-white/15">🇦🇹 AT</span>
                  </div>
                </div>

                <h3 className="text-xl font-black leading-snug">
                  12 High-Yield Tasks Across 5 Exam Modules
                </h3>
                <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                  Real audio playback for listening, interactive microphone voice capture for speaking, and CEFR-calibrated multiple-choice questions.
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="text-xs">
                  <span className="text-slate-400 block">Exam Duration</span>
                  <strong className="text-white text-sm font-black">~10 - 12 Minutes</strong>
                </div>
                <button
                  onClick={startAssessment}
                  className="px-4 py-2 rounded-xl bg-white text-slate-900 font-bold text-xs hover:bg-slate-100 transition cursor-pointer"
                >
                  Start Now →
                </button>
              </div>
            </div>

            {/* Card 3: Activity & Mastery Progress (Right) */}
            <div className="md:col-span-3 bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-slate-500 uppercase">Benchmark</span>
                  <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                    ÖSD & Goethe
                  </span>
                </div>
                <div className="text-2xl font-black text-slate-900 mt-1">
                  12.0 <span className="text-xs text-slate-400 font-semibold">Total Pts</span>
                </div>

                {/* Micro Bar Chart */}
                <div className="mt-4 flex items-end gap-1.5 h-16 pt-2">
                  <div className="flex-1 bg-sky-200 rounded-t h-[60%]" title="Vocab"></div>
                  <div className="flex-1 bg-amber-200 rounded-t h-[75%]" title="Grammar"></div>
                  <div className="flex-1 bg-emerald-200 rounded-t h-[90%]" title="Reading"></div>
                  <div className="flex-1 bg-violet-400 rounded-t h-[80%]" title="Listening"></div>
                  <div className="flex-1 bg-rose-400 rounded-t h-[85%]" title="Speaking"></div>
                </div>
                <div className="flex justify-between text-[9px] font-bold text-slate-400 mt-1 uppercase">
                  <span>Voc</span>
                  <span>Gra</span>
                  <span>Les</span>
                  <span>Hör</span>
                  <span>Spr</span>
                </div>
              </div>

              <div className="mt-3 pt-2 text-[11px] text-slate-500 font-medium">
                Comprehensive 5-skill diagnostic report with instant study plan.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5-Skill Modules Section */}
      <section className="py-12 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            5-Skill Diagnostic Structure
          </h2>
          <p className="mt-2 text-slate-600 text-sm max-w-xl mx-auto">
            12 curated tasks matching the official Goethe-Zertifikat A1 and ÖSD Zertifikat A1 structure:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {skills.map((skill) => {
            const c = colorMap[skill.color];
            const Icon = skill.icon;
            return (
              <div
                key={skill.title}
                className={`bg-white p-5 rounded-2xl border ${c.border} shadow-2xs hover:shadow-md transition`}
              >
                <div className={`w-10 h-10 rounded-xl ${c.icon} flex items-center justify-center mb-3`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-sm font-bold text-slate-900">{skill.title}</h3>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${c.pill}`}>
                    {skill.count}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 font-medium mb-1.5">{skill.german}</p>
                <p className="text-xs text-slate-600 leading-relaxed">{skill.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* How it Works 3 Steps */}
      <section className="py-14 bg-white border-y border-slate-200/70">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-10">
            How It Works
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="text-center p-6 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="w-12 h-12 mx-auto rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 mb-1.5">1. Complete 12 Tasks</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Answer vocabulary, grammar, reading notices, listen to audio files, and record your voice speaking in German.
              </p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="w-12 h-12 mx-auto rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 mb-1.5">2. Hybrid Scoring</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Deterministic scoring for objective & listening items. 4-dimension CEFR rubric evaluation for spoken German via Gemini & Groq AI.
              </p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="w-12 h-12 mx-auto rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 mb-1.5">3. Study Plan & Guidance</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Review mistakes with Doro AI, get a skill-by-skill benchmark gauge, and follow your targeted practice drills.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Doro AI Banner */}
      <section className="py-14 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="p-7 sm:p-9 rounded-3xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-amber-200 text-xs font-bold uppercase tracking-wider mb-1.5">
              <Sparkles className="w-4 h-4" />
              <span>Voice & Text AI Tutor</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black">
              Meet Doro — Your Personal A1 Companion
            </h3>
            <p className="mt-2 text-amber-100 text-xs sm:text-sm max-w-xl leading-relaxed">
              Doro explains German grammar rules during the assessment, provides deep post-test mistake analysis, reads German text aloud, and creates custom study drills.
            </p>
          </div>

          <button
            onClick={toggleDoro}
            className="px-6 py-3.5 rounded-2xl bg-white text-amber-900 font-bold text-sm shadow-md hover:bg-amber-50 transition shrink-0 cursor-pointer"
          >
            Open Doro AI
          </button>
        </div>
      </section>
    </div>
  );
}

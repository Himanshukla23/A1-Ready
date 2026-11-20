import React, { useState } from 'react';
import { useAssessment } from '../context/AssessmentContext';
import SkillBreakdown from '../components/SkillBreakdown';
import RecommendationCard from '../components/RecommendationCard';
import { generateRecommendations } from '../utils/recommendations.js';
import { SPEAKING_QUESTIONS } from '../data/speakingQuestions.js';
import {
  RotateCcw,
  Sparkles,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Mic,
  Copy,
  Check,
  Printer,
  Gauge,
  Cpu,
  Headphones,
} from 'lucide-react';

export default function ResultsPage() {
  const { results, retakeAssessment, goToLanding, toggleDoro, speakingResponses } = useAssessment();
  const [expandedQuestionId, setExpandedQuestionId] = useState(null);
  const [copied, setCopied] = useState(false);

  if (!results) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <h2 className="text-xl font-bold text-slate-800">No Assessment Results Found</h2>
        <p className="mt-2 text-slate-500">Please complete the 12-task diagnostic first.</p>
        <button
          onClick={goToLanding}
          className="mt-6 px-6 py-2.5 bg-sky-600 text-white rounded-xl font-semibold hover:bg-sky-700"
        >
          Return to Overview
        </button>
      </div>
    );
  }

  const {
    totalPoints,
    correctCount,
    percentage,
    skills,
    readinessCategory,
    identifiedStrengths,
    identifiedWeaknesses,
    criticalSkillGaps,
    incorrectQuestions,
  } = results;

  const recommendations = generateRecommendations(results);

  // Badge coloring
  const badgeColors = {
    emerald: {
      bg: 'bg-emerald-50',
      border: 'border-emerald-300',
      text: 'text-emerald-800',
      pill: 'bg-emerald-600 text-white',
    },
    sky: {
      bg: 'bg-sky-50',
      border: 'border-sky-300',
      text: 'text-sky-800',
      pill: 'bg-sky-600 text-white',
    },
    amber: {
      bg: 'bg-amber-50',
      border: 'border-amber-300',
      text: 'text-amber-800',
      pill: 'bg-amber-600 text-white',
    },
    rose: {
      bg: 'bg-rose-50',
      border: 'border-rose-300',
      text: 'text-rose-800',
      pill: 'bg-rose-600 text-white',
    },
  };

  const currentTheme = badgeColors[readinessCategory.badgeVariant] || badgeColors.sky;

  const toggleQuestionDetail = (id) => {
    setExpandedQuestionId((prev) => (prev === id ? null : id));
  };

  const handleCopySummary = async () => {
    const summaryText = `--- A1 READYCHECK 4-SKILL DIAGNOSTIC REPORT ---
Overall Score: ${correctCount} / ${totalPoints} (${percentage}%)
Classification: ${readinessCategory.label} - ${readinessCategory.headline}

SKILL PERFORMANCE:
- Vocabulary (Wortschatz): ${skills.vocabulary.correct} / 3.0 (${skills.vocabulary.percentage}%)
- Grammar (Grammatik): ${skills.grammar.correct} / 3.0 (${skills.grammar.percentage}%)
- Reading (Leseverstehen): ${skills.reading.correct} / 2.0 (${skills.reading.percentage}%)
- Listening (Hörverstehen): ${skills.listening.correct} / 2.0 (${skills.listening.percentage}%)
- Speaking (Sprechen): ${skills.speaking.correct} / 2.0 (${skills.speaking.percentage}%)

STRENGTHS:
${identifiedStrengths.map((s) => `• ${s.label}: ${s.score}`).join('\n') || 'None'}

FOCUS AREAS:
${identifiedWeaknesses.map((w) => `• ${w.label}: ${w.score}`).join('\n') || 'None'}

EXAMINATION ADVICE:
${readinessCategory.advice}
------------------------------------------------`;

    try {
      await navigator.clipboard.writeText(summaryText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      console.warn("Could not copy:", e);
    }
  };

  const renderSpeakingProviderBadge = (evalData) => {
    if (!evalData) return null;
    if (evalData.provider === 'gemini') {
      return (
        <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full inline-flex items-center gap-1">
          ⚡ Evaluated by Gemini 2.5 Flash
        </span>
      );
    }
    if (evalData.provider === 'groq') {
      return (
        <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full inline-flex items-center gap-1">
          ⚡ Evaluated by Groq LLaMA 3.3 (Failover)
        </span>
      );
    }
    return (
      <span className="text-[10px] font-semibold text-slate-600 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-full inline-flex items-center gap-1">
        <Cpu className="w-3 h-3 text-slate-500" />
        Predefined CEFR Rubric
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Top Header / Action Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Diagnostic Report • 5-Skill Goethe & ÖSD A1 Readiness
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopySummary}
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 transition"
              title="Copy Summary to Clipboard"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-bold">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                  <span>Copy Summary</span>
                </>
              )}
            </button>

            <button
              onClick={retakeAssessment}
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake</span>
            </button>

            <button
              onClick={goToLanding}
              className="text-xs font-medium text-slate-500 hover:text-slate-800 px-2 py-1"
            >
              Overview
            </button>
          </div>
        </div>

        {/* Hero Score & Classification Banner */}
        <div className={`rounded-3xl border ${currentTheme.border} ${currentTheme.bg} p-6 sm:p-10 shadow-xs`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider mb-4 border border-black/10 bg-white/70">
                <span className="w-2 h-2 rounded-full bg-current"></span>
                <span>{readinessCategory.label}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                {readinessCategory.headline}
              </h1>

              <p className="mt-3 text-sm sm:text-base text-slate-700 max-w-2xl leading-relaxed">
                {readinessCategory.description}
              </p>

              <div className="mt-4 p-3.5 rounded-xl bg-white/80 border border-black/5 text-xs sm:text-sm text-slate-800">
                <strong className="text-slate-900">Official Examination Advice: </strong>
                {readinessCategory.advice}
              </div>
            </div>

            {/* Score Pill */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 flex flex-col items-center justify-center text-center shadow-xs shrink-0 self-start md:self-center min-w-[190px]">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Overall Score</span>
              <div className="text-4xl sm:text-5xl font-black text-slate-900 mt-1">
                {correctCount}
                <span className="text-xl text-slate-400 font-bold"> / {totalPoints}</span>
              </div>
              <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-800">
                {percentage}% Readiness
              </div>
            </div>
          </div>

          {/* CEFR A1 Readiness Spectrum Meter */}
          <div className="mt-8 pt-6 border-t border-black/10">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
              <span className="flex items-center gap-1.5">
                <Gauge className="w-4 h-4 text-slate-500" />
                <span>CEFR A1 Readiness Spectrum</span>
              </span>
              <span>Your Benchmark: {percentage}%</span>
            </div>

            {/* Meter bar */}
            <div className="grid grid-cols-4 gap-1.5 h-3 rounded-full overflow-hidden bg-slate-200/80 p-0.5">
              <div
                className={`h-full rounded-l-full transition-all ${
                  percentage < 50 ? 'bg-rose-500 ring-2 ring-rose-600' : 'bg-rose-300'
                }`}
                title="< 50%: Initial Foundation"
              ></div>
              <div
                className={`h-full transition-all ${
                  percentage >= 50 && percentage < 70 ? 'bg-amber-500 ring-2 ring-amber-600' : 'bg-amber-300'
                }`}
                title="50-69%: A1 Developing"
              ></div>
              <div
                className={`h-full transition-all ${
                  percentage >= 70 && percentage < 85 ? 'bg-sky-500 ring-2 ring-sky-600' : 'bg-sky-300'
                }`}
                title="70-84%: Exam Ready with Caution"
              ></div>
              <div
                className={`h-full rounded-r-full transition-all ${
                  percentage >= 85 ? 'bg-emerald-500 ring-2 ring-emerald-600' : 'bg-emerald-300'
                }`}
                title=">= 85%: Exam Ready"
              ></div>
            </div>

            <div className="grid grid-cols-4 gap-1 text-[11px] text-slate-600 mt-2 text-center font-medium">
              <span className={percentage < 50 ? 'font-bold text-rose-700' : ''}>&lt; 50% Foundation</span>
              <span className={percentage >= 50 && percentage < 70 ? 'font-bold text-amber-700' : ''}>50-69% Developing</span>
              <span className={percentage >= 70 && percentage < 85 ? 'font-bold text-sky-700' : ''}>70-84% Borderline</span>
              <span className={percentage >= 85 ? 'font-bold text-emerald-700' : ''}>85%+ Exam Ready</span>
            </div>
          </div>
        </div>

        {/* 4 Skill-wise Performance Breakdown */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-slate-900">
              Skill-Wise Competency Breakdown
            </h2>
            <span className="text-xs text-slate-500 font-medium">Points per Module</span>
          </div>
          <SkillBreakdown skills={skills} />
        </div>

        {/* Strengths & Focus Areas Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Strengths */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3 text-emerald-800 font-bold text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Your Identified Strengths</span>
              </div>
              {identifiedStrengths.length > 0 ? (
                <ul className="space-y-2">
                  {identifiedStrengths.map((item) => (
                    <li key={item.skill} className="flex items-center justify-between text-xs sm:text-sm p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200/70">
                      <span className="font-medium text-slate-800">{item.label}</span>
                      <span className="font-bold text-emerald-700">{item.score} ({item.percentage}%)</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
                  <p className="font-semibold text-slate-700">No modules have reached 75% yet.</p>
                  <p className="mt-1 text-slate-500 leading-relaxed">
                    Focus on the practice areas on the right. With regular practice and Doro AI guidance, your scores will improve rapidly!
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Weaknesses */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
            <div className="flex items-center gap-2 mb-3 text-rose-800 font-bold text-sm">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <span>Focus Areas for Practice</span>
            </div>
            {identifiedWeaknesses.length > 0 ? (
              <ul className="space-y-2">
                {identifiedWeaknesses.map((item) => (
                  <li key={item.skill} className="flex items-center justify-between text-xs sm:text-sm p-2 rounded-lg bg-rose-50/60 border border-rose-200/60">
                    <span className="font-medium text-slate-800">{item.label}</span>
                    <span className="font-bold text-rose-700">{item.score} ({item.percentage}%)</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-emerald-600 font-medium">Congratulations! All modules achieved solid performance.</p>
            )}
          </div>
        </div>

        {/* Speaking Assessment Performance Review */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
                <Mic className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Speaking Assessment Review (Sprechen)
                </h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  Evaluated across 4 dimensions: Task Relevance, Grammar, Vocabulary, and Completeness.
                </p>
              </div>
            </div>

            <span className="text-sm font-extrabold px-3 py-1 rounded-full bg-rose-50 text-rose-800 border border-rose-200 shrink-0">
              {skills.speaking.correct} / 2.0 Points
            </span>
          </div>

          <div className="space-y-4">
            {SPEAKING_QUESTIONS.map((sp) => {
              const resp = speakingResponses[sp.id];
              const evalData = resp?.evaluation;

              return (
                <div key={sp.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-500">{sp.part}</span>
                      <h4 className="text-sm font-bold text-slate-900">{sp.topic}</h4>
                    </div>
                    <div className="flex items-center gap-2">
                      {renderSpeakingProviderBadge(evalData)}
                      {evalData && (
                        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-white border border-slate-300 text-slate-800">
                          {evalData.score} / 3.0 pts
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 italic">
                    Prompt: "{sp.promptGerman}"
                  </p>

                  <div className="bg-white p-3 rounded-xl border border-slate-200 text-xs sm:text-sm">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      Your Transcribed Response:
                    </span>
                    <p className="font-medium text-slate-800">
                      "{resp?.transcript || '(No speech recorded)'}"
                    </p>
                  </div>

                  {evalData?.dimensions && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                      {Object.entries(evalData.dimensions).map(([dimKey, dim]) => (
                        <div key={dimKey} className="bg-white p-2 rounded-lg border border-slate-200">
                          <span className="text-[10px] text-slate-400 font-bold uppercase block">{dimKey.replace('_', ' ')}</span>
                          <span className="font-extrabold text-slate-900">{dim.score} / 3</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {evalData?.improvements?.length > 0 && (
                    <p className="text-xs text-amber-800 bg-amber-50 p-2 rounded-lg border border-amber-200">
                      <strong>Tip: </strong> {evalData.improvements.join(' ')}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Detailed Mistake Review for Objective Questions */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4 mb-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Objective Mistakes Analysis ({incorrectQuestions.length} Questions)
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Review why your chosen answer was wrong and understand the CEFR A1 rule.
              </p>
            </div>
            {incorrectQuestions.length === 0 && (
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                100% Correct in MCQs!
              </span>
            )}
          </div>

          {incorrectQuestions.length === 0 ? (
            <div className="text-center py-8 text-slate-500">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-2" />
              <p className="font-bold text-slate-800">Flawless Objective Performance!</p>
              <p className="text-xs text-slate-500">You answered all 9 multiple-choice questions correctly.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {incorrectQuestions.map((q) => {
                const isExpanded = expandedQuestionId === q.id;

                return (
                  <div
                    key={q.id}
                    className="border border-slate-200 rounded-2xl overflow-hidden hover:border-slate-300 transition"
                  >
                    <button
                      onClick={() => toggleQuestionDetail(q.id)}
                      className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 bg-slate-50/60 hover:bg-slate-100/60 transition"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-lg bg-rose-100 text-rose-700 font-bold text-xs flex items-center justify-center shrink-0">
                          <XCircle className="w-4 h-4" />
                        </span>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-400 uppercase">{q.skill}</span>
                            <span className="text-slate-300">•</span>
                            <span className="text-xs font-semibold text-slate-700">{q.topic}</span>
                          </div>
                          <p className="text-sm font-bold text-slate-900 mt-0.5 line-clamp-1">
                            {q.question}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-xs font-semibold text-slate-500 hidden sm:inline">
                          {isExpanded ? 'Hide Details' : 'View Explanation'}
                        </span>
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-slate-400" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-400" />
                        )}
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="p-4 sm:p-5 border-t border-slate-200 bg-white space-y-4 animate-in fade-in">
                        {q.passage && (
                          <div className="p-3.5 rounded-xl bg-amber-50/50 border border-amber-200/60 text-xs sm:text-sm text-slate-800 whitespace-pre-line">
                            <strong className="text-amber-900 block mb-1">Passage / Notice:</strong>
                            {q.passage}
                          </div>
                        )}

                        <div className="text-sm font-semibold text-slate-900">
                          {q.question}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-900">
                            <span className="text-xs font-bold uppercase tracking-wider block text-rose-700">Your Selection:</span>
                            <span className="font-semibold">{q.selectedOptionId}: {q.selectedOptionText}</span>
                          </div>
                          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900">
                            <span className="text-xs font-bold uppercase tracking-wider block text-emerald-700">Correct Answer:</span>
                            <span className="font-semibold">{q.correctOptionId}: {q.correctOptionText}</span>
                          </div>
                        </div>

                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700">
                          <strong className="text-slate-900 block mb-1">💡 Explanation & Exam Rule:</strong>
                          <p className="leading-relaxed">{q.explanation}</p>
                        </div>

                        <div className="flex justify-end">
                          <button
                            onClick={toggleDoro}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100 transition cursor-pointer"
                          >
                            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                            <span>Ask Doro for more examples</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Personalized Practice Plan */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Your Personalized 4-Skill Study Plan
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Targeted drills based on your diagnostic results:
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {recommendations.map((rec, idx) => (
              <RecommendationCard key={idx} recommendation={rec} index={idx} />
            ))}
          </div>
        </div>

        {/* Doro Assistant Interactive Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-amber-200 text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Voice & Text Tutoring</span>
            </div>
            <h3 className="text-2xl font-black">
              Want to practice speaking and grammar with Doro?
            </h3>
            <p className="mt-1 text-amber-100 text-xs sm:text-sm max-w-xl">
              Doro can listen to your German voice answers, read German phrases aloud, and drill accusative endings.
            </p>
          </div>

          <button
            onClick={toggleDoro}
            className="px-6 py-3.5 rounded-xl bg-white text-amber-900 font-bold text-sm shadow-md hover:bg-amber-50 transition shrink-0 cursor-pointer"
          >
            Open Doro AI
          </button>
        </div>

        {/* Retake and Print Actions */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4 pb-12">
          <button
            onClick={retakeAssessment}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-sky-600 hover:bg-sky-700 text-white shadow-md shadow-sky-600/20 transition cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Retake 4-Skill Diagnostic</span>
          </button>

          <button
            onClick={handleCopySummary}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 shadow-xs transition cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700 font-bold">Summary Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-slate-500" />
                <span>Copy Diagnostic Summary</span>
              </>
            )}
          </button>

          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 shadow-xs transition cursor-pointer"
          >
            <Printer className="w-4 h-4 text-slate-500" />
            <span>Print / Save PDF Report</span>
          </button>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { useAssessment } from '../context/AssessmentContext';
import SkillBreakdown from '../components/SkillBreakdown';
import RecommendationCard from '../components/RecommendationCard';
import { generateRecommendations } from '../utils/recommendations.js';
import {
  RotateCcw,
  Sparkles,
  Award,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  Compass,
  BookOpen,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

export default function ResultsPage() {
  const { results, retakeAssessment, goToLanding, toggleDoro } = useAssessment();
  const [expandedQuestionId, setExpandedQuestionId] = useState(null);

  if (!results) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <h2 className="text-xl font-bold text-slate-800">Keine Testergebnisse gefunden</h2>
        <p className="mt-2 text-slate-500">Bitte führen Sie zuerst die 12-Fragen-Diagnose durch.</p>
        <button
          onClick={goToLanding}
          className="mt-6 px-6 py-2.5 bg-sky-600 text-white rounded-xl font-semibold"
        >
          Zur Startseite
        </button>
      </div>
    );
  }

  const {
    totalQuestions,
    correctCount,
    percentage,
    skills,
    readinessCategory,
    identifiedStrengths,
    identifiedWeaknesses,
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

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Top Header / Action Bar */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Diagnosebericht • Goethe- & ÖSD-A1-Bereitschaft
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={retakeAssessment}
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Test wiederholen</span>
            </button>
            <button
              onClick={goToLanding}
              className="text-xs font-medium text-slate-500 hover:text-slate-800 px-2 py-1"
            >
              Startseite
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
                <strong className="text-slate-900">Empfehlung für Ihre Prüfungsanmeldung: </strong>
                {readinessCategory.advice}
              </div>
            </div>

            {/* Score Ring / Pill */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 flex flex-col items-center justify-center text-center shadow-xs shrink-0 self-start md:self-center min-w-[180px]">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Gesamtpunktzahl</span>
              <div className="text-4xl sm:text-5xl font-black text-slate-900 mt-1">
                {correctCount}
                <span className="text-xl text-slate-400 font-bold"> / {totalQuestions}</span>
              </div>
              <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-800">
                {percentage}% Genauigkeit
              </div>
            </div>
          </div>
        </div>

        {/* Skill-wise Performance Breakdown */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-slate-900">
              Leistung nach Kompetenzbereichen
            </h2>
            <span className="text-xs text-slate-500 font-medium">Je 4 Fragen pro Modul</span>
          </div>
          <SkillBreakdown skills={skills} />
        </div>

        {/* Strengths & Focus Areas Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Strengths */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
            <div className="flex items-center gap-2 mb-3 text-emerald-800 font-bold text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Ihre Stärken</span>
            </div>
            {identifiedStrengths.length > 0 ? (
              <ul className="space-y-2">
                {identifiedStrengths.map((item) => (
                  <li key={item.skill} className="flex items-center justify-between text-xs sm:text-sm p-2 rounded-lg bg-emerald-50/60 border border-emerald-200/60">
                    <span className="font-medium text-slate-800">{item.label}</span>
                    <span className="font-bold text-emerald-700">{item.score} richtig</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-slate-500 italic">Noch keine Bereiche mit $\ge 3/4$ Punkten.</p>
            )}
          </div>

          {/* Weaknesses */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
            <div className="flex items-center gap-2 mb-3 text-rose-800 font-bold text-sm">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <span>Schwerpunkte für weiteres Üben</span>
            </div>
            {identifiedWeaknesses.length > 0 ? (
              <ul className="space-y-2">
                {identifiedWeaknesses.map((item) => (
                  <li key={item.skill} className="flex items-center justify-between text-xs sm:text-sm p-2 rounded-lg bg-rose-50/60 border border-rose-200/60">
                    <span className="font-medium text-slate-800">{item.label}</span>
                    <span className="font-bold text-rose-700">{item.score} richtig</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-emerald-600 font-medium">Glückwunsch! Alle Bereiche mit $\ge 3/4$ Punkten abgeschlossen.</p>
            )}
          </div>
        </div>

        {/* Detailed Mistake Review */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4 mb-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Detaillierte Fehleranalyse ({incorrectQuestions.length} Fragen)
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Verstehen Sie exakt, warum Ihre gewählte Option falsch war und welche Grammatik- oder Wortschatzregel gilt.
              </p>
            </div>
            {incorrectQuestions.length === 0 && (
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                100% fehlerfrei!
              </span>
            )}
          </div>

          {incorrectQuestions.length === 0 ? (
            <div className="text-center py-8 text-slate-500">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-2" />
              <p className="font-bold text-slate-800">Perfektes Ergebnis!</p>
              <p className="text-xs text-slate-500">Sie haben alle 12 Fragen korrekt beantwortet.</p>
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
                            <span className="text-xs font-bold text-slate-400 uppercase">{q.skillLabel}</span>
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
                          {isExpanded ? 'Einklappen' : 'Erklärung anzeigen'}
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
                        {/* Reading passage if applicable */}
                        {q.passage && (
                          <div className="p-3.5 rounded-xl bg-amber-50/50 border border-amber-200/60 text-xs sm:text-sm text-slate-800 whitespace-pre-line">
                            <strong className="text-amber-900 block mb-1">Lesetext:</strong>
                            {q.passage}
                          </div>
                        )}

                        {/* Question prompt */}
                        <div className="text-sm font-semibold text-slate-900">
                          {q.question}
                        </div>

                        {/* Answer comparison */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-900">
                            <span className="text-xs font-bold uppercase tracking-wider block text-rose-700">Ihre Antwort:</span>
                            <span className="font-semibold">{q.selectedOptionId}: {q.selectedOptionText}</span>
                          </div>
                          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900">
                            <span className="text-xs font-bold uppercase tracking-wider block text-emerald-700">Richtige Antwort:</span>
                            <span className="font-semibold">{q.correctOptionId}: {q.correctOptionText}</span>
                          </div>
                        </div>

                        {/* Explanation */}
                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700">
                          <strong className="text-slate-900 block mb-1">💡 Erklärung & Grammatikregel:</strong>
                          <p className="leading-relaxed">{q.explanation}</p>
                        </div>

                        {/* Doro Context Trigger */}
                        <div className="flex justify-end">
                          <button
                            onClick={toggleDoro}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100 transition"
                          >
                            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                            <span>Doro nach weiteren Beispielen fragen</span>
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
                Ihr persönlicher A1-Übungsplan
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Konkrete Übungsaufgaben basierend auf Ihren Fehlerquellen:
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
              <span>Interaktive Nachbesprechung</span>
            </div>
            <h3 className="text-2xl font-black">
              Möchten Sie diese Fehler mit Doro AI üben?
            </h3>
            <p className="mt-1 text-amber-100 text-xs sm:text-sm max-w-xl">
              Doro kann Ihnen ähnliche Übungsfragen stellen, Akkusativ-Endungen trainieren oder Lesestrategien vertiefen.
            </p>
          </div>

          <button
            onClick={toggleDoro}
            className="px-6 py-3.5 rounded-xl bg-white text-amber-900 font-bold text-sm shadow-md hover:bg-amber-50 transition shrink-0"
          >
            Doro AI öffnen
          </button>
        </div>

        {/* Retake and Print Actions */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4 pb-12">
          <button
            onClick={retakeAssessment}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-sky-600 hover:bg-sky-700 text-white shadow-md shadow-sky-600/20 transition"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Diagnose jetzt wiederholen</span>
          </button>

          <button
            onClick={() => window.print()}
            className="px-6 py-3.5 rounded-xl font-semibold text-sm bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 shadow-xs transition"
          >
            Ergebnis drucken / als PDF speichern
          </button>
        </div>
      </div>
    </div>
  );
}

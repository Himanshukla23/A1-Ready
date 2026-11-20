import React, { useState } from 'react';
import { useAssessment } from '../context/AssessmentContext';
import { QUESTIONS } from '../data/questions';
import ProgressBar from '../components/ProgressBar';
import QuestionCard from '../components/QuestionCard';
import { validateCompletion } from '../services/assessmentService';
import {
  ChevronLeft,
  ChevronRight,
  Send,
  AlertCircle,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  X,
} from 'lucide-react';

export default function AssessmentPage() {
  const {
    currentQuestionIndex,
    nextQuestion,
    prevQuestion,
    goToQuestion,
    answers,
    submitAssessment,
    goToLanding,
    toggleDoro,
  } = useAssessment();

  const [showIncompleteAlert, setShowIncompleteAlert] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  const currentQuestion = QUESTIONS[currentQuestionIndex] || QUESTIONS[0];
  const isFirstQuestion = currentQuestionIndex === 0;
  const isLastQuestion = currentQuestionIndex === QUESTIONS.length - 1;

  const validation = validateCompletion(answers);

  const handleNextOrSubmit = () => {
    if (isLastQuestion) {
      handleAttemptSubmit();
    } else {
      nextQuestion();
    }
  };

  const handleAttemptSubmit = () => {
    if (!validation.isComplete) {
      setShowIncompleteAlert(true);
    } else {
      setShowIncompleteAlert(false);
      setShowSubmitModal(true);
    }
  };

  const confirmSubmit = () => {
    setShowSubmitModal(false);
    submitAssessment();
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        {/* Top bar with back to overview & Doro quick help */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={goToLanding}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-slate-500 hover:text-slate-800 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Zurück zur Übersicht</span>
          </button>

          <button
            onClick={toggleDoro}
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100 transition"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Frage an Doro AI stellen</span>
          </button>
        </div>

        {/* Progress Bar & Question Jump Pills */}
        <ProgressBar />

        {/* Incomplete Submission Alert Banner */}
        {showIncompleteAlert && (
          <div className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-900 shadow-sm animate-in fade-in">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-bold text-sm">
                  Bitte alle 12 Fragen beantworten ({validation.totalCount - validation.answeredCount} offen)
                </h4>
                <p className="text-xs text-amber-800 mt-1">
                  Für eine objektive Einstufung müssen alle Fragen beantwortet werden. Klicken Sie auf eine offene Frage, um direkt dorthin zu springen:
                </p>
                <div className="flex flex-wrap gap-1.5 mt-2.5">
                  {validation.unansweredIndices.map((idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        goToQuestion(idx);
                        setShowIncompleteAlert(false);
                      }}
                      className="px-2.5 py-1 text-xs font-bold rounded-md bg-white border border-amber-300 text-amber-900 hover:bg-amber-100"
                    >
                      Frage {idx + 1}
                    </button>
                  ))}
                </div>
              </div>
              <button
                onClick={() => setShowIncompleteAlert(false)}
                className="text-amber-700 hover:text-amber-900 p-1"
                aria-label="Schließen"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Current Question Card */}
        <QuestionCard question={currentQuestion} />

        {/* Bottom Navigation Toolbar */}
        <div className="mt-6 flex items-center justify-between gap-4">
          <button
            onClick={prevQuestion}
            disabled={isFirstQuestion}
            className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition ${
              isFirstQuestion
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 shadow-xs'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Zurück</span>
          </button>

          <div className="flex items-center gap-3">
            {validation.isComplete && !isLastQuestion && (
              <button
                onClick={handleAttemptSubmit}
                className="hidden sm:inline-flex items-center gap-2 px-4 py-3 rounded-xl font-bold text-sm bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition"
              >
                <Send className="w-4 h-4" />
                <span>Jetzt Auswerten</span>
              </button>
            )}

            {isLastQuestion ? (
              <button
                onClick={handleAttemptSubmit}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-sky-600 hover:bg-sky-700 text-white shadow-md shadow-sky-600/20 transition"
              >
                <span>Diagnose Auswerten</span>
                <Send className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={nextQuestion}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-sky-600 hover:bg-sky-700 text-white shadow-md shadow-sky-600/20 transition"
              >
                <span>Nächste Frage</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Submission Confirmation Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <h3 className="text-xl font-extrabold text-slate-900">
              Diagnose jetzt auswerten?
            </h3>

            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Sie haben alle <strong>12 Fragen</strong> beantwortet. Das System berechnet nun Ihr Gesamtergebnis, die Skill-Aufschlüsselung (Wortschatz, Grammatik, Lesen) und Ihre Goethe/ÖSD-Prüfungsbereitschaft.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={confirmSubmit}
                className="w-full sm:w-auto flex-1 py-3 px-5 rounded-xl font-bold text-sm bg-emerald-600 hover:bg-emerald-700 text-white shadow-md transition"
              >
                Ja, Auswertung anzeigen
              </button>
              <button
                onClick={() => setShowSubmitModal(false)}
                className="w-full sm:w-auto py-3 px-5 rounded-xl font-semibold text-sm bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
              >
                Nochmals prüfen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

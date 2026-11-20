import React, { useState } from 'react';
import { useAssessment } from '../context/AssessmentContext';
import { ALL_ASSESSMENT_TASKS } from '../services/assessmentService.js';
import ProgressBar from '../components/ProgressBar';
import QuestionCard from '../components/QuestionCard';
import SpeakingQuestion from '../components/SpeakingQuestion';
import { validateCompletion } from '../services/assessmentService.js';
import {
  ChevronLeft,
  ChevronRight,
  Send,
  AlertCircle,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  X,
  Mic,
} from 'lucide-react';

export default function AssessmentPage() {
  const {
    currentQuestionIndex,
    nextQuestion,
    prevQuestion,
    goToQuestion,
    answers,
    speakingResponses,
    submitAssessment,
    goToLanding,
    toggleDoro,
  } = useAssessment();

  const [showIncompleteAlert, setShowIncompleteAlert] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  const currentTask = ALL_ASSESSMENT_TASKS[currentQuestionIndex] || ALL_ASSESSMENT_TASKS[0];
  const isFirstTask = currentQuestionIndex === 0;
  const isLastTask = currentQuestionIndex === ALL_ASSESSMENT_TASKS.length - 1;

  const validation = validateCompletion(answers, speakingResponses);

  const handleNextOrSubmit = () => {
    if (isLastTask) {
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
            <span>Back to Overview</span>
          </button>

          <button
            onClick={toggleDoro}
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100 transition"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Ask Doro AI Tutor</span>
          </button>
        </div>

        {/* Progress Bar & 12 Task Jump Pills */}
        <ProgressBar />

        {/* Incomplete Submission Alert Banner */}
        {showIncompleteAlert && (
          <div className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-900 shadow-sm animate-in fade-in">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-bold text-sm">
                  Please complete all 12 tasks ({validation.totalCount - validation.answeredCount} pending)
                </h4>
                <p className="text-xs text-amber-800 mt-1">
                  For an accurate 4-skill diagnostic report, all 9 multiple-choice and 3 speaking responses must be recorded. Click any pending task to jump to it:
                </p>
                <div className="flex flex-wrap gap-1.5 mt-2.5">
                  {validation.unansweredIndices.map((idx) => {
                    const task = ALL_ASSESSMENT_TASKS[idx];
                    const isSpeaking = task.skill === 'speaking';

                    return (
                      <button
                        key={idx}
                        onClick={() => {
                          goToQuestion(idx);
                          setShowIncompleteAlert(false);
                        }}
                        className={`px-2.5 py-1 text-xs font-bold rounded-md border inline-flex items-center gap-1 hover:bg-amber-100 ${
                          isSpeaking
                            ? 'bg-rose-50 text-rose-900 border-rose-300'
                            : 'bg-white text-amber-900 border-amber-300'
                        }`}
                      >
                        {isSpeaking && <Mic className="w-3 h-3 text-rose-600" />}
                        <span>Task {idx + 1}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
              <button
                onClick={() => setShowIncompleteAlert(false)}
                className="text-amber-700 hover:text-amber-900 p-1"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Active Task: Speaking Task vs Objective Question */}
        {currentTask.skill === 'speaking' ? (
          <SpeakingQuestion question={currentTask} />
        ) : (
          <QuestionCard question={currentTask} />
        )}

        {/* Bottom Navigation Toolbar */}
        <div className="mt-6 flex items-center justify-between gap-4">
          <button
            onClick={prevQuestion}
            disabled={isFirstTask}
            className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition ${
              isFirstTask
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 shadow-xs'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <div className="flex items-center gap-3">
            {validation.isComplete && !isLastTask && (
              <button
                onClick={handleAttemptSubmit}
                className="hidden sm:inline-flex items-center gap-2 px-4 py-3 rounded-xl font-bold text-sm bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition"
              >
                <Send className="w-4 h-4" />
                <span>Evaluate 4-Skill Diagnostic</span>
              </button>
            )}

            {isLastTask ? (
              <button
                onClick={handleAttemptSubmit}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-sky-600 hover:bg-sky-700 text-white shadow-md shadow-sky-600/20 transition"
              >
                <span>Evaluate Diagnostic</span>
                <Send className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={nextQuestion}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-sky-600 hover:bg-sky-700 text-white shadow-md shadow-sky-600/20 transition"
              >
                <span>Next Task</span>
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
              Submit & Evaluate 4-Skill Diagnostic?
            </h3>

            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              You have completed all <strong>12 tasks</strong> (3 Vocabulary, 3 Grammar, 3 Reading, and 3 Speaking). The hybrid scoring engine will evaluate objective items deterministically and score spoken responses against the 4-dimension CEFR A1 rubric.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={confirmSubmit}
                className="w-full sm:w-auto flex-1 py-3 px-5 rounded-xl font-bold text-sm bg-emerald-600 hover:bg-emerald-700 text-white shadow-md transition"
              >
                Yes, View Results
              </button>
              <button
                onClick={() => setShowSubmitModal(false)}
                className="w-full sm:w-auto py-3 px-5 rounded-xl font-semibold text-sm bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
              >
                Review Responses
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

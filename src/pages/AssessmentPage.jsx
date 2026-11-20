import React, { useState, useEffect } from 'react';
import { useAssessment } from '../context/AssessmentContext';
import { ALL_ASSESSMENT_TASKS } from '../services/assessmentService.js';
import ProgressBar from '../components/ProgressBar';
import QuestionCard from '../components/QuestionCard';
import SpeakingQuestion from '../components/SpeakingQuestion';
import ListeningQuestion from '../components/ListeningQuestion';
import { validateCompletion } from '../services/assessmentService.js';
import { stopSpeaking } from '../services/speechRecognitionService.js';
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
  Headphones,
  Clock,
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
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (secs) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${rem < 10 ? '0' : ''}${rem}`;
  };

  const currentTask = ALL_ASSESSMENT_TASKS[currentQuestionIndex] || ALL_ASSESSMENT_TASKS[0];
  const isFirstTask = currentQuestionIndex === 0;
  const isLastTask = currentQuestionIndex === ALL_ASSESSMENT_TASKS.length - 1;

  const validation = validateCompletion(answers, speakingResponses);

  const handlePrev = () => {
    stopSpeaking();
    prevQuestion();
  };

  const handleNext = () => {
    stopSpeaking();
    nextQuestion();
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

  // Render the right component based on skill type
  const renderQuestion = () => {
    if (currentTask.skill === 'speaking') {
      return <SpeakingQuestion key={currentTask.id} question={currentTask} />;
    }
    if (currentTask.skill === 'listening') {
      return <ListeningQuestion key={currentTask.id} question={currentTask} />;
    }
    return <QuestionCard key={currentTask.id} question={currentTask} />;
  };

  return (
    <div className="min-h-screen bg-slate-50 py-6 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={goToLanding}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-slate-500 hover:text-slate-800 transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Overview</span>
          </button>

          <div className="flex items-center gap-3">
            {/* Timer */}
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-slate-600 bg-white border border-slate-200 px-3 py-1.5 rounded-lg shadow-2xs">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span className="tabular-nums">{formatTimer(elapsedSeconds)}</span>
            </div>

            <button
              onClick={toggleDoro}
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100 transition cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Doro AI</span>
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <ProgressBar />

        {/* Incomplete Alert */}
        {showIncompleteAlert && (
          <div className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-900 shadow-sm animate-in fade-in">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-bold text-sm">
                  {validation.totalCount - validation.answeredCount} tasks remaining
                </h4>
                <p className="text-xs text-amber-800 mt-1">
                  Complete all 12 tasks for an accurate 5-skill diagnostic.
                </p>
                <div className="flex flex-wrap gap-1.5 mt-2.5">
                  {validation.unansweredIndices.map((idx) => {
                    const task = ALL_ASSESSMENT_TASKS[idx];
                    const isSpeaking = task.skill === 'speaking';
                    const isListening = task.skill === 'listening';

                    return (
                      <button
                        key={idx}
                        onClick={() => {
                          goToQuestion(idx);
                          setShowIncompleteAlert(false);
                        }}
                        className={`px-2.5 py-1 text-xs font-bold rounded-md border inline-flex items-center gap-1 hover:opacity-80 cursor-pointer ${
                          isSpeaking
                            ? 'bg-rose-50 text-rose-900 border-rose-300'
                            : isListening
                            ? 'bg-violet-50 text-violet-900 border-violet-300'
                            : 'bg-white text-amber-900 border-amber-300'
                        }`}
                      >
                        {isSpeaking && <Mic className="w-3 h-3 text-rose-600" />}
                        {isListening && <Headphones className="w-3 h-3 text-violet-600" />}
                        <span>Task {idx + 1}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
              <button
                onClick={() => setShowIncompleteAlert(false)}
                className="text-amber-700 hover:text-amber-900 p-1 cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Active Task */}
        {renderQuestion()}

        {/* Bottom Navigation */}
        <div className="mt-6 flex items-center justify-between gap-4">
          <button
            onClick={handlePrev}
            disabled={isFirstTask}
            className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition cursor-pointer ${
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
                className="hidden sm:inline-flex items-center gap-2 px-4 py-3 rounded-xl font-bold text-sm bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Submit Diagnostic</span>
              </button>
            )}

            {isLastTask ? (
              <button
                onClick={handleAttemptSubmit}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-sky-600 hover:bg-sky-700 text-white shadow-md shadow-sky-600/20 transition cursor-pointer"
              >
                <span>Submit & Evaluate</span>
                <Send className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-sky-600 hover:bg-sky-700 text-white shadow-md shadow-sky-600/20 transition cursor-pointer"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Submit Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <h3 className="text-xl font-extrabold text-slate-900">
              Submit 5-Skill Diagnostic?
            </h3>

            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              You have completed all <strong>12 tasks</strong> across Vocabulary, Grammar, Reading, Listening, and Speaking. The scoring engine will evaluate your responses.
            </p>

            <div className="mt-2 text-xs text-slate-500 font-medium tabular-nums">
              Total time: {formatTimer(elapsedSeconds)}
            </div>

            <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={confirmSubmit}
                className="w-full sm:w-auto flex-1 py-3 px-5 rounded-xl font-bold text-sm bg-emerald-600 hover:bg-emerald-700 text-white shadow-md transition cursor-pointer"
              >
                Yes, View Results
              </button>
              <button
                onClick={() => setShowSubmitModal(false)}
                className="w-full sm:w-auto py-3 px-5 rounded-xl font-semibold text-sm bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer"
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

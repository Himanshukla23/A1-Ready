import React from 'react';
import { useAssessment } from '../context/AssessmentContext';
import { ALL_ASSESSMENT_TASKS } from '../services/assessmentService.js';
import { stopSpeaking } from '../services/speechRecognitionService.js';
import { BookOpen, Layers, Compass, Mic } from 'lucide-react';

export default function ProgressBar() {
  const { currentQuestionIndex, goToQuestion, answers, speakingResponses } = useAssessment();
  const currentTask = ALL_ASSESSMENT_TASKS[currentQuestionIndex] || ALL_ASSESSMENT_TASKS[0];

  const total = ALL_ASSESSMENT_TASKS.length; // 12

  // Count answered objective and speaking tasks
  let answeredCount = 0;
  ALL_ASSESSMENT_TASKS.forEach((t) => {
    if (t.skill === 'speaking') {
      if (speakingResponses[t.id]?.transcript?.trim()) answeredCount++;
    } else {
      if (answers[t.id]) answeredCount++;
    }
  });

  const skillStyles = {
    vocabulary: {
      label: 'Vocabulary (Wortschatz)',
      icon: BookOpen,
      badge: 'bg-sky-50 text-sky-700 border-sky-200',
    },
    grammar: {
      label: 'Grammar (Grammatik)',
      icon: Layers,
      badge: 'bg-amber-50 text-amber-700 border-amber-200',
    },
    reading: {
      label: 'Reading (Leseverstehen)',
      icon: Compass,
      badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
    speaking: {
      label: 'Speaking (Sprechen)',
      icon: Mic,
      badge: 'bg-rose-50 text-rose-700 border-rose-200',
    },
  };

  const currentSkill = skillStyles[currentTask.skill] || skillStyles.vocabulary;
  const SkillIcon = currentSkill.icon;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs mb-6">
      {/* Top row: Question Counter & Current Skill */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <span className="font-extrabold text-slate-900 text-lg">
            Task {currentQuestionIndex + 1}
          </span>
          <span className="text-slate-400 font-medium text-sm">of {total}</span>
        </div>

        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${currentSkill.badge}`}>
          <SkillIcon className="w-3.5 h-3.5" />
          <span>{currentSkill.label}</span>
        </div>
      </div>

      {/* Progress percentage bar */}
      <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden mb-4">
        <div
          className="bg-gradient-to-r from-sky-500 via-amber-500 to-rose-500 h-2.5 rounded-full transition-all duration-300"
          style={{ width: `${(answeredCount / total) * 100}%` }}
        ></div>
      </div>

      {/* 12 Question Dots / Pills Navigation */}
      <div className="grid grid-cols-6 sm:grid-cols-12 gap-1.5 sm:gap-2">
        {ALL_ASSESSMENT_TASKS.map((task, idx) => {
          const isCurrent = idx === currentQuestionIndex;
          const isSpeaking = task.skill === 'speaking';
          const isAnswered = isSpeaking
            ? Boolean(speakingResponses[task.id]?.transcript?.trim())
            : Boolean(answers[task.id]);

          return (
            <button
              key={task.id}
              onClick={() => {
                stopSpeaking();
                goToQuestion(idx);
              }}
              className={`h-8 sm:h-9 rounded-lg font-bold text-xs flex items-center justify-center transition-all ${
                isCurrent
                  ? 'bg-sky-600 text-white ring-2 ring-sky-500 ring-offset-2 shadow-sm'
                  : isAnswered
                  ? isSpeaking
                    ? 'bg-rose-50 text-rose-800 border border-rose-300 hover:bg-rose-100'
                    : 'bg-sky-50 text-sky-800 border border-sky-300 hover:bg-sky-100'
                  : 'bg-slate-100 text-slate-500 hover:bg-slate-200 border border-slate-200'
              }`}
              title={`Task ${idx + 1} (${task.skillLabel || task.topic})${isAnswered ? ' - Answered' : ' - Unanswered'}`}
            >
              <span>{idx + 1}</span>
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-between mt-3 text-xs text-slate-500">
        <div className="flex items-center gap-3 sm:gap-4">
          <span className="inline-flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-600 inline-block"></span>
            <span>Active</span>
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-200 border border-sky-400 inline-block"></span>
            <span>MCQ</span>
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-200 border border-rose-400 inline-block"></span>
            <span>Voice</span>
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-200 inline-block"></span>
            <span>Pending</span>
          </span>
        </div>
        <span className="font-semibold text-slate-700">
          {answeredCount} of {total} completed
        </span>
      </div>
    </div>
  );
}

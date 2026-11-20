import React from 'react';
import { useAssessment } from '../context/AssessmentContext';
import { QUESTIONS } from '../data/questions';
import { BookOpen, Layers, Compass, CheckCircle2 } from 'lucide-react';

export default function ProgressBar() {
  const { currentQuestionIndex, goToQuestion, answers } = useAssessment();
  const currentQ = QUESTIONS[currentQuestionIndex] || QUESTIONS[0];

  const total = QUESTIONS.length;
  const answeredCount = Object.keys(answers).length;
  const progressPercent = Math.round((answeredCount / total) * 100);

  // Skill configuration styling
  const skillStyles = {
    vocabulary: {
      label: 'Wortschatz (Vocabulary)',
      icon: BookOpen,
      badge: 'bg-sky-50 text-sky-700 border-sky-200',
    },
    grammar: {
      label: 'Grammatik (Grammar)',
      icon: Layers,
      badge: 'bg-amber-50 text-amber-700 border-amber-200',
    },
    reading: {
      label: 'Leseverstehen (Reading)',
      icon: Compass,
      badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
  };

  const currentSkill = skillStyles[currentQ.skill] || skillStyles.vocabulary;
  const SkillIcon = currentSkill.icon;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs mb-6">
      {/* Top row: Question Counter & Current Skill */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <span className="font-extrabold text-slate-900 text-lg">
            Frage {currentQuestionIndex + 1}
          </span>
          <span className="text-slate-400 font-medium text-sm">von {total}</span>
        </div>

        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${currentSkill.badge}`}>
          <SkillIcon className="w-3.5 h-3.5" />
          <span>{currentSkill.label}</span>
        </div>
      </div>

      {/* Progress percentage bar */}
      <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden mb-4">
        <div
          className="bg-gradient-to-r from-sky-500 to-sky-600 h-2.5 rounded-full transition-all duration-300"
          style={{ width: `${(answeredCount / total) * 100}%` }}
        ></div>
      </div>

      {/* Question Dots / Pills Navigation */}
      <div className="grid grid-cols-6 sm:grid-cols-12 gap-1.5 sm:gap-2">
        {QUESTIONS.map((q, idx) => {
          const isCurrent = idx === currentQuestionIndex;
          const isAnswered = Boolean(answers[q.id]);

          return (
            <button
              key={q.id}
              onClick={() => goToQuestion(idx)}
              className={`h-8 sm:h-9 rounded-lg font-bold text-xs flex items-center justify-center transition-all ${
                isCurrent
                  ? 'bg-sky-600 text-white ring-2 ring-sky-500 ring-offset-2 shadow-sm'
                  : isAnswered
                  ? 'bg-sky-50 text-sky-800 border border-sky-300 hover:bg-sky-100'
                  : 'bg-slate-100 text-slate-500 hover:bg-slate-200 border border-slate-200'
              }`}
              title={`Frage ${idx + 1} (${q.topic})${isAnswered ? ' - Beantwortet' : ' - Offen'}`}
            >
              <span>{idx + 1}</span>
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-between mt-3 text-xs text-slate-500">
        <div className="flex items-center gap-4">
          <span className="inline-flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-600 inline-block"></span>
            <span>Aktiv</span>
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-200 border border-sky-400 inline-block"></span>
            <span>Beantwortet</span>
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-200 inline-block"></span>
            <span>Offen</span>
          </span>
        </div>
        <span className="font-semibold text-slate-700">
          {answeredCount} von {total} beantwortet
        </span>
      </div>
    </div>
  );
}

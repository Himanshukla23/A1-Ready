import React from 'react';
import { useAssessment } from '../context/AssessmentContext';
import { ALL_ASSESSMENT_TASKS } from '../services/assessmentService.js';
import { stopSpeaking } from '../services/speechRecognitionService.js';
import { BookOpen, Layers, Compass, Mic, Headphones } from 'lucide-react';

export default function ProgressBar() {
  const { currentQuestionIndex, goToQuestion, answers, speakingResponses } = useAssessment();
  const currentTask = ALL_ASSESSMENT_TASKS[currentQuestionIndex] || ALL_ASSESSMENT_TASKS[0];

  const total = ALL_ASSESSMENT_TASKS.length; // 12

  // Count answered tasks
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
      label: 'Vocabulary',
      icon: BookOpen,
      badge: 'bg-sky-50 text-sky-700 border-sky-200',
      dot: 'bg-sky-200 border-sky-400',
      dotAnswered: 'bg-sky-100 text-sky-800 border-sky-300',
    },
    grammar: {
      label: 'Grammar',
      icon: Layers,
      badge: 'bg-amber-50 text-amber-700 border-amber-200',
      dot: 'bg-amber-200 border-amber-400',
      dotAnswered: 'bg-amber-100 text-amber-800 border-amber-300',
    },
    reading: {
      label: 'Reading',
      icon: Compass,
      badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      dot: 'bg-emerald-200 border-emerald-400',
      dotAnswered: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    },
    listening: {
      label: 'Listening',
      icon: Headphones,
      badge: 'bg-violet-50 text-violet-700 border-violet-200',
      dot: 'bg-violet-200 border-violet-400',
      dotAnswered: 'bg-violet-100 text-violet-800 border-violet-300',
    },
    speaking: {
      label: 'Speaking',
      icon: Mic,
      badge: 'bg-rose-50 text-rose-700 border-rose-200',
      dot: 'bg-rose-200 border-rose-400',
      dotAnswered: 'bg-rose-100 text-rose-800 border-rose-300',
    },
  };

  const currentSkill = skillStyles[currentTask.skill] || skillStyles.vocabulary;
  const SkillIcon = currentSkill.icon;

  // Build skill sections for grouped pill display
  const skillSections = [];
  let lastSkill = null;
  ALL_ASSESSMENT_TASKS.forEach((task, idx) => {
    if (task.skill !== lastSkill) {
      skillSections.push({ skill: task.skill, startIdx: idx, tasks: [] });
      lastSkill = task.skill;
    }
    skillSections[skillSections.length - 1].tasks.push({ task, idx });
  });

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs mb-6">
      {/* Top row */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2.5">
          <span className="font-black text-slate-900 text-xl tabular-nums">
            {currentQuestionIndex + 1}
          </span>
          <span className="text-slate-300 font-medium">/</span>
          <span className="text-slate-400 font-semibold text-sm">{total}</span>
        </div>

        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${currentSkill.badge}`}>
          <SkillIcon className="w-3.5 h-3.5" />
          <span>{currentSkill.label}</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden mb-4">
        <div
          className="bg-gradient-to-r from-sky-500 via-violet-500 to-rose-500 h-2 rounded-full transition-all duration-500"
          style={{ width: `${(answeredCount / total) * 100}%` }}
        ></div>
      </div>

      {/* Grouped skill pill navigation */}
      <div className="flex flex-wrap gap-1">
        {skillSections.map((section) => {
          const style = skillStyles[section.skill];
          const SectionIcon = style.icon;

          return (
            <div key={section.skill} className="flex items-center gap-0.5">
              {section.tasks.map(({ task, idx }) => {
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
                    className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg font-bold text-xs flex items-center justify-center transition-all cursor-pointer ${
                      isCurrent
                        ? 'bg-slate-900 text-white ring-2 ring-slate-800 ring-offset-1 shadow-md'
                        : isAnswered
                        ? `${style.dotAnswered} border hover:opacity-80`
                        : 'bg-slate-100 text-slate-400 hover:bg-slate-200 border border-slate-200'
                    }`}
                    title={`${idx + 1}. ${task.topic || task.part}${isAnswered ? ' ✓' : ''}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
              {/* Divider between skills */}
              <div className="w-1 sm:w-2"></div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-between mt-3 text-[11px] text-slate-500">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded bg-slate-900 inline-block"></span>
            <span>Active</span>
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded bg-sky-200 border border-sky-400 inline-block"></span>
            <span>Answered</span>
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded bg-slate-100 border border-slate-200 inline-block"></span>
            <span>Pending</span>
          </span>
        </div>
        <span className="font-semibold text-slate-700 tabular-nums">
          {answeredCount}/{total}
        </span>
      </div>
    </div>
  );
}

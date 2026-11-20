import React from 'react';
import { BookOpen, Layers, Compass, Mic } from 'lucide-react';

export default function SkillBreakdown({ skills }) {
  if (!skills) return null;

  const skillConfig = [
    {
      key: 'vocabulary',
      title: 'Vocabulary (Wortschatz)',
      data: skills.vocabulary,
      icon: BookOpen,
      color: 'sky',
    },
    {
      key: 'grammar',
      title: 'Grammar (Grammatik)',
      data: skills.grammar,
      icon: Layers,
      color: 'amber',
    },
    {
      key: 'reading',
      title: 'Reading (Leseverstehen)',
      data: skills.reading,
      icon: Compass,
      color: 'emerald',
    },
    {
      key: 'speaking',
      title: 'Speaking (Sprechen)',
      data: skills.speaking,
      icon: Mic,
      color: 'rose',
    },
  ];

  const getStatusBadge = (correct, total) => {
    const ratio = correct / total;
    if (ratio >= 0.8) {
      return {
        label: 'Exam-Ready',
        badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        barColor: 'bg-emerald-500',
      };
    }
    if (ratio >= 0.5) {
      return {
        label: 'Needs Review',
        badge: 'bg-amber-50 text-amber-700 border-amber-200',
        barColor: 'bg-amber-500',
      };
    }
    return {
      label: 'Build Foundation',
      badge: 'bg-rose-50 text-rose-700 border-rose-200',
      barColor: 'bg-rose-500',
    };
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {skillConfig.map((item) => {
        const { title, data, icon: Icon } = item;
        const status = getStatusBadge(data.correct, data.total);

        return (
          <div
            key={item.key}
            className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 leading-snug">{title}</h4>
                </div>
              </div>

              <div className="flex items-baseline justify-between mt-2">
                <span className="text-3xl font-extrabold text-slate-900">
                  {data.correct} <span className="text-sm text-slate-400 font-semibold">/ {data.total}</span>
                </span>
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${status.badge}`}>
                  {status.label}
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mt-3">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${status.barColor}`}
                  style={{ width: `${data.percentage}%` }}
                ></div>
              </div>
            </div>

            <p className="mt-4 text-xs text-slate-500 font-medium">
              {data.percentage}% proficiency in this module
            </p>
          </div>
        );
      })}
    </div>
  );
}

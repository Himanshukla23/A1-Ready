import React from 'react';
import { BookOpen, Layers, Compass, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function SkillBreakdown({ skills }) {
  if (!skills) return null;

  const skillConfig = [
    {
      key: 'vocabulary',
      title: 'Wortschatz (Vocabulary)',
      data: skills.vocabulary,
      icon: BookOpen,
      color: 'sky',
    },
    {
      key: 'grammar',
      title: 'Grammatik (Grammar)',
      data: skills.grammar,
      icon: Layers,
      color: 'amber',
    },
    {
      key: 'reading',
      title: 'Leseverstehen (Reading)',
      data: skills.reading,
      icon: Compass,
      color: 'emerald',
    },
  ];

  const getStatusBadge = (correct, total) => {
    if (correct >= 3) {
      return {
        label: 'Prüfungsbereit',
        badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        barColor: 'bg-emerald-500',
      };
    }
    if (correct === 2) {
      return {
        label: 'Wiederholen',
        badge: 'bg-amber-50 text-amber-700 border-amber-200',
        barColor: 'bg-amber-500',
      };
    }
    return {
      label: 'Basis aufbauen',
      badge: 'bg-rose-50 text-rose-700 border-rose-200',
      barColor: 'bg-rose-500',
    };
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                  <h4 className="text-sm font-bold text-slate-900">{title}</h4>
                </div>
              </div>

              <div className="flex items-baseline justify-between mt-2">
                <span className="text-3xl font-extrabold text-slate-900">
                  {data.correct} <span className="text-base text-slate-400 font-semibold">/ {data.total}</span>
                </span>
                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${status.badge}`}>
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
              {data.percentage}% richtige Antworten in diesem Modul
            </p>
          </div>
        );
      })}
    </div>
  );
}

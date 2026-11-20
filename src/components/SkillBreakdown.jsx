import React from 'react';
import { BookOpen, Layers, Compass, Headphones, Mic } from 'lucide-react';

export default function SkillBreakdown({ skills }) {
  if (!skills) return null;

  const skillConfig = [
    { key: 'vocabulary', title: 'Vocabulary', german: 'Wortschatz', data: skills.vocabulary, icon: BookOpen, color: 'sky' },
    { key: 'grammar', title: 'Grammar', german: 'Grammatik', data: skills.grammar, icon: Layers, color: 'amber' },
    { key: 'reading', title: 'Reading', german: 'Leseverstehen', data: skills.reading, icon: Compass, color: 'emerald' },
    { key: 'listening', title: 'Listening', german: 'Hörverstehen', data: skills.listening, icon: Headphones, color: 'violet' },
    { key: 'speaking', title: 'Speaking', german: 'Sprechen', data: skills.speaking, icon: Mic, color: 'rose' },
  ];

  const getStatusBadge = (correct, total) => {
    const ratio = correct / total;
    if (ratio >= 0.8) {
      return { label: 'Exam-Ready', badge: 'bg-emerald-50 text-emerald-700 border-emerald-200', barColor: 'bg-emerald-500' };
    }
    if (ratio >= 0.5) {
      return { label: 'Needs Review', badge: 'bg-amber-50 text-amber-700 border-amber-200', barColor: 'bg-amber-500' };
    }
    return { label: 'Build Foundation', badge: 'bg-rose-50 text-rose-700 border-rose-200', barColor: 'bg-rose-500' };
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
      {skillConfig.map((item) => {
        const { title, german, data, icon: Icon } = item;
        if (!data) return null;
        const status = getStatusBadge(data.correct, data.total);

        return (
          <div
            key={item.key}
            className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 leading-snug">{title}</h4>
                  <p className="text-[10px] text-slate-400 font-medium">{german}</p>
                </div>
              </div>

              <div className="flex items-baseline justify-between mt-1">
                <span className="text-2xl font-black text-slate-900 tabular-nums">
                  {data.correct}<span className="text-xs text-slate-400 font-semibold">/{data.total}</span>
                </span>
              </div>

              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-2">
                <div
                  className={`h-1.5 rounded-full transition-all duration-500 ${status.barColor}`}
                  style={{ width: `${data.percentage}%` }}
                ></div>
              </div>
            </div>

            <div className="mt-2.5 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 font-medium tabular-nums">{data.percentage}%</span>
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full border ${status.badge}`}>
                {status.label}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

import React, { useState, useEffect, useRef } from 'react';
import { useAssessment } from '../context/AssessmentContext';
import { QUESTIONS } from '../data/questions';
import { askDoro } from '../services/doroService';
import {
  Sparkles,
  X,
  Send,
  Loader2,
  Bot,
  User,
  ShieldAlert,
  BookOpen,
  Target,
  CheckCircle2,
} from 'lucide-react';

export default function DoroChat() {
  const { stage, currentQuestionIndex, results, doroOpen, toggleDoro } = useAssessment();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const currentQ = QUESTIONS[currentQuestionIndex] || QUESTIONS[0];

  // Initialize initial message when stage or Doro opens
  useEffect(() => {
    if (messages.length === 0) {
      if (stage === 'assessment') {
        setMessages([
          {
            sender: 'doro',
            text: `Hallo! Ich bin Doro. Du bearbeitest gerade Frage ${currentQuestionIndex + 1} (${currentQ.topic}). Wenn du eine Grammatikregel oder ein deutsches Wort nicht verstehst, frage mich gerne!\n\n(Hinweis: Direkte Testlösungen verrate ich während des Tests nicht, aber ich erkläre dir die Regeln.)`,
          },
        ]);
      } else if (stage === 'results') {
        setMessages([
          {
            sender: 'doro',
            text: `Herzlichen Glückwunsch zum Abschluss der 12-Fragen-Diagnose! Du hast ${results?.correctCount || 0} von 12 Punkten erreicht. Ich kann dir jetzt jeden Fehler im Detail erklären oder dir zusätzliche Übungsaufgaben erstellen. Worüber möchtest du sprechen?`,
          },
        ]);
      } else {
        setMessages([
          {
            sender: 'doro',
            text: 'Hallo! Ich bin Doro, dein persönlicher Lernbegleiter für das Goethe-Zertifikat A1 und das ÖSD Zertifikat A1. Wie kann ich dir heute bei deinem Deutschlernen helfen?',
          },
        ]);
      }
    }
  }, [stage, currentQuestionIndex, doroOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  if (!doroOpen) return null;

  const handleSend = async (customText = null) => {
    const textToSend = customText || input;
    if (!textToSend.trim() || loading) return;

    const newMessages = [...messages, { sender: 'user', text: textToSend }];
    setMessages(newMessages);
    if (!customText) setInput('');
    setLoading(true);

    try {
      const assessmentSummary = results
        ? {
            score: results.correctCount,
            percentage: results.percentage,
            weakSkills: (results.identifiedWeaknesses || []).map((w) => w.skill),
            incorrectTopics: (results.incorrectQuestions || []).map((q) => q.topic),
          }
        : null;

      const aiResponse = await askDoro({
        stage: stage === 'results' ? 'after_assessment' : 'during_assessment',
        message: textToSend,
        currentQuestionTopic: stage === 'assessment' ? currentQ.topic : '',
        assessmentSummary,
      });

      setMessages((prev) => [
        ...prev,
        {
          sender: 'doro',
          text: aiResponse.explanation || aiResponse.summary,
          data: aiResponse,
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'doro',
          text: 'Es tut mir leid, es gab ein kurzes Problem bei der Verbindung. Die Grundregeln: Männliche Nomen haben im Akkusativ die Endung -en (den/einen). Wenn du eine konkrete Frage hast, stelle sie bitte noch einmal!',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const quickPrompts =
    stage === 'assessment'
      ? [
          'Erkläre die Regel für Frage ' + (currentQuestionIndex + 1),
          'Wie funktioniert der Akkusativ?',
          'Wann sagt man "zu Hause" vs "nach Hause"?',
        ]
      : stage === 'results'
      ? [
          'Warum war meine Leseverstehens-Antwort falsch?',
          'Gib mir 3 Übungssätze für den Akkusativ',
          'Was soll ich in den nächsten 7 Tagen lernen?',
        ]
      : [
          'Was wird bei der Goethe A1 Prüfung verlangt?',
          'Wie funktioniert dieser Test?',
        ];

  return (
    <aside className="fixed bottom-4 right-4 z-50 w-full max-w-[420px] max-h-[85vh] h-[600px] bg-white rounded-3xl border border-slate-300 shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 text-white px-5 py-4 flex items-center justify-between shrink-0 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center font-bold text-base text-white border border-white/20">
            <Sparkles className="w-5 h-5 text-amber-200" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-sm tracking-tight">Doro AI</span>
              <span className="text-[10px] uppercase font-bold bg-white/20 px-1.5 py-0.5 rounded text-white">
                A1 Tutor
              </span>
            </div>
            <p className="text-xs text-amber-100 font-medium">
              {stage === 'assessment'
                ? 'Lernhilfe (Integrity Guard aktiv)'
                : stage === 'results'
                ? 'Ergebnisberatung & Übungen'
                : 'German Exam Companion'}
            </p>
          </div>
        </div>

        <button
          onClick={toggleDoro}
          className="text-white/80 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition"
          aria-label="Doro schließen"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Assessment Integrity Notice (during active test) */}
      {stage === 'assessment' && (
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 flex items-center gap-2 text-xs text-amber-900 font-medium">
          <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
          <span>Prüfungsmodus aktiv: Erklärt Regeln, verrät keine direkten Buchstaben.</span>
        </div>
      )}

      {/* Message Feed */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs sm:text-sm bg-slate-50/50">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex gap-2.5 ${
              msg.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {msg.sender === 'doro' && (
              <div className="w-7 h-7 rounded-lg bg-amber-500 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                <Bot className="w-4 h-4" />
              </div>
            )}

            <div
              className={`max-w-[85%] rounded-2xl p-3.5 space-y-2.5 ${
                msg.sender === 'user'
                  ? 'bg-sky-600 text-white rounded-tr-xs shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-800 rounded-tl-xs shadow-xs'
              }`}
            >
              <p className="whitespace-pre-line leading-relaxed">{msg.text}</p>

              {/* Render structured recommendations if present */}
              {msg.data?.recommendations && msg.data.recommendations.length > 0 && (
                <div className="pt-2 border-t border-slate-100 space-y-2 mt-2">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                    Konkrete Übungsempfehlung:
                  </span>
                  {msg.data.recommendations.map((rec, rIdx) => (
                    <div
                      key={rIdx}
                      className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs text-slate-800"
                    >
                      <strong className="text-amber-900 block">{rec.topic}</strong>
                      <p className="mt-1 text-slate-600">{rec.practice_activity}</p>
                    </div>
                  ))}
                </div>
              )}

              {msg.data?.encouragement && (
                <p className="text-xs font-semibold text-amber-800 italic pt-1">
                  "{msg.data.encouragement}"
                </p>
              )}
            </div>

            {msg.sender === 'user' && (
              <div className="w-7 h-7 rounded-lg bg-sky-700 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex gap-2.5 justify-start">
            <div className="w-7 h-7 rounded-lg bg-amber-500 text-white flex items-center justify-center shrink-0 mt-0.5">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-white border border-slate-200 p-3 rounded-2xl rounded-tl-xs shadow-xs flex items-center gap-2 text-xs text-slate-500">
              <Loader2 className="w-4 h-4 animate-spin text-amber-500" />
              <span>Doro formuliert Erklärung...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompt Pills */}
      <div className="px-3 py-2 bg-white border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
        {quickPrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(prompt)}
            disabled={loading}
            className="text-[11px] whitespace-nowrap bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1 rounded-full font-medium transition"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input box */}
      <div className="p-3 bg-white border-t border-slate-200 shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Frage zu Grammatik oder Vokabeln..."
            disabled={loading}
            className="flex-1 bg-slate-100 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-800"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="w-10 h-10 rounded-xl bg-amber-500 hover:bg-amber-600 disabled:bg-slate-200 text-white flex items-center justify-center transition shadow-xs"
            aria-label="Nachricht senden"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </aside>
  );
}

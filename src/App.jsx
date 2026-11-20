import React from 'react';
import { AssessmentProvider, useAssessment } from './context/AssessmentContext';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import AssessmentPage from './pages/AssessmentPage';
import ResultsPage from './pages/ResultsPage';
import DoroChat from './components/DoroChat';

function MainApp() {
  const { stage } = useAssessment();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar />

      <main className="flex-1">
        {stage === 'landing' && <LandingPage />}
        {stage === 'assessment' && <AssessmentPage />}
        {stage === 'results' && <ResultsPage />}
      </main>

      {/* Interactive Doro AI Companion Drawer */}
      <DoroChat />

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-8 text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-slate-700">A1 ReadyCheck © 2026</p>
            <p className="mt-0.5">Indikative A1-Diagnose für Goethe- und ÖSD-Prüfungskandidaten.</p>
          </div>
          <div className="text-center sm:text-right">
            <p>Built with React, Vite, Tailwind CSS & Google Gemini API.</p>
            <p className="text-slate-400 mt-0.5">Keine offizielle Prüfungsstelle des Goethe-Instituts oder des ÖSD.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <AssessmentProvider>
      <MainApp />
    </AssessmentProvider>
  );
}

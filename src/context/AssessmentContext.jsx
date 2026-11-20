import React, { createContext, useContext, useState } from 'react';
import { calculateAssessmentScore } from '../utils/scoring';

const AssessmentContext = createContext(null);

export function AssessmentProvider({ children }) {
  // 'landing' | 'assessment' | 'results'
  const [stage, setStage] = useState('landing');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState(null);
  const [doroOpen, setDoroOpen] = useState(false);

  const startAssessment = () => {
    setStage('assessment');
    setCurrentQuestionIndex(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const selectAnswer = (questionId, optionId) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  const nextQuestion = () => {
    setCurrentQuestionIndex((prev) => Math.min(prev + 1, 11));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const prevQuestion = () => {
    setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToQuestion = (index) => {
    if (index >= 0 && index <= 11) {
      setCurrentQuestionIndex(index);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const submitAssessment = () => {
    const calculatedResults = calculateAssessmentScore(answers);
    setResults(calculatedResults);
    setStage('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const retakeAssessment = () => {
    setAnswers({});
    setResults(null);
    setCurrentQuestionIndex(0);
    setStage('assessment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToLanding = () => {
    setStage('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleDoro = () => {
    setDoroOpen((prev) => !prev);
  };

  return (
    <AssessmentContext.Provider
      value={{
        stage,
        setStage,
        currentQuestionIndex,
        setCurrentQuestionIndex,
        answers,
        setAnswers,
        results,
        setResults,
        doroOpen,
        setDoroOpen,
        startAssessment,
        selectAnswer,
        nextQuestion,
        prevQuestion,
        goToQuestion,
        submitAssessment,
        retakeAssessment,
        goToLanding,
        toggleDoro,
      }}
    >
      {children}
    </AssessmentContext.Provider>
  );
}

export function useAssessment() {
  const context = useContext(AssessmentContext);
  if (!context) {
    throw new Error('useAssessment must be used within an AssessmentProvider');
  }
  return context;
}

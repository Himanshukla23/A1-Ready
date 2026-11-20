import React, { createContext, useContext, useState } from 'react';
import { calculateAssessmentScore } from '../utils/scoring.js';
import { ALL_ASSESSMENT_TASKS } from '../services/assessmentService.js';
import { evaluateSpeakingLocally } from '../utils/speakingRubric.js';

const AssessmentContext = createContext(null);

export function AssessmentProvider({ children }) {
  // 'landing' | 'assessment' | 'results'
  const [stage, setStage] = useState('landing');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Objective + listening answers: { q1: "A", q2: "B", ..., l1: "B", l2: "B" }
  const [answers, setAnswers] = useState({});

  // Speaking responses: { s1: { transcript: "...", score: 2.5, evaluation: {...} } }
  const [speakingResponses, setSpeakingResponses] = useState({});

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

  const setSpeakingResponse = (promptId, responseData) => {
    setSpeakingResponses((prev) => ({
      ...prev,
      [promptId]: responseData,
    }));
  };

  const nextQuestion = () => {
    setCurrentQuestionIndex((prev) => Math.min(prev + 1, ALL_ASSESSMENT_TASKS.length - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const prevQuestion = () => {
    setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToQuestion = (index) => {
    if (index >= 0 && index < ALL_ASSESSMENT_TASKS.length) {
      setCurrentQuestionIndex(index);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const submitAssessment = () => {
    // Ensure all submitted speaking tasks have evaluations computed
    const finalSpeakingResponses = { ...speakingResponses };
    ['s1', 's2'].forEach((sId) => {
      const existing = finalSpeakingResponses[sId];
      if (existing && existing.transcript && typeof existing.score !== 'number') {
        const localEval = evaluateSpeakingLocally(sId, existing.transcript);
        finalSpeakingResponses[sId] = {
          ...existing,
          score: localEval.score,
          evaluation: localEval,
        };
      }
    });

    const calculatedResults = calculateAssessmentScore(answers, finalSpeakingResponses);
    setResults(calculatedResults);
    setSpeakingResponses(finalSpeakingResponses);
    setStage('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const retakeAssessment = () => {
    setAnswers({});
    setSpeakingResponses({});
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
        speakingResponses,
        setSpeakingResponse,
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

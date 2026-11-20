# A1 ReadyCheck — Problem Statement (v2.0.0)

## 1. Product Overview
A1 ReadyCheck is an AI-assisted German A1 exam readiness platform. It helps learners evaluate their preparation level before booking Goethe-Zertifikat A1 (Start Deutsch 1) or ÖSD Zertifikat A1 examinations by assessing all four core competencies: Vocabulary, Grammar, Reading Comprehension, and Speaking.

## 2. Problem Statement
Many learners complete A1 German courses and book expensive examinations (€100–€160) without objectively understanding their readiness. Gaps in vocabulary, grammar, reading comprehension, or spoken communication lead to exam failure, financial loss, and wasted preparation time. Learners particularly struggle with the speaking section due to anxiety and lack of practice opportunities.

## 3. Proposed Solution
A web application combining a structured 12-question diagnostic assessment across four skills (Vocabulary, Grammar, Reading, and Speaking) with an AI learning companion named Doro.

## 4. Core Assessment Architecture
- **12 Original A1 Assessment Tasks:**
  - 3 Vocabulary questions (deterministic MCQ, max score: 3).
  - 3 Grammar questions (deterministic MCQ, max score: 3).
  - 3 Reading comprehension questions (deterministic MCQ, max score: 3).
  - 3 Speaking prompts (voice recording + AI rubric evaluation, max score: 3).
- **Hybrid Scoring:** Deterministic JavaScript logic for objective items; AI-assisted predefined rubric evaluation for spoken communication.
- **Overall Score:** Out of 12 points with percentage calculation.
- **Skill-wise Breakdown:** 4 separate skill scores (each /3).
- **Readiness Classification:** 4 tiers (Strong Practice Performance $\ge 85\%$, Almost There $\ge 70\%$, Needs Targeted Practice $\ge 50\%$, Build A1 Foundations $< 50\%$).
- **Skill-Balance Constraint:** No learner can be classified as strongly prepared if any skill scores below 50%.

## 5. Doro AI Assistant & Voice Capabilities
Doro is a personal German A1 learning companion. It can explain German concepts, answer A1 queries, break down assessment mistakes, provide contextual speaking feedback, and speak using browser Text-to-Speech. During active assessments, Doro explains concepts and rules but must never reveal direct answers to active questions. Doro must never modify or override deterministic scores.

## 6. Target Users
Learners preparing for Goethe-Zertifikat A1 or ÖSD Zertifikat A1 examinations.

## 7. Core User Needs
- Understand overall and skill-wise preparation level across all 4 modules.
- Practice speaking in an authentic, low-pressure diagnostic setting.
- Receive objective, rubric-based feedback on spoken German responses.
- Understand grammatical and lexical mistakes.
- Receive personalized, actionable learning guidance.

## 8. Product Principles
- Accuracy over vanity metrics.
- Objective evaluation: Deterministic logic for MCQ; transparent rubric for speaking.
- AI assists learning and evaluates speech against a fixed rubric; it never overrides objective assessment scores.
- Accessible voice input with manual text fallback for browser compatibility.
- Honest disclaimer: Diagnostic tool, not an official certification.

## 9. MVP Scope
Landing page, 12-question 4-skill assessment, voice recorder with speech-to-text, speaking rubric evaluation, deterministic scoring engine, results dashboard with 4 skill cards, detailed mistake analysis, personalized recommendations, Doro voice & text assistant, and assessment retake.

## 10. Out of Scope
User authentication, payments, full 60-minute Goethe/ÖSD timed simulation, writing (Schreiben) module, listening (Hören) audio player module, and high-stakes certification.

## 11. Product Outcome
Help learners transition from uncertainty to confident, data-driven exam preparation with clear next steps across vocabulary, grammar, reading, and speaking.

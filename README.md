# A1 ReadyCheck (v2.0.0) — 4-Skill AI-Assisted German A1 Exam Readiness Platform

[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Web Speech API](https://img.shields.io/badge/Speech-STT%20%26%20TTS-FF6F00?logo=w3c&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)
[![Google Gemini](https://img.shields.io/badge/Google_Gemini-API-4285F4?logo=google&logoColor=white)](https://ai.google.dev/)
[![Deployment](https://img.shields.io/badge/Deploy-Vercel-000000?logo=vercel&logoColor=white)](https://vercel.com/)

A1 ReadyCheck is a diagnostic web platform that helps German language learners evaluate their true examination readiness before booking expensive **Goethe-Zertifikat A1 (Start Deutsch 1)** or **ÖSD Zertifikat A1** exams (€100–€160).

Version 2.0.0 expands the platform to a full **4-skill diagnostic assessment (Vocabulary, Grammar, Reading, and Speaking)** combining deterministic JavaScript evaluation for objective questions with an AI-assisted 4-dimension rubric for spoken responses.

---

## 🎯 Four-Skill Assessment Architecture (12 Tasks)

| Skill Module | Tasks | Scoring Engine | Max Score | CEFR A1 Task Focus |
| :--- | :---: | :---: | :---: | :--- |
| **Wortschatz (Vocabulary)** | 3 | Deterministic | 3.0 | Food & drinks, daily routines, transit & city locations |
| **Grammatik (Grammar)** | 3 | Deterministic | 3.0 | Accusative articles (*einen/den*), stem vowel changes (*fahren*), modal verbs (*können*) |
| **Leseverstehen (Reading)** | 3 | Deterministic | 3.0 | Bakery opening hours sign, birthday party invitation email, railway track change notice |
| **Sprechen (Speaking)** | 3 | AI Rubric (0–3) | 3.0 | Self-introduction (*Teil 1*), ordering in a café (*Teil 2*), weekend hobbies (*Teil 3*) |
| **Total** | **12** | **Hybrid** | **12.0** | **Balanced across all CEFR A1 competencies** |

---

## 🎙️ Voice & Speaking Evaluation Rubric
Spoken responses are captured via the browser microphone (Web Speech API) or optional text input, and evaluated across 4 weighted dimensions:
1. **Task Relevance (30%):** Does the response address the prompt?
2. **Grammar & Word Order (30%):** Does the learner position conjugated verbs and articles correctly?
3. **A1 Vocabulary (25%):** Are appropriate A1 words and phrases used?
4. **Response Completeness (15%):** Does the response provide sufficient communicative detail?

---

## 📊 4-Tier Readiness Classification Matrix
- **$\ge 85\%$ Score:** *Strong Practice Performance* — **Condition:** Requires $\ge 50\%$ (at least 1.5/3) in *every* individual skill. Ready to register for Goethe / ÖSD with high confidence.
- **70% – 84% Score (or $\ge 85\%$ with a sub-50% skill):** *Almost There* — Solid base; focus 10–14 days on the single weakest module.
- **50% – 69% Score:** *Needs Targeted Practice* — Do not book yet; follow Doro’s study plan.
- **$< 50\%$ Score:** *Build A1 Foundations* — Fundamental curriculum review recommended.

---

## 🤖 Doro AI Companion Capabilities
- **In-Exam Anti-Leakage Guardrail:** During active tests, Doro explains grammar rules and German vocabulary concepts, but **strictly refuses to reveal active test answers**.
- **Voice Output (TTS):** Doro can speak German explanations aloud via the browser SpeechSynthesis API.
- **Post-Exam Review:** Breaks down mistakes, explains why chosen options were wrong, and provides personalized study drills.
- **Zero-Crash Fallback:** If `GEMINI_API_KEY` is omitted or API is unavailable, Doro seamlessly falls back to a curated local knowledge base (`knowledge-base/*.json`).

---

## 💻 Running the Test Suites & Local Dev

```bash
# 1. Install dependencies
npm install

# 2. Run all 4 automated test suites
node test/assessment_tests.mjs        # Scoring logic & skill-balance tests
node test/speaking_rubric_tests.mjs   # 4-dimension speaking rubric tests
node test/recommendations_tests.mjs   # Practice recommendation tests
node test/doro_ai_tests.mjs           # Doro AI guardrail & knowledge base tests

# 3. Start local development server
npm run dev

# 4. Production build
npm run build
```

---

## 🌐 Deploy to Vercel
1. Push your repository to GitHub.
2. Import the project in [Vercel](https://vercel.com/new).
3. Set `GEMINI_API_KEY` in Environment Variables.
4. Deploy! Vercel handles the React Vite SPA and serverless endpoints (`/api/doro` and `/api/evaluate-speaking`).

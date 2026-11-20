# A1 ReadyCheck — AI-Assisted German A1 Exam Readiness Platform

[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Google Gemini](https://img.shields.io/badge/Google_Gemini-API-4285F4?logo=google&logoColor=white)](https://ai.google.dev/)
[![Deployment](https://img.shields.io/badge/Deploy-Vercel-000000?logo=vercel&logoColor=white)](https://vercel.com/)

A1 ReadyCheck is a diagnostic web platform designed to help German language learners evaluate their true examination readiness before paying €100+ to book official **Goethe-Zertifikat A1 (Start Deutsch 1)** or **ÖSD Zertifikat A1** exams.

The platform couples a **12-question deterministic diagnostic assessment** across three foundational pillars with **Doro**, a personal A1 German learning companion powered by the **Google Gemini API**.

---

## 🚀 Live Demo & Repository
- **GitHub Repository:** `https://github.com/<your-username>/a1-readycheck`
- **Live Deployment:** Deployable to Vercel with one click.

---

## 🎯 The Problem & Our Solution

### The Problem
Thousands of learners finish beginner German courses and register for exams without knowing if they actually meet the official passing standard. Gaps in basic accusative articles, vowel-changing verbs, or notice reading lead to exam failures, wasted months of preparation, and lost booking fees.

### Our Solution
1. **12-Question Diagnostic:** 4 Vocabulary, 4 Grammar, and 4 Reading Comprehension questions modeling real Goethe/ÖSD formats.
2. **Deterministic Evaluation:** 100% mathematical client-side scoring logic. The LLM never touches, modifies, or overrides scores.
3. **Honest Readiness Categories:** Clear 4-tier classification (Strong, Almost There, Targeted Practice, Build Foundations) with an enforced skill-balance requirement ($\ge 3/4$ across *all* skills required for the top readiness tier).
4. **Doro AI Tutor:** An encouraging companion that explains grammar rules, breaks down test mistakes, and gives targeted drills without revealing test answers during active assessments.

---

## 🏛️ System Architecture

```
                                  +-------------------+
                                  |    A1 Learner     |
                                  +---------+---------+
                                            |
                                            v
                               +-------------------------+
                               | React + Vite + Tailwind |
                               +----+---------------+----+
                                    |               |
              +---------------------+               +---------------------+
              v                                                           v
+---------------------------+                               +---------------------------+
|     Assessment Engine     |                               |          Doro AI          |
|---------------------------|                               |---------------------------|
| • 12 CEFR A1 Questions    |                               | • In-Exam Anti-Leak Guard |
| • Prev/Next/Jump Pills    |                               | • Post-Exam Error Review  |
| • Deterministic Scoring   |                               | • Practice Exercise Gen   |
+-------------+-------------+                               +-------------+-------------+
              |                                                           |
              v                                                           v
+---------------------------+                               +---------------------------+
| Results & Recommendations |                               |  Serverless /api/doro.js  |
|---------------------------|                               |---------------------------|
| • Skill Breakdown /4      |                               | • Gemini API JSON Mode    |
| • Detailed Mistake Review |                               | • Knowledge Base Fallback |
| • Retake Session Reset    |                               +---------------------------+
+---------------------------+
```

---

## 📊 Core Diagnostic Assessment Design

| Skill Module | Focus Topics | Number of Questions |
| :--- | :--- | :---: |
| **Wortschatz (Vocabulary)** | Food & Drinks, Time/Daily Routine, Transport/City, Family | 4 Questions |
| **Grammatik (Grammar)** | Accusative articles (einen/den), Irregular verbs (*fahren*), Modal verbs (*können*), Prepositions (*zu Hause*) | 4 Questions |
| **Leseverstehen (Reading)** | Bakery opening hours notice, Party email invitation, Apartment rental ad, Train station track change | 4 Questions |

### 4-Tier Readiness Classification
- **10 – 12 Correct (with $\ge 3/4$ in all skills):** *Strong Practice Performance* — Well prepared for Goethe / ÖSD booking.
- **8 – 9 Correct (or 10-12 with an isolated skill gap):** *Almost There* — Solid base; focus 1–2 weeks on the weakest module.
- **5 – 7 Correct:** *Needs Targeted Practice* — High risk of exam failure; review grammar fundamentals before booking.
- **0 – 4 Correct:** *Build A1 Foundations* — Complete curriculum review needed.

---

## 🤖 Doro AI Capabilities & Guardrails

- **During Active Assessment:** Doro answers general learning questions, explains grammatical concepts, and provides study tips, but **strictly refuses to reveal active test solutions or letters**.
- **After Assessment:** Doro reviews every incorrect answer, explains the underlying linguistic rules, and generates personalized practice drills.
- **Offline / Resilient Fallback:** If `GEMINI_API_KEY` is not provided or the API is unreachable, Doro seamlessly falls back to a curated local knowledge base (`knowledge-base/*.json`), guaranteeing zero application crashes.

---

## 🛠️ Project Structure

```
Globio/
├── api/
│   └── doro.js                     # Node.js serverless function (Gemini API bridge)
├── knowledge-base/
│   ├── vocabulary.json             # Curated A1 vocabulary themes & dialogues
│   ├── grammar.json                # A1 grammar charts (Akkusativ, Modalverben)
│   └── reading.json                # A1 notice patterns & exam tips
├── public/
│   └── favicon.svg                 # Application favicon
├── src/
│   ├── components/
│   │   ├── Navbar.jsx              # Header with German flag motif & Doro toggle
│   │   ├── ProgressBar.jsx         # Question counter & 12 interactive jump pills
│   │   ├── QuestionCard.jsx        # MCQ question presenter with reading notices
│   │   ├── DoroChat.jsx            # Conversational AI assistant drawer
│   │   ├── SkillBreakdown.jsx      # Visual progress bars for Vocab, Grammar, Reading
│   │   └── RecommendationCard.jsx  # Actionable study plan cards
│   ├── context/
│   │   └── AssessmentContext.jsx   # State management (stages, answers, results)
│   ├── data/
│   │   └── questions.js            # 12 original A1 questions, keys & explanations
│   ├── pages/
│   │   ├── LandingPage.jsx         # Value proposition, trust badges, exam blueprint
│   │   ├── AssessmentPage.jsx      # Test container, validation & confirmation
│   │   └── ResultsPage.jsx         # Full readiness dashboard & mistake breakdown
│   ├── services/
│   │   ├── assessmentService.js    # Completion validation helpers
│   │   └── doroService.js          # Client bridge for /api/doro with fallback
│   ├── utils/
│   │   ├── scoring.js              # 100% deterministic scoring logic
│   │   └── recommendations.js      # Mistake-to-practice mapping engine
│   ├── App.jsx                     # View router & layout
│   ├── index.css                   # Tailwind imports & styles
│   └── main.jsx                    # React entrypoint
├── test/
│   ├── assessment_tests.mjs        # 7 unit tests for scoring & edge cases
│   ├── recommendations_tests.mjs   # Tests for practice mapping
│   └── doro_ai_tests.mjs           # Tests for AI guardrails & knowledge base
├── architecture.md                 # System architecture specification
├── PROBLEM_STATEMENT.md            # Product problem statement
├── vercel.json                     # Vercel deployment configuration
├── package.json                    # Dependencies and scripts
└── vite.config.js                  # Vite configuration
```

---

## 💻 Local Setup & Development

### 1. Clone & Install
```bash
git clone https://github.com/<your-username>/a1-readycheck.git
cd a1-readycheck
npm install
```

### 2. Configure Environment Variables (Optional)
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Add your Google Gemini API key:
```env
GEMINI_API_KEY=AIzaSy...
```
*(Note: If no API key is provided, the platform automatically runs in curated offline knowledge-base mode!)*

### 3. Run Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:5173`.

### 4. Run Automated Test Suite
```bash
# Run all unit and integration tests
node test/assessment_tests.mjs
node test/recommendations_tests.mjs
node test/doro_ai_tests.mjs
```

### 5. Build for Production
```bash
npm run build
```

---

## 🌐 Deploy to Vercel

1. Push your repository to GitHub.
2. Import the project in the [Vercel Dashboard](https://vercel.com/new).
3. Under **Environment Variables**, add:
   - `GEMINI_API_KEY`: Your Google Gemini API key.
4. Click **Deploy**. Vercel will automatically build the React Vite frontend and serve `/api/doro` as a serverless function.

---

## ⚖️ Diagnostic Disclaimer
*A1 ReadyCheck is an independent diagnostic learning tool. It is not affiliated with, endorsed by, or administered by the Goethe-Institut or the ÖSD. Assessment results indicate diagnostic readiness and do not guarantee official examination success.*

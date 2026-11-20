# A1 ReadyCheck (v2.0.0) — Product Validation Note & Submission Dossier

**Product:** A1 ReadyCheck  
**Version:** 2.0.0 (Four-Skill Diagnostic Platform)  
**Target Exams:** Goethe-Zertifikat A1 (Start Deutsch 1) & ÖSD Zertifikat A1  
**Sprint Time Limit:** Four-Hour MVP Sprint (240 Minutes) — Fully Executed  

---

## 1. Executive Summary & Problem Validation

### The Core Problem
Each year, tens of thousands of German learners complete A1-level courses or self-study apps (Duolingo, Babbel, textbooks) and register for official Goethe-Institut or ÖSD examinations (€100–€160). 

Speaking is the number one source of examination anxiety and failure:
1. **Uncalibrated Speaking Ability:** Learners practice reading and multiple choice on apps, but freeze during the live 15-minute oral examination (*Sprechen Teil 1, 2, 3*).
2. **Grammar & Lexical Gaps:** Key rules such as masculine accusative articles (*einen/den*), stem vowel changes (*fahren -> du fährst*), and modal verb sentence brackets cause fatal point deductions.
3. **Absence of Actionable Guidance:** When learners struggle, generic chatbots provide long, unverified advice without a structured diagnostic foundation.

### The Solution: A1 ReadyCheck v2.0.0
A1 ReadyCheck delivers an objective, 10-minute diagnostic assessment across **Vocabulary, Grammar, Reading, and Speaking** that couples deterministic scoring for objective items with an AI-assisted 4-dimension rubric for spoken responses.

---

## 2. 4-Skill Assessment Design & Task Mapping

The 12 assessment tasks directly mirror official Goethe-Zertifikat A1 and ÖSD Zertifikat A1 modules:

| # | Skill | Sub-Topic | Exam Section | Format & Scoring |
| :---: | :--- | :--- | :--- | :--- |
| **Task 1** | Wortschatz | Food & Drinks (*Kaffee*) | Wortschatz | Deterministic MCQ (1 pt) |
| **Task 2** | Wortschatz | Daily Routine (*aufhören*) | Wortschatz | Deterministic MCQ (1 pt) |
| **Task 3** | Wortschatz | Transport & City (*Bahnhof*) | Wortschatz | Deterministic MCQ (1 pt) |
| **Task 4** | Grammatik | Accusative Case (*einen Tisch*) | Grammatik | Deterministic MCQ (1 pt) |
| **Task 5** | Grammatik | Strong Verbs (*Fährst du...*) | Grammatik | Deterministic MCQ (1 pt) |
| **Task 6** | Grammatik | Modal Verbs (*sie kann... kommen*) | Grammatik | Deterministic MCQ (1 pt) |
| **Task 7** | Leseverstehen | Bakery Hours (*07:00-13:00*) | Lesen Teil 1 | Deterministic MCQ (1 pt) |
| **Task 8** | Leseverstehen | Party Invitation (*Getränke*) | Lesen Teil 2 | Deterministic MCQ (1 pt) |
| **Task 9** | Leseverstehen | Platform Notice (*Gleis 7*) | Lesen Teil 3 | Deterministic MCQ (1 pt) |
| **Task 10** | Sprechen | Self-Introduction (*Name, Land, Sprachen*) | Sprechen Teil 1 | Voice recording + Rubric (0–3 pts) |
| **Task 11** | Sprechen | Ordering in a Café (*Kaffee bestellen, zahlen*) | Sprechen Teil 2 | Voice recording + Rubric (0–3 pts) |
| **Task 12** | Sprechen | Weekend Hobbies (*Freizeitaktivitäten*) | Sprechen Teil 3 | Voice recording + Rubric (0–3 pts) |

---

## 3. Speaking Evaluation Rubric (4 Dimensions)

Spoken responses are evaluated against a predefined CEFR A1 rubric:
1. **Task Relevance (30%):** Does the response address the specific prompt?
2. **Grammar & Word Order (30%):** Are conjugated verbs in position 2? Are modal brackets respected?
3. **A1 Vocabulary (25%):** Are appropriate CEFR A1 words used?
4. **Response Completeness (15%):** Does the learner communicate 2-3 full communicative sentences?

The 3 speaking prompt scores (0 to 3 each) are averaged to produce the final **Speaking Skill Score out of 3.0**.

---

## 4. Scoring Formulas & Readiness Classification

### Formula
$$\text{Overall Percentage} = \left(\frac{\text{Vocab (3)} + \text{Grammar (3)} + \text{Reading (3)} + \text{Speaking (3)}}{12}\right) \times 100$$

### 4-Tier Classification Matrix
- **$\ge 85\%$ Score:** *Strong Practice Performance* — **Condition:** Requires $\ge 50\%$ (at least 1.5/3) in *every* individual skill.
- **70% – 84% Score (or $\ge 85\%$ with a sub-50% skill):** *Almost There* — Solid base; focus on the weakest module.
- **50% – 69% Score:** *Needs Targeted Practice* — Noticeable gaps in grammar or speaking.
- **$< 50\%$ Score:** *Build A1 Foundations* — Comprehensive review needed.

---

## 5. Automated Verification Results

All 4 automated test suites passed with 100% success:
- **`test/assessment_tests.mjs`:** 7/7 tests passed (All correct, all incorrect, mixed scores, sub-50% skill balance downgrade, incomplete validation).
- **`test/speaking_rubric_tests.mjs`:** Verified high-quality A1 responses, ordering responses, empty voice responses, and dimensional breakdown.
- **`test/recommendations_tests.mjs`:** Verified practice mapping across all 4 skills.
- **`test/doro_ai_tests.mjs`:** Verified active exam anti-leakage guardrails and serverless endpoints.
- **`npm run build`:** Production Vite bundle built with zero errors and zero vulnerabilities.

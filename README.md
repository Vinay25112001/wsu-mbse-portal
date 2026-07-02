# WSU CEG/EGR 7800 — Model-Based Systems Engineering
## Academic Web Portal · Wright State University · College of Engineering and Computer Science

[![GitHub Pages](https://img.shields.io/badge/Deployed-GitHub%20Pages-026937?style=flat-square&logo=github)](https://pages.github.com)
[![SysML 1.7](https://img.shields.io/badge/Standard-OMG%20SysML%201.7-C9A227?style=flat-square)](https://www.omg.org/spec/SysML/1.7)
[![SysML v2](https://img.shields.io/badge/Standard-OMG%20SysML%20v2.0%20(June%202025)-026937?style=flat-square)](https://www.omg.org/spec/SysML/2.0)
[![INCOSE](https://img.shields.io/badge/Reference-INCOSE%20SE%20Handbook%20v5-4a90d9?style=flat-square)](https://www.incose.org/products-and-publications/se-handbook)
[![License](https://img.shields.io/badge/License-MIT-5aad7a?style=flat-square)](LICENSE)

---

## 🚀 Live Portal

> **Deploy to GitHub Pages** — see [Deployment Guide](#-deployment-to-github-pages) below.  
> **Local use** — unzip `wsu-mbse-portal-final-v2.zip`, open `index.html` in any modern browser. No server required.

---

## 📋 Course Overview

**Course Code:** CEG/EGR 7800  
**Title:** Model-Based Systems Engineering  
**Credits:** 3 credit hours  
**Level:** Graduate / Advanced Undergraduate  
**Institution:** Wright State University, Fairborn, Ohio  
**College:** College of Engineering and Computer Science  
**Modality:** In-person lecture with self-paced digital portal supplement  

### Course Description

CEG/EGR 7800 is a graduate-level course in Model-Based Systems Engineering (MBSE) grounded in the OMG SysML 1.7 standard (ISO/IEC 19514:2017), the INCOSE Systems Engineering Handbook v5, and ARP 4761A safety analysis practice. Students progress from foundational systems thinking through advanced architecture modeling, parametric analysis, safety analysis, digital thread architecture, and the SysML v2 transition — applying every concept to two running case studies: the **Autonomous Warehouse Robot Fleet (AWRF)** and a **hybrid tilt-rotor eVTOL air-taxi aircraft**. The course culminates in a Capstone Portfolio Defense structured as a simulated Preliminary Design Review before a faculty and industry panel.

---

## 📚 Curriculum Structure — 30 Lectures

### Unit 1: Foundations (Lectures 1–4)

| Lecture | Title | Key Topics |
|---------|-------|-----------|
| L1 | Foundations of Systems Architecture & The Mathematical Imperative for MBSE | Emergent behavior, MBSE definition, 9 SysML diagram types, eVTOL MTOW snowball case study (1,722 kg vs 2,969 kg), INCOSE lifecycle |
| L2 | Systems Thinking, Stakeholder Analysis & Conceptual Architecture | INCOSE 5-class stakeholder taxonomy, CONOPS walkthrough (AWRF), problem-framing vs solution-framing, logical vs physical architecture |
| L3 | Requirements Engineering for MBSE | INCOSE well-formed requirements, shall syntax, SysML Requirements Diagram, derive/refine/trace/satisfy/verify relationships, RVM |
| L4 | MBSE Workflow, Method & Repository Discipline | OOSEM vs MagicGrid vs Harmony-SE, model baselines, digital thread, naming conventions, model quality gates |

### Unit 2: Structure (Lectures 5–7)

| Lecture | Title | Key Topics |
|---------|-------|-----------|
| L5 | Package Diagrams & Model Architecture | Namespace, visibility, import/access/merge, model libraries, package ownership, team collaboration |
| L6 | Block Definition Diagrams | Block types, composition/aggregation/association/generalization, multiplicity, value properties, ports, IBD connection |
| L7 | Internal Block Diagrams & Interface Modeling | IBD vs BDD, interface blocks, item flows, typed ports, connector semantics, ICD formal representation |

### Unit 3: Behavior (Lectures 8–12)

| Lecture | Title | Key Topics |
|---------|-------|-----------|
| L8 | Requirements Diagrams & Traceability Engineering | Traceability coverage metrics, orphan detection, change impact analysis, derivation/allocation/verification coverage |
| L9 | Use Case Diagrams & Operational Behavior | Actor taxonomy, system boundary, include/extend, use case descriptions, alternate and exception flows |
| L10 | Activity Diagrams & Functional Flow | Fork/join/decision nodes, swim lane allocation, object nodes, functional decomposition, guard conditions |
| L11 | Sequence Diagrams & Interaction Design | Lifelines, synchronous/asynchronous messages, combined fragments (alt/opt/loop/par), activation bars |
| L12 | State Machine Diagrams & Lifecycle Behavior | Composite states, guard conditions, entry/exit actions, safe-stop reachability, safety interlocks |

### Unit 4: Analysis (Lectures 13–16)

| Lecture | Title | Key Topics |
|---------|-------|-----------|
| L13 | Parametric Diagrams & Engineering Analysis | Constraint blocks, binding connectors, MTOW snowball parametric solution, unit value types, SysML model library |
| L14 | MATLAB/Simulink Integration with SysML Parametrics | SysML-MATLAB digital thread, convergence solver, iterative MTOW = 2,969 kg replication, sensitivity analysis |
| L15 | Trade Study Architecture & Multi-Criteria Decision Analysis | Weighted Sum Model, AHP, Pugh matrix, criterion weighting, trade study documentation in SysML |
| L16 | Design Space Exploration & Sensitivity Analysis | Monte Carlo uncertainty quantification, Pareto frontier, normalized sensitivity indices, 1,000-sample analysis |

### Unit 5: Verification (Lectures 17–20)

| Lecture | Title | Key Topics |
|---------|-------|-----------|
| L17 | Verification & Validation Planning in MBSE | V&V plan, AIDT methods, verification event types, V&V plan as model view |
| L18 | ARP 4761A Safety Analysis & Fault-Propagation Modeling | FHA severity levels, catastrophic probability thresholds (10⁻⁹/flt hr), FTA top event, SysML safety integration |
| L19 | FHA, FTA & FMEA Integration with SysML | Minimal cut sets, RPN calculation, SIL allocation, IEC 62061 vs ISO 13849, safety case architecture |
| L20 | Requirements Verification Matrix & Evidence Chains | Four-link traceability chain, evidence record status, qualification review data package |

### Unit 6: Digital Thread (Lectures 21–24)

| Lecture | Title | Key Topics |
|---------|-------|-----------|
| L21 | Digital Thread Architecture & Model Continuity | DoD Digital Engineering Strategy, 6-environment AWRF digital thread, API interface types |
| L22 | **SysML v2 Transition: Concepts & Migration Strategy** | **KerML 1.0, SysML v2.0, API 1.0 (formally adopted OMG 30 June 2025)**, textual notation, part def, Jupyter kernel, 3-phase migration |
| L23 | MBSE Tool Ecosystems: Cameo, Rhapsody & Papyrus | Tool comparison, MagicGrid vs OOSEM, license models, XMI portability, SysML v2 API server |
| L24 | Model Governance, Baseline Management & Version Control | ECP process, model rot prevention, package ownership, Git branching strategy, Teamwork Cloud |

### Unit 7: Capstone Case Studies (Lectures 25–30)

| Lecture | Title | Key Topics |
|---------|-------|-----------|
| L25 | Hybrid eVTOL Tilt-Rotor Architecture — Part I | 5-subsystem BDD, tilt mechanism complexity, hover-to-forward transition sequence, parametric MTOW |
| L26 | Hybrid eVTOL Tilt-Rotor Architecture — Part II | DO-178C DAL A, FTA quantitative closure (3.2×10⁻¹⁰/flt hr), qualification test matrix from MBSE |
| L27 | Autonomous Drone Swarm Systems Architecture | Emergent behavior, artificial potential functions, consensus protocol, multi-agent BDD, swarm parametric |
| L28 | Small Satellite MBSE: Power, ADCS & Communications | CubeSat 6U constraints, power balance equation, link budget, ADCS disturbance torque, eclipse survival |
| L29 | Human-Autonomy Teaming & Cognitive Safety Architecture | Authority allocation, situation awareness, cognitive workload metric, SIL 2 for safety zone, HAT mode transitions |
| L30 | **Capstone Defense: MBSE Portfolio Review** | PDR simulation, model quality metrics, digital thread completeness, 3-track final project defense |

---

## 🎓 Assessment Architecture

### Grade Breakdown (300 Total Points)

| Assessment | Points | % | Description |
|-----------|--------|---|-------------|
| Weekly Assignments (×30) | 150 | 50% | 30 assignments × 5 pts — one per lecture, submitted via WSU Pilot LMS |
| Weekly MCQ Quizzes (×30) | 30 | 10% | 30 quizzes × 5 questions × 1 pt — auto-graded, closes Sunday 11:59 PM |
| Mini Project 1 | 30 | 10% | AWRF Requirements & Architecture (due end of Week 8) |
| Mini Project 2 | 30 | 10% | eVTOL Parametric Sizing Study (due end of Week 17) |
| Midterm Exam | 30 | 10% | Week 15 — 90 min, open-note, covers Lectures 1–14 |
| Final Project (Capstone) | 60 | 20% | Portfolio defense Week 30 — 3 track options |
| **TOTAL** | **300** | **100%** | |

### Grade Scale

| Grade | Points | Percentage |
|-------|--------|-----------|
| A (Excellent) | 270–300 | 90–100% |
| B (Good) | 240–269 | 80–89% |
| C (Satisfactory) | 210–239 | 70–79% |
| D (Poor) | 180–209 | 60–69% |
| F (Fail) | < 180 | < 60% |

**Late Penalty:** 10 points per calendar day. No submissions accepted more than 5 calendar days after the due date.

---

## 📐 Mini Projects

### Mini Project 1 — AWRF System Requirements Definition & Structural Architecture
**Due:** End of Week 8 (30 points)

Integrates Lectures 1–7. Students produce a complete INCOSE-compliant requirements set and two-level SysML structural architecture model for the Autonomous Warehouse Robot Fleet.

**Deliverables:**
- Stakeholder Register (5 INCOSE classes, ≥8 entries)
- ≥20 well-formed system requirements (shall syntax, verification method, traceability)
- Block Definition Diagram (fleet level, ≥5 subsystem blocks, correct multiplicity)
- Internal Block Diagram (AMR internal, typed ports, ≥5 item-flow connectors)
- Requirements Diagram (5 complete four-link traceability chains)
- 10-page IEEE-format technical report

**Tool:** CATIA Magic 2024x (preferred) or Eclipse Papyrus or IBM Rhapsody  
**Submission:** `LASTNAME_FIRSTNAME_MP1_AWRF.zip` via WSU Pilot LMS

---

### Mini Project 2 — eVTOL Parametric Sizing Study & Verification Planning
**Due:** End of Week 17 (30 points)

Integrates Lectures 9–16. Students implement the MATLAB-MBSE integrated sizing parametric diagram, replicate the MTOW convergence (1,722 kg → 2,969 kg), and produce a complete Requirements Verification Matrix.

**Deliverables:**
- SysML Parametric Diagram (HoverPowerCalc + BatterySizing + MassRollup with binding connectors)
- MATLAB convergence script (target: 2,969 kg ±5%, convergence plot)
- Sensitivity analysis (≥5 design variables, normalized indices)
- Monte Carlo analysis (1,000 samples, mean/std/95th percentile)
- Trade study (3 battery chemistries × 4 criteria, Weighted Sum Model)
- Requirements Verification Matrix (10 requirements, 100% coverage)
- 12-page IEEE-format technical report

**Tool:** MATLAB R2024a (WSU university license) + CATIA Magic  
**Reference:** Sirigireddy, V. K. R., & Ahner, D. K. (2025). CJOA-D-26-01673 [Under Review, Chinese Journal of Aeronautics]

---

## 📝 Midterm Exam

**Week 15 | 90 minutes | Open-note (personal notes only) | No internet | No AI tools**

**Coverage:** Lectures 1–14  
**Total:** 50 points

| Section | Format | Points |
|---------|--------|--------|
| A | 20 Multiple Choice (SysML notation, INCOSE process, AWRF case study) | 20 |
| B | 3 Short Answer (typed ports, traceability coverage, requirements authoring) | 15 |
| C | 2 Diagram Interpretation (IBD interface error, activity diagram correction) | 15 |

**Study Guide Highlights:**
- SysML five requirement relationships (derive/refine/trace/satisfy/verify) — arrow directions are testable
- INCOSE five-class stakeholder taxonomy with AWRF examples
- eVTOL MTOW: 1,722 kg (document-centric) vs 2,969 kg (MBSE parametric) — 72.4% underestimate
- ForkNode vs DecisionNode semantics — guaranteed question
- MagicGrid 3×3 matrix diagram type assignments

---

## 🏆 Final Project — Capstone Portfolio Defense

**Week 30 | 15-minute oral defense + 5-minute Q&A | 60 points**

Structured as a simulated Preliminary Design Review before a faculty and industry panel.

### Track A — AWRF Full Lifecycle Model
Complete the AWRF model with ≥25 requirements, full traceability, BDD (2 levels), IBD, use case diagram (≥10 use cases), activity diagram with swim lanes, state machine (AMR lifecycle), parametric fleet sizing, FHA summary, RVM (100% coverage).

### Track B — Hybrid eVTOL Tilt-Rotor Safety-Critical Architecture
BDD (system + propulsion + power), IBD (power architecture), parametric MTOW convergence, use case diagram (5 mission scenarios), state machine (transition sequence with safety interlocks), ARP 4761A FHA (top 3 hazards), FTA (loss-of-thrust-control), RVM (20 requirements).

### Track C — CubeSat 6U Mission Architecture *(SysML 1.7 + v2 comparison)*
BDD (EPS + ADCS + COMMS), IBD (power bus), parametric power balance (eclipse survival), link budget (downlink + uplink), 15 requirements, RVM (100% coverage). Cross-reference with [`CubesatExample.ipynb`](https://github.com/Open-MBEE/SysML-v2-Applications-and-Examples).

---

## 🔧 Portal Architecture

```
wsu-mbse-portal/
├── index.html          # Application shell — 1,784 lines, WSU green theme
├── lecture1.js         # Foundations — full academic content, 5 SVG diagrams
├── lecture2.js         # Stakeholder Analysis — full content, 4 SVG diagrams  
├── lecture3.js – 10.js # Foundation/Structure/Behavior — 3 SVG diagrams each
├── lecture11.js–21.js  # Analysis/Verification/Digital Thread
├── lecture22.js        # SysML v2 Transition — 328 lines, 4 SVG diagrams, 40 GitHub refs
├── lecture23.js–30.js  # Capstone case studies
└── README.md           # This file
```

### Design Principles
- **Zero dependencies** — no Node.js, no npm, no CDN, no server. Pure HTML + vanilla JS.
- **Decoupled data** — each `lectureN.js` registers itself via `window.registerLecture(N, data)`. Drop new files in and they load automatically.
- **WSU branding** — `#026937` green topbar matching wright.edu; `#C9A227` gold accents; `#f4f5f6` warm grey background.

### Per-Lecture Data Schema

Every `lectureN.js` exports an object with these keys:

```javascript
{
  meta:             { id, week, unit, title, duration, difficulty, objectives[], commonErrors[] },
  content:          [{ heading, paragraphs[], callout?, equations?, subsections? }],
  references:       ['...'],          // Full bibliographic citations with URLs
  schemaVisualizer: [{                // ≥3 cards per lecture with hand-authored SVGs
    category, name, diagramType,
    shortDesc, fullDesc,
    notation[], example,
    svgMarkup                         // Inline SVG, dark theme, WSU colors
  }],
  playground:       { title, instructions, objectives[], palette[], defaultBlocks[] },
  quiz:             { questions: [{ question, options[], correct, explanation }] },
  weeklyMCQ:        { points, closesDay, instructions, questions[] },  // 5 graded questions
  miniProject:      { ... },          // MP1 at L8, MP2 at L17, progress notes elsewhere
  midtermExam:      { ... },          // L15 only — full exam specification
  finalProject:     { ... },          // L30 only — 3-track capstone specification
  assignment:       { title, brief, deliverables[], rubric[], gradingNotes[] },
  courseMeta:       { gradeBreakdown, gradeScale, latePenalty, academicIntegrity }
}
```

---

## 📖 Authoritative References

### Primary Standards
- **INCOSE SE Handbook v5** (2023) — Systems Engineering Handbook, Version 5. International Council on Systems Engineering.
- **OMG SysML 1.7** — OMG Systems Modeling Language v1.7 Specification. formal/19-11-01. ISO/IEC 19514:2017. https://www.omg.org/spec/SysML/1.7
- **OMG KerML 1.0** — Kernel Modeling Language, Version 1.0. Formally adopted 30 June 2025. https://www.omg.org/spec/KerML/1.0
- **OMG SysML v2.0** — Systems Modeling Language v2.0. Formally adopted 30 June 2025. https://www.omg.org/spec/SysML/2.0
- **OMG API 1.0** — Systems Modeling API and Services v1.0. Formally adopted 30 June 2025. https://www.omg.org/spec/SystemsModelingAPI/1.0
- **ARP 4761A** (2023) — SAE Aerospace Recommended Practice: Safety Assessment Process Guidelines.
- **IEEE Std 29148-2018** — Systems and Software Engineering — Requirements Engineering.

### GitHub Repositories (Authoritative Sources)

| Repository | Description | License |
|-----------|-------------|---------|
| [`Systems-Modeling/SysML-v2-Release`](https://github.com/Systems-Modeling/SysML-v2-Release) | OMG SysML v2 specifications, model libraries, Eclipse + Jupyter installers. Latest: 2026-04 (May 2026). | EPL-2.0 |
| [`Systems-Modeling/SysML-v2-Pilot-Implementation`](https://github.com/Systems-Modeling/SysML-v2-Pilot-Implementation) | Eclipse Xtext reference implementation, Jupyter kernel, PlantUML visualization. 85 releases, 4,786 commits. | EPL-2.0 |
| [`Open-MBEE/SysML-v2-Applications-and-Examples`](https://github.com/Open-MBEE/SysML-v2-Applications-and-Examples) | Worked SysML v2 Jupyter notebooks: BallAndChain, CubesatExample, spacecraft-example, Modeling-in-Time-And-Space. | Apache-2.0 |

> **Critical Note:** SysML v2 was **formally adopted by OMG on 30 June 2025** — not March 2024 (which was an intermediate milestone). The authoritative source is the README of the SysML-v2-Release repository.

### Core Textbooks
- Friedenthal, S., Moore, A., & Steiner, R. (2015). *A Practical Guide to SysML* (3rd ed.). Morgan Kaufmann / OMG Press.
- Delligatti, L. (2014). *SysML Distilled*. Addison-Wesley.
- Kossiakoff, A., Seymour, S., Flanigan, D., & Hutchison, W. (2011). *Systems Engineering Principles and Practice* (2nd ed.). Wiley.
- Wiegers, K., & Beatty, J. (2013). *Software Requirements* (3rd ed.). Microsoft Press.

### Research — Wright State University
- Sirigireddy, V. K. R., & Ahner, D. K. (2025). A MATLAB-MBSE Integrated Sizing Framework for eVTOL Aircraft. [Under Review, *Chinese Journal of Aeronautics*, CJOA-D-26-01673]. *(The eVTOL MTOW case study used throughout Lectures 1, 13, 14, 25–26.)*
- Sirigireddy, V. K. R., & Ahner, D. K. (2025). Human-Autonomy Teaming Cognitive Safety Architecture. [Under Review, *Reliability Engineering and System Safety*]. *(The HAT architecture case study used in Lecture 29.)*

---

## 🌐 Deployment to GitHub Pages

### Prerequisites
- A GitHub account (free)
- Git installed on your computer — download from https://git-scm.com
- The deployment zip: `wsu-mbse-portal-final-v2.zip`

---

### Step 1 — Extract the Portal Files

Unzip `wsu-mbse-portal-final-v2.zip` on your computer. You will have:
```
wsu-mbse-portal/
├── index.html
├── lecture1.js ... lecture30.js
└── README.md
```

---

### Step 2 — Create a New GitHub Repository

1. Go to https://github.com and sign in.
2. Click the **+** icon (top-right) → **New repository**.
3. Fill in:
   - **Repository name:** `wsu-mbse-portal` (or any name you prefer)
   - **Description:** `WSU CEG/EGR 7800 — Model-Based Systems Engineering Course Portal`
   - **Visibility:** Public *(GitHub Pages requires Public on free accounts)*
   - **Initialize this repository with:** ✅ Add a README file ← uncheck this; you have your own
4. Click **Create repository**.

---

### Step 3 — Push the Portal Files to GitHub

Open a terminal (Mac/Linux) or Git Bash (Windows) and run these commands one by one:

```bash
# 1. Navigate to your extracted portal folder
cd path/to/wsu-mbse-portal

# 2. Initialize a git repository
git init

# 3. Add all files
git add .

# 4. Commit with a descriptive message
git commit -m "Initial release: WSU CEG/EGR 7800 MBSE Portal — 30 lectures, full assessment architecture"

# 5. Connect to your GitHub repository
#    Replace YOUR-USERNAME with your GitHub username
git remote add origin https://github.com/YOUR-USERNAME/wsu-mbse-portal.git

# 6. Rename the default branch to 'main'
git branch -M main

# 7. Push to GitHub
git push -u origin main
```

> **Authentication:** GitHub will prompt for your credentials. Use a **Personal Access Token** (not your password). Create one at: GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic) → Generate new token → select `repo` scope.

---

### Step 4 — Enable GitHub Pages

1. Go to your repository on GitHub: `https://github.com/YOUR-USERNAME/wsu-mbse-portal`
2. Click the **Settings** tab (top of the repository).
3. In the left sidebar, click **Pages**.
4. Under **Source**, select:
   - **Branch:** `main`
   - **Folder:** `/ (root)`
5. Click **Save**.
6. GitHub will display a green banner: *"Your site is published at `https://YOUR-USERNAME.github.io/wsu-mbse-portal/`"*
7. Wait 1–3 minutes for the first deployment to complete.

---

### Step 5 — Verify Deployment

Open your browser and go to:
```
https://YOUR-USERNAME.github.io/wsu-mbse-portal/
```

You should see the WSU MBSE Portal with the dark green navigation bar. Click any lecture in the sidebar — the content, schema diagrams, playground, quiz, and weekly MCQ should all load correctly.

**If the page is blank:** Wait another 2 minutes and hard-refresh (Ctrl+Shift+R / Cmd+Shift+R).  
**If lectures do not load:** Open browser DevTools (F12) → Console tab — look for any red errors.

---

### Step 6 — Update the Portal (Adding Future Lectures or Fixes)

```bash
# Make your changes to the files, then:
git add .
git commit -m "Update: [describe what you changed]"
git push origin main
```

GitHub Pages automatically redeploys within 1–3 minutes after every push.

---

### Optional: Custom Domain (e.g., mbse.wright.edu)

If Wright State IT provides a custom subdomain:

1. In your repository, create a file named `CNAME` containing only your domain:
   ```
   mbse.wright.edu
   ```
2. Push the CNAME file to GitHub.
3. Ask WSU IT to create a DNS CNAME record pointing `mbse.wright.edu` → `YOUR-USERNAME.github.io`.
4. In GitHub Pages settings, enter the custom domain and enable HTTPS.

---

### Repository Structure After Deployment

```
wsu-mbse-portal/          ← GitHub repository root
├── index.html            ← Portal shell (served as the homepage)
├── lecture1.js           ← L1 data (loaded on demand)
├── lecture2.js           ← L2 data
│   ...
├── lecture30.js          ← L30 data
└── README.md             ← This file (displays on GitHub repository page)
```

GitHub Pages serves `index.html` as the root page. The `lectureN.js` files are fetched by the portal's dynamic script loader — no build step, no framework, no configuration files needed.

---

## 🛠 Local Development

```bash
# Option 1: Python (fastest, built-in on macOS/Linux)
cd wsu-mbse-portal
python3 -m http.server 8000
# Then open: http://localhost:8000

# Option 2: Node.js
npx serve .
# Then open the URL shown in terminal

# Option 3: VS Code Live Server extension
# Right-click index.html → Open with Live Server
```

Opening `index.html` directly as a `file://` URL will fail to load the `lectureN.js` files in most browsers due to CORS restrictions. Always use a local server for development.

---

## 🎨 Customization

### Adding a New Lecture
Create a new file `lecture31.js` following the existing schema and add it to the repository. The portal automatically discovers it via `window.registerLecture(31, data)`.

### Updating Course Content
Edit any `lectureN.js` file, commit, and push. The portal loads the updated file on the next page visit.

### Changing the WSU Theme Colors
In `index.html`, search for `#026937` (WSU green) and `#C9A227` (WSU gold) to find all themed elements. Modify to match your institution's brand guidelines.

---

## 📄 License

This portal is released under the MIT License. See [LICENSE](LICENSE) for details.

Course content, assessment specifications, and case study materials are the intellectual property of Wright State University and the contributing faculty. The eVTOL sizing framework case study is based on original research by Sirigireddy & Ahner (2025).

SysML v2 specifications and the Pilot Implementation are © Object Management Group, licensed under EPL-2.0.  
Open-MBEE example notebooks are licensed under Apache-2.0.

---

## 📬 Contact

**Graduate Research Assistant:** Vinay Kumar Reddy Sirigireddy  
**Email:** sirigireddyvinaykumarreddy@gmail.com  
**Program:** M.S. Aerospace Systems Engineering, Wright State University  
**Faculty Advisor:** Dr. Darryl K. Ahner, Dean, College of Engineering and Computer Science

---

*Portal generated July 2026. SysML v2 adoption date: 30 June 2025 (OMG formal adoption). Latest pilot implementation: 2026-04. All three GitHub repositories verified as of July 2026.*

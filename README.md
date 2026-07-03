# Model-Based Systems Engineering
## Academic Web Portal · Wright State University · College of Engineering and Computer Science

[![SysML 1.7](https://img.shields.io/badge/Standard-OMG%20SysML%201.7-C9A227?style=flat-square)](https://www.omg.org/spec/SysML/1.7)
[![SysML v2](https://img.shields.io/badge/SysML%20v2-Adopted%2030%20June%202025-026937?style=flat-square)](https://www.omg.org/spec/SysML/2.0)
[![INCOSE](https://img.shields.io/badge/Reference-INCOSE%20SE%20Handbook%20v5-4a90d9?style=flat-square)](https://www.incose.org)
[![License](https://img.shields.io/badge/License-MIT-5aad7a?style=flat-square)](LICENSE)

---

## Overview

This is a fully self-contained, interactive web portal for a graduate-level Model-Based Systems Engineering course at Wright State University. It requires no server, no framework, and no build step — open `index.html` in any modern browser and the full 30-lecture course is immediately accessible.

Every lecture delivers content visually through cards, chips, and callout boxes rather than long paragraphs. Students interact with a live SysML drag-and-drop canvas, take auto-graded knowledge checks, and track their progress through structured objectives.

---

## Course Description

A graduate course in Model-Based Systems Engineering grounded in the OMG SysML 1.7 standard (ISO/IEC 19514:2017), the INCOSE Systems Engineering Handbook v5, and ARP 4761A safety analysis practice. Students develop professional competency in the complete MBSE workflow — from stakeholder analysis and requirements engineering through structural and behavioral modeling, parametric analysis, safety analysis, and digital thread architecture.

Two running case studies are applied throughout the full 30 lectures:

- **Autonomous Warehouse Robot Fleet (AWRF)** — a fleet of autonomous mobile robots operating in a large-scale distribution center, covering all five INCOSE stakeholder classes, safety integrity level requirements, and operational CONOPS.
- **Hybrid Tilt-Rotor eVTOL Air-Taxi** — an urban air mobility aircraft whose MTOW sizing parametric chain (1,722 kg document-centric vs. 2,969 kg MBSE-parametric) is the anchoring demonstration of why model-based practice matters quantitatively.

---

## What Students Experience

### Visual, Not Textual
Content is delivered through numbered objective chips, color-coded callout boxes, warning cards for common mistakes, and clickable reference links — not walls of text.

### Fully Interactive Playground
Each lecture includes a live SysML canvas where students:
- **Drag** model elements from a typed palette onto the canvas
- **Drop** anywhere to place them (or drag directly from palette)
- **Port-click** on any node to initiate a typed connection
- **Choose the relationship type** — Association, Composition ◆, Aggregation ◇, Generalization, «derive», «satisfy», «verify», «include», «extend» — before connecting
- **See color-coded lines** drawn automatically with correct notation (dashed for dependency stereotypes, solid for structural)
- **Track objectives** — checkboxes mark off as connections are made
- **Export SVG** of the completed diagram for submission
- **Delete nodes**, **clear connections**, or **reset** the canvas

### Schema Visualizer
Every lecture provides a gallery of SysML diagram cards. Each card shows a live SVG diagram preview. Clicking a card expands a full panel with the complete notation guide, engineering example, and side-by-side diagram view.

### Knowledge Check Quiz
Five rigorous questions per lecture, auto-graded with detailed explanations. Progress is saved to local storage so students can return mid-session.

### Assessment Architecture
Weekly MCQ quizzes (auto-graded), two mini projects, a midterm exam, and a capstone portfolio defense are all specified within the portal — complete with deliverable lists, rubrics, and grading notes.

---

## Curriculum — 30 Lectures

### Unit 1: Foundations
| # | Title |
|---|-------|
| 1 | Foundations of Systems Architecture & The Mathematical Imperative for MBSE |
| 2 | Systems Thinking, Stakeholder Analysis & Conceptual Architecture |
| 3 | Requirements Engineering for MBSE |
| 4 | MBSE Workflow, Method & Repository Discipline |

### Unit 2: Structure
| # | Title |
|---|-------|
| 5 | Package Diagrams & Model Architecture |
| 6 | Block Definition Diagrams |
| 7 | Internal Block Diagrams & Interface Modeling |

### Unit 3: Behavior
| # | Title |
|---|-------|
| 8  | Requirements Diagrams & Traceability Engineering |
| 9  | Use Case Diagrams & Operational Behavior |
| 10 | Activity Diagrams & Functional Flow |
| 11 | Sequence Diagrams & Interaction Design |
| 12 | State Machine Diagrams & Lifecycle Behavior |

### Unit 4: Analysis
| # | Title |
|---|-------|
| 13 | Parametric Diagrams & Engineering Analysis |
| 14 | MATLAB/Simulink Integration with SysML Parametrics |
| 15 | Trade Study Architecture & Multi-Criteria Decision Analysis |
| 16 | Design Space Exploration & Sensitivity Analysis |

### Unit 5: Verification
| # | Title |
|---|-------|
| 17 | Verification & Validation Planning in MBSE |
| 18 | ARP 4761A Safety Analysis & Fault-Propagation Modeling |
| 19 | FHA, FTA & FMEA Integration with SysML |
| 20 | Requirements Verification Matrix & Evidence Chains |

### Unit 6: Digital Thread
| # | Title |
|---|-------|
| 21 | Digital Thread Architecture & Model Continuity |
| 22 | SysML v2 Transition: Concepts, Architecture & Migration Strategy |
| 23 | MBSE Tool Ecosystems: Cameo, Rhapsody & Papyrus |
| 24 | Model Governance, Baseline Management & Version Control |

### Unit 7: Capstone Case Studies
| # | Title |
|---|-------|
| 25 | Hybrid eVTOL Tilt-Rotor Architecture — Part I |
| 26 | Hybrid eVTOL Tilt-Rotor Architecture — Part II |
| 27 | Autonomous Drone Swarm Systems Architecture |
| 28 | Small Satellite MBSE: Power, ADCS & Communications |
| 29 | Human-Autonomy Teaming & Cognitive Safety Architecture |
| 30 | Capstone Defense: MBSE Portfolio Review & Digital Engineering |

---

## Assessment Structure (300 Points)

| Component | Points | % |
|-----------|--------|---|
| Weekly Assignments (30 × 5 pts) | 150 | 50% |
| Weekly MCQ Quizzes (30 × 5 Qs × 1 pt) | 30 | 10% |
| Mini Project 1 — AWRF Requirements & Architecture (due Week 8) | 30 | 10% |
| Mini Project 2 — eVTOL Parametric Sizing Study (due Week 17) | 30 | 10% |
| Midterm Exam (Week 15 — 90 min, open-note) | 30 | 10% |
| Final Project — Capstone Portfolio Defense (Week 30) | 60 | 20% |

**Grade Scale:** A: 270–300 · B: 240–269 · C: 210–239 · D: 180–209 · F: below 180

---

## Final Project Tracks

Students select one of three tracks for the capstone portfolio defense, structured as a simulated PDR before faculty and industry reviewers:

**Track A — AWRF Full Lifecycle Model**  
Complete the AWRF model through all lifecycle phases: stakeholder register, 25+ requirements with full traceability, two-level BDD, IBD, use case diagram, activity diagram with swim lanes, state machine, parametric fleet sizing, FHA summary, and RVM at 100% coverage.

**Track B — Hybrid eVTOL Tilt-Rotor Safety-Critical Architecture**  
BDD (system + propulsion + power), IBD, verified MTOW parametric convergence, use case diagram (5 mission scenarios), state machine with safety interlocks, ARP 4761A FHA (top 3 hazards), FTA for loss-of-thrust-control, and RVM (20 requirements).

**Track C — CubeSat 6U Mission Architecture**  
SysML 1.7 model with cross-reference to the SysML v2 [`CubesatExample.ipynb`](https://github.com/Open-MBEE/SysML-v2-Applications-and-Examples). BDD (EPS + ADCS + COMMS), IBD (power bus), parametric power balance (eclipse survival), link budget, 15 requirements, and RVM at 100% coverage.

---

## Portal Architecture

```
mbse-portal/
├── index.html        — Application shell (WSU green theme, interactive playground, quiz engine)
├── lecture1.js       — L1 data (full academic content, 7 SVG diagrams)
├── lecture2.js       — L2 data (stakeholder analysis, use case SVGs)
├── lecture3.js–10.js — Foundation through Behavior units
├── lecture11–21.js   — Analysis, Verification, Digital Thread units
├── lecture22.js      — SysML v2 Transition (40+ GitHub citations)
├── lecture23–30.js   — Capstone case studies
└── README.md         — This file
```

**Key design principles:**
- Zero dependencies — no Node.js, no npm, no CDN, no build step
- Each `lectureN.js` self-registers via `window.registerLecture(N, data)` — add a file and it loads automatically
- All SVG diagrams are hand-authored inline — no external image files needed
- WSU brand colors: `#026937` green · `#C9A227` gold · `#f4f5f6` warm grey

---

## Authoritative References

### Standards
- **INCOSE SE Handbook v5** (2023) — https://www.incose.org
- **OMG SysML 1.7** — ISO/IEC 19514:2017 — https://www.omg.org/spec/SysML/1.7
- **OMG KerML 1.0** — Formally adopted 30 June 2025 — https://www.omg.org/spec/KerML/1.0
- **OMG SysML v2.0** — Formally adopted 30 June 2025 — https://www.omg.org/spec/SysML/2.0
- **OMG Systems Modeling API 1.0** — https://www.omg.org/spec/SystemsModelingAPI/1.0
- **ARP 4761A** (2023) — SAE Aerospace Recommended Practice: Safety Assessment

> **Important:** SysML v2 was formally adopted by OMG on **30 June 2025**, not March 2024. The authoritative source is the README of [`Systems-Modeling/SysML-v2-Release`](https://github.com/Systems-Modeling/SysML-v2-Release).

### GitHub Repositories
| Repository | Purpose |
|-----------|---------|
| [`Systems-Modeling/SysML-v2-Release`](https://github.com/Systems-Modeling/SysML-v2-Release) | Specifications, model libraries, Eclipse + Jupyter installers. Latest: 2026-04. |
| [`Systems-Modeling/SysML-v2-Pilot-Implementation`](https://github.com/Systems-Modeling/SysML-v2-Pilot-Implementation) | Eclipse Xtext reference implementation + Jupyter kernel. |
| [`Open-MBEE/SysML-v2-Applications-and-Examples`](https://github.com/Open-MBEE/SysML-v2-Applications-and-Examples) | Worked SysML v2 notebooks: BallAndChain, CubesatExample, spacecraft-example. |

### Textbooks
- Friedenthal, Moore & Steiner. *A Practical Guide to SysML* (3rd ed.). Morgan Kaufmann, 2015.
- Delligatti. *SysML Distilled*. Addison-Wesley, 2014.
- Kossiakoff, Seymour, Flanigan & Hutchison. *Systems Engineering Principles and Practice* (2nd ed.). Wiley, 2011.
- Wiegers & Beatty. *Software Requirements* (3rd ed.). Microsoft Press, 2013.

### Industry Case Studies Used in This Course

- Northam, J., & Chen, R. (2024). Integrated MATLAB-MBSE Parametric Sizing Framework for Urban Air Mobility Aircraft. *Journal of Aircraft Systems Engineering*, 18(2), 112-128. *(eVTOL MTOW parametric case study used in Lectures 1, 13, 14, 25-26)*
- Parasuraman, R., & Riley, V. (1997). Humans and Automation: Use, Misuse, Disuse, Abuse. *Human Factors*, 39(2), 230-253. *(Human-Autonomy Teaming case study used in Lecture 29)*


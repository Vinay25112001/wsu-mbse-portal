/**
 * lecture4.js — MBSE & SysML Course Portal · Wright State University
 * Lecture 4: MBSE Workflow, Method & Repository Discipline
 */
(function () {
  "use strict";
  const LECTURE_4_DATA = {
    meta: {
      id: 4, week: 4, unit: 'Foundations',
      title: 'MBSE Workflow, Method & Repository Discipline',
      duration: '90 min', difficulty: 'Intermediate', creditHours: 3, studyHours: '3–4 hrs',
      tools: ['CATIA Magic 2024x', 'Git / GitLab', 'Teamwork Cloud', 'DOORS Next'],
      prerequisites: ['Lectures 1–3'],
      objectives: [
        'Identify and compare the three major MBSE methods: OOSEM, MagicGrid, and Harmony-SE',
        'Explain the role of a model repository and version control in MBSE governance',
        'Define model package architecture and element naming conventions for a real program',
        'Describe the digital thread concept and how MBSE supports it',
        'Apply model quality gates at each lifecycle phase',
        'Explain model ownership, baseline management, and change control in a team environment',
      ],
      commonErrors: [
        'Storing the MBSE model as a single monolithic file without package partitioning',
        'Using inconsistent naming conventions that break automated model queries',
        'Failing to baseline the model at each phase gate, making rollback impossible',
        'Treating the model as a personal artifact rather than a team-governed engineering asset',
      ],
    },
    content: [
      {
        heading: '1 · MBSE Methods — OOSEM, MagicGrid, and Harmony-SE',
        paragraphs: [
          'An MBSE method is a prescribed sequence of modeling activities, diagram types, and decision gates that guides a systems engineering team from stakeholder needs through verified architecture. Three methods dominate current aerospace and defense practice. The Object-Oriented Systems Engineering Method (OOSEM), developed by Lockheed Martin and documented by Friedenthal, Moore, and Steiner, applies object-oriented analysis to systems engineering by using use case analysis to capture operational scenarios, sequence diagrams to develop system behavior, block definition diagrams to define structural architecture, and parametric diagrams to conduct trade studies. OOSEM is tool-agnostic and aligns closely with INCOSE SE Handbook v5 process structure.',
          'MagicGrid, developed by No Magic (now part of Dassault Systèmes) for CATIA Magic, organizes the MBSE workflow into a 3×3 matrix of stakeholder, system, and component perspectives crossed with black-box, white-box, and analytical views. Each cell of the matrix specifies which SysML diagram types apply and what artifacts must be produced before the team can advance to the next cell. The structure is highly prescriptive, making it well-suited for teams new to MBSE that benefit from explicit step-by-step guidance. Harmony-SE, developed by IBM for Rhapsody, emphasizes real-time and embedded systems and incorporates executable model simulation as a first-class deliverable rather than an optional analysis activity.',
          'All three methods share a common workflow spine: (1) define the operational context and mission scenarios; (2) elicit and formalize stakeholder needs; (3) derive system requirements; (4) develop the logical architecture through functional analysis and behavioral modeling; (5) develop the physical architecture through structural decomposition and interface definition; (6) conduct trade studies and parametric analysis; (7) verify and validate the architecture against requirements. The MBSE method does not replace the systems engineering process — it implements it through formal modeling.',
        ],
        callout: {
          type: 'standard',
          label: 'Method Comparison — Quick Reference',
          body: '<strong>OOSEM:</strong> Tool-agnostic, use-case-driven, object-oriented structure, aligns with INCOSE SE Handbook v5. Best for: programs requiring standards alignment and tool flexibility.<br><br><strong>MagicGrid:</strong> CATIA Magic native, prescriptive 3×3 matrix workflow, built-in quality gates. Best for: teams new to MBSE, programs standardized on Dassault toolchain.<br><br><strong>Harmony-SE:</strong> IBM Rhapsody native, executable model focus, real-time/embedded emphasis. Best for: software-intensive systems, safety-critical real-time architecture.',
        },
      },
      {
        heading: '2 · Model Repository Architecture and Version Control',
        paragraphs: [
          'A SysML model is a shared engineering asset, not a personal document. Like source code, it must be governed by a repository with version control, branching strategy, access permissions, and merge discipline. In CATIA Magic environments, the repository server is Teamwork Cloud (TWCloud), which provides server-side model storage with element-level locking, branching, merging, and audit trail. In open-source environments, models stored in Eclipse MDT or Papyrus can be managed with Git through the approach of serializing the model to XMI format and tracking XMI file changes as text-based commits.',
          'The package architecture of a well-governed MBSE model follows a hierarchical decomposition that mirrors both the program structure and the separation of concerns between modeling layers. A reference package architecture for an aerospace MBSE program includes: a Mission & Scenarios package (operational context, use cases, CONOPS scenarios), a Stakeholder Needs & Requirements package (stakeholder need model, system requirements, derived requirements, RVM), a Logical Architecture package (logical block hierarchy, activity allocations, interface definitions), a Physical Architecture package (physical block hierarchy, component specifications, IBDs), an Analysis & Trade Studies package (parametric diagrams, constraint blocks, trade study results), and a Verification & Validation package (test cases, verification events, V&V evidence). Each package is owned by a named engineer or team, and changes to a package require approval from the package owner.',
          'Baseline management — the practice of creating named, frozen snapshots of the model at each program phase gate — is the MBSE equivalent of document configuration management. A baseline is a read-only model state that serves as the contractual reference for subsequent development. When a design review is conducted against the PDR baseline, any post-PDR model changes are tracked as deltas and subject to engineering change proposal (ECP) processes. Without baselines, the model becomes a continuously evolving artifact with no stable reference point, and the audit trail that regulators, customers, and safety authorities require is absent.',
        ],
      },
      {
        heading: '3 · Naming Conventions, Model Quality Gates, and the Digital Thread',
        paragraphs: [
          'Naming conventions in an MBSE model are not stylistic preferences — they are the enabling infrastructure for automated model queries, report generation, and cross-tool integration. A consistent naming convention ensures that every model element can be uniquely identified, that queries using element name patterns return correct and complete result sets, and that model elements can be correlated with requirements in DOORS, drawing numbers in CAD, and test IDs in the test management system. A reference naming convention for aerospace MBSE assigns each element a prefix indicating its type (BLK_ for blocks, REQ_ for requirements, TC_ for test cases, PKG_ for packages, ACT_ for activities, UC_ for use cases), followed by a system identifier, a component identifier, and a sequential number.',
          'Model quality gates — formally defined checkpoints at which the model must meet specified completeness and consistency criteria before program advancement — are the MBSE equivalent of document peer reviews. At the SRR gate, the quality gate verifies that all stakeholder needs are captured, all system requirements are derived and traceable, all use cases are identified, and no orphaned model elements exist. At the PDR gate, the gate verifies that all requirements have allocated design elements (100% «satisfy» coverage), all logical blocks have behavioral specifications, and all interfaces are defined to the level of data type and flow direction. At the CDR gate, the gate verifies that all physical elements exist in the model, all «realize» relationships from physical to logical are present, and the RVM shows planned verification for every requirement.',
          'The digital thread is the concept of a continuously maintained, machine-readable information chain that connects every engineering artifact from mission concept through operational sustainment. The MBSE model is the spine of the digital thread: it owns the requirements, the architecture, the interface definitions, and the verification evidence, and it provides the query interface through which other tools (CAD, ERP, test management, simulation) access authoritative engineering data. A program with a well-maintained digital thread can answer the question "what are the downstream impacts of changing this battery cell specification" within hours rather than weeks, because the dependency graph is encoded in the model rather than distributed across documents.',
        ],
        callout: {
          type: 'gold',
          label: 'Digital Thread — The AWRF Implementation',
          body: 'For the AWRF, the digital thread connects: MBSE model (SysML requirements and architecture) → CAD model (Solidworks robot chassis geometry, mass properties) → circuit simulation (motor controller power budget) → ROS 2 software repository (navigation stack implementation) → hardware-in-the-loop test bench (verification evidence). Every interface between these tools is governed by a named model element in the MBSE repository. When the operations team changes the pick rate requirement from 450 to 600 picks/hr, the digital thread propagates: the requirement model flags all derived requirements for re-evaluation; the parametric model re-solves the fleet size constraint; the CAD model receives an updated mass budget; the software team receives an updated latency allocation. Total propagation time in a mature digital thread: hours. In a document-centric program: weeks to months.',
        },
      },
    ],
    references:[
  'INCOSE. (2023). Systems Engineering Handbook v5, Section 5 — SE Management.',
  'Friedenthal, S., Moore, A., & Steiner, R. (2015). A Practical Guide to SysML (3rd ed.). Morgan Kaufmann.',
  'No Magic / Dassault Systemes. (2022). MagicGrid Workbook. CATIA Magic Documentation.',
  'Hoffmann, H.-P. (2011). SysML-Based Model-Driven Systems Engineering with IBM Rhapsody. IBM Press.',
  'U.S. Department of Defense. (2018). Digital Engineering Strategy. Office of the Deputy Assistant Secretary of Defense for Systems Engineering.',
  'Ramos, A. L., Ferreira, J. V., & Barcelo, J. (2012). Model-Based Systems Engineering: An Emerging Approach. IEEE Transactions on Systems, Man, and Cybernetics, 42(1), 101-111.',
  'Systems-Modeling Organization. (2026). OMG SysML v2 Release Repository [Software]. GitHub. https://github.com/Systems-Modeling/SysML-v2-Release (Includes KerML 1.0, SysML 2.0, and API 1.0 specification documents, normative model libraries, and Eclipse/Jupyter installer packages. Formally adopted by OMG 30 June 2025; updated for ISO submission March 2026.)',
  'Systems-Modeling Organization. (2026). SysML v2 Pilot Implementation [Software, EPL-2.0]. GitHub. https://github.com/Systems-Modeling/SysML-v2-Pilot-Implementation (Eclipse Xtext-based reference implementation of the SysML v2 textual notation; includes Jupyter kernel for SysML v2, PlantUML visualization integration, and 85 tagged releases through 2026-04.)'
],
    schemaVisualizer: [
      {
        category: 'MBSE Governance',
        name: 'Package Diagram',
        diagramType: 'Package Diagram (PKG)',
        shortDesc: 'Organizes the model into named namespaces (packages) that partition concerns, ownership, and access control.',
        fullDesc: 'A Package Diagram in SysML 1.7 organizes model elements into named namespaces called packages. Packages are the primary mechanism for separating concerns (requirements vs. architecture vs. analysis), managing model ownership (each package has a named owner), controlling access permissions, and structuring the model for team collaboration. Package relationships include containment (element belongs to a package), import (a package imports the namespace of another), access (a package accesses elements of another without full import), and merge (package contents are merged). A well-structured package architecture is the prerequisite for automated model quality queries and cross-package traceability analysis.',
        notation: [
          'Package: rectangle with a small tab in the top-left corner; name in the tab or body.',
          'Containment: elements drawn inside a package boundary, or a tree notation with nesting.',
          '«import»: dashed arrow with open arrowhead — imports public elements of the target package.',
          '«access»: dashed arrow — read-only access to target package elements.',
          '«merge»: dashed arrow — semantically merges the contents of the target package into the source.',
          'Package ownership defines the traceability boundary: cross-package relationships must be explicit.',
        ,
{category:'SysML Reference',name:'Nine Diagram Types — Four Pillars',diagramType:'Reference Card',shortDesc:'Complete reference showing all 9 SysML 1.7 diagram types across the 4 pillars. Memorize this map for the midterm and final exam.',fullDesc:'OMG SysML 1.7 (formal/19-11-01, ISO/IEC 19514:2017) organizes nine diagram types across four pillars. Requirements (1): Requirement Diagram. Structure (3): BDD, IBD, Package. Behavior (4): Use Case, Activity, Sequence, State Machine. Parametric (1): Parametric Diagram. Every WSU CEG/EGR 7800 lecture develops one or more of these diagram types. Cross-pillar traceability connects all four pillars into the complete MBSE model.',notation:['Requirements pillar: 1 diagram type — Requirement Diagram (traceability and derivation).','Structure pillar: 3 diagram types — BDD (type model), IBD (instance wiring), Package (namespace).','Behavior pillar: 4 diagram types — Use Case (scope), Activity (flow), Sequence (interaction), State Machine (lifecycle).','Parametric pillar: 1 diagram type — Parametric Diagram (quantitative constraints).','Ref: OMG SysML 1.7 Specification formal/19-11-01, Table 1 — Diagram Types. https://www.omg.org/spec/SysML/1.7'],example:'Lecture 4 diagram types map to the highlighted pillar(s) in the reference card above. Connect each diagram type you produce to its pillar, and trace the cross-pillar relationships that make your model an integrated whole rather than a collection of disconnected views.',svgMarkup:`<svg viewBox="0 0 430 175" xmlns="http://www.w3.org/2000/svg" style="padding:10px;background:#1a1a1a;"><text x="215" y="15" font-family="JetBrains Mono,monospace" font-size="8" fill="#5aad7a" text-anchor="middle">OMG SysML 1.7 — 9 Diagram Types across 4 Pillars (ISO/IEC 19514:2017)</text><rect x="8" y="22" width="88" height="70" rx="4" fill="rgba(2,105,55,0.1)" stroke="#026937" stroke-width="1.3"/><text x="52" y="35" font-family="JetBrains Mono,monospace" font-size="7" fill="#026937" text-anchor="middle" font-weight="bold">REQUIREMENTS</text><rect x="14" y="42" width="76" height="16" rx="3" fill="#1a2a1a" stroke="#5aad7a" stroke-width="0.8"/><text x="52" y="54" font-family="JetBrains Mono,monospace" font-size="6.5" fill="#c5d8e8" text-anchor="middle">Requirement Diagram</text><rect x="102" y="22" width="88" height="105" rx="4" fill="rgba(2,105,55,0.1)" stroke="#026937" stroke-width="1.3"/><text x="146" y="35" font-family="JetBrains Mono,monospace" font-size="7" fill="#026937" text-anchor="middle" font-weight="bold">STRUCTURE</text><rect x="108" y="42" width="76" height="15" rx="3" fill="#1a2a1a" stroke="#5aad7a" stroke-width="0.8"/><text x="146" y="53" font-family="JetBrains Mono,monospace" font-size="6.5" fill="#c5d8e8" text-anchor="middle">Block Def. Diagram</text><rect x="108" y="61" width="76" height="15" rx="3" fill="#1a2a1a" stroke="#5aad7a" stroke-width="0.8"/><text x="146" y="72" font-family="JetBrains Mono,monospace" font-size="6.5" fill="#c5d8e8" text-anchor="middle">Internal Block Diag.</text><rect x="108" y="80" width="76" height="15" rx="3" fill="#1a2a1a" stroke="#5aad7a" stroke-width="0.8"/><text x="146" y="91" font-family="JetBrains Mono,monospace" font-size="6.5" fill="#c5d8e8" text-anchor="middle">Package Diagram</text><rect x="196" y="22" width="88" height="140" rx="4" fill="rgba(2,105,55,0.1)" stroke="#026937" stroke-width="1.3"/><text x="240" y="35" font-family="JetBrains Mono,monospace" font-size="7" fill="#026937" text-anchor="middle" font-weight="bold">BEHAVIOR</text><rect x="202" y="42" width="76" height="14" rx="3" fill="#1a2a1a" stroke="#5aad7a" stroke-width="0.8"/><text x="240" y="53" font-family="JetBrains Mono,monospace" font-size="6.5" fill="#c5d8e8" text-anchor="middle">Use Case Diagram</text><rect x="202" y="60" width="76" height="14" rx="3" fill="#1a2a1a" stroke="#5aad7a" stroke-width="0.8"/><text x="240" y="71" font-family="JetBrains Mono,monospace" font-size="6.5" fill="#c5d8e8" text-anchor="middle">Activity Diagram</text><rect x="202" y="78" width="76" height="14" rx="3" fill="#1a2a1a" stroke="#5aad7a" stroke-width="0.8"/><text x="240" y="89" font-family="JetBrains Mono,monospace" font-size="6.5" fill="#c5d8e8" text-anchor="middle">Sequence Diagram</text><rect x="202" y="96" width="76" height="14" rx="3" fill="#1a2a1a" stroke="#5aad7a" stroke-width="0.8"/><text x="240" y="107" font-family="JetBrains Mono,monospace" font-size="6.5" fill="#c5d8e8" text-anchor="middle">State Machine Diag.</text><rect x="290" y="22" width="88" height="70" rx="4" fill="rgba(201,162,39,0.08)" stroke="#C9A227" stroke-width="1.3"/><text x="334" y="35" font-family="JetBrains Mono,monospace" font-size="7" fill="#C9A227" text-anchor="middle" font-weight="bold">PARAMETRIC</text><rect x="296" y="42" width="76" height="18" rx="3" fill="#1a2a1a" stroke="#C9A227" stroke-width="0.8"/><text x="334" y="55" font-family="JetBrains Mono,monospace" font-size="6.5" fill="#c5d8e8" text-anchor="middle">Parametric Diagram</text><text x="215" y="170" font-family="JetBrains Mono,monospace" font-size="6.5" fill="#4e5668" text-anchor="middle">Ref: OMG SysML 1.7 formal/19-11-01 · ISO/IEC 19514:2017 · omg.org/spec/SysML/1.7</text></svg>`},
{category:'INCOSE Lifecycle Reference',name:'SE Lifecycle — Lecture 4 Position',diagramType:'Process Reference (informative)',shortDesc:'INCOSE SE Handbook v5 six-phase lifecycle with Lecture 4 phase highlighted. Know where you are in the lifecycle at all times.',fullDesc:'INCOSE SE Handbook v5 (2023) defines six lifecycle stages, each bounded by decision gates requiring defined model maturity. Every MBSE activity in this course maps to one or more stages. The highlighted phase shows where Lecture 4 activities fall in the lifecycle. Know the gate entry criteria — they appear on the midterm and final exam.',notation:['Highlighted phase = primary lifecycle context for Lecture 4 activities.','Phase gate = decision point requiring authority approval and defined model maturity.','MCR: Mission Concept Review; SRR: System Requirements Review; PDR: Preliminary Design Review.','CDR: Critical Design Review; TRR: Test Readiness Review; OAR: Operational Acceptance Review.','Ref: INCOSE (2023). SE Handbook v5, Section 2.3 — Systems Lifecycle Stages.'],example:'At PDR (after Lecture 7), your model must pass: derivation coverage 100%, allocation coverage 100%, no orphaned requirements, naming convention compliance 100%. These are the exact criteria evaluated in Mini Project 1.',svgMarkup:`<svg viewBox="0 0 430 98" xmlns="http://www.w3.org/2000/svg" style="padding:10px;background:#1a1a1a;"><defs><marker id="lca4" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto"><polygon points="0 0,6 2,0 4" fill="#5aad7a"/></marker></defs><text x="215" y="15" font-family="JetBrains Mono,monospace" font-size="7.5" fill="#5aad7a" text-anchor="middle">INCOSE SE Handbook v5 — Lifecycle (L4: System Definition highlighted)</text><rect x="6" y="24" width="60" height="30" rx="3" fill="#1a2a1a" stroke="#026937" stroke-width="1"/><text x="36" y="44" font-family="JetBrains Mono,monospace" font-size='6.5' fill="#026937" text-anchor="middle" font-weight='normal'>Concept</text><rect x="76" y="24" width="60" height="30" rx="3" fill="#1a2a1a" stroke="#C9A227" stroke-width="1.8"/><text x="106" y="44" font-family="JetBrains Mono,monospace" font-size='7.5' fill="#C9A227" text-anchor="middle" font-weight='bold'>Sys Def</text><rect x="146" y="24" width="60" height="30" rx="3" fill="#1a2a1a" stroke="#026937" stroke-width="1"/><text x="176" y="44" font-family="JetBrains Mono,monospace" font-size='6.5' fill="#026937" text-anchor="middle" font-weight='normal'>Realization</text><rect x="216" y="24" width="60" height="30" rx="3" fill="#1a2a1a" stroke="#026937" stroke-width="1"/><text x="246" y="44" font-family="JetBrains Mono,monospace" font-size='6.5' fill="#026937" text-anchor="middle" font-weight='normal'>I&V</text><rect x="286" y="24" width="60" height="30" rx="3" fill="#1a2a1a" stroke="#026937" stroke-width="1"/><text x="316" y="44" font-family="JetBrains Mono,monospace" font-size='6.5' fill="#026937" text-anchor="middle" font-weight='normal'>Qual & Trans</text><rect x="356" y="24" width="60" height="30" rx="3" fill="#1a2a1a" stroke="#026937" stroke-width="1"/><text x="386" y="44" font-family="JetBrains Mono,monospace" font-size='6.5' fill="#026937" text-anchor="middle" font-weight='normal'>Ops & Maint</text><line x1="66" y1="39" x2="76" y2="39" stroke="#5aad7a" stroke-width="1" marker-end="url(#lca4)"/><line x1="136" y1="39" x2="146" y2="39" stroke="#5aad7a" stroke-width="1" marker-end="url(#lca4)"/><line x1="206" y1="39" x2="216" y2="39" stroke="#5aad7a" stroke-width="1" marker-end="url(#lca4)"/><line x1="276" y1="39" x2="286" y2="39" stroke="#5aad7a" stroke-width="1" marker-end="url(#lca4)"/><line x1="346" y1="39" x2="356" y2="39" stroke="#5aad7a" stroke-width="1" marker-end="url(#lca4)"/><polygon points="66,55 72,62 66,69 60,62" fill="#0d1a0d" stroke="#C9A227" stroke-width="1"/><text x="66" y="80" font-family="JetBrains Mono,monospace" font-size="6" fill="#C9A227" text-anchor="middle">MCR</text><polygon points="136,55 142,62 136,69 130,62" fill="#0d1a0d" stroke="#C9A227" stroke-width="1"/><text x="136" y="80" font-family="JetBrains Mono,monospace" font-size="6" fill="#C9A227" text-anchor="middle">SRR/PDR</text><polygon points="206,55 212,62 206,69 200,62" fill="#0d1a0d" stroke="#C9A227" stroke-width="1"/><text x="206" y="80" font-family="JetBrains Mono,monospace" font-size="6" fill="#C9A227" text-anchor="middle">CDR</text><polygon points="276,55 282,62 276,69 270,62" fill="#0d1a0d" stroke="#C9A227" stroke-width="1"/><text x="276" y="80" font-family="JetBrains Mono,monospace" font-size="6" fill="#C9A227" text-anchor="middle">TRR</text><polygon points="346,55 352,62 346,69 340,62" fill="#0d1a0d" stroke="#C9A227" stroke-width="1"/><text x="346" y="80" font-family="JetBrains Mono,monospace" font-size="6" fill="#C9A227" text-anchor="middle">OAR</text><text x="215" y="95" font-family="JetBrains Mono,monospace" font-size="6.5" fill="#4e5668" text-anchor="middle">Ref: INCOSE (2023). SE Handbook v5, Section 2.3 — Systems Lifecycle Stages</text></svg>`}
  ],
        example: 'AWRF model package structure: PKG_AWRF_Root → PKG_Mission_Scenarios, PKG_Stakeholders_Requirements, PKG_Logical_Architecture, PKG_Physical_Architecture, PKG_Analysis_TradeStudies, PKG_VandV. PKG_Physical_Architecture «import» PKG_Logical_Architecture to access logical blocks for «realize» relationships. PKG_VandV «import» PKG_Stakeholders_Requirements to access requirements for «verify» links.',
        svgMarkup: `<svg viewBox="0 0 430 220" xmlns="http://www.w3.org/2000/svg" style="padding:12px;background:#1a1a1a;">
          <defs>
            <marker id="pkg4-arr" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
              <polygon points="0 0,8 3,0 6" fill="none" stroke="#7a9ab4" stroke-width="1"/>
            </marker>
            <style>
              .p4r{fill:#1e2a1e;stroke:#026937;stroke-width:1.3;}
              .p4t{fill:rgba(2,105,55,0.25);}
              .p4tx{font-family:'JetBrains Mono',monospace;font-size:8px;fill:#c5d8e8;text-anchor:middle;}
              .p4k{font-family:'JetBrains Mono',monospace;font-size:7px;fill:#5aad7a;text-anchor:middle;}
              .p4a{stroke:#7a9ab4;stroke-width:1;stroke-dasharray:5,3;fill:none;}
            </style>
          </defs>
          <!-- Root package -->
          <rect x="140" y="8" width="150" height="30" rx="3" class="p4r"/>
          <rect x="140" y="8" width="60" height="12" rx="2" class="p4t"/>
          <text x="215" y="18" class="p4k">PKG</text>
          <text x="215" y="30" class="p4tx" font-weight="bold">AWRF_Root</text>
          <!-- Child packages -->
          <rect x="8"   y="70" width="120" height="34" rx="3" class="p4r"/>
          <rect x="8"   y="70" width="50" height="11" rx="2" class="p4t"/>
          <text x="68" y="79" class="p4k">PKG</text>
          <text x="68" y="92" class="p4tx">Mission_Scenarios</text>
          <rect x="140" y="70" width="120" height="34" rx="3" class="p4r"/>
          <rect x="140" y="70" width="50" height="11" rx="2" class="p4t"/>
          <text x="200" y="79" class="p4k">PKG</text>
          <text x="200" y="92" class="p4tx">Stk_Requirements</text>
          <rect x="272" y="70" width="120" height="34" rx="3" class="p4r"/>
          <rect x="272" y="70" width="50" height="11" rx="2" class="p4t"/>
          <text x="332" y="79" class="p4k">PKG</text>
          <text x="332" y="92" class="p4tx">Logical_Architecture</text>
          <rect x="8"   y="140" width="120" height="34" rx="3" class="p4r"/>
          <rect x="8"   y="140" width="50" height="11" rx="2" class="p4t"/>
          <text x="68" y="149" class="p4k">PKG</text>
          <text x="68" y="162" class="p4tx">Physical_Architecture</text>
          <rect x="140" y="140" width="120" height="34" rx="3" class="p4r"/>
          <rect x="140" y="140" width="50" height="11" rx="2" class="p4t"/>
          <text x="200" y="149" class="p4k">PKG</text>
          <text x="200" y="162" class="p4tx">Analysis_TradeStudies</text>
          <rect x="272" y="140" width="120" height="34" rx="3" class="p4r"/>
          <rect x="272" y="140" width="50" height="11" rx="2" class="p4t"/>
          <text x="332" y="149" class="p4k">PKG</text>
          <text x="332" y="162" class="p4tx">VandV</text>
          <!-- Containment lines from root -->
          <line x1="215" y1="38" x2="68"  y2="70" stroke="#026937" stroke-width="1" stroke-dasharray="3,2"/>
          <line x1="215" y1="38" x2="200" y2="70" stroke="#026937" stroke-width="1" stroke-dasharray="3,2"/>
          <line x1="215" y1="38" x2="332" y2="70" stroke="#026937" stroke-width="1" stroke-dasharray="3,2"/>
          <line x1="215" y1="38" x2="68"  y2="140" stroke="#026937" stroke-width="1" stroke-dasharray="3,2"/>
          <line x1="215" y1="38" x2="200" y2="140" stroke="#026937" stroke-width="1" stroke-dasharray="3,2"/>
          <line x1="215" y1="38" x2="332" y2="140" stroke="#026937" stroke-width="1" stroke-dasharray="3,2"/>
          <!-- import arrow -->
          <line x1="68" y1="140" x2="332" y2="104" class="p4a" marker-end="url(#pkg4-arr)"/>
          <text x="200" y="125" class="p4k" style="fill:#C9A227;">«import»</text>
        </svg>`,
      },
    ],
    playground: {
      title: 'Model Package Architecture — Organize the AWRF MBSE Repository',
      instructions: 'Build the AWRF model package structure. Add package blocks from the palette and connect them with containment relationships (from root to child) and import relationships (from Physical_Architecture to Logical_Architecture, and from VandV to Stk_Requirements). This models how the MBSE repository is partitioned for team collaboration.',
      objectives: [
        'Add AWRF_Root and connect it to Mission_Scenarios, Stk_Requirements, and Logical_Architecture.',
        'Add Physical_Architecture and connect it to AWRF_Root (containment).',
        'Connect Physical_Architecture to Logical_Architecture with an «import» relationship.',
        'Add VandV and connect to Stk_Requirements with «import» to enable verify link creation.',
      ],
      palette: [
        { stereotype: '«package»', name: 'AWRF_Root',             props: ['+ owner: ChiefSE'] },
        { stereotype: '«package»', name: 'Mission_Scenarios',     props: ['+ owner: MissionAnalyst'] },
        { stereotype: '«package»', name: 'Stk_Requirements',      props: ['+ owner: ReqsEngineer'] },
        { stereotype: '«package»', name: 'Logical_Architecture',  props: ['+ owner: SysArchitect'] },
        { stereotype: '«package»', name: 'Physical_Architecture', props: ['+ owner: SysArchitect'] },
        { stereotype: '«package»', name: 'Analysis_TradeStudies', props: ['+ owner: AnalysisLead'] },
        { stereotype: '«package»', name: 'VandV',                 props: ['+ owner: VandVLead'] },
      ],
      defaultBlocks: [
        { stereotype: '«package»', name: 'AWRF_Root',             props: ['+ owner: ChiefSE'],          x: 160, y: 30  },
        { stereotype: '«package»', name: 'Stk_Requirements',      props: ['+ owner: ReqsEngineer'],      x: 20,  y: 180 },
        { stereotype: '«package»', name: 'Logical_Architecture',  props: ['+ owner: SysArchitect'],      x: 220, y: 180 },
      ],
    },
    quiz: {
      questions: [
        {
          question: 'Which MBSE method organizes the workflow into a 3×3 matrix of stakeholder, system, and component perspectives crossed with black-box, white-box, and analytical views?',
          options: ['OOSEM', 'MagicGrid', 'Harmony-SE', 'EFFBD-SE'],
          correct: 1,
          explanation: 'MagicGrid, developed by No Magic (now Dassault Systèmes) for CATIA Magic, organizes the MBSE workflow into a 3×3 matrix. Rows represent the system level (stakeholder/black-box, system/white-box, subsystem/component) and columns represent the analysis viewpoint (structure, behavior, parametric). Each cell prescribes specific SysML diagram types, making it particularly accessible for teams new to MBSE.',
        },
        {
          question: 'In a team MBSE environment, what is the purpose of creating a model baseline at each phase gate?',
          options: [
            'To compress the model file size for archive storage.',
            'To create a named, frozen, read-only snapshot of the model state that serves as the contractual reference for subsequent development and change control.',
            'To allow multiple engineers to edit the same model element simultaneously.',
            'To generate PDF reports from the model for customer delivery.',
          ],
          correct: 1,
          explanation: 'A model baseline is the MBSE equivalent of a document baseline in configuration management. It creates a frozen, named snapshot (e.g., "AWRF_PDR_Baseline_v1.0") that serves as the reference against which all subsequent changes are tracked through the engineering change proposal process. Without baselines, there is no stable reference point for design reviews, audits, or regulatory inspections.',
        },
        {
          question: 'What is the "digital thread" in the context of MBSE and digital engineering?',
          options: [
            'The fiber-optic communication bus used to connect MBSE workstations.',
            'A continuously maintained, machine-readable information chain connecting all engineering artifacts from mission concept through operational sustainment, with the MBSE model as its spine.',
            'The sequence of SysML diagrams produced during a single design review cycle.',
            'The version history log maintained by the model repository server.',
          ],
          correct: 1,
          explanation: 'The digital thread is a DoD and INCOSE concept for end-to-end information continuity across the system lifecycle. The MBSE model serves as the authoritative source of requirements, architecture, and interface definitions that other tools (CAD, simulation, test management, ERP) reference. When a requirement changes in the MBSE model, the digital thread propagates the impact downstream to CAD mass budgets, software latency allocations, and test acceptance criteria — eliminating the manual cross-document synchronization that causes consistency failures in document-centric programs.',
        },
        {
          question: 'A model quality gate at the PDR milestone requires 100% "satisfy" coverage. What does this mean in terms of the MBSE model?',
          options: [
            'Every requirement must have been reviewed and approved by a customer representative.',
            'Every system requirement must have at least one design Block connected to it by a «satisfy» relationship, confirming that design responsibility has been allocated.',
            'Every design Block must have a satisfied test case in the VandV package.',
            'All parametric constraints must have been solved and their results published.',
          ],
          correct: 1,
          explanation: '100% «satisfy» coverage at PDR means that every requirement in the requirements model has at least one design element (Block, subsystem, or component) that has been formally allocated to satisfy it through the SysML «satisfy» relationship. Any requirement without a satisfying design element is unallocated — meaning no part of the design is responsible for meeting it, which is a critical gap that must be resolved before advancing to detailed design.',
        },
        {
          question: 'Which naming convention element is most critical for enabling automated model queries and cross-tool correlation in an MBSE program?',
          options: [
            'Using color codes on SysML diagram backgrounds to indicate element maturity.',
            'Consistent type prefixes (BLK_, REQ_, TC_, PKG_) combined with system and component identifiers, enabling query patterns to return correct and complete result sets.',
            'Numbering all diagram frames sequentially from 001 to 999.',
            'Using the engineer\'s initials as a suffix on each model element they create.',
          ],
          correct: 1,
          explanation: 'Automated model queries — used to generate the RVM, impact analysis reports, and quality gate compliance checks — depend on pattern matching against element names. A consistent prefix convention (BLK_ for blocks, REQ_ for requirements, TC_ for test cases) ensures that a query for "all test cases that verify requirements in the SYS-REQ namespace" returns every element it should and no elements it should not. Inconsistent naming makes this automation impossible, forcing manual model traversal that defeats the core productivity argument for MBSE.',
        },
      ],
    },
    assignment: {
      title: 'Assignment 4: MBSE Repository Architecture — Design the AWRF Model Governance Plan',
      brief: 'You are the MBSE tool lead for the AWRF program. Your task is to design the complete model governance plan: define the package architecture, establish naming conventions, specify the model quality gates for SRR and PDR, and produce a one-page digital thread diagram showing how the MBSE model connects to three downstream tool environments.',
      deliverables: [
        'Package Architecture Diagram: Produce a SysML Package Diagram showing the complete AWRF model package hierarchy with a minimum of 6 packages. For each package, identify the owner role and list 3 element types it contains.',
        'Naming Convention Specification: Define naming conventions for blocks, requirements, test cases, activities, and use cases. Provide 5 example element names from the AWRF model that comply with your convention.',
        'Model Quality Gate Checklist: Define 5 quality gate criteria for each of SRR and PDR (10 criteria total), stated as pass/fail conditions that can be evaluated by automated model query.',
        'Digital Thread Diagram: Produce a diagram showing how the AWRF MBSE model connects to 3 downstream tools (e.g., CAD, simulation, test management). For each connection, identify the interface mechanism (API, XMI export, REST query) and the data element exchanged.',
        'Version Control Strategy: Describe the branching strategy for the AWRF model repository, defining: main branch policy, feature branch naming, merge request requirements, and baseline tagging convention.',
      ],
      rubric: [
        { criterion: 'Package Architecture Completeness', descriptor: '≥6 packages, owner roles, element types, correct diagram notation.', max: 25 },
        { criterion: 'Naming Convention Rigour', descriptor: 'All 5 element types covered, examples are compliant, convention is unambiguous.', max: 20 },
        { criterion: 'Quality Gate Criteria Specificity', descriptor: '10 criteria (5 per gate), each stated as a machine-evaluable pass/fail condition.', max: 25 },
        { criterion: 'Digital Thread Diagram Accuracy', descriptor: '3 tool connections with interface mechanism and data element identified.', max: 18 },
        { criterion: 'Version Control Strategy Clarity', descriptor: 'Branching strategy, merge policy, and baseline tagging convention defined.', max: 12 },
      ],
      gradingNotes: [
        'Quality gate criteria stated as "the model should be complete" earn zero — criteria must be machine-evaluable pass/fail conditions (e.g., "count of REQ_ elements with no «satisfy» link = 0").',
        'A digital thread diagram that shows only the MBSE model in isolation with no tool connections earns zero on that criterion.',
        'Late penalty: 10 points per calendar day.',
      ],
    },
  
    courseMeta:{courseCode:'CEG/EGR 7800',courseTitle:'Model-Based Systems Engineering',university:'Wright State University',college:'College of Engineering and Computer Science',totalPoints:300,gradeBreakdown:{weeklyAssignments:{points:150,pct:50,desc:'30 weekly assignments x 5 pts each'},weeklyMCQ:{points:30,pct:10,desc:'30 quizzes x 5 Qs x 1 pt (auto-graded, closes Sunday 11:59 PM)'},miniProject1:{points:30,pct:10,desc:'AWRF Requirements and Architecture (due end of Week 8)'},miniProject2:{points:30,pct:10,desc:'eVTOL Parametric Sizing Study (due end of Week 17)'},midtermExam:{points:30,pct:10,desc:'Week 15 open-note exam covering Lectures 1-14 (90 minutes)'},finalProject:{points:60,pct:20,desc:'Capstone Portfolio Defense Week 30 — 3 track options: AWRF Track A, eVTOL Track B, CubeSat Track C'}},gradeScale:{A:'270-300 (90-100%)',B:'240-269 (80-89%)',C:'210-239 (70-79%)',D:'180-209 (60-69%)',F:'below 180 (below 60%)'},latePenalty:'10 points per calendar day; no submissions after 5 days past due date',academicIntegrity:'Per WSU Academic Integrity Policy: all model artifacts must be individually authored'},
    weeklyMCQ:{points:5,closesDay:'Sunday 11:59 PM',instructions:'Auto-graded. 2 attempts; highest score counts. Covers key concepts of Lecture 4. Complete before Sunday 11:59 PM of the lecture week.',questions:[
      
    ]},
    miniProject:{status:'building',dueWeek:8,title:'Mini Project 1: AWRF System Requirements Definition and Structural Architecture',note:'Lecture 4 of 7 pre-MP1 lectures. Full specification available at Lecture 8.'},
  };
  if (typeof window.registerLecture === 'function') {
    window.registerLecture(4, LECTURE_4_DATA);
  } else {
    window.MBSE_COURSE_DATA = window.MBSE_COURSE_DATA || {};
    window.MBSE_COURSE_DATA[4] = LECTURE_4_DATA;
  }
})();

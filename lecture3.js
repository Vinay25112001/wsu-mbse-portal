/**
 * lecture3.js — MBSE & SysML Course Portal · Wright State University
 * Lecture 3: Requirements Engineering for MBSE
 */
(function () {
  "use strict";
  const LECTURE_3_DATA = {
    meta: {
      id: 3, week: 3, unit: 'Foundations',
      title: 'Requirements Engineering for MBSE',
      duration: '90 min', difficulty: 'Intermediate', creditHours: 3, studyHours: '4–5 hrs',
      tools: ['CATIA Magic 2024x', 'IBM DOORS Next', 'PlantUML'],
      prerequisites: ['Lecture 1', 'Lecture 2'],
      objectives: [
        'Write verifiable system requirements in correct "shall" syntax',
        'Distinguish stakeholder needs, system requirements, and derived requirements',
        'Apply the INCOSE "well-formed requirement" criteria to a requirement set',
        'Build a SysML Requirements Diagram with derive, refine, trace, satisfy, and verify relationships',
        'Explain requirement volatility and its impact on MBSE model governance',
        'Construct a Requirements Verification Matrix (RVM) for an aerospace system',
      ],
      commonErrors: [
        'Writing compound requirements that combine two independent conditions in one "shall" statement',
        'Omitting the verification method at the time of requirement authoring',
        'Confusing "refine" and "derive" traceability relationships in the SysML model',
        'Writing performance requirements without quantified acceptance thresholds',
      ],
    },
    content: [
      {
        heading: '1 · The Anatomy of a Well-Formed Requirement',
        paragraphs: [
          'A requirement is a formal statement that a system, system element, or process shall possess a specified capability, characteristic, or quality factor. The INCOSE "well-formed requirement" criteria, reproduced in SE Handbook v5 Section 4.2, define six properties that every atomic requirement must satisfy: it must be necessary (the system cannot meet mission objectives without it), unambiguous (it admits exactly one interpretation), verifiable (compliance can be confirmed by analysis, test, inspection, or demonstration), consistent (it does not conflict with any other requirement in the set), complete (it specifies all conditions under which the capability is required), and feasible (it can be achieved within program constraints of cost, schedule, and technology readiness).',
          'The most common failure mode in requirements authoring is ambiguity caused by the use of escape words: words such as "adequate," "appropriate," "sufficient," "maximize," "minimize," "user-friendly," and "state-of-the-art" are systematically unverifiable because no objective test can determine whether the criterion has been met. The INCOSE Requirements Writing Guide provides a replacement vocabulary: "adequate" becomes a quantified threshold (e.g., "shall maintain a signal-to-noise ratio ≥ 20 dB under all operating conditions"); "maximize" becomes a parametric bound ("shall achieve a throughput of ≥ 450 picks per hour under nominal operating conditions"). The replacement forces the requirements author to know and state what they actually need rather than deferring that decision to the implementer.',
          'A second common failure is the compound requirement — a single "shall" statement that actually encodes two or more independent conditions. The statement "the system shall navigate to the target location within 30 seconds and shall avoid all obstacles with a minimum clearance of 0.5 m" must be split into two atomic requirements, each with its own ID, verification method, and traceability. Compound requirements are dangerous in MBSE contexts because a SysML model that allocates the compound requirement to a subsystem block cannot independently track satisfaction of each condition — partial compliance becomes invisible.',
        ],
        callout: {
          type: 'gold',
          label: 'AWRF Requirements Example — Before and After',
          body: '<strong>Weak (fails verifiability):</strong> REQ-WEAK-01: "The AWRF shall respond to pick orders in an appropriate timeframe." — "appropriate" is undefined; no test can pass or fail this requirement.<br><br><strong>Strong (INCOSE well-formed):</strong> REQ-AWRF-007: "The AWRF shall initiate robot dispatch to the designated storage location within 3.0 seconds (±0.1 s) of receiving a confirmed PickOrder message from the WMS under all operational load conditions up to and including peak throughput of 450 picks per hour." — Quantified threshold, stated conditions, single testable criterion, unambiguous measurement point.',
        },
        equations: [
          'Verifiability test: ∃ a test T such that T(system) → {PASS, FAIL} with no ambiguity',
          'Atomicity test: requirement R cannot be decomposed into R_a ∧ R_b where R_a and R_b are independently satisfiable',
        ],
      },
      {
        heading: '2 · SysML Requirements Diagram — Relationships and Traceability',
        paragraphs: [
          'The SysML Requirements Diagram (REQ) provides a formal, machine-traversable structure for organizing requirements and their relationships. Unlike a requirements spreadsheet — which can represent requirements as rows but cannot natively represent the directed relationships between them — a SysML requirements model captures the full dependency graph: which requirements are derived from which stakeholder needs, which design elements satisfy which requirements, and which test cases verify which requirements. This graph is the foundation of requirements traceability, defined in IEEE 29148:2018 as the degree to which a relationship can be established between two or more products of the development process.',
          'SysML 1.7 defines five primary requirement relationships: derive (a requirement is mathematically or logically derived from a parent requirement — the child imposes stronger or more specific constraints), refine (a model element or requirement elaborates the semantics of another without changing its intent — used when a design decision clarifies but does not tighten a requirement), trace (a general, non-semantic dependency for bookkeeping — weakest relationship, used when derive or refine is not appropriate), satisfy (a design element — typically a Block — satisfies a requirement, confirming design-to-requirement allocation), and verify (a test case, analysis result, or inspection record verifies that a requirement is met by the implemented system). Together these five relationships form the complete MBSE traceability chain from stakeholder need through requirement through design through verification evidence.',
          'The practical power of this structure becomes visible during design change impact analysis. When a primary stakeholder need changes — for example, the AWRF pick rate requirement increases from 450 to 600 picks per hour — a query on all «derive» relationships downstream of that need immediately surfaces every child requirement that may be invalidated: the robot dispatch latency requirement, the navigation algorithm execution time requirement, the battery recharge cycle frequency requirement, and the fleet size requirement. Without a formally maintained requirements model, this analysis is performed manually — and is routinely incomplete, which is why change-driven requirement gaps are the leading cause of integration test failures in large programs.',
        ],
        callout: {
          type: 'standard',
          label: 'Five SysML Requirement Relationships — Quick Reference',
          body: '«derive»: child ← parent; child is logically derived, imposes tighter constraint. Arrow points FROM derived TO source.<br>«refine»: elaborates semantics of a model element without changing intent. FROM refinement TO refined element.<br>«trace»: weak, non-semantic bookkeeping link. FROM tracing TO traced element.<br>«satisfy»: design Block satisfies a Requirement. FROM Block TO Requirement.<br>«verify»: TestCase verifies a Requirement. FROM TestCase TO Requirement.',
        },
      },
      {
        heading: '3 · Requirements Hierarchy — Needs, Requirements, and Derived Requirements',
        paragraphs: [
          'The requirements hierarchy in INCOSE SE Handbook v5 distinguishes three levels that must be kept structurally separate in the MBSE model. At the apex are stakeholder needs — statements of operational intent that are architecture-agnostic, often qualitative, and owned by the customer or mission authority. Below them are system requirements — quantified, verifiable statements that the system must satisfy, derived from and traceable to the stakeholder needs but now expressed in engineering language. Below system requirements are derived requirements — constraints imposed by the selected architecture, not directly by stakeholder intent. A derived requirement for battery swap cycle time, for instance, is not demanded by the customer; it emerges from the decision to use autonomous charging docking as the energy replenishment strategy.',
          'This hierarchy matters in MBSE because it determines the direction of requirements authority. Stakeholder needs can never be overridden by a design team. System requirements can be traded against each other within the bounds set by stakeholder needs, subject to change board approval. Derived requirements are the property of the design team — they can be modified to reflect architectural changes without customer notification, as long as the parent system requirement remains satisfied. Collapsing these levels — treating derived requirements as though they have the same authority as stakeholder needs — is a documented cause of program budget overruns, because engineering teams optimize to satisfy constraints that the customer never actually imposed.',
        ],
      },
      {
        heading: '4 · Verification Planning — The Requirements Verification Matrix',
        paragraphs: [
          'Every requirement in a well-governed MBSE model carries a verification method attribute at the time of authoring — not at the time of testing. The four standard verification methods defined in MIL-STD-961 and adopted by INCOSE are: Analysis (A) — mathematical derivation, simulation, or modeling that demonstrates compliance without physical testing; Inspection (I) — visual examination of the as-built system against a defined criterion; Demonstration (D) — observation of the system performing a function under specified conditions without instrumented measurement; and Test (T) — instrumented, repeatable measurement of system performance against a quantified acceptance threshold.',
          'The Requirements Verification Matrix (RVM) — sometimes called the Verification Cross-Reference Matrix (VCRM) — is a table that maps every requirement to its verification method, the responsible organization, the planned verification event (e.g., component test, integration test, system qualification test), and the current verification status (planned, in progress, passed, failed, waived). In a SysML-governed MBSE model, the RVM is not a separate document — it is a query result: a view generated by traversing all «verify» relationships in the model and extracting the associated TestCase and verificationMethod attributes. This means the RVM is always current and always consistent with the requirements model, eliminating the version management burden that plagues document-based programs.',
        ],
        equations: [
          'Verification completeness = (Requirements with at least one «verify» link) / (Total requirements) × 100%',
          'Target at CDR: completeness ≥ 98%; at qualification: completeness = 100%',
        ],
      },
    ],
    references:[
  'INCOSE. (2023). Systems Engineering Handbook v5, Section 4.2 — Requirements Engineering.',
  'IEEE Std 29148-2018. Systems and Software Engineering — Life Cycle Processes — Requirements Engineering.',
  'MIL-STD-961E. (2008). Defense Standard Practice — Defense Specifications.',
  'Wiegers, K., & Beatty, J. (2013). Software Requirements (3rd ed.). Microsoft Press.',
  'Hooks, I. F., & Farry, K. A. (2001). Customer-Centered Products. AMACOM.',
  'Object Management Group. (2019). OMG SysML 1.7 Specification, Section 16 — Requirements Diagrams. https://www.omg.org/spec/SysML/1.7',
  'Systems-Modeling Organization. (2026). OMG SysML v2 Release Repository [Software]. GitHub. https://github.com/Systems-Modeling/SysML-v2-Release (Includes KerML 1.0, SysML 2.0, and API 1.0 specification documents, normative model libraries, and Eclipse/Jupyter installer packages. Formally adopted by OMG 30 June 2025; updated for ISO submission March 2026.)',
  'Systems-Modeling Organization. (2026). SysML v2 Pilot Implementation [Software, EPL-2.0]. GitHub. https://github.com/Systems-Modeling/SysML-v2-Pilot-Implementation (Eclipse Xtext-based reference implementation of the SysML v2 textual notation; includes Jupyter kernel for SysML v2, PlantUML visualization integration, and 85 tagged releases through 2026-04.)'
,{heading:'💡 Real-World: Mars Climate Orbiter — The $327M Requirement That Was Never Written',paragraphs:['On September 23, 1999, NASA lost the Mars Climate Orbiter because one engineering team delivered thruster impulse data in pound-force-seconds while the navigation software expected newton-seconds. The Interface Control Document said the unit should be metric. The implementation was imperial. No requirement statement explicitly said: "The thruster performance file shall express specific impulse in newton-seconds per kilogram." That single omitted precision cost $327.6 million.','The lesson is not about unit conversion — every aerospace engineer knows that. The lesson is about what a well-formed requirement must specify. Had the systems engineer written: "REQ-PROP-007: The thruster telemetry interface shall express all specific impulse values in units of newton-seconds per kilogram (N·s/kg), verified by Inspection of the interface file header and by Analysis of a 100-sample data trace" — the type mismatch would have been caught at Interface Control Document review, not at Mars orbit insertion.','Apply this to your AWRF model: every interface in your IBD has implicit unit assumptions. "PickOrder dispatch time ≤ 3 seconds" — 3 seconds of what clock? Robot on-board timer? WMS timestamp? Network latency included or excluded? Write the requirement until a test engineer you have never met could design the test from the requirement text alone, without asking you a single clarifying question.'],callout:{type:'gold',label:'The Six INCOSE Well-Formedness Criteria — One Sentence Each',body:'Necessary: if you delete it, the mission is compromised. Unambiguous: one reader, one interpretation, zero escape words. Verifiable: a test engineer can design a pass/fail test without asking you any questions. Consistent: it does not contradict any other requirement. Complete: all operational conditions and boundary states are addressed. Feasible: it is physically achievable within program cost, schedule, and technology constraints. Every "shall" statement earns its place by satisfying all six.'}},{heading:'💡 Real-World: Joby Aviation S4 — 800+ Certification Requirements From One Design',paragraphs:['Joby Aviation\'s S4 eVTOL is currently under FAA Part 23 type certification. The certification basis includes over 800 system-level requirements derived from Advisory Circular AC 23.1309-1E. Each requirement specifies a compliance method: Analysis (MOC 2), Test (MOC 4), Inspection (MOC 5), or Simulation (MOC 6). The Failure Hazard Assessment identifies each failure mode, its severity classification (Catastrophic, Hazardous, Major, Minor), and its probability threshold. A Catastrophic failure mode — one that results in loss of aircraft — must be shown to have a probability of occurrence no greater than 1×10⁻⁹ per flight hour.','For graduate students: this is not a theoretical exercise. Every BDD block in your eVTOL model corresponds to a physical assembly whose failure modes appear in the FHA. Every IBD interface corresponds to a signal path whose loss or corruption is a potential hazard. Every parametric constraint block connects to a performance requirement with a specific verification method. The MBSE model is not documentation of the design — it is the living engineering record from which certification artifacts are generated. If you design your MBSE model correctly, the compliance matrix, the FHA, and the RVM are all query outputs, not separate documents to author.']}],
    schemaVisualizer: [
      {
        category: 'SysML Requirements',
        name: 'Requirements Diagram (REQ)',
        diagramType: 'Requirement Diagram',
        shortDesc: 'Captures requirements as model elements with formal traceability relationships to needs, design, and verification.',
        fullDesc: 'The SysML Requirements Diagram represents requirements as first-class model elements — not rows in a spreadsheet. Each Requirement has a mandatory id and text property and participates in directed relationships that form the traceability graph. The diagram supports containment (hierarchical breakdown), derive, refine, trace, satisfy, and verify relationships. A complete requirements model enables automated impact analysis: a query on derive relationships surfaces all children of a changed parent requirement; a query on satisfy confirms design-to-requirement allocation coverage; a query on verify produces the Requirements Verification Matrix.',
        notation: [
          'Requirement: rectangle with «requirement» stereotype, id and text properties in compartments.',
          'Containment: nesting (child inside parent rectangle) or containment line — hierarchical decomposition.',
          '«derive»: dashed arrow FROM derived requirement TO source requirement.',
          '«refine»: dashed arrow FROM refining element TO refined element.',
          '«satisfy»: dashed arrow FROM satisfying Block TO satisfied Requirement.',
          '«verify»: dashed arrow FROM TestCase TO verified Requirement.',
          '«trace»: dashed arrow for non-semantic bookkeeping — weakest relationship.',
        ,
{category:'SysML Reference',name:'Nine Diagram Types — Four Pillars',diagramType:'Reference Card',shortDesc:'Complete reference showing all 9 SysML 1.7 diagram types across the 4 pillars. Memorize this map for the midterm and final exam.',fullDesc:'OMG SysML 1.7 (formal/19-11-01, ISO/IEC 19514:2017) organizes nine diagram types across four pillars. Requirements (1): Requirement Diagram. Structure (3): BDD, IBD, Package. Behavior (4): Use Case, Activity, Sequence, State Machine. Parametric (1): Parametric Diagram. Every WSU CEG/EGR 7800 lecture develops one or more of these diagram types. Cross-pillar traceability connects all four pillars into the complete MBSE model.',notation:['Requirements pillar: 1 diagram type — Requirement Diagram (traceability and derivation).','Structure pillar: 3 diagram types — BDD (type model), IBD (instance wiring), Package (namespace).','Behavior pillar: 4 diagram types — Use Case (scope), Activity (flow), Sequence (interaction), State Machine (lifecycle).','Parametric pillar: 1 diagram type — Parametric Diagram (quantitative constraints).','Ref: OMG SysML 1.7 Specification formal/19-11-01, Table 1 — Diagram Types. https://www.omg.org/spec/SysML/1.7'],example:'Lecture 3 diagram types map to the highlighted pillar(s) in the reference card above. Connect each diagram type you produce to its pillar, and trace the cross-pillar relationships that make your model an integrated whole rather than a collection of disconnected views.',svgMarkup:`<svg viewBox="0 0 430 175" xmlns="http://www.w3.org/2000/svg" style="padding:10px;background:#1a1a1a;"><text x="215" y="15" font-family="JetBrains Mono,monospace" font-size="8" fill="#5aad7a" text-anchor="middle">OMG SysML 1.7 — 9 Diagram Types across 4 Pillars (ISO/IEC 19514:2017)</text><rect x="8" y="22" width="88" height="70" rx="4" fill="rgba(2,105,55,0.1)" stroke="#026937" stroke-width="1.3"/><text x="52" y="35" font-family="JetBrains Mono,monospace" font-size="7" fill="#026937" text-anchor="middle" font-weight="bold">REQUIREMENTS</text><rect x="14" y="42" width="76" height="16" rx="3" fill="#1a2a1a" stroke="#5aad7a" stroke-width="0.8"/><text x="52" y="54" font-family="JetBrains Mono,monospace" font-size="6.5" fill="#c5d8e8" text-anchor="middle">Requirement Diagram</text><rect x="102" y="22" width="88" height="105" rx="4" fill="rgba(2,105,55,0.1)" stroke="#026937" stroke-width="1.3"/><text x="146" y="35" font-family="JetBrains Mono,monospace" font-size="7" fill="#026937" text-anchor="middle" font-weight="bold">STRUCTURE</text><rect x="108" y="42" width="76" height="15" rx="3" fill="#1a2a1a" stroke="#5aad7a" stroke-width="0.8"/><text x="146" y="53" font-family="JetBrains Mono,monospace" font-size="6.5" fill="#c5d8e8" text-anchor="middle">Block Def. Diagram</text><rect x="108" y="61" width="76" height="15" rx="3" fill="#1a2a1a" stroke="#5aad7a" stroke-width="0.8"/><text x="146" y="72" font-family="JetBrains Mono,monospace" font-size="6.5" fill="#c5d8e8" text-anchor="middle">Internal Block Diag.</text><rect x="108" y="80" width="76" height="15" rx="3" fill="#1a2a1a" stroke="#5aad7a" stroke-width="0.8"/><text x="146" y="91" font-family="JetBrains Mono,monospace" font-size="6.5" fill="#c5d8e8" text-anchor="middle">Package Diagram</text><rect x="196" y="22" width="88" height="140" rx="4" fill="rgba(2,105,55,0.1)" stroke="#026937" stroke-width="1.3"/><text x="240" y="35" font-family="JetBrains Mono,monospace" font-size="7" fill="#026937" text-anchor="middle" font-weight="bold">BEHAVIOR</text><rect x="202" y="42" width="76" height="14" rx="3" fill="#1a2a1a" stroke="#5aad7a" stroke-width="0.8"/><text x="240" y="53" font-family="JetBrains Mono,monospace" font-size="6.5" fill="#c5d8e8" text-anchor="middle">Use Case Diagram</text><rect x="202" y="60" width="76" height="14" rx="3" fill="#1a2a1a" stroke="#5aad7a" stroke-width="0.8"/><text x="240" y="71" font-family="JetBrains Mono,monospace" font-size="6.5" fill="#c5d8e8" text-anchor="middle">Activity Diagram</text><rect x="202" y="78" width="76" height="14" rx="3" fill="#1a2a1a" stroke="#5aad7a" stroke-width="0.8"/><text x="240" y="89" font-family="JetBrains Mono,monospace" font-size="6.5" fill="#c5d8e8" text-anchor="middle">Sequence Diagram</text><rect x="202" y="96" width="76" height="14" rx="3" fill="#1a2a1a" stroke="#5aad7a" stroke-width="0.8"/><text x="240" y="107" font-family="JetBrains Mono,monospace" font-size="6.5" fill="#c5d8e8" text-anchor="middle">State Machine Diag.</text><rect x="290" y="22" width="88" height="70" rx="4" fill="rgba(201,162,39,0.08)" stroke="#C9A227" stroke-width="1.3"/><text x="334" y="35" font-family="JetBrains Mono,monospace" font-size="7" fill="#C9A227" text-anchor="middle" font-weight="bold">PARAMETRIC</text><rect x="296" y="42" width="76" height="18" rx="3" fill="#1a2a1a" stroke="#C9A227" stroke-width="0.8"/><text x="334" y="55" font-family="JetBrains Mono,monospace" font-size="6.5" fill="#c5d8e8" text-anchor="middle">Parametric Diagram</text><text x="215" y="170" font-family="JetBrains Mono,monospace" font-size="6.5" fill="#4e5668" text-anchor="middle">Ref: OMG SysML 1.7 formal/19-11-01 · ISO/IEC 19514:2017 · omg.org/spec/SysML/1.7</text></svg>`},
{category:'INCOSE Lifecycle Reference',name:'SE Lifecycle — Lecture 3 Position',diagramType:'Process Reference (informative)',shortDesc:'INCOSE SE Handbook v5 six-phase lifecycle with Lecture 3 phase highlighted. Know where you are in the lifecycle at all times.',fullDesc:'INCOSE SE Handbook v5 (2023) defines six lifecycle stages, each bounded by decision gates requiring defined model maturity. Every MBSE activity in this course maps to one or more stages. The highlighted phase shows where Lecture 3 activities fall in the lifecycle. Know the gate entry criteria — they appear on the midterm and final exam.',notation:['Highlighted phase = primary lifecycle context for Lecture 3 activities.','Phase gate = decision point requiring authority approval and defined model maturity.','MCR: Mission Concept Review; SRR: System Requirements Review; PDR: Preliminary Design Review.','CDR: Critical Design Review; TRR: Test Readiness Review; OAR: Operational Acceptance Review.','Ref: INCOSE (2023). SE Handbook v5, Section 2.3 — Systems Lifecycle Stages.'],example:'At PDR (after Lecture 7), your model must pass: derivation coverage 100%, allocation coverage 100%, no orphaned requirements, naming convention compliance 100%. These are the exact criteria evaluated in Mini Project 1.',svgMarkup:`<svg viewBox="0 0 430 98" xmlns="http://www.w3.org/2000/svg" style="padding:10px;background:#1a1a1a;"><defs><marker id="lca3" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto"><polygon points="0 0,6 2,0 4" fill="#5aad7a"/></marker></defs><text x="215" y="15" font-family="JetBrains Mono,monospace" font-size="7.5" fill="#5aad7a" text-anchor="middle">INCOSE SE Handbook v5 — Lifecycle (L3: System Definition highlighted)</text><rect x="6" y="24" width="60" height="30" rx="3" fill="#1a2a1a" stroke="#026937" stroke-width="1"/><text x="36" y="44" font-family="JetBrains Mono,monospace" font-size='6.5' fill="#026937" text-anchor="middle" font-weight='normal'>Concept</text><rect x="76" y="24" width="60" height="30" rx="3" fill="#1a2a1a" stroke="#C9A227" stroke-width="1.8"/><text x="106" y="44" font-family="JetBrains Mono,monospace" font-size='7.5' fill="#C9A227" text-anchor="middle" font-weight='bold'>Sys Def</text><rect x="146" y="24" width="60" height="30" rx="3" fill="#1a2a1a" stroke="#026937" stroke-width="1"/><text x="176" y="44" font-family="JetBrains Mono,monospace" font-size='6.5' fill="#026937" text-anchor="middle" font-weight='normal'>Realization</text><rect x="216" y="24" width="60" height="30" rx="3" fill="#1a2a1a" stroke="#026937" stroke-width="1"/><text x="246" y="44" font-family="JetBrains Mono,monospace" font-size='6.5' fill="#026937" text-anchor="middle" font-weight='normal'>I&V</text><rect x="286" y="24" width="60" height="30" rx="3" fill="#1a2a1a" stroke="#026937" stroke-width="1"/><text x="316" y="44" font-family="JetBrains Mono,monospace" font-size='6.5' fill="#026937" text-anchor="middle" font-weight='normal'>Qual & Trans</text><rect x="356" y="24" width="60" height="30" rx="3" fill="#1a2a1a" stroke="#026937" stroke-width="1"/><text x="386" y="44" font-family="JetBrains Mono,monospace" font-size='6.5' fill="#026937" text-anchor="middle" font-weight='normal'>Ops & Maint</text><line x1="66" y1="39" x2="76" y2="39" stroke="#5aad7a" stroke-width="1" marker-end="url(#lca3)"/><line x1="136" y1="39" x2="146" y2="39" stroke="#5aad7a" stroke-width="1" marker-end="url(#lca3)"/><line x1="206" y1="39" x2="216" y2="39" stroke="#5aad7a" stroke-width="1" marker-end="url(#lca3)"/><line x1="276" y1="39" x2="286" y2="39" stroke="#5aad7a" stroke-width="1" marker-end="url(#lca3)"/><line x1="346" y1="39" x2="356" y2="39" stroke="#5aad7a" stroke-width="1" marker-end="url(#lca3)"/><polygon points="66,55 72,62 66,69 60,62" fill="#0d1a0d" stroke="#C9A227" stroke-width="1"/><text x="66" y="80" font-family="JetBrains Mono,monospace" font-size="6" fill="#C9A227" text-anchor="middle">MCR</text><polygon points="136,55 142,62 136,69 130,62" fill="#0d1a0d" stroke="#C9A227" stroke-width="1"/><text x="136" y="80" font-family="JetBrains Mono,monospace" font-size="6" fill="#C9A227" text-anchor="middle">SRR/PDR</text><polygon points="206,55 212,62 206,69 200,62" fill="#0d1a0d" stroke="#C9A227" stroke-width="1"/><text x="206" y="80" font-family="JetBrains Mono,monospace" font-size="6" fill="#C9A227" text-anchor="middle">CDR</text><polygon points="276,55 282,62 276,69 270,62" fill="#0d1a0d" stroke="#C9A227" stroke-width="1"/><text x="276" y="80" font-family="JetBrains Mono,monospace" font-size="6" fill="#C9A227" text-anchor="middle">TRR</text><polygon points="346,55 352,62 346,69 340,62" fill="#0d1a0d" stroke="#C9A227" stroke-width="1"/><text x="346" y="80" font-family="JetBrains Mono,monospace" font-size="6" fill="#C9A227" text-anchor="middle">OAR</text><text x="215" y="95" font-family="JetBrains Mono,monospace" font-size="6.5" fill="#4e5668" text-anchor="middle">Ref: INCOSE (2023). SE Handbook v5, Section 2.3 — Systems Lifecycle Stages</text></svg>`}
  ],
        example: 'AWRF requirements chain: StakeholderNeed STK-001 (pick rate ≥ 450/hr) → «derive» → SYS-REQ-001 (robot dispatch ≤ 3.0 s) → «derive» → DRV-REQ-001 (navigation algorithm execution ≤ 1.8 s). AMR_FleetController block «satisfy» SYS-REQ-001. NavigationLatencyTest «verify» DRV-REQ-001.',
        svgMarkup: `<svg viewBox="0 0 430 210" xmlns="http://www.w3.org/2000/svg" style="padding:12px;background:#1a1a1a;">
          <defs>
            <marker id="req3-arr" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
              <polygon points="0 0,8 3,0 6" fill="#7a9ab4"/>
            </marker>
            <style>
              .r3b{fill:#1e2a1e;stroke:#5aad7a;stroke-width:1.3;}
              .r3h{fill:rgba(2,105,55,0.25);}
              .r3t{font-family:'JetBrains Mono',monospace;font-size:8px;fill:#c5d8e8;text-anchor:middle;}
              .r3k{font-family:'JetBrains Mono',monospace;font-size:7.5px;fill:#5aad7a;text-anchor:middle;}
              .r3l{font-family:'JetBrains Mono',monospace;font-size:7px;fill:#C9A227;text-anchor:middle;}
              .r3a{stroke:#7a9ab4;stroke-width:1.1;stroke-dasharray:5,3;fill:none;}
            </style>
          </defs>
          <!-- Stakeholder Need -->
          <rect x="10" y="10" width="130" height="56" rx="3" class="r3b"/>
          <rect x="10" y="10" width="130" height="18" rx="3" class="r3h"/>
          <text x="75" y="23" class="r3k">«stakeholderNeed»</text>
          <text x="75" y="38" class="r3t" font-weight="bold">STK-001</text>
          <text x="75" y="52" class="r3t" style="font-size:7px;">Pick rate ≥ 450/hr</text>
          <!-- System Req -->
          <rect x="160" y="10" width="130" height="56" rx="3" class="r3b"/>
          <rect x="160" y="10" width="130" height="18" rx="3" class="r3h"/>
          <text x="225" y="23" class="r3k">«requirement»</text>
          <text x="225" y="38" class="r3t" font-weight="bold">SYS-REQ-001</text>
          <text x="225" y="52" class="r3t" style="font-size:7px;">Dispatch ≤ 3.0 s</text>
          <!-- Derived Req -->
          <rect x="310" y="10" width="112" height="56" rx="3" class="r3b"/>
          <rect x="310" y="10" width="112" height="18" rx="3" class="r3h"/>
          <text x="366" y="23" class="r3k">«requirement»</text>
          <text x="366" y="38" class="r3t" font-weight="bold">DRV-REQ-001</text>
          <text x="366" y="52" class="r3t" style="font-size:7px;">Nav exec ≤ 1.8 s</text>
          <!-- Satisfy Block -->
          <rect x="140" y="130" width="130" height="48" rx="3" class="r3b"/>
          <rect x="140" y="130" width="130" height="18" rx="3" class="r3h"/>
          <text x="205" y="143" class="r3k">«block»</text>
          <text x="205" y="158" class="r3t" font-weight="bold">AMR_FleetController</text>
          <text x="205" y="170" class="r3t" style="font-size:7px;">+ dispatchLatency: s</text>
          <!-- Verify TestCase -->
          <rect x="290" y="130" width="130" height="48" rx="3" class="r3b"/>
          <rect x="290" y="130" width="130" height="18" rx="3" class="r3h"/>
          <text x="355" y="143" class="r3k">«testCase»</text>
          <text x="355" y="158" class="r3t" font-weight="bold">NavLatencyTest</text>
          <text x="355" y="170" class="r3t" style="font-size:7px;">method: Test (T)</text>
          <!-- Arrows -->
          <line x1="140" y1="38" x2="160" y2="38" class="r3a" marker-end="url(#req3-arr)"/>
          <text x="150" y="32" class="r3l">«derive»</text>
          <line x1="290" y1="38" x2="310" y2="38" class="r3a" marker-end="url(#req3-arr)"/>
          <text x="300" y="32" class="r3l">«derive»</text>
          <line x1="205" y1="130" x2="225" y2="66" class="r3a" marker-end="url(#req3-arr)"/>
          <text x="186" y="105" class="r3l">«satisfy»</text>
          <line x1="355" y1="130" x2="366" y2="66" class="r3a" marker-end="url(#req3-arr)"/>
          <text x="376" y="108" class="r3l">«verify»</text>
        </svg>`,
      },
    ],
    playground: {
      title: 'Requirements Traceability Canvas — Build the AWRF Requirements Chain',
      instructions: 'Add requirement blocks and design blocks from the palette. Connect them with the appropriate relationships: «derive» between parent and child requirements, «satisfy» from a design block to a requirement, and «verify» from a test case to a requirement. Build the full traceability chain from stakeholder need to verification.',
      objectives: [
        'Add STK-001 (stakeholder need) and SYS-REQ-001 (system requirement) and connect with «derive».',
        'Add the AMR_FleetController design block and connect to SYS-REQ-001 with «satisfy».',
        'Add a DispatchLatencyTest block and connect to SYS-REQ-001 with «verify».',
        'Observe that the full chain — need → requirement → design → test — is now traceable in the model.',
      ],
      palette: [
        { stereotype: '«stakeholderNeed»', name: 'STK-001',               props: ['+ text: Pick rate ≥ 450/hr'] },
        { stereotype: '«requirement»',     name: 'SYS-REQ-001',           props: ['+ text: Dispatch ≤ 3.0 s', '+ vm: Test'] },
        { stereotype: '«requirement»',     name: 'SYS-REQ-002',           props: ['+ text: Nav accuracy ≤ 0.05 m', '+ vm: Analysis'] },
        { stereotype: '«requirement»',     name: 'DRV-REQ-001',           props: ['+ text: Nav exec ≤ 1.8 s', '+ vm: Test'] },
        { stereotype: '«block»',           name: 'AMR_FleetController',   props: ['+ dispatchLatency: s'] },
        { stereotype: '«block»',           name: 'NavigationSubsystem',   props: ['+ algorithm: SLAM'] },
        { stereotype: '«testCase»',        name: 'DispatchLatencyTest',   props: ['+ method: Test (T)'] },
        { stereotype: '«testCase»',        name: 'NavAccuracyAnalysis',   props: ['+ method: Analysis (A)'] },
      ],
      defaultBlocks: [
        { stereotype: '«stakeholderNeed»', name: 'STK-001',             props: ['+ text: Pick rate ≥ 450/hr'],    x: 20,  y: 60  },
        { stereotype: '«requirement»',     name: 'SYS-REQ-001',         props: ['+ text: Dispatch ≤ 3.0 s'],      x: 220, y: 60  },
        { stereotype: '«block»',           name: 'AMR_FleetController', props: ['+ dispatchLatency: s'],           x: 220, y: 220 },
      ],
    },
    quiz: {
      questions: [
        {
          question: 'Which of the following requirements is correctly written according to INCOSE well-formed requirement criteria?',
          options: [
            'The AWRF shall be fast and reliable.',
            'The AWRF shall maximize pick throughput under all conditions.',
            'The AWRF shall initiate robot dispatch within 3.0 seconds (±0.1 s) of receiving a confirmed PickOrder message under all load conditions up to 450 picks per hour.',
            'The AWRF should respond to pick orders in an appropriate timeframe.',
          ],
          correct: 2,
          explanation: 'Option C is the only well-formed requirement: it uses "shall" (not "should"), it is quantified (3.0 s ± 0.1 s), it states the condition (all load conditions up to 450 picks/hr), it specifies the measurement point (receipt of confirmed PickOrder message), and it is objectively testable. Options A and D use escape words ("fast," "reliable," "appropriate"); option B uses "maximize" without a quantified bound.',
        },
        {
          question: 'In SysML 1.7, which relationship indicates that a design Block provides the capability required by a Requirement?',
          options: ['«derive»', '«trace»', '«satisfy»', '«verify»'],
          correct: 2,
          explanation: '«satisfy» is the SysML relationship from a design element (Block, component, or subsystem) to the Requirement that it fulfills. It represents design-to-requirement allocation and is the primary mechanism for confirming that every requirement has at least one responsible design element. «verify» is for test cases, «derive» is for requirement-to-requirement derivation, and «trace» is a weak bookkeeping link.',
        },
        {
          question: 'A requirement states: "The robot shall navigate to the target and avoid all obstacles with 0.5 m clearance." What INCOSE writing criterion does this violate?',
          options: ['Feasibility', 'Atomicity — it is a compound requirement encoding two independent conditions', 'Necessity', 'Consistency'],
          correct: 1,
          explanation: 'This is a compound requirement: "navigate to target" and "avoid obstacles with 0.5 m clearance" are two independently verifiable conditions. They must be split into separate requirements with separate IDs, verification methods, and traceability chains. A compound requirement prevents independent compliance tracking — partial compliance is invisible in both the model and the test record.',
        },
        {
          question: 'Which verification method would be most appropriate for verifying that the AWRF battery system maintains a state of charge above 20% under the worst-case duty cycle?',
          options: [
            'Inspection (I) — visual check of the battery display.',
            'Demonstration (D) — run the robot and observe whether it stops.',
            'Analysis (A) — mathematical energy consumption model validated against component datasheets.',
            'Test (T) — instrumented measurement of SOC over a full operational shift under peak load.',
          ],
          correct: 3,
          explanation: 'Test (T) is the appropriate method because the requirement is quantified (SOC > 20%), the condition is specified (worst-case duty cycle), and the criterion must be confirmed by instrumented, repeatable measurement — not analysis alone (which depends on model assumptions) or demonstration alone (which lacks the instrumentation to confirm the 20% threshold precisely). At the system level, Test is the highest-confidence verification method for quantified performance requirements.',
        },
        {
          question: 'What is the correct direction of the «derive» arrow in a SysML Requirements Diagram?',
          options: [
            'FROM the parent (source) requirement TO the derived (child) requirement.',
            'FROM the derived (child) requirement TO the parent (source) requirement.',
            'Bidirectional — both directions are permitted.',
            'FROM the stakeholder need TO the system requirement — «derive» only applies at the top level.',
          ],
          correct: 1,
          explanation: 'The «derive» arrow points FROM the derived (child) requirement TO the parent (source) requirement — that is, the arrow points "upstream" toward the authority. This reflects the SysML dependency convention: the dependent element (the child that cannot exist without the parent) is the arrow tail, and the element it depends on (the parent) is the arrowhead. This direction is the opposite of what many engineers initially expect, making it one of the most frequently tested notation details.',
        },
      ],
    },
    assignment: {
      title: 'Assignment 3: Requirements Engineering — AWRF System Requirements Set',
      brief: 'You are the lead requirements engineer for the AWRF program. Your task is to develop a formally structured, INCOSE-compliant requirements set for the autonomous warehouse robot fleet. All requirements must be written in well-formed "shall" syntax, assigned verification methods, organized into a three-level hierarchy (stakeholder needs → system requirements → derived requirements), and partially modeled in a SysML Requirements Diagram showing at least three complete traceability chains.',
      deliverables: [
        'Requirements Set: Write a minimum of 20 system-level requirements covering: performance (pick rate, dispatch latency, navigation accuracy), safety (obstacle clearance, emergency stop response time, OSHA zone compliance), availability (fleet uptime, MTBF, MTTR), and interface (WMS API compliance, charging protocol). Each requirement must include: ID, text (shall syntax), verification method (A/I/D/T), priority (H/M/L), and source stakeholder.',
        'Requirements Hierarchy Table: Organize requirements into 3 levels: (L1) stakeholder needs, (L2) system requirements derived from L1, (L3) derived requirements driven by the chosen architecture. Minimum 3 L1 → L2 → L3 chains with «derive» rationale documented.',
        'SysML Requirements Diagram: Produce a requirements diagram (any compliant tool or hand-drawn) showing minimum 3 requirements with all applicable relationships: derive, satisfy (to a named Block), and verify (to a named TestCase or AnalysisResult).',
        'Requirements Verification Matrix (RVM): Produce a table mapping all 20 requirements to: verification method, verification event (unit test / integration test / qualification test / analysis report), responsible organization, and status (planned).',
        'Escape Word Audit: Review the provided set of 5 poorly written requirements (attached to assignment brief) and rewrite each using INCOSE well-formed criteria, documenting what escape word or structural error was corrected.',
      ],
      rubric: [
        { criterion: 'Requirements Quality & Well-Formedness', descriptor: 'All 20 requirements use shall, are quantified, atomic, and verifiable.', max: 30 },
        { criterion: 'Requirements Hierarchy & Derive Rationale', descriptor: '3 complete L1→L2→L3 chains with documented derivation rationale.', max: 20 },
        { criterion: 'SysML Requirements Diagram Correctness', descriptor: 'Correct arrow directions for derive, satisfy, verify; all three chains modeled.', max: 20 },
        { criterion: 'Requirements Verification Matrix Completeness', descriptor: 'All 20 requirements mapped; verification method, event, org, and status present.', max: 18 },
        { criterion: 'Escape Word Audit Quality', descriptor: 'Each rewrite correctly identifies the flaw and produces a quantified replacement.', max: 12 },
      ],
      gradingNotes: [
        'Any requirement using "shall be able to," "should," "will," or escape words receives zero for that requirement in the quality criterion.',
        'A «satisfy» arrow pointing FROM Requirement TO Block (reversed) receives zero for that chain — direction is mandatory.',
        'RVM rows without a verification method receive zero for that row — verification method is a required attribute, not optional.',
        'Late penalty: 10 points per calendar day after due date.',
      ],
    },
  
    courseMeta:{courseCode:'CEG/EGR 7800',courseTitle:'Model-Based Systems Engineering',university:'Wright State University',college:'College of Engineering and Computer Science',totalPoints:300,gradeBreakdown:{weeklyAssignments:{points:150,pct:50,desc:'30 weekly assignments x 5 pts each'},weeklyMCQ:{points:30,pct:10,desc:'30 quizzes x 5 Qs x 1 pt (auto-graded, closes Sunday 11:59 PM)'},miniProject1:{points:30,pct:10,desc:'AWRF Requirements and Architecture (due end of Week 8)'},miniProject2:{points:30,pct:10,desc:'eVTOL Parametric Sizing Study (due end of Week 17)'},midtermExam:{points:30,pct:10,desc:'Week 15 open-note exam covering Lectures 1-14 (90 minutes)'},finalProject:{points:60,pct:20,desc:'Capstone Portfolio Defense Week 30 — 3 track options: AWRF Track A, eVTOL Track B, CubeSat Track C'}},gradeScale:{A:'270-300 (90-100%)',B:'240-269 (80-89%)',C:'210-239 (70-79%)',D:'180-209 (60-69%)',F:'below 180 (below 60%)'},latePenalty:'10 points per calendar day; no submissions after 5 days past due date',academicIntegrity:'Per WSU Academic Integrity Policy: all model artifacts must be individually authored'},
    weeklyMCQ:{points:5,closesDay:'Sunday 11:59 PM',instructions:'Auto-graded. 2 attempts; highest score counts. Covers key concepts of Lecture 3. Complete before Sunday 11:59 PM of the lecture week.',questions:[
      {question:'Which of the following is a well-formed AWRF system requirement per INCOSE SE Handbook v5 criteria?',options:['The AWRF shall be reliable.','The AWRF should dispatch robots quickly.','The AWRF shall initiate robot dispatch within 3.0 s (±0.1 s) of receiving a confirmed PickOrder message under all operational loads up to 450 picks per hour.','The AWRF shall maximize throughput under all conditions.'],correct:2,explanation:'Option C satisfies all six INCOSE well-formed criteria: necessary (without this, mission is not met), unambiguous (one interpretation), verifiable (3.0 s threshold is testable), consistent (does not conflict with other requirements), complete (condition stated), and feasible (achievable). Options A, B, D use escape words or "should."'},
      {question:'A compound requirement states: "The robot shall navigate to the target within 30 s AND maintain 0.5 m obstacle clearance." What INCOSE criterion does this violate, and what is the correct fix?',options:['It violates verifiability; fix: add units.','It violates atomicity; fix: split into two separate requirements each with its own ID, verification method, and traceability.','It violates necessity; fix: remove the obstacle clearance condition.','It violates consistency; fix: cross-reference both conditions to a single parent requirement.'],correct:1,explanation:'Atomicity requires each requirement to encode one independently verifiable condition. A compound requirement prevents independent compliance tracking — partial compliance (navigates to target but violates clearance) is invisible in the model. The fix is two atomic requirements: REQ-NAV-001 (dispatch ≤ 30 s) and REQ-SAFE-001 (clearance ≥ 0.5 m).'},
      {question:'The «derive» arrow in a SysML Requirements Diagram points FROM the derived (child) requirement TO the parent (source). What does this direction express?',options:['The child requirement is more important than the parent.','The child is the dependent element — it cannot exist without the parent — so per SysML dependency convention, the arrow points FROM the dependent TO the element depended upon.','The parent requirement was approved after the child was written.','The arrow direction is arbitrary and has no semantic meaning.'],correct:1,explanation:'SysML dependency convention: arrow FROM dependent element TO the element it depends on. The derived requirement (child) depends on the parent for its existence and authority. This direction makes the query "find all children of this parent" efficient: traverse incoming derive edges from the parent node.'},
      {question:'Verification coverage at CDR must equal 100%. A program with 120 requirements has verified 108 at CDR. What are the mandatory actions?',options:['CDR can proceed — 90% is close enough.','The 12 unverified requirements must each receive a planned verification event, success criterion, and responsible organization in the model before CDR approval; waivers require customer written agreement.','The 12 unverified requirements should be deleted from the model.','CDR is rescheduled until the remaining requirements are verified in hardware.'],correct:1,explanation:'100% verification coverage at CDR means every requirement has a verification method, event, and criterion assigned — not that verification has been executed (that happens at qualification). The 12 gaps must be closed before CDR sign-off: assign verification event, document success criterion, record responsible organization. Waivers require formal customer agreement.'},
      {question:'Which verification method is most appropriate for the AWRF requirement "the fleet shall maintain battery SOC above 20% under the worst-case 8-hour operational duty cycle"?',options:['Inspection (I) — visual check of battery indicator.','Demonstration (D) — run the fleet and observe whether it stops.','Analysis (A) — mathematical energy consumption model against component datasheets.','Test (T) — instrumented measurement of SOC across 3 complete worst-case operational shifts.'],correct:3,explanation:'Test (T) is required because the threshold (SOC > 20%) is quantified and must be confirmed by instrumented, repeatable measurement under defined conditions (worst-case 8-hour duty cycle). Analysis alone depends on model assumptions that may not reflect real duty cycle variability. Test with three repeat runs provides the statistical confidence needed for safety-relevant SOC thresholds.'}
    ]},
    miniProject:{status:'building',dueWeek:8,title:'Mini Project 1: AWRF System Requirements Definition and Structural Architecture',note:'Lecture 3 of 7 pre-MP1 lectures. Full specification available at Lecture 8.'},
  };
  if (typeof window.registerLecture === 'function') {
    window.registerLecture(3, LECTURE_3_DATA);
  } else {
    window.MBSE_COURSE_DATA = window.MBSE_COURSE_DATA || {};
    window.MBSE_COURSE_DATA[3] = LECTURE_3_DATA;
  }
})();

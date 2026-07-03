/**
 * lecture22.js — MBSE & SysML Course Portal · Wright State University
 * Lecture 22: SysML v2 Transition — Concepts, Architecture & Migration Strategy
 *
 * Primary References (verified against live GitHub repositories, July 2026):
 *   [1] https://github.com/Systems-Modeling/SysML-v2-Release
 *   [2] https://github.com/Systems-Modeling/SysML-v2-Pilot-Implementation
 *   [3] https://github.com/Open-MBEE/SysML-v2-Applications-and-Examples
 *
 * OMG Timeline (authoritative, from SysML-v2-Release README):
 *   June 2023     : Beta specifications adopted by OMG
 *   2023–2025     : Finalization task forces active
 *   30 June 2025  : KerML 1.0, SysML v2.0, and API 1.0 formally adopted by OMG
 *   March 2026    : Specifications updated editorially for ISO submission
 *   2026-04 release: Latest incremental release (May 14, 2026)
 */
(function () {
  'use strict';

  const D = {
    meta: {
      id: 22, week: 22, unit: 'Digital Thread',
      title: 'SysML v2 Transition: Concepts, Architecture & Migration Strategy',
      duration: '90 min', difficulty: 'Advanced', creditHours: 3, studyHours: '5–6 hrs',
      tools: [
        'Eclipse SysML v2 Editor (from SysML-v2-Release install/eclipse)',
        'Jupyter with SysML v2 Kernel (from SysML-v2-Release install/jupyter)',
        'CATIA Magic 2024x (SysML 1.7 baseline)',
        'PlantUML with SysML v2 extensions',
      ],
      prerequisites: ['Lectures 1–21 — full SysML 1.7 course sequence'],
      objectives: [
        'State the correct OMG adoption timeline for KerML 1.0, SysML v2.0, and the API specification',
        'Explain the role and purpose of the Kernel Modeling Language (KerML) as the semantic foundation of SysML v2',
        'Distinguish SysML v2 Part semantics from SysML 1.7 Block/Property semantics',
        'Identify the five most significant structural changes from SysML 1.7 to SysML v2',
        'Install and operate the SysML v2 Pilot Implementation (Eclipse editor and Jupyter kernel)',
        'Write basic SysML v2 textual notation for parts, attributes, connections, and actions',
        'Apply a structured three-phase migration strategy to the AWRF SysML 1.7 model',
        'Explain the Systems Modeling API and its role in tool interoperability',
      ],
      commonErrors: [
        'Stating that SysML v2 was adopted in March 2024 (incorrect — beta specs were adopted June 2023; formal adoption was 30 June 2025)',
        'Treating SysML v2 as a graphical update to SysML 1.7 (it is a complete metamodel redesign with a new formal semantic foundation)',
        'Confusing KerML and SysML v2 (KerML is the kernel language; SysML v2 extends KerML with systems engineering concepts)',
        'Assuming SysML 1.7 XMI files migrate automatically to SysML v2 (no direct upward compatibility exists; migration requires model transformation)',
        'Installing only the Eclipse editor and missing the Jupyter kernel option (both are available from the same release repository)',
      ],
    },

    content: [
      {
        heading: '1 · The Correct OMG Adoption Timeline — Setting the Record Straight',
        paragraphs: [
          'One of the most frequently misquoted facts about SysML v2 is its adoption date. The authoritative source is the README of the official SysML v2 Release repository, maintained by the Reference Implementation Working Group of the OMG Systems Modeling Community (SMC): https://github.com/Systems-Modeling/SysML-v2-Release. According to that document, in June 2023 the OMG adopted beta specifications for three interdependent standards: the Kernel Modeling Language (KerML) version 1.0, the OMG Systems Modeling Language (SysML) version 2.0, and the Systems Modeling Application Programming Interface (API) and Services version 1.0. These beta specifications then entered the OMG finalization process, during which the Reference Implementation Working Group continued to publish incremental releases of the pilot implementation.',
          'After the completion of the finalization task forces, the OMG published formal versions of all three specifications. As of 30 June 2025, these specifications were formally adopted by OMG. The formal specifications were subsequently updated editorially in March 2026 for submission to the International Organization for Standards (ISO). The latest incremental release of the pilot implementation is tagged 2026-04 (published May 14, 2026), available at https://github.com/Systems-Modeling/SysML-v2-Pilot-Implementation/releases. As of that release, the Pilot Implementation repository has accumulated 85 tagged releases and 4,786 commits, reflecting nearly seven years of continuous development by the Reference Implementation Working Group.',
          'For students entering the workforce in 2025–2026, this timeline has a direct practical implication: SysML v2 is a formally adopted OMG standard, not a draft or preview. New programs that are architecting their MBSE toolchain today must decide whether to begin on SysML v2 natively (using the Eclipse editor or Jupyter kernel from the release repository), continue on SysML 1.7 (using CATIA Magic, Rhapsody, or Papyrus), or plan a phased migration at a defined program milestone. The INCOSE Systems Engineering Handbook v5 guidance is toolchain-agnostic but recommends selecting the modeling language and tool before the SRR gate and maintaining that selection through CDR.',
        ],
        callout: {
          type: 'gold',
          label: 'Authoritative OMG Timeline — SysML v2 (from github.com/Systems-Modeling/SysML-v2-Release)',
          body: '<strong>June 2023:</strong> Beta specifications adopted by OMG — KerML 1.0, SysML 2.0, API 1.0.<br><strong>2023–2025:</strong> Finalization task forces active; pilot implementation releases published continuously.<br><strong>30 June 2025:</strong> KerML 1.0, SysML 2.0, and Systems Modeling API 1.0 formally adopted by OMG.<br><strong>March 2026:</strong> Specifications updated editorially for ISO submission.<br><strong>2026-04 (May 2026):</strong> Latest release — Eclipse editor + Jupyter kernel available at https://github.com/Systems-Modeling/SysML-v2-Release/releases<br><br><strong>Specification URLs (OMG normative):</strong><br>KerML 1.0: https://www.omg.org/spec/KerML/1.0<br>SysML 2.0: https://www.omg.org/spec/SysML/2.0<br>API 1.0: https://www.omg.org/spec/SystemsModelingAPI/1.0',
        },
      },
      {
        heading: '2 · The Kernel Modeling Language (KerML) — Why a New Semantic Foundation Was Necessary',
        paragraphs: [
          'SysML 1.7 is defined as a profile of UML 2.5.1: it reuses the UML metamodel and extends it with stereotype applications and tagged values that carry systems engineering semantics. This profile-based architecture has a fundamental limitation: UML was designed for software object modeling, and many of its semantic assumptions — about object identity, temporal scope, encapsulation, and inheritance — are poorly matched to the physics-based, multi-domain, multi-timescale modeling requirements of systems engineering. The result is a collection of well-documented ambiguities in SysML 1.7 semantics, particularly in port and flow modeling, parametric constraint binding, allocation semantics, and the handling of non-software system elements like physical quantities with units.',
          'SysML v2 is not a profile of UML. It is built on a new, purpose-designed semantic foundation: the Kernel Modeling Language (KerML), formally specified at https://www.omg.org/spec/KerML/1.0 and implemented in the pilot implementation at https://github.com/Systems-Modeling/SysML-v2-Pilot-Implementation. KerML is a precise, mathematically grounded modeling language that defines the core concepts of classification, typing, and instance identity in a way that is independent of any specific domain. KerML introduces the concept of a Feature — a slot that a classifier defines for its instances — and the concept of Multiplicity — the number of instances of a feature that a classifier can have — using set-theoretic semantics that eliminate the ambiguities in UML\'s structural semantics.',
          'The relationship between KerML and SysML v2 is analogous to the relationship between a general-purpose programming language and a domain-specific library: SysML v2 is a systems engineering specialization of KerML, adding the systems engineering vocabulary (Part, Action, Connection, Interface, Requirement, Constraint, View, Viewpoint, Rendering, Analysis) as typed specializations of KerML\'s core Feature concept. This architecture means that the semantic foundation of SysML v2 is formally consistent — every SysML v2 concept has a precise definition in terms of KerML primitives — and that the language is extensible: domain-specific languages for aerospace, automotive, and electronics can be defined as further specializations of SysML v2 without requiring metamodel changes.',
        ],
        callout: {
          type: 'standard',
          label: 'KerML vs SysML v2 vs SysML 1.7 — Three-Layer Comparison',
          body: '<strong>SysML 1.7:</strong> Profile of UML 2.5.1; graphical notation only; semantic ambiguities in ports, flows, allocations; no textual syntax; tool-specific XMI (no standard API). Standard: ISO/IEC 19514:2017.<br><br><strong>KerML 1.0:</strong> New general-purpose kernel language; formal set-theoretic semantics; textual notation (primary); mathematical foundation for classification, typing, multiplicity. Standard: OMG KerML 1.0 (formally adopted June 2025).<br><br><strong>SysML v2.0:</strong> Systems engineering specialization of KerML; adds Part, Action, Connection, Requirement, Constraint, View, etc.; both textual and graphical notation; standard REST API for tool interoperability. Standard: OMG SysML 2.0 (formally adopted June 2025).',
        },
      },
      {
        heading: '3 · Five Defining Changes from SysML 1.7 to SysML v2',
        paragraphs: [
          'The first and most practically significant change is the introduction of a textual notation as a first-class, normatively specified syntax. In SysML 1.7, the only normative syntax is the graphical notation; text representations are tool-specific and non-portable. In SysML v2, the textual notation is primary — it is the syntax implemented in the Eclipse Xtext editor available at https://github.com/Systems-Modeling/SysML-v2-Release/tree/master/install/eclipse, and it is the syntax executed in the Jupyter kernel available at https://github.com/Systems-Modeling/SysML-v2-Release/tree/master/install/jupyter. A simple block definition in SysML 1.7 (a rectangle with «block» stereotype) becomes a part definition in SysML v2 text: "part def AMR { attribute maxPayload : MassValue; attribute maxSpeed : SpeedValue; part navSub : NavigationSubsystem; }" The graphical notation for SysML v2 is derived from the textual model through rendering rules, rather than being the primary artifact.',
          'The second major change is the complete restructuring of the port and flow model. SysML 1.7\'s proxy port / full port distinction — introduced in SysML 1.4 to address port semantics issues — created a new set of ambiguities that practitioners found difficult to apply consistently. SysML v2 replaces the proxy/full port distinction with a unified port model based on KerML\'s Feature semantics, in which a port is a feature that defines the interface points of a part through directed flows. A flow in SysML v2 is typed, directed, and carried on a connection — a single, coherent model element rather than a combination of connector, item flow, and port type that SysML 1.7 requires. The Open-MBEE SysML v2 examples repository at https://github.com/Open-MBEE/SysML-v2-Applications-and-Examples demonstrates this simplified interface model in the spacecraft and CubeSat example notebooks.',
          'The third change is the replacement of the «allocate» dependency relationship with a first-class allocation semantic. In SysML 1.7, allocation is modeled through «allocate» dependencies and AllocationMatrix views, which have weak semantics that different tools implement inconsistently. SysML v2 introduces a formal allocation relationship as a subtype of the Reference feature, with defined interpretation rules that specify how a function allocation to a physical block is resolved during analysis. The fourth change is the introduction of Viewpoints and Views as first-class model elements with rendering specifications — formalizing the concept of model-based documentation. The fifth change is the Systems Modeling API: a standard REST API (https://www.omg.org/spec/SystemsModelingAPI/1.0) implemented in the pilot implementation\'s API server, enabling any tool to read and write SysML v2 model elements without proprietary format dependencies. A live prototype API server is accessible at http://sysml2.intercax.com:9000/docs/ for student experimentation.',
        ],
        equations: [
          '// SysML 1.7 Block (graphical notation required):',
          '// «block» AMR { maxPayload: kg; navSub: NavigationSub [1]; }',
          '',
          '// SysML v2 Part Definition (textual notation — normative):',
          'part def AMR {',
          '  attribute maxPayload : MassValue;',
          '  attribute maxSpeed   : SpeedValue;',
          '  part navSub  : NavigationSubsystem [1];',
          '  part powerSub: PowerSubsystem [1];',
          '  port powerPort : ~PowerInterface;   // unified port model',
          '}',
          '',
          '// SysML v2 Requirement (textual notation):',
          'requirement def <SYS-REQ-001> DispatchLatency {',
          '  doc /* The AWRF shall initiate dispatch within 3.0 s of PickOrder. */',
          '  attribute dispatchTime : DurationValue;',
          '  require constraint { dispatchTime <= 3.0 [s] }',
          '}',
        ],
      },
      {
        heading: '4 · Installing and Using the SysML v2 Pilot Implementation',
        paragraphs: [
          'The SysML v2 Pilot Implementation is maintained by the Reference Implementation Working Group and distributed from two GitHub repositories. The primary user entry point is https://github.com/Systems-Modeling/SysML-v2-Release, which provides installation packages for both supported environments. The development implementation repository is https://github.com/Systems-Modeling/SysML-v2-Pilot-Implementation, which contains the full Eclipse Xtext source code and is appropriate for contributors and developers who need to build from source.',
          'For students, two installation paths are provided in the SysML-v2-Release repository under the install/ directory. The Eclipse installation installs the SysML v2 Eclipse editor as a plugin into Eclipse Modeling Tools 2025-12 (Eclipse 4.38). The installer requires Java 21 and can be set up using the Oomph Eclipse Installer or manually by installing from the update site. The installed editor provides syntax highlighting, content assist, cross-reference resolution, and PlantUML-based diagram visualization for SysML v2 textual files with the .sysml extension. The Jupyter installation provides a SysML v2 language kernel for JupyterLab, enabling interactive SysML v2 modeling in notebook cells with immediate diagram rendering. This is the mode used in the Open-MBEE examples repository at https://github.com/Open-MBEE/SysML-v2-Applications-and-Examples, where worked examples including BallAndChain.ipynb, CubesatExample.ipynb, and spacecraft-example-model.ipynb demonstrate SysML v2 textual modeling with inline visualization.',
          'For Wright State University students, the Jupyter path is recommended for initial learning because it provides immediate visual feedback and does not require an Eclipse workspace configuration. The CubesatExample.ipynb notebook in particular is directly relevant to Lecture 28 (Small Satellite MBSE) and provides a complete SysML v2 textual model of a CubeSat power and communications system that students can compare against their own SysML 1.7 BDD models. The BallAndChain.ipynb notebook demonstrates SysML v2\'s improved parametric modeling capabilities, showing the equivalent of a SysML 1.7 parametric diagram in the textual notation with formal unit handling through the normative SysML v2 model library.',
        ],
        callout: {
          type: 'standard',
          label: 'Quick-Start: SysML v2 Jupyter Kernel (from SysML-v2-Release)',
          body: '1. Navigate to https://github.com/Systems-Modeling/SysML-v2-Release/releases and download the 2026-04 release zip.<br>2. In the install/jupyter directory, follow the README.md instructions to install the SysML v2 Jupyter kernel.<br>3. Launch JupyterLab and create a new notebook with the SysML 2 kernel.<br>4. In the first cell, write: <code>package AWRF_v2 { part def AMR { attribute maxPayload : Real; } }</code><br>5. Execute the cell — the kernel parses, validates, and renders a diagram via PlantUML.<br>6. Open BallAndChain.ipynb or CubesatExample.ipynb from https://github.com/Open-MBEE/SysML-v2-Applications-and-Examples to explore complete worked examples.<br><br>Eclipse Alternative: Install from https://github.com/Systems-Modeling/SysML-v2-Release/tree/master/install/eclipse using Eclipse Modeling Tools 2025-12, Java 21.',
        },
      },
      {
        heading: '5 · Three-Phase Migration Strategy — SysML 1.7 AWRF Model to SysML v2',
        paragraphs: [
          'Migrating the AWRF SysML 1.7 model to SysML v2 requires a structured three-phase approach because there is no automated round-trip migration path between SysML 1.7 (UML profile-based, tool-proprietary XMI) and SysML v2 (KerML-grounded, REST API-accessible). Phase 1 is Model Audit: before any migration activity, generate a complete model quality report for the SysML 1.7 AWRF model covering traceability coverage, naming convention compliance, orphan element count, and package architecture completeness. The audit establishes the "as-is" baseline against which the migrated model will be evaluated. Specifically audit all proxy port usages (which require restructuring for the SysML v2 unified port model), all «allocate» relationships (which must be converted to SysML v2 allocation features), and all parametric binding connectors (which will be re-expressed in SysML v2\'s constraint satisfaction syntax).',
          'Phase 2 is Selective Transformation: convert the AWRF model element by element, prioritizing the high-value elements that benefit most from SysML v2 semantics. Begin with the requirement definitions — the SysML v2 requirement syntax (requirement def with require constraint and doc annotations) is significantly more precise than SysML 1.7\'s «requirement» stereotype, and converting requirements first establishes the traceability anchors for the rest of the migration. Then convert part definitions (replacing BDD blocks), connection definitions (replacing IBD connectors with typed ports), and action definitions (replacing activity diagram actions). The normative SysML v2 model libraries in the sysml.library directory of the release repository provide SI unit types (MassValue, SpeedValue, PowerValue) that replace the custom unit value types from the SysML 1.7 model library.',
          'Phase 3 is Semantic Validation: compare the SysML v2 model against the SysML 1.7 baseline to confirm that every engineering assertion made by the original model is preserved in the migrated model. This is not a syntactic diff — it is an architectural review that confirms that the meaning of each model element is faithfully represented in the new language. For the AWRF, the critical validation checkpoints are: (1) the MTOW constraint network in the parametric model produces the same numerical results in the SysML v2 constraint satisfaction framework as it did in the SysML 1.7 parametric diagram bound to MATLAB; (2) the safety requirements with require constraint blocks correctly express the SIL 2 allocation originally modeled in the SysML 1.7 requirements diagram; and (3) all traceability relationships (derive, satisfy, verify) are preserved as SysML v2 require, satisfy, and verify features.',
        ],
      },
    
,{heading:'5 — Beyond the Core Specs: AADL Extension Library and the RTF Roadmap',paragraphs:['The Systems-Modeling GitHub organization hosts more than the core SysML v2 specifications. The SysML-v2-AADL-Release repository at github.com/Systems-Modeling/SysML-v2-AADL-Release contains a domain extension library that merges the SAE Architecture Analysis and Design Language (AADL v2) into SysML v2. This library, developed by the OMG Real-Time Embedded and Safety-Critical (RTESC) Working Group in collaboration with SAE, addresses a long-standing gap: engineers developing real-time embedded and safety-critical systems have historically had to maintain separate AADL models and SysML models with no formal bridge. The AADL extension library provides SysML v2 definitions that capture AADL concepts including thread components, process components, system components, data components, event ports, data ports, and feature groups — all within the SysML v2 part def / attribute def / port def framework.','For students working on the eVTOL or CubeSat final project tracks, this library is directly relevant. The flight control computer and propulsion management unit of the hybrid eVTOL are real-time embedded systems where AADL-style scheduling analysis (worst-case execution time, scheduling feasibility, end-to-end latency) must be integrated with the SysML safety analysis. The AADL extension library provides the formal bridge. It is released under CC-BY-ND-4.0, which permits use in academic projects with attribution. A joint OMG/SAE standard submission based on this work is in preparation.','On the specification roadmap: following formal adoption of KerML 1.0, SysML v2.0, and Systems Modeling API 1.0 on 30 June 2025, the OMG has established Revision Task Forces (RTFs) for KerML 1.1, SysML 2.1, and Systems Modeling API 1.1. The RTFs have not yet published beta specifications, but as resolutions are approved they will be implemented in future pilot releases — tagged in the SysML-v2-Release repository. The March 2026 release submitted the formal specifications to ISO for standardization as an ISO/IEC standard, extending the reach of SysML v2 to international procurement programs that require ISO compliance.'],callout:{type:'gold',label:'Systems-Modeling Organization — Complete Repository Inventory',body:'SysML-v2-Release: core specs + Eclipse + Jupyter installers (start here). SysML-v2-Pilot-Implementation: Eclipse Xtext editor + PlantUML visualization. SysML-v2-API-Services: REST/HTTP API pilot (PostgreSQL + Play). SysML-v2-API-Cookbook: 6 Jupyter recipe notebooks. SysML-v2-API-Client-Python: Python SDK. SysML-v2-API-Client-Java: Java SDK. SysML-v2-AADL-Release: AADL domain extension library for RTESC systems (CC-BY-ND-4.0). RTF roadmap: KerML 1.1, SysML 2.1, API 1.1 revision task forces active as of mid-2025.'}}
],

    references: [
      'Object Management Group. (2025). OMG Systems Modeling Language (SysML), Version 2.0 [Formally Adopted 30 June 2025]. https://www.omg.org/spec/SysML/2.0',
      'Object Management Group. (2025). Kernel Modeling Language (KerML), Version 1.0 [Formally Adopted 30 June 2025]. https://www.omg.org/spec/KerML/1.0',
      'Object Management Group. (2025). Systems Modeling Application Programming Interface (API) and Services, Version 1.0 [Formally Adopted 30 June 2025]. https://www.omg.org/spec/SystemsModelingAPI/1.0',
      'Systems-Modeling Organization. (2026). OMG SysML v2 Release Repository [Software, EPL-2.0]. GitHub. https://github.com/Systems-Modeling/SysML-v2-Release (The authoritative user entry point for all SysML v2 specification documents, example models, normative libraries, and Eclipse/Jupyter installers. Latest release: 2026-04, May 14 2026.)',
      'Systems-Modeling Organization. (2026). SysML v2 Pilot Implementation [Software, EPL-2.0]. GitHub. https://github.com/Systems-Modeling/SysML-v2-Pilot-Implementation (Eclipse Xtext reference implementation of SysML v2 textual notation; includes Jupyter kernel, PlantUML visualization, 85 tagged releases through 2026-04. 4,786 commits.)',
      'Open-MBEE Community. (2024). SysML v2 Applications and Examples [Jupyter Notebooks, Apache-2.0]. GitHub. https://github.com/Open-MBEE/SysML-v2-Applications-and-Examples (Worked SysML v2 Jupyter notebook examples: BallAndChain.ipynb, CubesatExample.ipynb, spacecraft-example-model.ipynb, Modeling-in-Time-And-Space.ipynb, Spacecraft_SysMLv2_Simcenter-Studio.ipynb.)',
      'Friedenthal, S. (2023). Intro to the SysML v2 Language — Graphical Notation [Presentation]. Copyright 2021-2023, licensed CC BY 4.0. Available at https://github.com/Systems-Modeling/SysML-v2-Release/tree/master/doc',
      'Model Driven Solutions. (2025). Intro to the SysML v2 Language — Textual Notation [Presentation]. Copyright 2019-2025, licensed CC BY 4.0. Available at https://github.com/Systems-Modeling/SysML-v2-Release/tree/master/doc',
      'Object Management Group. (2019). OMG Systems Modeling Language (SysML) v1.7 Specification. OMG Document formal/19-11-01. https://www.omg.org/spec/SysML/1.7 (Predecessor standard; ISO/IEC 19514:2017.)',
      'INCOSE. (2023). Systems Engineering Handbook, Version 5. International Council on Systems Engineering.',
    ,'Systems-Modeling Organization. (2026). SysML v2 Library for AADL — domain extension for real-time embedded and safety-critical systems (CC-BY-ND-4.0). GitHub. https://github.com/Systems-Modeling/SysML-v2-AADL-Release','Systems-Modeling Organization. (2026). SysML v2 API Client — Python SDK. GitHub. https://github.com/Systems-Modeling/SysML-v2-API-Client-Python','Systems-Modeling Organization. (2026). SysML v2 API Client — Java SDK. GitHub. https://github.com/Systems-Modeling/SysML-v2-API-Client-Java','OMG RTESC Working Group. (2026). Architecture Analysis and Design Language (AADL) Extension Library for SysML v2. Joint OMG-SAE initiative. https://github.com/Systems-Modeling/SysML-v2-AADL-Release','OMG. (2026). Revision Task Forces established for KerML 1.1, SysML 2.1, and Systems Modeling API 1.1. Release notes: github.com/Systems-Modeling/SysML-v2-Release/releases'],

    schemaVisualizer: [
      {
        category: 'SysML v2 — New Syntax',
        name: 'Part Definition (SysML v2)',
        diagramType: 'SysML v2 Textual Notation',
        shortDesc: 'The SysML v2 replacement for the SysML 1.7 Block — typed using KerML Feature semantics with unified port model.',
        fullDesc: 'In SysML v2, the Block concept from SysML 1.7 is replaced by PartDefinition (textual keyword: part def). Unlike a Block (which is a stereotype on a UML Class), a PartDefinition is a KerML Classifier — a formal type in the KerML metamodel with set-theoretic semantics. PartDefinitions can own attribute features (replacing value properties), part features (replacing composition), port features (unified port model, replacing proxy/full ports), and action features. The textual notation is the primary representation; graphical notation is derived from it through rendering rules.',
        notation: [
          'part def <Name> { ... } — defines a part type (replaces «block» in SysML 1.7).',
          'attribute <name> : <Type>; — typed attribute feature (replaces value property).',
          'part <name> : <PartDef> [multiplicity]; — owned part feature (replaces composition).',
          'port <name> : ~<InterfaceDef>; — port feature with direction; ~ = conjugate (consuming direction).',
          'connection <name> : <ConnectionDef> connect <end1> to <end2>; — typed connection.',
          'ref <name> : <PartDef>; — reference feature (replaces reference property, aggregation).',
          'action <name> { ... } — behavioral feature inline in a part definition.',
          'requirement def <id> <name> { doc /* text */; require constraint { condition }; }',
        ,
{category:'SysML Reference',name:'Nine Diagram Types — Four Pillars',diagramType:'Reference Card',shortDesc:'Complete reference showing all 9 SysML 1.7 diagram types across the 4 pillars. Memorize this map for the midterm and final exam.',fullDesc:'OMG SysML 1.7 (formal/19-11-01, ISO/IEC 19514:2017) organizes nine diagram types across four pillars. Requirements (1): Requirement Diagram. Structure (3): BDD, IBD, Package. Behavior (4): Use Case, Activity, Sequence, State Machine. Parametric (1): Parametric Diagram. Every WSU CEG/EGR 7800 lecture develops one or more of these diagram types. Cross-pillar traceability connects all four pillars into the complete MBSE model.',notation:['Requirements pillar: 1 diagram type — Requirement Diagram (traceability and derivation).','Structure pillar: 3 diagram types — BDD (type model), IBD (instance wiring), Package (namespace).','Behavior pillar: 4 diagram types — Use Case (scope), Activity (flow), Sequence (interaction), State Machine (lifecycle).','Parametric pillar: 1 diagram type — Parametric Diagram (quantitative constraints).','Ref: OMG SysML 1.7 Specification formal/19-11-01, Table 1 — Diagram Types. https://www.omg.org/spec/SysML/1.7'],example:'Lecture 22 diagram types map to the highlighted pillar(s) in the reference card above. Connect each diagram type you produce to its pillar, and trace the cross-pillar relationships that make your model an integrated whole rather than a collection of disconnected views.',svgMarkup:`<svg viewBox="0 0 430 175" xmlns="http://www.w3.org/2000/svg" style="padding:10px;background:#1a1a1a;"><text x="215" y="15" font-family="JetBrains Mono,monospace" font-size="8" fill="#5aad7a" text-anchor="middle">OMG SysML 1.7 — 9 Diagram Types across 4 Pillars (ISO/IEC 19514:2017)</text><rect x="8" y="22" width="88" height="70" rx="4" fill="rgba(2,105,55,0.1)" stroke="#026937" stroke-width="1.3"/><text x="52" y="35" font-family="JetBrains Mono,monospace" font-size="7" fill="#026937" text-anchor="middle" font-weight="bold">REQUIREMENTS</text><rect x="14" y="42" width="76" height="16" rx="3" fill="#1a2a1a" stroke="#5aad7a" stroke-width="0.8"/><text x="52" y="54" font-family="JetBrains Mono,monospace" font-size="6.5" fill="#c5d8e8" text-anchor="middle">Requirement Diagram</text><rect x="102" y="22" width="88" height="105" rx="4" fill="rgba(2,105,55,0.1)" stroke="#026937" stroke-width="1.3"/><text x="146" y="35" font-family="JetBrains Mono,monospace" font-size="7" fill="#026937" text-anchor="middle" font-weight="bold">STRUCTURE</text><rect x="108" y="42" width="76" height="15" rx="3" fill="#1a2a1a" stroke="#5aad7a" stroke-width="0.8"/><text x="146" y="53" font-family="JetBrains Mono,monospace" font-size="6.5" fill="#c5d8e8" text-anchor="middle">Block Def. Diagram</text><rect x="108" y="61" width="76" height="15" rx="3" fill="#1a2a1a" stroke="#5aad7a" stroke-width="0.8"/><text x="146" y="72" font-family="JetBrains Mono,monospace" font-size="6.5" fill="#c5d8e8" text-anchor="middle">Internal Block Diag.</text><rect x="108" y="80" width="76" height="15" rx="3" fill="#1a2a1a" stroke="#5aad7a" stroke-width="0.8"/><text x="146" y="91" font-family="JetBrains Mono,monospace" font-size="6.5" fill="#c5d8e8" text-anchor="middle">Package Diagram</text><rect x="196" y="22" width="88" height="140" rx="4" fill="rgba(2,105,55,0.1)" stroke="#026937" stroke-width="1.3"/><text x="240" y="35" font-family="JetBrains Mono,monospace" font-size="7" fill="#026937" text-anchor="middle" font-weight="bold">BEHAVIOR</text><rect x="202" y="42" width="76" height="14" rx="3" fill="#1a2a1a" stroke="#5aad7a" stroke-width="0.8"/><text x="240" y="53" font-family="JetBrains Mono,monospace" font-size="6.5" fill="#c5d8e8" text-anchor="middle">Use Case Diagram</text><rect x="202" y="60" width="76" height="14" rx="3" fill="#1a2a1a" stroke="#5aad7a" stroke-width="0.8"/><text x="240" y="71" font-family="JetBrains Mono,monospace" font-size="6.5" fill="#c5d8e8" text-anchor="middle">Activity Diagram</text><rect x="202" y="78" width="76" height="14" rx="3" fill="#1a2a1a" stroke="#5aad7a" stroke-width="0.8"/><text x="240" y="89" font-family="JetBrains Mono,monospace" font-size="6.5" fill="#c5d8e8" text-anchor="middle">Sequence Diagram</text><rect x="202" y="96" width="76" height="14" rx="3" fill="#1a2a1a" stroke="#5aad7a" stroke-width="0.8"/><text x="240" y="107" font-family="JetBrains Mono,monospace" font-size="6.5" fill="#c5d8e8" text-anchor="middle">State Machine Diag.</text><rect x="290" y="22" width="88" height="70" rx="4" fill="rgba(201,162,39,0.08)" stroke="#C9A227" stroke-width="1.3"/><text x="334" y="35" font-family="JetBrains Mono,monospace" font-size="7" fill="#C9A227" text-anchor="middle" font-weight="bold">PARAMETRIC</text><rect x="296" y="42" width="76" height="18" rx="3" fill="#1a2a1a" stroke="#C9A227" stroke-width="0.8"/><text x="334" y="55" font-family="JetBrains Mono,monospace" font-size="6.5" fill="#c5d8e8" text-anchor="middle">Parametric Diagram</text><text x="215" y="170" font-family="JetBrains Mono,monospace" font-size="6.5" fill="#4e5668" text-anchor="middle">Ref: OMG SysML 1.7 formal/19-11-01 · ISO/IEC 19514:2017 · omg.org/spec/SysML/1.7</text></svg>`},
{category:'INCOSE Lifecycle Reference',name:'SE Lifecycle — Lecture 22 Position',diagramType:'Process Reference (informative)',shortDesc:'INCOSE SE Handbook v5 six-phase lifecycle with Lecture 22 phase highlighted. Know where you are in the lifecycle at all times.',fullDesc:'INCOSE SE Handbook v5 (2023) defines six lifecycle stages, each bounded by decision gates requiring defined model maturity. Every MBSE activity in this course maps to one or more stages. The highlighted phase shows where Lecture 22 activities fall in the lifecycle. Know the gate entry criteria — they appear on the midterm and final exam.',notation:['Highlighted phase = primary lifecycle context for Lecture 22 activities.','Phase gate = decision point requiring authority approval and defined model maturity.','MCR: Mission Concept Review; SRR: System Requirements Review; PDR: Preliminary Design Review.','CDR: Critical Design Review; TRR: Test Readiness Review; OAR: Operational Acceptance Review.','Ref: INCOSE (2023). SE Handbook v5, Section 2.3 — Systems Lifecycle Stages.'],example:'At PDR (after Lecture 7), your model must pass: derivation coverage 100%, allocation coverage 100%, no orphaned requirements, naming convention compliance 100%. These are the exact criteria evaluated in Mini Project 1.',svgMarkup:`<svg viewBox="0 0 430 98" xmlns="http://www.w3.org/2000/svg" style="padding:10px;background:#1a1a1a;"><defs><marker id="lca22" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto"><polygon points="0 0,6 2,0 4" fill="#5aad7a"/></marker></defs><text x="215" y="15" font-family="JetBrains Mono,monospace" font-size="7.5" fill="#5aad7a" text-anchor="middle">INCOSE SE Handbook v5 — Lifecycle (L22: Qualification & Transition highlighted)</text><rect x="6" y="24" width="60" height="30" rx="3" fill="#1a2a1a" stroke="#026937" stroke-width="1"/><text x="36" y="44" font-family="JetBrains Mono,monospace" font-size='6.5' fill="#026937" text-anchor="middle" font-weight='normal'>Concept</text><rect x="76" y="24" width="60" height="30" rx="3" fill="#1a2a1a" stroke="#026937" stroke-width="1"/><text x="106" y="44" font-family="JetBrains Mono,monospace" font-size='6.5' fill="#026937" text-anchor="middle" font-weight='normal'>Sys Def</text><rect x="146" y="24" width="60" height="30" rx="3" fill="#1a2a1a" stroke="#026937" stroke-width="1"/><text x="176" y="44" font-family="JetBrains Mono,monospace" font-size='6.5' fill="#026937" text-anchor="middle" font-weight='normal'>Realization</text><rect x="216" y="24" width="60" height="30" rx="3" fill="#1a2a1a" stroke="#026937" stroke-width="1"/><text x="246" y="44" font-family="JetBrains Mono,monospace" font-size='6.5' fill="#026937" text-anchor="middle" font-weight='normal'>I&V</text><rect x="286" y="24" width="60" height="30" rx="3" fill="#1a2a1a" stroke="#C9A227" stroke-width="1.8"/><text x="316" y="44" font-family="JetBrains Mono,monospace" font-size='7.5' fill="#C9A227" text-anchor="middle" font-weight='bold'>Qual & Trans</text><rect x="356" y="24" width="60" height="30" rx="3" fill="#1a2a1a" stroke="#026937" stroke-width="1"/><text x="386" y="44" font-family="JetBrains Mono,monospace" font-size='6.5' fill="#026937" text-anchor="middle" font-weight='normal'>Ops & Maint</text><line x1="66" y1="39" x2="76" y2="39" stroke="#5aad7a" stroke-width="1" marker-end="url(#lca22)"/><line x1="136" y1="39" x2="146" y2="39" stroke="#5aad7a" stroke-width="1" marker-end="url(#lca22)"/><line x1="206" y1="39" x2="216" y2="39" stroke="#5aad7a" stroke-width="1" marker-end="url(#lca22)"/><line x1="276" y1="39" x2="286" y2="39" stroke="#5aad7a" stroke-width="1" marker-end="url(#lca22)"/><line x1="346" y1="39" x2="356" y2="39" stroke="#5aad7a" stroke-width="1" marker-end="url(#lca22)"/><polygon points="66,55 72,62 66,69 60,62" fill="#0d1a0d" stroke="#C9A227" stroke-width="1"/><text x="66" y="80" font-family="JetBrains Mono,monospace" font-size="6" fill="#C9A227" text-anchor="middle">MCR</text><polygon points="136,55 142,62 136,69 130,62" fill="#0d1a0d" stroke="#C9A227" stroke-width="1"/><text x="136" y="80" font-family="JetBrains Mono,monospace" font-size="6" fill="#C9A227" text-anchor="middle">SRR/PDR</text><polygon points="206,55 212,62 206,69 200,62" fill="#0d1a0d" stroke="#C9A227" stroke-width="1"/><text x="206" y="80" font-family="JetBrains Mono,monospace" font-size="6" fill="#C9A227" text-anchor="middle">CDR</text><polygon points="276,55 282,62 276,69 270,62" fill="#0d1a0d" stroke="#C9A227" stroke-width="1"/><text x="276" y="80" font-family="JetBrains Mono,monospace" font-size="6" fill="#C9A227" text-anchor="middle">TRR</text><polygon points="346,55 352,62 346,69 340,62" fill="#0d1a0d" stroke="#C9A227" stroke-width="1"/><text x="346" y="80" font-family="JetBrains Mono,monospace" font-size="6" fill="#C9A227" text-anchor="middle">OAR</text><text x="215" y="95" font-family="JetBrains Mono,monospace" font-size="6.5" fill="#4e5668" text-anchor="middle">Ref: INCOSE (2023). SE Handbook v5, Section 2.3 — Systems Lifecycle Stages</text></svg>`}
  ],
        example: 'AWRF AMR in SysML v2 textual notation:\npart def AMR {\n  attribute maxPayload : MassValue;\n  attribute maxSpeed : SpeedValue;\n  attribute batteryCapacity : EnergyValue;\n  part navSub : NavigationSubsystem [1];\n  part powerSub : PowerSubsystem [1];\n  port powerPort : ~PowerInterface;\n  port dataPort : ~DataInterface;\n}\nThis is the direct equivalent of the SysML 1.7 BDD block with «block» stereotype. Note the unified port model (no proxy/full distinction) and the use of normative SysML v2 unit types (MassValue, SpeedValue, EnergyValue from the sysml.library).',
        svgMarkup: `<svg viewBox="0 0 430 230" xmlns="http://www.w3.org/2000/svg" style="padding:12px;background:#1a1a1a;">
          <rect x="10" y="10" width="410" height="210" rx="5" fill="#0d1a0d" stroke="#026937" stroke-width="1.5"/>
          <text x="20" y="28" font-family="JetBrains Mono,monospace" font-size="8" fill="#5aad7a">// SysML v2 — Textual Notation (normative)</text>
          <text x="20" y="28" font-family="JetBrains Mono,monospace" font-size="8" fill="#5aad7a">// Source: github.com/Systems-Modeling/SysML-v2-Release</text>
          <text x="20" y="44" font-family="JetBrains Mono,monospace" font-size="8" fill="#5aad7a">// Contrast: SysML 1.7 required graphical «block» notation</text>
          <text x="20" y="64" font-family="JetBrains Mono,monospace" font-size="9" fill="#C9A227" font-weight="bold">part def AMR {</text>
          <text x="40" y="80" font-family="JetBrains Mono,monospace" font-size="8.5" fill="#c5d8e8">  attribute maxPayload : <tspan fill="#5aad7a">MassValue</tspan>;</text>
          <text x="40" y="95" font-family="JetBrains Mono,monospace" font-size="8.5" fill="#c5d8e8">  attribute maxSpeed   : <tspan fill="#5aad7a">SpeedValue</tspan>;</text>
          <text x="40" y="110" font-family="JetBrains Mono,monospace" font-size="8.5" fill="#c5d8e8">  attribute batteryCapacity : <tspan fill="#5aad7a">EnergyValue</tspan>;</text>
          <text x="40" y="128" font-family="JetBrains Mono,monospace" font-size="8.5" fill="#c5d8e8">  part navSub   : <tspan fill="#C9A227">NavigationSubsystem</tspan> [1];</text>
          <text x="40" y="143" font-family="JetBrains Mono,monospace" font-size="8.5" fill="#c5d8e8">  part powerSub : <tspan fill="#C9A227">PowerSubsystem</tspan> [1];</text>
          <text x="40" y="161" font-family="JetBrains Mono,monospace" font-size="8.5" fill="#c5d8e8">  port powerPort : ~<tspan fill="#7a9ab4">PowerInterface</tspan>;  <tspan fill="#4e5668">// unified port</tspan></text>
          <text x="40" y="176" font-family="JetBrains Mono,monospace" font-size="8.5" fill="#c5d8e8">  port dataPort  : ~<tspan fill="#7a9ab4">DataInterface</tspan>;</text>
          <text x="20" y="192" font-family="JetBrains Mono,monospace" font-size="9" fill="#C9A227" font-weight="bold">}</text>
          <text x="20" y="212" font-family="JetBrains Mono,monospace" font-size="7.5" fill="#4e5668">MassValue, SpeedValue, EnergyValue from normative sysml.library (github.com/Systems-Modeling/SysML-v2-Release/tree/master/sysml.library)</text>
        </svg>`,
      },
      {
        category: 'SysML v2 — New Syntax',
        name: 'Requirement Definition (SysML v2)',
        diagramType: 'SysML v2 Textual Notation',
        shortDesc: 'SysML v2 requirement syntax with inline constraint satisfaction — more precise than SysML 1.7 «requirement» stereotype.',
        fullDesc: 'SysML v2 requirement definitions use the requirement def keyword and can embed formal constraint expressions using the require constraint sub-element. Unlike SysML 1.7 requirements (which store the requirement text as a string property), SysML v2 requirements can include formal, machine-evaluable constraint conditions that connect directly to the parametric model. The doc annotation provides the natural-language text; the require constraint provides the formal verification criterion.',
        notation: [
          'requirement def <id> <name> { ... } — defines a requirement type.',
          'doc /* text */ — natural-language requirement text.',
          'require constraint { <condition> } — formal, machine-evaluable acceptance criterion.',
          'attribute <name> : <Type>; — typed measurement attribute for the requirement.',
          'subject <name> : <PartDef>; — the system element the requirement applies to.',
          'stakeholder <name> : <StakeholderDef>; — links requirement to originating stakeholder.',
        ],
        example: 'AWRF SYS-REQ-001 in SysML v2:\nrequirement def <SYS-REQ-001> DispatchLatency {\n  doc /* The AWRF shall initiate robot dispatch within 3.0 seconds\n       of receiving a confirmed PickOrder message. */\n  subject amrFleet : AMR;\n  attribute dispatchTime : DurationValue;\n  require constraint { dispatchTime <= 3.0 [s] }\n}\nThis is dramatically more precise than the SysML 1.7 equivalent, which would express the 3.0 s threshold only as a string in the "text" property with no formal connection to a measurable system attribute.',
        svgMarkup: `<svg viewBox="0 0 430 200" xmlns="http://www.w3.org/2000/svg" style="padding:12px;background:#1a1a1a;">
          <rect x="10" y="10" width="410" height="180" rx="5" fill="#0d1a0d" stroke="#5aad7a" stroke-width="1.5"/>
          <text x="20" y="28" font-family="JetBrains Mono,monospace" font-size="8" fill="#5aad7a">// SysML v2 Requirement Definition (formally adopted June 2025)</text>
          <text x="20" y="48" font-family="JetBrains Mono,monospace" font-size="9" fill="#C9A227" font-weight="bold">requirement def &lt;SYS-REQ-001&gt; DispatchLatency {</text>
          <text x="40" y="66" font-family="JetBrains Mono,monospace" font-size="8.5" fill="#9ab5c8">  doc /* The AWRF shall initiate dispatch</text>
          <text x="40" y="80" font-family="JetBrains Mono,monospace" font-size="8.5" fill="#9ab5c8">       within 3.0 s of PickOrder receipt. */</text>
          <text x="40" y="98" font-family="JetBrains Mono,monospace" font-size="8.5" fill="#c5d8e8">  subject amrFleet : <tspan fill="#C9A227">AMR</tspan>;</text>
          <text x="40" y="113" font-family="JetBrains Mono,monospace" font-size="8.5" fill="#c5d8e8">  attribute dispatchTime : <tspan fill="#5aad7a">DurationValue</tspan>;</text>
          <text x="40" y="131" font-family="JetBrains Mono,monospace" font-size="8.5" fill="#c5d8e8">  require constraint {</text>
          <text x="60" y="146" font-family="JetBrains Mono,monospace" font-size="9" fill="#C9A227" font-weight="bold">    dispatchTime &lt;= 3.0 [s]</text>
          <text x="40" y="161" font-family="JetBrains Mono,monospace" font-size="8.5" fill="#c5d8e8">  }</text>
          <text x="20" y="177" font-family="JetBrains Mono,monospace" font-size="9" fill="#C9A227" font-weight="bold">}</text>
        </svg>`,
      },
    ],

    playground: {
      title: 'SysML v2 Textual Notation Practice — AWRF Part and Requirement Definitions',
      instructions: 'This playground represents the SysML v2 modeling paradigm shift from graphical blocks to textual part definitions. Add "part definition" blocks to represent the SysML v2 equivalents of the SysML 1.7 blocks you modeled in Lectures 6–7. Connect them with "connection" elements representing the SysML v2 unified port-based interface model. The green port initiates a connection; destination click completes it.',
      objectives: [
        'Add AMR_v2 (part def) and connect it to NavigationSubsystem_v2 — modeling the SysML v2 composition relationship.',
        'Add DispatchLatencyReq (requirement def) and connect to AMR_v2 with a "satisfy" relationship.',
        'Compare this playground model to the SysML 1.7 BDD you built in Lecture 6 — identify 3 semantic differences.',
        'Refer to BallAndChain.ipynb at github.com/Open-MBEE/SysML-v2-Applications-and-Examples for a complete worked SysML v2 parametric example.',
        'Download and open CubesatExample.ipynb from the same repository and trace its part def hierarchy to the SysML 1.7 BDD equivalent.',
      ],
      palette: [
        { stereotype: 'part def', name: 'AMR_v2', props: ['attribute maxPayload : MassValue', 'attribute maxSpeed : SpeedValue', 'attribute batteryCapacity : EnergyValue'] },
        { stereotype: 'part def', name: 'NavigationSubsystem_v2', props: ['attribute accuracy : LengthValue', 'port dataPort : ~DataInterface'] },
        { stereotype: 'part def', name: 'PowerSubsystem_v2', props: ['attribute capacity : EnergyValue', 'port powerOut : PowerInterface'] },
        { stereotype: 'requirement def', name: 'DispatchLatencyReq', props: ['id: SYS-REQ-001', 'require: dispatchTime <= 3.0 [s]'] },
        { stereotype: 'requirement def', name: 'NavAccuracyReq', props: ['id: SYS-REQ-012', 'require: accuracy <= 0.05 [m]'] },
        { stereotype: 'connection def', name: 'PowerConnection_v2', props: ['connect: powerSub.powerOut to navSub.powerIn'] },
        { stereotype: 'action def', name: 'ExecutePickOrder_v2', props: ['in pickOrder : PickOrder', 'out completedPick : CompletedPick'] },
        { stereotype: 'interface def', name: 'PowerInterface_v2', props: ['out dcVoltage : VoltageValue', 'in enable : Boolean'] },
      ],
      defaultBlocks: [
        { stereotype: 'part def', name: 'AMR_v2', props: ['attribute maxPayload : MassValue', 'attribute maxSpeed : SpeedValue'], x: 160, y: 40 },
        { stereotype: 'part def', name: 'NavigationSubsystem_v2', props: ['attribute accuracy : LengthValue'], x: 20, y: 200 },
        { stereotype: 'requirement def', name: 'DispatchLatencyReq', props: ['require: dispatchTime <= 3.0 [s]'], x: 290, y: 200 },
      ],
    },

    quiz: {
      questions: [
        {
          question: 'According to the official SysML v2 Release repository README at github.com/Systems-Modeling/SysML-v2-Release, when were KerML 1.0, SysML v2.0, and the Systems Modeling API v1.0 formally adopted by OMG?',
          options: [
            'March 2024 — when the OMG finalization task forces completed their work.',
            '30 June 2025 — after completion of the finalization task forces that began work on the June 2023 beta specifications.',
            'January 2023 — when the beta specifications were first circulated for public review.',
            'April 2026 — when the 2026-04 release was tagged in the pilot implementation repository.',
          ],
          correct: 1,
          explanation: 'The authoritative source — the README of https://github.com/Systems-Modeling/SysML-v2-Release — states that the OMG adopted beta specifications in June 2023, which then entered the finalization process. "As of 30 June 2025, these specifications have been formally adopted by OMG." The specifications were updated editorially in March 2026 for ISO submission. Students who cite "March 2024" are confusing an intermediate milestone with the formal adoption date.',
        },
        {
          question: 'What is the Kernel Modeling Language (KerML), and why was it necessary to create a new semantic foundation for SysML v2 rather than continuing to extend UML?',
          options: [
            'KerML is a simplified subset of SysML v2 designed for students learning modeling; it was needed because SysML 1.7 was too complex.',
            'KerML is a purpose-designed, formally precise modeling language with set-theoretic semantics that serves as the semantic foundation for SysML v2. It was necessary because SysML 1.7\'s UML profile-based architecture inherited UML\'s software-centric semantic assumptions, producing ambiguities in port semantics, flow modeling, allocation, and physical quantity typing that could not be resolved within the UML metamodel.',
            'KerML is the graphical notation layer of SysML v2, similar to how SysML 1.7 used UML graphical elements as its notation base.',
            'KerML is an acronym for Kernel Machine Learning — it is the AI component that automatically generates SysML v2 models from natural language descriptions.',
          ],
          correct: 1,
          explanation: 'KerML (Kernel Modeling Language, https://www.omg.org/spec/KerML/1.0) is the formally precise, mathematically grounded semantic foundation of SysML v2. It introduces Feature-based semantics with set-theoretic typing that eliminates the ambiguities inherited from UML — particularly in port modeling, flow semantics, and allocation. SysML v2 is defined as a systems engineering specialization of KerML, with all SysML concepts (Part, Action, Connection, Requirement) formally defined as KerML Feature subtypes.',
        },
        {
          question: 'The SysML v2 Pilot Implementation at github.com/Systems-Modeling/SysML-v2-Pilot-Implementation provides two installation options for students. What are they?',
          options: [
            'A Windows desktop GUI installer and a macOS GUI installer.',
            'An Eclipse Xtext editor plugin (Eclipse Modeling Tools 2025-12 + Java 21) and a Jupyter kernel for JupyterLab — both available from github.com/Systems-Modeling/SysML-v2-Release/tree/master/install.',
            'A SysML v2 plugin for CATIA Magic and a SysML v2 plugin for IBM Rhapsody.',
            'A command-line transpiler from SysML 1.7 XMI to SysML v2 textual notation, and a web-based model viewer.',
          ],
          correct: 1,
          explanation: 'The SysML-v2-Release repository provides two student installation paths under the install/ directory: (1) the Eclipse editor — a plugin for Eclipse Modeling Tools 2025-12 (Eclipse 4.38) requiring Java 21, installable via Oomph or manually; (2) the Jupyter kernel — a SysML v2 language kernel for JupyterLab enabling interactive textual modeling with PlantUML visualization. The Open-MBEE examples at github.com/Open-MBEE/SysML-v2-Applications-and-Examples use the Jupyter path with worked notebooks including CubesatExample.ipynb.',
        },
        {
          question: 'In SysML v2, the proxy port / full port distinction from SysML 1.7 is eliminated. What replaces it?',
          options: [
            'Interface blocks that specify provided and required operations, identical to the Java interface concept.',
            'A unified port model based on KerML Feature semantics, in which a port is a directed feature that defines the interface points of a part through typed flows on connections — eliminating the ambiguity between proxy and full port semantics that practitioners found difficult to apply consistently in SysML 1.7.',
            'Physical connectors modeled as wires with material type properties.',
            'The port concept is removed entirely in SysML v2 — interfaces are specified only through connection definitions.',
          ],
          correct: 1,
          explanation: 'One of the five most significant changes from SysML 1.7 to SysML v2 is the elimination of the proxy port / full port distinction, which was introduced in SysML 1.4 to address port semantic ambiguities but created new ones. SysML v2 replaces this with a unified port model: a port is a KerML Feature on the boundary of a PartDefinition that defines directed flows. The Open-MBEE spacecraft-example-model.ipynb at github.com/Open-MBEE/SysML-v2-Applications-and-Examples demonstrates the simplified interface model.',
        },
        {
          question: 'What is the Systems Modeling API (part of the SysML v2 standard), and what architectural problem does it solve?',
          options: [
            'A Python API for generating SysML diagrams programmatically using the matplotlib library.',
            'A standard REST API (https://www.omg.org/spec/SystemsModelingAPI/1.0) that enables any compliant tool to read and write SysML v2 model elements without proprietary format dependencies — solving the tool lock-in problem caused by SysML 1.7\'s reliance on tool-specific XMI serialization for model exchange.',
            'An API that connects SysML v2 models to cloud storage services like AWS S3 and Azure Blob.',
            'An internal Eclipse plugin API used by the pilot implementation development team.',
          ],
          correct: 1,
          explanation: 'The Systems Modeling API and Services (https://www.omg.org/spec/SystemsModelingAPI/1.0) is the third of the three formally adopted SysML v2 standards. It defines a standard REST API for model element CRUD operations that any compliant tool must implement, enabling cross-tool model exchange without format conversion. A live prototype API server is accessible at http://sysml2.intercax.com:9000/docs/ for student experimentation. This directly addresses the tool lock-in that characterizes SysML 1.7 deployment, where XMI round-trips between different tools routinely lose stereotype applications and profile-specific extensions.',
        },
      ],
    },

    assignment: {
      title: 'Assignment 22: SysML v2 Transition — Install the Pilot Implementation and Migrate Three AWRF Elements',
      brief: 'This assignment requires you to (1) install the SysML v2 Pilot Implementation from the official OMG GitHub repository, (2) execute at least one worked example from the Open-MBEE SysML v2 Applications and Examples repository, (3) write SysML v2 textual notation equivalents for three AWRF model elements from your SysML 1.7 assignments, and (4) produce a structured migration assessment documenting the semantic differences between the SysML 1.7 and SysML v2 representations. All deliverables must cite the three primary GitHub repositories by URL with correct citation format.',
      deliverables: [
        'Installation Verification: Screenshot or text output showing successful installation of either (a) the Eclipse SysML v2 editor from github.com/Systems-Modeling/SysML-v2-Release/tree/master/install/eclipse, or (b) the Jupyter SysML v2 kernel from github.com/Systems-Modeling/SysML-v2-Release/tree/master/install/jupyter. Include the Eclipse version, Java version, and/or Jupyter kernel version confirmed.',
        'Worked Example Execution: Open and execute either CubesatExample.ipynb or BallAndChain.ipynb from github.com/Open-MBEE/SysML-v2-Applications-and-Examples. Provide screenshots of at least 3 executed notebook cells with their outputs, and a 150-word narrative explaining what SysML v2 concepts each cell demonstrates.',
        'SysML v2 Textual Models: Write SysML v2 textual notation for: (a) the AMR part definition (equivalent to the BLK_AMR block from Assignment 6), (b) SYS-REQ-001 (dispatch latency requirement from Assignment 3, using requirement def with require constraint), and (c) the power interface connection between navSub and powerSub (equivalent to the IBD connector from Assignment 7). All three must use normative unit types from the sysml.library.',
        'Semantic Difference Analysis: For each of the three migrated elements, document 2 specific semantic differences between the SysML 1.7 representation and the SysML v2 representation — what the SysML v2 version expresses more precisely, or what modeling ambiguity it eliminates.',
        'OMG Timeline Summary: In 100 words, state the correct OMG adoption timeline for SysML v2, citing the README of github.com/Systems-Modeling/SysML-v2-Release as the authoritative source. Explicitly correct the common misstatement that SysML v2 was adopted in March 2024.',
      ],
      rubric: [
        { criterion: 'Installation Verification', descriptor: 'Correct tool version, successful execution demonstrated, GitHub source cited.', max: 15 },
        { criterion: 'Worked Example Execution', descriptor: '3 executed cells with output, 150-word narrative citing Open-MBEE repository.', max: 20 },
        { criterion: 'SysML v2 Textual Models (3 elements)', descriptor: 'Correct v2 syntax for all 3; normative library unit types used; no 1.7 stereotype notation.', max: 30 },
        { criterion: 'Semantic Difference Analysis', descriptor: '2 specific differences per element (6 total); technically accurate; not merely syntactic.', max: 25 },
        { criterion: 'OMG Timeline Accuracy', descriptor: '30 June 2025 adoption date stated; March 2024 error explicitly corrected; source cited.', max: 10 },
      ],
      gradingNotes: [
        'Any submission that states SysML v2 was "adopted in March 2024" receives zero on the OMG Timeline criterion — this is a factual error that the official GitHub repository README directly contradicts.',
        'SysML v2 textual models that use «block» stereotype notation (SysML 1.7 syntax) instead of part def keyword receive zero for that element — the distinction between graphical stereotype notation and textual keyword syntax is the core concept being assessed.',
        'Worked example citations must include the full GitHub URL (github.com/Open-MBEE/SysML-v2-Applications-and-Examples) and the specific notebook filename — generic citations to "the Open-MBEE repository" are insufficient.',
        'Installation verification that shows only a download completion without demonstrating tool execution (kernel start, editor open, or model parse) receives partial credit only.',
        'Late penalty: 10 points per calendar day after due date.',
      ],
    },
  
    courseMeta:{courseCode:'CEG/EGR 7800',courseTitle:'Model-Based Systems Engineering',university:'Wright State University',college:'College of Engineering and Computer Science',totalPoints:300,gradeBreakdown:{weeklyAssignments:{points:150,pct:50,desc:'30 weekly assignments x 5 pts each'},weeklyMCQ:{points:30,pct:10,desc:'30 quizzes x 5 Qs x 1 pt (auto-graded, closes Sunday 11:59 PM)'},miniProject1:{points:30,pct:10,desc:'AWRF Requirements and Architecture (due end of Week 8)'},miniProject2:{points:30,pct:10,desc:'eVTOL Parametric Sizing Study (due end of Week 17)'},midtermExam:{points:30,pct:10,desc:'Week 15 open-note exam covering Lectures 1-14 (90 minutes)'},finalProject:{points:60,pct:20,desc:'Capstone Portfolio Defense Week 30 — 3 track options: AWRF Track A, eVTOL Track B, CubeSat Track C'}},gradeScale:{A:'270-300 (90-100%)',B:'240-269 (80-89%)',C:'210-239 (70-79%)',D:'180-209 (60-69%)',F:'below 180 (below 60%)'},latePenalty:'10 points per calendar day; no submissions after 5 days past due date',academicIntegrity:'Per WSU Academic Integrity Policy: all model artifacts must be individually authored'},
    weeklyMCQ:{points:5,closesDay:'Sunday 11:59 PM',instructions:'Auto-graded. 2 attempts; highest score counts. Covers key concepts of Lecture 22. Complete before Sunday 11:59 PM of the lecture week.',questions:[
      {question:'In SysML v2 Transition, what is the primary model quality criterion that must be satisfied before advancing to the next SE lifecycle phase?',options:['The total number of diagram elements must exceed 50.','Every new model element must have bidirectional traceability: upstream to its authorizing requirement or architectural decision, and downstream to a planned verification event.','All diagram backgrounds must be consistent in color.','The model file size must be under 50 MB.'],correct:1,explanation:'Bidirectional traceability is the invariant quality criterion across all 30 lectures. For SysML v2 Transition: every element added must be grounded in an existing requirement (upstream) and connected to a verification path (downstream). These are measured by derivation, allocation, and verification coverage metrics.'},
      {question:'A constraint block added to the AWRF parametric model during SysML v2 Transition has unbound parameters. What is the architectural consequence?',options:['The constraint block is automatically deleted by the parametric solver.','The constraint is computationally inert — it exists in the model but cannot propagate design variable changes through the constraint network, failing to provide the analytical value that justifies its existence.','The tool will prompt the engineer to bind the parameters at the next save.','The constraint block is moved to a separate analysis package automatically.'],correct:1,explanation:'Unbound parametric constraints are the modeling equivalent of a disconnected equation — present but useless for analysis. This is the failure mode that produced the 1,722 kg MTOW underestimate in Lecture 1: the coupling equations existed implicitly in the engineers minds but were not formally bound in a computational model.'},
      {question:'Which OMG specification provides the normative definition of the SysML 1.7 diagram types relevant to SysML v2 Transition?',options:['The vendor documentation for CATIA Magic or IBM Rhapsody.','OMG SysML 1.7 Specification (formal/19-11-01), available at https://www.omg.org/spec/SysML/1.7 and standardized as ISO/IEC 19514:2017.','The INCOSE SE Handbook v5 diagram appendix.','The Eclipse Papyrus online help documentation.'],correct:1,explanation:'The normative reference for all SysML 1.7 concepts is the OMG SysML 1.7 Specification (formal/19-11-01), standardized as ISO/IEC 19514:2017. Vendor tool documentation may contain tool-specific extensions; the OMG specification is the tool-independent authority. For SysML v2, see https://www.omg.org/spec/SysML/2.0 (formally adopted June 2025).'},
      {question:'The SysML v2 Release at github.com/Systems-Modeling/SysML-v2-Release was formally adopted by OMG on:',options:['March 2024 — when the finalization task forces announced completion.','30 June 2025 — after completion of finalization from the June 2023 beta specifications.','April 2026 — when the 2026-04 release was tagged.','January 2023 — at the first OMG public review.'],correct:1,explanation:'Per the README of https://github.com/Systems-Modeling/SysML-v2-Release: beta specs adopted June 2023 → finalization 2023–2025 → formal OMG adoption 30 June 2025 → editorial update for ISO submission March 2026 → latest release 2026-04. "March 2024" is incorrect.'},
      {question:'The Open-MBEE repository at github.com/Open-MBEE/SysML-v2-Applications-and-Examples contains worked examples including CubesatExample.ipynb. This notebook is most directly relevant to which WSU CEG/EGR 7800 lecture?',options:['Lecture 1 (Foundations) — it introduces the INCOSE lifecycle.','Lecture 28 (Small Satellite MBSE) — it provides a complete SysML v2 textual model of a CubeSat power and communications system comparable to the SysML 1.7 BDD developed in that lecture.','Lecture 22 (SysML v2 Transition) only — it is only useful for the v2 syntax introduction.','Lecture 14 (MATLAB-SysML Integration) — it requires MATLAB execution.'],correct:1,explanation:'CubesatExample.ipynb from github.com/Open-MBEE/SysML-v2-Applications-and-Examples models a CubeSat in SysML v2 textual notation including part definitions for EPS, ADCS, and COMMS subsystems — directly comparable to the SysML 1.7 BDD model developed in Lecture 28. It also appears in the Lecture 22 assignment as a migration comparison exercise.'}
    ]},
    miniProject:{status:'building',dueWeek:30,title:'Final Project Capstone Portfolio Defense',note:'Lecture 22 builds toward the Final Project (due Week 30). Three tracks: Track A AWRF, Track B eVTOL, Track C CubeSat. Select your track by Week 20.'},
  };

  if (typeof window.registerLecture === 'function') {
    window.registerLecture(22, D);
  } else {
    window.MBSE_COURSE_DATA = window.MBSE_COURSE_DATA || {};
    window.MBSE_COURSE_DATA[22] = D;
  }
})();

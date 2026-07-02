/**
 * lecture2.js — MBSE & SysML Course Portal · Wright State University
 * ─────────────────────────────────────────────────────────────────────
 * Lecture 2: Systems Thinking, Stakeholder Analysis &
 * Conceptual Architecture
 *
 * Data format consumed by index.html's renderEngine.
 * Place this file in the same directory as index.html.
 * The window.registerLecture() hook fires after the script evaluates.
 * ─────────────────────────────────────────────────────────────────────
 */
(function () {
  "use strict";

  const LECTURE_2_DATA = {

    /* ═══════════════════════════════════════════════════════════════
       META
       ═══════════════════════════════════════════════════════════════ */
    meta: {
      id:           2,
      week:         2,
      unit:         'Foundations',
      title:        'Systems Thinking, Stakeholder Analysis & Conceptual Architecture',
      duration:     '90 min',
      difficulty:   'Introductory–Intermediate',
      creditHours:  3,
      studyHours:   '3–5 hrs',
      tools:        ['CATIA Magic 2024x', 'Papyrus (SysML)', 'PlantUML', 'MindMup (stakeholder mapping)'],
      prerequisites: ['Lecture 1 — Foundations of Systems Architecture & The Mathematical Imperative for MBSE'],
      objectives: [
        'Distinguish problem-framing from solution-framing and explain why conflation is a root cause of requirements failure',
        'Apply the INCOSE stakeholder taxonomy (primary, secondary, regulatory, operational, support) to a real system',
        'Construct a Concept of Operations (CONOPS) narrative with mission threads and operational scenarios',
        'Differentiate functional decomposition from object-oriented structural decomposition',
        'Explain the logical vs. physical architecture distinction and map it to SysML diagram types',
        'Model a use case diagram that correctly captures actor–system boundary interactions',
      ],
      commonErrors: [
        'Jumping to solution architecture before completing stakeholder and problem-space analysis',
        'Defining actors by job title instead of by role and concern',
        'Confusing a logical architecture (what the system does) with a physical architecture (what it is made of)',
        'Writing CONOPS narratives that omit off-nominal and degraded-mode scenarios',
      ],
    },

    /* ═══════════════════════════════════════════════════════════════
       CONTENT
       ═══════════════════════════════════════════════════════════════ */
    content: [

      /* ── Section 1 ─────────────────────────────────────────────── */
      {
        heading: '1 · The Problem-Framing Imperative — Why Solution-Jumping Kills Programs',
        paragraphs: [
          'The single most expensive mistake in systems engineering is not a bad design decision — it is a premature design decision. When a development team begins specifying components, sizing hardware, or writing interface control documents before the problem space has been rigorously bounded and understood, they are not accelerating progress; they are investing schedule and budget in answering questions that have not yet been correctly asked. INCOSE SE Handbook v5 places problem-framing — formally called "mission analysis and stakeholder needs identification" — as the first technical process of the systems definition stage precisely because every subsequent process is downstream of it. An error in problem-framing compounds through requirements derivation, architecture allocation, interface definition, and verification planning before it is ever detected.',
          'Problem-framing asks: what is the operational need, for whom, under what conditions, measured against what criteria of success? Solution-framing asks: what shall the system be, how shall it be built, and what performance shall it achieve? The distinction appears obvious in the abstract but collapses rapidly under schedule pressure, stakeholder advocacy for specific technologies, and the engineer\'s natural tendency to move toward the familiar territory of design. The pathology is well documented in program post-mortems across aerospace, defense, and autonomous systems: teams optimize a solution to a problem that was never the actual problem, and no amount of engineering excellence applied to the wrong problem produces an acceptable outcome.',
          'The canonical aerospace illustration of problem-framing failure involves thrust-vector-controlled upper stages designed to achieve a specific orbital insertion accuracy before the mission design authority had confirmed whether that accuracy was actually required, operationally achievable, or cost-justified. The engineering was flawless; the problem statement was wrong. A SysML-grounded MBSE workflow prevents this by requiring that every system requirement be traceable to a specific stakeholder need, that every stakeholder need be tied to a mission context, and that the mission context be reviewed and approved before any architectural decomposition begins.',
        ],
        callout: {
          type: 'gold',
          label: 'eVTOL Case Study — Problem-Framing vs. Solution-Framing',
          body: '<strong>The Solution-Framing Trap.</strong> An eVTOL air-taxi development team, eager to demonstrate technical capability, begins selecting battery cell chemistry and rotor disk geometry in the first month of program definition. They frame their problem as: "Design a six-rotor eVTOL with a 90 kWh battery pack and a 280 kW distributed propulsion system." This is a solution statement masquerading as a problem statement.<br><br><strong>The Correct Problem Frame.</strong> The actual problem is: "Provide short-haul urban air mobility for 1–4 passengers over routes of 15–50 km in the Dayton metropolitan area, with a door-to-door travel time competitive with ground transport, at an operating cost per seat-mile that enables commercial viability at a fare below $3.50/mile." Every element of this statement is testable, stakeholder-derived, and architecture-agnostic. It admits configurations — hybrid tilt-rotor, lift-plus-cruise, multirotor — that the solution-framed team foreclosed in month one.<br><br><strong>The MBSE Enforcement Mechanism.</strong> A SysML requirements diagram enforces the distinction structurally. Stakeholder needs at the top of the hierarchy are problem-space statements. System requirements derived from them must satisfy those needs — but the model traces every requirement back to its stakeholder origin, making the derivation rationale auditable. Any requirement that cannot be traced to a stakeholder need is flagged as an ungrounded constraint, which is precisely the signature of premature solution-framing.',
        },
      },

      /* ── Section 2 ─────────────────────────────────────────────── */
      {
        heading: '2 · Stakeholder Analysis — The INCOSE Taxonomy and Concern Mapping',
        paragraphs: [
          'A stakeholder, as defined in INCOSE SE Handbook v5, is any party that has a right, share, claim, or interest in a system or in its possession of characteristics that meet their needs and expectations. The INCOSE taxonomy organizes stakeholders into five classes that differ in both their relationship to the system and the nature of their concern: primary stakeholders interact directly with the system to accomplish mission objectives; secondary stakeholders are affected by the system\'s operation without directly operating it; regulatory stakeholders impose mandatory constraints on the system\'s design, operation, or disposal; operational stakeholders provide enabling infrastructure, logistics, and maintenance; and support stakeholders include training organizations, certification bodies, and knowledge management authorities.',
          'Each stakeholder class generates a distinct category of requirement. Primary stakeholders drive functional and performance requirements — what the system must do and how well. Secondary stakeholders drive interface, safety, and environmental requirements — how the system must behave in relation to adjacent systems and affected populations. Regulatory stakeholders drive compliance requirements — what standards, certifications, and safety integrity levels the system must satisfy. Operational stakeholders drive availability, maintainability, and supportability requirements — how the system must be sustained across its service life. Support stakeholders drive documentation, training, and knowledge transfer requirements. A requirements model that is populated exclusively from primary stakeholder interviews will be structurally incomplete even if every individual requirement within it is perfectly written.',
          'The concern mapping process translates each stakeholder\'s abstract interests into concrete, testable system attributes. A concern is not a requirement — it is an area of interest that must be resolved into one or more requirements through a structured elicitation and derivation process. Concerns are associated with viewpoints in the ISO/IEC 42010 architectural description standard, which SysML 1.7 adopts through its stakeholder and concern model elements. A viewpoint defines the rules for constructing views of the system that address a specific concern. The systems engineer\'s task is to confirm that the aggregate of all views — structural, behavioral, parametric, requirements — constitutes a complete and consistent description of the system as seen from every stakeholder perspective.',
        ],
        subsections: [
          {
            title: 'CONOPS Walkthrough — Autonomous Warehouse Robot Fleet',
            paragraphs: [
              'A Concept of Operations (CONOPS) document, as defined in ANSI/AIAA G-043B-2012 and referenced in INCOSE SE Handbook v5, describes a proposed system from an operational perspective: who uses it, how it is operated, under what environmental conditions, and what mission threads it executes from activation through deactivation. A CONOPS is not a technical specification — it is a narrative that bridges stakeholder needs and system requirements, written in operational language accessible to both engineers and non-technical decision-makers.',
              'For an Autonomous Warehouse Robot Fleet (AWRF), the operational context is a large-scale distribution center covering 500,000 square feet, operating three shifts per day, 365 days per year. The fleet consists of 120 autonomous mobile robots (AMRs) responsible for item retrieval, inventory replenishment, packing station delivery, and trailer loading. The primary mission thread is: (1) Warehouse Management System (WMS) issues a pick order; (2) Fleet Management System (FMS) assigns the optimal robot and route; (3) AMR navigates to the storage location using simultaneous localization and mapping (SLAM); (4) AMR retrieves the item via integrated manipulator or presents the storage pod to a human picker; (5) AMR delivers the item or pod to the designated packing station; (6) AMR returns to a staging area or proceeds to the next task assignment.',
              'The off-nominal scenarios that the CONOPS must also cover include: robot fault detection and safe-stop during a pick operation; collision avoidance with human personnel in mixed-traffic zones; battery state-of-charge management and autonomous docking for charging; communication link degradation causing temporary autonomous operation without FMS connectivity; and emergency stop triggered by a fire suppression system activation. Each of these scenarios generates distinct requirements that would not emerge from analyzing the nominal mission thread alone — which is precisely why single-scenario CONOPS documents are a recognized requirements engineering anti-pattern.',
            ],
            callout: {
              type: 'standard',
              label: 'AWRF Stakeholder Taxonomy — Five-Class Analysis',
              body: '<strong>Primary:</strong> Warehouse Operations Managers (direct system users, concerned with throughput, pick accuracy, and shift productivity); Human Pickers working alongside AMRs (concerned with physical safety, task clarity, and workload distribution).<br><br><strong>Secondary:</strong> Distribution Center Employees not directly operating AMRs (concerned with injury risk in shared spaces); Customers receiving orders (concerned with order accuracy and delivery speed as system output quality).<br><br><strong>Regulatory:</strong> OSHA (29 CFR 1910.217 machinery safeguarding); ANSI/RIA R15.08 Industrial Mobile Robot Safety Standard; local fire marshal (emergency egress and suppression system compatibility).<br><br><strong>Operational:</strong> IT Infrastructure Team (network, WMS integration, cybersecurity); Facilities Management (floor surface condition, charging infrastructure, lighting); Third-party WMS vendor (API contract compliance).<br><br><strong>Support:</strong> AMR manufacturer field service organization; Internal maintenance technicians; Training department responsible for human-robot interaction protocols.',
            },
          },
        ],
      },

      /* ── Section 3 ─────────────────────────────────────────────── */
      {
        heading: '3 · Functional vs. Object-Oriented Structural Decomposition',
        paragraphs: [
          'Systems architecture can be approached from two fundamentally different decomposition philosophies, and the choice between them has cascading consequences for model organization, requirements traceability, interface definition, and change management. Functional decomposition, rooted in the structured analysis tradition of DeMarco and Yourdon and formalized in IDEF0 and enhanced functional flow block diagrams (EFFBD), organizes the architecture around what the system does. The top-level function is recursively decomposed into sub-functions until each leaf function is implementable by a single identifiable element. Object-oriented structural decomposition, which underlies SysML\'s block-based architecture and UML\'s class hierarchy, organizes the architecture around what the system is — its entities, their attributes, their behaviors, and their relationships.',
          'The functional decomposition approach has the advantage of being operationally intuitive — it maps naturally to mission threads and use cases, and it is straightforward to verify by execution. Its weakness is that functions do not have physical identity: the function "provide electrical power" does not tell you whether that function is allocated to a battery, a fuel cell, a generator, or a combination, and a purely functional model provides no formal mechanism for representing the physical architecture that actually builds and operates. Object-oriented decomposition addresses this by making blocks — which can represent hardware components, software modules, or human roles — the primary modeling unit. Blocks have properties, ports, and behaviors, and they can be organized into both a logical hierarchy (what they are in the design intent) and a physical hierarchy (what they are in the manufactured artifact).',
          'In mature MBSE practice, both approaches are used in a disciplined sequence. The CONOPS and use case analysis establish the operational functions. An activity diagram maps those functions as a flow. A block definition diagram then establishes the structural elements that will be allocated to perform those functions. The allocation relationship in SysML — «allocate» between an ActivityNode and a Block — formally records which element is responsible for which function, creating the bidirectional traceability that makes change impact analysis tractable. The AWRF example illustrates this: the function "navigate to storage location" in the activity diagram is allocated to the AMR_NavigationSubsystem block, which in the BDD owns the SLAM module, the motor controller, and the wheel encoder array as part properties.',
        ],
        callout: {
          type: 'standard',
          label: 'Decomposition Comparison Table',
          body: '<strong>Functional Decomposition:</strong> Unit of analysis = function; Notation = EFFBD, activity diagram; Strength = mission traceability; Weakness = no physical identity, no interface typing.<br><br><strong>Object-Oriented Decomposition:</strong> Unit of analysis = block (entity); Notation = BDD, IBD; Strength = physical identity, typed interfaces, change management; Weakness = can obscure operational flow if used without behavioral counterpart.<br><br><strong>MBSE Synthesis:</strong> Activity diagrams (functional) + BDD/IBD (structural) + «allocate» relationships = complete, traceable, dual-view architecture. SysML 1.7 is the only standard modeling language that natively supports both views within a single metamodel.',
        },
      },

      /* ── Section 4 ─────────────────────────────────────────────── */
      {
        heading: '4 · Logical vs. Physical Architecture — The Most Misunderstood Distinction in Systems Engineering',
        paragraphs: [
          'No distinction in systems architecture practice is more frequently collapsed, more consequentially misunderstood, or more reliably productive when properly maintained than the distinction between logical and physical architecture. The confusion is understandable: both are represented by structural diagrams, both use blocks and connections, and both describe the same system of interest. The difference is in the level of abstraction and the design decisions encoded at each level.',
          'A logical architecture describes the system in terms of its functions, capabilities, and interfaces without committing to any implementation technology or physical configuration. Logical blocks represent capabilities — "navigation capability," "power management capability," "human-machine interface capability" — not hardware assemblies. Logical interfaces describe the nature of the interaction — "receives position commands," "provides state-of-charge data" — without specifying protocol, connector type, or cable routing. A logical architecture is technology-agnostic: the same logical architecture for an AWRF could be realized as a fleet using LiDAR-based SLAM or as one using a vision-based SLAM system, because the logical block "localization subsystem" commits to neither.',
          'A physical architecture describes the system in terms of its actual implementation: specific hardware assemblies, software components with version identities, communication buses with named protocols, physical connectors with part numbers, and spatial configurations. Physical blocks are procurement items or build-to specifications. Physical interfaces are interface control documents with electrical, mechanical, and data specifications. The physical architecture is the artifact that manufacturing, integration, and test work from — it is not abstract, and it cannot be technology-agnostic. In SysML 1.7, the distinction is maintained through package organization: a logical architecture package and a physical architecture package contain separate but cross-referenced block hierarchies, related through «refine» or «realize» relationships that make the mapping from intent to implementation formally traceable.',
          'For the AWRF, the logical architecture includes blocks such as: TaskAllocationService, LocalizationService, ManipulationService, ChargingManagementService, and HumanSafetyMonitorService. The physical architecture includes: Fetch Robotics FR-500 mobile base (or equivalent), Intel RealSense D435i depth camera, UR5e collaborative arm, 48V Li-NMC battery pack with BMS, Cisco IR829 industrial router, and Ubuntu 20.04 / ROS 2 Foxy middleware stack. The «realize» relationship from each physical block to its logical counterpart is the formal audit trail that answers the program management question: "Has every logical capability been allocated to a physical element?"',
        ],
        callout: {
          type: 'gold',
          label: 'Architecture Maturity Gate — What CDR Must Demonstrate',
          body: 'By the time a program reaches Critical Design Review (CDR), the INCOSE SE Handbook v5 requires that the physical architecture be sufficiently mature that manufacturing can begin. But the CDR data package must also demonstrate closure of the logical-to-physical allocation: every logical function must have a physical element allocated to it, every physical element must be traceable to at least one logical function, and no orphaned physical elements — components that exist in the build but satisfy no allocated requirement — should remain. In a SysML-governed model, this audit is automated: a query on all «realize» and «allocate» relationships immediately surfaces unallocated logical elements and unreferenced physical elements. In a document-governed program, this audit requires weeks of manual cross-referencing and is almost never complete at CDR.',
        },
      },

      /* ── Section 5 ─────────────────────────────────────────────── */
      {
        heading: '5 · Use Case Diagrams — Modeling the System Boundary in SysML',
        paragraphs: [
          'The use case diagram is the entry point for behavioral modeling in SysML 1.7. Its purpose is not to describe how the system works internally — that is the domain of activity, sequence, and state machine diagrams — but to describe what the system offers to its external environment: the set of externally visible services that stakeholders can invoke, and the actors who invoke them. A use case diagram that correctly captures the system boundary is one of the most valuable early-lifecycle artifacts an MBSE team can produce, because it forces an explicit, reviewable answer to the question: what is inside the system of interest, and what is outside it?',
          'An actor in a use case diagram represents a role, not a person or an organizational unit. The same individual may simultaneously play multiple actor roles in relation to a system — a warehouse operations manager may be both a FleetConfigurationAuthority actor (who sets operational parameters) and a PerformanceDashboardConsumer actor (who monitors system output). This distinction matters because the two roles generate different use cases, different interface requirements, and potentially different security and access control requirements. Conflating them into a single "Manager" actor obscures the requirement differences and produces an underspecified model.',
          'For the AWRF, the primary use case diagram includes the following actors: WarehouseManagementSystem (external software system actor), FleetManagementSystem (system actor that may be internal or external depending on the chosen architecture boundary), HumanPicker (human actor in mixed-traffic zones), MaintenanceTechnician (human actor), ChargingInfrastructure (external enabling system actor), and FireSafetySystem (external regulatory/safety actor). The primary use cases are: ExecutePickOrder, NavigateToLocation, PerformItemRetrieval, DeliverToPackingStation, DockForCharging, ExecuteSafeStop, and RespondToEmergencySignal. The «include» dependency from ExecutePickOrder to NavigateToLocation captures the mandatory invocation — no pick order can be executed without navigation being triggered. The «extend» dependency from RespondToEmergencySignal to ExecutePickOrder captures the conditional override — under emergency conditions, the nominal execution is suspended.',
        ],
      },

      /* ── Section 6 ─────────────────────────────────────────────── */
      {
        heading: '6 · Activity Diagrams — Modeling Operational Flow and Functional Allocation',
        paragraphs: [
          'Where use case diagrams describe the system boundary from outside, activity diagrams describe the operational flow from within. In SysML 1.7, an activity diagram is a behavioral diagram that models the flow of actions, decisions, signals, and object tokens through a system or across a system boundary. Activity diagrams can operate at multiple levels of abstraction: at the mission level, they model the end-to-end operational thread from trigger to outcome; at the function level, they model the internal processing logic of a single use case; and at the allocation level, they assign functions to blocks through swim lanes (called partitions in SysML 1.7 terminology).',
          'The key elements of a SysML activity diagram are: InitialNode (filled circle, entry point), ActivityFinalNode (filled circle with outer ring, completion), FlowFinalNode (X in a circle, branch termination without global completion), Action (rounded rectangle, a named step), DecisionNode (diamond, conditional branch), MergeNode (diamond, join of conditional branches), ForkNode (thick horizontal or vertical bar, parallel execution split), JoinNode (thick bar, synchronization of parallel branches), ObjectNode (rectangle typed with a classifier, data or material flowing between actions), and ControlFlow / ObjectFlow edges (arrows). Swim lanes (ActivityPartitions) associate groups of actions with the Block or Actor responsible for performing them, establishing the functional allocation in a visually explicit form.',
          'For the AWRF pick execution thread, the activity diagram begins at InitialNode triggered by a WMS pick signal received as an ObjectNode carrying a PickOrder data type. A DecisionNode evaluates robot availability and battery state. If conditions are met, a ForkNode splits the execution into two concurrent paths: the NavigationSubsystem partition executes PathPlanning → WaypointExecution → ObstacleAvoidance, while the FleetManagementSystem partition executes OrderTracking → ETACalculation. A JoinNode synchronizes on arrival at the storage location. The ManipulationSubsystem partition then executes ItemLocalization → GraspExecution → ItemConfirmation. A final DecisionNode checks retrieval success — on failure, an alternative branch executes FaultReport and RetryProtocol. On success, ObjectFlow carries a CompletedPickItem token to the delivery action.',
        ],
        callout: {
          type: 'standard',
          label: 'SysML Activity Diagram — Notation Quick Reference',
          body: '<strong>InitialNode:</strong> filled black circle — entry point of the activity.<br><strong>ActivityFinalNode:</strong> filled circle inside a hollow circle — terminates the entire activity.<br><strong>FlowFinalNode:</strong> circle with X — terminates one flow path without ending the activity.<br><strong>Action:</strong> rounded rectangle with name — a named step performed by the system or actor.<br><strong>DecisionNode:</strong> diamond — one incoming flow, multiple outgoing flows with guard conditions.<br><strong>ForkNode:</strong> thick bar — one incoming flow, multiple concurrent outgoing flows.<br><strong>JoinNode:</strong> thick bar — multiple concurrent incoming flows, one outgoing flow (synchronization).<br><strong>Swim lane / Partition:</strong> named column or row — assigns actions to a responsible block or actor.<br><strong>ObjectFlow:</strong> dashed arrow with object node — typed data or material passing between actions.',
        },
      },

    ], // end content[]

    /* ═══════════════════════════════════════════════════════════════
       REFERENCES
       ═══════════════════════════════════════════════════════════════ */
    references: [
      'INCOSE. (2023). Systems Engineering Handbook v5. International Council on Systems Engineering.',
      'Object Management Group. (2019). OMG Systems Modeling Language v1.7 Specification. OMG formal/19-11-01.',
      'ANSI/AIAA G-043B-2012. Guide for the Preparation of Operational Concept Documents.',
      'ANSI/RIA R15.08-1-2020. Industrial Mobile Robots — Part 1: Safety Requirements.',
      'Friedenthal, S., Moore, A., & Steiner, R. (2015). A Practical Guide to SysML (3rd ed.). Morgan Kaufmann.',
      'Rechtin, E., & Maier, M. (1997). The Art of Systems Architecting (2nd ed.). CRC Press.',
      'ISO/IEC/IEEE 42010:2011. Systems and Software Engineering — Architecture Description.',
      'Maier, M. W., & Rechtin, E. (2009). The Art of Systems Architecting (3rd ed.). CRC Press.',
      'Sirigireddy, V. K. R., & Ahner, D. K. (2025). A MATLAB–MBSE Integrated Sizing Framework for eVTOL Aircraft. [Submitted, Chinese Journal of Aeronautics].',
      'Systems-Modeling Organization. (2026). OMG SysML v2 Release Repository [Software]. GitHub. https://github.com/Systems-Modeling/SysML-v2-Release (Includes KerML 1.0, SysML 2.0, and API 1.0 specification documents, normative model libraries, and Eclipse/Jupyter installer packages. Formally adopted by OMG 30 June 2025; updated for ISO submission March 2026.)',
      'Systems-Modeling Organization. (2026). SysML v2 Pilot Implementation [Software, EPL-2.0]. GitHub. https://github.com/Systems-Modeling/SysML-v2-Pilot-Implementation (Eclipse Xtext-based reference implementation of the SysML v2 textual notation; includes Jupyter kernel for SysML v2, PlantUML visualization integration, and 85 tagged releases through 2026-04.)',
    ],

    /* ═══════════════════════════════════════════════════════════════
       SCHEMA VISUALIZER  ─  Tab 2
       ═══════════════════════════════════════════════════════════════ */
    schemaVisualizer: [

      {
        category: 'SysML Behavioral Diagram',
        name: 'Use Case Diagram',
        diagramType: 'Use Case Diagram (UC)',
        shortDesc: 'Defines the system boundary and describes externally visible system services from each stakeholder\'s perspective.',
        fullDesc: 'The Use Case Diagram (UC) is the primary SysML instrument for defining the system boundary and capturing externally visible system services — called use cases — that actors can invoke. It answers the question "what does the system offer to the outside world?" rather than "how does the system work internally?" Every use case is a named capability that delivers a result of value to at least one actor. The system boundary rectangle separates the system of interest from its environment. Actors represent external roles — human, organizational, or system — that interact with the SOI. Three relationship types structure the diagram: association (actor participates in a use case), «include» (one use case always invokes another as a mandatory sub-behavior), and «extend» (one use case conditionally augments another under specified guard conditions).',
        notation: [
          'System boundary: labeled rectangle enclosing all use cases — the most critical element; drawn before any use case.',
          'Human actor: stick figure with name below; system/organization actor: rectangle with «actor» stereotype.',
          'Use case: named ellipse inside the system boundary.',
          'Association: solid line with no arrowhead — implies bidirectional participation between actor and use case.',
          '«include»: dashed arrow pointing FROM the base use case TO the included use case (mandatory invocation).',
          '«extend»: dashed arrow pointing FROM the extension use case TO the base use case (conditional; note the extension point).',
          'Generalization: solid line with hollow triangle arrowhead — specialization of an actor or use case.',
          'Never place logic or sequence inside the use case diagram — that belongs in activity and sequence diagrams.',
        ,
{category:'SysML Reference',name:'Nine Diagram Types — Four Pillars',diagramType:'Reference Card',shortDesc:'Complete reference showing all 9 SysML 1.7 diagram types across the 4 pillars. Memorize this map for the midterm and final exam.',fullDesc:'OMG SysML 1.7 (formal/19-11-01, ISO/IEC 19514:2017) organizes nine diagram types across four pillars. Requirements (1): Requirement Diagram. Structure (3): BDD, IBD, Package. Behavior (4): Use Case, Activity, Sequence, State Machine. Parametric (1): Parametric Diagram. Every WSU CEG/EGR 7800 lecture develops one or more of these diagram types. Cross-pillar traceability connects all four pillars into the complete MBSE model.',notation:['Requirements pillar: 1 diagram type — Requirement Diagram (traceability and derivation).','Structure pillar: 3 diagram types — BDD (type model), IBD (instance wiring), Package (namespace).','Behavior pillar: 4 diagram types — Use Case (scope), Activity (flow), Sequence (interaction), State Machine (lifecycle).','Parametric pillar: 1 diagram type — Parametric Diagram (quantitative constraints).','Ref: OMG SysML 1.7 Specification formal/19-11-01, Table 1 — Diagram Types. https://www.omg.org/spec/SysML/1.7'],example:'Lecture 2 diagram types map to the highlighted pillar(s) in the reference card above. Connect each diagram type you produce to its pillar, and trace the cross-pillar relationships that make your model an integrated whole rather than a collection of disconnected views.',svgMarkup:`<svg viewBox="0 0 430 175" xmlns="http://www.w3.org/2000/svg" style="padding:10px;background:#1a1a1a;"><text x="215" y="15" font-family="JetBrains Mono,monospace" font-size="8" fill="#5aad7a" text-anchor="middle">OMG SysML 1.7 — 9 Diagram Types across 4 Pillars (ISO/IEC 19514:2017)</text><rect x="8" y="22" width="88" height="70" rx="4" fill="rgba(2,105,55,0.1)" stroke="#026937" stroke-width="1.3"/><text x="52" y="35" font-family="JetBrains Mono,monospace" font-size="7" fill="#026937" text-anchor="middle" font-weight="bold">REQUIREMENTS</text><rect x="14" y="42" width="76" height="16" rx="3" fill="#1a2a1a" stroke="#5aad7a" stroke-width="0.8"/><text x="52" y="54" font-family="JetBrains Mono,monospace" font-size="6.5" fill="#c5d8e8" text-anchor="middle">Requirement Diagram</text><rect x="102" y="22" width="88" height="105" rx="4" fill="rgba(2,105,55,0.1)" stroke="#026937" stroke-width="1.3"/><text x="146" y="35" font-family="JetBrains Mono,monospace" font-size="7" fill="#026937" text-anchor="middle" font-weight="bold">STRUCTURE</text><rect x="108" y="42" width="76" height="15" rx="3" fill="#1a2a1a" stroke="#5aad7a" stroke-width="0.8"/><text x="146" y="53" font-family="JetBrains Mono,monospace" font-size="6.5" fill="#c5d8e8" text-anchor="middle">Block Def. Diagram</text><rect x="108" y="61" width="76" height="15" rx="3" fill="#1a2a1a" stroke="#5aad7a" stroke-width="0.8"/><text x="146" y="72" font-family="JetBrains Mono,monospace" font-size="6.5" fill="#c5d8e8" text-anchor="middle">Internal Block Diag.</text><rect x="108" y="80" width="76" height="15" rx="3" fill="#1a2a1a" stroke="#5aad7a" stroke-width="0.8"/><text x="146" y="91" font-family="JetBrains Mono,monospace" font-size="6.5" fill="#c5d8e8" text-anchor="middle">Package Diagram</text><rect x="196" y="22" width="88" height="140" rx="4" fill="rgba(2,105,55,0.1)" stroke="#026937" stroke-width="1.3"/><text x="240" y="35" font-family="JetBrains Mono,monospace" font-size="7" fill="#026937" text-anchor="middle" font-weight="bold">BEHAVIOR</text><rect x="202" y="42" width="76" height="14" rx="3" fill="#1a2a1a" stroke="#5aad7a" stroke-width="0.8"/><text x="240" y="53" font-family="JetBrains Mono,monospace" font-size="6.5" fill="#c5d8e8" text-anchor="middle">Use Case Diagram</text><rect x="202" y="60" width="76" height="14" rx="3" fill="#1a2a1a" stroke="#5aad7a" stroke-width="0.8"/><text x="240" y="71" font-family="JetBrains Mono,monospace" font-size="6.5" fill="#c5d8e8" text-anchor="middle">Activity Diagram</text><rect x="202" y="78" width="76" height="14" rx="3" fill="#1a2a1a" stroke="#5aad7a" stroke-width="0.8"/><text x="240" y="89" font-family="JetBrains Mono,monospace" font-size="6.5" fill="#c5d8e8" text-anchor="middle">Sequence Diagram</text><rect x="202" y="96" width="76" height="14" rx="3" fill="#1a2a1a" stroke="#5aad7a" stroke-width="0.8"/><text x="240" y="107" font-family="JetBrains Mono,monospace" font-size="6.5" fill="#c5d8e8" text-anchor="middle">State Machine Diag.</text><rect x="290" y="22" width="88" height="70" rx="4" fill="rgba(201,162,39,0.08)" stroke="#C9A227" stroke-width="1.3"/><text x="334" y="35" font-family="JetBrains Mono,monospace" font-size="7" fill="#C9A227" text-anchor="middle" font-weight="bold">PARAMETRIC</text><rect x="296" y="42" width="76" height="18" rx="3" fill="#1a2a1a" stroke="#C9A227" stroke-width="0.8"/><text x="334" y="55" font-family="JetBrains Mono,monospace" font-size="6.5" fill="#c5d8e8" text-anchor="middle">Parametric Diagram</text><text x="215" y="170" font-family="JetBrains Mono,monospace" font-size="6.5" fill="#4e5668" text-anchor="middle">Ref: OMG SysML 1.7 formal/19-11-01 · ISO/IEC 19514:2017 · omg.org/spec/SysML/1.7</text></svg>`},
{category:'INCOSE Lifecycle Reference',name:'SE Lifecycle — Lecture 2 Position',diagramType:'Process Reference (informative)',shortDesc:'INCOSE SE Handbook v5 six-phase lifecycle with Lecture 2 phase highlighted. Know where you are in the lifecycle at all times.',fullDesc:'INCOSE SE Handbook v5 (2023) defines six lifecycle stages, each bounded by decision gates requiring defined model maturity. Every MBSE activity in this course maps to one or more stages. The highlighted phase shows where Lecture 2 activities fall in the lifecycle. Know the gate entry criteria — they appear on the midterm and final exam.',notation:['Highlighted phase = primary lifecycle context for Lecture 2 activities.','Phase gate = decision point requiring authority approval and defined model maturity.','MCR: Mission Concept Review; SRR: System Requirements Review; PDR: Preliminary Design Review.','CDR: Critical Design Review; TRR: Test Readiness Review; OAR: Operational Acceptance Review.','Ref: INCOSE (2023). SE Handbook v5, Section 2.3 — Systems Lifecycle Stages.'],example:'At PDR (after Lecture 7), your model must pass: derivation coverage 100%, allocation coverage 100%, no orphaned requirements, naming convention compliance 100%. These are the exact criteria evaluated in Mini Project 1.',svgMarkup:`<svg viewBox="0 0 430 98" xmlns="http://www.w3.org/2000/svg" style="padding:10px;background:#1a1a1a;"><defs><marker id="lca2" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto"><polygon points="0 0,6 2,0 4" fill="#5aad7a"/></marker></defs><text x="215" y="15" font-family="JetBrains Mono,monospace" font-size="7.5" fill="#5aad7a" text-anchor="middle">INCOSE SE Handbook v5 — Lifecycle (L2: Concept Definition highlighted)</text><rect x="6" y="24" width="60" height="30" rx="3" fill="#1a2a1a" stroke="#C9A227" stroke-width="1.8"/><text x="36" y="44" font-family="JetBrains Mono,monospace" font-size='7.5' fill="#C9A227" text-anchor="middle" font-weight='bold'>Concept</text><rect x="76" y="24" width="60" height="30" rx="3" fill="#1a2a1a" stroke="#026937" stroke-width="1"/><text x="106" y="44" font-family="JetBrains Mono,monospace" font-size='6.5' fill="#026937" text-anchor="middle" font-weight='normal'>Sys Def</text><rect x="146" y="24" width="60" height="30" rx="3" fill="#1a2a1a" stroke="#026937" stroke-width="1"/><text x="176" y="44" font-family="JetBrains Mono,monospace" font-size='6.5' fill="#026937" text-anchor="middle" font-weight='normal'>Realization</text><rect x="216" y="24" width="60" height="30" rx="3" fill="#1a2a1a" stroke="#026937" stroke-width="1"/><text x="246" y="44" font-family="JetBrains Mono,monospace" font-size='6.5' fill="#026937" text-anchor="middle" font-weight='normal'>I&V</text><rect x="286" y="24" width="60" height="30" rx="3" fill="#1a2a1a" stroke="#026937" stroke-width="1"/><text x="316" y="44" font-family="JetBrains Mono,monospace" font-size='6.5' fill="#026937" text-anchor="middle" font-weight='normal'>Qual & Trans</text><rect x="356" y="24" width="60" height="30" rx="3" fill="#1a2a1a" stroke="#026937" stroke-width="1"/><text x="386" y="44" font-family="JetBrains Mono,monospace" font-size='6.5' fill="#026937" text-anchor="middle" font-weight='normal'>Ops & Maint</text><line x1="66" y1="39" x2="76" y2="39" stroke="#5aad7a" stroke-width="1" marker-end="url(#lca2)"/><line x1="136" y1="39" x2="146" y2="39" stroke="#5aad7a" stroke-width="1" marker-end="url(#lca2)"/><line x1="206" y1="39" x2="216" y2="39" stroke="#5aad7a" stroke-width="1" marker-end="url(#lca2)"/><line x1="276" y1="39" x2="286" y2="39" stroke="#5aad7a" stroke-width="1" marker-end="url(#lca2)"/><line x1="346" y1="39" x2="356" y2="39" stroke="#5aad7a" stroke-width="1" marker-end="url(#lca2)"/><polygon points="66,55 72,62 66,69 60,62" fill="#0d1a0d" stroke="#C9A227" stroke-width="1"/><text x="66" y="80" font-family="JetBrains Mono,monospace" font-size="6" fill="#C9A227" text-anchor="middle">MCR</text><polygon points="136,55 142,62 136,69 130,62" fill="#0d1a0d" stroke="#C9A227" stroke-width="1"/><text x="136" y="80" font-family="JetBrains Mono,monospace" font-size="6" fill="#C9A227" text-anchor="middle">SRR/PDR</text><polygon points="206,55 212,62 206,69 200,62" fill="#0d1a0d" stroke="#C9A227" stroke-width="1"/><text x="206" y="80" font-family="JetBrains Mono,monospace" font-size="6" fill="#C9A227" text-anchor="middle">CDR</text><polygon points="276,55 282,62 276,69 270,62" fill="#0d1a0d" stroke="#C9A227" stroke-width="1"/><text x="276" y="80" font-family="JetBrains Mono,monospace" font-size="6" fill="#C9A227" text-anchor="middle">TRR</text><polygon points="346,55 352,62 346,69 340,62" fill="#0d1a0d" stroke="#C9A227" stroke-width="1"/><text x="346" y="80" font-family="JetBrains Mono,monospace" font-size="6" fill="#C9A227" text-anchor="middle">OAR</text><text x="215" y="95" font-family="JetBrains Mono,monospace" font-size="6.5" fill="#4e5668" text-anchor="middle">Ref: INCOSE (2023). SE Handbook v5, Section 2.3 — Systems Lifecycle Stages</text></svg>`}
  ],
        example: 'For the AWRF, the system boundary encloses: ExecutePickOrder, NavigateToLocation, PerformItemRetrieval, DeliverToPackingStation, DockForCharging, ExecuteSafeStop, RespondToEmergencySignal. The WarehouseManagementSystem actor associates with ExecutePickOrder. The HumanPicker actor associates with PerformItemRetrieval (in pod-to-picker mode). The FireSafetySystem actor associates with RespondToEmergencySignal, which has an «extend» relationship to ExecutePickOrder, modeling the conditional override of nominal operation under emergency conditions.',
        svgMarkup: `<svg viewBox="0 0 440 240" xmlns="http://www.w3.org/2000/svg" style="padding:12px; background:#1a1a1a;">
          <defs>
            <style>
              .uc2-boundary { fill:rgba(2,105,55,0.06); stroke:#026937; stroke-width:1.5; stroke-dasharray:6,3; }
              .uc2-ellipse  { fill:#1e2a1e; stroke:#5aad7a; stroke-width:1.3; }
              .uc2-actor-line { stroke:#C9A227; stroke-width:1.4; fill:none; }
              .uc2-txt      { font-family:'JetBrains Mono',monospace; font-size:8px; fill:#c5d8e8; text-anchor:middle; }
              .uc2-hdr      { font-family:'JetBrains Mono',monospace; font-size:8.5px; fill:#026937; }
              .uc2-rel      { stroke:#7a9ab4; stroke-width:1; stroke-dasharray:4,2; fill:none; }
              .uc2-solid    { stroke:#7a9ab4; stroke-width:1; fill:none; }
              .uc2-lbl      { font-family:'JetBrains Mono',monospace; font-size:7px; fill:#5aad7a; text-anchor:middle; }
            </style>
            <marker id="uc2-arr" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto">
              <polygon points="0 0, 7 2.5, 0 5" fill="#7a9ab4"/>
            </marker>
          </defs>
          <!-- System boundary -->
          <rect x="100" y="16" width="260" height="206" rx="6" class="uc2-boundary"/>
          <text x="108" y="32" class="uc2-hdr">Autonomous Warehouse Robot Fleet</text>
          <!-- Use cases -->
          <ellipse cx="230" cy="66"  rx="62" ry="17" class="uc2-ellipse"/>
          <text x="230" y="70"  class="uc2-txt">ExecutePickOrder</text>
          <ellipse cx="230" cy="110" rx="58" ry="17" class="uc2-ellipse"/>
          <text x="230" y="114" class="uc2-txt">NavigateToLocation</text>
          <ellipse cx="230" cy="154" rx="60" ry="17" class="uc2-ellipse"/>
          <text x="230" y="158" class="uc2-txt">DockForCharging</text>
          <ellipse cx="230" cy="198" rx="66" ry="16" class="uc2-ellipse"/>
          <text x="230" y="202" class="uc2-txt">RespondToEmergency</text>
          <!-- Actor: WMS (left) -->
          <circle cx="42" cy="72"  r="9" class="uc2-actor-line"/>
          <line x1="42" y1="81" x2="42" y2="103" class="uc2-actor-line"/>
          <line x1="42" y1="89" x2="28" y2="99"  class="uc2-actor-line"/>
          <line x1="42" y1="89" x2="56" y2="99"  class="uc2-actor-line"/>
          <line x1="42" y1="103" x2="30" y2="116" class="uc2-actor-line"/>
          <line x1="42" y1="103" x2="54" y2="116" class="uc2-actor-line"/>
          <text x="42" y="128" class="uc2-txt" style="fill:#C9A227;">WMS</text>
          <!-- Actor: FireSafety (right) -->
          <circle cx="402" cy="200" r="9"  class="uc2-actor-line"/>
          <line x1="402" y1="209" x2="402" y2="231" class="uc2-actor-line"/>
          <line x1="402" y1="217" x2="388" y2="227" class="uc2-actor-line"/>
          <line x1="402" y1="217" x2="416" y2="227" class="uc2-actor-line"/>
          <line x1="402" y1="231" x2="390" y2="240" class="uc2-actor-line"/>
          <line x1="402" y1="231" x2="414" y2="240" class="uc2-actor-line"/>
          <text x="402" y="252" class="uc2-txt" style="fill:#C9A227; font-size:7px;">FireSafety</text>
          <!-- Associations -->
          <line x1="54"  y1="78" x2="168" y2="66" class="uc2-solid"/>
          <line x1="54"  y1="88" x2="172" y2="110" class="uc2-solid"/>
          <line x1="54"  y1="95" x2="170" y2="154" class="uc2-solid"/>
          <line x1="390" y1="204" x2="296" y2="198" class="uc2-solid"/>
          <!-- include dependency -->
          <line x1="230" y1="83" x2="230" y2="93" class="uc2-rel" marker-end="url(#uc2-arr)"/>
          <text x="260" y="91" class="uc2-lbl">«include»</text>
          <!-- extend dependency -->
          <path d="M 230 182 Q 230 192 230 182" class="uc2-rel"/>
          <line x1="230" y1="171" x2="230" y2="182" class="uc2-rel"/>
          <path d="M 230 154 Q 310 154 310 180 Q 310 198 296 198" class="uc2-rel" marker-end="url(#uc2-arr)"/>
          <text x="318" y="180" class="uc2-lbl">«extend»</text>
        </svg>`,
      },

      {
        category: 'SysML Behavioral Diagram',
        name: 'Activity Diagram',
        diagramType: 'Activity Diagram (ACT)',
        shortDesc: 'Models the flow of actions, decisions, and concurrent threads through the system with functional allocation via swim lanes.',
        fullDesc: 'The Activity Diagram (ACT) in SysML 1.7 is the primary instrument for modeling operational flows, functional decomposition, and functional allocation. It is a flow-graph model: nodes represent computational steps (Actions) or flow control points (Decision, Fork, Join, Merge), and edges carry either control flow (sequencing) or object flow (typed data and material). Activity Diagrams can span the full spectrum from mission-level operational threads to low-level function specifications. The most powerful feature for systems architecture is the ActivityPartition — a swim lane that associates a set of Actions with the responsible Block or Actor, making the functional allocation visible and formally traceable. In MBSE practice, the activity diagram is the behavioral counterpart of the BDD: together they answer both "what does it do" and "what is it made of."',
        notation: [
          'InitialNode: filled black circle — the single entry point of the activity.',
          'ActivityFinalNode: filled black circle inside a hollow ring — terminates the entire activity globally.',
          'FlowFinalNode: circle containing an X — terminates one flow path without ending the activity.',
          'Action: rounded rectangle — a named step; should be a verb phrase (e.g., "Evaluate BatterySOC").',
          'DecisionNode: diamond with one input, multiple guarded outputs — [guard condition] on each outgoing edge.',
          'MergeNode: diamond with multiple inputs, one output — no guard conditions; recombines conditional paths.',
          'ForkNode: thick horizontal or vertical bar — one input, multiple concurrent outputs (parallel split).',
          'JoinNode: thick bar — multiple concurrent inputs, one output — synchronization point.',
          'ObjectNode: rectangle typed with a class name — data flowing between actions (e.g., PickOrder, CompletedPick).',
          'ActivityPartition (swim lane): named column/row — associates actions with a responsible block or actor.',
          'ControlFlow: solid arrow — sequencing between actions.',
          'ObjectFlow: solid arrow from/to an ObjectNode — typed data/material passing between actions.',
        ],
        example: 'For the AWRF pick execution thread, the activity begins with an InitialNode in the WarehouseManagementSystem partition. A PickOrder ObjectNode flows to the FleetManagementSystem partition\'s AssignRobot action. A DecisionNode evaluates robot battery SOC: if below threshold, DockForCharging is invoked via a sub-activity call; otherwise, a ForkNode splits into the NavigationSubsystem partition (PathPlanning → WaypointExecution) and the FleetManagementSystem partition (OrderTracking). A JoinNode synchronizes on arrival. The ManipulationSubsystem partition then executes ItemLocalization → GraspExecution → ItemConfirmation. A CompletedPickItem ObjectNode carries the result to the DeliverToPackingStation action.',
        svgMarkup: `<svg viewBox="0 0 440 280" xmlns="http://www.w3.org/2000/svg" style="padding:10px; background:#1a1a1a;">
          <defs>
            <style>
              .act-lane   { fill:rgba(2,105,55,0.04); stroke:#026937; stroke-width:1; }
              .act-action { fill:#1e2a1e; stroke:#5aad7a; stroke-width:1.3; rx:5; }
              .act-txt    { font-family:'JetBrains Mono',monospace; font-size:8px; fill:#c5d8e8; text-anchor:middle; }
              .act-lbl    { font-family:'JetBrains Mono',monospace; font-size:7.5px; fill:#026937; }
              .act-flow   { stroke:#7a9ab4; stroke-width:1.2; fill:none; }
              .act-fork   { fill:#C9A227; }
              .act-obj    { fill:#0d1a0d; stroke:#5aad7a; stroke-width:1; }
            </style>
            <marker id="act-arr" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto">
              <polygon points="0 0, 7 2.5, 0 5" fill="#7a9ab4"/>
            </marker>
          </defs>
          <!-- Swim lane backgrounds -->
          <rect x="8"   y="8" width="130" height="264" rx="4" class="act-lane"/>
          <rect x="142" y="8" width="130" height="264" rx="4" class="act-lane" style="fill:rgba(201,162,39,0.03);"/>
          <rect x="276" y="8" width="156" height="264" rx="4" class="act-lane" style="fill:rgba(100,150,255,0.03);"/>
          <!-- Lane headers -->
          <text x="73"  y="22" class="act-lbl" text-anchor="middle">WMS / FMS</text>
          <text x="207" y="22" class="act-lbl" text-anchor="middle">NavigationSys</text>
          <text x="354" y="22" class="act-lbl" text-anchor="middle">ManipulationSys</text>
          <!-- Initial node -->
          <circle cx="73" cy="40" r="6" fill="#c5d8e8"/>
          <!-- PickOrder object node -->
          <rect x="30" y="52" width="86" height="14" rx="2" class="act-obj"/>
          <text x="73" y="62" class="act-txt" style="font-size:7px;">PickOrder</text>
          <!-- AssignRobot action -->
          <rect x="24" y="72" width="98" height="20" rx="4" class="act-action" style="fill:#1e2a1e;"/>
          <text x="73" y="86" class="act-txt">AssignRobot</text>
          <!-- Decision: BatteryOK? -->
          <polygon points="73,100 88,112 73,124 58,112" fill="#0d1a0d" stroke="#C9A227" stroke-width="1.2"/>
          <text x="73" y="116" class="act-txt" style="font-size:7px;">SOC&gt;20%?</text>
          <!-- Fork bar -->
          <rect x="24" y="134" width="248" height="5" rx="2" class="act-fork"/>
          <!-- PathPlanning action -->
          <rect x="148" y="146" width="118" height="20" rx="4" class="act-action"/>
          <text x="207" y="160" class="act-txt">PathPlanning</text>
          <!-- WaypointExecution action -->
          <rect x="148" y="174" width="118" height="20" rx="4" class="act-action"/>
          <text x="207" y="188" class="act-txt">WaypointExecution</text>
          <!-- OrderTracking action -->
          <rect x="24" y="146" width="98" height="20" rx="4" class="act-action"/>
          <text x="73" y="160" class="act-txt">OrderTracking</text>
          <!-- Join bar -->
          <rect x="24" y="202" width="248" height="5" rx="2" class="act-fork"/>
          <!-- ItemLocalization -->
          <rect x="282" y="214" width="140" height="20" rx="4" class="act-action"/>
          <text x="352" y="228" class="act-txt">ItemLocalization</text>
          <!-- GraspExecution -->
          <rect x="282" y="242" width="140" height="20" rx="4" class="act-action"/>
          <text x="352" y="256" class="act-txt">GraspExecution</text>
          <!-- Final node -->
          <circle cx="352" cy="272" r="6" fill="none" stroke="#c5d8e8" stroke-width="1.5"/>
          <circle cx="352" cy="272" r="4" fill="#c5d8e8"/>
          <!-- Flow arrows -->
          <line x1="73" y1="46" x2="73" y2="52" class="act-flow" marker-end="url(#act-arr)"/>
          <line x1="73" y1="66" x2="73" y2="72" class="act-flow" marker-end="url(#act-arr)"/>
          <line x1="73" y1="92" x2="73" y2="100" class="act-flow" marker-end="url(#act-arr)"/>
          <line x1="73" y1="124" x2="73" y2="134" class="act-flow" marker-end="url(#act-arr)"/>
          <line x1="73" y1="139" x2="73" y2="146" class="act-flow" marker-end="url(#act-arr)"/>
          <line x1="207" y1="139" x2="207" y2="146" class="act-flow" marker-end="url(#act-arr)"/>
          <line x1="207" y1="166" x2="207" y2="174" class="act-flow" marker-end="url(#act-arr)"/>
          <line x1="73"  y1="166" x2="73" y2="202" class="act-flow"/>
          <line x1="207" y1="194" x2="207" y2="207" class="act-flow"/>
          <line x1="352" y1="139" x2="352" y2="207" class="act-flow" style="stroke-dasharray:3,2;"/>
          <line x1="352" y1="207" x2="352" y2="214" class="act-flow" marker-end="url(#act-arr)"/>
          <line x1="352" y1="234" x2="352" y2="242" class="act-flow" marker-end="url(#act-arr)"/>
          <line x1="352" y1="262" x2="352" y2="266" class="act-flow" marker-end="url(#act-arr)"/>
          <!-- Guard label -->
          <text x="94" y="109" style="font-family:'JetBrains Mono',monospace;font-size:7px;fill:#5aad7a;">[yes]</text>
        </svg>`,
      },

      {
        category: 'SysML Structural Diagram',
        name: 'Actor (Use Case)',
        diagramType: 'Use Case Diagram',
        shortDesc: 'Represents an external role — human, organization, or system — that interacts with the system of interest.',
        fullDesc: 'An Actor in SysML 1.7 represents a classifier that specifies a role played by a user, system, or organization that interacts with the system of interest from outside its boundary. Actors are never inside the system boundary rectangle. A human actor is rendered as a stick figure; a system or organizational actor is rendered as a rectangle bearing the «actor» stereotype. The same physical entity may play multiple actor roles — an engineer may be both a SystemOperator and a MaintenanceTechnician actor in relation to the AWRF, generating different use case associations and different requirement implications for each role. Actors do not have internal structure; they are defined purely by their interaction profile with the system.',
        notation: [
          'Human actor: stick figure (circle head, line body, line arms, line legs) with name below.',
          'System/organization actor: rectangle with «actor» stereotype keyword in header.',
          'An actor is always OUTSIDE the system boundary rectangle.',
          'An actor is defined by its ROLE and CONCERN, not by the name of a person or job title.',
          'Generalization between actors: solid line with hollow triangle — models role inheritance.',
          'An actor with no associations is invalid — every actor must participate in at least one use case.',
        ],
        example: 'In the AWRF use case diagram, the WarehouseManagementSystem is modeled as a system actor (rectangle with «actor» stereotype) rather than a human actor (stick figure), because it is an automated system. The FireSafetySystem is similarly a system actor. The HumanPicker is a human actor (stick figure) because it represents a physical person in the warehouse environment. Distinguishing these prevents the common error of drawing all actors as stick figures regardless of their nature, which obscures the system-vs-human interface boundary.',
        svgMarkup: `<svg viewBox="0 0 440 180" xmlns="http://www.w3.org/2000/svg" style="padding:14px; background:#1a1a1a;">
          <defs>
            <style>
              .actor-rect { fill:#1e2a1e; stroke:#5aad7a; stroke-width:1.4; }
              .actor-line { stroke:#C9A227; stroke-width:1.5; fill:none; }
              .actor-txt  { font-family:'JetBrains Mono',monospace; font-size:9px; fill:#c5d8e8; text-anchor:middle; }
              .actor-kw   { font-family:'JetBrains Mono',monospace; font-size:8px; fill:#5aad7a; text-anchor:middle; }
              .actor-div  { stroke:#5aad7a; stroke-width:0.8; }
              .actor-ann  { font-family:'JetBrains Mono',monospace; font-size:8px; fill:#7a9ab4; }
            </style>
          </defs>
          <!-- Human actor: HumanPicker -->
          <circle cx="68" cy="45" r="12" class="actor-line"/>
          <line x1="68" y1="57" x2="68" y2="90" class="actor-line"/>
          <line x1="68" y1="68" x2="48" y2="80" class="actor-line"/>
          <line x1="68" y1="68" x2="88" y2="80" class="actor-line"/>
          <line x1="68" y1="90" x2="50" y2="110" class="actor-line"/>
          <line x1="68" y1="90" x2="86" y2="110" class="actor-line"/>
          <text x="68" y="126" class="actor-txt">HumanPicker</text>
          <text x="68" y="138" class="actor-ann" text-anchor="middle" style="fill:#5aad7a;">human actor</text>
          <!-- System actor: WarehouseManagementSystem -->
          <rect x="150" y="28" width="140" height="52" rx="3" class="actor-rect"/>
          <rect x="150" y="28" width="140" height="18" rx="3" class="actor-rect" style="fill:rgba(2,105,55,0.25);"/>
          <line x1="150" y1="46" x2="290" y2="46" class="actor-div"/>
          <text x="220" y="42" class="actor-kw">«actor»</text>
          <text x="220" y="61" class="actor-txt">WarehouseMgmtSys</text>
          <text x="220" y="73" class="actor-ann" text-anchor="middle" style="fill:#7a9ab4;font-size:7.5px;">external software system</text>
          <text x="220" y="95" class="actor-ann" text-anchor="middle" style="fill:#5aad7a;">system actor</text>
          <!-- System actor: FireSafetySystem -->
          <rect x="310" y="28" width="118" height="52" rx="3" class="actor-rect"/>
          <rect x="310" y="28" width="118" height="18" rx="3" class="actor-rect" style="fill:rgba(2,105,55,0.25);"/>
          <line x1="310" y1="46" x2="428" y2="46" class="actor-div"/>
          <text x="369" y="42" class="actor-kw">«actor»</text>
          <text x="369" y="61" class="actor-txt">FireSafetySystem</text>
          <text x="369" y="73" class="actor-ann" text-anchor="middle" style="fill:#7a9ab4;font-size:7.5px;">external safety system</text>
          <text x="369" y="95" class="actor-ann" text-anchor="middle" style="fill:#5aad7a;">system actor</text>
          <!-- Comparison labels -->
          <rect x="8" y="145" width="422" height="24" rx="3" style="fill:rgba(2,105,55,0.08); stroke:#026937; stroke-width:1;"/>
          <text x="218" y="161" class="actor-ann" text-anchor="middle" style="fill:#5aad7a;">Human actors → stick figure · System/Organization actors → «actor» rectangle · Both are always OUTSIDE the system boundary</text>
        </svg>`,
      },

      {
        category: 'SysML Behavioral Concept',
        name: '«include» and «extend» Relationships',
        diagramType: 'Use Case Diagram',
        shortDesc: 'Structural relationships between use cases: include for mandatory sub-behaviors, extend for conditional augmentation.',
        fullDesc: 'Two dependency stereotypes organize use case relationships in SysML 1.7. The «include» relationship models a mandatory, unconditional invocation: whenever the base use case executes, the included use case always executes as part of it. The arrow points FROM the base TO the included use case. «include» is used to factor out common sub-behaviors shared by multiple use cases — avoiding repetition and creating reusable behavioral units. The «extend» relationship models a conditional, optional augmentation: the extension use case executes only when a specified extension point condition in the base use case is satisfied. The arrow points FROM the extension use case TO the base use case. «extend» is used to model exceptional, alternative, or optional behaviors without polluting the base use case description.',
        notation: [
          '«include»: dashed arrow pointing FROM the base use case TO the included use case.',
          '«extend»: dashed arrow pointing FROM the extension use case TO the base use case.',
          'Arrow direction for «include» and «extend» are opposite — this is the most common notation error.',
          'Extension point: a named location in the base use case where the extension can attach.',
          '«include» = always executed; «extend» = conditionally executed.',
          'Do not use «extend» to model normal alternate flows — those belong in the use case description or activity diagram.',
        ],
        example: 'In the AWRF use case diagram: ExecutePickOrder «include» NavigateToLocation — because every pick order execution unconditionally requires navigation. ExecutePickOrder «extend»-ed by RespondToEmergencySignal — because a fire alarm or emergency stop conditionally suspends the pick execution, augmenting the base use case only when the emergency extension point condition is triggered. The direction of the «extend» arrow (FROM RespondToEmergencySignal TO ExecutePickOrder) reflects that the extension use case "knows about" the base, but the base use case does not need to know about the extension.',
        svgMarkup: `<svg viewBox="0 0 440 200" xmlns="http://www.w3.org/2000/svg" style="padding:14px; background:#1a1a1a;">
          <defs>
            <style>
              .ie-ell { fill:#1e2a1e; stroke:#5aad7a; stroke-width:1.3; }
              .ie-txt { font-family:'JetBrains Mono',monospace; font-size:8.5px; fill:#c5d8e8; text-anchor:middle; }
              .ie-rel { stroke:#7a9ab4; stroke-width:1.1; stroke-dasharray:5,3; fill:none; }
              .ie-lbl { font-family:'JetBrains Mono',monospace; font-size:8px; fill:#5aad7a; text-anchor:middle; }
              .ie-note { font-family:'JetBrains Mono',monospace; font-size:7.5px; fill:#7a9ab4; }
            </style>
            <marker id="ie-arr" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill="#7a9ab4"/>
            </marker>
          </defs>
          <!-- Base use case -->
          <ellipse cx="220" cy="95"  rx="90" ry="22" class="ie-ell"/>
          <text x="220" y="99" class="ie-txt">ExecutePickOrder</text>
          <!-- Included use case -->
          <ellipse cx="90" cy="165"  rx="72" ry="18" class="ie-ell"/>
          <text x="90"  y="169" class="ie-txt">NavigateToLocation</text>
          <!-- Extension use case -->
          <ellipse cx="360" cy="165" rx="68" ry="18" class="ie-ell"/>
          <text x="360" y="169" class="ie-txt">RespondToEmergency</text>
          <!-- include arrow: base → included -->
          <line x1="148" y1="108" x2="118" y2="147" class="ie-rel" marker-end="url(#ie-arr)"/>
          <text x="108" y="130" class="ie-lbl">«include»</text>
          <!-- extend arrow: extension → base -->
          <line x1="324" y1="148" x2="290" y2="115" class="ie-rel" marker-end="url(#ie-arr)"/>
          <text x="338" y="130" class="ie-lbl">«extend»</text>
          <!-- Arrow direction annotations -->
          <text x="220" y="28" class="ie-note" text-anchor="middle" style="fill:#C9A227;">«include» arrow points FROM base TO included (mandatory sub-behavior)</text>
          <text x="220" y="42" class="ie-note" text-anchor="middle" style="fill:#C9A227;">«extend» arrow points FROM extension TO base (conditional augmentation)</text>
          <!-- Direction indicators -->
          <text x="130" y="95" class="ie-note" style="fill:#5aad7a;">always ↙</text>
          <text x="286" y="95" class="ie-note" style="fill:#C9A227;">conditionally ↗</text>
        </svg>`,
      },

    ], // end schemaVisualizer[]

    /* ═══════════════════════════════════════════════════════════════
       PLAYGROUND  ─  Tab 3
       ═══════════════════════════════════════════════════════════════ */
    playground: {
      title:        'Use Case Boundary Modeling — AWRF Actor–Use Case Connections',
      instructions: 'This mini-project builds the AWRF use case diagram interactively. Add actors and use cases from the palette, then click the green port on any block to start a connection and click a destination block to complete it. Practice: connect each actor to the appropriate use case(s). Then try adding an «include» connection from ExecutePickOrder to NavigateToLocation.',
      objectives: [
        'Add the WarehouseManagementSystem actor and connect it to ExecutePickOrder to model the primary system trigger.',
        'Add the HumanPicker actor and connect it to PerformItemRetrieval, placing the actor outside the system context.',
        'Add the FireSafetySystem actor and connect it to RespondToEmergencySignal.',
        'Connect ExecutePickOrder to NavigateToLocation to practice the «include» relationship between use cases.',
        'Observe that all actor-to-use-case connections cross the system boundary — no actor should be inside the context block.',
      ],
      palette: [
        { stereotype: '«context»',    name: 'AWRF System Boundary',      props: ['+ missionDomain: Warehouse', '+ operatingEnv: IndoorFleet'] },
        { stereotype: '«actor»',      name: 'WarehouseMgmtSystem',        props: ['+ type: ExternalSystem', '+ protocol: REST/API'] },
        { stereotype: '«actor»',      name: 'HumanPicker',                props: ['+ role: PickStationOp', '+ safetyZone: Active'] },
        { stereotype: '«actor»',      name: 'FireSafetySystem',           props: ['+ type: ExternalSafety', '+ signal: DryContact'] },
        { stereotype: '«actor»',      name: 'MaintenanceTech',            props: ['+ role: AMR_Maintainer', '+ accessLevel: Full'] },
        { stereotype: '«usecase»',    name: 'ExecutePickOrder',           props: ['+ trigger: WMS_API', '+ priority: High'] },
        { stereotype: '«usecase»',    name: 'NavigateToLocation',         props: ['+ algorithm: SLAM', '+ safetyClass: SIL2'] },
        { stereotype: '«usecase»',    name: 'DockForCharging',            props: ['+ threshold: SOC<20%', '+ duration: 45min'] },
        { stereotype: '«usecase»',    name: 'RespondToEmergencySignal',   props: ['+ responseTime: <500ms', '+ mode: SafeStop'] },
        { stereotype: '«usecase»',    name: 'PerformItemRetrieval',       props: ['+ mode: Autonomous/Assisted'] },
      ],
      defaultBlocks: [
        { stereotype: '«context»', name: 'AWRF System Boundary',    props: ['+ missionDomain: Warehouse'],    x: 170, y: 30  },
        { stereotype: '«actor»',   name: 'WarehouseMgmtSystem',     props: ['+ type: ExternalSystem'],        x: 20,  y: 80  },
        { stereotype: '«usecase»', name: 'ExecutePickOrder',         props: ['+ trigger: WMS_API'],            x: 210, y: 100 },
        { stereotype: '«actor»',   name: 'FireSafetySystem',         props: ['+ type: ExternalSafety'],        x: 20,  y: 230 },
        { stereotype: '«usecase»', name: 'RespondToEmergencySignal', props: ['+ responseTime: <500ms'],        x: 210, y: 230 },
      ],
    },

    /* ═══════════════════════════════════════════════════════════════
       QUIZ  ─  Tab 4
       ═══════════════════════════════════════════════════════════════ */
    quiz: {
      questions: [
        {
          question: 'A development team writes the following as their problem statement: "Design a 6-rotor eVTOL with a 90 kWh battery and a 280 kW distributed propulsion system." According to the problem-framing principle in INCOSE SE Handbook v5, what is the fundamental flaw in this statement?',
          options: [
            'The rotor count is incorrect for this class of vehicle.',
            'It is a solution statement rather than a problem statement — it precommits to an architecture before the operational need, stakeholder concerns, and mission context have been established.',
            'It omits the battery chemistry specification required for a complete problem statement.',
            'INCOSE SE Handbook v5 requires problem statements to be written in the passive voice.',
          ],
          correct: 1,
          explanation: 'A problem statement must be architecture-agnostic and stakeholder-derived: it states the operational need, for whom, under what conditions, and against what success criteria — without specifying any implementation. "Design a 6-rotor eVTOL with a 90 kWh battery" is a solution statement that forecloses alternative configurations (lift-plus-cruise, hybrid tilt-rotor) and locks the design before stakeholder needs have been formally elicited. INCOSE SE Handbook v5 explicitly identifies premature solution-framing as a leading cause of requirements failure.',
        },
        {
          question: 'In the INCOSE stakeholder taxonomy, which class imposes mandatory constraints on system design, operation, or disposal that the development team has no authority to negotiate or waive?',
          options: [
            'Primary stakeholders — they operate the system and set performance requirements.',
            'Secondary stakeholders — they are affected by the system\'s operation.',
            'Regulatory stakeholders — they impose legally or contractually mandatory compliance requirements such as safety standards, certifications, and environmental regulations.',
            'Support stakeholders — they provide training and knowledge management.',
          ],
          correct: 2,
          explanation: 'Regulatory stakeholders (OSHA, FAA, ANSI/RIA, fire marshals, etc.) impose non-negotiable constraints that represent external authority over the system. Unlike primary or secondary stakeholder requirements — which can be traded off against each other during requirements negotiation — regulatory requirements are hard constraints that define the feasible design space rather than preferences within it. Omitting regulatory stakeholders from the stakeholder analysis is one of the most common and consequential requirements elicitation errors.',
        },
        {
          question: 'In SysML 1.7 use case diagrams, the «include» and «extend» relationships are frequently confused because their arrow directions are opposite to what many engineers intuitively expect. Which of the following correctly states both arrow directions?',
          options: [
            '«include»: FROM included TO base; «extend»: FROM base TO extension.',
            '«include»: FROM base TO included; «extend»: FROM extension TO base.',
            '«include»: FROM base TO included; «extend»: FROM base TO extension.',
            '«include»: FROM included TO base; «extend»: FROM extension TO base.',
          ],
          correct: 1,
          explanation: 'The «include» arrow points FROM the base use case TO the included use case, reflecting that the base "calls" the included behavior. The «extend» arrow points FROM the extension use case TO the base use case, reflecting that the extension "knows about" the base and conditionally augments it — while the base remains unaware of the extension. This asymmetry is deliberate: it allows extension use cases to be added without modifying the base use case description, which is the open/closed design principle applied to behavioral modeling.',
        },
        {
          question: 'What is the defining difference between a logical architecture and a physical architecture in systems engineering?',
          options: [
            'The logical architecture is drawn in SysML; the physical architecture is drawn in CAD.',
            'The logical architecture describes system capabilities and interfaces without implementation commitment; the physical architecture specifies the actual hardware assemblies, software versions, protocols, and configurations that realize those capabilities.',
            'The logical architecture is developed by systems engineers; the physical architecture is developed by mechanical engineers.',
            'The logical architecture addresses requirements; the physical architecture addresses test procedures.',
          ],
          correct: 1,
          explanation: 'The logical architecture is technology-agnostic: its blocks represent capabilities (NavigationService, PowerManagementService) and its interfaces describe interaction semantics without specifying protocols or connectors. The physical architecture commits to implementation: specific hardware (Intel RealSense D435i, 48V Li-NMC pack), software (ROS 2 Foxy), and communication standards (CAN FD, EtherNet/IP). The «realize» relationship in SysML 1.7 formally maps physical elements to their logical counterparts, providing the audit trail that confirms every logical capability has been allocated to a physical element.',
        },
        {
          question: 'In a SysML 1.7 Activity Diagram, what is the function of a ForkNode and how does it differ semantically from a DecisionNode?',
          options: [
            'A ForkNode splits a flow based on guard conditions evaluated at runtime; a DecisionNode splits a flow into unconditional parallel branches.',
            'A ForkNode creates multiple conditional branches where only one will execute; a DecisionNode creates multiple concurrent branches that all execute simultaneously.',
            'A ForkNode creates multiple concurrent parallel branches that all execute simultaneously; a DecisionNode creates multiple conditional branches where only one executes based on a guard condition.',
            'A ForkNode and a DecisionNode are interchangeable; the choice between them is purely aesthetic.',
          ],
          correct: 2,
          explanation: 'A ForkNode (thick bar) splits one incoming flow into multiple outgoing flows that execute concurrently — all downstream branches run in parallel. A DecisionNode (diamond) splits one incoming flow into multiple outgoing flows that are mutually exclusive — only the branch whose guard condition evaluates to true executes. For the AWRF pick thread, a ForkNode is used after route assignment to split the NavigationSubsystem and FleetManagementSystem activities into parallel execution, while a DecisionNode is used to choose between the normal pick path and the fault-recovery path based on a battery SOC guard condition.',
        },
      ],
    },

    /* ═══════════════════════════════════════════════════════════════
       ASSIGNMENT  ─  Tab 5
       ═══════════════════════════════════════════════════════════════ */
    assignment: {
      title:  'Assignment 2: CONOPS Development & Stakeholder Analysis — Autonomous Warehouse Robot Fleet',
      brief:  'You are the lead systems engineer for the Autonomous Warehouse Robot Fleet (AWRF) program at a national e-commerce distribution center. Your task is to produce a complete, structured Concept of Operations (CONOPS) document for the AWRF, applying the five-class INCOSE stakeholder taxonomy, defining the logical-vs-physical architecture boundary, and constructing a use case diagram that correctly models the system boundary and actor interactions. Your CONOPS must cover both nominal and off-nominal operational scenarios. All deliverables must be submitted as a single PDF with clearly labeled sections corresponding to each rubric criterion.',
      deliverables: [
        'Stakeholder Register: Identify a minimum of 8 distinct stakeholder entries across all five INCOSE classes (primary, secondary, regulatory, operational, support). For each entry: state the stakeholder name, class, primary concern, authority level over requirements (High/Medium/Low/None), and at least one candidate system-level requirement derived from their concern.',
        'Problem Statement: Write a single-paragraph, architecture-agnostic problem statement for the AWRF that captures the operational need, beneficiary, operating environment, mission success criteria, and constraints — without specifying any implementation technology.',
        'CONOPS Narrative: Write a structured operational concept narrative covering: (a) nominal pick execution thread from WMS trigger to packing station delivery; (b) off-nominal scenario — robot fault during retrieval; (c) off-nominal scenario — communication link loss with FMS; (d) emergency scenario — fire suppression system activation. Each scenario must specify trigger, actor actions, system responses, and success/failure criteria.',
        'Use Case Diagram: Produce a SysML-compliant use case diagram (hand-drawn, PlantUML, or CATIA Magic export) that includes: system boundary labeled "AWRF SOI"; minimum 6 use cases; minimum 4 actors of at least 2 different types (human and system); at least 1 «include» relationship with correct arrow direction; at least 1 «extend» relationship with correct arrow direction.',
        'Logical–Physical Architecture Mapping: For 3 logical capability blocks from your AWRF logical architecture, identify the corresponding physical element(s) that realize each capability. Present as a mapping table with columns: Logical Block, Physical Element, Realization Rationale, «realize» relationship documented (Y/N).',
        'Reflection: In 250–350 words, explain how the problem-framing principle from Lecture 2 would have prevented the eVTOL MTOW underestimation error described in Lecture 1 — and identify one analogous problem-framing risk in the AWRF that, if ignored, could produce a comparably costly downstream error.',
      ],
      rubric: [
        {
          criterion: 'Stakeholder Register Completeness',
          descriptor: 'All 5 INCOSE classes represented, ≥8 entries, concerns and authority levels stated, requirements derived.',
          max: 22,
        },
        {
          criterion: 'Problem Statement Quality',
          descriptor: 'Architecture-agnostic, stakeholder-derived, testable success criteria, no solution language.',
          max: 14,
        },
        {
          criterion: 'CONOPS Narrative Rigor',
          descriptor: 'All 4 scenarios covered (nominal + 3 off-nominal), triggers and responses specified, success criteria stated.',
          max: 24,
        },
        {
          criterion: 'Use Case Diagram Correctness',
          descriptor: 'System boundary drawn, ≥6 use cases, ≥4 actors (mixed types), «include»/«extend» arrow directions correct.',
          max: 20,
        },
        {
          criterion: 'Logical–Physical Architecture Mapping',
          descriptor: 'Three logical-to-physical mappings with rationale and «realize» relationship documented.',
          max: 12,
        },
        {
          criterion: 'Reflection Depth & Insight',
          descriptor: 'Connection to Lecture 1 case is technically accurate; AWRF risk identification is specific and plausible.',
          max: 8,
        },
      ],
      gradingNotes: [
        'A stakeholder entry that lists "Manager" or "Engineer" as the stakeholder name without specifying the role and concern will score zero for that entry on the Register criterion — actor definitions must be role-based, not title-based.',
        'A problem statement that contains any technology reference (e.g., "LiDAR," "ROS 2," "six-wheel drive") will receive zero on the Problem Statement criterion regardless of other content quality — architecture neutrality is the entire point of the exercise.',
        'CONOPS narratives that cover only the nominal pick thread without any off-nominal scenario cannot score above 10/24 on the CONOPS Narrative criterion. Off-nominal and emergency scenarios generate requirements that the nominal thread simply does not expose.',
        '«include» and «extend» arrow directions are graded strictly. A diagram with both arrows pointing the same direction — regardless of which direction — receives zero on that element of the Use Case Diagram criterion. The direction distinction is testable, unambiguous, and fundamental to correct SysML use.',
        'The logical–physical mapping table must include the «realize» relationship column. A mapping that simply lists logical and physical elements without the formal relationship documentation is architectural documentation, not MBSE practice.',
        'Late submissions are penalized 10 points per calendar day. No submissions accepted more than 5 calendar days after the due date.',
      ],
    },

  
    courseMeta:{courseCode:'CEG/EGR 7800',courseTitle:'Model-Based Systems Engineering',university:'Wright State University',college:'College of Engineering and Computer Science',totalPoints:300,gradeBreakdown:{weeklyAssignments:{points:150,pct:50,desc:'30 weekly assignments x 5 pts each'},weeklyMCQ:{points:30,pct:10,desc:'30 quizzes x 5 Qs x 1 pt (auto-graded, closes Sunday 11:59 PM)'},miniProject1:{points:30,pct:10,desc:'AWRF Requirements and Architecture (due end of Week 8)'},miniProject2:{points:30,pct:10,desc:'eVTOL Parametric Sizing Study (due end of Week 17)'},midtermExam:{points:30,pct:10,desc:'Week 15 open-note exam covering Lectures 1-14 (90 minutes)'},finalProject:{points:60,pct:20,desc:'Capstone Portfolio Defense Week 30 — 3 track options: AWRF Track A, eVTOL Track B, CubeSat Track C'}},gradeScale:{A:'270-300 (90-100%)',B:'240-269 (80-89%)',C:'210-239 (70-79%)',D:'180-209 (60-69%)',F:'below 180 (below 60%)'},latePenalty:'10 points per calendar day; no submissions after 5 days past due date',academicIntegrity:'Per WSU Academic Integrity Policy: all model artifacts must be individually authored'},
    weeklyMCQ:{points:5,closesDay:'Sunday 11:59 PM',instructions:'Auto-graded. 2 attempts; highest score counts. Covers key concepts of Lecture 2. Complete before Sunday 11:59 PM of the lecture week.',questions:[
      {question:'Which INCOSE stakeholder class imposes constraints that the development team has no authority to negotiate or waive?',options:['Primary stakeholders','Secondary stakeholders','Regulatory stakeholders','Support stakeholders'],correct:2,explanation:'Regulatory stakeholders (OSHA, FAA, ANSI/RIA) impose legally mandatory constraints. Unlike primary/secondary stakeholder requirements (negotiable within program constraints), regulatory requirements define the non-negotiable boundary of the feasible design space.'},
      {question:'A CONOPS that covers only the nominal AWRF pick execution thread will systematically omit which category of requirements?',options:['Performance requirements for throughput.','Off-nominal requirements — fault detection, autonomous recovery, communication loss, emergency stop, degraded-mode operation — that only surface through failure scenario analysis.','Interface requirements between WMS and FMS.','Availability and MTBF requirements.'],correct:1,explanation:'Off-nominal scenarios expose requirements that the nominal thread cannot generate. INCOSE field data indicates 30-40% of system-level requirements originate from alternate and exception flows. A CONOPS covering only the nominal scenario is structurally incomplete regardless of its quality.'},
      {question:'The «extend» relationship in a SysML Use Case Diagram has its arrow pointing FROM the extension use case TO the base use case. What does this direction express architecturally?',options:['The extension always executes before the base use case begins.','The extension conditionally augments the base under a specified condition — the extension knows about the base, but the base is unaware of the extension, allowing extensions to be added without modifying the base.','The base use case is deprecated and replaced by the extension.','The extension use case is a precondition for the base use case.'],correct:1,explanation:'The «extend» arrow direction reflects the open/closed principle: the base use case is closed for modification but open for extension. The extension use case references the extension point in the base (hence arrow FROM extension TO base). This allows emergency behaviors to be added to ExecutePickOrder without rewriting its description.'},
      {question:'In SysML 1.7, the logical-to-physical realize relationship maps:',options:['Software source code to compiled executables.','Physical architectural elements (hardware assemblies, software versions) to the logical capabilities they implement — providing the audit trail that confirms every capability has a physical realization.','Logical blocks to their parent packages.','Physical test cases to their corresponding requirements.'],correct:1,explanation:'The realize relationship (from physical element TO logical block) is the formal architectural closure mechanism. At CDR, 100% realize coverage is required: every logical capability must have a physical element, and every physical element must be traceable to a logical function. This query takes seconds in a SysML model versus weeks manually.'},
      {question:'For the AWRF, the stakeholder concern "workers must not be struck by autonomous mobile robots in shared zones" originates from which INCOSE stakeholder class?',options:['Primary stakeholders (warehouse operations managers).','Secondary stakeholders (warehouse workers in shared zones who are affected but do not directly operate AMRs) AND Regulatory stakeholders (OSHA 29 CFR 1910 machinery safeguarding).','Support stakeholders (maintenance technicians).','Operational stakeholders (IT infrastructure team).'],correct:1,explanation:'Worker safety in shared zones is a secondary stakeholder concern (affected workers) that simultaneously generates a regulatory constraint (OSHA safeguarding standards). This is an example of a requirement that emerges from stakeholder classes outside the primary operator group — a common omission in programs that interview only primary users.'}
    ]},
    miniProject:{status:'building',dueWeek:8,title:'Mini Project 1: AWRF System Requirements Definition and Structural Architecture',note:'Lecture 2 of 7 pre-MP1 lectures. Full specification available at Lecture 8.'},
  }; // end LECTURE_2_DATA

  /* ──────────────────────────────────────────────────────────────
     Register with the application engine defined in index.html.
     ────────────────────────────────────────────────────────────── */
  if (typeof window.registerLecture === 'function') {
    window.registerLecture(2, LECTURE_2_DATA);
  } else {
    window.MBSE_COURSE_DATA = window.MBSE_COURSE_DATA || {};
    window.MBSE_COURSE_DATA[2] = LECTURE_2_DATA;
  }

})();

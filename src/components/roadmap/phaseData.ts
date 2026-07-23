export type PhaseStatus = "done" | "active" | "planned";

export type PhaseIcon =
  | "gear"
  | "fixture"
  | "cue"
  | "beam"
  | "database"
  | "faders"
  | "api"
  | "script"
  | "blackout"
  | "terminal"
  | "telemetry";

export type Phase = {
  n: number;
  title: string;
  body: string;
  status: PhaseStatus;
  icon: PhaseIcon;
  goal: string;
  dependsOn: string;
  requirements: string[];
  successCriteria: string[];
  plans: string;
};

export const PHASES: Phase[] = [
  {
    n: 1,
    title: "Offline Foundation and Delivery Traceability",
    body: "Centralized configuration and durable local identities, with Linear reconciliation that never blocks offline work.",
    status: "done",
    icon: "gear",
    goal: "Contributors can configure, validate, build, and trace GOLC from durable repository-owned sources without requiring Linear or secrets to be available.",
    dependsOn: "Nothing — first phase",
    requirements: ["CONF-01", "CONF-02", "CONF-03", "CONF-04", "LINR-01", "LINR-02", "LINR-03", "LINR-04"],
    successCriteria: [
      "A contributor can start at one documented root configuration and discover pinned toolchains plus setup, generation, validation, build, test, packaging, application-default, and runtime-configuration entrypoints.",
      "Contributors and CI can run the same commands, validate each configuration concern independently, and identify one authoritative value whenever settings are shared.",
      "A clean checkout contains no secrets or machine-local values, while safe examples document the external names needed when optional integrations are configured.",
      "Every milestone, phase, requirement, plan, and task can retain a durable local identity and complete planning context while Linear is unavailable.",
      "A contributor can preview an exact reconciliation and, when access is configured outside the repository, rerun it without duplicates; ambiguity, pagination, partial errors, and rate limits are reported without blocking local planning, builds, tests, or runtime operation.",
    ],
    plans: "32/32 plans complete",
  },
  {
    n: 2,
    title: "Modular Fixtures and Deployments",
    body: "Validate fixture definitions and safely adapt logical pools to concrete deployments through reviewable atomic changes.",
    status: "done",
    icon: "fixture",
    goal: "Show authors can build a trustworthy semantic fixture catalog and adapt logical fixture pools to concrete deployments through explicit, atomic impact review.",
    dependsOn: "Phase 1",
    requirements: ["FIXT-01", "FIXT-02", "FIXT-03", "FIXT-04", "FIXT-05", "FIXT-06", "POOL-01", "POOL-02", "POOL-03", "POOL-04", "POOL-05", "POOL-06", "POOL-07", "POOL-08"],
    successCriteria: [
      "A user can load, create, edit, validate, and share versioned YAML fixture definitions, with duplicate keys, ambiguous constructs, invalid ranges, and unsupported semantics rejected by actionable diagnostics.",
      "A user can import an OFL definition through the same canonical normalization path and inspect provenance, validation, lossiness, stable identity, revision, schema version, and content hash before use.",
      "A show author can define logical fixture pools independently of quantity and addresses, then map them to concrete modes, universes, addresses, and fixture instances in a deployment.",
      "Adding or removing pool fixtures produces a deterministic review of every affected group, theme, palette, scene, chase, motion preset, and controller mapping; review-before-apply remains the default even when propagation policy is configurable.",
      "A show author can map replacement fixtures by semantic capability, see every missing or incompatible capability, and accept, revise, or cancel an all-or-nothing change without silent approximation.",
    ],
    plans: "6/6 plans complete",
  },
  {
    n: 3,
    title: "Deterministic Show Programming and Playback",
    body: "Build tempo-aware shows whose compiled playback remains deterministic without any adapter owning musical or frame time.",
    status: "done",
    icon: "cue",
    goal: "As a show author, program complete tempo-aware looks and run them through a headless playback engine, so the show's output stays deterministic even when the UI, persistence, scripts, an API client, or an LLM provider is slow, unavailable, or restarted.",
    dependsOn: "Phase 2",
    requirements: ["PROG-01", "PROG-02", "PROG-03", "PROG-04", "PROG-05", "PROG-06", "PROG-07", "SCEN-01", "SCEN-02", "SCEN-03", "SCEN-04", "SCEN-05", "SCEN-06", "SCEN-07", "SCEN-08", "SCEN-09"],
    successCriteria: [
      "A show author can select pools, groups, deployment instances, or individual fixtures; set semantic intensity, color, position, beam, and supported fixture-specific attributes; and inspect touched values, sources, and record scope.",
      "A show author can create and reuse themes, attribute presets, tempo-relative chases, and semantic motion presets, then record, update, rename, reorder, duplicate, or delete them with undo and redo.",
      "A show author can assemble a scene as a configured bar loop with independently enabled base-look, color-theme, chase, and motion layers plus reusable blending presets.",
      "An operator can enter or tap global BPM, switch the one active scene or any layer immediately, and choose whether a BPM change preserves musical position or restarts the loop.",
      "A deterministic playback harness produces the same time-indexed results when UI rendering, persistence, scripts, API clients, or LLM providers are slow, unavailable, or restarted, and adopts only complete valid show plans at safe boundaries.",
    ],
    plans: "7/7 plans complete",
  },
  {
    n: 4,
    title: "Observable Art-Net Live Output",
    body: "Send and inspect correct Art-Net frames from the independent playback engine through simulated and physical receivers.",
    status: "done",
    icon: "beam",
    goal: "Operators can drive a small Art-Net rig from deterministic complete frames and verify protocol, target, and timing health independently of the desktop UI.",
    dependsOn: "Phase 3",
    requirements: ["ARTN-01", "ARTN-02", "ARTN-03", "ARTN-04", "ARTN-05", "ARTN-06"],
    successCriteria: [
      "An operator can select a Windows network interface, configure universes and static unicast targets, optionally discover compatible nodes, and see current interface and target status.",
      "Independent packet inspection confirms correct Art-Net 4 addressing, sequencing, payload length, refresh, and target behavior for every configured universe.",
      "Playback continues publishing the newest complete frames at its defined cadence while UI, persistence, scripts, API, or LLM work is stalled or overloaded, without those components backpressuring the engine or Art-Net worker.",
      "An operator can inspect per-universe final values, frame health, target health, errors, and output enablement, and a release candidate demonstrates compatibility with both an independent simulator and real Art-Net hardware.",
    ],
    plans: "9/9 plans complete",
  },
  {
    n: 5,
    title: "Durable Shows and Recovery",
    body: "Save, restore, migrate, recover, inspect, and export shows without storage work disturbing live output.",
    status: "done",
    icon: "database",
    goal: "Users can preserve and recover complete shows in a portable versioned format while storage remains outside the deterministic playback path.",
    dependsOn: "Phase 3",
    requirements: ["SHOW-01", "SHOW-02", "SHOW-03", "SHOW-04", "SHOW-05", "SHOW-06"],
    successCriteria: [
      "A user can save a complete show and deployment to one portable versioned .golc file, then open, save, or save-as without unexpectedly stopping deterministic output.",
      "Authoring changes are autosaved to clearly identified rotating recovery points, and an interrupted session can be restored without storage work entering the playback timing path.",
      "A schema migration creates and verifies a backup, commits atomically, and refuses unsupported newer formats without rewriting them.",
      "A user can run integrity diagnostics and export a versioned human-readable JSON representation for troubleshooting and interchange.",
    ],
    plans: "5/5 plans complete",
  },
  {
    n: 6,
    title: "Wails Authoring and Operator Surface",
    body: "Complete authoring and playback on screen or by keyboard, with constrained generic MIDI control and independent local safety actions.",
    status: "active",
    icon: "faders",
    goal: "Authors and playback operators can complete the conventional show workflow through a responsive Wails application, keyboard, and constrained generic MIDI controls without the frontend becoming runtime authority.",
    dependsOn: "Phases 2, 3, 4, and 5",
    requirements: ["PLAY-01", "PLAY-02", "PLAY-03", "PLAY-04", "PLAY-05", "PLAY-06", "PLAY-07", "PLAY-08", "PLAY-09"],
    successCriteria: [
      "A user can complete fixture, deployment, programming, scene, and playback workflows through on-screen controls, and a documented keyboard workflow exposes every playback action without requiring MIDI hardware.",
      "A show author can create a constrained operator surface containing only assigned scenes, layers, masters, and safety controls, while the operator can always see active scene, layers, BPM/bar position, controlling source, and final output state.",
      "A show author can learn generic MIDI Note and Control Change input for supported playback commands and verify fader soft takeover without unintended value jumps.",
      "An operator can control group masters, Grand Master, stop/release-all, and immediate blackout through local priority paths that do not wait for UI, script, API, or model work to complete.",
      "Revoke Automation immediately blocks scripts and AI, cancels their queued actions, freezes the current look, and returns manual control even when an automation runtime is hung or disconnected.",
    ],
    plans: "4/8 plans complete",
  },
  {
    n: 7,
    title: "Versioned External Control API",
    body: "External programs can safely inspect and control every public capability through the same typed command model as the desktop app.",
    status: "planned",
    icon: "api",
    goal: "External programs can inspect and control all public GOLC capabilities through a secure, documented, revision-aware API that behaves like the desktop application.",
    dependsOn: "Phase 6",
    requirements: ["API-01", "API-02", "API-03", "API-04", "API-05", "API-06"],
    successCriteria: [
      "An external program can query and invoke every supported public domain capability through /api/v1, and parity checks show the same commands have the same outcomes through Wails and HTTP.",
      "A client can generate against the published OpenAPI contract, follow working examples, handle typed errors, and understand the documented compatibility and deprecation policy.",
      "A client can consume revisioned server-sent events, detect a replay gap, and recover by querying authoritative state.",
      "Mutations support expected revisions, idempotency, dry-run impact previews, and atomic meaningful batches; every result is auditable, while loopback is the default and remote access requires explicit enablement and scoped authentication.",
    ],
    plans: "Not yet planned",
  },
  {
    n: 8,
    title: "Isolated TypeScript Automation",
    body: "Author and debug capability-limited TypeScript automation without scripts owning or blocking playback or Art-Net.",
    status: "planned",
    icon: "script",
    goal: "Users can create and debug typed TypeScript automation in a supervised, capability-limited process that cannot own or delay deterministic output.",
    dependsOn: "Phase 7",
    requirements: ["SCRP-01", "SCRP-02", "SCRP-03", "SCRP-04", "SCRP-05", "SCRP-06"],
    successCriteria: [
      "A user can create, edit, validate, run, stop, and debug a TypeScript script from the application.",
      "Scripts use a generated typed GOLC SDK for commands, queries, and events, and have no route to raw DMX or frame evaluation.",
      "Before execution, a user can inspect and assign script capabilities, deadlines, rate limits, and resource limits; the runtime has no ambient filesystem, network, environment, subprocess, native-code, or uncached dependency access.",
      "A user can inspect structured logs, diagnostics, source locations, command outcomes, and cancellation state, and can terminate a runaway, crashed, or blocked script without interrupting playback or Art-Net.",
    ],
    plans: "Not yet planned",
  },
  {
    n: 9,
    title: "Provider-Neutral AI and Bounded Autonomy",
    body: "Use hosted or local models for reviewed authoring and explicitly armed live control while retaining auditable limits and immediate override.",
    status: "planned",
    icon: "blackout",
    goal: "Users can employ hosted or local LLMs for evidence-backed authoring and explicitly bounded live control while deterministic execution and immediate operator authority remain local.",
    dependsOn: "Phases 2, 6, 7, and 8",
    requirements: ["LLM-01", "LLM-02", "LLM-03", "LLM-04", "LLM-05", "LLM-06", "LLM-07", "LLM-08", "LLM-09"],
    successCriteria: [
      "A user can configure common hosted providers or a local OpenAI-compatible model through a provider-neutral adapter, with credentials excluded from show files, logs, fixture exports, and committed configuration.",
      "An LLM can produce an evidence-backed fixture draft and submit it through exactly the same validation, impact review, and commit pipeline as a human-authored fixture.",
      "An LLM can inspect a revisioned show snapshot and use typed tools to propose or modify pools, deployments, themes, presets, chases, scenes, blends, and playback mappings without inventing or bypassing domain identities.",
      "Live autonomy operates only under an explicitly armed, visible, time-bounded lease and rejects stale state or actions outside capability, risk, rate, time, and batch limits before execution.",
      "An operator can inspect proposed and executed commands, outcomes, errors, and redacted audit history, then revoke automation even during an in-flight or unreachable provider call; model inference never owns musical time, frame evaluation, raw DMX, or output cadence.",
    ],
    plans: "Not yet planned",
  },
  {
    n: 10,
    title: "Windows Release Qualification",
    body: "Install and run a self-contained Windows release with measured timing, recovery, and hardware evidence under concurrent load.",
    status: "planned",
    icon: "terminal",
    goal: "Operators can install and run a self-contained GOLC v1 on declared Windows systems with measured evidence that full-load operation, recovery, and real Art-Net output meet release budgets.",
    dependsOn: "Phases 1 through 9",
    requirements: ["WIN-01", "WIN-02", "WIN-03", "WIN-04"],
    successCriteria: [
      "A user can install and launch GOLC on every declared supported Windows version and architecture without a development toolchain.",
      "The packaged application includes and supervises every required runtime component, including the TypeScript helper, and reports missing or failed dependencies clearly.",
    ],
    plans: "Not yet planned",
  },
  {
    n: 11,
    title: "Telemetry, Usage Statistics, and Auto Crash Submission Pipeline",
    body: "Opt-in anonymized usage/telemetry collection, with crashes automatically captured and submitted for diagnosis without blocking playback.",
    status: "planned",
    icon: "telemetry",
    goal: "Users can opt into anonymized usage/telemetry collection and crashes are automatically captured and submitted for diagnosis without blocking playback or requiring manual repro steps.",
    dependsOn: "Phase 10",
    requirements: [],
    successCriteria: [],
    plans: "Not yet planned",
  },
];

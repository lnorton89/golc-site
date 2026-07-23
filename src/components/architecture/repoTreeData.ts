export type TreeNode = {
  name: string;
  doc?: string;
  children?: TreeNode[];
};

export const REPO_TREE: TreeNode[] = [
  {
    name: "cmd/",
    doc: "The one binary. Self-registers command routes and applies the stable 0/1/2 exit-code mapping — no route wiring lives here.",
    children: [{ name: "golc-project/", doc: "The pinned project CLI that golc.ps1 delegates every verb to." }],
  },
  {
    name: "internal/",
    doc: "Every domain and infrastructure package — fixtures, pools, scenes, playback, Art-Net, show state, and the command hub that ties them together.",
    children: [
      { name: "command/", doc: "The hub. Every command file self-registers a typed route — no central switch." },
      {
        name: "artnet/",
        doc: "Art-Net daemon, worker, and CLI over named-pipe IPC — deterministic frame output.",
        children: [{ name: "ipc/", doc: "Named-pipe IPC transport connecting the daemon, worker, and CLI." }],
      },
      { name: "bootstrap/", doc: "Checksum-pinned toolchain install with atomic promotion. Invoked from golc.ps1." },
      { name: "contracts/", doc: "Generated JSON Schema projections for config, fixture, and Linear contracts." },
      { name: "delivery/", doc: "Deterministic foundation/graph bundling for planning artifacts." },
      { name: "deployment/", doc: "Pure domain model for concrete deployments, identified by UUIDv7." },
      {
        name: "fixture/",
        doc: "Strict schema-validated YAML 1.2 fixture definitions with deterministic normalization.",
        children: [{ name: "ofl/", doc: "Open Fixture Library import, with an SSRF guard on fetched definitions." }],
      },
      { name: "playback/", doc: "Real-time deterministic playback engine — an atomic.Pointer state." },
      { name: "pool/", doc: "Fixture pools and the reviewable impact-plan machinery." },
      { name: "programming/", doc: "Attribute programmer — theme, chase, preset, and motion." },
      { name: "projectconfig/", doc: "Pure configuration library. Never imports command, to avoid a cycle." },
      { name: "scene/", doc: "Scene/Layer domain — tempo-aware looks." },
      { name: "security/", doc: "Central redaction and canary-scan (Redact, SafeDiagnostic)." },
      { name: "show/", doc: "ShowState substrate — SQLite-backed store, backup, migrate, recovery. Current phase." },
      { name: "strictjson/", doc: "Duplicate-safe strict JSON guard — no repeated member names, exactly one value." },
      { name: "substitution/", doc: "Fixture substitution, reusing pool's impact-plan machinery against a live show." },
      {
        name: "trace/",
        doc: "Linear delivery traceability — durable local identities, reconciled without blocking.",
        children: [
          { name: "catalog/", doc: "Base identity catalog — durable local IDs." },
          { name: "reconcile/", doc: "Reconciles local identities against Linear." },
          { name: "apply/", doc: "Applies reconciled changes back to the catalog, atomically." },
          { name: "transport/", doc: "Credential-external transport — never blocks, never sees secrets directly." },
        ],
      },
    ],
  },
  {
    name: "config/",
    doc: "Committed TOML concern files — toolchain, commands, generation, application-defaults, runtime, Linear — each the sole owner of its values.",
    children: [
      { name: "integrations/", doc: "Third-party integration configs (Linear), kept separate from core concerns." },
    ],
  },
  {
    name: "schemas/",
    doc: "Generated JSON Schemas mirroring the config concerns plus fixture and Linear contracts.",
  },
  {
    name: "tests/",
    doc: "acceptance/*.ps1 end-to-end checks plus fixtures/ and golden/ — data only, no logic.",
    children: [
      { name: "acceptance/", doc: "PowerShell end-to-end checks run against the real CLI (bootstrap, command-parity, offline, walking-skeleton, and more)." },
      {
        name: "fixtures/",
        doc: "Data-only fixtures, no logic.",
        children: [{ name: "config/" }, { name: "linear/" }, { name: "ofl/" }],
      },
      { name: "golden/", doc: "Golden-file comparisons for deterministic output." },
    ],
  },
  {
    name: "tools/",
    doc: "tools/linear-sync — an isolated Node workspace for Linear reconciliation, kept out of the Go module entirely.",
    children: [{ name: "linear-sync/", doc: "The Linear reconciliation service itself (TypeScript, own package.json)." }],
  },
  {
    name: "docs/",
    doc: "Contributor walkthrough plus artnet/ and brand/ reference assets.",
    children: [
      { name: "artnet/", doc: "Art-Net output verification runbook." },
      { name: "brand/", doc: "README banner assets (light/dark SVG cards)." },
    ],
  },
  {
    name: ".planning/",
    doc: "GSD planning artifacts — the project's own roadmap and phase history.",
    children: [
      { name: "phases/", doc: "Per-phase research, plans, and verification records." },
      { name: "brand/", doc: "The brand guidelines this site is built from." },
      { name: "artnet/", doc: "Art-Net verification evidence — packet captures and reports." },
      { name: "midi/", doc: "Reference manuals for the Phase 6 MIDI controller acceptance set." },
      { name: "research/", doc: "Project research notes — architecture, features, pitfalls, stack." },
      { name: "max-plan-research/", doc: "Planning research artifacts." },
      { name: "quick/", doc: "Quick, one-off task records outside the phase workflow." },
    ],
  },
];

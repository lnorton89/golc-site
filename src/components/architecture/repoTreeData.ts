export type TreeNode = {
  name: string;
  doc?: string;
  children?: TreeNode[];
};

export const REPO_TREE: TreeNode[] = [
  {
    name: "cmd/",
    doc: "The one binary. Self-registers command routes and applies the stable 0/1/2 exit-code mapping — no route wiring lives here.",
    children: [{ name: "golc-project/" }],
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
    doc: "Committed TOML concern files, each the sole owner of its values.",
    children: [
      { name: "toolchain.toml", doc: "Pinned tool versions and checksums." },
      { name: "commands.toml", doc: "Command definitions — references toolchain via ref: keys." },
      { name: "generation.toml", doc: "Schema/codegen settings." },
      { name: "application-defaults.toml", doc: "Default application configuration." },
      { name: "runtime.toml", doc: "Runtime and logging settings." },
      {
        name: "integrations/",
        children: [{ name: "linear.toml", doc: "Linear integration configuration." }],
      },
    ],
  },
  {
    name: "schemas/",
    doc: "Generated JSON Schemas mirroring the config concerns plus fixture and Linear contracts.",
    children: [
      { name: "golc-project.schema.json" },
      { name: "config-toolchain.schema.json" },
      { name: "config-commands.schema.json" },
      { name: "config-generation.schema.json" },
      { name: "config-application-defaults.schema.json" },
      { name: "config-runtime.schema.json" },
      { name: "config-linear.schema.json" },
      { name: "fixture.schema.json" },
      { name: "linear-map.schema.json" },
      { name: "linear-plan.schema.json" },
      { name: "linear-report.schema.json" },
    ],
  },
  {
    name: "tests/",
    doc: "acceptance/*.ps1 end-to-end checks plus fixtures/ and golden/ — data only, no logic.",
    children: [
      {
        name: "acceptance/",
        doc: "PowerShell end-to-end checks run against the real CLI.",
        children: [
          { name: "bootstrap.ps1" },
          { name: "bootstrap-node.ps1" },
          { name: "command-parity.ps1" },
          { name: "linear-transport.ps1" },
          { name: "offline.ps1" },
          { name: "walking-skeleton.ps1" },
        ],
      },
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
    children: [{ name: "linear-sync/" }],
  },
  {
    name: "docs/",
    doc: "Contributor walkthrough plus artnet/ and brand/ reference assets.",
    children: [
      { name: "development.md", doc: "Full contributor walkthrough." },
      {
        name: "artnet/",
        children: [{ name: "ARTN-06-verification-runbook.md", doc: "Art-Net output verification runbook." }],
      },
      {
        name: "brand/",
        doc: "README banner assets.",
        children: [{ name: "golc-card-light.svg" }, { name: "golc-card-dark.svg" }],
      },
    ],
  },
  {
    name: ".planning/",
    doc: "GSD planning artifacts — the project's own roadmap and phase history.",
    children: [
      { name: "PROJECT.md", doc: "Project charter and context." },
      { name: "ROADMAP.md", doc: "Ten dependency-ordered phases and their status." },
      { name: "REQUIREMENTS.md", doc: "Full requirement set the roadmap traces back to." },
      { name: "STATE.md", doc: "Current execution state — which phase, what's next." },
      { name: "phases/", doc: "Per-phase research, plans, and verification records." },
      { name: "brand/", doc: "The brand guidelines this site is built from." },
      { name: "quick/" },
      { name: "research/" },
    ],
  },
];

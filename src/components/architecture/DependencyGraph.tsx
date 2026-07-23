"use client";

import { useMemo, useState } from "react";
import {
  GearIcon,
  TimelineIcon,
  FixtureIcon,
  CueIcon,
  BeamIcon,
  ApiIcon,
} from "@/components/icons";

type Phase = 1 | 2 | 3 | 4 | 5;
type Domain = "foundation" | "traceability" | "fixtures" | "authoring" | "playback" | "hub";

type NodeDef = {
  id: string;
  label: string;
  layer: number; // 0 = foundation (no internal deps), higher = further from foundation
  domain: Domain;
  phase: Phase;
  doc: string;
  deps: string[]; // direct internal-package imports
};

const DOMAIN_COLOR: Record<Domain, string> = {
  foundation: "var(--spectrum-1)",
  traceability: "var(--spectrum-2)",
  fixtures: "var(--spectrum-3)",
  authoring: "var(--spectrum-4)",
  playback: "var(--spectrum-5)",
  hub: "var(--spectrum-6)",
};

const DOMAIN_LABEL: Record<Domain, string> = {
  foundation: "Foundation",
  traceability: "Traceability",
  fixtures: "Fixtures & pools",
  authoring: "Show authoring",
  playback: "Playback & output",
  hub: "Command hub",
};

const DOMAIN_DESC: Record<Domain, string> = {
  foundation: "Core infra with no lighting-domain logic — JSON/config guards, redaction, bootstrap.",
  traceability: "Durable local identities reconciled against Linear without blocking.",
  fixtures: "Fixture definitions, pools, deployments, and substitution.",
  authoring: "Attribute programming, scenes, and show state.",
  playback: "The real-time engine and Art-Net frame output.",
  hub: "Every command file self-registers here — the one model every surface routes through.",
};

const DOMAIN_ICON: Record<Domain, (props: { size?: number }) => React.ReactElement> = {
  foundation: GearIcon,
  traceability: TimelineIcon,
  fixtures: FixtureIcon,
  authoring: CueIcon,
  playback: BeamIcon,
  hub: ApiIcon,
};

const PHASE_LABEL: Record<Phase, string> = {
  1: "Phase 1 · Offline Foundation & Traceability",
  2: "Phase 2 · Modular Fixtures & Deployments",
  3: "Phase 3 · Deterministic Playback",
  4: "Phase 4 · Art-Net Output",
  5: "Phase 5 · Durable Shows and Recovery",
};

const NODES: NodeDef[] = [
  // Layer 0 — foundation, zero internal dependencies
  { id: "strictjson", label: "strictjson", layer: 0, domain: "foundation", phase: 1, doc: "Duplicate-safe strict JSON guard — a document is accepted only if it is exactly one JSON value and no object anywhere in it repeats a member name.", deps: [] },
  { id: "projectconfig", label: "projectconfig", layer: 0, domain: "foundation", phase: 1, doc: "Pure configuration library backing golc.project.toml's layered resolution. Deliberately never imports the command package, to avoid a cycle.", deps: [] },
  { id: "security", label: "security", layer: 0, domain: "foundation", phase: 1, doc: "Central redaction and canary-scan (Redact, SafeDiagnostic) used anywhere output might leak a secret.", deps: [] },
  { id: "delivery", label: "delivery", layer: 0, domain: "foundation", phase: 1, doc: "Deterministic foundation/graph bundling for planning artifacts. Never imports internal/command.", deps: [] },
  { id: "bootstrap", label: "bootstrap", layer: 0, domain: "foundation", phase: 1, doc: "Checksum-pinned toolchain install with atomic promotion. Invoked from golc.ps1, not from command.", deps: [] },
  { id: "trace-catalog", label: "trace/catalog", layer: 0, domain: "traceability", phase: 1, doc: "Base identity catalog for Linear traceability — durable local IDs that never depend on remote state.", deps: [] },
  { id: "deployment", label: "deployment", layer: 0, domain: "fixtures", phase: 2, doc: "Pure domain model for concrete deployments, identified by UUIDv7 — no dependency on fixture or pool logic.", deps: [] },

  // Layer 1
  { id: "fixture", label: "fixture", layer: 1, domain: "fixtures", phase: 2, doc: "Fixture domain: strict schema-validated YAML 1.2 subset with deterministic normalization.", deps: ["strictjson"] },
  { id: "trace-transport", label: "trace/transport", layer: 1, domain: "traceability", phase: 1, doc: "Credential-external transport for Linear — reconciliation never blocks on it, and it never sees secrets directly.", deps: ["security"] },
  { id: "artnet-ipc", label: "artnet/ipc", layer: 1, domain: "playback", phase: 4, doc: "Named-pipe IPC transport connecting the Art-Net daemon, worker, and CLI.", deps: [] },

  // Layer 2
  { id: "fixture-ofl", label: "fixture/ofl", layer: 2, domain: "fixtures", phase: 2, doc: "Open Fixture Library import, with an SSRF guard on any fetched definition.", deps: ["fixture"] },
  { id: "contracts", label: "contracts", layer: 2, domain: "fixtures", phase: 2, doc: "Generated JSON Schema projections for config, fixture, and Linear contracts.", deps: ["fixture"] },
  { id: "trace-reconcile", label: "trace/reconcile", layer: 2, domain: "traceability", phase: 1, doc: "Reconciles local trace identities against Linear without ever treating a pending remote ID as evidence of sync.", deps: ["trace-catalog", "trace-transport"] },

  // Layer 3
  { id: "trace-apply", label: "trace/apply", layer: 3, domain: "traceability", phase: 1, doc: "Applies reconciled trace changes back to the local catalog, atomically.", deps: ["trace-catalog", "trace-reconcile", "trace-transport"] },

  // Layer 4
  { id: "pool", label: "pool", layer: 4, domain: "fixtures", phase: 2, doc: "Fixture pools and the reviewable impact-plan machinery for resizing or substituting fixtures.", deps: ["deployment", "fixture", "strictjson", "trace-apply", "trace-reconcile"] },

  // Layer 5
  { id: "programming", label: "programming", layer: 5, domain: "authoring", phase: 3, doc: "Attribute programmer — theme, chase, preset, and motion authoring over a fixture pool.", deps: ["deployment", "fixture", "pool"] },

  // Layer 6
  { id: "scene", label: "scene", layer: 6, domain: "authoring", phase: 3, doc: "Scene/Layer domain — tempo-aware looks that mirror pool's identity pattern.", deps: ["fixture", "programming"] },

  // Layer 7
  { id: "show", label: "show", layer: 7, domain: "authoring", phase: 5, doc: "ShowState substrate — SQLite-backed with store, backup, migrate, and recovery.", deps: ["deployment", "pool", "programming", "scene", "strictjson"] },

  // Layer 8
  { id: "substitution", label: "substitution", layer: 8, domain: "fixtures", phase: 2, doc: "Fixture substitution, reusing pool's impact-plan machinery against a live show.", deps: ["fixture", "pool", "show"] },
  { id: "playback", label: "playback", layer: 8, domain: "playback", phase: 3, doc: "Real-time deterministic playback engine — an atomic.Pointer state isolated from UI, storage, and scripts.", deps: ["fixture", "programming", "scene", "show"] },

  // Layer 9
  { id: "artnet", label: "artnet", layer: 9, domain: "playback", phase: 4, doc: "Art-Net daemon, worker, and CLI over the named-pipe IPC — deterministic frame output, live per the roadmap.", deps: ["artnet-ipc", "deployment", "fixture", "playback", "show", "strictjson"] },

  // Layer 10 — the hub
  { id: "command", label: "command", layer: 10, domain: "hub", phase: 1, doc: "The command hub. Every command file self-registers a typed route in package-level initializers — no central switch. This is the one command model every surface (UI, API, scripts, AI) will route through.", deps: ["artnet", "artnet-ipc", "contracts", "delivery", "deployment", "fixture", "fixture-ofl", "playback", "pool", "programming", "projectconfig", "scene", "security", "show", "strictjson", "substitution", "trace-apply", "trace-catalog", "trace-reconcile", "trace-transport"] },
];

const NODES_BY_ID = Object.fromEntries(NODES.map((n) => [n.id, n]));
const MAX_LAYER = Math.max(...NODES.map((n) => n.layer));
const TOTAL_EDGES = NODES.reduce((sum, n) => sum + n.deps.length, 0);
const DOMAIN_COUNTS = NODES.reduce<Record<Domain, number>>((acc, n) => {
  acc[n.domain] = (acc[n.domain] ?? 0) + 1;
  return acc;
}, {} as Record<Domain, number>);

const WIDTH = 900;
const LAYER_HEIGHT = 62;
const SIDE_MARGIN = 60;
const TOP_MARGIN = 34;
const HEIGHT = TOP_MARGIN * 2 + MAX_LAYER * LAYER_HEIGHT;

// Sugiyama-style barycenter ordering: a couple of alternating up/down passes
// so edges read as a clean flow instead of a tangle of straight crossings.
function layout() {
  const order: Record<number, string[]> = {};
  for (const n of NODES) (order[n.layer] ??= []).push(n.id);

  const childrenOf: Record<string, string[]> = {};
  const parentsOf: Record<string, string[]> = {};
  for (const n of NODES) {
    childrenOf[n.id] = n.deps;
    for (const d of n.deps) (parentsOf[d] ??= []).push(n.id);
  }

  function indexMap() {
    const idx: Record<string, number> = {};
    for (const ids of Object.values(order)) ids.forEach((id, i) => (idx[id] = i));
    return idx;
  }

  function pass(neighborsOf: Record<string, string[]>) {
    for (let layer = 0; layer <= MAX_LAYER; layer++) {
      const ids = order[layer];
      if (!ids || ids.length < 2) continue;
      const idx = indexMap();
      const scored = ids.map((id) => {
        const neighbors = neighborsOf[id] ?? [];
        if (neighbors.length === 0) return { id, score: idx[id] };
        const avg = neighbors.reduce((s, nb) => s + (idx[nb] ?? 0), 0) / neighbors.length;
        return { id, score: avg };
      });
      scored.sort((a, b) => a.score - b.score);
      order[layer] = scored.map((s) => s.id);
    }
  }

  for (let i = 0; i < 4; i++) {
    pass(childrenOf);
    pass(parentsOf);
  }

  const pos: Record<string, { x: number; y: number }> = {};
  const usableWidth = WIDTH - SIDE_MARGIN * 2;
  for (const [layerStr, ids] of Object.entries(order)) {
    const layer = Number(layerStr);
    const y = TOP_MARGIN + (MAX_LAYER - layer) * LAYER_HEIGHT;
    const spacing = usableWidth / (ids.length + 1);
    ids.forEach((id, i) => {
      pos[id] = { x: SIDE_MARGIN + spacing * (i + 1), y };
    });
  }
  return pos;
}

function edgePath(a: { x: number; y: number }, b: { x: number; y: number }) {
  const ymid = (a.y + b.y) / 2;
  return `M ${a.x},${a.y} C ${a.x},${ymid} ${b.x},${ymid} ${b.x},${b.y}`;
}

function transitiveDeps(id: string): Set<string> {
  const seen = new Set<string>();
  const stack = [...NODES_BY_ID[id].deps];
  while (stack.length) {
    const cur = stack.pop()!;
    if (seen.has(cur)) continue;
    seen.add(cur);
    stack.push(...NODES_BY_ID[cur].deps);
  }
  return seen;
}

function transitiveDependents(id: string): Set<string> {
  const seen = new Set<string>();
  let frontier = [id];
  while (frontier.length) {
    const next: string[] = [];
    for (const n of NODES) {
      if (!seen.has(n.id) && n.deps.some((d) => frontier.includes(d))) {
        seen.add(n.id);
        next.push(n.id);
      }
    }
    frontier = next;
  }
  return seen;
}

export default function DependencyGraph() {
  const pos = useMemo(layout, []);
  const [selected, setSelected] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [hoveredDomain, setHoveredDomain] = useState<Domain | null>(null);

  const deps = selected ? transitiveDeps(selected) : null;
  const dependents = selected ? transitiveDependents(selected) : null;

  function nodeState(id: string): "selected" | "dep" | "dependent" | "dim" | "domain" | "normal" {
    if (selected) {
      if (id === selected) return "selected";
      if (deps?.has(id)) return "dep";
      if (dependents?.has(id)) return "dependent";
      return "dim";
    }
    if (hoveredDomain) {
      return NODES_BY_ID[id].domain === hoveredDomain ? "domain" : "dim";
    }
    return "normal";
  }

  const selectedNode = selected ? NODES_BY_ID[selected] : null;
  const directDependents = selectedNode
    ? NODES.filter((n) => n.deps.includes(selectedNode.id))
    : [];

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-x-6 gap-y-1 font-mono text-[11px] text-muted">
        <span>{NODES.length} packages</span>
        <span>{TOTAL_EDGES} dependency edges</span>
        <span>{MAX_LAYER + 1} layers deep</span>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <div className="rounded-xl border border-line bg-panel p-4">
          <svg
            viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
            className="block h-auto w-full"
            role="img"
            aria-label="Interactive package dependency graph"
          >
            {/* edges */}
            {NODES.map((n) =>
              n.deps.map((depId) => {
                const a = pos[n.id];
                const b = pos[depId];
                const active =
                  selected &&
                  (n.id === selected || deps?.has(n.id)) &&
                  (depId === selected || deps?.has(depId));
                const dim = selected && !active;
                return (
                  <path
                    key={`${n.id}-${depId}`}
                    d={edgePath(a, b)}
                    fill="none"
                    stroke={active ? "var(--accent)" : "var(--line)"}
                    strokeWidth={active ? 1.8 : 1.1}
                    opacity={dim ? 0.12 : active ? 0.85 : 0.5}
                  />
                );
              })
            )}

            {/* nodes */}
            {NODES.map((n) => {
              const { x, y } = pos[n.id];
              const state = nodeState(n.id);
              const isHovered = hovered === n.id && state !== "selected";
              const base = n.id === "command" ? 15 : 10;
              const r = isHovered ? base + 2 : base;
              return (
                <g
                  key={n.id}
                  onClick={() => setSelected(selected === n.id ? null : n.id)}
                  onMouseEnter={() => setHovered(n.id)}
                  onMouseLeave={() => setHovered((h) => (h === n.id ? null : h))}
                  style={{ cursor: "pointer" }}
                >
                  <circle
                    cx={x}
                    cy={y}
                    r={r}
                    fill={DOMAIN_COLOR[n.domain]}
                    opacity={state === "dim" ? 0.28 : 1}
                    stroke={
                      state === "selected"
                        ? "var(--ink)"
                        : isHovered || state === "domain"
                          ? "var(--accent)"
                          : "var(--panel)"
                    }
                    strokeWidth={
                      state === "selected" ? 3 : isHovered || state === "domain" ? 2.5 : 1.5
                    }
                  />
                  <text
                    x={x}
                    y={y + base + 15}
                    textAnchor="middle"
                    fontFamily="var(--font-mono)"
                    fontSize="10.5"
                    stroke="var(--panel)"
                    strokeWidth={3}
                    paintOrder="stroke"
                    fill={state === "dim" ? "var(--muted)" : "var(--ink)"}
                    opacity={state === "dim" ? 0.45 : 1}
                  >
                    {n.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        <div className="rounded-xl border border-line bg-panel p-6">
          {!selectedNode ? (
            <>
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                Domains
              </p>
              <p className="mt-3 text-sm leading-6 text-text2">
                Click any package to see what it depends on, what depends on
                it, and which phase introduced it. <strong className="text-ink">command</strong> sits
                at the top — every other package eventually feeds into it.
              </p>
              <div className="mt-6 space-y-3">
                {(Object.keys(DOMAIN_LABEL) as Domain[]).map((d) => {
                  const Icon = DOMAIN_ICON[d];
                  const isHoveredDomain = hoveredDomain === d;
                  return (
                    <div
                      key={d}
                      onMouseEnter={() => setHoveredDomain(d)}
                      onMouseLeave={() => setHoveredDomain((h) => (h === d ? null : h))}
                      className={`flex cursor-default items-start gap-2.5 rounded-lg p-1.5 transition-colors duration-[120ms] ease-out ${
                        isHoveredDomain ? "bg-page" : ""
                      }`}
                    >
                      <span
                        className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md"
                        style={{
                          background: `color-mix(in srgb, ${DOMAIN_COLOR[d]} 16%, transparent)`,
                          color: DOMAIN_COLOR[d],
                        }}
                      >
                        <Icon size={13} />
                      </span>
                      <span>
                        <span className="block text-sm font-medium text-ink">
                          {DOMAIN_LABEL[d]}{" "}
                          <span className="font-mono text-[10px] font-normal text-muted">
                            × {DOMAIN_COUNTS[d]}
                          </span>
                        </span>
                        <span className="block text-xs leading-5 text-text2">
                          {DOMAIN_DESC[d]}
                        </span>
                      </span>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <p className="font-mono text-sm font-semibold text-ink">
                  internal/{selectedNode.label}
                </p>
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="font-mono text-[10px] uppercase tracking-wider text-muted transition-colors duration-[120ms] ease-out hover:text-accent"
                >
                  Clear
                </button>
              </div>

              <div className="mt-3 flex items-center gap-2.5">
                {(() => {
                  const Icon = DOMAIN_ICON[selectedNode.domain];
                  return (
                    <span
                      className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md"
                      style={{
                        background: `color-mix(in srgb, ${DOMAIN_COLOR[selectedNode.domain]} 16%, transparent)`,
                        color: DOMAIN_COLOR[selectedNode.domain],
                      }}
                    >
                      <Icon size={14} />
                    </span>
                  );
                })()}
                <span className="text-sm font-medium text-ink">
                  {DOMAIN_LABEL[selectedNode.domain]}
                </span>
              </div>

              <p className="mt-3 font-mono text-[10px] uppercase tracking-wider text-muted">
                {PHASE_LABEL[selectedNode.phase]}
              </p>

              <p className="mt-4 text-sm leading-6 text-text2">
                {selectedNode.doc}
              </p>

              <div className="mt-4 flex gap-4 font-mono text-[10px] text-muted">
                <span>{selectedNode.deps.length} direct deps</span>
                <span>{directDependents.length} direct dependents</span>
                <span>{(deps?.size ?? 0)} transitive deps</span>
              </div>

              <p className="mt-5 font-mono text-[10px] uppercase tracking-wider text-muted">
                Depends on {selectedNode.deps.length === 0 && "— nothing internal"}
              </p>
              {selectedNode.deps.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {selectedNode.deps.map((d) => (
                    <button
                      key={d}
                      onClick={() => setSelected(d)}
                      className="rounded-full border border-line bg-page px-2.5 py-1 font-mono text-[10px] text-text2 transition-colors duration-[120ms] ease-out hover:border-accent hover:text-accent"
                    >
                      {NODES_BY_ID[d].label}
                    </button>
                  ))}
                </div>
              )}

              <p className="mt-5 font-mono text-[10px] uppercase tracking-wider text-muted">
                Depended on by {directDependents.length === 0 && "— nothing yet"}
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {directDependents.map((n) => (
                  <button
                    key={n.id}
                    onClick={() => setSelected(n.id)}
                    className="rounded-full border border-line bg-page px-2.5 py-1 font-mono text-[10px] text-text2 transition-colors duration-[120ms] ease-out hover:border-accent hover:text-accent"
                  >
                    {n.label}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

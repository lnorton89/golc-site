import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Roadmap",
  description: "GOLC v1 ships through ten dependency-ordered phases.",
};

const PHASES = [
  {
    n: 1,
    title: "Offline Foundation and Delivery Traceability",
    body: "Centralized configuration and durable local identities, with Linear reconciliation that never blocks offline work.",
    status: "done",
  },
  {
    n: 2,
    title: "Modular Fixtures and Deployments",
    body: "Validate fixture definitions and safely adapt logical pools to concrete deployments through reviewable atomic changes.",
    status: "done",
  },
  {
    n: 3,
    title: "Deterministic Show Programming and Playback",
    body: "Build tempo-aware shows whose compiled playback remains deterministic without any adapter owning musical or frame time.",
    status: "done",
  },
  {
    n: 4,
    title: "Observable Art-Net Live Output",
    body: "Send and inspect correct Art-Net frames from the independent playback engine through simulated and physical receivers.",
    status: "done",
  },
  {
    n: 5,
    title: "Durable Shows and Recovery",
    body: "Save, restore, migrate, recover, inspect, and export shows without storage work disturbing live output.",
    status: "active",
  },
  {
    n: 6,
    title: "Wails Authoring and Operator Surface",
    body: "Complete authoring and playback on screen or by keyboard, with constrained generic MIDI control and independent local safety actions.",
    status: "planned",
  },
  {
    n: 7,
    title: "Versioned External Control API",
    body: "External programs can safely inspect and control every public capability through the same typed command model as the desktop app.",
    status: "planned",
  },
  {
    n: 8,
    title: "Isolated TypeScript Automation",
    body: "Author and debug capability-limited TypeScript automation without scripts owning or blocking playback or Art-Net.",
    status: "planned",
  },
  {
    n: 9,
    title: "Provider-Neutral AI and Bounded Autonomy",
    body: "Use hosted or local models for reviewed authoring and explicitly armed live control while retaining auditable limits and immediate override.",
    status: "planned",
  },
  {
    n: 10,
    title: "Windows Release Qualification",
    body: "Install and run a self-contained Windows release with measured timing, recovery, and hardware evidence under concurrent load.",
    status: "planned",
  },
];

const STATUS_LABEL: Record<string, string> = {
  done: "Shipped",
  active: "In progress",
  planned: "Planned",
};

const STATUS_COLOR: Record<string, string> = {
  done: "var(--status-frame-lock)",
  active: "var(--status-armed)",
  planned: "var(--status-offline)",
};

export default function RoadmapPage() {
  return (
    <div className="mx-auto max-w-[1160px] px-6 py-16 sm:px-12 sm:py-24">
      <span className="block font-mono text-[13px] tracking-[1.3px] text-accent">
        Ten dependency-ordered phases
      </span>
      <h1 className="mt-1 text-[44px] font-extrabold leading-tight tracking-[-0.03em] text-ink sm:text-[52px]">
        Roadmap
      </h1>
      <p className="mt-4 max-w-xl text-text2">
        GOLC v1 grows through ten dependency-ordered MVP slices. Each phase
        proves a working, reviewable capability before the next depends on
        it — the deterministic playback and Art-Net timing path stays
        independent of UI, storage, scripts, API, and LLM providers
        throughout.
      </p>

      <ol className="mt-10 max-w-3xl space-y-4">
        {PHASES.map((p) => (
          <li
            key={p.n}
            className="flex gap-4 rounded-xl border border-line p-5"
          >
            <span className="font-mono text-sm text-muted">
              {String(p.n).padStart(2, "0")}
            </span>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="font-semibold text-ink">{p.title}</h2>
                <span
                  className="inline-flex items-center gap-1.5 rounded-full border border-line px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-text2"
                >
                  <span
                    className="inline-block h-1.5 w-1.5 rounded-full"
                    style={{ background: STATUS_COLOR[p.status] }}
                    aria-hidden
                  />
                  {STATUS_LABEL[p.status]}
                </span>
              </div>
              <p className="mt-1.5 text-sm leading-6 text-text2">{p.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

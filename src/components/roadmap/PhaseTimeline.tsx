"use client";

import { useState } from "react";
import {
  GearIcon,
  FixtureIcon,
  CueIcon,
  BeamIcon,
  DatabaseIcon,
  FadersIcon,
  ApiIcon,
  ScriptIcon,
  BlackoutIcon,
  TerminalIcon,
  TimelineIcon,
} from "@/components/icons";
import type { Phase, PhaseIcon, PhaseStatus } from "./phaseData";

const STATUS_LABEL: Record<PhaseStatus, string> = {
  done: "Shipped",
  active: "In progress",
  planned: "Planned",
};

const STATUS_COLOR: Record<PhaseStatus, string> = {
  done: "var(--status-frame-lock)",
  active: "var(--status-armed)",
  planned: "var(--status-offline)",
};

const PHASE_ICON: Record<PhaseIcon, (props: { size?: number }) => React.ReactElement> = {
  gear: GearIcon,
  fixture: FixtureIcon,
  cue: CueIcon,
  beam: BeamIcon,
  database: DatabaseIcon,
  faders: FadersIcon,
  api: ApiIcon,
  script: ScriptIcon,
  blackout: BlackoutIcon,
  terminal: TerminalIcon,
  telemetry: TimelineIcon,
};

export default function PhaseTimeline({ phases }: { phases: Phase[] }) {
  const defaultPhase = phases.find((p) => p.status !== "done") ?? phases[phases.length - 1];
  const [selectedN, setSelectedN] = useState(defaultPhase.n);
  const selected = phases.find((p) => p.n === selectedN)!;
  const SelectedIcon = PHASE_ICON[selected.icon];

  return (
    <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.3fr]">
      <ol className="min-w-0">
        {phases.map((p, i) => {
          const Icon = PHASE_ICON[p.icon];
          const isSelected = p.n === selectedN;
          return (
            <li key={p.n}>
              <button
                type="button"
                onClick={() => setSelectedN(p.n)}
                className={`flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left transition-colors duration-[120ms] ease-out ${
                  isSelected ? "bg-panel" : "hover:bg-page"
                }`}
              >
                <span className="w-5 shrink-0 font-mono text-xs text-muted">
                  {String(p.n).padStart(2, "0")}
                </span>
                <span
                  className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                  style={{
                    background: isSelected
                      ? "color-mix(in srgb, var(--accent) 16%, transparent)"
                      : "var(--page)",
                    color: isSelected ? "var(--accent)" : "var(--ink)",
                  }}
                >
                  {i > 0 && (
                    <span className="absolute -top-2.5 left-1/2 h-2.5 w-px -translate-x-1/2 bg-line" />
                  )}
                  <Icon size={15} />
                  {i < phases.length - 1 && (
                    <span className="absolute -bottom-2.5 left-1/2 h-2.5 w-px -translate-x-1/2 bg-line" />
                  )}
                </span>
                <span
                  className={`min-w-0 flex-1 truncate text-sm ${
                    isSelected ? "font-semibold text-ink" : "text-text2"
                  }`}
                >
                  {p.title}
                </span>
                <span
                  className="h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ background: STATUS_COLOR[p.status] }}
                  aria-hidden
                />
              </button>
            </li>
          );
        })}
      </ol>

      <div className="rounded-xl border border-line bg-panel p-6 lg:sticky lg:top-24 lg:self-start">
        <div className="flex items-start gap-3">
          <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-page text-ink">
            <SelectedIcon size={18} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-mono text-[10px] uppercase tracking-wider text-muted">
              Phase {String(selected.n).padStart(2, "0")}
            </p>
            <h2 className="font-semibold text-ink">{selected.title}</h2>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-line px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-text2">
            <span
              className="inline-block h-1.5 w-1.5 rounded-full"
              style={{ background: STATUS_COLOR[selected.status] }}
              aria-hidden
            />
            {STATUS_LABEL[selected.status]}
          </span>
        </div>

        <div className="mt-5 space-y-5">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-wider text-muted">
              Goal
            </p>
            <p className="mt-1.5 text-sm leading-6 text-text">{selected.goal}</p>
          </div>

          <div className="flex flex-wrap gap-x-8 gap-y-3">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider text-muted">
                Depends on
              </p>
              <p className="mt-1.5 text-sm text-text2">{selected.dependsOn}</p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider text-muted">
                Plans
              </p>
              <p className="mt-1.5 text-sm text-text2">{selected.plans}</p>
            </div>
          </div>

          {selected.requirements.length > 0 && (
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider text-muted">
                Requirements
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {selected.requirements.map((r) => (
                  <span
                    key={r}
                    className="rounded-full border border-line bg-page px-2 py-0.5 font-mono text-[10px] text-text2"
                  >
                    {r}
                  </span>
                ))}
              </div>
            </div>
          )}

          {selected.successCriteria.length === 0 ? (
            <p className="text-sm text-muted">
              Requirements and success criteria aren&apos;t broken down yet —
              this phase hasn&apos;t been planned.
            </p>
          ) : (
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider text-muted">
                Success criteria
              </p>
              <ol className="mt-2 space-y-2">
                {selected.successCriteria.map((c, i) => (
                  <li key={i} className="flex gap-2.5 text-sm leading-6 text-text2">
                    <span className="mt-0.5 font-mono text-xs text-muted">
                      {i + 1}
                    </span>
                    <span>{c}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

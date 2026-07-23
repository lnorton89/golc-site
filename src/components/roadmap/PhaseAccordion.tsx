"use client";

import { useState } from "react";
import {
  ChevronRightIcon,
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

function PhaseItem({ phase }: { phase: Phase }) {
  const [open, setOpen] = useState(false);
  const Icon = PHASE_ICON[phase.icon];

  return (
    <li className="card-hover rounded-xl border border-line bg-panel">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-start gap-4 p-5 text-left"
      >
        <span className="font-mono text-sm text-muted">
          {String(phase.n).padStart(2, "0")}
        </span>
        <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-page text-ink">
          <Icon size={16} />
        </span>
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="font-semibold text-ink">{phase.title}</h2>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-line px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-text2">
              <span
                className="inline-block h-1.5 w-1.5 rounded-full"
                style={{ background: STATUS_COLOR[phase.status] }}
                aria-hidden
              />
              {STATUS_LABEL[phase.status]}
            </span>
          </div>
          <p className="mt-1.5 text-sm leading-6 text-text2">{phase.body}</p>
        </div>
        <ChevronRightIcon
          size={16}
          className={`mt-1 shrink-0 text-muted transition-transform duration-[120ms] ease-out ${
            open ? "rotate-90" : ""
          }`}
        />
      </button>

      {open && (
        <div className="space-y-5 border-t border-line px-5 py-5 sm:pl-14">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-wider text-muted">
              Goal
            </p>
            <p className="mt-1.5 text-sm leading-6 text-text">{phase.goal}</p>
          </div>

          <div className="flex flex-wrap gap-x-8 gap-y-3">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider text-muted">
                Depends on
              </p>
              <p className="mt-1.5 text-sm text-text2">{phase.dependsOn}</p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider text-muted">
                Plans
              </p>
              <p className="mt-1.5 text-sm text-text2">{phase.plans}</p>
            </div>
          </div>

          {phase.requirements.length > 0 && (
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider text-muted">
                Requirements
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {phase.requirements.map((r) => (
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

          {phase.successCriteria.length === 0 && (
            <p className="text-sm text-muted">
              Requirements and success criteria aren&apos;t broken down yet —
              this phase hasn&apos;t been planned.
            </p>
          )}

          {phase.successCriteria.length > 0 && (
          <div>
            <p className="font-mono text-[10px] uppercase tracking-wider text-muted">
              Success criteria
            </p>
            <ol className="mt-2 space-y-2">
              {phase.successCriteria.map((c, i) => (
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
      )}
    </li>
  );
}

export default function PhaseAccordion({ phases }: { phases: Phase[] }) {
  return (
    <ol className="mt-10 max-w-3xl space-y-4">
      {phases.map((p) => (
        <PhaseItem key={p.n} phase={p} />
      ))}
    </ol>
  );
}

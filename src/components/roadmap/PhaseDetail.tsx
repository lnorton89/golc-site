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

export const STATUS_LABEL: Record<PhaseStatus, string> = {
  done: "Shipped",
  active: "In progress",
  planned: "Planned",
};

export const STATUS_COLOR: Record<PhaseStatus, string> = {
  done: "var(--status-frame-lock)",
  active: "var(--status-armed)",
  planned: "var(--status-offline)",
};

export const PHASE_ICON: Record<PhaseIcon, (props: { size?: number }) => React.ReactElement> = {
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

export default function PhaseDetail({
  phase,
  showHeader = true,
}: {
  phase: Phase;
  showHeader?: boolean;
}) {
  const Icon = PHASE_ICON[phase.icon];

  return (
    <>
      {showHeader && (
        <div className="flex items-start gap-3">
          <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-page text-ink">
            <Icon size={18} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-mono text-[10px] uppercase tracking-wider text-muted">
              Phase {String(phase.n).padStart(2, "0")}
            </p>
            <h2 className="font-semibold text-ink">{phase.title}</h2>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-line px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-text2">
            <span
              className="inline-block h-1.5 w-1.5 rounded-full"
              style={{ background: STATUS_COLOR[phase.status] }}
              aria-hidden
            />
            {STATUS_LABEL[phase.status]}
          </span>
        </div>
      )}

      <div className={showHeader ? "mt-5 space-y-5" : "space-y-5"}>
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

        {phase.successCriteria.length === 0 ? (
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
    </>
  );
}

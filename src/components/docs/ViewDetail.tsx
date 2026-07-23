import { FixtureIcon, CueIcon, BeamIcon, BlackoutIcon, ScriptIcon } from "@/components/icons";
import { LEXICON, STATES, type ViewDef, type ViewIcon } from "./docsData";

export const VIEW_ICON: Record<ViewIcon, (props: { size?: number }) => React.ReactElement> = {
  fixture: FixtureIcon,
  cue: CueIcon,
  beam: BeamIcon,
  blackout: BlackoutIcon,
  script: ScriptIcon,
};

export default function ViewDetail({
  view,
  showHeader = true,
}: {
  view: ViewDef;
  showHeader?: boolean;
}) {
  const Icon = VIEW_ICON[view.icon];

  return (
    <>
      {showHeader && (
        <div className="flex items-start gap-3">
          <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-page text-ink">
            <Icon size={18} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-mono text-[10px] uppercase tracking-wider text-muted">
              {view.workflowStage}
            </p>
            <h2 className="font-semibold text-ink">{view.title}</h2>
          </div>
        </div>
      )}

      <div className={showHeader ? "mt-5 space-y-5" : "space-y-5"}>
        <p className="text-sm leading-6 text-text">{view.body}</p>

        <div>
          <p className="font-mono text-[10px] uppercase tracking-wider text-muted">
            Concepts
          </p>
          <dl className="mt-2 space-y-3">
            {view.concepts.map((term) => (
              <div key={term}>
                <dt className="font-mono text-sm font-semibold text-ink">{term}</dt>
                <dd className="mt-0.5 text-sm leading-6 text-text2">{LEXICON[term]}</dd>
              </div>
            ))}
          </dl>
        </div>

        {view.states.length > 0 && (
          <div>
            <p className="font-mono text-[10px] uppercase tracking-wider text-muted">
              Related states
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {view.states.map((s) => (
                <span
                  key={s}
                  className="inline-flex items-center gap-1.5 rounded-full border border-line bg-page px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-text2"
                  title={STATES[s].meaning}
                >
                  <span
                    className="inline-block h-1.5 w-1.5 rounded-full"
                    style={{ background: STATES[s].color }}
                    aria-hidden
                  />
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

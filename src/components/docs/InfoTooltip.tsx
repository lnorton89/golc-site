// Small hover/focus-triggered "i" affordance used next to a desktop-view
// route or section heading. Pure CSS show/hide (group-hover/group-focus-
// within) rather than JS state, since DesktopViewExplorer renders one of
// these per catalog entry -- no per-instance re-render cost, and the
// content it displays (label/text) always comes straight from the
// generated desktop-views.json catalog, never hand-duplicated here.
type InfoTooltipProps = {
  label: string;
  text: string;
  placement?: "right" | "bottom";
};

export default function InfoTooltip({ label, text, placement = "right" }: InfoTooltipProps) {
  const positionClasses =
    placement === "right"
      ? "left-full top-1/2 ml-2 -translate-y-1/2"
      : "left-0 top-full mt-2";

  return (
    <span className="group/info relative inline-flex shrink-0">
      <button
        type="button"
        aria-label={label}
        className="flex h-5 w-5 items-center justify-center rounded-full border border-line font-mono text-[10px] font-bold leading-none text-muted transition-colors duration-120 ease-out hover:border-accent hover:text-link focus-visible:border-accent focus-visible:text-link focus-visible:outline-none"
      >
        i
      </button>
      <span
        role="tooltip"
        className={`pointer-events-none absolute z-30 hidden w-64 max-w-[80vw] rounded-md border border-line bg-panel p-3 text-left font-sans text-xs font-normal normal-case leading-5 tracking-normal text-text2 shadow-lg group-hover/info:block group-focus-within/info:block ${positionClasses}`}
      >
        {text}
      </span>
    </span>
  );
}

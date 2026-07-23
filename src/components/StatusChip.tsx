const STATES = [
  { name: "Live", color: "var(--status-live)", meaning: "Art-Net output active, a look is on stage" },
  { name: "Frame lock", color: "var(--status-frame-lock)", meaning: "Playback holds a steady frame rate, isolated from the UI" },
  { name: "Armed", color: "var(--status-armed)", meaning: "An automation lease is armed, or a look has unsaved edits" },
  { name: "Revoked", color: "var(--status-revoked)", meaning: "Revoke Automation has blocked AI/scripts; look frozen" },
  { name: "Blackout", color: "var(--status-blackout)", meaning: "Separate, immediate intensity kill (INTENSITY · 0)" },
  { name: "Offline", color: "var(--status-offline)", meaning: "A provider/integration is unreachable; local work continues" },
];

export default function StatusChipGrid() {
  return (
    <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {STATES.map((s) => (
        <div
          key={s.name}
          className="rounded-lg border border-line bg-panel p-4"
        >
          <dt className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-ink">
            <span
              className="inline-block h-2.5 w-2.5 rounded-full border border-line"
              style={{ background: s.color }}
              aria-hidden
            />
            {s.name}
          </dt>
          <dd className="mt-2 text-sm text-text2">{s.meaning}</dd>
        </div>
      ))}
    </dl>
  );
}

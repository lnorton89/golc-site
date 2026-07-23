import Link from "next/link";
import StatusChipGrid from "@/components/StatusChip";
import SectionHeading from "@/components/SectionHeading";
import PositioningIllustration from "@/components/PositioningIllustration";
import {
  FixtureIcon,
  FadersIcon,
  BeamIcon,
  CueIcon,
  ScriptIcon,
  ApiIcon,
  TimelineIcon,
  BlackoutIcon,
  DatabaseIcon,
  DocIcon,
  GitHubIcon,
  ArrowRightIcon,
} from "@/components/icons";

const SPECTRUM = [
  "var(--spectrum-1)",
  "var(--spectrum-2)",
  "var(--spectrum-3)",
  "var(--spectrum-4)",
  "var(--spectrum-5)",
  "var(--spectrum-6)",
];

const WORKFLOW = [
  {
    title: "Patch fixtures, build reusable pools",
    body: "Load strict, schema-validated fixture definitions — hand-written or imported from Open Fixture Library — then group them into logical pools independent of any one deployment's fixture count or addresses.",
    Icon: FixtureIcon,
  },
  {
    title: "Adapt deployments with reviewable impact previews",
    body: "Resize a pool or substitute a fixture and see a deterministic impact plan across every affected group, theme, chase, and mapping before anything commits — never a silent approximation.",
    Icon: DatabaseIcon,
  },
  {
    title: "Program semantic looks, presets, chases, and motion",
    body: "Set intensity, color, position, and beam by meaning, not channel number. Record reusable themes, tempo-relative chases, and motion presets, then assemble them into bar-based scenes with independent layers.",
    Icon: TimelineIcon,
  },
  {
    title: "Run the show — screen, keyboard, or MIDI",
    body: "A documented keyboard workflow exposes every playback action with no hardware required. Hand a constrained operator surface to someone else, or map a generic MIDI controller with Learn and soft takeover.",
    Icon: FadersIcon,
  },
  {
    title: "Deterministic Art-Net output, always inspectable",
    body: "Playback and frame output run isolated from the UI, storage, scripts, API clients, and LLM inference. Watch per-universe final values, frame health, and target status in real time.",
    Icon: BeamIcon,
  },
  {
    title: "Save, recover, and move portable shows",
    body: "A show and its deployment live in one versioned .golc file, autosaved to rotating recovery points. Migrations verify a backup before committing; nothing is rewritten if it can't be read back.",
    Icon: CueIcon,
  },
  {
    title: "Extend through a public API and TypeScript SDK",
    body: "External programs inspect and control every capability through /api/v1 — the same typed command model the desktop app uses. Automate with capability-limited TypeScript scripts against a generated SDK.",
    Icon: ApiIcon,
  },
  {
    title: "Bounded AI assistance, operator authority stays local",
    body: "Hosted or local LLMs can draft fixtures or operate under an explicitly armed, time-bounded lease — always validated and audited, always subject to an immediate Revoke Automation.",
    Icon: ScriptIcon,
  },
];

const ARCHITECTURE = [
  {
    title: "Every surface behaves the same way",
    body: "UI actions, TypeScript scripts, API clients, and LLM tools all route through the same typed domain commands — nothing gets a special, less-tested path.",
    Icon: ApiIcon,
  },
  {
    title: "A stalled dependency can't touch your output",
    body: "Playback timing and Art-Net output are isolated from everything else — a frozen UI, a slow script, or an unreachable LLM provider cannot delay or corrupt a frame.",
    Icon: BeamIcon,
  },
  {
    title: "Structural changes are reviewed, never guessed",
    body: "Pool resizing and fixture substitution default to a deterministic impact preview before anything applies — you see exactly what changes before it happens.",
    Icon: FixtureIcon,
  },
  {
    title: "The person in the room is always in control",
    body: "Revoke Automation blocks AI and scripts, cancels their queued actions, and freezes the current look without waiting on any runtime. Blackout is a separate, immediate intensity kill.",
    Icon: BlackoutIcon,
  },
];

const LAYERS = [
  { name: "Base look", detail: "Wash warm", on: true },
  { name: "Color theme", detail: "Chorus gold", on: true },
  { name: "Chase", detail: "8-count sweep", on: false },
  { name: "Motion", detail: "Slow figure-8", on: true },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="border-b border-line bg-panel">
        <div className="mx-auto grid max-w-[1160px] items-center gap-12 px-6 py-20 sm:px-12 sm:py-28 lg:grid-cols-[1.15fr_1fr]">
          <div>
            <h1 className="max-w-xl text-[44px] font-extrabold leading-[1.05] tracking-[-0.03em] text-ink sm:text-[64px]">
              Lighting control that behaves.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-text2 sm:text-xl">
              Build reusable shows, adapt them to different rigs, and run
              deterministic Art-Net playback from a focused desktop
              workspace. GOLC combines modular fixtures, tempo-aware
              programming, keyboard and MIDI control, TypeScript automation,
              a public API, and bounded AI assistance — without giving up
              local operator authority.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="#workflow"
                className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-semibold text-on-accent transition-colors duration-[120ms] ease-out hover:bg-accent-dp"
              >
                Explore the workflow
              </a>
              <Link
                href="/docs"
                className="inline-flex items-center gap-2 rounded-md border border-line px-5 py-3 text-sm font-semibold text-ink transition-colors duration-[120ms] ease-out hover:border-accent hover:text-accent"
              >
                <DocIcon size={16} />
                Read the docs
              </Link>
              <a
                href="https://github.com/lnorton89/golc"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-line px-5 py-3 text-sm font-semibold text-ink transition-colors duration-[120ms] ease-out hover:border-accent hover:text-accent"
              >
                <GitHubIcon size={16} />
                View source
              </a>
            </div>
          </div>

          {/* Representative application shell, built from the real Phase 6 UI contract */}
          <div className="overflow-hidden rounded-xl border border-line bg-page">
            <div className="flex items-center justify-between gap-3 border-b border-line bg-panel px-4 py-2.5">
              <span className="flex min-w-0 items-center gap-2 font-mono text-[11px] text-text2">
                <span className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-status-live" aria-hidden />
                <span className="truncate">Wash warm</span>
                <span className="text-muted">·</span>
                <span className="shrink-0">128 BPM</span>
                <span className="text-muted">·</span>
                <span className="shrink-0">bar 3.2</span>
              </span>
              <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-line bg-page px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-text2">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-status-frame-lock" aria-hidden />
                Live
              </span>
            </div>

            <div className="space-y-1.5 p-4">
              <p className="mb-1 font-mono text-[10px] uppercase tracking-wider text-muted">
                Layers
              </p>
              {LAYERS.map((l) => (
                <div
                  key={l.name}
                  className="flex items-center justify-between rounded-md border border-line px-3 py-2"
                  style={{
                    background: l.on
                      ? "color-mix(in srgb, var(--accent) 10%, transparent)"
                      : "var(--panel)",
                    opacity: l.on ? 1 : 0.55,
                  }}
                >
                  <span className="flex items-center gap-2 text-sm">
                    <span
                      className="inline-block h-2 w-2 rounded-full"
                      style={{ background: l.on ? "var(--accent)" : "var(--muted)" }}
                      aria-hidden
                    />
                    <span className={l.on ? "font-semibold text-ink" : "text-text2"}>{l.name}</span>
                  </span>
                  <span className="font-mono text-xs text-muted">{l.detail}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 border-t border-line bg-panel p-3">
              <button
                type="button"
                disabled
                className="flex h-16 flex-1 items-center justify-center rounded-md border border-line bg-page font-mono text-[10px] font-semibold uppercase tracking-wider text-text2"
              >
                Hold to Blackout
              </button>
              <button
                type="button"
                disabled
                className="flex h-16 flex-1 items-center justify-center rounded-md border border-line bg-page text-center font-mono text-[10px] font-semibold uppercase tracking-wider text-text2"
              >
                Hold to Revoke
                <br />
                Automation
              </button>
              <button
                type="button"
                disabled
                className="flex h-16 flex-1 items-center justify-center rounded-md border border-line bg-page text-center font-mono text-[10px] font-semibold uppercase tracking-wider text-text2"
              >
                Hold to Stop /
                <br />
                Release All
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="mx-auto max-w-[1160px] px-6 py-16 sm:px-12 sm:py-24">
        <SectionHeading index="01" title="Who it's for" />
        <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr]">
          <div className="max-w-2xl space-y-5 text-lg leading-8 text-text">
            <p>
              Built for operators of small live shows — clubs, churches,
              schools, community venues. Reliability is the feature: cues
              fire the same way every time, state is inspectable, nothing
              hides behind a dongle.
            </p>
            <p>
              GOLC is desktop lighting control that behaves like an
              instrument: deterministic Art-Net playback, scriptable in
              TypeScript, open by default — precise enough for
              professionals, calm enough for a volunteer on a Sunday.
            </p>
            <p className="rounded-xl border border-line bg-panel px-5 py-4 font-mono text-sm leading-7 text-text2">
              An operator can author a modular show once, adapt its fixture
              pools to different deployments in one or two actions, and hand
              a simple controller surface to another person for reliable
              playback.
            </p>
          </div>

          <div className="overflow-hidden rounded-xl border border-line">
            <PositioningIllustration />
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section id="workflow" className="border-y border-line bg-panel">
        <div className="mx-auto max-w-[1160px] px-6 py-16 sm:px-12 sm:py-24">
          <SectionHeading index="02" title="Author once, deploy repeatedly" />
          <p className="mb-8 max-w-2xl text-text2">
            The complete show workflow, front-loaded once and reused every
            time the rig changes.
          </p>
          <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {WORKFLOW.map((c, i) => {
              const color = SPECTRUM[i % SPECTRUM.length];
              return (
                <li
                  key={c.title}
                  className="card-hover rounded-xl border border-line bg-page p-6"
                  style={{ borderTopColor: color, borderTopWidth: 2 }}
                >
                  <div className="mb-4 flex items-center gap-3">
                    <div
                      className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                      style={{ background: `color-mix(in srgb, ${color} 16%, transparent)`, color }}
                    >
                      <c.Icon size={20} />
                    </div>
                    <span className="font-mono text-xs text-muted">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold tracking-[-0.01em] text-ink">
                    {c.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-text2">{c.body}</p>
                </li>
              );
            })}
          </ol>
          <p className="mt-8 text-sm text-muted">
            Out of scope for v1: protocols beyond Art-Net, multi-user/distributed
            operation, browser or mobile clients, and official macOS/Linux
            support (portability is preserved architecturally; Windows is
            qualified first).
          </p>
        </div>
      </section>

      {/* Operator authority / states */}
      <section className="mx-auto max-w-[1160px] px-6 py-16 sm:px-12 sm:py-24">
        <SectionHeading index="03" title="One command model, one set of states" />
        <p className="-mt-4 mb-8 max-w-2xl text-text2">
          Color is never the only signal — every state pairs with a text
          label. Operator authority always belongs to the person in the room:{" "}
          <strong className="text-ink">Blackout</strong> and{" "}
          <strong className="text-ink">Revoke Automation</strong> are the
          heaviest elements in the UI, never hidden in a menu.
        </p>
        <StatusChipGrid />
      </section>

      {/* Architecture principles, framed as user benefits */}
      <section className="border-y border-line bg-panel">
        <div className="mx-auto max-w-[1160px] px-6 py-16 sm:px-12 sm:py-24">
          <SectionHeading index="04" title="Why it holds up under pressure" />
          <p className="mb-8 max-w-2xl text-text2">
            Every user-facing guarantee above comes from a small set of
            architectural rules.{" "}
            <Link href="/architecture" className="text-link hover:underline">
              See how the codebase enforces them
            </Link>
            .
          </p>
          <div className="grid gap-6 sm:grid-cols-2">
            {ARCHITECTURE.map((a, i) => {
              const color = SPECTRUM[(i * 2 + 1) % SPECTRUM.length];
              return (
                <div
                  key={a.title}
                  className="card-hover rounded-xl border border-line bg-page p-6"
                  style={{ borderTopColor: color, borderTopWidth: 2 }}
                >
                  <div
                    className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg"
                    style={{ background: `color-mix(in srgb, ${color} 16%, transparent)`, color }}
                  >
                    <a.Icon size={20} />
                  </div>
                  <h3 className="text-lg font-semibold tracking-[-0.01em] text-ink">
                    {a.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-text2">{a.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Open source / local-first positioning */}
      <section className="mx-auto max-w-[1160px] px-6 py-16 sm:px-12 sm:py-24">
        <SectionHeading index="05" title="Open-source and local-first" />
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="rounded-xl border border-line bg-panel p-6">
            <h3 className="text-lg font-semibold text-ink">GPL-3.0 licensed</h3>
            <p className="mt-2 text-sm leading-6 text-text2">
              The full source is public and free to study, modify, and
              redistribute under the terms of the{" "}
              <a
                href="https://github.com/lnorton89/golc/blob/master/LICENSE"
                target="_blank"
                rel="noopener noreferrer"
                className="text-link hover:underline"
              >
                GNU GPL v3.0
              </a>
              .
            </p>
          </div>
          <div className="rounded-xl border border-line bg-panel p-6">
            <h3 className="text-lg font-semibold text-ink">Runs on your machine</h3>
            <p className="mt-2 text-sm leading-6 text-text2">
              No cloud dependency for show authoring or playback, no account,
              no dongle. AI and remote API access are opt-in and explicitly
              bounded.
            </p>
          </div>
          <div className="rounded-xl border border-line bg-panel p-6">
            <h3 className="text-lg font-semibold text-ink">Nothing hidden</h3>
            <p className="mt-2 text-sm leading-6 text-text2">
              Every behavior is written down. The{" "}
              <Link href="/architecture" className="text-link hover:underline">
                architecture
              </Link>{" "}
              and{" "}
              <Link href="/roadmap" className="text-link hover:underline">
                roadmap
              </Link>{" "}
              are as public as the code.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-[1160px] px-6 py-16 sm:px-12 sm:py-28">
        <div className="cta-pattern relative overflow-hidden rounded-xl border border-line px-8 py-14 text-center">
          <h2 className="relative text-[32px] font-bold tracking-[-0.02em] text-ink">
            See the workflow in the docs.
          </h2>
          <p className="relative mx-auto mt-3 max-w-xl text-text2">
            Read how patching, pools, programming, and playback fit
            together, or go straight to the source.
          </p>
          <div className="relative mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/docs"
              className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-semibold text-on-accent transition-colors duration-[120ms] ease-out hover:bg-accent-dp"
            >
              <DocIcon size={16} />
              Read the docs
            </Link>
            <a
              href="https://github.com/lnorton89/golc"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-line px-5 py-3 text-sm font-semibold text-ink transition-colors duration-[120ms] ease-out hover:border-accent hover:text-accent"
            >
              <GitHubIcon size={16} />
              View on GitHub
            </a>
          </div>
          <p className="relative mt-8 text-sm text-muted">
            In active development — Phase 6 of 11, 7/8 plans complete.{" "}
            <Link href="/roadmap" className="inline-flex items-center gap-1 text-link hover:underline">
              See the roadmap
              <ArrowRightIcon size={12} />
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}

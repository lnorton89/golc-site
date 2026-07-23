import Link from "next/link";
import StatusChipGrid from "@/components/StatusChip";
import SectionHeading from "@/components/SectionHeading";
import GolcMark from "@/components/GolcMark";
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
  DocIcon,
  GitHubIcon,
} from "@/components/icons";

const SPECTRUM = [
  "var(--spectrum-1)",
  "var(--spectrum-2)",
  "var(--spectrum-3)",
  "var(--spectrum-4)",
  "var(--spectrum-5)",
  "var(--spectrum-6)",
];

const CAPABILITIES = [
  {
    title: "Complete show workflow",
    body: "Patch fixtures, organize attributes, build looks/scenes and chases, play them back, save and restore shows.",
    Icon: CueIcon,
  },
  {
    title: "Modular fixture pools",
    body: "Shows model reusable logical pools independently of a deployment's concrete fixture count and addresses; substitution maps by semantic capability, with review before commit.",
    Icon: FixtureIcon,
  },
  {
    title: "Human-readable fixture definitions",
    body: "A strict, schema-validated YAML 1.2 subset with duplicate-key rejection and deterministic normalization. Import from Open Fixture Library, plus first-class custom definitions.",
    Icon: FixtureIcon,
  },
  {
    title: "Tempo-aware scenes",
    body: "Bar-based loops synchronized to a global BPM (typed or tap tempo), with swappable color themes, chases, and motion presets blended through reusable transition presets.",
    Icon: TimelineIcon,
  },
  {
    title: "Reliable Art-Net output",
    body: "Deterministic playback and frame output that never depend on UI rendering, storage, scripts, API clients, or LLM inference.",
    Icon: BeamIcon,
  },
  {
    title: "Operator surfaces",
    body: "Full keyboard and on-screen playback, plus a constrained generic MIDI surface (Note/CC learn, soft takeover) that a less-experienced operator can learn quickly.",
    Icon: FadersIcon,
  },
  {
    title: "TypeScript automation",
    body: "Create, run, and debug capability-limited scripts in a supervised, isolated runtime using a generated typed SDK.",
    Icon: ScriptIcon,
  },
  {
    title: "Versioned external API",
    body: "External programs inspect and control every public capability through /api/v1, with the same typed command model as the desktop app.",
    Icon: ApiIcon,
  },
  {
    title: "Provider-neutral AI",
    body: "Hosted or local LLMs can draft fixture definitions and, under an explicitly armed, time-bounded lease, operate the application — always validated, audited, and overridable.",
    Icon: BlackoutIcon,
  },
];

const PRINCIPLES = [
  {
    title: "Plain over clever",
    body: "Say the true thing simply; an operator mid-show has no time to decode marketing.",
  },
  {
    title: "Precise, never vague",
    body: "Name the protocol, the channel, the frame. Specificity earns trust.",
  },
  {
    title: "Reassuring under pressure",
    body: "Calm tone, no exclamation. Steady when the room is loud.",
  },
  {
    title: "Open and documented",
    body: "Nothing hidden; every behavior written down, every claim verifiable.",
  },
];

const ARCHITECTURE = [
  {
    title: "One typed command model",
    body: "UI actions, TypeScript scripts, API clients, and LLM tools all route through shared domain commands, so every control surface behaves consistently.",
    Icon: ApiIcon,
  },
  {
    title: "Deterministic output path",
    body: "Playback timing and Art-Net output are isolated from everything else — a stalled UI, slow script, or unreachable LLM provider cannot delay or corrupt frames.",
    Icon: BeamIcon,
  },
  {
    title: "Review before structural change",
    body: "Pool resizing and fixture substitution default to a deterministic impact preview before anything is applied; nothing is approximated silently.",
    Icon: FixtureIcon,
  },
  {
    title: "Operator authority is local",
    body: "Revoke Automation blocks AI and scripts, cancels their queued actions, and freezes the current look without waiting on any runtime or provider. Blackout is a separate immediate intensity control.",
    Icon: BlackoutIcon,
  },
];

const CUES = [
  { n: "11", name: "Preset", dur: "—", active: false },
  { n: "12", name: "Wash warm", dur: "▶", active: true },
  { n: "13", name: "Chorus hit", dur: "3s", active: false },
  { n: "14", name: "Blackout", dur: "0s", active: false },
  { n: "15", name: "Bows", dur: "5s", active: false },
];

const CHANNEL_HEIGHTS = [78, 58, 28, 70, 17, 43, 9, 63, 24, 77, 37, 49];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="border-b border-line bg-panel">
        <div className="mx-auto grid max-w-[1160px] items-center gap-12 px-6 py-20 sm:px-12 sm:py-28 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-page px-3 py-1 font-mono text-xs uppercase tracking-wider text-muted">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-status-armed" />
              Status: early development
            </p>
            <h1 className="max-w-xl text-[44px] font-extrabold leading-[1.05] tracking-[-0.03em] text-ink sm:text-[64px]">
              Lighting control that behaves.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-text2 sm:text-xl">
              Cross-platform desktop lighting control with deterministic
              Art-Net playback, TypeScript automation, a public API, and
              autonomous LLM control — built in Go.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="https://github.com/lnorton89/golc"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-semibold text-on-accent transition-colors duration-[120ms] ease-out hover:bg-accent-dp"
              >
                <GitHubIcon size={16} />
                View on GitHub
              </a>
              <Link
                href="/roadmap"
                className="inline-flex items-center gap-2 rounded-md border border-line px-5 py-3 text-sm font-semibold text-ink transition-colors duration-[120ms] ease-out hover:border-accent hover:text-accent"
              >
                <TimelineIcon size={16} />
                See the roadmap
              </Link>
            </div>
          </div>

          <div className="flex flex-col items-center gap-5 rounded-xl border border-line bg-page p-8">
            <GolcMark size={112} />
            <div className="flex gap-1.5">
              {SPECTRUM.map((c) => (
                <span
                  key={c}
                  className="h-1.5 w-6 rounded-full"
                  style={{ background: c }}
                />
              ))}
            </div>
            <p className="text-center font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
              Go Lighting Control
            </p>
          </div>
        </div>
      </section>

      {/* Positioning */}
      <section className="mx-auto max-w-[1160px] px-6 py-16 sm:px-12 sm:py-24">
        <SectionHeading index="01" title="Positioning" />
        <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr]">
          <div className="max-w-2xl space-y-5 text-lg leading-8 text-text">
            <p>
              GOLC is desktop lighting control that behaves like an
              instrument: deterministic Art-Net playback, scriptable in
              TypeScript, open by default — precise enough for professionals,
              calm enough for a volunteer on a Sunday.
            </p>
            <p>
              Built for operators of small live shows — clubs, churches,
              schools, community venues. Reliability is the feature: cues
              fire the same way every time, state is inspectable, nothing
              hides behind a dongle.
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

      {/* Voice / principles */}
      <section className="border-y border-line bg-panel">
        <div className="mx-auto max-w-[1160px] px-6 py-16 sm:px-12 sm:py-24">
          <SectionHeading index="02" title="Why it behaves" />
          <div className="grid gap-6 sm:grid-cols-2">
            {PRINCIPLES.map((p, i) => (
              <div
                key={p.title}
                className="card-hover rounded-xl border border-line bg-page p-6"
                style={{ borderTopColor: SPECTRUM[i], borderTopWidth: 2 }}
              >
                <h3 className="text-lg font-semibold tracking-[-0.01em] text-ink">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-text2">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="mx-auto max-w-[1160px] px-6 py-16 sm:px-12 sm:py-24">
        <SectionHeading index="03" title="Planned capabilities (v1)" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CAPABILITIES.map((c, i) => {
            const color = SPECTRUM[i % SPECTRUM.length];
            return (
              <div
                key={c.title}
                className="card-hover rounded-xl border border-line bg-panel p-6"
                style={{ borderTopColor: color, borderTopWidth: 2 }}
              >
                <div
                  className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg"
                  style={{ background: `color-mix(in srgb, ${color} 16%, transparent)`, color }}
                >
                  <c.Icon size={20} />
                </div>
                <h3 className="text-lg font-semibold tracking-[-0.01em] text-ink">
                  {c.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-text2">{c.body}</p>
              </div>
            );
          })}
        </div>
        <p className="mt-8 text-sm text-muted">
          Out of scope for v1: protocols beyond Art-Net, multi-user/distributed
          operation, browser or mobile clients, and official macOS/Linux
          support (portability is preserved architecturally; Windows is
          qualified first).
        </p>
      </section>

      {/* Product UI preview */}
      <section className="border-y border-line bg-panel">
        <div className="mx-auto max-w-[1160px] px-6 py-16 sm:px-12 sm:py-24">
          <SectionHeading index="04" title="Product UI (planned v1)" />
          <p className="mb-8 max-w-2xl text-text2">
            A Wails desktop app, Windows first. Representative views of the
            planned live output and playback surface — author once, deploy
            repeatedly.
          </p>

          <div className="overflow-hidden rounded-xl border border-line bg-page">
            <div className="flex items-center justify-between border-b border-line px-5 py-3">
              <span className="font-mono text-xs text-muted">
                golc — main_show.ts · live
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-line px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-text2">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-status-frame-lock" />
                40 fps locked
              </span>
            </div>

            <div className="grid gap-0 sm:grid-cols-[1.1fr_1fr]">
              <div className="border-line p-5 sm:border-r">
                <p className="mb-3 font-mono text-[10px] uppercase tracking-wider text-muted">
                  Cue list
                </p>
                <ul className="space-y-1">
                  {CUES.map((cue) => (
                    <li
                      key={cue.n}
                      className="flex items-center justify-between rounded-md px-2 py-1.5 text-sm"
                      style={
                        cue.active
                          ? {
                              background:
                                "color-mix(in srgb, var(--accent) 12%, transparent)",
                            }
                          : undefined
                      }
                    >
                      <span className="flex items-center gap-3">
                        <span className="font-mono text-xs text-muted">
                          {cue.n}
                        </span>
                        <span
                          className={
                            cue.active ? "font-semibold text-accent" : "text-text"
                          }
                        >
                          {cue.name}
                        </span>
                      </span>
                      <span className="font-mono text-xs text-muted">
                        {cue.dur}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-5">
                <p className="mb-3 font-mono text-[10px] uppercase tracking-wider text-muted">
                  Universe 1 · channels 1–12
                </p>
                <div className="flex h-32 items-end gap-1.5">
                  {CHANNEL_HEIGHTS.map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t"
                      style={{
                        height: `${h}%`,
                        background: SPECTRUM[i % SPECTRUM.length],
                        opacity: 0.85,
                      }}
                    />
                  ))}
                </div>
                <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[10px] text-muted">
                  {[255, 190, 92, 228, 54, 140].map((v, i) => (
                    <span key={i}>CH {String(i + 1).padStart(2, "0")} · {v}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Operator authority / states */}
      <section className="mx-auto max-w-[1160px] px-6 py-16 sm:px-12 sm:py-24">
        <SectionHeading index="05" title="One command model, one set of states" />
        <p className="-mt-4 mb-8 max-w-2xl text-text2">
          Color is never the only signal — every state pairs with a text
          label. Operator authority always belongs to the person in the room:{" "}
          <strong className="text-ink">Blackout</strong> and{" "}
          <strong className="text-ink">Revoke Automation</strong> are the
          heaviest elements in the UI, never hidden in a menu.
        </p>
        <StatusChipGrid />
      </section>

      {/* Architecture principles */}
      <section className="border-y border-line bg-panel">
        <div className="mx-auto max-w-[1160px] px-6 py-16 sm:px-12 sm:py-24">
          <SectionHeading index="06" title="Architecture principles" />
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

      {/* CTA */}
      <section className="mx-auto max-w-[1160px] px-6 py-16 sm:px-12 sm:py-28">
        <div className="cta-pattern relative overflow-hidden rounded-xl border border-line px-8 py-14 text-center">
          <h2 className="relative text-[32px] font-bold tracking-[-0.02em] text-ink">
            Follow the build.
          </h2>
          <p className="relative mx-auto mt-3 max-w-xl text-text2">
            GOLC is being built in eleven dependency-ordered phases, in the
            open. Track progress, read the docs, or watch the repo.
          </p>
          <div className="relative mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="https://github.com/lnorton89/golc"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-semibold text-on-accent transition-colors duration-[120ms] ease-out hover:bg-accent-dp"
            >
              <GitHubIcon size={16} />
              Star on GitHub
            </a>
            <Link
              href="/docs"
              className="inline-flex items-center gap-2 rounded-md border border-line px-5 py-3 text-sm font-semibold text-ink transition-colors duration-[120ms] ease-out hover:border-accent hover:text-accent"
            >
              <DocIcon size={16} />
              Read the docs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

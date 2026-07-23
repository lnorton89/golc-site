import Link from "next/link";
import StatusChipGrid from "@/components/StatusChip";
import SectionHeading from "@/components/SectionHeading";

const CAPABILITIES = [
  {
    title: "Complete show workflow",
    body: "Patch fixtures, organize attributes, build looks/scenes and chases, play them back, save and restore shows.",
  },
  {
    title: "Modular fixture pools",
    body: "Shows model reusable logical pools independently of a deployment's concrete fixture count and addresses; substitution maps by semantic capability, with review before commit.",
  },
  {
    title: "Human-readable fixture definitions",
    body: "A strict, schema-validated YAML 1.2 subset with duplicate-key rejection and deterministic normalization. Import from Open Fixture Library, plus first-class custom definitions.",
  },
  {
    title: "Tempo-aware scenes",
    body: "Bar-based loops synchronized to a global BPM (typed or tap tempo), with swappable color themes, chases, and motion presets blended through reusable transition presets.",
  },
  {
    title: "Reliable Art-Net output",
    body: "Deterministic playback and frame output that never depend on UI rendering, storage, scripts, API clients, or LLM inference.",
  },
  {
    title: "Operator surfaces",
    body: "Full keyboard and on-screen playback, plus a constrained generic MIDI surface (Note/CC learn, soft takeover) that a less-experienced operator can learn quickly.",
  },
  {
    title: "TypeScript automation",
    body: "Create, run, and debug capability-limited scripts in a supervised, isolated runtime using a generated typed SDK.",
  },
  {
    title: "Versioned external API",
    body: "External programs inspect and control every public capability through /api/v1, with the same typed command model as the desktop app.",
  },
  {
    title: "Provider-neutral AI",
    body: "Hosted or local LLMs can draft fixture definitions and, under an explicitly armed, time-bounded lease, operate the application — always validated, audited, and overridable.",
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
  },
  {
    title: "Deterministic output path",
    body: "Playback timing and Art-Net output are isolated from everything else — a stalled UI, slow script, or unreachable LLM provider cannot delay or corrupt frames.",
  },
  {
    title: "Review before structural change",
    body: "Pool resizing and fixture substitution default to a deterministic impact preview before anything is applied; nothing is approximated silently.",
  },
  {
    title: "Operator authority is local",
    body: "Revoke Automation blocks AI and scripts, cancels their queued actions, and freezes the current look without waiting on any runtime or provider. Blackout is a separate immediate intensity control.",
  },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="border-b border-line bg-panel">
        <div className="mx-auto max-w-[1160px] px-6 py-20 sm:px-12 sm:py-28">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-page px-3 py-1 font-mono text-xs uppercase tracking-wider text-muted">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-status-armed" />
            Status: early development
          </p>
          <h1 className="max-w-3xl text-[44px] font-extrabold leading-[1.05] tracking-[-0.03em] text-ink sm:text-[64px]">
            Lighting control that behaves.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-text2 sm:text-xl">
            Cross-platform desktop lighting control with deterministic Art-Net
            playback, TypeScript automation, a public API, and autonomous LLM
            control — built in Go.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <a
              href="https://github.com/lnorton89/golc"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-accent px-5 py-3 text-sm font-semibold text-panel transition-colors hover:bg-accent-dp"
            >
              View on GitHub
            </a>
            <Link
              href="/roadmap"
              className="rounded-md border border-line px-5 py-3 text-sm font-semibold text-ink transition-colors hover:border-accent hover:text-accent"
            >
              See the roadmap
            </Link>
          </div>
        </div>
      </section>

      {/* Positioning */}
      <section className="mx-auto max-w-[1160px] px-6 py-16 sm:px-12 sm:py-24">
        <SectionHeading index="01" title="Positioning" />
        <div className="max-w-2xl space-y-5 text-lg leading-8 text-text">
          <p>
            GOLC is desktop lighting control that behaves like an instrument:
            deterministic Art-Net playback, scriptable in TypeScript, open by
            default — precise enough for professionals, calm enough for a
            volunteer on a Sunday.
          </p>
          <p>
            Built for operators of small live shows — clubs, churches,
            schools, community venues. Reliability is the feature: cues fire
            the same way every time, state is inspectable, nothing hides
            behind a dongle.
          </p>
          <p className="rounded-xl border border-line bg-panel px-5 py-4 font-mono text-sm leading-7 text-text2">
            An operator can author a modular show once, adapt its fixture
            pools to different deployments in one or two actions, and hand a
            simple controller surface to another person for reliable
            playback.
          </p>
        </div>
      </section>

      {/* Voice / principles */}
      <section className="border-y border-line bg-panel">
        <div className="mx-auto max-w-[1160px] px-6 py-16 sm:px-12 sm:py-24">
          <SectionHeading index="02" title="Why it behaves" />
          <div className="grid gap-6 sm:grid-cols-2">
            {PRINCIPLES.map((p) => (
              <div
                key={p.title}
                className="rounded-xl border border-line bg-page p-6"
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
          {CAPABILITIES.map((c) => (
            <div key={c.title} className="rounded-xl border border-line p-6">
              <h3 className="text-lg font-semibold tracking-[-0.01em] text-ink">
                {c.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-text2">{c.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-sm text-muted">
          Out of scope for v1: protocols beyond Art-Net, multi-user/distributed
          operation, browser or mobile clients, and official macOS/Linux
          support (portability is preserved architecturally; Windows is
          qualified first).
        </p>
      </section>

      {/* Operator authority / states */}
      <section className="border-y border-line bg-panel">
        <div className="mx-auto max-w-[1160px] px-6 py-16 sm:px-12 sm:py-24">
          <SectionHeading index="04" title="One command model, one set of states" />
          <p className="-mt-4 mb-8 max-w-2xl text-text2">
            Color is never the only signal — every state pairs with a text
            label. Operator authority always belongs to the person in the
            room: <strong className="text-ink">Blackout</strong> and{" "}
            <strong className="text-ink">Revoke Automation</strong> are the
            heaviest elements in the UI, never hidden in a menu.
          </p>
          <StatusChipGrid />
        </div>
      </section>

      {/* Architecture principles */}
      <section className="mx-auto max-w-[1160px] px-6 py-16 sm:px-12 sm:py-24">
        <SectionHeading index="05" title="Architecture principles" />
        <div className="grid gap-6 sm:grid-cols-2">
          {ARCHITECTURE.map((a) => (
            <div key={a.title} className="rounded-xl border border-line p-6">
              <h3 className="text-lg font-semibold tracking-[-0.01em] text-ink">
                {a.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-text2">{a.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-[1160px] px-6 py-16 sm:px-12 sm:py-28">
        <div className="rounded-xl border border-line bg-panel px-8 py-14 text-center">
          <h2 className="text-[32px] font-bold tracking-[-0.02em] text-ink">
            Follow the build.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-text2">
            GOLC is being built in ten dependency-ordered phases, in the open.
            Track progress, read the docs, or watch the repo.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="https://github.com/lnorton89/golc"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-accent px-5 py-3 text-sm font-semibold text-panel transition-colors hover:bg-accent-dp"
            >
              Star on GitHub
            </a>
            <Link
              href="/docs"
              className="rounded-md border border-line px-5 py-3 text-sm font-semibold text-ink transition-colors hover:border-accent hover:text-accent"
            >
              Read the docs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

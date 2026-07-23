import { Fragment } from "react";
import Link from "next/link";
import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import StatusChipGrid from "@/components/StatusChip";
import {
  FixtureIcon,
  CueIcon,
  BeamIcon,
  ScriptIcon,
  BlackoutIcon,
  ApiIcon,
  ArrowRightIcon,
} from "@/components/icons";

const docsDescription =
  "How GOLC works — patching, fixture pools, scenes and chases, live playback, and the concepts behind them.";

export const metadata: Metadata = {
  title: "Docs",
  description: docsDescription,
  alternates: { canonical: "/docs" },
  openGraph: {
    siteName: "GOLC",
    type: "website",
    locale: "en_US",
    title: "Docs · GOLC",
    description: docsDescription,
    url: "/docs",
  },
  twitter: {
    card: "summary_large_image",
    title: "Docs · GOLC",
    description: docsDescription,
  },
};

const WORKFLOW = [
  {
    label: "Patch",
    Icon: FixtureIcon,
    body: "Map logical fixtures to Art-Net addresses and modes.",
  },
  {
    label: "Build pools",
    Icon: FixtureIcon,
    body: "Group fixtures into reusable pools, independent of concrete count or address.",
  },
  {
    label: "Program looks & scenes",
    Icon: CueIcon,
    body: "Set intensity, color, position, and beam; assemble tempo-aware scenes and chases.",
  },
  {
    label: "Play back",
    Icon: BeamIcon,
    body: "Run the show through the deterministic engine, output to Art-Net.",
  },
  {
    label: "Automate",
    Icon: ScriptIcon,
    body: "Optionally hand control to a script or an armed, revocable AI lease.",
  },
];

const VIEWS = [
  {
    title: "Live output & playback",
    Icon: BeamIcon,
    body: "Deterministic Art-Net, frame-locked channel output.",
  },
  {
    title: "Patch & pools",
    Icon: FixtureIcon,
    body: "Modular fixture pools; substitution shows an Impact preview before commit.",
  },
  {
    title: "Scene editor",
    Icon: CueIcon,
    body: "Tempo-aware (BPM / tap), attribute groups (Intensity, Color, Position, Beam), chases.",
  },
  {
    title: "AI & automation",
    Icon: BlackoutIcon,
    body: "Armed, time-bounded lease with an audit log; Revoke always available.",
  },
  {
    title: "TypeScript",
    Icon: ScriptIcon,
    body: "Sandboxed, capability-limited scripts against a generated typed SDK.",
  },
];

const LEXICON = [
  { term: "Patch", body: "Mapping logical fixtures to Art-Net addresses and modes." },
  { term: "Fixture pool", body: "A reusable logical group a show targets, independent of concrete count or address." },
  { term: "Look / Scene", body: "A stored state of attributes; tempo-aware scenes loop in bars." },
  { term: "Chase", body: "An ordered sequence of steps advanced on tempo." },
  { term: "Transition preset", body: "A reusable blend applied between looks." },
  { term: "Impact preview", body: "A deterministic plan shown before a pool resize or fixture substitution." },
  { term: "Soft takeover", body: "MIDI control that engages only once a fader matches the live value." },
  { term: "Art-Net", body: "The Ethernet DMX protocol GOLC outputs (Art-Net 4)." },
  { term: "Universe", body: "512 DMX channels carried over Art-Net." },
  { term: "Deterministic playback", body: "Output timing isolated from the UI, scripts, and providers." },
  { term: "Lease", body: "A time-bounded, armed grant that lets an AI operate the app." },
  { term: "Revoke Automation", body: "The control that blocks AI/scripts and freezes the current look." },
  { term: "Blackout", body: "A separate, immediate intensity kill." },
  { term: "Command model", body: "One typed command set shared by the UI, API, scripts, and AI." },
];

export default function DocsPage() {
  return (
    <div>
      {/* Hero */}
      <section className="border-b border-line bg-panel">
        <div className="mx-auto max-w-[1160px] px-6 py-20 sm:px-12 sm:py-28">
          <span className="block font-mono text-[13px] tracking-[1.3px] text-accent">
            How the program works
          </span>
          <h1 className="mt-1 max-w-2xl text-[40px] font-extrabold leading-[1.05] tracking-[-0.03em] text-ink sm:text-[52px]">
            Docs.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-text2">
            GOLC has no desktop UI yet — Phase 6 hasn&apos;t started. This
            page covers the product concepts and workflow as designed: how a
            show comes together, the terms used consistently across UI,
            docs, and marketing, and the planned interface. Reference docs
            for the API and TypeScript SDK publish once those phases ship.
          </p>
        </div>
      </section>

      {/* Workflow */}
      <section className="mx-auto max-w-[1160px] px-6 py-16 sm:px-12 sm:py-24">
        <SectionHeading index="01" title="How a show comes together" />
        <p className="mb-8 max-w-2xl text-text2">
          An operator authors a show once, then adapts its fixture pools to
          each deployment in one or two actions.
        </p>
        <div className="flex flex-col sm:flex-row sm:items-stretch">
          {WORKFLOW.map((step, i) => (
            <Fragment key={step.label}>
              <div className="card-hover flex-1 rounded-xl border border-line bg-panel p-5">
                <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-page text-ink">
                  <step.Icon size={18} />
                </div>
                <p className="font-mono text-sm font-semibold text-ink">
                  {step.label}
                </p>
                <p className="mt-2 text-xs leading-5 text-text2">{step.body}</p>
              </div>
              {i < WORKFLOW.length - 1 && (
                <div className="flex items-center justify-center py-2 text-line sm:px-2 sm:py-0">
                  <ArrowRightIcon size={18} className="rotate-90 sm:rotate-0" />
                </div>
              )}
            </Fragment>
          ))}
        </div>
      </section>

      {/* Planned interface */}
      <section className="border-y border-line bg-panel">
        <div className="mx-auto max-w-[1160px] px-6 py-16 sm:px-12 sm:py-24">
          <SectionHeading index="02" title="Planned interface" />
          <p className="mb-8 max-w-2xl text-text2">
            A Wails desktop app, Windows first. Five representative views —
            author once, deploy repeatedly.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {VIEWS.map((v) => (
              <div key={v.title} className="card-hover rounded-xl border border-line bg-page p-5">
                <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-panel text-ink">
                  <v.Icon size={18} />
                </div>
                <p className="font-semibold text-ink">{v.title}</p>
                <p className="mt-2 text-sm leading-6 text-text2">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Operating states */}
      <section className="mx-auto max-w-[1160px] px-6 py-16 sm:px-12 sm:py-24">
        <SectionHeading index="03" title="Operating states" />
        <p className="mb-8 max-w-2xl text-text2">
          Color is never the only signal — every state pairs with a text
          label. <strong className="text-ink">Blackout</strong> and{" "}
          <strong className="text-ink">Revoke Automation</strong> always
          belong to the person in the room.
        </p>
        <StatusChipGrid />
      </section>

      {/* Lexicon */}
      <section className="border-y border-line bg-panel">
        <div className="mx-auto max-w-[1160px] px-6 py-16 sm:px-12 sm:py-24">
          <SectionHeading index="04" title="Core concepts" />
          <p className="mb-8 max-w-2xl text-text2">
            Used consistently across the UI, docs, and marketing — each term
            is a distinct concept on purpose.
          </p>
          <dl className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {LEXICON.map((l) => (
              <div key={l.term} className="rounded-xl border border-line p-5">
                <dt className="font-mono text-sm font-semibold text-ink">
                  {l.term}
                </dt>
                <dd className="mt-2 text-sm leading-6 text-text2">{l.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-[1160px] px-6 py-16 sm:px-12 sm:py-24">
        <div className="rounded-xl border border-line bg-panel p-8 text-center">
          <div className="mx-auto inline-flex h-10 w-10 items-center justify-center rounded-lg bg-page text-ink">
            <ApiIcon size={20} />
          </div>
          <h2 className="mt-4 text-xl font-bold text-ink">
            API and SDK reference come later.
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-text2">
            Once the external API (Phase 7) and TypeScript SDK (Phase 8)
            ship, this page grows to cover them. For now, the contributor
            walkthrough covers building GOLC itself.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <a
              href="https://github.com/lnorton89/golc/blob/master/docs/development.md"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-accent px-5 py-3 text-sm font-semibold text-panel transition-colors duration-[120ms] ease-out hover:bg-accent-dp"
            >
              Contributor walkthrough
            </a>
            <Link
              href="/architecture"
              className="rounded-md border border-line px-5 py-3 text-sm font-semibold text-ink transition-colors duration-[120ms] ease-out hover:border-accent hover:text-accent"
            >
              See the architecture
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

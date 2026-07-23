import type { Metadata } from "next";
import { Fragment } from "react";
import SectionHeading from "@/components/SectionHeading";
import DependencyGraph from "@/components/architecture/DependencyGraph";
import RepoTree from "@/components/architecture/RepoTree";
import { REPO_TREE } from "@/components/architecture/repoTreeData";
import { PackageIcon, ArrowRightIcon } from "@/components/icons";

function ExternalLinkIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="square"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M9 6H6a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-3M14 4h6v6M20 4l-9 9" />
    </svg>
  );
}

export const metadata: Metadata = {
  title: "Architecture",
  description:
    "How the GOLC codebase is put together — package dependencies, command routing, configuration layering, and external dependencies.",
};

const COMMAND_STEPS = [
  { label: "golc.ps1", body: "Provisions .tools/ on bootstrap; every other verb falls through to the pinned CLI." },
  { label: "cmd/golc-project", body: "Imports every command file, builds the default registry, applies the 0/1/2 exit-code mapping." },
  { label: "internal/command", body: "Each file self-registers a typed route via MustDeclareRoute — no central switch statement." },
  { label: "Domain packages", body: "config/test routes delegate straight into projectconfig, fixture, pool, show, artnet, and the rest." },
];

const CONCERNS = [
  "toolchain",
  "commands",
  "generation",
  "application_defaults",
  "runtime",
  "linear",
];

const DEPENDENCIES = [
  {
    name: "BurntSushi/toml",
    path: "github.com/BurntSushi/toml",
    version: "v1.6.0",
    body: "TOML parsing for every config/*.toml concern file.",
    usedBy: ["projectconfig"],
  },
  {
    name: "google/uuid",
    path: "github.com/google/uuid",
    version: "v1.6.0",
    body: "UUIDv7 identity for deployments and trace records.",
    usedBy: ["deployment", "trace/catalog"],
  },
  {
    name: "invopop/jsonschema",
    path: "github.com/invopop/jsonschema",
    version: "v0.14.0",
    body: "Generates the JSON Schemas under schemas/ from Go types.",
    usedBy: ["contracts"],
  },
  {
    name: "go.yaml.in/yaml/v4",
    path: "go.yaml.in/yaml/v4",
    version: "v4.0.0-rc.6",
    body: "Strict YAML 1.2 parsing for fixture definitions.",
    usedBy: ["fixture"],
  },
  {
    name: "modernc.org/sqlite",
    path: "modernc.org/sqlite",
    version: "v1.54.0",
    body: "Pure-Go SQLite (no cgo) — backs the show package's durable state.",
    usedBy: ["show"],
  },
  {
    name: "Microsoft/go-winio",
    path: "github.com/Microsoft/go-winio",
    version: "v0.6.2",
    body: "Windows named pipes — the Art-Net daemon/worker IPC transport.",
    usedBy: ["artnet/ipc"],
  },
];

export default function ArchitecturePage() {
  return (
    <div>
      {/* Hero */}
      <section className="border-b border-line bg-panel">
        <div className="mx-auto max-w-[1160px] px-6 py-20 sm:px-12 sm:py-28">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-page px-3 py-1 font-mono text-xs uppercase tracking-wider text-muted">
            github.com/lnorton89/golc
          </p>
          <h1 className="max-w-2xl text-[40px] font-extrabold leading-[1.05] tracking-[-0.03em] text-ink sm:text-[52px]">
            Architecture.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-text2">
            Six domains, layered bottom-up: foundation, traceability, and
            fixtures & pools sit underneath show authoring and playback &
            output, and every one of them is a leaf until{" "}
            <code className="rounded bg-page px-1.5 py-0.5 font-mono text-[0.9em] text-ink">
              internal/command
            </code>{" "}
            pulls it in as the one typed model every surface — UI, API,
            scripts, AI — will eventually route through.
          </p>
        </div>
      </section>

      {/* Dependency graph */}
      <section className="mx-auto max-w-[1160px] px-6 py-16 sm:px-12 sm:py-24">
        <SectionHeading index="01" title="Package dependency graph" />
        <p className="mb-8 max-w-2xl text-text2">
          Every real package under <code className="font-mono text-[0.9em]">internal/</code>,
          laid out by dependency depth — foundation at the bottom, the
          command hub at the top. Click a node to trace what it needs and
          what needs it.
        </p>
        <DependencyGraph />
      </section>

      {/* Command flow */}
      <section className="border-y border-line bg-panel">
        <div className="mx-auto max-w-[1160px] px-6 py-16 sm:px-12 sm:py-24">
          <SectionHeading index="02" title="How a command runs" />
          <div className="flex flex-col sm:flex-row sm:items-stretch">
            {COMMAND_STEPS.map((step, i) => (
              <Fragment key={step.label}>
                <div className="card-hover flex-1 rounded-xl border border-line bg-page p-5">
                  <p className="font-mono text-[10px] uppercase tracking-wider text-muted">
                    Step {i + 1}
                  </p>
                  <p className="mt-1 font-mono text-sm font-semibold text-ink">
                    {step.label}
                  </p>
                  <p className="mt-2 text-xs leading-5 text-text2">{step.body}</p>
                </div>
                {i < COMMAND_STEPS.length - 1 && (
                  <div className="flex items-center justify-center py-2 text-line sm:px-2 sm:py-0">
                    <ArrowRightIcon size={18} className="rotate-90 sm:rotate-0" />
                  </div>
                )}
              </Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* Repository layout */}
      <section className="mx-auto max-w-[1160px] px-6 py-16 sm:px-12 sm:py-24">
        <SectionHeading index="03" title="Repository layout" />
        <p className="mb-8 max-w-2xl text-text2">
          The real directory tree, down to package level. Click any row with
          a chevron to expand it.
        </p>
        <RepoTree data={REPO_TREE} />
      </section>

      {/* Config layering */}
      <section className="border-y border-line bg-panel">
        <div className="mx-auto max-w-[1160px] px-6 py-16 sm:px-12 sm:py-24">
          <SectionHeading index="04" title="Configuration layering" />
          <p className="mb-8 max-w-2xl text-text2">
            <code className="font-mono text-[0.9em]">golc.project.toml</code>{" "}
            holds only schema and index metadata — every value lives in
            exactly one concern file, referenced by canonical key rather than
            duplicated.
          </p>

          <div className="flex flex-col items-center gap-3">
            <div className="rounded-xl border border-line bg-page px-5 py-3 font-mono text-sm text-ink">
              golc.project.toml <span className="text-muted">· index only</span>
            </div>
            <div className="h-6 w-px bg-line" />
            <div className="flex flex-wrap justify-center gap-2">
              {CONCERNS.map((c) => (
                <span
                  key={c}
                  className="rounded-full border border-line bg-page px-3 py-1.5 font-mono text-xs text-text2"
                >
                  {c}.toml
                </span>
              ))}
            </div>
            <div className="h-6 w-px bg-line" />
            <div className="rounded-xl border border-dashed border-line bg-page px-5 py-3 font-mono text-sm text-muted">
              golc.local.toml <span className="text-muted">· git-ignored overrides</span>
            </div>
          </div>

          <p className="mx-auto mt-8 max-w-lg rounded-xl border border-line bg-page px-5 py-4 text-center font-mono text-xs leading-6 text-text2">
            go_version = &quot;ref:toolchain.go.version&quot;
            <br />
            <span className="text-muted">
              — commands.toml references the pin instead of duplicating it
            </span>
          </p>
        </div>
      </section>

      {/* External dependencies */}
      <section className="mx-auto max-w-[1160px] px-6 py-16 sm:px-12 sm:py-24">
        <SectionHeading index="05" title="External dependencies" />
        <p className="mb-8 max-w-2xl text-text2">
          The direct requires in <code className="font-mono text-[0.9em]">go.mod</code> —
          module <code className="font-mono text-[0.9em]">github.com/lnorton89/golc</code>,
          Go 1.26.5.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {DEPENDENCIES.map((d) => (
            <a
              key={d.path}
              href={`https://pkg.go.dev/${d.path}`}
              target="_blank"
              rel="noopener noreferrer"
              className="card-hover group rounded-xl border border-line bg-panel p-5"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-page text-ink">
                    <PackageIcon size={16} />
                  </span>
                  <p className="font-mono text-sm font-semibold text-ink">
                    {d.name}
                  </p>
                </div>
                <span className="mt-1 text-muted transition-colors duration-[120ms] ease-out group-hover:text-accent">
                  <ExternalLinkIcon />
                </span>
              </div>
              <p className="mt-1 truncate font-mono text-[10px] text-muted">
                {d.path}
              </p>
              <p className="mt-3 text-xs leading-5 text-text2">{d.body}</p>
              <div className="mt-4 flex flex-wrap items-center gap-1.5">
                <span className="rounded-full border border-line bg-page px-2 py-0.5 font-mono text-[10px] text-text2">
                  {d.version}
                </span>
                {d.usedBy.map((u) => (
                  <span
                    key={u}
                    className="rounded-full border border-line bg-page px-2 py-0.5 font-mono text-[10px] text-muted"
                  >
                    {u}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}

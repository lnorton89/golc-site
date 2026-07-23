import Link from "next/link";
import type { Metadata } from "next";
import { PHASES } from "@/components/roadmap/phaseData";
import { PHASE_ICON, STATUS_COLOR } from "@/components/roadmap/PhaseDetail";
import { GitHubIcon, TimelineIcon, ArrowRightIcon } from "@/components/icons";

const changelogDescription =
  "What's shipped in GOLC so far, phase by phase, generated from the roadmap.";

export const metadata: Metadata = {
  title: "Development Log",
  description: changelogDescription,
  alternates: { canonical: "/changelog" },
  openGraph: {
    siteName: "GOLC",
    type: "website",
    locale: "en_US",
    title: "Development Log · GOLC",
    description: changelogDescription,
    url: "/changelog",
  },
  twitter: {
    card: "summary_large_image",
    title: "Development Log · GOLC",
    description: changelogDescription,
  },
};

const SPECTRUM = [
  "var(--spectrum-1)",
  "var(--spectrum-2)",
  "var(--spectrum-3)",
  "var(--spectrum-4)",
  "var(--spectrum-5)",
  "var(--spectrum-6)",
];

export default function ChangelogPage() {
  const shipped = PHASES.filter((p) => p.completedAt).sort((a, b) =>
    b.completedAt!.localeCompare(a.completedAt!)
  );
  const active = PHASES.find((p) => p.status === "active");
  const ActiveIcon = active ? PHASE_ICON[active.icon] : TimelineIcon;

  return (
    <div className="mx-auto max-w-[1160px] px-6 py-16 sm:px-12 sm:py-24">
      <span className="block font-mono text-[13px] tracking-[1.3px] text-link">
        Generated from the roadmap
      </span>
      <h1 className="mt-1 max-w-3xl text-[44px] font-extrabold leading-tight tracking-[-0.03em] text-ink sm:text-[52px]">
        Development Log
      </h1>
      <p className="mt-4 max-w-xl text-text2">
        GOLC hasn&apos;t shipped a qualified release, so there are no
        version-numbered release notes yet — this log tracks what each
        completed phase actually delivered. Once Phase 10 (Windows Release
        Qualification) lands, this becomes proper release notes.
      </p>

      {active && (
        <div
          className="card-hover mt-10 rounded-xl border border-line bg-panel p-6"
          style={{ borderTopColor: "var(--status-armed)", borderTopWidth: 2 }}
        >
          <div className="flex items-start gap-4">
            <div
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
              style={{ background: "color-mix(in srgb, var(--status-armed) 16%, transparent)", color: "var(--status-armed)" }}
            >
              <ActiveIcon size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-status-armed" aria-hidden />
                <span className="font-mono text-xs uppercase tracking-wider text-muted">
                  In progress · {active.plans}
                </span>
              </div>
              <h2 className="mt-1 text-lg font-semibold text-ink">
                Phase {String(active.n).padStart(2, "0")}: {active.title}
              </h2>
              <p className="mt-1 text-sm leading-6 text-text2">{active.body}</p>
            </div>
          </div>
        </div>
      )}

      <ol className="mt-10 space-y-4 border-l border-line pl-6">
        {shipped.map((p, i) => {
          const Icon = PHASE_ICON[p.icon];
          const color = SPECTRUM[i % SPECTRUM.length];
          return (
            <li key={p.n} className="relative">
              <span
                className="absolute -left-[31px] top-6 inline-block h-2.5 w-2.5 rounded-full border-2 border-page"
                style={{ background: STATUS_COLOR[p.status] }}
                aria-hidden
              />
              <div
                className="card-hover rounded-xl border border-line bg-panel p-5"
                style={{ borderTopColor: color, borderTopWidth: 2 }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                    style={{ background: `color-mix(in srgb, ${color} 16%, transparent)`, color }}
                  >
                    <Icon size={20} />
                  </div>
                  <div className="min-w-0">
                    <p className="font-mono text-xs text-muted">{p.completedAt}</p>
                    <h2 className="mt-0.5 text-lg font-semibold text-ink">
                      Phase {String(p.n).padStart(2, "0")}: {p.title}
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-text2">{p.body}</p>
                    <p className="mt-2 font-mono text-xs text-muted">{p.plans}</p>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ol>

      <div className="mt-10 flex flex-wrap gap-4">
        <a
          href="https://github.com/lnorton89/golc/commits/master"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-semibold text-on-accent transition-colors duration-[120ms] ease-out hover:bg-accent-dp"
        >
          <GitHubIcon size={16} />
          Full commit history
        </a>
        <Link
          href="/roadmap"
          className="inline-flex items-center gap-2 rounded-md border border-line px-5 py-3 text-sm font-semibold text-ink transition-colors duration-[120ms] ease-out hover:border-accent hover:text-accent"
        >
          See the roadmap
          <ArrowRightIcon size={16} />
        </Link>
      </div>
    </div>
  );
}

import Link from "next/link";
import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import { GitHubIcon, TerminalIcon, PackageIcon, WindowsIcon, AppleIcon, LinuxIcon, DocIcon } from "@/components/icons";

const downloadDescription =
  "GOLC hasn't shipped a qualified release yet. Track progress on the roadmap or build from source.";

export const metadata: Metadata = {
  title: "Download",
  description: downloadDescription,
  alternates: { canonical: "/download" },
  openGraph: {
    siteName: "GOLC",
    type: "website",
    locale: "en_US",
    title: "Download · GOLC",
    description: downloadDescription,
    url: "/download",
  },
  twitter: {
    card: "summary_large_image",
    title: "Download · GOLC",
    description: downloadDescription,
  },
};

const PLATFORMS = [
  {
    name: "Windows",
    status: "Qualified for v1",
    detail: "Phase 10 (Windows Release Qualification) has not started — no build has been produced or tested yet.",
    Icon: WindowsIcon,
    color: "var(--spectrum-5)",
  },
  {
    name: "macOS",
    status: "Not planned for v1",
    detail: "Portability is preserved architecturally; official support is out of scope for v1.",
    Icon: AppleIcon,
    color: "var(--muted)",
  },
  {
    name: "Linux",
    status: "Not planned for v1",
    detail: "Portability is preserved architecturally; official support is out of scope for v1.",
    Icon: LinuxIcon,
    color: "var(--muted)",
  },
];

export default function DownloadPage() {
  return (
    <div>
      <section className="border-b border-line bg-panel">
        <div className="mx-auto max-w-[1160px] px-6 py-20 sm:px-12 sm:py-28">
          <span className="block font-mono text-[13px] tracking-[1.3px] text-link">
            No release yet
          </span>
          <h1 className="mt-1 max-w-2xl text-[40px] font-extrabold leading-[1.05] tracking-[-0.03em] text-ink sm:text-[52px]">
            Download.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-text2">
            GOLC hasn&apos;t reached a qualified release. Windows packaging
            and install verification are Phase 10 work, which depends on
            Phases 6 through 9 first.{" "}
            <Link href="/roadmap" className="text-link underline underline-offset-2 hover:text-accent-dp">
              See where the project stands today
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1160px] px-6 py-16 sm:px-12 sm:py-24">
        <SectionHeading index="01" title="Planned platform support" />
        <div className="grid gap-6 sm:grid-cols-3">
          {PLATFORMS.map((p) => (
            <div
              key={p.name}
              className="card-hover rounded-xl border border-line bg-panel p-6"
              style={{ borderTopColor: p.color, borderTopWidth: 2 }}
            >
              <div
                className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg"
                style={{ background: `color-mix(in srgb, ${p.color} 16%, transparent)`, color: p.color }}
              >
                <p.Icon size={20} />
              </div>
              <h3 className="text-lg font-semibold text-ink">{p.name}</h3>
              <p className="mt-1 font-mono text-xs uppercase tracking-wider text-muted">
                {p.status}
              </p>
              <p className="mt-3 text-sm leading-6 text-text2">{p.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-panel">
        <div className="mx-auto max-w-[1160px] px-6 py-16 sm:px-12 sm:py-24">
          <SectionHeading index="02" title="License and requirements" />
          <div className="grid gap-6 sm:grid-cols-2">
            <div
              className="card-hover rounded-xl border border-line bg-page p-6"
              style={{ borderTopColor: "var(--spectrum-4)", borderTopWidth: 2 }}
            >
              <div
                className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg"
                style={{ background: "color-mix(in srgb, var(--spectrum-4) 16%, transparent)", color: "var(--spectrum-4)" }}
              >
                <PackageIcon size={20} />
              </div>
              <h3 className="text-lg font-semibold text-ink">License</h3>
              <p className="mt-2 text-sm leading-6 text-text2">
                GOLC is licensed under the{" "}
                <a
                  href="https://github.com/lnorton89/golc/blob/master/LICENSE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-link underline underline-offset-2 hover:text-accent-dp"
                >
                  GNU GPL v3.0
                </a>
                . The source is public today, even though no packaged build
                exists yet.
              </p>
            </div>
            <div
              className="card-hover rounded-xl border border-line bg-page p-6"
              style={{ borderTopColor: "var(--spectrum-6)", borderTopWidth: 2 }}
            >
              <div
                className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg"
                style={{ background: "color-mix(in srgb, var(--spectrum-6) 16%, transparent)", color: "var(--spectrum-6)" }}
              >
                <DocIcon size={20} />
              </div>
              <h3 className="text-lg font-semibold text-ink">System requirements</h3>
              <p className="mt-2 text-sm leading-6 text-text2">
                The supported Windows version/architecture matrix, WebView
                runtime dependency, and hardware minimums are Phase 10
                deliverables and will be published here once they&apos;re
                qualified with measured evidence — not before.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1160px] px-6 py-16 sm:px-12 sm:py-24">
        <div className="cta-pattern relative overflow-hidden rounded-xl border border-line px-8 py-14 text-center">
          <div className="relative mx-auto inline-flex h-10 w-10 items-center justify-center rounded-lg bg-page text-ink">
            <TerminalIcon size={20} />
          </div>
          <h2 className="relative mt-4 text-xl font-bold text-ink">
            Build from source in the meantime.
          </h2>
          <p className="relative mx-auto mt-2 max-w-md text-sm text-text2">
            Every contributor command runs offline through a single pinned
            entrypoint — no manually installed toolchain required.
          </p>
          <div className="relative mt-6 flex flex-wrap justify-center gap-4">
            <a
              href="https://github.com/lnorton89/golc/blob/master/docs/development.md"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-semibold text-on-accent transition-colors duration-[120ms] ease-out hover:bg-accent-dp"
            >
              <DocIcon size={16} />
              Contributor walkthrough
            </a>
            <a
              href="https://github.com/lnorton89/golc"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-line px-5 py-3 text-sm font-semibold text-ink transition-colors duration-[120ms] ease-out hover:border-accent hover:text-accent"
            >
              <GitHubIcon size={16} />
              Watch the repo for releases
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

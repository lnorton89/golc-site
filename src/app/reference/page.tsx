import Link from "next/link";
import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import ReferenceExplorer from "@/components/docs/ReferenceExplorer";
import { getReferencePages } from "@/lib/reference";
import { GearIcon, DocIcon, ArrowRightIcon } from "@/components/icons";

const referenceDescription =
  "Generated Go package reference for GOLC contributors — straight from the source's doc comments.";

export const metadata: Metadata = {
  title: "Code Reference",
  description: referenceDescription,
  alternates: { canonical: "/reference" },
  openGraph: {
    siteName: "GOLC",
    type: "website",
    locale: "en_US",
    title: "Code Reference · GOLC",
    description: referenceDescription,
    url: "/reference",
  },
  twitter: {
    card: "summary_large_image",
    title: "Code Reference · GOLC",
    description: referenceDescription,
  },
};

export default function ReferencePage() {
  const referencePages = getReferencePages();

  return (
    <div>
      <section className="border-b border-line bg-panel">
        <div className="mx-auto max-w-[1160px] px-6 py-20 sm:px-12 sm:py-28">
          <span className="block font-mono text-[13px] tracking-[1.3px] text-link">
            For contributors
          </span>
          <h1 className="mt-1 max-w-2xl text-[40px] font-extrabold leading-[1.05] tracking-[-0.03em] text-ink sm:text-[52px]">
            Code reference.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-text2">
            Looking for how to use GOLC? See the{" "}
            <Link href="/docs" className="text-link hover:underline">
              Docs
            </Link>{" "}
            page instead — this is the Go package reference for people
            working on the codebase itself.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1160px] px-6 py-16 sm:px-12 sm:py-24">
        <SectionHeading index="01" title="Go package reference" />
        <p className="mb-8 max-w-2xl text-text2">
          Generated straight from the Go package doc comments in the golc
          repository (<code className="rounded bg-page px-1 py-0.5 font-mono text-[13px] text-ink">golc.ps1 docs</code>{" "}
          regenerates this section) — no hand-maintained copy to drift from
          the source.
        </p>
        <ReferenceExplorer pages={referencePages} />
      </section>

      <section className="mx-auto max-w-[1160px] px-6 py-16 sm:px-12 sm:py-24">
        <div className="cta-pattern relative overflow-hidden rounded-xl border border-line px-8 py-14 text-center">
          <div className="relative mx-auto inline-flex h-10 w-10 items-center justify-center rounded-lg bg-page text-ink">
            <GearIcon size={20} />
          </div>
          <h2 className="relative mt-4 text-xl font-bold text-ink">
            Building GOLC itself?
          </h2>
          <p className="relative mx-auto mt-2 max-w-md text-sm text-text2">
            The contributor walkthrough covers bootstrap, configuration, and
            the test workflow.
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
            <Link
              href="/architecture"
              className="inline-flex items-center gap-2 rounded-md border border-line px-5 py-3 text-sm font-semibold text-ink transition-colors duration-[120ms] ease-out hover:border-accent hover:text-accent"
            >
              See the architecture
              <ArrowRightIcon size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

import Link from "next/link";
import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import StatusChipGrid from "@/components/StatusChip";
import ViewExplorer from "@/components/docs/ViewExplorer";
import { ApiIcon, PackageIcon, ArrowRightIcon } from "@/components/icons";

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

export default function DocsPage() {
  return (
    <div>
      {/* Hero */}
      <section className="border-b border-line bg-panel">
        <div className="mx-auto max-w-290 px-6 py-20 sm:px-12 sm:py-28">
          <span className="block font-mono text-[13px] tracking-[1.3px] text-link">
            How the program works
          </span>
          <h1 className="mt-1 max-w-2xl text-[40px] font-extrabold leading-[1.05] tracking-[-0.03em] text-ink sm:text-[52px]">
            Docs.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-text2">
            Learn the current desktop workspaces and the product concepts
            behind patching, programming, playback, and automation.
          </p>
        </div>
      </section>

      {/* Explore by view */}
      <section className="mx-auto max-w-290 px-6 py-16 sm:px-12 sm:py-24">
        <SectionHeading index="01" title="Desktop views" />
        <p className="mb-8 max-w-2xl text-text2">
          The generated guide follows the desktop shell directly: all twelve
          Show, Build, Operate, and Output destinations, with current
          screenshots and principal operator actions.
        </p>
        <Link
          href="/docs/desktop-views"
          className="card-hover mb-16 flex items-center justify-between gap-6 rounded-xl border border-line bg-panel p-6 text-ink"
        >
          <span>
            <span className="block text-lg font-bold">Browse the desktop views guide</span>
            <span className="mt-1 block text-sm leading-6 text-text2">
              Find the purpose, controls, concepts, and operating notes for every workspace.
            </span>
          </span>
          <ArrowRightIcon size={20} className="shrink-0 text-link" />
        </Link>

        <SectionHeading index="02" title="Product concepts" />
        <p className="mb-8 max-w-2xl text-text2">
          These representative concepts explain how authoring, playback,
          scripting, and operator safety fit together across the workspaces.
        </p>
        <ViewExplorer />
      </section>

      {/* Operating states */}
      <section className="border-y border-line bg-panel">
        <div className="mx-auto max-w-290 px-6 py-16 sm:px-12 sm:py-24">
          <SectionHeading index="03" title="Operating states" />
          <p className="mb-8 max-w-2xl text-text2">
            Color is never the only signal — every state pairs with a text
            label. <strong className="text-ink">Blackout</strong> and{" "}
            <strong className="text-ink">Revoke Automation</strong> always
            belong to the person in the room.
          </p>
          <StatusChipGrid />
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-290 px-6 py-16 sm:px-12 sm:py-24">
        <div className="cta-pattern relative overflow-hidden rounded-xl border border-line px-8 py-14 text-center">
          <div className="relative mx-auto inline-flex h-10 w-10 items-center justify-center rounded-lg bg-page text-ink">
            <ApiIcon size={20} />
          </div>
          <h2 className="relative mt-4 text-xl font-bold text-ink">
            API and SDK reference.
          </h2>
          <p className="relative mx-auto mt-2 max-w-md text-sm text-text2">
            The external API and TypeScript SDK shipped in Phases 7 and 8 —
            browse their generated reference below.
          </p>
          <div className="relative mt-6 flex flex-wrap justify-center gap-4">
            <Link
              href="/reference"
              className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-semibold text-on-accent transition-colors duration-120 ease-out hover:bg-accent-dp"
            >
              <PackageIcon size={16} />
              Browse the code reference
            </Link>
            <Link
              href="/architecture"
              className="inline-flex items-center gap-2 rounded-md border border-line px-5 py-3 text-sm font-semibold text-ink transition-colors duration-120 ease-out hover:border-accent hover:text-accent"
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

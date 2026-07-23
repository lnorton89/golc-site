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
        <div className="mx-auto max-w-[1160px] px-6 py-20 sm:px-12 sm:py-28">
          <span className="block font-mono text-[13px] tracking-[1.3px] text-link">
            How the program works
          </span>
          <h1 className="mt-1 max-w-2xl text-[40px] font-extrabold leading-[1.05] tracking-[-0.03em] text-ink sm:text-[52px]">
            Docs.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-text2">
            Phase 6 (the Wails desktop UI) is in progress but not yet
            usable end-to-end. This page covers the product concepts and
            workflow as designed. Reference docs for the API and TypeScript
            SDK publish once those phases ship.
          </p>
        </div>
      </section>

      {/* Explore by view */}
      <section className="mx-auto max-w-[1160px] px-6 py-16 sm:px-12 sm:py-24">
        <SectionHeading index="01" title="Explore by view" />
        <p className="mb-8 max-w-2xl text-text2">
          GOLC v1 is five representative views in one Wails desktop app —
          author once, deploy repeatedly. Each is also a stage in how a show
          comes together: select a view to see where it sits in the
          workflow, the concepts it introduces, and the states it shows.
        </p>
        <ViewExplorer />
      </section>

      {/* Operating states */}
      <section className="border-y border-line bg-panel">
        <div className="mx-auto max-w-[1160px] px-6 py-16 sm:px-12 sm:py-24">
          <SectionHeading index="02" title="Operating states" />
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
      <section className="mx-auto max-w-[1160px] px-6 py-16 sm:px-12 sm:py-24">
        <div className="cta-pattern relative overflow-hidden rounded-xl border border-line px-8 py-14 text-center">
          <div className="relative mx-auto inline-flex h-10 w-10 items-center justify-center rounded-lg bg-page text-ink">
            <ApiIcon size={20} />
          </div>
          <h2 className="relative mt-4 text-xl font-bold text-ink">
            API and SDK reference come later.
          </h2>
          <p className="relative mx-auto mt-2 max-w-md text-sm text-text2">
            Once the external API (Phase 7) and TypeScript SDK (Phase 8)
            ship, this page grows to cover them.
          </p>
          <div className="relative mt-6 flex flex-wrap justify-center gap-4">
            <Link
              href="/reference"
              className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-semibold text-on-accent transition-colors duration-[120ms] ease-out hover:bg-accent-dp"
            >
              <PackageIcon size={16} />
              Browse the code reference
            </Link>
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

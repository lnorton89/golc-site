import Link from "next/link";
import type { Metadata } from "next";

const docsDescription = "GOLC documentation — coming soon.";

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
    <div className="mx-auto max-w-[1160px] px-6 py-16 sm:px-12 sm:py-24">
      <span className="block font-mono text-[13px] tracking-[1.3px] text-accent">
        Coming soon
      </span>
      <h1 className="mt-1 max-w-3xl text-[44px] font-extrabold leading-tight tracking-[-0.03em] text-ink sm:text-[52px]">
        Docs
      </h1>
      <p className="mt-4 max-w-xl text-text2">
        GOLC is early in development, and reference docs will publish here
        as the command model, API, and TypeScript SDK stabilize. In the
        meantime, the contributor walkthrough and architecture notes live in
        the repository.
      </p>
      <div className="mt-8 flex flex-wrap gap-4">
        <a
          href="https://github.com/lnorton89/golc/blob/master/docs/development.md"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-md bg-accent px-5 py-3 text-sm font-semibold text-panel transition-colors duration-[120ms] ease-out hover:bg-accent-dp"
        >
          Contributor walkthrough
        </a>
        <Link
          href="/roadmap"
          className="rounded-md border border-line px-5 py-3 text-sm font-semibold text-ink transition-colors duration-[120ms] ease-out hover:border-accent hover:text-accent"
        >
          See the roadmap
        </Link>
      </div>
    </div>
  );
}

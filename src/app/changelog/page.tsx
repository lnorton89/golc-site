import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Changelog",
  description: "GOLC changelog — coming soon.",
};

export default function ChangelogPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
      <p className="font-mono text-xs uppercase tracking-wider text-muted">
        Coming soon
      </p>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
        Changelog
      </h1>
      <p className="mt-4 max-w-xl text-text2">
        Release notes will appear here once GOLC ships its first qualified
        build. Until then, phase-by-phase progress is tracked on the roadmap
        and in the commit history.
      </p>
      <div className="mt-8 flex flex-wrap gap-4">
        <a
          href="https://github.com/lnorton89/golc/commits/master"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-md bg-accent px-5 py-3 text-sm font-semibold text-panel transition-colors hover:bg-accent-dp"
        >
          Commit history
        </a>
        <Link
          href="/roadmap"
          className="rounded-md border border-line px-5 py-3 text-sm font-semibold text-ink transition-colors hover:border-accent hover:text-accent"
        >
          See the roadmap
        </Link>
      </div>
    </div>
  );
}

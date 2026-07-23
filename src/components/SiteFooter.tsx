import Link from "next/link";
import GolcMark from "./GolcMark";

export default function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-[1160px] flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-12">
        <div className="flex items-center gap-3">
          <GolcMark size={24} />
          <p className="font-mono text-xs text-muted">
            GOLC · deterministic Art-Net playback · built in Go
          </p>
        </div>
        <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-text2">
          <Link href="/roadmap" className="hover:text-accent">
            Roadmap
          </Link>
          <Link href="/docs" className="hover:text-accent">
            Docs
          </Link>
          <Link href="/changelog" className="hover:text-accent">
            Changelog
          </Link>
          <a
            href="https://github.com/lnorton89/golc"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent"
          >
            GitHub
          </a>
        </nav>
      </div>
    </footer>
  );
}

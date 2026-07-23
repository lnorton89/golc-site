import Link from "next/link";
import GolcMark from "./GolcMark";

export default function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-[1160px] flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-12">
        <div className="flex items-center gap-3">
          <GolcMark size={24} />
          <p className="font-mono text-xs text-muted">
            GOLC · deterministic Art-Net playback · built in Go ·{" "}
            <a
              href="https://github.com/lnorton89/golc/blob/master/LICENSE"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-[120ms] ease-out hover:text-accent"
            >
              GPL-3.0
            </a>
          </p>
        </div>
        <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-text2">
          <Link href="/docs" className="transition-colors duration-[120ms] ease-out hover:text-accent">
            Docs
          </Link>
          <Link href="/download" className="transition-colors duration-[120ms] ease-out hover:text-accent">
            Download
          </Link>
          <Link href="/architecture" className="transition-colors duration-[120ms] ease-out hover:text-accent">
            Architecture
          </Link>
          <Link href="/roadmap" className="transition-colors duration-[120ms] ease-out hover:text-accent">
            Roadmap
          </Link>
          <Link href="/changelog" className="transition-colors duration-[120ms] ease-out hover:text-accent">
            Development Log
          </Link>
          <a
            href="https://github.com/lnorton89/golc"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-[120ms] ease-out hover:text-accent"
          >
            GitHub
          </a>
        </nav>
      </div>
    </footer>
  );
}

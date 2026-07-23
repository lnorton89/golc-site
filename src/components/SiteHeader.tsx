import Link from "next/link";
import GolcMark from "./GolcMark";
import ThemeToggle from "./ThemeToggle";

const NAV = [
  { href: "/roadmap", label: "Roadmap" },
  { href: "/docs", label: "Docs" },
  { href: "/changelog", label: "Changelog" },
];

export default function SiteHeader() {
  return (
    <header className="border-b border-line">
      <div className="mx-auto flex max-w-[1160px] items-center justify-between px-6 py-4 sm:px-12">
        <Link href="/" className="flex items-center gap-3">
          <GolcMark size={32} />
          <span className="flex flex-col leading-none">
            <span className="text-lg font-extrabold tracking-[-0.02em] text-ink">
              GOLC
            </span>
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
              Go Lighting Control
            </span>
          </span>
        </Link>

        <nav className="flex items-center gap-6">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-text2 transition-colors duration-[120ms] ease-out hover:text-accent"
            >
              {item.label}
            </Link>
          ))}
          <a
            href="https://github.com/lnorton89/golc"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-line px-3 py-1.5 text-sm font-medium text-ink transition-colors duration-[120ms] ease-out hover:border-accent hover:text-accent"
          >
            GitHub
          </a>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}

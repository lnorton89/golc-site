import Link from "next/link";
import GolcMark from "./GolcMark";
import ThemeToggle from "./ThemeToggle";
import MobileMenu from "./MobileMenu";
import { GitHubIcon } from "./icons";

const NAV = [
  { href: "/architecture", label: "Architecture" },
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

        <div className="flex items-center gap-3">
          <nav className="hidden items-center gap-6 sm:flex">
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
              className="inline-flex items-center gap-1.5 rounded-md bg-accent px-3 py-1.5 text-sm font-medium text-panel transition-colors duration-[120ms] ease-out hover:bg-accent-dp"
            >
              <GitHubIcon size={15} />
              GitHub
            </a>
          </nav>
          <ThemeToggle />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}

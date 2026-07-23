"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { MenuIcon, CloseIcon, GitHubIcon } from "./icons";

const NAV = [
  { href: "/#workflow", label: "Workflow" },
  { href: "/docs", label: "Docs" },
  { href: "/download", label: "Download" },
];

const RESOURCES = [
  { href: "/architecture", label: "Architecture" },
  { href: "/roadmap", label: "Roadmap" },
  { href: "/changelog", label: "Development Log" },
  { href: "/reference", label: "Code Reference" },
];

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const firstLink = panelRef.current?.querySelector("a");
    (firstLink as HTMLAnchorElement | null)?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div className="sm:hidden">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-menu-panel"
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line bg-panel text-ink transition-colors duration-[120ms] ease-out hover:border-accent"
      >
        {open ? <CloseIcon size={16} /> : <MenuIcon size={16} />}
      </button>

      {open && (
        <div
          id="mobile-menu-panel"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="fixed inset-x-0 top-[65px] z-50 border-b border-line bg-page px-6 py-4 shadow-lg"
        >
          <nav className="flex flex-col gap-1">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-2.5 text-sm text-text2 transition-colors duration-[120ms] ease-out hover:bg-panel hover:text-accent"
              >
                {item.label}
              </Link>
            ))}

            <p className="mt-3 px-2 font-mono text-[10px] uppercase tracking-wider text-muted">
              Resources
            </p>
            {RESOURCES.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-2.5 text-sm text-text2 transition-colors duration-[120ms] ease-out hover:bg-panel hover:text-accent"
              >
                {item.label}
              </Link>
            ))}

            <a
              href="https://github.com/lnorton89/golc"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="mt-3 inline-flex items-center gap-2 rounded-md bg-accent px-3 py-2.5 text-sm font-medium text-on-accent transition-colors duration-[120ms] ease-out hover:bg-accent-dp"
            >
              <GitHubIcon size={15} />
              GitHub
            </a>
          </nav>
        </div>
      )}
    </div>
  );
}

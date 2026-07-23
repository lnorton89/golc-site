"use client";

import { useState } from "react";
import Link from "next/link";
import { MenuIcon, CloseIcon, GitHubIcon } from "./icons";

const NAV = [
  { href: "/architecture", label: "Architecture" },
  { href: "/roadmap", label: "Roadmap" },
  { href: "/docs", label: "Docs" },
  { href: "/changelog", label: "Changelog" },
];

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="sm:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line bg-panel text-ink transition-colors duration-[120ms] ease-out hover:border-accent"
      >
        {open ? <CloseIcon size={16} /> : <MenuIcon size={16} />}
      </button>

      {open && (
        <div className="fixed inset-x-0 top-[65px] z-50 border-b border-line bg-page px-6 py-4 shadow-lg">
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
            <a
              href="https://github.com/lnorton89/golc"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center gap-2 rounded-md border border-line px-3 py-2.5 text-sm font-medium text-muted transition-colors duration-[120ms] ease-out hover:border-accent hover:text-accent"
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

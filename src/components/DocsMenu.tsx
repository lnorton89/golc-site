"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronRightIcon } from "./icons";

const DOCS_LINKS = [
  { href: "/docs", label: "Docs overview" },
  { href: "/docs/desktop-views", label: "Desktop Views" },
];

export default function DocsMenu() {
  const pathname = usePathname();
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const [open, setOpen] = useState(false);
  const active = pathname === "/docs" || pathname.startsWith("/docs/");

  useEffect(() => {
    function closeMenu() {
      if (detailsRef.current) detailsRef.current.open = false;
      setOpen(false);
    }

    function onDocClick(event: MouseEvent) {
      if (detailsRef.current && !detailsRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") closeMenu();
    }

    document.addEventListener("click", onDocClick);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  function closeMenu() {
    if (detailsRef.current) detailsRef.current.open = false;
    setOpen(false);
  }

  return (
    <details
      ref={detailsRef}
      className="group relative"
      onToggle={(event) => setOpen(event.currentTarget.open)}
    >
      <summary
        role="button"
        aria-current={active ? "page" : undefined}
        aria-expanded={open}
        className={`flex cursor-pointer list-none items-center gap-1 rounded-sm text-sm transition-colors duration-[120ms] ease-out hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent [&::-webkit-details-marker]:hidden ${
          active ? "font-semibold text-link" : "text-text2"
        }`}
      >
        Docs
        <ChevronRightIcon
          size={11}
          className="rotate-90 transition-transform duration-[120ms] ease-out group-open:-rotate-90"
        />
      </summary>
      <div className="menu-panel absolute left-0 top-full z-50 mt-3 w-48 origin-top-left rounded-xl border border-line bg-panel p-2 shadow-lg">
        {DOCS_LINKS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            aria-current={pathname === item.href ? "page" : undefined}
            onClick={closeMenu}
            className="card-hover block rounded-lg px-3 py-2.5 text-sm font-medium text-ink transition-colors duration-[120ms] ease-out hover:bg-page hover:text-link focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </details>
  );
}

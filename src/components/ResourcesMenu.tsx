"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { ChevronRightIcon } from "./icons";

const RESOURCES = [
  { href: "/architecture", label: "Architecture", body: "Package graph, command routing, config layering." },
  { href: "/roadmap", label: "Roadmap", body: "Phase-by-phase progress and success criteria." },
  { href: "/changelog", label: "Development Log", body: "What shipped, phase by phase." },
  { href: "/reference", label: "Code Reference", body: "Generated Go package documentation." },
];

export default function ResourcesMenu() {
  const pathname = usePathname();
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const active = RESOURCES.some((r) => r.href === pathname);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (detailsRef.current && !detailsRef.current.contains(e.target as Node)) {
        detailsRef.current.open = false;
      }
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && detailsRef.current) {
        detailsRef.current.open = false;
      }
    }
    document.addEventListener("click", onDocClick);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <details ref={detailsRef} className="group relative">
      <summary
        className={`flex cursor-pointer list-none items-center gap-1 text-sm transition-colors duration-[120ms] ease-out hover:text-accent [&::-webkit-details-marker]:hidden ${
          active ? "font-semibold text-link" : "text-text2"
        }`}
      >
        Resources
        <ChevronRightIcon size={11} className="rotate-90 transition-transform duration-[120ms] ease-out group-open:-rotate-90" />
      </summary>
      <div className="menu-panel absolute right-0 top-full z-50 mt-3 w-64 origin-top-right rounded-xl border border-line bg-panel p-2 shadow-lg">
        {RESOURCES.map((r) => (
          <Link
            key={r.href}
            href={r.href}
            aria-current={pathname === r.href ? "page" : undefined}
            onClick={() => {
              if (detailsRef.current) detailsRef.current.open = false;
            }}
            className="card-hover block rounded-lg px-3 py-2.5 transition-colors duration-[120ms] ease-out hover:bg-page hover:text-link"
          >
            <span className="block text-sm font-medium text-ink transition-colors duration-[120ms] ease-out group-hover:text-link">{r.label}</span>
            <span className="block text-xs text-text2">{r.body}</span>
          </Link>
        ))}
      </div>
    </details>
  );
}

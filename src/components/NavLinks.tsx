"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ResourcesMenu from "./ResourcesMenu";

const NAV = [
  { href: "/#workflow", label: "Workflow" },
  { href: "/docs", label: "Docs" },
  { href: "/download", label: "Download" },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {NAV.map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={`text-sm transition-colors duration-[120ms] ease-out hover:text-accent ${
              active ? "font-semibold text-link" : "text-text2"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
      <ResourcesMenu />
    </>
  );
}

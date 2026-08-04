"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import DocsMenu from "./DocsMenu";
import ResourcesMenu from "./ResourcesMenu";

export default function NavLinks() {
  const pathname = usePathname();
  const downloadActive = pathname === "/download";

  return (
    <>
      <Link
        href="/#workflow"
        className="text-sm text-text2 transition-colors duration-120 ease-out hover:text-accent"
      >
        Workflow
      </Link>
      <DocsMenu />
      <Link
        href="/download"
        aria-current={downloadActive ? "page" : undefined}
        className={`text-sm transition-colors duration-120 ease-out hover:text-accent ${
          downloadActive ? "font-semibold text-link" : "text-text2"
        }`}
      >
        Download
      </Link>
      <ResourcesMenu />
    </>
  );
}

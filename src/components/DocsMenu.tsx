"use client";

import { usePathname } from "next/navigation";
import DesktopDropdownMenu from "./DesktopDropdownMenu";

const DOCS_LINKS = [
  { href: "/docs", label: "Docs overview", body: "Guides for installing and operating GOLC." },
  {
    href: "/docs/desktop-views",
    label: "Desktop Views",
    body: "Every workspace, action, and operating concept.",
  },
];

export default function DocsMenu() {
  const pathname = usePathname();
  const active = pathname === "/docs" || pathname.startsWith("/docs/");

  return (
    <DesktopDropdownMenu
      id="docs"
      label="Docs"
      triggerActive={active}
      items={DOCS_LINKS.map((item) => ({ ...item, current: pathname === item.href }))}
    />
  );
}

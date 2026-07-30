"use client";

import { usePathname } from "next/navigation";
import DesktopDropdownMenu from "./DesktopDropdownMenu";

const RESOURCES = [
  { href: "/architecture", label: "Architecture", body: "Package graph, command routing, config layering." },
  { href: "/roadmap", label: "Roadmap", body: "Phase-by-phase progress and success criteria." },
  { href: "/changelog", label: "Development Log", body: "What shipped, phase by phase." },
  { href: "/reference", label: "Code Reference", body: "Generated Go package documentation." },
];

export default function ResourcesMenu() {
  const pathname = usePathname();
  const active = RESOURCES.some((r) => r.href === pathname);

  return (
    <DesktopDropdownMenu
      id="resources"
      label="Resources"
      triggerActive={active}
      items={RESOURCES.map((item) => ({ ...item, current: pathname === item.href }))}
    />
  );
}

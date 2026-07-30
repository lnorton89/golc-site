"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { ChevronRightIcon } from "./icons";

export type DesktopDropdownItem = {
  href: string;
  label: string;
  body: string;
  current?: boolean;
};

type DesktopDropdownMenuProps = {
  id: string;
  label: string;
  items: DesktopDropdownItem[];
  triggerActive: boolean;
};

export default function DesktopDropdownMenu({
  id,
  label,
  items,
  triggerActive,
}: DesktopDropdownMenuProps) {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const triggerRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const generatedId = useId();
  const panelId = `${id}-${generatedId.replaceAll(":", "")}-panel`;

  const closeMenu = (restoreFocus = false) => {
    if (detailsRef.current) {
      detailsRef.current.open = false;
    }
    setOpen(false);
    if (restoreFocus) {
      triggerRef.current?.focus();
    }
  };

  useEffect(() => {
    function onDocumentClick(event: MouseEvent) {
      if (detailsRef.current && !detailsRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    }

    function onDocumentKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && detailsRef.current?.open) {
        event.preventDefault();
        closeMenu(true);
      }
    }

    document.addEventListener("click", onDocumentClick);
    document.addEventListener("keydown", onDocumentKeyDown);
    return () => {
      document.removeEventListener("click", onDocumentClick);
      document.removeEventListener("keydown", onDocumentKeyDown);
    };
  }, []);

  return (
    <details
      ref={detailsRef}
      data-testid={`desktop-dropdown-${id}`}
      className="group relative"
      onToggle={(event) => setOpen(event.currentTarget.open)}
    >
      <summary
        ref={triggerRef}
        role="button"
        aria-controls={panelId}
        aria-current={triggerActive ? "page" : undefined}
        aria-expanded={open}
        className={`flex cursor-pointer list-none items-center gap-1 rounded-sm text-sm transition-colors duration-[120ms] ease-out hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent [&::-webkit-details-marker]:hidden ${
          triggerActive ? "font-semibold text-link" : "text-text2"
        }`}
      >
        {label}
        <ChevronRightIcon
          size={11}
          className="rotate-90 transition-transform duration-[120ms] ease-out group-open:-rotate-90"
        />
      </summary>
      <div
        id={panelId}
        data-testid="desktop-dropdown-panel"
        className="menu-panel absolute right-0 top-full z-50 mt-3 w-64 origin-top-right rounded-xl border border-line bg-panel p-2 shadow-lg"
      >
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            aria-current={item.current ? "page" : undefined}
            onClick={() => closeMenu()}
            className={`group/item card-hover block rounded-lg px-3 py-2.5 transition-colors duration-[120ms] ease-out hover:bg-page hover:text-link focus-visible:bg-page focus-visible:text-link focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent ${
              item.current ? "bg-page text-link" : ""
            }`}
          >
            <span
              data-testid="desktop-dropdown-item-label"
              className={`block text-sm font-medium transition-colors duration-[120ms] ease-out group-hover/item:text-link group-focus-visible/item:text-link ${
                item.current ? "text-link" : "text-ink"
              }`}
            >
              {item.label}
            </span>
            <span data-testid="desktop-dropdown-item-body" className="block text-xs text-text2">
              {item.body}
            </span>
          </Link>
        ))}
      </div>
    </details>
  );
}

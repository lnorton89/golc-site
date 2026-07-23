"use client";

import { useState } from "react";
import { ChevronRightIcon } from "@/components/icons";
import ViewDetail, { VIEW_ICON } from "./ViewDetail";
import { VIEWS } from "./docsData";

export default function ViewExplorer() {
  const [selectedId, setSelectedId] = useState(VIEWS[0].id);
  const [openId, setOpenId] = useState<string | null>(VIEWS[0].id);
  const selected = VIEWS.find((v) => v.id === selectedId)!;

  return (
    <div>
      {/* Desktop: master-detail */}
      <div className="hidden lg:grid lg:grid-cols-[1fr_1.3fr] lg:gap-6">
        <ol className="min-w-0">
          {VIEWS.map((v) => {
            const Icon = VIEW_ICON[v.icon];
            const isSelected = v.id === selectedId;
            return (
              <li key={v.id}>
                <button
                  type="button"
                  onClick={() => setSelectedId(v.id)}
                  className={`flex w-full items-start gap-3 rounded-lg px-3 py-3 text-left transition-colors duration-[120ms] ease-out ${
                    isSelected ? "bg-panel" : "hover:bg-page"
                  }`}
                >
                  <span
                    className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                    style={{
                      background: isSelected
                        ? "color-mix(in srgb, var(--accent) 16%, transparent)"
                        : "var(--page)",
                      color: isSelected ? "var(--accent)" : "var(--ink)",
                    }}
                  >
                    <Icon size={17} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span
                      className={`block text-sm ${
                        isSelected ? "font-semibold text-ink" : "font-medium text-text2"
                      }`}
                    >
                      {v.title}
                    </span>
                    <span className="mt-0.5 block text-xs leading-5 text-muted">
                      {v.body}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>

        <div className="rounded-xl border border-line bg-panel p-6 lg:sticky lg:top-24 lg:self-start">
          <ViewDetail view={selected} />
        </div>
      </div>

      {/* Mobile: accordion */}
      <ol className="space-y-3 lg:hidden">
        {VIEWS.map((v) => {
          const Icon = VIEW_ICON[v.icon];
          const isOpen = openId === v.id;
          return (
            <li key={v.id} className="rounded-xl border border-line bg-panel">
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? null : v.id)}
                aria-expanded={isOpen}
                aria-controls={`view-panel-${v.id}`}
                className="flex w-full items-start gap-3 p-4 text-left"
              >
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-page text-ink">
                  <Icon size={15} />
                </span>
                <span className="min-w-0 flex-1 pt-1 text-sm font-medium leading-5 text-ink">
                  {v.title}
                </span>
                <ChevronRightIcon
                  size={16}
                  className={`mt-1 shrink-0 text-muted transition-transform duration-[120ms] ease-out ${
                    isOpen ? "rotate-90" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div id={`view-panel-${v.id}`} className="border-t border-line px-4 pb-4 pt-4">
                  <ViewDetail view={v} showHeader={false} />
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

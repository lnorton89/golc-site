"use client";

import { useState } from "react";
import { ChevronRightIcon } from "@/components/icons";
import PhaseDetail, { PHASE_ICON, STATUS_COLOR } from "./PhaseDetail";
import type { Phase } from "./phaseData";

export default function PhaseTimeline({ phases }: { phases: Phase[] }) {
  const defaultPhase = phases.find((p) => p.status !== "done") ?? phases[phases.length - 1];
  const [selectedN, setSelectedN] = useState(defaultPhase.n);
  const [openN, setOpenN] = useState<number | null>(defaultPhase.n);
  const selected = phases.find((p) => p.n === selectedN)!;

  return (
    <div className="mt-10">
      {/* Desktop: master-detail, list + sticky panel */}
      <div className="hidden lg:grid lg:grid-cols-[1fr_1.3fr] lg:gap-6">
        <ol className="min-w-0">
          {phases.map((p, i) => {
            const Icon = PHASE_ICON[p.icon];
            const isSelected = p.n === selectedN;
            return (
              <li key={p.n}>
                <button
                  type="button"
                  onClick={() => setSelectedN(p.n)}
                  className={`flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left transition-colors duration-[120ms] ease-out ${
                    isSelected ? "bg-panel" : "hover:bg-page"
                  }`}
                >
                  <span className="w-5 shrink-0 font-mono text-xs text-muted">
                    {String(p.n).padStart(2, "0")}
                  </span>
                  <span
                    className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                    style={{
                      background: isSelected
                        ? "color-mix(in srgb, var(--accent) 16%, transparent)"
                        : "var(--page)",
                      color: isSelected ? "var(--accent)" : "var(--ink)",
                    }}
                  >
                    {i > 0 && (
                      <span className="absolute -top-2.5 left-1/2 h-2.5 w-px -translate-x-1/2 bg-line" />
                    )}
                    <Icon size={15} />
                    {i < phases.length - 1 && (
                      <span className="absolute -bottom-2.5 left-1/2 h-2.5 w-px -translate-x-1/2 bg-line" />
                    )}
                  </span>
                  <span
                    className={`min-w-0 flex-1 truncate text-sm ${
                      isSelected ? "font-semibold text-ink" : "text-text2"
                    }`}
                  >
                    {p.title}
                  </span>
                  <span
                    className="h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ background: STATUS_COLOR[p.status] }}
                    aria-hidden
                  />
                </button>
              </li>
            );
          })}
        </ol>

        <div className="rounded-xl border border-line bg-panel p-6 lg:sticky lg:top-24 lg:self-start">
          <PhaseDetail phase={selected} />
        </div>
      </div>

      {/* Mobile: accordion, one phase open at a time */}
      <ol className="space-y-3 lg:hidden">
        {phases.map((p) => {
          const Icon = PHASE_ICON[p.icon];
          const isOpen = openN === p.n;
          return (
            <li key={p.n} className="rounded-xl border border-line bg-panel">
              <button
                type="button"
                onClick={() => setOpenN(isOpen ? null : p.n)}
                className="flex w-full items-start gap-3 p-4 text-left"
              >
                <span className="w-5 shrink-0 pt-0.5 font-mono text-xs text-muted">
                  {String(p.n).padStart(2, "0")}
                </span>
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-page text-ink">
                  <Icon size={15} />
                </span>
                <span className="min-w-0 flex-1 pt-1 text-sm font-medium leading-5 text-ink">
                  {p.title}
                </span>
                <span
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ background: STATUS_COLOR[p.status] }}
                  aria-hidden
                />
                <ChevronRightIcon
                  size={16}
                  className={`mt-1 shrink-0 text-muted transition-transform duration-[120ms] ease-out ${
                    isOpen ? "rotate-90" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div className="border-t border-line px-4 pb-4 pt-4">
                  <PhaseDetail phase={p} showHeader={false} />
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

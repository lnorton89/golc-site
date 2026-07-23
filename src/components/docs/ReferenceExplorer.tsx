"use client";

import { useState } from "react";
import Markdown from "react-markdown";
import { ChevronRightIcon, PackageIcon } from "@/components/icons";
import type { ReferencePage } from "@/lib/reference";

function ReferenceBody({ page }: { page: ReferencePage }) {
  return (
    <>
      <p className="font-mono text-[10px] uppercase tracking-wider text-muted">
        {page.importPath}
      </p>
      <h3 className="mt-1 font-mono font-semibold text-ink">{page.title}</h3>
      <div className="mt-4 space-y-4 text-sm leading-6 text-text2 [&_code]:rounded [&_code]:bg-page [&_code]:px-1 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[13px] [&_code]:text-ink [&_strong]:text-ink">
        <Markdown>{page.body}</Markdown>
      </div>
    </>
  );
}

export default function ReferenceExplorer({ pages }: { pages: ReferencePage[] }) {
  const [selectedSlug, setSelectedSlug] = useState(pages[0]?.slug ?? "");
  const [openSlug, setOpenSlug] = useState<string | null>(pages[0]?.slug ?? null);
  const selected = pages.find((p) => p.slug === selectedSlug);

  if (pages.length === 0) {
    return (
      <p className="text-sm text-text2">
        No reference pages have been generated yet — run{" "}
        <code className="rounded bg-page px-1 py-0.5 font-mono text-[13px] text-ink">
          golc.ps1 docs
        </code>{" "}
        from the golc repository.
      </p>
    );
  }

  return (
    <div>
      {/* Desktop: master-detail */}
      <div className="hidden lg:grid lg:grid-cols-[1fr_1.6fr] lg:gap-6">
        <ol className="min-w-0">
          {pages.map((page) => {
            const isSelected = page.slug === selectedSlug;
            return (
              <li key={page.slug}>
                <button
                  type="button"
                  onClick={() => setSelectedSlug(page.slug)}
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
                    <PackageIcon size={17} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span
                      className={`block font-mono text-sm ${
                        isSelected ? "font-semibold text-ink" : "font-medium text-text2"
                      }`}
                    >
                      {page.title}
                    </span>
                    <span className="mt-0.5 block text-xs leading-5 text-muted">
                      {page.synopsis}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>

        <div className="rounded-xl border border-line bg-panel p-6 lg:sticky lg:top-24 lg:self-start">
          {selected && <ReferenceBody page={selected} />}
        </div>
      </div>

      {/* Mobile: accordion */}
      <ol className="space-y-3 lg:hidden">
        {pages.map((page) => {
          const isOpen = openSlug === page.slug;
          return (
            <li key={page.slug} className="rounded-xl border border-line bg-panel">
              <button
                type="button"
                onClick={() => setOpenSlug(isOpen ? null : page.slug)}
                className="flex w-full items-start gap-3 p-4 text-left"
              >
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-page text-ink">
                  <PackageIcon size={15} />
                </span>
                <span className="min-w-0 flex-1 pt-1 font-mono text-sm font-medium leading-5 text-ink">
                  {page.title}
                </span>
                <ChevronRightIcon
                  size={16}
                  className={`mt-1 shrink-0 text-muted transition-transform duration-[120ms] ease-out ${
                    isOpen ? "rotate-90" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div className="border-t border-line px-4 pb-4 pt-4">
                  <ReferenceBody page={page} />
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

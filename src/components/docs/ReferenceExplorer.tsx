"use client";

import { useState } from "react";
import Markdown from "react-markdown";
import { ChevronRightIcon, PackageIcon } from "@/components/icons";
import type { ReferencePage } from "@/lib/reference";

// splitLede pulls the doc comment's opening paragraph (the actual
// "Package X ..." summary sentence) away from the rest, so it can read
// as a lede rather than blending into the wall of implementation detail
// that usually follows it.
function splitLede(body: string): { lede: string; rest: string } {
  const breakIndex = body.indexOf("\n\n");
  if (breakIndex === -1) return { lede: body, rest: "" };
  return { lede: body.slice(0, breakIndex), rest: body.slice(breakIndex + 2) };
}

const proseCodeClasses =
  "[&_code]:rounded [&_code]:bg-page [&_code]:px-1 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[13px] [&_code]:text-ink [&_strong]:text-ink";

// parentFolder returns the folder a package sits in relative to
// internal/, or null for a top-level package (e.g. "artnet" for
// "artnet/ipc", null for "bootstrap") -- packages are pre-sorted by
// import path, so a nested package's parent always immediately precedes
// it in the list.
function parentFolder(page: ReferencePage): string | null {
  const segments = page.internalPath.split("/");
  return segments.length > 1 ? segments.slice(0, -1).join("/") : null;
}

function ReferenceBody({ page }: { page: ReferencePage }) {
  const { lede, rest } = splitLede(page.body);

  return (
    <>
      <p className="font-mono text-[10px] uppercase tracking-wider text-muted">
        {page.importPath.replace(/^github\.com\/lnorton89\//, "")}
      </p>
      <h3 className="mt-1 font-mono font-semibold text-ink">{page.title}</h3>

      <div className={`mt-4 max-w-[62ch] text-[15px] font-medium leading-7 text-ink ${proseCodeClasses}`}>
        <Markdown>{lede}</Markdown>
      </div>

      {rest && (
        <div className={`mt-4 max-w-[62ch] space-y-4 text-sm leading-7 text-text2 ${proseCodeClasses}`}>
          <Markdown>{rest}</Markdown>
        </div>
      )}
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
            const parent = parentFolder(page);
            return (
              <li key={page.slug} className={parent ? "ml-6" : undefined}>
                <button
                  type="button"
                  onClick={() => setSelectedSlug(page.slug)}
                  className={`flex w-full items-start gap-3 rounded-lg px-3 py-3 text-left transition-colors duration-[120ms] ease-out ${
                    isSelected ? "bg-panel" : "hover:bg-page"
                  }`}
                >
                  <span
                    className={`mt-0.5 inline-flex shrink-0 items-center justify-center rounded-lg ${
                      parent ? "h-7 w-7" : "h-9 w-9"
                    }`}
                    style={{
                      background: isSelected
                        ? "color-mix(in srgb, var(--accent) 16%, transparent)"
                        : "var(--page)",
                      color: isSelected ? "var(--accent)" : "var(--ink)",
                    }}
                  >
                    <PackageIcon size={parent ? 14 : 17} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span
                      className={`block font-mono text-sm ${
                        isSelected ? "font-semibold text-ink" : "font-medium text-text2"
                      }`}
                    >
                      {parent && <span className="text-muted">{parent}/</span>}
                      {page.title}
                    </span>
                    <span className="mt-0.5 line-clamp-2 text-xs leading-5 text-muted">
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
          const parent = parentFolder(page);
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
                  {parent && <span className="text-muted">{parent}/</span>}
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

"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

export type DesktopView = {
  id: string;
  slug: string;
  navLabel: string;
  title: string;
  purpose: string;
  actions: string[];
  concepts?: string[];
  operatingNotes?: string[];
  screenshot: string;
};

export type DesktopViewGroup = {
  label: string;
  views: DesktopView[];
};

export default function DesktopViewExplorer({ groups }: { groups: DesktopViewGroup[] }) {
  const orderedViews = groups.flatMap((group) => group.views);
  const [selectedId, setSelectedId] = useState(orderedViews[0]?.id);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const tabRefs = useRef(new Map<string, HTMLButtonElement>());
  const openerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const restoreFocusOnCloseRef = useRef(false);
  const selectedView = orderedViews.find((view) => view.id === selectedId) ?? orderedViews[0];

  const closeLightbox = useCallback(() => {
    restoreFocusOnCloseRef.current = true;
    setLightboxOpen(false);
  }, []);

  useEffect(() => {
    if (!lightboxOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const opener = openerRef.current;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeLightbox();
        return;
      }

      if (event.key === "Tab") {
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );
        if (!focusable || focusable.length === 0) {
          event.preventDefault();
          return;
        }

        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    const keepFocusInDialog = (event: FocusEvent) => {
      if (!dialogRef.current?.contains(event.target as Node)) {
        closeRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("focusin", keepFocusInDialog);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("focusin", keepFocusInDialog);
      if (restoreFocusOnCloseRef.current) {
        restoreFocusOnCloseRef.current = false;
        window.requestAnimationFrame(() => opener?.focus());
      }
    };
  }, [closeLightbox, lightboxOpen]);

  if (!selectedView) {
    return <p className="text-text2">No desktop views are available.</p>;
  }

  const selectAndFocus = (index: number) => {
    const nextView = orderedViews[index];
    if (!nextView) {
      return;
    }
    setSelectedId(nextView.id);
    tabRefs.current.get(nextView.id)?.focus();
  };

  const handleTabKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex: number | undefined;
    if (event.key === "ArrowDown") {
      nextIndex = (index + 1) % orderedViews.length;
    } else if (event.key === "ArrowUp") {
      nextIndex = (index - 1 + orderedViews.length) % orderedViews.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = orderedViews.length - 1;
    }

    if (nextIndex !== undefined) {
      event.preventDefault();
      selectAndFocus(nextIndex);
    }
  };

  return (
    <>
      <div className="grid min-w-0 gap-8 lg:grid-cols-[16rem_minmax(0,1fr)] lg:items-start xl:gap-12">
        <div
          role="tablist"
          aria-label="Desktop views"
          aria-orientation="vertical"
          className="min-w-0 rounded-xl border border-line bg-panel p-3 sm:p-4 lg:sticky lg:top-24"
        >
          {groups.map((group) => (
            <section
              key={group.label}
              className="not-first:mt-4 not-first:border-t not-first:border-line not-first:pt-4"
            >
              <h2 className="px-2 font-mono text-[11px] font-semibold uppercase tracking-[1.1px] text-muted">
                {group.label}
              </h2>
              <div className="mt-1 grid gap-1 sm:grid-cols-2 lg:grid-cols-1">
                {group.views.map((view) => {
                  const index = orderedViews.findIndex((candidate) => candidate.id === view.id);
                  const selected = view.id === selectedView.id;
                  return (
                    <button
                      key={view.id}
                      ref={(node) => {
                        if (node) {
                          tabRefs.current.set(view.id, node);
                        } else {
                          tabRefs.current.delete(view.id);
                        }
                      }}
                      id={`desktop-tab-${view.id}`}
                      type="button"
                      role="tab"
                      aria-controls={view.slug}
                      aria-selected={selected}
                      tabIndex={selected ? 0 : -1}
                      onClick={() => setSelectedId(view.id)}
                      onKeyDown={(event) => handleTabKeyDown(event, index)}
                      className={`flex min-h-11 w-full items-center justify-between gap-3 rounded-md border px-3 py-2 text-left text-sm font-semibold transition-colors duration-[120ms] ease-out ${
                        selected
                          ? "border-accent bg-accent text-on-accent"
                          : "border-transparent text-text2 hover:border-line hover:bg-page hover:text-ink"
                      }`}
                    >
                      <span>{view.navLabel}</span>
                      <span
                        className={`font-mono text-[9px] uppercase tracking-wider ${
                          selected ? "text-on-accent" : "text-muted"
                        }`}
                        aria-hidden
                      >
                        {view.id.split("-")[0]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        <article
          id={selectedView.slug}
          role="tabpanel"
          aria-labelledby={`desktop-tab-${selectedView.id}`}
          className="min-w-0 overflow-hidden rounded-xl border border-line bg-panel"
        >
          <button
            ref={openerRef}
            type="button"
            aria-label={`Enlarge ${selectedView.navLabel} workspace screenshot`}
            data-testid="desktop-view-screenshot-stage"
            onClick={() => setLightboxOpen(true)}
            className="group block min-h-11 w-full cursor-zoom-in border-b border-line bg-screenshot-stage p-3 text-left sm:p-5"
          >
            <Image
              src={selectedView.screenshot}
              alt={`${selectedView.navLabel} workspace in the GOLC desktop application`}
              width={1440}
              height={900}
              priority
              className="h-auto w-full rounded-lg border border-line shadow-sm transition-transform duration-200 ease-out motion-reduce:transition-none group-hover:scale-[1.005]"
              sizes="(min-width: 1280px) 980px, (min-width: 1024px) calc(100vw - 22rem), 100vw"
            />
            <span className="flex min-h-11 items-end justify-center gap-2 pt-3 font-mono text-[11px] font-semibold uppercase tracking-wider text-link">
              <span aria-hidden>↗</span>
              Enlarge screenshot
            </span>
          </button>

          <div data-testid="desktop-view-detail" className="bg-panel p-5 sm:p-8">
            <span className="font-mono text-[11px] uppercase tracking-[1.1px] text-link">
              {selectedView.id}
            </span>
            <h2 className="mt-1 text-3xl font-bold tracking-[-0.02em] text-ink">
              {selectedView.title}
            </h2>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-text2">{selectedView.purpose}</p>

            <div className="mt-8 grid gap-8 xl:grid-cols-2">
              <div>
                <h3 className="text-sm font-bold text-ink">Principal actions</h3>
                <ul className="mt-3 space-y-2 text-sm leading-6 text-text2">
                  {selectedView.actions.map((action) => (
                    <li key={action} className="flex gap-3">
                      <span className="mt-[9px] h-1.5 w-1.5 shrink-0 bg-accent" aria-hidden />
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {selectedView.concepts && selectedView.concepts.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold text-ink">Concepts</h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {selectedView.concepts.map((concept) => (
                      <span
                        key={concept}
                        className="rounded-md border border-line bg-page px-2.5 py-1 font-mono text-[11px] text-text2"
                      >
                        {concept}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {selectedView.operatingNotes && selectedView.operatingNotes.length > 0 && (
              <div className="mt-8 border-l-2 border-accent pl-4">
                <h3 className="text-sm font-bold text-ink">Operating notes</h3>
                {selectedView.operatingNotes.map((note) => (
                  <p key={note} className="mt-1 text-sm leading-6 text-text2">
                    {note}
                  </p>
                ))}
              </div>
            )}
          </div>
        </article>
      </div>

      {lightboxOpen && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedView.navLabel} workspace screenshot`}
          data-testid="desktop-view-lightbox-backdrop"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              closeLightbox();
            }
          }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-3 sm:p-8"
        >
          <div className="relative w-full max-w-[1440px] overflow-hidden rounded-xl border border-line bg-panel shadow-2xl">
            <button
              ref={closeRef}
              type="button"
              aria-label="Close screenshot"
              onClick={closeLightbox}
              className="absolute right-3 top-3 z-10 flex min-h-11 min-w-11 items-center justify-center rounded-full border border-line bg-panel text-xl font-bold text-ink shadow-lg transition-colors duration-[120ms] ease-out hover:border-accent hover:text-link"
            >
              <span aria-hidden>×</span>
            </button>
            <Image
              src={selectedView.screenshot}
              alt={`${selectedView.navLabel} workspace in the GOLC desktop application`}
              width={1440}
              height={900}
              priority
              className="h-auto max-h-[calc(100vh-1.5rem)] w-full object-contain sm:max-h-[calc(100vh-4rem)]"
              sizes="100vw"
            />
          </div>
        </div>
      )}
    </>
  );
}

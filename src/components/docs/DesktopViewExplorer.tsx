"use client";

import Image from "next/image";
import { useState } from "react";

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
  const [selectedGroup, setSelectedGroup] = useState("All");
  const visibleGroups = selectedGroup === "All" ? groups : groups.filter((group) => group.label === selectedGroup);

  return (
    <div>
      <div className="mb-10 flex flex-wrap gap-2" aria-label="Filter desktop views">
        {["All", ...groups.map((group) => group.label)].map((label) => (
          <button
            key={label}
            type="button"
            aria-pressed={selectedGroup === label}
            onClick={() => setSelectedGroup(label)}
            className={`rounded-md border px-4 py-2 text-sm font-semibold transition-colors duration-[120ms] ease-out ${
              selectedGroup === label
                ? "border-accent bg-accent text-on-accent"
                : "border-line bg-panel text-text2 hover:border-accent hover:text-ink"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="space-y-16">
        {visibleGroups.map((group) => (
          <section key={group.label} aria-labelledby={`desktop-group-${group.label.toLowerCase()}`}>
            <div className="mb-6 flex items-baseline gap-3 border-b border-line pb-3">
              <h2
                id={`desktop-group-${group.label.toLowerCase()}`}
                className="text-2xl font-bold tracking-[-0.02em] text-ink"
              >
                {group.label}
              </h2>
              <span className="font-mono text-xs text-muted">
                {group.views.length} {group.views.length === 1 ? "view" : "views"}
              </span>
            </div>

            <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
              {group.views.map((view) => (
                <article
                  key={view.id}
                  id={view.slug}
                  className="min-w-0 overflow-hidden rounded-xl border border-line bg-panel"
                >
                  <Image
                    src={view.screenshot}
                    alt={`${view.navLabel} workspace in the GOLC desktop application`}
                    width={1440}
                    height={900}
                    loading="eager"
                    className="h-auto w-full border-b border-line"
                    sizes="(min-width: 1024px) 548px, 100vw"
                  />
                  <div className="p-5 sm:p-6">
                    <span className="font-mono text-[11px] uppercase tracking-[1.1px] text-link">
                      {view.id}
                    </span>
                    <h3 className="mt-1 text-xl font-bold text-ink">{view.title}</h3>
                    <p className="mt-3 leading-7 text-text2">{view.purpose}</p>

                    <h4 className="mt-6 text-sm font-bold text-ink">Principal actions</h4>
                    <ul className="mt-2 space-y-2 text-sm leading-6 text-text2">
                      {view.actions.map((action) => (
                        <li key={action} className="flex gap-2">
                          <span className="mt-[9px] h-1.5 w-1.5 shrink-0 bg-accent" aria-hidden />
                          <span>{action}</span>
                        </li>
                      ))}
                    </ul>

                    {view.concepts && view.concepts.length > 0 && (
                      <div className="mt-6">
                        <h4 className="text-sm font-bold text-ink">Concepts</h4>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {view.concepts.map((concept) => (
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

                    {view.operatingNotes && view.operatingNotes.length > 0 && (
                      <div className="mt-6 border-l-2 border-accent pl-4">
                        <h4 className="text-sm font-bold text-ink">Operating notes</h4>
                        {view.operatingNotes.map((note) => (
                          <p key={note} className="mt-1 text-sm leading-6 text-text2">
                            {note}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

import type { Metadata } from "next";

import DesktopViewExplorer, {
  type DesktopViewGroup,
} from "@/components/docs/DesktopViewExplorer";
import desktopViews from "@/content/desktop-views.json";

const description =
  "Browse every GOLC desktop workspace, with current screenshots, purposes, principal operator actions, and operating notes.";

export const metadata: Metadata = {
  title: "Desktop views",
  description,
  alternates: { canonical: "/docs/desktop-views" },
  openGraph: {
    siteName: "GOLC",
    type: "website",
    locale: "en_US",
    title: "Desktop views · GOLC",
    description,
    url: "/docs/desktop-views",
    images: [
      {
        url: "/desktop-views-og.png",
        width: 1200,
        height: 630,
        alt: "GOLC Desktop Views",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Desktop views · GOLC",
    description,
    images: [
      {
        url: "/desktop-views-og.png",
        width: 1200,
        height: 630,
        alt: "GOLC Desktop Views",
      },
    ],
  },
};

export default function DesktopViewsPage() {
  // The Guided First Show onboarding overlay is intentionally kept out of
  // desktopViews.groups (it is never a real nav destination), so it lives
  // in the catalog's separate top-level "onboarding" section instead.
  // Docs readers still want it documented alongside every workspace, so it
  // is spliced in here as one more explorer group, right after Show --
  // this keeps Overview (Show's first view) the page's default selection,
  // unchanged from before onboarding had any documented views.
  const catalogGroups = desktopViews.groups as DesktopViewGroup[];
  const groups = desktopViews.onboarding
    ? [catalogGroups[0], desktopViews.onboarding as DesktopViewGroup, ...catalogGroups.slice(1)]
    : catalogGroups;
  const viewCount = groups.reduce((total, group) => total + group.views.length, 0);

  return (
    <div>
      <section className="border-b border-line bg-panel">
        <div className="mx-auto max-w-[1360px] px-6 py-20 sm:px-12 sm:py-28">
          <span className="block font-mono text-[13px] tracking-[1.3px] text-link">
            Desktop guide · catalog schema {desktopViews.schemaVersion}
          </span>
          <h1 className="mt-1 max-w-3xl text-[40px] font-extrabold leading-[1.05] tracking-[-0.03em] text-ink sm:text-[52px]">
            Every workspace, in one guide.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-text2">
            Browse all {viewCount} current destinations across Show, Guided Setup, Build, Operate,
            and Output. Each entry uses a screenshot captured from the real browser-safe desktop
            frontend and describes the controls available in that workspace.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1360px] px-6 py-16 sm:px-12 sm:py-24">
        <DesktopViewExplorer groups={groups} />
      </main>
    </div>
  );
}

import type { Metadata } from "next";
import PhaseTimeline from "@/components/roadmap/PhaseTimeline";
import { PHASES } from "@/components/roadmap/phaseData";

const roadmapDescription = "GOLC v1 ships through eleven dependency-ordered phases.";

export const metadata: Metadata = {
  title: "Roadmap",
  description: roadmapDescription,
  alternates: { canonical: "/roadmap" },
  openGraph: {
    siteName: "GOLC",
    type: "website",
    locale: "en_US",
    title: "Roadmap · GOLC",
    description: roadmapDescription,
    url: "/roadmap",
  },
  twitter: {
    card: "summary_large_image",
    title: "Roadmap · GOLC",
    description: roadmapDescription,
  },
};

export default function RoadmapPage() {
  return (
    <div className="mx-auto max-w-[1160px] px-6 py-16 sm:px-12 sm:py-24">
      <span className="block font-mono text-[13px] tracking-[1.3px] text-accent">
        Eleven dependency-ordered phases
      </span>
      <h1 className="mt-1 text-[44px] font-extrabold leading-tight tracking-[-0.03em] text-ink sm:text-[52px]">
        Roadmap
      </h1>
      <p className="mt-4 max-w-xl text-text2">
        GOLC v1 grows through eleven dependency-ordered MVP slices. Each
        phase proves a working, reviewable capability before the next
        depends on it — the deterministic playback and Art-Net timing path
        stays independent of UI, storage, scripts, API, and LLM providers
        throughout. Select a phase to see its goal, requirements, and
        success criteria.
      </p>

      <PhaseTimeline phases={PHASES} />
    </div>
  );
}

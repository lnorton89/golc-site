import type { Metadata } from "next";
import PhaseAccordion from "@/components/roadmap/PhaseAccordion";
import { PHASES } from "@/components/roadmap/phaseData";

export const metadata: Metadata = {
  title: "Roadmap",
  description: "GOLC v1 ships through ten dependency-ordered phases.",
};

export default function RoadmapPage() {
  return (
    <div className="mx-auto max-w-[1160px] px-6 py-16 sm:px-12 sm:py-24">
      <span className="block font-mono text-[13px] tracking-[1.3px] text-accent">
        Ten dependency-ordered phases
      </span>
      <h1 className="mt-1 text-[44px] font-extrabold leading-tight tracking-[-0.03em] text-ink sm:text-[52px]">
        Roadmap
      </h1>
      <p className="mt-4 max-w-xl text-text2">
        GOLC v1 grows through ten dependency-ordered MVP slices. Each phase
        proves a working, reviewable capability before the next depends on
        it — the deterministic playback and Art-Net timing path stays
        independent of UI, storage, scripts, API, and LLM providers
        throughout. Click a phase to see its goal, requirements, and success
        criteria.
      </p>

      <PhaseAccordion phases={PHASES} />
    </div>
  );
}

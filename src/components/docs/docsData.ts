export type ViewIcon = "fixture" | "cue" | "beam" | "blackout" | "script";

export type ViewDef = {
  id: string;
  title: string;
  icon: ViewIcon;
  body: string;
  workflowStage: string;
  concepts: string[]; // keys into LEXICON
  states: string[]; // keys into STATES
};

export const LEXICON: Record<string, string> = {
  Patch: "Mapping logical fixtures to Art-Net addresses and modes.",
  "Fixture pool": "A reusable logical group a show targets, independent of concrete count or address.",
  "Look / Scene": "A stored state of attributes; tempo-aware scenes loop in bars.",
  Chase: "An ordered sequence of steps advanced on tempo.",
  "Transition preset": "A reusable blend applied between looks.",
  "Impact preview": "A deterministic plan shown before a pool resize or fixture substitution.",
  "Soft takeover": "MIDI control that engages only once a fader matches the live value.",
  "Art-Net": "The Ethernet DMX protocol GOLC outputs (Art-Net 4).",
  Universe: "512 DMX channels carried over Art-Net.",
  "Deterministic playback": "Output timing isolated from the UI, scripts, and providers.",
  Lease: "A time-bounded, armed grant that lets an AI operate the app.",
  "Revoke Automation": "The control that blocks AI/scripts and freezes the current look.",
  Blackout: "A separate, immediate intensity kill.",
  "Command model": "One typed command set shared by the UI, API, scripts, and AI.",
};

export const STATES: Record<string, { color: string; meaning: string }> = {
  Live: { color: "var(--status-live)", meaning: "Art-Net output active, a look is on stage" },
  "Frame lock": { color: "var(--status-frame-lock)", meaning: "Playback holds a steady frame rate, isolated from the UI" },
  Armed: { color: "var(--status-armed)", meaning: "An automation lease is armed, or a look has unsaved edits" },
  Revoked: { color: "var(--status-revoked)", meaning: "Revoke Automation has blocked AI/scripts; look frozen" },
  Blackout: { color: "var(--status-blackout)", meaning: "Separate, immediate intensity kill (INTENSITY · 0)" },
  Offline: { color: "var(--status-offline)", meaning: "A provider/integration is unreachable; local work continues" },
};

export const VIEWS: ViewDef[] = [
  {
    id: "patch-pools",
    title: "Patch & pools",
    icon: "fixture",
    body: "Modular fixture pools; substitution shows an Impact preview before commit.",
    workflowStage: "Patch fixtures, then build reusable pools",
    concepts: ["Patch", "Fixture pool", "Impact preview"],
    states: [],
  },
  {
    id: "scene-editor",
    title: "Scene editor",
    icon: "cue",
    body: "Tempo-aware (BPM / tap), attribute groups (Intensity, Color, Position, Beam), chases.",
    workflowStage: "Program looks & scenes",
    concepts: ["Look / Scene", "Chase", "Transition preset"],
    states: ["Armed"],
  },
  {
    id: "live-playback",
    title: "Live output & playback",
    icon: "beam",
    body: "Deterministic Art-Net, frame-locked channel output.",
    workflowStage: "Play back",
    concepts: ["Art-Net", "Universe", "Deterministic playback", "Blackout", "Soft takeover"],
    states: ["Live", "Frame lock", "Blackout", "Offline"],
  },
  {
    id: "ai-automation",
    title: "AI & automation",
    icon: "blackout",
    body: "Armed, time-bounded lease with an audit log; Revoke always available.",
    workflowStage: "Automate",
    concepts: ["Lease", "Revoke Automation", "Command model"],
    states: ["Armed", "Revoked"],
  },
  {
    id: "typescript",
    title: "TypeScript",
    icon: "script",
    body: "Sandboxed, capability-limited scripts against a generated typed SDK.",
    workflowStage: "Automate",
    concepts: ["Command model"],
    states: [],
  },
];

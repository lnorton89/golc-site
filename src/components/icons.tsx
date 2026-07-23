type IconProps = { size?: number; className?: string };

function Base({
  size = 24,
  className,
  children,
}: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="square"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {children}
    </svg>
  );
}

export function FixtureIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M8 3h8l-1.5 5h-5L8 3z" />
      <rect x="9" y="8" width="6" height="4" />
      <path d="M12 12v3M8 20l4-5 4 5" />
    </Base>
  );
}

export function FadersIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M6 3v18M12 3v18M18 3v18" />
      <rect x="4" y="8" width="4" height="4" fill="currentColor" />
      <rect x="10" y="13" width="4" height="4" />
      <rect x="16" y="6" width="4" height="4" />
    </Base>
  );
}

export function BeamIcon(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="12" cy="5" r="2.5" />
      <path d="M10 7 4 21M14 7l6 14" />
    </Base>
  );
}

export function CueIcon(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M10 8l6 4-6 4V8z" fill="currentColor" />
    </Base>
  );
}

export function ScriptIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M9 8l-4 4 4 4M15 8l4 4-4 4" />
    </Base>
  );
}

export function ApiIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M8 4H6a2 2 0 0 0-2 2v3a2 2 0 0 1-2 2 2 2 0 0 1 2 2v3a2 2 0 0 0 2 2h2M16 4h2a2 2 0 0 1 2 2v3a2 2 0 0 0 2 2 2 2 0 0 0-2 2v3a2 2 0 0 1-2 2h-2" />
    </Base>
  );
}

export function TimelineIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M3 12h4l2-6 3 14 3-11 2 3h4" />
    </Base>
  );
}

export function BlackoutIcon(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M5 5l14 14" />
    </Base>
  );
}

export function DocIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M7 3h7l4 4v14H7V3z" />
      <path d="M14 3v4h4" />
      <path d="M9.5 12.5h5M9.5 16h5" />
    </Base>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M4 6h16M4 12h16M4 18h16" />
    </Base>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M5 5l14 14M19 5L5 19" />
    </Base>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M4 12h16M14 6l6 6-6 6" />
    </Base>
  );
}

export function ChevronRightIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M9 6l6 6-6 6" />
    </Base>
  );
}

export function FolderIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M3 6h6l2 2.5h10V19H3V6z" />
    </Base>
  );
}

export function PackageIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M4 8l8-4.5L20 8v8l-8 4.5L4 16V8z" />
      <path d="M4 8l8 4.5L20 8M12 12.5V21" />
    </Base>
  );
}

export function GearIcon(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3v2.5M12 18.5V21M4.2 7.8l2.2 1.3M17.6 14.9l2.2 1.3M4.2 16.2l2.2-1.3M17.6 9.1l2.2-1.3" />
    </Base>
  );
}

export function TerminalIcon(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="3" y="4" width="18" height="16" rx="1" />
      <path d="M7 9l3 3-3 3M12 15h5" />
    </Base>
  );
}

export function GitHubIcon({ size = 24, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56 0-.27-.01-1.17-.02-2.13-3.2.7-3.87-1.36-3.87-1.36-.53-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.24 2.76.12 3.05.74.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14 0 1.55-.01 2.79-.01 3.17 0 .31.21.67.8.56A10.51 10.51 0 0 0 23.5 12c0-6.35-5.15-11.5-11.5-11.5z" />
    </svg>
  );
}

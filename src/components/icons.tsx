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

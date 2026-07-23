export default function PositioningIllustration() {
  return (
    <svg
      viewBox="0 0 480 560"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="A single spotlight beam falling from a truss onto a stage floor"
      className="h-full w-full"
    >
      <defs>
        <linearGradient id="pos-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0e0f13" />
          <stop offset="65%" stopColor="#17181c" />
          <stop offset="100%" stopColor="#1c1e25" />
        </linearGradient>
        <linearGradient id="pos-beam" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1B44D9" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#1B44D9" stopOpacity="0.02" />
        </linearGradient>
        <radialGradient id="pos-pool" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1B44D9" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#1B44D9" stopOpacity="0" />
        </radialGradient>
        <filter id="pos-blur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>

      <rect width="480" height="560" fill="url(#pos-bg)" />

      {/* floor */}
      <line x1="0" y1="430" x2="480" y2="430" stroke="#2e3038" strokeWidth="1" />
      <line x1="0" y1="470" x2="480" y2="470" stroke="#2e3038" strokeWidth="0.5" opacity="0.5" />
      <line x1="0" y1="500" x2="480" y2="500" stroke="#2e3038" strokeWidth="0.5" opacity="0.5" />

      {/* light pool on the floor */}
      <ellipse cx="240" cy="432" rx="150" ry="26" fill="url(#pos-pool)" filter="url(#pos-blur)" />
      <ellipse cx="240" cy="430" rx="70" ry="10" fill="#1B44D9" opacity="0.35" />

      {/* beam cone */}
      <polygon points="228,64 252,64 340,430 140,430" fill="url(#pos-beam)" />

      {/* truss bar */}
      <rect x="150" y="48" width="180" height="16" rx="3" fill="#0b0c0f" stroke="#2e3038" strokeWidth="1" />
      {[175, 205, 235, 265, 295].map((cx) => (
        <circle key={cx} cx={cx} r="6" cy="56" fill="#0b0c0f" stroke="#4a4941" strokeWidth="1" />
      ))}
      <circle cx="240" cy="56" r="7" fill="#1B44D9" />
      <circle cx="240" cy="56" r="12" fill="#1B44D9" opacity="0.35" filter="url(#pos-blur)" />

      {/* dust in the beam */}
      {[
        [210, 140], [260, 180], [230, 230], [255, 280], [215, 330], [245, 380],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="1.4" fill="#ECEAE3" opacity="0.4" />
      ))}
    </svg>
  );
}
